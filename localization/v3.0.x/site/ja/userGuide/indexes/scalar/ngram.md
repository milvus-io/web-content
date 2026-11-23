---
id: ngram.md
title: NGRAM
summary: VARCHAR フィールドおよび JSON 文字列パスに対しては、LIKE および適用可能な正規表現フィルターに NGRAM を使用してください。
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">NGRAM</code> <code translate="no">VARCHAR</code> フィールドおよびJSON文字列パスにおけるLIKEおよび対応する正規表現フィルターの処理を高速化します。文字列シーケンスを使用して一致するエンティティを絞り込みますが、一部のパターンでは元の値の確認が必要となります。</p>
<p><code translate="no">title LIKE &quot;%vector%&quot;</code> や<code translate="no">message =~ &quot;error.*timeout&quot;</code> など、リテラルテキストとして使用可能な接頭辞、接尾辞、部分文字列、ワイルドカード、または正規表現によるフィルタリングに利用します。構文については、<a href="/docs/ja/pattern-matching.md">「パターンマッチング</a>」を参照してください。</p>
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
    </button></h2><h3 id="Supported-data-types" class="common-anchor-header">サポートされるデータ型<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">VARCHAR</code> <code translate="no">VARCHAR</code> に変換されたフィールドおよび JSON パス。JSON パスには および が必要です。「<code translate="no">json_path</code> <code translate="no">json_cast_type</code><a href="/docs/ja/json-indexing.md">JSON インデックス作成</a>」を参照してください。</p>
<p><a id="Queries-accelerated-by-NGRAM"></a></p>
<p><a id="Supported-filters"></a></p>
<p><a id="Filter-expression-examples"></a></p>
<h3 id="Filter-acceleration" class="common-anchor-header">フィルタ処理の高速化<button data-href="#Filter-acceleration" class="anchor-icon" translate="no">
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
    </button></h3><p>クエリは、インデックスが設定されたフィールドまたはJSONパスを対象とする必要があります。以下の例は各パターンを示しています。高速化の適用可否は、最後の列に記載された条件によって決まります：</p>
<table>
<thead>
<tr><th>パターン</th><th>式例</th><th>高速化の条件と動作</th></tr>
</thead>
<tbody>
<tr><td>接頭辞または接尾辞のリテラル</td><td><code translate="no">text LIKE &quot;database%&quot;</code> または<code translate="no">text LIKE &quot;%database&quot;</code></td><td>少なくとも<code translate="no">min_gram</code> 文字が必要です。候補を検索し、その後、元の値をチェックします。</td></tr>
<tr><td>部分文字列リテラル</td><td><code translate="no">text LIKE &quot;%database%&quot;</code></td><td>少なくとも<code translate="no">min_gram</code> 文字が必要です。<code translate="no">[min_gram, max_gram]</code> の範囲内で完全一致を返します。リテラルがこれより長い場合、再チェックの対象となる候補が生成されます。</td></tr>
<tr><td>一般的なLIKE</td><td><code translate="no">text LIKE &quot;%st%um%&quot;</code></td><td>空でない各リテラル断片が<code translate="no">min_gram</code> を満たす候補を検索し、その後、元の値を検証します。</td></tr>
<tr><td>正規表現</td><td><code translate="no">text =~ &quot;error.*timeout&quot;</code></td><td>適切なリテラルを抽出できる場合に候補を検索し、その後、正規表現全体を検証します。</td></tr>
</tbody>
</table>
<p>インデックス付き JSON 文字列パスの場合は、式内でそのパスを使用します（例：<code translate="no">json_field[&quot;body&quot;] LIKE &quot;%database%&quot;</code> ）。LIKE の例や<a href="/docs/ja/pattern-matching.md#Common-regex-patterns">正規表現の例</a>については、「<a href="/docs/ja/pattern-matching.md#Common-LIKE-patterns">パターンマッチング</a>」を参照してください。</p>
<p>適切なリテラルがない場合、Milvusはデータをスキャンします。<code translate="no">NGRAM</code> は、直接的な等価性、メンバーシップ、または範囲検索ではなく、パターン検索を提供します。これらのルールは、<a href="/docs/ja/pattern-matching.md#Accelerate-pattern-matching-with-indexes">クエリ計画の簡略化</a>後に適用されます。</p>
<div class="alert note">
<blockquote>
<p>これらはインデックスの機能であり、有効なフィルタ式に対する制限ではありません。共有検索の制約については、「<a href="/docs/ja/scalar_index.md#Filter-execution">スカラーインデックス」を</a>参照してください。<code translate="no">AND</code> 、<code translate="no">OR</code> 、<code translate="no">NOT</code> 、およびNULLテスト（<code translate="no">IS NULL</code> 、<code translate="no">IS NOT NULL</code> ）については、<a href="/docs/ja/basic-operators.md">「基本演算子</a>」を参照してください。</p>
</blockquote>
</div>
<h3 id="Usage-notes" class="common-anchor-header">使用上の注意<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
    </button></h3><p>N-gramの分解は文字単位で行われ、言語に依存せず、空白や句読点も含まれます。大文字と小文字は区別されます。グラムの範囲を広くすると、生成されるグラムの数が増え、インデックスも大きくなります。メモリが限られている場合は、大規模なポスティングリストに対して<a href="/docs/ja/mmap.md">mmapの使用</a>を検討してください。</p>
