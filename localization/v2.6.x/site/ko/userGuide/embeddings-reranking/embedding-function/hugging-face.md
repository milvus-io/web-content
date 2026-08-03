---
id: hugging-face.md
title: Hugging FaceCompatible with Milvus v2.6.20+
summary: 이 주제에서는 Milvus에서 텍스트 임베딩을 위해 호스팅형 Hugging Face 추론 제공자를 사용하는 방법을 설명합니다.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face" class="common-anchor-header">Hugging Face<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face" class="anchor-icon" translate="no">
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
    </button></h1><p>일반적으로 Hugging Face 임베딩 모델을 사용하려면 애플리케이션에서 자격 증명을 관리하고, 모델을 별도로 호출하며, 삽입된 데이터와 검색 쿼리에 대해 일관되게 임베딩을 생성해야 합니다. 텍스트 임베딩 기능을 사용하면 Milvus가 호스팅된 <a href="https://huggingface.co/docs/inference-providers/index">Hugging Face 추론 제공자를</a> 호출하여 삽입 및 검색 시 원시 텍스트를 벡터로 변환합니다.</p>
<p>이 통합 기능은 호스팅된 Hugging Face 라우터를 사용합니다. Milvus를 별도로 배포된 텍스트 임베딩 추론(TEI) 서비스에 연결하려면 <a href="/docs/ko/v2.6.x/hugging-face-tei.md">Hugging Face TEI를</a> 참조하십시오.</p>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>함수 출력 필드는 ` <code translate="no">FLOAT_VECTOR</code> ` 데이터형을 사용해야 합니다. Milvus의 Hugging Face 임베딩은 ` <code translate="no">INT8_VECTOR</code>`, ` <code translate="no">BINARY_VECTOR</code>`, ` <code translate="no">FLOAT16_VECTOR</code>` 또는 ` <code translate="no">BFLOAT16_VECTOR</code> ` 출력 필드를 지원하지 않습니다.</li>
<li>'Function' 출력 필드의 차원은 선택한 모델의 출력 차원과 일치해야 합니다.</li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">작동 원리<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/hugging-face-embedding-flow.png" alt="Hugging Face text embedding workflow" class="doc-image" id="hugging-face-text-embedding-workflow" /> 
   <span>Hugging Face 텍스트 임베딩 워크플로우</span>
  
 </span></p>
<p>이 워크플로는 세 단계로 구성됩니다.</p>
<ol>
<li><strong>원본 텍스트 전송.</strong> 애플리케이션에서 삽입 또는 검색 요청을 통해 원본 텍스트를 제공합니다.</li>
<li><strong>임베딩 생성.</strong> 텍스트 임베딩 함수(Text Embedding Function)는 텍스트를 Hugging Face의 텍스트 임베딩 서비스( <code translate="no">hf-inference</code> )를 통해 Hugging Face의 텍스트 임베딩 파이프라인( <code translate="no">feature-extraction</code> )으로 전송합니다. 이 함수는 Hugging Face의 텍스트 임베딩 서비스( <code translate="no">model_name</code> )를 사용하여 모델을 선택하며, 정규화(normalization) 및 잘림(truncation)과 같은 지원되는 추론 옵션을 전달할 수 있습니다.</li>
<li><strong>임베딩을 사용합니다.</strong> Hugging Face는 입력 텍스트 하나당 하나의 부동 소수점 임베딩을 반환합니다. 삽입 시 Milvus는 이 벡터를 함수 출력 필드에 저장합니다. 검색 시 Milvus는 이 벡터를 쿼리 벡터로 사용합니다.</li>
</ol>
<p>동일한 함수 구성을 통해 삽입과 검색을 모두 처리하므로, 두 작업 전반에 걸쳐 모델과 추론 매개변수가 일관되게 유지됩니다.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>호스팅된 Hugging Face 텍스트 임베딩을 사용하기 전에 다음을 확인하십시오:</p>
<ul>
<li>2.6 릴리스 계열의 Milvus 2.6.20 이상.</li>
<li>PyMilvus 2.6.16 이상.</li>
<li>추론 제공자를 호출할 수 있는 Hugging Face 사용자 액세스 토큰.</li>
<li><code translate="no">hf-inference</code> 에서 현재 제공 중인, <a href="https://huggingface.co/docs/inference-providers/en/tasks/feature-extraction"><code translate="no">feature-extraction</code></a> 해당 태스크에 대해 xml-ph-0000@deepl.internal에서 현재 제공 중인 모델.</li>
</ul>
<div class="alert note">
<p>Milvus는 Hugging Face 모델이 <code translate="no">hf-inference</code> 을 통해 계속 사용 가능한지, 또는 해당 모델이 사용자의 안정성, 지연 시간 및 출력 품질 요구 사항을 충족하는지 여부를 제어하지 않습니다. 프로덕션 환경에서 사용하기 전에 Hugging Face에서 모델을 확인하고 사용자의 워크로드에 대해 평가하십시오.</p>
</div>
<p>이 예제에서는 <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a>를 사용하며, 이 모델은 384차원 임베딩을 생성합니다. 이 모델은 구성 방법을 시연하기 위한 목적으로만 사용되며, Milvus의 권장 사항이나 인증을 의미하지는 않습니다.</p>
<h2 id="Configure-credentials" class="common-anchor-header">인증 정보 구성<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 호스팅된 라우터를 호출하기 위해 Hugging Face 사용자 액세스 토큰이 필요합니다. 이 토큰은 <code translate="no">milvus.yaml</code> 에서 또는 환경 변수를 통해 구성할 수 있습니다.</p>
<p>인증 정보의 우선순위는 다음과 같습니다:</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">옵션 1: 구성 파일<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">milvus.yaml</code> 파일의 최상위 <code translate="no">credential</code> 섹션에 토큰을 정의한 다음, Hugging Face 임베딩 제공자를 해당 자격 증명 레이블로 지정합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">huggingface:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
        <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>또한 함수 매개변수에서 ` <code translate="no">credential</code> `을 설정할 수도 있습니다. 이 값은 토큰 자체가 아니라 ` <code translate="no">credential</code> ` 섹션의 최상위 수준에서 정의된 레이블이어야 합니다. 함수 수준의 자격 증명 레이블은 제공자 수준의 레이블보다 우선합니다.</p>
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
    </button></h3><p>Function이나 제공자 구성에서 자격 증명 레이블을 지정하지 않은 경우, Milvus는 <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> 에서 토큰을 읽습니다.</p>
