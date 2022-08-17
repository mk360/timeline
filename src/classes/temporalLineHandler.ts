/**
 * The module handling temporal lines
 * @module {TemporalLineHandler} TemporalLine
 */

import TemporalLineStructure from '../interfaces/temporalLine';
import Chronon from '../interfaces/chronon';
import Calendar from './calendarHandler';
import Event from './event';
import Period from './period';
import PeriodAddingOptions from '../interfaces/period-adding-options';
import EventAddingOptions from '../interfaces/event-adding-options';

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
	 * @param {EventAddingOptions} options Event Adding options
	 * @returns {Event} - The newly-created event 
	 */
	addEvent(options: EventAddingOptions): Event {
		/*if !isDateValid(date)
			throw error;*/

		let _date: number = typeof options.date === 'number' ? options.date : this.computeDate(options.date, options.putAtEnd);
		let newEvent = new Event(options.name, _date);
		this.chronons.push(newEvent);

		return newEvent;
	};

	/**
	 * Adds a new Period to the temporal line if the dates are valid, throws an error otherwise
	 * @method addPeriod
	 * @param {PeriodAddingOptions} options Period configuration options
	 */
	addPeriod(options: PeriodAddingOptions) {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/

		let _start, _end: number;
		_start = typeof options.start.date === 'number' ? options.start.date : this.computeDate(options.start.date, options.start.useEndOfPeriod);
		_end = typeof options.end.date === 'number' ? options.end.date : this.computeDate(options.end.date, options.end.useEndOfPeriod);

		let newPeriod = new Period(options.name, _start, _end, this.refCalendar, this.startingPoint, options.description);
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