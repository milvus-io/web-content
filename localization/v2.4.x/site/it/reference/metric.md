---
id: metric.md
summary: >-
  Milvus supporta diverse metriche di similarità, tra cui la distanza euclidea,
  il prodotto interno, Jaccard, ecc.
title: Metriche di somiglianza
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Metriche di somiglianza<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, le metriche di somiglianza sono utilizzate per misurare le somiglianze tra i vettori. La scelta di una buona metrica di distanza aiuta a migliorare notevolmente le prestazioni di classificazione e clusterizzazione.</p>
<p>La tabella seguente mostra come le metriche di somiglianza più diffuse si adattano a varie forme di dati di input e agli indici di Milvus. Attualmente Milvus supporta vari tipi di dati, tra cui embeddings in virgola mobile (spesso noti come vettori in virgola mobile o vettori densi), embeddings binari (noti anche come vettori binari) e embeddings sparsi (noti anche come vettori sparsi).</p>
<div class="filter">
 <a href="#floating">Incorporazioni in virgola mobile</a> <a href="#binary">Incorporazioni binarie</a> <a href="#sparse">Incorporazioni rade</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipi di metriche</th>
    <th class="tg-0pky">Tipi di indice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Distanza euclidea (L2)</li><li>Prodotto interno (IP)</li><li>Somiglianza coseno (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>PIATTO</li><li>IVF_FLAT</li><li>FIV_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipi di metriche</th>
    <th class="tg-0pky">Tipi di indice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipi metrici</th>
    <th class="tg-0pky">Tipi di indice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>INDICE SPARSE_INVERTITO</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Distanza euclidea (L2)</h3><p>Essenzialmente, la distanza euclidea misura la lunghezza di un segmento che collega 2 punti.</p>
<p>La formula della distanza euclidea è la seguente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>euclidea</span> </span></p>
<p>dove <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>) e <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>,..., <sub>bn-1</sub>) sono due punti nello spazio euclideo n-dimensionale.</p>
<p>È la metrica di distanza più utilizzata ed è molto utile quando i dati sono continui.</p>
<div class="alert note">
Milvus calcola il valore prima di applicare la radice quadrata solo quando la distanza euclidea è scelta come metrica di distanza.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Prodotto interno (IP)</h3><p>La distanza IP tra due incorporazioni vettoriali è definita come segue:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>ip</span> </span></p>
<p>L'IP è più utile se si devono confrontare dati non normalizzati o se si tiene conto della magnitudine e dell'angolo.</p>
<div class="alert note">
<p>Se si applica la metrica di distanza IP alle incorporazioni normalizzate, il risultato sarà equivalente al calcolo della somiglianza del coseno tra le incorporazioni.</p>
</div>
<p>Supponiamo che X' sia normalizzato dall'incorporamento X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normalizzare</span> </span></p>
<p>La correlazione tra le due incorporazioni è la seguente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>normalizzazione</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Somiglianza coseno</h3><p>La somiglianza coseno utilizza il coseno dell'angolo tra due insiemi di vettori per misurare la loro somiglianza. Si può pensare ai due insiemi di vettori come a due segmenti di linea che partono dalla stessa origine ([0,0,...]) ma puntano in direzioni diverse.</p>
<p>Per calcolare la somiglianza del coseno tra due insiemi di vettori <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utilizzare la seguente formula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>coseno_similarità</span> </span></p>
<p>La somiglianza del coseno è sempre nell'intervallo <strong>[-1, 1]</strong>. Ad esempio, due vettori proporzionali hanno una somiglianza di coseno pari a <strong>1</strong>, due vettori ortogonali hanno una somiglianza pari a <strong>0</strong> e due vettori opposti hanno una somiglianza pari a <strong>-1</strong>. Più grande è il coseno, minore è l'angolo tra due vettori, il che indica che questi due vettori sono più simili tra loro.</p>
<p>Sottraendo la somiglianza del coseno da 1, si ottiene la distanza del coseno tra due vettori.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Distanza di Jaccard</h3><p>Il coefficiente di somiglianza di Jaccard misura la somiglianza tra due insiemi di campioni ed è definito come la cardinalità dell'intersezione degli insiemi definiti divisa per la cardinalità dell'unione degli stessi. Può essere applicato solo a insiemi di campioni finiti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Coefficiente di somiglianza di Jaccard</span> </span></p>
<p>La distanza di Jaccard misura la dissimilarità tra gli insiemi di dati e si ottiene sottraendo il coefficiente di somiglianza di Jaccard da 1. Per le variabili binarie, la distanza di Jaccard è equivalente al coefficiente di Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Distanza di Jaccard</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">Distanza di Hamming</h3><p>La distanza di Hamming misura le stringhe di dati binari. La distanza tra due stringhe di uguale lunghezza è il numero di posizioni di bit in cui i bit sono diversi.</p>
<p>Ad esempio, supponiamo che esistano due stringhe, 1101 1001 e 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Poiché questa contiene due 1, la distanza di Hamming, d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Somiglianza strutturale</h3><p>Quando una struttura chimica si presenta come parte di una struttura chimica più grande, la prima viene chiamata sottostruttura e la seconda sovrastruttura. Ad esempio, l'etanolo è una sottostruttura dell'acido acetico e l'acido acetico è una sovrastruttura dell'etanolo.</p>
<p>La somiglianza strutturale viene utilizzata per determinare se due formule chimiche sono simili tra loro nel senso che una è la sovrastruttura o la sottostruttura dell'altra.</p>
<p>Per determinare se A è una sovrastruttura di B, utilizzare la seguente formula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>sovrastruttura</span> </span></p>
<p>Dove:</p>
<ul>
<li>A è la rappresentazione binaria di una formula chimica da recuperare</li>
<li>B è la rappresentazione binaria di una formula chimica presente nel database.</li>
</ul>
<p>Se restituisce <code translate="no">0</code>, <strong>A</strong> non è una sovrastruttura di <strong>B</strong>. Altrimenti, il risultato è opposto.</p>
<p>Per determinare se A è una sottostruttura di B, utilizzare la seguente formula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>sottostruttura</span> </span></p>
<p>Dove:</p>
<ul>
<li>A è la rappresentazione binaria di una formula chimica da recuperare</li>
<li>B è la rappresentazione binaria di una formula chimica nel database.</li>
</ul>
<p>Se la formula restituisce <code translate="no">0</code>, <strong>A</strong> non è una sottostruttura di <strong>B</strong>. Altrimenti, il risultato è il contrario.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<summary><font color="#4fc4f9">Perché il risultato top1 di una ricerca vettoriale non è il vettore di ricerca stesso, se il tipo di metrica è il prodotto interno?</font></summary>Questo accade se non si sono normalizzati i vettori quando si usa il prodotto interno come metrica di distanza.</details>
<details>
<summary><font color="#4fc4f9">Che cos'è la normalizzazione? Perché è necessaria la normalizzazione?</font></summary></p>
<p>La normalizzazione si riferisce al processo di conversione di un incorporamento (vettore) in modo che la sua norma sia uguale a 1. Se si utilizza il prodotto interno per calcolare le somiglianze tra gli incorporamenti, è necessario normalizzare gli incorporamenti. Dopo la normalizzazione, il prodotto interno è uguale alla somiglianza del coseno.</p>
<p>
Per ulteriori informazioni, consultare <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a>.</p>
</details>
<details>
<summary><font color="#4fc4f9">Perché si ottengono risultati diversi utilizzando la distanza euclidea (L2) e il prodotto interno (IP) come metrica di distanza?</font></summary>Controllare se i vettori sono normalizzati. In caso contrario, è necessario normalizzare prima i vettori. In teoria, le somiglianze elaborate con L2 sono diverse da quelle elaborate con IP, se i vettori non sono normalizzati.</details>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Per saperne di più sui <a href="/docs/it/v2.4.x/index.md">tipi di indice</a> supportati in Milvus.</li>
</ul>
