---
id: monitor.md
title: 모니터링 서비스 배포
related_key: 'monitor, alert'
summary: Prometheus를 사용하여 Milvus 클러스터에 대한 모니터링 서비스를 배포하는 방법을 알아보세요.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">쿠버네티스에 모니터링 서비스 배포하기<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Prometheus를 사용하여 Kubernetes의 Milvus 클러스터에 대한 모니터링 서비스를 배포하는 방법에 대해 설명합니다.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Prometheus로 메트릭 모니터링<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>메트릭은 시스템의 실행 상태에 대한 정보를 제공하는 지표입니다. 예를 들어, 메트릭을 사용하면 Milvus의 데이터 노드가 얼마나 많은 메모리 또는 CPU 리소스를 소비하는지 파악할 수 있습니다. Milvus 클러스터에 있는 구성 요소의 성능과 상태를 파악하면 정보를 잘 파악할 수 있으므로 더 나은 의사 결정을 내리고 더 적시에 리소스 할당을 조정할 수 있습니다.</p>
<p>일반적으로 메트릭은 <a href="https://prometheus.io/">Prometheus와</a> 같은 시계열 데이터베이스(TSDB)에 저장되며, 메트릭은 타임스탬프와 함께 기록됩니다. Milvus 서비스를 모니터링하는 경우, 내보내기가 설정한 엔드포인트에서 데이터를 가져오는 데 Prometheus를 사용할 수 있습니다. 그런 다음 Prometheus는 각 Milvus 구성 요소의 메트릭을 <code translate="no">http://&lt;component-host&gt;:9091/metrics</code> 으로 내보냅니다.</p>
<p>그러나 하나의 컴포넌트에 대해 여러 개의 복제본이 있을 수 있으며, 이로 인해 Prometheus의 수동 구성이 너무 복잡해질 수 있습니다. 따라서 Prometheus 모니터링 인스턴스를 자동화하고 효과적으로 관리하기 위해 Kubernetes의 확장인 <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator를</a> 사용할 수 있습니다. Prometheus Operator를 사용하면 메트릭 대상과 서비스 공급자를 수동으로 추가하는 수고를 덜 수 있습니다.</p>
<p>ServiceMonitor 사용자 정의 리소스 정의(CRD)를 사용하면 동적 서비스 집합을 모니터링하는 방법을 선언적으로 정의할 수 있습니다. 또한 레이블 선택을 사용하여 원하는 구성으로 모니터링할 서비스를 선택할 수 있습니다. Prometheus Operator를 사용하면 메트릭이 노출되는 방식을 지정하는 규칙을 도입할 수 있습니다. 수동으로 재구성할 필요 없이 설정한 규칙에 따라 새로운 서비스를 자동으로 검색할 수 있습니다.</p>
<p>다음 이미지는 Prometheus 워크플로우를 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Prometheus_architecture</span> </span></p>
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
    </button></h2><p>이 튜토리얼에서는 각 모니터링 및 알림 구성 요소를 설치하고 수동으로 구성하는 수고를 덜어주기 위해 <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus를</a> 사용합니다.</p>
<p>Kube-prometheus는 문서 및 스크립트와 함께 Kubernetes 매니페스트, <a href="http://grafana.com/">Grafana</a> 대시보드, <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus 규칙을</a> 수집합니다.</p>
<p>모니터링 서비스를 배포하기 전에, kube-prometheus 매니페스트 디렉터리의 구성을 사용하여 모니터링 스택을 생성해야 합니다.</p>
<pre><code translate="no">$ git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
기본 prometheus-k8s 클러스터 역할은 밀버스의 메트릭을 캡처할 수 없으므로 패치가 필요합니다:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>스택을 삭제하려면 <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> 을 실행한다.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">쿠버네티스에 모니터링 서비스 배포하기<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. 대시보드에 액세스합니다.</h3><p>Prometheus 서비스를 포트 <code translate="no">9090</code> 로, Grafana 서비스를 포트 <code translate="no">3000</code> 로 전달합니다.</p>
<pre><code translate="no">$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. ServiceMonitor 활성화</h3><p>서비스 모니터는 기본적으로 밀버스 헬름에 대해 활성화되어 있지 않습니다. 쿠버네티스 클러스터에 프로메테우스 오퍼레이터를 설치한 후, 파라미터 <code translate="no">metrics.serviceMonitor.enabled=true</code> 를 추가하여 활성화할 수 있다.</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span> --reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>설치가 완료되면 <code translate="no">kubectl</code> 를 사용하여 ServiceMonitor 리소스를 확인합니다.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
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
<li>Milvus 클러스터에 대한 모니터링 서비스를 배포한 경우 다음 방법을 배울 수도 있습니다:<ul>
<li><a href="/docs/ko/v2.4.x/visualize.md">Grafana에서 Milvus 메트릭 시각화하기</a></li>
<li><a href="/docs/ko/v2.4.x/alert.md">Milvus 서비스에 대한 알림 만들기</a></li>
<li><a href="/docs/ko/v2.4.x/allocate.md">리소스 할당</a> 조정하기</li>
</ul></li>
<li>Milvus 클러스터를 확장하는 방법에 대한 정보를 찾고 계신다면 이 도움말을 참조하세요:<ul>
<li><a href="/docs/ko/v2.4.x/scaleout.md">Milvus 클러스터 확장</a> 알아보기</li>
</ul></li>
<li>Milvus 버전 업그레이드에 관심이 있으신 경우,<ul>
<li><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-operator.md">Milvus 클러스터 업그레이드 가이드와</a> <a href="/docs/ko/v2.4.x/upgrade_milvus_standalone-operator.md">Milvus 독립형 업그레이드</a> <a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-operator.md">가이드를</a> 읽어보세요.</li>
</ul></li>
</ul>
