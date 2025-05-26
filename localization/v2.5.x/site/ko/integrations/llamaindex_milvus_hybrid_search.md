---
id: llamaindex_milvus_hybrid_search.md
title: 밀버스 및 라마인덱스와 함께 하이브리드 검색을 사용하는 RAG
related_key: LlamaIndex
summary: >-
  이 노트북에서는 [LlamaIndex](https://www.llamaindex.ai/) RAG 파이프라인에서 하이브리드 검색을 위해
  Milvus를 사용하는 방법을 보여드립니다. 권장되는 기본 하이브리드 검색(시맨틱 + BM25)으로 시작한 다음 다른 대체 스파스 임베딩
  방법과 하이브리드 리랭커의 사용자 정의에 대해 살펴보겠습니다.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">밀버스 및 라마인덱스와 함께 하이브리드 검색을 사용하는 RAG<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>하이브리드 검색은 시맨틱 검색과 키워드 매칭의 강점을 모두 활용하여 보다 정확하고 문맥에 맞는 결과를 제공합니다. 시맨틱 검색과 키워드 매칭의 장점을 결합한 하이브리드 검색은 복잡한 정보 검색 작업에 특히 효과적입니다.</p>
<p>이 노트북에서는 <a href="https://www.llamaindex.ai/">LlamaIndex</a> RAG 파이프라인에서 하이브리드 검색을 위해 Milvus를 사용하는 방법을 보여드립니다. 권장되는 기본 하이브리드 검색(시맨틱 + BM25)으로 시작한 다음, 다른 대체 스파스 임베딩 방법과 하이브리드 재랭커의 사용자 정의에 대해 살펴봅니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>설치 종속성</strong></p>
<p>시작하기 전에 다음 종속성이 설치되어 있는지 확인하세요:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(인터페이스 상단의 '런타임' 메뉴로 이동한 후 드롭다운 메뉴에서 '세션 다시 시작'을 선택합니다).</p>
</div>
<p><strong>계정 설정하기</strong></p>
<p>이 튜토리얼에서는 텍스트 임베딩 및 답변 생성을 위해 OpenAI를 사용합니다. <a href="https://platform.openai.com/api-keys">OpenAI API 키를</a> 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 벡터 스토어를 사용하려면 Milvus 서버 <code translate="no">URI</code> (또는 선택적으로 <code translate="no">TOKEN</code>)를 지정합니다. 밀버스 서버를 시작하려면 <a href="https://milvus.io/docs/install-overview.md">밀버스 설치 가이드에</a> 따라 밀버스 서버를 설정하거나 <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">질리즈 클라우드를</a> 무료로 체험해 보세요.</p>
<blockquote>
<p>전체 텍스트 검색은 현재 Milvus Standalone, Milvus Distributed 및 Zilliz Cloud에서 지원되지만 Milvus Lite(향후 구현 예정)에서는 아직 지원되지 않습니다. 자세한 내용은 support@zilliz.com 으로 문의하세요.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>예제 데이터 로드</strong></p>
<p>다음 명령을 실행하여 샘플 문서를 "data/paul_graham" 디렉터리에 다운로드합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <code translate="no">SimpleDirectoryReaderLoad</code> 을 사용하여 폴 그레이엄의 "내가 작업한 것"이라는 에세이를 로드합니다:</p>
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
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">BM25를 사용한 하이브리드 검색<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 BM25를 사용해 하이브리드 검색을 수행하는 방법을 보여줍니다. 시작하기 위해 <code translate="no">MilvusVectorStore</code> 을 초기화하고 예제 문서에 대한 색인을 생성합니다. 기본 구성은 다음을 사용합니다:</p>
<ul>
<li>기본 임베딩 모델의 고밀도 임베딩(OpenAI의 <code translate="no">text-embedding-ada-002</code>)</li>
<li>enable_sparse가 True인 경우 전체 텍스트 검색을 위한 BM25</li>
<li>하이브리드 검색이 활성화된 경우 결과 결합을 위한 k=60의 RRFRanker</li>
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
<p>다음은 밀도 및 스파스 필드 구성 인자에 대한 자세한 정보입니다( <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>조밀 필드</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: 고밀도 임베딩을 활성화 또는 비활성화하는 부울 플래그입니다. 기본값은 True입니다.</li>
<li><code translate="no">dim (int, optional)</code>: 컬렉션에 대한 임베딩 벡터의 차원입니다.</li>
<li><code translate="no">embedding_field (str, optional)</code>: 컬렉션에 대한 고밀도 임베딩 필드의 이름(기본값은 DEFAULT_EMBEDDING_KEY)입니다.</li>
<li><code translate="no">index_config (dict, optional)</code>: 고밀도 임베딩 인덱스를 구축하는 데 사용되는 구성입니다. 기본값은 없음입니다.</li>
<li><code translate="no">search_config (dict, optional)</code>: 밀버스 고밀도 인덱스 검색에 사용되는 구성입니다. <code translate="no">index_config</code> 에서 지정한 인덱스 유형과 호환되어야 합니다. 기본값은 없음입니다.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: 밀도 임베딩에 사용할 유사성 메트릭으로, 현재 IP, COSINE 및 L2를 지원합니다.</li>
</ul>
<p><strong>스파스 필드</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: 스파스 임베딩을 활성화 또는 비활성화하는 부울 플래그입니다. 기본값은 False입니다.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: 스파스 임베딩 필드의 이름, 기본값은 DEFAULT_SPARSE_EMBEDDING_KEY입니다.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: enable_sparse가 True인 경우, 텍스트를 스파스 임베딩으로 변환하려면 이 객체를 제공해야 합니다. None이면 기본 스파스 임베딩 함수(BM25BuiltInFunction)가 사용되거나, 내장 함수가 없는 기존 컬렉션의 경우 BGEM3SparseEmbedding을 사용합니다.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: 스파스 임베딩 인덱스를 구축하는 데 사용되는 구성입니다. 기본값은 없음입니다.</li>
</ul>
<p>쿼리 단계에서 하이브리드 검색을 사용하려면 <code translate="no">vector_store_query_mode</code> 을 "hybrid"로 설정합니다. 그러면 시맨틱 검색과 전체 텍스트 검색 모두에서 검색 결과가 결합되고 순위가 재조정됩니다. 샘플 쿼리로 테스트해 보겠습니다: "작성자는 Viaweb에서 무엇을 배웠나요?":</p>
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
<h3 id="Customize-text-analyzer" class="common-anchor-header">텍스트 분석기 사용자 지정</h3><p>분석기는 문장을 토큰으로 나누고 어간 및 중단어 제거와 같은 어휘 처리를 수행함으로써 전체 텍스트 검색에서 중요한 역할을 합니다. 일반적으로 언어에 따라 다릅니다. 자세한 내용은 <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus 분석기 가이드를</a> 참조하세요.</p>
<p>Milvus는 두 가지 유형의 분석기를 지원합니다: <strong>기본 제공 분석</strong> 기와 <strong>사용자 정의 분석기입니다</strong>. 기본적으로 <code translate="no">enable_sparse</code> 이 True로 설정된 경우 <code translate="no">MilvusVectorStore</code> 은 구두점을 기준으로 텍스트를 토큰화하는 표준 기본 제공 분석기를 사용하는 기본 구성의 <code translate="no">BM25BuiltInFunction</code> 을 사용합니다.</p>
<p>다른 분석기를 사용하거나 기존 분석기를 사용자 정의하려면 <code translate="no">BM25BuiltInFunction</code> 을 작성할 때 <code translate="no">analyzer_params</code> 인수에 값을 제공한 다음 <code translate="no">MilvusVectorStore</code> 에서 이 함수를 <code translate="no">sparse_embedding_function</code> 으로 설정하면 됩니다.</p>
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
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">다른 스파스 임베딩과 하이브리드 검색<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스는 시맨틱 검색과 BM25의 결합 외에도 <a href="https://arxiv.org/abs/2402.03216">BGE-M3와</a> 같은 스파스 임베딩 기능을 사용한 하이브리드 검색도 지원합니다. 다음 예는 내장된 <code translate="no">BGEM3SparseEmbeddingFunction</code> 을 사용하여 스파스 임베딩을 생성하는 예제입니다.</p>
<p>먼저 <code translate="no">FlagEmbedding</code> 패키지를 설치해야 합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 고밀도 임베딩을 위한 기본 OpenAI 모델과 희소 임베딩을 위한 기본 제공 BGE-M3를 사용하여 벡터 저장소와 인덱스를 구축해 보겠습니다:</p>
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
<p>이제 샘플 질문으로 하이브리드 검색 쿼리를 수행해 보겠습니다:</p>
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
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">스파스 임베딩 기능 사용자 지정</h3><p>다음 방법을 포함하여 <code translate="no">BaseSparseEmbeddingFunction</code> 에서 상속하는 한 스파스 임베딩 함수를 사용자 정의할 수도 있습니다:</p>
<ul>
<li><code translate="no">encode_queries</code>: 이 메서드는 텍스트를 쿼리에 대한 스파스 임베딩 목록으로 변환합니다.</li>
<li><code translate="no">encode_documents</code>: 이 메서드는 텍스트를 문서에 대한 스파스 임베딩 목록으로 변환합니다.</li>
</ul>
<p>각 메서드의 출력은 사전 목록인 스파스 임베딩의 형식을 따라야 합니다. 각 사전에는 차원을 나타내는 키(정수)와 해당 차원에서의 임베딩의 크기를 나타내는 해당 값(실수)이 있어야 합니다(예: {1: 0.5, 2: 0.3}).</p>
<p>예를 들어, 다음은 BGE-M3을 사용한 사용자 정의 스파스 임베딩 함수 구현입니다:</p>
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
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">하이브리드 리랭커 커스터마이징<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 두 가지 유형의 <a href="https://milvus.io/docs/reranking.md">리랭크 전략을</a> 지원합니다: 상호 순위 융합(RRF)과 가중치 점수. <code translate="no">MilvusVectorStore</code> 하이브리드 검색의 기본 랭커는 k=60의 RRF입니다. 하이브리드 랭커를 사용자 지정하려면 다음 매개변수를 수정하세요:</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: 하이브리드 검색 쿼리에 사용되는 랭킹러의 유형을 지정합니다. 현재 ["RRFRanker", "WeightedRanker"]만 지원합니다. 기본값은 "RRFRanker"입니다.</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: 하이브리드 랭커의 구성 매개변수입니다. 이 사전의 구조는 사용 중인 특정 랭커에 따라 다릅니다:<ul>
<li>"RRFRanker"의 경우 다음을 포함해야 합니다:<ul>
<li>"k" (int): 상호 순위 융합(RRF)에 사용되는 매개변수입니다. 이 값은 검색 관련성을 높이기 위해 여러 순위 전략을 단일 점수로 결합하는 RRF 알고리즘의 일부로 순위 점수를 계산하는 데 사용됩니다. 지정하지 않으면 기본값은 60입니다.</li>
</ul></li>
<li>"가중치랭커"의 경우, 예상되는 값은 다음과 같습니다:<ul>
<li>"가중치"(플로트 목록): 정확히 두 개의 가중치 목록입니다:<ol>
<li>밀집 임베딩 컴포넌트에 대한 가중치.</li>
<li>희소 임베딩 구성 요소에 대한 가중치. 이러한 가중치는 하이브리드 검색 프로세스에서 임베딩의 고밀도 및 희소 구성 요소의 중요도 균형을 맞추는 데 사용됩니다. 지정하지 않으면 기본 가중치는 [1.0, 1.0]입니다.</li>
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
