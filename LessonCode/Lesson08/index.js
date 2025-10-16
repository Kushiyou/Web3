const btn  = document.querySelector("#btn");
window.addEventListener('load', async () => {
  // 检查 Ethereum 提供者
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask 已安装!');
    // 您的 DApp 代码在这里
  } else {
    console.log('请安装 MetaMask!');
  }
});
btn.addEventListener("click",async ()=>{
    if(window.ethereum){
        const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
    });}else{
        alert("请安装MateMask钱包！")
    }
    
})