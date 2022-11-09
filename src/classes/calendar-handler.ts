/**
 * The module handling calendar behavior
 * @module {Calendar} Calendar
 */

import CalendarStruct from '../interfaces/calendar'
import Division from '../classes/division'
import SecondaryDivision from '../classes/secondaryDivision'
import Oddity from '../classes/oddity-handler'
import { Matrix } from 'ts-matrix';

/* ===CALENDAR NOTES

	subdivision length of a division can be
	- a fixed number t (division is divided in regular sub-units, like a day divided in 24 hours)
	- an array of numbers [] (division length in its subdivisions is variable, like a month divided on whatever days you want)
	- undefined ! (division length not specified)
*/

/**
 * A class implementing calendar behavior
 * @implements {CalendarStruct}
 */
class Calendar implements CalendarStruct {
	divisions: Division[];
	secondaryDivisions?: Division[];
	/** @member {Matrix} calendarConvTable - A matrix filled with the conversion rates between calendar's divisions */
	calendarConvTable: Matrix;
	oddities: Oddity[];
	id: String;

	/**
	 * Creates a new calendar. Sets members to the identity element and create a matrix of 1,1 for the conversion table
	 * @constructor Calendar
	 */
	constructor() {
		this.divisions = [];
		this.secondaryDivisions = [];
		this.oddities = [];
		this.calendarConvTable = new Matrix(1, 1);
	};

	/**
	 * Creates a Division instance with params and calls calendar.addDivision with the created instance
	 * @method addDivision
	 * @param {string} name - The name of the division
	 * @param {(number|number[])} [unitsLength] - The number of units in which this division is subdivided (for exemple, 12 for a year divided in months). A number[] indicates that the division is irregularily subdivided (like months whose number of days depends of said month)
	 * @param {string[]} [unitsNames] - The names for the division's units (for exemple, the months' names for a month division)
	 */
	addDivision(name: string, unitsLength?: number | (number | ((c: Calendar, x: number) => number))[], unitsNames?: string[]): void {
		this.divisions.push(new Division(name, unitsLength, unitsNames));
		this.computeCalendarConvTable();
	};

	addSecondaryDivision(name: string, level: number, unitsLength: number, unitsNames?: string[]) {
		this.secondaryDivisions.push(new SecondaryDivision(name, level, unitsLength, unitsNames));
	};

	/**
	 * Computes the conversion rates for calendarConvTable
	 * @method computeCalendarConvTable
	 */
	computeCalendarConvTable(): void {
		if (this.divisions.length<2) {
			this.calendarConvTable.values[0][0] = 1;

			return;
		}

		this.calendarConvTable = new Matrix(this.divisions.length, this.divisions.length);

		for (let i = 0; i < this.divisions.length; ++i)
			for (let j = 0; j < this.divisions.length; ++j)
				this.calendarConvTable.values[i][j] = this.computeCalendarLengthOfDeepness(i, j);

		this.printConvTable();
	};

	private getDivisionLength(unit: number | ((calendar: Calendar, length: number) => number)) {
		if (typeof unit === 'number') {
			return unit;
		}

		return unit(this, 2000);
	}

	/**
	 * Computes the conversion rate between 2 divisions of the calendar
	 * @private
	 * @method computeCalendarLengthOfDeepness
	 * @param {number} deepness - The 1st from which we convert
	 * @param {number} [maxDeepness=-1] - The 2nd division to which we convert. If value is omitted, -1 is fed to the method and treated as a special case: maxDeepness is set to divisions.length-1
	 * @returns {(number|null)} - Returns the conversion rate between deepness and maxDeepness, or null if deepness > maxDeepness
	 */
	private computeCalendarLengthOfDeepness(deepness: number, maxDeepness: number = -1): number | null {
		if (maxDeepness == -1)
			maxDeepness = this.divisions.length-1;

		if (deepness == maxDeepness)
			return 1;
		if (deepness > maxDeepness)
			return null;

		let sublength: number;
		let currDiv: Division = this.divisions[deepness];

		if (typeof currDiv.unitsLength === 'number')
			sublength = currDiv.unitsLength;
		else if (Array.isArray(currDiv.unitsLength)) {
			const depthLength = currDiv.unitsLength.reduce<number>((accumulator, current) => {
				return this.getDivisionLength(accumulator) + this.getDivisionLength(current);
			}, 0);
			sublength = depthLength / currDiv.unitsLength.length;
		} else if (typeof currDiv.unitsLength === 'undefined')
			sublength = 1;

		if (this.divisions[deepness+1].unitsLength !== undefined) {

			if (typeof this.divisions[deepness+1].unitsLength === 'number')
				return sublength*(this.computeCalendarLengthOfDeepness(deepness+1, maxDeepness) ?? 1);
			else if (Array.isArray(this.divisions[deepness+1].unitsLength))
				return sublength*(this.computeCalendarLengthOfDeepness(deepness+1, maxDeepness) ?? 1);
		}
		else
			return sublength;

	};

