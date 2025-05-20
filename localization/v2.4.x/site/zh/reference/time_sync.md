---
id: time_sync.md
title: 时间同步
summary: 了解 Milvus 的时间同步系统。
---
<h1 id="Time-Synchronization" class="common-anchor-header">时间同步<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍 Milvus 的时间同步机制。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 中的事件一般可分为两类：</p>
<ul>
<li><p>数据定义语言（DDL）事件：创建/删除集合、创建/删除分区等。</p></li>
<li><p>数据操作语言（DML）事件：插入、搜索等。</p></li>
</ul>
<p>任何事件，不管是 DDL 还是 DML 事件，都标有一个时间戳，可以显示该事件发生的时间。</p>
<p>假设有两个用户在 Milvus 中发起了一系列 DML 和 DDL 事件，时间顺序如下表所示。</p>
<table>
<thead>
<tr><th style="text-align:center">时间戳</th><th style="text-align:center">用户 1</th><th style="text-align:center">用户 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">创建了一个名为<code translate="no">C0</code> 的集合。</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">在<code translate="no">C0</code> 库中进行搜索。</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">将数据<code translate="no">A1</code> 插入数据集<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">在文集<code translate="no">C0</code> 中进行搜索。</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">将数据<code translate="no">A2</code> 插入数据集<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">对数据集进行搜索<code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">从数据集中删除数据<code translate="no">A1</code> <code translate="no">C0</code> .</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">对数据集进行搜索<code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>理想情况下，用户 2 应该能够看到</p>
<ul>
<li><p>一个空的集合<code translate="no">C0</code> 在<code translate="no">t2</code>.</p></li>
<li><p>数据<code translate="no">A1</code> ，网址<code translate="no">t7</code> 。</p></li>
<li><p>数据<code translate="no">A1</code> 和<code translate="no">A2</code> 均位于<code translate="no">t12</code> 。</p></li>
<li><p>只有<code translate="no">t17</code> 上的数据<code translate="no">A2</code> （因为在此之前，数据<code translate="no">A1</code> 已从集合中删除）。</p></li>
</ul>
<p>当只有一个节点时，这种理想情况很容易实现。但是，Milvus 是一个分布式向量数据库，为了确保不同节点中的所有 DML 和 DDL 操作都能保持有序，Milvus 需要解决以下两个问题：</p>
<ol>
<li><p>上面例子中的两个用户如果在不同的节点上，他们的时间时钟是不同的。例如，如果用户 2 比用户 1 晚 24 小时，那么用户 1 的所有操作在第二天之前都不会被用户 2 看到。</p></li>
<li><p>可能存在网络延迟。如果用户 2 在<code translate="no">t17</code> 上对集合<code translate="no">C0</code> 进行搜索，Milvus 应能保证<code translate="no">t17</code> 之前的所有操作都被成功处理并完成。如果<code translate="no">t15</code> 上的删除操作因网络延迟而延迟，那么用户 2 在<code translate="no">t17</code> 上进行搜索时，很可能仍能看到本应删除的数据<code translate="no">A1</code> 。</p></li>
</ol>
<p>因此，Milvus 采用了时间同步系统（timetick）来解决这些问题。</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">时间戳甲骨文（TSO）<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>为了解决上一节提到的第一个问题，Milvus 和其他分布式系统一样，提供了时间戳甲骨文（TSO）服务。这意味着 Milvus 中的所有事件都必须分配一个来自 TSO 而不是本地时钟的时间戳。</p>
<p>TSO 服务由 Milvus 的根协调器提供。客户端可以在单个时间戳分配请求中分配一个或多个时间戳。</p>
<p>TSO 时间戳是一种<code translate="no">uint64</code> 值，由物理部分和逻辑部分组成。下图展示了时间戳的格式。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>如图所示，开头的 46 位是物理部分，即以毫秒为单位的 UTC 时间。最后 18 位是逻辑部分。</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">时间同步系统（timetick）<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>本节以数据插入操作为例，解释 Milvus 的时间同步机制。</p>
<p>当代理收到 SDK 的数据插入请求时，它会根据主键的哈希值将插入信息分成不同的信息流 (<code translate="no">MsgStream</code>) 。</p>
<p>每条插入信息 (<code translate="no">InsertMsg</code>) 在发送到<code translate="no">MsgStream</code> 之前都会被分配一个时间戳。</p>
<div class="alert note">
  <code translate="no">MsgStream</code> Timesync_proxy_ins 是消息队列的封装器，在 Milvus 2.0 中默认为 Pulsar。</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>一般原则是，在<code translate="no">MsgStream</code> 中，来自同一代理的<code translate="no">InsertMsgs</code> 的时间戳必须是递增的。但是，来自不同代理的<code translate="no">InsertMsgs</code> 的时间戳却没有这样的规则。</p>
<p>下图是<code translate="no">InsertMsgs</code> 在<code translate="no">MsgStream</code> 中的示例。该代码段包含五个<code translate="no">InsertMsgs</code> ，其中三个来自<code translate="no">Proxy1</code> ，其余来自<code translate="no">Proxy2</code> 。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>来自<code translate="no">Proxy1</code> 的三个<code translate="no">InsertMsgs</code> 的时间戳是递增的，来自<code translate="no">Proxy2</code> 的两个<code translate="no">InsertMsgs</code> 的时间戳也是递增的。但是，<code translate="no">Proxy1</code> 和<code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> 之间没有特定的顺序。</p>
<p><code translate="no">Proxy1</code> 一种可能的情况是，当从<code translate="no">Proxy2</code> 读取时间戳为<code translate="no">110</code> 的信息时，Milvus 发现时间戳为<code translate="no">80</code> 的信息仍在<code translate="no">MsgStream</code> 中。因此，Milvus 引入了时间同步系统 timetick，以确保从<code translate="no">MsgStream</code> 读取信息时，必须消耗掉所有时间戳值较小的信息。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>时间同步</span> </span></p>
<p>如上图所示、</p>
<ul>
<li><p>每个代理定期（默认情况下每 200 毫秒）向根协调器报告<code translate="no">MsgStream</code>中最新<code translate="no">InsertMsg</code> 的最大时间戳值。</p></li>
<li><p>根协调器会识别该<code translate="no">Msgstream</code> 上的最小时间戳值，无论该<code translate="no">InsertMsgs</code> 属于哪个代理。然后，根协调器将这个最小时间戳插入<code translate="no">Msgstream</code> 。这个时间戳也称为 timetick。</p></li>
<li><p>当消费者组件读取根协调器插入的时间戳时，它们就会明白所有时间戳值较小的插入信息都已被消耗。因此，可以在不中断订单的情况下安全地执行相关请求。</p></li>
</ul>
<p>下图是<code translate="no">Msgstream</code> 插入时间刻度的示例。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>时间戳</span> </span></p>
<p><code translate="no">MsgStream</code> 根据时间刻度分批处理报文，以确保输出的报文符合时间戳的要求。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>了解<a href="/docs/zh/v2.4.x/timestamp.md">时间戳</a>的概念。</li>
<li>了解 Milvus 的<a href="/docs/zh/v2.4.x/data_processing.md">数据处理工作流程</a>。</li>
</ul>
