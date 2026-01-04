---
id: ngram.md
title: NGRAM
summary: >-
  تم إنشاء فهرس NGRAM في Milvus لتسريع استعلامات LIKE على حقول VARCHAR أو مسارات
  JSON محددة داخل حقول JSON. قبل بناء الفهرس، يقسّم ميلفوس النص إلى سلاسل فرعية
  قصيرة ومتداخلة بطول ثابت n، والمعروفة باسم n-غرامات. على سبيل المثال، إذا كان
  n = 3، تُقسّم كلمة "Milvus" إلى 3 جرامات: "Mil" و"ilv" و"lvu" و"vus". ثم
  تُخزَّن هذه الجرامات النونية في فهرس مقلوب يعيّن كل جرام إلى معرّفات المستندات
  التي يظهر فيها. في وقت الاستعلام، يسمح هذا الفهرس ل Milvus بتضييق نطاق البحث
  بسرعة إلى مجموعة صغيرة من المرشحين، مما يؤدي إلى تنفيذ الاستعلام بشكل أسرع
  بكثير.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>تم بناء الفهرس <code translate="no">NGRAM</code> في ميلفوس لتسريع الاستعلامات <code translate="no">LIKE</code> على حقول <code translate="no">VARCHAR</code> أو مسارات JSON محددة داخل حقول <code translate="no">JSON</code>. قبل إنشاء الفهرس، يقسّم ميلفوس النص إلى سلاسل فرعية قصيرة ومتداخلة بطول ثابت <em>n،</em> والمعروفة باسم <em>n-grams</em>. على سبيل المثال، إذا كان <em>n = 3،</em> يتم تقسيم كلمة <em>"Milvus"</em> إلى 3 جرامات: <em>"Mil" و</em> <em>"ilv" و</em> <em>"lvu"</em> و <em>"vus".</em> ثم تُخزَّن هذه الجرامات النونية في فهرس مقلوب يعيّن كل جرام إلى معرّفات المستندات التي يظهر فيها. في وقت الاستعلام، يسمح هذا الفهرس لـ Milvus بتضييق نطاق البحث بسرعة إلى مجموعة صغيرة من المرشحين، مما يؤدي إلى تنفيذ الاستعلام بشكل أسرع بكثير.</p>
