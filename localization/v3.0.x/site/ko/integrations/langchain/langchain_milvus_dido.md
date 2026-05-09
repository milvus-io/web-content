---
id: langchain_milvus_dido.md
summary: >-
  이 가이드는 Milvus 2.6의 텍스트 임베딩 기능(데이터 인 데이터 아웃이라고도 함)을 LangChain과 함께 사용하는 방법을
  설명합니다. 이 기능을 사용하면 Milvus 서버가 원시 텍스트를 벡터 임베딩으로 자동 변환하여 클라이언트 측 코드를 간소화하고 API 키
  관리를 중앙 집중화할 수 있습니다.
title: 밀버스 텍스트 임베딩 기능과 LangChain 통합하기
---
<h1 id="Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="common-anchor-header">밀버스 텍스트 임베딩 기능과 LangChain 통합하기<button data-href="#Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>이 가이드는 Milvus 2.6의 <strong>텍스트 임베딩 기능</strong> (데이터 인 데이터 아웃이라고도 함)을 LangChain과 함께 사용하는 방법을 설명합니다. 이 기능을 사용하면 Milvus 서버가 원시 텍스트를 벡터 임베딩으로 자동 변환하여 클라이언트 측 코드를 간소화하고 API 키 관리를 중앙 집중화할 수 있습니다.</p>
<p><a href="https://milvus.io/">Milvus는</a> 세계에서 가장 진보된 오픈 소스 벡터 데이터베이스로, 유사도 검색 및 AI 애플리케이션 임베딩을 지원하기 위해 특별히 구축되었습니다. <a href="https://www.langchain.com/">LangChain은</a> 대규모 언어 모델(LLM)로 구동되는 애플리케이션을 개발하기 위한 프레임워크입니다. Milvus의 텍스트 임베딩 기능을 통합하면 LangChain 애플리케이션에서 보다 간단하고 효율적인 벡터 검색 솔루션을 구현할 수 있습니다.</p>
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
    </button></h2><p>이 튜토리얼을 실행하기 전에 다음 종속성을 설치했는지 확인하세요:</p>
<pre><code translate="no" class="language-shell">! pip install --upgrade langchain-milvus langchain-core langchain-openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우, 방금 설치한 종속성을 활성화하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택합니다).</p>
</div>
<h3 id="Configuring-the-Milvus-Server" class="common-anchor-header">Milvus 서버 구성하기<button data-href="#Configuring-the-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>중요</strong>: 텍스트 임베딩 기능(데이터 인 데이터 아웃)은 <strong>Milvus 서버에서만</strong> 사용할 수 있습니다. <strong>Milvus Lite는 이 기능을 지원하지 않습니다</strong>. 도커/쿠버네티스와 함께 배포된 Milvus 서버를 사용해야 합니다.</p>
<p>텍스트 임베딩 기능을 사용하기 전에 Milvus 서버에서 서비스 제공업체 임베딩을 위한 자격 증명을 구성해야 합니다.</p>
<p><strong>자격 증명 아래에 키를 선언합니다:</strong></p>
<p>하나 또는 여러 개의 API 키를 나열할 수 있으며, 각각에 나중에 참조할 레이블을 지정할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>

<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_OPENAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Milvus에 OpenAI 호출에 사용할 키를 알려주세요.</strong></p>
<p>동일한 파일에서 OpenAI 제공업체가 사용할 레이블을 가리키도록 합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom url</span>
<button class="copy-code-btn"></button></code></pre>
<p>자세한 구성 방법은 <a href="https://milvus.io/docs/embedding-function-overview.md">Milvus 임베딩 함수 문서를</a> 참조하세요.</p>
<h3 id="Starting-the-Milvus-Service" class="common-anchor-header">Milvus 서비스 시작하기<button data-href="#Starting-the-Milvus-Service" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 서버가 실행 중이고 임베딩 기능이 활성화되어 있는지 확인합니다. <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> 또는 <a href="https://milvus.io/docs/install_cluster-helm.md">Kubernetes를</a> 사용하여 Milvus 서버를 배포할 수 있습니다. 참고: <strong>Milvus Lite는 텍스트 임베딩 기능을 지원하지 않습니다</strong>.</p>
<h2 id="Understanding-Embedding-Client-side-vs-Server-side" class="common-anchor-header">임베딩 이해하기: 클라이언트 측과 서버 측<button data-href="#Understanding-Embedding-Client-side-vs-Server-side" class="anchor-icon" translate="no">
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
    </button></h2><p>사용법을 살펴보기 전에 먼저 두 가지 임베딩 접근 방식의 차이점을 이해해 보겠습니다.</p>
<h3 id="Embedding-using-LangChains-Embeddings-class-Client-side" class="common-anchor-header">LangChain의 <code translate="no">Embeddings</code> 클래스를 사용한 임베딩(클라이언트 측)<button data-href="#Embedding-using-LangChains-Embeddings-class-Client-side" class="anchor-icon" translate="no">
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
    </button></h3><p>전통적인 LangChain 접근 방식에서는 <a href="https://python.langchain.com/docs/api_reference/embeddings/langchain_core.embeddings.Embeddings"><code translate="no">Embeddings</code> 클래스를</a> 사용하여 클라이언트 측에서 임베딩 생성이 이루어집니다. 애플리케이션은 클래스의 <code translate="no">embed_query</code> 메서드를 사용하여 임베딩 API를 호출한 다음, 생성된 벡터를 Milvus에 저장해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Generate embedding on client side</span>
