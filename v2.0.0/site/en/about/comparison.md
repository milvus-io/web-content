---
id: comparison.md
title: What is New in Milvus 2.0
---

# What is New in Milvus 2.0

With the release of Milvus 2.0, Milvus 1.x will be phasing out and we highly recommend you try out the newest version. Here is why:

## Design concepts
As our next-generation cloud-native vector database, Milvus 2.0 is designed based on the following three concepts:

**Cloud-native first:** We believe that only the architecture supporting storage and computing separation can make the most of the elasticity of the cloud to realize on-demand expansion. It is also worth mentioning that Milvus 2.0 embraces a micro-service design featuring read and write separation, real-time offline separation, and separation of CPU intensive/memory intensive/IO intensive services. This helps us always find the best resource allocation for the ever-changing heterogeneous workload. 

**Logs as data:** Milvus 2.0 introduces log broker as the system' backbone. Data insertion and update are made only through log broker only, and the worker nodes execute CRUD operations by **subscribing to logs**. The advantage of this design is that, on the one hand, the system relies on the storage layer to achieve data persistence and flashback and reduces the complexity of the system; on the other hand, the log subscription mechanism provides greater flexibility and makes the system better positioned for future expansion.

**Unified batch and streaming:** Milvus 2.0 implements the Kappa+ streaming architecture, which integrates the processing of the incremental and offline data. Compared with the Kappa architecture, Milvus introduces log backfill, which stores log snapshots and indexes in object storage and hence greatly improves failure recovery efficiency and query performance. Milvus uses the watermark mechanism to break up unbounded streaming data into bounded windows: it slices the streaming data into multiple message packs by write time (or event occurrence time) and maintains a timeline for users to query by time.

## Product highlights
As an open-source distributed vector database, Milvus always puts ease of use as its top priority in system design. The costs of running a database involve not only run-time resource consumption, but also operation and maintenance costs and learning costs. Milvus 2.0 offers a couple of features to reduce such costs.

#### Always online
Data reliability and service sustainability are the basic requirements for a database. Milvus is built on the philosophy of **"Fail cheap, fail small, fail often."** "Fail cheap" refers to storage and compute separation, which makes node failure recovery a breeze and at a low cost. "Fail small" is in line with Milvus' "divide and conquer" strategy, which greatly simplifies the design by having each coordinator service handle only a small portion of read/write/increment/historical data. "Fail often" refers to chaos testing, which uses fault injection in a testing environment to simulate scenarios such as hardware abnormalities and dependency failure and increases the likelihood of bug discovery.

#### Hybrid search between scalar and vector data
To make the most of structured and unstructured data, Milvus 2.0 supports storage of scalar and vector data and hybrid search between them. Hybrid search helps users find the approximate nearest neighbor that matches a filter criteria. For now, Milvus supports relational operations such as **EQUAL**, **GREATER THAN**, and **LESS THAN**, and logical operations such as **NOT**, **AND**, **OR**, and **IN**.

#### Tunable consistency
Milvus 2.0 is a distributed database based on log broker. To abide by PACELC theorem, it has to make a tradeoff between consistency and latency. In most of Milvus' scenarios, data inconsistency ought not to be a big issue because allowing for a small portion of data to be invisible has little impact on the overall recall but can greatly improve the query performance. Nevertheless, we believe that consistency levels, such as strong, bounded staleness, and session, still have their own unique scenarios. For example, in benchmark testing, users may require strong consistence to ensure correctness of the test results. Milvus supports tunable consistency upon request.

#### Time travel
Data engineers often have to resort to data rollback in case of dirty data and code bugs. Traditional databases usually implement data rollback through snapshots or even through data retrain, but this could bring prohibitive extra overhead and maintenance costs. Milvus maintains a timeline for all data insert and delete operations, and users can specify a timestamp in a query to retrieve a data view at a specified point in time. With time travel, Milvus can also implement a lightweight data backup or data clone.

#### ORM Python SDK：
Object relational mapping (ORM) allows users to focus more on the upper-level business model than on the underlying data model, facilitating the maintenance of relations between collections, fields, and programs. To close the gap between an AI proof of concept (PoC) and the actual production deployment, we've engineered Milvus ORM APIs that can be applied to an embedded library, a standalone deployment, a distributed cluster , or a cloud service. With a unified set of APIs, we provide our users with a consistent user experience and avoid issues such as cloud edge duplicated development and inconsistency between testing and production results.

![ORM_Python_SDK](../../../assets/python_orm.png)

#### Support tools
- **Milvus Insight** is Milvus's graphical user interface offering practical functionalities such as cluster state management, meta management, and data query. The source code of Milvus Insight will also be open sourced as an independent project. We are looking for more contributors joining the effort.

- **Out-of-the-box deployment:** Milvus 2.0 can be deployed using helm or docker-compose.

- Milvus 2.0 uses Prometheus, an open-source time-series database, to store performance and monitoring data, and relies on Grafana for metrics visualization.

## Milvus 2.0 vs. 1.x: Cloud-native, distributed architecture, highly scalable, and more

<table class="comparison">
<thead>
	<tr>
		<th>&nbsp;</th>
		<th>Milvus 2.0</th>
		<th>Milvus 1.x</th>
	</tr>
</thead>
	<tr>
		<th>Architecture</th>
		<td>Cloud native</td>
		<td>Shared storage</td>
	</tr>
<tbody>
	<tr>
		<th>Scalability</th>
		<td>500+ nodes</td>
		<td>1 to 32 read nodes with only one write node</td>
	</tr>
  	<tr>
		<th>Durability</th>
		<td><li>Object storage service (OSS)</li><li>Distributed file system (DFS)</li></td>
		<td><li>Local disk</li><li>Network file system (NFS)</li></td>
	</tr>
  	<tr>
		<th>Availability</th>
		<td>99.9%</td>
		<td>99%</td>		
	</tr>
	<tr>
		<th>Data consistency</th>
		<td>Three levels of consistency:<li>Strong</li><li>Bounded Staleness</li><li>Session</li><li>Consistent prefix</li></td>
		<td>Eventual consistency</td>
	</tr>
	<tr>
		<th>Data types supported</th>
		<td><li>Vectors</li><li>Fixed-length scalars</li><li>String and text (in planning)</li></td>
		<td>Vectors</td>
	</tr>
	<tr>
		<th>Basic operations supported</th>
		<td><li>Data insertion</li><li>Data deletion (in planning)</li><li>Data query</li><li>Approximate nearest neighbor (ANN) Search</li><li>Recurrent neural network (RNN) search (in planning)</li></td>
		<td><li>Data insertion</li><li>Data deletion</li><li>Approximate nearest neighbor (ANN) Search</li></td>
	</tr>
	<tr>
		<th>Advanced features</th>
		<td><li>Scalar filtering</li><li>Time Travel</li><li>Multi-site deployment and multi-cloud integration</li><li>Data management tools</li></td>
		<td><li>Mishards</li><li>Milvus DM</li></td>
	</tr>
	<tr>
		<th>Index types and libraries</th>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li><li>ScaNN (in planning)</li><li>On-disk index (in planning)</li></td>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li></td>
	</tr>
	<tr>
		<th>SDKs</th>
		<td><li>Python</li><li>Go (in planning)</li><li>RESTful (in planning)</li><li>C++ (in planning)</li></td>
		<td><li>Python</li><li>Java</li><li>Go</li><li>RESTful</li><li>C++</li></td>
	</tr>
	<tr>
		<th>Release status</th>
		<td>Release candidate. A stable version will be released in August.</td>
		<td>Long-term support (LTS)</td>
	</tr>
</tbody>
</table>
