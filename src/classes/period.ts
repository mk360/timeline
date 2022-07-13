import PeriodStruct from '../interfaces/period';
import Chronon from '../interfaces/chronon';
import Event from './event';
import Calendar from './calendar';

class Period implements PeriodStruct {
	id: number;
	name: string;
	desc?: string;
	start: number | Chronon;
	end?: number | Chronon;
	sub_chronons: Chronon[];
	refCalendar: Calendar;

	constructor(name: string, start: number | Chronon, end: number | Chronon, refCalendar: Calendar, desc?: string) {
		//construct id
		this.name = name;
		this.start = start;
		this.end = end;
		this.refCalendar = refCalendar;

		if (typeof desc !== 'undefined')
			this.desc = desc;

		this.sub_chronons = [];
	};

	addEvent(name: string, date: number[]): Event {
		/*if !isDateValid(date)
			throw error;*/

		let newEvent = new Event(name, this.refCalendar.getElapsedTime(date)-this.refCalendar.startingPoint);
		this.sub_chronons.push(newEvent);

		return newEvent;
	};

	addPeriod(name: string, start: number[] | Chronon, end: number[] | Chronon) {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/

		let _start, _end: number | Chronon;
		_start = Array.isArray(start) ? this.refCalendar.getElapsedTime(start)-this.refCalendar.startingPoint : start;
		_end = Array.isArray(end) ? this.refCalendar.getElapsedTime(end)-this.refCalendar.startingPoint : end;

		let newPeriod = new Period(name, _start, _end, this.refCalendar);
		this.sub_chronons.push(newPeriod);

		return newPeriod;
	};

}

export default Period;