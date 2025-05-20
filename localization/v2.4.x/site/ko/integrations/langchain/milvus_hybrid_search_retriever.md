---
id: milvus_hybrid_search_retriever.md
summary: 이 노트북은 Milvus 벡터 데이터베이스와 관련된 기능을 사용하는 방법을 보여줍니다.
title: 밀버스 하이브리드 검색 리트리버
---
<h1 id="Milvus-Hybrid-Search-Retriever" class="common-anchor-header">밀버스 하이브리드 서치 리트리버<button data-href="#Milvus-Hybrid-Search-Retriever" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><blockquote>
<p><a href="https://milvus.io/docs">Milvus는</a> 임베딩 유사도 검색 및 AI 애플리케이션을 강화하기 위해 구축된 오픈 소스 벡터 데이터베이스입니다. Milvus는 비정형 데이터 검색의 접근성을 높이고 배포 환경에 관계없이 일관된 사용자 경험을 제공합니다.</p>
</blockquote>
<p>밀도 검색과 희소 벡터 검색의 강점을 결합한 Milvus 하이브리드 검색 <a href="/docs/concepts/v2.4.x/#retrievers">리트리버를</a> 시작하는 데 도움이 될 것입니다. 모든 <code translate="no">MilvusCollectionHybridSearchRetriever</code> 기능 및 구성에 대한 자세한 설명서는 <a href="https://api.python.langchain.com/en/latest/retrievers/langchain_milvus.retrievers.milvus_hybrid_search.MilvusCollectionHybridSearchRetriever.html">API 참조를 참조하세요</a>.</p>
<p>Milvus 멀티-벡터 검색 <a href="https://milvus.io/docs/multi-vector-search.md">문서도</a> 참조하세요.</p>
<h3 id="Integration-details" class="common-anchor-header">통합 세부 정보</h3><table>
<thead>
<tr><th style="text-align:left">리트리버</th><th style="text-align:left">자체 호스트</th><th style="text-align:center">클라우드 제공</th><th style="text-align:center">패키지</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left"><a href="https://api.python.langchain.com/en/latest/retrievers/langchain_milvus.retrievers.milvus_hybrid_search.MilvusCollectionHybridSearchRetriever.html">밀버스컬렉션하이브리드검색리트리버</a></td><td style="text-align:left">✅</td><td style="text-align:center">❌</td><td style="text-align:center">langchain_milvus</td></tr>
</tbody>
</table>
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
    </button></h2><p>개별 쿼리에서 자동화된 추적을 원한다면, 아래에 댓글을 달지 않고 <a href="https://docs.smith.langchain.com/">LangSmith</a> API 키를 설정할 수도 있습니다:</p>
<pre><code translate="no" class="language-python"># os.environ[<span class="hljs-string">&quot;LANGSMITH_API_KEY&quot;</span>] = getpass.getpass(<span class="hljs-string">&quot;Enter your LangSmith API key: &quot;</span>)
# os.environ[<span class="hljs-string">&quot;LANGSMITH_TRACING&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Installation" class="common-anchor-header">설치</h3><p>이 리트리버는 <code translate="no">langchain-milvus</code> 패키지에 있습니다. 이 가이드를 사용하려면 다음 종속성이 필요합니다:</p>
<pre><code translate="no" class="language-python">%pip install --upgrade --quiet pymilvus[model] langchain-milvus langchain-openai
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.<span class="hljs-property">output_parsers</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">StrOutputParser</span>
<span class="hljs-keyword">from</span> langchain_core.<span class="hljs-property">prompts</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">PromptTemplate</span>
<span class="hljs-keyword">from</span> langchain_core.<span class="hljs-property">runnables</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">RunnablePassthrough</span>
<span class="hljs-keyword">from</span> langchain_milvus.<span class="hljs-property">retrievers</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusCollectionHybridSearchRetriever</span>
<span class="hljs-keyword">from</span> langchain_milvus.<span class="hljs-property">utils</span>.<span class="hljs-property">sparse</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BM25SparseEmbedding</span>
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">ChatOpenAI</span>, <span class="hljs-title class_">OpenAIEmbeddings</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    <span class="hljs-title class_">Collection</span>,
    <span class="hljs-title class_">CollectionSchema</span>,
    <span class="hljs-title class_">DataType</span>,
    <span class="hljs-title class_">FieldSchema</span>,
    <span class="hljs-title class_">WeightedRanker</span>,
    connections,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-the-Milvus-service" class="common-anchor-header">Milvus 서비스 시작</h3><p>밀버스 서비스를 시작하려면 밀버스 <a href="https://milvus.io/docs/install_standalone-docker.md">문서를</a> 참조하세요.</p>
