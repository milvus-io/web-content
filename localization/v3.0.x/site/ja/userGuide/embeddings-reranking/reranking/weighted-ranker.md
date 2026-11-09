---
id: weighted-ranker.md
title: 加重ランカー
summary: >-
  Weighted
  Rankerは、複数の検索パスから得られた結果を、それぞれに異なる重要度ウェイトを割り当てることで、インテリジェントに統合し、優先順位付けを行います。
  熟練したシェフが複数の食材のバランスを調整して完璧な料理を作り上げるのと同様に、Weighted
  Rankerはさまざまな検索結果のバランスを調整し、最も関連性の高い統合結果を提供します。このアプローチは、特定のフィールドが他のフィールドよりも最終的なランキングに大きく寄与すべき場合など、複数のベクトルフィールドやモダリティを横断して検索を行う際に最適です。
---
<h1 id="Weighted-Ranker" class="common-anchor-header">加重ランカー<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>ウェイト付きランカーは、複数の検索パスから得られた結果を、それぞれに異なる重要度ウェイトを割り当てることで、インテリジェントに統合し、優先順位付けを行います。 熟練したシェフが複数の食材のバランスを調整して完璧な料理を作り上げるのと同様に、ウェイト付きランカーは異なる検索結果のバランスを調整し、最も関連性の高い統合結果を提供します。このアプローチは、特定のフィールドが他のフィールドよりも最終的なランキングに大きく寄与すべき場合など、複数のベクトルフィールドやモダリティを横断して検索を行う際に最適です。</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">ウェイト付きランカーの使用場面<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>ウェイト付きランカーは、複数のベクトル検索パスからの結果を組み合わせる必要があるハイブリッド検索シナリオ向けに特別に設計されています。特に以下の用途で効果的です：</p>
<table>
   <tr>
     <th><p>ユースケース</p></th>
     <th><p>例</p></th>
     <th><p>Weighted Rankerが効果的な理由</p></th>
   </tr>
   <tr>
     <td><p>Eコマース検索</p></td>
     <td><p>画像の類似性とテキスト説明を組み合わせた商品検索</p></td>
     <td><p>小売業者は、ファッションアイテムでは視覚的な類似性を優先しつつ、技術系製品ではテキストの説明を重視することが可能</p></td>
   </tr>
   <tr>
     <td><p>メディアコンテンツ検索</p></td>
     <td><p>視覚的特徴と音声文字起こしの両方を活用した動画検索</p></td>
     <td><p>クエリの意図に基づいて、視覚的コンテンツと音声対話の重要度のバランスを調整</p></td>
   </tr>
   <tr>
     <td><p>ドキュメント検索</p></td>
     <td><p>セクションごとに異なる埋め込みを用いたエンタープライズ文書検索</p></td>
     <td><p>全文の埋め込みも考慮しつつ、タイトルと要約の埋め込みに高い重み付けを行う</p></td>
   </tr>
</table>
<p>ハイブリッド検索アプリケーションで、複数の検索パスを組み合わせつつ、それぞれの相対的な重要度を制御する必要がある場合は、「Weighted Ranker」が最適な選択肢となります。</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">Weighted Rankerの仕組み<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRanker 戦略の主なワークフローは以下の通りです：</p>
<ol>
<li><p><strong>検索スコアの収集</strong>：ベクトル検索の各パスから結果とスコア（score_1、score_2）を収集します。</p></li>
<li><p><strong>スコアの正規化</strong>：検索ごとに異なる類似度メトリクスが使用される場合があり、その結果、スコアの分布が異なってくることがあります。 たとえば、類似度指標として内積（IP）を使用すると、スコアは [−∞,+∞] の範囲になるのに対し、ユークリッド距離（L2）を使用すると、スコアは [0,+∞] の範囲になります。 異なる検索のスコア範囲は異なり、直接比較できないため、各検索パスからのスコアを正規化する必要があります。通常、<code translate="no">arctan</code> 関数を適用して、スコアを[0, 1]の範囲に変換します（score_1_normalized, score_2_normalized）。 1に近いスコアほど、類似度が高いことを示します。</p></li>
<li><p><strong>重みの割り当て</strong>：さまざまなベクトル場に割り当てられた重要度に基づいて、正規化されたスコア（score_1_normalized、score_2_normalized）に重み（<strong>wi</strong>）が割り当てられます。 各パスの重みは [0, 1] の範囲である必要があります。その結果として得られる重み付きスコアは、score_1_weighted および score_2_weighted となります。</p></li>
<li><p><strong>スコアの統合</strong>：重み付けされたスコア (score_1_weighted、score_2_weighted) を高い順にランク付けし、最終的なスコアセット (score_final) を作成します。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" /> 
   <span>重み付きランカー</span>
  
 </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">重み付きランカーの例<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では、画像とテキストを用いたマルチモーダルハイブリッド検索（topK=5）を示し、WeightedRanker 戦略が 2 つの ANN 検索の結果をどのように再ランク付けするかを説明しています。</p>
