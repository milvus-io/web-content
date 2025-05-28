---
id: elasticsearch-queries-to-milvus.md
title: Elasticsearch 查詢至 Milvus
summary: >-
  建立在 Apache Lucene 上的 Elasticsearch
  是領先的開源搜尋引擎。然而，它在現代人工智能應用中面臨挑戰，包括更新成本高、即時效能差、分片管理效率低、非雲原生設計，以及過多的資源需求。身為雲端原生向量資料庫，Milvus
  透過解耦儲存與運算、高維資料的有效索引，以及與現代基礎架構的無縫整合，克服了這些問題。它可為人工智能工作負載提供優異的效能與擴充性。
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Elasticsearch 查詢至 Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>建立在 Apache Lucene 上的 Elasticsearch 是領先的開放原始碼搜尋引擎。然而，它在現代人工智能應用程式中面臨挑戰，包括更新成本高、即時效能差、分片管理效率低、非雲原生設計以及資源需求過高。身為雲端原生向量資料庫，Milvus 透過解耦儲存與運算、高維資料的有效索引，以及與現代基礎架構的無縫整合，克服了這些問題。它可為人工智能工作負載提供優異的效能與擴充性。</p>
<p>本文旨在協助您將程式碼從 Elasticsearch 遷移到 Milvus，並提供各種轉換查詢的範例。</p>
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
    </button></h2><p>在 Elasticsearch 中，查詢上下文中的操作會產生相關性分數，而過濾上下文中的操作則不會。同樣地，Milvus 的搜尋會產生相似性分數，而類似過濾器的查詢則不會。當您的程式碼從 Elasticsearch 遷移到 Milvus 時，關鍵原則是將 Elasticsearch 的查詢上下文中使用的欄位轉換成向量欄位，以便產生相似性分數。</p>
<p>下表概述了一些 Elasticsearch 查詢模式及其在 Milvus 中的對應等值。</p>
<table>
   <tr>
     <th><p>Elasticsearch 查詢</p></th>
     <th><p>Milvus 對應模式</p></th>
     <th><p>備註</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>全文查詢</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Match-query">匹配查詢</a></p></td>
     <td><p>全文檢索</p></td>
     <td><p>兩者提供類似的功能。</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>詞彙層級查詢</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> 操作者</p></td>
     <td rowspan="6"><p>當這些 Elasticsearch 查詢用於篩選器上下文時，兩者都提供相同或類似的功能集。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Prefix-query">前綴查詢</a></p></td>
     <td><p><code translate="no">like</code> 運算符號</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Range-query">範圍查詢</a></p></td>
     <td><p>比較運算符如<code translate="no">&gt;</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;=</code>, 和<code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Term-query">詞彙查詢</a></p></td>
     <td><p>比較運算符如<code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Terms-query">術語查詢</a></p></td>
     <td><p><code translate="no">in</code> 運算符號</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Wildcard-query">通配符查詢</a></p></td>
     <td><p><code translate="no">like</code> 運算符號</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Boolean-query">布林查詢</a></p></td>
     <td><p>邏輯運算符如<code translate="no">AND</code></p></td>
     <td><p>在篩選器上下文中使用時，兩者都提供類似的功能。</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>向量查詢</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Knn-query">kNN 查詢</a></p></td>
     <td><p>搜尋</p></td>
     <td><p>Milvus 提供更先進的向量搜尋功能。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">交互式排名融合</a></p></td>
     <td><p>混合搜尋</p></td>
     <td><p>Milvus 支援多種重排策略。</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">全文本查詢<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，全文查詢可讓您搜尋經分析的文字欄位，例如電子郵件的正文。查詢字串會使用索引期間套用於欄位的相同分析器來處理。</p>
