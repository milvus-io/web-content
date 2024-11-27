---
id: llama_agents_metadata.md
summary: >-
  이 노트북에서는 다양한 아이디어를 살펴봅니다: Milvus에 데이터 저장하기, 데이터 쿼리를 위해 Mistral 모델과 함께 라마 인덱스
  사용하기, 자동화된 데이터 검색 및 읽기 에이전트 만들기, 사용자 쿼리를 기반으로 메타데이터 필터링을 위한 에이전트 개발하기 등입니다.
title: '미스트랄 AI, 밀버스, 라마 에이전트가 포함된 멀티 에이전트 시스템'
---
<h1 id="Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="common-anchor-header">미스트랄 AI, 밀버스, 라마 에이전트가 포함된 멀티 에이전트 시스템<button data-href="#Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Goal-of-this-Notebook" class="common-anchor-header">이 노트북의 목표<button data-href="#Goal-of-this-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>이 노트북에서는 다양한 아이디어를 살펴봅니다:</p>
<ul>
<li><p>1️⃣ Milvus에 데이터 저장: 고속 유사도 검색 및 AI 애플리케이션을 위해 설계된 효율적인 벡터 데이터베이스인 Milvus에 데이터를 저장하는 방법을 알아보세요.</p></li>
<li><p>2️⃣ 데이터 쿼리를 위해 미스트랄 모델과 함께 라마 인덱스 사용: 라마 인덱스를 미스트랄 모델과 함께 사용해 Milvus에 저장된 데이터를 쿼리하는 방법을 알아보세요.</p></li>
<li><p>3️⃣ 자동화된 데이터 검색 및 읽기 에이전트 만들기: 사용자 쿼리를 기반으로 데이터를 자동으로 검색하고 읽을 수 있는 에이전트를 구축하세요. 이러한 자동화된 에이전트는 빠르고 정확한 응답을 제공하여 수동 검색 작업을 줄여 사용자 경험을 향상시킵니다.</p></li>
<li><p>4️⃣ 사용자 쿼리에 기반한 메타데이터 필터링 에이전트 개발: 사용자 쿼리에서 메타데이터 필터를 자동으로 생성하여 검색 결과를 구체화하고 문맥화하여 복잡한 쿼리에 대해서도 혼동을 방지하고 검색된 정보의 정확성을 높일 수 있는 에이전트를 구현하세요.</p></li>
<li><p>🔍 요약 이 노트북을 다 읽고 나면, 강력하고 효율적인 데이터 검색 시스템을 구축하기 위해 Milvus, llama-index와 llama-agent, Mistral 모델을 사용하는 방법을 포괄적으로 이해할 수 있습니다.</p></li>
</ul>
<h2 id="Milvus" class="common-anchor-header">Milvus<button data-href="#Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 벡터 임베딩과 유사도 검색으로 AI 애플리케이션을 지원하는 오픈 소스 벡터 데이터베이스입니다.</p>
<p>이 노트북에서는 Milvus의 경량 버전인 Milvus Lite를 사용합니다.</p>
<p>Milvus Lite를 사용하면 몇 분 안에 벡터 유사도 검색 기능을 갖춘 AI 애플리케이션을 구축할 수 있습니다! Milvus Lite는 다음 환경에서 실행하기에 좋습니다:</p>
<ul>
<li>주피터 노트북 / 구글 콜랩</li>
<li>노트북</li>
<li>엣지 디바이스</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ad459431-95ac-4cbd-a931-453d08d5fdef.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>image.png</span> </span></p>
<h2 id="llama-agents" class="common-anchor-header">llama-agents<button data-href="#llama-agents" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">llama-agents</code> 를 사용하면 에이전트를 마이크로서비스로 실행할 수 있습니다. 이를 통해 서비스를 확장 및 축소할 수 있습니다.</p>
<h2 id="llama-index" class="common-anchor-header">llama-index<button data-href="#llama-index" class="anchor-icon" translate="no">
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
    </button></h2><p>LlamaIndex는 LLM 애플리케이션을 위한 데이터 프레임워크입니다. 다음과 같은 도구를 제공합니다:</p>
