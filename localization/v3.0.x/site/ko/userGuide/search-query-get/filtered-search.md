---
id: filtered-search.md
title: 필터링 검색
summary: >-
  ANN 검색은 지정된 벡터 임베딩과 가장 유사한 벡터 임베딩을 찾아냅니다. 하지만 검색 결과가 항상 정확한 것은 아닙니다. 검색 요청에
  필터링 조건을 포함하면 Milvus가 ANN 검색을 수행하기 전에 메타데이터 필터링을 수행하여, 검색 범위를 전체 컬렉션에서 지정된 필터링
  조건에 부합하는 엔티티로만 좁힐 수 있습니다.
---
<h1 id="Filtered-Search" class="common-anchor-header">필터링 검색<button data-href="#Filtered-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>ANN 검색은 지정된 벡터 임베딩과 가장 유사한 벡터 임베딩을 찾아냅니다. 그러나 검색 결과가 항상 정확한 것은 아닙니다. 검색 요청에 필터링 조건을 포함하면 Milvus가 ANN 검색을 수행하기 전에 메타데이터 필터링을 수행하여, 전체 컬렉션에서 지정된 필터링 조건에 부합하는 엔티티로만 검색 범위를 좁힐 수 있습니다.</p>
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
    </button></h2><p>Milvus에서 필터링 검색은 필터링이 적용되는 단계에 따라 <strong>표준 필터링</strong> 과 <strong>반복 필터링의</strong> 두 가지 유형으로 분류됩니다.</p>
<h3 id="Standard-filtering" class="common-anchor-header">표준 필터링<button data-href="#Standard-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션에 벡터 임베딩과 해당 메타데이터가 모두 포함된 경우, ANN 검색 전에 메타데이터를 필터링하여 검색 결과의 관련성을 높일 수 있습니다. Milvus는 필터링 조건이 포함된 검색 요청을 수신하면, 지정된 필터링 조건에 부합하는 엔티티 내에서만 검색 범위를 제한합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/filtered-search.png" alt="Filtered Search" class="doc-image" id="filtered-search" /> 
   <span>필터링된 검색</span>
  
 </span></p>
<p>위 다이어그램에서 볼 수 있듯이, 검색 요청에는 ‘ <code translate="no">chunk like &quot;%red%&quot;</code> ’가 필터링 조건으로 포함되어 있으며, 이는 Milvus가 ‘ <code translate="no">chunk</code> ’ 필드에 ‘ <code translate="no">red</code> ’라는 단어가 포함된 모든 엔티티 내에서 ANN 검색을 수행해야 함을 나타냅니다. 구체적으로 Milvus는 다음과 같은 작업을 수행합니다:</p>
<ul>
<li><p>검색 요청에 포함된 필터링 조건과 일치하는 엔티티를 필터링합니다.</p></li>
<li><p>필터링된 엔티티 내에서 ANN 검색을 수행합니다.</p></li>
<li><p>상위 K개 엔티티를 반환합니다.</p></li>
</ul>
<h3 id="Iterative-filtering" class="common-anchor-header">반복 필터링<button data-href="#Iterative-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>표준 필터링 프로세스는 검색 범위를 효과적으로 좁혀줍니다. 그러나 지나치게 복잡한 필터링 표현식은 검색 지연 시간을 매우 길게 만들 수 있습니다. 이러한 경우, 반복적 필터링을 대안으로 활용하면 스칼라 필터링의 처리 부하를 줄이는 데 도움이 됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/iterative-filtering.png" alt="Iterative Filtering" class="doc-image" id="iterative-filtering" /> 
   <span>반복 필터링</span>
  
 </span></p>
