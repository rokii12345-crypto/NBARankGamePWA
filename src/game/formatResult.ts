import type { NBACategory } from '../data/nbaCategories'
import type { CategoryAssignment, RoundResult } from '../types/game'

const formatNumber = (value: number) => {
  const hasDecimals = !Number.isInteger(value)

  return new Intl.NumberFormat('sl-SI', {
    maximumFractionDigits: hasDecimals ? 1 : 0,
    minimumFractionDigits: 0,
  }).format(value)
}

export const formatStatValue = (value: number | null, unit?: string) => {
  if (value === null || value === undefined) {
    return 'ni podatka'
  }

  const formattedValue = formatNumber(value)

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
  category?: NBACategory,
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
