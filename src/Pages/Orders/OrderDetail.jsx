// import React, {useEffect, useState} from 'react';
// import goldOne from "../Images/gold2.webp";
// import goldTwo from "../Images/gold3.jpg";
// import TopNav from "../../Components/TopNav";
// import axios from "axios";
//
// function OrderDetail() {
//     const [goldBalance, setGoldBalance] = useState([]);
//     const [walletBalance, setWalletBalance] = useState([]);
//
//     useEffect(() => {
//         axios.get('/userInfo')
//             .then(res => {
//                 setGoldBalance(res.data.goldBalance);
//                 setWalletBalance(res.data.walletBalance);
//             })
//     }, []);
//
//     const formatAmount = (value) => {
//         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     };
//
//     const orderId = window.location.pathname.split("/")[2]
//
//     const orders = [ // remove this and get data from server
//         {
//             id: 1,
//             image: goldOne,
//             date: '7 شهریور 1401',
//             code: '27897654',
//             price: '99,600 تومان'
//         },
//         {
//             id: 2,
//             image: goldTwo,
//             date: '28 خرداد 1401',
//             code: '45672829',
//             price: '256,160 تومان'
//         }
//     ];
//
//     let order = orders[orderId - 1];
//
//     return (
//         <div className='main-container'>
//             <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
//             <div className="order-detail">
//                 <div className='details'>جزئیات سفارش</div>
//                 <div className='line'></div>
//                 <div className='order-info'>
//                     <div className='order-code'> کد سفارش : {order.code} </div>
//                     <div className="order-date"> تاریخ : {order.date} </div>
//                 </div>
//                 <div>
//                     <div className='costumer-info'>
//                         <div>تحویل گیرنده : الناز بشیریان</div>
//                         <div>شماره موبایل : 09307981717</div>
//                     </div>
//                     <div className='address-info'>آدرس : سنندج، شهرک بهاران فاز ۲/۱۷ بلوار زکریا رازی پارک علم و فناوری
//                         سنندج
//                     </div>
//                 </div>
//                 <div className='detail-info'>
//                     <div className='order-date'>زمان تحویل :{order.date}</div>
//                     <div className='price-info'>
//                         <div>هزینه ارسال : 40,000</div>
//                         <div>مبلغ مرسوله : 29,800</div>
//                     </div>
//                 </div>
//                 <div className='line'></div>
//                 <div>
//                     <img src={order.image} alt={`Jewelry ${order.id}`}/>
//                 </div>
//             </div>
//         </div>
//
//     );
// }
//
// export default OrderDetail;
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
                    <div>
                        <img src={order.products[0].productDetails.thumbnailImage} alt={`Product`} />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default OrderDetail;

