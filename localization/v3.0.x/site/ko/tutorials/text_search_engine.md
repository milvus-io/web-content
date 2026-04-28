---
id: text_search_engine.md
summary: Milvus로 텍스트 검색 엔진을 구축하세요.
title: 텍스트 검색 엔진
---
<h1 id="Text-Search-Engine" class="common-anchor-header">텍스트 검색 엔진<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용해 텍스트 검색 엔진을 구축하는 방법을 배워봅니다.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Jupyter 노트북 열기</a></li>
</ul>
<p>사용되는 ML 모델과 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>자연어 처리(NLP) 분야에서 Milvus의 주요 응용 분야 중 하나는 텍스트 검색 엔진입니다. 사용자가 원하는 정보를 찾는 데 도움이 되는 훌륭한 도구입니다. 심지어 찾기 어려운 정보도 찾아낼 수 있습니다. 텍스트 검색 엔진은 사용자가 입력한 키워드나 의미를 텍스트 데이터베이스와 비교한 다음 특정 기준을 충족하는 결과를 반환합니다.</p>
<p><br/></p>
<p>이 튜토리얼에서는 텍스트 검색 엔진을 구축하는 방법을 배웁니다. 이 튜토리얼에서는 BERT를 사용하여 텍스트를 고정 길이 벡터로 변환합니다. Milvus는 저장 및 벡터 유사도 검색을 위한 벡터 데이터베이스로 사용됩니다. 그런 다음 MySQL을 사용하여 Milvus에서 생성된 벡터 ID를 텍스트 데이터에 매핑합니다.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> </span> <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
