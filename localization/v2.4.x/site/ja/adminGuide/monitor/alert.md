---
id: alert.md
title: アラートの作成
related_key: monitor and alert.
summary: GrafanaでMilvusサービスのアラートを作成する方法をご紹介します。
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Milvusサービスのアラート作成<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusサービスのアラートメカニズムを紹介し、Milvusでアラートを作成する理由、タイミング、方法について説明します。</p>
<p>アラートを作成することで、特定のメトリックの値が事前に定義したしきい値を超えた場合に通知を受け取ることができます。</p>
<p>例えば、アラートを作成し、Milvusコンポーネントによるメモリ使用量の最大値として80MBを設定します。実際の使用量が事前に定義した数値を超えた場合、Milvus コンポーネントのメモリ使用量が 80 MB を超えたことを通知するアラートが表示されます。このアラートを受けて、リソースの割り当てを適宜調整し、サービスの可用性を確保することができます。</p>
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
    </button></h2><p>以下は、アラートを作成する必要がある一般的なシナリオです。</p>
<ul>
<li>MilvusコンポーネントのCPUまたはメモリの使用率が高すぎる。</li>
<li>Milvusコンポーネントポッドのディスク容量が不足している。</li>
<li>Milvusコンポーネントポッドの再起動頻度が高すぎる。</li>
</ul>
<p>アラート設定で使用できるメトリックは次のとおりです：</p>
<table>
<thead>
<tr><th>メトリック</th><th>メトリック</th><th>測定単位</th></tr>
</thead>
<tbody>
<tr><td>CPU使用率</td><td>MilvusコンポーネントによるCPU使用率で、CPUの実行時間で示されます。</td><td>秒</td></tr>
<tr><td>メモリ</td><td>Milvusコンポーネントが消費するメモリリソース。</td><td>MB</td></tr>
<tr><td>ゴルーチン</td><td>GO言語での同時実行アクティビティ。</td><td>/</td></tr>
<tr><td>OSスレッド</td><td>OSのスレッド、または軽量プロセス。</td><td>/</td></tr>
<tr><td>プロセスオープンFds</td><td>現在使用されているファイルディスクリプタの数。</td><td>/</td></tr>
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
    </button></h2><p>本ガイドでは、Milvusコンポーネントのメモリ使用量に関するアラートを作成することを例にしています。他の種類のアラートを作成する場合は、適宜コマンドを調整してください。作業中に何か問題が発生した場合は、<a href="https://github.com/milvus-io/milvus/discussions">Githubのディスカッションで</a>質問するか、<a href="https://discord.com/invite/8uyFbECzPX">Discordで</a>スレッドを立ててください。</p>
<h3 id="Prerequisites" class="common-anchor-header">前提条件</h3><p>このチュートリアルでは、Grafanaがインストールされ、設定されていることを前提としています。そうでない場合は、<a href="/docs/ja/v2.4.x/monitor.md">モニタリングガイドを</a>読むことをお勧めします。</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1.新しいクエリを追加する</h3><p>Milvusコンポーネントのメモリ使用量のアラートを追加するには、Memoryパネルを編集します。次に、メトリックで新しいクエリを追加します：<code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>アラートメトリック</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2.ダッシュボードを保存する</h3><p>ダッシュボードを保存し、アラートが表示されるまで数分待ちます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>アラート_ダッシュボード</span> </span></p>
<p>Grafana アラートクエリはテンプレート変数をサポートしていません。そのため、ラベルにテンプレート変数を含まない2つ目のクエリを追加する必要があります。2つ目のクエリはデフォルトで「A」という名前になっています。ドロップダウンをクリックして名前を変更できます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Alert_query</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3.アラート通知の追加</h3><p>アラート通知を受信するには、&quot;通知チャンネル &quot;を追加します。次に、&quot;Send to &quot;フィールドでチャンネルを指定します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>アラート通知</span> </span></p>
<p>アラートが正常に作成され、トリガーされると、以下のスクリーンショットのような通知が届きます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>通知_メッセージ</span> </span></p>
<p>アラートを削除するには、"Alert "パネルに移動し、削除ボタンをクリックします。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>アラートの削除</span> </span></p>
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
<li>Milvusのモニタリングサービスを開始する必要がある場合：<ul>
<li><a href="/docs/ja/v2.4.x/monitor.md">モニタリングガイドを</a>読む</li>
<li><a href="/docs/ja/v2.4.x/visualize.md">モニタリングメトリクスの可視化</a>方法</li>
</ul></li>
<li>Milvusコンポーネントのメモリ使用量に関するアラートを作成した場合: リソースの割り当て方法を学ぶ<ul>
<li><a href="/docs/ja/v2.4.x/allocate.md#standalone">リソースの割り当て</a>方法</li>
</ul></li>
<li>Milvusクラスタをスケールする方法をお探しですか?<ul>
<li><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタのスケールについて</a>学ぶ</li>
</ul></li>
</ul>
