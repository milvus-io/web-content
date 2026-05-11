---
id: force-merge.md
title: 강제 병합 압축Compatible with Milvus 3.0.x
summary: 강제 병합 압축을 사용하여 작은 세그먼트를 통합하고 쿼리 성능과 저장소 효율성을 개선하세요.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">강제 병합 압축<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>강제 병합은 작고 조각난 세그먼트를 더 적은 수의 더 큰 세그먼트로 통합하여 쿼리 성능과 저장소 효율성을 개선하기 위해 고안된 기능입니다. 이 가이드에서는 강제 병합 압축을 사용하는 방법을 설명합니다.</p>
<div class="alert note">
<p>이 기능은 공개 미리 보기입니다. 프로덕션 환경에서는 사용하지 마세요.</p>
</div>
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
    </button></h2><p>표준 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">압축은</a> 다대일 병합을 통해 세그먼트 크기를 구성된 <code translate="no">maxSize</code> 근처로 유지하지만, 한도를 초과하지 않는 한 더 이상 병합할 수 없는 중간 크기의 조각이 남을 수 있습니다. 예를 들어 아래 그림과 같이 컬렉션에 2MB 세그먼트가 5개 있고 <code translate="no">maxSize</code> 이 3MB인 경우 두 세그먼트 중 하나를 병합하면 한도를 초과하므로 표준 압축으로 세그먼트 수를 더 줄일 수 없고 조각화된 레이아웃이 그대로 유지됩니다.</p>
<p>강제 병합은 <code translate="no">target_size</code> 매개변수를 추가하고 가능한 경우 엄격한 허용 오차 범위 내에서 원하는 크기로 세그먼트를 재구성할 수 있도록 지원합니다. 아래 그림과 같이 지정된 <code translate="no">target_size</code> 이 4MB인 경우 2MB의 작은 세그먼트 5개를 더 적은 수의 큰 세그먼트로 병합할 수 있습니다. 이렇게 하면 초과 세그먼트 수가 줄어들고, 기본 <code translate="no">maxSize</code> 설정보다 큰 대상을 지원하며, 대상이 매우 큰 경우 시스템에서 현재 하드웨어 및 QueryNode 토폴로지에 맞는 실제 출력 크기와 세그먼트 수를 선택할 수 있습니다.</p>
<p>어떤 압축 방법을 사용할지 알아보려면 <a href="#faq">FAQ를</a> 참조하세요.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>강제 병합 압축은 기존 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API를 <code translate="no">target_size</code> 매개변수로 확장합니다. 이전 버전과 완전히 호환되므로 <code translate="no">target_size</code> 없는 기존 압축 호출은 이전처럼 계속 작동합니다.</p>
<p>강제 병합은 비동기적으로 작동합니다. 실행 중에 I/O 및 메모리 리소스를 사용하지만 검색 또는 쿼리 작업을 차단하지는 않습니다.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">강제 병합 압축 사용<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus 버전 3.0 이상</p></li>
<li><p>PyMilvus 3.0 이상</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">전역 구성<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 구성 매개변수는 강제 병합 동작을 제어합니다. Milvus 구성 파일 또는 환경 변수를 통해 설정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>기본값</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>기본 세그먼트 최대 크기(MB)입니다. <code translate="no">target_size</code> 이 0이거나 생략된 경우 대상으로 사용됩니다. 명시적 <code translate="no">target_size</code> 에 허용되는 최소값으로도 사용됩니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>알고리즘 선택을 위한 세그먼트 수 임계값입니다. 세그먼트 수가 이 값을 초과하면 Milvus는 병합 계획에 더 빠른 욕심 알고리즘을 사용합니다.</p><ul><li><p><strong>표준 알고리즘</strong> (세그먼트 수 &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): 보다 최적의 병합 결과를 생성하지만 계산 시간이 더 오래 걸립니다.</p></li><li><p><strong>욕심 알고리즘</strong> (세그먼트 수 &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): 세그먼트 그룹화가 약간 덜 최적화되는 대신 훨씬 빠르게 계획을 완료합니다.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>데이터노드 메모리를 이 계수로 나누어 시스템에서 허용할 수 있는 최대 세그먼트 크기를 계산합니다.</p><ul><li><p>값이 클수록 병합에 더 적은 메모리를 할당하지만 다른 데이터 노드 작업을 위해 더 많은 메모리를 남겨두므로 노드 안정성이 향상됩니다.</p></li><li><p>값이 작을수록 더 큰 병합이 가능하지만 메모리 부담이 증가합니다.</p></li><li><p>예를 들어 기본 계수가 4.0이고 메모리가 16GB인 데이터 노드의 경우, 병합 예산은 4GB입니다. 즉, 단일 작업에서 병합되는 세그먼트의 총 크기가 4GB를 초과할 수 없습니다.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>최소 쿼리 노드 메모리를 이 계수로 나눈 값입니다. 자동 크기 계산(<code translate="no">target_size=max_int64</code>) 중에 병합된 세그먼트가 쿼리 노드에 의해 로드될 수 있는지 확인하기 위해 사용됩니다.</p><ul><li><p>값이 클수록 쿼리 노드가 로드하기 쉬운 작은 세그먼트가 생성됩니다.</p></li><li><p>값이 작을수록 더 큰 세그먼트를 허용하지만 메모리가 제한된 쿼리 노드에서 로드 실패가 발생할 수 있습니다.</p></li><li><p>예를 들어, 기본 계수가 4.0이고 가장 작은 쿼리 노드의 메모리가 16GB인 경우 자동 계산된 목표 크기는 4GB를 초과하지 않습니다. 이렇게 하면 강제 병합으로 인해 쿼리 노드가 로드할 수 없을 정도로 큰 세그먼트가 생성되는 것을 방지할 수 있습니다.</p></li></ul></td>
   </tr>
