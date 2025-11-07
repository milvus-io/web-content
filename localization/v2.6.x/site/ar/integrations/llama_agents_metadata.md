---
id: llama_agents_metadata.md
summary: >-
  سنستكشف في هذا الدفتر أفكارًا مختلفة: تخزين البيانات في ميلفوس، واستخدام فهرس
  لاما مع نماذج ميسترال لاستعلامات البيانات، وإنشاء وكلاء بحث وقراءة البيانات
  آليًا، وتطوير وكلاء لتصفية البيانات الوصفية بناءً على استعلامات المستخدم.
title: أنظمة متعددة الوكلاء مع ميسترال للذكاء الاصطناعي وميلفوس و Llama-agents
---
<h1 id="Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="common-anchor-header">أنظمة متعددة الوكلاء مع ميسترال للذكاء الاصطناعي وميلفوس و Llama-agents<button data-href="#Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Goal-of-this-Notebook" class="common-anchor-header">الهدف من هذا الدفتر<button data-href="#Goal-of-this-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>سنستكشف في هذا الدفتر أفكارًا مختلفة:</p>
<ul>
<li><p>1️⃣ تخزين البيانات في ميلفوس: تعلم كيفية تخزين البيانات في ميلفوس، وهي قاعدة بيانات متجهة فعالة مصممة لعمليات البحث عن التشابه عالية السرعة وتطبيقات الذكاء الاصطناعي.</p></li>
<li><p>2️⃣ استخدام فهرس اللاما مع نماذج ميسترال للاستعلام عن البيانات: اكتشف كيفية استخدام فهرس اللاما مع نماذج ميسترال للاستعلام عن البيانات المخزنة في ملفوس.</p></li>
<li><p>3️⃣ إنشاء وكلاء بحث وقراءة مؤتمتة للبيانات: إنشاء وكلاء يمكنهم البحث عن البيانات وقراءتها تلقائيًا بناءً على استعلامات المستخدم. ستعمل هذه الوكلاء المؤتمتة على تحسين تجربة المستخدم من خلال تقديم استجابات سريعة ودقيقة، مما يقلل من جهد البحث اليدوي.</p></li>
<li><p>4️⃣ تطوير وكلاء لتصفية البيانات الوصفية استنادًا إلى استفسارات المستخدم: تنفيذ وكلاء يمكنهم إنشاء عوامل تصفية البيانات الوصفية تلقائيًا من استفسارات المستخدم، مما يؤدي إلى تنقيح نتائج البحث ووضعها في سياقها، وتجنب الالتباس وتعزيز دقة المعلومات المسترجعة، حتى بالنسبة للاستفسارات المعقدة.</p></li>
<li><p>🔍 ملخص بنهاية هذا الدفتر، سيكون لديك فهم شامل لاستخدام Milvus، وlama-index مع وكلاء llama، ونماذج Mistral لبناء نظام استرجاع بيانات قوي وفعال.</p></li>
</ul>
<h2 id="Milvus" class="common-anchor-header">ميلفوس<button data-href="#Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus عبارة عن قاعدة بيانات متجهة مفتوحة المصدر تعمل على تشغيل تطبيقات الذكاء الاصطناعي مع تضمينات المتجهات والبحث عن التشابه.</p>
<p>في هذا الدفتر، نستخدم Milvus Lite، وهو نسخة خفيفة الوزن من Milvus.</p>
<p>باستخدام Milvus Lite، يمكنك البدء في إنشاء تطبيق ذكاء اصطناعي مع البحث عن التشابه المتجه في غضون دقائق! ميلفوس لايت جيد للتشغيل في البيئة التالية:</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>أجهزة الكمبيوتر المحمولة</li>
<li>أجهزة الحافة</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ad459431-95ac-4cbd-a931-453d08d5fdef.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>image.png</span> </span></p>
<h2 id="llama-agents" class="common-anchor-header">لاما-وكلاء<button data-href="#llama-agents" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">llama-agents</code> يجعل من الممكن تشغيل الوكلاء كخدمات مصغرة. وهذا يجعل من الممكن توسيع نطاق الخدمات لأعلى ولأسفل.</p>
<h2 id="llama-index" class="common-anchor-header">لاما إندكس<button data-href="#llama-index" class="anchor-icon" translate="no">
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
    </button></h2><p>LlamaIndex هو إطار عمل بيانات لتطبيق LLM الخاص بك. يوفر أدوات مثل:</p>