<p>밀버스를 시작한 후에는 밀버스 연결 URI를 지정해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-variable constant_">CONNECTION_URI</span> = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-OpenAI-API-Key" class="common-anchor-header">OpenAI API 키 준비</h3><p><a href="https://platform.openai.com/account/api-keys">OpenAI 설명서를</a> 참고하여 OpenAI API 키를 발급받은 후 환경 변수로 설정합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=&lt;your_api_key&gt;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-dense-and-sparse-embedding-functions" class="common-anchor-header">조밀하고 희박한 임베딩 함수 준비하기</h3><p>소설에 대한 10개의 가짜 설명을 가상으로 만들어 봅시다. 실제 제작에서는 대량의 텍스트 데이터가 될 수 있습니다.</p>
<pre><code translate="no" class="language-python">texts = [
    <span class="hljs-string">&quot;In &#x27;The Whispering Walls&#x27; by Ava Moreno, a young journalist named Sophia uncovers a decades-old conspiracy hidden within the crumbling walls of an ancient mansion, where the whispers of the past threaten to destroy her own sanity.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Last Refuge&#x27; by Ethan Blackwood, a group of survivors must band together to escape a post-apocalyptic wasteland, where the last remnants of humanity cling to life in a desperate bid for survival.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Memory Thief&#x27; by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The City of Echoes&#x27; by Julian Saint Clair, a brilliant detective must navigate a labyrinthine metropolis where time is currency, and the rich can live forever, but at a terrible cost to the poor.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Starlight Serenade&#x27; by Ruby Flynn, a shy astronomer discovers a mysterious melody emanating from a distant star, which leads her on a journey to uncover the secrets of the universe and her own heart.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Shadow Weaver&#x27; by Piper Redding, a young orphan discovers she has the ability to weave powerful illusions, but soon finds herself at the center of a deadly game of cat and mouse between rival factions vying for control of the mystical arts.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Lost Expedition&#x27; by Caspian Grey, a team of explorers ventures into the heart of the Amazon rainforest in search of a lost city, but soon finds themselves hunted by a ruthless treasure hunter and the treacherous jungle itself.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Clockwork Kingdom&#x27; by Augusta Wynter, a brilliant inventor discovers a hidden world of clockwork machines and ancient magic, where a rebellion is brewing against the tyrannical ruler of the land.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Phantom Pilgrim&#x27; by Rowan Welles, a charismatic smuggler is hired by a mysterious organization to transport a valuable artifact across a war-torn continent, but soon finds themselves pursued by deadly assassins and rival factions.&quot;</span>,
    <span class="hljs-string">&quot;In &#x27;The Dreamwalker&#x27;s Journey&#x27; by Lyra Snow, a young dreamwalker discovers she has the ability to enter people&#x27;s dreams, but soon finds herself trapped in a surreal world of nightmares and illusions, where the boundaries between reality and fantasy blur.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>고밀도 벡터를 생성하기 위해 <a href="https://platform.openai.com/docs/guides/embeddings">OpenAI 임베딩을</a> 사용하고, 스파스 벡터를 생성하기 위해 <a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25 알고리즘을</a> 사용합니다.</p>
<p>고밀도 임베딩 함수 초기화 및 차원 가져오기</p>
<pre><code translate="no" class="language-python">dense_embedding_func = OpenAIEmbeddings()
dense_dim = <span class="hljs-built_in">len</span>(dense_embedding_func.embed_query(texts[<span class="hljs-number">1</span>]))
dense_dim
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
</code></pre>
<p>스파스 임베딩 함수를 초기화합니다.</p>
<p>스파스 임베딩의 출력은 입력 텍스트의 키워드의 인덱스와 가중치를 나타내는 스파스 벡터 집합입니다.</p>
<pre><code translate="no" class="language-python">sparse_embedding_func = BM25SparseEmbedding(corpus=texts)
sparse_embedding_func.embed_query(texts[1])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{0: 0.4270424944042204,
 21: 1.845826690498331,
 22: 1.845826690498331,
 23: 1.845826690498331,
 24: 1.845826690498331,
 25: 1.845826690498331,
 26: 1.845826690498331,
 27: 1.2237754316221157,
 28: 1.845826690498331,
 29: 1.845826690498331,
 30: 1.845826690498331,
 31: 1.845826690498331,
 32: 1.845826690498331,
 33: 1.845826690498331,
 34: 1.845826690498331,
 35: 1.845826690498331,
 36: 1.845826690498331,
 37: 1.845826690498331,
 38: 1.845826690498331,
 39: 1.845826690498331}
</code></pre>
<h3 id="Create-Milvus-Collection-and-load-data" class="common-anchor-header">밀버스 컬렉션 생성 및 데이터 로드</h3><p>연결 URI 초기화 및 연결 설정</p>
<pre><code translate="no" class="language-python">connections.connect(uri=CONNECTION_URI)
<button class="copy-code-btn"></button></code></pre>
<p>필드 이름 및 해당 데이터 유형 정의</p>
<pre><code translate="no" class="language-python">pk_field = <span class="hljs-string">&quot;doc_id&quot;</span>
dense_field = <span class="hljs-string">&quot;dense_vector&quot;</span>
sparse_field = <span class="hljs-string">&quot;sparse_vector&quot;</span>
text_field = <span class="hljs-string">&quot;text&quot;</span>
fields = [
    FieldSchema(
        name=pk_field,
        dtype=DataType.VARCHAR,
        is_primary=<span class="hljs-literal">True</span>,
        auto_id=<span class="hljs-literal">True</span>,
        max_length=<span class="hljs-number">100</span>,
    ),
    FieldSchema(name=dense_field, dtype=DataType.FLOAT_VECTOR, dim=dense_dim),
    FieldSchema(name=sparse_field, dtype=DataType.SPARSE_FLOAT_VECTOR),
    FieldSchema(name=text_field, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">65_535</span>),
]
<button class="copy-code-btn"></button></code></pre>
<p>정의된 스키마로 컬렉션 생성</p>
<pre><code translate="no" class="language-python">schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
collection = Collection(
    name=<span class="hljs-string">&quot;IntroductionToTheNovels&quot;</span>, schema=schema, consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>밀도 및 희소 벡터에 대한 인덱스 정의</p>
<pre><code translate="no" class="language-python">dense_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;FLAT&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
collection.<span class="hljs-title function_">create_index</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>, dense_index)
sparse_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
collection.<span class="hljs-title function_">create_index</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_index)
collection.<span class="hljs-title function_">flush</span>()
<button class="copy-code-btn"></button></code></pre>
<p>컬렉션에 엔티티를 삽입하고 컬렉션 로드하기</p>
<pre><code translate="no" class="language-python">entities = []
<span class="hljs-keyword">for</span> text in texts:
    entity = {
        dense_field: dense_embedding_func.embed_documents([text])[<span class="hljs-number">0</span>],
        sparse_field: sparse_embedding_func.embed_documents([text])[<span class="hljs-number">0</span>],
        text_field: text,
    }
    entities.<span class="hljs-built_in">append</span>(entity)
collection.insert(entities)
collection.load()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Instantiation" class="common-anchor-header">인스턴스화<button data-href="#Instantiation" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 리트리버를 인스턴스화하여 희소 및 고밀도 필드에 대한 검색 매개변수를 정의할 수 있습니다:</p>
<pre><code translate="no" class="language-python">sparse_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
retriever = <span class="hljs-title class_">MilvusCollectionHybridSearchRetriever</span>(
    collection=collection,
    rerank=<span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>),
    anns_fields=[dense_field, sparse_field],
    field_embeddings=[dense_embedding_func, sparse_embedding_func],
    field_search_params=[dense_search_params, sparse_search_params],
    top_k=<span class="hljs-number">3</span>,
    text_field=text_field,
)
<button class="copy-code-btn"></button></code></pre>
<p>이 리트리버의 입력 매개변수에서는 밀도 임베딩과 희소 임베딩을 사용하여 이 컬렉션의 두 필드에 대해 하이브리드 검색을 수행하고 가중치 순위 재지정을 위해 WeightedRanker를 사용합니다. 마지막으로 상위 K 문서 3개가 반환됩니다.</p>
<h2 id="Usage" class="common-anchor-header">사용법<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">retriever.<span class="hljs-title function_">invoke</span>(<span class="hljs-string">&quot;What are the story about ventures?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(page_content=&quot;In 'The Lost Expedition' by Caspian Grey, a team of explorers ventures into the heart of the Amazon rainforest in search of a lost city, but soon finds themselves hunted by a ruthless treasure hunter and the treacherous jungle itself.&quot;, metadata={'doc_id': '449281835035545843'}),
 Document(page_content=&quot;In 'The Phantom Pilgrim' by Rowan Welles, a charismatic smuggler is hired by a mysterious organization to transport a valuable artifact across a war-torn continent, but soon finds themselves pursued by deadly assassins and rival factions.&quot;, metadata={'doc_id': '449281835035545845'}),
 Document(page_content=&quot;In 'The Dreamwalker's Journey' by Lyra Snow, a young dreamwalker discovers she has the ability to enter people's dreams, but soon finds herself trapped in a surreal world of nightmares and illusions, where the boundaries between reality and fantasy blur.&quot;, metadata={'doc_id': '449281835035545846'})]
