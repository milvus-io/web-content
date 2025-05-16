---
id: timetravel_ref.md
related_key: Time Travel
summary: Learn the design and implementation details of Time Travel in Milvus.
title: ''
---
<h1 id="Time-Travel" class="common-anchor-header">Time Travel<button data-href="#Time-Travel" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the Time Travel feature in detail, including how it is designed and how it works in Milvus. See <a href="/docs/v2.0.x/timetravel.md">Search with Time Travel</a> for more information about how to use this feature.</p>
<p>Data engineers often need to roll back data to fix dirty data or bugs. Unlike traditional databases that use snapshots or retrain data to achieve data rollback, Milvus maintains a timeline for all data insert or delete operations. Therefore, users can specify the timestamp in a query to retrieve data at a specific point of time, which can significantly reduce maintenance costs.</p>
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
    </button></h2><p>When the proxy receives a data insert or delete request, it also gets a timestamp from root coord. Then, the proxy adds the timestamp as an additional field to the inserted or deleted data. Timestamp is a data field just like primary key (<code translate="no">pk</code>). Data in the same insert or delete request share the same timestamp. The timestamp field is stored together with other data fields of a collection.</p>
<p>When you load a collection to memory, all data in the collection, including their corresponding timestamps, are loaded into memory.</p>
<p>During a search, if the search request received by the proxy contains the parameter, <code translate="no">travel_timestamp</code>, the value of this parameter will be passed to <a href="https://github.com/milvus-io/milvus/tree/master/docs/design_docs/segcore">segcore</a>, the execution engine which supports concurrent insertion, deletion, query, index loading, monitoring and statistics of a segment data in memory. The segcore filters the search results by timestamp.</p>
<h2 id="Search-implementation" class="common-anchor-header">Search implementation<button data-href="#Search-implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Searches with filtering in knowhere is achieved by bitset. Bitset can be applied in the following three aspects:</p>
<ul>
<li>Delete data</li>
<li>Timestamp</li>
<li>Attribute filtering</li>
</ul>
<p>When searching in segcore, you can obtain a bitset indicating if the timestamp meets the condition. Then, the segcore combines the timestamp bitset with the other two types of bitsets, data deletion bitset and attribute filtering bitset. Finally, a bitset containing all deletion, attribute filtering, and timestamp information is generated. Then Milvus judges the range of data to query or search based on this bitset.</p>
<p>All CRUD operations within Milvus are executed in memory. Therefore, you need to <a href="/docs/v2.0.x/search.md#Load-collection">load collection from disk to memory</a> before searching with Time Travel.</p>
<h3 id="Sealed-segment" class="common-anchor-header">Sealed segment</h3><p>For sealed segments, you need to call <code translate="no">collection.load()</code> to load the collection to memory before searching with Time Travel. As an additional field of data, timestamps are also loaded to memory when you call <code translate="no">collection.load()</code>. When loading, segcore builds an index, <code translate="no">TimestampIndex</code> , on the timestamp field. The index contains information about the smallest and the largest timestamp of this sealed segment, and the offset, or the row number, of each timestamp in the segment.</p>
<p>When you search with Time Travel, Milvus first filters the sealed segment according to the smallest and largest timestamp in the <code translate="no">TimestampIndex</code>:</p>
<ul>
<li>If the value you set for <code translate="no">travel_timestamp</code> is greater than the largest timestamp of the segment, this means all the data in this segment meets the requirement. Therefore, the bitset of the data in this segment is marked as 1.</li>
<li>If the value you set for <code translate="no">travel_timestamp</code> is smaller than the smallest timestamp of the segment, this means the data in this segment does not meet the requirement. Therefore, the bitset of the data in this segment is marked as 0.</li>
<li>If the value you set for <code translate="no">travel_timestamp</code> is between the largest and the smallest timestamp of the segment, Milvus compares the timestamps in the segment one by one, and generates a bitset accordingly. In the bitset, if the data meet the requirement, they are marked with 1, and 0 if they do not.</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/time_travel.png" alt="Time_travel" class="doc-image" id="time_travel" />
    <span>Time_travel</span>
  </span>
</p>
<h3 id="Growing-segment" class="common-anchor-header">Growing segment</h3><p>For growing segments, you do not need to load the collection to memory. All inserted data exists in memory, with the timestamp field attached. Data in growing segments are sorted according to the order of timestamp. When new data are inserted, they are added to the segment in the order of their timestamp. Segment data are organized in segcore memory in the same way.</p>
<p>When you search with Time Travel, Milvus uses binary search to find the first offset, or the row number data, with their timestamp value greater than the value you set for the <code translate="no">travel_timestamp</code> parameter. Then subsequent operations including filtering and vector similarity search are conducted within this range of offsets.</p>
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
    </button></h2><p>After learning how Time Travel works in Milvus, you might also want to:</p>
<ul>
<li>Learn how to <a href="/docs/v2.0.x/timetravel.md">search with Time Travel</a></li>
<li>Learn the <a href="/docs/v2.0.x/architecture_overview.md">architecture</a> of Milvus.</li>
<li>Understand <a href="/docs/v2.0.x/data_processing.md">how data are processed</a> in Milvus.</li>
</ul>
