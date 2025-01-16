---
id: basic_usage_langchain.md
summary: يوضح هذا الدفتر كيفية استخدام الوظائف المتعلقة بقاعدة بيانات متجهات ميلفوس.
title: استخدام Milvus كمخزن للمتجهات
---
<h1 id="Use-Milvus-as-a-Vector-Store" class="common-anchor-header">استخدام Milvus كمخزن للمتجهات<button data-href="#Use-Milvus-as-a-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p><a href="https://milvus.io/docs/overview.md">Milvus</a> هي قاعدة بيانات تقوم بتخزين وفهرسة وإدارة متجهات التضمين الضخمة التي تم إنشاؤها بواسطة الشبكات العصبية العميقة ونماذج التعلم الآلي الأخرى.</p>
</blockquote>
<p>يوضح هذا الدفتر كيفية استخدام الوظائف المتعلقة بقاعدة بيانات Milvus المتجهة.</p>
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
    </button></h2><p>ستحتاج إلى تثبيت <code translate="no">langchain-milvus</code> مع <code translate="no">pip install -qU langchain-milvus</code> لاستخدام هذا التكامل.</p>
<pre><code translate="no" class="language-python">%pip install -qU  langchain_milvus
<button class="copy-code-btn"></button></code></pre>
<p>يأتي الإصدار الأخير من pymilvus مع قاعدة بيانات متجهية محلية Milvus Lite، وهي جيدة للنماذج الأولية. إذا كان لديك حجم كبير من البيانات مثل أكثر من مليون مستند، نوصي بإعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">docker أو kubernetes</a>.</p>
<h3 id="Credentials" class="common-anchor-header">بيانات الاعتماد</h3><p>لا حاجة إلى بيانات اعتماد لاستخدام مخزن المتجهات <code translate="no">Milvus</code>.</p>
<h2 id="Initialization" class="common-anchor-header">التهيئة<button data-href="#Initialization" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-{=mdx}"><span class="hljs-keyword">import</span> <span class="hljs-title class_">EmbeddingTabs</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@theme/EmbeddingTabs&quot;</span>;

&lt;EmbeddingTabs/&gt;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># | output: false</span>
<span class="hljs-comment"># | echo: false</span>
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># The easiest way is to use Milvus Lite where everything is stored in a local file.</span>
<span class="hljs-comment"># If you have a Milvus server you can use the server URI such as &quot;http://localhost:19530&quot;.</span>
URI = <span class="hljs-string">&quot;./milvus_example.db&quot;</span>

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compartmentalize-the-data-with-Milvus-Collections" class="common-anchor-header">تجزئة البيانات باستخدام مجموعات ميلفوس</h3><p>يمكنك تخزين مستندات مختلفة غير مرتبطة في مجموعات مختلفة داخل نفس مثيل Milvus للحفاظ على السياق</p>
<p>إليك كيف يمكنك إنشاء مجموعة جديدة</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.<span class="hljs-property">documents</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">Document</span>

vector_store_saved = <span class="hljs-title class_">Milvus</span>.<span class="hljs-title function_">from_documents</span>(
    [<span class="hljs-title class_">Document</span>(page_content=<span class="hljs-string">&quot;foo!&quot;</span>)],
    embeddings,
    collection_name=<span class="hljs-string">&quot;langchain_example&quot;</span>,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-variable constant_">URI</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>وإليك كيفية استرداد تلك المجموعة المخزنة</p>
<pre><code translate="no" class="language-python">vector_store_loaded = <span class="hljs-title class_">Milvus</span>(
    embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-variable constant_">URI</span>},
    collection_name=<span class="hljs-string">&quot;langchain_example&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-vector-store" class="common-anchor-header">إدارة مخزن المتجهات<button data-href="#Manage-vector-store" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء مخزن المتجهات الخاص بك، يمكننا التفاعل معه عن طريق إضافة عناصر مختلفة وحذفها.</p>
<h3 id="Add-items-to-vector-store" class="common-anchor-header">إضافة عناصر إلى مخزن المتجهات</h3><p>يمكننا إضافة عناصر إلى مخزن المتجهات باستخدام الدالة <code translate="no">add_documents</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> uuid <span class="hljs-keyword">import</span> uuid4

<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

document_1 = Document(
    page_content=<span class="hljs-string">&quot;I had chocalate chip pancakes and scrambled eggs for breakfast this morning.&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tweet&quot;</span>},
)

document_2 = Document(
    page_content=<span class="hljs-string">&quot;The weather forecast for tomorrow is cloudy and overcast, with a high of 62 degrees.&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;news&quot;</span>},
)

