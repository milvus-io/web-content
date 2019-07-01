---
id: ReleaseNote
title: Release Note
sidebar_label: Milvus Release Notes 
---

# Milvus Release Notes
## Version 0.3.0
Release date: 2019-06-30

### Features

- Distributed architecture based on Celery
- MinIO based storage separation solution
- You can now delete a table
- ARM64 architecture is now supported
- Added SPTAG indexing 

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
