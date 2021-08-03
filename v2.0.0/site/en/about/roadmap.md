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
| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- | 
| 2.0.0-rc      | Supports numerical scalar data types	       |        | done       |        |
| 2.0   | Supports string data types        | czs007, dragondriver	     | in progress       |        |
| 2.0   | Collection alias        | lsgrep       | in progress       |        |
| 2.1   | Supports Scalar bitmap/inverted Index for string and numeric data types        |        | pending       |        |
| 2.1   | Supports data life cycle management        |        | pending       |        |
| 2.1   | Automatic data partition        |        | pending       |        |
| 2.2   | Collection rename        |        | pending       |        |



#### DML

| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 2.0.0-rc      | Supports scalar filtering       |        | done       |        |
| 2.0.0-rc   | Supports for query by id        |         | done        |         |
| 2.0   | Supports query by expression        | fishpenguin        | in progress        |         |
| 2.0   | Supports delete by id        |         | pending        |         |
| 2.1   | Supports search by id        |         | pending        |         |
| 2.1   | Vector similarity search by distance        |         | pending        |         |
| 2.2   | Supports search/query result pagination	        |         | pending        |         |
| 2.2   | Supports upsert/primary key deduplication        |         | pending        |         |


#### Features

| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 2.0.0-rc      | Supports time travel to any specified point in time	       |        | done       |        |
| 2.0.0-rc   | Offers three levels of tunable consistency: strong, session, consistent prefix        |         | done        |         |
| 2.0      | Segment compaction       | sunby       | pending       |        |
| 2.0   | Implements dynamic load balancing        | sunby, xige-16        | pending        |         |
| 2.0      | mplements dynamic handoff       | xige-16, bigsheeper       | pending       |        |
| 2.0   | Calculate distance between embeddings        | yhmo        | in progress	        |         |
| 2.1      | Multi tenant support and access control       |        | pending       |        |
| 2.2   | Change data capture        |         | pending        |         |
| Long Term      | Adopts incremental backup       |        | pending       |        |
| Long Term   | Supports static data encryption        |         | pending        |         |
| Long Term      | Offers embedding-as-service through data importer/transformer       |        | pending       |        |


#### Performance/Cost

| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 2.0      | Milvus 2.0 performance benchmark and tuning       | czs007, dragondriver	       | pending       |        |
| 2.1   | Supports GPU Index building and embedding retrieval        | shengjun1985        | pending        |         |
| 2.1      | Data bulkload       |        | pending       |        |
| 2.1   | Adopts cost-based query optimization algorithm to improve hybrid search efficiency        |         | pending        |         |
| 2.1      | Supports ScaNN Index       |        | pending       |        |
| 2.2   | Supports on-disk vector indexing        |         | pending        |         |
| Long Term      | Supports FPGA and other Heterogeneous hardware       |        | pending       |        |
| Long Term   | Automatic index optimization        |         | pending        |         |



#### Stability

| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 2.0.0-rc      | Fully managed failure recovery and service discovery       |        | done       |        |
| 2.0.0-rc   | Python SDK test        |         | done        |         |
| 2.0      | Chaos test       |   yanliang567     | pending       |        |
| 2.0   | Pressure test        | del-zhenwu        | pending        |         |
| 2.1      | Supports segment in memory replicas       |        | done       |        |
| 2.1   | Flow control && back pressure support        |         | pending        |         |
| 2.2      | 	Query node resource isolation       |        | pending       |        |



#### Ease Of Use

| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 2.0.0-rc    | Helm installation       |        | done       |        |
| 2.0.0-rc    | Support of Milvus Insight, a Milvus visual management tool        |         | in progress        |         |
| 2.0      | Prometheus, Grafana and Jaeger support       | 	zwd1208       | in progress       |        |
| 2.0   | Milvus k8s operator        | 	zwd1208, jeffoverflow        | pending        |         |
| 2.1      | Multi datacenter deployment and multi-cloud integration       |        | pending       |        |
| 2.2   | Embedded Milvus that runs on laptops	        |         | pending        |         |
| Long Term      | Dynamic cluster expansion/shrink       |        | pending      |      |



#### SDK


| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 2.0.0-rc      | Python ORM-style APIs	       |        | done       |        |
| 2.0   | Merge Pymilvus ORM and Pymilvus        | XuanYang-cn        | in progress        |         |
| 2.0      | Supports NodeJs APIs       | nameczz,shanghaikid       | in progress       | SDK is ready to use, and We will keep updating it. <br/>  https://github.com/milvus-io/milvus-sdk-node       |
| 2.0   | Supports Java SDK        |         | pending         |         |
| 2.0      | Supports Go SDK       | congqixia       | in progress       |        |
| 2.1   | Supports Restful APIs        |         | pending        |         |
| 2.1      | Supports C++ SDK       |        | pending        |        |
| Long Term   | SQL-like Query Language        |         | pending        |         |


#### Integration

| **Version** | **Feature** | **Owner**   | **Status**  | **Comment** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 2.0      | Integrates S3	       |        | done       |        |
| 2.1  | Integrates Kafka       |       | pending        |         |
| 2.1    | Integrates JuiceFS       |        | pending       |    |
| 2.1  | Data stored over local/distributed filesystems      |         | pending         |         |
| 2.2     | Integrates distributed KV stores such as HBase/TiKV/FoundationDB     |        | pending      |        |
