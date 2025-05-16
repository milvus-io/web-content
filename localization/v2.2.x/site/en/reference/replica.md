---
id: replica.md
summary: Learn about in-memory replica in Milvus.
title: ''
---
<h1 id="In-Memory-Replica" class="common-anchor-header">In-Memory Replica<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the in-memory replica (replication) mechanism in Milvus that enables multiple segment replications in the working memory to improve performance and availability.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
    <span>Replica_Availiability</span>
  </span>
</p>
<p>With in-memory replicas, Milvus can load the same segment on multiple query nodes. If one query node has failed or is busy with a current search request when another arrives, the system can send new requests to an idle query node that has a replication of the same segment.</p>
<h3 id="Performance" class="common-anchor-header">Performance</h3><p>In-memory replicas allow you to leverage extra CPU and memory resources. It is very useful if you have a relatively small dataset but want to increase read throughput with extra hardware resources. Overall QPS (query per second) and throughput can be significantly improved.</p>
<h3 id="Availability" class="common-anchor-header">Availability</h3><p>In-memory replicas help Milvus recover faster if a query node crashes. When a query node fails, the segment does not have to be reloaded on another query node. Instead, the search request can be resent to a new query node immediately without having to reload the data again. With multiple segment replicas maintained simultaneously, the system is more resilient in the face of a failover.</p>
<h2 id="Key-Concepts" class="common-anchor-header">Key Concepts<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>In-memory replicas are organized as replica groups. Each replica group contains <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">shard</a> replicas. Each shard replica has a streaming replica and a historical replica that correspond to the growing and sealed <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segments</a> in the shard (i.e. DML channel).</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/replica_availability.jpg" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
    <span>An illustration of how in-memory replica works</span>
  </span>
</p>
<h3 id="Replica-group" class="common-anchor-header">Replica group</h3><p>A replica group consists of multiple <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">query nodes</a> that are responsible for handling historical data and replicas.</p>
<h3 id="Shard-replica" class="common-anchor-header">Shard replica</h3><p>A shard replica consists of a streaming replica and a historical replica, both belonging to the same <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">shard</a>. The number of shard replicas in a replica group is determined by the number of shards in a specified collection.</p>
<h3 id="Streaming-replica" class="common-anchor-header">Streaming replica</h3><p>A streaming replica contains all the <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">growing segments</a> from the same DML channel. Technically speaking, a streaming replica should be served by only one query node in one replica.</p>
<h3 id="Historical-replica" class="common-anchor-header">Historical replica</h3><p>A historical replica contains all the sealed segments from the same DML channel. The sealed segments of one historical replica can be distributed on several query nodes within the same replica group.</p>
<h3 id="Shard-leader" class="common-anchor-header">Shard leader</h3><p>A shard leader is the query node serving the streaming replica in a shard replica.</p>
<h2 id="Design-Details" class="common-anchor-header">Design Details<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">Balance</h3><p>A new segment that needs to be loaded will be allocated to multiple different query nodes. A search request can be processed once at least one replica is loaded successfully.</p>
<h3 id="Search" class="common-anchor-header">Search</h3><h4 id="Cache" class="common-anchor-header">Cache</h4><p>The proxy maintains a cache that maps segments to query nodes and updates it periodically. When the proxy receives a request, Milvus gets all sealed segments that need to be searched from the cache and try to assign them to the query nodes evenly.</p>
<p>For growing segments, the proxy also maintains a channel-to-query-node cache and sends requests to corresponding query nodes.</p>
<h4 id="Failover" class="common-anchor-header">Failover</h4><p>The caches on the proxy are not always up-to-date. Some segments or channels may have been moved to other query nodes when a request comes in. In this case, the proxy will receive an error response, update the cache and try to assign it to another query node.</p>
<p>A segment will be ignored if the proxy still cannot find it after updating the cache. This could happen if the segment has been compacted.</p>
<p>If the cache is not accurate, the proxy may miss some segments. Query nodes with DML channels (growing segments) return search responses along with a list of reliable segments  that the proxy can compare and update the cache with.</p>
<h3 id="Enhancement" class="common-anchor-header">Enhancement</h3><p>The proxy cannot allocate search requests to query nodes completely equally and query nodes may have different resources to serve search requests. To avoid a long-tailed distribution of resources, the proxy will assign active segments on other query nodes to an idle query node that also has these segments.</p>
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
<li>Learn how to <a href="/docs/v2.2.x/load_collection.md">load a collection</a> as multiple replicas.</li>
<li>Learn how to <a href="/docs/v2.2.x/load_partition.md">load a partition</a> as multiple replicas.</li>
</ul>
