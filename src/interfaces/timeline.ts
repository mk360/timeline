/**
 * @module {Timeline} Timeline
 */

import Calendar from './calendar'
import TemporalLine from './temporal-line'

/**
 * An interface storing the basic structure of a timeline
 * @interface Timeline
 */
interface Timeline {
	/** @member {Calendar} calendar - A calendar structure to keep track of chronons' position in time */
	calendar: Calendar;

	/** @member {TemporalLine[]} temporalLines - A list of temporal line structures */
	temporalLines: TemporalLine[];

	/** @member {number} startingPoint - The starting point of the timeline */
	startingPoint: number;
}

export default Timeline;