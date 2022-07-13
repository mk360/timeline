import TimelineType from '../constants/timelineType';
import TimelineStruct from '../interfaces/timeline';
import Calendar from './calendar';
import TemporalLine from './temporalLineHandler';
import AbsTimelineRenderer from './abstractRenderer';

class Timeline implements TimelineStruct {
	calendar: Calendar = new Calendar();
	temporalLines: TemporalLine[];
	renderer: AbsTimelineRenderer;

	constructor(rndr: AbsTimelineRenderer) {
		this.renderer = rndr;
		this.temporalLines = [];
		console.log("Constructed new Timeline");
	}

	addDivision(name: string, unitsLength?: number | number[], unitsNames?: string[]): void {
		this.calendar.divisions.push({name, unitsLength, unitsNames});
		this.calendar.computeCalendarConvTable();
	};

	setStartingPoint(divValues: number[]): void;
	setStartingPoint(timeElapsed: number): void;	//time elapsed since 01/01/0001 ou whatever équivalent dans le calendrier
	setStartingPoint(time: any): void {
		this.calendar.setStartingPoint(time);
	};

	addTemporalLine(name: string, pos?: number): TemporalLine {
		let newTmpL = new TemporalLine(name, this.calendar);

		if (typeof pos !== 'undefined')
		{
			if (this.temporalLines[pos] === undefined)
				this.temporalLines[pos] = newTmpL;
			else
				this.temporalLines.splice(pos, 0, newTmpL);
		}
		else
			this.temporalLines.push(newTmpL);

		return newTmpL;
	};

	getConvRate(div1: number, div2?: number) {
		return this.calendar.getConv(div1, div2);
	}
}

export default Timeline;