import OddityInterface from '../interfaces/oddity';

class Oddity implements OddityInterface {
	div: number;
	unit: number;
	value: number;
	checker_div: number;
	condition: ((...cond_unit: number[]) => boolean);
	occurences: ((...boundaries: number[]) => number);

	/**
	 * Constructs a new oddity with all members passed
	 * @constructor Oddity
	 * @param {number} div - The division on which the oddity is
	 * @param {number} unit - The unit modified by the oddity
	 * @param {number} value - The odd value of the unit
	 * @param {checker_div} value - The div which serves to check the oddity
	 * @param {((...cond_unit: number[]) => boolean)} condition - The condition upon which the unit is modified
	 * @param {((...boundaries: number[]) => number)} occurences - The number of times this oddity appeared during an interval
	 */
	constructor(div: number, unit: number, value: number, checker_div: number, condition: ((...cond_unit: number[]) => boolean), occurences: ((...boundaries: number[]) => number)) {
		this.div = div;
		this.unit = unit;
		this.value = value;
		this.checker_div = checker_div;
		this.condition = condition;
		this.occurences = occurences;
	};

	/**
	 * Calls the condition method, checking if value match the oddity conditions
	 * @method isOdd
	 * @param {number[]} cond - A variadic parameter containing the values needed to check
	 * @returns {boolean} - Whether the value triggers the oddity conditions or not
	 */
	isOdd(...cond: number[]): boolean {
		return this.condition(...cond);
	};

	/**
	 * Calls the occurences method, counting how many times the oddity is triggered between two values
	 * @method isOdd
	 * @param {number[]} boundaries - A variadic parameter containing the values needed to check
	 * @returns {boolean} - The number of time the oddity was triggered 
	 */
	getNbOccurences(...boundaries: number[]): number {
		return this.occurences(...boundaries);
	};

}

export default Oddity;