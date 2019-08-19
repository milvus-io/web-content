---
id: ReleaseNote
title: Release Note
sidebar_label: Milvus Release Notes 
---

# Milvus Release Notes
## Version 0.3.1

Release date: 2019-08-08

### Features

- Added a new type of index "IVFSQ" which could significantly improve the overall throughput of vector processing.

- Added a new metric of vector distance calculation "Inner Product", in addition to "Euclidean Distance".
- Added multiple parameters which optimizes index building, search precision and search speed. 

### Improvements

- When the data size is huge and cannot fit in the data file on one disk, you can add multiple secondary data storage directories on other disks.
- You can choose if to enable parallel computing of vectors by multiple threads, by configuring parameter "parallel_reduce".
- You can designate a portion of the memory for buffer usage of data insertion, by configuring parameter "insert_buffer_size".
- In regard to cache management, by configuring "cache_free_percent", you can now decide, when the cache reaches its capacity, how much data should be kept instead of being erased.
- You can enable simultaneous inserting and searching of vectors by setting "insert_cache_immediately" to *True*.
- Search results are evaluated based on the distances between search results and the target vectors, rather than the score. 

## Version 0.3.0

Release date: 2019-06-30

### Features

- Distributed architecture based on Celery
- MinIO based storage separation solution
- You can now delete a table
- ARM64 architecture is now supported

### Improvements

- File lifecycle management
- More interface on C++/Python SDK
- Lots of update on Milvus configure
- Mem table serialization and SSTable consolidation strategy improved
- Improved the Meta management implementation
- 90%+ unit test code coverage
- CMake makefile refactoring
- Improved the time range query

## Version 0.2.1
Release date: 2019-06-14

### Features

Added data loading and computation pipeline

### Improvements

You can now search data within a specific date range.

## Version 0.2.0
Release date: 2019-05-31

### Features

- Added C++/Python SDK
- Added monitoring items on Prometheus-based monitoring dashboard
- Added vector indexing built on Inverted File
- Single node Milvus realized
