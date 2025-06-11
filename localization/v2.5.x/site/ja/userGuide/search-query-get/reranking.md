---
id: reranking.md
title: 再ランキング
summary: >-
  ハイブリッド・サーチは、複数のANN検索を同時に行うことで、より正確な検索結果を実現する。複数の検索は複数の結果セットを返すため、結果をマージし、並べ替え、単一の結果セットを返すためのリランキング戦略が必要となります。このガイドでは、Milvusがサポートするリランキング戦略を紹介し、適切なリランキング戦略を選択するためのヒントを提供します。
---

<h1 id="Reranking" class="common-anchor-header">再ランキング<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>ハイブリッド・サーチは、複数のANN検索を同時に行うことで、より正確な検索結果を実現する。複数の検索は複数の結果セットを返すため、結果をマージし、並べ替え、単一の結果セットを返すためのリランキング戦略が必要となります。このガイドでは、Milvusがサポートするリランキング戦略を紹介し、適切なリランキング戦略を選択するためのヒントを提供します。</p>
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
    </button></h2><p>以下の図はマルチモーダル検索アプリケーションでハイブリッド検索を行う際の主なワークフローを示しています。図において、1つのパスはテキストに対する基本的なANN検索であり、もう1つのパスは画像に対する基本的なANN検索である。各パスはそれぞれテキストと画像の類似度スコア<strong>（リミット</strong>1と<strong>リミット2</strong>）に基づいて結果のセットを生成する。その後、再ランク付け戦略が適用され、統一された基準に基づいて2つの結果セットを再ランク付けし、最終的に2つの結果セットを最終的な検索結果セットである<strong>Limit(final)</strong>に統合する。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>マルチベクトル再ランク</span> </span></p>
<p>ハイブリッド検索において、再ランク付けは複数のベクトル検索の結果を統合し、最終的な出力が最も関連性が高く正確であることを保証する重要なステップです。現在、Milvusは以下の2つのリランキング戦略をサポートしています：</p>
<ul>
<li><p><strong><a href="/docs/ja/v2.5.x/reranking.md#WeightedRanker">WeightedRanker</a></strong>：このストラテジーは、異なるベクトル検索からのスコア（または距離）に重み付けされたスコアを計算することで結果を統合します。重み付けは各ベクトルフィールドの重要度に基づいて割り当てられるため、特定のユースケースの優先順位に従ってカスタマイズすることができます。</p></li>
<li><p><strong><a href="/docs/ja/v2.5.x/reranking.md#RRFRanker">RRFRanker（Reciprocal</a>Rank Fusion Ranker）</strong>：このストラテジーは、ランキングに基づいて結果を組み合わせる。異なる検索結果のランクをバランスさせる方法を使用し、多くの場合、多様なデータタイプやモダリティをより公平かつ効果的に統合します。</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">重み付けランカー<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRankerストラテジーは、ベクトル検索の各パスの結果に、その重要性に基づいて異なる重みを割り当てる。</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">WeightedRankerのメカニズム</h3><p>WeightedRanker戦略の主なワークフローは以下の通り：</p>
<ol>
<li><p><strong>検索スコアを集める</strong>：ベクトル検索の各パスの結果とスコアを集める（score_1、score_2）。</p></li>
<li><p><strong>スコアの正規化</strong>：各検索は異なる類似度メトリックを使用する可能性があり、その結果スコア分布は異なる。例えば、類似性のタイプとして内積（IP）を使用した場合、スコアは[-∞,+∞]の範囲となり、ユークリッド距離（L2）を使用した場合、スコアは[0,+∞]の範囲となる。異なる検索からのスコア範囲は様々であり、直接比較することができないため、各検索パスからのスコアを正規化する必要がある。通常、<code translate="no">arctan</code> 関数を適用して、スコアを [0, 1] の間の範囲に変換する（score_1_normalized, score_2_normalized）。スコアが1に近いほど類似性が高いことを示す。</p></li>
<li><p><strong>重みを割り当てる</strong>：異なるベクトル場に割り当てられた重要度に基づいて、重み<strong>（wi</strong>）が正規化スコア（score_1_normalized, score_2_normalized）に割り当てられる。各パスの重みは[0,1]の範囲とする。得られた重み付きスコアは score_1_weighted と score_2_weighted となる。</p></li>
<li><p><strong>スコアのマージ</strong>：重み付きスコア(score_1_weighted, score_2_weighted)を高いものから低いものへとランク付けし、最終的なスコア(score_final)を生成する。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>重み付き再ランカー</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">WeightedRankerの例</h3><p>この例は画像とテキストを含むマルチモーダルハイブリッド検索（topK=5）を示し、WeightedRanker戦略が2つのANN検索の結果をどのようにランク付けし直すかを説明する。</p>
<ul>
<li>画像に対するANN検索結果（topK=5）：：画像</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>スコア（画像）</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>テキスト（topK=5）に対するANN検索結果</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>スコア（テキスト）</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>WeightedRankerを使用して、画像とテキストの検索結果に重みを割り当てる。画像ANN検索の重みを0.6、テキスト検索の重みを0.4とする。</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>スコア（画像）</strong></p></th>
     <th><p><strong>スコア（テキスト）</strong></p></th>
     <th><p><strong>重み付けスコア</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>該当なし</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>該当なし</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>画像にない</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>画像にない</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>再ランク付け後の最終結果（topK=5)：以下の通り。</li>
