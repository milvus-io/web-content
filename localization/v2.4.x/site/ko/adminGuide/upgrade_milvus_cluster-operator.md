---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Milvus 운영자를 사용하여 Milvus 클러스터를 업그레이드하는 방법을 알아보세요.
title: 밀버스 오퍼레이터로 밀버스 클러스터 업그레이드하기
---
<div class="tab-wrapper"><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-operator.md" class='active '>밀버스</a><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>오퍼레이터헬름</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">밀버스 오퍼레이터로 밀버스 클러스터 업그레이드하기<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 Milvus 오퍼레이터로 Milvus 클러스터를 업그레이드하는 방법을 설명합니다.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Milvus 오퍼레이터 업그레이드<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령어를 실행하여 Milvus 운영자 버전을 v1.1.9로 업그레이드합니다.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 운영자를 최신 버전으로 업그레이드한 후에는 다음과 같은 옵션을 선택할 수 있습니다:</p>
<ul>
<li>Milvus를 v2.2.3 이상 릴리스에서 2.4.23으로 업그레이드하려면 <a href="#Conduct-a-rolling-upgrade">롤링 업그레이드를 수행하면</a> 됩니다.</li>
<li>v2.2.3 이전 마이너 릴리스에서 2.4.23으로 업그레이드하려면 <a href="#Upgrade-Milvus-by-changing-its-image">이미지 버전을 변경하여 Mil</a>vus를 업그레이드하는 것이 좋습니다.</li>
<li>Milvus를 v2.1.x에서 2.4.23으로 업그레이드하려면 실제 업그레이드 전에 <a href="#Migrate-the-metadata">메타데이터를 마이그레이션해야</a> 합니다.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">롤링 업그레이드 수행<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.2.3부터는 Milvus 코디네이터가 활성-대기 모드에서 작동하도록 구성하고 롤링 업그레이드 기능을 활성화하여 코디네이터 업그레이드 중에 들어오는 요청에 응답할 수 있도록 할 수 있습니다. 이전 릴리스에서는 업그레이드 중에 코디네이터를 제거했다가 다시 생성해야 하므로 서비스 다운타임이 발생할 수 있습니다.</p>
<p>Milvus 운영자는 Kubernetes에서 제공하는 롤링 업데이트 기능을 기반으로 종속성에 따라 배포를 순서대로 업데이트합니다. 또한 Milvus는 업그레이드 중에 구성 요소가 종속된 구성 요소와 호환성을 유지하도록 보장하는 메커니즘을 구현하여 잠재적인 서비스 중단 시간을 크게 줄입니다.</p>
<p>롤링 업그레이드 기능은 기본적으로 비활성화되어 있습니다. 구성 파일을 통해 명시적으로 활성화해야 합니다.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingUpgrade <span class="hljs-comment"># Default value, can be omitted</span>
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>위의 구성 파일에서 <code translate="no">spec.components.enableRollingUpdate</code> 을 <code translate="no">true</code> 으로 설정하고 <code translate="no">spec.components.image</code> 을 원하는 Milvus 버전으로 설정합니다.</p>
<p>기본적으로 Milvus는 코디네이터에 대한 롤링 업그레이드를 수행하여 코디네이터 포드 이미지를 차례로 교체하는 순서대로 진행합니다. 업그레이드 시간을 줄이려면 <code translate="no">spec.components.imageUpdateMode</code> 을 <code translate="no">all</code> 으로 설정하여 Milvus가 모든 포드 이미지를 동시에 교체하도록 하세요.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: all
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">spec.components.imageUpdateMode</code> 을 <code translate="no">rollingDowngrade</code> 으로 설정하여 Milvus가 코디네이터 파드 이미지를 하위 버전으로 대체하도록 할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:&lt;some-old-version&gt;
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 구성을 YAML 파일(예: <code translate="no">milvusupgrade.yaml</code>)로 저장하고 다음과 같이 이 구성 파일을 Milvus 인스턴스에 패치합니다:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">이미지를 변경하여 Milvus 업그레이드<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>일반적인 경우에는 이미지를 변경하여 Milvus를 최신 버전으로 간단히 업데이트할 수 있습니다. 그러나 이러한 방식으로 Milvus를 업그레이드할 경우 일정 시간 동안 다운타임이 발생한다는 점에 유의하세요.</p>
<p>다음과 같이 구성 파일을 작성하고 <strong>milvusupgrade.yaml로</strong> 저장합니다:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
   image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음을 실행하여 업그레이드를 수행합니다:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Milvus 2.2.0부터는 메타데이터가 이전 릴리즈의 메타데이터와 호환되지 않습니다. 다음 예제 코드 조각은 Milvus 2.1.4에서 Milvus 2.4.23으로 업그레이드하는 경우를 가정합니다.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. 메타데이터 마이그레이션을 위한 <code translate="no">.yaml</code> 파일 만들기</h3><p>메타데이터 마이그레이션 파일을 만듭니다. 다음은 예시입니다. 설정 파일에 <code translate="no">name</code>, <code translate="no">sourceVersion</code>, <code translate="no">targetVersion</code> 을 지정해야 합니다. 다음 예에서는 <code translate="no">name</code> 을 <code translate="no">my-release-upgrade</code> 으로 , <code translate="no">sourceVersion</code> 을 <code translate="no">v2.1.4</code> 으로 , <code translate="no">targetVersion</code> 을 <code translate="no">v2.4.23</code> 으로 설정합니다. 즉, Milvus 클러스터가 v2.1.4에서 v2.4.23으로 업그레이드됩니다.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: MilvusUpgrade
metadata:
  name: my-release-upgrade
spec:
  milvus:
    namespace: default
    name: my-release
  sourceVersion: <span class="hljs-string">&quot;v2.1.4&quot;</span>
  targetVersion: <span class="hljs-string">&quot;v2.4.23&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.4.23&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. 새 구성 적용</h3><p>다음 명령을 실행하여 새 구성을 생성합니다.</p>
<pre><code translate="no">$ kubectl create -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/zilliztech/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. 메타데이터 마이그레이션 상태 확인</h3><p>다음 명령을 실행하여 메타데이터 마이그레이션 상태를 확인합니다.</p>
<pre><code translate="no">kubectl describe milvus release-name
<button class="copy-code-btn"></button></code></pre>
<p>출력에 <code translate="no">ready</code> 상태가 표시되면 메타데이터 마이그레이션이 성공했음을 의미합니다.</p>
<p>또는 <code translate="no">kubectl get pod</code> 을 실행하여 모든 파드를 확인할 수도 있습니다. 모든 파드가 <code translate="no">ready</code> 이면 메타데이터 마이그레이션이 성공한 것입니다.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. 삭제 <code translate="no">my-release-upgrade</code></h3><p>업그레이드가 성공하면 YAML 파일에서 <code translate="no">my-release-upgrade</code> 을 삭제합니다.</p>
