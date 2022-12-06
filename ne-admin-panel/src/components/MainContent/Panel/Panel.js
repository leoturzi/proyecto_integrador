import productsLogo from '../../../assets/images/guitar.jpg';
import usersLogo from '../../../assets/images/users.png';
import statisticsLogo from '../../../assets/images/charts.png';
import PanelOption from './PanelOption';

function Panel(){
    let optionArray = [
        {
            title : 'Productos',
            url : '/allProducts',
            altText : 'Guitar link to products',
            logo : productsLogo
        },
        {
            title : 'Usuarios',
            url : '/allUsers',
            altText : 'Users icon, link to Users',
            logo : usersLogo
        },
        {
            title : 'Estadisticas',
            url : '/statistics',
            altText : 'Arrow graph, link to statistics',
            logo : statisticsLogo
        }
    ]
    return(
        <div className="panel options">
            {
            optionArray.map((option, i) => {                
                return <PanelOption
                key={option.altText + '-' + i}
                url={option.url}
                altText={option.altText}
                title={option.title}
                logo={option.logo}/>
            })
            }
        </div>
    )

}

export default Panel