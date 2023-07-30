import React, {useState, useEffect} from 'react';
import '../Components/Styles/chargingStyle.css';
import TopNav from "../Components/TopNav";
import {FaPlusCircle} from "react-icons/fa";
import axios from "axios";

function Charging(props) {
    const [amount, setAmount] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    useEffect(() => {
        fetchWalletBalance();
    }, []);

    const fetchWalletBalance = () => {

        const config = {
            headers: {
                'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8',
                'Content-Type': 'application/json'
            }
        };
        axios.get('http://91.107.160.88:3001/v1/userInfo', config)
            .then((res) => {
                setWalletBalance(res.data.walletBalance);
            })
    };

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleButtonClick = (value) => {
        if (!isNaN(amount) && amount !== "") {
            const newValue = parseInt(amount) + parseInt(value);
            setAmount(newValue.toString());
        } else {
            setAmount(value);
        }
    }

    const handleChargeClick = () => {
        const data = {
            walletBalance: amount,
        };
        const config = {
            headers: {
                'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8',
                'Content-Type': 'application/json'
            }
        };

        axios.put('http://91.107.160.88:3001/v1/userInfo', data, config)
            .then((res) => {
                console.log('PUT request successful:', res);
                setWalletBalance(amount);
            })
            .catch((error) => {
                console.error('PUT request error:', error);
            });
    };

    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)}/>
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
                            onChange={(e) => setAmount(parseInt(e.target.value))}
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