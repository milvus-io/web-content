---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: Docker Compose를 사용하여 GPU를 지원하는 Milvus 독립 실행형 버전을 설치하는 방법을 알아보세요.
title: Docker Compose를 사용하여 GPU를 지원하는 Milvus 실행하기
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Docker Compose를 사용하여 GPU를 지원하는 Milvus 실행하기<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Docker Compose를 사용하여 GPU를 지원하는 Milvus 인스턴스를 시작하는 방법을 설명합니다.</p>
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
<li>설치 전에<a href="/docs/ko/prerequisite-gpu.md">하드웨어 및 소프트웨어 요구 사항을 확인하십시오</a>.</li>
</ul>
<div class="alert note">
<p>이미지 가져오기 과정에서 문제가 발생하면, 문제의 세부 내용을 기재하여 <a href="mailto:community@zilliz.com">community@zilliz.com으로</a> 문의해 주시면 필요한 지원을 제공해 드리겠습니다.</p>
</div>
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
    </button></h2><p>Docker Compose를 사용하여 GPU를 지원하는 Milvus를 설치하려면 다음 단계를 따르십시오.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. YAML 파일을 다운로드하고 구성하십시오.<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>다운로드 <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> 파일을 다운로드하여 수동으로 또는 다음 명령어를 사용하여 docker-compose.yml로 저장하십시오.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>다운로드가 정상적으로 이루어졌는지 확인하려면, 다음 명령어의 출력을 <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">릴리스 페이지</a>( <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> )에 기재된 <code translate="no">sha256</code> 다이제스트와 비교하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>YAML 파일 내 <code translate="no">standalone</code> 서비스의 <code translate="no">deploy</code> 섹션에서 Milvus에 할당된 GPU 장치를 다음과 같이 변경할 수 있습니다:</p>
<ul>
<li>Milvus에 특정 GPU 장치를 할당하려면, <code translate="no">standalone</code> 서비스 정의에서 <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> 필드를 찾아 해당 값을 원하는 GPU의 ID로 대체하십시오. NVIDIA GPU 디스플레이 드라이버에 포함된 <code translate="no">nvidia-smi</code> 도구를 사용하여 GPU 장치의 ID를 확인할 수 있습니다. Milvus는 여러 GPU 장치를 지원합니다.</li>
</ul>
<p>Milvus에 단일 GPU 장치 할당:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus에 여러 GPU 장치 할당:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Milvus 시작<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>docker-compose.yml 파일이 있는 디렉터리에서 다음 명령을 실행하여 Milvus를 시작합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>위의 명령어를 실행하는 데 실패했다면, 시스템에 Docker Compose V1이 설치되어 있는지 확인하십시오. 설치되어 있는 경우, <a href="https://docs.docker.com/compose/">이 페이지의</a> 참고 사항을 고려하여 Docker Compose V2로 마이그레이션하는 것이 좋습니다.</p>
</div>
<p>Milvus가 시작된 후,</p>
<ul>
<li><strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, <strong>milvus-etcd라는</strong> 이름의 컨테이너가 실행됩니다.
<ul>
<li><strong>milvus-etcd</strong> 컨테이너는 호스트에 포트를 노출하지 않으며, 데이터를 현재 폴더의 <strong>volumes/etcd에</strong> 매핑합니다.</li>
<li><strong>milvus-minio</strong> 컨테이너는 기본 인증 자격 증명을 사용하여 포트 <strong>9000</strong> 및 <strong>9001을</strong> 제공하며, 데이터를 현재 폴더의 <strong>volumes/minio에</strong> 매핑합니다.</li>
<li><strong>milvus-standalone</strong> 컨테이너는 기본 설정으로 포트 <strong>19530</strong> 및 <strong>9091을</strong> 제공하며, 데이터를 현재 폴더의 <strong>volumes/milvus에</strong> 매핑합니다.</li>
</ul></li>
</ul>
<p><code translate="no">standalone</code> 서비스는 ` <code translate="no">security_opt: seccomp:unconfined</code>`를 설정하므로, Milvus 컨테이너는 기본 Docker seccomp 프로필 없이 실행됩니다.</p>
<div class="alert warning">
<blockquote>
<p>Compose 파일은 호스트 IP 없이 이러한 포트를 공개하므로, Docker는 해당 포트를 호스트의 모든 네트워크 인터페이스에 바인딩하고, 이 호스트에 접속할 수 있는 다른 머신들은 Milvus 및 MinIO에 연결할 수 있습니다. MinIO는 Compose 파일에 설정된 액세스 키와 시크릿 키 <code translate="no">minioadmin</code> 를 사용합니다. 포트를 루프백 주소에서만 공개하려면, <code translate="no">docker-compose.yml</code> 내의 <code translate="no">minio</code> 및 <code translate="no">standalone</code> 서비스에 대한 <code translate="no">ports</code> 항목에 <code translate="no">127.0.0.1:</code> 를 추가하고(예: <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>), <code translate="no">sudo docker compose up -d</code> 를 다시 실행하십시오. 자세한 내용은 <a href="https://docs.docker.com/engine/network/port-publishing/">포트 공개 및 매핑을</a> 참조하십시오. 다른 MinIO 자격 증명을 사용하려면 <code translate="no">minio</code> 서비스의 <code translate="no">MINIO_ACCESS_KEY</code> 및 <code translate="no">MINIO_SECRET_KEY</code> 를 변경하고, Milvus 구성의 <code translate="no">minio.accessKeyID</code> 및 <code translate="no">minio.secretAccessKey</code> 에 동일한 값을 설정하십시오. 클라이언트가 Milvus에 연결할 때 사용자 이름과 비밀번호를 요구하려면 <a href="/docs/ko/authenticate.md">사용자 액세스 인증을</a> 참조하십시오.</p>
</blockquote>
</div>
<p>다음 명령어를 사용하여 컨테이너가 정상적으로 실행 중인지 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>기본적으로 이 명령어는 실행 중인 컨테이너만 나열합니다. 출력 결과에 <strong>milvus-etcd</strong>, <strong>milvus-minio</strong> 및 <strong>milvus-standalone</strong> 컨테이너가 포함되어 있는지, 그리고 각 컨테이너의 <code translate="no">STATUS</code> 열이 <code translate="no">Up</code> 로 시작하는지 확인하십시오.</p>
<p><code translate="no">http://127.0.0.1:9091/webui/</code> 에서 Milvus WebUI에 접속하여 Milvus 인스턴스에 대한 자세한 정보를 확인할 수도 있습니다. 자세한 내용은 <a href="/docs/ko/milvus-webui.md">Milvus WebUI를</a> 참조하십시오.</p>
<p>Milvus가 시작된 후 사용하는 GPU 장치를 변경하려면, 1단계에 표시된 대로 docker-compose.yml 파일 내 <code translate="no">standalone</code> 서비스의 <code translate="no">deploy.resources.reservations.devices</code> 아래에 있는 <code translate="no">device_ids</code> 필드를 수정한 다음, 다음 명령을 실행하십시오. 서비스 구성이 변경되었으므로, <code translate="no">docker compose up</code> 가 중지되고 <strong>milvus-standalone</strong> 컨테이너가 다시 생성됩니다. 자세한 내용은 <a href="https://docs.docker.com/compose/how-tos/gpu-support/">‘GPU 액세스가 가능한 Docker Compose 서비스 실행’을</a> 참조하십시오.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음과 같이 이 컨테이너를 중지하고 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
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
    </button></h2><p>Milvus가 실행되면 Milvus 구성의 <code translate="no">gpu</code> 섹션에서 <code translate="no">initMemSize</code> 및 <code translate="no">maxMemSize</code> 설정을 변경하여 메모리 풀을 사용자 지정할 수 있습니다.</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> 파일은 Milvus 컨테이너 내의 <code translate="no">/milvus/configs/</code> 디렉터리에 있습니다. 같은 디렉터리에 있는 <code translate="no">user.yaml</code> 파일의 설정은 <code translate="no">milvus.yaml</code> 의 값보다 우선합니다.</p>
