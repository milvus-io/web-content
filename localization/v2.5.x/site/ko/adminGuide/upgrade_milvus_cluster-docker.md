---
id: upgrade_milvus_cluster-docker.md
summary: Docker Compose로 Milvus 클러스터를 업그레이드하는 방법을 알아보세요.
title: 도커 컴포즈로 밀버스 클러스터 업그레이드하기
---
<div class="tab-wrapper"><a href="/docs/ko/v2.5.x/upgrade_milvus_standalone-operator.md" class=''>밀버스</a><a href="/docs/ko/v2.5.x/upgrade_milvus_cluster-operator.md" class=''>오퍼레이터밀버스 오퍼레이터밀버스</a><a href="/docs/ko/v2.5.x/configure-helm.md" class=''>오퍼레이터헬름도커</a><a href="/docs/ko/v2.5.x/upgrade_milvus_standalone-helm.md" class=''>컴포즈헬름도커</a><a href="/docs/ko/v2.5.x/upgrade_milvus_cluster-helm.md" class=''>컴포즈헬름</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">도커 컴포즈로 밀버스 클러스터 업그레이드하기<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목은 도커 컴포즈를 사용하여 Milvus를 업그레이드하는 방법을 설명합니다.</p>
<p>일반적인 경우, <a href="#Upgrade-Milvus-by-changing-its-image">이미지를 변경하여 Milvus를 업그레이드할</a> 수 있습니다. 그러나 v2.1.x에서 v2.5.15로 업그레이드하기 전에 <a href="#Migrate-the-metadata">메타데이터를 마이그레이션해야</a> 합니다.</p>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">이미지를 변경하여 Milvus 업그레이드하기<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>일반적인 경우 다음과 같이 Milvus를 업그레이드할 수 있습니다:</p>
<ol>
<li><p><code translate="no">docker-compose.yaml</code> 에서 Milvus 이미지 태그를 변경합니다.</p>
<p>프록시, 모든 코디네이터 및 모든 워커 노드의 이미지 태그를 변경해야 한다는 점에 유의하세요.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">rootcoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-rootcoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-proxy</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">querycoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-querycoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span>  
<span class="hljs-string">...</span>
<span class="hljs-attr">querynode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-querynode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">indexcoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-indexcoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">indexnode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-indexnode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span> 
<span class="hljs-string">...</span>
<span class="hljs-attr">datacoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-datacoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span>   
<span class="hljs-string">...</span>
<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-datanode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.15</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>다음 명령을 실행하여 업그레이드를 수행합니다.</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">메타데이터 마이그레이션<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>모든 Milvus 컴포넌트를 중지합니다.</p>
<pre><code translate="no">docker stop <span class="hljs-tag">&lt;<span class="hljs-name">milvus-component-docker-container-name</span>&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>메타 마이그레이션을 위해 구성 파일 <code translate="no">migrate.yaml</code> 을 준비합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
<span class="hljs-attr">cmd:</span>
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">run</span>
  <span class="hljs-attr">runWithBackup:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">config:</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-number">2.5</span><span class="hljs-number">.15</span>
  <span class="hljs-attr">backupFilePath:</span> <span class="hljs-string">/tmp/migration.bak</span>
<span class="hljs-attr">metastore:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span>
<span class="hljs-attr">etcd:</span>
  <span class="hljs-attr">endpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-etcd:2379</span>  <span class="hljs-comment"># Use the etcd container name</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">by-dev</span> <span class="hljs-comment"># The root path where data is stored in etcd</span>
  <span class="hljs-attr">metaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-attr">kvSubPath:</span> <span class="hljs-string">kv</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>마이그레이션 컨테이너를 실행합니다.</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>새 Milvus 이미지로 Milvus 컴포넌트를 다시 시작합니다.</p>
<pre><code translate="no">Update the milvus <span class="hljs-selector-tag">image</span> tag in the docker-compose<span class="hljs-selector-class">.yaml</span>
docker compose down
docker compose up -d
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
    </button></h2><ul>
<li>다음 방법을 알아보세요:<ul>
<li><a href="/docs/ko/v2.5.x/scaleout.md">Milvus 클러스터 확장하기</a></li>
</ul></li>
<li>클라우드에 클러스터를 배포할 준비가 되었다면:<ul>
<li><a href="/docs/ko/v2.5.x/eks.md">Terraform을 사용하여 Amazon EKS에 Milvus를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.5.x/gcp.md">Kubernetes를 사용하여 GCP에 Milvus 클러스터를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.5.x/azure.md">Kubernetes를 사용하여 Microsoft Azure에 Milvus를 배포하는</a> 방법 알아보기</li>
</ul></li>
</ul>
