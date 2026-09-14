---
id: release_notes.md
summary: Milvus リリースノート
title: リリースノート
---
<h1 id="Release-Notes" class="common-anchor-header">リリースノート<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusの新機能をご覧ください！このページでは、各リリースにおける新機能、改善点、既知の問題、およびバグ修正についてまとめています。更新情報については、定期的にこのページをご確認いただくことをお勧めします。</p>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2026年9月9日</p>
<table>
<thead>
<tr><th>Milvus バージョン</th><th>Python SDK バージョン</th><th>Node.js SDK バージョン</th><th>Java SDK バージョン</th><th>Go SDK バージョン</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>Milvus v3.0.1のリリースを発表できることを嬉しく思います！今回のリリースでは、REST v2によるスナップショット管理、再ランク付け機能の拡張、GoクライアントおよびRESTful APIにおけるTEXTフィールドのサポートが追加されたほか、Storage V3、データの一貫性、およびセキュリティに関するパフォーマンスの改善と修正が行われました。</p>
<h3 id="Features-improvements" class="common-anchor-header">機能の改善<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>コレクション単位のネイティブスナップショット管理および非同期復元のための REST v2 API を追加しました (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>,<a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>検索およびクエリ操作における「Take」出力パスの選択を制御するための、設定可能な結果数しきい値を追加しました（<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>）</li>
<li>Go クライアントおよび RESTful API に TEXT フィールドのサポートを追加しました (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>外部テーブルの初期および最大読み取り IOPS レートを設定可能にしました (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>データの公開を遅らせることなく、すべてのセグメントがインデックス登録されるまで待機してから完了を報告する、外部コレクションの更新ジョブ用のオプトイン設定を追加しました (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>検索関数チェーンに L1 再ランク付けのサポートを追加しました (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>FunctionScore、REST、レガシーハイブリッド検索、および Go クライアントにおいて、ANN リクエストごとの重みをオプションで指定できる加重 RRF 再ランク付けを追加しました (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>,<a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">安定性の向上<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>ジオメトリ RTree インデックスおよびキャッシュのメモリ安全性、ならびに解析不可能な WKB および空のジオメトリに対するクエリの処理を改善しました (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>プロセス全体の一時メモリ割り当てを復元し、並行する Storage V2/V3 フィールドの読み込みおよびスカラー V3 インデックスの読み込みに対するメモリ推定値を修正することで、メモリ管理を改善しました (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>読み取りの並列化と生ベクトルデータのディスクへのストリーミングにより、外部コレクションのインデックス構築時のダウンロードのボトルネックとメモリ使用量を削減しました（<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>）</li>
<li>クライアントによる追加処理をバッチ処理し、同期設定を公開することで、小ロット・高同時実行ワークロードにおける Woodpecker のスループットを向上させました (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>ストレージおよびコンパクタパス全体における、レコードリーダーの所有権とライフタイムの一貫性、空のブロブの処理、および読み取りエラーの報告を改善しました (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>4ウェイのインターリーブパイプラインと、衝突および再ハッシュ境界に対する安全策により、グループ化ハッシュプローブの効率を向上させた (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>BM25 または MinHash 出力フィールドを持たないコレクションに対して、WAL 挿入本体の解析をスキップすることで、挿入処理のオーバーヘッドを削減 (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>実行レイヤー間で一時的および恒久的なエラー分類を維持することで、ストレージ障害の報告と再試行処理を改善しました (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>GIS の粗/細分割および同一列の述語融合をデフォルトで有効化し、空間クエリのパフォーマンスを向上 (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>共有バックログベースのアドミッション制御と優先順位の交互切り替えにより、テキストインデックス作成および JSON シュレッディングタスクのスケジューリングを改善しました (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>シールドセグメントのオフセットマッピングに対する mmap サポートを追加し、専用のロードオプションとディスクリソースアカウンティングを導入しました (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>オンデマンドで列ごとのチャンクメモリ推定を実行することにより、Storage V2 のデータロードを最適化 (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>新しい関数の出力フィールドにバインドされたインデックスに対するサーバーサイドの AutoIndex サポートを追加し、add_function_field リクエストでインデックスパラメータを省略するか、AUTOINDEX を指定できるようにした (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>完全レポートへのフォールバックを伴う増分レポートにより、QueryNode 分布レポートのペイロードを削減し、メトリクス収集時のメモリ割り当てを削減しました (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>,<a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>bcrypt のコストを 4 から 10 に引き上げ、パスワードハッシュの強度を向上させました。既存のハッシュをアップグレードするには、認証情報のローテーションが必要です (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>Parquet インポート時に、構造体配列のサブフィールドについて必要なリーフ列のみを読み込むことで、冗長なデコードを削減した (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>複数ラウンドのサイズベースのプランニングによる強制マージのグループ化を改善し、従来のプランニングしきい値設定を非推奨とした (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>cgosymbolizer をアップグレードし、ネイティブフォールト発生後に PID 1 として実行されている Milvus プロセスがハングアップするのを防止しました (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>セマンティックハイライト入力に対する行数の検証を改善しました (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>書き込み再試行のバックオフを構成可能にし、インポートの再試行制御を改善しました (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>,<a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>,<a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>古い統計バージョンを回収し、ターミナル状態を永続化することで、分析タスクのライフサイクル管理を改善しました (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>,<a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>ロックタイムアウト後のセグメント解放を待機することで、セグメントのライフサイクル調整を改善 (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>k-way マージによるデータ圧縮のためのストレージのソートを改善 (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>チャンクへのアクセス、式の評価、および JSON 統計情報において、パックされたマスクを保持することで、NULL 許容フィールドの妥当性バッファの拡張を削減しました (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>ログやエラーメッセージへの露出を防止することで、機密性の高い認証情報、API キー、RBAC パスワードハッシュ、および外部収集ソースの詳細の保護を強化しました (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>,<a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>,<a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>楽観的 CAS 検証と、該当する競合に対する安全な再試行により、部分更新の並行制御を改善しました (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>成長するセグメントの読み取りスナップショットの安定性と、スキーマスナップショットの有効期間管理を改善しました (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>バックアップ中の認証メタデータの冗長なスキャンを削減しました (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>Null 許容ベクトル ID マッピングをインデックス層に移行し、論理 ID の処理を統一するとともに、シールドされたインデックスの mmap ベースのマッピングをサポートすることで、その安定性を向上させました (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>CPU および GPU ビルドにおける Sonic JIT コンパイルと Go プラグインの読み込み間の同期を改善 (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>メタデータキャッシュを介したプロキシ書き込みパスのチャネル解決を改善し、冗長なコーディネーター RPC を排除してエラー分類を改善しました (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>報告されたベンチマークにおいて、topk=100000 時のリコール計算時間を約 3.08 秒から 18.5 ミリ秒に短縮しました (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>有効性ビットマップの再利用、冗長なヌルオフセットの保存の削減、およびビットセットのコピー高速化により、null 許容フィールドのフィルタリングを最適化 (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>,<a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>,<a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>異なる要素数がビットマップのカーディナリティ制限に達した場合に STL_SORT を使用することで、ネストされた構造体のサブフィールドに対するハイブリッドスカラーインデックスを改善しました (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>メタデータキャッシュにおけるセグメント ID フィルタリングの効率を改善しました (<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>ハッシュヘルパー関数におけるメモリ割り当てを削減しました (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>比較ごとのマップ検索を排除することで、マージされた再ランク付け結果のソートを最適化 (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>JSON のデフォルト値および NUL で終了しない文字列ビューの処理におけるメモリの安全性を向上 (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>スコープ付きユニティコンパイル、コンパイラのキャッシュ機能の改善、および冗長なコンパイル作業の削減により、C++ のビルド時間を短縮しました (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>既存のメトリクス名とラベルを維持しつつ、スクレイピング時にキャッシュされたファイルシステムからメトリクスを収集することで、ファイルシステムメトリクスのカバレッジと最新性を向上させた (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>デフォルトのシングルスレッド設定を維持しつつ、成長セグメントの中間インデックス構築ごとにスレッド数を設定できる、更新可能な growingBuildThreadRate 設定を追加しました (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>バックポートにより、3.0 に mmap フィールドデータのライトバックサポートを追加し、デフォルトで無効になっている queryNode.mmap.writeback オプションを導入しました (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>JSON、ARRAY、および TIMESTAMPTZ クエリにおける、不正確な結果や一貫性のない述語の検証を修正しました。これには、混合型の述語、大数の比較、および複数のバッチにわたるフィルタリングが含まれます (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>セグメントのソースファイルが複数のタスクにまたがっている場合、並列外部コレクションの更新中にデータの更新に一貫性がない問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>要素レベルで動作しない述語を受け入れていた MATCH 式を修正しました (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>一致する結果がない検索が、「サポートされていない ID タイプ」エラーで失敗する問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>シャットダウン時にスタンドアロン版 Milvus がハングする問題を修正し、デフォルト値 10 秒の設定可能な移行タイムアウトを追加しました (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>DataNode ワーカーが複数のサービングクラスタ間で共有されている場合、外部テーブルの埋め込みリクエストで誤ったクラスタ ID が使用される問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>TextEmbedding 関数において、integration_id および model_deployment_id の更新ができない問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>バックフィルに失敗したセグメントに対して、HTTP JSON レスポンスで明示的な `ok=false` ステータスが省略されていた問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>トランスポートまたは低速タイムアウト後に再試行した際、HTTP 400 XAmzContentChecksumMismatch が発生して MinIO オブジェクトのアップロードが失敗する問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>,<a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>ストリーミングサービスが有効になっている際に、QueryNode 間のセグメントのバランス調整が停滞する問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>,<a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>保持レコードを再構築できない場合に、ミックス・コンパクテーション中にデータが黙って失われる問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>スナップショットの復元時にコレクション設定が失われ、予期せず「Strong consistency」にデフォルト設定されてしまう問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>ストリーミング削除時に、新しくロードされたシールドセグメントが除外され、削除されたデータが引き続きクエリ可能になる問題を修正しました（<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>）</li>
<li>空のデータに対してネストされたインデックスが正しく構築されない問題を修正しました（<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>）</li>
<li>ストリーミングサービスへの切り替え時にデッドロックが発生し、操作が無限に待機状態になる問題を修正しました（<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>）</li>
<li>コンパクションおよびレコード再構築時のジオメトリのデフォルト値が不正確だった問題、および Parquet インポートにおいてデフォルト値が設定されたジオメトリ値の null マーク付けが不正確だった問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>DataCoord の再起動後のコンパクションおよびリカバリ中に、有効な V3 セグメントが拒否される問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>、<a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>、<a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>、<a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>、<a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>、<a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>構造体内のVARCHAR配列サブフィールドでハイブリッドスカラーインデックスを使用する際、バージョンメタデータが欠落しているというエラーによりセグメントの読み込みに失敗する問題を修正しました（<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>）</li>
<li>更新されたマニフェストが再オープンされた際に、外部カラムの更新が行われない問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>時間依存の条件を含む検索における、タイムゾーンの不適切な処理を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>検索リクエストにおける ArrayOfVector 入力の不適切な処理を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>サポートされているサイズ制限を超える行が挿入時に拒否されない問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>設定されたターゲットインデックスバージョンを無視していた暫定インデックスの問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>order_by を使用したクエリで、高密度ベクトル出力フィールドが返されない問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>,<a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>権限グループから削除された後も、取り消された権限が有効なままになる問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>DataCoord の再起動後、Storage V3 セグメントの binlog ファイル数およびストレージ形式のラベルが不正確になる問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>,<a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>ワーカーのバージョンチェックの信頼性が低かったり、サポートされていないワーカーに対してタイムアウトになるまで繰り返し再試行したりするために、外部スナップショットの復元が停滞する問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>3.0.0 以降のレガシー STLSORT ファイルを含む、構造体配列のサブフィールドに対する HYBRID インデックスのセグメント読み込み失敗を、再インデックスを必要とせずに修正しました (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>長さゼロの Arrow C データバッファの処理中に発生していたクラッシュを修正しました (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>マニフェストエラー発生後のStorage V3セグメントの読み込みまたは再開時の不適切な失敗処理を修正し、安全な再試行のために既存のセグメント状態を保持するようにしました（<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>）</li>
<li>ARRAY 要素フィルターが、後続の要素の前に NULL または空の配列で構成されるバッチ全体に遭遇した場合のクエリの失敗を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>コレクションスキーマの変更後に、バックフィルジョブが古い埋め込みデータをコミットしてしまう問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>Storage V3 レコードの欠落フィールドが、宣言されたデフォルト値ではなく NULL として返される問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>、<a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>、<a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>IAM/OAuth 認証情報を使用して GCS 上で Storage V3 スナップショットの復元が行えない原因となっていたサーバー側のコピー失敗を修正しました。これには、5 GiB を超えるオブジェクトのコピーも含まれます (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>外部プロキシポートでの gRPC ストリーミング呼び出しを介した認証なしのアクセスを修正しました (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>クラスタリングコンパクション後にデータの元のコミットタイムスタンプが失われる問題を修正しました（<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>）</li>
<li>既存の Storage V2 セグメントを含むコレクションに TEXT フィールドを追加した後、フラッシュの失敗が繰り返し発生し、ストリーミング ノードがクラッシュする問題を修正しました（<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>）</li>
<li>Storage V3 セグメント内の有効期限が切れた行が、TTL フィールドに基づくコンパクションをトリガーできず、別のコンパクション条件が満たされるまで保存されたままになる問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>CDC レプリケーションによるインポート中に、ソースコレクションとターゲットコレクション間で自動生成された主キーに不整合が生じる問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>WAL バックエンドの移行中に並行書き込みが失われる問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>,<a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>,<a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>高カーディナリティのデータを含む再構築または圧縮されたネストされた HYBRID インデックスが、古いバージョンへのロールバック後に読み取れなくなる問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>外部の密ベクトル行における null 要素の処理を修正し、すべて null の null 許容行を受け入れるようにするとともに、部分的に null を含む行に対する設定可能な処理を追加しました (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>ストリーミングノードのフェイルオーバー後に、V3 セグメントの行数が不正確になり、ソートコンパクションが繰り返し失敗する問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>範囲条件と OR 条件を組み合わせたクエリにおいて、下限値を含むレコードが除外される問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>プライマリキーによる検索で、指定された ID の順序が保持されない問題を修正しました（<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>）</li>
<li>Storage V3 を有効化した後に TEXT フィールドを追加すると、既存の Storage V2 拡張セグメントの読み込みが妨げられ、フラッシュ、ソート、およびインデックス操作に支障をきたす問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>未コミットの Storage V3 セグメントを含むスナップショットにより、復元が成功したと報告されるものの、復元されたセグメントを読み込めない問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>,<a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>ファイルがネストされたタスクまたはバージョンディレクトリに保存されていた場合、Storage V3 のテキストインデックスが読み込まれない問題を修正しました (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2026年7月29日</p>
<table>
<thead>
<tr><th>Milvus バージョン</th><th>Python SDK バージョン</th><th>Node.js SDK バージョン</th><th>Java SDK バージョン</th><th>Go SDK バージョン</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0が正式リリースされました！<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>で導入されたLake-Nativeアーキテクチャを基盤とし、このリリースではベータ版で開始された取り組みが完結しました。External Collectionはより多くのLakehouseワークフローに対応し、スキーマはオンラインでの追加・バックフィル・削除をサポートするようになりました。また、スパースインデックスはSINDIを基盤に再構築され、 StructArrayとファセット検索により検索エンジンが充実しました。FAISSパススルーおよびTEXTにより、インデックスとモダリティの選択肢が広がりました。また、Woodpeckerはスタンドアロンサービスとして動作します。</p>
<p>Milvus 3.0の詳細や、コアメンテナーによるAMAについては、以下の動画をご覧ください：</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>3.0 シリーズを初めてご利用になる方は、以下の「Core 3.0 の機能概要」セクションで 3.0-beta で導入された機能がまとめられています。詳細については、<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta のリリースノート</a>をご覧ください。</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">3.0.0の新機能（3.0-beta以降）<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">外部コレクション：より包括的なレイクハウスワークフロー</h4><p>3.0-betaでは「External Collection」が導入され、データをMilvusにコピーすることなく、既存のレイクファイルを参照し、インデックスを構築し、検索できるようになりました。今回のリリースでは、これをさらに拡張し、完全なレイクハウス検索ワークフローを実現しています。 外部フィールドから、BM25スパースベクトル、MinHashシグネチャ、テキスト埋め込みなどの関数出力フィールドへの供給が可能になりました。これにより、ソーステーブルをコピーすることなく、Milvus内でテキストおよびモデル由来の検索フィールドを構築できます。 また、リフレッシュ機能では加算的なスキーマの進化もサポートされています。外部テーブルに新しい列が追加された場合、Milvusはコレクションを再構築するのではなく、影響を受けるセグメントのみをパッチ適用します。</p>
<p>また、このリリースでは、Milvus SnapshotのメタデータやStorage V3のマニフェストを外部ソースとして扱う「<code translate="no">milvus-table</code> 」外部フォーマットが追加されました。これにより、コレクションのスナップショット自体を外部テーブルとして提供できるようになり、バッチ処理システムとサービングシステムが、マニフェストに裏打ちされた同一データの共有ビューを利用できるようになります。</p>
<p>詳細については、「<a href="/docs/ja/create-an-external-collection.md">外部コレクション</a>と<a href="/docs/ja/snapshots.md">スナップショットの</a> <a href="/docs/ja/create-an-external-collection.md">作成</a>」を参照してください。</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">柔軟なスキーマ：オンラインでの列の追加、バックフィル、削除</h4><p>本番環境ではスキーマは静的なものではありません。組み込まれたモデルが置き換えられたり、特徴量が反復的に更新されたり、フィールドが非推奨になったりしますが、これまでは、ダウンタイムや二重書き込みを伴うコレクション全体の再構築が必要でした。3.0.0ではこの課題が解決され、サービングを継続したまま、列の追加、データの埋め込み、および削除が可能になりました。</p>
<p>バックフィルは双方向で機能します。外部バックフィルは、Milvusの外部で計算された値を処理します。カラムを追加し、一貫性のある開始点としてコレクションのスナップショットを取得し、ジョブをオフラインで実行し、値を書き戻すと、Milvusは新しいカラムを段階的にインデックス化します。これにより、数億行にわたる埋め込みモデルのアップグレードも、ダウンタイムのないホットパスとなります。 内部バックフィルは、カーネルから導出された値を扱います。既存のコレクションに BM25 または MinHash 関数を適用すると、その出力フィールドは既存のデータに対して自動的に計算されます。</p>
<p>詳細については、「<a href="/docs/ja/add-fields-to-an-existing-collection.md">既存のコレクションへのフィールドの追加</a>」を参照してください。</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">スパースインデックスの全面刷新：SINDI、Block-Max WAND、および Block-Max MaxScore</h4><p>Milvus 3.0 では、スパースベクトルインデックスが全面的にアップグレードされています。<a href="https://arxiv.org/abs/2509.08395">SINDI</a>、Block-Max WAND、Block-Max MaxScore という新しい検索アルゴリズムが導入されたほか、反転リストの圧縮、設定可能な量子化、ワークロードごとの検索アルゴリズムの選択機能も追加されました。 また、mmapによる読み込み、シリアライズ、およびBM25スコアリングも最適化され、大規模なスパースベクトル検索および全文検索におけるインデックスの保存容量と読み込みのオーバーヘッドが削減されています。 内部ベンチマークでは、圧縮されたBM25インデックスは、同等のリコール率において2.6スパースインデックスよりも約3分の1のサイズであり、学習済みスパース埋め込みにおいてSINDIはMaxScoreのQPSの最大約10倍に達します。 新しいインデックスバージョンが有効になると（「互換性および動作に関する注意事項」を参照）、SINDI がスパース IP 検索のデフォルトとなり、MaxScore が BM25 のデフォルトとなります。</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray の対応範囲</h4><p>StructArrayは、null値、ビットマップインデックス、稼働中のコレクションへの動的なフィールド追加、およびupsertによる構造体フィールドの部分更新をサポートするようになりました。これに対応するRESTおよび一括インポート機能も提供されます。</p>
<p>要素レベルの検索では、エンティティごとに設定可能な集約（最大値／合計／平均／トップKのバリエーション）を備えたベクトルサブフィールド間のハイブリッド検索に加え、範囲検索およびグループ化機能が追加されました。ネストされたフィルタリングでは、<code translate="no">element_filter</code> 述語、<code translate="no">MATCH_ANY</code> ／<code translate="no">MATCH_ALL</code> ／<code translate="no">MATCH_LEAST</code> ／<code translate="no">MATCH_MOST</code> ／<code translate="no">MATCH_EXACT</code> の量指定子、<code translate="no">tags[0][name]</code> などの位置指定サブフィールドアクセス、および構造体カラムに対する<code translate="no">array_length()</code> がサポートされています。</p>
<p>詳細については、「<a href="/docs/ja/array-of-structs.md">StructArray</a>」および「<a href="/docs/ja/struct-array-operators.md">StructArray演算子</a>」を参照してください。</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">検索集計とファセット検索</h4><p>ベータ版のクエリ集計は、フィルタリングされたデータに対して正確な統計値を算出しますが、3.0.0 では検索パスにファセット機能が追加されました。検索時にファセットフィールドを指定すると、Milvus は上位のファセット値を返します。各値は、ANN ランキングにおける最も一致度の高いメンバーによって表され、COUNT や AVG などの集計値が注釈として付加されます。 — クライアント側で過剰にデータを取得してカウントするのではなく、1回のリクエストでファセット検索サイドバー（ブランド、価格帯、属性）を実現します。</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">ファンクションチェーンによる再ランク付け</h4><p>再ランク付けは、Function Chain API を通じて組み合わせ可能になりました。この API は、単一の検索リクエストの一部として、順序付きかつ型付きパイプラインを実行します。 1つのチェーンでは、QueryNode での初期の L0 再スコアリングと、Proxy での L2 ポストリダクション再ランク付けを組み合わせることができ、クライアント側でのオーケストレーションを必要とせずに、スコアの変換や組み合わせ、モデルベースの再ランク付け、ソート、候補の絞り込みをサポートします。 また、このリリースでは、FileResources として登録された UBJ モデルを使用した L0 再ランク付けのためのネイティブ XGBoost スコアリングに加え、サーバー管理型のテキスト埋め込みおよび文の類似度による再ランク付けのための Hugging Face 推論プロバイダーが追加されました。</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT 長文フィールド</h4><p>TEXTフィールドは、ストレージ側の長さ制限を撤廃することで、長文を第一級のデータとして扱います。<code translate="no">text_match</code> 、<code translate="no">phrase_match</code> 、およびBM25をサポートしています。64 KB未満の値はインラインで保持され、それより大きい値はVortex形式のパーティションレベルのLOBファイルに格納され、列には<code translate="no">(file_id, offset)</code> の参照のみが保存されます。 LOBファイルはセグメント間で共有されるため、コンパクション時にはテキストを書き換えるのではなく、参照を移動させます。RAGの場合、これは1回のIOで同じストアからベクトルとソーステキストを取得できることを意味し、外部のBLOBストアを操作する必要がありません。</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISSインデックスのパススルー</h4><p>新しい<code translate="no">FAISS</code> インデックス型は、<code translate="no">faiss_index_name</code> パラメータを介して任意のFaissインデックスファクトリ文字列（<code translate="no">IVF64,Flat</code> 、<code translate="no">HNSW16,Flat</code> 、<code translate="no">OPQ16,IVF64,PQ16x4</code> ）を受け入れ、検索パラメータも渡されるため、FaissのレシピをMilvus上で直接再現できます。</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">VortexおよびLanceフォーマットのサポート</h4><p>ストレージ層には、2つのオープンなカラム型フォーマットが追加されました。次世代の内部フォーマットであるVortex（適応型エンコーディング（辞書、RLE、ビットパッキング、浮動小数点数専用の圧縮）、ゼロコピー展開、ベクトルとスカラーの混合ワークロード向けに最適化）と、オープンエコシステム間の相互運用を目的としてParquetと並んで採用されたLanceです。 Vortexはデフォルトの内部フォーマットとなる予定であり、フィルターのプッシュダウンやローカルバリアントもロードマップに盛り込まれています。</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpeckerのスタンドアロン展開</h4><p>ストリーミング書き込みパスの中核をなすWALであるWoodpeckerは、他のノードに組み込まれるのではなく、独立したサービスとしてデプロイできるようになりました。これにより、他のマイクロサービスと同様に、独立したスケーリング、障害の隔離、および可観測性が実現されます。これは、大規模なクラスターや書き込み負荷の高いワークロードにおいて特に重要です。</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Core 3.0の機能まとめ<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の機能は<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>で導入され、3.0.0 に含まれています。詳細については、ベータ版リリースノートを参照してください。</p>
<ul>
<li><strong>外部コレクション</strong>— レイクハウスデータ（Parquet、Lance、Iceberg、Vortex）をその場でクエリ可能：ゼロコピー、読み取り専用、増分リフレッシュによる同期。</li>
<li><strong>スナップショット</strong>— セグメント参照による特定時点の読み取り専用コレクションビュー。追加ストレージコストはほぼゼロ。</li>
<li><strong>Storage V3 (Loon)</strong>— オブジェクトストレージ上のマニフェストベースの列指向ストレージ。SnapshotおよびExternal Collectionの基盤となります。</li>
<li><strong>クエリ/検索の ORDER BY</strong>— フィールドごとの ASC/DESC によるサーバーサイドのマルチフィールドソート。</li>
<li><strong>クエリ集計</strong>— グループ化を伴う COUNT / SUM / AVG / MIN / MAX をサーバー側で評価。</li>
<li><strong>EmbList + DiskANN</strong>— StructArray 埋め込みリスト向けのオンディスク多ベクトルインデックス。Muvera や Lemur などの高速化パスがあります。</li>
<li><strong>MinHash関数（doc-in、doc-out）</strong>— サーバーサイドのMinHashシグネチャに加え、近似重複検出のための<code translate="no">MINHASH_LSH</code> 。</li>
<li><strong>Null 許容ベクトル</strong>— 6 種類のベクトル型すべてで NULL を許容。検索では NULL 行をスキップし、AddField はベクトルフィールドにも拡張されます。</li>
<li><strong>エンティティの TTL</strong>— TIMESTAMPTZ フィールドによって制御される行ごとの有効期限。</li>
<li><strong>FileResource</strong>— アナライザー、BM25、および Text Match 用の、クラスタ管理による辞書、同義語リスト、およびストップワードリスト。</li>
<li><strong>強制マージ</strong>— 演算子によってトリガーされるセグメントの圧縮。同期モードまたは非同期モードで実行されます。</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">互換性および動作に関する注意事項<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) はデフォルトで無効になっています。</strong>Snapshot や TEXT フィールドなど、これに依存する機能については、<code translate="no">common.storage.useLoonFFI</code> を通じて手動で有効にする必要があります。Storage V3 は、今後のリリースでデフォルトで有効になる予定です。</li>
<li><strong>2.6 → 3.0 の互換性とロールバックは保証されています。</strong>つまり、3.0 へのデプロイは 2.6 へロールバック可能です。ただし、シリアライズされたデータ形式を変更する機能（例：Storage V3）を有効化または使用した場合は、ロールバックはできなくなります。</li>
<li><strong>新しいインデックスバージョンは、現時点ではオプトイン方式となっています。</strong>新たに導入されたインデックスアルゴリズムを有効にするには、対象のインデックスバージョンを手動で引き上げる必要があります（<code translate="no">dataCoord.targetVecIndexVersion</code> を 10 に、<code translate="no">dataCoord.targetScalarIndexVersion</code> を 4 に）。今後のリリースでは、これらがデフォルトで有効になります。</li>
<li><strong>GPUイメージはCUDA 12.9に移行し</strong>、Ubuntu 20.04とのGPU互換性は維持されなくなりました。</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2026年5月9日</p>
<table>
<thead>
<tr><th>Milvus バージョン</th><th>Python SDK バージョン</th><th>Node.js SDK バージョン</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta は、Milvus ベクトルデータベースを拡張し、オープンレイク・エコシステムとの新たな統合を実現しています。「External Collection」により、Milvus は外部レイク・テーブルをゼロコピーでクエリできるようになり、Spark はスナップショットを通じて Milvus コレクションを直接読み取ることが可能になりました。 また、このリリースでは、より豊富な検索機能、より表現力豊かなスキーマ、より詳細なテキスト検索のカスタマイズ、よりきめ細かなデータおよびモデルのライフサイクル制御、さらにオペレーター側の制御機能も強化されています。Milvus 3.0 は Zilliz Lakebase のコアカーネルであり、その統合されたサービング、ディスカバリー、バッチ処理を支えています。</p>
<h3 id="Key-Features" class="common-anchor-header">主な機能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部コレクション</h4><p>一般的なAIデータパイプラインでは、テラバイト規模の埋め込みデータやメタデータが、Parquet、Lance、またはIcebergテーブルとしてすでにオブジェクトストレージ上に存在しています。そのデータをMilvusにコピーすると、ストレージコストが2倍になり、同期を維持しなければならないETLパイプラインが追加され、データガバナンスの主導権が顧客から離れてしまいます。</p>
<p>外部コレクション機能により、このコピー作業が不要になります。Milvusコレクションは、データが保存されている場所を直接参照でき、Milvusが管理するのはスキーマ、インデックス、およびクエリの実行のみです。 増分リフレッシュにより、コレクションは基となるファイルと常に同期された状態が維持されます。金融や医療などのチームのように、データをデータレイクから持ち出せないお客様でも、データが格納されている場所のままベクトル検索を実行できます。また、データレイクに保存された単一のデータセットを、複数のMilvusインスタンスから同時に提供することも可能です。</p>
<p>詳細については、「<a href="/docs/ja/create-an-external-collection.md">外部コレクションの作成</a>」を参照してください。</p>
<h4 id="Snapshot" class="common-anchor-header">スナップショット</h4><p>提供とバッチ検出では、多くの場合、同じコレクションを同時に必要とします。A/Bモデル評価、大規模な重複排除、バックフィル検証、およびバージョンのロールバックはすべて、書き込みが継続している間もコレクションの安定したビューを必要とします。</p>
<p>スナップショットは、データをコピーするのではなく既存のセグメントを参照することで、コレクションの特定時点における読み取り専用のビューを作成するため、追加のストレージコストはほぼゼロです。ライブのコレクションが書き込みを受け付け続けている間も、バッチジョブはMVCC方式の隔離環境下でスナップショットから読み取りを行うことができます。</p>
<p>詳細については、「<a href="/docs/ja/snapshots.md">スナップショット</a>」、<a href="/docs/ja/manage-snapshots.md">「スナップショットの管理」</a>、「<a href="/docs/ja/snapshot-use-cases.md">スナップショットのユースケース</a>」を参照してください。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">クエリ／検索の並べ替え</h4><p>検索およびクエリでは、マルチフィールドの順序付けが可能になりました。ソート処理はMilvusカーネルにオフロードされ、各フィールドごとに<code translate="no">ASC</code> および<code translate="no">DESC</code> を設定できます。これにより、本番環境における一般的な課題が解決されます。距離のみに基づくTop-Kランキングでは、最も類似したアイテムが必ずしも最も安価、最新、または最も人気のあるものではない場合、ビジネスニーズに合致しないことがよくあります。</p>
<p>アプリケーションは、複合的なランキングを表現するために、結果を過剰に取得してクライアント側で再ソートする必要がなくなりました。</p>
<p>詳細については、「<a href="/docs/ja/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">スカラーフィールドによる検索結果の並べ替え</a>」および「<a href="/docs/ja/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">クエリ結果の並べ替え</a>」を参照してください。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">クエリ集計</h4><p><code translate="no">group_by_fields</code> <code translate="no">output_fields</code>Milvus コレクションからテナント分布統計、フィールドの完全性カウント、またはバージョンのロールアウト進捗状況を生成するには、以前は一致するエンティティをクライアント側に引き戻し、そこで集計する必要がありました。 XML-PH-0000@deepl.internalおよび、XML-PH-0001@deepl.internal形式の集計式（<code translate="no">count(*)</code> 、<code translate="no">count(&lt;field&gt;)</code> 、<code translate="no">sum(&lt;field&gt;)</code> 、<code translate="no">avg(&lt;field&gt;)</code> 、<code translate="no">min(&lt;field&gt;)</code> 、<code translate="no">max(&lt;field&gt;)</code> など）を受け付けます。集計は、フィルタリング後にサーバー側で評価されます。</p>
<p>詳細については、「<a href="/docs/ja/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">クエリ結果の集計</a>」を参照してください。</p>
<h4 id="Null-Vector" class="common-anchor-header">ヌルベクトル</h4><p>エンベディングは非同期で生成されることが多いため、エンティティがベクトルよりも先に到着することがあります。 マルチモーダルデータにも、キャプションのない動画や画像のない製品など、自然な欠落があります。以前のバージョンには適切な解決策がなく、アプリケーションはベクトルの準備ができるまで書き込みを遅らせるか、プレースホルダーのベクトルを埋めるかのいずれかを選択していましたが、どちらの選択肢も検索品質を低下させていました。</p>
<p>Milvus 3.0 では、6 種類のベクトル型すべてにおいて、ベクトルフィールドの NULL がサポートされています。検索では NULL ベクトルが自動的にスキップされるため、検索品質に影響はなく、NULL ベクトルは実質的にストレージを消費しません。この変更に伴い、<code translate="no">AddField</code> もベクトルフィールドに拡張されました。<code translate="no">nullable=True</code> を使用すると、既存のコレクションを再構築することなく、オンラインで新しいベクトルフィールドを追加できます。</p>
<p>詳細については、「<a href="/docs/ja/nullable-and-default.md">Nullable Fields</a>」を参照してください。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">カスタム辞書および同義語辞書</h4><p>標準のトークナイザーでは、本番環境の検索品質要件を常に満たすとは限りません。中国語、医学、法律、化学などの専門分野、および多言語コーパスでは、カスタム辞書や同義語テーブルを活用することで、大幅な改善が期待できます。これまで、これらのリソースは主にアプリケーション側でのクエリ書き換えとして実装されていました。</p>
<p>Milvus 3.0 では、カスタム トークナイザー辞書、同義語リスト、ストップワードリスト、および複合語分解ルールを登録するための FileResource メカニズムが追加されました。 一度登録されたリソースは、どのトークナイザーやフィルターからも参照可能となり、BM25、アナライザー、およびテキストマッチで有効になります。辞書や同義語は、アプリケーションコード全体に散在させるのではなく、バージョン管理を行い、一元的に管理できるようになりました。</p>
<p>詳細については、「<a href="/docs/ja/manage-file-resources.md">ファイルリソースの管理</a>」を参照してください。</p>
<h4 id="Entity-TTL" class="common-anchor-header">エンティティの TTL</h4><p>コレクションレベルおよびパーティションレベルの TTL は、多くのライフサイクルやコンプライアンスのシナリオにとっては粗すぎます。同じコレクション内のテナントによって保存ルールが異なることが多く、個々のエンティティは、コレクションの他の部分とは異なるスケジュールで有効期限が切れる必要がある場合があります。</p>
<p>Milvus 3.0では、エンティティ単位のTTLがサポートされています。スキーマ内で「<code translate="no">TIMESTAMPTZ</code> 」フィールドを宣言し、コレクションのプロパティを通じてそれをTTLフィールドとして指定すると、Milvusは有効期限が切れたエンティティを自動的に回収します。これにより、忘れられる権利に基づくリクエスト、セッションデータの有効期限切れ、およびアプリケーション側でのクリーンアップを必要としない限定的な会話履歴に対応できます。</p>
<p>詳細については、<a href="/docs/ja/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">「エンティティレベルのTTLの設定</a>」を参照してください。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6では、セットベースの近似重複検出のための<code translate="no">MINHASH_LSH</code> インデックスが追加されましたが、アプリケーションは依然として、データをMilvusに書き込む前にMinHash署名を計算する必要がありました。</p>
<p>Milvus 3.0 では、サーバーサイドの MinHash 関数が追加されました。スキーマで「<code translate="no">VARCHAR</code> 」入力フィールドと「<code translate="no">BINARY_VECTOR</code> 」出力フィールドを宣言し、<code translate="no">FunctionType.MINHASH</code> 関数を関連付けるだけで、Milvus が挿入、一括挿入、および検索の際にシグネチャを計算します。<code translate="no">MINHASH_LSH</code> と組み合わせることで、Milvus 内での大規模データセットの重複排除ワークフロー、フィンガープリント、および盗作検出をサポートします。</p>
<p>詳細については、「<a href="/docs/ja/minhash-function.md">MinHash関数</a>」を参照してください。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>「1つのエンティティ＝1つのベクトル」という仮定は、現代の検索にはもはや適合しません。長いドキュメントは多くのチャンクに分割され、ColBERTのようなレイトインタラクションモデルはトークンごとに1つのベクトルを生成し、マルチモーダルエンティティは複数のビューを持つことがあります。</p>
<p>EmbListは、エンティティごとに可変長のベクトルリストを格納し、<code translate="no">DISKANN</code> をディスク上のインデックスとして使用します。コーパスがメモリ予算を超える場合、このディスクパスによりRAMの使用量を抑制できます。EmbList +<code translate="no">DISKANN</code> は、このRCにおける広範なStructListファミリーの最初のバリエーションです。 StructListのフィルタリングやMuvera／Lemurによるマルチベクトル高速化を含む、このファミリーの残りの機能は、公式の3.0リリースでの実装が予定されています。</p>
<p>詳細については、「<a href="/docs/ja/search-with-embedding-lists.md">Embedding Lists を使用した検索</a>」を参照してください。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制マージ</h4><p>本番環境のワークロードでは、時間の経過とともにセグメントの断片化が蓄積され、クエリのレイテンシの変動やストレージ容量の肥大化を引き起こします。</p>
<p>Milvus 3.0 では、同期モードと非同期モードの両方で、利用のピーク時以外の時間帯にセグメントの圧縮を明示的に実行する機能が追加されました。</p>
<p>詳細については、「<a href="/docs/ja/force-merge.md">Force Merge コンパクション</a>」を参照してください。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 では、Storage V3 が導入されました。これは、データとメタデータが S3 互換のオブジェクトストレージ上に格納される、マニフェストベースのカラム型ストレージエンジンです。各データセットのバージョンは、不変のマニフェストスナップショットとしてキャプチャされます。これは、データセットを構成するカラムグループ、デルタログ、および統計情報を記録した Avro エンコードのファイルです。</p>
<p>マニフェストはコンパクトなAvroファイルであり、デルタログはデータファイルを書き換えることなくエンティティレベルの削除を記録します。これにより、データセットが拡大してもメタデータのオーバーヘッドを最小限に抑えることができます。また、マニフェストはメタデータの追跡とクエリパスを分離するため、コレクションはクエリのパフォーマンスを低下させることなく、より多くのセグメントを管理できるようになります。</p>
<p>状態はオブジェクトストレージに保存されるため、データセットは自己記述的です。つまり、ストレージパスへのアクセス権を持つ読み取り側であれば、中央カタログがなくてもデータセットを検出して解釈することができます。この特性は、External Collection、Snapshot、および将来のレイク統合の基盤となっています。</p>
