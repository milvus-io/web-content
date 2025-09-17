---
id: decay-ranker-overview.md
title: Panoramica di Decay RankerCompatible with Milvus 2.6.x
summary: >-
  Nella ricerca vettoriale tradizionale, i risultati sono classificati
  esclusivamente in base alla somiglianza vettoriale, ovvero alla vicinanza dei
  vettori nello spazio matematico. Ma nelle applicazioni reali, ciò che rende i
  contenuti veramente rilevanti spesso dipende da qualcosa di più della semplice
  somiglianza semantica.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Panoramica di Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Nella ricerca vettoriale tradizionale, i risultati sono classificati esclusivamente in base alla somiglianza vettoriale, ovvero alla vicinanza dei vettori nello spazio matematico. Ma nelle applicazioni reali, ciò che rende un contenuto veramente rilevante spesso dipende da qualcosa di più della semplice somiglianza semantica.</p>
<p>Considerate questi scenari quotidiani:</p>
<ul>
<li><p>Una ricerca di notizie in cui l'articolo di ieri dovrebbe essere più importante di un articolo simile di tre anni fa.</p></li>
<li><p>Una ricerca di ristoranti che dà priorità ai locali a 5 minuti di distanza rispetto a quelli che richiedono 30 minuti di auto</p></li>
<li><p>Una piattaforma di e-commerce che dà priorità ai prodotti di tendenza anche quando sono leggermente meno simili alla query di ricerca.</p></li>
</ul>
<p>Questi scenari hanno tutti un'esigenza comune: bilanciare la somiglianza vettoriale con altri fattori numerici come il tempo, la distanza o la popolarità.</p>
<p>I classificatori di decadimento di Milvus rispondono a questa esigenza regolando le classifiche di ricerca in base ai valori dei campi numerici. Permettono di bilanciare la somiglianza vettoriale con la "freschezza", la "vicinanza" o altre proprietà numeriche dei dati, creando esperienze di ricerca più intuitive e contestualmente rilevanti.</p>
<h2 id="Usage-notes" class="common-anchor-header">Note sull'uso<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>Il ranking di decadimento non può essere utilizzato con le ricerche di raggruppamento.</p></li>
<li><p>Il campo utilizzato per il ranking di decadimento deve essere numerico (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, o <code translate="no">DOUBLE</code>).</p></li>
<li><p>Ogni classificatore di decadimento può utilizzare un solo campo numerico.</p></li>
<li><p><strong>Coerenza dell'unità di tempo</strong>: Quando si utilizza una classifica di decadimento basata sul tempo, le unità di misura dei parametri <code translate="no">origin</code>, <code translate="no">scale</code> e <code translate="no">offset</code> devono corrispondere alle unità di misura utilizzate nei dati della raccolta:</p>
<ul>
<li>Se la raccolta memorizza i timestamp in <strong>secondi</strong>, utilizzare i secondi per tutti i parametri.</li>
<li>Se la raccolta memorizza timestamp in <strong>millisecondi</strong>, utilizzare millisecondi per tutti i parametri.</li>
<li>Se la raccolta memorizza timestamp in <strong>microsecondi</strong>, utilizzare microsecondi per tutti i parametri.</li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Come funziona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Il Decay Ranking migliora la ricerca vettoriale tradizionale incorporando fattori numerici come il tempo o la distanza geografica nel processo di classificazione. L'intero processo segue queste fasi:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Fase 1: Calcolo dei punteggi di somiglianza normalizzati<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Per prima cosa, Milvus calcola e normalizza i punteggi di somiglianza dei vettori per garantire un confronto coerente:</p>
<ul>
<li><p>Per le metriche di distanza <strong>L2</strong> e <strong>JACCARD</strong> (dove i valori più bassi indicano una maggiore somiglianza):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Trasforma le distanze in punteggi di somiglianza compresi tra 0 e 1, dove il valore più alto è migliore.</p></li>
<li><p>Per le metriche <strong>IP</strong>, <strong>COSINE</strong> e <strong>BM25</strong> (dove punteggi più alti indicano già corrispondenze migliori): I punteggi vengono utilizzati direttamente senza normalizzazione.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Fase 2: Calcolo dei punteggi di decadimento<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Successivamente, Milvus calcola un punteggio di decadimento basato sul valore del campo numerico (come il timestamp o la distanza) utilizzando il ranker di decadimento selezionato:</p>
<ul>
<li><p>Ogni classificatore di decadimento trasforma i valori numerici grezzi in punteggi di rilevanza normalizzati compresi tra 0-1.</p></li>
<li><p>Il punteggio di decadimento rappresenta la rilevanza di un elemento in base alla sua "distanza" dal punto ideale.</p></li>
</ul>
<p>La formula di calcolo specifica varia a seconda del tipo di decay ranker. Per i dettagli su come calcolare un punteggio di decadimento, consultare le pagine dedicate a <a href="/docs/it/gaussian-decay.md#Formula">Decadimento gaussiano</a>, <a href="/docs/it/exponential-decay.md#Formula">Decadimento esponenziale</a> e <a href="/docs/it/linear-decay.md#Formula">Decadimento lineare</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Fase 3: calcolo dei punteggi finali<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Infine, Milvus combina il punteggio di similarità normalizzato e il punteggio di decadimento per produrre il punteggio finale della classifica:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Nei casi di ricerca ibrida (che combina più campi vettoriali), Milvus prende il massimo punteggio di similarità normalizzato tra le richieste di ricerca:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Ad esempio, se un documento di ricerca ottiene un punteggio di 0,82 dalla similarità vettoriale e di 0,91 dal recupero del testo basato su BM25 in una ricerca ibrida, Milvus utilizza 0,91 come punteggio di similarità di base prima di applicare il fattore di decadimento.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Il ranking di decadimento in azione<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Vediamo il decay ranking in uno scenario pratico: la ricerca di <strong>"articoli di ricerca sull'intelligenza artificiale"</strong> con decadimento basato sul tempo:</p>
<div class="alert note">
<p>In questo esempio, i punteggi di decadimento riflettono il modo in cui la rilevanza diminuisce con il tempo: i documenti più recenti ricevono punteggi più vicini a 1,0, quelli più vecchi ricevono punteggi più bassi. Questi valori sono calcolati utilizzando un classificatore di decadimento specifico. Per maggiori dettagli, consultare la sezione <a href="/docs/it/decay-ranker-overview.md#Choose-the-right-decay-ranker">Scegliere il giusto classificatore di decadimento</a>.</p>
</div>
<table>
   <tr>
     <th><p>Carta</p></th>
     <th><p>Similitudine vettoriale</p></th>
     <th><p>Punteggio di somiglianza normalizzato</p></th>
     <th><p>Data di pubblicazione</p></th>
     <th><p>Punteggio di decadimento</p></th>
     <th><p>Punteggio finale</p></th>
     <th><p>Classifica finale</p></th>
   </tr>
   <tr>
     <td><p>Carta A</p></td>
     <td><p>Alto</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 settimane fa</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Carta B</p></td>
     <td><p>Molto alto</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 mesi fa</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Carta C</p></td>
     <td><p>Media</p></td>
     <td><p>0,75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 giorno fa</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Carta D</p></td>
     <td><p>Medio-alto</p></td>
     <td><p>0,76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 settimane fa</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Senza il reranking del decadimento, il documento B si classificherebbe al primo posto in base alla pura somiglianza vettoriale (0,92). Tuttavia, con il decay reranking applicato:</p>
