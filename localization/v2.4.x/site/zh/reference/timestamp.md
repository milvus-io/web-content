---
id: timestamp.md
title: Milvus时间戳
summary: 了解时间戳的概念以及 Milvus 向量数据库中与时间戳相关的四个主要参数。
---

<h1 id="Timestamp" class="common-anchor-header">时间戳<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题解释时间戳的概念，并介绍 Milvus 向量数据库中与时间戳相关的四个主要参数。</p>
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
    </button></h2><p>Milvus 是一个向量数据库，可以搜索和查询从非结构化数据转换而来的向量。在进行数据操作语言（DML）操作（包括<a href="https://milvus.io/docs/v2.1.x/data_processing.md">数据插入和删除）</a>时，Milvus 会为操作中涉及的实体分配时间戳。因此，Milvus 中的所有实体都有一个时间戳属性。同一 DML 操作中的实体批次共享相同的时间戳值。</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">时间戳参数<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中进行向量相似性搜索或查询时，会涉及几个与时间戳相关的参数。</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> 是一种时间戳类型，用于确保在进行向量相似性搜索或查询时，在 之前由 DML 操作更新的所有数据都是可见的。例如，如果在下午 3 点插入一批数据，下午 5 点插入另一批数据，而在向量相似性搜索时， 的值设置为下午 6 点。这意味着分别在下午 3 点和下午 5 点插入的两批数据应参与搜索。<code translate="no">Guarantee_timestamp</code> <code translate="no">Guarantee_timestamp</code> </p>
