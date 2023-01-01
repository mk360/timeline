var cct = new Map();
cct.set("ltq-scl", 227016);
cct.set("scl-ltq", -227016);

var cct2: {[column: string]: {[row: string]: number }} = {};
cct2["ltq"] = {};
cct2["scl"] = {};
cct2["xls"] = {};

cct2["ltq"]["scl"] = 227016;
cct2["scl"]["ltq"] = -227016;

cct2["xls"]["ltq"] = 1373429;
cct2["ltq"]["xls"] = -1373429;

cct2["xls"]["scl"] = 0;
cct2["scl"]["xls"] = 0;

function foo(a: string, b: string) {
	return cct2[a][b];
}

function calendarConversionTable(a: string, b: string) {
	return cct.get(a+"-"+b);
};

export default calendarConversionTable;

/*
	a : stellaire
	f : fixe
	l : lunaire
	s : solaire
	x : lunisolaire

	ltq => hégirien
	scl => grégorien
*/