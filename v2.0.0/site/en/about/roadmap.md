---
id: roadmap.md
title: Milvus Roadmap
---
# Milvus Roadmap

![Roadmap](../../../assets/roadmap.jpg)


## Milvus 2.0 time schedule

### Next few big releases:
- Milvus 2.1: 2021.11
- Milvus 2.2: 2022.2

### Roadmap features
#### DDL
- Milvus 2.0.0-rc - Supports numerical scalar data types **done**
- Milvus 2.0 - Supports string data types **czs007/dragondriver**
- Milvus 2.1 - Supports Scalar bitmap/inverted Index for string and numeric data types.
- Milvus 2.1 - Supports data life cycle management
- Milvus 2.1 - Automatic data partition
- Milvus 2.2 - Collection rename

#### DML
- Milvus 2.0.0-rc - Supports scalar filtering. **done**
- Milvus 2.0.0-rc - Supports for query by id. **done**
- Milvus 2.0 - Supports Query by expression **fishpenguin/FluorineDog**
- Milvus 2.0 - Supports delete by id **scsven**
- Milvus 2.1 - Supports search by id
- Milvus 2.1 - Vector similarity search by distance
- Milvus 2.2 - Supports search/query result pagination
- Milvus 2.2 - Supports upsert/primary key deduplication

#### Features
- Milvus 2.0.0-rc - Supports time travel to any specified point in time **done**
- Milvus 2.0.0-rc - Offers three levels of tunable consistency: strong, session, consistent prefix. **done**
- Milvus 2.0 - Segment compaction. **sunby**
- Milvus 2.0 - Implements dynamic load balancing. **sunby/xige-16**
- Milvus 2.0 - Implements dynamic handoff **xige-16/big sheeper**
- Milvus 2.1 - Multi tenant support and access control
- Milvus 2.2 - Change data capture
- Long Term - Adopts incremental backup
- Long Term - Supports static data encryption
- Long Term - Offers embedding-as-service through data importer/transformer

#### Performance/Cost
- Milvus 2.0 - Milvus 2.0 performance benchmark and tuning **czs007/dragondriver**
- Milvus 2.1 - Supports GPU Index building and embedding retrieval **shengjun1985**
- Milvus 2.1 - Data bulkload
- Milvus 2.1 - Adopts cost-based query optimization algorithm to improve hybrid search efficiency
- Milvus 2.1 - Supports ScaNN Index
- Milvus 2.2 - Supports on-disk vector indexing
- Long Term - Supports FPGA and other Heterogeneous hardware
- Long Term - Automatic index optimization

#### Stability
- Milvus 2.0.0-rc - Fully managed failure recovery and service discovery. **done**
- Milvus 2.0.0-rc - Python SDK test **done**
- Milvus 2.0 - Chaos test **yanliang567**
- Milvus 2.0 - Pressure test **del-zhenwu**
- Milvus 2.1 - Supports segment in memory replicas
- Milvus 2.1 - Flow control && back pressure support
- Milvus 2.2 - Query node resource isolation

#### Ease Of Use
- Milvus 2.0.0-rc - Helm installation **done**
- Milvus 2.0.0-rc - Support of Milvus Insight, a Milvus visual management tool **under improvement**
- Milvus 2.0 - Prometheus, Grafana and Jaeger support. **Waiting for document zwd1208**
- Milvus 2.0 - Milvus k8s operator **zwd1208, jeffoverflow**
- Milvus 2.1 - Multi datacenter deployment and multi-cloud integration
- Milvus 2.2 - Embedded Milvus that runs on laptops
- Long Term - Dynamic cluster expansion/shrink

#### SDK
- Milvus 2.0.0-rc - Python ORM-style APIs **done**
- Milvus 2.0.0- Merge Pymilvus ORM and Pymilvus **XuanYang-cn**
- Milvus 2.0 - Supports NodeJs/Java/Go APIs **NodeJs: nameczz/shanghaikid Go: congqixia
Java: waiting for self assign**
- Milvus 2.1 - Supports Restful/C++ APIs
- Long Term - SQL-like Query Language

#### Integration
- Milvus 2.0 - Integrates S3. **done**
- Milvus 2.1 - Integrates Kafka
- Milvus 2.1 - Integrates JuiceFS
- Milvus 2.1 - Data stored over local/distributed filesystems
- Milvus 2.2 - Integrates distributed KV stores such as HBase/TiKV/FoundationDB

