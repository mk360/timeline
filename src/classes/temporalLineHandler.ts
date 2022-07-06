import TemporalLineStructure from '../interfaces/temporalLine';
import Chronon from '../interfaces/chronon';

class TemporalLine implements TemporalLineStructure {
	name: string;
	chronons: Chronon[];

	constructor(name: string) {
		this.name = name;
	};

	addEvent(name: string, date: number[]): Event {
		/*if !isDateValid(date)
			throw error;*/

		let newEvent = new Event(name, date);
		chronons.push(newEvent);

		return newEvent;
	};

	addPeriod(name: string, start: number[], end: number[]) {	
		/*if (!isDateValid(start) or !isDateValid(end) 
			throw error;*/

		let newPeriod = new Period(name, start, end);
		chronons.push(newPeriod);

		return newPeriod;
	};

}

export default TemporalLine;