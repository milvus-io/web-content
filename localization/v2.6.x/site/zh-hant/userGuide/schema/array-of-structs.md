---
id: array-of-structs.md
title: 結構陣列Compatible with Milvus 2.6.4+
summary: 實體中的 Structs 陣列欄位儲存一組有序的 Struct 元素。陣列中的每個 Struct 都共用相同的預定義模式，包含多個向量和標量欄位。
beta: Milvus 2.6.4+
---
<h1 id="Array-of-Structs" class="common-anchor-header">結構陣列<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>實體中的 Structs 陣列欄位儲存一組有序的 Struct 元素。陣列中的每個 Struct 都共用相同的預定義模式，包含多個向量和標量欄位。</p>
<p>以下是一個包含 Array of Structs 欄位的集合實體範例。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    &#x27;id&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    &#x27;title&#x27;<span class="hljs-punctuation">:</span> &#x27;Walden&#x27;<span class="hljs-punctuation">,</span>
    &#x27;title_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span>
    &#x27;author&#x27;<span class="hljs-punctuation">:</span> &#x27;Henry David Thoreau&#x27;<span class="hljs-punctuation">,</span>
    &#x27;year_of_publication&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">1845</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">    &#x27;chunks&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;When I wrote the following pages<span class="hljs-punctuation">,</span> or rather the bulk of them...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;I would fain say something<span class="hljs-punctuation">,</span> not so much concerning the Chinese and...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;</span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line">    <span class="hljs-punctuation">]</span></span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// hightlight-end</span></span>
