---
id: integrate_with_langfuse.md
summary: >-
  هذا كتاب طبخ بسيط يوضح كيفية استخدام تكامل LlamaIndex Langfuse. يستخدم ميلفوس
  لايت لتخزين المستندات والاستعلام.
title: استخدام Langfuse لتقييم جودة RAG
---
<h1 id="Using-Langfuse-to-Trace-Queries-in-RAG" class="common-anchor-header">استخدام Langfuse لتتبع الاستعلامات في RAG<button data-href="#Using-Langfuse-to-Trace-Queries-in-RAG" class="anchor-icon" translate="no">
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
    </button></h1><p><a target="_blank" href="https://colab.research.google.com/github/langfuse/langfuse-docs/blob/main/cookbook/integration_llama-index_milvus-lite.ipynb">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a></p>
<p>هذا كتاب طهي بسيط يوضح كيفية استخدام Langfuse لتتبع استعلاماتك في RAG. يتم تنفيذ خط أنابيب RAG باستخدام LlamaIndex وMilvus Lite لتخزين واسترجاع المستندات.</p>
<p>في هذه البداية السريعة، سنوضح لك كيفية إعداد تطبيق LlamaIndex باستخدام Milvus Lite كمخزن متجه. كما سنوضح لك أيضًا كيفية استخدام تكامل Langfuse LlamaIndex لتتبع تطبيقك.</p>
<p><a href="https://github.com/langfuse/langfuse">Langfuse</a> عبارة عن منصة هندسة LLM مفتوحة المصدر تساعد الفرق على تصحيح أخطاء تطبيقات LLM وتحليلها وتكرارها بشكل تعاوني. جميع ميزات المنصة مدمجة أصلاً لتسريع سير عمل التطوير.</p>
<p><a href="https://github.com/milvus-io/milvus-lite/">Milvus Lite</a> هي نسخة خفيفة الوزن من Milvus، وهي قاعدة بيانات متجهة مفتوحة المصدر تدعم تطبيقات الذكاء الاصطناعي مع تضمينات المتجهات والبحث عن التشابه.</p>
<h2 id="Setup" class="common-anchor-header">الإعداد<button data-href="#Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من تثبيت كل من <code translate="no">llama-index</code> و <code translate="no">langfuse</code>.</p>
<pre><code translate="no" class="language-python">$ pip install llama-index langfuse llama-index-vector-stores-milvus --upgrade
<button class="copy-code-btn"></button></code></pre>
<p>قم بتهيئة التكامل. احصل على مفاتيح واجهة برمجة التطبيقات من <a href="https://cloud.langfuse.com">إعدادات مشروع Langfuse،</a> واستبدل المفتاح العام_المفتاح السري_المفتاح بقيم مفاتيحك. يستخدم هذا المثال OpenAI للتضمينات وإكمال الدردشة، لذلك تحتاج أيضًا إلى تحديد مفتاح OpenAI الخاص بك في متغير البيئة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Get keys for your project from the project settings page</span>
<span class="hljs-comment"># https://cloud.langfuse.com</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_PUBLIC_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_SECRET_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_HOST&quot;</span>] = <span class="hljs-string">&quot;https://cloud.langfuse.com&quot;</span> <span class="hljs-comment"># 🇪🇺 EU region</span>
<span class="hljs-comment"># os.environ[&quot;LANGFUSE_HOST&quot;] = &quot;https://us.cloud.langfuse.com&quot; # 🇺🇸 US region</span>

<span class="hljs-comment"># Your openai key</span>
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.core.callbacks <span class="hljs-keyword">import</span> CallbackManager
<span class="hljs-keyword">from</span> langfuse.llama_index <span class="hljs-keyword">import</span> LlamaIndexCallbackHandler
 
langfuse_callback_handler = LlamaIndexCallbackHandler()
Settings.callback_manager = CallbackManager([langfuse_callback_handler])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-using-Milvus-Lite" class="common-anchor-header">الفهرس باستخدام ميلفوس لايت<button data-href="#Index-using-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document

doc1 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Maxwell &quot;Max&quot; Silverstein, a lauded movie director, screenwriter, and producer, was born on October 25, 1978, in Boston, Massachusetts. A film enthusiast from a young age, his journey began with home movies shot on a Super 8 camera. His passion led him to the University of Southern California (USC), majoring in Film Production. Eventually, he started his career as an assistant director at Paramount Pictures. Silverstein&#x27;s directorial debut, “Doors Unseen,” a psychological thriller, earned him recognition at the Sundance Film Festival and marked the beginning of a successful directing career.
&quot;&quot;&quot;</span>)
doc2 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Throughout his career, Silverstein has been celebrated for his diverse range of filmography and unique narrative technique. He masterfully blends suspense, human emotion, and subtle humor in his storylines. Among his notable works are &quot;Fleeting Echoes,&quot; &quot;Halcyon Dusk,&quot; and the Academy Award-winning sci-fi epic, &quot;Event Horizon&#x27;s Brink.&quot; His contribution to cinema revolves around examining human nature, the complexity of relationships, and probing reality and perception. Off-camera, he is a dedicated philanthropist living in Los Angeles with his wife and two children.
&quot;&quot;&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example index construction + LLM query</span>

<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;tmp/milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">False</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(
    [doc1,doc2], storage_context=storage_context
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query" class="common-anchor-header">استعلام<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
response = index.as_query_engine().query(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Chat</span>
response = index.as_chat_engine().chat(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Explore-traces-in-Langfuse" class="common-anchor-header">استكشاف الآثار في لانجفوس<button data-href="#Explore-traces-in-Langfuse" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># As we want to immediately see result in Langfuse, we need to flush the callback handler</span>
langfuse_callback_handler.flush()
<button class="copy-code-btn"></button></code></pre>
<p>تم! ✨ سترى آثار فهرسك واستعلامك في مشروع لانجفيوز الخاص بك.</p>
<p>أمثلة على الآثار (روابط عامة):</p>
<ol>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/2b26fc72-044f-4b0b-a3c3-485328975161">استعلام</a></li>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/72503163-2b25-4693-9cc9-56190b8e32b9">استعلام (دردشة)</a></li>
</ol>
<p>تتبع في لانجفيوز</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://static.langfuse.com/llamaindex-langfuse-docs.gif" alt="Langfuse Traces" class="doc-image" id="langfuse-traces" />
   </span> <span class="img-wrapper"> <span>آثار لانجفوس</span> </span></p>
<h2 id="Interested-in-more-advanced-features" class="common-anchor-header">هل أنت مهتم بالمزيد من الميزات المتقدمة؟<button data-href="#Interested-in-more-advanced-features" class="anchor-icon" translate="no">
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
    </button></h2><p>راجع <a href="https://langfuse.com/docs/integrations/llama-index/get-started">مستندات التكامل</a> الكاملة لمعرفة المزيد حول الميزات المتقدمة وكيفية استخدامها:</p>
<ul>
<li>قابلية التشغيل البيني مع مجموعة أدوات تطوير البرمجة SDK الخاصة بـ Langfuse Python والتكاملات الأخرى</li>
<li>إضافة بيانات وصفية وسمات مخصصة إلى التتبعات</li>
</ul>
