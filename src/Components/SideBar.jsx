import React, {useState,useEffect,useRef} from 'react';
import './Style.css';
import {
    FaBars,
    FaHome,
    FaPlusCircle,
    FaDollarSign,
    FaSellcast,
    FaCalendarCheck,
    FaEdit,
    FaInfo,
    FaIdBadge,
    FaHandHoldingUsd,
    FaUserFriends,
    FaPowerOff, FaArrowDown
} from "react-icons/fa";
import {NavLink} from "react-router-dom";

function SideBar({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const [isShown, setIsShown] = useState(false)
    const shown = () => setIsShown(!isShown);
    // const handleClick = event => {
    //     setIsShown(current => !current);
    // };
    let menuRef = useRef();
    useEffect(()=>{
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown',handler);
        return()=>{
            document.removeEventListener('mousedown',handler);
        }
    });
    return (
        <div     onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
            <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar hide" ref={menuRef}>
                <div className="top_section">
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                <NavLink to='/' className='link' activeclassname="active">
                    <div className='icon'><FaHome/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">صفحه اصلی</div>
                </NavLink>
                <NavLink to='/charging' className='link' activeclassname="active">
                    <div className='icon'><FaPlusCircle/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">افزایش موجودی</div>
                </NavLink>
                <NavLink to='/buy' className='link' activeclassname="active">
                    <div className='icon'><FaDollarSign/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">خرید طلا</div>
                </NavLink>
                <NavLink to='/sell' className='link' activeclassname="active">
                    <div className='icon'><FaSellcast/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">فروش طلا</div>
                </NavLink>
                <div className='link' activeclassname="active" onClick={shown}>
                    <div className='icon'><FaCalendarCheck/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">گزارش ها</div>
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
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">ویرایش پروفایل</div>
                </NavLink>
                <NavLink to='/info' className='link' activeclassname="active">
                    <div className='icon'><FaInfo/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">اطلاعات حساب</div>
                </NavLink>
                <NavLink to='/badge' className='link' activeclassname="active">
                    <div className='icon'><FaIdBadge/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">تسویه ریالی</div>
                </NavLink>
                <NavLink to='/reception' className='link' activeclassname="active">
                    <div className='icon'><FaHandHoldingUsd/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">دریافت فیزیکی طلا</div>
                </NavLink>
                <NavLink to='/support' className='link' activeclassname="active">
                    <div className='icon'><FaUserFriends/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">پشتیبانی</div>
                </NavLink>
                <NavLink to='/exit' className='link' activeclassname="active">
                    <div className='icon'><FaPowerOff/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">خروج</div>
                </NavLink>
            </div>
            <main>{children}</main>
        </div>

    );
}

export default SideBar;