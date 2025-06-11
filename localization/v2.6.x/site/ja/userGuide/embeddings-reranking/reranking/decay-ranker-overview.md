---
id: decay-ranker-overview.md
title: ディケイ・ランカーの概要Compatible with Milvus 2.6.x
summary: >-
  従来のベクトル検索では、結果は純粋にベクトルの類似性によってランク付けされる。しかし、実世界のアプリケーションでは、コンテンツが本当に関連性があるかどうかは、意味的な類似性だけではないことが多い。
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">ディケイ・ランカーの概要<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>従来のベクトル検索では、結果は純粋にベクトルの類似性によってランク付けされる。しかし、実世界のアプリケーションでは、コンテンツが本当に関連性があるかどうかは、意味的な類似性だけではないことが多い。</p>
<p>日常的なシナリオを考えてみよう：</p>
<ul>
<li><p>昨日の記事が3年前の類似記事よりも上位にランクされるべきニュース検索</p></li>
<li><p>車で30分かかる店よりも、5分以内の店を優先するレストラン検索。</p></li>
<li><p>検索クエリとの類似度が多少低くても、トレンド商品を上位に表示するEコマース・プラットフォーム</p></li>
</ul>
<p>これらのシナリオはすべて、ベクトルの類似性と、時間、距離、人気などの他の数値要素とのバランスをとるという共通のニーズを共有している。</p>
<p>Milvusのディケイランカーは、数値フィールドの値に基づいて検索順位を調整することで、このニーズに対応します。これにより、ベクトルの類似性とデータの「新鮮さ」、「近さ」、またはその他の数値的特性とのバランスをとることができ、より直感的で文脈に関連した検索体験を生み出すことができます。</p>
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
<li><p>ディケイランキングはグループ検索では使用できません。</p></li>
<li><p>ディケイランキングに使用するフィールドは数値（<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code>, または<code translate="no">DOUBLE</code> ）でなければなりません。</p></li>
<li><p>各ディケイランカーは1つの数値フィールドしか使用できません。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">仕組み<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>ディケイランキングは、時間や地理的距離のような数値要素をランキングプロセスに組み込むことで、従来のベクトル検索を強化します。プロセス全体は以下のような段階を踏む：</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">ステージ1：正規化類似度スコアの計算</h3><p>まず、Milvusはベクトルの類似性スコアを計算し、正規化します：</p>
<ul>
<li><p><strong>L2</strong>および<strong>JACCARD</strong>距離メトリクス（値が小さいほど類似度が高いことを示す）の場合：</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>これは距離を0-1の類似度スコアに変換します。</p></li>
<li><p><strong>IP</strong>、<strong>COSINE</strong>、および<strong>BM25</strong>メトリクスの場合（スコアが高いほど、すでに一致度が高いことを示す）：スコアは正規化せずに直接使用される。</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">ステージ 2: ディケイスコアの計算</h3><p>次に、Milvusは選択したディケイランカーを使用して、数値フィールド値（タイムスタンプや距離など）に基づいてディケイスコアを計算します：</p>
<ul>
<li><p>各ディケイランカーは生の数値を0～1の間で正規化された関連性スコアに変換します。</p></li>
<li><p>減衰スコアは、理想的なポイントからの「距離」に基づいて、アイテムがどの程度関連性があるかを表します。</p></li>
</ul>
<p>具体的な計算式はディケイランカーのタイプによって異なります。ディケイスコアの計算方法の詳細については、<a href="/docs/ja/gaussian-decay.md#Formula">ガウスディケイ</a>、<a href="/docs/ja/exponential-decay.md#Formula">指数ディケイ</a>、<a href="/docs/ja/linear-decay.md#Formula">線形ディケイの</a>専用ページを参照してください。</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">ステージ 3: 最終スコアの計算</h3><p>最後に、Milvusは正規化された類似度スコアと減衰スコアを組み合わせ、最終的なランキングスコアを算出します：</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索（複数のベクトルフィールドを組み合わせる）の場合、Milvusは検索リクエストの中で正規化類似度スコアが最大のものを採用する：</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>例えば、ある研究論文がベクトル類似度で0.82、BM25ベースのテキスト検索で0.91のハイブリッド検索を行った場合、Milvusは減衰係数を適用する前に0.91を基本類似度スコアとして使用します。</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">ディケイ・ランキングの実例</h3><p>実用的なシナリオでディケイ・ランキングを見てみよう-時間ベースのディケイを使った<strong>「AI研究論文」の</strong>検索である：</p>
<div class="alert note">
<p>この例では、減衰スコアは時間とともに関連性がどのように低下するかを反映しています。これらの値は、特定の減衰ランカーを使用して計算されます。詳細は「<a href="/docs/ja/decay-ranker-overview.md#Choose-the-right-decay-ranker">正しいディケイランカーを選ぶ</a>」を参照してください。</p>
</div>
<table>
   <tr>
     <th><p>論文</p></th>
     <th><p>ベクトル類似度</p></th>
     <th><p>正規化類似度スコア</p></th>
     <th><p>出版日</p></th>
     <th><p>減衰スコア</p></th>
     <th><p>最終スコア</p></th>
     <th><p>最終順位</p></th>
   </tr>
   <tr>
     <td><p>論文A</p></td>
     <td><p>高い</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2週間前</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>ペーパーB</p></td>
     <td><p>非常に高い</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6ヶ月前</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>ペーパーC</p></td>
     <td><p>ミディアム</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1日前</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>ペーパーD</p></td>
     <td><p>中-高</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3週前</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>減衰リランキングがなければ、論文Bは純粋なベクトル類似度（0.92）に基づいて最上位にランクされる。しかし、ディケイ・リランキングを適用すると</p>
