---
id: search_with_jev.md
summary: >-
  벡터 검색은 쿼리와 관련된 정보를 찾아냅니다. 유용한 검색 애플리케이션을 구축하는 과정에는 다음과 같은 결정 사항들이 수반됩니다. 어떤
  구절이 실제로 질문에 대한 답을 제공하는지, 이전의 답변을 재사용할 수 있는지, 그리고 에이전트가 검색을 중단할 만큼 충분한 증거를
  확보했는지 여부 등입니다.
title: Milvus + PII Masker를 사용하여 RAG 구축하기
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Jev와 Milvus를 이용한 검색<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>벡터 검색은 쿼리와 관련된 정보를 찾아냅니다. 유용한 검색 애플리케이션을 구축하려면 어떤 구절이 실제로 질문에 답하는지, 이전 답변을 재사용할 수 있는지, 에이전트가 검색을 중단할 만큼 충분한 증거를 확보했는지 등의 결정을 내려야 합니다.</p>
<p>Milvus와 Jev는 이 워크플로우의 서로 다른 부분을 담당합니다. <a href="https://milvus.io/">Milvus는</a> 임베딩을 저장하고 후보 레코드를 검색하며, 제품 버전이나 지식베이스 범위와 같은 제약 조건을 위한 메타데이터 필터를 제공합니다. <a href="https://docs.typesafe.ai/introduction">Jev는</a> 검색된 텍스트의 의미를 지침에 따라 평가합니다. 애플리케이션은 Jev의 판단 결과를 활용하여 증거를 선택하거나 다음 검색 단계를 제어할 수 있습니다.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Jev는 무엇을 하나요?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Jev 요청은 컨텍스트와 하나 이상의 판단 질문을 제공합니다. Jev의 <a href="https://docs.typesafe.ai/primitives">유형화된 출력에는</a> 고정된 옵션 중 하나 선택, 순위가 매겨진 점수, 그리고 ‘예/아니오’ 확률이 포함됩니다. 이러한 출력을 통해 애플리케이션 코드는 자유 형식의 설명을 분석하지 않고도 결정을 내릴 수 있습니다. 필요한 경우 생성 모델이 답변이나 후속 검색 쿼리를 작성할 수도 있습니다.</p>
<p>예를 들어, 사용자가 Atlas v2를 설치하는 방법을 묻는 경우, Milvus는 검색 범위를 v2 문서로 제한하고 설치, 업그레이드, 문제 해결에 관한 유사한 구절들을 반환할 수 있습니다. 그런 다음 Jev는 어떤 구절이 초기 설치를 설명하는지 평가합니다. 애플리케이션은 선택된 증거를 답변 생성 모델로 전달합니다.</p>
<p>각 모델의 역할은 명확합니다:</p>
<ol>
<li><strong>Milvus를 통한 검색:</strong> 필요한 메타데이터 제약 조건 내에서 후보를 찾습니다.</li>
<li><strong>Jev를 통한 판단:</strong> 질문과 작업별 기준에 따라 후보들을 평가합니다.</li>
<li><strong>애플리케이션 코드에서 처리:</strong> 결과 재정렬, 컨텍스트 필터링, 답변 재사용 또는 검색 계속.</li>
</ol>
<p>일부 결정은 검색 전에 이루어집니다. Jev는 검색 범위를 선택하거나, 문서가 컬렉션에 포함되기 전에 이를 평가할 수 있습니다. 접근 제어와 정확한 필터링은 여전히 애플리케이션의 책임입니다.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">검색 시나리오 살펴보기<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">'Jev를 이용한 검색' 컬렉션에는</a> 실행 가능한 9개의 튜토리얼이 포함되어 있습니다. 각 튜토리얼은 소규모의 합성 데이터셋을 사용하며, 검색된 레코드, 판단 결과 및 그에 따른 조치를 보여줍니다.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">더 나은 증거 선택<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">검색 결과 재순위 지정</a>: 문서 및 코딩 에이전트의 기억을 재정렬합니다. 노트북 포트 오류에 대한 기억은 컨테이너 연결 문제와 유사할 수 있지만, 더 유용한 기억은 실제 컨테이너-호스트 수정 방법을 기록합니다.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">검색된 컨텍스트 필터링</a>: Milvus가 버전 필터를 적용한 후, 초기 설치 지침을 업그레이드 및 문제 해결 관련 구절과 구별합니다.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">그래프 관계 재순위 지정</a>: 책과 저자 간의 연결 고리와 저자와 출생지 간의 관계를 모두 선택하여 책 저자의 출생지에 대한 질문에 답한 다음, 원본 구절을 가져올 때 해당 순위를 유지합니다.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">검색 및 답변 재사용 제어<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">검색 중단 시점 결정</a>: 생성 모델은 축적된 증거를 바탕으로 검색을 제안하는 반면, Jev는 원래 질문에 답할 수 있는지 여부를 판단합니다. 예시에는 직접적인 답변, 2단계 연결이 필요한 질문, 그리고 답변 없이 검색 한도에 도달하는 이용 불가능한 사실이 포함됩니다.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">검색 쿼리 경로</a> 지정: 문서, 청구 또는 메모리 검색을 선택한 다음, 해당 Milvus 필터를 적용합니다. 범위 외 쿼리는 별도의 경로를 따릅니다.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">의미적 캐시 재사용 검증</a>: 유사한 캐시된 요청을 검색한 후, 해당 답변이 새로운 요청의 과제, 언어 및 문맥 요구 사항도 충족하는지 확인합니다.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">지식 파이프라인 개선 및 점검<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">색인 생성 전 문서 선별</a>: 별도의 색인 생성, 검토 및 제외 조치를 통해 실질적인 운영 지침을 홍보용 또는 불완전한 자료와 구분합니다.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">검색된 문장 선별</a>: 일반적인 보안 조언은 유지하면서, 어시스턴트를 다른 곳으로 유도하려는 텍스트를 식별합니다. 이는 추가적인 선별 단계일 뿐, 보안 보장을 의미하지는 않습니다.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">검색 근거 평가</a>: 문단의 관련성, 근거가 충분한지 여부, 답변에 근거 없는 주장이 포함되어 있는지 여부를 판단합니다. 예시에서는 구별을 명확히 하기 위해 의도적으로 근거를 제거하거나 근거 없는 진술을 추가했습니다.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">기성 재순위 지정 인터페이스<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model은</a> 애플리케이션 측에서 사용할 수 있는 <code translate="no">JevRerankFunction</code> 를 제공합니다. 쿼리와 후보 문서 텍스트를 전달하면, 관련성 순으로 정렬된 원본 인덱스와 함께 점수화된 결과를 받을 수 있습니다. 해당 인덱스를 사용하여 Milvus가 반환한 레코드의 순서를 재정렬하십시오.</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">Jev 통합 기능이</a> 병합되었습니다. 현재 API의 <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">구현 및 생성자 옵션을</a> 참조하십시오. 이 기능은 <code translate="no">TYPESAFE_API_KEY</code> 를 지원하며, 기본값은 <code translate="no">jev-latest</code> 입니다. 이 통합 기능이 포함된 패키지 버전을 사용하십시오.</p>
<p>현재 래퍼는 ‘주장-증거(claim-and-evidence)’ 관련성 프롬프트를 사용합니다. 이 기준이 작업에 적합한지 확인하십시오. 메모리 호환성, 중지(stopping) 또는 라우팅(routing)과 같은 사용자 정의 판단의 경우, 링크된 튜토리얼을 따라 TypeSafe API를 직접 사용하십시오. 튜토리얼에서는 Python 애플리케이션 코드에서 API를 직접 호출하는 방법을 보여줍니다.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Milvus에서 직접 사용해 보세요<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Colab에서 재순위 지정 튜토리얼을 열어</a> 후보 검색 및 순위 지정을 시작해 보세요. 로컬 설정 및 전체 튜토리얼 목록은 <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">컬렉션의 README를</a> 참조하세요.</p>
<p>예제에서는 임베딩을 위해 <a href="https://aistudio.google.com/apikey">Gemini API 키를</a>, Jev를 위해 <a href="https://console.typesafe.ai/">TypeSafe API 키를</a> 사용합니다. agentic-search 튜토리얼에서도 쿼리 및 답변 생성에 Gemini를 사용합니다. 샘플 텍스트가 이러한 API 제공업체로 전송되며, 호출 시 크레딧이 소모될 수 있습니다.</p>
<p>튜토리얼은 기본적으로 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite에서</a> 실행되며, Milvus 서버 또는 <a href="https://zilliz.com/cloud">Zilliz Cloud에</a> 연결하는 옵션이 포함되어 있습니다. 배포 환경에 관계없이 동일한 업무 분담 방식이 적용됩니다. 즉, Milvus가 후보를 검색하고, 애플리케이션이 관련 텍스트를 Jev로 전송하여 판단을 받습니다.</p>
<p>이 예제들을 여러분만의 기준과 임계값을 설정하는 출발점으로 삼으시기 바랍니다. 관련성 점수가 답변의 정확성을 보장하는 것은 아니며, 이러한 소규모 교육용 데이터셋만으로는 실제 운영 환경에서의 정확도나 속도를 보장할 수 없습니다.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">구현 사례 및 평가 결과 살펴보기<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 오픈소스 프로젝트들은 이러한 아이디어를 더 큰 규모의 검색 워크플로우에 적용합니다. 링크된 보고서에서는 각 실험의 데이터셋, 비교 결과 및 한계를 설명하고 있습니다.</p>
<table>
<thead>
<tr><th>프로젝트</th><th>검색 사용 사례</th><th>Jev 작업</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>코딩 에이전트를 위한 영구 마크다운 메모리</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Jev 구현</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">평가</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">벡터 그래프 RAG</a></td><td>다중 홉 질문을 위한 벡터 및 그래프 검색</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Jev 구현</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">평가</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>비공개 지식에 대한 반복적 검색</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">실험 실행기</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">검색 중단 평가</a> (독립 실행 실험)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>호환 가능한 요청에 대한 답변 재사용</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Jev 구현</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">평가</a></td></tr>
</tbody>
</table>
<p>DeepSearcher의 기여는 독립형 검색 중지 실험입니다. 다른 구현체 링크들은 특정 작업에 특화된 Jev 통합 사례를 보여줍니다. 이러한 프로젝트의 결과는 공통 벤치마크로 취급하기보다는 각 프로젝트 고유의 평가 맥락에서 해석해야 합니다.</p>
