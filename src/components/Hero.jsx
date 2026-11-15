import { resolveSrc } from '../content/resolveSrc.js'

export default function Hero({ image, title, subtitle }) {
  return (
    <section className="hero">
      <img className="hero__img" src={resolveSrc(image.src)} alt={image.alt} />
      <div className="hero__overlay" />
      <div className="hero__text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
