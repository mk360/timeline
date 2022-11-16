import Division from './division'

class SecondaryDivision extends Division {
	name: string;

	/** @param {number} level - The level of the secondary division */
	level: number;
	unitsLength?: number | number[];
	unitsNames?: string[];

	/**
	 * Creates a SecondaryDivision
	 * @constructor SecondaryDivision
	 * @param {string} name - The name of the secondary division
	 * @param {number} level - The division which it groups (i.e. weeks group days, its level is the index of the day Division in the divisions array)
	 * @param {number} unitsLength - The number of units that are grouped together by this secondary division (i.e. 7 for weeks)
	 * @param {string[]} [unitsNames] - The name of each unit (i.e. the name of the days of the week) 
	 */
	constructor(name: string, level: number, unitsLength?: number | number[], unitsNames?: string[]) {
		super(name, unitsLength, unitsNames);
		this.level = level;
	};

}

export default SecondaryDivision;