---
id: visualize.md
title: 메트릭 시각화
related_key: 'monitor, alert'
summary: Grafana에서 Milvus 메트릭을 시각화하는 방법을 알아보세요.
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Grafana에서 Milvus 메트릭 시각화하기<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>이 도움말 항목에서는 Grafana를 사용하여 Milvus 메트릭을 시각화하는 방법에 대해 설명합니다.</p>
<p><a href="/docs/ko/v2.4.x/monitor.md">모니터링 가이드에</a> 설명된 대로 메트릭에는 특정 Milvus 구성 요소에서 사용하는 메모리 양과 같은 유용한 정보가 포함되어 있습니다. 메트릭을 모니터링하면 Milvus 성능과 실행 상태를 더 잘 이해할 수 있으므로 리소스 할당을 적시에 조정할 수 있습니다.</p>
<p>시각화는 시간 경과에 따른 리소스 사용량 변화를 차트로 보여주는 것으로, 특히 이벤트 발생 시 리소스 사용량 변화를 빠르게 확인하고 알아차리기 쉽습니다.</p>
<p>이 튜토리얼에서는 시계열 분석을 위한 오픈 소스 플랫폼인 Grafana를 사용하여 Kubernetes(K8)에 배포된 Milvus 클러스터의 다양한 성능 메트릭을 시각화합니다.</p>
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
    </button></h2><ul>
<li><a href="/docs/ko/v2.4.x/install_cluster-helm.md">K8s에 Milvus 클러스터를 설치했습니다.)</a></li>
<li>메트릭을 시각화하기 위해 Grafana를 사용하기 전에 메트릭을 모니터링하고 수집하도록 <a href="/docs/ko/v2.4.x/monitor.md">Prometheus를 구성해야</a> 합니다. 설정이 성공하면 <code translate="no">http://localhost:3000</code> 에서 Grafana에 액세스할 수 있습니다. 또는 <code translate="no">admin:admin</code> 의 기본 Grafana <code translate="no">user:password</code> 를 사용하여 Grafana에 액세스할 수도 있습니다.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Grafana를 사용하여 메트릭 시각화하기<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. 대시보드 다운로드 및 가져오기</h3><p>JSON 파일에서 Milvus 대시보드를 다운로드하여 가져옵니다.</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>다운로드_및_임포트</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. 메트릭 보기</h3><p>모니터링하려는 Milvus 인스턴스를 선택합니다. 그러면 Milvus 구성 요소 패널을 볼 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Select_instance</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>그라파나_패널</span> </span></p>
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
<li>Milvus 메트릭을 시각화하도록 Grafana를 설정한 경우, 다음과 같이 설정할 수도 있습니다:<ul>
<li><a href="/docs/ko/v2.4.x/alert.md">Milvus 서비스에 대한 알림을 만드는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.4.x/allocate.md">리소스 할당</a> 조정하기</li>
<li><a href="/docs/ko/v2.4.x/scaleout.md">Milvus 클러스터에서 스케일 아웃 또는 스케일링하기</a></li>
</ul></li>
<li>Milvus 버전 업그레이드에 관심이 있으신 경우,<ul>
<li><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-operator.md">Milvus 클러스터 업그레이드 가이드와</a> <a href="/docs/ko/v2.4.x/upgrade_milvus_standalone-operator.md">Milvus 독립형 업그레이드</a> <a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-operator.md">가이드를</a> 읽어보세요.</li>
</ul></li>
</ul>
