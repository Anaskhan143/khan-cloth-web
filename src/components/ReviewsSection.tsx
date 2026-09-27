import { reviews } from '../data/reviews'

export function ReviewsSection() {
  return (
    <section id="reviews" className="section reviews">
      <div className="content-wrap">
        <div className="section-intro">
          <p className="eyebrow">Reviews</p>
          <h2>What customers say</h2>
          <p className="lede">
            From customers across Pakistan — shared after WhatsApp orders and shop visits.
          </p>
        </div>
        <ul className="reviews-rail">
          {reviews.map((review) => (
            <li key={review.id} className="review-quote">
              <p className="review-text">{review.text}</p>
              <p className="review-author">
                {review.name}
                <span> — {review.city}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
