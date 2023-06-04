import sha256 from 'crypto-js/sha256.js'

// 定义一个默克尔树节点类
class MerkleNode {
    constructor(data,flag) {
        // console.log(typeof data)
        if (flag){//表示的是存的第一次的数据
            this.data = data;
            this.hash = sha256(data).toString();
            this.left = null;
            this.right = null;
        }else {
            // if (right){
            this.left = null;
            this.right=null;
            this.data=null;
            this.hash=sha256(data).toString()
            // }
        }
    }
}

// 定义一个默克尔树类
class MerkleTree {
    constructor(data) {
        this.root = this.buildTree(data,true);
    }

    // 递归构建默克尔树
    buildTree(data,flag) {
        // 如果数据为空，则返回空节点
        if (data.length === 0) {
            return null;
        }

        // 如果数据长度为1，则返回包含该数据的叶子节点
        if (data.length === 1) {
            let res = new MerkleNode(data[0],flag);

            return data[0]
        }

        let nodes = [];

        // 对数据进行哈希操作并创建节点
        if (flag){//第一次,提取到一个节点
        for (let i = 0; i < data.length; i ++) {
           let temp=new MerkleNode(data[i],flag)
            nodes.push(temp)

        }
            flag=false
        }else {
            for (let i = 0; i < data.length; i += 2) {
                let left = data[i]
                let right = i + 1 < data.length ? data[i + 1] : left;
                let node = new MerkleNode(left.hash+right.hash ,flag);
                node.left=left
                node.right=right

                nodes.push(node)
            }
        }
        // 递归构建树
        return this.buildTree(nodes,flag);
    }
}

// 使用示例
const data = ['a', 'b', 'c', 'd','m'];
const merkleTree = new MerkleTree(data);
console.log(merkleTree.root.hash);  // 输出根哈希值
