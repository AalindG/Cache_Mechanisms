import DLL from '../lib/DLL';
import Node from '../lib/Node';
import EvictionPolicy from './Eviction.Interface';

export default class LFU implements EvictionPolicy {
  leastFrequency: number;
  frequencyKeyMap: Map<number, DLL> = new Map();

  constructor() {
    this.leastFrequency = 1;
  }

  private updateLeastFreqToNextPossibleVal() {
    while (!this.frequencyKeyMap.has(this.leastFrequency)) {
      this.leastFrequency++;
    }
  }

  keyAccessed(node: Node): boolean {
    const oldFreq = node.getFrequency();
    const oldList = this.frequencyKeyMap.get(oldFreq);
    oldList.remove(node.getKey());

    const frequency = node.incFrequency().getFrequency();
    if (!this.frequencyKeyMap.has(frequency)) {
      const _list = new DLL();
      _list.insertNode(node);
      this.frequencyKeyMap.set(frequency, _list);
      if (frequency < this.leastFrequency) {
        this.leastFrequency = frequency;
      }
    } else {
      this.frequencyKeyMap.get(frequency).insertNode(node);
    }

    if (oldList.size === 0) {
      this.frequencyKeyMap.delete(oldFreq);
      this.updateLeastFreqToNextPossibleVal();
    }

    return true;
  }

  keyInserted(key: string, value: string): boolean {
    const frequency = 1;
    const node = new Node(key, value, frequency);

    if (!this.frequencyKeyMap.has(frequency)) {
      const list = new DLL();
      list.insertNode(node);
      this.frequencyKeyMap.set(frequency, list);
    } else {
      this.frequencyKeyMap.get(frequency).insertNode(node);
    }
    if (this.leastFrequency < 1) {
      this.leastFrequency = 1;
    }
    return true;
  }

  evict(): string {
    const listToEvictFrom = this.frequencyKeyMap.get(this.leastFrequency);
    console.log('listToEvictFrom: ', listToEvictFrom);
    console.log('leastFreq: ', this.leastFrequency);
    const evictedNode = listToEvictFrom.removeHead();
    if (listToEvictFrom.size === 0) {
      this.frequencyKeyMap.delete(this.leastFrequency);
      this.updateLeastFreqToNextPossibleVal();
    }
    return evictedNode.getKey();
  }

  removeKey(node: Node) {
    const freq = node.getFrequency();
    const list = this.frequencyKeyMap.get(freq);
    list.remove(node.getKey());
    if (list.size === 0) {
      this.frequencyKeyMap.delete(freq);
      if (freq === this.leastFrequency) {
        this.updateLeastFreqToNextPossibleVal();
      }
    }
  }
}
