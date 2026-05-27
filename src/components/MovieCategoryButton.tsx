import type { MovieCategory } from '../data/movieCategories'
import { formatMovieAssignmentResult } from '../game/formatResult'
import type { MovieCategoryAssignment } from '../types/game'

type MovieCategoryButtonProps = {
  category: MovieCategory
  assignment?: MovieCategoryAssignment
  disabled?: boolean
  onSelect: (categoryId: string) => void
}

function MovieCategoryButton({
  category,
  assignment,
  disabled = false,
  onSelect,
}: MovieCategoryButtonProps) {
  const isUsed = Boolean(assignment)

  return (
    <button
      className={`category-button movie-category-button${
        isUsed ? ' category-button--used' : ''
      }`}
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
            ? formatMovieAssignmentResult(assignment, category)
            : category.subtitle}
        </small>
      </span>
      {isUsed ? <span className="category-button__lock">Zaklenjeno</span> : null}
    </button>
  )
}

export default MovieCategoryButton
