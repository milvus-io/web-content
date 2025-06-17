---
id: data_processing.md
summary: Learn about the data processing procedure in Milvus.
title: Data Processing
---
<h1 id="Data-Processing" class="common-anchor-header">Data Processing<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>This article provides a detailed description of the implementation of data insertion, index building, and data query in Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Data insertion<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>You can choose how many shards a collection uses in Milvus—each shard maps to a virtual channel (<em>vchannel</em>). As illustrated below, Milvus then assigns every <em>vchannel</em> to a physical channel (<em>pchannel</em>), and each <em>pchannel</em> is bound to a specific Streaming Node.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
    <span>VChannel PChannel and StreamingNode</span>
  </span>
</p>
<p>After data verification, the proxy will split the written message into various data package of shards according to the specified shard routing rules.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
    <span>Channels 1</span>
  </span>
</p>
<p>Then the written data of one shard (<em>vchannel</em>) is sent to the corresponding Streaming Node of <em>pchannel</em>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
    <span>write flow</span>
  </span>
</p>
<p>The Streaming Node assigns a Timestamp Oracle (TSO) to each data packet to establish a total ordering of operations. It performs consistency checks on the payload before writing it into the underlying write-ahead log (WAL). Once data is durably committed to the WAL, it’s guaranteed not to be lost—even in the event of a crash, the Streaming Node can replay the WAL to fully recover all pending operations.</p>
<p>Meanwhile, the StreamingNode also asynchronously chops the committed WAL entries into discrete segments. There are two segment types:</p>
<ul>
<li><strong>Growing segment</strong>: any data that has not been presisted into the object storage.</li>
<li><strong>Sealed segment</strong>: all data has been persisted into the object storage, the data of sealed segment is immutable.</li>
</ul>
<p>The transition of a growing segment into a sealed segment is called a flush. The Streaming Node triggers a flush as soon as it has ingested and written all available WAL entries for that segment—i.e., when there are no more pending records in the underlying write-ahead log—at which point the segment is finalized and made read-optimized.</p>
<h2 id="Index-building" class="common-anchor-header">Index building<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>Index building is performed by data node. To avoid frequent index building for data updates, a collection in Milvus is divided further into segments, each with its own index.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
    <span>Index building</span>
  </span>
</p>
<p>Milvus supports building index for each vector field, scalar field and primary field. Both the input and output of index building engage with object storage: The data node loads the log snapshots to index from a segment (which is in object storage) to memory, deserializes the corresponding data and metadata to build index, serializes the index when index building completes, and writes it back to object storage.</p>
<p>Index building mainly involves vector and matrix operations and hence is computation- and memory-intensive. Vectors cannot be efficiently indexed with traditional tree-based indexes due to their high-dimensional nature, but can be indexed with techniques that are more mature in this subject, such as cluster- or graph-based indexes. Regardless its type, building index involves massive iterative calculations for large-scale vectors, such as Kmeans or graph traverse.</p>
<p>Unlike indexing for scalar data, building vector index has to take full advantage of SIMD (single instruction, multiple data) acceleration. Milvus has innate support for SIMD instruction sets, e.g., SSE, AVX2, and AVX512. Given the “hiccup” and resource-intensive nature of vector index building, elasticity becomes crucially important to Milvus in economical terms. Future Milvus releases will further explorations in heterogeneous computing and serverless computation to bring down the related costs.</p>
<p>Besides, Milvus also supports scalar filtering and primary field query. It has inbuilt indexes to improve query efficiency, e.g., Bloom filter indexes, hash indexes, tree-based indexes, and inverted indexes, and plans to introduce more external indexes, e.g., bitmap indexes and rough indexes.</p>
<h2 id="Data-query" class="common-anchor-header">Data query<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Data query refers to the process of searching a specified collection for <em>k</em> number of vectors nearest to a target vector or for <em>all</em> vectors within a specified distance range to the vector. Vectors are returned together with their corresponding primary key and fields.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
    <span>Data query</span>
  </span>
</p>
<p>A collection in Milvus is split into multiple segments; the Streaming Node loads growing segments and maintains real-time data, while the Query Nodes load sealed segments.</p>
<p>When a query/search request arrives, the proxy broadcasts the request to all Streaming Nodes responsible for the related shards for concurrent search.</p>
<p>When a query request arrives, the proxy concurrently requests the Streaming Nodes that hold the corresponding shards to execute the search.</p>
<p>Each Streaming Node generates a query plan, searches its local growing data, and simultaneously contacts remote Query Nodes to retrieve historical results, then aggregates these into a single shard result.</p>
<p>Finally, the proxy collects all shard results, merges them into the final outcome, and returns it to the client.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
    <span>Handoff</span>
  </span>
</p>
<p>When the growing segment on a Streaming Node is flushed into a sealed segment—or when a Data Node completes a compaction—the Coordinator initiates a handoff operation to convert that growing data into historical data. The Coordinator then evenly distributes the sealed segments across all Query Nodes, balancing memory usage, CPU overhead, and segment count, and releases any redundant segment.</p>
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
<li>Learn about how to <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">use the Milvus vector database for real-time query</a>.</li>
<li>Learn about <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">data insertion and data persistence in Milvus</a>.</li>
<li>Learn how <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">data is processed in Milvus</a>.</li>
</ul>
