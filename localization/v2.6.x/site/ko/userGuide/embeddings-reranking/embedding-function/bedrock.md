---
id: bedrock.md
title: BedrockCompatible with Milvus 2.6.x
summary: 이 항목에서는 Milvus에서 Amazon Bedrock 임베딩 기능을 구성하고 사용하는 방법에 대해 설명합니다.
beta: Milvus 2.6.x
---
<h1 id="Bedrock" class="common-anchor-header">Bedrock<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Bedrock" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus에서 Amazon Bedrock 임베딩 기능을 구성하고 사용하는 방법에 대해 설명합니다.</p>
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
    </button></h2><p>밀버스는 아마존 베드락에서 제공하는 임베딩 모델을 지원합니다. 아래는 현재 사용 가능한 임베딩 모델을 빠르게 참조할 수 있습니다:</p>
<table>
   <tr>
     <th><p>모델 이름</p></th>
     <th><p>치수</p></th>
     <th><p>최대 토큰</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p>amazon.titan-embed-text-v2:0</p></td>
     <td><p>1,024(기본값), 512, 256</p></td>
     <td><p>8,192</p></td>
     <td><p>RAG, 문서 검색, 재랭크, 분류 등.</p></td>
   </tr>
</table>
<p>자세한 내용은 <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html">Amazon Titan 텍스트 임베딩 모델을</a> 참조하세요.</p>
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
    </button></h2><p>Milvus는 임베딩을 요청하기 전에 사용자의 Bedrock 액세스 자격 증명을 알고 있어야 합니다. Milvus는 두 가지 방법으로 자격 증명을 구성할 수 있습니다:</p>
<ul>
<li><p><strong>구성 파일(권장):</strong> 자격 증명을 <code translate="no">milvus.yaml</code> 에 저장하여 재시작할 때마다 노드가 자동으로 가져옵니다.</p></li>
<li><p><strong>환경 변수:</strong> 배포 시점에 자격 증명을 주입하는 방법(Docker Compose에 이상적).</p></li>
</ul>
<p>아래 두 가지 방법 중 하나를 선택하세요. 구성 파일은 베어메탈 및 가상 머신에서 유지 관리가 더 쉬운 반면, 환경 변수 경로는 컨테이너 워크플로에 적합합니다.</p>
<div class="alert note">
<p>동일한 공급자에 대한 자격 증명이 구성 파일과 환경 변수에 모두 있는 경우, Milvus는 항상 <code translate="no">milvus.yaml</code> 의 값을 사용하고 환경 변수는 무시합니다.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">옵션 1: 구성 파일(권장 및 우선순위 높음)</h3><p>자격 증명을 <code translate="no">milvus.yaml</code> 에 보관하세요. Milvus는 시작 시 자격 증명을 읽고 동일한 공급자에 대한 모든 환경 변수를 재정의합니다.</p>
<ol>
<li><p>**아래에 자격 증명을 선언하세요. <code translate="no">credential:</code></p>
<p>하나 또는 여러 개의 자격 증명을 나열할 수 있으며, 각각에 사용자가 만든 레이블을 부여하고 나중에 참조할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">aksk_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_DEV_ACCESS_KEY_ID&gt;</span>
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_DEV_SECRET_ACCESS_KEY&gt;</span>
  <span class="hljs-attr">aksk_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_PROD_ACCESS_KEY_ID&gt;</span>    
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_PROD_SECRET_ACCESS_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>여기에 자격 증명을 저장하면 재시작 시에도 자격 증명이 유지되며 레이블을 변경하는 것만으로 자격 증명을 전환할 수 있습니다.</p></li>
<li><p><strong>서비스 호출에 사용할 자격 증명을 Milvus에 알려주세요.</strong></p>
<p>동일한 파일에서 Bedrock 공급자가 사용하려는 레이블을 가리키세요.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">bedrock:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 Milvus가 Bedrock 임베딩 서비스에 보내는 모든 요청에 특정 자격 증명이 바인딩됩니다.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">옵션 2: 환경 변수</h3><p>Docker Compose와 함께 Milvus를 실행하고 파일과 이미지에서 비밀을 유지하려는 경우 이 방법을 사용합니다.</p>
<p>Milvus는 <code translate="no">milvus.yaml</code> 에서 공급자에 대한 자격 증명을 찾을 수 없는 경우에만 환경 변수로 되돌아갑니다.</p>
<table>
   <tr>
     <th><p>변수</p></th>
     <th><p>필수</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_BEDROCK_ACCESS_KEY_ID</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Bedrock 서비스 인증에 사용되는 AWS 액세스 키 ID입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_BEDROCK_SECRET_ACCESS_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>액세스 키 ID에 해당하는 AWS 비밀 액세스 키입니다.</p></td>
   </tr>
