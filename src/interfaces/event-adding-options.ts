import TimelineDate from "../types/timeline-date";

interface EventAddingOptions {
    name: string;
    date: TimelineDate;
    putAtEnd?: boolean;
    offset?: number | number[];
}

export default EventAddingOptions;