<p>Docker Compose의 경우, Milvus 독립 실행형 서비스에서 다음 변수를 설정하십시오.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose 설정 적용에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/configure-docker.md">‘Docker Compose를 사용하여 Milvus 구성’을</a> 참조하십시오.</p>
<h2 id="Use-Hugging-Face-text-embedding" class="common-anchor-header">Hugging Face 텍스트 임베딩 사용<button data-href="#Use-Hugging-Face-text-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="common-anchor-header">1단계: 텍스트 임베딩 함수가 포함된 컬렉션 생성<button data-href="#Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 필드, <code translate="no">VARCHAR</code> 입력 필드 및 <code translate="no">FLOAT_VECTOR</code> 출력 필드가 포함된 스키마를 생성합니다. 출력 차원은 선택한 모델과 일치해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_embedding_demo&quot;</span>
schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;document&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">9000</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">384</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>` <code translate="no">document</code> `에서 ` <code translate="no">dense</code>`로 임베딩을 기록하는 ` <code translate="no">TEXTEMBEDDING</code> ` 함수를 정의합니다:</p>
<pre><code translate="no" class="language-python">text_embedding_function = Function(
    name=<span class="hljs-string">&quot;hugging_face_embedding&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    function_type=FunctionType.TEXTEMBEDDING,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;normalize&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    },</span>
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p>프로바이더 수준 자격 증명이나 환경 변수만 사용하는 경우, 함수 매개변수에서 ` <code translate="no">credential</code> `를 생략하십시오.</p>
<p>출력 필드에 대한 인덱스를 구성한 다음 컬렉션을 생성하십시오:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>다음 표는 Hugging Face 전용 함수 매개변수를 설명합니다:</p>
<table>
<thead>
<tr><th>매개변수</th><th>필수?</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">provider</code></td><td>예</td><td>임베딩 모델 제공자입니다. 이 값을 ` <code translate="no">huggingface</code>`로 설정하십시오.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>예</td><td><code translate="no">feature-extraction</code> 작업에 대해 <code translate="no">hf-inference</code> 을 통해 제공되는 모델의 Hugging Face 모델 ID입니다.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>아니요</td><td>Hugging Face 추론 제공자의 경로입니다. Milvus 2.6.20에서 기본값이자 유일하게 지원되는 값은 <code translate="no">hf-inference</code> 입니다.</td></tr>
<tr><td><code translate="no">credential</code></td><td>아니요</td><td><code translate="no">milvus.yaml</code> 의 최상위 <code translate="no">credential</code> 섹션에 정의된 자격 증명의 레이블입니다. 이 값은 토큰 자체가 아닙니다.</td></tr>
<tr><td><code translate="no">normalize</code></td><td>아니요</td><td>Hugging Face가 정규화된 임베딩을 반환해야 하는지 여부입니다. 지원되는 값은 <code translate="no">true</code> 및 <code translate="no">false</code> 입니다. 생략할 경우, Milvus는 요청에 이 옵션을 설정하지 않습니다.</td></tr>
<tr><td><code translate="no">prompt_name</code></td><td>아니요</td><td>선택한 모델의 Sentence Transformers 구성에서 정의된 프롬프트의 이름입니다.</td></tr>
<tr><td><code translate="no">truncate</code></td><td>아니요</td><td>Hugging Face가 모델이 지원하는 길이를 초과하는 입력을 잘라내야 하는지 여부입니다. 지원되는 값은 <code translate="no">true</code> 및 <code translate="no">false</code> 입니다.</td></tr>
<tr><td><code translate="no">truncation_direction</code></td><td>아니요</td><td>Hugging Face가 입력 데이터를 어느 방향에서 잘라낼지 지정합니다. 지원되는 값은 ` <code translate="no">left</code> ` 및 ` <code translate="no">right</code>`입니다.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>없음</td><td>Hugging Face 요청 한 번에 전송되는 입력 텍스트의 최대 개수입니다. 기본값은 <code translate="no">128</code> 이며, 이 값은 <code translate="no">0</code> 보다 커야 합니다.</td></tr>
</tbody>
</table>
<h3 id="Step-2-Insert-raw-text" class="common-anchor-header">2단계: 원본 텍스트 삽입<button data-href="#Step-2-Insert-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>벡터를 제공하지 않고 텍스트를 입력합니다. Milvus는 Hugging Face를 호출하고 생성된 임베딩을 <code translate="no">dense</code> 에 기록합니다.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Search-with-raw-text" class="common-anchor-header">3단계: 원본 텍스트로 검색<button data-href="#Step-3-Search-with-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>텍스트 쿼리로 검색합니다. Milvus는 벡터 검색을 실행하기 전에 동일한 함수 구성을 적용하여 쿼리 벡터를 생성합니다.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>결과에는 쿼리 텍스트와 가장 관련성이 높은 문서가 코사인 유사도 순으로 포함됩니다.</p>
<h2 id="Troubleshooting" class="common-anchor-header">문제 해결<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-feature-extraction" class="common-anchor-header">모델을 사용하여 특징 추출을 수행할 수 없음<button data-href="#The-model-is-unavailable-for-feature-extraction" class="anchor-icon" translate="no">
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
    </button></h3><p>Hugging Face에서 모델 페이지를 열고 <strong>‘Inference Providers’</strong> 섹션을 확인하십시오. <code translate="no">hf-inference</code> 가 <code translate="no">feature-extraction</code> 에 대한 모델을 제공하는지 확인하십시오. 그렇지 않은 경우, 다른 모델을 선택하고 필요한 경우 벡터 필드 차원을 업데이트하십시오.</p>
