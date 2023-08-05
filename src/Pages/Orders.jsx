import React, {useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import TopNav from "../Components/TopNav";
import '../Components/Styles/order.css';
import goldOne from './Images/gold2.webp';
import goldTwo from './Images/gold3.jpg';
import OrderDetail from "./Orders/OrderDetail";
import axios from "axios";

function Orders(props) {
    const [selectedOrder, setSelectedOrder] = useState(0);
    const [goldBalance, setGoldBalance] = useState([]);
    const [walletBalance, setWalletBalance] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                setGoldBalance(res.data.goldBalance);
                setWalletBalance(res.data.walletBalance);
            })
    }, []);

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const orders = [
        {
            id: 1,
            image: goldOne,
            date: '7 شهریور 1401',
            code: '27897654',
            price: '99,600 تومان'
        },
        {
            id: 2,
            image: goldTwo,
            date: '28 خرداد 1401',
            code: '45672829',
            price: '256,160 تومان'
        }
    ];
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        navigate(`/order/${order.id}`);
    };

    return (
        <div className="main-container">
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            {selectedOrder ? (
                <NavLink to={`/order/${selectedOrder.id}`}></NavLink>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="order" onClick={() => handleOrderClick(order)}>
                        <div className='image-orders'>
                            <img src={order.image} alt={`Jewelry ${order.id}`} />
                        </div>
                        <div className="order-info">
                            <div className="order-date"> تاریخ : {order.date} </div>
                            <div className="order-code"> کد سفارش : {order.code} </div>
                            <div className="order-price"> مبلغ : {order.price} </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;


