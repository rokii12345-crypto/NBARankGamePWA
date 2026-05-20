type ScoreBadgeProps = {
  label: string
  value: string | number
  tone?: 'dark' | 'accent' | 'success'
}

function ScoreBadge({ label, value, tone = 'dark' }: ScoreBadgeProps) {
  return (
    <div className={`score-badge score-badge--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default ScoreBadge
