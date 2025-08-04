---
id: configure_common.md
related_key: configure
group: system_configuration.md
summary: Imparare a configurare i comuni per Milvus.
---
<h1 id="common-related-Configurations" class="common-anchor-header">Configurazioni correlate comuni<button data-href="#common-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="commondefaultPartitionName" class="common-anchor-header"><code translate="no">common.defaultPartitionName</code><button data-href="#commondefaultPartitionName" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.defaultPartitionName">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Nome della partizione predefinita quando viene creata una raccolta      </td>
      <td>_default</td>
    </tr>
  </tbody>
</table>
<h2 id="commondefaultIndexName" class="common-anchor-header"><code translate="no">common.defaultIndexName</code><button data-href="#commondefaultIndexName" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.defaultIndexName">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Nome dell'indice quando viene creato con nome non specificato      </td>
      <td>_default_idx</td>
    </tr>
  </tbody>
</table>
<h2 id="commonentityExpiration" class="common-anchor-header"><code translate="no">common.entityExpiration</code><button data-href="#commonentityExpiration" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.entityExpiration">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Scadenza dell'entità in secondi, ATTENZIONE -1 significa che non scade mai   </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="commonindexSliceSize" class="common-anchor-header"><code translate="no">common.indexSliceSize</code><button data-href="#commonindexSliceSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.indexSliceSize">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Dimensione della fetta di indice in MB  </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="commonthreadCoreCoefficienthighPriority" class="common-anchor-header"><code translate="no">common.threadCoreCoefficient.highPriority</code><button data-href="#commonthreadCoreCoefficienthighPriority" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.threadCoreCoefficient.highPriority">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Questo parametro specifica quante volte il numero di thread è il numero di core nel pool ad alta priorità      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="commonthreadCoreCoefficientmiddlePriority" class="common-anchor-header"><code translate="no">common.threadCoreCoefficient.middlePriority</code><button data-href="#commonthreadCoreCoefficientmiddlePriority" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.threadCoreCoefficient.middlePriority">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Questo parametro specifica quante volte il numero di thread è il numero di core nel pool a priorità media     </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="commonthreadCoreCoefficientlowPriority" class="common-anchor-header"><code translate="no">common.threadCoreCoefficient.lowPriority</code><button data-href="#commonthreadCoreCoefficientlowPriority" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.threadCoreCoefficient.lowPriority">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Questo parametro specifica quante volte il numero di thread è il numero di core nel pool a bassa priorità      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="commongracefulTime" class="common-anchor-header"><code translate="no">common.gracefulTime</code><button data-href="#commongracefulTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.gracefulTime">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        millisecondi. rappresenta l'intervallo (in ms) per il quale il tempo di arrivo della richiesta deve essere sottratto nel caso di Bounded Consistency.      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="commongracefulStopTimeout" class="common-anchor-header"><code translate="no">common.gracefulStopTimeout</code><button data-href="#commongracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        secondi. Se il processo di graceful stop non viene completato entro questo tempo, il server viene chiuso forzatamente.      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>
<h2 id="commonstorageType" class="common-anchor-header"><code translate="no">common.storageType</code><button data-href="#commonstorageType" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.storageType">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        regolare in Milvus incorporato: local, i valori disponibili sono [local, remote, opendal], il valore minio è deprecato, usare invece remote      </td>
      <td>remoto</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsimdType" class="common-anchor-header"><code translate="no">common.simdType</code><button data-href="#commonsimdType" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.simdType">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Valore predefinito: auto</li>      
        <li>Valori validi: [auto, avx512, avx2, avx, sse4_2]</li>      
        <li>Questa configurazione è usata solo da querynode e indexnode e seleziona il set di istruzioni della CPU per la ricerca e la costruzione di indici.</li>      </td>
      <td>auto</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecuritysuperUsers" class="common-anchor-header"><code translate="no">common.security.superUsers</code><button data-href="#commonsecuritysuperUsers" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.superUsers">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>I superutenti ignoreranno alcuni processi di controllo del sistema,</li>      
        <li>come la verifica della vecchia password durante l'aggiornamento delle credenziali.</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecuritydefaultRootPassword" class="common-anchor-header"><code translate="no">common.security.defaultRootPassword</code><button data-href="#commonsecuritydefaultRootPassword" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.defaultRootPassword">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        password predefinita per l'utente root. La lunghezza massima è di 72 caratteri e sono necessari i doppi apici.      </td>
      <td>Milvus</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrootShouldBindRole" class="common-anchor-header"><code translate="no">common.security.rootShouldBindRole</code><button data-href="#commonsecurityrootShouldBindRole" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rootShouldBindRole">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Se l'utente root deve vincolare un ruolo quando l'autorizzazione è abilitata.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacoverrideBuiltInPrivilegeGroupsenabled" class="common-anchor-header"><code translate="no">common.security.rbac.overrideBuiltInPrivilegeGroups.enabled</code><button data-href="#commonsecurityrbacoverrideBuiltInPrivilegeGroupsenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.overrideBuiltInPrivilegeGroups.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Se sovrascrivere i gruppi di privilegi incorporati      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacclusterreadonlyprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.cluster.readonly.privileges</code><button data-href="#commonsecurityrbacclusterreadonlyprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.cluster.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di sola lettura a livello di cluster      </td>
      <td>ElencoDatabase, SelezionaProprietà, SelezionaUtente, DescriviGruppoRisorse, ElencoGruppiRisorse, ElencoGruppiPrivilegio</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacclusterreadwriteprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.cluster.readwrite.privileges</code><button data-href="#commonsecurityrbacclusterreadwriteprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.cluster.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di lettura a livello di cluster      </td>
      <td>ListDatabase,SelectOwnership,SelectUser,DescribeResourceGroup,ListResourceGroups,ListPrivilegeGroups,FlushAll,TransferNode,TransferReplica,UpdateResourceGroups</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacclusteradminprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.cluster.admin.privileges</code><button data-href="#commonsecurityrbacclusteradminprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.cluster.admin.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di amministrazione a livello di cluster      </td>
      <td>ListDatabases,SelectOwnership,SelectUser,DescribeResourceGroup,ListResourceGroups,ListPrivilegeGroups,FlushAll,TransferNode,TransferReplica,UpdateResourceGroups,BackupRBAC,RestoreRBAC,CreateDatabase,DropDatabase, CreateOwnership, DropOwnership, ManageOwnership, CreateResourceGroup, DropResourceGroup, UpdateUser, RenameCollection, CreatePrivilegeGroup, DropPrivilegeGroup, OperatePrivilegeGroup</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacdatabasereadonlyprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.database.readonly.privileges</code><button data-href="#commonsecurityrbacdatabasereadonlyprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.database.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di sola lettura a livello di database      </td>
      <td>Mostra collezioni,Descrivi database</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacdatabasereadwriteprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.database.readwrite.privileges</code><button data-href="#commonsecurityrbacdatabasereadwriteprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.database.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di lettura a livello di database      </td>
      <td>MostraCollezioni,DescriviDatabase,AlterDatabase</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacdatabaseadminprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.database.admin.privileges</code><button data-href="#commonsecurityrbacdatabaseadminprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.database.admin.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di amministrazione a livello di database      </td>
      <td>MostraCollezioni,DescriviDatabase,AlterDatabase,CreaCollezione,EliminaCollezione</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbaccollectionreadonlyprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.collection.readonly.privileges</code><button data-href="#commonsecurityrbaccollectionreadonlyprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.collection.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di sola lettura per le collezioni      </td>
      <td>Query,Search,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbaccollectionreadwriteprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.collection.readwrite.privileges</code><button data-href="#commonsecurityrbaccollectionreadwriteprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.collection.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di lettura a livello di collezione      </td>
      <td>Query,Search,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases,Load,Release,Insert,Delete,Upsert,Import,Flush,Compaction,LoadBalance,CreateIndex,DropIndex,CreatePartition,DropPartition</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbaccollectionadminprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.collection.admin.privileges</code><button data-href="#commonsecurityrbaccollectionadminprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.collection.admin.privileges">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Privilegi di amministrazione a livello di collezione      </td>
      <td>Query,Search,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases,Load,Release,Insert,Delete,Upsert,Import,Flush,Compaction,LoadBalance,CreateIndex,DropIndex,CreatePartition,DropPartition,CreateAlias,DropAlias</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsessionttl" class="common-anchor-header"><code translate="no">common.session.ttl</code><button data-href="#commonsessionttl" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.session.ttl">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Valore ttl quando la sessione concede un lease per registrare il servizio      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsessionretryTimes" class="common-anchor-header"><code translate="no">common.session.retryTimes</code><button data-href="#commonsessionretryTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.session.retryTimes">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tempi di riprova quando la sessione invia richieste etcd    </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksmetricsenable" class="common-anchor-header"><code translate="no">common.locks.metrics.enable</code><button data-href="#commonlocksmetricsenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.metrics.enable">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        se raccogliere statistiche per i blocchi delle metriche      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksthresholdinfo" class="common-anchor-header"><code translate="no">common.locks.threshold.info</code><button data-href="#commonlocksthresholdinfo" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.threshold.info">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        millisecondi minimi per la durata della stampa nel livello info    </td>
      <td>500</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksthresholdwarn" class="common-anchor-header"><code translate="no">common.locks.threshold.warn</code><button data-href="#commonlocksthresholdwarn" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.threshold.warn">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        millisecondi minimi per la durata della stampa nel livello di avviso      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksmaxWLockConditionalWaitTime" class="common-anchor-header"><code translate="no">common.locks.maxWLockConditionalWaitTime</code><button data-href="#commonlocksmaxWLockConditionalWaitTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.maxWLockConditionalWaitTime">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        secondi massimi per l'attesa condizionale in wlock     </td>
      <td>600</td>
    </tr>
  </tbody>