document_3 = Document(
    page_content=<span class="hljs-string">&quot;Building an exciting new project with LangChain - come check it out!&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tweet&quot;</span>},
)

document_4 = Document(
    page_content=<span class="hljs-string">&quot;Robbers broke into the city bank and stole $1 million in cash.&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;news&quot;</span>},
)

document_5 = Document(
    page_content=<span class="hljs-string">&quot;Wow! That was an amazing movie. I can&#x27;t wait to see it again.&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tweet&quot;</span>},
)

document_6 = Document(
    page_content=<span class="hljs-string">&quot;Is the new iPhone worth the price? Read this review to find out.&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;website&quot;</span>},
)

document_7 = Document(
    page_content=<span class="hljs-string">&quot;The top 10 soccer players in the world right now.&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;website&quot;</span>},
)

document_8 = Document(
    page_content=<span class="hljs-string">&quot;LangGraph is the best framework for building stateful, agentic applications!&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tweet&quot;</span>},
)

document_9 = Document(
    page_content=<span class="hljs-string">&quot;The stock market is down 500 points today due to fears of a recession.&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;news&quot;</span>},
)

document_10 = Document(
    page_content=<span class="hljs-string">&quot;I have a bad feeling I am going to get deleted :(&quot;</span>,
    metadata={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tweet&quot;</span>},
)

documents = [
    document_1,
    document_2,
    document_3,
    document_4,
    document_5,
    document_6,
    document_7,
    document_8,
    document_9,
    document_10,
]
uuids = [<span class="hljs-built_in">str</span>(uuid4()) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(documents))]

vector_store.add_documents(documents=documents, ids=uuids)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['b0248595-2a41-4f6b-9c25-3a24c1278bb3',
 'fa642726-5329-4495-a072-187e948dd71f',
 '9905001c-a4a3-455e-ab94-72d0ed11b476',
 'eacc7256-d7fa-4036-b1f7-83d7a4bee0c5',
 '7508f7ff-c0c9-49ea-8189-634f8a0244d8',
 '2e179609-3ff7-4c6a-9e05-08978903fe26',
 'fab1f2ac-43e1-45f9-b81b-fc5d334c6508',
 '1206d237-ee3a-484f-baf2-b5ac38eeb314',
 'd43cbf9a-a772-4c40-993b-9439065fec01',
 '25e667bb-6f09-4574-a368-661069301906']
