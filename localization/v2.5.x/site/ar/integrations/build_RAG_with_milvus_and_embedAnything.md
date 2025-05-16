---
id: build_RAG_with_milvus_and_embedAnything.md
summary: >-
  في هذا البرنامج التعليمي، سنشرح في هذا البرنامج التعليمي كيفية إنشاء خط أنابيب
  توليد معزز للاسترجاع (RAG) باستخدام EmbedAnything مع Milvus. بدلًا من الاقتران
  بإحكام مع أي قاعدة بيانات محددة، يستخدم EmbedAnything نظام محول قابل للتوصيل،
  تعمل المحولات كأغلفة تحدد كيفية تنسيق التضمينات وفهرستها وتخزينها في مخزن
  المتجهات المستهدفة.
title: بناء RAG مع Milvus و EmbedAnything
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-RAG-with-Milvus-and-EmbedAnything" class="common-anchor-header">بناء RAG مع Milvus و EmbedAnything<button data-href="#Building-RAG-with-Milvus-and-EmbedAnything" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnything</a> هو خط أنابيب تضمين فائق السرعة وخفيف الوزن مبني في Rust يدعم النصوص وملفات PDF والصور والصوت وغيرها.</p>
<p>في هذا البرنامج التعليمي، سنشرح في هذا البرنامج التعليمي كيفية إنشاء خط أنابيب استرجاع-مُعزّز (RAG) باستخدام EmbedAnything مع <a href="https://milvus.io">Milvus</a>. بدلًا من الاقتران بإحكام مع أي قاعدة بيانات محددة، يستخدم EmbedAnything نظام <strong>محول</strong> قابل للتوصيل - تعمل المحولات كأغلفة تحدد كيفية تنسيق التضمينات وفهرستها وتخزينها في مخزن المتجهات المستهدفة.</p>
<p>من خلال إقران EmbedAnything مع محول Milvus، يمكنك إنشاء تضمينات من أنواع ملفات متنوعة وتخزينها بكفاءة في Milvus في بضعة أسطر من التعليمات البرمجية.</p>
<blockquote>
<p>⚠️ ملاحظة: بينما يتعامل المحول في EmbedAnything مع الإدراج في Milvus، إلا أنه لا يدعم البحث خارج الصندوق. لإنشاء خط أنابيب RAG كامل، ستحتاج أيضًا إلى إنشاء MilvusClient بشكل منفصل وتنفيذ منطق الاسترجاع (على سبيل المثال، البحث عن التشابه عبر المتجهات) كجزء من تطبيقك.</p>
</blockquote>
<h2 id="Preparation" class="common-anchor-header">التحضير<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">التبعيات والبيئة</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU pymilvus openai embed_anything</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، فقد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<h3 id="Clone-the-Repository-and-Load-Adapter" class="common-anchor-header">استنساخ المستودع وتحميل المحول</h3><p>بعد ذلك، سنقوم باستنساخ مستودع <a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnything</a> repo وإضافة الدليل <code translate="no">examples/adapters</code> إلى مسار Python. هذا هو المكان الذي نخزن فيه تطبيق محول Milvus المخصص، والذي يسمح ل EmbedAnything بالتواصل مع Milvus لإدخال المتجهات.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> sys

<span class="hljs-comment"># Clone the EmbedAnything repository if not already cloned</span>
![ -d <span class="hljs-string">&quot;EmbedAnything&quot;</span> ] || git clone https://github.com/StarlightSearch/EmbedAnything.git

<span class="hljs-comment"># Add the `examples/adapters` directory to the Python path</span>
sys.path.append(<span class="hljs-string">&quot;EmbedAnything/examples/adapters&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;✅ EmbedAnything cloned and adapter path added.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">✅ EmbedAnything cloned and adapter path added.
</code></pre>
<p>سنستخدم OpenAI كمحول LLM في خط أنابيب RAG هذا. يجب إعداد <a href="https://platform.openai.com/docs/quickstart">مفتاح api</a> <code translate="no">OPENAI_API_KEY</code> كمتغير بيئة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">بناء RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Initialize-Milvus" class="common-anchor-header">تهيئة ميلفوس</h3><p>قبل أن نقوم بتضمين أي ملفات، نحتاج إلى إعداد مكونين يتفاعلان مع Milvus:</p>
<ol>
<li><code translate="no">MilvusVectorAdapter</code> - هذا هو محول Milvus لـ EmbedAnything، ويُستخدم <strong>فقط لاستيعاب المتجهات</strong> (أي إدراج التضمينات وإنشاء الفهارس). <strong>لا</strong> يدعم حاليًا عمليات البحث.</li>
<li><code translate="no">MilvusClient</code> - هذا هو العميل الرسمي من <code translate="no">pymilvus</code> ، والذي يتيح <strong>الوصول الكامل</strong> إلى إمكانيات Milvus بما في ذلك البحث عن المتجهات والتصفية وإدارة المجموعات.</li>
</ol>
<p>لتجنب الالتباس:</p>
<ul>
<li>فكر في <code translate="no">MilvusVectorAdapter</code> كأداة "للكتابة فقط" لتخزين المتجهات.</li>
<li>فكر في <code translate="no">MilvusClient</code> على أنه محرك "القراءة والبحث" الخاص بك لإجراء الاستعلامات واسترداد المستندات لـ RAG.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> embed_anything
<span class="hljs-keyword">from</span> embed_anything <span class="hljs-keyword">import</span> (
    WhichModel,
    EmbeddingModel,
)
<span class="hljs-keyword">from</span> milvus_db <span class="hljs-keyword">import</span> MilvusVectorAdapter
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Official Milvus client for full operations</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>)

