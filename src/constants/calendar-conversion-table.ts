var cct = new Map();
cct.set("ltq-scl", 227016);
cct.set("scl-ltq", -227016);

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

