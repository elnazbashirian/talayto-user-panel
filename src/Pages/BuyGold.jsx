import React, {useState,useEffect} from 'react';
import '../Components/Styles/buyGold.css';
import TopNav from "../Components/TopNav";
import {FaArrowDown, FaArrowUp, FaCashRegister, FaCoins} from "react-icons/fa";
import axios from "axios";

function BuyGold(props) {

    const [paymentAmount, setPaymentAmount] = useState('');
    const [requestedGold, setRequestedGold] = useState('');
    const [selectedOption, setSelectedOption] = useState("price");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [maxGoldWeight, setMaxGoldWeight] = useState('');
    const [buyQuotation,setBuyQuotation] = useState([]);
    const [sellQuotation,setSellQuotation] = useState([]);
    const [goldBalance,setGoldBalance] = useState([]);
    const [walletBalance,setWalletBalance] = useState([]);
    const [buySuccess, setBuySuccess] = useState(false);
    const [showBubbleMessage, setShowBubbleMessage] = useState(false);


    useEffect(() => {
        const config = {
            headers: {
                'access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8",
                'Content-Type': 'application/json'
            }
        };
        axios.get('http://91.107.160.88:3001/v1/userInfo',config)
            .then(res => {
                console.log(res)
                setGoldBalance(res.data.goldBalance);
                setWalletBalance(res.data.walletBalance);
            })
    }, []);

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        const config = {
            headers: {
                'access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8",
                'Content-Type': 'application/json'
            }
        };
        axios.get('http://91.107.160.88:3001/v1/goldpriceInfo',config)
            .then(res => {
                setBuyQuotation(res.data.buyQuotation);
                setSellQuotation(res.data.sellQuotation);
            })
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                'access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8",
                'Content-Type': 'application/json'
            }
        };
        axios.get('http://91.107.160.88:3001/v1/configInfo',config)
            .then(res => {
                setStartTime(res.data.goldPurchaseLimit[0].startAt);
                setEndTime(res.data.goldPurchaseLimit[0].endAt);
                setMaxGoldWeight(res.data.goldPurchaseLimit[0].weightLimit);
            })
    }, []);

    const handlePaymentAmountChange = (event) => {
        setPaymentAmount(event.target.value);
    };

    const handleRequestedGoldChange = (event) => {
        setRequestedGold(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setPaymentAmount('');
        setRequestedGold('');
    };

    const handleSubmit = () => {
        const data = {
            type: selectedOption === "gold" ? "buy-weight" : "buy-price",
            value: selectedOption === "gold" ? +requestedGold : +paymentAmount,
        };

        const config = {
            headers: {
                'access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8",
                'Content-Type': 'application/json'
            }
        };

        axios.post('http://91.107.160.88:3001/v1/user/buyGold', data, config)
            .then((response) => {
                console.log('Response:', response);
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



    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)}/>
            <div className='top-card'>
                <div className='card-body-buy'>
                    <div className='card-box'>
                        <div className='box-icon'><FaArrowUp/></div>
                        <div className='box-info'>
                            <div className='box-text'>مظنه فروش</div>
                            <div className='box-number'> {sellQuotation} ریال</div>
                        </div>
                    </div>
                    <div className='card-box'>
                        <div className='box-icon'><FaArrowDown/></div>
                        <div className='box-info'>
                            <div className='box-text'>مظنه خرید</div>
                            <div className='box-number'> {buyQuotation} ریال</div>
                        </div>
                    </div>
                    <div className='card-box'>
                        <div className='box-icon'><FaCoins/></div>
                        <div className='box-info'>
                            <div className='box-text'>موجودی طلایی</div>
                            <div className='box-number'>{goldBalance} گرم</div>
                        </div>
                    </div>
                    <div className='card-box'>
                        <div className='box-icon'><FaCashRegister/></div>
                        <div className='box-info'>
                            <div className='box-text'>موجودی ریالی</div>
                            <div className='box-number'>{formatAmount(walletBalance)} ریال</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='below-card'>
                <div className='below-header'>
                    <div>خرید طلا</div>
                    <div>حداکثر میزان خرید از ساعت {startTime} تا {endTime} به میزان {maxGoldWeight} گرم میباشد</div>
                </div>
                <div className='line'></div>
                <div className='below-body'>
                    <div className='cash-input'>
                        <div className='check-box'>
                            <input
                                type="radio"
                                id="css"
                                name="fav_language"
                                value="price"
                                checked={selectedOption === "price"}
                                onChange={handleOptionChange}
                            />
                            <span>مبلغ پرداختی(ریال)</span>
                        </div>
                        <input
                            type='text'
                            value={paymentAmount}
                            onChange={handlePaymentAmountChange}
                            disabled={selectedOption === 'gold'}
                        />
                    </div>
                    <div className='gold-input'>
                        <div className='check-box'>
                            <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="gold"
                                checked={selectedOption === "gold"}
                                onChange={handleOptionChange}
                            />
                            <span>طلای درخواستی(گرم)</span>
                        </div>
                        <input
                            type='text'
                            value={requestedGold}
                            onChange={handleRequestedGoldChange}
                            disabled={selectedOption === 'price'}
                        />
                    </div>
                    <div className='wage'>کارمزد : 5.000 تومان</div>
                </div>
                <div className='line'></div>
                <div className='below-footer buy-footer'>
                    <button onClick={handleSubmit}>خرید</button>
                    <button>خرید به اندازه کل موجودی</button>
                </div>
            </div>
            {showBubbleMessage && (
                <div className="bubble-message">
                    خرید طلا با موفقیت انجام شد!
                </div>
            )}
        </div>

    );
}

export default BuyGold;