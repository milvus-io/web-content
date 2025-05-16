---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
<h1 id="Release-Notes" class="common-anchor-header">Release Notes<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.3.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v2321" class="common-anchor-header">v2.3.21<button data-href="#v2321" class="anchor-icon" translate="no">
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
    </button></h2><p>Release data: August 14, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.21</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Miluvs v2.3.21 addresses a critical bug in data deletion (<a href="https://github.com/milvus-io/milvus/pull/35390">#35390</a>) and introduces some improvements in metrics and performance.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Enhanced data deletion process by modifying the delegator’s delete buffer handling  (<a href="https://github.com/milvus-io/milvus/pull/35074">#35074</a>)</li>
<li>Added metrics to track disk quota usage  (<a href="https://github.com/milvus-io/milvus/pull/35320">#35320</a>)</li>
<li>Reduced delegator memory usage by adjusting the overloaded factor to 0.1  (<a href="https://github.com/milvus-io/milvus/pull/35165">#35165</a>)</li>
<li>Improved health check by skipping manually stopped components (<a href="https://github.com/milvus-io/milvus/pull/35122">#35122</a>)</li>
<li>Added metric to record maxinsertrate and querynodememoryhighwaterlevel  (<a href="https://github.com/milvus-io/milvus/pull/35193">#35193</a>)</li>
<li>Upgraded the Conan version (<a href="https://github.com/milvus-io/milvus/pull/35217">#35217</a>)</li>
<li>Changed the default metric type for autoindex (<a href="https://github.com/milvus-io/milvus/pull/34328">#34328</a>)</li>
<li>Sped up the datacoord gc quit process (<a href="https://github.com/milvus-io/milvus/pull/35057">#35057</a>)</li>
<li>Avoided panic due to nil schema  (<a href="https://github.com/milvus-io/milvus/pull/35065">#35065</a>)</li>
<li>Reduced duplicate primary keys in the segcore component  (<a href="https://github.com/milvus-io/milvus/pull/35291">#35291</a>)</li>
<li>Tracked the number of times Milvus enters a force-deny-writing state (<a href="https://github.com/milvus-io/milvus/pull/34990">#34990</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Resolved an issue with the BloomFilter returning false negatives when the statslog contained multiple K values, which could occur when a delete operation failed to apply (<a href="https://github.com/milvus-io/milvus/pull/35390">#35390</a>)</li>
<li>Enabled a limiter for RESTful server (<a href="https://github.com/milvus-io/milvus/pull/35354">#35354</a>)</li>
<li>Added a retry mechanism to avoid getting incomplete query results (<a href="https://github.com/milvus-io/milvus/pull/35061">#35061</a>)</li>
<li>Fixed issues with delete-by-expression operations failing during retry progress  (<a href="https://github.com/milvus-io/milvus/pull/35421">#35421</a>)</li>
<li>Addressed a problem where the datanode binlog size metrics included dropped segments  (<a href="https://github.com/milvus-io/milvus/pull/35420">#35420</a>)</li>
<li>Resolved comparison operations between incompatible operands  (<a href="https://github.com/milvus-io/milvus/pull/35308">#35308</a>)</li>
<li>Fixed an issue where the datanode could not watch the channel (<a href="https://github.com/milvus-io/milvus/pull/35136">#35136</a>)</li>
<li>Addressed a deadlock issue on compaction when stopping the datanode (<a href="https://github.com/milvus-io/milvus/pull/35199">#35199</a>)</li>
</ul>
<h2 id="v2320" class="common-anchor-header">v2.3.20<button data-href="#v2320" class="anchor-icon" translate="no">
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
    </button></h2><p>Release data: July 25, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.20</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.20 brings several important bug fixes focused on enhancing segment management. This release also includes an upgrade to Go version 1.21, which allows the pprof tool to capture C++ code profiles, significantly aiding in diagnosing Milvus. Additionally, the Knowhere version has been updated to v2.2.7, enabling Milvus to be compiled with glibc versions ≤ 2.30. A new metric has been introduced to record the duration that requests wait in the proxy queue, improving Milvus’s observability.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li>Added a metric to record the duration of requests waiting in the proxy queue (<a href="https://github.com/milvus-io/milvus/pull/34791">#34791</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Upgraded Knowhere to version 2.2.7 (<a href="https://github.com/milvus-io/milvus/pull/34825">#34825</a>).</li>
<li>Upgraded Go version from 1.20 to 1.21 (<a href="https://github.com/milvus-io/milvus/pull/34759">#34759</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Initialized the hook when creating the proxy object (<a href="https://github.com/milvus-io/milvus/pull/34936">#34936</a>).</li>
<li>Fixed a parsing issue for the plan proto for search types (<a href="https://github.com/milvus-io/milvus/pull/34945">#34945</a>).</li>
<li>Resolved an issue where segments could bounce between delegator and worker (<a href="https://github.com/milvus-io/milvus/pull/34889">#34889</a>).</li>
<li>Prevented the generation of reduce channel tasks before channel balancing is complete (<a href="https://github.com/milvus-io/milvus/pull/34721">#34721</a>).</li>
<li>Avoided segment shortages caused by deduplicated segment tasks (<a href="https://github.com/milvus-io/milvus/pull/34882">#34882</a>).</li>
<li>Discarded compaction plans when closing DataSyncService (<a href="https://github.com/milvus-io/milvus/pull/34737">#34737</a>).</li>
<li>Fixed a typo in the compatible ascending index (<a href="https://github.com/milvus-io/milvus/pull/34712">#34712</a>).</li>
</ul>
<h2 id="v2319" class="common-anchor-header">v2.3.19<button data-href="#v2319" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: July 15, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.19</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.19 introduces significant improvements and bug fixes to enhance memory management, error handling, and query performance. This release continues to bolster the robustness and functionality of Milvus, ensuring optimal performance and user experience.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Preserved fixed-size memory in delegator node for growing segments (<a href="https://github.com/milvus-io/milvus/pull/34602">#34602</a>).</li>
<li>Refined Prometheus Buckets at different scales to improve monitoring precision (<a href="https://github.com/milvus-io/milvus/pull/34627">#34627</a>).</li>
<li>Avoided assigning too many segments/channels to new QueryNode, ensuring balanced load distribution (<a href="https://github.com/milvus-io/milvus/pull/34461">#34461</a>).</li>
<li>Provided clearer error messages when the string/varchar exceeded its max length (<a href="https://github.com/milvus-io/milvus/pull/34324">#34324</a>, <a href="https://github.com/milvus-io/milvus/pull/34034">#34034</a>).</li>
<li>Prevented memory slice increase during queries, optimizing memory usage (<a href="https://github.com/milvus-io/milvus/pull/34256">#34256</a>).</li>
<li>Sped up the loading process for small collections, reducing latency (<a href="https://github.com/milvus-io/milvus/pull/33863">#33863</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed error message when field name is invalid, improving user feedback (<a href="https://github.com/milvus-io/milvus/pull/33901">#33901</a>).</li>
<li>Ensured Segment Manager filters flushed segments correctly during import (<a href="https://github.com/milvus-io/milvus/pull/34650">#34650</a>).</li>
<li>Made knowhere-build-pool-size configurable on QueryNode for better resource management (<a href="https://github.com/milvus-io/milvus/pull/34647">#34647</a>).</li>
<li>Eliminated unnecessary vchannels’ merge when curTS is 0, optimizing performance (<a href="https://github.com/milvus-io/milvus/pull/34626">#34626</a>).</li>
<li>Fixed issue where IndexNode couldn’t be stopped due to a missing lifetime end (<a href="https://github.com/milvus-io/milvus/pull/34560">#34560</a>).</li>
<li>Enhanced RESTful API query to be more user-friendly (<a href="https://github.com/milvus-io/milvus/pull/34447">#34447</a>).</li>
<li>Checked load state of all partitions instead of just the first one, ensuring completeness (<a href="https://github.com/milvus-io/milvus/pull/34321">#34321</a>).</li>
<li>Implemented singleflight for segcore chunkcache to avoid redundant operations (<a href="https://github.com/milvus-io/milvus/pull/34284">#34284</a>).</li>
<li>Broadcasted collection’s new properties to DataCoord, ensuring consistency (<a href="https://github.com/milvus-io/milvus/pull/34147">#34147</a>).</li>
<li>DataCoord now returns checkpoint after successfully flushing segments (<a href="https://github.com/milvus-io/milvus/pull/34115">#34115</a>).</li>
<li>Checked nodeid wildcard when removing pkoracle, preventing potential errors (<a href="https://github.com/milvus-io/milvus/pull/34022">#34022</a>).</li>
<li>Ensured queries by primary key return the latest row rather than historical data, maintaining data accuracy (<a href="https://github.com/milvus-io/milvus/pull/34026">#34026</a>).</li>
</ul>
<h2 id="v2318" class="common-anchor-header">v2.3.18<button data-href="#v2318" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: June 19, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.18</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.18 includes several bug fixes and improvements to enhance query result quality and maintainability. This release also backports improvements and fixes from the 2.4 branch, which enhance control over delete data amounts (according to rate limit configuration) and increase Bloom filter processing speed. As with previous releases, this update reinforces Milvus’s commitment to functionality and robustness.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Added RESTful APIs to trigger component stop (<a href="https://github.com/milvus-io/milvus/pull/33798">#33798</a>).</li>
<li>Improved delete by expression to respect delete rate limit rules according to the matched data size instead of delete request size (<a href="https://github.com/milvus-io/milvus/pull/33794">#33794</a>).</li>
<li>Accelerated Bloom filter processing by submitting in batch and working in parallel (<a href="https://github.com/milvus-io/milvus/pull/33870">#33870</a>).</li>
<li>Enabled parallel processing for <code translate="no">applydelete</code> at the segment level (<a href="https://github.com/milvus-io/milvus/pull/33841">#33841</a>).</li>
<li>Printed <code translate="no">UseDefaultConsistency</code> parameter in read requests (<a href="https://github.com/milvus-io/milvus/pull/33645">#33645</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed a bug where closure capture iteration variable caused delete data to fail to apply to the correct data (<a href="https://github.com/milvus-io/milvus/pull/33912">#33912</a>).</li>
<li>Fixed a bug where filtered results could be less than topk by upgrading Knowhere to 2.2.10 (<a href="https://github.com/milvus-io/milvus/pull/33930">#33930</a>).</li>
<li>Fixed a bug where insert rate was not limited when <code translate="no">collection.insertrate.max.mb</code> config was set to 0 (<a href="https://github.com/milvus-io/milvus/pull/33725">#33725</a>).</li>
<li>Fixed a bug where old collections created before v2.2.8 could reappear and become zombies after being dropped and restarted (<a href="https://github.com/milvus-io/milvus/pull/33695">#33695</a>).</li>
<li>Fixed a bug where upsert latency used the wrong unit, causing abnormal metrics (<a href="https://github.com/milvus-io/milvus/pull/33580">#33580</a>).</li>
<li>Fixed a bug where Milvus exception info could not be passed outside of segcore (<a href="https://github.com/milvus-io/milvus/pull/33395">#33395</a>).</li>
</ul>
<h2 id="v2317" class="common-anchor-header">v2.3.17<button data-href="#v2317" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 31, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.17</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus version 2.3.17 primarily introduces several bug fixes to improve query accuracy, cluster reliability, and privilege maintenance. The most notable fix ensures that query iterators in Milvus return the correct number of results, rather than missing some data. This release reinforces Milvus’s commitment to functionality and robustness.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed issue where query iterators missed some results when upserts and deletes were performed very frequently (<a href="https://github.com/milvus-io/milvus/pull/33468">#33468</a>)</li>
<li>Fixed issue where the cluster could block during startup due to improper handling of standby status (<a href="https://github.com/milvus-io/milvus/pull/33371">#33371</a>)</li>
<li>Fixed issue where specifying the database name when granting privileges failed (<a href="https://github.com/milvus-io/milvus/pull/33292">#33292</a>)</li>
</ul>
<h2 id="v2316" class="common-anchor-header">v2.3.16<button data-href="#v2316" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 24, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.16</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.16 focuses on stability, performance, and security. It includes bug fixes for auto-balancing, checkpoint handling, memory leaks, and transaction limits. Additionally, authentication for the REST v2 API has been strengthened, and query result retrieval has been optimized. Overall, this update aims to provide a more reliable, efficient, and secure platform for your needs.</p>
<h2 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Enhanced authentication for the REST v2 API.(<a href="https://github.com/milvus-io/milvus/pull/33254">#33254</a>)</li>
<li>Improved checkpoint handling for message failures.(<a href="https://github.com/milvus-io/milvus/pull/33159">#33159</a>)(<a href="https://github.com/milvus-io/milvus/pull/33128">#33128</a>)</li>
<li>Improved the triggering mechanism for segment sync tasks so that it will only be triggered once by flushts (<a href="https://github.com/milvus-io/milvus/pull/33034">#33034</a>)</li>
<li>Improved the query result retrieval mechanism to get enough query results (<a href="https://github.com/milvus-io/milvus/pull/33177">#33177</a>)</li>
</ul>
<h2 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed a bug that when suspending auto balance querynode will unexpectedly exit stopping balance  (<a href="https://github.com/milvus-io/milvus/pull/32941">#32941</a>)</li>
<li>Resolved an issue leading to endless binlog path downloads during compaction (<a href="https://github.com/milvus-io/milvus/pull/33246">#33246</a>)</li>
<li>Addressed memory leaks in rendezvousflushmanager (<a href="https://github.com/milvus-io/milvus/pull/33112">#33112</a>)</li>
<li>Prevented system panics related to nil array field data (<a href="https://github.com/milvus-io/milvus/pull/33119">#33119</a>)</li>
<li>Fixed “SegmentNotLoaded” errors triggered by concurrent segment tasks in search (<a href="https://github.com/milvus-io/milvus/pull/33087">#33087</a>)</li>
<li>Fixed a bug that Etcd txn exceeds limit due to too many fields  (<a href="https://github.com/milvus-io/milvus/pull/33049">#33049</a>)</li>
<li>Fixed a bug related to the incorrect calculation of the milvus_rootcoord_indexed_entity_num metric (<a href="https://github.com/milvus-io/milvus/pull/33002">#33002</a>)</li>
</ul>
<h2 id="v2315" class="common-anchor-header">v2.3.15<button data-href="#v2315" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 11, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.15</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>This release comes with several enhancements and bug fixes to improve security and stability. One of the improvements is the inclusion of the channel checkpoint in the flush response. Another enhancement is the ability to check whether autoID is enabled during data insertion, which optimizes the data migration using Milvus-CDC.</p>
<p>The bug fixes address issues such as empty segments in meta, and incorrect data types during data insertion according to the schema. A critical patch has also been implemented to solve the consistent failure and retries of the syncDistribution request to the delegator. We highly recommend updating to the latest version to benefit from these fixes.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Supported return channel checkpoint info in flush response (<a href="https://github.com/milvus-io/milvus/pull/32683">#32683</a>)</li>
<li>Add config to check id during inserting data when autoID enabled  (<a href="https://github.com/milvus-io/milvus/pull/32840">#32840</a>)</li>
</ul>
<h3 id="Critical-Bug-Fixes" class="common-anchor-header">Critical Bug Fixes</h3><ul>
<li>Fixing a bug where the syncDistribution request to the delegator consistently fails and retries persistently. (<a href="https://github.com/milvus-io/milvus/pull/32923">#32923</a>)</li>
</ul>
<h3 id="Other-Bug-Fixes" class="common-anchor-header">Other Bug Fixes</h3><ul>
<li>Fixed a bug where the system could generate empty segments. Added support for the compactor to clean up empty segments. (<a href="https://github.com/milvus-io/milvus/pull/32690">#32690</a>)</li>
<li>Fixed a bug that involved validating whether the input data types match the schema. (<a href="https://github.com/milvus-io/milvus/pull/32790">#32790</a>, <a href="https://github.com/milvus-io/milvus/pull/32845">#32845</a>)</li>
</ul>
<h2 id="v2314" class="common-anchor-header">v2.3.14<button data-href="#v2314" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Apr 29, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.14</td><td>2.3.7</td><td>2.3.6</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>This release focuses on improving system performance, reliability, and observability with key features. It supports RESTful APIs to execute rolling upgrades, implements task-driven collection observation, allows for configurable intervals for garbage collection (GC), and enhances the check logic.</p>
<p>Furthermore, it fixes bugs in RESTful v2, resolving issues such as parameter parsing errors and ineffective parameter handling. Critical bug fixes related to deadlocks and data accuracy have also been included. Additionally, performance improvements have been made when handling large numbers of segments.</p>
<p>Overall, these updates aim to provide a more secure, efficient, and reliable user experience.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Added configuration items to skip Auto ID and Partition Key checks to improve check speed.(<a href="https://github.com/milvus-io/milvus/pull/32671">#32671</a>)</li>
<li>Implemented the collection observer of QueryCoordV2 task-driven.(<a href="https://github.com/milvus-io/milvus/pull/32615">#32615</a>)</li>
<li>Supported the get sdk type by user agent in access log.(<a href="https://github.com/milvus-io/milvus/pull/32554">#32554</a>)</li>
<li>Supported the use of different intervals for GC scan.(<a href="https://github.com/milvus-io/milvus/pull/32551">#32551</a>)</li>
<li>Removed the support for the always-true expression in delete expr.(<a href="https://github.com/milvus-io/milvus/pull/32495">#32495</a>)</li>
<li>Allowed users to disable search optimization.(<a href="https://github.com/milvus-io/milvus/pull/32143">#32143</a>)</li>
<li>Added restful api for devops to execute rolling upgrade.(<a href="https://github.com/milvus-io/milvus/pull/31846">#31846</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed the bug that the calculation precision may be different between growing index and sealed index.(<a href="https://github.com/milvus-io/milvus/pull/32584">#32584</a>)</li>
<li>Fixed the bug that grow task stuck when node become stopping.(<a href="https://github.com/milvus-io/milvus/pull/32556">#32556</a>)</li>
<li>Fixed the issue that leader view may not update when segment version did not match.(<a href="https://github.com/milvus-io/milvus/pull/32517">#32517</a>)</li>
<li>Fixed the bug that value in elementTypeParams not be integer in restful api.(<a href="https://github.com/milvus-io/milvus/pull/32362">#32362</a>)</li>
<li>Fixed dbName parameter of describeAlias request not take effect and fixed the issue which will report lack of permission when not pass the whole privileges to describe collection in restful api.  (<a href="https://github.com/milvus-io/milvus/pull/32162">#32162</a>)</li>
<li>Fixed cp lag metrics leakage by marking channel checkpoint dropped.(<a href="https://github.com/milvus-io/milvus/pull/32454">#32454</a>)</li>
<li>Fixed the bug where not update segment’s version in syncDistribution.(<a href="https://github.com/milvus-io/milvus/pull/32320">#32320</a>)</li>
<li>Fixed a bug that coordinator register blocked on ProcessActiveStandby.(<a href="https://github.com/milvus-io/milvus/pull/32133">#32133</a>)</li>
<li>Fixed a bug that the reduce didn’t handle offset without limit and reduceStopForBest correctly.(<a href="https://github.com/milvus-io/milvus/pull/32087">#32087</a>)</li>
<li>Fixed a bug that not validata PlaceholderGroups before combine them.(<a href="https://github.com/milvus-io/milvus/pull/32045">#32045</a>)</li>
<li>Fixed a bug where acquire index meta’s lock for each segment.(<a href="https://github.com/milvus-io/milvus/pull/31798">#31798</a>)</li>
<li>Fixed a bug that Rootcoord’s stop may block in quota_center’s stop.(<a href="https://github.com/milvus-io/milvus/pull/31824">#31824</a>)</li>
</ul>
<h2 id="v2313" class="common-anchor-header">v2.3.13<button data-href="#v2313" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Apr 7, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.13</td><td>2.3.7</td><td>2.3.5</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>This release aims to enhance system performance, reliability and observability with key features like improved index information retrieval, secure Minio connections via TLS, and new metrics for better monitoring.</p>
<p>This release has enriched the RESTful interfaces, allowing users to perform operations related to Partition and Index. Additionally, this release includes some critical bug fixes related to deadlocks and data integrity. Check the <a href="https://milvus.io/api-reference/restful/v2.3.x/About.md">RESTful API reference</a> for more details.</p>
<p>These updates aim to provide a more secure, efficient, and reliable user experience.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Optimized DescribeIndex performance by implementing bulk index information retrieval(<a href="https://github.com/milvus-io/milvus/pull/31239">#31239</a>)(<a href="https://github.com/milvus-io/milvus/pull/31429">#31429</a>)</li>
<li>Improved access efficiency to formatted keys by caching the formatted key of param item(<a href="https://github.com/milvus-io/milvus/pull/31402">#31402</a>)</li>
<li>Add metrics for querycoord current target cp lag(<a href="https://github.com/milvus-io/milvus/pull/31463">#31463</a>)</li>
<li>Implemented TLS support for Minio connections(<a href="https://github.com/milvus-io/milvus/pull/31292">#31292</a>)(<a href="https://github.com/milvus-io/milvus/pull/31619">#31619</a>)</li>
<li>Speed up target recovery after QueryCoord restart(<a href="https://github.com/milvus-io/milvus/pull/31449">#31449</a>)</li>
<li>Added new metrics for entities statistics(<a href="https://github.com/milvus-io/milvus/pull/31511">#31511</a>)</li>
<li>Implementing the API of the resultful(<a href="https://github.com/milvus-io/milvus/pull/30430">#30430</a>)</li>
<li>Save collection targets by batches(<a href="https://github.com/milvus-io/milvus/pull/31655">#31655</a>)</li>
<li>Added validation checks for the legality of field data types(<a href="https://github.com/milvus-io/milvus/pull/31699">#31699</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Fixed the issue in CurrentTargetFirst/NextTargetFirst where it would generate unexpected task behavior(<a href="https://github.com/milvus-io/milvus/pull/31419">#31419</a>)</li>
<li>Fixed the bug that does not cause the shard leader to fail when search fails(<a href="https://github.com/milvus-io/milvus/pull/31450">#31450</a>)</li>
<li>Fixed a bug where nodes were marked as unreachable when get client failure(<a href="https://github.com/milvus-io/milvus/pull/31451">#31451</a>)</li>
<li>Fixed client error handling to enable retries for certain types of unrecoverable errors instead of directly returning them(<a href="https://github.com/milvus-io/milvus/pull/31452">#31452</a>)</li>
<li>Fixed an issue where the balance channel would freeze due to deadlocks(<a href="https://github.com/milvus-io/milvus/pull/31455">#31455</a>)</li>
<li>Fixed a bug where nodeID was not checked when updating channel checkpoints(<a href="https://github.com/milvus-io/milvus/pull/31508">#31508</a>)</li>
<li>Fixed the incorrect use of double buffering for entry size exceeding the max size(<a href="https://github.com/milvus-io/milvus/pull/31549">#31549</a>)</li>
<li>Fixed a bug where delegator’s filtering removed all delete messages, making deleted messages temporarily accessible(<a href="https://github.com/milvus-io/milvus/pull/31587">#31587</a>)</li>
<li>Fixed a bug where the proxy’s context was canceled prematurely during session revocation(<a href="https://github.com/milvus-io/milvus/pull/31595">#31595</a>)</li>
<li>Fixed the target observer updates manual and automatic tasks were not mutually exclusive(<a href="https://github.com/milvus-io/milvus/pull/31603">#31603</a>)</li>
<li>Fixed a bug where channel metadata was updated even when nodeID did not match(<a href="https://github.com/milvus-io/milvus/pull/31665">#31665</a>)</li>
<li>Fixed a bug where compaction tasks were not cleaned up when releasing channels(<a href="https://github.com/milvus-io/milvus/pull/31694">#31694</a>)</li>
<li>Fixed a bug where the injection was invalid when the queue was empty(<a href="https://github.com/milvus-io/milvus/pull/31819">#31819</a>)</li>
<li>Fixed a bug where channel meta mergeFlushSegment was not idempotent cause data loss(<a href="https://github.com/milvus-io/milvus/pull/31837">#31837</a>)</li>
<li>Fixed the bug that Datacoord session disconnects before revoking it(<a href="https://github.com/milvus-io/milvus/pull/31747">#31747</a>)</li>
</ul>
<h2 id="v2312" class="common-anchor-header">v2.3.12<button data-href="#v2312" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Mar 15, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.12</td><td>2.3.7</td><td>2.3.4</td><td>2.3.6</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.12 is a bug-fix release that resolves data loss in some edge cases and includes several other minor fixes. The enhancements address the high memory usage of coordinators in instances with a large number of segments and the ARM image page size issue.</p>
<p>It is highly recommended to upgrade to this latest version to prevent data loss.</p>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>[Critical] Fixed a bug that some insert data would be lost when deleteBuf memory policy is triggered (<a href="https://github.com/milvus-io/milvus/pull/31159">#31159</a>)</li>
<li>Fixed a bug that some duplicated segments couldn’t be released after channel balancing  (<a href="https://github.com/milvus-io/milvus/pull/31126">#31126</a>)</li>
<li>Fixed a bug that the balance checker of the Querycoord used the wrong param item for check interval (<a href="https://github.com/milvus-io/milvus/pull/31141">#31141</a>)</li>
<li>Fixed a bug that database info could be incorrect when describing collection with ID  (<a href="https://github.com/milvus-io/milvus/pull/31177">#31177</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Change pagesize to 64k for AARCH64 platform (<a href="https://github.com/milvus-io/milvus/pull/31114">#31114</a>)</li>
<li>Introduce an internal API to list indexes meta and reduce memory usage during load collection (<a href="https://github.com/milvus-io/milvus/pull/31150">#31150</a>)(<a href="https://github.com/milvus-io/milvus/pull/31163">#31163</a>)</li>
</ul>
<h2 id="v2311" class="common-anchor-header">v2.3.11<button data-href="#v2311" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Mar 8, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.11</td><td>2.3.6</td><td>2.3.4</td><td>2.3.5</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.11 brings improvements and bug fixes aimed at enhancing performance, security, and stability. The improvements include optimized data loading, enhanced security with TLS support for Kafka connections, memory optimization, and more. Additionally, bug fixes address issues such as search/query failures, incorrect data types in outputs, and disk estimation errors. We encourage you to update to this latest version to take advantage of these enhancements and fixes.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Optimized JSON loading by reducing 1x memory copy (<a href="https://github.com/milvus-io/milvus/pull/30864">#30864</a>)</li>
<li>Implemented TLS support for Kafka connections (<a href="https://github.com/milvus-io/milvus/pull/30466">#30466</a> <a href="https://github.com/milvus-io/milvus/pull/30925">#30925</a>)</li>
<li>Optimized monitoring: Remove time tick delay metrics when nodes go offline (<a href="https://github.com/milvus-io/milvus/pull/30879">#30879</a>)</li>
<li>Optimized memory usage and loading speed for variable length data (<a href="https://github.com/milvus-io/milvus/pull/30900">#30900</a>)</li>
<li>Implemented support for varchar autoID in bulk insert operations (<a href="https://github.com/milvus-io/milvus/pull/30913">#30913</a>)</li>
<li>Added support for rate limiting for flush operations at the collection level (<a href="https://github.com/milvus-io/milvus/pull/29568">#29568</a>)</li>
<li>Improved compatibility for the watch DM channel request (<a href="https://github.com/milvus-io/milvus/pull/30954">#30954</a>)</li>
<li>Enhanced stability when reading S3 objects (<a href="https://github.com/milvus-io/milvus/pull/30976">#30976</a>)</li>
<li>Reduced contention for locks in the DescribeIndex operation (<a href="https://github.com/milvus-io/milvus/pull/30975">#30975</a>)</li>
<li>Optimized automatic balancing in QueryCoord (<a href="https://github.com/milvus-io/milvus/pull/30725">#30725</a>)</li>
<li>Enabled Milvus containers to run as a non-root user (<a href="https://github.com/milvus-io/milvus/pull/30937">#30937</a>)</li>
<li>Enhanced lock granularity in DataCoord meta (<a href="https://github.com/milvus-io/milvus/pull/30986">#30986</a>)</li>
<li>Enhanced memory estimation during loading by adding a load memory factor (<a href="https://github.com/milvus-io/milvus/pull/30999">#30999</a>)</li>
<li>Reduced memory consumption for DataNode when dealing with multiple collections (<a href="https://github.com/milvus-io/milvus/pull/30991">#30991</a>)</li>
<li>Optimized the connection manager in the proxy to prevent out-of-memory errors (<a href="https://github.com/milvus-io/milvus/pull/31009">#31009</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Fixed search/query failed caused by passing an incorrect context and missing error handling (<a href="https://github.com/milvus-io/milvus/pull/30818">#30818</a>)</li>
<li>Fixed incorrect data types in the output when using the RESTful query interface (<a href="https://github.com/milvus-io/milvus/pull/30738">#30738</a>)</li>
<li>Fixed incorrect disk estimation when loading disk index (or index with mmap enabled) (<a href="https://github.com/milvus-io/milvus/pull/30948">#30948</a>)</li>
<li>Fixed the issue where redundant segments with older versions may never be released (<a href="https://github.com/milvus-io/milvus/pull/30953">#30953</a>)</li>
<li>Fixed the issue where incorrect disk limits may be read (<a href="https://github.com/milvus-io/milvus/pull/30966">#30966</a>)</li>
<li>Fixed a series of issues with the RESTful interface, such as incorrect int64 precision and failed insertion (<a href="https://github.com/milvus-io/milvus/pull/30873">#30873</a>)</li>
<li>Fixed panic during rolling upgrade caused by compatibility issues (<a href="https://github.com/milvus-io/milvus/pull/30656">#30656</a>)</li>
<li>Fixed an issue where flush and compaction were stalled due to uncleared compaction tasks in the Datanode (<a href="https://github.com/milvus-io/milvus/pull/30972">#30972</a>)</li>
<li>Fixed frequent lock contention in the GetCompactionTo operation, which caused channel checkpoints lag (<a href="https://github.com/milvus-io/milvus/pull/30965">#30965</a>)</li>
<li>Fixed the issue where Datanode failed to update channel checkpoints with multiple collections (<a href="https://github.com/milvus-io/milvus/pull/31024">#31024</a> <a href="https://github.com/milvus-io/milvus/pull/31082">#31082</a>)</li>
<li>Fixed insertion failures caused by frequent contention for locks (<a href="https://github.com/milvus-io/milvus/pull/31026">#31026</a>)</li>
<li>Fixed proxy panic caused by missing error handling (<a href="https://github.com/milvus-io/milvus/pull/31086">#31086</a>)</li>
</ul>
<h2 id="v2310" class="common-anchor-header">v2.3.10<button data-href="#v2310" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Feb 23, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.10</td><td>2.3.6</td><td>2.3.4</td><td>2.3.5</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.10 is a critical patch release that follows Milvus v2.3.9, featuring several essential bug fixes. A significant fix in this release addresses the issue of missing data in hybrid search results when utilizing partition keys.</p>
<p>Users who have encountered hybrid search issues in release v2.3.5 through v2.3.9, especially those using partition key features, are highly recommended to upgrade to version v2.3.10 promptly.</p>
<h3 id="Critical-Bug-Fixes" class="common-anchor-header">Critical Bug Fixes</h3><ul>
<li>Fixed the upsert error where the primary key field was incorrectly treated as the PartitionKey field (<a href="https://github.com/milvus-io/milvus/issues/30607">Issue #30607</a>).</li>
<li>Prevented flush blockages by skipping the filling of segmentID in indexBuildCh (<a href="https://github.com/milvus-io/milvus/pull/30749">#30749</a>).</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Prevented accidental deletion of original data by avoiding the use of absolute paths in ChunkCache (<a href="https://github.com/milvus-io/milvus/pull/30679">#30679</a>).</li>
<li>Enforced the use of virtual host for Tencent Cloud object storage (<a href="https://github.com/milvus-io/milvus/pull/30685">#30685</a>).</li>
<li>Updated disk usage metrics following segment release (<a href="https://github.com/milvus-io/milvus/pull/30707">#30707</a>).</li>
<li>Released loaded growing segments if WatchDmlChannel fails (<a href="https://github.com/milvus-io/milvus/pull/30745">#30745</a>).</li>
<li>Resolved a panic caused by using a nil interface in the gRPC client (<a href="https://github.com/milvus-io/milvus/pull/30755">#30755</a>).</li>
</ul>
<h2 id="v239" class="common-anchor-header">v2.3.9<button data-href="#v239" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Feb 19, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.9</td><td>2.3.6</td><td>2.3.4</td><td>2.3.5</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus 2.3.9 is a critical patch release succeeding Milvus 2.3.8, incorporating a number of vital bug fixes. Key among these is the resolution of the DiskANN construction failure issue. <strong>We strongly advise users experiencing disk index construction problems in version 2.3.8 to upgrade to version 2.3.9 without delay</strong>.</p>
<h3 id="Critial-Bug-Fixes" class="common-anchor-header">Critial Bug Fixes</h3><ul>
<li>Fixed DiskANN construction failure in Milvus version 2.3.8 (<a href="https://github.com/milvus-io/milvus/pull/30640">#30640</a>).</li>
<li>Addressed loading failures due to inability to replace the primary key index (<a href="https://github.com/milvus-io/milvus/pull/30578">#30578</a>).</li>
<li>Added <code translate="no">collectionName</code> to the response of the ListAliases API (<a href="https://github.com/milvus-io/milvus/pull/30533">#30533</a>).</li>
</ul>
<h2 id="v238" class="common-anchor-header">v2.3.8<button data-href="#v238" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Feb 7, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.8</td><td>2.3.6</td><td>2.3.4</td><td>2.3.5</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.8 is a minor patch release following Milvus v2.3.7. This release includes several enhancements and bug fixes. These improvements are designed to enhance system stability and observability. One of the key bug fixes is to prevent BulkInsert from getting stuck after a node restart.</p>
<h2 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Improved error messaging for dimension mismatch in search vectors (<a href="https://github.com/milvus-io/milvus/pull/30316">#30316</a>)</li>
<li>Integrated Milvus build process details, including commit information and dependency identifiers, into monitoring metrics (<a href="https://github.com/milvus-io/milvus/pull/29666">#29666</a>)</li>
<li>Streamlined loading strategy for segment Binlog files to optimize performance (<a href="https://github.com/milvus-io/milvus/pull/30348">#30348</a>)</li>
<li>Expanded BulkInsert feature to accommodate auto-incrementing primary keys for VarChar types (<a href="https://github.com/milvus-io/milvus/pull/30448">#30448</a>)</li>
<li>Enhanced memory estimation algorithm during data loading to prevent out-of-memory (OOM) errors (<a href="https://github.com/milvus-io/milvus/pull/30475">#30475</a>)</li>
<li>Eliminated extraneous log messages for cleaner logging (<a href="https://github.com/milvus-io/milvus/pull/30478">#30478</a>)</li>
<li>Updated to Knowhere version 2.2.4 for improved functionality (<a href="https://github.com/milvus-io/milvus/pull/30513">#30513</a>)</li>
</ul>
<h2 id="Critical-Bug-Fixes" class="common-anchor-header">Critical Bug Fixes<button data-href="#Critical-Bug-Fixes" class="anchor-icon" translate="no">
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
<li>Fixed panic error caused by watching multiple channels in the Datanodes (<a href="https://github.com/milvus-io/milvus/pull/30136">#30136</a>)</li>
<li>Corrected reading of index parameters from the configuration file (<a href="https://github.com/milvus-io/milvus/pull/30353">#30353</a>)</li>
<li>Ensured effectiveness of the db_name parameter for DescribeAlias and ListAliases operations (<a href="https://github.com/milvus-io/milvus/pull/30453">#30453</a>)</li>
<li>Resolved proxy startup hang-up due to improper port occupation handling (<a href="https://github.com/milvus-io/milvus/pull/30416">#30416</a>)</li>
<li>Refactored BulkInsert Flush process to prevent hang-ups after restart (<a href="https://github.com/milvus-io/milvus/pull/30439">#30439</a>)</li>
</ul>
<h2 id="v237" class="common-anchor-header">v2.3.7<button data-href="#v237" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Jan 29, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.7</td><td>2.3.6</td><td>2.3.4</td><td>2.3.5</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.7 marks a minor yet impactful update, concentrating on boosting overall functionality and stability. In this release, we have refactored the business logic for a graceful stop to prevent any data loss, introduced support for array and JSON data types through RESTFul APIs, and amped up the speed of index loading. Alongside these enhancements, we’ve made several tweaks to optimize system performance and resource management. Additionally, this release addresses critical bug fixes as well as issues like memory leaks, load timeouts, and service unavailability, ensuring a more reliable and stable user experience.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li><p><strong>Limit Collection Counts</strong></p>
<p>A Milvus instance allows up to 65,536 collections. However, too many collections may result in performance issues. Therefore, it is recommended to limit the number of collections created in a Milvus instance. Read more on <a href="/docs/v2.3.x/limit_collection_counts.md">Limit Collection Counts</a>.</p></li>
<li><p><strong>Chunk Cache</strong></p>
<p>The chunk cache mechanism enables Milvus to pre-load data into cache memory on the local hard disk of the query nodes before it is needed. This mechanism significantly improves vector retrieval performance by reducing the time it takes to load data from disk to memory. Read more on <a href="/docs/v2.3.x/chunk_cache.md">Configure Chunk Cache</a></p></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Transform specific magic numbers into configurable options (<a href="https://github.com/milvus-io/milvus/pull/30070">#30070</a>).</li>
<li>Remove heartbeat delay logic for ShardLeader to prevent misjudging its availability (<a href="https://github.com/milvus-io/milvus/pull/30085">#30085</a>).</li>
<li>When allocating channels, shuffle ShardLeader candidates to avoid load imbalance (<a href="https://github.com/milvus-io/milvus/pull/30089">#30089</a>).</li>
<li>Enhance RESTful support by adding functionality for arrays and JSON (<a href="https://github.com/milvus-io/milvus/pull/30077">#30077</a>).</li>
<li>Add a counter monitoring for rate-limited requests (<a href="https://github.com/milvus-io/milvus/pull/30132">#30132</a>).</li>
<li>Accelerate index loading through concurrent methods (<a href="https://github.com/milvus-io/milvus/pull/30018">#30018</a>).</li>
<li>Remove the step of DataNode subscribing to the message stream during the Import phase to avoid Import timeouts (<a href="https://github.com/milvus-io/milvus/pull/30133">#30133</a>).</li>
<li>Introduce association logic between privileges to simplify the authorization process (<a href="https://github.com/milvus-io/milvus/pull/30154">#30154</a>).</li>
<li>Implement unified restrictions on the number of Collections, Partitions, and Shards (<a href="https://github.com/milvus-io/milvus/pull/30017">#30017</a>).</li>
<li>Incorporate proactive pre-warming logic for ChunkCache to mitigate the issue of high latency when retrieving raw vectors during cold start queries (<a href="https://github.com/milvus-io/milvus/pull/30289">#30289</a>)</li>
<li>Optimize the load balancing algorithm by assigning weight to growing segments (<a href="https://github.com/milvus-io/milvus/pull/30293">#30293</a>)</li>
<li>Remove unnecessary business logic for conversions between partition names and IDs to reduce latency in the data retrieve stage when processing search requests (<a href="https://github.com/milvus-io/milvus/pull/30255">#30255</a>)</li>
</ul>
<h3 id="Critical-Bug-Fixes" class="common-anchor-header">Critical Bug Fixes</h3><ul>
<li>Fixed a memory leak caused by incorrect usage of OpenTelemetry in the Segcore (<a href="https://github.com/milvus-io/milvus/pull/30068">#30068</a>).</li>
<li>Addressed the issue of slow disk index loading by dynamically patching the index parameters (<a href="https://github.com/milvus-io/milvus/pull/30116">#30116</a>).</li>
<li>Resolved the problem of changes made through the “alter collection” command not being persisted (<a href="https://github.com/milvus-io/milvus/pull/30156">#30156</a>).</li>
<li>Fixed the issue where read request rate limiting ultimately leads to the unavailability of the read service (<a href="https://github.com/milvus-io/milvus/pull/30196">#30196</a>).</li>
<li>Resolve the deadlock issue when getting the configuration (<a href="https://github.com/milvus-io/milvus/pull/30319">#30319</a>)</li>
<li>Fix incorrect usage of the Goroutine pool on CGO calls (<a href="https://github.com/milvus-io/milvus/pull/30275">#30275</a>)</li>
<li>Add a timeout mechanism to the graceful stop process to prevent potential cases of getting stuck(<a href="https://github.com/milvus-io/milvus/pull/30320">#30320</a>)</li>
</ul>
<h2 id="v235" class="common-anchor-header">v2.3.5<button data-href="#v235" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Jan 17, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.5</td><td>2.3.5</td><td>2.3.4</td><td>2.3.5</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus v2.3.5 marks a significant update focused on improving overall functionality and stability. In this release, we’ve made enhancements to Role-Based Access Control (RBAC) and Alias, prioritizing user-friendliness. Additionally, various improvements have been implemented to optimize system performance and resource management. A notable feature in v2.3.5 is the reintroduction of the MVCC (Multi-Version Concurrency Control) mechanism, crucial for efficiently managing concurrent and phased queries. This release also addresses critical bug fixes, preventing issues related to data deletion loss, abnormal system panics, and deadlocks, ensuring a more reliable and stable user experience.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li><strong>Role-Based Access Control (RBAC)</strong>
<ul>
<li>Authorize users to query grant information for their roles. (<a href="https://github.com/milvus-io/milvus/pull/29747">#29747</a>)</li>
<li>Feature: Add RBAC functionality to alias. (<a href="https://github.com/milvus-io/milvus/pull/29885">#29885</a>)</li>
</ul></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements:</h3><ul>
<li>Restore MVCC functionality (<a href="https://github.com/milvus-io/milvus/pull/29749">#29749</a>)</li>
<li>Add concurrency for DataCoord segment GC to increase garbage collection speed (<a href="https://github.com/milvus-io/milvus/pull/29557">#29557</a>)</li>
<li>Read Azure files without ReadAll to control memory usage (<a href="https://github.com/milvus-io/milvus/pull/29604">#29604</a>)</li>
<li>Support reading hardware metrics for cgroupv2 (<a href="https://github.com/milvus-io/milvus/pull/29847">#29847</a>)</li>
<li>Save lite WatchInfo into etcd in DataNode (<a href="https://github.com/milvus-io/milvus/pull/29751">#29751</a>)</li>
<li>Support access log printing cluster prefix (<a href="https://github.com/milvus-io/milvus/pull/29646">#29646</a>)</li>
<li>Rewrite generation segment plan based on assigning segments to make it more understandable (<a href="https://github.com/milvus-io/milvus/pull/29574">#29574</a>)</li>
<li>Performance:
<ul>
<li>Enhancement: Use GPU pool for GPU tasks (<a href="https://github.com/milvus-io/milvus/pull/29678">#29678</a>)</li>
<li>Cache collection schema attributes to reduce proxy CPU usage (<a href="https://github.com/milvus-io/milvus/pull/29668">#29668</a>)</li>
<li>Pre-allocate result FieldData space to reduce growing slices (<a href="https://github.com/milvus-io/milvus/pull/29726">#29726</a>)</li>
</ul></li>
</ul>
<h3 id="Critical-Bug-Fixes" class="common-anchor-header">Critical Bug Fixes:</h3><ul>
<li>Fix the delete message disorder issue causing data loss (<a href="https://github.com/milvus-io/milvus/pull/29917">#29917</a>)</li>
<li>Throw an exception when the upload file fails for DiskIndex to avoid core dump (<a href="https://github.com/milvus-io/milvus/pull/29628">#29628</a>)</li>
<li>Fix dynamic update of rate limit config with incorrect value (<a href="https://github.com/milvus-io/milvus/pull/29902">#29902</a>)</li>
<li>Ensure compact operation on DataCoord meta performs as a transaction (<a href="https://github.com/milvus-io/milvus/pull/29776">#29776</a>)</li>
<li>Fix panic caused by type assert LocalSegment on Segment (<a href="https://github.com/milvus-io/milvus/pull/29018">#29018</a>)</li>
<li>Drop segment meta info with a prefix to avoid etcd txn out of limit (<a href="https://github.com/milvus-io/milvus/pull/29857">#29857</a>)</li>
<li>Remove unnecessary lock-in config manager (<a href="https://github.com/milvus-io/milvus/pull/29855">#29855</a>)</li>
<li>Rectify memory leaks when reading data from Azure. (<a href="https://github.com/milvus-io/milvus/pull/30006">#30006</a>)</li>
<li>Resolve the issue of mistakenly duplicating dynamic fields when handling RESTful insert requests. (<a href="https://github.com/milvus-io/milvus/pull/30043">#30043</a>)</li>
<li>Rectify the deadlock issue in the BlockAll operation within the flowgraph. (<a href="https://github.com/milvus-io/milvus/pull/29972">#29972</a>)</li>
<li>Resolve the issue of failing to parse lengthy and complex expressions. (<a href="https://github.com/milvus-io/milvus/pull/30021">#30021</a>)</li>
</ul>
<h2 id="v234" class="common-anchor-header">v2.3.4<button data-href="#v234" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Jan 2, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.4</td><td>2.3.4</td><td>2.3.3</td><td>2.3.4</td><td>2.3.5</td></tr>
</tbody>
</table>
<p>Milvus 2.3.4 brings significant enhancements, focusing on availability and usability. The update introduces access logs for better monitoring and integrates Parquet for efficient bulk imports. A key feature is the binlog index on growing segments for faster searches. Major improvements include support for up to 10,000 collections/partitions, reduced memory usage, clearer error messages, quicker loading, and better query shard balance. It addresses critical issues like resource leakage, load/release failures, and concurrency challenges. However, it discontinues regular expression searches in partitions to save resources, with an option to re-enable this feature in the configuration.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li><p><strong>Access Logs</strong>:</p>
<ul>
<li>Milvus now supports access logs for monitoring external interfaces. These logs record method names, user requests, response times, and error codes.</li>
<li>Note: Currently, this feature supports only gRPC; RESTful requests are not included.</li>
<li>Doc page: <a href="https://milvus.io/docs/configure_access_logs.md">Configure Access Logs</a></li>
</ul></li>
<li><p><strong>Parquet File Import</strong>:</p>
<ul>
<li>This update introduces support for Parquet file imports, enhancing performance and memory efficiency. It also broadens data type support, including arrays and JSON.</li>
<li>This feature supersedes the previous limitation of JSON and NumPy formats.</li>
</ul></li>
<li><p><strong>Binlog Index on Growing Segments</strong>:</p>
<ul>
<li>Milvus now employs a binlog index on growing segments to enhance search efficiency, allowing for advanced indices like IVF or Fast Scann.</li>
<li>This improvement can increase search speeds in growing segments by up to tenfold.</li>
</ul></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li><p><strong>Expanded Collection/Partition Support</strong>:</p>
<ul>
<li>Milvus now supports up to 10,000 collections/partitions in a cluster, benefiting multi-tenant environments.</li>
<li>The improvement comes from timetick mechanism refinement, goroutine management, and memory usage improvement.</li>
<li>Note: Exceeding the recommended limit may affect failure recovery and resource usage. Recommended limit is 10,000 (Collection * Shard * Partition).</li>
</ul></li>
<li><p><strong>Reduced Memory Usage</strong>:</p>
<ul>
<li>Enhancements have been made to improve memory efficiency during various operations, including data retrieval and variable length data handling.</li>
</ul></li>
<li><p><strong>Refined Error Messaging</strong>:</p>
<ul>
<li>Error messages have been split into summaries and details for clearer understanding.</li>
</ul></li>
<li><p><strong>Accelerated Loading Speed</strong>:</p>
<ul>
<li>Various optimizations have been implemented to increase loading speeds, particularly in scenarios with frequent flushes and deletions.</li>
</ul></li>
<li><p><strong>Improved Query Shard Balance</strong>:</p>
<ul>
<li>Implemented balance channel in <code translate="no">querycoord</code> and other improvements for efficient shard management.</li>
</ul></li>
<li><p><strong>Other Enhancements</strong>:</p>
<ul>
<li>Includes security improvements, MMap support for index loading, partition-level privileges, and more.</li>
</ul></li>
</ul>
<h3 id="Critical-Bug-Fixes" class="common-anchor-header">Critical Bug Fixes</h3><ul>
<li><p><strong>Resource Leakage Fixes</strong>:</p>
<ul>
<li>Addressed critical memory leaks in Pulsar producer/consumer and improved garbage collection of meta snapshots.</li>
</ul></li>
<li><p><strong>Load/Release Failure Fixes</strong>:</p>
<ul>
<li>Resolved issues causing load/release operations to stall, especially in clusters with many segments.</li>
</ul></li>
<li><p><strong>Concurrency Issues</strong>:</p>
<ul>
<li>Fixed problems related to concurrent insertions, deletions, and queries.</li>
</ul></li>
<li><p><strong>Other Critical Fixes</strong>:</p>
<ul>
<li>Fixed an issue where upgrades from version 2.2 failed due to missing <code translate="no">CollectionLoadInfo</code>.</li>
<li>Fixed an issue where deletions might be lost because of errors in parsing compacted file logpaths (<a href="https://github.com/milvus-io/milvus/pull/29276">#29276</a>).</li>
<li>Fixed an issue where flush and compaction processes could become stuck under heavy insert/delete traffic.</li>
<li>Fixed the inability to perform compact operations on the array type (<a href="https://github.com/milvus-io/milvus/pull/29505">#29505</a>) (<a href="https://github.com/milvus-io/milvus/pull/29504">#29504</a>).</li>
<li>Fixed an issue where collections with more than 128 partitions failed to be released (<a href="https://github.com/milvus-io/milvus/pull/28567">#28567</a>).</li>
<li>Fixed an issue related to parsing expressions that include quotation marks (<a href="https://github.com/milvus-io/milvus/pull/28418">#28418</a>).</li>
<li>Addressed a failure in Azure Blob Storage’s <code translate="no">ListObjects</code> operation causing garbage collection failures (<a href="https://github.com/milvus-io/milvus/pull/27931">#27931</a>) (<a href="https://github.com/milvus-io/milvus/pull/28894">#28894</a>).</li>
<li>Fixed an issue with missing target database names in <code translate="no">RenameCollection</code> operations (<a href="https://github.com/milvus-io/milvus/pull/28911">#28911</a>).</li>
<li>Fixed an issue where iterators lost data in cases of duplicated results (<a href="https://github.com/milvus-io/milvus/pull/29406">#29406</a>) (<a href="https://github.com/milvus-io/milvus/pull/29446">#29446</a>).</li>
<li>Corrected the bulk insert binlog process to consider timestamp order when processing delta data (<a href="https://github.com/milvus-io/milvus/pull/29176">#29176</a>).</li>
<li>Fixed an issue to exclude insert data before a growing checkpoint (<a href="https://github.com/milvus-io/milvus/pull/29559">#29559</a>).</li>
<li>Addressed a problem where frequent flushing caused rate limits in Minio (<a href="https://github.com/milvus-io/milvus/pull/28625">#28625</a>).</li>
<li>Fixed an issue where creating growing segments could introduce an excessive number of threads (<a href="https://github.com/milvus-io/milvus/pull/29314">#29314</a>).</li>
<li>Fixed an issue in retrieving binary vectors from chunk cache (<a href="https://github.com/milvus-io/milvus/pull/28866">#28866</a>) (<a href="https://github.com/milvus-io/milvus/pull/28884">#28884</a>).</li>
<li>Fixed an issue where checkpoints were incorrectly updated after dropping a collection (<a href="https://github.com/milvus-io/milvus/pull/29221">#29221</a>).</li>
</ul></li>
</ul>
<h3 id="Breaking-Change" class="common-anchor-header">Breaking Change</h3><ul>
<li><strong>Discontinued Regular Expression Search in Partitions</strong>:
<ul>
<li>To reduce resource consumption, regular expression searches in partitions have been discontinued. However, this feature can be re-enabled through configuration (see <a href="https://github.com/milvus-io/milvus/pull/29154">#29154</a> for details).</li>
</ul></li>
</ul>
<h2 id="v233" class="common-anchor-header">v2.3.3<button data-href="#v233" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Nov 10, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.3</td><td>2.3.3</td><td>2.3.3</td><td>2.3.3</td><td>2.3.3</td></tr>
</tbody>
</table>
<p>Milvus 2.3.3 was a bugfix version that focused on minimizing business interruption during rolling upgrades to less than 30 seconds. Additionally, it aimed to enhance the performance of vector retrieval during searches. Critical bugs related to filtering on array types and the possible appearance of deleted data were addressed. Note that we also bumped Knowhere up to <a href="https://github.com/zilliztech/knowhere/releases/tag/v2.2.2">2.2.2</a> in this release.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><p>Supported pure list JSON in bulk insert (<a href="https://github.com/milvus-io/milvus/pull/28126">#28126</a>)</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Constructed a plan directly when searching with vector output (<a href="https://github.com/milvus-io/milvus/pull/27963">#27963</a>)</li>
<li>Removed binlog/delta log from getRecoveryInfoV2 (<a href="https://github.com/milvus-io/milvus/pull/27895">#27895</a>) (<a href="https://github.com/milvus-io/milvus/pull/28090">#28090</a>)</li>
<li>Refined code for fixed-length types array (<a href="https://github.com/milvus-io/milvus/pull/28109">#28109</a>)</li>
<li>Improved rolling upgrade unserviceable time
<ul>
<li>Refined stop order (<a href="https://github.com/milvus-io/milvus/pull/28016">#28016</a>) (<a href="https://github.com/milvus-io/milvus/pull/28089">#28089</a>)</li>
<li>Set qcv2 index task priority to Low (<a href="https://github.com/milvus-io/milvus/pull/28117">#28117</a>) (<a href="https://github.com/milvus-io/milvus/pull/28134">#28134</a>)</li>
<li>Removed retry in getShards (<a href="https://github.com/milvus-io/milvus/pull/28011">#28011</a>) (<a href="https://github.com/milvus-io/milvus/pull/28091">#28091</a>)</li>
<li>Fixed load index for stopping node (<a href="https://github.com/milvus-io/milvus/pull/28047">#28047</a>) (<a href="https://github.com/milvus-io/milvus/pull/28137">#28137</a>)</li>
<li>Fixed retry on offline node (<a href="https://github.com/milvus-io/milvus/pull/28079">#28079</a>) (<a href="https://github.com/milvus-io/milvus/pull/28139">#28139</a>)</li>
<li>Fixed QueryNode panic while upgrading (<a href="https://github.com/milvus-io/milvus/pull/28034">#28034</a>) (<a href="https://github.com/milvus-io/milvus/pull/28114">#28114</a>)</li>
<li>Fixed coordinator fast restart by deleting old session (<a href="https://github.com/milvus-io/milvus/pull/28205">#28205</a>)</li>
<li>Fixed check grpc error logic (<a href="https://github.com/milvus-io/milvus/pull/28182">#28182</a>) (<a href="https://github.com/milvus-io/milvus/pull/28218">#28218</a>)</li>
<li>Delayed the cancellation of ctx when stopping the node (<a href="https://github.com/milvus-io/milvus/pull/28249">#28249</a>)</li>
<li>Disabled auto balance when an old node exists (<a href="https://github.com/milvus-io/milvus/pull/28191">#28191</a>) (<a href="https://github.com/milvus-io/milvus/pull/28224">#28224</a>)</li>
<li>Fixed auto balance block channel reassign after datanode restart (<a href="https://github.com/milvus-io/milvus/pull/28276">#28276</a>)</li>
<li>Fixed retry when proxy stopped (<a href="https://github.com/milvus-io/milvus/pull/28263">#28263</a>)</li>
</ul></li>
<li>Reduced useless ObjectExists in AzureBlobManager (<a href="https://github.com/milvus-io/milvus/pull/28157">#28157</a>)</li>
<li>Got vector concurrently (<a href="https://github.com/milvus-io/milvus/pull/28119">#28119</a>)</li>
<li>Forced set Aliyun use_virtual_host to true for all (<a href="https://github.com/milvus-io/milvus/pull/28237">#28237</a>)</li>
<li>Fixed delete session key with prefix causing multiple QueryNode crashes (<a href="https://github.com/milvus-io/milvus/pull/28267">#28267</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Fixed script stop unable to find Milvus process (<a href="https://github.com/milvus-io/milvus/pull/27958">#27958</a>)</li>
<li>Fixed timestamp reordering issue with delete records (<a href="https://github.com/milvus-io/milvus/pull/27941">#27941</a>) (<a href="https://github.com/milvus-io/milvus/pull/28113">#28113</a>)</li>
<li>Fixed prefix query with longer subarray potentially causing a crash (<a href="https://github.com/milvus-io/milvus/pull/28112">#28112</a>)</li>
<li>Limited max thread num for pool (<a href="https://github.com/milvus-io/milvus/pull/28018">#28018</a>) (<a href="https://github.com/milvus-io/milvus/pull/28115">#28115</a>)</li>
<li>Fixed sync distribution with the wrong version (<a href="https://github.com/milvus-io/milvus/pull/28130">#28130</a>) (<a href="https://github.com/milvus-io/milvus/pull/28170">#28170</a>)</li>
<li>Added a custom HTTP header: Accept-Type-Allow-Int64 for JS client (<a href="https://github.com/milvus-io/milvus/pull/28125">#28125</a>)</li>
<li>Fixed bug for constructing ArrayView with fixed-length type (<a href="https://github.com/milvus-io/milvus/pull/28186">#28186</a>)</li>
<li>Fixed bug for setting index state when IndexNode connecting failed (<a href="https://github.com/milvus-io/milvus/pull/28221">#28221</a>)</li>
<li>Fixed bulk insert bug that segments are compacted after import (<a href="https://github.com/milvus-io/milvus/pull/28227">#28227</a>)</li>
<li>Fixed the target updated before version updated to cause data missing (<a href="https://github.com/milvus-io/milvus/pull/28257">#28257</a>)</li>
<li>Handled exceptions while loading (<a href="https://github.com/milvus-io/milvus/pull/28306">#28306</a>)</li>
</ul>
<h2 id="v232" class="common-anchor-header">v2.3.2<button data-href="#v232" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Oct 26, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.2</td><td>2.3.2</td><td>2.3.2</td><td>2.3.2</td><td>2.3.3</td></tr>
</tbody>
</table>
<p>We’re thrilled to unveil Milvus 2.3.2, enriched with an array of novel features. Experience support for array data types, delve into intricate delete expressions, and celebrate the return of binary metric types such as SUBSTRUCTURE/SUPERSTRUCTURE.</p>
<p>This release promises enhanced performance through minimized data copying during loading and better bulk insertions. Coupled with heightened error messaging and handling, you’re in for a smoother experience. Notably, our commitment to rolling upgrade stability ensures minimized service disruptions during updates.</p>
<h3 id="Breaking-Changes" class="common-anchor-header">Breaking Changes</h3><ul>
<li>Discontinued TimeTravel in compactor (<a href="https://github.com/milvus-io/milvus/pull/26785">#26785</a>)</li>
<li>Phased out mysql metastore (<a href="https://github.com/milvus-io/milvus/pull/26633">#26633</a>)</li>
</ul>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><ul>
<li>Array datatype now supported (<a href="https://github.com/milvus-io/milvus/pull/26369">#26369</a>)
<ul>
<li>Doc page: <a href="https://milvus.io/docs/array_data_type.md">Use Array Fields</a></li>
</ul></li>
<li>Introduced complex delete expressions (<a href="https://github.com/milvus-io/milvus/pull/25752">#25752</a>)
<ul>
<li>Doc page: <a href="https://milvus.io/docs/delete_data.md">Delete Entities</a></li>
</ul></li>
<li>Reintroduced binary metric types SUBSTRUCTURE/SUPERSTRUCTURE (<a href="https://github.com/milvus-io/milvus/pull/26766">#26766</a>)</li>
<li>Vector index mmap now available (<a href="https://github.com/milvus-io/milvus/pull/26750">#26750</a>)</li>
<li>CDC: Added capability to replicate mq messages (<a href="https://github.com/milvus-io/milvus/pull/27240">#27240</a>)</li>
<li>Facilitated renaming of database names within collections (<a href="https://github.com/milvus-io/milvus/pull/26543">#26543</a>)</li>
<li>Activated bulk insert of binlog data with partition keys (<a href="https://github.com/milvus-io/milvus/pull/27241">#27241</a>)</li>
<li>Enhanced support for multiple index engines (<a href="https://github.com/milvus-io/milvus/pull/27178">#27178</a>)</li>
<li>Introduced chunk cache to fetch raw vectors:
<ul>
<li>Newly added ChunkCache facilitates vector retrieval from storage (<a href="https://github.com/milvus-io/milvus/pull/26142">#26142</a>)</li>
</ul></li>
<li>Implemented Tikv as a distributed meta solution:
<ul>
<li>Integrated Tikv (<a href="https://github.com/milvus-io/milvus/pull/26246">#26246</a>)</li>
</ul></li>
<li>Rolled out float16 vector support (<a href="https://github.com/milvus-io/milvus/pull/25852">#25852</a>)
<ul>
<li>Note: Index for float16 vector coming in the next version</li>
</ul></li>
<li>Restful updates:
<ul>
<li>Unveiled new interface for upsert (<a href="https://github.com/milvus-io/milvus/pull/27787">#27787</a>)
<ul>
<li>Doc page: <a href="https://milvus.io/api-reference/restful/v2.3.x/Vector%20Operations/upsert.md">upsert</a></li>
</ul></li>
<li>Context enriched with grpc metadata (<a href="https://github.com/milvus-io/milvus/pull/27668">#27668</a>)</li>
<li>Defined component listening IP (<a href="https://github.com/milvus-io/milvus/pull/27161">#27161</a>)</li>
</ul></li>
</ul>
<h3 id="Performance-Enhancements" class="common-anchor-header">Performance Enhancements</h3><ul>
<li>Optimized data loading by minimizing data copy operations (<a href="https://github.com/milvus-io/milvus/pull/26746">#26746</a>)</li>
<li>Streamlined bulk inserts with batched varchar reading (<a href="https://github.com/milvus-io/milvus/pull/26199">#26199</a>)</li>
<li>Improved handling of large structs using pointer receivers (<a href="https://github.com/milvus-io/milvus/pull/26668">#26668</a>)</li>
<li>Removed unnecessary offset checks during data fills (<a href="https://github.com/milvus-io/milvus/pull/26666">#26666</a>)</li>
<li>Addressed high CPU consumption linked to proto.size (<a href="https://github.com/milvus-io/milvus/pull/27054">#27054</a>)</li>
<li>Optimized scalar column data with MADV_WILLNEED (<a href="https://github.com/milvus-io/milvus/pull/27170">#27170</a>)</li>
</ul>
<h3 id="Additional-Enhancements" class="common-anchor-header">Additional Enhancements</h3><ul>
<li>Robust rolling upgrade capabilities:
<ul>
<li>Significant improvement in system availability during rolling upgrades, ensuring minimal service interruptions.</li>
</ul></li>
<li>Upgraded error messaging and handling for a seamless experience.</li>
<li>Optimized flushing processes:
<ul>
<li>Addressed issues where delete commands weren’t being saved during flush operations.</li>
<li>Resolved slow flush-related issues.</li>
<li>Segregated task queues for Flush and DDL to prevent mutual blockages.</li>
</ul></li>
<li>Improved RocksMQ seek speeds (<a href="https://github.com/milvus-io/milvus/pull/27646">#27646</a>) and standalone recovery times.</li>
<li>Streamlined compact tasks (<a href="https://github.com/milvus-io/milvus/pull/27899">#27899</a>)</li>
<li>Added a channel manager in DataNode (<a href="https://github.com/milvus-io/milvus/pull/27308">#27308</a>)</li>
<li>Refined chunk management:
<ul>
<li>Removed MultiRemoveWithPrefix (<a href="https://github.com/milvus-io/milvus/pull/26924">#26924</a>)</li>
<li>Enhanced minio chunk handling (<a href="https://github.com/milvus-io/milvus/pull/27510">#27510</a>)</li>
<li>Simplified ChunkCache path initialization (<a href="https://github.com/milvus-io/milvus/pull/27433">#27433</a>)</li>
<li>Configurable read-ahead policy in ChunkCache (<a href="https://github.com/milvus-io/milvus/pull/27291">#27291</a>)</li>
<li>Rectified chunk manager usage issues (<a href="https://github.com/milvus-io/milvus/pull/27051">#27051</a>)</li>
</ul></li>
<li>Integrated grpc compression (<a href="https://github.com/milvus-io/milvus/pull/27894">#27894</a>)</li>
<li>Decoupled client-server API interfaces (<a href="https://github.com/milvus-io/milvus/pull/27186">#27186</a>)</li>
<li>Transitioned etcd watch-related code to event manager (<a href="https://github.com/milvus-io/milvus/pull/27192">#27192</a>)</li>
<li>Displayed index details during GetSegmentInfo (<a href="https://github.com/milvus-io/milvus/pull/26981">#26981</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Resolved concurrent string parsing expression issues (<a href="https://github.com/milvus-io/milvus/pull/26721">#26721</a>)</li>
<li>Fixed connection issues with Kafka under SASL_SSL (<a href="https://github.com/milvus-io/milvus/pull/26617">#26617</a>)</li>
<li>Implemented error responses for yet-to-be-implemented APIs, replacing panic reactions (<a href="https://github.com/milvus-io/milvus/pull/26589">#26589</a>)</li>
<li>Addressed data race concerns:
<ul>
<li>Mitigated gRPC client data race issues (<a href="https://github.com/milvus-io/milvus/pull/26574">#26574</a>)</li>
<li>Rectified config data race with FileSource (<a href="https://github.com/milvus-io/milvus/pull/26518">#26518</a>)</li>
</ul></li>
<li>Mended partition garbage collection issues (<a href="https://github.com/milvus-io/milvus/pull/27816">#27816</a>).</li>
<li>Rectified SIGSEGV errors encountered when operating within gdb (<a href="https://github.com/milvus-io/milvus/pull/27736">#27736</a>).</li>
<li>Addressed thread safety issues in glog for standalone mode (<a href="https://github.com/milvus-io/milvus/pull/27703">#27703</a>).</li>
<li>Fixed instances where segments were inadvertently retained post-task cancellations (<a href="https://github.com/milvus-io/milvus/pull/26685">#26685</a>).</li>
<li>Resolved loading failures for collections exceeding 128 partitions (<a href="https://github.com/milvus-io/milvus/pull/26763">#26763</a>).</li>
<li>Ensured compatibility with scalar index types such as marisa-trie and Ascending (<a href="https://github.com/milvus-io/milvus/pull/27638">#27638</a>).</li>
<li>Corrected issues causing retrieval to sometimes exceed specified result limits (<a href="https://github.com/milvus-io/milvus/pull/26670">#26670</a>).</li>
<li>Solved startup failures in rootcoord due to role number limits (<a href="https://github.com/milvus-io/milvus/pull/27361">#27361</a>).</li>
<li>Patched Kafka consumer connection leaks (<a href="https://github.com/milvus-io/milvus/pull/27224">#27224</a>).</li>
<li>Disabled the enlarging of indices for flat structures (<a href="https://github.com/milvus-io/milvus/pull/27309">#27309</a>).</li>
<li>Updated garbage collector to fetch metadata post-storage listing (<a href="https://github.com/milvus-io/milvus/pull/27203">#27203</a>).</li>
<li>Fixed instances of datanode crashes stemming from simultaneous compaction and delete processes (<a href="https://github.com/milvus-io/milvus/pull/27167">#27167</a>).</li>
<li>Ironed out issues related to concurrent load logic in querynodev2 (<a href="https://github.com/milvus-io/milvus/pull/26959">#26959</a>).</li>
</ul>
<h2 id="v231" class="common-anchor-header">v2.3.1<button data-href="#v231" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Sep 22, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.1</td><td>2.3.1</td><td>2.3.1</td><td>2.3.1</td><td>2.3.2</td></tr>
</tbody>
</table>
<p>We are excited to introduce Milvus 2.3.1, a patch release that includes several enhancements and bug fixes. These improvements are designed to enhance system stability and performance.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li>Restored support for SUBSTRUCTURE/SUPERSTRUCTURE binary metric types (<a href="https://github.com/milvus-io/milvus/pull/26766">#26766</a>).</li>
<li>Displayed index information during GetSegmentInfo (<a href="https://github.com/milvus-io/milvus/pull/26981">#26981</a>).</li>
</ul>
<h3 id="Performance-Improvement" class="common-anchor-header">Performance Improvement</h3><ul>
<li>Improved loading mechanism (<a href="https://github.com/milvus-io/milvus/pull/26746">#26746</a>): Unnecessary data copies have been reduced, resulting in enhanced overall load performance.</li>
<li>Optimized MMap performance (<a href="https://github.com/milvus-io/milvus/pull/26750">#26750</a>): The efficiency and capacity of MMap have been enhanced.</li>
<li>Refactored storage merge insert data (<a href="https://github.com/milvus-io/milvus/pull/26839">#26839</a>): The merging process has been optimized, leading to improved data node performance.</li>
<li>Enhanced VARCHAR bulk insert speed (<a href="https://github.com/milvus-io/milvus/pull/26199">#26199</a>): Batch processing reads have greatly improved the speed of VARCHAR bulk inserts.</li>
<li>Utilized a pointer receiver for large structures (<a href="https://github.com/milvus-io/milvus/pull/26668">#26668</a>): Memory copy has been enhanced by utilizing a pointer receiver.</li>
</ul>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><ul>
<li>Enhanced error handling in QueryNode (<a href="https://github.com/milvus-io/milvus/pull/26910">#26910</a>, <a href="https://github.com/milvus-io/milvus/pull/26940">#26940</a>, <a href="https://github.com/milvus-io/milvus/pull/26918">#26918</a>, <a href="https://github.com/milvus-io/milvus/pull/27013">#27013</a>, <a href="https://github.com/milvus-io/milvus/pull/26904">#26904</a>, <a href="https://github.com/milvus-io/milvus/pull/26521">#26521</a>, <a href="https://github.com/milvus-io/milvus/pull/26773">#26773</a>, <a href="https://github.com/milvus-io/milvus/pull/26676">#26676</a>): Error messages have been made more descriptive and informative, improving the user experience.</li>
<li>Enhanced Flush All API operations (<a href="https://github.com/milvus-io/milvus/pull/26802">#26802</a>, <a href="https://github.com/milvus-io/milvus/pull/26769">#26769</a>, <a href="https://github.com/milvus-io/milvus/pull/26859">#26859</a>): The Flush, FlushAll, and GetFlushAllState API operations have undergone several improvements for better data syncing with object storage.</li>
<li>Improved resilience of the RPC client with retry mechanism (<a href="https://github.com/milvus-io/milvus/pull/26795">#26795</a>): The RPC client now has an enhanced retry mechanism, improving its resilience.</li>
<li>Removed invalid offset check during data filling (<a href="https://github.com/milvus-io/milvus/pull/26666">#26666</a>).</li>
<li>Delayed connection reset for <code translate="no">Canceled</code> or <code translate="no">DeadlineExceeded</code> gRPC code (<a href="https://github.com/milvus-io/milvus/pull/27014">#27014</a>).</li>
<li>Achieved cleaner and more efficient error code management through miscellaneous code management and control enhancements (<a href="https://github.com/milvus-io/milvus/pull/26881">#26881</a>, <a href="https://github.com/milvus-io/milvus/pull/26725">#26725</a>, <a href="https://github.com/milvus-io/milvus/pull/26713">#26713</a>, <a href="https://github.com/milvus-io/milvus/pull/26732">#26732</a>).</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Fixed the index task retry issue (<a href="https://github.com/milvus-io/milvus/pull/26878">#26878</a>): Canceled tasks are no longer marked as failed without retrying.</li>
<li>Addressed load stability issues (<a href="https://github.com/milvus-io/milvus/pull/26763">#26763</a>, <a href="https://github.com/milvus-io/milvus/pull/26959">#26959</a>, <a href="https://github.com/milvus-io/milvus/pull/26931">#26931</a>, <a href="https://github.com/milvus-io/milvus/pull/26813">#26813</a>, <a href="https://github.com/milvus-io/milvus/pull/26685">#26685</a>, <a href="https://github.com/milvus-io/milvus/pull/26630">#26630</a>, <a href="https://github.com/milvus-io/milvus/pull/27027">#27027</a>): Several stability issues related to load have been resolved.</li>
<li>Resolved the segment retrieval issue (<a href="https://github.com/milvus-io/milvus/pull/26670">#26670</a>): Retrieving now returns the correct number of results based on the specified limit.</li>
<li>Fixed memory leak when putting duplicated segments (<a href="https://github.com/milvus-io/milvus/pull/26693">#26693</a>).</li>
<li>Fixed the bug for concurrent parsing expressions with strings (<a href="https://github.com/milvus-io/milvus/pull/26721">#26721</a>).</li>
<li>Fixed the panic caused by empty traceID (<a href="https://github.com/milvus-io/milvus/pull/26754">#26754</a>) (<a href="https://github.com/milvus-io/milvus/pull/26808">#26808</a>).</li>
<li>Fixed the issue where timeout tasks never release the queue, leading to stuck compactions (<a href="https://github.com/milvus-io/milvus/pull/26593">#26593</a>).</li>
</ul>
<h2 id="v230" class="common-anchor-header">v2.3.0<button data-href="#v230" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Aug 23, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.3.0</td><td>2.3.0</td><td>2.3.0</td><td>2.3.0</td><td>2.3.0</td></tr>
</tbody>
</table>
<p>After months of meticulous refinement, we are pleased to announce the official release of Milvus 2.3.0. This highly anticipated release contains a wealth of exciting new features and enhancements, including GPU support, improved query architecture, enhanced load balancing capabilities, integrated message queues, Arm-compatible images, improved observability, and improved O&amp;M tools. This represents a major leap forward in the maturity, reliability and usability of the Milvus 2.x series. We cordially invite community users to be among the first to explore them and request that any feedback or issues be submitted on GitHub. Let’s work together to further refine and stabilize this exceptional 2.3.0 release.</p>
<h3 id="Breaking-changes" class="common-anchor-header">Breaking changes</h3><h4 id="Deprecated-Time-Travel-Feature" class="common-anchor-header">Deprecated Time Travel Feature</h4><p>Due to its inactivity and the challenges it poses to the architecture design of Milvus, the time-travel feature has been deprecated in this release.</p>
<h4 id="Discontinued-CentOS-Support" class="common-anchor-header">Discontinued CentOS Support</h4><p>As CentOS 7 is about to reach its end of service (EOS) and official images based on CentOS 8 and CentOS 9 are not available, Milvus no longer supports CentOS. Instead, starting from this release, Milvus will provide images using the Amazonlinux distribution. It’s worth noting that Ubuntu-based images remain the well-tested and recommended option.</p>
<h4 id="Removed-Index-and-Metrics-Algorithms" class="common-anchor-header">Removed Index and Metrics Algorithms</h4><p>The following algorithms have been removed in this release:</p>
<ul>
<li>ANNOY and RHNSW for index-building of float vectors</li>
<li>TANIMOTO for index-building of binary vectors</li>
<li>Superstructure and Substructure metrics</li>
</ul>
<p>These changes have been made to streamline and optimize the functionality of Milvus.</p>
<h3 id="Upgraded-Architecture" class="common-anchor-header">Upgraded Architecture</h3><h4 id="GPU-Support" class="common-anchor-header">GPU Support</h4><p>Milvus had GPU support in its earlier versions (v1.x), but it was temporarily unavailable when Milvus transitioned to a distributed architecture in v2.x. Thanks to the contributions of NVIDIA engineers and their implementation of the RAFT algorithm for Milvus Knowhere, GPU support is once again available in Milvus. This latest update not only brings back GPU capabilities but also incorporates cutting-edge industry algorithms. In benchmark tests, Milvus with GPU support has demonstrated impressive performance improvements, achieving a three-fold increase in query per second (QPS) and even up to a ten-fold increase for certain datasets.</p>
<h4 id="Arm64-Support" class="common-anchor-header">Arm64 Support</h4><p>With the growing popularity of Arm CPUs among cloud providers and developers, Milvus has recognized the importance of catering to the needs of both x86 and Arm architectures. To accommodate this demand, Milvus now offers images for both platforms. Additionally, the release of Arm images aims to provide MacOS users with a seamless experience when working with Milvus on their projects.</p>
<h4 id="Refactored-QueryNode" class="common-anchor-header">Refactored QueryNode</h4><p>QueryNode plays a vital role in data retrieval within Milvus, making its availability, performance, and extensibility essential. However, the legacy QueryNode had several reported issues, including complex status management, duplicate message queues, unclear code structure, and unintuitive error messages. To address these concerns, we have undertaken a significant refactoring effort. This involved transforming QueryNode into a stateless component and eliminating data-deletion-related message queues. These changes aim to enhance the overall functionality and usability of QueryNode within the Milvus system.</p>
<h4 id="Merged-IndexCoord-and-DataCoord" class="common-anchor-header">Merged IndexCoord and DataCoord</h4><p>We have merged IndexCoord and DataCoord into a single component, simplifying the deployment of Milvus. This consolidation reduces complexity and streamlines operations. Moving forward, subsequent releases will also witness the integration of certain functions of IndexNode and DataNode to align with this unified approach. These updates ensure a more efficient and seamless experience when utilizing Milvus.</p>
<h4 id="NATS-based-Message-Queue-Experimental" class="common-anchor-header">NATS-based Message Queue (Experimental)</h4><p>The stability, extensibility, and performance of the message queue are of utmost importance to Milvus, given its log-based architecture. To expedite the development of Milvus 2.x, we have introduced support for Pulsar and Kafka as the core log brokers. However, these external log brokers have their limitations. They can exhibit instability when handling multiple topics simultaneously, complexity in managing duplicate messages, and resource management challenges when there are no messages to process. Additionally, their GO SDKs may have inactive communities.</p>
<p>To address these issues, we have made the decision to develop our own log broker based on NATS and Bookeeper. This custom message queue is currently undergoing experimentation, and we welcome feedback and comments from the community. Our aim is to create a robust and efficient solution that addresses the unique requirements of Milvus.</p>
<h3 id="New-features" class="common-anchor-header">New features</h3><h4 id="Upsert" class="common-anchor-header">Upsert</h4><p>Users now can use the upsert API in Milvus for updating or inserting data. It is important to note that the upsert API combines search, delete, and insert operations, which may result in a degradation of performance. Therefore, it is recommended to use the insert APIs for specific and definitive insertions, while reserving the upsert APIs for more ambiguous scenarios. <a href="/docs/v2.3.x/upsert_entities.md">Click here</a> to read more.</p>
<h4 id="Range-Search" class="common-anchor-header">Range Search</h4><p>Users now have the option to set a distance range using arguments to retrieve specific results within that range in Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment">// add radius and range_filter to params in search_params</span>
search_params = {<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">20</span>, <span class="hljs-string">&quot;range_filter&quot;</span> : <span class="hljs-number">10</span>}, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>}
res = collection.<span class="hljs-title function_">search</span>(
    vectors, <span class="hljs-string">&quot;float_vector&quot;</span>, search_params, topK,
    <span class="hljs-string">&quot;int64 &gt; 100&quot;</span>, output_fields=[<span class="hljs-string">&quot;int64&quot;</span>, <span class="hljs-string">&quot;float&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>In the above example, the returned vectors will have distances ranging from 10 to 20 regarding the query vector. It is important to note that the method of distance measurement varies depending on the chosen metric type. Therefore, it is recommended to familiarize yourself with each metric type before applying a range search. Additionally, please be aware that the maximum number of vectors returned is limited to 16384. <a href="/docs/v2.3.x/within_range.md">Click here</a> to read more.</p>
<h4 id="Count" class="common-anchor-header">Count</h4><p>In previous releases, users would often use the num_entities API to retrieve the total number of entities in a collection. However, it is important to note that the num_entities API only applies to entities within sealed segments. Making frequent calls to the flush API can result in the creation of numerous small segments, which can negatively impact the stability of the system and the performance of data retrieval in Milvus.</p>
<p>In this release, Milvus introduces the count statement as an alternative solution for users to obtain the number of entities in a collection without relying on the flush API.</p>
<p>Please be aware that the count statement consumes system resources, and it is advisable to avoid calling it frequently to prevent unnecessary resource consumption. <a href="/docs/v2.3.x/query.md#Count-entities">Click here</a> to read more.</p>
<h4 id="Cosine-Metrics" class="common-anchor-header">Cosine Metrics</h4><p>The Cosine Metrics is widely regarded as the standard method for measuring the distance between vectors, particularly in Large Language Models (LLMs). With the release of Milvus 2.3.0, cosine metrics are now natively supported. As a result, users no longer need to quantize vectors for IP (Inner Product) metrics. <a href="/docs/v2.3.x/metric.md#Cosine-Similarity">Click here</a> to read more.</p>
<h4 id="Raw-Vectors-in-Search-Returns" class="common-anchor-header">Raw Vectors in Search Returns</h4><p>Starting from Milvus 2.3.0, the capability to include raw vectors in search results is introduced for certain metrics. However, please note that including raw vectors in search results necessitates secondary searches, which can potentially impact performance. In scenarios where performance is critical, it is recommended to use indexes such as HNSW and IVF_FLAT, which inherently support the inclusion of vectors in their search results. It’s important to mention that this feature currently does not apply to quantization-related indexes like IVF_PQ and IVF_SQ8. For more detailed information, please refer to <a href="https://github.com/zilliztech/knowhere/releases">https://github.com/zilliztech/knowhere/releases</a>.</p>
<h4 id="ScaNN" class="common-anchor-header">ScaNN</h4><p>Milvus now includes support for FAISS’ FastScan, which has demonstrated a 20% performance improvement compared to HNSW and a 7-fold increase compared to IVF-FLAT in multiple benchmark tests. ScaNN, an index-building algorithm similar to IVF-PQ, offers a faster index-building process. However, it’s important to note that using ScaNN may result in a potential loss of precision and therefore requires refinement using the raw vectors.</p>
<p>The table below presents performance comparison results obtained using <a href="https://github.com/zilliztech/VectorDBBench">VectorDBBench</a>. It evaluates the performance of ScaNN, HNSW, and IVF-FLAT in handling data retrieval from a 768-dimensional vector dataset sourced from Cohere. <a href="/docs/v2.3.x/index.md#SCANN">Click here</a> to read more.</p>
<table>
<thead>
<tr><th>Index</th><th>Case</th><th>QPS</th><th>Latency (P99) s</th><th>Recall</th></tr>
</thead>
<tbody>
<tr><td>ScaNN</td><td>99% filtered</td><td>626</td><td>6.9</td><td>0.9532</td></tr>
<tr><td></td><td>1% filtered</td><td>750</td><td>6.3</td><td>0.9493</td></tr>
<tr><td></td><td>0% filtered</td><td>883</td><td>5.1</td><td>0.9491</td></tr>
<tr><td>IVF-FLAT</td><td>99% filtered</td><td>722</td><td>6.1</td><td>0.9532</td></tr>
<tr><td></td><td>1% filtered</td><td>122</td><td>16.1</td><td>0.9493</td></tr>
<tr><td></td><td>0% filtered</td><td>123</td><td>15.4</td><td>0.9494</td></tr>
<tr><td>HNSW</td><td>99% filtered</td><td>773</td><td>6.6</td><td>1.0</td></tr>
<tr><td></td><td>1% filtered</td><td>355</td><td>8.1</td><td>0.9839</td></tr>
<tr><td></td><td>0% filtered</td><td>696</td><td>5.4</td><td>0.9528</td></tr>
</tbody>
</table>
<h4 id="Iterator" class="common-anchor-header">Iterator</h4><p>PyMilvus now includes support for iterators, enabling users to retrieve more than 16,384 entities in a search or range search operation. The iterator functionality operates similarly to ElasticSearch’s scroll API and the cursor concept in relational databases. <a href="/docs/v2.3.x/with_iterators.md">Click here</a> to read more.</p>
<h4 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS</h4><p>Starting from Milvus 2.3.0, users can utilize the JSON_CONTAINS expressions to retrieve entities whose JSON field values contain one or a specified set of elements. This feature enhances the flexibility and capability of filtering and querying data within Milvus. <a href="/docs/v2.3.x/boolean.md">Click here</a> to read more.</p>
<h4 id="CDC-support" class="common-anchor-header">CDC support</h4><p>Change Data Capture (CDC) is a widely used functionality in databases, typically employed in scenarios such as active/standby data synchronization, incremental data backup, and data migration. For more detailed information on CDC, please refer to <a href="https://github.com/zilliztech/milvus-cdc">https://github.com/zilliztech/milvus-cdc</a>.</p>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><h4 id="MMap-for-capacity-increase" class="common-anchor-header">MMap for capacity increase</h4><p>MMap is a Linux kernel feature that allows the mapping of disk space to memory. This feature enables loading data into the hard drive and mmap-ing it to memory, thereby increasing the single-machine data capacity with a marginal 20% performance degradation. Users who prioritize cost-efficiency are encouraged to test this enhancement and evaluate its benefits. Click <a href="/docs/v2.3.x/mmap.md">here</a> to read more.</p>
<h4 id="Performance-improvement-for-data-filtering" class="common-anchor-header">Performance improvement for data filtering</h4><p>In hybrid searches, Milvus performs scalar queries and vector searches sequentially. This approach often leads to a high number of entities being filtered out after the scalar queries, which can significantly degrade the performance of the built vector index. In Milvus 2.3.0, by optimizing the data filtering policies in HNSW, we have improved the scalar query performance and resolved this issue, ensuring better overall performance during hybrid searches.</p>
<h4 id="Growing-index" class="common-anchor-header">Growing index</h4><p>Milvus distinguishes between indexed data and stream data, each treated differently. Indexed data benefits from the built index, which accelerates the search process. On the other hand, stream data relies on brute-force search, which can potentially lead to performance degradation. To address this issue, Milvus introduces the concept of a growing index. This growing index ensures consistent search performance for both indexed and stream data, mitigating any potential performance degradation caused by brute-force search.</p>
<h4 id="Increased-resource-usage-in-the-multi-core-environment" class="common-anchor-header">Increased resource usage in the multi-core environment</h4><p>Approximate nearest search (ANN) is a computationally intensive task that heavily relies on CPU usage. In previous releases, the CPU usage in Milvus could remain below 70% even when multiple cores were available. However, in Milvus 2.3.0, this limitation has been overcome, and the system can now fully utilize all available CPU resources for improved performance during ANN computations.</p>
<h3 id="Stability" class="common-anchor-header">Stability</h3><h4 id="New-load-balancer" class="common-anchor-header">New load balancer</h4><p>Milvus 2.1.0 introduced support for multiple replicas in memory to improve QPS. However, feedback from the community highlighted issues with immediate QPS improvement, longer system recovery time after node shutdown, workload imbalance among nodes, and low CPU utilization. To tackle these issues, we redesigned the load balancing algorithm with dynamic load adjustment based on real-time load information. This enhancement enables timely detection of node status changes and workload imbalances, resulting in efficient load management.</p>
<h3 id="Operability" class="common-anchor-header">Operability</h3><h4 id="Dynamic-Configuration" class="common-anchor-header">Dynamic Configuration</h4><p>Modifying configurations is a common operation for database maintenance and optimization. Starting from this version, Milvus supports dynamically modifying configuration parameters without the need to restart the cluster. There are two supported methods: modifying key-value pairs in etcd or directly modifying the <code translate="no">milvus.yaml</code> configuration file. It is important to note that not all configuration parameters can be modified dynamically. <a href="/docs/v2.3.x/dynamic_config.md">Click here</a> to read more.</p>
<h4 id="Tracing-support" class="common-anchor-header">Tracing support</h4><p>Tracing is an important means of identifying bottleneck points in a system and is crucial for optimization. Starting from version 2.3.0, Milvus supports the Opentelemetry tracing protocol. Tracing collectors that support this protocol, such as Jaeger, can be used to observe Milvus’s invocation path and analyze system performance.</p>
<h4 id="Error-codes" class="common-anchor-header">Error codes</h4><p>Milvus has undergone a reorganization of its error codes according to the new design of the error code reporting system. As a result of this upgrade, error messages in Milvus will be more clear and concise, providing improved clarity in error reporting.</p>
<h3 id="Tools" class="common-anchor-header">Tools</h3><h4 id="Birdwatcher-upgrade" class="common-anchor-header">Birdwatcher upgrade</h4><p>Through months of development, Birdwatcher incorporates the following features:</p>
<ul>
<li>RESTful API for seamless integration with other diagnostic systems.</li>
<li>PProf command support to facilitate integration with the go pprof tool.</li>
<li>Storage analysis capabilities.</li>
<li>Efficient log analysis functionality.</li>
<li>Ability to view and edit Milvus configuration in etcd.</li>
</ul>
<h4 id="Attu-upgrade" class="common-anchor-header">Attu upgrade</h4><p>A newly designed GUI makes Attu more user-friendly.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/attu-snapshot.png" alt="Attu" class="doc-image" id="attu" />
    <span>Attu</span>
  </span>
</p>
