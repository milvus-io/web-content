---
id: integrate_with_fastgpt.md
summary: >-
  이 튜토리얼에서는 [밀버스](https://milvus.io/)를 사용하여 자신만의 전용 FastGPT 애플리케이션을 신속하게 배포하는
  방법을 안내합니다.
title: Milvus로 FastGPT 배포하기
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">Milvus로 FastGPT 배포하기<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT는</a> LLM 대규모 언어 모델을 기반으로 구축된 지식 기반 질의응답 시스템으로, 데이터 처리 및 모델 호출을 위해 바로 사용할 수 있는 기능을 제공합니다. 또한 플로우 시각화를 통해 워크플로우 오케스트레이션이 가능하므로 복잡한 질문과 답변 시나리오를 용이하게 합니다. 이 튜토리얼에서는 <a href="https://milvus.io/">Milvus를</a> 사용해 자신만의 전용 FastGPT 애플리케이션을 신속하게 배포하는 방법을 안내합니다.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">docker-compose.yml 다운로드<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.docker.com/compose/">도커 컴포즈를</a> 이미 설치했는지 확인하세요.<br>
아래 명령어를 실행하여 docker-compose.yml 파일을 다운로드합니다.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">mkdir</span> fastgpt
$ <span class="hljs-built_in">cd</span> fastgpt
$ curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json

<span class="hljs-comment"># milvus version</span>
$ curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml
<span class="hljs-comment"># zilliz version</span>
<span class="hljs-comment"># curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Zilliz 버전을 사용하는 경우, <a href="https://zilliz.com/cloud">Zilliz Cloud의</a> <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트 및 API 키에</a> 해당하는 <code translate="no">MILVUS_ADDRESS</code> 및 <code translate="no">MILVUS_TOKEN</code> 링크 파라미터를 docker-compose.yml 파일에서 조정합니다.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">컨테이너 실행<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>docker-compose.yml과 동일한 디렉토리에서 실행합니다. 일부 자동화 명령어가 작동하지 않을 수 있으므로 docker-compose 버전이 2.17 이상인지 확인하세요.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Launch the container</span>
$ docker-compose up -d
<span class="hljs-comment"># Wait for 10s, OneAPI typically needs to restart a few times to initially connect to Mysql</span>
$ sleep <span class="hljs-number">10</span>
<span class="hljs-comment"># Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display &#x27;channel not found&#x27; if not restarted, this can be temporarily resolved by manually restarting once, while waiting for the author&#x27;s fix)</span>
$ docker restart oneapi
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">OneAPI에 액세스하여 모델 추가<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>OneAPI는 <code translate="no">ip:3001</code> 에서 액세스할 수 있습니다. 기본 사용자 아이디는 root이고 비밀번호는 123456입니다. 로그인 후 비밀번호를 변경할 수 있습니다.<br>
OpenAI의 모델을 예로 들어 '채널' 탭을 클릭하고 '모델' 아래에서 채팅 모델과 임베딩 모델을 선택합니다.<br>
"비밀" 섹션에 <a href="https://platform.openai.com/docs/quickstart">OpenAI API 키를</a> 입력합니다.<br>
OpenAI 이외의 모델을 사용하는 방법 및 자세한 내용은 <a href="https://doc.fastgpt.in/docs/development/one-api/">One API를</a> 참조하세요.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">토큰 설정<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>"토큰" 탭을 클릭합니다. 기본적으로 <code translate="no">Initial Root Token</code> 토큰이 있습니다. 새 토큰을 생성하고 직접 할당량을 설정할 수도 있습니다.<br>
토큰에서 "복사"를 클릭하고 이 토큰의 값이 docker-compose.yml 파일에 설정된 <code translate="no">CHAT_API_KEY</code> 값과 일치하는지 확인합니다.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">FastGPT에 액세스하기<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 FastGPT는 <code translate="no">ip:3000</code> 에서 직접 액세스할 수 있습니다(방화벽에 유의하세요). 로그인 사용자 이름은 root이며, 비밀번호는 docker-compose.yml 환경 변수 내에 <code translate="no">DEFAULT_ROOT_PSW</code> 로 설정되어 있습니다. 도메인 네임 액세스가 필요한 경우 직접 <a href="https://nginx.org/en/">Nginx를</a> 설치하고 구성해야 합니다.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">컨테이너 중지<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 실행하여 컨테이너를 중지합니다.</p>
<pre><code translate="no" class="language-shell">$ docker-compose down
<button class="copy-code-btn"></button></code></pre>
