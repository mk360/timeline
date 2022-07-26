/**
 * @module {TimelineStruct} Timeline
 */

import CalendarStruct from './calendar'
import TemporalLineStruct from './temporalLine'

/**
 * An interface storing the basic structure of a timeline
 * @interface TimelineStruct
 */
interface TimelineStruct {
	/** @member {CalendarStruct} calendar - A calendar structure to keep track of chronons' position in time */
	calendar: CalendarStruct;
	/** @member {TemporalLineStruct[]} - A list of temporal line structures */
	temporalLines: TemporalLineStruct[];
	startingPoint: number;
}

export default TimelineStruct;