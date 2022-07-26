import SvgConfig from '../constants/svg-config';
import Chronon from '../interfaces/chronon';
import hoverable from '../plugins/hoverable';
import TemporalLineStruct from '../interfaces/temporalLine';
import AbsTimelineRenderer from './abstractRenderer';
import componentFactory from './component-factory';
import Event from './event';
import Timeline from './timelineHandler';
import Period from './period';

function* getNextPositionMultiplier() {
	let multiplier = 0;

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
		const referenceLine = componentFactory.createAbsoluteLine(0, temporalLinePosition, SvgConfig.width, 0, 'black', 2);
		const { chronons } = line;
		for (let chronon of chronons) {
			if (chrononIsEvent(chronon)) {
				this.renderEvent(chronon, referenceLine, temporalLinePosition);
			} else {
				this.renderPeriod(chronon as Period, referenceLine, temporalLinePosition);
			}
		}
	}

	renderPeriod(period: Period, referenceLine: SVGLineElement, linePosition: number) {
		if (typeof period.start === 'object') {
			this.renderEvent(period.start, referenceLine, linePosition);
		}

		const periodPosition = period.start / Math.abs(+referenceLine.getAttribute('x1') -  +referenceLine.getAttribute('x2')) * 100;
		const periodHeight = SvgConfig.temporalLineHeight;
		componentFactory.createAbsoluteBox(periodPosition, linePosition - 80, periodHeight, 8000, 'rgba(255, 0, 0, 0.2)');
	}

	renderEvent(event: Event, referenceLine: SVGLineElement, linePosition: number) {
		const { occuring_time } = event;
		const y1 = linePosition;
		const eventPosition = occuring_time / Math.abs(+referenceLine.getAttribute('x1') -  +referenceLine.getAttribute('x2')) * 100;
		const eventLine = componentFactory.createAbsoluteLine(eventPosition, y1, 40, -90, 'rgba(200, 200, 200, 0.9)', 1, false);
		const eventLineX2 = +eventLine.getAttribute('x2');
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
		const eventBox = componentFactory.createAbsoluteBox(eventLineX2 - 1, eventLineY2 - boxHeight / 2, boxHeight, boxHeight * 2, 'rgba(200, 200, 200, 0.9)', false);
		const eventLabel = componentFactory.createAbsoluteText(+eventBox.getAttribute('x') + 4, +eventBox.getAttribute('y') + 17, event.name, 16, 'black', false);
		group.append(eventBox, eventLine, eventLabel);
		eventBox.setAttribute('width', `${eventLabel.getBBox().width + 10}px`);
	}
}

function chrononIsEvent(chronon: Chronon): chronon is Event {
	return 'occuring_time' in chronon;
}

export default BaseTimelineRenderer