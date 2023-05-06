import sha256 from "crypto-js/sha256.js";

class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(blockChain, previousHash,index,hash) {
    this.blockChain = blockChain;
    this.previousHash = previousHash;
    this.index=index
    this.hash=hash.toString()
    Block.prototype.hash=hash.toString()
    this.timestamp = new Date().getTime();
    blockChain.addBlock(this)
  }

  calculateHash() {
    // 在这里实现计算哈希的逻辑，这里仅用一个假的字符串代替
    sha256(this.previousHash,this.timestamp)
    return "hash";
  }
}

export default Block
