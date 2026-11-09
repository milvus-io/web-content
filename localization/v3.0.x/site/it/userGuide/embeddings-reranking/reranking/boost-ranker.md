---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Anziché basarsi esclusivamente sulla somiglianza semantica calcolata in base
  alle distanze vettoriali, i Boost Rankers consentono di influenzare i
  risultati di ricerca in modo significativo. Sono ideali per modificare
  rapidamente i risultati di ricerca tramite il filtraggio dei metadati.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Boost Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Anziché basarsi esclusivamente sulla somiglianza semantica calcolata in base alle distanze vettoriali, i Boost Ranker consentono di influenzare i risultati di ricerca in modo significativo. Sono ideali per regolare rapidamente i risultati di ricerca utilizzando il filtraggio dei metadati.</p>
<p>Quando una richiesta di ricerca include una funzione Boost Ranker, Milvus utilizza la condizione di filtraggio opzionale all’interno della funzione per individuare corrispondenze tra i risultati candidati e aumenta il punteggio di tali corrispondenze applicando il peso specificato, contribuendo così a promuovere o declassare il posizionamento delle entità corrispondenti nel risultato finale.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Quando utilizzare il Boost Ranker<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>A differenza di altri sistemi di classificazione che si basano su modelli cross-encoder o algoritmi di fusione, un Boost Ranker inserisce direttamente nel processo di classificazione regole opzionali basate sui metadati, il che lo rende più adatto nei seguenti scenari.</p>
<table>
   <tr>
     <th><p>Caso d’uso</p></th>
     <th><p>Esempi</p></th>
     <th><p>Perché Boost Ranker funziona bene</p></th>
   </tr>
   <tr>
     <td><p>Priorità dei contenuti in base alle esigenze aziendali</p></td>
     <td><ul><li><p>Messa in evidenza dei prodotti premium nei risultati di ricerca dell’e-commerce</p></li><li><p>Aumenta la visibilità dei contenuti con metriche di coinvolgimento degli utenti elevate (come visualizzazioni, "Mi piace" e condivisioni)</p></li><li><p>Promuovere i contenuti recenti nelle applicazioni di ricerca in cui il fattore tempo è determinante</p></li><li><p>Priorità ai contenuti provenienti da fonti verificate o affidabili</p></li><li><p>Miglioramento dei risultati che corrispondono a frasi esatte o a parole chiave altamente pertinenti</p></li></ul></td>
     <td rowspan="2"><p>Senza la necessità di ricostruire gli indici o modificare i modelli di embedding vettoriale — operazioni che possono richiedere molto tempo — è possibile promuovere o declassare istantaneamente elementi specifici nei risultati di ricerca applicando filtri opzionali basati sui metadati in tempo reale. Questo meccanismo consente classifiche di ricerca flessibili e dinamiche che si adattano facilmente alle esigenze aziendali in continua evoluzione.</p></td>
   </tr>
   <tr>
     <td><p>Riduzione strategica del posizionamento dei contenuti</p></td>
     <td><ul><li><p>Riduzione della visibilità degli elementi con scorte limitate senza rimuoverli completamente</p></li><li><p>Abbassamento del posizionamento dei contenuti contenenti termini potenzialmente discutibili senza ricorrere alla censura</p></li><li><p>Retrocessione della documentazione più datata, mantenendola comunque accessibile nelle ricerche tecniche</p></li><li><p>Riduzione discreta della visibilità dei prodotti della concorrenza nelle ricerche sul marketplace</p></li><li><p>Diminuire la rilevanza dei contenuti che presentano indicatori di qualità inferiore (come problemi di formattazione, lunghezza ridotta, ecc.)</p></li></ul></td>
   </tr>
</table>
<p>È inoltre possibile combinare più Boost Ranker per implementare una strategia di classificazione basata sui pesi più dinamica e solida.</p>
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
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" /> 
   <span>Meccanismo di Boost Ranker</span>
  
 </span></p>