<h3 id="Match-query" class="common-anchor-header">匹配查詢</h3><p>在 Elasticsearch 中，匹配查詢會返回符合所提供的文字、數字、日期或布林值的文件。在匹配之前，會先分析所提供的文字。</p>
<p>以下是一個使用匹配查詢的 Elasticsearch 搜尋請求範例。</p>
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
<p>Milvus 透過全文搜尋功能提供相同的功能。您可以如下將上述 Elasticsearch 查詢轉換成 Milvus：</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>在上面的範例中，<code translate="no">message_sparse</code> 是一個由 VarChar 欄位衍生出來的稀疏向量欄位，其名稱為<code translate="no">message</code> 。Milvus 使用 BM25 嵌入模型將<code translate="no">message</code> 欄位中的值轉換為稀疏向量嵌入，並儲存在<code translate="no">message_sparse</code> 欄位中。收到搜尋請求後，Milvus 會使用相同的 BM25 模型嵌入純文字查詢有效載荷，並執行稀疏向量搜尋，然後傳回<code translate="no">output_fields</code> 參數中指定的<code translate="no">id</code> 和<code translate="no">message</code> 欄位，以及相應的相似性分數。</p>
<p>若要使用此功能，您必須啟用<code translate="no">message</code> 欄位的分析器，並定義一個函式，從中得出<code translate="no">message_sparse</code> 欄位。有關啟用分析器和在 Milvus 中建立衍生函數的詳細說明，請參閱<a href="/docs/zh-hant/full-text-search.md">全文檢索</a>。</p>
<h2 id="Term-level-queries" class="common-anchor-header">詞彙層級查詢<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，詞彙層級查詢用於根據結構化資料中的精確值來尋找文件，例如日期範圍、IP 位址、價格或產品 ID。本節將介紹一些 Elasticsearch 詞彙層級查詢在 Milvus 中的可能等效方式。本節中的所有範例都經過調整，以便在篩選器上下文中運作，以符合 Milvus 的功能。</p>
<h3 id="IDs" class="common-anchor-header">ID</h3><p>在 Elasticsearch 中，您可以根據篩選上下文中的 ID 來尋找文件，如下所示：</p>
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
<p>在 Milvus 中，您也可以根據 ID 來尋找實體，如下所示：</p>
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
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">此頁面</a>找到 Elasticsearch 的範例。有關查詢和獲取請求以及 Milvus 中過濾器表達式的詳細資訊，請參閱<a href="/docs/zh-hant/get-and-scalar-query.md">查詢</a>和<a href="/docs/zh-hant/filtering">過濾</a>。</p>
<h3 id="Prefix-query" class="common-anchor-header">前綴查詢</h3><p>在 Elasticsearch 中，您可以在篩選上下文中找到在所提供欄位中包含特定前綴的文件，如下所示：</p>
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
<p>在 Milvus 中，您可以尋找其值以指定前綴開頭的實體，如下所示：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">此頁面</a>找到 Elasticsearch 的範例。有關 Milvus 中<code translate="no">like</code> 運算符號的詳細資訊，請參閱<a href="/docs/zh-hant/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">使用 </a><code translate="no">LIKE</code><a href="/docs/zh-hant/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> 進行模式匹配</a>。</p>
<h3 id="Range-query" class="common-anchor-header">範圍查詢</h3><p>在 Elasticsearch 中，您可以尋找包含所提供範圍內詞彙的文件，如下所示：</p>
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
<p>在 Milvus 中，您可以尋找特定欄位中的值在提供範圍內的實體，如下所示：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">此頁面</a>找到 Elasticsearch 的範例。有關 Milvus 中比較運算元的詳細資訊，請參閱比較<a href="/docs/zh-hant/basic-operators.md#Comparison-operators">運算元</a>。</p>
<h3 id="Term-query" class="common-anchor-header">術語查詢</h3><p>在 Elasticsearch 中，您可以尋找在所提供欄位中包含<strong>精確詞</strong>彙的文件，如下所示：</p>
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
<p>在 Milvus 中，您可以如下查找指定欄位中的值正好是指定術語的實體：</p>
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
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">此頁面</a>找到 Elasticsearch 的範例。有關 Milvus 中比較運算元的詳細資訊，請參閱比較<a href="/docs/zh-hant/basic-operators.md#Comparison-operators">運算元</a>。</p>
<h3 id="Terms-query" class="common-anchor-header">術語查詢</h3><p>在 Elasticsearch 中，您可以尋找在所提供欄位中包含一個或多個<strong>精確</strong>詞彙的文件，如下所示：</p>
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
<p>Milvus 並沒有完全等同的這個。但是，您可以尋找在指定欄位中值為指定詞彙之一的實體，如下所示：</p>
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
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">此頁面</a>找到 Elasticsearch 的範例。有關 Milvus 中範圍運算符的詳細資訊，請參閱範圍<a href="/docs/zh-hant/basic-operators.md#Range-operators">運算符</a>。</p>
<h3 id="Wildcard-query" class="common-anchor-header">通配符查詢</h3><p>在 Elasticsearch 中，您可以尋找包含符合通配符模式的詞彙的文件，如下所示：</p>
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
<p>Milvus 在過濾條件中不支援通配符。但是，您可以使用<code translate="no">like</code> 運算符達到類似效果，如下所示：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">此頁面</a>找到 Elasticsearch 的範例。有關 Milvus 中範圍運算符的詳細資訊，請參閱範圍<a href="/docs/zh-hant/basic-operators.md#Range-operators">運算符</a>。</p>
<h2 id="Boolean-query" class="common-anchor-header">布林查詢<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，布林查詢是匹配其他查詢的布林組合的文件的查詢。</p>
<p>以下範例改編<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">自本頁</a> Elasticsearch 文件中的範例。查詢將傳回名稱中含有<code translate="no">kimchy</code> 的使用者，並帶有<code translate="no">production</code> 標籤。</p>
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
<p>在 Milvus 中，您可以做以下類似的事情：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>上述範例假設您在目標集合中有一個<strong>VarChar</strong>類型的<code translate="no">user</code> 欄位和一個<strong>Array</strong>類型的<code translate="no">tags</code> 欄位。查詢將傳回名稱中含有<code translate="no">kimchy</code> 的使用者，並帶有<code translate="no">production</code> 標籤。</p>
<h2 id="Vector-queries" class="common-anchor-header">向量查詢<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Elasticsearch 中，向量查詢是專門針對向量欄位來有效執行語意搜尋的查詢。</p>
<h3 id="Knn-query" class="common-anchor-header">Knn 查詢</h3><p>Elasticsearch 支援近似的 kNN 查詢和精確、粗暴的 kNN 查詢。您可以用這兩種方式找出與查詢向量最近的<em>k 個</em>向量，並以相似度指標衡量，如下所示：</p>
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
<p>Milvus 作為專門的向量資料庫，使用索引類型來最佳化向量搜尋。通常，它優先對高維向量資料進行近似最近鄰 (ANN) 搜尋。雖然使用 FLAT 索引類型的暴力 kNN 搜尋能提供精確的結果，但卻既耗時又耗資源。相比之下，使用 AUTOINDEX 或其他索引類型的 ANN 搜尋能平衡速度與精確度，提供比 kNN 更快、更節省資源的效能。</p>
<p>在 Mlivus 中，與上述向量查詢的類似等式是這樣的：</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">此頁面</a>找到 Elasticsearch 的範例。有關 Milvus 中 ANN 搜尋的詳細資訊，請閱讀<a href="/docs/zh-hant/single-vector-search.md">Basic ANN Search</a>。</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">互惠排名融合</h3><p>Elasticsearch 提供 Reciprocal Rank Fusion (RRF)，可將具有不同相關性指標的多個結果集合併為單一排序的結果集。</p>
<p>以下範例展示如何結合傳統的詞彙搜尋與 k-nearest neighbors (kNN) 向量搜尋，以改善搜尋的相關性：</p>
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
<p>在這個範例中，RRF 結合了兩個檢索器的結果：</p>
<ul>
<li><p>對<code translate="no">text</code> 欄位中包含<code translate="no">&quot;shoes&quot;</code> 這個詞彙的文件進行標準的基於詞彙的檢索。</p></li>
<li><p>使用提供的查詢向量對<code translate="no">vector</code> 欄位進行 kNN 搜尋。</p></li>
</ul>
<p>每個擷取器會貢獻多達 50 個最頂尖的匹配結果，這些結果會由 RRF 重新排序，最後會傳回最頂尖的 10 個結果。</p>
<p>在 Milvus 中，您可以透過結合跨多個向量欄位的搜尋、套用重新排序策略，並從結合清單中擷取 Top-K 結果，來達到類似混合搜尋的目的。Milvus 支援 RRF 和加權 reranker 策略。如需詳細資訊，請參閱<a href="/docs/zh-hant/reranking.md">Reranking</a>。</p>
<p>以下是上述 Elasticsearch 範例在 Milvus 中的非嚴格等效性。</p>
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
<p>此範例展示了 Milvus 中的混合搜尋，它結合了：</p>
<ol>
<li><p><strong>密集向量搜尋</strong>：使用<code translate="no">nprobe</code> 設定為 10 的內積 (IP) 公制，在<code translate="no">vector</code> 欄位上進行近似最近鄰 (ANN) 搜尋。</p></li>
<li><p><strong>稀疏向量搜尋</strong>：在<code translate="no">text_sparse</code> 欄位上使用 BM25 相似度指標，<code translate="no">drop_ratio_search</code> 參數為 0.2。</p></li>
</ol>
<p>這些搜尋的結果會分別執行、合併，並使用 Reciprocal Rank Fusion (RRF) 排序器重新排序。混合搜尋會從重新排序的清單中返回前 10 個實體。</p>
<p>不同於 Elasticsearch 的 RRF 排序會合併標準文字查詢和 kNN 搜尋的結果，Milvus 會合併稀疏和密集向量搜尋的結果，提供獨特的混合搜尋功能，針對多模式資料進行最佳化。</p>
<h2 id="Recap" class="common-anchor-header">重溫<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>在這篇文章中，我們涵蓋了典型 Elasticsearch 查詢與 Milvus 等效查詢的轉換，包括術語級查詢、布林查詢、全文查詢和向量查詢。如果您對於轉換其他 Elasticsearch 查詢有進一步的問題，歡迎與我們聯繫。</p>
