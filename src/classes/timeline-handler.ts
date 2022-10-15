/**
 * TimelineHandler module, storing everything needed to handle a timeline
 * @module {TimelineHandler} Timeline
 */

import TimelineStruct from '../interfaces/timeline';
import Division from './division';
import Calendar from './calendar-handler';
import TemporalLine from './temporal-line-handler';

/**
 * Handles a timeline, ie, a collection of temporal lines referencing chronons according to a calendar
 * @implements {TimelineStruct}
 */
class Timeline implements TimelineStruct {
	/** @member {Calendar} calendar - The calendar reference to keep track of chronons' position in time */
	calendar: Calendar = new Calendar();
	/** @member {TemporalLine[]} temporalLines - The list of temporal lines in the timeline */
	temporalLines: TemporalLine[];
	/** @member {number} startingPoint - The starting date for the timeline. It is stored in a number representing the number of basic calendar division elapsed since the zero point (01/01/01)*/
	startingPoint: number;
	/** @member {number} endingPoint - The ending date for the timeline. It is stored in a number representing the number of basic calendar divisions elapsed since the zero point (01/01/01) */
	endingPoint: number;

	/**
	 * Creates a new timeline
	 * @constructor Timeline
	 * @param {Calendar} [cal] - A pre-constructed calendar class
	 */
	constructor(cal?: Calendar) {
		this.temporalLines = [];

		if (typeof cal !== 'undefined')
			this.calendar = cal;

		console.log("Constructed new Timeline");
	}

	/**
	 * Sets the starting point of the timeline. ! This is different from the zero point of the calendar !
	 * @method setStartingPoint
	 */
	setStartingPoint(divValues: number[]): void;
	setStartingPoint(timeElapsed: number): void;	//time elapsed since 01/01/0001 ou whatever équivalent dans le calendrier
	setStartingPoint(time: any): void {

		if (Array.isArray(time))
			this.startingPoint = this.calendar.getElapsedTime(time);
		else if (typeof time === 'number')
			this.startingPoint = time;
	};

	setEndingPoint(divValues: number[]): void;
	setEndingPoint(timeElapsed: number): void;
	setEndingPoint(time: number | number[]): void {
		if (Array.isArray(time)) {
			this.endingPoint = this.calendar.getElapsedTime(time);
		} else {
			this.endingPoint = time;
		}
	}

	setCalendar(newCalendar: Calendar): void {
		this.calendar = newCalendar;
	}

	/**
	 * Adds an irregularity to the standard structure of the calendar
	 * @method addOddity
	 * @param {number} [div] - The division on which the oddity is
	 * @param {number} [unit] - The unit modified by the oddity
	 * @param {number} [value] - The odd value of the unit
	 * @param {((...cond_unit: number[]) => boolean)} [condition] - The condition upon which the unit is modified
	 */
	addOddity(div: number, unit: number, value: number, checker_div: number, condition: ((...cond_unit: number[]) => boolean), occurences: ((...boundaries: number[]) => number)): void {
		this.calendar.addOddity(div, unit, value, checker_div, condition, occurences);
	};

	/**
	 * Adds a temporal line to the timeline
	 * @method addTemporalLine
	 * @param {string} name - The name of the temporal line
	 * @param {number} [pos] - The position to which to render the temporal line
	 * @constructs TemporalLine
	 * @returns {TemporalLine} - The newly created temporal line
	 */
	addTemporalLine(name: string, pos?: number): TemporalLine {
		let newTmpL = new TemporalLine(name, this.calendar, this.startingPoint);

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

	/**
	 * Gets the the conversion rate between two divisions
	 * @method getConvRate
	 * @param {number} div1 - The division from which we convert
	 * @param {number} [div2] - The division to which we convert. If ommited, will convert to the base division
	 * @returns {number} - The conversion rate between div1 and div2
	 */
	getConvRate(div1: number, div2?: number): number {
		return this.calendar.getConv(div1, div2);
	};

}

export default Timeline;