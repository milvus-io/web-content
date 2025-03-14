---
id: milvus_and_mcp.md
summary: >-
  يرشدك هذا البرنامج التعليمي إلى كيفية إعداد خادم MCP لـ Milvus، مما يسمح
  لتطبيقات الذكاء الاصطناعي بإجراء عمليات بحث متجهة وإدارة المجموعات واسترداد
  البيانات باستخدام أوامر اللغة الطبيعية - دون كتابة استعلامات قاعدة بيانات
  مخصصة.
title: تكامل Milvus مع MindsDB
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + ميلفوس: ربط الذكاء الاصطناعي بقواعد بيانات المتجهات<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">مقدمة<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>بروتوكول سياق النموذج (MCP</strong> ) هو بروتوكول مفتوح يمكّن تطبيقات الذكاء الاصطناعي، مثل Claude وCursor، من التفاعل مع مصادر البيانات الخارجية والأدوات بسلاسة. سواءً كنت تقوم بإنشاء تطبيقات ذكاء اصطناعي مخصصة، أو دمج مهام سير عمل الذكاء الاصطناعي، أو تحسين واجهات الدردشة، يوفر بروتوكول سياق النموذج طريقة موحدة لربط النماذج اللغوية الكبيرة (LLMs) بالبيانات السياقية ذات الصلة.</p>
<p>يرشدك هذا البرنامج التعليمي خلال <strong>إعداد خادم MCP لـ Milvus،</strong> مما يسمح لتطبيقات الذكاء الاصطناعي بإجراء عمليات بحث متجهة وإدارة المجموعات واسترداد البيانات باستخدام <strong>أوامر اللغة الطبيعية - دون</strong>كتابة استعلامات قاعدة بيانات مخصصة.</p>
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
    </button></h2><p>قبل إعداد خادم MCP، تأكد من أن لديك:</p>
