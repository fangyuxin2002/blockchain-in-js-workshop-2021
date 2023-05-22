import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos=[]) {
    this.utxos=utxos

  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(input,output) {

    if (!this.utxos[output]){
      this.utxos[output]=new UTXO(input,output,12.5)}
    else {
      this.utxos[output] = new UTXO(input, output, this.utxos[output].amount + 12.5)
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
    let res=[]
    for (let item in this.utxos){
      res[item]=this.utxos[item]
    }
    return res
  }
}

export default UTXOPool