<h3 id="The-returned-vector-dimension-does-not-match-the-field" class="common-anchor-header">반환된 벡터 차원이 필드와 일치하지 않습니다<button data-href="#The-returned-vector-dimension-does-not-match-the-field" class="anchor-icon" translate="no">
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
    </button></h3><p>모델 출력 차원을 확인하고 ‘Function output’ 필드의 <code translate="no">dim</code> 와 비교하십시오. Milvus는 벡터 차원이 <code translate="no">FLOAT_VECTOR</code> 필드 차원과 다른 응답을 거부합니다.</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus에서 Hugging Face 자격 증명이 누락되었다고 보고합니다<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>최상위 ‘ <code translate="no">credential</code> ’ 섹션에 ‘Function’ 자격 증명 레이블이 존재하는지, 공급자 수준 레이블이 유효한지, 또는 Milvus 서비스 환경에 ‘ <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> ’가 존재하는지 확인하십시오.</p>
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
    </button></h2><ul>
<li>Function의 일반적인 개념 및 삽입/검색 동작에 대해서는 <a href="/docs/ko/v2.6.x/embedding-function-overview.md">‘임베딩 함수 개요’를</a> 참조하십시오.</li>
<li>호스팅된 Hugging Face 문장 유사도 점수를 사용하여 벡터 검색 후보를 재순위 지정하려면 <a href="/docs/ko/v2.6.x/hugging-face-ranker.md">Hugging Face Ranker를</a> 참조하십시오.</li>
</ul>
