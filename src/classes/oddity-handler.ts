import OddityStruct from '../interfaces/oddity';

class Oddity implements OddityStruct {
	div: number;
	unit: number;
	value: number;
	condition: ((...cond_unit: number[]) => boolean);
	occurences: ((...boundaries: number[]) => number);

	constructor(div: number, unit: number, value: number, condition: ((...cond_unit: number[]) => boolean), occurences: ((...boundaries: number[]) => number)) {
		this.div = div;
		this.unit = unit;
		this.value = value;
		this.condition = condition;
		this.occurences = occurences;
	};

	isOdd(...cond: number[]): boolean {
		return this.condition(...cond);
	};

	getNbOccurences(...boundaries: number[]): number {
		return this.occurences(...boundaries);
	};

}

export default Oddity;