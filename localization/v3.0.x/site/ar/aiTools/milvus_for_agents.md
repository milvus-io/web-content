---
id: milvus_for_agents.md
title: Milvus لوكلاء الذكاء الاصطناعي
summary: >-
  تعرف على كيفية استخدام وكلاء الذكاء الاصطناعي لـ Milvus كقاعدة بيانات متجهة
  لتقنية RAG والبحث الدلالي والذاكرة طويلة المدى.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus لوكلاء الذكاء الاصطناعي<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر Milvus واجهات سهلة الاستخدام للوكلاء، تتيح لوكلاء البرمجة في مجال الذكاء الاصطناعي وأنظمة الوكلاء المستقلة التفاعل مع قواعد البيانات المتجهة برمجياً. وسواء كنت تعمل على إنشاء مسارات RAG أو البحث الدلالي أو أنظمة ذاكرة الوكلاء، فإن Milvus يوفر طرقاً متعددة للوكلاء للاتصال والعمل.</p>
<h2 id="Agent-tools" class="common-anchor-header">أدوات الوكلاء<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">مهارة Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">مهارة وكيل لـ Claude Code تُعلّم نماذج اللغة الكبيرة (LLMs) استخدام PyMilvus لإجراء عمليات قواعد البيانات المتجهة.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">خادم MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">خادم بروتوكول سياق النموذج (MCP) الذي يتيح لأي وكيل متوافق مع MCP التفاعل مع Milvus مباشرةً.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP سياق كلود</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">خادم MCP مصمم لـ Claude Code، ويوفر وصولاً إلى وثائق Milvus مع مراعاة السياق.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">توجيهات الذكاء الاصطناعي<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>توجيهات مختارة بعناية تساعد مساعدي البرمجة بالذكاء الاصطناعي على كتابة كود Milvus الصحيح. كل توجيه يشمل القواعد والأنماط التي تمنع الأخطاء الأكثر شيوعًا.</p>
<p><strong>كيفية الاستخدام:</strong></p>
<ol>
<li><strong>انسخ</strong> موجهًا من قسم "الموجه الكامل" في أي صفحة موجه.</li>
<li><strong>احفظها</strong> في الملف الذي تتوقعه أداة الذكاء الاصطناعي الخاصة بك (انظر <a href="#use-in-different-environments">جدول البيئات</a> أدناه).</li>
<li>سيقوم مساعد الذكاء الاصطناعي الخاص بك بتطبيق القواعد تلقائيًا عند إنشاء كود Milvus أو مراجعته.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">صفحات التوجيهات<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">قواعد المستوى الأعلى لأي وكيل برمجة بالذكاء الاصطناعي. ابدأ من هنا إذا كنت تريد ملفًا واحدًا فقط.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">مجموعة أدوات تطوير البرامج (SDK) بلغة Python</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">أنماط الاتصال الصحيحة، واستخدام MilvusClient، وحظر واجهة برمجة تطبيقات ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">تصميم المخطط</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">أنواع الحقول، والمفاتيح الأساسية، وثبات المخطط، وتكوين BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ar/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">أنماط البحث</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">البحث باستخدام الشبكات العصبية الاصطناعية (ANN)، والبحث الهجين، والبحث عن النص الكامل مع قواعد القيود الحاسمة.</p>
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">مسار RAG</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">تدفق توليد معزز بالاسترجاع من البداية إلى النهاية باستخدام Milvus.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ar/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Node.js SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">استدعاءات طرق MilvusClient، وتعريفات الحقول، وفحوصات حالة الاستجابة، وأشكال نتائج البحث.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Go SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">مسارات وحدات Go SDK الإصدار 3، ومهلات الاتصال، وتحميل المجموعات، ومجموعات نتائج البحث.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ar/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">واجهة برمجة التطبيقات RESTful v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">نقاط النهاية في الإصدار v2، وحقول الطلبات المكتوبة بأسلوب camelCase، والتحقق من رموز الاستجابة، واستقصاء حالة التحميل.</p>
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
<tr><td>كود كلود</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">وثائق Claude Code</a></td></tr>
<tr><td>بيئات تطوير JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">إرشادات التخصيص</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">مختبر برمجة Gemini CLI</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">تكوين ملف .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">تكوين guidelines.md</a></td></tr>
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
    </button></h2><p>يعتمد اختيار طريقة النشر المناسبة لـ Milvus على مرحلة التطوير التي تمر بها.</p>
<table>
<thead>
<tr><th>المرحلة</th><th>طريقة النشر</th><th>السبب</th></tr>
</thead>
<tbody>
<tr><td>النماذج الأولية</td><td><a href="/docs/ar/milvus_lite.md">Milvus Lite</a></td><td>لا يحتاج إلى تكوين، ويعمل أثناء التشغيل. يعمل في أي مكان يعمل فيه Python — وهو مثالي لإنشاء نماذج أولية سريعة للوكلاء.</td></tr>
<tr><td>التطوير</td><td><a href="/docs/ar/install_standalone-docker.md">Milvus Standalone</a></td><td>نشر Docker على عقدة واحدة. مناسب للتطوير المحلي والاختبار باستخدام أحجام بيانات واقعية.</td></tr>
<tr><td>الإنتاج</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Milvus مُدار بالكامل وبدون خادم. لا توجد بنية تحتية لإدارتها — حيث يتصل الوكلاء ويعملون فحسب.</td></tr>
<tr><td>الإنتاج ذاتي الاستضافة</td><td><a href="/docs/ar/install_cluster-helm.md">Milvus الموزع</a></td><td>نشر Kubernetes متعدد العقد للفرق التي تحتاج إلى تحكم كامل في بنيتها التحتية.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>بالنسبة لأحمال عمل الوكلاء، يُوصى باستخدام <strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong> في بيئة الإنتاج. لا يدير الوكلاء عادةً البنية التحتية، لذا فإن النشر بدون خادم يلغي التكاليف التشغيلية الإضافية ويوفر التوسع التلقائي.</p>
</div>
