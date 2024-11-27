---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: 了解如何在 Milvus 中将 Pulsar 从 V2 升级到 V3，以便使用最新版本的 Milvus v2.5.x。
title: 将 Milvus 的脉冲星从 V2 升级到 V3
---
<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">升级 Pulsar<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>自 Milvus v2.5 起，<strong>milvus-helm</strong>和<strong>milvus-operator</strong>将默认使用 pulsar V3，以修复一些错误和安全漏洞。</p>
<div class="alert note">
<ol>
<li><p>升级过程需要短暂的服务中断（通常需要几分钟到十多分钟，视数据量而定）。</p></li>
<li><p>操作前，需要停止所有正在运行的客户端向 Milvus 写入数据。否则，写入的数据可能会丢失。</p></li>
<li><p>本文假设 Milvus 安装在命名空间<code translate="no">default</code> 并命名为<code translate="no">my-release</code> 。在执行从本页复制的命令时，请将参数更改为您自己的命名空间和发布名称。</p></li>
<li><p>确保您的工作环境在 Kubernetes 集群的上述命名空间下拥有权限，并安装了以下命令。</p>
<p>a.<code translate="no">kubectl</code> &gt;= 1.20</p>
<p>b.<code translate="no">helm</code> &gt;= 3.14.0</p>
<p>c.<code translate="no">cat</code>,<code translate="no">grep</code>,<code translate="no">awk</code> 用于字符串操作符操作</p>
<p>d.<code translate="no">curl</code> 或<strong>Attu v2.4+</strong>用于与 Milvus 管理 API 交互</p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">路线图<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>升级过程包括以下步骤：</p>
<ol>
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">保存脉冲星中未消耗的数据。</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">停止 Milvus 并删除脉冲星 V2。</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">启动脉冲星 V3 和 Milvus。</a></p></li>
</ol>
<h2 id="Procedures" class="common-anchor-header">步骤<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>本节提供在 Milvus 中将 Pulsar 从 V2 升级到 V3 的详细步骤。</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">保留 Pulsar 中未消耗的数据</h3><p>在这一步中，需要确保 Pulsar 中的现有数据已持久化到对象存储服务。 有两种方法可供选择，你可以根据自己的需要来选择。</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">方法 1：使用 Attu</h4><p>如果你的工作 Milvus 部署中只有少量的 Collections，且分段不多，你可以使用 Attu 将数据持久化到对象存储服务。</p>
<ol>
<li><p>选择所有数据库中的每个 Collections，进入<code translate="no">Segments</code> 面板，点击<code translate="no">Flush</code> 按钮</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" />
   </span> <span class="img-wrapper"> <span>Collections 的分段面板</span> </span></p></li>
<li><p>然后在弹出窗口中再次点击<code translate="no">Flush</code> 。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" />
   </span> <span class="img-wrapper"> <span>Attu 中的数据刷新提示</span> </span></p></li>
<li><p>然后等到所有 Collections 的持久分段状态都是<code translate="no">Flushed</code> 。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" />
   </span> <span class="img-wrapper"> <span>在 Attu 中查看数据刷新状态</span> </span></p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">方法 2：使用管理 API</h4><ol>
<li><p>将 Milvus 代理的 9091 端口代理到本地主机，以便进行后续操作。</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span> &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>输出。</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>] <span class="hljs-number">8116</span>​
Forwarding <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">9091</span> -&gt; <span class="hljs-number">9091</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>保存 Pid 以备日后清理。</p>
<pre><code translate="no" class="language-yaml">pid=8116​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>触发将所有插入数据从 Pulsar 持久化到 Ojbect 存储的操作。</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>
<p>输出。</p>
<pre><code translate="no" class="language-yaml">{​
<span class="hljs-string">&quot;segmentIDs&quot;</span>: [​
    <span class="hljs-number">454097953998181000</span>,​
    <span class="hljs-number">454097953999383600</span>,​
    <span class="hljs-number">454097953998180800</span>​
]​
}​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>检查刷新的所有段。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>
<p>完成后，你会看到以下输出</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;status&quot;</span>:{},<span class="hljs-string">&quot;flushed&quot;</span>:<span class="hljs-literal">true</span>}​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>停止后台<code translate="no">kubectl port-forward</code> 进程</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-built_in">kill</span> <span class="hljs-variable">$pid</span>​

<button class="copy-code-btn"></button></code></pre>
<p>输出。</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>]  + <span class="hljs-number">8116</span> terminated  kubectl -n <span class="hljs-literal">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span>                      ​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">停止 Milvus 并删除 Pulsar V2</h3><p>在这一步中，需要停止 Milvus pod 并删除 Pulsar V2 部署。 有两个独立的部分可用：</p>
<ul>
<li><p>针对 Milvus Helm 用户</p>
<p>如果您使用 Milvus Helm 图表安装了 Milvus，请转至<a href="#Delete-Pulsar-V2-using-Helm">For Helm User</a>。</p></li>
<li><p>针对 Milvus 操作符用户</p>
<p>如果您使用 Milvus 操作符安装了 Milvus，请转至<a href="#Delete-Pulsar-V2-using-Milvus-Operator">For Milvus Operator User</a>。</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">使用 Helm 删除 Pulsar V2</h4><p>如果您使用 Milvus Helm 图表安装了 Milvus，请按照以下步骤停止 Milvus pod 并删除 Pulsar V2 部署。</p>
<ol>
<li><p>将当前 Milvus 发布值保存到<code translate="no">values.yaml</code> ，以便以后恢复。</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> values my-release -o yaml &gt; values.yaml​
cat values.yaml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用命令停止 Milvus 和所有依赖项。不用担心数据卷，它们将被默认保留。</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> uninstall my-release​

