---
id: contextual_retrieval_with_milvus.md
summary: >-
  문맥 검색은 현재의 검색 증강 생성(RAG) 솔루션에서 발생하는 청크의 의미적 고립 문제를 해결하기 위해 Anthropic에서 제안한 고급
  검색 방법입니다. 현재의 실용적인 RAG 패러다임에서는 문서를 여러 청크로 나누고 벡터 데이터베이스를 사용해 쿼리를 검색하여 가장 관련성이
  높은 청크를 검색합니다. 그런 다음 LLM은 이렇게 검색된 청크를 사용하여 쿼리에 응답합니다. 그러나 이 청크 처리 과정에서는 문맥 정보가
  손실되어 검색기가 관련성을 판단하기 어려울 수 있습니다.
title: Milvus를 사용한 문맥 검색
---
<h1 id="Contextual-Retrieval-with-Milvus" class="common-anchor-header">Milvus를 사용한 문맥 검색<button data-href="#Contextual-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/contextual_retrieval_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/contextual_retrieval_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/refs/heads/master/images/contextual_retrieval_with_milvus.png" alt="image" class="doc-image" id="image" />
   </span> <span class="img-wrapper"> <span>이미지</span> </span><a href="https://www.anthropic.com/news/contextual-retrieval">문맥</a> 검색은 현재의 검색 증강 세대(RAG) 솔루션에서 발생하는 청크의 의미적 고립 문제를 해결하기 위해 Anthropic에서 제안한 고급 검색 방법입니다. 현재의 실용적인 RAG 패러다임에서는 문서를 여러 청크로 나누고 벡터 데이터베이스를 사용해 쿼리를 검색하여 가장 관련성이 높은 청크를 검색합니다. 그런 다음 LLM은 이렇게 검색된 청크를 사용하여 쿼리에 응답합니다. 그러나 이 청크 처리 과정에서는 문맥 정보가 손실되어 검색기가 관련성을 판단하기 어려울 수 있습니다.</p>
<p>문맥 검색은 임베딩 또는 색인화 전에 각 문서 청크에 관련 문맥을 추가하여 정확도를 높이고 검색 오류를 줄임으로써 기존 검색 시스템을 개선합니다. 하이브리드 검색 및 재순위 지정과 같은 기술과 결합하면 특히 대규모 지식 베이스의 검색 증강 생성(RAG) 시스템을 향상시킬 수 있습니다. 또한, 신속한 캐싱과 함께 사용하면 지연 시간과 운영 비용을 크게 줄여주는 비용 효율적인 솔루션을 제공하며, 문맥화된 청크는 문서 토큰 백만 개당 약 1.02달러의 비용이 듭니다. 따라서 대규모 지식 베이스를 처리하기 위한 확장 가능하고 효율적인 접근 방식입니다. Anthropic의 솔루션은 두 가지 측면에서 인사이트를 제공합니다:</p>
<ul>
<li><code translate="no">Document Enhancement</code>: 쿼리 재작성은 최신 정보 검색에서 중요한 기술로, 종종 보조 정보를 사용해 쿼리를 더 유익하게 만드는 데 사용됩니다. 마찬가지로, RAG에서 더 나은 성능을 얻으려면 색인 전에 LLM으로 문서를 전처리(예: 데이터 소스 정리, 손실된 정보 보완, 요약 등)하면 관련 문서를 검색할 가능성이 크게 향상될 수 있습니다. 즉, 이 전처리 단계는 관련성 측면에서 문서를 쿼리에 더 가깝게 만드는 데 도움이 됩니다.</li>
<li><code translate="no">Low-Cost Processing by Caching Long Context</code>: LLM을 사용해 문서를 처리할 때 흔히 우려하는 것 중 하나는 비용입니다. KVCache는 동일한 이전 컨텍스트에 대해 중간 결과를 재사용할 수 있는 인기 있는 솔루션입니다. 대부분의 호스팅 LLM 공급업체는 이 기능을 사용자에게 투명하게 제공하지만, Anthropic은 사용자가 캐싱 프로세스를 제어할 수 있습니다. 캐시 히트가 발생하면 대부분의 계산을 저장할 수 있습니다(긴 컨텍스트는 동일하게 유지되지만 각 쿼리에 대한 명령어가 변경되는 경우가 일반적입니다). 자세한 내용은 <a href="https://www.anthropic.com/news/prompt-caching">여기를</a> 클릭하세요.</li>
</ul>
<p>이 노트북에서는 밀집-희소 하이브리드 검색과 재랭커를 결합하여 점점 더 강력한 검색 시스템을 만들기 위해 밀버스와 LLM을 사용해 문맥 검색을 수행하는 방법을 보여드리겠습니다. 데이터와 실험 설정은 <a href="https://github.com/anthropics/anthropic-cookbook/blob/main/skills/contextual-embeddings/guide.ipynb">문맥 검색</a>을 기반으로 합니다.</p>
<h2 id="Preparation" class="common-anchor-header">준비 사항<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-Dependencies" class="common-anchor-header">설치 종속성</h3><pre><code translate="no" class="language-shell">$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
$ pip install tqdm
$ pip install anthropic
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택).</p>
</div>
<p>코드를 실행하려면 Cohere, Voyage, Anthropic의 API 키가 필요합니다.</p>
<h2 id="Download-Data" class="common-anchor-header">데이터 다운로드<button data-href="#Download-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령은 원래 Anthropic <a href="https://github.com/anthropics/anthropic-cookbook/blob/main/skills/contextual-embeddings/guide.ipynb">데모에</a> 사용된 예제 데이터를 다운로드합니다.</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/codebase_chunks.json</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/evaluation_set.jsonl</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-Retriever" class="common-anchor-header">리트리버 정의<button data-href="#Define-Retriever" class="anchor-icon" translate="no">
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
    </button></h2><p>이 클래스는 필요에 따라 다양한 검색 모드 중에서 선택할 수 있도록 유연하게 설계되었습니다. 초기화 방법에서 옵션을 지정하여 문맥 검색, 하이브리드 검색(밀도 검색과 희소 검색 방법의 결합) 또는 향상된 결과를 위한 재랭커를 사용할지 여부를 결정할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> VoyageEmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> CohereRerankFunction

