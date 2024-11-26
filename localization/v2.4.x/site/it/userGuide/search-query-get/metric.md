---
id: metric.md
summary: >-
  Le metriche di somiglianza vengono utilizzate per misurare le somiglianze tra
  i vettori. La scelta di una metrica di distanza appropriata aiuta a migliorare
  significativamente le prestazioni di classificazione e clustering.
title: Tipi metrici
---
<h1 id="Metric-Types​" class="common-anchor-header">Tipi di metriche<button data-href="#Metric-Types​" class="anchor-icon" translate="no">
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
    </button></h1><p>Le metriche di somiglianza sono utilizzate per misurare le somiglianze tra vettori. La scelta di una metrica di distanza appropriata aiuta a migliorare significativamente le prestazioni di classificazione e clustering.</p>
<p>Attualmente, Zilliz Cloud supporta questi tipi di metriche di somiglianza: Distanza euclidea (<code translate="no">L2</code>), Prodotto interno (<code translate="no">IP</code>), Somiglianza coseno (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code> e <code translate="no">BM25</code> (specificamente progettato per la ricerca full text su vettori sparsi).</p>
<p>La tabella seguente riassume la mappatura tra i diversi tipi di campo e i corrispondenti tipi di metrica.</p>
<table data-block-token="LHu5dKCHro3mnTx6PsmckEsinQd"><thead><tr><th data-block-token="JOJvdTK9MouhT8x7tfGc59NGnfg" colspan="1" rowspan="1"><p data-block-token="TS9tdnaJaoG4kfx96cfcqXINnnc">Tipo di campo</p>
</th><th data-block-token="Iy8ZdPGpIo6nfwxiz4RcSuwanwf" colspan="1" rowspan="1"><p data-block-token="SKIAdxDFJo9oOyxg7iTcmfGAnz1">Intervallo di dimensione</p>
</th><th data-block-token="LkYndBOhGotOkGxsog2ciFTSnKd" colspan="1" rowspan="1"><p data-block-token="Nzcsdqt2WoZ4R5xQMT2cD0PQnAh">Tipi di metrica supportati</p>
</th><th data-block-token="Hw3WdXW8UoXmZhxNbTRcMGkjnLb" colspan="1" rowspan="1"><p data-block-token="NEB5drrS2o46Z1xvxNxcfYqsnyc">Tipo di metrica predefinito</p>
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
</td><td data-block-token="Swg5dVhAboemtgx5lDKcYKBSnFb" colspan="1" rowspan="1"><p data-block-token="NqC6dpCgooBUS9xqTlJcUnwbnUc">Non è necessario specificare la dimensione.</p>
</td><td data-block-token="Kh3vdZtdoo4ebbxhpl6cYdcZnZc" colspan="1" rowspan="1"><p data-block-token="VwY7dNaLhowsXOxhPN5cMg8ln3d"><code translate="no">IP</code>, <code translate="no">BM25</code> (utilizzato solo per la ricerca full text)</p>
</td><td data-block-token="RZWudPDO8oGzo9xrouncv8PXnch" colspan="1" rowspan="1"><p data-block-token="MrWddDR0soeonBxXTQAcY9G5nph"><code translate="no">IP</code></p>
</td></tr><tr><td data-block-token="Qh9YdBV0yocP8Ux1GZzctRcinwh" colspan="1" rowspan="1"><p data-block-token="BP0ddwawMoxoF9xKhBjcNH4jnPr"><code translate="no">BINARY_VECTOR</code></p>
</td><td data-block-token="RnLodmlT3oe8tgxFrPrcqPD6nEb" colspan="1" rowspan="1"><p data-block-token="CFw8dmfgcoubhZxpxB7cLlp6ntb">8-32,768*8</p>
<p data-block-token="ETORduKnPojEq3xweqhc4fBJnkd"></p>
</td><td data-block-token="H5jdd6wKZofy9zxiu88cMrLVn5d" colspan="1" rowspan="1"><p data-block-token="OQDIdyEtKo1dArxPWdEcdX1znZd"><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p>
</td><td data-block-token="QJBadzeQRox54VxflTLcYRO5nsj" colspan="1" rowspan="1"><p data-block-token="CYUNdJmCCoqr0ux0qF5cFLlRnWf"><code translate="no">HAMMING</code></p>
</td></tr></tbody></table>
<div class="alert note">
<ul>
<li><p>Per i campi vettoriali del tipo <code translate="no">SPARSE_FLOAT_VECTOR</code>, utilizzare il tipo di metrica <code translate="no">BM25</code> solo quando si esegue la ricerca a testo completo. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p></li>
<li><p>Per i campi vettoriali del tipo <code translate="no">BINARY_VECTOR</code>, il valore di dimensione (<code translate="no">dim</code>) deve essere un multiplo di 8. </p></li>
</ul>
</div>
<p>La tabella seguente riassume le caratteristiche dei valori della distanza di similarità di tutti i tipi di metrica supportati e il loro intervallo di valori.</p>
<table data-block-token="EOgLdu5WdoBkLqxmYIfcYGkinLd"><thead><tr><th data-block-token="NQdRdW2N9oqzaox1LHdcqs62n2f" colspan="1" rowspan="1"><p data-block-token="Roy2d7WW8oQyy1x21MUc4xbfnyf">Tipo di metrica</p>
</th><th data-block-token="UgmddW6X6oP1S0xFq3QcPtUznYf" colspan="1" rowspan="1"><p data-block-token="Or5LdW0KPodlWixinL6cWsJ4nTd">Caratteristiche dei valori della distanza di similarità</p>
</th><th data-block-token="A6aTdLiwpoZiTOxOKDKcUV3Ynpe" colspan="1" rowspan="1"><p data-block-token="NZAWdu38do5mYUxFV2ac4woBnLh">Intervallo dei valori della distanza di similarità</p>
</th></tr></thead><tbody><tr><td data-block-token="WueMdzdxZoPUMaxYFXccfNq3nQc" colspan="1" rowspan="1"><p data-block-token="JZA4dYZYtoqYXZxXskKcm0bSnrc"><code translate="no">L2</code></p>
</td><td data-block-token="U4sEdyrLPo11oxxeK1OcsAYGnMc" colspan="1" rowspan="1"><p data-block-token="GYLzdsePwohWbzxQu9ecqLswnqc">Un valore minore indica una maggiore somiglianza.</p>
</td><td data-block-token="NuIIdRT0Vo0ReDx4YxCcrSr1nvg" colspan="1" rowspan="1"><p data-block-token="UmPHdRRIYokZGPxobbZc3gG0nZe">[0, ∞)</p>
</td></tr><tr><td data-block-token="VZPGde4XnokxQWxwZkXcbj4pnnh" colspan="1" rowspan="1"><p data-block-token="YKbidfE52o82EyxLTxPcsYyWn7c"><code translate="no">IP</code></p>
</td><td data-block-token="FLsidgKBYoYSIPxLL6hceY6Unug" colspan="1" rowspan="1"><p data-block-token="P209de8x5oXJ6XxlZxPcA0o6n8d">Un valore maggiore indica una maggiore somiglianza.</p>
</td><td data-block-token="Eqg9d7C9CodcAbxKTH8cFl01nbe" colspan="1" rowspan="1"><p data-block-token="T4dRd7qEmoRCmFxlIpkcwXg3nLf">[-1, 1]</p>
</td></tr><tr><td data-block-token="O999dQ01qoPM8axWJEIcQ7fAnlh" colspan="1" rowspan="1"><p data-block-token="KkA6dbEEMowdOaxqtsMcz4sInQd"><code translate="no">COSINE</code></p>
</td><td data-block-token="UxNzdl0UboEmoqx85QIcbJWxncb" colspan="1" rowspan="1"><p data-block-token="FqPRdMe3uoZIbVxopxkcVIy2nef">Un valore maggiore indica una maggiore somiglianza.</p>
</td><td data-block-token="RUo6dZMMooT6PHxaG7LcCHfhnHh" colspan="1" rowspan="1"><p data-block-token="GfXAduI1KoPjPSxfKslcf7jJnDY">[-1, 1]</p>
</td></tr><tr><td data-block-token="ZvJ8dlR2coPDm6x5MHkcxHLQnPe" colspan="1" rowspan="1"><p data-block-token="KARBdYWDmovd7SxYV1vcEUNAn7F"><code translate="no">JACCARD</code></p>
</td><td data-block-token="Aq8Cd7Awao5IhExSnUjcUzRxndh" colspan="1" rowspan="1"><p data-block-token="AMbXd3nwLoHalMx3h0pc63i9nNg">Un valore minore indica una maggiore somiglianza.</p>
</td><td data-block-token="ULaFdvx0WoKy4rxBgPzciLZMnFg" colspan="1" rowspan="1"><p data-block-token="Je5xdsfnvoQli3xdODDchYMkn2e">[0, 1]</p>
</td></tr><tr><td data-block-token="L5l6dqaAVoVpSJxFW5TcZlXLnAc" colspan="1" rowspan="1"><p data-block-token="JOcmdIWTUoZuoGxoToYcMLpLnMg"><code translate="no">HAMMING</code></p>
</td><td data-block-token="H3vYdaah4oWsXmxmABOcW01XnSh" colspan="1" rowspan="1"><p data-block-token="VHz5d7R91o3OGuxX39Bc76CTnGf">Un valore minore indica una maggiore somiglianza.</p>
</td><td data-block-token="NZnwdhAGUoO0R9x9gz6cZfCYnOd" colspan="1" rowspan="1"><p data-block-token="Xk7wdBDlko6RjFxVnATcPYTjnsb">[0, dim(vettore)]</p>
</td></tr><tr><td data-block-token="Xm5BdUTvXoPS1Xxtc26cBqAWn9e" colspan="1" rowspan="1"><p data-block-token="FoMadsBCboAKV2xofQ2c9IiKntb"><code translate="no">BM25</code></p>
</td><td data-block-token="OHEldDxlaoejYmxXgUPcbwCYn4b" colspan="1" rowspan="1"><p data-block-token="EVzLdJPQdopf2mxZ3dfcTGSgnSc">Attribuisce un punteggio alla rilevanza in base alla frequenza dei termini, alla frequenza inversa dei documenti e alla normalizzazione dei documenti.</p>
</td><td data-block-token="KNCEd8WTioQbwnxmHzNcpHkHnzf" colspan="1" rowspan="1"><p data-block-token="RVtVda2Ozo1N5ixO0oucju5FnWh">[0, ∞)</p>
<p data-block-token="MQ5RdcTC1oIZC5x4d7xc2M56nId"></p>
</td></tr></tbody></table>
<h2 id="Euclidean-distance-L2​" class="common-anchor-header">Distanza euclidea (L2)<button data-href="#Euclidean-distance-L2​" class="anchor-icon" translate="no">
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
    </button></h2><p>In sostanza, la distanza euclidea misura la lunghezza di un segmento che collega due punti.</p>
<p>La formula della distanza euclidea è la seguente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="Euclidean distance formula" class="doc-image" id="euclidean-distance-formula" />
   </span> <span class="img-wrapper"> <span>Formula della distanza euclidea</span> </span></p>
<p>dove <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> sono due punti nello spazio euclideo n-dimensionale.</p>
<p>È la metrica di distanza più utilizzata ed è molto utile quando i dati sono continui.</p>
<div class="alert note">
<p>Zilliz Cloud calcola il valore prima di applicare la radice quadrata solo quando la distanza euclidea è scelta come metrica di distanza.</p>
</div>
<h2 id="Inner-product-IP​" class="common-anchor-header">Prodotto interno (IP)<button data-href="#Inner-product-IP​" class="anchor-icon" translate="no">
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
    </button></h2><p>La distanza IP tra due incorporazioni è definita come segue.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="Inner product formula" class="doc-image" id="inner-product-formula" />
   </span> <span class="img-wrapper"> <span>Formula del prodotto interno</span> </span></p>
<p>L'IP è più utile se si devono confrontare dati non normalizzati o se si tiene conto della grandezza e dell'angolo.</p>
<div class="alert note">
<p>Se si utilizza l'IP per calcolare le somiglianze tra embedding, è necessario normalizzare gli embedding. Dopo la normalizzazione, il prodotto interno equivale alla somiglianza del coseno.</p>
</div>
<p>Supponiamo che X' sia normalizzato dall'incorporamento X.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="Normalized inner product formula" class="doc-image" id="normalized-inner-product-formula" />
   </span> <span class="img-wrapper"> <span>Formula del prodotto interno normalizzato</span> </span></p>
<p>La correlazione tra le due incorporazioni è la seguente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="Correlation between embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Correlazione tra le incorporazioni</span> </span></p>
<h2 id="Cosine-similarity-​" class="common-anchor-header">Somiglianza coseno<button data-href="#Cosine-similarity-​" class="anchor-icon" translate="no">
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
    </button></h2><p>La somiglianza coseno utilizza il coseno dell'angolo tra due insiemi di vettori per misurare la loro somiglianza. Si può pensare ai due insiemi di vettori come a segmenti di linea che partono dallo stesso punto, come [0,0,...], ma che puntano in direzioni diverse.</p>
<p>Per calcolare la somiglianza del coseno tra due insiemi di vettori <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utilizzare la seguente formula.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="Cosine similarity formula" class="doc-image" id="cosine-similarity-formula" />
   </span> <span class="img-wrapper"> <span>Formula di somiglianza del coseno</span> </span></p>
<p>La somiglianza del coseno è sempre nell'intervallo <strong>[-1, 1]</strong>. Ad esempio, due vettori proporzionali hanno una somiglianza di coseno pari a <strong>1</strong>, due vettori ortogonali hanno una somiglianza pari a <strong>0</strong> e due vettori opposti hanno una somiglianza pari a <strong>-1</strong>. Più grande è il coseno, più piccolo è l'angolo tra i due vettori, il che indica che questi due vettori sono più simili tra loro.</p>
<p>Sottraendo la somiglianza del coseno da 1, si ottiene la distanza del coseno tra due vettori.</p>
<h2 id="JACCARD-distance​" class="common-anchor-header">Distanza JACCARD<button data-href="#JACCARD-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>Il coefficiente di somiglianza JACCARD misura la somiglianza tra due insiemi di campioni ed è definito come la cardinalità dell'intersezione degli insiemi definiti divisa per la cardinalità dell'unione degli stessi. Può essere applicato solo a insiemi di campioni finiti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="JACCARD similarity coefficient formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Formula del coefficiente di somiglianza JACCARD</span> </span></p>
<p>La distanza JACCARD misura la dissimilarità tra gli insiemi di dati e si ottiene sottraendo il coefficiente di similarità JACCARD da 1. Per le variabili binarie, la distanza JACCARD è equivalente al coefficiente di Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="JACCARD distance formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>Formula della distanza JACCARD</span> </span></p>
<h2 id="HAMMING-distance​" class="common-anchor-header">Distanza HAMMING<button data-href="#HAMMING-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>La distanza HAMMING misura stringhe di dati binari. La distanza tra due stringhe di uguale lunghezza è il numero di posizioni di bit in cui i bit sono diversi.</p>
<p>Ad esempio, supponiamo che esistano due stringhe, 1101 1001 e 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Dato che contiene due 1, la distanza HAMMING, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity​" class="common-anchor-header">Similitudine BM25<button data-href="#BM25-similarity​" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 è un metodo di misurazione della rilevanza del testo ampiamente utilizzato, progettato specificamente per la <a href="/docs/it/full-text-search.md">ricerca di testi completi</a>. Combina i seguenti tre fattori chiave.</p>
<ul>
<li><p><strong>Frequenza dei termini (TF):</strong> Misura la frequenza con cui un termine appare in un documento. Sebbene frequenze più elevate indichino spesso una maggiore importanza, BM25 utilizza il parametro di saturazione k1 per evitare che termini troppo frequenti dominino il punteggio di rilevanza.</p></li>
<li><p><strong>Frequenza inversa del documento (IDF):</strong> Riflette l'importanza di un termine nell'intero corpus. I termini che compaiono in un minor numero di documenti ricevono un valore IDF più alto, indicando un maggiore contributo alla rilevanza.</p></li>
<li><p><strong> <strong>Normalizzazione</strong> della lunghezza del documento:</strong> I documenti più lunghi tendono a ottenere un punteggio più alto perché contengono più termini. BM25 attenua questa distorsione normalizzando la lunghezza dei documenti, con il parametro b che controlla la forza di questa normalizzazione.</p></li>
</ul>
<p>Il punteggio di BM25 è calcolato come segue.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bm25.png" alt="BM25 similarity formula" class="doc-image" id="bm25-similarity-formula" />
   </span> <span class="img-wrapper"> <span>Formula di somiglianza BM25</span> </span></p>
<p>Descrizione dei parametri.</p>
<ul>
<li><p><code translate="no">​Q</code>: Il testo della query fornito dall'utente.</p></li>
<li><p><code translate="no">​D</code>: Il documento da valutare.</p></li>
<li><p><code translate="no">​TF(qi​,D)</code>: Frequenza del termine, che rappresenta la frequenza con cui il termine qiappare nel documento D.</p></li>
<li><p><code translate="no">​IDF(qi​)</code>: Frequenza inversa del documento, calcolata come.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/idf.png" alt="IDF formula" class="doc-image" id="idf-formula" />
   </span> <span class="img-wrapper"> <span>Formula IDF</span> </span></p>
<p>dove <code translate="no">​N</code> è il numero totale di documenti del corpus e <code translate="no">​n(qi​)</code> è il numero di documenti contenenti il termine qi.</p></li>
<li><p><code translate="no">​∣D∣</code>: Lunghezza del documento <code translate="no">​D</code> (numero totale di termini).</p></li>
<li><p><code translate="no">​avgdl</code>: Lunghezza media di tutti i documenti del corpus.</p></li>
<li><p><code translate="no">​k1​</code>: Controlla l'influenza della frequenza dei termini sul punteggio. Valori più alti aumentano l'importanza della frequenza dei termini. L'intervallo tipico è [1,2, 2,0], mentre Milvus consente un intervallo di [0, 3].</p></li>
<li><p><code translate="no">​b</code>: Controlla il grado di normalizzazione della lunghezza, che va da 0 a 1. Quando il valore è 0, non viene applicata alcuna normalizzazione; quando il valore è 1, viene applicata una normalizzazione completa.</p></li>
</ul>
<p></p>