<button class="copy-code-btn"></button></code></pre>
<p>输出</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[<span class="hljs-meta">PersistentVolumeClaim</span>] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>需要清除脉冲星 PVC 和 PV 列表（持久卷索赔和持久卷</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>
<p>输出</p>
<pre><code translate="no" class="language-yaml">Volume Claims:​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​
my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​
Volumes:​
pvc-f590a4de-df31-4ca8-a424-007eac3c619a​
pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​
pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​
pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​
pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>检查<code translate="no">pulsar-pvcs.txt</code> 的 PVC 列表是否都是 Pulsar 的。确认无误后，删除 PVC。</p>
<pre><code translate="no" class="language-bash">cat pulsar-pvcs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>输出。</p>
<pre><code translate="no" class="language-yaml">persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>(可选）根据提供 PVC 的存储类别，您可能还需要手动删除 PV。</p>
<pre><code translate="no" class="language-yaml">cat pulsar-pvs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>如果输出 NotFound 错误也没关系。它已被 kubernetes 控制器删除。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> not found​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">使用 Milvus 操作符删除 Pulsar V2</h4><p>如果使用 Milvus 操作符安装了 Milvus，请按照以下步骤停止 Milvus pod 并删除 Pulsar V2 部署。</p>
<ol>
<li><p>将当前 Milvus Manifest 保存到<code translate="no">milvus.yaml</code> 以备后用。</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release -o yaml &gt; milvus.yaml​
head milvus.yaml -n <span class="hljs-number">20</span>​

<button class="copy-code-btn"></button></code></pre>
<p>输出。</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
annotations:​
    milvus.io/dependency-values-merged: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/pod-service-label-added: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/querynode-current-group-id: <span class="hljs-string">&quot;0&quot;</span>​
creationTimestamp: <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span>​
finalizers:​
- milvus.milvus.io/finalizer​
generation: 3​
labels:​
    app: milvus​
    milvus.io/operator-version: 1.1.2​
name: my-release​
namespace: default​
resourceVersion: <span class="hljs-string">&quot;692217324&quot;</span>​
uid: 7a469ed0-9df1-494e-bd9a-340fac4305b5​
spec:​
components:​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>创建包含以下内容的<code translate="no">patch.yaml</code> 文件。</p>
<pre><code translate="no" class="language-yaml"># a patch to retain etcd &amp; storage data and <span class="hljs-built_in">delete</span> pulsar data while <span class="hljs-built_in">delete</span> milvus​
spec:​
dependencies:​
    etcd:​
    inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    storage:​
    inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    pulsar:​
    inCluster:​
        deletionPolicy: Delete​
        pvcDeletion: <span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用<code translate="no">kubectl patch</code> 保留 etcd 和存储数据，并在删除 milvus 的同时删除脉冲星数据。</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-keyword">default</span> patch milvus my-release --patch-file patch.yaml --<span class="hljs-keyword">type</span>=merge​

<button class="copy-code-btn"></button></code></pre>
<p>输出： 停止 Milvus 并删除脉冲星数据。</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>停止 Milvus 并删除脉冲星 V2。不用担心 etcd 和对象存储数据卷，它们将被默认保留。</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">false</span>​
kubectl -n <span class="hljs-keyword">default</span> get milvus my-release​
kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>
<p>输出结果注意，milvus 优雅停止和操作符删除 pulsar 卷可能需要几分钟时间。</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   <span class="hljs-literal">True</span>      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>
<p>等待命令完成。</p></li>
<li><p>再次检查 Milvus 资源是否已消失</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release​

<button class="copy-code-btn"></button></code></pre>
<p>输出应该如下</p>
<pre><code translate="no" class="language-yaml">No resources found <span class="hljs-keyword">in</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">namespace</span>.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">启动 Pulsar V3 和 Milvus</h3><p>在这一步中，你需要启动 Pulsar V3 和 Milvus pod。 这里有两个独立的部分：</p>
<ul>
<li><p>针对 Helm 用户</p>
<p>如果您使用 Milvus Helm 图表安装了 Milvus，请转至<a href="#For-Helm-User">For Helm User</a>。</p></li>
<li><p>针对 Milvus 操作符用户</p>
<p>如果您已经使用 Milvus 操作符安装了 Milvus，请进入<a href="#For-Milvus-Operator-User">For Milvus Operator 用户</a>。</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">启动 Pulsar V3 并使用 Helm</h4><ol>
<li><p>编辑上一步保存的<code translate="no">values.yaml</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
pulsar:​
enabled: false <span class="hljs-comment"># set to false​</span>
<span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
<span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
pulsarv3:​
enabled: true​
<span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>更新本地 Helm repo</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> zilliztech https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm​</span>
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>
<p>输出</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists <span class="hljs-keyword">with</span> the same configuration, skipping​
<span class="hljs-title class_">Hang</span> tight <span class="hljs-keyword">while</span> we grab the latest <span class="hljs-keyword">from</span> your chart repositories...​
...<span class="hljs-title class_">Successfully</span> got an update <span class="hljs-keyword">from</span> the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
<span class="hljs-title class_">Update</span> <span class="hljs-title class_">Complete</span>. ⎈<span class="hljs-title class_">Happy</span> <span class="hljs-title class_">Helming</span>!⎈​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用编辑后的<code translate="no">values.yaml</code> ，用最新的 Helm 图表版本安装你的 milvus 版本。</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> install my-release zilliztech/milvus --reset-values -f values.<span class="hljs-property">yaml</span>​

<button class="copy-code-btn"></button></code></pre>
<p>输出</p>
<pre><code translate="no" class="language-bash"><span class="hljs-attr">NAME</span>: my-release​
<span class="hljs-variable constant_">LAST</span> <span class="hljs-attr">DEPLOYED</span>: <span class="hljs-title class_">Fri</span> <span class="hljs-title class_">Nov</span> <span class="hljs-number">22</span> <span class="hljs-number">15</span>:<span class="hljs-number">31</span>:<span class="hljs-number">27</span> <span class="hljs-number">2024</span>​
<span class="hljs-attr">NAMESPACE</span>: <span class="hljs-keyword">default</span>​
<span class="hljs-attr">STATUS</span>: deployed​
<span class="hljs-attr">REVISION</span>: <span class="hljs-number">1</span>​
<span class="hljs-variable constant_">TEST</span> <span class="hljs-attr">SUITE</span>: <span class="hljs-title class_">None</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>通过<code translate="no">kubectl -n default get pods</code> 检查 pod 是否都已调度和运行。</p>
<p>所有 pod 启动可能需要几分钟时间。</p>
<p>输出如下。</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-milvus-datanode<span class="hljs-number">-56487b</span>c4bc-s6mbd   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-indexnode<span class="hljs-number">-6476894</span>d6-rv85d   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-mixcoord<span class="hljs-number">-6</span>d8875cb9c<span class="hljs-number">-67f</span>cq   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-proxy<span class="hljs-number">-7b</span>c45d57c5<span class="hljs-number">-2</span>qf8m      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-querynode<span class="hljs-number">-77465747b</span>-kt7f4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-minio<span class="hljs-number">-684f</span>f4f5df-pnc97             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-pulsarv3-bookie<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-2</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie-<span class="hljs-keyword">init</span><span class="hljs-number">-6</span>z4tk         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-broker<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-broker<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-pulsar-<span class="hljs-keyword">init</span>-wvqpc         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-recovery<span class="hljs-number">-0</span>                <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-0</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-1</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-2</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">启动 Pulsar V3 并使用 Milvus 操作符</h4><ol>
<li><p>编辑上一步保存的<code translate="no">milvus.yaml</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
annotations: null <span class="hljs-comment"># this field should be removed or set to null​</span>
resourceVersion: null <span class="hljs-comment"># this field should be removed or set to null​</span>
uid: null <span class="hljs-comment"># this field should be removed or set to null​</span>
spec:​
dependencies:​
    pulsar:​
    inCluster:​
        chartVersion: pulsar-v3​
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        values: null​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>确保您的 Milvus 操作符已升级到 v1.1.2 或更高版本。</p>
<pre><code translate="no" class="language-yaml">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator​</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>​
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>​

<button class="copy-code-btn"></button></code></pre>
<p>使用命令用脉冲星 V3 启动 Milvus</p>
<pre><code translate="no" class="language-yaml">kubectl create -f milvus.yaml​

<button class="copy-code-btn"></button></code></pre>
<p>输出</p>
<pre><code translate="no" class="language-yaml">milvus.milvus.io/my-release created​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>检查 pod，查看是否所有 pod 都已调度并运行<code translate="no">kubectl -n default get pods</code> 。</p>
<p>所有 pod 启动可能需要几分钟时间。</p>
<p>输出如下</p>
<pre><code translate="no" class="language-yaml">NAME                                            READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-milvus-datanode<span class="hljs-number">-57f</span>d59ff58<span class="hljs-number">-5</span>mdrk     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-indexnode<span class="hljs-number">-67867</span>c6b9b<span class="hljs-number">-4</span>wsbw    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-mixcoord<span class="hljs-number">-797849f</span>9bb-sf8z5     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-proxy<span class="hljs-number">-5</span>d5bf98445-c55m6        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-querynode<span class="hljs-number">-0</span><span class="hljs-number">-64797f</span>5c9-lw4rh   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">92</span>s​
my-release-minio<span class="hljs-number">-79476</span>ccb49-zvt2h               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-v8fdj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span><span class="hljs-number">-5l</span>hx7             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p></p>