<div class="alert note">
<p><code translate="no">[a-z]+</code> のような固定リテラルを含まない正規表現パターンは、スキャン処理に切り替わる場合があります。<code translate="no">(?i)</code> を含む大文字小文字を区別しないパターンも、<code translate="no">NGRAM</code> による最適化をスキップする可能性があります。候補の検証には完全な RE2 パターンが使用され、正規表現のマッチ結果が保持されます。</p>
</div>
<h3 id="Memory-considerations" class="common-anchor-header">メモリに関する考慮事項<button data-href="#Memory-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>メモリ使用量の概算を求めるには、<code translate="no">S</code> バイトを使用します。ここで、<code translate="no">S</code> は、ストレージ圧縮前の構築済みインデックスのサイズです。<code translate="no">S</code> は、代表的なデータに基づいて構築することで算出してください。生のテキストサイズは代用できません。グラムの範囲やデータの分布は、構築後のサイズに影響を与えます。</p>
<p>これらの概算値は、メモリマッピングを無効にした状態でのロード済みインデックスのメモリ使用量を対象としています。セグメントごとに計算し、ロードされたセグメントとレプリカ全体で合計してください。</p>
<div class="alert note">
<blockquote>
<p>読み込まれたフィールドデータ、ベクトルインデックス、コレクションおよびインデックスのオーバーヘッド、一時的な割り当て用に余分なメモリを確保してください。代表的なデータとクエリで検証してください。配列、JSON、古いインデックス形式、およびメモリマッピングについては、別途測定が必要です。</p>
</blockquote>
</div>
<p><a id="How-it-works"></a></p>
<h3 id="How-NGRAM-works" class="common-anchor-header">NGRAMの仕組み<button data-href="#How-NGRAM-works" class="anchor-icon" translate="no">
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
    </button></h3><p><a id="Phase-1-Build-the-index"></a>
<a id="Phase-2-Accelerate-queries"></a></p>
<p><details>
<summary><strong>構築およびクエリ処理のプロセスを見る</strong></summary></p>
<p>n-gramとは、重複する文字のシーケンスのことです。<code translate="no">n=3</code> を使用すると、<code translate="no">&quot;Milvus&quot;</code> は<code translate="no">&quot;Mil&quot;</code> 、<code translate="no">&quot;ilv&quot;</code> 、<code translate="no">&quot;lvu&quot;</code> 、および<code translate="no">&quot;vus&quot;</code> を生成します。</p>
<p><strong>フェーズ1：インデックスの構築</strong></p>
<p>各文字列について、<code translate="no">min_gram</code> から<code translate="no">max_gram</code> までのすべての長さのグラムを生成します（端数を含む）。<code translate="no">min_gram=2</code> および<code translate="no">max_gram=3</code> に対して、<code translate="no">&quot;AI database&quot;</code> は、<code translate="no">AI</code> 、<code translate="no">I_</code> 、<code translate="no">_d</code> 、<code translate="no">da</code> といった 2-グラムや、<code translate="no">AI_</code> 、<code translate="no">I_d</code> 、<code translate="no">_da</code> 、<code translate="no">dat</code> といった 3-グラムを生成します。ここで、<code translate="no">_</code> はスペースを表します：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>N-gramインデックスの構築</span>
  
 </span></p>
