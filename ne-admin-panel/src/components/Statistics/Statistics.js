import './Statistics.css';
import InfoCard from './InfoCard';
import ListCard from './ListCard';
// import { useState, useEffect } from "react";
function Statistics(){
    // const [last5, setLast5] = useState([]);
    // const [totalCategories, setTotalCategories] = useState([]);
    // const [totalUsers, setTotalUsers] = useState([]);
    // const [totalProducts, setTotalProducts] = useState([]);
    // const [nProductsByCategories, setnProductsByCategories] = useState([]);
    // const [totalOrders, setTotalOrders] = useState([]);
    // const [theMostSold, settheMostSold] = useState([]);

    // let renderList = [];
    // Array.isArray(value)
    return(
        <>
            <h1 className="main-title">ESTADISTICAS</h1>
            <div className="sc-container sc-cards-wrapper">
                <InfoCard title='Aca va el title' info='Aca va la info'/>
                <ListCard title='Aca va el title' info={['Aca va la info', 'Aca va la info', 'Aca va la info', 'Aca va la info', 'Aca va la info', ]}/>
            </div>
        </>
    )
}

export default Statistics;