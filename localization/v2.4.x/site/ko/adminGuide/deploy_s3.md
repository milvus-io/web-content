---
id: deploy_s3.md
title: 도커 컴포즈 또는 헬름으로 오브젝트 스토리지 구성하기
related_key: 'S3, storage'
summary: 도커 컴포즈 또는 헬름으로 Milvus용 S3 스토리지를 설정하는 방법을 알아보세요.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">도커 컴포즈 또는 헬름으로 오브젝트 스토리지 구성하기<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 기본적으로 객체 스토리지로 MinIO를 사용하지만, 로그 및 인덱스 파일을 위한 영구 객체 스토리지로 <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service(S3)를</a> 사용하는 것도 지원합니다. 이 항목에서는 밀버스용 S3를 구성하는 방법을 설명한다. MinIO에 만족하는 경우 이 항목을 건너뛸 수 있습니다.</p>
<p><a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> 또는 K8에서 S3를 구성할 수 있습니다.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Docker Compose로 S3 구성하기<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. S3 구성하기</h3><p><a href="https://min.io/product/overview">MinIO는</a> S3와 호환됩니다. Docker Compose로 S3를 구성하려면 milvus/configs 경로의 <code translate="no">milvus.yaml</code> 파일에 <code translate="no">minio</code> 섹션에 값을 입력합니다.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용은 <a href="/docs/ko/v2.4.x/configure_minio.md">MinIO/S3 구성을</a> 참조하세요.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. docker-compose.yaml 수정하기</h3><p>또한 <code translate="no">docker-compose.yaml</code> 에서 milvus 서비스에 대한 <code translate="no">MINIO_ADDRESS</code> 환경 변수를 제거합니다. 기본적으로 milvus는 외부 S3 대신 로컬 미니오를 사용합니다.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Milvus 실행</h3><p>다음 명령어를 실행하여 S3 구성을 사용하는 Milvus를 시작합니다.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">구성은 Milvus가 시작된 후에만 적용됩니다. 자세한 내용은 <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Milvus 시작하기를</a> 참조하세요.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">K8에서 S3 구성<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s의 Milvus 클러스터의 경우, Milvus를 시작하는 것과 동일한 명령으로 S3를 구성할 수 있습니다. 또는 Milvus를 시작하기 전에 <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> 리포지토리의 /charts/milvus 경로에 있는 <code translate="no">values.yml</code> 파일을 사용하여 S3를 구성할 수 있습니다.</p>
<p>다음 표에는 YAML 파일에서 S3를 구성하기 위한 키가 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>키</th><th>설명</th><th>값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>MinIO를 활성화 또는 비활성화합니다.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>S3를 사용하거나 사용하지 않도록 설정합니다.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>S3에 액세스할 엔드포인트입니다.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>S3에 액세스할 포트입니다.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>S3 스토리지의 루트 경로입니다.</td><td>기본적으로 엠티피 문자열입니다.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>S3의 액세스 키 ID입니다.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>S3의 비밀 액세스 키입니다.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>S3 버킷의 이름입니다.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>연결 시 SSL 사용 여부</td><td>기본값은 다음과 같습니다. <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML 파일 사용</h3><ol>
<li><code translate="no">values.yaml</code> 파일에서 <code translate="no">minio</code> 섹션을 구성합니다.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><code translate="no">values.yaml</code> 파일에서 값을 사용하여 <code translate="no">externalS3</code> 섹션을 구성합니다.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  port: <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  accessKey: <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  secretKey: <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>앞의 섹션을 구성하고 <code translate="no">values.yaml</code> 파일을 저장한 후 다음 명령을 실행하여 S3 구성을 사용하는 Milvus를 설치합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">명령 사용</h3><p>Milvus를 설치하고 S3를 구성하려면 값을 사용하여 다음 명령을 실행합니다.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
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
<li><a href="/docs/ko/v2.4.x/deploy_etcd.md">도커 컴포즈 또는 헬름으로 메타 스토리지 구성하기</a></li>
<li><a href="/docs/ko/v2.4.x/deploy_pulsar.md">도커 컴포즈 또는 헬름으로 메시지 저장소 구성하기</a></li>
</ul>
