---
id: metric.md
summary: >-
  類似度メトリクスは、ベクトル間の類似度を測定するために使用される。適切な距離メトリックを選択することで、分類やクラスタリングの性能を大幅に向上させることができる。
title: メートル法
---
<h1 id="Metric-Types​" class="common-anchor-header">メトリクスの種類<button data-href="#Metric-Types​" class="anchor-icon" translate="no">
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
    </button></h1><p>類似度メトリクスは、ベクトル間の類似度を測定するために使用されます。適切な距離メトリックを選択することで、分類やクラスタリングのパフォーマンスを大幅に向上させることができます。</p>
<p>現在、Zilliz Cloudは以下の類似度メトリックをサポートしています：ユークリッド距離(<code translate="no">L2</code>)、内積(<code translate="no">IP</code>)、コサイン類似度(<code translate="no">COSINE</code>)、<code translate="no">JACCARD</code> 、<code translate="no">HAMMING</code> 、<code translate="no">BM25</code> (特にスパースベクトルの全文検索用に設計)。</p>
<p>以下の表は、さまざまなフィールド・タイプと、それらに対応するメトリック・タイプとの対応をまとめたものです。</p>
<table data-block-token="LHu5dKCHro3mnTx6PsmckEsinQd"><thead><tr><th data-block-token="JOJvdTK9MouhT8x7tfGc59NGnfg" colspan="1" rowspan="1"><p data-block-token="TS9tdnaJaoG4kfx96cfcqXINnnc">フィールド・タイプ</p>
</th><th data-block-token="Iy8ZdPGpIo6nfwxiz4RcSuwanwf" colspan="1" rowspan="1"><p data-block-token="SKIAdxDFJo9oOyxg7iTcmfGAnz1">次元範囲</p>
</th><th data-block-token="LkYndBOhGotOkGxsog2ciFTSnKd" colspan="1" rowspan="1"><p data-block-token="Nzcsdqt2WoZ4R5xQMT2cD0PQnAh">サポートされるメトリック型</p>
</th><th data-block-token="Hw3WdXW8UoXmZhxNbTRcMGkjnLb" colspan="1" rowspan="1"><p data-block-token="NEB5drrS2o46Z1xvxNxcfYqsnyc">デフォルトのメトリック型</p>
</th></tr></thead><tbody><tr><td data-block-token="PGXedlNoqoilHxx2AGJc7i9mnjd" colspan="1" rowspan="1"><p data-block-token="YnSKdzakeoKzcmxFOhicXzWenEg"><code translate="no">FLOAT_VECTOR</code></p>
</td><td data-block-token="PsDDdjHs1ofQVcxorBXca4ognRh" colspan="1" rowspan="1"><p data-block-token="P8SsdIXb8oDZmcxQzhtccTM6nUd">2-32,768</p>
</td><td data-block-token="Lcd9dYDt7oQaFVxCWFFcSRtDnue" colspan="1" rowspan="1"><p data-block-token="L74NdaSY9o41qlxD7qJcIz5Lnkc"><code translate="no">COSINE</code> <code translate="no">L2</code> <code translate="no">IP</code></p>
</td><td data-block-token="Ay3Fd5LNqo4RPsxuuNpck2BMnkh" colspan="1" rowspan="1"><p data-block-token="RF4udqckuoee0OxcAaqc4H7Yn7d"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="XJjsdPYLAoS9UTx2dMfctcTDnGh" colspan="1" rowspan="1"><p data-block-token="Rxz7dFrd3oN2z8x9DioclY4lnNe"><code translate="no">FLOAT16_VECTOR</code></p>
</td><td data-block-token="CxFFd2zLGocDQ5x8W6KcaNsTncc" colspan="1" rowspan="1"><p data-block-token="LTFOd7WtZo7xPjxeuFcccCmynDb">2-32,768</p>
</td><td data-block-token="Tb0SdIkLyofe0rxXJCgccCePnAf" colspan="1" rowspan="1"><p data-block-token="DXJrdv7X7oJ0QVx33G3cTdJenuP"><code translate="no">COSINE</code> <code translate="no">L2</code>,<code translate="no">IP</code></p>
<p data-block-token="B6K0dqXxko7EgTxgXSgcaKvPncc"></p>
</td><td data-block-token="WlU2d4iIfoPCyKx1Pmmchfi3nOl" colspan="1" rowspan="1"><p data-block-token="TlfAdhvlgoO6nIx5RWucqeAYn5c"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="LWfPdDMxmoR7gtxg0SicPi5TnVe" colspan="1" rowspan="1"><p data-block-token="Cyf6dqXW7oEkzqxgNILcpn9UnPe"><code translate="no">BFLOAT16_VECTOR</code></p>
</td><td data-block-token="YUUNdZ8b0oZyt3xWiTMcPiJxnKe" colspan="1" rowspan="1"><p data-block-token="VLFCdAKmhoPiKUxp3Aoc1q8enhd">2-32,768</p>
</td><td data-block-token="DV93ds317o3UmgxWZbicIJJsnSd" colspan="1" rowspan="1"><p data-block-token="ENpydUfyRokNyHxwdTJc54URndb"><code translate="no">COSINE</code> <code translate="no">L2</code>,<code translate="no">IP</code></p>
</td><td data-block-token="MnocdwigMoBJGZxnAl5c8g7Qnbd" colspan="1" rowspan="1"><p data-block-token="Jzz7dJBY9ory41xD3becoMuLnRg"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="J3qEdX4N3o0H0nx3ikbcMGWRnLc" colspan="1" rowspan="1"><p data-block-token="HHdzdnRTXo3sdfxLju9cWEwYnId"><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
</td><td data-block-token="Swg5dVhAboemtgx5lDKcYKBSnFb" colspan="1" rowspan="1"><p data-block-token="NqC6dpCgooBUS9xqTlJcUnwbnUc">次元を指定する必要はありません。</p>
</td><td data-block-token="Kh3vdZtdoo4ebbxhpl6cYdcZnZc" colspan="1" rowspan="1"><p data-block-token="VwY7dNaLhowsXOxhPN5cMg8ln3d"><code translate="no">IP</code>,<code translate="no">BM25</code> (全文検索にのみ使用)</p>
</td><td data-block-token="RZWudPDO8oGzo9xrouncv8PXnch" colspan="1" rowspan="1"><p data-block-token="MrWddDR0soeonBxXTQAcY9G5nph"><code translate="no">IP</code></p>
</td></tr><tr><td data-block-token="Qh9YdBV0yocP8Ux1GZzctRcinwh" colspan="1" rowspan="1"><p data-block-token="BP0ddwawMoxoF9xKhBjcNH4jnPr"><code translate="no">BINARY_VECTOR</code></p>
</td><td data-block-token="RnLodmlT3oe8tgxFrPrcqPD6nEb" colspan="1" rowspan="1"><p data-block-token="CFw8dmfgcoubhZxpxB7cLlp6ntb">8-32,768*8</p>
<p data-block-token="ETORduKnPojEq3xweqhc4fBJnkd"></p>
</td><td data-block-token="H5jdd6wKZofy9zxiu88cMrLVn5d" colspan="1" rowspan="1"><p data-block-token="OQDIdyEtKo1dArxPWdEcdX1znZd"><code translate="no">HAMMING</code> <code translate="no">JACCARD</code></p>
</td><td data-block-token="QJBadzeQRox54VxflTLcYRO5nsj" colspan="1" rowspan="1"><p data-block-token="CYUNdJmCCoqr0ux0qF5cFLlRnWf"><code translate="no">HAMMING</code></p>
</td></tr></tbody></table>
<div class="alert note">
<ul>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code> タイプのベクトル・フィールドの場合、全文検索を実行するときのみ<code translate="no">BM25</code> メトリック・タイプを使用する。詳細については、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p></li>
<li><p><code translate="no">BINARY_VECTOR</code> 型のベクトル・フィールドの場合、次元値 (<code translate="no">dim</code>) は 8 の倍数でなければなりません。</p></li>
</ul>
</div>
<p>以下の表は、サポー ト さ れてい る すべての メ ト リ ッ ク タ イ プの類似度距離値の特徴 と 、 その値域をまとめた も のです。</p>
<table data-block-token="EOgLdu5WdoBkLqxmYIfcYGkinLd"><thead><tr><th data-block-token="NQdRdW2N9oqzaox1LHdcqs62n2f" colspan="1" rowspan="1"><p data-block-token="Roy2d7WW8oQyy1x21MUc4xbfnyf">メトリック・タイプ</p>
</th><th data-block-token="UgmddW6X6oP1S0xFq3QcPtUznYf" colspan="1" rowspan="1"><p data-block-token="Or5LdW0KPodlWixinL6cWsJ4nTd">類似性距離値の特性</p>
</th><th data-block-token="A6aTdLiwpoZiTOxOKDKcUV3Ynpe" colspan="1" rowspan="1"><p data-block-token="NZAWdu38do5mYUxFV2ac4woBnLh">類似性距離値の範囲</p>
</th></tr></thead><tbody><tr><td data-block-token="WueMdzdxZoPUMaxYFXccfNq3nQc" colspan="1" rowspan="1"><p data-block-token="JZA4dYZYtoqYXZxXskKcm0bSnrc"><code translate="no">L2</code></p>
</td><td data-block-token="U4sEdyrLPo11oxxeK1OcsAYGnMc" colspan="1" rowspan="1"><p data-block-token="GYLzdsePwohWbzxQu9ecqLswnqc">値が小さいほど類似度が高いことを示す。</p>
</td><td data-block-token="NuIIdRT0Vo0ReDx4YxCcrSr1nvg" colspan="1" rowspan="1"><p data-block-token="UmPHdRRIYokZGPxobbZc3gG0nZe">[0, ∞)</p>
</td></tr><tr><td data-block-token="VZPGde4XnokxQWxwZkXcbj4pnnh" colspan="1" rowspan="1"><p data-block-token="YKbidfE52o82EyxLTxPcsYyWn7c"><code translate="no">IP</code></p>
</td><td data-block-token="FLsidgKBYoYSIPxLL6hceY6Unug" colspan="1" rowspan="1"><p data-block-token="P209de8x5oXJ6XxlZxPcA0o6n8d">値が大きいほど類似性が高い。</p>
</td><td data-block-token="Eqg9d7C9CodcAbxKTH8cFl01nbe" colspan="1" rowspan="1"><p data-block-token="T4dRd7qEmoRCmFxlIpkcwXg3nLf">[-1, 1]</p>
</td></tr><tr><td data-block-token="O999dQ01qoPM8axWJEIcQ7fAnlh" colspan="1" rowspan="1"><p data-block-token="KkA6dbEEMowdOaxqtsMcz4sInQd"><code translate="no">COSINE</code></p>
</td><td data-block-token="UxNzdl0UboEmoqx85QIcbJWxncb" colspan="1" rowspan="1"><p data-block-token="FqPRdMe3uoZIbVxopxkcVIy2nef">値が大きいほど類似性が高いことを示す。</p>
</td><td data-block-token="RUo6dZMMooT6PHxaG7LcCHfhnHh" colspan="1" rowspan="1"><p data-block-token="GfXAduI1KoPjPSxfKslcf7jJnDY">[-1, 1]</p>
</td></tr><tr><td data-block-token="ZvJ8dlR2coPDm6x5MHkcxHLQnPe" colspan="1" rowspan="1"><p data-block-token="KARBdYWDmovd7SxYV1vcEUNAn7F"><code translate="no">JACCARD</code></p>
</td><td data-block-token="Aq8Cd7Awao5IhExSnUjcUzRxndh" colspan="1" rowspan="1"><p data-block-token="AMbXd3nwLoHalMx3h0pc63i9nNg">値が小さいほど類似性が高いことを示す。</p>
</td><td data-block-token="ULaFdvx0WoKy4rxBgPzciLZMnFg" colspan="1" rowspan="1"><p data-block-token="Je5xdsfnvoQli3xdODDchYMkn2e">[0, 1]</p>
</td></tr><tr><td data-block-token="L5l6dqaAVoVpSJxFW5TcZlXLnAc" colspan="1" rowspan="1"><p data-block-token="JOcmdIWTUoZuoGxoToYcMLpLnMg"><code translate="no">HAMMING</code></p>
</td><td data-block-token="H3vYdaah4oWsXmxmABOcW01XnSh" colspan="1" rowspan="1"><p data-block-token="VHz5d7R91o3OGuxX39Bc76CTnGf">値が小さいほど類似性が高いことを示す。</p>
</td><td data-block-token="NZnwdhAGUoO0R9x9gz6cZfCYnOd" colspan="1" rowspan="1"><p data-block-token="Xk7wdBDlko6RjFxVnATcPYTjnsb">[0, dim(ベクトル)</p>
</td></tr><tr><td data-block-token="Xm5BdUTvXoPS1Xxtc26cBqAWn9e" colspan="1" rowspan="1"><p data-block-token="FoMadsBCboAKV2xofQ2c9IiKntb"><code translate="no">BM25</code></p>
</td><td data-block-token="OHEldDxlaoejYmxXgUPcbwCYn4b" colspan="1" rowspan="1"><p data-block-token="EVzLdJPQdopf2mxZ3dfcTGSgnSc">用語頻度、逆文書頻度、文書正規化に基づいて関連性をスコア化する。</p>
</td><td data-block-token="KNCEd8WTioQbwnxmHzNcpHkHnzf" colspan="1" rowspan="1"><p data-block-token="RVtVda2Ozo1N5ixO0oucju5FnWh">[0, ∞)</p>
<p data-block-token="MQ5RdcTC1oIZC5x4d7xc2M56nId"></p>
</td></tr></tbody></table>
<h2 id="Euclidean-distance-L2​" class="common-anchor-header">ユークリッド距離 (L2)<button data-href="#Euclidean-distance-L2​" class="anchor-icon" translate="no">
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
    </button></h2><p>基本的に、ユークリッド距離は2点を結ぶセグメントの長さを測定する。</p>
<p>ユークリッド距離の公式は以下の通り。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="Euclidean distance formula" class="doc-image" id="euclidean-distance-formula" />
   </span> <span class="img-wrapper"> <span>ユークリッド距離の公式</span> </span></p>
<p>ここで、<strong>a = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>と<strong>b = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn</sub>-1)</strong>はn次元ユークリッド空間の2点である。</p>
<p>これは最も一般的に使用される距離メトリックで、データが連続的な場合に非常に便利です。</p>
<div class="alert note">
<p>Zilliz Cloudは、ユークリッド距離が距離メトリックとして選択された場合、平方根を適用する前の値のみを計算します。</p>
</div>
<h2 id="Inner-product-IP​" class="common-anchor-header">内積（IP）<button data-href="#Inner-product-IP​" class="anchor-icon" translate="no">
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
    </button></h2><p>2つの埋め込み間のIP距離は以下のように定義されます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="Inner product formula" class="doc-image" id="inner-product-formula" />
   </span> <span class="img-wrapper"> <span>内積の公式</span> </span></p>
