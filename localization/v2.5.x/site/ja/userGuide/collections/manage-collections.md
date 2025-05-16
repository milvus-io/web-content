---
id: manage-collections.md
title: コレクションの説明
summary: >-
  Milvusでは、データを管理するために複数のコレクションを作成し、データをエンティティとしてコレクションに挿入することができます。コレクションとエンティティはリレーショナルデータベースのテーブルとレコードに似ています。このページでは、コレクションと関連する概念について説明します。
---
<h1 id="Collection-Explained" class="common-anchor-header">コレクションの説明<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、データを管理するために複数のコレクションを作成し、データをエンティティとしてコレクションに挿入することができます。コレクションとエンティティはリレーショナルデータベースのテーブルとレコードに似ています。このページでは、コレクションと関連する概念について説明します。</p>
<h2 id="Collection" class="common-anchor-header">コレクション<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションは、固定列と可変行を持つ2次元テーブルです。各列はフィールドを表し、各行はエンティティを表します。</p>
<p>次の図は、8 つの列と 6 つのエンティティを持つコレクションを示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>コレクションの説明</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">スキーマとフィールド<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>オブジェクトを説明するとき、通常はその属性（サイズ、重量、位置など）について言及します。これらの属性は、コレクションのフィールドとして使用できます。各フィールドには、データ型やベクトル・フィールドの次元数など、さまざまな制約プロパティがあります。フィールドを作成し、それらの順序を定義することで、コレクションスキーマを形成できます。適用可能なデータ型については、<a href="/docs/ja/schema.md">スキーマの</a>説明を参照してください。</p>
<p>挿入するエンティティには、すべてのスキーマ定義フィールドを含める必要があります。これらのフィールドのいくつかをオプションにするには、ダイナミック・フィールドを有効にすることを検討します。詳細は、「<a href="/docs/ja/enable-dynamic-field.md">動的フィールド</a>」を参照してください。</p>
<ul>
<li><p><strong>フィールドを NULL 可能にする、またはデフォルト値を設定する</strong></p>
<p>フィールドを NULL 可能にする方法またはデフォルト値を設定する方法の詳細は、「<a href="/docs/ja/nullable-and-default.md">Nullable &amp; Default</a>」を参照してください。</p></li>
<li><p><strong>ダイナミック・フィールドの有効化</strong></p>
<p>ダイナミック・フィールドを有効にして使用する方法の詳細については、<a href="/docs/ja/enable-dynamic-field.md">ダイナミック・フィールドを</a>参照してください。</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">主キーと AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>リレーショナルデータベースのプライマリフィールドと同様に、コレクションには、エンティティを他と区別するためのプライマリフィールドがあります。プライマリ・フィールドの各値はグローバルに一意であり、1つの特定のエンティティに対応します。</p>
<p>上の図に示すように、<strong>id</strong>というフィールドがプライマリ・フィールドとして機能し、最初の ID<strong>0</strong>は、<em>「コロナウイルスの死亡率は重要ではありません</em>」というタイトルのエンティティに対応します。プライマリ・フィールドが 0 のエンティティは他に存在しません。</p>
<p>プライマリ・フィールドは、整数または文字列のみを受け入れます。エンティティの挿入時には、プライマリ・フィールドの値をデフォルトで含める必要があります。しかし、コレクション作成時に<strong>AutoIdを</strong>有効にしている場合、Milvusはデータ挿入時にそれらの値を生成します。このような場合は、挿入するエンティティからプライマリフィールド値を除外します。</p>
<p>詳細については、<a href="/docs/ja/primary-field.md">プライマリフィールドとAutoIdを</a>参照してください。</p>
<h2 id="Index" class="common-anchor-header">インデックス<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>特定のフィールドにインデックスを作成すると、検索効率が向上します。サービスが依存するすべてのフィールドにインデックスを作成することをお勧めします。その中でも、ベクトルフィールドのインデックスは必須です。</p>
<h2 id="Entity" class="common-anchor-header">エンティティ<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>エンティティは、コレクション内の同じフィールドセットを共有するデータレコードです。同じ行のすべてのフィールドの値がエンティティを構成します。</p>
<p>エンティティは、コレクションに必要な数だけ挿入できます。ただし、エンティティの数が増えると、必要となるメモリ・サイズも増加し、検索パ フォーマンスに影響します。</p>
<p>詳細については、<a href="/docs/ja/schema.md">スキーマの</a>説明を参照してください。</p>
<h2 id="Load-and-Release" class="common-anchor-header">ロードとリリース<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションのロードは、コレクションで類似検索とクエリを実行するための前提条件です。コレクションをロードすると、Milvusはすべてのインデックスファイルと各フィールドの生データをメモリにロードし、検索やクエリに高速に対応できるようにします。</p>
<p>検索とクエリはメモリを大量に消費します。コストを節約するには、現在使用していないコレクションを解放することをお勧めします。</p>
<p>詳細については、<a href="/docs/ja/load-and-release.md">ロードと解放を</a>参照してください。</p>
<h2 id="Search-and-Query" class="common-anchor-header">検索とクエリ<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスを作成し、コレクションをロードすると、1つまたは複数のクエリ・ベクタを投入して 類似性検索を開始できます。例えば、検索リクエストに含まれるクエリのベクトル表現を受信すると、Milvusは指定されたメトリックタイプを使用してクエリベクトルとターゲットコレクション内の類似性を測定し、クエリと意味的に類似したものを返します。</p>
<p>検索やクエリにメタデータフィルタリングを含めることで、結果の関連性を向上させることもできます。メタデータのフィルタリング条件は、クエリでは必須ですが、検索ではオプションです。</p>
<p>適用可能なメトリック・タイプの詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p>
<p>検索とクエリーの詳細については、検索と再ランクの章の記事を参照してください：</p>
<ul>
<li><p><a href="/docs/ja/single-vector-search.md">基本的なANN検索</a></p></li>
<li><p><a href="/docs/ja/filtered-search.md">フィルター検索</a></p></li>
<li><p><a href="/docs/ja/range-search.md">範囲検索</a></p></li>
<li><p><a href="/docs/ja/grouping-search.md">グルーピング検索</a></p></li>
<li><p><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></p></li>
<li><p><a href="/docs/ja/with-iterators.md">検索反復子</a></p></li>
<li><p><a href="/docs/ja/get-and-scalar-query.md">クエリー</a></p></li>
<li><p><a href="/docs/ja/full-text-search.md">全文検索</a></p></li>
<li><p><a href="/docs/ja/keyword-match.md">テキストマッチ</a></p></li>
</ul>
<p>さらに、Milvusは検索のパフォーマンスと効率を向上させるための拡張機能も提供しています。これらはデフォルトでは無効になっており、お客様のサービス要件に応じて有効にしたり、使用したりすることができます。それらは以下の通りです。</p>
<ul>
<li><p><a href="/docs/ja/use-partition-key.md">パーティションキーの使用</a></p></li>
<li><p><a href="/docs/ja/mmap.md">mmapの使用</a></p></li>
<li><p><a href="/docs/ja/clustering-compaction.md">クラスタリングコンパクション</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">パーティション<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティションは、親コレクションと同じフィールド・セットを共有するコレクションのサブセットで、それぞれがエンティティのサブセットを含みます。</p>
<p>エンティティを異なるパーティションに割り当てることで、エンティティ・グループを作成できます。特定のパーティションで検索やクエリを行うことで、milvusが他のパーティションのエンティティを無視し、検索効率を向上させることができます。</p>
<p>詳細については、「<a href="/docs/ja/manage-partitions.md">パーティションの管理</a>」を参照してください。</p>
<h2 id="Shard" class="common-anchor-header">シャード<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>シャードはコレクションの水平方向のスライスです。各シャードはデータ入力チャンネルに対応する。デフォルトでは、すべてのコレクションにシャードがあります。予想されるスループットとコレクションに挿入するデータ量に基づいて、コ レクションを作成するときに適切なシャードの数を設定できます。</p>
<p>シャード数を設定する方法の詳細は、<a href="/docs/ja/create-collection.md">Create Collectionを</a>参照してください。</p>
<h2 id="Alias" class="common-anchor-header">エイリアス<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションにエイリアスを作成できます。コレクションは複数のエイリアスを持つことができますが、コレクションはエイリアスを共有できません。コレクションに対するリクエストを受け取ると、Milvusは指定された名前に基づいてコレクションを検索します。指定された名前のコレクションが存在しない場合、Milvusはエイリアスとして指定された名前を探し続けます。コレクションエイリアスを使用すると、コードをさまざまなシナリオに適応させることができます。</p>
<p>詳細については、<a href="/docs/ja/manage-aliases.md">エイリアスの</a>管理を参照してください。</p>
<h2 id="Function" class="common-anchor-header">関数<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusがコレクション作成時にフィールドを導出するための関数を設定できます。たとえば、全文検索関数は、ユーザ定義関数を使用して、特定のvarcharフィールドからスパースベクトルフィールドを導出します。全文検索の詳細については、<a href="/docs/ja/full-text-search.md">全文検索を</a>参照してください。</p>
<h2 id="Consistency-Level" class="common-anchor-header">一貫性レベル<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>分散データベースシステムでは通常、整合性レベルを使用してデータノードやレプリカ間のデータの同一性を定義します。コ レ ク シ ョ ン を作成す る 際や、 コ レ ク シ ョ ン内で類似性検索を実行する際に、 個別の一貫性レベルを設定できます。適用可能な一貫性レベルは、<strong>Strong</strong>、<strong>Bounded Staleness</strong>、<strong>Session</strong>、および<strong>Eventually</strong>です。</p>
<p>これらの一貫性レベルの詳細については、<a href="/docs/ja/tune_consistency.md">一貫性</a>レベルを参照してください。</p>
