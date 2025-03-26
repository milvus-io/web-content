---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: 學習如何設定水平 Pod 自動擴充 (HPA)，以動態擴充 Milvus 集群。
title: 為 Milvus 設定水平 Pod 自動擴充 (HPA)
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">為 Milvus 設定水平 Pod 自動擴充 (HPA)<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Horizontal Pod Autoscaling (HPA) 是 Kubernetes 的一項功能，可根據 CPU 或記憶體等資源使用率，自動調整部署中 Pod 的數量。在 Milvus 中，HPA 可應用於無狀態元件，例如<code translate="no">proxy</code>,<code translate="no">queryNode</code>,<code translate="no">dataNode</code>, 和<code translate="no">indexNode</code> ，以根據工作負載的變化動態擴充群集。</p>
<p>本指南說明如何使用 Milvus Operator 為 Milvus 元件配置 HPA。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>使用 Milvus Operator 部署的運行中的 Milvus 群集。</li>
<li>存取<code translate="no">kubectl</code> 以管理 Kubernetes 資源。</li>
<li>熟悉 Milvus 架構和 Kubernetes HPA。</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 設定 HPA<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus Operator 管理的 Milvus 集群中啟用 HPA，請遵循以下步驟：</p>
<ol>
<li><p><strong>將 Replicas 設為 -1</strong>：</p>
<p>在 Milvus 自訂資源 (CR) 中，針對要使用 HPA 擴充的元件，將<code translate="no">replicas</code> 欄位設定為<code translate="no">-1</code> 。這將縮放控制權下放到 HPA，而不是操作員。您可以直接編輯 CR 或使用下列<code translate="no">kubectl patch</code> 指令快速切換到 HPA 控制：</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>將<code translate="no">&lt;your-release-name&gt;</code> 改為您的 Milvus 集群名稱。</p>
<p>要驗證是否已套用變更，請執行：</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>預期的輸出應該是<code translate="no">-1</code> ，確認<code translate="no">proxy</code> 元件現在在 HPA 控制之下。</p>
<p>或者，您可以在 CR YAML 中定義：</p>
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
<li><p><strong>定義 HPA 資源</strong>：</p>
<p>建立 HPA 資源以針對所需元件的部署。以下是<code translate="no">proxy</code> 元件的範例：</p>
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
<p>將<code translate="no">metadata.name</code> 和<code translate="no">spec.scaleTargetRef.name</code> 中的<code translate="no">my-release</code> 改為您實際的 Milvus 群集名稱（例如，<code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> 和<code translate="no">&lt;your-release-name&gt;-milvus-proxy</code> ）。</p></li>
<li><p><strong>套用 HPA 配置</strong>：</p>
<p>使用下列指令部署 HPA 資源：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>要驗證 HPA 已成功建立，請執行：</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>您應該會看到類似的輸出：</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">NAME</code> 和<code translate="no">REFERENCE</code> 欄位會反映您的群集名稱 (例如：<code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> 和<code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>)。</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>:指定要縮放的部署 (例如：<code translate="no">my-release-milvus-proxy</code>)。</li>
<li><code translate="no">minReplicas</code> 和 : 設定縮放範圍 (本範例中為 2 到 10 Pods )。<code translate="no">maxReplicas</code></li>
<li><code translate="no">metrics</code>:設定基於 CPU 和記憶體使用率的擴充，目標是 60% 的平均使用率。</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">總結<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA 允許 Milvus 有效地適應不同的工作負載。透過使用<code translate="no">kubectl patch</code> 指令，您可以快速將元件切換為 HPA 控制，而無須手動編輯完整的 CR。如需詳細資訊，請參閱<a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">Kubernetes HPA 文件</a>。</p>
