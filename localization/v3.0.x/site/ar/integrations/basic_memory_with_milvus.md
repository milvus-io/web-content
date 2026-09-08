---
id: basic_memory_with_milvus.md
summary: >-
  في هذا الدرس التعليمي، سنقوم بإنشاء مشروع صغير خاص بالذاكرة لفريق تطوير
  التطبيقات. وسنقوم بتسجيل ملاحظات حول التخزين المؤقت، والمصادقة، وعمليات النشر،
  والنسخ الاحتياطي، ثم استرجاع الملاحظة المطلوبة باستخدام البحث الدلالي والبحث
  المختلط.
title: بناء ذاكرة مشروع دلالية باستخدام Basic Memory و Milvus
---
<h1 id="Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="common-anchor-header">بناء ذاكرة مشروع دلالية باستخدام Basic Memory و Milvus<button data-href="#Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>يحتفظ<a href="https://github.com/basicmachines-co/basic-memory">Basic Memory</a> بمعرفة المشروع في ملفات Markdown عادية ويجعلها متاحة عبر واجهة سطر الأوامر (CLI) وخادم MCP. وهذا يوفر لمطور البرمجيات مكانًا دائمًا لتسجيل القرارات ودلائل التشغيل والدروس المستفادة التي يجب أن تبقى متاحة بعد انتهاء المحادثة.</p>
<p>في هذا البرنامج التعليمي، سنقوم ببناء مشروع ذاكرة صغير لفريق تطبيق. سنسجل ملاحظات حول التخزين المؤقت والمصادقة وعمليات النشر والنسخ الاحتياطي، ثم نسترجع الملاحظة الصحيحة باستخدام البحث الدلالي والمختلط.</p>
<p>سيقوم<a href="https://milvus.io/">Milvus</a> بتخزين المتجهات وإجراء البحث عن التشابه. سيستمر Basic Memory في إدارة ملاحظات Markdown وبيانات تعريف المشروع والبحث عن النص الكامل وقائمة المتجهات في PostgreSQL.</p>
<pre><code translate="no" class="language-text">Markdown notes
      |
      v
