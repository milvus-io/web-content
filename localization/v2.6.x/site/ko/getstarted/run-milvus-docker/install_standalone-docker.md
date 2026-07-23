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
<li>설치 전에<a href="/docs/ko/v2.6.x/prerequisite-docker.md">하드웨어 및 소프트웨어 요구 사항을 확인하십시오</a>.</li>
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
    </button></h2><p>Milvus는 Docker 컨테이너로 설치할 수 있는 설치 스크립트를 제공합니다. 이 스크립트는 <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus 저장소에서</a> 확인할 수 있습니다. Docker에서 Milvus를 설치하려면 다음 명령을 실행하기만 하면 됩니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>v2.6.17의 새로운 기능:</strong></p>
<ul>
<li><strong>스트리밍 노드</strong>: 데이터 처리 기능 강화</li>
<li><strong>Woodpecker MQ</strong>: 유지 관리 부담을 줄인 개선된 메시지 큐. 자세한 내용은 <a href="/docs/ko/v2.6.x/use-woodpecker.md">‘Woodpecker 사용’을</a> 참조하십시오</li>
<li><strong>최적화된 아키텍처</strong>: 성능 향상을 위해 구성 요소를 통합했습니다</li>
</ul>
<p>최신 구성 및 아키텍처 개선 사항을 반영하려면 항상 최신 스크립트를 다운로드하십시오.</p>
<p>독립형 배포 모드에서 <a href="https://milvus.io/docs/milvus_backup_overview.md">백업을</a> 사용하려는 경우, <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a> 배포 방법을 사용하는 것이 좋습니다.</p>
<p>이미지 가져오기에 문제가 발생하면, 문제에 대한 세부 정보를 기재하여 <a href="mailto:community@zilliz.com">community@zilliz.com으로</a> 문의해 주시면 필요한 지원을 제공해 드리겠습니다.</p>
</div>
<p>설치 스크립트 실행 후:</p>
<ul>
<li>port <strong>19530</strong>에서 milvus라는 이름의 Docker 컨테이너가 시작되었습니다.</li>
<li>Milvus와 함께 동일한 컨테이너 내에 임베디드 etcd가 설치되어 있으며, 포트 <strong>2379</strong>에서 서비스를 제공합니다. 해당 구성 파일은 현재 폴더의 <strong>embedEtcd.yaml에</strong> 매핑되어 있습니다.</li>
<li>기본 Milvus 구성을 변경하려면 현재 폴더에 있는 <strong>user.yaml</strong> 파일에 설정을 추가한 후 서비스를 다시 시작하십시오.</li>
<li>Milvus 데이터 볼륨은 현재 폴더의 <strong>volumes/milvus</strong> 에 매핑되어 있습니다.</li>
</ul>
<p><code translate="no">http://127.0.0.1:9091/webui/</code> 에서 Milvus WebUI에 접속하여 Milvus 인스턴스에 대해 자세히 알아볼 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.6.x/milvus-webui.md">Milvus WebUI를</a> 참조하십시오.</p>
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
    </button></h2><p>현재 폴더에 있는 <strong>user.yaml</strong> 파일에서 Milvus 구성을 수정할 수 있습니다. 예를 들어, <code translate="no">proxy.healthCheckTimeout</code> 을 <code translate="no">1000</code> ms로 변경하려면 파일을 다음과 같이 수정하면 됩니다.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음과 같이 서비스를 다시 시작하십시오:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>적용 가능한 구성 항목에 대해서는 <a href="/docs/ko/v2.6.x/system_configuration.md">시스템 구성을</a> 참조하십시오.</p>
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
    </button></h2><p>내장된 업그레이드 명령어를 사용하여 Milvus를 최신 버전으로 업그레이드할 수 있습니다. 이 명령어는 최신 구성 및 Milvus 이미지를 자동으로 다운로드합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>업그레이드 명령어는 다음 작업을 자동으로 수행합니다:</p>
<ul>
<li>업데이트된 구성이 포함된 최신 설치 스크립트를 다운로드합니다</li>
<li>최신 Milvus Docker 이미지를 가져옵니다</li>
<li>새로운 버전으로 컨테이너를 재시작합니다</li>
<li>기존 데이터와 구성을 보존합니다</li>
</ul>
<p>이는 Milvus 독립형 배포 환경을 업그레이드하는 권장 방법입니다.</p>
</div>
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
    </button></h2><p>Docker에 Milvus를 설치한 후에는 다음을 수행할 수 있습니다.</p>
<ul>
<li><p><a href="/docs/ko/v2.6.x/quickstart.md">퀵스타트를</a> 확인하여 Milvus의 기능을 살펴보세요.</p></li>
<li><p>Milvus의 기본 작동 방식을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.6.x/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/v2.6.x/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/v2.6.x/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/v2.6.x/insert-update-delete.md">삽입, 업서트 및 삭제</a></li>
<li><a href="/docs/ko/v2.6.x/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/v2.6.x/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/docs/ko/v2.6.x/upgrade_milvus_cluster-helm.md">Helm 차트를 사용하여 Milvus 업그레이드하기</a>.</p></li>
<li><p><a href="/docs/ko/v2.6.x/scaleout.md">Milvus 클러스터 확장</a>.</p></li>
<li><p>클라우드에 Milvus 클러스터 배포:</p>
<ul>
<li><a href="/docs/ko/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ko/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvus의 가시성 및 관리를 위한 직관적인 웹 인터페이스인 <a href="/docs/ko/v2.6.x/milvus-webui.md">Milvus WebUI를</a> 살펴보세요.</p></li>
<li><p>Milvus 데이터 백업을 위한 오픈소스 도구인 <a href="/docs/ko/v2.6.x/milvus_backup_overview.md">Milvus Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/v2.6.x/birdwatcher_overview.md">Birdwatcher를</a> 살펴보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://github.com/zilliztech/attu">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/v2.6.x/monitor.md">Prometheus를 사용하여 Milvus를 모니터링하세요</a>.</p></li>
</ul>
