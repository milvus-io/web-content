---
id: install-overview.md
summary: >-
  Milvus는 확장성이 뛰어난 고성능 벡터 데이터베이스입니다. Jupyter Notebook에서 로컬로 실행되는 데모부터 수백억 개의 벡터를
  처리하는 대규모 Kubernetes 클러스터에 이르기까지 다양한 규모의 사용 사례를 지원합니다. 현재 Milvus 배포 옵션은 Milvus
  Lite, Milvus Standalone, Milvus Distributed의 세 가지가 있습니다.
title: Milvus 배포 옵션 개요
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Milvus 배포 옵션 개요<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 확장성이 뛰어난 고성능 벡터 데이터베이스입니다. Jupyter Notebook에서 로컬로 실행되는 데모부터 수백억 개의 벡터를 처리하는 대규모 Kubernetes 클러스터에 이르기까지 다양한 규모의 사용 사례를 지원합니다. 현재 Milvus 배포 옵션은 세 가지가 있습니다: Milvus Lite, Milvus Standalone, Milvus Distributed.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite는</a> 애플리케이션으로 가져올 수 있는 Python 라이브러리입니다. Milvus의 경량 버전으로, Jupyter Notebook에서 빠르게 프로토타이핑하거나 리소스가 제한된 스마트 기기에서 실행하는 데 이상적입니다. Milvus Lite는 다른 Milvus 배포와 동일한 API를 지원합니다. Milvus Lite와 상호 작용하는 클라이언트 측 코드는 다른 배포 모드의 Milvus 인스턴스에서도 작동할 수 있습니다.</p>
<p>Milvus Lite를 애플리케이션에 통합하려면 <code translate="no">pip install pymilvus</code> 을 실행하여 설치하고 <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> 문을 사용하여 모든 데이터를 보존하는 로컬 파일로 벡터 데이터베이스를 인스턴스화하세요. 자세한 내용은 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite 실행을</a> 참조하세요.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus 독립형<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone은 단일 머신 서버 배포입니다. Milvus Standalone의 모든 구성 요소는 단일 <a href="https://milvus.io/docs/install_standalone-docker.md">Docker 이미지에</a> 포함되어 있어 배포가 편리합니다. 프로덕션 워크로드가 있지만 Kubernetes를 사용하지 않으려는 경우, 충분한 메모리가 있는 단일 머신에서 Milvus Standalone을 실행하는 것이 좋은 옵션입니다.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus 배포<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed는 <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> 클러스터에 배포할 수 있습니다. 이 배포는 클라우드 네이티브 아키텍처를 특징으로 하며, 수집 로드와 검색 쿼리가 격리된 노드에서 개별적으로 처리되어 중요한 구성 요소에 대한 중복성을 허용합니다. 또한 최고의 확장성과 가용성을 제공할 뿐만 아니라 각 구성 요소에 할당된 리소스를 유연하게 사용자 정의할 수 있습니다. Milvus Distributed는 프로덕션 환경에서 대규모 벡터 검색 시스템을 실행하는 기업 사용자에게 최고의 선택입니다.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">사용 사례에 적합한 배포 선택하기<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>배포 모드의 선택은 일반적으로 애플리케이션의 개발 단계에 따라 달라집니다:</p>
<ul>
<li><p><strong>빠른 프로토타이핑용</strong></p>
<p>검색 증강 생성(RAG) 데모, AI 챗봇, 다중 양식 검색과 같이 프로토타입으로 또는 학습 목적으로 무언가를 빠르게 구축하려는 경우, Milvus Lite 자체 또는 Milvus Lite와 Milvus Standalone의 조합이 적합합니다. 노트북에서 Milvus Lite를 사용하여 신속한 프로토타입을 제작하고 RAG에서 다양한 청킹 전략과 같은 다양한 접근 방식을 탐색할 수 있습니다. 실제 사용자에게 서비스를 제공하거나 수백만 개 이상의 벡터와 같은 대규모 데이터 세트에서 아이디어를 검증하기 위해 Milvus Lite로 구축한 애플리케이션을 소규모 프로덕션에 배포하고 싶을 수도 있습니다. Milvus Standalone이 적합합니다. 모든 Milvus 배포에는 동일한 클라이언트 측 API가 있으므로 Milvus Lite의 애플리케이션 로직은 여전히 공유할 수 있습니다. 또한 명령줄 도구를 사용하여 Milvus Lite에 저장된 데이터를 Milvus Standalone으로 포팅할 수도 있습니다.</p></li>
<li><p><strong>소규모 프로덕션 배포</strong></p>
<p>프로젝트가 아직 제품 시장 적합성을 추구하고 확장성보다 민첩성이 더 중요한 초기 단계 프로덕션의 경우 Milvus Standalone이 최선의 선택입니다. 머신 리소스가 충분하다면 최대 1억 개의 벡터까지 확장할 수 있으며, K8s 클러스터를 유지하는 것보다 훨씬 적은 데브옵스가 필요합니다.</p></li>
<li><p><strong>대규모 프로덕션 배포</strong></p>
<p>비즈니스가 빠르게 성장하고 데이터 규모가 단일 서버의 용량을 초과하는 경우, Milvus Distributed를 고려해야 할 때입니다. 편리한 개발 또는 스테이징 환경에는 Milvus Standalone을 계속 사용하고, Milvus Distributed를 실행하는 K8s 클러스터를 운영할 수 있습니다. 이렇게 하면 수백억 개의 벡터를 지원할 수 있을 뿐만 아니라 읽기 빈도가 높고 쓰기가 잦은 경우나 쓰기 빈도가 높고 읽기가 적은 경우 등 특정 워크로드에 맞게 노드 크기를 조정할 수 있는 유연성을 제공할 수 있습니다.</p></li>
<li><p><strong>엣지 디바이스에서 로컬 검색</strong></p>
<p>엣지 디바이스에서 비공개 또는 민감한 자료를 검색할 경우, 클라우드 기반 서비스에 의존하지 않고 디바이스에 Milvus Lite를 배포하여 텍스트 또는 이미지 검색을 수행할 수 있습니다. 이는 독점 문서 검색 또는 디바이스 내 개체 감지와 같은 경우에 적합합니다.</p></li>
</ul>
<p>Milvus 배포 모드의 선택은 프로젝트의 단계와 규모에 따라 달라집니다. Milvus는 신속한 프로토타이핑부터 대규모 엔터프라이즈 배포까지 다양한 요구에 맞는 유연하고 강력한 솔루션을 제공합니다.</p>
<ul>
<li>최대 수백만 개의 벡터가 포함된 소규모 데이터 세트에는 Milvus<strong>Lite를</strong> 사용하는 것이 좋습니다.</li>
<li><strong>Milvus Standalone은</strong> 최대 1억 개의 벡터까지 확장할 수 있는 중간 규모의 데이터 세트에 적합합니다.</li>
<li><strong>Milvus Distributed는</strong> 대규모 배포를 위해 설계되었으며, 1억 개에서 수백억 개의 벡터까지 데이터 세트를 처리할 수 있습니다.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>사용 사례에 맞는 배포 옵션 선택</span> </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">기능 비교<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>기능</th><th>Milvus Lite</th><th>Milvus 독립형</th><th>Milvus 배포</th></tr>
</thead>
<tbody>
<tr><td>SDK / 클라이언트 라이브러리</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>데이터 유형</td><td>고밀도 벡터<br/>스파스 벡터<br/>바이너리 벡터<br/>부울<br/>정수<br/>부동 소수점<br/>VarChar<br/>배열<br/>JSON</td><td>고밀도 벡터<br/>스파스 벡터<br/>바이너리 벡터<br/>부울<br/>정수<br/>부동 소수점<br/>VarChar<br/>배열<br/>JSON</td><td>밀도 벡터<br/>스파스 벡터<br/>이진 벡터<br/>부울<br/>정수<br/>부동 소수점<br/>VarChar<br/>배열<br/>JSON</td></tr>
<tr><td>검색 기능</td><td>벡터 검색(ANN 검색)<br/>메타데이터 필터링<br/>범위 검색<br/>스칼라 쿼리<br/>기본 키로 엔티티 가져오기<br/>하이브리드 검색</td><td>벡터 검색(ANN 검색)<br/>메타데이터 필터링<br/>범위 검색<br/>스칼라 쿼리<br/>기본 키로 엔티티 가져오기<br/>하이브리드 검색</td><td>벡터 검색(ANN 검색)<br/>메타데이터 필터링<br/>범위 검색<br/>스칼라 쿼리<br/>기본 키로 엔티티 가져오기<br/>하이브리드 검색</td></tr>
<tr><td>CRUD 작업</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>고급 데이터 관리</td><td>N/A</td><td>액세스 제어<br/>파티션<br/>파티션 키</td><td>액세스 제어<br/>파티션<br/>파티션 키<br/>물리적 리소스 그룹화</td></tr>
<tr><td>일관성 수준</td><td>Strong</td><td>강함<br/>바운드 스탤런트<br/>세션<br/>최종</td><td>강함<br/>바운드 스탤렌니스<br/>세션<br/>최종</td></tr>
</tbody>
</table>