<ul>
<li><p>画像に対するANN検索の結果（topK=5）：</p>
<p><table>
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
</table></p></li>
<li><p>テキストに対するANN検索の結果（topK=5）：</p>
<p><table>
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
</table></p></li>
<li><p>WeightedRanker を使用して、画像およびテキストの検索結果に重みを割り当てます。画像 ANN 検索の重みを 0.6、テキスト検索の重みを 0.4 と仮定します。</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>スコア（画像）</strong></p></th>
<th><p><strong>スコア（テキスト）</strong></p></th>
<th><p><strong>加重スコア</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0.92</p></td>
<td><p>0.87</p></td>
<td><p>0.6×0.92＋0.4×0.87＝0.90</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0.88</p></td>
<td><p>該当なし</p></td>
<td><p>0.6×0.88＋0.4×0＝0.528</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0.85</p></td>
<td><p>該当なし</p></td>
<td><p>0.6×0.85＋0.4×0＝0.51</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0.83</p></td>
<td><p>0.91</p></td>
<td><p>0.6×0.83＋0.4×0.91＝0.86</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0.80</p></td>
<td><p>0.82</p></td>
<td><p>0.6×0.80＋0.4×0.82＝0.81</p></td>
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
</table></p></li>
<li><p>再ランク付け後の最終結果（topK=5）：</p>
<p><table>
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
</table></p></li>
</ul>
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">WeightedRankerの使用方法<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRanker戦略を使用する際は、重み値を入力する必要があります。入力する重み値の数は、ハイブリッド検索における基本ANN検索リクエストの数と一致させる必要があります。入力する重み値は[0,1]の範囲内である必要があり、1に近い値ほど重要度が高いことを示します。</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">重み付きランカーの作成<button data-href="#Create-a-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>たとえば、ハイブリッド検索にテキスト検索と画像検索の2つの基本ANN検索リクエストがあるとします。テキスト検索の方が重要度が高いとみなされる場合は、より大きな重みを割り当てる必要があります。</p>
<div class="alert note">
<p>Milvus 2.6.x 以降では、<code translate="no">Function</code> API を通じて再ランク付け戦略を直接設定できます。v2.6.0 以前のリリースを使用している場合は、<a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-WeightedRanker">再ランク付けの</a>ドキュメントを参照して設定手順を確認してください。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;weight&quot;</span>)
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>)
                .param(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>)
                .param(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;weight&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields().
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>).
    WithParam(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;weight&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">input_fields</span>(<span class="hljs-type">Vec</span>::&lt;<span class="hljs-type">String</span>&gt;::<span class="hljs-title function_ invoke__">new</span>())
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;reranker&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;weighted&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;weights&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;norm_score&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;weight&quot;</span>, milvus::FunctionType::RERANK);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
    <span class="hljs-attr">input_field_names</span>: [],
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
        <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;

