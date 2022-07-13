import CalendarStruct from '../interfaces/referenceLine'
import Division from '../interfaces/division'
import { Vector, Matrix } from 'ts-matrix';

/* ===CALENDAR NOTES

	subdivision length of a division can be
	- a fixed number t (division is divided in regular sub-units, like a day divided in 24 hours)
	- an array of numbers [] (division length in its subdivisions is variable, like a month divided on whatever days you want)
	- undefined ! (division length not specified)
*/

class Calendar implements CalendarStruct {
	startingPoint: number;
	divisions: Division[];

	//secondaryDivisions: Division[] (?) // Pour les semaines

	calendarConvTable: Matrix; 

	constructor() {
		this.startingPoint = 0;
		this.divisions = [];
		this.calendarConvTable = new Matrix(1, 1);
	};

	computeCalendarConvTable() {
		if (this.divisions.length<2) {
			this.calendarConvTable.values[0][0] = 1;

			return;
		}

		this.calendarConvTable = new Matrix(this.divisions.length, this.divisions.length);

		for (let i = 0; i < this.divisions.length; ++i) {
			for (let j = 0; j < this.divisions.length; ++j) {
				this.calendarConvTable.values[i][j] = this.computeCalendarLengthOfDeepness(i, j);
			}

		}

		this.printConvTable();
	};

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
			sublength = currDiv.unitsLength.reduce((accumulator, current) => {return (accumulator + current);}, 0)/currDiv.unitsLength.length;
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

	setStartingPoint(divValues: number[]): void;
	setStartingPoint(timeElapsed: number): void;	//time elapsed since 01/01/0001 ou whatever équivalent dans le calendrier
	setStartingPoint(time: any): void {
		if (Array.isArray(time))
			this.startingPoint = this.getElapsedTime(time);
		else if (typeof time === 'number')
		{
			let date: number[];
			let i: number = 0;

			do {
				let divisor = this.getConv(i, -1);

				date[i] = Math.floor(time/divisor);
				time = time%divisor;
				++i;

			} while (time !== 0);
		}
	};

	getElapsedTime(date: number[], fromBasePoint: boolean = false): number {
		let elapsedTime: number = 0;

		for (let i = 0; i < date.length; ++i)
			elapsedTime += (date[i]-1)*this.getConv(i);

		return elapsedTime;
	};

	getConv(supUnit: number, subUnit: number = -1)
	{
		if (subUnit == -1)
			subUnit = this.divisions.length-1;

		return this.calendarConvTable.at(supUnit, subUnit);
	};

	printConvTable() {
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