<ul>
<li><p>論文Cは、類似度が中程度であるにもかかわらず1位に躍り出た。</p></li>
<li><p>論文Bは、比較的古いため、優れた類似性にもかかわらず3位にランクダウン。</p></li>
<li><p>論文DはL2距離（低いほど良い）を使用しているため、減衰を適用する前にスコアが1.2から0.76に正規化される。</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">適切なディケイランカーを選択する<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、<code translate="no">gauss</code> 、<code translate="no">exp</code> 、<code translate="no">linear</code> 、それぞれ特定のユースケース向けに設計された、異なるディケイランカーを提供しています：</p>
<table>
   <tr>
     <th><p>ディケイランカー</p></th>
     <th><p>特徴</p></th>
     <th><p>理想的な使用例</p></th>
     <th><p>シナリオ例</p></th>
   </tr>
   <tr>
     <td><p>ガウシアン (<code translate="no">gauss</code>)</p></td>
     <td><p>適度に広がる自然な感じの緩やかな減少</p></td>
     <td><ul>
<li><p>バランスの取れた結果を必要とする一般的な検索</p></li>
<li><p>ユーザーが直感的に距離を感じるアプリケーション</p></li>
<li><p>適度な距離が結果に大きなペナルティを与えない場合</p></li>
</ul></td>
     <td><p>レストラン検索において、3km離れた場所にある質の高いレストランは、近隣のレストランよりも低いランクではあるが、発見可能なままである。</p></td>
   </tr>
   <tr>
     <td><p>指数 (<code translate="no">exp</code>)</p></td>
     <td><p>最初は急激に減少するが、ロングテールを維持する</p></td>
     <td><ul>
<li><p>最新情報が重要なニュースフィード</p></li>
<li><p>新鮮なコンテンツが重要なソーシャルメディア</p></li>
<li><p>近接性が強く好まれるが、例外的に遠方のアイテムも表示され続けるべき場合</p></li>
</ul></td>
     <td><p>ニュースアプリでは、昨日の記事は1週間前のコンテンツよりもはるかに上位にランクされるが、関連性の高い古い記事が表示されることもある。</p></td>
   </tr>
   <tr>
     <td><p>リニア (<code translate="no">linear</code>)</p></td>
     <td><p>一貫性があり、予測可能な減少で、明確なカットオフがある。</p></td>
     <td><ul>
<li><p>自然な境界線を持つアプリケーション</p></li>
<li><p>距離制限のあるサービス</p></li>
<li><p>有効期限や明確な閾値のあるコンテンツ</p></li>
</ul></td>
     <td><p>イベント・ファインダーでは、2週間先のウィンドウを超えるイベントはまったく表示されません。</p></td>
   </tr>
