---
id: multi_tenancy.md
title: Implementare la multi-tenancy
summary: >-
  In Milvus, multi-tenancy significa che più clienti o team, detti tenant,
  condividono lo stesso cluster mantenendo ambienti di dati isolati.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Implementare la multi-tenancy<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, multi-tenancy significa che più clienti o team, detti <strong>tenant,</strong>condividono lo stesso cluster mantenendo ambienti di dati isolati.</p>
<p>Milvus supporta quattro strategie di multi-tenancy, ognuna delle quali offre un diverso compromesso tra scalabilità, isolamento dei dati e flessibilità. Questa guida illustra ogni opzione, aiutandovi a scegliere la strategia più adatta al vostro caso d'uso.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Strategie multi-tenancy<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta la multi-tenancy a quattro livelli: <strong>Database</strong>, <strong>Collezione</strong>, <strong>Partizione</strong> e <strong>Chiave di partizione</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di database</h3><p>Con la multi-tenancy a livello di database, ogni tenant riceve un <a href="/docs/it/manage_databases.md">database</a> corrispondente contenente una o più collezioni.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multitenancy a livello di database</span> </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: La strategia di multi-tenancy a livello di database supporta un massimo di 64 tenant per impostazione predefinita.</p></li>
<li><p><strong>Isolamento dei dati</strong>: I dati di ciascun database sono completamente separati, offrendo un isolamento dei dati di livello aziendale ideale per gli ambienti regolamentati o per i clienti con esigenze di conformità rigorose.</p></li>
<li><p><strong>Flessibilità</strong>: Ogni database può avere collezioni con schemi diversi, offrendo un'organizzazione dei dati altamente flessibile e consentendo a ogni tenant di avere il proprio schema di dati.</p></li>
<li><p><strong>Altri</strong>: Questa strategia supporta anche RBAC, consentendo un controllo a grana fine sull'accesso degli utenti per tenant. Inoltre, è possibile caricare o rilasciare in modo flessibile i dati per tenant specifici, per gestire efficacemente i dati caldi e freddi.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di collezione</h3><p>Con la multi-tenancy a livello di collezione, a ogni tenant viene assegnata una <a href="/docs/it/manage-collections.md">collezione</a>, offrendo un forte isolamento dei dati.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multitenancy a livello di collezione</span> </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: Poiché un cluster può contenere fino a 65.536 collezioni per impostazione predefinita, questa strategia può ospitare lo stesso numero di tenant all'interno del cluster.</p></li>
<li><p><strong>Isolamento dei dati</strong>: Le collezioni sono fisicamente isolate l'una dall'altra. Questa strategia garantisce un forte isolamento dei dati.</p></li>
<li><p><strong>Flessibilità</strong>: Questa strategia consente a ogni raccolta di avere il proprio schema, per accogliere tenant con schemi di dati diversi.</p></li>
<li><p><strong>Altri</strong>: Questa strategia supporta anche RBAC, consentendo un controllo granulare dell'accesso ai tenant. Inoltre, è possibile caricare o rilasciare in modo flessibile i dati per tenant specifici, per gestire efficacemente i dati caldi e freddi.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di partizione</h3><p>Nella multi-tenancy a livello di partizione, ogni tenant viene assegnato a una <a href="/docs/it/manage-partitions.md">partizione</a> creata manualmente all'interno di una raccolta condivisa.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multitenancy a livello di partizione</span> </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: Una raccolta può contenere fino a 1.024 partizioni per raccolta, consentendo lo stesso numero di tenant al suo interno.</p></li>
<li><p><strong>Isolamento dei dati</strong>: I dati di ciascun tenant sono fisicamente separati da partizioni.</p></li>
<li><p><strong>Flessibilità</strong>: Questa strategia richiede che tutti i tenant condividano lo stesso schema di dati. E le partizioni devono essere create manualmente.</p></li>
<li><p><strong>Altri</strong>: RBAC non è supportato a livello di partizione. I tenant possono essere interrogati singolarmente o su più partizioni, il che rende questo approccio adatto a scenari che prevedono query aggregate o analisi su segmenti di tenant. Inoltre, è possibile caricare o rilasciare in modo flessibile i dati per tenant specifici, per gestire efficacemente i dati caldi e freddi.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multi-tenancy a livello di chiave di partizione</h3><p>Con questa strategia, tutti i tenant condividono un'unica raccolta e un unico schema, ma i dati di ciascun tenant vengono automaticamente instradati in 16 partizioni fisicamente isolate in base al valore della <a href="/docs/it/use-partition-key.md">chiave di partizione</a>. Anche se ogni partizione fisica può contenere più tenant, i dati dei diversi tenant rimangono logicamente separati.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Livello della chiave di partizione Multi Tenancy</span> </span></p>
<ul>
<li><p><strong>Scalabilità</strong>: La strategia a livello di chiave di partizione offre l'approccio più scalabile, in grado di supportare milioni di tenant.</p></li>
<li><p><strong>Isolamento dei dati</strong>: Questa strategia offre un isolamento dei dati relativamente debole, perché più tenant possono condividere una partizione fisica.</p></li>
<li><p><strong>Flessibilità</strong>: Poiché tutti i tenant devono condividere lo stesso schema di dati, questa strategia offre una flessibilità limitata.</p></li>
<li><p><strong>Altri</strong>: Il RBAC non è supportato a livello di chiavi di partizione. I tenant possono essere interrogati singolarmente o su più partizioni, il che rende questo approccio adatto a scenari che prevedono query aggregate o analisi su segmenti di tenant.</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Scegliere la giusta strategia multi-tenancy<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente offre un confronto completo tra i quattro livelli di strategie multi-tenancy.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Livello di database</strong></p></th>
     <th><p><strong>Livello di raccolta</strong></p></th>
     <th><p><strong>A livello di partizione</strong></p></th>
     <th><p><strong>Livello di chiave della partizione</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Isolamento dei dati</strong></p></td>
     <td><p>Fisico</p></td>
     <td><p>Fisico</p></td>
     <td><p>Fisico</p></td>
     <td><p>Fisico + logico</p></td>
   </tr>
   <tr>
     <td><p><strong>Numero massimo di locatari</strong></p></td>
     <td><p>Per impostazione predefinita, 64. È possibile aumentarlo modificando il parametro <code translate="no">maxDatabaseNum</code> nel file di configurazione Milvus.yaml. </p></td>
     <td><p>Per impostazione predefinita, 65.536. È possibile aumentarlo modificando il parametro <code translate="no">maxCollectionNum</code> nel file di configurazione Milvus.yaml.</p></td>
     <td><p>Fino a 1.024 per collezione. </p></td>
     <td><p>Milioni</p></td>
   </tr>
   <tr>
     <td><p><strong>Flessibilità dello schema dei dati</strong></p></td>
     <td><p>Alta</p></td>
     <td><p>Media</p></td>
     <td><p>Bassa</p></td>
     <td><p>Basso</p></td>
   </tr>
   <tr>
     <td><p><strong>Supporto RBAC</strong></p></td>
     <td><p>Sì</p></td>
     <td><p>Si</p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
   </tr>
   <tr>
     <td><p><strong>Prestazioni di ricerca</strong></p></td>
     <td><p>Forte</p></td>
     <td><p>Forte</p></td>
     <td><p>Medio</p></td>
     <td><p>Medio</p></td>
   </tr>
   <tr>
     <td><p><strong>Supporto per la ricerca cross-tenant</strong></p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
     <td><p>Si</p></td>
     <td><p>Sì</p></td>
   </tr>
   <tr>
     <td><p><strong>Supporto per la gestione efficace dei dati caldi e freddi</strong></p></td>
     <td><p>Sì</p></td>
     <td><p>Sì</p></td>
     <td><p>Sì</p></td>
     <td><p>No Attualmente non è supportata la strategia a livello di chiave di partizione.</p></td>
   </tr>
