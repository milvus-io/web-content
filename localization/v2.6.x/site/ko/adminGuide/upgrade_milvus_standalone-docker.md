---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Docker Compose를 사용하여 Milvus 독립 실행형 버전을 업그레이드하는 방법을 알아보세요.
title: Docker Compose를 사용하여 Milvus 독립형 버전 업그레이드
---
<div class="tab-wrapper"><a href="/docs/ko/v2.6.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ko/v2.6.x/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/ko/v2.6.x/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
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
    </button></h1><p>이 가이드에서는 Docker Compose를 사용하여 Milvus 독립형 배포 환경을 v2.5.x에서 v2.6.17로 업그레이드하는 방법을 설명합니다.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v2617" class="common-anchor-header">v2.6.17의 새로운 기능<button data-href="#Whats-new-in-v2617" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 2.5.x에서 2.6.17로 업그레이드하는 과정에는 다음과 같은 주요 아키텍처 변경 사항이 포함됩니다:</p>
<ul>
<li><strong>코디네이터 통합</strong>: 기존에 별도로 운영되던 코디네이터(<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>)가 단일 코디네이터로 통합되었습니다. <code translate="no">mixCoord</code></li>
<li><strong>새로운 구성 요소</strong>: 향상된 데이터 처리를 위한 스트리밍 노드 도입</li>
<li><strong>구성 요소 제거</strong>: <code translate="no">indexNode</code> 이 제거되고 통합되었습니다</li>
</ul>
<p>이 업그레이드 프로세스는 새로운 아키텍처로의 원활한 마이그레이션을 보장합니다. 아키텍처 변경 사항에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/architecture_overview.md">Milvus 아키텍처 개요를</a> 참조하십시오.</p>
<h3 id="Requirements" class="common-anchor-header">요구 사항<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>시스템 요구 사항:</strong></p>
<ul>
<li>Docker 및 Docker Compose 설치 완료</li>
<li>Docker Compose를 통해 배포된 Milvus 독립형</li>
</ul>
<p><strong>호환성 요구 사항:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1은 v2.6.17과 <strong>호환되지 않습니다</strong>. 릴리스 후보(RC) 버전에서 직접 업그레이드하는 것은 지원되지 않습니다.</li>
<li>현재 v2.6.0-rc1을 실행 중이며 데이터를 보존해야 하는 경우, 마이그레이션 지원을 위해 <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">이 커뮤니티 가이드를</a> 참조하십시오.</li>
<li>v2.6.17로 업그레이드하기 전에 <strong>반드시</strong> v2.5.16 이상으로 먼저 업그레이드해야 <strong>합니다</strong>.</li>
</ul>
<p><strong>메시지 큐 제한 사항</strong>: Milvus v2.6.17로 업그레이드할 때는 현재 사용 중인 메시지 큐를 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경에 대한 지원은 향후 버전에서 제공될 예정입니다.</p>
<div class="alter note">
<p>보안상의 이유로, Milvus는 v2.6.17 릴리스와 함께 MinIO를 RELEASE.2024-12-18T13-15-44Z로 업그레이드합니다.</p>
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
    </button></h2><h3 id="Step-1-Upgrade-to-v2516" class="common-anchor-header">1단계: v2.5.16으로 업그레이드<button data-href="#Step-1-Upgrade-to-v2516" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>독립형 배포 환경이 이미 v2.5.16 이상을 실행 중인 경우 이 단계를 건너뛰십시오.</p>
</div>
<ol>
<li><p>기존 ` <code translate="no">docker-compose.yaml</code> ` 파일을 편집하고 Milvus 이미지 태그를 v2.5.16으로 업데이트하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>v2.5.16으로 업그레이드를 적용하십시오:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
<li><p>v2.5.16 업그레이드 확인:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-2-Upgrade-to-v2617" class="common-anchor-header">2단계: v2.6.17로 업그레이드<button data-href="#Step-2-Upgrade-to-v2617" class="anchor-icon" translate="no">
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
    </button></h3><p>v2.5.16이 정상적으로 실행되면 v2.6.17로 업그레이드하십시오:</p>
<ol>
<li><p>기존 <code translate="no">docker-compose.yaml</code> 파일을 편집하고 Milvus 및 MinIO 이미지 태그를 모두 v2.6.17로 업데이트하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-minio</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">minio/minio:RELEASE.2024-12-18T13-15-44Z</span>

<span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>최종 업그레이드를 적용하십시오:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>독립형 배포 환경이 새 버전으로 실행 중인지 확인하십시오:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check container status</span>
docker compose ps

<span class="hljs-comment"># Check Milvus version</span>
docker compose logs standalone | grep <span class="hljs-string">&quot;version&quot;</span>
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
    </button></h2><ul>
<li>다음과 같은 내용도 알아보시기 바랍니다:
<ul>
<li><a href="/docs/ko/v2.6.x/scaleout.md">Milvus 클러스터 확장하기</a></li>
</ul></li>
<li>클라우드로 클러스터를 배포할 준비가 되셨다면:
<ul>
<li><a href="/docs/ko/v2.6.x/eks.md">Terraform을 사용하여 Amazon EKS에 Milvus를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.6.x/gcp.md">Kubernetes를 사용하여 GCP에 Milvus 클러스터를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.6.x/azure.md">Kubernetes를 사용하여 Microsoft Azure에 Milvus를 배포하는</a> 방법 알아보기</li>
</ul></li>
</ul>
