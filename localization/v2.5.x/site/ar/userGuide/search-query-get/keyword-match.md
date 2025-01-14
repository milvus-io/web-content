---
id: keyword-match.md
summary: >-
  تتيح مطابقة النص في ميلفوس استرجاع المستندات بدقة بناءً على مصطلحات محددة.
  تُستخدم هذه الميزة في المقام الأول للبحث المصفى لاستيفاء شروط محددة ويمكنها
  دمج التصفية القياسية لتنقيح نتائج الاستعلام، مما يسمح بالبحث عن التشابه داخل
  المتجهات التي تستوفي المعايير القياسية.
title: مطابقة النص
---
<h1 id="Text-Match​" class="common-anchor-header">مطابقة النص<button data-href="#Text-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>تتيح مطابقة النص في ميلفوس استرجاع المستندات بدقة بناءً على مصطلحات محددة. تُستخدم هذه الميزة في المقام الأول للبحث المصفى لتلبية شروط محددة ويمكنها دمج التصفية القياسية لتحسين نتائج الاستعلام، مما يسمح بالبحث عن التشابه داخل المتجهات التي تستوفي المعايير القياسية.</p>
<div class="alert note">
<p>تركز المطابقة النصية على العثور على التكرارات الدقيقة لمصطلحات الاستعلام، دون تسجيل مدى ملاءمة المستندات المتطابقة. إذا كنت ترغب في استرداد المستندات الأكثر صلة بناءً على المعنى الدلالي وأهمية مصطلحات الاستعلام، نوصيك باستخدام <a href="/docs/ar/full-text-search.md">البحث في النص الكامل</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يدمج ميلفوس <a href="https://github.com/quickwit-oss/tantivy">برنامج Tantivy</a> لتشغيل فهرسه المقلوب الأساسي والبحث النصي القائم على المصطلحات. لكل إدخال نصي، يقوم ميلفوس بفهرسته باتباع الإجراء.</p>
<ol>
<li><p><a href="/docs/ar/analyzer-overview.md">المحلّل</a>: يقوم المحلل بمعالجة النص المدخل عن طريق ترميزه إلى كلمات فردية أو رموز، ثم تطبيق المرشحات حسب الحاجة. وهذا يسمح لميلفوس ببناء فهرس بناءً على هذه الرموز.</p></li>
<li><p><a href="/docs/ar/index-scalar-fields.md">الفهرسة</a>: بعد تحليل النص، ينشئ Milvus فهرسًا مقلوبًا يقوم بتعيين كل رمز مميز إلى المستندات التي تحتوي عليه.</p></li>
</ol>
<p>عندما يقوم المستخدم بإجراء مطابقة نصية، يتم استخدام الفهرس المقلوب لاسترداد جميع المستندات التي تحتوي على المصطلحات بسرعة. وهذا أسرع بكثير من المسح الضوئي لكل مستند على حدة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/keyword-match.png" alt="Text Match" class="doc-image" id="text-match" />
   </span> <span class="img-wrapper"> <span>مطابقة النص</span> </span></p>
<h2 id="Enable-text-match" class="common-anchor-header">تمكين مطابقة النص<button data-href="#Enable-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>تعمل مطابقة النص على نوع الحقل <code translate="no">VARCHAR</code> ، وهو في الأساس نوع بيانات السلسلة في ملفوس. لتمكين مطابقة النص، قم بتعيين كل من <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code> على <code translate="no">True</code> ثم قم اختياريًا بتكوين محلل لتحليل النص عند تحديد مخطط المجموعة الخاص بك.</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">تعيين <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code></h3><p>لتمكين مطابقة النص لحقل معين <code translate="no">VARCHAR</code> ، قم بتعيين كل من المعلمات <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code> إلى <code translate="no">True</code> عند تحديد مخطط الحقل. هذا يرشد Milvus إلى ترميز النص وإنشاء فهرس مقلوب للحقل المحدد، مما يسمح بمطابقة نصية سريعة وفعالة.</p>
<div class="multipleCode">
   <a href="#python">بيثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">اختياري: تكوين محلل</h3><p>يعتمد أداء ودقة مطابقة النص على المحلل المحدد. المحللات المختلفة مصممة خصيصًا لمختلف اللغات والتراكيب النصية، لذا فإن اختيار المحلل المناسب يمكن أن يؤثر بشكل كبير على نتائج البحث لحالة الاستخدام الخاصة بك.</p>
