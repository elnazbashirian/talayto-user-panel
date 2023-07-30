import React, {useState,useEffect} from 'react';
import TopNav from "../../Components/TopNav";
import '../../Components/Styles/goldreport.css';
import axios from "axios";

function Goldreport(props) {
    const [goldTransaction, setGoldTransaction] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8",
                'Content-Type': 'application/json'
            }
        };
        axios.get('http://91.107.160.88:3001/v1/userInfo',config)
            .then(res => {
                setGoldTransaction(res.data.goldTransaction)
            })
    }, []);

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className='main-container'>
            <TopNav/>
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