import sha256 from 'crypto-js/sha256.js'
import UTXOPool from "./UTXOPool.js";
import UTXO from "./UTXO.js";

export const DIFFICULTY = 1

class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(blockChain, previousHash,index,hash,miner) {
    //参数:区块链的链对象
    // 前一区块的哈希值
    // 当前区块的索引:即在第几位
    // 本区块的哈希值
    this.blockChain = blockChain;

    //写法差异:可以使用this.blockChain但也可以使用Block.prototype.blockChain,差别:this.blockChain只是在对象上声明，
    // 并没有在原型链也就是底层声明为固有属性(声明为固有属性之后可以自定义get,set方法,变量=xxx的时候就自动调用set方法(通常与Object.defineProperty()搭配))
    // 直观的差异就是:如果写的是Block.prototype的话，那么log将不会打印出来写的值
    this.previousHash = previousHash;
    this.height=index
    this.timestamp = new Date().toString()
    this.hash=hash.toString()
    this.Nonce=parseInt(Math.random()*1000+"")
    blockChain._addBlock(this)//将本区块加入到区块链中
    this.coinbaseBeneficiary=miner//设置创币交易的转账地址
    if (!index){//如果是创世区块的话，就直接新建一个utxoPool
      this.utxoPool=new UTXOPool()
    }else {//不是的话就克隆上一区块的utxopool
      this.utxoPool=new UTXOPool(blockChain.blocks[previousHash].utxoPool.clone())
    }

  }

  isValid(){
    // console.log(this.Nonce)
    let  tempDiff = DIFFICULTY
    let tempHash = sha256(this.height+this.previousHash+this.Nonce+DIFFICULTY+this.timestamp).toString()
    // console.log(tempHash)
    tempHash=tempHash.split("")
    for (let i = 0; i < tempHash.length; i++) {
      if (tempDiff<=0){
        this.hash=tempHash.join("")
        // console.log("挖矿成功:",this.hash)
        this.utxoPool.addUTXO(null,this.coinbaseBeneficiary)
        return true
      }
      if (tempHash[i]!=="0"){
        this.hash=tempHash.join("")
        return false
      }else {
        tempDiff--
      }
    }
    return false;
  }
  setNonce(Nonce){
    Nonce =Nonce+parseInt(Math.random()*1000+"")

    // console.log("以前的hash",sha256(this.height,this.previousHash,this.Nonce,DIFFICULTY,this.timestamp).toString(),
    //     "现在的Nonce",sha256(this.height,this.previousHash,temp,DIFFICULTY,this.timestamp).toString())
    this.Nonce=Nonce
  }




}

export default Block
