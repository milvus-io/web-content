---
id: json-shredding.md
title: JSON 파쇄Compatible with Milvus 2.6.2+
summary: >-
  JSON 파쇄는 기존의 행 기반 스토리지를 최적화된 컬럼형 스토리지로 변환하여 JSON 쿼리를 가속화합니다. 데이터 모델링을 위한 JSON의
  유연성을 유지하면서 Milvus는 백그라운드에서 컬럼형 최적화를 수행하여 액세스 및 쿼리 효율성을 획기적으로 개선합니다.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON 파쇄<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 파쇄는 기존의 행 기반 스토리지를 최적화된 컬럼형 스토리지로 변환하여 JSON 쿼리를 가속화합니다. 데이터 모델링에 대한 JSON의 유연성을 유지하면서 Milvus는 백그라운드에서 컬럼형 최적화를 수행하여 액세스 및 쿼리 효율성을 획기적으로 개선합니다.</p>
<p>JSON 파쇄는 대부분의 JSON 쿼리 시나리오에 효과적입니다. 성능 이점은 다음과 같은 경우에 더욱 두드러집니다:</p>
<ul>
<li><p>더<strong>크고 복잡한 JSON 문서</strong> - 문서 크기가 커질수록 성능이 크게 향상됩니다.</p></li>
<li><p><strong>읽기가 많은 워크로드</strong> - JSON 키에 대한 필터링, 정렬 또는 검색이 빈번한 경우</p></li>
<li><p><strong>혼합 쿼리 패턴</strong> - 서로 다른 JSON 키에 대한 쿼리는 하이브리드 스토리지 접근 방식의 이점을 누릴 수 있습니다.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">작동 방식<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 파쇄 프로세스는 데이터를 최적화하여 빠르게 검색할 수 있도록 세 가지 단계로 진행됩니다.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">1단계: 수집 및 키 분류<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>새로운 JSON 문서가 작성되면 Milvus는 이를 지속적으로 샘플링하고 분석하여 각 JSON 키에 대한 통계를 구축합니다. 이 분석에는 키의 발생 비율과 유형 안정성(데이터 유형이 문서 간에 일관성이 있는지 여부)이 포함됩니다.</p>
<p>이러한 통계를 기반으로 JSON 키는 최적의 저장을 위해 다음과 같이 분류됩니다.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSON 키의 카테고리</h4><table>
   <tr>
     <th><p>키 유형</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p>입력된 키</p></td>
     <td><p>대부분의 문서에 존재하며 항상 동일한 데이터 유형(예: 모든 정수 또는 모든 문자열)을 갖는 키입니다.</p></td>
   </tr>
   <tr>
     <td><p>동적 키</p></td>
     <td><p>자주 나타나지만 데이터 유형이 혼합된 키(예: 때로는 문자열, 때로는 정수)입니다.</p></td>
   </tr>
   <tr>
     <td><p>공유 키</p></td>
     <td><p>구성 가능한 빈도 임계값 이하로 자주 나타나지 않거나 중첩된 키입니다<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">분류 예시</h4><p>다음 JSON 키가 포함된 샘플 JSON 데이터를 생각해 보세요:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 데이터를 기준으로 키는 다음과 같이 분류됩니다:</p>