<span class="highlighted-comment-line"><span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<p>在上面的範例中，<code translate="no">chunks</code> 欄位是一個 Array of Structs 欄位，而每個 Struct 元素都包含自己的欄位，即<code translate="no">text</code>,<code translate="no">text_vector</code>, 和<code translate="no">chapter</code> 。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>資料類型</strong></p>
<p>當您建立一個集合時，您可以使用 Struct 類型作為 Array 欄位中元素的資料類型。然而，你不能在現有的集合中加入一個 Struct 的 Array，而且 Milvus 不支援使用 Struct 種類作為集合欄位的資料類型。</p>
<p>陣列欄位中的 Struct 共享相同的模式，這應該在您建立陣列欄位時定義。</p>
<p>Struct 模式包含向量和標量欄位，如下表所列：</p>
<p><table>
<tr>
<th><p>欄位類型</p></th>
<th><p>資料類型</p></th>
</tr>
<tr>
<td><p>向量</p></td>
<td><p><code translate="no">FLOAT_VECTOR</code></p></td>
</tr>
<tr>
<td rowspan="5"><p>標量</p></td>
<td><p><code translate="no">VARCHAR</code></p></td>
</tr>
<tr>
<td><p><code translate="no">INT8/16/32/64</code></p></td>
</tr>
<tr>
<td><p><code translate="no">FLOAT</code></p></td>
</tr>
<tr>
<td><p><code translate="no">DOUBLE</code></p></td>
</tr>
<tr>
<td><p><code translate="no">BOOLEAN</code></p></td>
</tr>
</table></p>
<p>保持集合層級和 Structs 合併的向量欄位數量不超過或等於 10。</p></li>
<li><p><strong>可空值與預設值</strong></p>
<p>Structs 陣列欄位不可為空，也不接受任何預設值。</p></li>
<li><p><strong>函數</strong></p>
<p>您不能使用函數從 Struct 中的標量欄位衍生出向量欄位。</p></li>
<li><p><strong>索引類型與度量類型</strong></p>
<p>集合中的所有向量欄位都必須建立索引。要索引一個 Array of Structs 欄位中的向量欄位，Milvus 使用一個 embedding list 來組織每個 Struct 元素中的向量 embeddings，並將整個 embedding list 作為一個整體來索引。</p>
<p>您可以使用<code translate="no">HNSW</code> 作為索引類型，並使用下面列出的任何度量類型，為 Array of Structs 欄位中的嵌入清單建立索引。</p>
<p><table>
<tr>
<th><p>索引類型</p></th>
<th><p>度量類型</p></th>
<th><p>備註</p></th>
</tr>
<tr>
<td rowspan="5"><p><code translate="no">HNSW</code></p></td>
<td><p><code translate="no">MAX_SIM_COSINE</code></p></td>
<td rowspan="3"><p>適用於下列類型的嵌入清單：</p><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>bfloat16_vector</p></li><li><p>INT8_VECTOR</p></li></ul></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_IP</code></p></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_L2</code></p></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_HAMMING</code></p></td>
<td rowspan="2"><p>用於嵌入 BINARY_VECTOR 類型的清單</p></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_JACCARD</code></p></td>
</tr>
</table></p>
<p>Array of Structs 欄位中的標量欄位不支援索引。</p></li>
<li><p><strong>向上插入資料</strong></p>
<p>在合併模式中，Structs 不支援 upsert。但是，您仍然可以在覆寫模式下執行 upserts 來更新 Structs 中的資料。有關在合併模式和覆寫模式下 upsert 的差異，請參閱<a href="/docs/zh-hant/upsert-entities.md#Overview">Upsert Entities</a>。</p></li>
<li><p><strong>標量篩選</strong></p>
<p>您不能在搜尋和查詢的過濾表達式中使用 Structs 陣列或其 Struct 元素中的任何欄位。</p></li>
</ul>
<h2 id="Add-Array-of-Structs" class="common-anchor-header">添加結構陣列<button data-href="#Add-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中使用 Structs 陣列，你需要在創建集合時定義一個陣列欄位，並設定其元素的數據類型為 Struct。過程如下：</p>
<ol>
<li><p>在集合模式中加入陣列欄位時，設定欄位的資料類型為<code translate="no">DataType.ARRAY</code> 。</p></li>
<li><p>將欄位的<code translate="no">element_type</code> 屬性設定為<code translate="no">DataType.STRUCT</code> ，使欄位成為 Struct 陣列。</p></li>
<li><p>建立 Struct 結構描述，並包含所需欄位。然後，在欄位的<code translate="no">struct_schema</code> 屬性中引用 Struct 結構描述。</p></li>
<li><p>設定欄位的<code translate="no">max_capacity</code> 屬性為適當的值，以指定每個實體在此欄位中可包含的最大 Struct 數量。</p></li>
<li><p><strong>(可選</strong>）您可以為 Struct 元素中的任何欄位設定<code translate="no">mmap.enabled</code> ，以平衡 Struct 中的冷熱資料。</p></li>
</ol>
<p>以下是您如何定義包含 Array of Structs 的集合模式：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

<span class="hljs-comment"># add the primary field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># add some scalar fields to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;year_of_publication&quot;</span>, datatype=DataType.INT64)

<span class="hljs-comment"># add a vector field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create a struct schema</span></span>
<span class="highlighted-comment-line">struct_schema = MilvusClient.create_struct_field_schema()</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a scalar field to the struct</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)</span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a vector field to the struct with mmap enabled</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># reference the struct schema in an Array field with its </span></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># element type set to `DataType.STRUCT`</span></span>
<span class="highlighted-comment-line">schema.add_field(<span class="hljs-string">&quot;chunks&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.STRUCT, </span>
<span class="highlighted-comment-line">                    struct_schema=struct_schema, max_capacity=<span class="hljs-number">1000</span>)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>上述程式碼範例中高亮顯示的幾行說明在集合模式中包含 Structs 陣列的程序。</p>
<h2 id="Set-index-params" class="common-anchor-header">設定索引參數<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>所有向量欄位都必須設定索引，包括集合中的向量欄位和元素 Struct 中定義的向量欄位。</p>
<p>適用的索引參數會依據使用中的索引類型而有所不同。有關適用索引參數的詳細資訊，請參閱<a href="/docs/zh-hant/index-explained.md">Index Explained</a>以及特定於您所選索引類型的說明文件頁面。</p>
<p>若要為嵌入式清單欄位建立索引，您需要將其索引類型設定為<code translate="no">HNSW</code> ，並使用<code translate="no">MAX_SIM_COSINE</code> 作為 Milvus 的度量類型，以衡量嵌入式清單之間的相似性。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index parameters</span>
index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># Create an index for the vector field in the collection</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}
)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create an index for the vector field in the element Struct</span></span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection" class="common-anchor-header">建立集合<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦模式和索引準備就緒，您就可以建立一個包含 Array of Structs 欄位的集合。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">插入資料<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>建立資料集後，您可以插入包含 Structs 陣列的資料，如下所示。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = {
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Walden&#x27;</span>,
    <span class="hljs-string">&#x27;title_vector&#x27;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]
    <span class="hljs-string">&#x27;author&#x27;</span>: <span class="hljs-string">&#x27;Henry David Thoreau&#x27;</span>,
    <span class="hljs-string">&#x27;year-of-publication&#x27;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-string">&#x27;chunks&#x27;</span>: [
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;When I wrote the following pages, or rather the bulk of them...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>]
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>,
        },
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;I would fain say something, not so much concerning the Chinese and...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>
        }
    ]
}

<span class="hljs-comment"># insert data</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[data]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>需要更多資料？</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Dict</span>, <span class="hljs-type">Any</span>

