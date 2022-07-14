import SvgConfig from '../constants/svg-config';
import AbsTimelineRenderer from './abstractRenderer';
import componentFactory from './component-factory';
import Timeline from './timelineHandler';

class BaseTimelineRenderer extends AbsTimelineRenderer {
	tl: Timeline;

	render(timeline: Timeline) {
		this.tl = timeline;

		this.renderRefLine();
	}

	renderRefLine() {
		componentFactory.createLine(0, 50, SvgConfig.width, 0, 'black', 2);
	}

}

export default BaseTimelineRenderer