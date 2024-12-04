---
id: metric.md
summary: >-
  Ähnlichkeitsmetriken werden verwendet, um Ähnlichkeiten zwischen Vektoren zu
  messen. Die Wahl einer geeigneten Abstandsmetrik trägt dazu bei, die
  Klassifizierungs- und Clustering-Leistung erheblich zu verbessern.
title: Metrische Typen
---
<h1 id="Metric-Types​" class="common-anchor-header">Metrik-Typen<button data-href="#Metric-Types​" class="anchor-icon" translate="no">
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
    </button></h1><p>Ähnlichkeitsmetriken werden verwendet, um Ähnlichkeiten zwischen Vektoren zu messen. Durch die Wahl einer geeigneten Distanzmetrik kann die Klassifizierungs- und Clustering-Leistung erheblich verbessert werden.</p>
<p>Derzeit unterstützt Milvus die folgenden Arten von Ähnlichkeitsmetriken: Euklidischer Abstand (<code translate="no">L2</code>), Inneres Produkt (<code translate="no">IP</code>), Kosinusähnlichkeit (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code> und <code translate="no">BM25</code> (speziell für die Volltextsuche in spärlichen Vektoren).</p>
<p>Die folgende Tabelle fasst die Zuordnung zwischen verschiedenen Feldtypen und den entsprechenden metrischen Typen zusammen.</p>
<table data-block-token="LHu5dKCHro3mnTx6PsmckEsinQd"><thead><tr><th data-block-token="JOJvdTK9MouhT8x7tfGc59NGnfg" colspan="1" rowspan="1"><p data-block-token="TS9tdnaJaoG4kfx96cfcqXINnnc">Feldtyp</p>
</th><th data-block-token="Iy8ZdPGpIo6nfwxiz4RcSuwanwf" colspan="1" rowspan="1"><p data-block-token="SKIAdxDFJo9oOyxg7iTcmfGAnz1">Dimension Bereich</p>
</th><th data-block-token="LkYndBOhGotOkGxsog2ciFTSnKd" colspan="1" rowspan="1"><p data-block-token="Nzcsdqt2WoZ4R5xQMT2cD0PQnAh">Unterstützte metrische Typen</p>
</th><th data-block-token="Hw3WdXW8UoXmZhxNbTRcMGkjnLb" colspan="1" rowspan="1"><p data-block-token="NEB5drrS2o46Z1xvxNxcfYqsnyc">Standard-Metrik-Typ</p>
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
</td><td data-block-token="Swg5dVhAboemtgx5lDKcYKBSnFb" colspan="1" rowspan="1"><p data-block-token="NqC6dpCgooBUS9xqTlJcUnwbnUc">Die Angabe der Dimension ist nicht erforderlich.</p>
</td><td data-block-token="Kh3vdZtdoo4ebbxhpl6cYdcZnZc" colspan="1" rowspan="1"><p data-block-token="VwY7dNaLhowsXOxhPN5cMg8ln3d"><code translate="no">IP</code> <code translate="no">BM25</code> (wird nur für die Volltextsuche verwendet)</p>
</td><td data-block-token="RZWudPDO8oGzo9xrouncv8PXnch" colspan="1" rowspan="1"><p data-block-token="MrWddDR0soeonBxXTQAcY9G5nph"><code translate="no">IP</code></p>
</td></tr><tr><td data-block-token="Qh9YdBV0yocP8Ux1GZzctRcinwh" colspan="1" rowspan="1"><p data-block-token="BP0ddwawMoxoF9xKhBjcNH4jnPr"><code translate="no">BINARY_VECTOR</code></p>
</td><td data-block-token="RnLodmlT3oe8tgxFrPrcqPD6nEb" colspan="1" rowspan="1"><p data-block-token="CFw8dmfgcoubhZxpxB7cLlp6ntb">8-32,768*8</p>
<p data-block-token="ETORduKnPojEq3xweqhc4fBJnkd"></p>
</td><td data-block-token="H5jdd6wKZofy9zxiu88cMrLVn5d" colspan="1" rowspan="1"><p data-block-token="OQDIdyEtKo1dArxPWdEcdX1znZd"><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p>
</td><td data-block-token="QJBadzeQRox54VxflTLcYRO5nsj" colspan="1" rowspan="1"><p data-block-token="CYUNdJmCCoqr0ux0qF5cFLlRnWf"><code translate="no">HAMMING</code></p>
</td></tr></tbody></table>
<div class="alert note">
<ul>
<li><p>Verwenden Sie für Vektorfelder vom Typ <code translate="no">SPARSE_FLOAT_VECTOR</code> nur den metrischen Typ <code translate="no">BM25</code>, wenn Sie eine Volltextsuche durchführen. Weitere Informationen finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p></li>
<li><p>Bei Vektorfeldern des Typs <code translate="no">BINARY_VECTOR</code> muss der Dimensionswert (<code translate="no">dim</code>) ein Vielfaches von 8 sein. </p></li>
</ul>
</div>
<p>Die nachstehende Tabelle fasst die Eigenschaften der Ähnlichkeitsabstandswerte aller unterstützten metrischen Typen und ihren Wertebereich zusammen.</p>
<table data-block-token="EOgLdu5WdoBkLqxmYIfcYGkinLd"><thead><tr><th data-block-token="NQdRdW2N9oqzaox1LHdcqs62n2f" colspan="1" rowspan="1"><p data-block-token="Roy2d7WW8oQyy1x21MUc4xbfnyf">Metrischer Typ</p>
</th><th data-block-token="UgmddW6X6oP1S0xFq3QcPtUznYf" colspan="1" rowspan="1"><p data-block-token="Or5LdW0KPodlWixinL6cWsJ4nTd">Merkmale der Werte für den Ähnlichkeitsabstand</p>
</th><th data-block-token="A6aTdLiwpoZiTOxOKDKcUV3Ynpe" colspan="1" rowspan="1"><p data-block-token="NZAWdu38do5mYUxFV2ac4woBnLh">Ähnlichkeitsabstand Wertebereich</p>
</th></tr></thead><tbody><tr><td data-block-token="WueMdzdxZoPUMaxYFXccfNq3nQc" colspan="1" rowspan="1"><p data-block-token="JZA4dYZYtoqYXZxXskKcm0bSnrc"><code translate="no">L2</code></p>
</td><td data-block-token="U4sEdyrLPo11oxxeK1OcsAYGnMc" colspan="1" rowspan="1"><p data-block-token="GYLzdsePwohWbzxQu9ecqLswnqc">Ein kleinerer Wert zeigt eine größere Ähnlichkeit an.</p>
</td><td data-block-token="NuIIdRT0Vo0ReDx4YxCcrSr1nvg" colspan="1" rowspan="1"><p data-block-token="UmPHdRRIYokZGPxobbZc3gG0nZe">[0, ∞)</p>
</td></tr><tr><td data-block-token="VZPGde4XnokxQWxwZkXcbj4pnnh" colspan="1" rowspan="1"><p data-block-token="YKbidfE52o82EyxLTxPcsYyWn7c"><code translate="no">IP</code></p>
</td><td data-block-token="FLsidgKBYoYSIPxLL6hceY6Unug" colspan="1" rowspan="1"><p data-block-token="P209de8x5oXJ6XxlZxPcA0o6n8d">Ein größerer Wert weist auf eine größere Ähnlichkeit hin.</p>
</td><td data-block-token="Eqg9d7C9CodcAbxKTH8cFl01nbe" colspan="1" rowspan="1"><p data-block-token="T4dRd7qEmoRCmFxlIpkcwXg3nLf">[-1, 1]</p>
</td></tr><tr><td data-block-token="O999dQ01qoPM8axWJEIcQ7fAnlh" colspan="1" rowspan="1"><p data-block-token="KkA6dbEEMowdOaxqtsMcz4sInQd"><code translate="no">COSINE</code></p>
</td><td data-block-token="UxNzdl0UboEmoqx85QIcbJWxncb" colspan="1" rowspan="1"><p data-block-token="FqPRdMe3uoZIbVxopxkcVIy2nef">Ein größerer Wert bedeutet eine größere Ähnlichkeit.</p>
</td><td data-block-token="RUo6dZMMooT6PHxaG7LcCHfhnHh" colspan="1" rowspan="1"><p data-block-token="GfXAduI1KoPjPSxfKslcf7jJnDY">[-1, 1]</p>
</td></tr><tr><td data-block-token="ZvJ8dlR2coPDm6x5MHkcxHLQnPe" colspan="1" rowspan="1"><p data-block-token="KARBdYWDmovd7SxYV1vcEUNAn7F"><code translate="no">JACCARD</code></p>
</td><td data-block-token="Aq8Cd7Awao5IhExSnUjcUzRxndh" colspan="1" rowspan="1"><p data-block-token="AMbXd3nwLoHalMx3h0pc63i9nNg">Ein kleinerer Wert weist auf eine größere Ähnlichkeit hin.</p>
</td><td data-block-token="ULaFdvx0WoKy4rxBgPzciLZMnFg" colspan="1" rowspan="1"><p data-block-token="Je5xdsfnvoQli3xdODDchYMkn2e">[0, 1]</p>
</td></tr><tr><td data-block-token="L5l6dqaAVoVpSJxFW5TcZlXLnAc" colspan="1" rowspan="1"><p data-block-token="JOcmdIWTUoZuoGxoToYcMLpLnMg"><code translate="no">HAMMING</code></p>
</td><td data-block-token="H3vYdaah4oWsXmxmABOcW01XnSh" colspan="1" rowspan="1"><p data-block-token="VHz5d7R91o3OGuxX39Bc76CTnGf">Ein kleinerer Wert bedeutet eine größere Ähnlichkeit.</p>
</td><td data-block-token="NZnwdhAGUoO0R9x9gz6cZfCYnOd" colspan="1" rowspan="1"><p data-block-token="Xk7wdBDlko6RjFxVnATcPYTjnsb">[0, dim(vector)]</p>
</td></tr><tr><td data-block-token="Xm5BdUTvXoPS1Xxtc26cBqAWn9e" colspan="1" rowspan="1"><p data-block-token="FoMadsBCboAKV2xofQ2c9IiKntb"><code translate="no">BM25</code></p>
</td><td data-block-token="OHEldDxlaoejYmxXgUPcbwCYn4b" colspan="1" rowspan="1"><p data-block-token="EVzLdJPQdopf2mxZ3dfcTGSgnSc">Bewertung der Relevanz auf der Grundlage der Termhäufigkeit, der invertierten Dokumenthäufigkeit und der Dokumentnormalisierung.</p>
</td><td data-block-token="KNCEd8WTioQbwnxmHzNcpHkHnzf" colspan="1" rowspan="1"><p data-block-token="RVtVda2Ozo1N5ixO0oucju5FnWh">[0, ∞)</p>
<p data-block-token="MQ5RdcTC1oIZC5x4d7xc2M56nId"></p>
</td></tr></tbody></table>
<h2 id="Euclidean-distance-L2​" class="common-anchor-header">Euklidischer Abstand (L2)<button data-href="#Euclidean-distance-L2​" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Wesentlichen misst der euklidische Abstand die Länge eines Segments, das 2 Punkte miteinander verbindet.</p>
<p>Die Formel für den euklidischen Abstand lautet wie folgt.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean_metric.png" alt="Euclidean distance formula" class="doc-image" id="euclidean-distance-formula" />
   </span> <span class="img-wrapper"> <span>Euklidische Abstandsformel</span> </span></p>
<p>wobei <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> und <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> zwei Punkte im n-dimensionalen euklidischen Raum sind.</p>
<p>Es ist die am häufigsten verwendete Abstandsmetrik und ist sehr nützlich, wenn die Daten kontinuierlich sind.</p>
<div class="alert note">
<p>Milvus berechnet nur dann den Wert vor der Anwendung der Quadratwurzel, wenn der euklidische Abstand als Abstandsmetrik gewählt wurde.</p>
</div>
<h2 id="Inner-product-IP​" class="common-anchor-header">Inneres Produkt (IP)<button data-href="#Inner-product-IP​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der IP-Abstand zwischen zwei Einbettungen ist wie folgt definiert.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP_formula.png" alt="Inner product formula" class="doc-image" id="inner-product-formula" />
   </span> <span class="img-wrapper"> <span>Formel für das innere Produkt</span> </span></p>
<p>IP ist nützlicher, wenn Sie nicht-normalisierte Daten vergleichen müssen oder wenn Sie sich für die Größe und den Winkel interessieren.</p>
<div class="alert note">
<p>Wenn Sie IP zur Berechnung von Ähnlichkeiten zwischen Einbettungen verwenden, müssen Sie Ihre Einbettungen normalisieren. Nach der Normalisierung entspricht das innere Produkt der Kosinusähnlichkeit.</p>
</div>
<p>Angenommen, X' ist von der Einbettung X normalisiert.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize_formula.png" alt="Normalized inner product formula" class="doc-image" id="normalized-inner-product-formula" />
   </span> <span class="img-wrapper"> <span>Formel für das normalisierte innere Produkt</span> </span></p>
<p>Die Korrelation zwischen den beiden Einbettungen ist wie folgt.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalization_formula.png" alt="Correlation between embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Korrelation zwischen Einbettungen</span> </span></p>
<h2 id="Cosine-similarity-​" class="common-anchor-header">Kosinus-Ähnlichkeit<button data-href="#Cosine-similarity-​" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Cosinus-Ähnlichkeit verwendet den Cosinus des Winkels zwischen zwei Vektorsätzen, um zu messen, wie ähnlich sie sich sind. Man kann sich die beiden Vektorsätze als Liniensegmente vorstellen, die vom gleichen Punkt ausgehen, z. B. [0,0,...], aber in unterschiedliche Richtungen zeigen.</p>
<p>Um die Cosinus-Ähnlichkeit zwischen zwei Gruppen von Vektoren <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> und <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> zu berechnen, verwenden Sie die folgende Formel.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine_similarity.png" alt="Cosine similarity formula" class="doc-image" id="cosine-similarity-formula" />
   </span> <span class="img-wrapper"> <span>Kosinus-Ähnlichkeitsformel</span> </span></p>
<p>Die Kosinusähnlichkeit liegt immer im Intervall <strong>[-1, 1]</strong>. Zwei proportionale Vektoren haben beispielsweise eine Cosinus-Ähnlichkeit von <strong>1</strong>, zwei orthogonale Vektoren haben eine Ähnlichkeit von <strong>0</strong> und zwei entgegengesetzte Vektoren haben eine Ähnlichkeit von <strong>-1</strong>. Je größer der Cosinus, desto kleiner ist der Winkel zwischen den beiden Vektoren, was bedeutet, dass diese beiden Vektoren einander ähnlicher sind.</p>
<p>Wenn man die Kosinusähnlichkeit von 1 subtrahiert, erhält man den Kosinusabstand zwischen zwei Vektoren.</p>
<h2 id="JACCARD-distance​" class="common-anchor-header">JACCARD-Abstand<button data-href="#JACCARD-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der JACCARD-Ähnlichkeitskoeffizient misst die Ähnlichkeit zwischen zwei Stichprobenmengen und ist definiert als die Kardinalität der Schnittmenge der definierten Mengen geteilt durch die Kardinalität der Vereinigung dieser Mengen. Er kann nur auf endliche Stichprobenmengen angewendet werden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/jaccard_coeff.png" alt="JACCARD similarity coefficient formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Formel für den JACCARD-Ähnlichkeitskoeffizienten</span> </span></p>
<p>Die JACCARD-Distanz misst die Unähnlichkeit zwischen Datensätzen und ergibt sich durch Subtraktion des JACCARD-Ähnlichkeitskoeffizienten von 1. Für binäre Variablen entspricht die JACCARD-Distanz dem Tanimoto-Koeffizienten.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/jaccard_dist.png" alt="JACCARD distance formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD-Abstandsformel</span> </span></p>
<h2 id="HAMMING-distance​" class="common-anchor-header">HAMMING-Abstand<button data-href="#HAMMING-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>Die HAMMING-Distanz misst binäre Datenstrings. Der Abstand zwischen zwei Zeichenfolgen gleicher Länge ist die Anzahl der Bitpositionen, an denen die Bits unterschiedlich sind.</p>
<p>Nehmen wir zum Beispiel an, es gibt zwei Zeichenketten, 1101 1001 und 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Da dies zwei 1en enthält, ist der HAMMING-Abstand, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity​" class="common-anchor-header">BM25-Ähnlichkeit<button data-href="#BM25-similarity​" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 ist eine weit verbreitete Methode zur Messung der Textrelevanz, die speziell für die <a href="/docs/de/full-text-search.md">Volltextsuche</a> entwickelt wurde. Sie kombiniert die folgenden drei Schlüsselfaktoren.</p>
<ul>
<li><p><strong>Termfrequenz (TF):</strong> Misst, wie häufig ein Begriff in einem Dokument vorkommt. Während höhere Häufigkeiten oft eine größere Bedeutung anzeigen, verwendet BM25 den Sättigungsparameter k1, um zu verhindern, dass zu häufige Begriffe die Relevanzbewertung dominieren.</p></li>
<li><p><strong>Umgekehrte Dokumenthäufigkeit (IDF):</strong> Spiegelt die Bedeutung eines Begriffs im gesamten Korpus wider. Begriffe, die in weniger Dokumenten vorkommen, erhalten einen höheren IDF-Wert, was auf einen größeren Beitrag zur Relevanz hinweist.</p></li>
<li><p><strong> <strong>Normalisierung</strong> der Dokumentlänge:</strong> Längere Dokumente werden tendenziell höher bewertet, da sie mehr Begriffe enthalten. BM25 mildert diese Verzerrung durch Normalisierung der Dokumentlängen, wobei der Parameter b die Stärke dieser Normalisierung steuert.</p></li>
</ul>
<p>Die BM25-Bewertung wird wie folgt berechnet.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/bm25.png" alt="BM25 similarity formula" class="doc-image" id="bm25-similarity-formula" />
   </span> <span class="img-wrapper"> <span>BM25 Ähnlichkeitsformel</span> </span></p>
<p>Beschreibung der Parameter.</p>
<ul>
<li><p><code translate="no">​Q</code>: Der vom Benutzer angegebene Suchtext.</p></li>
<li><p><code translate="no">​D</code>: Das zu bewertende Dokument.</p></li>
<li><p><code translate="no">​TF(qi​,D)</code>: Begriffshäufigkeit, die angibt, wie oft der Begriff <code translate="no">​qi</code> im Dokument <code translate="no">​D</code> vorkommt.</p></li>
<li><p><code translate="no">​IDF(qi​)</code>: Inverse Dokumenthäufigkeit, berechnet als.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/idf.png" alt="IDF formula" class="doc-image" id="idf-formula" />
   </span> <span class="img-wrapper"> <span>IDF-Formel</span> </span></p>
<p>wobei <code translate="no">​N</code> die Gesamtzahl der Dokumente im Korpus und <code translate="no">​n(qi​)</code> die Anzahl der Dokumente ist, die den Begriff qi enthalten.</p></li>
<li><p><code translate="no">​∣D∣</code>: Länge des Dokuments <code translate="no">​D</code> (Gesamtzahl der Begriffe).</p></li>
<li><p><code translate="no">​avgdl</code>: Durchschnittliche Länge aller Dokumente im Korpus.</p></li>
<li><p><code translate="no">​k1​</code>: Steuert den Einfluss der Termhäufigkeit auf das Ergebnis. Höhere Werte erhöhen die Bedeutung der Termhäufigkeit. Der typische Bereich ist [1.2, 2.0], während Milvus einen Bereich von [0, 3] zulässt.</p></li>
<li><p><code translate="no">​b</code>: Steuert den Grad der Längennormalisierung und reicht von 0 bis 1. Bei einem Wert von 0 wird keine Normalisierung vorgenommen; bei einem Wert von 1 wird eine vollständige Normalisierung vorgenommen.</p></li>
</ul>
<p></p>
