---
id: json-shredding.md
title: Triturazione JSONCompatible with Milvus 2.6.2+
summary: >-
  La triturazione JSON accelera le query JSON convertendo l'archiviazione
  tradizionale basata sulle righe in archiviazione colonnare ottimizzata. Pur
  mantenendo la flessibilità di JSON per la modellazione dei dati, Milvus esegue
  un'ottimizzazione colonnare dietro le quinte che migliora notevolmente
  l'accesso e l'efficienza delle query.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Triturazione JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>La triturazione JSON accelera le query JSON convertendo l'archiviazione tradizionale basata sulle righe in archiviazione colonnare ottimizzata. Pur mantenendo la flessibilità di JSON per la modellazione dei dati, Milvus esegue un'ottimizzazione colonnare dietro le quinte che migliora notevolmente l'accesso e l'efficienza delle query.</p>
<p>La triturazione di JSON è efficace per la maggior parte degli scenari di query JSON. I vantaggi in termini di prestazioni diventano più evidenti con:</p>
<ul>
<li><p><strong>Documenti JSON più grandi e complessi</strong> - Maggiori guadagni di prestazioni con l'aumentare delle dimensioni del documento</p></li>
<li><p><strong>Carichi di lavoro pesanti in lettura</strong> - Filtri, ordinamenti o ricerche frequenti su chiavi JSON</p></li>
<li><p><strong>Modelli di query misti</strong> - Le query su diverse chiavi JSON traggono vantaggio dall'approccio di archiviazione ibrida.</p></li>
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
    </button></h2><p>Il processo di triturazione JSON avviene in tre fasi distinte per ottimizzare i dati per un rapido recupero.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Fase 1: Ingestione e classificazione delle chiavi<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando vengono scritti nuovi documenti JSON, Milvus li campiona e li analizza continuamente per costruire statistiche per ogni chiave JSON. Questa analisi include il rapporto di occorrenza della chiave e la stabilità del tipo (se il suo tipo di dati è coerente tra i documenti).</p>
<p>Sulla base di queste statistiche, le chiavi JSON vengono classificate nelle seguenti categorie per una conservazione ottimale.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Categorie di chiavi JSON</h4><table>
   <tr>
     <th><p>Tipo di chiave</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p>Chiavi digitate</p></td>
     <td><p>Chiavi che esistono nella maggior parte dei documenti e che hanno sempre lo stesso tipo di dati (ad esempio, tutti i numeri interi o tutte le stringhe).</p></td>
   </tr>
   <tr>
     <td><p>Chiavi dinamiche</p></td>
     <td><p>Chiavi che compaiono frequentemente ma hanno un tipo di dati misto (ad esempio, a volte una stringa, a volte un intero).</p></td>
   </tr>
   <tr>
     <td><p>Chiavi condivise</p></td>
     <td><p>Chiavi che compaiono di rado o che si annidano al di sotto di una soglia di frequenza configurabile<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Esempio di classificazione</h4><p>Consideriamo i dati JSON di esempio contenenti le seguenti chiavi JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>In base a questi dati, le chiavi verrebbero classificate come segue:</p>
