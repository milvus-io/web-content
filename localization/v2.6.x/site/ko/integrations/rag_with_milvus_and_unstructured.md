---
id: rag_with_milvus_and_unstructured.md
summary: 이 튜토리얼에서는 Unstructured를 사용하여 PDF 문서를 수집한 다음 Milvus를 사용하여 RAG 파이프라인을 구축합니다.
title: Milvus와 Unstructured로 RAG 구축하기
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_unstructured.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_unstructured.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Build-a-RAG-with-Milvus-and-Unstructured" class="common-anchor-header">Milvus와 Unstructured로 RAG 구축하기<button data-href="#Build-a-RAG-with-Milvus-and-Unstructured" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.unstructured.io/welcome">Unstructured는</a> 검색 증강 생성(RAG)과 모델 미세 조정을 위해 비정형 문서를 수집 및 처리할 수 있는 플랫폼과 도구를 제공합니다. 코드가 필요 없는 UI 플랫폼과 서버리스 API 서비스를 모두 제공하여 사용자가 Unstructured가 호스팅하는 컴퓨팅 리소스에서 데이터를 처리할 수 있습니다.</p>
<p>이 튜토리얼에서는 Unstructured를 사용하여 PDF 문서를 수집한 다음 Milvus를 사용하여 RAG 파이프라인을 구축합니다.</p>
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">종속성 및 환경<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU <span class="hljs-string">&quot;unstructured[pdf]&quot;</span> pymilvus milvus-lite openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>설치 옵션:</strong></p>
<ul>
<li>모든 문서 형식을 처리합니다: <code translate="no">pip install &quot;unstructured[all-docs]&quot;</code></li>
<li>특정 형식(예: PDF)의 경우: <code translate="no">pip install &quot;unstructured[pdf]&quot;</code></li>
<li>더 많은 설치 옵션은 <a href="https://docs.unstructured.io/open-source/installation/full-installation">비정형 문서를</a> 참조하세요.</li>
</ul>
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 '런타임' 메뉴를 클릭하고 드롭다운 메뉴에서 '세션 다시 시작'을 선택).</p>
<p>이 예제에서는 OpenAI를 LLM으로 사용하겠습니다. 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Milvus-and-OpenAI-clients" class="common-anchor-header">Milvus 및 OpenAI 클라이언트 준비<button data-href="#Prepare-Milvus-and-OpenAI-clients" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 클라이언트를 사용하여 Milvus 컬렉션을 생성하고 데이터를 삽입할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Initialize Milvus client</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>인수는 <code translate="no">MilvusClient</code> 입니다:</p>
<ul>
<li><code translate="no">uri</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대량의 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에</a> 더 성능이 좋은 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "<your_username>:<your_password>"을 사용하고, 그렇지 않으면 토큰을 설정하지 마세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 을 조정합니다.</li>
</ul>
</div>
<p>컬렉션이 이미 존재하는지 확인하고 존재한다면 삭제합니다.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>임베딩을 생성하고 응답을 생성할 OpenAI 클라이언트를 준비합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI()


<span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>테스트 임베딩을 생성하고 해당 차원과 처음 몇 개의 요소를 인쇄합니다.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Create-Milvus-Collection" class="common-anchor-header">Milvus 컬렉션 만들기<button data-href="#Create-Milvus-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 스키마로 컬렉션을 생성합니다:</p>
<ul>
<li><code translate="no">id</code>각 문서의 고유 식별자인 기본 키.</li>
<li><code translate="no">vector</code>문서의 임베딩.</li>
<li><code translate="no">text</code>문서의 텍스트 콘텐츠.</li>
<li><code translate="no">metadata</code>문서의 메타데이터.</li>
</ul>
<p>그런 다음 <code translate="no">vector</code> 필드에 <code translate="no">AUTOINDEX</code> 인덱스를 구축합니다. 그런 다음 컬렉션을 만듭니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create schema</span>
schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=embedding_dim)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)
index_params = MilvusClient.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
)
milvus_client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,
)

milvus_client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-data-from-Unstructured" class="common-anchor-header">비정형에서 데이터 로드<button data-href="#Load-data-from-Unstructured" class="anchor-icon" translate="no">
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
    </button></h2><p>비정형은 PDF, HTML 등 다양한 파일 유형을 처리할 수 있는 유연하고 강력한 수집 파이프라인을 제공합니다. 로컬 PDF 파일을 파티션하고 청크합니다. 그런 다음 데이터를 Milvus로 로드합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> warnings
<span class="hljs-keyword">from</span> unstructured.partition.auto <span class="hljs-keyword">import</span> partition

warnings.filterwarnings(<span class="hljs-string">&quot;ignore&quot;</span>)

elements = partition(
    filename=<span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>,
    strategy=<span class="hljs-string">&quot;hi_res&quot;</span>,
    chunking_strategy=<span class="hljs-string">&quot;by_title&quot;</span>,
)  <span class="hljs-comment"># Replace with the path to your PDF file</span>
<button class="copy-code-btn"></button></code></pre>
<p>PDF 파일에서 분할된 요소를 살펴봅시다. 각 요소는 Unstructured의 파티셔닝 프로세스를 통해 추출된 콘텐츠 청크를 나타냅니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> element <span class="hljs-keyword">in</span> elements:
    <span class="hljs-built_in">print</span>(element)
    <span class="hljs-keyword">break</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">What is Milvus?

Milvus is a high-performance, highly scalable vector database that runs efficiently across a wide range of environments, from a laptop to large-scale distributed systems. It is available as both open-source software and a cloud service.
</code></pre>
<p>Milvus에 데이터를 삽입합니다.</p>
<pre><code translate="no" class="language-python">data = []
<span class="hljs-keyword">for</span> i, element <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(elements):
    data.append(
        {
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: emb_text(element.text),
            <span class="hljs-string">&quot;text&quot;</span>: element.text,
            <span class="hljs-string">&quot;metadata&quot;</span>: element.metadata.to_dict(),
        }
    )
milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'insert_count': 29, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 'cost': 0}
</code></pre>
<h2 id="Retrieve-and-Generate-Response" class="common-anchor-header">응답 검색 및 생성<button data-href="#Retrieve-and-Generate-Response" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 관련 문서를 검색하는 함수를 정의합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    search_res = milvus_client.search(
        collection_name=collection_name,
        data=[emb_text(question)],
        limit=top_k,
        <span class="hljs-comment"># search_params={&quot;metric_type&quot;: &quot;IP&quot;, &quot;params&quot;: {}},</span>
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    <span class="hljs-keyword">return</span> [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
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
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is the Advanced Search Algorithms in Milvus?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: What is the Advanced Search Algorithms in Milvus?
Answer: The Advanced Search Algorithms in Milvus include a wide range of in-memory and on-disk indexing/search algorithms such as IVF, HNSW, and DiskANN. These algorithms have been deeply optimized, and Milvus delivers 30%-70% better performance compared to popular implementations like FAISS and HNSWLib.
</code></pre>
