import { shop } from '../data/shop'

export function MapEmbed() {
  return (
    <div className="map-embed">
      <iframe
        title={`${shop.name} location map`}
        src={shop.mapsEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
