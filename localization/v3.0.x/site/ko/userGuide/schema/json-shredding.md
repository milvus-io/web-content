---
id: json-shredding.md
title: JSON 분할Compatible with Milvus 2.6.2+
summary: >-
  JSON 셰딩은 기존의 행 기반 저장 방식을 최적화된 열 기반 저장 방식으로 변환하여 JSON 쿼리 속도를 높여줍니다. Milvus는 데이터
  모델링에 있어 JSON의 유연성을 유지하면서, 백그라운드에서 열 기반 최적화를 수행하여 액세스 및 쿼리 효율성을 획기적으로 향상시킵니다.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON 분할<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 슈레딩은 기존의 행 기반 저장 방식을 최적화된 열 기반 저장 방식으로 변환하여 JSON 쿼리 속도를 높입니다. Milvus는 데이터 모델링에 있어 JSON의 유연성을 유지하면서, 백그라운드에서 열 기반 최적화를 수행하여 액세스 및 쿼리 효율성을 획기적으로 향상시킵니다.</p>
<p>JSON 슈레딩은 대부분의 JSON 쿼리 시나리오에서 효과적입니다. 다음과 같은 경우 성능 향상 효과가 더욱 두드러집니다:</p>
<ul>
<li><p><strong>더 크고 복잡한 JSON 문서</strong> - 문서 크기가 커질수록 성능 향상 폭이 커집니다</p></li>
<li><p><strong>읽기 위주의 워크로드</strong> - JSON 키에 대한 빈번한 필터링, 정렬 또는 검색</p></li>
<li><p><strong>혼합된 쿼리 패턴</strong> - 서로 다른 JSON 키에 걸친 쿼리는 하이브리드 저장 방식의 이점을 누립니다</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">작동 원리<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 분할 프로세스는 빠른 데이터 검색을 위해 데이터를 최적화하는 세 가지 단계로 진행됩니다.</p>
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
    </button></h3><p>새로운 JSON 문서가 기록되면 Milvus는 이를 지속적으로 샘플링하고 분석하여 각 JSON 키에 대한 통계를 구축합니다. 이 분석에는 키의 발생 비율과 유형 안정성(문서 전반에 걸쳐 데이터 유형이 일관적인지 여부)이 포함됩니다.</p>
<p>이러한 통계에 기반하여, JSON 키는 최적의 저장을 위해 다음과 같이 분류됩니다.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSON 키의 분류</h4><table>
   <tr>
     <th><p>키 유형</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p>유형이 지정된 키</p></td>
     <td><p>대부분의 문서에 존재하며 항상 동일한 데이터 유형(예: 모두 정수이거나 모두 문자열)을 갖는 키입니다.</p></td>
   </tr>
   <tr>
     <td><p>동적 키</p></td>
     <td><p>자주 나타나지만 데이터 유형이 혼합된 키(예: 때로는 문자열, 때로는 정수).</p></td>
   </tr>
   <tr>
     <td><p>공유 키</p></td>
     <td><p>드물게 나타나거나 중첩되어 있으며, 설정 가능한 빈도 임계값 미만에 해당하는 키<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">분류 예시</h4><p>다음과 같은 JSON 키를 포함하는 샘플 JSON 데이터를 고려해 보겠습니다:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 데이터를 바탕으로 키는 다음과 같이 분류됩니다:</p>
<ul>
<li><p><strong>유형 지정 키</strong>: <code translate="no">a</code> 및 <code translate="no">f</code> (항상 정수)</p></li>
<li><p><strong>동적 키</strong>: <code translate="no">b</code> (문자열/정수 혼합)</p></li>
<li><p><strong>공유 키</strong>: <code translate="no">e</code> (드물게 나타나는 키)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">2단계: 저장소 최적화<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/json-shredding.md#Phase-1-Ingestion--key-classification">1단계의</a> 분류 결과에 따라 저장소 레이아웃이 결정됩니다. Milvus는 쿼리에 최적화된 열 기반 형식을 사용합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>JSON 분할 흐름</span>
  
 </span></p>
<ul>
<li><p><strong>분할된 컬럼</strong>: <strong>타입 지정</strong> 키와 <strong>동적</strong> <strong>키의</strong> 경우, 데이터는 전용 컬럼에 기록됩니다. 이러한 컬럼형 저장 방식은 쿼리 시 빠르고 직접적인 스캔을 가능하게 합니다. Milvus는 전체 문서를 처리하지 않고도 주어진 키에 필요한 데이터만 읽을 수 있기 때문입니다.</p></li>
<li><p><strong>공유 컬럼</strong>: 모든 <strong>공유 키는</strong> 단일하고 간결한 바이너리 JSON 컬럼에 함께 저장됩니다. 이 컬럼을 기반으로 공유 키 <strong>역색인이</strong> 구축됩니다. 이 색인은 Milvus가 데이터를 신속하게 정리하여 검색 범위를 지정된 키를 포함하는 행으로만 효과적으로 좁힐 수 있게 함으로써, 저빈도 키에 대한 쿼리 속도를 높이는 데 매우 중요합니다.</p></li>
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
    </button></h3><p>마지막 단계에서는 최적화된 저장 레이아웃을 활용하여 각 쿼리 술어에 대해 가장 빠른 경로를 지능적으로 선택합니다.</p>
