---
id: video_similarity_search.md
summary: Milvus로 동영상 유사도 검색 시스템을 구축하세요.
title: 동영상 유사도 검색
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">동영상 유사도 검색<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용하여 동영상 유사도 검색 시스템을 구축하는 방법을 보여드립니다.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Jupyter 노트북 열기</a></li>
</ul>
<p>사용된 머신러닝 모델과 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>요즘 사람들은 좋아하는 영화나 동영상을 본 후 스크린샷을 찍어 다양한 소셜 네트워킹 플랫폼에 게시하여 자신의 생각을 쉽게 공유할 수 있습니다. 팔로워가 스크린샷을 볼 때 게시물에 영화 이름이 명시되어 있지 않으면 어떤 영화인지 알기가 정말 어려울 수 있습니다. 영화 이름을 파악하기 위해 사람들은 동영상 유사성 검색 시스템을 활용할 수 있습니다. 이 시스템을 사용하면 이미지를 업로드하고 업로드한 이미지와 유사한 키 프레임이 포함된 동영상 또는 영화를 얻을 수 있습니다.</p>
<p><br/></p>
<p>이 튜토리얼에서는 동영상 유사도 검색 시스템을 구축하는 방법을 배웁니다. 이 튜토리얼에서는 Tumblr에 있는 약 100개의 애니메이션 GIF를 사용하여 시스템을 구축합니다. 그러나 자체 동영상 데이터 세트를 준비할 수도 있습니다. 이 시스템은 먼저 OpenCV를 사용하여 동영상에서 키 프레임을 추출한 다음 ResNet-50을 사용하여 각 키 프레임의 특징 벡터를 얻습니다. 모든 벡터는 Milvus에 저장되고 검색되어 유사한 벡터의 ID를 반환합니다. 그런 다음 ID를 MySQL에 저장된 해당 동영상에 매핑합니다.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>동영상_검색</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>동영상_검색_데모</span> </span></p>
