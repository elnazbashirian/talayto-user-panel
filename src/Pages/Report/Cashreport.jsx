import React, {useEffect, useState} from 'react';
import TopNav from "../../Components/TopNav";
import '../../Components/Styles/goldreport.css';
import axios from "axios";

function Cashreport(props) {
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
            <div className='cash-table'>
                <div className='table-header'>
                    <h4>وضعیت تراکنش های ریالی</h4>
                </div>
                <div className='line'></div>
                <div className='search-table'>
                    <span> جست و جو :</span>
                    <input type='text'/>
                </div>
                <div className='info-table scrollmenu'>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan='1' rowSpan='1'>نام کاربر</th>
                            <th colSpan='1' rowSpan='1'>مبلغ(ریال)</th>
                            <th colSpan='1' rowSpan='1'>شماره پیگیری</th>
                            <th colSpan='1' rowSpan='1'>وضعیت</th>
                            <th colSpan='1' rowSpan='1'>درگاه پرداخت</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan='5'>اطلاعاتی موجود نیست</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='number-table'>
                    <h4>شماره 1 تا 1 از 1</h4>
                </div>
            </div>
        </div>
    );
}

export default Cashreport;