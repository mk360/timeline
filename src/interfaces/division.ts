/**
 * @module {DivisionStruct} Division
 */

import Calendar from "../classes/calendar-handler";

/**
 * An interface storing the information needed for a division
 * @interface DivisionStruct
 */
interface DivisionStruct {
	/** @member {string} name - The name of the division */
	name: string;
	/** @member {(number|number[])} [unitsLength] - The number of units in which this division is subdivided (for exemple, 12 for a year divided in months). A number[] indicates that the division is irregularily subdivided (like months whose number of days depends of said month) */
	unitsLength?: number | number[];
	/** @member {string[]} [unitsNames] - The names for the division's units (for exemple, the months' names for a month division) */
	unitsNames?: string[];
}

export default DivisionStruct;