---
id: llamaindex_milvus_metadata_filter.md
title: 라마인덱스와 Milvus로 메타데이터 필터링하기
related_key: LlamaIndex
summary: >-
  이 노트북은 메타데이터 필터링 기능에 초점을 맞춰 LlamaIndex에서 Milvus 벡터 저장소의 사용법을 설명합니다. 메타데이터로 문서를
  색인하고, LlamaIndex의 내장 메타데이터 필터로 벡터 검색을 수행하고, Milvus의 기본 필터링 표현식을 벡터 스토어에 적용하는
  방법을 배우게 됩니다.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Metadata-Filtering-with-LlamaIndex-and-Milvus" class="common-anchor-header">라마인덱스와 Milvus로 메타데이터 필터링하기<button data-href="#Metadata-Filtering-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>이 노트북에서는 메타데이터 필터링 기능에 초점을 맞춰 LlamaIndex에서 Milvus 벡터 저장소를 사용하는 방법을 설명합니다. 메타데이터로 문서를 색인하고, LlamaIndex에 내장된 메타데이터 필터로 벡터 검색을 수행하고, Milvus의 기본 필터링 표현식을 벡터 스토어에 적용하는 방법을 배우게 됩니다.</p>
<p>이 노트북을 마치면 Milvus의 필터링 기능을 활용하여 문서 메타데이터를 기반으로 검색 결과의 범위를 좁히는 방법을 이해하게 될 것입니다.</p>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index</span>
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
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;./milvus_filter_demo.db&quot;</span>  <span class="hljs-comment"># Use Milvus-Lite for demo purpose</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>데이터 준비</strong></p>
<p>이 예제에서는 제목은 비슷하거나 동일하지만 메타데이터(저자, 장르, 출판 연도)가 다른 몇 권의 책을 샘플 데이터로 사용하겠습니다. 이를 통해 Milvus가 벡터 유사도와 메타데이터 속성을 모두 기반으로 문서를 필터링하고 검색하는 방법을 보여줄 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.schema <span class="hljs-keyword">import</span> TextNode

nodes = [
    TextNode(
        text=<span class="hljs-string">&quot;Life: A User&#x27;s Manual&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Georges Perec&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Postmodern Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1978</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life and Fate&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Vasily Grossman&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Historical Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1980</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Keith Richards&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Memoir&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2010</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;The Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Malcolm Knox&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Literary Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2011</span>,
        },
    ),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-Index" class="common-anchor-header">색인 구축<button data-href="#Build-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 기본 임베딩 모델(OpenAI의 <code translate="no">text-embedding-ada-002</code>)을 사용하여 Milvus에 샘플 데이터를 저장합니다. 제목은 텍스트 임베딩으로 변환되어 고밀도 임베딩 필드에 저장되고, 모든 메타데이터는 스칼라 필드에 저장됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    collection_name=<span class="hljs-string">&quot;test_filter_collection&quot;</span>,  <span class="hljs-comment"># Change collection name here</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension depends on the embedding model</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop collection if exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex(nodes, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-22 08:31:09,871 [DEBUG][_create_connection]: Created new connection using: 19675caa8f894772b3db175b65d0063a (async_milvus_client.py:547)
</code></pre>
<h2 id="Metadata-Filters" class="common-anchor-header">메타데이터 필터<button data-href="#Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 LlamaIndex의 기본 제공 메타데이터 필터와 조건을 Milvus 검색에 적용하겠습니다.</p>
<p><strong>메타데이터 필터 정의하기</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> (
    MetadataFilter,
    MetadataFilters,
    FilterOperator,
)

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2000</span>, operator=FilterOperator.GT
        )  <span class="hljs-comment"># year &gt; 2000</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>필터를 사용하여 벡터 스토어에서 검색</strong></p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<h3 id="Multiple-Metdata-Filters" class="common-anchor-header">여러 메타데이터 필터</h3><p>여러 메타데이터 필터를 결합하여 더 복잡한 쿼리를 만들 수도 있습니다. LlamaIndex는 <code translate="no">AND</code> 및 <code translate="no">OR</code> 조건을 모두 지원하여 필터를 결합할 수 있습니다. 이를 통해 메타데이터 속성에 따라 문서를 보다 정확하고 유연하게 검색할 수 있습니다.</p>
<p><strong>조건 <code translate="no">AND</code></strong></p>
<p>1979년부터 2010년 사이에 출판된 책(특히 1979년 &lt;연도 ≤ 2010년)에 대한 필터링 예제를 사용해 보세요:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> FilterCondition

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">1979</span>, operator=FilterOperator.GT
        ),  <span class="hljs-comment"># year &gt; 1979</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2010</span>, operator=FilterOperator.LTE
        ),  <span class="hljs-comment"># year &lt;= 2010</span>
    ],
    condition=FilterCondition.AND,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<p><strong>조건 <code translate="no">OR</code></strong></p>
<p>조지 페렉이나 키스 리차드가 쓴 책을 필터링하는 다른 예제를 사용해 보세요:</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Georges Perec&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Georges Perec</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Keith Richards&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Keith Richards</span>
    ],
    condition=FilterCondition.OR,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
<h2 id="Use-Milvuss-Keyword-Arguments" class="common-anchor-header">Milvus의 키워드 인수 사용<button data-href="#Use-Milvuss-Keyword-Arguments" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 제공 필터링 기능 외에도 <code translate="no">string_expr</code> 키워드 인수를 통해 Milvus의 기본 필터링 표현식을 사용할 수 있습니다. 이를 통해 검색 작업 중에 특정 필터 표현식을 Milvus에 직접 전달하여 표준 메타데이터 필터링을 넘어 Milvus의 고급 필터링 기능에 액세스할 수 있습니다.</p>
<p>Milvus는 벡터 데이터를 정밀하게 쿼리할 수 있는 강력하고 유연한 필터링 옵션을 제공합니다:</p>
<ul>
<li>기본 연산자: 비교 연산자, 범위 필터, 산술 연산자 및 논리 연산자</li>
<li>필터 표현식 템플릿: 일반적인 필터링 시나리오를 위한 사전 정의된 패턴</li>
<li>특수 연산자: JSON 또는 배열 필드를 위한 데이터 유형별 연산자</li>
</ul>
<p>Milvus 필터링 표현식에 대한 종합적인 문서와 예제는 <a href="https://milvus.io/docs/boolean.md">Milvus 필터링</a> 공식 문서를 참조하세요.</p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(
    vector_store_kwargs={
        <span class="hljs-string">&quot;string_expr&quot;</span>: <span class="hljs-string">&quot;genre like &#x27;%Fiction&#x27;&quot;</span>,
    },
    similarity_top_k=<span class="hljs-number">5</span>,
)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
