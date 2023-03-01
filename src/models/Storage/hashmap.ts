import Node from '../lib/Node';
import Storage from './Storage.interface';

export class HashMap implements Storage {
  storage: Map<string, Node> = new Map();
  size: number;
  constructor() {
    this.size = 0;
  }

  get(key: string): Node {
    if (!this.storage.has(key)) {
      throw new Error('Key does not exist');
    }
    return this.storage.get(key);
  }
  print() {
    console.log('PRINTING ALL;');
    for (const [k, node] of this.storage.entries()) {
      console.log(k, node.getValue());
    }
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  put(key: string, value: string): boolean {
    let _node: Node;
    if (!this.storage.has(key)) {
      _node = new Node(key, value, 1);
      this.storage.set(key, _node);
      this.size++;
    } else {
      _node = this.storage.get(key);
      _node.setValue(value);
    }
    return true;
  }

  delete(key: string) {
    const node = this.storage.get(key) as Node;
    this.storage.delete(key);
    this.size--;
    return node;
  }
}
