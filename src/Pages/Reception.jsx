import React from 'react';
import TopNav from "../Components/TopNav";
import {FaUser} from "react-icons/fa";

function Reception(props) {
    return (
        <div className='main-container'>
            <TopNav/>
            <div className='badge-container recep-width'>
                <div className='badge-header'>دریافت فیزیکی طلا<FaUser className='user-icon'/></div>
                <div className='line'></div>
                <div className='badge-body'>
                    <div>برای دریافت فیزیکی طلای خود، با شماره زیر تماس گرفته و 24 ساعت بعد به دفتر طلاین مراجعه نمایید.</div>
                    <div className='call-button'><button>برای تماس با پشتیبانی کلیک کنید</button></div>
                    <div className='add-text'>آدرس: یزد - خیابان شهید مطهری - مرکز فناوری اقبال - مرکز رشد ICT - واحد 209 - شرکت طلوع لیان یزد نیک</div>
                </div>
            </div>
        </div>
    );
}

export default Reception;