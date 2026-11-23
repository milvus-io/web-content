---
id: schema-hands-on.md
title: 검색을 위한 데이터 모델 설계
summary: >-
  검색 엔진이라고도 불리는 정보 검색 시스템은 RAG(Retrieval-augmented generation), 시각 검색, 상품 추천 등
  다양한 AI 애플리케이션에 필수적입니다. 이러한 시스템의 핵심에는 정보를 정리하고, 색인을 생성하며, 검색할 수 있도록 정교하게 설계된
  데이터 모델이 있습니다.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">검색을 위한 데이터 모델 설계<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>검색 엔진이라고도 불리는 정보 검색 시스템은 RAG(Retrieval-augmented generation), 시각 검색, 상품 추천과 같은 다양한 AI 애플리케이션에 필수적입니다. 이러한 시스템의 핵심에는 정보를 구성, 색인화 및 검색하기 위해 세심하게 설계된 데이터 모델이 있습니다.</p>
<p>Milvus를 사용하면 컬렉션 스키마를 통해 검색 데이터 모델을 정의할 수 있으며, 이를 통해 비정형 데이터와 그 밀집 또는 희소 벡터 표현, 그리고 정형 메타데이터를 체계적으로 구성할 수 있습니다. 텍스트, 이미지 또는 기타 데이터 유형을 다루는 경우를 막론하고, 이 실습 가이드를 통해 핵심 스키마 개념을 이해하고 적용하여 실제 검색 데이터 모델을 설계하는 데 도움을 얻을 수 있습니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" /> 
   <span>데이터 모델의 구조</span>
  
 </span></p>
<h2 id="Data-Model" class="common-anchor-header">데이터 모델<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>검색 시스템의 데이터 모델 설계는 비즈니스 요구 사항을 분석하고 정보를 스키마로 표현된 데이터 모델로 추상화하는 과정을 포함합니다. 명확하게 정의된 스키마는 데이터 모델을 비즈니스 목표에 부합시키고, 데이터 일관성과 서비스 품질을 보장하는 데 중요합니다. 또한, 적절한 데이터 유형과 인덱스를 선택하는 것은 비즈니스 목표를 경제적으로 달성하는 데 중요합니다.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">비즈니스 요구 사항 분석<button data-href="#Analyzing-Business-Needs" class="anchor-icon" translate="no">
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
    </button></h3><p>비즈니스 요구 사항을 효과적으로 해결하려면 사용자가 수행할 쿼리의 유형을 분석하고 가장 적합한 검색 방법을 결정하는 것부터 시작해야 합니다.</p>
