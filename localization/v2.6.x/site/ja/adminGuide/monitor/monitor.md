---
id: monitor.md
title: 監視サービスの展開
related_key: 'monitor, alert'
summary: Prometheusを使用してMilvusクラスタに監視サービスをデプロイする方法を説明します。
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Kubernetes上でのモニタリングサービスのデプロイ<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Prometheusを使用してKubernetes上のMilvusクラスタに監視サービスをデプロイする方法について説明します。</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Prometheusでメトリクスを監視する<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>メトリクスは、システムの実行状態に関する情報を提供する指標です。例えば、メトリクスを使用すると、Milvusのデータノードで消費されるメモリやCPUリソースの量を把握できます。Milvusクラスタ内のコンポーネントのパフォーマンスとステータスを把握することで、十分な情報を得ることができるため、より適切な意思決定を行い、よりタイムリーにリソースの割り当てを調整することができます。</p>
<p>一般的に、メトリクスは<a href="https://prometheus.io/">Prometheusの</a>ような時系列データベース(TSDB)に保存され、タイムスタンプとともに記録されます。Milvusのサービスを監視する場合、Prometheusを使用して、エクスポーターが設定したエンドポイントからデータを引き出すことができます。その後、Prometheusは各Milvusコンポーネントのメトリクスを<code translate="no">http://&lt;component-host&gt;:9091/metrics</code> 。</p>
<p>しかし、1つのコンポーネントに対して複数のレプリカが存在する場合があり、Prometheusの手動設定が複雑になりすぎます。そこで、Kubernetesの拡張機能である<a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operatorを</a>使用することで、Prometheusモニタリングインスタンスを自動化し、効率的に管理することができます。Prometheus Operatorを使用すると、メトリックターゲットとサービスプロバイダーを手動で追加する手間が省けます。</p>
<p>ServiceMonitorカスタムリソース定義（CRD）を使用すると、動的なサービスセットを監視する方法を宣言的に定義できます。また、ラベル選択を使用して、必要な構成で監視するサービスを選択できます。Prometheus Operatorを使用すると、メトリクスを公開する方法を指定する規約を導入できます。新しいサービスは、手動で再設定することなく、設定した規約に従って自動的に検出されます。</p>
<p>次の図は、Prometheusのワークフローを表しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Prometheus_architecture</span> </span></p>
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
    </button></h2><p>このチュートリアルでは、<a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheusを</a>使用して、各監視およびアラートコンポーネントのインストールと手動設定の手間を省きます。</p>
<p>Kube-prometheusは、Kubernetesマニフェスト、<a href="http://grafana.com/">Grafana</a>ダッシュボード、およびドキュメントとスクリプトを組み合わせた<a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheusルールを</a>収集します。</p>
<p>監視サービスをデプロイする前に、kube-prometheus manifestsディレクトリ内の設定を使用して監視スタックを作成する必要があります。</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kube-prometheus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply --server-side -f manifests/setup</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f manifests/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
デフォルトのprometheus-k8s clusterroleではmilvusのメトリクスを取得できないため、パッチを適用する必要があります：</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>スタックを削除するには、<code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> を実行します。</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Kubernetesに監視サービスをデプロイする<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1.ダッシュボードにアクセスする</h3><p>Prometheus サービスをポート<code translate="no">9090</code> に、Grafana サービスをポート<code translate="no">3000</code> に転送する。</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2.ServiceMonitorを有効にする</h3><p>Milvus Helmでは、デフォルトではServiceMonitorは有効になっていません。KubernetesクラスタにPrometheus Operatorをインストールした後、パラメータ<code translate="no">metrics.serviceMonitor.enabled=true</code> を追加することで有効にできます。</p>
<h4 id="With-Helm" class="common-anchor-header">Helmの場合</h4><p>Milvus Helm chartをインストールしている場合、以下のようにパラメータ<code translate="no">metrics.serviceMonitor.enabled=true</code> を設定することでServiceMonitorを有効にすることができます。</p>
<pre><code translate="no">```
$ helm upgrade my-release milvus/milvus --set metrics.serviceMonitor.enabled=true --reuse-values
```
</code></pre>
<p>インストールが完了したら、<code translate="no">kubectl</code> を使用して ServiceMonitor リソースを確認します。</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Milvus Operatorの場合</h4><p>Milvus Operatorを使用してMilvusをインストールした場合、以下の手順でServiceMonitorを有効にすることができます。</p>
<ol>
<li><p>以下のコマンドを実行し、Milvusカスタムリソースを編集します。以下のコマンドは、カスタムリソースの名前が<code translate="no">my-release</code> であると仮定しています。</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">spec.components.disableMetrics</code> フィールドを<code translate="no">false</code> に編集する。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetrics:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>保存してエディタを終了します。</p></li>
<li><p>オペレータが変更を照合するのを待つ。以下のコマンドを実行することで、Milvusカスタムリソースのステータスを確認することができます。</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> milvus my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span> <span class="hljs-operator">-</span>o yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p><code translate="no">status.components.metrics.serviceMonitor.enabled</code> フィールドを<code translate="no">true</code> にする。</p>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3.メトリクスの確認</h3><p>ServiceMonitor を有効にした後、<code translate="no">http://localhost:9090/</code> から Prometheus ダッシュボードにアクセスできます。</p>
<p><code translate="no">Status</code> タブをクリックし、次に<code translate="no">Targets</code> をクリックする。Milvusコンポーネントのターゲットが表示されます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" />
   </span> <span class="img-wrapper"> <span>Prometheus_targets</span> </span></p>
<p><code translate="no">Graph</code> タブをクリックし、式入力ボックスに式<code translate="no">up{job=&quot;default/my-release&quot;}</code> を入力します。Milvusコンポーネントのメトリクスが表示されます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" />
   </span> <span class="img-wrapper"> <span>Prometheus_graph</span> </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4.ServiceMonitorを確認する</h3><pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
<span class="hljs-keyword">my</span>-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvusクラスタにモニタリングサービスをデプロイしている場合、次の学習もお勧めします：<ul>
<li><a href="/docs/ja/visualize.md">GrafanaでMilvusメトリクスを可視化する</a></li>
<li><a href="/docs/ja/alert.md">Milvusサービスのアラートを作成する</a></li>
<li><a href="/docs/ja/allocate.md">リソース割り当ての</a>調整</li>
</ul></li>
<li>Milvusクラスタのスケール方法に関する情報をお探しの場合は、以下をご覧ください：<ul>
<li><a href="/docs/ja/scaleout.md">Milvusクラスタのスケールについて</a>学ぶ</li>
</ul></li>
<li>Milvusのバージョンアップに興味がある場合、<ul>
<li><a href="/docs/ja/upgrade_milvus_cluster-operator.md">Milvusクラスタのアップグレードガイド</a>および<a href="/docs/ja/upgrade_milvus_standalone-operator.md">Milvusスタンドアロンのアップグレードガイドを</a>お読みください。</li>
</ul></li>
</ul>
