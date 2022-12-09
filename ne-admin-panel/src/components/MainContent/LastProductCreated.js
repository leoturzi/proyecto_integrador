import {useState, useEffect} from 'react';
import toThousand from '../../assets/utils/toThousand'
function LastProductCreated(){
    
    const [lastProduct, setProduct] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3033/api/products/last`)
        .then(response => response.json())
        .then(data => {
          if (data.processedProduct) {
            setProduct(data.processedProduct);
          }
        });
      },[])

    return (
        <section className='mc-card last-pc'>
            <div className='mc-card__head'>
              <h1 className='mc-card__title'>Ultimo producto creado</h1>
              <p className='mc-card__text'>{lastProduct.name}</p>
              <p className='mc-card__text'>$ {toThousand(lastProduct.price)}</p>
            </div>
            <div className='mc-card__img-container'>
              <img className='mc-img lp-img' src={lastProduct.url} alt={lastProduct.name}/>
            </div>
          </section>
    )
}

export default LastProductCreated