embeddings = OpenAIEmbeddings()
vector = embeddings.embed_query(<span class="hljs-string">&quot;Hello, world!&quot;</span>)
<span class="hljs-comment"># [0.123, -0.456, ...] A vector of floats</span>

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;traditional_approach_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>시퀀스 다이어그램:</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langchain_milvus_dito_langchain_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>특징:</strong></p>
<ul>
<li>클라이언트가 임베딩 API를 직접 호출</li>
<li>클라이언트 측에서 API 키를 관리해야 함</li>
<li>데이터 흐름: 텍스트 → 클라이언트 → 임베딩 API → 벡터 → 밀버스</li>
</ul>
<h3 id="Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="common-anchor-header">Milvus 텍스트 임베딩 기능 (서버 측 데이터 인 데이터 아웃)<button data-href="#Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="anchor-icon" translate="no">
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
    </button></h3><p>밀버스 2.6의 텍스트 임베딩 기능(데이터 인 데이터 아웃)은 밀버스 서버가 원시 텍스트를 벡터 임베딩으로 자동 변환할 수 있는 기능입니다. 클라이언트는 텍스트만 제공하면 Milvus가 임베딩 생성을 자동으로 처리합니다.</p>
<p><strong>시퀀스 다이어그램:</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langchain_milvus_dito_milvus_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>특징:</strong></p>
<ul>
<li>Milvus 서버가 임베딩 API 호출</li>
<li>API 키는 서버 측에서 중앙에서 관리합니다.</li>
<li>데이터 흐름: 텍스트 → Milvus → 임베딩 API → 벡터(Milvus에 저장)</li>
</ul>
<h3 id="Comparison-of-the-Two-Methods" class="common-anchor-header">두 가지 방법 비교<button data-href="#Comparison-of-the-Two-Methods" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>특징</th><th>LangChain 임베딩 (클라이언트 측)</th><th>밀버스 텍스트 임베딩 기능 (서버 측)</th></tr>
</thead>
<tbody>
<tr><td><strong>처리 위치</strong></td><td>클라이언트 애플리케이션</td><td>밀버스 서버</td></tr>
<tr><td><strong>API 호출</strong></td><td>클라이언트가 직접 임베딩 API 호출</td><td>밀버스 서버가 임베딩 API 호출</td></tr>
<tr><td><strong>API 키 관리</strong></td><td>클라이언트 측에서 관리 필요</td><td>서버 측에서 중앙 관리, 보안 강화</td></tr>
<tr><td><strong>코드 복잡성</strong></td><td>클라이언트 측에서 API 키와 호출을 관리해야 함</td><td>Milvus 설정에서 한 번만 구성하면 됩니다.</td></tr>
<tr><td><strong>사용 사례</strong></td><td>- 임베딩 프로세스에 대한 클라이언트 측 제어가 필요한 경우<br>- 클라이언트 측에서 임베딩 결과를 캐시해야 하는 경우<br>- 여러 임베딩 모델 전환을 지원해야 하는 경우</td><td>- 클라이언트 측 코드 간소화<br>- 서버 측에서 API 키를 중앙에서 관리해야 함<br>- 대량의 문서를 일괄 처리해야 하는 경우<br>- 외부 API와의 클라이언트 측 상호 작용을 줄이고자 하는 경우<br>- BM25와 같은 Milvus 기본 제공 기능과 결합해야 하는 경우</td></tr>
<tr><td><strong>Milvus 버전 요구 사항</strong></td><td>모든 버전(Milvus Lite 포함)</td><td>Milvus Lite는 지원되지 않음</td></tr>
</tbody>
</table>
<p><strong>이 튜토리얼에서는</strong> 클라이언트 측 코드를 대폭 간소화하고 보안을 강화할 수 있는 Milvus 2.6에 도입된 새로운 기능인 Milvus<strong>서버 측 텍스트 임베딩 함수(Data In Data Out) 방법을 주로 소개합니다</strong>.</p>
<h2 id="Using-Text-Embedding-Function" class="common-anchor-header">텍스트 임베딩 함수 사용<button data-href="#Using-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Server-side-Embedding-Only" class="common-anchor-header">예시 1: 서버 측 임베딩만 사용<button data-href="#Example-1-Server-side-Embedding-Only" class="anchor-icon" translate="no">
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
    </button></h3><p>가장 간단한 사용 사례로, 임베딩을 생성하기 위해 Milvus 서버에 전적으로 의존합니다. 클라이언트에는 임베딩 기능이 필요하지 않습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

<span class="hljs-comment"># Create Text Embedding Function</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># Input field name (field containing text)</span>
    output_field_names=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># Output field name (field storing vectors)</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension (must specify)</span>
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,  <span class="hljs-comment"># Service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,  <span class="hljs-comment"># Model name</span>
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;apikey_dev&quot;</span>,    <span class="hljs-comment"># Optional: use credential label configured in milvus.yaml</span>
    },
)

