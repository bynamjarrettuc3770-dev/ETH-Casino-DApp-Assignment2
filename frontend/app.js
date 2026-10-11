// 全局变量
let accounts = [];
let contract;
const contractAddress = "0xYOUR_CONTRACT_ADDRESS_AFTER_DEPLOY"; // 部署合约后填这里

// ABI 简化版，只包含我们用到的函数
const contractABI = [
    {
        "inputs": [{"internalType": "bool", "name": "guessBig", "type": "bool"}],
        "name": "playGuess",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "player", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "betAmount", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "diceRoll", "type": "uint256"},
            {"indexed": false, "internalType": "bool", "name": "won", "type": "bool"},
            {"indexed": false, "internalType": "uint256", "name": "payout", "type": "uint256"}
        ],
        "name": "GameResult",
        "type": "event"
    }
];

// 连接钱包
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('walletStatus').innerHTML = 
                `已连接: <span class="address">${accounts[0]}</span>`;
            
            // 初始化合约
            contract = new ethers.Contract(contractAddress, contractABI, window.ethereum.signer);
            alert('钱包连接成功！');
        } catch (error) {
            console.error(error);
            alert('连接失败，请检查MetaMask');
        }
    } else {
        alert('请先安装MetaMask钱包！');
    }
}

// 玩游戏
async function playGame(guessBig) {
    if (accounts.length === 0) {
        alert('请先连接钱包！');
        return;
    }

    const betAmount = document.getElementById('betAmount').value;
    if (!betAmount || betAmount <= 0) {
        alert('请输入有效的下注金额！');
        return;
    }

    try {
        // 转换ETH为wei
        const betAmountWei = ethers.utils.parseEther(betAmount);
        
        // 调用合约
        const tx = await contract.playGuess(guessBig, { value: betAmountWei });
        await tx.wait();
        
        // 监听事件
        contract.once('GameResult', (player, bet, dice, won, payout) => {
            const resultDiv = document.getElementById('resultArea');
            if (won) {
                resultDiv.innerHTML = `
                    <div class="result win">
                        🎉 你赢了！
                        <div class="dice">🎲 ${dice}</div>
                        赢得了 ${ethers.utils.formatEther(payout)} ETH
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="result lose">
                        😢 你输了
                        <div class="dice">🎲 ${dice}</div>
                        损失了 ${ethers.utils.formatEther(bet)} ETH
                    </div>
                `;
            }
        });

    } catch (error) {
        console.error(error);
        alert('游戏失败：' + error.message);
    }
}

// 监听账户变化
window.ethereum?.on('accountsChanged', (newAccounts) => {
    accounts = newAccounts;
    if (accounts.length === 0) {
        document.getElementById('walletStatus').textContent = '未连接钱包';
    } else {
        document.getElementById('walletStatus').innerHTML = 
            `已连接: <span class="address">${accounts[0]}</span>`;
    }
});
