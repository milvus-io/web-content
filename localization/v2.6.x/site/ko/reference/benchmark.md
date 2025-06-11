---
id: benchmark.md
summary: Milvus의 벤치마크 결과에 대해 알아보세요.
title: Milvus 2.2 벤치마크 테스트 보고서
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.2 벤치마크 테스트 보고서<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>이 보고서는 Milvus 2.2.0의 주요 테스트 결과를 보여줍니다. 특히 스케일업 및 스케일아웃 기능에서 Milvus 2.2.0의 검색 성능을 파악하는 데 목적이 있습니다.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>최근 Milvus 2.2.3에 대한 벤치마크를 실행한 결과 다음과 같은 주요 결과를 얻었습니다:</p>
    <ul>
      <li>검색 지연 시간 2.5배 감소</li>
      <li>QPS 4.5배 증가</li>
      <li>성능 저하가 거의 없는 수십억 개 규모의 유사도 검색 가능</li>
      <li>여러 복제본 사용 시 선형적인 확장성</li>
    </ul>
    <p>자세한 내용은 <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">이 백서</a> 및 <a href="https://github.com/zilliztech/VectorDBBench">관련 벤치마크 테스트 코드를</a> 참조하세요. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">요약<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>Milvus 2.1과 비교하여 Milvus 2.2.0의 QPS는 클러스터 모드에서 48% 이상, 독립형 모드에서 75% 이상 증가했습니다.</li>
<li>Milvus 2.2.0은 스케일 업 및 스케일 아웃 기능이 매우 뛰어납니다:<ul>
<li>CPU 코어를 8개에서 32개로 확장할 때 QPS가 선형적으로 증가합니다.</li>
<li>쿼리노드 복제본을 1개에서 8개로 확장할 때 QPS는 선형적으로 증가합니다.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">용어<button data-href="#Terminology" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary>테스트에 사용된 용어에 대한 자세한 내용을 보려면 클릭하세요.</summary>
<table class="terminology">
<thead>
<tr>
<th>용어</th>
<th>설명</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>한 번의 검색 요청으로 검색할 벡터의 수입니다.</td>
</tr>
<tr>
<td>topk</td>
<td>검색 요청에서 각 벡터에 대해 검색할 가장 가까운 벡터의 수(nq 단위)</td>
</tr>
<tr>
<td>ef</td>
<td><a href="https://milvus.io/docs/v2.2.x/index.md">HNSW 인덱스에</a> 특정한 검색 파라미터</td>
</tr>
<tr>
<td>RT</td>
<td>요청을 전송한 후 응답을 받기까지의 응답 시간</td>
</tr>
<tr>
<td>QPS</td>
<td>초당 성공적으로 처리된 검색 요청 수</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">테스트 환경<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 테스트는 다음 환경에서 수행됩니다.</p>
<h3 id="Hardware-environment" class="common-anchor-header">하드웨어 환경</h3><table>
<thead>
<tr><th>하드웨어</th><th>사양</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>인텔® 제온® 골드 6226R CPU @ 2.90GHz</td></tr>
<tr><td>메모리</td><td>16*\32GB RDIMM, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">소프트웨어 환경</h3><table>
<thead>
<tr><th>소프트웨어</th><th>버전</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">배포 체계</h3><ul>
<li>Milvus 인스턴스(독립형 또는 클러스터)는 물리적 또는 가상 머신을 기반으로 하는 Kubernetes 클러스터에 <a href="https://milvus.io/docs/install_standalone-helm.md">헬름을</a> 통해 배포됩니다.</li>
<li>다른 테스트는 단지 CPU 코어 수, 메모리 크기, 복제본(워커 노드) 수에 차이가 있을 뿐이며, 이는 Milvus 클러스터에만 적용됩니다.</li>
<li>지정되지 않은 구성은 <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">기본 구성과</a> 동일합니다.</li>
<li>Milvus 종속성(MinIO, Pulsar 및 Etcd)은 각 노드의 로컬 SSD에 데이터를 저장합니다.</li>
<li>검색 요청은 <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK를</a> 통해 Milvus 인스턴스로 전송됩니다.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">데이터 세트</h3><p>이 테스트는 <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks의</a> 오픈 소스 데이터 세트 SIFT(128개 차원)를 사용합니다.</p>
<h2 id="Test-pipeline" class="common-anchor-header">테스트 파이프라인<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>각 테스트에 나열된 각 서버 구성으로 헬름으로 Milvus 인스턴스를 시작합니다.</li>
<li>Milvus GO SDK를 통해 Milvus 인스턴스에 연결하고 해당 테스트 결과를 얻습니다.</li>
<li>컬렉션을 생성합니다.</li>
<li>1백만 개의 SIFT 벡터를 삽입합니다. <code translate="no">M</code> 을 <code translate="no">8</code> 으로, <code translate="no">efConstruction</code> 을 <code translate="no">200</code> 으로 설정하여 HNSW 인덱스를 빌드하고 인덱스 파라미터를 구성합니다.</li>
<li>컬렉션을 로드합니다.</li>
<li>검색 매개변수 <code translate="no">nq=1, topk=1, ef=64</code> 를 사용하여 다른 동시 수로 검색하며, 각 동시 지속 시간은 최소 1시간입니다.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">테스트 결과<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 대 Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">클러스터</h4><p><details>
<summary><b>서버 구성(클러스터)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>검색 성능</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99)/ms</th><th>RT(TP50) / ms</th><th>실패/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>클러스터 검색 성능</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">독립형</h4><p><details>
<summary><b>서버 구성(독립형)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>검색 성능</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99)/ms</th><th>RT(TP50) / ms</th><th>실패/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>독립형 검색 성능</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 스케일업</h3><p>하나의 쿼리노드에서 CPU 코어를 확장하여 확장 기능을 확인합니다.</p>
<p><details>
<summary><b>서버 구성(클러스터)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>검색 성능</strong></p>
<table>
<thead>
<tr><th>CPU 코어</th><th>동시 접속자 수</th><th>QPS</th><th>RT(TP99)/ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>쿼리노드 CPU 코어별 검색 성능</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 스케일 아웃</h3><p>더 많은 쿼리노드로 더 많은 복제본을 확장하여 스케일아웃 기능을 확인합니다.</p>
<div class="alert note">
<p>참고: 컬렉션을 로드할 때 쿼리노드 수는 <code translate="no">replica_number</code> 과 같습니다.</p>
</div>
<p><details>
<summary><b>서버 구성(클러스터)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>복제본</th><th>동시 수</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>쿼리노드 복제본별 검색 성능</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>이 <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">가이드를</a> 참조하여 Milvus 2.2.0 벤치마크 테스트를 직접 수행해 보세요. 단, 이 가이드에서는 Milvus 2.2 및 Pymilvus 2.2를 사용해야 한다는 점을 참고하세요.</li>
</ul>
