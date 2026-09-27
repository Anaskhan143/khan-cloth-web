import { metersGuide } from '../data/metersGuide'

export function MetersGuide() {
  return (
    <section id="meters" className="section meters-guide">
      <div className="meters-layout content-wrap">
        <div className="section-intro meters-intro">
          <p className="eyebrow">Meters</p>
          <h2>How many meters?</h2>
          <p className="lede">
            A quick guide for shalwar kameez — we confirm exact meters on WhatsApp before cutting.
          </p>
        </div>
        <ol className="meters-rail">
          {metersGuide.map((item, i) => (
            <li key={item.id} className="meters-row">
              <div className="meters-main">
                <span className="meters-index">{String(i + 1).padStart(2, '0')}</span>
                <div className="meters-copy">
                  <p className="meters-label">{item.label}</p>
                  <p className="meters-note">{item.note}</p>
                </div>
              </div>
              <p className="meters-value">{item.meters}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
