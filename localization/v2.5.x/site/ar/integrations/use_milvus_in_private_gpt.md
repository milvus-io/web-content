---
id: use_milvus_in_private_gpt.md
summary: >-
  سنوضح لك في هذا البرنامج التعليمي كيفية استخدام Milvus كقاعدة بيانات متجهات
  خلفية ل PrivateGPT.
title: استخدام Milvus في PrivateGPT
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">استخدام Milvus في PrivateGPT<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">برايفتGPT</a> هو مشروع ذكاء اصطناعي جاهز للإنتاج يُمكِّن المستخدمين من طرح أسئلة حول مستنداتهم باستخدام نماذج لغوية كبيرة دون الحاجة للاتصال بالإنترنت مع ضمان الخصوصية بنسبة 100%. يقدم PrivateGPT واجهة برمجة تطبيقات مقسمة إلى كتل عالية المستوى وأخرى منخفضة المستوى. كما يوفر أيضاً عميل واجهة مستخدم Gradio UI وأدوات مفيدة مثل البرامج النصية لتنزيل النماذج المجمّعة والبرامج النصية للاستيعاب. من الناحية النظرية، يغلّف PrivateGPT خط أنابيب RAG ويكشف عن أولياته، بحيث يكون جاهزًا للاستخدام ويوفر تنفيذًا كاملًا لواجهة برمجة التطبيقات وخط أنابيب RAG.</p>
<p>سنوضح لك في هذا البرنامج التعليمي كيفية استخدام Milvus كقاعدة بيانات متجهية خلفية لـ PrivateGPT.</p>
<div class="alert note">
<p>يُشار في هذا البرنامج التعليمي بشكل أساسي إلى دليل التثبيت الرسمي لـ <a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>. إذا وجدت أن هذا البرنامج التعليمي يحتوي على أجزاء قديمة، يمكنك إعطاء الأولوية لاتباع الدليل الرسمي وإنشاء مشكلة لنا.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">المتطلبات الأساسية لتشغيل PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. استنساخ مستودع PrivateGPT</h3><p>استنسخ المستودع وانتقل إليه:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. تثبيت Poetry</h3><p>قم بتثبيت <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a> لإدارة التبعية: اتبع التعليمات الموجودة على موقع Poetry الرسمي لتثبيته.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. 3. (اختياري) تثبيت Make</h3><p>لتشغيل العديد من البرامج النصية المختلفة، تحتاج إلى تثبيت Make.</p>
<p>macOS (باستخدام Homebrew):</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>ويندوز (باستخدام Chocolatey):</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">تثبيت الوحدات المتاحة<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>يسمح PrivateGPT بتخصيص الإعداد لبعض الوحدات، مثل LLM، والتضمينات، ومخازن المتجهات، وواجهة المستخدم.</p>
<p>في هذا البرنامج التعليمي، سنستخدم الوحدات التالية:</p>
<ul>
<li><strong>LLM</strong>: أولاما</li>
<li><strong>التضمينات</strong>: أولاما</li>
<li><strong>مخازن المتجهات</strong>: ميلفوس</li>
<li><strong>واجهة المستخدم</strong>: غراديو</li>
</ul>
<p>قم بتشغيل الأمر التالي لاستخدام الشعر لتثبيت تبعيات الوحدة النمطية المطلوبة:</p>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">ابدأ تشغيل خدمة أولاما<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>انتقل إلى <a href="https://ollama.com/">ollama.ai</a> واتبع التعليمات لتثبيت Ollama على جهازك.</p>
<p>بعد التثبيت، تأكد من إغلاق تطبيق Ollama لسطح المكتب.</p>
<p>الآن، ابدأ تشغيل خدمة أولاما (سيبدأ تشغيل خادم استدلال محلي يخدم كلاً من LLM و Embeddings):</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>قم بتثبيت النماذج التي سيتم استخدامها، يتم تكوين الافتراضي <code translate="no">settings-ollama.yaml</code> للمستخدم <code translate="no">llama3.1</code> 8b LLM (حوالي 4 جيجابايت) و <code translate="no">nomic-embed-text</code> Embeddings (حوالي 275 ميغابايت)</p>
<p>بشكل افتراضي، ستقوم PrivateGPT بسحب النماذج تلقائيًا حسب الحاجة. يمكن تغيير هذا السلوك بتعديل الخاصية <code translate="no">ollama.autopull_models</code>.</p>
<p>على أي حال، إذا أردت سحب النماذج يدويًا، قم بتشغيل الأوامر التالية:</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك اختياريًا التغيير إلى نماذجك المفضلة في الملف <code translate="no">settings-ollama.yaml</code> وسحبها يدويًا.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">تغيير إعدادات ميلفوس<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>في الملف <code translate="no">settings-ollama.yaml</code> ، اضبط متجه المتجر على ميلفوس:</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضاً إضافة بعض تكوينات ملف ميلفوس لتحديد الإعدادات الخاصة بك مثل هذا:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>خيارات التكوين المتاحة هي:</p>
<table>
<thead>
<tr><th>خيار الحقل</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>يوري</td><td>يتم تعيين الإعداد الافتراضي على "local_data/private_gpt/milvus/milvus_local.db" كملف محلي؛ يمكنك أيضًا إعداد خادم Milvus أكثر أداءً على docker أو k8s على سبيل المثال http://localhost:19530، كـ uri الخاص بك؛ لاستخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> اضبط uri والرمز المميز على <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح API</a> في Zilliz Cloud.</td></tr>
<tr><td>الرمز المميز</td><td>إقران مع خادم Milvus على docker أو k8s أو مفتاح واجهة برمجة التطبيقات في Zilliz Cloud.</td></tr>
<tr><td>اسم_المجموعة</td><td>اسم المجموعة، مضبوط على "milvus_db" الافتراضي.</td></tr>
<tr><td>الكتابة فوق</td><td>الكتابة فوق البيانات الموجودة في المجموعة إذا كانت موجودة، مضبوطة على الوضع الافتراضي True.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">بدء تشغيل PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد الانتهاء من جميع الإعدادات، يمكنك تشغيل PrivateGPT باستخدام واجهة مستخدم Gradio.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>ستكون واجهة المستخدم متاحة على <code translate="no">http://0.0.0.0:8001</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>يمكنك التلاعب بواجهة المستخدم وطرح الأسئلة حول مستنداتك.</p>
<p>لمزيد من التفاصيل، يُرجى الرجوع إلى الوثائق الرسمية لـ <a href="https://docs.privategpt.dev/">PrivateGPT</a>.</p>
