---
id: inverted.md
title: 反轉
summary: >-
  Milvus 中的 INVERTED 索引旨在加速標量欄位和結構化 JSON
  欄位的篩選查詢。透過將詞彙對應到包含這些詞彙的文件或記錄，倒轉式索引可大幅提升查詢效能。
---
<h1 id="INVERTED" class="common-anchor-header">反轉<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">INVERTED</code> 索引旨在加速標量欄位和結構化 JSON 欄位的過濾查詢。透過將詞彙對應到包含這些詞彙的文件或記錄，倒轉式索引可大幅提升查詢效能。</p>
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
    </button></h2><p>在<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 的支援下，Milvus 實作了倒置索引來加速篩選查詢，尤其是針對文字資料。以下是其運作方式：</p>
<ol>
<li><p><strong>將資料標記化</strong>：Milvus 採用您的原始資料 (本範例中為兩句話)：</p>
<ul>
<li><p><strong>「Milvus是一個雲端原生向量資料庫」。</strong></p></li>
<li><p><strong>「Milvus 非常擅長效能」。</strong></p></li>
</ul>
<p>並將它們分割成獨特的詞彙 (例如：<em>Milvus</em>、<em>is</em>、<em>cloud-native</em>、<em>向量</em>、<em>資料庫</em>、<em>very</em>、<em>good</em>、<em>at</em>、<em>performance</em>)。</p></li>
<li><p><strong>建立詞彙辭典</strong>：這些獨特的詞彙會儲存在一個排序清單中，稱為<strong>詞彙辭典</strong>。這個詞典可讓 Milvus 快速檢查單字是否存在，並找出它在索引中的位置。</p></li>
<li><p><strong>建立反向清單</strong>：對於詞彙辭典中的每個詞彙，Milvus 保存一個<strong>反向列表</strong>，顯示哪些文件包含該詞彙。例如，<strong>"Milvus "</strong>出現在兩個句子中，所以它的反向列表指向兩個文件 ID。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>倒置</span> </span></p>
<p>由於字典已排序，因此可以有效率地處理基於詞彙的篩選。Milvus 不需要掃描所有的文件，只需在字典中查詢該詞彙，並擷取其倒置清單 - 大幅加快大型資料集的搜尋與篩選速度。</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">索引一般的標量欄位<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>對於<strong>BOOL</strong>、<strong>INT8</strong>、<strong>INT16</strong>、<strong>INT32</strong>、<strong>INT64</strong>、<strong>FLOAT</strong>、<strong>DOUBLE</strong>、<strong>VARCHAR</strong> 和<strong>ARRAY</strong> 等標量字段，建立反演索引非常簡單。使用<code translate="no">create_index()</code> 方法，並將<code translate="no">index_type</code> 參數設為<code translate="no">&quot;INVERTED&quot;</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">索引一個 JSON 欄位<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 將其索引功能擴展到 JSON 欄位，允許您有效地過濾儲存在單列中的嵌套或結構化資料。與標量欄位不同，當索引一個 JSON 欄位時，您必須提供兩個額外的參數：</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong>指定要索引的巢狀關鍵字。</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong>定義資料類型 (例如<code translate="no">&quot;varchar&quot;</code>,<code translate="no">&quot;double&quot;</code>, 或<code translate="no">&quot;bool&quot;</code>)，擷取的 JSON 值將被轉換成這種類型。</p></li>
</ul>
<p>例如，考慮一個名為<code translate="no">metadata</code> 的 JSON 欄位，其結構如下：</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>若要在特定的 JSON 路徑上建立反轉索引，您可以使用下列方法：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>範例 值</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>模式中 JSON 欄位的名稱。</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>要建立的索引類型；目前只有<code translate="no">INVERTED</code> 支援 JSON 路徑索引。</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(可選）自訂索引名稱。如果您在同一 JSON 欄位上建立多個索引，請指定不同的名稱。</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>指定要索引的 JSON 路徑。您可以針對巢狀索引鍵、陣列位置或兩者 (例如<code translate="no">metadata["product_info"]["category"]</code> 或<code translate="no">metadata["tags"][0]</code>)。如果路徑遺失或某一行的陣列元素不存在，索引過程中會直接跳過該行，且不會產生錯誤。</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>在建立索引時，Milvus 會將抽取的 JSON 值轉換成的資料類型。有效值：</p>
<ul>
<li><p><code translate="no">"bool"</code> 或<code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> 或<code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> 或<code translate="no">"VARCHAR"</code></p>
<p><strong>注意</strong>：對於整數值，Milvus 內部使用 double 來建立索引。超過 2^53 的大整數會失去精確度。如果轉換失敗（由於類型不匹配），不會產生錯誤，該行的值也不會被索引。</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">JSON 索引的注意事項<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>過濾邏輯</strong>：</p>
<ul>
<li><p>如果您<strong>建立了雙重類型的索引</strong>(<code translate="no">json_cast_type=&quot;double&quot;</code>)，則只有數值類型的篩選條件才能使用該索引。如果篩選條件將雙索引與非數字條件比較，Milvus 會退回到暴力搜尋。</p></li>
<li><p>如果您<strong>建立了 varchar 類型的索引</strong>(<code translate="no">json_cast_type=&quot;varchar&quot;</code>)，只有字串類型的篩選條件可以使用該索引。否則，Milvus 會回到暴力搜尋。</p></li>
<li><p><strong>布林</strong>索引的行為與 varchar-type 類似。</p></li>
</ul></li>
<li><p><strong>術語表達式</strong>：</p>
<ul>
<li>您可以使用<code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code> 。但是，索引只對存放在該路徑下的標量值有效。如果<code translate="no">json[&quot;field&quot;]</code> 是一個陣列，查詢會退回到暴力查詢 (目前尚未支援陣列類型索引)。</li>
</ul></li>
<li><p><strong>數值精確度</strong>：</p>
<ul>
<li>在內部，Milvus 將所有數值欄位索引為雙倍。如果數值超過<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>，就會失去精確度，對這些超出範圍的數值進行查詢時，可能無法完全匹配。</li>
</ul></li>
<li><p><strong>資料完整性</strong>：</p>
<ul>
<li>Milvus 不會解析或轉換超出您指定的鑄造範圍的 JSON 鍵。如果來源資料不一致（例如，某些資料列的 key<code translate="no">&quot;k&quot;</code> 儲存了字串，而其他資料列則儲存了數字），某些資料列將不會被索引。</li>
</ul></li>
</ul>
