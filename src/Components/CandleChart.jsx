

import React, { Component } from 'react';
import '../styles/chart.css'
import Candle from './Candle'


class CandleChart extends React.Component {
    
    constructor(props){
        super(props);
        
        CandleChart.propTypes = {
            chartHeight:Number,
            chartWidth:Number,
        }
        this.mouseOver = this.mouseOver.bind(this);
        this.keyHandler = this.keyHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.drawIndicator = this.drawIndicator.bind(this);
        
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
                chartWidth:this.props.chartWidth,
                chartHeight:this.props.chartHeight,
            },
            candles:[],
            isLoaded:false,
            selectedCandle:new Candle(), 
            ticker:'SPY',
            interval:'sixty_min',
            alphaUri :"",
            localUri :"",
        }
      
    }   
    fetchAPIData = async(uri)=>{
    
        this.setState({
            candles:new Array()
        })
        
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
            let height = chart.offsetHeight*dpr; 
            let r = high - low;
            
            this.setState({
                    dataRange:{
                        rangeHigh: high,
                        rangeLow : low,
                        range:r
                    },
                    chartDimensions:{
                        chartHeight :this.props.chartHeight,//chart.offsetHeight,
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
    
    resize(){
        alert("Resized");
        let uri = "http://localhost:8081/series/"+t.value+"/intraday/"+i.value;
        this.fetchAPIData(uri);
    }
        
    componentDidMount(){
        let uri = "http://localhost:8081/series/"+this.state.ticker+"/intraday/"+this.state.interval;
        
        this.fetchAPIData(uri);
       // this.drawIndicator();
                    
    }
    drawIndicator(){
        let dpr = window.devicePixelRatio;
        let canvas = document.getElementById('indicator');
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#fffff0";
        
        // Start a new Path
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 150);
        ctx.lineWidth = .1*dpr;
        // Draw the Path
        ctx.stroke();
         //ctx.fill();
    }
    render() {
        
        const set = Object.entries(this.state.candles).map(
            ([key,candle])=>
            
            <Candle  key={key}id={candle.date} o={candle.open} c={candle.close} h={candle.high} l={candle.low} 
            d={candle.date} range={this.state.dataRange.range} rangeHigh={this.state.dataRange.rangeHigh} 
            rangeLow={this.state.dataRange.rangeLow }chartHeight={this.state.chartDimensions.chartHeight}
            chartWidth= {this.state.chartDimensions.chartWidth}
            onMouseOver={this.mouseOver}
            onResize = {this.resize}
            
            ></Candle>
            
        );
        
        return (
        <>   
        <div className="chartController">
            <label>Ticker: </label><input id="tickerInput" type="text" defaultValue="SPY" onKeyDown={this.keyHandler} />
            
            <select id="intervalSelector" name="Interval" onChange={this.selectHandler} required >
                <option disabled  > Select a Time Interval </option>
                <option value="one_min">1 Minute</option>
                <option value="five_min">5 Minutes</option>
                <option value="fifteen_min">15 Minutes</option>
                <option value="sixty_min" selected>1 Hour</option>
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
        
         <div id="candleChart" >
            
            {set}  
        </div>
        
              
        </>   
            
        );
    }
}
export default CandleChart
     
    
   
