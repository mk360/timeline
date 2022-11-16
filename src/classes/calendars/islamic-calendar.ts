import Calendar from '../calendar'
let islamicCalendar: Calendar = new Calendar();

islamicCalendar.id = "ltq"

islamicCalendar.addDivision("année", 12);
islamicCalendar.addDivision("mois", [29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29], ["Al-muḥarram","Ṣafar","Rabī῾ al-awwal","Rabī῾ al-ākhir","Jumādà ᾿l-ūlà","Jumādà ᾿l-ākhira","Rajab","Sha῾bān","Ramaḍān","Shawwāl","Dhū ᾿l-qa῾da","Dhū ᾿l-ḥijja"]);
islamicCalendar.addDivision("jour");

islamicCalendar.addSecondaryDivision("semaine", 2, 7, ["Al-ʾaḥad", "Al-iṯnayn", "Aṯ-ṯalāṯāʾ", "Al-ʾarbaʿāʾ", "Al-ḵamīs", "Al-jumʿa", "As-sabt"])

export default islamicCalendar