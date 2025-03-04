---
id: ETL_using_vectorETL.md
summary: >-
  이 튜토리얼에서는 벡터 데이터베이스를 위해 설계된 경량 ETL 프레임워크인
  [VectorETL](https://github.com/ContextData/VectorETL)을 사용하여 Milvus에 데이터를 효율적으로
  로드하는 방법을 살펴봅니다. VectorETL은 다양한 소스에서 데이터를 추출하고, AI 모델을 사용하여 벡터 임베딩으로 변환한 다음,
  빠르고 확장 가능한 검색을 위해 Milvus에 저장하는 프로세스를 간소화합니다. 이 튜토리얼이 끝나면 벡터 검색 시스템을 쉽게 통합하고
  관리할 수 있는 작동하는 ETL 파이프라인을 갖추게 됩니다. 시작해 봅시다!
title: VectorETL을 사용하여 Milvus에 효율적으로 데이터 로드하기
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">VectorETL을 사용하여 Milvus에 효율적으로 데이터 로드하기<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 벡터 데이터베이스를 위해 설계된 경량 ETL 프레임워크인 <a href="https://github.com/ContextData/VectorETL">VectorETL을</a> 사용하여 Milvus에 데이터를 효율적으로 로드하는 방법을 살펴봅니다. VectorETL은 다양한 소스에서 데이터를 추출하고, AI 모델을 사용하여 벡터 임베딩으로 변환한 다음, 빠르고 확장 가능한 검색을 위해 Milvus에 저장하는 프로세스를 간소화합니다. 이 튜토리얼이 끝나면 벡터 검색 시스템을 쉽게 통합하고 관리할 수 있는 작동하는 ETL 파이프라인을 갖추게 됩니다. 시작해 보겠습니다!</p>
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">종속성 및 환경</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade vector-etl pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속 요소를 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택).</p>
</div>
<p>VectorETL은 Amazon S3, Google 클라우드 스토리지, 로컬 파일 등 다양한 데이터 소스를 지원합니다. 지원되는 소스의 전체 목록은 <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">여기에서</a> 확인할 수 있습니다. 이 튜토리얼에서는 데이터 소스 예제로 Amazon S3를 집중적으로 살펴보겠습니다.</p>
<p>Amazon S3에서 문서를 로드하겠습니다. 따라서 S3 버킷에 안전하게 액세스하려면 <code translate="no">AWS_ACCESS_KEY_ID</code> 및 <code translate="no">AWS_SECRET_ACCESS_KEY</code> 을 환경 변수로 준비해야 합니다. 또한 OpenAI의 <code translate="no">text-embedding-ada-002</code> 임베딩 모델을 사용하여 데이터에 대한 임베딩을 생성할 것입니다. 또한 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">워크플로<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">데이터 소스 정의(Amazon S3)</h3><p>이 사례에서는 Amazon S3 버킷에서 문서를 추출합니다. VectorETL을 사용하면 버킷 이름, 파일 경로, 작업 중인 데이터 유형을 지정할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">source</span> = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">임베딩 모델 구성하기(OpenAI)</h3><p>데이터 소스를 설정했으면 텍스트 데이터를 벡터 임베딩으로 변환할 임베딩 모델을 정의해야 합니다. 여기서는 이 예제에서 OpenAI의 <code translate="no">text-embedding-ada-002</code> 을 사용합니다.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">Milvus를 대상 데이터베이스로 설정하기</h3><p>생성된 임베딩을 Milvus에 저장해야 합니다. 여기서는 Milvus Lite를 사용하여 Milvus 연결 파라미터를 정의합니다.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">host</code> 및 <code translate="no">api_key</code>:</p>
<ul>
<li><p><code translate="no">host</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하고 <code translate="no">api_key</code> 을 비워두는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</p></li>
<li><p>데이터 규모가 큰 경우, <a href="https://milvus.io/docs/quickstart.md">도커나 쿠버네티스에</a> 더 성능이 좋은 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 <code translate="no">host</code> 으로 사용하고 <code translate="no">api_key</code> 은 비워두세요.</p></li>
<li><p>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">host</code> 와 <code translate="no">api_key</code> 을 조정하세요.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">임베딩할 컬럼 지정하기</h3><p>이제 CSV 파일에서 임베딩으로 변환할 컬럼을 지정해야 합니다. 이렇게 하면 관련 텍스트 필드만 처리되어 효율성과 저장 공간을 모두 최적화할 수 있습니다.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">VectorETL 파이프라인 생성 및 실행</h3><p>모든 구성이 완료되었으므로 이제 ETL 파이프라인을 초기화하고 데이터 흐름을 설정한 후 실행합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>이 튜토리얼을 따라 VectorETL을 사용하여 Amazon S3에서 Milvus로 문서를 이동하는 엔드투엔드 ETL 파이프라인을 성공적으로 구축했습니다. VectorETL은 데이터 소스에서 유연하기 때문에 특정 애플리케이션의 필요에 따라 원하는 데이터 소스를 선택할 수 있습니다. VectorETL의 모듈식 설계를 통해 이 파이프라인을 쉽게 확장하여 다른 데이터 소스를 지원하고 모델을 임베딩할 수 있으므로, AI 및 데이터 엔지니어링 워크플로우를 위한 강력한 도구가 됩니다!</p>
