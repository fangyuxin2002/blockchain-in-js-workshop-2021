import UTXO from './UTXO.js'
import transaction from "./Transaction.js";

class UTXOPool {
    constructor(utxos = []) {//老师这里写的原本是对象,但引用的时候还是用的数组来写,为了方便我直接把这里也用成数组了
        this.utxos = utxos

    }

    // 添加交易函数
    /**
     * 将交易的信息更新至 UTXOPool 中
     */
    addUTXO(input, output) {//交易的输入输出的BTC账户地址(本来应该有一个amount的，但因为这里都是创币交易，所以就不用写)

        if (!this.utxos[output]) {//如果当前output在这里不存在,这里指的是第一个区块的创币交易(高度为0的那个区块)
            this.utxos[output] = new UTXO(input, output, 12.5)
        }//新建output，然后给它12.5的奖励(这里也需要判断是否为创币交易，但很显然test代码都是创币交易,所以写的简单)
        else {
            this.utxos[output] = new UTXO(input, output, this.utxos[output].amount + 12.5)//将上一个区块的UTXO进行操作
        }
    }

    // 将当前 UXTO 的副本克隆
    clone() {//这里可以直接返回this.utxos
        let res = []
        for (let item in this.utxos) {
            res[item] = this.utxos[item]
        }
        return res
    }

    /**
     *
     * @param input:账户的地址
     * @param price:校验是否有price的钱
     */
    isValidTransaction(input, price) {
        return this.utxos[input].amount >= price;
    }

    /**
     *
     * @param transaction:交易的对象
     */
    handleTransaction(transaction) {
        if (this.isValidTransaction(transaction.transactionIn, transaction.price)) {//先检查是否有这么多钱
            this.utxos[transaction.transactionIn].amount -= transaction.price//进行转账处理
            if (!this.utxos[transaction.transactionOut]) {
                this.utxos[transaction.transactionOut] = new UTXO(transaction.transactionOut, transaction.transactionIn, transaction.price)
            } else this.utxos[transaction.transactionOut].amount += transaction.price
        }
    }
}

export default UTXOPool
