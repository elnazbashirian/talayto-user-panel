import React, {useEffect, useState} from 'react';
import {FaArrowDown, FaArrowUp, FaCashRegister, FaCoins} from "react-icons/fa";
import axios from "axios";
import Toast from "../Toast";
import {ToastContainer} from "react-toastify";
import TopNav from "../Components/TopNav";

function SellGold(props) {
    const [goldInput, setGoldInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [calculatedResult, setCalculatedResult] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [requestedGold, setRequestedGold] = useState('');
    const [selectedOption, setSelectedOption] = useState("price");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [maxGoldWeight, setMaxGoldWeight] = useState('');
    const [buyQuotation, setBuyQuotation] = useState([]);
    const [sellQuotation, setSellQuotation] = useState([]);
    const [goldBalance, setGoldBalance] = useState([]);
    const [walletBalance, setWalletBalance] = useState([]);

    const calculateGoldAndPrice = (type, value) => {
        axios.post('/user/computing', {
            type,
            value,
        })
            .then((response) => {
                setCalculatedResult(response.data.result.toFixed(3));
                if (type === 'sell-price') {
                    setGoldInput(response.data.result.toFixed(3));
                } else if (type === 'sell-weight') {
                    setPriceInput(formatAmount(response.data.result * 1185600000));
                }
            })
    };

    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                console.log(res)
                setGoldBalance(res.data.goldBalance);
                setWalletBalance(res.data.walletBalance);
            })
    }, []);

    const formatAmount = (value) => {
        if (!value || isNaN(value) || parseFloat(value) === 0) {
            return "";
        }
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

    const handleRequestedGoldChange = (event) => {
        const newGoldInput = event.target.value;
        setGoldInput(newGoldInput);
        const calculatedPrice = parseFloat(newGoldInput) * 23724000;
        setPriceInput(formatAmount(calculatedPrice));
        setCalculatedResult(newGoldInput);
    };

    const handlePaymentAmountChange = (event) => {
        const newPriceInput = event.target.value;
        setPriceInput(newPriceInput);
        const calculatedGold = parseFloat(newPriceInput) / 23724000;
        setGoldInput(calculatedGold.toFixed(3));
        setCalculatedResult(newPriceInput);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setPaymentAmount('');
        setRequestedGold('');
    };

    const handleSellMaxBalance = () => {
        // Set the gold input to the gold balance
        setGoldInput(goldBalance);

        // Calculate the money based on the gold balance and update the price input
        const priceToReceive = goldBalance * sellQuotation;
        setPriceInput(formatAmount(priceToReceive));

        // Update the calculated result
        setCalculatedResult(goldBalance);

        // Update the gold balance to 0 and add the money to the wallet balance
        setGoldBalance(0);
        setWalletBalance((prevWalletBalance) => prevWalletBalance + priceToReceive);
    };


    const handleSubmit = () => {
        const data = {
            type: selectedOption === "gold" ? "sell-weight" : "sell-price",
            value: selectedOption === 'gold' ? parseFloat(goldInput) : parseFloat(priceInput.toString().replaceAll(',','')),
        };
        console.log(data)
        axios.post('/user/sellGold', data)
            .then((response) => {
                console.log('Response:', response);
                Toast('فروش با موفقیت انجام شد', true)
            })
            .catch((error) => {
                console.log('Error:', error);
                Toast(error.response.data.message, false);
            });
    };


    return (
        <div className='main-container'>
            <ToastContainer/>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            <div className='top-card'>
                <div className='card-body-buy'>
                    <div className='card-box'>
                        <div className='box-icon'><FaArrowUp/></div>
                        <div className='box-info'>
                            <div className='box-text'>مظنه فروش</div>
                            <div className='box-number'> {formatAmount(sellQuotation)} ریال</div>
                        </div>
                    </div>
                    <div className='card-box'>
                        <div className='box-icon'><FaArrowDown/></div>
                        <div className='box-info'>
                            <div className='box-text'>مظنه خرید</div>
                            <div className='box-number'> {formatAmount(buyQuotation)} ریال</div>
                        </div>

                    </div>
                    <div className='card-box'>
                        <div className='box-icon'><FaCoins/></div>
                        <div className='box-info'>
                            <div className='box-text'>موجودی طلایی</div>
                            <div className='box-number'>{formatAmount(goldBalance)} گرم</div>
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
                        <input
                            type='text'
                            value={priceInput}
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
                            value={goldInput}
                            onChange={handleRequestedGoldChange}
                            disabled={selectedOption === 'price'}
                        />
                    </div>
                    <div className='wage'>کارمزد : 5.000 تومان</div>
                </div>
                <div className='line'></div>
                <div className='below-footer sell-footer'>
                    <button onClick={handleSubmit}>فروش</button>
                    <button onClick={handleSellMaxBalance}>فروش به اندازه کل موجودی</button>
                </div>
            </div>
        </div>

    );
}

export default SellGold;