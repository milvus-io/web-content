---
id: hugging-face-tei.md
title: 허깅 페이스 TEICompatible with Milvus 2.6.x
summary: >-
  Hugging Face 텍스트 임베딩 추론(TEI)은 텍스트 임베딩 모델을 위해 특별히 설계된 고성능 추론 서버입니다. 이 가이드에서는
  효율적인 텍스트 임베딩 생성을 위해 Milvus와 함께 Hugging Face TEI를 사용하는 방법을 설명합니다.
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">허깅 페이스 TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face <a href="https://huggingface.co/docs/text-embeddings-inference/en/index">텍스트 임베딩 추론(TEI)</a> 은 텍스트 임베딩 모델을 위해 특별히 설계된 고성능 추론 서버입니다. 이 가이드는 효율적인 텍스트 임베딩 생성을 위해 Milvus와 함께 Hugging Face TEI를 사용하는 방법을 설명합니다.</p>
<p>TEI는 다음과 같은 허깅 페이스 허브의 다양한 텍스트 임베딩 모델과 함께 작동합니다:</p>
<ul>
<li><p>BAAI/bge-* 시리즈</p></li>
<li><p>문장 트랜스포머/* 시리즈</p></li>
<li><p>E5 모델</p></li>
<li><p>GTE 모델</p></li>
<li><p>그리고 더 많은 모델</p></li>
</ul>
<div class="alert note">
<p>지원되는 최신 모델 목록은 <a href="https://github.com/huggingface/text-embeddings-inference">TEI GitHub 리포지토리</a> 및 <a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hub를</a> 참조하세요.</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">TEI 배포<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에 TEI 기능을 구성하기 전에 TEI 서비스가 실행 중이어야 합니다. Milvus는 TEI 배포를 위해 두 가지 접근 방식을 지원합니다:</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">표준 배포(외부)</h3><p>Hugging Face의 공식 방법을 사용하여 독립형 서비스로 TEI를 배포할 수 있습니다. 이 방식을 사용하면 TEI 서비스를 최대한 유연하게 제어할 수 있습니다.</p>
<p>Docker 또는 기타 방법을 사용하여 TEI를 배포하는 방법에 대한 자세한 지침은 <a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">Hugging Face 텍스트 임베딩 추론 공식 문서를</a> 참조하세요.</p>
<p>배포 후에는 <a href="/docs/ko/hugging-face-tei.md#Use-embedding-function-">Milvus에서 TEI 기능을 사용할</a> 때 필요하므로 TEI 서비스 엔드포인트(예: <code translate="no">http://localhost:8080</code>)를 기록해 두세요.</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Milvus 헬름 차트 배포(통합)</h3><p>쿠버네티스 환경의 경우, Milvus는 헬름 차트를 통해 통합 배포 옵션을 제공합니다. 이렇게 하면 Milvus와 함께 TEI를 배포하고 구성하여 프로세스를 간소화할 수 있습니다.</p>
<p>밀버스 헬름 배포에서 TEI를 활성화하려면 다음과 같이 하세요:</p>
<ol>
<li><p>TEI를 사용하도록 <strong>values.yaml을</strong> 구성한다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus 배포 또는 업그레이드:</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>헬름 차트 배포를 사용하는 경우, TEI 서비스는 쿠버네티스 클러스터 내에서 <code translate="no">http://my-release-milvus-tei:80</code> (릴리스 이름 사용)에서 액세스할 수 있습니다. 이것을 TEI 함수 구성의 엔드포인트로 사용하세요.</p>
<p></div></p></li>
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
    </button></h2><p>TEI 서비스를 배포한 후, TEI 임베딩 함수를 정의할 때 해당 엔드포인트를 제공해야 합니다. 대부분의 경우 Milvus에서 TEI는 기본적으로 활성화되어 있으므로 추가 구성이 필요하지 않습니다.</p>
<p>그러나 API 키 인증(<code translate="no">--api-key</code> 플래그)을 사용하여 TEI 서비스를 배포한 경우에는 이 키를 사용하도록 Milvus를 구성해야 합니다:</p>
<ol>
<li><p><strong> <code translate="no">credential</code> 섹션에서 API 키를 정의하세요:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>milvus.yaml에서 자격 증명을 참조합니다:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>TEI 서비스가 구성되면 다음 단계에 따라 임베딩 함수를 정의하고 사용하세요.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">1단계: 스키마 필드 정의</h3><p>임베딩 함수를 사용하려면 특정 스키마로 컬렉션을 만듭니다. 이 스키마에는 최소 3개의 필수 필드가 포함되어야 합니다:</p>
<ul>
<li><p>컬렉션의 각 엔티티를 고유하게 식별하는 기본 필드.</p></li>
<li><p>임베드할 원시 데이터를 저장하는 스칼라 필드.</p></li>
<li><p>함수가 스칼라 필드에 대해 생성할 벡터 임베딩을 저장하기 위해 예약된 벡터 필드.</p></li>
</ul>
<p>다음 예에서는 텍스트 데이터를 저장하는 스칼라 필드( <code translate="no">&quot;document&quot;</code> ) 1개와 함수 모듈에서 생성할 임베딩을 저장하는 벡터 필드( <code translate="no">&quot;dense_vector&quot;</code> ) 1개가 있는 스키마를 정의합니다. 선택한 임베딩 모델의 출력과 일치하도록 벡터 차원(<code translate="no">dim</code>)을 설정하는 것을 잊지 마세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">2단계: 스키마에 임베딩 함수 추가하기</h3><p>Milvus의 함수 모듈은 스칼라 필드에 저장된 원시 데이터를 임베딩으로 자동 변환하여 명시적으로 정의된 벡터 필드에 저장합니다.</p>
<p>아래 예는 스칼라 필드 <code translate="no">&quot;document&quot;</code> 를 임베딩으로 변환하여 결과 벡터를 앞서 정의한 <code translate="no">&quot;dense_vector&quot;</code> 벡터 필드에 저장하는 함수 모듈(<code translate="no">tei_func</code>)을 추가한 것입니다.</p>
<p>임베딩 함수를 정의한 후에는 컬렉션 스키마에 추가합니다. 이렇게 하면 Milvus가 지정된 임베딩 함수를 사용하여 텍스트 데이터의 임베딩을 처리하고 저장하도록 지시합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>파라미터</strong></p></th>
     <th><p><strong>필수?</strong></p></th>
     <th><p><strong>설명</strong></p></th>
     <th><p><strong>예제 값</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>예</p></td>
     <td><p>임베딩 모델 공급자입니다. "TEI"로 설정합니다.</p></td>
     <td><p>"TEI"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>예</p></td>
     <td><p>배포된 TEI 서비스를 가리키는 네트워크 주소. 밀버스 헬름 차트를 통해 배포된 경우 일반적으로 내부 서비스 주소입니다.</p></td>
     <td><p>"http://localhost:8080", "http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>No</p></td>
     <td><p>모델의 최대 길이를 초과하는 입력 텍스트를 잘라낼지 여부입니다. 기본값은 false입니다.</p></td>
     <td><p>"true"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>아니요</p></td>
     <td><p>잘라내기가 참이면 유효합니다. 왼쪽에서 잘라낼지 오른쪽에서 잘라낼지 지정합니다. 기본값은 오른쪽입니다.</p></td>
     <td><p>"left"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>아니요</p></td>
     <td><p>Milvus 클라이언트가 TEI로 전송하는 최대 배치 크기입니다. 기본값은 32입니다.</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>아니요</p></td>
     <td><p>(고급) 문장 변환기 구성 프롬프트 사전에서 키를 지정합니다. 특정 프롬프트 형식이 필요한 특정 모델에 사용됩니다. TEI 지원은 제한될 수 있으며 허브의 모델 구성에 따라 달라질 수 있습니다.</p></td>
     <td><p>"YOUR_PROMPT_KEY"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>아니요</p></td>
     <td><p>(고급) 데이터 삽입(수집) 단계에서 사용할 프롬프트를 지정합니다. 사용되는 TEI 모델에 따라 다르며, 모델은 프롬프트를 지원해야 합니다.</p></td>
     <td><p>"passage: "</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>아니요</p></td>
     <td><p>(고급) 검색 단계에서 사용할 프롬프트를 지정합니다. 사용되는 TEI 모델에 따라 다르며, 해당 모델은 프롬프트를 지원해야 합니다.</p></td>
     <td><p>"쿼리: "</p></td>
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
    </button></h2><p>임베딩 기능을 구성한 후 <a href="/docs/ko/embedding-function-overview.md">기능 개요에서</a> 인덱스 구성, 데이터 삽입 예제 및 시맨틱 검색 작업에 대한 추가 지침을 참조하세요.</p>
