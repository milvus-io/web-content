---
id: llamaindex_milvus_hybrid_search.md
title: RAG باستخدام البحث الهجين مع Milvus وLlamaIndex
related_key: LlamaIndex
summary: >-
  يوضح هذا الدفتر كيفية استخدام Milvus للبحث الهجين في خطوط أنابيب RAG
  [LlamaIndex] (https://www.llamaindex.ai/). سنبدأ بالبحث الهجين الافتراضي
  الموصى به (البحث الهجين الدلالي + BM25) ثم نستكشف طرق التضمين المتناثرة
  البديلة الأخرى وتخصيص أداة إعادة الترتيب الهجين.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">RAG باستخدام البحث الهجين مع Milvus وLlamaIndex<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>يستفيد البحث الهجين من نقاط القوة في كلٍ من الاسترجاع الدلالي ومطابقة الكلمات المفتاحية لتقديم نتائج أكثر دقة وذات صلة بالسياق. من خلال الجمع بين مزايا البحث الدلالي ومطابقة الكلمات الرئيسية، يكون البحث الهجين فعالاً بشكل خاص في مهام استرجاع المعلومات المعقدة.</p>
<p>يوضح هذا الدفتر كيفية استخدام Milvus للبحث الهجين في خطوط أنابيب <a href="https://www.llamaindex.ai/">LlamaIndex</a> RAG. سنبدأ بالبحث الهجين الافتراضي الموصى به (البحث الهجين الدلالي + BM25) ثم نستكشف طرق التضمين المتناثرة البديلة الأخرى وتخصيص أداة إعادة الترتيب الهجين.</p>
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
    </button></h2><p><strong>تثبيت التبعيات</strong></p>
<p>قبل البدء، تأكد من تثبيت التبعيات التالية:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، فقد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انتقل إلى قائمة "وقت التشغيل" في أعلى الواجهة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<p><strong>إعداد الحسابات</strong></p>
<p>يستخدم هذا البرنامج التعليمي OpenAI لتضمين النص وتوليد الإجابات. تحتاج إلى إعداد <a href="https://platform.openai.com/api-keys">مفتاح OpenAI API</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لاستخدام مخزن ناقلات Milvus، حدد خادم Milvus الخاص بك <code translate="no">URI</code> (واختيارياً مع <code translate="no">TOKEN</code>). لبدء تشغيل خادم Milvus، يمكنك إعداد خادم Milvus باتباع <a href="https://milvus.io/docs/install-overview.md">دليل تثبيت Milvus</a> أو ببساطة تجربة <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> مجانًا.</p>
<blockquote>
<p>البحث في النص الكامل مدعوم حاليًا في Milvus Standalone وMilvus Distributed وZilliz Cloud، ولكن ليس بعد في Milvus Lite (من المخطط تنفيذه في المستقبل). تواصل مع support@zilliz.com لمزيد من المعلومات.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>تحميل بيانات الأمثلة</strong></p>
<p>قم بتشغيل الأوامر التالية لتحميل نماذج المستندات في دليل "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم استخدم <code translate="no">SimpleDirectoryReaderLoad</code> لتحميل مقال "ما عملت عليه" لبول غراهام:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: f9cece8c-9022-46d8-9d0e-f29d70e1dbbe
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">البحث الهجين مع BM25<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح هذا القسم كيفية إجراء بحث هجين باستخدام BM25. للبدء، سنقوم بتهيئة <code translate="no">MilvusVectorStore</code> وإنشاء فهرس لمثال المستندات. يستخدم التكوين الافتراضي:</p>
<ul>
<li>التضمينات الكثيفة من نموذج التضمين الافتراضي (OpenAI's <code translate="no">text-embedding-ada-002</code>)</li>
<li>BM25 للبحث في النص الكامل إذا كان تمكين_sparse صحيحًا</li>
<li>RRFRFRanker مع k=60 لدمج النتائج إذا تم تمكين البحث المختلط</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documnts</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># vector dimension depends on the embedding model</span>
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable the default full-text search using BM25</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># drop the collection if it already exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:16,645 [DEBUG][_create_connection]: Created new connection using: cf0f4df74b18418bb89ec512063c1244 (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
Default sparse embedding function: BM25BuiltInFunction(input_field_names='text', output_field_names='sparse_embedding').
</code></pre>
<p>فيما يلي مزيد من المعلومات حول وسيطات تكوين الحقول الكثيفة والمتناثرة في <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>الحقل الكثيف</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: علامة منطقية لتمكين أو تعطيل التضمين الكثيف. الإعداد الافتراضي إلى صواب.</li>
<li><code translate="no">dim (int, optional)</code>: بُعد متجهات التضمين للمجموعة.</li>
<li><code translate="no">embedding_field (str, optional)</code>: :: اسم حقل التضمين الكثيف للمجموعة، افتراضيًا إلى DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: التكوين المستخدم لبناء فهرس التضمين الكثيف. الإعداد الافتراضي إلى لا شيء.</li>
<li><code translate="no">search_config (dict, optional)</code>: التكوين المستخدم للبحث في فهرس ميلفوس الكثيف. لاحظ أن هذا يجب أن يكون متوافقًا مع نوع الفهرس المحدد بواسطة <code translate="no">index_config</code>. الإعداد الافتراضي إلى لا شيء.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: مقياس التشابه المستخدم للتضمين الكثيف، يدعم حاليًا IP وCOSINE و L2.</li>
</ul>
<p><strong>حقل متناثر</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: علامة منطقية لتمكين أو تعطيل التضمين المتناثر. الإعداد الافتراضي إلى خطأ.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: اسم حقل التضمين المتناثر، افتراضيًا إلى DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: إذا كان enable_sparse صحيحًا، فيجب توفير هذا الكائن لتحويل النص إلى تضمين متناثر. إذا كان لا يوجد، فسيتم استخدام دالة التضمين المتناثر الافتراضية (BM25BuiltInFunction)، أو استخدام BGEM3SparseEmbedding في حالة عدم وجود دالة تضمين متناثر في المجموعة الحالية بدون دوال مدمجة.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: التكوين المستخدم لبناء فهرس التضمين المتناثر. الإعداد الافتراضي إلى لا شيء.</li>
</ul>
<p>لتمكين البحث الهجين أثناء مرحلة الاستعلام، اضبط <code translate="no">vector_store_query_mode</code> على "هجين". سيؤدي ذلك إلى دمج نتائج البحث وإعادة ترتيبها من كل من البحث الدلالي والبحث بالنص الكامل. دعنا نختبر باستخدام نموذج استعلام: "ما الذي تعلمه المؤلف في Viaweb؟</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned about retail, the importance of user feedback, and the significance of growth
rate as the ultimate test of a startup at Viaweb.
</code></pre>
<h3 id="Customize-text-analyzer" class="common-anchor-header">تخصيص محلل النص</h3><p>تلعب المحللات دورًا حيويًا في البحث في النص الكامل من خلال تقسيم الجمل إلى رموز وإجراء معالجة معجمية، مثل الجذعية وإزالة كلمات التوقف. وهي عادةً ما تكون خاصة باللغة. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">دليل محلل ميلفوس</a>.</p>
<p>يدعم ميلفوس نوعين من المحللات: <strong>المحللات المدمجة</strong> <strong>والمحللات المخصصة</strong>. بشكل افتراضي، إذا تم تعيين <code translate="no">enable_sparse</code> على صواب، فإن <code translate="no">MilvusVectorStore</code> يستخدم <code translate="no">BM25BuiltInFunction</code> مع التكوينات الافتراضية، ويستخدم المحلل المدمج القياسي الذي يقوم بترميز النص بناءً على علامات الترقيم.</p>
<p>لاستخدام محلل مختلف أو تخصيص المحلل الموجود، يمكنك توفير قيم للوسيطة <code translate="no">analyzer_params</code> عند إنشاء <code translate="no">BM25BuiltInFunction</code>. ثم قم بتعيين هذه الدالة على أنها <code translate="no">sparse_embedding_function</code> في <code translate="no">MilvusVectorStore</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction

bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=bm25_function,  <span class="hljs-comment"># BM25 with custom analyzer</span>
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:48,085 [DEBUG][_create_connection]: Created new connection using: 61afd81600cb46ee89f887f16bcbfe55 (async_milvus_client.py:547)
</code></pre>
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">البحث الهجين مع التضمين المتناثر الآخر<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>إلى جانب الجمع بين البحث الدلالي مع BM25، يدعم ميلفوس أيضًا البحث الهجين باستخدام دالة تضمين متفرقة مثل <a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>. يستخدم المثال التالي المثال المدمج <code translate="no">BGEM3SparseEmbeddingFunction</code> لإنشاء تضمينات متفرقة.</p>
<p>أولاً، نحتاج إلى تثبيت الحزمة <code translate="no">FlagEmbedding</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم دعونا ننشئ مخزن المتجهات والفهرس باستخدام نموذج OpenAI الافتراضي لتضمين دنسن و BGE-M3 المدمج للتضمين المتناثر:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BGEM3SparseEmbeddingFunction

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BGEM3SparseEmbeddingFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 68871.99it/s]
2025-04-17 03:39:02,074 [DEBUG][_create_connection]: Created new connection using: ff4886e2f8da44e08304b748d9ac9b51 (async_milvus_client.py:547)
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]
</code></pre>
<p>الآن دعونا نجري استعلام بحث هجين مع نموذج سؤال:</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb??&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunks: 100%|██████████| 1/1 [00:00&lt;00:00, 17.29it/s]


