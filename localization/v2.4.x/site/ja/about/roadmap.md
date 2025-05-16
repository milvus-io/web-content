---
id: roadmap.md
title: Milvus・ロードマップ
related_key: Milvus roadmap
summary: Milvusは、AIアプリケーションを強化するために構築されたオープンソースのベクトルデータベースです。私たちの開発ロードマップは以下の通りです。
---

<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus・ロードマップ<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusロードマップへようこそ！Milvusを強化し、進化させるための継続的な旅にご参加ください。私たちの実績、将来の計画、そして今後のビジョンを共有できることを嬉しく思います。私たちのロードマップは、単なる今後の機能のリストではなく、私たちの革新へのコミットメントとコミュニティとの協力への献身を反映しています。ロードマップをご覧いただき、ご意見をお寄せいただき、Milvusの未来を形作る一助となれば幸いです！</p>
<h2 id="Roadmap" class="common-anchor-header">ロードマップ<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>カテゴリー</th>
            <th>Milvus 2.4.0 (最近達成)</th>
            <th>Milvus 2.5.0（24年半ばに予定）</th>
            <th>今後のロードマップ（Milvus 3.0 CY24内予定）</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI開発者に優しい</strong><br/><i>最新のAIイノベーションで強化された開発者に優しい技術スタック</i></td>
            <td><strong>マルチベクトル＆ハイブリッドサーチ</strong><br/><i>マルチプレックスリコールとフュージョンのためのフレームワーク</i><br/><br/><strong>GPUインデックスアクセラレーション</strong><br/><i>より高いQPSと高速インデックス作成のサポート</i><br/><br/><strong>PyMilvusのモデルライブラリ</strong><br/><i>Milvusのための統合エンベッディングモデル</i></td>
            <td><strong>Sparse Vector (GA)</strong><br/><i>局所特徴抽出とキーワード検索</i><br/><br/><strong>Milvus Lite (GA)</strong><br/><i>Milvusの軽量、インメモリバージョン</i><br/><br/><strong>Embedding Models Gallery</strong><br/><i>モデルライブラリにおける画像およびマルチモーダル埋め込みとリランカーモデルのサポート</i></td>
            <td><strong>独自のデータインとデータアウト</strong><br/><i>Blobデータタイプのサポート</i><br/><br/><strong>データクラスタリング</strong><br/><i>データ協調性</i><br/><br/><strong>シナリオ指向のベクトル検索</strong><br/><i>例：マルチターゲット検索とNNフィルタリング</i><br/><br/><strong>埋め込みとリランカーエンドポイントのサポート</strong></td>
        </tr>
        <tr>
            <td><strong>豊富な機能</strong><br/><i>検索およびデータ管理機能の強化</i></td>
            <td><strong>FP16, BF16 データ型のサポート</strong><br/><i>これらの ML データ型はメモリ使用量の削減に役立つ</i><br/><br/><strong>グループ化検索</strong><br/><i>スプリット埋め込みを</i>集約<br/><br/><strong>ファジィマッチと転置インデックス</strong><br/><i>varchar や int などのスカラー型に対するファジィマッチと転置インデックスのサポート</i></td>
            <td><strong>Inverted Index for Array &amp; JSON</strong><br/><i>配列のインデックス作成と JSON の部分的サポート</i><br/><br/> Bitset<strong>Index</strong><br/><i>実行速度の向上と将来のデータ集約</i><br/><br/><strong>Truncate Collection</strong><br/><i>メタデータを保持したままデータ消去が可能</i><br/><br/><strong>NULL とデフォルト値のサポート</strong></td>
            <td><strong>より多くのデータ型のサポート</strong><br/><i>例：Datetime、GIS</i><br/><br/><strong>高度なテキストフィルタリング</strong><br/><i>例：Match Phrase</i><br/><br/><strong>プライマリキーの重複排除</strong></td>
        </tr>
        <tr>
            <td><strong>コスト効率とアーキテクチャ</strong><br/><i>安定性、コスト効率、スケーラビリティ、パフォーマンスを重視した高度なシステム</i></td>
            <td><strong>より多くのコレクション/パーティションのサポート</strong><br/><i>10,000を超えるコレクションをより小さなクラスタで処理</i><br/><br/><strong>Mmap Optimization</strong><br/><i>削減されたメモリ消費とレイテンシのバランス</i><br/><br/><strong>Bulk Insert Optimazation</strong><br/><i>大規模データセットのインポートを簡素化</i>。</td>
            <td><strong>Lazy Load</strong><br/><i>読み込み操作によってデータをオンデマンドでロード</i><br/><br/><strong>Major Compaction</strong><br/><i>読み込みパフォーマンスを向上させるために設定に基づいてデータを再分配</i><br/><br/><strong>成長するデータ用の Mmap</strong><br/><i>データセグメントを拡張するための Mmap ファイル</i></td>
            <td><strong>メモリ制御</strong><br/><i>メモリ不足の問題を軽減し、グローバルなメモリ管理を提供</i><br/><br/><strong>LogNode の導入</strong><br/><i>グローバルな一貫性を確保し、ルート調整におけるシングルポイントのボトルネックに対処</i><br/><br/><strong>ストレージフォーマット V2</strong><br/><i>ユニバーサルフォーマット設計により、ディスクベースのデータアクセスの基礎を築く</i></td>
        </tr>
        <tr>
            <td><strong>Enterprise Ready</strong><br/><i>エンタープライズ本番環境のニーズを満たす設計</i></td>
            <td><strong>Milvus CDC</strong><br/><i>データレプリケーションのための機能</i><br/><br/><strong>Accesslogの強化</strong><br/><i>監査とトレースのための詳細な記録</i></td>
            <td><strong>新しいリソースグループ</strong><br/><i>リソース管理の強化</i><br/><br/><strong>ストレージフック</strong><br/><i>Bring Your Own Key (BYOK) 暗号化のサポート</i></td>
            <td><strong>動的なレプリカ数の調整</strong><br/><i>レプリカ数の動的な変更を促進</i><br/><br/><strong>動的なスキーマの修正</strong><br/><i>例：フィールドの追加/削除、varchar 長の修正</i><br/><br/> Rust<strong>および C# SDKs</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>私たちのロードマップは、通常3つの部分から構成されています。最新のリリース、次にリリース予定のリリース、そして今後1年以内の中長期的なビジョンです。</li>
