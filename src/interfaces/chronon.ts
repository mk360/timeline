/**
 * @module {ChrononStruct} Chronon
 */

/**
 * An interface storing the basic elements of chronons
 * @interface ChrononStruct
 */
interface ChrononStruct {
	/** @member {string} name - The name of the chronon */
	name: string;
	/** @member {string} [desc] - The description of the chronon */
	desc?: string;
}

export default ChrononStruct;