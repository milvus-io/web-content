---
id: use_ColPali_with_milvus.md
summary: >-
  이 노트북에서는 일반성을 위해 이런 종류의 다중 벡터 표현을 '콜버트 임베딩'이라고 부릅니다. 그러나 실제로 사용되는 모델은 ColPali
  모델입니다. 다중 벡터 검색을 위해 Milvus를 사용하는 방법을 보여드리겠습니다. 이를 바탕으로 주어진 쿼리를 기반으로 페이지를 검색하기
  위해 ColPali를 사용하는 방법을 소개하겠습니다.
title: Milvus로 다중 모달 검색에 ColPali 사용
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/use_ColPali_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/use_ColPali_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Use-ColPali-for-Multi-Modal-Retrieval-with-Milvus" class="common-anchor-header">Milvus로 다중 모달 검색에 ColPali 사용<button data-href="#Use-ColPali-for-Multi-Modal-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>최신 검색 모델은 일반적으로 텍스트나 이미지를 표현하기 위해 단일 임베딩을 사용합니다. 그러나 ColBERT는 각 데이터 인스턴스에 대한 임베딩 목록을 활용하고 "MaxSim" 연산을 사용하여 두 텍스트 간의 유사성을 계산하는 신경 모델입니다. 텍스트 데이터 외에도 그림, 표, 다이어그램에는 텍스트 기반 정보 검색에서 종종 무시되는 풍부한 정보가 포함되어 있습니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/colpali_formula.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>MaxSim 함수는 토큰 임베딩을 보고 쿼리와 문서(검색 대상)를 비교합니다. 쿼리의 각 단어에 대해 문서에서 가장 유사한 단어를 선택하고(코사인 유사도 또는 제곱 L2 거리 사용) 쿼리의 모든 단어에 대해 이러한 최대 유사도를 합산합니다.</p>
<p>ColPali는 강력한 이해 능력을 활용하기 위해 ColBERT의 다중 벡터 표현을 PaliGemma(다중 모드 대규모 언어 모델)와 결합한 방법입니다. 이 접근 방식을 사용하면 텍스트와 이미지가 모두 포함된 페이지를 통합된 멀티 벡터 임베딩을 사용하여 표현할 수 있습니다. 이 다중 벡터 표현 내의 임베딩은 상세한 정보를 캡처하여 멀티모달 데이터에 대한 검색 증강 생성(RAG)의 성능을 향상시킬 수 있습니다.</p>
<p>이 노트북에서는 일반성을 위해 이러한 종류의 다중 벡터 표현을 '콜버트 임베딩'이라고 부릅니다. 그러나 실제로 사용되는 모델은 <strong>ColPali 모델입니다</strong>. 다중 벡터 검색을 위해 Milvus를 사용하는 방법을 보여드리겠습니다. 이를 바탕으로 주어진 쿼리를 기반으로 페이지를 검색하기 위해 ColPali를 사용하는 방법을 소개하겠습니다.</p>
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pdf2image</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install colpali_engine</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install tqdm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pillow</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">데이터 준비<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>예제로 PDF RAG를 사용하겠습니다. <a href="https://arxiv.org/pdf/2004.12832">ColBERT</a> 용지를 다운로드하여 <code translate="no">./pdf</code> 에 넣을 수 있습니다. ColPali는 텍스트를 직접 처리하지 않고 대신 전체 페이지를 이미지로 래스터화합니다. ColPali 모델은 이러한 이미지에 포함된 텍스트 정보를 이해하는 데 탁월합니다. 따라서 각 PDF 페이지를 이미지로 변환하여 처리합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pdf2image <span class="hljs-keyword">import</span> convert_from_path

pdf_path = <span class="hljs-string">&quot;pdfs/2004.12832v2.pdf&quot;</span>
images = convert_from_path(pdf_path)

