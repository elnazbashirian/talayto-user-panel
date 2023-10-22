import React, {useEffect, useState} from 'react';
import '../Components/Styles/editprofile.css';
import TopNav from "../Components/TopNav";
import {NavLink, Link, Outlet} from "react-router-dom";
import axios from "axios";

function EditProfile(props) {
    const [walletBalance, setWalletBalance] = useState([]);
    const [goldBalance, setGoldBalance] = useState([]);
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

    const handleLogout = async () => {
        try {
            await axios.post('/user/logout');
            localStorage.removeItem('access-token');
            window.location.href = 'http://www.talayto.com?loggedOut=true';
        } catch (error) {
            console.error('Logout error:', error);
        }
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
            <button className='exit-button' onClick={handleLogout}>خروج از حساب کاربری</button>
        </div>
    );
}

export default EditProfile;