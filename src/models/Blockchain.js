// 导入 Block 和 Transaction 类
import { times } from 'ramda';
import Block from './Block.js'

// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name, genesisBlock) {
    // 给区块链添加名称
    this.name = name
    // 存储所有区块的映射
    this.blockchain = new Map()
    this.blocks = {}
    // 添加创世区块到区块链中
    var getGenesisBlock = () => { 
      return new Block(Date().getTime(), null, null, Block.calculateHash()); 
    }; 
    this.addBlock(getGenesisBlock)
  }

  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    // 初始化最长链和最长链长度
    let longestChain = []
    let maxLength = 0
    // 遍历所有区块
    for (const block of this.blockchain.values()) {
      // 计算当前区块到创世区块的路径长度
      let currentBlock = block
      let currentLength = 0
      while (currentBlock.previousHash !== null) {
        currentBlock = this.blockchain.get(currentBlock.previousHash)
        currentLength++
      }
      // 如果当前链比已知最长链更长，则更新最长链和最长链长度
      if (currentLength > maxLength) {
        longestChain = this.getBlockchain(currentBlock.hash)
        maxLength = currentLength
      }
    }
    // 返回最长链
    return longestChain
  }

  // 添加一个区块到区块链中
  addBlock(block) {
    // 如果区块链中不存在该区块，则添加该区块到区块链中
    if (!this.blockchain.has(block.hash)) {
      this.blockchain.set(block.hash, block)
    }
  }

  // 根据区块哈希获取区块信息列表
  getBlockchain(hash) {
    const blockchain = []
    let currentBlock = this.blockchain.get(hash)
    while (currentBlock !== undefined && currentBlock !== null) {
      blockchain.push(currentBlock)
      currentBlock = this.blockchain.get(currentBlock.previousHash)
    }
    return blockchain
  }

  // // 创建一个新的交易并添加到待处理交易列表中
  // createTransaction(sender, recipient, amount) {
  //   const transaction = new Transaction(sender, recipient, amount)
  //   this.pendingTransactions.push(transaction)
  // }

  // // 将所有待处理交易打包到一个新的区块中，并添加到区块链中
  // minePendingTransactions(miningRewardAddress) {
  //   // 创建一个新的区块
  //   const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash)
  //   // 添加新的区块到区块链中
  //   this.addBlock(block)
  //   // 重置待处理交易列表，并添加挖矿奖励交易
  //   this.pendingTransactions = [
  //     new Transaction(null, miningRewardAddress, this.miningReward)
  //   ]
  // }

  // 获取当前区块链中最新的区块
  getLatestBlock() {
    return this.blockchain.get(this.getLatestHash())
  }

  // 获取当前区块链中最新的区块哈希
  getLatestHash() {
    return this.blockchain.keys().next().value
  }
}

export default Blockchain


