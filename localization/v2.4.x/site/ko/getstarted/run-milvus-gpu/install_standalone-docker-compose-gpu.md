---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: Kubernetes에 Milvus 클러스터를 설치하는 방법을 알아보세요.
title: 도커 컴포즈를 사용하여 GPU 지원으로 Milvus 실행하기
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">도커 컴포즈를 사용하여 GPU 지원으로 Milvus 실행하기<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지는 도커 컴포즈를 사용하여 GPU를 지원하는 Milvus 인스턴스를 시작하는 방법을 설명합니다.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Docker를 설치합니다</a>.</li>
<li>설치하기 전에<a href="/docs/ko/v2.4.x/prerequisite-gpu.md">하드웨어 및 소프트웨어 요구 사항을 확인하세요</a>.</li>
</ul>
<div class="alert note">
<p>이미지를 가져오는 데 문제가 발생하면 <a href="mailto:community@zilliz.com">community@zilliz.com</a> 으로 문의해 주시면 필요한 지원을 제공해 드리겠습니다.</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">Milvus 설치하기<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Docker Compose를 사용하여 GPU를 지원하는 Milvus를 설치하려면 다음 단계를 따르세요.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. YAML 파일 다운로드 및 구성</h3><p>다운로드 <a href="https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> 를 클릭하고 수동으로 또는 다음 명령을 사용하여 docker-compose.yml로 저장합니다.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>YAML 파일에서 독립형 서비스의 환경 변수를 다음과 같이 몇 가지 변경해야 합니다:</p>
<ul>
<li>특정 GPU 장치를 Milvus에 할당하려면 <code translate="no">standalone</code> 서비스 정의에서 <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> 필드를 찾아 해당 값을 원하는 GPU의 ID로 바꿉니다. NVIDIA GPU 디스플레이 드라이버에 포함된 <code translate="no">nvidia-smi</code> 도구를 사용하여 GPU 장치의 ID를 확인할 수 있습니다. Milvus는 여러 GPU 장치를 지원합니다.</li>
</ul>
<p>Milvus에 단일 GPU 장치를 할당합니다:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>Milvus에 여러 GPU 장치를 할당합니다:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Milvus 시작하기</h3><p>docker-compose.yml이 있는 디렉토리에서 Milvus를 실행하여 시작합니다:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>위 명령이 실행되지 않는 경우 시스템에 Docker Compose V1이 설치되어 있는지 확인하세요. <a href="https://docs.docker.com/compose/">이 경우 이 페이지의</a> 참고 사항에 따라 Docker Compose V2로 마이그레이션하는 것이 좋습니다.</p>
</div>
<p>Milvus를 시작한 후</p>
<ul>
<li>밀버스 <strong>독립형</strong>, <strong>밀버스 미니오</strong>, <strong>밀버스-etcd라는</strong> 이름의 컨테이너가 가동됩니다.<ul>
<li><strong>milvus-etcd</strong> 컨테이너는 호스트에 포트를 노출하지 않으며 데이터를 현재 폴더의 <strong>볼륨/etcd에</strong> 매핑합니다.</li>
<li><strong>milvus-minio</strong> 컨테이너는 기본 인증 자격 증명을 사용하여 포트 <strong>9090</strong> 및 <strong>9091을</strong> 로컬로 제공하고 해당 데이터를 현재 폴더의 <strong>볼륨/minio에</strong> 매핑합니다.</li>
<li><strong>밀버스-독립형</strong> 컨테이너는 기본 설정으로 포트 <strong>19530을</strong> 로컬로 서비스하고 데이터를 현재 폴더의 <strong>볼륨/milvus에</strong> 매핑합니다.</li>
</ul></li>
</ul>
<p>다음 명령을 사용하여 컨테이너가 실행 중인지 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>docker-compose.yml에서 Milvus에 여러 GPU 장치를 할당했다면, 어떤 GPU 장치를 표시하거나 사용할 수 있는지 지정할 수 있습니다.</p>
<p>Milvus에 GPU 장치 <code translate="no">0</code> 를 표시하도록 설정합니다:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Milvus에 GPU 장치 <code translate="no">0</code> 및 <code translate="no">1</code> 을 표시하도록 설정합니다:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>다음과 같이 이 컨테이너를 중지하고 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">메모리 풀 구성<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus가 실행되고 나면 <code translate="no">milvus.yaml</code> 파일에서 <code translate="no">initMemSize</code> 및 <code translate="no">maxMemSize</code> 설정을 수정하여 메모리 풀을 사용자 지정할 수 있습니다.</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> 파일은 Milvus 컨테이너 내부의 <code translate="no">/milvus/configs/</code> 디렉토리에 있습니다.</p>
</div>
<p>메모리 풀을 구성하려면 <code translate="no">milvus.yaml</code> 파일에서 <code translate="no">initMemSize</code> 및 <code translate="no">maxMemSize</code> 설정을 다음과 같이 수정합니다.</p>
<ol>
<li><p>다음 명령을 사용하여 Milvus 컨테이너에서 로컬 머신으로 <code translate="no">milvus.yaml</code> 을 복사합니다. <code translate="no">&lt;milvus_container_id&gt;</code> 을 실제 Milvus 컨테이너 ID로 바꿉니다.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>복사한 <code translate="no">milvus.yaml</code> 파일을 원하는 텍스트 편집기로 엽니다. 예를 들어, vim을 사용합니다:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">initMemSize</code> 및 <code translate="no">maxMemSize</code> 설정을 필요에 따라 편집하고 변경 사항을 저장합니다:</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: 메모리 풀의 초기 크기. 기본값은 1024입니다.</li>
<li><code translate="no">maxMemSize</code>: 메모리 풀의 최대 크기입니다. 기본값은 2048입니다.</li>
</ul></li>
<li><p>다음 명령을 사용하여 수정된 <code translate="no">milvus.yaml</code> 파일을 Milvus 컨테이너에 다시 복사합니다. <code translate="no">&lt;milvus_container_id&gt;</code> 을 실제 Milvus 컨테이너 ID로 바꿉니다.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus 컨테이너를 다시 시작하여 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>Docker에 Milvus를 설치했으면 다음을 수행할 수 있습니다:</p>
<ul>
<li><p><a href="/docs/ko/v2.4.x/quickstart.md">빠른 시작을</a> 확인하여 Milvus의 기능을 확인합니다.</p></li>
<li><p>Milvus의 기본 동작에 대해 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/insert-update-delete.md">삽입, 위로 올리기 및 삭제</a></li>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-helm.md">헬름 차트를 사용하여 Milvus 업그레이드</a>.</p></li>
<li><p><a href="/docs/ko/v2.4.x/scaleout.md">Milvus 클러스터 확장하기</a>.</p></li>
<li><p>Milvu 클러스터를 클라우드에 배포하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/v2.4.x/gcp.md">구글 클라우드</a></li>
<li><a href="/docs/ko/v2.4.x/azure.md">마이크로소프트 애저</a></li>
</ul></li>
<li><p>Milvus 데이터 백업을 위한 오픈 소스 도구인 Milvus <a href="/docs/ko/v2.4.x/milvus_backup_overview.md">Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/v2.4.x/birdwatcher_overview.md">Birdwatcher를</a> 살펴보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://milvus.io/docs/attu.md">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/v2.4.x/monitor.md">Prometheus로 Milvus 모니터링하기</a>.</p></li>
</ul>
