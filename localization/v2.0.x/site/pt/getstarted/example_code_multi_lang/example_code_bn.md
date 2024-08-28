---
id: example_code_bn.md
---
<h1 id="পাইথন-ব্যবহার-করে-মিলভাস-চালান" class="common-anchor-header">পাইথন ব্যবহার করে মিলভাস চালান<button data-href="#পাইথন-ব্যবহার-করে-মিলভাস-চালান" class="anchor-icon" translate="no">
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
    </button></h1><p>এই টপিকটি বর্ণনা করে কিভাবে পাইথন ব্যবহার করে মিলভাস চালানো যায়।</p>
<h2 id="1-PyMilvus-ইনস্টল-করুন" class="common-anchor-header">1. PyMilvus ইনস্টল করুন<button data-href="#1-PyMilvus-ইনস্টল-করুন" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-Python">pip3 install pymilvus==2.0.x
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
পাইথন 3.6 বা তার পরের ভার্সন প্রয়োজন। দেখুন  <a href="https://wiki.python.org/moin/BeginnersGuide/Download">পাইথন ডাউনলোড করা হচ্ছে
</a> আরও তথ্যের জন্য.
</div>
<h2 id="2-নমুনা-কোড-ডাউনলোড-করুন" class="common-anchor-header">2. নমুনা কোড ডাউনলোড করুন<button data-href="#2-নমুনা-কোড-ডাউনলোড-করুন" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.0.x/examples/hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-নমুনাটি-স্ক্যান-করুন" class="common-anchor-header">3. নমুনাটি স্ক্যান করুন<button data-href="#3-নমুনাটি-স্ক্যান-করুন" class="anchor-icon" translate="no">
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
    </button></h2><p>নমুনা কোডটি নিম্নলিখিত ধাপগুলি সম্পাদন করে।</p>
<ul>
<li>একটি PyMilvus প্যাকেজ আমদানি করে:</li>
</ul>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">Collection</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>একটি সার্ভারের সাথে সংযোগ স্থাপন করে:</li>
</ul>
<pre><code translate="no" class="language-Python">connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&#x27;localhost&#x27;</span>, port=<span class="hljs-string">&#x27;19530&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>একটি কালেকশন তৈরি করে:</li>
</ul>
<pre><code translate="no" class="language-Python">dim = <span class="hljs-number">128</span>
default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;count&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;random_value&quot;</span>, dtype=DataType.DOUBLE),
    FieldSchema(name=<span class="hljs-string">&quot;float_vector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]
