---
id: warm-up.md
title: 워밍업Compatible with Milvus 2.6.4+
summary: >-
  워밍업은 세그먼트가 쿼리 가능해지기 전에 선택한 필드나 인덱스를 캐시에 미리 로드하여 계층형 스토리지를 보완합니다. 클러스터, 컬렉션 또는
  개별 필드/색인 수준에서 워밍업을 구성하여 첫 번째 쿼리 대기 시간 및 리소스 사용량을 세밀하게 제어할 수 있습니다.
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
    </button></h1><p><strong>워밍업은</strong> 세그먼트가 쿼리 가능해지기 전에 선택한 필드나 인덱스를 캐시에 미리 로드하여 계층형 스토리지를 보완합니다. 클러스터, 컬렉션 또는 개별 필드/색인 수준에서 워밍업을 구성하여 첫 번째 쿼리 대기 시간 및 리소스 사용량을 세밀하게 제어할 수 있습니다.</p>
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
    </button></h2><p>계층형 스토리지의<a href="/docs/ko/tiered-storage-overview.md#Phase-1-Lazy-load">지연 로드는</a> 처음에 메타데이터만 로드하여 효율성을 개선합니다. 하지만 필요한 청크나 인덱스를 원격 스토리지에서 가져와야 하므로 콜드 데이터에 대한 첫 번째 쿼리에서 지연 시간이 발생할 수 있습니다.</p>
<p><strong>워밍업은</strong> 세그먼트 초기화 중에 중요한 데이터를 사전에 캐싱하여 이 문제를 해결합니다.</p>
<p>특히 다음과 같은 경우에 유용합니다:</p>
<ul>
<li><p>특정 스칼라 인덱스가 필터 조건에서 자주 사용되는 경우.</p></li>
<li><p>벡터 인덱스는 검색 성능에 필수적이며 즉시 준비되어야 합니다.</p></li>
<li><p>쿼리 노드 재시작 또는 새 세그먼트 로드 후 콜드 스타트 지연은 용납할 수 없습니다.</p></li>
</ul>
<p>반면, 자주 쿼리되지 않는 필드나 인덱스에는 워밍업을 사용하지 않는 것이 <strong>좋습니다</strong>. 워밍업을 비활성화하면 세그먼트 로드 시간이 단축되고 캐시 공간이 절약되므로 큰 벡터 필드나 중요하지 않은 스칼라 필드에 이상적입니다.</p>
<h2 id="Configuration-levels" class="common-anchor-header">구성 수준<button data-href="#Configuration-levels" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p><strong>Level</strong></p></th>
     <th><p><strong>범위</strong></p></th>
     <th><p><strong>구성 방법</strong></p></th>
     <th><p><strong>우선순위</strong></p></th>
   </tr>
   <tr>
     <td><p>필드/색인</p></td>
     <td><p>단일 필드 또는 인덱스</p></td>
     <td><p>SDK 메서드: </p><ul><li><p><code translate="no">add_field()</code></p></li><li><p><code translate="no">alter_collection_field()</code></p></li><li><p><code translate="no">add_index()</code></p></li><li><p><code translate="no">alter_index_properties()</code></p></li></ul></td>
     <td><p>가장 높음</p></td>
   </tr>
   <tr>
     <td><p>컬렉션</p></td>
     <td><p>컬렉션의 모든 필드/색인</p></td>
     <td><p>SDK 메서드:</p><ul><li><p><code translate="no">create_collection()</code></p></li><li><p><code translate="no">alter_collection_properties()</code></p></li></ul></td>
     <td><p>중간</p></td>
   </tr>
   <tr>
     <td><p>클러스터</p></td>
     <td><p>클러스터의 모든 컬렉션</p></td>
     <td><p><code translate="no">milvus.yaml</code> 구성 파일</p></td>
     <td><p>낮음(기본값)</p></td>
   </tr>
