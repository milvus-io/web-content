---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  Utilizzare gli indici LSH MinHash per velocizzare il rilevamento dei
  quasi-duplicati e la ricerca della similarità di Jaccard su grandi set di dati
  testuali.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>La deduplicazione efficiente e la ricerca per somiglianza sono fondamentali per i set di dati di machine learning su larga scala, in particolare per attività quali la pulizia dei corpora di addestramento per i modelli linguistici di grandi dimensioni (LLM). Quando si ha a che fare con milioni o miliardi di documenti, la corrispondenza esatta tradizionale diventa troppo lenta e costosa.</p>
<p>L’indice <strong>MINHASH_LSH</strong> di Milvus consente una deduplicazione approssimativa veloce, scalabile e accurata, combinando due potenti tecniche:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: genera rapidamente firme compatte (o “impronte digitali”) per stimare la somiglianza dei documenti.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-Sensitive Hashing (LSH)</a>: individua rapidamente gruppi di documenti simili in base alle loro firme MinHash.</p></li>
</ul>
<p>Questa guida illustra i concetti, i prerequisiti, la configurazione e le migliori pratiche per l’utilizzo di MINHASH_LSH in Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Somiglianza di Jaccard<button data-href="#Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>La somiglianza di Jaccard misura la sovrapposizione tra due insiemi A e B, formalmente definita come:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0962em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Dove il suo valore varia da 0 (completamente disgiunti) a 1 (identici).</p>
<p>Tuttavia, il calcolo esatto della similarità di Jaccard tra tutte le coppie di documenti in set di dati su larga scala è computazionalmente oneroso:<strong>O(n²)</strong> in termini di tempo e memoria quando <strong>n</strong> è grande. Ciò lo rende impraticabile per casi d’uso quali la pulizia del corpus di addestramento dei modelli di linguaggio a grande scala (LLM) o l’analisi di documenti su scala web.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">Firme MinHash: approssimazione della similarità di Jaccard<button data-href="#MinHash-signatures-Approximate-Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> è una tecnica probabilistica che offre un modo efficiente per stimare la similarità di Jaccard. Funziona trasformando ogni insieme in un <strong>vettore di firma</strong> compatto, conservando informazioni sufficienti per approssimare in modo efficiente la similarità tra gli insiemi.</p>
<p><strong>L’idea di fondo</strong>:</p>
<p>più i due insiemi sono simili, maggiore è la probabilità che le loro firme MinHash coincidano nelle stesse posizioni. Questa proprietà consente a MinHash di approssimare la similarità di Jaccard tra gli insiemi.</p>
<p>Questa proprietà consente a MinHash di <strong>approssimare la similarità di Jaccard</strong> tra insiemi senza dover confrontare direttamente gli insiemi completi.</p>
<p>Il processo MinHash prevede:</p>
<ol>
<li><p><strong>Shingling</strong>: conversione dei documenti in insiemi di sequenze di token sovrapposte (shingles)</p></li>
<li><p><strong>Hashing</strong>: applicare più funzioni hash indipendenti a ciascuno shingle</p></li>
<li><p><strong>Selezione del valore minimo</strong>: per ciascuna funzione hash, registrare il valore hash <strong>minimo</strong> tra tutti gli shingle</p></li>
</ol>
<p>Di seguito è illustrato l’intero processo:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" /> 
   <span>Flusso di lavoro MinHash</span>
  
 </span></p>
