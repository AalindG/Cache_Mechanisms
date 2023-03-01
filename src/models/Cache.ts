import EvictionPolicy from './EvictionPolicy/Eviction.Interface';
import Storage from './Storage/Storage.interface';

export default class Cache {
  size: number;
  capacity: number;
  dataStore: Storage;
  evictionPolicy: EvictionPolicy;

  constructor(cap: number, evictionPolicy: EvictionPolicy, storage: Storage) {
    this.capacity = cap;
    this.size = 0;
    this.evictionPolicy = evictionPolicy;
    this.dataStore = storage;
  }

  get(key: string) {
    const node = this.dataStore.get(key);
    this.evictionPolicy.keyAccessed(node);
    return node.getValue();
  }

  put(key: string, value: string) {
    if (this.dataStore.has(key)) {
      const node = this.dataStore.get(key);
      this.evictionPolicy.keyAccessed(node);
    } else {
      this.evictionPolicy.keyInserted(key, value);
      this.size++;
      if (this.size > this.capacity) {
        const keyToEvict = this.evictionPolicy.evict();
        this.dataStore.delete(keyToEvict);
        this.size--;
      }
    }
    this.dataStore.put(key, value);
    return this;
  }
  delete(key: string) {
    const node = this.dataStore.get(key);
    this.evictionPolicy.removeKey(node);
    this.dataStore.delete(key);
    this.size--;
  }

  printMap() {
    this.dataStore.print();
  }
}
