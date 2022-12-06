function InfoCard({title, info}){
    return(
        <section className='sc-card last-pc'>
            <div className='sc-card__head sc-card__head--green'>
              <h1 className='sc-card__title'>{title}</h1>
            </div>
              <div className='sc-card__info-container'>
              <p className='sc-card__text sc-card__info'>{info}</p>
              </div>
          </section>
    )
}

export default InfoCard