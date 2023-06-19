import sha256 from 'crypto-js/sha256.js'


class Transaction {
  constructor(transactionIn,transactionOut,price,fee) {
    this.transactionIn=transactionIn
    this.transactionOut=transactionOut
    this.price=price
    this.fee=fee
    this.hash=this._calculateHash()

  }
  equal(trx){
    return trx.transactionIn === this.transactionIn
        && trx.transactionOut === this.transactionOut
        && trx.price === this.price
        && trx.fee === this.fee;

  }

  // 更新交易 hash
  _setHash() {

  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return  sha256(this.transactionIn+this.transactionOut+this.price+this.fee).toString()
  }
}

export default Transaction