<p>IPは、正規化されていないデータを比較する場合や、大きさや角度を気にする場合に便利です。</p>
<div class="alert note">
<p>IPを使って埋め込み間の類似度を計算する場合、埋め込みを正規化する必要があります。正規化後の内積は余弦類似度に等しくなります。</p>
</div>
<p>X'が埋め込みXから正規化されたとします。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="Normalized inner product formula" class="doc-image" id="normalized-inner-product-formula" />
   </span> <span class="img-wrapper"> <span>正規化内積の式</span> </span></p>
<p>2つの埋め込み間の相関は次のようになります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="Correlation between embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>埋め込み間の相関</span> </span></p>
<h2 id="Cosine-similarity-​" class="common-anchor-header">コサイン類似度<button data-href="#Cosine-similarity-​" class="anchor-icon" translate="no">
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
    </button></h2><p>コサイン類似度は、2組のベクトル間の角度の余弦を用いて、それらの類似度を測定します。2組のベクトルは、[0,0,...]のような同じ点から出発し、異なる方向を向いている線分と考えることができます。</p>
<p>2組のベクトル<strong>A = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>と<strong>B = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn</sub>-1)</strong>のコサイン類似度を計算するには、次の式を使います。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="Cosine similarity formula" class="doc-image" id="cosine-similarity-formula" />
   </span> <span class="img-wrapper"> <span>コサイン類似度の公式</span> </span></p>