<ul>
<li><p><strong>사용자 쿼리:</strong> 사용자가 수행할 것으로 예상되는 쿼리의 유형을 파악합니다. 이를 통해 스키마가 실제 사용 사례를 지원하고 검색 성능을 최적화할 수 있습니다. 여기에는 다음이 포함될 수 있습니다:</p>
<ul>
<li><p>자연어 쿼리와 일치하는 문서 검색</p></li>
<li><p>참조 이미지와 유사하거나 텍스트 설명과 일치하는 이미지 찾기</p></li>
<li><p>이름, 카테고리, 브랜드와 같은 속성을 기준으로 제품 검색</p></li>
<li><p>구조화된 메타데이터(예: 게시일, 태그, 평점)를 기반으로 항목 필터링하기</p></li>
<li><p>하이브리드 쿼리에서 여러 기준을 결합(예: 시각 검색에서 이미지와 캡션의 의미적 유사성을 모두 고려)</p></li>
</ul></li>
<li><p><strong>검색 방법:</strong> 사용자가 수행할 쿼리 유형에 부합하는 적절한 검색 기법을 선택하십시오. 각기 다른 방법은 서로 다른 목적을 수행하며, 종종 결합하여 더 강력한 결과를 얻을 수 있습니다:</p>
<ul>
<li><p><strong>의미 검색</strong>: 밀도 벡터 유사도를 사용하여 의미가 유사한 항목을 찾으며, 텍스트나 이미지와 같은 비정형 데이터에 이상적입니다.</p></li>
<li><p><strong>전체 텍스트 검색</strong>: 키워드 매칭을 통해 의미 검색을 보완합니다. 전체 텍스트 검색은 어휘 분석을 활용하여 긴 단어를 조각난 토큰으로 분할하는 것을 방지하고, 검색 과정에서 전문 용어를 정확히 파악할 수 있습니다.</p></li>
<li><p><strong>메타데이터 필터링</strong>: 벡터 검색에 더해 날짜 범위, 카테고리 또는 태그와 같은 제약 조건을 적용합니다.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">비즈니스 요구사항을 검색 데이터 모델로 전환<button data-href="#Translates-Business-Requirements-into-a-Search-Data-Model" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 단계는 정보의 핵심 구성 요소와 해당 검색 방법을 파악하여 비즈니스 요구 사항을 구체적인 데이터 모델로 전환하는 것입니다:</p>
<ul>
<li><p>저장해야 할 데이터를 정의합니다. 여기에는 원본 콘텐츠(텍스트, 이미지, 오디오), 관련 메타데이터(제목, 태그, 작성자), 문맥 속성(타임스탬프, 사용자 행동 등)이 포함됩니다.</p></li>
<li><p>각 요소에 적합한 데이터 유형과 형식을 결정합니다. 예:</p>
<ul>
<li><p>텍스트 설명 → 문자열</p></li>
<li><p>이미지 또는 문서 임베딩 → 밀집 벡터 또는 희소 벡터</p></li>
<li><p>카테고리, 태그 또는 플래그 → 문자열, 배열, 부울</p></li>
<li><p>가격이나 평점과 같은 수치 속성 → 정수 또는 실수</p></li>
<li><p>저자 정보와 같은 구조화된 정보 → JSON</p></li>
</ul></li>
</ul>
<p>이러한 요소들을 명확하게 정의하면 데이터의 일관성을 보장하고, 정확한 검색 결과를 제공하며, 후속 애플리케이션 로직과의 통합을 용이하게 할 수 있습니다.</p>
<h2 id="Schema-Design" class="common-anchor-header">스키마 설계<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서는 데이터 모델이 컬렉션 스키마를 통해 표현됩니다. 컬렉션 스키마 내에서 적절한 필드를 설계하는 것은 효과적인 검색을 가능하게 하는 핵심입니다. 각 필드는 컬렉션에 저장된 특정 데이터 유형을 정의하며, 검색 과정에서 뚜렷한 역할을 수행합니다. 전반적으로 Milvus는 <strong>벡터 필드와</strong> <strong>스칼라 필드라는</strong> 두 가지 주요 필드 유형을 지원합니다.</p>
<p>이제 데이터 모델을 벡터 및 보조 스칼라 필드를 포함한 필드 스키마로 매핑할 수 있습니다. 각 필드가 데이터 모델의 속성과 일치하는지 확인하고, 특히 벡터 유형(밀집형 또는 희소형)과 차원에 주의를 기울이십시오.</p>
<h3 id="Vector-Field" class="common-anchor-header">벡터 필드<button data-href="#Vector-Field" class="anchor-icon" translate="no">
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
    </button></h3><p>벡터 필드는 텍스트, 이미지, 오디오와 같은 비정형 데이터 유형에 대한 임베딩을 저장합니다. 이러한 임베딩은 데이터 유형과 사용되는 검색 방법에 따라 밀집형, 스파스형 또는 이진형일 수 있습니다. 일반적으로 밀집형 벡터는 의미적 검색에 사용되는 반면, 스파스형 벡터는 전체 텍스트 또는 어휘 일치 검색에 더 적합합니다. 이진 벡터는 저장 공간과 연산 자원이 제한적인 경우에 유용합니다. 컬렉션에는 다중 모달 또는 하이브리드 검색 전략을 지원하기 위해 여러 벡터 필드가 포함될 수 있습니다. 이 주제에 대한 자세한 안내는 <a href="/docs/ko/multi-vector-search.md">‘다중 벡터 하이브리드 검색’을</a> 참조하십시오.</p>
<p>Milvus는 다음과 같은 벡터 데이터 유형을 지원합니다. <a href="/docs/ko/dense-vector.md">밀집 벡터</a>( <code translate="no">FLOAT_VECTOR</code> ), <a href="/docs/ko/sparse_vector.md">스파스 벡터</a>( <code translate="no">SPARSE_FLOAT_VECTOR</code> ), <a href="/docs/ko/binary-vector.md">이진 벡터</a>( <code translate="no">BINARY_VECTOR</code> )</p>
<h3 id="Scalar-Field" class="common-anchor-header">스칼라 필드<button data-href="#Scalar-Field" class="anchor-icon" translate="no">
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
    </button></h3><p>스칼라 필드는 숫자, 문자열, 날짜와 같이 일반적으로 메타데이터라고 불리는 기본 구조화된 값을 저장합니다. 이러한 값은 벡터 검색 결과와 함께 반환될 수 있으며, 필터링 및 정렬에 필수적입니다. 이를 통해 특정 카테고리나 정의된 시간 범위로 문서를 제한하는 등, 특정 속성을 기반으로 검색 결과를 좁힐 수 있습니다.</p>
