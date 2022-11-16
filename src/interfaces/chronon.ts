/**
 * @module {Chronon} Chronon
 */

/**
 * An interface storing the basic elements of chronons
 * @interface Chronon
 */
interface Chronon {
	/** @member {string} name - The name of the chronon */
	name: string;

	/** @member {string} [desc] - The description of the chronon */
	desc?: string;
}

export default Chronon;