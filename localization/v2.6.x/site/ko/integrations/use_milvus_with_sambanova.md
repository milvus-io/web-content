---
id: use_milvus_with_sambanova.md
summary: >-
  이 튜토리얼에서는 삼바노바 AI 스타터 키트의 Milvus 통합 기능을 활용하여 기업 비공개 문서를 기반으로 검색 및 답변을 제공하는
  RAG(검색 증강 세대)와 유사한 엔터프라이즈 지식 검색 시스템을 구축합니다.
title: 삼바노바와 함께 Milvus 사용
---
<h1 id="Use-Milvus-with-SambaNova" class="common-anchor-header">삼바노바와 함께 Milvus 사용<button data-href="#Use-Milvus-with-SambaNova" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://sambanova.ai/">삼바노바는</a> 고급 AI 및 딥러닝 기능의 배포를 가속화하는 혁신적인 AI 기술 플랫폼입니다. 기업용으로 설계된 이 플랫폼은 조직이 제너레이티브 AI를 활용하여 성능과 효율성을 향상시킬 수 있도록 지원합니다. 이 플랫폼은 삼바노바 스위트와 데이터스케일과 같은 최첨단 솔루션을 제공함으로써 기업이 데이터에서 가치 있는 인사이트를 추출하여 운영 개선을 주도하고 AI 환경에서 새로운 기회를 창출할 수 있도록 지원합니다.</p>
<p>삼바노바<a href="https://github.com/sambanova/ai-starter-kit">AI 스타터 키트는</a> 개발자와 기업이 삼바노바를 통해 AI 기반 애플리케이션을 배포하는 데 도움이 되도록 설계된 오픈 소스 리소스 모음입니다. 이 키트는 다양한 AI 사용 사례를 쉽게 구현할 수 있는 실용적인 예제와 가이드를 제공하여 사용자가 삼바노바의 고급 기술을 보다 쉽게 활용할 수 있도록 지원합니다.</p>
<p>이 튜토리얼에서는 삼바노바 AI 스타터 키트의 Milvus 통합 기능을 활용하여 기업 비공개 문서를 기반으로 검색 및 답변을 제공하는 RAG(검색 증강 세대)와 유사한 엔터프라이즈 지식 검색 시스템을 구축합니다.</p>
<div class="alert note">
<p>이 튜토리얼은 주로 <a href="https://github.com/sambanova/ai-starter-kit/tree/main">삼바노바 AI 스타터 키트</a> 공식 가이드를 참조합니다. 이 튜토리얼에 오래된 부분이 있다고 생각되면 공식 가이드를 우선적으로 따르고 이슈를 생성해 주세요.</p>
</div>
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
    </button></h2><p>Python &gt;= 3.10 및 3.12 미만 버전을 사용하는 것이 좋습니다.</p>
<p>삼바노바 <a href="https://cloud.sambanova.ai/">클라우드에</a> 방문하여 삼바노바 API 키를 받습니다.</p>
<h2 id="Clone-the-repository" class="common-anchor-header">리포지토리 복제<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/sambanova/ai-starter-kit.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">d ai-starter-kit/enterprise_knowledge_retriever</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Change-the-vector-store-type" class="common-anchor-header">벡터 저장소 유형 변경<button data-href="#Change-the-vector-store-type" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">create_vector_store()</code> 에서 <code translate="no">db_type='milvus'</code> 을, <code translate="no">load_vdb()</code> 에서 <code translate="no">src/document_retrieval.py</code> 을 설정하여 벡터 저장소를 변경합니다.</p>
<pre><code translate="no" class="language-python">...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.create_vector_store(
    ..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>
)
...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.load_vdb(..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-dependencies" class="common-anchor-header">종속성 설치<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 실행하여 필요한 종속성을 설치합니다:</p>
<pre><code translate="no" class="language-shell">python3 -m venv enterprise_knowledge_env
source enterprise_knowledge_env/bin/activate
pip install -r requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-the-application" class="common-anchor-header">애플리케이션 시작<button data-href="#Start-the-application" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 사용하여 애플리케이션을 시작합니다:</p>
<pre><code translate="no" class="language-bash">$ streamlit run streamlit/app.py --browser.gatherUsageStats <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre>
<p>그 후 브라우저에 사용자 인터페이스가 표시됩니다:<code translate="no">http://localhost:8501/</code></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/sambanava_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>UI에서 삼바노바 API 키를 설정한 후, UI를 사용해보고 문서에 대해 질문할 수 있습니다.</p>
<p>자세한 내용은 <a href="https://github.com/sambanova/ai-starter-kit/tree/main/enterprise_knowledge_retriever">삼바노바 AI 스타터 키트의 기업 지식 검색</a> 공식 문서를 참조하세요.</p>
