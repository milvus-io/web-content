---
id: integrate_with_llamaindex.md
summary: 이 가이드에서는 LlamaIndex와 Milvus를 사용하여 검색 증강 세대(RAG) 시스템을 구축하는 방법을 설명합니다.
title: Milvus 및 LlamaIndex를 사용한 검색 증강 생성(RAG)
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">Milvus 및 LlamaIndex를 사용한 검색 증강 생성(RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
<p>이 가이드에서는 LlamaIndex와 Milvus를 사용하여 검색 증강 생성(RAG) 시스템을 구축하는 방법을 설명합니다.</p>
<p>RAG 시스템은 검색 시스템과 생성 모델을 결합하여 주어진 프롬프트에 따라 새 텍스트를 생성하는 시스템입니다. 이 시스템은 먼저 Milvus를 사용하여 말뭉치에서 관련 문서를 검색한 다음 생성 모델을 사용하여 검색된 문서를 기반으로 새 텍스트를 생성합니다.</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex는</a> 사용자 정의 데이터 소스를 대규모 언어 모델(LLM)에 연결하기 위한 간단하고 유연한 데이터 프레임워크입니다. <a href="https://milvus.io/">Milvus는</a> 세계에서 가장 진보된 오픈 소스 벡터 데이터베이스로, 임베딩 유사도 검색 및 AI 애플리케이션을 강화하기 위해 구축되었습니다.</p>
<p>이 노트북에서는 MilvusVectorStore를 사용하는 간단한 데모를 보여드리겠습니다.</p>
<h2 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">종속성 설치</h3><p>이 페이지의 코드 스니펫에는 pymilvus 및 llamaindex 종속성이 필요합니다. 다음 명령을 사용하여 설치할 수 있습니다:</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 활성화하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다. (화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택합니다.)</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">OpenAI 설정</h3><p>먼저 OpenAI API 키를 추가하는 것으로 시작하겠습니다. 이렇게 하면 chatgpt에 액세스할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">데이터 준비하기</h3><p>다음 명령을 사용하여 샘플 데이터를 다운로드할 수 있습니다:</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">시작하기<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">데이터 생성하기</h3><p>첫 번째 예로 <code translate="no">paul_graham_essay.txt</code> 파일에서 문서를 생성해 보겠습니다. 폴 그레이엄이 작성한 <code translate="no">What I Worked On</code> 이라는 제목의 에세이 한 편입니다. 문서를 생성하기 위해 SimpleDirectoryReader를 사용하겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">데이터 전체에 인덱스 만들기</h3><p>이제 문서가 생겼으니 색인을 만들고 문서를 삽입할 수 있습니다. 인덱스에는 MilvusVectorStore를 사용하겠습니다. MilvusVectorStore는 몇 가지 인수를 받습니다:</p>
<h4 id="basic-args" class="common-anchor-header">기본 인수</h4><ul>
<li><code translate="no">uri (str, optional)</code>: 연결할 URI로, Milvus 또는 Zilliz Cloud 서비스의 경우 "https://address:port", 라이트 로컬 Milvus의 경우 "path/to/local/milvus.db"의 형태입니다. 기본값은 "./milvus_llamaindex.db"입니다.</li>
<li><code translate="no">token (str, optional)</code>: 로그인을 위한 토큰. rbac을 사용하지 않는 경우 비어 있으며, rbac을 사용하는 경우 "사용자 이름:비밀번호"일 가능성이 높습니다.</li>
<li><code translate="no">collection_name (str, optional)</code>: 데이터가 저장될 컬렉션의 이름입니다. 기본값은 "llamalection"입니다.</li>
<li><code translate="no">overwrite (bool, optional)</code>: 같은 이름의 기존 컬렉션을 덮어쓸지 여부. 기본값은 False입니다.</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">문서 ID 및 텍스트를 포함한 스칼라 필드</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>: 컬렉션의 doc_id 필드 이름입니다. 기본값은 DEFAULT_DOC_ID_KEY입니다.</li>
<li><code translate="no">text_key (str, optional)</code>: 전달된 컬렉션에서 어떤 키 텍스트에 저장되는지. 자체 컬렉션을 가져올 때 사용됩니다. 기본값은 DEFAULT_TEXT_KEY.</li>
<li><code translate="no">scalar_field_names (list, optional)</code>: 컬렉션 스키마에 포함할 추가 스칼라 필드의 이름입니다.</li>
<li><code translate="no">scalar_field_types (list, optional)</code>: 추가 스칼라 필드의 유형입니다.</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">밀도 필드</h4><ul>
<li><code translate="no">enable_dense (bool)</code>: 고밀도 임베딩을 활성화 또는 비활성화하는 부울 플래그입니다. 기본값은 True입니다.</li>
<li><code translate="no">dim (int, optional)</code>: 컬렉션에 대한 임베딩 벡터의 차원입니다. enable_sparse가 False인 새 컬렉션을 만들 때 필요합니다.</li>
<li><code translate="no">embedding_field (str, optional)</code>: 컬렉션에 대한 고밀도 임베딩 필드의 이름, 기본값은 DEFAULT_EMBEDDING_KEY입니다.</li>
<li><code translate="no">index_config (dict, optional)</code>: 고밀도 임베딩 인덱스를 구축하는 데 사용되는 구성입니다. 기본값은 없음입니다.</li>
<li><code translate="no">search_config (dict, optional)</code>: 밀버스 고밀도 인덱스 검색에 사용되는 구성입니다. <code translate="no">index_config</code> 에서 지정한 인덱스 유형과 호환되어야 합니다. 기본값은 없음입니다.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: 밀도 임베딩에 사용할 유사성 메트릭으로, 현재 IP, COSINE 및 L2를 지원합니다.</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">스파스 필드</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>: 스파스 임베딩을 활성화 또는 비활성화하는 부울 플래그입니다. 기본값은 False입니다.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: 스파스 임베딩 필드의 이름, 기본값은 DEFAULT_SPARSE_EMBEDDING_KEY입니다.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: enable_sparse가 True인 경우 텍스트를 스파스 임베딩으로 변환하려면 이 객체를 제공해야 합니다. None이면 기본 스파스 임베딩 함수(BGEM3SparseEmbeddingFunction)가 사용됩니다.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: 스파스 임베딩 인덱스를 구축하는 데 사용되는 구성입니다. 기본값은 None입니다.</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">하이브리드 랭커</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>: 하이브리드 검색 쿼리에 사용되는 랭킹러의 유형을 지정합니다. 현재 ["RRFRanker", "WeightedRanker"]만 지원합니다. 기본값은 "RRFRanker"입니다.</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>: 하이브리드 랭커의 구성 매개변수입니다. 이 사전의 구조는 사용 중인 특정 랭커에 따라 다릅니다:</p>
<ul>
<li>"RRFRanker"의 경우 다음을 포함해야 합니다:<ul>
<li>"k" (int): 상호 순위 융합(RRF)에 사용되는 매개변수입니다. 이 값은 검색 관련성을 높이기 위해 여러 순위 전략을 단일 점수로 결합하는 RRF 알고리즘의 일부로 순위 점수를 계산하는 데 사용됩니다.</li>
</ul></li>
<li>"가중랭커"의 경우, 예상되는 값은 다음과 같습니다:<ul>
<li>"가중치"(플로트 목록): 정확히 두 개의 가중치 목록입니다:<ol>
<li>밀집 임베딩 컴포넌트에 대한 가중치.</li>
<li>희소 임베딩 구성 요소에 대한 가중치. 이러한 가중치는 하이브리드 검색 프로세스에서 임베딩의 밀도 및 희소 구성 요소의 중요성을 조정하는 데 사용됩니다. 기본값은 빈 사전으로, 이는 랭커가 미리 정의된 기본 설정으로 작동한다는 것을 의미합니다.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">others</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>: TTL(Time-To-Live) 및 MMAP(메모리 매핑)과 같은 컬렉션 속성입니다. 기본값은 없음입니다. 포함될 수 있습니다:<ul>
<li>"collection.ttl.seconds"(int): 이 속성을 설정하면 현재 컬렉션의 데이터가 지정된 시간 내에 만료됩니다. 컬렉션의 만료된 데이터는 정리되며 검색이나 쿼리에 포함되지 않습니다.</li>
<li>"mmap.enabled"(bool): 컬렉션 수준에서 메모리 맵 저장소를 활성화할지 여부입니다.</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>: 사용할 인덱스 관리 전략을 지정합니다. 기본값은 "create_if_not_exists"입니다.</li>
<li><code translate="no">batch_size (int)</code>: 밀버스에 데이터를 삽입할 때 한 번에 처리할 문서 수를 설정합니다. 기본값은 DEFAULT_BATCH_SIZE입니다.</li>
<li><code translate="no">consistency_level (str, optional)</code>: 새로 생성된 컬렉션에 사용할 일관성 수준입니다. 기본값은 "세션"입니다.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusVectorStore</code> 의 매개변수입니다:</p>
<ul>
<li><code translate="no">uri</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>데이터 규모가 큰 경우, <a href="https://milvus.io/docs/quickstart.md">도커나 쿠버네티스에</a> 더 고성능의 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 <code translate="no">uri</code> 으로 사용하세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 을 조정하세요.</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">데이터 쿼리하기</h3><p>이제 문서가 인덱스에 저장되었으므로 인덱스에 대해 질문할 수 있습니다. 인덱스는 자체에 저장된 데이터를 chatgpt의 지식 베이스로 사용합니다.</p>
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
<p>다음 테스트는 덮어쓰기가 이전 데이터를 제거한다는 것을 보여줍니다.</p>
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
<p>다음 테스트는 이미 존재하는 인덱스에 추가 데이터를 추가하는 것을 보여줍니다.</p>
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
<h2 id="Metadata-filtering" class="common-anchor-header">메타데이터 필터링<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>특정 소스를 필터링하여 결과를 생성할 수 있습니다. 다음 예는 디렉터리에서 모든 문서를 로드한 다음 메타데이터를 기준으로 필터링하는 것을 보여줍니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">uber_2021.pdf</code> 파일에서 문서만 검색하려고 합니다.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>이번에는 <code translate="no">paul_graham_essay.txt</code> 파일에서 검색할 때 다른 결과를 얻습니다.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
