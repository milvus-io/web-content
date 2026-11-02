---
id: decay-ranker-overview.md
title: Decay Rankerの概要Compatible with Milvus 2.6.x
summary: >-
  従来のベクトル検索では、結果は純粋にベクトルの類似度、つまり数学的な空間においてベクトルがどれほど一致しているかによってランク付けされます。しかし、実際のアプリケーションでは、コンテンツの関連性を真に決定づける要素は、単なる意味的な類似度だけにとどまらないことがよくあります。
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Decay Rankerの概要<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>従来のベクトル検索では、結果は純粋にベクトルの類似度、つまり数学的な空間においてベクトルがどれほど一致しているかによってランク付けされます。しかし、実際のアプリケーションでは、コンテンツの関連性を真に決定づける要素は、単なる意味的な類似度だけにとどまらないことがよくあります。</p>
<p>次のような日常的なシナリオを考えてみてください：</p>
<ul>
<li><p>昨日の記事が、3年前の類似記事よりも上位に表示されるべきニュース検索</p></li>
<li><p>車で30分かかる店よりも、徒歩5分の店を優先表示するレストラン検索</p></li>
<li><p>検索クエリとの類似度がわずかに低い場合でも、トレンドの商品を優先表示するECプラットフォーム</p></li>
</ul>
<p>これらのシナリオにはすべて、ベクトル類似性と、時間、距離、人気度といった他の数値的要因とのバランスを取るという共通のニーズがあります。</p>
<p>Milvusの「Decay rankers」は、数値フィールドの値に基づいて検索順位を調整することで、このニーズに対応します。これにより、ベクトル類似度と「鮮度」、「近さ」、あるいはデータのその他の数値的特性とのバランスを取ることができ、より直感的で文脈に即した検索体験を実現します。</p>
<h2 id="Usage-notes" class="common-anchor-header">使用上の注意<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>デケイ・ランキングは、グループ化検索では使用できません。</p></li>
<li><p>ディケイ・ランカーに使用するフィールドは、数値型（<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code> 、<code translate="no">FLOAT</code> 、または<code translate="no">DOUBLE</code> ）でなければなりません。</p></li>
<li><p>各減衰ランカーは、1つの数値フィールドのみを使用できます。</p></li>
<li><p><strong>時間単位の一貫性</strong>：時間ベースの減衰ランキングを使用する場合、<code translate="no">origin</code> 、<code translate="no">scale</code> 、および<code translate="no">offset</code> パラメータの単位は、コレクションデータで使用されている単位と一致している必要があります：</p>
<ul>
<li><p>コレクションでタイムスタンプを<strong>秒単位</strong>で保存している場合は、すべてのパラメータに秒単位を使用してください</p></li>
<li><p>コレクションでタイムスタンプを<strong>ミリ秒</strong>単位で保存している場合は、すべてのパラメータでミリ秒を使用してください</p></li>
<li><p>コレクションでタイムスタンプを<strong>マイクロ秒</strong>単位で保存している場合は、すべてのパラメータでマイクロ秒単位を使用してください</p></li>
</ul></li>
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
    </button></h2><p>ディケイ・ランキングは、時間や地理的距離などの数値的要素をランキング処理に組み込むことで、従来のベクトル検索機能を強化します。全体のプロセスは以下の段階に従います：</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">段階 1: 正規化された類似度スコアの算出<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>まず、Milvusは一貫した比較を行うために、ベクトル類似度スコアを計算し、正規化します：</p>
