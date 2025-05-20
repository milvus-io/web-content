---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 了解如何使用 Milvus Operator 升级 Milvus Standalone。
title: 使用 Milvus Operator 升级 Milvus Standalone
---
<div class="tab-wrapper"><a href="/docs/zh/v2.4.x/upgrade_milvus_standalone-operator.md" class='active '>Milvus</a><a href="/docs/zh/v2.4.x/upgrade_milvus_standalone-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/zh/v2.4.x/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 升级 Milvus Standalone<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南介绍如何使用 Milvus Operator 升级 Milvus Standalone。</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">升级 Milvus 操作符<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>运行以下命令将您的 Milvus 操作符版本升级到 v1.1.9。</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>将 Milvus 操作符升级到最新版本后，您有以下选择：</p>
<ul>
<li>要将 Milvus 从版本 2.2.3 或更高<a href="#Conduct-a-rolling-upgrade">版本升级</a>到 2.4.23，可以<a href="#Conduct-a-rolling-upgrade">进行滚动升级</a>。</li>
<li>要将 Milvus 从 v2.2.3 之前的次版本升级到 2.4.23，建议你<a href="#Upgrade-Milvus-by-changing-its-image">通过更改映像版本来升级 Milvus</a>。</li>
<li>要将 Milvus 从 v2.1.x 升级到 2.4.23，需要在实际升级前<a href="#Migrate-the-metadata">迁移元数据</a>。</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">进行滚动升级<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 2.2.3 起，你可以配置 Milvus 协调器工作在活动-待机模式，并为它们启用滚动升级功能，这样 Milvus 就能在协调器升级期间响应传入的请求。在以前的版本中，升级时需要移除协调器，然后再创建协调器，这可能会导致服务出现一定的停机时间。</p>
<p>基于 Kubernetes 提供的滚动更新功能，Milvus 操作符会根据部署的依赖关系强制执行有序更新。此外，Milvus 还实施了一种机制，确保其组件在升级期间与依赖于它们的组件保持兼容，从而大大减少了潜在的服务停机时间。</p>
<p>滚动升级功能默认为禁用。你需要通过配置文件明确启用它。</p>
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
<p>在上述配置文件中，将<code translate="no">spec.components.enableRollingUpdate</code> 设置为<code translate="no">true</code> ，将<code translate="no">spec.components.image</code> 设置为所需的 Milvus 版本。</p>
<p>默认情况下，Milvus 会以有序的方式对协调器进行滚动升级，即逐个替换协调器 pod 映像。要缩短升级时间，可以考虑将<code translate="no">spec.components.imageUpdateMode</code> 设置为<code translate="no">all</code> ，这样 Milvus 就会同时替换所有 pod 映像。</p>
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
<p>可以将<code translate="no">spec.components.imageUpdateMode</code> 设置为<code translate="no">rollingDowngrade</code> ，让 Milvus 用较低的版本替换协调器 pod 映像。</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:&lt;some-older-version&gt;
<button class="copy-code-btn"></button></code></pre>
<p>然后将配置保存为 YAML 文件（例如<code translate="no">milvusupgrade.yaml</code> ），并将此配置文件修补到 Milvus 实例中，如下所示：</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">通过更改映像升级 Milvus<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>在正常情况下，你可以通过更改映像将你的 Milvus 升级到最新版本。但要注意的是，用这种方法升级 Milvus 时会有一定的停机时间。</p>
<p>编写如下配置文件，并将其保存为<strong>milvusupgrade.yaml</strong>：</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
    name: my-release
labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
   image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>然后运行以下命令执行升级：</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">迁移元数据<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 2.2.0 起，元数据与以前版本的元数据不兼容。以下示例片段假定从 Milvus 2.1.4 升级到 Milvus v2.4.23。</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1.创建用于元数据迁移的<code translate="no">.yaml</code> 文件</h3><p>创建元数据迁移文件。下面是一个示例。需要在配置文件中指定<code translate="no">name</code> 、<code translate="no">sourceVersion</code> 和<code translate="no">targetVersion</code> 。下面的示例将<code translate="no">name</code> 设置为<code translate="no">my-release-upgrade</code> ，将<code translate="no">sourceVersion</code> 设置为<code translate="no">v2.1.4</code> ，将<code translate="no">targetVersion</code> 设置为<code translate="no">v2.4.23</code> 。这意味着您的 Milvus 实例将从 v2.1.4 升级到 v2.4.23。</p>
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
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2.应用新配置</h3><p>运行以下命令应用新配置。</p>
<pre><code translate="no">$ kubectl create -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvusupgrade.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3.3. 检查元数据迁移状态</h3><p>运行以下命令检查元数据迁移的状态。</p>
<pre><code translate="no">kubectl describe milvus release-name
<button class="copy-code-btn"></button></code></pre>
<p>输出中的状态为<code translate="no">ready</code> 意味着元数据迁移成功。</p>
<p>或者，也可以运行<code translate="no">kubectl get pod</code> 检查所有 pod。如果所有 pod 都是<code translate="no">ready</code> ，则元数据迁移成功。</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4.删除<code translate="no">my-release-upgrade</code></h3><p>升级成功后，删除 YAML 文件中的<code translate="no">my-release-upgrade</code> 。</p>