<span class="hljs-comment"># Real classic books (title, author, year)</span>
BOOKS = [
    (<span class="hljs-string">&quot;Pride and Prejudice&quot;</span>, <span class="hljs-string">&quot;Jane Austen&quot;</span>, <span class="hljs-number">1813</span>),
    (<span class="hljs-string">&quot;Moby Dick&quot;</span>, <span class="hljs-string">&quot;Herman Melville&quot;</span>, <span class="hljs-number">1851</span>),
    (<span class="hljs-string">&quot;Frankenstein&quot;</span>, <span class="hljs-string">&quot;Mary Shelley&quot;</span>, <span class="hljs-number">1818</span>),
    (<span class="hljs-string">&quot;The Picture of Dorian Gray&quot;</span>, <span class="hljs-string">&quot;Oscar Wilde&quot;</span>, <span class="hljs-number">1890</span>),
    (<span class="hljs-string">&quot;Dracula&quot;</span>, <span class="hljs-string">&quot;Bram Stoker&quot;</span>, <span class="hljs-number">1897</span>),
    (<span class="hljs-string">&quot;The Adventures of Sherlock Holmes&quot;</span>, <span class="hljs-string">&quot;Arthur Conan Doyle&quot;</span>, <span class="hljs-number">1892</span>),
    (<span class="hljs-string">&quot;Alice&#x27;s Adventures in Wonderland&quot;</span>, <span class="hljs-string">&quot;Lewis Carroll&quot;</span>, <span class="hljs-number">1865</span>),
    (<span class="hljs-string">&quot;The Time Machine&quot;</span>, <span class="hljs-string">&quot;H.G. Wells&quot;</span>, <span class="hljs-number">1895</span>),
    (<span class="hljs-string">&quot;The Scarlet Letter&quot;</span>, <span class="hljs-string">&quot;Nathaniel Hawthorne&quot;</span>, <span class="hljs-number">1850</span>),
    (<span class="hljs-string">&quot;Leaves of Grass&quot;</span>, <span class="hljs-string">&quot;Walt Whitman&quot;</span>, <span class="hljs-number">1855</span>),
    (<span class="hljs-string">&quot;The Brothers Karamazov&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1880</span>),
    (<span class="hljs-string">&quot;Crime and Punishment&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1866</span>),
    (<span class="hljs-string">&quot;Anna Karenina&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1877</span>),
    (<span class="hljs-string">&quot;War and Peace&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1869</span>),
    (<span class="hljs-string">&quot;Great Expectations&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1861</span>),
    (<span class="hljs-string">&quot;Oliver Twist&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1837</span>),
    (<span class="hljs-string">&quot;Wuthering Heights&quot;</span>, <span class="hljs-string">&quot;Emily Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;Jane Eyre&quot;</span>, <span class="hljs-string">&quot;Charlotte Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;The Call of the Wild&quot;</span>, <span class="hljs-string">&quot;Jack London&quot;</span>, <span class="hljs-number">1903</span>),
    (<span class="hljs-string">&quot;The Jungle Book&quot;</span>, <span class="hljs-string">&quot;Rudyard Kipling&quot;</span>, <span class="hljs-number">1894</span>),
]

<span class="hljs-comment"># Common chapter names for classics</span>
CHAPTERS = [
    <span class="hljs-string">&quot;Introduction&quot;</span>, <span class="hljs-string">&quot;Prologue&quot;</span>, <span class="hljs-string">&quot;Chapter I&quot;</span>, <span class="hljs-string">&quot;Chapter II&quot;</span>, <span class="hljs-string">&quot;Chapter III&quot;</span>,
    <span class="hljs-string">&quot;Chapter IV&quot;</span>, <span class="hljs-string">&quot;Chapter V&quot;</span>, <span class="hljs-string">&quot;Chapter VI&quot;</span>, <span class="hljs-string">&quot;Chapter VII&quot;</span>, <span class="hljs-string">&quot;Chapter VIII&quot;</span>,
    <span class="hljs-string">&quot;Chapter IX&quot;</span>, <span class="hljs-string">&quot;Chapter X&quot;</span>, <span class="hljs-string">&quot;Epilogue&quot;</span>, <span class="hljs-string">&quot;Conclusion&quot;</span>, <span class="hljs-string">&quot;Afterword&quot;</span>,
    <span class="hljs-string">&quot;Economy&quot;</span>, <span class="hljs-string">&quot;Where I Lived&quot;</span>, <span class="hljs-string">&quot;Reading&quot;</span>, <span class="hljs-string">&quot;Sounds&quot;</span>, <span class="hljs-string">&quot;Solitude&quot;</span>,
    <span class="hljs-string">&quot;Visitors&quot;</span>, <span class="hljs-string">&quot;The Bean-Field&quot;</span>, <span class="hljs-string">&quot;The Village&quot;</span>, <span class="hljs-string">&quot;The Ponds&quot;</span>, <span class="hljs-string">&quot;Baker Farm&quot;</span>
]

<span class="hljs-comment"># Placeholder text snippets (mimicking 19th-century prose)</span>
TEXT_SNIPPETS = [
    <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
    <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
    <span class="hljs-string">&quot;It is a truth universally acknowledged, that a single man in possession...&quot;</span>,
    <span class="hljs-string">&quot;Call me Ishmael. Some years ago—never mind how long precisely...&quot;</span>,
    <span class="hljs-string">&quot;It was the best of times, it was the worst of times...&quot;</span>,
    <span class="hljs-string">&quot;All happy families are alike; each unhappy family is unhappy in its own way.&quot;</span>,
    <span class="hljs-string">&quot;Whether I shall turn out to be the hero of my own life, or whether that station...&quot;</span>,
    <span class="hljs-string">&quot;You will rejoice to hear that no disaster has accompanied the commencement...&quot;</span>,
    <span class="hljs-string">&quot;The world is too much with us; late and soon, getting and spending...&quot;</span>,
    <span class="hljs-string">&quot;He was an old man who fished alone in a skiff in the Gulf Stream...&quot;</span>
]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">random_vector</span>() -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]:
    <span class="hljs-keyword">return</span> [<span class="hljs-built_in">round</span>(random.random(), <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>)]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_chunk</span>() -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;text&quot;</span>: random.choice(TEXT_SNIPPETS),
        <span class="hljs-string">&quot;text_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;chapter&quot;</span>: random.choice(CHAPTERS)
    }

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_record</span>(<span class="hljs-params">record_id: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    title, author, year = random.choice(BOOKS)
    num_chunks = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>)  <span class="hljs-comment"># 1 to 5 chunks per book</span>
    chunks = [generate_chunk() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_chunks)]
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;title&quot;</span>: title,
        <span class="hljs-string">&quot;title_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;author&quot;</span>: author,
        <span class="hljs-string">&quot;year_of_publication&quot;</span>: year,
        <span class="hljs-string">&quot;chunks&quot;</span>: chunks
    }

