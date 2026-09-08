---
id: mempalace_with_milvus.md
summary: >-
  في هذا الدرس التعليمي، سنستخدم واجهة سطر الأوامر (CLI) لـ MemPalace لاستخراج
  مجموعة فرعية حقيقية من وثائق Milvus العامة وتخزينها في Milvus. يحتوي هذا
  المجموع على وثائق تتناول أدوات التحليل، وأدوات التقطيع، وفلاتر الرموز. وتوفر
  هذه الصفحات المترابطة بشكل وثيق عناصر تشتيت كافية لجعل أمثلة الاسترجاع ذات
  مغزى.
title: MemPalace مع Milvus
---
<h1 id="MemPalace-with-Milvus" class="common-anchor-header">MemPalace مع Milvus<button data-href="#MemPalace-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/MemPalace/mempalace">MemPalace</a> هي طبقة ذاكرة مخصصة لوكلاء البرمجة وسير عمل التطوير طويلة الأمد. وهي تنظم معارف المشروع إلى أجنحة وغرف وأدراج، ثم تجعل المحتوى الأصلي قابلاً للبحث عبر الجلسات.</p>
<p>في هذا البرنامج التعليمي، سنستخدم واجهة سطر الأوامر (CLI) لـ MemPalace لاستخراج مجموعة فرعية حقيقية من <a href="https://github.com/milvus-io/milvus-docs">وثائق Milvus</a> العامة وتخزينها في <a href="https://milvus.io/">Milvus</a>. يحتوي المجموع على وثائق حول أدوات التحليل وأدوات التقطيع وفلاتر الرموز. توفر هذه الصفحات المترابطة بشكل وثيق عوامل تشتيت كافية لجعل أمثلة الاسترجاع ذات مغزى.</p>
<p>يستخدم المثال Milvus Lite، لذا يعمل محليًّا دون الحاجة إلى Docker أو خادم قاعدة بيانات منفصل. يمكن أيضًا أن يشير نفس تكوين MemPalace إلى خادم Milvus أو Zilliz Cloud من أجل عمليات النشر المشتركة.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتثبيت MemPalace مع تبعيات Milvus الاختيارية من PyPI. لا يحدد الأمر إصدارًا معينًا عن قصد، لذا فإن التثبيت الجديد سيحصل على أحدث إصدار متاح.</p>
<pre><code translate="no" class="language-shell">uv tool install &quot;mempalace[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>تحتاج أيضًا إلى Git لتنزيل مجموعة الوثائق.</p>
<p>يستخدم هذا البرنامج التعليمي نموذج التضمين MiniLM المحلي الخاص بـ MemPalace، لذا فهو لا يتطلب مفتاح API لنموذج خارجي. قد يقوم أول أمر استخراج أو بحث بتنزيل نموذج تضمين ONNX صغير.</p>
<h2 id="Configure-the-workspace" class="common-anchor-header">تكوين مساحة العمل<button data-href="#Configure-the-workspace" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء مساحة عمل تحتوي على دلائل منفصلة للوثائق وMemPalace:</p>
<pre><code translate="no" class="language-shell">mkdir -p mempalace-milvus-demo
cd mempalace-milvus-demo

export PALACE_DIR=&quot;$PWD/palace&quot;
export DOCS_REPO=&quot;$PWD/milvus-docs&quot;
export PROJECT_DIR=&quot;$PWD/milvus-analyzer-docs&quot;
export MEMPALACE_EMBEDDING_MODEL=&quot;minilm&quot;
export MEMPALACE_EMBEDDING_DEVICE=&quot;cpu&quot;
export MEMPALACE_EMBEDDING_THREADS=&quot;2&quot;
<button class="copy-code-btn"></button></code></pre>
<p>نقوم بتمرير <code translate="no">--backend milvus</code> إلى أوامر MemPalace أدناه. ونظرًا لعدم تكوين عنوان URI بعيد لـ Milvus، يقوم MemPalace بإنشاء قاعدة بيانات Milvus Lite محلية على <code translate="no">$PALACE_DIR/milvus.db</code>.</p>
<blockquote>
<p>أما بالنسبة لحجة <code translate="no">MilvusClient</code> التي تستخدمها الخلفية:</p>
<ul>
<li>يُعد تعيين <code translate="no">uri</code> إلى مسار محلي، مثل <code translate="no">./milvus.db</code> ، الخيار الأكثر ملاءمة. حيث يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> لتخزين البيانات محليًّا.</li>
<li>بالنسبة للنشر الأكبر حجمًا، يمكنك استخدام <a href="https://milvus.io/docs/quickstart.md">خادم Milvus</a> وتعيين URI إلى نقطة النهاية الخاصة به، مثل <code translate="no">http://localhost:19530</code>.</li>
<li>لاستخدام <a href="https://zilliz.com/cloud">Zilliz Cloud</a>، قم بتعيين عنوان URI ورمز التوثيق (token) إلى <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة</a> للمجموعة <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">ومفتاح واجهة برمجة التطبيقات (API)</a>.</li>
</ul>
</blockquote>
<h2 id="Download-the-Milvus-documentation-corpus" class="common-anchor-header">تنزيل مجموعة وثائق Milvus<button data-href="#Download-the-Milvus-documentation-corpus" class="anchor-icon" translate="no">
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
    </button></h2><p>مستودع وثائق Milvus أكبر بكثير مما يحتاجه هذا المثال. استخدم ميزة Git sparse checkout لتنزيل دليل وثائق Analyzer فقط من الفرع <code translate="no">v3.0.x</code>:</p>
<pre><code translate="no" class="language-shell">git clone \
  --depth 1 \
  --filter=blob:none \
  --sparse \
  --branch v3.0.x \
  https://github.com/milvus-io/milvus-docs.git \
  &quot;$DOCS_REPO&quot;

git -C &quot;$DOCS_REPO&quot; sparse-checkout set \
  site/en/userGuide/schema/analyzer

cp -R \
  &quot;$DOCS_REPO/site/en/userGuide/schema/analyzer&quot; \
  &quot;$PROJECT_DIR&quot;
<button class="copy-code-btn"></button></code></pre>
<p>في وقت كتابة هذا الدليل، يحتوي هذا الدليل على 31 صفحة Markdown. وتشمل هذه الصفحات أدلة عامة حول Analyzer وثلاث مجموعات من الصفحات ذات الصلة الوثيقة:</p>
<pre><code translate="no" class="language-text">milvus-analyzer-docs/
├── analyzer/       # Built-in language analyzers
├── filter/         # Token filters
├── tokenizer/      # Tokenizers
└── *.md            # Analyzer overviews and selection guides
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من عدد الصفحات المصدرية:</p>
<pre><code translate="no" class="language-shell">find &quot;$PROJECT_DIR&quot; -type f -name &quot;*.md&quot; | wc -l
<button class="copy-code-btn"></button></code></pre>
<p>مخرجات مرجعية:</p>
<pre><code translate="no" class="language-text">31
<button class="copy-code-btn"></button></code></pre>
<p>قد يتغير العدد الدقيق مع تحديث فرع وثائق Milvus.</p>
<h2 id="Define-the-MemPalace-rooms" class="common-anchor-header">تحديد غرف MemPalace<button data-href="#Define-the-MemPalace-rooms" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن لـ MemPalace اكتشاف الغرف أثناء عملية " <code translate="no">mempalace init</code>"، لكن تدفق التهيئة الخاص به يقوم أيضًا بتصنيف الكيانات الاستدلالي على مستوى المشروع بأكمله وكتابة النتائج المقبولة في سجل الكيانات. لا تُعد خطوة التصنيف هذه ضرورية لتعريف مجموعة الوثائق هذه، لذا نقدم التصنيف الصغير مباشرةً. أثناء الاستخراج، قد يستمر MemPalace في إرفاق بيانات وصفية للكيانات الاستدلالية الحتمية وإنشاء روابط داخلية؛ ولا تحدد هذه الارتباطات الغرفة التي تستقبل الملف أو تغير عمليات البحث على نطاق الغرفة الموضحة أدناه.</p>
<p>قم بإنشاء ملف « <code translate="no">$PROJECT_DIR/mempalace.yaml</code> » بالمحتوى التالي:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">wing:</span> <span class="hljs-string">milvus_analyzer_docs</span>
<span class="hljs-attr">rooms:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">analyzer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Built-in</span> <span class="hljs-string">language</span> <span class="hljs-string">analyzers</span> <span class="hljs-string">and</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">selection</span> <span class="hljs-string">guides</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">analyzer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">filter</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Token</span> <span class="hljs-string">filters</span> <span class="hljs-string">used</span> <span class="hljs-string">in</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">pipelines</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">filter</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">tokenizer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Tokenizers</span> <span class="hljs-string">and</span> <span class="hljs-string">language</span> <span class="hljs-string">identification</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">tokenizer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">general</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Analyzer</span> <span class="hljs-string">documentation</span> <span class="hljs-string">that</span> <span class="hljs-string">does</span> <span class="hljs-string">not</span> <span class="hljs-string">fit</span> <span class="hljs-string">another</span> <span class="hljs-string">room</span>
    <span class="hljs-attr">keywords:</span> []
<button class="copy-code-btn"></button></code></pre>
<p>يمثل الجناح مجموعة الوثائق بأكملها. وتمثل الغرفة مجال موضوعًا. يقوم MemPalace بتوجيه الملف عن طريق التحقق أولاً من دليله، ثم اسم الملف، ثم الكلمات المفتاحية للغرفة في محتواه. على سبيل المثال، ينتقل الملف الموجود ضمن <code translate="no">filter/</code> مباشرةً إلى غرفة <code translate="no">filter</code>.</p>
<p>ثم يتم تقسيم كل ملف إلى أجزاء نصية متداخلة. يصبح كل جزء درجًا يحتوي على نص Markdown الحرفي والبيانات الوصفية مثل <code translate="no">wing</code> و <code translate="no">room</code> و <code translate="no">source_file</code> و <code translate="no">chunk_index</code> وأرقام أسطر المصدر. تظل الغرف والأدراج بيانات وصفية منطقية داخل مجموعات Milvus في MemPalace؛ ولا ينشئ MemPalace مجموعة Milvus منفصلة لكل غرفة.</p>
<h2 id="Mine-the-documentation-into-Milvus" class="common-anchor-header">استخراج الوثائق إلى Milvus<button data-href="#Mine-the-documentation-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>استخراج المشروع باستخدام الخلفية البرمجية لـ Milvus:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  mine &quot;$PROJECT_DIR&quot; \
  --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>المرجع الناتج من لقطة الوثائق التي تم التحقق من صحتها:</p>
<pre><code translate="no" class="language-text">=======================================================
  Done.
  Files processed: 31
  Files skipped (already filed or other): 0
  Drawers filed: 473

  By room:
    filter               16 files
    analyzer              8 files
    tokenizer             7 files
=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>يقرأ MemPalace لغة Markdown دون تلخيصها أو إعادة كتابتها، ويحسب التضمينات المحلية، ويخزن الأدراج في Milvus. في لقطة الوثائق التي تم اختبارها، أنتجت 31 ملفًا 473 درجًا.</p>
<p>تحقق من الغرف الناتجة وعدد الأدراج:</p>
<pre><code translate="no" class="language-shell">mempalace --palace &quot;$PALACE_DIR&quot; status --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>النتائج المرجعية:</p>
<pre><code translate="no" class="language-text">=======================================================
  MemPalace Status -- 473 drawers
=======================================================

  WING: milvus_analyzer_docs
    ROOM: analyzer               212 drawers
    ROOM: filter                 156 drawers
    ROOM: tokenizer              105 drawers

=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>قد يتغير العدد الدقيق للأدراج عند تغيير الوثائق الأصلية، لأن الصفحات الأطول تنتج مقاطع أكثر.</p>
<h2 id="Semantic-search" class="common-anchor-header">البحث الدلالي<button data-href="#Semantic-search" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم <code translate="no">mempalace search</code> لاسترداد الوثائق حسب المعنى. لا يذكر السؤال التالي اسم ملف معين أو ميزة معينة في Analyzer:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How should I analyze documents that mix several languages?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>النتائج المرجعية (قد تختلف النتائج):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How should I analyze documents that mix several languages?&quot;
Wing: milvus_analyzer_docs

[1] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
    Match: cosine_sim=0.334 bm25=2.469
[2] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
[3] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
<button class="copy-code-btn"></button></code></pre>
<p>في التشغيل الذي تم التحقق من صحته، جاءت النتائج الثلاث جميعها من <code translate="no">multi-language-analyzers.md</code> ، على الرغم من أن المجموعة النصية احتوت أيضًا على صفحات خاصة بمحللات اللغات الفردية، وأدوات تقطيع الكلمات، والمرشحات.</p>
<h2 id="Search-within-a-room" class="common-anchor-header">البحث داخل غرفة<button data-href="#Search-within-a-room" class="anchor-icon" translate="no">
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
    </button></h2><p>تُعد مرشحات الغرف مفيدة عندما تظهر المفاهيم ذات الصلة في جميع أنحاء المجموعة النصية. يبحث الاستعلام التالي في غرفة <code translate="no">filter</code> فقط عن طريقة لمطابقة المصطلحات المكافئة:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How can equivalent terms such as USA and United States match one another?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room filter \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>مخرجات مرجعية (قد تختلف النتائج):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How can equivalent terms such as USA and United States match one another?&quot;
Wing: milvus_analyzer_docs
Room: filter

[1] milvus_analyzer_docs / filter
    Source: synonym-filter.md
    Match: cosine_sim=0.765 bm25=2.573
[2] milvus_analyzer_docs / filter
    Source: stemmer-filter.md
[3] milvus_analyzer_docs / filter
    Source: stop-filter.md
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن تأتي النتيجة الأولى من <code translate="no">synonym-filter.md</code>. يتم تطبيق قيد الغرفة من خلال بيانات تعريف الأدراج قبل البحث المتجهي، لذا يتم استبعاد أدراج أدوات التقطيع وأدوات تحليل اللغة من هذا البحث.</p>
<h2 id="Search-for-exact-terms" class="common-anchor-header">البحث عن المصطلحات الدقيقة<button data-href="#Search-for-exact-terms" class="anchor-icon" translate="no">
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
    </button></h2><p>تجمع واجهة MemPalace CLI بين التشابه الدلالي وإشارات BM25 عند ترتيب المرشحين للبحث المتجهي. وبالتالي، يمكن لأسماء التكوينات وأسماء الميزات الدقيقة تحسين الترتيب دون الحاجة إلى التبديل إلى وضع بحث CLI منفصل.</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;language_identifier tokenizer&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room tokenizer \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>إخراج مرجعي (قد تختلف الدرجات):</p>
<pre><code translate="no" class="language-text">Results for: &quot;language_identifier tokenizer&quot;
Wing: milvus_analyzer_docs
Room: tokenizer

[1] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
    Match: cosine_sim=0.420 bm25=0.969
[2] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
[3] milvus_analyzer_docs / tokenizer
    Source: lindera-tokenizer.md
<button class="copy-code-btn"></button></code></pre>
<p>ينبغي أن تفضل النتائج <code translate="no">language-identifier.md</code> ، الذي يوثق أداة التقطيع <code translate="no">language_identifier</code> المستخدمة لاختيار أدوات التحليل بناءً على اللغة المكتشفة.</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">فحص مجموعات Milvus<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>يدير MemPalace مخطط Milvus الخاص به تلقائيًا. للتأكد مما تم تخزينه، احفظ البرنامج النصي التالي باسم <code translate="no">inspect_milvus.py</code>. يفتح هذا البرنامج النصي قاعدة بيانات Milvus Lite نفسها، ويفحص المجموعات، ويحسب عدد الأدراج حسب الغرفة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> Counter

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


client = MilvusClient(uri=os.environ[<span class="hljs-string">&quot;MEMPALACE_MILVUS_LITE_PATH&quot;</span>])

<span class="hljs-keyword">for</span> collection_name <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(client.list_collections()):
    stats = client.get_collection_stats(collection_name)
    schema = client.describe_collection(collection_name)
    fields = [field[<span class="hljs-string">&quot;name&quot;</span>] <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> schema[<span class="hljs-string">&quot;fields&quot;</span>]]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{collection_name}</span>: rows=<span class="hljs-subst">{stats[<span class="hljs-string">&#x27;row_count&#x27;</span>]}</span>, fields=<span class="hljs-subst">{fields}</span>&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;mempalace_drawers&quot;</span>)
rows = client.query(
    collection_name=<span class="hljs-string">&quot;mempalace_drawers&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;metadata[&quot;wing&quot;] == &quot;milvus_analyzer_docs&quot;&#x27;</span>,
    limit=<span class="hljs-number">2000</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
)
room_counts = Counter(row[<span class="hljs-string">&quot;metadata&quot;</span>][<span class="hljs-string">&quot;room&quot;</span>] <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Drawers by room:&quot;</span>, <span class="hljs-built_in">dict</span>(<span class="hljs-built_in">sorted</span>(room_counts.items())))
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل البرنامج النصي باستخدام نفس مجموعة التبعيات الاختيارية التي تستخدمها واجهة سطر الأوامر (CLI):</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_LITE_PATH=&quot;$PALACE_DIR/milvus.db&quot;
uv run --with &quot;mempalace[milvus]&quot; inspect_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>إخراج مرجعي:</p>
<pre><code translate="no" class="language-text">mempalace_closets: rows=74, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
mempalace_drawers: rows=473, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
Drawers by room: {&#x27;analyzer&#x27;: 212, &#x27;filter&#x27;: 156, &#x27;tokenizer&#x27;: 105}
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لمقتطف الوثائق الذي تم اختباره، احتوى الملف <code translate="no">mempalace_drawers</code> على 473 صفًا، واحتوى الملف <code translate="no">mempalace_closets</code> على 74 سجلًا للتنقل الداخلي. لا يلزم أن يتطابق عدد الخزائن مع عدد الأدراج. أظهرت بيانات تعريف الأدراج وجود 212 درجًا في <code translate="no">analyzer</code> ، و156 درجًا في <code translate="no">filter</code> ، و105 أدراج في <code translate="no">tokenizer</code>.</p>
<p>يتم تشغيل هذا الفحص في عملية جديدة ويعيد فتح قاعدة البيانات التي أنشأتها واجهة سطر الأوامر (CLI)، مما يؤكد أيضًا أن البيانات تبقى محفوظة عبر الأوامر المختلفة.</p>
<h2 id="Optional-use-Milvus-server-or-Zilliz-Cloud" class="common-anchor-header">اختياري: استخدم خادم Milvus أو Zilliz Cloud<button data-href="#Optional-use-Milvus-server-or-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة للنشر المشترك، قم بتعيين متغيرات بيئة اتصال Milvus قبل تشغيل نفس أوامر MemPalace CLI. اتركها غير معينة لاستخدام قاعدة بيانات Milvus Lite المحلية الموضحة أعلاه.</p>
<p>بالنسبة لخادم Milvus:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;http://localhost:19530&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ Zilliz Cloud:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;https://your-cluster.api.region.zillizcloud.com&quot;
export MEMPALACE_MILVUS_TOKEN=&quot;your-api-key&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>تم التحقق من صحة الأوامر من البداية إلى النهاية في هذا البرنامج التعليمي باستخدام Milvus Lite. تعد إعدادات الخادم والسحابة المذكورة أعلاه تكوينات نشر اختيارية ولم تكن مطلوبة للتحقق من الصحة محليًا.</p>
<h2 id="Conclusion" class="common-anchor-header">الخلاصة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر MemPalace للوكلاء طريقة منظمة للحفاظ على معرفة المشروع: حيث يفصل «الجناح» المجموعة النصية، وتوفر «الغرف» نطاقًا على مستوى الموضوع، وتحتفظ «الأدراج» بالنص المصدر الأصلي. في هذا المثال، تتحول 31 صفحة من وثائق Milvus المترابطة بشكل وثيق إلى مئات الأدراج القابلة للبحث بدلاً من بضعة سجلات مكتوبة بخط اليد. يوفر Milvus تخزينًا دائمًا للمتجهات، والبيانات المتفرقة، والنصوص، والبيانات الوصفية خلف تلك البنية.</p>