<ul>
<li>بايثون 3.10 أو أعلى</li>
<li>مثيل <a href="https://milvus.io/">ميلفوس</a> قيد التشغيل</li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (موصى به لتشغيل الخادم)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">الشروع في العمل<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>الطريقة الموصى بها لاستخدام خادم MCP هي تشغيله مباشرةً باستخدام uv دون تثبيت. هكذا تم تكوين كل من Claude Desktop و Cursor لاستخدامه في الأمثلة أدناه.</p>
<p>إذا كنت تريد استنساخ المستودع:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>عندها يمكنك تشغيل الخادم مباشرة:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">التطبيقات المدعومة<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن استخدام خادم MCP هذا مع العديد من تطبيقات الذكاء الاصطناعي التي تدعم بروتوكول سياق النموذج، مثل:</p>
<ul>
<li><strong>سطح مكتب كلود</strong>: تطبيق أنثروبيك لسطح المكتب لكلود</li>
<li><strong>Cursor</strong>: محرر التعليمات البرمجية المدعوم بالذكاء الاصطناعي مع دعم MCP في ميزة Composer الخاصة به</li>
<li><strong>عملاء MCP المخصصين الآخرين</strong> أي تطبيق يطبق مواصفات عميل MCP</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">استخدام MCP مع Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>تثبيت <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>افتح ملف تكوين كلود:<ul>
<li>على نظام macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>أضف التكوين التالي:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>أعد تشغيل Claude Desktop لتطبيق التغييرات.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">استخدام MCP مع المؤشر<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم<a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> أيضًا أدوات MCP من خلال ميزة الوكيل في Composer. يمكنك إضافة خادم Milvus MCP إلى Cursor بطريقتين:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">الخيار 1: استخدام واجهة مستخدم إعدادات المؤشر</h3><ol>
<li>افتح <code translate="no">Cursor Settings</code> ← <code translate="no">Features</code> ← <code translate="no">MCP</code>.</li>
<li>انقر <code translate="no">+ Add New MCP Server</code>.</li>
<li>املأ:<ul>
<li>اكتب: <code translate="no">stdio</code></li>
<li>الاسم: <code translate="no">milvus</code></li>
<li>الأمر:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ نصيحة: استخدم <code translate="no">127.0.0.1</code> بدلاً من <code translate="no">localhost</code> لتجنب مشاكل دقة DNS المحتملة.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">الخيار 2: استخدام التكوين الخاص بالمشروع (موصى به)</h3><ol>
<li>قم بإنشاء ملف <code translate="no">.cursor/mcp.json</code> في <strong>الدليل الجذر للمشروع</strong>:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>أعد تشغيل المؤشر لتطبيق التكوين.</li>
</ol>
<p>بعد إضافة الخادم، قد تحتاج إلى الضغط على زر التحديث في إعدادات MCP لملء قائمة الأدوات. سيستخدم وكيل Composer Agent تلقائيًا أدوات Milvus عندما تكون ذات صلة باستعلاماتك.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">التحقق من التكامل<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>للتأكد من إعداد خادم MCP بشكل صحيح:</p>
<h3 id="For-Cursor" class="common-anchor-header">بالنسبة للمؤشر</h3><ol>
<li>انتقل إلى <code translate="no">Cursor Settings</code> ← <code translate="no">Features</code> ← <code translate="no">MCP</code>.</li>
<li>تأكد من ظهور <code translate="no">&quot;Milvus&quot;</code> في قائمة خوادم MCP.</li>
<li>تحقق مما إذا كانت أدوات ملفوس (على سبيل المثال، <code translate="no">milvus_list_collections</code> ، <code translate="no">milvus_vector_search</code>) مدرجة.</li>
<li>إذا ظهرت أخطاء، راجع قسم <strong>استكشاف الأخطاء وإصلاحها</strong> أدناه.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">أدوات خادم MCP لـ Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر خادم MCP أدوات متعددة <strong>للبحث والاستعلام وإدارة بيانات المتجهات في ملفوس</strong>. لمزيد من التفاصيل، يرجى الرجوع إلى وثائق <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 أدوات البحث والاستعلام</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> ← البحث عن المستندات باستخدام البحث عن النص الكامل.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → إجراء بحث عن التشابه المتجه على مجموعة.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → إجراء بحث هجين يجمع بين تشابه المتجهات وتصفية السمات.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → إجراء بحث تشابه المتجهات باستخدام متجهات استعلام متعددة.</li>
<li><strong><code translate="no">milvus-query</code></strong> → الاستعلام عن المجموعة باستخدام تعبيرات التصفية.</li>
<li><strong><code translate="no">milvus-count</code></strong> → عد الكيانات في مجموعة.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 إدارة المجموعات</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → سرد كافة المجموعات في قاعدة البيانات.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → الحصول على معلومات مفصلة حول مجموعة ما.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → الحصول على إحصائيات حول مجموعة ما.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → إنشاء مجموعة جديدة بمخطط محدد.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → تحميل مجموعة في الذاكرة للبحث والاستعلام.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → تحرير مجموعة من الذاكرة.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → الحصول على معلومات حول مقاطع الاستعلام.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → الحصول على تقدم تحميل مجموعة.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 عمليات البيانات</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → إدراج البيانات في مجموعة.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → إدراج البيانات على دفعات للحصول على أداء أفضل.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → إدراج البيانات في مجموعة (إدراج أو تحديث إذا كانت موجودة).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → حذف كيانات من مجموعة استنادًا إلى تعبير مرشح.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → إضافة حقل ديناميكي إلى مجموعة موجودة.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ إدارة الفهرس</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → إنشاء فهرس على حقل متجه.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → الحصول على معلومات حول الفهارس في مجموعة.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">متغيرات البيئة<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → → URI لخادم ميلفوس (يمكن تعيينه بدلاً من <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → رمز المصادقة الاختياري.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → اسم قاعدة البيانات (افتراضي إلى "افتراضي").</li>
</ul>
<h2 id="Development" class="common-anchor-header">التطوير<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>لتشغيل الخادم مباشرة:</p>
<pre><code translate="no" class="language-bash">uv run server.<span class="hljs-property">py</span> --milvus-uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">أمثلة<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">استخدام سطح مكتب كلود</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">مثال 1: سرد المجموعات</h4><pre><code translate="no">What are the collections I have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>سيستخدم كلود بعد ذلك MCP للتحقق من هذه المعلومات على قاعدة بيانات ميلفوس.</p>
<pre><code translate="no">I&#x27;ll check what collections are available in your Milvus database.

