/**
 * The module handling periods
 * @module {Period} Period
 */

import PeriodInterface from '../interfaces/period';
import Chronon from '../interfaces/chronon';
import PeriodAddingOptions from '../interfaces/period-adding-options';
import EventAddingOptions from '../interfaces/event-adding-options';
import Event from './event';
import Calendar from './calendar';
import sortChronons from '../methods/sort-chronons';

/**
 * Class handling everything related to periods
 * @implements PeriodInterface
 */
class Period implements PeriodInterface {
	name: string;
	desc?: string;

	start: number;
	end?: number;
	sub_chronons: Chronon[];

	/** @member {(date: (number[] | Chronon), putAtEnd: boolean) => number} computeDate - A function used to compute dates needed for the Period. this binded to Timeline instance */
	computeDate: (date: (number[] | Chronon), putAtEnd: boolean) => number;

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
	constructor(name: string, start: number, end: number, dateComputeFunc: (date: (number[] | Chronon), putAtEnd: boolean) => number, desc?: string) {
		this.name = name;
		this.start = start;
		this.end = end;

		this.computeDate = dateComputeFunc;

		if (typeof desc !== 'undefined')
			this.desc = desc;

		this.sub_chronons = [];
	};

	// === API ===

	/**
	 * Adds a new Event to the temporal line if the date is valid, throws an error otherwise
	 * @method addEvent
	 * @param {EventAddingOptions} options - Event adding options (name, date, offset).
	 * @constructs Event
	 * @returns {Event} - The newly-created event 
	 */
	addEvent(options: EventAddingOptions): Event {
		/*if !isDateValid(date)
			throw error;*/
		const offsetValue = options.offset ? (typeof options.offset === 'number' ? options.offset : this.computeDate(options.offset, false)) : 0;
		let _date: number = typeof options.date === 'number' ? options.date : this.computeDate(options.date, options.putAtEnd);
		let newEvent = new Event(options.name, _date + offsetValue);
		this.sub_chronons.push(newEvent);
		this.sub_chronons = this.sub_chronons.sort(sortChronons);

		return newEvent;
	};

	/**
	 * Adds a new Period to the temporal line if the dates are valid, throws an error otherwise
	 * @method addPeriod
	 * @constructs Period
	 * @returns {Period} - The newly-created period 
	 */
	addPeriod(options: PeriodAddingOptions): Period {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/
		let _start, _end: number;
		_start = typeof options.start.date === 'number' ? options.start.date : this.computeDate(options.start.date, options.start.useEndOfPeriod);
		_end = typeof options.end.date === 'number' ? options.end.date : this.computeDate(options.end.date, options.end.useEndOfPeriod);

		let newPeriod = new Period(options.name, _start, _end, this.computeDate);
		this.sub_chronons.push(newPeriod);

		return newPeriod;
	};

}

export default Period;

/*
	 * @param {PeriodAddingOptions} options - Event adding options (name, date, offset).
	 * @param {string} name - The name of the event
	 * @param {(number|number[]|Chronon)} start - The date at which the period started. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {(number|number[]|Chronon)} end - The date at which the period ended. If it's a number[], the time elapsed since timeline's starting point is computed. If it's a Chronon, the Chronon's internal date is used
	 * @param {string} [desc] - A description of the period
	 * @param {boolean} [endAtStart=true] - A boolean flag used if the start parameter is a Period. If endAtStart is true, the added period will use the ending date of the period parameter (it will be put at the end of the period). Otherwise, it's the starting date of the period parameter that will be used
	 * @param {boolean} [startAtEnd=true] - A boolean flag used if the end parameter is a Period. If startAtEnd is true, the added period will use the ending date of the period parameter (it will be put at the end of the period). Otherwise, it's the starting date of the period parameter that will be used
*/