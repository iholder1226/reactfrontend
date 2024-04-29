import { Outlet, Link } from "react-router-dom";
import '../styles/header.css'

const Layout = () => {
  return (
    <>
      <nav className = "nav" >
        <ul >
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/StrategyLab">Strategy Lab</Link>
          </li>
          <li>
            <Link to="/PositionManager">Position Manager</Link>
          </li>
          <li>
            <Link to="/RiskManager">Risk Manager</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
