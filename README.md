## Timeline Library

This is a timeline that can display chronogically-connected events, across all sorts of scales  (ex. the effects of the 2008 crisis on each continent of the world, the timeline of your favorite Formula 1 season, or even the timeline of two rival sports teams).

## Features
- A simple API: setting the timeline up requires a few lines, and every needed element has a default component that is already provided.

- Premade components: this Timeline plugin features a default SVG renderer and three calendars (your everyday calendar, an Islamic and Jewish calendar) to get you started.

- Highly customizable calendars: create your own calendar, provide your own days, numbers of weeks, months, odd days, conditions for odd days (such as February 29th), or any time unit you desire!

- Multiple concurrent timelines: where a regular library can only track a single timeline, this library allows you to track many ones at the same time! See how events, even the ones that are not related, unfolded across multiple areas at the same time.

- Get a precise idea of eras, epochs and time periods in which your events happen, with realistic measures of time between events.

- Highly customizable output: the dimensions of the SVG, the size of the content, the viewbox, the calendar, the events, the number of trackable periods.

- High portability: this library renders into an HTML document by default. You can create your own custom renderer to display the timeline in any display format you want.

## Getting Started
### Creating a Calendar
If you wish to create your custom Calendar, you'll need:
- An instance of the `Calendar` class (let's call it `c1`)
- Add divisions to `c1` (divisions are representations of, for example, months, years, and days).
```js
c1.addDivision("year", 12); // a year is made of 12 instances of the next division, months
c1.addDivision("month", [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ["January","February","March","April","May","June","July","August","September","October","November","December"]);
// each month is defined by how many days there are in it
c1.addDivision("day");
```
- If you wish to have specific notions that are non-essential groups of a certain division (ex. a semester which is equal to 6 months), you'll have to add what's called a _secondary division_:
```js
c1.addSecondaryDivision("week", 2, 7, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
c1.addSecondaryDivision("trimester", 1, 3);
c1.addSecondaryDivision("semester", 1, 6);
```
First argument is the name of your secondary division, second argument is the index of the division (or subdivision) you want a group of, third argument is how many of the items inside the subdivision index make up that secondary division (ex. in the weeks example, we have 7 days, which are the third element in the year/month/day calendar system).

### Configuring your Timeline to use our Calendar
- Create a Timeline instance:
```js
const inst = new Timeline();
```
- Set it to the Calendar you just created:
```js
inst.setCalendar(c1);
```
- Set the starting and end points of the timeline (starting and ending points of the events). The renderer will use this information to properly display the timeline.

```js
inst.setStartingPoint([year, month, day]);
inst.setEndingPoint([end_year, end_month, end_day]);
```

Now you can start creating events, temporal lines, periods, and get a "real" timeline.
- An event is a one-off occurrence (ex. a meeting, a sporting event).
- A Period extends to a certain period of time, and contains many events.
- A Temporal Line is a separate container for Periods and Events. They tell the Timeline's story from another perspective.

### API
#### Timeline
`Timeline.addTemporalLine(name: string)`
Add a Temporal Line. Returns the temporal line.

`Timeline.setStartingPoint(date: number | number[])`
Set the Timeline's starting point. Use a number if you want a much more precise value than a date array.

`Timeline.setEndingPoint(date: number | number[])`
Set the Timeline's ending point. Use a number if you want a much more precise value than a date array.

#### Temporal Line
`TemporalLine.addEvent(options: EventAddingOptions)`
Add an event. Options are detailed below.

`TemporalLine.addPeriod(options: PeriodAddingOptions)`
Add a Period that can contain many events. Options are detailed below.