---
id: build_RAG_with_milvus_and_embedAnything.md
summary: >-
  이 튜토리얼에서는 Milvus와 함께 EmbedAnything을 사용해 검색 증강 생성(RAG) 파이프라인을 구축하는 방법을
  보여드리겠습니다. 특정 데이터베이스와 긴밀하게 결합하는 대신 플러그형 어댑터 시스템을 사용하는 EmbedAnything은 어댑터가 임베딩의
  포맷, 인덱싱 및 대상 벡터 저장소에 저장되는 방식을 정의하는 래퍼 역할을 합니다.
title: Milvus와 EmbedAnything으로 RAG 구축하기
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-RAG-with-Milvus-and-EmbedAnything" class="common-anchor-header">Milvus와 EmbedAnything으로 RAG 구축하기<button data-href="#Building-RAG-with-Milvus-and-EmbedAnything" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/StarlightSearch/EmbedAnything">임베드애니씽은</a> 텍스트, PDF, 이미지, 오디오 등을 지원하는 초고속 경량 임베딩 파이프라인으로 Rust에 내장되어 있습니다.</p>
<p>이 튜토리얼에서는 <a href="https://milvus.io">Milvus와</a> 함께 EmbedAnything을 사용하여 검색 증강 생성(RAG) 파이프라인을 구축하는 방법을 보여드리겠습니다. 특정 데이터베이스와 긴밀하게 결합하는 대신, 임베드애니씽은 플러그형 <strong>어댑터</strong> 시스템을 사용합니다. 어댑터는 임베딩의 포맷, 인덱싱 및 대상 벡터 저장소에 저장되는 방식을 정의하는 래퍼 역할을 합니다.</p>
<p>EmbedAnything과 Milvus 어댑터를 페어링하면 단 몇 줄의 코드만으로 다양한 파일 유형에서 임베딩을 생성하고 이를 Milvus에 효율적으로 저장할 수 있습니다.</p>
<blockquote>
<p>⚠️ 참고: EmbedAnything의 어댑터는 Milvus로의 삽입을 처리하지만, 즉시 검색을 지원하지는 않습니다. 전체 RAG 파이프라인을 구축하려면 MilvusClient를 별도로 인스턴스화하고 애플리케이션의 일부로 검색 로직(예: 벡터를 통한 유사성 검색)을 구현해야 합니다.</p>
</blockquote>
<h2 id="Preparation" class="common-anchor-header">준비<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">종속성 및 환경</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU pymilvus openai embed_anything</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속 요소를 활성화하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택).</p>
</div>
<h3 id="Clone-the-Repository-and-Load-Adapter" class="common-anchor-header">리포지토리 및 로드 어댑터 복제하기</h3><p>다음으로, <a href="https://github.com/StarlightSearch/EmbedAnything">임베드애니싱</a> 리포지토리를 복제하고 <code translate="no">examples/adapters</code> 디렉토리를 Python 경로에 추가합니다. 이 디렉토리에 커스텀 Milvus 어댑터 구현을 저장하여 EmbedAnything이 벡터 삽입을 위해 Milvus와 통신할 수 있도록 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> sys

<span class="hljs-comment"># Clone the EmbedAnything repository if not already cloned</span>
![ -d <span class="hljs-string">&quot;EmbedAnything&quot;</span> ] || git clone https://github.com/StarlightSearch/EmbedAnything.git

<span class="hljs-comment"># Add the `examples/adapters` directory to the Python path</span>
sys.path.append(<span class="hljs-string">&quot;EmbedAnything/examples/adapters&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;✅ EmbedAnything cloned and adapter path added.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">✅ EmbedAnything cloned and adapter path added.
</code></pre>
<p>이 RAG 파이프라인에서는 OpenAI를 LLM으로 사용합니다. 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAG 빌드<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Initialize-Milvus" class="common-anchor-header">Milvus 초기화</h3><p>파일을 임베드하기 전에 Milvus와 상호 작용하는 두 가지 컴포넌트를 준비해야 합니다:</p>
<ol>
<li><code translate="no">MilvusVectorAdapter</code> - 이것은 EmbedAnything용 Milvus 어댑터이며, <strong>벡터 수집</strong> (즉, 임베딩 삽입 및 인덱스 생성) <strong>에만</strong> 사용됩니다. 현재 검색 작업은 지원하지 <strong>않습니다</strong>.</li>
<li><code translate="no">MilvusClient</code> - 공식 클라이언트는 <code translate="no">pymilvus</code> 에서 벡터 검색, 필터링, 수집 관리 등 Milvus의 모든 기능에 <strong>액세스할</strong> 수 있습니다.</li>
</ol>
<p>혼동을 피하기 위해:</p>
<ul>
<li><code translate="no">MilvusVectorAdapter</code> 은 벡터 저장을 위한 "쓰기 전용" 도구라고 생각하세요.</li>
<li><code translate="no">MilvusClient</code> 은 실제로 쿼리를 수행하고 RAG용 문서를 검색하는 "읽기 및 검색" 엔진이라고 생각하시면 됩니다.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> embed_anything
<span class="hljs-keyword">from</span> embed_anything <span class="hljs-keyword">import</span> (
    WhichModel,
    EmbeddingModel,
)
<span class="hljs-keyword">from</span> milvus_db <span class="hljs-keyword">import</span> MilvusVectorAdapter
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Official Milvus client for full operations</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>)

