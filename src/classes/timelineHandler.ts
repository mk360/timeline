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
		console.log("Constructed new Timeline");
	}

	addDivision(name: string, subdivisionsLength?: number | number[], subdivisionsNames?: string[]): void {
		this.calendar.divisions.push({name, subdivisionsLength, subdivisionsNames});
		this.calendar.computeCalendarConvTable();
	};

	setStartingPoint(divValues: number[]): void;
	setStartingPoint(timeElapsed: number): void;	//time elapsed since 01/01/0001 ou whatever équivalent dans le calendrier
	setStartingPoint(time: any): void {
		if (Array.isArray(time))
		{
			this.calendar.startingPoint = time;
		}
		else if (typeof time === 'number')
		{
			let date: number[];
			let i: number = 0;

			do {
				let divisor = this.calendar.getConv(i, -1);

				date[i] = Math.floor(time/divisor);
				time = time%divisor;
				++i;

			} while (time !== 0);
		}

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

}

export default Timeline;