---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Docker Compose를 사용하여 Milvus 독립 실행형 버전을 업그레이드하는 방법을 알아보세요.
title: Docker Compose를 사용하여 Milvus 독립형 버전 업그레이드
---
<div class="tab-wrapper"><a href="/docs/ko/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ko/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/ko/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Docker Compose를 사용하여 Milvus 독립형 버전 업그레이드<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 Docker Compose를 사용하여 Milvus 2.6.x 독립형 배포 환경을 v3.0.5로 업그레이드하는 방법을 설명합니다.</p>
<div class="alert note">
<p>이 절차는 이미지만 변경된 공식 Milvus 2.6.20 독립형 Docker Compose 구성에서 검증되었습니다. 2단계에서는 해당 검증에서 다루지 않았던 v3.0.5 Compose 구성의 데이터 디렉터리 소유권 서비스를 추가로 적용합니다.</p>
</div>
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
<li>Docker Engine 및 Docker Compose V2</li>
<li>Docker Compose로 관리되는 기존 Milvus 2.6.x 독립형 배포 환경</li>
<li>기존 배포에 사용된 Docker Compose 파일 및 구성</li>
<li>Milvus 메타데이터 및 영구 데이터의 최신 백업</li>
</ul>
<p><strong>메시지 큐 제한 사항</strong>: Milvus v3.0.5로 업그레이드할 때는 현재 사용 중인 메시지 큐를 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경에 대한 지원은 향후 버전에서 제공될 예정입니다.</p>
<div class="alert warning">
<p>이 절차의 일환으로 현재 Compose 파일을 교체하거나 종속성 버전을 변경하지 마십시오. 기존 etcd, 객체 스토리지, 메시지 큐, 볼륨 및 구성을 그대로 유지하십시오. Milvus 이미지 태그를 업데이트하고 2단계에 설명된 데이터 디렉터리 소유권 서비스를 추가하십시오.</p>
<p>Compose 파일이 <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> 을 사용하며 Docker가 이 이미지를 가져올 수 없는 경우, v3.0.5 Compose 구성에서 사용하는 <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code> 으로 변경하십시오. 릴리스 태그는 동일하게 유지하십시오.</p>
<p>이 절차는 Milvus 이미지를 2.6.x로 되돌리는 다운그레이드 또는 롤백을 검증하지 않습니다. v3.0.5가 데이터를 기록한 후, 이미지만을 대상으로 한 롤백 시 업데이트된 상태를 읽지 못할 수 있습니다. 업그레이드가 실패할 경우, 쓰기 작업을 중지하고 업그레이드 이전의 메타데이터 및 영구 데이터 백업을 복원하는 복구 계획을 사용하십시오. 복구 계획은 먼저 비생산 환경에서 검증하십시오.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">업그레이드 절차<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">1단계: 현재 구성 백업<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>현재 Compose 파일과 마운트된 모든 Milvus 구성 파일의 사본을 저장하십시오:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>업그레이드를 시작하기 전에 현재 컨테이너의 상태가 정상인지 확인하십시오:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">2단계: Milvus 이미지 업데이트<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>기존 Compose 파일에서 <code translate="no">standalone</code> 서비스의 이미지를 업데이트하고, 해당 <code translate="no">depends_on</code> 항목을 아래 내용으로 대체한 후, <code translate="no">milvus-volume-init</code> 서비스를 추가하십시오. 두 서비스 모두 동일한 이미지를 사용하고, <code translate="no">standalone</code> 서비스가 <code translate="no">/var/lib/milvus</code> 에 마운트하는 것과 동일한 호스트 디렉터리를 마운트하십시오. <code translate="no">standalone</code> 서비스의 다른 설정은 그대로 유지하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus v3.0.5 이미지는 비루트 사용자( <code translate="no">milvus</code> )로 Milvus를 실행하는 반면, Milvus 2.6.x 이미지는 사용자를 설정하지 않고 <code translate="no">root</code> 로 Milvus를 실행합니다. <code translate="no">milvus-volume-init</code> 서비스는 v3.0.5 Compose 구성에서 비롯된 것입니다. 이 서비스는 Milvus가 시작되기 전에 <code translate="no">root</code> 로 한 번 실행되며, <code translate="no">/var/lib/milvus</code> 및 그 내용의 소유자를 <code translate="no">milvus</code> 사용자 및 그룹으로 변경하여 Milvus가 2.6.x 배포에서 생성한 파일에 쓰기 작업을 수행할 수 있도록 합니다. 그런 다음 <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> 마커 파일을 <code translate="no">/var/lib/milvus</code> 에 작성하며, 마커 파일이 존재하는 동안 이후 실행 시에는 아무런 변경도 가하지 않습니다. 나중에 다른 사용자가 소유한 파일을 데이터 디렉터리에 복원할 경우, 서비스가 다시 실행될 수 있도록 마커 파일을 삭제하십시오.</p>
<p>대상 이미지를 풀(pull)하고 Milvus 컨테이너를 다시 생성하십시오. <code translate="no">standalone</code> 서비스는 <code translate="no">milvus-volume-init</code> 에 의존하므로, Docker Compose는 새로운 Milvus 컨테이너를 시작하기 전에 <code translate="no">milvus-volume-init</code> 를 완료될 때까지 실행합니다:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose는 기존 etcd 및 object-storage 컨테이너를 계속 실행하고 구성된 데이터 디렉터리를 재사용합니다. MinIO 이미지 등 종속성의 구성을 변경한 경우, Compose는 해당 컨테이너를 다시 생성하되 마운트된 볼륨은 유지합니다.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">업그레이드 확인<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>컨테이너 상태와 Milvus 컨테이너에서 사용하는 이미지를 확인하십시오:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">standalone</code> 서비스가 정상적으로 작동하는지, 해당 이미지가 <code translate="no">milvusdb/milvus:v3.0.5</code> 인지, 그리고 기존 컬렉션을 계속 쿼리하고 검색할 수 있는지 확인하십시오. v3.0.5 전용 기능을 활성화하기 전에 이러한 확인 작업을 완료하십시오.</p>
<div class="alert note">
<p>Milvus 3.0으로 업그레이드한다고 해서 Storage V3가 활성화되는 것은 아닙니다. 업그레이드를 확인한 후, Storage V3에 의존하는 기능을 활성화하기 전에 <a href="/docs/ko/storage-v3.md">Storage V3에 대해</a> 검토하십시오. Milvus가 Storage V3 데이터를 기록한 후에는 Storage V3를 읽을 수 없는 이전 버전의 Milvus로 다운그레이드하는 것이 지원되지 않습니다.</p>
</div>
