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
    </button></h1><p>Milvusの新機能をご確認ください！このページでは、各リリースの新機能、改善点、既知の問題、バグ修正についてまとめています。v2.5.0以降の各バージョンのリリースノートはこのセクションにあります。定期的にこのページをご覧いただき、アップデート情報をご確認ください。</p>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Milvus 2.5.11のリリースをお知らせいたします！このバージョンでは、マルチアナライザー機能やトークナイザーの拡張サポート（Jieba、Lindera、ICU、Language Identifier）などの強力な新機能が追加されました。また、動的なセグメント読み込みスレッドプールの更新や、binlogインポート時の最適化された削除フィルタリングなど、いくつかの改良が加えられました。主なバグ修正として、セグメントドロップの可能性のある問題、BM25検索の失敗、JSON統計のフィルタリングエラーがあります。</p>
<p>2.5.11へのアップグレードをお勧めします！</p>
<h3 id="Features" class="common-anchor-header">機能</h3><ul>
<li>多言語サポートのために複数のアナライザー（トークナイザー）を設定し、入力データの命令に基づいて適切なアナライザーを選択する機能を追加しました<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>)。</li>
<li>BM25アナライザーの機能を強化した<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>)。<ul>
<li>トークン化結果の解析に役立つドライラン用のAPI（<code translate="no">run_analyzer</code> ）を導入。詳細は<a href="/docs/ja/analyzer-overview.md">アナライザーの概要を</a>参照。</li>
<li>トークナイザー<ul>
<li>Jiebaトークナイザー・パラメーターのカスタマイズに対応しました。</li>
<li>Linderaトークナイザーのサポートを追加しました。詳細については、「<a href="/docs/ja/lindera-tokenizer.md">Lindera</a>」を参照してください。</li>
<li>ICUトークナイザーに対応しました。詳細は<a href="/docs/ja/icu-tokenizer.md">ICUを</a>ご参照ください。</li>
<li>言語検出のための言語識別子トークナイザーを追加しました。</li>
</ul></li>
<li>フィルター<ul>
<li>組み込みのストップワードフィルターの言語サポートを拡張しました。詳細は「<a href="/docs/ja/stop-filter.md">ストップ</a>」を参照。</li>
<li>句読点を除去する<code translate="no">remove_punct</code> フィルタを追加しました。詳しくは、<a href="/docs/ja/removepunct-filter.md">句読点の除去を</a>ご覧ください。</li>
<li>パターン ベースのテキスト フィルタリングのための<code translate="no">regex</code> フィルタを追加しました。詳しくは、<a href="/docs/ja/regex-filter.md">正規表現を</a>ご覧ください。</li>
</ul></li>
</ul></li>
<li>配列フィールドの最大容量の変更に対応しました<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>)。</li>
<li>JSONパスインデックスでバイナリ範囲式をサポートしました<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>)。</li>
<li>JSON統計情報において、infixおよびsuffixマッチタイプをサポートしました<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>)。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>セグメント読み込みスレッドプールのサイズを動的に更新できるようにした<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>)。</li>
<li>binlogインポート時の削除フィルタを高速化した<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>)。</li>
<li>式フィルター比率の監視パラメータを追加した<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>)。</li>
<li>インデックスを強制的に最新版に再構築する設定オプションを追加した<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>)。</li>
<li>リストポリシーのエラーログメッセージを改善した<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>)。</li>
<li>gRPCメタデータヘッダのハイフンの処理を調整した<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>)。</li>
<li>CVEsに対処するため、Goのバージョンを1.24.1に更新した<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>,<a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>)。</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>パーティションのドロップ時にセグメントが正しくドロップされない場合がある問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>)。</li>
<li>一括挿入で、スキーマのフィールドリストではなく、関数ランナーの入力フィールドリストを使用するように修正しました<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>)。</li>
<li><code translate="no">avgdl</code> （平均文書長）がNaNの場合にBM25検索に失敗する問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>)。</li>
<li>QueryNodeメトリクスの不正確なラベルを修正しました<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>)。</li>
<li>データに空のマップが含まれる場合に、JSON統計情報のインデックス作成に失敗する問題を修正した<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>)。</li>
<li><code translate="no">AlterCollection</code> APIにおいて、修正タイムスタンプを正しく保存するように修正した<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>)。</li>
<li><code translate="no">ConjunctExpr</code> 、JSON統計情報における断続的なフィルタリングエラーを修正し、 JSON統計情報の構築を高速化するためにタスクスロットの計算ロジックを改善した<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>)。</li>
<li>BM25の統計情報計算におけるIDFオラクルのリークを修正しました<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>)。</li>
<li>シャード番号の検証において、事前に作成されたトピックが最初にチェックされるようにした<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>)。</li>
<li>ユニットテストで発生する誤ったデッドロックレポートを修正した<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>)。</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年4月21日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10では、検索およびロード性能の向上、メトリックスレポートの強化、メトリックス計算を高速化するためのSVEサポートの拡張が行われています。このリリースでは、安定性と正しさを向上させる複数のバグ修正も含まれています。Milvusをより良いものにするために、皆様からのフィードバックは非常に貴重です！</p>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>存在しないインデックスのインデックスメトリクスの報告を無視するようになりました<a href="https://github.com/milvus-io/milvus/pull/41296">。</a></li>
<li>転置インデックスが存在する場合でもLIKEのスキャンモードを使用するように<a href="https://github.com/milvus-io/milvus/pull/41309">なりました</a>。</li>
<li>LIKE式の性能を最適化しました<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)。</li>
<li>インデックスの書式を最適化し、ロード性能を改善した<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful: デフォルトのタイムアウトを設定可能にした<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)。</li>
<li>FP16 / NY関数におけるL2メトリック計算のSVEサポートを有効にした<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>文字列フィルタでJSONインデックスが機能しない問題を修正<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>事前チェックでベクトルフィールド以外の次元チェックをスキップするようにした<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>コレクションの変更でスキーマが正しく更新されるようになった<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>macOSビルドを修正するためにknowhereのバージョンを更新しました<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)。</li>
<li>セグメントインデックスの初期化が完了する前にインデックスがリストされる場合のパニックを回避<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>ログレベルを変更することによるパフォーマンス低下の解決<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>ワーカークライアントを削除する前にクライアントを閉じるようにした<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2025年4月11日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDK バージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.9を発表することができ、JSONキー統計のパフォーマンス向上、インデックス機能の強化、そして安定性とデータハンドリングを強化するいくつかの重要なバグフィックスがもたらされました。また、Milvusの更なる改良のため、皆様からのフィードバックをお待ちしております。</p>
<h3 id="Improvements" class="common-anchor-header">改善点</h3><ul>
<li>重み付け再ランカーのスコア正規化をスキップできるようになりました<a href="https://github.com/milvus-io/milvus/pull/40905">。</a></li>
<li>ドキュメントを一括して追加することで、JSONキー統計情報構築のパフォーマンスを改善した<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li><code translate="no">int8</code>/<code translate="no">int16</code> 要素型の配列インデックスを作成する際に<code translate="no">int32</code> を使用するようにした<a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li><code translate="no">exists</code> 式におけるブルートフォース検索結果をJSONインデックスの挙動に合わせる<a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>クライアントがtraceIDを送信した場合にtraceIDが混乱する問題を修正した<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li><code translate="no">noexcept</code> の不正な使用によるクラッシュの可能性を修正しました。</li>
<li>残高の一時停止後に発生する正常な残高の無限ループを修正しました<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)。</li>
<li>コレクションがカスタム権限グループに付与されたオブジェクトに対応<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>レプリケートチャンネルのポジションを取得できない問題を修正<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>RESTfulのタイムアウトによるスレッドリークの可能性を修正<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>バッチスキップモードにクリアビットマップを追加<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>ローカルモードのリモートストレージでインデックスタイプの削除に失敗する問題を修正した<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>配列の<code translate="no">isNull</code> 演算子に<code translate="no">element_type</code> を使用するようにした<a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>正確なレポート作成のため、メトリクスのリセットを削除した<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li><code translate="no">null</code> のデータが<code translate="no">null</code> の式でフィルタリングされない不具合を修正<a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>シールポリシーにおいて、開始位置のないセグメントの成長を無視するようにした(<a href="https://github.com/milvus-io/milvus/pull/41131">#41131</a>)。</li>
<li>再試行時に元の検索/クエリリクエストを更新しないようにした(<a href="https://github.com/milvus-io/milvus/pull/41127">#41127</a>)</li>
<li><code translate="no">LoadArrowReaderFromRemote</code> が例外パスで実行された場合のセグメンテーションフォールトを修正<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>手動バランスとバランスチェックの問題に対処<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>遅延<code translate="no">DescribeCollection</code> を使用した JSON 統計において、検証されたスキーマが<code translate="no">nil</code> にならない問題を修正<a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>2つの列を比較する際のカーソル移動の不具合を修正した<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>mmap が開いている状態で<code translate="no">null</code> と非 NULL 配列の両方を挿入するとクラッシュする問題を修正<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>arm64 コンパイルの問題を修正<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>インデックスの成長による挿入/ロード操作のブロックを回避するためのバイパススレッドプールモードを追加しました<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)。</li>
<li>JSONフォーマットのエラーを修正<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li><code translate="no">http.enablepprof</code> が false の場合に WebUI で 404 エラーが発生する問題を修正<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2025年4月1日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>JSON式、UTF-8バリデーション、メモリ使用量、バランシングロジックの強化を特徴とするMilvus 2.5.8のリリースを発表できることを嬉しく思います。このバージョンには、同時実行性とデータハンドリングを改善するための複数の重要なバグ修正も含まれています。また、皆様からのフィードバックは、Milvusの継続的な改良に役立たせていただきます！</p>
<h3 id="Features" class="common-anchor-header">機能</h3><ul>
<li>JSON<code translate="no">null</code>/<code translate="no">exists</code> 式のサポート<a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>一括挿入におけるParquet構造体からのスパースベクトルの解析に対応しました<a href="https://github.com/milvus-io/milvus/pull/40874">。</a></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>行数が最大のコレクションを最初にバランスするようにしました<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)。</li>
<li>インポート時のUTF-8文字列検証をサポートしました<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)。</li>
<li>すべてのVARCHARフィールドのUTF-8検証を追加した<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>ハイブリッド検索が出力フィールドとしてPKのみを要求する場合、再問い合わせを回避<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>配列ビューを改良し、メモリ使用量を最適化した<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>自動バランシングのためのトリガー間隔設定を追加しました<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)。</li>
<li>複数のOR式をIN式に変換<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>詳細な手動コンパクション基準をサポート(<a href="https://github.com/milvus-io/milvus/pull/40924">#40924</a>)</li>
<li>監査ロギングのために生のトークンを保持するようにした(<a href="https://github.com/milvus-io/milvus/pull/40867">#40867</a>)</li>
<li>DataCoordメタミューテックスの使用を最適化<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)。</li>
<li><code translate="no">MsgDispatcher</code> でバッチサブスクリプションを導入した<a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)。</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>NULL可能な入力や成長するmmapデータ型に関するクラッシュを修正した<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)。</li>
<li>ビンログIDの重複による削除操作のデータ損失の可能性を修正<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>)、<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li><code translate="no">GetSegmentsIndexStates</code> 、コレクション作成時の挿入によるパニックを回避するため、フィールドインデックスロックを追加した<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)。</li>
<li>Rocksmqコンシューマ登録における同時実行問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)。</li>
<li>セグメントロード時にすべての子デルタログを取得するようにした(<a href="https://github.com/milvus-io/milvus/pull/40957">#40957</a>)</li>
<li><code translate="no">iterative_filter</code> が指定された場合に JSON インデックスを使用すると誤った結果が得られる問題を修正した (<a href="https://github.com/milvus-io/milvus/pull/40946">#40946</a>)。</li>
<li><code translate="no">exists</code> 操作の優先度を高くした<a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)。</li>
<li>リデュース中の<code translate="no">WithGroupSize</code> を修正した<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)。</li>
<li>セグメントサイズの増加に比例してスロット数を増やすようにした(<a href="https://github.com/milvus-io/milvus/pull/40862">#40862</a>)</li>
<li>エンキュー前にタスクキュー時間を設定するようにした(<a href="https://github.com/milvus-io/milvus/pull/40853">#40853</a>)</li>
<li>データノードにおけるチャネルの不均衡を修正(<a href="https://github.com/milvus-io/milvus/pull/40854">#40854</a>)</li>
<li>タスクスロットのデフォルト設定を正しく設定<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK：行ベースの挿入でFieldSchemaに従ってNULL可能なフラグを設定するようにしました<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)。</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年3月21日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Milvus 2.5.7のリリースを発表できることを大変嬉しく思っております。これにより、動的カラムやJSONカラムに転置インデックスを構築し、クエリのパフォーマンスを大幅に向上させることができます。この新機能と並行して、信頼性の向上、より洗練されたエラー処理、使い勝手の向上のための数多くの機能強化やバグ修正が行われました。Milvusの改良を続けていくにあたり、皆様からのフィードバックをお待ちしております！</p>
<h3 id="Features" class="common-anchor-header">機能</h3><ul>
<li><strong>JSONパスインデックス</strong>：Milvus 2.5.7では、動的スキーマに対するユーザーニーズに対応するため、動的カラムとJSONカラムにインデックスを作成する機能を導入しました。この機能により、特定のダイナミックカラムまたはJSONパスに対して転置インデックスを作成することができ、低速なJSONロードプロセスを効果的にバイパスし、クエリパフォーマンスを大幅に向上させることができます。詳細については、<a href="/docs/ja/use-json-fields.md">JSONフィールドを</a>参照してください。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>接続式のサブ式の順序を変更しました<a href="https://github.com/milvus-io/milvus/pull/40186">。</a></li>
<li><code translate="no">interimindex</code> 、洗練されたモードをサポートするための設定オプションを追加しました<a href="https://github.com/milvus-io/milvus/pull/40429">。</a></li>
<li>WA全体の計算に正しいカウンタメトリックを使用するようにした<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>セグメントプルーン設定を更新可能にした(<a href="https://github.com/milvus-io/milvus/pull/40632">#40632</a>)。</li>
<li>L0のブロックに基づくチャネルシールポリシーを追加<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>タスクのメタデータをキーレベルでロックできるようにした(<a href="https://github.com/milvus-io/milvus/pull/40353">#40353</a>)</li>
<li>メトリクスから不要なコレクションラベルとパーティションラベルを削除<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>インポートエラーメッセージの改善<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li><code translate="no">httpserver</code> 、本文のバイトスライスを文字列に変換しないようにした<a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)。</li>
<li>削除メッセージの開始位置を記録するようにした<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)。</li>
<li>新しい<code translate="no">GetSegmentsInfo</code> インターフェースでセグメントビンログの取得をサポート<a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>ビンログファイルをインポートする際に<code translate="no">newInsertDataWithFunctionOutputField</code> を使用するようにした<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>コレクション作成時にmmapプロパティの適用に失敗する問題を修正<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>サンプリング失敗時にセントロイドファイルを削除せず、GCを待つように修正<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>シーク中のメッセージロス問題を修正<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>メインディスパッチャの後のラグターゲットを削除<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>すべてのバッチループにクリアビットマップ入力を追加<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li><code translate="no">GetSegmentIndexes</code> を RLock で保護した<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)。</li>
<li>空のベクトルデータセットの取得によるセグメンテーションフォールトを回避<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>JSONインデックスの "not-equal "フィルタを修正した(<a href="https://github.com/milvus-io/milvus/pull/40648">#40648</a>)。</li>
<li>転置インデックスにおけるNULLオフセットの読み込みを修正<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li><code translate="no">jsonKey</code> statsのガベージクリーンアップロジックを修正し、JSON key statsフィルタを改善した<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)。</li>
<li>無効なJSONポインタエラーを捕捉するようにした<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>ポリシーの一覧表示において、RBACスター権限を空で返すようにした<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>QueryNodeにおいて、スキーマにフィールドが存在しない場合のパニックを回避した<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>検索/問い合わせにおける参照コレクションの問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)。</li>
<li>スパースベクタの空行を処理するようにした<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>コレクション作成時の型/インデックスパラメータの重複チェックを追加<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>データ競合を回避するため、<code translate="no">metaHeader</code> をクライアントに移動した<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>)。</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2025年3月10日</p>
<table>
<thead>
<tr><th>milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Milvus2.5.6のリリースを発表できることを嬉しく思います。ツールチェイン、ロギング、メトリクス、配列ハンドリングが強化され、信頼性とパフォーマンスを向上させるための複数のバグフィックスも含まれています。このアップデートには、洗練された同時実行処理、より堅牢なコンパクションタスク、その他の重要な改良が含まれています。ぜひアップグレードをお試しください。また、Milvusの継続的な改善のため、皆様からのフィードバックをお待ちしております！</p>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>Goツールチェーンを1.22.7にアップグレードしました<a href="https://github.com/milvus-io/milvus/pull/40399">。</a></li>
<li>Rustのバージョンを1.83に更新しました<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Etcdのバージョンを3.5.18に更新しました<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>非NULL配列の要素タイプのみをチェックするように<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>リソースグループハンドラのデバッグログを削除 (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>gRPCリゾルバのロギングを改善した<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>非同期CGOコンポーネントのメトリクスを追加した<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)。</li>
<li>コレクションがリリースされた後にシャードのロケーションキャッシュを削除するようにした<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>有効性の無視による配列の破損を修正した<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)。</li>
<li><code translate="no">null</code> 式が JSON フィールドに対して動作しない問題を修正した<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)。</li>
<li>NULL可能なフィールドでTantivyを構築した場合に、誤ったオフセットが格納される問題を修正<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>ゼロセグメントに対する統計情報の実行をスキップするようにした(<a href="https://github.com/milvus-io/milvus/pull/40449">#40449</a>)。</li>
<li>配列のメモリサイズの見積もりを修正<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>ナップザックポインタを渡すようにした<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)。</li>
<li>一括挿入時のクラッシュ問題を修正<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>メインディスパッチャを適切に終了させることで、メッセージストリームのリークを防止した<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)。</li>
<li><code translate="no">null</code> オフセットの同時実行に関する問題を修正<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>)、<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li><code translate="no">import end ts</code> の解析を修正した<a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)。</li>
<li><code translate="no">InitMetaCache</code> 関数のエラー処理と単体テストの改善<a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li><code translate="no">CreateIndex</code> 、パラメータの重複チェックを追加した<a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>サイズが最大制限を超えた場合にコンパクションタスクが発生しない問題を解決<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>不可視セグメントに対するストリームからの重複消費を修正した(<a href="https://github.com/milvus-io/milvus/pull/40318">#40318</a>)</li>
<li>CMake 変数を<code translate="no">knowhere-cuvs</code> に切り替えるように変更した(<a href="https://github.com/milvus-io/milvus/pull/40289">#40289</a>)。</li>
<li>RESTful経由でのDBプロパティの削除に失敗する問題を修正した<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li><code translate="no">OperatePrivilegeV2</code> APIで異なるメッセージタイプを使用するようにした<a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>タスクデルタキャッシュのデータ競合を修正した<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>タスクIDの重複によるタスクデルタキャッシュのリークを修正した(<a href="https://github.com/milvus-io/milvus/pull/40184">#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日2025年2月26日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5では、1つのクラスタがサポートできるコレクション数とパーティション数が大幅に改善されました。10Kのコレクションと100KのパーティションでMilvusを実行することが十分に可能になりました。このリリースでは、マッチ統計の欠落や多段クエリにおけるデッドロックの問題など、いくつかの重大なバグにも対処しています。さらに、多くの観測性とセキュリティの強化も含まれています。Milvus 2.5.xを使用している全てのユーザは、できるだけ早くアップグレードすることを強く推奨します。</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">依存関係のアップグレード</h3><p>いくつかのCVEを修正するため、ETCD 3.5.18にアップグレードしました。</p>
<ul>
<li>[2.5] raftをcuvsに更新しました<a href="https://github.com/milvus-io/milvus/pull/39221">。</a></li>
<li>[2.5] Knowhereのバージョンを更新しました<a href="https://github.com/milvus-io/milvus/pull/39673">。</a></li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">重大なバグ</h3><ul>
<li>[2.5] textmatchindexのNULLオフセットファイルに<code translate="no">text_log</code> プレフィックスを使用するようにした<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] デッドロックを回避するために、多段タスクにサブタスクプールを追加しました<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>[2.5] タスクスケジューラのデッドロックを修正<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] 同じインデックスが複数作成される競合状態を修正 (<a href="https://github.com/milvus-io/milvus/pull/40180">#40180</a>)</li>
<li>[2.5] 重複した名前のコレクションが作成される問題を修正<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>NULL 式の検索に失敗する問題を修正<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] プレフィックスにワイルドカードが含まれる場合にプレフィックスマッチに失敗する不具合を修正<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>HTTPリクエストがタイムアウトした場合に、サブコンテキストのカスケードをキャンセルするように修正<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] reduceタスクのタスクデルタキャッシュリークを修正<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] コーナーケースにおけるquerycoordパニックを修正<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] isbalanced関数を強化し、引用符のペアを正しくカウントするようにした<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] コンパクションタスクの実行時に負の-1が発生する問題を修正<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] セグメントが密封状態からフラッシュ状態に移行しない場合があるバグを修正<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>pkインデックスのロード時に主キーインデックスの作成をスキップする問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39969">#39969</a>) [2.5] ソート後のセグメントが0の場合にテキストインデックスの作成をスキップする問題を修正 (<a href="https://github.com/milvus-io/milvus/pull/39969">#39969</a>)</li>
<li>[2.5] 最も古い位置へのシークに失敗する問題を修正<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>hybridsearch で失われたgrowingオプションを無視するように修正<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] altercollectionで一貫性レベルを変更できない問題を修正<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>行数が0の場合にインポートに失敗する問題を修正<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] 長い型のモジュール結果が間違っていたのを修正<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] コンパクショントリガーにライフタイムコンテキストを追加、使用するようにした<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] ターゲットチェックの前にコレクションのリリースをチェックするようにしました<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Rootcoord graceful stopの失敗とCIのリソース制限を修正<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] ロードフィールドとスキーマカラムのサイズチェックを削除<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>,<a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] インデックス作成時のtypeパラメータからmmap.enableパラメータを削除<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] プロパティを削除する際にインデックス名を渡さないようにした (<a href="https://github.com/milvus-io/milvus/pull/39679">#39679</a>)</li>
<li>[2.5] セグメンテーションが成長する結果と封印される結果の両方を返すように修正<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] 並行マップの問題を修正<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] QCタスクテストの競合を解決<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] コンパクションまたはGCが発生した場合にコレクションのロードがスタックする問題を修正<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39759">#39759</a>) [2.5] 実行タスクのデルタキャッシュリークによって引き起こされる不均等な分布を修正 (<a href="https://github.com/milvus-io/milvus/pull/39759">#39759</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39763">#39763</a>) [2.5] ロードpkインデックスをスキップした場合に早期にリターンするように修正 (<a href="https://github.com/milvus-io/milvus/pull/39763">#39763</a>)</li>
<li>[2.5]<code translate="no">common.security.rootShouldBindRole</code> が設定されていても、rootユーザが全てのコレクションを一覧できるように修正 (<a href="https://github.com/milvus-io/milvus/pull/39714">#39714</a>)</li>
<li>[2.5] flowgraphのリークを修正<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39636">#39636</a>) [2.5] setconfigのオーバーレイを回避するためにparam item formatterを使用するようにした (<a href="https://github.com/milvus-io/milvus/pull/39636">#39636</a>)</li>
<li>[2.5] メタストアの特権名を "all "という特権名でチェックするように変更<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] RESTful v1にレートリミッターを追加<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] RESTfulハンドラでハードコードされたパーティション番号を削除<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改善点</h3><h4 id="Observability" class="common-anchor-header">観測可能性</h4><ul>
<li>生データを取得するモニターメトリックを追加<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] ベクトルのレイテンシを取得するメトリクスを追加し、リクエスト制限のエラーメッセージを改良<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] プロキシキューのメトリクスを追加しました<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>より多くのメトリクスデータを公開しました<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] 解析式のメトリクスを追加しました<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] hybridsearchのDSLログフィールドを追加しました<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] インデックスが削除された場合、インデックスメトリクスの更新をスキップするように変更<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] コンポーネントの停止がタイムアウトした場合、pprof情報をダンプするように変更<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] querycoordのバランス状態をチェックする管理APIを追加<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">統計情報/コンパクション/インデックスタスクスケジューラの最適化</h4><ul>
<li>インデックスタスクスケジューラポリシーを改良しました<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)。</li>
<li>[2.5] 統計タスクの生成速度を制限<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>コンパクションスケジュールの設定を追加<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39543">#39543</a>) [2.5] L0コンパクションは同一チャンネルでのみ行うようにしました。</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39509">#39509</a>) [2.5] セグメントローダーの中間インデックスのメモリ見積もりを調整 (<a href="https://github.com/milvus-io/milvus/pull/39509">#39509</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39994">#39994</a>) [2.5] ライフタイムポリシーで、シールセグメントの開始位置を使用するように変更。</li>
<li>タスクが不要になった場合にタスクメタを削除<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] binlogインポート時のオブジェクト一覧を高速化(<a href="https://github.com/milvus-io/milvus/pull/40048">#40048</a>)</li>
<li>コレクションを説明付きで作成できるようにした<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/40118">#40118</a>) [2.5] インデックス要求のタイムアウト間隔を設定に追加<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] proxy.maxTaskNumのデフォルト値を1024に同期(<a href="https://github.com/milvus-io/milvus/pull/40073">#40073</a>)</li>
<li><a href="https://github.com/milvus-io/milvus/pull/40102">2.</a>5] ダンプスナップショットの上限を10wから1wに減少 (<a href="https://github.com/milvus-io/milvus/pull/40102">#40102</a>)</li>
<li>[2.5] バッチpkが存在する場合、文字列からスライスバイトへのコピーを回避<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>インデックスの記述時に設定可能なプロパティを返すようにした<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>特定のポイントにおける式のパフォーマンスを最適化<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] getQueryNodeDistributionの結果フォーマットを最適化<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] 書き込み増幅の観測を可能にしました<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>(<a href="https://github.com/milvus-io/milvus/pull/39839">#39839</a>) [2.5] RESTful v2での検索時にtop-kの結果を返すようにした (<a href="https://github.com/milvus-io/milvus/pull/39839">#39839</a>)</li>
<li>[2.5][GoSDK] withEnableMatch構文糖を追加<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] 中間インデックスが異なるインデックスタイプとより多くのデータ型(FP16/BF16)をサポート<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] masterブランチからのGoSDKコミットを同期しました<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>ブロードキャスターのメモリとメタの一貫性を維持<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>イベントベースの通知でブロードキャストするようにした<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] スキーマとインデックスチェックのエラーメッセージを洗練<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] スカラーのデフォルト自動インデックスタイプをリセット<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] プレチェック失敗時にL0コンパクションタスクを再キューイング<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年1月23日</p>
<table>
<thead>
<tr><th>milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus2.5.4のリリースを発表できることを嬉しく思います。このリリースでは、主要なパフォーマンス最適化と、PartitionKeyの分離、DAAT MaxScore付きスパースインデックス、強化されたロックメカニズムなどの新機能が導入されています。このリリースの際立ったハイライトは、10,000コレクションと100万パーティションのサポートであり、マルチテナントのユースケースにとって大きなマイルストーンとなります。このバージョンはまた、全体的な安定性と信頼性を向上させる複数のバグに対処しています。Milvusの継続的な改良のため、皆様からのフィードバックをお待ちしております！</p>
<h3 id="Features" class="common-anchor-header">特徴</h3><ul>
<li>PartitionKeyの分離をサポートし、複数のパーティションキーでのパフォーマンスを改善しました<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>)。詳細については、<a href="/docs/ja/use-partition-key.md">パーティションキーの</a>使用を参照してください。</li>
<li>スパースインデックスがDAAT MaxScore<a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015に</a>対応しました。詳細は「<a href="/docs/ja/sparse_vector.md">スパース・ベクトル</a>」を参照してください。</li>
<li>式中の<code translate="no">is_null</code> をサポートしました<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)。</li>
<li>ルート権限をカスタマイズできるように<a href="https://github.com/milvus-io/milvus/pull/39324">なりました(#39324</a>)。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>1クラスタで10Kコレクションと100万パーティションをサポート<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)。</li>
<li>セグメントの差分情報をキャッシュし、クエリコーディネータを高速化<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>メタデータをコレクションレベルで同時に読み込み、障害復旧を高速化<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>QueryNodeにおけるロックの粒度を改良<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>)、<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>NewCollection CGO呼び出しの処理にCStatusを使用することでスタイルを統一した<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)。</li>
<li>パーティションが設定されていない場合、パーティションリミッターの生成をスキップするようにした(<a href="https://github.com/milvus-io/milvus/pull/38911">#38911</a>)</li>
<li>RESTful APIのサポートを追加した<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>メモリ使用量を減らすために、QueryNodeとDataNodeの不要なブルームフィルタを削除しました<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>QueryCoordにおいて、タスク生成、スケジューリング、実行を高速化し、データロードを高速化しました<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>DataCoordにおけるロックを削減し、ロードおよびインサート操作を高速化した<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li><code translate="no">SearchResult</code> および<code translate="no">QueryResults</code> に主フィールド名を追加した<a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)。</li>
<li>ディスククォータ調整基準として、ビンログサイズとインデックスサイズの両方を使用するようにした(<a href="https://github.com/milvus-io/milvus/pull/38844">#38844</a>)</li>
<li>全文検索のメモリ使用量を最適化した knowhere/#1011</li>
<li>スカラインデックスのバージョン管理を追加した<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>不要なコピーを回避することにより、RootCoordからのコレクション情報の取得速度を改善した<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">重大なバグ修正</h3><ul>
<li>インデックスを持つ主キーの検索失敗を修正した<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)。</li>
<li>MixCoordの再起動とフラッシュを同時に実行した場合に発生する可能性のあるデータ損失の問題を修正<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>MixCoordの再起動後に、統計タスクとL0コンパクション間の不適切な同時実行が原因で発生する削除の失敗を修正しました<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>2.4から2.5へのアップグレードにおいて、スカラー逆インデックスの非互換性を修正しました<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)。</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>複数列のロード時に粗いロック粒度に起因する遅いクエリの問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)。</li>
<li>エイリアスを使用するとイテレータが間違ったデータベースを巡回する問題を修正した<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>データベースを変更した場合にリソースグループの更新に失敗する問題を修正した<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>tantivyインデックスがリリース中にインデックスファイルを削除できない問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)。</li>
<li>スレッド数が多すぎるとインデックス作成が遅くなる問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)。</li>
<li>バルクインポート時にディスククォータチェックがスキップされる問題を修正<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>同時実行を制限することにより、メッセージキューのコンシューマが多すぎる場合に 発生するフリーズの問題を解決しました<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)。</li>
<li>大規模なコンパクション中のMixCoordの再起動によるクエリのタイムアウトを修正しました<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)。</li>
<li>ノードのダウンタイムに起因するチャネルの不均衡問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)。</li>
<li>チャネルバランスがスタックする問題を修正。<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>RBACカスタムグループの権限レベルチェックが効かなくなる問題を修正しました<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)。</li>
<li>空のインデックスの行数の取得に失敗する問題を修正した<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)。</li>
<li>小さいセグメントのメモリ推定が間違っていた問題を修正した<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年1月13日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3では、全体的な安定性、信頼性、および使いやすさを向上させるために、重要なバグ修正とパフォーマンスの強化が行われました。このバージョンでは、並行処理の改善、データのインデックス作成と検索機能の強化、いくつかの主要コンポーネントの更新を行い、より堅牢なユーザーエクスペリエンスを実現しています。</p>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li><code translate="no">VARCHAR</code> の主キーに対して<code translate="no">IN</code> フィルタを使用すると、空の結果が返される問題を修正した。<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>クエリ操作と削除操作の並行処理で、不正な結果が返される問題を修正しました。<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>クエリリクエストで<code translate="no">expr</code> が空の場合に反復フィルタリングで発生する不具合を修正しました。<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>設定更新中のディスクエラーにより、デフォルトの設定値が使用される問題を修正した。<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>クラスタリングコンパクションによって削除されたデータが失われる可能性があった問題を修正した。<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>成長中のデータセグメントで、テキストマッチクエリが壊れていた問題を修正した。<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>スパースベクトルでインデックスに元データが含まれていない場合に発生する検索失敗を修正した。<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>クエリとデータロードの同時実行によって発生する可能性のあるカラムフィールドの競合状態を修正しました。<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>nullableまたはdefault_valueフィールドがデータに含まれていない場合に、一括挿入に失敗する問題を修正しました。<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>RESTfulインターフェイスにリソースグループAPIを追加した。<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>ビットセット SIMD メソッドを活用することで、検索パフォーマンスを最適化した。<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>MVCCタイムスタンプが指定された場合、保証タイムスタンプとして使用するようにした。<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>不足していた削除メトリクスを追加した。<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Etcdをv3.5.16に更新。<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>プロトを管理するための新しいGoパッケージを作成した<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)。</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2025年1月3日</p>
<table>
<thead>
<tr><th>milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2では、VARCHARカラムの最大長の変更がサポートされ、インポート時の同時実行、パーティションドロップ、BM25統計処理に関するいくつかの重大な問題が解決されました。安定性とパフォーマンスの向上のため、このバージョンへのアップグレードを強く推奨します。</p>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><ul>
<li>指定されたパスが存在しない場合にのみディスク使用ログを生成するようになりました。<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>VARCHARの最大長を調整するパラメータを追加し、上限を65,535に戻した。<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>式のパラメータ型変換をサポートした。<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>同時実行シナリオにおけるデッドロックの可能性を修正した。<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>NULL値をサポートするフィールドに対してのみindex_null_offsetファイルを生成するようにした。<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>reduceフェーズでfree後のretrieveプランの使用を修正しました。<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>大文字のANDとORを含む式を認識するようにした。<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>ロードに失敗した場合でもパーティションドロップを許可するようにした。<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>インポート時の BM25 統計ファイルの登録に関する問題を修正。<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2024年12月26日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1では、メモリローディング、RBACリスト、クエリノードバランシング、シールされたセグメントインデックスに対応する一連のバグフィックスに重点を置き、同時にWeb UIとインターセプターを改善しました。安定性と信頼性の向上のため、2.5.1へのアップグレードを強くお勧めします。</p>
<h3 id="Improvement" class="common-anchor-header">改善</h3><ul>
<li>Web UI のコレクションとクエリページを更新しました。<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">バグ修正</h3><ul>
<li>ロード予測にメモリ係数を追加することにより、OOM問題を修正した。<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>RootCoord でポリシーを一覧表示する際の特権グループの拡張を修正。<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>特権グループとコレクションのリストに関する問題を修正しました。<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>バランサが同じクエリノードに繰り返し負荷をかけないように修正。<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>QueryCoordの再起動後に予期しないバランスタスクが発生する問題を修正しました。<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>ロード設定の更新がコレクションのロードに適用されない問題を修正しました。<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>データインポート時に読み取りカウントがゼロになる問題を修正。<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>式の JSON キーの Unicode デコードを修正した。<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>2.5 の alterCollectionField のインターセプター DB 名を修正。 <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>BM25 ブルートフォースサーチを使用した場合に、封印されたセグメントのインデックスパラメータが空だったのを修正した。<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2024年12月23日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0は、ベクトル検索や大規模データ管理を扱うユーザーにとって、ユーザビリティ、スケーラビリティ、パフォーマンスを向上させるための大きな進歩をもたらします。本リリースにより、Milvusはタームベース検索、最適化されたクエリのためのクラスタリングコンパクション、スパースおよびデンスベクトル検索メソッドの多目的なサポートといった強力な新機能を統合しました。クラスタ管理、インデックス作成、データ処理の強化により、Milvusは新たなレベルの柔軟性と使いやすさを導入し、より堅牢で使いやすいベクトルデータベースとなりました。</p>
<h3 id="Key-Features" class="common-anchor-header">主な機能</h3><h4 id="Full-Text-Search" class="common-anchor-header">全文検索</h4><p>Milvus2.5はSparse-BM25で実装された全文検索に対応しています！この機能は、Milvusの強力なセマンティック検索機能を補完する重要な機能であり、特に希少語や専門用語が含まれるシナリオで威力を発揮します。以前のバージョンでは、Milvusはキーワード検索シナリオを支援するためにスパースベクトルをサポートしていました。これらのスパースベクトルはSPLADEv2/BGE-M3のようなニューラルモデルやBM25アルゴリズムのような統計モデルによってMilvusの外部で生成されていました。</p>
<p><a href="https://github.com/quickwit-oss/tantivy">Tantivyを</a>搭載したMilvus 2.5は、アナライザとスパースベクトル抽出を内蔵しており、APIは入力としてベクトルを受け取るだけでなく、テキストを直接受け取れるように拡張されています。BM25の統計情報は、データが挿入されるとリアルタイムで更新され、使いやすさと精度が向上します。さらに、近似最近傍（ANN）アルゴリズムに基づくスパース・ベクトルは、標準的なキーワード検索システムよりも強力なパフォーマンスを提供します。</p>
<p>詳細については、<a href="/docs/ja/analyzer-overview.md">Analyzer Overview</a>および<a href="/docs/ja/full-text-search.md">Full Text Searchを</a>ご参照ください。</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">クラスタ管理WebUI（ベータ版）</h4><p>膨大なデータと豊富な機能をより良くサポートするために、Milvusの洗練された設計には様々な依存関係、多数のノードの役割、複雑なデータ構造などが含まれています。このような側面は、使用やメンテナンスに困難をもたらす可能性があります。</p>
<p>Milvus 2.5では、組み込みのクラスタ管理WebUIを導入し、Milvusの複雑な実行環境情報を可視化することで、システムメンテナンスの難易度を下げています。これにはデータベースやコレクション、セグメント、チャネル、依存関係、ノードのヘルスステータス、タスク情報、スロークエリなどの詳細が含まれます。</p>
<p>詳細は<a href="/docs/ja/milvus-webui.md">Milvus WebUIを</a>ご参照ください。</p>
<h4 id="Text-Match" class="common-anchor-header">テキストマッチ</h4><p>Milvus 2.5では、<a href="https://github.com/quickwit-oss/tantivy">Tantivyの</a>アナライザとインデックスを活用してテキストの前処理とインデックスを作成し、特定の用語に基づいたテキストデータの正確な自然言語マッチングをサポートしています。この機能は主に特定の条件を満たすフィルタリング検索に使用され、クエリー結果を絞り込むためにスカラーフィルタリングを組み込むことができ、スカラー条件を満たすベクトル内の類似検索を可能にします。</p>
<p>詳細は<a href="/docs/ja/analyzer-overview.md">アナライザーの概要と</a> <a href="/docs/ja/keyword-match.md">テキストマッチを</a>参照。</p>
<h4 id="Bitmap-Index" class="common-anchor-header">ビットマップインデックス</h4><p>Milvusファミリーに新しいスカラーデータインデックスが追加されました。BitMap インデックスは行数と同じ長さのビットの配列を使用して値の存在を表し、検索を高速化します。</p>
<p>ビットマップインデックスは伝統的に、値の数が少ない、つまり、性別情報を含むカラムの値が男性と女性の2つしかないような、カーディナリティの低いフィールドに有効であった。</p>
<p>詳細は<a href="/docs/ja/bitmap.md">ビットマップインデックスを</a>参照してください。</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullableとデフォルト値</h4><p>Milvusでは、主キーフィールド以外のスカラーフィールドに対して、Null可能なプロパティとデフォルト値を設定できるようになりました。<code translate="no">nullable=True</code> とマークされたスカラーフィールドについては、ユーザはデータ挿入時にフィールドを省略することができます。システムはエラーをスローすることなく、そのフィールドをヌル値またはデフォルト値（設定されている場合）として扱います。</p>
<p>デフォルト値とNULL可能なプロパティはMilvusに大きな柔軟性を与えます。ユーザは、コレクションを作成する際に、不確かな値を持つフィールドに対してこの機能を利用することができます。また、他のデータベースシステムからMilvusへのデータ移行を簡素化し、元のデフォルト値設定を保持したままNULL値を含むデータセットを扱うことができます。</p>
<p>詳細は<a href="/docs/ja/nullable-and-default.md">Nullable &amp; Default Value</a> を参照してください。</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">FaissベースのHNSW SQ/PQ/PRQ</h4><p>Faissコミュニティとの緊密な連携により、FaissのHNSWアルゴリズムは、機能と性能の両面で大幅に改善されました。安定性と保守性を考慮し、Milvus 2.5はHNSWのサポートをhnswlibからFaissに正式に移行しました。</p>
<p>Faissに基づき、Milvus 2.5はHNSWの複数の量子化方式をサポートし、様々なシナリオのニーズに応えます：SQ (Scalar Quantizers)、PQ (Product Quantizer)、PRQ (Product Residual Quantizer)です。SQとPQはより一般的で、SQは優れたクエリ性能と構築速度を提供し、PQは同じ圧縮率でより優れたリコールを提供する。多くのベクトルデータベースでは、SQ量子化の単純な形式であるバイナリ量子化が一般的に使われている。</p>
<p>PRQはPQとAQ（Additive Quantizer）の融合である。PQと比較すると、特にバイナリ圧縮と言って、高い圧縮率でより良いリコールを実現するために、より長い構築時間を必要とする。</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">クラスタリング圧縮（ベータ）</h4><p>Milvus2.5では、大規模なコレクションの検索を高速化し、コストを削減するために、クラスタリングコンパクションが導入された。クラスタリングキーとしてスカラーフィールドを指定することで、データを範囲ごとに再分散し、保存と検索を最適化します。グローバルインデックスのように動作するこの機能により、Milvusはクラスタリングメタデータに基づいたクエリ時に効率的にデータを刈り込み、スカラーフィルタが適用された際の検索パフォーマンスを向上させることができます。</p>
<p>詳細は<a href="/docs/ja/clustering-compaction.md">クラスタリング・コンパクションを</a>ご参照ください。</p>
<h3 id="Other-Features" class="common-anchor-header">その他の機能</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">ストリーミングノード（ベータ版）</h4><p>Milvus 2.5では、Write-Ahead Logging (WAL)サービスを提供するストリーミングノードという新しいコンポーネントが導入されました。これにより、Milvusはチャネルの読み書きの前後でコンセンサスを得ることができるようになり、新たな機能、特徴、最適化を実現します。この機能はMilvus 2.5ではデフォルトで無効になっており、バージョン3.0で正式に利用可能になる。</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6サポート</h4><p>MilvusはIPv6をサポートし、ネットワーク接続と互換性の拡張を可能にしました。</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV一括インポート</h4><p>JSON、Parquet形式に加え、MilvusはCSV形式のデータの直接一括インポートをサポートするようになりました。</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">クエリ高速化のための式テンプレート</h4><p>Milvusは式テンプレートをサポートし、特に複雑な式のシナリオにおいて式の解析効率を向上させます。</p>
<p>詳細については、「<a href="/docs/ja/filtering-templating.md">フィルタテンプレート</a>」をご参照ください。</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">GroupByの強化</h4><ul>
<li><strong>グループサイズのカスタマイズ</strong>：グループごとに返されるエントリの数を指定できるようになりました。</li>
<li><strong>ハイブリッド GroupBy 検索</strong>：複数のベクトル列に基づくハイブリッド GroupBy 検索をサポートしました。</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">イテレーターの機能強化</h4><ul>
<li><strong>MVCCのサポート</strong>：MVCC（Multi-Version Concurrency Control）により、挿入や削除などのデータ変更に影響されずにイテレータを使用できるようになりました。</li>
<li><strong>永続カーソル</strong>：MilvusはQueryIteratorの持続的カーソルをサポートし、Milvusの再起動後、反復処理全体を再起動することなく、最後の位置から反復処理を再開できるようになりました。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改良点</h3><h4 id="Deletion-Optimization" class="common-anchor-header">削除の最適化</h4><p>ロックの使用とメモリ管理を最適化することにより、大規模な削除の速度の向上とメモリ使用量の削減を実現しました。</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">依存関係のアップグレード</h4><p>ETCD 3.5.16およびPulsar 3.0.7 LTSにアップグレードし、既存のCVEを修正し、セキュリティを強化しました。注意：Pulsar 3.xへのアップグレードは、以前の2.xバージョンとは互換性がありません。</p>
<p>既にMilvusを導入しているユーザは、新機能を使用する前にETCDおよびPulsarコンポーネントをアップグレードする必要があります。詳細については、<a href="/docs/ja/upgrade-pulsar-v3.md">Pulsarを2.xから3.xへアップグレードするを</a>ご参照ください。</p>
<h4 id="Local-Storage-V2" class="common-anchor-header">ローカル・ストレージV2</h4><p>Milvus 2.5で新しいローカル・ファイル・フォーマットを導入し、スカラー・データの読み込みとクエリの効率を高め、メモリ・オーバーヘッドを削減し、将来の最適化の基礎を築きました。</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">式解析の最適化</h4><p>繰り返し式のキャッシュの実装、ANTLRのアップグレード、<code translate="no">NOT IN</code> 節のパフォーマンスの最適化により、式の解析を改善。</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">DDL 同時実行性能の向上</h4><p>データ定義言語（DDL）操作の同時実行パフォーマンスを最適化しました。</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">RESTful API 機能の調整</h4><p>RESTful API の機能を他の SDK と整合させました。</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">セキュリティと設定の更新</h4><p>より複雑な環境またはエンタープライズ環境でノード間通信を保護するためにTLSをサポートしました。詳細については、<a href="/docs/ja/tls.md">セキュリティ設定を</a>参照してください。</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">コンパクション・パフォーマンスの向上</h4><p>混合コンパクションにおける最大セグメント数の制限を撤廃し、より小さなセグメントを優先的に処理することで、効率が向上し、大規模または断片化されたデータセットに対するクエリが高速化されました。</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">スコアベースのチャネル・バランシング</h4><p>チャネル間の負荷を動的に分散するポリシーを導入し、大規模な展開におけるリソースの使用率と全体的な安定性を向上。</p>