	/**
	 * Gets the conversion rate from the calendarConvTable
	 * @param {number} supUnit - The 1st from which we convert
	 * @param {number} [subUnit=-1] - The 2nd division to which we convert. If value is omitted, -1 is fed to the method and treated as a special case: subUnit is set to divisions.length-1
	 * @returns {number} - The conversion rate between supUnit and subUnit
	 */
	getConv(supUnit: number, subUnit: number = -1): number {
		if (subUnit == -1)
			subUnit = this.divisions.length-1;

		return this.calendarConvTable.at(supUnit, subUnit);
	};

	/**
	 * Compute the elapsed time in basic division time between the date and the zero point of the calendar
	 * @method getElapsedTime
	 * @param {number[]} date - The date for which we want the elapsed time
	 * @param {boolean} [fromStartingPoint=false] - !!!
	 * @returns {number} - The elapsed time in basic division time between the date and the zero point of the calendar
	 */
 	getElapsedTime(date: number[], fromStartingPoint: boolean = false): number {
		let elapsedTime: number = 0;

		//primary calculation
		for (let i: number = 0; i < date.length; ++i) {
			const divUnits = this.divisions[i].unitsLength;

			if (Array.isArray(divUnits)) {
				let t = divUnits.slice(0, date[i]-1).reduce<number>((acc, length) => {return acc + this.getDivisionLength(length)}, 0);
				elapsedTime += t;
			}
			else {
				if (i == date.length-1)
					elapsedTime += date[i]-1;
				else
					elapsedTime += (date[i]-1)*this.getConv(i);
			}

		}

		//secondary calculation
		for (let i: number = 0; i < this.oddities.length; ++i) {
			elapsedTime += this.oddities[i].getNbOccurences(1, date[this.oddities[i].checker_div]);

			if (this.oddities[i].isOdd(date[this.oddities[i].checker_div]) && (date[this.oddities[i].div] > this.oddities[i].unit+1))
				elapsedTime += this.oddities[i].value;
		}

		return elapsedTime;
	};

	/**
	 * Adds an irregularity to the standard structure of the calendar
	 * @method addOddity
	 * @param {number} [div] - The division on which the oddity is
	 * @param {number} [unit] - The unit modified by the oddity
	 * @param {number} [value] - The odd value of the unit
	 * @param {checker_div} [value] - The div which serves to check the oddity
	 * @param {((...cond_unit: number[]) => boolean)} [condition] - A function to check wether a value triggers the oddity or not
	 * @param {((...boundaries: number[]) => number)} [occurences] - A function to compute the number of time a oddity appears during an interval
	 */
	addOddity(div: number, unit: number, value: number, checker_div: number, condition: ((...cond_unit: number[]) => boolean), occurences: ((...boundaries: number[]) => number)): void {
		this.oddities.push(new Oddity(div, unit, value, checker_div, condition, occurences));
	};

	/**
	 * Verifies that the date inputed is correct in the current calendar
	 * @method isDateValid
	 * @param {number[]} date - The date to check
	 * @returns {boolean} - true if the date is correct, false otherwise
	 */
	isDateValid(date: number[]): boolean {
		if (date.length !== this.divisions.length) {
			console.log(date + " is not valid 1");
			return false;
		}
		else {
			for (let i = 1; i < this.divisions.length; ++i) {					//- i start at 1 because we can't check for top-level division
				if (typeof this.divisions[i-1].unitsLength !== 'undefined') {
					const currentUnitLength = this.divisions[i-1].unitsLength;
					if (Array.isArray(currentUnitLength))
					{
						if (date[i] < 0 || date[i] > currentUnitLength[date[i-1]]) {
							console.log(date + " is not valid but fuck it is");
							return false; // tmp
						}
					}
					else {
						if (date[i] < 0 || date[i] > this.divisions[i-1].unitsLength) {
							console.log(date + " is not valid 3");
							return false;
						}
					}

				}

			}

		}

		return true;
	};

	/**
	 * Prints the conversion table as a matrix
	 * @method printConvTable
	 */
	printConvTable(): void {
		let str: string;
		for (let i = 0; i < this.divisions.length; ++i) {
			str='';
			for (let j = 0; j < this.divisions.length; ++j) {
				str = str + this.calendarConvTable.at(i, j) + ', ';
			}
			console.log(str);
		}

	};

}

export default Calendar;