<p>余弦類似度は常に区間<strong>[-1, 1]</strong>にある。例えば、2つの比例ベクトルは余弦類似度が<strong>1</strong>、2つの直交ベクトルは類似度が<strong>0</strong>、2つの対向ベクトルは類似度が<strong>-1</strong>です。余弦が大きいほど、2つのベクトル間の角度が小さくなり、これらの2つのベクトルが互いに似ていることを示します。</p>
<p>2つのベクトルの余弦類似度を1から引くことで、2つのベクトル間の余弦距離を求めることができます。</p>
<h2 id="JACCARD-distance​" class="common-anchor-header">JACCARD 距離<button data-href="#JACCARD-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>JACCARD類似度係数は，2つの標本集合間の類似度を測定し，定義された集合の交点のカーディナリティをそれらの和のカーディナリティで割ったものとして定義される．有限の標本集合にのみ適用できる．</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="JACCARD similarity coefficient formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD類似度係数の式</span> </span></p>
<p>JACCARD 距離は，データ集合間の非類似度を測定し，JACCARD 類似度係数を1から引くことによって得られる．</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="JACCARD distance formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 距離の公式</span> </span></p>
<h2 id="HAMMING-distance​" class="common-anchor-header">ハンミング距離<button data-href="#HAMMING-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>HAMMING 距離はバイナリ・データ文字列を測定する．同じ長さの2つの文字列間の距離は、ビットが異なるビット位置の数である。</p>
<p>例えば、1101 1001 と 1001 1101 という2つの文字列があるとする。</p>
<p>11011001 ⊕ 10011101 = 01000100.これには2つの1が含まれるため、ハミング距離d (11011001, 10011101) = 2となる。</p>
<h2 id="BM25-similarity​" class="common-anchor-header">BM25類似度<button data-href="#BM25-similarity​" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25は広く使われているテキスト関連性測定法で、特に<a href="/docs/ja/full-text-search.md">全文検索</a>用に設計されている。以下の3つの重要な要素を組み合わせている。</p>
<ul>
<li><p><strong>用語頻度（TF）：</strong>ある用語が文書に出現する頻度を測定する。頻度が高いほど重要度が高いことを示すことが多いが、BM25では飽和パラメータk1を使用して、頻度が高すぎる用語が関連性スコアを支配するのを防ぐ。</p></li>
<li><p><strong>逆ドキュメント頻度（IDF）：</strong>コーパス全体における用語の重要度を反映する。より少ない文書に出現する用語ほどIDF値が高くなり、関連性に大きく寄与していることを示す。</p></li>
<li><p><strong>文書の長さの<strong>正規化</strong>：</strong>長い文書は、より多くの用語を含むため、スコアが高くなる傾向があります。BM25は文書の長さを正規化することでこのバイアスを軽減し、パラメータbはこの正規化の強さを制御する。</p></li>
</ul>
<p>BM25のスコアリングは以下のように計算される。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bm25.png" alt="BM25 similarity formula" class="doc-image" id="bm25-similarity-formula" />
   </span> <span class="img-wrapper"> <span>BM25類似度の式</span> </span></p>
