import Timeline from './timeline';

abstract class AbsTimelineRenderer {
	abstract render(tl :Timeline): void;
}

export default AbsTimelineRenderer;