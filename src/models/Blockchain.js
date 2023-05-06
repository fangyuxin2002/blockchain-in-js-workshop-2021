// Blockchain


class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */

  constructor(name) {
    this.name = name;
    this.blockMap = {};
    this.blocks=[]

    this.lastBlock=[]
    this.genesis=""
  }
  getLength(array) {
    let length=0
    for (let arrayKey in array) {
      length++
    }
    return length
  }


  addBlock(block){
      let lastBlock = this.lastBlock[block.previousHash]
      if (!lastBlock){
      this.lastBlock[block.hash]=block
      return
    }


      this.lastBlock[block.hash]=block
      delete this.lastBlock[block.previousHash]
  }

  maxIndex(){
    let tempArr=this.lastBlock
    let res=0;
    let resBLock={}
    for (let tempIndex in this.lastBlock){
      res= this.maxBlock(res,tempIndex)
      resBLock=this.lastBlock[res]
    }
    return resBLock
  }
  maxBlock(blockAHash,BlockBHash){
    if (!blockAHash){
      return BlockBHash
    }
    let tempArr=this.lastBlock
    let Aindex = tempArr[blockAHash].index
    let Bindex=tempArr[BlockBHash].index

    return Aindex >Bindex?blockAHash:BlockBHash
  }




  longestChain() {
    let longestChain = [];
    let currentChain = [];
    let res = this.maxIndex()
    // console.log(res)
    let temp=res
    let lastIndex=res.index
    // console.log(res.blockChain.blocks)
    for (let i in res.blockChain.blocks) {//for循环,但不以i作为索引
      if (!temp){break;}

      longestChain[lastIndex]=temp
      lastIndex--;
      temp=res.blockChain.blocks[temp.previousHash]
    }
    // console.log(longestChain);
    // longestChain[end.hash]=end
    // longestChain.length=this.getLength(longestChain)
    longestChain=longestChain.filter((s)=>{//删除空集
      return s ;
    })
    return longestChain;
  }
}

export default Blockchain
