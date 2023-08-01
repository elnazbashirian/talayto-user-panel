import React, {useState} from 'react';
import axios from "axios";
import { FaEye,FaEyeDropper } from 'react-icons/fa';

function Editpassword(props) {
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [buySuccess, setBuySuccess] = useState(false);
    const [showBubbleMessage, setShowBubbleMessage] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }   ;

    const handleSendCode = () => {
        const data = {
            phoneNumber: phoneNumber,
        };
        axios.post('/user/forgetpassword', data).then((response) => {
            console.log(response.data)
        })
    };

    const handleSubmitChanges = () => {
        if (newPassword !== repeatPassword) {
            alert('رمز عبور و تکرار رمز عبور یکسان نیست');
            return;
        }
        const data = {
            phoneNumber: phoneNumber,
            code: verificationCode,
            password: newPassword,
        };

        axios
            .post('/user/forgetPasswordVerification', data)
            .then((response) => {
                localStorage.setItem("access-token", response.data.accessToken)
                localStorage.setItem("refresh-token", response.data.refreshToken)
                setBuySuccess(true);
                setShowBubbleMessage(true);
                setTimeout(() => {
                    setShowBubbleMessage(false);
                }, 3000);
            })
            .catch((error) => {
                console.log('Error:', error);
                setBuySuccess(false);
            });
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1((prevShowPassword1) => !prevShowPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2((prevShowPassword2) => !prevShowPassword2);
    };
    return (
        <div className='edit-pro-container'>
            <div className='edit-pro-body'>
                <div className='each-input-right' style={{display: 'flex', alignItems: 'center'}}>
                    <div>
                        <div>شماره تلفن</div>
                        <input type='text' id='phoneNumber' value={phoneNumber} onChange={handlePhoneNumberChange}/>
                    </div>
                    <button
                        className='code-button'
                        style={{marginRight: '30px', marginTop: '30px', padding: '10px 1.8em'}}
                        onClick={handleSendCode}
                    >
                        ارسال کد
                    </button>
                </div>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>
                            <div style={{marginRight: '10px'}}> کد دریافتی</div>
                            <input type='text' id='code' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='edit-input'>
                    <div className='each-input-right'>
                        <div>رمز عبور جدید</div>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword1  ? 'text' : 'password'} // Toggle between text and password type
                                id='password'
                                onChange={(e) => setNewPassword(e.target.value)}
                                pattern="/^[a-zA-Z0-9]{8,16}$/"
                            />
                            {showPassword1 ? (
                                <FaEye style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} onClick={togglePasswordVisibility1} />
                            ) : (
                                <FaEye style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} onClick={togglePasswordVisibility1} />
                            )}
                        </div>
                    </div>
                    <div className='each-input-left'>
                        <div>تکرار رمز عبور(حداقل 6 کاراکتر)</div>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                id='repeatPassword'
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            {showPassword2 ? (
                                <FaEye style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} onClick={togglePasswordVisibility2} />
                            ) : (
                                <FaEye style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} onClick={togglePasswordVisibility2} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='edit-pro-footer'>
                <button onClick={handleSubmitChanges}>ثبت تغییرات</button>
            </div>
            {showBubbleMessage && (
                <div className="bubble-message">
                    رمز عبور با موفقیت تغییر یافت
                </div>
            )}
        </div>
    );
}

export default Editpassword;