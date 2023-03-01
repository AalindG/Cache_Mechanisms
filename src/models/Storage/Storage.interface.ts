import Node from '../lib/Node';

export default interface Storage {
  get(key: string): Node;
  has(key: string): boolean;
  put(key: string, value: string): boolean;
  delete(key: string): Node;
  print(): void;
}
