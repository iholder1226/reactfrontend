
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Routes/Layout";
import Home from "../Routes/Home";
import StrategyLab from "../Routes/StrategyLab";
import PositionManager from "../Routes/PositionManager";
import RiskManager from "../Routes/RiskManager";
import '../styles/header.css'


 function Header(){
    return(
    
      <BrowserRouter>
      <Routes >
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="StrategyLab" element={<StrategyLab />}  />
          <Route path="PositionManager" element={<PositionManager />} />
          <Route path="RiskManager" element={<RiskManager />} />    
        </Route>
      </Routes>
    </BrowserRouter>

    );
}

export default Header