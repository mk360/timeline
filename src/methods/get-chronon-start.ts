import ChrononStruct from "../interfaces/chronon";
import chrononIsEvent from "./chronon-is-event";
import PeriodStruct from '../interfaces/period';

function getChrononStart(chronon: ChrononStruct) {
    if (chrononIsEvent(chronon)) {
        return chronon.occuring_time;
    }

    return (chronon as PeriodStruct).start;
}

export default getChrononStart;
