## 作品简介：使用web3.storage将所要存的资源存储到IPFS上面，信息存储都是运用IPFS来完成
### 启动步骤:
### 1.npm install 安装所需要的包
### 2.（由于运用了web3.storage所以需要去web3.storage上面去申请一个token来启动项目）
### [https://web3.storage/login/](https://web3.storage/login/) 
### 3.此项目只在测试网上运行了，所以需要启动本地测试网（如果已经将合约部署到其他测试网，这步可以省略）
#### a.启动测试网 npx hardhat node
#### b.部署合约npx hardhat run ./scripts/deploy.js --network localhost
#### c.将项目中的智能合约网址都换掉
### 4.npm run server 即可启动

### 参考：
IPFS/Filecoin 官网视频
