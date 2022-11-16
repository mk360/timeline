/**
 * The module handling temporal lines
 * @module {TemporalLineHandler} TemporalLine
 */

import TemporalLineStructure from '../interfaces/temporal-line';
import Chronon from '../interfaces/chronon';
import PeriodAddingOptions from '../interfaces/period-adding-options';
import EventAddingOptions from '../interfaces/event-adding-options';
import Calendar from './calendar';
import Event from './event';
import Period from './period';
import sortChronons from '../methods/sort-chronons';


/**
 * Class handling temporal lines
 * @implements TemporalLineStructure
 */
class TemporalLine implements TemporalLineStructure {
	name: string;
	chronons: Chronon[];
	/** @member {Calendar} refCalendar - A reference to the calendar of the timeline containing the temporal line */

	computeDate: (date: (number[] | Chronon), putAtEnd: boolean) => number;

	/**
	 * Creates a new temporal line. Sets the chronon list to an empty array
	 * @constructor TemporalLine
	 * @param {string} name - The name of the temporal line
	 * @param {Calendar} calendar - The calendar of the timeline containing the temporal line
	 * @param {number} tlStart - The starting point of the timeline in BDU elapsed since calendar's zero point
	 */
	constructor(name: string, dateComputeFunc:(date: (number[] | Chronon), putAtEnd: boolean) => number) {
		this.name = name;
		this.chronons = [];
		this.computeDate = dateComputeFunc;
	};

	// === API ===
	// ==== MANAGERS ====

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
		this.chronons = this.chronons.sort(sortChronons);

		return newEvent;
	};

	/**
	 * Adds a new Period to the temporal line if the dates are valid, throws an error otherwise
	 * @method addPeriod
	 * @param {PeriodAddingOptions} options Period configuration options
	 */
	addPeriod(options: PeriodAddingOptions): Period {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/

		let _start, _end: number;
		_start = typeof options.start.date === 'number' ? options.start.date : this.computeDate(options.start.date, options.start.useEndOfPeriod);
		_end = typeof options.end.date === 'number' ? options.end.date : this.computeDate(options.end.date, options.end.useEndOfPeriod);

		let newPeriod = new Period(options.name, _start, _end, this.computeDate, options.description);
		this.chronons.push(newPeriod);

		return newPeriod;
	};

}

export default TemporalLine;