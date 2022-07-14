import ComponentFactory from './classes/component-factory';
import Timeline from './classes/timelineHandler';
import BaseTimelineRenderer from './classes/baseRenderer';

const circle = ComponentFactory.createCircle(50, 50, 50, 'red');
const box = ComponentFactory.createBox(0, 0, 140, 140, 'blue');
const text = ComponentFactory.createText(0, 70, 'jellow world', 50, 'purple');
const line = ComponentFactory.createLine(40, 40, 300, 180, 'pink', 20);
 
// Exemple d'utilisation (sans offsets)

let ww2tl = new Timeline();
ww2tl.addDivision("année", 12);
console.log(ww2tl.calendar.divisions);
ww2tl.addDivision("mois", [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]);
console.log(ww2tl.calendar.divisions);
ww2tl.addDivision("jour");
console.log(ww2tl.calendar.divisions);

ww2tl.setStartingPoint([1939, 9, 1]);
console.log(ww2tl.calendar.startingPoint);

let germanyTpl = ww2tl.addTemporalLine("Allemagne");
console.log(ww2tl.temporalLines);
let evntHitlerChancelier = germanyTpl.addEvent("Adolf Hitler est nommé chancelier du Reich", [1933, 1, 30]);
let evntArrestationDonitz = germanyTpl.addEvent("Arrestation de Karl Dönitz", [1945, 5, 23]);
let thirdReichPeriod = germanyTpl.addPeriod("Troisième Reich", evntHitlerChancelier);

let evntIncendieReichstag = germanyTpl.addEvent("Incendie du Reichstag", [1933, 2, 27]);

let perGleichschaltung = thirdReichPeriod.addPeriod("Gleichschaltung", [1933, 2, 28], [1934, 8, 19]);
perGleichschaltung.addEvent("Adolf Hitler obtient les pleins pouvoirs", [1933, 3, 23]);
/*
germanyTpl.addPeriod("Allemange occupée", thirdReichPeriod.end);

let tplGlobalEvents = ww2tl.addTemporalLine("Évènements généraux");
tplGlobalEvents.addPeriod("Seconde Guerre Mondiale", evntInvasionPologne, evntCapitulationJapon);
tplGlobalEvents.addEvent("Ouverture de la Conférence de Potsdam", [1945, 7, 17]);

let tplEasternFront = ww2tl.addTemporalLine("Front de l'Est");
evntInvasionPologne = tplEasternFront.addEvent("Invasion de la Pologne", [1939, 9, 1]);
tplEasternFront.addPeriod("Campagne de Pologne", evntInvasionPologne, [1939, 10, 6]); //temps absolu et temps relatif
*/

new BaseTimelineRenderer().render(ww2tl);