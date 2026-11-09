---
id: json-shredding.md
title: JSON ShreddingCompatible with Milvus 2.6.2+
summary: >-
  Lo "shredding" JSON accelera le query JSON convertendo la tradizionale
  archiviazione basata su righe in un'archiviazione colonnare ottimizzata. Pur
  mantenendo la flessibilità di JSON nella modellazione dei dati, Milvus esegue
  in background un'ottimizzazione colonnare che migliora notevolmente
  l'efficienza dell'accesso e delle query.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON Shredding<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>Lo shredding JSON accelera le query JSON convertendo la tradizionale archiviazione basata su righe in un'archiviazione colonnare ottimizzata. Pur mantenendo la flessibilità di JSON per la modellazione dei dati, Milvus esegue in background un'ottimizzazione colonnare che migliora notevolmente l'efficienza di accesso e delle query.</p>
<p>Lo shredding JSON è efficace nella maggior parte degli scenari di query JSON. I vantaggi in termini di prestazioni diventano più evidenti con:</p>
<ul>
<li><p><strong>Documenti JSON più grandi e complessi</strong>: maggiori miglioramenti delle prestazioni all’aumentare delle dimensioni dei documenti</p></li>
<li><p><strong>Carichi di lavoro con un'elevata attività di lettura</strong> - Filtraggio, ordinamento o ricerca frequenti sulle chiavi JSON</p></li>
<li><p><strong>Modelli di query misti</strong>: le query su diverse chiavi JSON traggono vantaggio dall’approccio di archiviazione ibrido</p></li>
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
    </button></h2><p>Il processo di shredding JSON si svolge in tre fasi distinte per ottimizzare i dati in vista di un recupero veloce.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Fase 1: Acquisizione e classificazione delle chiavi<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>Man mano che vengono scritti nuovi documenti JSON, Milvus li campiona e li analizza continuamente per elaborare statistiche relative a ciascuna chiave JSON. Questa analisi include il rapporto di occorrenza della chiave e la stabilità del tipo (ovvero se il tipo di dati è coerente tra i documenti).</p>
<p>Sulla base di queste statistiche, le chiavi JSON vengono classificate nelle seguenti categorie per garantire un'archiviazione ottimale.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Categorie delle chiavi JSON</h4><table>
   <tr>
     <th><p>Tipo di chiave</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p>Chiavi tipizzate</p></td>
     <td><p>Chiavi presenti nella maggior parte dei documenti e che hanno sempre lo stesso tipo di dati (ad esempio, tutte intere o tutte stringhe).</p></td>
   </tr>
   <tr>
     <td><p>Chiavi dinamiche</p></td>
     <td><p>Chiavi che compaiono frequentemente ma hanno un tipo di dati misto (ad esempio, a volte una stringa, a volte un numero intero).</p></td>
   </tr>
   <tr>
     <td><p>Chiavi condivise</p></td>
     <td><p>Chiavi che compaiono raramente o sono annidate e che non superano una soglia di frequenza configurabile<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Esempio di classificazione</h4><p>Si consideri il dato JSON di esempio contenente le seguenti chiavi JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sulla base di questi dati, le chiavi verrebbero classificate come segue:</p>
<ul>
<li><p><strong>Chiavi tipizzate</strong>: <code translate="no">a</code> e <code translate="no">f</code> (sempre un numero intero)</p></li>
<li><p><strong>Chiavi dinamiche</strong>: <code translate="no">b</code> (combinazione di stringa e numero intero)</p></li>
<li><p><strong>Chiavi condivise</strong>: <code translate="no">e</code> (chiave che compare raramente)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Fase 2: Ottimizzazione dell’archiviazione<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>La classificazione della <a href="/docs/it/json-shredding.md#Phase-1-Ingestion--key-classification">Fase 1</a> determina la struttura di archiviazione. Milvus utilizza un formato a colonne ottimizzato per le query.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>Flusso di suddivisione JSON</span>
  
 </span></p>
