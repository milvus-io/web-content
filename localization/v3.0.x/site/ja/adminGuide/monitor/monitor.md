---
id: monitor.md
title: 監視サービスの導入
related_key: 'monitor, alert'
summary: Prometheus を使用して Milvus クラスタの監視サービスをデプロイする方法について学びましょう。
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Kubernetes へのモニタリングサービスのデプロイ<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Prometheus を使用して Kubernetes 上の Milvus クラスター向けに監視サービスをデプロイする方法について説明します。</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Prometheus によるメトリクスの監視<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>メトリクスとは、システムの実行状況に関する情報を提供する指標のことです。例えば、メトリクスを使用することで、Milvus内のデータノードがどれだけのメモリやCPUリソースを消費しているかを把握できます。Milvusクラスタ内のコンポーネントのパフォーマンスや状態を把握しておくことで、十分な情報を得ることができ、その結果、より適切な意思決定を行い、リソースの割り当てをよりタイムリーに調整できるようになります。</p>
<p>一般的に、メトリ<a href="https://prometheus.io/">クスはPrometheusのような</a>時系列データベース（TSDB）に保存され、タイムスタンプ付きで記録されます。Milvusサービスの監視の場合、Prometheusを使用してエクスポーターによって設定されたエンドポイントからデータを取得できます。その後、Prometheusは各Milvusコンポーネントのメトリクスを<code translate="no">http://&lt;component-host&gt;:9091/metrics</code> にエクスポートします。</p>
<p>ただし、1つのコンポーネントに対して複数のレプリカが存在する場合があり、その場合はPrometheusの手動設定が複雑になりすぎます。そのため、Kubernetesの拡張機能<a href="https://github.com/prometheus-operator/prometheus-operator">であるPrometheus Operator</a>を使用することで、Prometheusモニタリングインスタンスを自動的かつ効率的に管理できます。Prometheus Operatorを使用することで、メトリックターゲットやサービスプロバイダーを手動で追加する手間を省くことができます。</p>
<p>ServiceMonitor カスタムリソース定義（CRD）を使用すると、動的なサービスセットの監視方法を宣言的に定義できます。また、ラベル選択機能を使用して、希望する設定で監視するサービスを選択することも可能です。Prometheus Operator を使用すれば、メトリクスの公開方法を規定する規約を導入できます。 設定した規約に従って、手動での再設定を必要とせずに、新しいサービスを自動的に検出できます。</p>
<p>次の図は、Prometheusのワークフローを示しています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>このチュートリアルでは、<a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a>を使用することで、各監視およびアラートコンポーネントを個別にインストールしたり手動で設定したりする手間を省きます。</p>
<p>kube-prometheus は、Kubernetes マニフェスト、<a href="http://grafana.com/">Grafana</a>ダッシュボード、<a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus ルール</a>、およびドキュメントやスクリプトをまとめて収集します。</p>
<p>モニタリングサービスをデプロイする前に、kube-prometheus の manifests ディレクトリにある設定を使用して、モニタリングスタックを作成する必要があります。</p>
<p>以下のコマンドでは、Kubernetes 1.35、1.36、および 1.37 をサポートする kube-prometheus の `<code translate="no">release-0.19</code> ` ブランチを使用しています。お使いの Kubernetes バージョンに適したブランチを選択するには、<a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">kube-prometheus の互換性マトリックスを</a>参照してください。</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
デフォルトの `prometheus-k8s` クラスタロールでは Milvus のメトリクスを取得できないため、パッチを適用する必要があります:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>スタックを削除するには、<code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> を実行します。</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Kubernetes へのモニタリングサービスのデプロイ<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. ダッシュボードにアクセスする<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus サービスをポート<code translate="no">9090</code> に、Grafana サービスをポート<code translate="no">3000</code> に転送します。</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. ServiceMonitorを有効にする<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Helm では、デフォルトで ServiceMonitor は有効になっていません。Kubernetes クラスターに Prometheus Operator をインストールした後、パラメータ<code translate="no">metrics.serviceMonitor.enabled=true</code> を追加することで有効にできます。</p>
<h4 id="With-Helm" class="common-anchor-header">Helm を使用する場合</h4><p>Milvus Helm チャートをインストールしている場合、次のように `<code translate="no">metrics.serviceMonitor.enabled=true</code> ` パラメータを設定することで ServiceMonitor を有効にできます。</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>このコマンドでは `<code translate="no">--reset-then-reuse-values</code>` を使用しますが、これには Helm 3.14 以降が必要です。このオプションを指定すると、Helm は `<code translate="no">--version</code>` で設定されたチャートバージョンのデフォルト値にリセットし、現在のリリースの値を適用した後、`<code translate="no">--set</code>` の値を適用します。`<code translate="no">&lt;current-chart-version&gt;</code>` を確認するには、<code translate="no">helm list</code> を実行し、`<code translate="no">CHART</code> ` 列の値から `<code translate="no">milvus-</code> ` というプレフィックスを削除してください。<code translate="no">helm upgrade</code> を、<code translate="no">-f</code> または<code translate="no">--set</code> を指定して実行し、<code translate="no">--reset-then-reuse-values</code> または<code translate="no">--reuse-values</code> を指定しない場合、Helmはインストール時に設定した値を保持しません。</p>
</div>
<p>インストールが完了したら、<code translate="no">kubectl</code> を使用して ServiceMonitor リソースを確認してください。</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Milvus Operator を使用する場合</h4><p>Milvus Operator を使用して Milvus をインストールした場合、Operator は ServiceMonitor の代わりに PodMonitor を作成します。PodMonitor の名前は、Milvus カスタムリソースと同じになります。 オペレーターは、カスタムリソースでメトリクスが無効化されておらず、かつクラスター内に PodMonitor CRD が存在する場合にのみ、これを生成します。kube-prometheus の<code translate="no">manifests/setup</code> ディレクトリには、この CRD がインストールされています。メトリクスが有効になっていることを確認するには、次のように操作してください。</p>
<ol>
<li><p>次のコマンドを実行して、Milvus カスタムリソースを編集します。以下のコマンドは、カスタムリソースの名前が `<code translate="no">my-release</code>` であることを前提としています。</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">spec.components.disableMetric</code> フィールドを<code translate="no">false</code> に変更します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>エディタを保存して終了します。</p></li>
<li><p>オペレーターによる変更の反映を待ちます。次のコマンドを実行して、PodMonitor を確認できます。</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. メトリクスの確認<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor または PodMonitor を有効にした後、<code translate="no">http://localhost:9090/</code> から Prometheus ダッシュボードにアクセスできます。</p>
<p>「<code translate="no">Status</code> 」タブをクリックし、次に「<code translate="no">Targets</code> 」をクリックします。Milvus コンポーネントのターゲットが表示されるはずです。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>「<code translate="no">Graph</code> 」タブをクリックし、式入力ボックスに「<code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> 」と入力します。Milvusコンポーネントのメトリクスが表示されるはずです。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. ServiceMonitorの確認<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Helm を使用して Milvus をインストールした場合は、次のコマンドを実行して ServiceMonitor を一覧表示します。このチャートでは、Milvus クラスタの場合は<code translate="no">my-release-milvus</code> 、Milvus スタンドアロンの場合は<code translate="no">my-release-milvus-standalone</code> という名前が付けられています。</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
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
<li>Milvusクラスタの監視サービスをデプロイした場合は、以下の操作についても学ぶとよいでしょう：
<ul>
<li><a href="/docs/ja/visualize.md">Grafana で Milvus メトリクスを可視化する</a></li>
<li><a href="/docs/ja/alert.md">Milvus サービス向けのアラートを作成する</a></li>
<li><a href="/docs/ja/allocate.md">リソース割り当て</a>の調整</li>
</ul></li>
<li>Milvusクラスタのスケーリング方法に関する情報をお探しの場合は：
<ul>
<li><a href="/docs/ja/scaleout.md">Milvusクラスタのスケーリング方法について</a>学ぶ</li>
</ul></li>
<li>Milvusのバージョンアップに関心がある場合は、
<ul>
<li><a href="/docs/ja/upgrade_milvus_cluster-operator.md">Milvusクラスタのアップグレードガイド</a>および<a href="/docs/ja/upgrade_milvus_standalone-operator.md">Milvusスタンドアロンのアップグレードガイド</a>をご覧ください。</li>
</ul></li>
</ul>
