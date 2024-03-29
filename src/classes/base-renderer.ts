import SvgConfig from '../constants/svg-config';
import TemporalLineStruct from '../interfaces/temporal-line';
import AbsTimelineRenderer from './abstract-renderer';
import componentFactory from './component-factory';
import Event from './event';
import Timeline from './timeline';
import Period from './period';
import getChrononStart from '../methods/get-chronon-start';
import ComponentFactory from './component-factory';

function* getNextPosition(temporalLineHeight: number) {
	let multiplier = 0;

	while (true) {
		const finalHeight = temporalLineHeight * multiplier;

		multiplier *= -1;

		if (multiplier < 0) {
			multiplier--;
		} else {
			multiplier++;
		}

		yield finalHeight;
	}

	return multiplier;
};

class BaseTimelineRenderer extends AbsTimelineRenderer {
	private tl: Timeline;
	private renderOffset: number;
	private topBoundary = 0;
	private lowBoundary = 0;
	private config: SvgConfig;
	private positionGetter;
	private componentFactory: ComponentFactory;

	constructor(config: SvgConfig) {
		super();
		this.config = config;
		this.positionGetter = getNextPosition(this.config.temporalLineHeight);
		this.componentFactory = new ComponentFactory(this.config);
		this.componentFactory.createSVG();
	}

	render(timeline: Timeline) {
		this.tl = timeline;
		let temporalLinePosition = this.config.height / 2 + this.positionGetter.next().value;
		
		for (let line of this.tl.temporalLines) {
			this.renderTemporalLine(line, temporalLinePosition);
			this.renderOffset = this.positionGetter.next().value;
			temporalLinePosition += this.renderOffset;
		}
		
		this.renderReferenceLine();

		this.bindListeners();
	}

	renderSubdivisions(greatestDivision: number, linePosition: number) {
		for (let divisionIndex = 1; divisionIndex < this.tl.calendar.divisions.length; divisionIndex++) {
			const division = this.tl.calendar.divisions[1];
			for (let i = 1; i <= division.unitsNames.length; i++) {
				const subdivisionDistance = this.tl.calendar.getElapsedTime([greatestDivision, i, 1]) - this.tl.startingPoint;
				const subdivisionName = division.unitsNames[i - 1];
				this.componentFactory.createAbsoluteText(subdivisionDistance + 2, linePosition + 5, subdivisionName, 4, 'black');
				this.componentFactory.createAbsoluteBox(subdivisionDistance, linePosition - 5, 10, 0.5);
			}
		}
	}

	bindListeners() {
		const eventGroups = document.getElementsByClassName('event-group');
		for (let i = 0; i < eventGroups.length; i++) {
			const group = eventGroups[i] as SVGGElement;

			
			group.onmouseenter = function() {
				group.parentElement.appendChild(group);
				for (let i = 0; i < group.childNodes.length; i++) {
					const child = group.children[i];
					child.classList.add('hovered');
				}
			};

			group.onmouseleave = function() {
				group.parentElement.insertBefore(group, eventGroups[i]);
				for (let i = 0; i < group.childNodes.length; i++) {
					const child = group.children[i];
					child.classList.remove('hovered');
				}
			};
		}

		const periodGroups = document.getElementsByClassName('period-group');

		for (let i = 0; i < periodGroups.length; i++) {
			const group = periodGroups[i] as SVGGElement;
			const periodNameFrame = group.getElementsByClassName('period-name-frame')[0];
			const periodFrame = group.getElementsByClassName('period-frame')[0];
			const periodName = group.getElementsByClassName('period-name')[0] as SVGRectElement;
			const periodWidth = Math.max(+periodNameFrame.getAttribute('width'), periodName.getBBox().width + 10).toString();
			
			const nameFrameWidth = periodNameFrame.getAttribute('width');
			const frameWidth = periodFrame.getAttribute('width');

			group.onmouseenter = function() {
				periodNameFrame.setAttribute('width', periodWidth);
				periodFrame.setAttribute('width', periodWidth);
			};

			group.onmouseleave = function() {
				periodNameFrame.setAttribute('width', nameFrameWidth);
				periodFrame.setAttribute('width', frameWidth);
			}
		}

		let panTrigger = false;
		
		const svgElement = document.getElementById(this.config.svgId);

    	svgElement.style.cursor = 'pointer';

    	svgElement.onmousedown = function() {
        	panTrigger = true;
    	};

		svgElement.onmouseup = function() {
			panTrigger = false;
    	};

		svgElement.onmousemove = (event) => {
			if (panTrigger) {
				const { movementX, movementY } = event;
				const [horizontalOffset, verticalOffset, ...zoomLevels] = svgElement.getAttribute('viewBox').split(' ').map(Number);
				const newHOffset = Math.max(horizontalOffset - movementX * 1.2, 0);
				const newYOffset = verticalOffset - movementY * this.config.panningSensitivity;
				const canPanDown = newYOffset + this.config.height <= this.topBoundary;
				const canPanUp = newYOffset + this.config.panningOffset >= this.lowBoundary;
				const runPan = canPanDown && canPanUp;
				if (runPan) {
					svgElement.setAttribute('viewBox',  `${newHOffset} ${newYOffset} ${zoomLevels.join(' ')}`);
				}
			}
		};
	}

