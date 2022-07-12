import Timeline from './timelineHandler';

abstract class AbsTimelineRenderer {
	abstract render(tl :Timeline): void;
}

export default AbsTimelineRenderer;