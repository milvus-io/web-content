---
id: audio_similarity_search.md
summary: Milvus로 오디오 유사도 검색 시스템을 구축하세요.
title: 오디오 유사도 검색
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">오디오 유사도 검색<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용하여 오디오 유사도 검색 시스템을 구축하는 방법을 설명합니다.</p>
<p>사용된 ML 모델과 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li>PANN(대규모 사전 학습된 오디오 신경망)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>음성, 음악, 음향 효과 및 기타 유형의 오디오 검색을 통해 방대한 양의 오디오 데이터를 빠르게 쿼리하고 유사한 소리를 찾아낼 수 있습니다. 오디오 유사성 검색 시스템의 응용 분야에는 유사한 음향 효과 식별, IP 침해 최소화 등이 포함됩니다. 오디오 검색은 온라인 미디어를 실시간으로 검색하고 모니터링하여 지적 재산권 침해를 단속하는 데 사용할 수 있습니다. 또한 오디오 데이터의 분류 및 통계 분석에서도 중요한 역할을 담당합니다.</p>
<p></br></p>
<p>이 튜토리얼에서는 유사한 사운드 클립을 반환할 수 있는 오디오 유사도 검색 시스템을 구축하는 방법을 배웁니다. 업로드된 오디오 클립은 PANN을 사용해 벡터로 변환됩니다. 이러한 벡터는 각 벡터에 대한 고유 ID를 자동으로 생성하는 Milvus에 저장됩니다. 그런 다음 사용자는 Milvus에서 벡터 유사도 검색을 수행하고 Milvus가 반환한 고유 벡터 ID에 해당하는 오디오 클립 데이터 경로를 쿼리할 수 있습니다.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>오디오_검색</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>오디오_검색_데모</span> </span></p>
