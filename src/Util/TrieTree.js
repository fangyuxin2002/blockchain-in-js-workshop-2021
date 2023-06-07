class TrieNode {
    constructor(value = '') {
        this.value = value;
        this.children = {};
        this.isEnd = false;
    }

    // 添加字符串
    addWord(word) {
        let node = this;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode(char);
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }
    //

    // 删除字符串
    removeWord(word) {
        let node = this;
        const stack = [node];
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children[char]) {
                return false; // 字符串不存在
            }
            node = node.children[char];
            stack.push(node);
        }
        if (!node.isEnd) {
            return false; // 字符串不存在
        }
        node.isEnd = false;
        for (let i = stack.length - 1; i >= 0; i--) {
            const node = stack[i];
            const char = word[i];
            if (Object.keys(node.children).length === 0) {
                delete node.children[char]; // 删除节点
            } else {
                break;
            }
        }
        return true;
    }
}
let  temp =new TrieNode()
temp.addWord("abcd")
let res = temp.removeWord("abcd")
console.log(res)
