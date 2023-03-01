import Node from "./Node";

export default class DLL {
  head: Node;
  tail: Node;
  size: number;

  constructor() {
    this.size = 0;
  }

  insertNode(node: Node) {
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
      this.size++;
    } else if (this.size === 1) {
      this.tail = node;
      node.setPrev(this.head);
      this.head.setNext(node);
      this.size++;
    } else {
      this.tail.setNext(node);
      node.setPrev(this.tail);
      this.tail = node;
      this.size++;
    }
  }

  insert(key: string, value: string, frequency: number) {
    this.insertNode(new Node(key, value, frequency));
    return this;
  }

  removeHead(): Node {
    const currHead = this.head;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return currHead;
    }

    this.head = this.head.next;
    this.head.removePrev();
    currHead.removeNext();
    this.size--;
    return currHead;
  }

  removeTail() {
    const currTail = this.tail;
    this.tail = currTail.prev;
    currTail.removePrev();
    this.tail.removeNext();
    this.size--;
    return currTail;
  }

  remove(key: string): Node {
    if (this.size === 0) {
      throw new Error('Cannot remove from an empty list');
    }
    if (this.head.getKey() === key) {
      return this.removeHead();
    }
    if (this.tail.getKey() === key) {
      return this.removeTail();
    }
    let pointer = this.head;
    while (pointer.next.getKey() !== key) {
      pointer = pointer.next;
    }
    const aux = pointer.next;
    pointer.setNext(aux.next);
    aux.setPrev(pointer);
    aux.removeNext();
    aux.removePrev();
    this.size--;
    return aux;
  }
}
