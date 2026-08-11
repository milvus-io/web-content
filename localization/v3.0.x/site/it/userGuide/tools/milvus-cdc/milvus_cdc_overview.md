---
id: milvus_cdc_overview.md
summary: >-
  Milvus CDC replica le modifiche ai dati da un cluster Milvus a un altro per il
  ripristino di emergenza in configurazione primaria-standby.
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC (Change Data Capture) replica le modifiche ai dati da un cluster Milvus a un altro. È possibile utilizzare CDC per creare una topologia di disaster recovery primaria-standby per Milvus.</p>
<p>In una topologia primario-standby, un cluster funge da primario e accetta le operazioni di scrittura. Uno o più cluster di standby ricevono continuamente le modifiche dal cluster primario e possono gestire il traffico di lettura. Quando il cluster primario non è disponibile o necessita di manutenzione, è possibile trasferire il traffico di servizio a un cluster di standby.</p>
<h2 id="Architecture" class="common-anchor-header">Architettura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Una topologia tipica comprende:</p>
<ul>
<li><strong>Cluster primario</strong>: il cluster di origine per la replica. Accetta operazioni di lettura e scrittura.</li>
<li><strong>Cluster di standby</strong>: un cluster di destinazione per la replica. Riceve le modifiche dal cluster primario ed è di sola lettura finché rimane in modalità di standby.</li>
<li><strong>Nodo CDC</strong>: un componente di Milvus che inoltra le modifiche WAL dal cluster primario corrente ai cluster di riserva. Distribuire il CDC su ciascun cluster che potrebbe diventare primario dopo uno switchover o un failover.</li>
<li><strong>Topologia di replica</strong>: la relazione configurata da sorgente a destinazione, ad esempio cluster-a -&gt; cluster-b.
Di seguito è riportata un'illustrazione della topologia. <span class="img-wrapper">

  
   <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /> 
 <span>   Flusso di lavoro CDC</span>
  
 </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">Topologie supportate<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>La distribuzione CDC più comune prevede un cluster primario e uno di standby:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC supporta anche una topologia con un unico cluster primario e più cluster di standby:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC non supporta implementazioni multi-primario o attivo-attivo, in cui due o più cluster accettano il traffico di scrittura contemporaneamente.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">Comportamento dei cluster primario e di riserva<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Ruolo</th><th>Letture</th><th>Scritture</th><th>Comportamento di replica</th></tr>
</thead>
<tbody>
<tr><td>Primario</td><td>Sì</td><td>Sì</td><td>Invia le modifiche ai cluster di standby</td></tr>
<tr><td>Standby</td><td>Sì</td><td>No</td><td>Riceve le modifiche replicate dal cluster primario</td></tr>
</tbody>
</table>
<p>Un cluster di standby rifiuta le richieste di scrittura diretta. Ciò impedisce lo split brain e mantiene coerente la topologia di replica.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">Switchover pianificato vs. Failover<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC offre due modalità per trasferire il traffico del servizio dal primario corrente a un cluster di standby.</p>
<table>
<thead>
<tr><th>Operazione</th><th>Da utilizzare quando</th><th>Perdita di dati</th><th>Comportamento previsto</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/it/cdc_switchover.md">Commutazione</a></strong></td><td>Il primario attuale è ancora raggiungibile, oppure si sta effettuando una manutenzione programmata</td><td>RPO = 0</td><td>Attende i dati replicati rimanenti prima che avvenga il cambio di ruolo</td></tr>
<tr><td><strong><a href="/docs/it/cdc_failover.md">Failover</a></strong></td><td>Il primario attuale non è disponibile e non può essere ripristinato rapidamente</td><td>Possibile</td><td>Promuove immediatamente il server di standby in modo che le operazioni di scrittura possano riprendere</td></tr>
</tbody>
</table>
<p>Utilizzare lo switchover ogni volta che il primario attuale è ancora in grado di rispondere. Utilizzare il failover solo quando ripristinare la disponibilità è più importante che attendere il primario originale.</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">Ritardo CDC e perché è importante<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Il ritardo CDC è la quantità di dati che è stata scritta nel cluster primario ma che non è stata ancora applicata a un cluster di standby.</p>
<p>Il ritardo CDC influisce su entrambe le opzioni di ripristino:</p>
<ul>
<li>Durante lo switchover, un ritardo CDC inferiore di solito significa che l’operazione si completa più rapidamente.</li>
<li>Durante il failover, il ritardo CDC rappresenta la finestra di dati che potrebbe andare persa se il primario originale non fosse disponibile.</li>
</ul>
<p>È consigliabile monitorare costantemente il ritardo CDC e mantenerlo il più basso possibile. La pagina <a href="/docs/it/set_up_cdc_replication.md">"Configurazione della replica CDC</a> " include un esempio di PromQL per stimare il ritardo CDC.</p>
<h2 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">Importazione in blocco nella replica CDC<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>In una topologia di replica CDC, l’importazione in blocco deve utilizzare la modalità di commit a due fasi (2PC) con l’opzione ` <code translate="no">auto_commit=false</code>`. Eseguire l’importazione e il commit solo sul cluster primario e assicurarsi che i file di importazione siano disponibili sia sul cluster primario che su quello di standby. Per ulteriori dettagli, consultare <a href="/docs/it/bulk-import-in-cdc-replication.md">Importazione in blocco nella replica CDC</a>.</p>
<h2 id="Limitations" class="common-anchor-header">Limitazioni<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC presenta attualmente i seguenti limiti:</p>
<ul>
<li>Supporta solo topologie <strong>a primario singolo</strong>.</li>
<li><strong>Non</strong> supporta scritture in modalità attiva-attiva o multi-primario.</li>
<li>I cluster di standby possono gestire il traffico di lettura, ma rifiutano le scritture dirette finché rimangono in modalità standby.</li>
<li>Il failover potrebbe comportare la perdita dei dati scritti sul vecchio primario ma non ancora replicati sullo standby.</li>
<li>L'<code translate="no">pchannels</code> e configurato deve corrispondere all'effettiva disposizione dei canali di ciascun cluster.</li>
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">Un cluster di standby può gestire le query?<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Sì. Un cluster di standby può gestire il traffico di lettura. Non può accettare operazioni di scrittura finché non diventa il cluster primario.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Milvus CDC supporta le operazioni di scrittura in modalità attiva-attiva?<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Milvus CDC è progettato per una topologia a primario singolo. La scrittura su più cluster contemporaneamente può causare lo split brain e la divergenza dei dati.</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">Lo switchover comporta la perdita di dati?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Lo switchover attende che i dati rimanenti vengano replicati prima che lo standby diventi primario.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">Il failover comporta la perdita di dati?<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>È possibile. Qualsiasi dato scritto sul vecchio primario ma non ancora replicato sullo standby potrebbe andare perso.</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">Quanti dati si possono perdere durante il failover?<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>La potenziale perdita di dati è limitata dal ritardo CDC al momento in cui il primario è diventato indisponibile.</p>
