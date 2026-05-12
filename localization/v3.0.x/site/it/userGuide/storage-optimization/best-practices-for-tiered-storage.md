---
id: best-practices-for-tiered-storage.md
title: Migliori pratiche per l'archiviazione a livelliCompatible with Milvus 2.6.4+
summary: >-
  Milvus offre il sistema di archiviazione a livelli per aiutarvi a gestire in
  modo efficiente i dati su larga scala, bilanciando la latenza delle query, la
  capacità e l'utilizzo delle risorse. Questa guida riassume le configurazioni
  consigliate per i carichi di lavoro tipici e spiega le ragioni di ciascuna
  strategia di ottimizzazione.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">Migliori pratiche per l'archiviazione a livelli<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus offre il sistema di archiviazione a livelli per aiutarvi a gestire in modo efficiente i dati su larga scala, bilanciando la latenza delle query, la capacità e l'utilizzo delle risorse. Questa guida riassume le configurazioni consigliate per i carichi di lavoro tipici e spiega le ragioni di ogni strategia di ottimizzazione.</p>
<h2 id="Before-you-start" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 o successivo</p></li>
<li><p>I QueryNode devono avere risorse locali dedicate (memoria e disco). Gli ambienti condivisi possono distorcere la stima della cache e causare errori di valutazione.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">Scegliere la strategia giusta<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tiered Storage offre strategie flessibili di caricamento e caching che possono essere combinate per adattarsi al carico di lavoro.</p>
<table>
   <tr>
     <th><p>Obiettivo</p></th>
     <th><p>Obiettivo consigliato</p></th>
     <th><p>Meccanismo chiave</p></th>
   </tr>
   <tr>
     <td><p>Ridurre al minimo la latenza della prima richiesta</p></td>
     <td><p>Precaricare i campi critici</p></td>
     <td><p>Riscaldare</p></td>
   </tr>
   <tr>
     <td><p>Gestire in modo efficiente i dati su larga scala</p></td>
     <td><p>Caricare su richiesta</p></td>
     <td><p>Carico pigro + carico parziale</p></td>
   </tr>
   <tr>
     <td><p>Mantenere la stabilità a lungo termine</p></td>
     <td><p>Prevenire l'overflow della cache</p></td>
     <td><p>Evacuazione</p></td>
   </tr>
   <tr>
     <td><p>Bilanciare prestazioni e capacità</p></td>
     <td><p>Combinare il precarico e la cache dinamica</p></td>
     <td><p>Configurazione ibrida</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">Scenario 1: recupero in tempo reale e a bassa latenza<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quando utilizzare</strong></p>
<ul>
<li><p>La latenza delle query è critica (ad esempio, raccomandazioni in tempo reale o ranking di ricerca)</p></li>
<li><p>Gli indici vettoriali e i filtri scalari del core vengono acceduti frequentemente</p></li>
<li><p>Le prestazioni costanti sono più importanti della velocità di avviamento</p></li>
</ul>
<p><strong>Configurazione consigliata</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Motivazione</strong></p>
<ul>
<li><p>Il warmup elimina la latenza di primo impatto per gli indici scalari e vettoriali ad alta frequenza.</p></li>
<li><p>Lo sfratto in background mantiene stabile la pressione della cache senza bloccare le query.</p></li>
<li><p>La disabilitazione del TTL della cache evita ricariche inutili per i dati caldi.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">Scenario 2: analisi offline, in batch<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quando si usa</strong></p>
<ul>
<li><p>La tolleranza alla latenza delle query è elevata</p></li>
<li><p>I carichi di lavoro coinvolgono insiemi di dati massicci o molti segmenti.</p></li>
<li><p>La capacità e il throughput sono prioritari rispetto alla reattività.</p></li>
</ul>
<p><strong>Configurazione consigliata</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Motivazione</strong></p>
<ul>
<li><p>La disabilitazione del warm-up accelera l'avvio quando si inizializzano molti segmenti.</p></li>
<li><p>Filigrane più alte consentono un uso più denso della cache, migliorando la capacità di carico totale.</p></li>
<li><p>Il TTL della cache pulisce automaticamente i dati inutilizzati per liberare spazio locale.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">Scenario 3: distribuzione ibrida (mista online + offline)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quando si usa</strong></p>
<ul>
<li><p>Un singolo cluster serve sia carichi di lavoro online che analitici.</p></li>
<li><p>Alcune collezioni richiedono una bassa latenza, mentre altre danno priorità alla capacità.</p></li>
</ul>
<p><strong>Strategia consigliata</strong></p>
<ul>
<li><p>Applicare la <strong>configurazione in tempo reale</strong> alle raccolte sensibili alla latenza.</p></li>
<li><p>Applicare la <strong>configurazione offline</strong> alle raccolte analitiche o di archivio.</p></li>
<li><p>Regolare evictableMemoryCacheRatio, cacheTtl e rapporti di filigrana in modo indipendente per ogni tipo di carico di lavoro.</p></li>
</ul>
<p><strong>Motivazione</strong></p>
<p>La combinazione delle configurazioni consente un controllo a grana fine dell'allocazione delle risorse.</p>
<p>Le raccolte critiche mantengono garanzie di bassa latenza, mentre le raccolte secondarie possono gestire più segmenti e volumi di dati.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">Ulteriori suggerimenti per la messa a punto<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Aspetto</p></th>
     <th><p>Raccomandazione</p></th>
     <th><p>Spiegazione</p></th>
   </tr>
   <tr>
     <td><p><strong>Ambito di riscaldamento</strong></p></td>
     <td><p>Precaricare solo i campi o gli indici con un'alta frequenza di query.</p></td>
     <td><p>Il precaricamento non necessario aumenta il tempo di caricamento e l'uso delle risorse.</p></td>
   </tr>
   <tr>
     <td><p><strong>Regolazione dello svuotamento</strong></p></td>
     <td><p>Iniziare con le filigrane predefinite (75-80%) e regolare gradualmente.</p></td>
     <td><p>Uno scarto ridotto provoca uno svuotamento frequente; uno scarto elevato ritarda il rilascio delle risorse.</p></td>
   </tr>
   <tr>
     <td><p><strong>TTL della cache</strong></p></td>
     <td><p>Disattivare per i dataset stabili e caldi; attivare (ad esempio, 1-3 giorni) per i dati dinamici.</p></td>
     <td><p>Impedisce l'accumulo di cache stantie e bilancia i costi di pulizia.</p></td>
   </tr>
   <tr>
     <td><p><strong>Rapporto di overcommit</strong></p></td>
     <td><p>Evitare valori &gt; 0,7 a meno che le risorse non siano ampie.</p></td>
     <td><p>Un overcommit eccessivo può causare il thrashing della cache e una latenza instabile.</p></td>
   </tr>
   <tr>
     <td><p><strong>Monitoraggio</strong></p></td>
     <td><p>Tenete traccia del rapporto di hit della cache, dell'utilizzo delle risorse e della frequenza di evasione.</p></td>
     <td><p>I frequenti carichi a freddo possono indicare che il riscaldamento o i watermark devono essere regolati.</p></td>
   </tr>
</table>
