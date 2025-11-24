---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Windows용 Docker 데스크톱으로 Milvus를 독립형으로 설치하는 방법을 알아보세요.
title: Docker에서 Milvus 실행(Linux)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Docker에서 Milvus 실행하기(Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지는 Windows용 도커 데스크톱을 사용하여 Windows에서 Milvus를 실행하는 방법을 설명합니다.</p>
<h2 id="Prerequisites​" class="common-anchor-header">전제 조건<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">도커 데스크톱을 설치합니다</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Linux용 Windows 서브시스템 2(WSL 2)를 설치합니다</a>.</p></li>
<li><p>Python 3.8 이상을 설치합니다.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Docker에서 Milvus 실행<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 Docker 컨테이너로 설치하기 위한 설치 스크립트를 제공합니다. Microsoft Windows에 Docker Desktop을 설치한 후에는 <strong>관리자</strong> 모드의 PowerShell 또는 Windows 명령 프롬프트에서 그리고 WSL 2에서 Docker CLI에 액세스할 수 있습니다. </p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">PowerShell 또는 Windows 명령 프롬프트에서<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>PowerShell 또는 Windows 명령 프롬프트에 더 익숙한 경우, 명령 프롬프트는 다음과 같습니다.</p>
<ol>
<li><p>마우스 오른쪽 버튼을 클릭하고 <strong>관리자 권한으로 실행을</strong> 선택하여 관리자 모드에서 Docker Desktop을 엽니다.</p></li>
<li><p>설치 스크립트를 다운로드하여 <code translate="no">standalone.bat</code> 에 저장합니다.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>다운로드한 스크립트를 실행하여 Milvus를 Docker 컨테이너로 시작합니다.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>설치 스크립트를 실행한 후</p>
<ul>
<li><p>포트 <strong>19530에서</strong> <strong>밀버스-스탠다드얼론이라는</strong> 이름의 도커 컨테이너가 시작되었습니다.</p></li>
<li><p>임베드 등드는 동일한 컨테이너에 Milvus와 함께 설치되며 포트 <strong>2379에서</strong> 서비스됩니다. 해당 구성 파일은 현재 폴더의 <strong>embedEtcd.yaml에</strong> 매핑됩니다.</p></li>
<li><p>Milvus 데이터 볼륨은 현재 폴더의 <strong>volumes/milvus에</strong> 매핑됩니다.</p></li>
</ul>
<p>다음 명령을 사용하여 Milvus 컨테이너와 저장된 데이터를 관리할 수 있습니다.</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">WSL 2에서<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Windows에서 Linux 명령어와 셸 스크립트를 사용하여 Milvus를 시작하려면 WSL 2 명령어를 이미 설치했는지 확인하세요. WSL 2 명령어를 설치하는 방법에 대한 자세한 내용은 이 <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Microsoft 문서를</a> 참조하세요.</p>
<ol>
<li><p>WSL 2를 시작합니다.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>설치 스크립트를 다운로드합니다.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus를 도커 컨테이너로 시작합니다.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>다음 명령어를 사용하여 Milvus 컨테이너와 저장된 데이터를 관리할 수 있습니다.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Docker Compose로 Milvus 실행하기<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Microsoft Windows에 Docker Desktop을 설치한 후에는 <strong>관리자</strong> 모드의 PowerShell 또는 Windows 명령 프롬프트에서 Docker CLI에 액세스할 수 있습니다. PowerShell, Windows 명령 프롬프트 또는 WSL 2에서 Docker Compose를 실행하여 Milvus를 시작할 수 있습니다.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">PowerShell 또는 Windows 명령 프롬프트에서<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p>마우스 오른쪽 버튼을 클릭하고 <strong>관리자 권한으로 실행을</strong> 선택하여 관리자 모드에서 Docker 데스크톱을 엽니다.</p></li>
<li><p>PowerShell 또는 Windows 명령 프롬프트에서 다음 명령을 실행하여 Milvus Standalone용 Docker Compose 구성 파일을 다운로드하고 Milvus를 시작합니다.</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.6/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>네트워크 연결에 따라 Milvus 설치를 위한 이미지를 다운로드하는 데 시간이 걸릴 수 있습니다. 밀버스 <strong>스탠드얼론</strong>, <strong>밀버스 미니오</strong>, <strong>밀버스-etcd라는</strong> 이름의 컨테이너가 가동되면 다음과 같은 것을 확인할 수 있습니다.</p>
<ul>
<li><p><strong>milvus-etcd</strong> 컨테이너는 호스트에 포트를 노출하지 않고 데이터를 현재 폴더의 <strong>볼륨/etcd에</strong> 매핑합니다.</p></li>
<li><p><strong>milvus-minio</strong> 컨테이너는 기본 인증 자격 증명을 사용하여 포트 <strong>9090</strong> 및 <strong>9091을</strong> 로컬로 서비스하고 데이터를 현재 폴더의 <strong>볼륨/minio에</strong> 매핑합니다.</p></li>
<li><p><strong>밀버스-독립형</strong> 컨테이너는 기본 설정으로 포트 <strong>19530을</strong> 로컬로 서비스하고 해당 데이터를 현재 폴더의 <strong>볼륨/milvus에</strong> 매핑합니다.</p></li>
</ul></li>
</ol>
<p>WSL 2가 설치되어 있는 경우 Linux 버전의 Docker Compose 명령을 호출할 수도 있습니다.</p>
<h3 id="From-WSL-2​" class="common-anchor-header">WSL 2에서<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>이 절차는 Docker Compose를 사용하여 Linux 시스템에 Milvus를 설치하는 것과 유사합니다.</p>
<ol>
<li><p>WSL 2를 시작합니다.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Milvus 구성 파일을 다운로드합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.6/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus를 시작합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">FAQ<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header"><code translate="no">Docker Engine stopped</code> 오류는 어떻게 처리하나요?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>컴퓨터가 제대로 구성되지 않은 경우 Windows에 Docker Desktop을 설치한 후 <code translate="no">Docker Engine stopped</code> 오류가 발생할 수 있습니다. 이 경우 다음 사항을 확인해야 할 수 있습니다.</p>
<ol>
<li><p>가상화가 활성화되어 있는지 확인합니다.</p>
<p>가상화가 활성화되어 있는지 여부는 <strong>작업 관리자의</strong> <strong>성능</strong> 탭에서 확인할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>작업 관리자의 가상화</span> </span></p>
<p>가상화가 비활성화되어 있는 경우 마더보드 펌웨어의 BIOS 설정을 확인해야 할 수 있습니다. BIOS 설정에서 가상화를 활성화하는 방법은 마더보드 공급업체에 따라 다릅니다. 예를 들어 ASUS 마더보드의 경우 가상화 활성화에 관한 <a href="https://www.asus.com/support/faq/1043786/">이 도움말 문서를</a> 참조하세요.</p>
<p>그런 다음 컴퓨터를 다시 시작하고 Hyper-V를 사용하도록 설정해야 합니다. 자세한 내용은 이 <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoft 문서를</a> 참조하세요.</p></li>
<li><p>Docker 데스크톱 서비스가 시작되었는지 확인합니다.</p>
<p>다음 명령을 실행하여 Docker 데스크톱 서비스를 시작할 수 있습니다.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>WSL이 제대로 설치되었는지 확인합니다.</p>
<p>다음 명령을 실행하여 WSL 2 명령을 설치하거나 업데이트할 수 있습니다.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>Docker 데몬이 시작되었는지 확인합니다.</p>
<p>Docker Desktop의 설치 디렉터리로 이동하여 <code translate="no">.\DockerCli.exe -SwitchDaemon</code> 을 실행하여 Docker Daemon을 시작해야 합니다.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p><strong>관리자</strong> 모드에서 Docker Desktop을 시작했는지 확인합니다.</p>
<p>관리자 모드에서 Docker Desktop을 시작했는지 확인합니다. 그러려면 <strong>Docker Desktop을</strong> 마우스 오른쪽 버튼으로 클릭하고 <strong>관리자 권한으로 실행을</strong> 선택합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>관리자 권한으로 Docker Desktop 시작</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Milvus를 배포하는 동안 WSL 관련 문제가 발생하면 어떻게 처리할 수 있나요?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>WSL 2에서 Milvus를 실행하는 동안 WSL 관련 문제가 발생한 경우, 다음과 같이 WSL 2 기반 엔진을 사용하도록 Docker Desktop을 구성했는지 확인해야 할 수 있습니다.</p>
<ol>
<li><p><strong>설정</strong> &gt; <strong>일반에서</strong>"WSL 2 기반 엔진 사용"이 선택되어 있는지 확인합니다. </p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Docker Desktop 설정에서 WSL 2 기반 엔진 사용</span> </span></p></li>
<li><p>설치된 WSL 2 배포판 중에서 Docker 통합을 사용 설정하려는 배포판을 선택합니다: <strong>설정</strong> &gt; <strong>리소스</strong> &gt; <strong>WSL 통합으로</strong> 이동합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Docker Desktop 설정에서 WSL 2 배포를 선택합니다</span> </span>.</p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header"><code translate="no">Read config failed</code>Milvus 시작 시 다음과 같은 볼륨 관련 오류 메시지가 표시되는 경우 어떻게 처리할 수 있나요?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
    </button></h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Milvus 시작 시 구성 실패 오류 프롬프트 읽기</span> </span></p>
<p>Milvus 시작 중 "읽기 구성 실패"라는 메시지가 표시되는 오류를 해결하려면 Milvus 컨테이너에 마운트된 볼륨이 올바른지 확인해야 합니다. 볼륨이 컨테이너에 올바르게 마운트된 경우 <code translate="no">docker exec</code> 명령어를 사용하여 컨테이너로 이동하여 다음과 같이 <strong>/milvus/configs</strong> 폴더를 나열할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>Milvus 설정 파일 나열</span> </span></p>
<p></p>
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
<li><p><a href="/docs/ko/quickstart.md">빠른 시작을</a> 확인하여 Milvus가 수행할 수 있는 작업을 확인합니다.</p></li>
<li><p>Milvus의 기본 동작에 대해 알아보세요:</p>
<ul>
<li><a href="/docs/ko/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/insert-update-delete.md">삽입, 위로 올리기 및 삭제</a></li>
<li><a href="/docs/ko/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/docs/ko/upgrade_milvus_cluster-helm.md">헬름 차트를 사용하여 Milvus 업그레이드</a>.</p></li>
<li><p><a href="/docs/ko/scaleout.md">Milvus 클러스터 확장하기</a>.</p></li>
<li><p>Milvu 클러스터를 클라우드에 배포하세요:</p>
<ul>
<li><a href="/docs/ko/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/gcp.md">구글 클라우드</a></li>
<li><a href="/docs/ko/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvus 통합 가시성 및 관리를 위한 직관적인 웹 인터페이스인 Milvus <a href="/docs/ko/milvus-webui.md">WebUI를</a> 살펴보세요.</p></li>
<li><p>Milvus 데이터 백업을 위한 오픈 소스 도구인 Milvus <a href="/docs/ko/milvus_backup_overview.md">Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/birdwatcher_overview.md">Birdwatcher에</a> 대해 알아보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://github.com/zilliztech/attu">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/monitor.md">Prometheus로 Milvus 모니터링</a>.</p></li>
</ul>
