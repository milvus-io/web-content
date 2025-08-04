---
id: langchain_milvus_async.md
summary: >-
  يستكشف هذا البرنامج التعليمي كيفية الاستفادة من الدوال غير المتزامنة في لغة
  سلسلة اللغات-ميلفوس لبناء تطبيقات عالية الأداء. باستخدام الدوال غير المتزامنة،
  يمكنك تحسين إنتاجية تطبيقك واستجابته بشكل كبير، خاصةً عند التعامل مع الاسترجاع
  على نطاق واسع.
title: الدوال غير المتزامنة في تكامل لانغتشين ميلفوس
---
<h1 id="Asynchronous-Functions-in-LangChain-Milvus-Integration" class="common-anchor-header">الدوال غير المتزامنة في تكامل لانغتشين ميلفوس<button data-href="#Asynchronous-Functions-in-LangChain-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>يستكشف هذا البرنامج التعليمي كيفية الاستفادة من الدوال غير المتزامنة في <a href="https://github.com/langchain-ai/langchain-milvus">langchain-milvus</a> لبناء تطبيقات عالية الأداء. باستخدام الدوال غير المتزامنة، يمكنك تحسين إنتاجية تطبيقك واستجابته بشكل كبير، خاصةً عند التعامل مع الاسترجاع على نطاق واسع. سواء كنت تقوم ببناء نظام توصية في الوقت الحقيقي، أو تنفيذ بحث دلالي في تطبيقك، أو إنشاء خط أنابيب RAG (استرجاع-جيل معزز)، يمكن أن تساعدك العمليات غير المتزامنة في التعامل مع الطلبات المتزامنة بكفاءة أكبر. يمكن أن توفر قاعدة البيانات المتجهة عالية الأداء Milvus جنبًا إلى جنب مع تجريدات LLM القوية من LangChain أساسًا قويًا لبناء تطبيقات ذكاء اصطناعي قابلة للتطوير.</p>
<h2 id="Async-API-Overview" class="common-anchor-header">نظرة عامة على واجهة برمجة التطبيقات غير المتزامنة<button data-href="#Async-API-Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>توفر langchain-milvus دعمًا شاملاً للعمليات غير المتزامنة، مما يحسن الأداء بشكل كبير في السيناريوهات المتزامنة واسعة النطاق. تحافظ واجهة برمجة التطبيقات غير المتزامنة على تصميم واجهة متناسقة مع واجهة برمجة التطبيقات المتزامنة.</p>
<h3 id="Core-Async-Functions" class="common-anchor-header">الوظائف الأساسية غير المتزامنة</h3><p>لاستخدام العمليات غير المتزامنة في langchain-milvus، ما عليك سوى إضافة بادئة <code translate="no">a</code> إلى أسماء الطرق. يسمح ذلك باستخدام أفضل للموارد وتحسين الإنتاجية عند التعامل مع طلبات الاسترجاع المتزامنة.</p>
<table>
<thead>
<tr><th>نوع العملية</th><th>طريقة المزامنة</th><th>طريقة غير متزامنة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>إضافة نصوص</td><td><code translate="no">add_texts()</code></td><td><code translate="no">aadd_texts()</code></td><td>إضافة نصوص إلى مخزن المتجهات</td></tr>
<tr><td>إضافة مستندات</td><td><code translate="no">add_documents()</code></td><td><code translate="no">aadd_documents()</code></td><td>إضافة مستندات إلى مخزن المتجهات</td></tr>
<tr><td>إضافة تضمينات</td><td><code translate="no">add_embeddings()</code></td><td><code translate="no">aadd_embeddings()</code></td><td>إضافة متجهات التضمين</td></tr>
<tr><td>بحث التشابه</td><td><code translate="no">similarity_search()</code></td><td><code translate="no">asimilarity_search()</code></td><td>البحث الدلالي بالنص</td></tr>
<tr><td>البحث عن المتجهات</td><td><code translate="no">similarity_search_by_vector()</code></td><td><code translate="no">asimilarity_search_by_vector()</code></td><td>البحث الدلالي بالمتجه</td></tr>
<tr><td>البحث بالنتيجة</td><td><code translate="no">similarity_search_with_score()</code></td><td><code translate="no">asimilarity_search_with_score()</code></td><td>البحث الدلالي عن طريق النص وإرجاع درجات التشابه</td></tr>
<tr><td>البحث عن طريق المتجهات بالنتيجة</td><td><code translate="no">similarity_search_with_score_by_vector()</code></td><td><code translate="no">asimilarity_search_with_score_by_vector()</code></td><td>البحث الدلالي حسب المتجه وإرجاع درجات التشابه</td></tr>
<tr><td>البحث بالتنوع</td><td><code translate="no">max_marginal_relevance_search()</code></td><td><code translate="no">amax_marginal_relevance_search()</code></td><td>بحث MMR (إرجاع المتشابهات مع تحسين التنوع أيضًا)</td></tr>
<tr><td>بحث التنوع المتجهي</td><td><code translate="no">max_marginal_relevance_search_by_vector()</code></td><td><code translate="no">amax_marginal_relevance_search_by_vector()</code></td><td>بحث MMR حسب المتجه</td></tr>
<tr><td>عملية الحذف</td><td><code translate="no">delete()</code></td><td><code translate="no">adelete()</code></td><td>حذف المستندات</td></tr>
<tr><td>عملية الإدراج</td><td><code translate="no">upsert()</code></td><td><code translate="no">aupsert()</code></td><td>Upsert (تحديث إذا كانت موجودة، وإلا إدراج) المستندات</td></tr>
<tr><td>البحث في البيانات الوصفية</td><td><code translate="no">search_by_metadata()</code></td><td><code translate="no">asearch_by_metadata()</code></td><td>الاستعلام مع تصفية البيانات الوصفية</td></tr>
<tr><td>الحصول على المفاتيح الأساسية</td><td><code translate="no">get_pks()</code></td><td><code translate="no">aget_pks()</code></td><td>الحصول على المفاتيح الأساسية حسب التعبير</td></tr>
<tr><td>إنشاء من النصوص</td><td><code translate="no">from_texts()</code></td><td><code translate="no">afrom_texts()</code></td><td>إنشاء مخزن متجه من النصوص</td></tr>
</tbody>
</table>
<p>لمزيد من المعلومات التفصيلية حول هذه الدوال، يرجى الرجوع إلى <a href="https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html#milvus">مرجع واجهة برمجة التطبيقات</a>.</p>
<h3 id="Performance-Benefits" class="common-anchor-header">مزايا الأداء</h3><p>توفر العمليات غير المتزامنة تحسينات كبيرة في الأداء عند التعامل مع كميات كبيرة من الطلبات المتزامنة، وهي مناسبة بشكل خاص لـ</p>
<ul>
<li>معالجة المستندات المجمعة</li>
<li>سيناريوهات البحث عالية التزامن</li>
<li>تطبيقات RAG للإنتاج</li>
<li>استيراد/تصدير البيانات على نطاق واسع</li>
</ul>
<p>في هذا البرنامج التعليمي، سنوضح في هذا البرنامج التعليمي فوائد الأداء هذه من خلال مقارنات مفصلة للعمليات المتزامنة وغير المتزامنة، لنوضح لك كيفية الاستفادة من واجهات برمجة التطبيقات غير المتزامنة لتحقيق الأداء الأمثل في تطبيقاتك.</p>
<h2 id="Before-you-begin" class="common-anchor-header">قبل أن تبدأ<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>تتطلب مقتطفات التعليمات البرمجية في هذه الصفحة التبعيات التالية:</p>
<pre><code translate="no" class="language-python">! pip install -U pymilvus langchain-milvus langchain langchain-core langchain-openai langchain-text-splitters nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</blockquote>
<p>سنستخدم نماذج OpenAI. يجب عليك إعداد <a href="https://platform.openai.com/docs/quickstart">مفتاح api</a> <code translate="no">OPENAI_API_KEY</code> كمتغير بيئة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت تستخدم دفتر Jupyter Notebook، فستحتاج إلى تشغيل هذا السطر من التعليمات البرمجية قبل تشغيل التعليمات البرمجية غير المتزامنة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Exploring-Async-APIs-and-Performance-Comparison" class="common-anchor-header">استكشاف واجهات برمجة التطبيقات غير المتزامنة ومقارنة الأداء<button data-href="#Exploring-Async-APIs-and-Performance-Comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن دعنا نتعمق أكثر في مقارنة الأداء بين العمليات المتزامنة وغير المتزامنة باستخدام langchain-milvus.</p>
<p>أولًا، استورد المكتبات اللازمة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Define the Milvus URI</span>
URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-up-Test-Functions" class="common-anchor-header">إعداد دوال الاختبار</h3><p>لننشئ دوال مساعدة لتوليد بيانات الاختبار:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    <span class="hljs-string">&quot;&quot;&quot;Generate a random string ID&quot;&quot;&quot;</span>
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_test_documents</span>(<span class="hljs-params">num_docs</span>):
    <span class="hljs-string">&quot;&quot;&quot;Generate test documents for performance testing&quot;&quot;&quot;</span>
    docs = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_docs):
        content = (
            <span class="hljs-string">f&quot;This is test document <span class="hljs-subst">{i}</span> with some random content: <span class="hljs-subst">{random.random()}</span>&quot;</span>
        )
        metadata = {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">f&quot;doc_<span class="hljs-subst">{i}</span>&quot;</span>,
            <span class="hljs-string">&quot;score&quot;</span>: random.random(),
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">f&quot;cat_<span class="hljs-subst">{i % <span class="hljs-number">5</span>}</span>&quot;</span>,
        }
        doc = Document(page_content=content, metadata=metadata)
        docs.append(doc)
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Initialize-the-Vector-Store" class="common-anchor-header">تهيئة مخزن المتجهات</h3><p>قبل أن نتمكن من إجراء اختبارات الأداء الخاصة بنا، نحتاج إلى إعداد مخزن متجه Milvus نظيف. تضمن هذه الدالة أن نبدأ بمجموعة جديدة لكل اختبار، مما يزيل أي تداخل من البيانات السابقة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-string">&quot;&quot;&quot;Initialize and return a fresh vector store for testing&quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> Milvus(
        embedding_function=OpenAIEmbeddings(),
        collection_name=<span class="hljs-string">&quot;langchain_perf_test&quot;</span>,
        connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
        auto_id=<span class="hljs-literal">True</span>,
        drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Always start with a fresh collection</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Async-vs-Sync-Add-Documents" class="common-anchor-header">المزامنة مقابل المزامنة: إضافة مستندات</h3><p>لنقارن الآن أداء إضافة المستندات المتزامنة مقابل إضافة المستندات غير المتزامنة. ستساعدنا هذه الوظائف في قياس مدى سرعة العمليات غير المتزامنة عند إضافة مستندات متعددة إلى مخزن المتجهات. يقوم الإصدار غير المتزامن بإنشاء مهام لكل عملية إضافة مستند وتشغيلها بشكل متزامن، بينما يقوم الإصدار المتزامن بمعالجة المستندات واحدًا تلو الآخر:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents asynchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        <span class="hljs-comment"># Create tasks for each document addition</span>
        task = milvus_store.aadd_documents([doc])
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents synchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        result = milvus_store.add_documents([doc])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>الآن دعنا ننفذ اختبارات الأداء الخاصة بنا مع أعداد مختلفة من المستندات لنرى الاختلافات في الأداء في العالم الحقيقي. سنختبر بأحمال متفاوتة لفهم كيفية قياس العمليات غير المتزامنة مقارنةً بنظيراتها المتزامنة. ستقيس الاختبارات وقت التنفيذ لكلتا الطريقتين وتساعد في توضيح فوائد أداء العمليات غير المتزامنة:</p>
<pre><code translate="no" class="language-python">add_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Get the event loop</span>
loop = asyncio.get_event_loop()

<span class="hljs-comment"># Create a new vector store for testing</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test async document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())

<span class="hljs-comment"># Reset vector store for sync tests</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test sync document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:44:12,274 [DEBUG][_create_connection]: Created new connection using: dd5f77bb78964c079da42c2446b03bf6 (async_milvus_client.py:599)


Async add for 10 documents took 1.74 seconds


2025-06-05 10:44:16,940 [DEBUG][_create_connection]: Created new connection using: 8b13404a78654cdd9b790371eb44e427 (async_milvus_client.py:599)


Async add for 100 documents took 2.77 seconds
Sync add for 10 documents took 5.36 seconds
Sync add for 100 documents took 65.60 seconds
</code></pre>
<h3 id="Async-vs-Sync-Search" class="common-anchor-header">غير المتزامنة مقابل المتزامنة: البحث</h3><p>لمقارنة أداء البحث، سنحتاج إلى ملء مخزن المتجهات أولاً. ستساعدنا الدوال التالية في قياس أداء البحث من خلال إنشاء استعلامات بحث متزامنة متعددة ومقارنة وقت التنفيذ بين النهج المتزامن وغير المتزامن:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">populate_vector_store</span>(<span class="hljs-params">milvus_store, num_docs=<span class="hljs-number">1000</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;Populate the vector store with test documents&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_docs)
    milvus_store.add_documents(docs)
    <span class="hljs-keyword">return</span> docs


<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform async searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        task = milvus_store.asimilarity_search(query=query, k=<span class="hljs-number">3</span>)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform sync searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        result = milvus_store.similarity_search(query=query, k=<span class="hljs-number">3</span>)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>الآن دعنا نجري اختبارات أداء بحث شاملة لنرى كيف يمكن قياس أداء العمليات غير المتزامنة مقارنةً بالعمليات المتزامنة. سنختبر باستخدام أحجام استعلامات مختلفة لتوضيح فوائد أداء العمليات غير المتزامنة، خاصةً مع زيادة عدد العمليات المتزامنة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

query_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Test async search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())

