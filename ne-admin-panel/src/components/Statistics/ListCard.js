function ListCard({title, info}){
  return (
    <article className="sc-card">
      <div className="sc-card__head sc-card__head">
        <h1 className="sc-card__title">{title}</h1>
      </div>
      <ul className="sc-card__info-container">
        {info.map((data, i) => {
          return (
            <li key={data + '-' + i} className="sc-card__text sc-card__listItem --capitalized">
              {data.toLowerCase()}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default ListCard