</table>
<p>Ci sono diversi fattori da considerare quando si sceglie la strategia multi-tenancy in Milvus.</p>
<ol>
<li><p><strong>Scalabilità:</strong> Chiave di partizione &gt; Partizione &gt; Raccolta &gt; Database</p>
<p>Se si prevede di supportare un numero molto elevato di tenant (milioni o più), utilizzare la strategia a livello di chiave di partizione.</p></li>
<li><p><strong>Forti requisiti di isolamento dei dati</strong>: Database = Collezione &gt; Partizione &gt; Chiave di partizione</p>
<p>Scegliete le strategie a livello di database, di raccolta o di partizione se avete requisiti rigidi di isolamento fisico dei dati.</p></li>
<li><p><strong>Schema di dati flessibile per i dati di ciascun tenant:</strong> Database &gt; Raccolta &gt; Partizione = Chiave di partizione</p>
<p>Le strategie a livello di database e di raccolta offrono la massima flessibilità negli schemi dei dati. Se le strutture dei dati dei tenant sono diverse, scegliete la multi-tenancy a livello di database o di collezione.</p></li>
<li><p><strong>Altri</strong></p>
<ol>
<li><p><strong>Prestazioni:</strong> Le prestazioni della ricerca sono determinate da vari fattori, tra cui gli indici, i parametri di ricerca e le configurazioni della macchina. Milvus supporta anche il tuning delle prestazioni. Si consiglia di testare le prestazioni effettive prima di scegliere una strategia multi-tenancy.</p></li>
<li><p><strong>Gestione efficace dei dati caldi e freddi</strong>: Attualmente, le strategie a livello di database, di raccolta e di partizione supportano tutte la gestione dei dati caldi e freddi.</p></li>
<li><p><strong>Ricerche cross-tenant</strong>: Solo le strategie a livello di partizione e di chiave di partizione supportano le query cross-tenant.</p></li>
</ol></li>
</ol>
