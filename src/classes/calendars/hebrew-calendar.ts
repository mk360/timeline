import Calendar from '../calendar'
let hebrewCalendar: Calendar = new Calendar();

hebrewCalendar.id = "xls"

hebrewCalendar.addDivision("année", 12);
hebrewCalendar.addDivision("mois", [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], ["Tishrei", "Cheshvan", "Kislev", "Tevet", "	Shevat", "Adar", "Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul"]);
hebrewCalendar.addDivision("jour");

hebrewCalendar.addSecondaryDivision("semaine", 2, 7, ["Yom Rishon", "Yom Sheni", "Yom Shlishi", "Yom Revii", "Yom Hamishi", "Yom Shishi", "Yom Shabbat"]);

//leap month - Adar I
hebrewCalendar.addOddity(1, 5, 30, 0,
	(year) => [3, 6, 8, 11, 14, 17, 0].includes(year%19),
	(year0, year1) => {
		let duration = year1-year0;
		let count = 0;
		if (duration > 19) {
			let durMod = duration%19;
			count = [3, 6, 8, 11, 14, 17, 0].filter(element => element > durMod).length;
		}

		return Math.floor(duration/19) + count;
	});

let offset = [98286, 0, 113196, 44952, 16381, 129577, 61333, 32762, 145958, 117387, 49143, 162339, 133768, 65524, 178720, 150149, 81905, 13661, 166530];
let moladCategories = [0, 16404, 28571, 49189, 51840, 68244, 77760, 96815, 120084, 129600, 136488, 146004, 158171];
let yearTo4TC = [3, 0, 2, 3, 0, 2, 3, 1, 3, 0, 2, 3, 0, 2, 3, 0, 2, 3, 1];
let drc = [["D", "C", "C", "R", "R", "R", "R", "R", "C", "D", "C", "C", "C"], ["D", "C", "C", "R", "R", "R", "R", "R", "C", "D", "D", "C", "C"], ["D", "C", "C", "C", "R", "R", "R", "R", "C", "D", "D", "C", "C"], ["D", "D", "C", "C", "R", "R", "D", "C", "C", "D", "D", "D", "C"]];

// Cheshvan oddity
hebrewCalendar.addOddity(1, 1, 1, 0,
	(year) => {
		let molad = (38004 + Math.floor((year-1)/19)*69715 + offset[year%19]%181440)%181440;
		let fourTablesLine = moladCategories.findIndex((element) => element > molad);
		let fourTablesColumn = yearTo4TC[year%19];

		return drc[fourTablesColumn][fourTablesLine] === "C";
	},
	(year1, year2) => {
		let nbOcc = 0;

		for (let year = year1; year < year2; ++year) {
			let molad = (38004 + Math.floor((year-1)/19)*69715 + offset[year%19]%181440)%181440;
			let fourTablesLine = moladCategories.findIndex((element) => element > molad);
			let fourTablesColumn = yearTo4TC[year%19];

			if (drc[fourTablesColumn][fourTablesLine] === "C")
				nbOcc++;
		}

		return nbOcc;
	});

// Kislev oddity
hebrewCalendar.addOddity(1, 2, -1, 0,
	(year) => {
		let molad = (38004 + Math.floor((year-1)/19)*69715 + offset[year%19]%181440)%181440;
		let fourTablesLine = moladCategories.findIndex((element) => element > molad);
		let fourTablesColumn = yearTo4TC[year%19];

		return drc[fourTablesColumn][fourTablesLine] === "D";
	},
	(year1, year2) => {
		let nbOcc = 0;

		for (let year = year1; year < year2; ++year) {
			let molad = (38004 + Math.floor((year-1)/19)*69715 + offset[year%19]%181440)%181440;
			let fourTablesLine = moladCategories.findIndex((element) => element > molad);
			let fourTablesColumn = yearTo4TC[year%19];

			if (drc[fourTablesColumn][fourTablesLine] === "D")
				nbOcc++;
		}

		return nbOcc;
	});

export default hebrewCalendar;