<p>Milvus는 비벡터 데이터를 저장하고 필터링하기 위해 <code translate="no">BOOL</code>, <code translate="no">INT8/16/32/64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code>, <code translate="no">ARRAY</code> 와 같은 스칼라 유형을 지원합니다. 이러한 유형은 검색 작업의 정확성과 맞춤 설정을 향상시킵니다.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">스키마 설계 시 고급 기능 활용<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마를 설계할 때, 지원되는 데이터 유형을 사용하여 데이터를 필드에 단순히 매핑하는 것만으로는 충분하지 않습니다. 필드 간의 관계와 구성에 활용할 수 있는 전략을 철저히 이해하는 것이 필수적입니다. 설계 단계에서 주요 기능을 염두에 두면 스키마가 당장의 데이터 처리 요구 사항을 충족할 뿐만 아니라, 향후 필요에 따라 확장 및 적응할 수 있게 됩니다. 이러한 기능을 신중하게 통합함으로써 Milvus의 기능을 극대화하고 더 광범위한 데이터 전략 및 목표를 지원하는 강력한 데이터 아키텍처를 구축할 수 있습니다. 다음은 컬렉션 스키마를 생성할 때의 주요 기능에 대한 개요입니다:</p>
<h3 id="Primary-Key" class="common-anchor-header">주키(Primary Key)<button data-href="#Primary-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>주키 필드는 컬렉션 내의 각 엔티티를 고유하게 식별하므로 스키마의 기본 구성 요소입니다. 주키를 정의하는 것은 필수입니다. 주키는 정수형 또는 문자열형의 스칼라 필드여야 하며, ` <code translate="no">is_primary=True</code>`로 표시되어야 합니다. 선택적으로 주키에 ` <code translate="no">auto_id</code> `를 활성화할 수 있으며, 이 경우 컬렉션에 더 많은 데이터가 수집됨에 따라 일괄적으로 증가하는 정수 번호가 자동으로 할당됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/primary-field.md">‘주 필드 및 AutoID</a>’를 참조하십시오.</p>
<h3 id="Partitioning" class="common-anchor-header">파티셔닝<button data-href="#Partitioning" class="anchor-icon" translate="no">
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
    </button></h3><p>검색 속도를 높이기 위해 선택적으로 파티셔닝을 활성화할 수 있습니다. 파티셔닝에 사용할 특정 스칼라 필드를 지정하고, 검색 시 이 필드를 기반으로 필터링 기준을 설정함으로써 검색 범위를 관련 파티션으로만 효과적으로 제한할 수 있습니다. 이 방법은 검색 영역을 축소하여 검색 작업의 효율성을 크게 향상시킵니다.</p>
