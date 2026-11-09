---
id: manage-collections.md
title: コレクションの解説
summary: >-
  Milvus
  では、データを管理するために複数のコレクションを作成し、そのコレクションにエンティティとしてデータを挿入することができます。コレクションとエンティティは、リレーショナルデータベースのテーブルやレコードに似ています。このページでは、コレクションおよび関連する概念について解説します。
---
<h1 id="Collection-Explained" class="common-anchor-header">コレクションの解説<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、データを管理するために複数のコレクションを作成し、データをエンティティとしてコレクションに挿入することができます。コレクションとエンティティは、リレーショナルデータベースにおけるテーブルやレコードに類似しています。このページでは、コレクションおよび関連する概念について解説します。</p>
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
    </button></h2><p>コレクションとは、列が固定され、行が可変である2次元テーブルのことです。各列はフィールドを表し、各行はエンティティを表します。</p>
<p>次の図は、8つの列と6つのエンティティを持つコレクションを示しています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>コレクションの解説</span>
  
 </span></p>
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
    </button></h2><p>オブジェクトを記述する際、通常はサイズ、重量、位置などの属性について言及します。これらの属性を、コレクション内のフィールドとして使用できます。各フィールドには、データ型やベクトルフィールドの次元数など、さまざまな制約となる特性があります。フィールドを作成し、その順序を定義することで、コレクションスキーマを形成できます。 使用可能なデータ型については、「<a href="/docs/ja/schema.md">スキーマの解説</a>」を参照してください。</p>
<p>挿入するエンティティには、スキーマで定義されたすべてのフィールドを含める必要があります。一部のフィールドをオプションにするには、動的フィールドを有効にすることを検討してください。詳細については、「<a href="/docs/ja/enable-dynamic-field.md">動的フィールド</a>」を参照してください。</p>
<ul>
<li><p><strong>フィールドをNULL許可にするか、デフォルト値を設定する</strong></p>
<p>フィールドをNULL許可にする方法やデフォルト値の設定方法の詳細については、「<a href="/docs/ja/nullable-and-default.md">NULL許可とデフォルト値</a>」を参照してください。</p></li>
<li><p><strong>動的フィールドの有効化</strong></p>
<p>動的フィールドの有効化および使用方法の詳細については、「<a href="/docs/ja/enable-dynamic-field.md">動的フィールド</a>」を参照してください。</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">主キーとAutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>リレーショナルデータベースの主キーと同様に、コレクションにはエンティティを他のエンティティと区別するための主キーフィールドがあります。主キーフィールドの各値はグローバルに一意であり、1つの特定のエンティティに対応します。</p>
<p>上の図に示すように、<strong>id</strong>という名前のフィールドが主キーとして機能しており、最初の ID<strong>0 は</strong>「<em>The Mortality Rate of Coronavirus is Not Important</em>」というタイトルのエンティティに対応しています。主キーが 0 であるエンティティは、これ以外に存在しません。</p>
<p>主キーフィールドには、整数または文字列のみ指定できます。エンティティを挿入する際は、デフォルトで主キーフィールドの値を含める必要があります。ただし、コレクションの作成時に<strong>AutoId を</strong>有効にしている場合、Milvus はデータ挿入時にそれらの値を自動生成します。その場合は、挿入するエンティティから主キーフィールドの値を除外してください。</p>
<p>詳細については、「<a href="/docs/ja/primary-field.md">主キーフィールドとAutoId</a>」を参照してください。</p>
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
    </button></h2><p>特定のフィールドにインデックスを作成すると、検索効率が向上します。サービスで依存するすべてのフィールドに対してインデックスを作成することを推奨します。その中でも、ベクトルフィールドへのインデックスは必須です。</p>
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
    </button></h2><p>エンティティとは、コレクション内で同一のフィールドセットを共有するデータレコードのことです。同一行のすべてのフィールドの値が、1つのエンティティを構成します。</p>
<p>コレクションには、必要なだけエンティティを挿入できます。ただし、エンティティの数が増えるにつれて、それに伴うメモリ使用量も増加し、検索パフォーマンスに影響を及ぼします。</p>
<p>詳細については、「<a href="/docs/ja/schema.md">スキーマの解説</a>」を参照してください。</p>
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
    </button></h2><p>コレクションへのロードは、コレクション内での類似度検索やクエリを実行するための前提条件です。コレクションをロードすると、Milvusは検索やクエリへの高速な応答を実現するために、すべてのインデックスファイルと各フィールドの生データをメモリに読み込みます。</p>
