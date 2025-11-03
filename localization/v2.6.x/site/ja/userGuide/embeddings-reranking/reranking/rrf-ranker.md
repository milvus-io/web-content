---
id: rrf-ranker.md
title: RRFランカー
summary: >-
  RRF (Reciprocal Rank Fusion)
  Rankerは、Milvusハイブリッド検索における再ランク付け戦略であり、複数のベクトル検索パスからの結果を、生の類似度スコアではなく、ランキング順位に基づいてバランスさせる。スポーツのトーナメントが個々の統計ではなく選手のランキングを考慮するように、RRF
  Rankerは異なる検索パスにおける各項目のランキングの高さに基づいて検索結果を組み合わせ、公平でバランスの取れた最終ランキングを作成します。
---
<h1 id="RRF-Ranker" class="common-anchor-header">RRFランカー<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>RRF（Reciprocal Rank Fusion）Rankerは、Milvusハイブリッド検索のための再ランキング戦略で、複数のベクトル検索パスの結果を、生の類似度スコアではなく、ランキング順位に基づいてバランスさせます。スポーツのトーナメントが個々の統計ではなく選手のランキングを考慮するように、RRF Rankerは異なる検索パスにおける各項目のランキングの高さに基づいて検索結果を組み合わせ、公平でバランスの取れた最終ランキングを作成します。</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">RRF Rankerの使用時期<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF Rankerは、明示的な重要度ウェイトを割り当てずに、複数のベクトル検索パスからの結果をバランスさせたいハイブリッド検索シナリオのために特別に設計されています。特に次のような場合に効果的です：</p>
<table>
   <tr>
     <th><p>使用例</p></th>
     <th><p>使用例</p></th>
     <th><p>RRF ランカーが有効な理由</p></th>
   </tr>
   <tr>
     <td><p>重要度が等しいマルチモーダル検索</p></td>
     <td><p>両方のモダリティが等しく重要な画像-テキスト検索</p></td>
     <td><p>任意の重み割り当てを必要とせず、結果のバランスをとる</p></td>
   </tr>
   <tr>
     <td><p>アンサンブルベクトル検索</p></td>
     <td><p>異なる埋め込みモデルの結果を組み合わせる</p></td>
     <td><p>特定のモデルのスコア分布を優先することなく、民主的にランキングを統合</p></td>
   </tr>
   <tr>
     <td><p>クロスリンガル検索</p></td>
     <td><p>複数の言語にまたがる文書を検索</p></td>
     <td><p>言語固有の埋め込み特性に関係なく、結果を公平にランク付け</p></td>
   </tr>
   <tr>
     <td><p>専門家の推奨</p></td>
     <td><p>複数の専門家システムからの推薦を統合</p></td>
     <td><p>異なるシステムが比較不可能なスコアリング方法を使用している場合、コンセンサスランキングを作成します。</p></td>
   </tr>
</table>
<p>もし、あなたのハイブリッド検索アプリケーションが、明示的な重み付けをすることなく、民主的に複数の検索パスのバランスを取る必要がある場合、RRF Rankerは理想的な選択です。</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">RRF Rankerのメカニズム<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRFRanker戦略の主なワークフローは以下の通りです：</p>
<ol>
<li><p><strong>検索順位を収集する</strong>：ベクトル検索の各パスの結果のランキングを収集する（rank_1、rank_2）。</p></li>
<li><p><strong>順位をマージする</strong>：各パスの順位（rank_rrf_1, rank_rrf_2）を計算式に従って変換する。</p>
<p><em>ranki</em><em>(d</em>)は<em>i(番目の)</em>検索によって生成された文書<em>dの</em>ランキング位置である。</p></li>
<li><p><strong>ランキングの集約</strong>：最終的な検索結果を得るために、検索結果のランキングを再集計する。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>RRFランカー</span> </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">RRFランカーの例<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では、疎な密なベクトルに対するハイブリッド検索（topK=5）を示し、RRFRankerストラテジーが2つのANN検索の結果をどのようにランク付けし直すかを説明する。</p>
<ul>
<li><p>疎なテキストベクトルに対するANN検索結果（topK=5）：：：：（topK=5</p>
<p><table>
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
</table></p></li>
<li><p>テキストの密なベクトルに対するANN検索の結果（topK=5)：ID</p>
<p><table>
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
</table></p></li>
<li><p>RRFを使って2組の検索結果の順位を並べ替える。スムージング・パラメーター<code translate="no">k</code> は60に設定されていると仮定する。</p>
<p><table>
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
</table></p></li>
<li><p>再ランク付け後の最終結果（topK=5)：順位</p>
<p><table>
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
</table></p></li>
</ul>
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">RRF ランカーの使用法<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRFリランキング戦略を使用する場合、パラメータ<code translate="no">k</code> を設定する必要がある。これはスムージング・パラメーターで、全文検索とベクトル検索の相対的な重みを効果的に変えることができる。このパラメータのデフォルト値は60で、(0, 16384)の範囲で調整することができる。値は浮動小数点数でなければならない。推奨値は[10, 100]の間である。<code translate="no">k=60</code> は一般的な選択ですが、最適な<code translate="no">k</code> の値は、特定のアプリケーションやデータセットによって異なります。最高のパフォーマンスを達成するために、特定のユースケースに基づいてこのパラメータをテストし、調整することをお勧めします。</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">RRF ランカーの作成<button data-href="#Create-an-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションが複数のベクトルフィールドでセットアップされたら、適切なスムージングパラメータで RRF ランカーを作成します：</p>
<div class="alert note">
<p>Milvus 2.6.x以降では、<code translate="no">Function</code> APIを介して直接リランキング戦略を設定することができます。それ以前のリリース（v2.6.0以前）を使用している場合は、<a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-RRFRanker">Rerankingの</a>ドキュメントを参照して設定を行ってください。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rr</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;strategy&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
                .param(<span class="hljs-string">&quot;params&quot;</span>, <span class="hljs-string">&quot;{\&quot;k\&quot;: 100}&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
    <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
    <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>,
  },
};

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
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>関数を適用するベクトルフィールドのリスト（RRFランカーの場合は空でなければならない）</p></td>
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
     <td><p>使用するリランキング法を指定する。</p><p>RRF ランカーを使用するには、<code translate="no">rrf</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>文書ランクの影響を制御するスムージングパラメータ。<code translate="no">k</code> が高いほど上位ランクの感度を下げる。範囲: (0, 16384); デフォルト:<code translate="no">60</code> 。</p><p>詳細は<a href="/docs/ja/rrf-ranker.md#Mechanism-of-RRF-Ranker">RRF Rankerの仕組みを</a>参照。</p></td>
     <td><p><code translate="no">100</code></p></td>
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
    </button></h3><p>RRF Rankerは複数のベクトル場を組み合わせたハイブリッド検索操作に特化して設計されています。ハイブリッド検索での使い方を紹介しよう：</p>
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

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
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

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;\&quot;modern dining table\&quot;&quot;</span>)))
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
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> text_search = {
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
    <span class="hljs-attr">param</span>: {},
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
    <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
    <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>,
  },
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索の詳細については、<a href="/docs/ja/multi-vector-search.md">マルチベクター・ハイブリッド検索を</a>参照してください。</p>
