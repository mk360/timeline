/**
 * @module {Event} Event
 */

import Chronon from './chronon';

/**
 * An interface defining the basic elements of events
 * @interface Event
 * @extends Chronon
 */
interface Event extends Chronon {
	/** @member {number} occuring_time - The start of the period (in BDU elapsed since the T0) */
	occuring_time: number;

	//offset_min: number | number[]
	//offset_max: number | number[]
};

export default Event;