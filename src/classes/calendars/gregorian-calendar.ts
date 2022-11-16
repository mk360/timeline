import Calendar from '../calendar'
let gregorianCalendar: Calendar = new Calendar();

gregorianCalendar.id = "scl"

gregorianCalendar.addDivision("année", 12);
gregorianCalendar.addDivision("mois", [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]);
gregorianCalendar.addDivision("jour");

gregorianCalendar.addSecondaryDivision("semaine", 2, 7, ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]);
gregorianCalendar.addSecondaryDivision("trimestre", 1, 3);
gregorianCalendar.addSecondaryDivision("semestre", 1, 6);

gregorianCalendar.addOddity(1, 1, 1, 0,
	(year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0,
	(...years) => Math.trunc((years[1]-years[0])/4) - Math.trunc((years[1]-years[0])/100) + Math.trunc((years[1]-years[0])/400)
);

export default gregorianCalendar;