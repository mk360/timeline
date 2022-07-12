import CalendarStruct from './referenceLine'
import TemporalLineStruct from './temporalLine'

interface TimelineStruct {
	calendar: CalendarStruct;
	temporalLines: TemporalLineStruct[];
}

export default TimelineStruct;