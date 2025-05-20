---
id: consistency.md
summary: 了解 Milvus 的四个一致性级别。
title: 一致性
---
<h1 id="Consistency" class="common-anchor-header">一致性<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍 Milvus 的四种一致性级别及其最适合的应用场景。本主题还将介绍 Milvus 中确保一致性的机制。</p>
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
    </button></h2><p>分布式数据库中的一致性是指确保每个节点或副本在给定时间写入或读取数据时具有相同数据视图的属性。</p>
<p>Milvus 支持四种一致性级别：强、有约束的僵化、会话和最终。Milvus 的默认一致性级别是有界滞后。  在进行<a href="/docs/zh/v2.4.x/single-vector-search.md">单向量搜索</a>、<a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a>或<a href="/docs/zh/v2.4.x/get-and-scalar-query.md">查询</a>时，您可以轻松调整一致性级别，使其最适合您的应用。</p>
<h2 id="Consistency-levels" class="common-anchor-header">一致性级别<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>根据<a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a>定理的定义，分布式数据库必须在一致性、可用性和延迟之间进行权衡。高一致性意味着高准确性，但也意味着高搜索延迟，而低一致性则会导致快速搜索，但会损失一定的数据可见性。因此，不同级别的一致性适合不同的应用场景。</p>
<p>下面将解释 Milvus 支持的四种一致性级别的区别，以及它们各自适合的场景。</p>
<h3 id="Strong" class="common-anchor-header">强</h3><p>强是最高、最严格的一致性级别。它确保用户可以读取最新版本的数据。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>强一致性</span> </span></p>
<p>根据 PACELC 定理，如果将一致性级别设置为强，延迟会增加。因此，我们建议在功能测试时选择强一致性，以确保测试结果的准确性。强一致性也最适合那些以牺牲搜索速度为代价、对数据一致性有严格要求的应用。处理订单付款和账单的在线财务系统就是一个例子。</p>
<h3 id="Bounded-staleness" class="common-anchor-header">有界滞后</h3><p>有界僵化，顾名思义，允许数据在一定时间内不一致。不过，一般来说，在这段时间之外，数据始终是全局一致的。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>有界滞后一致性</span> </span></p>
<p>有界滞后性适用于需要控制搜索延迟并能接受零星数据不可见的情况。例如，在视频推荐引擎等推荐系统中，数据不可见有时对总体召回率影响较小，但却能显著提升推荐系统的性能。</p>
<h3 id="Session" class="common-anchor-header">会话</h3><p>会话确保所有数据写入都能在同一会话中立即被读取。换句话说，当你通过一个客户端写入数据时，新插入的数据可立即被搜索到。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>会话一致性</span> </span></p>
<p>我们建议在对同一会话中数据一致性要求较高的情况下选择会话作为一致性级别。例如，从图书馆系统中删除图书条目的数据，在确认删除并刷新页面（不同的会话）后，搜索结果中将不再显示该图书。</p>
<h3 id="Eventually" class="common-anchor-header">最终</h3><p>读取和写入的顺序没有保证，如果不再进行写入操作，副本最终会趋同于相同的状态。在 &quot;最终 &quot;一致性下，副本会使用最新更新的值开始处理读取请求。最终一致性是四种一致性中最弱的一种。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>最终一致性</span> </span></p>
<p>然而，根据 PACELC 定理，牺牲一致性可以大大缩短搜索延迟。因此，最终一致性最适用于对数据一致性要求不高但需要极快搜索性能的情况。举个例子，使用最终一致级别检索亚马逊产品的评论和评分。</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">保证时间戳<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 通过引入<a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">保证时间戳</a>（GuaranteeTs）来实现不同的一致性级别。</p>
<p>GuaranteeTs 的作用是通知查询节点，在查询节点能看到 GuaranteeTs 之前的所有数据之前，不会执行搜索或查询请求。指定一致性级别时，一致性级别将映射到特定的 GuaranteeTs 值。不同的 GuaranteeTs 值对应不同的一致性级别：</p>
<ul>
<li><p><strong>强</strong>：GuaranteeTs 设置为与最新的系统时间戳相同，查询节点要等到可以看到最新系统时间戳之前的所有数据后，才会处理搜索或查询请求。</p></li>
<li><p><strong>有界滞后</strong>：GuaranteeTs 设置为相对小于最新系统时间戳，查询节点在可容忍的、更新较少的数据视图上进行搜索。</p></li>
<li><p><strong>会话</strong>：客户端使用最新写入操作的时间戳作为 GuaranteeTs，这样每个客户端至少都能检索到同一客户端插入的数据。</p></li>
<li><p><strong>最终</strong>：将 GuaranteeTs 设为很小的值，以跳过一致性检查。查询节点会立即在现有数据视图上进行搜索。</p></li>
</ul>
<p>有关确保 Milvus 不同级别一致性背后机制的更多信息，请参阅<a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">GuaranteeTs 如何工作</a>。</p>
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
<li>了解如何在以下情况下调整一致性级别<ul>
<li><a href="/docs/zh/v2.4.x/single-vector-search.md">进行单向量搜索</a></li>
<li><a href="/docs/zh/v2.4.x/multi-vector-search.md">进行混合搜索</a></li>
<li><a href="/docs/zh/v2.4.x/get-and-scalar-query.md">进行标量查询</a></li>
</ul></li>
</ul>
