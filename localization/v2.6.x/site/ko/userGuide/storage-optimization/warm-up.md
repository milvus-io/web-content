---
id: warm-up.md
title: 워밍업Compatible with Milvus 2.6.4+
summary: >-
  Milvus에서 웜업은 콜드 데이터에 처음 액세스할 때 발생하는 첫 번째 히트 지연 시간을 완화하여 계층형 스토리지를 보완합니다. 일단
  구성되면, 웜업은 세그먼트가 쿼리 가능해지기 전에 선택한 필드나 인덱스를 캐시에 미리 로드하여 자주 액세스하는 데이터를 로드 직후에 사용할
  수 있도록 합니다.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">워밍업<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 <strong>웜업은</strong> 콜드 데이터에 처음 액세스할 때 발생하는 첫 번째 히트 지연 시간을 완화하여 계층형 스토리지를 보완합니다. 일단 구성되면, 워밍업은 세그먼트가 쿼리 가능해지기 전에 선택한 필드 또는 인덱스를 캐시에 미리 로드하여 자주 액세스하는 데이터를 로드 후 즉시 사용할 수 있도록 합니다.</p>
<h2 id="Why-warm-up" class="common-anchor-header">워밍업이 필요한 이유<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p>계층형 스토리지의<a href="/docs/ko/tiered-storage-overview.md#Phase-1-Lazy-load">지연 로드는</a> 초기에 메타데이터만 로드하여 효율성을 개선합니다. 하지만 필요한 청크나 인덱스를 오브젝트 스토리지에서 가져와야 하므로 콜드 데이터에 대한 첫 번째 쿼리에서 지연 시간이 발생할 수 있습니다.</p>
<p><strong>워밍업은</strong> 세그먼트 초기화 중에 중요한 데이터를 사전에 캐싱하여 이 문제를 해결합니다.</p>
<p>특히 다음과 같은 경우에 유용합니다:</p>
<ul>
<li><p>특정 스칼라 인덱스가 필터 조건에서 자주 사용되는 경우.</p></li>
<li><p>벡터 인덱스는 검색 성능에 필수적이며 즉시 준비되어야 합니다.</p></li>
<li><p>쿼리 노드 재시작 또는 새 세그먼트 로드 후 콜드 스타트 지연은 용납할 수 없습니다.</p></li>
</ul>
<p>반면, 자주 쿼리되지 않는 필드나 인덱스에는 워밍업을 <strong>사용하지 않는 것이 좋습니다</strong>. 워밍업을 비활성화하면 세그먼트 로드 시간이 단축되고 캐시 공간이 절약되므로 큰 벡터 필드나 중요하지 않은 스칼라 필드에 이상적입니다.</p>
<h2 id="Configuration" class="common-anchor-header">구성<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>워밍업은 <code translate="no">milvus.yaml</code> 의 <code translate="no">queryNode.segcore.tieredStorage.warmup</code> 에서 제어됩니다. 스칼라 필드, 스칼라 인덱스, 벡터 필드 및 벡터 인덱스에 대해 개별적으로 구성할 수 있습니다. 각 대상은 두 가지 모드를 지원합니다:</p>
<table>
   <tr>
     <th><p>모드</p></th>
     <th><p>설명</p></th>
     <th><p>일반적인 시나리오</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code> (기본값)</p></td>
     <td><p>세그먼트가 쿼리 가능 상태가 되기 전에 미리 로드합니다. 로드 시간은 약간 증가하지만 첫 번째 쿼리에는 지연 시간이 발생하지 않습니다.</p></td>
     <td><p>검색에 사용되는 고빈도 스칼라 인덱스나 주요 벡터 인덱스와 같이 즉시 사용 가능해야 하는 성능에 중요한 데이터에 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>사전 로딩 건너뛰기. 세그먼트를 더 빠르게 쿼리할 수 있지만 첫 번째 쿼리에서 온디맨드 로드가 트리거될 수 있습니다.</p></td>
     <td><p>원시 벡터 필드나 중요하지 않은 스칼라 필드와 같이 자주 액세스하지 않거나 큰 데이터에 사용합니다.</p></td>
   </tr>
</table>
<p><strong>예제 YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - &quot;sync&quot;: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - &quot;disable&quot;: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to &quot;sync&quot;, except for vector field which defaults to &quot;disable&quot;.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>값</p></th>
     <th><p>설명</p></th>
     <th><p>권장 사용 사례</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>스칼라 필드 데이터를 미리 로드할지 여부를 제어합니다.</p></td>
     <td><p>스칼라 필드가 작고 필터에서 자주 액세스하는 경우에만 <code translate="no">sync</code> 을 사용하세요. 그렇지 않으면 <code translate="no">disable</code> 로드 시간을 줄이려면.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>스칼라 인덱스가 미리 로드되는지 여부를 제어합니다.</p></td>
     <td><p>빈번한 필터 조건이나 범위 쿼리와 관련된 스칼라 인덱스에는 <code translate="no">sync</code> 을 사용하세요.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>벡터 필드 데이터의 사전 로드 여부를 제어합니다.</p></td>
     <td><p>일반적으로 캐시를 많이 사용하지 않으려면 <code translate="no">disable</code>. 검색 직후 원시 벡터를 검색해야 하는 경우(예: 벡터 리콜을 통한 유사성 결과)에만 <code translate="no">sync</code> 을 사용하도록 설정합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>벡터 인덱스의 사전 로드 여부를 제어합니다.</p></td>
     <td><p>검색 지연에 중요한 벡터 인덱스의 경우 <code translate="no">sync</code> 을 사용합니다. 배치 또는 저빈도 워크로드에서는 세그먼트 준비 속도를 높이려면 <code translate="no">disable</code> 을 사용하세요.</p></td>
   </tr>
</table>
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
    </button></h2><p>워밍업은 초기 로드에만 영향을 줍니다. 캐시된 데이터가 나중에 제거되면 다음 쿼리에서 필요에 따라 다시 로드됩니다.</p>
<ul>
<li><p><code translate="no">sync</code> 을 과도하게 사용하지 마세요. 너무 많은 필드를 미리 로드하면 로드 시간과 캐시 압력이 증가합니다.</p></li>
<li><p>자주 액세스하는 필드와 인덱스에 대해서만 워밍업을 보수적으로 사용하도록 설정하세요.</p></li>
<li><p>쿼리 지연 시간 및 캐시 메트릭을 모니터링한 다음 필요에 따라 사전 로딩을 확장합니다.</p></li>
<li><p>혼합 워크로드의 경우, 성능에 민감한 컬렉션에는 <code translate="no">sync</code>, 용량 중심 컬렉션에는 <code translate="no">disable</code> 을 적용하세요.</p></li>
</ul>
