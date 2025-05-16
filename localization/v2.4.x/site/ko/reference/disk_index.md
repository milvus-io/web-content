---
id: disk_index.md
related_key: disk_index
summary: Milvus의 디스크 인덱스 메커니즘.
title: 온디스크 인덱스
---
<h1 id="On-disk-Index" class="common-anchor-header">온디스크 인덱스<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>이 문서에서는 DiskANN이라는 온디스크 인덱싱 알고리즘을 소개합니다. DiskANN은 Vamana 그래프를 기반으로 대규모 데이터 세트 내에서 효율적인 검색을 지원합니다.</p>
<p>쿼리 성능을 향상시키기 위해 각 벡터 필드에 대해 <a href="/docs/ko/v2.4.x/index-vector-fields.md">인덱스 유형을 지정할</a> 수 있습니다.</p>
<div class="alert note"> 
현재 벡터 필드는 하나의 인덱스 유형만 지원합니다. Milvus는 인덱스 유형을 전환할 때 이전 인덱스를 자동으로 삭제합니다.</div>
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
    </button></h2><p>DiskANN을 사용하려면 다음 사항에 유의하세요.</p>
<ul>
<li>DiskANN은 기본적으로 비활성화되어 있습니다. 온디스크 인덱스보다 인메모리 인덱스를 선호하는 경우 더 나은 성능을 위해 이 기능을 비활성화하는 것이 좋습니다.<ul>
<li>이 기능을 비활성화하려면 milvus 구성 파일에서 <code translate="no">queryNode.enableDisk</code> 을 <code translate="no">false</code> 으로 변경하면 됩니다.</li>
<li>다시 활성화하려면 <code translate="no">queryNode.enableDisk</code> 을 <code translate="no">true</code> 으로 설정하면 됩니다.</li>
</ul></li>
<li>Milvus 인스턴스는 Ubuntu 18.04.6 이상 릴리스에서 실행됩니다.</li>
<li>Milvus 데이터 경로는 전체 성능을 위해 NVMe SSD에 마운트해야 합니다:<ul>
<li>Milvus 독립 실행형 인스턴스의 경우, 데이터 경로는 인스턴스가 실행되는 컨테이너의 <strong>/var/lib/milvus/data여야</strong> 합니다.</li>
<li>Milvus 클러스터 인스턴스의 경우, 데이터 경로는 쿼리 노드 및 인덱스 노드가 실행되는 컨테이너의 <strong>/var/lib/milvus/data여야</strong> 합니다.</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN을 사용하려면 다음 사항을 준수해야 합니다.</p>
<ul>
<li>데이터에 차원이 1개 이상인 플로트 벡터만 사용하세요.</li>
<li>벡터 사이의 거리를 측정할 때는 유클리드 거리(L2), 내적 곱(IP) 또는 COSINE만 사용하세요.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">색인 및 검색 설정<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>인덱스 구축 매개변수</p>
<p>DiskANN 인덱스를 구축할 때 인덱스 유형으로 <code translate="no">DISKANN</code> 을 사용합니다. 인덱스 매개변수는 필요하지 않습니다.</p></li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>후보 목록의 크기로, 크기가 클수록 리콜률이 높아지지만 성능이 저하됩니다.</td><td>[TOPK, INT32_MAX]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">DiskANN 관련 Milvus 구성<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN은 조정할 수 있습니다. <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> 에서 DiskANN 관련 매개변수를 수정하여 성능을 개선할 수 있습니다.</p>
<pre><code translate="no" class="language-YAML">...
DiskIndex:
  MaxDegree: 56
  SearchListSize: 100
  PQCodeBugetGBRatio: 0.125
  SearchCacheBudgetGBRatio: 0.125
  BeamWidthRatio: 4.0
...
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>값 범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Vamana 그래프의 최대 정도. <br/> 값이 클수록 리콜률이 높아지지만 인덱스의 크기와 구축 시간이 늘어납니다.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>후보 목록의 크기. <br/> 값이 클수록 인덱스 구축에 소요되는 시간은 증가하지만, 리콜률은 높아집니다. <br/> 인덱스 구축 시간을 줄여야 하는 경우가 아니라면 <code translate="no">MaxDegree</code> 보다 작은 값으로 설정하세요.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>PQ 코드의 크기 제한입니다. <br/> 값이 클수록 리콜률이 높아지지만 메모리 사용량이 증가합니다.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>원시 데이터에 대한 캐시된 노드 번호의 비율. <br/> 값이 클수록 메모리 사용량이 증가하여 인덱스 구축 성능이 향상됩니다.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>검색 반복당 최대 IO 요청 수와 CPU 수 사이의 비율입니다.</td><td>[1, 최대(128 / CPU 수, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">문제 해결<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p><code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code> 오류를 어떻게 처리하나요?</p>
<p>Linux 커널은 프로세스가 여러 I/O 작업이 완료될 때까지 기다릴 필요 없이 동시에 시작할 수 있는 비동기 비차단 I/O(AIO) 기능을 제공합니다. 이를 통해 처리와 I/O가 겹칠 수 있는 애플리케이션의 성능을 향상시킬 수 있습니다.</p>
<p>proc 파일 시스템의 <code translate="no">/proc/sys/fs/aio-max-nr</code> 가상 파일을 사용하여 성능을 조정할 수 있습니다. <code translate="no">aio-max-nr</code> 매개 변수는 허용되는 최대 동시 요청 수를 결정합니다.</p>
<p><code translate="no">aio-max-nr</code> 기본값은 <code translate="no">65535</code> 이며 <code translate="no">10485760</code> 로 설정할 수 있습니다.</p></li>
</ul>