<ul>
<li>데이터 커넥터는 기본 소스 및 형식에서 기존 데이터를 수집합니다.</li>
<li>데이터 인덱스는 LLM이 사용하기 쉽고 성능이 우수한 중간 표현으로 데이터를 구조화합니다.</li>
<li>엔진은 데이터에 대한 자연어 액세스를 제공합니다.</li>
<li>에이전트는 간단한 헬퍼 기능부터 API 통합 등 다양한 도구로 강화된 LLM 기반 지식 근로자입니다.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/7bd73318-7929-4675-8998-c2e9ef091906.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>image.png</span> </span></p>
<h2 id="Mistral-AI" class="common-anchor-header">미스트랄 AI<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral AI는 LLM 및 임베딩 모델을 구축하는 연구소로, 최근 RAG 및 함수 호출에 특히 뛰어난 것으로 나타난 새로운 버전의 모델인 Mistral Nemo와 Mistral Large를 출시했습니다. 따라서 이 노트북에서는 이 두 모델을 사용하겠습니다.</p>
<h2 id="Install-Dependencies" class="common-anchor-header">설치 종속성<button data-href="#Install-Dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ pip install llama-agents pymilvus openai python-dotenv
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ pip install llama-index-vector-stores-milvus llama-index-readers-file llama-index-llms-ollama llama-index-llms-mistralai llama-index-embeddings-mistralai
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> This is ONLY necessary in jupyter notebook.</span>
<span class="hljs-comment"># Details: Jupyter runs an event-loop behind the scenes.</span>
<span class="hljs-comment">#          This results in nested event-loops when we start an event-loop to make async queries.</span>
<span class="hljs-comment">#          This is normally not allowed, we use nest_asyncio to allow it for convenience.</span>
<span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-your-API-Key-for-Mistral" class="common-anchor-header">Mistral용 API 키 받기<button data-href="#Get-your-API-Key-for-Mistral" class="anchor-icon" translate="no">
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
    </button></h2><p>미스트랄 <a href="https://console.mistral.ai/api-keys/">클라우드 콘솔에서</a> 미스트랄 API 키를 받을 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;&quot;&quot;
load_dotenv reads key-value pairs from a .env file and can set them as environment variables.
This is useful to avoid leaking your API key for example :D
&quot;&quot;&quot;</span>

<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">import</span> os

load_dotenv()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">True
</code></pre>
<h2 id="Download-data" class="common-anchor-header">데이터 다운로드<button data-href="#Download-data" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/10k/&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/uber_2021.pdf&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/lyft_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/lyft_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h1 id="Prepare-Embedding-Model" class="common-anchor-header">임베딩 모델 준비<button data-href="#Prepare-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h1><p>이 노트북에서 사용할 임베딩 모델을 정의합니다. 저희는 <code translate="no">mistral-embed</code> 을 사용하며, 이는 Mistral에서 개발한 임베딩 모델로, 검색을 염두에 두고 학습되었기 때문에 에이전틱 RAG 시스템에 매우 적합한 모델입니다. 자세한 내용은 미스트랄 문서의 <a href="https://docs.mistral.ai/capabilities/embeddings/">임베딩</a> 페이지를 참조하세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.embeddings.mistralai <span class="hljs-keyword">import</span> MistralAIEmbedding

<span class="hljs-comment"># Define the default Embedding model used in this Notebook.</span>
<span class="hljs-comment"># We are using Mistral Models, so we are also using Mistral Embeddings</span>

