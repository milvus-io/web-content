---
id: scalar_index.md
related_key: scalar_index
summary: Milvusのスカラー指数。
title: スカラーインデックス
---
<h1 id="Scalar-Index" class="common-anchor-header">スカラーインデックス<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusはスカラーフィールドとベクトルフィールドの両方を組み合わせたフィルタリング検索をサポートしている。スカラーフィールドを含む検索の効率を高めるために、Milvusはバージョン2.1.0からスカラーフィールドインデックスを導入しました。本記事では、Milvusにおけるスカラーフィールドインデックスの概要について説明し、その意義と実装を理解していただきます。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでベクトル類似検索を行う場合、論理演算子を使ってスカラーフィールドをブーリアン式に整理することができます。</p>
<p>Milvusはこのようなブーリアン式を含む検索要求を受け取ると、ブーリアン式を抽象構文木(AST)に解析し、属性フィルタリングのための物理計画を生成します。そして、Milvusは各セグメントで物理計画を適用して、フィルタリング結果として<a href="/docs/ja/v2.4.x/bitset.md">ビットセットを</a>生成し、その結果をベクトル検索パラメータとして含めることで、検索範囲を絞り込む。この場合、ベクトル検索の速度は属性フィルタリングの速度に大きく依存する。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>セグメント内の属性フィルタリング</span> </span></p>
<p>スカラーフィールドインデックスは、スカラーフィールドの値を特定の方法で並べ替えることで、属性フィルタリングの速度を確保し、情報検索を高速化する方法である。</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">スカラー・フィールド・インデックスのアルゴリズム<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはスカラーフィールドインデキシングアルゴリズムにより、低いメモリ使用量、高いフィルタリング効率、短いロード時間の達成を目指している。これらのアルゴリズムは<a href="#auto-indexing">オートインデックスと</a> <a href="#inverted-indexing">インバーテッドインデックスの</a>2種類に大別される。</p>
<h3 id="Auto-indexing" class="common-anchor-header">オートインデックス</h3><p>Milvusは<code translate="no">AUTOINDEX</code> 、インデックスタイプを手動で選択する手間を省くオプションを提供しています。<code translate="no">create_index</code> メソッドを呼び出す際、<code translate="no">index_type</code> が指定されていない場合、Milvusはデータ型に基づいて最適なインデックス型を自動的に選択します。</p>
<p>以下の表は、Milvusがサポートしているデータタイプと、それに対応するオートインデックス アルゴリズムの一覧です。</p>
<table>
<thead>
<tr><th>データ型</th><th>オートインデックス アルゴリズム</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>転置インデックス</td></tr>
<tr><td>INT8</td><td>転置インデックス</td></tr>
<tr><td>INT16</td><td>転置インデックス</td></tr>
<tr><td>INT32</td><td>転置インデックス</td></tr>
<tr><td>INT64</td><td>転置インデックス</td></tr>
<tr><td>FLOAT</td><td>転置インデックス</td></tr>
<tr><td>DOUBLE</td><td>転置インデックス</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">転置インデックス</h3><p>転置インデックスでは、インデックスパラメータを手動で指定してスカラフィールドのインデックスを作成する柔軟な方法を提供します。この方法は、ポイントクエリ、パターンマッチクエリ、フルテキスト検索、JSON 検索、ブール検索、さらにはプレフィックスマッチクエリなど、さまざまなシナリオでうまく機能します。</p>
<p>Milvusに実装されている転置インデックスは、全文検索エンジンライブラリである<a href="https://github.com/quickwit-oss/tantivy">Tantivyを</a>利用しています。Tantivyを利用することで、Milvusにおける転置インデックスの効率性と高速性を実現しています。</p>
<p>転置インデックスには、用語辞書と転置リストという2つの主要な構成要素があります。用語辞書にはアルファベット順に並べられたトークン化されたすべての単語が含まれ、転置リストには各単語が出現する文書のリストが含まれる。このセットアップにより、ポイント・クエリや範囲クエリは、総当たり検索よりもはるかに高速で効率的になります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>転置インデックス図</span> </span></p>
<p>転置インデックスを使用する利点は、特に以下の操作において明らかである：</p>
<ul>
<li><strong>ポイント・クエリー</strong>：例えば、<strong>Milvusという</strong>単語を含む文書を検索する場合、まず、<strong>Milvusが</strong>用語辞書に存在するかどうかをチェックする。見つからなければ、その単語を含む文書はない。しかし、見つかった場合は、<strong>Milvusに</strong>関連付けられた転置リストが検索され、その単語を含む文書が示される。この方法は、並べ替えられた用語辞書によって<strong>Milvusという</strong>単語を検索する時間の複雑さが大幅に軽減されるため、100万件の文書を総当たりで検索するよりもはるかに効率的である。</li>
<li><strong>範囲クエリ</strong>：アルファベット順に<strong>veryより</strong>大きい単語を含む文書を検索するような範囲クエリの効率も、ソートされた用語辞書によって向上する。このアプローチは、総当り検索よりも効率的であり、より迅速で正確な結果を提供する。</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">テスト結果</h3><p>Milvusにおけるスカラーインデックスによる性能向上を実証するため、生データに対して転置インデックスと総当たり検索を用いたいくつかの式の性能を比較する実験が行われた。</p>
<p>この実験では、転置インデックスを使用した場合と総当たり検索を使用した場合の2つの条件で様々な式をテストした。公平性を確保するため、毎回同じコレクションを使用し、テスト間で同じデータ配分を維持した。各テストの前に、コレクションを解放し、インデックスを削除して再構築した。さらに、コールドデータとホットデータの影響を最小化するため、各テストの前にウォームクエリを実行し、各クエリを複数回実行して精度を確保した。</p>
<p><strong>100万</strong>レコードのデータセットの場合、<strong>転置インデックスを</strong>使用することで、ポイントクエリで最大<strong>30倍の</strong>性能向上が得られる。より大きなデータセットの場合、パフォーマンス向上はさらに大きくなる可能性がある。</p>
<h2 id="Performance-recommandations" class="common-anchor-header">パフォーマンスに関する推奨事項<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのスカラーフィールドインデックスの能力をフルに活用し、ベクトル類似検索でその力を発揮させるためには、データに基づいて必要なメモリサイズを見積もるモデルが必要かもしれません。</p>
<p>以下の表はMilvusがサポートするすべてのデータタイプの推定関数のリストです。</p>
<ul>
<li><p>数値フィールド</p>
<table>
<thead>
<tr><th>データ型</th><th>メモリ推定関数 (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT16</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT32</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT64</td><td>行数 *<strong>24</strong>/ 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>行数 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>行数 *<strong>24</strong>/ 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>文字列フィールド</p>
<table>
<thead>
<tr><th>文字列の長さ</th><th>メモリ推定関数 (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>行数 *<strong>128</strong>/ 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>行数 *<strong>144</strong>/ 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>行数 *<strong>160</strong>/ 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>行数 *<strong>192</strong>/ 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>行数 *<strong>256</strong>/ 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>行数 *<strong>strLen * 1.5</strong>/ 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">次は<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>スカラー・フィールドにインデックスを作成するには、<a href="/docs/ja/v2.4.x/index-scalar-fields.md">スカラーにインデックスを作成するを</a>参照してください。</p></li>
<li><p>上記の関連用語とルールについては、以下を参照。</p>
<ul>
<li><a href="/docs/ja/v2.4.x/bitset.md">ビットセット</a></li>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索</a></li>
<li><a href="/docs/ja/v2.4.x/boolean.md">ブール式ルール</a></li>
<li><a href="/docs/ja/v2.4.x/schema.md#Supported-data-type">サポートされるデータ型</a></li>
</ul></li>
</ul>