<ul>
<li>موصلات البيانات تستوعب بياناتك الحالية من مصدرها وتنسيقها الأصلي.</li>
<li>تقوم فهارس البيانات بهيكلة بياناتك في تمثيلات وسيطة يسهل على LLMs استهلاكها وأداءها.</li>
<li>توفر المحركات وصولاً لغوياً طبيعياً إلى بياناتك.</li>
<li>الوكلاء هم عاملون معرفيون مدعومون بأدوات مدعومة من LLM، بدءًا من الوظائف المساعدة البسيطة إلى تكامل واجهة برمجة التطبيقات والمزيد.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/7bd73318-7929-4675-8998-c2e9ef091906.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>image.png</span> </span></p>
<h2 id="Mistral-AI" class="common-anchor-header">ميسترال للذكاء الاصطناعي<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral AI هو مختبر أبحاث يقوم ببناء نماذج LLM ونماذج التضمينات، وقد أصدروا مؤخرًا إصدارات جديدة من نماذجهم، Mistral Nemo و Mistral Large التي أظهرت أنها جيدة بشكل خاص في RAG واستدعاء الدوال. ولهذا السبب، سنستخدمهما في هذه المذكرة</p>
<h2 id="Install-Dependencies" class="common-anchor-header">تثبيت التبعيات<button data-href="#Install-Dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-agents pymilvus milvus-lite openai python-dotenv</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index-readers-file llama-index-llms-ollama llama-index-llms-mistralai llama-index-embeddings-mistralai</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> This is ONLY necessary in jupyter notebook.</span>
<span class="hljs-comment"># Details: Jupyter runs an event-loop behind the scenes.</span>
<span class="hljs-comment">#          This results in nested event-loops when we start an event-loop to make async queries.</span>
<span class="hljs-comment">#          This is normally not allowed, we use nest_asyncio to allow it for convenience.</span>
<span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-your-API-Key-for-Mistral" class="common-anchor-header">احصل على مفتاح واجهة برمجة التطبيقات لـ Mistral<button data-href="#Get-your-API-Key-for-Mistral" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك الحصول على مفتاح Mistral API من <a href="https://console.mistral.ai/api-keys/">وحدة التحكم السحابية لـ Mistral Cloud Console</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;&quot;&quot;
load_dotenv reads key-value pairs from a .env file and can set them as environment variables.
This is useful to avoid leaking your API key for example :D
&quot;&quot;&quot;</span>

<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">import</span> os

load_dotenv()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">True
</code></pre>
<h2 id="Download-data" class="common-anchor-header">تنزيل البيانات<button data-href="#Download-data" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/10k/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/uber_2021.pdf&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/lyft_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/lyft_2021.pdf&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h1 id="Prepare-Embedding-Model" class="common-anchor-header">إعداد نموذج التضمين<button data-href="#Prepare-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h1><p>نحدد نموذج التضمين الذي سيتم استخدامه في هذا الدفتر. نحن نستخدم <code translate="no">mistral-embed</code> ، وهو نموذج تضمين تم تطويره من قبل Mistral، وقد تم تدريبه مع وضع عمليات الاسترجاع في الاعتبار، مما يجعله نموذجًا جيدًا جدًا لنظام RAG العميل الخاص بنا. للحصول على التفاصيل، يُرجى الرجوع إلى صفحة <a href="https://docs.mistral.ai/capabilities/embeddings/">التضمين</a> على وثائق ميسترال.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.embeddings.mistralai <span class="hljs-keyword">import</span> MistralAIEmbedding

