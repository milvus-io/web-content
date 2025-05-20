---
id: configure_grafana_loki.md
title: 그라파나 로키 구성
summary: 이 항목에서는 Loki를 사용하여 로그를 수집하고 Grafana를 사용하여 Milvus 클러스터의 로그를 쿼리하는 방법에 대해 설명합니다.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Grafana Loki 구성<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 로그를 수집하도록 Loki를 구성하는 방법과 Milvus 클러스터에 대한 로그를 쿼리하고 표시하도록 Grafana를 구성하는 방법에 대한 지침을 제공합니다.</p>
<p>이 가이드에서는 다음과 같은 방법을 배웁니다:</p>
<ul>
<li>헬름을 사용하여 Milvus 클러스터에 <a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki와</a> <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> 배포하기.</li>
<li>Loki를 위한 오브젝트 스토리지 구성하기.</li>
<li>Grafana를 사용하여 로그 쿼리하기.</li>
</ul>
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
<li><a href="/docs/ko/v2.4.x/install_cluster-helm.md">K8에 Milvus 클러스터를 설치했다</a>.</li>
<li><a href="https://helm.sh/docs/intro/install/">헬름과</a> <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl을</a> 포함한 필요한 도구를 설치했습니다.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Loki 배포<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki는 Prometheus에서 영감을 얻은 로그 집계 시스템입니다. 헬름을 사용하여 Milvus 클러스터에서 로그를 수집하기 위해 Loki를 배포합니다.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Grafana의 헬름 차트 리포지토리 추가하기</h3><p>헬름에 Grafana의 차트 리포지토리를 추가하고 업데이트한다:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. 로키를 위한 오브젝트 스토리지 구성</h3><p>다음 스토리지 옵션 중 하나를 선택하고 <code translate="no">loki.yaml</code> 구성 파일을 생성합니다:</p>
<ul>
<li><p>옵션 1: 스토리지에 MinIO 사용</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>옵션 2: 스토리지에 AWS S3 사용</p>
<p>다음 예제에서는 <code translate="no">&lt;accessKey&gt;</code> 및 <code translate="no">&lt;keyId&gt;</code> 을 자신의 S3 액세스 키 및 ID로, <code translate="no">s3.endpoint</code> 을 S3 엔드포인트로, <code translate="no">s3.region</code> 을 S3 리전으로 바꿉니다.</p>
<pre><code translate="no" class="language-yaml">loki:
  commonConfig:
    replication_factor: 1
  auth_enabled: <span class="hljs-literal">false</span>
  storage:
    bucketNames:
      chunks: loki-chunks
      ruler: loki-ruler
      admin: loki-admin
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&#x27;s3&#x27;</span>
    s3:
      endpoint: s3.us-west-2.amazonaws.com
      region: us-west-2
      secretAccessKey: &lt;accessKey&gt;
      accessKeyId: &lt;keyId&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Loki 설치</h3><p>다음 명령을 실행하여 Loki를 설치합니다:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Promtail 배포<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail은 Loki의 로그 수집 에이전트입니다. Milvus 포드에서 로그를 읽고 Loki로 전송합니다.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Promtail 구성 생성</h3><p><code translate="no">promtail.yaml</code> 구성 파일을 생성합니다:</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. 프롬테일 설치</h3><p>헬름을 사용하여 프롬테일을 설치합니다:</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Grafana로 로그 쿼리<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Grafana를 배포하고 로그 쿼리를 위해 Loki에 연결하도록 구성합니다.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Grafana 배포하기</h3><p>다음 명령어를 사용하여 Grafana를 설치합니다:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Grafana에 액세스하려면 먼저 <code translate="no">admin</code> 비밀번호를 검색해야 합니다:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 로컬 머신에 Grafana 포트를 전달합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Grafana에서 Loki를 데이터 소스로 추가하기</h3><p>Grafana가 실행되면 로그를 쿼리하기 위해 Loki를 데이터 소스로 추가해야 합니다.</p>
<ol>
<li>웹 브라우저를 열고 <code translate="no">127.0.0.1:3000</code> 로 이동합니다. <code translate="no">admin</code> 이라는 사용자 아이디와 앞서 얻은 비밀번호를 사용하여 로그인합니다.</li>
<li>왼쪽 메뉴에서 <strong>연결</strong> &gt; <strong>새 연결 추가를</strong> 선택합니다.</li>
<li>표시되는 페이지에서 데이터 소스 유형으로 <strong>Loki를</strong> 선택합니다. 검색창에 <strong>loki를</strong> 입력하여 데이터 소스를 찾을 수 있습니다.</li>
<li>Loki 데이터 소스 설정에서 <strong>이름과</strong> <strong>URL을</strong> 지정한 다음 <strong>저장 및 테스트를</strong> 클릭합니다.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>데이터 소스</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Milvus 로그 쿼리</h3><p>Loki를 데이터 소스로 추가한 후, Grafana에서 Milvus 로그를 쿼리합니다:</p>
<ol>
<li>왼쪽 메뉴에서 <strong>탐색을</strong> 클릭합니다.</li>
<li>페이지의 왼쪽 상단 모서리에서 loki 데이터 소스를 선택합니다.</li>
<li><strong>레이블 브라우저를</strong> 사용하여 레이블을 선택하고 로그를 쿼리합니다.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>쿼리</span> </span></p>
