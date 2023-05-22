// Blockchain


class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */

  constructor(name) {//传入区块名字
    this.name = name;
    this.blocks=[]
    this.lastBlock=[]
  }


  addBlock(block){

    //添加区块:主要是确定最后一位的区块
    //添加逻辑:新区块加入后,根据新加区块的preHash把前一的区块在lastBlock中删除
    let lastBlock = this.lastBlock[block.previousHash]
    if (!lastBlock){
      this.lastBlock[block.hash]=block
      return
    }
    this.lastBlock[block.hash]=block
    delete this.lastBlock[block.previousHash]
  }
  _addBlock(block){//老师添加区块的时候用的方法名字叫做_addBlock，为了兼容前面的代码就直接这样操作了
    this.blocks[block.hash]=block//将区块添加进定义好的block中
    this.addBlock(block)
  }

  maxIndex(){
    //作用:从lastBlock中找出index最大的区块并返回
    let res=0;
    let resBLock={}
    for (let tempIndex in this.lastBlock){
      //注:在JS中,Array底层和Java的Array不同,JS底层的Array更像是一个K-V对应的map,在通过索引:0,1,2,3访问的时候其实是Array底层维护了一个length作为K-中的K
      // ,所以这里不能使用fori循环
      //for in循环是对Array的Key进行循环,每次取值的时候就直接Array[key]就行了
      res= this.maxBlock(res,tempIndex)//传入的是key
      resBLock=this.lastBlock[res]
    }
    return resBLock
  }
  maxBlock(blockAHash,BlockBHash){//比较出index大的key并返回
    if (!blockAHash){
      return BlockBHash
    }
    let tempArr=this.lastBlock
    return tempArr[blockAHash].height >tempArr[BlockBHash].index?blockAHash:BlockBHash
  }
  containsBlock(block){
    let blockHash=block.hash
    for (let hash in this.blocks){
      if (hash===blockHash){
        return true
      }
    }
    return false
  }




  longestChain() {//获取最长链
    let longestChain = [];
    let res = this.maxIndex()//获取到最长链上的最后一个区块
    let temp=res//从最长到第一个区块
    let lastIndex=res.height
    for (let i in res.blockChain.blocks) {//for循环,但不以i作为索引
      if (!temp||temp.height===0){break;}//如果temp不存在就返回
      longestChain[lastIndex]=temp
      lastIndex--;
      temp=res.blockChain.blocks[temp.previousHash]
    }
    longestChain= longestChain.filter( (s)=>{
      //删除空集,因为为undefined/null的元素不会进入过滤器
      return s;
    })
    return longestChain;//返回
  }
}

export default Blockchain
