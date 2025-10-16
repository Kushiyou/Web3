import {useEffect} from 'react'
import './App.css'
import Home from './Layout/Home'

function App() {

  const isWindowMetaMaskInstalled = ()=>{
    return typeof (window as any).ethereum !== 'undefined' && (window as any).ethereum.isMetaMask
  }

  useEffect(()=>{
    if(isWindowMetaMaskInstalled()){
      console.log("MetaMask is installed!")
    }else{
      console.log("MetaMask is not installed!")
    }
  },[])

  return (
    <div style={{width:"100vw",height:"100vh"}}>
      {
        isWindowMetaMaskInstalled()?
        <Home /> : 
        <h1 style={
          {margin: '25rem', textAlign:'center', color:'red',fontSize:'3rem'}
        }> 请安装 MetaMask </h1>
      }  
    </div>
  )
}

export default App
