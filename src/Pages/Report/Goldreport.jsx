import React, {useState, useEffect} from 'react';
import TopNav from "../../Components/TopNav";
import '../../Components/Styles/goldreport.css';
import axios from "axios";
import ReactPaginate from 'react-paginate';

function Goldreport(props) {
    const [goldTransaction, setGoldTransaction] = useState([]);
    const [walletBalance, setWalletBalance] = useState([]);
    const [goldBalance, setGoldBalance] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('/userInfo')
            .then(res => {
                setWalletBalance(res.data.walletBalance);
                setGoldBalance(res.data.goldBalance);
            })
    }, []);

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        axios
            .get('/userGoldTransactions?size=100&page=1')
            .then((res) => {
                console.log(res.data[0])
                if (res.data.length > 0) {
                    setGoldTransaction(res.data);
                    const totalPages = res.headers.count;
                    setTotalPages(totalPages);
                } else {
                    setGoldTransaction([]);
                }
            })
    }, []);

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGoldTransaction = goldTransaction.filter((transaction) => {
        return transaction.trackingCode.includes(searchTerm);
    });
    const itemsPerPage = 10;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTransactions = filteredGoldTransaction.slice(startIndex, endIndex);
    return (
        <div className='main-container'>
            <TopNav walletBalance={formatAmount(walletBalance)} goldBalance={formatAmount(goldBalance)}/>
            <div className='gold-table'>
                <div className='table-header'>
                    <h4>وضعیت تراکنش های طلایی</h4>
                </div>
                <div className='line'></div>
                <div className='search-table'>
                    <span> جست و جو :</span>
                    <input type='text' value={searchTerm} onChange={handleSearchChange}/>
                </div>
                <div className='info-table min-height scrollmenu'>
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
                    <h4> شماره {startIndex + 1} تا {Math.min(endIndex, goldTransaction.length)} از {goldTransaction.length}</h4>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(totalPages / 10)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Goldreport;