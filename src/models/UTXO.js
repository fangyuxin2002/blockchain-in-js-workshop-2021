export default class UTXO {
  constructor(input,output,amount) {//记录:输入，输出，然后金额(当然输入输出还是会有金额的，这里为了简单一点，就把地址当成输入输出)
    this.input=input
    this.output=output
    this.amount=amount

  }
}
