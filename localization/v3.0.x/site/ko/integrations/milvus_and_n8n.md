---
id: milvus_and_n8n.md
summary: >-
  n8n은 다양한 애플리케이션, 서비스, API를 서로 연결하여 코딩 없이 자동화된 워크플로를 만들 수 있는 강력한 오픈 소스 워크플로 자동화
  플랫폼입니다. 노드 기반의 시각적 인터페이스를 통해 사용자는 서로 다른 서비스나 작업을 나타내는 노드를 연결하기만 하면 복잡한 자동화
  프로세스를 구축할 수 있습니다. 자체 호스팅이 가능하고 확장성이 뛰어나며 공정 코드 및 엔터프라이즈 라이선스를 모두 지원합니다.
title: Milvus 및 n8n 시작하기
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Milvus 및 n8n 시작하기<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">n8n 및 Milvus 벡터 스토어 노드 소개<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n은</a> 다양한 애플리케이션, 서비스, API를 연결하여 코딩 없이 자동화된 워크플로를 만들 수 있는 강력한 오픈소스 워크플로우 자동화 플랫폼입니다. 노드 기반의 시각적 인터페이스를 통해 사용자는 서로 다른 서비스나 작업을 나타내는 노드를 연결하기만 하면 복잡한 자동화 프로세스를 구축할 수 있습니다. 자체 호스팅이 가능하고 확장성이 뛰어나며 공정 코드 및 엔터프라이즈 라이선스를 모두 지원합니다.</p>
<p>n8n의 <strong>Milvus 벡터 스토어</strong> 노드는 자동화 워크플로우에 <a href="https://milvus.io/">Milvus를</a> 통합합니다. 이를 통해 n8n 에코시스템 내에서 시맨틱 검색, 전력 검색 증강 생성(RAG) 시스템을 수행하고 지능형 AI 애플리케이션을 구축할 수 있습니다.</p>
<p>이 문서는 주로 공식 <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store 설명서를</a> 기반으로 합니다. 오래되었거나 일관성이 없는 콘텐츠를 발견하면 공식 문서를 우선시하고 언제든지 문제를 제기해 주시기 바랍니다.</p>
<h2 id="Key-Features" class="common-anchor-header">주요 기능<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>n8n의 Milvus Vector Store 노드를 사용하면 다음을 수행할 수 있습니다:</p>
<ul>
<li>Milvus 데이터베이스와 <a href="https://docs.n8n.io/glossary/#ai-vector-store">벡터 스토어로</a> 상호 작용하기</li>
<li>Milvus에 문서 삽입</li>
<li>Milvus에서 문서 가져오기</li>
<li>문서를 검색하여 <a href="https://docs.n8n.io/glossary/#ai-chain">체인에</a> 연결된 리트리버에게 제공</li>
<li><a href="https://docs.n8n.io/glossary/#ai-tool">도구로</a> <a href="https://docs.n8n.io/glossary/#ai-agent">에이전트에</a> 직접 연결</li>
<li>메타데이터를 기반으로 문서 필터링</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">노드 사용 패턴<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>n8n에서 Milvus 벡터 스토어 노드는 다음과 같은 패턴으로 사용할 수 있습니다.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">문서 삽입 및 검색을 위한 일반 노드로 사용</h3><p>밀버스 벡터 스토어를 일반 노드로 사용하여 문서를 삽입하거나 가져올 수 있습니다. 이 패턴은 에이전트를 사용하지 않고 일반 연결 흐름에 Milvus 벡터 스토어를 배치합니다.</p>
<p>Milvus에 문서를 저장하고 이를 검색하여 인용된 채팅 기반 답변을 지원하는 시스템을 구축하는 방법은 이 <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">예제 템플릿을</a> 참조하세요.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">도구로 AI 에이전트에 직접 연결</h3><p>Milvus 벡터 스토어 노드를 <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">AI 에이전트의</a> 툴 커넥터에 직접 연결하여 쿼리에 답변할 때 벡터 스토어를 리소스로 사용할 수 있습니다.</p>
<p>연결은 다음과 같습니다: AI 에이전트(도구 커넥터) -&gt; Milvus 벡터 스토어 노드. 이 <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">예제 템플릿에서는</a> 데이터가 Milvus에 임베드 및 인덱싱되고 AI 에이전트가 벡터 스토어를 질문 답변을 위한 지식 도구로 사용하는 것을 볼 수 있습니다.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">리트리버를 사용하여 문서 가져오기</h3><p>Milvus 벡터 스토어 노드와 함께 <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">벡터 스토어 리트리버</a> 노드를 사용하여 Milvus 벡터 스토어 노드에서 문서를 가져올 수 있습니다. 이 노드는 종종 <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">질문 및 답변 체인</a> 노드와 함께 사용되어 주어진 채팅 입력과 일치하는 문서를 벡터 스토어에서 가져오는 데 사용됩니다.</p>
<p>일반적인 노드 연결 흐름은 다음과 같습니다: 질문 및 답변 체인(리트리버 커넥터) -&gt; 벡터 스토어 리트리버(벡터 스토어 커넥터) -&gt; 밀버스 벡터 스토어.</p>
<p>이 <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">워크플로우 예시를</a> 통해 외부 데이터를 Milvus로 수집하고 채팅 기반의 시맨틱 Q&amp;A 시스템을 구축하는 방법을 확인하세요.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">벡터 스토어 질문 답변 도구를 사용하여 질문에 답변하기</h3><p>또 다른 패턴은 <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">벡터 스토어 질문 답변 도구를</a> 사용하여 Milvus 벡터 스토어 노드에서 결과를 요약하고 질문에 답변하는 것입니다. 이 패턴은 Milvus 벡터 스토어를 도구로 직접 연결하는 대신 벡터 스토어에 있는 데이터를 요약하도록 특별히 설계된 도구를 사용합니다.</p>
<p>연결 흐름은 다음과 같습니다: AI 에이전트(도구 커넥터) -&gt; 벡터 스토어 질문 답변 도구(벡터 스토어 커넥터) -&gt; Milvus 벡터 스토어.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">노드 작동 모드<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 벡터 스토어 노드는 각각 다른 워크플로 사용 사례에 맞게 조정된 여러 작동 모드를 지원합니다. 이러한 모드를 이해하면 보다 효과적인 워크플로를 설계하는 데 도움이 됩니다.</p>
<p>아래에서 사용 가능한 작동 모드와 옵션에 대한 개괄적인 개요를 제공합니다. 각 모드의 입력 매개변수 및 구성 옵션의 전체 목록은 <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">공식 문서를</a> 참조하세요.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">작동 모드 개요</h3><p>Milvus 벡터 스토어 노드는 네 가지 모드를 지원합니다:</p>
<ul>
<li><strong>다수 가져오기</strong>: 프롬프트와의 의미적 유사성을 기준으로 여러 문서를 검색합니다.</li>
<li><strong>문서 삽입</strong>: 문서 삽입: Milvus 컬렉션에 새 문서를 삽입합니다.</li>
<li><strong>문서 검색(체인/도구용 벡터 저장소로)</strong>: 체인 기반 시스템 내에서 노드를 검색기로 사용합니다.</li>
<li><strong>문서 검색(AI 에이전트의 도구로)</strong>: 질문 답변 작업 중 AI 에이전트를 위한 도구 리소스로 노드를 사용합니다.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">추가 노드 옵션</h3><ul>
<li><strong>메타데이터 필터</strong> (다수 가져오기 모드만 해당): 사용자 지정 메타데이터 키를 기준으로 결과를 필터링합니다. 여러 필드에 AND 조건을 적용합니다.</li>
<li><strong>컬렉션 지우기</strong> (문서 삽입 모드만 해당): 새 문서를 삽입하기 전에 컬렉션에서 기존 문서를 제거합니다.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">관련 리소스</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus 통합 문서</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">LangChain Milvus 문서</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">n8n 고급 AI 문서</a></li>
</ul>