<span class="hljs-comment"># Define the default Embedding model used in this Notebook.</span>
<span class="hljs-comment"># We are using Mistral Models, so we are also using Mistral Embeddings</span>

Settings.embed_model = MistralAIEmbedding(model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-LLM-Model" class="common-anchor-header">تعريف نموذج LLM<button data-href="#Define-the-LLM-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم فهرس Llama Index نماذج LLM للرد على المطالبات والاستعلامات، وهو مسؤول عن كتابة استجابات اللغة الطبيعية. نعرّف Mistral Nemo على أنه النموذج الافتراضي. يوفر Nemo نافذة سياق كبيرة تصل إلى 128 ألف رمز. ويُعد استدلاله ومعرفته بالعالم ودقة ترميزه من أحدث ما توصلت إليه التكنولوجيا في فئته من حيث الحجم.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama

Settings.llm = Ollama(<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Instanciate-Milvus-and-Load-Data" class="common-anchor-header">تثبيت ميلفوس وتحميل البيانات<button data-href="#Instanciate-Milvus-and-Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/">Milvus</a> عبارة عن قاعدة بيانات متجهية مفتوحة المصدر شائعة وشائعة الاستخدام، تعمل على تشغيل تطبيقات الذكاء الاصطناعي من خلال بحث تشابه المتجهات عالي الأداء وقابل للتطوير.</p>
<ul>
<li>يعد تعيين uri كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا Milvus <a href="https://milvus.io/docs/milvus_lite.md">Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، على سبيل المثال أكثر من مليون متجه، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>. في هذا الإعداد، يُرجى استخدام uri الخادم، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ uri الخاص بك.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، قم بتعديل uri والرمز المميز، اللذين يتوافقان مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> في Zilliz Cloud.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    load_index_from_storage,
)
<span class="hljs-keyword">from</span> llama_index.core.tools <span class="hljs-keyword">import</span> QueryEngineTool, ToolMetadata

input_files = [<span class="hljs-string">&quot;./data/10k/lyft_2021.pdf&quot;</span>, <span class="hljs-string">&quot;./data/10k/uber_2021.pdf&quot;</span>]

<span class="hljs-comment"># Create a single Milvus vector store</span>
vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1024</span>, overwrite=<span class="hljs-literal">False</span>, collection_name=<span class="hljs-string">&quot;companies_docs&quot;</span>
)

<span class="hljs-comment"># Create a storage context with the Milvus vector store</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)

<span class="hljs-comment"># Load data</span>
docs = SimpleDirectoryReader(input_files=input_files).load_data()

<span class="hljs-comment"># Build index</span>
index = VectorStoreIndex.from_documents(docs, storage_context=storage_context)

<span class="hljs-comment"># Define the query engine</span>
company_engine = index.as_query_engine(similarity_top_k=<span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-Tools" class="common-anchor-header">تحديد الأدوات<button data-href="#Define-Tools" class="anchor-icon" translate="no">
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
    </button></h2><p>إحدى الخطوات الرئيسية في بناء وكيل فعّال هي تحديد الأدوات التي يمكنه استخدامها لأداء مهامه. هذه الأدوات هي في الأساس وظائف أو خدمات يمكن للوكيل أن يستدعيها لاسترداد المعلومات أو تنفيذ الإجراءات.</p>
<p>فيما يلي، سنحدد أدناه أداتين يمكن لوكيلنا استخدامهما للاستعلام عن المعلومات المالية حول ليفت وأوبر من عام 2021. سيتم دمج هذه الأدوات في وكيلنا، مما يسمح له بالرد على استعلامات اللغة الطبيعية بمعلومات دقيقة وذات صلة.</p>
<p>إذا نظرت إلى الرسم البياني الذي لدينا في الأعلى، فهذا هو "خدمة الوكيل".</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the different tools that can be used by our Agent.</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;lyft_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Lyft financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;uber_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Uber financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># Set up the agent</span>
llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)

