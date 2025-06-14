---
id: elasticsearch-queries-to-milvus.md
title: Elasticsearch 查询到 Milvus
summary: >-
  基于 Apache Lucene 构建的 Elasticsearch
  是领先的开源搜索引擎。然而，它在现代人工智能应用中面临着各种挑战，包括更新成本高、实时性差、分片管理效率低、非云原生设计以及资源需求过高。作为云原生向量数据库，Milvus
  通过解耦存储和计算、高效的高维数据索引以及与现代基础设施的无缝集成，克服了这些问题。它为人工智能工作负载提供了卓越的性能和可扩展性。
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Elasticsearch 查询到 Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>基于 Apache Lucene 构建的 Elasticsearch 是领先的开源搜索引擎。然而，它在现代人工智能应用中面临着各种挑战，包括更新成本高、实时性差、分片管理效率低、非云原生设计以及资源需求过高。作为云原生向量数据库，Milvus 通过解耦存储和计算、高效的高维数据索引以及与现代基础设施的无缝集成，克服了这些问题。它为人工智能工作负载提供了卓越的性能和可扩展性。</p>
<p>本文旨在帮助您将代码库从 Elasticsearch 迁移到 Milvus，并提供中间转换查询的各种示例。</p>
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
    </button></h2><p>在 Elasticsearch 中，查询上下文中的操作会生成相关性分数，而过滤器上下文中的操作不会生成相关性分数。同样，Milvus 的搜索会产生相似性得分，而类似过滤器的查询则不会。将代码库从 Elasticsearch 迁移到 Milvus 时，关键原则是将 Elasticsearch 查询上下文中使用的字段转换为向量字段，以便生成相似性得分。</p>
<p>下表列出了一些 Elasticsearch 查询模式及其在 Milvus 中的对应模式。</p>
<table>
   <tr>
     <th><p>Elasticsearch 查询</p></th>
     <th><p>Milvus 对应模式</p></th>
     <th><p>备注</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>全文查询</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Match-query">匹配查询</a></p></td>
     <td><p>全文搜索</p></td>
     <td><p>两者提供类似的功能。</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>术语级查询</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> 操作符</p></td>
     <td rowspan="6"><p>在过滤器上下文中使用这些 Elasticsearch 查询时，两者都能提供相同或类似的功能。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Prefix-query">前缀查询</a></p></td>
     <td><p><code translate="no">like</code> 操作符</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Range-query">范围查询</a></p></td>
     <td><p>比较操作符，如<code translate="no">&gt;</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;=</code>, 和<code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Term-query">术语查询</a></p></td>
     <td><p>比较操作符，如<code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Terms-query">术语查询</a></p></td>
     <td><p><code translate="no">in</code> 操作符</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Wildcard-query">通配符查询</a></p></td>
     <td><p><code translate="no">like</code> 操作符</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Boolean-query">布尔查询</a></p></td>
     <td><p>逻辑操作符，如<code translate="no">AND</code></p></td>
     <td><p>在过滤器上下文中使用时，这两种操作符都能提供类似的功能。</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>向量查询</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Knn-query">kNN 查询</a></p></td>
     <td><p>搜索</p></td>
     <td><p>Milvus 提供更高级的向量搜索功能。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">互易等级融合</a></p></td>
     <td><p>混合搜索</p></td>
     <td><p>Milvus 支持多种 Rerankers 策略。</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">全文本查询<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，全文查询使您能够搜索分析过的文本字段，如电子邮件正文。查询字符串将使用索引过程中应用于字段的相同分析器进行处理。</p>
