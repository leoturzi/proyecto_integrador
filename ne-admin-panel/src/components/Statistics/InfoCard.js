function InfoCard({title, info}){
  return (
    <article className="sc-card">
      <div className="sc-card__head sc-card__head">
        <h1 className="sc-card__title">{title}</h1>
      </div>
      <div className="sc-card__info-container">
        <p className="sc-card__text sc-card__info">{info}</p>
      </div>
    </article>
  );
}

export default InfoCard