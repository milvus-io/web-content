---
id: eviction.md
title: EvictionCompatible with Milvus 2.6.4+
summary: >-
  퇴거는 Milvus에서 각 쿼리 노드의 캐시 리소스를 관리합니다. 이 기능을 활성화하면 리소스 임계값에 도달하면 캐시된 데이터를 자동으로
  제거하여 안정적인 성능을 보장하고 메모리 또는 디스크 고갈을 방지합니다.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Eviction<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>퇴거는 Milvus에서 각 쿼리 노드의 캐시 리소스를 관리합니다. 이 기능을 활성화하면 리소스 임계값에 도달하면 캐시된 데이터를 자동으로 제거하여 안정적인 성능을 보장하고 메모리 또는 디스크 고갈을 방지합니다.</p>
<p>퇴거는 <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">최근 사용량(LRU)</a> 정책을 사용해 캐시 공간을 회수합니다. 메타데이터는 쿼리 계획에 필수적이며 일반적으로 크기가 작기 때문에 항상 캐시되고 퇴거되지 않습니다.</p>
<div class="alert note">
<p>퇴거는 명시적으로 활성화해야 합니다. 구성하지 않으면 리소스가 고갈될 때까지 캐시된 데이터가 계속 누적됩니다.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">퇴거 유형<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 최적의 리소스 관리를 위해 함께 작동하는 두 가지 상호 보완적인 퇴출 모드<strong>(동기화</strong> 및 <strong>비동기화</strong>)를 지원합니다:</p>
<table>
   <tr>
     <th><p>측면</p></th>
     <th><p>동기식 퇴거</p></th>
     <th><p>비동기 퇴거</p></th>
   </tr>
   <tr>
     <td><p>Trigger</p></td>
     <td><p>쿼리 또는 검색 중에 메모리 또는 디스크 사용량이 내부 한도를 초과할 때 발생합니다.</p></td>
     <td><p>사용량이 높은 워터마크를 초과하거나 캐시된 데이터가 TTL(Time-to-Live)에 도달하면 백그라운드 스레드에 의해 트리거됩니다.</p></td>
   </tr>
   <tr>
     <td><p>동작</p></td>
     <td><p>쿼리 노드가 캐시 공간을 회수하는 동안 쿼리 또는 검색 작업이 일시적으로 일시 중지됩니다. 사용량이 낮은 워터마크 아래로 떨어지거나 타임아웃이 발생할 때까지 퇴거가 계속됩니다. 타임아웃에 도달하여 회수할 수 있는 데이터가 충분하지 않은 경우 쿼리 또는 검색이 실패할 수 있습니다.</p></td>
     <td><p>백그라운드에서 주기적으로 실행되며, 사용량이 하이 워터마크를 초과하거나 TTL에 따라 데이터가 만료되면 캐시된 데이터를 선제적으로 제거합니다. 사용량이 낮은 워터마크 아래로 떨어질 때까지 퇴거가 계속됩니다. 쿼리는 차단되지 않습니다.</p></td>
   </tr>
   <tr>
     <td><p>최적의 대상</p></td>
     <td><p>사용량이 급증하는 동안 잠깐의 지연 시간 급증 또는 일시적인 일시 중지를 견딜 수 있는 워크로드. 비동기 퇴거로 공간을 충분히 빨리 확보할 수 없을 때 유용합니다.</p></td>
     <td><p>원활하고 예측 가능한 쿼리 성능이 필요한 지연 시간에 민감한 워크로드. 사전 예방적 리소스 관리에 이상적입니다.</p></td>
   </tr>
   <tr>
     <td><p>주의 사항</p></td>
     <td><p>퇴거 가능한 데이터가 충분하지 않은 경우 짧은 쿼리 지연 또는 시간 초과가 발생할 수 있습니다.</p></td>
     <td><p>적절하게 조정된 하이/로우 워터마크 및 TTL 설정이 필요합니다. 백그라운드 스레드에서 약간의 오버헤드가 발생합니다.</p></td>
   </tr>
   <tr>
     <td><p>설정</p></td>
     <td><p>다음을 통해 활성화 <code translate="no">evictionEnabled: true</code></p></td>
     <td><p><code translate="no">backgroundEvictionEnabled: true</code> 을 통해 활성화(동시에 <code translate="no">evictionEnabled: true</code> 필요)</p></td>
   </tr>
