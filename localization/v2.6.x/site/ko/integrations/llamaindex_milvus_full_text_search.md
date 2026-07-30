---
id: llamaindex_milvus_full_text_search.md
title: LlamaIndex 및 Milvus를 활용한 전체 텍스트 검색
related_key: LlamaIndex
summary: >-
  이 튜토리얼에서는 LlamaIndex와 Milvus를 활용하여 전체 텍스트 검색 및 하이브리드 검색을 기반으로 한 RAG 시스템을 구축하는
  방법을 배워보겠습니다. 먼저 전체 텍스트 검색만 구현한 다음, 더 포괄적인 결과를 얻기 위해 의미 기반 검색을 통합하여 기능을 확장해
  보겠습니다.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">LlamaIndex 및 Milvus를 활용한 전체 텍스트 검색<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>전체 텍스트 검색은</strong> 정확한 키워드 일치 방식을 사용하며, 대개 BM25와 같은 알고리즘을 활용하여 관련성에 따라 문서의 순위를 매깁니다. <strong>검색 강화 생성(RAG)</strong> 시스템에서 이 방법은 AI가 생성한 응답의 품질을 높이기 위해 관련 텍스트를 검색합니다.</p>
<p>반면, <strong>의미 기반 검색은</strong> 문맥적 의미를 해석하여 더 폭넓은 결과를 제공합니다. 두 접근 방식을 결합하면 <strong>하이브리드 검색이</strong> 구현되며, 특히 단일 방법만으로는 한계가 있는 경우 정보 검색 능력을 향상시킵니다.</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5의</a> Sparse-BM25 접근 방식을 사용하면 원본 텍스트가 자동으로 스파스 벡터로 변환됩니다. 이를 통해 수동으로 스파스 임베딩을 생성할 필요가 없어지며, 의미적 이해와 키워드 관련성을 균형 있게 조화시키는 하이브리드 검색 전략이 가능해집니다.</p>
<p>이 튜토리얼에서는 LlamaIndex와 Milvus를 사용하여 전체 텍스트 검색 및 하이브리드 검색을 기반으로 한 RAG 시스템을 구축하는 방법을 배웁니다. 먼저 전체 텍스트 검색만 구현한 다음, 더 포괄적인 결과를 얻기 위해 시맨틱 검색을 통합하여 기능을 강화할 것입니다.</p>
<blockquote>
<p>이 튜토리얼을 진행하기 전에, <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">전체 텍스트 검색</a> 과 <a href="https://milvus.io/docs/integrate_with_llamaindex.md">LlamaIndex에서 Milvus를 사용하는 기본</a> 사항 <a href="https://milvus.io/docs/integrate_with_llamaindex.md">에 대해</a> 잘 알고 계셔야 합니다.</p>
</blockquote>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>의존성 설치</strong></p>
<p>시작하기 전에 다음 종속성이 설치되어 있는지 확인하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Google Colab을 사용하는 경우 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(인터페이스 상단의 “Runtime” 메뉴로 이동하여 드롭다운 메뉴에서 “Restart session”을 선택하세요).</p>
</blockquote>
</div>
<p><strong>계정 설정</strong></p>
<p>이 튜토리얼에서는 텍스트 임베딩 및 답변 생성을 위해 OpenAI를 사용합니다. <a href="https://platform.openai.com/api-keys">OpenAI API 키를</a> 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 벡터 스토어를 사용하려면 Milvus 서버 <code translate="no">URI</code> 를 지정하고(선택 사항으로 <code translate="no">TOKEN</code> 도 함께 지정할 수 있습니다), Milvus 서버를 시작하려면 <a href="https://milvus.io/docs/install-overview.md">Milvus 설치 가이드를</a> 따라 Milvus 서버를 설정하거나 <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud를</a> 무료로 사용해 볼 수 있습니다.</p>
<blockquote>
<p>현재 Milvus Standalone, Milvus Distributed 및 Zilliz Cloud에서는 전체 텍스트 검색이 지원되지만, Milvus Lite에서는 아직 지원되지 않습니다(향후 구현 예정). 자세한 내용은 support@zilliz.com으로 문의해 주십시오.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>예제 데이터 다운로드</strong></p>
<p>다음 명령어를 실행하여 “data/paul_graham” 디렉터리에 샘플 문서를 다운로드하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">전체 텍스트 검색을 지원하는 RAG<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>RAG 시스템에 전체 텍스트 검색을 통합하면 의미 기반 검색과 정확하고 예측 가능한 키워드 기반 검색 간의 균형을 맞출 수 있습니다. 더 나은 검색 결과를 얻기 위해서는 전체 텍스트 검색과 의미 기반 검색을 결합하는 것이 권장되지만, 전체 텍스트 검색만 사용하도록 선택할 수도 있습니다. 여기서는 시연을 위해 전체 텍스트 검색 단독 모드와 하이브리드 검색을 보여드리겠습니다.</p>
<p>시작하려면 ` <code translate="no">SimpleDirectoryReaderLoad</code> `를 사용하여 폴 그레이엄(Paul Graham)의 에세이 “What I Worked On”을 불러오세요:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">BM25을 활용한 전체 텍스트 검색<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p>LlamaIndex의 <code translate="no">MilvusVectorStore</code> 는 전체 텍스트 검색을 지원하여 효율적인 키워드 기반 검색을 가능하게 합니다. ` <code translate="no">sparse_embedding_function</code>`와 같은 내장 함수를 사용하여 BM25 점수 산정 방식을 적용해 검색 결과의 순위를 매깁니다.</p>
<p>이 섹션에서는 BM25를 활용한 전체 텍스트 검색을 위한 RAG 시스템을 구현하는 방법을 시연해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>위의 코드는 Milvus에 예제 문서를 삽입하고, 전체 텍스트 검색을 위한 BM25 순위를 매길 수 있도록 인덱스를 구축합니다. 이 코드는 밀집 임베딩을 비활성화하고 기본 매개변수를 사용하여 <code translate="no">BM25BuiltInFunction</code> 를 활용합니다.</p>
<p><code translate="no">BM25BuiltInFunction</code> 매개변수에서 입력 및 출력 필드를 지정할 수 있습니다:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: 입력 텍스트 필드(기본값: “text”). BM25 알고리즘이 적용될 텍스트 필드를 나타냅니다. 텍스트 필드 이름이 다른 사용자 정의 컬렉션을 사용하는 경우 이 값을 변경하십시오.</li>
<li><code translate="no">output_field_names (str)</code>: 이 BM25 함수의 출력 결과가 저장되는 필드(기본값: “sparse_embedding”).</li>
</ul>
<p>벡터 저장소가 설정되면 Milvus에서 “sparse” 또는 “text_search” 쿼리 모드를 사용하여 전체 텍스트 검색 쿼리를 수행할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">텍스트 분석기 사용자 정의</h4><p>분석기는 문장을 토큰으로 분할하고 어근 추출 및 스톱워드 제거와 같은 어휘 처리를 수행함으로써 전체 텍스트 검색에서 중요한 역할을 합니다. 분석기는 일반적으로 언어별로 다릅니다. 자세한 내용은 <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus 분석기 가이드를</a> 참조하십시오.</p>
<p>Milvus는 <strong>내장 분석기와</strong> <strong>사용자 정의 분석기</strong>, 두 가지 유형의 분석기를 지원합니다. 기본적으로 <code translate="no">BM25BuiltInFunction</code> 는 구두점을 기준으로 텍스트를 토큰화하는 표준 내장 분석기를 사용합니다.</p>
<p>다른 분석기를 사용하거나 기존 분석기를 사용자 정의하려면 ` <code translate="no">analyzer_params</code> ` 인자에 값을 전달하면 됩니다:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">재순위 지정 기능을 활용한 하이브리드 검색<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>하이브리드 검색 시스템은 시맨틱 검색과 전체 텍스트 검색을 결합하여 RAG 시스템의 검색 성능을 최적화합니다.</p>
<p>다음 예제에서는 시맨틱 검색에 OpenAI 임베딩을, 전체 텍스트 검색에 BM25를 사용합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>작동 원리</strong></p>
<p>이 접근 방식은 두 벡터 필드를 모두 사용하여 Milvus 컬렉션에 문서를 저장합니다:</p>
<ul>
<li><code translate="no">embedding</code>: 시맨틱 검색을 위해 OpenAI 임베딩 모델로 생성된 고밀도 임베딩.</li>
<li><code translate="no">sparse_embedding</code>: 전체 텍스트 검색을 위해 BM25BuiltInFunction을 사용하여 계산된 스파스 임베딩.</li>
</ul>
<p>또한, 기본 매개변수를 사용한 “RRFRanker”를 통해 재순위 지정 전략을 적용했습니다. 재순위 지정기를 사용자 정의하려면 <a href="https://milvus.io/docs/weighted-ranker.md">Milvus 재순위 지정 가이드에</a> 따라 <code translate="no">hybrid_ranker</code> 및 <code translate="no">hybrid_ranker_params</code> 를 구성할 수 있습니다.</p>
<p>이제 샘플 쿼리를 사용하여 RAG 시스템을 테스트해 보겠습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>이러한 하이브리드 접근 방식은 의미 기반 검색과 키워드 기반 검색을 모두 활용함으로써 RAG 시스템에서 더 정확하고 문맥을 고려한 응답을 보장합니다.</p>