default_schema = CollectionSchema(fields=default_fields, description=<span class="hljs-string">&quot;পরীক্ষামূলক সংগ্রহ&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nCreate collection...&quot;</span>)
collection = Collection(name=<span class="hljs-string">&quot;hello_milvus&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>কাল্কেশনে ভেক্টর প্রবেশ করে:</li>
</ul>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">import</span> <span class="hljs-type">random</span>
<span class="hljs-variable">nb</span> <span class="hljs-operator">=</span> <span class="hljs-number">3000</span>
vectors = [[random.random() <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(dim)</span>] <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(nb)</span>]
collection.insert(
    [
        [i <span class="hljs-keyword">for</span> i in <span class="hljs-title function_">range</span><span class="hljs-params">(nb)</span>],
        [<span class="hljs-type">float</span>(random.randrange(-<span class="hljs-number">20</span>,-<span class="hljs-number">10</span>)) <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(nb)</span>],
        vectors
    ]
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>সূচী তৈরি করে এবং কালেকশনটি লোড করে:</li>
</ul>
<pre><code translate="no" class="language-Python">default_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>}
collection.<span class="hljs-title function_">create_index</span>(field_name=<span class="hljs-string">&quot;float_vector&quot;</span>, index_params=default_index)
collection.<span class="hljs-title function_">load</span>()
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>ভেক্টর সাদৃশ্য অনুসন্ধান করে:</li>
</ul>
<pre><code translate="no" class="language-Python">topK = <span class="hljs-number">5</span>
search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}}
<span class="hljs-meta"># <span class="hljs-keyword">define</span> output_fields of search result</span>
res = collection.search(
    vectors[<span class="hljs-number">-2</span>:], <span class="hljs-string">&quot;float_vector&quot;</span>, search_params, topK,
    <span class="hljs-string">&quot;count &gt; 100&quot;</span>, output_fields=[<span class="hljs-string">&quot;count&quot;</span>, <span class="hljs-string">&quot;random_value&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>আইডি এবং দূরত্ব অনুসারে অনুসন্ধান ফলাফলগুলি মুদ্রণ করতে, নিম্নলিখিত কমান্ডটি চালান।</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">for</span> raw_result <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> raw_result:
        <span class="hljs-built_in">id</span> = result.<span class="hljs-built_in">id</span>  <span class="hljs-comment"># result id</span>
        distance = result.distance
        <span class="hljs-built_in">print</span>(<span class="hljs-built_in">id</span>, distance)
<button class="copy-code-btn"></button></code></pre>
<p>আরও তথ্য পেতে <a href="/api-reference/pymilvus/v2.0.x/results.html">API Reference</a> দেখুন।</p>
<ul>
<li>একটি হাইব্রিড অনুসন্ধান করে</li>
</ul>
<div class="alert note">
    নিম্নলিখিত উদাহরণটি <code translate="no">film_id</code> এর সাহায্যে [২,৪,৬,৮] এর পরিসরে এন্টিটিগুলোর উপর আনুমানিক অনুসন্ধান করে
    </div>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random
connections.connect()
schema = CollectionSchema([
    FieldSchema(<span class="hljs-string">&quot;film_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(<span class="hljs-string">&quot;films&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">2</span>)
])
collection = Collection(<span class="hljs-string">&quot;test_collection_search&quot;</span>, schema)
<span class="hljs-comment"># insert</span>
data = [
    [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>)],
    [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>)],
]
collection.insert(data)
collection.num_entities
<span class="hljs-number">10</span>
collection.load()
<span class="hljs-comment"># search</span>
search_param = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;films&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;expr&quot;</span>: <span class="hljs-string">&quot;film_id in [2,4,6,8]&quot;</span>,
}
res = collection.search(**search_param)
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">len</span>(res) == <span class="hljs-number">1</span>
hits = res[<span class="hljs-number">0</span>]
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">len</span>(hits) == <span class="hljs-number">2</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- Total hits: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(hits)}</span>, hits ids: <span class="hljs-subst">{hits.ids}</span> &quot;</span>)
- Total hits: <span class="hljs-number">2</span>, hits ids: [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- Top1 hit id: <span class="hljs-subst">{hits[<span class="hljs-number">0</span>].<span class="hljs-built_in">id</span>}</span>, distance: <span class="hljs-subst">{hits[<span class="hljs-number">0</span>].distance}</span>, score: <span class="hljs-subst">{hits[<span class="hljs-number">0</span>].score}</span> &quot;</span>)
- Top1 hit <span class="hljs-built_in">id</span>: <span class="hljs-number">2</span>, distance: <span class="hljs-number">0.10143111646175385</span>, score: <span class="hljs-number">0.101431116461</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="4-নমুনাটি-রান-করুন" class="common-anchor-header">4. নমুনাটি রান করুন<button data-href="#4-নমুনাটি-রান-করুন" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-Python">$ python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p><em>ফিরে আসা ফলাফল এবং ক্যোয়ারী এর বিলম্ব নিম্নে দেয়া হলো:</em></p>
<div class='result-bock'>
<p>Search...</p>
<p>(distance: 0.0, id: 2998) -20.0</p>
<p>(distance: 13.2614107131958, id: 989) -11.0</p>
<p>(distance: 14.489648818969727, id: 1763) -19.0</p>
<p>(distance: 15.295698165893555, id: 968) -20.0</p>
<p>(distance: 15.34445571899414, id: 2049) -19.0</p>
<p>(distance: 0.0, id: 2999) -12.0</p>
<p>(distance: 14.63361930847168, id: 1259) -13.0</p>
<p>(distance: 15.421361923217773, id: 2530) -15.0</p>
<p>(distance: 15.427900314331055, id: 600) -14.0</p>
<p>(distance: 15.538337707519531, id: 637) -19.0</p>
<p>search latency = 0.0549s</p>
</div>
<p><br/></p>
<p><em>অভিনন্দন! আপনি মিলভাস স্ট্যান্ড-অ্যালোনভাবে শুরু করেছেন এবং আপনার প্রথম ভেক্টর সাদৃশ্য অনুসন্ধান করেছেন।</em></p>
