---
id: schema.md
summary: 學習如何在 Milvus 中定義模式。
title: 管理模式
---
<h1 id="Manage-Schema" class="common-anchor-header">管理模式<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹 Milvus 的模式。模式用於定義集合的屬性和其中的欄位。</p>
<h2 id="Field-schema" class="common-anchor-header">欄位模式<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>欄位模式是欄位的邏輯定義。在定義<a href="#Collection-schema">集合模式</a>和<a href="/docs/zh-hant/manage-collections.md">管理集合</a>之前，首先需要定義它。</p>
<p>Milvus 在一個集合中只支援一個主鍵欄位。</p>
<h3 id="Field-schema-properties" class="common-anchor-header">欄位模式屬性</h3><table class="properties">
    <thead>
    <tr>
        <th>屬性</th>
        <th>說明</th>
        <th>註解</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>要建立的資料集中欄位的名稱</td>
        <td>資料類型：<br/>必填</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>欄位的資料類型</td>
        <td>必須填寫</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>欄位的描述</td>
        <td>資料類型：<br/>可選</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>是否設定欄位為主索引欄位</td>
        <td>資料類型： 布林 (  或  )：布林 (<code translate="no">true</code> 或<code translate="no">false</code>)。<br/>主鍵欄位必須填寫</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (主鍵欄位必須使用)</td>
            <td>開啟或關閉 ID（主鍵）自動分配的開關。</td>
            <td><code translate="no">True</code> 或<code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (對於 VARCHAR 欄位必須使用)</td>
            <td>允許插入字串的最大位元組長度。請注意，多位元組字元（例如 Unicode 字元）可能佔用超過一個位元組，因此請確保插入字串的位元組長度不超過指定的限制。</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>向量的尺寸</td>
            <td>資料類型：<br/>密集向量欄位必須填寫。對於<a href="https://milvus.io/docs/sparse_vector.md">稀疏向量</a>場，請省略。</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>此欄位是否為分割鍵欄位。</td>
        <td>資料類型：Boolean (<code translate="no">true</code> 或<code translate="no">false</code>)。</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">建立欄位模式</h3><p>為了降低資料插入的複雜性，Milvus 允許您在建立欄位模式時，為每個標量欄位指定預設值，但不包括主鍵欄位。這表示，如果您在插入資料時讓欄位為空，您為這個欄位指定的預設值就會適用。</p>
<p>建立常規欄位模式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>建立具有預設欄位值的欄位模式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">支援的資料類型</h3><p><code translate="no">DataType</code> 定義欄位包含的資料類型。不同的欄位支援不同的資料類型。</p>
<ul>
<li><p>主鍵欄位支援</p>
<ul>
<li>INT64: numpy.int64</li>
<li>varchar: varchar</li>
</ul></li>
<li><p>Scalar 欄位支援</p>
<ul>
<li>BOOL: 布林 (<code translate="no">true</code> 或<code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>varchar: varchar</li>
<li>JSON:<a href="/docs/zh-hant/use-json-fields.md">JSON</a></li>
<li>Array: 陣列<a href="/docs/zh-hant/array_data_type.md">陣列</a></li>
</ul>
<p>JSON 作為一種複合資料類型是可用的。JSON 欄位由鍵值對組成。每個 key 是字串，而值可以是數字、字串、布林值、陣列或列表。如需詳細資訊，請參閱<a href="/docs/zh-hant/use-json-fields.md">JSON：一種新的資料類型</a>。</p></li>
<li><p>向量欄位支援：</p>
<ul>
<li>BINARY_VECTOR: 以 0 和 1 的序列儲存二進位資料，用於影像處理和資訊檢索中的精簡特徵表示。</li>
<li>FLOAT_VECTOR: 儲存 32 位元浮點數，常用於科學計算和機器學習中表示實數。</li>
<li>FLOAT16_VECTOR: 儲存 16 位元半精度浮點數，用於深度學習和 GPU 運算，以提高記憶體和頻寬效率。</li>
<li>BFLOAT16_VECTOR: 儲存 16 位元浮點數，精確度降低，但指數範圍與 Float32 相同，常用於深度學習，可降低記憶體和計算需求，但不會顯著影響精確度。</li>
<li>SPARSE_FLOAT_VECTOR: 儲存非零元素清單及其對應的索引，用於表示稀疏向量。如需詳細資訊，請參閱<a href="/docs/zh-hant/sparse_vector.md">稀疏向量</a>。</li>
</ul>
<p>Milvus 支援集合中的多重向量場。如需詳細資訊，請參閱<a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a>。</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">集合模式<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>集合模式是集合的邏輯定義。通常在定義集合模式和<a href="/docs/zh-hant/manage-collections.md">管理集合</a>之前，您需要先定<a href="#Field-schema">義欄位</a>模式。</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">集合模式屬性</h3><table class="properties">
    <thead>
    <tr>
        <th>屬性</th>
        <th>說明</th>
        <th>註解</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>要建立的集合中的欄位</td>
        <td>必須填寫</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>集合的描述</td>
        <td>資料類型：<br/>可選</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>設計作為分割區金鑰的欄位名稱。</td>
        <td>資料類型：字串：<br/>可選</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>是否啟用動態模式</td>
        <td>資料類型：Boolean (<code translate="no">true</code> 或<code translate="no">false</code>)。<br/>可選，預設為<code translate="no">False</code> 。<br/>關於動態模式的詳細資訊，請參閱動態<a herf="enable-dynamic-field.md">模式</a>和管理集合的使用者指南。</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">建立集合模式</h3><div class="alert note">
  在定義集合模式之前，先定義欄位模式。</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>使用指定的模式建立一個集合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>, connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>您可以使用<code translate="no">shards_num</code> 定義分片號碼。</li>
<li>您可以在<code translate="no">using</code> 中指定別名，以定義要在其上建立集合的 Milvus 伺服器。</li>
<li>如果您需要實作以分割鑰匙為<a href="/docs/zh-hant/multi_tenancy.md">基礎的多租戶</a>，您可以透過在欄位上設定<code translate="no">is_partition_key</code> 至<code translate="no">True</code> 來啟用欄位上的分割鑰匙功能。</li>
<li>如果需要<a href="/docs/zh-hant/enable-dynamic-field.md">啟用動態欄位</a>，您可以透過在集合模式中將<code translate="no">enable_dynamic_field</code> 設定為<code translate="no">True</code> 來啟用<a href="/docs/zh-hant/enable-dynamic-field.md">動態</a>模式。</li>
</ul>
</div>
<p><br/>
您也可以使用<code translate="no">Collection.construct_from_dataframe</code>, 自動從 DataFrame 產生集合模式並建立集合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
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
<li>了解<a href="/docs/zh-hant/manage-collections.md">管理集合</a>時如何準備模式。</li>
<li>閱讀關於<a href="/docs/zh-hant/enable-dynamic-field.md">動態模式的</a>更多資訊。</li>
<li>閱讀更多關於<a href="/docs/zh-hant/multi_tenancy.md">多重租用</a>中的分割鍵。</li>
</ul>
