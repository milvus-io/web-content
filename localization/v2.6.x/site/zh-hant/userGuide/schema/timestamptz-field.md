---
id: timestamptz-field.md
title: TIMESTAMPTZ 領域Compatible with Milvus 2.6.4+
summary: >-
  跨區域追蹤時間的應用程式，例如電子商務系統、協作工具或分散式日誌，需要精確地處理帶有時區的時間戳。Milvus 中的 TIMESTAMPTZ
  資料類型透過儲存帶有相關時區的時間戳來提供此功能。
beta: Milvus 2.6.4+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">TIMESTAMPTZ 領域<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>跨區域追蹤時間的應用程式，例如電子商務系統、協作工具或分散式日誌，需要精確處理帶有時區的時間戳。Milvus 中的<code translate="no">TIMESTAMPTZ</code> 資料類型透過儲存帶有相關時區的時間戳來提供此功能。</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">什麼是 TIMESTAMPTZ 欄位？<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TIMESTAMPTZ</code> 欄位是 Milvus 中一個模式定義的資料類型 (<code translate="no">DataType.TIMESTAMPTZ</code>)，用來儲存具有明確時區的時間戳記：</p>
<ul>
<li><p><strong>接受的輸入格式</strong>：帶有時區偏移的<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>字串（例如，<code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> 表示 UTC+08:00 中的 11:59:59）。</p></li>
<li><p><strong>內部儲存</strong>：所有<code translate="no">TIMESTAMPTZ</code> 值均以統<a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">一時間 (Coordinated Universal Time</a>, UTC) 標準化和儲存。</p></li>
<li><p><strong>比較與篩選</strong>：所有篩選和排序作業都以 UTC 執行，確保不同時區的結果一致且可預測。</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>您可以為<code translate="no">TIMESTAMPTZ</code> 欄位設定<code translate="no">nullable=True</code> ，以允許缺失值。</p></li>
<li><p>您可以使用<code translate="no">default_value</code> 屬性以<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>格式指定預設時間戳值。</p></li>
</ul>
<p>詳情請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable &amp; Default</a>。</p>
</div>
<h2 id="Basic-operations" class="common-anchor-header">基本操作<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<code translate="no">TIMESTAMPTZ</code> 欄位的基本工作流程與 Milvus 中的其他標量欄位相同：定義欄位 → 插入資料 → 查詢/篩選。</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">步驟 1：定義 TIMESTAMPTZ 欄位<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用<code translate="no">TIMESTAMPTZ</code> 欄位，請在建立集合時，在集合模式中明確定義。以下範例示範如何建立一個具有<code translate="no">tsz</code> 欄位類型<code translate="no">DataType.TIMESTAMPTZ</code> 的集合。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">import</span> pytz

server_address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>

client = MilvusClient(uri=server_address)

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema()
<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;tsz&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
<span class="hljs-comment"># Add a vector field</span>
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; with a TimestampTz field created successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data" class="common-anchor-header">步驟 2：插入資料<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>插入包含 ISO 8601 字串與時區偏移的實體。</p>
<p>下面的範例會插入 8,193 行樣本資料到集合中。每一行包括</p>
<ul>
<li><p>一個唯一的 ID</p></li>
<li><p>感知時區的時間戳 (上海時間)</p></li>
<li><p>一個簡單的 4 維向量</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data_size = <span class="hljs-number">8193</span>

<span class="hljs-comment"># Get the Asia/Shanghai time zone using the pytz library</span>
<span class="hljs-comment"># You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">#   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment"># To view all available values:</span>
<span class="hljs-comment">#   import pytz; print(pytz.all_timezones)</span>
<span class="hljs-comment"># Reference:</span>
<span class="hljs-comment">#   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">#   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
shanghai_tz = pytz.timezone(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)

data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;tsz&quot;</span>: shanghai_tz.localize(
            datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) + datetime.timedelta(days=i)
        ).isoformat(),
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-built_in">float</span>(i) / <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>)],
    }
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(data_size)
]