<ul>
<li><p><strong>Chiavi digitate</strong>: <code translate="no">a</code> e <code translate="no">f</code> (sempre un intero)</p></li>
<li><p><strong>Chiavi dinamiche</strong>: <code translate="no">b</code> (misto stringa/integro)</p></li>
<li><p><strong>Chiavi condivise</strong>: <code translate="no">e</code> (chiave che appare raramente).</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Fase 2: ottimizzazione dello storage<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>La classificazione della <a href="/docs/it/json-shredding.md#Phase-1-Ingestion--key-classification">fase 1</a> determina il layout di memorizzazione. Milvus utilizza un formato colonnare ottimizzato per le query.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Flusso di triturazione Json</span> </span></p>
<ul>
<li><p><strong>Colonne triturate</strong>: Per le <strong>chiavi</strong> <strong>digitate</strong> e <strong>dinamiche</strong>, i dati vengono scritti in colonne dedicate. Questa archiviazione a colonne consente scansioni rapide e dirette durante le interrogazioni, poiché Milvus può leggere solo i dati necessari per una determinata chiave senza elaborare l'intero documento.</p></li>
<li><p><strong>Colonna condivisa</strong>: Tutte le <strong>chiavi condivise</strong> sono memorizzate insieme in un'unica colonna JSON binaria e compatta. Su questa colonna viene costruito un <strong>indice inverso</strong> a chiave condivisa. Questo indice è fondamentale per accelerare le query sulle chiavi a bassa frequenza, consentendo a Milvus di sfrondare rapidamente i dati, restringendo di fatto lo spazio di ricerca alle sole righe che contengono la chiave specificata.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Fase 3: Esecuzione delle query<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>La fase finale sfrutta il layout di archiviazione ottimizzato per selezionare in modo intelligente il percorso più veloce per ogni predicato della query.</p>
<ul>
<li><p><strong>Percorso veloce</strong>: Le query su chiavi digitate/dinamiche (ad esempio, <code translate="no">json['a'] &lt; 100</code>) accedono direttamente alle colonne dedicate.</p></li>
<li><p><strong>Percorso ottimizzato</strong>: Le query su chiavi condivise (ad esempio, <code translate="no">json['e'] = 'rare'</code>) utilizzano l'indice invertito per individuare rapidamente i documenti pertinenti.</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Abilitazione della triturazione JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Per attivare la funzione, impostare <code translate="no">common.enabledJSONKeyStats</code> su <code translate="no">true</code> nel file di configurazione <code translate="no">milvus.yaml</code>. I nuovi dati attivano automaticamente il processo di distruzione.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONKeyStats:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta abilitato, Milvus inizierà ad analizzare e ristrutturare i dati JSON al momento dell'ingestione senza ulteriori interventi manuali.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Regolazione dei parametri<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Per la maggior parte degli utenti, una volta abilitata la triturazione JSON, le impostazioni predefinite per gli altri parametri sono sufficienti. Tuttavia, è possibile regolare con precisione il comportamento della triturazione JSON utilizzando questi parametri in <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Parametro Nome</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore predefinito</p></th>
     <th><p>Consigli per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONKeyStats</code></p></td>
     <td><p>Controlla se i processi di costruzione e di caricamento di JSON shredding sono abilitati.</p></td>
     <td><p>Falso</p></td>
     <td><p>Deve essere impostato su <strong>true</strong> per attivare la funzione.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingJsonStatsForQuery</code></p></td>
     <td><p>Controlla se Milvus utilizza i dati triturati per l'accelerazione.</p></td>
     <td><p>vero</p></td>
     <td><p>Impostato su <strong>false</strong> come misura di recupero in caso di errore delle query, per tornare al percorso originale della query.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonStats</code></p></td>
     <td><p>Determina se Milvus usa mmap quando carica i dati triturati.</p><p>Per i dettagli, consultare <a href="/docs/it/mmap.md">Usa mmap</a>.</p></td>
     <td><p>vero</p></td>
     <td><p>Questa impostazione è generalmente ottimizzata per le prestazioni. Regolatela solo se avete esigenze o vincoli specifici di gestione della memoria sul vostro sistema.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code></p></td>
     <td><p>Il numero massimo di chiavi JSON che verranno memorizzate nelle colonne triturate. </p><p>Se il numero di chiavi che compaiono frequentemente supera questo limite, Milvus darà priorità a quelle più frequenti per la triturazione e le chiavi rimanenti saranno memorizzate nella colonna condivisa.</p></td>
     <td><p>1024</p></td>
     <td><p>Questo limite è sufficiente per la maggior parte degli scenari. Per JSON con migliaia di chiavi frequenti, potrebbe essere necessario aumentare questo limite, ma è necessario monitorare l'utilizzo della memoria.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsShreddingRatioThreshold</code></p></td>
     <td><p>Il rapporto minimo di ricorrenze che una chiave JSON deve avere per essere considerata per la triturazione in una colonna tritata.</p><p>Una chiave è considerata frequente se il suo rapporto è superiore a questa soglia.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Aumenta</strong> (ad esempio, a 0,5) se il numero di chiavi che soddisfano i criteri di frantumazione supera il limite di <code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code>. In questo modo si rende più severa la soglia, riducendo il numero di chiavi che si qualificano per la triturazione.</p><p><strong>Diminuire</strong> (ad esempio, a 0,1) se si desidera distruggere un numero maggiore di chiavi che appaiono meno frequentemente della soglia predefinita del 30%.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Parametri di riferimento delle prestazioni<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>I nostri test dimostrano miglioramenti significativi delle prestazioni su diversi tipi di chiavi JSON e modelli di query.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Ambiente e metodologia di test<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Hardware</strong>: cluster da 1 core/8GB</p></li>
