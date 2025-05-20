---
id: deploy_etcd.md
title: 도커 컴포즈 또는 헬름으로 메타 스토리지 구성하기
related_key: 'S3, storage'
summary: Docker Compose/Helm으로 Milvus용 메타 스토리지를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">도커 컴포즈 또는 헬름으로 메타 스토리지 구성하기<button data-href="#Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 메타데이터를 저장하기 위해 etcd를 사용합니다. 이 항목에서는 도커 컴포즈 또는 헬름으로 etcd를 구성하는 방법을 소개합니다.</p>
<h2 id="Configure-etcd-with-Docker-Compose" class="common-anchor-header">도커 컴포즈로 etcd 구성하기<button data-href="#Configure-etcd-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-etcd" class="common-anchor-header">1. etcd 구성하기</h3><p>Docker Compose로 etcd를 구성하려면, milvus/configs 경로의 <code translate="no">milvus.yaml</code> 파일에 <code translate="no">etcd</code> 섹션에 값을 입력합니다.</p>
<pre><code translate="no">etcd:
  endpoints:
    - localhost:<span class="hljs-number">2379</span>
  rootPath: by-dev <span class="hljs-comment"># The root path where data are stored in etcd</span>
  metaSubPath: meta <span class="hljs-comment"># metaRootPath = rootPath + &#x27;/&#x27; + metaSubPath</span>
  kvSubPath: kv <span class="hljs-comment"># kvRootPath = rootPath + &#x27;/&#x27; + kvSubPath</span>
  log:
    <span class="hljs-comment"># path is one of:</span>
    <span class="hljs-comment">#  - &quot;default&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stderr&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stdout&quot; as os.Stdout,</span>
    <span class="hljs-comment">#  - file path to append server logs to.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log</span>
    path: stdout
    level: info <span class="hljs-comment"># Only supports debug, info, warn, error, panic, or fatal. Default &#x27;info&#x27;.</span>
  use:
    <span class="hljs-comment"># please adjust in embedded Milvus: true</span>
    embed: false <span class="hljs-comment"># Whether to enable embedded Etcd (an in-process EtcdServer).</span>
  data:
    <span class="hljs-comment"># Embedded Etcd only.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/etcdData/</span>
    <span class="hljs-built_in">dir</span>: default.etcd
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용은 <a href="/docs/ko/v2.4.x/configure_etcd.md">etcd 관련 구성을</a> 참조하세요.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Milvus 실행</h3><p>다음 명령을 실행하여 etcd 구성을 사용하는 Milvus를 시작합니다.</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">설정은 Milvus가 시작된 후에만 적용됩니다. 자세한 내용은 <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Milvus 시작하기를</a> 참조하세요.</div>
<h2 id="Configure-etcd-on-K8s" class="common-anchor-header">K8s에서 etcd 구성<button data-href="#Configure-etcd-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s의 Milvus 클러스터의 경우, Milvus를 시작하는 것과 동일한 명령으로 etcd를 구성할 수 있습니다. 또는 Milvus를 시작하기 전에 <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> 리포지토리의 /charts/milvus 경로에 있는 <code translate="no">values.yml</code> 파일을 사용하여 etcd를 구성할 수 있습니다.</p>
<p>다음 표에는 YAML 파일에서 etcd를 구성하는 데 필요한 키가 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>키</th><th>설명</th><th>값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">etcd.enabled</code></td><td>etcd를 활성화 또는 비활성화합니다.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.enabled</code></td><td>외부 etcd를 활성화 또는 비활성화합니다.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.endpoints</code></td><td>etcd에 액세스할 엔드포인트입니다.</td><td></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML 파일 사용</h3><ol>
<li><code translate="no">values.yaml</code> 파일의 값을 사용하여 <code translate="no">etcd</code> 섹션을 구성합니다.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">etcd</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><code translate="no">values.yaml</code> 파일의 값을 사용하여 <code translate="no">externaletcd</code> 섹션을 구성합니다.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalEtcd:
  enabled: <span class="hljs-literal">true</span>
  <span class="hljs-comment">## the endpoints of the external etcd</span>
  endpoints:
    - &lt;your_etcd_IP&gt;:2379
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>앞의 섹션을 구성하고 <code translate="no">values.yaml</code> 파일을 저장한 후, 다음 명령을 실행하여 etcd 구성을 사용하는 Milvus를 설치합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">명령 사용</h3><p>Milvus를 설치하고 etcd를 구성하려면 값을 사용하여 다음 명령을 실행합니다.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> etcd.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externaletcd.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalEtcd.endpoints={&lt;your_etcd_IP&gt;:2379}
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
    </button></h2><p>도커 컴포즈 또는 헬름으로 다른 Milvus 종속성을 구성하는 방법을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/deploy_s3.md">도커 컴포즈 또는 헬름으로 오브젝트 스토리지 구성하기</a></li>
<li><a href="/docs/ko/v2.4.x/deploy_pulsar.md">도커 컴포즈 또는 헬름으로 메시지 저장소 구성하기</a></li>
</ul>