client.insert(collection_name, data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">步驟 3：篩選操作<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code>...支援標量比較、區間運算和提取時間元件。</p>
<p>在對<code translate="no">TIMESTAMPTZ</code> 欄位執行篩選操作之前，請確定</p>
<ul>
<li><p>您已為每個向量欄位建立索引。</p></li>
<li><p>集合已載入記憶體。</p></li>
</ul>
<p><details></p>
<p><summary>顯示範例程式碼</summary></p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index on vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vec&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vec_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

<span class="hljs-comment"># Load the collection</span>
client.load_collection(collection_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; loaded successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">使用時間戳過濾查詢</h4><p>使用算術運算符如<code translate="no">==</code>,<code translate="no">!=</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;</code>,<code translate="no">&lt;=</code>,<code translate="no">&gt;=</code> 。如需 Milvus 中可用的算術運算符的完整清單，請參閱<a href="/docs/zh-hant/basic-operators.md#Arithmetic-Operators">算術運算符</a>。</p>
<p>以下範例過濾時間戳 (<code translate="no">tsz</code>) 不等於<strong>2025-01-03T00:00:00+08:00</strong> 的實體：</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name=collection_name,
    filter=<span class="hljs-built_in">expr</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-built_in">limit</span>=10
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>在上面的範例中</p>
<ul>
<li><p><code translate="no">tsz</code> 是模式中定義的<code translate="no">TIMESTAMPTZ</code> 欄位名稱。</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> 是<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>格式的時間戳文字，包括時區偏移。</p></li>
<li><p><code translate="no">!=</code> 將字段值與字面意義比較。其他支援的操作符包括<code translate="no">==</code>,<code translate="no">&lt;</code>,<code translate="no">&lt;=</code>,<code translate="no">&gt;</code>, 和<code translate="no">&gt;=</code> 。</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">間隔運算</h4><p>您可以使用<a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">ISO 8601 長度格式</a>中的<strong>INTERVAL</strong>值對<code translate="no">TIMESTAMPTZ</code> 欄位執行算術運算。這可讓您在篩選資料時，從時間戳記中加入或減去持續時間，例如天、小時或分鐘。</p>
<p>例如，以下查詢會篩選時間戳記 (<code translate="no">tsz</code>) 加上零天<strong>不等</strong>於<strong>2025-01-03T00:00:00+08:00</strong> 的實體：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name, 
    <span class="hljs-built_in">filter</span>=expr, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>], 
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">INTERVAL</code> 值遵循<a href="https://www.w3.org/TR/xmlschema-2/#duration">ISO 8601 期限語法</a>。例如</p>
<ul>
<li><p><code translate="no">P1D</code> → 1 天</p></li>
<li><p><code translate="no">PT3H</code> → 3 小時</p></li>
<li><p><code translate="no">P2DT6H</code> → 2 天 6 小時</p></li>
</ul>
<p>您可以在篩選表達式中直接使用<code translate="no">INTERVAL</code> 算術，例如</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → 增加 3 天</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → 減去 2 小時</p></li>
</ul>
</div>
<h4 id="Extract-timestamp-elements" class="common-anchor-header">擷取時間戳記元件</h4><p>您可以在查詢或搜尋中使用<code translate="no">time_fields</code> 參數，從<code translate="no">TIMESTAMPTZ</code> 欄位中抽取特定元件，例如年、月或日。</p>
<p>以下範例會從查詢結果中的每個<code translate="no">TIMESTAMPTZ</code> 欄位抽取<code translate="no">year</code> 、<code translate="no">month</code> 及<code translate="no">day</code> 元件：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">results = client.query(
    collection_name,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &lt;= 10&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
<span class="highlighted-wrapper-line">    time_fields=<span class="hljs-string">&quot;year, month, day&quot;</span>,</span>
    limit=<span class="hljs-number">2</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: [2024, 12, 31]}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: [2025, 1, 1]}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>支援抽取的元素</strong></p>