<p>Quando si inseriscono i dati, Milvus li distribuisce tra i segmenti. Durante una ricerca, ogni segmento restituisce un insieme di candidati e Milvus ordina questi candidati provenienti da tutti i segmenti per produrre i risultati finali. Quando una richiesta di ricerca include un Boost Ranker, Milvus lo applica ai risultati candidati di ciascun segmento per prevenire potenziali perdite di precisione e migliorare il richiamo.</p>
<p>Prima di finalizzare i risultati, Milvus elabora questi candidati con il Boost Ranker come segue:</p>
<ol>
<li><p>Applica l’espressione di filtraggio opzionale specificata nel Boost Ranker per identificare le entità che corrispondono all’espressione.</p></li>
<li><p>Applica il peso specificato nel Boost Ranker per aumentare i punteggi delle entità identificate.</p></li>
</ol>
<div class="alert note">
<p>Non è possibile utilizzare il Boost Ranker come sistema di classificazione in una ricerca ibrida multivettoriale. Tuttavia, è possibile utilizzarlo come sistema di classificazione in una qualsiasi delle sue sotto-richieste (<code translate="no">AnnSearchRequest</code>).</p>
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
    </button></h2><p>L'esempio seguente illustra l'uso di un Boost Ranker in una ricerca a vettore singolo che richiede di restituire le prime cinque entità più rilevanti e di aggiungere pesi ai punteggi delle entità con il tipo di documento "abstract".</p>
<ol>
<li><p><strong>Raccogliere i candidati dei risultati di ricerca in segmenti.</strong></p>
<p>La tabella seguente presuppone che Milvus distribuisca le entità in due segmenti (<strong>0001</strong> e <strong>0002</strong>), con ciascun segmento che restituisce cinque candidati.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo di documento</p></th>
<th><p>Punteggio</p></th>
<th><p>Posizione</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>abstract</p></td>
<td><p>0,344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>abstract</p></td>
<td><p>0,456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titolo</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0,189</p></td>
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
<td><p>abstract</p></td>
<td><p>0,366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>abstract</p></td>
<td><p>0,444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>abstract</p></td>
<td><p>0,845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Applicare l'espressione di filtraggio specificata in Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Come indicato dal campo " <code translate="no">DocType</code> " nella tabella seguente, Milvus contrassegnerà tutte le entità con il campo " <code translate="no">doctype</code> " impostato su " <code translate="no">abstract</code> " per l'ulteriore elaborazione.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo di documento</p></th>
<th><p>Punteggio</p></th>
<th><p>Posizione</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titolo</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0,189</p></td>
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
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Applicare il peso specificato nel Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Tutte le entità identificate nel passaggio precedente saranno moltiplicate per il peso specificato nel Boost Ranker, determinando una variazione delle loro posizioni in classifica.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>TipoDocumento</p></th>
<th><p>Punteggio</p></th>
<th><p>Punteggio ponderato </p><p>(= punteggio x peso)</p></th>
<th><p>Posizione</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0,578</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titolo</p></td>
<td><p>0,788</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0,899</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corpo</p></td>
<td><p>0,265</p></td>
<td><p>0,265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>0,423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0,0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>Il peso deve essere un numero in virgola mobile a scelta dell'utente. In casi come l'esempio sopra riportato, in cui un punteggio più basso indica una maggiore rilevanza, utilizzare un peso inferiore a <strong>1</strong>. In caso contrario, utilizzare un peso superiore a <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Aggregare i candidati di tutti i segmenti in base ai punteggi ponderati per finalizzare i risultati.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>TipoDocumento</p></th>
<th><p>Punteggio</p></th>
<th><p>Punteggio ponderato</p></th>
<th><p>Posizione</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Utilizzo di Boost Ranker<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione vedrai alcuni esempi su come utilizzare Boost Ranker per influenzare i risultati di una ricerca a vettore singolo.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Creazione di un Boost Ranker<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Prima di passare un Boost Ranker come funzione di riclassificazione di una richiesta di ricerca, è necessario definire correttamente il Boost Ranker come funzione di riclassificazione come segue:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BoostRanker;

