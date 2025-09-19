---
id: boost-ranker.md
title: Classificatore BoostCompatible with Milvus v2.6.2+
summary: >-
  Invece di basarsi esclusivamente sulla somiglianza semantica calcolata in base
  alle distanze vettoriali, Boost Rankers consente di influenzare i risultati di
  ricerca in modo significativo. È ideale per regolare rapidamente i risultati
  di ricerca utilizzando il filtraggio dei metadati.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Classificatore Boost<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Invece di affidarsi esclusivamente alla somiglianza semantica calcolata in base alle distanze vettoriali, i Boost Ranker consentono di influenzare i risultati di ricerca in modo significativo. È ideale per regolare rapidamente i risultati della ricerca utilizzando il filtraggio dei metadati.</p>
<p>Quando una richiesta di ricerca include una funzione Boost Ranker, Milvus utilizza la condizione di filtraggio opzionale all'interno della funzione per trovare le corrispondenze tra i candidati risultati della ricerca e aumenta i punteggi di tali corrispondenze applicando il peso specificato, contribuendo a promuovere o declassare la classifica delle entità abbinate nel risultato finale.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Quando usare Boost Ranker<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>A differenza di altri classificatori che si basano su modelli cross-encoder o algoritmi di fusione, Boost Ranker inietta direttamente regole opzionali basate sui metadati nel processo di classificazione, il che lo rende più adatto ai seguenti scenari.</p>
<table>
   <tr>
     <th><p>Caso d'uso</p></th>
     <th><p>Esempi</p></th>
     <th><p>Perché Boost Ranker funziona bene</p></th>
   </tr>
   <tr>
     <td><p>Priorità dei contenuti in base al business</p></td>
     <td><ul><li><p>Evidenziare i prodotti premium nei risultati di ricerca dell'e-commerce</p></li><li><p>Aumentare la visibilità dei contenuti con elevate metriche di coinvolgimento degli utenti (come visualizzazioni, like e condivisioni)</p></li><li><p>Elevare i contenuti recenti nelle applicazioni di ricerca sensibili al fattore tempo</p></li><li><p>Privilegiare i contenuti provenienti da fonti verificate o affidabili</p></li><li><p>Incremento dei risultati che corrispondono a frasi esatte o a parole chiave ad alta rilevanza</p></li></ul></td>
     <td rowspan="2"><p>Senza dover ricostruire gli indici o modificare i modelli di incorporazione vettoriale - operazioni che possono richiedere molto tempo - è possibile promuovere o declassare istantaneamente elementi specifici nei risultati di ricerca applicando filtri di metadati opzionali in tempo reale. Questo meccanismo consente di ottenere classifiche di ricerca flessibili e dinamiche che si adattano facilmente all'evoluzione dei requisiti aziendali.</p></td>
   </tr>
   <tr>
     <td><p>Downranking strategico dei contenuti</p></td>
     <td><ul><li><p>Riduzione dell'importanza degli articoli con scarso inventario senza rimuoverli completamente.</p></li><li><p>Riduzione della posizione di contenuti con termini potenzialmente discutibili senza censura.</p></li><li><p>Ridimensionamento della documentazione più vecchia, pur mantenendola accessibile nelle ricerche tecniche.</p></li><li><p>Ridurre sottilmente la visibilità dei prodotti della concorrenza nelle ricerche di mercato.</p></li><li><p>Riduzione della rilevanza dei contenuti con indicazioni di qualità inferiore (come problemi di formattazione, lunghezza ridotta, ecc.)</p></li></ul></td>
   </tr>
