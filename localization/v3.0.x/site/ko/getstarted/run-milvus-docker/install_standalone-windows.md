---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Windows용 Docker Desktop을 사용하여 Milvus 독립 실행형 버전을 설치하는 방법을 알아보세요.
title: Docker에서 Milvus 실행하기 (Windows)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Docker에서 Milvus 실행하기 (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>기본적으로 이 배포 환경은 <strong>Woodpecker</strong> (로컬 파일 시스템)를 메시지 큐로 사용하므로, 별도의 외부 메시지 큐 서비스가 필요하지 않습니다. <a href="/docs/ko/woodpecker.md">Woodpecker를</a> 참조하십시오.</p>
</blockquote>
<p>이 페이지에서는 WSL 2 백엔드와 리눅스 컨테이너를 사용하는 Docker Desktop을 통해 Windows에서 Milvus를 실행하는 방법을 설명합니다.</p>
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Docker Desktop을 설치하고</a> Windows 및 하드웨어 요구 사항을 충족해야 합니다.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Windows Subsystem for Linux 2(WSL 2)를 설치하십시오</a>.</li>
<li>Docker Desktop을 시작하고, <strong>‘WSL 2 기반 엔진 사용’을</strong> 활성화한 다음, Linux 컨테이너를 선택하십시오. WSL 배포판 내에서 명령을 실행하려면, <strong>‘설정</strong> &gt; <strong>리소스</strong> &gt; <strong>WSL</strong> 통합’에서 해당 배포판도 활성화하십시오. <a href="https://docs.docker.com/desktop/features/wsl/">Docker Desktop WSL 2 백엔드를</a> 참조하십시오.</li>
</ul>
<p>Milvus 파일을 다운로드하기 전에 PowerShell 또는 Windows 명령 프롬프트에서 다음 사항을 확인하십시오:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>Docker OS 유형은 ‘ <code translate="no">linux</code> ’이어야 합니다. Compose 예제는 레거시 ‘ <code translate="no">docker-compose</code> V1’ 명령어가 아닌 ‘ <code translate="no">docker compose</code> ’ 플러그인(V2 이상)을 사용합니다.</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Docker에서 Milvus 실행<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 터미널 중 하나를 선택하십시오. 쓰기 권한이 있는 작업 디렉터리에서 명령을 실행하십시오. 스크립트는 해당 디렉터리에 구성 파일과 <code translate="no">volumes</code> 디렉터리를 저장합니다.</p>
<p>이 스크립트는 Milvus의 <code translate="no">master</code> 브랜치에서 다운로드됩니다. 스크립트 내에 Docker 이미지 태그가 정의되어 있으며, v3.0.3과 다를 수 있습니다. 해당 릴리스를 정확히 배포하려면 아래의 버전 지정된 Docker Compose 구성을 사용하십시오.</p>
<h3 id="From-PowerShell" class="common-anchor-header">PowerShell에서<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>스크립트를 다운로드한 후 Milvus를 시작합니다:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>PowerShell에서는 작업 디렉터리에서 스크립트를 실행하려면 <code translate="no">.\</code> 접두사가 필요합니다.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Windows 명령 프롬프트에서<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">curl.exe</code> 를 사용하여 스크립트를 다운로드하십시오. <code translate="no">Invoke-WebRequest</code> 는 PowerShell 명령어이므로 명령 프롬프트에서는 실행되지 않습니다:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>다음 중 하나의 Windows 명령어 순서를 실행한 후:</p>
<ul>
<li><strong>milvus-standalone이라는</strong> 이름의 Docker 컨테이너가 포트 <strong>19530을</strong> 제공합니다.</li>
<li>내장된 etcd는 동일한 컨테이너의 <strong>2379번</strong> 포트에서 실행됩니다. 해당 구성 파일은 작업 디렉터리의 <strong>embedEtcd.yaml에</strong> 매핑됩니다.</li>
<li>Milvus는 작업 디렉터리의 <strong>volumes/milvus에</strong> 데이터를 저장합니다.</li>
<li>구성 변경 사항은 작업 디렉터리의 <strong>user.yaml</strong> 파일에 기록해야 합니다. 변경 후에는 컨테이너를 다시 시작하십시오.</li>
</ul>
<p>터미널에서 이미지 및 컨테이너 상태를 확인하십시오:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>PowerShell에서 Milvus를 중지하려면 ` <code translate="no">.\standalone.bat stop</code>`을 실행하고, 명령 프롬프트에서는 ` <code translate="no">standalone.bat stop</code>`을 실행하십시오. ` <code translate="no">delete</code> ` 명령은 컨테이너와 저장된 데이터를 모두 제거합니다. 데이터를 사용하기 전에 백업하십시오.</p>
<h3 id="From-WSL-2" class="common-anchor-header">WSL 2에서<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Windows 터미널에서 설치된 WSL 배포판을 엽니다:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>WSL 터미널에서 Linux 스크립트를 다운로드하고 Milvus를 한 번 실행하십시오:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Milvus를 중지하려면 ` <code translate="no">bash standalone_embed.sh stop</code>`를 실행하십시오. ` <code translate="no">bash standalone_embed.sh delete</code> ` 명령어는 컨테이너, 구성 및 데이터를 모두 제거합니다. 사용 전에 데이터를 백업하십시오.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Docker Compose를 사용하여 Milvus 실행<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>v3.0.3 릴리스에 포함된 구성을 사용하십시오. 사용 중인 터미널에 해당하는 명령어 순서만 실행하십시오.</p>
<h3 id="From-PowerShell" class="common-anchor-header">PowerShell에서<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>구성 파일을 다운로드하고 Milvus를 시작하십시오:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Windows 명령 프롬프트에서<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>구성 파일을 다운로드하고 Milvus를 시작하세요:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">WSL 2에서<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>WSL 배포판을 열고 다음 Linux 명령을 실행합니다:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>이 구성 파일은 <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, <strong>milvus-etcd라는</strong> 세 개의 장기 실행 컨테이너를 시작합니다. 또한 데이터 디렉터리의 소유권을 설정하기 위해 일회성 <code translate="no">milvus-volume-init</code> 서비스를 실행합니다. 이들의 데이터는 작업 디렉터리의 <strong>volumes/milvus</strong>, <strong>volumes/minio</strong>, <strong>volumes/etcd에</strong> 매핑됩니다. MinIO는 <strong>9000번</strong> 및 <strong>9001번</strong> 포트를 노출하고, Milvus는 <strong>19530번</strong> 및 <strong>9091번</strong> 포트를 노출합니다. 구성 및 라이프사이클 명령어에 대해서는 <a href="/docs/ko/install_standalone-docker-compose.md">‘Docker Compose를 사용하여 Milvus 실행’을</a> 참조하십시오.</p>
<h2 id="FAQs" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header"><code translate="no">Docker Engine stopped</code> 오류는 어떻게 해결하나요?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 Linux 컨테이너를 사용합니다. 설치를 다시 시도하기 전에 Docker Desktop과 그 WSL 2 백엔드를 확인하십시오:</p>
<ol>
<li><p><strong>'작업 관리자</strong> &gt; <strong>성능'에서</strong> 하드웨어 가상화가 비활성화되어 있는 경우, BIOS/UEFI에서 하드웨어 가상화를 활성화하십시오. <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">Docker Desktop Windows 시스템 요구 사항을</a> 참조하십시오.</p></li>
<li><p>Windows 시작 메뉴에서 Docker Desktop을 실행하고 엔진이 실행될 때까지 기다리십시오. WSL을 설치하거나 업데이트할 때, 또는 특정 Docker Desktop 설치 모드를 사용할 때는 관리자 권한이 필요할 수 있습니다. 단, WSL 2 백엔드를 사용하여 Linux 컨테이너를 실행하는 데는 일반적으로 관리자 권한이 필요하지 않습니다.</p></li>
<li><p>Windows 터미널에서 WSL을 확인하십시오. 업데이트가 필요한 경우, Windows에서 요청하는 권한으로 업데이트 명령을 실행하십시오:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Docker Desktop에서 <strong>‘WSL 2 기반 엔진 사용’을</strong> 활성화하십시오. Docker 메뉴에 <strong>‘Linux 컨테이너로 전환’ 옵션</strong>이 표시되면 이를 선택하십시오. Milvus Linux 이미지의 문제를 해결하기 위해 Windows 컨테이너로 전환하지 마십시오.</p></li>
<li><p>설치에 사용하는 터미널에서 다음 확인 명령을 실행하십시오:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p><code translate="no">linux</code> 가 반환되어야 합니다. 데몬에 연결할 수 없는 경우, Milvus 스크립트를 다시 실행하기 전에 <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">Docker Desktop 문제 해결 단계를</a> 따르십시오. <code translate="no">com.docker.service</code> 를 실행하는 것만으로는 WSL 2 리눅스 엔진이 실행 중임을 확인할 수 없습니다.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">Milvus 배포 중 WSL 관련 문제는 어떻게 해결하나요?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>WSL 2에서 Milvus를 실행하는 동안 WSL 관련 문제가 발생한 경우, Docker Desktop이 WSL 2 기반 엔진을 사용하도록 설정되어 있는지 다음과 같이 확인해야 할 수 있습니다:</p>
<ol>
<li><p><strong>설정</strong> &gt; <strong>일반에서</strong> “WSL 2 기반 엔진 사용”이 선택되어 있는지 확인하십시오.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Docker Desktop 설정에서 WSL 2 기반 엔진 사용</span>
  
 </span></p></li>
<li><p><strong>설정</strong> &gt; <strong>리소스</strong> &gt; <strong>WSL 통합</strong>으로 이동하여, Docker 통합을 활성화할 설치된 WSL 2 배포판 중 하나를 선택하십시오.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Docker Desktop 설정에서 WSL 2 배포판 선택</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">Milvus 시작 시 “ <code translate="no">Read config failed</code> ”라는 볼륨 관련 오류 메시지가 표시되면 어떻게 해결해야 하나요?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Milvus 시작 시 발생하는 ‘Read config failed’ 오류 메시지</span>
  
 </span></p>
<p>Milvus 시작 시 “Read config failed”라는 오류 메시지가 표시될 경우, Milvus 컨테이너에 마운트된 볼륨이 올바른지 확인해야 합니다. 볼륨이 컨테이너에 올바르게 마운트된 경우, ` <code translate="no">docker exec</code> ` 명령어를 사용하여 컨테이너로 진입한 후 다음과 같이 <strong>`/milvus/configs</strong> ` 폴더의 내용을 확인할 수 있습니다:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Milvus 구성 파일 열거</span>
  
 </span></p>
<div class="alert note">
<p>Storage V3는 기본적으로 비활성화되어 있습니다. Storage V3에 의존하는 기능을 사용하기 전에 이를 활성화해야 합니다. 요구 사항 및 호환성 관련 사항은 <a href="/docs/ko/storage-v3.md">Storage V3를</a> 참조하십시오.</p>
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
    </button></h2><p>Docker에 Milvus를 설치한 후, <a href="/docs/ko/quickstart.md">퀵스타트(Quickstart)</a> 의 <strong>‘기존 Milvus 서버 경로 사용’</strong> 단계를 따라 SDK를 <code translate="no">http://localhost:19530</code> 에 연결하십시오. 이 서버 경로에는 Milvus Lite가 필요하지 않습니다. 로컬 <code translate="no">.db</code> 연결 블록은 이 컨테이너를 사용하는 대신 별도의 로컬 데이터베이스를 시작합니다.</p>
<p>다음과 같은 방법도 있습니다:</p>
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
<li><p>Compose 배포의 경우, <a href="/docs/ko/upgrade_milvus_standalone-docker.md">‘Docker Compose를 사용하여 Milvus Standalone 업그레이드’ 지침을</a> 따르십시오. 업그레이드하기 전에 해당 절차가 사용자의 환경에서 정상적으로 작동하는지 확인하십시오.</p></li>
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
