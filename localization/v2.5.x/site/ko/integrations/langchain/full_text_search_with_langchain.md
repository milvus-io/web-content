---
id: full_text_search_with_langchain.md
summary: 이 튜토리얼에서는 애플리케이션에서 전체 텍스트 검색을 구현하기 위해 LangChain과 Milvus를 사용하는 방법을 보여드립니다.
title: LangChain 및 Milvus에서 전체 텍스트 검색 사용하기
---
<h1 id="Using-Full-Text-Search-with-LangChain-and-Milvus" class="common-anchor-header">LangChain 및 Milvus에서 전체 텍스트 검색 사용하기<button data-href="#Using-Full-Text-Search-with-LangChain-and-Milvus" class="anchor-icon" translate="no">
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
<p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">전체 텍스트 검색은</a> 텍스트의 특정 키워드나 구문을 일치시켜 문서를 검색하는 전통적인 방법입니다. 이는 용어 빈도 등의 요소로 계산된 관련성 점수를 기반으로 결과의 순위를 매깁니다. 시맨틱 검색은 의미와 문맥을 이해하는 데 더 효과적이지만, 전체 텍스트 검색은 정확한 키워드 매칭에 탁월하므로 시맨틱 검색을 보완하는 데 유용합니다. BM25 알고리즘은 전체 텍스트 검색에서 순위를 매기는 데 널리 사용되며 검색 증강 세대(RAG)에서 핵심적인 역할을 합니다.</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5에는</a> BM25를 사용한 기본 전체 텍스트 검색 기능이 도입되었습니다. 이 접근 방식은 텍스트를 BM25 점수를 나타내는 스파스 벡터로 변환합니다. 원시 텍스트를 입력하기만 하면 Milvus가 자동으로 스파스 벡터를 생성하고 저장하므로 수동으로 스파스 임베딩을 생성할 필요가 없습니다.</p>
<p>LangChain과 Milvus의 통합으로 이 기능도 도입되어 전체 텍스트 검색을 RAG 애플리케이션에 통합하는 프로세스가 간소화되었습니다. 전체 텍스트 검색과 고밀도 벡터를 사용한 시맨틱 검색을 결합함으로써, 고밀도 임베딩의 시맨틱 컨텍스트와 단어 매칭의 정확한 키워드 관련성을 모두 활용하는 하이브리드 접근 방식을 달성할 수 있습니다. 이러한 통합은 검색 시스템의 정확성, 연관성 및 사용자 경험을 향상시킵니다.</p>
<p>이 튜토리얼에서는 애플리케이션에서 전체 텍스트 검색을 구현하기 위해 LangChain과 Milvus를 사용하는 방법을 보여드립니다.</p>
<div class="alert note">
<ul>
<li>전체 텍스트 검색은 현재 Milvus 독립형, Milvus 분산형 및 Zilliz Cloud에서 사용할 수 있지만, Milvus Lite(향후 이 기능이 구현될 예정)에서는 아직 지원되지 않습니다. 자세한 내용은 support@zilliz.com 으로 문의하세요.</li>
<li>이 튜토리얼을 진행하기 전에 <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">전체 텍스트 검색과</a> LangChain Milvus 통합의 <a href="https://milvus.io/docs/basic_usage_langchain.md">기본 사용법에</a> 대한 기본적인 이해가 있는지 확인하세요.</li>
</ul>
</div>
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
    </button></h2><p>이 노트북을 실행하기 전에 다음 종속성이 설치되어 있는지 확인하세요:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우, 방금 설치한 종속성을 활성화하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택).</p>
