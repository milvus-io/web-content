---
id: text.md
title: حقل النصCompatible with Milvus 3.0.x
summary: >-
  TEXT هو نوع حقل قياسي يُستخدم لتخزين نصوص المستندات والمقاطع والمحتويات النصية
  الطويلة الأخرى في Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">حقل النص<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>في تطبيقات البحث القائمة على الذكاء الاصطناعي، يساعدك البحث المتجهي في العثور على كيانات متشابهة من الناحية الدلالية، لكن التطبيق غالبًا ما يحتاج أيضًا إلى النص الأصلي وراء كل نتيجة مطابقة. يمكن لنموذج اللغة الكبير (LLM) أو الوكيل استخدام هذا النص كسياق للقراءة أو الاقتباس أو التلخيص أو تضمين النتيجة في موجه.</p>
<p>يوفر Milvus نوع الحقل القياسي « <code translate="no">TEXT</code> » لتخزين النص المصدر الطويل مباشرةً مع الكيانات. وتشمل القيم النموذجية مقاطع نصية، ووثائق طويلة، ونصوص مقالات، وتذاكر، وسجلات. وعلى عكس « <code translate="no">VARCHAR</code> » الذي يتطلب « <code translate="no">max_length</code> » ثابتًا، لا يتطلب « <code translate="no">TEXT</code> » تعيين الحد الأقصى لطول البايت في مخطط المجموعة.</p>
<p>لتعريف حقل <code translate="no">TEXT</code> ، اضبط <code translate="no">datatype</code> على <code translate="no">DataType.TEXT</code>.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>بعد تعريف الحقل، يمكن لكل كيان تضمين قيمة سلسلة في هذا الحقل. يمكنك إدراج قيم " <code translate="no">TEXT</code> " مثل الحقول القياسية الأخرى واسترجاعها من نتائج الاستعلام أو البحث عن طريق إدراج الحقل في " <code translate="no">output_fields</code>".</p>
<div class="alert note">
<p><code translate="no">TEXT</code> تدعم الحقول القيم الفارغة. لتمكين هذه الميزة، قم بتعيين <code translate="no">nullable</code> إلى <code translate="no">True</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/nullable-and-default.md">«الحقل القابل للفراغ</a>».</p>
</div>
<h2 id="Limits" class="common-anchor-header">القيود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>لا يمكن أن يكون حقل « <code translate="no">TEXT</code> » حقلًا أساسيًا. تدعم الحقول الأساسية « <code translate="no">INT64</code> » و« <code translate="no">VARCHAR</code> ».</li>
<li>في Milvus 3.0.0، لا تدعم الحقول من نوع « <code translate="no">TEXT</code> » <code translate="no">PHRASE_MATCH</code>.</li>
<li>في Milvus 3.0.0، لا تدعم الحقول <code translate="no">TEXT</code> القيم الافتراضية.</li>
<li>في Milvus 3.0.0، لا يتم دعم حقول <code translate="no">TEXT</code> في المجموعات الخارجية.</li>
<li>في Milvus 3.0.0، لا تدعم حقول <code translate="no">TEXT</code> الفهارس القياسية.</li>
<li><code translate="no">TEXT</code> لا يُقصد به تصفية البيانات الوصفية العادية. إذا كنت بحاجة إلى التصفية بناءً على بيانات وصفية ذات سلاسل قصيرة وكانت قيمة الحقل تتناسب مع حد طول <code translate="no">VARCHAR</code> ، فاستخدم <code translate="no">VARCHAR</code>.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">اختر TEXT أو VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> و <code translate="no">VARCHAR</code> كلاهما يخزنان قيمًا نصية، لكنهما يدعمان احتياجات تطبيقات مختلفة. استخدم <code translate="no">VARCHAR</code> للبيانات الوصفية القصيرة والمحدودة التي تحدد الكيانات أو تصنفها أو ترشحها. استخدم <code translate="no">TEXT</code> للمحتوى المصدر الأطول الذي يوفر لنموذج اللغة الكبير (LLM) أو الوكيل سياقًا كافيًا للقراءة أو الاقتباس أو التلخيص أو إنشاء موجه.</p>
<table>
<thead>
<tr><th>الجانب</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>الأفضل لـ</td><td>البيانات الوصفية القصيرة المستخدمة لتحديد الكيانات أو تصنيفها أو تصفيتها، مثل <code translate="no">title</code> أو <code translate="no">tag</code> أو <code translate="no">category</code> أو <code translate="no">external_id</code>.</td><td>محتوى مصدر أطول تستخدمه نماذج اللغة الكبيرة (LLM) أو سير عمل الوكلاء، مثل <code translate="no">content</code> أو <code translate="no">passage</code> أو <code translate="no">article_body</code> أو <code translate="no">log_message</code>.</td></tr>
<tr><td>إعداد الطول</td><td>يتطلب <code translate="no">max_length</code> ، الذي يحدد الحد الأقصى لعدد البايتات التي يمكن للحقل تخزينها. القيمة القصوى هي <code translate="no">65,535</code> بايت. إذا كانت القيمة قد تتجاوز هذا الحد، فاستخدم <code translate="no">TEXT</code>.</td><td>لا يتطلب <code translate="no">max_length</code> ، لذا لا يحتاج المخطط إلى حد ثابت للبايتات لقيمة النص.</td></tr>
<tr><td>سلوك التخزين</td><td>يخزن كل قيمة ضمن نطاق التخزين المحدد ( <code translate="no">max_length</code>) للحقل.</td><td>يستخدم الاختيار التلقائي للتخزين للقيم النصية الأكبر حجمًا. لمزيد من التفاصيل، راجع <a href="#how-milvus-stores-large-text-values">كيفية تخزين Milvus للقيم النصية الكبيرة</a>.</td></tr>
<tr><td>دعم الحقل الأساسي</td><td>يمكن استخدامه كحقل أساسي.</td><td>لا يمكن استخدامه كحقل أساسي.</td></tr>
<tr><td>التصفية</td><td>يُستخدم للبيانات الوصفية ذات السلاسل القصيرة التي يجب أن تظهر في تعبيرات التصفية، مثل <code translate="no">category == &quot;news&quot;</code> أو <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>غير مخصص لتصفية البيانات الوصفية العادية.</td></tr>
</tbody>
</table>
<p>للحصول على تفاصيل حول حقول <code translate="no">VARCHAR</code> ، راجع <a href="/docs/ar/string.md">حقل VarChar</a>.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">كيف يخزن Milvus قيم TEXT الكبيرة<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>قم بالتوسيع لمعرفة كيفية عملها</summary></p>
<p>عند إدراج كيان، فإن السلسلة التي تقدمها لحقل <code translate="no">TEXT</code> هي قيمة <code translate="no">TEXT</code>. يقارن Milvus حجم تلك القيمة بـ <a href="/docs/ar/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold،</a> الذي يبلغ <code translate="no">65,536</code> بايت افتراضيًا، ثم يختار أحد مساري التخزين الداخليين.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>تخزين النصوص الكبيرة</span>
  
 </span></p>
