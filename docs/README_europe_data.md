# Rank Evropa — World Bank data pack

Prepared from World Bank World Development Indicators exports.

Included:
- 46 European countries
- 19 World Bank categories
- 844 ranking records
- Latest available value per country and indicator

Files:
- src/data/europeCountries.ts
- src/data/europeCategories.ts
- src/data/europeRankings.ts
- src/game/validateEuropeData.ts
- docs/europeDataValidationReport.json
- docs/europe_latest_values.csv
- docs/europe_rankings.csv

Game rule:
- points = rank
- rank 1 = highest latest available value in the category
- partial categories must only select countries with data for the selected category set

Countries included:
Albanija, Andora, Avstrija, Belorusija, Belgija, Bosna in Hercegovina, Bolgarija, Hrvaška, Ciper, Češka, Danska, Estonija, Finska, Francija, Nemčija, Grčija, Madžarska, Islandija, Irska, Italija, Kosovo, Latvija, Lihtenštajn, Litva, Luksemburg, Malta, Moldavija, Monako, Črna gora, Nizozemska, Severna Makedonija, Norveška, Poljska, Portugalska, Romunija, Rusija, San Marino, Srbija, Slovaška, Slovenija, Španija, Švedska, Švica, Turčija, Ukrajina, Združeno kraljestvo
