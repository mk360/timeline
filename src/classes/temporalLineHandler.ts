import TemporalLineStructure from '../interfaces/temporalLine';
import Chronon from '../interfaces/chronon';
import Calendar from './calendar';
import Event from './event';
import Period from './period';

class TemporalLine implements TemporalLineStructure {
	name: string;
	refCalendar: Calendar;
	chronons: Chronon[];

	constructor(name: string, calendar: Calendar) {
		this.name = name;
		this.refCalendar = calendar;
		this.chronons = [];
	};

	addEvent(name: string, date: number[]): Event {
		/*if !isDateValid(date)
			throw error;*/

		let newEvent = new Event(name, this.refCalendar.getElapsedTime(date)-this.refCalendar.startingPoint);
		this.chronons.push(newEvent);

		return newEvent;
	};

	addPeriod(name: string, start: number[] | Chronon, end?: number[] | Chronon, desc?: string) {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/

		let _start, _end: number | Chronon;
		_start = Array.isArray(start) ? this.refCalendar.getElapsedTime(start) : start;
		_end = Array.isArray(end) ? this.refCalendar.getElapsedTime(end) : end;

		let newPeriod = new Period(name, _start, _end, this.refCalendar);
		this.chronons.push(newPeriod);

		return newPeriod;
	};

}

export default TemporalLine;