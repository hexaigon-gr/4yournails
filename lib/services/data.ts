export type Locale = "el" | "en";

export type Service = {
  name: Record<Locale, string>;
  durationMinutes: number;
};

export type ServiceCategoryKey = "manicureHand" | "pedicureFoot" | "waxing";

export type ServiceCategory = {
  key: ServiceCategoryKey;
  title: Record<Locale, string>;
  items: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    key: "manicureHand",
    title: {
      el: "Μανικιούρ Και Θεραπείες Χεριών",
      en: "Manicure And Hand Treatments",
    },
    items: [
      { name: { el: "Μανικιούρ ημιμόνιμο", en: "Semi-permanent manicure" }, durationMinutes: 60 },
      { name: { el: "Μανικιούρ διαρκείας", en: "Long-lasting manicure" }, durationMinutes: 45 },
      { name: { el: "Μανικιούρ με απλό βερνίκι", en: "Manicure with regular polish" }, durationMinutes: 60 },
      { name: { el: "Μανικιούρ - περιποίηση", en: "Care manicure" }, durationMinutes: 45 },
      { name: { el: "Manicure express ημιμόνιμο", en: "Express semi-permanent manicure" }, durationMinutes: 30 },
      { name: { el: "Μανικιούρ αντρικό", en: "Men's manicure" }, durationMinutes: 30 },
      { name: { el: "Αντρικό Spa μανικιούρ", en: "Men's spa manicure" }, durationMinutes: 45 },
      { name: { el: "Spa χεριών", en: "Hand spa" }, durationMinutes: 15 },
      { name: { el: "Βάψιμο διαρκείας χέρια", en: "Long-lasting polish — hands" }, durationMinutes: 15 },
      { name: { el: "Βάψιμο απλό χέρια", en: "Regular polish — hands" }, durationMinutes: 15 },
      { name: { el: "Βάψιμο με ημιμόνιμο βερνίκι", en: "Semi-permanent polish application" }, durationMinutes: 30 },
      { name: { el: "Σχήμα – χρώμα με βερνίκι διαρκείας (χέρια)", en: "Shape & long-lasting colour — hands" }, durationMinutes: 15 },
      { name: { el: "Σχήμα – Χρώμα", en: "Shape & colour" }, durationMinutes: 15 },
      { name: { el: "Τεχνητά με gel", en: "Gel extensions" }, durationMinutes: 120 },
      { name: { el: "Gel φυσική ενίσχυση", en: "Gel natural reinforcement" }, durationMinutes: 120 },
      { name: { el: "Συντήρηση τεχνητών νυχιών", en: "Gel extensions maintenance" }, durationMinutes: 105 },
      { name: { el: "Αφαίρεση Τεχνητών Νυχιών", en: "Gel extensions removal" }, durationMinutes: 30 },
      { name: { el: "Αφαίρεση ημιμόνιμου", en: "Semi-permanent removal" }, durationMinutes: 15 },
      { name: { el: "Σπασμένο νύχι", en: "Broken nail repair" }, durationMinutes: 15 },
      { name: { el: "Συντήρηση τεχνητό σπασμένο νύχι", en: "Broken gel-nail repair" }, durationMinutes: 15 },
    ],
  },
  {
    key: "pedicureFoot",
    title: {
      el: "Πεντικιούρ Και Θεραπείες Ποδιών",
      en: "Pedicure And Foot Treatments",
    },
    items: [
      { name: { el: "Πεντικιούρ ημιμόνιμο", en: "Semi-permanent pedicure" }, durationMinutes: 60 },
      { name: { el: "Πεντικιούρ διαρκείας", en: "Long-lasting pedicure" }, durationMinutes: 60 },
      { name: { el: "Πεντικιούρ απλό βερνίκι", en: "Pedicure with regular polish" }, durationMinutes: 60 },
      { name: { el: "Πεντικιούρ - περιποίηση", en: "Care pedicure" }, durationMinutes: 45 },
      { name: { el: "Πεντικιούρ αντρικό", en: "Men's pedicure" }, durationMinutes: 45 },
      { name: { el: "Θεραπεία ποδιών", en: "Foot treatment" }, durationMinutes: 15 },
      { name: { el: "Spa ποδιών", en: "Foot spa" }, durationMinutes: 15 },
      { name: { el: "Βάψιμο διαρκείας πόδια", en: "Long-lasting polish — feet" }, durationMinutes: 15 },
      { name: { el: "Βάψιμο απλό πόδια", en: "Regular polish — feet" }, durationMinutes: 15 },
      { name: { el: "Σχήμα – Βάψιμο πόδια", en: "Shape & polish — feet" }, durationMinutes: 30 },
      { name: { el: "Σχήμα και χρώμα διαρκείας - πόδια", en: "Shape & long-lasting colour — feet" }, durationMinutes: 30 },
    ],
  },
  {
    key: "waxing",
    title: {
      el: "Αποτρίχωση Με Κερί Και Κλωστή",
      en: "Waxing And Threading",
    },
    items: [
      { name: { el: "Αποτρίχωση άνω χείλος", en: "Upper lip" }, durationMinutes: 15 },
      { name: { el: "Αποτρίχωση με κερί άνω χείλος", en: "Upper lip — wax" }, durationMinutes: 15 },
      { name: { el: "Αποτρίχωση μασχάλες", en: "Underarms" }, durationMinutes: 15 },
      { name: { el: "Αποτρίχωση χέρια", en: "Arms" }, durationMinutes: 15 },
      { name: { el: "Αποτρίχωση με κερί - πόδια μισά", en: "Half legs — wax" }, durationMinutes: 15 },
      { name: { el: "Αποτρίχωση πόδι ολόκληρο", en: "Full leg" }, durationMinutes: 30 },
      { name: { el: "Αποτρίχωση πλάτη", en: "Back" }, durationMinutes: 15 },
    ],
  },
];

export function formatDuration(minutes: number, locale: Locale): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (locale === "el") {
    if (hours === 0) return `${mins} λεπτά`;
    const h = hours === 1 ? "1 ώρα" : `${hours} ώρες`;
    return mins === 0 ? h : `${h} ${mins} λεπτά`;
  }

  if (hours === 0) return `${mins} min`;
  const h = hours === 1 ? "1 hr" : `${hours} hrs`;
  return mins === 0 ? h : `${h} ${mins} min`;
}
