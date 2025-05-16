---
id: use_milvus_in_anythingllm.md
summary: >-
  이 가이드에서는 지능형 검색 및 채팅을 위해 문서를 포함, 저장 및 검색할 수 있도록 AnythingLLM에서 Milvus를 벡터
  데이터베이스로 구성하는 방법을 안내합니다.
title: AnythingLLM에서 Milvus 사용
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">AnythingLLM에서 Milvus 사용<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM은</a> 다양한 LLM, 문서 유형 및 벡터 데이터베이스를 지원하는 강력하고 개인 정보 보호에 중점을 둔 올인원 AI 데스크톱 애플리케이션입니다. 로컬에서 실행하거나 원격으로 호스팅할 수 있는 ChatGPT와 유사한 비공개 어시스턴트를 구축하여 사용자가 제공하는 모든 문서와 지능적으로 채팅할 수 있습니다.</p>
<p>이 가이드에서는 지능형 검색 및 채팅을 위해 문서를 임베드, 저장 및 검색할 수 있도록 AnythingLLM에서 Milvus를 벡터 데이터베이스로 구성하는 방법을 안내합니다.</p>
<blockquote>
<p>이 튜토리얼은 공식 AnythingLLM 문서와 실제 사용 단계를 기반으로 합니다. UI나 단계가 변경된 경우 최신 공식 문서를 참조하고 개선 사항을 자유롭게 제안해 주세요.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. 전제 조건<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li>로컬에 설치된<a href="https://milvus.io/docs/install-overview.md">밀버스</a> 또는 <a href="https://zilliz.com/cloud">질리즈 클라우드</a> 계정</li>
<li><a href="https://anythingllm.com/desktop">애니띵엘엠 데스크톱</a> 설치</li>
<li>업로드 및 임베딩이 준비된 문서 또는 데이터 소스(PDF, 워드, CSV, 웹페이지 등)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. 밀버스를 벡터 데이터베이스로 구성하기<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>AnythingLLM을 열고 왼쪽 하단 모서리에 있는 <strong>설정</strong> 아이콘을 클릭합니다.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>설정 열기</span> </span></li>
</ol>
<ol start="2">
<li><p>왼쪽 메뉴에서 <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>벡터 데이터베이스를 선택합니다</span> </span>.</p></li>
<li><p>벡터 데이터베이스 제공업체 드롭다운에서 <strong>Milvus</strong> (또는 Zilliz Cloud)를 선택합니다.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Milvus를 선택합니다</span> </span>.</p></li>
<li><p>Milvus 연결 세부 정보를 입력합니다(로컬 Milvus의 경우). 다음은 예시입니다:</p>
<ul>
<li><strong>Milvus DB 주소</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus 사용자 이름</strong>: <code translate="no">root</code></li>
<li><strong>Milvus 비밀번호</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>밀버스 연결</span> </span></li>
</ul>
<blockquote>
<p>질리즈 클라우드를 사용하는 경우, 클러스터 엔드포인트와 API 토큰을 대신 입력합니다:</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>질리즈 클라우드 연결</span> </span></p></li>
<li><p><strong>변경 사항 저장을</strong> 클릭하여 설정을 적용합니다.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. 워크스페이스 생성 및 문서 업로드하기<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>워크스페이스를 입력하고 <strong>업로드</strong> 아이콘을 클릭하면 문서 업로드 대화 상자가 열립니다.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>업로드 대화 상자 열기</span> </span></p></li>
<li><p>다양한 데이터 소스를 업로드할 수 있습니다:</p>
<ul>
<li><strong>로컬 파일</strong> PDF, Word, CSV, TXT, 오디오 파일 등</li>
<li><strong>웹 페이지</strong>: URL을 붙여넣고 웹사이트 콘텐츠를 직접 가져옵니다.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>문서 업로드</span> </span></p></li>
<li><p>업로드 또는 가져오기 후 <strong>워크스페이스로 이동</strong> 을 클릭하여 문서 또는 데이터를 현재 워크스페이스로 옮깁니다.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>워크스페이스로 이동</span> </span></p></li>
<li><p>문서 또는 데이터를 선택하고 <strong>저장 및 임베드를</strong> 클릭합니다. AnythingLLM이 자동으로 콘텐츠를 청크, 임베드 및 Milvus에 저장합니다.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>저장 및 임베드</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Milvus에서 채팅 및 답변 검색하기<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>워크스페이스 채팅 인터페이스로 돌아가서 질문을 하세요. AnythingLLM이 Milvus 벡터 데이터베이스에서 관련 콘텐츠를 검색하고 LLM을 사용하여 답변을 생성합니다.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>문서와 채팅</span> </span></li>
</ol>
<hr>