</table>
<p>위의 변경 사항을 Milvus 클러스터에 적용하려면 <a href="/docs/ko/configure-helm.md#Configure-Milvus-via-configuration-file">헬름으로 Milvus 구성하기</a> 및 Milvus <a href="/docs/ko/configure_operator.md">오퍼레이터로 Milvus 구성하기의</a> 단계를 따르세요.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">강제 병합 압축 트리거<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">target_size</code> 파라미터와 함께 <code translate="no">compact()</code> 를 호출하여 강제 병합 압축을 트리거합니다. 매개변수에 대한 자세한 내용은 아래 <a href="#parameter-reference">매개변수 참조를 참조</a> 하세요.</p>
<p>세 가지 강제 병합 압축 모드를 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>다음은 각 강제 병합 압축 모드의 사용 방법을 보여주는 예시입니다.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">기본값(표준 압축)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">명시적 목표 크기</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">자동 크기 계산</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">매개변수 참조</h4><p>다음 표에서는 매개변수에 대해 설명합니다.</p>
<table>
   <tr>
     <th><p><strong>매개변수</strong></p></th>
     <th><p><strong>유형</strong></p></th>
     <th><p><strong>설명</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>필수입니다. 압축할 컬렉션의 이름입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>선택 사항입니다. 대상 세그먼트 크기(MB)입니다. 매개변수 값에는 3가지 옵션이 있습니다:</p><ul><li><p><strong>0 또는 생략</strong>: 구성된 <code translate="no">dataCoord.segment.maxSize</code> (기본값: 512MB)를 사용합니다. 표준 압축과 동일합니다.</p></li><li><p><strong>명시적 값</strong>: 세그먼트를 대략 지정된 크기(MB)로 병합합니다(예: 2048). 구성된 <code translate="no">dataCoord.segment.maxSize</code> 보다 크거나 같아야 합니다.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: 현재 세그먼트 분포와 사용 가능한 노드 리소스를 기반으로 최적의 크기를 자동으로 계산합니다.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>지정된 <code translate="no">target_size</code> 이 설정된 <code translate="no">dataCoord.segment.maxSize</code> 보다 작으면 오류와 함께 요청이 거부됩니다.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">압축 진행률 확인<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>강제 병합 압축은 비동기적으로 실행됩니다. 반환된 작업 ID를 사용하여 진행 상황을 확인합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">모범 사례<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>프로덕션 환경에서는 강제 병합 압축을 사용하지 마세요.</strong></p></li>