<ul>
<li><p><strong>L2</strong>および<strong>JACCARD</strong>距離メトリックの場合（値が小さいほど類似度が高いことを示す）：</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>これにより、距離は0～1の範囲の類似度スコアに変換され、値が高いほど類似度が高いことを示します。</p></li>
<li><p><strong>IP</strong>、<strong>COSINE</strong>、および<strong>BM25</strong>メトリクス（スコアが高いほど一致度が高いことを示す）の場合：スコアは正規化せずに直接使用されます。</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">ステージ2：減衰スコアの算出<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>次に、Milvusは、選択したディケイ・ランカーを使用して、数値フィールド値（タイムスタンプや距離など）に基づいてディケイスコアを算出します：</p>
<ul>
<li><p>各ディケイ・ランカーは、生の数値を0～1の範囲の正規化された関連性スコアに変換します。</p></li>
<li><p>減衰スコアは、理想点からの「距離」に基づいて、そのアイテムがどれほど関連性が高いかを表します。</p></li>
</ul>
<p>具体的な計算式は、減衰ランカーの種類によって異なります。減衰スコアの計算方法の詳細については、<a href="/docs/ja/gaussian-decay.md#Formula">ガウス減衰</a>、<a href="/docs/ja/exponential-decay.md#Formula">指数減衰</a>、<a href="/docs/ja/linear-decay.md#Formula">線形減衰の</a>各専用ページを参照してください。</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">ステージ3：最終スコアの算出<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>最後に、Milvusは正規化された類似度スコアと減衰スコアを組み合わせて、最終的なランキングスコアを算出します：</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索（複数のベクトルフィールドを組み合わせた検索）の場合、Milvusは検索リクエストの中で最大の正規化類似度スコアを採用します：</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>例えば、ハイブリッド検索において、ある研究論文がベクトル類似度で0.82、BM25ベースのテキスト検索で0.91のスコアを獲得した場合、Milvusは減衰係数を適用する前に、0.91を基本類似度スコアとして使用します。</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">減衰ランキングの実例<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>時間ベースの減衰を適用して<strong>「AI 研究論文」</strong>を検索するという実用的なシナリオで、減衰ランキングを見てみましょう：</p>
<div class="alert note">
<p>この例では、減衰スコアは関連性が時間の経過とともに低下する様子を反映しています。つまり、新しい論文ほど1.0に近いスコアが与えられ、古い論文ほど低いスコアが与えられます。これらの値は、特定の減衰ランカーを使用して計算されます。詳細については、<a href="/docs/ja/decay-ranker-overview.md#Choose-the-right-decay-ranker">「適切な減衰ランカーの選択</a>」を参照してください。</p>
</div>
<table>
   <tr>
     <th><p>論文</p></th>
     <th><p>ベクトル類似度</p></th>
     <th><p>正規化された類似度スコア</p></th>
     <th><p>公開日</p></th>
     <th><p>減衰スコア</p></th>
     <th><p>最終スコア</p></th>
     <th><p>最終順位</p></th>
   </tr>
   <tr>
     <td><p>論文A</p></td>
     <td><p>高</p></td>
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
     <td>4</td>
   </tr>
   <tr>
     <td><p>論文C</p></td>
     <td><p>中</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1日前</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>論文D</p></td>
     <td><p>中～高</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3週間前</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>3</td>
   </tr>