<span class="hljs-comment"># Generate 1000 records</span>
data = [generate_record(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>)]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Vector-search-against-an-Array-of-Structs-field" class="common-anchor-header">針對 Structs 陣列欄位進行向量搜尋<button data-href="#Vector-search-against-an-Array-of-Structs-field" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以對集合和 Array of Structs 中的向量欄位執行向量搜尋。</p>
<p>具體來說，你可以直接使用 Struct 元素中向量欄位的名稱作為搜尋請求中<code translate="no">anns_field</code> 參數的值，並使用<code translate="no">EmbeddingList</code> 來整齊地組織查詢向量。</p>
<div class="alert note">
<p>Milvus 提供了<code translate="no">EmbeddingList</code> 來幫助您更整齊地組織查詢向量，以便針對 Structs 陣列中的嵌入清單進行搜尋。</p>
<p>不過，<code translate="no">EmbeddingList</code> 只能用於<code translate="no">search()</code> 沒有範圍搜尋或群組搜尋參數的請求，更不用說<code translate="no">search_iterator()</code> 請求了。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> EmbeddingList

<span class="hljs-comment"># each query embedding list triggers a single search</span>
embeddingList1 = EmbeddingList()
embeddingList1.add([<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>])

embeddingList2 = EmbeddingList()
embeddingList2.add([-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>])
embeddingList2.add([-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>])

<span class="hljs-comment"># a search with a single embedding list</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>上面的搜尋請求使用<code translate="no">chunks[text_vector]</code> 來參照 Struct 元素中的<code translate="no">text_vector</code> 欄位。您可以使用這個語法來設定<code translate="no">anns_field</code> 和<code translate="no">output_fields</code> 參數。</p>
<p>輸出將會是三個最相似實體的清單。</p>
<p><details></p>
<p><summary>輸出</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>您也可以在<code translate="no">data</code> 參數中包含多個嵌入清單，以擷取每個嵌入清單的搜尋結果。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># a search with multiple embedding lists</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1, embeddingList2 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>輸出會是每個嵌入清單的三個最相似實體的清單。</p>
<p><details></p>
<p><summary>輸出</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ],</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144663,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9761409759521484,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Whether I shall turn out to be the hero of my own life, or whether that station...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144692,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.974656581878662,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144662,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9406685829162598,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>在上述程式碼範例中，<code translate="no">embeddingList1</code> 是一個向量的嵌入清單，而<code translate="no">embeddingList2</code> 則包含兩個向量。每個都會觸發單獨的搜尋請求，並期望得到前 K 個最相似的實體清單。</p>
<h2 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>原生 Array of Structs 資料類型的開發，代表 Milvus 處理複雜資料結構能力的一大進步。為了更好地瞭解其使用案例並最大化這項新功能，我們鼓勵您閱讀「<a href="/docs/zh-hant/best-practices-for-array-of-structs.md">使用結構陣列的模式設計</a>」。</p>
