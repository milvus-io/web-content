---
id: text_image_search.md
summary: Milvus로 텍스트-이미지 검색 엔진을 구축하세요.
title: 텍스트-이미지 검색 엔진
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">텍스트-이미지 검색 엔진<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용하여 텍스트-이미지 검색 엔진을 구축하는 방법을 설명합니다.</p>
<p>기본 튜토리얼을 따라 최소한의 실행 가능한 텍스트-이미지 검색 엔진을 빠르게 구축할 수 있습니다. 또는 모델 선택부터 서비스 배포까지 모든 것을 다루는 심층 튜토리얼을 읽어볼 수도 있습니다. 심층 튜토리얼의 지침에 따라 비즈니스 요구사항에 맞는 고급 텍스트-이미지 검색 엔진을 구축할 수 있습니다.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">노트북의 기본 튜토리얼</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">노트북의 심층 분석 튜토리얼</a></p></li>
</ul>
<p>사용된 ML 모델 및 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>오늘날 점점 더 많은 사람들이 TikTok을 선호하는 검색 엔진으로 사용하면서 전통적인 텍스트 검색 엔진은 점점 더 매력을 잃어가고 있습니다. 전통적인 텍스트 검색에서는 키워드를 입력하면 해당 키워드가 포함된 모든 텍스트가 표시됩니다. 그러나 사람들은 이런 검색에서는 원하는 것을 항상 찾을 수 없다고 불평합니다. 게다가 검색 결과가 충분히 직관적이지 않습니다. 사람들은 텍스트 줄을 헤집고 다니는 것보다 이미지와 동영상이 훨씬 더 직관적이고 즐겁다고 말합니다. 그 결과 크로스 모달 텍스트-이미지 검색 엔진이 등장했습니다. 이러한 새로운 유형의 검색 엔진을 통해 사람들은 일부 키워드의 텍스트 덩어리를 입력하여 관련 이미지를 찾을 수 있습니다.</p>
<p>이 튜토리얼에서는 텍스트-이미지 검색 엔진을 구축하는 방법을 배웁니다. 이 튜토리얼에서는 CLIP 모델을 사용해 이미지의 특징을 추출하고 이를 벡터로 변환합니다. 그런 다음 이 이미지 벡터는 Milvus 벡터 데이터베이스에 저장됩니다. 사용자가 쿼리 텍스트를 입력하면 이 텍스트도 동일한 머신러닝 모델 CLIP을 사용하여 임베딩 벡터로 변환됩니다. 그 후 Milvus에서 벡터 유사도 검색을 수행하여 입력된 텍스트 벡터와 가장 유사한 이미지 벡터를 검색합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>텍스트_이미지_검색</span> </span></p>