response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;Could you please provide a comparison between Lyft and Uber&#x27;s total revenues in 2021?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Example usage without metadata filtering</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response without metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Response without metadata filtering:
The revenue for Lyft in 2021 was $3.84 billion.

Uber's total revenue for the year ended December 31, 2021 was $17,455 million.
</code></pre>
<h2 id="Metadata-Filtering" class="common-anchor-header">تصفية البيانات الوصفية<button data-href="#Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم<strong>Milvus</strong> <a href="https://zilliz.com/blog/json-metadata-filtering-in-milvus">تصفية البيانات</a> الوصفية، وهي تقنية تتيح لك تنقيح نتائج البحث وتضييق نطاقها بناءً على سمات أو علامات محددة مرتبطة ببياناتك. يعد هذا مفيدًا بشكل خاص في السيناريوهات التي يكون لديك فيها الكثير من البيانات وتحتاج إلى استرداد المجموعة الفرعية ذات الصلة فقط من البيانات التي تطابق معايير معينة.</p>
<h2 id="Use-Cases-for-Metadata-Filtering" class="common-anchor-header">حالات استخدام تصفية البيانات الوصفية للبيانات الوصفية<button data-href="#Use-Cases-for-Metadata-Filtering" class="anchor-icon" translate="no">
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
<li><p><strong>الدقة في نتائج البحث</strong>: من خلال تطبيق فلاتر البيانات الوصفية يمكنك التأكد من أن نتائج البحث وثيقة الصلة باستعلام المستخدم. على سبيل المثال، إذا كان لديك مجموعة من المستندات المالية، يمكنك تصفيتها بناءً على اسم الشركة أو السنة أو أي بيانات وصفية أخرى ذات صلة.</p></li>
<li><p><strong>الكفاءة</strong>: تساعد تصفية البيانات الوصفية في تقليل كمية البيانات التي يجب معالجتها، مما يجعل عمليات البحث أكثر كفاءة. وهذا مفيد بشكل خاص عند التعامل مع مجموعات البيانات الكبيرة.</p></li>
<li><p><strong>التخصيص</strong>: قد يكون للمستخدمين أو التطبيقات المختلفة متطلبات مختلفة. تسمح لك تصفية البيانات الوصفية بتخصيص نتائج البحث لتلبية احتياجات محددة، مثل استرداد المستندات من سنة أو شركة معينة.</p></li>
</ul>
<h2 id="Example-usage" class="common-anchor-header">مثال على الاستخدام<button data-href="#Example-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>في كتلة التعليمات البرمجية أدناه، يتم استخدام تصفية البيانات الوصفية أدناه لإنشاء محرك استعلام تمت تصفيته يسترجع المستندات بناءً على زوج محدد من البيانات الوصفية ذات القيمة الرئيسية: <code translate="no">file_name</code>: <code translate="no">lyft_2021.pdf</code></p>
<p>إن <code translate="no">QueryEngineTool</code> المحدد أدناه أكثر عمومية من المحدد أعلاه، في المحدد أعلاه، كان لدينا أداة لكل شركة (أوبر وليفت)، أما في هذا المحرك فهو أكثر عمومية. نحن نعلم فقط أن لدينا مستندات مالية عن الشركات ولكن هذا كل شيء. بإضافة تصفية البيانات الوصفية (Metadata Filtering)، يمكننا بعد ذلك التصفية للحصول على البيانات من مستند معين فقط.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Example usage with metadata filtering</span>
filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;lyft_2021.pdf&quot;</span>)]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;filters: <span class="hljs-subst">{filters}</span>&quot;</span>)
filtered_query_engine = index.as_query_engine(filters=filters)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Use this tool to retrieve specific data points about a company. &quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">filters: filters=[MetadataFilter(key='file_name', value='lyft_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<h2 id="Function-Calling" class="common-anchor-header">استدعاء الوظائف<button data-href="#Function-Calling" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم ميسترال نيمو وكبير استدعاء الدالة الأصلية. هناك تكامل سلس مع أدوات LlamaIndex، من خلال الدالة <code translate="no">predict_and_call</code> على الدالة LLM. يتيح ذلك للمستخدم إرفاق أي أدوات والسماح لـ LLM بتحديد الأدوات التي يجب استدعاؤها (إن وجدت).</p>
<p>يمكنك معرفة المزيد عن <a href="https://docs.llamaindex.ai/en/latest/module_guides/deploying/agents/">الوكلاء</a> على موقع llama-index الإلكتروني.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up the LLM we will use for Function Calling</span>

llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Interact-with-the-Agent" class="common-anchor-header">التفاعل مع الوكيل<button data-href="#Interact-with-the-Agent" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن يمكننا الآن تصفية البيانات الوصفية أثناء العمل:</p>
<ol>
<li>في الأولى، يجب ألا يتمكن الوكيل من العثور على أي شيء لاستعلام المستخدم لأنه يتعلق بأوبر ونقوم بتصفية المستندات المتعلقة بـ Lyft فقط.</li>
<li>في الثانية، يجب أن يكون الوكيل قادرًا على العثور على معلومات حول Lyft لأننا سنبحث فقط في المستندات التي تتعلق بـ Lyft.</li>
</ol>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;How many employees does Uber have?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I'm unable to provide information about Uber's employee count as it's outside the given Lyft context.
</code></pre>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;What are the risk factors for Lyft?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Investing in Lyft carries significant risks. These include general economic factors like impacts from pandemics or crises, operational factors such as competition, pricing changes, and driver/ride growth unpredictability, insurance coverage issues, autonomous vehicle technology uncertainties, reputational concerns, potential security breaches, reliance on third-party services, and challenges in expanding platform offerings. Lyft's business operations are subject to numerous other risks not explicitly mentioned here, which could also harm its financial condition and prospects.
</code></pre>
<h2 id="Example-of-Confusion-Without-Metadata-Filtering" class="common-anchor-header">مثال على الارتباك بدون تصفية البيانات الوصفية<button data-href="#Example-of-Confusion-Without-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">&gt; Question: What are the risk factors for Uber?

&gt; Response without metadata filtering:
Based on the provided context, which pertains to Lyft&#x27;s Risk Factors section in their Annual Report, some of the potential risk factors applicable to a company like Uber might include:

- General economic factors such as the impact of global pandemics or other crises on ride-sharing demand.
- Operational factors like competition in ride-hailing services, unpredictability in results of operations, and uncertainty about market growth for ridesharing and related services.
- Risks related to attracting and retaining qualified drivers and riders.
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، يقدم النظام بشكل غير صحيح معلومات عن Lyft بدلاً من Uber، مما يؤدي إلى استجابة مضللة. يبدأ النظام بالقول إنه لا يملك المعلومات ولكن بعد ذلك يستمر في البحث أكثر فأكثر.</p>
<h2 id="Using-an-Agent-to-Extract-Metadata-Filters" class="common-anchor-header">استخدام وكيل لاستخراج مرشحات البيانات الوصفية<button data-href="#Using-an-Agent-to-Extract-Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>لمعالجة هذه المشكلة، يمكننا استخدام وكيل لاستخراج مرشحات البيانات الوصفية تلقائيًا من سؤال المستخدم وتطبيقها أثناء عملية الإجابة على السؤال. وهذا يضمن استرجاع النظام للمعلومات الصحيحة وذات الصلة.</p>
<h2 id="Code-Example" class="common-anchor-header">مثال على الكود<button data-href="#Code-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي مثال برمجي يوضّح كيفية إنشاء محرك استعلام تمت تصفيته باستخدام وكيل لاستخراج مرشحات البيانات الوصفية من سؤال المستخدم:</p>
<h3 id="Explanation" class="common-anchor-header">الشرح<button data-href="#Explanation" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>قالب موجه</strong>: تُستخدم فئة PromptTemplate لتعريف قالب لاستخراج مرشحات البيانات الوصفية من سؤال المستخدم. يوجه القالب نموذج اللغة للنظر في أسماء الشركات والسنوات والسمات الأخرى ذات الصلة.</p></li>
<li><p><strong>LLM</strong>: يُستخدم نموذج<strong>اللغة</strong> لاستخراج مرشحات البيانات الوصفية بناءً على سؤال المستخدم. تتم مطالبة النموذج بالسؤال والقالب لاستخراج المرشحات ذات الصلة.</p></li>
<li><p><strong>مرشحات البيانات الوصفية</strong>: يتم تحليل الاستجابة من LLM لإنشاء كائن <code translate="no">MetadataFilters</code>. إذا لم يتم ذكر أي مرشحات محددة، يتم إرجاع كائن فارغ <code translate="no">MetadataFilters</code>.</p></li>
<li><p><strong>محرك الاستعلام المصفى</strong>: يقوم الأسلوب <code translate="no">index.as_query_engine(filters=metadata_filters)</code> بإنشاء محرك استعلام يطبق مرشحات البيانات الوصفية المستخرجة على الفهرس. وهذا يضمن استرجاع المستندات المطابقة لمعايير التصفية فقط.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.prompts.base <span class="hljs-keyword">import</span> PromptTemplate