<h3 id="Match-query" class="common-anchor-header">匹配查询</h3><p>在 Elasticsearch 中，匹配查询会返回与所提供的文本、数字、日期或布尔值相匹配的文档。在匹配之前会对所提供的文本进行分析。</p>
<p>下面是一个使用匹配查询的 Elasticsearch 搜索请求示例。</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus 通过全文搜索功能提供了相同的功能。你可以按如下方式将上述 Elasticsearch 查询转换为 Milvus 查询：</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>在上面的示例中，<code translate="no">message_sparse</code> 是一个稀疏向量字段，由名为<code translate="no">message</code> 的 VarChar 字段衍生而来。Milvus 使用 BM25 嵌入模型将<code translate="no">message</code> 字段中的值转换为稀疏向量嵌入，并将其存储在<code translate="no">message_sparse</code> 字段中。收到搜索请求后，Milvus 会使用相同的 BM25 模型嵌入纯文本查询有效载荷，并执行稀疏向量搜索，然后返回<code translate="no">output_fields</code> 参数中指定的<code translate="no">id</code> 和<code translate="no">message</code> 字段以及相应的相似性分数。</p>
<p>要使用此功能，必须在<code translate="no">message</code> 字段上启用分析器，并定义一个函数从中导出<code translate="no">message_sparse</code> 字段。有关启用分析器和在 Milvus 中创建派生函数的详细说明，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p>
<h2 id="Term-level-queries" class="common-anchor-header">术语级查询<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，术语级查询用于根据结构化数据中的精确值查找文档，如日期范围、IP 地址、价格或产品 ID。本节概述了一些 Elasticsearch 术语级查询在 Milvus 中的可能等价形式。为了与 Milvus 的功能保持一致，本节中的所有示例都在过滤器上下文中进行了操作符调整。</p>
<h3 id="IDs" class="common-anchor-header">ID</h3><p>在 Elasticsearch 中，你可以在过滤器上下文中根据 ID 查找文件，如下所示：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>在 Milvus 中，你也可以根据 ID 查找实体，如下所示：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>你可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">本页</a>找到 Elasticsearch 示例。有关查询和获取请求以及 Milvus 中过滤器表达式的详细信息，请参阅<a href="/docs/zh/get-and-scalar-query.md">查询</a>和<a href="/docs/zh/filtering">过滤</a>。</p>
<h3 id="Prefix-query" class="common-anchor-header">前缀查询</h3><p>在 Elasticsearch 中，你可以在过滤器上下文中查找在所提供字段中包含特定前缀的文档，如下所示：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>在 Milvus 中，你可以按如下方式查找其值以指定前缀开头的实体：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>你可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">本页</a>找到 Elasticsearch 示例。有关 Milvus 中<code translate="no">like</code> 操作符的详细信息，请参阅<a href="/docs/zh/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">使用 </a><code translate="no">LIKE</code><a href="/docs/zh/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> 进行模式匹配</a>。</p>
<h3 id="Range-query" class="common-anchor-header">范围查询</h3><p>在 Elasticsearch 中，您可以查找包含所提供范围内术语的文档，如下所示：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>在 Milvus 中，你可以按如下方式查找特定字段中的值在所提供范围内的实体：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>你可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">本页</a>找到 Elasticsearch 示例。有关 Milvus 中比较操作符的详细信息，请参阅<a href="/docs/zh/basic-operators.md#Comparison-operators">比较操作符</a>。</p>
<h3 id="Term-query" class="common-anchor-header">术语查询</h3><p>在 Elasticsearch 中，你可以查找在所提供字段中包含<strong>精确</strong>术语的文档，如下所示：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>在 Milvus 中，您可以按如下方式查找指定字段中的值正好是指定术语的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>你可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">本页</a>找到 Elasticsearch 示例。有关 Milvus 中比较操作符的详细信息，请参阅<a href="/docs/zh/basic-operators.md#Comparison-operators">比较操作符</a>。</p>
<h3 id="Terms-query" class="common-anchor-header">术语查询</h3><p>在 Elasticsearch 中，你可以查找在所提供字段中包含一个或多个<strong>精确</strong>术语的文档，如下所示：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus 没有与此完全等价的词。不过，您可以按如下方式查找指定字段中的值为指定术语之一的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">本页</a>找到 Elasticsearch 示例。有关 Milvus 中范围操作符的详细信息，请参阅<a href="/docs/zh/basic-operators.md#Range-operators">范围操作符</a>。</p>
<h3 id="Wildcard-query" class="common-anchor-header">通配符查询</h3><p>在 Elasticsearch 中，你可以查找包含与通配符模式匹配的术语的文档，如下所示：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus 在过滤条件中不支持通配符。不过，你可以使用<code translate="no">like</code> 操作符来实现类似的效果，如下所示：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">本页</a>找到 Elasticsearch 示例。有关 Milvus 中范围操作符的详细信息，请参阅<a href="/docs/zh/basic-operators.md#Range-operators">范围操作符</a>。</p>
<h2 id="Boolean-query" class="common-anchor-header">布尔查询<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，布尔查询是指匹配与其他查询的布尔组合相匹配的文档的查询。</p>
<p>下面的示例改编自<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">本页</a> Elasticsearch 文档中的一个示例。该查询将返回名称中包含<code translate="no">kimchy</code> 的用户，并带有<code translate="no">production</code> 标记。</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>在 Milvus 中，你可以做类似的事情，如下所示：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>上面的示例假定在目标 Collections 中有一个<strong>VarChar</strong>类型的<code translate="no">user</code> 字段和一个<strong>Array</strong>类型的<code translate="no">tags</code> 字段。查询将返回名称中包含<code translate="no">kimchy</code> 的用户，并带有<code translate="no">production</code> 标记。</p>
<h2 id="Vector-queries" class="common-anchor-header">向量查询<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，向量查询是对向量字段进行处理以有效执行语义搜索的专门查询。</p>
<h3 id="Knn-query" class="common-anchor-header">Knn 查询</h3><p>Elasticsearch 支持近似 kNN 查询和精确、强制 kNN 查询。你可以用这两种方式找到与查询向量最近的<em>k 个</em>向量，以相似度指标来衡量，具体如下：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>作为专门的向量数据库，Milvus 使用索引类型来优化向量搜索。通常，它优先考虑对高维向量数据进行近似近邻（ANN）搜索。虽然使用 FLAT 索引类型的暴力 kNN 搜索能得到精确的结果，但它既耗时又耗资源。相比之下，使用 AUTOINDEX 或其他索引类型的 ANN 搜索能在速度和精确度之间取得平衡，其性能明显比 kNN 更快、更节省资源。</p>
<p>在 Mlivus 中，与上述向量查询类似的等价关系是这样的：</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">本页</a>找到 Elasticsearch 示例。有关 Milvus 中 ANN 搜索的详细信息，请阅读<a href="/docs/zh/single-vector-search.md">基本 ANN 搜索</a>。</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">互惠排名融合</h3><p>Elasticsearch 提供互惠排名融合 (RRF)，可将具有不同相关性指标的多个结果集合并为一个排名结果集。</p>
<p>下面的示例演示了如何将传统的基于术语的搜索与 k-nearest neighbors (kNN) 向量搜索相结合，以提高搜索相关性：</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>在这个例子中，RRF 将两个检索器的结果结合在一起：</p>
<ul>
<li><p>对<code translate="no">text</code> 字段中包含术语<code translate="no">&quot;shoes&quot;</code> 的文档进行标准的基于术语的搜索。</p></li>
<li><p>使用提供的查询向量对<code translate="no">vector</code> 字段进行 kNN 检索。</p></li>
</ul>
<p>每个检索器最多可贡献 50 个最匹配结果，RRF 会对这些结果进行重新排序，并返回最终的前 10 个结果。</p>
<p>在 Milvus 中，您可以通过组合多个向量字段的搜索、应用重新排序策略并从组合列表中检索前 K 结果来实现类似的混合搜索。Milvus 支持 RRF 和加权重排序策略。更多详情，请参阅<a href="/docs/zh/weighted-ranker.md">Rerankers</a>。</p>
<p>下面是上述 Elasticsearch 示例在 Milvus 中的非严格等价。</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>该示例演示了 Milvus 中的混合搜索，它结合了以下内容：</p>
<ol>
<li><p><strong>密集向量搜索</strong>：使用内积（IP）度量，将<code translate="no">nprobe</code> 设置为 10，在<code translate="no">vector</code> 字段上进行近似近邻（ANN）搜索。</p></li>
<li><p><strong>稀疏向量搜索</strong>：在<code translate="no">text_sparse</code> 字段上使用 BM25 相似度指标，<code translate="no">drop_ratio_search</code> 参数为 0.2。</p></li>
</ol>
<p>这些搜索的结果分别执行、合并，并使用互易排名融合（RRF）排序器重新排序。混合搜索会从重新排序的列表中返回前 10 个实体。</p>
<p>与 Elasticsearch 的 RRF 排序不同，Milvus 将基于文本的标准查询和 kNN 搜索的结果合并在一起，提供了一种独特的混合搜索能力，针对多模态数据进行了优化。</p>
<h2 id="Recap" class="common-anchor-header">回顾<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>在这篇文章中，我们介绍了典型 Elasticsearch 查询到 Milvus 对应查询的转换，包括术语级查询、布尔查询、全文查询和向量查询。如果您对其他 Elasticsearch 查询的转换有进一步的问题，请随时联系我们。</p>
