import {useState} from 'react'
import SplitText from "../Componet/SplitText";

export default function Home() {
  const [loginState,setLoginState] = useState(false)

  const connectMetaMask = async ()=>{
    
    if(typeof (window as any).ethereum !== 'undefined' && (window as any).ethereum.isMetaMask){
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setLoginState(true)
    }else{
        alert("请安装MateMask钱包！")
    }
    
}
  
  return (
    <div>
      <header style={{width:"100%",height:"7%",backgroundColor:"gray",lineHeight:"7vh",fontSize:"2rem",padding:"0 1rem"}}>
        <SplitText text="连接MetaMsk钱包" />
      </header>
      <main style={{width:"100%",height:"93vh",backgroundColor:"#f0f0f0",padding:'1rem'}}>
        <button onClick={connectMetaMask} style={{height:'3rem',backgroundColor:"skyblue",padding:"8px"}}>连接MetaMask</button>
        <div>
          登录状态：{loginState?"已连接":"未连接"}
        </div>
      </main>
    </div>
  )
}