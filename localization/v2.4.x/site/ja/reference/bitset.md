---
id: bitset.md
summary: Milvusのビットセットについて学ぶ。
title: ビットセット
---
<h1 id="Bitset" class="common-anchor-header">ビットセット<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusの属性フィルタリングや<a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">削除操作などの</a>主要な機能を実現するビットセットメカニズムについて紹介します。</p>
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
    </button></h2><p>ビットセットはビットの集合です。ビットは2つの値しか取り得ない要素であり、最も一般的なものは<code translate="no">0</code> と<code translate="no">1</code> 、またはブール値<code translate="no">true</code> と<code translate="no">false</code> です。Milvusでは、ビットセットはビット番号<code translate="no">0</code> と<code translate="no">1</code> の配列であり、int、float、または char とは対照的に、特定のデータをコンパクトかつ効率的に表現するために使用することができます。ビット番号はデフォルトで<code translate="no">0</code> 、特定の条件を満たした場合のみ<code translate="no">1</code> 。</p>
<p>ビットセットに対する演算は<a href="/docs/ja/v2.4.x/boolean.md">ブーリアンロジックで</a>行われ、出力値は有効か無効かのどちらかになり、それぞれ<code translate="no">1</code> 、<code translate="no">0</code> 。例えば、<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">論理演算子</a> <code translate="no">AND</code> は、同じインデックス位置にある項目に基づいて2つのビットセットを比較し、その結果を新しいビットセットとして生成するために使用できます。ある位置にある2つの項目が同じであれば、新しいビットセットではその位置に<code translate="no">1</code> 、異なる場合は<code translate="no">0</code> 。</p>
<h2 id="Implementation" class="common-anchor-header">実装<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>BitsetはMilvusがTime Travelで属性フィルタリング、データ削除、クエリを実行するためのシンプルかつ強力なメカニズムです。</p>
<h3 id="Attribute-filtering" class="common-anchor-header">属性フィルタリング</h3><p>ビットセットには2つの値しか含まれないため、<a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">属性フィルタリングの</a>結果を保存するのに最適です。指定された属性フィルタの要件を満たすデータは<code translate="no">1</code> でマークされます。</p>
<h3 id="Data-deletion" class="common-anchor-header">データの削除</h3><p>ビットセットは、セグメント内の行が削除されたかどうかの情報を格納するコンパクトな方法として機能する。削除されたエンティティは、対応するビットセットに<code translate="no">1</code> でマークされます。これは、検索中やクエリ中に<a href="https://milvus.io/blog/deleting-data-in-milvus.md">計算されることはありません</a>。</p>
<h2 id="Examples" class="common-anchor-header">例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>ここでは、Milvusにおけるビットセットの使用方法について3つの例を示す。この3つの例では、8つのエンティティを持つセグメントがあり、一連のデータ操作言語（DML）イベントが以下の順序で行われる。</p>
<ul>
<li><code translate="no">primary_key</code>sがそれぞれ[1、2、3、4]であるエンティティのうち4つは、タイムスタンプ<code translate="no">ts</code> が100になったときに挿入される。</li>
<li><code translate="no">primary_key</code>sが[5, 6, 7, 8]である残りの4つのエンティティは、タイムスタンプ<code translate="no">ts</code> が200になったときに挿入される。</li>
<li><code translate="no">primary_key</code>sが[7, 8]であるエンティティは、タイムスタンプ<code translate="no">ts</code> が300になったときに削除される。</li>
<li><code translate="no">primary_key</code>が [1, 3, 5, 7] であるエンティティだけが、属性フィルタリングの条件を満たす。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>DMLイベントの順序</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">ケース1</h3><p>この場合、ユーザは<code translate="no">time_travel</code> を 150 に設定する。これは、<code translate="no">ts = 150</code> を満たすデータに対してクエリを実行することを意味する。ビットセット生成プロセスを図1に示す。</p>
<p>最初のフィルタリング段階では、<code translate="no">filter_bitset</code> は<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> であるべきである。ここで、エンティティ [1、3、5、7] は有効なフィルタリング結果であるため、<code translate="no">1</code> としてマークされる。</p>
<p>しかし、エンティティ[4, 5, 6, 7]は、<code translate="no">ts</code> が 150 のとき、ベクトルデータベースに挿入されなかった。したがって、これら4つのエンティ ティは、フィルタリング条件に関係なく0とマークされるべきである。これで、ビットセットの結果は<code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> となる。</p>
<p><a href="#data-deletion">データ削除で</a>説明したように、<code translate="no">1</code> でマークされたエンティ ティは、検索中またはクエリ中は無視される。ビットセットの結果は、削除ビットマップと結合するために反転する必要があり、<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> が得られます。</p>
<p>削除ビットセット<code translate="no">del_bitset</code> に関しては、初期値は<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> であるべきである。しかし、エンティティ7と8は、<code translate="no">ts</code> が300になるまで削除されない。したがって、<code translate="no">ts</code> が150のとき、エンティ ティ7と8はまだ有効である。その結果、タイムトラベル後の<code translate="no">del_bitset</code> の値は<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> となる。</p>
<p>これで、Time Travelと属性フィルタリング後の2つのビットセットができあがった:<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> と<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。  この2つのビットセットを<code translate="no">OR</code> 二項論理演算子で結合する。result_bitsetの最終的な値は<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 。つまり、次の検索またはクエリの段階では、エンティティ1と3のみが計算されます。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>図1.タイムトラベル=150での検索</span>。 </span></p>
<h3 id="Case-two" class="common-anchor-header">ケース2</h3><p>この場合、ユーザは<code translate="no">time_travel</code> を 250 に設定する。ビットセット生成プロセスを図2に示す。</p>
<p>ケース1と同様に、最初の<code translate="no">filter_bitset</code> は<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> である。</p>
<p><code translate="no">ts</code> = 250のとき、すべてのエンティ ティはベクトルデータベースにある。したがって、タイムスタンプを考慮しても、<code translate="no">filter_bitset</code> は変わらない。この場合も、結果を反転して<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> を得る必要がある。</p>
<p>削除ビットセット<code translate="no">del_bitset</code> に関しては、初期値は<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> である。ただし、エンティティ7と8は、<code translate="no">ts</code> が300になるまで削除されなかった。したがって、<code translate="no">ts</code> が250 のとき、エンティティ7と8はまだ有効である。その結果、タイムトラベル後の<code translate="no">del_bitset</code> は<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> となる。</p>
<p>これで、Time Travelと属性フィルタリング後の2つのビットセットができあがった:<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> と<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。この2つのビットセットを<code translate="no">OR</code> 二項論理演算子で結合する。結果_ビットセットは<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。つまり、エンタイト[1,3,5,7]だけが、次の検索またはクエリーの段階で計算される。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>図2.時間旅行 = 250 での検索</span>。 </span></p>
<h3 id="Case-three" class="common-anchor-header">ケース3</h3><p>この場合、ユーザーは<code translate="no">time_travel</code> を 350 と設定する。ビットセット生成プロセスを図3に示す。</p>
<p>前のケースと同様に、最初の<code translate="no">filter_bitset</code> は<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> である。</p>
<p><code translate="no">ts</code>= 350のとき、すべてのエンティ ティがベクトルデータベースにある。したがって、最終的に反転した<code translate="no">filter_bitset</code> は<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 、ケース2と同じである。</p>
<p>削除ビットセット<code translate="no">del_bitset</code> については、<code translate="no">ts = 350</code> の時点でエンティ ティ7と8がすでに削除されているため、<code translate="no">del_bitset</code> の結果は<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> となる。</p>
<p>タイムトラベルと属性フィルタリングの結果、<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 、<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。  この2つのビットセットを<code translate="no">OR</code> 二項論理演算子で結合する。究極の<code translate="no">result_bitset</code> は<code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code> 。つまり、エンティティ[1, 3, 5]だけが、次の検索またはクエリの段階で計算される。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>図3.タイムトラベル=350での検索</span>。 </span></p>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでビットセットがどのように機能するかがわかったところで、次のこともやってみましょう：</p>
<ul>
<li><a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">文字列を使って</a>検索結果を<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">フィルタリングする</a>方法を学ぶ。</li>
<li>Milvusで<a href="https://milvus.io/docs/v2.1.x/data_processing.md">データがどのように処理されるかを</a>理解する。</li>
</ul>