<span class="hljs-type">BoostRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> BoostRanker.builder()
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .filter(<span class="hljs-string">&quot;doctype == \&quot;abstract\&quot;&quot;</span>)
        .weight(<span class="hljs-number">0.5f</span>)
        .randomScoreField(<span class="hljs-string">&quot;id&quot;</span>)
        .randomScoreSeed(<span class="hljs-number">126L</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFilter</span>(<span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.5</span>);
<span class="hljs-comment">// Note: SetRandomScoreField()/SetRandomScoreSeed() are not usable as of</span>
<span class="hljs-comment">// milvus-sdk-cpp v3.0.3 - the SDK sends the seed as a string, which the</span>
<span class="hljs-comment">// server rejects (a numeric seed is required).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
      <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;id&quot;</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> RANKER=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;boost&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;boost&quot;,
        &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
        &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
        &quot;weight&quot;: 0.5
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Obbligatorio?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore/Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Identificatore univoco per questa funzione</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Elenco dei campi vettoriali a cui applicare la funzione (deve essere vuoto per Boost Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il tipo di funzione da invocare; utilizzare <code translate="no">RERANK</code> per specificare una strategia di riclassificazione</p></td>
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
     <td><p>Specifica il peso che verrà moltiplicato per i punteggi di eventuali entità corrispondenti nei risultati di ricerca grezzi.</p><p>Il valore deve essere un numero in virgola mobile. </p><ul><li><p>Per enfatizzare l'importanza delle entità corrispondenti, impostarlo su un valore che aumenti i punteggi.</p></li><li><p>Per sminuire l’importanza delle entità corrispondenti, assegnare a questo parametro un valore che ne riduca i punteggi.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>No</p></td>
     <td><p>Specifica l’espressione di filtro che verrà utilizzata per individuare le entità corrispondenti tra quelle presenti nei risultati della ricerca. Può essere qualsiasi espressione di filtro di base valida menzionata nella sezione <a href="/docs/it/boolean.md">“Spiegazione del filtraggio</a>”.</p><p><strong>Nota</strong>: utilizzare solo operatori di base, come <code translate="no">==</code>, <code translate="no">&gt;</code> o <code translate="no">&lt;</code>. L'uso di operatori avanzati, come <code translate="no">text_match</code> o <code translate="no">phrase_match</code>, comprometterà le prestazioni della ricerca.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>No</p></td>
     <td><p>Specifica la funzione casuale che genera in modo casuale un valore compreso tra <code translate="no">0</code> e <code translate="no">1</code>. Dispone dei seguenti due argomenti opzionali:</p><ul><li><p><code translate="no">seed</code> (numero) Specifica un valore iniziale utilizzato per avviare un generatore di numeri pseudocasuali (PRNG).</p></li><li><p><code translate="no">field</code> (stringa) Specifica il nome di un campo il cui valore verrà utilizzato come fattore casuale nella generazione del numero casuale. È sufficiente un campo con valori univoci.</p><p>Si consiglia di impostare sia <code translate="no">seed</code> che <code translate="no">field</code> per garantire la coerenza tra le generazioni utilizzando gli stessi valori di seme e di campo.</p></li></ul></td>
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
    </button></h3><p>Una volta che la funzione Boost Ranker è pronta, è possibile farvi riferimento in una richiesta di ricerca. L’esempio seguente presuppone che sia già stata creata una collezione con i seguenti campi: <strong>id</strong>, <strong>vector</strong> e <strong>doctype</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=rerank
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{
    entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>},
}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(entity.NewFunctionScore().AddFunction(rerank)))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank.<span class="hljs-title function_ invoke__">clone</span>()))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Connect to the Milvus server</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-comment">// Assume you have a collection set up</span>

<span class="hljs-comment">// Conduct a similarity search</span>
<span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;doctype&#x27;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: rerank,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results:&#x27;</span>, searchResults);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
                    &quot;weight&quot;: 0.5
                }
            }
        ]
    }
}&#x27;</span>
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
    </button></h3><p>È possibile combinare più Boost Ranker in un'unica ricerca per influenzare i risultati della ricerca. A tal fine, creare diversi Boost Ranker, farvi riferimento in un'istanza <strong>FunctionScore</strong> e utilizzare l'istanza <strong>FunctionScore</strong> come ranker nella richiesta di ricerca.</p>
