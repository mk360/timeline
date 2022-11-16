import EventInterface from '../interfaces/event';

class Event implements EventInterface {
	name: string;
	desc?: string;
	occuring_time: number;

	/**
	 * Simply creates an event with a name the date in BDU and an optional description
	 * @constructor Event
	 * @param {string} name - Name of the event
	 * @param {number} date - Occuring date in BDU
	 * @param {string} [desc] - Description of the event
	 */
	constructor(name: string, date: number, desc?: string) {
		this.name = name;
		this.occuring_time = date;

		if (typeof desc !== 'undefined')
			this.desc = desc;
	}

}

export default Event;