Settings.embed_model = MistralAIEmbedding(model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-LLM-Model" class="common-anchor-header">LLM 모델 정의<button data-href="#Define-the-LLM-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>라마 인덱스는 LLM을 사용하여 프롬프트와 쿼리에 응답하고 자연어 응답을 작성합니다. 저희는 Mistral Nemo를 기본으로 정의합니다. Nemo는 최대 128,000개의 토큰으로 구성된 대규모 컨텍스트 창을 제공합니다. 추론, 세계 지식 및 코딩 정확도는 크기 범주에서 최고 수준입니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">llms</span>.<span class="hljs-property">ollama</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">Ollama</span>

<span class="hljs-title class_">Settings</span>.<span class="hljs-property">llm</span> = <span class="hljs-title class_">Ollama</span>(<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Instanciate-Milvus-and-Load-Data" class="common-anchor-header">Milvus 인스턴스화 및 데이터 로드<button data-href="#Instanciate-Milvus-and-Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/">Milvus는</a> 성능이 뛰어나고 확장 가능한 벡터 유사도 검색으로 AI 애플리케이션을 지원하는 인기 있는 오픈 소스 벡터 데이터베이스입니다.</p>
<ul>
<li>URL을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법으로, <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하여 모든 데이터를 이 파일에 저장하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대량의 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에</a> 더 성능이 뛰어난 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 사용하세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 uri와 토큰을 조정하세요.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    load_index_from_storage,
)
<span class="hljs-keyword">from</span> llama_index.core.tools <span class="hljs-keyword">import</span> QueryEngineTool, ToolMetadata

input_files = [<span class="hljs-string">&quot;./data/10k/lyft_2021.pdf&quot;</span>, <span class="hljs-string">&quot;./data/10k/uber_2021.pdf&quot;</span>]

<span class="hljs-comment"># Create a single Milvus vector store</span>
vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1024</span>, overwrite=<span class="hljs-literal">False</span>, collection_name=<span class="hljs-string">&quot;companies_docs&quot;</span>
)

<span class="hljs-comment"># Create a storage context with the Milvus vector store</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)

<span class="hljs-comment"># Load data</span>
docs = SimpleDirectoryReader(input_files=input_files).load_data()

<span class="hljs-comment"># Build index</span>
index = VectorStoreIndex.from_documents(docs, storage_context=storage_context)

<span class="hljs-comment"># Define the query engine</span>
company_engine = index.as_query_engine(similarity_top_k=<span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-Tools" class="common-anchor-header">도구 정의<button data-href="#Define-Tools" class="anchor-icon" translate="no">
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
    </button></h2><p>효과적인 에이전트를 구축하기 위한 핵심 단계 중 하나는 에이전트가 작업을 수행하는 데 사용할 수 있는 도구를 정의하는 것입니다. 이러한 도구는 기본적으로 에이전트가 정보를 검색하거나 작업을 수행하기 위해 호출할 수 있는 기능 또는 서비스입니다.</p>
<p>아래에서는 2021년부터 상담원이 Lyft 및 Uber의 재무 정보를 조회하는 데 사용할 수 있는 두 가지 도구를 정의하겠습니다. 이러한 도구는 상담원에게 통합되어 자연어 쿼리에 정확하고 관련성 있는 정보로 응답할 수 있게 될 것입니다.</p>
<p>상단에 있는 그래프를 보면 '에이전트 서비스'가 무엇인지 알 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the different tools that can be used by our Agent.</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;lyft_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Lyft financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;uber_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Uber financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># Set up the agent</span>
llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)

response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;Could you please provide a comparison between Lyft and Uber&#x27;s total revenues in 2021?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Example usage without metadata filtering</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response without metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Response without metadata filtering:
The revenue for Lyft in 2021 was $3.84 billion.