</table>
<p><strong>권장 설정</strong>:</p>
<ul>
<li><p>워크로드가 계층형 스토리지의 이점을 누리고 퇴거 관련 가져오기 지연 시간을 견딜 수 있다면 최적의 균형을 위해 두 퇴거 모드를 함께 사용하도록 설정할 수 있습니다.</p></li>
<li><p>성능 테스트 또는 지연 시간이 중요한 시나리오의 경우, 퇴거 후 네트워크 가져오기 오버헤드를 피하기 위해 퇴거를 완전히 비활성화하는 것을 고려하세요.</p></li>
</ul>
<div class="alert note">
<p>퇴거 가능한 필드 및 인덱스의 경우, 퇴거 단위는 로딩 단위와 일치합니다(스칼라/벡터 필드는 청크별로 퇴거되고, 스칼라/벡터 인덱스는 세그먼트별로 퇴거됩니다).</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">퇴출 활성화<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">milvus.yaml</code> 에서 <code translate="no">queryNode.segcore.tieredStorage</code> 에서 퇴거를 구성합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>유형</p></th>
     <th><p>값</p></th>
     <th><p>설명</p></th>
     <th><p>권장 사용 사례</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>퇴거 전략을 위한 마스터 스위치입니다. 기본값은 <code translate="no">false</code>. 동기화 퇴거 모드를 활성화합니다.</p></td>
     <td><p>계층형 스토리지에서는 항상 <code translate="no">true</code> 로 설정합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>백그라운드에서 비동기적으로 퇴거를 실행합니다. <code translate="no">evictionEnabled: true</code> 가 필요합니다. 기본값은 <code translate="no">false</code> 입니다.</p></td>
     <td><p>보다 원활한 쿼리 성능을 위해 <code translate="no">true</code> 을 사용하면 동기화 퇴거 빈도가 줄어듭니다.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">워터마크 구성<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>워터마크는 메모리와 디스크 모두에 대해 캐시 제거가 시작되고 종료되는 시점을 정의합니다. 각 리소스 유형에는 두 가지 임계값이 있습니다:</p>
<ul>
<li><p><strong>높은 워터마크</strong>: 사용량이 이 값을 초과하면 퇴거가 시작됩니다.</p></li>
<li><p><strong>낮은 워터마크</strong>: 사용량이 이 값 아래로 떨어질 때까지 퇴거가 계속됩니다.</p></li>
</ul>
<div class="alert note">
<p>이 구성은 <a href="/docs/ko/eviction.md#Enable-eviction">퇴거가 활성화된</a> 경우에만 적용됩니다.</p>
</div>
<p><strong>예시 YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>유형</p></th>
     <th><p>범위</p></th>
     <th><p>설명</p></th>
     <th><p>권장 사용 사례</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>퇴거가 중지되는 메모리 사용량 수준입니다.</p></td>
     <td><p><code translate="no">0.75</code> 에서 시작합니다. 쿼리 노드 메모리가 제한되어 있으면 약간 낮춥니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>비동기 퇴거가 시작되는 메모리 사용량 수준.</p></td>
     <td><p><code translate="no">0.8</code> 에서 시작합니다. 빈번한 트리거를 방지하기 위해 낮은 워터마크(예: 0.05-0.10)와 적당한 간격을 유지합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>퇴거가 중지되는 디스크 사용량 수준.</p></td>
     <td><p><code translate="no">0.75</code> 에서 시작합니다. 디스크 I/O가 제한되어 있으면 더 낮게 조정합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>비동기 퇴거가 시작되는 디스크 사용량 수준.</p></td>
     <td><p><code translate="no">0.8</code> 에서 시작합니다. 빈번한 트리거를 방지하기 위해 낮은 워터마크(예: 0.05-0.10)와 적당한 간격을 유지하세요.</p></td>
   </tr>
</table>
<p><strong>모범 사례</strong>:</p>
<ul>
<li><p>쿼리노드 정적 사용량과 쿼리 시간 버스트를 위한 헤드룸을 확보하기 위해 워터마크를 ~0.80 이상으로 높게 또는 낮게 설정하지 마세요.</p></li>
<li><p>높은 워터마크와 낮은 워터마크 사이에 큰 간격을 두지 마세요. 큰 간격은 각 퇴거 주기를 연장하고 지연 시간을 증가시킬 수 있습니다.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">캐시 TTL 구성<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>캐시 TTL(Time-to-Live)은</strong> 리소스 임계값에 도달하지 않더라도 설정된 기간이 지나면 캐시된 데이터를 자동으로 제거합니다. 이는 오래된 데이터가 캐시를 무한정 점유하는 것을 방지하기 위해 LRU 퇴거와 함께 작동합니다.</p>
<div class="alert note">
<p>캐시 TTL은 동일한 백그라운드 스레드에서 실행되므로 <code translate="no">backgroundEvictionEnabled: true</code> 이 필요합니다.</p>
</div>
<p><strong>예제 YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>유형</p></th>
     <th><p>단위</p></th>
     <th><p>설명</p></th>
     <th><p>권장 사용 사례</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>정수</p></td>
     <td><p>초</p></td>
     <td><p>캐시된 데이터가 만료되기 전까지의 기간입니다. 만료된 항목은 백그라운드에서 제거됩니다.</p></td>
     <td><p>매우 동적인 데이터의 경우 짧은 TTL(시간)을 사용하고, 안정적인 데이터 세트의 경우 긴 TTL(일)을 사용합니다. 시간 기반 만료를 사용하지 않으려면 0으로 설정합니다.</p></td>
   </tr>
</table>
