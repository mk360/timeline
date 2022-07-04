import Chronon from 'chronon.ts'

interface EventStruct extends Chronon {
	occuring_time: number | number[]; //| Chronon;
	//offset_min: number | number[]
	//offset_max: number | number[]
}

export default EventStruct;