<p>위 다이어그램에서 볼 수 있듯이, 반복적 필터링을 사용하는 검색은 벡터 검색을 반복적으로 수행합니다. 반복자가 반환하는 각 엔티티는 스칼라 필터링을 거치며, 이 과정은 지정된 상위 K개 결과가 나올 때까지 계속됩니다.</p>
<p>이 방법은 스칼라 필터링을 적용받는 엔티티의 수를 대폭 줄여주므로, 특히 매우 복잡한 필터링 표현식을 처리할 때 유용합니다.</p>
<p>그러나 이터레이터가 엔티티를 한 번에 하나씩 처리한다는 점에 유의해야 합니다. 이러한 순차적 접근 방식은 특히 많은 수의 엔티티가 스칼라 필터링을 거칠 때 처리 시간이 길어지거나 잠재적인 성능 문제가 발생할 수 있습니다.</p>
<h2 id="Examples" class="common-anchor-header">예제<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 필터링된 검색을 수행하는 방법을 보여줍니다. 이 섹션의 코드 예제는 컬렉션에 이미 다음 엔티티들이 존재한다고 가정합니다. 각 엔티티는 <strong>id</strong>, <strong>vector</strong>, <strong>color</strong>, <strong>likes라는</strong> 네 개의 필드를 가지고 있습니다. 예제에서는 <code translate="no">COSINE</code> 메트릭으로 인덱싱된 5차원 <code translate="no">vector</code> 필드를 가진 ' <code translate="no">my_collection</code> '라는 로드된 컬렉션을 사용합니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3580376395471989</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.6023495712049978</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.18414012509913835</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.26286205330961354</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.9029438446296592</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pink_8682&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">165</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19886812562848388</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.06023560599112088</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.6976963061752597</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2614474506242501</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.838729485096104</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_7025&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.43742130801983836</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.5597502546264526</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.6457887650909682</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.7894058910881185</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20785793220625592</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;orange_6781&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">764</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3172005263489739</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.9719044792798428</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.36981146090600725</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.4860894583077995</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.95791889146345</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pink_9298&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">234</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.4452349528804562</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8757026943054742</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8220779437047674</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.46406290649483184</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30337481143159106</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_4794&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">122</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.985825131989184</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8144651566660419</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.6299267002202009</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.1206906911183383</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.1446277761879955</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;yellow_4222&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">6</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.8371977790571115</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.015764369584852833</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.31062937026679327</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.562666951622192</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8984947637863987</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_9392&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">58</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">-0.33445148015177995</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.2567135004164067</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8987539745369246</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.9402995886420709</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5378064918413052</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;grey_8510&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">775</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">8</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.39524717779832685</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4000257286739164</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.5890507376891594</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8650502298996872</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.6140360785406336</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white_9381&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">876</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">9</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.5718280481994695</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24070317428066512</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.3737913482606834</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.06726932177492717</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.6980531615588608</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;purple_4976&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">765</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>쿼리 벡터가 대상 컬렉션에 이미 존재하는 경우, 검색 전에 벡터를 다시 불러오는 대신 <code translate="no">ids</code> 를 사용하는 것을 고려해 보십시오. 자세한 내용은 ‘기본 키 <a href="/docs/ko/primary-key-search.md">검색(Primary-Key Search</a>)’을 참조하십시오.</p>
</div>
<p>이 예제에서는 PyMilvus 3.0.2, Java SDK 3.0.10, Go SDK 3.0.0 (<code translate="no">client/v3</code>), Rust SDK 3.0.2, C++ SDK 3.0.4, NodeJS SDK 3.0.6 및 C# SDK 3.0.0을 사용합니다.</p>
<h3 id="Search-with-standard-filtering" class="common-anchor-header">표준 필터링을 사용한 검색<button data-href="#Search-with-standard-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 코드 예제는 표준 필터링을 사용한 검색을 보여줍니다. 다음 코드 예제의 요청에는 필터링 조건과 여러 출력 필드가 포함되어 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]</span>
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">5</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_4794, likes=122}, score=0.5975797, id=4)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_9392, likes=58}, score=-0.24996188, id=6)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like &#x27;red%&#x27; and likes &gt; 50&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;likes: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;likes&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.3580376395471989f32</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(color like &quot;red%&quot; and likes &gt; 50)&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;color&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;likes&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;TopK results:&quot;</span> &lt;&lt; std::endl;
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[]
{
    <span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>
});

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = <span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span> }
    }
});
<span class="hljs-keyword">if</span> (res.SingleResults <span class="hljs-keyword">is</span> { } results)
{
    Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, results.SelectMany(r =&gt; r.Scores)));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;color&quot;, &quot;likes&quot;]
}&#x27;</span>
<span class="hljs-comment"># Illustrative response; scores and cost can vary.</span>
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;red_4794&quot;,&quot;distance&quot;:0.5975796,&quot;id&quot;:4,&quot;likes&quot;:122},{&quot;color&quot;:&quot;red_9392&quot;,&quot;distance&quot;:-0.2499619,&quot;id&quot;:6,&quot;likes&quot;:58}],&quot;topks&quot;:[2]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>검색 요청에 포함된 필터링 조건은 <code translate="no">color like &quot;red%&quot; and likes &gt; 50</code> 입니다. 이 조건은 'and' 연산자를 사용하여 두 가지 조건을 포함합니다. 첫 번째 조건은 <code translate="no">color</code> 필드의 값이 <code translate="no">red</code> 로 시작하는 엔티티를, 두 번째 조건은 <code translate="no">likes</code> 필드의 값이 <code translate="no">50</code> 보다 큰 엔티티를 찾습니다. 이 조건을 충족하는 엔티티는 단 두 개뿐입니다. top-K를 <code translate="no">5</code> 로 설정하면, Milvus는 이 두 엔티티와 쿼리 벡터 간의 거리를 계산하여 검색 결과로 반환합니다.</p>
<p>다음 예제는 코사인 점수를 예시로 든 Python 결과의 형식을 보여줍니다. 점수는 부동 소수점 정밀도에 따라 달라질 수 있습니다. <code translate="no">entity</code> 에는 요청된 출력 필드만 표시되며, REST 예제에서는 각 검색 결과의 최상위 수준에서 해당 필드를 반환합니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;distance&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.5975796</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;entity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_4794&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">122</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">6</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;distance&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">-0.2499619</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;entity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_9392&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">58</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p>메타데이터 필터링에 사용할 수 있는 연산자에 대한 자세한 내용은 <a href="/docs/ko/boolean.md">‘필터링</a> 설명’을 참조하십시오.</p>
<h3 id="Search-with-iterative-filtering" class="common-anchor-header">반복 필터링을 사용한 검색<button data-href="#Search-with-iterative-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>반복 필터링을 사용하여 필터링된 검색을 수행하려면 다음과 같이 할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
<span class="highlighted-comment-line">    search_params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hints&quot;</span>: <span class="hljs-string">&quot;iterative_filter&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">5</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
        .searchParams(Collections.&lt;String, Object&gt;singletonMap(<span class="hljs-string">&quot;hints&quot;</span>, <span class="hljs-string">&quot;iterative_filter&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_4794, likes=122}, score=0.5975797, id=4)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_9392, likes=58}, score=-0.24996188, id=6)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like &#x27;red%&#x27; and likes &gt; 50&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>).
    WithSearchParam(<span class="hljs-string">&quot;hints&quot;</span>, <span class="hljs-string">&quot;iterative_filter&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;likes: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;likes&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.3580376395471989f32</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>])
            .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;hints&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;iterative_filter&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())]))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(color like &quot;red%&quot; and likes &gt; 50)&quot;</span>)
                   .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;hints&quot;</span>, <span class="hljs-string">&quot;iterative_filter&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;color&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;likes&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;TopK results:&quot;</span> &lt;&lt; std::endl;
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">hints</span>: <span class="hljs-string">&quot;iterative_filter&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[]
{
    <span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>
});

<span class="hljs-keyword">var</span> searchParams = <span class="hljs-keyword">new</span> SearchParameters
{
    Expression = <span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>,
    Hints = <span class="hljs-string">&quot;iterative_filter&quot;</span>,
    OutputFields = { <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span> }
};

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = searchParams
});
<span class="hljs-keyword">if</span> (res.SingleResults <span class="hljs-keyword">is</span> { } results)
{
    Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, results.SelectMany(r =&gt; r.Scores)));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;,
    &quot;searchParams&quot;: {&quot;hints&quot;: &quot;iterative_filter&quot;},
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;color&quot;, &quot;likes&quot;]
}&#x27;</span>
<span class="hljs-comment"># Illustrative response; scores and cost can vary.</span>
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;red_4794&quot;,&quot;distance&quot;:0.5975796,&quot;id&quot;:4,&quot;likes&quot;:122},{&quot;color&quot;:&quot;red_9392&quot;,&quot;distance&quot;:-0.2499619,&quot;id&quot;:6,&quot;likes&quot;:58}],&quot;topks&quot;:[2]}</span>
<button class="copy-code-btn"></button></code></pre>
