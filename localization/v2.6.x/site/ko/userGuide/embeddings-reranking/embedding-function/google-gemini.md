---
id: google-gemini.md
title: 구글 제미니
summary: 모델을 선택하고 Gemini API 키로 Milvus를 구성하여 Google Gemini 임베딩 모델을 Milvus와 함께 사용하세요.
---
<h1 id="Google-Gemini" class="common-anchor-header">구글 제미니<button data-href="#Google-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>모델을 선택하고 Gemini API 키로 Milvus를 구성하여 Milvus에 Google Gemini 임베딩 모델을 사용하세요.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">임베딩 모델 선택하기<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스는 구글 제미니에서 제공하는 임베딩 모델을 지원합니다. 아래는 현재 사용 가능한 Gemini 임베딩 모델을 빠르게 참조할 수 있습니다:</p>
<table>
   <tr>
     <th><p><strong>모델 이름</strong></p></th>
     <th><p><strong>크기</strong></p></th>
     <th><p><strong>최대 토큰</strong></p></th>
     <th><p><strong>설명</strong></p></th>
   </tr>
   <tr>
     <td><p>제미니 임베딩-001</p></td>
     <td><p>기본값: 3,072(권장: 768, 1,536 또는 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>유연한 치수를 가진 텍스트 임베딩 모델로, 마트료시카 표현 학습(MRL)을 사용하여 학습되었습니다.</p></td>
   </tr>
   <tr>
     <td><p>gemini-embedding-2</p></td>
     <td><p>기본값: 3,072(권장: 768, 1,536 또는 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>통합된 임베딩 공간에서 텍스트, 이미지, 동영상, 오디오 및 문서를 지원하는 Google 최초의 네이티브 멀티모달 임베딩 모델입니다.</p></td>
   </tr>
</table>
<p>두 모델 모두 <code translate="no">dim</code> 매개변수를 통해 출력 크기를 유연하게 조정할 수 있는 Matryoshka 표현 학습(MRL) 기법을 사용하여 학습됩니다. 768개 차원으로 시작하여 필요한 경우 1,536개 또는 3,072개까지 확장하는 것이 좋습니다. 자세한 내용은 <a href="https://ai.google.dev/gemini-api/docs/embeddings">Gemini 임베딩 모델을</a> 참조하세요.</p>
<p>Gemini 임베딩 모델은 특정 사용 사례에 맞게 임베딩을 최적화하는 <strong>작업 유형</strong> 파라미터도 지원합니다. Milvus는 작업에 따라 작업 유형을 자동으로 설정합니다:</p>
<ul>
<li><p><strong>삽입/삽입</strong>: <code translate="no">RETRIEVAL_DOCUMENT</code></p></li>
<li><p><strong>검색</strong>: <code translate="no">RETRIEVAL_QUERY</code></p></li>
</ul>
<p><code translate="no">task</code> 파라미터를 명시적으로 지정하여 이를 재정의할 수 있습니다(예: <code translate="no">SEMANTIC_SIMILARITY</code>, <code translate="no">CLASSIFICATION</code>, <code translate="no">CLUSTERING</code>).</p>
<h2 id="Configure-credentials" class="common-anchor-header">자격 증명 구성<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 임베딩을 요청하기 전에 사용자의 Gemini API 키를 알고 있어야 합니다. Milvus는 두 가지 방법으로 자격 증명을 구성할 수 있습니다:</p>
<ul>
<li><p><strong>구성 파일(권장):</strong> API 키를 <code translate="no">milvus.yaml</code> 에 저장하여 재시작할 때마다 노드가 자동으로 가져옵니다.</p></li>
<li><p><strong>환경 변수:</strong> 배포 시점에 키를 주입하는 방법(Docker Compose에 이상적).</p></li>
</ul>
<p>아래 두 가지 방법 중 하나를 선택하세요. 구성 파일은 베어메탈 및 가상 머신에서 유지 관리가 더 쉬운 반면, 환경 변수 경로는 컨테이너 워크플로우에 적합합니다.</p>
<p>동일한 공급자에 대한 API 키가 구성 파일과 환경 변수 모두에 있는 경우, Milvus는 항상 <code translate="no">milvus.yaml</code> 의 값을 사용하고 환경 변수는 무시합니다.</p>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">옵션 1: 구성 파일(권장 및 우선순위 높음)<button data-href="#Option-1-Configuration-file-recommended--higher-priority" class="anchor-icon" translate="no">
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
    </button></h3><p>API 키를 <code translate="no">milvus.yaml</code>; Milvus는 시작 시 키를 읽고 동일한 공급자에 대한 모든 환경 변수를 재정의합니다.</p>
<ol>
<li><p><strong>자격 증명 아래에 키를 선언하세요:</strong></p>
<p>하나 또는 여러 개의 API 키를 나열할 수 있으며, 각 키에 나중에 참조할 레이블을 지정할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>API 키를 여기에 넣으면 재시작 시에도 영구적으로 유지되며 레이블을 변경하는 것만으로 키를 전환할 수 있습니다.</p></li>
<li><p><strong>Milvus에게 Gemini 호출에 사용할 키 알려주기</strong></p>
<p>같은 파일에서 Gemini 공급자가 사용할 레이블을 가리키도록 지정하세요.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">gemini:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 Milvus가 Gemini 임베딩 엔드포인트로 보내는 모든 요청에 특정 키가 바인딩됩니다.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">옵션 2: 환경 변수<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Docker Compose와 함께 Milvus를 실행하고 파일 및 이미지에서 비밀을 유지하려는 경우 이 방법을 사용하세요.</p>
<p>Milvus는 <code translate="no">milvus.yaml</code> 에서 공급자에 대한 키를 찾을 수 없는 경우에만 환경 변수로 되돌아갑니다.</p>
<table>
   <tr>
     <th><p><strong>변수</strong></p></th>
     <th><p><strong>필수</strong></p></th>
     <th><p><strong>설명</strong></p></th>
   </tr>
   <tr>
     <td><p>MILVUS_GEMINI_API_KEY</p></td>
     <td><p>예</p></td>
     <td><p>각 Milvus 컨테이너 내에서 Gemini 키를 사용할 수 있도록 설정합니다(milvus.yaml에 Gemini 키가 있는 경우 무시됨).</p></td>
   </tr>
</table>
<p><strong>docker-compose.yaml</strong> 파일에서 <code translate="no">MILVUS_GEMINI_API_KEY</code> 환경 변수를 설정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Gemini API key inside the container</span>
    <span class="hljs-attr">MILVUS_GEMINI_API_KEY:</span> <span class="hljs-string">&lt;YOUR_GEMINI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">environment:</code> 블록은 Milvus 컨테이너에만 키를 주입하며 호스트 OS는 그대로 유지합니다. 자세한 내용은 <a href="http://configure-docker.md#Configure-Milvus-with-Docker-Compose">Docker Compose로 Milvus 구성을</a> 참조하세요.</p>
<h2 id="Step-1-Create-a-collection-with-a-text-embedding-function" class="common-anchor-header">1단계: 텍스트 임베딩 기능으로 컬렉션 만들기<button data-href="#Step-1-Create-a-collection-with-a-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-schema-fields" class="common-anchor-header">스키마 필드 정의<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>임베딩 함수를 사용하려면 특정 스키마로 컬렉션을 만듭니다. 이 스키마에는 최소 3개의 필수 필드가 포함되어야 합니다:</p>
<ul>
<li><p>컬렉션의 각 엔티티를 고유하게 식별하는 기본 필드.</p></li>
<li><p>임베드할 원시 데이터를 저장하는 <code translate="no">VARCHAR</code> 필드.</p></li>
<li><p>텍스트 임베딩 함수가 <code translate="no">VARCHAR</code> 필드에 대해 생성할 고밀도 벡터 임베딩을 저장하기 위해 예약된 벡터 필드.</p></li>
</ul>
<p>다음 예제에서는 텍스트 데이터를 저장하는 스칼라 필드( <code translate="no">&quot;document&quot;</code> ) 1개와 함수 모듈에서 생성할 임베딩을 저장하는 벡터 필드( <code translate="no">&quot;dense&quot;</code> ) 1개가 있는 스키마를 정의합니다. 선택한 임베딩 모델의 출력과 일치하도록 벡터 차원(<code translate="no">dim</code>)을 설정하는 것을 잊지 마세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment"># For instance, Gemini&#x27;s gemini-embedding-001 model outputs 3072-dimensional vectors by default,</span>
<span class="hljs-comment"># but can be shortened to 768 or 1536 dimensions.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-text-embedding-function" class="common-anchor-header">텍스트 임베딩 함수 정의하기<button data-href="#Define-the-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h3><p>텍스트 임베딩 함수는 <code translate="no">VARCHAR</code> 필드에 저장된 원시 데이터를 임베딩으로 자동 변환하여 명시적으로 정의된 벡터 필드에 저장합니다.</p>
<p>아래 예시에서는 스칼라 필드 <code translate="no">&quot;document&quot;</code> 를 임베딩으로 변환하여 결과 벡터를 앞서 정의한 <code translate="no">&quot;dense&quot;</code> 벡터 필드에 저장하는 함수 모듈(<code translate="no">gemini_embedding</code>)을 추가합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: Gemini provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;gemini_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;gemini&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>,       <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;768&quot;,                             # Optional: Output vector dimension (default 3072)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;RETRIEVAL_DOCUMENT&quot;,             # Optional: Task type for embedding optimization</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p><strong>작업 매개변수에 대해 지원되는 작업 유형:</strong></p>
<ul>
<li><p><code translate="no">RETRIEVAL_DOCUMENT</code> - 문서 인덱싱을 위해 임베딩을 최적화합니다(삽입/삽입의 경우 기본값).</p></li>
<li><p><code translate="no">RETRIEVAL_QUERY</code> - 쿼리 검색을 위해 임베딩을 최적화합니다(검색의 경우 기본값).</p></li>
<li><p><code translate="no">SEMANTIC_SIMILARITY</code> - 텍스트 유사성 측정을 위해 임베딩을 최적화합니다.</p></li>
<li><p><code translate="no">CLASSIFICATION</code> - 텍스트 분류를 위해 임베딩을 최적화합니다.</p></li>
<li><p><code translate="no">CLUSTERING</code> - 클러스터링을 위해 임베딩을 최적화합니다.</p></li>
</ul>
<p>명시적으로 설정하지 않으면 Milvus는 삽입/삽입 시 <code translate="no">RETRIEVAL_DOCUMENT</code>, 검색 시 <code translate="no">RETRIEVAL_QUERY</code> 을 자동으로 사용합니다.</p>
<h3 id="Configure-the-index" class="common-anchor-header">색인 구성<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>필요한 필드와 내장 함수로 스키마를 정의한 후 컬렉션의 인덱스를 설정하세요. 이 과정을 간소화하기 위해 <code translate="no">AUTOINDEX</code> 을 <code translate="no">index_type</code> 으로 사용하면 Milvus가 데이터 구조에 따라 가장 적합한 인덱스 유형을 선택하고 구성할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-collection" class="common-anchor-header">컬렉션 만들기<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>이제 정의한 스키마와 인덱스 매개변수를 사용하여 컬렉션을 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-data" class="common-anchor-header">2단계: 데이터 삽입<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션과 인덱스를 설정했으면 이제 원시 데이터를 삽입할 준비가 되었습니다. 이 과정에서는 원시 텍스트만 제공하면 됩니다. 앞서 정의한 함수 모듈이 각 텍스트 항목에 해당하는 스파스 벡터를 자동으로 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text" class="common-anchor-header">3단계: 텍스트로 검색<button data-href="#Step-3-Search-with-text" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터를 입력한 후 원시 쿼리 텍스트를 사용하여 시맨틱 검색을 수행합니다. Milvus는 자동으로 쿼리를 임베딩 벡터로 변환하고 유사도에 따라 관련 문서를 검색한 후 가장 일치하는 결과를 반환합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>검색 및 쿼리 작업에 대한 자세한 내용은 <a href="/docs/ko/single-vector-search.md">기본 벡터 검색</a> 및 <a href="/docs/ko/get-and-scalar-query.md">쿼리를</a> 참조하세요.</p>
