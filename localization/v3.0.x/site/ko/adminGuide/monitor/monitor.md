---
id: monitor.md
title: 모니터링 서비스 배포
related_key: 'monitor, alert'
summary: Prometheus를 사용하여 Milvus 클러스터에 모니터링 서비스를 배포하는 방법을 알아보세요.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Kubernetes에 모니터링 서비스 배포하기<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Prometheus를 사용하여 Kubernetes상의 Milvus 클러스터에 모니터링 서비스를 배포하는 방법을 설명합니다.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Prometheus를 활용한 메트릭 모니터링<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>메트릭은 시스템의 실행 상태에 대한 정보를 제공하는 지표입니다. 예를 들어, 메트릭을 통해 Milvus의 데이터 노드가 메모리나 CPU 리소스를 얼마나 소비하고 있는지 파악할 수 있습니다. Milvus 클러스터 내 구성 요소의 성능과 상태를 파악하면 상황을 정확히 이해할 수 있으며, 이를 바탕으로 더 나은 의사 결정을 내리고 리소스 할당을 보다 신속하게 조정할 수 있습니다.</p>
<p>일반적으로 메트릭은 <a href="https://prometheus.io/">Prometheus와</a> 같은 시계열 데이터베이스(TSDB)에 저장되며, 타임스탬프와 함께 기록됩니다. Milvus 서비스를 모니터링하는 경우, Prometheus를 사용하여 익스포터가 설정한 엔드포인트에서 데이터를 가져올 수 있습니다. 그러면 Prometheus는 <code translate="no">http://&lt;component-host&gt;:9091/metrics</code> 에서 각 Milvus 구성 요소의 메트릭을 노출합니다.</p>
<p>그러나 하나의 구성 요소에 대해 여러 개의 레플리카가 있을 수 있어, Prometheus를 수동으로 구성하는 것이 너무 복잡해질 수 있습니다. 따라서 Kubernetes의 확장 기능인 <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator를</a> 사용하여 Prometheus 모니터링 인스턴스를 자동적이고 효율적으로 관리할 수 있습니다. Prometheus Operator를 사용하면 메트릭 대상과 서비스 제공자를 수동으로 추가해야 하는 번거로움을 덜 수 있습니다.</p>
<p>ServiceMonitor 사용자 정의 리소스 정의(CRD)를 사용하면 동적인 서비스 집합이 어떻게 모니터링될지 선언적으로 정의할 수 있습니다. 또한 레이블 선택을 통해 원하는 구성으로 모니터링할 서비스를 선택할 수도 있습니다. 프로메테우스 오퍼레이터를 사용하면 메트릭이 노출되는 방식을 지정하는 규칙을 도입할 수 있습니다. 수동 재구성 없이도 사용자가 설정한 규칙에 따라 새로운 서비스를 자동으로 탐지할 수 있습니다.</p>
<p>다음 이미지는 프로메테우스 워크플로를 보여줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
<h2 id="Prerequisites" class="common-anchor-header">필수 전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>이 튜토리얼에서는 <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus를</a> 사용하여 각 모니터링 및 알림 구성 요소를 일일이 설치하고 수동으로 구성해야 하는 번거로움을 덜어줍니다.</p>
<p>kube-prometheus는 Kubernetes 매니페스트, <a href="http://grafana.com/">Grafana</a> 대시보드, <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus 규칙을</a> 문서와 스크립트와 함께 수집합니다.</p>
<p>모니터링 서비스를 배포하기 전에 kube-prometheus 매니페스트 디렉터리에 있는 구성을 사용하여 모니터링 스택을 생성해야 합니다.</p>
<p>다음 명령어는 Kubernetes 1.35, 1.36 및 1.37을 지원하는 kube-prometheus의 <code translate="no">release-0.19</code> 브랜치를 사용합니다. 사용 중인 Kubernetes 버전에 맞는 브랜치를 선택하려면 <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">kube-prometheus 호환성 매트릭스를</a> 참조하십시오.</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
기본 prometheus-k8s 클러스터 역할은 milvus의 메트릭을 수집할 수 없으므로 패치를 적용해야 합니다:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>스택을 삭제하려면 ` <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>`를 실행하십시오.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Kubernetes에 모니터링 서비스 배포<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. 대시보드에 접속<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus 서비스를 <code translate="no">9090</code> 포트로, Grafana 서비스를 <code translate="no">3000</code> 포트로 포워딩합니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. ServiceMonitor 활성화<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Helm에서는 기본적으로 ServiceMonitor가 활성화되어 있지 않습니다. 쿠버네티스 클러스터에 Prometheus Operator를 설치한 후, <code translate="no">metrics.serviceMonitor.enabled=true</code> 매개변수를 추가하여 이를 활성화할 수 있습니다.</p>
<h4 id="With-Helm" class="common-anchor-header">Helm을 사용하는 경우</h4><p>Milvus Helm 차트를 설치한 경우, 다음과 같이 <code translate="no">metrics.serviceMonitor.enabled=true</code> 매개변수를 설정하여 ServiceMonitor를 활성화할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>이 명령어는 <code translate="no">--reset-then-reuse-values</code> 을 사용하며, 이를 사용하려면 Helm 3.14 이상이 필요합니다. 이 옵션을 사용하면 Helm은 <code translate="no">--version</code> 에 설정된 차트 버전의 기본값으로 값을 재설정하고, 현재 릴리스의 값을 적용한 다음, <code translate="no">--set</code> 의 값을 적용합니다. <code translate="no">&lt;current-chart-version&gt;</code> 를 찾으려면 <code translate="no">helm list</code> 를 실행하고, <code translate="no">CHART</code> 열의 값에서 <code translate="no">milvus-</code> 접두사를 제거하십시오. <code translate="no">helm upgrade</code> 를 <code translate="no">-f</code> 또는 <code translate="no">--set</code> 와 함께 실행하되 <code translate="no">--reset-then-reuse-values</code> 또는 <code translate="no">--reuse-values</code> 를 포함하지 않으면, Helm은 설치 시 설정한 값을 유지하지 않습니다.</p>
</div>
<p>설치가 완료되면 <code translate="no">kubectl</code> 을 사용하여 ServiceMonitor 리소스를 확인하십시오.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Milvus Operator 사용 시</h4><p>Milvus Operator를 사용하여 Milvus를 설치한 경우, Operator는 ServiceMonitor 대신 PodMonitor를 생성합니다. PodMonitor의 이름은 Milvus 사용자 정의 리소스와 동일합니다. 오퍼레이터는 사용자 정의 리소스에서 메트릭이 비활성화되지 않았고 클러스터에 PodMonitor CRD가 존재하는 경우에만 이를 생성합니다. kube-prometheus <code translate="no">manifests/setup</code> 디렉터리가 이 CRD를 설치합니다. 메트릭이 활성화되어 있는지 확인하려면 다음을 수행하십시오.</p>
<ol>
<li><p>다음 명령어를 실행하여 Milvus 사용자 정의 리소스를 편집하십시오. 다음 명령어는 사용자 정의 리소스의 이름이 <code translate="no">my-release</code> 라고 가정합니다.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">spec.components.disableMetric</code> 필드를 <code translate="no">false</code> 로 수정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>편집기를 저장하고 종료합니다.</p></li>
<li><p>운영자가 변경 사항을 반영할 때까지 기다리십시오. 다음 명령어를 실행하여 PodMonitor를 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. 메트릭 확인<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor 또는 PodMonitor를 활성화한 후 <code translate="no">http://localhost:9090/</code> 에서 Prometheus 대시보드에 액세스할 수 있습니다.</p>
<p><code translate="no">Status</code> 탭을 클릭한 다음 <code translate="no">Targets</code> 를 클릭합니다. Milvus 구성 요소의 타깃이 표시되어야 합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p><code translate="no">Graph</code> 탭을 클릭하고 표현식 입력란에 <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> 을 입력하세요. Milvus 구성 요소의 메트릭이 표시됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. ServiceMonitor 확인<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Helm을 사용하여 Milvus를 설치한 경우, 다음 명령을 실행하여 ServiceMonitor를 나열하십시오. 차트에서는 Milvus 클러스터의 경우 <code translate="no">my-release-milvus</code>, Milvus 독립 실행형의 경우 <code translate="no">my-release-milvus-standalone</code> 로 명명합니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
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
<li>Milvus 클러스터용 모니터링 서비스를 배포했다면 다음 내용도 알아두면 좋습니다:
<ul>
<li><a href="/docs/ko/visualize.md">Grafana에서 Milvus 메트릭 시각화하기</a></li>
<li><a href="/docs/ko/alert.md">Milvus 서비스에 대한 알림 생성</a></li>
<li><a href="/docs/ko/allocate.md">리소스 할당</a> 조정하기</li>
</ul></li>
<li>Milvus 클러스터를 확장하는 방법에 대한 정보를 찾고 계신다면:
<ul>
<li><a href="/docs/ko/scaleout.md">Milvus 클러스터 확장 방법</a> 알아보기</li>
</ul></li>
<li>Milvus 버전 업그레이드에 관심이 있으시다면,
<ul>
<li><a href="/docs/ko/upgrade_milvus_cluster-operator.md">Milvus 클러스터 업그레이드 가이드와</a> <a href="/docs/ko/upgrade_milvus_standalone-operator.md">Milvus 독립형 버전 업그레이드</a> <a href="/docs/ko/upgrade_milvus_cluster-operator.md">가이드를</a> 읽어보세요.</li>
</ul></li>
</ul>