</div>
<p>OpenAI의 모델을 사용하겠습니다. <a href="https://platform.openai.com/docs/quickstart">OpenAI에서</a> 환경 변수 <code translate="no">OPENAI_API_KEY</code> 를 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 서버 <code translate="no">URI</code> (및 선택적으로 <code translate="no">TOKEN</code>)를 지정합니다. Milvus 서버를 설치하고 시작하는 방법은 이 <a href="https://milvus.io/docs/install_standalone-docker-compose.md">가이드를</a> 따르세요.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>몇 가지 예제 문서를 준비합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(page_content=<span class="hljs-string">&quot;I like this apple&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like swimming&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like dogs&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialization-with-BM25-Function" class="common-anchor-header">BM25 함수를 사용한 초기화<button data-href="#Initialization-with-BM25-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Hybrid-Search" class="common-anchor-header">하이브리드 검색</h3><p>전체 텍스트 검색을 위해 Milvus VectorStore는 <code translate="no">builtin_function</code> 파라미터를 허용합니다. 이 매개변수를 통해 <code translate="no">BM25BuiltInFunction</code> 의 인스턴스를 전달할 수 있습니다. 이는 일반적으로 밀도가 높은 임베딩을 <code translate="no">VectorStore</code> 으로 전달하는 시맨틱 검색과는 다릅니다,</p>
<p>다음은 시맨틱 검색을 위한 OpenAI 고밀도 임베딩과 전체 텍스트 검색을 위한 BM25를 사용한 Milvus의 간단한 하이브리드 검색 예시입니다:</p>
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
<p>위의 코드에서는 <code translate="no">BM25BuiltInFunction</code> 의 인스턴스를 정의하고 <code translate="no">Milvus</code> 객체에 전달합니다. <code translate="no">BM25BuiltInFunction</code> 는 Milvus의 경량 래퍼 클래스입니다. <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> 의 경량 래퍼 클래스입니다.</p>
<p><code translate="no">BM25BuiltInFunction</code> 의 매개변수에서 이 함수에 대한 입력 및 출력 필드를 지정할 수 있습니다:</p>
<ul>
<li><code translate="no">input_field_names</code> (str): 입력 필드의 이름, 기본값은 <code translate="no">text</code> 입니다. 이 함수가 입력으로 읽을 필드를 나타냅니다.</li>
<li><code translate="no">output_field_names</code> (str): 출력 필드의 이름, 기본값은 <code translate="no">sparse</code> 입니다. 이 함수가 계산된 결과를 출력할 필드를 나타냅니다.</li>
</ul>
<p>위에서 언급한 Milvus 초기화 매개변수에서는 <code translate="no">vector_field=[&quot;dense&quot;, &quot;sparse&quot;]</code> 도 지정합니다. <code translate="no">sparse</code> 필드는 <code translate="no">BM25BuiltInFunction</code> 에 정의된 출력 필드로 간주되므로 다른 <code translate="no">dense</code> 필드는 OpenAIEmbedding의 출력 필드에 자동으로 할당됩니다.</p>
<p>실제로, 특히 여러 임베딩이나 함수를 결합할 때는 모호성을 피하기 위해 각 함수에 대한 입력 및 출력 필드를 명시적으로 지정하는 것이 좋습니다.</p>
<p>다음 예시에서는 <code translate="no">BM25BuiltInFunction</code> 의 입력 및 출력 필드를 명시적으로 지정하여 내장 함수가 어떤 필드를 위한 것인지 명확히 했습니다.</p>
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
<p>이 예제에는 세 개의 벡터 필드가 있습니다. 이 중 <code translate="no">sparse</code> 은 <code translate="no">BM25BuiltInFunction</code> 의 출력 필드로 사용되며, 나머지 두 개의 <code translate="no">dense1</code> 과 <code translate="no">dense2</code> 은 두 개의 <code translate="no">OpenAIEmbeddings</code> 모델의 출력 필드로 자동 할당됩니다(순서에 따라).</p>
<p>이러한 방식으로 여러 개의 벡터 필드를 정의하고 다양한 임베딩 또는 함수 조합을 할당하여 하이브리드 검색을 구현할 수 있습니다.</p>
<p>하이브리드 검색을 수행할 때는 쿼리 텍스트를 전달하고 선택적으로 topK 및 재랭커 매개변수를 설정하기만 하면 됩니다. <code translate="no">vectorstore</code> 인스턴스는 벡터 임베딩과 내장 함수를 자동으로 처리하고 마지막으로 재랭커를 사용하여 결과를 구체화합니다. 검색 프로세스의 기본 구현 세부 사항은 사용자에게 숨겨져 있습니다.</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(
    <span class="hljs-string">&quot;Do I like apples?&quot;</span>, k=<span class="hljs-number">1</span>
)  <span class="hljs-comment"># , ranker_type=&quot;weighted&quot;, ranker_params={&quot;weights&quot;:[0.3, 0.3, 0.4]})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'fruit', 'pk': 454646931479251897}, page_content='I like this apple')]
</code></pre>
<p>하이브리드 검색에 대한 자세한 내용은 <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">하이브리드 검색 소개</a> 및 이 <a href="https://milvus.io/docs/milvus_hybrid_search_retriever.md">LangChain Milvus 하이브리드 검색 튜토리얼을</a> 참조하세요.</p>
<h3 id="BM25-search-without-embedding" class="common-anchor-header">임베딩 없이 BM25 검색</h3><p>임베딩 기반 시맨틱 검색을 사용하지 않고 BM25 함수로만 전체 텍스트 검색을 수행하려면 임베딩 파라미터를 <code translate="no">None</code> 로 설정하고 BM25 함수 인스턴스로 지정된 <code translate="no">builtin_function</code> 만 유지하면 됩니다. 벡터 필드에는 "스파스" 필드만 있습니다. 예를 들어</p>
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
<h2 id="Customize-analyzer" class="common-anchor-header">분석기 사용자 지정<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>분석기는 문장을 토큰으로 나누고 어간 및 중지 단어 제거와 같은 어휘 분석을 수행하여 전체 텍스트 검색에 필수적입니다. 분석기는 일반적으로 언어별로 다릅니다. <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">이 가이드를</a> 참조하여 Milvus의 분석기에 대해 자세히 알아보세요.</p>
<p>Milvus는 두 가지 유형의 분석기를 지원합니다: <strong>기본 제공 분석</strong> 기와 <strong>사용자 지정 분석기입니다</strong>. 기본적으로 <code translate="no">BM25BuiltInFunction</code> 에서는 구두점으로 텍스트를 토큰화하는 가장 기본적인 분석기인 <a href="https://milvus.io/docs/standard-analyzer.md">표준 내장 분석기를</a> 사용합니다.</p>
<p>다른 분석기를 사용하거나 분석기를 사용자 정의하려면 <code translate="no">BM25BuiltInFunction</code> 초기화에서 <code translate="no">analyzer_params</code> 매개 변수를 전달하면 됩니다.</p>
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
<p>Milvus 컬렉션의 스키마를 살펴보고 사용자 정의된 분석기가 올바르게 설정되었는지 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-python">vectorstore.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': True, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'pk', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'dense', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'category', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25_function_de368e79', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse'], 'params': {}}]}
</code></pre>
<p>더 자세한 개념 <a href="https://milvus.io/docs/analyzer-overview.md">설명은</a> <code translate="no">analyzer</code><a href="https://milvus.io/docs/analyzer-overview.md">,</a> <code translate="no">tokenizer</code><a href="https://milvus.io/docs/analyzer-overview.md">,</a> <code translate="no">filter</code><a href="https://milvus.io/docs/analyzer-overview.md">,</a> <code translate="no">enable_match</code><a href="https://milvus.io/docs/analyzer-overview.md">,</a> <code translate="no">analyzer_params</code><a href="https://milvus.io/docs/analyzer-overview.md">, 분석기 설명서를</a> 참조하세요.</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">RAG에서 하이브리드 검색 및 재랭크 사용하기<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>지금까지 랭체인과 밀버스에서 기본 BM25 빌트인 기능을 사용하는 방법을 알아보았습니다. 이번에는 하이브리드 검색과 재랭킹을 통해 최적화된 RAG 구현을 소개하겠습니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 다이어그램은 키워드 매칭을 위한 BM25와 시맨틱 검색을 위한 벡터 검색을 결합한 하이브리드 검색 및 재랭크 프로세스를 보여줍니다. 두 방법의 결과를 병합하고 순위를 재조정하여 LLM으로 전달하여 최종 답변을 생성합니다.</p>
<p>하이브리드 검색은 정확도와 의미론적 이해의 균형을 유지하여 다양한 쿼리에 대한 정확도와 견고성을 향상시킵니다. BM25 전체 텍스트 검색과 벡터 검색으로 후보를 검색하여 의미론적, 문맥 인식, 정확한 검색을 모두 보장합니다.</p>
<p>예제를 통해 시작해 보겠습니다.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">데이터 준비</h3><p>Langchain WebBaseLoader를 사용해 웹 소스에서 문서를 로드하고 RecursiveCharacterTextSplitter를 사용해 청크로 분할합니다.</p>
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
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">밀버스 벡터 저장소에 문서 로드</h3><p>위에서 소개한 것처럼 준비된 문서를 초기화하여 Milvus 벡터 스토어에 로드합니다. <code translate="no">dense</code> 은 OpenAI 임베딩용, <code translate="no">sparse</code> 은 BM25 함수용 벡터 필드 두 개가 포함되어 있습니다.</p>
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
<h3 id="Build-RAG-chain" class="common-anchor-header">RAG 체인 구축</h3><p>LLM 인스턴스와 프롬프트를 준비한 다음 LangChain 표현 언어를 사용하여 RAG 파이프라인으로 결합합니다.</p>
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
<p>LCEL(LangChain 표현식 언어)을 사용하여 RAG 체인을 빌드합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>특정 질문으로 RAG 체인을 호출하고 응답을 검색합니다.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively generate and execute these programming statements.'
</code></pre>
<p>축하합니다! Milvus와 LangChain으로 구동되는 하이브리드(밀도 벡터 + 스파스 bm25 함수) 검색 RAG 체인을 구축하셨습니다.</p>