</table>
<p><strong>동작 재정의:</strong></p>
<ul>
<li><p>필드에 자체 준비 설정이 있는 경우 해당 설정이 컬렉션 수준 및 클러스터 수준 설정보다 우선합니다.</p></li>
<li><p>필드 또는 인덱스 수준 설정이 존재하지 않으면 컬렉션 수준 설정이 적용됩니다.</p></li>
<li><p>필드 또는 인덱스 수준 설정과 컬렉션 수준 설정이 모두 존재하지 않으면 클러스터 수준이 적용됩니다.</p></li>
<li><p>변경 작업을 사용하는 경우 가장 최근 변경 값이 적용됩니다.</p></li>
</ul>
<h2 id="Configure-warmup-at-cluster-level" class="common-anchor-header">클러스터 수준에서 워밍업 구성<button data-href="#Configure-warmup-at-cluster-level" class="anchor-icon" translate="no">
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
    </button></h2><p>클러스터 수준 워밍업은 Milvus 구성 파일( <code translate="no">milvus.yaml</code> )에서 구성되며 클러스터의 모든 컬렉션에 적용됩니다. 이것이 기본값으로 사용됩니다.</p>
<p>각 대상 유형은 두 가지 설정을 지원합니다:</p>
<table>
   <tr>
     <th><p>워밍업 설정</p></th>
     <th><p>설명</p></th>
     <th><p>일반적인 시나리오</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>세그먼트가 쿼리 가능 상태가 되기 전에 미리 로드합니다. 로드 시간이 약간 증가하지만 첫 번째 쿼리에는 지연 시간이 발생하지 않습니다.</p></td>
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
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>워밍업 설정</p></th>
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
<h2 id="Configure-warmup-at-collection-level--Milvus-2611+" class="common-anchor-header">컬렉션 수준에서 워밍업 구성<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-collection-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 수준 워밍업을 사용하면 특정 컬렉션에 대한 클러스터 기본값을 재정의할 수 있습니다. 이 기능은 컬렉션의 액세스 패턴이 클러스터 전체 기준과 다른 경우에 유용합니다.</p>
<h3 id="Set-warmup-when-creating-a-collection" class="common-anchor-header">컬렉션을 만들 때 워밍업 설정<button data-href="#Set-warmup-when-creating-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorField&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-collection" class="common-anchor-header">기존 컬렉션의 워밍업 설정 변경하기<button data-href="#Alter-warmup-settings-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">load()</code> 을 호출하기 전에 컬렉션 속성을 변경해야 합니다. 로드된 컬렉션을 변경하면 오류가 반환됩니다. 워밍업 설정 변경 사항은 다음에 컬렉션을 로드할 때 적용됩니다.</p>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,
        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>속성 참조</strong>:</p>
<table>
   <tr>
     <th><p><strong>속성</strong></p></th>
     <th><p><strong>워밍업 설정</strong></p></th>
     <th><p><strong>설명</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>컬렉션의 모든 스칼라 필드에 대한 워밍업 설정입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>컬렉션의 모든 스칼라 인덱스에 대한 워밍업 설정입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>컬렉션의 모든 벡터 필드에 대한 워밍업 설정입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>컬렉션의 모든 벡터 인덱스에 대한 워밍업 설정입니다.</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-field-level--Milvus-2611+" class="common-anchor-header">필드 수준에서 워밍업 구성<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-field-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>필드 수준 워밍업은 가장 세밀한 세분성을 제공하여 개별 필드의 워밍업 동작을 제어할 수 있습니다. 이 기능은 특정 필드에 고유한 액세스 패턴이 있는 경우에 유용합니다.</p>
