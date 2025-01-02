---
id: milvus-webui.md
summary: >-
  Milvus Web
  UIはMilvusのグラフィカルな管理ツールです。シンプルで直感的なインターフェイスにより、システムの観測性を高めます。以下のことが可能です。
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus WebUIはMilvusのグラフィカルな管理ツールです。シンプルで直感的なインターフェースにより、システムの観測性を向上させます。Milvus Web UIを使用することで、Milvusのコンポーネントや依存関係の統計やメトリクスの観察、データベースやコレクションの詳細の確認、Milvusの詳細な設定の一覧表示などを行うことができます。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UIは、BirdwatcherやAttuとは異なり、シンプルで直感的なインターフェースでシステム全体の観測性を提供するビルトインツールです。</p>
<p>以下の表は、Milvus Web UIとBirdwatcher/Attuの機能を比較したものです：</p>
<table>
<thead>
<tr><th>特徴</th><th>Milvus Web UI</th><th>バードウォッチャー</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>運用形態</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>対象ユーザー</td><td>メンテナ、開発者</td><td>保守者</td><td>開発者</td></tr>
<tr><td>インストール</td><td>組み込み</td><td>スタンドアロンツール</td><td>スタンドアロンツール</td></tr>
<tr><td>依存関係</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>主な機能</td><td>実行環境、データベース/コレクションの詳細、セグメント、チャンネル、タスク、スロークエリリクエスト</td><td>メタデータの検査とMilvus APIの実行</td><td>データベース管理および運用タスク</td></tr>
<tr><td>バージョン</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>v2.5.0より、稼働中のMilvusインスタンスから以下のURLでMilvus Web UIにアクセスできるようになりました：</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">機能<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UIには以下の機能があります：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Milvus Web UIの概要</span> </span></p>
<ul>
<li><p><a href="#Home">ホーム</a></p>
<p>現在稼働中のMilvusインスタンス、そのコンポーネント、接続クライアント、依存関係に関する情報を確認することができます。</p></li>
<li><p><a href="#Collections">コレクション</a></p>
<p>現在Milvusに登録されているデータベースやコレクションの一覧を表示し、その詳細を確認することができます。</p></li>
<li><p><a href="#Query">クエリ</a></p>
<p>クエリノードおよびクエリコーディネータのセグメント、チャネル、レプリカ、リソースグループの統計情報を確認できます。</p></li>
<li><p><a href="#Data">データ</a></p>
<p>データノードの収集された統計情報をセグメントおよびチャネル単位で確認できます。</p></li>
<li><p><a href="#Tasks">タスク</a></p>
<p>Querycoordスケジューラタスク、コンパクションタスク、インデックス構築タスク、インポートタスク、データ同期タスクなど、Milvusで実行されているタスクのリストを表示することができます。</p></li>
<li><p><a href="#Slow-requests">スローリクエスト</a></p>
<p>Milvusのスローリクエストの一覧を表示します。リクエストタイプ、リクエスト時間、リクエストパラメータが表示されます。</p></li>
<li><p><a href="#Configurations">設定</a></p>
<p>Milvusの設定とその値の一覧を表示します。</p></li>
<li><p><a href="#Tools">ツール</a></p>
<p>WebUIからpprofとMilvusデータ可視化ツールの2つのビルトインツールにアクセスできます。</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">ホーム<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>Home ページでは、以下の情報をご覧いただけます：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI ホーム</span> </span></p>
<ul>
<li><p><strong>システム情報</strong>配置モード、配置に使用されたイメージ、および関連情報などのシステム情報を表示します。</p></li>
<li><p><strong>コンポーネント情報</strong>：クエリ ノード、データ ノード、インデックス ノード、コーディネータ、プロキシなど、Milvus のコンポーネントのステータスとメトリックを表示します。</p></li>
<li><p><strong>接続クライアント</strong>SDKの種類とバージョン、ユーザー名、アクセス履歴など、接続されているクライアントとその情報を表示します。</p></li>
<li><p><strong>システム依存関係</strong>：Milvusの依存関係（メタストア、メッセージキュー、オブジェクトストレージ）のステータスとメトリクスを表示します。</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">コレクション<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Collectionsページでは、現在Milvusに登録されているデータベースやコレクションの一覧を表示し、その詳細を確認することができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI コレクション</span> </span></p>
<ul>
<li><p><strong>データベース</strong>現在Milvusに登録されているデータベースの一覧とその詳細を表示します。</p></li>
<li><p><strong>コレクション</strong>各データベース内のコレクションの一覧と詳細を表示します。</p>
<p>コレクションをクリックすると、フィールド数、パーティション、インデックスなどの詳細情報を表示することができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI コレクションの詳細</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">クエリ<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI クエリページ</span> </span></p>
<ul>
<li><p><strong>セグメント</strong>セグメントID、対応するコレクション、状態、サイズなど、セグメントのリストとその詳細を表示します。</p></li>
<li><p><strong>チャンネル</strong>チャネル名、対応するコレクションなど、チャネルのリストと詳細を表示します。</p></li>
<li><p><strong>レプリカ</strong>：レプリカのリストとその詳細（レプリカID、対応するコレクションなど）を表示します。</p></li>
<li><p><strong>リソースグループ</strong>：リソースグループのリストとその詳細（リソースグループ名、グループ内のクエリノード数、構成など）を表示します。</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">データ<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI データページ</span> </span></p>
<ul>
<li><p><strong>セグメント</strong>データノード/コーディネーターからのセグメントのリストと、セグメントID、対応するコレクション、状態、サイズなどの詳細を表示します。</p></li>
<li><p><strong>チャンネル</strong>データノード/コーディネーターからのチャンネルのリストと、チャンネル名、対応するコレクションなどの詳細を表示します。</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">タスク<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI タスクページ</span> </span></p>
<ul>
<li><p><strong>タスク</strong>Milvusで実行中のタスクのリストとタスクタイプ、状態、アクションを表示します。</p>
<ul>
<li><p><strong>QueryCoordタスク</strong>過去15分間のバランサー、インデックス、セグメント、チャンネル、リーダーチェッカーを含む全てのQueryCoordスケジューラタスクを表示します。</p></li>
<li><p><strong>コンパクションタスク</strong>：過去15分間のデータコーディネータからの全てのコンパクションタスクを表示します。</p></li>
<li><p><strong>インデックス構築タスク</strong>：過去30分間にデータ・コーディネーターが行ったインデックス構築タスクをすべて表示します。</p></li>
<li><p><strong>インポート・タスク</strong>：過去 30 分間のデータ・コーディネータからのすべてのインポート・タスクを表示します。</p></li>
<li><p><strong>データ同期タスク</strong>：直近 15 分間のデータ・ノードからのすべてのデータ同期タスクを表示します。</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">スローリクエスト<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UIスローリクエストページ</span> </span></p>
<ul>
<li><strong>スローリクエスト</strong>：スローリクエストとは、設定で指定された<code translate="no">proxy.slowQuerySpanInSeconds</code> の値よりも長いレイテンシを持つ検索またはクエリのことです。スローリクエストのリストには、過去15分以内のすべてのスローリクエストが表示されます。</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">設定<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 設定ページ</span> </span></p>
<ul>
<li><strong>コンフィギュレーション</strong>：Milvusランタイム設定とその値のリストを表示します。</li>
</ul>
<h2 id="Tools" class="common-anchor-header">ツール<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: Milvusのプロファイリングとデバッグのためのpprofツールにアクセスします。</p></li>
<li><p><strong>Milvusデータ可視化ツール</strong>：Milvusのデータを可視化するためのMilvusデータ可視化ツールにアクセスします。</p></li>
</ul>
