var cct = new Map();
cct.set("ltq-scl", 227016);
cct.set("scl-ltq", -227016);

export default function calendarConversionTable(a: String, b: String){return cct.get(a+"-"+b);};

/*
	a : stellaire
	f : fixe
	l : lunaire
	s : solaire
	x : lunisolaire

	ltq => hégirien
	scl => grégorien
*/