<span class="hljs-comment">// Note: defining a weighted rerank function with FunctionSchema params</span>
<span class="hljs-comment">// (reranker/weights/norm_score) is not yet supported in milvus-sdk-csharp as of v3.0.0</span>
<span class="hljs-comment">// (FunctionSchema.Params cannot be populated externally). Use WeightedReranker instead.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;weight&quot;,
  &quot;inputFieldNames&quot;: [],
  &quot;functionType&quot;: &quot;RERANK&quot;,
  &quot;params&quot;: {
    &quot;reranker&quot;: &quot;weighted&quot;,
    &quot;weights&quot;: &quot;[0.1, 0.9]&quot;,
    &quot;norm_score&quot;: &quot;true&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須？</p></th>
     <th><p>説明</p></th>
     <th><p>値/例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>はい</p></td>
     <td><p>この関数の固有の識別子</p></td>
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
     <td><p>呼び出す関数のタイプ。再ランク付け戦略を指定するには、<code translate="no">RERANK</code> を使用してください</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>使用する再ランク付け方法を指定します。</p><p>Weighted Ranker を使用するには、<code translate="no">weighted</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>はい</p></td>
     <td><p>各検索パスに対応する重みの配列。値は [0,1] の範囲です。</p><p>詳細については、「<a href="/docs/ja/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Weighted Ranker の仕組み</a>」を参照してください。</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>重み付けの前に、生スコアを（arctan を使用して）正規化するかどうか。</p><p>詳細については、「<a href="/docs/ja/weighted-ranker.md#Mechanism-of-Weighted-Ranker">重み付きランカーの仕組み</a>」を参照してください。いいえ</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">ハイブリッド検索への適用<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Weighted Ranker は、複数のベクトルフィールドを組み合わせたハイブリッド検索操作のために特別に設計されています。ハイブリッド検索を実行する際は、各検索パスに対する重みを指定する必要があります：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to the Milvus server</span>
milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(rerank)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

<span class="hljs-comment">// Define two ANN sub-search requests</span>
textSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{textEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>)
imageSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{imageEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
rerank := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})

hybridResults, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(collectionName, <span class="hljs-number">10</span>, textSearch, imageSearch).
    WithReranker(rerank).
    WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Define two ANN sub-search requests</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">text_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[text_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">image_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[image_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Ip)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = WeightedRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">weights</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[text_search, image_search])
            .<span class="hljs-title function_ invoke__">rerank</span>(rerank)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> text_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
                    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>);

<span class="hljs-keyword">auto</span> image_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
                    .<span class="hljs-built_in">AddFloatVector</span>(image_embedding);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(text_search)))
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(image_search)))
                    .<span class="hljs-built_in">WithRerank</span>(rerank)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> text_search = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">var</span> textSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;text_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;modern dining table&quot;</span> },
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">var</span> imageSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;image_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(imageEmbedding) },  <span class="hljs-comment">// Image embedding vector</span>
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment">// Text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">var</span> hybridResults = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = collectionName,
    SearchRequests = <span class="hljs-keyword">new</span>[] { textSearch, imageSearch },  <span class="hljs-comment">// Multiple search requests</span>
    Reranker = rerank,  <span class="hljs-comment">// Apply the weighted ranker</span>
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters { OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span> } }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;search\&quot;: [
        {
            \&quot;annsField\&quot;: \&quot;text_vector\&quot;,
            \&quot;data\&quot;: [\&quot;modern dining table\&quot;],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;COSINE\&quot; },
            \&quot;limit\&quot;: 10
        },
        {
            \&quot;annsField\&quot;: \&quot;image_vector\&quot;,
            \&quot;data\&quot;: [<span class="hljs-variable">${IMAGE_EMBEDDING}</span>],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;IP\&quot; },
            \&quot;limit\&quot;: 10
        }
    ],
    \&quot;rerank\&quot;: <span class="hljs-variable">${rerank}</span>,
    \&quot;limit\&quot;: 10,
    \&quot;outputFields\&quot;: [\&quot;product_name\&quot;, \&quot;price\&quot;, \&quot;category\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索の詳細については、「<a href="/docs/ja/multi-vector-search.md">マルチベクトル・ハイブリッド検索</a>」を参照してください。</p>