</table>
<p>È inoltre possibile combinare più Boost Ranker per implementare una strategia di ranking basata sul peso più dinamica e robusta.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Meccanismo di Boost Ranker<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Il diagramma seguente illustra il flusso di lavoro principale dei Boost Ranker.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>Meccanismo di Boost Ranker</span> </span></p>
<p>Quando si inseriscono i dati, Milvus li distribuisce in segmenti. Durante una ricerca, ogni segmento restituisce un insieme di candidati e Milvus classifica questi candidati da tutti i segmenti per produrre i risultati finali. Quando una richiesta di ricerca include un Boost Ranker, Milvus lo applica ai risultati dei candidati di ogni segmento per evitare una potenziale perdita di precisione e migliorare il richiamo.</p>
<p>Prima di finalizzare i risultati, Milvus elabora questi candidati con il Boost Ranker come segue:</p>
<ol>
<li><p>Applica l'espressione di filtraggio opzionale specificata nel Boost Ranker per identificare le entità che corrispondono all'espressione.</p></li>
<li><p>Applica il peso specificato nel Boost Ranker per aumentare i punteggi delle entità identificate.</p></li>
</ol>
<div class="alert note">
<p>Non è possibile utilizzare Boost Ranker come ranker in una ricerca ibrida multivettore. Tuttavia, è possibile utilizzarlo come classificatore in una qualsiasi delle sue sotto-richieste (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Esempi di Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente illustra l'uso di un Boost Ranker in una ricerca a vettore singolo che richiede la restituzione delle cinque entità più rilevanti e l'aggiunta di pesi ai punteggi delle entità con il tipo di documento astratto.</p>
<ol>
<li><p><strong>Raccogliere i risultati della ricerca in segmenti.</strong></p>
<p>La tabella seguente ipotizza che Milvus distribuisca le entità in due segmenti<strong>(0001</strong> e <strong>0002</strong>) e che ogni segmento restituisca cinque candidati.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo di documento</p></th>
<th><p>Punteggio</p></th>
<th><p>Classifica</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>astratto</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>astratto</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titolo</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corpo</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>astratto</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>astratto</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>astratto</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Applicare l'espressione di filtraggio specificata nel Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Come indicato dal campo <code translate="no">DocType</code> nella tabella seguente, Milvus contrassegnerà tutte le entità con <code translate="no">doctype</code> impostato su <code translate="no">abstract</code> per un'ulteriore elaborazione.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo di documento</p></th>
<th><p>Punteggio</p></th>
<th><p>Classifica</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titolo</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corpo</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Applicare il peso specificato nel Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Tutte le entità identificate nel passaggio precedente saranno moltiplicate per il peso specificato nel Boost Ranker, con conseguente modifica dei loro ranghi.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo di documento</p></th>
<th><p>Punteggio</p></th>
<th><p>Punteggio ponderato </p><p>(= punteggio x peso)</p></th>
<th><p>Classifica</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titolo</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corpo</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>Il peso deve essere un numero a virgola mobile scelto dall'utente. Nei casi come l'esempio precedente, in cui un punteggio minore indica una maggiore rilevanza, utilizzare un peso inferiore a <strong>1</strong>. Altrimenti, utilizzare un peso superiore a <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Aggregare i candidati di tutti i segmenti in base ai punteggi ponderati per finalizzare i risultati.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo di documento</p></th>
<th><p>Punteggio</p></th>
<th><p>Punteggio ponderato</p></th>
<th><p>Classifica</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>astratto</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Uso di Boost Ranker<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione vengono illustrati alcuni esempi di utilizzo di Boost Ranker per influenzare i risultati di una ricerca monovettoriale.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Creare un Boost Ranker<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Prima di passare un Boost Ranker come reranker di una richiesta di ricerca, è necessario definire correttamente il Boost Ranker come funzione di reranking, come segue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: { 
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
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
     <td><p>Identificatore univoco per questa funzione</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Elenco di campi vettoriali a cui applicare la funzione (deve essere vuoto per RRF Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il tipo di Funzione da invocare; usare <code translate="no">RERANK</code> per specificare una strategia di reranking</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il tipo di reranker.</p><p>Deve essere impostato su <code translate="no">boost</code> per utilizzare Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il peso che sarà moltiplicato per i punteggi delle entità corrispondenti nei risultati grezzi della ricerca.</p><p>Il valore deve essere un numero a virgola mobile. </p><ul><li><p>Per enfatizzare l'importanza delle entità corrispondenti, impostare un valore che aumenti i punteggi.</p></li><li><p>Per declassare le entità corrispondenti, assegnare a questo parametro un valore che ne abbassi il punteggio.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>No</p></td>
     <td><p>Specifica l'espressione di filtro che verrà usata per abbinare le entità tra i risultati della ricerca. Può essere una qualsiasi espressione di filtro di base valida menzionata in <a href="/docs/it/boolean.md">Spiegazioni sui filtri</a>.</p><p><strong>Nota</strong>: utilizzare solo operatori di base, come <code translate="no">==</code>, <code translate="no">&gt;</code>, o <code translate="no">&lt;</code>. L'uso di operatori avanzati, come <code translate="no">text_match</code> o <code translate="no">phrase_match</code>, peggiora le prestazioni della ricerca.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>No</p></td>
     <td><p>Specifica la funzione casuale che genera un valore tra <code translate="no">0</code> e <code translate="no">1</code> in modo casuale. Ha i seguenti due argomenti opzionali:</p><ul><li><p><code translate="no">seed</code> (numero) Specifica un valore iniziale usato per avviare un generatore di numeri pseudorandom (PRNG).</p></li><li><p><code translate="no">field</code> (stringa) Specifica il nome di un campo il cui valore sarà usato come fattore casuale nella generazione del numero casuale. È sufficiente un campo con valori unici.</p><p>Si consiglia di impostare sia <code translate="no">seed</code> che <code translate="no">field</code> per garantire la coerenza tra le generazioni, utilizzando gli stessi valori di seme e campo.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Ricerca con un singolo Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Una volta che la funzione Boost Ranker è pronta, si può fare riferimento ad essa in una richiesta di ricerca. L'esempio seguente presuppone che sia già stata creata una raccolta con i seguenti campi: <strong>id</strong>, <strong>vector</strong> e <strong>doctype</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Ricerca con più Boost Ranker<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>È possibile combinare più Boost Ranker in una singola ricerca per influenzare i risultati. A tale scopo, è necessario creare diversi Boost Ranker, fare riferimento ad essi in un'istanza di <strong>FunctionScore</strong> e utilizzare l'istanza di <strong>FunctionScore</strong> come ranker nella richiesta di ricerca.</p>
<p>L'esempio seguente mostra come modificare i punteggi di tutte le entità identificate applicando un peso compreso tra <strong>0,8</strong> e <strong>1,2</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params: {
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<p>In particolare, ci sono due Boost Ranker: uno applica un peso fisso a tutte le entità trovate, mentre l'altro assegna un peso casuale. Poi, facciamo riferimento a questi due classificatori in una <strong>FunctionScore</strong>, che definisce anche come i pesi influenzano i punteggi delle entità trovate.</p>
<p>La tabella seguente elenca i parametri necessari per creare un'istanza di <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Richiesto?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore/Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica i nomi dei classificatori di destinazione in un elenco.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>No</p></td>
     <td><p>Specifica come i pesi specificati influenzano i punteggi delle entità corrispondenti.</p><p>I valori possibili sono:</p><ul><li><p><code translate="no">Multiple</code></p><p>Indica che il valore ponderato è uguale al punteggio originale di un'entità corrispondente moltiplicato per il peso specificato. </p><p>Questo è il valore predefinito.</p></li><li><p><code translate="no">Sum</code></p><p>Indica che il valore ponderato è uguale alla somma del punteggio originale di un'entità corrispondente e del peso specificato.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>No</p></td>
     <td><p>Specifica come vengono elaborati i valori ponderati dei vari Boost Ranker.</p><p>I valori possibili sono:</p><ul><li><p><code translate="no">Multiplify</code></p><p>Indica che il punteggio finale di un'entità corrispondente è uguale al prodotto dei valori ponderati di tutti i Boost Ranker.</p><p>Questo è il valore predefinito.</p></li><li><p><code translate="no">Sum</code></p><p>Indica che il punteggio finale di un'entità corrispondente è uguale alla somma dei valori ponderati di tutti i Boost Ranker.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
