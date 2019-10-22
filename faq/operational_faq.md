---
id: operational_faq
title: Operational FAQ
sidebar_label: Operational FAQ
---

# Operational FAQ

### Why did my multiprocessing program failed? 

In order to successfully run multiprocessing in Milvus, make sure the following conditions are met: 

- No client is built in the main process
- Clients are created in each child process

Below is a good example, to enable multiprocessing of vector insertion and search in a table named `TABLE_NAME`, with `vector_1` already in it. Note that in such execution, the search scope does not include the vectors that are being inserted simultaneously.

```python
def test_add_vector_search_multiprocessing():
    '''
	target: test add vectors, and search it with multiprocessing
	method: set vectors_1[0] as query vectors
	expected: status ok and result length is 1
 	'''
    nq = 1000
    vectors_1 = gen_vec_list(nq)
    vectors_2 = gen_vec_list(nq)

 	def add_vectors_search(idx):
        if idx == 0:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status = add_vec_to_milvus(MILVUS, vectors_1)
            print("add", i, "finished")
            assert status.OK()
        elif idx == 1:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status, result = MILVUS.search_vectors(TABLE_NAME, 1, NPROBE, [vectors_1[0]])
            print(result)
            assert status.OK()
            assert len(result) == 1
  		else:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status = add_vec_to_milvus(MILVUS, vectors_2)
            print("add", i, "finished")
            assert status.OK()

    process_num = 3
 	processes = []
    for i in range(process_num):
        p = mp.Process(target=add_vectors_search, args=(i,))
        processes.append(p)
        p.start()
        print("process", i)
    for p in processes:
        p.join()
```

If a client already exists in the main process, enabling multiprocessing will lead to client hang and timeout. Below is a bad example to avoid, in which the `connect` is the client built in the main process.

```python
def test_add_vector_search_multiprocessing(self, connect, table):
    '''
	target: test add vectors, and search it with multiprocessing
	method: set vectors_1[0] as query vectors
	expected: status ok and result length is 1
	'''
    nq = 5
    vectors_1 = gen_vectors(nq, dim)
    vectors_2 = gen_vectors(nq, dim)

    status, ids = connect.add_vectors(table, vectors_1)
    time.sleep(3)

    status, count = connect.get_table_row_count(table)
    assert count == 5

  	def add_vectors_search(connect, idx):
        if (idx % 2) == 0:
            status, ids = connect.add_vectors(table, vectors_2)
            assert status.OK()
        else:
            status, result = connect.search_vectors(table, 1, [vectors_1[0]])
            assert status.OK()
            assert len(result) == 1

    process_num = 3
    processes = []
    for i in range(process_num):
        p = Process(target=add_vectors_search, args=(connect, i))
        processes.append(p)
        p.start()
    for p in processes:
        p.join()
```

### Why are the search results fewer than K when I try to search the top K vectors?

In all the indexing types that Milvus supports, `IVFLAT` and `IVF_SQ8` are cell-probe methods that employ a partitioning technique called k-means. The feature space is partitioned into `nlist` cells, and vectors are assigned  to one of these cells (to the centroid closest to the query), and stored in an inverted file structure formed of `nlist` inverted lists. When query occurs, only a set of `nprobe` inverted lists are selected.

If the `nlist` and K is relatively large, and `nprobe` is small enough, it happens that the vectors in `nprobe` lists are even fewer than K. Thus, when you search the top K vectors, the results would be fewer than K.

In order to avoid this situation, you can try increasing the value of `nprobe`, or smaller `nlist` and K.

### Related links

[Product FAQ](product_faq.md)