</table>
<h2 id="commonttMsgEnabled" class="common-anchor-header"><code translate="no">common.ttMsgEnabled</code><button data-href="#commonttMsgEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.ttMsgEnabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Disabilita il meccanismo di messaggistica temporale interno al sistema. </li>      
        <li>Se disabilitato (impostato su false), il sistema non consentirà le operazioni DML, compresi l'inserimento, la cancellazione, le interrogazioni e le ricerche. </li>      
        <li>Questo aiuta Milvus-CDC a sincronizzare i dati incrementali.</li>      </td>
      <td>vero</td>
    </tr>
  </tbody>
</table>
<h2 id="commontraceLogMode" class="common-anchor-header"><code translate="no">common.traceLogMode</code><button data-href="#commontraceLogMode" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.traceLogMode">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        traccia richiesta info    </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<h2 id="commonbloomFilterSize" class="common-anchor-header"><code translate="no">common.bloomFilterSize</code><button data-href="#commonbloomFilterSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.bloomFilterSize">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dimensione iniziale del filtro bloom     </td>
      <td>100000</td>
    </tr>
  </tbody>
</table>
<h2 id="commonbloomFilterType" class="common-anchor-header"><code translate="no">common.bloomFilterType</code><button data-href="#commonbloomFilterType" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.bloomFilterType">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tipo di filtro bloom, supporta BasicBloomFilter e BlockedBloomFilter      </td>
      <td>FiltroBloomBloomBloomBloomBloomBloomBloomBloomBloomFilter</td>
    </tr>
  </tbody>
