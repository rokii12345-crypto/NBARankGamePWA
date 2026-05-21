type RulesScreenProps = {
  onBack: () => void
}

function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <main className="screen rules-screen">
      <section className="rules-panel">
        <p className="eyebrow">Pravila</p>
        <h1>Kako se igra</h1>

        <h2>NBA Rank Game</h2>
        <ul>
          <li>Igra ima 10 naključnih NBA igralcev in 10 naključnih kategorij.</li>
          <li>Za vsakega igralca izbereš eno še neuporabljeno kategorijo.</li>
          <li>Če igralec ni na izbrani lestvici, dobiš kazen +50 točk.</li>
          <li>Vsak igralec in vsaka kategorija se uporabita samo enkrat.</li>
        </ul>

        <h2>Rank Slovenija</h2>
        <ul>
          <li>Igra ima 10 slovenskih občin in 10 statističnih kategorij.</li>
          <li>Občine se izberejo samo iz podatkov, ki pokrivajo vseh 10 izbranih kategorij.</li>
          <li>Za vsako občino izbereš eno še neuporabljeno kategorijo.</li>
          <li>Po izboru najprej vidiš dejansko vrednost, nato igralne točke.</li>
          <li>Vsaka občina in vsaka kategorija se uporabita samo enkrat.</li>
        </ul>

        <ul>
          <li>Igralne točke so enake mestu na izbrani lestvici.</li>
          <li>Nižji skupni rezultat je boljši.</li>
          <li>Po izbiri kategorije se naslednji igralec ali občina prikaže samodejno.</li>
        </ul>

        <h2>Ugani občino</h2>
        <ul>
          <li>Igra ima 10 vprašanj s skrito slovensko občino.</li>
          <li>Prvi namig je vedno število prebivalcev.</li>
          <li>Ostali štirje namigi so naključni podatki, ki za to občino obstajajo.</li>
          <li>Izbereš enega od štirih možnih odgovorov.</li>
          <li>Po odgovoru se prikaže pravilna občina, nato gre igra naprej sama.</li>
        </ul>

        <h2>Višje ali nižje</h2>
        <ul>
          <li>Igra naključno izbere eno slovensko kategorijo z dovolj podatki.</li>
          <li>Prva občina je prikazana z dejansko vrednostjo.</li>
          <li>Naslednja občina je najprej skrita, ti pa izbereš višje ali nižje.</li>
          <li>Po odgovoru vidiš dejansko vrednost druge občine in rezultat odgovora.</li>
          <li>Druga občina nato postane prejšnja občina za naslednje vprašanje.</li>
        </ul>

        <button className="primary-button" type="button" onClick={onBack}>
          Nazaj
        </button>
      </section>
    </main>
  )
}

export default RulesScreen
