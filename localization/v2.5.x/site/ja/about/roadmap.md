---
id: roadmap.md
title: Milvus ロードマップ
related_key: Milvus roadmap
summary: Milvusは、AIアプリケーションを強化するために構築されたオープンソースのベクトルデータベースです。私たちの開発ロードマップは以下の通りです。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus ロードマップ<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusロードマップへようこそ！Milvusを強化し、進化させるための継続的な旅にご参加ください。私たちの実績、将来の計画、そして今後のビジョンを共有できることを嬉しく思います。私たちのロードマップは、単なる今後の機能のリストではなく、私たちの革新へのコミットメントとコミュニティとの協力への献身を反映しています。是非、ロードマップをご覧いただき、ご意見をお寄せいただき、Milvusの未来を形作るお手伝いをさせてください！</p>
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
            <th>Milvus 2.5.0 (最近のリリースで達成)</th>
            <th>次回リリース (CY25年中頃)</th>
            <th>今後のロードマップ（1年以内）</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI-Driven Unstructured Data Processing</strong><br/><i>AIモデルや先進技術を活用した非構造化データの処理・分析能力を強化。</i></td>
            <td><strong>全文検索</strong><br/><i>Sparse-BM25で全文検索をサポート。新APIはテキストを入力とし、Milvus内でスパースベクトルを自動生成</i><br/><br/><strong>スパースベクトル(GA)</strong><br/><i>スパースベクトルの効率的な格納方法とインデックス作成方法をサポート</i>。<br/></td>
            <td><strong>Data-In and Data-Out</strong><br/><i>元データをインジェストするための主要なモデルサービスをサポート</i><br/><br/><strong>Advanced Reranker</strong><br/><i>モデルベースのリランカーとユーザー定義のスコアリング関数をサポート</i><br/><br/> JSON<strong>Enhancement</strong><br/> JSON<i>インデキシングとパージングによる処理の高速化</i></td>
            <td><strong>オリジナルデータ-インとデータ-アウト</strong><br/><i>オリジナルデータを処理するためのBlobとurl参照をサポート</i><br/><br/><strong>より多くのデータ型をサポート</strong><br/><i>例：Datetime、Map、GIS</i><br/><br/><strong>テンソールをサポート</strong><br/><i>ベクトルのリストをサポート、コルベール、コパリなどの典型的な使用法。</i></td>
        </tr>
        <tr>
            <td><strong>検索品質とパフォーマンス</strong><br/><i>アーキテクチャ、アルゴリズム、APIを最適化することで、正確、適切、高速な検索結果を提供</i>。</td>
            <td><strong>テキストマッチ機能</strong><br/><i>テキスト/varchar内のキーワード/トークンを素早くフィルタリング</i><br/><br/><strong>グループ化検索の強化</strong><br/><i>ハイブリッド検索におけるgroup_sizeの導入とgroup byサポートの追加</i><br/><br/><strong>ビットマップインデックスと転置インデックス</strong><br/><i>タグに対するフィルタリングの高速化</i></td>
            <td><strong>Advanced Match</strong><br/><i>Match Phrase, Fuzzy Match, and more tokenizers</i><br/><br/> Aggregations<br/><i>Scalar field aggregations, e.g. min, max, count, distinct.</i><br/></td>
            <td><strong>部分更新</strong><br/><i>特定のフィールド値への更新をサポート</i><br/><br/><strong>ソート機能</strong><br/><i>実行中のスカラーフィールドによるソート</i><br/><br/><strong>データのクラスタリングをサポート</strong><br/><i>データのコロカリティ</i><i>。</i></td>
        </tr>
        <tr>
            <td><strong>豊富な機能と管理</strong><br/><i>開発者フレンドリーかつ堅牢なデータ管理機能</i></td>
            <td><strong>データインポートでCSVファイルをサポート</strong><br/><i>BulkinsertはCSVフォーマットをサポート</i><br/><br/><strong>Nullとデフォルト値をサポート</strong><br/><i>Nullとデフォルトタイプは他のDBMSからのデータインポートを容易にします</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>DBAのためのビジュアル管理ツール</i></td>
            <td><strong>プライマリキーの重複排除</strong><br/><i>グローバル pk インデックスの使用による</i><br/><br/><strong>オンラインスキーマ変更</strong><br/><i>例：フィールドの追加/削除、varchar 長さの変更</i><br/><br/><strong>データバージョニングとリストア</strong><br/><i>スナップショットによるデータバージョニングのサポート</i></td>
            <td><strong>Rust and C++ SDK</strong><br/><i>より多くのクライアントをサポート</i><br/><br/><strong>UDF をサポート </strong><br/><i>ユーザー定義関数</i></td>
        </tr>
        <tr>
            <td><strong>コスト効率とアーキテクチャ</strong><br/><i>安定性、コスト効率、スケーラビリティを優先した最先端のシステム </i></td>
            <td><strong>Field by Load</strong><br/><i>ロードするコレクションの一部を選択</i><br/><br/><strong>Memory Optimization</strong><br/><i>OOMの削減とロードの強化</i><br/><br/><strong>Streaming Node (Beta)</strong><br/><i>グローバルな一貫性を提供し、ルートコーディネータ上のパフォーマンスボトルネックを解決</i><br/><br/><strong>Storage Format V2 (Beta)</strong><br/><i>ユニバーサルフォーマットの設計とディスクベースのデータアクセスの基盤</i><br/><br/><strong>Clustering Compaction</strong><br/><i>設定に基づくデータの再分配により読み取りパフォーマンスを高速化</i></td>
            <td><strong>Lazy Load</strong><br/><i>明示的にload()を呼び出すことなく、最初の読み取り操作でロードを開始できる</i><br/><br/><strong>Tiered Storage</strong><br/><i>コスト最適化のためのホットストレージとコールドストレージのサポート</i><br/><br/><strong>Fieldによるリリース</strong><br/><i>メモリ使用量を削減するためにコレクションの一部をリリース</i><br/><br/><strong>Streaming Node (GA)</strong><br/><i>ストリーミングデータを処理し、アーキテクチャを簡素化する</i>。</td>
            <td><strong>依存関係を取り除く</strong><br/><i>パルサー、etcdのような外部コンポーネントへの依存を削減または排除</i><br/><br/><strong>コーディネート・ロジックをMixCoordに統合</strong><br/><i>アーキテクチャを簡素化する</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>私たちのロードマップは通常、最新リリース、次の次期リリース、そして今後1年以内の中長期的なビジョンの3つの部分で構成されています。</li>
<li>進捗に伴い、私たちは継続的に学習し、必要に応じて項目を追加したり削除したりして、時折焦点を調整します。</li>
<li>これらの計画はあくまで参考であり、変更される可能性があります。</li>
<li>私たちは、<a href="/docs/ja/release_notes.md">リリースノートを</a>参考にしながら、ロードマップに忠実に従います。</li>
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
    </button></h2><p>Milvusはオープンソースプロジェクトとして、コミュニティからの貢献によって成長しています。私たちの旅の一部になる方法をご紹介します。</p>
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