</div>
<p>컨테이너를 다시 생성할 때 설정을 유지하려면 호스트의 <code translate="no">user.yaml</code> 파일에 설정을 저장하고 다음과 같이 해당 파일을 컨테이너에 마운트하십시오.</p>
<ol>
<li><p>docker-compose.yml 파일이 있는 디렉터리에서, 변경하려는 설정이 포함된 <code translate="no">user.yaml</code> 파일을 생성하십시오. 다음 예제는 기본값이 설정된 <code translate="no">gpu</code> 섹션을 보여줍니다. 필요한 크기로 값을 변경하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: 메모리 풀의 초기 크기(MB 단위). 기본값은 2048입니다.</li>
<li><code translate="no">maxMemSize</code>: 메모리 풀의 최대 크기(MB 단위). 기본값은 4096입니다.</li>
</ul></li>
<li><p>docker-compose.yml 파일에서, <code translate="no">standalone</code> 서비스의 <code translate="no">volumes</code> 목록에 <code translate="no">user.yaml</code> 파일을 추가하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>변경 사항을 적용하려면 Milvus 컨테이너를 다시 생성하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>파일이 마운트된 후, <code translate="no">user.yaml</code> 에 대한 후속 변경 사항을 적용하려면 <code translate="no">standalone</code> 서비스를 다시 시작하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3는 기본적으로 비활성화되어 있습니다. Storage V3에 의존하는 기능을 사용하기 전에 이를 활성화하십시오. 요구 사항 및 호환성 고려 사항에 대해서는 <a href="/docs/ko/storage-v3.md">Storage V3를</a> 참조하십시오.</p>
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
    </button></h2><p>Docker에 Milvus를 설치했으므로 다음을 수행할 수 있습니다:</p>
<ul>
<li><p>'빠른 시작( <a href="/docs/ko/quickstart.md">Quickstart</a> )'을 확인하여 Milvus의 기능을 살펴보세요.</p></li>
<li><p><a href="/docs/ko/milvus-webui.md">Milvus WebUI를</a> 확인하여 Milvus 인스턴스에 대해 자세히 알아보세요.</p></li>
<li><p>Milvus의 기본 작동 방식을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/insert-update-delete.md">삽입, 업서트 및 삭제</a></li>
<li><a href="/docs/ko/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/docs/ko/upgrade_milvus_standalone-docker.md">Docker Compose를 사용하여 Milvus Standalone을 업그레이드하십시오</a>. 해당 페이지에는 CPU 이미지 태그가 표시됩니다. 이 GPU 배포의 경우, <code translate="no">-gpu</code> 접미사(<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>)를 유지하고 <code translate="no">deploy</code> 및 <code translate="no">user.yaml</code> 설정을 그대로 유지하십시오.</p></li>
<li><p>Kubernetes에서<a href="/docs/ko/scaleout.md">Milvus 클러스터를 확장하세요</a>. 이 절차는 Helm을 사용하며, 이 Docker 배포에는 적용되지 않습니다.</p></li>
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
