import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import ApexCharts from 'apexcharts'
import Header from './Components/Header';
import CandleChart from './Components/CandleChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Header />
    
      <div className="footer"> 
     
      </div>
      
      
     
    </>
  )
  
}

export default App
