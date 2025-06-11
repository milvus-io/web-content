---
id: vertex-ai.md
title: 버텍스 AICompatible with Milvus 2.6.x
summary: >-
  구글 클라우드 버텍스 AI는 텍스트 임베딩 모델을 위해 특별히 설계된 고성능 서비스입니다. 이 가이드는 효율적인 텍스트 임베딩 생성을 위해
  Milvus와 함께 구글 클라우드 버텍스 AI를 사용하는 방법을 설명합니다.
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">버텍스 AI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>구글 클라우드 <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">버텍스 AI는</a> 텍스트 임베딩 모델을 위해 특별히 설계된 고성능 서비스입니다. 이 가이드에서는 효율적인 텍스트 임베딩 생성을 위해 Milvus와 함께 구글 클라우드 버텍스 AI를 사용하는 방법을 설명합니다.</p>
<p>Vertex AI는 다양한 사용 사례에 맞는 여러 임베딩 모델을 지원합니다:</p>
<ul>
<li><p>텍스트 임베딩-005(최신 텍스트 임베딩 모델)</p></li>
<li><p>text-multilingual-embedding-002(최신 다국어 텍스트 임베딩 모델)</p></li>
</ul>
<p>자세한 내용은 <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">Vertex AI 텍스트 임베딩 모델 참조를</a> 참조하세요.</p>
<h2 id="Vertex-AI-deployment" class="common-anchor-header">Vertex AI 배포<button data-href="#Vertex-AI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Vertex AI 기능으로 Milvus를 구성하기 전에, Google Cloud 서비스 계정 자격 증명을 사용하도록 Milvus 인스턴스를 구성해야 합니다. Milvus는 두 가지 주요 배포 방식을 지원합니다:</p>
<h3 id="Standard-deployment-Docker-Compose" class="common-anchor-header">표준 배포(Docker Compose)</h3><p>docker-compose.yaml 파일에서 자격 증명 파일을 마운트하고 <code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code> 환경 변수를 설정해야 합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-comment"># ... other mounts ...</span>
    <span class="hljs-comment"># Mount the credential file from the host to the specified path inside the container</span>
    <span class="hljs-comment"># Replace /path/to/your/credentials.json with the actual path</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-Helm-Chart-deployment-Kubernetes" class="common-anchor-header">Milvus Helm 차트 배포(Kubernetes)</h3><p>Kubernetes 환경의 경우, 자격 증명 파일을 저장하기 위해 Kubernetes 시크릿을 사용하는 것이 좋습니다:</p>
<ol>
<li><p><strong>시크릿 생성</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">secret</span> <span class="hljs-string">generic</span> <span class="hljs-string">vertex-ai-secret</span> <span class="hljs-string">\</span>
  <span class="hljs-string">--from-file=credentials.json=/path/to/your/credentials.json</span> <span class="hljs-string">\</span>
  <span class="hljs-string">-n</span> <span class="hljs-string">&lt;your-milvus-namespace&gt;</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>values.yaml 구성</strong></p>
<p>독립형 또는 프록시/데이터노드 섹션 아래에 다음을 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
    <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">Milvus에서 구성<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Vertex AI 자격 증명을 배포한 후에는 임베딩 기능을 구성해야 합니다. Milvus는 다음과 같은 우선순위에 따라 적용되는 여러 가지 방법으로 Vertex AI의 인증 자격 증명을 구성할 수 있도록 지원합니다:</p>
<ul>
<li><p><strong>Milvus 구성 파일(milvus.yaml</strong> ) - 가장 높은 우선 순위</p></li>
<li><p><strong>환경 변수</strong> - 가장 낮은 우선순위</p></li>
</ul>
<p><strong>Milvus 구성 파일(milvus.yaml)</strong></p>
<p>영구적인 클러스터 전체 설정의 경우, 자격 증명 json 데이터를 base64 형식으로 인코딩한 다음 milvus.yaml 파일에 정의할 수 있습니다.<code translate="no">cat credentials.json|jq .|base64</code>을 자격 증명 파일 경로에 <code translate="no">credentials.json</code> 로 바꿉니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp1:</span>
    <span class="hljs-attr">credential_json:</span>  <span class="hljs-comment"># base64 based gcp credential data</span>

<span class="hljs-comment"># Any configuration related to functions</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span>  <span class="hljs-string">gcp1</span> <span class="hljs-comment"># The name in the crendential configuration item</span>
        <span class="hljs-attr">url:</span>  <span class="hljs-comment"># Your VertexAI embedding url</span>

<button class="copy-code-btn"></button></code></pre>
<p><strong>환경 변수</strong></p>
<p>환경 변수는 대체 구성 방법을 제공하며, Docker Compose 또는 Kubernetes 배포에서 컨테이너 환경을 설정할 때 일반적으로 사용됩니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Example (typically set in docker-compose.yaml or Kubernetes manifest)</span>
<span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
    
<span class="hljs-comment">#Add the following under the standalone or proxy/dataNode sections in values.yaml:    </span>
<span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>    
    
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Vertex AI가 구성되면 다음 단계에 따라 임베딩 함수를 정의하고 사용하세요.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">1단계: 스키마 필드 정의</h3><p>임베딩 함수를 사용하려면 특정 스키마로 컬렉션을 생성합니다. 이 스키마에는 최소 3개의 필수 필드가 포함되어야 합니다:</p>
<ul>
<li><p>컬렉션의 각 엔티티를 고유하게 식별하는 기본 필드.</p></li>
<li><p>임베드할 원시 데이터를 저장하는 스칼라 필드.</p></li>
<li><p>함수가 스칼라 필드에 대해 생성할 벡터 임베딩을 저장하기 위해 예약된 벡터 필드.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">2단계: 스키마에 임베딩 함수 추가하기</h3><p>Milvus의 함수 모듈은 스칼라 필드에 저장된 원시 데이터를 임베딩으로 자동 변환하여 명시적으로 정의된 벡터 필드에 저장합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>파라미터</strong></p></th>
     <th><p><strong>설명</strong></p></th>
     <th><p><strong>필수?</strong></p></th>
     <th><p><strong>예제 값</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>임베딩 모델 공급자. "vertexai"로 설정합니다.</p></td>
     <td><p>예</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>사용할 버텍스 AI 임베딩 모델을 지정합니다.</p></td>
     <td><p>예</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>Google 클라우드 프로젝트 ID입니다.</p></td>
     <td><p>예</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>Vertex AI 서비스를 위한 리전입니다. 현재 Vertex AI 임베딩은 주로 us-central1을 지원합니다. 기본값은 us-central1입니다.</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>임베딩 결과에 영향을 미치는 임베딩 작업 유형을 지정합니다. 허용되는 값은 다음과 같습니다: DOC_RETRIEVAL(기본값), CODE_RETRIEVAL(005만 지원), STS(의미론적 텍스트 유사성).</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>출력 임베딩 벡터의 차원입니다. 1에서 768 사이의 정수를 사용할 수 있습니다. <strong>참고:</strong> 지정한 경우 스키마에서 벡터 필드의 크기가 이 값과 일치하는지 확인하세요.</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
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
    </button></h2><p>임베딩 함수를 구성한 후 <a href="/docs/ko/embeddings.md">함수 개요에서</a> 인덱스 구성, 데이터 삽입 예제 및 시맨틱 검색 작업에 대한 추가 지침을 참조하세요.</p>
