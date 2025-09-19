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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.6.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: September 19, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>We’re excited to announce the release of Milvus 2.6.2! This update introduces powerful new features, significant performance enhancements, and critical fixes that make the system more stable and production-ready. Highlights include partial field updates with upsert, JSON Shredding to accelerate dynamic field filtering, NGram indexing for faster LIKE queries, and more flexible schema evolution on existing collections. Built on community feedback, this release delivers a stronger foundation for real-world deployments, and we encourage all users to upgrade to take advantage of these improvements.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Added support for JSON Shredding to accelerate dynamic field filtering. For details, refer to <a href="/docs/json-shredding.md">JSON Shredding</a>.</li>
<li>Added support for NGRAM Index to accelerate like operation. For details, refer to <a href="/docs/ngram.md">NGRAM</a>.</li>
<li>Added support for partial field updates with upsert API. For details, refer to <a href="/docs/upsert-entities.md">Upsert Entities</a>.</li>
<li>Added support for Boost Function. For details, refer to <a href="/docs/boost-ranker.md">Boost Ranker</a>.</li>
<li>Added support for group by JSON fields and dynamic fields (<a href="https://github.com/milvus-io/milvus/pull/43203">#43203</a>)</li>
<li>Added support for enabling dynamic schema on existing collections (<a href="https://github.com/milvus-io/milvus/pull/44151">#44151</a>)</li>
<li>Added support for dropping indexes without releasing collections (<a href="https://github.com/milvus-io/milvus/pull/42941">#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>[StorageV2] Changed log file size to compressed size (<a href="https://github.com/milvus-io/milvus/pull/44402">#44402</a>)</li>
<li>[StorageV2] Added child fields in load info (<a href="https://github.com/milvus-io/milvus/pull/44384">#44384</a>)</li>
<li>[StorageV2] Added support for including partition and clustering keys in system group (<a href="https://github.com/milvus-io/milvus/pull/44372">#44372</a>)</li>
<li>Removed timeout for compaction tasks (<a href="https://github.com/milvus-io/milvus/pull/44277">#44277</a>)</li>
<li>[StorageV2] Enabled build with Azure (<a href="https://github.com/milvus-io/milvus/pull/44177">#44177</a>)</li>
<li>[StorageV2] Utilized group info for estimating logic usage (<a href="https://github.com/milvus-io/milvus/pull/44356">#44356</a>)</li>
<li>[StorageV2] Utilized group split info to estimate usage (<a href="https://github.com/milvus-io/milvus/pull/44338">#44338</a>)</li>
<li>[StorageV2] Saved column group results in compaction (<a href="https://github.com/milvus-io/milvus/pull/44327">#44327</a>)</li>
<li>[StorageV2] Added configurations for size-based split policy (<a href="https://github.com/milvus-io/milvus/pull/44301">#44301</a>)</li>
<li>[StorageV2] Added support for schema-based and size-based split policy (<a href="https://github.com/milvus-io/milvus/pull/44282">#44282</a>)</li>
<li>[StorageV2] Added configurable split policy (<a href="https://github.com/milvus-io/milvus/pull/44258">#44258</a>)</li>
<li>[CachingLayer] Added more metrics and configurations (<a href="https://github.com/milvus-io/milvus/pull/44276">#44276</a>)</li>
<li>Added support for waiting for all indices to be ready before loading segments (<a href="https://github.com/milvus-io/milvus/pull/44313">#44313</a>)</li>
<li>Added internal core latency metric for rescore node (<a href="https://github.com/milvus-io/milvus/pull/44010">#44010</a>)</li>
<li>Optimized access log format when printing KV params (<a href="https://github.com/milvus-io/milvus/pull/43742">#43742</a>)</li>
<li>Added configuration to modify dump snapshot batch size (<a href="https://github.com/milvus-io/milvus/pull/44215">#44215</a>)</li>
<li>Reduced compaction task cleanup interval (<a href="https://github.com/milvus-io/milvus/pull/44207">#44207</a>)</li>
<li>Enhanced merge sort to support multiple fields (<a href="https://github.com/milvus-io/milvus/pull/44191">#44191</a>)(<a href="https://github.com/milvus-io/milvus/pull/43994">#43994</a>)</li>
<li>Added load resource estimation for tiered index (<a href="https://github.com/milvus-io/milvus/pull/44171">#44171</a>)</li>
<li>Added autoindex config for deduplication case (<a href="https://github.com/milvus-io/milvus/pull/44186">#44186</a>)</li>
<li>Added configuration to allow custom characters in names  (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Added support for cchannel for streaming service (<a href="https://github.com/milvus-io/milvus/pull/44143">#44143</a>)</li>
<li>Added mutex and range check to guard concurrent deletions (<a href="https://github.com/milvus-io/milvus/pull/44128">#44128</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Aligned the behavior of exists expressions between brute force and index (<a href="https://github.com/milvus-io/milvus/pull/44030">#44030</a>)</li>
<li>Fixed error on renaming to a dropped collection (<a href="https://github.com/milvus-io/milvus/pull/44436">#44436</a>)</li>
<li>[StorageV2] Checked child fields length (<a href="https://github.com/milvus-io/milvus/pull/44405">#44405</a>)</li>
<li>[StorageV2] Turned on Azure by default (<a href="https://github.com/milvus-io/milvus/pull/44377">#44377</a>)</li>
<li>Corrected upload path of L0 compactions under pooling datanodes (<a href="https://github.com/milvus-io/milvus/pull/44374">#44374</a>)</li>
<li>Disallowed renaming if database encryption is enabled (<a href="https://github.com/milvus-io/milvus/pull/44225">#44225</a>)</li>
<li>Disallowed deletion of dynamicfield.enable property (<a href="https://github.com/milvus-io/milvus/pull/44335">#44335</a>)</li>
<li>Marked tasks as failed when pre-allocated ID is invalid (<a href="https://github.com/milvus-io/milvus/pull/44350">#44350</a>)</li>
<li>Skipped MVCC checks on PK compare expressions (<a href="https://github.com/milvus-io/milvus/pull/44353">#44353</a>)</li>
<li>Fixed json_contains bug for stats (<a href="https://github.com/milvus-io/milvus/pull/44325">#44325</a>)</li>
<li>Added initialization filesystem check for query node and streaming node (<a href="https://github.com/milvus-io/milvus/pull/44360">#44360</a>)</li>
<li>Fixed empty compaction target when segment was garbage collected (<a href="https://github.com/milvus-io/milvus/pull/44270">#44270</a>)</li>
<li>Fixed race condition when initializing timestamp index (<a href="https://github.com/milvus-io/milvus/pull/44317">#44317</a>)</li>
<li>Checked if arraydata is nil to prevent panic (<a href="https://github.com/milvus-io/milvus/pull/44332">#44332</a>)</li>
<li>Fixed build JSON stats bug for nested objects (<a href="https://github.com/milvus-io/milvus/pull/44303">#44303</a>)</li>
<li>Avoided mmap rewrite by multiple JSON fields (<a href="https://github.com/milvus-io/milvus/pull/44299">#44299</a>)</li>
<li>Unified valid data formats (<a href="https://github.com/milvus-io/milvus/pull/44296">#44296</a>)</li>
<li>Hid credentials of embedding/reranking providers in web UI (<a href="https://github.com/milvus-io/milvus/pull/44275">#44275</a>)</li>
<li>Corrected statslog path under pooling datanodes (<a href="https://github.com/milvus-io/milvus/pull/44288">#44288</a>)</li>
<li>Corrected path of IDF oracle (<a href="https://github.com/milvus-io/milvus/pull/44266">#44266</a>)</li>
<li>Used recovery snapshot checkpoint if no vchannel is recovering (<a href="https://github.com/milvus-io/milvus/pull/44246">#44246</a>)</li>
<li>Limited column number in JSON stats (<a href="https://github.com/milvus-io/milvus/pull/44233">#44233</a>)</li>
<li>Made load resource count n-gram index (<a href="https://github.com/milvus-io/milvus/pull/44237">#44237</a>)</li>
<li>Deduced metric type from non-empty search results (<a href="https://github.com/milvus-io/milvus/pull/44222">#44222</a>)</li>
<li>Fixed multi-segment write only writing one segment (<a href="https://github.com/milvus-io/milvus/pull/44256">#44256</a>)</li>
<li>Fixed merge sort out of range (<a href="https://github.com/milvus-io/milvus/pull/44230">#44230</a>)</li>
<li>Added UTF-8 check before executing BM25 function (<a href="https://github.com/milvus-io/milvus/pull/44220">#44220</a>)</li>
<li>Retried old session if it exists (<a href="https://github.com/milvus-io/milvus/pull/44208">#44208</a>)</li>
<li>Added Kafka buffer size limit to prevent datanode OOM (<a href="https://github.com/milvus-io/milvus/pull/44106">#44106</a>)</li>
<li>Fixed panic by extending lock guarding range (<a href="https://github.com/milvus-io/milvus/pull/44130">#44130</a>)</li>
<li>Fixed growing segments not being flushed on schema change (<a href="https://github.com/milvus-io/milvus/pull/44412">#44412</a>)</li>
<li>[StorageV2] Handled IO errors (<a href="https://github.com/milvus-io/milvus/pull/44255">#44255</a>)</li>
<li>Prevented panic if Tantivy index path does not exist (<a href="https://github.com/milvus-io/milvus/pull/44135">#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: September 3, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus 2.6.1! This version builds upon the major architectural advancements of previous releases, delivering critical enhancements focused on production stability, performance, and operational robustness. This release addresses key community feedback and strengthens the system for large-scale deployments. We strongly encourage all users to upgrade to benefit from a more stable, performant, and reliable system.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Supports POSIX-compatible file systems for remote storage (<a href="https://github.com/milvus-io/milvus/pull/43944">#43944</a>)</li>
<li>Introduces model-based rerankers (<a href="https://github.com/milvus-io/milvus/pull/43270">#43270</a>)</li>
<li>Optimizes the performance of comparison expressions on primary key fields (<a href="https://github.com/milvus-io/milvus/pull/43154">#43154</a>)</li>
<li>Collects doc_id from posting list directly to accelerate text match (<a href="https://github.com/milvus-io/milvus/pull/43899">#43899</a>)</li>
<li>Optimizes query performance by converting multiple != conditions into a single NOT IN clause (<a href="https://github.com/milvus-io/milvus/pull/43690">#43690</a>)</li>
<li>Enhances resource management for the caching layer during segment loading (<a href="https://github.com/milvus-io/milvus/pull/43846">#43846</a>)</li>
<li>Improves memory estimation for interim indexes during data loading (<a href="https://github.com/milvus-io/milvus/pull/44104">#44104</a>)</li>
<li>Makes the build ratio for interim indexes configurable (<a href="https://github.com/milvus-io/milvus/pull/43939">#43939</a>)</li>
<li>Adds a configurable write rate limit to the disk writer (<a href="https://github.com/milvus-io/milvus/pull/43912">#43912</a>)</li>
<li>SegCore parameters can now be updated dynamically without restarting the Milvus service (<a href="https://github.com/milvus-io/milvus/pull/43231">#43231</a>)</li>
<li>Adds unified gRPC latency metrics for better observability (<a href="https://github.com/milvus-io/milvus/pull/44089">#44089</a>)</li>
<li>Includes client request timestamps in gRPC headers to simplify debugging (<a href="https://github.com/milvus-io/milvus/pull/44059">#44059</a>)</li>
<li>Supports trace log level for segcore (<a href="https://github.com/milvus-io/milvus/pull/44003">#44003</a>)</li>
<li>Adds a configurable switch to adjust consistency guarantees for higher availability (<a href="https://github.com/milvus-io/milvus/pull/43874">#43874</a>)</li>
<li>Implements a robust rewatch mechanism to handle etcd connection failures (<a href="https://github.com/milvus-io/milvus/pull/43829">#43829</a>)</li>
<li>Improves the internal node health check logic (<a href="https://github.com/milvus-io/milvus/pull/43768">#43768</a>)</li>
<li>Optimizes metadata access when listing collections (<a href="https://github.com/milvus-io/milvus/pull/43902">#43902</a>)</li>
<li>Upgrades the Pulsar client to v0.15.1 official version and adds more logging (<a href="https://github.com/milvus-io/milvus/pull/43913">#43913</a>)</li>
<li>Upgrades aws-sdk from 1.9.234 to 1.11.352 (<a href="https://github.com/milvus-io/milvus/pull/43916">#43916</a>)</li>
<li>Supports dynamic interval updates for ticker components (<a href="https://github.com/milvus-io/milvus/pull/43865">#43865</a>)</li>
<li>Improves auto-detection of ARM SVE instruction sets for bitset operations (<a href="https://github.com/milvus-io/milvus/pull/43833">#43833</a>)</li>
<li>Improves the error message when a text or phrase match fails (<a href="https://github.com/milvus-io/milvus/pull/43366">#43366</a>)</li>
<li>Improves the error message for vector dimension mismatches (<a href="https://github.com/milvus-io/milvus/pull/43835">#43835</a>)</li>
<li>Improves error reporting for append timeouts when the object store is unavailable (<a href="https://github.com/milvus-io/milvus/pull/43926">#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Fixes a potential Out-Of-Memory (OOM) issue during Parquet file imports (<a href="https://github.com/milvus-io/milvus/pull/43756">#43756</a>)</li>
<li>Fixes an issue where standby nodes could not recover if their lease expired (<a href="https://github.com/milvus-io/milvus/pull/44112">#44112</a>)</li>
<li>Handles compaction retry state correctly (<a href="https://github.com/milvus-io/milvus/pull/44119">#44119</a>)</li>
<li>Fixes a potential deadlock between continuous read requests and index loading that could prevent index loading (<a href="https://github.com/milvus-io/milvus/pull/43937">#43937</a>)</li>
<li>Fixes a bug that could cause data deletions to fail in high-concurrency scenarios (<a href="https://github.com/milvus-io/milvus/pull/43831">#43831</a>)</li>
<li>Fixes a potential race condition when loading text and JSON indexes (<a href="https://github.com/milvus-io/milvus/pull/43811">#43811</a>)</li>
<li>Fixes a node status inconsistency that could occur after a QueryCoord restart (<a href="https://github.com/milvus-io/milvus/pull/43941">#43941</a>)</li>
<li>Ensures that a “dirty” QueryNode is properly cleaned up after a restart (<a href="https://github.com/milvus-io/milvus/pull/43909">#43909</a>)</li>
<li>Fixes an issue where the retry state was not handled correctly for requests with non-empty payloads (<a href="https://github.com/milvus-io/milvus/pull/44068">#44068</a>)</li>
<li>Fixes an issue where the bulk writer v2 did not use the correct bucket name (<a href="https://github.com/milvus-io/milvus/pull/44083">#44083</a>)</li>
<li>Enhances security by hiding sensitive items from the RESTful get_configs endpoint (<a href="https://github.com/milvus-io/milvus/pull/44057">#44057</a>)</li>
<li>Ensures that object uploads for woodpecker are idempotent during timeout retries (<a href="https://github.com/milvus-io/milvus/pull/43947">#43947</a>)</li>
<li>Disallows importing null elements in array fields from Parquet files (<a href="https://github.com/milvus-io/milvus/pull/43964">#43964</a>)</li>
<li>Fixes a bug where the proxy cache was not invalidated after creating a collection alias (<a href="https://github.com/milvus-io/milvus/pull/43854">#43854</a>)</li>
<li>Improves the internal service discovery mechanism for streaming nodes (<a href="https://github.com/milvus-io/milvus/pull/44033">#44033</a>)</li>
<li>Fixes resource group logic to correctly filter streaming nodes (<a href="https://github.com/milvus-io/milvus/pull/43984">#43984</a>)</li>
<li>Adds the databaseName label to metrics to prevent naming conflicts in multi-database environments (<a href="https://github.com/milvus-io/milvus/pull/43808">#43808</a>)</li>
<li>Fixes a logic error in internal task state handling (<a href="https://github.com/milvus-io/milvus/pull/43777">#43777</a>)</li>
<li>Optimizes the initialization timing of the internal metrics to avoid potential panic (<a href="https://github.com/milvus-io/milvus/pull/43773">#43773</a>)</li>
<li>Fixes a rare potential crash in the internal HTTP server (<a href="https://github.com/milvus-io/milvus/pull/43799">#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: August 6, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 is officially released! Building upon the architectural foundation laid in <a href="#v260-rc1">2.6.0-rc1</a>, this production-ready version addresses numerous stability and performance issues while introducing powerful new capabilities including Storage Format V2, advanced JSON processing, and enhanced search features. With extensive bug fixes and optimizations based on community feedback during the RC phase, Milvus 2.6.0 is ready for you to explore and adopt.</p>
<div class="alert warning">
<p>Direct upgrade from pre-2.6.0 versions is not supported due to architectural changes. Please follow our <a href="/docs/upgrade_milvus_cluster-operator.md">upgrade guide</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">What’s new in 2.6.0 (since RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Optimized storage format v2</h4><p>To address the challenges of mixed scalar and vector data storage, especially point lookups on unstructured data, Milvus 2.6 introduces Storage Format V2. This new adaptive columnar storage format adopts a “narrow column merging + wide column independence” layout strategy, fundamentally solving the performance bottlenecks when handling point lookups and small-batch retrievals in vector databases.</p>
<p>The new format now supports efficient random access without I/O amplification and achieves up to 100x performance gains compared to the vanilla Parquet format adopted previously, making it ideal for AI workloads requiring both analytical processing and precise vector retrieval. Additionally, it can reduce file count by up to 98% for typical workloads. Memory consumption for major compaction is reduced by 300%, and I/O operations are optimized by up to 80% for reads and more than 600% for writes.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSON flat index (beta)</h4><p>Milvus 2.6 introduces JSON Flat Index to handle highly dynamic JSON schemas. Unlike JSON Path Index which requires pre-declaring specific paths and their expected types, JSON Flat Index automatically discovers and indexes all nested structures under a given path. When indexing a JSON field, it recursively flattens the entire subtree, creating inverted index entries for every path-value pair it encounters, regardless of depth or type.
This automatic flattening makes JSON Flat Index ideal for evolving schemas where new fields appear without warning. For instance, if you index a “metadata” field, the system will automatically handle new nested fields like “metadata.version2.features.experimental” as they appear in incoming data, without requiring new index configuration.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Core 2.6.0 features recall<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>For detailed information about architecture changes and features introduced in 2.6.0-RC, see <a href="#v260-rc1">2.6.0-rc1 Release Note</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Architecture simplification</h4><ul>
<li>Streaming Node (GA) - Centralized WAL management</li>
<li>Native WAL with Woodpecker - Removed Kafka/Pulsar dependency</li>
<li>Unified coordinators (MixCoord); Merged IndexNode and DataNode - Reduced component complexity</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Search & analytics</h4><ul>
<li>RaBitQ 1-bit quantization with high recall</li>
<li>Phrase matching</li>
<li>MinHash LSH for deduplication</li>
<li>Time-aware ranking functions</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Developer experience</h4><ul>
<li>Embedding functions for “data-in, data-out” workflow</li>
<li>Online schema evolution</li>
<li>INT8 vector support</li>
<li>Enhanced tokenizers for global language support</li>
<li>Cache layer with lazy loading - Process datasets larger than memory</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: June 18, 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus Version</th><th style="text-align:center">Python SDK Version</th><th style="text-align:center">Node.js SDK Version</th><th style="text-align:center">Java SDK Version</th><th style="text-align:center">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 introduces a simplified, cloud-native architecture designed to improve operational efficiency, resource utilization, and total cost of ownership by reducing deployment complexity. This release adds new functionalities focused on performance, search, and development. Key features include high-precision 1-bit quantization (RaBitQ) and a dynamic cache layer for performance gains, near-duplicate detection with MinHash and precise phrase matching for advanced search, and automated embedding functions with online schema modification to enhance the developer’s experience.</p>
<div class="alert note">
<p>This is a pre-release version of Milvus 2.6.0. To try out the latest features, install this version as a fresh deployment. Upgrading from Milvus v2.5.x or earlier to 2.6.0-rc1 is not supported.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Architecture Changes<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Since 2.6, Milvus introduces significant architectural changes aimed at improving performance, scalability, and ease of use. For more information, refer to <a href="/docs/architecture_overview.md">Milvus Architecture Overview</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming Node (GA)</h4><p>In previous versions, streaming data was written to the WAL by the Proxy, and read by the QueryNode and DataNode. This architecture made it difficult to achieve consensus on the write side, requiring complex logic on the read side. Additionally, the query delegator was located in the QueryNode, which hindered scalability. Milvus 2.5.0 introduced the Streaming Node, which becomes GA in version 2.6.0. This component is now responsible for all shard-level WAL read/write operations and also serves as the query delegator, resolving the aforementioned issues and enabling new optimizations.</p>
<p><strong>Important Upgrade Notice</strong>: Streaming Node is a significant architectural change, so a direct upgrade to Milvus 2.6.0-rc1 from previous versions is not supported.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Milvus previously relied on external systems like Kafka or Pulsar for its WAL. While functional, these systems added significant operational complexity and resource overhead, particularly for small to medium-sized deployments. In Milvus 2.6, these are replaced by Woodpecker, a purpose-built, cloud-native WAL system. Woodpecker is designed for object storage, supporting both local and object storage based zero-disk modes, simplifying operations while improving performance and scalability.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">DataNode and IndexNode Merge</h4><p>In Milvus 2.6, tasks such as compaction, bulk import, statistics collection, and index building are now managed by a unified scheduler. The data persistence function previously handled by the DataNode has been moved to the Streaming Node. To simplify deployment and maintenance, the IndexNode and DataNode have been merged into a single DataNode component. This consolidated node now executes all these critical tasks, reducing operational complexity and optimizing resource utilization.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Coordinator Merge into MixCoord</h4><p>The previous design with separate RootCoord, QueryCoord, and DataCoord modules introduced complexity in inter-module communication. To simplify the system design, these components have been merged into a single, unified coordinator called MixCoord. This consolidation reduces the complexity of distributed programming by replacing network-based communication with internal function calls, resulting in more efficient system operation and simplified development and maintenance.</p>
<h3 id="Key-Features" class="common-anchor-header">Key Features<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1-bit Quantization</h4><p>To handle large-scale datasets, 1-bit quantization is an effective technique for improving resource utilization and search performance. However, traditional methods can negatively impact recall. In collaboration with the original research authors, Milvus 2.6 introduces RaBitQ, a 1-bit quantization solution that maintains high recall accuracy while delivering the resource and performance benefits of 1-bit compression.</p>
<p>For more information, refer to <a href="/docs/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON Capability Enhancement</h4><p>Milvus 2.6 enhances its support for the JSON data type with the following improvements:</p>
<ul>
<li><strong>Performance</strong>: JSON Path Indexing is now officially supported, allowing the creation of inverted indexes on specific paths within JSON objects (e.g., <code translate="no">meta.user.location</code>). This avoids full object scans and improves the latency of queries with complex filters.</li>
<li><strong>Functionality</strong>: To support more complex filtering logic, this release adds support for <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, and <code translate="no">CAST</code> functions.
Looking ahead, our work on JSON support continues. We are excited to preview that upcoming official releases will feature even more powerful capabilities, such as <strong>JSON shredding</strong> and a <strong>JSON FLAT Index</strong>, designed to dramatically improve performance on highly nested JSON data.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Analyzer/Tokenizer Function Enhancement</h4><p>This release significantly enhances text processing capabilities with several updates to the Analyzer and Tokenizer:</p>
<ul>
<li>A new <a href="/docs/analyzer-overview.md#Example-use">Run Analyzer</a> syntax is available to validate tokenizer configurations.</li>
<li>The <a href="/docs/lindera-tokenizer.md">Lindera tokenizer</a> is integrated for improved support of Asian languages such as Japanese and Korean.</li>
<li>Row-level tokenizer selection is now supported, with the general-purpose <a href="/docs/icu-tokenizer.md">ICU tokenizer</a> available as a fallback for multilingual scenarios.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Data-in, Data-Out with Embedding Functions</h4><p>Milvus 2.6 introduces a “Data-in, Data-Out” capability that simplifies AI application development by integrating directly with third-party embedding models (e.g., from OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Users can now insert and query using raw text data, and Milvus will automatically call the specified model service to convert the text into vectors in real-time. This removes the need for a separate vector conversion pipeline.</p>
<p>For more information, refer to <a href="/docs/embedding-function-overview.md">Embedding Function Overview</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Phrase Match</h4><p>Phrase Match is a text search feature that returns results only when the exact sequence of words in a query appears consecutively and in the correct order within a document.</p>
<p><strong>Key Characteristics</strong>:</p>
<ul>
<li>Order-sensitive: The words must appear in the same order as in the query.</li>
<li>Consecutive match: The words must appear right next to each other, unless a slop value is used.</li>
<li>Slop (optional): A tunable parameter that allows for a small number of intervening words, enabling fuzzy phrase matching.</li>
</ul>
<p>For more information, refer to <a href="/docs/phrase-match.md">Phrase Match</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH Index (Beta)</h4><p>To address the need for data deduplication in model training, Milvus 2.6 adds support for MINHASH_LSH indexes. This feature provides a computationally efficient and scalable method for estimating Jaccard similarity between documents to identify near-duplicates. Users can generate MinHash signatures for their text documents during preprocessing and use the MINHASH_LSH index in Milvus to efficiently find similar content in large-scale datasets, improving data cleaning and model quality.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Time-Aware Decay Functions</h4><p>Milvus 2.6 introduces time-aware decay functions to address scenarios where information value changes over time. During result re-ranking, users can apply exponential, Gaussian, or linear decay functions based on a timestamp field to adjust a document’s relevance score. This ensures that more recent content can be prioritized, which is critical for applications like news feeds, e-commerce, and an AI agent’s memory.</p>
<p>For more information, refer to <a href="/docs/decay-ranker-overview.md">Decay Ranker Overview</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Add Field for Online Schema Evolution</h4><p>To provide greater schema flexibility, Milvus 2.6 now supports adding a new scalar field to an existing collection’s schema online. This avoids the need to create a new collection and perform a disruptive data migration when application requirements change.</p>
<p>For more information, refer to <a href="/docs/add-fields-to-an-existing-collection.md">Add Fields to an Existing Collection</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 Vector Support</h4><p>In response to the growing use of quantized models that produce 8-bit integer embeddings, Milvus 2.6 adds native data type support for INT8 vectors. This allows users to ingest these vectors directly without de-quantization, saving computation, network bandwidth, and storage costs. This feature is initially supported for HNSW-family indexes.</p>
<p>For more information, refer to <a href="/docs/dense-vector.md">Dense Vector</a>.</p>
