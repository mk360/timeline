/**
 * @module {TemporalLineStruct} TemporalLine
 */
import ChrononStruct from './chronon';

/**
 * An interface storing the basic elements all temporal lines should have
 * @interface TemporalLineStruct
 */
interface TemporalLineStruct {
	/** @member {string} name - The name of the temporal line */
	name: string;
	/** @member {ChrononStruct[]} chronons - A list of chronons, events or periods */ 
	chronons: ChrononStruct[];
}

export default TemporalLineStruct;