<ul>
<li><p>Il documento C balza in prima posizione nonostante la media somiglianza perché è molto recente (pubblicato ieri).</p></li>
<li><p>Il documento B scende alla posizione numero 3, nonostante l'eccellente somiglianza, perché è relativamente vecchio.</p></li>
<li><p>Il documento D utilizza la distanza L2 (dove minore è migliore), quindi il suo punteggio viene normalizzato da 1,2 a 0,76 prima di applicare il decadimento.</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Scegliere il giusto classificatore di decadimento<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre diversi classificatori di decadimento - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, ciascuno progettato per casi d'uso specifici:</p>
<table>
   <tr>
     <th><p>Classificatore di decadimento</p></th>
     <th><p>Caratteristiche</p></th>
     <th><p>Casi d'uso ideali</p></th>
     <th><p>Scenario di esempio</p></th>
   </tr>
   <tr>
     <td><p>Gaussiano (<code translate="no">gauss</code>)</p></td>
     <td><p>Declino graduale dal sapore naturale che si estende moderatamente</p></td>
     <td><ul>
<li><p>Ricerche generali che richiedono risultati equilibrati</p></li>
<li><p>Applicazioni in cui gli utenti hanno un senso intuitivo della distanza</p></li>
<li><p>Quando la distanza moderata non dovrebbe penalizzare gravemente i risultati</p></li>
</ul></td>
     <td><p>In una ricerca di ristoranti, i locali di qualità a 3 km di distanza rimangono scoperti, anche se classificati più in basso rispetto alle opzioni vicine</p></td>
   </tr>
   <tr>
     <td><p>Esponenziale (<code translate="no">exp</code>)</p></td>
     <td><p>All'inizio diminuisce rapidamente, ma mantiene una coda lunga</p></td>
     <td><ul>
