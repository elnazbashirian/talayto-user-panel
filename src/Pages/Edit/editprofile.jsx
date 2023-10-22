import React, {useState, useEffect} from 'react';
import axios from "axios";
import Toast from "../../Toast";
import {ToastContainer} from "react-toastify";

function Editprofile(props) {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        phoneNumber: ''
    });

    useEffect(() => {
        axios
            .get('/userInfo')
            .then((response) => {
                const data = response.data;
                setUserData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    phoneNumber: data.phoneNumber
                });
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const {id, value} = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
        }));
    };
    const handleFormSubmit = () => {
        let data = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age
        }
        axios
            .put('/userInfo', data)
            .then((response) => {
                console.log('Profile edit successful:', response);
                Toast('تغییرات اعمال شد', true);
            })
            .catch((error) => {
                console.log('Error editing profile:', error);
                Toast("تغییرات امکان پذیر نیست", false);
            });
    };

    return (
        <div className='edit-pro-container'>
            <ToastContainer/>
            <div className='edit-pro-header'><h3>ویرایش پروفایل</h3></div>
            <div className='line'></div>
            <div className='edit-pro-body'>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>نام</div>
                        <input
                            type='text'
                            id='firstName'
                            value={userData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='each-input-left'>
                        <div>نام خانوادگی</div>
                        <input
                            type='text'
                            id='lastName'
                            value={userData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>شماره تلفن</div>
                        <input
                            type='text'
                            id='phoneNumber'
                            disabled
                            value={userData.phoneNumber}
                        />
                    </div>
                    <div className='each-input-left'>
                        <div>سن</div>
                        <input
                            type='text'
                            id='age'
                            value={userData.age}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='edit-pro-footer'>
                <button onClick={handleFormSubmit}>ثبت تغییرات</button>
            </div>
        </div>
    );
}

export default Editprofile;