---
id: use_milvus_in_private_gpt.md
summary: 이 튜토리얼에서는 Milvus를 PrivateGPT의 백엔드 벡터 데이터베이스로 사용하는 방법을 보여드리겠습니다.
title: PrivateGPT에서 Milvus 사용
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">PrivateGPT에서 Milvus 사용<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT는</a> 사용자가 인터넷 연결 없이도 대규모 언어 모델을 사용하여 문서에 대해 질문할 수 있는 동시에 100% 프라이버시를 보장하는 프로덕션 준비 완료된 AI 프로젝트입니다. PrivateGPT는 하이레벨과 로우레벨 블록으로 나뉜 API를 제공합니다. 또한 Gradio UI 클라이언트와 대량 모델 다운로드 스크립트 및 수집 스크립트와 같은 유용한 도구도 제공합니다. 개념적으로 PrivateGPT는 RAG 파이프라인을 래핑하고 그 기본 요소를 노출하며, 바로 사용할 수 있고 API와 RAG 파이프라인의 전체 구현을 제공합니다.</p>
<p>이 튜토리얼에서는 Milvus를 PrivateGPT의 백엔드 벡터 데이터베이스로 사용하는 방법을 보여드리겠습니다.</p>
<div class="alert note">
<p>이 튜토리얼은 주로 <a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a> 공식 설치 가이드를 참조합니다. 이 튜토리얼에 오래된 부분이 있는 경우 공식 가이드를 우선적으로 따르고 문제를 생성할 수 있습니다.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">PrivateGPT 실행을 위한 기본 요구 사항<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. PrivateGPT 리포지토리 복제하기</h3><p>리포지토리를 복제하고 리포지토리로 이동합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> private-gpt</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Poetry 설치</h3><p>종속성 관리를 위해 <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry를</a> 설치합니다: Poetry 공식 웹사이트의 지침에 따라 설치합니다.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. (선택 사항) 메이크 설치</h3><p>다양한 스크립트를 실행하려면 make를 설치해야 합니다.</p>
<p>macOS(홈브루 사용):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">brew install make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (Chocolatey 사용):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">choco install make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">사용 가능한 모듈 설치<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT를 사용하면 LLM, 임베딩, 벡터 스토어, UI 등 일부 모듈의 설정을 사용자 정의할 수 있습니다.</p>
<p>이 튜토리얼에서는 다음 모듈을 사용합니다:</p>
<ul>
<li><strong>LLM</strong>: 올라마</li>
<li><strong>임베딩</strong> Ollama</li>
<li><strong>벡터 스토어</strong>: Milvus</li>
<li><strong>UI</strong>: Gradio</li>
</ul>
<p>다음 명령을 실행하여 poetry를 사용하여 필요한 모듈 종속성을 설치합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">올라마 서비스 시작<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://ollama.com/">ollama.ai로</a> 이동하여 안내에 따라 컴퓨터에 Ollama를 설치합니다.</p>
<p>설치가 완료되면 Ollama 데스크톱 앱이 닫혀 있는지 확인하세요.</p>
<p>이제 Ollama 서비스를 시작합니다(로컬 추론 서버를 시작하여 LLM과 임베딩을 모두 서비스합니다):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama serve</span>
<button class="copy-code-btn"></button></code></pre>
<p>사용할 모델을 설치합니다. 기본값 <code translate="no">settings-ollama.yaml</code> 은 <code translate="no">llama3.1</code> 8b LLM(~4GB) 및 <code translate="no">nomic-embed-text</code> 임베딩(~275MB) 사용자로 구성됩니다.</p>
<p>기본적으로 PrivateGPT는 필요에 따라 모델을 자동으로 가져옵니다. 이 동작은 <code translate="no">ollama.autopull_models</code> 속성을 수정하여 변경할 수 있습니다.</p>
<p>어떤 경우든 수동으로 모델을 가져오려면 다음 명령을 실행하세요:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama pull llama3.1</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama pull nomic-embed-text</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">settings-ollama.yaml</code> 파일에서 원하는 모델을 선택적으로 변경하여 수동으로 가져올 수 있습니다.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">밀버스 설정 변경<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">settings-ollama.yaml</code> 파일에서 벡터스토어를 milvus로 설정합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">vectorstore:</span>
  <span class="hljs-attr">database:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음과 같이 cumstom Milvus 구성을 추가하여 설정을 지정할 수도 있습니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">uri:</span> <span class="hljs-string">http://localhost:19530</span>
  <span class="hljs-attr">collection_name:</span> <span class="hljs-string">my_collection</span>
<button class="copy-code-btn"></button></code></pre>
<p>사용 가능한 구성 옵션은 다음과 같습니다:</p>
<table>
<thead>
<tr><th>필드 옵션</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>기본값은 로컬 파일로 "local_data/private_gpt/milvus/milvus_local.db"로 설정되어 있으며, 도커 또는 k8s에서 더 성능이 좋은 Milvus 서버를 설정할 수도 있습니다(예: http://localhost:19530); <a href="https://zilliz.com/cloud">Zilliz Cloud를</a> 사용하려면 Zilliz Cloud의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">공용 엔드포인트 및 API 키로</a> uri와 토큰을 조정하세요.</td></tr>
<tr><td>토큰</td><td>도커 또는 k8s 또는 질리즈 클라우드 API 키로 밀버스 서버와 페어링합니다.</td></tr>
<tr><td>collection_name</td><td>컬렉션의 이름, 기본값은 "milvus_db"로 설정됩니다.</td></tr>
<tr><td>overwrite</td><td>컬렉션에 데이터가 있는 경우 덮어쓰기, 기본값은 True로 설정합니다.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">PrivateGPT 시작<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 설정이 완료되면 Gradio UI로 PrivateGPT를 실행할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama make run
<button class="copy-code-btn"></button></code></pre>
<p>UI는 <code translate="no">http://0.0.0.0:8001</code> 에서 사용할 수 있습니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>UI를 사용해보고 문서에 대해 질문할 수 있습니다.</p>
<p>자세한 내용은 <a href="https://docs.privategpt.dev/">PrivateGPT</a> 공식 문서를 참조하세요.</p>