<ul>
<li><strong>التخزين المضمن</strong>: إذا كانت قيمة <code translate="no">TEXT</code> أصغر من <code translate="no">dataNode.text.inlineThreshold</code> ، يقوم Milvus بتخزين قيمة النص الأصلية مباشرةً في بيانات حقل <code translate="no">TEXT</code>.</li>
<li><strong>تخزين LOB</strong>: إذا كانت قيمة <code translate="no">TEXT</code> أكبر من أو تساوي <code translate="no">dataNode.text.inlineThreshold</code> ، فإن Milvus تعامل القيمة ككائن كبير وتخزن النص الأصلي بشكل منفصل في تخزين الكائنات، مثل MinIO. تخزن بيانات حقل <code translate="no">TEXT</code> مرجعًا داخليًا للنص المخزن بشكل منفصل. عند طلب حقل <code translate="no">TEXT</code> في نتائج الاستعلام أو البحث، يستخدم Milvus المرجع لاسترداد النص الأصلي وإرجاعه.</li>
</ul>
<p>يُعد اختيار التخزين هذا داخليًّا. يمكنك إدراج حقل <code translate="no">TEXT</code> والاستعلام عنه والبحث فيه بنفس الطريقة بغض النظر عن مسار التخزين الذي يستخدمه Milvus. لضبط العتبة أو سلوك التخزين والضغط وإزالة البيانات غير الضرورية ذات الصلة، راجع <a href="/docs/ar/configure_datanode.md">التكوينات المتعلقة بـ dataNode</a> <a href="/docs/ar/configure_datacoord.md">والتكوينات المتعلقة بـ dataCoord</a>.</p>
<p>إذا كان النشر الخاص بك يستخدم تخزين الكائنات، فقد تظهر قيم <code translate="no">TEXT</code> الكبيرة ككائنات تديرها Milvus ضمن مسارات مثل <code translate="no">lobs/...</code>. هذه الكائنات هي تفاصيل تنفيذية ولا يجب نقلها أو نسخها أو حذفها يدويًّا. بعد حذف الكيانات أو إزالة الأقسام أو ضغط البيانات، قد ينخفض استخدام تخزين الكائنات فقط بعد أن تقوم عملية جمع القمامة في Milvus بإزالة بيانات الكائنات الكبيرة غير المشار إليها بعد انتهاء فترة الأمان الخاصة بها.</p>
<p></details></p>
<p>يُعد البحث عن النص الكامل باستخدام BM25 أحد الاستخدامات الشائعة لـ <code translate="no">TEXT</code>. في هذا النمط، يخزن الحقل <code translate="no">TEXT</code> المحتوى الأصلي للمصدر، ويقوم BM25 بتحليل النص وإنشاء متجهات متفرقة لترتيب التطابقات المستندة إلى الكلمات الرئيسية. يمكن لنتائج البحث بعد ذلك إرجاع قيمة <code translate="no">TEXT</code> المطابقة كسياق لسير عمل LLM أو الوكيل. يوضح المثال التالي كيفية استخدام حقل « <code translate="no">TEXT</code> » كحقل إدخال لـ BM25. لمعرفة المزيد عن مفاهيم البحث عن النص الكامل وخيارات الاستعلام، راجع <a href="/docs/ar/full-text-search.md">«البحث عن النص الكامل</a>».</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">الخطوة 1: إنشاء مجموعة تحتوي على حقل TEXT<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنشئ المثال التالي مجموعة تحتوي على حقل <code translate="no">TEXT</code> للمحتوى المصدر وحقل متجه متفرق للمتجهات المتفرقة التي تم إنشاؤها بواسطة BM25. تقوم دالة BM25 بتحويل النص المُقسَّم إلى رموز من <code translate="no">content</code> إلى متجهات متفرقة مخزنة في <code translate="no">sparse</code>.</p>
<p>لإجراء بحث النص الكامل باستخدام BM25، يجب تعيين حقل <code translate="no">TEXT</code> المدخل على <code translate="no">enable_analyzer=True</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">الخطوة 2: إنشاء فهرس للمتجهات المتفرقة<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء فهرس على حقل المتجهات المتفرقة الذي تم إنشاؤه بواسطة دالة BM25. يجب تعيين نوع المقياس إلى <code translate="no">BM25</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">الخطوة 3: إدراج بيانات النص<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>أدخل النص مباشرةً في حقل « <code translate="no">TEXT</code> ». لا تقم بتوفير قيم لحقل « <code translate="no">sparse</code> ». يقوم Milvus بإنشاء المتجهات المتفرقة داخليًّا من خلال تطبيق دالة BM25 على « <code translate="no">content</code> ».</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">الخطوة 4: إجراء بحث النص الكامل باستخدام BM25<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم نص الاستعلام الخام كبيانات بحث وقم بالبحث في حقل المتجهات المتفرقة. يقوم Milvus بتحويل نص الاستعلام إلى متجه متفرق، وترتيب النتائج المطابقة باستخدام BM25، وإرجاع حقل <code translate="no">TEXT</code> المطلوب في <code translate="no">output_fields</code>.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">الخطوة 5: قراءة قيم TEXT التي تم إرجاعها<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>تتضمن كل نتيجة بحث درجة BM25 والقيمة الأصلية لـ <code translate="no">TEXT</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول وظائف BM25، وفهارس المتجهات المتفرقة، وصيغة الاستعلام للبحث عن النص الكامل، راجع <a href="/docs/ar/full-text-search.md">«البحث</a> عن <a href="/docs/ar/full-text-search.md">النص الكامل</a>».</p>