</table>
<p><strong>docker-compose.yaml</strong> 파일에서 <code translate="no">MILVUSAI_OPENAI_API_KEY</code> 환경 변수를 설정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Bedrock embedding service inside the container</span>
    <span class="hljs-attr">MILVUSAI_BEDROCK_ACCESS_KEY_ID:</span> <span class="hljs-string">&lt;MILVUSAI_BEDROCK_ACCESS_KEY_ID&gt;</span>
    <span class="hljs-attr">MILVUSAI_BEDROCK_SECRET_ACCESS_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_BEDROCK_SECRET_ACCESS_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">environment:</code> 블록은 호스트 OS는 그대로 두고 Milvus 컨테이너에만 키를 삽입합니다. 자세한 내용은 <a href="/docs/ko/configure-docker.md#Configure-Milvus-with-Docker-Compose">Docker Compose로 Milvus 구성을</a> 참조하세요.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">임베딩 기능 사용<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>자격 증명이 구성되면 다음 단계에 따라 임베딩 함수를 정의하고 사용하세요.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">1단계: 스키마 필드 정의</h3><p>임베딩 함수를 사용하려면 특정 스키마로 컬렉션을 만듭니다. 이 스키마에는 최소 3개의 필수 필드가 포함되어야 합니다:</p>
<ul>
<li><p>컬렉션의 각 엔티티를 고유하게 식별하는 기본 필드.</p></li>
<li><p>임베드할 원시 데이터를 저장하는 스칼라 필드.</p></li>
<li><p>함수가 스칼라 필드에 대해 생성할 벡터 임베딩을 저장하기 위해 예약된 벡터 필드.</p></li>
</ul>
<p>다음 예에서는 텍스트 데이터를 저장하는 스칼라 필드( <code translate="no">&quot;document&quot;</code> ) 1개와 함수 모듈에서 생성할 임베딩을 저장하는 벡터 필드( <code translate="no">&quot;dense&quot;</code> ) 1개가 있는 스키마를 정의합니다. 선택한 임베딩 모델의 출력과 일치하도록 벡터 차원(<code translate="no">dim</code>)을 설정하는 것을 잊지 마세요.</p>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-function-to-schema" class="common-anchor-header">2단계: 스키마에 함수 추가</h3><p>Milvus의 함수 모듈은 스칼라 필드에 저장된 원시 데이터를 임베딩으로 자동 변환하여 명시적으로 정의된 벡터 필드에 저장합니다.</p>
<p>아래 예는 스칼라 필드 <code translate="no">&quot;document&quot;</code> 를 임베딩으로 변환하여 결과 벡터를 앞서 정의한 <code translate="no">&quot;dense&quot;</code> 벡터 필드에 저장하는 함수 모듈(<code translate="no">bedrk</code>)을 추가하는 예제입니다.</p>
<p>임베딩 함수를 정의한 후에는 컬렉션 스키마에 추가합니다. 이렇게 하면 Milvus가 지정된 임베딩 함수를 사용하여 텍스트 데이터의 임베딩을 처리하고 저장하도록 지시합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for OpenAI provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;bedrk&quot;</span>,                                   <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                      <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;bedrock&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;bedrock&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;amazon.titan-embed-text-v2:0&quot;</span>,    <span class="hljs-comment"># Specifies the embedding model to use</span>
        <span class="hljs-string">&quot;region&quot;</span>: <span class="hljs-string">&quot;us-east-2&quot;</span>,                           <span class="hljs-comment"># Required: AWS region where the Bedrock service is hosted     </span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;aksk_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1024&quot;,                          # Output dimension of the vector embeddings after truncation</span>
        <span class="hljs-comment"># &quot;normalize&quot;: &quot;true&quot;,                    # Whether to normalize the output embeddings</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">다음 단계<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>임베딩 함수를 구성한 후에는 <a href="/docs/ko/embedding-function-overview.md">함수 개요에서</a> 인덱스 구성, 데이터 삽입 예제 및 시맨틱 검색 작업에 대한 추가 지침을 참조하세요.</p>
