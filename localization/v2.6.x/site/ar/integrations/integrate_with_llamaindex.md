---
id: integrate_with_llamaindex.md
summary: >-
  يوضح هذا الدليل كيفية بناء نظام التوليد المعزز للاسترجاع (RAG) باستخدام
  LlamaIndex و Milvus.
title: التوليد المعزّز للاسترجاع (RAG) باستخدام Milvus و LlamaIndex
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">التوليد المعزّز للاسترجاع (RAG) باستخدام Milvus و LlamaIndex<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>يوضح هذا الدليل كيفية بناء نظام التوليد المعزز للاسترجاع (RAG) باستخدام LlamaIndex و Milvus.</p>
<p>يجمع نظام RAG بين نظام الاسترجاع والنموذج التوليدي لتوليد نص جديد بناءً على مطالبة معينة. يقوم النظام أولاً باسترجاع المستندات ذات الصلة من مجموعة مستندات باستخدام Milvus، ثم يستخدم نموذجًا توليديًا لتوليد نص جديد بناءً على المستندات المسترجعة.</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex</a> هو إطار عمل بسيط ومرن للبيانات لربط مصادر البيانات المخصصة بنماذج لغوية كبيرة (LLMs). <a href="https://milvus.io/">Milvus</a> هي قاعدة بيانات المتجهات الأكثر تقدمًا في العالم مفتوحة المصدر، وهي مصممة لتشغيل تطبيقات البحث عن التشابه المضمنة وتطبيقات الذكاء الاصطناعي.</p>
<p>سنعرض في هذا الدفتر عرضًا توضيحيًا سريعًا لاستخدام MilvusVectorStore.</p>
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">تثبيت التبعيات</h3><p>تتطلب مقتطفات التعليمات البرمجية في هذه الصفحة تبعيات pymilvus و llamaindex. يمكنك تثبيتها باستخدام الأوامر التالية:</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong>. (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">إعداد OpenAI</h3><p>لنبدأ أولاً بإضافة مفتاح Openai api. سيسمح لنا ذلك بالوصول إلى chatgpt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">إعداد البيانات</h3><p>يمكنك تنزيل عينة من البيانات باستخدام الأوامر التالية:</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">البدء<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">توليد بياناتنا</h3><p>كمثال أول، لنقم بإنشاء مستند من الملف <code translate="no">paul_graham_essay.txt</code>. إنه مقال واحد من بول غراهام بعنوان <code translate="no">What I Worked On</code>. لتوليد المستندات سنستخدم SimpleDirectoryReader.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">إنشاء فهرس عبر البيانات</h3><p>الآن بعد أن أصبح لدينا مستند، يمكننا إنشاء فهرس وإدراج المستند. بالنسبة للفهرس سنستخدم MilvusVectorStore. يأخذ MilvusVectorStore بعض الوسيطات:</p>
<h4 id="basic-args" class="common-anchor-header">الوسيطات الأساسية</h4><ul>
<li><code translate="no">uri (str, optional)</code>: URI المطلوب الاتصال به، ويأتي على شكل "https://address:port" لخدمة Milvus أو خدمة Zilliz Cloud، أو "المسار/إلى/إلى/المحلي/ilvus.db" لـ Milvus.db المحلي الخفيف. الافتراضي إلى "./milvus_llamaindex.db".</li>
<li><code translate="no">token (str, optional)</code>: الرمز المميز لتسجيل الدخول. فارغ في حالة عدم استخدام rbac، وفي حالة استخدام rbac سيكون على الأرجح "اسم المستخدم: كلمة المرور".</li>
<li><code translate="no">collection_name (str, optional)</code>: اسم المجموعة التي سيتم تخزين البيانات فيها. افتراضي إلى "llamalection".</li>
<li><code translate="no">overwrite (bool, optional)</code>: ما إذا كان سيتم الكتابة فوق المجموعة الموجودة بنفس الاسم. الإعداد الافتراضي إلى خطأ.</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">الحقول العددية بما في ذلك معرف المستند والنص</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>: اسم حقل doc_id للمجموعة. افتراضي إلى DEFAULT_DOC_ID_KEY.</li>
<li><code translate="no">text_key (str, optional)</code>: ما نص المفتاح المخزن في المجموعة التي تم تمريرها. يُستخدم عند إحضار المجموعة الخاصة بك. يُستخدم افتراضيًا إلى DEFAULT_TEXT_KEY.</li>
<li><code translate="no">scalar_field_names (list, optional)</code>: أسماء الحقول العددية الإضافية التي سيتم تضمينها في مخطط المجموعة.</li>
<li><code translate="no">scalar_field_types (list, optional)</code>: أنواع الحقول العددية الإضافية.</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">حقل كثيف</h4><ul>
<li><code translate="no">enable_dense (bool)</code>: علامة منطقية لتمكين أو تعطيل التضمين الكثيف. الإعداد الافتراضي إلى صواب.</li>
<li><code translate="no">dim (int, optional)</code>: بُعد متجهات التضمين للمجموعة. مطلوبة عند إنشاء مجموعة جديدة مع تمكين_التضمين_الكثيف False.</li>
<li><code translate="no">embedding_field (str, optional)</code>: :: اسم حقل التضمين الكثيف للمجموعة، افتراضيًا إلى DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: التكوين المستخدم لبناء فهرس التضمين الكثيف. الافتراضي إلى لا شيء.</li>
<li><code translate="no">search_config (dict, optional)</code>: التكوين المستخدم للبحث في فهرس ميلفوس الكثيف. لاحظ أن هذا يجب أن يكون متوافقًا مع نوع الفهرس المحدد بواسطة <code translate="no">index_config</code>. الإعداد الافتراضي إلى لا شيء.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: مقياس التشابه المستخدم للتضمين الكثيف، يدعم حاليًا IP وCOSINE و L2.</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">حقل متناثر</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>: علامة منطقية لتمكين أو تعطيل التضمين المتناثر. الإعداد الافتراضي إلى خطأ.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: اسم حقل التضمين المتناثر، افتراضيًا إلى DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: إذا كان enable_sparse صحيحًا، يجب توفير هذا الكائن لتحويل النص إلى تضمين متناثر. إذا كانت بلا، فسيتم استخدام دالة التضمين المتناثر الافتراضية (BGEM3SparseEmbeddingFunction).</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: التكوين المستخدم لبناء فهرس التضمين المتناثر. الإعداد الافتراضي إلى بلا.</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">مصنف هجين</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>: يحدد نوع مصنف التصنيف المستخدم في استعلامات البحث المختلط. يدعم حاليًا فقط ["RRFRFRanker"، "RRFRanker"، "WeightedRanker"]. الافتراضي إلى "RRFRFRanker".</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>: معلمات التكوين لمصنّف البحث الهجين. تعتمد بنية هذا القاموس على مصنف التصنيف المحدد المستخدم:</p>
<ul>
<li>بالنسبة إلى "RRFRFRanker"، يجب أن يتضمن:<ul>
<li>"k" (int): معلمة تُستخدم في دمج الرتب المتبادل (RRF). تُستخدم هذه القيمة لحساب درجات الترتيب كجزء من خوارزمية RRF، والتي تجمع بين استراتيجيات ترتيب متعددة في درجة واحدة لتحسين ملاءمة البحث.</li>
</ul></li>
<li>بالنسبة لـ "WeightedRanker"، فإنه يتوقع<ul>
<li>"الأوزان" (قائمة عائمة): قائمة بأوزان اثنين بالضبط:<ol>
<li>الوزن لمكون التضمين الكثيف.</li>
<li>الوزن الخاص بمكون التضمين المتناثر. تُستخدم هذه الأوزان لضبط أهمية المكونات الكثيفة والمتناثرة للتضمينات في عملية الاسترجاع المختلطة. يُفترض أن يكون افتراضيًا لقاموس فارغ، مما يعني أن المصنف سيعمل بإعداداته الافتراضية المحددة مسبقًا.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">أخرى</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>: خصائص التجميع مثل TTL (الوقت المستغرق) و MMAP (تعيين الذاكرة). الإعدادات الافتراضية إلى لا شيء. يمكن أن تتضمن<ul>
<li>"collection.ttl.ttl.seconds" (int): بمجرد تعيين هذه الخاصية، تنتهي صلاحية البيانات في المجموعة الحالية في الوقت المحدد. سيتم تنظيف البيانات منتهية الصلاحية في المجموعة ولن يتم تضمينها في عمليات البحث أو الاستعلامات.</li>
<li>"mmap.enabled" (صامت): ما إذا كان سيتم تمكين التخزين المعين بالذاكرة على مستوى المجموعة.</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>: يحدد استراتيجية إدارة الفهرس المراد استخدامها. الإعداد الافتراضي إلى "create_if_not_existing".</li>
<li><code translate="no">batch_size (int)</code>: تكوين عدد المستندات التي تتم معالجتها في دفعة واحدة عند إدراج البيانات في Milvus. الإعداد الافتراضي إلى DEFAULT_BATCH_SIZE.</li>
<li><code translate="no">consistency_level (str, optional)</code>: مستوى الاتساق المطلوب استخدامه لمجموعة تم إنشاؤها حديثاً. الإعداد الافتراضي إلى "جلسة عمل".</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>بالنسبة لمعلمات <code translate="no">MilvusVectorStore</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">uri</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">ملف Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">uri</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">الاستعلام عن البيانات</h3><p>الآن بعد أن أصبح لدينا مستندنا المخزن في الفهرس، يمكننا طرح أسئلة على الفهرس. سيستخدم الفهرس البيانات المخزنة في نفسه كقاعدة معرفية للدردشة.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>يُظهر الاختبار التالي أن الكتابة فوقها تزيل البيانات السابقة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>يُظهر الاختبار التالي إضافة بيانات إضافية إلى فهرس موجود بالفعل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">تصفية البيانات الوصفية<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكننا توليد نتائج عن طريق تصفية مصادر محددة. يوضح المثال التالي تحميل جميع المستندات من الدليل ثم تصفيتها لاحقًا بناءً على البيانات الوصفية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p>نريد فقط استرداد المستندات من الملف <code translate="no">uber_2021.pdf</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>نحصل على نتيجة مختلفة هذه المرة عند الاسترداد من الملف <code translate="no">paul_graham_essay.txt</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
