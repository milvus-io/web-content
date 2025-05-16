---
id: migrate_overview.md
summary: この記事では、サポートされているマイグレーション、機能、アーキテクチャなど、Milvus-migrationツールの概要を説明します。
title: Milvus移住の概要
---

<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Milvusマイグレーション概要<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusはユーザーベースの多様なニーズを認識し、Milvus 1.x以前のバージョンからのアップグレードを容易にするだけでなく、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearchや</a> <a href="https://github.com/facebookresearch/faiss">Faissの</a>ような他のシステムからのシームレスなデータ統合を可能にするためにマイグレーションツールを拡張しました。<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>プロジェクトは、これらの多様なデータ環境とMilvusテクノロジーの最新の進歩とのギャップを埋めるように設計されており、お客様が改善された機能とパフォーマンスをシームレスに利用できることを保証します。</p>
<h2 id="Supported-migrations" class="common-anchor-header">対応マイグレーション<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>ツールは、様々なユーザのニーズに対応するため、様々な移行経路をサポートしています：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/es2m.md">ElasticsearchからMilvus 2.xへの移行</a>：ElasticsearchからMilvus 2.xへの移行：Elasticsearch環境からデータを移行し、Milvusの最適化されたベクトル検索機能を利用することができます。</li>
<li><a href="/docs/ja/v2.4.x/f2m.md">FaissからMilvus 2.xへ</a>：効率的な類似検索のための一般的なライブラリであるFaissからのデータ移行を実験的にサポート。</li>
<li><a href="/docs/ja/v2.4.x/m2m.md">Milvus 1.xからMilvus 2.xへ</a>：旧バージョンのデータを最新フレームワークへスムーズに移行。</li>
<li><a href="/docs/ja/v2.4.x/from-m2x.md">Milvus 2.3.xからMilvus 2.3.x以上へ</a>：既に2.3.xに移行したユーザーに対して、1回限りの移行パスを提供。</li>
</ul>
<h2 id="Features" class="common-anchor-header">特徴<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migrationは、多様な移行シナリオに対応できるよう、堅牢な機能を備えています：</p>
<ul>
<li>複数のインタラクションメソッド：コマンドラインインターフェイスまたはRestful APIを使用してマイグレーションを実行することができ、マイグレーションの実行方法を柔軟に変更することができます。</li>
<li>様々なファイル形式とクラウドストレージのサポート<a href="https://github.com/zilliztech/milvus-migration">Milvusマイグレーションツールは</a>、ローカルファイルだけでなく、S3、OSS、GCPなどのクラウドストレージに保存されたデータを扱うことができ、幅広い互換性を確保します。</li>
<li>データタイプの取り扱い：<a href="https://github.com/zilliztech/milvus-migration">Milvus-migrationは</a>ベクトルデータとスカラーフィールドの両方を扱うことができるため、様々なデータ移行のニーズに対応することができます。</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">アーキテクチャ<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-migration">Milvus-migrationの</a>アーキテクチャは、効率的なデータストリーミング、解析、書き込み処理を促進するように戦略的に設計されており、様々なデータソース間で堅牢なマイグレーション機能を実現します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Milvusマイグレーションアーキテクチャ</span> </span></p>
<p>先の図では</p>
<ul>
<li><strong>データソース</strong> <a href="https://github.com/zilliztech/milvus-migration">Milvus-migrationは</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">scroll API</a>経由のElasticsearch、ローカルまたはクラウドストレージのデータファイル、Milvus 1.xデータベースを含む複数のデータソースをサポートしています。これらは移行プロセスを開始するために合理化された方法でアクセスされ、読み込まれます。</li>
<li><strong>ストリームパイプライン</strong><ul>
<li><strong>解析プロセス</strong>：ソースからのデータはそのフォーマットに従って解析されます。例えば、ElasticsearchからのデータソースにはElasticsearchフォーマットのパーサーが採用され、その他のフォーマットにはそれぞれのパーサーが使用される。このステップは、生データをさらに処理可能な構造化フォーマットに変換するために重要である。</li>
<li><strong>変換プロセス</strong>：パーシングの後、データは変換され、フィールドはフィルタリングされ、データタイプは変換され、テーブル名はターゲットMilvus 2.xスキーマに従って調整されます。これにより、データがMilvusで期待される構造と型に適合することが保証されます。</li>
</ul></li>
<li><strong>データの書き込みと読み込み</strong><ul>
<li><strong>データを書き込む</strong>：処理されたデータは中間的なJSONまたはNumPyファイルに書き込まれ、Milvus 2.xにロードされます。</li>
<li><strong>データのロード</strong>データは最終的に<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>オペレーションを使ってMilvus 2.xにロードされ、大量のデータをクラウドベースまたはファイルストアのMilvusストレージシステムに効率的に書き込む。</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">今後の計画<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>開発チームは<a href="https://github.com/zilliztech/milvus-migration">Milvus-migrationに</a>以下のような機能を追加していく予定です：</p>
<ul>
<li><strong>より多くのデータソースのサポート</strong>Pinecone、Chroma、Qdrantのようなデータベースやファイルシステムのサポートを拡張する予定です。特定のデータソースのサポートが必要な場合は、この<a href="https://github.com/zilliztech/milvus-migration/issues">GitHub issue linkから</a>リクエストを送信してください。</li>
<li><strong>コマンドの簡素化</strong>：コマンドプロセスを簡素化し、より簡単に実行できるようにしました。</li>
<li><strong>SPIパーサー</strong>／<strong>変換</strong>：このアーキテクチャには、解析と変換の両方のためのサービス・プロバイダー・インターフェース（SPI）ツールが含まれる予定です。これらのツールは、特定のデータ形式や変換ルールを扱うために、ユーザーが移行プロセスにプラグインできるカスタム実装を可能にする。</li>
<li><strong>チェックポイントの再開</strong>：移行を最後のチェックポイントから再開できるようにし、中断時の信頼性と効率を高める。セーブポイントはデータの整合性を確保するために作成され、SQLiteやMySQLなどのデータベースに保存され、移行プロセスの進捗を追跡します。</li>
</ul>