<li><p><strong>대부분의 경우 자동 크기 계산 모드를 사용하세요.</strong> <code translate="no">target_size</code> 을 <code translate="no">max_int64</code> 으로 설정하면 Milvus가 세그먼트 분포와 노드 리소스를 분석하여 최적의 크기를 결정합니다. 특별한 크기 조정 요구 사항이 없는 한 이 방법을 권장합니다.</p></li>
<li><p><strong>성능 절충안을 고려하세요.</strong> 강제 병합 압축은 리소스 집약적인 작업입니다. 세그먼트 데이터를 읽고, 병합하고, 다시 씁니다. 쿼리 지연 시간에 미치는 영향을 최소화하려면 트래픽이 적은 시간대에 예약하세요.</p></li>
<li><p><strong>이전과 이후의 세그먼트 수를 모니터링합니다.</strong> <code translate="no">get_compaction_state()</code> 및 <code translate="no">list_persistent_segments</code> 을 사용하여 압축이 예상대로 더 적은 수의 더 큰 세그먼트를 생성했는지 확인합니다.</p></li>
</ul>
<p><a id="faq"></a></p>
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
    </button></h2><p><strong>강제 병합은 표준 압축과 어떻게 다른가요?</strong></p>
<p>이 두 가지 유형의 압축 작업은 서로 다른 용도로 사용됩니다.</p>
<ul>
<li><p>표준 압축(targetSize=0 또는 생략)은 최선의 노력으로 점진적으로 정리하는 경로입니다.</p></li>
<li><p>강제 병합(targetSize&gt;0)은 더 적은 수의, 더 큰, 목표에 가까운 세그먼트를 생성하기 위한 컬렉션 수준의 재포장 경로입니다.</p></li>
</ul>
<p>주요 차이점은 병합 형태입니다. 표준 압축은 사실상 작업당 m → 1이지만, 강제 병합은 그룹화된 입력 전체에 걸쳐 m → n입니다. 그렇기 때문에 강제 병합은 표준 압축으로는 해결할 수 없는 세그먼트 레이아웃을 해결할 수 있습니다. 다음 표는 두 가지 유형의 작업을 비교한 것입니다.</p>
<table>
   <tr>
     <th><p><strong>차원</strong></p></th>
     <th><p><strong>표준 압축(기본값)</strong></p></th>
     <th><p><strong>강제 병합</strong></p></th>
   </tr>
   <tr>
     <td><p>API 트리거</p></td>
     <td><p>targetSize=0(또는 설정되지 않음), Major/L0 플래그 없음</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>주요 목표</p></td>
     <td><p>명백한 조각의 점진적 정리, 일상적인 유지 관리</p></td>
     <td><p>검색 및 균형을 위한 컬렉션 전반의 통합</p></td>
   </tr>
   <tr>
     <td><p>세그먼트 크기 소스</p></td>
     <td><p>고정 dataCoord.segment.maxSize(서버 구성)</p></td>
     <td><p>사용자 targetSize, 이후 maxSafeSize에 의해 안전 클램핑됨</p></td>
   </tr>
   <tr>
     <td><p>매개변수 유효성</p></td>
     <td><p>사용자 크기 조정 없음</p></td>
     <td><p>사용자 targetSize는 &gt;= dataCoord.segment.maxSize여야 하며, 그렇지 않으면 거부됩니다.</p></td>
   </tr>
   <tr>
     <td><p>안전 상한</p></td>
     <td><p>구성 상한만</p></td>
     <td><p>maxSafeSize = 최소(쿼리 노드 mem, 데이터 노드 mem) / memory_factor(독립형 비풀링: 추가로 절반으로 감소)</p></td>
   </tr>
   <tr>
     <td><p>병합 모양</p></td>
     <td><p>작업당 m → 1, 출력 &lt;= configMaxSize</p></td>
     <td><p>m → n, targetSize에 가까운 출력</p></td>
   </tr>
   <tr>
     <td><p>중간 세그먼트 동작</p></td>
     <td><p>영구적으로 멈출 수 있음(예: 두 개의 60% 세그먼트는 법적으로 하나의 120% 세그먼트가 될 수 없음).</p></td>
     <td><p>재포장 + 분할 작동, "60%에서 멈춤" 패턴 없음</p></td>
   </tr>
   <tr>
     <td><p>컬렉션 평탄화 기능</p></td>
     <td><p>제한적; 반복 실행 시 여전히 중간 세그먼트가 많이 남을 수 있음</p></td>
     <td><p>강력함; 세그먼트 수를 줄이고 충만도를 높이도록 설계됨</p></td>
   </tr>
   <tr>
     <td><p>토폴로지 인식</p></td>
     <td><p>없음</p></td>
     <td><p>있음; 쿼리노드/레플리카/샤드 레이아웃 사용</p></td>
   </tr>
   <tr>
     <td><p>읽기 경로 병렬 처리 튜닝</p></td>
     <td><p>없음</p></td>
     <td><p>유효한 경우 쿼리 노드 카운트 / (레플리카 × 샤드)를 사용하여 출력 카운트 조정</p></td>
   </tr>
   <tr>
     <td><p>일반적인 사용 사례</p></td>
     <td><p>쓰기/삭제 후 이탈률이 높은 일일 정리</p></td>
     <td><p>벤치마크 준비, 검색 최적화, 로드 병렬 처리 정렬</p></td>
   </tr>
   <tr>
     <td><p>예상 범위</p></td>
     <td><p>전체 컬렉션 리패킹은 기대하지 않음</p></td>
     <td><p>컬렉션 수준의 리패킹 결과를 위한 목적</p></td>
   </tr>
