---
id: inverted.md
title: مقلوب
summary: >-
  عندما تحتاج إلى إجراء استعلامات تصفية متكررة على بياناتك، يمكن للفهارس
  المقلوبة تحسين أداء الاستعلام بشكل كبير. بدلاً من المسح من خلال جميع
  المستندات، يستخدم Milvus الفهارس المقلوبة لتحديد موقع السجلات الدقيقة التي
  تطابق شروط التصفية الخاصة بك بسرعة.
---
<h1 id="INVERTED" class="common-anchor-header">مقلوب<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>عندما تحتاج إلى إجراء استعلامات تصفية متكررة على بياناتك، يمكن للفهارس <code translate="no">INVERTED</code> تحسين أداء الاستعلام بشكل كبير. بدلاً من المسح من خلال جميع المستندات، يستخدم Milvus الفهارس المقلوبة لتحديد موقع السجلات الدقيقة التي تطابق شروط التصفية الخاصة بك بسرعة.</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">متى تستخدم الفهارس المقلوبة<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الفهارس المقلوبة عندما تحتاج إلى:</p>
<ul>
<li><p><strong>التصفية حسب قيم محددة</strong>: البحث عن جميع السجلات التي يساوي فيها حقل ما قيمة محددة (على سبيل المثال، <code translate="no">category == &quot;electronics&quot;</code>)</p></li>
<li><p><strong>تصفية المحتوى النصي</strong>: إجراء عمليات بحث فعالة على حقول <code translate="no">VARCHAR</code> </p></li>
<li><p><strong>الاستعلام عن قيم حقول JSON</strong>: تصفية على مفاتيح محددة داخل هياكل JSON</p></li>
</ul>
<p><strong>فائدة الأداء</strong>: يمكن للفهارس INVERTED تقليل وقت الاستعلام من ثوانٍ إلى أجزاء من الثانية على مجموعات البيانات الكبيرة من خلال إلغاء الحاجة إلى عمليات مسح المجموعة الكاملة.</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">كيفية عمل الفهارس المقلوبة<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم فهرس <strong>INVERTED</strong> في Milvus بتعيين كل قيمة حقل فريد (مصطلح) إلى مجموعة معرّفات المستندات التي تظهر فيها تلك القيمة. تتيح هذه البنية إمكانية البحث السريع عن الحقول ذات القيم المتكررة أو الفئوية.</p>
<p>كما هو موضح في الرسم البياني، تعمل العملية في خطوتين:</p>
<ol>
<li><p><strong>التعيين الأمامي (المعرف ← المصطلح):</strong> يشير كل معرّف مستند إلى قيمة الحقل الذي يحتوي عليه.</p></li>
<li><p><strong>التعيين المقلوب (المصطلح → المعرفات):</strong> يجمع Milvus المصطلحات الفريدة ويبني تعيينًا معكوسًا من كل مصطلح إلى جميع المعرفات التي تحتوي عليه.</p></li>
</ol>
<p>على سبيل المثال، يتم تعيين القيمة <strong>"إلكترونيات"</strong> إلى المعرفين <strong>1</strong> <strong>و3،</strong> بينما يتم تعيين <strong>"كتب"</strong> إلى المعرفين <strong>2</strong> <strong>و5</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/how-inverted-index-works.png" alt="How Inverted Index Works" class="doc-image" id="how-inverted-index-works" />
   </span> <span class="img-wrapper"> <span>كيف يعمل الفهرس المعكوس</span> </span></p>
<p>عندما تقوم بالتصفية بحثًا عن قيمة معينة (على سبيل المثال، <code translate="no">category == &quot;electronics&quot;</code>)، يبحث Milvus ببساطة عن المصطلح في الفهرس ويسترجع المعرفات المطابقة مباشرة. هذا يتجنب مسح مجموعة البيانات الكاملة ويتيح التصفية السريعة، خاصةً للقيم الفئوية أو المتكررة.</p>
<p>تدعم الفهارس INVERTED جميع أنواع الحقول القياسية، مثل <strong>BOOL</strong> و <strong>INT8</strong> و <strong>INT16</strong> و <strong>INT16</strong> و <strong>INT32</strong> و <strong>INT64</strong> و <strong>FLOAT و FLOAT</strong> و <strong>DOUBLE</strong> و <strong>VARCHAR</strong> و <strong>JSON</strong> و <strong>ARRAY</strong>. ومع ذلك، فإن معلمات الفهرس لفهرسة حقل JSON تختلف قليلاً عن الحقول العددية العادية.</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">إنشاء فهارس على حقول غير JSON<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس على حقل غير JSON، اتبع الخطوات التالية:</p>
<ol>
<li><p>قم بإعداد معلمات الفهرس:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre></li>
<li><p>أضف الفهرس <code translate="no">INVERTED</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>إنشاء الفهرس:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields--Milvus-2511+" class="common-anchor-header">إنشاء فهارس على حقول JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك أيضًا إنشاء فهارس INVERTED على مسارات محددة داخل حقول JSON. يتطلب ذلك معلمات إضافية لتحديد مسار JSON ونوع البيانات:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>للحصول على معلومات مفصلة حول فهرسة حقول JSON، بما في ذلك المسارات المدعومة وأنواع البيانات والقيود المفروضة عليها، راجع <a href="/docs/ar/json-indexing.md">فهرسة JSON</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">إسقاط فهرس<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الأسلوب <code translate="no">drop_index()</code> لإزالة فهرس موجود من مجموعة.</p>
<div class="alert note">
<ul>
<li><p>في الإصدار <strong>2.6.3 أو الإصدار 2.6.3</strong> أو الإصدار الأقدم، يجب عليك تحرير المجموعة قبل إسقاط فهرس قياسي.</p></li>
<li><p>بدءًا من الإصدار <strong>2.6.4</strong> أو الإصدار الأحدث، يمكنك إسقاط فهرس تعدادي مباشرةً بمجرد عدم الحاجة إليه - لا حاجة لتحرير المجموعة أولاً.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">أفضل الممارسات<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>إنشاء فهارس بعد تحميل البيانات</strong>: أنشئ فهارس على المجموعات التي تحتوي بالفعل على بيانات لتحسين الأداء</p></li>
<li><p><strong>استخدم أسماء فهارس وصفية</strong>: اختر أسماء تشير بوضوح إلى الحقل والغرض منه</p></li>
<li><p><strong>مراقبة أداء الفهرس</strong>: تحقق من أداء الاستعلام قبل وبعد إنشاء الفهارس.</p></li>
<li><p><strong>ضع في اعتبارك أنماط استعلامك</strong>: قم بإنشاء فهارس على الحقول التي تقوم بالتصفية حسبها بشكل متكرر</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">الخطوات التالية<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>تعرف على <a href="/docs/ar/index-explained.md">أنواع الفهارس الأخرى</a></p></li>
<li><p>راجع <a href="/docs/ar/json-indexing.md">فهرسة JSON</a> للاطلاع على سيناريوهات فهرسة JSON المتقدمة</p></li>
</ul>
