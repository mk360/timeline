import Chronon from '../interfaces/chronon';
import Event from '../interfaces/event';

function chrononIsEvent(chronon: Chronon): chronon is Event {
	return 'occuring_time' in chronon;
}

export default chrononIsEvent;
