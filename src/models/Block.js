import SHA256 from  '../../node_modules/crypto-js/sha256.js'

// Block
class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 区块链
      - 前序hash
      - index
      - 时间戳
  */
  constructor(blockchain,previousHash="",index, timestamp) {
    blockchain,
    this.index=index,
    this.timestamp=SHA256(new Date().getTime().toString()).toString()
  }
}

export default Block


