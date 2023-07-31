import React, {useEffect, useState} from 'react';
import TopNav from "../Components/TopNav";
import {FaArrowDown, FaArrowUp, FaCashRegister, FaCoins} from "react-icons/fa";
import axios from "axios";

function SellGold(props) {
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
        axios.get('/userInfo')
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

        axios.get('/goldpriceInfo')
            .then(res => {
                setBuyQuotation(res.data.buyQuotation);
                setSellQuotation(res.data.sellQuotation);
            })
    }, []);

    useEffect(() => {
        axios.get('/configInfo')
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
    };

    const handleSubmit = () => {
        const data = {
            type: selectedOption === "gold" ? "sell-weight" : "sell-price",
            value: selectedOption === "gold" ? +requestedGold : +paymentAmount,
        };
        axios.post('/user/sellGold', data)
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
                setBuySuccess(false); // Update the buySuccess state to false when the request fails
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
                    <div>فروش طلا</div>
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
                        <input type='number' value={paymentAmount} onChange={handlePaymentAmountChange}/>
                    </div>
                    <div className='gold-input'>
                        <div className='check-box'>
                            <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="gold"
                                checked={selectedOption === "gold"} // Check if the selectedOption is "gold"
                                onChange={handleOptionChange} // Update the selectedOption on change
                            />
                            <span>طلای درخواستی(گرم)</span>
                        </div>
                        <input type='number' value={requestedGold} onChange={handleRequestedGoldChange}/>
                    </div>
                    <div className='wage'>کارمزد : 5.000 تومان </div>
                </div>
                <div className='line'></div>
                <div className='below-footer sell-footer'>
                    <button onClick={handleSubmit}>فروش</button>
                    <button>فروش به اندازه کل موجودی</button>
                </div>
            </div>
            {showBubbleMessage && (
                <div className="bubble-message">
                    فروش طلا با موفقیت انجام شد!
                </div>
            )}
        </div>

    );
}

export default SellGold;