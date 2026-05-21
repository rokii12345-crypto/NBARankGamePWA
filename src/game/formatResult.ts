import type {
  CategoryAssignment,
  EuropeCategoryAssignment,
  EuropeRoundResult,
  RoundResult,
  SloveniaCategoryAssignment,
  SloveniaRoundResult,
} from '../types/game'

type ResultCategory = {
  unit: string
  decimals?: number
}

const formatNumber = (value: number, decimals?: number) => {
  const resolvedDecimals =
    decimals ?? (Number.isInteger(value) ? 0 : 1)

  return new Intl.NumberFormat('sl-SI', {
    maximumFractionDigits: resolvedDecimals,
    minimumFractionDigits: resolvedDecimals,
  }).format(value)
}

export const formatStatValue = (
  value: number | null,
  unit?: string,
  decimals?: number,
) => {
  if (value === null || value === undefined) {
    return 'ni podatka'
  }

  const formattedValue = formatNumber(value, decimals)

  if (!unit) {
    return formattedValue
  }

  if (unit === 'PPG' || unit === 'RPG' || unit === 'APG') {
    return `${formattedValue} ${unit}`
  }

  return `${formattedValue} ${unit}`
}

export const formatGamePoints = (points: number) => `+${points}`

export const formatAssignmentResult = (
  assignment: CategoryAssignment,
  category?: ResultCategory,
  options: { includePlayerName?: boolean } = {},
) => {
  const includePlayerName = options.includePlayerName ?? true
  const playerPrefix = includePlayerName ? `${assignment.playerName} · ` : ''

  if (assignment.missingData || assignment.value === null || !category) {
    return `${playerPrefix}ni na lestvici · ${formatGamePoints(assignment.points)}`
  }

  return `${playerPrefix}${formatStatValue(
    assignment.value,
    category.unit,
    category.decimals,
  )} · ${formatGamePoints(assignment.points)}`
}

export const formatRoundResult = (result: RoundResult) => {
  if (result.missingData || result.value === null) {
    return `${result.playerName} — ${result.categoryTitle}: ni na lestvici · ${formatGamePoints(
      result.points,
    )}.`
  }

  return `${result.playerName} — ${result.categoryTitle}: ${formatStatValue(
    result.value,
    result.unit,
  )}. Igralne točke: ${formatGamePoints(result.points)}.`
}

export const formatSloveniaAssignmentResult = (
  assignment: SloveniaCategoryAssignment,
  category?: ResultCategory,
  options: { includeMunicipalityName?: boolean } = {},
) => {
  const includeMunicipalityName = options.includeMunicipalityName ?? true
  const municipalityPrefix = includeMunicipalityName
    ? `${assignment.municipalityName} · `
    : ''

  if (!category) {
    return `${municipalityPrefix}${formatGamePoints(assignment.points)}`
  }

  return `${municipalityPrefix}${formatStatValue(
    assignment.value,
    category.unit,
    category.decimals,
  )} · ${formatGamePoints(assignment.points)}`
}

export const formatSloveniaRoundResult = (result: SloveniaRoundResult) =>
  `${result.municipalityName} — ${result.categoryTitle}: ${formatStatValue(
    result.value,
    result.unit,
    result.decimals,
  )}. Igralne točke: ${formatGamePoints(result.points)}.`

export const formatEuropeAssignmentResult = (
  assignment: EuropeCategoryAssignment,
  category?: ResultCategory,
  options: { includeCountryName?: boolean } = {},
) => {
  const includeCountryName = options.includeCountryName ?? true
  const countryPrefix = includeCountryName ? `${assignment.countryName} · ` : ''

  if (!category) {
    return `${countryPrefix}${formatGamePoints(assignment.points)}`
  }

  return `${countryPrefix}${formatStatValue(
    assignment.value,
    category.unit,
    category.decimals,
  )} · ${assignment.year} · ${formatGamePoints(assignment.points)}`
}

export const formatEuropeRoundResult = (result: EuropeRoundResult) =>
  `${result.countryName} — ${result.categoryTitle}: ${formatStatValue(
    result.value,
    result.unit,
    result.decimals,
  )} (${result.year}). Igralne točke: ${formatGamePoints(result.points)}.`
