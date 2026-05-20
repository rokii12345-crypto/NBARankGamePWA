type RulesScreenProps = {
  onBack: () => void
}

function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <main className="screen rules-screen">
      <section className="rules-panel">
        <p className="eyebrow">Pravila</p>
        <h1>Kako se igra</h1>
        <ul>
          <li>Igra ima 10 naključnih NBA igralcev in 10 naključnih kategorij.</li>
          <li>Za vsakega igralca izbereš eno še neuporabljeno kategorijo.</li>
          <li>Rezultat kroga je igralčeva uvrstitev v izbrani kategoriji.</li>
          <li>Če igralec ni na tej lestvici, je kazen +50 točk.</li>
          <li>Nižji skupni rezultat je boljši.</li>
          <li>Vsak igralec in vsaka kategorija se uporabita samo enkrat.</li>
          <li>Po izbiri kategorije se naslednji igralec prikaže samodejno.</li>
        </ul>
        <button className="primary-button" type="button" onClick={onBack}>
          Nazaj
        </button>
      </section>
    </main>
  )
}

export default RulesScreen