<p>بشكل افتراضي، يستخدم Milvus محلل <code translate="no">standard</code> ، والذي يقوم بترميز النص استنادًا إلى المسافات البيضاء وعلامات الترقيم، ويزيل الرموز التي يزيد طولها عن 40 حرفًا، ويحول النص إلى أحرف صغيرة. لا حاجة إلى معلمات إضافية لتطبيق هذا الإعداد الافتراضي. لمزيد من المعلومات، راجع <a href="/docs/ar/standard-analyzer.md">Standard</a>.</p>
<p>في الحالات التي تتطلب محللًا مختلفًا، يمكنك تكوين محلل مختلف باستخدام المعلمة <code translate="no">analyzer_params</code>. على سبيل المثال، لتطبيق محلل <code translate="no">english</code> لمعالجة النص الإنجليزي.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;text&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">200</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParams)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    name: <span class="hljs-string">&quot;id&quot;</span>,
    data_type: DataType.Int64,
    is_primary_key: <span class="hljs-literal">true</span>,
  },
  {
    name: <span class="hljs-string">&quot;text&quot;</span>,
    data_type: <span class="hljs-string">&quot;VarChar&quot;</span>,
    enable_analyzer: <span class="hljs-literal">true</span>,
    enable_match: <span class="hljs-literal">true</span>,
    max_length: <span class="hljs-number">1000</span>,
    analyzer_params: { <span class="hljs-keyword">type</span>: <span class="hljs-string">&#x27;english&#x27;</span> },
  },
  {
    name: <span class="hljs-string">&quot;sparse&quot;</span>,
    data_type: DataType.SparseFloatVector,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 200,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>يوفر ميلفوس أيضًا العديد من المحللين الآخرين المناسبين للغات والسيناريوهات المختلفة. لمزيد من التفاصيل، راجع نظرة <a href="/docs/ar/analyzer-overview.md">عامة</a>.</p>
<h2 id="Use-text-match" class="common-anchor-header">استخدام مطابقة النص<button data-href="#Use-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد تمكين مطابقة النص لحقل VARCHAR في مخطط مجموعتك، يمكنك إجراء مطابقات نصية باستخدام التعبير <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">بناء جملة تعبير TEXT_MATCH</h3><p>يُستخدم التعبير <code translate="no">TEXT_MATCH</code> لتحديد الحقل والمصطلحات المراد البحث عنها. وتكون صيغته على النحو التالي.</p>
<pre><code translate="no">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: اسم حقل VARCHAR المطلوب البحث عنه.</p></li>
<li><p><code translate="no">text</code>: المصطلحات المطلوب البحث عنها. يمكن الفصل بين المصطلحات المتعددة بمسافات أو محددات أخرى مناسبة بناءً على اللغة والمحلل المهيأ.</p></li>
</ul>
<p>بشكل افتراضي، يستخدم <code translate="no">TEXT_MATCH</code> منطق المطابقة <strong>OR،</strong> مما يعني أنه سيعيد المستندات التي تحتوي على أي من المصطلحات المحددة. على سبيل المثال، للبحث عن المستندات التي تحتوي على المصطلح <code translate="no">machine</code> أو <code translate="no">deep</code> في الحقل <code translate="no">text</code> ، استخدم التعبير التالي.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا دمج عدة تعبيرات <code translate="no">TEXT_MATCH</code> باستخدام عوامل تشغيل منطقية لإجراء المطابقة <strong>AND</strong>.</p>
<ul>
<li><p>للبحث عن المستندات التي تحتوي على كل من <code translate="no">machine</code> و <code translate="no">deep</code> في الحقل <code translate="no">text</code> ، استخدم التعبير التالي.</p>
<p><div class="multipleCode">
<a href="#python">بايثون </a><a href="#java">جافا</a><a href="#curl">جافا</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>للبحث عن المستندات التي تحتوي على كل من <code translate="no">machine</code> و <code translate="no">learning</code> ولكن بدون <code translate="no">deep</code> في الحقل <code translate="no">text</code> ، استخدم التعبيرات التالية:</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Search-with-text-match​" class="common-anchor-header">البحث باستخدام مطابقة النص</h3><p>يمكن استخدام مطابقة النص مع البحث بالتشابه المتجه لتضييق نطاق البحث وتحسين أداء البحث. من خلال تصفية المجموعة باستخدام مطابقة النص قبل البحث عن التشابه المتجه، يمكنك تقليل عدد المستندات التي تحتاج إلى البحث، مما يؤدي إلى تسريع أوقات الاستعلام.</p>
<p>في هذا المثال، يقوم التعبير <code translate="no">filter</code> بتصفية نتائج البحث لتضمين المستندات التي تطابق المصطلح المحدد فقط <code translate="no">keyword1</code> أو <code translate="no">keyword2</code>. ثم يتم إجراء بحث التشابه المتجه على هذه المجموعة الفرعية المصفاة من المستندات.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector)))
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with `keyword1` or `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

<span class="hljs-comment">// Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.search(
    collection_name: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment">// Your collection name</span>
    anns_field: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    data: [query_vector], <span class="hljs-comment">// Query vector</span>
    filter: filter,
    <span class="hljs-keyword">params</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    limit: <span class="hljs-number">10</span>, <span class="hljs-comment">// Max. number of results to return</span>
    output_fields: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment">//Fields to return</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;annsField&quot;: &quot;my_vector&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;text&quot;,&quot;id&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-text-match​" class="common-anchor-header">الاستعلام مع مطابقة النص</h3><p>يمكن أيضًا استخدام مطابقة النص للتصفية العددية في عمليات الاستعلام. من خلال تحديد تعبير <code translate="no">TEXT_MATCH</code> في المعلمة <code translate="no">expr</code> للطريقة <code translate="no">query()</code> ، يمكنك استرداد المستندات التي تطابق المصطلحات المحددة.</p>
<p>يسترجع المثال أدناه المستندات حيث يحتوي الحقل <code translate="no">text</code> على كل من المصطلحين <code translate="no">keyword1</code> و <code translate="no">keyword2</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with both `keyword1` and `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-attr">filter</span>: filter, 
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">الاعتبارات<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>يؤدي تمكين مطابقة النص لحقل ما إلى إنشاء فهرس مقلوب، مما يستهلك موارد التخزين. ضع في اعتبارك تأثير التخزين عند اتخاذ قرار تمكين هذه الميزة، حيث يختلف بناءً على حجم النص والرموز الفريدة والمحلل المستخدم.</p></li>
<li><p>بمجرد تحديد محلل في المخطط الخاص بك، تصبح إعداداته دائمة لتلك المجموعة. إذا قررت أن محللًا مختلفًا يناسب احتياجاتك بشكل أفضل، يمكنك التفكير في إسقاط المجموعة الحالية وإنشاء مجموعة جديدة بتكوين المحلل المطلوب.</p></li>
<li><p>قواعد الهروب في تعبيرات <code translate="no">filter</code>:</p>
<ul>
<li>يتم تفسير الأحرف المحاطة بعلامات اقتباس مزدوجة أو علامات اقتباس مفردة داخل التعبيرات على أنها ثوابت سلسلة. إذا كان ثابت السلسلة يتضمن أحرف هروب، فيجب تمثيل أحرف الهروب بتسلسل الهروب. على سبيل المثال، استخدم <code translate="no">\\</code> لتمثيل <code translate="no">\</code> و <code translate="no">\\t</code> لتمثيل علامة تبويب <code translate="no">\t</code> و <code translate="no">\\n</code> لتمثيل سطر جديد.</li>
<li>إذا كان ثابت السلسلة محاطًا بعلامات اقتباس مفردة، يجب تمثيل علامة اقتباس مفردة داخل الثابت على أنه <code translate="no">\\'</code> بينما يمكن تمثيل علامة الاقتباس المزدوجة إما <code translate="no">&quot;</code> أو <code translate="no">\\&quot;</code>. مثال: <code translate="no">'It\\'s milvus'</code>.</li>
<li>إذا كان ثابت السلسلة محاطًا بعلامات اقتباس مزدوجة، فيجب تمثيل علامة اقتباس مزدوجة داخل الثابت على أنه <code translate="no">\\&quot;</code> بينما يمكن تمثيل علامة الاقتباس المفردة إما <code translate="no">'</code> أو <code translate="no">\\'</code>. مثال: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</li>
</ul></li>
</ul>