The author learned about retail, the importance of user feedback, the value of growth rate in a
startup, the significance of pricing strategy, the benefits of working on things that weren't
prestigious, and the challenges and rewards of running a startup.
</code></pre>
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">تخصيص وظيفة التضمين المتناثر</h3><p>يمكنك أيضًا تخصيص دالة التضمين المتناثر طالما أنها ترث من <code translate="no">BaseSparseEmbeddingFunction</code> ، بما في ذلك الطرق التالية:</p>
<ul>
<li><code translate="no">encode_queries</code>: تقوم هذه الطريقة بتحويل النصوص إلى قائمة تضمينات متناثرة للاستعلامات.</li>
<li><code translate="no">encode_documents</code>: تقوم هذه الطريقة بتحويل النص إلى قائمة من التضمينات المتفرقة للمستندات.</li>
</ul>
<p>يجب أن يتبع ناتج كل طريقة تنسيق التضمين المتناثر، وهو عبارة عن قائمة من القواميس. يجب أن يحتوي كل قاموس على مفتاح (عدد صحيح) يمثل البُعد، وقيمة مقابلة (قيمة عائمة) تمثل مقدار التضمين في هذا البُعد (على سبيل المثال، {1: 0.5، 2: 0.3}).</p>
<p>على سبيل المثال، إليك تطبيق دالة تضمين متفرقة مخصصة باستخدام BGE-M3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> FlagEmbedding <span class="hljs-keyword">import</span> BGEM3FlagModel
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BaseSparseEmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">ExampleEmbeddingFunction</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbeddingFunction</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.model = BGEM3FlagModel(<span class="hljs-string">&quot;BAAI/bge-m3&quot;</span>, use_fp16=<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, queries: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            queries,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, documents: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            documents,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_to_standard_dict</span>(<span class="hljs-params">self, raw_output</span>):
        result = {}
        <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> raw_output:
            result[<span class="hljs-built_in">int</span>(k)] = raw_output[k]
        <span class="hljs-keyword">return</span> result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">تخصيص معيد ترتيب هجين<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم ميلفوس نوعين من <a href="https://milvus.io/docs/weighted-ranker.md">استراتيجيات إعادة الترتيب</a>: اندماج الرتب المتبادلة (RRF) والتسجيل الموزون. المصنف الافتراضي في البحث الهجين <code translate="no">MilvusVectorStore</code> هو RRF مع k=60. لتخصيص أداة التصنيف الهجين، قم بتعديل المعلمات التالية:</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: تحديد نوع مصنف التصنيف المستخدم في استعلامات البحث المختلط. يدعم حاليًا فقط ["RRFRanker"، "RRFRanker"، "WeightedRanker"]. الافتراضي إلى "RRFRFRanker".</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: معلمات التكوين لمصنّف البحث الهجين. تعتمد بنية هذا القاموس على مصنف التصنيف المحدد المستخدم:<ul>
