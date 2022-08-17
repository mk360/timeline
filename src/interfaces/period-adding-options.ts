import TimelineDate from '../types/timeline-date';

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
