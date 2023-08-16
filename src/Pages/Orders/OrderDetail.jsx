import goldimg from '../Images/goldimg.webp';
import React, {useEffect, useState} from 'react';
import TopNav from '../../Components/TopNav';
import axios from 'axios';

function OrderDetail() {
    const [goldBalance, setGoldBalance] = useState([]);
    const [walletBalance, setWalletBalance] = useState([]);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                setGoldBalance(res.data.goldBalance);
                setWalletBalance(res.data.walletBalance);
            })
            .catch(error => {
                console.log(error);
            });

        const orderId = window.location.pathname.split('/')[2];

        axios.get(`/order/${orderId}`)
            .then(res => {
                setOrder(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const formatAmount = value => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            {order ? (
                <div className='order-detail'>
                    <div className='details'>جزئیات سفارش</div>
                    <div className='line'></div>
                    <div className='order-info'>
                        <div className='order-code'> کد سفارش : {order.id} </div>
                        <div className='order-date'> تاریخ : {order.date} </div>
                    </div>
                    <div className='detail-data'>
                        {/*order.products[0].productDetails.thumbnailImage*/}
                        <img src={goldimg} alt={`Product`} />
                        <div className='image-info'>
                            <div className>نام محصول :{order.products[0].productDetails.title}</div>
                            <div>نوع خرید :{order.type}</div>
                        </div>
                    </div>

                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default OrderDetail;

