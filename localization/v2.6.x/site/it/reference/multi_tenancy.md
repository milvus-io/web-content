---
id: multi_tenancy.md
title: Implementazione del multi-tenancy
summary: >-
  In Milvus, il concetto di multi-tenancy implica che più clienti o team —
  denominati “tenant” — condividano lo stesso cluster, pur mantenendo ambienti
  di dati isolati.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Implementazione del multi-tenancy<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, il multi-tenancy significa che più clienti o team — denominati <strong>tenant</strong>— condividono lo stesso cluster mantenendo al contempo ambienti dati isolati.</p>
<p>Milvus supporta quattro strategie di multi-tenancy, ciascuna delle quali offre un diverso compromesso tra scalabilità, isolamento dei dati e flessibilità. Questa guida illustra in dettaglio ciascuna opzione, aiutandoti a scegliere la strategia più adatta al tuo caso d’uso.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Strategie di multi-tenancy<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta il multi-tenancy a quattro livelli: <strong>database</strong>, <strong>raccolta</strong>, <strong>partizione</strong> e <strong>chiave di partizione</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di database<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Con la multi-tenancy a livello di database, ogni tenant riceve un <a href="/docs/it/v2.6.x/manage_databases.md">database</a> corrispondente contenente una o più collezioni.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>Multi-tenancy a livello di database</span>
  
 </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: la strategia di multi-tenancy a livello di database supporta, per impostazione predefinita, un massimo di 64 tenant.</p></li>
<li><p><strong>Isolamento dei dati</strong>: i dati in ciascun database sono completamente separati, offrendo un isolamento dei dati di livello enterprise, ideale per ambienti regolamentati o clienti con rigidi requisiti di conformità.</p></li>
<li><p><strong>Flessibilità</strong>: ogni database può contenere raccolte con schemi diversi, offrendo un'organizzazione dei dati altamente flessibile e consentendo a ciascun tenant di disporre del proprio schema di dati.</p></li>
<li><p><strong>Altro</strong>: questa strategia supporta anche il modello RBAC, consentendo un controllo granulare sull’accesso degli utenti per ogni tenant. Inoltre, è possibile caricare o liberare in modo flessibile i dati per tenant specifici, al fine di gestire efficacemente i dati “caldi” e “freddi”.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di raccolta<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Con il multi-tenant a livello di raccolta, a ciascun tenant viene assegnata una <a href="/docs/it/v2.6.x/manage-collections.md">raccolta</a>, garantendo un forte isolamento dei dati.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>Multi-tenancy a livello di collezione</span>
  
 </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: poiché un cluster può contenere fino a 65.536 collezioni per impostazione predefinita, questa strategia può ospitare lo stesso numero di tenant all’interno del cluster.</p></li>
<li><p><strong>Isolamento dei dati</strong>: le raccolte sono fisicamente isolate l’una dall’altra. Questa strategia garantisce un forte isolamento dei dati.</p></li>
<li><p><strong>Flessibilità</strong>: questa strategia consente a ciascuna collezione di avere il proprio schema, supportando tenant con schemi di dati diversi.</p></li>
<li><p><strong>Altro</strong>: questa strategia supporta anche l’RBAC, consentendo un controllo granulare degli accessi per i tenant. Inoltre, è possibile caricare o liberare in modo flessibile i dati per tenant specifici, al fine di gestire efficacemente i dati “caldi” e “freddi”.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di partizione<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Nel multi-tenant a livello di partizione, a ciascun tenant viene assegnata una <a href="/docs/it/v2.6.x/manage-partitions.md">partizione</a> creata manualmente all’interno di una collezione condivisa.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>Multi-tenancy a livello di partizione</span>
  
 </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: una collezione può contenere fino a 1.024 partizioni, consentendo lo stesso numero di tenant al suo interno.</p></li>
<li><p><strong>Isolamento dei dati</strong>: i dati di ciascun tenant sono fisicamente separati dalle partizioni.</p></li>
<li><p><strong>Flessibilità</strong>: questa strategia richiede che tutti i tenant condividano lo stesso schema di dati. Inoltre, le partizioni devono essere create manualmente.</p></li>
<li><p><strong>Altre considerazioni</strong>: l’RBAC non è supportato a livello di partizione. È possibile eseguire query sui tenant sia singolarmente che su più partizioni, il che rende questo approccio particolarmente adatto a scenari che prevedono query aggregate o analisi su segmenti di tenant. Inoltre, è possibile caricare o liberare in modo flessibile i dati per tenant specifici, al fine di gestire efficacemente i dati "caldi" e "freddi".</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di chiave di partizione<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Con questa strategia, tutti i tenant condividono un’unica raccolta e un unico schema, ma i dati di ciascun tenant vengono automaticamente indirizzati in 16 partizioni fisicamente isolate in base al valore <a href="/docs/it/v2.6.x/use-partition-key.md">della chiave di partizione</a>. Sebbene ogni partizione fisica possa contenere più tenant, i dati provenienti da tenant diversi rimangono logicamente separati.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>Multi-tenancy a livello di chiave di partizione</span>
  
 </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: la strategia a livello di chiave di partizione offre l’approccio più scalabile, supportando milioni di tenant.</p></li>