<span class="hljs-comment"># Function to create a filtered query engine</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_query_engine</span>(<span class="hljs-params">question</span>):
    <span class="hljs-comment"># Extract metadata filters from question using a language model</span>
    prompt_template = PromptTemplate(
        <span class="hljs-string">&quot;Given the following question, extract relevant metadata filters.\n&quot;</span>
        <span class="hljs-string">&quot;Consider company names, years, and any other relevant attributes.\n&quot;</span>
        <span class="hljs-string">&quot;Don&#x27;t write any other text, just the MetadataFilters object&quot;</span>
        <span class="hljs-string">&quot;Format it by creating a MetadataFilters like shown in the following\n&quot;</span>
        <span class="hljs-string">&quot;MetadataFilters(filters=[ExactMatchFilter(key=&#x27;file_name&#x27;, value=&#x27;lyft_2021.pdf&#x27;)])\n&quot;</span>
        <span class="hljs-string">&quot;If no specific filters are mentioned, returns an empty MetadataFilters()\n&quot;</span>
        <span class="hljs-string">&quot;Question: {question}\n&quot;</span>
        <span class="hljs-string">&quot;Metadata Filters:\n&quot;</span>
    )

    prompt = prompt_template.<span class="hljs-built_in">format</span>(question=question)
    llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
    response = llm.complete(prompt)

    metadata_filters_str = response.text.strip()
    <span class="hljs-keyword">if</span> metadata_filters_str:
        metadata_filters = <span class="hljs-built_in">eval</span>(metadata_filters_str)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;eval: <span class="hljs-subst">{metadata_filters}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> index.as_query_engine(filters=metadata_filters)
    <span class="hljs-keyword">return</span> index.as_query_engine()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = create_query_engine(
    <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Example usage with metadata filtering</span>
question = <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
filtered_query_engine = create_query_engine(question)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs_filtering&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
            ),
        ),
    ),
]
<span class="hljs-comment"># Set up the agent with the updated query engine tools</span>
response = llm.predict_and_call(
    query_engine_tools,
    user_msg=question,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response with metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
Response with metadata filtering:
Uber's total revenue for the year ended December 31, 2021, is $17.455 billion.
</code></pre>
<h2 id="Orchestrating-the-different-services-with-Mistral-Large" class="common-anchor-header">تنسيق الخدمات المختلفة باستخدام ميسترال لارج<button data-href="#Orchestrating-the-different-services-with-Mistral-Large" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral Large هو النموذج الرئيسي لـ Mistral مع قدرات تفكير ومعرفة وترميز جيدة جدًا. إنه مثالي للمهام المعقدة التي تتطلب قدرات استدلالية كبيرة أو عالية التخصص. لديه قدرات استدعاء دالة متقدمة، وهو بالضبط ما نحتاجه لتنسيق وكلائنا المختلفين.</p>
<h3 id="Why-do-we-need-a-smarter-Model" class="common-anchor-header">لماذا نحتاج إلى نموذج أكثر ذكاءً؟<button data-href="#Why-do-we-need-a-smarter-Model" class="anchor-icon" translate="no">
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
    </button></h3><p>السؤال الذي تتم الإجابة عليه أدناه يمثل تحديًا خاصًا لأنه يتطلب تنسيق خدمات ووكلاء متعددين لتوفير استجابة متماسكة ودقيقة. يتضمن ذلك تنسيق أدوات ووكلاء مختلفين لاسترجاع ومعالجة المعلومات من مصادر مختلفة، مثل البيانات المالية من شركات مختلفة.</p>
<h3 id="Whats-so-difficult-about-that" class="common-anchor-header">ما الصعوبة في ذلك؟<button data-href="#Whats-so-difficult-about-that" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>التعقيد: يتضمن السؤال وكلاء وخدمات متعددة، لكل منها وظائفها ومصادر البيانات الخاصة بها. يعد تنسيق هذه الوكلاء للعمل معًا بسلاسة مهمة معقدة.</li>
</ul>
<ul>
<li><p>تكامل البيانات: يتطلب السؤال دمج البيانات من مصادر مختلفة، الأمر الذي قد يكون صعبًا بسبب الاختلافات في تنسيقات البيانات وهياكلها وبياناتها الوصفية.</p></li>
<li><p>الفهم السياقي: قد يتطلب السؤال فهم السياق والعلاقات بين أجزاء مختلفة من المعلومات، وهي مهمة صعبة من الناحية المعرفية.</p></li>
</ul>
<h3 id="Why-would-Mistral-Large-help-in-this-case" class="common-anchor-header">لماذا قد يساعد ميسترال لارج في هذه الحالة؟<button data-href="#Why-would-Mistral-Large-help-in-this-case" class="anchor-icon" translate="no">
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
    </button></h3><p>يعد Mistral Large مناسبًا تمامًا لهذه المهمة نظرًا لقدراته المتقدمة في الاستدلال واستدعاء الوظائف. إليك كيف يساعدك:</p>
<ul>
<li><p>الاستدلال المتقدم: يمكن لميسترال لارج التعامل مع مهام الاستدلال المعقدة، مما يجعله مثاليًا لتنسيق العديد من الوكلاء والخدمات. يمكنه فهم العلاقات بين أجزاء المعلومات المختلفة واتخاذ قرارات مستنيرة.</p></li>
<li><p>قدرات استدعاء الوظائف: تتمتع Mistral Large بقدرات متقدمة لاستدعاء الوظائف، وهي ضرورية لتنسيق إجراءات الوكلاء المختلفين. وهذا يسمح بالتكامل والتنسيق السلس بين الخدمات المختلفة.</p></li>
<li><p>المعرفة المتخصصة: تم تصميم Mistral Large للمهام المتخصصة للغاية، مما يجعله مناسبًا تمامًا للتعامل مع الاستعلامات المعقدة التي تتطلب معرفة عميقة بالمجال.</p></li>
</ul>
<p>لكل هذه الأسباب، قررت أن استخدام Mistral Large بدلاً من Mistral Nemo هو الأنسب هنا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_agents <span class="hljs-keyword">import</span> (
    AgentService,
    ToolService,
    LocalLauncher,
    MetaServiceTool,
    ControlPlaneServer,
    SimpleMessageQueue,
    AgentOrchestrator,
)

<span class="hljs-keyword">from</span> llama_index.core.agent <span class="hljs-keyword">import</span> FunctionCallingAgentWorker
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># create our multi-agent framework components</span>
message_queue = SimpleMessageQueue()
control_plane = ControlPlaneServer(
    message_queue=message_queue,
    orchestrator=AgentOrchestrator(llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)),
)

