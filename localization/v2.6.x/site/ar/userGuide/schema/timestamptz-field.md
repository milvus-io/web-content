---
id: timestamptz-field.md
title: حقل TIMESTAMPTZCompatible with Milvus 2.6.6+
summary: >-
  تحتاج التطبيقات التي تتعقب الوقت عبر المناطق، مثل أنظمة التجارة الإلكترونية أو
  أدوات التعاون أو التسجيل الموزع، إلى معالجة دقيقة للطوابع الزمنية مع المناطق
  الزمنية. يوفر نوع بيانات TIMESTAMPTZ في Milvus هذه الإمكانية من خلال تخزين
  الطوابع الزمنية مع المنطقة الزمنية المرتبطة بها.
beta: Milvus 2.6.6+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">حقل TIMESTAMPTZ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.6+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>تحتاج التطبيقات التي تتعقب الوقت عبر المناطق، مثل أنظمة التجارة الإلكترونية أو أدوات التعاون أو التسجيل الموزع، إلى معالجة دقيقة للطوابع الزمنية مع المناطق الزمنية. يوفر نوع البيانات <code translate="no">TIMESTAMPTZ</code> في Milvus هذه الإمكانية من خلال تخزين الطوابع الزمنية مع المنطقة الزمنية المرتبطة بها.</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">ما هو حقل TIMESTAMPTZ؟<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p>الحقل <code translate="no">TIMESTAMPTZ</code> هو نوع بيانات معرّف من قبل المخطط (<code translate="no">DataType.TIMESTAMPTZ</code>) في Milvus يعالج المدخلات المدخلة مع المناطق الزمنية ويخزن جميع النقاط الزمنية داخلياً كتوقيت مطلق بالتوقيت العالمي المنسق UTC:</p>
<ul>
<li><p><strong>تنسيق الإدخال المقبول</strong>: سلاسل <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> مع إزاحة المنطقة الزمنية (على سبيل المثال، <code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> يشير إلى 11:59:59 مساءً في 1 مايو 2025 (UTC+08:00)).</p></li>
<li><p><strong>التخزين الداخلي</strong>: يتم تطبيع جميع القيم <code translate="no">TIMESTAMPTZ</code> وتخزينها بالتوقيت <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">العالمي المنسق</a> (UTC).</p></li>
<li><p><strong>المقارنة والتصفية</strong>: يتم تنفيذ جميع عمليات التصفية والترتيب بالتوقيت العالمي المنسق، مما يضمن نتائج متسقة ويمكن التنبؤ بها عبر المناطق الزمنية المختلفة.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>يمكنك تعيين <code translate="no">nullable=True</code> لحقول <code translate="no">TIMESTAMPTZ</code> للسماح بالقيم المفقودة.</p></li>
<li><p>يمكنك تحديد قيمة الطابع الزمني الافتراضي باستخدام السمة <code translate="no">default_value</code> بتنسيق <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>.</p></li>
</ul>
<p>انظر <a href="/docs/ar/nullable-and-default.md">لاغية وافتراضية</a> للحصول على التفاصيل.</p>
</div>
<h2 id="Basic-operations" class="common-anchor-header">العمليات الأساسية<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>يعكس سير العمل الأساسي لاستخدام حقل <code translate="no">TIMESTAMPTZ</code> الحقول القياسية الأخرى في ميلفوس: تعريف الحقل ← إدراج البيانات ← الاستعلام/التصفية.</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">الخطوة 1: تحديد حقل TIMESTAMPTZ<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p>لاستخدام حقل <code translate="no">TIMESTAMPTZ</code> ، قم بتعريفه صراحةً في مخطط مجموعتك عند إنشاء المجموعة. يوضح المثال التالي كيفية إنشاء مجموعة بحقل <code translate="no">tsz</code> من النوع <code translate="no">DataType.TIMESTAMPTZ</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
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
<h3 id="Step-2-Insert-data" class="common-anchor-header">الخطوة 2: إدراج البيانات<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>أدخل الكيانات التي تحتوي على سلاسل ISO 8601 مع إزاحات المنطقة الزمنية.</p>
<p>يُدرج المثال أدناه 8,193 صفًا من بيانات العينة في المجموعة. كل صف يتضمن</p>
<ul>
<li><p>معرّف فريد</p></li>
<li><p>طابع زمني مدرك للمنطقة الزمنية (توقيت شنغهاي)</p></li>
<li><p>متجه بسيط رباعي الأبعاد</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
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
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">الخطوة 3: عمليات التصفية<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> يدعم المقارنات القياسية، وحساب الفترات الزمنية، واستخراج مكونات الوقت.</p>
<p>قبل أن تتمكن من إجراء عمليات تصفية على حقول <code translate="no">TIMESTAMPTZ</code> ، تأكد من</p>
<ul>
<li><p>قمت بإنشاء فهرس على كل حقل متجه.</p></li>
<li><p>تم تحميل المجموعة في الذاكرة.</p></li>
</ul>
<p><details></p>
<p><summary>عرض مثال على الكود</summary></p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">استعلام مع تصفية الطابع الزمني</h4><p>استخدم المشغلات الحسابية مثل <code translate="no">==</code> ، <code translate="no">!=</code> ، ، <code translate="no">&lt;</code> ، <code translate="no">&gt;</code> ، <code translate="no">&lt;=</code> ، <code translate="no">&gt;=</code>. للحصول على قائمة كاملة بالمشغلات الحسابية المتوفرة في ميلفوس، راجع <a href="/docs/ar/basic-operators.md#Arithmetic-Operators">المشغلات الحسابية</a>.</p>
<p>يقوم المثال أدناه بتصفية الكيانات ذات الطوابع الزمنية (<code translate="no">tsz</code>) التي لا تساوي <strong>2025-01-03T00:00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name=collection_name,
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
<p>في المثال أعلاه</p>
<ul>
<li><p><code translate="no">tsz</code> هو اسم الحقل <code translate="no">TIMESTAMPTZ</code> المحدد في المخطط.</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> هو الطابع الزمني الحرفي بتنسيق <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601،</a> بما في ذلك إزاحة المنطقة الزمنية.</p></li>
<li><p><code translate="no">!=</code> يقارن قيمة الحقل مع تلك الحرفية. تشمل العمليات المدعومة الأخرى <code translate="no">==</code> و <code translate="no">&lt;</code> و <code translate="no">&lt;=</code> و <code translate="no">&gt;</code> و <code translate="no">&gt;=</code>.</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">عمليات الفاصل الزمني</h4><p>يمكنك إجراء عمليات حسابية على حقول <code translate="no">TIMESTAMPTZ</code> باستخدام قيم <strong>InterVAL</strong> <a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">بتنسيق المدة الزمنية ISO 8601</a>. يتيح لك ذلك إضافة أو طرح مدد، مثل الأيام أو الساعات أو الدقائق، من الطابع الزمني عند تصفية البيانات.</p>
<p>على سبيل المثال، يقوم الاستعلام التالي بتصفية الكيانات التي <strong>لا يساوي</strong> الطابع الزمني (<code translate="no">tsz</code>) زائد صفر يوم <strong>2025-01-03T00:00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<p><code translate="no">INTERVAL</code> تتبع القيم <a href="https://www.w3.org/TR/xmlschema-2/#duration">بناء جملة المدة ISO 8601</a>. على سبيل المثال</p>
<ul>
<li><p><code translate="no">P1D</code> → 1 يوم</p></li>
<li><p><code translate="no">PT3H</code> → 3 ساعات</p></li>
<li><p><code translate="no">P2DT6H</code> → 2 يوم و6 ساعات</p></li>
</ul>
<p>يمكنك استخدام <code translate="no">INTERVAL</code> الحساب مباشرةً في تعبيرات التصفية، مثل:</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → يضيف 3 أيام</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → يطرح 2 ساعة</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">البحث باستخدام تصفية الطابع الزمني</h4><p>يمكنك الجمع بين التصفية <code translate="no">TIMESTAMPTZ</code> مع البحث عن التشابه المتجه لتضييق النتائج حسب الوقت والتشابه.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<p>إذا كانت مجموعتك تحتوي على حقلي متجهين أو أكثر، يمكنك إجراء عمليات بحث مختلطة مع تصفية الطابع الزمني. لمزيد من التفاصيل، راجع <a href="/docs/ar/multi-vector-search.md">البحث المختلط متعدد المتجهات</a>.</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">الاستخدام المتقدم<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>للاستخدام المتقدم، يمكنك إدارة المناطق الزمنية على مستويات مختلفة (مثل قاعدة البيانات أو المجموعة أو الاستعلام) أو تسريع الاستعلامات على <code translate="no">TIMESTAMPTZ</code> الحقول باستخدام الفهارس.</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">إدارة المناطق الزمنية على مستويات مختلفة<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك التحكم في المنطقة الزمنية لحقول <code translate="no">TIMESTAMPTZ</code> على مستوى <strong>قاعدة البيانات</strong> أو <strong>المجموعة</strong> أو <strong>الاستعلام/البحث</strong>.</p>
<table>
   <tr>
     <th><p>المستوى</p></th>
     <th><p>المعلمة</p></th>
     <th><p>النطاق</p></th>
     <th><p>الأولوية</p></th>
   </tr>
   <tr>
     <td><p>قاعدة البيانات</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>افتراضي لجميع المجموعات في قاعدة البيانات</p></td>
     <td><p>الأقل</p></td>
   </tr>
   <tr>
     <td><p>مجموعة</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>تجاوز إعداد المنطقة الزمنية الافتراضية لقاعدة البيانات لتلك المجموعة</p></td>
     <td><p>متوسط</p></td>
   </tr>
   <tr>
     <td><p>استعلام/بحث/بحث مختلط</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>تجاوزات مؤقتة لعملية واحدة محددة</p></td>
     <td><p>أعلى</p></td>
   </tr>
</table>
<p>للاطلاع على التعليمات خطوة بخطوة ونماذج التعليمات البرمجية، راجع الصفحات المخصصة:</p>
<ul>
<li><p><a href="/docs/ar/modify-collection.md#Example-6-Set-collection-time-zone">تعديل المجموعة</a></p></li>
<li><p><a href="/docs/ar/manage_databases.md#Manage-database-properties">قاعدة البيانات</a></p></li>
<li><p><a href="/docs/ar/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">الاستعلام</a></p></li>
<li><p><a href="/docs/ar/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">البحث المتجه الأساسي</a></p></li>
<li><p><a href="/docs/ar/multi-vector-search.md">البحث الهجين متعدد المتجهات</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">تسريع الاستعلامات<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>بشكل افتراضي، ستؤدي الاستعلامات على حقول <code translate="no">TIMESTAMPTZ</code> بدون فهرس إلى إجراء مسح كامل لجميع الصفوف، الأمر الذي قد يكون بطيئًا على مجموعات البيانات الكبيرة. لتسريع استعلامات الطابع الزمني، قم بإنشاء فهرس <code translate="no">STL_SORT</code> على الحقل <code translate="no">TIMESTAMPTZ</code>.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/stl-sort.md">STL_SORT</a>.</p>
