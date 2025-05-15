---
id: performance_faq.md
summary: >-
  Find answers to frequently asked questions about search performance,
  performance enhancements, and other performance related issues.
title: ''
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
    <img translate="no" src="/docs/v2.1.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
    <span>Accuracy test</span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" />
    <span>Performance test</span>
  </span>
</p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Why do queries sometimes take longer on smaller datasets?</h4><p>Query operations are conducted on segments. indexes reduce the amount of time it takes to query a segment. If a segment has not been indexed, Milvus resorts to brute-force search on the raw data—drastically increasing query time.</p>
<p>Therefore, it usually takes longer to query on a small dataset (collection) because it has not built index. This is because the sizes of its segments have not reached the index-building threshold set by <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Call <code translate="no">create_index()</code> to force Milvus to index segments that have reached the threshold but not yet been automatically indexed, significantly improving query performance.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">What factors impact CPU usage?</h4><p>CPU usage increases when Milvus is building indexes or running queries. In general, index building is CPU intensive except when using Annoy, which runs on a single thread.</p>
<p>When running queries, CPU usage is affected by <code translate="no">nq</code> and <code translate="no">nprobe</code>. When <code translate="no">nq</code> and <code translate="no">nprobe</code> are small, concurrency is low and CPU usage stays low.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Does simultaneously inserting data and searching impact query performance?</h4><p>Insert operations are not CPU intensive. However, because new segments may not have reached the threshold for index building, Milvus resorts to brute-force search—significantly impacting query performance.</p>
<p>The <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> parameter determines the index-building threshold for a segment, and is set to 1024 rows by default. See <a href="/docs/v2.1.x/system_configuration.md">System Configuration</a> for more information.</p>
<h4 id="Still-have-questions" class="common-anchor-header">Still have questions?</h4><p>You can:</p>
<ul>
<li>Check out <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> on GitHub. Feel free to ask questions, share ideas, and help others.</li>
<li>Join our <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slack Channel</a> to find support and engage with our open-source community.</li>
</ul>
