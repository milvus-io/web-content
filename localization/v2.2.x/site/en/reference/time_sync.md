---
id: time_sync.md
title: Time Synchronization
summary: Learn about the time synchronization system in Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Time Synchronization<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the time synchronization mechanism in Milvus.</p>
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
    </button></h2><p>The events in Milvus can be generally categorized in to two types:</p>
<ul>
<li><p>Data definition language (DDL) events: create/drop a collection, create/drop a partition, etc.</p></li>
<li><p>Data manipulation language (DML) events: insert, search, etc.</p></li>
</ul>
<p>Any event, no matter it is DDL or DML event, is marked with a timestamp that can indicate when this event occurs.</p>
<p>Suppose there are two users who initiate a series of DML and DDL events in Milvus in the time order shown in the following table.</p>
<table>
<thead>
<tr><th style="text-align:center">Timestamp</th><th style="text-align:center">User 1</th><th style="text-align:center">User 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Created a collection named <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Conducted a search on collection <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Inserted data <code translate="no">A1</code> into collection <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Conducted a search on collection <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Inserted data <code translate="no">A2</code> into collection <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Conducted a search on collection <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Deleted data <code translate="no">A1</code> from collection <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Conducted a search on collection <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>Ideally, user 2 should be able to see:</p>
<ul>
<li><p>An empty collection <code translate="no">C0</code> at <code translate="no">t2</code>.</p></li>
<li><p>Data <code translate="no">A1</code> at <code translate="no">t7</code>.</p></li>
<li><p>Both data <code translate="no">A1</code> and <code translate="no">A2</code> at <code translate="no">t12</code>.</p></li>
<li><p>Only data <code translate="no">A2</code> at <code translate="no">t17</code> (as data <code translate="no">A1</code> has been deleted from the collection before this point).</p></li>
</ul>
<p>This ideal scenario can be easily achieved when there is only one single node. However, Milvus is a distributed vector database, and to ensure all DML and DDL operations in different nodes are kept in order, Milvus needs to address the following two issues:</p>
<ol>
<li><p>The time clock is different for the two users in the example above if they are on different nodes. For instance, if user 2 is 24 hours behind user 1, all operations by user 1 are not visible to user 2 until the next day.</p></li>
<li><p>There can be network latency. If user 2 conducts a search on collection <code translate="no">C0</code> at <code translate="no">t17</code>, Milvus should be able to guarantee that all the operations before <code translate="no">t17</code> are successfully processed and completed. If the delete operation at <code translate="no">t15</code> is delayed due to network latency, it is very likely that user 2 can still see the supposedly deleted data <code translate="no">A1</code> when conducting a search at <code translate="no">t17</code>.</p></li>
</ol>
<p>Therefore, Milvus adopts a time synchronization system (timetick) to solve the issues.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Timestamp oracle (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>To solve the first issue mentioned in the previous section, Milvus, like other distributed systems, provides a timestamp oracle (TSO) service. This means that all events in Milvus must be allocated with a timestamp from TSO rather than from the local clock.</p>
<p>The TSO service is provided by the root coordinator in Milvus. Clients can allocate one or more timestamps in a single timestamp allocation request.</p>
<p>A TSO timestamp is a type of <code translate="no">uint64</code> value that is made up of a physical part and a logical part. The figure below demonstrates the format of a timestamp.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
    <span>TSO_Timestamp</span>
  </span>
.</p>
<p>As illustrated, the 46 bits at the beginning is the physical part, namely the UTC time in milliseconds. The last 18 bits is the logical part.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Time synchronization system (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>This section uses the example of a data insertion operation to explain the time synchronization mechanism in Milvus.</p>
<p>When proxy receives a data insertion request from SDK, it divides the insert messages into  different message streams (<code translate="no">MsgStream</code>) according to the hash value of the primary keys.</p>
<p>Each insert message (<code translate="no">InsertMsg</code>) is assigned a timestamp before being sent to the <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> is a wrapper of the message queue, which is Pulsar by default in Milvus 2.0.
</div>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
    <span>timesync_proxy_insert_msg</span>
  </span>
</p>
<p>One general principle is that in the <code translate="no">MsgStream</code>, the timestamps of the<code translate="no">InsertMsgs</code> from the same proxy must be incremental. However, there is no such rule for those of the <code translate="no">InsertMsgs</code> from different proxies.</p>
<p>The following figure is an example of <code translate="no">InsertMsgs</code> in a <code translate="no">MsgStream</code>. The snippet contains five <code translate="no">InsertMsgs</code>, three of which are from <code translate="no">Proxy1</code> and the rest from <code translate="no">Proxy2</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
    <span>msgstream</span>
  </span>
</p>
<p>The timestamps of the three <code translate="no">InsertMsgs</code> from <code translate="no">Proxy1</code> are incremental, and so are the two <code translate="no">InsertMsgs</code> from <code translate="no">Proxy2</code>. However, there is no particular order among <code translate="no">Proxy1</code> and <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>One possible scenario is that when reading a message with timestamp <code translate="no">110</code> from <code translate="no">Proxy2</code>, Milvus finds that the message with timestamp <code translate="no">80</code> from <code translate="no">Proxy1</code> is still in the <code translate="no">MsgStream</code>. Therefore, Milvus introduces a time synchronization system, timetick, to ensure that when reading a message from <code translate="no">MsgStream</code>, all messages with smaller timestamp values must be consumed.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
    <span>time_synchronization</span>
  </span>
</p>
<p>As shown in the figure above,</p>
<ul>
<li><p>Each proxy periodically (every 200 ms by default) reports the largest timestamp value of the latest <code translate="no">InsertMsg</code> in the <code translate="no">MsgStream</code>to root coord.</p></li>
<li><p>Root coord identifies the minimum timestamp value on this <code translate="no">Msgstream</code>, no matter to which proxy does the <code translate="no">InsertMsgs</code> belong. Then root coord  inserts this minimum timestamp into the <code translate="no">Msgstream</code>. This timestamp is also called timetick.</p></li>
<li><p>When the consumer components reads the timetick inserted by root coord, they understand that all insert messages with smaller timestamp values have been consumed. Therefore, relevant requests can be executed safely without interrupting the order.</p></li>
</ul>
<p>The following figure is an example of the <code translate="no">Msgstream</code> with a timetick inserted.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
    <span>timetick</span>
  </span>
</p>
<p><code translate="no">MsgStream</code> processes the messages in batches according to the time tick to ensure that the output messages meet the requirements of timestamp.</p>
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
<li>Learn about the concept of <a href="/docs/v2.2.x/timestamp.md">timestamp</a>.</li>
<li>Learn about the <a href="/docs/v2.2.x/data_processing.md">data processing workflow</a> in Milvus.</li>
</ul>
