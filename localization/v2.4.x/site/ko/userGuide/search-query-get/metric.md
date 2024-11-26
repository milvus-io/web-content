---
id: metric.md
summary: >-
  유사성 메트릭은 벡터 간의 유사성을 측정하는 데 사용됩니다. 적절한 거리 메트릭을 선택하면 분류 및 클러스터링 성능을 크게 향상시키는 데
  도움이 됩니다.
title: 메트릭 유형
---
<h1 id="Metric-Types​" class="common-anchor-header">메트릭 유형<button data-href="#Metric-Types​" class="anchor-icon" translate="no">
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
    </button></h1><p>유사성 메트릭은 벡터 간의 유사성을 측정하는 데 사용됩니다. 적절한 거리 메트릭을 선택하면 분류 및 클러스터링 성능을 크게 향상시킬 수 있습니다.</p>
<p>현재 질리즈 클라우드가 지원하는 유사도 메트릭 유형은 다음과 같습니다: 유클리드 거리 (<code translate="no">L2</code>), 내적 곱 (<code translate="no">IP</code>), 코사인 유사도 (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, <code translate="no">BM25</code> (특히 희소 벡터의 전체 텍스트 검색을 위해 설계됨).</p>
<p>아래 표에는 다양한 필드 유형과 해당 메트릭 유형 간의 매핑이 요약되어 있습니다.</p>
<table data-block-token="LHu5dKCHro3mnTx6PsmckEsinQd"><thead><tr><th data-block-token="JOJvdTK9MouhT8x7tfGc59NGnfg" colspan="1" rowspan="1"><p data-block-token="TS9tdnaJaoG4kfx96cfcqXINnnc">필드 유형</p>
</th><th data-block-token="Iy8ZdPGpIo6nfwxiz4RcSuwanwf" colspan="1" rowspan="1"><p data-block-token="SKIAdxDFJo9oOyxg7iTcmfGAnz1">차원 범위</p>
</th><th data-block-token="LkYndBOhGotOkGxsog2ciFTSnKd" colspan="1" rowspan="1"><p data-block-token="Nzcsdqt2WoZ4R5xQMT2cD0PQnAh">지원되는 메트릭 유형</p>
</th><th data-block-token="Hw3WdXW8UoXmZhxNbTRcMGkjnLb" colspan="1" rowspan="1"><p data-block-token="NEB5drrS2o46Z1xvxNxcfYqsnyc">기본 메트릭 유형</p>
</th></tr></thead><tbody><tr><td data-block-token="PGXedlNoqoilHxx2AGJc7i9mnjd" colspan="1" rowspan="1"><p data-block-token="YnSKdzakeoKzcmxFOhicXzWenEg"><code translate="no">FLOAT_VECTOR</code></p>
</td><td data-block-token="PsDDdjHs1ofQVcxorBXca4ognRh" colspan="1" rowspan="1"><p data-block-token="P8SsdIXb8oDZmcxQzhtccTM6nUd">2-32,768</p>
</td><td data-block-token="Lcd9dYDt7oQaFVxCWFFcSRtDnue" colspan="1" rowspan="1"><p data-block-token="L74NdaSY9o41qlxD7qJcIz5Lnkc"><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p>
</td><td data-block-token="Ay3Fd5LNqo4RPsxuuNpck2BMnkh" colspan="1" rowspan="1"><p data-block-token="RF4udqckuoee0OxcAaqc4H7Yn7d"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="XJjsdPYLAoS9UTx2dMfctcTDnGh" colspan="1" rowspan="1"><p data-block-token="Rxz7dFrd3oN2z8x9DioclY4lnNe"><code translate="no">FLOAT16_VECTOR</code></p>
</td><td data-block-token="CxFFd2zLGocDQ5x8W6KcaNsTncc" colspan="1" rowspan="1"><p data-block-token="LTFOd7WtZo7xPjxeuFcccCmynDb">2-32,768</p>
</td><td data-block-token="Tb0SdIkLyofe0rxXJCgccCePnAf" colspan="1" rowspan="1"><p data-block-token="DXJrdv7X7oJ0QVx33G3cTdJenuP"><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p>
<p data-block-token="B6K0dqXxko7EgTxgXSgcaKvPncc"></p>
</td><td data-block-token="WlU2d4iIfoPCyKx1Pmmchfi3nOl" colspan="1" rowspan="1"><p data-block-token="TlfAdhvlgoO6nIx5RWucqeAYn5c"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="LWfPdDMxmoR7gtxg0SicPi5TnVe" colspan="1" rowspan="1"><p data-block-token="Cyf6dqXW7oEkzqxgNILcpn9UnPe"><code translate="no">BFLOAT16_VECTOR</code></p>
</td><td data-block-token="YUUNdZ8b0oZyt3xWiTMcPiJxnKe" colspan="1" rowspan="1"><p data-block-token="VLFCdAKmhoPiKUxp3Aoc1q8enhd">2-32,768</p>
</td><td data-block-token="DV93ds317o3UmgxWZbicIJJsnSd" colspan="1" rowspan="1"><p data-block-token="ENpydUfyRokNyHxwdTJc54URndb"><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p>
</td><td data-block-token="MnocdwigMoBJGZxnAl5c8g7Qnbd" colspan="1" rowspan="1"><p data-block-token="Jzz7dJBY9ory41xD3becoMuLnRg"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="J3qEdX4N3o0H0nx3ikbcMGWRnLc" colspan="1" rowspan="1"><p data-block-token="HHdzdnRTXo3sdfxLju9cWEwYnId"><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
</td><td data-block-token="Swg5dVhAboemtgx5lDKcYKBSnFb" colspan="1" rowspan="1"><p data-block-token="NqC6dpCgooBUS9xqTlJcUnwbnUc">치수를 지정할 필요가 없습니다.</p>
</td><td data-block-token="Kh3vdZtdoo4ebbxhpl6cYdcZnZc" colspan="1" rowspan="1"><p data-block-token="VwY7dNaLhowsXOxhPN5cMg8ln3d"><code translate="no">IP</code>, <code translate="no">BM25</code> (전체 텍스트 검색에만 사용)</p>
</td><td data-block-token="RZWudPDO8oGzo9xrouncv8PXnch" colspan="1" rowspan="1"><p data-block-token="MrWddDR0soeonBxXTQAcY9G5nph"><code translate="no">IP</code></p>
</td></tr><tr><td data-block-token="Qh9YdBV0yocP8Ux1GZzctRcinwh" colspan="1" rowspan="1"><p data-block-token="BP0ddwawMoxoF9xKhBjcNH4jnPr"><code translate="no">BINARY_VECTOR</code></p>
</td><td data-block-token="RnLodmlT3oe8tgxFrPrcqPD6nEb" colspan="1" rowspan="1"><p data-block-token="CFw8dmfgcoubhZxpxB7cLlp6ntb">8-32,768*8</p>
<p data-block-token="ETORduKnPojEq3xweqhc4fBJnkd"></p>
</td><td data-block-token="H5jdd6wKZofy9zxiu88cMrLVn5d" colspan="1" rowspan="1"><p data-block-token="OQDIdyEtKo1dArxPWdEcdX1znZd"><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p>
</td><td data-block-token="QJBadzeQRox54VxflTLcYRO5nsj" colspan="1" rowspan="1"><p data-block-token="CYUNdJmCCoqr0ux0qF5cFLlRnWf"><code translate="no">HAMMING</code></p>
</td></tr></tbody></table>
<div class="alert note">
<ul>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code> 유형의 벡터 필드의 경우, 전체 텍스트 검색을 수행할 때만 <code translate="no">BM25</code> 메트릭 유형을 사용합니다. 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code> 유형의 벡터 필드의 경우 차원 값(<code translate="no">dim</code>)은 8의 배수여야 합니다. </p></li>
</ul>
</div>
<p>아래 표에는 지원되는 모든 메트릭 유형의 유사도 거리 값의 특징과 값 범위가 요약되어 있습니다.</p>
<table data-block-token="EOgLdu5WdoBkLqxmYIfcYGkinLd"><thead><tr><th data-block-token="NQdRdW2N9oqzaox1LHdcqs62n2f" colspan="1" rowspan="1"><p data-block-token="Roy2d7WW8oQyy1x21MUc4xbfnyf">메트릭 유형</p>
</th><th data-block-token="UgmddW6X6oP1S0xFq3QcPtUznYf" colspan="1" rowspan="1"><p data-block-token="Or5LdW0KPodlWixinL6cWsJ4nTd">유사도 거리 값의 특성</p>
</th><th data-block-token="A6aTdLiwpoZiTOxOKDKcUV3Ynpe" colspan="1" rowspan="1"><p data-block-token="NZAWdu38do5mYUxFV2ac4woBnLh">유사도 거리 값 범위</p>
</th></tr></thead><tbody><tr><td data-block-token="WueMdzdxZoPUMaxYFXccfNq3nQc" colspan="1" rowspan="1"><p data-block-token="JZA4dYZYtoqYXZxXskKcm0bSnrc"><code translate="no">L2</code></p>
</td><td data-block-token="U4sEdyrLPo11oxxeK1OcsAYGnMc" colspan="1" rowspan="1"><p data-block-token="GYLzdsePwohWbzxQu9ecqLswnqc">값이 작을수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="NuIIdRT0Vo0ReDx4YxCcrSr1nvg" colspan="1" rowspan="1"><p data-block-token="UmPHdRRIYokZGPxobbZc3gG0nZe">[0, ∞)</p>
</td></tr><tr><td data-block-token="VZPGde4XnokxQWxwZkXcbj4pnnh" colspan="1" rowspan="1"><p data-block-token="YKbidfE52o82EyxLTxPcsYyWn7c"><code translate="no">IP</code></p>
</td><td data-block-token="FLsidgKBYoYSIPxLL6hceY6Unug" colspan="1" rowspan="1"><p data-block-token="P209de8x5oXJ6XxlZxPcA0o6n8d">값이 클수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="Eqg9d7C9CodcAbxKTH8cFl01nbe" colspan="1" rowspan="1"><p data-block-token="T4dRd7qEmoRCmFxlIpkcwXg3nLf">[-1, 1]</p>
</td></tr><tr><td data-block-token="O999dQ01qoPM8axWJEIcQ7fAnlh" colspan="1" rowspan="1"><p data-block-token="KkA6dbEEMowdOaxqtsMcz4sInQd"><code translate="no">COSINE</code></p>
</td><td data-block-token="UxNzdl0UboEmoqx85QIcbJWxncb" colspan="1" rowspan="1"><p data-block-token="FqPRdMe3uoZIbVxopxkcVIy2nef">값이 클수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="RUo6dZMMooT6PHxaG7LcCHfhnHh" colspan="1" rowspan="1"><p data-block-token="GfXAduI1KoPjPSxfKslcf7jJnDY">[-1, 1]</p>
</td></tr><tr><td data-block-token="ZvJ8dlR2coPDm6x5MHkcxHLQnPe" colspan="1" rowspan="1"><p data-block-token="KARBdYWDmovd7SxYV1vcEUNAn7F"><code translate="no">JACCARD</code></p>
</td><td data-block-token="Aq8Cd7Awao5IhExSnUjcUzRxndh" colspan="1" rowspan="1"><p data-block-token="AMbXd3nwLoHalMx3h0pc63i9nNg">값이 작을수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="ULaFdvx0WoKy4rxBgPzciLZMnFg" colspan="1" rowspan="1"><p data-block-token="Je5xdsfnvoQli3xdODDchYMkn2e">[0, 1]</p>
</td></tr><tr><td data-block-token="L5l6dqaAVoVpSJxFW5TcZlXLnAc" colspan="1" rowspan="1"><p data-block-token="JOcmdIWTUoZuoGxoToYcMLpLnMg"><code translate="no">HAMMING</code></p>
</td><td data-block-token="H3vYdaah4oWsXmxmABOcW01XnSh" colspan="1" rowspan="1"><p data-block-token="VHz5d7R91o3OGuxX39Bc76CTnGf">값이 작을수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="NZnwdhAGUoO0R9x9gz6cZfCYnOd" colspan="1" rowspan="1"><p data-block-token="Xk7wdBDlko6RjFxVnATcPYTjnsb">[0, dim(벡터)]</p>
</td></tr><tr><td data-block-token="Xm5BdUTvXoPS1Xxtc26cBqAWn9e" colspan="1" rowspan="1"><p data-block-token="FoMadsBCboAKV2xofQ2c9IiKntb"><code translate="no">BM25</code></p>
</td><td data-block-token="OHEldDxlaoejYmxXgUPcbwCYn4b" colspan="1" rowspan="1"><p data-block-token="EVzLdJPQdopf2mxZ3dfcTGSgnSc">용어 빈도, 반전된 문서 빈도 및 문서 정규화를 기반으로 관련성 점수를 매깁니다.</p>
</td><td data-block-token="KNCEd8WTioQbwnxmHzNcpHkHnzf" colspan="1" rowspan="1"><p data-block-token="RVtVda2Ozo1N5ixO0oucju5FnWh">[0, ∞)</p>
<p data-block-token="MQ5RdcTC1oIZC5x4d7xc2M56nId"></p>
</td></tr></tbody></table>
<h2 id="Euclidean-distance-L2​" class="common-anchor-header">유클리드 거리(L2)<button data-href="#Euclidean-distance-L2​" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적으로 유클리드 거리는 두 점을 연결하는 세그먼트의 길이를 측정합니다.</p>
<p>유클리드 거리의 공식은 다음과 같습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="Euclidean distance formula" class="doc-image" id="euclidean-distance-formula" />
   </span> <span class="img-wrapper"> <span>유클리드 거리 공식</span> </span></p>
<p>여기서 <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> 과 <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> 은 n차원 유클리드 공간에서 두 점입니다.</p>
<p>가장 일반적으로 사용되는 거리 측정법으로 데이터가 연속적인 경우 매우 유용합니다.</p>
<div class="alert note">
<p>질리즈 클라우드는 유클리드 거리를 거리 측정값으로 선택하면 제곱근을 적용하기 전의 값만 계산합니다.</p>
</div>
<h2 id="Inner-product-IP​" class="common-anchor-header">내부 제품(IP)<button data-href="#Inner-product-IP​" class="anchor-icon" translate="no">
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
    </button></h2><p>두 임베딩 사이의 IP 거리는 다음과 같이 정의됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="Inner product formula" class="doc-image" id="inner-product-formula" />
   </span> <span class="img-wrapper"> <span>내부 곱 공식</span> </span></p>
<p>IP는 정규화되지 않은 데이터를 비교해야 하거나 크기와 각도를 고려해야 할 때 더 유용합니다.</p>
<div class="alert note">
<p>IP를 사용하여 임베딩 간의 유사성을 계산하는 경우 임베딩을 정규화해야 합니다. 정규화 후 내적 곱은 코사인 유사도와 같습니다.</p>
</div>
<p>X'가 임베딩 X에서 정규화되었다고 가정합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="Normalized inner product formula" class="doc-image" id="normalized-inner-product-formula" />
   </span> <span class="img-wrapper"> <span>정규화된 내적 곱 공식</span> </span></p>
<p>두 임베딩 간의 상관관계는 다음과 같습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="Correlation between embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>임베딩 간의 상관관계</span> </span></p>
<h2 id="Cosine-similarity-​" class="common-anchor-header">코사인 유사도<button data-href="#Cosine-similarity-​" class="anchor-icon" translate="no">
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
    </button></h2><p>코사인 유사도는 두 벡터 세트 사이의 각도의 코사인을 사용하여 얼마나 유사한지 측정합니다. 두 벡터 세트는 [0,0,...]과 같이 같은 지점에서 시작하지만 서로 다른 방향을 가리키는 선분으로 생각할 수 있습니다.</p>
<p>두 벡터 집합 <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> 와 <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub></strong>) 사이의 코사인 유사도를 계산하려면 다음 공식을 사용하세요.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="Cosine similarity formula" class="doc-image" id="cosine-similarity-formula" />
   </span> <span class="img-wrapper"> <span>코사인 유사도 공식</span> </span></p>
