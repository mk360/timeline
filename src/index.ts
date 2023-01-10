import Timeline from './classes/timeline';
import BaseTimelineRenderer from './classes/base-renderer';
import gregorianCalendar from './classes/calendars/gregorian-calendar'
import islamicCalendar from './classes/calendars/islamic-calendar'
import SvgConfig from './constants/svg-config';
import hebrewCalendar from './classes/calendars/hebrew-calendar'

// Exemple d'utilisation (sans offsets)

let ww2tl = new Timeline();
ww2tl.setCalendar(gregorianCalendar);

ww2tl.setStartingPoint([1932, 9, 1]);
ww2tl.setEndingPoint([1947, 8, 1]);
console.log(ww2tl.startingPoint);

let testFev = ww2tl.addTemporalLine("Dummy");
testFev.addEvent({
	name: "28/02/1934", 
	date: [1934, 2, 28]
});
testFev.addEvent({
	name: "01/03/1934", 
	date: [1934, 3, 1]
});
testFev.addEvent({
	name: "28/02/1935", 
	date: [1935, 2, 28]
});
testFev.addEvent({
	name: "01/03/1935", 
	date: [1935, 3, 1]
});
testFev.addEvent({
	name: "28/02/1936", 
	date: [1936, 2, 28]
});
testFev.addEvent({
	name: "29/02/1936", 
	date: [1936, 2, 29]
});
testFev.addEvent({
	name: "01/03/1936", 
	date: [1936, 3, 1]
});
testFev.addEvent({
	name: "28/02/1937", 
	date: [1937, 2, 28]
});
testFev.addEvent({
	name: "01/03/1937", 
	date: [1937, 3, 1]
});

// offsets
// calculs de date ?

let germanyTpl = ww2tl.addTemporalLine("Allemagne");

let evntHitlerChancelier = germanyTpl.addEvent({
	name: "Adolf Hitler est nommé chancelier du Reich", 
	date: [1933, 1, 30]
});
let evntArrestationDonitz = germanyTpl.addEvent({
	name: "Arrestation de Karl Dönitz", 
	date: [1945, 5, 23]
});
let thirdReichPeriod = germanyTpl.addPeriod({
	name: "Troisième Reich", 
	start: {
		date: evntHitlerChancelier
	},
	end: {
		date: evntArrestationDonitz
	}
});

germanyTpl.addEvent({
	name: "Incendie du Reichstag",
	date: [1933, 2, 27]
});

let perGleichschaltung = thirdReichPeriod.addPeriod({
	name: "Gleichschaltung", 
	start: {
		date: [1933, 2, 28],
	},
	end: {
		date: [1934, 8, 19]
	}
});

perGleichschaltung.addEvent({
	name: "Adolf Hitler obtient les pleins pouvoirs", 
	date: [1935, 3, 23]
});

// germanyTpl.addPeriod({"Allemange occupée", thirdReichPeriod.end);

let tplEasternFront = ww2tl.addTemporalLine("Front de l'Est");
let evntInvasionPologne = tplEasternFront.addEvent({
	name: "Invasion de la Pologne", 
	date: [1939, 9, 1]
});
tplEasternFront.addPeriod({
	name: "Campagne de Pologne",
	start: {
		date: evntInvasionPologne, 
	},
	end: {
		date: [1939, 10, 6]
	}
}); //temps absolu et temps relatif

let tplJapan = ww2tl.addTemporalLine("Japon");
let evntCapitulationJapon = tplJapan.addEvent({
	name: "Capitulation du Japon",
	date: [1945, 7, 2]
});

let tplGlobalEvents = ww2tl.addTemporalLine("Évènements généraux");
tplGlobalEvents.addPeriod({
	name: "Seconde Guerre Mondiale",
	start: {
		date: evntInvasionPologne,
	},
	end: {
		date: evntCapitulationJapon
	}
});

tplGlobalEvents.addEvent({
	name: "Ouverture de la Conférence de Potsdam", 
	date: [1945, 7, 17]
});

new BaseTimelineRenderer(SvgConfig).render(ww2tl);

//Il faudrait un getter d'event/period

console.log(ww2tl.temporalLines);

console.log("Date extraction")
console.log("Ouverture de la Conférence de Potsdam [1945, 7, 17] : " + ww2tl.calendar.extractDate(4702 + 705526));
console.log("Capitulation du Japon [1945, 7, 2] : " + ww2tl.calendar.extractDate(4687 + 705526));
console.log("Fin de la campagne de Pologne [1939, 10, 6] : " + ww2tl.calendar.extractDate(2591 + 705526));
console.log("Invasion de la Pologne [1939, 9, 1] : " + ww2tl.calendar.extractDate(2556 + 705526));
console.log("Adolf Hitler obtient les pleins pouvoirs [1935, 3, 23] : " + ww2tl.calendar.extractDate(933 + 705526));
console.log("Incendie du Reichstag [1933, 2, 27] : " + ww2tl.calendar.extractDate(179 + 705526));
console.log("Arrestation de Karl Dönitz [1945, 5, 23] : " + ww2tl.calendar.extractDate(4647 + 705526));
console.log("Adolf Hitler est nommé chancelier du Reich [1933, 1, 30] : " + ww2tl.calendar.extractDate(151 + 705526));

console.log("-----------------------------------------------------------");

console.log('28/02/1934 : ' + ww2tl.calendar.extractDate(545 + 705526));
console.log('01/03/1934 : ' + ww2tl.calendar.extractDate(546 + 705526));
console.log('28/02/1935 : ' + ww2tl.calendar.extractDate(910 + 705526));
console.log('01/03/1935 : ' + ww2tl.calendar.extractDate(911 + 705526));
console.log('28/02/1936 : ' + ww2tl.calendar.extractDate(1275 + 705526));
console.log('29/02/1936 : ' + ww2tl.calendar.extractDate(1276 + 705526));
console.log('01/03/1936 : ' + ww2tl.calendar.extractDate(1277 + 705526));
console.log('28/02/1937 : ' + ww2tl.calendar.extractDate(1641 + 705526));
console.log('01/03/1937 : ' + ww2tl.calendar.extractDate(1642 + 705526));

console.log(gregorianCalendar.isDateValid([1940, 13, 28]));
console.log(gregorianCalendar.isDateValid([1940, 2, 28]));
console.log(gregorianCalendar.isDateValid([1940, 2, 29]));
console.log(gregorianCalendar.isDateValid([1940, 2, 30]));

console.log(gregorianCalendar.add([1943, 3, 1], 368));

/*
console.log("converted")
let newTL = ww2tl.convertsTo(islamicCalendar);
console.log("islamicCalendar");
console.log(newTL);
//new BaseTimelineRenderer().render(newTL);

let newTL2 = ww2tl.convertsTo(hebrewCalendar);
console.log("converted++");
//new BaseTimelineRenderer().render(newTL2);
*/
