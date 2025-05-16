---
id: monitor_overview.md
title: モニターの概要
related_key: 'monitor, alert'
summary: PrometheusとGrafanaがMilvusでどのようにモニタリングとアラートサービスに使用されているかをご紹介します。
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Milvusモニタリングフレームワークの概要<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、MilvusがPrometheusを使用してメトリクスを監視し、Grafanaを使用してメトリクスを可視化してアラートを作成する方法について説明します。</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">MilvusにおけるPrometheus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheusは</a>、Kubernetes実装のためのオープンソースの監視およびアラートツールキットです。メトリクスを時系列データとして収集・保存します。つまり、メトリクスは記録時にタイムスタンプとともに、ラベルと呼ばれるオプションのキーと値のペアで保存されます。</p>
<p>現在、MilvusはPrometheusの以下のコンポーネントを使用しています：</p>
<ul>
<li>Prometheusエンドポイント：エクスポーターが設定したエンドポイントからデータを取り出します。</li>
<li>Prometheus監視インスタンスを効率的に管理するPrometheusオペレータ。</li>
<li>Kube-prometheus: Kubernetesクラスタの監視をエンドツーエンドで簡単に操作できます。</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">メトリック名</h3><p>Prometheusで有効なメトリック名は、namespace、subsystem、nameの3つの要素を含んでいます。これら3つの要素は&quot;_&quot;で結ばれています。</p>
<p>Prometheusが監視するMilvusメトリックの名前空間は &quot;milvus &quot;です。メトリックが属する役割に応じて、そのサブシステムは次の8つの役割のうちの1つでなければなりません：&quot;rootcoord&quot;、&quot;proxy&quot;、&quot;querycoord&quot;、&quot;querynode&quot;、&quot;indexcoord&quot;、&quot;indexnode&quot;、&quot;datacoord&quot;、&quot;datanode&quot;。</p>
<p>例えば、クエリされたベクトルの総数を計算するMilvusメトリックの名前は<code translate="no">milvus_proxy_search_vectors_count</code> 。</p>
<h3 id="Metric-types" class="common-anchor-header">メトリックの種類</h3><p>Prometheus は、4 種類のメトリックをサポートしています：</p>
<ul>
<li>カウンタ： 累積メトリクスの一種で、値が増加するか、再起動時にゼロにリセットされます。</li>
<li>Gauge ： メ ト リ ッ ク の タ イ プで、 値が上向 く こ と も 下向 く こ と も で き ます。</li>
<li>ヒストグラム：構成可能なバケットに基づいてカウントされるメトリクスのタイプ。一般的な例は、リクエストの持続時間です。</li>
<li>サマリー（Summary）： ヒストグラムに似たメトリクスの一種で、スライディングする時間ウィンドウにわたって構成可能な分量を計算します。</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">メトリクス・ラベル</h3><p>プロメテウスは、同じメトリック名のサンプルにラベルを付けて区別します。ラベルはメトリックの特定の属性です。同じ名前のメトリクスは、<code translate="no">variable_labels</code> フィールドに同じ値を持つ必要があります。次の表は、Milvus メトリクスの一般的なラベルの名前と意味です。</p>
<table>
<thead>
<tr><th>ラベル名</th><th>定義</th><th>値</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>ロールの一意のID。</td><td>milvusによって生成されるグローバル一意ID。</td></tr>
<tr><td>"status"</td><td>処理された操作またはリクエストのステータス。</td><td>&quot;abandon&quot;、&quot;success&quot;、または &quot;fail&quot;。</td></tr>
<tr><td>"query_type"</td><td>読み取りリクエストのタイプ。</td><td>「search &quot;または &quot;query&quot;。</td></tr>
<tr><td>"msg_type"</td><td>メッセージのタイプ。</td><td>&quot;insert&quot;、&quot;delete&quot;、&quot;search&quot;、または &quot;query&quot;。</td></tr>
<tr><td>"segment_state" セグメントの状態。</td><td>セグメントの状態。</td><td>&quot;Sealing&quot;、&quot;Growing&quot;、&quot;Flushed&quot;、&quot;Dropped&quot;、&quot;Importing&quot; のいずれか。</td></tr>
<tr><td>"cache_state"</td><td>キャッシュされたオブジェクトの状態。</td><td>「hit &quot;または &quot;miss&quot;。</td></tr>
<tr><td>"cache_name"</td><td>キャッシュされたオブジェクトの名前。このラベルは、&quot;cache_state&quot; ラベルとともに使用されます。</td><td>例：&quot;CollectionID&quot;、&quot;Schema &quot;など。</td></tr>
<tr><td>&quot;channel_name&quot;</td><td>メッセージ・ストレージ（PulsarまたはKafka）の物理トピック。</td><td>例：&quot;by-dev-rootcoord-dml_0&quot;、&quot;by-dev-rootcoord-dml_255 &quot;など。</td></tr>
<tr><td>"関数名"</td><td>特定のリクエストを処理する関数の名前。</td><td>例：&quot;CreateCollection&quot;、&quot;CreatePartition&quot;、&quot;CreateIndex &quot;など。</td></tr>
<tr><td>"user_name"</td><td>認証に使用するユーザー名。</td><td>お好みのユーザー名を指定してください。</td></tr>
<tr><td>"index_task_status"</td><td>メタ・ストレージにおけるインデックス・タスクのステータス。</td><td>&quot;未発行&quot;、&quot;進行中&quot;、&quot;失敗&quot;、&quot;終了&quot;、または &quot;リサイクル&quot;。</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">MilvusにおけるGrafana<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafanaは</a>、すべてのデータソースと接続できるオープンソースの可視化スタックです。メトリクスを引き出すことで、ユーザーが膨大なデータを理解、分析、監視するのに役立ちます。</p>
<p>Milvusは、メトリックの可視化のためにGrafanaのカスタマイズ可能なダッシュボードを使用しています。</p>
<h2 id="Whats-next" class="common-anchor-header">次の課題<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>モニタリングとアラートの基本的なワークフローを学んだら、次のことを学びましょう：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/monitor.md">監視サービスのデプロイ</a></li>
<li><a href="/docs/ja/v2.4.x/visualize.md">Milvusのメトリックを可視化する</a></li>
<li><a href="/docs/ja/v2.4.x/alert.md">アラートを作成する</a></li>
</ul>