<p>필드 수준 워밍업은 해당 필드의 인덱스가 아닌 <strong>필드 원시 데이터에만</strong> 적용됩니다. 인덱스에 대한 준비 작업을 구성하려면 <a href="https://file+.vscode-resource.vscode-cdn.net/Users/liyun/writingLab/3.0-milvus/warm-up/output/warm-up.md#Configure-warmup-at-index-level">인덱스 수준 구성을</a> 사용합니다.</p>
<h3 id="Set-warmup-when-creating-a-field" class="common-anchor-header">필드 생성 시 준비 설정<button data-href="#Set-warmup-when-creating-a-field" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
    warmup=<span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this field at load time</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    warmup=<span class="hljs-string">&quot;disable&quot;</span>  <span class="hljs-comment"># Do not preload vector raw data</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-field" class="common-anchor-header">기존 필드에서 준비 설정 변경<button data-href="#Alter-warmup-settings-on-an-existing-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">load()</code> 을 호출하기 전에 필드 설정을 변경해야 합니다. 로드된 컬렉션에서 필드를 변경하면 오류가 반환됩니다. 워밍업 설정 변경 사항은 다음에 컬렉션을 로드할 때 적용됩니다.</p>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    field_params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-warmup-at-index-level--Milvus-2611+" class="common-anchor-header">인덱스 수준에서 워밍업 구성<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-index-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스 수준 워밍업을 사용하면 기본 필드의 워밍업 설정과 관계없이 개별 인덱스에 대한 사전 로드를 제어할 수 있습니다.</p>
<h3 id="Set-warmup-when-creating-an-index" class="common-anchor-header">인덱스 생성 시 워밍업 설정<button data-href="#Set-warmup-when-creating-an-index" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">256</span>,
        <span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this index at load time</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>}  <span class="hljs-comment"># Do not preload this index</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-index" class="common-anchor-header">기존 인덱스의 워밍업 설정 변경<button data-href="#Alter-warmup-settings-on-an-existing-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">load()</code> 을 호출하기 전에 인덱스 설정을 변경해야 합니다. 로드된 컬렉션의 인덱스를 변경하면 오류가 반환됩니다. 워밍업 설정 변경 사항은 다음에 컬렉션을 로드할 때 적용됩니다.</p>
<pre><code translate="no" class="language-python">client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    properties={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Warmup-behavior-reference" class="common-anchor-header">워밍업 동작 참조<button data-href="#Warmup-behavior-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표에는 세그먼트 수명 주기의 여러 단계에서의 워밍업 동작이 요약되어 있습니다.</p>
<table>
   <tr>
     <th><p><strong>워밍업 설정</strong></p></th>
     <th><p><strong>로드 단계</strong></p></th>
     <th><p><strong>검색/쿼리 단계</strong></p></th>
     <th><p><strong>릴리스 단계</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>데이터가 로컬 스토리지에 로드됩니다. 대상(디스크 또는 메모리)은 MMAP 설정에 따라 다릅니다.</p></td>
     <td><p>쿼리가 로컬 캐시에 직접 도달합니다.</p></td>
     <td><p>로컬 캐시에 캐시된 데이터가 지워집니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>데이터가 로컬 스토리지에 로드되지 않습니다.</p></td>
     <td><p>데이터는 필요에 따라 개체 저장소에서 가져온 다음 mmap 설정에 따라 로컬로 캐시됩니다.</p></td>
     <td><p>로컬 캐시된 데이터가 지워집니다.</p></td>
   </tr>
</table>
<p><strong>mmap과의 상호 작용</strong></p>
<table>
   <tr>
     <th><p><strong>워밍업 설정</strong></p></th>
     <th><p><strong>Mmap 사용</strong></p></th>
     <th><p><strong>데이터 위치</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>로컬 디스크 (<code translate="no">localStorage.path/cache/...</code>)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>로컬 메모리</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>첫 번째 액세스 시 로컬 디스크로 가져옴</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>첫 번째 액세스 시 로컬 메모리로 가져옴</p></td>
   </tr>
</table>
<p><strong>로컬 캐시 디렉터리 구조(mmap이 활성화된 경우):</strong></p>
<table>
   <tr>
     <th><p><strong>데이터 유형</strong></p></th>
     <th><p><strong>디렉토리 경로</strong></p></th>
   </tr>
   <tr>
     <td><p>스칼라/벡터 필드 데이터</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/...</code></p></td>
   </tr>
   <tr>
     <td><p>스칼라/벡터 인덱스 파일</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/index_files/...</code></p></td>
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
