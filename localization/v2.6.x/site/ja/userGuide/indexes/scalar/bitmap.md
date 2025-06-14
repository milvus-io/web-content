---
id: bitmap.md
title: ビットマップ
related_key: bitmap
summary: ビットマップインデクシングは、カーディナリティの低いスカラーフィールドのクエリ性能を向上させるために考案された効率的なインデックス作成手法である。
---
<h1 id="BITMAP​" class="common-anchor-header">ビットマップ<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>ビットマップインデックスは、カーディナリティの低いスカラーフィールドのクエリ性能を向上させるために考案された効率的なインデックス作成手法です。カーディナリティとは、フィールド内の別個の値の数を指す。別個の要素が少ないフィールドは低カーディナリティとみなされます。</p>
<p>このインデックス・タイプは、フィールド値をコンパクトなバイナリ形式で表現し、それに対して効率的なビット演算を実行することで、スカラ・クエリの検索時間を短縮するのに役立つ。他のタイプのインデックスと比較して、ビットマップインデックスは一般的にスペース効率が高く、カーディナリティの低いフィールドを扱う際のクエリ速度が速くなります。</p>
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
    </button></h2><p>ビットマップという用語は、2つの単語を組み合わせたものである：<strong>ビットと</strong> <strong>マップ</strong>です。ビットはコンピュータにおけるデータの最小単位を表し、<strong>0か</strong> <strong>1の</strong>いずれかの値しか保持できない。この文脈でのマップとは、0と1にどのような値を割り当てるべきかに従ってデータを変換し、整理するプロセスを指す。</p>
<p>ビットマップインデックスは、ビットマップとキーという2つの主要な構成要素からなる。キーはインデックスされたフィールドの一意な値を表す。各一意な値に対して、対応するビットマップが存在する。これらのビットマップの長さは、コレクション内のレコード数に等しい。ビットマップの各ビットは、コレクション内のレコードに対応する。レコード内のインデックス付きフィールドの値がキーと一致する場合、対応するビットは<strong>1に</strong>セットされ、そうでない場合は<strong>0に</strong>セットされる。</p>
<p><strong>Categoryと</strong> <strong>Publicの</strong>フィールドを持つドキュメントのコレクションを考える。<strong>Tech</strong>カテゴリに分類され、<strong>Publicに</strong>公開されている文書を取得したい。この場合、ビットマップインデックスのキーは<strong>Techと</strong> <strong>Publicに</strong>なります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>ビットマップインデックス</span> </span></p>
<p>図に示すように、<strong>Categoryと</strong> <strong>Publicの</strong>ビットマップインデックスは以下のようになります。</p>
<ul>
<li><p><strong>Tech</strong>：[1, 0, 1, 0, 0]で、1番目と3番目の文書だけが<strong>Tech</strong>カテゴリに分類されることがわかる。</p></li>
<li><p><strong>公開</strong>：[1, 0, 0, 1, 0]。これは、1番目と4番目のドキュメントだけが<strong>公開</strong>されていることを示しています。</p></li>
</ul>
<p>両方の条件に一致する文書を見つけるために、これら2つのビットマップに対してビットごとのAND演算を実行します。</p>
<ul>
<li><strong>技術</strong>AND<strong>公開</strong>：[1, 0, 0, 0, 0]</li>
</ul>
<p>結果として得られるビットマップ[1, 0, 0, 0, 0]は、最初の文書<strong>（ID</strong> <strong>1</strong>）のみが両方の基準を満たすことを示している。ビットマップインデックスと効率的なビット演算を使うことで、検索範囲を素早く絞り込むことができ、データセット全体をスキャンする必要がなくなる。</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">ビットマップインデックスの作成<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでビットマップインデックスを作成するには、<code translate="no">create_index()</code> メソッドを使用し、<code translate="no">index_type</code> パラメータを<code translate="no">&quot;BITMAP&quot;</code> に設定する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>この例では、<code translate="no">my_collection</code> コレクションの<code translate="no">category</code> フィールドにビットマップインデックスを作成します。<code translate="no">add_index()</code> メソッドを使用して、フィールド名、インデックスタイプ、インデックス名を指定します。</p>
<p>ビットマップ・インデックスが作成されると、クエリ操作で<code translate="no">filter</code> パラメータを使用して、インデックスが作成されたフィールドに基づくスカラー・フィルタリングを実行できます。これにより、ビットマップインデックスを使用して検索結果を効率的に絞り込むことができます。詳細については、<a href="/docs/ja/boolean.md">メタデータ・フィルタリングを</a>参照してください。</p>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>ビットマップインデックスは、主キーでないスカラーフィールドに対してのみサポートされます。</p></li>
<li><p>フィールドのデータ型は以下のいずれかでなければならない。</p>
<ul>
<li><p><code translate="no">BOOL</code> <code translate="no">INT8</code>, , , , のいずれかでなければなりません。<code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">INT64</code> <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (要素は次のいずれかでなければならない： , , , , , )<code translate="no">BOOL</code> <code translate="no">INT8</code> <code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">INT64</code> <code translate="no">VARCHAR</code></p></li>
</ul></li>
<li><p>ビットマップインデックスは以下のデータ型をサポートしていません。</p>
<ul>
<li><p><code translate="no">FLOAT</code> <code translate="no">DOUBLE</code>: 浮動小数点型はビットマップインデックスのバイナリの性質と互換性がありません。</p></li>
<li><p><code translate="no">JSON</code>:JSONデータ型は、ビットマップインデックスを使用して効率的に表現できない複雑な構造を持っています。</p></li>
</ul></li>
<li><p>ビットマップインデックスは、カーディナリティの高いフィールド（すなわち、多数の異なる値を持つフィールド）には適していません。</p>
<ul>
<li><p>一般的なガイドラインとして、ビットマップインデックスはフィールドのカーディナリティが500未満のときに最も効果的です。</p></li>
<li><p>カーディナリティがこの閾値を超えると、ビットマップインデックスのパフォーマンス上の利点は減少し、ストレージのオーバーヘッドが大きくなります。</p></li>
<li><p>カーディナリティの高いフィールドについては、特定のユースケースやクエリ要件に応じて、転置インデックスなどの別のインデックス作成技術の使用を検討してください。</p></li>
</ul></li>
</ul>
