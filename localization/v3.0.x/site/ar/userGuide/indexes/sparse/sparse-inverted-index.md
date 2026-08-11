---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  يُعد الفهرس SPARSE_INVERTED_INDEX نوعًا من الفهارس يستخدمه Milvus لتخزين
  المتجهات المتفرقة والبحث فيها بكفاءة. ويستفيد هذا النوع من الفهارس من مبادئ
  الفهرسة المعكوسة لإنشاء بنية بحث عالية الكفاءة للبيانات المتفرقة.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>فهرس <code translate="no">SPARSE_INVERTED_INDEX</code> هو نوع من الفهارس يستخدمه Milvus لتخزين المتجهات المتفرقة والبحث فيها بكفاءة. وهو يبني بنية معكوسة من الأبعاد غير الصفرية في المتجهات المتفرقة. يمكنك استخدام هذا الفهرس للبحث عن النص الكامل باستخدام BM25 وللبحث عن التضمين المتفرق استنادًا إلى حاصل الضرب الداخلي.</p>
<p>لمزيد من المعلومات حول حقول المتجهات المتفرقة وأنواع المقاييس والبحث عن النص الكامل، راجع <a href="/docs/ar/sparse_vector.md">«المتجهات المتفرقة</a>» <a href="/docs/ar/metric.md">و«أنواع المقاييس</a>» <a href="/docs/ar/full-text-search.md">و«البحث عن النص الكامل</a>».</p>
<h2 id="Build-index" class="common-anchor-header">إنشاء الفهرس<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس " <code translate="no">SPARSE_INVERTED_INDEX</code> " على حقل متجهات متفرقة في Milvus، استخدم طريقة " <code translate="no">add_index()</code> " وحدد المعلمات " <code translate="no">index_type</code>" و" <code translate="no">metric_type</code>" و"index".</p>
<p>بالنسبة للبحث عن النص الكامل باستخدام BM25، قم بإنشاء الفهرس على حقل المتجهات المتفرقة الذي تم إنشاؤه بواسطة دالة BM25. اضبط <code translate="no">metric_type</code> على <code translate="no">BM25</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة للبحث عن طريق التضمين المتفرق، قم بإنشاء الفهرس على حقل متجهات متفرقة يخزن متجهات متفرقة تم إنشاؤها خارجيًا. اضبط <code translate="no">metric_type</code> على <code translate="no">IP</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>في التكوينات السابقة:</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. اضبط هذه القيمة على <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: المقياس المستخدم لحساب التشابه بين المتجهات المتفرقة. القيم الصالحة:</p>
<ul>
<li><p><code translate="no">BM25</code>: يستخدم نظام تقييم الصلة BM25 للبحث عن النص الكامل.</p></li>
<li><p><code translate="no">IP</code> (الضرب الداخلي): يقيس تشابه المتجهات المتفرقة باستخدام الضرب النقطي.</p></li>
</ul>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/metric.md">«أنواع المقاييس</a> » <a href="/docs/ar/full-text-search.md">و«البحث</a> عن <a href="/docs/ar/full-text-search.md">النص الكامل</a>».</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: الخوارزمية المستخدمة لإنشاء الفهرس والاستعلام عنه. القيم الصالحة:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: معالجة الاستعلامات بنظام «المستند الواحد في كل مرة» (Document-at-a-Time) باستخدام MaxScore. هذا هو الإعداد الافتراضي لـ «الاستعلامات المتعددة» ( <code translate="no">BM25</code>). لمزيد من المعلومات الأساسية، راجع <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">«تقييم الاستعلامات: الاستراتيجيات والتحسينات</a>».</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: معالجة استعلامات WAND بنظام «مستند واحد في كل مرة». هذه الخوارزمية مناسبة لقيم topK الأصغر أو الاستعلامات الأقصر. لمزيد من المعلومات الأساسية، راجع <a href="https://dl.acm.org/doi/10.1145/956863.956944">«تقييم الاستعلامات بكفاءة باستخدام عملية استرجاع ذات مستويين</a>».</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: معالجة الاستعلام «مصطلح واحد في كل مرة» (Term-at-a-Time) الأساسية. استخدم هذا الخيار كخط أساس أو عندما تحتاج إلى أن تتكيف عملية التقييم ديناميكيًا مع إحصائيات المجموعة الشاملة مثل متوسط طول المستند.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: معالجة استعلامات MaxScore باستخدام بيانات تعريفية للدرجة القصوى على مستوى الكتلة. للحصول على معلومات أساسية، راجع <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«استرجاع أسرع للوثائق Top-k باستخدام فهارس Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: معالجة الاستعلامات باستخدام طريقة WAND مع بيانات تعريفية للدرجة القصوى على مستوى الكتلة. لمزيد من المعلومات الأساسية، راجع <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«استرجاع المستندات Top-k بشكل أسرع باستخدام فهارس Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: فهرس معكوس متفرق يعتمد على نوافذ ثابتة لمعرفات المستندات، مع تسريع SIMD للبحث. هذا هو الإعداد الافتراضي لـ « <code translate="no">IP</code> ». لمزيد من التفاصيل، راجع <a href="https://arxiv.org/abs/2509.08395">ورقة SINDI البحثية</a>.</p></li>
</ul>
<p>إذا لم تحدد <code translate="no">inverted_index_algo</code> ، فسيختار Milvus الخوارزمية الافتراضية استنادًا إلى <code translate="no">metric_type</code>: <code translate="no">DAAT_MAXSCORE</code> لـ <code translate="no">BM25</code> ، و <code translate="no">SINDI</code> لـ <code translate="no">IP</code>.</p>
<p>لمعرفة المزيد عن معلمات الإنشاء المتاحة لمؤشر <code translate="no">SPARSE_INVERTED_INDEX</code> ، راجع <a href="/docs/ar/sparse-inverted-index.md#Index-building-params">معلمات إنشاء المؤشر</a>.</p></li>
</ul>
<p>بمجرد تكوين معلمات الفهرس، يمكنك إنشاء الفهرس باستخدام الطريقة <code translate="no">create_index()</code> مباشرةً أو عن طريق تمرير معلمات الفهرس في الطريقة <code translate="no">create_collection</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">البحث في الفهرس<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء الفهرس وإدراج الكيانات، يمكنك إجراء عمليات بحث عن التشابه في الفهرس.</p>
<p>بالنسبة للبحث عن النص الكامل باستخدام BM25، استخدم النص الخام كاستعلام. يقوم Milvus بتحويل نص الاستعلام إلى متجه متفرق من خلال دالة BM25.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة للبحث باستخدام التضمين المتفرق، استخدم قاموس المتجهات المتفرقة كمتجه الاستعلام.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>بشكل افتراضي، يستخدم Milvus خوارزمية البحث التي تم تكوينها للفهرس.</p>
<p>لمعرفة المزيد عن معلمات البحث المتاحة لفهرس <code translate="no">SPARSE_INVERTED_INDEX</code> ، راجع <a href="/docs/ar/sparse-inverted-index.md#Index-specific-search-params">معلمات البحث الخاصة بالفهرس</a>.</p>
<h2 id="Index-params" class="common-anchor-header">معلمات الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم هذا القسم نظرة عامة على المعلمات المستخدمة لإنشاء فهرس وإجراء عمليات البحث عليه.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات إنشاء الفهرس<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/sparse-inverted-index.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>الخوارزمية المستخدمة لإنشاء الفهرس والاستعلام عنه. وهي تحدد كيفية معالجة الفهرس للاستعلامات.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>، <code translate="no">"DAAT_WAND"</code> ، <code translate="no">"TAAT_NAIVE"</code> ، <code translate="no">"BLOCK_MAX_MAXSCORE"</code> ، <code translate="no">"BLOCK_MAX_WAND"</code> ، <code translate="no">"SINDI"</code></p><p>القيمة الافتراضية: <code translate="no">"DAAT_MAXSCORE"</code> لـ <code translate="no">BM25</code> ؛ <code translate="no">"SINDI"</code> لـ <code translate="no">IP</code>.</p></td>
     <td><p>استخدم <code translate="no">"DAAT_MAXSCORE"</code> لأحمال عمل البحث عن النص الكامل في BM25 ذات قيم k العالية أو الاستعلامات التي تحتوي على العديد من المصطلحات.</p><p>استخدم <code translate="no">"DAAT_WAND"</code> لأحمال عمل BM25 ذات قيم k صغيرة أو الاستعلامات القصيرة.</p><p>استخدم <code translate="no">"TAAT_NAIVE"</code> كخط أساس، أو عندما تحتاج إلى أن تتكيف عملية التقييم ديناميكيًا مع إحصائيات المجموعة الشاملة مثل متوسط طول المستند.</p><p>استخدم <code translate="no">"BLOCK_MAX_MAXSCORE"</code> أو <code translate="no">"BLOCK_MAX_WAND"</code> لاستخدام بيانات التعريف ذات الدرجة القصوى على مستوى الكتلة لتقليص الاستعلامات.</p><p>استخدم <code translate="no">"SINDI"</code> للبحث عن التضمين المتفرق باستخدام <code translate="no">IP</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>يتحكم في تشبع تكرار المصطلحات لتقييم BM25. لا تنطبق هذه المعلمة إلا عندما تكون قيمة <code translate="no">metric_type</code> هي <code translate="no">BM25</code>.</p></td>
     <td><p>النطاق الموصى به: [1.2، 2.0]</p><p>القيمة الافتراضية: 1.2</p></td>
     <td><p>قم بزيادة هذه القيمة لإعطاء تردد المصطلح وزنًا أكبر في ترتيب المستندات.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>يتحكم في قوة تطبيع طول المستند لتقييم BM25. لا تنطبق هذه المعلمة إلا عندما تكون قيمة <code translate="no">metric_type</code> هي <code translate="no">BM25</code>.</p></td>
     <td><p>النطاق: [0, 1]</p><p>القيمة الافتراضية: 0.75</p></td>
     <td><p>استخدم قيمة أعلى لتطبيق تطبيع أقوى لطول المستند. استخدم قيمة أقل لتقليل تأثير طول المستند على الترتيب.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">معلمات البحث الخاصة بالفهرس<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/sparse-inverted-index.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>نسبة القيم الأصغر التي يجب تجاهلها أثناء البحث، مما يساعد على تقليل التشويش.</p></td>
     <td><p>النطاق: [0.0، 1.0) (على سبيل المثال، القيمة 0.2 تتجاهل أصغر 20% من القيم)</p></td>
     <td><p>اضبط هذا المعامل بناءً على مستوى التباعد ومستوى الضوضاء في متجهات الاستعلام الخاصة بك.</p><p>يتحكم هذا المعامل في نسبة القيم ذات المقدار المنخفض التي يتم استبعادها أثناء البحث. يمكن أن تؤدي زيادة هذه القيمة (على سبيل المثال، إلى <code translate="no">0.2</code>) إلى تقليل الضوضاء وتركيز البحث على المكونات الأكثر أهمية، مما قد يحسن الدقة والكفاءة. ومع ذلك، فإن استبعاد المزيد من القيم يمكن أن يقلل أيضًا من معدل الاسترجاع عن طريق استبعاد الإشارات التي قد تكون ذات صلة. اختر قيمة تحقق التوازن بين معدل الاسترجاع والدقة لحمل العمل الخاص بك.</p></td>
   </tr>
</table>
