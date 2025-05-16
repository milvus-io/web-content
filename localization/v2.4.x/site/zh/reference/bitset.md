---
id: bitset.md
summary: 了解 Milvus 中的比特集。
title: 比特集
---
<h1 id="Bitset" class="common-anchor-header">比特集<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍比特集机制，它有助于在 Milvus 中实现属性过滤和<a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">删除操作</a>等关键功能。</p>
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
    </button></h2><p>比特集是一组比特。比特是只有两个可能值的元素，最典型的是<code translate="no">0</code> 和<code translate="no">1</code> ，或布尔值<code translate="no">true</code> 和<code translate="no">false</code> 。在 Milvus 中，比特集是由比特数<code translate="no">0</code> 和<code translate="no">1</code> 组成的数组，与 ints、浮点数或字符相比，比特集可用于紧凑、高效地表示某些数据。比特数默认为<code translate="no">0</code> ，只有在满足特定要求时才会被设置为<code translate="no">1</code> 。</p>
<p>对位集的操作采用<a href="/docs/zh/v2.4.x/boolean.md">布尔逻辑</a>，在<a href="/docs/zh/v2.4.x/boolean.md">布尔逻辑</a>下，输出值要么有效要么无效，也分别用<code translate="no">1</code> 和<code translate="no">0</code> 表示。例如，<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">逻辑运算符</a> <code translate="no">AND</code> 可用于比较两个基于相同索引位置项的比特集，并根据结果生成一个新的比特集。如果某个位置上的两个项目相同，那么在新的比特集中，<code translate="no">1</code> 将写入该位置；如果两个项目不同，<code translate="no">0</code> 。</p>
<h2 id="Implementation" class="common-anchor-header">实现<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Bitset 是一种简单但功能强大的机制，可帮助 Milvus 执行属性过滤、数据删除和时间旅行查询。</p>
<h3 id="Attribute-filtering" class="common-anchor-header">属性过滤</h3><p>由于比特集只包含两个可能的值，因此非常适合存储<a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">属性过滤</a>的结果。符合给定属性筛选要求的数据会以<code translate="no">1</code> 标记。</p>
<h3 id="Data-deletion" class="common-anchor-header">数据删除</h3><p>比特集是存储段中某一行是否被删除的信息的紧凑方式。删除的实体会在相应的比特集中标记为<code translate="no">1</code> ，在搜索或查询时<a href="https://milvus.io/blog/deleting-data-in-milvus.md">不会计算</a>。</p>
<h2 id="Examples" class="common-anchor-header">示例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>下面我们将举出三个例子来说明比特集在 Milvus 中的应用，并参考上文讨论的比特集的所有三种主要实现。在所有三个示例中，都有一个包含 8 个实体的段，然后按照下图所示的顺序发生一系列数据操作语言（DML）事件。</p>
<ul>
<li>其中四个实体（其<code translate="no">primary_key</code>s 分别为 [1、2、3、4]）在时间戳<code translate="no">ts</code> 等于 100 时插入。</li>
<li>其余四个实体（其<code translate="no">primary_key</code>s 分别为 [5、6、7、8]）在时间戳<code translate="no">ts</code> 等于 200 时插入。</li>
<li>当时间戳<code translate="no">ts</code> 等于 300 时，删除<code translate="no">primary_key</code>s 为 [7, 8] 的实体。</li>
<li>只有<code translate="no">primary_key</code>s 为 [1, 3, 5, 7] 的实体才满足属性筛选条件。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>DML 事件的顺序</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">情况一</h3><p>在这种情况下，用户将<code translate="no">time_travel</code> 设置为 150，这意味着用户对满足<code translate="no">ts = 150</code> 的数据进行查询。比特集生成过程如图 1 所示。</p>
<p>在初始过滤阶段，<code translate="no">filter_bitset</code> 应该是<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> ，其中实体 [1, 3, 5, 7] 被标记为<code translate="no">1</code> ，因为它们是有效的过滤结果。</p>
<p>但是，当<code translate="no">ts</code> 等于 150 时，实体 [4, 5, 6, 7] 没有插入向量数据库。因此，无论过滤条件如何，这四个实体都应标记为 0。现在比特集的结果应该是<code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> 。</p>
<p>正如在<a href="#data-deletion">数据删除</a>中所述，在搜索或查询过程中，标记为<code translate="no">1</code> 的实体将被忽略。现在需要将比特集结果翻转，以便与删除比特图结合，从而得到<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 。</p>
<p>至于删除位集<code translate="no">del_bitset</code> ，初始值应该是<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。但是，实体 7 和实体 8 在<code translate="no">ts</code> 为 300 时才会删除。因此，当<code translate="no">ts</code> 为 150 时，实体 7 和 8 仍然有效。因此，"时间旅行 "后的<code translate="no">del_bitset</code> 值为<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>现在，经过时间旅行和属性过滤后，我们有两个比特集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。  将这两个比特集与<code translate="no">OR</code> 二进制逻辑运算符相结合。result_bitset 的最终值是<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ，这意味着在接下来的搜索或查询阶段将只计算实体 1 和 3。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>图 1.时间旅行 = 150 时的搜索</span>。 </span></p>
<h3 id="Case-two" class="common-anchor-header">案例二</h3><p>在这种情况下，用户将<code translate="no">time_travel</code> 设置为 250。比特集生成过程如图 2 所示。</p>
<p>与情况一一样，初始<code translate="no">filter_bitset</code> 是<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> 。</p>
<p>当<code translate="no">ts</code> = 250 时，所有实体都在向量数据库中。因此，当我们考虑时间戳因素时，<code translate="no">filter_bitset</code> 保持不变。同样，我们需要翻转结果，得到<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p>至于删除比特集<code translate="no">del_bitset</code> ，初始值是<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。但是，实体 7 和实体 8 在<code translate="no">ts</code> 为 300 时才被删除。因此，当<code translate="no">ts</code> 为 250 时，实体 7 和 8 仍然有效。因此，"时间旅行 "后的<code translate="no">del_bitset</code> 是<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>现在，经过时间旅行和属性过滤后，我们有两个比特集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。使用<code translate="no">OR</code> 二进制逻辑运算符将这两个比特集合并。结果_比特集是<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。也就是说，在接下来的搜索或查询阶段，将只计算实体 [1, 3, 5, 7]。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>图 2.时间旅行 = 250 时的搜索</span> </span></p>
<h3 id="Case-three" class="common-anchor-header">情况三</h3><p>在这种情况下，用户将<code translate="no">time_travel</code> 设置为 350。比特集生成过程如图 3 所示。</p>
<p>与前面的情况一样，初始<code translate="no">filter_bitset</code> 是<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p>当<code translate="no">ts</code>= 350 时，所有实体都在向量数据库中。因此，最终翻转后的<code translate="no">filter_bitset</code> 是<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> ，与案例二相同。</p>
<p>至于删除比特集<code translate="no">del_bitset</code> ，由于<code translate="no">ts = 350</code> 时已经删除了实体 7 和 8，因此<code translate="no">del_bitset</code> 的结果是<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。</p>
<p>现在，经过时间旅行和属性过滤后，我们有两个比特集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。  将这两个比特集与<code translate="no">OR</code> 二进制逻辑运算符相结合。最终的<code translate="no">result_bitset</code> 是<code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code> 。也就是说，在接下来的搜索或查询阶段，将只计算实体 [1, 3, 5]。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>图 3.时间旅行 = 350 的搜索</span> </span></p>
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
    </button></h2><p>既然你已经知道比特集在 Milvus 中是如何工作的，那么你可能还想</p>
<ul>
<li>了解如何<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">使用字符串过滤</a>搜索结果，或参考我们文档中的<a href="https://milvus.io/docs/hybridsearch.md">混合搜索</a>。</li>
<li>了解 Milvus<a href="https://milvus.io/docs/v2.1.x/data_processing.md">如何处理数据</a>。</li>
</ul>
