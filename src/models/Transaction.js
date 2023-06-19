import sha256 from 'crypto-js/sha256.js'


class Transaction {
  constructor(transactionIn,transactionOut,price,fee) {
    this.transactionIn=transactionIn
    this.transactionOut=transactionOut
    this.price=price
    this.hash=this._calculateHash()
    this.fee=fee
  }

  // 更新交易 hash
  _setHash() {

  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return  sha256(this.transactionIn+this.transactionOut+this.price).toString()
  }
}

export default Transaction
