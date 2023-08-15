import React, {useState, useEffect} from 'react';
import '../Components/Styles/chargingStyle.css';
import TopNav from "../Components/TopNav";
import {FaPlusCircle} from "react-icons/fa";
import axios from "axios";
import Toast from "../Toast";
import {ToastContainer} from "react-toastify";

function Charging(props) {

    const [amount, setAmount] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [goldBalance, setGoldBalance] = useState([]);


    useEffect(() => {
        axios.get('/userInfo')
            .then((res) => {
                setWalletBalance(res.data.walletBalance);
                setGoldBalance(res.data.goldBalance);
            })
    }, []);


    const formatAmount = (value) => {
        if (!value || isNaN(value) || parseFloat(value) === 0) {
            return "";
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleButtonClick = (value) => {
        const currentAmount = parseFloat(amount) || 0;
        const newValue = currentAmount + parseFloat(value);
        setAmount(newValue.toString());
    }

    const handleChargeClick = () => {
        const data = {
            walletBalance: amount,
        };

        axios.put('/userInfo', data)
            .then((res) => {
                console.log('PUT request successful:', res);
                setWalletBalance(amount);
                Toast('شارژ با موفقیت انجام شد', true)
            })
            .catch((error) => {
                console.error('PUT request error:', error);
                Toast(error.response.message, false);
            });
    };

    return (
        <div className='main-container'>
            <ToastContainer/>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            <div className='charging-cart'>
                <div className='charging-header'>
                    <h3>افزایش اعتبار</h3>
                </div>
                <div className='line'></div>
                <div className='charging-body'>
                    <div>مبلغ</div>
                    <div className='body-input'>
                        <input
                            type='text'
                            value={formatAmount(amount)}
                            onChange={(e) => setAmount(parseFloat(e.target.value.replace(/,/g, "")))}
                        />
                        <button>ریال</button>
                    </div>
                </div>
                <div className='body-buttons'>
                    <button onClick={() => handleButtonClick("20000000")}>20,000,000+</button>
                    <button onClick={() => handleButtonClick("10000000")}>10,000,000+</button>
                    <button onClick={() => handleButtonClick("5000000")}>5,000,000+</button>
                </div>
                <div className='line'></div>
                <div className='charging-button'>
                    <button onClick={handleChargeClick}><FaPlusCircle className='plus-icon'/>شارژ</button>
                </div>
            </div>
        </div>
    );
}

export default Charging;