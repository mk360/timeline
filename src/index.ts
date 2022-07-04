import ComponentFactory from './classes/componentFactory';
import Timeline from './classes/timelineHandler';

const circle = ComponentFactory.createCircle(50, 50, 50, 'red');
const box = ComponentFactory.createBox(0, 0, 140, 140, 'blue');
const text = ComponentFactory.createText(0, 70, 'jellow world', 50, 'purple');
const line = ComponentFactory.createLine(40, 40, 300, 180, 'pink', 20);

 
// Exemple d'utilisation (sans offsets)
/*
let ww2tl = Timeline;
ww2tl.addDivision("année", 12);
ww2tl.addDivision("mois", [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
ww2tl.addDivision("jour");

ww2tl.setStartingPoint([1939, 9, 1]);

let germanyTpl = ww2tl.addTemporalLine("Allemagne");
let evntHitlerChancelier = germanyTpl.addEvent("Adolf Hitler est nommé chancelier du Reich", [1933, 1, 30]);
let evntArrestationDonitz = germanyTpl.addEvent("Arrestation de Karl Dönitz", [1945, 5, 23]);
let thirdReichPeriod = germanyTpl.addPeriod("Troisième Reich", evntHitlerChancelier, evntArrestationDonitz);

let evntIncendieReichstag = germanyTpl.addEvent("Incendie du Reichstag", [1933, 2, 27]);

let perGleichschaltung = thirdReichPeriod.addPeriod("Gleichschaltung", [1933, 2, 28], [1934, 8, 19]);
perGleichschaltung.addEvent("Adolf Hitler obtient les pleins pouvoirs", [1933, 3, 23]);

germanyTpl.addPeriod("Allemange occupée", thirdReichPeriod.end);

let tplGlobalEvents = ww2tl.addTemporalLine("Évènements généraux");
tplGlobalEvents.addPeriod("Seconde Guerre Mondiale", evntInvasionPologne, evntCapitulationJapon);
tplGlobalEvents.addEvent("Ouverture de la Conférence de Potsdam", [1945, 7, 17]);

let tplEasternFront = ww2tl.addTemporalLine("Front de l'Est");
evntInvasionPologne = tplEasternFront.addEvent("Invasion de la Pologne", [1939, 9, 1]);
tplEasternFront.addPeriod("Campagne de Pologne", evntInvasionPologne, [1939, 10, 6]); //temps absolu et temps relatif
*/