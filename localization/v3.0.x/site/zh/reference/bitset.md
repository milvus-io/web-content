---
id: bitset.md
summary: 了解 Milvus 中的位集。
title: 位集
---
<h1 id="Bitset" class="common-anchor-header">位集<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍了位集机制，该机制有助于实现 Milvus 中的关键功能，例如属性过滤和<a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">删除操作</a>。</p>
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
    </button></h2><p>位集（bitset）是一组位。位是仅可能取两个值的元素，最常见的是<code translate="no">0</code> 和<code translate="no">1</code> ，或是布尔值<code translate="no">true</code> 和<code translate="no">false</code> 。在Milvus中，位集是位数（bit number）<code translate="no">0</code> 和<code translate="no">1</code> 的数组，与整型（int）、浮点型（float）或字符型（char）相比，它能以紧凑且高效的方式表示特定数据。 位数默认值为<code translate="no">0</code> ，仅在满足特定要求时才会被设置为<code translate="no">1</code> 。</p>
<p>对位集的操作采用<a href="/docs/zh/boolean.md">布尔逻辑</a>进行，在此逻辑下，输出值要么有效（<code translate="no">1</code> ），要么无效（<code translate="no">0</code> ）。 例如，可以使用<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">逻辑运算符</a> <code translate="no">AND</code> 根据相同索引位置的项来比较两个位集，并生成一个包含结果的新位集。如果同一位置的两个项相同，则在新位集中该位置将写入<code translate="no">1</code> ；如果不同，则写入<code translate="no">0</code> 。</p>
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
    </button></h2><p>位集（Bitset）是一种简单而强大的机制，可帮助 Milvus 执行属性过滤、数据删除以及“时间旅行”（Time Travel）查询。</p>
<h3 id="Attribute-filtering" class="common-anchor-header">属性过滤<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>由于位集仅包含两种可能的值，因此非常适合存储<a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">属性过滤</a>的结果。符合给定属性过滤器要求的数据将被标记为<code translate="no">1</code> 。</p>
<h3 id="Data-deletion" class="common-anchor-header">数据删除<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>位集可作为一种紧凑的方式，用于存储分段中某行是否已被删除的信息。已删除的实体会在相应的位集中被标记为<code translate="no">1</code> ，在搜索或查询过程中，该位集<a href="https://milvus.io/blog/deleting-data-in-milvus.md">将不会被计算</a>。</p>
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
    </button></h2><p>下面通过三个示例说明位集在 Milvus 中的应用，并参考了上文讨论的位集的三种主要实现方式。在这三种情况下，均有一个包含 8 个实体的分段，随后按以下顺序发生了一系列数据操作语言（DML）事件。</p>