<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Dict</span>, <span class="hljs-type">Any</span>
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Callable</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    AnnSearchRequest,
    RRFRanker,
)
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> anthropic


<span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusContextualRetriever</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">
        self,
        uri=<span class="hljs-string">&quot;milvus.db&quot;</span>,
        collection_name=<span class="hljs-string">&quot;contexual_bgem3&quot;</span>,
        dense_embedding_function=<span class="hljs-literal">None</span>,
        use_sparse=<span class="hljs-literal">False</span>,
        sparse_embedding_function=<span class="hljs-literal">None</span>,
        use_contextualize_embedding=<span class="hljs-literal">False</span>,
        anthropic_client=<span class="hljs-literal">None</span>,
        use_reranker=<span class="hljs-literal">False</span>,
        rerank_function=<span class="hljs-literal">None</span>,
    </span>):
        <span class="hljs-variable language_">self</span>.collection_name = collection_name

        <span class="hljs-comment"># For Milvus-lite, uri is a local path like &quot;./milvus.db&quot;</span>
        <span class="hljs-comment"># For Milvus standalone service, uri is like &quot;http://localhost:19530&quot;</span>
        <span class="hljs-comment"># For Zilliz Clond, please set `uri` and `token`, which correspond to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) in Zilliz Cloud.</span>
        <span class="hljs-variable language_">self</span>.client = MilvusClient(uri)

        <span class="hljs-variable language_">self</span>.embedding_function = dense_embedding_function

        <span class="hljs-variable language_">self</span>.use_sparse = use_sparse
        <span class="hljs-variable language_">self</span>.sparse_embedding_function = <span class="hljs-literal">None</span>

        <span class="hljs-variable language_">self</span>.use_contextualize_embedding = use_contextualize_embedding
        <span class="hljs-variable language_">self</span>.anthropic_client = anthropic_client

        <span class="hljs-variable language_">self</span>.use_reranker = use_reranker
        <span class="hljs-variable language_">self</span>.rerank_function = rerank_function

        <span class="hljs-keyword">if</span> use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span> <span class="hljs-keyword">and</span> sparse_embedding_function:
            <span class="hljs-variable language_">self</span>.sparse_embedding_function = sparse_embedding_function
        <span class="hljs-keyword">elif</span> sparse_embedding_function <span class="hljs-keyword">is</span> <span class="hljs-literal">False</span>:
            <span class="hljs-keyword">raise</span> ValueError(
                <span class="hljs-string">&quot;Sparse embedding function cannot be None if use_sparse is False&quot;</span>
            )
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">pass</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">build_collection</span>(<span class="hljs-params">self</span>):
        schema = <span class="hljs-variable language_">self</span>.client.create_schema(
            auto_id=<span class="hljs-literal">True</span>,
            enable_dynamic_field=<span class="hljs-literal">True</span>,
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
        schema.add_field(
            field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
            datatype=DataType.FLOAT_VECTOR,
            dim=<span class="hljs-variable language_">self</span>.embedding_function.dim,
        )
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            schema.add_field(
                field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR
            )

        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>
        )
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            index_params.add_index(
                field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
                index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
                metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
            )

        <span class="hljs-variable language_">self</span>.client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            schema=schema,
            index_params=index_params,
            enable_dynamic_field=<span class="hljs-literal">True</span>,
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_data</span>(<span class="hljs-params">self, chunk, metadata</span>):
        dense_vec = <span class="hljs-variable language_">self</span>.embedding_function([chunk])[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            sparse_result = <span class="hljs-variable language_">self</span>.sparse_embedding_function.encode_documents([chunk])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(sparse_result) == <span class="hljs-built_in">dict</span>:
                sparse_vec = sparse_result[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]]
            <span class="hljs-keyword">else</span>:
                sparse_vec = sparse_result[[<span class="hljs-number">0</span>]]
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={
                    <span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec,
                    <span class="hljs-string">&quot;sparse_vector&quot;</span>: sparse_vec,
                    **metadata,
                },
            )
        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={<span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec, **metadata},
            )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_contextualized_data</span>(<span class="hljs-params">self, doc, chunk, metadata</span>):
        contextualized_text, usage = <span class="hljs-variable language_">self</span>.situate_context(doc, chunk)
        metadata[<span class="hljs-string">&quot;context&quot;</span>] = contextualized_text
        text_to_embed = <span class="hljs-string">f&quot;<span class="hljs-subst">{chunk}</span>\n\n<span class="hljs-subst">{contextualized_text}</span>&quot;</span>
        dense_vec = <span class="hljs-variable language_">self</span>.embedding_function([text_to_embed])[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            sparse_vec = <span class="hljs-variable language_">self</span>.sparse_embedding_function.encode_documents(
                [text_to_embed]
            )[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]]
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={
                    <span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec,
                    <span class="hljs-string">&quot;sparse_vector&quot;</span>: sparse_vec,
                    **metadata,
                },
            )
        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={<span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec, **metadata},
            )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">situate_context</span>(<span class="hljs-params">self, doc: <span class="hljs-built_in">str</span>, chunk: <span class="hljs-built_in">str</span></span>):
        DOCUMENT_CONTEXT_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
        &lt;document&gt;
        {doc_content}
        &lt;/document&gt;
        &quot;&quot;&quot;</span>

        CHUNK_CONTEXT_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
        Here is the chunk we want to situate within the whole document
        &lt;chunk&gt;
        {chunk_content}
        &lt;/chunk&gt;

        Please give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk.
        Answer only with the succinct context and nothing else.
        &quot;&quot;&quot;</span>

        response = <span class="hljs-variable language_">self</span>.anthropic_client.beta.prompt_caching.messages.create(
            model=<span class="hljs-string">&quot;claude-3-haiku-20240307&quot;</span>,
            max_tokens=<span class="hljs-number">1000</span>,
            temperature=<span class="hljs-number">0.0</span>,
            messages=[
                {
                    <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                    <span class="hljs-string">&quot;content&quot;</span>: [
                        {
                            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,
                            <span class="hljs-string">&quot;text&quot;</span>: DOCUMENT_CONTEXT_PROMPT.<span class="hljs-built_in">format</span>(doc_content=doc),
                            <span class="hljs-string">&quot;cache_control&quot;</span>: {
                                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;ephemeral&quot;</span>
                            },  <span class="hljs-comment"># we will make use of prompt caching for the full documents</span>
                        },
                        {
                            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,
                            <span class="hljs-string">&quot;text&quot;</span>: CHUNK_CONTEXT_PROMPT.<span class="hljs-built_in">format</span>(chunk_content=chunk),
                        },
                    ],
                },
            ],
            extra_headers={<span class="hljs-string">&quot;anthropic-beta&quot;</span>: <span class="hljs-string">&quot;prompt-caching-2024-07-31&quot;</span>},
        )
        <span class="hljs-keyword">return</span> response.content[<span class="hljs-number">0</span>].text, response.usage

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">self, query: <span class="hljs-built_in">str</span>, k: <span class="hljs-built_in">int</span> = <span class="hljs-number">20</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]]:
        dense_vec = <span class="hljs-variable language_">self</span>.embedding_function([query])[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            sparse_vec = <span class="hljs-variable language_">self</span>.sparse_embedding_function.encode_queries([query])[
                <span class="hljs-string">&quot;sparse&quot;</span>
            ][[<span class="hljs-number">0</span>]]

        req_list = []
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_reranker:
            k = k * <span class="hljs-number">10</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            req_list = []
            dense_search_param = {
                <span class="hljs-string">&quot;data&quot;</span>: [dense_vec],
                <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,
                <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
                <span class="hljs-string">&quot;limit&quot;</span>: k * <span class="hljs-number">2</span>,
            }
            dense_req = AnnSearchRequest(**dense_search_param)
            req_list.append(dense_req)

            sparse_search_param = {
                <span class="hljs-string">&quot;data&quot;</span>: [sparse_vec],
                <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
                <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
                <span class="hljs-string">&quot;limit&quot;</span>: k * <span class="hljs-number">2</span>,
            }
            sparse_req = AnnSearchRequest(**sparse_search_param)

            req_list.append(sparse_req)

            docs = <span class="hljs-variable language_">self</span>.client.hybrid_search(
                <span class="hljs-variable language_">self</span>.collection_name,
                req_list,
                RRFRanker(),
                k,
                output_fields=[
                    <span class="hljs-string">&quot;content&quot;</span>,
                    <span class="hljs-string">&quot;original_uuid&quot;</span>,
                    <span class="hljs-string">&quot;doc_id&quot;</span>,
                    <span class="hljs-string">&quot;chunk_id&quot;</span>,
                    <span class="hljs-string">&quot;original_index&quot;</span>,
                    <span class="hljs-string">&quot;context&quot;</span>,
                ],
            )
        <span class="hljs-keyword">else</span>:
            docs = <span class="hljs-variable language_">self</span>.client.search(
                <span class="hljs-variable language_">self</span>.collection_name,
                data=[dense_vec],
                anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
                limit=k,
                output_fields=[
                    <span class="hljs-string">&quot;content&quot;</span>,
                    <span class="hljs-string">&quot;original_uuid&quot;</span>,
                    <span class="hljs-string">&quot;doc_id&quot;</span>,
                    <span class="hljs-string">&quot;chunk_id&quot;</span>,
                    <span class="hljs-string">&quot;original_index&quot;</span>,
                    <span class="hljs-string">&quot;context&quot;</span>,
                ],
            )
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_reranker <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.use_contextualize_embedding:
            reranked_texts = []
            reranked_docs = []
            <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(k):
                <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_contextualize_embedding:
                    reranked_texts.append(
                        <span class="hljs-string">f&quot;<span class="hljs-subst">{docs[<span class="hljs-number">0</span>][i][<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>\n\n<span class="hljs-subst">{docs[<span class="hljs-number">0</span>][i][<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;context&#x27;</span>]}</span>&quot;</span>
                    )
                <span class="hljs-keyword">else</span>:
                    reranked_texts.append(<span class="hljs-string">f&quot;<span class="hljs-subst">{docs[<span class="hljs-number">0</span>][i][<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>)
            results = <span class="hljs-variable language_">self</span>.rerank_function(query, reranked_texts)
            <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
                reranked_docs.append(docs[<span class="hljs-number">0</span>][result.index])
            docs[<span class="hljs-number">0</span>] = reranked_docs
        <span class="hljs-keyword">return</span> docs


<span class="hljs-keyword">def</span> <span class="hljs-title function_">evaluate_retrieval</span>(<span class="hljs-params">
    queries: <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]], retrieval_function: <span class="hljs-type">Callable</span>, db, k: <span class="hljs-built_in">int</span> = <span class="hljs-number">20</span>
</span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-built_in">float</span>]:
    total_score = <span class="hljs-number">0</span>
    total_queries = <span class="hljs-built_in">len</span>(queries)
    <span class="hljs-keyword">for</span> query_item <span class="hljs-keyword">in</span> tqdm(queries, desc=<span class="hljs-string">&quot;Evaluating retrieval&quot;</span>):
        query = query_item[<span class="hljs-string">&quot;query&quot;</span>]
        golden_chunk_uuids = query_item[<span class="hljs-string">&quot;golden_chunk_uuids&quot;</span>]

        <span class="hljs-comment"># Find all golden chunk contents</span>
        golden_contents = []
        <span class="hljs-keyword">for</span> doc_uuid, chunk_index <span class="hljs-keyword">in</span> golden_chunk_uuids:
            golden_doc = <span class="hljs-built_in">next</span>(
                (
                    doc
                    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> query_item[<span class="hljs-string">&quot;golden_documents&quot;</span>]
                    <span class="hljs-keyword">if</span> doc[<span class="hljs-string">&quot;uuid&quot;</span>] == doc_uuid
                ),
                <span class="hljs-literal">None</span>,
            )
            <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> golden_doc:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Warning: Golden document not found for UUID <span class="hljs-subst">{doc_uuid}</span>&quot;</span>)
                <span class="hljs-keyword">continue</span>

            golden_chunk = <span class="hljs-built_in">next</span>(
                (
                    chunk
                    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> golden_doc[<span class="hljs-string">&quot;chunks&quot;</span>]
                    <span class="hljs-keyword">if</span> chunk[<span class="hljs-string">&quot;index&quot;</span>] == chunk_index
                ),
                <span class="hljs-literal">None</span>,
            )
            <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> golden_chunk:
                <span class="hljs-built_in">print</span>(
                    <span class="hljs-string">f&quot;Warning: Golden chunk not found for index <span class="hljs-subst">{chunk_index}</span> in document <span class="hljs-subst">{doc_uuid}</span>&quot;</span>
                )
                <span class="hljs-keyword">continue</span>

            golden_contents.append(golden_chunk[<span class="hljs-string">&quot;content&quot;</span>].strip())

        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> golden_contents:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Warning: No golden contents found for query: <span class="hljs-subst">{query}</span>&quot;</span>)
            <span class="hljs-keyword">continue</span>

        retrieved_docs = retrieval_function(query, db, k=k)

        <span class="hljs-comment"># Count how many golden chunks are in the top k retrieved documents</span>
        chunks_found = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span> golden_content <span class="hljs-keyword">in</span> golden_contents:
            <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs[<span class="hljs-number">0</span>][:k]:
                retrieved_content = doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>].strip()
                <span class="hljs-keyword">if</span> retrieved_content == golden_content:
                    chunks_found += <span class="hljs-number">1</span>
                    <span class="hljs-keyword">break</span>

        query_score = chunks_found / <span class="hljs-built_in">len</span>(golden_contents)
        total_score += query_score

    average_score = total_score / total_queries
    pass_at_n = average_score * <span class="hljs-number">100</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;pass_at_n&quot;</span>: pass_at_n,
        <span class="hljs-string">&quot;average_score&quot;</span>: average_score,
        <span class="hljs-string">&quot;total_queries&quot;</span>: total_queries,
    }


<span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_base</span>(<span class="hljs-params">query: <span class="hljs-built_in">str</span>, db, k: <span class="hljs-built_in">int</span> = <span class="hljs-number">20</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]]:
    <span class="hljs-keyword">return</span> db.search(query, k=k)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">load_jsonl</span>(<span class="hljs-params">file_path: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]]:
    <span class="hljs-string">&quot;&quot;&quot;Load JSONL file and return a list of dictionaries.&quot;&quot;&quot;</span>
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        <span class="hljs-keyword">return</span> [json.loads(line) <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> file]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">evaluate_db</span>(<span class="hljs-params">db, original_jsonl_path: <span class="hljs-built_in">str</span>, k</span>):
    <span class="hljs-comment"># Load the original JSONL data for queries and ground truth</span>
    original_data = load_jsonl(original_jsonl_path)

    <span class="hljs-comment"># Evaluate retrieval</span>
    results = evaluate_retrieval(original_data, retrieve_base, db, k)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Pass@<span class="hljs-subst">{k}</span>: <span class="hljs-subst">{results[<span class="hljs-string">&#x27;pass_at_n&#x27;</span>]:<span class="hljs-number">.2</span>f}</span>%&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total Score: <span class="hljs-subst">{results[<span class="hljs-string">&#x27;average_score&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total queries: <span class="hljs-subst">{results[<span class="hljs-string">&#x27;total_queries&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>이제 다음 실험을 위해 이러한 모델을 초기화해야 합니다. PyMilvus 모델 라이브러리를 사용하여 다른 모델로 쉽게 전환할 수 있습니다.</p>
<pre><code translate="no" class="language-python">dense_ef = <span class="hljs-title class_">VoyageEmbeddingFunction</span>(api_key=<span class="hljs-string">&quot;your-voyage-api-key&quot;</span>, model_name=<span class="hljs-string">&quot;voyage-2&quot;</span>)
sparse_ef = <span class="hljs-title class_">BGEM3EmbeddingFunction</span>()
cohere_rf = <span class="hljs-title class_">CohereRerankFunction</span>(api_key=<span class="hljs-string">&quot;your-cohere-api-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files:   0%|          | 0/30 [00:00&lt;?, ?it/s]
</code></pre>
<pre><code translate="no" class="language-python">path = <span class="hljs-string">&quot;codebase_chunks.json&quot;</span>
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
    dataset = json.load(f)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Experiment-I-Standard-Retrieval" class="common-anchor-header">실험 1: 표준 검색<button data-href="#Experiment-I-Standard-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>표준 검색은 밀도가 높은 임베딩만 사용하여 관련 문서를 검색합니다. 이 실험에서는 Pass@5를 사용하여 원본 리포지토리의 결과를 재현합니다.</p>
<pre><code translate="no" class="language-python">standard_retriever = <span class="hljs-title class_">MilvusContextualRetriever</span>(
    uri=<span class="hljs-string">&quot;standard.db&quot;</span>, collection_name=<span class="hljs-string">&quot;standard&quot;</span>, dense_embedding_function=dense_ef
)

standard_retriever.<span class="hljs-title function_">build_collection</span>()
<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> <span class="hljs-attr">dataset</span>:
    doc_content = doc[<span class="hljs-string">&quot;content&quot;</span>]
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> doc[<span class="hljs-string">&quot;chunks&quot;</span>]:
        metadata = {
            <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;original_uuid&quot;</span>: doc[<span class="hljs-string">&quot;original_uuid&quot;</span>],
            <span class="hljs-string">&quot;chunk_id&quot;</span>: chunk[<span class="hljs-string">&quot;chunk_id&quot;</span>],
            <span class="hljs-string">&quot;original_index&quot;</span>: chunk[<span class="hljs-string">&quot;original_index&quot;</span>],
            <span class="hljs-string">&quot;content&quot;</span>: chunk[<span class="hljs-string">&quot;content&quot;</span>],
        }
        chunk_content = chunk[<span class="hljs-string">&quot;content&quot;</span>]
        standard_retriever.<span class="hljs-title function_">insert_data</span>(chunk_content, metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-title function_">evaluate_db</span>(standard_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Evaluating retrieval: 100%|██████████| 248/248 [01:29&lt;00:00,  2.77it/s]

Pass@5: 80.92%
Total Score: 0.8091877880184332
Total queries: 248
</code></pre>
<h2 id="Experiment-II-Hybrid-Retrieval" class="common-anchor-header">실험 II: 하이브리드 검색<button data-href="#Experiment-II-Hybrid-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Voyage 임베딩으로 유망한 결과를 얻었으므로 이제 강력한 스파스 임베딩을 생성하는 BGE-M3 모델을 사용해 하이브리드 검색을 수행해 보겠습니다. 밀도 검색과 희소 검색의 결과를 상호 순위 융합(RRF) 방법을 사용해 결합하여 하이브리드 결과를 생성합니다.</p>
<pre><code translate="no" class="language-python">hybrid_retriever = MilvusContextualRetriever(
    uri=<span class="hljs-string">&quot;hybrid.db&quot;</span>,
    collection_name=<span class="hljs-string">&quot;hybrid&quot;</span>,
    dense_embedding_function=dense_ef,
    use_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=sparse_ef,
)

hybrid_retriever.build_collection()
<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> dataset:
    doc_content = doc[<span class="hljs-string">&quot;content&quot;</span>]
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> doc[<span class="hljs-string">&quot;chunks&quot;</span>]:
        metadata = {
            <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;original_uuid&quot;</span>: doc[<span class="hljs-string">&quot;original_uuid&quot;</span>],
            <span class="hljs-string">&quot;chunk_id&quot;</span>: chunk[<span class="hljs-string">&quot;chunk_id&quot;</span>],
            <span class="hljs-string">&quot;original_index&quot;</span>: chunk[<span class="hljs-string">&quot;original_index&quot;</span>],
            <span class="hljs-string">&quot;content&quot;</span>: chunk[<span class="hljs-string">&quot;content&quot;</span>],
        }
        chunk_content = chunk[<span class="hljs-string">&quot;content&quot;</span>]
        hybrid_retriever.insert_data(chunk_content, metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-title function_">evaluate_db</span>(hybrid_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Evaluating retrieval: 100%|██████████| 248/248 [02:09&lt;00:00,  1.92it/s]

Pass@5: 84.69%
Total Score: 0.8469182027649771
Total queries: 248
</code></pre>
<h2 id="Experiment-III-Contextual-Retrieval" class="common-anchor-header">실험 III: 문맥 검색<button data-href="#Experiment-III-Contextual-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색은 개선된 결과를 보여주지만, 문맥 검색 방법을 적용하면 결과를 더욱 향상시킬 수 있습니다. 이를 위해 Anthropic의 언어 모델을 사용하여 각 청크에 대해 전체 문서에서 문맥을 미리 추가합니다.</p>
<pre><code translate="no" class="language-python">anthropic_client = anthropic.<span class="hljs-title class_">Anthropic</span>(
    api_key=<span class="hljs-string">&quot;your-anthropic-api-key&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">contextual_retriever = MilvusContextualRetriever(
    uri=<span class="hljs-string">&quot;contextual.db&quot;</span>,
    collection_name=<span class="hljs-string">&quot;contextual&quot;</span>,
    dense_embedding_function=dense_ef,
    use_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=sparse_ef,
    use_contextualize_embedding=<span class="hljs-literal">True</span>,
    anthropic_client=anthropic_client,
)

contextual_retriever.build_collection()
<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> dataset:
    doc_content = doc[<span class="hljs-string">&quot;content&quot;</span>]
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> doc[<span class="hljs-string">&quot;chunks&quot;</span>]:
        metadata = {
            <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;original_uuid&quot;</span>: doc[<span class="hljs-string">&quot;original_uuid&quot;</span>],
            <span class="hljs-string">&quot;chunk_id&quot;</span>: chunk[<span class="hljs-string">&quot;chunk_id&quot;</span>],
            <span class="hljs-string">&quot;original_index&quot;</span>: chunk[<span class="hljs-string">&quot;original_index&quot;</span>],
            <span class="hljs-string">&quot;content&quot;</span>: chunk[<span class="hljs-string">&quot;content&quot;</span>],
        }
        chunk_content = chunk[<span class="hljs-string">&quot;content&quot;</span>]
        contextual_retriever.insert_contextualized_data(
            doc_content, chunk_content, metadata
        )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-title function_">evaluate_db</span>(contextual_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"> Evaluating retrieval: 100%|██████████| 248/248 [01:55&lt;00:00,  2.15it/s]
Pass@5: 87.14%
Total Score: 0.8713517665130568
Total queries: 248 
</code></pre>
<h2 id="Experiment-IV-Contextual-Retrieval-with-Reranker" class="common-anchor-header">실험 4: 리랭커를 사용한 문맥 검색<button data-href="#Experiment-IV-Contextual-Retrieval-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Cohere 리랭커를 추가하면 결과를 더욱 개선할 수 있습니다. 리랭커가 포함된 새 리트리버를 별도로 초기화하지 않고도 기존 리트리버가 리랭커를 사용하도록 간단히 구성하여 성능을 향상시킬 수 있습니다.</p>
<pre><code translate="no" class="language-python">contextual_retriever.use_reranker = <span class="hljs-literal">True</span>
contextual_retriever.rerank_function = cohere_rf
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-title function_">evaluate_db</span>(contextual_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Evaluating retrieval: 100%|██████████| 248/248 [02:02&lt;00:00,  2.00it/s]
Pass@5: 90.91%
Total Score: 0.9090821812596005
Total queries: 248
</code></pre>
<p>검색 성능을 개선하는 몇 가지 방법을 시연해 보았습니다. 시나리오에 맞게 임시로 설계된 문맥 검색은 저렴한 비용으로 문서를 전처리할 수 있는 상당한 잠재력을 보여주며, 더 나은 RAG 시스템으로 이어집니다.</p>
