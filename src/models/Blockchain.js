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
  constructor(name) {
    // 给区块链添加名称
    this.name = name
    // 存储所有区块的映射
    this.blockchain = new Map()
    // 创世区块
    this.blocks=[]
  }

// 获取当前区块链中最新的区块哈希
getLatestHash() {
  console.log("LatestHash")
  return this.blockchain.keys().next().value
}

// 获取当前区块链中最新的区块
getLatestBlock() {
  return this.blockchain.get(this.getLatestHash())
}

// 添加一个区块到区块链中
addBlock(block) {
  // 如果区块链中不存在该区块，则添加该区块到区块链中
  if (!this.blockchain.has(block.hash)) {
    this.blockchain.set(block.hash, block)
    console.log("--- addBlock() ---加入成功!")
  } else {
    console.log("--- addBlock() ---区块已存在!")
  }
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
      while (currentBlock !== undefined && currentBlock.previousHash !== null) {
        currentBlock = this.blockchain.get(currentBlock.previousHash)
        if (currentBlock !== undefined) {
          currentLength++
        }
      }
      // 如果当前链比已知最长链更长，则更新最长链和最长链长度
      if (currentLength > maxLength) {
        longestChain = Array.from(this.blockchain.values())
          .filter((block) => block.previousHash === null)
          .reverse()
        maxLength = currentLength
      }
    }
    // 返回最长链
    return longestChain
  }
}

export default Blockchain

