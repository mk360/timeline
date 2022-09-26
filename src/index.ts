import Timeline from './classes/timeline-handler';
import Calendar from './classes/calendar-handler';
import BaseTimelineRenderer from './classes/base-renderer';
 
// Exemple d'utilisation (sans offsets)

let ww2tl = new Timeline();
ww2tl.addDivision("année", 12);
ww2tl.addDivision("mois", [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]);
ww2tl.addDivision("jour");
console.log(ww2tl.calendar.divisions);

ww2tl.addOddity(1, 1, 1, (year) => {return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0}, (...years) => {return Math.trunc((years[1]-years[0])/4) - Math.trunc((years[1]-years[0])/100) + Math.trunc((years[1]-years[0])/400)});
console.log("Test oddities");
console.log(ww2tl.calendar.oddities[0].isOdd(1936));

ww2tl.setStartingPoint([1929, 8, 1]);
ww2tl.setEndingPoint([1947, 8, 1]);
console.log(ww2tl.startingPoint);

let getFebruaryLength = (cal: Calendar, year: number): number => {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
		return 29;
	else
		return 28;
};

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

let evntIncendieReichstag = germanyTpl.addEvent({
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
	date: [1933, 3, 23]
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