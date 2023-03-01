export default class Node {
  key: string;
  value: string;
  frequency: number;
  next: Node;
  prev: Node;
  constructor(key: string, value: string, frequency = 1) {
    this.key = key;
    this.value = value;
    this.frequency = frequency;
  }

  getKey() {
    return this.key;
  }
  getValue() {
    return this.value;
  }
  getFrequency() {
    return this.frequency;
  }

  setValue(value: string) {
    this.value = value;
    return this;
  }
  incFrequency() {
    this.frequency++;
    return this;
  }

  setNext(node: Node) {
    this.next = node;
  }
  setPrev(node: Node) {
    this.prev = node;
  }
  removeNext() {
    this.next = null;
  }
  removePrev() {
    this.prev = null;
  }
}