<p>코사인 유사도는 항상 <strong>[-1, 1]</strong> 간격에 있습니다. 예를 들어 두 개의 비례 벡터의 코사인 유사도는 <strong>1</strong>, 두 개의 직교 벡터의 유사도는 <strong>0</strong>, 두 개의 반대 벡터의 유사도는 <strong>-1입니다</strong>. 코사인이 클수록 두 벡터 사이의 각도가 작아져 이 두 벡터가 서로 더 유사하다는 것을 나타냅니다.</p>
<p>코사인 유사도를 1에서 빼면 두 벡터 사이의 코사인 거리를 구할 수 있습니다.</p>
<h2 id="JACCARD-distance​" class="common-anchor-header">JACCARD 거리<button data-href="#JACCARD-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>JACCARD 유사도 계수는 두 샘플 세트 간의 유사도를 측정하며, 정의된 세트의 교집합의 카디널리티를 두 세트의 합집합의 카디널리티로 나눈 값으로 정의됩니다. 유한한 샘플 세트에만 적용할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="JACCARD similarity coefficient formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 유사도 계수 공식</span> </span></p>
<p>JACCARD 거리는 데이터 세트 간의 유사도를 측정하며, 1에서 JACCARD 유사도 계수를 빼면 구할 수 있습니다. 이진 변수의 경우, JACCARD 거리는 타니모토 계수와 동일합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="JACCARD distance formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 거리 공식</span> </span></p>
<h2 id="HAMMING-distance​" class="common-anchor-header">해밍 거리<button data-href="#HAMMING-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>해밍 거리는 이진 데이터 문자열을 측정합니다. 길이가 같은 두 문자열 사이의 거리는 비트가 서로 다른 비트 위치의 수입니다.</p>
<p>예를 들어 1101 1001과 1001 1101이라는 두 개의 문자열이 있다고 가정해 보겠습니다.</p>
<p>11011001 ⊕ 10011101 = 01000100. 여기에는 두 개의 1이 포함되어 있으므로 해밍 거리는 d(11011001, 10011101) = 2입니다.</p>
<h2 id="BM25-similarity​" class="common-anchor-header">BM25 유사성<button data-href="#BM25-similarity​" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25는 널리 사용되는 텍스트 관련성 측정 방법으로, 특히 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 위해 설계되었습니다. 다음 세 가지 주요 요소를 결합합니다.</p>
<ul>
<li><p><strong>용어 빈도(TF):</strong> 문서에서 용어가 얼마나 자주 나타나는지를 측정합니다. 빈도가 높을수록 중요도가 높은 경우가 많지만, BM25는 포화도 매개변수 k1을 사용하여 지나치게 빈번한 용어가 관련성 점수를 지배하는 것을 방지합니다.</p></li>
<li><p><strong>역 문서 빈도(IDF):</strong> 전체 말뭉치에서 용어의 중요도를 반영합니다. 더 적은 문서에 나타나는 용어는 더 높은 IDF 값을 받아 연관성에 대한 기여도가 더 크다는 것을 나타냅니다.</p></li>
<li><p><strong>문서 길이 <strong>정규화</strong>:</strong> 문서 길이가 길수록 더 많은 용어를 포함하고 있기 때문에 점수가 높아지는 경향이 있습니다. BM25는 문서 길이를 정규화하여 이러한 편향을 완화하며, 매개변수 b는 이 정규화의 강도를 제어합니다.</p></li>
</ul>
<p>BM25 점수는 다음과 같이 계산됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bm25.png" alt="BM25 similarity formula" class="doc-image" id="bm25-similarity-formula" />
   </span> <span class="img-wrapper"> <span>BM25 유사도 공식</span> </span></p>