<div class="alert note">
<p>Il numero di funzioni hash utilizzate determina la dimensionalità della firma MinHash. Dimensioni più elevate garantiscono una maggiore precisione di approssimazione, a scapito di un aumento dello spazio di archiviazione e della potenza di calcolo.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH per MinHash<button data-href="#LSH-for-MinHash" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebbene le firme MinHash riducano significativamente il costo del calcolo della similarità esatta di Jaccard tra i documenti, il confronto esaustivo di ogni coppia di vettori di firma rimane comunque inefficiente su larga scala.</p>
<p>Per risolvere questo problema, si ricorre <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">all’LSH</a>. L’LSH consente una ricerca approssimativa e veloce della similarità, garantendo che gli elementi simili vengano inseriti con elevata probabilità nello stesso “bucket”, evitando così la necessità di confrontare direttamente ogni singola coppia.</p>
<p>Il processo prevede:</p>
<ol>
<li><p><strong>Segmentazione della firma:</strong></p>
<p>Una firma MinHash <em>n-dimensionale</em> viene suddivisa in <em>b</em> bande. Ogni banda contiene <em>r</em> valori di hash consecutivi, quindi la lunghezza totale della firma soddisfa la relazione: <em>n = b × r</em>.</p>
<p>Ad esempio, se si dispone di una firma MinHash a 128 dimensioni (<em>n = 128</em>) e la si divide in 32 bande (<em>b = 32</em>), allora ogni banda contiene 4 valori di hash (<em>r = 4</em>).</p></li>
<li><p><strong>Hash a livello di banda:</strong></p>
<p>Dopo la segmentazione, ogni banda viene elaborata in modo indipendente utilizzando una funzione hash standard per assegnarla a un bucket. Se due firme producono lo stesso valore hash all’interno di una banda — ovvero, se rientrano nello stesso bucket — vengono considerate potenziali corrispondenze.</p></li>
<li><p><strong>Selezione dei candidati:</strong></p>
<p>Le coppie che presentano una collisione in almeno una banda vengono selezionate come candidate per la similarità.</p></li>
</ol>
<div class="alert note">
<p>Perché funziona?</p>
<p>Matematicamente, se due firme hanno una similarità di Jaccard <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span>,</p>
<ul>
<li><p>la probabilità che siano identiche in una riga (posizione di hash) è <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span></p></li>
<li><p>La probabilità che coincidano in tutte <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">le rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span> righe di una banda è <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span></span></span></span></p></li>
<li><p>La probabilità che coincidano in <strong>almeno una banda</strong> è <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>1−</mo><mo stretchy="false">(</mo><msup><mi>1−sr</mi></msup><msup><mo stretchy="false">)</mo></msup></mrow><annotation encoding="application/x-tex">b1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span> (<span class="katex-base"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathnormal"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0991em;vertical-align:-0.25em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;"> </span></span></span></span></span></span></span></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></p></li>
</ul>
<p>Per ulteriori dettagli, consultare la sezione " <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Hashing sensibile alla località</a>".</p>
</div>
<p>Si considerino tre documenti con firme MinHash a 128 dimensioni:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" /> 
   <span>Flusso di lavoro LSH 1</span>
  
 </span></p>
<p>In primo luogo, LSH suddivide la firma a 128 dimensioni in 32 bande composte ciascuna da 4 valori consecutivi:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" /> 
   <span>Flusso di lavoro LSH 2</span>
  
 </span></p>
<p>Successivamente, ogni banda viene sottoposta a hash in diversi bucket utilizzando una funzione hash. Le coppie di documenti che condividono gli stessi bucket vengono selezionate come candidati di similarità. Nell’esempio riportato di seguito, il Documento A e il Documento B vengono selezionati come candidati di similarità poiché i loro risultati di hash collidono nella <strong>Banda 0</strong>:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" /> 
   <span>Flusso di lavoro LSH 3</span>
  
 </span></p>
<div class="alert note">
<p>Il numero di bande è controllato dal parametro ` <code translate="no">mh_lsh_band</code> `. Per ulteriori informazioni, consultare <a href="/docs/it/minhash-lsh.md#Index-building-params">i parametri di creazione dell’indice</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures" class="common-anchor-header">MHJACCARD: Confronto delle firme MinHash<button data-href="#MHJACCARD-Comparing-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Le firme MinHash approssimano la similarità di Jaccard tra insiemi utilizzando vettori binari di lunghezza fissa. Tuttavia, poiché queste firme non preservano gli insiemi originali, le metriche standard come <code translate="no">JACCARD</code>, <code translate="no">L2</code> o <code translate="no">COSINE</code> non possono essere applicate direttamente per confrontarle.</p>
<p>Per ovviare a questo problema, Milvus introduce un tipo di metrica specializzata denominata <code translate="no">MHJACCARD</code>, progettata specificamente per il confronto delle firme MinHash.</p>
<p>Quando si utilizza MinHash in Milvus:</p>
<ul>
<li><p>Il campo vettoriale deve essere di tipo <code translate="no">BINARY_VECTOR</code></p></li>
<li><p>L’ <code translate="no">index_type</code> deve essere di tipo <code translate="no">MINHASH_LSH</code> (o <code translate="no">BIN_FLAT</code>)</p></li>
<li><p>L’ <code translate="no">metric_type</code> deve essere impostato su <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>L'utilizzo di altre metriche risulterà non valido o produrrà risultati errati.</p>
<p>Per ulteriori informazioni su questo tipo di metrica, consultare <a href="/docs/it/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h3 id="Deduplication-workflow" class="common-anchor-header">Flusso di lavoro di deduplicazione<button data-href="#Deduplication-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Il processo di deduplicazione basato su MinHash LSH consente a Milvus di identificare e filtrare in modo efficiente i record strutturati o i testi quasi duplicati prima di inserirli nella collezione.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/it9wwbcfwhft0rbwosacgltzneb.png" alt="It9wwbcfwhft0rbwosacgltzneb" class="doc-image" id="it9wwbcfwhft0rbwosacgltzneb" /> 
   <span>It9wwbcfwhft0rbwosacgltzneb</span>
  
 </span></p>
<ol>
<li><p><strong>Suddivisione in blocchi e pre-elaborazione</strong>: suddividere i dati testuali o strutturati in entrata (ad es. record, campi) in blocchi; normalizzare il testo (conversione in minuscolo, rimozione della punteggiatura) e rimuovere le parole vuote, se necessario.</p></li>
<li><p><strong>Costruzione delle caratteristiche</strong>: creare l’insieme di token utilizzato per MinHash (ad es. segmenti di testo; token di campi concatenati per i dati strutturati).</p></li>
<li><p><strong>Generazione delle firme MinHash</strong>: calcolare le firme MinHash per ogni blocco o record.</p></li>
<li><p><strong>Conversione in vettore binario</strong>: convertire la firma in un vettore binario compatibile con Milvus.</p></li>
<li><p><strong>Ricerca prima dell’inserimento</strong>: utilizzare l’indice LSH MinHash per cercare nella collezione di destinazione eventuali quasi-duplicati dell’elemento in entrata.</p></li>
<li><p><strong>Inserimento e archiviazione</strong>: inserire nella raccolta solo gli elementi univoci. Questi diventano ricercabili per futuri controlli di deduplicazione.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di utilizzare l’LSH MinHash in Milvus, è necessario generare <strong>le firme MinHash</strong>. Queste firme binarie compatte approssimano la similarità di Jaccard tra insiemi e sono necessarie per la ricerca basata sull’ <code translate="no">MHJACCARD</code> e in Milvus.</p>
<div class="alert note">
<p>È possibile preparare le firme MinHash per l’indice <code translate="no">MINHASH_LSH</code> in due modi:</p>
<ul>
<li><p>Generare autonomamente le firme utilizzando strumenti esterni e inserirle in un campo BINARY_VECTOR, oppure</p></li>
<li><p>utilizzare la funzione MinHash integrata per generare automaticamente vettori binari compatibili dal testo. Per il flusso di lavoro end-to-end e le opzioni di configurazione della funzione MinHash, consultare <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p></li>
</ul>
</div>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Scegliere un metodo per generare le firme MinHash<button data-href="#Choose-a-method-to-generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>A seconda del carico di lavoro, è possibile scegliere:</p>
<ul>
<li><p>utilizzare la funzione <a href="https://ekzhu.github.io/datasketch/"><code translate="no">datasketch</code></a> per semplicità (consigliato per la prototipazione)</p></li>
<li><p>Utilizzare strumenti distribuiti (ad es. Spark, Ray) per set di dati su larga scala</p></li>
<li><p>Implementare una logica personalizzata (NumPy, C++, ecc.) se l’ottimizzazione delle prestazioni è fondamentale</p></li>
</ul>
<p>In questa guida utilizziamo <code translate="no">datasketch</code> per semplicità e compatibilità con il formato di input di Milvus.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Installa le librerie necessarie<button data-href="#Install-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><p>Installare i pacchetti necessari per questo esempio:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Generare le firme MinHash<button data-href="#Generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Genereremo firme MinHash a 256 dimensioni, con ciascun valore di hash rappresentato come un intero a 64 bit. Ciò è in linea con il formato vettoriale previsto per <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ogni firma è di 256 × 64 bit = 2048 byte. Questa stringa di byte può essere inserita direttamente in un campo <code translate="no">BINARY_VECTOR</code>. Per ulteriori informazioni sui vettori binari utilizzati in Milvus, consultare <a href="/docs/it/binary-vector.md">Vettore binario</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Facoltativo) Preparare insiemi di token grezzi (per la ricerca raffinata)<button data-href="#Optional-Prepare-raw-token-sets-for-refined-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Per impostazione predefinita, Milvus utilizza solo le firme MinHash e l’indice LSH per individuare i vicini approssimativi. Questo metodo è veloce ma potrebbe restituire falsi positivi o tralasciare corrispondenze simili.</p>
<p>Se si desidera <strong>una similarità di Jaccard accurata</strong>, Milvus supporta la ricerca raffinata che utilizza insiemi di token originali. Per abilitarla:</p>
<ul>
<li><p>Memorizza i set di token in un campo separato denominato " <code translate="no">VARCHAR</code> "</p></li>
<li><p>Impostare « <code translate="no">&quot;with_raw_data&quot;: True</code> » durante <a href="/docs/it/minhash-lsh.md#Build-index-parameters-and-create-collection">la creazione dei parametri dell’indice</a></p></li>
<li><p>E abilitare ` <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> ` durante <a href="/docs/it/minhash-lsh.md#Perform-similarity-search">l’esecuzione della ricerca di similarità</a></p></li>
</ul>
<p><strong>Esempio di estrazione di un insieme di token</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH" class="common-anchor-header">Utilizza MinHash LSH<button data-href="#Use-MinHash-LSH" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che i vettori MinHash e i set di token originali sono pronti, è possibile memorizzarli, indicizzarli ed effettuare ricerche utilizzando Milvus con l'<code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-your-cluster" class="common-anchor-header">Connettiti al tuo cluster<button data-href="#Connect-to-your-cluster" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment">// Update if your URI is different</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Definire lo schema della collezione<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Definire uno schema con:</p>
<ul>
<li><p>La chiave primaria</p></li>
<li><p>Un campo " <code translate="no">BINARY_VECTOR</code> " per le firme MinHash</p></li>
<li><p>Un campo di tipo " <code translate="no">VARCHAR</code> " per il set di token originale (se è abilitata la ricerca avanzata)</p></li>
<li><p>Facoltativamente, un campo " <code translate="no">document</code> " per il testo originale</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">16384</span>) <span class="hljs-comment">// 256 hash values × 64 bits</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;token_set&quot;</span>) <span class="hljs-comment">// required for refinement</span>
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">16384</span>, <span class="hljs-comment">// 256 hash values × 64 bits</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;token_set&quot;</span>, <span class="hljs-comment">// required for refinement</span>
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">false</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;doc_id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;minhash_signature&quot;</span>).WithDataType(entity.FieldTypeBinaryVector).WithDim(<span class="hljs-number">16384</span>)). <span class="hljs-comment">// 256 hash values × 64 bits</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;token_set&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>)).        <span class="hljs-comment">// required for refinement</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;minhash_signature&quot;,
            &quot;dataType&quot;: &quot;BinaryVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 16384
            }
        },
        {
            &quot;fieldName&quot;: &quot;token_set&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Imposta i parametri dell'indice e crea la raccolta<button data-href="#Build-index-parameters-and-create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare un indice <code translate="no">MINHASH_LSH</code> con l'affinamento Jaccard abilitato:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;mh_element_bit_width&quot;</span>, <span class="hljs-number">64</span>); <span class="hljs-comment">// Must match signature bit width</span>
