---
id: ReleaseNote
title: Release Note
sidebar_label: Milvus Release Notes
---

# Milvus版本发布说明
## 版本 0.3.0
发布日期：2019-06-30

### 主要功能

- 增加基于Celery的水平扩展方案
- 增加了基于MinIO的存储分离方案
- 增加了删除Table的功能
- 支持ARM64架构
- 新加入SPTAG索引查询

### 主要改进

- 更新了C++和Python的SDK
- 增加了获得Table行数的接口
- 增加了查询匹配度作为返回结果
- 改善了查询的性能
- 新增了更多的监控指标

## 版本 0.2.1
发布日期：2019-06-14

### 主要功能

增加了数据加载和计算的流水线

### 主要改进

支持基于时间范围的查询

## 版本 0.2.0
发布日期：2019-05-31

### 主要功能

- 添加基于C++和Python的SDK
- 增加基于Prometheus的监控指标
- 增加基于Inverted File Index的向量索引
- 实现单节点的Milvus
