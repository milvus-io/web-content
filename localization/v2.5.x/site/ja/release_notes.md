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
<h2 id="v250-beta" class="common-anchor-header">v2.5.0ベータ<button data-href="#v250-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2024年11月26日</p>
<table>
<thead>
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th><th>Java SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>2.5.0ベータ</td><td>2.5.0</td><td>2.5.0</td><td>2.5.0</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0-betaは、ベクトル検索や大規模なデータ管理を扱うユーザーにとって、ユーザビリティ、スケーラビリティ、パフォーマンスを向上させるための大きな進歩をもたらします。本リリースにより、Milvusはタームベース検索、最適化されたクエリのためのクラスタリングコンパクション、スパースおよびデンスベクトル検索メソッドの多目的なサポートといった強力な新機能を統合しました。クラスタ管理、インデックス作成、データ処理の強化により、Milvusは新たなレベルの柔軟性と使いやすさを導入し、より堅牢で使いやすいベクトルデータベースとなりました。</p>
<h3 id="Key-Features" class="common-anchor-header">主な機能</h3><h4 id="Full-Text-Search" class="common-anchor-header">全文検索</h4><p>Milvus2.5はSparse-BM25で実装された全文検索に対応しています！この機能は、Milvusの強力なセマンティック検索機能を補完する重要な機能であり、特に希少語や専門用語が含まれるシナリオで威力を発揮します。以前のバージョンでは、Milvusはキーワード検索シナリオを支援するためにスパースベクトルをサポートしていました。これらのスパースベクトルはSPLADEv2/BGE-M3のようなニューラルモデルやBM25アルゴリズムのような統計モデルによってMilvusの外部で生成されていました。</p>
<p>Milvus 2.5ではトークン化とスパースベクトル抽出が組み込まれ、APIは入力としてベクトルを受け取るだけでなく、テキストを直接受け取れるように拡張されました。BM25統計情報は、データが挿入されるとリアルタイムで更新され、ユーザビリティと精度が向上します。さらに、近似最近傍（ANN）アルゴリズムに基づくスパースベクトルは、標準的なキーワード検索システムよりも強力なパフォーマンスを提供します。</p>
<p>詳細は<a href="/docs/ja/full-text-search.md">全文検索を</a>参照。</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">クラスタ管理WebUI（ベータ版）</h4><p>膨大なデータと豊富な機能をより良くサポートするために、Milvusの洗練された設計には様々な依存関係、多数のノードの役割、複雑なデータ構造などが含まれています。このような側面は、使用やメンテナンスに困難をもたらす可能性があります。</p>
<p>Milvus 2.5では、組み込みのクラスタ管理WebUIを導入し、Milvusの複雑な実行環境情報を可視化することで、システムメンテナンスの難易度を下げています。これにはデータベースやコレクション、セグメント、チャネル、依存関係、ノードのヘルスステータス、タスク情報、スロークエリなどの詳細が含まれます。</p>
<h4 id="Text-Match" class="common-anchor-header">テキストマッチ</h4><p>Milvus2.5は、Tantivyのアナライザとインデックスを活用してテキストの前処理とインデックスを構築し、特定の用語に基づいたテキストデータの正確な自然言語マッチングをサポートします。この機能は、主に特定の条件を満たすフィルタリング検索に使用され、スカラーフィルタリングを組み込んでクエリ結果を絞り込むことができるため、スカラー条件を満たすベクトル内の類似検索が可能です。</p>
<p>詳細については、<a href="/docs/ja/keyword-match.md">キーワードマッチを</a>参照してください。</p>
<h4 id="Bitmap-Index" class="common-anchor-header">ビットマップインデックス</h4><p>Milvusファミリーに新しいスカラーデータインデックスが追加されました。BitMap インデックスは行数と同じ長さのビットの配列を使用して値の存在を表し、検索を高速化します。</p>
<p>ビットマップインデックスは伝統的に、値の数が少ない、つまり、性別情報を含むカラムの値が男性と女性の2つしかないような、カーディナリティの低いフィールドに有効であった。</p>
<p>詳細は<a href="/docs/ja/bitmap.md">ビットマップインデックスを</a>参照してください。</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullableとデフォルト値</h4><p>Milvusでは、主キーフィールド以外のスカラーフィールドに対して、Null可能なプロパティとデフォルト値を設定できるようになりました。<code translate="no">nullable=True</code> とマークされたスカラーフィールドについては、ユーザはデータ挿入時にフィールドを省略することができます。システムはエラーをスローすることなく、そのフィールドをヌル値またはデフォルト値（設定されている場合）として扱います。</p>
<p>デフォルト値とNULL可能なプロパティはMilvusに大きな柔軟性を与えます。ユーザは、コレクションを作成する際に、不確かな値を持つフィールドに対してこの機能を利用することができます。また、他のデータベースシステムからMilvusへのデータ移行を簡素化し、元のデフォルト値設定を保持したままNULL値を含むデータセットを扱うことができます。</p>
<p>詳細は<a href="/docs/ja/nullable-and-default.md">Nullable &amp; Default Value</a> を参照してください。</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">FaissベースのHNSW SQ/PQ/PRQ</h4><p>Faissコミュニティとの緊密な連携により、FaissのHNSWアルゴリズムは、機能と性能の両面で大幅に改善されました。安定性と保守性を考慮し、Milvus 2.5はHNSWのサポートをhnswlibからFaissに正式に移行しました。</p>
<p>Faissに基づき、Milvus 2.5はHNSWの複数の量子化方式をサポートし、様々なシナリオのニーズに応えます：SQ (Scalar Quantizers)、PQ (Product Quantizer)、PRQ (Product Residual Quantizer)です。SQとPQはより一般的で、SQは優れたクエリ性能と構築速度を提供し、PQは同じ圧縮率でより優れたリコールを提供する。多くのベクトルデータベースでは、SQ量子化の単純な形式であるバイナリ量子化が一般的に使用されている。</p>
<p>PRQはPQとAQ（Additive Quantizer）の融合である。PQと比較すると、特にバイナリ圧縮と言って、高い圧縮率でより良いリコールを実現するために、より長い構築時間を必要とする。</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">クラスタリング圧縮（ベータ）</h4><p>Milvus2.5では、大規模なコレクションの検索を高速化し、コストを削減するために、クラスタリングコンパクションが導入された。クラスタリングキーとしてスカラーフィールドを指定することで、データを範囲ごとに再分散し、保存と検索を最適化します。グローバルインデックスのように動作するこの機能により、Milvusはクラスタリングメタデータに基づいたクエリ時に効率的にデータを刈り込み、スカラーフィルタが適用された際の検索パフォーマンスを向上させることができます。</p>
<p>詳細は<a href="/docs/ja/clustering-compaction.md">クラスタリング・コンパクションを</a>ご参照ください。</p>
<h3 id="Other-Features" class="common-anchor-header">その他の機能</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">ストリーミングノード（ベータ版）</h4><p>Milvus 2.5では、Write-Ahead Logging (WAL)サービスを提供するストリーミングノードという新しいコンポーネントが導入されました。これにより、Milvusはチャネルの読み書きの前後でコンセンサスを得ることができるようになり、新たな機能、特徴、最適化を実現します。この機能はMilvus 2.5ではデフォルトで無効になっており、バージョン3.0で正式に利用可能になる。</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6サポート</h4><p>MilvusはIPv6をサポートし、ネットワーク接続と互換性の拡張を可能にしました。</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV一括インポート</h4><p>JSON、Parquet形式に加え、MilvusはCSV形式のデータの直接一括インポートをサポートするようになりました。</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">クエリ高速化のための式テンプレート</h4><p>Milvusは式テンプレートをサポートし、特に複雑な式のシナリオにおいて式の解析効率を向上させます。</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">GroupByの強化</h4><ul>
<li><strong>グループサイズのカスタマイズ</strong>：グループごとに返されるエントリーの数を指定できるようになりました。</li>
<li><strong>ハイブリッドGroupBy検索</strong>：複数のベクトル列に基づくハイブリッド GroupBy 検索がサポートされました。</li>
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
