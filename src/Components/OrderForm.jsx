import React,{Component} from 'react'
import '../styles/OrderForm.css'
export default class OrderForm extends React.Component{
    tradeVehicles = ['EQUITY',
			'EQUITY_OPTION',
			'ETF',
			'ETF_OPTION',
			'INDEX_OPTION']

            riskProfile = ['MAX_RISK',
	    	'MID_RISK',
	    	'MIN_RISK']

            availableActions = ['BUY','SELL']
            optionStrategies = [
            'LONG_CALL',
            'LONG_PUT',
            'BEAR_CALL_SPREAD',
            'BULL_CALL_SPREAD',
            'BEAR_PUT_SPREAD',
            'BULL_PUT_SPREAD',
            'BUTTERFLY',
            'BROKEN_WING',
            'RATIO_SPREAD',
            'CALENDAR',
            'STRANGLE',
            'STRADDLE',
            'CONDOR',
            'IRON_CONDOR',
            'IRON_BUTTERFLY'
            ]
    constructor(props){
        super(props);
        OrderForm.propTypes ={
            saveOrder:()=>{},
        }
        this.state={
            
        }
    }
    render(){
        let optionStrategies = Object.entries(this.optionStrategies).map(([key,value])=>
            <option key = {key} value={value}>{value}</option>
        )
        let tradeVehicles = Object.entries(this.tradeVehicles).map(([key,value])=>
            <option key = {key} value={value}>{value}</option>
        )
        let riskProfile = Object.entries(this.riskProfile).map(([key,value])=>
            <option key = {key} value={value}>{value}</option>
        )
        
        return(
            <div id="componentWrapper">
        <span>Order Form </span>
        
        

             <label for="action" >Select Trade Vehicle</label>
                <select name="vehicle" required>
                    <option disabled value="" selected> Select Action</option>
                    {tradeVehicles}
                </select>
                <div >
                <label for="action" >Select Option Strategy</label>
                <select name="strategy"  required>
                    <option disabled value="" selected> Select Strategy</option>
                    {optionStrategies}
                </select>
                </div>
            
             <label for="action" >Select Order Action</label>
                <select name="action"  required>
                    <option disabled value="" selected> Select Action</option>
                    <option>BUY</option>
                    <option>SELL</option>
                </select>
            
             <label for="action" >Select Risk Allocation Profile</label>
                <select name="risk"  required>
                    <option disabled value="" selected> Select Action</option>
                    {riskProfile}
                </select>
                <button onClick={()=>this.props.saveOrder(this.state)}>Save</button>
       
    </div>
        );
    }
}