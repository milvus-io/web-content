---
id: full_text_search_with_langchain.md
summary: >-
  سيوضح هذا البرنامج التعليمي كيفية استخدام LangChain و Milvus لتنفيذ البحث عن
  النص الكامل في تطبيقك.
title: استخدام البحث عن النص الكامل مع LangChain وMilvus
---
<h1 id="Using-Full-Text-Search-with-LangChain-and-Milvus" class="common-anchor-header">استخدام البحث عن النص الكامل مع LangChain وMilvus<button data-href="#Using-Full-Text-Search-with-LangChain-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">البحث في النص الكامل</a> هو طريقة تقليدية لاسترجاع المستندات عن طريق مطابقة كلمات أو عبارات محددة في النص. يقوم بترتيب النتائج بناءً على درجات الملاءمة المحسوبة من عوامل مثل تكرار المصطلح. في حين أن البحث الدلالي أفضل في فهم المعنى والسياق، فإن البحث في النص الكامل يتفوق في مطابقة الكلمات المفتاحية بدقة، مما يجعله مكملاً مفيدًا للبحث الدلالي. تُستخدم خوارزمية BM25 على نطاق واسع للترتيب في البحث في النص الكامل وتلعب دورًا رئيسيًا في التوليد المعزز للاسترجاع (RAG).</p>
<p>يقدم<a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">الإصدار Milvus 2.5</a> إمكانات البحث في النص الكامل الأصلي باستخدام BM25. يقوم هذا النهج بتحويل النص إلى متجهات متفرقة تمثل درجات BM25. يمكنك ببساطة إدخال نص أولي وسيقوم Milvus تلقائيًا بإنشاء المتجهات المتفرقة وتخزينها، دون الحاجة إلى إنشاء تضمين يدوي متناثر.</p>
<p>وقد أدى تكامل LangChain مع Milvus إلى تقديم هذه الميزة أيضًا، مما يسهّل عملية دمج البحث في النص الكامل في تطبيقات RAG. من خلال الجمع بين البحث في النص الكامل مع البحث الدلالي مع المتجهات الكثيفة، يمكنك تحقيق نهج هجين يستفيد من كل من السياق الدلالي من التضمينات الكثيفة وملاءمة الكلمات الرئيسية الدقيقة من مطابقة الكلمات. يعمل هذا التكامل على تحسين دقة أنظمة البحث وملاءمتها وتجربة المستخدم.</p>
<p>سيوضح هذا البرنامج التعليمي كيفية استخدام LangChain وMilvus لتنفيذ البحث في النص الكامل في تطبيقك.</p>
<div class="alert note">
<ul>
<li>يتوفر البحث عن النص الكامل حاليًا في Milvus Standalone وMilvus Distributed وZilliz Cloud، على الرغم من عدم دعم هذه الميزة بعد في Milvus Lite (والتي من المقرر تطبيق هذه الميزة في المستقبل). تواصل مع support@zilliz.com لمزيد من المعلومات.</li>
<li>قبل الشروع في هذا البرنامج التعليمي، تأكد من أن لديك فهمًا أساسيًا <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">للبحث في النص الكامل</a> <a href="https://milvus.io/docs/basic_usage_langchain.md">والاستخدام الأساسي</a> لتكامل لانج تشين ميلفوس.</li>
</ul>
</div>
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
    </button></h2><p>قبل تشغيل هذا الدفتر، تأكد من تثبيت التبعيات التالية:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<p>سنستخدم النماذج من OpenAI. يجب عليك إعداد متغيرات البيئة <code translate="no">OPENAI_API_KEY</code> من <a href="https://platform.openai.com/docs/quickstart">OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>حدد خادم Milvus <code translate="no">URI</code> (واختيارياً <code translate="no">TOKEN</code>). لمعرفة كيفية تثبيت خادم ميلفوس وبدء تشغيله باتباع هذا <a href="https://milvus.io/docs/install_standalone-docker-compose.md">الدليل</a>.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>إعداد بعض الأمثلة المستندات:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(page_content=<span class="hljs-string">&quot;I like this apple&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like swimming&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like dogs&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialization-with-BM25-Function" class="common-anchor-header">التهيئة مع وظيفة BM25<button data-href="#Initialization-with-BM25-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Hybrid-Search" class="common-anchor-header">البحث الهجين</h3><p>للبحث في النص الكامل يقبل ميلفوس فيكتور ستور معلمة <code translate="no">builtin_function</code>. من خلال هذه المعلمة، يمكنك تمرير مثيل من <code translate="no">BM25BuiltInFunction</code>. وهذا يختلف عن البحث الدلالي الذي عادةً ما يمرر التضمينات الكثيفة إلى <code translate="no">VectorStore</code>,</p>
<p>فيما يلي مثال بسيط للبحث الهجين في Milvus مع التضمين الكثيف OpenAI للبحث الدلالي و BM25 للبحث في النص الكامل:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    <span class="hljs-comment"># `dense` is for OpenAI embeddings, `sparse` is the output field of BM25 function</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>في الكود أعلاه، نقوم بتعريف مثيل <code translate="no">BM25BuiltInFunction</code> وتمريره إلى كائن <code translate="no">Milvus</code>. <code translate="no">BM25BuiltInFunction</code> هي فئة غلاف خفيفة الوزن لـ <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> في ميلفوس.</p>
<p>يمكنك تحديد حقول الإدخال والإخراج لهذه الدالة في معلمات <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names</code> (str): اسم حقل الإدخال، الافتراضي هو <code translate="no">text</code>. يشير إلى الحقل الذي تقرأه هذه الدالة كمدخل.</li>
<li><code translate="no">output_field_names</code> (str): اسم حقل الإخراج، الافتراضي هو <code translate="no">sparse</code>. يشير إلى الحقل الذي تخرج هذه الدالة النتيجة المحسوبة إليه.</li>
</ul>
<p>لاحظ أنه في معلمات تهيئة ميلفوس المذكورة أعلاه، نحدد أيضًا <code translate="no">vector_field=[&quot;dense&quot;, &quot;sparse&quot;]</code>. نظرًا لأنه يتم أخذ الحقل <code translate="no">sparse</code> كحقل الإخراج المحدد من قبل <code translate="no">BM25BuiltInFunction</code> ، سيتم تعيين الحقل الآخر <code translate="no">dense</code> تلقائيًا إلى حقل الإخراج في OpenAIEmbeddings.</p>
<p>في الممارسة العملية، خاصة عند الجمع بين عدة تضمينات أو دوال، نوصي بتحديد حقول المدخلات والمخرجات لكل دالة بشكل صريح لتجنب الغموض.</p>
<p>في المثال التالي، نحدد حقلي المدخلات والمخرجات في <code translate="no">BM25BuiltInFunction</code> بشكل صريح، مما يوضح الحقل الذي تستخدم فيه الدالة المدمجة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding2 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(
        input_field_names=<span class="hljs-string">&quot;text&quot;</span>, output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>
    ),
    text_field=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># `text` is the input field name of BM25BuiltInFunction</span>
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>في هذا المثال، لدينا ثلاثة حقول متجهة. من بينها، يتم استخدام <code translate="no">sparse</code> كحقل مخرجات لـ <code translate="no">BM25BuiltInFunction</code> ، بينما يتم تعيين الحقلين الآخرين، <code translate="no">dense1</code> و <code translate="no">dense2</code> ، تلقائيًا كحقول مخرجات للنموذجين <code translate="no">OpenAIEmbeddings</code> (بناءً على الترتيب).</p>
<p>وبهذه الطريقة، يمكنك تحديد حقول متجهات متعددة وتعيين مجموعات مختلفة من التضمينات أو الدوال لها، لتنفيذ البحث الهجين.</p>
<p>عند إجراء البحث المختلط، نحتاج فقط إلى تمرير نص الاستعلام وتعيين معلمات topK و reranker اختياريًا. سيتعامل مثيل <code translate="no">vectorstore</code> تلقائيًا مع التضمينات المتجهة والوظائف المدمجة ويستخدم أخيرًا أداة إعادة الترتيب لتنقيح النتائج. يتم إخفاء تفاصيل التنفيذ الأساسية لعملية البحث عن المستخدم.</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(
    <span class="hljs-string">&quot;Do I like apples?&quot;</span>, k=<span class="hljs-number">1</span>
)  <span class="hljs-comment"># , ranker_type=&quot;weighted&quot;, ranker_params={&quot;weights&quot;:[0.3, 0.3, 0.4]})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'fruit', 'pk': 454646931479251897}, page_content='I like this apple')]
</code></pre>
<p>للمزيد من المعلومات حول البحث الهجين، يمكنك الرجوع إلى <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">مقدمة البحث الهجين</a> وهذا <a href="https://milvus.io/docs/milvus_hybrid_search_retriever.md">البرنامج التعليمي للبحث الهجين في LangChain Milvus Milvus</a>.</p>
<h3 id="BM25-search-without-embedding" class="common-anchor-header">بحث BM25 بدون تضمين</h3><p>إذا كنت ترغب في إجراء بحث بنص كامل فقط باستخدام دالة BM25 دون استخدام أي بحث دلالي قائم على التضمين، يمكنك تعيين معلمة التضمين إلى <code translate="no">None</code> والاحتفاظ فقط بـ <code translate="no">builtin_function</code> المحدد كمثيل دالة BM25. يحتوي حقل المتجه على حقل "متناثر" فقط. على سبيل المثال:</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=<span class="hljs-literal">None</span>,
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
    ),
    vector_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['sparse']
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">تخصيص المحلل<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>تُعد المحللات ضرورية في البحث في النص الكامل من خلال تقسيم الجملة إلى رموز وإجراء تحليل معجمي مثل الجذعية وإزالة كلمات التوقف. عادةً ما تكون المحللات خاصة باللغة. يمكنك الرجوع إلى <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">هذا الدليل</a> لمعرفة المزيد عن أدوات التحليل في ملفوس.</p>
<p>يدعم ميلفوس نوعين من المحللات: <strong>المحللات المدمجة</strong> <strong>والمحللات المخصصة</strong>. بشكل افتراضي، سيستخدم <code translate="no">BM25BuiltInFunction</code> بشكل افتراضي <a href="https://milvus.io/docs/standard-analyzer.md">المحلل المدمج القياسي،</a> وهو المحلل الأساسي الذي يقوم بترميز النص بعلامات الترقيم.</p>
<p>إذا كنت ترغب في استخدام محلل مختلف أو تخصيص المحلل، يمكنك تمرير المعلمة <code translate="no">analyzer_params</code> في التهيئة <code translate="no">BM25BuiltInFunction</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom filter</span>
    ],
}


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
        enable_match=<span class="hljs-literal">True</span>,
        analyzer_params=analyzer_params_custom,
    ),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكننا إلقاء نظرة على مخطط مجموعة ميلفوس والتأكد من إعداد المحلل المخصص بشكل صحيح.</p>
