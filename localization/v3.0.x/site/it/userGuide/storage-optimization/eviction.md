---
id: eviction.md
title: EvacuazioneCompatible with Milvus 2.6.4+
summary: >-
  Eviction gestisce le risorse della cache di ogni QueryNode in Milvus. Quando è
  abilitata, rimuove automaticamente i dati nella cache una volta raggiunte le
  soglie di risorse, garantendo prestazioni stabili e prevenendo l'esaurimento
  della memoria o del disco.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Evacuazione<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>Eviction gestisce le risorse della cache di ogni QueryNode in Milvus. Quando è abilitata, rimuove automaticamente i dati nella cache una volta raggiunte le soglie di risorse, garantendo prestazioni stabili e prevenendo l'esaurimento della memoria o del disco.</p>
<p>L'eviction utilizza una politica di <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">utilizzo minimo recente (LRU)</a> per recuperare spazio nella cache. I metadati sono sempre memorizzati nella cache e non vengono mai evitati, poiché sono essenziali per la pianificazione delle query e tipicamente di piccole dimensioni.</p>
<div class="alert note">
<p>L'eviction deve essere abilitata esplicitamente. Senza configurazione, i dati in cache continueranno ad accumularsi fino all'esaurimento delle risorse.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Tipi di eviction<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta due modalità di eviction complementari<strong>(sync</strong> e <strong>async</strong>) che lavorano insieme per una gestione ottimale delle risorse:</p>
<table>
   <tr>
     <th><p>Aspetto</p></th>
     <th><p>Evacuazione sincrona</p></th>
     <th><p>Evacuazione asincrona</p></th>
   </tr>
   <tr>
     <td><p>Innesco</p></td>
     <td><p>Si verifica durante l'interrogazione o la ricerca quando l'utilizzo della memoria o del disco supera i limiti interni.</p></td>
     <td><p>Viene attivato da un thread in background quando l'utilizzo supera la soglia massima o quando i dati nella cache raggiungono il loro time-to-live (TTL).</p></td>
   </tr>
   <tr>
     <td><p>Comportamento</p></td>
     <td><p>Le operazioni di query o di ricerca si fermano temporaneamente mentre il QueryNode recupera lo spazio nella cache. Lo sfratto continua finché l'utilizzo non scende al di sotto della soglia minima o finché non si verifica un timeout. Se il timeout viene raggiunto e non è possibile recuperare dati sufficienti, la query o la ricerca possono fallire.</p></td>
     <td><p>Esegue periodicamente in background, eliminando proattivamente i dati della cache quando l'utilizzo supera la soglia massima o quando i dati scadono in base al TTL. Lo svuotamento continua finché l'utilizzo non scende al di sotto della soglia minima. Le query non vengono bloccate.</p></td>
   </tr>
   <tr>
     <td><p>Ideale per</p></td>
     <td><p>Carichi di lavoro che possono tollerare brevi picchi di latenza o pause temporanee durante i picchi di utilizzo. Utile quando lo svuotamento asincrono non può recuperare spazio abbastanza velocemente.</p></td>
     <td><p>Carichi di lavoro sensibili alla latenza che richiedono prestazioni di query uniformi e prevedibili. Ideale per la gestione proattiva delle risorse.</p></td>
   </tr>
   <tr>
     <td><p>Attenzione</p></td>
     <td><p>Può causare brevi ritardi o timeout delle query se non sono disponibili dati evitabili sufficienti.</p></td>
     <td><p>Richiede filigrane alte/basse e impostazioni TTL adeguatamente regolate. Leggero overhead del thread in background.</p></td>
   </tr>
   <tr>
     <td><p>Configurazione</p></td>
     <td><p>Abilitato tramite <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Abilitato tramite <code translate="no">backgroundEvictionEnabled: true</code> (richiede <code translate="no">evictionEnabled: true</code> allo stesso tempo)</p></td>
   </tr>
