---
id: ngram.md
title: NGRAM
summary: >-
  يعمل فهرس NGRAM في Milvus على تسريع استعلامات LIKE وفلاتر التعبيرات النمطية
  المؤهلة على حقول VARCHAR أو مسارات JSON محددة داخل حقول JSON. قبل إنشاء
  الفهرس، يقسم Milvus النص إلى سلاسل فرعية قصيرة ومتداخلة ذات طول ثابت n، تُعرف
  باسم n-grams. وعند إجراء الاستعلام، يستخدم Milvus هذه n-grams لتضييق نطاق
  الكيانات المرشحة قبل التحقق من شرط التصفية الأصلي.
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
    </button></h1><p>يعمل فهرس " <code translate="no">NGRAM</code> " في Milvus على تسريع استعلامات " <code translate="no">LIKE</code> " وفلاتر التعبيرات النمطية المؤهلة على حقول " <code translate="no">VARCHAR</code> " أو مسارات JSON محددة داخل حقول " <code translate="no">JSON</code> ". قبل إنشاء الفهرس، يقسم Milvus النص إلى سلاسل فرعية قصيرة متداخلة ذات طول ثابت <em>n،</em> تُعرف باسم <em>n-grams</em>. على سبيل المثال، عندما <em>تكون n = 3،</em> تُقسَّم كلمة <em>«Milvus»</em> إلى 3-grams: <em>«Mil»،</em> <em>و«ilv»،</em> <em>و«lvu»،</em> <em>و«vus».</em> ثم تُخزَّن هذه n-grams في فهرس معكوس يربط كل غرام بمعرَّفات المستندات التي يظهر فيها <em>.</em> عند إجراء الاستعلام، يتيح هذا الفهرس لـ Milvus تضييق نطاق البحث بسرعة إلى مجموعة صغيرة من النتائج المحتملة قبل التحقق من شرط التصفية الأصلي.</p>
<p>استخدمه عندما تحتاج إلى تصفية سريعة باستخدام البادئة أو اللاحقة أو الحشو أو حرف البدل أو تعبيرات regex المؤهلة، مثل:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>للحصول على تفاصيل حول « <code translate="no">LIKE</code> » وصيغة تعبيرات تصفية التعبيرات النمطية، راجع <a href="/docs/ar/pattern-matching.md">«مطابقة الأنماط</a>».</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">كيفية عمله<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم Milvus بتنفيذ فهرس <code translate="no">NGRAM</code> في عملية من مرحلتين:</p>
<ol>
<li><p><strong>إنشاء الفهرس</strong>: إنشاء n-grams لكل مستند وإنشاء فهرس معكوس أثناء الاستيعاب.</p></li>
<li><p><strong>تسريع الاستعلامات</strong>: استخدام الفهرس لتصفية مجموعة صغيرة من النتائج المرشحة، ثم التحقق من التطابقات الدقيقة.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">المرحلة 1: إنشاء الفهرس<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>أثناء استيعاب البيانات، يقوم Milvus بإنشاء فهرس NGRAM من خلال تنفيذ خطوتين رئيسيتين:</p>
<ol>
<li><p><strong>تفكيك النص إلى n-grams</strong>: يقوم Milvus بتحريك نافذة من <em>n</em> عبر كل سلسلة في الحقل المستهدف واستخراج السلاسل الفرعية المتداخلة، أو <em>n-grams</em>. يقع طول هذه السلاسل الفرعية ضمن نطاق قابل للتكوين، <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: أقصر n-gram يتم إنشاؤه. ويحدد هذا أيضًا الحد الأدنى لطول السلسلة الفرعية للاستعلام التي يمكنها الاستفادة من الفهرس.</p></li>
<li><p><code translate="no">max_gram</code>: أطول n-gram يتم إنشاؤه. عند إجراء الاستعلام، يُستخدم أيضًا كحد أقصى لحجم النافذة عند تقسيم سلاسل الاستعلام الطويلة.</p></li>
</ul>
<p>على سبيل المثال، مع <code translate="no">min_gram=2</code> و <code translate="no">max_gram=3</code> ، يتم تقسيم السلسلة <code translate="no">&quot;AI database&quot;</code> على النحو التالي:</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>إنشاء فهرس n-gram</span>
  
 </span></p>
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
<li><p><strong>إنشاء فهرس معكوس</strong>: يتم إنشاء <strong>فهرس معكوس</strong> يربط كل n-gram تم إنشاؤه بقائمة من معرّفات المستندات التي تحتوي عليه.</p>
<p>على سبيل المثال، إذا ظهرت 2-gram <code translate="no">&quot;AI&quot;</code> في المستندات ذات المعرفات 1 و5 و6 و8 و9، فإن الفهرس يسجل <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. ثم يُستخدم هذا الفهرس عند إجراء الاستعلام لتضييق نطاق البحث بسرعة.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>إنشاء فهرس n-gram 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">المرحلة 2: تسريع عمليات الاستعلام<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>عند تنفيذ مرشح « <code translate="no">LIKE</code> » أو مرشح تعبير عادي (regex) مؤهل، يستخدم Milvus فهرس NGRAM لتسريع الاستعلام من خلال الخطوات التالية:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>تسريع الاستعلامات</span>
  
 </span></p>