<span class="hljs-comment"># Test sync search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:45:28,131 [DEBUG][_create_connection]: Created new connection using: 851824591c64415baac843e676e78cdd (async_milvus_client.py:599)


Async search for 10 queries took 2.31 seconds
Async search for 100 queries took 3.72 seconds
Sync search for 10 queries took 6.07 seconds
Sync search for 100 queries took 54.22 seconds
</code></pre>
<h3 id="Async-vs-Sync-Delete" class="common-anchor-header">غير المتزامنة مقابل المتزامنة: الحذف</h3><p>عمليات الحذف هي جانب مهم آخر حيث يمكن أن توفر العمليات غير المتزامنة تحسينات كبيرة في الأداء. لنقم بإنشاء دوال لقياس فرق الأداء بين عمليات الحذف المتزامنة وغير المتزامنة. ستساعد هذه الاختبارات في توضيح كيف يمكن لعمليات الحذف غير المتزامنة التعامل مع عمليات الحذف المجمعة بكفاءة أكبر:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents asynchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        task = milvus_store.adelete(expr=expr)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents synchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        result = milvus_store.delete(expr=expr)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>الآن دعنا ننفذ اختبارات أداء الحذف لقياس فرق الأداء. سنبدأ بمخزن متجه جديد مملوء ببيانات الاختبار، ثم ننفذ عمليات الحذف باستخدام كل من النهجين المتزامن وغير المتزامن:</p>
<pre><code translate="no" class="language-python">delete_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test async delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_delete</span>():
        async_time = <span class="hljs-keyword">await</span> async_delete(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_delete())

