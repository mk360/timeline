/**
 * @module {CalendarStruct} Calendar
 */

import DivisionStruct from '../interfaces/division'

/**
 * An interface storing the basic structure of a calendar
 * @interface CalendarStruct
 */
interface CalendarStruct {
	/** @member {DivisionStruct[]} divisions - A list of divisions for the calendar */
	divisions: DivisionStruct[];
	/** @member {DivisionStruct[]} [secondaryDivisions] - A list of secondary divisions for the calendar, that is to say, divisions that are not aligned with the primary divisions (ie : weeks) */
	secondaryDivisions?: DivisionStruct[]; // Pour les semaines
};

export default CalendarStruct;