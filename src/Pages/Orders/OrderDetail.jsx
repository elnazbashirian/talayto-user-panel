import React, {useEffect, useState} from 'react';
import goldOne from "../Images/gold2.webp";
import goldTwo from "../Images/gold3.jpg";
import TopNav from "../../Components/TopNav";
import axios from "axios";

function OrderDetail() {

    const [goldBalance, setGoldBalance] = useState([]);
    const [walletBalance, setWalletBalance] = useState([]);

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

    const orderId = window.location.pathname.split("/")[2]

    const orders = [ // remove this adn get data from server
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

    let order = orders[orderId-1];

    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            <div className="order-detail">
                <img src={order.image} alt={`Jewelry ${order.id}`}/>
                <div className="order-info">
                    <div className="order-date"> تاریخ : {order.date} </div>
                    <div className="order-code"> کد سفارش : {order.code} </div>
                    <div className="order-price"> مبلغ : {order.price} </div>
                </div>
            </div>
        </div>

    );
}

export default OrderDetail;
