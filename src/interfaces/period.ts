import Chronon from 'chronon'

interface PeriodStruct extends Chronon {
	start: number; //| Chronon;
	end?: number; //| Chronon;

	sub_chronons: Chronon[];

	/*
	offset_start_min: number | number[];
	offset_start_max: number | number[];
	offset_end_min: number | number[];
	offset_end_max: number | number[];
	*/

}

export default PeriodStruct;