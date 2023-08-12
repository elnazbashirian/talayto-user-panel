import './App.css';
import "./Axios";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Sidebar from './Components/SideBar';
import Dashboard from "./Pages/Dashboard/Dashboard";
import Charging from "./Pages/Charging";
import BuyGold from "./Pages/BuyGold";
import SellGold from "./Pages/SellGold";
import EditProfile from "./Pages/EditProfile";
import Information from "./Pages/Information";
import Badge from "./Pages/Badge";
import Reception from "./Pages/Reception";
import Orders from "./Pages/Orders";
import Goldreport from "./Pages/Report/Goldreport";
import Cashreport from "./Pages/Report/Cashreport";
import Editprofile from "./Pages/Edit/editprofile";
import Editaddress from "./Pages/Edit/editaddress";
import Editpassword from "./Pages/Edit/editpassword";
import OrderDetail from "./Pages/Orders/OrderDetail";
import Exit from "./Pages/Exit";
import './fonts/Estedad-Bold.woff2';
import './fonts/Estedad-Light.woff2';
import './fonts/Estedad-Medium.woff2';
import './fonts/Estedad-Thin.woff2';
import './fonts/Estedad-Regular.woff2';

function App() {
    return (

        <BrowserRouter>
            <div className='wrapper'>
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/charging' element={<Charging/>}/>
                    <Route path='/buy' element={<BuyGold/>}/>
                    <Route path='/sell' element={<SellGold/>}/>
                    <Route path='gold-report' element={<Goldreport/>}/>
                    <Route path='cash-report' element={<Cashreport/>}/>
                    <Route path='/edit' element={<EditProfile/>}>
                        <Route index element={<Navigate to='edit-profile' replace/>}/>
                        <Route path="edit-profile" element={<Editprofile/>}/>
                        <Route path="edit-address" element={<Editaddress/>}/>
                        <Route path="edit-password" element={<Editpassword/>}/>
                    </Route>
                    <Route path='/info' element={<Information/>}/>
                    <Route path='/badge' element={<Badge/>}/>
                    <Route path='/reception' element={<Reception/>}/>
                    <Route path='/order' element={<Orders/>}/>
                    <Route path="/order/:id" element={<OrderDetail/>}/>
                    <Route path='/exit' element={<Exit/>}/>
                </Routes>
            </div>
            <Sidebar/>
        </BrowserRouter>

    );
}

export default App;
