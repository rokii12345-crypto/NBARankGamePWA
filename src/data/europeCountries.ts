export type EuropeCountry = {
  id: string
  name: string
  englishName: string
  code: string
  flagEmoji: string
  capital: string
  region: string
}

export const europeCountries: EuropeCountry[] = [
  { id: "albania", name: "Albanija", englishName: "Albania", code: "ALB", flagEmoji: "🇦🇱", capital: "Tirana", region: "Balkan" },
  { id: "andorra", name: "Andora", englishName: "Andorra", code: "AND", flagEmoji: "🇦🇩", capital: "Andorra la Vella", region: "Zahodna Evropa" },
  { id: "austria", name: "Avstrija", englishName: "Austria", code: "AUT", flagEmoji: "🇦🇹", capital: "Dunaj", region: "Srednja Evropa" },
  { id: "belarus", name: "Belorusija", englishName: "Belarus", code: "BLR", flagEmoji: "🇧🇾", capital: "Minsk", region: "Vzhodna Evropa" },
  { id: "belgium", name: "Belgija", englishName: "Belgium", code: "BEL", flagEmoji: "🇧🇪", capital: "Bruselj", region: "Zahodna Evropa" },
  { id: "bosnia-and-herzegovina", name: "Bosna in Hercegovina", englishName: "Bosnia and Herzegovina", code: "BIH", flagEmoji: "🇧🇦", capital: "Sarajevo", region: "Balkan" },
  { id: "bulgaria", name: "Bolgarija", englishName: "Bulgaria", code: "BGR", flagEmoji: "🇧🇬", capital: "Sofija", region: "Balkan" },
  { id: "croatia", name: "Hrvaška", englishName: "Croatia", code: "HRV", flagEmoji: "🇭🇷", capital: "Zagreb", region: "Balkan" },
  { id: "cyprus", name: "Ciper", englishName: "Cyprus", code: "CYP", flagEmoji: "🇨🇾", capital: "Nikozija", region: "Južna Evropa" },
  { id: "czechia", name: "Češka", englishName: "Czechia", code: "CZE", flagEmoji: "🇨🇿", capital: "Praga", region: "Srednja Evropa" },
  { id: "denmark", name: "Danska", englishName: "Denmark", code: "DNK", flagEmoji: "🇩🇰", capital: "Kopenhagen", region: "Severna Evropa" },
  { id: "estonia", name: "Estonija", englishName: "Estonia", code: "EST", flagEmoji: "🇪🇪", capital: "Talin", region: "Severna Evropa" },
  { id: "finland", name: "Finska", englishName: "Finland", code: "FIN", flagEmoji: "🇫🇮", capital: "Helsinki", region: "Severna Evropa" },
  { id: "france", name: "Francija", englishName: "France", code: "FRA", flagEmoji: "🇫🇷", capital: "Pariz", region: "Zahodna Evropa" },
  { id: "germany", name: "Nemčija", englishName: "Germany", code: "DEU", flagEmoji: "🇩🇪", capital: "Berlin", region: "Srednja Evropa" },
  { id: "greece", name: "Grčija", englishName: "Greece", code: "GRC", flagEmoji: "🇬🇷", capital: "Atene", region: "Južna Evropa" },
  { id: "hungary", name: "Madžarska", englishName: "Hungary", code: "HUN", flagEmoji: "🇭🇺", capital: "Budimpešta", region: "Srednja Evropa" },
  { id: "iceland", name: "Islandija", englishName: "Iceland", code: "ISL", flagEmoji: "🇮🇸", capital: "Reykjavik", region: "Severna Evropa" },
  { id: "ireland", name: "Irska", englishName: "Ireland", code: "IRL", flagEmoji: "🇮🇪", capital: "Dublin", region: "Zahodna Evropa" },
  { id: "italy", name: "Italija", englishName: "Italy", code: "ITA", flagEmoji: "🇮🇹", capital: "Rim", region: "Južna Evropa" },
  { id: "kosovo", name: "Kosovo", englishName: "Kosovo", code: "XKX", flagEmoji: "🇽🇰", capital: "Priština", region: "Balkan" },
  { id: "latvia", name: "Latvija", englishName: "Latvia", code: "LVA", flagEmoji: "🇱🇻", capital: "Riga", region: "Severna Evropa" },
  { id: "liechtenstein", name: "Lihtenštajn", englishName: "Liechtenstein", code: "LIE", flagEmoji: "🇱🇮", capital: "Vaduz", region: "Zahodna Evropa" },
  { id: "lithuania", name: "Litva", englishName: "Lithuania", code: "LTU", flagEmoji: "🇱🇹", capital: "Vilna", region: "Severna Evropa" },
  { id: "luxembourg", name: "Luksemburg", englishName: "Luxembourg", code: "LUX", flagEmoji: "🇱🇺", capital: "Luksemburg", region: "Zahodna Evropa" },
  { id: "malta", name: "Malta", englishName: "Malta", code: "MLT", flagEmoji: "🇲🇹", capital: "Valletta", region: "Južna Evropa" },
  { id: "moldova", name: "Moldavija", englishName: "Moldova", code: "MDA", flagEmoji: "🇲🇩", capital: "Kišinjev", region: "Vzhodna Evropa" },
  { id: "monaco", name: "Monako", englishName: "Monaco", code: "MCO", flagEmoji: "🇲🇨", capital: "Monako", region: "Zahodna Evropa" },
  { id: "montenegro", name: "Črna gora", englishName: "Montenegro", code: "MNE", flagEmoji: "🇲🇪", capital: "Podgorica", region: "Balkan" },
  { id: "netherlands", name: "Nizozemska", englishName: "Netherlands", code: "NLD", flagEmoji: "🇳🇱", capital: "Amsterdam", region: "Zahodna Evropa" },
  { id: "north-macedonia", name: "Severna Makedonija", englishName: "North Macedonia", code: "MKD", flagEmoji: "🇲🇰", capital: "Skopje", region: "Balkan" },
  { id: "norway", name: "Norveška", englishName: "Norway", code: "NOR", flagEmoji: "🇳🇴", capital: "Oslo", region: "Severna Evropa" },
  { id: "poland", name: "Poljska", englishName: "Poland", code: "POL", flagEmoji: "🇵🇱", capital: "Varšava", region: "Srednja Evropa" },
  { id: "portugal", name: "Portugalska", englishName: "Portugal", code: "PRT", flagEmoji: "🇵🇹", capital: "Lizbona", region: "Južna Evropa" },
  { id: "romania", name: "Romunija", englishName: "Romania", code: "ROU", flagEmoji: "🇷🇴", capital: "Bukarešta", region: "Vzhodna Evropa" },
  { id: "russian-federation", name: "Rusija", englishName: "Russian Federation", code: "RUS", flagEmoji: "🇷🇺", capital: "Moskva", region: "Vzhodna Evropa" },
  { id: "san-marino", name: "San Marino", englishName: "San Marino", code: "SMR", flagEmoji: "🇸🇲", capital: "San Marino", region: "Južna Evropa" },
  { id: "serbia", name: "Srbija", englishName: "Serbia", code: "SRB", flagEmoji: "🇷🇸", capital: "Beograd", region: "Balkan" },
  { id: "slovak-republic", name: "Slovaška", englishName: "Slovak Republic", code: "SVK", flagEmoji: "🇸🇰", capital: "Bratislava", region: "Srednja Evropa" },
  { id: "slovenia", name: "Slovenija", englishName: "Slovenia", code: "SVN", flagEmoji: "🇸🇮", capital: "Ljubljana", region: "Srednja Evropa" },
  { id: "spain", name: "Španija", englishName: "Spain", code: "ESP", flagEmoji: "🇪🇸", capital: "Madrid", region: "Južna Evropa" },
  { id: "sweden", name: "Švedska", englishName: "Sweden", code: "SWE", flagEmoji: "🇸🇪", capital: "Stockholm", region: "Severna Evropa" },
  { id: "switzerland", name: "Švica", englishName: "Switzerland", code: "CHE", flagEmoji: "🇨🇭", capital: "Bern", region: "Zahodna Evropa" },
  { id: "turkiye", name: "Turčija", englishName: "Türkiye", code: "TUR", flagEmoji: "🇹🇷", capital: "Ankara", region: "Jugovzhodna Evropa" },
  { id: "ukraine", name: "Ukrajina", englishName: "Ukraine", code: "UKR", flagEmoji: "🇺🇦", capital: "Kijev", region: "Vzhodna Evropa" },
  { id: "united-kingdom", name: "Združeno kraljestvo", englishName: "United Kingdom", code: "GBR", flagEmoji: "🇬🇧", capital: "London", region: "Zahodna Evropa" },
]