<span class="hljs-comment"># EmbedAnything adapter for pushing embeddings into Milvus</span>
index_name = <span class="hljs-string">&quot;embed_anything_milvus_collection&quot;</span>
milvus_adapter = MilvusVectorAdapter(
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>, collection_name=index_name
)

<span class="hljs-comment"># Delete existing collection if it exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(index_name):
    milvus_client.drop_collection(index_name)

<span class="hljs-comment"># Create a new collection with dimension matching the embedding model later used</span>
milvus_adapter.create_index(dimension=<span class="hljs-number">384</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Ok - Milvus DB connection established.
Collection 'embed_anything_milvus_collection' created with index.
</code></pre>
<div class="alert note">
<p><code translate="no">MilvusVectorAdapter</code> 와 <code translate="no">MilvusClient</code> 의 인수는 다음과 같습니다:</p>
<ul>
<li><code translate="no">uri</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대량의 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에</a> 더 성능이 좋은 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "<your_username>:<your_password>"을 사용하고, 그렇지 않으면 토큰을 설정하지 마세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 을 조정합니다.</li>
</ul>
</div>
<h3 id="Initialize-Embedding-Model-and-Embed-PDF-Document" class="common-anchor-header">임베딩 모델 초기화 및 PDF 문서 임베딩하기</h3><p>이제 임베딩 모델을 초기화하겠습니다. 텍스트 임베딩을 생성하기 위한 가볍지만 강력한 모델인 문장 변환기 라이브러리의 <code translate="no">all-MiniLM-L12-v2 model</code> 을 사용하겠습니다. 이 모델은 384차원 임베딩을 생성하므로 Milvus 컬렉션 차원이 384로 설정되어 있는 것과 일치합니다. 이 정렬은 매우 중요하며 Milvus에 저장된 벡터 차원과 모델에서 생성된 차원 간의 호환성을 보장합니다.</p>
<p>임베드애니씽은 훨씬 더 많은 임베딩 모델을 지원합니다. 자세한 내용은 <a href="https://github.com/StarlightSearch/EmbedAnything">공식 문서를</a> 참조하세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the embedding model</span>
model = EmbeddingModel.from_pretrained_hf(
    WhichModel.Bert, model_id=<span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L12-v2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이제 PDF 파일을 임베드해 보겠습니다. 임베드애니씽을 사용하면 PDF(및 기타 여러 문서)를 쉽게 처리하고 임베딩을 Milvus에 직접 저장할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Embed a PDF file</span>
data = embed_anything.embed_file(
    <span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>,
    embedder=model,
    adapter=milvus_adapter,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Converted 12 embeddings for insertion.
Successfully inserted 12 embeddings.
</code></pre>
<h3 id="Retrieve-and-Generate-Response" class="common-anchor-header">응답 검색 및 생성</h3><p>다시 말씀드리지만, 현재 EmbedAnything의 <code translate="no">MilvusVectorAdapter</code> 은 벡터 수집 및 인덱싱만을 위한 경량 추상화입니다. <strong>검색</strong> 또는 검색 쿼리는 <strong>지원하지 않습니다</strong>. 따라서 RAG 파이프라인을 구축하기 위해 관련 문서를 검색하려면 <code translate="no">MilvusClient</code> 인스턴스(<code translate="no">milvus_client</code>)를 직접 사용하여 Milvus 벡터 저장소를 쿼리해야 합니다.</p>
<p>Milvus에서 관련 문서를 검색하는 함수를 정의합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    query_vector = <span class="hljs-built_in">list</span>(
        embed_anything.embed_query([question], embedder=model)[<span class="hljs-number">0</span>].embedding
    )
    search_res = milvus_client.search(
        collection_name=index_name,
        data=[query_vector],
        limit=top_k,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    docs = [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<p>RAG 파이프라인에서 검색된 문서를 사용하여 응답을 생성하는 함수를 정의합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_rag_response</span>(<span class="hljs-params">question</span>):
    retrieved_docs = retrieve_documents(question)
    context = <span class="hljs-string">&quot;\n&quot;</span>.join([<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{doc[<span class="hljs-number">0</span>]}</span>\n&quot;</span> <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs])
    system_prompt = (
        <span class="hljs-string">&quot;You are an AI assistant. Provide answers based on the given context.&quot;</span>
    )
    user_prompt = <span class="hljs-string">f&quot;&quot;&quot;
    Use the following pieces of information to answer the question. If the information is not in the context, say you don&#x27;t know.
    
    Context:
    <span class="hljs-subst">{context}</span>
    
    Question: <span class="hljs-subst">{question}</span>
    &quot;&quot;&quot;</span>
    response = openai_client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: system_prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
        ],
    )
    <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
<button class="copy-code-btn"></button></code></pre>
<p>샘플 질문으로 RAG 파이프라인을 테스트해 보겠습니다.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How does Milvus search for similar documents?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: How does Milvus search for similar documents?
Answer: Milvus searches for similar documents primarily through Approximate Nearest Neighbor (ANN) search, which finds the top K vectors closest to a given query vector. It also supports various other types of searches, such as filtering search under specified conditions, range search within a specified radius, hybrid search based on multiple vector fields, and keyword search based on BM25. Additionally, it can perform reranking to adjust the order of search results based on additional criteria, refining the initial ANN search results.
</code></pre>
