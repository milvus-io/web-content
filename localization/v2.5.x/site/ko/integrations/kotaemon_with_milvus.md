---
id: kotaemon_with_milvus.md
summary: 이 튜토리얼에서는 Milvus를 사용하여 코타에몬 애플리케이션을 커스터마이즈하는 방법을 안내합니다.
title: 밀버스와 함께하는 코타에몬 RAG
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">밀버스와 함께하는 코타에몬 RAG<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon은</a> 문서 채팅을 위한 깔끔하고 사용자 정의 가능한 오픈 소스 RAG UI입니다. 최종 사용자와 개발자 모두를 염두에 두고 제작되었습니다.</p>
<p>Kotaemon은 로컬 및 API 기반 LLM을 지원하는 사용자 지정 가능한 다중 사용자 문서 QA 웹-UI를 제공합니다. 전체 텍스트 및 벡터 검색, 그림과 표가 포함된 문서를 위한 멀티모달 QA, 문서 미리 보기를 통한 고급 인용 기능을 갖춘 하이브리드 RAG 파이프라인을 제공합니다. ReAct 및 ReWOO와 같은 복잡한 추론 방법을 지원하며 검색 및 생성을 위한 구성 가능한 설정을 제공합니다.</p>
<p>이 튜토리얼에서는 <a href="https://milvus.io/">Milvus를</a> 사용하여 코타에몬 애플리케이션을 사용자 지정하는 방법을 안내합니다.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">설치</h3><p>코타에몬은 이 방법으로 설치하는 것을 권장합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 방법 외에도 코타에몬을 설치하는 다른 방법이 있습니다. 자세한 내용은 <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">공식 문서를</a> 참조하세요.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Milvus를 기본 벡터 저장소로 설정</h3><p>기본 벡터 저장소를 Milvus로 변경하려면 <code translate="no">flowsettings.py</code> 파일을 <code translate="no">KH_VECTORSTORE</code> 로 변경하여 수정해야 합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">환경 변수 설정</h3><p>를 통해 모델을 구성할 수 있으며, <code translate="no">.env</code> 파일에서 LLM에 연결하고 모델을 임베딩하는 데 필요한 정보(예: OpenAI, Azure, Ollama 등)를 설정할 수 있습니다.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">코타에몬 실행</h3><p>환경 변수를 설정하고 벡터 저장소를 변경한 후 다음 명령을 실행하여 kotaemon을 실행할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>기본 사용자 이름/비밀번호는 다음과 같습니다: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">kotaemon으로 RAG 시작하기<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. AI 모델 추가하기</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><code translate="no">Resources</code> 탭에서 LLM과 임베딩 모델을 추가하고 설정할 수 있습니다. 여러 모델을 추가하고 활성 또는 비활성 상태로 설정할 수 있습니다. 하나 이상의 모델만 제공하면 됩니다. 여러 모델을 제공하여 모델 간에 전환할 수 있도록 할 수도 있습니다.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. 문서 업로드</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>문서에 대한 QA를 수행하려면 먼저 애플리케이션에 문서를 업로드해야 합니다. <code translate="no">File Index</code> 탭으로 이동하여 사용자 지정 문서를 업로드하고 관리할 수 있습니다.</p>
<p>기본적으로 모든 애플리케이션 데이터는 <code translate="no">./ktem_app_data</code> 폴더에 저장됩니다. Milvus 데이터베이스 데이터는 <code translate="no">./ktem_app_data/user_data/vectorstore</code> 폴더에 저장됩니다. 이 폴더를 백업하거나 복사하여 새 컴퓨터로 설치를 옮길 수 있습니다.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. 문서와 채팅하기</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이제 <code translate="no">Chat</code> 탭으로 다시 이동합니다. 채팅 탭은 대화 및 파일 참조를 관리하는 대화 설정 패널, 챗봇과 상호작용하기 위한 채팅 패널, 답변의 근거 자료, 신뢰도 점수 및 관련성 등급을 표시하는 정보 패널의 세 가지 영역으로 구성되어 있습니다.</p>
<p>대화 설정 패널에서 문서를 선택할 수 있습니다. 그런 다음 입력 상자에 메시지를 입력하여 문서로 RAG를 시작하고 챗봇에게 전송하기만 하면 됩니다.</p>
<p>코타에몽 사용법에 대해 자세히 알아보고 싶다면 <a href="https://cinnamon.github.io/kotaemon/usage/">공식 문서에서</a> 전체 안내를 받으실 수 있습니다.</p>