</code></pre>
<h2 id="Use-within-a-chain" class="common-anchor-header">체인 내에서 사용<button data-href="#Use-within-a-chain" class="anchor-icon" translate="no">
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
    </button></h2><p>ChatOpenAI 초기화 및 프롬프트 템플릿 정의하기</p>
<pre><code translate="no" class="language-python">llm = ChatOpenAI()

PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.

&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

Assistant:&quot;&quot;&quot;</span>

prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>문서 서식 지정 함수 정의하기</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>리트리버 및 기타 구성 요소를 사용하여 체인 정의하기</p>
<pre><code translate="no" class="language-python">rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: <span class="hljs-title class_">RunnablePassthrough</span>()}
    | prompt
    | llm
    | <span class="hljs-title class_">StrOutputParser</span>()
)
<button class="copy-code-btn"></button></code></pre>
<p>정의된 체인을 사용하여 쿼리 수행하기</p>
<pre><code translate="no" class="language-python">rag_chain.<span class="hljs-title function_">invoke</span>(<span class="hljs-string">&quot;What novels has Lila written and what are their contents?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&quot;Lila Rose has written 'The Memory Thief,' which follows a charismatic thief with the ability to steal and manipulate memories as they navigate a daring heist and a web of deceit and betrayal.&quot;
</code></pre>
<p>컬렉션 삭제하기</p>
<pre><code translate="no" class="language-python">collection.drop()
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>모든 <code translate="no">MilvusCollectionHybridSearchRetriever</code> 기능 및 구성에 대한 자세한 설명은 <a href="https://api.python.langchain.com/en/latest/retrievers/langchain_milvus.retrievers.milvus_hybrid_search.MilvusCollectionHybridSearchRetriever.html">API 참조로</a> 이동하세요.</p>