</table>
<p>減衰再ランク付けを行わなければ、純粋なベクトル類似度（0.92）に基づいて論文Bが最高位となる。しかし、減衰再ランク付けを適用すると：</p>
<ul>
<li><p>論文Cは、類似度が中程度であるにもかかわらず、ごく最近（昨日）発表されたため、1位に躍り出ます</p></li>
<li><p>論文Bは、類似度が非常に高いにもかかわらず、比較的古いという理由で4位に順位を下げた</p></li>
<li><p>論文DはCOSINE類似度を使用しているため、減衰を適用する前にそのスコア0.76が直接使用される</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">適切なデケイ・ランカーを選択する<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、<code translate="no">gauss</code> 、<code translate="no">exp</code> 、<code translate="no">linear</code> といった、それぞれ特定のユースケース向けに設計された独自のディケイ・ランカーを提供しています：</p>
<table>
   <tr>
     <th><p>減衰ランカー</p></th>
     <th><p>特徴</p></th>
     <th><p>理想的なユースケース</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p>ガウス型 (<code translate="no">gauss</code>)</p></td>
     <td><p>適度に長く続く、自然な感じの緩やかな減少</p></td>
     <td><ul><li><p>バランスの取れた結果が求められる一般的な検索</p></li><li><p>ユーザーが距離を直感的に把握できる用途</p></li><li><p>適度な距離であっても、検索結果に過度なペナルティが課されるべきではない場合</p></li></ul></td>
     <td><p>レストラン検索において、3 km 離れた質の高い店舗も、近隣の選択肢よりは順位が低くなるものの、検索結果に表示される</p></td>
   </tr>
   <tr>
     <td><p>指数関数的（<code translate="no">exp</code> ）</p></td>
     <td><p>最初は急速に減少するが、ロングテールは維持される</p></td>
     <td><ul><li><p>最新性が重要なニュースフィード</p></li><li><p>最新のコンテンツが主流となるべきソーシャルメディア</p></li><li><p>近さが強く重視されるが、例外的に優れた遠方の項目も表示され続けるべき場合</p></li></ul></td>
     <td><p>ニュースアプリでは、昨日の記事は1週間前のコンテンツよりもはるかに上位にランク付けされますが、関連性の高い古い記事も表示されることがあります</p></td>
   </tr>
   <tr>
     <td><p>線形（<code translate="no">linear</code> ）</p></td>
     <td><p>明確なカットオフを伴う、一貫性のある予測可能な減少</p></td>
     <td><ul><li><p>自然な境界を持つアプリケーション</p></li><li><p>距離制限のあるサービス</p></li><li><p>有効期限や明確な閾値があるコンテンツ</p></li></ul></td>
     <td><p>イベント検索ツールでは、2週間先の期間を超えるイベントは一切表示されません</p></td>
   </tr>
</table>
<p>各減衰ランカーによるスコアの算出方法や具体的な減少パターンに関する詳細については、専用のドキュメントを参照してください：</p>
<ul>
<li><p><a href="/docs/ja/gaussian-decay.md">ガウス減衰</a></p></li>
<li><p><a href="/docs/ja/exponential-decay.md">指数関数的減衰</a></p></li>
<li><p><a href="/docs/ja/linear-decay.md">線形減衰</a></p></li>
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
    </button></h2><p>減衰ランカーは、Milvus の標準ベクトル検索およびハイブリッド検索の両方に適用できます。以下に、この機能を実装するための主要なコードスニペットを示します。</p>
