import SvgConfig from '../constants/svg-config';
import hoverable from '../plugins/hoverable';
import TemporalLineStruct from '../interfaces/temporalLine';
import AbsTimelineRenderer from './abstractRenderer';
import componentFactory from './component-factory';
import Event from './event';
import Timeline from './timelineHandler';
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
		this.renderRefLine();
	}

	renderRefLine() {
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

		let eventRenderPosition = 0;
		let periodRenderPosition = 0;

		for (let period of periods) {
			periodRenderPosition += getChrononStart(period);
			this.renderPeriod(period, referenceLine, temporalLinePosition, periodRenderPosition);
		}

		for (let event of events) {
			eventRenderPosition = eventRenderPosition + Math.abs(getChrononStart(event) - eventRenderPosition);
			this.renderEvent(event, referenceLine, temporalLinePosition, eventRenderPosition);
		}
	}

	renderPeriod(period: Period, referenceLine: SVGLineElement, linePosition: number, position: number) {
		if (typeof period.start === 'object') {
			this.renderEvent(period.start, referenceLine, linePosition, position);
		}

		const periodPosition = period.start / Math.abs(+referenceLine.getAttribute('x1') -  +referenceLine.getAttribute('x2')) * 100;
		const periodHeight = SvgConfig.temporalLineHeight;
		componentFactory.createAbsoluteBox(position, linePosition - 80, periodHeight, 8000, 'rgba(255, 0, 0, 0.2)');
	}

	renderEvent(event: Event, referenceLine: SVGLineElement, linePosition: number, renderPosition: number) {
		const y1 = linePosition;
		const eventLine = componentFactory.createAbsoluteLine(renderPosition / 20, y1, 40, -90, 'rgba(200, 200, 200, 0.9)', 1, false);
		const eventLineY2 = +eventLine.getAttribute('y2');
		const boxHeight = SvgConfig.eventBoxHeight;
		const group = hoverable(componentFactory.createAbsoluteGroup(), {
			in(element) {
				const [box, line, label] = Array.from(element.children);
				box.setAttribute('fill', 'red');
				line.setAttribute('style', 'stroke:red;stroke-width:1');
			},
			out(element) {
				const [box, line, label] = Array.from(element.children);
				box.setAttribute('fill', 'rgba(200, 200, 200, 0.9)');
				line.setAttribute('style', 'stroke:rgba(200, 200, 200, 0.9); stroke-width:1');
			}
		});
		const eventBox = componentFactory.createAbsoluteBox(+eventLine.getAttribute('x1') - 1, eventLineY2 - boxHeight / 2, boxHeight, boxHeight * 2, 'rgba(200, 200, 200, 0.9)', false);
		const eventLabel = componentFactory.createAbsoluteText(+eventBox.getAttribute('x') + 4, +eventBox.getAttribute('y') + 17, event.name, 16, 'black', false);
		group.append(eventBox, eventLine, eventLabel);
		eventBox.setAttribute('width', `${eventLabel.getBBox().width + 10}px`);
	}
}

export default BaseTimelineRenderer