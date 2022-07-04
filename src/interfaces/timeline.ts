import ReferenceLine from 'referenceLine.ts'
import TemporalLineStruct from 'temporalLine.ts'

interface TimelineStruct {
	baseline: ReferenceLine;
	temporalLines: TemporalLineStruct[];
}

export default TimelineStruct;