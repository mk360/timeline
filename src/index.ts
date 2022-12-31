import Timeline from './classes/timeline';
import BaseTimelineRenderer from './classes/base-renderer';
import gregorianCalendar from './classes/calendars/gregorian-calendar'
import islamicCalendar from './classes/calendars/islamic-calendar'
import hebrewCalendar from './classes/calendars/hebrew-calendar'

// Exemple d'utilisation (sans offsets)

let ww2tl = new Timeline();
ww2tl.setCalendar(gregorianCalendar);

console.log("Test oddities");
console.log(ww2tl.calendar.oddities[0].isOdd(1936));

ww2tl.setStartingPoint([1932, 9, 1]);
ww2tl.setEndingPoint([1947, 8, 1]);
console.log(ww2tl.startingPoint);

// offsets
// calculs de date ?
// virer refCalendar

let germanyTpl = ww2tl.addTemporalLine("Allemagne");
console.log(ww2tl.temporalLines);

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

new BaseTimelineRenderer().render(ww2tl);

console.log("converted")
let newTL = ww2tl.convertsTo(islamicCalendar);
console.log("islamicCalendar");
console.log(newTL);