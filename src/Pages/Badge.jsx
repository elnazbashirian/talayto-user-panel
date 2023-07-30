import React from 'react';
import TopNav from "../Components/TopNav";
import '../Components/Styles/badge.css';
import {FaUser} from "react-icons/fa";
function Badge(props) {
    return (
        <div className='main-container'>
            <TopNav/>
            <div className='badge-container'>
                <div className='badge-header'>تکمیل حساب کاربری<FaUser className='user-icon'/></div>
                <div className='line'></div>
                <div className='badge-body'>
                    <div>لطفا برای استفاده از امکانات سامانه نسبت به تکمیل حساب کاربری خود اقدام نمایید</div>
                    <div><button className='user-button'>تکمیل اطلاعات حساب کاربری</button></div>
                    <div className='call-button'><button>برای تماس با پشتیبانی کلیک کنید</button></div>
                </div>
            </div>
        </div>
    );
}

export default Badge;