</table>
<p><strong>선택 지침</strong></p>
<ul>
<li><p>위험이 낮은 점진적 정리를 위해서는 표준 압축을 선택하세요.</p></li>
<li><p>검색 및 로딩 동작에 맞춰 컬렉션을 더 적은 수의 더 큰 세그먼트로 재구성하려는 경우 강제 병합을 선택하세요.</p></li>
</ul>
<p><strong>강제 병합은 클러스터링 압축과 어떻게 다른가요?</strong></p>
<p><a href="/docs/ko/clustering-compaction.md">클러스터링</a> 압축(<code translate="no">is_clustering=True</code>)은 클러스터링 키를 기반으로 세그먼트 내의 데이터를 재구성하여 검색 가지치기를 개선합니다. 강제 병합(<code translate="no">target_size=N</code>)은 데이터 분포를 변경하지 않고 세그먼트 크기를 최적화합니다. 클러스터링 압축을 먼저 실행하여 데이터를 정리한 다음 강제 병합을 실행하여 결과 세그먼트를 통합하는 등 서로 다른 용도로 함께 사용할 수 있습니다.</p>
<p><strong>쿼리 중인 컬렉션에서 강제 병합을 실행할 수 있나요?</strong></p>
<p>예. 강제 병합은 비동기적으로 실행되며 쿼리를 차단하지 않습니다. 하지만 데이터 노드 및 디스크 I/O 리소스를 사용하므로 압축 중에 쿼리 대기 시간이 늘어날 수 있습니다. 최상의 결과를 얻으려면 트래픽이 적은 시간대에 강제 병합을 예약하세요.</p>
<p><strong>target_size를 maxSize보다 작게 설정하면 어떻게 되나요?</strong></p>
<p>요청이 오류와 함께 거부됩니다. 목표 크기는 구성된 <code translate="no">dataCoord.segment.maxSize</code> 보다 크거나 같아야 합니다.</p>