Uber's total revenue for the year ended December 31, 2021 was $17,455 million.
</code></pre>
<h2 id="Metadata-Filtering" class="common-anchor-header">메타데이터 필터링<button data-href="#Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus는</strong> 데이터와 관련된 특정 속성이나 태그를 기반으로 검색 결과를 구체화하고 범위를 좁힐 수 있는 기술인 <a href="https://zilliz.com/blog/json-metadata-filtering-in-milvus">메타데이터 필터링을</a> 지원합니다. 이는 데이터가 많고 특정 기준과 일치하는 관련 데이터 하위 집합만 검색해야 하는 시나리오에서 특히 유용합니다.</p>
<h2 id="Use-Cases-for-Metadata-Filtering" class="common-anchor-header">메타데이터 필터링 사용 사례<button data-href="#Use-Cases-for-Metadata-Filtering" class="anchor-icon" translate="no">
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
<li><p><strong>검색 결과의 정확성</strong>: 메타데이터 필터를 적용하면 검색 결과가 사용자의 쿼리와 관련성이 높은지 확인할 수 있습니다. 예를 들어, 재무 문서 모음이 있는 경우 회사명, 연도 또는 기타 관련 메타데이터를 기준으로 필터링할 수 있습니다.</p></li>
<li><p><strong>효율성</strong>: 메타데이터 필터링은 처리해야 하는 데이터의 양을 줄여 검색 작업을 보다 효율적으로 만드는 데 도움이 됩니다. 이는 대규모 데이터 세트를 다룰 때 특히 유용합니다.</p></li>
<li><p><strong>사용자 정의</strong>: 사용자나 애플리케이션마다 요구 사항이 다를 수 있습니다. 메타데이터 필터링을 사용하면 특정 연도나 회사의 문서를 검색하는 등 특정 요구사항을 충족하도록 검색 결과를 사용자 지정할 수 있습니다.</p></li>
</ul>
<h2 id="Example-usage" class="common-anchor-header">사용 예<button data-href="#Example-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 코드 블록에서 메타데이터 필터링은 특정 메타데이터 키-값 쌍을 기반으로 문서를 검색하는 필터링된 쿼리 엔진을 만드는 데 사용됩니다: <code translate="no">file_name</code>: <code translate="no">lyft_2021.pdf</code></p>
<p>아래에 정의된 <code translate="no">QueryEngineTool</code> 은 위에 정의된 것보다 더 일반적입니다. 위의 경우 회사별(Uber 및 Lyft) 도구가 있었지만 여기서는 더 일반적입니다. 메타데이터 필터링을 추가하면 특정 문서에서 데이터를 가져오는 것만 필터링할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Example usage with metadata filtering</span>
filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;lyft_2021.pdf&quot;</span>)]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;filters: <span class="hljs-subst">{filters}</span>&quot;</span>)
filtered_query_engine = index.as_query_engine(filters=filters)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Use this tool to retrieve specific data points about a company. &quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">filters: filters=[MetadataFilter(key='file_name', value='lyft_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<h2 id="Function-Calling" class="common-anchor-header">함수 호출<button data-href="#Function-Calling" class="anchor-icon" translate="no">
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
    </button></h2><p>미스트랄 네모와 라지는 네이티브 함수 호출을 지원합니다. llm의 <code translate="no">predict_and_call</code> 함수를 통해 라마 인덱스 도구와 원활하게 통합할 수 있습니다. 이를 통해 사용자는 어떤 도구든 첨부하고 어떤 도구를 호출할지(있는 경우) LLM이 결정하도록 할 수 있습니다.</p>
<p><a href="https://docs.llamaindex.ai/en/latest/module_guides/deploying/agents/">에이전트에</a> 대한 자세한 내용은 llama-index 웹사이트에서 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up the LLM we will use for Function Calling</span>

llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Interact-with-the-Agent" class="common-anchor-header">에이전트와 상호 작용하기<button data-href="#Interact-with-the-Agent" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 메타데이터 필터링을 실제로 사용해 보겠습니다:</p>
<ol>
<li>첫 번째 예에서는 Uber에 대한 쿼리이므로 에이전트가 사용자의 쿼리에 대해 아무것도 찾을 수 없어야 하며, 문서에서는 Lyft에 대한 문서만 필터링합니다.</li>
<li>두 번째 예에서는 Lyft에 관한 문서만 검색하므로 상담원이 Lyft에 대한 정보를 찾을 수 있어야 합니다.</li>
</ol>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;How many employees does Uber have?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I'm unable to provide information about Uber's employee count as it's outside the given Lyft context.
</code></pre>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;What are the risk factors for Lyft?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Investing in Lyft carries significant risks. These include general economic factors like impacts from pandemics or crises, operational factors such as competition, pricing changes, and driver/ride growth unpredictability, insurance coverage issues, autonomous vehicle technology uncertainties, reputational concerns, potential security breaches, reliance on third-party services, and challenges in expanding platform offerings. Lyft's business operations are subject to numerous other risks not explicitly mentioned here, which could also harm its financial condition and prospects.
</code></pre>
<h2 id="Example-of-Confusion-Without-Metadata-Filtering" class="common-anchor-header">메타데이터 필터링이 없는 혼동 예시<button data-href="#Example-of-Confusion-Without-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">&gt; Question: What are the risk factors <span class="hljs-keyword">for</span> Uber?

&gt; Response without metadata filtering:
Based on the provided context, <span class="hljs-built_in">which</span> pertains to Lyft<span class="hljs-string">&#x27;s Risk Factors section in their Annual Report, some of the potential risk factors applicable to a company like Uber might include:

