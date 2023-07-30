import React from 'react';
import TopNav from "../Components/TopNav";

function Information(props) {
    return (
        <div className='main-container'>
            <TopNav/>
            <div className='gold-table'>
                <div className='table-header'>
                    <h4>حساب های من</h4>
                </div>
                <div className='info-table min-height'>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan='1' rowSpan='1'>شماره کارت</th>
                            <th colSpan='1' rowSpan='1'>شماره شبا</th>
                            <th colSpan='1' rowSpan='1'>شماره حساب</th>
                            <th colSpan='1' rowSpan='1'>نام بانک</th>
                            <th colSpan='1' rowSpan='1'>ویرایش</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan='5'>هیچ دیتایی در دسترس نیست</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Information;