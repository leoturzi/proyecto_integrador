import {useState, useEffect} from 'react';
function LastUserCreated(){
    const [lastUser, setLastUser] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:3033/api/users/last`)
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setLastUser(data.user);
          }
        });
      },[])
    return (
      <section className="mc-card last-pc">
        <div className="mc-card__head mc-card__head--green">
          <h1 className="mc-card__title">Ultimo usuario registrado</h1>
          <p className="mc-card__text --capitalized">
            {lastUser.first_name} {lastUser.last_name}
          </p>
          <p className="mc-card__text">{lastUser.email}</p>
        </div>
        <div className="mc-card__img-container">
          <img
            className="mc-img lp-img --portrait"
            src={lastUser.avatarURL}
            alt={lastUser.name}
          />
        </div>
      </section>
    );
}

export default LastUserCreated