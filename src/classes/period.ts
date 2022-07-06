import PeriodStruct from '../interfaces/period';

class Period implements PeriodStruct {
	id: number;
	name: string;
	desc?: string;
	start: number | number[];
	end?: number | number[];

	constructor(name: string, start: number[], end: number[], desc?: string) {
		//construct id
		this.name = name;
		this.start = start;
		this.end = end;

		if (typeof desc !== 'undefined')
			this.desc = desc;
	}

}

export default Period;