<ul>
<li><p><strong>Colonne frammentate</strong>: per <strong>le chiavi</strong> <strong>tipizzate</strong> e <strong>dinamiche</strong>, i dati vengono scritti in colonne dedicate. Questo archiviazione a colonne consente scansioni veloci e dirette durante le query, poiché Milvus può leggere solo i dati necessari per una determinata chiave senza elaborare l’intero documento.</p></li>
<li><p><strong>Colonna condivisa</strong>: tutte <strong>le chiavi condivise</strong> vengono memorizzate insieme in un'unica colonna JSON binaria compatta. Su questa colonna viene costruito un <strong>indice invertito</strong> delle chiavi condivise. Questo indice è fondamentale per accelerare le query sulle chiavi a bassa frequenza, consentendo a Milvus di sfoltire rapidamente i dati, restringendo efficacemente lo spazio di ricerca alle sole righe che contengono la chiave specificata.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Fase 3: Esecuzione della query<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>La fase finale sfrutta il layout di archiviazione ottimizzato per selezionare in modo intelligente il percorso più veloce per ogni predicato di query.</p>
<ul>
<li><p><strong>Percorso veloce</strong>: le query su chiavi tipizzate/dinamiche (ad es., <code translate="no">json['a'] &lt; 100</code>) accedono direttamente alle colonne dedicate</p></li>
<li><p><strong>Percorso ottimizzato</strong>: le query su chiavi condivise (ad es., <code translate="no">json['e'] = 'rare'</code>) utilizzano l’indice invertito per individuare rapidamente i documenti pertinenti</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Abilita lo shredding JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Per attivare la funzionalità, imposta ` <code translate="no">common.enabledJSONShredding</code> ` su ` <code translate="no">true</code> ` nel tuo file di configurazione ` <code translate="no">milvus.yaml</code> `. I nuovi dati attiveranno automaticamente il processo di shredding.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta abilitato, Milvus inizierà ad analizzare e ristrutturare i dati JSON al momento dell’acquisizione senza alcun ulteriore intervento manuale.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Ottimizzazione dei parametri<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Per la maggior parte degli utenti, una volta abilitato lo shredding JSON, le impostazioni predefinite per gli altri parametri sono sufficienti. Tuttavia, è possibile ottimizzare il comportamento dello shredding JSON utilizzando questi parametri in <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Nome del parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore predefinito</p></th>
     <th><p>Suggerimenti per la regolazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Determina se i processi di compilazione e caricamento dello shredding JSON sono abilitati.</p></td>
     <td><p>false</p></td>
     <td><p>Deve essere impostato su <strong>true</strong> per attivare la funzionalità.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Determina se Milvus utilizza i dati frammentati per l'accelerazione.</p></td>
     <td><p>true</p></td>
     <td><p>Impostare su <strong>false</strong> come misura di ripristino in caso di errore delle query, per tornare al percorso di query originale.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Determina se Milvus utilizza mmap durante il caricamento dei dati frammentati.</p><p>Per ulteriori dettagli, consultare la sezione " <a href="/docs/it/mmap.md">Utilizzo di mmap</a>".</p></td>
     <td><p>true</p></td>
     <td><p>Questa impostazione è generalmente ottimizzata per le prestazioni. Modificarla solo se si hanno esigenze specifiche di gestione della memoria o vincoli sul proprio sistema.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>Il numero massimo di chiavi JSON che verranno memorizzate nelle colonne frammentate. </p><p>Se il numero di chiavi che compaiono frequentemente supera questo limite, Milvus darà la priorità a quelle più frequenti per lo shredding, mentre le chiavi rimanenti verranno memorizzate nella colonna condivisa.</p></td>
     <td><p>1024</p></td>
     <td><p>Questo valore è sufficiente per la maggior parte degli scenari. Per i dati JSON con migliaia di chiavi che compaiono frequentemente, potrebbe essere necessario aumentarlo, ma è necessario monitorare l’utilizzo dello spazio di archiviazione.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>Il rapporto minimo di occorrenza che una chiave JSON deve avere per essere presa in considerazione per la suddivisione in una colonna frammentata.</p><p>Una chiave è considerata frequente se il suo rapporto è superiore a questa soglia.</p></td>
     <td><p>0,3</p></td>
     <td><p><strong>Aumentare</strong> (ad esempio, a 0,5) se il numero di chiavi che soddisfano i criteri di shredding supera il limite " <code translate="no">dataCoord.jsonShreddingMaxColumns</code> ". Ciò rende la soglia più rigorosa, riducendo il numero di chiavi idonee allo shredding.</p><p><strong>Ridurla</strong> (ad es., a 0,1) se si desidera suddividere un maggior numero di chiavi che compaiono con frequenza inferiore alla soglia predefinita del 30%.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Test delle prestazioni<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Ambiente di test e metodologia<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>Hardware</strong>: cluster da 1 core/8 GB</p></li>
