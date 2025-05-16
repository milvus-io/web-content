---
id: basic_usage_langchain.md
summary: 本筆記本說明如何使用與 Milvus 向量資料庫相關的功能。
title: 使用 Milvus 作為向量儲存
---
<h1 id="Use-Milvus-as-a-LangChain-Vector-Store" class="common-anchor-header">使用 Milvus 作為 LangChain 向量儲存庫<button data-href="#Use-Milvus-as-a-LangChain-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h1><p>本筆記展示如何使用<a href="https://milvus.io/docs/overview.md">Milvus</a>作為<a href="https://python.langchain.com/docs/integrations/vectorstores/">LangChain 向量儲存庫</a>的相關功能。</p>
<h2 id="Setup" class="common-anchor-header">設定<button data-href="#Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>您需要安裝<code translate="no">langchain-milvus</code> 與<code translate="no">pip install -qU langchain-milvus</code> 來使用這個整合。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU  langchain_milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>最新版本的 pymilvus 隨附一個本地向量資料庫 Milvus Lite，很適合做為原型。如果您有大規模的資料，例如超過一百萬份的文件，我們建議您在<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。</p>
<h2 id="Initialization" class="common-anchor-header">初始化<button data-href="#Initialization" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings

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
<h3 id="Compartmentalize-the-data-with-Milvus-Collections" class="common-anchor-header">使用 Milvus Collections 區隔資料</h3><p>您可以在同一個 Milvus 實例中，將不同的不相關文件存放在不同的集合中，以維護上下文。</p>
<p>以下是如何從文件建立一個新的向量儲存集合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