<p>매개변수 설명</p>
<ul>
<li><p><code translate="no">​Q</code>: 사용자가 제공한 쿼리 텍스트입니다.</p></li>
<li><p><code translate="no">​D</code>: 평가 중인 문서입니다.</p></li>
<li><p><code translate="no">​TF(qi​,D)</code>: 용어 빈도, 문서 D에서 용어 q가 얼마나 자주 나타나는지 나타냅니다.</p></li>
<li><p><code translate="no">​IDF(qi​)</code>: 역 문서 빈도, 다음과 같이 계산됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/idf.png" alt="IDF formula" class="doc-image" id="idf-formula" />
   </span> <span class="img-wrapper"> <span>IDF 공식</span> </span></p>
<p>여기서 <code translate="no">​N</code> 은 말뭉치의 총 문서 수이고 <code translate="no">​n(qi​)</code> 은 용어 qi가 포함된 문서 수입니다.</p></li>
<li><p><code translate="no">​∣D∣</code>: 문서 길이 <code translate="no">​D</code> (총 용어 수).</p></li>
<li><p><code translate="no">​avgdl</code>: 코퍼스에 있는 모든 문서의 평균 길이.</p></li>
<li><p><code translate="no">​k1​</code>: 용어 빈도가 점수에 미치는 영향을 제어합니다. 값이 높을수록 용어 빈도의 중요도가 높아집니다. 일반적인 범위는 [1.2, 2.0]이며, Milvus는 [0, 3]의 범위를 허용합니다.</p></li>
<li><p><code translate="no">​b</code>: 길이 정규화 정도를 0에서 1 사이의 범위로 제어합니다. 값이 0이면 정규화가 적용되지 않고, 값이 1이면 전체 정규화가 적용됩니다.</p></li>
</ul>
<p></p>