<li><p>News feed, dove la ricorrenza è fondamentale</p></li>
<li><p>Social media dove i contenuti freschi dovrebbero dominare</p></li>
<li><p>Quando la prossimità è fortemente preferita, ma gli articoli eccezionalmente distanti dovrebbero rimanere visibili</p></li>
</ul></td>
     <td><p>In un'app di notizie, le storie di ieri si posizionano molto più in alto rispetto ai contenuti di una settimana fa, ma gli articoli più vecchi altamente rilevanti possono ancora apparire</p></td>
   </tr>
   <tr>
     <td><p>Lineare (<code translate="no">linear</code>)</p></td>
     <td><p>Declino coerente e prevedibile, con un limite ben definito</p></td>
     <td><ul>
<li><p>Applicazioni con confini naturali</p></li>
<li><p>Servizi con limiti di distanza</p></li>
<li><p>Contenuti con date di scadenza o soglie chiare</p></li>
</ul></td>
     <td><p>In un cercatore di eventi, gli eventi oltre una finestra futura di due settimane non appaiono affatto.</p></td>
   </tr>
</table>
<p>Per informazioni dettagliate su come ciascun decay ranker calcola i punteggi e i modelli di declino specifici, consultare la documentazione dedicata:</p>
<ul>
<li><p><a href="/docs/it/gaussian-decay.md">Decadimento gaussiano</a></p></li>
<li><p><a href="/docs/it/exponential-decay.md">Decadimento esponenziale</a></p></li>
<li><p><a href="/docs/it/linear-decay.md">Decadimento lineare</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Esempio di implementazione<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>I ranker di decadimento possono essere applicati sia alla ricerca vettoriale standard che alle operazioni di ricerca ibrida in Milvus. Di seguito sono riportati i principali frammenti di codice per l'implementazione di questa funzione.</p>
<div class="alert note">
<p>Prima di utilizzare le funzioni di decadimento, è necessario creare una collezione con campi numerici appropriati (come timestamp, distanze, ecc.) che verranno utilizzati per i calcoli di decadimento. Per gli esempi di lavoro completi, che includono l'impostazione della raccolta, la definizione dello schema e l'inserimento dei dati, consultare l'<a href="/docs/it/tutorial-implement-a-time-based-ranking-in-milvus.md">esercitazione: Implementare una classifica basata sul tempo in Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Creare un classificatore di decadimento<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Per implementare il ranking di decadimento, occorre innanzitutto definire un oggetto <code translate="no">Function</code> con la configurazione appropriata:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
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
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Richiesto?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore/Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Identificatore della funzione utilizzata durante l'esecuzione delle ricerche. Scegliere un nome descrittivo e pertinente al caso d'uso.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Campo numerico per il calcolo del punteggio di decadimento. Determina quale attributo dei dati sarà usato per calcolare il decadimento (ad esempio, timestamp per il decadimento basato sul tempo, coordinate per il decadimento basato sulla posizione). 
 Deve essere un campo della collezione che contiene valori numerici rilevanti. Supporta INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il tipo di funzione creata. Deve essere impostato su <code translate="no">RERANK</code> per tutti i classificatori di decadimento.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il metodo di classificazione da utilizzare. Deve essere impostato su <code translate="no">"decay"</code> per abilitare la funzionalità di classificazione per decadimento.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica quale ranker matematico di decadimento applicare. Determina la forma della curva del declino della rilevanza. Vedere la sezione <a href="/docs/it/decay-ranker-overview.md#Choose-the-right-decay-ranker">Scegliere il ranker di decadimento giusto per</a> una guida alla selezione della funzione appropriata.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code>, o <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Punto di riferimento dal quale viene calcolato il punteggio di decadimento. Le voci che si trovano a questo valore ricevono il massimo punteggio di rilevanza. Per il decadimento basato sul tempo, l'unità di tempo deve corrispondere ai dati della raccolta.</p></td>
     <td><ul>
