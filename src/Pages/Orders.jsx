import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import TopNav from '../Components/TopNav';
import '../Components/Styles/order.css';
import goldimg from './Images/goldimg.webp';

import axios from 'axios';

function Orders(props) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [goldBalance, setGoldBalance] = useState('');
    const [walletBalance, setWalletBalance] = useState('');
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                setGoldBalance(res.data.goldBalance);
                setWalletBalance(res.data.walletBalance);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('/orders?size=10&page=1')
            .then(res => {
                setOrders(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const formatAmount = value => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleOrderClick = order => {
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
                        <div className="image-orders">
                            <img src={goldimg} alt={`Jewelry ${order.id}`}/>
                            <div className="line"></div>
                        </div>
                        <div className="order-info">
                            <div className="order-date"> تاریخ : {order.date} </div>
                            <div className="order-code"> کد سفارش : {order.id} </div>
                            <div className="order-price"> مبلغ : {formatAmount(order.totalPrice)} تومان</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;