<span class="hljs-keyword">for</span> i, image <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(images):
    image.save(<span class="hljs-string">f&quot;pages/page_<span class="hljs-subst">{i + <span class="hljs-number">1</span>}</span>.png&quot;</span>, <span class="hljs-string">&quot;PNG&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>다음으로 Milvus Lite를 사용하여 데이터베이스를 초기화합니다. Milvus 서비스가 호스팅되는 적절한 주소로 URL을 설정하여 전체 Milvus 인스턴스로 쉽게 전환할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> concurrent.futures

client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>소규모 데이터나 프로토타이핑을 위해 로컬 벡터 데이터베이스만 필요한 경우, 예를 들어<code translate="no">./milvus.db</code> 와 같이 로컬 파일로 uri를 설정하는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대규모 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에서</a> 더 성능이 뛰어난 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "<your_username>:<your_password>"을 사용하고, 그렇지 않은 경우 토큰을 설정하지 마세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하는 경우, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 및 <code translate="no">token</code> 을 조정합니다.</li>
</ul>
</div>
<p>멀티벡터 데이터 검색을 위해 Milvus 클라이언트를 감싸는 MilvusColbertRetriever 클래스를 정의합니다. 이 구현은 콜버트 임베딩을 플랫화하여 컬렉션에 삽입하며, 각 행은 콜버트 임베딩 목록에서 개별 임베딩을 나타냅니다. 또한 각 임베딩의 출처를 추적하기 위해 doc_id와 seq_id를 기록합니다.</p>
<p>콜버트 임베딩 목록으로 검색할 경우, 각 콜버트 임베딩에 대해 하나씩 여러 번 검색이 수행됩니다. 그런 다음 검색된 문서 ID는 중복 제거됩니다. 리랭킹 프로세스가 수행되어 각 doc_id에 대한 전체 임베딩이 가져오고 MaxSim 점수가 계산되어 최종 순위가 매겨진 결과가 생성됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusColbertRetriever</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, milvus_client, collection_name, dim=<span class="hljs-number">128</span></span>):
        <span class="hljs-comment"># Initialize the retriever with a Milvus client, collection name, and dimensionality of the vector embeddings.</span>
        <span class="hljs-comment"># If the collection exists, load it.</span>
        <span class="hljs-variable language_">self</span>.collection_name = collection_name
        <span class="hljs-variable language_">self</span>.client = milvus_client
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.client.has_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.client.load_collection(collection_name)
        <span class="hljs-variable language_">self</span>.dim = dim

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_collection</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create a new collection in Milvus for storing embeddings.</span>
        <span class="hljs-comment"># Drop the existing collection if it already exists and define the schema for the collection.</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.client.has_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.client.drop_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)
        schema = <span class="hljs-variable language_">self</span>.client.create_schema(
            auto_id=<span class="hljs-literal">True</span>,
            enable_dynamic_fields=<span class="hljs-literal">True</span>,
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
        schema.add_field(
            field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-variable language_">self</span>.dim
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;seq_id&quot;</span>, datatype=DataType.INT16)
        schema.add_field(field_name=<span class="hljs-string">&quot;doc_id&quot;</span>, datatype=DataType.INT64)
        schema.add_field(field_name=<span class="hljs-string">&quot;doc&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)

        <span class="hljs-variable language_">self</span>.client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, schema=schema
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_index</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create an index on the vector field to enable fast similarity search.</span>
        <span class="hljs-comment"># Releases and drops any existing index before creating a new one with specified parameters.</span>
        <span class="hljs-variable language_">self</span>.client.release_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)
        <span class="hljs-variable language_">self</span>.client.drop_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_name=<span class="hljs-string">&quot;vector&quot;</span>
        )
        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;vector&quot;</span>,
            index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
            index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,  <span class="hljs-comment"># or any other index type you want</span>
            metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># or the appropriate metric type</span>
            params={
                <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
                <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">500</span>,
            },  <span class="hljs-comment"># adjust these parameters as needed</span>
        )

        <span class="hljs-variable language_">self</span>.client.create_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_params=index_params, sync=<span class="hljs-literal">True</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_scalar_index</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create a scalar index for the &quot;doc_id&quot; field to enable fast lookups by document ID.</span>
        <span class="hljs-variable language_">self</span>.client.release_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)

        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
            index_name=<span class="hljs-string">&quot;int32_index&quot;</span>,
            index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,  <span class="hljs-comment"># or any other index type you want</span>
        )

        <span class="hljs-variable language_">self</span>.client.create_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_params=index_params, sync=<span class="hljs-literal">True</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">self, data, topk</span>):
        <span class="hljs-comment"># Perform a vector search on the collection to find the top-k most similar documents.</span>
        search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
        results = <span class="hljs-variable language_">self</span>.client.search(
            <span class="hljs-variable language_">self</span>.collection_name,
            data,
            limit=<span class="hljs-built_in">int</span>(<span class="hljs-number">50</span>),
            output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;seq_id&quot;</span>, <span class="hljs-string">&quot;doc_id&quot;</span>],
            search_params=search_params,
        )
        doc_ids = <span class="hljs-built_in">set</span>()
        <span class="hljs-keyword">for</span> r_id <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(results)):
            <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(results[r_id])):
                doc_ids.add(results[r_id][r][<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;doc_id&quot;</span>])

        scores = []

        <span class="hljs-keyword">def</span> <span class="hljs-title function_">rerank_single_doc</span>(<span class="hljs-params">doc_id, data, client, collection_name</span>):
            <span class="hljs-comment"># Rerank a single document by retrieving its embeddings and calculating the similarity with the query.</span>
            doc_colbert_vecs = client.query(
                collection_name=collection_name,
                <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;doc_id in [<span class="hljs-subst">{doc_id}</span>]&quot;</span>,
                output_fields=[<span class="hljs-string">&quot;seq_id&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;doc&quot;</span>],
                limit=<span class="hljs-number">1000</span>,
            )
            doc_vecs = np.vstack(
                [doc_colbert_vecs[i][<span class="hljs-string">&quot;vector&quot;</span>] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(doc_colbert_vecs))]
            )
            score = np.dot(data, doc_vecs.T).<span class="hljs-built_in">max</span>(<span class="hljs-number">1</span>).<span class="hljs-built_in">sum</span>()
            <span class="hljs-keyword">return</span> (score, doc_id)

        <span class="hljs-keyword">with</span> concurrent.futures.ThreadPoolExecutor(max_workers=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> executor:
            futures = {
                executor.submit(
                    rerank_single_doc, doc_id, data, client, <span class="hljs-variable language_">self</span>.collection_name
                ): doc_id
                <span class="hljs-keyword">for</span> doc_id <span class="hljs-keyword">in</span> doc_ids
            }
            <span class="hljs-keyword">for</span> future <span class="hljs-keyword">in</span> concurrent.futures.as_completed(futures):
                score, doc_id = future.result()
                scores.append((score, doc_id))

        scores.sort(key=<span class="hljs-keyword">lambda</span> x: x[<span class="hljs-number">0</span>], reverse=<span class="hljs-literal">True</span>)
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(scores) &gt;= topk:
            <span class="hljs-keyword">return</span> scores[:topk]
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> scores

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert</span>(<span class="hljs-params">self, data</span>):
        <span class="hljs-comment"># Insert ColBERT embeddings and metadata for a document into the collection.</span>
        colbert_vecs = [vec <span class="hljs-keyword">for</span> vec <span class="hljs-keyword">in</span> data[<span class="hljs-string">&quot;colbert_vecs&quot;</span>]]
        seq_length = <span class="hljs-built_in">len</span>(colbert_vecs)
        doc_ids = [data[<span class="hljs-string">&quot;doc_id&quot;</span>] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(seq_length)]
        seq_ids = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">range</span>(seq_length))
        docs = [<span class="hljs-string">&quot;&quot;</span>] * seq_length
        docs[<span class="hljs-number">0</span>] = data[<span class="hljs-string">&quot;filepath&quot;</span>]

        <span class="hljs-comment"># Insert the data as multiple vectors (one for each sequence) along with the corresponding metadata.</span>
        <span class="hljs-variable language_">self</span>.client.insert(
            <span class="hljs-variable language_">self</span>.collection_name,
            [
                {
                    <span class="hljs-string">&quot;vector&quot;</span>: colbert_vecs[i],
                    <span class="hljs-string">&quot;seq_id&quot;</span>: seq_ids[i],
                    <span class="hljs-string">&quot;doc_id&quot;</span>: doc_ids[i],
                    <span class="hljs-string">&quot;doc&quot;</span>: docs[i],
                }
                <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(seq_length)
            ],
        )
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://github.com/illuin-tech/colpali">콜팔리 엔진을</a> 사용하여 두 쿼리에 대한 임베딩 목록을 추출하고 PDF 페이지에서 관련 정보를 검색합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> colpali_engine.models <span class="hljs-keyword">import</span> ColPali
<span class="hljs-keyword">from</span> colpali_engine.models.paligemma.colpali.processing_colpali <span class="hljs-keyword">import</span> ColPaliProcessor
<span class="hljs-keyword">from</span> colpali_engine.utils.processing_utils <span class="hljs-keyword">import</span> BaseVisualRetrieverProcessor
<span class="hljs-keyword">from</span> colpali_engine.utils.torch_utils <span class="hljs-keyword">import</span> ListDataset, get_torch_device
<span class="hljs-keyword">from</span> torch.utils.data <span class="hljs-keyword">import</span> DataLoader
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, cast

device = get_torch_device(<span class="hljs-string">&quot;cpu&quot;</span>)
model_name = <span class="hljs-string">&quot;vidore/colpali-v1.2&quot;</span>

model = ColPali.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map=device,
).<span class="hljs-built_in">eval</span>()

