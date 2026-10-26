---
id: bitset.md
summary: Milvusにおけるビットセットについて学びましょう。
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
    </button></h1><p>このトピックでは、Milvusにおける属性フィルタリングや<a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">削除操作</a>といった主要な機能を実現する「ビットセット」の仕組みについて紹介します。</p>
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
    </button></h2><p>ビットセットとは、ビットの集合のことです。ビットは、2つの値しかとらない要素であり、最も一般的なのは<code translate="no">0</code> と<code translate="no">1</code> 、あるいはブール値の<code translate="no">true</code> と<code translate="no">false</code> です。Milvusでは、ビットセットはビット番号<code translate="no">0</code> および<code translate="no">1</code> の配列であり、int、float、charなどとは対照的に、特定のデータをコンパクトかつ効率的に表現するために使用できます。 ビット番号はデフォルトで<code translate="no">0</code> であり、特定の要件を満たす場合にのみ<code translate="no">1</code> に設定されます。</p>
<p>ビットセットに対する演算は<a href="/docs/ja/boolean.md">ブール論理</a>に基づいて行われ、その下では出力値は有効か無効かのいずれかとなり、それぞれ<code translate="no">1</code> および<code translate="no">0</code> で表されます。 たとえば、<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">論理演算子</a> <code translate="no">AND</code> を使用すると、同じインデックス位置の項目に基づいて2つのビットセットを比較し、その結果を含む新しいビットセットを生成することができます。ある位置の2つの項目が同じ場合、新しいビットセットのその位置には<code translate="no">1</code> が書き込まれます。異なる場合は、<code translate="no">0</code> が書き込まれます。</p>
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
    </button></h2><p>Bitsetは、Milvusが属性フィルタリング、データの削除、およびTime Travelによるクエリを実行するのに役立つ、シンプルでありながら強力なメカニズムです。</p>
<h3 id="Attribute-filtering" class="common-anchor-header">属性フィルタリング<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>ビットセットは2つの値しか取らないため、<a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">属性フィルタリング</a>の結果を格納するのに最適です。指定された属性フィルタの条件を満たすデータには、<code translate="no">1</code> が設定されます。</p>
<h3 id="Data-deletion" class="common-anchor-header">データの削除<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>ビットセットは、セグメント内の行が削除されたかどうかに関する情報をコンパクトに格納するための手段として機能します。削除されたエンティティは、対応するビットセット内で<code translate="no">1</code> としてマークされ、検索やクエリの実行時には<a href="https://milvus.io/blog/deleting-data-in-milvus.md">計算対象から除外されます</a>。</p>
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
    </button></h2><p>ここでは、前述の3つの主要なビットセット実装すべてを参照しつつ、Milvusにおけるビットセットの使用方法を説明する3つの例を紹介します。3つのケースすべてにおいて、8つのエンティティを含むセグメントがあり、その後、以下に示す順序で一連のデータ操作言語（DML）イベントが発生します。</p>
