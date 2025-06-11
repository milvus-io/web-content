---
id: embedding-function-overview.md
title: 임베딩 함수 개요Compatible with Milvus 2.6.x
summary: >-
  Milvus의 함수 모듈을 사용하면 외부 모델 제공업체(예: OpenAI, AWS Bedrock, Google Vertex AI 등)를
  자동으로 호출하여 원시 텍스트 데이터를 벡터 임베딩으로 변환할 수 있습니다. 함수 모듈을 사용하면 더 이상 임베딩 API와 수동으로
  인터페이스할 필요가 없습니다. Milvus는 제공자에게 요청을 보내고, 임베딩을 수신하고, 컬렉션에 저장하는 전체 프로세스를 처리합니다.
  시맨틱 검색의 경우, 쿼리 벡터가 아닌 원시 쿼리 데이터만 제공하면 됩니다. Milvus는 수집에 사용한 것과 동일한 모델로 쿼리 벡터를
  생성하고 저장된 벡터와 비교한 후 가장 연관성이 높은 결과를 반환합니다.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">임베딩 함수 개요<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 함수 모듈을 사용하면 외부 모델 제공업체(예: OpenAI, AWS Bedrock, Google Vertex AI 등)를 자동으로 호출하여 원시 텍스트 데이터를 벡터 임베딩으로 변환할 수 있습니다. 함수 모듈을 사용하면 더 이상 임베딩 API와 수동으로 인터페이스할 필요가 없습니다. Milvus는 제공자에게 요청을 보내고, 임베딩을 수신하고, 컬렉션에 저장하는 전체 프로세스를 처리합니다. 시맨틱 검색의 경우, 쿼리 벡터가 아닌 원시 쿼리 데이터만 제공하면 됩니다. Milvus는 수집에 사용한 것과 동일한 모델로 쿼리 벡터를 생성하고 저장된 벡터와 비교하여 가장 연관성이 높은 결과를 반환합니다.</p>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>함수 모듈이 임베드하는 모든 입력 필드에는 항상 값이 포함되어야 하며, null이 제공되면 모듈에서 오류를 발생시킵니다.</p></li>