<p>استخدمه عندما تحتاج إلى تصفية سريعة للبادئة أو اللاحقة أو اللواحق أو اللواحق أو أحرف البدل مثل:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>للحصول على تفاصيل حول بناء جملة تعبير التصفية، راجع <a href="/docs/ar/basic-operators.md#Range-operators">المعاملات الأساسية</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">كيف يعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم ميلفوس بتنفيذ فهرس <code translate="no">NGRAM</code> في عملية من مرحلتين:</p>
<ol>
<li><p><strong>بناء الفهرس</strong>: إنشاء ن-غرامات لكل مستند وبناء فهرس مقلوب أثناء الاستيعاب.</p></li>
<li><p><strong>تسريع الاستعلامات</strong>: استخدام الفهرس للتصفية إلى مجموعة مرشحة صغيرة، ثم التحقق من التطابق التام.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">المرحلة 1: بناء الفهرس<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>أثناء استيعاب البيانات، يقوم ميلفوس ببناء فهرس NGRAM من خلال تنفيذ خطوتين رئيسيتين</p>
<ol>
<li><p><strong>تحليل النص إلى ن-غرامات</strong>: يُمرر ميلفوس نافذة من <em>n</em> عبر كل سلسلة في الحقل المستهدف ويستخرج سلاسل فرعية متداخلة أو <em>n-غرامات</em>. يقع طول هذه السلاسل الفرعية ضمن نطاق قابل للتكوين، <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: أقصر n-غرام لتوليد. يحدد هذا أيضًا الحد الأدنى لطول السلسلة الفرعية للاستعلام التي يمكن أن تستفيد من الفهرس.</p></li>
<li><p><code translate="no">max_gram</code>: أطول n-غرام لتوليدها. في وقت الاستعلام، يتم استخدامه أيضًا كحد أقصى لحجم النافذة عند تقسيم سلاسل الاستعلام الطويلة.</p></li>
</ul>
<p>على سبيل المثال، مع <code translate="no">min_gram=2</code> و <code translate="no">max_gram=3</code> ، يتم تقسيم السلسلة <code translate="no">&quot;AI database&quot;</code> على النحو التالي:</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>بناء فهرس نغرام</span> </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>بناء فهرس مقلوب</strong>: يتم إنشاء فهرس <strong>مقلوب</strong> يقوم بتعيين كل n-gram تم إنشاؤه إلى قائمة بمعرفات المستندات التي تحتوي عليه.</p>
<p>على سبيل المثال، إذا ظهر نغرام 2 <code translate="no">&quot;AI&quot;</code> في المستندات التي تحمل المعرفات 1 و5 و6 و8 و9، فإن الفهرس يسجل <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. ثم يُستخدم هذا الفهرس في وقت الاستعلام لتضييق نطاق البحث بسرعة.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>بناء فهرس نغرام 2</span> </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">المرحلة 2: تسريع الاستعلامات<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>عندما يتم تنفيذ مرشح <code translate="no">LIKE</code> ، يستخدم ميلفوس فهرس NGRAM لتسريع الاستعلام في الخطوات التالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>تسريع الاستعلامات</span> </span></p>
<ol>
<li><p><strong>استخراج مصطلح الاستعلام:</strong> يتم استخراج السلسلة الفرعية المتجاورة بدون أحرف البدل من التعبير <code translate="no">LIKE</code> (على سبيل المثال، <code translate="no">&quot;%database%&quot;</code> يصبح <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>تفكيك مصطلح الاستعلام:</strong> يتحلل مصطلح الاستعلام إلى <em>n-غرامات</em> بناءً على طوله (<code translate="no">L</code>) والإعدادات <code translate="no">min_gram</code> و <code translate="no">max_gram</code>.</p>
<ul>
<li><p>إذا كان <code translate="no">L &lt; min_gram</code> ، لا يمكن استخدام الفهرس، ويعود الاستعلام إلى المسح الكامل.</p></li>
<li><p>إذا كان <code translate="no">min_gram ≤ L ≤ max_gram</code> ، يتم التعامل مع مصطلح الاستعلام بأكمله على أنه n-gram واحد، ولا يلزم إجراء مزيد من التحلل.</p></li>
<li><p>إذا كان <code translate="no">L &gt; max_gram</code> ، يتم تقسيم مصطلح الاستعلام إلى غرامات متداخلة باستخدام حجم نافذة يساوي <code translate="no">max_gram</code>.</p></li>
</ul>
<p>على سبيل المثال، إذا تم تعيين <code translate="no">max_gram</code> إلى <code translate="no">3</code> وكان مصطلح الاستعلام هو <code translate="no">&quot;database&quot;</code> ، والذي يبلغ طوله <strong>8،</strong> يتم تفكيكه إلى 3 سلاسل جرامات فرعية مثل <code translate="no">&quot;dat&quot;</code> و <code translate="no">&quot;ata&quot;</code> و <code translate="no">&quot;tab&quot;</code> وهكذا.</p></li>
<li><p><strong>البحث عن كل غرام وتقاطعه</strong>: يبحث Milvus عن كل غرام من غرامات الاستعلام في الفهرس المقلوب ثم يتقاطع مع قوائم معرفات المستندات الناتجة للعثور على مجموعة صغيرة من المستندات المرشحة. تحتوي هذه المستندات المرشحة على جميع الجرامات من الاستعلام.</p></li>
<li><p><strong>التحقق من النتائج وإرجاعها:</strong> ثم يتم تطبيق مرشح <code translate="no">LIKE</code> الأصلي كتحقق نهائي على المجموعة الصغيرة المرشحة فقط للعثور على التطابقات التامة.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">إنشاء فهرس NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إنشاء فهرس NGRAM على حقل <code translate="no">VARCHAR</code> أو على مسار محدد داخل حقل <code translate="no">JSON</code>.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">مثال 1: إنشاء على حقل VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة لحقل <code translate="no">VARCHAR</code> ، يمكنك ببساطة تحديد <code translate="no">field_name</code> وتكوين <code translate="no">min_gram</code> و <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>يقوم هذا التكوين بإنشاء 2 و3 جرامات لكل سلسلة في <code translate="no">text</code> وتخزينها في الفهرس المقلوب.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">مثال 2: إنشاء على مسار JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة لحقل <code translate="no">JSON</code> ، بالإضافة إلى إعدادات الجرام، يجب أيضًا تحديد</p>
<ul>
<li><p><code translate="no">params.json_path</code> - مسار JSON الذي يشير إلى القيمة التي تريد فهرستها.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - يجب أن يكون <code translate="no">&quot;varchar&quot;</code> (غير حساس لحالة الأحرف)، لأن فهرسة NGRAM تعمل على السلاسل.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال</p>
<ul>
<li><p>تتم فهرسة القيمة الموجودة في <code translate="no">json_field[&quot;body&quot;]</code> فقط.</p></li>
<li><p>يتم تحويل القيمة إلى <code translate="no">VARCHAR</code> قبل ترميز n-gram.</p></li>
<li><p>يُنشئ ميلفوس سلاسل فرعية بطول 2 إلى 4 ويخزنها في الفهرس المقلوب.</p></li>
</ul>
<p>لمزيد من المعلومات حول كيفية فهرسة حقل JSON، راجع <a href="/docs/ar/json-indexing.md">فهرسة JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">تسريع الاستعلامات بواسطة NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>لكي يتم تطبيق فهرس NGRAM:</p>
<ul>
<li><p>يجب أن يستهدف الاستعلام حقلاً <code translate="no">VARCHAR</code> (أو مسار JSON) يحتوي على فهرس <code translate="no">NGRAM</code>.</p></li>
<li><p>يجب ألا يقل طول الجزء الحرفي من النمط <code translate="no">LIKE</code> عن <code translate="no">min_gram</code> حرفًا.<em>(على سبيل المثال، إذا كان أقصر حد متوقع للاستعلام هو حرفان، قم بتعيين min_gram=2 عند إنشاء الفهرس).</em></p></li>
</ul>
<p>أنواع الاستعلامات المدعومة:</p>
<ul>
<li><p><strong>مطابقة البادئة</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مطابقة لاحقة</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مطابقة لاحقة</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مطابقة أحرف البدل</strong></p>
<p>يدعم Milvus كلاً من <code translate="no">%</code> (صفر أو أكثر من الأحرف) و <code translate="no">_</code> (حرف واحد فقط).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>استعلامات مسار JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>لمزيد من المعلومات حول بناء جملة تعبيرات التصفية، راجع <a href="/docs/ar/basic-operators.md">المعاملات الأساسية</a>.</p>
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
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">ملاحظات الاستخدام<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>أنواع الحقول</strong>: مدعومة على حقول <code translate="no">VARCHAR</code> و <code translate="no">JSON</code>. بالنسبة إلى JSON، قدم كلاً من <code translate="no">params.json_path</code> و <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>يونيكود</strong>: يعتمد تحليل NGRAM على الأحرف ولا يعتمد على اللغة ويتضمن المسافات البيضاء وعلامات الترقيم.</p></li>
<li><p><strong>المفاضلة بين المساحة والوقت</strong>: نطاقات غرامات أوسع <code translate="no">[min_gram, max_gram]</code> تنتج غرامات أكثر وفهارس أكبر. إذا كانت الذاكرة ضيقة، فكر في وضع <code translate="no">mmap</code> لقوائم الترحيل الكبيرة. لمزيد من المعلومات، راجع <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">استخدام mmap</a>.</p></li>
<li><p><strong>الثبات</strong>: لا يمكن تغيير <code translate="no">min_gram</code> و <code translate="no">max_gram</code> في المكان - قم بإعادة بناء الفهرس لتعديلها.</p></li>
</ul>
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
<li><p><strong>اختر min_gram و max_gram لمطابقة سلوك البحث</strong></p>
<ul>
<li><p>ابدأ بـ <code translate="no">min_gram=2</code> ، <code translate="no">max_gram=3</code></p></li>
<li><p>اضبط <code translate="no">min_gram</code> على أقصر حرف تتوقع أن يكتبه المستخدمون.</p></li>
<li><p>قم بتعيين <code translate="no">max_gram</code> بالقرب من الطول النموذجي للسلاسل الفرعية ذات المعنى؛ الأكبر <code translate="no">max_gram</code> يحسن التصفية ولكنه يزيد من المساحة.</p></li>
</ul></li>
<li><p><strong>تجنّب الجرامات ذات الانتقائية المنخفضة</strong></p>
<p>توفر الأنماط شديدة التكرار (على سبيل المثال، <code translate="no">&quot;aaaaaa&quot;</code>) تصفية ضعيفة وقد تحقق مكاسب محدودة.</p></li>
<li><p><strong>التطبيع بشكل متسق</strong></p>
<p>قم بتطبيق نفس التطبيع على النص المستوعب والنصوص الحرفية للاستعلام (على سبيل المثال، تصغير الأحرف، والتشذيب) إذا كانت حالة الاستخدام الخاصة بك تحتاج إلى ذلك.</p></li>
</ul>
