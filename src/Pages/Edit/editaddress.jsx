import React, {useEffect, useState} from 'react';
import axios from "axios";
import Toast from "../../Toast";
import {ToastContainer} from "react-toastify";

function Editaddress(props) {
    const [userData, setUserData] = useState({
        province: '',
        city: '',
        address: '',
        postalCode:'',
        plaque:''
    });

    useEffect(() => {
        axios
            .get('/userInfo')
            .then((response) => {
                const data = response.data;
                setUserData({
                    province: data.addresses[0].province,
                    city: data.addresses[0].city,
                    address: data.addresses[0].address,
                    postalCode: data.addresses[0].postalCode,
                    plaque: data.addresses[0].plaque
                });
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
        }));
    };
    const handleFormSubmit = () => {
        let data={
            addresses:[{
                province: userData.province,
                city: userData.city,
                address: userData.address,
                postalCode: userData.postalCode,
                plaque: userData.plaque
            }]

        }
        axios
            .put('/userInfo', data)
            .then((response) => {
                console.log('Profile edit successful:', response);
                Toast('تغییرات اعمال شد',true);
            })
            .catch((error) => {
                console.log('Error editing profile:', error);
                Toast("تغییرات امکان پذیر نیست",false);
            });
    };
    return (
        <div className='edit-pro-container'>
            <ToastContainer/>
            <div className='edit-pro-body'>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>استان</div>
                        <input
                            type='text'
                            id='province'
                            value={userData.province}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='each-input-left'>
                        <div>شهر</div>
                        <input
                            type='text'
                            id='city'
                            value={userData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='edit-input'>
                    <div className='add-input'>
                        <div>آدرس</div>
                        <input
                            type='text'
                            id='address'
                            value={userData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>پلاک</div>
                        <input
                            type='text'
                            id='plaque'
                            value={userData.plaque}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/*<div className='form-group small'>*/}
                    {/*    <div>واحد</div>*/}
                    {/*    <input type='tel'/>*/}
                    {/*</div>*/}
                    <div className='each-input-left'>
                        <div>کد پستی</div>
                        <input
                            type='text'
                            id='postalCode'
                            value={userData.postalCode}
                            onChange={handleInputChange}
                        />
                        <small>کد پستی باید 10 رقم و بدون خط تیره باشد</small>
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='edit-pro-footer'>
                <button onClick={handleFormSubmit}>ثبت آدرس</button>
            </div>
        </div>
    );
}

export default Editaddress;