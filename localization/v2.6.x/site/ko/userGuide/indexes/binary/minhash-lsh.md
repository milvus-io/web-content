---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  효율적인 중복 제거와 유사도 검색은 대규모 머신 러닝 데이터 세트, 특히 대규모 언어 모델(LLM)을 위한 학습 코퍼라 정리와 같은 작업에서
  매우 중요합니다. 수백만 또는 수십억 개의 문서를 처리할 때 기존의 정확한 일치 검색은 너무 느리고 비용이 많이 듭니다.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>효율적인 중복 제거와 유사도 검색은 대규모 머신 러닝 데이터 세트, 특히 대규모 언어 모델(LLM)을 위한 학습 코퍼라 정리와 같은 작업에서 매우 중요합니다. 수백만 또는 수십억 개의 문서를 다룰 때, 기존의 정확한 일치 검색은 너무 느리고 비용이 많이 듭니다.</p>
<p>Milvus의 <strong>MINHASH_LSH</strong> 인덱스는 두 가지 강력한 기술을 결합하여 빠르고 확장 가능하며 정확한 대략적인 중복 제거를 가능하게 합니다:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: 문서 유사성을 추정하기 위해 압축 서명(또는 "지문")을 빠르게 생성합니다.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">LSH(지역 민감 해싱)</a>: MinHash 서명을 기반으로 유사한 문서 그룹을 빠르게 찾습니다.</p></li>
</ul>
<p>이 가이드에서는 Milvus에서 MINHASH_LSH를 사용하기 위한 개념, 전제 조건, 설정 및 모범 사례를 안내합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Jaccard 유사성</h3><p>Jaccard 유사성은 공식적으로 다음과 같이 정의되는 두 세트 A와 B 사이의 중첩을 측정합니다:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>여기서 그 값은 0(완전히 일치하지 않음)에서 1(동일함)까지의 범위입니다.</p>
<p>그러나 대규모 데이터 세트의 모든 문서 쌍 간에 Jaccard 유사도를 정확히 계산하려면 <strong>n이</strong> 클 경우 시간과 메모리에 O<strong>(n²</strong> )의 계산 비용이 듭니다. 따라서 LLM 학습 코퍼스 정리나 웹 규모의 문서 분석과 같은 사용 사례에는 적용이 불가능합니다.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">최소 해시 서명: 대략적인 Jaccard 유사성</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash는</a> Jaccard 유사성을 추정하는 효율적인 방법을 제공하는 확률적 기법입니다. 각 집합을 간결한 <strong>서명 벡터로</strong> 변환하여 집합 유사도를 효율적으로 추정할 수 있는 충분한 정보를 보존하는 방식으로 작동합니다.</p>
<p><strong>핵심 아이디어</strong>:</p>
<p>두 세트가 더 유사할수록 MinHash 서명이 같은 위치에서 일치할 가능성이 높아집니다. 이 속성을 통해 MinHash는 세트 간의 Jaccard 유사성을 근사화할 수 있습니다.</p>
<p>이 속성을 사용하면 전체 집합을 직접 비교할 필요 없이 MinHash가 집합 간의 <strong>Jaccard 유사성을 근사화할</strong> 수 있습니다.</p>
<p>MinHash 프로세스에는 다음이 포함됩니다:</p>
<ol>
<li><p><strong>슁글링:</strong> 문서를 겹치는 토큰 시퀀스 집합(대상포진)으로 변환합니다.</p></li>
<li><p><strong>해싱</strong>: 각 싱글에 여러 개의 독립적인 해시 함수를 적용합니다.</p></li>
<li><p><strong>최소 선택</strong>: 각 해시 함수에 대해 모든 싱글에 걸쳐 <strong>최소</strong> 해시 값을 기록합니다.</p></li>
</ol>
<p>아래 그림에서 전체 프로세스를 확인할 수 있습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>민해시 워크플로</span> </span></p>
<div class="alert note">
<p>사용되는 해시 함수의 수에 따라 MinHash 서명의 차원이 결정됩니다. 차원이 높을수록 근사치 정확도가 높아지지만, 저장 공간과 계산량이 증가합니다.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">MinHash용 LSH</h3><p>MinHash 서명은 문서 간의 정확한 Jaccard 유사성을 계산하는 데 드는 비용을 크게 줄여주지만, 모든 서명 벡터 쌍을 철저하게 비교하는 것은 여전히 규모에 따라 비효율적입니다.</p>
<p>이 문제를 해결하기 위해 <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH가</a> 사용됩니다. LSH는 모든 쌍을 직접 비교할 필요 없이 유사한 항목이 높은 확률로 동일한 '버킷'에 해시되도록 함으로써 빠른 대략적인 유사성 검색을 가능하게 합니다.</p>
<p>프로세스에는 다음이 포함됩니다:</p>
<ol>
<li><p><strong>서명 세분화:</strong></p>
<p><em>n차원</em> MinHash 서명은 <em>b개의</em> 밴드로 나뉩니다. 각 밴드에는 <em>r</em> 개의 연속 해시 값이 포함되므로 총 서명 길이는 <em>n = b × r을</em> 만족합니다.</p>
<p>예를 들어 128차원 MinHash 서명<em>(n = 128)</em>을 32개의 밴드<em>(b = 32)</em>로 나눈다면 각 밴드에는 4개의 해시 값이 포함됩니다<em>(r = 4)</em>.</p></li>
<li><p><strong>밴드 수준 해싱:</strong></p>
<p>세분화 후 각 밴드는 표준 해시 함수를 사용하여 독립적으로 처리되어 버킷에 할당됩니다. 두 서명이 한 밴드 내에서 동일한 해시 값을 생성하는 경우(즉, 동일한 버킷에 속하는 경우) 잠재적 일치로 간주됩니다.</p></li>
<li><p><strong>후보 선택:</strong></p>
<p>적어도 하나의 밴드에서 충돌하는 쌍이 유사성 후보로 선택됩니다.</p></li>
</ol>
<div class="alert note">
<p>왜 작동하나요?</p>
<p>수학적으로 두 서명의 Jaccard 유사도 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss는</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s입니다,</p>
<ul>
<li><p>한 행(해시 위치)에서 동일할 확률은 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s입니다.</p></li>
<li><p>밴드의 모든 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> r 행에서 일치할 확률은 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r입니다.</span></span></span></span></span></span></span></span></span></p></li>
<li><p><strong>적어도 하나의 밴드에서</strong> 일치할 확률은 다음과 같습니다:</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>자세한 내용은 <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">로캘리티에 민감한 해싱을</a> 참조하세요.</p>
</div>
<p>128차원 MinHash 서명이 있는 세 개의 문서를 예로 들어 보겠습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>LSH 워크플로 1</span> </span></p>
<p>먼저, LSH는 128차원 서명을 각각 4개의 연속된 값으로 구성된 32개의 밴드로 나눕니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Lsh 워크플로우 2</span> </span></p>
<p>그런 다음 해시 함수를 사용해 각 밴드를 서로 다른 버킷으로 해시합니다. 버킷을 공유하는 문서 쌍이 유사성 후보로 선택됩니다. 아래 예에서 문서 A와 문서 B는 해시 결과가 <strong>밴드 0에서</strong> 충돌하므로 유사도 후보로 선택됩니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Lsh 워크플로 3</span> </span></p>
<div class="alert note">
<p>밴드 수는 <code translate="no">mh_lsh_band</code> 매개변수에 의해 제어됩니다. 자세한 내용은 <a href="/docs/ko/minhash-lsh.md#Index-building-params">색인 구축 매개변수를</a> 참조하세요.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD: Milvus에서 MinHash 서명 비교하기</h3><p>MinHash 서명은 고정 길이 바이너리 벡터를 사용하여 세트 간의 Jaccard 유사성을 근사화합니다. 그러나 이러한 서명은 원본 집합을 보존하지 않기 때문에 <code translate="no">JACCARD</code>, <code translate="no">L2</code>, <code translate="no">COSINE</code> 와 같은 표준 메트릭을 직접 적용하여 비교할 수 없습니다.</p>
<p>이 문제를 해결하기 위해 Milvus는 MinHash 서명 비교를 위해 특별히 설계된 <code translate="no">MHJACCARD</code> 이라는 특수 메트릭 유형을 도입했습니다.</p>
<p>Milvus에서 MinHash를 사용할 때:</p>
<ul>
<li><p>벡터 필드의 유형은 다음과 같아야 합니다. <code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> 은 <code translate="no">MINHASH_LSH</code> (또는 <code translate="no">BIN_FLAT</code>)이어야 합니다.</p></li>
<li><p><code translate="no">metric_type</code> 은 다음과 같이 설정되어야 합니다. <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>다른 메트릭을 사용하면 유효하지 않거나 잘못된 결과가 산출됩니다.</p>
<p>이 메트릭 유형에 대한 자세한 내용은 <a href="/docs/ko/metric.md#MHJACCARD">MHJACCARD를</a> 참조하세요.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 MinHash LSH를 사용하기 전에 먼저 <strong>MinHash 서명을</strong> 생성해야 합니다. 이 간결한 바이너리 서명은 세트 간의 Jaccard 유사성을 대략적으로 나타내며 Milvus에서 <code translate="no">MHJACCARD</code>-기반 검색에 필요합니다.</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">MinHash 서명을 생성하는 방법 선택하기</h3><p>워크로드에 따라 선택할 수 있습니다:</p>
<ul>
<li><p>간소화를 위해 Python의 <code translate="no">datasketch</code> 사용(프로토타이핑에 권장)</p></li>
<li><p>대규모 데이터 세트에 분산 도구(예: Spark, Ray)를 사용합니다.</p></li>
<li><p>성능 튜닝이 중요한 경우 사용자 정의 로직(NumPy, C++ 등)을 구현합니다.</p></li>
</ul>
<p>이 가이드에서는 단순성과 Milvus 입력 형식과의 호환성을 위해 <code translate="no">datasketch</code> 을 사용합니다.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">필요한 라이브러리 설치</h3><p>이 예제에 필요한 패키지를 설치합니다:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">MinHash 서명 생성</h3><p>각 해시 값이 64비트 정수로 표시되는 256차원 MinHash 서명을 생성하겠습니다. 이는 <code translate="no">MINHASH_LSH</code> 에 대해 예상되는 벡터 형식과 일치합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>각 서명은 256 × 64비트 = 2048바이트입니다. 이 바이트 문자열은 Milvus <code translate="no">BINARY_VECTOR</code> 필드에 직접 삽입할 수 있습니다. Milvus에서 사용되는 바이너리 벡터에 대한 자세한 내용은 <a href="/docs/ko/binary-vector.md">바이너리 벡터를</a> 참조하세요.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(선택 사항) 원시 토큰 세트 준비(정제된 검색을 위해)</h3><p>기본적으로 Milvus는 MinHash 서명과 LSH 인덱스만 사용하여 대략적인 이웃을 찾습니다. 이 방법은 빠르지만 오탐을 반환하거나 가까운 일치 항목을 놓칠 수 있습니다.</p>
<p><strong>정확한 Jaccard 유사성을</strong> 원하는 경우, Milvus는 원본 토큰 세트를 사용하는 정교한 검색을 지원합니다. 사용하려면 다음과 같이 하세요:</p>
<ul>
<li><p>토큰 세트를 별도의 <code translate="no">VARCHAR</code> 필드로 저장합니다.</p></li>
<li><p><a href="/docs/ko/minhash-lsh.md#Build-index-parameters-and-create-collection">인덱스 파라미터를 구축할</a> 때 <code translate="no">&quot;with_raw_data&quot;: True</code> 설정</p></li>
<li><p>그리고 <a href="/docs/ko/minhash-lsh.md#Perform-similarity-search">유사도 검색을 수행할</a> 때 <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> 을 활성화합니다.</p></li>
</ul>
<p><strong>토큰 세트 추출 예시</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">Milvus에서 MinHash LSH 사용<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>MinHash 벡터와 원본 토큰 세트가 준비되면 Milvus를 사용하여 <code translate="no">MINHASH_LSH</code> 으로 저장, 색인 및 검색할 수 있습니다.</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Milvus에 연결하기</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">수집 스키마 정의</h3><p>스키마를 정의합니다:</p>
<ul>
<li><p>기본 키</p></li>
<li><p>MinHash 서명을 위한 <code translate="no">BINARY_VECTOR</code> 필드</p></li>
<li><p>원본 토큰 세트에 대한 <code translate="no">VARCHAR</code> 필드(정밀 검색이 활성화된 경우)</p></li>
<li><p>선택 사항으로, 원본 텍스트를 위한 <code translate="no">document</code> 필드</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">인덱스 매개변수 빌드 및 컬렉션 생성</h3><p>Jaccard 세분화가 활성화된 <code translate="no">MINHASH_LSH</code> 인덱스를 구축합니다:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>인덱스 구축 매개변수에 대한 자세한 내용은 인덱스 <a href="/docs/ko/minhash-lsh.md#Index-building-params">구축 매개변수를</a> 참조하세요.</p>
<h3 id="Insert-data" class="common-anchor-header">데이터 삽입</h3><p>각 문서에 대해 준비합니다:</p>
<ul>
<li><p>이진 MinHash 서명</p></li>
<li><p>직렬화된 토큰 세트 문자열</p></li>
<li><p>(선택 사항) 원본 텍스트</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">유사도 검색 수행</h3><p>Milvus는 MinHash LSH를 사용하여 두 가지 유사성 검색 모드를 지원합니다:</p>
<ul>
<li><p><strong>대략적인 검색</strong> - 빠르고 확률적인 결과를 위해 MinHash 서명과 LSH만 사용합니다.</p></li>
<li><p><strong>정밀 검색</strong> - 정확도 향상을 위해 원본 토큰 세트를 사용하여 Jaccard 유사성을 다시 계산합니다.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 쿼리 준비</h4><p>유사도 검색을 수행하려면 쿼리 문서에 대한 MinHash 서명을 생성합니다. 이 서명은 데이터 삽입 시 사용된 것과 동일한 차원 및 인코딩 형식과 일치해야 합니다.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 근사 검색(LSH 전용)</h4><p>이 검색은 빠르고 확장성이 뛰어나지만 일치하는 항목을 놓치거나 오탐이 발생할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 정밀 검색(정확도를 위해 권장):</h4><p>Milvus에 저장된 원본 토큰 세트를 사용하여 정확한 Jaccard 비교가 가능합니다. 약간 느리지만 품질에 민감한 작업에 권장됩니다:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">인덱스 매개변수<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 색인 구축과 색인에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/minhash-lsh.md#Build-index-parameters-and-create-collection">인덱스 구축</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>MinHash 서명에서 각 해시 값의 비트 폭입니다. 8로 나눌 수 있어야 합니다.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>균형 잡힌 성능과 정확도를 위해 <code translate="no">32</code> 을 사용합니다. 더 큰 데이터 세트에서 더 높은 정밀도를 원하시면 <code translate="no">64</code> 을 사용하세요. 허용 가능한 정확도 손실로 메모리를 절약하려면 <code translate="no">16</code> 을 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>LSH에 대한 최소 해시 서명을 나눌 밴드 수입니다. 리콜-성능 트레이드오프를 제어합니다.</p></td>
     <td><p>[1, <em>서명_길이</em>]</p></td>
     <td><p>128딤 서명의 경우: 32개 밴드(4개 값/밴드)로 시작합니다. 리콜률을 높이려면 64로 늘리고, 성능을 높이려면 16으로 줄입니다. 서명 길이를 균등하게 나누어야 합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>LSH 해시 코드를 익명 메모리에 저장할지 (<code translate="no">true</code>) 또는 메모리 매핑을 사용할지 (<code translate="no">false</code>).</p></td>
     <td><p>참, 거짓</p></td>
     <td><p>메모리 사용량을 줄이려면 대규모 데이터 세트(100만 세트 이상)의 경우 <code translate="no">false</code> 을 사용합니다. 최대 검색 속도가 필요한 소규모 데이터 세트의 경우 <code translate="no">true</code> 을 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>세분화를 위해 LSH 코드와 함께 원본 MinHash 서명을 저장할지 여부.</p></td>
     <td><p>true, false</p></td>
     <td><p>높은 정밀도가 필요하고 저장 비용이 허용되는 경우 <code translate="no">true</code> 을 사용합니다. 약간의 정확도 감소와 함께 스토리지 오버헤드를 최소화하려면 <code translate="no">false</code> 을 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>LSH 버킷 최적화에 사용되는 블룸 필터의 오탐 확률입니다.</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>균형 잡힌 메모리 사용량과 정확도를 위해 <code translate="no">0.01</code> 을 사용하세요. 값이 낮을수록 (<code translate="no">0.001</code>) 오탐 확률은 감소하지만 메모리가 증가합니다. 값이 높을수록(<code translate="no">0.05</code>) 메모리는 절약되지만 정확도가 떨어질 수 있습니다.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/minhash-lsh.md#Perform-similarity-search">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나와 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>세분화를 위해 후보 결과에 대해 정확한 Jaccard 유사도 계산을 수행할지 여부입니다.</p></td>
     <td><p>참, 거짓</p></td>
     <td><p>높은 정밀도(예: 중복 제거)가 필요한 애플리케이션에는 <code translate="no">true</code> 을 사용합니다. 약간의 정확도 손실이 허용되는 경우 <code translate="no">false</code> 을 사용하여 더 빠른 근사치 검색을 수행하세요.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Jaccard 정제 전에 검색할 후보자 수입니다. <code translate="no">mh_search_with_jaccard</code> 이 <code translate="no">true</code> 일 때만 유효합니다.</p></td>
     <td><p>[<em>top_k</em>, *top_k * 10*]</p></td>
     <td><p>리콜과 성능의 균형을 맞추기 위해 원하는 <em>top_k의</em> 2~5배로 설정합니다. 값이 클수록 리콜 성능이 향상되지만 계산 비용이 증가합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>여러 개의 동시 쿼리에 대해 일괄 최적화를 활성화할지 여부입니다.</p></td>
     <td><p>true, false</p></td>
     <td><p>처리량 향상을 위해 여러 쿼리를 동시에 검색할 때는 <code translate="no">true</code> 을 사용합니다. 단일 쿼리 시나리오에서는 <code translate="no">false</code> 을 사용하여 메모리 오버헤드를 줄입니다.</p></td>
   </tr>
</table>
