---
id: install-overview.md
summary: >-
  워크로드, 가용성 요구 사항 및 운영 환경에 따라 Milvus Lite, Standalone 또는 Distributed 중 하나를
  선택하십시오.
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
    </button></h1><p>Milvus는 로컬 프로토타입 및 대규모 벡터 검색 서비스를 지원합니다. 데이터, 읽기 및 쓰기 부하, 가용성 요구 사항, 운영 환경에 따라 Milvus Lite, Milvus Standalone, Milvus Distributed 중에서 선택하십시오.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite는</a> 애플리케이션에 임포트할 수 있는 Python 라이브러리입니다. Milvus의 경량 버전으로서, Jupyter Notebook에서 신속하게 프로토타입을 제작하거나 리소스가 제한된 스마트 기기에서 실행하는 데 이상적입니다. Milvus Lite는 다른 Milvus 배포 방식과 동일한 API를 지원합니다. Milvus Lite와 상호작용하는 클라이언트 측 코드는 다른 배포 모드의 Milvus 인스턴스에서도 작동할 수 있습니다.</p>
<p>로컬 예제의 경우 Python 3.10 이상을 사용하고, 선택적 Lite 종속성을 명시적으로 설치하십시오. Windows에서는 pip가 ` <code translate="no">milvus-lite</code> ` 추가 항목을 건너뛰므로, 패키지 이름을 명시적으로 지정해야 합니다:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> 를 사용하여 로컬 스토리지를 열 수 있습니다. Milvus Lite 3.x는 이 경로에 디렉터리를 생성하며, 기존 Milvus Lite 2.x 데이터베이스 파일은 내보내기 및 마이그레이션이 필요합니다. 플랫폼 요구 사항은 <a href="/docs/ko/milvus_lite.md">‘Milvus Lite 실행’을</a>, 삽입 및 검색에 대한 전체 예제는 <a href="/docs/ko/quickstart.md">‘빠른 시작’을</a> 참조하십시오.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone은 단일 머신 서버 배포 방식입니다. Milvus Standalone의 모든 구성 요소가 단일 <a href="https://milvus.io/docs/install_standalone-docker.md">Docker 이미지에</a> 포함되어 있어 배포가 편리합니다. 프로덕션 워크로드를 처리해야 하지만 쿠버네티스를 사용하지 않으려는 경우, 충분한 메모리를 갖춘 단일 머신에서 Milvus Standalone을 실행하는 것이 좋은 선택입니다. 기본적으로 Milvus Standalone은 메시지 큐로 <strong>Woodpecker</strong> (내장형)를 사용하므로 별도의 메시징 서비스를 운영할 필요가 없습니다.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed는 <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">쿠버네티스</a> 클러스터에 배포할 수 있습니다. 이 배포 방식은 클라우드 네이티브 아키텍처를 특징으로 하며, 데이터 수집 부하와 검색 쿼리가 격리된 노드에서 각각 처리되므로 핵심 구성 요소에 대한 중복성을 확보할 수 있습니다. 또한 최고의 확장성과 가용성을 제공할 뿐만 아니라, 각 구성 요소에 할당된 리소스를 유연하게 맞춤 설정할 수 있습니다. Milvus Distributed는 프로덕션 환경에서 대규모 벡터 검색 시스템을 운영하는 기업 사용자에게 최적의 선택입니다. 기본적으로 Milvus Distributed는 <strong>Woodpecker를</strong> 메시지 큐로 사용하며, 이는 Milvus와 함께 전용 서비스로 배포됩니다.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">사용 사례에 적합한 배포 방식 선택<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<li><p><strong>신속한 프로토타이핑을 위한 경우</strong></p>
<p>노트북에서 Milvus Lite를 사용하여 임베딩, RAG 청킹 전략 및 검색 동작을 테스트하십시오. 공유 서버가 필요하거나 측정된 메모리 및 쿼리 부하가 로컬 환경을 초과할 경우 Milvus Standalone으로 전환하십시오. 클라이언트 API는 유사하지만, 기능 차이를 확인하고 저장된 데이터는 별도로 마이그레이션해야 합니다.</p></li>
<li><p><strong>소규모 프로덕션 배포</strong></p>
<p>단일 서버로 워크로드 및 가용성 요구 사항을 충족할 수 있고, Kubernetes 없이 운영하기를 원할 경우 Milvus Standalone을 사용하십시오. 벡터 차원, 스칼라 필드, 인덱스 설정 및 복제본 수를 바탕으로 메모리 용량을 추정한 다음, 예상 쿼리 동시 처리량과 쓰기 속도를 벤치마킹하십시오. 벡터 개수만으로는 용량을 확정할 수 없습니다.</p></li>
<li><p><strong>대규모 프로덕션 배포</strong></p>
<p>비즈니스가 급속히 성장하고 데이터 규모가 단일 서버의 용량을 초과하게 되면, Milvus Distributed를 고려해야 할 시점입니다. 편의성을 위해 개발 또는 스테이징 환경에서는 Milvus Standalone을 계속 사용하면서, Milvus Distributed를 실행하는 K8s 클러스터를 운영할 수 있습니다. 이를 통해 수백억 개의 벡터까지 처리할 수 있을 뿐만 아니라, 읽기 빈도가 높고 쓰기 빈도가 낮은 경우나 쓰기 빈도가 높고 읽기 빈도가 낮은 경우 등 특정 워크로드에 맞춰 노드 크기를 유연하게 조정할 수 있습니다.</p></li>
<li><p><strong>엣지 디바이스에서의 로컬 검색</strong></p>
<p>엣지 디바이스에서 비공개 또는 민감한 데이터를 검색해야 하는 경우, 클라우드 기반 서비스에 의존하지 않고 디바이스에 Milvus Lite를 배포하여 텍스트나 이미지 검색을 수행할 수 있습니다. 이는 독점 문서 검색이나 디바이스 내 객체 탐지 등의 경우에 적합합니다.</p></li>
</ul>
<p>Milvus 배포 모드의 선택은 프로젝트의 단계와 규모에 따라 달라집니다. Milvus는 신속한 프로토타이핑부터 대규모 기업 배포에 이르기까지 다양한 요구 사항에 대응할 수 있는 유연하고 강력한 솔루션을 제공합니다.</p>
<ul>
<li><strong>Milvus Lite는</strong> 단일 애플리케이션의 리소스 내에서 로컬 평가 및 워크로드를 처리하는 데 적합합니다.</li>
<li><strong>Milvus Standalone은</strong> 단일 서버가 측정된 용량 및 가용성 요구 사항을 충족할 때 공유 서비스를 제공합니다.</li>
<li><strong>Milvus Distributed는</strong> 서버 한 대를 넘어 확장해야 하거나 읽기 및 쓰기 리소스를 분리해야 할 때 구성 요소 수준의 확장성과 중복성을 제공합니다.</li>
</ul>
<p>Milvus Standalone 및 Distributed는 메시지 큐, 오브젝트 스토리지, 메타데이터 저장소를 사용합니다. Milvus Lite는 이러한 별도의 서비스 없이 로컬에서 실행됩니다. 서버 배포의 기본 종속성 및 외부 서비스 옵션에 대해서는 <a href="/docs/ko/data-infra-integration-overview.md">‘데이터 인프라’를</a> 참조하십시오.</p>
<p>서버 인프라를 직접 운영하기보다는 관리형 서비스를 원하신다면 <a href="https://zilliz.com/cloud">Zilliz Cloud를</a> 고려해 보십시오. 직접 배포를 원하신다면 <a href="/docs/ko/install_standalone-docker.md">Docker</a> 또는 <a href="/docs/ko/install_cluster-milvusoperator.md">Kubernetes</a>로 진행하십시오.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>사용 사례에 맞는 배포 옵션 선택</span>
  
 </span></p>
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
    </button></h2><p>'Lite' 열은 Milvus Lite 3.2.2 버전을 설명합니다. 로컬 애플리케이션에서 서버 기능을 활용하기 전에 <a href="/docs/ko/milvus_lite.md#Supported-features-and-limits">Milvus Lite의 제한 사항을</a> 확인하십시오.</p>
