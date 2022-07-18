import SvgConfig from '../constants/svg-config';
import Chronon from '../interfaces/chronon';
import SvgCoordinates from '../interfaces/svg-coordinate';
import TemporalLineStruct from '../interfaces/temporalLine';
import AbsTimelineRenderer from './abstractRenderer';
import componentFactory from './component-factory';
import Event from './event';
import Timeline from './timelineHandler';

class BaseTimelineRenderer extends AbsTimelineRenderer {
	tl: Timeline;

	render(timeline: Timeline) {
		this.tl = timeline;

		this.renderRefLine();
	}

	renderRefLine() {
		const referenceLine = componentFactory.createLine(0, 50, SvgConfig.width, 0, 'black', 2);
		this.renderTemporalLine(this.tl.temporalLines[0], referenceLine);
	}

	renderTemporalLine(line: TemporalLineStruct, referenceLine: SVGLineElement) {
		const { chronons } = line;
		for (let chronon of chronons) {
			if (chrononIsEvent(chronon)) {
				this.renderEvent(chronon, referenceLine);
				return;
			} else {
			}
		}
	}

	renderEvent(event: Event, referenceLine: SVGLineElement) {
		const { occuring_time } = event;
		const y2 = +referenceLine.getAttribute('y1');
		const eventPosition = Math.abs(+referenceLine.getAttribute('x1') -  +referenceLine.getAttribute('x2')) / 2;

		// const eventLineFirstCoordinates: SvgCoordinates = {
		// 	x: eventPosition,
		// 	y: y2,
		// };
		const eventLine = componentFactory.createAbsoluteLine(eventPosition, y2, 40, -77, 'black', 1);
		const eventLineX2 = +eventLine.getAttribute('x2');
		const eventLineY2 = +eventLine.getAttribute('y2');
		const boxHeight = 40;
		const eventBox = componentFactory.createAbsoluteBox(eventLineX2 - 2, eventLineY2 - boxHeight / 2, boxHeight, boxHeight * 2, 'rgba(200, 200, 200, 0.9)');
		const topLeftCorner: SvgCoordinates = {
			x: +eventBox.getAttribute('x') + 4,
			y: +eventBox.getAttribute('y') + 15,
		};
		const eventLabel = componentFactory.createAbsoluteText(topLeftCorner.x, topLeftCorner.y, event.name, 16, 'black');
		eventBox.setAttribute('width', `${eventLabel.getBBox().width + 10}px`);
	}
}

function chrononIsEvent(chronon: Chronon): chronon is Event {
	return 'occuring_time' in chronon;
}

export default BaseTimelineRenderer