&gt; View result from milvus-list-collections from milvus (local)

Here are the collections in your Milvus database:

1. rag_demo
2. test
3. chat_messages
4. text_collection
5. image_collection
6. customized_setup
7. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">مثال 2: البحث عن المستندات</h4><pre><code translate="no"><span class="hljs-title class_">Find</span> documents <span class="hljs-keyword">in</span> my text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيستخدم كلود إمكانيات البحث عن النص الكامل في ميلفوس للعثور على المستندات ذات الصلة:</p>
<pre><code translate="no">I&#x27;ll search for documents about machine learning in your text_collection.

&gt; View result from milvus-text-search from milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based on your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">استخدام المؤشر</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">مثال: إنشاء مجموعة</h4><p>يمكنك أن تطلب من Cursor في Cursor's Composer:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>سيستخدم المؤشر خادم MCP لتنفيذ هذه العملية:</p>
<pre><code translate="no">I<span class="hljs-string">&#x27;ll create a new collection called &#x27;</span>articles<span class="hljs-string">&#x27; with the specified fields.

&gt; View result from milvus-create-collection from milvus (local)

Collection &#x27;</span>articles<span class="hljs-string">&#x27; has been created successfully with the following schema:
- title: string
- content: string
- vector: float vector[128]
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">استكشاف الأخطاء وإصلاحها<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">المشكلات الشائعة</h3><h4 id="Connection-Errors" class="common-anchor-header">أخطاء الاتصال</h4><p>إذا رأيت أخطاء مثل &quot;فشل الاتصال بخادم ميلفوس&quot;:</p>
<ol>
<li>تحقق من تشغيل مثيل Milvus الخاص بك: <code translate="no">docker ps</code> (إذا كنت تستخدم Docker)</li>
<li>تحقق من صحة URI في التكوين الخاص بك</li>
<li>تأكد من عدم وجود قواعد جدار حماية تحجب الاتصال.</li>
<li>جرّب استخدام <code translate="no">127.0.0.1</code> بدلاً من <code translate="no">localhost</code> في URI.</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">مشاكل المصادقة</h4><p>إذا رأيت أخطاء في المصادقة</p>
<ol>
<li>تحقق من أن <code translate="no">MILVUS_TOKEN</code> الخاص بك صحيح</li>
<li>تحقق مما إذا كان مثيل ميلفوس الخاص بك يتطلب المصادقة</li>
<li>تأكد من حصولك على الأذونات الصحيحة للعمليات التي تحاول القيام بها</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">لم يتم العثور على الأداة</h4><p>إذا لم تظهر أدوات MCP في سطح المكتب أو المؤشر في Claude Desktop أو المؤشر</p>
<ol>
<li>أعد تشغيل التطبيق</li>
<li>تحقق من سجلات الخادم بحثًا عن أي أخطاء</li>
<li>تحقق من تشغيل خادم MCP بشكل صحيح</li>
<li>اضغط على زر التحديث في إعدادات MCP (للمؤشر)</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">الحصول على المساعدة</h3><p>إذا كنت لا تزال تواجه مشكلات:</p>
<ol>
<li>تحقق من <a href="https://github.com/zilliztech/mcp-server-milvus/issues">مشكلات GitHub</a> بحثًا عن مشاكل مماثلة</li>
<li>انضم إلى <a href="https://discord.gg/zilliz">مجتمع Zilliz Community Discord</a> للحصول على الدعم</li>
<li>قم بتقديم مشكلة جديدة مع معلومات مفصلة حول مشكلتك</li>
</ol>
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
    </button></h2><p>من خلال اتباع هذا البرنامج التعليمي، أصبح لديك الآن <strong>خادم MCP</strong> قيد التشغيل، مما يتيح البحث المتجه المدعوم بالذكاء الاصطناعي في ميلفوس. سواءً كنت تستخدم <strong>Claude Desktop</strong> أو <strong>Cursor،</strong> يمكنك الآن الاستعلام عن قاعدة بيانات Milvus وإدارتها والبحث فيها باستخدام <strong>أوامر اللغة الطبيعية - دون</strong>كتابة كود قاعدة البيانات!</p>
