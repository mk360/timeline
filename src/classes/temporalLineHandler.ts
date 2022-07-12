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
	};

	addEvent(name: string, date: number[]): Event {
		/*if !isDateValid(date)
			throw error;*/

		let newEvent = new Event(name, this.refCalendar.getElapsedTime(date));
		this.chronons.push(newEvent);

		return newEvent;
	};

	addPeriod(name: string, start: number[], end: number[]) {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/

		let newPeriod = new Period(name, this.refCalendar.getElapsedTime(start), this.refCalendar.getElapsedTime(end));
		this.chronons.push(newPeriod);

		return newPeriod;
	};

}

export default TemporalLine;