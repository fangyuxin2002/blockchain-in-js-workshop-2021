import SHA256 from  '../../node_modules/crypto-js/sha256.js'

// Block
class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 时间戳
      - 交易列表
      - 前一个区块的哈希值
      - 当前区块的哈希值
  */
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp
    this.transactions = transactions
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }

  // 2. 定义 calculateHash 函数
  /* 
    计算当前区块的哈希值
  */
  calculateHash() {
    return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash).toString()
  }
}

export default Block