<ul>
<li><p>입력된<strong>키</strong>: <code translate="no">a</code> 및 <code translate="no">f</code> (항상 정수)</p></li>
<li><p><strong>동적 키</strong>: <code translate="no">b</code> (문자열/정수 혼합)</p></li>
<li><p><strong>공유 키</strong>: <code translate="no">e</code> (드물게 나타나는 키)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">2단계: 스토리지 최적화<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/json-shredding.md#Phase-1-Ingestion--key-classification">1단계의</a> 분류에 따라 스토리지 레이아웃이 결정됩니다. Milvus는 쿼리에 최적화된 열 형식을 사용합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Json 파쇄 흐름</span> </span></p>
<ul>
<li><p><strong>열을</strong> 파쇄합니다: <strong>입력된</strong> <strong>키와</strong> <strong>동적</strong> <strong>키의</strong> 경우, 데이터가 전용 열에 기록됩니다. 이 컬럼형 스토리지를 사용하면 Milvus가 전체 문서를 처리하지 않고 주어진 키에 필요한 데이터만 읽을 수 있으므로 쿼리 중에 빠르고 직접 스캔할 수 있습니다.</p></li>
<li><p><strong>공유 열</strong>: 모든 <strong>공유 키는</strong> 하나의 컴팩트한 바이너리 JSON 열에 함께 저장됩니다. 공유 키 <strong>반전 인덱스는</strong> 이 열에 구축됩니다. 이 인덱스는 Milvus가 데이터를 빠르게 정리하여 지정된 키가 포함된 행으로만 검색 공간을 효과적으로 좁힐 수 있도록 함으로써 빈도가 낮은 키에 대한 쿼리를 가속화하는 데 매우 중요합니다.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">3단계: 쿼리 실행<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>마지막 단계에서는 최적화된 스토리지 레이아웃을 활용하여 각 쿼리 술어에 대해 가장 빠른 경로를 지능적으로 선택합니다.</p>
<ul>
<li><p><strong>빠른 경로</strong>: 입력/동적 키(예: <code translate="no">json['a'] &lt; 100</code>)에 대한 쿼리는 전용 열에 직접 액세스합니다.</p></li>
<li><p><strong>최적화된 경로</strong>: 공유 키(예: <code translate="no">json['e'] = 'rare'</code>)에 대한 쿼리는 반전 인덱스를 사용해 관련 문서를 빠르게 찾습니다.</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">JSON 파쇄 사용<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>이 기능을 활성화하려면 <code translate="no">milvus.yaml</code> 구성 파일에서 <code translate="no">common.enabledJSONKeyStats</code> 을 <code translate="no">true</code> 으로 설정하세요. 새로운 데이터는 자동으로 파쇄 프로세스를 트리거합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONKeyStats:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 기능을 활성화하면 Milvus는 수집 즉시 별도의 수동 개입 없이 JSON 데이터를 분석하고 재구성하기 시작합니다.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">매개변수 튜닝<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>대부분의 사용자들은 JSON 파쇄가 활성화되면 다른 매개변수에 대한 기본 설정으로 충분합니다. 그러나 <code translate="no">milvus.yaml</code> 에서 다음 매개변수를 사용하여 JSON 파쇄의 동작을 미세 조정할 수 있습니다.</p>
<table>
   <tr>
     <th><p>매개변수 이름</p></th>
     <th><p>설명</p></th>
     <th><p>기본값</p></th>
     <th><p>튜닝 조언</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONKeyStats</code></p></td>
     <td><p>JSON 파쇄 빌드 및 로드 프로세스의 활성화 여부를 제어합니다.</p></td>
     <td><p>false</p></td>
     <td><p>이 기능을 활성화하려면 <strong>true로</strong> 설정해야 합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingJsonStatsForQuery</code></p></td>
     <td><p>밀버스가 가속을 위해 조각화된 데이터를 사용할지 여부를 제어합니다.</p></td>
     <td><p>true</p></td>
     <td><p>쿼리 실패 시 원래 쿼리 경로로 되돌아가는 복구 조치로 <strong>false로</strong> 설정합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonStats</code></p></td>
     <td><p>Milvus가 조각화된 데이터를 로드할 때 mmap을 사용할지 여부를 결정합니다.</p><p>자세한 내용은 <a href="/docs/ko/mmap.md">mmap 사용을</a> 참조하세요.</p></td>
     <td><p>true</p></td>
     <td><p>이 설정은 일반적으로 성능에 최적화되어 있습니다. 시스템에 특정 메모리 관리가 필요하거나 제약이 있는 경우에만 이 설정을 조정하세요.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code></p></td>
     <td><p>파쇄된 열에 저장될 JSON 키의 최대 개수입니다. </p><p>자주 나타나는 키의 수가 이 제한을 초과하면 Milvus는 가장 빈번하게 나타나는 키에 우선순위를 지정하여 파쇄하고 나머지 키는 공유 열에 저장합니다.</p></td>
     <td><p>1024</p></td>
     <td><p>이 정도면 대부분의 시나리오에 충분합니다. 자주 등장하는 키가 수천 개에 달하는 JSON의 경우, 이 값을 더 늘려야 할 수도 있지만 스토리지 사용량을 모니터링하세요.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsShreddingRatioThreshold</code></p></td>
     <td><p>파쇄된 열로 파쇄하려면 JSON 키의 최소 발생 비율을 고려해야 합니다.</p><p>비율이 이 임계값을 초과하면 키가 자주 나타나는 것으로 간주됩니다.</p></td>
     <td><p>0.3</p></td>
     <td><p>파쇄 기준을 충족하는 키의 수가 <code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code> 한도를 초과하는 경우<strong>증가</strong> (예: 0.5로<strong>증가</strong> )합니다. 이렇게 하면 임계값이 더 엄격해져 파쇄 대상 키의 수가 줄어듭니다.</p><p>기본 30% 임계값보다 덜 자주 나타나는 키를 더 많이 파쇄하려면 임계값을<strong>낮추세요</strong> (예: 0.1로<strong>낮추세요</strong> ).</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">성능 벤치마크<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>테스트 결과 다양한 JSON 키 유형과 쿼리 패턴에 걸쳐 상당한 성능 개선이 이루어졌습니다.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">테스트 환경 및 방법론<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>하드웨어</strong>: 1코어/8GB 클러스터</p></li>
