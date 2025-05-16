---
id: performance_faq.md
summary: >-
  Find answers to frequently asked questions about search performance,
  performance enhancements, and other performance related issues.
title: Performance FAQ
---
<h1 id="Performance-FAQ" class="common-anchor-header">Performance FAQ<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
<h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">How to set <code translate="no">nlist</code> and <code translate="no">nprobe</code> for IVF indexes?</h4><p>Setting <code translate="no">nlist</code> is scenario-specific. As a rule of thumb, the recommended value of <code translate="no">nlist</code> is <code translate="no">4 × sqrt(n)</code>, where <code translate="no">n</code> is the total number of entities in a segment.</p>
<p>The size of each segment is determined by the <code translate="no">datacoord.segment.maxSize</code> parameter, which is set to 512 MB by default. The total number of entities in a segment n can be estimated by dividing <code translate="no">datacoord.segment.maxSize</code> by the size of each entity.</p>
<p>Setting <code translate="no">nprobe</code> is specific to the dataset and scenario, and involves a trade-off between accuracy and query performance. We recommend finding the ideal value through repeated experimentation.</p>
<p>The following charts are results from a test running on the sift50m dataset and IVF_SQ8 index, which compares recall and query performance of different <code translate="no">nlist</code>/<code translate="no">nprobe</code> pairs.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
    <span>Accuracy test</span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" />
    <span>Performance test</span>
  </span>
</p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Why do queries sometimes take longer on smaller datasets?</h4><p>Query operations are conducted on segments. indexes reduce the amount of time it takes to query a segment. If a segment has not been indexed, Milvus resorts to brute-force search on the raw data—drastically increasing query time.</p>
<p>Therefore, it usually takes longer to query on a small dataset (collection) because it has not built index. This is because the sizes of its segments have not reached the index-building threshold set by <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Call <code translate="no">create_index()</code> to force Milvus to index segments that have reached the threshold but not yet been automatically indexed, significantly improving query performance.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">What factors impact CPU usage?</h4><p>CPU usage increases when Milvus is building indexes or running queries. In general, index building is CPU intensive except when using Annoy, which runs on a single thread.</p>
<p>When running queries, CPU usage is affected by <code translate="no">nq</code> and <code translate="no">nprobe</code>. When <code translate="no">nq</code> and <code translate="no">nprobe</code> are small, concurrency is low and CPU usage stays low.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Does simultaneously inserting data and searching impact query performance?</h4><p>Insert operations are not CPU intensive. However, because new segments may not have reached the threshold for index building, Milvus resorts to brute-force search—significantly impacting query performance.</p>
<p>The <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> parameter determines the index-building threshold for a segment, and is set to 1024 rows by default. See <a href="/docs/v2.3.x/system_configuration.md">System Configuration</a> for more information.</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">Is storage space released right after data deletion in Milvus?</h4><p>No, storage space will not be immediately released when you delete data in Milvus. Although deleting data marks entities as “logically deleted,” the actual space might not be freed instantly. Here’s why:</p>
<ul>
<li><strong>Compaction</strong>: Milvus automatically compacts data in the background. This process merges smaller data segments into larger ones and removes logically deleted data (entities marked for deletion) or data that has exceeded its Time-To-Live (TTL). However, compaction creates new segments while marking old ones as “Dropped.”</li>
<li><strong>Garbage Collection</strong>: A separate process called Garbage Collection (GC) periodically removes these “Dropped” segments, freeing up the storage space they occupied. This ensures efficient use of storage but can introduce a slight delay between deletion and space reclamation.</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">Can I see inserted, deleted, or upserted data immediately after the operation without waiting for a flush?</h4><p>Yes, in Milvus, data visibility is not directly tied to flush operations due to its storage-compute disaggregation architecture. You can manage data readability using consistency levels.</p>
<p>When selecting a consistency level, consider the trade-offs between consistency and performance. For operations requiring immediate visibility, use a “Strong” consistency level. For faster writes, prioritize weaker consistency (data might not be immediately visible). For more information, refer to <a href="/docs/v2.3.x/consistency.md">Consistency</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">Can indexing a VARCHAR field improve deletion speed?</h4><p>Indexing a VARCHAR field can speed up “Delete By Expression” operations, but only under certain conditions:</p>
<ul>
<li><strong>INVERTED Index</strong>: This index helps for <code translate="no">IN</code> or <code translate="no">==</code> expressions on non-primary key VARCHAR fields.</li>
<li><strong>Trie Index</strong>: This index helps for prefix queries (e.g., <code translate="no">LIKE prefix%</code>) on non-primary VARCHAR fields.</li>
</ul>
<p>However, indexing a VARCHAR field does not speed up:</p>
<ul>
<li><strong>Deleting by IDs</strong>: When the VARCHAR field is the primary key.</li>
<li><strong>Unrelated Expressions</strong>: When the VARCHAR field isn’t part of the delete expression.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Still have questions?</h4><p>You can:</p>
<ul>
<li>Check out <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> on GitHub. Feel free to ask questions, share ideas, and help others.</li>
<li>Join our <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slack Channel</a> to find support and engage with our open-source community.</li>
</ul>