<li><p><strong>Isolamento dei dati</strong>: questa strategia offre un isolamento dei dati relativamente debole, poiché più tenant possono condividere una partizione fisica.</p></li>
<li><p><strong>Flessibilità</strong>: poiché tutti i tenant devono condividere lo stesso schema di dati, questa strategia offre una flessibilità dei dati limitata.</p></li>
<li><p><strong>Altro</strong>: l’RBAC non è supportato a livello di chiave di partizione. I tenant possono essere interrogati sia individualmente che su più partizioni, il che rende questo approccio particolarmente adatto a scenari che prevedono query aggregate o analisi su segmenti di tenant.</p></li>
</ul>
<div class="alert note">
<p>Si consiglia di creare un indice scalare sul campo della chiave di partizione. Poiché ogni partizione fisica contiene più tenant, Milvus valuta il filtro del tenant rispetto a ogni entità nelle partizioni oggetto della ricerca e, in assenza di un indice, ciò comporta una scansione completa. Per ulteriori dettagli, consultare la sezione " <a href="/docs/it/v2.6.x/use-partition-key.md#Index-Partition-Key">Indice della chiave di partizione"</a>.</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Scelta della giusta strategia di multi-tenancy<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente offre un confronto completo tra i quattro livelli delle strategie di multi-tenancy.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>A livello di database</strong></p></th>
     <th><p><strong>A livello di raccolta</strong></p></th>
     <th><p><strong>A livello di partizione</strong></p></th>
     <th><p><strong>A livello di chiave di partizione</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Isolamento dei dati</strong></p></td>
     <td><p>A livello fisico</p></td>
     <td><p>Fisico</p></td>
     <td><p>Fisico</p></td>
     <td><p>Fisico + Logico</p></td>
   </tr>
   <tr>
     <td><p><strong>Numero massimo di tenant</strong></p></td>
     <td><p>Per impostazione predefinita, 64. È possibile aumentarlo modificando il parametro <code translate="no">maxDatabaseNum</code> nel file di configurazione Milvus.yaml. </p></td>
     <td><p>Per impostazione predefinita, 65.536. È possibile aumentarlo modificando il parametro <code translate="no">maxCollectionNum</code> nel file di configurazione Milvus.yaml.</p></td>
     <td><p>Fino a 1.024 per raccolta. </p></td>
     <td><p>Milioni</p></td>
   </tr>
   <tr>
     <td><p><strong>Flessibilità dello schema dei dati</strong></p></td>
     <td><p>Elevata</p></td>
     <td><p>Media</p></td>
     <td><p>Bassa</p></td>
     <td><p>Bassa</p></td>
   </tr>
   <tr>
     <td><p><strong>Supporto RBAC</strong></p></td>
     <td><p>Sì</p></td>
     <td><p>Sì</p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
   </tr>
   <tr>
     <td><p><strong>Prestazioni di ricerca</strong></p></td>
     <td><p>Ottime</p></td>
     <td><p>Elevate</p></td>
     <td><p>Media</p></td>
     <td><p>Media</p></td>
   </tr>
   <tr>
     <td><p><strong>Supporto alla ricerca tra tenant</strong></p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
     <td><p>Sì</p></td>
     <td><p>Sì</p></td>
   </tr>
   <tr>
     <td><p><strong>Supporto per una gestione efficace dei dati "caldi" e "freddi"</strong></p></td>
     <td><p>Sì</p></td>
     <td><p>Sì</p></td>
     <td><p>Sì</p></td>
     <td><p>No Attualmente non supportato per la strategia a livello di chiave di partizione.</p></td>
   </tr>
</table>
<p>Ci sono diversi fattori da considerare quando si sceglie la strategia multi-tenancy in Milvus.</p>
<ol>
<li><p><strong>Scalabilità:</strong> chiave di partizione &gt; partizione &gt; raccolta &gt; database</p>
<p>Se si prevede di supportare un numero molto elevato di tenant (milioni o più), utilizzare la strategia a livello di chiave di partizione.</p></li>
<li><p><strong>Requisiti rigorosi di isolamento dei dati</strong>: Database = Raccolta &gt; Partizione &gt; Chiave di partizione</p>
<p>Scegliete strategie a livello di database, collezione o partizione se avete requisiti rigorosi di isolamento fisico dei dati.</p></li>
<li><p><strong>Schema dati flessibile per i dati di ciascun tenant:</strong> Database &gt; Collezione &gt; Partizione = Chiave di partizione</p>
<p>Le strategie a livello di database e di collezione offrono piena flessibilità negli schemi dei dati. Se le strutture dei dati dei vostri tenant sono diverse, scegliete il multi-tenancy a livello di database o di collezione.</p></li>
<li><p><strong>Altro</strong></p>
<ol>
<li><p><strong>Prestazioni:</strong> le prestazioni di ricerca sono determinate da vari fattori, tra cui indici, parametri di ricerca e configurazioni dei sistemi. Milvus supporta anche l’ottimizzazione delle prestazioni. Si raccomanda di testare le prestazioni effettive prima di selezionare una strategia di multi-tenancy.</p></li>
<li><p><strong>Gestione efficace dei dati "caldi" e "freddi"</strong>: attualmente, le strategie a livello di database, a livello di raccolta e a livello di partizione supportano tutte la gestione dei dati "caldi" e "freddi".</p></li>
<li><p><strong>Ricerche tra tenant</strong>: solo le strategie a livello di partizione e a livello di chiave di partizione supportano le query tra tenant.</p></li>
</ol></li>
</ol>
