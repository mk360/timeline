/**
 * @module {TemporalLine} TemporalLine
 */
import Chronon from './chronon';

/**
 * An interface storing the basic elements all temporal lines should have
 * @interface TemporalLine
 */
interface TemporalLine {
	/** @member {string} name - The name of the temporal line */
	name: string;

	/** @member {Chronon[]} chronons - A list of chronons, events or periods */ 
	chronons: Chronon[];
}

export default TemporalLine;