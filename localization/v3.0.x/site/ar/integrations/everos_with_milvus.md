---
id: everos_with_milvus.md
summary: >-
  في هذا الدرس التعليمي، سنقوم بإنشاء مساعد مشروع يتذكر قرارات الإصدار عبر
  محادثات منفصلة. سنضيف محادثات حول إطلاق مشروع «أطلس» جنبًا إلى جنب مع محادثات
  غير ذات صلة بمشاريع أخرى. سيستخدم EverOS نموذج لغة كبير (LLM) لاستخراج هذه
  المعلومات، بينما يقوم Milvus بتخزين فهارس BM25 والفهارس المتجهة المستخدمة في
  البحث الهجين.
title: بناء ذاكرة طويلة الأمد للوكلاء باستخدام EverOS وMilvus
---
<h1 id="Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="common-anchor-header">بناء ذاكرة طويلة الأمد للوكلاء باستخدام EverOS وMilvus<button data-href="#Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/EverMind-AI/EverOS">EverOS</a> هو نظام ذاكرة يعتمد على Markdown في المقام الأول مخصص لوكلاء الذكاء الاصطناعي. فهو يستخرج الذكريات الدائمة من المحادثات، ويحتفظ بـ Markdown كمصدر موثوق للمعلومات، ويبني فهرسًا مشتقًا قابلًا للبحث.</p>
<p>في هذا البرنامج التعليمي، سنقوم بإنشاء مساعد مشروع يتذكر قرارات الإصدار عبر محادثات منفصلة. سنضيف محادثات حول إطلاق مشروع Atlas إلى جانب محادثات غير ذات صلة حول مشاريع أخرى. سيستخدم EverOS نموذج لغة كبير (LLM) لاستخراج الذكريات، بينما يقوم <a href="https://milvus.io/">Milvus</a> بتخزين مؤشرات BM25 والمتجهات المستخدمة في البحث الهجين.</p>
<pre><code translate="no" class="language-text">Conversations
      |
      v
EverOS + LLM ------&gt; Markdown memory files
      |
      | embedding model
      v
Milvus ------&gt; BM25 + vector hybrid search
<button class="copy-code-btn"></button></code></pre>
<p>يختلف دور كل من نموذج اللغة الكبير (LLM) ونموذج التضمين (embedding model). يقوم نموذج اللغة الكبير بتحويل المحادثة إلى ذكريات منظمة. أما نموذج التضمين فيقوم بتحويل تلك الذكريات واستعلامات البحث اللاحقة إلى متجهات. لا يتطلب البحث الهجين الأساسي في هذا البرنامج التعليمي نموذجًا لإعادة الترتيب.</p>
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
<li><a href="https://milvus.io/docs/install-overview.md">خادم Milvus</a> قيد التشغيل</li>
<li><a href="https://platform.openai.com/api-keys">مفتاح</a> واجهة برمجة تطبيقات <a href="https://platform.openai.com/api-keys">(API)</a> لـ <a href="https://platform.openai.com/api-keys">OpenAI</a></li>
</ul>
<p>يتصل هذا البرنامج التعليمي بخادم Milvus على العنوان <code translate="no">http://localhost:19530</code>. كما يدعم EverOS <a href="https://zilliz.com/cloud">خدمة Zilliz Cloud</a> من خلال نفس إعدادات URI ورمز التوثيق. وتتوقع الخلفية البرمجية لـ Milvus وجود نقطة نهاية عن بُعد ولا تقبل مسار ملف Milvus Lite.</p>
<h2 id="Install-EverOS" class="common-anchor-header">تثبيت EverOS<button data-href="#Install-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء مشروع محلي وتثبيت EverOS مع تبعيات Milvus الاختيارية:</p>
<pre><code translate="no" class="language-shell">mkdir everos-milvus-demo
cd everos-milvus-demo

