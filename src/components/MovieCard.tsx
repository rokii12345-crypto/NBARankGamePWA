import type { Movie } from '../data/movies'

type MovieCardProps = {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  const genres = movie.genres.length > 0 ? movie.genres.join(', ') : 'Ni podatka'
  const director = movie.director ?? 'Ni podatka'
  const runtime = movie.runtimeMinutes
    ? `${movie.runtimeMinutes} min`
    : 'Ni podatka'

  return (
    <article className="movie-card">
      <div className="movie-card__poster" aria-hidden={!movie.posterUrl}>
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={`Poster filma ${movie.title}`} />
        ) : (
          <span aria-hidden="true">🎬</span>
        )}
      </div>
      <div className="movie-card__body">
        <p className="eyebrow">Trenutni film</p>
        <h2>{movie.title}</h2>
        <p className="movie-card__bio">
          {movie.shortBio ?? `${movie.year} · ${genres}`}
        </p>
        <dl className="movie-card__facts">
          <div>
            <dt>Leto</dt>
            <dd>{movie.year}</dd>
          </div>
          <div>
            <dt>Režija</dt>
            <dd>{director}</dd>
          </div>
          <div>
            <dt>Žanri</dt>
            <dd>{genres}</dd>
          </div>
          <div>
            <dt>Dolžina</dt>
            <dd>{runtime}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default MovieCard