<ul>
<li><p><strong>빠른 경로</strong>: 타입 지정/동적 키(예: <code translate="no">json['a'] &lt; 100</code>)에 대한 쿼리는 전용 컬럼에 직접 액세스합니다.</p></li>
<li><p><strong>최적화된 경로</strong>: 공유 키(예: <code translate="no">json['e'] = 'rare'</code>)에 대한 쿼리는 역색인을 사용하여 관련 문서를 빠르게 찾습니다.</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">JSON 분할 활성화<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>이 기능을 활성화하려면 <code translate="no">milvus.yaml</code> 구성 파일에서 <code translate="no">common.enabledJSONShredding</code> 을 <code translate="no">true</code> 으로 설정하십시오. 새로운 데이터가 유입되면 자동으로 분할 프로세스가 실행됩니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 기능이 활성화되면 Milvus는 추가적인 수동 개입 없이 데이터 수집 시 JSON 데이터를 분석하고 재구성하기 시작합니다.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">매개변수 조정<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>대부분의 사용자의 경우, JSON 분할이 활성화되면 다른 매개변수의 기본 설정만으로도 충분합니다. 하지만 <code translate="no">milvus.yaml</code> 에 있는 다음 매개변수를 사용하여 JSON 분할 동작을 세부적으로 조정할 수 있습니다.</p>
<table>
   <tr>
     <th><p>매개변수 이름</p></th>
     <th><p>설명</p></th>
     <th><p>기본값</p></th>
     <th><p>조정 안내</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>JSON 분할 빌드 및 로드 프로세스를 활성화할지 여부를 제어합니다.</p></td>
     <td><p>false</p></td>
     <td><p>이 기능을 활성화하려면 <strong>true로</strong> 설정해야 합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Milvus가 가속화를 위해 분할된 데이터를 사용할지 여부를 제어합니다.</p></td>
     <td><p>true</p></td>
     <td><p>쿼리 실패 시 복구 조치로 <strong>false로</strong> 설정하여 원래 쿼리 경로로 되돌립니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Milvus가 분할된 데이터를 로드할 때 mmap을 사용할지 여부를 결정합니다.</p><p>자세한 내용은 <a href="/docs/ko/mmap.md">mmap 사용을</a> 참조하십시오.</p></td>
     <td><p>true</p></td>
     <td><p>이 설정은 일반적으로 성능에 최적화되어 있습니다. 시스템에 특정 메모리 관리 요구 사항이나 제약 조건이 있는 경우에만 조정하십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>샤딩된 컬럼에 저장될 JSON 키의 최대 개수입니다. </p><p>자주 나타나는 키의 수가 이 제한을 초과하면, Milvus는 가장 빈도가 높은 키를 우선적으로 샤딩하고, 나머지 키는 공유 컬럼에 저장합니다.</p></td>
     <td><p>1024</p></td>
     <td><p>대부분의 시나리오에서는 이 값으로 충분합니다. 빈번하게 나타나는 키가 수천 개에 달하는 JSON의 경우 이 값을 늘려야 할 수도 있지만, 저장소 사용량을 모니터링해야 합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>JSON 키가 샤드된 컬럼으로 샤딩될 수 있도록 고려되기 위해 충족해야 하는 최소 발생 비율입니다.</p><p>이 비율이 임계값을 초과하는 키는 빈도가 높은 것으로 간주됩니다.</p></td>
     <td><p>0.3</p></td>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code> 제한을 초과하는 키가 섀딩 기준을 충족하는 경우, 이 값을<strong>늘리십시오</strong> (예: 0.5로). 이렇게 하면 임계값이 더 엄격해져 섀딩 대상 키의 수가 줄어듭니다.</p><p>기본값인 30% 임계값보다 덜 빈번하게 나타나는 키를 더 많이 분할하려면 이 값을<strong>낮추십시오</strong> (예: 0.1).</p></td>
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
    </button></h2><p>당사의 테스트 결과, 다양한 JSON 키 유형과 쿼리 패턴 전반에 걸쳐 상당한 성능 향상이 확인되었습니다.</p>
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
<li><p><strong>데이터 세트</strong>: <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a>의 문서 100만 개</p></li>
<li><p><strong>평균 문서 크기</strong>: 478.89바이트</p></li>
<li><p><strong>테스트 기간</strong>: QPS 및 지연 시간 측정, 100초</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">결과: 유형이 지정된 키<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
     <th><p>QPS (샤딩 미적용)</p></th>
     <th><p>QPS (샤딩 적용 시)</p></th>
     <th><p>성능 향상</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>정수</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33배</p></td>
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
    </button></h3><p>이 테스트는 “공유” 범주에 속하는 스파스하고 중첩된 키에 대한 쿼리에 중점을 두었습니다.</p>
