
import { Component, Children } from "react";

class MainComponentLayout extends Component{
    constructor(props){
        super(props);
        this.state={
            showControls:false
        }
        this.toggleComponentControls = this.toggleComponentControls.bind(this);
    }
    toggleComponentControls(){
        this.setState({
          showControls:!this.state.showControls,
        });
      }
    render(){
        return(
        
        <div className={this.state.showControls?"half-page":"page"}>
           {Children}
           <div className={this.state.showControls?"half-page":"controlPanel"}>
                <button onClick={this.toggleComponentControls}>^</button>
           </div>
        </div>
            
        
        )
    }
}
export default MainComponentLayout