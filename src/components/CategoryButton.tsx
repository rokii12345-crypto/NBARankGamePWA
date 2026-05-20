import type { NBACategory } from '../data/nbaCategories'
import type { CategoryAssignment } from '../types/game'

type CategoryButtonProps = {
  category: NBACategory
  assignment?: CategoryAssignment
  disabled?: boolean
  onSelect: (categoryId: string) => void
}

function CategoryButton({
  category,
  assignment,
  disabled = false,
  onSelect,
}: CategoryButtonProps) {
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
            ? `${assignment.playerName} · ${
                assignment.missingData
                  ? 'ni na lestvici · 50 točk'
                  : `#${assignment.rank} · ${assignment.points} točk`
              }`
            : category.subtitle}
        </small>
      </span>
      {isUsed ? <span className="category-button__lock">Zaklenjeno</span> : null}
    </button>
  )
}

export default CategoryButton
