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
    </button></h2><p>リリース日: 2025年8月6日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvusバージョン</th><th style="text-align:left">Python SDK バージョン</th><th style="text-align:left">Node.js SDKバージョン</th><th style="text-align:left">Java SDKバージョン</th><th style="text-align:left">Go SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0が正式にリリースされました！<a href="#v260-rc1">2.6.0-rc</a>1で構築されたアーキテクチャー基盤の上に構築されたこの製品版では、ストレージフォーマットV2、高度なJSON処理、強化された検索機能などの強力な新機能を導入する一方で、多くの安定性とパフォーマンスの問題に対処しています。RC段階でのコミュニティからのフィードバックに基づく広範なバグ修正と最適化により、Milvus 2.6.0は、皆様が探求し、採用する準備が整いました。</p>
<div class="alert warning">
<p>アーキテクチャの変更により、2.6.0以前のバージョンからの直接のアップグレードはサポートされていません。<a href="/docs/ja/upgrade_milvus_cluster-operator.md">アップグレードガイドに従って</a>ください。</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">2.6.0の新機能 (RC以降)</h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">最適化されたストレージフォーマット v2</h4><p>Milvus2.6では、スカラーとベクトルが混在するデータストレージ、特に非構造化データのポイントルックアップの課題に対応するため、ストレージフォーマットV2を導入しました。この新しい適応型カラム型ストレージフォーマットは "狭いカラムのマージ＋広いカラムの独立 "レイアウト戦略を採用し、ベクターデータベースにおけるポイント検索や小ロットの検索を処理する際のパフォーマンスボトルネックを根本的に解決します。</p>
<p>新しいフォーマットは、I/O増幅を伴わない効率的なランダムアクセスをサポートし、従来採用されていたバニラParquetフォーマットと比較して最大100倍の性能向上を達成しており、分析処理と正確なベクトル検索の両方を必要とするAIワークロードに最適です。さらに、一般的なワークロードではファイル数を最大98%削減できます。主要なコンパクションにかかるメモリ消費量は300%削減され、I/O操作は読み込みで最大80%、書き込みで600%以上最適化される。</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSONフラットインデックス（ベータ）</h4><p>Milvus 2.6では、非常に動的なJSONスキーマを扱うためにJSONフラットインデックスが導入されました。特定のパスとその期待される型を事前に宣言する必要があるJSONパスインデックスとは異なり、JSONフラットインデックスは、与えられたパスの下にあるすべての入れ子構造を自動的に検出し、インデックスを作成します。JSON フィールドのインデックスを作成するとき、JSON Flat Index はサブツリー全体を再帰的に平坦化し、深さや型に関係なく、遭遇するすべてのパスと値のペアに対して転置インデックスエントリを作成します。 この自動的な平坦化により、JSON Flat Index は、新しいフィールドが警告なしに現れるような進化するスキーマに最適です。例えば、"metadata "フィールドにインデックスを作成した場合、"metadata.version2.features.experimental "のような新しいネストされたフィールドが入力データに現れると、新しいインデックス設定を必要とすることなく、システムが自動的に処理します。</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">コア2.6.0の機能リコール</h3><div class="alert note">
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
<h3 id="Architecture-Changes" class="common-anchor-header">アーキテクチャの変更</h3><p>2.6以降、Milvusはパフォーマンス、スケーラビリティ、使いやすさの向上を目的とした大幅なアーキテクチャの変更を導入しています。詳細については、<a href="/docs/ja/architecture_overview.md">Milvusアーキテクチャの</a>概要をご参照ください。</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">ストリーミングノード (GA)</h4><p>以前のバージョンでは、ストリーミングデータはProxyによってWALに書き込まれ、QueryNodeとDataNodeによって読み込まれていました。このアーキテクチャでは、書き込み側でコンセンサスを得ることが難しく、読み込み側では複雑なロジックが必要でした。さらに、クエリデリゲータはQueryNodeにあり、スケーラビリティを妨げていました。Milvus 2.5.0ではストリーミングノードが導入され、バージョン2.6.0ではGAとなった。このコンポーネントは現在、すべてのシャードレベルのWALリード/ライトオペレーションを担当し、クエリデリゲータとしても機能し、前述の問題を解決し、新たな最適化を可能にします。</p>
<p><strong>重要なアップグレードのお知らせ</strong>Streaming Nodeは重要なアーキテクチャの変更であるため、以前のバージョンからMilvus 2.6.0-rc1への直接のアップグレードはサポートされていません。</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WoodpeckerネイティブWAL</h4><p>Milvusはこれまで、WALをKafkaやPulsarのような外部システムに依存していました。これらのシステムは機能的ではありましたが、特に小規模から中規模のデプロイメントにおいては、運用の複雑さとリソースのオーバーヘッドが大きくなっていました。Milvus 2.6では、これらは専用に構築されたクラウドネイティブなWALシステムであるWoodpeckerに置き換えられました。Woodpeckerはオブジェクトストレージ用に設計されており、ローカルとオブジェクトストレージベースのゼロディスクモードの両方をサポートし、パフォーマンスとスケーラビリティを向上させながらオペレーションを簡素化します。</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">データノードとインデックスノードの統合</h4><p>Milvus 2.6では、コンパクション、バルクインポート、統計収集、インデックス構築などのタスクが統一されたスケジューラによって管理されるようになりました。これまでDataNodeが担当していたデータ永続化機能はStreaming Nodeに移されました。デプロイとメンテナンスを簡素化するため、IndexNodeとDataNodeは単一のDataNodeコンポーネントに統合されました。この統合されたノードがこれらの重要なタスクをすべて実行し、運用の複雑さを軽減し、リソースの利用を最適化します。</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">コーディネーターのMixCoordへの統合</h4><p>以前の設計では、RootCoord、QueryCoord、DataCoordの各モジュールが独立していたため、モジュール間の通信が複雑になっていました。システム設計を簡素化するため、これらのコンポーネントはMixCoordと呼ばれる単一の統一されたコーディネータに統合された。この統合により、ネットワークベースの通信を内部関数呼び出しに置き換えることで、分散プログラミングの複雑さが軽減され、より効率的なシステム運用と開発・保守の簡素化が実現しました。</p>
<h3 id="Key-Features" class="common-anchor-header">主な機能</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1ビット量子化</h4><p>大規模なデータセットを扱うために、1ビット量子化はリソースの利用率と検索性能を向上させる効果的な手法です。しかし、従来の手法は想起に悪影響を与える可能性があります。Milvus 2.6では、元の研究著者との協力により、1ビット圧縮のリソースと性能の利点を提供しながら、高い検索精度を維持する1ビット量子化ソリューションであるRaBitQを導入しています。</p>
<p>詳細は<a href="/docs/ja/ivf-rabitq.md">IVF_RABITQを</a>参照。</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON機能の強化</h4><p>Milvus 2.6では、JSONデータ型のサポートが強化され、以下の点が改善されました：</p>
<ul>
<li><strong>パフォーマンス</strong>：JSONパスインデックスが正式にサポートされ、JSONオブジェクト内の特定のパス(例:<code translate="no">meta.user.location</code>)に対して転置インデックスを作成できるようになりました。これにより、オブジェクトのフルスキャンが回避され、複雑なフィルタを使用したクエリの待ち時間が改善されます。</li>
<li><strong>機能性</strong>：より複雑なフィルタリングロジックをサポートするために、このリリースでは、<code translate="no">JSON_CONTAINS</code> 、<code translate="no">JSON_EXISTS</code> 、<code translate="no">IS NULL</code> 、<code translate="no">CAST</code> 関数のサポートが追加されました。 先を見据えて、JSONのサポートに関する作業は続いています。今後の正式リリースでは、<strong>JSONシュレッダーや</strong> <strong>JSON FLATインデックスなど</strong>、より強力な機能を搭載し、高度にネストされたJSONデータのパフォーマンスを劇的に改善するよう設計されています。</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">アナライザ/トーケナイザ機能の強化</h4><p>このリリースでは、アナライザーとトーケナイザーのいくつかの更新により、テキスト処理機能が大幅に強化されました：</p>
<ul>
<li>新しい<a href="/docs/ja/analyzer-overview.md#Example-use">Run Analyzer</a>構文を使用して、トークナイザ設定を検証できます。</li>
<li><a href="/docs/ja/lindera-tokenizer.md">Lindera トークナイザが</a>統合され、日本語や韓国語などのアジア言語のサポートが向上しました。</li>
<li>行レベルのトークナイザ選択がサポートされ、多言語シナリオのフォールバックとして汎用<a href="/docs/ja/icu-tokenizer.md">ICUトークナイザが</a>利用できるようになりました。</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">エンベッディング機能によるデータイン、データアウト</h4><p>Milvus2.6では、サードパーティのエンベッディングモデル（例：OpenAI、AWS Bedrock、Google Vertex AI、Hugging Face）と直接統合することで、AIアプリケーション開発を簡素化する「データイン、データアウト」機能を導入しました。Milvusは自動的に指定されたモデルサービスを呼び出し、テキストをリアルタイムでベクトルに変換します。これにより、ベクター変換パイプラインを別途用意する必要がなくなりました。</p>
<p>詳しくは、<a href="/docs/ja/embedding-function-overview.md">埋め込み機能の概要を</a>ご覧ください。</p>
<h4 id="Phrase-Match" class="common-anchor-header">フレーズマッチ</h4><p>Phrase Matchは、クエリに含まれる単語の正確なシーケンスが、ドキュメント内で連続して正しい順序で出現した場合にのみ結果を返すテキスト検索機能です。</p>
<p><strong>主な特徴</strong></p>
<ul>
<li>順序依存：単語はクエリと同じ順序で現れる必要があります。</li>
<li>連続一致：スロップ値が使用されない限り、単語は隣り合っていなければならない。</li>
<li>Slop（オプション）：調整可能なパラメータで、間に挟まれる単語の数を少なくして、あいまいなフレーズ・マッチングを可能にします。</li>
</ul>
<p>詳細は「<a href="/docs/ja/phrase-match.md">フレーズ一致</a>」を参照。</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSHインデックス（ベータ版）</h4><p>Milvus 2.6では、モデル学習におけるデータ重複排除の必要性に対応するため、MINHASH_LSHインデックスをサポートしています。この機能は、計算効率が高くスケーラブルな方法で文書間のJaccard類似度を推定し、重複に近い文書を特定します。ユーザーは、前処理中にテキスト文書に対してMinHashシグネチャを生成し、MilvusでMINHASH_LSHインデックスを使用することで、大規模データセットから類似コンテンツを効率的に検索し、データクリーニングとモデル品質を向上させることができる。</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">時間を考慮したディケイ関数</h4><p>Milvus 2.6では、時間の経過とともに情報価値が変化するシナリオに対応するため、時間を考慮した減衰関数を導入しています。結果の再ランク付けの際に、ユーザーはタイムスタンプフィールドに基づいて指数関数、ガウス関数、線形減衰関数を適用し、ドキュメントの関連性スコアを調整することができます。これは、ニュースフィード、eコマース、AIエージェントのメモリなどのアプリケーションにとって重要です。</p>
<p>詳細については、<a href="/docs/ja/decay-ranker-overview.md">Decay Rankerの概要を</a>参照してください。</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">オンライン・スキーマ進化のためのフィールド追加</h4><p>スキーマの柔軟性を高めるため、milvus 2.6では既存のコレクションのスキーマに新しいスカラーまたはベクトルフィールドをオンラインで追加できるようになりました。これにより、アプリケーションの要件が変更された際に、新しいコレクションを作成し、破壊的なデータ移行を行う必要がなくなります。</p>
<p>詳細は、<a href="/docs/ja/add-fields-to-an-existing-collection.md">既存のコレクションへのフィールドの追加を</a>参照してください。</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8ベクトルサポート</h4><p>Milvus2.6では、8ビット整数のエンベッディングを生成する量子化モデルの使用が増加していることに対応し、INT8ベクトルのネイティブデータ型のサポートを追加しました。これにより、ユーザーはこれらのベクトルを量子化せずに直接取り込むことができ、計算、ネットワーク帯域幅、ストレージのコストを削減することができます。この機能は、当初はHNSWファミリーのインデックスでサポートされます。</p>
<p>詳細については、<a href="/docs/ja/dense-vector.md">Dense Vectorを</a>参照してください。</p>
