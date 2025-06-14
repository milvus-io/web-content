---
id: basic_usage_langchain.md
summary: 이 노트북은 Milvus 벡터 데이터베이스와 관련된 기능을 사용하는 방법을 보여줍니다.
title: Milvus를 벡터 저장소로 사용
---
<h1 id="Use-Milvus-as-a-LangChain-Vector-Store" class="common-anchor-header">Milvus를 LangChain 벡터 저장소로 사용하기<button data-href="#Use-Milvus-as-a-LangChain-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h1><p>이 노트북은 <a href="https://python.langchain.com/docs/integrations/vectorstores/">LangChain 벡터 저장소로서</a> <a href="https://milvus.io/docs/overview.md">Milvus와</a> 관련된 기능을 사용하는 방법을 보여줍니다.</p>
<h2 id="Setup" class="common-anchor-header">설정<button data-href="#Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>이 통합을 사용하려면 <code translate="no">pip install -qU langchain-milvus</code> 으로 <code translate="no">langchain-milvus</code> 을 설치해야 합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU  langchain_milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>최신 버전의 pymilvus에는 프로토타이핑에 좋은 로컬 벡터 데이터베이스 Milvus Lite가 함께 제공됩니다. 백만 개 이상의 문서와 같은 대규모 데이터가 있는 경우에는 <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">도커 또는 쿠버네티스에서</a> 더 성능이 뛰어난 Milvus 서버를 설정하는 것이 좋습니다.</p>
<h2 id="Initialization" class="common-anchor-header">초기화<button data-href="#Initialization" class="anchor-icon" translate="no">
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
<h3 id="Compartmentalize-the-data-with-Milvus-Collections" class="common-anchor-header">Milvus 컬렉션으로 데이터 구획화하기</h3><p>서로 관련이 없는 여러 문서를 동일한 Milvus 인스턴스 내에서 서로 다른 컬렉션에 저장하여 컨텍스트를 유지할 수 있습니다.</p>
<p>문서에서 새 벡터 스토어 컬렉션을 만드는 방법은 다음과 같습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

