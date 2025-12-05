---
id: recommendation_system.md
summary: Milvus로 개인화된 추천 시스템을 구축하세요.
title: 추천 시스템
---
<h1 id="Recommender-System" class="common-anchor-header">추천 시스템<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용하여 추천 시스템을 구축하는 방법을 설명합니다.</p>
<p>사용된 ML 모델과 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li>패들패들</li>
<li>Redis 또는 MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>추천 시스템은 정보 필터링 시스템의 하위 집합으로, 개인화된 영화, 음악, 제품, 피드 스트림 추천 등 다양한 시나리오에서 사용할 수 있습니다. 추천 시스템은 검색 엔진과 달리 사용자가 자신의 요구 사항을 정확하게 설명하지 않아도 사용자 행동을 분석하여 사용자의 요구 사항과 관심사를 발견합니다.</p>
<p></br></p>
<p>이 튜토리얼에서는 사용자의 관심사에 맞는 영화를 추천할 수 있는 영화 추천 시스템을 구축하는 방법을 배웁니다. 이러한 추천 시스템을 구축하려면 먼저 영화 관련 데이터 세트를 다운로드합니다. 이 튜토리얼에서는 MovieLens 1M을 사용합니다. 또는 사용자의 영화 평점, 사용자의 인구통계학적 특성, 영화 설명 등의 정보를 포함하는 자체 데이터 세트를 준비할 수도 있습니다. 패들패들을 사용하여 사용자 ID와 특징을 결합하고 256차원 벡터로 변환합니다. 비슷한 방식으로 영화 ID와 특징을 벡터로 변환합니다. 동영상 벡터를 Milvus에 저장하고 유사도 검색에 사용자 벡터를 사용합니다. 사용자 벡터가 영화 벡터와 유사하면 Milvus는 추천 결과로 영화 벡터와 해당 ID를 반환합니다. 그런 다음 Redis 또는 MySQL에 저장된 무비 벡터 ID를 사용하여 무비 정보를 쿼리합니다.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>추천자_시스템</span> </span></p>
