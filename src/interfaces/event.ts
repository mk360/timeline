/**
 * @module {EventStruct} Event
 */

import Chronon from './chronon';

/**
 * An interface defining the basic elements of events
 * @interface EventStruct
 * @extends Chronon
 */
interface EventStruct extends Chronon {
	/** @member {number} occuring_time - The start of the period (in BDU elapsed since the T0) */
	occuring_time: number;
	//offset_min: number | number[]
	//offset_max: number | number[]
};

export default EventStruct;