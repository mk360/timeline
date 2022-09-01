import ChrononStruct from "../interfaces/chronon";
import getChrononStart from "./get-chronon-start";

/**
    * Method used inside Array.sort to sort chronons from oldest to newest
    * @param chronon1 First Chronon
    * @param chronon2 Second Chronon
    * @see MDN https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
function sortByEarliest(chronon1: ChrononStruct, chronon2: ChrononStruct) {
    const firstChrononStart = getChrononStart(chronon1);
    const secondChrononStart = getChrononStart(chronon2);

    return firstChrononStart - secondChrononStart;
}

export default sortByEarliest;
