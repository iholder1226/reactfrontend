import React, { Component } from 'react';
import '../styles/candle.css'
    
    
class Candle extends React.Component{
        
    constructor(props){
            
        super(props);
        Candle.propTypes = {
            id:Number,
            o:Number,
            c:Number,
            h:Number,
            l:Number,
            d:Number,
            rangeLow:Number,
            rangeHigh:Number,
            range:Number,
            chartHeight:Number,
            onMouseOver:()=>{},  
        }
        this.state = {
            
                chartWidth:0,
                chartHeight:0,
            
        }
    }
        
    componentDidMount(){
        this.setState({
            chartWidth:this.props.chartWidth,
            chartHeight:this.props.chartHeight,
        })
        let dpr = window.devicePixelRatio;
        let canvas = document.getElementById(this.props.id);
        let ctx = canvas.getContext("2d");
        let chartPadding = 50;
        
        //let chartHeight =(canvas.offsetHeight)*dpr;
        let chartHeight =(this.props.chartHeight)*dpr;
        canvas.setAttribute('height',chartHeight);

        let scale = ((this.props.chartHeight-chartPadding)/(this.props.range));
        let y = 0;
        let candleHeight = 0;

        if(this.props.c < this.props.o){
            ctx.fillStyle = "#ff0000";
            
            y = (chartHeight-chartPadding)-scale*(this.props.o-this.props.rangeLow); 
            candleHeight = scale*(this.props.o-this.props.c);
                
            ctx.fillRect(0,y,canvas.width,candleHeight);
            ctx.stroke();
            
        }else{
            
            y = chartHeight-chartPadding -scale*(this.props.c-this.props.rangeLow); 
            candleHeight = scale*(this.props.c-this.props.o);
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(0,y,canvas.width,candleHeight);
            ctx.stroke();
                
        }
        //draw wick 
        let wickWidth = 15;
        y = chartHeight-chartPadding-scale*(this.props.h-this.props.rangeLow);
        let x = scale*(this.props.h - this.props.l);
        ctx.fillRect(canvas.width/2, y,wickWidth,x);
        
    }

    setSelectedCandle(){
        setSelected.selectedCandle.o =this.props.o;
    }


    render(){
        let cvs = {height:this.state.chartHeight}
        //let cvs = {height:100}
        return(
            <>
            <canvas className="Candle" id = {this.props.id } /*style={cvs} */ onMouseOver={() =>this.props.onMouseOver(
                this.props.o,
                this.props.c,
                this.props.h,
                this.props.l,
                this.props.v,
                this.props.d
            )}></canvas>
            </>
        );  
    }    
}
   
export default Candle