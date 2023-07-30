import React,{useState,useEffect} from 'react';
import profileimg from '../Images/image-profile.png';
import axios from "axios";

function Editprofile(props) {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        age: 0,
    });

    useEffect(() => {

        axios
            .get('/userInfo')
            .then((response) => {
                const data = response.data;
                setUserData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age
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

        axios
            .put('/userInfo', userData)
            .then((response) => {
                console.log('Profile edit successful:', response);
            })
            .catch((error) => {
                console.log('Error editing profile:', error);
            });
    };

    return (
        <div className='edit-pro-container'>
            <div className='edit-pro-header'><h3>ویرایش پروفایل</h3></div>
            <div className='line'></div>
            <div className='edit-pro-upload'>
                <a href="" className="edit-pro-img">
                    <img src={profileimg} id="account-upload-img"
                         alt="profile image" height="75" width="75"/>
                </a>
                <div>
                    <label htmlFor='upload' className='upload-button'>بارگذاری</label>
                    <input type="file" id="upload" className='hidden' accept="image/*" />
                </div>
            </div>
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
                            onChange={handleInputChange}
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