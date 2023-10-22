import React, {useEffect, useState} from 'react';
import TopNav from "../Components/TopNav";
import '../Components/Styles/badge.css';
import {FaUser} from "react-icons/fa";
import axios from "axios";

function Badge(props) {
    const [walletBalance, setWalletBalance] = useState([]);
    const [goldBalance, setGoldBalance] = useState([]);
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
    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            <div className='badge-container'>
                <div className='badge-header'>تکمیل حساب کاربری<FaUser className='user-icon'/></div>
                <div className='line'></div>
                <div className='badge-body'>
                    <div>لطفا برای استفاده از امکانات سامانه نسبت به تکمیل حساب کاربری خود اقدام نمایید</div>
                    <div>
                        <button className='user-button'>تکمیل اطلاعات حساب کاربری</button>
                    </div>
                    <div className='call-button'>
                        <button>برای تماس با پشتیبانی کلیک کنید</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Badge;