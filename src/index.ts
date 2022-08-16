import ComponentFactory from './classes/component-factory';
import Timeline from './classes/timelineHandler';
import Calendar from './classes/calendarHandler';
import BaseTimelineRenderer from './classes/baseRenderer';
 
// Exemple d'utilisation (sans offsets)



let ww2tl = new Timeline();
ww2tl.addDivision("année", 12);
console.log(ww2tl.calendar.divisions);

let getFebruaryLength = (cal: Calendar, year: number): number => {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
		return 29;
	else
		return 28;
};

ww2tl.addDivision("mois", [31, getFebruaryLength, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]);
console.log(ww2tl.calendar.divisions);
ww2tl.addDivision("jour");
console.log(ww2tl.calendar.divisions);

ww2tl.setStartingPoint([1939, 9, 1]);
console.log(ww2tl.startingPoint);

let germanyTpl = ww2tl.addTemporalLine("Allemagne");
console.log(ww2tl.temporalLines);
let evntHitlerChancelier = germanyTpl.addEvent("Adolf Hitler est nommé chancelier du Reich", [1933, 1, 30]);
let evntArrestationDonitz = germanyTpl.addEvent("Arrestation de Karl Dönitz", [1945, 5, 23]);
let thirdReichPeriod = germanyTpl.addPeriod({
	name: "Troisième Reich", 
	start: {
		date: evntHitlerChancelier
	},
	end: {
		date: evntArrestationDonitz
	}
});

let evntIncendieReichstag = germanyTpl.addEvent("Incendie du Reichstag", [1933, 2, 27]);

// let perGleichschaltung = thirdReichPeriod.addPeriod("Gleichschaltung", [1933, 2, 28], [1934, 8, 19]);
// perGleichschaltung.addEvent("Adolf Hitler obtient les pleins pouvoirs", [1933, 3, 23]);

// germanyTpl.addPeriod({"Allemange occupée", thirdReichPeriod.end);

let tplEasternFront = ww2tl.addTemporalLine("Front de l'Est");
let evntInvasionPologne = tplEasternFront.addEvent("Invasion de la Pologne", [1939, 9, 1]);
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
let evntCapitulationJapon = tplJapan.addEvent("Capitulation du Japon", [1945, 7, 2]);

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
tplGlobalEvents.addEvent("Ouverture de la Conférence de Potsdam", [1945, 7, 17]);

new BaseTimelineRenderer().render(ww2tl);