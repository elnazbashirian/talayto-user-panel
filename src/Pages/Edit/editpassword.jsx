import React from 'react';

function Editpassword(props) {
    return (
        <div className='edit-pro-container'>
            <div className='edit-pro-body'>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>رمز عبور قدیمی</div>
                        <input type='password' id='name'/>
                    </div>
                </div>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>رمز عبور جدید</div>
                        <input type='password' id='name'/>
                    </div>
                    <div className='each-input-left'>
                        <div>تکرار رمز عبور(حداقل 6 کاراکتر)</div>
                        <input type='password' id='username'/>
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='edit-pro-footer'>
                <button>ثبت تغییرات</button>
            </div>
        </div>
    );
}

export default Editpassword;