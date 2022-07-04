import TimelineType from '../constants/timelineType'
import Division from '../interfaces/division'

interface ReferenceLine {
	type: TimelineType;
	startingPoint: number[];
	divisions: Division[]; //En fait, on devrait avoir le nom de la division (année, jour, mois), sa durée, et le nom de la subdivison (Janvier, Lundi, etc.)

	//secondaryDivisions: Division[] (?) // Pour les semaines
};

export default ReferenceLine;