<table>
   <tr>
     <th><p>元素</p></th>
     <th><p>說明</p></th>
     <th><p>輸出範例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">year</code></p></td>
     <td><p>年份元件</p></td>
     <td><p><code translate="no">2025</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">month</code></p></td>
     <td><p>月份編號</p></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">day</code></p></td>
     <td><p>月日</p></td>
     <td><p><code translate="no">3</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hour</code></p></td>
     <td><p>小時 (0-23)</p></td>
     <td><p><code translate="no">14</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">minute</code></p></td>
     <td><p>分鐘</p></td>
     <td><p><code translate="no">30</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">second</code></p></td>
     <td><p>秒</p></td>
     <td><p><code translate="no">5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">microsecond</code></p></td>
     <td><p>微秒</p></td>
     <td><p><code translate="no">123456</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>參數<code translate="no">time_fields</code> 是以逗號分隔的字串 (例如<code translate="no">&quot;year, month, day&quot;</code>)。</p></li>
<li><p>結果會以擷取元件的陣列形式傳回 (例如：<code translate="no">[2024, 12, 31]</code>)。</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">使用時間戳過濾搜尋</h4><p>您可以結合<code translate="no">TIMESTAMPTZ</code> 過濾與向量相似性搜尋，以時間與相似性來縮窄搜尋結果。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define a time-based filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>

res = client.search(
    collection_name=collection_name,             <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],                  <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                                      <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                                <span class="hljs-comment"># Filter expression using TIMESTAMPTZ</span></span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],  <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Search result:  data: [[{&#x27;id&#x27;: 10, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;, &#x27;id&#x27;: 10}}, {&#x27;id&#x27;: 9, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;, &#x27;id&#x27;: 9}}, {&#x27;id&#x27;: 8, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;, &#x27;id&#x27;: 8}}, {&#x27;id&#x27;: 7, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;, &#x27;id&#x27;: 7}}, {&#x27;id&#x27;: 6, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;, &#x27;id&#x27;: 6}}]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您的集合有兩個或更多向量欄位，您可以使用時間戳過濾執行混合搜尋作業。如需詳細資訊，請參閱<a href="/docs/zh-hant/multi-vector-search.md">多向量混合搜尋</a>。</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">進階用法<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>對於進階用法，您可以在不同層級 (例如資料庫、集合或查詢) 管理時區，或使用索引加速對<code translate="no">TIMESTAMPTZ</code> 欄位的查詢。</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">管理不同層級的時區<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以在<strong>資料庫</strong>、<strong>資料集</strong>或<strong>查詢/搜尋層級</strong>控制<code translate="no">TIMESTAMPTZ</code> 欄位的時區。</p>
<table>
   <tr>
     <th><p>層級</p></th>
     <th><p>參數</p></th>
     <th><p>範圍</p></th>
     <th><p>優先順序</p></th>
   </tr>
   <tr>
     <td><p>資料庫</p></td>
     <td><p><code translate="no">database.timezone</code></p></td>
     <td><p>資料庫中所有收藏集的預設值</p></td>
     <td><p>最低</p></td>
   </tr>
   <tr>
     <td><p>收藏集</p></td>
     <td><p><code translate="no">collection.timezone</code></p></td>
     <td><p>覆寫該收藏集的資料庫預設時區設定</p></td>
     <td><p>中</p></td>
   </tr>
   <tr>
     <td><p>查詢/搜尋/混合搜尋</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>針對一個特定作業的臨時覆寫</p></td>
     <td><p>最高</p></td>
   </tr>
</table>
<p>如需逐步說明和程式碼範例，請參閱專用頁面：</p>
<ul>
<li><p><a href="/docs/zh-hant/modify-collection.md#Example-6-Set-collection-time-zone">修改集合</a></p></li>
<li><p><a href="/docs/zh-hant/manage_databases.md#Manage-database-properties">資料庫</a></p></li>
<li><p><a href="/docs/zh-hant/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">查詢</a></p></li>
<li><p><a href="/docs/zh-hant/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">基本向量搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/multi-vector-search.md">多向量混合搜尋</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">加速查詢<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>預設情況下，在沒有索引的<code translate="no">TIMESTAMPTZ</code> 欄位上進行查詢時，會對所有行執行完整掃描，這在大型資料集上可能會很慢。若要加速時間戳查詢，請在<code translate="no">TIMESTAMPTZ</code> 欄位上建立<code translate="no">STL_SORT</code> 索引。</p>
<p>詳情請參閱<a href="https://zilliverse.feishu.cn/wiki/YBYmwvx68iMKFRknytJccwk0nPf">STL_SORT</a>。</p>
