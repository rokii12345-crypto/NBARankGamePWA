import type { SloveniaCategory } from '../data/sloveniaCategories'
import { formatSloveniaAssignmentResult } from '../game/formatResult'
import type { SloveniaCategoryAssignment } from '../types/game'

type SloveniaCategoryButtonProps = {
  category: SloveniaCategory
  assignment?: SloveniaCategoryAssignment
  disabled?: boolean
  onSelect: (categoryId: string) => void
}

function SloveniaCategoryButton({
  category,
  assignment,
  disabled = false,
  onSelect,
}: SloveniaCategoryButtonProps) {
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
            ? formatSloveniaAssignmentResult(assignment, category)
            : category.subtitle}
        </small>
      </span>
      {isUsed ? <span className="category-button__lock">Zaklenjeno</span> : null}
    </button>
  )
}

export default SloveniaCategoryButton
