import Timeline from './timeline-handler';

abstract class AbsTimelineRenderer {
	abstract render(tl :Timeline): void;
}

export default AbsTimelineRenderer;