</ul>
<table>
   <tr>
     <th><p><strong>順位</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>最終スコア</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">WeightedRankerの使い方</h3><p>WeightedRankerストラテジーを使用する場合、重み値を入力する必要がある。入力する重み値の数は、ハイブリッド検索における基本ANN検索リクエスト数に対応させる必要がある。入力する重み値は[0,1]の範囲で、1に近いほど重要度が高いことを示す。</p>
<p>例えば、ハイブリッド検索にテキスト検索と画像検索の2つの基本ANN検索リクエストがあるとする。テキスト検索がより重要であると考えられる場合、より大きなウェイトが割り当てられるはずである。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF（Reciprocal Rank Fusion）は、ランキングの逆数に基づいてランク付けされたリストを組み合わせるデータフュージョン手法である。この再ランク付け戦略は、ベクトル探索の各パスの重要性を効果的にバランスさせる。</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">RRFRankerのメカニズム</h3><p>RRFRanker戦略の主なワークフローは以下の通りである：</p>
<ol>
<li><p><strong>検索順位を収集する</strong>：ベクトル検索の各パスの結果のランキングを収集する（rank_1、rank_2）。</p></li>
<li><p><strong>順位をマージする</strong>：各パスの順位（rank_rrf_1, rank_rrf_2）を計算式に従って変換する。</p>
<p><em>ranki</em><em>(d</em>)は<em>i(番目の)</em>検索によって生成された文書<em>dの</em>順位である。<em>kは</em>通常60に設定される平滑化パラメータである。</p></li>
<li><p><strong>ランキングの集約</strong>：最終的な検索結果を得るために、検索結果のランキングを再集計する。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRFリランカー</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">RRFRankerの例</h3><p>この例では、スパースで密なベクトルに対するハイブリッド検索（topK=5）を示し、RRFRankerストラテジーが2つのANN検索の結果をどのように再ランク付けするかを説明する。</p>
<ul>
<li>Results of ANN search on sparse vectors of texts （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>ランク（スパース）</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>テキストの密なベクトルに対するANN検索の結果（topK=5)：ID</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>順位（密）</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>RRFを使って2組の検索結果の順位を並べ替える。スムージング・パラメーター<code translate="no">k</code> は60に設定されていると仮定する。</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>スコア（疎）</strong></p></th>
     <th><p><strong>スコア（密集）</strong></p></th>
     <th><p><strong>最終スコア</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>該当なし</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>該当なし</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>該当なし</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>再ランク付け後の最終結果（topK=5)：順位</li>
</ul>
<table>
   <tr>
     <th><p><strong>順位</strong></p></th>
     <th><p><strong>順位</strong></p></th>
     <th><p><strong>最終スコア</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">RRFRankerの使用法</h3><p>RRFリランキング戦略を使用する場合、パラメータ<code translate="no">k</code> を設定する必要がある。これはスムージング・パラメータで、全文検索とベクトル検索の相対的な重みを効果的に変えることができます。このパラメータのデフォルト値は60で、(0, 16384)の範囲で調整することができる。値は浮動小数点数でなければならない。推奨値は[10, 100]の間である。<code translate="no">k=60</code> は一般的な選択ですが、最適な<code translate="no">k</code> の値は、特定のアプリケーションやデータセットによって異なります。最高のパフォーマンスを達成するために、特定のユースケースに基づいてこのパラメータをテストし、調整することをお勧めします。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">正しいリランキング戦略の選択<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>リランキング・ストラテジーを選択する際に考慮すべきことは、ベクトル・フィールド上で1つ以上の基本的なANN検索を重視するかどうかである。</p>
<ul>
<li><p><strong>WeightedRanker</strong>：このストラテジーは、特定のベクトル・フィールドを強調する結果を必要とする場合に推奨される。WeightedRankerでは、特定のベクトル・フィールドに高いウェイトを割り当て、より強調することができる。例えば、マルチモーダル検索では、画像の色よりも画像のテキスト説明が重要視されるかもしれません。</p></li>
<li><p><strong>RRFRanker（Reciprocal Rank Fusion Ranker）</strong>：このストラテジーは、特定の重点がない場合に推奨される。RRFは各ベクトルフィールドの重要度のバランスを効果的にとることができる。</p></li>
</ul>
