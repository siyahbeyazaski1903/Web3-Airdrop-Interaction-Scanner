async function scanWallet(){

const wallet = document.getElementById("walletInput").value

if(!wallet){
alert("Enter wallet address")
return
}

getTxCount(wallet)
getNFTMint(wallet)

}

async function getTxCount(wallet){

const tx = await provider.getTransactionCount(wallet)

document.getElementById("txCount").innerText = tx

calculateScore(tx,0,0)

}

async function getNFTMint(wallet){

const transferTopic = ethers.utils.id("Transfer(address,address,uint256)")

const filter = {

topics:[transferTopic,null,ethers.utils.hexZeroPad(wallet,32)]

}

try{

const logs = await provider.getLogs(filter)

const minted = logs.length

document.getElementById("nfts").innerText = minted

}catch{

document.getElementById("nfts").innerText = "0"

}

}

function calculateScore(tx,nft,contracts){

let score = tx*1 + nft*5 + contracts*3

document.getElementById("score").innerText = score

}
