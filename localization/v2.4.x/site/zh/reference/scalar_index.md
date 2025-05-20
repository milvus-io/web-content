---
id: scalar_index.md
related_key: scalar_index
summary: Milvus 的标量指数。
title: 标量索引
---
<h1 id="Scalar-Index" class="common-anchor-header">标量索引<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支持结合标量字段和向量字段的过滤搜索。为了提高涉及标量字段的搜索效率，Milvus 从 2.1.0 版开始引入了标量字段索引。本文将概述 Milvus 中的标量字段索引，帮助您了解其意义和实现方法。</p>
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
    </button></h2><p>在 Milvus 中进行向量相似性搜索时，可以使用逻辑操作符将标量字段组织成布尔表达式。</p>
<p>当 Milvus 收到带有这种布尔表达式的搜索请求时，它会将布尔表达式解析为抽象语法树（AST），以生成用于属性筛选的物理计划。然后，Milvus 在每个分段中应用物理计划，生成一个<a href="/docs/zh/v2.4.x/bitset.md">比特集</a>作为过滤结果，并将结果作为向量搜索参数，以缩小搜索范围。在这种情况下，向量搜索的速度在很大程度上依赖于属性过滤的速度。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>分段属性过滤</span> </span></p>
<p>标量字段索引是一种确保属性过滤速度的方法，它以特定方式对标量字段值进行排序，以加快信息检索速度。</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">标量字段索引算法<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的标量字段索引算法旨在实现低内存占用率、高过滤效率和短加载时间。这些算法主要分为两类：<a href="#auto-indexing">自动索引</a>和<a href="#inverted-indexing">反转索引</a>。</p>
<h3 id="Auto-indexing" class="common-anchor-header">自动索引</h3><p>Milvus 提供了<code translate="no">AUTOINDEX</code> 选项，让你无需手动选择索引类型。调用<code translate="no">create_index</code> 方法时，如果没有指定<code translate="no">index_type</code> ，Milvus 会根据数据类型自动选择最合适的索引类型。</p>
<p>下表列出了 Milvus 支持的数据类型及其相应的自动索引算法。</p>
<table>
<thead>
<tr><th>数据类型</th><th>自动索引算法</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>反转索引</td></tr>
<tr><td>INT8</td><td>反转索引</td></tr>
<tr><td>INT16</td><td>反转索引</td></tr>
<tr><td>INT32</td><td>反转索引</td></tr>
<tr><td>INT64</td><td>反转索引</td></tr>
<tr><td>FLOAT</td><td>反转索引</td></tr>
<tr><td>二进制</td><td>反转索引</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">反转索引</h3><p>反转索引提供了一种灵活的方法，可通过手动指定索引参数为标量字段创建索引。这种方法适用于各种情况，包括点查询、模式匹配查询、全文检索、JSON 搜索、布尔搜索，甚至前缀匹配查询。</p>
<p>Milvus 中实现的倒排索引由全文搜索引擎库<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 提供支持。Tantivy 确保 Milvus 中的倒排索引既高效又快速。</p>
<p>倒排索引有两个主要部分：术语字典和倒排列表。术语词典包括按字母顺序排列的所有标记词，而倒排列表则包含每个词出现的文档列表。这种设置使得点查询和范围查询比暴力搜索更快、更有效。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>倒排索引图</span> </span></p>
<p>使用倒排索引的优势在以下操作中尤为明显：</p>
<ul>
<li><strong>点查询</strong>：例如，在搜索包含单词<strong>Milvus 的</strong>文档时，首先要检查术语字典中是否存在<strong>Milvus</strong>。如果没有找到，则没有文档包含该词。但如果找到了，则会检索与<strong>Milvus</strong>相关的倒序列表，指出包含该词的文档。这种方法比在一百万个文档中进行暴力搜索要有效得多，因为排序后的术语词典大大降低了查找<strong>Milvus</strong> 这个词的时间复杂度。</li>
<li><strong>范围查询</strong>：范围查询（如查找单词字母大于<strong>very 的</strong>文档）的效率也能通过排序术语字典得到提高。这种方法比暴力搜索更有效，能提供更快、更准确的结果。</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">测试结果</h3><p>为了证明标量索引在 Milvus 中提供的性能改进，我们进行了一项实验，比较了在原始数据上使用倒排索引和暴力搜索的几种表达式的性能。</p>
<p>实验包括在两种条件下测试各种表达式：倒排索引和暴力搜索。为确保公平性，每次测试都使用相同的 Collections，保持相同的数据分布。每次测试前，都会释放 Collections，并丢弃和重建索引。此外，每次测试前都会执行一次热查询，以尽量减少冷数据和热数据的影响，并且每次查询都会执行多次，以确保准确性。</p>
<p>对于包含<strong>100 万条</strong>记录的数据集，使用<strong>反转索引</strong>最多可将点查询的性能提高<strong>30 倍</strong>。对于更大的数据集，性能提升可能会更显著。</p>
<h2 id="Performance-recommandations" class="common-anchor-header">性能建议<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>要充分利用 Milvus 在标量字段索引方面的能力，并释放其在向量相似性搜索方面的威力，你可能需要一个模型来根据你所拥有的数据估算所需的内存大小。</p>
<p>下表列出了 Milvus 支持的所有数据类型的估算功能。</p>
<ul>
<li><p>数值字段</p>
<table>
<thead>
<tr><th>数据类型</th><th>内存估算函数（MB）</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT16</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT32</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT64</td><td>行数 *<strong>24</strong>/ 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>二进制</td><td>行数 *<strong>24</strong>/ 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>字符串字段</p>
<table>
<thead>
<tr><th>字符串长度</th><th>内存估算函数（MB）</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>行数 *<strong>128</strong>/ 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>行数 *<strong>144</strong>/ 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>行数 *<strong>160</strong>/ 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>行数 *<strong>192</strong>/ 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>行数 *<strong>256</strong>/ 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>行数 *<strong>strLen * 1.5</strong>/ 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
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
<li><p>要为标量字段<a href="/docs/zh/v2.4.x/index-scalar-fields.md">建立</a>索引，请阅读<a href="/docs/zh/v2.4.x/index-scalar-fields.md">在标量上建立索引</a>。</p></li>
<li><p>要进一步了解上述相关术语和规则，请阅读</p>
<ul>
<li><a href="/docs/zh/v2.4.x/bitset.md">比特集</a></li>
<li><a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a></li>
<li><a href="/docs/zh/v2.4.x/boolean.md">布尔表达式规则</a></li>
<li><a href="/docs/zh/v2.4.x/schema.md#Supported-data-type">支持的数据类型</a></li>
</ul></li>
</ul>
