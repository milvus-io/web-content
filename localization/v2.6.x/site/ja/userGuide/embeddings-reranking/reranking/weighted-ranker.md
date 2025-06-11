---
id: weighted-ranker.md
title: 重み付けランカー
summary: >-
  Weighted
  Rankerは、複数の検索経路から得られた結果をインテリジェントに組み合わせ、それぞれに異なる重要度の重みを割り当てることで優先順位を付けます。熟練したシェフが完璧な料理を作るために複数の食材のバランスを取るのと同様に、Weighted
  Rankerは最も関連性の高い組み合わせの結果を提供するために、異なる検索結果のバランスを取ります。このアプローチは、特定のフィールドが他のフィールドよりも最終的なランキングに大きく貢献する必要がある、複数のベクトルフィールドやモダリティを横断して検索する場合に理想的です。
---
<h1 id="Weighted-Ranker" class="common-anchor-header">重み付けランカー<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Weighted Rankerは、複数の検索パスから得られた結果をインテリジェントに組み合わせ、それぞれに異なる重要度のウェイトを割り当てることで優先順位を付けます。熟練したシェフが完璧な料理を作るために複数の食材のバランスを取るのと同様に、Weighted Rankerは最も関連性の高い組み合わせの結果を提供するために、異なる検索結果のバランスを取ります。このアプローチは、複数のベクトル分野やモダリティにまたがる検索で、特定の分野が他の分野よりも最終的なランキングに大きく貢献する場合に理想的です。</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">Weighted Rankerを使用する場合<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Weighted Rankerは、複数のベクトル検索パスからの結果を組み合わせる必要があるハイブリッド検索シナリオのために特別に設計されています。特に以下のような場合に有効です：</p>
<table>
   <tr>
     <th><p>使用例</p></th>
     <th><p>使用例</p></th>
     <th><p>Weighted Rankerが有効な理由</p></th>
   </tr>
   <tr>
     <td><p>Eコマース検索</p></td>
     <td><p>画像の類似性とテキストの説明を組み合わせた商品検索</p></td>
     <td><p>ファッション商品では視覚的な類似性を優先し、技術的な商品ではテキストの説明を重視することができます。</p></td>
   </tr>
   <tr>
     <td><p>メディアコンテンツ検索</p></td>
     <td><p>視覚的特徴と音声トランスクリプトの両方を使用したビデオ検索</p></td>
     <td><p>クエリの意図に基づき、ビジュアルコンテンツと音声対話の重要性のバランスをとる。</p></td>
   </tr>
   <tr>
     <td><p>文書検索</p></td>
     <td><p>異なるセクションに対して複数のエンベッディングを使用したエンタープライズ文書検索</p></td>
     <td><p>全文エンベッディングを考慮しつつ、タイトルと抄録エンベッディングに高いウェイトを与える。</p></td>
   </tr>
</table>
<p>ハイブリッド検索アプリケーションで、複数の検索パスを組み合わせ、それらの相対的な重要度をコントロールする必要がある場合、Weighted Rankerは理想的な選択です。</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">Weighted Rankerのメカニズム<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRanker戦略の主なワークフローは以下の通りです：</p>
<ol>
<li><p><strong>検索スコアを集める</strong>：ベクトル検索の各パスの結果とスコアを集める（score_1, score_2）。</p></li>
<li><p><strong>スコアの正規化</strong>：各検索は異なる類似度メトリックを使用する可能性があり、その結果スコア分布は異なる。例えば、類似性のタイプとして内積（IP）を使用した場合、スコアは[-∞,+∞]の範囲となり、ユークリッド距離（L2）を使用した場合、スコアは[0,+∞]の範囲となる。異なる検索からのスコア範囲は様々であり、直接比較することができないため、各検索パスからのスコアを正規化する必要がある。通常、<code translate="no">arctan</code> 関数を適用して、スコアを [0, 1] の間の範囲に変換する（score_1_normalized, score_2_normalized）。スコアが1に近いほど類似性が高いことを示す。</p></li>
<li><p><strong>重みを割り当てる</strong>：異なるベクトル場に割り当てられた重要度に基づいて、重み<strong>（wi</strong>）が正規化スコア（score_1_normalized, score_2_normalized）に割り当てられる。各パスの重みは[0,1]の範囲とする。得られた重み付きスコアは score_1_weighted と score_2_weighted となる。</p></li>
<li><p><strong>スコアのマージ</strong>：重み付きスコア(score_1_weighted, score_2_weighted)を高いものから低いものへとランク付けし、最終的なスコア(score_final)を生成する。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" />
   </span> <span class="img-wrapper"> <span>加重ランカー</span> </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">重み付けランカーの例<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では画像とテキストを含むマルチモーダルハイブリッド検索（topK=5）を示し、WeightedRanker戦略が2つのANN検索の結果をどのようにランク付けし直すかを説明する。</p>
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
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">重み付きランカーの使用法<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRankerストラテジーを使用する場合、重み値を入力する必要がある。入力する重み値の数は、ハイブリッド検索における基本ANN検索要求の数に対応させる必要がある。入力する重み値は[0,1]の範囲にあるべきで、1に近いほど重要度が高いことを示す。</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">重み付きランカーの作成</h3><p>例えば、ハイブリッド検索にテキスト検索と画像検索の2つの基本ANN検索リクエストがあるとする。テキスト検索がより重要であると考えられる場合、より大きなウェイトが割り当てられるはずです。</p>
<div class="alert note">
<p>Milvus 2.6.x以降では、<code translate="no">Function</code> APIを介して直接リランキング戦略を設定することができます。それ以前のリリース（v2.6.0以前）を使用している場合は、<a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">Rerankingの</a>ドキュメントを参照して設定を行ってください。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須か？</p></th>
     <th><p>説明</p></th>
     <th><p>値/例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>はい</p></td>
     <td><p>このファンクションの一意な識別子</p></td>
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>関数を適用するベクトルフィールドのリスト（Weighted Rankerの場合は空でなければならない）</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>呼び出すFunctionのタイプ。リランキング戦略を指定するには<code translate="no">RERANK</code> 。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>使用するリランキング法を指定する。Weighted Ranker を使用するには<code translate="no">weighted</code> に設定する必要がある。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>Yes</p></td>
     <td><p>各探索経路に対応する重みの配列; 値∈[0,1]。 詳細は<a href="/docs/ja/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Weighted Rankerの</a>メカニズムを参照。</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>重み付けの前に生のスコアを正規化するかどうか（arctanを使用）。 詳細は<a href="/docs/ja/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Weighted Rankerの</a>メカニズムを参照。</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">ハイブリッド検索への適用</h3><p>Weighted Rankerは、複数のベクトル場を組み合わせたハイブリッド検索操作に特化して設計されている。ハイブリッド検索を行う際には、各検索パスの重みを指定する必要がある：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索の詳細については、<a href="/docs/ja/multi-vector-search.md">マルチベクター・ハイブリッド検索を</a>参照。</p>