<table>
<thead>
<tr><th>기능</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / 클라이언트 라이브러리</td><td>Python (로컬 PyMilvus 어댑터)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>데이터 유형</td><td>밀집 벡터<br/>희소 벡터<br/>부울<br/>정수<br/>부동 소수점<br/>VarChar<br/>배열<br/>JSON</td><td>밀집 벡터<br/>희소 벡터<br/>이진 벡터<br/>부울<br/>정수<br/>부동 소수점<br/>VarChar<br/>배열<br/>JSON</td><td>밀집 벡터<br/>희소 벡터<br/>이진 벡터<br/>부울<br/>정수<br/>부동 소수점<br/>VarChar<br/>배열<br/>JSON</td></tr>
<tr><td>검색 기능</td><td>벡터 검색(ANN 검색)<br/>메타데이터 필터링<br/>범위 검색<br/>스칼라 쿼리<br/>기본 키로 엔티티 가져오기<br/>하이브리드 검색</td><td>벡터 검색 (ANN 검색)<br/>메타데이터 필터링<br/>범위 검색<br/>스칼라 쿼리<br/>기본 키를 통한 엔티티 가져오기<br/>하이브리드 검색</td><td>벡터 검색 (ANN 검색)<br/>메타데이터 필터링<br/>범위 검색<br/>스칼라 쿼리<br/>기본 키를 통한 엔티티 가져오기<br/>하이브리드 검색</td></tr>
<tr><td>CRUD 작업</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>고급 데이터 관리</td><td>데이터베이스<br/>파티션<br/>별칭<br/>접근 제어 없음</td><td>액세스 제어<br/>파티션<br/>파티션 키</td><td>액세스 제어<br/>파티션<br/>파티션 키<br/>물리적 리소스 그룹화</td></tr>
<tr><td>일관성 수준</td><td>해당 없음: 단일 로컬 프로세스가 모든 요청을 처리함; <code translate="no">consistency_level</code> 는 허용되지만 효과가 없음</td><td>강력한<br/>제한된 유효기간<br/>세션<br/>최종</td><td>강력한<br/>유한한 유효기간<br/>세션<br/>최종</td></tr>
<tr><td>메시지 큐</td><td>해당 없음</td><td>Woodpecker (임베디드)</td><td>Woodpecker (서비스)</td></tr>
</tbody>
</table>
