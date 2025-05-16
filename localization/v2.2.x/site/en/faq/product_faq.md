---
id: product_faq.md
summary: >-
  Find answers to frequently asked questions about the world's most advanced
  vector database.
title: ''
---
<h1 id="Product-FAQ" class="common-anchor-header">Product FAQ<button data-href="#Product-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><!-- TOC -->
<!-- /TOC -->
<h4 id="How-much-does-Milvus-cost" class="common-anchor-header">How much does Milvus cost?</h4><p>Milvus is a 100% free open-source project.</p>
<p>Please adhere to <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a> when using Milvus for production or distribution purposes.</p>
<p>Zilliz, the company behind Milvus, also offers a fully managed cloud version of the platform for those that don’t want to build and maintain their own distributed instance. <a href="https://zilliz.com/cloud">Zilliz Cloud</a> automatically maintains data reliability and allows users to pay only for what they use.</p>
<h4 id="Does-Milvus-support-non-x86-architectures" class="common-anchor-header">Does Milvus support non-x86 architectures?</h4><p>Milvus cannot be installed or run on non-x86 platforms.</p>
<p>Your CPU must support one of the following instruction sets to run Milvus: SSE4.2, AVX, AVX2, AVX512. These are all x86-dedicated SIMD instruction sets.</p>
<h4 id="What-is-the-maximum-dataset-size-Milvus-can-handle" class="common-anchor-header">What is the maximum dataset size Milvus can handle?</h4><p>Theoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:</p>
<ul>
<li>Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.</li>
<li>When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.</li>
</ul>
<h4 id="Where-does-Milvus-store-data" class="common-anchor-header">Where does Milvus store data?</h4><p>Milvus deals with two types of data, inserted data and metadata.</p>
<p>Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage (for now MinIO only) as incremental log.</p>
<p>Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.</p>
<h4 id="Why-is-there-no-vector-data-in-etcd" class="common-anchor-header">Why is there no vector data in etcd?</h4><p>etcd stores Milvus module metadata; MinIO stores entities.</p>
<h4 id="Does-Milvus-support-inserting-and-searching-data-simultaneously" class="common-anchor-header">Does Milvus support inserting and searching data simultaneously?</h4><p>Yes. Insert operations and query operations are handled by two separate modules that are mutually independent. From the client’s perspective, an insert operation is complete when the inserted data enters the message queue. However, inserted data are unsearchable until they are loaded to the query node. If the segment size does not reach the index-building threshold (512 MB by default), Milvus resorts to brute-force search and query performance may be diminished.</p>
<h4 id="Can-vectors-with-duplicate-primary-keys-be-inserted-into-Milvus" class="common-anchor-header">Can vectors with duplicate primary keys be inserted into Milvus?</h4><p>Yes. Milvus does not check if vector primary keys are duplicates.</p>
<h4 id="When-vectors-with-duplicate-primary-keys-are-inserted-does-Milvus-treat-it-as-an-update-operation" class="common-anchor-header">When vectors with duplicate primary keys are inserted, does Milvus treat it as an update operation?</h4><p>No. Milvus does not currently support update operations and does not check if entity primary keys are duplicates. You are responsible for ensuring entity primary keys are unique, and if they aren’t Milvus may contain multiple entities with duplicate primary keys.</p>
<p>If this occurs, which data copy will return when queried remains an unknown behavior. This limitation will be fixed in future releases.</p>
<h4 id="What-is-the-maximum-length-of-self-defined-entity-primary-keys" class="common-anchor-header">What is the maximum length of self-defined entity primary keys?</h4><p>Entity primary keys must be non-negative 64-bit integers.</p>
<h4 id="What-is-the-maximum-amount-of-data-that-can-be-added-per-insert-operation" class="common-anchor-header">What is the maximum amount of data that can be added per insert operation?</h4><p>An insert operation must not exceed 1,024 MB in size. This is a limit imposed by gRPC.</p>
<h4 id="Does-collection-size-impact-query-performance-when-searching-in-a-specific-partition" class="common-anchor-header">Does collection size impact query performance when searching in a specific partition?</h4><p>No. If partitions for a search are specified, Milvus searches the specified partitions only.</p>
<h4 id="Does-Milvus-load-the-entire-collection-when-partitions-are-specified-for-a-search" class="common-anchor-header">Does Milvus load the entire collection when partitions are specified for a search?</h4><p>No. Milvus has varied behavior. Data must be loaded to memory before searching.</p>
<ul>
<li>If you know which partitions your data are located in, call <code translate="no">load_partition()</code> to load the intended partition(s) <em>then</em> specify partition(s) in the <code translate="no">search()</code> method call.</li>
<li>If you do not know the exact partitions, call <code translate="no">load_collection()</code> before calling <code translate="no">search()</code>.</li>
<li>If you fail to load collections or partitions before searching, Milvus returns an error.</li>
</ul>
<h4 id="Can-indexes-be-created-after-inserting-vectors" class="common-anchor-header">Can indexes be created after inserting vectors?</h4><p>Yes. If an index has been built for a collection by <code translate="no">create_index()</code> before, Milvus will automatically build an index for subsequently inserted vectors. However, Milvus does not build an index until the newly inserted vectors fill an entire segment and the newly created index file is separate from the previous one.</p>
<h4 id="How-are-the-FLAT-and-IVFFLAT-indexes-different" class="common-anchor-header">How are the FLAT and IVF_FLAT indexes different?</h4><p>The IVF_FLAT index divides vector space into list clusters. At the default list value of 16,384, Milvus compares the distances between the target vector and the centroids of all 16,384 clusters to return probe nearest clusters. Milvus then compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF_FLAT, FLAT directly compares the distances between the target vector and every other vector.</p>
<p>When the total number of vectors approximately equals nlist, there is little distance between IVF_FLAT and FLAT in terms of calculation requirements and search performance. However, as the number of vectors exceeds nlist by a factor of two or more, IVF_FLAT begins to demonstrate performance advantages.</p>
<p>See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information.</p>
<h4 id="How-does-Milvus-flush-data" class="common-anchor-header">How does Milvus flush data?</h4><p>Milvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus’ data node writes the data in the message queue to persistent storage as incremental logs. If <code translate="no">flush()</code> is called, the data node is forced to write all data in the message queue to persistent storage immediately.</p>
<h4 id="What-is-normalization-Why-is-normalization-needed" class="common-anchor-header">What is normalization? Why is normalization needed?</h4><p>Normalization refers to the process of converting a vector so that its norm equals 1. If inner product is used to calculate vector similarity, vectors must be normalized. After normalization, inner product equals cosine similarity.</p>
<p>See <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a> for more information.</p>
<h4 id="Why-do-Euclidean-distance-L2-and-inner-product-IP-return-different-results" class="common-anchor-header">Why do Euclidean distance (L2) and inner product (IP) return different results?</h4><p>For normalized vectors, Euclidean distance (L2) is mathematically equivalent to inner product (IP). If these similarity metrics return different results, check to see if your vectors are normalized</p>
<h4 id="Is-there-a-limit-to-the-total-number-of-collections-and-partitions-in-Milvus" class="common-anchor-header">Is there a limit to the total number of collections and partitions in Milvus?</h4><p>You can create a maximum of 65536 collections. The number of partitions in each collection must not exceed the value set by the parameter <code translate="no">master.maxPartitionNum</code>.</p>
<h4 id="Why-do-I-get-fewer-than-k-vectors-when-searching-for-topk-vectors" class="common-anchor-header">Why do I get fewer than k vectors when searching for <code translate="no">topk</code> vectors?</h4><p>Among the indexes that Milvus supports, IVF_FLAT and IVF_SQ8 implement the k-means clustering method. A data space is divided into <code translate="no">nlist</code> clusters and the inserted vectors are distributed to these clusters. Milvus then selects the <code translate="no">nprobe</code> nearest clusters and compares the distances between the target vector and all vectors in the selected clusters to return the final results.</p>
<p>If <code translate="no">nlist</code> and <code translate="no">topk</code> are large and nprobe is small, the number of vectors in the nprobe clusters may be less than <code translate="no">k</code>. Therefore, when you search for the <code translate="no">topk</code> nearest vectors, the number of returned vectors is less than <code translate="no">k</code>.</p>
<p>To avoid this, try setting <code translate="no">nprobe</code> larger and <code translate="no">nlist</code> and <code translate="no">k</code> smaller.</p>
<p>See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information.</p>
<h4 id="What-is-the-maximum-vector-dimension-supported-in-Milvus" class="common-anchor-header">What is the maximum vector dimension supported in Milvus?</h4><p>Milvus can manage vectors with up to 32,768 dimensions.</p>
<h4 id="Does-Milvus-support-Apple-M1-CPU" class="common-anchor-header">Does Milvus support Apple M1 CPU?</h4><p>Current Milvus release does not support Apple M1 CPU.</p>
<h4 id="What-data-types-does-Milvus-support-on-the-primary-key-field" class="common-anchor-header">What data types does Milvus support on the primary key field?</h4><p>In current release, Milvus support both INT64 and string.</p>
<h4 id="Is-Milvus-scalable" class="common-anchor-header">Is Milvus scalable?</h4><p>Yes. You can deploy Milvus cluster with multiple nodes via Helm Chart on Kubernetes. Refer to <a href="/docs/v2.2.x/scaleout.md">Scale Guide</a> for more instruction.</p>
<h4 id="Does-the-query-perform-in-memory-What-are-incremental-data-and-historical-data" class="common-anchor-header">Does the query perform in memory? What are incremental data and historical data?</h4><p>Yes. When a query request comes, Milvus searches both incremental data and historical data by loading them into memory. Incremental data are in the growing segments, which are buffered in memory before they reach the threshold to be persisted in storage engine, while historical data are from the sealed segments that are stored in the object storage. Incremental data and historical data together constitute the whole dataset to search.</p>
<h4 id="Is-Milvus-available-for-concurrent-search" class="common-anchor-header">Is Milvus available for concurrent search?</h4><p>Yes. For queries on the same collection, Milvus concurrently searches the incremental and historical data. However, queries on different collections are conducted in series. Whereas the historical data can be an extremely huge dataset, searches on the historical data are relatively more time-consuming and essentially performed in series.</p>
<h4 id="Why-does-the-data-in-MinIO-remain-after-the-corresponding-collection-is-dropped" class="common-anchor-header">Why does the data in MinIO remain after the corresponding collection is dropped?</h4><p>Data in MinIO is designed to remain for a certain period of time for the convenience of data rollback.</p>
<h4 id="Does-Milvus-support-message-engines-other-than-Pulsar" class="common-anchor-header">Does Milvus support message engines other than Pulsar?</h4><p>Yes. Kafka is supported in Milvus 2.1.0.</p>
<h4 id="Whats-the-diference-between-a-search-and-a-query" class="common-anchor-header">What’s the diference between a search and a query?</h4><p>In Milvus, a vector similarity search retrieves vectors based on similarity calculation and vector index acceleration. Unlike a vector similarity search, a vector query retrieves vectors via scalar filtering based on a boolean expression. The boolean expression filters on scalar fields or the primary key field, and it retrieves all results that match the filters. In a query, neither similarity metrics nor vector index is involved.</p>
<h4 id="Why-does-a-float-vector-value-have-a-precision-of-7-decimal-digits-in-Milvus" class="common-anchor-header">Why does a float vector value have a precision of 7 decimal digits in Milvus?</h4><p>Milvus stores vectors as Float32 arrays. A Float32 value has a precision of 7 decimal digits. Even with a Float64 value, such as 1.3476964684980388, Milvus stores it as 1.347696. Therefore, when you retrieve such a vector from Milvus, the precision of the Float64 value is lost.</p>
<h4 id="Still-have-questions" class="common-anchor-header">Still have questions?</h4><p>You can:</p>
<ul>
<li>Check out <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> on GitHub. You’re welcome to raise questions, share ideas, and help others.</li>
<li>Join our <a href="https://slack.milvus.io/">Slack community</a> to find support and engage with our open-source community.</li>
</ul>
