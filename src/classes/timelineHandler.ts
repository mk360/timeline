import TimelineType from '../constants/timelineType'
import TimelineStruct from '../interfaces/timeline'
import ReferenceLine from '../interfaces/referenceLine'
import TemporalLine from './temporalLineHandler'

class Timeline implements TimelineStruct {
	baseline: ReferenceLine;
	temporalLines: TemporalLine[];
/*
	createReferenceLine(defaultRL: boolean, startingPoint?: number | number[]): void {
		if (defaultRL)
		{
			this.baseline.type = TimelineType.years;		//Peut-être inutile au final

			this.addDivision("année", 12);
			this.addDivision("mois", [31, 28, getFebruaryNbDays(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]);
			this.addDivision("jour");

			//setStartingPoint(0); //0 jours (dernière division définie) écoulés depuis le 01/01/0001
			this.setStartingPoint([1970, 1, 1]) //Le 01/01/1970, début du temps UNIX
		}

	};
*/
	addDivision(name: string, subdivisionsLength?: number | number[], subdivisionsNames?: string[]): void {
		this.baseline.divisions.push({name, subdivisionsLength, subdivisionsNames});
	};

	setStartingPoint(divValues: number[]): void;
	setStartingPoint(timeElapsed: number): void;
	setStartingPoint(val: unknown): void {
		if (Array.isArray(val))
		{
			this.baseline.startingPoint = val;
		}
		else if (typeof val === 'number')
		{
			// calcule le point de départ
		}

	};

	addTemporalLine(name: string, pos?: number): TemporalLine {
		let newTmpL = new TemporalLine(name);

		if (typeof pos !== 'undefined')
		{
			if (this.temporalLines[pos] === undefined)
				this.temporalLines[pos] = newTmpL;
			else
				this.temporalLines.splice(pos, 0, newTmpL);
		}
		else
			this.temporalLines.push(newTmpL);

		return newTmpL;
	};

/*
	renderTimeline(): void {
		this.renderReferenceLine();

		for (var tl of this.temporalLines)
			this.renderTemporalLine();
	}

	renderReferenceLine(): void {};
	renderTemporalLine(): void {};
*/}

export default new Timeline();