<p>パラメータの説明</p>
<ul>
<li><p><code translate="no">​Q</code>:ユーザーによって提供されたクエリーテキスト。</p></li>
<li><p><code translate="no">​D</code>:評価対象の文書。</p></li>
<li><p><code translate="no">​TF(qi​,D)</code>:文書Dにおける用語qの出現頻度。</p></li>
<li><p><code translate="no">​IDF(qi​)</code>:逆文書頻度。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/idf.png" alt="IDF formula" class="doc-image" id="idf-formula" />
   </span> <span class="img-wrapper"> <span>IDF式</span> </span></p>
<p>ここで、<code translate="no">​N</code> はコーパスに含まれる文書の総数、<code translate="no">​n(qi​)</code> は用語qiを含む文書の数である。</p></li>
<li><p><code translate="no">​∣D∣</code>:文書の長さ<code translate="no">​D</code> （用語の総数）。</p></li>
<li><p><code translate="no">​avgdl</code>:コーパスの全文書の平均長。</p></li>
<li><p><code translate="no">​k1​</code>:用語頻度がスコアに与える影響を制御する。値が高いほど用語頻度の重要度が増す。一般的な範囲は[1.2, 2.0]ですが、Milvusでは[0, 3]の範囲で設定できます。</p></li>
<li><p><code translate="no">​b</code>:長さの正規化の度合いを0から1の範囲で制御する。値が0の場合、正規化は行われず、値が1の場合、完全な正規化が行われます。</p></li>
</ul>
<p></p>
