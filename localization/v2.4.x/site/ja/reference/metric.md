---
id: metric.md
summary: Milvusは、ユークリッド距離、内積、ジャカードなど、様々な類似性メトリクスをサポートしている。
title: 類似性メトリクス
---
<h1 id="Similarity-Metrics" class="common-anchor-header">類似性メトリクス<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、ベクトル間の類似性を測定するために類似性メトリックが使用されます。適切な距離メトリックを選択することで、分類とクラスタリングの性能を大幅に向上させることができます。</p>
<p>以下の表は広く使われている類似度メトリクスが様々な入力データ形式とMilvusインデックスにどのように適合するかを示しています。現在、Milvusは浮動小数点埋め込み（しばしば浮動小数点ベクトルや密なベクトルとして知られる）、バイナリ埋め込み（バイナリベクトルとしても知られる）、スパース埋め込み（スパースベクトルとしても知られる）を含む様々なタイプのデータをサポートしています。</p>
<div class="filter">
 <a href="#floating">浮動小数点</a> <a href="#binary">埋め込み バイナリ埋め込み</a> <a href="#sparse">スパース埋め込み</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">メトリック型</th>
    <th class="tg-0pky">インデックスの種類</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>ユークリッド距離 (L2)</li><li>内積 (IP)</li><li>コサイン類似度 (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>フラット</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">メトリックタイプ</th>
    <th class="tg-0pky">インデックスタイプ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>ジャカード</li><li>ハミング</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">メトリックタイプ</th>
    <th class="tg-0pky">インデックスタイプ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>スパース・インバーテッド・インデックス</li><li>スパースワンド</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">ユークリッド距離 (L2)</h3><p>基本的に、ユークリッド距離は2点を結ぶセグメントの長さを測定する。</p>
<p>ユークリッド距離の公式は以下の通り：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>ユークリッド距離</span> </span></p>
<p>ここで<strong>a</strong>= (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)と<strong>b</strong>= (<sub>b0</sub>,<sub>b0</sub>,...,<sub>bn</sub>-1)はn次元ユークリッド空間の2点である。</p>
<p>これは最もよく使われる距離尺度で、データが連続的な場合に非常に便利である。</p>
<div class="alert note">
Milvusはユークリッド距離が距離メトリックとして選択された時のみ平方根を適用する前に値を計算します。</div>
<h3 id="Inner-product-IP" class="common-anchor-header">内積 (IP)</h3><p>2つのベクトル埋め込み間のIP距離は次のように定義されます：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>IP</span> </span></p>
<p>IPは、正規化されていないデータを比較する場合や、大きさや角度を気にする場合に便利です。</p>
<div class="alert note">
<p>正規化された埋込みデータにIP距離を適用すると，埋込みデータ間の余弦類似度を計算するのと同じ結果になります．</p>
</div>
<p>X'が埋め込みXから正規化されたとします：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>正規化</span> </span></p>
<p>2つの埋め込み間の相関は次のようになります：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>正規化</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">コサイン類似度</h3><p>コサイン類似度は、2組のベクトル間の角度の余弦を用いて、それらの類似度を測定します。2組のベクトルは、同じ原点（[0,0,...]）から出発し、異なる方向を向いている2つの線分と考えることができます。</p>
<p>2組のベクトル<strong>A = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>と<strong>B = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn</sub>-1)</strong>の余弦類似度を計算するには、次の式を使います：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>cosine_similarity</span> </span></p>
<p>余弦類似度は常に区間<strong>[-1, 1]</strong>にある。例えば、2つの比例ベクトルは余弦類似度が<strong>1</strong>、2つの直交ベクトルは類似度が<strong>0</strong>、2つの反対ベクトルは類似度が<strong>-1</strong>です。余弦が大きければ大きいほど、2つのベクトル間の角度が小さくなり、これらの2つのベクトルが互いに似ていることを示します。</p>
<p>コサイン類似度を1から引くことで、2つのベクトル間のコサイン距離が得られます。</p>
<h3 id="Jaccard-distance" class="common-anchor-header">ジャカード距離</h3><p>ジャカード類似度係数は、2つの標本集合間の類似度を測定し、定義された集合の交点のカーディナリティをそれらの和のカーディナリティで割ったものとして定義される。有限の標本集合にのみ適用できる。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>ジャカード類似度係数</span> </span></p>
<p>Jaccard距離はデータ集合間の非類似度を測定し，Jaccard類似度係数を1から引くことで得られる．</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>ジャカード距離</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">ハミング距離</h3><p>ハミング距離は2値データの文字列を測定する。同じ長さの2つの文字列間の距離は、ビットが異なるビット位置の数である。</p>
<p>例えば、1101 1001 と 1001 1101 という2つの文字列があるとする。</p>
<p>11011001 ⊕ 10011101 = 01000100.これには2つの1が含まれるため、ハミング距離d (11011001, 10011101) = 2となる。</p>
<h3 id="Structural-Similarity" class="common-anchor-header">構造の類似性</h3><p>ある化学構造がより大きな化学構造の一部として存在する場合、前者を部分構造、後者を上部構造と呼ぶ。例えば、エタノールは酢酸の部分構造であり、酢酸はエタノールの上部構造である。</p>
<p>構造の類似性は、一方が他方の上部構造または下部構造であるという点で、2つの化学式が互いに類似しているかどうかを判断するために使用される。</p>
<p>AがBの上部構造であるかどうかを判定するには、次式を使用する：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>上部構造</span> </span></p>
<p>ここで</p>
<ul>
<li>Aは、検索する化学式のバイナリ表現である。</li>
<li>B はデータベース内の化学式のバイナリ表現である。</li>
</ul>
<p>この式が<code translate="no">0</code> を返すと、<strong>Aは</strong> <strong>Bの</strong>上部構造ではない。</p>
<p>AがBの部分構造であるかどうかを判定するには、以下の式を使用する：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>部分構造</span> </span></p>
<p>ここで</p>
<ul>
<li>A は、検索する化学式のバイナリ表現である。</li>
<li>B はデータベース内の化学式のバイナリ表現である。</li>
</ul>
<p>この式が<code translate="no">0</code> を返すと、<strong>Aは</strong> <strong>Bの</strong>部分構造ではありません。</p>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">メトリックの種類が内積の場合、ベクトル検索のトップ1の結果が検索ベクトルそのものではないのはなぜですか？</font></summary>距離メトリックとして内積を使用する際に、ベクトルを正規化していない場合に発生します。</details>
<details>
<summary><font color="#4fc4f9">正規化とは何ですか？なぜ正規化が必要なのですか？</font></summary></p>
<p>正規化とは、埋め込み（ベクトル）のノルムが1になるように変換することです。埋込みの類似度を計算するために内積を使用する場合、埋込みを正規化する必要があります。正規化後は、内積は余弦類似度に等しくなります。</p>
<p>
詳しくは<a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipediaを</a>ご覧ください。</p>
</details>
<details>
<summary><font color="#4fc4f9">ユークリッド距離(L2)と内積(IP)を距離メトリックとして使用した場合、異なる結果が得られるのはなぜですか？</font></summary>ベクトルが正規化されているか確認してください。もしそうでなければ、まずベクトルを正規化する必要があります。理論的に言えば、ベクトルが正規化されていない場合、L2で計算された類似度はIPで計算された類似度とは異なります。</details>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvusでサポートされている<a href="/docs/ja/v2.4.x/index.md">インデックスタイプについて</a>もっと知る。</li>
</ul>