<p>L’esempio seguente mostra come modificare i punteggi di tutte le entità identificate applicando un peso compreso tra <strong>0,8</strong> e <strong>1,2</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
    params={
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">fixWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)
        .build();

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">randomWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)
        .param(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
        .build();

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>);
params.put(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>);

<span class="hljs-type">FunctionScore</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> FunctionScore.builder()
        .addFunction(fixWeightRanker)
        .addFunction(randomWeightRanker)
        .params(params)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954382375778f</span>, <span class="hljs-number">0.4479436794798608f</span>, -<span class="hljs-number">0.17493894838751745f</span>, -<span class="hljs-number">0.4248030059917294f</span>, -<span class="hljs-number">0.8648452746018911f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(ranker)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

fixWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)

randomWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)

ranker := entity.NewFunctionScore().
    AddFunction(fixWeightRanker).
    AddFunction(randomWeightRanker).
    WithParam(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>}}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(ranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">fix_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">random_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_function</span>(fix_weight_ranker)
    .<span class="hljs-title function_ invoke__">add_function</span>(random_weight_ranker)
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;boost_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Multiply&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;function_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Sum&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> fix_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
fix_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.8</span>);

<span class="hljs-keyword">auto</span> random_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
random_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.4</span>);
<span class="hljs-comment">// Note: SetRandomScoreSeed() is not usable as of milvus-sdk-cpp v3.0.3 —</span>
<span class="hljs-comment">// the SDK sends the seed as a string, which the server rejects.</span>

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(fix_weight_ranker);
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(random_weight_ranker);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> fix_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.8</span>,
  },
};

<span class="hljs-keyword">const</span> random_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.4</span>,
  },
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">functions</span>: [fix_weight_ranker, random_weight_ranker],
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">boost_mode</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
    <span class="hljs-attr">function_mode</span>: <span class="hljs-string">&quot;Sum&quot;</span>,
  },
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doctype&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;weight&quot;: 0.8
                }
            },
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126},
                    &quot;weight&quot;: 0.4
                }
            }
        ],
        &quot;params&quot;: {
            &quot;boost_mode&quot;: &quot;Multiply&quot;,
            &quot;function_mode&quot;: &quot;Sum&quot;
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nello specifico, sono presenti due Boost Ranker: uno applica un peso fisso a tutte le entità trovate, mentre l’altro assegna loro un peso casuale. Successivamente, si fa riferimento a questi due ranker in un <strong>FunctionScore</strong>, che definisce anche in che modo i pesi influenzano i punteggi delle entità trovate.</p>
<p>La tabella seguente elenca i parametri necessari per creare un’istanza <strong>di FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Obbligatorio?</p></th>
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
     <td><p>Specifica in che modo i pesi indicati influenzano i punteggi delle entità corrispondenti.</p><p>I valori possibili sono:</p><ul><li><p><code translate="no">Multiply</code></p><p>Indica che il valore ponderato è pari al punteggio originale di un'entità corrispondente moltiplicato per il peso specificato. </p><p>Questo è il valore predefinito.</p></li><li><p><code translate="no">Sum</code></p><p>Indica che il valore ponderato è pari alla somma del punteggio originale di un'entità corrispondente e del peso specificato</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>No</p></td>
     <td><p>Specifica come vengono elaborati i valori ponderati provenienti da vari Boost Ranker.</p><p>I valori possibili sono:</p><ul><li><p><code translate="no">Multiply</code></p><p>Indica che il punteggio finale di un'entità corrispondente è pari al prodotto dei valori ponderati provenienti da tutti i Boost Ranker.</p><p>Questo è il valore predefinito.</p></li><li><p><code translate="no">Sum</code></p><p>Indica che il punteggio finale di un'entità corrispondente è pari alla somma dei valori ponderati provenienti da tutti i Boost Ranker.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
