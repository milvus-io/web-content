---
id: warm-up.md
title: Warm UpCompatible with Milvus 2.6.4+
summary: >-
  In Milvus, Warm Up completa l'archiviazione a livelli eliminando la latenza di
  primo impatto che si verifica quando si accede ai dati freddi per la prima
  volta. Una volta configurato, Warm Up precarica nella cache campi o indici
  selezionati prima che un segmento diventi interrogabile, assicurando che i
  dati a cui si accede di frequente siano disponibili subito dopo il
  caricamento.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Warm Up<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, <strong>Warm Up</strong> completa l'archiviazione a livelli eliminando la latenza di primo impatto che si verifica quando si accede ai dati freddi per la prima volta. Una volta configurato, Warm Up precarica nella cache campi o indici selezionati prima che un segmento diventi interrogabile, assicurando che i dati a cui si accede di frequente siano disponibili subito dopo il caricamento.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Perché il warm up<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/it/tiered-storage-overview.md#Lazy-load">Lazy Load</a> in Tiered Storage migliora l'efficienza caricando inizialmente solo i metadati. Tuttavia, ciò può causare latenza alla prima query sui dati freddi, poiché i chunk o gli indici necessari devono essere recuperati dallo storage degli oggetti.</p>
<p><strong>Warm Up</strong> risolve questo problema mettendo nella cache in modo proattivo i dati critici durante l'inizializzazione del segmento.</p>
<p>È particolarmente utile quando:</p>
<ul>
<li><p>Alcuni <strong>indici scalari</strong> sono usati frequentemente nelle condizioni di filtro.</p></li>
<li><p>Gli<strong>indici vettoriali</strong> sono essenziali per le prestazioni di ricerca e devono essere pronti immediatamente.</p></li>
<li><p><strong>La latenza di avvio a freddo</strong> dopo il riavvio del QueryNode o il caricamento di un nuovo segmento è inaccettabile.</p></li>
</ul>
<p>Al contrario, il Warm Up <strong>non è consigliato</strong> per i campi o gli indici interrogati di rado. Disattivare il Warm Up riduce il tempo di caricamento del segmento e conserva lo spazio nella cache, ideale per i campi vettoriali di grandi dimensioni o per i campi scalari non critici.</p>
<h2 id="Configuration" class="common-anchor-header">Configurazione<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Il Warm Up è controllato da <code translate="no">queryNode.segcore.tieredStorage.warmup</code> in <code translate="no">milvus.yaml</code>. È possibile configurarlo separatamente per campi scalari, indici scalari, campi vettoriali e indici vettoriali. Ogni target supporta due modalità:</p>
<table>
   <tr>
     <th><p>Modalità</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Scenario tipico</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code> (predefinito)</p></td>
     <td><p>Precarica prima che il segmento sia interrogabile. Il tempo di caricamento aumenta leggermente, ma la prima query non comporta latenza.</p></td>
     <td><p>Da usare per i dati critici per le prestazioni che devono essere immediatamente disponibili, come gli indici scalari ad alta frequenza o gli indici vettoriali chiave usati nella ricerca.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Saltare il precaricamento. Il segmento diventa interrogabile più rapidamente, ma la prima query può attivare il caricamento su richiesta.</p></td>
     <td><p>Da usare per i dati a cui si accede di rado o di grandi dimensioni, come i campi vettoriali grezzi o i campi scalari non critici.</p></td>
   </tr>
</table>
<p><strong>Esempio di YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - &quot;sync&quot;: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - &quot;disable&quot;: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to &quot;sync&quot;, except for vector field which defaults to &quot;disable&quot;.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Valori</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Caso d'uso consigliato</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controlla se i dati dei campi scalari sono precaricati.</p></td>
     <td><p>Utilizzare <code translate="no">sync</code> solo se i campi scalari sono piccoli e vengono consultati frequentemente nei filtri. Altrimenti, <code translate="no">disable</code> per ridurre il tempo di caricamento.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controlla se gli indici scalari sono precaricati.</p></td>
     <td><p>Usare <code translate="no">sync</code> per gli indici scalari coinvolti in condizioni di filtro frequenti o in query di intervallo.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controlla se i dati dei campi vettoriali sono precaricati.</p></td>
     <td><p>Generalmente <code translate="no">disable</code> per evitare un uso intensivo della cache. Abilitare <code translate="no">sync</code> solo quando i vettori grezzi devono essere recuperati subito dopo la ricerca (per esempio, i risultati di similarità con richiamo di vettori).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controlla se gli indici dei vettori sono precaricati.</p></td>
     <td><p>Usare <code translate="no">sync</code> per gli indici vettoriali che sono critici per la latenza della ricerca. Nei carichi di lavoro batch o a bassa frequenza, <code translate="no">disable</code> per una più rapida disponibilità dei segmenti.</p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">Pratiche ottimali<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Il Warm Up influisce solo sul <strong>carico iniziale</strong>. Se i dati nella cache vengono successivamente eliminati, la query successiva li ricaricherà su richiesta.</p>
<ul>
<li><p>Evitare l'uso eccessivo di <code translate="no">sync</code>. Il precaricamento di troppi campi aumenta il tempo di caricamento e la pressione sulla cache.</p></li>
<li><p>Iniziare in modo conservativo: attivare il Warm Up solo per i campi e gli indici a cui si accede di frequente.</p></li>
<li><p>Monitorare la latenza delle query e le metriche della cache, quindi espandere il precaricamento se necessario.</p></li>
<li><p>Per i carichi di lavoro misti, applicare <code translate="no">sync</code> alle collezioni sensibili alle prestazioni e <code translate="no">disable</code> a quelle orientate alla capacità.</p></li>
</ul>