- General economic factors such as the impact of global pandemics or other crises on ride-sharing demand.
- Operational factors like competition in ride-hailing services, unpredictability in results of operations, and uncertainty about market growth for ridesharing and related services.
- Risks related to attracting and retaining qualified drivers and riders.
</span><button class="copy-code-btn"></button></code></pre>
<p>이 예에서는 시스템이 Uber 대신 Lyft에 대한 정보를 잘못 제공하여 오해의 소지가 있는 응답으로 이어집니다. 처음에는 해당 정보가 없다고 말하다가 계속해서 계속 진행됩니다.</p>
<h2 id="Using-an-Agent-to-Extract-Metadata-Filters" class="common-anchor-header">에이전트를 사용하여 메타데이터 필터 추출하기<button data-href="#Using-an-Agent-to-Extract-Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>이 문제를 해결하기 위해 에이전트를 사용하여 사용자의 질문에서 메타데이터 필터를 자동으로 추출하여 질문 답변 프로세스 중에 적용할 수 있습니다. 이렇게 하면 시스템이 정확하고 관련성 있는 정보를 검색할 수 있습니다.</p>
<h2 id="Code-Example" class="common-anchor-header">코드 예시<button data-href="#Code-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>다음은 에이전트를 사용하여 사용자의 질문에서 메타데이터 필터를 추출하여 필터링된 쿼리 엔진을 만드는 방법을 보여주는 코드 예제입니다:</p>
<h3 id="Explanation" class="common-anchor-header">설명</h3><ul>
<li><p><strong>프롬프트 템플릿</strong>: PromptTemplate 클래스는 사용자 질문에서 메타데이터 필터를 추출하기 위한 템플릿을 정의하는 데 사용됩니다. 이 템플릿은 언어 모델에 회사 이름, 연도 및 기타 관련 속성을 고려하도록 지시합니다.</p></li>
<li><p><strong>LLM</strong>: 미스트랄 네모는 사용자의 질문을 기반으로 메타데이터 필터를 생성하는 데 사용됩니다. 모델에 질문과 템플릿을 입력하면 관련 필터를 추출할 수 있는 메시지가 표시됩니다.</p></li>
<li><p><strong>메타데이터 필터</strong>: LLM의 응답을 파싱하여 <code translate="no">MetadataFilters</code> 개체를 만듭니다. 특정 필터가 언급되지 않으면 빈 <code translate="no">MetadataFilters</code> 개체가 반환됩니다.</p></li>
<li><p><strong>필터링된 쿼리 엔진</strong>: <code translate="no">index.as_query_engine(filters=metadata_filters)</code> 메서드는 추출된 메타데이터 필터를 인덱스에 적용하는 쿼리 엔진을 만듭니다. 이렇게 하면 필터 기준과 일치하는 문서만 검색됩니다.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.prompts.base <span class="hljs-keyword">import</span> PromptTemplate


