---
id: comparison.md
title: What is New in Milvus 2.0
summary: >-
  Learn about the design concepts and latest features for the most recent
  version of Milvus.
---
<h1 id="What-is-New-in-Milvus-20" class="common-anchor-header">What is New in Milvus 2.0<button data-href="#What-is-New-in-Milvus-20" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>We recommend that you try out Milvus 2.0. Here is why:</p>
<h2 id="Milvus-20-vs-1x-Cloud-native-distributed-architecture-highly-scalable-and-more" class="common-anchor-header">Milvus 2.0 vs. 1.x: Cloud-native, distributed architecture, highly scalable, and more<button data-href="#Milvus-20-vs-1x-Cloud-native-distributed-architecture-highly-scalable-and-more" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table class="comparison">
<thead>
    <tr>
        <th class="width20">&nbsp;</th>
        <th class="width40">Milvus 2.0</th>
        <th class="width40">Milvus 1.x</th>
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
        <td>Four levels of consistency:<li>Strong</li><li>Bounded Staleness</li><li>Session</li><li>Consistent prefix</li></td>
        <td>Eventual consistency</td>
    </tr>
    <tr>
        <th>Data types supported</th>
        <td><li>Vectors</li><li>Fixed-length scalars</li><li>String and text (in planning)</li></td>
        <td>Vectors</td>
    </tr>
    <tr>
        <th>Basic operations supported</th>
        <td><li>Data insertion</li><li>Data deletion</li><li>Data query</li><li>Approximate nearest neighbor (ANN) Search</li><li>Recurrent neural network (RNN) search (in planning)</li></td>
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
        <td><li>Python</li><li>Node.js</li><li>Go</li><li>Java</li><li>C++ (testing)</li></td>
        <td><li>Python</li><li>Java</li><li>Go</li><li>RESTful</li><li>C++</li></td>
    </tr>
    <tr>
        <th>Release status</th>
        <td>General available release</td>
        <td>Long-term support (LTS)</td>
    </tr>
