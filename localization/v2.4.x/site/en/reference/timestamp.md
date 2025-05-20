---
id: timestamp.md
title: Timestamp in Milvus
summary: >-
  Learn about the concept of timestamp and the four main timestamp-related
  parameters in the Milvus vector database.
---
<h1 id="Timestamp" class="common-anchor-header">Timestamp<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic explains the concept of timestamp and introduces the four main timestamp-related parameters in the Milvus vector database.</p>
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
    </button></h2><p>Milvus is a vector database that can search and query vectors converted from unstructured data. When conducting a data manipulation language (DML) operation, including <a href="https://milvus.io/docs/v2.1.x/data_processing.md">data insertion and deletion</a>, Milvus assigns timestamps to the entities involved in the operation. Therefore, all entities in Milvus has a timestamp attribute. And the batches of entities in the same DML operation share the same timestamp value.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Timestamp parameters<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Several timestamp-related parameters are involved when you conduct a vector similarity search or query in Milvus.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> is a type of timestamp used to ensure that all data updates by DML operations before the <code translate="no">Guarantee_timestamp</code> are visible when a vector similarity search or query is conducted. For example, if you inserted a batch of data at 3 pm, another batch at 5 pm, and the value of <code translate="no">Guarantee_timestamp</code> is set as 6pm during a vector similarity search. This means that the two batches of data inserted at 3 pm and 5pm respectively should be involved in the search.</p>
<p>If the <code translate="no">Guarantee_timestamp</code> is not configured, Milvus automatically takes the point in time when the search request is made. Therefore, the search is conducted on a data view with all data updates by DML operations before the search.</p>
<p>To save you the trouble of understanding the <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> inside Milvus, as a user, you do not have to directly configure the <code translate="no">Guarantee_timestamp</code> parameter. You only need to choose the <a href="https://milvus.io/docs/v2.1.x/consistency.md">consistency level</a>, and Milvus automatically handles the <code translate="no">Guarantee_timestamp</code> parameter for you. Each consistency level corresponds to a certain <code translate="no">Guarantee_timestamp</code> value.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
    <span>Guarantee_Timestamp</span>
  </span>
.</p>
<h4 id="Example" class="common-anchor-header">Example</h4><p>As shown in the illustration above, the value of <code translate="no">Guarantee_timestamp</code> is set as <code translate="no">2021-08-26T18:15:00</code> (for simplicity, the timestamp in this example is represented by physical time). When you conduct a search or query, all data before 2021-08-26T18:15:00 are searched or queried.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> is a type of timestamp automatically generated and managed by query nodes in Milvus. It is used to indicate which DML operations are executed by query nodes.</p>
<p>The data managed by query nodes can be categorized into two types:</p>
<ul>
<li><p>Historical data (or also called batch data)</p></li>
<li><p>Incremental data (or also called streaming data).</p></li>
</ul>
<p>In Milvus, you need to load the data before conducting a search or query. Therefore, batch data in a collection are loaded by query node before a search or query request is made. However, streaming data are inserted into or deleted from Milvus on the fly, which requires the query node to keep a timeline of the DML operations and the search or query requests. As a result, query nodes use <code translate="no">Service_timestamp</code> to keep such a timeline.  <code translate="no">Service_timestamp</code> can be seen as the time point when certain data is visible as query nodes can ensure that all DML operations before <code translate="no">Service_timestamp</code> are completed.</p>
<p>When there is an incoming search or query request, a query node compares the values of <code translate="no">Service_timestamp</code> and <code translate="no">Guarantee_timestamp</code>. There are mainly two scenarios.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
    <span>Service_Timestamp</span>
  </span>
.</p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Scenario 1: <code translate="no">Service_timestamp</code> >= <code translate="no">Guarantee_timestamp</code></h4><p>As shown in the figure 1, the value of <code translate="no">Guarantee_timestamp</code> is set as <code translate="no">2021-08-26T18:15:00</code>. When the value of <code translate="no">Service_timestamp</code> is grown to <code translate="no">2021-08-26T18:15:01</code>, this means that all DML operations before this point in time are executed and completed by the query node, including those DML operations before the time indicated by <code translate="no">Guarantee_timestamp</code>. As a result, the search or query request can be executed immediately.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Scenario 2: <code translate="no">Service_timestamp</code> < <code translate="no">Guarantee_timestamp</code></h4><p>As shown in the figure 2, the value of <code translate="no">Guarantee_timestamp</code> is set as <code translate="no">2021-08-26T18:15:00</code>, and the current value of <code translate="no">Service_timestamp</code> is only <code translate="no">2021-08-26T18:14:55</code>. This means that only DML operations before <code translate="no">2021-08-26T18:14:55</code> are executed and completed, leaving part of the DML operations after this time point but before the <code translate="no">Guarantee_timestamp</code> unfinished. If the search or query is executed at this point, some of the data required are invisible and unavailable yet, seriously affecting the accuracy of the search or query results. Therefore, the query node needs to put off the search or query request until the DML operations before <code translate="no">guarantee_timestamp</code> are completed (i.e. when <code translate="no">Service_timestamp</code> >= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Technically speaking, <code translate="no">Graceful_time</code> is not a timestamp, but rather a time period (e.g. 100ms). However, <code translate="no">Graceful_time</code> is worth mentioning because it is strongly related to <code translate="no">Guarantee_timestamp</code> and <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> is a configurable parameter in the Milvus configuration file. It is used to indicate the period of time that can be tolerated before certain data become visible. In short, uncompleted DML operations during <code translate="no">Graceful_time</code> can be tolerated.</p>
<p>When there is an incoming search or query request,  there can be two scenarios.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
    <span>Graceful_Time</span>
  </span>
.</p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Scenario 1: <code translate="no">Service_timestamp</code>  +  <code translate="no">Graceful_time</code> >= <code translate="no">Guarantee_timestamp</code></h4><p>As shown in the figure 1, the value of <code translate="no">Guarantee_timestamp</code> is set as <code translate="no">2021-08-26T18:15:01</code>, and <code translate="no">Graceful_time</code> as <code translate="no">2s</code>. The value of <code translate="no">Service_timestamp</code> is grown to <code translate="no">2021-08-26T18:15:00</code>. Though the value of <code translate="no">Service_timestamp</code> is still smaller than that of <code translate="no">Guarantee_timestamp</code> and not all DML operations before <code translate="no">2021-08-26T18:15:01</code> are completed, a period of 2 seconds of data invisibility is tolerated as indicated by the value of <code translate="no">Graceful_time</code>. Therefore, the incoming search or query request can be executed immediately.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Scenario 2: <code translate="no">Service_timestamp</code>  +  <code translate="no">Graceful_time</code> < <code translate="no">Guarantee_timestamp</code></h4><p>As shown in the figure 2 , the value of <code translate="no">Guarantee_timestamp</code> is set as <code translate="no">2021-08-26T18:15:01</code>, and <code translate="no">Graceful_time</code> as <code translate="no">2s</code>. The current value of <code translate="no">Service_timestamp</code> is only <code translate="no">2021-08-26T18:14:54</code>.  This means that the expected DML operations are not completed yet and even given the 2 second of graceful time, data invisibility is still intolerable. Therefore, the query node needs to put off the search or query request until certain DML requests are completed (i.e. when <code translate="no">Service_timestamp</code>  +  <code translate="no">Graceful_time</code> >= <code translate="no">Guarantee_timestamp</code>).</p>
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
<li>Learn how <a href="/docs/v2.4.x/consistency.md">guarantee timestamp enables tunable consistency in Milvus</a></li>
</ul>
