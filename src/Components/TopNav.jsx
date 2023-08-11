import React, {useEffect, useRef, useState} from 'react';
import './Styles/DashStyle.css';
import {
    FaUser,
    FaPlusCircle,
    FaArrowUp,
    FaBars,
    FaCalendarCheck,
    FaHome,
    FaDollarSign,
    FaSellcast,
    FaEdit,
    FaInfo,
    FaIdBadge,
    FaHandHoldingUsd, FaPowerOff, FaShoppingBag,
} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import SideBar from "./SideBar";
import axios from "axios";

function TopNav({goldBalance, walletBalance, children}) {
    const [isShown, setIsShown] = useState(true);

    const shown = () => {
        setIsShown(!isShown);
        console.log(isShown)
    }
    const [iscurrent, setIsCurrent] = useState(true);
    const sideshow = () => {
        setIsCurrent(!iscurrent);
    }
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    let menuRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    return (
        <>
            <div className='top-nav'>
                <div className='top-nav-left'>
                    <NavLink className='user-icon-wrapper active-top' to='/edit/edit-profile'> <FaUser
                        className='user-icon'/></NavLink>
                    <div className='stocks'>
                        <div className='gold-stock'>{goldBalance}
                        </div>
                        <div className='bag-stock'>{walletBalance}</div>
                    </div>
                </div>
                <div className='top-nav-right'>
                    <NavLink to='/charging' className='active-top'>
                        <button className='plus-button'>افزایش موجودی<FaPlusCircle className='plus-icon'/></button>
                    </NavLink>
                    <NavLink to='/charging' className='active-top'>
                        <FaPlusCircle className='plus-icon-res'/>
                    </NavLink>
                    <FaBars className='icon-bar' onClick={toggle}/>
                </div>
            </div>
            <div className='sidebar-container'>
                <div style={{display: isOpen ? "block" : "none"}} className="sidebar hide" ref={menuRef}>
                    <NavLink to='/' className='link' activeclassname="active">
                        <div className='icon'><FaHome/></div>
                        <div className="link_text">صفحه اصلی</div>
                    </NavLink>
                    <NavLink to='/charging' className='link' activeclassname="active">
                        <div className='icon'><FaPlusCircle/></div>
                        <div className="link_text">افزایش موجودی</div>
                    </NavLink>
                    <NavLink to='/buy' className='link' activeclassname="active">
                        <div className='icon'><FaDollarSign/></div>
                        <div className="link_text">خرید طلا</div>
                    </NavLink>
                    <NavLink to='/sell' className='link' activeclassname="active">
                        <div className='icon'><FaSellcast/></div>
                        <div className="link_text">فروش طلا</div>
                    </NavLink>
                    <div className='link' activeclassname="active" onClick={shown}>
                        <div className='icon'><FaCalendarCheck/></div>
                        <div className="link_text">گزارش ها</div>
                    </div>
                    {isShown && (
                        <div className='report-items' style={{display: isOpen ? "block" : "none"}}>
                            <NavLink to='/gold-report' className='report-link' activeclassname="report-active">
                                <div>طلایی</div>
                            </NavLink>
                            <NavLink to='/cash-report' className='report-link' activeclassname="report-active">
                                <div>ریالی</div>
                            </NavLink>
                        </div>
                    )}
                    <NavLink to='/edit' className='link' activeclassname="active">
                        <div className='icon'><FaEdit/></div>
                        <div className="link_text">ویرایش پروفایل</div>
                    </NavLink>
                    <NavLink to='/info' className='link' activeclassname="active">
                        <div className='icon'><FaInfo/></div>
                        <div className="link_text">اطلاعات حساب</div>
                    </NavLink>
                    <NavLink to='/badge' className='link' activeclassname="active">
                        <div className='icon'><FaIdBadge/></div>
                        <div className="link_text">تسویه ریالی</div>
                    </NavLink>
                    <NavLink to='/reception' className='link' activeclassname="active">
                        <div className='icon'><FaHandHoldingUsd/></div>
                        <div className="link_text">دریافت فیزیکی طلا</div>
                    </NavLink>
                    <NavLink to='/order' className='link' activeclassname="active">
                        <div className='icon'><FaShoppingBag/></div>
                        <div className="link_text">سفارشات من</div>
                    </NavLink>
                    <NavLink to='/exit' className='link' activeclassname="active">
                        <div className='icon'><FaPowerOff/></div>
                        <div className="link_text">خروج</div>
                    </NavLink>
                    {/*{*/}
                    {/*     menuItem.map((item, index) => (*/}
                    {/*<NavLink to={item.path} key={index} className="link" activeclassname="active">*/}
                    {/*    <div className="icon">{item.icon}</div>*/}
                    {/*    <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>*/}
                    {/*</NavLink>*/}
                    {/*))*/}
                    {/*}*/}
                </div>
                <main>{children}</main>
            </div>
        </>
    );
}

export default TopNav;