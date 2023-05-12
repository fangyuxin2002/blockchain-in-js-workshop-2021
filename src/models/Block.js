class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(blockChain, previousHash,index,hash) {
    //参数:区块链的链对象
    // 前一区块的哈希值
    // 当前区块的索引:即在第几位
    // 本区块的哈希值
    this.blockChain = blockChain;

    //写法差异:可以使用this.blockChain但也可以使用Block.prototype.blockChain,差别:this.blockChain只是在对象上声明，
    // 并没有在原型链也就是底层声明为固有属性(声明为固有属性之后可以自定义get,set方法,变量=xxx的时候就自动调用set方法(通常与Object.defineProperty()搭配))
    // 直观的差异就是:如果写的是Block.prototype的话，那么log将不会打印出来写的值
    this.previousHash = previousHash;
    this.index=index
    this.hash=hash.toString()
    Block.prototype.hash=hash.toString()
    blockChain.addBlock(this)//将本区块加入到区块链中
  }

}

export default Block
