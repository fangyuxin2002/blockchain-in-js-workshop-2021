import keccak256 from "keccak256/keccak256.js";


class MPTNode {
    constructor(type, value, children) {
        this.type = type;
        this.value = value;
        this.children = children;
    }

    hash() {
        let encoded;
        if (this.type === 'leaf') {
            encoded = `${this.value.key}:${this.value.value}`;
        } else if (this.type === 'extension') {
            encoded = `${this.value}:${this.children[0].hash()}`;
        } else if (this.type === 'branch') {
            encoded = '';
            for (let i = 0; i < 16; i++) {
                if (this.children[i]) {
                    encoded += this.children[i].hash();
                } else {
                    encoded += '0'.repeat(64);
                }
            }
            encoded += this.children[16] ? this.children[16].hash() : '0'.repeat(64);
        } else {
            encoded = '';
        }
        return keccak256(encoded);
    }
}

class MPT {
    constructor() {
        this.root = new MPTNode('branch', null, new Array(17).fill(null));
    }

    insert(key, value) {
        let node = this.root;
        let path = '';
        for (let i = 0; i < key.length; i++) {
            const k = key[i];
            const nibble = parseInt(k, 16);
            path += k;
            if (!node.children[nibble]) {
                node.children[nibble] = new MPTNode('leaf', { key: key.slice(i), value: value }, null);
                break;
            }
            const child = node.children[nibble];
            if (child.type === 'leaf') {
                const childPath = child.value.key;
                if (childPath === key.slice(i)) {
                    child.value.value = value;
                    break;
                }
                const newPath = key.slice(i);
                const extensionNode = new MPTNode('extension', path.slice(0, -childPath.length), [child]);
                node.children[nibble] = extensionNode;
                extensionNode.children[newPath[0]] = new MPTNode('leaf', { key: newPath, value: value }, null);
                break;
            }
            node = child;
        }
        this.root = this.updateRoot(this.root, key, value);
    }

    get(key) {
        let node = this.root;
        for (let i = 0; i < key.length; i++) {
            const nibble = parseInt(key[i], 16);
            if (!node.children[nibble]) {
                return null;
            }
            const child = node.children[nibble];
            if (child.type === 'leaf') {
                const childKey = child.value.key;
                if (childKey === key.slice(i)) {
                    return child.value.value;
                } else {
                    return null;
                }
            } else if (child.type === 'extension') {
                const childPath = child.value;
                if (key.slice(i, i + childPath.length) !== childPath) {
                    return null;
                }
                node = child.children[key[i + childPath.length]];
                i += childPath.length - 1;
            } else {
                node = child.children[16];
            }
        }
        if (node.type === 'leaf') {
            return node.value.value;
        } else {
            return null;
        }
    }

    updateRoot(node, key, value) {
        let path = '';
        for (let i = 0; i < key.length; i++) {
            const nibble = parseInt(key[i], 16);
            if (!node.children[nibble]) {
                node.children[nibble] = new MPTNode('leaf', { key: key.slice(i), value: value }, null);
                break;
            }
            const child = node.children[nibble];
            if (child.type === 'leaf') {
                const childPath = child.value.key;
                if (childPath === key.slice(i)) {
                    child.value.value = value;
                    break;
                }
                const newPath = key.slice(i);
                const extensionNode = new MPTNode('extension', path.slice(0, -childPath.length), [child]);
                node.children[nibble] = extensionNode;
                extensionNode.children[newPath[0]] = new MPTNode('leaf', { key: newPath, value: value }, null);
                break;
            }
            node = child;
            path += key[i];
        }
        return node;
    }
}
let test=new MPT();
test.insert("keyq",1);
let temp= test.get("keyq")
console.log(temp)
