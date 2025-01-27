---
id: limitations.md
title: Limiti di Milvus
related_key: Limitations
summary: Imparate a conoscere i limiti dell'uso di Milvus.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Limiti di Milvus<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus si impegna a fornire i migliori database vettoriali per alimentare le applicazioni AI e la ricerca di similarità vettoriali. Tuttavia, il team lavora costantemente per introdurre ulteriori funzionalità e le migliori utilità per migliorare l'esperienza degli utenti. In questa pagina sono elencate alcune limitazioni note che gli utenti possono incontrare quando utilizzano Milvus.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">Lunghezza del nome di una risorsa<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
<tr><th>Risorsa</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Raccolta</td><td>255 caratteri</td></tr>
<tr><td>Campo</td><td>255 caratteri</td></tr>
<tr><td>Indice</td><td>255 caratteri</td></tr>
<tr><td>Partizione</td><td>255 caratteri</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Regole di denominazione<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Il nome di una risorsa, come il nome della raccolta, della partizione o dell'indice, può contenere numeri, lettere e trattini bassi (_). Il nome di una risorsa deve iniziare con una lettera o un trattino basso (_).</p>
<h2 id="Number-of-resources" class="common-anchor-header">Numero di risorse<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
<tr><th>Risorsa</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Raccolta</td><td>65,536</td></tr>
<tr><td>Connessione / proxy</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">Numero di risorse in una raccolta<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
<tr><th>Risorse</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Partizione</td><td>1,024</td></tr>
<tr><td>Frammento</td><td>16</td></tr>
<tr><td>Campo</td><td>64</td></tr>
<tr><td>Indice</td><td>1</td></tr>
<tr><td>Entità</td><td>illimitato</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Lunghezza di una stringa<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<tr><th>Tipo di dati</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">Dimensioni di un vettore<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
<tr><th>Proprietà</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Dimensione</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">Ingresso e uscita per RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
<tr><th>Operazione</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Inserimento</td><td>64 MB</td></tr>
<tr><td>Ricerca</td><td>64 MB</td></tr>
<tr><td>Interrogazione</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">Limiti di carico<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Nella versione attuale, i dati da caricare devono essere inferiori al 90% delle risorse di memoria totali di tutti i nodi di interrogazione per riservare le risorse di memoria al motore di esecuzione.</p>
<h2 id="Search-limits" class="common-anchor-header">Limiti di ricerca<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Vettori</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (numero del risultato più simile da restituire)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (numero di richieste di ricerca)</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Limiti dell'indice su diversi tipi di ricerca<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente fornisce una panoramica del supporto per i vari comportamenti di ricerca nei diversi tipi di indice.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>PIATTO</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>INDICE SPARSO_INVERTITO</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Ricerca di base</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Sì</td></tr>
<tr><td>Ricerca per partizione</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Sì</td></tr>
<tr><td>Ricerca di base con recupero dei dati grezzi</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td></tr>
<tr><td>Ricerca di base con paginazione</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td></tr>
<tr><td>Ricerca filtrata</td><td>Sì</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Sì</td></tr>
<tr><td>Ricerca nel raggio d'azione</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sì</td><td>Sì</td><td>Si</td></tr>
<tr><td>Ricerca per raggruppamento</td><td>Si</td><td>No</td><td>Si</td><td>Si</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sì</td><td>No</td><td>No</td></tr>
<tr><td>Ricerca con iteratore</td><td>Sì</td><td>Sì</td><td>Si</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sì</td><td>No</td><td>No</td></tr>
<tr><td>Ricerca ibrida</td><td>Sì</td><td>Sì</td><td>Si</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Sì (solo RRFRanker)</td><td>Sì</td><td>Sì</td></tr>
<tr><td>Interrogazione/raccolta</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Si</td><td>Sì</td></tr>
<tr><td>Query con iteratore</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td><td>Si</td><td>Si</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sì</td><td>Sì</td><td>Si</td></tr>
</tbody>
</table>