queries = [
    <span class="hljs-string">&quot;How to end-to-end retrieval with ColBert?&quot;</span>,
    <span class="hljs-string">&quot;Where is ColBERT performance table?&quot;</span>,
]

processor = cast(ColPaliProcessor, ColPaliProcessor.from_pretrained(model_name))

dataloader = DataLoader(
    dataset=ListDataset[<span class="hljs-built_in">str</span>](queries),
    batch_size=<span class="hljs-number">1</span>,
    shuffle=<span class="hljs-literal">False</span>,
    collate_fn=<span class="hljs-keyword">lambda</span> x: processor.process_queries(x),
)

qs: <span class="hljs-type">List</span>[torch.Tensor] = []
<span class="hljs-keyword">for</span> batch_query <span class="hljs-keyword">in</span> dataloader:
    <span class="hljs-keyword">with</span> torch.no_grad():
        batch_query = {k: v.to(model.device) <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> batch_query.items()}
        embeddings_query = model(**batch_query)
    qs.extend(<span class="hljs-built_in">list</span>(torch.unbind(embeddings_query.to(<span class="hljs-string">&quot;cpu&quot;</span>))))
<button class="copy-code-btn"></button></code></pre>
<p>또한 각 페이지에 대한 임베딩 목록을 추출해야 하며, 각 페이지에 1030개의 128차원 임베딩이 있음을 보여줍니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">import</span> os