<span class="hljs-comment"># Function to create a filtered query engine</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_query_engine</span>(<span class="hljs-params">question</span>):
    <span class="hljs-comment"># Extract metadata filters from question using a language model</span>
    prompt_template = PromptTemplate(
        <span class="hljs-string">&quot;Given the following question, extract relevant metadata filters.\n&quot;</span>
        <span class="hljs-string">&quot;Consider company names, years, and any other relevant attributes.\n&quot;</span>
        <span class="hljs-string">&quot;Don&#x27;t write any other text, just the MetadataFilters object&quot;</span>
        <span class="hljs-string">&quot;Format it by creating a MetadataFilters like shown in the following\n&quot;</span>
        <span class="hljs-string">&quot;MetadataFilters(filters=[ExactMatchFilter(key=&#x27;file_name&#x27;, value=&#x27;lyft_2021.pdf&#x27;)])\n&quot;</span>
        <span class="hljs-string">&quot;If no specific filters are mentioned, returns an empty MetadataFilters()\n&quot;</span>
        <span class="hljs-string">&quot;Question: {question}\n&quot;</span>
        <span class="hljs-string">&quot;Metadata Filters:\n&quot;</span>
    )

    prompt = prompt_template.<span class="hljs-built_in">format</span>(question=question)
    llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
    response = llm.complete(prompt)

    metadata_filters_str = response.text.strip()
    <span class="hljs-keyword">if</span> metadata_filters_str:
        metadata_filters = <span class="hljs-built_in">eval</span>(metadata_filters_str)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;eval: <span class="hljs-subst">{metadata_filters}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> index.as_query_engine(filters=metadata_filters)
    <span class="hljs-keyword">return</span> index.as_query_engine()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = <span class="hljs-title function_">create_query_engine</span>(
    <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Example usage with metadata filtering</span>
question = <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
filtered_query_engine = create_query_engine(question)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs_filtering&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
            ),
        ),
    ),
]
<span class="hljs-comment"># Set up the agent with the updated query engine tools</span>
response = llm.predict_and_call(
    query_engine_tools,
    user_msg=question,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response with metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
Response with metadata filtering:
Uber's total revenue for the year ended December 31, 2021, is $17.455 billion.
</code></pre>
<h2 id="Orchestrating-the-different-services-with-Mistral-Large" class="common-anchor-header">Mistral Large로 다양한 서비스 오케스트레이션하기<button data-href="#Orchestrating-the-different-services-with-Mistral-Large" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral Large는 매우 뛰어난 추론, 지식, 코딩 기능을 갖춘 Mistral의 주력 모델입니다. 대규모 추론 기능이 필요하거나 고도로 전문화된 복잡한 작업에 이상적입니다. 고급 함수 호출 기능도 갖추고 있어 여러 에이전트를 조율하는 데 꼭 필요한 기능입니다.</p>
<h3 id="Why-do-we-need-a-smarter-Model" class="common-anchor-header">더 스마트한 모델이 필요한 이유는 무엇인가요?</h3><p>아래 질문에 대한 답은 일관되고 정확한 응답을 제공하기 위해 여러 서비스와 에이전트의 오케스트레이션이 필요하기 때문에 특히 어렵습니다. 여기에는 여러 회사의 재무 데이터와 같은 다양한 소스에서 정보를 검색하고 처리하기 위해 다양한 도구와 에이전트를 조정하는 작업이 포함됩니다.</p>
<h3 id="Whats-so-difficult-about-that" class="common-anchor-header">무엇이 그렇게 어려울까요?</h3><ul>
<li>바로 복잡성입니다: 이 문제에는 각각 고유한 기능과 데이터 소스를 가진 여러 에이전트와 서비스가 관련되어 있습니다. 이러한 에이전트가 원활하게 함께 작동하도록 조정하는 것은 복잡한 작업입니다.</li>
</ul>
<ul>
<li><p>데이터 통합: 다양한 소스의 데이터를 통합해야 하는데, 데이터 형식, 구조 및 메타데이터의 다양성으로 인해 어려울 수 있습니다.</p></li>
<li><p>문맥 이해: 이 문제는 서로 다른 정보 간의 맥락과 관계를 이해해야 할 수 있으며, 이는 인지적으로 까다로운 작업입니다.</p></li>
</ul>
<h3 id="Why-would-Mistral-Large-help-in-this-case" class="common-anchor-header">이 경우에 미스트랄 라지가 도움이 되는 이유는 무엇인가요?</h3><p>미스트랄 라지는 고급 추론 및 함수 호출 기능으로 인해 이 작업에 매우 적합합니다. 이 기능이 어떻게 도움이 되는지는 다음과 같습니다:</p>
<ul>
<li><p>고급 추론: Mistral Large는 복잡한 추론 작업을 처리할 수 있으므로 여러 에이전트와 서비스를 오케스트레이션하는 데 이상적입니다. 서로 다른 정보 간의 관계를 이해하고 정보에 입각한 결정을 내릴 수 있습니다.</p></li>
<li><p>함수 호출 기능: 미스트랄 라지에는 여러 에이전트의 작업을 조율하는 데 필수적인 고급 함수 호출 기능이 있습니다. 이를 통해 다양한 서비스를 원활하게 통합하고 오케스트레이션할 수 있습니다.</p></li>
<li><p>전문 지식: Mistral Large는 고도로 전문화된 작업을 위해 설계되었기 때문에 심층적인 도메인 지식이 필요한 복잡한 쿼리를 처리하는 데 매우 적합합니다.</p></li>
</ul>
<p>이러한 모든 이유로 저는 Mistral Nemo 대신 Mistral Large를 사용하는 것이 더 적합하다고 판단했습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_agents <span class="hljs-keyword">import</span> (
    AgentService,
    ToolService,
    LocalLauncher,
    MetaServiceTool,
    ControlPlaneServer,
    SimpleMessageQueue,
    AgentOrchestrator,
)

<span class="hljs-keyword">from</span> llama_index.core.agent <span class="hljs-keyword">import</span> FunctionCallingAgentWorker
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># create our multi-agent framework components</span>
message_queue = SimpleMessageQueue()
control_plane = ControlPlaneServer(
    message_queue=message_queue,
    orchestrator=AgentOrchestrator(llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)),
)

