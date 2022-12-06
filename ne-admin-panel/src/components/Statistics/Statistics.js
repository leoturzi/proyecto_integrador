import './Statistics.css';
import InfoCard from './InfoCard';
import ListCard from './ListCard';
import toThousand from '../../assets/utils/toThousand'
import { useState, useEffect } from "react";
function Statistics(){
    const [last5Sold, setLast5Sold] = useState([]);
    const [totalCategories, setTotalCategories] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [totalProducts, setTotalProducts] = useState([]);
    const [totalOrders, setTotalOrders] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState([]);
    const [sales, setSales] = useState([]);
    // const [theMostSold, settheMostSold] = useState([]);

    useEffect(() => {
        

        fetch(`http://localhost:3033/api/cart/allOrders`)
        .then(response => response.json())
        .then(data => {
            setTotalOrders({
                title : 'Ordenes de compra',
                info : data.total
            })
            let earnings = data.orders.reduce((acum, order) =>{
                return acum + order.amount
            }, 0)
            setTotalEarnings({
                title : 'Total facturado',
                info : `$${toThousand(earnings)}`
            })

            let totalProdVendidos = data.orders.reduce((acum, order)=>{
                return acum + order.products.length;
            },0)
            setSales({
                title : 'Total Productos Vendidos',
                info : totalProdVendidos
            })
        })

        fetch(`http://localhost:3033/api/products`)
        .then(response => response.json())
        .then(data => {
            setTotalProducts({
                title : 'Cantidad de productos',
                info : data.total
            })
        })

        fetch(`http://localhost:3033/api/users`)
        .then(response => response.json())
        .then(data => {
            setTotalUsers({
                title : 'Total de Usuarios',
                info : data.count
            })
        })

        fetch(`http://localhost:3033/api/products`)
        .then(response => response.json())
        .then(data => {
            let allKeysInCategories = Object.keys(data.countByCategories);
            setTotalCategories({
                title : 'Cantidad de Categorias',
                info : allKeysInCategories.length
            })
        })

        fetch(`http://localhost:3033/api/cart/lastFiveSold`)
        .then(response => response.json())
        .then(data => {
            setLast5Sold({
                title : 'Ultimos 5 productos vendidos',
                info :data.items
            });
        })
    }, [])

    let dataSets = [last5Sold, totalCategories, totalUsers, totalProducts, totalOrders, totalEarnings, sales];
    return(
        <>
            <h1 className="main-title">ESTADISTICAS</h1>
            <div className="sc-container sc-cards-wrapper">
                {dataSets.map((set, i) =>{
                    if (Array.isArray(set.info)){
                        return <ListCard key={set.title + '-' + i} title={set.title} info={set.info}/>
                    } else {
                        return <InfoCard key={set.title + '-' + i} title={set.title} info={set.info}/>
                    }
                })}
            </div>
        </>
    )
}

export default Statistics;