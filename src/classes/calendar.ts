import CalendarStruct from '../interfaces/referenceLine'
import Division from '../interfaces/division'

/* ===CALENDAR NOTES

	subdivision length of a division can be
	- a fixed number t (division is divided in regular sub-units, like a day divided in 24 hours)
	- an array of numbers [] (division length in its subdivisions is variable, like a month divided on whatever days you want)
	- undefined ! (division length not specified)
*/

class Calendar implements CalendarStruct {
	startingPoint: number[] = [];
	divisions: Division[] = []; //En fait, on devrait avoir le nom de la division (année, jour, mois), sa durée, et le nom de la subdivison (Janvier, Lundi, etc.)

	//secondaryDivisions: Division[] (?) // Pour les semaines

	calendarConvTable: number[][] = [[]]; // Le must serait d'avoir ts-matrix pour faire une matrice de number 

/*	constructor() {
		this.startingPoint = [];
		this.divisions = [];
	}*/

//--- <Giant mess>
	computeCalendarConvTable() {
		if (this.divisions.length<2)
			0;

		for (let division1 in this.divisions) {
			for (let division2 in this.divisions) {
				console.log("("+division1+", "+division2+")");
				console.log("typeof is "+typeof this.calendarConvTable[Number(division1)][Number(division2)]);
				this.calendarConvTable[Number(division1)][Number(division2)] = this.computeCalendarLengthOfDeepness(Number(division1), Number(division2));
				console.log("("+division1+", "+division2+") : "+this.getConv(Number(division1), Number(division2)));
			}

		}

	}

	private computeCalendarLengthOfDeepness(deepness: number, maxDeepness: number = -1): number | null {
		if (maxDeepness == -1)
			maxDeepness = this.divisions.length;

		if (deepness >= maxDeepness)
			return null;

		let sublength: number;
		let currDiv: Division = this.divisions[deepness];
		let typeLookahead: string = typeof this.divisions[deepness+1].subdivisionsLength;

		if (typeof currDiv.subdivisionsLength === 'number')
			sublength = currDiv.subdivisionsLength;
		else if (Array.isArray(currDiv.subdivisionsLength))
			sublength = currDiv.subdivisionsLength.reduce((accumulator, current) => {return (accumulator + current)/2;}, 0)*currDiv.subdivisionsLength.length;
		else if (typeof currDiv.subdivisionsLength === 'undefined')
			sublength = 1;

		if (typeLookahead === 'number')
			return sublength*(this.computeCalendarLengthOfDeepness(deepness+1) ?? 1);
		else if (typeLookahead === 'number[]')
			return sublength+(this.computeCalendarLengthOfDeepness(deepness+1) ?? 0);
		else
			return sublength;
	}
//--- </Giant mess>

	getElapsedTime(date: number[], fromBasePoint: boolean = false): number {
		let elapsedTime: number;

		for (let index in date)
			elapsedTime += date[index]*this.calendarConvTable[index][this.divisions.length-1];

		return elapsedTime;
	}

	getConv(supUnit: number, subUnit: number)
	{
		if (subUnit == -1)
			subUnit = this.divisions.length-1;

		return this.calendarConvTable[supUnit][subUnit];
	}

}

export default Calendar;