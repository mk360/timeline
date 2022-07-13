import TimelineType from '../constants/timelineType'
import Division from '../interfaces/division'

interface CalendarStruct {
	startingPoint: number;
	divisions: Division[];
	//secondaryDivisions: Division[] (?) // Pour les semaines
};

export default CalendarStruct;