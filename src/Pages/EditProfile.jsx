import React from 'react';
import '../Components/Styles/editprofile.css';
import TopNav from "../Components/TopNav";
import {NavLink,Link,Outlet} from "react-router-dom";
import {FaDollarSign} from "react-icons/fa";

function EditProfile(props) {
    return (
        <div className='main-container'>
            <TopNav/>
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