import Cache from "./models/Cache";
import LFU from "./models/EvictionPolicy/LFU";
import { HashMap } from "./models/Storage/hashmap";

function main() {
  const evicPolicy = new LFU();
  const storage = new HashMap();
  const cache = new Cache(10, evicPolicy, storage);

  cache
    .put('1', '10')
    .put('2', '10')
    .put('3', '10')
    .put('4', '10')
    .put('5', '10')
    .put('6', '10')
    .put('7', '10')
    .put('8', '10')
    .put('9', '10')
    .get('1');

  cache
    .put('10', '10')
    .put('11', '10')
    .put('11', '12')
    .put('12', '10')
    .put('13', '10')
    .put('14', '10')
    .put('15', '10')
    .put('16', '10')
    .put('17', '10')
    .put('18', '10')
    .put('19', '10')
    .put('10', '10')
    .put('21', '10')
    .put('22', '10')
    .put('23', '10')
    .put('24', '10')
    .put('25', '10')
    .put('26', '10')
    .put('27', '10')
    .put('28', '10')
    .put('29', '10');
  cache.get('23');
  cache.get('24');
  cache.get('25');
  cache.get('26');
  cache.get('27');
  cache.get('28');
  cache.get('29');
  cache.get('26');
  // const resp = cache.get('16');
  // console.log('resp', resp);
  // cache.get('16');
  // cache.get('16');
  // cache.get('16');
  // cache.delete('17');
  cache.put('8', '11');
  cache.put('2', '11');
  cache.put('3', '11');
  cache.put('4', '11');
  cache.put('5', '11');
  cache.put('6', '11');
  cache.printMap();
}

main()
