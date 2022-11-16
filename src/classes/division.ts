import DivisionInterface from '../interfaces/division'

/**
 * @implements DivisionInterface
 */
class Division implements DivisionInterface {
	name: string;
	unitsLength?: number | number[];
	unitsNames?: string[];

	/**
	 * Creates a new Division
	 * @constructor Division
	 * @param {string} name - The name of the division
	 * @param {(number|number)} [unitsLength] - The number of units in which this division is subdivided (for exemple, 12 for a year divided in months). A number[] indicates that the division is irregularily subdivided (like months whose number of days depends of said month)
	 * @param {string[]} [unitsNames] - The names for the division's units (for exemple, the months' names for a month division)
	 */
	constructor(name: string, unitsLength?: number | number[], unitsNames?: string[]) {
		this.name = name;
		this.unitsLength = unitsLength;
		this.unitsNames = unitsNames;
	};

}

export default Division;