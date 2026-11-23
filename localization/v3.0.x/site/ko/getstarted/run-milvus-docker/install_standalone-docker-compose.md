---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Docker Compose를 사용하여 Milvus 독립 실행형 버전을 설치하는 방법을 알아보세요.
title: Docker Compose를 사용하여 Milvus 실행하기 (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Docker Compose를 사용하여 Milvus 실행하기 (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Docker Compose를 사용하여 Docker에서 Milvus 인스턴스를 실행하는 방법을 설명합니다.</p>
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
<li><a href="https://docs.docker.com/compose/install/linux/">Docker Compose 플러그인</a> (V2 이상)을 설치하고 <code translate="no">docker compose version</code> 명령어로 정상 작동 여부를 확인하십시오. 이 안내서에서는 구형 <code translate="no">docker-compose</code> V1 명령어가 아닌 <code translate="no">docker compose</code> 명령어를 사용합니다.</li>
<li>설치 전에<a href="/docs/ko/prerequisite-docker.md">하드웨어 및 소프트웨어 요구 사항을 확인하십시오</a>.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">Milvus 설치<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 Milvus 저장소에서 Docker Compose 구성 파일을 제공합니다. 아래의 <code translate="no">wget</code> 명령어를 사용하여 v3.0.5용 구성 파일을 다운로드하십시오. 다운로드가 완료된 직후, 파일을 편집하거나 <code translate="no">sudo docker compose up -d</code> 명령어로 Milvus를 시작하기 전에 <code translate="no">sha256sum docker-compose.yaml</code> 명령어를 실행하고, 그 결과를 <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">v3.0.5 릴리스 페이지의</a> <code translate="no">milvus-standalone-docker-compose.yaml</code> 항목에 나열된 <code translate="no">sha256</code> 다이제스트와 비교하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>기본 배포(v3.0.5):</strong> <code translate="no">docker compose up -d</code> 는 <code translate="no">milvus-etcd</code> (메타데이터), <code translate="no">milvus-minio</code> (오브젝트 스토리지), <code translate="no">milvus-standalone</code> 등 세 개의 장기 실행 컨테이너를 시작합니다. 메시지 큐는 <strong>Woodpecker(임베디드, WAL 백엔드로 MinIO/오브젝트 스토리지 사용)</strong>이므로 별도의 메시지 큐 컨테이너는 필요하지 않습니다.</p>
<p>또한 이 구성은 데이터 디렉터리의 소유권 설정을 준비하기 위해 일회성 <code translate="no">milvus-volume-init</code> 서비스를 실행합니다. 이 서비스는 해당 작업을 완료한 후 종료됩니다.</p>
<p><strong>버전별 메시지 큐 기본값:</strong></p>
<ul>
<li><strong>2.5.x</strong> — 기본 메시지 큐는 <strong>RocksMQ입니다</strong>.</li>
<li><strong>2.6.x 이상</strong> — 기본 메시지 큐는 <strong>Woodpecker(임베디드)</strong>입니다.</li>
</ul>
<p>설치하려는 릴리스에 첨부된 구성을 사용하십시오. 기존 배포 환경의 경우, 구성을 신규 설치 파일로 대체하는 대신 업그레이드 지침을 따르십시오.</p>
<ul>
<li><p><code translate="no">docker compose</code> 를 사용할 수 없는 경우, <a href="https://docs.docker.com/compose/install/linux/">Docker 지침</a>에 따라 Compose 플러그인을 설치하십시오.</p></li>
<li><p>이미지 가져오기 과정에서 문제가 발생하면, 문제 세부 정보를 포함하여 <a href="mailto:community@zilliz.com">community@zilliz.com으로</a> 문의해 주시면 필요한 지원을 제공해 드리겠습니다.</p></li>
</ul>
</div>
<p>Milvus를 시작한 후,</p>
<ul>
<li><strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, <strong>milvus-etcd라는</strong> 이름의 컨테이너가 실행됩니다.
<ul>
<li><strong>milvus-etcd</strong> 컨테이너는 호스트에 포트를 노출하지 않으며, 데이터를 현재 폴더의 <strong>volumes/etcd에</strong> 매핑합니다.</li>
<li><strong>milvus-minio</strong> 컨테이너는 기본 인증 자격 증명을 사용하여 <strong>9000번</strong> 및 <strong>9001번</strong> 포트를 공개하며, 데이터를 현재 폴더의 <strong>volumes/minio에</strong> 매핑합니다.</li>
<li><strong>milvus-standalone</strong> 컨테이너는 기본 설정으로 <strong>19530번</strong> 및 <strong>9091번</strong> 포트를 공개하며, 데이터를 현재 폴더의 <strong>volumes/milvus에</strong> 매핑합니다.</li>
</ul></li>
</ul>
<p><code translate="no">standalone</code> 서비스는 <code translate="no">security_opt: seccomp:unconfined</code> 를 설정하므로, Milvus 컨테이너는 기본 Docker seccomp 프로필 없이 실행됩니다.</p>
<div class="alert warning">
<blockquote>
<p>이 구성 파일은 호스트 주소 없이 해당 포트를 공개합니다. Docker는 호스트 주소 없이 모든 호스트 주소에 포트를 공개하므로, 이 호스트에 접속할 수 있는 다른 머신도 Milvus 및 MinIO에 연결할 수 있습니다. MinIO는 구성 파일에 설정된 액세스 키와 시크릿 키 <code translate="no">minioadmin</code> 를 사용합니다. 이 호스트에 대한 액세스를 제한하려면, <code translate="no">docker-compose.yaml</code> 내의 <code translate="no">minio</code> 및 <code translate="no">standalone</code> 서비스의 <code translate="no">ports</code> 항목에 <code translate="no">127.0.0.1:</code> 를 추가하고(예: <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>), <code translate="no">sudo docker compose up -d</code> 를 다시 실행하십시오. 다른 MinIO 자격 증명을 사용하려면, <code translate="no">minio</code> 서비스의 <code translate="no">MINIO_ACCESS_KEY</code> 및 <code translate="no">MINIO_SECRET_KEY</code> 를 변경하고, Milvus 구성의 <code translate="no">minio.accessKeyID</code> 및 <code translate="no">minio.secretAccessKey</code> 에도 동일한 값을 설정하십시오. Milvus 연결 시 자격 증명을 필수로 하려면 <a href="/docs/ko/authenticate.md">‘사용자 액세스 인증’을</a> 참조하십시오.</p>
</blockquote>
</div>
<p>다음 명령을 사용하여 컨테이너가 정상적으로 실행 중인지 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9000-9001-&gt;9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">PORTS</code> 열에는 IPv6 주소 <code translate="no">[::]</code> 와 함께 게시된 각 포트가 나열될 수도 있습니다(예: <code translate="no">[::]:19530-&gt;19530/tcp</code>). 이는 Docker가 <code translate="no">0.0.0.0</code> 및 <code translate="no">[::]</code> 모두에서 호스트 주소 없이 포트를 게시하기 때문입니다.</p>
<p><code translate="no">http://127.0.0.1:9091/webui/</code> 에서 Milvus WebUI에 접속하여 Milvus 인스턴스에 대해 자세히 알아볼 수도 있습니다. 자세한 내용은 <a href="/docs/ko/milvus-webui.md">Milvus WebUI를</a> 참조하십시오.</p>
<p>실행 중인 서버를 테스트해 보려면 <a href="/docs/ko/quickstart.md">퀵스타트(Quickstart</a> )의 <strong>‘기존 Milvus 서버 사용’</strong> 경로를 따라 <code translate="no">http://localhost:19530</code> 에 연결하십시오. 별도의 Milvus Lite 데이터베이스를 시작하는 로컬 <code translate="no">.db</code> 연결 블록은 사용하지 마십시오.</p>
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
    </button></h2><p>필요에 맞게 Milvus 구성을 업데이트하려면, 호스트의 <code translate="no">user.yaml</code> 파일에 설정을 입력하고 이를 <code translate="no">milvus-standalone</code> 컨테이너의 <code translate="no">/milvus/configs/user.yaml</code> 경로에 마운트하십시오. 이 구성 파일은 <code translate="no">/var/lib/milvus</code> 경로만 해당 컨테이너에 마운트하므로, 컨테이너 내에서 편집한 <code translate="no">user.yaml</code> 파일은 <code translate="no">docker-compose.yaml</code> 또는 Milvus 이미지를 변경한 후와 같이 Compose가 컨테이너를 다시 생성할 때 손실됩니다.</p>
<ol>
<li><p><code translate="no">docker-compose.yaml</code> 가 포함된 폴더에 <code translate="no">user.yaml</code> 를 생성하십시오. 파일을 마운트하기 전에 생성해야 합니다. 소스 경로가 존재하지 않으면 Compose가 대신 해당 이름의 디렉터리를 생성합니다.
다음 내용은 기본 <code translate="no">proxy.healthCheckTimeout</code> 를 재정의해야 한다고 가정합니다. 적용 가능한 구성 항목에 대해서는 <a href="/docs/ko/system_configuration.md">시스템 구성을</a> 참조하십시오.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">docker-compose.yaml</code> 에서 <code translate="no">standalone</code> 서비스의 <code translate="no">volumes</code> 목록에 해당 파일을 추가하십시오. <code translate="no">security_opt</code>, <code translate="no">healthcheck</code>, <code translate="no">depends_on</code> 와 같은 서비스의 다른 설정은 기존 그대로 유지하십시오.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>변경 사항을 적용합니다. 서비스 구성이 변경되었으므로 Compose는 <code translate="no">milvus-standalone</code> 컨테이너를 다시 생성하고 마운트된 볼륨에 있는 데이터를 유지합니다.</p>
<pre><code translate="no" class="language-shell">sudo docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>파일이 마운트된 후, <code translate="no">user.yaml</code> 에 대한 후속 변경 사항을 적용하려면 <code translate="no">standalone</code> 서비스를 다시 시작하십시오:</p>
<pre><code translate="no" class="language-shell">sudo docker compose restart standalone
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>다음과 같이 이 컨테이너를 중지하고 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">기존 배포 업그레이드<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.6.x 독립형 배포의 경우, <a href="/docs/ko/upgrade_milvus_standalone-docker.md">‘Docker Compose를 사용하여 Milvus 독립형 업그레이드’를</a> 따르십시오. 메타데이터와 영구 데이터를 백업하고, 기존 종속성과 구성을 보존하며, Milvus 이미지를 변경하기 전에 문서화된 소스에서 대상으로의 업그레이드 경로를 검증하십시오. 기존 배포의 Compose 파일을 위의 새 설치 구성으로 대체하지 마십시오.</p>
<p><strong>메시지 큐 제한 사항</strong>: Milvus v3.0.5로 업그레이드할 때는 현재 사용 중인 메시지 큐를 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경에 대한 지원은 향후 버전에서 제공될 예정입니다.</p>
<p>Milvus 2.6.x 이상은 기본적으로 Woodpecker를 사용하며, 2.5.x 배포 환경은 기본적으로 <strong>RocksMQ를</strong> 사용합니다. 업그레이드하려는 배포 환경에서 여전히 RocksMQ가 실행 중이라면, Milvus 이미지를 변경하기 전에 ` <code translate="no">user.yaml</code> `에서 이를 고정하여, 업그레이드된 인스턴스가 새로운 기본값으로 시작하는 대신 기존 메시지 큐를 유지하도록 하십시오.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>업그레이드된 인스턴스가 v3.0.5에서 실행되고 나면, Milvus 3.0 이상에서 사용할 수 있는 <a href="/docs/ko/switch-mq-type.md">‘메시지 큐 전환(Switch Message Queue</a>)’ 기능을 통해 RocksMQ에서 Woodpecker로 전환할 수 있습니다.</p>
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
    </button></h2><p>이 배포 환경은 메시징을 위해 <strong>Woodpecker</strong> (임베디드, MinIO WAL 백엔드), 메타데이터를 위해 <strong>etcd</strong>, 오브젝트 스토리지를 위해 <strong>MinIO를</strong> 실행합니다. 다른 메시지 큐를 사용하거나 외부 오브젝트 스토리지/메타데이터를 연결하려면 다음을 참조하십시오:</p>
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
<li><p><a href="/docs/ko/upgrade_milvus_standalone-docker.md">Docker Compose를 사용하여 Milvus Standalone을 업그레이드합니다</a>.</p></li>
<li><p>Kubernetes에서<a href="/docs/ko/scaleout.md">Milvus 클러스터 확장</a>. 이 절차는 Helm을 사용하며, 이 Docker 배포에는 적용되지 않습니다.</p></li>
<li><p>클라우드에 Milvus 클러스터 배포:</p>
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