<li>進捗に伴い、私たちは継続的に学習し、必要に応じて項目を追加または削除し、時折フォーカスを調整します。</li>
<li>これらの計画はあくまで参考であり、変更される可能性があります。</li>
<li>私たちは、<a href="/docs/ja/v2.4.x/release_notes.md">リリースノートを</a>参考にしながら、ロードマップに忠実に従います。</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">貢献方法<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>オープンソースプロジェクトであるMilvusは、コミュニティからの貢献によって成長しています。私たちの旅の一部になる方法をご紹介します。</p>
<h3 id="Share-feedback" class="common-anchor-header">フィードバックの共有</h3><ul>
<li><p>問題の報告バグに遭遇したり、提案をお持ちですか？<a href="https://github.com/milvus-io/milvus/issues">GitHubの</a>ページに課題を投稿してください。</p></li>
<li><p>機能提案：新機能や改善点のアイデアをお持ちですか？<a href="https://github.com/milvus-io/milvus/discussions">ぜひお寄せください！</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">コードへの貢献</h3><ul>
<li><p>プルリクエスト：私たちの<a href="https://github.com/milvus-io/milvus/pulls">コード</a>ベースに直接貢献してください。バグの修正、機能の追加、ドキュメントの改善など、あなたの貢献を歓迎します。</p></li>
<li><p>開発ガイド：コードコントリビューションに関するガイドラインは、<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">コントリビューターガイドを</a>ご覧ください。</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">情報を広める</h3><ul>
<li><p>ソーシャルシェアリングMilvusが好きですか？あなたの使用例や経験をソーシャルメディアや技術ブログで共有しましょう。</p></li>
<li><p>GitHubでスターをつける：<a href="https://github.com/milvus-io/milvus">GitHubリポジトリに</a>スターを付けて、あなたのサポートを示しましょう。</p></li>
</ul>