<ol>
<li><p><strong>استخراج مصطلح الاستعلام:</strong> يتم استخراج السلسلة الفرعية المتجاورة الخالية من أحرف البدل من تعبير <code translate="no">LIKE</code> (على سبيل المثال، يتحول <code translate="no">&quot;%database%&quot;</code> إلى <code translate="no">&quot;database&quot;</code>). بالنسبة لمرشحات regex، يستخرج Milvus سلاسل فرعية حرفية ثابتة من نمط regex عندما يكون ذلك ممكنًا. على سبيل المثال، يحتوي <code translate="no">message =~ &quot;error.*timeout&quot;</code> على القيم الحرفية <code translate="no">error</code> و <code translate="no">timeout</code>.</p></li>
<li><p><strong>تفكيك مصطلح الاستعلام:</strong> يتم تفكيك مصطلح الاستعلام إلى <em>n-grams</em> بناءً على طوله (<code translate="no">L</code>) وإعدادات <code translate="no">min_gram</code> و <code translate="no">max_gram</code>.</p>
<ul>
<li><p>إذا كان <code translate="no">L &lt; min_gram</code> ، فلا يمكن استخدام الفهرس، ويُرجع الاستعلام إلى المسح الكامل.</p></li>
<li><p>إذا كان <code translate="no">min_gram ≤ L ≤ max_gram</code> ، يُعامل مصطلح الاستعلام بأكمله على أنه n-gram واحد، ولا يلزم إجراء أي تفكيك إضافي.</p></li>
<li><p>إذا كان <code translate="no">L &gt; max_gram</code> ، يتم تقسيم مصطلح الاستعلام إلى غرامات متداخلة باستخدام حجم نافذة يساوي <code translate="no">max_gram</code>.</p></li>
</ul>
<p>على سبيل المثال، إذا تم تعيين <code translate="no">max_gram</code> على <code translate="no">3</code> وكان مصطلح الاستعلام هو <code translate="no">&quot;database&quot;</code> ، الذي يبلغ طوله <strong>8</strong>، يتم تفكيكه إلى سلاسل فرعية من 3-gram مثل <code translate="no">&quot;dat&quot;</code> و <code translate="no">&quot;ata&quot;</code> و <code translate="no">&quot;tab&quot;</code> وهكذا.</p></li>
<li><p><strong>البحث عن كل جرام والتقاطع</strong>: يبحث Milvus عن كل جرام من جرامات الاستعلام في الفهرس المقلوب، ثم يقوم بتقاطع قوائم معرّفات المستندات الناتجة للعثور على مجموعة صغيرة من المستندات المرشحة. تحتوي هذه المستندات المرشحة على جميع جرامات الاستعلام.</p></li>
<li><p><strong>التحقق من النتائج وإرجاعها:</strong> يتم بعد ذلك تطبيق مرشح " <code translate="no">LIKE</code> " الأصلي أو مرشح التعبير العادي (regex) كفحص نهائي على المجموعة المرشحة الصغيرة فقط للعثور على التطابقات الدقيقة.</p></li>
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
    </button></h2><p>يمكنك إنشاء فهرس NGRAM في حقل من نوع « <code translate="no">VARCHAR</code> » أو في مسار محدد داخل حقل من نوع « <code translate="no">JSON</code> ».</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">المثال 1: الإنشاء في حقل VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة لحقل <code translate="no">VARCHAR</code> ، ما عليك سوى تحديد <code translate="no">field_name</code> وتكوين <code translate="no">min_gram</code> و <code translate="no">max_gram</code>.</p>
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
<p>يؤدي هذا التكوين إلى إنشاء مجموعات من 2 و3 أحرف لكل سلسلة في حقل <code translate="no">text</code> وتخزينها في الفهرس المعكوس.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">المثال 2: الإنشاء على مسار JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة لحقل <code translate="no">JSON</code> ، بالإضافة إلى إعدادات الجرامات، يجب عليك أيضًا تحديد:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – مسار JSON الذي يشير إلى القيمة التي تريد فهرستها.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – يجب أن يكون <code translate="no">&quot;varchar&quot;</code> (لا يُراعي تمييز الأحرف الكبيرة والصغيرة)، لأن فهرسة NGRAM تعمل على السلاسل.</p></li>
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
<p>في هذا المثال:</p>
<ul>
<li><p>يتم فهرسة القيمة الموجودة في <code translate="no">json_field[&quot;body&quot;]</code> فقط.</p></li>
<li><p>يتم تحويل القيمة إلى <code translate="no">VARCHAR</code> قبل تجزئة n-gram.</p></li>
<li><p>يقوم Milvus بإنشاء سلاسل فرعية بطول يتراوح بين 2 و4 ويخزنها في الفهرس المعكوس.</p></li>
</ul>
<p>لمزيد من المعلومات حول كيفية فهرسة حقل JSON، راجع <a href="/docs/ar/json-indexing.md">فهرسة JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">الاستعلامات التي يتم تسريعها بواسطة NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>لتطبيق فهرس NGRAM:</p>
<ul>
<li><p>يجب أن يستهدف الاستعلام حقل <code translate="no">VARCHAR</code> (أو مسار JSON) الذي يحتوي على فهرس <code translate="no">NGRAM</code>.</p></li>
<li><p>يجب أن يبلغ طول الجزء الحرفي من نمط <code translate="no">LIKE</code> <code translate="no">min_gram</code> حرفًا على الأقل.
<em>(على سبيل المثال، إذا كان أقصر مصطلح استعلام متوقع هو حرفان، فقم بتعيين min_gram=2 عند إنشاء الفهرس.)</em></p></li>
</ul>
<p>أنواع الاستعلامات المدعومة:</p>
<ul>
<li><p><strong>مطابقة البادئة</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مطابقة اللاحقة</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مطابقة الوسيط</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مطابقة أحرف البدل</strong></p>
<p>يدعم Milvus كل من " <code translate="no">%</code> " (صفر أو أكثر من حرف) و" <code translate="no">_</code> " (حرف واحد بالضبط).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>استعلامات مسار JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مرشح Regex</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مرشح Regex على مسار JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>لمزيد من المعلومات حول صيغة تعبير التصفية، راجع <a href="/docs/ar/pattern-matching.md">مطابقة الأنماط</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">إزالة فهرس<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الطريقة <code translate="no">drop_index()</code> لإزالة فهرس موجود من مجموعة.</p>
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
<li><p><strong>أنواع الحقول</strong>: مدعومة في حقول <code translate="no">VARCHAR</code> و <code translate="no">JSON</code>. بالنسبة لـ JSON، قم بتوفير كل من <code translate="no">params.json_path</code> و <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>تسريع التعبيرات النمطية</strong>: لا تعمل ميزة « <code translate="no">NGRAM</code> » على تسريع مرشحات التعبيرات النمطية إلا عندما يتمكن Milvus من استخراج سلاسل فرعية حرفية ثابتة من نمط التعبير النمطي. قد تلجأ الأنماط مثل <code translate="no">[a-z]+</code> إلى المسح لأنها لا تحتوي على قيم حرفية ثابتة.</p></li>
<li><p><strong>التعبيرات النمطية غير الحساسة لحالة الأحرف</strong>: يتم دعم أنماط التعبيرات النمطية التي تستخدم <code translate="no">(?i)</code> ، ولكنها قد تتخطى تحسين <code translate="no">NGRAM</code> لأن الفهرس يحافظ على حالة الأحرف الأصلية.</p></li>
<li><p><strong>خطوة التحقق</strong>: بالنسبة لمرشحات التعبيرات العادية، ينتج <code translate="no">NGRAM</code> مرشحين ويقوم Milvus بالتحقق منها باستخدام نمط التعبيرات العادية RE2 الكامل، وبالتالي لا تؤدي تسريع الفهرس إلى تغيير نتائج المطابقة.</p></li>
<li><p><strong>يونيكود</strong>: يعتمد تحليل NGRAM على الأحرف ولا يرتبط بلغة معينة، ويشمل المسافات البيضاء وعلامات الترقيم.</p></li>
<li><p><strong>المفاضلة بين المساحة والوقت</strong>: تنتج نطاقات الجرامات الأوسع <code translate="no">[min_gram, max_gram]</code> عددًا أكبر من الجرامات وفهارس أكبر. إذا كانت الذاكرة محدودة، ففكر في استخدام وضع <code translate="no">mmap</code> لقوائم النشر الكبيرة. لمزيد من المعلومات، راجع <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">استخدام mmap</a>.</p></li>
<li><p><strong>الثبات</strong>: لا يمكن تغيير <code translate="no">min_gram</code> و <code translate="no">max_gram</code> في مكانها — قم بإعادة بناء الفهرس لتعديلهما.</p></li>
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
<li><p><strong>اختر min_gram و max_gram بحيث يتناسبان مع سلوك البحث</strong></p>
<ul>
<li><p>ابدأ بـ <code translate="no">min_gram=2</code> و <code translate="no">max_gram=3</code>.</p></li>
<li><p>اضبط <code translate="no">min_gram</code> على أقصر قيمة حرفية تتوقع أن يكتبها المستخدمون.</p></li>
<li><p>اضبط <code translate="no">max_gram</code> بالقرب من الطول النموذجي للسلاسل الفرعية ذات المعنى؛ فكلما زاد <code translate="no">max_gram</code> ، تحسنت عملية التصفية ولكن تزداد المساحة المطلوبة.</p></li>
</ul></li>
<li><p><strong>تجنب الغرامات ذات الانتقائية المنخفضة</strong></p>
<p>توفر الأنماط شديدة التكرار (مثل <code translate="no">&quot;aaaaaa&quot;</code>) تصفية ضعيفة وقد تؤدي إلى مكاسب محدودة.</p></li>
<li><p><strong>قم بالتوحيد بشكل متسق</strong></p>
<p>قم بتطبيق نفس عملية التوحيد على النص المستورد والقيم الثابتة للاستعلامات (على سبيل المثال، تحويل الأحرف إلى أحرف صغيرة، وإزالة الأحرف الزائدة) إذا كانت حالة الاستخدام الخاصة بك تتطلب ذلك.</p></li>
</ul>