</code></pre>
<h3 id="Delete-items-from-vector-store" class="common-anchor-header">حذف عناصر من مخزن المتجهات</h3><pre><code translate="no" class="language-python">vector_store.<span class="hljs-built_in">delete</span>(ids=[uuids[<span class="hljs-number">-1</span>]])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">(insert count: 0, delete count: 1, upsert count: 0, timestamp: 0, success count: 0, err count: 0, cost: 0)
</code></pre>
<h2 id="Query-vector-store" class="common-anchor-header">الاستعلام عن مخزن المتجهات<button data-href="#Query-vector-store" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء مخزن المتجهات الخاص بك وإضافة المستندات ذات الصلة سترغب على الأرجح في الاستعلام عنه أثناء تشغيل السلسلة أو الوكيل.</p>
<h3 id="Query-directly" class="common-anchor-header">الاستعلام مباشرة</h3><h4 id="Similarity-search" class="common-anchor-header">البحث عن التشابه</h4><p>يمكن إجراء بحث تشابه بسيط مع تصفية البيانات الوصفية على النحو التالي:</p>
<pre><code translate="no" class="language-python">results = vector_store.similarity_search(
    <span class="hljs-string">&quot;LangChain provides abstractions to make working with LLMs easy&quot;</span>,
    k=<span class="hljs-number">2</span>,
    <span class="hljs-built_in">filter</span>={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tweet&quot;</span>},
)
<span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;* <span class="hljs-subst">{res.page_content}</span> [<span class="hljs-subst">{res.metadata}</span>]&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">* Building an exciting new project with LangChain - come check it out! [{'pk': '9905001c-a4a3-455e-ab94-72d0ed11b476', 'source': 'tweet'}]
* LangGraph is the best framework for building stateful, agentic applications! [{'pk': '1206d237-ee3a-484f-baf2-b5ac38eeb314', 'source': 'tweet'}]
</code></pre>
<h4 id="Similarity-search-with-score" class="common-anchor-header">البحث عن التشابه مع الدرجة</h4><p>يمكنك أيضًا البحث بالنتيجة:</p>
<pre><code translate="no" class="language-python">results = vector_store.similarity_search_with_score(
    <span class="hljs-string">&quot;Will it be hot tomorrow?&quot;</span>, k=<span class="hljs-number">1</span>, <span class="hljs-built_in">filter</span>={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;news&quot;</span>}
)
<span class="hljs-keyword">for</span> res, score <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;* [SIM=<span class="hljs-subst">{score:3f}</span>] <span class="hljs-subst">{res.page_content}</span> [<span class="hljs-subst">{res.metadata}</span>]&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">* [SIM=21192.628906] bar [{'pk': '2', 'source': 'https://example.com'}]
</code></pre>
<p>للاطلاع على قائمة كاملة بجميع خيارات البحث المتاحة عند استخدام مخزن المتجهات <code translate="no">Milvus</code> ، يمكنك زيارة <a href="https://api.python.langchain.com/en/latest/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html">مرجع واجهة برمجة التطبيقات</a>.</p>
<h3 id="Query-by-turning-into-retriever" class="common-anchor-header">الاستعلام عن طريق التحويل إلى مسترجع</h3><p>يمكنك أيضًا تحويل مخزن المتجهات إلى مسترجع لسهولة الاستخدام في سلاسل البحث الخاصة بك.</p>
<pre><code translate="no" class="language-python">retriever = vector_store.as_retriever(search_type=<span class="hljs-string">&quot;mmr&quot;</span>, search_kwargs={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">1</span>})
retriever.invoke(<span class="hljs-string">&quot;Stealing from the bank is a crime&quot;</span>, <span class="hljs-built_in">filter</span>={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;news&quot;</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 'eacc7256-d7fa-4036-b1f7-83d7a4bee0c5', 'source': 'news'}, page_content='Robbers broke into the city bank and stole $1 million in cash.')]
</code></pre>
<h2 id="Usage-for-retrieval-augmented-generation" class="common-anchor-header">الاستخدام لتوليد المسترجع المعزز للاسترجاع<button data-href="#Usage-for-retrieval-augmented-generation" class="anchor-icon" translate="no">
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
    </button></h2><p>للحصول على إرشادات حول كيفية استخدام مخزن المتجهات هذا للتوليد المعزز بالاسترجاع (RAG)، راجع الأقسام التالية:</p>
<ul>
<li><a href="https://python.langchain.com/v0.2/docs/tutorials/#working-with-external-knowledge">البرامج التعليمية: العمل مع المعرفة الخارجية</a></li>
<li><a href="https://python.langchain.com/v0.2/docs/how_to/#qa-with-rag">إرشادات إرشادية: سؤال وجواب مع RAG</a></li>
<li><a href="https://python.langchain.com/v0.2/docs/concepts/#retrieval">المستندات المفاهيمية للاسترجاع</a></li>
</ul>
<h3 id="Per-User-Retrieval" class="common-anchor-header">استرجاع لكل مستخدم</h3><p>عند إنشاء تطبيق استرجاع، غالبًا ما يتعين عليك إنشاؤه مع وضع العديد من المستخدمين في الاعتبار. هذا يعني أنك قد تقوم بتخزين البيانات ليس لمستخدم واحد فقط، ولكن للعديد من المستخدمين المختلفين، ويجب ألا يتمكنوا من رؤية بيانات بعضهم البعض.</p>
<p>يوصي ميلفوس باستخدام <a href="https://milvus.io/docs/multi_tenancy.md#Partition-key-based-multi-tenancy">partition_key</a> لتنفيذ الإيجار المتعدد، وإليك مثال على ذلك.</p>
<blockquote>
<p>خاصية مفتاح التقسيم غير متوفرة الآن في Milvus Lite، إذا كنت ترغب في استخدامها، فأنت بحاجة إلى بدء تشغيل خادم Milvus من <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">docker أو kubernetes</a>.</p>
</blockquote>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(page_content=<span class="hljs-string">&quot;i worked at kensho&quot;</span>, metadata={<span class="hljs-string">&quot;namespace&quot;</span>: <span class="hljs-string">&quot;harrison&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;i worked at facebook&quot;</span>, metadata={<span class="hljs-string">&quot;namespace&quot;</span>: <span class="hljs-string">&quot;ankush&quot;</span>}),
]
vectorstore = Milvus.from_documents(
    docs,
    embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
    drop_old=<span class="hljs-literal">True</span>,
    partition_key_field=<span class="hljs-string">&quot;namespace&quot;</span>,  <span class="hljs-comment"># Use the &quot;namespace&quot; field as the partition key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>لإجراء بحث باستخدام مفتاح التقسيم، يجب عليك تضمين أي مما يلي في التعبير المنطقي لطلب البحث</p>
<p><code translate="no">search_kwargs={&quot;expr&quot;: '&lt;partition_key&gt; == &quot;xxxx&quot;'}</code></p>
<p><code translate="no">search_kwargs={&quot;expr&quot;: '&lt;partition_key&gt; == in [&quot;xxx&quot;, &quot;xxx&quot;]'}</code></p>
<p>قم باستبدال <code translate="no">&lt;partition_key&gt;</code> باسم الحقل الذي تم تعيينه كمفتاح القسم.</p>
<p>يتغير Milvus إلى قسم بناءً على مفتاح القسم المحدد، ويقوم بتصفية الكيانات وفقًا لمفتاح القسم، ويبحث بين الكيانات التي تمت تصفيتها.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># This will only get documents for Ankush</span>
vectorstore.as_retriever(search_kwargs={<span class="hljs-string">&quot;expr&quot;</span>: <span class="hljs-string">&#x27;namespace == &quot;ankush&quot;&#x27;</span>}).invoke(
    <span class="hljs-string">&quot;where did i work?&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(page_content='i worked at facebook', metadata={'namespace': 'ankush'})]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># This will only get documents for Harrison</span>
vectorstore.as_retriever(search_kwargs={<span class="hljs-string">&quot;expr&quot;</span>: <span class="hljs-string">&#x27;namespace == &quot;harrison&quot;&#x27;</span>}).invoke(
    <span class="hljs-string">&quot;where did i work?&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(page_content='i worked at kensho', metadata={'namespace': 'harrison'})]
</code></pre>
<h2 id="API-reference" class="common-anchor-header">مرجع واجهة برمجة التطبيقات<button data-href="#API-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>للحصول على توثيق مفصل لجميع ميزات وتكوينات __ModuleName___VectorStore توجه إلى مرجع واجهة برمجة التطبيقات: https://api.python.langchain.com/en/latest/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html</p>