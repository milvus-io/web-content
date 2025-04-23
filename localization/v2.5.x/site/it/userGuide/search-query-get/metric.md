---
id: metric.md
title: Tipi di metriche
summary: >-
  Le metriche di somiglianza vengono utilizzate per misurare le somiglianze tra
  i vettori. La scelta di una metrica di distanza appropriata aiuta a migliorare
  significativamente le prestazioni di classificazione e clustering.
---
<h1 id="Metric-Types" class="common-anchor-header">Tipi di metriche<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>Le metriche di somiglianza sono utilizzate per misurare le somiglianze tra vettori. La scelta di una metrica di distanza appropriata aiuta a migliorare notevolmente le prestazioni di classificazione e clustering.</p>
<p>Attualmente, Milvus supporta questi tipi di metriche di somiglianza: Distanza euclidea (<code translate="no">L2</code>), Prodotto interno (<code translate="no">IP</code>), Somiglianza coseno (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code> e <code translate="no">BM25</code> (specificamente progettato per la ricerca full text su vettori sparsi).</p>
<p>La tabella seguente riassume la mappatura tra i diversi tipi di campo e i corrispondenti tipi di metrica.</p>
<table>
   <tr>
     <th><p>Tipo di campo</p></th>
     <th><p>Intervallo di dimensione</p></th>
     <th><p>Tipi di metrica supportati</p></th>
     <th><p>Tipo di metrica predefinito</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>Non è necessario specificare la dimensione.</p></td>
     <td><p><code translate="no">IP</code>, <code translate="no">BM25</code> (utilizzato solo per la ricerca full text)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Per i campi vettoriali del tipo <code translate="no">SPARSE\_FLOAT\_VECTOR</code>, utilizzare il tipo di metrica <code translate="no">BM25</code> solo quando si esegue la ricerca full text. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p></li>
<li><p>Per i campi vettoriali del tipo <code translate="no">BINARY_VECTOR</code>, il valore della dimensione (<code translate="no">dim</code>) deve essere un multiplo di 8.</p></li>
</ul>
</div>
<p>La tabella seguente riassume le caratteristiche dei valori della distanza di similarità di tutti i tipi di metrica supportati e il loro intervallo di valori.</p>
<table>
   <tr>
     <th><p>Tipo di metrica</p></th>
     <th><p>Caratteristiche dei valori della distanza di similarità</p></th>
     <th><p>Intervallo dei valori della distanza di similarità</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Un valore minore indica una maggiore somiglianza.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Un valore maggiore indica una maggiore somiglianza.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Un valore maggiore indica una maggiore somiglianza.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Un valore minore indica una maggiore somiglianza.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Un valore minore indica una maggiore somiglianza.</p></td>
     <td><p>[0, dim(vettore)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Attribuisce un punteggio alla rilevanza in base alla frequenza dei termini, alla frequenza inversa dei documenti e alla normalizzazione dei documenti.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Distanza euclidea (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>Essenzialmente, la distanza euclidea misura la lunghezza di un segmento che collega 2 punti.</p>
<p>La formula della distanza euclidea è la seguente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>Metrica euclidea</span> </span></p>
<p>dove <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> sono due punti nello spazio euclideo n-dimensionale.</p>
<p>È la metrica di distanza più utilizzata ed è molto utile quando i dati sono continui.</p>
<div class="alert note">
<p>Milvus calcola il valore prima di applicare la radice quadrata solo quando la distanza euclidea è scelta come metrica di distanza.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Prodotto interno (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>La distanza IP tra due incorporazioni è definita come segue:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>Formula IP</span> </span></p>
<p>L'IP è più utile se si devono confrontare dati non normalizzati o se si tiene conto della grandezza e dell'angolo.</p>
<div class="alert note">
<p>Se si usa l'IP per calcolare le somiglianze tra embeddings, è necessario normalizzare le embeddings. Dopo la normalizzazione, il prodotto interno equivale alla somiglianza del coseno.</p>
</div>
<p>Supponiamo che X' sia normalizzato dall'incorporamento X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>Formula di normalizzazione</span> </span></p>
<p>La correlazione tra le due incorporazioni è la seguente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Correlazione tra le incorporazioni</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">Somiglianza coseno<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
<p>Per calcolare la somiglianza del coseno tra due insiemi di vettori <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utilizzare la seguente formula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>Similitudine del coseno</span> </span></p>
<p>La somiglianza del coseno è sempre nell'intervallo <strong>[-1, 1]</strong>. Ad esempio, due vettori proporzionali hanno una somiglianza di coseno pari a <strong>1</strong>, due vettori ortogonali hanno una somiglianza pari a <strong>0</strong> e due vettori opposti hanno una somiglianza pari a <strong>-1</strong>. Più grande è il coseno, minore è l'angolo tra i due vettori, il che indica che questi due vettori sono più simili tra loro.</p>
<p>Sottraendo la somiglianza del coseno da 1, si ottiene la distanza del coseno tra due vettori.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">Distanza JACCARD<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Formula del coefficiente di somiglianza JACCARD</span> </span></p>
<p>La distanza JACCARD misura la dissimilarità tra gli insiemi di dati e si ottiene sottraendo il coefficiente di somiglianza JACCARD da 1. Per le variabili binarie, la distanza JACCARD è equivalente al coefficiente Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>Formula della distanza JACCARD</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">Distanza HAMMING<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
<p>11011001 ⊕ 10011101 = 01000100. Poiché contiene due 1, la distanza di HAMMING, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">Similitudine BM25<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>Il BM25 è un metodo di misurazione della rilevanza del testo ampiamente utilizzato, progettato specificamente per la <a href="/docs/it/full-text-search.md">ricerca di testi completi</a>. Combina i seguenti tre fattori chiave:</p>
<ul>
<li><p><strong>Frequenza dei termini (TF):</strong> Misura la frequenza con cui un termine appare in un documento. Sebbene frequenze più elevate indichino spesso una maggiore importanza, BM25 utilizza il parametro di saturazione k_1 per evitare che termini troppo frequenti dominino il punteggio di rilevanza.</p></li>
<li><p><strong>Frequenza inversa del documento (IDF):</strong> Riflette l'importanza di un termine nell'intero corpus. I termini che compaiono in un minor numero di documenti ricevono un valore IDF più alto, indicando un maggiore contributo alla rilevanza.</p></li>
<li><p><strong>Normalizzazione della lunghezza del documento:</strong> I documenti più lunghi tendono a ottenere un punteggio più alto perché contengono più termini. BM25 attenua questa distorsione normalizzando la lunghezza dei documenti, con il parametro b che controlla la forza di questa normalizzazione.</p></li>
</ul>
<p>Il punteggio di BM25 è calcolato come segue:</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>Descrizione del parametro:</p>
<ul>
<li><p>Q: Il testo dell'interrogazione fornito dall'utente.</p></li>
<li><p>D: Il documento da valutare.</p></li>
<li><p>TF(q_i, D): Frequenza dei termini, che rappresenta la frequenza con cui il termine q_i compare nel documento D.</p></li>
<li><p>IDF(q_i): Frequenza inversa del documento, calcolata come:</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</p>
<p>dove N è il numero totale di documenti nel corpus e n(q_i) è il numero di documenti contenenti il termine q_i.</p></li>
<li><p>|D|: Lunghezza del documento D (numero totale di termini).</p></li>
<li><p>avgdl: Lunghezza media di tutti i documenti del corpus.</p></li>
<li><p>k_1: Controlla l'influenza della frequenza dei termini sul punteggio. Valori più alti aumentano l'importanza della frequenza dei termini. L'intervallo tipico è [1,2, 2,0], mentre Milvus consente un intervallo di [0, 3].</p></li>
<li><p>b: Controlla il grado di normalizzazione della lunghezza, che va da 0 a 1. Quando il valore è 0, non viene applicata alcuna normalizzazione; quando il valore è 1, viene applicata una normalizzazione completa.</p></li>
</ul>