	renderReferenceLine() {
		const startingYear = this.getYear(this.tl.startingPoint);
		const endingYear = this.getYear(this.tl.endingPoint);
		const linePosition = this.config.height / 2;
		const line = this.componentFactory.createAbsoluteLine(0, linePosition, Number.MAX_SAFE_INTEGER, 0, 'black', 1);
		
		for (let i = 0; i < endingYear - startingYear + 1; i++) {
			const computedYear = i + startingYear;
			const yearPlacement = this.tl.calendar.getElapsedTime([computedYear, 1, 1]) - this.tl.startingPoint;
			const notch = this.componentFactory.createAbsoluteBox(yearPlacement, +line.getAttribute('y1') - 5, 10, 1);
			notch.classList.add('notch');
			this.componentFactory.createAbsoluteText(+notch.getAttribute('x') - 10, +notch.getAttribute('y') - 5, computedYear.toString(), 10, 'black');
			this.renderSubdivisions(computedYear, linePosition);
		}

	}

	getYear(timelinePoint: number) {
		const yearZero = this.tl.calendar.getElapsedTime([1, 1, 1]);
		const yearOne = this.tl.calendar.getElapsedTime([2, 1, 1]);
		const yearOffset = yearOne - yearZero;

		return Math.floor(timelinePoint / yearOffset);
	}

	getEventsFromPeriod(period: Period, storedEvents?: Event[]) {
		let events: Event[] = storedEvents ?? [];
		for (let chronon of period.sub_chronons) {
			if (chronon instanceof Period) {
				const subEvents = this.getEventsFromPeriod(chronon, events);
				events = events.concat(subEvents);
			} else if (chronon instanceof Event) {
				events.push(chronon);
			}
		}

		return events;
	}

	renderTemporalLine(line: TemporalLineStruct, temporalLinePosition: number) {
		const referenceLine = this.componentFactory.createAbsoluteLine(0, temporalLinePosition, Number.MAX_SAFE_INTEGER, 0, 'black', 2);
		const { chronons } = line;
		let events: Event[][] = [];
		const periods: Period[] = [];
		const background = this.componentFactory.createAbsoluteBox(0, temporalLinePosition - this.config.temporalLineHeight, this.config.temporalLineHeight, Number.MAX_SAFE_INTEGER);

		const backgroundBottom = background.getBoundingClientRect().bottom;
		const backgroundTop = background.getBoundingClientRect().top;

		if (backgroundBottom > this.topBoundary) {
			this.topBoundary = backgroundBottom;
		}

		if (backgroundTop < this.lowBoundary) {
			this.lowBoundary = backgroundTop;
		}

		background.classList.add('temporal-line-background');
		this.componentFactory.createAbsoluteText(8, temporalLinePosition - this.config.temporalLineHeight + 15, line.name, 10, 'black');

		for (let chronon of chronons) {
			let eventsContainer: Event[] = [];

			if (chronon instanceof Period) {
				const subEvents = this.getEventsFromPeriod(chronon);
				eventsContainer = eventsContainer.concat(subEvents);
				events.push(eventsContainer);
				periods.push(chronon);
			} else if (chronon instanceof Event) {
				eventsContainer.push(chronon);
				events.push(eventsContainer);
			}
		}

		for (let period of periods) {
			const position = getChrononStart(period);
			this.renderPeriod(period, referenceLine, temporalLinePosition, position);
		}

		for (let eventsContainer of events) {
			let boxesVerticalPosition = 0;
			for (let event of eventsContainer) {
				const position = getChrononStart(event);
				this.renderEvent(event, temporalLinePosition, position, boxesVerticalPosition);
			}
		}
	}

	renderPeriod(period: Period, referenceLine: SVGLineElement, linePosition: number, position: number) {
		for (let chronon of period.sub_chronons) {
			if (chronon instanceof Period) {
				this.renderPeriod(chronon, referenceLine, linePosition, position);
			}
		}

		const periodDuration = period.end - period.start;
		const periodFrame = this.componentFactory.createAbsoluteBox(position, linePosition - this.config.temporalLineHeight, this.config.temporalLineHeight, periodDuration, false);
		periodFrame.classList.add('period-frame');
		const periodNameFrame = this.componentFactory.createAbsoluteBox(+periodFrame.getAttribute('x'), +periodFrame.getAttribute('y'), 30, +periodFrame.getAttribute('width'), false);
		periodNameFrame.classList.add('period-name-frame');
		const periodName = this.componentFactory.createAbsoluteText(+periodFrame.getAttribute('x') + 5, +periodFrame.getAttribute('y') + 15, period.name, 10, 'black', false);

		periodName.classList.add('period-name');
		const group = this.componentFactory.createAbsoluteGroup();
		group.appendChild(periodFrame);
		group.appendChild(periodNameFrame);
		group.appendChild(periodName);

		group.classList.add('period-group');
		periodNameFrame.setAttribute('rx', '4');
		periodNameFrame.setAttribute('ry', '4');
	}

	renderEvent(event: Event, linePosition: number, renderPosition: number, verticalOffset: number) {
		const boxHeight = this.config.eventBoxHeight;
		const group = this.componentFactory.createAbsoluteGroup();
		group.classList.add('event-group');
		const eventBox = this.componentFactory.createAbsoluteBox(renderPosition - 1, linePosition - boxHeight + verticalOffset, boxHeight, boxHeight * 2, false);
		eventBox.classList.add('event-box');
		eventBox.setAttribute('rx', '3');
		eventBox.setAttribute('ry', '3');
		
		const eventLabel = this.componentFactory.createAbsoluteText(+eventBox.getAttribute('x') + 4, +eventBox.getAttribute('y') + 14, event.name, 13, 'black', false);
		eventLabel.classList.add('event-label');
		group.append(eventBox, eventLabel);
		const bbox = eventLabel.getBBox();
		eventBox.setAttribute('width', `${bbox.width + 10}px`);
		eventBox.setAttribute('height', `${bbox.height + 5}px`);
	}
}

export default BaseTimelineRenderer;