<span class="hljs-comment"># Reset and repopulate the vector store for sync tests</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test sync delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:
    sync_time = sync_delete(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:46:57,211 [DEBUG][_create_connection]: Created new connection using: 504e9ce3be92411e87077971c82baca2 (async_milvus_client.py:599)


Async delete for 10 operations took 0.58 seconds


2025-06-05 10:47:12,309 [DEBUG][_create_connection]: Created new connection using: 22c1513b444e4c40936e2176d7a1a154 (async_milvus_client.py:599)


Async delete for 100 operations took 0.61 seconds
Sync delete for 10 operations took 2.82 seconds
Sync delete for 100 operations took 29.21 seconds
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
    </button></h2><p>أظهر هذا البرنامج التعليمي مزايا الأداء الكبيرة لاستخدام العمليات غير المتزامنة مع LangChain و Milvus. قمنا بمقارنة الإصدارات المتزامنة وغير المتزامنة لعمليات الإضافة والبحث والحذف، موضحين كيف يمكن للعمليات غير المتزامنة أن توفر تحسينات كبيرة في السرعة، خاصةً للعمليات المجمعة الكبيرة.</p>
<p>الوجبات الرئيسية:</p>
<ol>
<li>توفر العمليات غير المتزامنة أكبر فائدة عند تنفيذ العديد من العمليات الفردية التي يمكن تشغيلها بالتوازي</li>
<li>بالنسبة لأعباء العمل التي تولد إنتاجية أعلى، تتسع فجوة الأداء بين العمليات المتزامنة وغير المتزامنة</li>
<li>تستفيد العمليات غير المتزامنة استفادة كاملة من قوة الحوسبة للأجهزة</li>
</ol>
<p>عند إنشاء تطبيقات RAG للإنتاج باستخدام LangChain وMilvus، ضع في اعتبارك استخدام واجهة برمجة التطبيقات غير المتزامنة عندما يكون الأداء مصدر قلق، خاصةً بالنسبة للعمليات المتزامنة.</p>
