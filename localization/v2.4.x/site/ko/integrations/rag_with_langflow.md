---
id: rag_with_langflow.md
summary: 이 가이드에서는 Langflow를 사용하여 Milvus로 검색 증강 생성(RAG) 파이프라인을 구축하는 방법을 설명합니다.
title: Milvus와 함께 Langflow를 사용하여 RAG 시스템 구축하기
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Milvus와 함께 Langflow를 사용하여 RAG 시스템 구축하기<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 <a href="https://www.langflow.org/">Langflow를</a> 사용하여 <a href="https://milvus.io/">Milvus로</a> 검색 증강 생성(RAG) 파이프라인을 구축하는 방법을 설명합니다.</p>
<p>RAG 시스템은 먼저 지식창고에서 관련 문서를 검색한 다음 이 컨텍스트에 따라 새로운 응답을 생성함으로써 텍스트 생성을 향상시킵니다. Milvus는 텍스트 임베딩을 저장하고 검색하는 데 사용되며, Langflow는 시각적 워크플로에서 검색과 생성의 통합을 용이하게 합니다.</p>
<p>Langflow를 사용하면 텍스트 청크가 임베드되어 Milvus에 저장되고 관련 쿼리가 수행될 때 검색되는 RAG 파이프라인을 쉽게 구축할 수 있습니다. 이를 통해 언어 모델이 문맥에 맞는 응답을 생성할 수 있습니다.</p>
<p>Milvus는 의미적으로 유사한 텍스트를 빠르게 찾아내는 확장 가능한 벡터 데이터베이스 역할을 하며, Langflow를 사용하면 파이프라인에서 텍스트 검색 및 응답 생성을 처리하는 방식을 관리할 수 있습니다. 이 두 가지를 함께 사용하면 향상된 텍스트 기반 애플리케이션을 위한 강력한 RAG 파이프라인을 구축할 수 있는 효율적인 방법을 제공합니다.</p>
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
    </button></h2><p>이 노트북을 실행하기 전에 다음 종속성이 설치되어 있는지 확인하세요:</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">튜토리얼<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 종속성이 설치되면 다음 명령을 입력하여 Langflow 대시보드를 시작합니다:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>그러면 아래와 같이 대시보드가 나타납니다: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p><strong>벡터 스토어</strong> 프로젝트를 생성하려면 먼저 <strong>새 프로젝트</strong> 버튼을 클릭해야 합니다. 패널이 나타나면 <strong>Vector Store RAG</strong> 옵션을 선택합니다: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>패널</span> </span></p>
<p>Vector Store RAG 프로젝트가 성공적으로 생성되면 기본 벡터 스토어는 AstraDB이지만, 우리는 Milvus를 사용하려고 합니다. 따라서 Milvus를 벡터 저장소로 사용하려면 이 두 개의 astraDB 모듈을 Milvus로 교체해야 합니다. <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">astraDB를 Milvus로 교체하는 단계:</h3><ol>
<li>벡터 스토어의 기존 카드를 제거합니다. 위 이미지에서 빨간색으로 표시된 두 개의 AstraDB 카드를 클릭하고 <strong>백스페이스</strong> 키를 눌러 삭제합니다.</li>
<li>사이드바에서 <strong>벡터 스토어</strong> 옵션을 클릭하고 Milvus를 선택한 다음 캔버스로 드래그합니다. 파일 처리 워크플로우 저장용 카드와 검색 워크플로우용 카드 두 개가 필요하므로 이 작업을 두 번 수행합니다.</li>
<li>Milvus 모듈을 나머지 구성 요소에 연결합니다. 아래 이미지를 참조하세요.</li>
<li>두 Milvus 모듈에 대한 Milvus 자격 증명을 구성합니다. 가장 간단한 방법은 연결 URI를 milvus_demo.db로 설정하여 Milvus Lite를 사용하는 것입니다. Milvus 서버를 자체 구축하거나 Zilliz Cloud에 설치한 경우, 연결 URI는 서버 엔드포인트로, 연결 비밀번호는 토큰으로 설정합니다(Milvus의 경우 &quot;<username>:<password>&quot;, Zilliz Cloud의 경우 API Key로 연결). 아래 이미지를 참고하세요:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Milvus 구조 데모</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">RAG 시스템에 지식 임베드하기</h3><ol>
<li>왼쪽 하단의 파일 모듈을 통해 LLM의 지식 베이스로 파일을 업로드합니다. 여기에는 Milvus에 대한 간략한 소개가 포함된 파일을 업로드했습니다.</li>
<li>오른쪽 하단의 Milvus 모듈에서 실행 버튼을 눌러 삽입 워크플로우를 실행합니다. 이렇게 하면 Milvus 벡터 스토어에 지식이 삽입됩니다.</li>
<li>지식이 메모리에 있는지 테스트합니다. 플레이그라운드를 열고 업로드한 파일과 관련된 모든 것을 물어봅니다.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>왜 밀버스인가</span> </span>?</p>
