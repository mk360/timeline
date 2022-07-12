import EventStruct from '../interfaces/event';

class Event implements EventStruct {
	id: number;
	name: string;
	desc?: string;
	occuring_time: number;

	constructor(name: string, date: number, desc?: string) {
		//construct id
		this.name = name;
		this.occuring_time = date;

		if (typeof desc !== 'undefined')
			this.desc = desc;
	}

}

export default Event;