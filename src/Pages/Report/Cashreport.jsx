import React from 'react';
import TopNav from "../../Components/TopNav";
import '../../Components/Styles/goldreport.css';

function Cashreport(props) {
    return (
        <div className='main-container'>
            <TopNav/>
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
                            <td>الناز بشیریان</td>
                            <td>5.000.000 ریال</td>
                            <td></td>
                            <td>ناموفق</td>
                            <td>وندار</td>
                        </tr>
                        <tr>
                            <td>بیتا سعیدی</td>
                            <td>10.000.000 ریال</td>
                            <td></td>
                            <td>موفق</td>
                            <td>تجارت</td>
                        </tr>
                        <tr>
                            <td>بیتا سعیدی</td>
                            <td>10.000.000 ریال</td>
                            <td></td>
                            <td>موفق</td>
                            <td>تجارت</td>
                        </tr>
                        <tr>
                            <td>بیتا سعیدی</td>
                            <td>10.000.000 ریال</td>
                            <td></td>
                            <td>موفق</td>
                            <td>تجارت</td>
                        </tr>
                        <tr>
                            <td>بیتا سعیدی</td>
                            <td>10.000.000 ریال</td>
                            <td></td>
                            <td>موفق</td>
                            <td>تجارت</td>
                        </tr>
                        <tr>
                            <td>بیتا سعیدی</td>
                            <td>10.000.000 ریال</td>
                            <td></td>
                            <td>موفق</td>
                            <td>تجارت</td>
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