<table>
   <tr>
     <th><p>쿼리 표현식</p></th>
     <th><p>키 값 유형</p></th>
     <th><p>QPS (셔딩 미적용)</p></th>
     <th><p>QPS (셔딩 적용 시)</p></th>
     <th><p>성능 향상</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>중첩된 정수</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9배</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>중첩된 문자열</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3배</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">주요 통찰<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>공유 키 쿼리에서</strong> 가장 극적인 성능 향상(최대 89배 빨라짐)이 나타남</p></li>
<li><p>유형<strong>지정 키 쿼리는</strong> 일관되게 15~30배의 성능 향상을 제공합니다</p></li>
<li><p><strong>모든 쿼리 유형에서</strong> 성능 저하 없이 JSON 분할의 이점을 누릴 수 있습니다</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>JSON 슈레딩이 제대로 작동하는지 어떻게 확인할 수 있나요?</strong></p>
<ol>
<li><p>먼저, <a href="/docs/ko/birdwatcher_usage_guides.md">Birdwatcher</a> 도구의 ` <code translate="no">show segment --format table</code> ` 명령어를 사용하여 데이터가 구축되었는지 확인하십시오. 성공하면 출력 결과의 <strong>‘Json Key Stats’</strong> 필드 아래에 ‘ <code translate="no">shredding_data/</code> ’ 및 ‘ <code translate="no">shared_key_index/</code> ’가 표시됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Birdwatcher 출력</span>
  
 </span></p></li>
<li><p>다음으로, 쿼리 노드에서 ` <code translate="no">show loaded-json-stats</code> ` 명령을 실행하여 데이터가 로드되었는지 확인하십시오. 출력 결과에는 각 쿼리 노드별로 로드된 분할된 데이터에 대한 세부 정보가 표시됩니다.</p></li>
</ol></li>
<li><p><strong>오류가 발생하면 어떻게 해야 하나요?</strong></p>
<p>빌드 또는 로드 프로세스가 실패하면 <code translate="no">common.enabledJSONShredding=false</code> 를 설정하여 해당 기능을 빠르게 비활성화할 수 있습니다. 남아 있는 작업을 모두 지우려면 <a href="/docs/ko/birdwatcher_usage_guides.md">Birdwatcher에서</a> <code translate="no">remove stats-task &lt;task_id&gt;</code> 명령을 사용하십시오. 쿼리가 실패하면 <code translate="no">common.usingjsonShreddingForQuery=false</code> 를 설정하여 분할된 데이터를 우회하고 원래 쿼리 경로로 되돌릴 수 있습니다.</p></li>
</ul>
<ul>
<li><p><strong>JSON 분할과 JSON 인덱싱 중 하나를 선택하려면 어떻게 해야 하나요?</strong></p>
<ul>
<li><p><strong>JSON 분할은</strong> 문서에서 빈번하게 나타나는 키, 특히 복잡한 JSON 구조에 이상적입니다. 이 기능은 열 기반 저장소와 역색인 방식의 장점을 결합하여, 다양한 키를 쿼리하는 읽기 위주의 시나리오에 매우 적합합니다. 그러나 성능 향상 효과가 미미하므로 매우 작은 JSON 문서에는 권장되지 않습니다. JSON 문서의 전체 크기 대비 키 값의 비율이 작을수록, 분할을 통한 성능 최적화 효과가 더 큽니다.</p></li>
<li><p><strong>JSON 인덱싱은</strong> 특정 키 기반 쿼리에 대한 표적 최적화에 더 적합하며, 스토리지 오버헤드가 더 낮습니다. 이는 비교적 단순한 JSON 구조에 적합합니다. JSON 샤딩은 배열 내부의 키에 대한 쿼리를 처리하지 않으므로, 이러한 쿼리의 성능을 높이려면 JSON 인덱스가 필요합니다.</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/json-field-overview.md#Next-Accelerate-JSON-queries">JSON 필드 개요를</a> 참조하십시오.</p></li>
</ul>
