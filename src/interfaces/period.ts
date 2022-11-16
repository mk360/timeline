/**
 * @module {Period} Period
 */

import Chronon from './chronon'

/**
 * An interface defining the basic elements of periods
 * @interface Period
 * @extends Chronon
 */
interface Period extends Chronon {
	/** @member {number} start - The start of the period (in basic division units elapsed since the timeline's starting point) */
	start: number;

	/** @member {number} [end] - The end of the period (in basic division units elapsed since the timeline's starting point). If not given, means that the period is still open in the timeline's scope */
	end?: number;

	/** @member {Chronon[]} sub_chronons - A list of chronons, events or periods */ 
	sub_chronons: Chronon[];

	/*
	offset_start_min: number | number[];
	offset_start_max: number | number[];
	offset_end_min: number | number[];
	offset_end_max: number | number[];
	*/

}

export default Period;