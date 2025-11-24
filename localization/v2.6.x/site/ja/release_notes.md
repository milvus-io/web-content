---
id: release_notes.md
summary: Milvusリリースノート
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
    </button></h1><p>Milvusの新機能をご確認ください！このページでは、各リリースの新機能、改善点、既知の問題、バグ修正についてまとめています。v2.6.0以降の各バージョンのリリースノートはこのセクションにあります。定期的にこのページをご覧いただき、アップデート情報をご確認ください。</p>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年11月21日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvusバージョン</th><th style="text-align:left">Python SDK バージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.6のリリースを発表できることを大変嬉しく思っております。このアップデートでは、GeospatialおよびTimestampzデータ型、再スコアリングのためのBoostランカーなどの重要な機能が導入されました。このリリースでは、スカラーフィルタリングのパフォーマンスも大幅に改善されました。また、より高い安定性と信頼性を確保するため、いくつかの重要なバグにも対処しました。本リリースにより、Milvusは全てのユーザーに、より強固で効率的な体験を提供し続けます。以下は本リリースの主なハイライトです。</p>
<ul>
<li>地理空間データ型：Milvusは、<code translate="no">POINT</code> 、<code translate="no">LINESTRING</code> 、<code translate="no">POLYGON</code> のようなOGC準拠の幾何オブジェクトを表す<code translate="no">Geometry</code> データ型のサポートを導入しました。このデータ型は複数の空間関係演算子（st_contains, st_intersects, st_within, st_dwithin...）をサポートし、空間フィルタリングとクエリ実行を高速化する<code translate="no">RTREE</code> 空間インデックスを提供します。これにより、LBS、マッピング、その他の空間ワークロードのための地理空間形状の効率的な保存とクエリが可能になる。</li>
<li>Timestamptzデータタイプ：MilvusはTIMESTAMPTZデータタイプを導入し、すべての時間データに対してタイムゾーンを認識できるようになりました。この機能により、データベースとコレクションのtimezoneプロパティを使用してデフォルトの時間コンテキストを定義することができるため、グローバルな展開において一貫したデータ管理が可能になります。また、検索操作（クエリーと検索）では、タイムスタンプをその場で必要なローカルフォーマットに変換して出力するタイムゾーンパラメーターをサポートしています。</li>
<li>ブースト・ランカー：Boost Ranker は、ベクトル距離に基づいて計算される意味的類似性だけに頼るのではなく、Milvus が関数内のオプションのフィルタリング条件を使用して、検索結果の候補の中から一致するものを見つけ、指定された重みを適用することによって、一致したエンティティのスコアをブーストし、最終結果における一致したエンティティの順位を昇格または降格させることを可能にします。</li>
<li>STL_SORTインデックスがVARCHARおよびTIMESTAMPTZデータ型をサポートするようになりました。</li>
<li>既存のコレクションを変更することで、そのコレクションの動的フィールドを有効にできるようになりました。</li>
<li>cve-2025-63811 を修正しました。</li>
</ul>
<h3 id="Features" class="common-anchor-header">機能<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>新しいコンフィグを追加し、動的更新コンフィグを有効に<a href="https://github.com/milvus-io/milvus/pull/45363">しました (#45363</a>)。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>cve-2025-63811 を修正<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)。</li>
<li>querynodeのログから大きなセグメントID配列を削除した<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)。</li>
<li>expr がループ毎に入力値をコピーしていた複数の場所を更新<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>term exprの性能を最適化した<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)。</li>
<li>インデックスを持たないセグメントのベクタチャンクをプリフェッチするようにした<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)。</li>
<li>Expr:プリフェッチされたチャンクは一度だけ<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>ジオメトリ型および timestamptz 型に null 可能なサポートを追加<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)。</li>
<li>セッションのttlを10秒から30秒に増加<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>ddlフレームワークのメトリクスを追加<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>maxconnectionsの設定バージョンを更新<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>ソースIDのチェックを省略した(<a href="https://github.com/milvus-io/milvus/pull/45519">#45519</a>)。</li>
<li>リモートストレージ用のmax_connection設定をサポートした<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)。</li>
<li>insertrecordのpk2offsetクリア時のNULLポインタチェックを追加し、パニックを防止した<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)。</li>
<li>階層型ストレージにおけるスカラフィールドの取得を最適化した<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)。</li>
<li>アナライザパラメータのtypoを修正した(<a href="https://github.com/milvus-io/milvus/pull/45434">#45434</a>)。</li>
<li>セグメントインデックスの作成時に index_type をオーバーライドした<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)。</li>
<li>updatereplicateconfigurationのrbacサポートを追加した<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)。</li>
<li>goのバージョンを1.24.9に更新した<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)。</li>
<li>デフォルト設定のjsonshreddingを無効にした<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)。</li>
<li>バッファリングと直接入出力の両方で整列バッファを統一<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>jsonstats関連のユーザ設定パラメータ名を変更した<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)。</li>
<li>knowhereスレッドプールの設定を更新可能にした<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)。</li>
<li>新しいddlフレームワークとcdc 3のパッチを厳選した<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>新規コレクション作成時にスキーマのバージョンを設定するようにした<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>bulkinsert用のjsonl/ndjsonファイルをサポートした<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)。</li>
<li>レプリケートストリームクライアントの終了を待機するようにした(<a href="https://github.com/milvus-io/milvus/pull/45260">#45260</a>)</li>
<li>geometrycacheをオプション設定にした<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)。</li>
<li>新しいddlフレームワークとcdc 2のパッチを厳選<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>cdcをデフォルトでは起動しないようにした<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)。</li>
<li>新しいddlフレームワークとcdcのパッチを厳選<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)。</li>
<li>ベクトルフィールド数の最大制限を削除<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>インポートジョブの作成時間を表示するようにした(<a href="https://github.com/milvus-io/milvus/pull/45059">#45059</a>)。</li>
<li>scalarindexsortビットマップの初期化をレンジクエリ用に最適化した(<a href="https://github.com/milvus-io/milvus/pull/45087">#45087</a>)。</li>
<li>stl_sortがvarcharをサポートするようにした<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)。</li>
<li>シャードクライアントロジックを専用パッケージに抽出した<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>権限キャッシュを別パッケージに抽出することで権限管理をリファクタリングした<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>fillfielddataでjsonのデフォルト値をサポートした<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)。</li>
<li>コレクション変更時のenabledynamicfieldとschemaversionを更新した<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
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
<li>timestamptzによる部分更新パニックを修正<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>milvus ddlのアップグレードに2.6.6を使用するようにした<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)。</li>
<li>キャッシュの期限切れに最新のタイムティックを使用するようにした<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)。</li>
<li>streamingnodeの初期化に失敗した場合に終了するようにした<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)。</li>
<li>競合状態によるデッドロックを回避するため、tbb concurrent_map emplace を保護した<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)。</li>
<li>ストリーミングコーデックがシャットダウンしてもクエリコーデックが動作していた場合のパニックを防止<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>ワーカーがタスクを持っていない場合に、タスクの開始を設定するようにしました<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)。</li>
<li>prepareが失敗した場合にruncomponentでデッドロックが発生しないようにしました<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)。</li>
<li>ack ブロードキャストのチャネルを二重に閉じた場合のパニックを防止<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)。</li>
<li>addfield中のデフォルト値の埋め戻しを修正<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)。</li>
<li>割り当て回復情報のサイズを減らすため、チャネルの割り当て履歴をコンパクトに<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)。</li>
<li>追加されたフィールドのコンパクション時にデフォルト値を正しく扱うようにした(<a href="https://github.com/milvus-io/milvus/pull/45619">#45619</a>)</li>
<li>dropindexのvalidatefieldnameを削除<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)。</li>
<li>セグメントからが健全でない場合にコンパクションタスクを無視するようにした<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>alter コレクションをブロードキャストする前にスキーマプロパティを設定するようにした<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)。</li>
<li>キーが無効な場合にデータベースイベントを保存するようにした(<a href="https://github.com/milvus-io/milvus/pull/45530">#45530</a>)。</li>
<li>構造体フィールドの一括インポートの不具合を修正<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>ハイブリッドインデックスの生データ取得に失敗する問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)。</li>
<li>クエリ完了前にコレクションが解放されないように、コレクションを早期に保持するようにした<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>ddlに正しいリソースキーロックを使用し、転送レプリカで新しいddlを使用するようにしました<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)。</li>
<li>アップグレード後のインデックスの互換性を修正しました<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)。</li>
<li>チャネルが使用できないエラーを修正し、コレクションブロックを解除した<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>パーティションの削除時にコレクションメタを削除<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>統計の保存結果で、ドロップされたとマークされた対象セグメントが二度表示される問題を修正<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>コレクション情報のタイムティックが誤って更新されていた問題を修正<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>ianaタイムゾーンIDを認識できるようにtzdata依存を追加<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>一括検索の再ランク関数におけるフィールドデータのオフセット計算を修正<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>mmapで成長するフィルタのジオメトリを修正<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Nextfieldid が構造体を考慮していなかった問題を修正<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>グループ値がnilだった<a href="https://github.com/milvus-io/milvus/pull/45419">問題を</a>修正<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>コンパクションにおいて、スライスされた矢印配列の正確なサイズ推定を提供<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>レプリケートストリームクライアントのデータ競合を修正<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>新しく追加された列のテキストインデックスの構築をスキップするようにした<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)。</li>
<li>l0コンパクションにおいて、誤って封印されたセグメントを無視していた問題を修正<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)。</li>
<li>生データの可用性を確保するため、テキストインデックス作成の前にfinishloadを移動した(<a href="https://github.com/milvus-io/milvus/pull/45335">#45335</a>)。</li>
<li>jsonのパスがNULLの場合にjson_shreddingを使用しないようにした<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)。</li>
<li>timestamptz関連の修正を厳選した<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321</a>)。</li>
<li>ディスク使用量の取得エラーによるロードセグメントの失敗を修正した<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)。</li>
<li>コンパクションにおけるjsonのデフォルト値をサポートした<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)。</li>
<li>成長セグメントのジオメトリインデックスに対して正しいバッチサイズを計算<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>ddlフレームワークバグパッチを適用した<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>構造体の mmap 設定による分身収集の失敗を修正<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>複合binlogライターのタイムスタンプ範囲を初期化<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>r-treeインデックスの成長時にtmpディレクトリの作成をスキップするようにした<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)。</li>
<li>エクゼキュータ更新時の潜在的な競合状態を回避<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>インデックス名に"["と"]"を使用可能にした<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>空のjsonがNULLでない場合にjsonをシュレッダーにかける不具合を修正<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>追記操作をwal自身によってのみキャンセルできるようにした(<a href="https://github.com/milvus-io/milvus/pull/45079">#45079</a>)</li>
<li>wp gcpクラウドストレージのak/skへのアクセスに関する問題を解決した<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>NULLジオメトリデータのインポートを修正<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>jsonstatsparquetwriter::close()でpacked_writer_のNULLチェックを追加した (<a href="https://github.com/milvus-io/milvus/pull/45176">#45176</a>)</li>
<li>埋め込みリストのemb_list_metaのmmapに失敗する問題を修正<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>コレクションにセグメントがない場合に、querynodeのnumentitiesメトリクスを更新した<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)。</li>
<li>無効なutf-8文字列のインポート時に再試行しないようにした<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)。</li>
<li>requeryシナリオのreduce/rerankにおいて、空のフィールドデータを処理するようにした<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>cdcの正常停止時のパニックを修正した<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)。</li>
<li>認証トークンの汚染、oss/cosサポート、冗長な同期エラーログを修正<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>ロードタイムアウトを防ぐため、stringindexsortですべてのnullデータを扱えるようにした<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)。</li>
<li>リクエストから古いバージョンのjsonstatsをビルドしないようにした(<a href="https://github.com/milvus-io/milvus/pull/45102">#45102</a>)</li>
<li>ジオメトリデータをインポートする際のバグを修正<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>構造体におけるパーケットインポートのバグを修正<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>互換性を確保するためにgetmetricsをindexnodeserverに追加<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>構造体サブフィールドのalterコレクションの失敗を修正<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>構造体でコレクションレベルのmmapが有効にならない問題を修正<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>querycoordコレクションの通知更新におけるデータ競合を修正<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)。</li>
<li>ストレージレイヤーでjsonフィールドのデフォルト値を扱うようにした<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>iterが他のスレッドによって消去されないようにダブルチェックするようにした<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>ジオメトリをフィルタするgis関数のバグを修正<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2025年11月11日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvusバージョン</th><th style="text-align:left">Python SDKバージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p><strong>重大なセキュリティ脆弱性</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a>に対処し、Go 1.24.9 にアップグレードした Milvus 2.6.5 のリリースをお知らせいたします。<strong>Milvus 2.6.xをお使いの皆様には、</strong>できるだけ早く<strong>2.6.5にアップグレードされることを</strong>強くお勧めいたします。このアップデートには、他にもいくつかの改善とバグ修正が含まれており、より強固で効率的な体験をユーザーに提供します。</p>
<h3 id="Improvements" class="common-anchor-header">改善点<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>go1.24.9のビルダーイメージタグを更新した<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>ソースIDのチェックを省略<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
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
<li>グループ値がnilになる<a href="https://github.com/milvus-io/milvus/pull/45421">問題を</a>修正<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>複合binlogライターのタイムスタンプ範囲を初期化 (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>requeryシナリオのreduce/rerankで空のフィールドデータを扱えるようにした(<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>jsonstatsparquetwrite...でpacked_writer_のNULLチェックを追加しました<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)。</li>
<li>新しく追加されたカラムのテキストインデックスの構築をスキップするようにした<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)。</li>
<li>l0コンパクションにおいて、誤ってシールされたセグメントを無視していた<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)。</li>
<li>生データの可用性を確保するため、テキストインデックス作成の前にfinishloadを移動した(<a href="https://github.com/milvus-io/milvus/pull/45336">#45336</a>)。</li>
<li>コンパクションにおけるjsonのデフォルト値をサポートした<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)。</li>
<li>milvus-storageを更新し、aws sdkの初期化の重複を修正した(<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日2025年10月21日</p>
<table>
<thead>
<tr><th style="text-align:left">milvusバージョン</th><th style="text-align:left">Python SDKバージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus2.6.4がリリースされ、強力な新機能、パフォーマンスの向上、重要なバグ修正が行われました。このアップデートでは、高度なデータモデリングのための ARRAY の構造化などの重要な機能が導入されました。さらに、JSON Shredding がデフォルトで有効になり、クエリのパフォーマンスと効率がさらに向上しました。また、より高い安定性と信頼性を確保するために、いくつかの重要なバグに対処しました。本リリースにより、Milvusは全てのユーザーに、より堅牢で効率的なエクスペリエンスを提供し続けます。以下は本リリースの主なハイライトです。</p>
<h3 id="Features" class="common-anchor-header">機能<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Milvusは新しいデータ型であるStructを導入し、1つのエンティティ内で複数の関連フィールドを整理・管理できるようになりました。現在、StructはDataType.ARRAY配下の要素としてのみ使用可能ですが、各行が複数のベクトルを含むArray of Vectorのような機能を実現し、複雑なデータモデリングや検索に新たな可能性をもたらします。<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>DashScopeでQwen GTE-rerank-v2モデルをサポートしました<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li><strong>Goのバージョンを1.24.6にアップグレード</strong>し、イメージビルダーを追加<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>デフォルトのJSONシュレッダーを有効にした<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>クエリノードのロード失敗を防ぐために、ロードされるbinlogサイズにディスククォータを追加した<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>MemVectorIndexで構造体配列のmmapサポートを有効にしました<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)。</li>
<li>TextMatchIndexのキャッシュ層管理を追加しました<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)。</li>
<li>ビットマップの逆引き性能を最適化 (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Knowhereのバージョンを更新<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>セグメントロード時の論理使用量チェックを削除した<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>テンプレート値の長さ情報のアクセスログフィールドを追加<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>インデックス構築時に現在のインデックスタイプを上書きできるようにした(<a href="https://github.com/milvus-io/milvus/pull/44754">#44754</a>)</li>
<li>ベクトルインデックスのロードパラメータを追加した<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>コンパクション実行タスクの状態管理を統一した<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)。</li>
<li>QueryCoordのタスクスケジューラに洗練されたログを追加した<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)。</li>
<li>accesslog.$consistency_levelが実際に使用される値を表すようにした(<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>datacoordから冗長なチャネルマネージャを削除した<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)。</li>
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
<li>CVEを修正するためにビルドDockerfileからGCCを削除した<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)。</li>
<li>スコアが等しい場合に検索結果の順序を決定的にするようにした(<a href="https://github.com/milvus-io/milvus/pull/44884">#44884</a>)</li>
<li>リランカーがフィールドデータを使用していない場合、再問い合わせの前に再ランク付けを行うようにした<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>CreateArrowFileSystemが例外を投げる場合に、プロミスの履行を保証するようにした<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)。</li>
<li>ディスク暗号化設定の欠落を修正<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>残高チェッカーを停止すると残高が停止する問題を修正<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>not equal "に "none "が含まれない問題を修正<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)。</li>
<li>CreateArrowScalarFromDefaultValue で JSON デフォルト値をサポート<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)。</li>
<li>デバッグログの改行を避けるために短いデバッグ文字列を使用するようにした<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)。</li>
<li>JSONフラットインデックスのexists式を修正した<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)。</li>
<li>JSONのexistsパスのセマンティクスを統一した<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)。</li>
<li>空の内部挿入メッセージによるパニックを修正<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>AI/SAQパラメータを更新した<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)。</li>
<li>自動インデックスが無効な場合の重複排除の制限を削除した(<a href="https://github.com/milvus-io/milvus/pull/44824">#44824</a>)。</li>
<li>DataCoordメトリクスに対するリセット/追加操作の同時実行を回避した(<a href="https://github.com/milvus-io/milvus/pull/44815">#44815</a>)</li>
<li>JSON_contains(path,int)のバグを修正した(<a href="https://github.com/milvus-io/milvus/pull/44818">#44818</a>)。</li>
<li>JSONの処理において、キャッシュ層での立ち消えを回避した<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>exp フィルタがスキップされた場合に、間違った結果が得られる問題を修正した<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>クエリノードがラベルとストリーミングノードリストを持つSQNかどうかをチェックした(<a href="https://github.com/milvus-io/milvus/pull/44793">#44793</a>)</li>
<li>BM25でboostが順番なしの結果を返す問題を修正<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>自動IDによる一括インポートを修正した<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>インデックスのロード時に FileManagerContext 経由でファイルシステムを渡すようにした<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)。</li>
<li>タスクIDが実行中と完了の両方の状態で表示される問題を修正<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>不正な開始時間ティックを削除し、それ未満のタイムティックのDMLをフィルタリングしないようにした<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>AWSクレデンシャルプロバイダをシングルトンにした(<a href="https://github.com/milvus-io/milvus/pull/44705">#44705</a>)</li>
<li>数字を含むJSONパスのシュレッダーを無効にした(<a href="https://github.com/milvus-io/milvus/pull/44808">#44808</a>)</li>
<li>TestUnaryRangeJsonNullableの有効なユニットテストを修正した(<a href="https://github.com/milvus-io/milvus/pull/44990">#44990</a>)。</li>
<li>ユニットテストを修正し、ファイルシステムのフォールバックロジックを削除した<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日2025年10月11日</p>
<table>
<thead>
<tr><th style="text-align:left">milvusバージョン</th><th style="text-align:left">Python SDKバージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>この度、Milvus 2.6.3 をリリースいたしました。このバージョンでは、様々な新機能の追加、改善、重要なバグの修正を行いました。このバージョンでは、システムパフォーマンスの向上、機能の拡張、および重要な問題の修正が行われ、すべてのユーザーに対してより安定したエクスペリエンスが提供されます。以下は、このリリースのハイライトです：</p>
<h3 id="New-Features" class="common-anchor-header">新機能<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>AutoIDが有効な主キー：<code translate="no">autoid</code> が有効な場合に、主キーフィールドを書き込めるようになった。<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>L0セグメントの手動コンパクション：L0セグメントを手動でコンパクト化できるようになった。<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>AutoID のクラスタ ID エンコーディング: 自動生成される ID にクラスタ ID が含まれるようになりました。<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>gRPC トーケナイザーのサポート：gRPCトークナイザが統合され、クエリの柔軟性が向上しました。<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>優先キューを実装することでバランスチェッカーを改良し、タスク分配を改善。<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>封印されたセグメントに対するBM25の統計情報を事前にロードし、シリアライズを最適化。<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Nullable フィールドを BM25 関数の入力として使用可能に。<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>WoodpeckerでAzure Blob Storageをサポートしました。<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Woodpeckerセグメントコンパクションの直後に小さなファイルを削除するようにしました。<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>ブーストクエリのランダムスコア機能を有効にしました。<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>オートインデックスの<code translate="no">int8</code> ベクタタイプの新しい設定オプション。<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>ハイブリッド検索の再問い合わせポリシーを制御するパラメータ項目を追加しました。<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>関数出力フィールドの挿入を制御できるようにした。<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>decay関数が、より良いパフォーマンスのために設定可能なスコアマージに対応。<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>文字列に対するバイナリ検索のパフォーマンスを改善。<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>クエリでスパースフィルタをサポート。 <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>階層化インデックス機能を強化するための様々な更新。<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>スカラー検索およびベクトル検索におけるストレージリソースの使用状況の追跡を追加。<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>delete/upsert/restfulのストレージ使用量を追加しました<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)。</li>
<li><code translate="no">flushall</code> の操作に対して、きめ細かなフラッシュターゲットを有効にした。<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>より良いリソース管理のため、データノードがシングルトンでないファイルシステムを使用するようになった。<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>メタデータにバッチ処理の設定オプションを追加。 <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>エラーメッセージにデータベース名を含めるようにした。<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>トレーサーテストを<code translate="no">milvus-common</code> リポジトリに移動。<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>C API ユニットテストファイルを<code translate="no">src</code> ディレクトリに移動。<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>Go SDK で<code translate="no">autoid</code> が有効な場合に主キーデータを挿入できるようになった。<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
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
<li>脆弱性 CVE-2020-25576 および WS-2023-0223 を解決した。<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>ストリーミングノードのクォータセンターのメトリクスに論理リソースが使用される問題を修正した。<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>スタンバイを有効にした場合に<code translate="no">activatefunc</code> で<code translate="no">mixcoord</code> を設定するようにした。<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>ストレージ V2 コンポーネントの冗長な初期化を削除。<a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>エクゼキュータのループ終了によるコンパクションタスクのブロッキングを修正。<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li><code translate="no">insert/deleterecord</code> のデストラクタで、ロードされたリソースの使用量を払い戻し。<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>レプリケータが停止できない問題を修正し、レプリケート設定バリデータを強化した。<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>mmap が無効な場合に<code translate="no">mmap_file_raii_</code> を<code translate="no">nullptr</code> に設定するようにした。<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li><code translate="no">diskfilemanager</code> がコンテキストからファイルシステムを使用するように。<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>ストレージ V2 の OSS および COS を強制的にバーチャルホストに。<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>互換性のため、<code translate="no">extrainfo</code> が<code translate="no">nil</code> でない場合に<code translate="no">report_value</code> のデフォルト値を設定するようにした。<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>rootcoordでコレクションを削除した後のコレクションメトリクスをクリーンアップ。<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>フィールド<code translate="no">mmap.enable</code> のプロパティが重複しているためにセグメントの読み込みに失敗する問題を修正。<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>動的レプリカのロードコンフィグ解析エラーを修正。<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Go SDK の動的カラムの行からカラムへの入力を処理。<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年9月19日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvusバージョン</th><th style="text-align:left">Python SDKバージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.2のリリースを発表できることを嬉しく思います！このアップデートでは、強力な新機能、大幅なパフォーマンス向上、およびシステムの安定性と生産性を高める重要な修正が導入されています。ハイライトには、upsertによるフィールドの部分更新、動的フィールドフィルタリングを高速化するJSON Shredding、LIKEクエリを高速化するNGramインデックス、既存コレクションのより柔軟なスキーマ進化が含まれます。コミュニティからのフィードバックに基づいて構築されたこのリリースは、実際のデプロイメントのためのより強力な基盤を提供します。</p>
<h3 id="Features" class="common-anchor-header">機能<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>JSON Shreddingのサポートを追加し、動的なフィールドフィルタリングを高速化。詳細については、<a href="/docs/ja/json-shredding.md">JSON Shreddingを</a>参照してください。</li>
<li>NGRAM Indexのサポートを追加し、Like操作を高速化しました。詳細については、<a href="/docs/ja/ngram.md">NGRAMを</a>参照してください。</li>
<li>upsert APIによる部分的なフィールド更新のサポートを追加しました。詳細は<a href="/docs/ja/upsert-entities.md">Upsert Entitiesを</a>参照してください。</li>
<li>Boost Functionのサポートを追加しました。詳細は<a href="/docs/ja/boost-ranker.md">Boost Rankerを</a>参照。</li>
<li>JSONフィールドおよび動的フィールドによるグループ化に対応しました<a href="https://github.com/milvus-io/milvus/pull/43203">。</a></li>
<li>既存のコレクションで動的スキーマを有効にするサポートを追加しました<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)。</li>
<li>コレクションを解放せずにインデックスを削除できるようになった<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>[StorageV2] ログファイルのサイズを圧縮サイズに変更した<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] ロード情報に子フィールドを追加した<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] パーティションとクラスタリングキーをシステムグループに含めるようにした<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>コンパクションタスクのタイムアウトを削除<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Azureとのビルドを可能にした(<a href="https://github.com/milvus-io/milvus/pull/44177">#44177</a>)</li>
<li>[StorageV2] ロジックの使用量を見積もるためにグループ情報を使用するようにした<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] 使用量の見積もりにグループ分割情報を利用<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] カラムグループの結果を圧縮時に保存するように変更<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] サイズベースの分割ポリシーの設定を追加<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] スキーマベースおよびサイズベースの分割ポリシーに対応<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] 設定可能な分割ポリシーを追加しました<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] メトリックと設定を追加しました<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)。</li>
<li>セグメントをロードする前にすべてのインデックスの準備が整うのを待つようにした<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>rescore ノードの内部コア待ち時間の指標を追加しました<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)。</li>
<li>KVパラメータを印刷する際のアクセスログフォーマットを最適化した<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>ダンプスナップショットのバッチサイズを変更する設定を追加<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>コンパクションタスクのクリーンアップ間隔を短縮<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>複数フィールドをサポートするようにマージソートを強化した<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>階層化インデックスの負荷リソースの見積もりを追加した<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>重複排除の場合の自動インデックス設定を追加した(<a href="https://github.com/milvus-io/milvus/pull/44186">#44186</a>)</li>
<li>名前にカスタム文字を許可する設定を追加した(<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>ストリーミングサービスのcchannelをサポートした<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>同時削除を保護するためにミューテックスと範囲チェックを追加した(<a href="https://github.com/milvus-io/milvus/pull/44128">#44128</a>)</li>
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
<li>exists式のブルートフォースとインデックスの動作を揃えた<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>ドロップされたコレクションへのリネーム時のエラーを修正した<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] 子フィールドの長さをチェックするようにした<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Azureをデフォルトで有効にした(<a href="https://github.com/milvus-io/milvus/pull/44377">#44377</a>)</li>
<li>プーリングデータノードのL0コンパクションのアップロードパスを修正した(<a href="https://github.com/milvus-io/milvus/pull/44374">#44374</a>)</li>
<li>データベースの暗号化が有効な場合、名前の変更ができないようにした<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>dynamicfield.enableプロパティの削除を禁止した<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)。</li>
<li>事前割り当てIDが無効な場合、タスクを失敗としてマークするようにした<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)。</li>
<li>PK比較式のMVCCチェックをスキップするようにした<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>統計情報のjson_containsのバグを修正した<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>クエリノードとストリーミングノードの初期化ファイルシステムのチェックを追加した<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)。</li>
<li>セグメントをガベージコレクションした場合に、コンパクション対象が空になる問題を修正した<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)。</li>
<li>タイムスタンプインデックスの初期化時の競合状態を修正した(<a href="https://github.com/milvus-io/milvus/pull/44317">#44317</a>)</li>
<li>パニックを回避するため、arraydataがnilかどうかをチェックするようにした<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)。</li>
<li>ネストされたオブジェクトに対するJSON統計のビルドバグを修正<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>複数のJSONフィールドによるmmapの書き換えを回避した<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>有効なデータフォーマットを統一した<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>埋め込み/再ランキングプロバイダの認証情報をウェブUIで隠蔽<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>プーリングデータノードにおけるstatslogのパスを修正した<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)。</li>
<li>IDFオラクルのパスを修正した<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)。</li>
<li>vchannelが回復していない場合に回復スナップショットのチェックポイントを使用するようにした<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>JSON統計情報のカラム数を制限した(<a href="https://github.com/milvus-io/milvus/pull/44233">#44233</a>)</li>
<li>負荷リソース数をn-gramインデックスにした(<a href="https://github.com/milvus-io/milvus/pull/44237">#44237</a>)</li>
<li>空でない検索結果からメトリックタイプを推測するようにした(<a href="https://github.com/milvus-io/milvus/pull/44222">#44222</a>)</li>
<li>複数セグメントの書き込みが1セグメントしか書き込まれない問題を修正<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>マージソートが範囲外だった問題を修正<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>BM25関数実行前のUTF-8チェックを追加<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>古いセッションが存在する場合に再試行するようにした(<a href="https://github.com/milvus-io/milvus/pull/44208">#44208</a>)</li>
<li>データノードのOOMを防ぐためにKafkaバッファサイズの制限を追加した<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>ロックガード範囲の拡張によるパニックを修正した(<a href="https://github.com/milvus-io/milvus/pull/44130">#44130</a>)</li>
<li>スキーマ変更時に成長しているセグメントがフラッシュされない問題を修正した<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] IOエラーを処理するようにした<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)。</li>
<li>Tantivyインデックスパスが存在しない場合にパニックを起こさないようにした<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)。</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年9月3日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvusバージョン</th><th style="text-align:left">Python SDKバージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.1のリリースを発表できることを嬉しく思います！このバージョンは、以前のリリースにおける主要なアーキテクチャの進歩の上に構築され、運用の安定性、パフォーマンス、運用の堅牢性に焦点を当てた重要な機能拡張を提供します。このリリースでは、コミュニティからの重要なフィードバックに対応し、大規模な展開に対応するシステムを強化しています。より安定した、よりパフォーマンスの高い、より信頼性の高いシステムの恩恵を受けるために、すべてのユーザにアップグレードを強くお勧めします。</p>
<h3 id="Improvements" class="common-anchor-header">改良点<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>リモートストレージ用のPOSIX互換ファイルシステムをサポート<a href="https://github.com/milvus-io/milvus/pull/43944">しました(#43944</a>)。</li>
<li>モデルベースのリランカを導入しました<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)。</li>
<li>主キーフィールドの比較式の性能を最適化しました<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)。</li>
<li>投稿リストからdoc_idを直接収集し、テキストマッチを高速化<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>複数の!=条件を1つのNOT IN句に変換することで問い合わせの性能を最適化した<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>セグメントロード時のキャッシュ層のリソース管理を強化しました<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)。</li>
<li>データロード時の中間インデックスのメモリ予測を改善しました<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)。</li>
<li>中間インデックスの構築比率を設定可能にした<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>ディスクライターに設定可能な書き込み速度制限を追加<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Milvusサービスを再起動することなく、SegCoreパラメータを動的に更新できるようになった(<a href="https://github.com/milvus-io/milvus/pull/43231">#43231</a>)</li>
<li>gRPCのレイテンシメトリクスを統一し、観測性を向上しました<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)。</li>
<li>デバッグを容易にするために、gRPCヘッダにクライアントリクエストのタイムスタンプを含めるようにしました(<a href="https://github.com/milvus-io/milvus/pull/44059">#44059</a>)</li>
<li>segcoreのトレースログレベルをサポートしました<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>より高い可用性のために一貫性保証を調整する設定可能なスイッチを追加しました<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)。</li>
<li>etcd接続の失敗を処理する強固な再ウォッチ機構を実装しました<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)。</li>
<li>内部ノードヘルスチェックロジックを改善した<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>コレクション一覧表示時のメタデータ・アクセスを最適化<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Pulsarクライアントをv0.15.1正式版にアップグレードし、より多くのロギングを追加しました<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>aws-sdkを1.9.234から1.11.352へアップグレード<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>ティッカーコンポーネントの動的インターバル更新をサポート<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>ビットセット操作におけるARM SVE命令セットの自動検出を改善<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>テキストまたはフレーズのマッチに失敗した場合のエラーメッセージを改善<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>ベクトル次元の不一致時のエラーメッセージを改善しました<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>オブジェクトストアが利用できない場合の追加タイムアウトのエラーメッセージを改善<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
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
<li>Parquetファイルのインポート時にOOM（Out-Of-Memory）が発生する可能性があった問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)。</li>
<li>スタンバイノードのリース期限が切れた場合に復旧できない問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)。</li>
<li>コンパクションの再試行状態を正しく処理するようになりました<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)。</li>
<li>連続読み込み要求とインデックス読み込みの間でデッドロックが発生する可能性があった問題を修正<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>高い同時実行環境でデータ削除が失敗する可能性があった不具合を修正<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>テキストおよびJSONインデックスのロード時に競合状態が発生する可能性があった問題を修正<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>QueryCoordの再起動後に発生する可能性のあるノードステータスの不整合を修正しました<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)。</li>
<li>再起動後に "ダーティ "なQueryNodeが適切にクリーンアップされるようにしました<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)。</li>
<li>ペイロードが空でないリクエストの再試行状態が正しく処理されない問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)。</li>
<li>バルクライターv2が正しいバケット名を使用しない問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)。</li>
<li>RESTfulなget_configsエンドポイントから機密項目を隠すことでセキュリティを強化しました<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>woodpeckerのオブジェクトアップロードがタイムアウト再試行中に冪等であるようにした<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>Parquet ファイルからの配列フィールドの NULL 要素のインポートを禁止した<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)。</li>
<li>コレクションエイリアスを作成した後にプロキシキャッシュが無効にならない不具合を修正した<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>ストリーミングノードの内部サービス検出メカニズムを改善しました<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)。</li>
<li>リソースグループのロジックを修正し、ストリーミングノードを正しくフィルタリングできるようにした<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>マルチデータベース環境における命名の衝突を防ぐために、メトリクスにdatabaseNameラベルを追加した(<a href="https://github.com/milvus-io/milvus/pull/43808">#43808</a>)</li>
<li>内部タスクの状態処理におけるロジックエラーを修正した(<a href="https://github.com/milvus-io/milvus/pull/43777">#43777</a>)</li>
<li>内部メトリクスの初期化タイミングを最適化し、潜在的なパニックを回避した(<a href="https://github.com/milvus-io/milvus/pull/43773">#43773</a>)</li>
<li>内部HTTPサーバにおいて、稀にクラッシュする可能性があった問題を修正<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2025年8月6日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvusバージョン</th><th style="text-align:left">Python SDKバージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0が正式にリリースされました！<a href="#v260-rc1">2.6.0-rc</a>1で構築されたアーキテクチャー基盤の上に構築されたこの製品版では、ストレージフォーマットV2、高度なJSON処理、強化された検索機能などの強力な新機能を導入する一方で、多くの安定性とパフォーマンスの問題に対処しています。RC段階でのコミュニティからのフィードバックに基づく広範なバグ修正と最適化により、Milvus 2.6.0は、皆様が探求し、採用する準備が整いました。</p>
<div class="alert warning">
<p>アーキテクチャの変更により、2.6.0以前のバージョンからの直接のアップグレードはサポートされていません。<a href="/docs/ja/upgrade_milvus_cluster-operator.md">アップグレードガイドに従って</a>ください。</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">2.6.0の新機能 (RC以降)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">最適化されたストレージフォーマット v2</h4><p>Milvus2.6では、スカラーとベクトルが混在するデータストレージ、特に非構造化データのポイントルックアップの課題に対応するため、ストレージフォーマットV2を導入しました。この新しい適応型カラム型ストレージフォーマットは "狭いカラムのマージ＋広いカラムの独立 "レイアウト戦略を採用し、ベクターデータベースにおけるポイント検索や小ロットの検索を処理する際のパフォーマンスボトルネックを根本的に解決します。</p>
<p>新しいフォーマットは、I/O増幅を伴わない効率的なランダムアクセスをサポートし、従来採用されていたバニラParquetフォーマットと比較して最大100倍の性能向上を達成しており、分析処理と正確なベクトル検索の両方を必要とするAIワークロードに最適です。さらに、一般的なワークロードではファイル数を最大98%削減できます。主要なコンパクションにかかるメモリ消費量は300%削減され、I/O操作は読み込みで最大80%、書き込みで600%以上最適化される。</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSONフラットインデックス（ベータ）</h4><p>Milvus 2.6では、非常に動的なJSONスキーマを扱うためにJSONフラットインデックスが導入されました。特定のパスとその期待される型を事前に宣言する必要があるJSONパスインデックスとは異なり、JSONフラットインデックスは、与えられたパスの下にあるすべての入れ子構造を自動的に検出し、インデックスを作成します。JSON フィールドのインデックスを作成するとき、JSON Flat Index はサブツリー全体を再帰的に平坦化し、深さや型に関係なく、遭遇するすべてのパスと値のペアに対して転置インデックス エントリを作成します。 この自動平坦化により、JSON Flat Index は、新しいフィールドが警告なしに現れるような進化するスキーマに最適です。例えば、"metadata "フィールドにインデックスを作成した場合、"metadata.version2.features.experimental "のような新しいネストされたフィールドが入力データに現れると、新しいインデックス設定を必要とすることなく、システムが自動的に処理します。</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">コア2.6.0の機能リコール<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>アーキテクチャの変更と2.6.0-RCで導入された機能の詳細については、<a href="#v260-rc1">2.6.0-rc1リリースノートを</a>参照してください。</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">アーキテクチャの簡素化</h4><ul>
<li>ストリーミング・ノード（GA） - WALの集中管理</li>
<li>WoodpeckerによるネイティブWAL - Kafka/Pulsar依存性の除去</li>
<li>統一されたコーディネータ（MixCoord）、IndexNodeとDataNodeの統合 - コンポーネントの複雑さを軽減</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">検索と分析</h4><ul>
<li>RaBitQ 1ビット量子化と高い再現性</li>
<li>フレーズマッチング</li>
<li>MinHash LSHによる重複排除</li>
<li>時間を考慮したランキング機能</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">開発者エクスペリエンス</h4><ul>
<li>データイン、データアウト」ワークフローのための埋め込み関数</li>
<li>オンラインスキーマ進化</li>
<li>INT8ベクトルのサポート</li>
<li>グローバル言語サポートのためのトークナイザーの強化</li>
<li>遅延ロードによるキャッシュ層 - メモリより大きなデータセットを処理</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年6月18日</p>
<table>
<thead>
<tr><th style="text-align:center">Milvusバージョン</th><th style="text-align:center">Python SDKバージョン</th><th style="text-align:center">Node.js SDKバージョン</th><th style="text-align:center">Java SDKバージョン</th><th style="text-align:center">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1は、デプロイの複雑さを軽減することで、運用効率、リソース利用率、総所有コストを改善するように設計された、簡素化されたクラウドネイティブなアーキテクチャを導入しています。このリリースでは、パフォーマンス、検索、開発に重点を置いた新機能が追加されています。主な機能には、パフォーマンス向上のための高精度1ビット量子化（RaBitQ）とダイナミックキャッシュレイヤー、高度な検索のためのMinHashと高精度フレーズマッチングによる重複検出、開発者のエクスペリエンスを向上させるオンラインスキーマ修正による自動埋め込み機能などがあります。</p>
<div class="alert note">
<p>これはMilvus 2.6.0のプレリリースバージョンです。最新機能をお試しいただくには、このバージョンを新規にインストールしてください。Milvus v2.5.x以前から2.6.0-rc1へのアップグレードはサポートされていません。</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">アーキテクチャの変更<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>2.6以降、Milvusはパフォーマンス、スケーラビリティ、使いやすさの向上を目的とした大幅なアーキテクチャの変更を導入しています。詳細については、<a href="/docs/ja/architecture_overview.md">Milvusアーキテクチャの</a>概要をご参照ください。</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">ストリーミングノード (GA)</h4><p>以前のバージョンでは、ストリーミングデータはProxyによってWALに書き込まれ、QueryNodeとDataNodeによって読み込まれていました。このアーキテクチャでは、書き込み側でコンセンサスを得ることが難しく、読み込み側では複雑なロジックが必要でした。さらに、クエリデリゲータはQueryNodeにあり、スケーラビリティを妨げていました。Milvus 2.5.0ではストリーミングノードが導入され、バージョン2.6.0ではGAとなった。このコンポーネントは現在、すべてのシャードレベルのWALリード/ライトオペレーションを担当し、クエリデリゲータとしても機能し、前述の問題を解決し、新たな最適化を可能にします。</p>
<p><strong>重要なアップグレードのお知らせ</strong>Streaming Nodeは重要なアーキテクチャの変更であるため、以前のバージョンからMilvus 2.6.0-rc1への直接のアップグレードはサポートされていません。</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WoodpeckerネイティブWAL</h4><p>Milvusはこれまで、WALをKafkaやPulsarのような外部システムに依存していました。これらのシステムは機能的ではありましたが、特に小規模から中規模のデプロイメントにおいては、運用の複雑さとリソースのオーバーヘッドが大きくなっていました。Milvus 2.6では、これらは専用に構築されたクラウドネイティブなWALシステムであるWoodpeckerに置き換えられました。Woodpeckerはオブジェクトストレージ用に設計されており、ローカルとオブジェクトストレージベースのゼロディスクモードの両方をサポートし、パフォーマンスとスケーラビリティを向上させながらオペレーションを簡素化します。</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">データノードとインデックスノードの統合</h4><p>Milvus 2.6では、コンパクション、バルクインポート、統計収集、インデックス構築などのタスクが統一されたスケジューラによって管理されるようになりました。これまでDataNodeが担当していたデータ永続化機能はStreaming Nodeに移されました。デプロイとメンテナンスを簡素化するため、IndexNodeとDataNodeは単一のDataNodeコンポーネントに統合されました。この統合されたノードがこれらの重要なタスクをすべて実行し、運用の複雑さを軽減し、リソースの利用を最適化します。</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">コーディネーターのMixCoordへの統合</h4><p>以前の設計では、RootCoord、QueryCoord、DataCoordの各モジュールが独立していたため、モジュール間の通信が複雑になっていました。システム設計を簡素化するため、これらのコンポーネントはMixCoordと呼ばれる単一の統一されたコーディネータに統合された。この統合により、ネットワークベースの通信を内部関数呼び出しに置き換えることで、分散プログラミングの複雑さが軽減され、より効率的なシステム運用と開発・保守の簡素化が実現しました。</p>
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1ビット量子化</h4><p>大規模なデータセットを扱うために、1ビット量子化はリソースの利用率と検索性能を向上させる効果的な手法です。しかし、従来の手法は想起に悪影響を与える可能性があります。Milvus 2.6では、元の研究著者との協力により、1ビット圧縮のリソースと性能の利点を提供しながら、高い検索精度を維持する1ビット量子化ソリューションであるRaBitQを導入しています。</p>
<p>詳細は<a href="/docs/ja/ivf-rabitq.md">IVF_RABITQを</a>参照。</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON機能の強化</h4><p>Milvus 2.6では、JSONデータ型のサポートが強化され、以下の点が改善されました：</p>
<ul>
<li><strong>パフォーマンス</strong>：JSONパスインデックスが正式にサポートされ、JSONオブジェクト内の特定のパス(例:<code translate="no">meta.user.location</code>)に対して転置インデックスを作成できるようになりました。これにより、オブジェクトのフルスキャンが回避され、複雑なフィルタを使用したクエリの待ち時間が改善されます。</li>
<li><strong>機能性</strong>：より複雑なフィルタリングロジックをサポートするために、このリリースでは、<code translate="no">JSON_CONTAINS</code> 、<code translate="no">JSON_EXISTS</code> 、<code translate="no">IS NULL</code> 、<code translate="no">CAST</code> 関数のサポートが追加されました。 先を見据えて、JSONのサポートに関する作業は続いています。今後の正式リリースでは、<strong>JSONシュレッダーや</strong> <strong>JSON FLATインデックスなど</strong>、さらに強力な機能を搭載し、高度にネスト化されたJSONデータのパフォーマンスを劇的に改善するよう設計されています。</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">アナライザ/トーケナイザ機能の強化</h4><p>このリリースでは、アナライザーとトーケナイザーのいくつかの更新により、テキスト処理機能が大幅に強化されました：</p>
<ul>
<li>新しい<a href="/docs/ja/analyzer-overview.md#Example-use">Run Analyzer</a>構文を使用して、トークナイザ設定を検証できます。</li>
<li><a href="/docs/ja/lindera-tokenizer.md">Lindera トークナイザが</a>統合され、日本語や韓国語などのアジア言語のサポートが向上しました。</li>
<li>行レベルのトークナイザ選択がサポートされ、多言語シナリオのフォールバックとして汎用<a href="/docs/ja/icu-tokenizer.md">ICUトークナイザが</a>利用できるようになりました。</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">エンベッディング機能によるデータイン、データアウト</h4><p>Milvus2.6では、サードパーティのエンベッディングモデル（例：OpenAI、AWS Bedrock、Google Vertex AI、Hugging Face）と直接統合することで、AIアプリケーション開発を簡素化する「データイン、データアウト」機能を導入しました。Milvusは指定されたモデルサービスを自動的に呼び出し、テキストをリアルタイムでベクトルに変換します。これにより、ベクター変換パイプラインを別途用意する必要がなくなりました。</p>
<p>詳しくは、<a href="/docs/ja/embedding-function-overview.md">埋め込み機能の概要を</a>ご覧ください。</p>
<h4 id="Phrase-Match" class="common-anchor-header">フレーズマッチ</h4><p>Phrase Matchは、クエリに含まれる単語の正確なシーケンスが、ドキュメント内で連続して正しい順序で出現した場合にのみ結果を返すテキスト検索機能です。</p>
<p><strong>主な特徴</strong></p>
<ul>
<li>順序依存：単語はクエリと同じ順序で現れる必要があります。</li>
<li>連続一致：スロップ値が使用されない限り、単語は隣り合っていなければならない。</li>
<li>Slop（オプション）：あいまいなフレーズ・マッチングを可能にするため、単語間の間隔を少数にできる調整可能なパラメータ。</li>
</ul>
<p>詳細は「<a href="/docs/ja/phrase-match.md">フレーズ一致</a>」を参照。</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSHインデックス（ベータ版）</h4><p>Milvus 2.6では、モデル学習におけるデータ重複排除の必要性に対応するため、MINHASH_LSHインデックスをサポートしています。この機能は、計算効率が高くスケーラブルな方法で文書間のJaccard類似度を推定し、重複に近い文書を特定します。ユーザーは、前処理中にテキスト文書に対してMinHashシグネチャを生成し、MilvusでMINHASH_LSHインデックスを使用することで、大規模データセットから類似コンテンツを効率的に検索し、データクリーニングとモデル品質を向上させることができる。</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">時間を考慮したディケイ関数</h4><p>Milvus 2.6では、時間の経過とともに情報の価値が変化するシナリオに対応するため、時間を考慮した減衰関数を導入しています。結果の再ランク付けの際に、ユーザーはタイムスタンプフィールドに基づいて指数関数、ガウス関数、線形減衰関数を適用し、ドキュメントの関連性スコアを調整することができます。これは、ニュースフィード、eコマース、AIエージェントのメモリなどのアプリケーションにとって重要です。</p>
<p>詳細については、<a href="/docs/ja/decay-ranker-overview.md">Decay Rankerの概要を</a>参照してください。</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">オンライン・スキーマ進化のためのフィールド追加</h4><p>スキーマの柔軟性を高めるため、Milvus 2.6では既存のコレクションのスキーマに新しいスカラーフィールドをオンラインで追加できるようになりました。これにより、アプリケーションの要件が変更された場合に、新しいコレクションを作成し、破壊的なデータ移行を実行する必要がなくなります。</p>
<p>詳細は、<a href="/docs/ja/add-fields-to-an-existing-collection.md">既存のコレクションへのフィールドの追加を</a>参照してください。</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8ベクトルサポート</h4><p>Milvus2.6では、8ビット整数のエンベッディングを生成する量子化モデルの使用が増加していることに対応し、INT8ベクトルのネイティブデータ型のサポートを追加しました。これにより、ユーザーはこれらのベクトルを量子化せずに直接取り込むことができ、計算、ネットワーク帯域幅、ストレージのコストを削減することができます。この機能は、当初はHNSWファミリーのインデックスでサポートされます。</p>
<p>詳細については、<a href="/docs/ja/dense-vector.md">Dense Vectorを</a>参照してください。</p>