</table>
<h2 id="commonmaxBloomFalsePositive" class="common-anchor-header"><code translate="no">common.maxBloomFalsePositive</code><button data-href="#commonmaxBloomFalsePositive" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.maxBloomFalsePositive">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tasso massimo di falsi positivi per il filtro bloom     </td>
      <td>0.001</td>
    </tr>
  </tbody>
</table>
<h2 id="commonbloomFilterApplyBatchSize" class="common-anchor-header"><code translate="no">common.bloomFilterApplyBatchSize</code><button data-href="#commonbloomFilterApplyBatchSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.bloomFilterApplyBatchSize">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dimensione del batch quando si applica il pk al filtro bloom     </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>
<h2 id="commoncollectionReplicateEnable" class="common-anchor-header"><code translate="no">common.collectionReplicateEnable</code><button data-href="#commoncollectionReplicateEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.collectionReplicateEnable">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Abilita o meno la replica della raccolta.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonusePartitionKeyAsClusteringKey" class="common-anchor-header"><code translate="no">common.usePartitionKeyAsClusteringKey</code><button data-href="#commonusePartitionKeyAsClusteringKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.usePartitionKeyAsClusteringKey">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        se true, esegue la compattazione del clustering e il potenziamento dei segmenti sul campo chiave della partizione      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonuseVectorAsClusteringKey" class="common-anchor-header"><code translate="no">common.useVectorAsClusteringKey</code><button data-href="#commonuseVectorAsClusteringKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.useVectorAsClusteringKey">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        se vero, esegue la compattazione del clustering e il prune dei segmenti sul campo vettore      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonenableVectorClusteringKey" class="common-anchor-header"><code translate="no">common.enableVectorClusteringKey</code><button data-href="#commonenableVectorClusteringKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.enableVectorClusteringKey">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        se true, abilita la chiave di clustering vettoriale e la compattazione del clustering vettoriale      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocalRPCEnabled" class="common-anchor-header"><code translate="no">common.localRPCEnabled</code><button data-href="#commonlocalRPCEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.localRPCEnabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        abilita l'rpc locale per la comunicazione interna in modalità mix o standalone.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsynctaskPoolReleaseTimeoutSeconds" class="common-anchor-header"><code translate="no">common.sync.taskPoolReleaseTimeoutSeconds</code><button data-href="#commonsynctaskPoolReleaseTimeoutSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.sync.taskPoolReleaseTimeoutSeconds">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Il tempo massimo di attesa per il completamento dell'attività e il rilascio delle risorse nel pool    </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
