import ChrononStruct from './chronon';

type TimelineDate = number | ChrononStruct | number[];

interface PeriodAddingOptions {
    name: string;
    description?: string;
    start: {
        date: TimelineDate;
        useEndOfPeriod?: boolean;
    };
    end: {
        date: TimelineDate;
        useEndOfPeriod?: boolean;
    };
}

export default PeriodAddingOptions;
