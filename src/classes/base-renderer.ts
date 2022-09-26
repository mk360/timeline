import SvgConfig from '../constants/svg-config';
import hoverable from '../plugins/hoverable';
import TemporalLineStruct from '../interfaces/temporalLine';
import AbsTimelineRenderer from './abstract-renderer';
import componentFactory from './component-factory';
import Event from './event';
import Timeline from './timeline-handler';
import Period from './period';
import chrononIsEvent from '../methods/chronon-is-event';
import getChrononStart from '../methods/get-chronon-start';

function* getNextPositionMultiplier() {
	let multiplier = 1;

	yield -multiplier;
	multiplier++;
	return multiplier;
};

function* getNextPosition() {
	let multiplier = getNextPositionMultiplier();

	let offset = 0;

	while (true) {
		const nextMultiplier = multiplier.next();
		yield offset * nextMultiplier.value;
		if (nextMultiplier.done) {
			offset -= SvgConfig.temporalLineHeight;
			multiplier = getNextPositionMultiplier();
		}
	}

	return offset;
};

class BaseTimelineRenderer extends AbsTimelineRenderer {
	private tl: Timeline;
	private positionGetter = getNextPosition();

	render(timeline: Timeline) {
		this.tl = timeline;

		let temporalLinePosition = SvgConfig.height / 2;
		for (let line of this.tl.temporalLines) {
			this.renderTemporalLine(line, temporalLinePosition);
			const val = this.positionGetter.next().value;
			temporalLinePosition += val;
		}

		this.renderReferenceLine();
	}

	renderReferenceLine() {
		const startingYear = this.getYear(this.tl.startingPoint);
		const endingYear = this.getYear(this.tl.endingPoint);
		const linePosition = SvgConfig.height / 1.5;
		const line = componentFactory.createAbsoluteLine(0, linePosition, Number.MAX_SAFE_INTEGER, 0, 'black', 1);
		
		for (let i = 0; i < endingYear - startingYear + 1; i++) {
			const computedYear = i + startingYear;
			const yearPlacement = this.tl.calendar.getElapsedTime([computedYear, 1, 1]) - this.tl.startingPoint;
			const notch = componentFactory.createAbsoluteBox(yearPlacement, +line.getAttribute('y1') - 5, 10, 1, 'black');
			componentFactory.createAbsoluteText(+notch.getAttribute('x') - 10, +notch.getAttribute('y') - 5, computedYear.toString(), 10, 'black');
		}
	}

	getYear(timelinePoint: number) {
		const yearZero = this.tl.calendar.getElapsedTime([1, 1, 1], false);
		const yearOne = this.tl.calendar.getElapsedTime([2, 1, 1], false);
		const yearOffset = yearOne - yearZero;

		return Math.floor(timelinePoint / yearOffset);
	}

	renderTemporalLine(line: TemporalLineStruct, temporalLinePosition: number) {
		const referenceLine = componentFactory.createAbsoluteLine(0, temporalLinePosition, Number.MAX_SAFE_INTEGER, 0, 'black', 2);
		const { chronons } = line;
		const events: Event[] = [];
		const periods: Period[] = [];

		for (let chronon of chronons) {
			if (chrononIsEvent(chronon)) {
				events.push(chronon);
			} else {
				periods.push(chronon as Period);
			}
		}

		for (let period of periods) {
			const position = getChrononStart(period);
			this.renderPeriod(period, referenceLine, temporalLinePosition, position);
		}

		for (let event of events) {
			const position = getChrononStart(event);
			this.renderEvent(event, temporalLinePosition, position);
		}
	}

	renderPeriod(period: Period, referenceLine: SVGLineElement, linePosition: number, position: number) {
		for (let chronon of period.sub_chronons) {
			if (chronon instanceof Period) {
				this.renderPeriod(chronon, referenceLine, linePosition, position);
			}
		}

		const periodDuration = period.end - period.start;
		const periodHeight = SvgConfig.temporalLineHeight;
		componentFactory.createAbsoluteBox(position, linePosition - 80, periodHeight, periodDuration, 'rgba(255, 0, 0, 0.2)');
	}

	renderEvent(event: Event, linePosition: number, renderPosition: number) {
		const y1 = linePosition;
		const eventLine = componentFactory.createAbsoluteLine(renderPosition, y1, 40, -90, 'rgba(200, 200, 200, 0.9)', 1, false);
		eventLine.classList.add('event-line');
		const eventLineY2 = +eventLine.getAttribute('y2');
		const boxHeight = SvgConfig.eventBoxHeight;
		const group = hoverable(componentFactory.createAbsoluteGroup(), {
			in(element) {
				const [box, line, label] = Array.from(element.children);
			},
			out(element) {
				const [box, line, label] = Array.from(element.children);
			}
		});
		group.classList.add('event-group');
		const eventBox = componentFactory.createAbsoluteBox(+eventLine.getAttribute('x1') - 1, eventLineY2 - boxHeight / 2, boxHeight, boxHeight * 2, 'rgba(200, 200, 200, 0.9)', false);
		eventBox.classList.add('event-box');
		const eventLabel = componentFactory.createAbsoluteText(+eventBox.getAttribute('x') + 4, +eventBox.getAttribute('y') + 17, event.name, 16, 'black', false);
		eventLabel.classList.add('event-label');
		group.append(eventBox, eventLine, eventLabel);
		eventBox.setAttribute('width', `${eventLabel.getBBox().width + 10}px`);
	}
}

export default BaseTimelineRenderer;