<li><p><strong>Set di dati</strong>: 1 milione di documenti da <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Dimensione media del documento</strong>: 478,89 byte</p></li>
<li><p><strong>Durata del test</strong>: 100 secondi per misurare QPS e latenza</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Risultati: chiavi digitate<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Questo test ha misurato le prestazioni quando si interroga una chiave presente nella maggior parte dei documenti.</p>
<table>
   <tr>
     <th><p>Espressione della query</p></th>
     <th><p>Tipo di valore della chiave</p></th>
     <th><p>QPS (senza triturazione)</p></th>
     <th><p>QPS (con triturazione)</p></th>
     <th><p>Incremento delle prestazioni</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Intero</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Stringa</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Risultati: chiavi condivise<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Questo test si è concentrato sull'interrogazione di chiavi rade e annidate che rientrano nella categoria "condivise".</p>
<table>
   <tr>
     <th><p>Espressione della query</p></th>
     <th><p>Tipo di valore della chiave</p></th>
     <th><p>QPS (senza triturazione)</p></th>
     <th><p>QPS (con triturazione)</p></th>
     <th><p>Incremento delle prestazioni</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Intero annidato</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Stringa annidata</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Approfondimenti sulle chiavi<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Le<strong>query a chiave condivisa</strong> mostrano i miglioramenti più evidenti (fino a 89 volte più veloci)</p></li>
<li><p><strong>Le query con chiave digitata</strong> forniscono un aumento costante delle prestazioni di 15-30 volte</p></li>
<li><p><strong>Tutti i tipi di query</strong> traggono vantaggio dal JSON Shredding senza regressioni di prestazioni</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Come posso verificare se la triturazione JSON funziona correttamente?</strong></p>
<ol>
<li><p>Per prima cosa, verificare se i dati sono stati costruiti utilizzando il comando <code translate="no">show segment --format table</code> nello strumento <a href="/docs/it/birdwatcher_usage_guides.md">Birdwatcher</a>. In caso di successo, l'output conterrà <code translate="no">shredding_data/</code> e <code translate="no">shared_key_index/</code> nel campo <strong>Json Key Stats</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Output di Birdwatcher</span> </span></p></li>
<li><p>Quindi, verificare che i dati siano stati caricati eseguendo <code translate="no">show loaded-json-stats</code> sul nodo della query. L'output mostrerà i dettagli dei dati triturati caricati per ogni nodo di query.</p></li>
</ol></li>
<li><p><strong>Come si sceglie tra la triturazione JSON e l'indicizzazione JSON?</strong></p>
<ul>
<li><p>La<strong>triturazione JSON</strong> è ideale per le chiavi che appaiono frequentemente nei documenti, soprattutto per le strutture JSON complesse. Combina i vantaggi dell'archiviazione colonnare e dell'indicizzazione inversa, rendendola adatta a scenari di lettura intensiva in cui si interrogano molte chiavi diverse. Tuttavia, non è consigliata per documenti JSON molto piccoli, poiché il guadagno in termini di prestazioni è minimo. Quanto minore è la proporzione tra il valore della chiave e la dimensione totale del documento JSON, tanto migliore sarà l'ottimizzazione delle prestazioni grazie alla triturazione.</p></li>
<li><p>L<strong>'indicizzazione JSON</strong> è migliore per l'ottimizzazione mirata di query specifiche basate su chiavi e ha un minore overhead di memorizzazione. È adatta alle strutture JSON più semplici. Si noti che la triturazione JSON non copre le query su chiavi all'interno di array, per cui è necessario un indice JSON per accelerarle.</p></li>
</ul></li>
<li><p><strong>Cosa succede se si verifica un errore?</strong></p>
<p>Se il processo di compilazione o di caricamento fallisce, è possibile disabilitare rapidamente la funzione impostando <code translate="no">common.enabledJSONKeyStats=false</code>. Per cancellare i compiti rimanenti, utilizzare il comando <code translate="no">remove stats-task &lt;task_id&gt;</code> in <a href="/docs/it/birdwatcher_usage_guides.md">Birdwatcher</a>. Se una query non va a buon fine, impostare <code translate="no">common.usingJsonStatsForQuery=false</code> per tornare al percorso originale della query, aggirando i dati triturati.</p></li>
</ul>
