---
id: dna_sequence_classification.md
summary: Milvus로 DNA 서열 분류 시스템을 구축하세요.
title: DNA 염기서열 분류
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">DNA 서열 분류<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용하여 DNA 서열 분류 모델을 구축하는 방법을 설명합니다.</p>
<p>사용된 ML 모델과 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>DNA 서열은 유전자 추적, 종 식별, 질병 진단 등 다양한 분야에서 널리 사용되는 개념입니다. 모든 산업에서 보다 지능적이고 효율적인 연구 방법을 갈망하고 있지만, 특히 생물학 및 의학 분야에서 인공지능은 많은 주목을 받고 있습니다. 점점 더 많은 과학자와 연구자들이 생물정보학 분야에서 머신러닝과 딥러닝에 기여하고 있습니다. 실험 결과를 보다 설득력 있게 만들기 위해 흔히 사용되는 방법 중 하나는 표본 크기를 늘리는 것입니다. 유전체학에서 빅 데이터와의 협업은 현실에서 더 많은 응용 가능성을 제공합니다. 그러나 기존의 염기서열 정렬은 한계가 있어 대규모 데이터 세트에는 적합하지 않습니다. 현실적으로 절충점을 찾기 위해 벡터화는 대규모 DNA 서열 데이터 세트에 적합한 선택입니다.</p>
<p><br/></p>
<p>이 튜토리얼에서는 DNA 서열 분류 모델을 구축하는 방법을 배웁니다. 이 튜토리얼에서는 CountVectorizer를 사용해 DNA 서열의 특징을 추출하고 이를 벡터로 변환합니다. 그런 다음 이러한 벡터는 Milvus에 저장되고 해당 DNA 클래스는 MySQL에 저장됩니다. 사용자는 Milvus에서 벡터 유사성 검색을 수행하고 MySQL에서 해당 DNA 분류를 불러올 수 있습니다.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>dna</span> </span></p>
