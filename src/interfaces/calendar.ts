/**
 * @module {Calendar} Calendar
 */

import Division from '../interfaces/division'

/**
 * An interface storing the basic structure of a calendar
 * @interface Calendar
 */
interface Calendar {
	/** @member {Division[]} divisions - A list of divisions for the calendar */
	divisions: Division[];

	/** @member {Division[]} [secondaryDivisions] - A list of secondary divisions for the calendar, that is to say, divisions that are not aligned with the primary divisions (ie : weeks) */
	secondaryDivisions?: Division[]; // Pour les semaines
};

export default Calendar;