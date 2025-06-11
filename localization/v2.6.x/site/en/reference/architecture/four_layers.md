---
id: four_layers.md
summary: Storage/computing disaggregation structure in Milvus.
title: Storage/Computing Disaggregation
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">Storage/Computing Disaggregation<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Following the principle of data plane and control plane disaggregation, Milvus comprises four layers that are mutually independent in terms of scalability and disaster recovery.</p>
<h2 id="Access-layer" class="common-anchor-header">Access layer<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>Composed of a group of stateless proxies, the access layer is the front layer of the system and endpoint to users. It validates client requests and reduces the returned results:</p>
<ul>
<li>Proxy is in itself stateless. It provides a unified service address using load balancing components such as Nginx, Kubernetes Ingress, NodePort, and LVS.</li>
<li>As Milvus employs a massively parallel processing (MPP) architecture, the proxy aggregates and post-process the intermediate results before returning the final results to the client.</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">Coordinator service<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>The coordinator service assigns tasks to the worker nodes and functions as the system’s brain. The tasks it takes on include cluster topology management, load balancing, timestamp generation, data declaration, and data management.</p>
<p>There are three coordinator types: root coordinator (root coord), data coordinator (data coord), and query coordinator (query coord).</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">Root coordinator (root coord)</h3><p>Root coord handles data definition language (DDL) and data control language (DCL) requests, such as create or delete collections, partitions, or indexes, as well as manage TSO (timestamp Oracle) and time ticker issuing.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">Query coordinator (query coord)</h3><p>Query coord manages topology and load balancing for the query nodes, and handoff from growing segments to sealed segments.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">Data coordinator (data coord)</h3><p>Data coord manages topology of the data nodes and index nodes, maintains metadata, and triggers flush, compact, and index building and other background data operations.</p>
<h2 id="Worker-nodes" class="common-anchor-header">Worker nodes<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>The arms and legs. Worker nodes are dumb executors that follow instructions from the coordinator service and execute data manipulation language (DML) commands from the proxy. Worker nodes are stateless thanks to separation of storage and computation, and can facilitate system scale-out and disaster recovery when deployed on Kubernetes. There are three types of worker nodes:</p>
<h3 id="Query-node" class="common-anchor-header">Query node</h3><p>Query node retrieves incremental log data and turn them into growing segments by subscribing to the log broker, loads historical data from the object storage, and runs hybrid search between vector and scalar data.</p>
<h3 id="Data-node" class="common-anchor-header">Data node</h3><p>Data node retrieves incremental log data by subscribing to the log broker, processes mutation requests, and packs log data into log snapshots and stores them in the object storage.</p>
<h3 id="Index-node" class="common-anchor-header">Index node</h3><p>Index node builds indexes.  Index nodes do not need to be memory resident, and can be implemented with the serverless framework.</p>
<h2 id="Storage" class="common-anchor-header">Storage<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage is the bone of the system, responsible for data persistence. It comprises meta storage, log broker, and object storage.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta storage</h3><p>Meta storage stores snapshots of metadata such as collection schema, and message consumption checkpoints. Storing metadata demands extremely high availability, strong consistency, and transaction support, so Milvus chose etcd for meta store. Milvus also uses etcd for service registration and health check.</p>
<h3 id="Object-storage" class="common-anchor-header">Object storage</h3><p>Object storage stores snapshot files of logs, index files for scalar and vector data, and intermediate query results. Milvus uses MinIO as object storage and can be readily deployed on AWS S3 and Azure Blob, two of the world’s most popular, cost-effective storage services. However, object storage has high access latency and charges by the number of queries. To improve its performance and lower the costs, Milvus plans to implement cold-hot data separation on a memory- or SSD-based cache pool.</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL storage</h3><p>Write-Ahead Log (WAL) storage is the foundation of data durability and consistency in distributed systems. Before any change is committed, it’s first recorded in a log—ensuring that, in the event of a failure, you can recover exactly where you left off.</p>
<p>Common WAL implementations include Kafka, Pulsar, and Woodpecker. Unlike traditional disk-based solutions, Woodpecker adopts a cloud-native, zero-disk design that writes directly to object storage. This approach scales effortlessly with your needs and simplifies operations by removing the overhead of managing local disks.</p>
<p>By logging every write operation ahead of time, the WAL layer guarantees a reliable, system-wide mechanism for recovery and consistency—no matter how complex your distributed environment grows.</p>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Read <a href="/docs/main_components.md">Main Components</a> for more details about the Milvus architecture.</li>
</ul>