<p>各グラムを、それを含むエンティティIDにマッピングします。たとえば、<code translate="no">&quot;AI&quot;</code> がエンティティ1、5、6、8、9に含まれる場合、<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> を保存します：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>Ngramインデックスの構築 2</span>
  
 </span></p>
<p><strong>フェーズ 2: クエリの高速化</strong></p>
<p>LIKE または条件を満たす正規表現パターンからリテラルテキストを抽出します。たとえば、<code translate="no">&quot;%database%&quot;</code> からは<code translate="no">database</code> が得られ、<code translate="no">&quot;error.*timeout&quot;</code> には<code translate="no">error</code> および<code translate="no">timeout</code> が含まれます。長さが<code translate="no">L</code> のリテラルの場合：</p>
<ul>
<li><code translate="no">L &lt; min_gram</code> の場合、そのリテラルはインデックスを使用できません。</li>
<li><code translate="no">min_gram ≤ L ≤ max_gram</code> の場合、そのリテラルを 1 グラムの単位として検索します。</li>
<li><code translate="no">L &gt; max_gram</code> の場合、リテラルを<code translate="no">max_gram</code> の長さのグラムに、重複するように分割する。</li>
</ul>
<p>グラムのエンティティリストを交差させて候補を特定し、再確認が必要な場合は元のフィルタを適用します。<code translate="no">[min_gram, max_gram]</code> 内の単純な部分文字列リテラルは、再確認なしで完全一致を返します:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>クエリの高速化</span>
  
 </span></p>
<p></details></p>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">NGRAMインデックスの作成<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">VARCHAR</code> フィールド、または<code translate="no">JSON</code> フィールド内の特定のパスに対してNGRAMインデックスを作成できます。<code translate="no">min_gram</code> と<code translate="no">max_gram</code> の両方を正の整数で指定し、<code translate="no">min_gram &lt;= max_gram</code> を指定します。</p>
<p>これらのパラメータは、インデックス付けされた文字列を制御します。これらを変更するには、インデックスを再構築してください:</p>
<table>
<thead>
<tr><th>パラメータ</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">min_gram</code></td><td>文字単位でのシーケンスの最小長さ。また、このインデックスを使用できるリテラル文字列の最小長さも設定します。</td></tr>
<tr><td><code translate="no">max_gram</code></td><td>シーケンスの最大長（文字数）。これより長いクエリリテラルは、この長さの重複するシーケンスに分割されます。</td></tr>
</tbody>
</table>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">例 1: VARCHAR フィールドでの作成<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">VARCHAR</code> フィールドの場合、<code translate="no">field_name</code> を指定し、<code translate="no">min_gram</code> および<code translate="no">max_gram</code> を設定するだけで済みます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
params.put(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).indexType(IndexParam.IndexType.NGRAM)
                        .indexName(<span class="hljs-string">&quot;ngram_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, index.NewNgramIndex(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).WithIndexName(<span class="hljs-string">&quot;ngram_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;text&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Ngram)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;min_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;2&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;max_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;3&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ]))])
    .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">ngram_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;ngram_index&quot;</span>, milvus::IndexType::NGRAM)</span></span>;
ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);

