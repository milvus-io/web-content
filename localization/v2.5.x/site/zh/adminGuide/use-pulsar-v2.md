---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus 建议您将 Pulsar 升级到适用于 Milvus v2.5.x 的 v3 版本。不过，如果您更喜欢使用 Pulsar
  v2，本文将指导您完成在 Milvus v2.5.x 中继续使用 Pulsar v2 的步骤。
title: 在 Milvus v2.5.x 中使用 Pulsar v2
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">在 Milvus v2.5.x 中使用 Pulsar v2<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 建议你升级<a href="/docs/zh/upgrade-pulsar-v3.md">Pulsar</a> 到 v3 以运行 Milvus v2.5.x。不过，如果你更喜欢使用 Pulsar v2 与 Milvus v2.5.x，本文将指导你使用 Pulsar v2 运行 Milvus v2.5.x 的程序。</p>
<p>如果你已经有一个正在运行的 Milvus 实例，并希望将其升级到 v2.5.x，但继续使用 Pulsar v2，你可以按照本页的步骤进行操作。</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">升级 Milvus v2.5.x 时继续使用 Pulsar v2<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>本节将指导你在将运行中的 Milvus 实例升级到 Milvus v2.5.x 时继续使用 Pulsar v2 的步骤。</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">针对 Milvus 操作符用户</h3><p>Milvus Operator 默认兼容 Pulsar v2 升级。您可以参考<a href="/docs/zh/upgrade_milvus_cluster-operator.md">使用 Milvus Operator 升级 Milvus 群集</a>，将您的 Milvus 实例升级到 v2.5.x。</p>
<p>升级完成后，您可以继续在 Milvus 实例中使用 Pulsar v2。</p>
<h3 id="For-Helm-users" class="common-anchor-header">针对 Helm 用户</h3><p>升级前，请确保</p>
<ul>
<li><p>Helm 版本高于 v3.12，建议使用最新版本。</p>
<p>更多信息，请参阅<a href="https://helm.sh/docs/intro/install/">安装 Helm</a>。</p></li>
<li><p>您的 Kubernetes 版本高于 v1.20。</p></li>
</ul>
<p>本文中的操作符假定</p>
<ul>
<li><p>已在<code translate="no">default</code> 命名空间中安装 Milvus。</p></li>
<li><p>Milvus 的版本名称是<code translate="no">my-release</code> 。</p></li>
</ul>
<p>在升级 Milvus 之前，您需要更改<code translate="no">values.yaml</code> 文件，指定 Pulsar 版本为 v2。具体步骤如下</p>
<ol>
<li><p>获取 Milvus 实例的当前<code translate="no">values.yaml</code> 文件。</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>编辑<code translate="no">values.yaml</code> 文件，指定 Pulsar 版本为 v2。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>对于<code translate="no">image</code> ，将<code translate="no">tag</code> 更改为所需的 Milvus 版本（如<code translate="no">v2.5.0-beta</code> ）。</p></li>
<li><p>更新 Milvus Helm 图表。</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>升级 Milvus 实例。</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">使用 Pulsar v2 创建新的 Milvus 实例<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>本节将指导您使用 Pulsar v2 创建一个新的 Milvus 实例。</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">针对 Milvus 操作符用户</h3><p>在部署 Milvus v2.5.x 之前，您需要下载并编辑 Milvus 客户资源定义 (CRD) 文件。有关如何使用 Milvus Operator 安装 Milvus 的详细信息，请参阅<a href="/docs/zh/install_cluster-milvusoperator.md">使用 Milvus Operator 安装 Milvus 群集</a>。</p>
<ol>
<li><p>下载 CRD 文件。</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>编辑<code translate="no">milvus_cluster_default.yaml</code> 文件，指定 Pulsar 版本为 v2。</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
 <span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
 <span class="hljs-attr">metadata</span>:
   <span class="hljs-attr">name</span>: my-release
   <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
   <span class="hljs-attr">labels</span>:
     <span class="hljs-attr">app</span>: milvus
 <span class="hljs-attr">spec</span>:
   <span class="hljs-attr">mode</span>: cluster
   <span class="hljs-attr">dependencies</span>:
     <span class="hljs-attr">pulsar</span>:
       <span class="hljs-attr">inCluster</span>:
         <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>对于<code translate="no">dependencies</code> ，将<code translate="no">pulsar.inCluster.chartVersion</code> 更改为<code translate="no">pulsar-v2</code> 。</p></li>
<li><p>继续执行 "<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">使用 Milvus Operator 安装 Milvus 群集</a>"中的步骤，使用编辑后的 CRD 文件部署带有 Pulsar v2 的 Milvus v2.5.x。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">针对 Helm 用户</h3><p>在部署 Milvus v2.5.x 之前，可以准备一个<code translate="no">values.yaml</code> 文件，或者使用内联参数指定 Pulsar 版本。有关如何使用 Helm<a href="/docs/zh/install_cluster-helm.md">安装</a> Milvus 的详情，请参阅<a href="/docs/zh/install_cluster-helm.md">使用 Helm 安装 Milvus 群集</a>。</p>
<ul>
<li><p>使用内联参数指定 Pulsar 版本为 v2。</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用<code translate="no">values.yaml</code> 文件指定 Pulsar 版本为 v2。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>然后，使用<code translate="no">values.yaml</code> 文件与 Pulsar v2 一起部署 Milvus v2.5.x。</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
