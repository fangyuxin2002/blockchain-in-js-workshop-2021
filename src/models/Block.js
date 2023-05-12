import SHA256 from  '../../node_modules/crypto-js/sha256.js'
import Blockchain from './Blockchain.js'

// Block
class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 区块链的链对象
      - 前序hash
      - index
      - 本区块的哈希值
  */
  constructor(blockchain,previousHash,index, timestamp) {
    this.blockchain=blockchain
    this.previousHash=previousHash
    this.index=index,
    this.timestamp=timestamp
    blockchain.addBlock(this)
  }
}

export default Block