<li>Per i timestamp: l'ora corrente (ad esempio, <code translate="no">int(time.time())</code>).</li>
<li>Per la geolocalizzazione: le coordinate attuali dell'utente.</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Distanza o tempo in cui la rilevanza scende al valore <code translate="no">decay</code>. Controlla la velocità con cui la rilevanza diminuisce. Per il decadimento basato sul tempo, l'unità di tempo deve corrispondere ai dati raccolti. Valori più grandi creano un declino più graduale della rilevanza; valori più piccoli creano un declino più ripido.</p></td>
     <td><ul>
<li>Per il tempo: periodo in secondi (ad esempio, <code translate="no">7 * 24 * 60 * 60</code> per 7 giorni).</li>
<li>Per la distanza: metri (ad esempio, <code translate="no">5000</code> per 5 km).</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.offset</code></p></td>
     <td><p>No</p></td>
     <td><p>Crea una "zona di non decadimento" intorno a <code translate="no">origin</code> in cui gli elementi mantengono il punteggio pieno (punteggio di decadimento = 1,0). Gli elementi all'interno di questo intervallo di <code translate="no">origin</code> mantengono la massima rilevanza. Per il decadimento basato sul tempo, l'unità di tempo deve corrispondere ai dati della raccolta.</p></td>
     <td><ul>
<li>Per il tempo: periodo in secondi (ad esempio, <code translate="no">24 * 60 * 60</code> per 1 giorno).</li>
<li>Per la distanza: metri (ad esempio, <code translate="no">500</code> per 500 m).</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>No</p></td>
     <td><p>Valore del punteggio alla distanza <code translate="no">scale</code>, controlla la ripidità della curva. Valori più bassi creano curve di declino più ripide; valori più alti creano curve di declino più graduali. Deve essere compreso tra 0 e 1. (valore predefinito)</p></td>
     <td><p><code translate="no">0.5</code> (valore predefinito)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Applicare alla ricerca vettoriale standard<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver definito il ranker di decadimento, è possibile applicarlo durante le operazioni di ricerca passandolo al parametro <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Applica alla ricerca ibrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>I ranker di decadimento possono essere applicati anche alle operazioni di ricerca ibrida che combinano più campi vettoriali:</p>
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
<p>Nella ricerca ibrida, Milvus trova prima il massimo punteggio di somiglianza tra tutti i campi vettoriali, quindi applica il fattore di decadimento a tale punteggio.</p>