<span class="hljs-comment"># define Tool Service</span>
tool_service = ToolService(
    message_queue=message_queue,
    tools=query_engine_tools,
    running=<span class="hljs-literal">True</span>,
    step_interval=<span class="hljs-number">0.5</span>,
)

<span class="hljs-comment"># define meta-tools here</span>
meta_tools = [
    <span class="hljs-keyword">await</span> MetaServiceTool.from_tool_service(
        t.metadata.name,
        message_queue=message_queue,
        tool_service=tool_service,
    )
    <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> query_engine_tools
]

<span class="hljs-comment"># define Agent and agent service</span>
worker1 = FunctionCallingAgentWorker.from_tools(
    meta_tools, llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)
)

agent1 = worker1.as_agent()
agent_server_1 = AgentService(
    agent=agent1,
    message_queue=message_queue,
    description=<span class="hljs-string">&quot;Used to answer questions over differnet companies for their Financial results&quot;</span>,
    service_name=<span class="hljs-string">&quot;Companies_analyst_agent&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> logging

<span class="hljs-comment"># change logging level to enable or disable more verbose logging</span>
logging.getLogger(<span class="hljs-string">&quot;llama_agents&quot;</span>).setLevel(logging.INFO)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-meta">## Define Launcher</span>
launcher = LocalLauncher(
    [<span class="hljs-meta">agent_server_1, tool_service</span>],
    control_plane,
    message_queue,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_str = <span class="hljs-string">&quot;What are the risk factors for Uber?&quot;</span>
result = launcher.<span class="hljs-title function_">launch_single</span>(query_str)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:llama_agents.message_queues.simple - Consumer AgentService-27cde4ed-5163-4005-90fc-13c158eda7e3: Companies_analyst_agent has been registered.
INFO:llama_agents.message_queues.simple - Consumer ToolService-b73c500a-5fbe-4f57-95c7-db74e173bd1b: default_tool_service has been registered.
INFO:llama_agents.message_queues.simple - Consumer 62465ab8-32ff-436e-95fa-74e828745150: human has been registered.
INFO:llama_agents.message_queues.simple - Consumer ControlPlaneServer-f4c27d43-5474-43ca-93ca-a9aeed4534d7: control_plane has been registered.
INFO:llama_agents.services.agent - Companies_analyst_agent launch_local
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Launching message queue locally
INFO:llama_agents.services.agent - Processing initiated.
INFO:llama_agents.services.tool - Processing initiated.
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.simple - Consumer MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41: MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41 has been registered.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f4c270a4-bc47-4bbf-92fe-e2cc80757943 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f888f9a8-e716-4505-bfe2-577452e9b6e6 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'human' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'human' to consumer.
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{&quot;name&quot;: &quot;finalize&quot;, &quot;arguments&quot;: {&quot;input&quot;: &quot;Uber faces several risk factors, including general economic impacts such as pandemics or downturns, operational challenges like competition, market growth uncertainty, attracting and retaining drivers and riders, insurance adequacy, autonomous vehicle technology development, maintaining its reputation and brand, and managing growth. Additionally, reliance on third-party providers for various services can introduce further risks to its operations.&quot;}}]
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>이 노트북에서는 라마 에이전트를 사용하여 적절한 도구를 호출하여 다양한 작업을 수행하는 방법을 살펴보았습니다. 미스트랄 대형과 미스트랄 네모를 함께 사용함으로써 서로 다른 LLM의 강점을 활용하여 지능적이고 리소스 효율적인 시스템을 효과적으로 오케스트레이션하는 방법을 보여드렸습니다. 에이전트가 사용자가 요청한 데이터가 포함된 컬렉션을 선택할 수 있음을 확인했습니다.</p>
