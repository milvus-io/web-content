---
id: streaming_service.md
title: Streaming Service
summary: >-
  The Streaming Service is a concept for Milvus internal streaming system
  module, built around the Write-Ahead Log (WAL) to support various
  streaming-related function.
---
<h1 id="Streaming-Service" class="common-anchor-header">Streaming Service<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p>The <strong>Streaming Service</strong> is a concept for Milvus internal streaming system module, built around the Write-Ahead Log (WAL) to support various streaming-related function. These include streaming data ingestion/subscription, fault recovery of cluster state, conversion of streaming data into historical data, and growing data queries. Architecturally, the Streaming Service is composed of three main components:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
    <span>Streaming Distributed Arc</span>
  </span>
</p>
<ul>
<li><p><strong>Streaming Coordinator</strong>: A logical component in the coordinator node. It uses Etcd for service discovery to locate available streaming nodes and is responsible for binding WAL to the corresponding streaming nodes. It also registers service to expose the WAL distribution topology, allowing streaming clients to know the appropriate streaming node for a given WAL.</p></li>
<li><p><strong>streaming Node Cluster</strong>: A cluster of streaming worker nodes responsible for all streaming-processing tasks, such as wal appending, state recovering, growing data querying.</p></li>
<li><p><strong>Streaming Client</strong>: An internally developed Milvus client that encapsulates basic functionalities such as service discovery and readiness checks. It is used to initiate operations such as message writing and subscription.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">Message<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>The Streaming Service is a log-driven streaming system, so all write operations in Milvus (such as DML and DDL) are abstracted as <strong>Messages</strong>.</p>
<ul>
<li><p>Every Message is assigned a <strong>Timestamp Oracle (TSO)</strong> field by the Streaming Service, which indicates the message’s order in the WAL. The ordering of messages determines the order of write operations in Milvus. This makes it possible to reconstruct the latest cluster state from the logs.</p></li>
<li><p>Each Message belongs to a specific <strong>VChannel</strong> (Virtual Channel) and maintains certain invariant properties within that channel to ensure operation consistency. For example, an Insert operation must always occur before a DropCollection operation on the same channel.</p></li>
</ul>
<p>The message order in Milvus may resemble the following:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
    <span>Message Order</span>
  </span>
</p>
<h2 id="WAL-Component" class="common-anchor-header">WAL Component<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>To support large-scale horizontal scalability, Milvus’s WAL is not a single log file, but a composite of multiple logs. Each log can independently support streaming functionality for multiple VChannels. At any given time, a WAL component is allowed to operate on <strong>exactly one streaming node</strong>, these constraint is promised by both a fencing mechanism of underlying wal storage and the streaming coordinator.</p>
<p>Additional features of the WAL component include:</p>
<ul>
<li><p><strong>Segment Lifecycle Management</strong>: Based on the policy such as memory conditions/ segment size/ segment idle time, the WAL manages the lifecycle of every segments.</p></li>
<li><p><strong>Basic Transaction Support</strong>: Since each message has a size limit, the WAL component supports simple transaction-level to promise atomic writes at the VChannel level.</p></li>
<li><p><strong>High-Concurrency Remote Log Writing</strong>: Milvus supports third-party remote message queues as WAL storage. For mitigating the round-trip latency (RTT) between streaming node and remote WAL storage to improve write throughput, the streaming service supports concurrent log writes. It maintains message order by TSO and TSO synchronization, and the messages in WAL are read in TSO order.</p></li>
<li><p><strong>Write-Ahead Buffer</strong>: After messages are written to the WAL, they are temporarily stored in a Write-Ahead Buffer. This enables tail reads of logs without fetching messages from remote WAL storage.</p></li>
<li><p><strong>Multiple WAL Storage supports</strong>: Woodpecker, Pulsar, Kafka. Use woodpecker with zero-disk mode, we can remove the remote WAL storage dependency.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">Recovery Storage<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>The <strong>Recovery Storage</strong> component always runs on the streaming node that corresponding WAL component located.</p>
<ul>
<li><p>It is responsible for converting streaming data into persisted historical data and storing it in object storage.</p></li>
<li><p>It also handles in-memory state recovery for the WAL component on the streaming node.</p></li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
    <span>Recovery Storage</span>
  </span>
</p>
<h2 id="Query-Delegator" class="common-anchor-header">Query Delegator<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p>The <strong>Query Delegator</strong> runs on each streaming node and is responsible for executing <strong>incremental queries</strong> on a single shard. It generates query plans, forwards them to the relevant Query Nodes, and aggregates the results.</p>
<p>In addition, the Query Delegator is responsible for broadcasting <strong>Delete operations</strong> to other Query Nodes.</p>
<p>The Query Delegator always coexists with the WAL component on the same streaming node. But if the collection is configured with multi-replica, then <strong>N-1</strong> Delegators will be deployed on the other streaming nodes.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">WAL Lifetime and Wait for Ready<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>By separating computing nodes from storage, Milvus can easily transfer WAL from one streaming node to another, achieving high availability in streaming service.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
    <span>wal lifetime</span>
  </span>
</p>
<h2 id="Wait-for-Ready" class="common-anchor-header">Wait for Ready<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>When wal is going to move to new streaming node, the client will find that old streaming node reject some requests. Meanwhile, the WAL will be recovered at new streaming node, the client will wait for the wal on new streaming node ready to serve.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
    <span>wait for ready</span>
  </span>
</p>
