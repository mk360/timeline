/**
 * The module handling temporal lines
 * @module {TemporalLineHandler} TemporalLine
 */

import TemporalLineStructure from '../interfaces/temporalLine';
import Chronon from '../interfaces/chronon';
import Calendar from './calendarHandler';
import Event from './event';
import Period from './period';

/**
 * Class handling temporal lines
 * @implements TemporalLineStructure
 */
class TemporalLine implements TemporalLineStructure {
	name: string;
	chronons: Chronon[];
	/** @member {Calendar} refCalendar - A reference to the calendar of the timeline containing the temporal line */
	refCalendar: Calendar;
	startingPoint: number;

	/**
	 * Creates a new temporal line. Sets the chronon list to an empty array
	 * @constructor TemporalLine
	 * @param {string} name - The name of the temporal line
	 * @param {Calendar} calendar - The calendar of the timeline containing the temporal line
	 * @param {number} tlStart - The starting point of the timeline in BDU elapsed since calendar's zero point
	 */
	constructor(name: string, calendar: Calendar, tlStart: number) {
		this.name = name;
		this.chronons = [];
		this.refCalendar = calendar;
		this.startingPoint = tlStart;
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
	addEvent(name: string, date: number | number[] | Chronon, desc?: string, putAtEnd:boolean = false): Event {
		/*if !isDateValid(date)
			throw error;*/

		let _date: number = typeof date === 'number' ? date : this.computeDate(date, putAtEnd);
		let newEvent = new Event(name, _date);
		this.chronons.push(newEvent);

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
	addPeriod(name: string, start: number | number[] | Chronon, end?: number | number[] | Chronon, desc?: string, endAtStart: boolean = true, startAtEnd: boolean = true) {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/

		let _start, _end: number;
		_start = typeof start === 'number' ? start : this.computeDate(start, endAtStart);
		_end = typeof end === 'number' ? end : this.computeDate(end, startAtEnd);

		let newPeriod = new Period(name, _start, _end, this.refCalendar, this.startingPoint, desc);
		this.chronons.push(newPeriod);

		return newPeriod;
	};

	/**
	 * Computes the date in basic units of the calendar from the starting point of the timeline
	 * @method computeDate
	 * @param {(number[]|Chronon)} date - The date at which the event occurred. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {boolean} [putAtEnd=false] - A boolean flag used if the date parameter is a Period. If putAtEnd is true, the added event will use the ending date of the Period (it will be put at the end of the period). Otherwise, it's the starting date of the Period that will be used
	 * @returns {number} - The date computed 
	 */
	computeDate(date: number[] | Chronon, putatEnd: boolean):number {
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

export default TemporalLine;