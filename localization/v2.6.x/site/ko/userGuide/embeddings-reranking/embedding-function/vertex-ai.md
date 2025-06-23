---
id: vertex-ai.md
title: 버텍스 AICompatible with Milvus 2.6.x
summary: >-
  구글 클라우드 버텍스 AI는 텍스트 임베딩 모델을 위해 특별히 설계된 고성능 서비스입니다. 이 가이드에서는 효율적인 텍스트 임베딩 생성을
  위해 Milvus와 함께 구글 클라우드 버텍스 AI를 사용하는 방법을 설명합니다.
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
<li><p>gemini-embedding-001(영어, 다국어 및 코드 작업 전반에 걸친 최첨단 성능)</p></li>
<li><p>text-embedding-005(최신 텍스트 임베딩 모델)</p></li>
<li><p>text-multilingual-embedding-002(최신 다국어 텍스트 임베딩 모델)</p></li>
</ul>
<p>자세한 내용은 <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">버텍스 AI 텍스트 임베딩 모델을</a> 참조하세요.</p>
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
    </button></h2><p>Vertex AI를 구성하기 전에 다음 요구 사항을 충족하는지 확인하세요:</p>
<ul>
<li><p><strong>Milvus 버전 2.6 이상 실행</strong> - 배포가 최소 버전 요구 사항을 충족하는지 확인합니다.</p></li>
<li><p><strong>Google Cloud 서비스 계정 만들기</strong> - 최소한 'Vertex AI 사용자' 또는 기타 특정 역할이 필요할 수 있습니다. 자세한 내용은 <a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">서비스 계정 만들기를</a> 참조하세요.</p></li>
<li><p><strong>서비스 계정의 JSON 키 파일 다운로드</strong> - 이 자격 증명 파일을 서버 또는 로컬 컴퓨터에 안전하게 저장합니다. 자세한 내용은 <a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">서비스 계정 키 만들기를</a> 참조하세요.</p></li>
</ul>
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
    </button></h2><p>Milvus가 Vertex AI를 호출하려면 먼저 GCP 서비스 계정 JSON 키에 액세스해야 합니다. 두 가지 방법을 지원하므로 배포 및 운영 요구 사항에 따라 하나를 선택하세요.</p>
<table>
   <tr>
     <th><p>옵션</p></th>
     <th><p>우선순위</p></th>
     <th><p>최적 대상</p></th>
   </tr>
   <tr>
     <td><p>구성 파일 (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>높음</p></td>
     <td><p>클러스터 전체, 영구 설정</p></td>
   </tr>
   <tr>
     <td><p>환경 변수 (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>낮음</p></td>
     <td><p>컨테이너 워크플로우, 빠른 테스트</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">옵션 1: 구성 파일(권장 및 우선순위 높음)</h3><p>Milvus는 항상 동일한 공급자에 대한 환경 변수보다 <code translate="no">milvus.yaml</code> 에 선언된 자격 증명을 선호합니다.</p>
<ol>
<li><p>JSON 키 Base64 인코딩</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>다음에서 자격 증명을 선언합니다. <code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>자격 증명을 Vertex AI 제공자에 바인딩합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>나중에 키를 교체해야 하는 경우 환경이나 컨테이너를 변경할 필요 없이 <code translate="no">credential_json</code> 에서 Base64 문자열을 업데이트하고 Milvus를 다시 시작하면 됩니다.</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">옵션 2: 환경 변수</h3><p>배포 시점에 시크릿을 주입하는 것을 선호하는 경우 이 방법을 사용하세요. Milvus는 <code translate="no">milvus.yaml</code> 에 일치하는 항목이 없는 경우에만 env-vars로 되돌아갑니다.</p>
<div class="alert note">
<p>구성 단계는 Milvus 배포 모드(독립형 대 분산 클러스터) 및 오케스트레이션 플랫폼(Docker Compose 대 Kubernetes)에 따라 다릅니다.</p>
</div>
<div class="filter">
 <a href="#docker">도커 컴포즈</a> <a href="#helm">헬름</a></div>
<div class="filter-docker">
<div class="alert note">
<p>Milvus 구성 파일<strong>(docker-compose.yaml</strong>)을 얻으려면 <a href="/docs/ko/v2.6.x/configure-docker.md#Download-an-installation-file">설치 파일 다운로드를</a> 참조하세요.</p>
</div>
<ol>
<li><p><strong>컨테이너에 키 마운트</strong></p>
<p><code translate="no">docker-compose.yaml</code> 파일을 편집하여 자격 증명 볼륨 매핑을 포함합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>이전 구성에서</p>
<ul>
<li><p>안정적인 파일 액세스를 위해 절대 경로 사용(<code translate="no">/home/user/credentials.json</code> 아닌 <code translate="no">~/credentials.json</code>)</p></li>
<li><p>컨테이너 경로는 <code translate="no">.json</code> 확장자로 끝나야 합니다.</p></li>
<li><p><code translate="no">:ro</code> 플래그는 보안을 위해 읽기 전용 액세스를 보장합니다.</p></li>
</ul></li>
<li><p><strong>환경 변수 설정</strong></p>
<p>동일한 <code translate="no">docker-compose.yaml</code> 파일에서 자격증명 경로를 가리키는 환경 변수를 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>변경 사항 적용</strong></p>
<p>Milvus 컨테이너를 다시 시작하여 구성을 활성화합니다:</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>Milvus 구성 파일<strong>(values.yaml</strong>)을 얻으려면 <a href="/docs/ko/v2.6.x/configure-helm.md#Configure-Milvus-via-configuration-file">구성 파일을 통해 Milvus 구성을</a> 참조하세요.</p>
</div>
<ol>
<li><p><strong>쿠버네티스 시크릿 생성</strong></p>
<p>제어 머신( <strong>kubectl이</strong> 구성된 곳)에서 이 명령을 실행합니다:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>앞의 명령어에서</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>: 시크릿의 이름(사용자 정의 가능)</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>: GCP 자격 증명 파일의 로컬 파일 이름</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>: 밀버스를 호스팅하는 쿠버네티스 네임스페이스</p></li>
</ul></li>
<li><p><strong>헬름 값 구성</strong></p>
<p>배포 유형에 따라 <code translate="no">values.yaml</code> 을 업데이트한다:</p>
<ul>
<li><p><strong>독립형 배포의 경우</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>분산 배포의 경우(각 컴포넌트에 추가)</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
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

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><strong>헬름 구성 적용</strong></p>
<p>업데이트된 구성을 클러스터에 배포한다:</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
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
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">1단계: 스키마 필드 정의</h3><p>임베딩 함수를 사용하려면 특정 스키마로 컬렉션을 만듭니다. 이 스키마에는 최소 3개의 필수 필드가 포함되어야 합니다:</p>
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
    </button></h2><p>임베딩 함수를 구성한 후 <a href="/docs/ko/v2.6.x/embeddings.md">함수 개요에서</a> 인덱스 구성, 데이터 삽입 예제 및 시맨틱 검색 작업에 대한 추가 지침을 참조하세요.</p>