</table>
<p>各ディケイ・ランカーのスコアの計算方法や具体的な減少パターンについての詳細は、専用のドキュメントを参照してください：</p>
<ul>
<li><p><a href="/docs/ja/gaussian-decay.md">ガウス崩壊</a></p></li>
<li><p><a href="/docs/ja/exponential-decay.md">指数関数的減衰</a></p></li>
<li><p><a href="/docs/ja/exponential-decay.md">指数関数的減衰</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">実装例<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>ディケイランカーはmilvusの標準的なベクトル検索とハイブリッド検索の両方に適用することができます。以下はこの機能を実装するための主要なコードスニペットです。</p>
<div class="alert note">
<p>減衰関数を使用する前に、まず減衰計算に使用する適切な数値フィールド（タイムスタンプ、距離など）を持つコレクションを作成する必要があります。コレクションのセットアップ、スキーマ定義、データ挿入を含む完全な作業例については、<a href="/docs/ja/tutorial-implement-a-time-based-ranking-in-milvus.md">チュートリアルを</a>参照してください<a href="/docs/ja/tutorial-implement-a-time-based-ranking-in-milvus.md">：Milvusでタイムベースランキングを実装するを</a>参照してください。</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">ディケイランカーの作成</h3><p>ディケイランキングを実装するには、まず<code translate="no">Function</code> オブジェクトを適切な設定で定義します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_timestamp,    <span class="hljs-comment"># Reference point (current time)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
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
     <td><p>検索実行時に使用する関数の識別子。ユースケースに関連する説明的な名前を選択してください。</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>減衰スコア計算用の数値フィールド。どのデータ属性が減衰の計算に使用されるかを決定する（例えば、時間ベースの減衰にはタイムスタンプ、位置ベースの減衰には座標）。 
 関連する数値を含むコレクション内のフィールドである必要があります。INT8/16/32/64、FLOAT、DOUBLEをサポート。</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>作成される関数のタイプを指定する。 すべての減衰ランカーに対して<code translate="no">RERANK</code> に設定する必要がある。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>使用するリランキング方法を指定します。 ディケイランキング機能を有効にするには、<code translate="no">"decay"</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>はい</p></td>
     <td><p>どの数学的ディケイランカーを適用するかを指定します。適切な関数を選択するためのガイダンスについては、<a href="/docs/ja/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choose the right decay ranker</a>セクションを参照してください。</p></td>
     <td><p><code translate="no">"gauss"</code> <code translate="no">"exp"</code> または<code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>はい</p></td>
     <td><p>減衰スコアを計算する基準点。この値のアイテムは、最大関連性スコアを受け取ります。</p></td>
     <td><ul>
<li>タイムスタンプの場合: 現在時刻 (例:<code translate="no">int(time.time())</code>)</li>
<li>ジオロケーションの場合：ユーザーの現在の座標</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>はい</p></td>
     <td><p>関連性が<code translate="no">decay</code> の値まで低下する距離または時間。値が大きいほど関連性は緩やかに低下し、値が小さいほど急激に低下します。</p></td>
     <td><ul>
<li>時間の場合：期間（秒）（例：<code translate="no">7 * 24 * 60 * 60</code> 7日間</li>
<li>距離の場合：メートル（例：<code translate="no">5000</code> 5km）</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">origin</code> の周囲に「減衰なしゾーン」を設定します。このゾーンでは、アイテムは満点を維持します（減衰スコア = 1.0）。<code translate="no">origin</code> のこの範囲内のアイテムは、最大の関連性を維持します。</p></td>
     <td><ul>
<li>時間：秒単位（例：<code translate="no">24 * 60 * 60</code> 1日）</li>
<li>距離：メートル（例：<code translate="no">500</code> 500m）</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">scale</code> 距離におけるスコア値で、曲線の急峻さを制御する。値が低いほど急峻な減少カーブを描き、値が高いほど緩やかな減少カーブを描く。 0 から 1 の間でなければならない。</p></td>
     <td><p><code translate="no">0.5</code> (デフォルト)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">標準ベクトル探索に適用</h3><p>減衰ランカーを定義した後、<code translate="no">ranker</code> パラメータに渡すことで、検索操作中に適用することができます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">ハイブリッド検索に適用</h3><p>ディケイランカーは複数のベクトルフィールドを組み合わせたハイブリッド検索にも適用できます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索では、Milvusはまずすべてのベクトルフィールドから最大の類似度スコアを見つけ、そのスコアに減衰係数を適用します。</p>