<p>検索やクエリはメモリを大量に消費する操作です。コストを節約するため、現在使用していないコレクションは解放することをお勧めします。</p>
<p>詳細については、「<a href="/docs/ja/load-and-release.md">ロードとリリース</a>」を参照してください。</p>
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
    </button></h2><p>インデックスを作成し、コレクションを読み込んだら、1つまたは複数のクエリベクトルを指定して類似性検索を開始できます。たとえば、検索リクエストに含まれるクエリのベクトル表現を受け取ると、Milvusは指定されたメトリックタイプを使用して、クエリベクトルと対象コレクション内のベクトルとの類似性を測定し、クエリと意味的に類似したものを返します。</p>
<p>また、検索やクエリにメタデータによるフィルタリングを含めることで、結果の関連性を高めることもできます。なお、メタデータによるフィルタリング条件は、クエリでは必須ですが、検索ではオプションです。</p>
<p>適用可能なメトリックタイプの詳細については、「<a href="/docs/ja/metric.md">メトリックタイプ」</a>を参照してください。</p>
<p>検索とクエリに関する詳細については、「検索と再ランク付け」の章にある記事を参照してください。その中の基本的な機能は以下の通りです：</p>
<ul>
<li><p><a href="/docs/ja/single-vector-search.md">基本的なANN検索</a></p></li>
<li><p><a href="/docs/ja/filtered-search.md">フィルタリング検索</a></p></li>
<li><p><a href="/docs/ja/range-search.md">範囲検索</a></p></li>
<li><p><a href="/docs/ja/grouping-search.md">グループ化検索</a></p></li>
<li><p><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></p></li>
<li><p><a href="/docs/ja/with-iterators.md">検索イテレータ</a></p></li>
<li><p><a href="/docs/ja/get-and-scalar-query.md">クエリ</a></p></li>
<li><p><a href="/docs/ja/full-text-search.md">全文検索</a></p></li>
<li><p><a href="/docs/ja/keyword-match.md">テキスト一致</a></p></li>
</ul>
<p>さらに、Milvus では検索のパフォーマンスと効率を向上させるための機能強化も提供されています。これらはデフォルトでは無効になっていますが、サービスの要件に応じて有効にして使用することができます。それらは以下の通りです。</p>
<ul>
<li><p><a href="/docs/ja/use-partition-key.md">パーティションキーの使用</a></p></li>
<li><p><a href="/docs/ja/mmap.md">mmap の使用</a></p></li>
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
    </button></h2><p>パーティションはコレクションのサブセットであり、親コレクションと同じフィールドセットを共有し、それぞれエンティティのサブセットを含みます。</p>
<p>エンティティを異なるパーティションに割り当てることで、エンティティのグループを作成できます。特定のパーティションで検索やクエリを実行することで、Milvus が他のパーティションのエンティティを無視するようにし、検索効率を向上させることができます。</p>
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
    </button></h2><p>シャードは、コレクションを水平方向に分割したものです。各シャードは、1つのデータ入力チャネルに対応します。すべてのコレクションには、デフォルトで1つのシャードが存在します。コレクションの作成時に、予想されるスループットやコレクションに挿入されるデータの量に基づいて、適切なシャード数を設定できます。</p>
<p>シャード数の設定方法の詳細については、「<a href="/docs/ja/create-collection.md">コレクションの作成</a>」を参照してください。</p>
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
    </button></h2><p>コレクションのエイリアスを作成できます。 1つのコレクションに複数のエイリアスを設定できますが、コレクション間でエイリアスを共有することはできません。コレクションに対するリクエストを受信すると、Milvusは指定された名前に基づいてコレクションを特定します。指定された名前のコレクションが存在しない場合、Milvusはその名前をエイリアスとして扱い、引き続き検索を続けます。コレクションのエイリアスを使用することで、さまざまなシナリオに合わせてコードを適応させることができます。</p>
<p>詳細については、「<a href="/docs/ja/manage-aliases.md">エイリアスの管理</a>」を参照してください。</p>
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
    </button></h2><p>コレクションの作成時に、Milvusがフィールドを導出するための関数を設定できます。たとえば、全文検索機能では、ユーザー定義関数を使用して、特定のvarcharフィールドからスパースベクトルフィールドを導出します。全文検索の詳細については、<a href="/docs/ja/full-text-search.md">「全文検索</a>」を参照してください。</p>
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
    </button></h2><p>分散データベースシステムでは通常、一貫性レベルを使用して、データノードやレプリカ間のデータの同一性を定義します。コレクションの作成時や、コレクション内での類似度検索を行う際に、個別の整合性レベルを設定できます。適用可能な整合性レベルには、<strong>「Strong」</strong>、<strong>「Bounded Staleness</strong>」、<strong>「Session</strong>」、「<strong>Eventually</strong>」があります。</p>
<p>これらの整合性レベルの詳細については、「<a href="/docs/ja/tune_consistency.md">整合性レベル</a>」を参照してください。</p>
