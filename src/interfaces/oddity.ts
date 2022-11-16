
/**
 * @module {Oddity} Oddity
 */

/**
 * A storage for oddities of the calendar
 * @interface Oddity
 */
interface Oddity {
	/** @member {number} div - The division on which the oddity is */
	div: number;

	/** @member {number} unit - The unit modified by the oddity */
	unit: number;

	/** @member {number} value - The odd value of the unit */
	value: number;

	/** @member {checker_div} value - The div which serves to check the oddity */
	checker_div: number;

	/** @member {((...cond_unit: number[]) => boolean)} condition - The condition upon which the unit is modified */
	condition: ((...cond_unit: number[]) => boolean);

	/** @member {((...boundaries: number[]) => number)} occurences - The number of times this oddity appeared during an interval */
	occurences: ((...boundaries: number[]) => number);

};

export default Oddity;