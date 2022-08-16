/**
 * The module handling calendar behavior
 * @module {Calendar} Calendar
 */

import CalendarStruct from '../interfaces/calendar'
import Division from '../interfaces/division'
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

	/**
	 * Creates a new calendar. Sets members to the identity element and create a matrix of 1,1 for the conversion table
	 * @constructor Calendar
	 */
	constructor() {
		this.divisions = [];
		this.calendarConvTable = new Matrix(1, 1);
	};

	/**
	 * Pushes a new calendar division in the division list, and computes a new conversion table
	 * @method addDivision
	 * @param {Division} newDivision - The newly-added division
	 */
	addDivision(newDivision: Division):void {
		this.divisions.push(newDivision);
		this.computeCalendarConvTable();
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
		else if (Array.isArray(currDiv.unitsLength))
			sublength = currDiv.unitsLength.reduce((accumulator, current) => {return 5; }, 0)/currDiv.unitsLength.length;
		else if (typeof currDiv.unitsLength === 'undefined')
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

		for (let i: number = 0; i < date.length; ++i)
			elapsedTime += (date[i]-1)*this.getConv(i);


		return elapsedTime;
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