<li><p><strong>데이터 세트</strong>: <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench의</a> 문서 1백만 개</p></li>
<li><p><strong>평균 문서 크기</strong>: 478.89바이트</p></li>
<li><p><strong>테스트 기간</strong>: 100초 동안 QPS 및 지연 시간 측정</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">결과: 입력된 키<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>이 테스트는 대부분의 문서에 존재하는 키를 쿼리할 때의 성능을 측정했습니다.</p>
<table>
   <tr>
     <th><p>쿼리 표현식</p></th>
     <th><p>키 값 유형</p></th>
     <th><p>QPS(파쇄 제외)</p></th>
     <th><p>QPS(파쇄 포함)</p></th>
     <th><p>성능 향상</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>정수</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>문자열</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">결과: 공유 키<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>이 테스트는 '공유' 범주에 속하는 희소하고 중첩된 키를 쿼리하는 데 중점을 두었습니다.</p>
<table>
   <tr>
     <th><p>쿼리 표현식</p></th>
     <th><p>키 값 유형</p></th>
     <th><p>QPS(파쇄 제외)</p></th>
     <th><p>QPS(조각화 포함)</p></th>
     <th><p>성능 향상</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>중첩 정수</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>중첩 문자열</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">주요 인사이트<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>공유 키 쿼리가</strong> 가장 극적인 성능 향상(최대 89배 빨라짐)을 보여줍니다.</p></li>
<li><p><strong>입력된 키 쿼리는</strong> 일관되게 15~30배의 성능 향상을 제공합니다.</p></li>
<li><p><strong>모든 쿼리 유형에서</strong> 성능 저하 없이 JSON 파쇄의 이점을 누릴 수 있습니다.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>JSON 파쇄가 제대로 작동하는지 어떻게 확인하나요?</strong></p>
<ol>
<li><p>먼저, <a href="/docs/ko/birdwatcher_usage_guides.md">Birdwatcher</a> 도구에서 <code translate="no">show segment --format table</code> 명령을 사용하여 데이터가 작성되었는지 확인합니다. 성공하면 출력에 <strong>Json Key Stats</strong> 필드 아래에 <code translate="no">shredding_data/</code> 및 <code translate="no">shared_key_index/</code> 이 포함됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>버드워처 출력</span> </span></p></li>
<li><p>다음으로 쿼리 노드에서 <code translate="no">show loaded-json-stats</code> 을 실행하여 데이터가 로드되었는지 확인합니다. 출력에는 각 쿼리 노드에 대해 로드된 조각화된 데이터에 대한 세부 정보가 표시됩니다.</p></li>
</ol></li>
<li><p><strong>JSON 파쇄와 JSON 인덱싱 중에서 어떻게 선택하나요?</strong></p>
<ul>
<li><p><strong>JSON 파</strong> 쇄는 문서에 자주 나타나는 키, 특히 복잡한 JSON 구조에 이상적입니다. 컬럼형 저장과 역 인덱싱의 장점을 결합한 것으로, 다양한 키를 쿼리하는 읽기 작업량이 많은 시나리오에 적합합니다. 그러나 아주 작은 JSON 문서에는 성능 향상이 미미하므로 권장되지 않습니다. JSON 문서의 전체 크기에서 키 값이 차지하는 비율이 작을수록 파쇄로 인한 성능 최적화가 더 잘 이루어집니다.</p></li>
<li><p><strong>JSON 인덱싱은</strong> 특정 키 기반 쿼리의 타겟 최적화에 더 적합하며 스토리지 오버헤드가 더 낮습니다. 더 단순한 JSON 구조에 적합합니다. JSON 파쇄는 배열 내부의 키에 대한 쿼리에는 적용되지 않으므로 이를 가속화하려면 JSON 인덱스가 필요하다는 점에 유의하세요.</p></li>
</ul></li>
<li><p><strong>오류가 발생하면 어떻게 하나요?</strong></p>
<p>빌드 또는 로드 프로세스가 실패하는 경우 <code translate="no">common.enabledJSONKeyStats=false</code> 을 설정하여 기능을 빠르게 비활성화할 수 있습니다. 남은 작업을 모두 지우려면 <a href="/docs/ko/birdwatcher_usage_guides.md">Birdwatcher에서</a> <code translate="no">remove stats-task &lt;task_id&gt;</code> 명령을 사용하세요. 쿼리가 실패하면 <code translate="no">common.usingJsonStatsForQuery=false</code> 을 설정하여 파쇄된 데이터를 우회하여 원래 쿼리 경로로 되돌립니다.</p></li>
</ul>
