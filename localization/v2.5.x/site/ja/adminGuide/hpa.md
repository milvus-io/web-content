---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: Milvusクラスタを動的にスケールするHPA(Horizontal Pod Autoscaling)の設定方法をご紹介します。
title: Milvusの水平ポッドオートスケーリング(HPA)の設定
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Milvusの水平ポッドオートスケーリング(HPA)の設定<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Horizontal Pod Autoscaling (HPA)はKubernetesの機能で、CPUやメモリなどのリソースの使用状況に基づいてデプロイメント内のPodの数を自動的に調整します。Milvusでは、<code translate="no">proxy</code>,<code translate="no">queryNode</code>,<code translate="no">dataNode</code>,<code translate="no">indexNode</code> のようなステートレスコンポーネントにHPAを適用することで、ワークロードの変化に応じてクラスタを動的にスケールさせることができます。</p>
<p>このガイドでは、Milvus Operatorを使用してMilvusコンポーネントにHPAを設定する方法を説明します。</p>
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
<li>Milvus Operatorを使用してデプロイされた稼働中のMilvusクラスタ。</li>
<li>Kubernetesリソースを管理するための<code translate="no">kubectl</code> へのアクセス。</li>
<li>MilvusアーキテクチャとKubernetes HPAに精通していること。</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Milvus Operatorを使用したHPAの設定<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operatorで管理するMilvusクラスタでHPAを有効にするには、以下の手順に従います：</p>
<ol>
<li><p><strong>Replicasを-1に設定</strong>します：</p>
<p>Milvusカスタムリソース(CR)で、HPAでスケーリングしたいコンポーネントの<code translate="no">replicas</code> フィールドを<code translate="no">-1</code> に設定します。こ れに よ り 、 オペレー タ ではなく HPA にスケー リ ン グ制御が委譲 さ れます。CR を直接編集す る か、 以下の<code translate="no">kubectl patch</code> コ マ ン ド を使用す る こ と で、 HPA コ ン ト ロ ー ルへ迅速に切 り 替え る こ と がで き ます：</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">&lt;your-release-name&gt;</code> をMilvusクラスタ名に置き換えてください。</p>
<p>変更が適用されたことを確認するには、次のコマンドを実行します：</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">-1</code> <code translate="no">proxy</code> コ ン ポーネ ン ト が HPA 制御下にあ る こ と を確認で き ます。</p>
<p>または、CR YAMLで定義することもできます：</p>
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
<li><p><strong>HPAリソースを定義</strong>します：</p>
<p>HPA リソースを定義: 目的のコンポーネントのデプロイメントをターゲットとする HPA リソースを作成します。以下は<code translate="no">proxy</code> コンポーネントの例です：</p>
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
<p><code translate="no">metadata.name</code> および<code translate="no">spec.scaleTargetRef.name</code> の<code translate="no">my-release</code> を、実際の Milvus クラスタ名 (例:<code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> および<code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>) に置き換えてください。</p></li>
<li><p><strong>HPA構成を適用</strong>します：</p>
<p>以下のコマンドを使用してHPAリソースをデプロイします：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>HPAが正常に作成されたことを確認するには、以下のコマンドを実行します：</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>の よ う な出力が表示 さ れ る はずです：</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">NAME</code> および<code translate="no">REFERENCE</code> フィールドには、 クラスタ名が反映されます(例:<code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> および<code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>)。</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>:スケーリングする配置を指定します(たとえば、<code translate="no">my-release-milvus-proxy</code>)。</li>
<li><code translate="no">minReplicas</code> および : スケーリング範囲を設定します（この例では 2～10 Pods）。<code translate="no">maxReplicas</code></li>
<li><code translate="no">metrics</code>:CPU とメモリの使用率に基づいてスケーリングを設定し、平均使用率 60% を目標にします。</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPAを利用することで、Milvusは様々なワークロードに効率的に適応することができます。<code translate="no">kubectl patch</code> コマンドを使用することで、CR全体を手動で編集することなく、コンポーネントを素早くHPA制御に切り替えることができます。詳細については、<a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">Kubernetes HPAのドキュメントを</a>参照してください。</p>
