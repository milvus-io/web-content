---
id: architecture_overview.md
summary: Milvus는 유사도 검색과 인공 지능을 위해 특별히 구축된 빠르고 안정적이며 안정적인 벡터 데이터베이스를 제공합니다.
title: Milvus 아키텍처 개요
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvus 아키텍처 개요<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 수백만, 수십억, 심지어 수조 개의 벡터가 포함된 고밀도 벡터 데이터 세트에 대한 유사도 검색을 위해 설계된 것으로 Faiss, HNSW, DiskANN, SCANN 등 널리 사용되는 벡터 검색 라이브러리를 기반으로 구축되었습니다. 계속 진행하기 전에 임베딩 검색의 <a href="/docs/ko/v2.4.x/glossary.md">기본 원칙을</a> 숙지하세요.</p>
<p>Milvus는 데이터 샤딩, 스트리밍 데이터 수집, 동적 스키마, 벡터와 스칼라 데이터 결합 검색, 다중 벡터 및 하이브리드 검색, 스파스 벡터 및 기타 여러 고급 기능도 지원합니다. 이 플랫폼은 온디맨드 성능을 제공하며 모든 임베딩 검색 시나리오에 맞게 최적화할 수 있습니다. 최적의 가용성과 탄력성을 위해 Kubernetes를 사용해 Milvus를 배포하는 것이 좋습니다.</p>
<p>Milvus는 컴퓨팅 노드에 스토리지 및 컴퓨팅 분리와 수평적 확장성을 갖춘 공유 스토리지 아키텍처를 채택하고 있습니다. 데이터 플레인과 제어 플레인 분리 원칙에 따라 Milvus는 액세스 레이어, 코디네이터 서비스, 워커 노드, 스토리지의 <a href="/docs/ko/v2.4.x/four_layers.md">네 가지 레이어로</a> 구성됩니다. 이러한 계층은 확장 또는 재해 복구와 관련하여 상호 독립적입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>아키텍처_도표</span> </span></p>
<p>그림에 따르면 인터페이스는 다음과 같은 카테고리로 분류할 수 있습니다:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce:</strong> 삽입 / 삭제 / 업서트</li>
<li><strong>DQL:</strong> 검색 / 쿼리</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvus의 <a href="/docs/ko/v2.4.x/four_layers.md">컴퓨팅/스토리지 세분화에</a> 대해 자세히 알아보기</li>
<li>Milvus의 <a href="/docs/ko/v2.4.x/main_components.md">주요 구성 요소에</a> 대해 알아보세요.</li>
</ul>
