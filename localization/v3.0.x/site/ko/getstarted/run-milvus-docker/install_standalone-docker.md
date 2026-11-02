---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Docker를 사용하여 Milvus 독립 실행형을 설치하는 방법을 알아보세요.
title: Docker에서 Milvus 실행하기 (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Docker에서 Milvus 실행하기 (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Docker에서 Milvus 인스턴스를 실행하는 방법을 설명합니다.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Docker를 설치하십시오</a>.</li>
<li>설치 전에<a href="/docs/ko/prerequisite-docker.md">하드웨어 및 소프트웨어 요구 사항을 확인하십시오</a>.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Docker에서 Milvus 설치<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 Docker 컨테이너로 설치할 수 있는 설치 스크립트를 제공합니다. 이 스크립트는 <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus 저장소에서</a> 확인할 수 있습니다. 새로운 배포를 시작하기 전에 스크립트를 다운로드하여 내용을 확인하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Inspect the Docker image selected by the script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">grep -n <span class="hljs-string">&quot;milvusdb/milvus:&quot;</span> standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>스크립트는 Milvus의 <code translate="no">master</code> 브랜치에서 다운로드됩니다. Docker 이미지 태그는 스크립트 내에 정의되어 있으며 v3.0.3과 다를 수 있습니다. 해당 릴리스를 정확히 설치하려면 <a href="/docs/ko/install_standalone-docker-compose.md">‘Docker Compose로 Milvus 실행’</a> 섹션의 버전 지정 구성을 사용하십시오.</p>
<p>이 Docker 배포 방식은 <strong>로컬 파일 시스템을</strong> WAL 백엔드로 사용하여 <strong>Woodpecker를</strong> 실행하므로, 별도의 메시지 큐 서비스가 필요하지 않습니다. <a href="/docs/ko/woodpecker.md">Woodpecker</a> 문서를 참조하십시오.</p>
<p><a href="/docs/ko/milvus_backup_overview.md">Backup을</a> 독립형 배포 모드로 사용하려는 경우, <a href="/docs/ko/install_standalone-docker-compose.md">Docker Compose</a> 배포 방법을 사용하는 것이 좋습니다.</p>
<p>이미지 가져오기 과정에서 문제가 발생하면, 문제 세부 정보를 포함하여 <a href="mailto:community@zilliz.com">community@zilliz.com으로</a> 문의해 주시면 필요한 지원을 제공해 드리겠습니다.</p>
</div>
<p>설치 스크립트를 실행한 후:</p>
<ul>
<li>port <strong>19530</strong>에서 milvus-standalone이라는 이름의 Docker 컨테이너가 시작되었습니다.</li>
<li>Milvus와 함께 동일한 컨테이너 내에 임베디드 etcd가 설치되어 있으며, 포트 <strong>2379</strong>에서 서비스를 제공합니다. 해당 구성 파일은 현재 폴더의 <strong>embedEtcd.yaml에</strong> 매핑되어 있습니다.</li>
<li>기본 Milvus 구성을 변경하려면 현재 폴더에 있는 <strong>user.yaml</strong> 파일에 설정을 추가한 후 서비스를 다시 시작하십시오.</li>
<li>Milvus 데이터 볼륨은 현재 폴더의 <strong>volumes/milvus</strong> 에 매핑됩니다.</li>
</ul>
<p>실제 이미지 및 상태 정보를 확인하십시오:</p>
<pre><code translate="no" class="language-bash">docker inspect --format <span class="hljs-string">&#x27;{{.Config.Image}}&#x27;</span> milvus-standalone
docker inspect --format <span class="hljs-string">&#x27;{{.State.Health.Status}}&#x27;</span> milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<p>' <code translate="no">healthy</code> ' 상태가 될 때까지 기다린 후 <a href="/docs/ko/quickstart.md">퀵스타트 가이드를</a> 따르십시오. 이 서버를 사용할 때는 SDK를 <code translate="no">http://localhost:19530</code> 에 연결하십시오. 로컬 <code translate="no">.db</code> URI를 사용하면 Milvus Lite가 대신 시작됩니다.</p>
<p><code translate="no">http://127.0.0.1:9091/webui/</code> 에서 Milvus WebUI에 접속하여 Milvus 인스턴스에 대한 자세한 정보를 확인할 수 있습니다. 자세한 내용은 <a href="/docs/ko/milvus-webui.md">Milvus WebUI를</a> 참조하십시오.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(선택 사항) Milvus 구성 업데이트<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 폴더에 있는 <strong>user.yaml</strong> 파일에서 Milvus 구성을 수정할 수 있습니다. 예를 들어, <code translate="no">proxy.healthCheckTimeout</code> 을 <code translate="no">1000</code> ms로 변경하려면 파일을 다음과 같이 수정하면 됩니다:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음과 같이 서비스를 다시 시작하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>적용 가능한 구성 항목에 대해서는 <a href="/docs/ko/system_configuration.md">시스템 구성을</a> 참조하십시오.</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Milvus 업그레이드<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>스크립트의 ` <code translate="no">upgrade</code> ` 명령어는 <code translate="no">master</code> 에서 스크립트를 다운로드하고, 해당 스크립트가 선택한 이미지를 사용하여 컨테이너를 다시 생성합니다. 이 명령어는 지원되는 소스-대상 버전 경로를 검증하지 않으며, 생성된 구성 파일을 다시 생성할 수 있습니다. 임의의 구버전 배포 환경이 v3.0.3으로 안전하게 업그레이드될 수 있다고 보장하는 것으로 간주해서는 안 됩니다.</p>
<p>업그레이드 전에 메타데이터, 영구 데이터, <code translate="no">embedEtcd.yaml</code> 및 <code translate="no">user.yaml</code> 를 백업하십시오. 대상 버전, 메시지 큐 및 스토리지 호환성을 확인하고, 비생산 환경에서 복구 기능을 검증하십시오. Docker Compose로 관리되는 배포 환경의 경우, <a href="/docs/ko/upgrade_milvus_standalone-docker.md">‘Docker Compose를 사용하여 Milvus Standalone 업그레이드’ 지침을</a> 따르십시오. 스크립트로 관리되는 컨테이너에는 해당 절차를 직접 적용하지 마십시오.</p>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Milvus 중지 및 삭제<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>다음과 같이 이 컨테이너를 중지하고 삭제할 수 있습니다</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">선택적 종속성<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적으로 이 배포 환경은 메시지 큐로 <strong>Woodpecker</strong> (로컬 파일 시스템 WAL) <strong>를</strong>, 메타데이터용으로 <strong>내장된 etcd를</strong> 사용하므로 별도로 설치할 항목은 없습니다. 다른 메시지 큐를 사용하거나 외부 객체 스토리지/메타데이터를 연결하려면 다음을 참조하십시오.</p>
<ul>
<li>메시지 큐: <a href="/docs/ko/woodpecker.md">Woodpecker</a> (기본값) · <a href="/docs/ko/mq_pulsar.md">Pulsar</a> · <a href="/docs/ko/mq_kafka.md">Kafka</a> · <a href="/docs/ko/mq_rocksmq.md">RocksMQ</a></li>
<li>오브젝트 스토리지: <a href="/docs/ko/deploy_s3.md">MinIO</a> (기본값) · <a href="/docs/ko/deploy_s3.md">AWS S3</a> · <a href="/docs/ko/abs.md">Azure Blob</a> · <a href="/docs/ko/gcs.md">GCP Cloud Storage</a> · <a href="/docs/ko/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/ko/deploy_s3.md">Tencent COS</a> · <a href="/docs/ko/deploy_s3.md">Huawei OBS</a> · <a href="/docs/ko/deploy_s3.md">S3 호환</a></li>
<li>메타데이터: <a href="/docs/ko/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3는 기본적으로 비활성화되어 있습니다. Storage V3에 의존하는 기능을 사용하기 전에 활성화해야 합니다. 요구 사항 및 호환성 고려 사항에 대해서는 <a href="/docs/ko/storage-v3.md">Storage V3를</a> 참조하십시오.</p>
</div>
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
    </button></h2><p>Docker에 Milvus를 설치했다면 다음을 수행할 수 있습니다:</p>
<ul>
<li><p><a href="/docs/ko/quickstart.md">퀵스타트를</a> 확인하여 Milvus의 기능을 살펴보세요.</p></li>
<li><p>Milvus의 기본 작동 방식을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/insert-update-delete.md">삽입, 업서트 및 삭제</a></li>
<li><a href="/docs/ko/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p>Milvus 버전을 변경하기 전에 이 페이지의 업그레이드 고려 사항을 확인하십시오.</p></li>
<li><p><a href="/docs/ko/scaleout.md">Milvus 클러스터를 확장하십시오</a>.</p></li>
<li><p>클라우드에 Milvus 클러스터를 배포하세요:</p>
<ul>
<li><a href="/docs/ko/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ko/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvus의 가시성 및 관리를 위한 직관적인 웹 인터페이스인 <a href="/docs/ko/milvus-webui.md">Milvus WebUI를</a> 살펴보세요.</p></li>
<li><p>Milvus 데이터 백업을 위한 오픈소스 도구인 <a href="/docs/ko/milvus_backup_overview.md">Milvus Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/birdwatcher_overview.md">Birdwatcher를</a> 살펴보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://github.com/zilliztech/attu">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/monitor.md">Prometheus를 사용하여 Milvus를 모니터링하세요</a>.</p></li>
</ul>
