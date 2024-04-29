

import React, { Component } from 'react';
import './styles/chart.css'
import Candle from './Candle'


class CandleChart extends React.Component {
    Candle={
        open:Number,
        close:Number,
        high:Number,
        low:Number,
        date:String
    }
        
    constructor(props){
        super(props);
        
        this.mouseOver = this.mouseOver.bind(this);
        this.keyHandler = this.keyHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
        
        this.state = {
            dataBounds : {
                maxHigh:1,
                minLow:1000000,   
            },
            dataRange: {
                rangeHigh:0,
                rangeLow:0,
                range:0
            },
            chartDimensions : {
                chartWidth:0,
                chartHeight:0
            },
            candles:[],
            isLoaded:false,
            selectedCandle:new Candle(), 
            ticker:'SPY',
            interval:'sixty_min',
            alphaUri :"",
            localUri :""

        }
        
    }   
    fetchAPIData = async(uri)=>{
    
        this.setState({
            candles:new Array()
        })
        const apiKey = 'XX60MG2JNYQVMHA0'//'WVA5ZM7YMCV47S5P'
        const responseAvailable = false;
        let candleSet =[];
        let alphaResponse = []
        let high = 1;
        let low = 100000000;
        
            
        console.log("fetch uri:"+uri);     
        fetch(uri, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => { 
            if(response.ok){
                candleSet = new Array();
                return response.json()    
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(data => {
        
            
            //alphaResponse = data["Time Series (60min)"]; 
            //console.log("Data:"+ alphaResponse);
            //const map = new Map(Object.entries(alphaResponse));
            const map = new Map(Object.entries(data));
            for (let [key, value] of map) {
                let candle = {
                    "open":parseFloat(value["open"]),
                    "close":parseFloat(value["close"]),
                    "high":parseFloat(value["high"]),
                    "low":parseFloat(value["low"]),
                    "volume":parseFloat(value["volume"]),
                    "date":value["date"]
                } 
                if(candle.high>high){
                        high = candle.high;
                }if(candle.low<low){
                    low = candle.low;
                } 
                candleSet.push(candle);            
            }
            let chart = document.getElementById('candleChart');
            let dpr = window.devicePixelRatio;
            let width = chart.offsetWidth*dpr;
            let height = chart.offsetHeight; 
            let r = high - low;
            
            this.setState({
                    dataRange:{
                        rangeHigh: high,
                        rangeLow : low,
                        range:r
                    },
                    chartDimensions:{
                        chartHeight :chart.offsetHeight,
                        chartWidth:chart.offsetWidth
                    },
                    
                    candles:candleSet,
                    isLoaded:true      
            })
            
        })
        .catch(err => {
            console.log(err);
        });                        
    }

    keyHandler(event){
        
        if(event.key === "Enter"){
            let t = document.getElementById('tickerInput');
            let i = document.getElementById('intervalSelector');
            this.setState({
                ticker: t.value ,
                interval: i.value,
            } );
            let uri = "http://localhost:8081/series/"+t.value+"/intraday/"+i.value;
            this.fetchAPIData(uri);
        }        
    }

    selectHandler(e){
        let t = document.getElementById('tickerInput');
        let i = document.getElementById('intervalSelector');
        this.setState({
            ticker: t.value ,
            interval: e.target.value
        } );
        let uri = "http://localhost:8081/series/"+t.value+"/intraday/"+i.value;
        this.fetchAPIData(uri);
    } 

    mouseOver = (o,c,h,l,v,d) => {
            this.setState({
                selectedCandle:{
                    o: o,
                    c: c,
                    h: h,
                    l: l,
                    v:v,
                    d:d
            } 
        })
    }
    
        
    componentDidMount(){
        let uri = "http://localhost:8081/series/"+this.state.ticker+"/intraday/"+this.state.interval;
        
        this.fetchAPIData(uri);
                    
    }
        
    render() {
            
        const set = Object.entries(this.state.candles).map(
            ([key,candle])=>
            
            <Candle  key={key}id={candle.date} o={candle.open} c={candle.close} h={candle.high} l={candle.low} 
            d={candle.date} range={this.state.dataRange.range} rangeHigh={this.state.dataRange.rangeHigh} 
            rangeLow={this.state.dataRange.rangeLow }chartHeight={this.state.chartDimensions.chartHeight}
            onMouseOver={this.mouseOver}
            ></Candle>
            
        );
        
        return (
        <>   
        <div className="chartController">
            <label>Ticker: </label><input id="tickerInput" type="text" defaultValue="SPY" onKeyDown={this.keyHandler} />
            
            <select id="intervalSelector" name="Interval" onChange={this.selectHandler} required >
                <option disabled  defaultValue=""> Select a Time Interval </option>
                <option value="one_min">1 Minute</option>
                <option value="five_min">5 Minutes</option>
                <option value="fifteen_min">15 Minutes</option>
                <option value="sixty_min">1 Hour</option>
                <option value="4h">4 Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <ul>
                <li>O: {this.state.selectedCandle.o}</li>
                <li>C: {this.state.selectedCandle.c}</li>
                <li>H: {this.state.selectedCandle.h}</li>
                <li>L: {this.state.selectedCandle.l}</li>
                <li>V: {this.state.selectedCandle.v}</li>
                <li>D: {this.state.selectedCandle.d}</li>
            </ul>
        
        </div>
         <div id="candleChart">
           {set}    

        </div>
              
        </>   
            
        );
    }
}
export default CandleChart
      /*<Candle id={1}o={2}h={9}l={1}c={5}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>
      <Candle id={14}o={5}h={10}l={1}c={4}d={"12"}range={9}rangeHigh={5}rangeLow={1}></Candle>
                <Candle id={15}o={5}h={9}l={1}c={7}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={16}o={3}h={8}l={1}c={7}d={"7"}range={9}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={17}o={7}h={10}l={1}c={7}d={"12"}range={9}rangeHigh={5}rangeLow={1}></Candle>
                <Candle id={18}o={6}h={9}l={1}c={7}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={19}o={2}h={10}l={1}c={7}d={"12"}range={9}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={20}o={5}h={10}l={1}c={7}d={"12"}range={9}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={21}o={2}h={9}l={1}c={5}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>
                <Candle id={22}o={5}h={9}l={1}c={7}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={23}o={5}h={12}l={1}c={7}d={"12"}range={9}rangeHigh={11}rangeLow={1}></Candle>  
                <Candle id={24}o={5}h={10}l={1}c={4}d={"12"}range={9}rangeHigh={5}rangeLow={1}></Candle>
                <Candle id={25}o={5}h={9}l={1}c={7}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={26}o={3}h={8}l={1}c={7}d={"7"}range={9}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={27}o={7}h={10}l={1}c={7}d={"12"}range={9}rangeHigh={5}rangeLow={1}></Candle>
                <Candle id={82}o={6}h={9}l={1}c={7}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>  
                <Candle id={29}o={2}h={10}l={1}c={7}d={"12"}range={9}rangeHigh={5}rangeLow={1}></Candle>   */
//<Candle id={1}o={2}h={9}l={1}c={5}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>
//<Candle id={2}o={5}h={9}l={1}c={7}d={"12312"}range={8}rangeHigh={5}rangeLow={1}></Candle>
      //const domContainer = document.querySelector('#chart');
     // ReactDOM.render(React.createElement(ApexChart), domContainer);
    
   