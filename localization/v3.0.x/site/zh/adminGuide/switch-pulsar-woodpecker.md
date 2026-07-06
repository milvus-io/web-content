---
id: switch-pulsar-woodpecker.md
title: 在 Pulsar 和 Woodpecker 之间切换
summary: 使用 Helm 或 Milvus Operator，将 Milvus 集群的消息队列在 Pulsar 和 Woodpecker 之间切换。
---
<h1 id="Switch-between-Pulsar-and-Woodpecker" class="common-anchor-header">在 Pulsar 和 Woodpecker 之间切换<button data-href="#Switch-between-Pulsar-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面介绍如何在<strong>Milvus 集群中</strong>双向切换消息队列（MQ）的类型，可在<strong>Pulsar</strong>（内置或外部）和<strong>Woodpecker</strong>（MinIO 后端）之间进行切换。有关一般工作流和先决条件，请参阅《<a href="/docs/zh/switch-mq-type.md">切换 MQ 类型》</a>。</p>
<div class="alert note">
<p><strong>先决条件：</strong>MQ 切换功能仅在<strong>Milvus 3.0 及更高版本中</strong>提供。开始操作前，请将您的 Milvus 实例升级至 Milvus 3.0 或更高版本——此功能在早期版本中不可用。</p>
</div>
<div class="alert warning">
<p>切换消息队列是一项<strong>高风险操作</strong>。请选择<strong>与您的</strong>部署方式相匹配的章节<strong>——使用 Helm</strong> <strong>或使用 Milvus Operator</strong>——并按顺序从上到下操作。请勿混合使用 Helm 和 Operator 命令。</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">使用 Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Helm" class="common-anchor-header">从 Pulsar 切换到 Woodpecker（Helm）<button data-href="#Switch-from-Pulsar-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步骤 1：验证 Milvus 实例是否正在运行。</strong>确保您的 Milvus 集群运行正常——例如，通过创建测试 Collection、插入数据并执行查询来验证。</p>
<p><strong>步骤 2：执行消息队列切换。</strong>暴露 MixCoord 管理接口，然后调用切换 API：</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>在另一个终端中：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步骤 3：验证切换是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切换成功时会记录<code translate="no">[mqTypeValue=woodpecker]</code> 。</p>
<p><strong>步骤 4：（可选）停止 Pulsar 并进行清理。</strong>对于<strong>内置</strong>Pulsar，请禁用 Pulsar 并启用 Woodpecker，然后删除 Pulsar 的 PVC：</p>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p><strong>对于外部</strong>Pulsar，请清理外部 Pulsar 实例中的 Milvus 主题。Milvus 主题遵循格式<code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> （例如，<code translate="no">by-dev-rootcoord-dml_10_464633776992639586v0</code> ）。</p>
<div class="alert note">
<p>如果您计划稍后切换回 Pulsar，请先清理数据/主题，以避免冲突。由于 Helm 图表的限制，目前无法切换回<strong>内置的</strong>Pulsar 实例。</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Helm" class="common-anchor-header">从 Woodpecker 切换到 Pulsar（Helm）<button data-href="#Switch-from-Woodpecker-to-Pulsar-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步骤 1：验证 Milvus 实例是否正在运行。</strong></p>
<p><strong>步骤 2：配置目标 Pulsar 连接并重启 Milvus。</strong>切换操作需要 Milvus 已知晓 Pulsar 连接信息，因此请通过<code translate="no">extraConfigFiles</code> 将配置写入<code translate="no">user.yaml</code> ，并使用<code translate="no">helm upgrade</code> 应用配置（该命令会滚动更新 Pod）。<code translate="no">streaming.enabled=true</code> 是 Switch MQ 功能的必备条件。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: &lt;pulsar addr&gt;
      port: &lt;pulsar port, e.g. 6650&gt;
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>等待所有 Pod 准备就绪，然后确认 Pulsar 访问配置已渲染到 Milvus 配置中。</p>
<p><strong>步骤 3：执行 MQ 切换。</strong></p>
<div class="alert note">
<p>确保目标 Pulsar 中不包含来自先前配置的 Milvus 主题。如果这是您首次切换到 Pulsar，请跳过此说明；否则，请先清理同名的残留 Milvus 主题。</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>在另一个终端中：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步骤 4：验证切换是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切换成功时会记录日志：<code translate="no">[mqTypeValue=pulsar]</code> 。</p>
<p><strong>步骤 5：（可选）清理 Woodpecker 数据。</strong>删除 MinIO/S3 上的 Woodpecker 数据（位于<code translate="no">&lt;rootPath&gt;/wp/...</code> 目录下，通常为<code translate="no">files/wp/...</code> ）以及 etcd 中的 Woodpecker 元数据（<code translate="no">etcdctl get woodpecker --prefix</code> ）。如果您计划日后切换回 Woodpecker，请先清理这些文件。</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="common-anchor-header">从 Pulsar 切换到 Woodpecker（Milvus Operator）<button data-href="#Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步骤 1：验证 Milvus 实例是否正在运行。</strong></p>
<p><strong>步骤 2：执行 MQ 切换。</strong>由于 MixCoord 服务未对外暴露，因此需在 MixCoord pod 内部运行切换 API：</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步骤 3：验证切换是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切换成功时会记录日志：<code translate="no">[mqTypeValue=woodpecker]</code> 。</p>
<p><strong>步骤 4：更新 Operator 中的 MQ 类型。</strong>更新<strong>Operator</strong>管理的配置，以防止 Operator 撤销此次切换。创建<code translate="no">change_configmap.yaml</code> ：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>步骤 5：（可选）停止 Pulsar 并进行清理。</strong>对于<strong>内置</strong>Pulsar，请卸载 Pulsar 发布版本并删除其 PVC：</p>
<pre><code translate="no" class="language-shell">helm uninstall my-release-pulsar
kubectl get pvc | grep my-release-pulsar
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>对于<strong>外部</strong>Pulsar，请清理 Milvus 主题（格式为<code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> ）。</p>
<div class="alert note">
<p>如果您计划稍后切换回 Pulsar，请先清理数据/主题以避免冲突。由于 Helm 图表的限制，目前无法切换回<strong>内置的</strong>Pulsar 实例。</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="common-anchor-header">从 Woodpecker 切换到 Pulsar（Milvus Operator）<button data-href="#Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步骤 1：验证 Milvus 实例是否正在运行。</strong></p>
<p><strong>步骤 2：配置目标 Pulsar 连接并重启 Milvus。</strong>将 Pulsar 连接配置放置在<code translate="no">spec.config</code> 下（操作符会将<code translate="no">spec.config</code> 渲染为<code translate="no">user.yaml</code> ），并设置 MQ 类型；应用 CR 后，Pod 将根据新配置自动重启。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">addr&gt;</span>
      <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">port,</span> <span class="hljs-string">e.g.</span> <span class="hljs-number">6650</span><span class="hljs-string">&gt;
  dependencies:
    msgStreamType: pulsar
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>等待所有 Pod 准备就绪，然后确认 Pulsar 访问配置已渲染到 Milvus 配置中。</p>
<p><strong>步骤 3：执行 MQ 切换。</strong></p>
<div class="alert note">
<p>确保目标 Pulsar 中不包含来自先前配置的 Milvus 主题。如果这是您首次切换到 Pulsar，请跳过此说明；否则，请先清理同名的残留 Milvus 主题。</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步骤 4：验证切换是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切换成功时会记录日志：<code translate="no">[mqTypeValue=pulsar]</code> 。</p>
<p><strong>步骤 5：（可选）清理 Woodpecker 数据。</strong>删除 MinIO/S3 上的 Woodpecker 数据（位于<code translate="no">&lt;rootPath&gt;/wp/...</code> 目录下，通常为<code translate="no">files/wp/...</code> ）以及 etcd 中的 Woodpecker 元数据（<code translate="no">etcdctl get woodpecker --prefix</code> ）。如果您计划日后切换回 Woodpecker，请先清理这些文件。</p>
<h2 id="Supported-scenarios" class="common-anchor-header">支持的场景<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>源 MQ</th><th>目标 MQ</th><th>Helm</th><th>Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>内置 Pulsar</td><td>Woodpecker（MinIO）</td><td><strong>已支持</strong></td><td><strong>受支持</strong></td></tr>
<tr><td>外部 Pulsar</td><td>Woodpecker（MinIO）</td><td><strong>已支持</strong></td><td><strong>已支持</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>外部 Pulsar</td><td><strong>已支持</strong></td><td><strong>已支持</strong></td></tr>
<tr><td>Pulsar</td><td>Woodpecker（本地）</td><td><strong>支持但不推荐</strong>（所有 pod 都需要共享文件系统）</td><td><strong>不支持</strong></td></tr>
</tbody>
</table>