<span class="hljs-comment"># define Tool Service</span>
tool_service = ToolService(
    message_queue=message_queue,
    tools=query_engine_tools,
    running=<span class="hljs-literal">True</span>,
    step_interval=<span class="hljs-number">0.5</span>,
)

<span class="hljs-comment"># define meta-tools here</span>
meta_tools = [
    <span class="hljs-keyword">await</span> MetaServiceTool.from_tool_service(
        t.metadata.name,
        message_queue=message_queue,
        tool_service=tool_service,
    )
    <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> query_engine_tools
]

<span class="hljs-comment"># define Agent and agent service</span>
worker1 = FunctionCallingAgentWorker.from_tools(
    meta_tools, llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)
)

agent1 = worker1.as_agent()
agent_server_1 = AgentService(
    agent=agent1,
    message_queue=message_queue,
    description=<span class="hljs-string">&quot;Used to answer questions over differnet companies for their Financial results&quot;</span>,
    service_name=<span class="hljs-string">&quot;Companies_analyst_agent&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> logging

<span class="hljs-comment"># change logging level to enable or disable more verbose logging</span>
logging.getLogger(<span class="hljs-string">&quot;llama_agents&quot;</span>).setLevel(logging.INFO)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Define Launcher</span>
launcher = LocalLauncher(
    [agent_server_1, tool_service],
    control_plane,
    message_queue,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_str = <span class="hljs-string">&quot;What are the risk factors for Uber?&quot;</span>
result = launcher.launch_single(query_str)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:llama_agents.message_queues.simple - Consumer AgentService-27cde4ed-5163-4005-90fc-13c158eda7e3: Companies_analyst_agent has been registered.
INFO:llama_agents.message_queues.simple - Consumer ToolService-b73c500a-5fbe-4f57-95c7-db74e173bd1b: default_tool_service has been registered.
INFO:llama_agents.message_queues.simple - Consumer 62465ab8-32ff-436e-95fa-74e828745150: human has been registered.
INFO:llama_agents.message_queues.simple - Consumer ControlPlaneServer-f4c27d43-5474-43ca-93ca-a9aeed4534d7: control_plane has been registered.
INFO:llama_agents.services.agent - Companies_analyst_agent launch_local
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Launching message queue locally
INFO:llama_agents.services.agent - Processing initiated.
INFO:llama_agents.services.tool - Processing initiated.
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.simple - Consumer MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41: MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41 has been registered.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f4c270a4-bc47-4bbf-92fe-e2cc80757943 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f888f9a8-e716-4505-bfe2-577452e9b6e6 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'human' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'human' to consumer.
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{&quot;name&quot;: &quot;finalize&quot;, &quot;arguments&quot;: {&quot;input&quot;: &quot;Uber faces several risk factors, including general economic impacts such as pandemics or downturns, operational challenges like competition, market growth uncertainty, attracting and retaining drivers and riders, insurance adequacy, autonomous vehicle technology development, maintaining its reputation and brand, and managing growth. Additionally, reliance on third-party providers for various services can introduce further risks to its operations.&quot;}}]
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">الخاتمة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا الدفتر، رأيت كيف يمكنك استخدام عوامل اللاما لتنفيذ إجراءات مختلفة عن طريق استدعاء الأدوات المناسبة. من خلال استخدام ميسترال لارج مع ميسترال نيمو، أوضحنا كيفية تنظيم أنظمة ذكية وفعالة من حيث الموارد بشكل فعال من خلال الاستفادة من نقاط القوة في مختلف أدوات لاما. رأينا أن الوكيل يمكنه اختيار المجموعة التي تحتوي على البيانات التي يطلبها المستخدم.</p>
