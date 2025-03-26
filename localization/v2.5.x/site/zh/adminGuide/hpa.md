---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: 了解如何配置水平 Pod 自动扩展（HPA），以动态扩展 Milvus 集群。
title: 为 Milvus 配置水平 Pod 自动扩展 (HPA)
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">为 Milvus 配置水平 Pod 自动扩展 (HPA)<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>水平 Pod 自动扩展（HPA）是 Kubernetes 的一项功能，可根据 CPU 或内存等资源利用率自动调整部署中 Pod 的数量。在 Milvus 中，HPA 可应用于<code translate="no">proxy</code>,<code translate="no">queryNode</code>,<code translate="no">dataNode</code> 和<code translate="no">indexNode</code> 等无状态组件，以根据工作负载变化动态扩展集群。</p>
<p>本指南介绍如何使用 Milvus 操作符为 Milvus 组件配置 HPA。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>使用 Milvus Operator 部署的运行中的 Milvus 群集。</li>
<li>访问<code translate="no">kubectl</code> 以管理 Kubernetes 资源。</li>
<li>熟悉 Milvus 架构和 Kubernetes HPA。</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 配置 HPA<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>要在由 Milvus Operator 管理的 Milvus 集群中启用 HPA，请按照以下步骤操作：</p>
<ol>
<li><p><strong>将副本设置为 -1</strong>：</p>
<p>在 Milvus 自定义资源 (CR) 中，将希望使用 HPA 进行缩放的组件的<code translate="no">replicas</code> 字段设置为<code translate="no">-1</code> 。这将缩放控制权委托给 HPA，而不是操作符。您可以直接编辑 CR 或使用以下<code translate="no">kubectl patch</code> 命令快速切换到 HPA 控制：</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>将<code translate="no">&lt;your-release-name&gt;</code> 替换为您的 Milvus 集群名称。</p>
<p>要验证更改是否已应用，请运行：</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>预期输出应为<code translate="no">-1</code> ，确认<code translate="no">proxy</code> 组件现在处于 HPA 控制之下。</p>
<p>或者，您也可以在 CR YAML 中定义它：</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: &lt;your-release-name&gt;
spec:
  mode: cluster
  components:
    proxy:
      replicas: -1
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>定义 HPA 资源</strong>：</p>
<p>创建 HPA 资源，以部署所需的组件。下面是<code translate="no">proxy</code> 组件的示例：</p>
<pre><code translate="no" class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-release-milvus-proxy-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-release-milvus-proxy
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: cpu
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: memory
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 60
<button class="copy-code-btn"></button></code></pre>
<p>将<code translate="no">metadata.name</code> 和<code translate="no">spec.scaleTargetRef.name</code> 中的<code translate="no">my-release</code> 替换为实际的 Milvus 群集名称（如<code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> 和<code translate="no">&lt;your-release-name&gt;-milvus-proxy</code> ）。</p></li>
<li><p><strong>应用 HPA 配置</strong>：</p>
<p>使用以下命令部署 HPA 资源：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>要验证 HPA 是否已成功创建，请运行以下命令：</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>您应该会看到类似的输出：</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">NAME</code> 和<code translate="no">REFERENCE</code> 字段将反映群集名称（如<code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> 和<code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code> ）。</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>:指定要缩放的部署（如<code translate="no">my-release-milvus-proxy</code> ）。</li>
<li><code translate="no">minReplicas</code> 和 : 设置扩展范围（本例中为 2 至 10 个 Pod）。<code translate="no">maxReplicas</code></li>
<li><code translate="no">metrics</code>:配置基于 CPU 和内存利用率的缩放，目标是 60% 的平均使用率。</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">结论<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA 允许 Milvus 有效适应不同的工作负载。通过使用<code translate="no">kubectl patch</code> 命令，你可以快速将一个组件切换到 HPA 控制，而无需手动编辑完整的 CR。更多详情，请参阅<a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">Kubernetes HPA 文档</a>。</p>
