import AbsTimelineRenderer from './abstractRenderer';
import Timeline from './timelineHandler';

class BaseTimelineRenderer extends AbsTimelineRenderer {
	tl: Timeline;

	render(timeline: Timeline) {
		this.tl = timeline;

		this.renderRefLine();
	}

	renderRefLine() {
		//render primary divisions

		//render secondary divisions	

	}

}

export default BaseTimelineRenderer