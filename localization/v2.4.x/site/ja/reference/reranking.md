---
id: reranking.md
summary: このトピックでは、リランキング・プロセスを取り上げ、その意義と2つのリランキング手法の実装について説明する。
title: 再ランキング
---
<h1 id="Reranking" class="common-anchor-header">リランキング<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>APIを使用してハイブリッド検索機能を実現し、複数の<code translate="no">AnnSearchRequest</code> インスタンスから検索結果を絞り込むための洗練されたリランキング戦略を組み込んでいます。このトピックではリランキングプロセスを取り上げ、その意義とMilvusにおける様々なリランキング戦略の実装について説明します。</p>
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
    </button></h2><p>以下の図はMilvusにおけるハイブリッド検索の実行を示しており、そのプロセスにおけるリランキングの役割を強調しています。</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>ハイブリッド検索における再ランク付けは、複数のベクトルフィールドからの結果を統合し、最終的な出力が関連性があり、正確に優先順位付けされていることを保証する重要なステップです。現在、Milvusは以下の再ランク付け戦略を提供しています：</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>:このアプローチは、異なるベクトル検索からのスコア（またはベクトル距離）の加重平均を計算することによって結果を統合します。各ベクトルフィールドの重要性に基づいて重み付けを行います。</p></li>
<li><p><code translate="no">RRFRanker</code>:異なるベクトル列の順位に基づいて結果を結合する。</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">重み付きスコアリング（WeightedRanker）<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">WeightedRanker</code> 戦略は、各ベクトルフィールドの重要度に基づいて、各ベクトル検索ルートからの結果に異なる重みを割り当てます。このリランキング戦略は、各ベクトルフィールドの重要度が異なる場合に適用され、より高い重みを割り当てることで、他のフィールドよりも特定のベクトルフィールドを強調することができます。例えば、マルチモーダル検索では、画像の色分布よりもテキストの説明の方が重要だと考えられるかもしれない。</p>
<p>WeightedRankerの基本的なプロセスは以下の通りです：</p>
<ul>
<li><p><strong>検索時にスコアを収集する</strong>：異なるベクトル検索ルートから検索結果とそのスコアを収集する。</p></li>
<li><p><strong>スコアの正規化</strong>：各ルートからのスコアを[0,1]の範囲に正規化する。スコアの分布はメトリックの種類によって異なるため、この正規化は非常に重要である。例えば、IPの距離は[-∞,+∞]、L2の距離は[0,+∞]です。Milvusは<code translate="no">arctan</code> 関数を採用し、値を[0,1]の範囲に変換することで、異なるメトリックタイプに対して標準化された基準を提供します。</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>重みの割り当て</strong>：各ベクトル検索ルートに重み（<code translate="no">w𝑖</code> ）を割り当てる。ユーザーは、データ・ソースの信頼性、精度、またはその他の適切なメトリックを反映する重みを指定します。各重みの範囲は [0,1] です。</p></li>
<li><p><strong>スコア・フュージョン</strong>：正規化されたスコアの加重平均を計算し、最終的なスコアを導き出します。次に、この最高スコアから最低スコアに基づいて結果をランク付けし、最終的なソート結果を生成する。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>重み付き再ランカー</span> </span></p>
<p>このストラテジーを使用するには、<code translate="no">WeightedRanker</code> インスタンスを適用し、可変数の数値引数を渡して重み値を設定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>以下の点に注意：</p>
<ul>
<li><p>各重み値の範囲は 0（最も重要でない）から 1（最も重要）までで、最終的な集計スコアに影響する。</p></li>
<li><p><code translate="no">WeightedRanker</code> で指定する重み値の総数は、先に作成した<code translate="no">AnnSearchRequest</code> インスタンスの数と同じでなければならない。</p></li>
<li><p>異なるメトリックタイプの異なる測定値のため、我々は想起結果の距離が区間[0,1]になるように正規化する。最終的なスコアは重み値と距離の合計となる。</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">レシプロランク・フュージョン（RRFRanker）<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRFは、順位の逆数に基づいてランキングリストを結合するデータフュージョン手法である。特に重要度の優先順位が明確でない場合に、各ベクトルフィールドの影響力をバランスさせる効果的な方法です。この方法は通常、すべてのベクトルフィールドを同等に考慮したい場合や、各フィールドの相対的な重要性が不明確な場合に使用されます。</p>
<p>RRFの基本的なプロセスは以下の通りである：</p>
<ul>
<li><p><strong>検索時にランキングを収集する</strong>：複数のベクトルフィールドにまたがるリトリーバーが結果を取得し、ソートする。</p></li>
<li><p><strong>ランク融合</strong>：RRFアルゴリズムは、各リトリーバーからのランクを重み付けし、結合する。計算式は以下の通り：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>RRF-RANKER</span> </span></p>
<p>ここで、↪Lu_1 は異なる検索ルートの数を表し、rank𝑖(↪Ll_1D451) は𝑖番目の検索エンジンによって検索されたドキュメント𝑑のランク位置、↪Ll_1D458 は平滑化パラメータで、通常は60に設定される。</p></li>
<li><p><strong>総合ランキング</strong>：最終的な結果を生成するために、検索された結果を総合スコアに基づいて再ランク付けする。</p></li>
</ul>
<p>この戦略を使用するには、<code translate="no">RRFRanker</code> インスタンスを適用する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRFでは、明示的な重みを指定することなく、分野間の影響力のバランスをとることができる。最終的なランキングでは、複数のフィールドで合意された上位のマッチが優先されます。</p>