uv init --bare --python 3.12
uv add &quot;everos[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>لا يحدد الأمر إصدارًا عن قصد، لذا فإن التثبيت الجديد سيحدد أحدث إصدار متوافق من EverOS.</p>
<p>تهيئة جذر ذاكرة منفصل للبرنامج التعليمي:</p>
<pre><code translate="no" class="language-shell">export EVEROS_ROOT=&quot;$PWD/everos-data&quot;
uv run everos init --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>يقوم EverOS بإنشاء <code translate="no">everos.toml</code> و <code translate="no">ome.toml</code> ضمن هذا الدليل. كما سيقوم بكتابة الذاكرات المستخرجة هنا.</p>
<h2 id="Configure-OpenAI-and-Milvus" class="common-anchor-header">تكوين OpenAI و Milvus<button data-href="#Configure-OpenAI-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتعيين مفتاح واجهة برمجة تطبيقات OpenAI وتهيئة EverOS من خلال متغيرات البيئة:</p>
<pre><code translate="no" class="language-shell">export OPENAI_API_KEY=&quot;YOUR_OPENAI_API_KEY&quot;
export MILVUS_URI=&quot;http://localhost:19530&quot;

export EVEROS_INDEX__BACKEND=&quot;milvus&quot;
export EVEROS_MILVUS__URI=&quot;$MILVUS_URI&quot;
export EVEROS_MILVUS__COLLECTION_PREFIX=&quot;everos_bootcamp&quot;

export EVEROS_LLM__MODEL=&quot;gpt-5.4-mini&quot;
export EVEROS_LLM__API_KEY=&quot;$OPENAI_API_KEY&quot;
export EVEROS_LLM__BASE_URL=&quot;https://api.openai.com/v1&quot;

export EVEROS_EMBEDDING__MODEL=&quot;text-embedding-3-small&quot;
export EVEROS_EMBEDDING__API_KEY=&quot;$OPENAI_API_KEY&quot;
export EVEROS_EMBEDDING__BASE_URL=&quot;https://api.openai.com/v1&quot;
export EVEROS_EMBEDDING__DIMENSIONS=&quot;1024&quot;

export EVEROS_MEMORIZE__MODE=&quot;chat&quot;
<button class="copy-code-btn"></button></code></pre>
<p>يستخدم EverOS OpenAI لكل من استخراج الذاكرة والتضمينات. يُرجع <code translate="no">text-embedding-3-small</code> أبعاد <code translate="no">1536</code> افتراضيًا، لكن EverOS يُرسل قيمة <code translate="no">dimensions</code> المُهيأة إلى OpenAI. يطلب هذا البرنامج التعليمي أبعاد <code translate="no">1024</code> لتتوافق مع مخططات Milvus التي يديرها EverOS.</p>
<p>يُحافظ وضع الذاكرة <code translate="no">chat</code> على تركيز هذا المثال على ذاكرات المستخدمين. يدير EverOS مجموعات Milvus ومخططاتها، لذا لا تحتاج إلى إنشائها بنفسك.</p>
<h2 id="Start-EverOS" class="common-anchor-header">بدء تشغيل EverOS<button data-href="#Start-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>ابدأ تشغيل خادم HTTP الخاص بـ EverOS:</p>
<pre><code translate="no" class="language-shell">uv run everos server start --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>اترك هذا المحطة الطرفية مفتوحة. يتصل EverOS بـ Milvus ويُنشئ سبع مجموعات ذات فهارس مشتقة بالبادئة المُعدة مسبقًا أثناء بدء التشغيل.</p>
<p>افتح محطة طرفية أخرى في نفس دليل المشروع وتحقق من الخدمة:</p>
<pre><code translate="no" class="language-shell">curl http://127.0.0.1:8000/health
<button class="copy-code-btn"></button></code></pre>
<p>إخراج مرجعي:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ok&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.3.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;capabilities&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;llm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;embed&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rerank&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;multimodal_llm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;parser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;cascade&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;healthy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;pending&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>تحتوي الاستجابة على حقول حالة إضافية. القيم المهمة لهذا البرنامج التعليمي هي <code translate="no">status: &quot;ok&quot;</code> و <code translate="no">llm: true</code> و <code translate="no">embed: true</code> و <code translate="no">cascade.healthy: true</code>.</p>
<h2 id="Add-project-conversations" class="common-anchor-header">إضافة محادثات المشروع<button data-href="#Add-project-conversations" class="anchor-icon" translate="no">
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
    </button></h2><p>يرسل برنامج Python التالي عشر محادثات مستقلة إلى EverOS. يحتوي Atlas على مناقشات منفصلة حول التشغيل والتراجع. توفر ثماني محادثات حول مشاريع أخرى عوامل تشتيت الانتباه بحيث يتعين على البحث اللاحق تحديد ذكريات المشروع الصحيحة.</p>
<p>احفظ الكود التالي باسم <code translate="no">add_memories.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> urllib.request <span class="hljs-keyword">import</span> Request, urlopen


API_URL = <span class="hljs-string">&quot;http://127.0.0.1:8000/api/v2/memory&quot;</span>
NOW = <span class="hljs-built_in">int</span>(time.time() * <span class="hljs-number">1000</span>)

conversations = [
    (
        <span class="hljs-string">&quot;atlas-release&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;For Project Atlas, we decided to launch with a 10% canary &quot;</span>
                    <span class="hljs-string">&quot;on September 30. Promote to all users only after the checkout &quot;</span>
                    <span class="hljs-string">&quot;error rate stays below 1% for 30 minutes.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">1_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Understood. I will remember the Atlas launch date, canary &quot;</span>
                    <span class="hljs-string">&quot;percentage, and promotion gate.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;atlas-rollback&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">10_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;The Atlas rollback owner is Priya. Roll back immediately if &quot;</span>
                    <span class="hljs-string">&quot;checkout errors exceed 2% for five minutes, and keep the &quot;</span>
                    <span class="hljs-string">&quot;previous container image available for 24 hours.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">11_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Got it. Priya owns rollback, with the 2% five-minute trigger &quot;</span>
                    <span class="hljs-string">&quot;and a 24-hour image retention window.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;orion-pricing&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">20_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Orion will test annual billing with the education &quot;</span>
                    <span class="hljs-string">&quot;segment. The pricing review is scheduled for October 12.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">21_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Orion&#x27;s annual billing experiment and October &quot;</span>
                    <span class="hljs-string">&quot;pricing review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;vega-mobile&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">30_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;For Project Vega, the mobile team chose offline drafts as the &quot;</span>
                    <span class="hljs-string">&quot;next milestone. Elena will review the interaction design on &quot;</span>
                    <span class="hljs-string">&quot;October 18.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">31_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Vega&#x27;s next milestone is offline drafts, followed by &quot;</span>
                    <span class="hljs-string">&quot;Elena&#x27;s design review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;nova-warehouse&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">40_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Nova will migrate the analytics warehouse to Iceberg. &quot;</span>
                    <span class="hljs-string">&quot;Marcus owns the checksum rehearsal scheduled for October 22.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">41_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Nova&#x27;s warehouse migration and Marcus&#x27;s &quot;</span>
                    <span class="hljs-string">&quot;checksum rehearsal.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;helios-support&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">50_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Helios needs weekend support coverage for the APAC &quot;</span>
                    <span class="hljs-string">&quot;region. Imani will publish the rotation schedule on November 1.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">51_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Helios needs APAC weekend coverage, and Imani owns the &quot;</span>
                    <span class="hljs-string">&quot;rotation schedule.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;luna-onboarding&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">60_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Luna will replace the onboarding tour with a checklist. &quot;</span>
                    <span class="hljs-string">&quot;The localized copy is due from the content team on October 25.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">61_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Luna&#x27;s checklist approach and the localization &quot;</span>
                    <span class="hljs-string">&quot;deadline.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;aurora-observability&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">70_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Aurora will retain detailed telemetry for 30 days. &quot;</span>
                    <span class="hljs-string">&quot;The operations team should alert after three consecutive &quot;</span>
                    <span class="hljs-string">&quot;heartbeat misses.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">71_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Understood. Aurora keeps 30 days of telemetry and alerts after &quot;</span>
                    <span class="hljs-string">&quot;three missed heartbeats.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;comet-invoices&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">80_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Comet will add downloadable invoice PDFs for enterprise &quot;</span>
                    <span class="hljs-string">&quot;accounts. Finance will approve the tax-field layout on October 28.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">81_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Comet covers enterprise invoice PDFs and an October tax &quot;</span>
                    <span class="hljs-string">&quot;layout review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;solstice-research&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">90_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Solstice is prototyping voice notes for field researchers. &quot;</span>
                    <span class="hljs-string">&quot;The research team will interview 12 participants in November.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">91_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Solstice&#x27;s voice-note prototype and the planned &quot;</span>
                    <span class="hljs-string">&quot;participant interviews.&quot;</span>
                ),
            },
        ],
    ),
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">post</span>(<span class="hljs-params">path, payload</span>):
    request = Request(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{API_URL}</span>/<span class="hljs-subst">{path}</span>&quot;</span>,
        data=json.dumps(payload).encode(),
        headers={<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
        method=<span class="hljs-string">&quot;POST&quot;</span>,
    )
    <span class="hljs-keyword">with</span> urlopen(request, timeout=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> response:
        <span class="hljs-keyword">return</span> json.load(response)[<span class="hljs-string">&quot;data&quot;</span>]


<span class="hljs-keyword">for</span> session_id, messages <span class="hljs-keyword">in</span> conversations:
    added = post(
        <span class="hljs-string">&quot;add&quot;</span>,
        {
            <span class="hljs-string">&quot;session_id&quot;</span>: session_id,
            <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
            <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
            <span class="hljs-string">&quot;messages&quot;</span>: messages,
            <span class="hljs-string">&quot;defer_extraction&quot;</span>: <span class="hljs-literal">True</span>,
        },
    )
    flushed = post(
        <span class="hljs-string">&quot;flush&quot;</span>,
        {
            <span class="hljs-string">&quot;session_id&quot;</span>: session_id,
            <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
            <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
        },
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{session_id}</span>: <span class="hljs-subst">{added[<span class="hljs-string">&#x27;status&#x27;</span>]}</span> -&gt; <span class="hljs-subst">{flushed[<span class="hljs-string">&#x27;status&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيله من دليل المشروع:</p>
<pre><code translate="no" class="language-shell">uv run python add_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>نموذج الإخراج:</p>
<pre><code translate="no" class="language-text">atlas-release: accumulated -&gt; extracted
atlas-rollback: accumulated -&gt; extracted
orion-pricing: accumulated -&gt; extracted
vega-mobile: accumulated -&gt; extracted
nova-warehouse: accumulated -&gt; extracted
helios-support: accumulated -&gt; extracted
luna-onboarding: accumulated -&gt; extracted
aurora-observability: accumulated -&gt; extracted
comet-invoices: accumulated -&gt; extracted
solstice-research: accumulated -&gt; extracted
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي تعيين <code translate="no">defer_extraction</code> إلى <code translate="no">true</code> إلى تخزين كل محادثة في المخزن المؤقت الدائم دون مطالبة نموذج اللغة الكبير (LLM) باكتشاف الحدود. ويشير استدعاء <code translate="no">/flush</code> التالي إلى نهاية تلك الجلسة ويؤدي إلى عملية استخراج واحدة. ثم يقوم EverOS بكتابة الحلقة المستخرجة إلى Markdown وتضمينها بشكل غير متزامن في فهرس Milvus.</p>
<h2 id="Inspect-the-Markdown-memory" class="common-anchor-header">فحص ذاكرة Markdown<button data-href="#Inspect-the-Markdown-memory" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تخزين ملف الحلقة الذي تم إنشاؤه ضمن نطاقات التطبيق والمشروع والمستخدم:</p>
<pre><code translate="no" class="language-shell">find &quot;$EVEROS_ROOT/project-assistant/launch-planning/users/maya/episodes&quot; \
  -type f -name &quot;*.md&quot;
<button class="copy-code-btn"></button></code></pre>
<p>إخراج مرجعي (يعكس تاريخ اسم الملف وقت تشغيل المثال):</p>
<pre><code translate="no" class="language-text">everos-data/project-assistant/launch-planning/users/maya/episodes/episode-2026-09-08.md
<button class="copy-code-btn"></button></code></pre>
<p>افتح الملف لرؤية الذكريات التي استخرجها نموذج اللغة الكبير (LLM). يبدو مقتطف مختصر كما يلي:</p>
<pre><code translate="no" class="language-markdown"><span class="hljs-section">## ep<span class="hljs-emphasis">_20260908_</span>00000001</span>

<span class="hljs-strong">**owner<span class="hljs-emphasis">_id**: maya
**session_</span>id**</span>: atlas-release
<span class="hljs-strong">**sender<span class="hljs-emphasis">_ids**: [maya, assistant]

### Subject
Maya&#x27;s Project Atlas Launch Decision: September 30 Canary and Promotion Criteria

### Content
Maya decided that Project Atlas would launch with a 10% canary on September 30.
The promotion to all users would occur only after the checkout error rate remained
below 1% for 30 minutes.
</span></span><button class="copy-code-btn"></button></code></pre>
<p>قد تختلف الصياغة الدقيقة والمعرفات والطوابع الزمنية لأن الذاكرة يتم استخراجها بواسطة LLM. تظل ملفات Markdown الأصلية هي المصدر الموثوق الدائم؛ ويمكن إعادة بناء فهرس Milvus منها.</p>
<h2 id="Search-the-memories" class="common-anchor-header">البحث في الذكريات<button data-href="#Search-the-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم البحث المختلط لتحديد ما يجب تذكره قبل إطلاق Atlas. احفظ الكود التالي باسم <code translate="no">search_memories.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> urllib.request <span class="hljs-keyword">import</span> Request, urlopen


URL = <span class="hljs-string">&quot;http://127.0.0.1:8000/api/v2/memory/search&quot;</span>
payload = {
    <span class="hljs-string">&quot;user_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
    <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
    <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
    <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;What should I remember before Atlas goes live?&quot;</span>,
    <span class="hljs-string">&quot;method&quot;</span>: <span class="hljs-string">&quot;hybrid&quot;</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>: <span class="hljs-number">4</span>,
}


<span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>():
    request = Request(
        URL,
        data=json.dumps(payload).encode(),
        headers={<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
        method=<span class="hljs-string">&quot;POST&quot;</span>,
    )
    <span class="hljs-keyword">with</span> urlopen(request, timeout=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> response:
        <span class="hljs-keyword">return</span> json.load(response)[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;episodes&quot;</span>]


expected_sessions = {<span class="hljs-string">&quot;atlas-release&quot;</span>, <span class="hljs-string">&quot;atlas-rollback&quot;</span>}

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">30</span>):
    episodes = search()
    top_results = episodes[:<span class="hljs-number">2</span>]
    <span class="hljs-keyword">if</span> {episode[<span class="hljs-string">&quot;session_id&quot;</span>] <span class="hljs-keyword">for</span> episode <span class="hljs-keyword">in</span> top_results} == expected_sessions:
        <span class="hljs-keyword">break</span>
    time.sleep(<span class="hljs-number">2</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-keyword">raise</span> RuntimeError(<span class="hljs-string">&quot;The expected Atlas memories were not indexed in time&quot;</span>)

<span class="hljs-keyword">for</span> rank, episode <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(top_results, start=<span class="hljs-number">1</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{rank}</span>. <span class="hljs-subst">{episode[<span class="hljs-string">&#x27;session_id&#x27;</span>]}</span> | score=<span class="hljs-subst">{episode[<span class="hljs-string">&#x27;score&#x27;</span>]:<span class="hljs-number">.3</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;   <span class="hljs-subst">{episode[<span class="hljs-string">&#x27;subject&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل البحث:</p>
<pre><code translate="no" class="language-shell">uv run python search_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>نتائج مرجعية (قد تختلف الدرجات والصياغة):</p>
<pre><code translate="no" class="language-text">1. atlas-release | score=0.492
   Project Atlas Launch Plan: 10% Canary Rollout on September 30 with Error Rate Gate
2. atlas-rollback | score=0.400
   Atlas Rollback Plan Details: Priya as Owner, 2% Error Trigger, 24-Hour Image Retention
<button class="copy-code-btn"></button></code></pre>
<p>يتم عرض محادثتي Atlas قبل المحادثات الثماني غير ذات الصلة. يرسل EverOS الاستعلام إلى نقطة نهاية التضمين في OpenAI، ويطلب من Milvus تقديم مرشحات BM25 والمتجهات ضمن نطاق تطبيق Maya والمشروع، ثم يدمج قائمتي النتائج.</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">افحص مجموعات Milvus<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>ينشئ EverOS مجموعة واحدة لكل نوع من أنواع الذاكرة المشتقة المدعومة. استخدم <code translate="no">MilvusClient</code> لإدراج عدد الصفوف لكل منها:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


prefix = <span class="hljs-string">&quot;everos_bootcamp&quot;</span>
client = MilvusClient(uri=os.environ.get(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>, <span class="hljs-string">&quot;http://localhost:19530&quot;</span>))

memory_kinds = [
    <span class="hljs-string">&quot;agent_case&quot;</span>,
    <span class="hljs-string">&quot;agent_skill&quot;</span>,
    <span class="hljs-string">&quot;atomic_fact&quot;</span>,
    <span class="hljs-string">&quot;episode&quot;</span>,
    <span class="hljs-string">&quot;foresight&quot;</span>,
    <span class="hljs-string">&quot;knowledge_topic&quot;</span>,
    <span class="hljs-string">&quot;user_profile&quot;</span>,
]

<span class="hljs-keyword">for</span> kind <span class="hljs-keyword">in</span> memory_kinds:
    name = <span class="hljs-string">f&quot;<span class="hljs-subst">{prefix}</span>_<span class="hljs-subst">{kind}</span>&quot;</span>
    <span class="hljs-keyword">if</span> client.has_collection(collection_name=name):
        result = client.query(
            collection_name=name,
            <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
            output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
        )
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{kind}</span>: <span class="hljs-subst">{result[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;count(*)&#x27;</span>]}</span> rows&quot;</span>)

client.close()
<button class="copy-code-btn"></button></code></pre>
<p>راجع مخرجات التشغيل الذي تم التحقق من صحته:</p>
<pre><code translate="no" class="language-text">agent_case: 0 rows
agent_skill: 0 rows
atomic_fact: 50 rows
episode: 10 rows
foresight: 0 rows
knowledge_topic: 0 rows
user_profile: 1 rows
<button class="copy-code-btn"></button></code></pre>
<p>قد يختلف العدد الدقيق للحقائق الذرية باختلاف مخرجات LLM. تتوافق الصفوف العشرة الخاصة بالحلقات مع المحادثات العشر التي تم مسحها. تتوفر المجموعات الأخرى لأوضاع الذاكرة وميزات EverOS التي لا يستخدمها هذا المثال المركّز.</p>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">استخدام نشر Milvus آخر<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام نقطة نهاية خادم Milvus أخرى أو <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> قم بتحديث <code translate="no">EVEROS_MILVUS__URI</code>. قم بتعيين <code translate="no">EVEROS_MILVUS__TOKEN</code> عندما تتطلب نقطة النهاية المصادقة. يبقى كود الاستيعاب والبحث دون تغيير.</p>
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
    </button></h2><p>من خلال الجمع بين EverOS و Milvus، يمكنك تحويل المحادثات إلى ذكريات دائمة واسترجاعها من خلال الكلمات المفتاحية والإشارات الدلالية. يمكنك تكييف النمط نفسه لمنح المساعدات والتطبيقات الوكيلة الأخرى ذاكرة طويلة الأمد لمستخدميك ومشاريعك وسير عملك.</p>