<span class="hljs-comment"># Create Milvus vector store</span>
<span class="hljs-comment"># Note: embedding_function=None, because embedding is done on server side</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,  <span class="hljs-comment"># Do not use client-side embedding</span>
    builtin_function=text_embedding_func,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">connection_args</code> 의 경우:</p>
<ul>
<li><strong>Milvus 서버를 사용해야</strong> 합니다: 텍스트 임베딩 기능 기능은 밀버스 서버에서만 사용할 수 있으며, 밀버스 라이트는 지원되지 않습니다.</li>
<li><code translate="no">http://localhost:19530</code> (로컬 Docker 배포) 또는 <code translate="no">http://your-server:19530</code> (원격 서버)와 같은 서버 URL을 사용하세요.</li>
<li><a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하는 경우, 퍼블릭 엔드포인트를 <code translate="no">uri</code> 로 사용하고 <code translate="no">token</code> 파라미터를 설정합니다.</li>
</ul>
<p>문서를 추가할 때는 벡터를 미리 계산할 필요 없이 텍스트만 입력하면 됩니다. 밀버스는 자동으로 OpenAI API를 호출하여 임베딩을 생성합니다.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add documents (only need to provide text, no need to pre-compute vectors)</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>),
    Document(
        page_content=<span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>
    ),
    Document(
        page_content=<span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>
    ),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313252, 462726375729313253, 462726375729313254]
</code></pre>
<p>검색 중에 직접 텍스트 쿼리를 사용하면 Milvus가 자동으로 쿼리 텍스트를 벡터로 변환하여 검색합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search (directly use text query)</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>, k=<span class="hljs-number">2</span>
)

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Content: <span class="hljs-subst">{doc.page_content}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Metadata: <span class="hljs-subst">{doc.metadata}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
I0000 00:00:1765186679.227345 12227536 fork_posix.cc:71] Other threads are currently calling into gRPC, skipping fork() handlers


Content: Milvus simplifies semantic search through embeddings.
Metadata: {'pk': 462726375729313252}

Content: Semantic search helps users find relevant information quickly.
Metadata: {'pk': 462726375729313254}
</code></pre>
<h3 id="Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="common-anchor-header">예 2: 텍스트 임베딩과 BM25의 결합(하이브리드 검색)<button data-href="#Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>시맨틱 검색(텍스트 임베딩)과 키워드 검색(BM25)을 결합하면 더욱 강력한 하이브리드 검색 기능을 사용할 수 있습니다. 시맨틱 검색은 쿼리 의도를 이해하는 데 탁월한 반면, 키워드 검색은 정확히 일치하는 데 탁월합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction, BM25BuiltInFunction

<span class="hljs-comment"># Text Embedding Function (semantic search)</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_dense&quot;</span>,
    dim=<span class="hljs-number">1536</span>,
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
    },
)

<span class="hljs-comment"># BM25 Function (keyword search)</span>
bm25_func = BM25BuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_sparse&quot;</span>,
)

<span class="hljs-comment"># Create Milvus vector store</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,
    builtin_function=[text_embedding_func, bm25_func],
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    vector_field=[<span class="hljs-string">&quot;vector_dense&quot;</span>, <span class="hljs-string">&quot;vector_sparse&quot;</span>],
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)

<span class="hljs-comment"># Add documents</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Machine learning and artificial intelligence&quot;</span>),
    Document(page_content=<span class="hljs-string">&quot;The cat sat on the mat&quot;</span>),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313255, 462726375729313256]
</code></pre>
<p><code translate="no">WeightedRanker</code> 에서 시맨틱 검색과 키워드 검색의 가중치를 제어할 수 있습니다. 가중치가 높으면 검색 결과가 시맨틱 유사성에 더 편중되고, 가중치가 낮으면 검색 결과가 키워드 일치에 더 편중됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Hybrid search, use WeightedRanker to control weights</span>
<span class="hljs-comment"># 70% semantic search, 30% keyword search</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;AI technology&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.3</span>]},
)

<span class="hljs-comment"># If you want to be more biased towards keyword matching, you can adjust weights</span>
<span class="hljs-comment"># 30% semantic search, 70% keyword search</span>
results_keyword_focused = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;cat mat&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">results
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence'),
 Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat')]
</code></pre>
<pre><code translate="no" class="language-python">results_keyword_focused
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat'),
 Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence')]
</code></pre>
<h2 id="Summary" class="common-anchor-header">요약<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>축하합니다! 여러분은 LangChain에서 Milvus의 텍스트 임베딩 기능(데이터 인 데이터 아웃) 기능을 사용하는 방법을 배웠습니다. 임베딩 생성을 서버 측으로 이전함으로써 클라이언트 측 코드를 간소화하고, API 키를 중앙에서 관리하며, 하이브리드 검색을 쉽게 구현할 수 있습니다. 텍스트 임베딩 기능 및 BM25와 결합된 Milvus는 강력한 벡터 검색 기능을 제공합니다.</p>
