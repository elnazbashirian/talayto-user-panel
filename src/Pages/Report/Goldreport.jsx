import React, {useState,useEffect} from 'react';
import TopNav from "../../Components/TopNav";
import '../../Components/Styles/goldreport.css';
import axios from "axios";

function Goldreport(props) {
    const [goldTransaction, setGoldTransaction] = useState([]);
    const [walletBalance,setWalletBalance] = useState([]);

    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                setGoldTransaction(res.data.goldTransaction);
                setWalletBalance(res.data.walletBalance);
            })
    }, []);

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)}/>
            <div className='gold-table'>
                <div className='table-header'>
                    <h4>وضعیت تراکنش های طلایی</h4>
                </div>
                <div className='line'></div>
                <div className='search-table'>
                    <span> جست و جو :</span>
                    <input type='text'/>
                </div>
                <div className='info-table min-height scrollmenu'>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan='1' rowSpan='1'>کد پیگیری</th>
                            <th colSpan='1' rowSpan='1'>وزن(گرم)</th>
                            <th colSpan='1' rowSpan='1'>مظنه</th>
                            <th colSpan='1' rowSpan='1'>مبلغ(ریال)</th>
                            <th colSpan='1' rowSpan='1'>وضعیت</th>
                        </tr>
                        </thead>
                        <tbody>
                        {goldTransaction.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.trackingCode}</td>
                                <td>{transaction.weight} گرم</td>
                                <td>{transaction.transactionType}</td>
                                <td>{formatAmount(transaction.price)} ریال</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className='number-table'>
                    <h4>شماره 1 تا 1 از {goldTransaction.length}</h4>
                </div>
            </div>
        </div>
    );
}

export default Goldreport;