</table>
<p><strong>Configurazione consigliata</strong>:</p>
<ul>
<li><p>Entrambe le modalità di eviction possono essere attivate insieme per ottenere un equilibrio ottimale, a condizione che il carico di lavoro tragga vantaggio dall'archiviazione a livelli e possa tollerare la latenza di recupero legata all'eviction.</p></li>
<li><p>Per i test delle prestazioni o per gli scenari critici per la latenza, si consiglia di disabilitare completamente l'eviction per evitare l'overhead del fetch di rete dopo l'eviction.</p></li>
</ul>
<div class="alert note">
<p>Per i campi e gli indici evitabili, l'unità di eviction corrisponde alla granularità del caricamento: i campi scalari/vettoriali sono evitati per chunk e gli indici scalari/vettoriali sono evitati per segmento.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Abilitare l'eviction<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Configurare l'eviction in <code translate="no">queryNode.segcore.tieredStorage</code> in <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Tipo</p></th>
     <th><p>Valori</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Caso d'uso consigliato</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Interruttore principale per la strategia di sfratto. L'impostazione predefinita è <code translate="no">false</code>. Abilita la modalità di evasione della sincronizzazione.</p></td>
     <td><p>Sempre impostato su <code translate="no">true</code> nell'archiviazione a livelli.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Esegue l'evasione asincrona in background. Richiede <code translate="no">evictionEnabled: true</code>. Per impostazione predefinita, <code translate="no">false</code>.</p></td>
     <td><p>Utilizzare <code translate="no">true</code> per migliorare le prestazioni delle query; riduce la frequenza di evasione sincronizzata.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Configurare i watermark<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Le soglie definiscono l'inizio e la fine dell'evasione della cache sia per la memoria che per il disco. Ogni tipo di risorsa ha due soglie:</p>
<ul>
<li><p><strong>Filigrana alta</strong>: L'evasione inizia quando l'utilizzo supera questo valore.</p></li>
<li><p><strong>Filigrana bassa</strong>: L'evasione continua finché l'uso non scende al di sotto di questo valore.</p></li>
</ul>
<div class="alert note">
<p>Questa configurazione ha effetto solo quando <a href="/docs/it/eviction.md#Enable-eviction">lo sfratto è abilitato</a>.</p>
</div>
<p><strong>Esempio YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Tipo</p></th>
     <th><p>Intervallo</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Caso d'uso consigliato</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>galleggiante</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Livello di utilizzo della memoria in cui si interrompe lo sfratto.</p></td>
     <td><p>Iniziare da <code translate="no">0.75</code>. Abbassare leggermente se la memoria del QueryNode è limitata.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>variabile</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Livello di utilizzo della memoria in cui inizia l'evasione asincrona.</p></td>
     <td><p>Iniziare da <code translate="no">0.8</code>. Mantenere uno scarto ragionevole dalla filigrana bassa (ad esempio, 0,05-0,10) per evitare che si inneschino frequentemente.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>galleggiante</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Livello di utilizzo del disco per il quale si interrompe lo sfratto.</p></td>
     <td><p>Iniziare con <code translate="no">0.75</code>. Regolare più in basso se l'I/O del disco è limitato.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>variabile</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Livello di utilizzo del disco in cui inizia l'evasione asincrona.</p></td>
     <td><p>Iniziare da <code translate="no">0.8</code>. Mantenere uno scarto ragionevole dalla filigrana bassa (ad esempio, 0,05-0,10) per evitare che si inneschino frequentemente.</p></td>
   </tr>
</table>
<p><strong>Migliori pratiche</strong>:</p>
<ul>
<li><p>Non impostare watermark alti o bassi superiori a ~0,80 per lasciare spazio all'uso statico del QueryNode e alle raffiche di query.</p></li>
<li><p>Evitare grandi spazi tra i watermark alti e bassi; grandi spazi prolungano ogni ciclo di evacuazione e possono aggiungere latenza.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Configurare il TTL della cache<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Il Time-to-Live (TTL) della cache</strong> rimuove automaticamente i dati presenti nella cache dopo una determinata durata, anche se non vengono raggiunte le soglie delle risorse. Funziona insieme a LRU eviction per evitare che i dati stantii occupino indefinitamente la cache.</p>
<div class="alert note">
<p>Cache TTL richiede <code translate="no">backgroundEvictionEnabled: true</code>, poiché viene eseguito sullo stesso thread in background.</p>
</div>
<p><strong>Esempio di YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Tipo</p></th>
     <th><p>Unità</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Caso d'uso consigliato</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>intero</p></td>
     <td><p>secondi</p></td>
     <td><p>Durata prima della scadenza dei dati nella cache. Gli elementi scaduti vengono rimossi in background.</p></td>
     <td><p>Utilizzare un TTL breve (ore) per i dati altamente dinamici; utilizzare un TTL lungo (giorni) per i set di dati stabili. Impostare 0 per disabilitare la scadenza basata sul tempo.</p></td>
   </tr>
</table>