<li>بالنسبة إلى "RRFRFRanker"، يجب أن يتضمن:<ul>
<li>"k" (int): معلمة تُستخدم في دمج الرتب المتبادل (RRF). تُستخدم هذه القيمة لحساب درجات الترتيب كجزء من خوارزمية RRF، والتي تجمع بين استراتيجيات ترتيب متعددة في درجة واحدة لتحسين ملاءمة البحث. القيمة الافتراضية هي 60 إذا لم يتم تحديدها.</li>
</ul></li>
<li>بالنسبة لـ "WeightedRanker"، فإنه يتوقع<ul>
<li>"الأوزان" (قائمة عائمة): قائمة بأوزان اثنين بالضبط:<ol>
<li>الوزن لمكون التضمين الكثيف.</li>
<li>الوزن لمكون التضمين المتناثر. تُستخدم هذه الأوزان لموازنة أهمية المكونات الكثيفة والمتناثرة للتضمينات في عملية الاسترجاع الهجين. الأوزان الافتراضية هي [1.0، 1.0] إذا لم يتم تحديدها.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Use the existing collection created in the previous example</span>
    enable_sparse=<span class="hljs-literal">True</span>,
    hybrid_ranker=<span class="hljs-string">&quot;WeightedRanker&quot;</span>,
    hybrid_ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>]},
)
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:44:00,419 [DEBUG][_create_connection]: Created new connection using: 09c051fb18c04f97a80f07958856587b (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
No built-in function detected, using BGEM3SparseEmbeddingFunction().
Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 136622.28it/s]
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]


The author learned several valuable lessons at Viaweb, including the importance of understanding
growth rate as the ultimate test of a startup, the significance of user feedback in shaping the
software, and the realization that web applications were the future of software development.
Additionally, the experience at Viaweb taught the author about the challenges and rewards of running
a startup, the value of simplicity in software design, and the impact of pricing strategies on
attracting customers.
</code></pre>
