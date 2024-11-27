---
id: image_deduplication_system.md
summary: Milvus로 이미지 중복 제거 시스템을 구축하세요.
title: 이미지 중복 제거
---
<h1 id="Image-Deduplication" class="common-anchor-header">이미지 중복 제거<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용하여 이미지 중복 제거 시스템을 구축하는 방법을 보여드립니다.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">노트북 열기</a></li>
</ul>
<p>사용된 ML 모델과 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>최근 몇 년 동안 사용자 제작 콘텐츠가 기하급수적으로 폭발적으로 증가하고 있습니다. 사람들은 자신이 찍은 사진을 소셜 미디어 플랫폼에 즉시 업로드할 수 있습니다. 하지만 이미지 데이터가 워낙 풍부하다 보니 중복된 콘텐츠도 많습니다. 사용자 경험을 개선하기 위해서는 이러한 중복된 이미지를 제거해야 합니다. 이미지 중복 제거 시스템을 사용하면 데이터베이스의 이미지를 일일이 비교하여 중복 이미지를 골라내는 수작업을 줄일 수 있습니다. 정확히 동일한 이미지를 골라내는 것은 전혀 복잡한 작업이 아닙니다. 그러나 때로는 사진을 확대하거나 자르거나 밝기나 회색조를 조정할 수 있습니다. 이미지 중복 제거 시스템은 이러한 유사한 이미지를 식별하여 제거해야 합니다.</p>
<p>이 튜토리얼에서는 이미지 중복 제거 시스템을 구축하는 방법을 배웁니다. 이 튜토리얼에서는 ResNet-50 모델을 사용하여 이미지의 특징을 추출하고 이를 벡터로 변환합니다. 그런 다음 이러한 이미지 벡터를 Milvus 벡터 데이터베이스에 저장하고 Milvus에서도 벡터 유사도 검색을 수행합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>이미지_중복제거_워크플로</span> </span></p>
