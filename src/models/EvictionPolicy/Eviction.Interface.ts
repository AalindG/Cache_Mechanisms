import Node from "../lib/Node";

export default interface EvictionPolicy {
  evict(): string;
  keyInserted(key: string, value: string): boolean;
  keyAccessed(node: Node): boolean;
  removeKey(node: Node): void;
}
