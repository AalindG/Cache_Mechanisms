### Entities
- key:value map
- capacity
- currentSize
- getByKey()
- put()
- getAll()
- flush()

### Eviction Policy
- LFU - Least Frequently Used


### Algorithm
1. 
- Maintain a frequency against each element
-  sort and get the least 

2. 
- frequency map for all the elements, <freq, list,linkedList,DLL>
- a `currentLeastFrequency` counter


* Eviction in 1. takes sorting and deletion
* Eviction in 2. takes deletion in LL or DLL [V]

on update or fetch, first get the node in the linked list against frequency. That means
I have to search all the existing frequency nodes. The data which I am putting or getting might be present in the last freqNode, but I'll traverse through all of them one by one.

Else, I can maintain another map in the memory to tell me the frequency of the current key.
This is comparatively easier since it'll reduce latency humungously.

Tradeoff, I have to allocate memory for another map.


