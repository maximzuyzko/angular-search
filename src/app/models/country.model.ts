export interface CountryModel {
  activeCases: number,
  country: string,
  lastUpdate: 'date',
  newCases: number,
  newDeaths: number,
  totalCases: number,
  totalDeaths: number,
  totalRecovered: number
}