<div class="alert note">
<p>減衰関数を使用する前に、まず減衰計算に使用する適切な数値フィールド（タイムスタンプ、距離など）を含むコレクションを作成する必要があります。コレクションの設定、スキーマの定義、データの挿入を含む完全な動作例については、<a href="/docs/ja/tutorial-implement-a-time-based-ranking-in-milvus.md">「チュートリアル：Milvusでの時間ベースのランキングの実装」</a>を参照してください。</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">減衰ランカーの作成<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>ディケイ・ランカーを実装するには、まず適切な設定で<code translate="no">Function</code> オブジェクトを定義します：</p>
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
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().getEpochSecond())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;time_decay&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-number">1735689600</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;timestamp&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(<span class="hljs-number">1735689600</span>)
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;time_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;timestamp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1735689600</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">15</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a decay function for timestamp-based decay</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;time_decay&quot;</span>)     <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;timestamp&quot;</span>)                <span class="hljs-comment">// Numeric field to use for decay</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                       <span class="hljs-comment">// Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
    .WithOrigin(<span class="hljs-keyword">new</span> DateTimeOffset(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, TimeSpan.Zero).ToUnixTimeSeconds()) <span class="hljs-comment">// Reference point (seconds)</span>
    .WithScale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                 <span class="hljs-comment">// 7 days in seconds (must match collection data unit)</span>
    .WithOffset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                    <span class="hljs-comment">// 1 day no-decay zone (must match collection data unit)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>);                            <span class="hljs-comment">// Half score at scale distance</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
     <td><p>検索の実行時に使用される、関数の識別子。ユースケースに関連した、わかりやすい名前を選択してください。</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>減衰スコアの計算に使用する数値フィールド。減衰の計算にどのデータ属性を使用するかを決定します（例：時間ベースの減衰の場合はタイムスタンプ、位置情報ベースの減衰の場合は座標）。 </p><p>コレクション内のフィールドであり、関連する数値値を含む必要があります。INT8/16/32/64、FLOAT、DOUBLEをサポートしています。</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>作成する関数のタイプを指定します。</p><p>すべての減衰ランカーについて、<code translate="no">RERANK</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>使用する再ランク付け方法を指定します。</p><p>ディケイ・ランキング機能を有効にするには、<code translate="no">"decay"</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>はい</p></td>
     <td><p>適用する数学的減衰ランカーを指定します。関連性の低下を示す曲線の形状を決定します。</p><p>適切な関数の選択方法については、「<a href="/docs/ja/decay-ranker-overview.md#Choose-the-right-decay-ranker">適切な減衰ランカーの選択</a>」のセクションを参照してください。</p></td>
     <td><p><code translate="no">"gauss"</code>、<code translate="no">"exp"</code> 、または<code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>はい</p></td>
     <td><p>減衰スコアの計算元となる基準点。この値を持つ項目には、関連性スコアが最大値として付与されます。</p><p>時間ベースの減衰の場合、時間単位はコレクションのデータと一致している必要があります。</p></td>
     <td><ul><li><p>タイムスタンプの場合：現在の時刻（例：<code translate="no">int(time.time())</code> ）</p></li><li><p>位置情報の場合：ユーザーの現在の座標</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>はい</p></td>
     <td><p>関連性が<code translate="no">decay</code> の値まで低下する距離または時間。関連性が低下する速度を制御します。</p><p>時間ベースの減衰の場合、時間単位は収集データと一致している必要があります。</p><p>値が大きいほど関連性の低下は緩やかになり、値が小さいほど低下は急になります。</p></td>
     <td><ul><li><p>時間の場合：秒単位の期間（例：<code translate="no">7 * 24 * 60 * 60</code> = 7 日）</p></li><li><p>距離の場合：メートル（例：<code translate="no">5000</code> for 5km）</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">origin</code> の周囲に「減衰なしゾーン」を作成し、そのゾーン内のアイテムはフルスコア（減衰スコア = 1.0）を維持します。</p><p>時間ベースの減衰の場合、時間単位はコレクションのデータと一致している必要があります。</p><p><code translate="no">origin</code> からこの範囲内にあるアイテムは、最大の関連性を維持します。</p></td>
     <td><ul><li><p>時間の場合：秒単位の期間（例：<code translate="no">24 * 60 * 60</code> for 1 day）</p></li><li><p>距離の場合：メートル（例：<code translate="no">500</code> for 500m）</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>なし</p></td>
     <td><p><code translate="no">scale</code> の距離におけるスコア値。曲線の傾きを制御します。値が小さいほど曲線の傾きは急になり、値が大きいほど曲線の傾きは緩やかになります。</p><p>0 から 1 の間の値でなければなりません。</p></td>
     <td><p><code translate="no">0.5</code> （デフォルト）</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">標準ベクトル検索に適用<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>減衰ランカーを定義したら、<code translate="no">ranker</code> パラメータに指定することで、検索操作中にそれを適用できます:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;vector_field&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;document&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;timestamp&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector_field&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Use the decay function in standard vector search</span>
SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    Vectors = [yourQueryVector], <span class="hljs-comment">// Replace with your query vector</span>
    VectorFieldName = <span class="hljs-string">&quot;vector_field&quot;</span>,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span> },  <span class="hljs-comment">// Include the decay field in outputs to see values</span>
        FunctionScoreReranker = rerank,              <span class="hljs-comment">// Apply the decay ranker here</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