images = [Image.<span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;./pages/&quot;</span> + name) <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> os.listdir(<span class="hljs-string">&quot;./pages&quot;</span>)]

dataloader = DataLoader(
    dataset=ListDataset[<span class="hljs-built_in">str</span>](images),
    batch_size=<span class="hljs-number">1</span>,
    shuffle=<span class="hljs-literal">False</span>,
    collate_fn=<span class="hljs-keyword">lambda</span> x: processor.process_images(x),
)

ds: <span class="hljs-type">List</span>[torch.Tensor] = []
<span class="hljs-keyword">for</span> batch_doc <span class="hljs-keyword">in</span> tqdm(dataloader):
    <span class="hljs-keyword">with</span> torch.no_grad():
        batch_doc = {k: v.to(model.device) <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> batch_doc.items()}
        embeddings_doc = model(**batch_doc)
    ds.extend(<span class="hljs-built_in">list</span>(torch.unbind(embeddings_doc.to(<span class="hljs-string">&quot;cpu&quot;</span>))))

<span class="hljs-built_in">print</span>(ds[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  0%|          | 0/10 [00:00&lt;?, ?it/s]

100%|██████████| 10/10 [01:22&lt;00:00,  8.24s/it]

torch.Size([1030, 128])
</code></pre>
<p>MilvusColbertRetriever를 사용하여 "colpali"라는 컬렉션을 만들겠습니다.</p>
<pre><code translate="no" class="language-python">retriever = MilvusColbertRetriever(collection_name=<span class="hljs-string">&quot;colpali&quot;</span>, milvus_client=client)
retriever.create_collection()
retriever.create_index()
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 데이터베이스에 임베딩 목록을 삽입합니다.</p>
<pre><code translate="no" class="language-python">filepaths = [<span class="hljs-string">&quot;./pages/&quot;</span> + name <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> os.listdir(<span class="hljs-string">&quot;./pages&quot;</span>)]
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(filepaths)):
    data = {
        <span class="hljs-string">&quot;colbert_vecs&quot;</span>: ds[i].<span class="hljs-built_in">float</span>().numpy(),
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;filepath&quot;</span>: filepaths[i],
    }
    retriever.insert(data)
<button class="copy-code-btn"></button></code></pre>
<p>이제 쿼리 임베딩 목록을 사용하여 가장 관련성이 높은 페이지를 검색할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query <span class="hljs-keyword">in</span> qs:
    query = query.<span class="hljs-built_in">float</span>().numpy()
    result = retriever.search(query, topk=<span class="hljs-number">1</span>)
    <span class="hljs-built_in">print</span>(filepaths[result[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>]])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">./pages/page_5.png
./pages/page_7.png
</code></pre>
<p>마지막으로 원본 페이지 이름을 검색합니다. ColPali를 사용하면 문서에서 텍스트와 이미지를 추출하기 위한 복잡한 처리 기술 없이도 멀티모달 문서를 검색할 수 있습니다. 대규모 비전 모델을 활용하면 표와 그림과 같은 더 많은 정보를 큰 정보 손실 없이 분석할 수 있습니다.</p>
