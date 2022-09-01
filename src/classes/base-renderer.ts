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
	let multiplier = -1;

	while (true) {
		yield multiplier;
		if (multiplier === -1) {
			multiplier = -2;
		} else {
			multiplier = -1;
		}
	}

	return multiplier;
};

class BaseTimelineRenderer extends AbsTimelineRenderer {
	private tl: Timeline;
	private positionMultiplier = getNextPositionMultiplier();

	render(timeline: Timeline) {
		this.tl = timeline;

		let temporalLinePosition = SvgConfig.height / 2;
		for (let line of this.tl.temporalLines) {
			this.renderTemporalLine(line, temporalLinePosition);
			temporalLinePosition *= this.positionMultiplier.next().value;
		}

		this.renderReferenceLine();
	}

	renderReferenceLine() {
		const linePosition = SvgConfig.height / 1.5;
		const line = componentFactory.createAbsoluteLine(0, linePosition, Number.MAX_SAFE_INTEGER, 0, 'black', 1);
		const yr = this.getYear(this.tl.startingPoint);

		for (let i = 0; i < yr; i++) {
			const computedYear = i + yr;
			const renderPosition = this.tl.calendar.getElapsedTime([computedYear, 1, 1]) - this.tl.calendar.getElapsedTime([yr, 1, 1]);
			const notch = componentFactory.createAbsoluteBox(renderPosition, +line.getAttribute('y1') - 5, 10, 1, 'black');
			const yearLabel = componentFactory.createAbsoluteText(+notch.getAttribute('x') - 1, +notch.getAttribute('y') - 5, computedYear.toString(), 10, 'black');
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

		let eventRenderPosition = this.tl.startingPoint;
		let periodRenderPosition = this.tl.startingPoint;

		for (let period of periods) {
			periodRenderPosition += getChrononStart(period) - this.tl.startingPoint;
			this.renderPeriod(period, referenceLine, temporalLinePosition, periodRenderPosition);
		}

		for (let event of events) {
			eventRenderPosition += getChrononStart(event) - this.tl.startingPoint;
			this.renderEvent(event, temporalLinePosition, eventRenderPosition);
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
		const eventLine = componentFactory.createAbsoluteLine(renderPosition / 20, y1, 40, -90, 'rgba(200, 200, 200, 0.9)', 1, false);
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

export default BaseTimelineRenderer