Basic Memory CLI / MCP
      |-- PostgreSQL: projects, metadata, full-text search, vector manifest
      |-- OpenAI: embeddings
      `-- Milvus: vector persistence and similarity search
<button class="copy-code-btn"></button></code></pre>
<p>يستخدم هذا البرنامج التعليمي Milvus Lite، الذي يعمل محليًّا في مسار على جهازك. ويمكن أن يشير نفس تكوين Basic Memory لاحقًا إلى Milvus Standalone أو Milvus Distributed أو Zilliz Cloud.</p>
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
    </button></h2><p>تحتاج إلى:</p>
<ul>
<li>Python 3.12 أو إصدار أحدث</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>قاعدة بيانات PostgreSQL وعنوان URL الخاص باتصالها عبر <code translate="no">postgresql+asyncpg://...</code> </li>
<li>مفتاح API لـ OpenAI</li>
</ul>
<p>قم بتثبيت Basic Memory مع التبعيات الاختيارية لـ Milvus من PyPI:</p>
<pre><code translate="no" class="language-bash">uv tool install --python 3.12 <span class="hljs-string">&quot;basic-memory[milvus]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Basic-Memory" class="common-anchor-header">تكوين Basic Memory<button data-href="#Configure-Basic-Memory" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء مساحة عمل للبرنامج التعليمي. إن الاحتفاظ بتكوين Basic Memory وبيانات Milvus Lite هنا يجعل من السهل فحص المثال وإزالته لاحقًا.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> -p basic-memory-milvus-demo/notes
<span class="hljs-built_in">cd</span> basic-memory-milvus-demo

<span class="hljs-built_in">export</span> BASIC_MEMORY_CONFIG_DIR=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/.basic-memory&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بتكوين PostgreSQL كقاعدة البيانات الأساسية، و OpenAI كمزود التضمين، و Milvus كفهرس متجهي:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_BACKEND=postgres
<span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_URL=<span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_VECTOR_INDEX=milvus
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/basic-memory-vectors.db&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER=openai
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL=text-embedding-3-small
<span class="hljs-built_in">export</span> OPENAI_API_KEY=<span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>هنا، يُعد <code translate="no">BASIC_MEMORY_MILVUS_URI</code> مسارًا محليًّا، لذا يقوم PyMilvus بتشغيل Milvus Lite تلقائيًّا. ولا يلزم وجود خادم Milvus منفصل.</p>
<p>يُعد Milvus اختياريًا في «الذاكرة الأساسية» ككل، ولكنه الخلفية المتجهة المحددة في هذا البرنامج التعليمي. لا ينطبق هذا الاختيار حاليًا إلا عندما تكون الخلفية الأساسية لقاعدة البيانات هي PostgreSQL. تستخدم مشاريع «الذاكرة الأساسية» القائمة على SQLite <code translate="no">sqlite-vec</code> بدلاً من ذلك.</p>
<h2 id="Create-a-memory-project" class="common-anchor-header">إنشاء مشروع "الذاكرة"<button data-href="#Create-a-memory-project" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم مشروع Basic Memory بتعيين اسم إلى دليل يحتوي على ملاحظات Markdown. أضف دليل البرنامج التعليمي كمشروع واجعله هو الافتراضي:</p>
<pre><code translate="no" class="language-bash">bm project add app-memory <span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/notes&quot;</span> --default
<button class="copy-code-btn"></button></code></pre>
<p>أصبح لدى فريق التطبيق الآن مساحة ذاكرة دائمة. دعونا نملأها بكتالوج صغير ومختلط. ستكون بعض الملاحظات ذات صلة بأسئلتنا اللاحقة، بينما توفر ملاحظات أخرى عوامل تشتيت واقعية.</p>
<h2 id="Record-project-memories" class="common-anchor-header">تسجيل ذكريات المشروع<button data-href="#Record-project-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>ابدأ بقرار التخزين المؤقت للتطبيق:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Caching Strategy&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Caching Strategy</span>

The application caches read-heavy product responses <span class="hljs-keyword">in</span> Redis <span class="hljs-keyword">for</span> five minutes. This avoids repeated database queries and makes repeated requests faster. Cache entries are invalidated immediately after a write.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>سجل كيفية التعامل مع رموز المصادقة:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Authentication Tokens&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Authentication Tokens</span>

JWT access tokens expire after fifteen minutes. Refresh tokens rotate on every use. After suspicious activity, revoke the entire token family and require the user to sign <span class="hljs-keyword">in</span> again.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>أضف دليلين تشغيليين:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Deployment Reliability&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Deployment Reliability</span>

Production releases use a canary deployment. Readiness probes must pass before traffic shifts, and the rollout automatically stops when the error rate crosses the agreed threshold.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Database Backups&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Database Backups</span>

PostgreSQL uses daily snapshots and continuous write-ahead <span class="hljs-built_in">log</span> archiving. The team runs a restore drill every month and records the recovery point and recovery time.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>أخيرًا، أضف ملاحظتين غير مرتبطتين بالمنتج. فهذه الملاحظات تجعل عملية البحث أكثر تمثيلاً مقارنة بفهرس تكون فيه كل وثيقة ذات صلة:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;UI Accessibility&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># UI Accessibility</span>

The settings screen must support keyboard navigation, visible focus states, sufficient color contrast, and descriptive labels <span class="hljs-keyword">for</span> screen readers.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Content Planning&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Content Planning</span>

The content calendar tracks blog drafts, launch screenshots, reviewers, and publication dates <span class="hljs-keyword">for</span> the next product release.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>تظل كل ملاحظة ملف Markdown عاديًا في <code translate="no">notes/</code>. يضيف Basic Memory البنية القابلة للبحث دون انتزاع الملكية من نظام الملفات.</p>
<h2 id="Build-the-search-indexes" class="common-anchor-header">قم بإنشاء فهارس البحث<button data-href="#Build-the-search-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإجراء إعادة فهرسة كاملة بعد إضافة مجموعة من الملاحظات أو إجراء تغييرات جوهرية عليها:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<p>خلال هذه الخطوة، يقوم Basic Memory بما يلي:</p>
<ol>
<li>تقوم بقراءة ملاحظات Markdown وتقسيمها إلى أجزاء.</li>
<li>تقوم بإنشاء فهرس النص الكامل في PostgreSQL.</li>
<li>ترسل الأجزاء إلى نموذج التضمين OpenAI المُهيأ.</li>
<li>تخزين المتجهات الناتجة في مجموعة Milvus الخاصة بالمشروع.</li>
<li>تضع علامة "جاهز" على الأجزاء التي تم تخزينها بنجاح في قائمة المتجهات الخاصة بـ PostgreSQL.</li>
</ol>
<p>يستخدم Basic Memory مجموعة Milvus حتمية لكل مشروع. لا تحتاج إلى إنشاء المجموعة أو تسميتها بنفسك.</p>
<h2 id="Retrieve-a-memory-by-meaning" class="common-anchor-header">استرجاع الذاكرة حسب المعنى<button data-href="#Retrieve-a-memory-by-meaning" class="anchor-icon" translate="no">
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
    </button></h2><p>لنفترض أن مهندسًا جديدًا يتذكر أن التطبيق يحتوي على تحسين للطلبات المتكررة، لكنه لا يتذكر أن الفريق أطلق عليه اسم «استراتيجية التخزين المؤقت».</p>
<p>استخدم البحث المتجه لطرح السؤال باللغة الطبيعية:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;How does the application make repeated requests faster?&quot;</span> \
  --vector \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Caching Strategy</code> يجب أن تكون النتيجة الأولى حتى وإن لم يكن من الضروري تكرار عنوان الملاحظة في الاستعلام. يقوم البحث المتجه بتضمين السؤال ويطلب من Milvus أقرب الأجزاء المخزنة.</p>
<p>قد تختلف الدرجات الدقيقة والنتائج ذات الترتيب الأدنى باختلاف نموذج التضمين ومحتويات المشروع.</p>
<h2 id="Combine-semantic-and-keyword-signals" class="common-anchor-header">دمج الإشارات الدلالية وإشارات الكلمات المفتاحية<button data-href="#Combine-semantic-and-keyword-signals" class="anchor-icon" translate="no">
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
    </button></h2><p>تخيل الآن الاستجابة لحادث أمني. يحتوي الاستعلام على مصطلحات دقيقة مثل « <code translate="no">JWT</code> » (إلغاء الرمز المميز)، لكننا نريد أيضًا لغة ذات صلة من الناحية المفاهيمية حول إلغاء الرمز المميز وتسجيل الدخول مرة أخرى.</p>
<p>استخدم البحث الهجين:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;JWT rotation after suspicious activity&quot;</span> \
  --hybrid \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Authentication Tokens</code> يجب أن تكون النتيجة الأولى. يجمع «Basic Memory» بين استرجاع النص الكامل في PostgreSQL واسترجاع المتجهات في Milvus، مما يمنح الأولوية للمحتوى القوي في أي من المسارين، وخاصة المحتوى الذي يتم العثور عليه في كليهما.</p>
<p>تتميز أوضاع البحث الثلاثة بمزايا مختلفة:</p>
<table>
<thead>
<tr><th>الوضع</th><th>علامة الأمر</th><th>أفضل استخدام</th></tr>
</thead>
<tbody>
<tr><td>النص الكامل</td><td>لا يوجد علامة الوضع</td><td>استعلامات المصطلحات والعبارات الدقيقة والكلمات الرئيسية المنطقية</td></tr>
<tr><td>المتجه</td><td><code translate="no">--vector</code></td><td>الإعادة الصياغة والمفاهيم والأسئلة الاستكشافية</td></tr>
<tr><td>مختلط</td><td><code translate="no">--hybrid</code></td><td>الاسترجاع للأغراض العامة باستخدام كل من الكلمات المفتاحية والإشارات الدلالية</td></tr>
</tbody>
</table>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">استخدام نسخة أخرى من Milvus<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>لا يتغير كود التطبيق وأوامر الذاكرة الأساسية عندما تتجاوز سعة Milvus Lite. قم بتغيير عنوان URI، وقدم رمزًا مميزًا عند الحاجة.</p>
<p>بالنسبة لخادم Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ Zilliz Cloud:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;https://YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;YOUR_API_KEY&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء مجموعة هدف جديدة أو اتبع إجراء ترحيل مخزن المتجهات في Basic Memory قبل تبديل مشروع موجود بين الخلفيات المتجهة. ثم أعد بناء المتجهات:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-same-memory-through-MCP" class="common-anchor-header">استخدم نفس الذاكرة عبر MCP<button data-href="#Use-the-same-memory-through-MCP" class="anchor-icon" translate="no">
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
    </button></h2><p>تعد واجهة سطر الأوامر (CLI) مفيدة للإعداد والصيانة وكتابة البرامج النصية وفهم تدفق البيانات. في العمل اليومي، يمكن لعميل MCP تشغيل نفس خدمة Basic Memory واستدعاء أدوات مثل <code translate="no">write_note</code> و <code translate="no">search_notes</code> و <code translate="no">build_context</code> مباشرةً.</p>
<p>على سبيل المثال، يمكن لتكوين Codex MCP تشغيل الأمر الذي تم تثبيته بواسطة <code translate="no">uv tool</code>:</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[mcp_servers.basic-memory]</span>
<span class="hljs-attr">command</span> = <span class="hljs-string">&quot;basic-memory&quot;</span>
<span class="hljs-attr">args</span> = [<span class="hljs-string">&quot;mcp&quot;</span>]

<span class="hljs-section">[mcp_servers.basic-memory.env]</span>
<span class="hljs-attr">BASIC_MEMORY_CONFIG_DIR</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_BACKEND</span> = <span class="hljs-string">&quot;postgres&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_URL</span> = <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED</span> = <span class="hljs-string">&quot;true&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_VECTOR_INDEX</span> = <span class="hljs-string">&quot;milvus&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_MILVUS_URI</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER</span> = <span class="hljs-string">&quot;openai&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL</span> = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
<span class="hljs-attr">OPENAI_API_KEY</span> = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تستخدم عملاء MCP الآخرون نفس الملف القابل للتنفيذ والوسائط بتنسيق JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;basic-memory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;basic-memory&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;mcp&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_CONFIG_DIR&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_BACKEND&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgres&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_URL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_VECTOR_INDEX&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_MILVUS_URI&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openai&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text-embedding-3-small&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;OPENAI_API_KEY&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sk-***********&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>احتفظ بكلمات مرور قواعد البيانات ومفاتيح واجهة برمجة التطبيقات (API) في نظام إدارة الأسرار الخاص بالعميل أو بيئة التشغيل كلما أمكن ذلك. الشرط المهم هو أن تتلقى عملية MCP نفس تكوين الذاكرة الأساسية (Basic Memory) الذي تستخدمه واجهة سطر الأوامر (CLI).</p>
<h2 id="What-each-storage-layer-owns" class="common-anchor-header">ما تمتلكه كل طبقة تخزين<button data-href="#What-each-storage-layer-owns" class="anchor-icon" translate="no">
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
    </button></h2><p>في نهاية البرنامج التعليمي، يتم الفصل بين المسؤوليات بشكل متعمد:</p>
<ul>
<li>يمتلك دليل المشروع ملاحظات Markdown الأصلية.</li>
<li>يمتلك PostgreSQL مشاريع Basic Memory، والكيانات، والبيانات الوصفية، وفهرس النص الكامل، وقائمة المتجهات الموثوقة.</li>
<li>تقوم OpenAI بتحويل أجزاء الملاحظات وأسئلة البحث إلى تضمينات.</li>
<li>تمتلك Milvus استمرارية المتجهات واسترجاع أقرب الجيران.</li>
<li>تقوم Basic Memory بتنسيق الطبقات وتوفر تجربة واحدة لواجهة سطر الأوامر (CLI) وواجهة MCP.</li>
</ul>
<p>وبالتالي، لا يحل Milvus محل PostgreSQL في هذا التكامل. بل يحل محل مسار PostgreSQL <code translate="no">pgvector</code> لتخزين المتجهات والبحث عن التشابه، بينما تظل بقية ميزات Basic Memory العلائقية والنصية الكاملة في PostgreSQL.</p>