<pre><code translate="no" class="language-python">vectorstore.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': True, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'pk', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'dense', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'category', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25_function_de368e79', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse'], 'params': {}}]}
</code></pre>
<p>لمزيد من تفاصيل المفهوم، على سبيل المثال، <code translate="no">analyzer</code> ، <code translate="no">tokenizer</code> ، ، <code translate="no">filter</code> ، <code translate="no">enable_match</code> ، <code translate="no">analyzer_params</code> ، يرجى الرجوع إلى <a href="https://milvus.io/docs/analyzer-overview.md">وثائق المحلل</a>.</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">استخدام البحث الهجين وإعادة الترتيب في RAG<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>لقد تعلمنا كيفية استخدام دالة BM25 الأساسية المدمجة في LangChain و Milvus. دعونا نقدم تطبيق RAG الأمثل مع البحث الهجين وإعادة الترتيب.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>يُظهر هذا الرسم البياني عملية الاسترجاع وإعادة الترتيب الهجين، التي تجمع بين BM25 لمطابقة الكلمات المفتاحية والبحث المتجه لاسترجاع الدلالات. يتم دمج النتائج من كلتا الطريقتين وإعادة ترتيبها وتمريرها إلى جهاز LLM لتوليد الإجابة النهائية.</p>
<p>يوازن البحث الهجين بين الدقة والفهم الدلالي، مما يحسّن الدقة والمتانة للاستعلامات المتنوعة. فهو يسترجع المرشحين باستخدام بحث النص الكامل BM25 والبحث المتجه، مما يضمن استرجاعًا دلاليًا ودقيقًا ومدركًا للسياق.</p>
<p>لنبدأ بمثال.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">إعداد البيانات</h3><p>نستخدم أداة تحميل الويب WebBaseLoader من لانغشين لتحميل المستندات من مصادر الويب وتقسيمها إلى أجزاء باستخدام RecursiveCharacterTextSplitter.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bs4
<span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Create a WebBaseLoader instance to load documents from web sources</span>
loader = WebBaseLoader(
    web_paths=(
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&quot;</span>,
    ),
    bs_kwargs=<span class="hljs-built_in">dict</span>(
        parse_only=bs4.SoupStrainer(
            class_=(<span class="hljs-string">&quot;post-content&quot;</span>, <span class="hljs-string">&quot;post-title&quot;</span>, <span class="hljs-string">&quot;post-header&quot;</span>)
        )
    ),
)
<span class="hljs-comment"># Load documents from web sources using the loader</span>
documents = loader.load()
<span class="hljs-comment"># Initialize a RecursiveCharacterTextSplitter for splitting text into chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">2000</span>, chunk_overlap=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Split the documents into chunks using the text_splitter</span>
docs = text_splitter.split_documents(documents)

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
docs[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'}, page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#')
</code></pre>
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">تحميل المستند إلى مخزن ميلفوس المتجه</h3><p>كما في المقدمة أعلاه، نقوم بتهيئة وتحميل المستندات المعدة في مخزن Milvus vector، والذي يحتوي على حقلي متجهين: <code translate="no">dense</code> لتضمين OpenAI و <code translate="no">sparse</code> لدالة BM25.</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-RAG-chain" class="common-anchor-header">بناء سلسلة RAG</h3><p>نقوم بإعداد مثيل LLM والموجه، ثم ندمجهما في سلسلة RAG باستخدام لغة تعبير LangChain Expression Language.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the OpenAI language model for response generation</span>
llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-4o&quot;</span>, temperature=<span class="hljs-number">0</span>)

<span class="hljs-comment"># Define the prompt template for generating AI responses</span>
PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer.
&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

The response should be specific and use statistics or numbers when possible.

Assistant:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create a PromptTemplate instance with the defined template and input variables</span>
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<span class="hljs-comment"># Convert the vector store to a retriever</span>
retriever = vectorstore.as_retriever()


<span class="hljs-comment"># Define a function to format the retrieved documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>استخدم LCEL (لغة تعبير سلسلة اللغات) لبناء سلسلة RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم باستدعاء سلسلة RAG بسؤال محدد واسترجاع الإجابة</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively generate and execute these programming statements.'
</code></pre>
<p>تهانينا! لقد قمتَ ببناء سلسلة RAG بحث هجينة (متجه كثيف + دالة bm25 متناثرة) مدعومة من Milvus وLangChain.</p>
