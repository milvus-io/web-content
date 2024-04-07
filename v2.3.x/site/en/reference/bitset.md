---
id: bitset.md
summary: Learn about bitsets in Milvus.
title: Bitset
---

# Bitset

This topic introduces the bitset mechanism that helps enable key functionalities like attribute filtering and [delete operations](https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md) in Milvus.

## Overview

A bitset is a set of bits. Bits are elements with only two possible values, most typically `0` and `1`, or boolean values `true` and `false`. In Milvus, bitsets are arrays of bit numbers `0` and `1` that can be used to represent certain data compactly and efficiently as opposed to in ints, floats, or chars. A bit number is `0` by default and is only set to `1` if it meets certain requirements.

Operations on bitsets are conducted with [boolean logic](boolean.md), under which an output value is either valid or invalid, also denoted by `1` and `0` respectively. For example, [logical operator](https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators) `AND` can be used to compare two bitsets based on items in the same index positions and produces a new bitset with the results. If two items in a position are the same, then in the new bitset `1` will be written in that position; `0` if they are different.

## Implementation

Bitset is a simple yet powerful mechanism that helps Milvus perform attribute filtering, data deletion, and query with Time Travel.

### Attribute filtering

As bitsets contain only two possible values, they are perfect for storing results of [attribute filtering](https://milvus.io/docs/v2.1.x/hybridsearch.md). Data that meet the requirement of a given attribute filter are marked with `1`.

### Data deletion

Bitsets serve as a compact way to store information about whether a row in a segment is deleted. Deleted entities are marked with `1` in the corresponding bitset, which [will not be computed](https://milvus.io/blog/deleting-data-in-milvus.md) during a search or query.

## Examples

Here we present three examples that illustrate how bitsets are used in Milvus, with references to all three major implementations of bitsets discussed above. In all three cases, there is a segment with 8 entities and then a series of data manipulation language (DML) events takes place in the order shown below.

- Four of the entities, whose `primary_key`s are [1, 2, 3, 4] respectively, are inserted when the timestamp ``ts`` equals 100.  
- The rest four entities, whose `primary_key`s are [5, 6, 7, 8], are inserted when the timestamp ``ts`` equals 200.  
- Entities whose `primary_key`s are [7, 8] are deleted when the timestamp ``ts`` equals 300.  
- Only entities, whose `primary_key`s are [1, 3, 5, 7], satisfy the conditions of attribute filtering.

![Order of DML events](../../../assets/bitset_0.svg "Order of DML events.")

### Case one

In this case, a user sets `time_travel` as 150, which means that the user conducts a query on data that satisfy `ts = 150`. The bitset generation process is illustrated by Figure 1.

During the initial filtering stage, the `filter_bitset` should be `[1, 0, 1, 0, 1, 0, 1, 0]`, where entities [1, 3, 5, 7] are marked as `1` because they are valid filtering results.

However, entities [4, 5, 6, 7] were not inserted to the vector database when `ts` equals 150. Therefore, these four entities should be marked as 0 regardless of the filtering condition. Now the bitset result should be `[1, 0, 1, 0, 0, 0, 0, 0]`.

As discussed in [Data deletion](#data-deletion), entities that are marked with `1` are ignored during a search or query. The bitset result now needs to be flipped in order to be combined with the deletion bitmap, which gives us `[0, 1, 0, 1, 1, 1, 1, 1]`.

As for the deletion bitset `del_bitset`, the initial value should be `[0, 0, 0, 0, 0, 0, 1, 1]`. However, entities 7 and 8 are not deleted until `ts` is 300. Therefore, when `ts` is 150, entities 7 and 8 are still valid. As a result, the `del_bitset` value after Time Travel is `[0, 0, 0, 0, 0, 0, 0, 0]`.

Now we have two bitsets after Time Travel and attribute filtering: `filter_bitset` `[0, 1, 0, 1, 1, 1, 1, 1]` and `del_bitset` `[0, 0, 0, 0, 0, 0, 0, 0]`.  Combine these two bitsets with the `OR` binary logic operator. The ultimate value of result_bitset is `[0, 1, 0, 1, 1, 1, 1, 1]`, meaning only entities 1 and 3 will be computed in the following search or query stage.

![Figure 1. Search with Time Travel = 150.](../../../assets/bitset_1.jpg "Figure 1. Search with Time Travel = 150.")

### Case two

In this case, the user sets `time_travel` as 250. The bitset generation process is illustrated by Figure 2.

Like in case one, the initial `filter_bitset` is `[1, 0, 1, 0, 1, 0, 1, 0]`. 

All entities are in the vector database when `ts` = 250. Therefore, the `filter_bitset` stays the same when we factor in the timestamp. Again, we need to flip the result and get `[0, 1, 0, 1, 0, 1, 0, 1]`.

As for the deletion bitset `del_bitset`, the initial value is `[0, 0, 0, 0, 0, 0, 1, 1]`. However, entities 7 and 8 were not deleted until `ts` is 300. Therefore, when `ts` is 250, entities 7 and 8 are still valid. As a result, the `del_bitset` after Time Travel is `[0, 0, 0, 0, 0, 0, 0, 0]`. 

Now we have two bitsets after Time Travel and attribute filtering: `filter_bitset` `[0, 1, 0, 1, 0, 1, 0, 1]` and `del_bitset` `[0, 0, 0, 0, 0, 0, 0, 0]`. Combine these two bitsets with the `OR` binary logic operator. The result_bitset is `[0, 1, 0, 1, 0, 1, 0, 1]`. That is to say, only entites [1, 3, 5, 7] will be computed in the following search or query stage.

![Figure 2. Search with Time Travel = 250.](../../../assets/bitset_2.jpg "Figure 2. Search with Time Travel = 250.")

### Case three

In this case, the user sets `time_travel` as 350. The bitset generation process is illustrated by Figure 3. 

As with previous cases, the initial `filter_bitset` is `[0, 1, 0, 1, 0, 1, 0, 1]`. 

All entities are in the vector database when `ts`= 350. Therefore, the final, flipped `filter_bitset` is `[0, 1, 0, 1, 0, 1, 0, 1]`, the same as in case two.

As for the deletion bitset `del_bitset`, since entities 7 and 8 have already been deleted when `ts = 350`, therefore, the result of `del_bitset` is `[0, 0, 0, 0, 0, 0, 1, 1]`.

Now we have two bitsets after Time Travel and attribute filtering: `filter_bitset` `[0, 1, 0, 1, 0, 1, 0, 1]` and `del_bitset` `[0, 0, 0, 0, 0, 0, 1, 1]`.  Combine these two bitsets with the `OR` binary logic operator. The ultimate `result_bitset` is `[0, 1, 0, 1, 0, 1, 1, 1]`. That is to say, only entities [1, 3, 5] will be computed in the following search or query stage.

![Figure 3. Search with Time Travel = 350.](../../../assets/bitset_3.jpg "Figure 3. Search with Time Travel = 350.")

## What's next

Now that you know how bitsets work in Milvus, you might also want to:

- Learn how to [use strings to filter](https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md) your search results, or refer to [Hybrid Search](https://milvus.io/docs/hybridsearch.md) on our docs.
- Understand [how data are processed](https://milvus.io/docs/v2.1.x/data_processing.md) in Milvus.