<p>자세한 내용은 <a href="/docs/ko/use-partition-key.md">파티션 키 사용을</a> 참조하십시오.</p>
<h3 id="Analyzer" class="common-anchor-header">분석기<button data-href="#Analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>분석기는 텍스트 데이터를 처리하고 변환하는 데 필수적인 도구입니다. 분석기의 주요 기능은 원시 텍스트를 토큰으로 변환하고, 색인 생성 및 검색을 위해 이를 구조화하는 것입니다. 분석기는 문자열을 토큰화하고, 스톱워드를 제거하며, 개별 단어를 토큰으로 스템밍하여 이 작업을 수행합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/analyzer-overview.md">‘분석기 개요</a>’를 참조하십시오.</p>
<h3 id="Function" class="common-anchor-header">함수<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus에서는 스키마의 일부로 내장 함수를 정의하여 특정 필드를 자동으로 도출할 수 있습니다. 예를 들어, 전체 텍스트 검색을 지원하기 위해 ` <code translate="no">VARCHAR</code> ` 필드에서 스파스 벡터를 생성하는 내장 BM25 함수를 추가할 수 있습니다. 이러한 함수를 통해 도출된 필드는 전처리 과정을 간소화하고, 컬렉션이 자체적으로 완비된 상태를 유지하며 쿼리 실행에 즉시 대응할 수 있도록 보장합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/full-text-search.md">‘전체 텍스트 검색</a>’을 참조하십시오.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">실제 사례<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 위 다이어그램에 표시된 멀티미디어 문서 검색 애플리케이션의 스키마 설계와 코드 예제를 간략히 설명합니다. 이 스키마는 다음 필드에 데이터가 매핑된 기사를 포함하는 데이터세트를 관리하도록 설계되었습니다:</p>
<table>
   <tr>
     <th><p><strong>필드</strong></p></th>
     <th><p><strong>데이터 소스</strong></p></th>
     <th><p><strong>사용 검색 방법</strong></p></th>
     <th><p><strong>주키</strong></p></th>
     <th><p><strong>파티션 키</strong></p></th>
     <th><p><strong>분석기</strong></p></th>
     <th><p><strong>함수 입력/출력</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>활성화 시 자동 생성됨 <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/ko/get-and-scalar-query.md">Get을 사용한 쿼리</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>제목 (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>기사 제목</p></td>
     <td><p><a href="/docs/ko/keyword-match.md">텍스트 일치</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>타임스탬프 (<code translate="no">INT32</code>)</p></td>
     <td><p>게시 날짜</p></td>
     <td><p><a href="/docs/ko/use-partition-key.md">파티션 키로 필터링</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>텍스트 (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>기사의 원문</p></td>
     <td><p><a href="/docs/ko/multi-vector-search.md">다중 벡터 하이브리드 검색</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>입력</p></td>
   </tr>
   <tr>
     <td><p>text_dense_vector (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>텍스트 임베딩 모델에 의해 생성된 밀집 벡터</p></td>
     <td><p><a href="/docs/ko/single-vector-search.md">기본 벡터 검색</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>내장 BM25 함수에 의해 자동 생성된 스파스 벡터</p></td>
     <td><p><a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>출력</p></td>
   </tr>
</table>
<p>스키마에 대한 자세한 정보와 다양한 유형의 필드를 추가하는 방법에 대한 구체적인 안내는 <a href="/docs/ko/schema.md">'스키마 설명'을</a> 참조하십시오.</p>
<h3 id="Initialize-schema" class="common-anchor-header">스키마 초기화<button data-href="#Initialize-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>시작하기 위해 빈 스키마를 생성해야 합니다. 이 단계는 데이터 모델을 정의하기 위한 기본 구조를 마련합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">필드 추가<button data-href="#Add-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>스키마가 생성되면, 다음 단계는 데이터를 구성할 필드를 지정하는 것입니다. 각 필드는 해당 데이터 유형 및 속성과 연결됩니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서는 필드에 대해 다음과 같은 속성이 지정됩니다.</p>
<ul>
<li><p>주키: <code translate="no">article_id</code> 가 주키로 사용되며, 이를 통해 들어오는 엔티티에 대해 주키가 자동으로 할당됩니다.</p></li>
<li><p>파티션 키: ` <code translate="no">timestamp</code> `가 파티션 키로 지정되어 파티션별 필터링이 가능합니다. 이는 다음과 같을 수 있습니다.</p></li>
<li><p>텍스트 분석기: 텍스트 분석기가 2개의 문자열 필드인 ` <code translate="no">title</code> `와 ` <code translate="no">text</code> `에 적용되어, 각각 텍스트 일치 및 전체 텍스트 검색을 지원합니다.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(선택 사항) 함수 추가<button data-href="#Optional-Add-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터 쿼리 기능을 강화하기 위해 스키마에 함수를 통합할 수 있습니다. 예를 들어, 특정 필드와 관련된 처리를 수행하는 함수를 생성할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서는 스키마에 내장된 BM25 함수를 추가하여, <code translate="no">text</code> 필드를 입력으로 사용하고 결과 스파스 벡터를 <code translate="no">text_sparse_vector</code> 필드에 저장합니다.</p>
<h2 id="Next-Steps" class="common-anchor-header">다음 단계<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ko/create-collection.md">컬렉션 생성</a></p></li>
<li><p><a href="/docs/ko/alter-collection-field.md">컬렉션 필드 수정</a></p></li>
</ul>
