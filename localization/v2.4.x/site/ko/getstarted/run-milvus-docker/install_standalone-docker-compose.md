---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Docker Compose를 사용하여 Milvus를 독립형으로 설치하는 방법을 알아보세요.
title: Docker Compose로 Milvus 실행하기(Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Docker Compose로 Milvus 실행하기(Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지는 도커 컴포즈를 사용하여 도커에서 Milvus 인스턴스를 실행하는 방법을 설명합니다.</p>
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
<li>설치하기 전에<a href="/docs/ko/v2.4.x/prerequisite-docker.md">하드웨어 및 소프트웨어 요구 사항을 확인하세요</a>.</li>
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
    </button></h2><p>Milvus는 Milvus 리포지토리에 Docker Compose 구성 파일을 제공합니다. Docker Compose를 사용하여 Milvus를 설치하려면 다음을 실행하세요.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>위 명령이 실행되지 않는 경우 시스템에 Docker Compose V1이 설치되어 있는지 확인하시기 바랍니다. <a href="https://docs.docker.com/compose/">이 경우 이 페이지의</a> 참고 사항에 따라 Docker Compose V2로 마이그레이션하는 것이 좋습니다.</p></li>
<li><p>이미지를 가져오는 데 문제가 발생하면 <a href="mailto:community@zilliz.com">community@zilliz.com</a> 으로 문의해 주시면 필요한 지원을 제공해 드리겠습니다.</p></li>
</ul>
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
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>다음과 같이 이 컨테이너를 중지하고 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>Docker에 Milvus를 설치했으면 다음을 수행할 수 있습니다:</p>
<ul>
<li><p><a href="/docs/ko/v2.4.x/quickstart.md">빠른 시작을</a> 확인하여 Milvus가 수행할 수 있는 작업을 확인합니다.</p></li>
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
<li><p>Milvus 클러스터를 클라우드에 배포하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/v2.4.x/gcp.md">구글 클라우드</a></li>
<li><a href="/docs/ko/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvus 데이터 백업을 위한 오픈 소스 도구인 Milvus <a href="/docs/ko/v2.4.x/milvus_backup_overview.md">Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/v2.4.x/birdwatcher_overview.md">Birdwatcher를</a> 살펴보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://github.com/zilliztech/attu">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/v2.4.x/monitor.md">Prometheus로 Milvus 모니터링</a>.</p></li>
</ul>