</tbody>
</table>
<h2 id="Design-concepts" class="common-anchor-header">Design concepts<button data-href="#Design-concepts" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>As our next-generation cloud-native vector database, Milvus 2.0 is built around the following three principles:</p>
<p><strong>Cloud-native first:</strong> We believe that only architectures supporting storage and computing separation can scale on demand and take full advantage of the cloud’s elasticity. We’d also like to bring your attention to the microservice design of Milvus 2.0, which features read and write separation, incremental and historical data separation, and CPU-intensive, memory-intensive, and IO-intensive task separation. Microservices help optimize allocation of resources for the ever-changing heterogeneous workload.</p>
<p><strong>Logs as data:</strong> In Milvus 2.0, the log broker serves as the system’s backbone: All data insert and update operations must go through the log broker, and worker nodes execute CRUD operations by subscribing to and consuming logs. This design reduces system complexity by moving core functions such as data persistence and flashback down to the storage layer, and log pub-sub make the system even more flexible and better positioned for future scaling.</p>
<p><strong>Unified batch and stream processing:</strong> Milvus 2.0 implements the unified Lambda architecture, which integrates the processing of the incremental and historical data. Compared with the Kappa architecture, Milvus 2.0 introduces log backfill, which stores log snapshots and indexes in the object storage to improve failure recovery efficiency and query performance. To break unbounded (stream) data down into bounded windows, Milvus embraces a new watermark mechanism, which slices the stream data into multiple message packs according to write time or event time, and maintains a timeline for users to query by time.</p>
<h2 id="Product-highlights" class="common-anchor-header">Product highlights<button data-href="#Product-highlights" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>The costs of running a database involve not only runtime resource consumption, but also the potential learning costs and the operational and maintenance costs. Practically speaking, the more user-friendly a database is, the more likely it is going to save such potential costs. From Milvus’ calendar day one, ease of use is always put on the top of our list, and the latest Milvus 2.0 has quite a few to offer in the way of reducing such costs.</p>
<h4 id="Always-online" class="common-anchor-header">Always online</h4><p>Data reliability and service sustainability are the basic requirements for a database, and our strategy is &quot;fail cheap, fail small, and fail often&quot;.</p>
<ul>
<li>“Fail cheap” refers to storage and computing separation, which makes the handling of node failure recovery straightforward and at a low cost.</li>
<li>“Fail small” refers to the “divide and conquer” strategy, which simplifies the design complexity by having each coordinator service handle only a small portion of read/write/incremental/historical data.</li>
<li>“Fail often” refers to the introduction of chaos testing, which uses fault injection in a testing environment to simulate situations such as hardware failures and dependency failures and accelerate bug discovery.</li>
</ul>
<h4 id="Hybrid-search-between-scalar-and-vector-data" class="common-anchor-header">Hybrid search between scalar and vector data</h4><p>To leverage the synergy between structured and unstructured data, Milvus 2.0 supports both scalar and vector data and enables hybrid search between them. Hybrid search helps users find the approximate nearest neighbors that match filter criteria. Currently, Milvus supports relational operations such as EQUAL, GREATER THAN, and LESS THAN, and logical operations such as NOT, AND, OR, and IN.</p>
<h4 id="Tunable-consistency" class="common-anchor-header">Tunable consistency</h4><p>As a distributed database abiding by the PACELC theorem, Milvus 2.0 has to trade off between consistency and availability &amp; latency. In most scenarios, overemphasizing data consistency in production can be overkill because allowing a small portion of data to be invisible has little impact on the overall recall but can significantly improve the query performance. Still, we believe that consistency levels, such as strong, bounded staleness, and session, have their own unique application. Therefore, Milvus supports tunable consistency at the request level. Taking testing as an example, users may require strong consistency to ensure test results are absolutely correct.</p>
<h4 id="Time-travel" class="common-anchor-header">Time travel</h4><p>Data engineers often need to do data rollback to fix dirty data and code bugs. Traditional databases usually implement data rollback through snapshots or even data retrain. This could bring excessive overhead and maintenance costs. Milvus maintains a timeline for all data insert and delete operations, and users can specify a timestamp in a query to retrieve a data view at a specified point in time. With time travel, Milvus can also implement a lightweight data backup or data clone.</p>
<h4 id="ORM-Python-SDK" class="common-anchor-header">ORM Python SDK：</h4><p>Object-relational mapping (ORM) allows users to focus more on the upper-level business model than on the underlying data model, making it easier for developers to manage relations between collections, fields, and programs. To close the gap between proof of concept (PoC) for AI algorithms and production deployment, we engineered the object-relational mapping PyMilvus APIs, which can work with an embedded library, a standalone deployment, a distributed cluster, or even a cloud service. With a unified set of APIs, we provide users with a consistent user experience and reduce code migration or adaptation costs.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/python_orm.png" alt="ORM_Python_SDK" class="doc-image" id="orm_python_sdk" />
    <span>ORM_Python_SDK</span>
  </span>
</p>
<h4 id="Support-tools" class="common-anchor-header">Support tools</h4><ul>
<li><p><a href="/docs/v2.0.x/attu.md"><strong>Attu</strong></a> is Milvus’ graphical user interface offering practical functionalities such as cluster state management, meta management, and data query. The source code of Attu will also be open sourced as an independent project. We are looking for more contributors to join this effort.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus_cli#overview"><strong>Milvus CLI</strong></a> is Milvus’ command-line interface based on <a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK</a>, supporting database connection, data operations, and data export/import.</p></li>
<li><p><strong>Out-of-box experience (OOBE), faster deployment:</strong> Milvus 2.0 can be deployed using helm or Docker Compose.</p></li>
<li><p>Milvus 2.0 uses Prometheus, an open-source time-series database, to store performance and monitor data, and Grafana, an open observability platform, for metrics visualization.</p></li>
</ul>
