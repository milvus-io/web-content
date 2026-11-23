---
id: alert.md
title: アラートを作成する
related_key: monitor and alert.
summary: Grafana で Milvus サービスのアラートを作成する方法について学びましょう。
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Milvus サービスのアラートを作成する<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvus サービスのアラート機能について紹介し、Milvus でアラートを作成する理由、タイミング、および方法について説明します。</p>
<p>アラートを作成することで、特定のメトリックの値が事前に定義したしきい値を超えた際に通知を受け取ることができます。</p>
<p>たとえば、アラートを作成し、Milvus コンポーネントによるメモリ使用量の最大値を 80 MB に設定します。実際の使用量が事前定義された数値を超えた場合、Milvus コンポーネントによるメモリ使用量が 80 MB を超えていることを知らせるアラートを受け取ります。 アラートを受け取った後、サービスの可用性を確保するために、状況に応じてタイムリーにリソースの割り当てを調整することができます。</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">アラート作成のシナリオ<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>以下に、アラートを作成する必要がある一般的なシナリオをいくつか示します。</p>
<ul>
<li>Milvus コンポーネントによる CPU またはメモリ使用量が高すぎる。</li>
<li>Milvus コンポーネントのポッドのディスク容量が不足している。</li>
<li>Milvus コンポーネントのポッドが頻繁に再起動している。</li>
</ul>
<p>アラート設定には、以下のメトリックが利用可能です：</p>
<table>
<thead>
<tr><th>メトリクス</th><th>説明</th><th>測定単位</th></tr>
</thead>
<tbody>
<tr><td>CPU 使用率</td><td>MilvusコンポーネントによるCPU使用率。これはCPUの稼働時間によって示されます。</td><td>秒</td></tr>
<tr><td>メモリ</td><td>Milvusコンポーネントが消費するメモリリソース。</td><td>MB</td></tr>
<tr><td>Goroutine</td><td>GO言語における並行実行アクティビティ。</td><td>/</td></tr>
<tr><td>OSスレッド</td><td>スレッド、あるいはオペレーティングシステムにおける軽量プロセス。</td><td>/</td></tr>
<tr><td>プロセスが開いているファイルディスクリプタ</td><td>現在使用中のファイルディスクリプタの数。</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">アラートの設定<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>このガイドでは、Milvusコンポーネントのメモリ使用量に関するアラートを作成する例を挙げます。他の種類のアラートを作成する場合は、コマンドを適宜調整してください。作業中に問題が発生した場合は、<a href="https://discuss.milvus.io/">Milvusフォーラム</a>で質問するか、<a href="https://discord.com/invite/8uyFbECzPX">Discord</a>でディスカッションを開始してください。</p>
<h3 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>このチュートリアルでは、Grafanaがインストールされ、設定済みであることを前提としています。そうでない場合は、<a href="/docs/ja/monitor.md">モニタリングガイド</a>をお読みになることをお勧めします。</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. 新しいクエリを追加する<button data-href="#1-Add-a-new-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus コンポーネントのメモリ使用量に関するアラートを追加するには、「Memory」パネルを編集します。次に、以下のメトリックを使用して新しいクエリを追加します：<code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" /> 
   <span>Alert_metric</span>
  
 </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. ダッシュボードを保存する<button data-href="#2-Save-the-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>ダッシュボードを保存し、数分待ってアラートが表示されるのを確認してください。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" /> 
   <span>Alert_dashboard</span>
  
 </span></p>
<p>Grafanaのアラートクエリはテンプレート変数をサポートしていません。そのため、ラベルにテンプレート変数を含まない2つ目のクエリを追加する必要があります。2つ目のクエリはデフォルトで「A」という名前が付けられています。ドロップダウンをクリックして名前を変更できます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" /> 
   <span>アラート_クエリ</span>
  
 </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. アラート通知の追加<button data-href="#3-Add-alert-notifications" class="anchor-icon" translate="no">
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
    </button></h3><p>アラート通知を受信するには、コンタクトポイントを作成します。Grafanaで<strong>[Alerts &amp; IRM</strong>] &gt;<strong>[Alerting</strong>] &gt;<strong>[Notification configuration</strong>] に移動し、[<strong>Contact points</strong>] タブを選択して、<strong>[+ New contact point</strong>] をクリックします。次に、アラートルールの [<strong>Configure notifications</strong>] セクションで、コンタクトポイントを選択するか、通知ポリシーを介して通知をルーティングします。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" /> 
   <span>Alert_notification</span>
  
 </span></p>
<p>アラートが正常に作成され、トリガーされると、以下のスクリーンショットのように通知が届きます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" /> 
   <span>Notification_message</span>
  
 </span></p>
<p>アラートを削除するには、「アラート」パネルに移動し、削除ボタンをクリックします。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" /> 
   <span>アラートの削除</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">次の手順<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvusのサービス監視を開始する必要がある場合は：
<ul>
<li><a href="/docs/ja/monitor.md">監視ガイド</a>をお読みください</li>
<li><a href="/docs/ja/visualize.md">監視メトリクスの可視化</a>方法を確認する</li>
</ul></li>
<li>Milvusコンポーネントのメモリ使用量に関するアラートを作成済みの場合は：
<ul>
<li><a href="/docs/ja/allocate.md#standalone">リソースの割り当て</a>方法を確認する</li>
</ul></li>
<li>Milvusクラスタのスケーリング方法に関する情報を探している場合は：
<ul>
<li><a href="/docs/ja/scaleout.md">Milvusクラスタのスケーリング方法について</a>学ぶ</li>
</ul></li>
</ul>
