import type { EuropeCategory } from '../data/europeCategories'
import { formatEuropeAssignmentResult } from '../game/formatResult'
import type { EuropeCategoryAssignment } from '../types/game'

type EuropeCategoryButtonProps = {
  category: EuropeCategory
  assignment?: EuropeCategoryAssignment
  disabled?: boolean
  onSelect: (categoryId: string) => void
}

function EuropeCategoryButton({
  category,
  assignment,
  disabled = false,
  onSelect,
}: EuropeCategoryButtonProps) {
  const isUsed = Boolean(assignment)

  return (
    <button
      className={`category-button${isUsed ? ' category-button--used' : ''}`}
      type="button"
      disabled={disabled || isUsed}
      onClick={() => onSelect(category.id)}
    >
      <span className="category-button__icon" aria-hidden="true">
        {category.icon}
      </span>
      <span className="category-button__text">
        <strong>{category.title}</strong>
        <small>
          {isUsed && assignment
            ? formatEuropeAssignmentResult(assignment, category)
            : category.subtitle}
        </small>
      </span>
      {isUsed ? <span className="category-button__lock">Zaklenjeno</span> : null}
    </button>
  )
}

export default EuropeCategoryButton
