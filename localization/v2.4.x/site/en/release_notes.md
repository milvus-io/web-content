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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.4.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v2410" class="common-anchor-header">v2.4.10<button data-href="#v2410" class="anchor-icon" translate="no">
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
    </button></h2><p>Release Date: August 30, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.10</td><td>2.4.6</td><td>2.4.3</td><td>2.4.6</td></tr>
</tbody>
</table>
<p>Milvus 2.4.10 introduces significant improvements in functionality and stability. Key features include support for upsert operations on AutoID-enabled collections, partial collection loading capabilities, and various memory-mapped (MMAP) configurations to optimize memory usage. This release also addresses several bugs causing panics, core dumps, and resource leaks. We recommend upgrading to take full advantage of these improvements.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li><strong>Upsert with Auto ID</strong>: Support for upsert operations with automatic ID generation (<a href="https://github.com/milvus-io/milvus/pull/34633">#34633</a>)</li>
<li><strong>Field Partial Load Collection</strong> [Beta Preview]: Allows loading specific fields of a collection (<a href="https://github.com/milvus-io/milvus/pull/35696">#35696</a>)</li>
<li><strong>RBAC Enhancements</strong>:
<ul>
<li>Added RBAC message support for Change Data Capture (CDC) (<a href="https://github.com/milvus-io/milvus/pull/35562">#35562</a>)</li>
<li>Introduced readonly/readwrite/admin privilege groups to simplify RBAC grant process (<a href="https://github.com/milvus-io/milvus/pull/35543">#35543</a>)</li>
<li>New API for backing up and restoring RBAC configurations (<a href="https://github.com/milvus-io/milvus/pull/35513">#35513</a>)</li>
<li>Refresh proxy cache after restoring RBAC metadata (<a href="https://github.com/milvus-io/milvus/pull/35636">#35636</a>)</li>
</ul></li>
<li><strong>Improved MMAP Configuration</strong>: More general configuration options to control MMAP behavior (<a href="https://github.com/milvus-io/milvus/pull/35609">#35609</a>)</li>
<li><strong>Database Access Restrictions</strong>: New properties to restrict read access to databases (<a href="https://github.com/milvus-io/milvus/pull/35754">#35754</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed Arrow Go client don’t return error issue (<a href="https://github.com/milvus-io/milvus/pull/35820">#35820</a>)</li>
<li>Corrected inaccurate rate limiting (<a href="https://github.com/milvus-io/milvus/pull/35700">#35700</a>)</li>
<li>Resolved proxy panic after import-related API failures (<a href="https://github.com/milvus-io/milvus/pull/35559">#35559</a>)</li>
<li>Fixed potential mistaken deletions during GC channel checkpoints (<a href="https://github.com/milvus-io/milvus/pull/35708">#35708</a>)</li>
<li>Addressed panic due to empty candidate import segments (<a href="https://github.com/milvus-io/milvus/pull/35674">#35674</a>)</li>
<li>Corrected mmap memory deallocation (<a href="https://github.com/milvus-io/milvus/pull/35726">#35726</a>)</li>
<li>Ensured proper channel watching for upgrades from 2.2 to 2.4 (<a href="https://github.com/milvus-io/milvus/pull/35695">#35695</a>)</li>
<li>Fixed DataNode unwatching channel release function (<a href="https://github.com/milvus-io/milvus/pull/35657">#35657</a>)</li>
<li>Corrected partition count in RootCoord metadata (<a href="https://github.com/milvus-io/milvus/pull/35601">#35601</a>)</li>
<li>Resolved issues with dynamic config updates for certain parameters (<a href="https://github.com/milvus-io/milvus/pull/35637">#35637</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><h4 id="Performance" class="common-anchor-header">Performance</h4><ul>
<li>Optimized retrieval on dynamic fields (<a href="https://github.com/milvus-io/milvus/pull/35602">#35602</a>)</li>
<li>Improved bitset performance for AVX512 (<a href="https://github.com/milvus-io/milvus/pull/35480">#35480</a>)</li>
<li>Re-read value after <code translate="no">once</code> initialization for better efficiency (<a href="https://github.com/milvus-io/milvus/pull/35643">#35643</a>)</li>
</ul>
<h4 id="Rolling-upgrade-improvements" class="common-anchor-header">Rolling upgrade improvements</h4><ul>
<li>Marked query node as read-only after suspended (<a href="https://github.com/milvus-io/milvus/pull/35586">#35586</a>)</li>
<li>Prevented coexistence of old coordinator with new node/proxy (<a href="https://github.com/milvus-io/milvus/pull/35760">#35760</a>)</li>
</ul>
<h4 id="Others" class="common-anchor-header">Others</h4><ul>
<li>Optimized Milvus core building process (<a href="https://github.com/milvus-io/milvus/pull/35660">#35660</a>)</li>
<li>Updated to protobuf-go v2 (<a href="https://github.com/milvus-io/milvus/pull/35555">#35555</a>)</li>
<li>Enhanced tracing with hex string encoding for traceid and spanid (<a href="https://github.com/milvus-io/milvus/pull/35568">#35568</a>)</li>
<li>Added hit segment number metrics for query hook (<a href="https://github.com/milvus-io/milvus/pull/35619">#35619</a>)</li>
<li>Improved compatibility with old SDK for configure load param feature (<a href="https://github.com/milvus-io/milvus/pull/35573">#35573</a>)</li>
<li>Added support for HTTP v1/v2 throttling (<a href="https://github.com/milvus-io/milvus/pull/35504">#35504</a>)</li>
<li>Fixed index memory estimation (<a href="https://github.com/milvus-io/milvus/pull/35670">#35670</a>)</li>
<li>Ability to write multiple segments in mix compactor to avoid large segment generation (<a href="https://github.com/milvus-io/milvus/pull/35648">#35648</a>)</li>
</ul>
<h2 id="v249" class="common-anchor-header">v2.4.9<button data-href="#v249" class="anchor-icon" translate="no">
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
    </button></h2><p>Release Date: August 20, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.9</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.9 addresses a critical issue which could return results less than limit (topk) in some corner cases and includes several key improvements to enhance the performance and usability of the platform.</p>
<h3 id="Critical-fixes" class="common-anchor-header">Critical fixes</h3><ul>
<li>Excluded l0 segment from readable snapshot (<a href="https://github.com/milvus-io/milvus/pull/35510">#35510</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Removed duplicated schema helper creation in the proxy (<a href="https://github.com/milvus-io/milvus/pull/35502">#35502</a>).</li>
<li>Added support for compiling Milvus on Ubuntu 20.04 (<a href="https://github.com/milvus-io/milvus/pull/35457">#35457</a>).</li>
<li>Optimized the use of locks and avoided double flush clustering buffer writer (<a href="https://github.com/milvus-io/milvus/pull/35490">#35490</a>).</li>
<li>Removed the invalid log (<a href="https://github.com/milvus-io/milvus/pull/35473">#35473</a>).</li>
<li>Added a clustering compaction user guide doc (<a href="https://github.com/milvus-io/milvus/pull/35428">#35428</a>).</li>
<li>Added support for dynamic fields in the schema helper (<a href="https://github.com/milvus-io/milvus/pull/35469">#35469</a>).</li>
<li>Added the msgchannel section in the generated YAML (<a href="https://github.com/milvus-io/milvus/pull/35466">#35466</a>).</li>
</ul>
<h2 id="v248" class="common-anchor-header">v2.4.8<button data-href="#v248" class="anchor-icon" translate="no">
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
    </button></h2><p>Release Date: August 14, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.8</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus 2.4.8 introduced several significant improvements to the system’s performance and stability. The most notable feature was the implementation of clustering compaction, a mechanism that enhances search and query efficiency by redistributing data in large collections based on a designated clustering key, reducing the amount of data scanned. Compaction was also decoupled from the shard DataNode, allowing any DataNode to perform compaction independently, which improved fault tolerance, stability, performance, and scalability. Additionally, the interface between the Go and C++ components was refactored to use asynchronous CGO calls, addressing issues like session timeouts, while several other performance optimizations were made based on profiling. The application dependencies were also updated to address known security vulnerabilities. Moreover, this release also includes numerous performance optimizations and critical bug fixes.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li>Implemented clustering compaction, allowing data to be redistributed based on a designated clustering key to enhance query efficiency (<a href="https://github.com/milvus-io/milvus/pull/34326">#34326</a>), (<a href="https://github.com/milvus-io/milvus/pull/34363">#34363</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Implemented asynchronous search and retrieval capabilities in CGO. (<a href="https://github.com/milvus-io/milvus/pull/34200">#34200</a>)</li>
<li>Separated the compaction process from the Shard DataNode to improve system modularity. (<a href="https://github.com/milvus-io/milvus/pull/34157">#34157</a>)</li>
<li>Added support for client pooling in QueryNode within the proxy/delegator to enhance performance. (<a href="https://github.com/milvus-io/milvus/pull/35195">#35195</a>)</li>
<li>Integrated Sonic to minimize CPU overhead during JSON marshaling and unmarshaling in Gin and RestfulV1 handlers. (<a href="https://github.com/milvus-io/milvus/pull/35018">#35018</a>)</li>
<li>Introduced an in-memory cache to optimize authentication result retrieval. (<a href="https://github.com/milvus-io/milvus/pull/35272">#35272</a>)</li>
<li>Modified the default metric type for autoindex. [<a href="https://github.com/milvus-io/milvus/pull/34277">#34277</a>, <a href="https://github.com/milvus-io/milvus/pull/34479">#34479</a>]</li>
<li>Refactored the runtime memory format for variable columns, leading to reduced memory usage. [<a href="https://github.com/milvus-io/milvus/pull/34367">#34367</a>, <a href="https://github.com/milvus-io/milvus/pull/35012">#35012</a>, <a href="https://github.com/milvus-io/milvus/pull/35041">#35041</a>]</li>
<li>Refactored compaction processes to enable persistent data storage. (<a href="https://github.com/milvus-io/milvus/pull/34268">#34268</a>)</li>
<li>Enabled memory-mapped file support for growing segments, improving memory management. (<a href="https://github.com/milvus-io/milvus/pull/34110">#34110</a>)</li>
<li>Improved access logs by adding RESTful API support, logging consistency levels, and distinguishing between system and user errors. [<a href="https://github.com/milvus-io/milvus/pull/34295">#34295</a>, <a href="https://github.com/milvus-io/milvus/pull/34352">#34352</a>, <a href="https://github.com/milvus-io/milvus/pull/34396">#34396</a>]</li>
<li>Utilized the new <code translate="no">range_search_k</code> parameter in Knowhere to speed up range searches. (<a href="https://github.com/milvus-io/milvus/pull/34709">#34709</a>)</li>
<li>Applied blocked Bloom filters to enhance the speed of filter construction and querying. [<a href="https://github.com/milvus-io/milvus/pull/34377">#34377</a>, <a href="https://github.com/milvus-io/milvus/pull/34922">#34922</a>]</li>
<li>Memory Usage Improvements:
<ul>
<li>Pre-allocated space for DataNode insert buffers. (<a href="https://github.com/milvus-io/milvus/pull/34205">#34205</a>)</li>
<li>Pre-allocated <code translate="no">FieldData</code> for Reduce operations. (<a href="https://github.com/milvus-io/milvus/pull/34254">#34254</a>)</li>
<li>Released records in delete codec to prevent memory leaks. (<a href="https://github.com/milvus-io/milvus/pull/34506">#34506</a>)</li>
<li>Controlled concurrency level of the disk file manager during file loading. (<a href="https://github.com/milvus-io/milvus/pull/35282">#35282</a>)</li>
<li>Optimized Go runtime garbage collection logic for timely memory release. (<a href="https://github.com/milvus-io/milvus/pull/34950">#34950</a>)</li>
<li>Implemented a new seal policy for growing segments. (<a href="https://github.com/milvus-io/milvus/pull/34779">#34779</a>)</li>
</ul></li>
<li>DataCoord Enhancements:
<ul>
<li>Reduced CPU usage. [<a href="https://github.com/milvus-io/milvus/pull/34231">#34231</a>, <a href="https://github.com/milvus-io/milvus/pull/34309">#34309</a>]</li>
<li>Implemented faster garbage collection exit logic. (<a href="https://github.com/milvus-io/milvus/pull/35051">#35051</a>)</li>
<li>Improved worker node scheduling algorithms. (<a href="https://github.com/milvus-io/milvus/pull/34382">#34382</a>)</li>
<li>Enhanced segment size control algorithm specifically for import operations. (<a href="https://github.com/milvus-io/milvus/pull/35149">#35149</a>)</li>
</ul></li>
<li>Load Balancing Algorithm Improvements:
<ul>
<li>Reduced the memory overload factor on the delegator. (<a href="https://github.com/milvus-io/milvus/pull/35164">#35164</a>)</li>
<li>Allocated fixed memory size for the delegator. (<a href="https://github.com/milvus-io/milvus/pull/34600">#34600</a>)</li>
<li>Avoided excessive allocation of segments and channels for new query nodes. (<a href="https://github.com/milvus-io/milvus/pull/34245">#34245</a>)</li>
<li>Reduced the number of tasks per scheduling cycle by Query Coordinator while increasing scheduling frequency. (<a href="https://github.com/milvus-io/milvus/pull/34987">#34987</a>)</li>
<li>Enhanced channel balancing algorithm on the DataNode. (<a href="https://github.com/milvus-io/milvus/pull/35033">#35033</a>)</li>
</ul></li>
<li>Expanded System Metrics: Added new metrics across various components to monitor specific aspects including:
<ul>
<li>Force-deny-writing state. (<a href="https://github.com/milvus-io/milvus/pull/34989">#34989</a>)</li>
<li>Queue latency. (<a href="https://github.com/milvus-io/milvus/pull/34788">#34788</a>)</li>
<li>Disk quota. (<a href="https://github.com/milvus-io/milvus/pull/35306">#35306</a>)</li>
<li>Task execution time. (<a href="https://github.com/milvus-io/milvus/pull/35141">#35141</a>)</li>
<li>Binlog size. (<a href="https://github.com/milvus-io/milvus/pull/35235">#35235</a>)</li>
<li>Insert rate. (<a href="https://github.com/milvus-io/milvus/pull/35188">#35188</a>)</li>
<li>Memory high water level. (<a href="https://github.com/milvus-io/milvus/pull/35188">#35188</a>)</li>
<li>RESTful API metrics. (<a href="https://github.com/milvus-io/milvus/pull/35083">#35083</a>)</li>
<li>Search latency. (<a href="https://github.com/milvus-io/milvus/pull/34783">#34783</a>)</li>
</ul></li>
</ul>
<h3 id="Changes" class="common-anchor-header">Changes</h3><ul>
<li><p>For open-source users, this version changes the metric types in AutoIndex for <code translate="no">FloatVector</code> and <code translate="no">BinaryVector</code> to <code translate="no">Cosine</code> and <code translate="no">Hamming</code>, respectively.</p></li>
<li><p><strong>Fixed Third-Party Dependency Versions</strong>:</p>
<ul>
<li>This release introduces fixed versions for certain third-party dependency libraries, significantly enhancing Milvus’s software supply chain management.</li>
<li>By isolating the project from upstream changes, it safeguards daily builds from potential disruptions.</li>
<li>The update ensures stability by exclusively hosting validated C++ third-party packages on JFrog Cloud and utilizing Conan Recipe Revisions (RREV).</li>
<li>This approach mitigates the risk of breaking changes from updates in ConanCenter.</li>
<li>Developers using Ubuntu 22.04 will benefit immediately from these changes. However, developers on other operating systems may need to upgrade their <code translate="no">glibc</code> version to avoid compatibility issues.</li>
</ul></li>
</ul>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Critical bug fixes</h3><ul>
<li>Fixed an issue where deletion data was lost due to segments being omitted during L0 compaction. [<a href="https://github.com/milvus-io/milvus/pull/33980">#33980</a>, <a href="https://github.com/milvus-io/milvus/pull/34363">#34363</a>]</li>
<li>Rectified a problem where delete messages failed to be forwarded due to incorrect data scope handling. (<a href="https://github.com/milvus-io/milvus/pull/35313">#35313</a>)</li>
<li>Resolved a SIGBUS exception that occurred due to incorrect usage of <code translate="no">mmap</code>. [<a href="https://github.com/milvus-io/milvus/pull/34455">#34455</a>, <a href="https://github.com/milvus-io/milvus/pull/34530">#34530</a>]</li>
<li>Fixed crashes caused by illegal search expressions. (<a href="https://github.com/milvus-io/milvus/pull/35307">#35307</a>)</li>
<li>Corrected an issue where DataNode watch failed due to an incorrect timeout setting in the watch context. (<a href="https://github.com/milvus-io/milvus/pull/35017">#35017</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Addressed security vulnerabilities by upgrading certain dependencies. [<a href="https://github.com/milvus-io/milvus/pull/33927">#33927</a>, <a href="https://github.com/milvus-io/milvus/pull/34693">#34693</a>]</li>
<li>Fixed a parsing error triggered by excessively long expressions. (<a href="https://github.com/milvus-io/milvus/pull/34957">#34957</a>)</li>
<li>Resolved a memory leak that occurred during query plan parsing. (<a href="https://github.com/milvus-io/milvus/pull/34932">#34932</a>)</li>
<li>Fixed an issue where dynamic log level modifications were not taking effect. (<a href="https://github.com/milvus-io/milvus/pull/34777">#34777</a>)</li>
<li>Resolved an issue where group by queries on growing data failed due to uninitialized segment offsets. (<a href="https://github.com/milvus-io/milvus/pull/34750">#34750</a>)</li>
<li>Corrected the setting of search parameters when using the Knowhere iterator. (<a href="https://github.com/milvus-io/milvus/pull/34732">#34732</a>)</li>
<li>Revised the logic for checking the status of the partition load. (<a href="https://github.com/milvus-io/milvus/pull/34305">#34305</a>)</li>
<li>Fixed an issue where privilege cache updates failed due to unhandled request errors. (<a href="https://github.com/milvus-io/milvus/pull/34697">#34697</a>)</li>
<li>Resolved a failure in loaded collection recovery after QueryCoord restarted. (<a href="https://github.com/milvus-io/milvus/pull/35211">#35211</a>)</li>
<li>Fixed an issue of load idempotence by removing unnecessary index parameter validation. (<a href="https://github.com/milvus-io/milvus/pull/35179">#35179</a>)</li>
<li>Ensured <code translate="no">compressBinlog</code> is executed to allow <code translate="no">reloadFromKV</code> to properly fill binlog’s <code translate="no">logID</code> after DataCoord restarts. (<a href="https://github.com/milvus-io/milvus/pull/34062">#34062</a>)</li>
<li>Fixed an issue where collection metadata was not removed after garbage collection in DataCoord. (<a href="https://github.com/milvus-io/milvus/pull/34884">#34884</a>)</li>
<li>Resolved a memory leak in SegmentManager within DataCoord by removing flushed segments generated through imports. (<a href="https://github.com/milvus-io/milvus/pull/34651">#34651</a>)</li>
<li>Fixed a panic issue when compaction was disabled and a collection was dropped. (<a href="https://github.com/milvus-io/milvus/pull/34206">#34206</a>)</li>
<li>Fixed an out-of-memory issue in DataNode by enhancing the memory usage estimation algorithm. (<a href="https://github.com/milvus-io/milvus/pull/34203">#34203</a>)</li>
<li>Prevented burst memory usage when multiple vector retrieval requests hit a cache miss by implementing singleflight for chunk cache. (<a href="https://github.com/milvus-io/milvus/pull/34283">#34283</a>)</li>
<li>Captured <code translate="no">ErrKeyNotFound</code> during CAS (Compare and Swap) operations in the configuration. (<a href="https://github.com/milvus-io/milvus/pull/34489">#34489</a>)</li>
<li>Fixed an issue where configuration updates failed due to mistakenly using the formatted value in a CAS operation. (<a href="https://github.com/milvus-io/milvus/pull/34373">#34373</a>)</li>
</ul>
<h3 id="Miscellaneous" class="common-anchor-header">Miscellaneous</h3><ul>
<li>Added support for the OTLP HTTP exporter, enhancing observability and monitoring capabilities. [<a href="https://github.com/milvus-io/milvus/pull/35073">#35073</a>, <a href="https://github.com/milvus-io/milvus/pull/35299">#35299</a>]</li>
<li>Enhanced database functionality by introducing properties such as “max collections” and “disk quota,” which can now be dynamically modified. [<a href="https://github.com/milvus-io/milvus/pull/34511">#34511</a>, <a href="https://github.com/milvus-io/milvus/pull/34386">#34386</a>]</li>
<li>Added tracing capabilities for L0 compaction processes within DataNode to improve diagnostics and monitoring. (<a href="https://github.com/milvus-io/milvus/pull/33898">#33898</a>)</li>
<li>Introduced quota configuration for the number of L0 segment entries per collection, enabling better control over deletion rates by applying backpressure. (<a href="https://github.com/milvus-io/milvus/pull/34837">#34837</a>)</li>
<li>Extended the rate-limiting mechanism for insert operations to also cover upsert operations, ensuring consistent performance under high load. (<a href="https://github.com/milvus-io/milvus/pull/34616">#34616</a>)</li>
<li>Implemented a dynamic CGO pool for proxy CGO calls, optimizing resource usage and performance. (<a href="https://github.com/milvus-io/milvus/pull/34842">#34842</a>)</li>
<li>Enabled the DiskAnn compile option for Ubuntu, Rocky, and Amazon operating systems, improving compatibility and performance on these platforms. (<a href="https://github.com/milvus-io/milvus/pull/34244">#34244</a>)</li>
<li>Upgraded Conan to version 1.64.1, ensuring compatibility with the latest features and improvements. (<a href="https://github.com/milvus-io/milvus/pull/35216">#35216</a>)</li>
<li>Updated Knowhere to version 2.3.7, bringing in performance enhancements and new features. (<a href="https://github.com/milvus-io/milvus/pull/34709">#34709</a>)</li>
<li>Fixed the revision of specific third-party packages to ensure consistent builds and reduce the risk of unexpected changes. (<a href="https://github.com/milvus-io/milvus/pull/35316">#35316</a>)</li>
</ul>
<h2 id="v246" class="common-anchor-header">v2.4.6<button data-href="#v246" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: July 16, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.6</td><td>2.4.4</td><td>2.4.2</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.6 is a bug-fix release that addresses critical issues such as panics, memory leaks, and data loss during deletions. It also introduces several optimizations, including enhancements to monitoring metrics, upgrading the Go version to 1.21, and improving the user experience for RESTful count(*) queries.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Enhanced the user-friendliness of RESTful API queries (<a href="https://github.com/milvus-io/milvus/pull/34444">#34444</a>).</li>
<li>Upgraded the Go version from 1.20 to 1.21 (<a href="https://github.com/milvus-io/milvus/pull/33940">#33940</a>).</li>
<li>Optimized the histogram metric bucket for finer granularity in bucketing (<a href="https://github.com/milvus-io/milvus/pull/34592">#34592</a>).</li>
<li>Upgraded Pulsar dependency version from 2.8.2 to 2.9.5. It’s recommended to upgrade Pulsar to 2.9.5 since Milvus 2.4.6.</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed an issue where the GetReplicas API returned a nil status (<a href="https://github.com/milvus-io/milvus/pull/34019">#34019</a>).</li>
<li>Corrected a problem where queries could return deleted records (<a href="https://github.com/milvus-io/milvus/pull/34502">#34502</a>).</li>
<li>Resolved an issue where IndexNode would get stuck during stopping due to incorrect lifetime control (<a href="https://github.com/milvus-io/milvus/pull/34559">#34559</a>).</li>
<li>Fixed a memory leak of primary key oracle objects when a worker is offline (<a href="https://github.com/milvus-io/milvus/pull/34020">#34020</a>).</li>
<li>Corrected ChannelManagerImplV2 to notify the correct Node, addressing parameter capture issues in loop closure (<a href="https://github.com/milvus-io/milvus/pull/34004">#34004</a>).</li>
<li>Fixed a read-write data race in ImportTask segmentsInfo by implementing a deep copy (<a href="https://github.com/milvus-io/milvus/pull/34126">#34126</a>).</li>
<li>Corrected version information for the “legacyVersionWithoutRPCWatch” configuration option to prevent errors during rolling upgrades (<a href="https://github.com/milvus-io/milvus/pull/34185">#34185</a>).</li>
<li>Fixed the metric for the number of partitions loaded (<a href="https://github.com/milvus-io/milvus/pull/34195">#34195</a>).</li>
<li>Passed the <code translate="no">otlpSecure</code> config when setting up segcore tracing (<a href="https://github.com/milvus-io/milvus/pull/34210">#34210</a>).</li>
<li>Fixed an issue where DataCoord’s properties were overwritten by mistake (<a href="https://github.com/milvus-io/milvus/pull/34240">#34240</a>).</li>
<li>Resolved a data loss issue caused by erroneously merging two newly created message streams (<a href="https://github.com/milvus-io/milvus/pull/34563">#34563</a>).</li>
<li>Fixed a panic caused by msgstream trying to consume an invalid pchannel (<a href="https://github.com/milvus-io/milvus/pull/34230">#34230</a>).</li>
<li>Addressed an issue where imports could generate orphaned files (<a href="https://github.com/milvus-io/milvus/pull/34071">#34071</a>).</li>
<li>Fixed incomplete query results due to duplicate primary keys in a segment (<a href="https://github.com/milvus-io/milvus/pull/34302">#34302</a>).</li>
<li>Resolved an issue of missing sealed segments in L0 compaction (<a href="https://github.com/milvus-io/milvus/pull/34566">#34566</a>).</li>
<li>Fixed the problem of dirty data in the channel-cp meta generated after garbage collection (<a href="https://github.com/milvus-io/milvus/pull/34609">#34609</a>).</li>
<li>Corrected the metrics where database_num was 0 after restarting RootCoord (<a href="https://github.com/milvus-io/milvus/pull/34010">#34010</a>).</li>
<li>Fixed a memory leak in SegmentManager in DataCoord by removing flushed segments generated through import (<a href="https://github.com/milvus-io/milvus/pull/34652">#34652</a>).</li>
<li>Ensured compressBinlog to fill binlogs’ logID after DataCoord restarts, ensuring proper reload from KV (<a href="https://github.com/milvus-io/milvus/pull/34064">#34064</a>).</li>
</ul>
<h2 id="v245" class="common-anchor-header">v2.4.5<button data-href="#v245" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: June 18, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.5</td><td>2.4.4</td><td>2.4.1</td><td>2.4.3</td></tr>
</tbody>
</table>
<p>The release of Milvus 2.4.5 introduces several improvements and bug fixes to enhance performance, stability, and functionality. Milvus 2.4.5 simplifies sparse, float16, and bfloat16 vector search with auto-indexing, speeds up searches, deletions, and compactions with Bloom filter optimizations, and tackles data management through faster loading times and import L0 segment support. It also introduces the sparse HNSW index for efficient high-dimensional sparse data search, enhances the RESTful API with sparse float vector support, and fixes critical bugs for better stability.</p>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><ul>
<li>Added rbac support to describe/alter database api (<a href="https://github.com/milvus-io/milvus/pull/33804">#33804</a>)</li>
<li>Supported building the HNSW index for sparse vectors (<a href="https://github.com/milvus-io/milvus/pull/33653">#33653</a>, <a href="https://github.com/milvus-io/milvus/pull/33662">#33662</a>)</li>
<li>Supported building the Disk index for binary vector (<a href="https://github.com/milvus-io/milvus/pull/33575">#33575</a>)</li>
<li>Supported sparse vector type on RESTful v2 (<a href="https://github.com/milvus-io/milvus/pull/33555">#33555</a>)</li>
<li>Add /management/stop RESTful api to stop a component (<a href="https://github.com/milvus-io/milvus/pull/33799">#33799</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Set maxPartitionNum default value to 1024 (<a href="https://github.com/milvus-io/milvus/pull/33950">#33950</a>)</li>
<li>Enabled to Force reset connection for unavailable error (<a href="https://github.com/milvus-io/milvus/pull/33910">#33910</a>)</li>
<li>Enabled flush rate limiter of collection level (<a href="https://github.com/milvus-io/milvus/pull/33864">#33864</a>)</li>
<li>Executed bloom filter apply in parallel to speed up segment predict (<a href="https://github.com/milvus-io/milvus/pull/33793">#33793</a>)</li>
<li>Used fastjson lib for unmarshal delete log to speed up json.Unmarshal(<a href="https://github.com/milvus-io/milvus/pull/33802">#33802</a>)</li>
<li>Used BatchPkExist to reduce bloom filter func call cost (<a href="https://github.com/milvus-io/milvus/pull/33752">#33752</a>)</li>
<li>Speeded up the loading of small collections (<a href="https://github.com/milvus-io/milvus/pull/33746">#33746</a>)</li>
<li>Supported import delete data to L0 segment  (<a href="https://github.com/milvus-io/milvus/pull/33712">#33712</a>)</li>
<li>Skipped mark compaction tasks to be timeouted to aviod executing the same task over and over again (<a href="https://github.com/milvus-io/milvus/pull/33833">#33833</a>)</li>
<li>Handled float16 and bfloat16 vectors as same as BinaryVector in numpy bulk insert  (<a href="https://github.com/milvus-io/milvus/pull/33788">#33788</a>)</li>
<li>Added the includeCurrentMsg flag for the seek method (<a href="https://github.com/milvus-io/milvus/pull/33743">#33743</a>)</li>
<li>Added mergeInterval, targetBufSize, maxTolerantLagof msgdispatcher to configs (<a href="https://github.com/milvus-io/milvus/pull/33680">#33680</a>)</li>
<li>Improved GetVectorByID of sparse vector (<a href="https://github.com/milvus-io/milvus/pull/33652">#33652</a>)</li>
<li>Removed StringPrimarykey to reduce unnecessary copy and function call cost  (<a href="https://github.com/milvus-io/milvus/pull/33649">#33649</a>)</li>
<li>Added autoindex mapping for binary/sparse data type (<a href="https://github.com/milvus-io/milvus/pull/33625">#33625</a>)</li>
<li>Optimized some cache to reduce memory usage (<a href="https://github.com/milvus-io/milvus/pull/33560">#33560</a>)</li>
<li>Abstracted execute interface for import/preimport task  (<a href="https://github.com/milvus-io/milvus/pull/33607">#33607</a>)</li>
<li>Used map pk to timestamp in buffer insert to reduce bf causes (<a href="https://github.com/milvus-io/milvus/pull/33582">#33582</a>)</li>
<li>Avoided redundant meta operations of import  (<a href="https://github.com/milvus-io/milvus/pull/33519">#33519</a>)</li>
<li>Improve logs by logging better disk quota info,  adding UseDefaultConsistency flag, removing unnecessary logs (<a href="https://github.com/milvus-io/milvus/pull/33597">#33597</a>, <a href="https://github.com/milvus-io/milvus/pull/33644">#33644</a>, <a href="https://github.com/milvus-io/milvus/pull/33670">#33670</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed a bug that queryHook unable to recognize vector type (<a href="https://github.com/milvus-io/milvus/pull/33911">#33911</a>)</li>
<li>Prevented use captured iteration variable partitionID (<a href="https://github.com/milvus-io/milvus/pull/33970">#33970</a>)</li>
<li>Fixed a bug that may cause Milvus to be unable to create AutoIndex on binary and sparse vectors (<a href="https://github.com/milvus-io/milvus/pull/33867">#33867</a>)</li>
<li>Fixed a bug that may cause indexnode to retry creating index on invalid index params of all vectors（<a href="https://github.com/milvus-io/milvus/pull/33878">#33878</a>)</li>
<li>Fixed the bug that when loads and releases happen concurrently may crash the Server(<a href="https://github.com/milvus-io/milvus/pull/33699">#33699</a>)</li>
<li>Improved cache consistency for configuration values (<a href="https://github.com/milvus-io/milvus/pull/33797">#33797</a>)</li>
<li>Prevented possible data loss during deletion (<a href="https://github.com/milvus-io/milvus/pull/33821">#33821</a>)</li>
<li>Ensured the DroppedAt field (likely deletion timestamp) is set after dropping collections(<a href="https://github.com/milvus-io/milvus/pull/33767">#33767</a>)</li>
<li>Fixed an issue that might have caused Milvus to handle binary vector data sizes incorrectly(<a href="https://github.com/milvus-io/milvus/pull/33751">#33751</a>)</li>
<li>Prevented sensitive Kafka credentials from being logged in plain text.(<a href="https://github.com/milvus-io/milvus/pull/33694">#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Ensured Milvus can correctly import data with multiple vector fields.(<a href="https://github.com/milvus-io/milvus/pull/33724">#33724</a>)</li>
<li>Enhanced import reliability by checking if an import job exists before starting. (<a href="https://github.com/milvus-io/milvus/pull/33673">#33673</a>)</li>
<li>Improved handling of the sparse HNSW index (internal functionality) (<a href="https://github.com/milvus-io/milvus/pull/33714">#33714</a>)</li>
<li>Cleaned vector memory to avoid memory leak(<a href="https://github.com/milvus-io/milvus/pull/33708">#33708</a>)</li>
<li>Ensured smoother asynchronous warmup by fixing a state lock issue.(<a href="https://github.com/milvus-io/milvus/pull/33687">#33687</a>)</li>
<li>Addressed a bug that might have caused missing results in query iterators. (<a href="https://github.com/milvus-io/milvus/pull/33506">#33506</a>)</li>
<li>Fixed a bug that might cause import segment size is uneven  (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Fixed incorrect data size handling for bf16, fp16, and binary vector types (<a href="https://github.com/milvus-io/milvus/pull/33488">#33488</a>)</li>
<li>Improved stability by addressing potential issues with the L0 compactor(<a href="https://github.com/milvus-io/milvus/pull/33564">#33564</a>)</li>
<li>Ensured dynamic configuration updates are reflected correctly in the cache. (<a href="https://github.com/milvus-io/milvus/pull/33590">#33590</a>)</li>
<li>Improved the accuracy of the RootCoordQuotaStates metric  (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Ensured accurate reporting of the number of loaded entities in metric(<a href="https://github.com/milvus-io/milvus/pull/33522">#33522</a>)</li>
<li>Provided more complete information in exception logs.  (<a href="https://github.com/milvus-io/milvus/pull/33396">#33396</a>)</li>
<li>Optimized query pipeline by removing unnecessary group checker (<a href="https://github.com/milvus-io/milvus/pull/33485">#33485</a>)</li>
<li>Used the local storage path for a more accurate disk capacity check on the index node. (<a href="https://github.com/milvus-io/milvus/pull/33505">#33505</a>)</li>
<li>Corrected hasMoreResult may return false when hit number larger than limit (<a href="https://github.com/milvus-io/milvus/pull/33642">#33642</a>)</li>
<li>Delayed load bf in delegator to prevent bfs been loaded over and over again when worker has no more memory (<a href="https://github.com/milvus-io/milvus/pull/33650">#33650</a>)- Fixed a bug that queryHook unable to recognize vector type (<a href="https://github.com/milvus-io/milvus/pull/33911">#33911</a>)</li>
<li>Prevented use captured iteration variable partitionID (<a href="https://github.com/milvus-io/milvus/pull/33970">#33970</a>)</li>
<li>Fixed a bug that may cause Milvus to be unable to create AutoIndex on binary and sparse vectors (<a href="https://github.com/milvus-io/milvus/pull/33867">#33867</a>)</li>
<li>Fixed a bug that may cause indexnode to retry creating index on invalid index params of all vectors（<a href="https://github.com/milvus-io/milvus/pull/33878">#33878</a>)</li>
<li>Fixed the bug that when loads and releases happen concurrently may crash the Server(<a href="https://github.com/milvus-io/milvus/pull/33699">#33699</a>)</li>
<li>Improved cache consistency for configuration values (<a href="https://github.com/milvus-io/milvus/pull/33797">#33797</a>)</li>
<li>Prevented possible data loss during deletion (<a href="https://github.com/milvus-io/milvus/pull/33821">#33821</a>)</li>
<li>Ensured the DroppedAt field (likely deletion timestamp) is set after dropping collections(<a href="https://github.com/milvus-io/milvus/pull/33767">#33767</a>)</li>
<li>Fixed an issue that might have caused Milvus to handle binary vector data sizes incorrectly(<a href="https://github.com/milvus-io/milvus/pull/33751">#33751</a>)</li>
<li>Prevented sensitive Kafka credentials from being logged in plain text.(<a href="https://github.com/milvus-io/milvus/pull/33694">#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Ensured Milvus can correctly import data with multiple vector fields.(<a href="https://github.com/milvus-io/milvus/pull/33724">#33724</a>)</li>
<li>Enhanced import reliability by checking if an import job exists before starting. (<a href="https://github.com/milvus-io/milvus/pull/33673">#33673</a>)</li>
<li>Improved handling of the sparse HNSW index (internal functionality) (<a href="https://github.com/milvus-io/milvus/pull/33714">#33714</a>)</li>
<li>Cleaned vector memory to avoid memory leak(<a href="https://github.com/milvus-io/milvus/pull/33708">#33708</a>)</li>
<li>Ensured smoother asynchronous warmup by fixing a state lock issue.(<a href="https://github.com/milvus-io/milvus/pull/33687">#33687</a>)</li>
<li>Addressed a bug that might have caused missing results in query iterators. (<a href="https://github.com/milvus-io/milvus/pull/33506">#33506</a>)</li>
<li>Fixed a bug that might cause import segment size is uneven  (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Fixed incorrect data size handling for bf16, fp16, and binary vector types (<a href="https://github.com/milvus-io/milvus/pull/33488">#33488</a>)</li>
<li>Improved stability by addressing potential issues with the L0 compactor(<a href="https://github.com/milvus-io/milvus/pull/33564">#33564</a>)</li>
<li>Ensured dynamic configuration updates are reflected correctly in the cache. (<a href="https://github.com/milvus-io/milvus/pull/33590">#33590</a>)</li>
<li>Improved the accuracy of the RootCoordQuotaStates metric  (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Ensured accurate reporting of the number of loaded entities in metric(<a href="https://github.com/milvus-io/milvus/pull/33522">#33522</a>)</li>
<li>Provided more complete information in exception logs.  (<a href="https://github.com/milvus-io/milvus/pull/33396">#33396</a>)</li>
<li>Optimized query pipeline by removing unnecessary group checker (<a href="https://github.com/milvus-io/milvus/pull/33485">#33485</a>)</li>
<li>Used the local storage path for a more accurate disk capacity check on the index node. (<a href="https://github.com/milvus-io/milvus/pull/33505">#33505</a>)</li>
<li>Corrected hasMoreResult may return false when hit number larger than limit (<a href="https://github.com/milvus-io/milvus/pull/33642">#33642</a>)</li>
<li>Delayed load bf in delegator to prevent bfs been loaded over and over again when worker has no more memory (<a href="https://github.com/milvus-io/milvus/pull/33650">#33650</a>)</li>
</ul>
<h2 id="v244" class="common-anchor-header">v2.4.4<button data-href="#v244" class="anchor-icon" translate="no">
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
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.4</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus v2.4.4 includes several critical bug fixes and improvements aimed at enhancing performance and stability. Notably, we’ve <strong>resolved a critical issue where bulk insert statistics logs were incorrectly garbage collected</strong>, potentially affecting data integrity. <strong>We strongly recommend all v2.4 users upgrade to this version to benefit from these fixes.</strong></p>
<p><strong>If you are using bulk insert, upgrade to v2.4.4 at the earliest opportunity for data integrity.</strong></p>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Critical bug fixes</h3><ul>
<li>Filled stats log ID and validated its correctness (<a href="https://github.com/milvus-io/milvus/pull/33478">#33478</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Upgraded bitset for ARM SVE (<a href="https://github.com/milvus-io/milvus/pull/33440">#33440</a>)</li>
<li>Enabled Milvus compilation with GCC-13 (<a href="https://github.com/milvus-io/milvus/pull/33441">#33441</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Displayed empty collections when all privilege is granted (<a href="https://github.com/milvus-io/milvus/pull/33454">#33454</a>)</li>
<li>Ensured CMake downloads and installs for the current platform, not just x86_64 (<a href="https://github.com/milvus-io/milvus/pull/33439">#33439</a>)</li>
</ul>
<h2 id="v243" class="common-anchor-header">v2.4.3<button data-href="#v243" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 29, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.3</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus version 2.4.3 introduced a host of features, improvements, and bug fixes to elevate performance and reliability. Notable enhancements included support for sparse float vector bulk insert and optimized bloom filter acceleration. Improvements covered various areas, from dynamic configuration updates to memory usage optimization. Bug fixes addressed critical issues like panic scenarios and ensured smoother system operations. This release underscored Milvus’s ongoing commitment to enhancing functionality, optimizing performance, and delivering a robust user experience.</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li>Supported sparse float vector bulk insert for binlog/json/parquet (<a href="https://github.com/milvus-io/milvus/pull/32649">#32649</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Implemented Datacoord/node watch channel based on RPC (<a href="https://github.com/milvus-io/milvus/pull/32036">#32036</a>)</li>
<li>Optimized bloom filter to accelerate delete filtering (<a href="https://github.com/milvus-io/milvus/pull/32642">#32642</a>, <a href="https://github.com/milvus-io/milvus/pull/33329">#33329</a>, <a href="https://github.com/milvus-io/milvus/pull/33284">#33284</a>)</li>
<li>Loaded raw data via mmap if scalar index did not have raw data (<a href="https://github.com/milvus-io/milvus/pull/33317">#33317</a>)</li>
<li>Synced milvus config to milvus.yaml (<a href="https://github.com/milvus-io/milvus/pull/33322">#33322</a>, <a href="https://github.com/milvus-io/milvus/pull/32920">#32920</a>, <a href="https://github.com/milvus-io/milvus/pull/32857">#32857</a>, <a href="https://github.com/milvus-io/milvus/pull/32946">#32946</a>)</li>
<li>Updated knowhere version (<a href="https://github.com/milvus-io/milvus/pull/33310">#33310</a>, <a href="https://github.com/milvus-io/milvus/pull/32931">#32931</a>, <a href="https://github.com/milvus-io/milvus/pull/33043">#33043</a>)</li>
<li>Enabled dynamic updating of balancer policy in QueryCoord (<a href="https://github.com/milvus-io/milvus/pull/33272">#33272</a>)</li>
<li>Used a pre-built logger in the write buffer to minimize logger allocation (<a href="https://github.com/milvus-io/milvus/pull/33304">#33304</a>)</li>
<li>Improved parameter checking (<a href="https://github.com/milvus-io/milvus/pull/32777">#32777</a>, <a href="https://github.com/milvus-io/milvus/pull/33271">#33271</a>, <a href="https://github.com/milvus-io/milvus/pull/33218">#33218</a>)</li>
<li>Added a parameter to ignore incorrect message IDs in the checkpoint (<a href="https://github.com/milvus-io/milvus/pull/33249">#33249</a>)</li>
<li>Added config to control initialization failure handling for plugins (<a href="https://github.com/milvus-io/milvus/pull/32680">#32680</a>)</li>
<li>Added score compute consistency config for knowhere (<a href="https://github.com/milvus-io/milvus/pull/32997">#32997</a>)</li>
<li>Introduced a configuration option to control the initialization of public role permissions (<a href="https://github.com/milvus-io/milvus/pull/33174">#33174</a>)</li>
<li>Optimized memory usage when reading fields (<a href="https://github.com/milvus-io/milvus/pull/33196">#33196</a>)</li>
<li>Refined implementation of Channel Manager v2 (<a href="https://github.com/milvus-io/milvus/pull/33172">#33172</a>, <a href="https://github.com/milvus-io/milvus/pull/33121">#33121</a>, <a href="https://github.com/milvus-io/milvus/pull/33014">#33014</a>)</li>
<li>Added feature to track the size of data in memory for binlog (<a href="https://github.com/milvus-io/milvus/pull/33025">#33025</a>)</li>
<li>Added metrics for segment index files size (<a href="https://github.com/milvus-io/milvus/pull/32979">#32979</a>, <a href="https://github.com/milvus-io/milvus/pull/33305">#33305</a>)</li>
<li>Replaced Delete with DeletePartialMatch to remove metrics (<a href="https://github.com/milvus-io/milvus/pull/33029">#33029</a>)</li>
<li>Got related data size according to segment type (<a href="https://github.com/milvus-io/milvus/pull/33017">#33017</a>)</li>
<li>Cleaned channel node info in meta store (<a href="https://github.com/milvus-io/milvus/pull/32988">#32988</a>)</li>
<li>Removed rootcoord from datanode broker (<a href="https://github.com/milvus-io/milvus/pull/32818">#32818</a>)</li>
<li>Enabled batch uploading (<a href="https://github.com/milvus-io/milvus/pull/32788">#32788</a>)</li>
<li>Changed default partition number to 16 when using partition key (<a href="https://github.com/milvus-io/milvus/pull/32950">#32950</a>)</li>
<li>Improved reduce performance on very large top-k queries (<a href="https://github.com/milvus-io/milvus/pull/32871">#32871</a>)</li>
<li>Utilized TestLocations ability to accelerate write &amp; compaction (<a href="https://github.com/milvus-io/milvus/pull/32948">#32948</a>)</li>
<li>Optimized plan parser pool to avoid unnecessary recycling (<a href="https://github.com/milvus-io/milvus/pull/32869">#32869</a>)</li>
<li>Improved load speed (<a href="https://github.com/milvus-io/milvus/pull/32898">#32898</a>)</li>
<li>Used collection default consistency level for restv2 (<a href="https://github.com/milvus-io/milvus/pull/32956">#32956</a>)</li>
<li>Added cost response for the rest API (<a href="https://github.com/milvus-io/milvus/pull/32620">#32620</a>)</li>
<li>Enabled channel exclusive balance policy (<a href="https://github.com/milvus-io/milvus/pull/32911">#32911</a>)</li>
<li>Exposed describedatabase API in proxy (<a href="https://github.com/milvus-io/milvus/pull/32732">#32732</a>)</li>
<li>Utilized coll2replica mapping when getting RG by collection (<a href="https://github.com/milvus-io/milvus/pull/32892">#32892</a>)</li>
<li>Added more tracing for search &amp; query (<a href="https://github.com/milvus-io/milvus/pull/32734">#32734</a>)</li>
<li>Supported dynamic config for opentelemetry trace (<a href="https://github.com/milvus-io/milvus/pull/32169">#32169</a>)</li>
<li>Avoided iteration over channel results when updating leaderview (<a href="https://github.com/milvus-io/milvus/pull/32887">#32887</a>)</li>
<li>Optimized vector offsets handling for parquet (<a href="https://github.com/milvus-io/milvus/pull/32822">#32822</a>)</li>
<li>Improved datacoord segment filtering with collection (<a href="https://github.com/milvus-io/milvus/pull/32831">#32831</a>)</li>
<li>Adjusted log level and frequency (<a href="https://github.com/milvus-io/milvus/pull/33042">#33042</a>, <a href="https://github.com/milvus-io/milvus/pull/32838">#32838</a>, <a href="https://github.com/milvus-io/milvus/pull/33337">#33337</a>)</li>
<li>Enabled stopping balance after balance had been suspended (<a href="https://github.com/milvus-io/milvus/pull/32812">#32812</a>)</li>
<li>Updated shard leader cache when leader location changed (<a href="https://github.com/milvus-io/milvus/pull/32470">#32470</a>)</li>
<li>Removed deprecated API and field (<a href="https://github.com/milvus-io/milvus/pull/32808">#32808</a>, <a href="https://github.com/milvus-io/milvus/pull/32704">#32704</a>)</li>
<li>Added metautil.channel to convert string compare to int (<a href="https://github.com/milvus-io/milvus/pull/32749">#32749</a>)</li>
<li>Added type info for payload writer error message and log when querynode found new collection (<a href="https://github.com/milvus-io/milvus/pull/32522">#32522</a>)</li>
<li>Checked partition number when creating collection with partition key (<a href="https://github.com/milvus-io/milvus/pull/32670">#32670</a>)</li>
<li>Removed legacy l0 segment if watch failed (<a href="https://github.com/milvus-io/milvus/pull/32725">#32725</a>)</li>
<li>Improved printing type of request (<a href="https://github.com/milvus-io/milvus/pull/33319">#33319</a>)</li>
<li>Checked array field data was nil before getting the type (<a href="https://github.com/milvus-io/milvus/pull/33311">#33311</a>)</li>
<li>Returned error when startup Delete/AddNode node operation failed (<a href="https://github.com/milvus-io/milvus/pull/33258">#33258</a>)</li>
<li>Allowed datanode’s server ID to be updated (<a href="https://github.com/milvus-io/milvus/pull/31597">#31597</a>)</li>
<li>Unified querynode metrics cleanup in collection release (<a href="https://github.com/milvus-io/milvus/pull/32805">#32805</a>)</li>
<li>Fixed scalar auto index config incorrect version (<a href="https://github.com/milvus-io/milvus/pull/32795">#32795</a>)</li>
<li>Refined index param check for create/alter index (<a href="https://github.com/milvus-io/milvus/pull/32712">#32712</a>)</li>
<li>Removed redundant replica recovery (<a href="https://github.com/milvus-io/milvus/pull/32985">#32985</a>)</li>
<li>Enabled channel meta table to write more than 200k segments (<a href="https://github.com/milvus-io/milvus/pull/33300">#33300</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed panic when the database didn’t exist in the rate limit interceptor (<a href="https://github.com/milvus-io/milvus/pull/33308">#33308</a>)</li>
<li>Fixed quotacenter metrics collection failure due to incorrect parameters (<a href="https://github.com/milvus-io/milvus/pull/33399">#33399</a>)</li>
<li>Fixed panic if processactivestandby returned an error (<a href="https://github.com/milvus-io/milvus/pull/33372">#33372</a>)</li>
<li>Fixed search result truncation in restful v2 when nq &gt; 1 (<a href="https://github.com/milvus-io/milvus/pull/33363">#33363</a>)</li>
<li>Added database name field for role operations in restful v2 (<a href="https://github.com/milvus-io/milvus/pull/33291">#33291</a>)</li>
<li>Fixed global rate limit not working (<a href="https://github.com/milvus-io/milvus/pull/33336">#33336</a>)</li>
<li>Fixed panic caused by failure of building index (<a href="https://github.com/milvus-io/milvus/pull/33314">#33314</a>)</li>
<li>Added validation for sparse vector in segcore to ensure legality (<a href="https://github.com/milvus-io/milvus/pull/33312">#33312</a>)</li>
<li>Removed task from syncmgr after task completion (<a href="https://github.com/milvus-io/milvus/pull/33303">#33303</a>)</li>
<li>Fixed partition key filtering failure during data import (<a href="https://github.com/milvus-io/milvus/pull/33277">#33277</a>)</li>
<li>Fixed inability to generate traceID when using noop exporter (<a href="https://github.com/milvus-io/milvus/pull/33208">#33208</a>)</li>
<li>Improved query results retrieval (<a href="https://github.com/milvus-io/milvus/pull/33179">#33179</a>)</li>
<li>Marked channel checkpoint dropped to prevent checkpoint lag metrics leakage (<a href="https://github.com/milvus-io/milvus/pull/33201">#33201</a>)</li>
<li>Fixed query node getting stuck during stopping progress (<a href="https://github.com/milvus-io/milvus/pull/33154">#33154</a>)</li>
<li>Fixed missing segments in flush response (<a href="https://github.com/milvus-io/milvus/pull/33061">#33061</a>)</li>
<li>Made submit operation idempotent (<a href="https://github.com/milvus-io/milvus/pull/33053">#33053</a>)</li>
<li>Allocated new slice for each batch in streaming reader (<a href="https://github.com/milvus-io/milvus/pull/33360">#33360</a>)</li>
<li>Cleaned offline node from resource group after QueryCoord restart (<a href="https://github.com/milvus-io/milvus/pull/33233">#33233</a>)</li>
<li>Removed l0 compactor in completedCompactor (<a href="https://github.com/milvus-io/milvus/pull/33216">#33216</a>)</li>
<li>Reset quota value when initializing the limiter (<a href="https://github.com/milvus-io/milvus/pull/33152">#33152</a>)</li>
<li>Fixed issue where etcd limit was exceeded (<a href="https://github.com/milvus-io/milvus/pull/33041">#33041</a>)</li>
<li>Resolved etcd transaction limit exceedance due to too many fields (<a href="https://github.com/milvus-io/milvus/pull/33040">#33040</a>)</li>
<li>Removed RLock re-entry in GetNumRowsOfPartition (<a href="https://github.com/milvus-io/milvus/pull/33045">#33045</a>)</li>
<li>Started LeaderCacheObserver before SyncAll (<a href="https://github.com/milvus-io/milvus/pull/33035">#33035</a>)</li>
<li>Enabled balancing of released standby channel (<a href="https://github.com/milvus-io/milvus/pull/32986">#32986</a>)</li>
<li>Initialized access logger before server initialization (<a href="https://github.com/milvus-io/milvus/pull/32976">#32976</a>)</li>
<li>Made compactor capable of clearing empty segments (<a href="https://github.com/milvus-io/milvus/pull/32821">#32821</a>)</li>
<li>Filled deltalog entry number and time range in l0 compactions (<a href="https://github.com/milvus-io/milvus/pull/33004">#33004</a>)</li>
<li>Fixed proxy crash due to shard leader cache data race (<a href="https://github.com/milvus-io/milvus/pull/32971">#32971</a>)</li>
<li>Corrected time unit for load index metric (<a href="https://github.com/milvus-io/milvus/pull/32935">#32935</a>)</li>
<li>Fixed issue where segment on stopping query node couldn’t be released successfully (<a href="https://github.com/milvus-io/milvus/pull/32929">#32929</a>)</li>
<li>Fixed index resource estimation (<a href="https://github.com/milvus-io/milvus/pull/32842">#32842</a>)</li>
<li>Set channel checkpoint to delta position (<a href="https://github.com/milvus-io/milvus/pull/32878">#32878</a>)</li>
<li>Made syncmgr lock key before returning future (<a href="https://github.com/milvus-io/milvus/pull/32865">#32865</a>)</li>
<li>Ensured inverted index had only one segment (<a href="https://github.com/milvus-io/milvus/pull/32858">#32858</a>)</li>
<li>Fixed compaction trigger choosing two identical segments (<a href="https://github.com/milvus-io/milvus/pull/32800">#32800</a>)</li>
<li>Fixed issue where partition name could not be specified in binlog import (<a href="https://github.com/milvus-io/milvus/pull/32730">#32730</a>, <a href="https://github.com/milvus-io/milvus/pull/33027">#33027</a>)</li>
<li>Made dynamic column optional in parquet import (<a href="https://github.com/milvus-io/milvus/pull/32738">#32738</a>)</li>
<li>Skipped checking auto ID when inserting data (<a href="https://github.com/milvus-io/milvus/pull/32775">#32775</a>)</li>
<li>Validated number of rows for insert field data with schema (<a href="https://github.com/milvus-io/milvus/pull/32770">#32770</a>)</li>
<li>Added Wrapper and Keepalive for CTraceContext IDs (<a href="https://github.com/milvus-io/milvus/pull/32746">#32746</a>)</li>
<li>Fixed issue where database name was not found in the datacoord meta object (<a href="https://github.com/milvus-io/milvus/pull/33412">#33412</a>)</li>
<li>Synchronized dropped segment for dropped partition (<a href="https://github.com/milvus-io/milvus/pull/33332">#33332</a>)</li>
<li>Fixed quotaCenter metrics collection failure due to incorrect parameters (<a href="https://github.com/milvus-io/milvus/pull/33399">#33399</a>)</li>
</ul>
<h2 id="v241" class="common-anchor-header">v2.4.1<button data-href="#v241" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 6, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.1</td><td>2.4.1</td><td>2.4.0</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus version 2.4.1 brings numerous improvements and bug fixes that aim to enhance the software’s performance, observability, and stability. These improvements include a declarative resource group API, enhanced bulk insert functionality that supports Float16/BFloat16 vector data types, a refined garbage collection (GC) mechanism that reduces list operations for object storage, and other changes related to performance optimizations. Additionally, bug fixes address issues such as compilation errors, failed fuzzy matches on newline characters, incorrect parameter datatypes for RESTful interfaces, and BulkInsert raising errors on numpy files when dynamic fields are enabled.</p>
<h3 id="Breaking-changes" class="common-anchor-header">Breaking changes</h3><ul>
<li>Discontinued support for delete with an empty filter expression. (<a href="https://github.com/milvus-io/milvus/pull/32472">#32472</a>)</li>
</ul>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li>Added support for Float16/BFloat16 vector data types in bulk insert (<a href="https://github.com/milvus-io/milvus/pull/32157">#32157</a>)</li>
<li>Enhanced sparse float vector to support brute force iterator search and range search (<a href="https://github.com/milvus-io/milvus/pull/32635">#32635</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Added declarative resource group api (<a href="https://github.com/milvus-io/milvus/pull/31930">#31930</a>, <a href="https://github.com/milvus-io/milvus/pull/32297">#32297</a>, <a href="https://github.com/milvus-io/milvus/pull/32536">#32536</a>, <a href="https://github.com/milvus-io/milvus/pull/32666">#32666</a>)</li>
<li>Rewrote the collection observer in QueryCoord to make it task-driven (<a href="https://github.com/milvus-io/milvus/pull/32441">#32441</a>)</li>
<li>Refactored the data structure used in the SyncManager of DataNode to reduce memory usage and prevent errors (<a href="https://github.com/milvus-io/milvus/pull/32673">#32673</a>)</li>
<li>Revised the implementation of garbage collection to minimize list operations associated with object storage (<a href="https://github.com/milvus-io/milvus/pull/31740">#31740</a>)</li>
<li>Reduced the cpu usage when collection number is high (<a href="https://github.com/milvus-io/milvus/pull/32245">#32245</a>)</li>
<li>Enhanced the management of milvus.yaml by automatically generating relevant configuration items in the milvus.yaml file through code (<a href="https://github.com/milvus-io/milvus/pull/31832">#31832</a>, <a href="https://github.com/milvus-io/milvus/pull/32357">#32357</a>)</li>
<li>Enhanced the performance of the Query by retrieving the data after performing local reduction (<a href="https://github.com/milvus-io/milvus/pull/32346">#32346</a>)</li>
<li>Added WithBlock option for etcd client creation (<a href="https://github.com/milvus-io/milvus/pull/32641">#32641</a>)</li>
<li>Used client_request_id specified by the client as the TraceID if client provided (<a href="https://github.com/milvus-io/milvus/pull/32264">#32264</a>)</li>
<li>Added db label to the metrics for the delete and bulk insert operations (<a href="https://github.com/milvus-io/milvus/pull/32611">#32611</a>)</li>
<li>Added logic to skip the verification through configuration for AutoID and PartitionKey columns (<a href="https://github.com/milvus-io/milvus/pull/32592">#32592</a>)</li>
<li>Refined errors related to authentication (<a href="https://github.com/milvus-io/milvus/pull/32253">#32253</a>)</li>
<li>Refined error logs for AllocSegmentID in DataCoord (<a href="https://github.com/milvus-io/milvus/pull/32351">#32351</a>, <a href="https://github.com/milvus-io/milvus/pull/32335">#32335</a>)</li>
<li>Removed duplicate metrics (<a href="https://github.com/milvus-io/milvus/pull/32380">#32380</a>, <a href="https://github.com/milvus-io/milvus/pull/32308">#32308</a>) and cleaned up unused metrics (<a href="https://github.com/milvus-io/milvus/pull/32404">#32404</a>, <a href="https://github.com/milvus-io/milvus/pull/32515">#32515</a>)</li>
<li>Added configuration option to control whether to enforce the activation of the partitionKey feature (<a href="https://github.com/milvus-io/milvus/pull/32433">#32433</a>)</li>
<li>Added configuration option to control the maximum amount of data that can be inserted in a single request (<a href="https://github.com/milvus-io/milvus/pull/32433">#32433</a>)</li>
<li>Parallelize the applyDelete operation at the segment level to accelerate the processing of Delete messages by the Delegator (<a href="https://github.com/milvus-io/milvus/pull/32291">#32291</a>)</li>
<li>Used index (<a href="https://github.com/milvus-io/milvus/pull/32232">#32232</a>, <a href="https://github.com/milvus-io/milvus/pull/32505">#32505</a>, <a href="https://github.com/milvus-io/milvus/pull/32533">#32533</a>, <a href="https://github.com/milvus-io/milvus/pull/32595">#32595</a>) and add cache (<a href="https://github.com/milvus-io/milvus/pull/32580">#32580</a>) to accelerate frequent filtering operations in QueryCoord.</li>
<li>Rewrote the data structure (<a href="https://github.com/milvus-io/milvus/pull/32273">#32273</a>) and refactored code (<a href="https://github.com/milvus-io/milvus/pull/32389">#32389</a>) to accelerate common operations in DataCoord.</li>
<li>Removed openblas from conan (<a href="https://github.com/milvus-io/milvus/pull/32002">#32002</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed build milvus in rockylinux8 (<a href="https://github.com/milvus-io/milvus/pull/32619">#32619</a>)</li>
<li>Fixed compilation errors for SVE on ARM (<a href="https://github.com/milvus-io/milvus/pull/32463">#32463</a>, <a href="https://github.com/milvus-io/milvus/pull/32270">#32270</a>)</li>
<li>Fixed the crash issue on ARM-based GPU images (<a href="https://github.com/milvus-io/milvus/pull/31980">#31980</a>)</li>
<li>Fixed regex query can’t handle text with newline (<a href="https://github.com/milvus-io/milvus/pull/32569">#32569</a>)</li>
<li>Fixed search get empty result caused by GetShardLeaders return empty node list (<a href="https://github.com/milvus-io/milvus/pull/32685">#32685</a>)</li>
<li>Fixed BulkInsert raised error when encountering dynamic fields in numpy files (<a href="https://github.com/milvus-io/milvus/pull/32596">#32596</a>)</li>
<li>Fixed bugs related to the RESTFulV2 interface, including an important fix that allows numeric parameters in requests to accept numerical input instead of string type (<a href="https://github.com/milvus-io/milvus/pull/32485">#32485</a>, <a href="https://github.com/milvus-io/milvus/pull/32355">#32355</a>)</li>
<li>Fixed memory leak in proxy by removing watching config event in rate limiter (<a href="https://github.com/milvus-io/milvus/pull/32313">#32313</a>)</li>
<li>Fixed the issue where the rate limiter incorrectly reports that the partition cannot be found when partitionName is not specified (<a href="https://github.com/milvus-io/milvus/pull/32647">#32647</a>)</li>
<li>Added detection between the cases of Collection being in the recovery state and not being loaded in the error type. (<a href="https://github.com/milvus-io/milvus/pull/32447">#32447</a>)</li>
<li>Corrected the negative queryable num entities metric (<a href="https://github.com/milvus-io/milvus/pull/32361">#32361</a>)</li>
</ul>
<h2 id="v240" class="common-anchor-header">v2.4.0<button data-href="#v240" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: April 17, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.0</td><td>2.4.0</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>We are excited to announce the official launch of Milvus 2.4.- Building upon the solid foundation of the 2.4.0-rc.1 release, we have focused on addressing critical bugs reported by our users, while preserving the existing functionality. In addition, Milvus 2.4.0 introduces a range of optimizations aimed at enhancing system performance, improving observability through the incorporation of various metrics, and streamlining the codebase for increased simplicity.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Support for MinIO TLS connections (<a href="https://github.com/milvus-io/milvus/pull/31396">#31396</a>, <a href="https://github.com/milvus-io/milvus/pull/31618">#31618</a>)</li>
<li>AutoIndex support for scalar fields (<a href="https://github.com/milvus-io/milvus/pull/31593">#31593</a>)</li>
<li>Hybrid search refactoring for consistent execution paths with regular search (<a href="https://github.com/milvus-io/milvus/pull/31742">#31742</a>, <a href="https://github.com/milvus-io/milvus/pull/32178">#32178</a>)</li>
<li>Accelerated filtering through bitset and bitset_view refactoring (<a href="https://github.com/milvus-io/milvus/pull/31592">#31592</a>, <a href="https://github.com/milvus-io/milvus/pull/31754">#31754</a>, <a href="https://github.com/milvus-io/milvus/pull/32139">#32139</a>)</li>
<li>Import tasks now support waiting for data index completion (<a href="https://github.com/milvus-io/milvus/pull/31733">#31733</a>)</li>
<li>Enhanced Import compatibility (<a href="https://github.com/milvus-io/milvus/pull/32121">#32121</a>), task scheduling (<a href="https://github.com/milvus-io/milvus/pull/31475">#31475</a>), and limits on imported file size and number (<a href="https://github.com/milvus-io/milvus/pull/31542">#31542</a>)</li>
<li>Code simplification efforts including interface standardization for type checking (<a href="https://github.com/milvus-io/milvus/pull/31945">#31945</a>, <a href="https://github.com/milvus-io/milvus/pull/31857">#31857</a>), removal of deprecated code and metrics (<a href="https://github.com/milvus-io/milvus/pull/32079">#32079</a>, <a href="https://github.com/milvus-io/milvus/pull/32134">#32134</a>, <a href="https://github.com/milvus-io/milvus/pull/31535">#31535</a>, <a href="https://github.com/milvus-io/milvus/pull/32211">#32211</a>, <a href="https://github.com/milvus-io/milvus/pull/31935">#31935</a>), and normalization of constant names (<a href="https://github.com/milvus-io/milvus/pull/31515">#31515</a>)</li>
<li>New metrics for QueryCoord current target channel check point lag latency (<a href="https://github.com/milvus-io/milvus/pull/31420">#31420</a>)</li>
<li>New db label for common metrics (<a href="https://github.com/milvus-io/milvus/pull/32024">#32024</a>)</li>
<li>New metrics regarding the count of deleted, indexed, and loaded entities, with the inclusion of labels such as collectionName and dbName (<a href="https://github.com/milvus-io/milvus/pull/31861">#31861</a>)</li>
<li>Error handling improvements for mismatched vector types (<a href="https://github.com/milvus-io/milvus/pull/31766">#31766</a>)</li>
<li>Support for throwing errors instead of crashing when index cannot be built (<a href="https://github.com/milvus-io/milvus/pull/31845">#31845</a>)</li>
<li>Support for invalidating the database meta cache when dropping databases (<a href="https://github.com/milvus-io/milvus/pull/32092">#32092</a>)</li>
<li>Interface refactoring for channel distribution (<a href="https://github.com/milvus-io/milvus/pull/31814">#31814</a>) and leader view management (<a href="https://github.com/milvus-io/milvus/pull/32127">#32127</a>)</li>
<li>Refactor channel dist manager interface (<a href="https://github.com/milvus-io/milvus/pull/31814">#31814</a>) and Refactor leader view manager interface (<a href="https://github.com/milvus-io/milvus/pull/32127">#32127</a>)</li>
<li>Batch processing (<a href="https://github.com/milvus-io/milvus/pull/31632">#31632</a>), adding mapping information (<a href="https://github.com/milvus-io/milvus/pull/32234">#32234</a>, <a href="https://github.com/milvus-io/milvus/pull/32249">#32249</a>), and avoiding usage of lock (<a href="https://github.com/milvus-io/milvus/pull/31787">#31787</a>) to accelerate frequently invoked operations</li>
</ul>
<h3 id="Breaking-Changes" class="common-anchor-header">Breaking Changes</h3><ul>
<li>Discontinued grouping search on binary vectors (<a href="https://github.com/milvus-io/milvus/pull/31735">#31735</a>)</li>
<li>Discontinued grouping search with hybrid search (<a href="https://github.com/milvus-io/milvus/pull/31812">#31812</a>)</li>
<li>Discontinued HNSW index on binary vectors (<a href="https://github.com/milvus-io/milvus/pull/31883">#31883</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Enhanced data type and value checks for queries and insertions to prevent crashes (<a href="https://github.com/milvus-io/milvus/pull/31478">#31478</a>, <a href="https://github.com/milvus-io/milvus/pull/31653">#31653</a>, <a href="https://github.com/milvus-io/milvus/pull/31698">#31698</a>, <a href="https://github.com/milvus-io/milvus/pull/31842">#31842</a>, <a href="https://github.com/milvus-io/milvus/pull/32042">#32042</a>, <a href="https://github.com/milvus-io/milvus/pull/32251">#32251</a>, <a href="https://github.com/milvus-io/milvus/pull/32204">#32204</a>)</li>
<li>RESTful API bug fixes (<a href="https://github.com/milvus-io/milvus/pull/32160">#32160</a>)</li>
<li>Improved prediction of inverted index resource usage (<a href="https://github.com/milvus-io/milvus/pull/31641">#31641</a>)</li>
<li>Resolution of connection issues with etcd when authorization is enabled (<a href="https://github.com/milvus-io/milvus/pull/31668">#31668</a>)</li>
<li>Security update for nats server (<a href="https://github.com/milvus-io/milvus/pull/32023">#32023</a>)</li>
<li>Stored inverted index files into a local storage path of QueryNode instead of /tmp (<a href="https://github.com/milvus-io/milvus/pull/32210">#32210</a>)</li>
<li>Addressed datacoord memory leaks for collectionInfo (<a href="https://github.com/milvus-io/milvus/pull/32243">#32243</a>)</li>
<li>Fixes for fp16/bf16 related bugs potentially causing system panic (<a href="https://github.com/milvus-io/milvus/pull/31677">#31677</a>, <a href="https://github.com/milvus-io/milvus/pull/31841">#31841</a>, <a href="https://github.com/milvus-io/milvus/pull/32196">#32196</a>)</li>
<li>Resolved issues with grouping search returning insufficient results (<a href="https://github.com/milvus-io/milvus/pull/32151">#32151</a>)</li>
<li>Adjustment of search with iterators to handle offsets in the Reduce step more effectively and ensure adequate results with “reduceStopForBest” enabled (<a href="https://github.com/milvus-io/milvus/pull/32088">#32088</a>)</li>
</ul>
<h2 id="v240-rc1" class="common-anchor-header">v2.4.0-rc.1<button data-href="#v240-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: March 20, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.4.0-rc.1</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>This release introduces several scenario-based features:</p>
<ul>
<li><p><strong>New GPU Index - CAGRA</strong>: Thanks to NVIDIA’s contribution, this new GPU index offers a 10x performance boost, especially for batch searches. For details, refer to <a href="/docs/gpu_index.md">GPU Index</a>.</p></li>
<li><p><strong>Multi-vector</strong> and <strong>Hybrid Search</strong>: This feature enables storing vector embeddings from multiple models and conducting hybrid searches. For details, refer to <a href="/docs/multi-vector-search.md">Hybrid Search</a>.</p></li>
<li><p><strong>Sparse Vectors</strong>: Ideal for keyword interpretation and analysis, sparse vectors are now supported for processing in your collection. For details, refer to <a href="/docs/sparse_vector.md">Sparse Vectors</a>.</p></li>
<li><p><strong>Grouping Search</strong>: Categorical aggregation enhances document-level recall for Retrieval-Augmented Generation (RAG) applications. For details, refer to <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Grouping Search</a>.</p></li>
<li><p><strong>Inverted Index</strong> and <strong>Fuzzy Matching</strong>: These capabilities improve keyword retrieval for scalar fields. For details, refer to <a href="/docs/index-scalar-fields.md">Index Scalar Fields</a> and <a href="/docs/single-vector-search.md#filtered-search">Filtered Search</a>.</p></li>
</ul>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><h4 id="GPU-Index---CAGRA" class="common-anchor-header">GPU Index - CAGRA</h4><p>We would like to express our sincere gratitude to the NVIDIA team for their invaluable contribution to CAGRA, a state-of-the-art (SoTA) GPU-based graph index that can be used online.</p>
<p>Unlike previous GPU indices, CAGRA demonstrates overwhelming superiority even in small batch queries, an area where CPU indices traditionally excel. In addition, CAGRA’s performance in large batch queries and index construction speed, domains where GPU indices already shine, is truly unparalleled.</p>
<p>Example code can be found in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_gpu_cagra.py">example_gpu_cagra.py</a>.</p>
<h4 id="Sparse-Vector-Beta" class="common-anchor-header">Sparse Vector (Beta)</h4><p>In this release, we are introducing a new type of vector field called sparse vector. Sparse vectors are different from their dense counterparts as they tend to have several magnitude higher number of dimensions with only a handful being non-zero. This feature offers better interpretability due to its term-based nature and can be more effective in certain domains. Learned sparse models such as SPLADEv2/BGE-M3 have proven to be very useful for common first-stage ranking tasks. The main use case for this new feature in Milvus is to allow efficient approximate semantic nearest neighbor search over sparse vectors generated by neural models such as SPLADEv2/BGE-M3 and statistics models such as the BM25 algorithm. Milvus now supports effective and high-performance storage, indexing, and searching (MIPS, Maximum Inner Product Search) of sparse vectors.</p>
<p>Example code can be found in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hello_sparse.py">hello_sparse.py</a>.</p>
<h4 id="Multi-Embedding---Hybrid-Search" class="common-anchor-header">Multi Embedding &amp;  Hybrid Search</h4><p>Multi-vector support is the cornerstone for applications that require multi-model data processing or a mix of dense and sparse vectors. With multi-vector support, now you can:</p>
<ul>
<li>Store vector embeddings generated for unstructured text, image, or audio samples from multiple models.</li>
<li>Conduct ANN searches that include multiple vectors of each entity.</li>
<li>Customize search strategies by assigning weights to different embedding models.</li>
<li>Experiment with various embedding models to find the optimal model combination.</li>
</ul>
<p>Multi-vector support allows storing, indexing, and applying reranking strategies to multiple vector fields of different types, such as FLOAT_VECTOR and SPARSE_FLOAT_VECTOR, in a collection. Currently, two reranking strategies are available: <strong>Reciprocal Rank Fusion (RRF)</strong> and <strong>Average Weighted Scoring</strong>. Both strategies combine the search results from different vector fields into a unified result set. The first strategy prioritizes the entities that consistently appear in the search results of different vector fields, while the other strategy assigns weights to the search results of each vector field to determine their importance in the final result set.</p>
<p>Example code can be found in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hybrid_search.py">hybrid_search.py</a>.</p>
<h4 id="Inverted-Index-and-Fuzzy-Match" class="common-anchor-header">Inverted Index and Fuzzy Match</h4><p>In previous releases of Milvus, memory-based binary search indexes and Marisa Trie indexes were used for scalar field indexing. However, these methods were memory-intensive. The latest release of Milvus now employs the Tantivy-based inverted index, which can be applied to all numeric and string data types. This new index dramatically improves scalar query performance, reducing the query of keywords in strings by ten times. In addition, The inverted index consumes less memory, thanks to additional optimizations in data compression and Memory-mapped storage (MMap) mechanism of the internal indexing structure.</p>
<p>This release also supports fuzzy matches in scalar filtering using prefixes, infixes, and suffixes.</p>
<p>Example code can be found in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/inverted_index_example.py">inverted_index_example.py</a> and <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/fuzzy_match.py">fuzzy_match.py</a>.</p>
<h4 id="Grouping-Search" class="common-anchor-header">Grouping Search</h4><p>You can now aggregate the search results by the values in a specific scalar field. This helps RAG applications to implement document-level recall. Consider a collection of documents, each document splits into various passages. Each passage is represented by one vector embedding and belongs to one document. To find the most relevant documents instead of scattering passages, you can include the group_by_field argument in the search() operation to group results by the document ID.</p>
<p>Example code can be found in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_group_by.py">example_group_by.py</a>.</p>
<h4 id="Float16-and-BFloat--Vector-DataType" class="common-anchor-header">Float16 and BFloat- Vector DataType</h4><p>Machine learning and neural networks often use half-precision data types, such as Float16 and BFloat- While these data types can improve query efficiency and reduce memory usage, they come with a tradeoff of reduced accuracy. With this release, Milvus now supports these data types for vector fields.</p>
<p>Example code can be found in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/float16_example.py">float16_example.py</a> and <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/bfloat16_example.py">bfloat16_example.py</a>.</p>
<h3 id="Upgraded-Architecture" class="common-anchor-header">Upgraded Architecture</h3><h4 id="L0-Segment" class="common-anchor-header">L0 Segment</h4><p>This release includes a new segment called L0 Segment, designed to record deleted data. This segment periodically compacts stored deleted records and splits them into sealed segments, reducing the number of data flushes required for small deletions and leaving a small storage footprint. With this mechanism, Milvus completely separates data compactions from data flushes, enhancing the performance of delete and upsert operations.</p>
<h4 id="Refactored-BulkInsert" class="common-anchor-header">Refactored BulkInsert</h4><p>This release also introduces improved bulk-insert logic. This allows you to import multiple files in a single bulk-insert request. With the refactored version, both the performance and stability of bulk insert have seen significant improvements. The user experience has also been enhanced, such as fine-tuned rate limiting and more user-friendly error messages. In addition, you can easily access the bulk-insert endpoints through Milvus’ RESTful API.</p>
<h4 id="Memory-mapped-Storage" class="common-anchor-header">Memory-mapped Storage</h4><p>Milvus uses memory-mapped storage (MMap) to optimize its memory usage. Instead of loading file content directly into memory, this mechanism maps the file content into memory. This approach comes with a tradeoff of performance degradation.  By enabling MMap for an HNSW-indexed collection on a host with 2 CPUs and 8 GB RAM, you can load 4x more data with less than 10% performance degradation.</p>
<p>In addition, this release also allows dynamic and fine-grained control over MMap without the need to restart Milvus.</p>
<p>For details, refer to <a href="/docs/mmap.md">MMap Storage</a>.</p>
<h3 id="Others" class="common-anchor-header">Others</h3><h4 id="Milvus-CDC" class="common-anchor-header">Milvus-CDC</h4><p>Milvus-CDC is an easy-to-use companion tool to capture and synchronize incremental data between Milvus instances, allowing for easy incremental backup and disaster recovery. In this release, Milvus-CDC has improved stability, and its Change Data Capture (CDC) functionality now becomes generally available.</p>
<p>To learn more about Milvus-CDC, refer to <a href="https://github.com/zilliztech/milvus-cdc">GitHub repository</a> and <a href="/docs/milvus-cdc-overview.md">Milvus-CDC Overview</a>.</p>
<h4 id="Refined-MilvusClient-Interfaces" class="common-anchor-header">Refined MilvusClient Interfaces</h4><p>MilvusClient is an easy-to-use alternative to the ORM module. It adopts a purely functional approach to simplify interactions with the server. Instead of maintaining a connection pool, each MilvusClient establishes a gRPC connection to the server.
The MilvusClient module has implemented most of the functionalities of the ORM module.
To learn more about the MilvusClient module, visit <a href="https://github.com/milvus-io/pymilvus">pymilvus</a> and the <a href="/api-reference/pymilvus/v2.4.x/About.md">reference documents</a>.</p>
