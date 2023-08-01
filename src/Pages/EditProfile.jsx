import React, {useEffect, useState} from 'react';
import '../Components/Styles/editprofile.css';
import TopNav from "../Components/TopNav";
import {NavLink,Link,Outlet} from "react-router-dom";
import axios from "axios";

function EditProfile(props) {
    const [walletBalance,setWalletBalance] = useState([]);
    const [goldBalance,setGoldBalance] = useState([]);
    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                setWalletBalance(res.data.walletBalance);
                setGoldBalance(res.data.goldBalance);
            })
    }, []);
    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            <div className='edit-container'>
                <div className='edit-items'>
                    <NavLink to='/edit/edit-profile' className='link' activeclassname="active">
                        <div>پروفایل</div>
                    </NavLink>
                    <NavLink to='/edit/edit-address' className='link' activeclassname="active">
                        <div>آدرس</div>
                    </NavLink>
                    <NavLink to='/edit/edit-password' className='link' activeclassname="active">
                        <div>تغییر رمز عبور</div>
                    </NavLink>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default EditProfile;