vector_store_saved = Milvus.from_documents(
    [Document(page_content=<span class="hljs-string">&quot;foo!&quot;</span>)],
    embeddings,
    collection_name=<span class="hljs-string">&quot;langchain_example&quot;</span>,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
)
<button class="copy-code-btn"></button></code></pre>
<p>以下是如何擷取儲存的集合</p>
<pre><code translate="no" class="language-python">vector_store_loaded = Milvus(
    embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
    collection_name=<span class="hljs-string">&quot;langchain_example&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-vector-store" class="common-anchor-header">管理向量儲存<button data-href="#Manage-vector-store" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦你創建了你的向量商店，我們可以通過添加和刪除不同的項目與它互動。</p>
<h3 id="Add-items-to-vector-store" class="common-anchor-header">新增項目至向量儲存</h3><p>我們可以使用<code translate="no">add_documents</code> 功能將項目新增至向量儲存空間。</p>
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
<h3 id="Delete-items-from-vector-store" class="common-anchor-header">從向量庫中刪除項目</h3><pre><code translate="no" class="language-python">vector_store.delete(ids=[uuids[-<span class="hljs-number">1</span>]])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">(insert count: 0, delete count: 1, upsert count: 0, timestamp: 0, success count: 0, err count: 0, cost: 0)
</code></pre>
<h2 id="Query-vector-store" class="common-anchor-header">查詢向量儲存<button data-href="#Query-vector-store" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦您的向量儲存庫建立完成，並加入相關文件後，您很可能希望在連鎖或代理程式執行期間查詢它。</p>
<h3 id="Query-directly" class="common-anchor-header">直接查詢</h3><h4 id="Similarity-search" class="common-anchor-header">相似性搜尋</h4><p>執行簡單的類似性搜尋並過濾元資料的方法如下：</p>
<pre><code translate="no" class="language-python">results = vector_store.similarity_search(
    <span class="hljs-string">&quot;LangChain provides abstractions to make working with LLMs easy&quot;</span>,
    k=<span class="hljs-number">2</span>,
    expr=<span class="hljs-string">&#x27;source == &quot;tweet&quot;&#x27;</span>,
)
<span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;* <span class="hljs-subst">{res.page_content}</span> [<span class="hljs-subst">{res.metadata}</span>]&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">* Building an exciting new project with LangChain - come check it out! [{'pk': '9905001c-a4a3-455e-ab94-72d0ed11b476', 'source': 'tweet'}]
* LangGraph is the best framework for building stateful, agentic applications! [{'pk': '1206d237-ee3a-484f-baf2-b5ac38eeb314', 'source': 'tweet'}]
</code></pre>
<h4 id="Similarity-search-with-score" class="common-anchor-header">使用分數進行相似性搜尋</h4><p>您也可以使用分數進行搜尋：</p>
<pre><code translate="no" class="language-python">results = vector_store.similarity_search_with_score(
    <span class="hljs-string">&quot;Will it be hot tomorrow?&quot;</span>, k=<span class="hljs-number">1</span>, expr=<span class="hljs-string">&#x27;source == &quot;news&quot;&#x27;</span>
)
<span class="hljs-keyword">for</span> res, score <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;* [SIM=<span class="hljs-subst">{score:3f}</span>] <span class="hljs-subst">{res.page_content}</span> [<span class="hljs-subst">{res.metadata}</span>]&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">* [SIM=21192.628906] bar [{'pk': '2', 'source': 'https://example.com'}]
</code></pre>
<p>如需使用<code translate="no">Milvus</code> 向量商店時可用的所有搜尋選項的完整清單，您可以造訪<a href="https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html">API 參考資料</a>。</p>
<h3 id="Query-by-turning-into-retriever" class="common-anchor-header">透過轉換成retriever進行查詢</h3><p>您也可以將向量儲存轉換成retriever，以便在您的鏈中更容易使用。</p>
<pre><code translate="no" class="language-python">retriever = vector_store.as_retriever(search_type=<span class="hljs-string">&quot;mmr&quot;</span>, search_kwargs={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">1</span>})
retriever.invoke(<span class="hljs-string">&quot;Stealing from the bank is a crime&quot;</span>, <span class="hljs-built_in">filter</span>={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;news&quot;</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 'eacc7256-d7fa-4036-b1f7-83d7a4bee0c5', 'source': 'news'}, page_content='Robbers broke into the city bank and stole $1 million in cash.')]
</code></pre>
<h2 id="Usage-for-Retrieval-Augmented-Generation" class="common-anchor-header">擷取增強世代的使用方式<button data-href="#Usage-for-Retrieval-Augmented-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>有關如何使用此向量儲存器進行retrieval-augmented generation (RAG)，請參閱此<a href="https://milvus.io/docs/integrate_with_langchain.md">RAG 指南</a>。</p>
<h3 id="Per-User-Retrieval" class="common-anchor-header">按使用者擷取</h3><p>在建立擷取應用程式時，您通常必須以多位使用者為考量。這表示您可能不只為一個使用者儲存資料，而是為許多不同的使用者儲存資料，而且他們應該無法看到彼此的資料。</p>
<p>Milvus 建議使用<a href="https://milvus.io/docs/multi_tenancy.md#Partition-key-based-multi-tenancy">partition_key</a>來實現多重租用，這裡是一個範例。</p>
<blockquote>
<p>現在 Milvus Lite 沒有分區鑰匙的功能，如果你想使用它，你需要從<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">docker 或 kubernetes</a> 啟動 Milvus 伺服器。</p>
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
    drop_old=<span class="hljs-literal">False</span>,
    partition_key_field=<span class="hljs-string">&quot;namespace&quot;</span>,  <span class="hljs-comment"># Use the &quot;namespace&quot; field as the partition key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>若要使用分割區金鑰進行搜尋，您應該在搜尋請求的布林表達式中包含下列任一項：</p>
<p><code translate="no">search_kwargs={&quot;expr&quot;: '&lt;partition_key&gt; == &quot;xxxx&quot;'}</code></p>
<p><code translate="no">search_kwargs={&quot;expr&quot;: '&lt;partition_key&gt; == in [&quot;xxx&quot;, &quot;xxx&quot;]'}</code></p>
<p>請以指定為分割區金鑰的欄位名稱取代<code translate="no">&lt;partition_key&gt;</code> 。</p>
<p>Milvus 會根據指定的分割區金鑰變更為分割區，根據分割區金鑰過濾實體，並在過濾的實體中進行搜尋。</p>
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
<h2 id="API-reference" class="common-anchor-header">API 參考<button data-href="#API-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>如需所有 __ModuleName__VectorStore 功能和配置的詳細說明文件，請前往 API 參考：https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html。</p>