vector_store_saved = Milvus.from_documents(
    [Document(page_content=<span class="hljs-string">&quot;foo!&quot;</span>)],
    embeddings,
    collection_name=<span class="hljs-string">&quot;langchain_example&quot;</span>,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
)
<button class="copy-code-btn"></button></code></pre>
<p>그리고 저장된 컬렉션을 검색하는 방법은 다음과 같습니다.</p>
<pre><code translate="no" class="language-python">vector_store_loaded = Milvus(
    embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
    collection_name=<span class="hljs-string">&quot;langchain_example&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-vector-store" class="common-anchor-header">벡터 저장소 관리<button data-href="#Manage-vector-store" class="anchor-icon" translate="no">
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
    </button></h2><p>벡터 저장소를 만든 후에는 다양한 항목을 추가하고 삭제하여 벡터 저장소와 상호 작용할 수 있습니다.</p>
<h3 id="Add-items-to-vector-store" class="common-anchor-header">벡터 스토어에 항목 추가하기</h3><p><code translate="no">add_documents</code> 함수를 사용하여 벡터 스토어에 항목을 추가할 수 있습니다.</p>
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
<h3 id="Delete-items-from-vector-store" class="common-anchor-header">벡터 스토어에서 아이템 삭제하기</h3><pre><code translate="no" class="language-python">vector_store.delete(ids=[uuids[-<span class="hljs-number">1</span>]])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">(insert count: 0, delete count: 1, upsert count: 0, timestamp: 0, success count: 0, err count: 0, cost: 0)
</code></pre>
<h2 id="Query-vector-store" class="common-anchor-header">벡터 스토어 쿼리<button data-href="#Query-vector-store" class="anchor-icon" translate="no">
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
    </button></h2><p>벡터 스토어가 만들어지고 관련 문서가 추가되면 체인이나 에이전트를 실행하는 동안 벡터 스토어를 쿼리하고 싶을 때가 많습니다.</p>
<h3 id="Query-directly" class="common-anchor-header">직접 쿼리하기</h3><h4 id="Similarity-search" class="common-anchor-header">유사도 검색</h4><p>메타데이터를 필터링하여 간단한 유사도 검색을 수행하는 방법은 다음과 같습니다:</p>
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
<h4 id="Similarity-search-with-score" class="common-anchor-header">점수로 유사도 검색</h4><p>점수로 검색할 수도 있습니다:</p>
<pre><code translate="no" class="language-python">results = vector_store.similarity_search_with_score(
    <span class="hljs-string">&quot;Will it be hot tomorrow?&quot;</span>, k=<span class="hljs-number">1</span>, expr=<span class="hljs-string">&#x27;source == &quot;news&quot;&#x27;</span>
)
<span class="hljs-keyword">for</span> res, score <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;* [SIM=<span class="hljs-subst">{score:3f}</span>] <span class="hljs-subst">{res.page_content}</span> [<span class="hljs-subst">{res.metadata}</span>]&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">* [SIM=21192.628906] bar [{'pk': '2', 'source': 'https://example.com'}]
</code></pre>
<p><code translate="no">Milvus</code> 벡터 저장소를 사용할 때 사용할 수 있는 모든 검색 옵션의 전체 목록을 보려면 <a href="https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html">API 참조를 참조하세요</a>.</p>
<h3 id="Query-by-turning-into-retriever" class="common-anchor-header">리트리버로 전환하여 쿼리하기</h3><p>벡터 스토어를 리트리버로 변환하여 체인에서 더 쉽게 사용할 수도 있습니다.</p>
<pre><code translate="no" class="language-python">retriever = vector_store.as_retriever(search_type=<span class="hljs-string">&quot;mmr&quot;</span>, search_kwargs={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">1</span>})
retriever.invoke(<span class="hljs-string">&quot;Stealing from the bank is a crime&quot;</span>, <span class="hljs-built_in">filter</span>={<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;news&quot;</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 'eacc7256-d7fa-4036-b1f7-83d7a4bee0c5', 'source': 'news'}, page_content='Robbers broke into the city bank and stole $1 million in cash.')]
</code></pre>
<h2 id="Usage-for-Retrieval-Augmented-Generation" class="common-anchor-header">검색 증강 세대에 대한 사용법<button data-href="#Usage-for-Retrieval-Augmented-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>검색 증강 생성(RAG)을 위해 이 벡터 저장소를 사용하는 방법에 대한 가이드는 이 <a href="https://milvus.io/docs/integrate_with_langchain.md">RAG 가이드를</a> 참조하세요.</p>
<h3 id="Per-User-Retrieval" class="common-anchor-header">사용자별 검색</h3><p>검색 앱을 구축할 때는 여러 사용자를 염두에 두고 앱을 구축해야 하는 경우가 많습니다. 즉, 한 명의 사용자뿐만 아니라 여러 사용자를 위해 데이터를 저장할 수 있으며, 서로의 데이터를 볼 수 없어야 합니다.</p>
<p>Milvus는 멀티 테넌시를 구현하기 위해 <a href="https://milvus.io/docs/multi_tenancy.md#Partition-key-based-multi-tenancy">partition_key를</a> 사용할 것을 권장하며, 그 예는 다음과 같습니다.</p>
<blockquote>
<p>현재 Milvus Lite에서는 파티션 키 기능을 사용할 수 없으며, 이를 사용하려면 <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">도커 또는 쿠버네티스에서</a> Milvus 서버를 시작해야 합니다.</p>
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
<p>파티션 키를 사용하여 검색을 수행하려면 검색 요청의 부울 표현식에 다음 중 하나를 포함해야 합니다:</p>
<p><code translate="no">search_kwargs={&quot;expr&quot;: '&lt;partition_key&gt; == &quot;xxxx&quot;'}</code></p>
<p><code translate="no">search_kwargs={&quot;expr&quot;: '&lt;partition_key&gt; == in [&quot;xxx&quot;, &quot;xxx&quot;]'}</code></p>
<p><code translate="no">&lt;partition_key&gt;</code> 을 파티션 키로 지정된 필드의 이름으로 바꾸세요.</p>
<p>밀버스는 지정된 파티션 키를 기준으로 파티션으로 변경하고, 파티션 키에 따라 엔티티를 필터링하며, 필터링된 엔티티 중에서 검색을 수행합니다.</p>
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
<h2 id="API-reference" class="common-anchor-header">API 참조<button data-href="#API-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 __ModuleName__VectorStore 기능 및 구성에 대한 자세한 설명은 API 참조(https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html)를 참조하세요.</p>