extraParams.put(<span class="hljs-string">&quot;mh_lsh_band&quot;</span>, <span class="hljs-number">16</span>);          <span class="hljs-comment">// Band count</span>
extraParams.put(<span class="hljs-string">&quot;with_raw_data&quot;</span>, <span class="hljs-literal">true</span>);      <span class="hljs-comment">// Required for Jaccard refinement</span>

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .indexType(IndexParam.IndexType.MINHASH_LSH)
        .metricType(IndexParam.MetricType.MHJACCARD)
        .extraParams(extraParams)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">MINHASH_LSH</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">MHJACCARD</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">mh_element_bit_width</span>: <span class="hljs-number">64</span>, <span class="hljs-comment">// Must match signature bit width</span>
            <span class="hljs-attr">mh_lsh_band</span>: <span class="hljs-number">16</span>,          <span class="hljs-comment">// Band count</span>
            <span class="hljs-attr">with_raw_data</span>: <span class="hljs-literal">true</span>,      <span class="hljs-comment">// Required for Jaccard refinement</span>
        },
    },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    schema,
    index_params,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">false</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, <span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index.NewMinHashLSHIndex(entity.MHJACCARD, <span class="hljs-number">16</span>). <span class="hljs-comment">// mh_lsh_band: band count</span>
        WithElementBitWidth(<span class="hljs-number">64</span>).                    <span class="hljs-comment">// Must match signature bit width</span>
        WithRawData(<span class="hljs-literal">true</span>))                          <span class="hljs-comment">// Required for Jaccard refinement</span>

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

err = loadTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;minhash_signature&quot;,
        &quot;metricType&quot;: &quot;MHJACCARD&quot;,
        &quot;indexType&quot;: &quot;MINHASH_LSH&quot;,
        &quot;params&quot;: {
            &quot;mh_element_bit_width&quot;: 64,
            &quot;mh_lsh_band&quot;: 16,
            &quot;with_raw_data&quot;: true
        }
    }
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sui parametri di creazione dell'indice, consultare <a href="/docs/it/minhash-lsh.md#Index-building-params">Parametri di creazione dell'indice</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Inserire i dati<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Per ogni documento, preparare:</p>
<ul>
<li><p>Una firma MinHash binaria</p></li>
<li><p>Una stringa serializzata contenente un insieme di token</p></li>
<li><p>(Facoltativo) il testo originale</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Eseguire la ricerca di similarità<button data-href="#Perform-similarity-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus supporta due modalità di ricerca per similarità utilizzando MinHash LSH:</p>
<ul>
<li><p><strong>Ricerca approssimativa</strong> — utilizza solo le firme MinHash e LSH per ottenere risultati rapidi ma probabilistici.</p></li>
<li><p><strong>Ricerca raffinata</strong> — ricalcola la similarità di Jaccard utilizzando gli insiemi di token originali per una maggiore precisione.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Preparare la query</h4><p>Per eseguire una ricerca per somiglianza, generare una firma MinHash per il documento oggetto della query. Questa firma deve corrispondere alla stessa dimensione e allo stesso formato di codifica utilizzati durante l’inserimento dei dati.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Ricerca approssimativa (solo LSH)</h4><p>È veloce e scalabile, ma potrebbe tralasciare corrispondenze simili o includere falsi positivi:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">approxResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = approxResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> approxResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {},</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

approxResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// querySig holds the query signature as a []byte</span>
approxResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; approxResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := approxResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-approxResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {}
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Ricerca raffinata (consigliata per la precisione):</h4><p>Consente un accurato confronto Jaccard utilizzando gli insiemi di token originali memorizzati in Milvus. È leggermente più lenta, ma consigliata per attività in cui la qualità è fondamentale:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>, <span class="hljs-literal">true</span>); <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;refine_k&quot;</span>, <span class="hljs-number">5</span>);                  <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">refinedResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = refinedResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> refinedResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mh_search_with_jaccard</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-attr">refine_k</span>: <span class="hljs-number">5</span>,                  <span class="hljs-comment">// Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    },</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

refinedResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

<span class="highlighted-comment-line">annParam := index.NewMinHashLSHAnnParam().</span>
<span class="highlighted-comment-line">    WithSearchWithJACCARD(<span class="hljs-literal">true</span>). <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">    WithRefineK(<span class="hljs-number">5</span>)               <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a []byte</span>
refinedResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-comment-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
<span class="highlighted-comment-line">    WithAnnParam(annParam).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; refinedResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := refinedResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-refinedResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {
        &quot;mh_search_with_jaccard&quot;: true,
        &quot;refine_k&quot;: 5
    }
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Parametri dell'indice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione fornisce una panoramica dei parametri utilizzati per la creazione di un indice e per l’esecuzione di ricerche sull’indice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parametri di creazione dell’indice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> durante <a href="/docs/it/minhash-lsh.md#Build-index-parameters-and-create-collection">la creazione di un indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Larghezza in bit di ciascun valore hash nella firma MinHash. Deve essere divisibile per 8.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Utilizzare <code translate="no">32</code> per ottenere prestazioni e accuratezza bilanciate. Utilizzare <code translate="no">64</code> per una maggiore precisione con set di dati più grandi. Utilizzare <code translate="no">16</code> per risparmiare memoria con una perdita di accuratezza accettabile.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Numero di bande in cui suddividere la firma MinHash per LSH. Controlla il compromesso tra richiamo e prestazioni.</p></td>
     <td><p>[1, <em>lunghezza_firma</em>]</p></td>
     <td><p>Per le firme a 128 dimensioni: iniziare con 32 bande (4 valori per banda). Aumentare a 64 per un richiamo più elevato, diminuire a 16 per prestazioni migliori. La lunghezza della firma deve essere suddivisa in modo uniforme.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Se memorizzare i codici hash LSH in memoria anonima (<code translate="no">true</code>) o utilizzare la mappatura di memoria (<code translate="no">false</code>).</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilizzare <code translate="no">false</code> per set di dati di grandi dimensioni (&gt;1 milione di set) per ridurre l'utilizzo della memoria. Utilizzare <code translate="no">true</code> per set di dati più piccoli che richiedono la massima velocità di ricerca.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Se memorizzare le firme MinHash originali insieme ai codici LSH per il perfezionamento.</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilizzare <code translate="no">true</code> quando è richiesta un'elevata precisione e il costo di archiviazione è accettabile. Utilizzare <code translate="no">false</code> per ridurre al minimo il sovraccarico di archiviazione con una leggera riduzione della precisione.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>Probabilità di falsi positivi per il filtro di Bloom utilizzato nell’ottimizzazione dei bucket LSH.</p></td>
     <td><p>[0,001; 0,1]</p></td>
     <td><p>Utilizzare <code translate="no">0.01</code> per un equilibrio tra utilizzo della memoria e precisione. Valori più bassi (<code translate="no">0.001</code>) riducono i falsi positivi ma aumentano l’utilizzo della memoria. Valori più alti (<code translate="no">0.05</code>) consentono di risparmiare memoria ma possono ridurre la precisione.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici dell’indice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri configurabili in <code translate="no">search_params.params</code> durante <a href="/docs/it/minhash-lsh.md#Perform-similarity-search">la ricerca nell’indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Indica se eseguire il calcolo esatto della similarità di Jaccard sui risultati candidati per l’affinamento.</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilizzare <code translate="no">true</code> per le applicazioni che richiedono un'elevata precisione (ad esempio, la deduplicazione). Utilizzare <code translate="no">false</code> per una ricerca approssimativa più veloce quando è accettabile una leggera perdita di accuratezza.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Numero di risultati candidati da recuperare prima dell’affinamento Jaccard. Efficace solo quando <code translate="no">mh_search_with_jaccard</code> è impostato su <code translate="no">true</code>.</p></td>
     <td><p>[<em>top_k</em>, <em>top_k &amp;ast; 10</em>]</p></td>
     <td><p>Impostare un valore compreso tra 2 e 5 volte il valore desiderato <em>per `top_k`</em> per ottenere un buon equilibrio tra richiamo e prestazioni. Valori più elevati migliorano il richiamo ma aumentano il costo computazionale.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Se abilitare l’ottimizzazione in batch per più query simultanee.</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilizzare <code translate="no">true</code> quando si effettuano ricerche con più query contemporaneamente per ottenere un throughput migliore. Utilizzare <code translate="no">false</code> per scenari con una singola query al fine di ridurre il sovraccarico di memoria.</p></td>
   </tr>
</table>
