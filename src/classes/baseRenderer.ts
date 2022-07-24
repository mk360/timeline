import SvgConfig from '../constants/svg-config';
import Chronon from '../interfaces/chronon';
import hoverable from '../plugins/hoverable';
import TemporalLineStruct from '../interfaces/temporalLine';
import AbsTimelineRenderer from './abstractRenderer';
import componentFactory from './component-factory';
import Event from './event';
import Timeline from './timelineHandler';

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

		this.renderRefLine();
	}

	renderRefLine() {
		let temporalLinePosition = SvgConfig.temporalLineHeight;

		for (let line of this.tl.temporalLines) {
			this.renderTemporalLine(line, temporalLinePosition);
			temporalLinePosition *= this.positionMultiplier.next().value;
		}
		this.renderTemporalLine(this.tl.temporalLines[0], temporalLinePosition);
	}

	renderTemporalLine(line: TemporalLineStruct, temporalLinePosition: number) {
		const referenceLine = componentFactory.createLine(0, temporalLinePosition, SvgConfig.width, 0, 'black', 2);
		const { chronons } = line;
		for (let chronon of chronons) {
			if (chrononIsEvent(chronon)) {
				this.renderEvent(chronon, referenceLine);
			} else {
			}
		}
	}

	renderEvent(event: Event, referenceLine: SVGLineElement) {
		const { occuring_time } = event;
		const y1 = +referenceLine.getAttribute('y1');
		const eventPosition = Math.abs(+referenceLine.getAttribute('x1') -  +referenceLine.getAttribute('x2')) / 2;
		const eventLine = componentFactory.createAbsoluteLine(eventPosition, y1, 40, -90, 'rgba(200, 200, 200, 0.9)', 1, false);
		const eventLineX2 = +eventLine.getAttribute('x2');
		const eventLineY2 = +eventLine.getAttribute('y2');
		const boxHeight = 40;
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