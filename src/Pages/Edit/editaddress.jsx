import React from 'react';

function Editaddress(props) {
    return (
        <div className='edit-pro-container'>
            <div className='edit-pro-body'>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>استان</div>
                        <input type='password' id='name'/>
                    </div>
                    <div className='each-input-left'>
                        <div>شهر</div>
                        <input type='password' id='username'/>
                    </div>
                </div>
                <div className='edit-input'>
                    <div className='add-input'>
                        <div>آدرس</div>
                        <input type='text'/>
                    </div>
                </div>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>پلاک</div>
                        <input type='tel'/>
                    </div>
                    {/*<div className='form-group small'>*/}
                    {/*    <div>واحد</div>*/}
                    {/*    <input type='tel'/>*/}
                    {/*</div>*/}
                    <div className='each-input-left'>
                        <div>کد پستی</div>
                        <input type='tel'/>
                        <small>کد پستی باید 10 رقم و بدون خط تیره باشد</small>
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='edit-pro-footer'>
                <button>ثبت آدرس</button>
            </div>
        </div>
    );
}

export default Editaddress;