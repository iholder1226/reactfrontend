import { Outlet, Link } from "react-router-dom";
import '../styles/header.css'
import { Component } from "react";


class Layout extends Component{
  constructor(props){
    super(props);
    
    
  }
  
  render(){
    /*const styleTest = styled.div
          height:100vh;*/
    return(
      <>
      <div className="MainLayout">
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
        <div >
          <Outlet />
        </div>
      </div>
    { /* <div className={this.state.showControls?"half-page":"page"}>
        <Outlet />
      </div>*/}
    </>
    )
  }
}
/*
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
*/

export default Layout;