<ul>
<li>其中四个实体的<code translate="no">primary_key</code>值分别为[1, 2, 3, 4]，它们在时间戳<code translate="no">ts</code> 等于100时被插入。</li>
<li>其余四个实体的<code translate="no">primary_key</code>分别为[5, 6, 7, 8]，当时间戳<code translate="no">ts</code> 等于200时被插入。</li>
<li>当时间戳<code translate="no">ts</code> 等于 300 时，<code translate="no">primary_key</code>为 [7, 8] 的实体将被删除。</li>
<li>只有那些<code translate="no">primary_key</code>值为[1, 3, 5, 7]的实体才满足属性过滤的条件。</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>DML事件的顺序</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">情况一<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>在此情况下，用户将<code translate="no">time_travel</code> 设置为150，这意味着用户对满足<code translate="no">ts = 150</code> 的数据进行查询。位集生成过程如图1所示。</p>
<p>在初始过滤阶段，<code translate="no">filter_bitset</code> 应为<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> ，其中实体 [1, 3, 5, 7] 被标记为<code translate="no">1</code> ，因为它们是有效的过滤结果。</p>
<p>然而，当<code translate="no">ts</code> 等于150时，实体[5, 6, 7, 8]并未被插入向量数据库。因此，无论筛选条件如何，这四个实体都应被标记为0。此时，位集结果应为<code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> 。</p>
<p>如<a href="#data-deletion">“数据删除</a>”部分所述，标记为<code translate="no">1</code> 的实体在搜索或查询过程中会被忽略。现在需要对位集结果进行反转，以便与删除位图组合，从而得到<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 。</p>
<p>至于删除位集<code translate="no">del_bitset</code> ，其初始值应为<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。然而，实体 7 和 8 只有在<code translate="no">ts</code> 达到 300 时才会被删除。因此，当<code translate="no">ts</code> 为 150 时，实体 7 和 8 仍然有效。结果，时间旅行操作后的<code translate="no">del_bitset</code> 值为<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>现在，经过“时间旅行”和属性过滤后，我们得到了两个位集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。将这两个位集通过<code translate="no">OR</code> 二进制逻辑操作符进行组合。result_bitset的最终值为<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ，这意味着在接下来的搜索或查询阶段，仅对实体1和3进行计算。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>图 1. 时间旅行 = 150 时的搜索。</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">情况二<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>在此情况下，用户将<code translate="no">time_travel</code> 设置为250。位集生成过程如图2所示。</p>
<p>与情况一类似，初始的<code translate="no">filter_bitset</code> 为<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> 。</p>
<p>当<code translate="no">ts</code> =250时，所有实体均位于向量数据库中。因此，在考虑时间戳后，<code translate="no">filter_bitset</code> 保持不变。同样，我们需要对结果进行反转，得到<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p>至于删除位集<code translate="no">del_bitset</code> ，其初始值为<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。然而，实体 7 和 8 直到<code translate="no">ts</code> 达到 300 时才被删除。因此，当<code translate="no">ts</code> 为 250 时，实体 7 和 8 仍然有效。结果，时间旅行后的<code translate="no">del_bitset</code> 为<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>现在，经过“时间旅行”和属性过滤后，我们得到了两个位集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。将这两个位集通过<code translate="no">OR</code> 二进制逻辑操作符进行组合。结果位集 result_bitset 为<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。也就是说，在接下来的搜索或查询阶段，仅对实体 [1, 3, 5, 7] 进行计算。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>图 2. Time Travel = 250 时的搜索。</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">第三种情况<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>在此情况下，用户将<code translate="no">time_travel</code> 设置为350。位集生成过程如图3所示。</p>
<p>与前两种情况一样，初始的<code translate="no">filter_bitset</code> 为<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p>当<code translate="no">ts</code>= 350时，所有实体均位于向量数据库中。因此，最终反转后的<code translate="no">filter_bitset</code> 为<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> ，与案例二相同。</p>
<p>至于删除位集<code translate="no">del_bitset</code> ，由于在<code translate="no">ts = 350</code> 时实体 7 和 8 已被删除，因此<code translate="no">del_bitset</code> 的结果为<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。</p>
<p>现在，经过“时间旅行”和属性过滤后，我们得到了两个位集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。将这两个位集通过二进制逻辑运算符<code translate="no">OR</code> 进行组合。最终的<code translate="no">result_bitset</code> 结果为<code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code> 。也就是说，在接下来的搜索或查询阶段，仅对实体 [1, 3, 5] 进行计算。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>图 3. 时间旅行 = 350 时的搜索。</span>
  
 </span></p>
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
    </button></h2><p>既然您已经了解了 Milvus 中位集的工作原理，您可能还想：</p>
<ul>
<li>学习如何<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">使用字符串过滤</a>搜索结果，或查阅我们文档中的<a href="https://milvus.io/docs/hybridsearch.md">“混合搜索</a>”部分。</li>
<li>了解 Milvus 中<a href="https://milvus.io/docs/v2.1.x/data_processing.md">数据的处理方式</a>。</li>
</ul>