<p>如果没有配置<code translate="no">Guarantee_timestamp</code> ，Milvus 会自动取搜索请求发出的时间点。因此，搜索是在数据视图上进行的，所有数据更新都是在搜索之前通过 DML 操作完成的。</p>
<p>为了省去理解 Milvus 内部<a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a>的麻烦，作为用户，您不必直接配置<code translate="no">Guarantee_timestamp</code> 参数。您只需选择<a href="https://milvus.io/docs/v2.1.x/consistency.md">一致性级别</a>，Milvus 就会自动为您处理<code translate="no">Guarantee_timestamp</code> 参数。每个一致性级别对应一定的<code translate="no">Guarantee_timestamp</code> 值。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">示例</h4><p>如上图所示，<code translate="no">Guarantee_timestamp</code> 的值设置为<code translate="no">2021-08-26T18:15:00</code> （为简单起见，本例中的时间戳用物理时间表示）。在进行搜索或查询时，会搜索或查询 2021-08-26T18:15:00 之前的所有数据。</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> 是一种由 Milvus 查询节点自动生成和管理的时间戳类型。它用于指示查询节点执行了哪些 DML 操作。</p>
<p>查询节点管理的数据可分为两类：</p>
<ul>
<li><p>历史数据（或称批量数据）</p></li>
<li><p>增量数据（或称为流数据）。</p></li>
</ul>
<p>在 Milvus 中，您需要在进行搜索或查询之前加载数据。因此，在发出搜索或查询请求之前，会通过查询节点加载集合中的批量数据。然而，流数据是即时插入 Milvus 或从 Milvus 中删除的，这就要求查询节点保持 DML 操作和搜索或查询请求的时间轴。因此，查询节点使用<code translate="no">Service_timestamp</code> 来保存这样一个时间轴。<code translate="no">Service_timestamp</code> 可以看作是某些数据可见的时间点，因为查询节点可以确保<code translate="no">Service_timestamp</code> 之前的所有 DML 操作都已完成。</p>
<p>当有搜索或查询请求传入时，查询节点会比较<code translate="no">Service_timestamp</code> 和<code translate="no">Guarantee_timestamp</code> 的值。主要有两种情况。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>服务时间戳</span>。 </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">情况 1：<code translate="no">Service_timestamp</code> &gt;=<code translate="no">Guarantee_timestamp</code></h4><p>如图 1 所示，<code translate="no">Guarantee_timestamp</code> 的值设置为<code translate="no">2021-08-26T18:15:00</code> 。当<code translate="no">Service_timestamp</code> 的值增长为<code translate="no">2021-08-26T18:15:01</code> 时，这意味着在此时间点之前的所有 DML 操作都由查询节点执行并完成，包括<code translate="no">Guarantee_timestamp</code> 所指示时间之前的 DML 操作。因此，搜索或查询请求可以立即执行。</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">方案 2：<code translate="no">Service_timestamp</code> &lt;<code translate="no">Guarantee_timestamp</code></h4><p>如图 2 所示，<code translate="no">Guarantee_timestamp</code> 的值被设置为<code translate="no">2021-08-26T18:15:00</code> ，而<code translate="no">Service_timestamp</code> 的当前值仅为<code translate="no">2021-08-26T18:14:55</code> 。这意味着只有<code translate="no">2021-08-26T18:14:55</code> 之前的 DML 操作才会被执行并完成，而该时间点之后、<code translate="no">Guarantee_timestamp</code> 之前的部分 DML 操作则未完成。如果在此时执行搜索或查询，所需的部分数据将不可见且不可用，严重影响搜索或查询结果的准确性。因此，查询节点需要推迟搜索或查询请求，直到<code translate="no">guarantee_timestamp</code> 之前的 DML 操作完成（即<code translate="no">Service_timestamp</code> &gt;=<code translate="no">Guarantee_timestamp</code> ）。</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>从技术上讲，<code translate="no">Graceful_time</code> 并不是一个时间戳，而是一个时间段（如 100 毫秒）。不过，<code translate="no">Graceful_time</code> 值得一提，因为它与<code translate="no">Guarantee_timestamp</code> 和<code translate="no">Service_timestamp</code> 密切相关。<code translate="no">Graceful_time</code> 是 Milvus 配置文件中的一个可配置参数。它用于指示在某些数据变为可见之前可容忍的时间段。简而言之，可以容忍<code translate="no">Graceful_time</code> 期间未完成的 DML 操作。</p>
<p>当有搜索或查询请求传入时，可能会出现两种情况。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">情况 1：<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &gt;=<code translate="no">Guarantee_timestamp</code></h4><p>如图 1 所示，<code translate="no">Guarantee_timestamp</code> 的值设置为<code translate="no">2021-08-26T18:15:01</code> ，<code translate="no">Graceful_time</code> 设置为<code translate="no">2s</code> 。<code translate="no">Service_timestamp</code> <code translate="no">2021-08-26T18:15:00</code>虽然<code translate="no">Service_timestamp</code> 的值仍然小于<code translate="no">Guarantee_timestamp</code> 的值，而且<code translate="no">2021-08-26T18:15:01</code> 之前的所有 DML 操作都没有完成，但如<code translate="no">Graceful_time</code> 的值所示，可以容忍 2 秒钟的数据不可见期。因此，传入的搜索或查询请求可以立即执行。</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">方案 2：<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &lt;<code translate="no">Guarantee_timestamp</code></h4><p>如图 2 所示，<code translate="no">Guarantee_timestamp</code> 的值设置为<code translate="no">2021-08-26T18:15:01</code> ，<code translate="no">Graceful_time</code> 设置为<code translate="no">2s</code> 。<code translate="no">Service_timestamp</code> 的当前值仅为<code translate="no">2021-08-26T18:14:54</code> 。这意味着预期的 DML 操作尚未完成，即使有 2 秒钟的宽限时间，数据隐形仍是不可容忍的。因此，查询节点需要推迟搜索或查询请求，直到某些 DML 请求完成（即<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &gt;=<code translate="no">Guarantee_timestamp</code> ）。</p>
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
<li>了解<a href="/docs/zh/v2.4.x/consistency.md">保证时间戳</a>如何<a href="/docs/zh/v2.4.x/consistency.md">在 Milvus 中实现可调整的一致性</a></li>
</ul>
