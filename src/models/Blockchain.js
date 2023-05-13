// 导入 Block 类
import { times } from 'ramda';
import Block from './Block.js'
import SHA256 from  '../../node_modules/crypto-js/sha256.js'

// Blockchain
/**
 * blockchain 对象用于表示整个区块链，包括当前区块链的状态、节点信息、共识算法、网络协议等。
 * blockchain 对象通常包含一个指向最新区块的指针 latestBlock，以及用于添加新区块到区块链中的方法 addBlock()。
 * 而 blocks 数组则用于存储区块链中的所有区块。当一个新的区块被添加到区块链中时，它会被添加到 blocks 数组中
 * 并更新 blockchain 对象中的 latestBlock 指针；blocks 数组通常可以用于实现一些特定的功能，如查找区块、验证区块链等。
 */
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
    // 存储区块信息
    this.blocks=[]
    // 添加创世区块到区块链中
    const genesisBlock = new Block(this, "", 0, new Date().getTime(), 'Hello World!');
    this.blocks.push(genesisBlock);
    this.blockchain.set(genesisBlock.hash, genesisBlock);
  }

// 获取当前区块链blockchain中最新的区块
getLatestBlock() {
  return SHA256(Array.from(this.blockchain.values())[this.blockchain.size - 1]);
}


// 添加一个区块到区块链中
addBlock(block) {
  if (!this.blockchain.has(block.hash)) {
      block.previousHash = this.getLatestBlock().hash;
      block.hash = block.calculateHash();
      // 将区块加入区块链
      this.blockchain.set(block.hash, block);
      
      this.blocks.push(block)
      console.log('--- addBlock() ---加入成功!');
  }
  console.log('--- addBlock() ---加入失败!');
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
      /**
       * values() 是 JavaScript 中的一个方法，
       * 用于获取一个对象中所有属性的值，
       * 返回一个包含所有值的数组。
       */
      console.log("--- longestChain blockchian values ---",this.blockchain)
      for (const block of this.blockchain.values()) {
        // 计算当前区块到创世区块的长度
        let length = 1
        let currentBlock = block
        console.log("--- longestChain block list ---",block)
        while (currentBlock.previousHash !== "") {
          /**
           * has 是 JavaScript 对象中的一个内置方法，用于检查对象是否具有指定的属性。
           * has 方法返回一个布尔值，如果对象具有指定属性，则为 true，否则为 false。
           */
          console.log("--- longestChain previousHash !== null ---")
          if (!this.blockchain.has(currentBlock.previousHash)) {
            // 如果当前区块的前一个区块不存在，则跳过该区块
            break
          }
          currentBlock = this.blockchain.get(currentBlock.previousHash)
          length++
        }
        // 如果当前链比最长链更长，则更新最长链
        if (length > maxLength) {
          console.log("--- longestChain if length > maxLength ---")
          longestChain = []
          let currentBlock = block
        
          // while循环进了
          while (currentBlock !== undefined) {
            /**
             * arr.unshift(element1, element2, ..., elementN)
             * 其中，arr 是要操作的数组，element1 到 elementN 是要添加到数组开头的元素。
             */
            longestChain.unshift(currentBlock)
            /**
             * get 是 JavaScript 对象中的一个内置方法，用于获取对象的属性值。
             * get 方法通常用于访问对象的私有属性或计算属性，以及在获取属性值时执行一些逻辑。
             */
            currentBlock = this.blockchain.get(currentBlock.previousHash)
            console.log("--- longestChain while ---")
          }
          // if循环没进,证明currentBlock==undefined。找不到原因
          if (currentBlock !== undefined) {
            longestChain.unshift(currentBlock)
            console.log("--- longestChain if ---")
          }

          maxLength = length
        }
      }
      return longestChain
    }
}

export default Blockchain

