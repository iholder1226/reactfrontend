
import  '../App.css';
import CandleChart from '../Components/CandleChart'
import StrategyBuilder from '../Components/StrategyBuilder'
import MainComponentLayout from '../Layouts/MainComponentLayout'
import React, { Component } from 'react';

class StrategyLab extends Component {
    constructor(props){
      super(props);
      this.state={
        showControls:false,
        height:300
      }
      this.toggleComponentControls = this.toggleComponentControls.bind(this);
      
    }
    
    toggleComponentControls(){
      let h = this.state.showControls?300:800;
      this.setState({
        showControls:!this.state.showControls,
        height:h,
      });
    }
    render(){
      if(this.state.showControls){
        return (
          <> 
              <div className={this.state.showControls?"half-page":"page"}>
                <CandleChart chartHeight={this.state.height}/>
                
              </div>
              <div className={this.state.showControls?"half-page":"footerTab"}>
                <button onClick={this.toggleComponentControls}>^</button>
                <StrategyBuilder />
              </div>
          
          </>
        );
      }
      else{
        return (
          <> 
              <div className={this.state.showControls?"half-page":"page"}>
                <CandleChart chartHeight={this.state.height}/>
                
              </div>
              <div className={this.state.showControls?"half-page":"footerTab"}>
                <button onClick={this.toggleComponentControls}>^</button>
              </div>
          
          </>
        );
      }
     /* if(this.state.showControls){
        let height = {height:"70vh"};
        let cheight = {height:"40vh"};
        return (
          <>
          <div className="page" style={ cheight}>
          
            <CandleChart />
            
          </div>
          <div className="component-control" style={height}>
            <button onClick={this.toggleComponentControls}>X</button>
          </div>
          </>
        );
      }
      else{
        let height = {height:"5vh"};
        return (
          <>
          <div className="page" >
          
            <CandleChart />
            <div className="component-control" style={height}>
              <button onClick={this.toggleComponentControls}>New Strategy</button>
            </div>
            
          </div>
          </>
        );
      }*/
    }
}
  
  export default StrategyLab;
  