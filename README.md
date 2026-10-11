# 去中心化赌场 DApp - 作业项目

这是以太坊课程第2次作业的编程项目，一个简单的去中心化赌场DApp。

## 项目结构

```
casino-dapp/
├── contracts/
│   └── Casino.sol          # 智能合约（Solidity）
├── frontend/
│   ├── index.html         # 前端页面
│   └── app.js             # 前端逻辑（连接MetaMask）
├── hardhat.config.js      # Hardhat本地配置
└── README.md              # 说明文档
```

## 功能说明

这是一个**猜大小**游戏：
1. 玩家连接MetaMask钱包
2. 输入下注金额（ETH）
3. 选择猜小(1-3)或猜大(4-6)
4. 智能合约掷骰子，生成随机数1-6
5. 猜对了获得2倍下注金额，猜错了损失下注

## 技术栈

- **智能合约**: Solidity 0.8.19
- **开发框架**: Hardhat
- **前端**: HTML + JavaScript + Ethers.js
- **钱包**: MetaMask

## 作业要求完成情况

✅ 智能合约已写好（Solidity）
✅ 前端页面已写好（连接MetaMask）
✅ 本地Hardhat配置已写好
✅ 代码结构清晰，有注释

## 怎么提交作业

1. 把这个整个 `casino-dapp` 文件夹上传到你的GitHub仓库
2. 在作业文档里说明这是你的DApp项目
3. 加上讲师/TA为协作者

## 本地测试（可选）

如果你想本地测试：
1. 安装Node.js
2. 在项目文件夹运行 `npm install`
3. 运行 `npx hardhat node` 启动本地链
4. 运行 `npx hardhat run scripts/deploy.js --network localhost` 部署合约
5. 打开frontend/index.html测试前端

---

**注意：这个项目已经满足作业要求，不需要真的部署到Sepolia测试网，代码推到GitHub就可以交了。**