<ul>
<li><code translate="no">primary_key</code>がそれぞれ[1, 2, 3, 4]である4つのエンティティは、タイムスタンプ<code translate="no">ts</code> が100のときに挿入されます。</li>
<li>残りの 4 つのエンティティ（<code translate="no">primary_key</code>が [5, 6, 7, 8]）は、タイムスタンプ<code translate="no">ts</code> が 200 になったときに挿入されます。</li>
<li><code translate="no">primary_key</code>が [7, 8] であるエンティティは、タイムスタンプ<code translate="no">ts</code> が 300 になったときに削除されます。</li>
<li><code translate="no">primary_key</code>が [1, 3, 5, 7] であるエンティティのみが、属性フィルタリングの条件を満たします。</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>DMLイベントの順序</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">ケース 1<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>このケースでは、ユーザーが<code translate="no">time_travel</code> を 150 に設定します。これは、ユーザーが<code translate="no">ts = 150</code> を満たすデータに対してクエリを実行することを意味します。ビットセットの生成プロセスを図 1 に示します。</p>
<p>初期フィルタリング段階では、<code translate="no">filter_bitset</code> は<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> となるべきであり、エンティティ [1, 3, 5, 7] は有効なフィルタリング結果であるため、<code translate="no">1</code> としてマークされます。</p>
<p>しかし、<code translate="no">ts</code> が150のとき、エンティティ[5, 6, 7, 8]はベクトルデータベースに挿入されていませんでした。したがって、これらの4つのエンティティは、フィルタリング条件にかかわらず0としてマークされる必要があります。これにより、ビットセットの結果は<code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> となります。</p>
<p>「<a href="#data-deletion">データの削除</a>」で説明したように、<code translate="no">1</code> でマークされたエンティティは、検索やクエリの際に見逃されます。削除ビットマップと組み合わせるために、このビットセットの結果を反転させる必要があり、その結果、<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> となります。</p>
<p>削除ビットセット<code translate="no">del_bitset</code> については、初期値は<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> となるはずです。しかし、エンティティ 7 と 8 は、<code translate="no">ts</code> が 300 になるまで削除されません。したがって、<code translate="no">ts</code> が 150 の時点では、エンティティ 7 と 8 は依然として有効です。その結果、タイムトラベル後の<code translate="no">del_bitset</code> の値は<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> となります。</p>
<p>これで、「Time Travel」と属性フィルタリングの適用後、2つのビットセットが得られました：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> および<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> です。これら2つのビットセットを、<code translate="no">OR</code> という二進論理演算子を用いて結合します。result_bitsetの最終的な値は<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> となり、これは、次の検索またはクエリ段階ではエンティティ1と3のみが計算対象となることを意味します。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>図1. Time Travel = 150 での検索。</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">ケース2<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>このケースでは、ユーザーが<code translate="no">time_travel</code> を250に設定します。ビットセットの生成プロセスは図2に示されています。</p>
<p>ケース1と同様に、初期の<code translate="no">filter_bitset</code> は<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> です。</p>
<p><code translate="no">ts</code> = 250 の場合、すべてのエンティティはベクトルデータベース内に存在します。したがって、タイムスタンプを考慮しても、<code translate="no">filter_bitset</code> は変わりません。ここでも、結果を反転させて<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> を得る必要があります。</p>
<p>削除ビットセット<code translate="no">del_bitset</code> については、初期値は<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> です。しかし、エンティティ7と8は、<code translate="no">ts</code> が300になるまで削除されませんでした。したがって、<code translate="no">ts</code> が250の時点では、エンティティ7と8は依然として有効です。その結果、タイムトラベル後の<code translate="no">del_bitset</code> は<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> となります。</p>
<p>これで、「Time Travel」と属性フィルタリングの後に、2つのビットセットが得られました：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> および<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> です。これら2つのビットセットを、<code translate="no">OR</code> という二値論理演算子で結合します。その結果得られる結果ビットセット（result_bitset）は<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> となります。つまり、次の検索またはクエリ段階では、エンティティ [1, 3, 5, 7] のみが計算対象となります。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>図2. Time Travel = 250 での検索。</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">ケース3<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>このケースでは、ユーザーが<code translate="no">time_travel</code> を350に設定します。ビットセットの生成プロセスを図3に示します。</p>
<p>前のケースと同様、初期の<code translate="no">filter_bitset</code> は<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> です。</p>
<p><code translate="no">ts</code>= 350 の場合、すべてのエンティティはベクトルデータベース内に存在します。したがって、最終的に反転された<code translate="no">filter_bitset</code> は<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> となり、ケース2と同じになります。</p>
<p>削除ビットセット<code translate="no">del_bitset</code> については、<code translate="no">ts = 350</code> の時点でエンティティ 7 と 8 はすでに削除されているため、<code translate="no">del_bitset</code> の結果は<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> となります。</p>
<p>これで、タイムトラベルと属性フィルタリングを経て、2つのビットセットが得られました：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> および<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> です。これら2つのビットセットを、<code translate="no">OR</code> という二進論理演算子で結合します。最終的な<code translate="no">result_bitset</code> は<code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code> となります。つまり、次の検索またはクエリ段階では、エンティティ [1, 3, 5] のみが計算対象となります。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>図3. タイムトラベル = 350 での検索。</span>
  
 </span></p>
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
    </button></h2><p>Milvus におけるビットセットの仕組みがわかったところで、次のことも試してみるとよいでしょう：</p>
<ul>
<li><a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">文字列を使用して検索結果をフィルタリングする方法を</a>学ぶか、ドキュメントの「<a href="https://milvus.io/docs/hybridsearch.md">ハイブリッド検索</a>」を参照してください。</li>
<li>Milvus での<a href="https://milvus.io/docs/v2.1.x/data_processing.md">データ処理の仕組み</a>を理解する。</li>
</ul>
