/**
 * The module handling periods
 * @module {Period} Period
 */

import PeriodStruct from '../interfaces/period';
import Chronon from '../interfaces/chronon';
import Event from './event';
import Calendar from './calendarHandler';
import PeriodAddingOptions from '../interfaces/period-adding-options';

/**
 * Class handling everything related to periods
 * @implements PeriodStruct
 */
class Period implements PeriodStruct {
	name: string;
	desc?: string;
	start: number;
	end?: number;

	sub_chronons: Chronon[];
	refCalendar: Calendar;
	startingPoint: number;

	/**
	 * Creates a new Period. Sets the sub_chronon list to an empty array
	 * @constructor Period
	 * @param {string} name - The name of the period
	 * @param {number} start - The start of the period in BDU elapsed since T0
	 * @param {number} [end] - The end of the period in BDU elapsed since T0
	 * @param {Calendar} calendar - The calendar of the timeline containing the period
	 * @param {number} tlStart - The starting point of the timeline in BDU elapsed since calendar's zero point
	 * @param {string} desc - The description of the Period
	 */
	constructor(name: string, start: number, end: number, refCalendar: Calendar, tlStart: number, desc?: string) {
		this.name = name;
		this.start = start;
		this.end = end;
		this.refCalendar = refCalendar;
		this.startingPoint = tlStart;

		if (typeof desc !== 'undefined')
			this.desc = desc;

		this.sub_chronons = [];
	};

	/**
	 * Adds a new Event to the temporal line if the date is valid, throws an error otherwise
	 * @method addEvent
	 * @param {string} name - The name of the event
	 * @param {(number|number[]|Chronon)} date - The date at which the event occurred. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {string} [desc] - A description of the event
	 * @param {boolean} [putAtEnd=false] - A boolean flag used if the date parameter is a Period. If putAtEnd is true, the added event will use the ending date of the Period (it will be put at the end of the period). Otherwise, it's the starting date of the Period that will be used
	 * @returns {Event} - The newly-created event 
	 */
	addEvent(name: string, date: number | number[] | Chronon, putAtEnd :boolean, offset?: number | number[]): Event {
		/*if !isDateValid(date)
			throw error;*/
		const offsetValue = offset ? (typeof offset === 'number' ? offset : this.computeDate(offset, false)) : 0;
		let _date: number = typeof date === 'number' ? date : this.computeDate(date, putAtEnd);
		let newEvent = new Event(name, _date + offsetValue);
		this.sub_chronons.push(newEvent);

		return newEvent;
	};

	/**
	 * Adds a new Period to the temporal line if the dates are valid, throws an error otherwise
	 * @method addPeriod
	 * @param {string} name - The name of the event
	 * @param {(number|number[]|Chronon)} start - The date at which the period started. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {(number|number[]|Chronon)} end - The date at which the period ended. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {string} [desc] - A description of the period
	 * @param {boolean} [endAtStart=true] - A boolean flag used if the start parameter is a Period. If endAtStart is true, the added period will use the ending date of the period parameter (it will be put at the end of the period). Otherwise, it's the starting date of the period parameter that will be used
	 * @param {boolean} [startAtEnd=true] - A boolean flag used if the end parameter is a Period. If startAtEnd is true, the added period will use the ending date of the period parameter (it will be put at the end of the period). Otherwise, it's the starting date of the period parameter that will be used
	 * @returns {Period} - The newly-created period 
	 */
	addPeriod(options: PeriodAddingOptions): Period {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/
		let _start, _end: number;
		_start = typeof options.start.date === 'number' ? options.start.date : this.computeDate(options.start.date, options.start.useEndOfPeriod);
		_end = typeof options.end.date === 'number' ? options.end.date : this.computeDate(options.end.date, options.end.useEndOfPeriod);

		let newPeriod = new Period(options.name, _start, _end, this.refCalendar, this.startingPoint);
		this.sub_chronons.push(newPeriod);

		return newPeriod;
	};

	/**
	 * Computes the date in basic units of the calendar from the starting point of the timeline
	 * @method computeDate
	 * @param {(number[]|Chronon)} date - The date at which the event occurred. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {boolean} [putAtEnd=false] - A boolean flag used if the date parameter is a Period. If putAtEnd is true, the added event will use the ending date of the Period (it will be put at the end of the period). Otherwise, it's the starting date of the Period that will be used
	 * @returns {number} - The date computed 
	 */
	computeDate(date: number[] | Chronon, putatEnd: boolean): number {
		if (Array.isArray(date))
			return this.refCalendar.getElapsedTime(date)-this.startingPoint;
		else if (date instanceof Event)
			return date.occuring_time;
		else if (date instanceof Period)
			return putatEnd ? date.end : date.start;
		else
			return -1; //throw err
	}

}

export default Period;