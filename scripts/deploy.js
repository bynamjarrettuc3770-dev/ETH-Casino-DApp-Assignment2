// 部署脚本
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("部署合约的账户:", deployer.address);

  // 部署合约
  const Casino = await ethers.getContractFactory("Casino");
  const casino = await Casino.deploy();
  await casino.deployed();

  console.log("Casino合约已部署到:", casino.address);
  console.log("把这个地址填到frontend/app.js里的contractAddress变量");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
