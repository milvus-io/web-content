---
id: llamaindex_milvus_full_text_search.md
title: استخدام البحث عن النص الكامل مع LlamaIndex و Milvus
related_key: LlamaIndex
summary: >-
  في هذا البرنامج التعليمي، سوف تتعلم كيفية استخدام LlamaIndex و Milvus لبناء
  نظام RAG باستخدام البحث في النص الكامل والبحث المختلط. سنبدأ بتنفيذ البحث
  بالنص الكامل وحده ثم نعززه من خلال دمج البحث الدلالي للحصول على نتائج أكثر
  شمولاً.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">استخدام البحث عن النص الكامل مع LlamaIndex و Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>يستخدم<strong>البحث عن النص الكامل</strong> مطابقة الكلمات المفتاحية بشكل دقيق، وغالبًا ما يستفيد من خوارزميات مثل BM25 لترتيب المستندات حسب الصلة. في أنظمة <strong>التوليد المعزز للاسترجاع (RAG)</strong> ، تسترجع هذه الطريقة النص ذا الصلة لتعزيز الاستجابات التي يتم إنشاؤها بواسطة الذكاء الاصطناعي.</p>
<p>وفي الوقت نفسه، يفسر <strong>البحث الدلالي</strong> المعنى السياقي لتقديم نتائج أوسع نطاقًا. يؤدي الجمع بين كلا النهجين إلى إنشاء <strong>بحث هجين</strong> يحسن استرجاع المعلومات - خاصةً في الحالات التي تقصر فيها طريقة واحدة.</p>
<p>باستخدام نهج Sparse-BM25 في <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5،</a> يتم تحويل النص الخام تلقائيًا إلى متجهات متفرقة. هذا يلغي الحاجة إلى توليد التضمين المتناثر يدويًا ويتيح استراتيجية بحث هجينة توازن بين الفهم الدلالي وأهمية الكلمات الرئيسية.</p>
<p>في هذا البرنامج التعليمي، سوف تتعلم كيفية استخدام LlamaIndex وMilvus لبناء نظام RAG باستخدام البحث في النص الكامل والبحث الهجين. سنبدأ بتنفيذ البحث بالنص الكامل وحده ثم نعززه من خلال دمج البحث الدلالي للحصول على نتائج أكثر شمولاً.</p>
<blockquote>
<p>قبل الشروع في هذا البرنامج التعليمي، تأكد من أنك على دراية <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">بالبحث</a> في <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">النص الكامل</a> <a href="https://milvus.io/docs/integrate_with_llamaindex.md">وأساسيات استخدام Milvus في LlamaIndex</a>.</p>
</blockquote>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>إذا كنت تستخدم Google Colab، فقد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انتقل إلى قائمة "وقت التشغيل" في أعلى الواجهة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</blockquote>
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
<p><strong>تنزيل أمثلة للبيانات</strong></p>
<p>قم بتشغيل الأوامر التالية لتنزيل نماذج المستندات في دليل "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG مع البحث عن النص الكامل<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل دمج البحث بالنص الكامل في نظام RAG على تحقيق التوازن بين البحث الدلالي والاسترجاع الدقيق والمتوقع القائم على الكلمات المفتاحية. يمكنك أيضًا اختيار استخدام البحث بالنص الكامل فقط على الرغم من أنه يوصى بدمج البحث بالنص الكامل مع البحث الدلالي للحصول على نتائج بحث أفضل. هنا لغرض العرض التوضيحي سنعرض البحث بالنص الكامل وحده والبحث المختلط.</p>
<p>للبدء، استخدم <code translate="no">SimpleDirectoryReaderLoad</code> لتحميل مقال "ما عملت عليه" للكاتب بول غراهام:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">البحث بالنص الكامل مع BM25</h3><p>يدعم موقع LlamaIndex <code translate="no">MilvusVectorStore</code> البحث في النص الكامل، مما يتيح الاسترجاع الفعال القائم على الكلمات الرئيسية. باستخدام دالة مدمجة كـ <code translate="no">sparse_embedding_function</code> ، فإنه يطبق تصنيف BM25 لترتيب نتائج البحث.</p>
<p>سنوضح في هذا القسم كيفية تنفيذ نظام RAG باستخدام BM25 للبحث في النص الكامل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>يقوم الرمز أعلاه بإدراج أمثلة على المستندات في Milvus وإنشاء فهرس لتمكين تصنيف BM25 للبحث في النص الكامل. يقوم بتعطيل التضمين الكثيف ويستخدم <code translate="no">BM25BuiltInFunction</code> مع المعلمات الافتراضية.</p>
<p>يمكنك تحديد حقول الإدخال والإخراج في معلمات <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: حقل نص الإدخال (افتراضي: "نص"). يشير إلى حقل النص الذي تطبق عليه خوارزمية BM25. قم بتغيير هذا إذا كنت تستخدم مجموعتك الخاصة باسم حقل نصي مختلف.</li>
<li><code translate="no">output_field_names (str)</code>: الحقل حيث يتم تخزين مخرجات دالة BM25 هذه (افتراضي: "sparse_embedding").</li>
</ul>
<p>بمجرد إعداد مخزن المتجهات، يمكنك إجراء استعلامات بحث عن النص الكامل باستخدام Milvus مع وضع الاستعلام "متناثر" أو "text_search":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">تخصيص محلل النص</h4><p>تلعب المحللات دورًا حيويًا في البحث في النص الكامل من خلال تقسيم الجمل إلى رموز وإجراء معالجة معجمية، مثل الجذعية وإزالة كلمات التوقف. وهي عادةً ما تكون خاصة باللغة. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">دليل محلل ميلفوس</a>.</p>
<p>يدعم ميلفوس نوعين من المحللات: <strong>المحللات المدمجة</strong> <strong>والمحللات المخصصة</strong>. بشكل افتراضي، يستخدم <code translate="no">BM25BuiltInFunction</code> المحلل المدمج القياسي، الذي يقوم بترميز النص بناءً على علامات الترقيم.</p>
<p>لاستخدام محلل مختلف أو تخصيص المحلل الموجود، يمكنك تمرير قيمة إلى الوسيطة <code translate="no">analyzer_params</code>:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">البحث الهجين مع أداة إعادة التصنيف</h3><p>يجمع نظام البحث الهجين بين البحث الدلالي والبحث في النص الكامل، مما يحسن أداء الاسترجاع في نظام RAG.</p>
<p>يستخدم المثال التالي تضمين OpenAI للبحث الدلالي و BM25 للبحث في النص الكامل:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>كيف يعمل</strong></p>
<p>يقوم هذا النهج بتخزين المستندات في مجموعة Milvus مع كلا الحقلين المتجهين:</p>
<ul>
<li><code translate="no">embedding</code>: التضمينات الكثيفة التي تم إنشاؤها بواسطة نموذج التضمين OpenAI للبحث الدلالي.</li>
<li><code translate="no">sparse_embedding</code>: التضمينات المتفرقة المحسوبة باستخدام BM25BuiltInFunction للبحث في النص الكامل.</li>
</ul>
<p>بالإضافة إلى ذلك، قمنا بتطبيق استراتيجية إعادة الترتيب باستخدام "RRFRanker" بمعلماته الافتراضية. لتخصيص أداة إعادة التصنيف، يمكنك تهيئة <code translate="no">hybrid_ranker</code> و <code translate="no">hybrid_ranker_params</code> باتباع <a href="https://milvus.io/docs/reranking.md">دليل إعادة التصنيف الخاص بـ Milvus Reranking</a>.</p>
<p>والآن، دعنا نختبر نظام RAG باستخدام نموذج استعلام:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>يضمن هذا النهج الهجين استجابات أكثر دقة وإدراكًا للسياق في نظام RAG من خلال الاستفادة من كل من الاسترجاع الدلالي والاسترجاع القائم على الكلمات الرئيسية.</p>
