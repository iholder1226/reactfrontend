
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import StrategyLab from "./routes/StrategyLab";
import PositionManager from "./routes/PositionManager";
import RiskManager from "./routes/RiskManager";
import './styles/header.css'


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