<li><p><strong>Set di dati</strong>: 1 milione di documenti provenienti da <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Dimensione media dei documenti</strong>: 478,89 byte</p></li>
<li><p><strong>Durata del test</strong>: 100 secondi per la misurazione di QPS e latenza</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Risultati: chiavi tipizzate<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Questo test ha misurato le prestazioni durante l'interrogazione di una chiave presente nella maggior parte dei documenti.</p>
<table>
   <tr>
     <th><p>Espressione di query</p></th>
     <th><p>Tipo di valore della chiave</p></th>
     <th><p>QPS (senza shredding)</p></th>
     <th><p>QPS (con shredding)</p></th>
     <th><p>Aumento delle prestazioni</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Numero intero</p></td>
     <td><p>8,69</p></td>
     <td><p>287,50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Stringa</p></td>
     <td><p>8,42</p></td>
     <td><p>126,1</p></td>
     <td><p>14,9x</p></td>
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
    </button></h3><p>Questo test si è concentrato sull'interrogazione di chiavi sparse e annidate che rientrano nella categoria "condivise".</p>
<table>
   <tr>
     <th><p>Espressione di query</p></th>
     <th><p>Tipo di valore della chiave</p></th>
     <th><p>QPS (senza shredding)</p></th>
     <th><p>QPS (con shredding)</p></th>
     <th><p>Aumento delle prestazioni</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Numero intero annidato</p></td>
     <td><p>4,33</p></td>
     <td><p>385</p></td>
     <td><p>88,9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Stringa annidata</p></td>
     <td><p>7,6</p></td>
     <td><p>352</p></td>
     <td><p>46,3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Approfondimenti chiave<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>Le query con chiave condivisa</strong> mostrano i miglioramenti più significativi (fino a 89 volte più veloci)</p></li>
<li><p><strong>Le query con chiave tipizzata</strong> garantiscono miglioramenti costanti delle prestazioni da 15 a 30 volte superiori</p></li>
<li><p><strong>Tutti i tipi di query</strong> traggono vantaggio dallo "shredding" JSON senza alcuna perdita di prestazioni</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">Domande frequenti<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Come posso verificare se lo "shredding" JSON funziona correttamente?</strong></p>
<ol>
<li><p>Innanzitutto, verifica se i dati sono stati generati utilizzando il comando " <code translate="no">show segment --format table</code> " nello strumento <a href="/docs/it/birdwatcher_usage_guides.md">Birdwatcher</a>. Se l'operazione ha esito positivo, l'output conterrà " <code translate="no">shredding_data/</code> " e " <code translate="no">shared_key_index/</code> " nel campo " <strong>Json Key Stats</strong> ".</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Output di Birdwatcher</span>
  
 </span></p></li>
<li><p>Successivamente, verifica che i dati siano stati caricati eseguendo <code translate="no">show loaded-json-stats</code> sul nodo di query. L'output mostrerà i dettagli relativi ai dati frammentati caricati per ciascun nodo di query.</p></li>
</ol></li>
<li><p><strong>Cosa succede se si verifica un errore?</strong></p>
<p>Se il processo di creazione o di caricamento fallisce, è possibile disabilitare rapidamente la funzionalità impostando <code translate="no">common.enabledJSONShredding=false</code>. Per cancellare eventuali attività rimanenti, utilizzare il comando <code translate="no">remove stats-task &lt;task_id&gt;</code> in <a href="/docs/it/birdwatcher_usage_guides.md">Birdwatcher</a>. Se una query fallisce, impostare <code translate="no">common.usingjsonShreddingForQuery=false</code> per tornare al percorso di query originale, bypassando i dati frammentati.</p></li>
</ul>
<ul>
<li><p><strong>Come si sceglie tra lo shredding JSON e l’indicizzazione JSON?</strong></p>
<ul>
<li><p><strong>Lo shredding JSON</strong> è ideale per le chiavi che compaiono frequentemente nei documenti, specialmente per strutture JSON complesse. Combina i vantaggi dell’archiviazione a colonne e dell’indicizzazione invertita, rendendolo particolarmente adatto a scenari con un’elevata attività di lettura in cui si eseguono query su molte chiavi diverse. Tuttavia, non è consigliato per documenti JSON molto piccoli poiché il guadagno in termini di prestazioni è minimo. Minore è la proporzione del valore della chiave rispetto alla dimensione totale del documento JSON, maggiore sarà l’ottimizzazione delle prestazioni ottenuta grazie allo shredding.</p></li>
<li><p><strong>L’indicizzazione JSON</strong> è più indicata per l’ottimizzazione mirata di query specifiche basate su chiavi e comporta un overhead di archiviazione inferiore. È adatta a strutture JSON più semplici. Si noti che lo shredding JSON non copre le query sulle chiavi all’interno degli array, pertanto è necessario un indice JSON per accelerarle.</p></li>
</ul>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/json-field-overview.md#Next-Accelerate-JSON-queries">la panoramica sui campi JSON</a>.</p></li>
</ul>
