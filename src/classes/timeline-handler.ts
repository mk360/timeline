/**
 * TimelineHandler module, storing everything needed to handle a timeline
 * @module {TimelineHandler} Timeline
 */

import TimelineStruct from '../interfaces/timeline';
import Division from './division';
import Calendar from './calendar-handler';
import TemporalLine from './temporal-line-handler';
import getConvTable from '../constants/calendarConversionTable'
import Chronon from '../interfaces/chronon'
import Event from '../classes/event'
import Period from '../classes/period'

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

	// === API ===
	// ==== MANAGER ====

	/**
	 * Sets the calendar of the timeline
	 * @method setCalendar
	 * @param {Calendar} newCalendar - A Calendar instance
	 */
	setCalendar(newCalendar: Calendar): void {
		this.calendar = newCalendar;
	}

	/**
	 * Sets the starting point of the timeline. ! This is different from the zero point of the calendar !
	 * @method setStartingPoint
	 * @param {number|number[]} time - The starting date, either expressed in terms of basic units elapsed since point zero; or fully qualified
	 */
	//time elapsed since 01/01/0001 ou whatever équivalent dans le calendrier
	setStartingPoint(time: number|number[]): void {
		if (Array.isArray(time))
			this.startingPoint = this.calendar.getElapsedTime(time);
		else
			this.startingPoint = time;
	};

	/**
	 * Sets the ending point of the timeline
	 * @method setEndingPoint
	 * @param {number|number[]} time - The ending date, either expressed in terms of basic units elapsed since point zero; or fully qualified
	 */
	setEndingPoint(time: number | number[]): void {
		if (Array.isArray(time)) {
			this.endingPoint = this.calendar.getElapsedTime(time);
		} else {
			this.endingPoint = time;
		}
	}

	/**
	 * Adds a temporal line to the timeline
	 * @method addTemporalLine
	 * @param {string} name - The name of the temporal line
	 * @param {number} [pos] - The position to which to render the temporal line
	 * @constructs TemporalLine
	 * @returns {TemporalLine} - The newly created temporal line
	 */
	addTemporalLine(name: string, pos?: number): TemporalLine {
		let newTmpL = new TemporalLine(name, this.calendar, this.startingPoint, this.computeDate);

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

	// ==== OPERATIONS ====

	/**
	 * Converts the timeline to another calendar using conversion rate
	 * @method convertsTo
	 * @param {Calendar} cal - The target calendar
	 * @constructs Timeline
	 * @returns {Timeline} - The converted Timeline 
	 */
	convertsTo(cal: Calendar): Timeline {
		var converted_tl: Timeline = new Timeline(cal);
		converted_tl.startingPoint = this.startingPoint + getConvTable(this.calendar.id, cal.id);
		converted_tl.temporalLines = this.temporalLines

		return converted_tl;
	}

	/**
	 * Converts the timeline to another calendar with conversion rate expressed
	 * @method convertsToWithRate
	 * @param {Calendar} cal - The target calendar
	 * @constructs Timeline
	 * @returns {Timeline} - The converted Timeline 
	 */
	convertsToWithRate(cal: Calendar, rate: number): Timeline {
		var converted_tl: Timeline = new Timeline(cal);
		converted_tl.startingPoint = this.startingPoint + rate;
		converted_tl.temporalLines = this.temporalLines

		return converted_tl;
	}

	/**
	 * Computes the date in basic units of the calendar from the starting point of the timeline
	 * @method computeDate
	 * @param {(number[]|Chronon)} date - The date at which the event occurred. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {boolean} [putAtEnd=false] - A boolean flag used if the date parameter is a Period. If putAtEnd is true, the added event will use the ending date of the Period (it will be put at the end of the period). Otherwise, it's the starting date of the Period that will be used
	 * @returns {number} - The date computed 
	 */
	computeDate(date: number[] | Chronon, putAtEnd: boolean): number {
		if (Array.isArray(date))
			return this.calendar.getElapsedTime(date)-this.startingPoint;
		else if (date instanceof Event)
			return date.occuring_time;
		else if (date instanceof Period)
			return putAtEnd ? date.end : date.start;
		else
			return -1; //throw err
	}

}

export default Timeline;