milvus::CreateIndexRequest create_request;
create_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>);
create_request.<span class="hljs-built_in">WithIndexes</span>({ngram_index});
create_request.<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(create_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;ngram_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;NGRAM&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">min_gram</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">max_gram</span>: <span class="hljs-number">3</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;text&quot;,
            &quot;indexName&quot;: &quot;ngram_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;NGRAM&quot;,
                &quot;min_gram&quot;: 2,
                &quot;max_gram&quot;: 3
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この設定により、<code translate="no">text</code> 内の各文字列に対して2-gramおよび3-gramが生成され、それらを逆引きインデックスに格納します。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">例 2: JSON パスでの作成<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>JSONパスの場合は、<code translate="no">VARCHAR</code> キャスト（大文字小文字を区別しない）と以下のグラム設定を使用します。パスおよびキャストの要件については、「<a href="/docs/ja/json-indexing.md#Index-requirements">JSONインデックス作成</a>」を参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
params.put(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>);
params.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>);
params.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;json_field&quot;</span>).indexType(IndexParam.IndexType.NGRAM)
                        .indexName(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

opt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;json_field&quot;</span>, index.NewNgramIndex(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>)).
    WithIndexName(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
opt.WithExtraParam(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">`json_field[&quot;body&quot;]`</span>)
opt.WithExtraParam(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>)

_, err = cli.CreateIndex(ctx, opt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

    <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;json_field&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Ngram)
            .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
                (<span class="hljs-string">&quot;min_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;2&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;max_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;4&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;varchar&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            ]))])
        .<span class="hljs-title function_ invoke__">build</span>()?;
    client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">json_ngram_index</span><span class="hljs-params">(<span class="hljs-string">&quot;json_field&quot;</span>, <span class="hljs-string">&quot;json_ngram_index&quot;</span>, milvus::IndexType::NGRAM)</span></span>;
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);

milvus::CreateIndexRequest create_request;
create_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>);
create_request.<span class="hljs-built_in">WithIndexes</span>({json_ngram_index});
create_request.<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(create_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;json_field&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;json_ngram_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;NGRAM&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">min_gram</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">max_gram</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;json_field[&quot;body&quot;]&#x27;</span>, <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;varchar&quot;</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;json_field&quot;,
            &quot;indexName&quot;: &quot;json_ngram_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;NGRAM&quot;,
                &quot;min_gram&quot;: 2,
                &quot;max_gram&quot;: 4,
                &quot;json_path&quot;: &quot;json_field[\&quot;body\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;varchar&quot;
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">json_field[&quot;body&quot;]</code> が、長さ 2 ～ 4 の部分文字列を使用して、<code translate="no">VARCHAR</code> 値としてインデックス化されます。その他のパスオプションについては、「<a href="/docs/ja/json-indexing.md">JSON インデックス作成</a>」を参照してください。</p>
<h2 id="Drop-an-index" class="common-anchor-header">インデックスの削除<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">drop_index()</code> メソッドを使用して、コレクションから既存のインデックスを削除します。</p>
<div class="alert note">
<blockquote>
<p>スカラーインデックスの削除に関するリリース要件については、「<a href="/docs/ja/scalar_index.md#Drop-index-compatibility">スカラーインデックス</a>」を参照してください。</p>
</blockquote>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexName(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;ngram_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

    <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?;
    client.<span class="hljs-title function_ invoke__">drop_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
                               .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
                               .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;ngram_index&quot;</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexName&quot;: &quot;ngram_index&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">ベストプラクティス<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>検索の挙動に合わせて `<code translate="no">min_gram</code> ` および `<code translate="no">max_gram</code> ` を選択してください</strong></p>
<ul>
<li><p><code translate="no">min_gram=2</code> および<code translate="no">max_gram=3</code> から設定を開始してください。</p></li>
<li><p><code translate="no">min_gram</code> には、ユーザーが入力すると予想される最も短いリテラルを設定します。</p></li>
<li><p><code translate="no">max_gram</code> は、意味のある部分文字列の典型的な長さに近い値に設定します。<code translate="no">max_gram</code> を大きくするとフィルタリング効果は向上しますが、必要なスペースも増えます。</p></li>
</ul></li>
<li><p><strong>選択性の低いグラムは避ける</strong></p>
<p>繰り返し率の高いパターン（例：<code translate="no">&quot;aaaaaa&quot;</code> ）はフィルタリング効果が弱く、得られるメリットも限定的になる可能性があります。</p></li>
<li><p><strong>一貫して正規化を行う</strong></p>
<p>ユースケースで必要であれば、取り込まれたテキストとクエリリテラルに同じ正規化（例：小文字化、先頭・末尾のトリミング）を適用してください。</p></li>
</ul>
