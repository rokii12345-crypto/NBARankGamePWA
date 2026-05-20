export const formatNumber = (value: number) =>
  new Intl.NumberFormat('sl-SI', {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(value)

export const formatStatValue = (value: number | null, unit?: string) => {
  if (value === null || value === undefined) {
    return 'ni podatka'
  }

  const formattedValue = formatNumber(value)

  if (!unit) {
    return formattedValue
  }

  return `${formattedValue} ${unit}`
}

export const formatPoints = (points: number) => {
  if (points === 1) return '+1 točka'
  if (points === 2) return '+2 točki'
  if (points === 3 || points === 4) return `+${points} točke`
  return `+${points} točk`
}

export const formatUsedCategorySummary = ({
  playerName,
  value,
  unit,
  points,
  missingData,
}: {
  playerName: string
  value: number | null
  unit: string
  points: number
  missingData: boolean
}) => {
  if (missingData) {
    return `${playerName} · ni na lestvici · ${formatPoints(points)}`
  }

  return `${playerName} · ${formatStatValue(value, unit)} · ${formatPoints(points)}`
}