<span class="hljs-comment"># EmbedAnything adapter for pushing embeddings into Milvus</span>
index_name = <span class="hljs-string">&quot;embed_anything_milvus_collection&quot;</span>
milvus_adapter = MilvusVectorAdapter(
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>, collection_name=index_name
)

<span class="hljs-comment"># Delete existing collection if it exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(index_name):
    milvus_client.drop_collection(index_name)

<span class="hljs-comment"># Create a new collection with dimension matching the embedding model later used</span>
milvus_adapter.create_index(dimension=<span class="hljs-number">384</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Ok - Milvus DB connection established.
Collection 'embed_anything_milvus_collection' created with index.
</code></pre>
<div class="alert note">
<p>أما بالنسبة لحجة <code translate="no">MilvusVectorAdapter</code> و <code translate="no">MilvusClient</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">uri</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">ميلفوس لايت</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، على سبيل المثال أكثر من مليون ناقل، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>. في هذا الإعداد، يُرجى استخدام عنوان الخادم والمنفذ كـ uri، على سبيل المثال<code translate="no">http://localhost:19530</code>. إذا قمت بتمكين ميزة المصادقة على Milvus، استخدم "<your_username>:<your_password>" كرمز مميز، وإلا فلا تقم بتعيين الرمز المميز.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، فاضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Initialize-Embedding-Model-and-Embed-PDF-Document" class="common-anchor-header">تهيئة نموذج التضمين وتضمين مستند PDF</h3><p>سنقوم الآن بتهيئة نموذج التضمين. سنستخدم <code translate="no">all-MiniLM-L12-v2 model</code> من مكتبة محولات الجملة، وهو نموذج خفيف الوزن لكنه قوي لتوليد تضمينات نصية. إنه ينتج تضمينات ذات 384 بُعدًا، لذا فإن هذا يتماشى مع تعيين بُعد مجموعة ميلفوس إلى 384. هذه المحاذاة أمر بالغ الأهمية ويضمن التوافق بين الأبعاد المتجهة المخزنة في Milvus وتلك التي تم إنشاؤها بواسطة النموذج.</p>
<p>يدعم EmbedAnything الكثير من نماذج التضمين. لمزيد من التفاصيل، يرجى الرجوع إلى <a href="https://github.com/StarlightSearch/EmbedAnything">الوثائق الرسمية</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the embedding model</span>
model = EmbeddingModel.from_pretrained_hf(
    WhichModel.Bert, model_id=<span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L12-v2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>والآن، لنقم بتضمين ملف PDF. يجعل EmbedAnything من السهل معالجة مستندات PDF (وغيرها الكثير) وتخزين تضميناتها مباشرةً في Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Embed a PDF file</span>
data = embed_anything.embed_file(
    <span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>,
    embedder=model,
    adapter=milvus_adapter,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Converted 12 embeddings for insertion.
Successfully inserted 12 embeddings.
</code></pre>
<h3 id="Retrieve-and-Generate-Response" class="common-anchor-header">استرجاع وتوليد الاستجابة</h3><p>مرة أخرى، فإن <code translate="no">MilvusVectorAdapter</code> من EmbedAnything حاليًا هو تجريد خفيف الوزن لاستيعاب وفهرسة المتجهات فقط. <strong>ولا يدعم</strong> استعلامات <strong>البحث</strong> أو الاسترجاع. لذلك، من أجل البحث عن المستندات ذات الصلة لبناء خط أنابيب RAG الخاص بنا، يجب أن نستخدم مباشرةً مثيل <code translate="no">MilvusClient</code> (<code translate="no">milvus_client</code>) للاستعلام عن مخزن متجهات Milvus الخاص بنا.</p>
<p>تحديد دالة لاسترداد المستندات ذات الصلة من Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    query_vector = <span class="hljs-built_in">list</span>(
        embed_anything.embed_query([question], embedder=model)[<span class="hljs-number">0</span>].embedding
    )
    search_res = milvus_client.search(
        collection_name=index_name,
        data=[query_vector],
        limit=top_k,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    docs = [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<p>تحديد دالة لإنشاء استجابة باستخدام المستندات المسترجعة في خط أنابيب RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_rag_response</span>(<span class="hljs-params">question</span>):
    retrieved_docs = retrieve_documents(question)
    context = <span class="hljs-string">&quot;\n&quot;</span>.join([<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{doc[<span class="hljs-number">0</span>]}</span>\n&quot;</span> <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs])
    system_prompt = (
        <span class="hljs-string">&quot;You are an AI assistant. Provide answers based on the given context.&quot;</span>
    )
    user_prompt = <span class="hljs-string">f&quot;&quot;&quot;
    Use the following pieces of information to answer the question. If the information is not in the context, say you don&#x27;t know.
    
    Context:
    <span class="hljs-subst">{context}</span>
    
    Question: <span class="hljs-subst">{question}</span>
    &quot;&quot;&quot;</span>
    response = openai_client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: system_prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
        ],
    )
    <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
<button class="copy-code-btn"></button></code></pre>
<p>دعنا نختبر خط أنابيب RAG باستخدام نموذج سؤال.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How does Milvus search for similar documents?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: How does Milvus search for similar documents?
Answer: Milvus searches for similar documents primarily through Approximate Nearest Neighbor (ANN) search, which finds the top K vectors closest to a given query vector. It also supports various other types of searches, such as filtering search under specified conditions, range search within a specified radius, hybrid search based on multiple vector fields, and keyword search based on BM25. Additionally, it can perform reranking to adjust the order of search results based on additional criteria, refining the initial ANN search results.
</code></pre>
