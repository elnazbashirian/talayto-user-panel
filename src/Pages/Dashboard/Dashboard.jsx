import React, {useState, useEffect} from 'react';
import '../../Components/Styles/DashStyle.css';
import {
    FaUser,
    FaPlusCircle,
    FaArrowUp,
    FaArrowDown,
    FaCoins,
    FaCashRegister,
} from "react-icons/fa";
import boxoneimg from '../Images/boxoneimg.png';
import boxtwoimg from '../Images/boxtwoimg.png';
import TopNav from "../../Components/TopNav";
import {CChart} from "@coreui/react-chartjs";
import axios from "axios";
import ReactPaginate from 'react-paginate';


function Dashboard(props) {
    const [datas, setDatas] = useState([]);
    const [buyQuotation,setBuyQuotation] = useState([]);
    const [sellQuotation,setSellQuotation] = useState([]);
    const [goldBalance,setGoldBalance] = useState([]);
    const [walletBalance,setWalletBalance] = useState([]);
    const [goldTransaction, setGoldTransaction] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);



    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                setGoldBalance(res.data.goldBalance);
                setWalletBalance(res.data.walletBalance);
            })
    }, []);


    useEffect(() => {
        axios
            .get(`/userGoldTransactions?size=10&page=1`)
            .then((res) => {
                console.log(res.data[0])
                if (res.data.length > 0) {
                    setGoldTransaction(res.data);
                    setTotalPages(res.headers.count);
                } else {
                    setGoldTransaction([]);
                }
            })
    }, []);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };



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
        axios.get('/goldChart')
            .then(res => {
                const chartsData = res.data;
                setDatas(chartsData);
            })
    }, []);

    var labels = [];
    var data = [];

    datas.map(temp => {
        labels.push(temp._id.month + "/" + temp._id.day)
        data.push(temp.averageField)
    })
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGoldTransaction = goldTransaction.filter((transaction) => {
        return transaction.trackingCode.includes(searchTerm);
    });
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    const currentTransactions = filteredGoldTransaction.slice(startIndex, endIndex);
    return (
        <div className='main-container res-main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            <div className='card-container'>
                <div className='left-card'>
                    <div className='card-header'>
                        <h4 className='header-title'>Updated 2 days ago</h4>
                        <h4>معاملات حداکثر از ساعت 12:30 باز میشود</h4>
                    </div>
                    <div className='card-body'>
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
                <div className='left-card-responsive'>
                    <div className='card-header'>
                        <h4>معاملات حداکثر از ساعت 12:30 باز میشود</h4>
                    </div>
                    <div className='card-body'>
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
                    </div>
                </div>
                <div className='right-card'>
                    <div className='box-one'>
                        <div>موجودی ریالی</div>
                        <div>{formatAmount(walletBalance)} ریال </div>
                        <img src={boxoneimg}/>
                    </div>
                    <div className='box-two'>
                        <div>موجودی طلایی</div>
                        <div>{formatAmount(goldBalance)} گرم </div>
                        <img src={boxtwoimg}/>
                        {/*<div><FaChartBar className='chart-line-icon'/></div>*/}
                    </div>
                </div>
            </div>

            <div className='chart-card'>
                <CChart
                    type="line"
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "My First dataset",
                                backgroundColor: "#fff",
                                borderColor: "#917c2a",
                                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                pointBorderColor: "#fff",
                                data: data,
                            }
                            // ,
                            // {
                            //     label: "My Second dataset",
                            //     backgroundColor: "rgba(151, 187, 205, 0.2)",
                            //     borderColor: "rgba(151, 187, 205, 1)",
                            //     pointBackgroundColor: "rgba(151, 187, 205, 1)",
                            //     pointBorderColor: "#fff",
                            //     data: [50, 12, 28, 29, 7, 25, 12]
                            // },
                        ],
                    }}
                />
            </div>

            <div className='table-container'>
                <div className='left-table'>
                    <div className='table-header'>
                        <h4>وضعیت تراکنش های ریالی</h4>
                    </div>
                    <div className='line'></div>
                    <div className='search-table'>
                        <span> جست و جو :</span>
                        <input type='text'/>
                    </div>
                    <div className='info-table scrollmenu'>
                        <table>
                            <thead>
                            <tr>
                                <th colSpan='1' rowSpan='1'>نام کاربر</th>
                                <th colSpan='1' rowSpan='1'>مبلغ(ریال)</th>
                                <th colSpan='1' rowSpan='1'>شماره پیگیری</th>
                                <th colSpan='1' rowSpan='1'>وضعیت</th>
                                <th colSpan='1' rowSpan='1'>درگاه پرداخت</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>الناز بشیریان</td>
                                <td>5.000.000 ریال</td>
                                <td></td>
                                <td>ناموفق</td>
                                <td>وندار</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='number-table'>
                        <h4>شماره 1 تا 1 از 1</h4>
                    </div>
                </div>
                <div className='right-table'>
                    <div className='table-header'>
                        <h4>وضعیت تراکنش های طلایی</h4>
                    </div>
                    <div className='line'></div>
                    <div className='search-table'>
                        <span> جست و جو :</span>
                        <input type='text' value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <div className='info-table scrollmenu'>
                        <table>
                            <thead>
                            <tr>
                                <th colSpan='1' rowSpan='1'>تاریخ</th>
                                <th colSpan='1' rowSpan='1'>کد پیگیری</th>
                                <th colSpan='1' rowSpan='1'>وزن(گرم)</th>
                                <th colSpan='1' rowSpan='1'>نوع تراکنش</th>
                                <th colSpan='1' rowSpan='1'>مبلغ(ریال)</th>
                                <th colSpan='1' rowSpan='1'>وضعیت</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentTransactions.length > 0 ? (
                                currentTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.trackingCode}</td>
                                        <td>{formatAmount(transaction.weight)} گرم</td>
                                        <td>{transaction.transactionType}</td>
                                        <td>{formatAmount(transaction.price)} ریال</td>
                                        <td>{transaction.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='5'>اطلاعاتی موجود نیست</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className='number-table'>
                        <h4>  شماره {startIndex + 1} تا {Math.min(endIndex, goldTransaction.length)} از {goldTransaction.length}</h4>
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={totalPages/10}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>

                </div>
            </div>

        </div>

    );
}

export default Dashboard;