import './Statistics.css';
import SingleCard from './SingleCard';
// import { useState, useEffect } from "react";
function Statistics(){
    // const [last5, setLast5] = useState([]);
    // const [totalCategories, setTotalCategories] = useState([]);
    // const [totalUsers, setTotalUsers] = useState([]);
    // const [totalProducts, setTotalProducts] = useState([]);
    // const [nProductsByCategories, setnProductsByCategories] = useState([]);
    // const [totalOrders, setTotalOrders] = useState([]);
    // const [theMostSold, settheMostSold] = useState([]);
    return(
        <>
            <h1 className="main-title">ESTADISTICAS</h1>
            <div className="card-container">
                <SingleCard />
            </div>
        </>
    )
}

export default Statistics;