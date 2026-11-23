---
id: config_jaeger_tracing.md
title: 추적 구성
related_key: 'Jaeger, Milvus, Trace'
summary: 이 가이드에서는 Milvus용 트레이스를 수집하도록 Jaeger를 구성하는 방법에 대해 설명합니다.
---
<h1 id="Configure-Trace" class="common-anchor-header">추적 구성<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 Milvus용 트레이스를 수집하도록 Jaeger를 구성하는 방법에 대해 설명합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://helm.sh/docs/intro/install/">Helm</a> 및 <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl을</a> 포함한 필수 도구를 설치해 두어야 합니다.</li>
</ul>
<h2 id="Deploy-Jaeger" class="common-anchor-header">Jaeger 배포<button data-href="#Deploy-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger는 <a href="http://uber.github.io/">Uber</a> Technologies에서 오픈 소스로 공개한 분산 추적 플랫폼입니다.</p>
<p>이 가이드에서는 <a href="https://github.com/jaegertracing/helm-charts">Jaeger Helm 차트를</a> 사용하여 Jaeger v2를 배포합니다. 기본적으로 이 차트는 테스트에 적합한 올인원 모델과 인메모리 스토리지를 사용하여 Jaeger를 배포합니다. Kubernetes에서 Jaeger를 실행하는 다른 방법에 대해서는 <a href="https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/">‘Kubernetes에 배포하기’를</a> 참조하십시오.</p>
<h3 id="1-Install-Jaeger" class="common-anchor-header">1. Jaeger 설치<button data-href="#1-Install-Jaeger" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus를 설치하는 네임스페이스에 Jaeger를 설치하십시오. 다음 섹션의 Milvus 설정에서는 Jaeger 서비스를 짧은 이름인 <code translate="no">jaeger</code> 으로 참조하며, Kubernetes는 쿼리를 수행하는 포드의 네임스페이스 내에서만 네임스페이스가 없는 서비스 이름을 해결합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add jaegertracing https://jaegertracing.github.io/helm-charts</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install jaeger jaegertracing/jaeger --version 4.19.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>차트의 README에는 이 차트가 실험적 단계이며, 마이너 버전에서 호환성 문제가 발생할 수 있다고 명시되어 있으므로, 이 명령어는 차트 버전을 고정합니다. 차트 버전 4.19.0은 Jaeger 2.23.0을 배포합니다.</p>
<h3 id="2-Check-the-Jaeger-pod" class="common-anchor-header">2. Jaeger 포드 확인<button data-href="#2-Check-the-Jaeger-pod" class="anchor-icon" translate="no">
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
    </button></h3><p>Jaeger 포드가 실행 중인지 확인하려면 다음 명령어를 실행하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 차트는 <code translate="no">jaeger</code> 이라는 이름의 서비스를 생성합니다. 이 서비스는 포트 <code translate="no">4317</code> 에서 OTLP gRPC 수신기를, 포트 <code translate="no">16686</code> 에서 Jaeger UI를 노출합니다.</p>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Helm 차트를 사용하여 Milvus 설치<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>OTLP를 통해 Milvus에서 Jaeger로 트레이스를 전송하려면 다음 설정을 <code translate="no">values.yaml</code> 라는 파일에 저장하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: otlp
      sampleFraction: 1
      otlp:
        endpoint: &quot;jaeger:4317&quot;
        method: grpc
        secure: false
</span><button class="copy-code-btn"></button></code></pre>
<p>이 설정을 사용하면 Milvus는 모든 요청을 샘플링(<code translate="no">sampleFraction: 1</code>)하고, TLS 없이(<code translate="no">secure: false</code>) OTLP gRPC를 통해 <code translate="no">jaeger</code> 서비스의 <code translate="no">4317</code> 포트로 트레이스를 내보냅니다.</p>
<p>새로운 Milvus 배포 환경에 위 설정을 적용하려면 다음 명령어를 실행하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>기존 Milvus 배포 환경에 위 설정을 적용하려면 다음 명령어를 실행하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>이 명령어는 <code translate="no">--reset-then-reuse-values</code> 를 사용하며, Helm 3.14 이상이 필요합니다. 이 옵션을 사용하면 Helm은 값을 <code translate="no">--version</code> 에 설정된 차트 버전의 기본값으로 재설정하고, 현재 릴리스의 값을 적용한 다음, <code translate="no">-f</code> 의 값을 적용합니다. 따라서 <code translate="no">values.yaml</code> 의 모든 값이 현재 릴리스의 값을 재정의하며, <code translate="no">extraConfigFiles</code> 하위의 <code translate="no">user.yaml</code> 항목은 전체적으로 대체됩니다. <code translate="no">&lt;current-chart-version&gt;</code> 를 찾으려면 <code translate="no">helm list</code> 를 실행하고, <code translate="no">CHART</code> 열의 값에서 <code translate="no">milvus-</code> 접두사를 제거하십시오. <code translate="no">-f</code> 또는 <code translate="no">--set</code> 를 포함하되 <code translate="no">--reset-then-reuse-values</code> 또는 <code translate="no">--reuse-values</code> 를 포함하지 않은 상태로 <code translate="no">helm upgrade</code> 를 실행하면, Helm은 설치 시 설정한 값을 유지하지 않습니다.</p>
</div>
<h2 id="View-Traces" class="common-anchor-header">추적 정보 보기<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">jaeger</code> 서비스는 <code translate="no">ClusterIP</code> 유형이며, 차트는 기본적으로 인그레스를 생성하지 않습니다. 로컬 컴퓨터에서 Jaeger UI를 열려면 UI 포트를 포워딩하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward svc/jaeger 16686:16686</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 브라우저에서 <code translate="no">http://localhost:16686</code> 을 엽니다.</p>
<p>다음 스크린샷은 검색 작업 및 로드 수집 작업 중 Milvus의 트레이스가 표시된 Jaeger UI를 보여줍니다:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" /> 
   <span>추적 검색 요청</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" /> 
   <span>추적 데이터 수집 요청</span>
  
 </span></p>
