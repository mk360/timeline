
/**
 * @module {OddityStruct} Oddity
 */

/**
 * A storage for oddities of the calendar
 * @interface OddityStruct
 */
interface OddityStruct {
	/** @param {number} [div] - The division on which the oddity is */
	div: number;
	/** @param {number} [unit] - The unit modified by the oddity */
	unit: number;
	/** @param {number} [value] - The odd value of the unit */
	value: number;
	/** @param {checker_div} [value] - The div which serves to check the oddity */
	checker_div: number;
	/** @param {((...cond_unit: number[]) => boolean)} [condition] - The condition upon which the unit is modified */
	condition: ((...cond_unit: number[]) => boolean);
	/** @param {((...boundaries: number[]) => number)} [occurences] - The number of times this oddity appeared during an interval */
	occurences: ((...boundaries: number[]) => number);

};

export default OddityStruct;