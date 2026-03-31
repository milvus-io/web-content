---
id: milvus_for_agents.md
title: ميلفوس لوكلاء الذكاء الاصطناعي
summary: >-
  تعلّم كيف يمكن لوكلاء الذكاء الاصطناعي استخدام Milvus كقاعدة بيانات متجهة لـ
  RAG والبحث الدلالي والذاكرة طويلة المدى.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">ميلفوس لوكلاء الذكاء الاصطناعي<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر Milvus واجهات ملائمة للوكلاء تسمح لوكلاء ترميز الذكاء الاصطناعي وأنظمة الوكلاء المستقلة بالتفاعل مع قواعد البيانات المتجهة برمجيًا. سواء كنت تقوم ببناء خطوط أنابيب RAG أو البحث الدلالي أو أنظمة ذاكرة الوكلاء، تقدم Milvus طرقًا متعددة للوكلاء للاتصال والعمل.</p>
<h2 id="Agent-tools" class="common-anchor-header">أدوات الوكيل<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">مهارة ميلفوس</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">مهارة الوكيل لـ Claude Code التي تعلم الوكلاء استخدام PyMilvus لعمليات قواعد البيانات المتجهة.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">خادم MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">خادم بروتوكول سياق النموذج الذي يتيح لأي وكيل متوافق مع MCP التفاعل مع ميلفوس مباشرة.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">كلود سياق كلود MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">خادم MCP مصمم لـ Claude Code، يوفر الوصول إلى وثائق Milvus المدركة للسياق.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ar/integrations_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">أطر عمل الوكلاء</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">التكامل مع LangChain، وLlamaIndex، وOpenAI Agents، وأطر عمل تنسيق الوكلاء الأخرى.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">مطالبات الذكاء الاصطناعي<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>المطالبات المنسقة التي تساعد مساعدي ترميز الذكاء الاصطناعي على كتابة كود ميلفوس الصحيح. تقوم كل مطالبة بترميز القواعد والأنماط التي تمنع الأخطاء الأكثر شيوعًا.</p>
<p><strong>كيفية الاستخدام:</strong></p>
<ol>
<li><strong>انسخ</strong> مطالبة من قسم "المطالبة الكاملة" في أي صفحة مطالبة.</li>
<li><strong>احفظه</strong> في الملف الذي تتوقعه أداة الذكاء الاصطناعي لديك (انظر <a href="#use-in-different-environments">جدول البيئات</a> أدناه).</li>
<li>سيقوم مساعد الذكاء الاصطناعي الخاص بك بتطبيق القواعد تلقائيًا عند إنشاء أو مراجعة كود Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">صفحات المطالبة<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ar/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">قواعد المستوى الأعلى لأي عامل ترميز ذكاء اصطناعي. ابدأ هنا إذا كنت تريد ملفًا واحدًا فقط.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">بايثون SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">أنماط الاتصال الصحيحة، واستخدام MilvusClient، وحظر واجهة برمجة تطبيقات ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">تصميم المخطط</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">أنواع الحقول والمفاتيح الأساسية وثبات المخطط وتكوين BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ar/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">أنماط البحث</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">ANN، والهجين، والبحث بالنص الكامل مع قواعد القيد الحرجة.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">اختيار الفهرس</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">شجرة القرار لـ AUTOINDEX و HNSW و DiskANN و IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">خط أنابيب RAG</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">تدفق التوليد المعزز للاسترجاع من النهاية إلى النهاية مع Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">الاستخدام في بيئات مختلفة<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>البيئة</th><th>مكان وضع المطالبة</th><th>التعليمات</th></tr>
</thead>
<tbody>
<tr><td>المؤشر</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">تكوين قواعد المشروع</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">تعليمات مخصصة</a></td></tr>
<tr><td>كود كلود</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">مستندات كلود كود</a></td></tr>
<tr><td>إرشادات JetBrains IDEs</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">تخصيص الإرشادات</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">مختبر كود الجوزاء CLI</a></td></tr>
<tr><td>كود VS</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">تكوين .instructions.md الإرشادات</a></td></tr>
<tr><td>إرشادات .md</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">تكوين الإرشادات.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">النشر الموصى به للوكلاء<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>يعتمد اختيار النشر المناسب لـ Milvus على مرحلة التطوير الخاصة بك.</p>
<table>
<thead>
<tr><th>المرحلة</th><th>النشر</th><th>لماذا</th></tr>
</thead>
<tbody>
<tr><td>النماذج الأولية</td><td><a href="/docs/ar/milvus_lite.md">ميلفوس لايت</a></td><td>بدون تكوين، في طور التشغيل. يعمل في أي مكان يعمل فيه Python - مثالي للنماذج الأولية السريعة للوكيل.</td></tr>
<tr><td>التطوير</td><td><a href="/docs/ar/install_standalone-docker.md">ميلفوس مستقل</a></td><td>نشر Docker أحادي العقدة. جيد للتطوير والاختبار المحلي بأحجام بيانات واقعية.</td></tr>
<tr><td>الإنتاج</td><td><a href="https://cloud.zilliz.com/signup">زيليز كلاود</a></td><td>مُدار بالكامل، ميلفوس بدون خادم. لا توجد بنية تحتية لإدارتها - الوكلاء فقط يتصلون ويعملون.</td></tr>
<tr><td>إنتاج ذاتي الاستضافة</td><td><a href="/docs/ar/install_cluster-helm.md">ميلفوس الموزعة</a></td><td>نشر Kubernetes متعدد العقد للفرق التي تحتاج إلى تحكم كامل في بنيتها التحتية.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>بالنسبة لأحمال عمل الوكلاء، يوصى باستخدام <strong>Zilliz Cloud</strong> للاستخدام في الإنتاج. لا يدير الوكلاء عادةً البنية التحتية، لذا فإن النشر بدون خادم يلغي النفقات التشغيلية ويوفر التوسع التلقائي.</p>
</div>
<h2 id="Quick-connection-examples" class="common-anchor-header">أمثلة اتصال سريع<button data-href="#Quick-connection-examples" class="anchor-icon" translate="no">
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
    </button></h2><p>الاتصال بـ Milvus من رمز الوكيل الخاص بك:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite (local, zero-config)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_agent.db&quot;</span>)

<span class="hljs-comment"># Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Zilliz Cloud</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_URI&quot;</span>,
    token=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_TOKEN&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
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
<li><a href="/docs/ar/quickstart.md">بداية سريعة</a> - قم بتشغيل أول بحث لك في Milvus في دقائق.</li>
<li><a href="/docs/ar/integrations_overview.md">تكاملات إطار عمل الوكيل</a> - قم بتوصيل Milvus مع LangChain وLlamaIndex وOpenAI Agents والمزيد.</li>
</ul>
