---
id: allocate.md
title: 在 Kubernetes 上為 Milvus 分配資源
summary: 瞭解如何在 Kubernetes 上為 Milvus 分配資源。
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">在 Kubernetes 上分配資源<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題描述如何在 Kubernetes 上分配資源給 Milvus 叢集。</p>
<p>一般而言，您在生產中分配給 Milvus 叢集的資源應與機器的工作量成正比。分配資源時，您也應該考慮機器類型。雖然您可以在群集執行時更新配置，但我們建議您在<a href="/docs/zh-hant/install_cluster-helm.md">部署群集</a>前設定這些值。</p>
<div class="alert note">
<p>有關如何使用 Milvus Operator 分配資源的資訊，請參閱<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">使用 Milvus Operator 分配資源</a>。</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1.檢視可用資源<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>執行<code translate="no">kubectl describe nodes</code> 檢視您已佈建的實體上的可用資源。</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2.分配資源<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 Helm 為 Milvus 元件分配 CPU 和記憶體資源。</p>
<div class="alert note">
使用 Helm 升級資源會導致執行中的 Pod 執行滾動更新。</div>
<p>有兩種方式可以分配資源：</p>
<ul>
<li><a href="/docs/zh-hant/allocate.md#Allocate-resources-with-commands">使用指令</a></li>
<li><a href="/docs/zh-hant/allocate.md#Allocate-resources-by-setting-configuration-file">在<code translate="no">YAML</code> 檔案中設定參數</a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">使用指令分配資源</h3><p>如果使用<code translate="no">--set</code> 更新資源配置，您需要為每個 Milvus 元件設定資源變數。</p>
<div class="filter">
<a href="#standalone">Milvus 單機</a> <a href="#cluster">Milvus 集群</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> standalone.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> standalone.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> standalone.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> dataNode.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> dataNode.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> dataNode.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">透過設定配置檔分配資源</h3><p>您也可以在<code translate="no">resources.yaml</code> 檔案中指定參數<code translate="no">resources.requests</code> 和<code translate="no">resources.limits</code> 來分配 CPU 和記憶體資源。</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3.套用配置<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>執行下列指令，將新的配置套用到您的 Milvus 叢集。</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
如果未指定<code translate="no">resources.limits</code> ，pod 將消耗所有可用的 CPU 和記憶體資源。因此，請確保指定<code translate="no">resources.requests</code> 和<code translate="no">resources.limits</code> ，以避免在同一實體上其他執行中的任務需要消耗更多記憶體時，出現資源過度分配的情況。</div>
<p>請參閱<a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">Kubernetes 文件</a>，取得更多有關管理資源的資訊。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>您可能還想學習如何<ul>
<li><a href="/docs/zh-hant/scaleout.md">擴充 Milvus 叢集</a></li>
<li><a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">升級 Milvus 叢集</a></li>
<li><a href="/docs/zh-hant/upgrade_milvus_standalone-operator.md">升級 Milvus 單機</a></li>
</ul></li>
<li>如果您已準備好在雲上部署您的叢集：<ul>
<li>學習如何<a href="/docs/zh-hant/eks.md">使用 Terraform 在亞馬遜 EKS 上部署 Milvus</a></li>
<li>學習如何<a href="/docs/zh-hant/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 集群</a></li>
<li>學習如何<a href="/docs/zh-hant/azure.md">使用 Kubernetes 在 Microsoft Azure 上部署 Milvus</a></li>
</ul></li>
</ul>
