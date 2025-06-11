---
id: build_RAG_with_milvus_and_cognee.md
summary: 이 튜토리얼에서는 Milvus와 Cognee를 사용하여 RAG(검색 증강 생성) 파이프라인을 구축하는 방법을 보여드리겠습니다.
title: 밀버스 및 코그니로 RAG 구축하기
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">Milvus와 Cognee로 RAG 구축하기</h3><p><a href="https://www.cognee.ai">Cognee는</a> 확장 가능한 모듈식 ECL(추출, 인지, 로드) 파이프라인을 통해 AI 애플리케이션 개발을 간소화하는 개발자 우선 플랫폼입니다. Milvus와 원활하게 통합되어 대화, 문서, 트랜스크립션을 효율적으로 연결하고 검색할 수 있는 Cognee는 착각을 줄이고 운영 비용을 최적화합니다.</p>
<p>Milvus와 같은 벡터 저장소, 그래프 데이터베이스, LLM을 강력하게 지원하는 Cognee는 검색 증강 생성(RAG) 시스템 구축을 위한 유연하고 사용자 정의 가능한 프레임워크를 제공합니다. 프로덕션에 바로 사용할 수 있는 아키텍처는 AI 기반 애플리케이션의 정확성과 효율성을 향상시킵니다.</p>
<p>이 튜토리얼에서는 Milvus 및 Cognee를 사용하여 검색 증강 생성(RAG) 파이프라인을 구축하는 방법을 보여드리겠습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus git+https://github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Google Colab을 사용하는 경우 방금 설치한 종속 요소를 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 '런타임' 메뉴를 클릭하고 드롭다운 메뉴에서 '세션 다시 시작'을 선택).</p>
</blockquote>
<p>이 예제에서는 기본적으로 OpenAI를 LLM으로 사용합니다. <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비하여 <code translate="no">set_llm_api_key()</code> 함수에서 설정해야 합니다.</p>
<p>Milvus를 벡터 데이터베이스로 구성하려면 <code translate="no">VECTOR_DB_PROVIDER</code> 을 <code translate="no">milvus</code> 으로 설정하고 <code translate="no">VECTOR_DB_URL</code> 및 <code translate="no">VECTOR_DB_KEY</code> 을 지정합니다. 이 데모에서는 Milvus Lite를 사용하여 데이터를 저장하기 때문에 <code translate="no">VECTOR_DB_URL</code> 만 제공하면 됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.config.set_llm_api_key(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.environ[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.environ[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>환경 변수는 <code translate="no">VECTOR_DB_URL</code> 와 <code translate="no">VECTOR_DB_KEY</code> 입니다:</p>
<ul>
<li><code translate="no">VECTOR_DB_URL</code> 를 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하여 모든 데이터를 이 파일에 저장하기 때문입니다.</li>
<li>데이터 규모가 큰 경우, <a href="https://milvus.io/docs/quickstart.md">도커나 쿠버네티스에</a> 더 고성능의 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 <code translate="no">VECTOR_DB_URL</code> 으로 사용하세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">VECTOR_DB_URL</code> 와 <code translate="no">VECTOR_DB_KEY</code> 을 조정하세요.</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">데이터 준비</h3><p><a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 문서 2.4.x의</a> FAQ 페이지를 RAG의 비공개 지식으로 사용하며, 이는 간단한 RAG 파이프라인을 위한 좋은 데이터 소스입니다.</p>
<p>zip 파일을 다운로드하고 문서를 <code translate="no">milvus_docs</code> 폴더에 압축을 풉니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus_docs/en/faq</code> 폴더에서 모든 마크다운 파일을 로드합니다. 각 문서에 대해 "#"를 사용하여 파일의 내용을 구분하기만 하면 마크다운 파일의 각 주요 부분의 내용을 대략적으로 구분할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">코그니 데이터 재설정</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>이제 깨끗한 슬레이트가 준비되었으므로 데이터 집합을 추가하여 지식 그래프로 처리할 수 있습니다.</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">데이터 추가 및 인지하기</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add</code> 메서드는 데이터 세트(Milvus FAQ)를 Cognee에 로드하고 <code translate="no">cognify</code> 메서드는 데이터를 처리하여 엔티티, 관계 및 요약을 추출하여 지식 그래프를 구성합니다.</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">요약 쿼리하기</h3><p>이제 데이터가 처리되었으므로 지식 그래프를 쿼리해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>이 쿼리는 지식 그래프에서 쿼리 텍스트와 관련된 요약을 검색하고 가장 관련성이 높은 후보가 인쇄됩니다.</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">청크 쿼리하기</h3><p>요약은 개괄적인 인사이트를 제공하지만, 더 세분화된 세부 정보를 얻으려면 처리된 데이터 세트에서 직접 특정 데이터 청크를 쿼리할 수 있습니다. 이러한 청크는 지식 그래프를 만드는 동안 추가되고 분석된 원본 데이터에서 파생됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.CHUNKS, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>가독성을 높이기 위해 서식을 지정하고 표시해 보겠습니다!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>이전 단계에서는 요약과 특정 데이터 청크 모두에 대해 Milvus FAQ 데이터 집합을 쿼리했습니다. 이를 통해 상세한 인사이트와 세분화된 정보를 얻을 수 있었지만 데이터 세트가 너무 커서 지식 그래프 내에서 종속성을 명확하게 시각화하기가 어려웠습니다.</p>
<p>이 문제를 해결하기 위해 코그니 환경을 재설정하고 더 작고 집중된 데이터 세트로 작업할 것입니다. 이렇게 하면 코그니파이 프로세스 중에 추출된 관계와 종속성을 더 잘 보여줄 수 있습니다. 데이터를 단순화함으로써 Cognee가 지식 그래프에서 정보를 어떻게 구성하고 구조화하는지를 명확하게 확인할 수 있습니다.</p>
<h3 id="Reset-Cognee" class="common-anchor-header">코그니 초기화</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">집중 데이터 세트 추가하기</h3><p>여기서는 한 줄의 텍스트만 있는 작은 데이터 집합을 추가하고 처리하여 집중적이고 쉽게 해석할 수 있는 지식 그래프가 되도록 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">인사이트 쿼리하기</h3><p>이 작은 데이터 세트에 집중함으로써 이제 지식 그래프 내의 관계와 구조를 명확하게 분석할 수 있습니다.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-built_in">print</span>(result_text)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># ({&#x27;id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;natural language processing&#x27;, &#x27;description&#x27;: &#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;}, {&#x27;relationship_name&#x27;: &#x27;is_a_subfield_of&#x27;, &#x27;source_node_id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;target_node_id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 15, 473137, tzinfo=datetime.timezone.utc)}, {&#x27;id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;computer science&#x27;, &#x27;description&#x27;: &#x27;The study of computation and information processing.&#x27;})</span>
<span class="hljs-comment"># (...)</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># It represents nodes and relationships in the knowledge graph:</span>
<span class="hljs-comment"># - The first element is the source node (e.g., &#x27;natural language processing&#x27;).</span>
<span class="hljs-comment"># - The second element is the relationship between nodes (e.g., &#x27;is_a_subfield_of&#x27;).</span>
<span class="hljs-comment"># - The third element is the target node (e.g., &#x27;computer science&#x27;).</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 출력은 지식 그래프 쿼리의 결과를 나타내며, 처리된 데이터 세트에서 추출된 엔티티(노드)와 그 관계(에지)를 보여줍니다. 각 튜플에는 소스 엔티티, 관계 유형, 대상 엔티티와 함께 고유 ID, 설명, 타임스탬프와 같은 메타데이터가 포함됩니다. 그래프는 주요 개념과 그 의미론적 연결을 강조하여 데이터 집합을 구조적으로 이해할 수 있도록 해줍니다.</p>
<p>Milvus를 통해 코그니의 기본 사용법을 배웠습니다. 코그니의 고급 사용법을 더 알고 싶으시다면 공식 <a href="https://github.com/topoteretes/cognee">페이지</a> 를 참조하세요.</p>