<li><p>함수 모듈은 컬렉션 스키마에 명시적으로 정의된 필드만 처리하며, 동적 필드에 대한 임베딩은 생성하지 않습니다.</p></li>
<li><p>임베드할 입력 필드는 <code translate="no">VARCHAR</code> 유형이어야 합니다.</p></li>
<li><p>함수 모듈은 입력 필드를 다음에 임베드할 수 있습니다:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p><code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, 또는 <code translate="no">BFLOAT16_VECTOR</code> 로의 변환은 지원되지 않습니다.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>함수 모듈은 원하는 외부 모델 공급자를 호출하여 원시 텍스트를 벡터 임베딩으로 변환합니다. 제공업체마다 지원하는 모델, 임베딩 형식 및 인증 방법은 다르며, 아래에 요약되어 있습니다.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">지원되는 모델 공급자</h3><table>
   <tr>
     <th><p>공급자</p></th>
     <th><p>일반적인 모델</p></th>
     <th><p>임베딩 유형</p></th>
     <th><p>인증 방법</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/openai.md">OpenAI</a></p></td>
     <td><p>텍스트 임베딩-3-*</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 키</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>배포 기반</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 키</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/dashscope.md">DashScope</a></p></td>
     <td><p>텍스트 임베딩-v3</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 키</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>AK/SK 쌍</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/vertex-ai.md">버텍스 AI</a></p></td>
     <td><p>text-embedding-005</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>GCP 서비스 계정 JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>밀도 (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API 키</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>밀도 (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API 키</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 키</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/hugging-face-tei.md">허깅 페이스</a></p></td>
     <td><p>모든 TEI 지원 모델</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>선택적 API 키</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">워크플로우</h3><p>다음 다이어그램은 Milvus에서 함수가 작동하는 방식을 보여줍니다.</p>
<ol>
<li><p><strong>텍스트 입력</strong>: 사용자가 Milvus에 원시 데이터(예: 문서)를 삽입합니다.</p></li>
<li><p><strong>임베딩을 생성합니다</strong>: Milvus의 함수 모듈은 구성된 모델 공급자를 자동으로 호출하여 원시 데이터를 벡터 임베딩으로 변환합니다.</p></li>
<li><p><strong>임베딩 저장</strong>: 결과 임베딩은 Milvus 컬렉션 내에 명시적으로 정의된 벡터 필드에 저장됩니다.</p></li>
<li><p><strong>쿼리 텍스트</strong>: 사용자가 Milvus에 텍스트 쿼리를 제출합니다.</p></li>
<li><p><strong>시맨틱 검색</strong>: Milvus는 내부적으로 쿼리를 벡터 임베딩으로 변환하고 저장된 임베딩에 대해 유사성 검색을 수행한 후 관련 결과를 검색합니다.</p></li>
<li><p><strong>결과 반환</strong>: Milvus는 가장 일치하는 결과를 애플리케이션에 반환합니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>임베딩 기능 개요</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">자격 증명 관리</h3><p>외부 임베딩 API에 연결하려면 인증 자격증명(API 키 또는 액세스/비밀 키 쌍)이 필요합니다. 애플리케이션 코드에 이러한 자격 증명을 노출하면 보안 위험이 발생합니다. Milvus는 Milvus 구성 파일(<code translate="no">milvus.yaml</code>)에 자격 증명을 안전하게 저장하여 이 문제를 해결합니다.</p>
<ol>
<li><p><strong>자격 증명을 추가합니다</strong>: 최상위 수준 <code translate="no">credential:</code> 블록 아래에서 각 자격 증명에 고유한 레이블을 지정한 다음 <code translate="no">function:</code> 블록에서 해당 레이블을 가리킵니다.</p></li>
<li><p><strong>서버가 구성을 로드합니다</strong>: Milvus는 YAML 파일을 읽고, 원시 키를 메모리에 캐시하고, 해당 레이블만 기억합니다(예: <code translate="no">apikey1</code>).</p></li>
<li><p><strong>함수 호출</strong>: 선택적으로 <code translate="no">credential</code> 인수를 지정합니다.</p>
<ul>
<li><p>함수 정의와 함께 자격 증명 이름을 제공하면 Milvus는 지정된 자격 증명을 사용합니다.</p></li>
<li><p>인수를 생략하면 Milvus는 자동으로 <code translate="no">milvus.yaml</code> 에서 해당 모델 공급자에 대해 구성된 자격 증명으로 돌아갑니다.</p>
<p>어느 쪽이든 비밀 키는 서버를 떠나지 않습니다.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>자격 증명 구성 오버플로</span> </span></p>
<div class="alert note">
<p>Docker Compose와 함께 Milvus를 배포하는 경우 환경 변수를 통해 동일한 필드를 주입할 수도 있습니다. 정확한 변수 이름은 공급자별 가이드를 참조하세요.</p>
</div>
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
    </button></h2><p>Milvus에서 임베딩 함수를 사용하기 전에 액세스 자격 증명을 구성하세요.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">1단계: Milvus 구성에 자격 증명 추가하기</h3><p><code translate="no">milvus.yaml</code> 파일에서 액세스해야 하는 각 제공업체에 대한 항목으로 <code translate="no">credential</code> 블록을 편집합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>공급자 유형</p></th>
     <th><p>필수 필드</p></th>
     <th><p>구성 예시</p></th>
   </tr>
   <tr>
     <td><p>AK/SK 쌍(AWS 베드락)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>API 키 기반(OpenAI, Voyage AI 등)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>GCP 서비스 계정 JSON(Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">2단계: 공급자 설정 구성</h3><p>동일한 구성 파일에서 <code translate="no">function</code> 블록을 편집하여 서비스 호출 임베딩에 사용할 키를 Milvus에 알려줍니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 구성을 적용하는 방법에 대한 자세한 내용은 <a href="/docs/ko/dynamic_config.md">Milvus 즉시 구성을</a> 참조하세요.</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">2단계: 스키마에 임베딩 함수 추가하기</h3><p>Milvus의 함수 모듈은 스칼라 필드에 저장된 원시 데이터를 임베딩으로 자동 변환하여 명시적으로 정의된 벡터 필드에 저장합니다.</p>
<p>아래 예는 스칼라 필드 <code translate="no">&quot;document&quot;</code> 를 임베딩으로 변환하여 결과 벡터를 앞서 정의한 <code translate="no">&quot;dense&quot;</code> 벡터 필드에 저장하는 함수 모듈(<code translate="no">openai_embedding</code>)을 추가하는 예제입니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>예제 값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Milvus 내 임베딩 함수에 대한 고유 식별자입니다.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>사용된 임베딩 함수의 유형입니다. 사용 가능한 값:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: 텍스트 내의 의미적 의미를 포착하는 고밀도 벡터를 생성합니다.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: 용어 빈도 및 역 문서 빈도를 사용하여 관련성 점수를 계산하는 BM25 순위 알고리즘을 기반으로 희소 벡터를 생성합니다. 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>임베드할 원시 데이터가 포함된 스칼라 필드입니다. 현재 이 매개변수는 하나의 필드 이름만 허용합니다.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>생성된 임베딩을 저장하기 위한 벡터 필드입니다. 현재 이 매개변수는 하나의 필드 이름만 허용합니다.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>임베딩 구성이 포함된 사전. 참고: <code translate="no">params</code> 내의 매개변수는 임베딩 모델 제공업체에 따라 다릅니다.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>임베딩 모델 공급자.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>사용할 임베딩 모델을 지정합니다.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p><code translate="no">milvus.yaml</code> 의 최상위 수준 <code translate="no">credential:</code> 섹션에 정의된 자격 증명의 레이블입니다. </p>
<ul>
<li><p>제공되면 Milvus는 일치하는 키 쌍 또는 API 토큰을 검색하여 서버 측에서 요청에 서명합니다.</p></li>
<li><p>생략된 경우(<code translate="no">None</code>) Milvus는 <code translate="no">milvus.yaml</code> 에서 대상 모델 공급자에 대해 명시적으로 구성된 자격 증명으로 되돌아갑니다.</p></li>
<li><p>레이블을 알 수 없거나 참조된 키가 누락된 경우 호출이 실패합니다.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>출력 임베딩의 차원 수입니다. OpenAI의 3세대 모델의 경우 의미론적 정보의 큰 손실 없이 전체 벡터를 단축하여 비용과 대기 시간을 줄일 수 있습니다. 자세한 내용은 <a href="https://openai.com/blog/new-embedding-models-and-api-updates">OpenAI 발표 블로그 게시물을</a> 참조하세요. <strong>참고:</strong> 벡터 차원을 단축하는 경우, 벡터 필드에 대한 스키마의 <code translate="no">add_field</code> 메서드에 지정된 <code translate="no">dim</code> 값이 임베딩 함수의 최종 출력 차원과 일치하는지 확인하세요.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>API 사용량 추적을 위한 사용자 수준 식별자입니다.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>텍스트를 벡터로 변환해야 하는 여러 스칼라 필드가 있는 컬렉션의 경우 컬렉션 스키마에 별도의 함수를 추가하여 각 함수가 고유한 이름과 <code translate="no">output_field_names</code> 값을 갖도록 하세요.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">3단계: 인덱스 구성</h3><p>필요한 필드와 기본 제공 함수로 스키마를 정의한 후에는 컬렉션의 인덱스를 설정합니다. 이 과정을 간소화하기 위해 <code translate="no">AUTOINDEX</code> 을 <code translate="no">index_type</code> 으로 사용하면 Milvus가 데이터 구조에 따라 가장 적합한 인덱스 유형을 선택하고 구성할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">4단계: 컬렉션 만들기</h3><p>이제 정의한 스키마 및 인덱스 매개변수를 사용하여 컬렉션을 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">5단계: 데이터 삽입</h3><p>컬렉션과 인덱스를 설정했으면 이제 원시 데이터를 삽입할 준비가 되었습니다. 이 과정에서는 원시 텍스트만 제공하면 됩니다. 앞서 정의한 함수 모듈이 각 텍스트 항목에 해당하는 스파스 벡터를 자동으로 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">6단계: 벡터 검색 수행</h3><p>데이터를 입력한 후 원시 쿼리 텍스트를 사용하여 시맨틱 검색을 수행합니다. Milvus는 자동으로 쿼리를 임베딩 벡터로 변환하고 유사도에 따라 관련 문서를 검색한 후 가장 일치하는 결과를 반환합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>검색 및 쿼리 작업에 대한 자세한 내용은 <a href="/docs/ko/single-vector-search.md">기본 벡터 검색</a> 및 <a href="/docs/ko/get-and-scalar-query.md">쿼리를</a> 참조하세요.</p>
