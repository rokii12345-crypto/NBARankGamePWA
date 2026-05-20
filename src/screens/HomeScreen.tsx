type HomeScreenProps = {
  onStart: () => void
  onRules: () => void
}

function HomeScreen({ onStart, onRules }: HomeScreenProps) {
  return (
    <main className="screen home-screen">
      <section className="home-hero">
        <p className="eyebrow">NBA Rank Game</p>
        <h1>Izberi pametno. Nižji rezultat zmaga.</h1>
        <p>
          Dobiš 10 naključnih NBA igralcev in 10 naključno izbranih kategorij.
          Če igralec ni na izbrani lestvici, dobiš kazen +50 točk.
        </p>
        <div className="action-row">
          <button className="primary-button" type="button" onClick={onStart}>
            Začni igro
          </button>
          <button className="ghost-button" type="button" onClick={onRules}>
            Pravila
          </button>
        </div>
      </section>
    </main>
  )
}

export default HomeScreen
