---
id: configure_quotaandlimits.md
related_key: configure
group: system_configuration.md
summary: Imparare a configurare quotaAndLimits per Milvus.
---
<h1 id="quotaAndLimits-related-Configurations" class="common-anchor-header">Configurazioni relative a quote e limiti<button data-href="#quotaAndLimits-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>QuotaConfig, configurazioni della quota e dei limiti di Milvus.</p>
<p>Per impostazione predefinita, sono abilitati:</p>
<ol>
<li><p>Protezione TT;</p></li>
<li><p>Protezione della memoria.</p></li>
<li><p>Protezione della quota disco.</p></li>
</ol>
<p>È possibile abilitare:</p>
<ol>
<li><p>Limitazione del throughput DML;</p></li>
<li><p>Limitazione DDL, DQL qps/rps;</p></li>
<li><p>Protezione della lunghezza/latenza della coda DQL;</p></li>
<li><p>Protezione della velocità dei risultati DQL;</p></li>
</ol>
<p>Se necessario, si può anche forzare manualmente il rifiuto delle richieste RW.</p>
<h2 id="quotaAndLimitsenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.enabled</code><button data-href="#quotaAndLimitsenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        `true` per abilitare la quota e i limiti, `false` per disabilitare.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsquotaCenterCollectInterval" class="common-anchor-header"><code translate="no">quotaAndLimits.quotaCenterCollectInterval</code><button data-href="#quotaAndLimitsquotaCenterCollectInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.quotaCenterCollectInterval">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>quotaCenterCollectInterval è l'intervallo di tempo in cui quotaCenter</li>      
        <li>raccoglie le metriche da Proxy, Query cluster e Data cluster.</li>      
        <li>secondi, (0 ~ 65536)</li>      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitsallocRetryTimes" class="common-anchor-header"><code translate="no">quotaAndLimits.limits.allocRetryTimes</code><button data-href="#quotaAndLimitslimitsallocRetryTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limits.allocRetryTimes">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tempi di riprova quando l'eliminazione dell'allocazione dei dati di inoltro dal limite di velocità è fallita      </td>
      <td>15</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitsallocWaitInterval" class="common-anchor-header"><code translate="no">quotaAndLimits.limits.allocWaitInterval</code><button data-href="#quotaAndLimitslimitsallocWaitInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limits.allocWaitInterval">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        durata dell'attesa del tentativo quando l'eliminazione dell'allocazione dei dati in avanti non è riuscita, in millisecondi      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitscomplexDeleteLimitEnable" class="common-anchor-header"><code translate="no">quotaAndLimits.limits.complexDeleteLimitEnable</code><button data-href="#quotaAndLimitslimitscomplexDeleteLimitEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limits.complexDeleteLimitEnable">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        se cancellare il controllo complesso dei dati di inoltro da parte del limitatore      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitsmaxCollectionNumPerDB" class="common-anchor-header"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code><button data-href="#quotaAndLimitslimitsmaxCollectionNumPerDB" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limits.maxCollectionNumPerDB">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Numero massimo di raccolte per database.      </td>
      <td>65536</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitsmaxInsertSize" class="common-anchor-header"><code translate="no">quotaAndLimits.limits.maxInsertSize</code><button data-href="#quotaAndLimitslimitsmaxInsertSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limits.maxInsertSize">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dimensione massima di una singola richiesta di inserimento, in byte, -1 significa nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitsmaxResourceGroupNumOfQueryNode" class="common-anchor-header"><code translate="no">quotaAndLimits.limits.maxResourceGroupNumOfQueryNode</code><button data-href="#quotaAndLimitslimitsmaxResourceGroupNumOfQueryNode" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limits.maxResourceGroupNumOfQueryNode">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        numero massimo di gruppi di risorse dei nodi di interrogazione      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitsmaxGroupSize" class="common-anchor-header"><code translate="no">quotaAndLimits.limits.maxGroupSize</code><button data-href="#quotaAndLimitslimitsmaxGroupSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limits.maxGroupSize">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dimensione massima per un singolo gruppo quando si esegue una ricerca per gruppo      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsddlenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.ddl.enabled</code><button data-href="#quotaAndLimitsddlenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.ddl.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Se la strozzatura delle richieste DDL è abilitata.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsddlcollectionRate" class="common-anchor-header"><code translate="no">quotaAndLimits.ddl.collectionRate</code><button data-href="#quotaAndLimitsddlcollectionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.ddl.collectionRate">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di richieste DDL relative alla raccolta al secondo.</li>      
        <li>L'impostazione di questa voce a 10 indica che Milvus non elabora più di 10 richieste DDL relative alla raccolta al secondo, comprese le richieste di creazione della raccolta, le richieste di abbandono della raccolta, le richieste di caricamento della raccolta e le richieste di rilascio della raccolta.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.ddl.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsddlpartitionRate" class="common-anchor-header"><code translate="no">quotaAndLimits.ddl.partitionRate</code><button data-href="#quotaAndLimitsddlpartitionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.ddl.partitionRate">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di richieste DDL relative alla partizione al secondo.</li>      
        <li>L'impostazione di questa voce a 10 indica che Milvus non elabora più di 10 richieste al secondo relative alle partizioni, comprese le richieste di creazione di partizioni, di abbandono di partizioni, di caricamento di partizioni e di rilascio di partizioni.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.ddl.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsddldbcollectionRate" class="common-anchor-header"><code translate="no">quotaAndLimits.ddl.db.collectionRate</code><button data-href="#quotaAndLimitsddldbcollectionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.ddl.db.collectionRate">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps del livello db, valore predefinito nessun limite, frequenza per CreateCollection, DropCollection, LoadCollection, ReleaseCollection      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsddldbpartitionRate" class="common-anchor-header"><code translate="no">quotaAndLimits.ddl.db.partitionRate</code><button data-href="#quotaAndLimitsddldbpartitionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.ddl.db.partitionRate">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps del livello del db, default nessun limite, tasso per CreatePartition, DropPartition, LoadPartition, ReleasePartition      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsindexRateenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.indexRate.enabled</code><button data-href="#quotaAndLimitsindexRateenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.indexRate.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Se è abilitato il throttling delle richieste relative agli indici.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsindexRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.indexRate.max</code><button data-href="#quotaAndLimitsindexRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.indexRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di richieste relative agli indici al secondo.</li>      
        <li>L'impostazione di questa voce a 10 indica che Milvus non elabora più di 10 richieste relative a partizioni al secondo, comprese le richieste di creazione e di abbandono di indici.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.indexRate.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsindexRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.indexRate.db.max</code><button data-href="#quotaAndLimitsindexRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.indexRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps del livello db, default nessun limite, tasso per CreateIndex, DropIndex      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsflushRateenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.flushRate.enabled</code><button data-href="#quotaAndLimitsflushRateenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.flushRate.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Se la strozzatura delle richieste di flush è abilitata.      </td>
      <td>vero</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsflushRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.flushRate.max</code><button data-href="#quotaAndLimitsflushRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.flushRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di richieste di lavaggio al secondo.</li>      
        <li>L'impostazione di questa voce a 10 indica che Milvus non elabora più di 10 richieste di lavaggio al secondo.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.flushRate.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsflushRatecollectionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.flushRate.collection.max</code><button data-href="#quotaAndLimitsflushRatecollectionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.flushRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps, default nessun limite, velocità di lavaggio a livello di raccolta.      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsflushRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.flushRate.db.max</code><button data-href="#quotaAndLimitsflushRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.flushRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps del livello db, per impostazione predefinita nessun limite, velocità per il lavaggio      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitscompactionRateenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.compactionRate.enabled</code><button data-href="#quotaAndLimitscompactionRateenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.compactionRate.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Abilita o meno la limitazione manuale delle richieste di compattazione.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitscompactionRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.compactionRate.max</code><button data-href="#quotaAndLimitscompactionRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.compactionRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di richieste di compattazione manuale al secondo.</li>      
        <li>L'impostazione di questa voce a 10 indica che Milvus non elabora più di 10 richieste di compattazione manuale al secondo.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.compaction.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitscompactionRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.compactionRate.db.max</code><button data-href="#quotaAndLimitscompactionRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.compactionRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps del livello db, default nessun limite, tasso per la Compattazione manuale      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.enabled</code><button data-href="#quotaAndLimitsdmlenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Abilita o meno la limitazione delle richieste DML.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlinsertRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.insertRate.max</code><button data-href="#quotaAndLimitsdmlinsertRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.insertRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Velocità massima di inserimento dei dati al secondo.</li>      
        <li>L'impostazione di questa voce a 5 indica che Milvus consente l'inserimento dei dati solo alla velocità di 5 MB/s.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dml.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlinsertRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.insertRate.db.max</code><button data-href="#quotaAndLimitsdmlinsertRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.insertRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlinsertRatecollectionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code><button data-href="#quotaAndLimitsdmlinsertRatecollectionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.insertRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Velocità massima di inserimento dati per raccolta al secondo.</li>      
        <li>L'impostazione di questa voce a 5 indica che Milvus consente l'inserimento di dati in qualsiasi raccolta solo alla velocità di 5 MB/s.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dml.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlinsertRatepartitionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.insertRate.partition.max</code><button data-href="#quotaAndLimitsdmlinsertRatepartitionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.insertRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlupsertRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.upsertRate.max</code><button data-href="#quotaAndLimitsdmlupsertRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.upsertRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlupsertRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.upsertRate.db.max</code><button data-href="#quotaAndLimitsdmlupsertRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.upsertRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlupsertRatecollectionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.upsertRate.collection.max</code><button data-href="#quotaAndLimitsdmlupsertRatecollectionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.upsertRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlupsertRatepartitionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.upsertRate.partition.max</code><button data-href="#quotaAndLimitsdmlupsertRatepartitionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.upsertRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmldeleteRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.deleteRate.max</code><button data-href="#quotaAndLimitsdmldeleteRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.deleteRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Velocità massima di cancellazione dei dati al secondo.</li>      
        <li>L'impostazione di questa voce a 0,1 indica che Milvus consente solo l'eliminazione dei dati alla velocità di 0,1 MB/s.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dml.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmldeleteRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.deleteRate.db.max</code><button data-href="#quotaAndLimitsdmldeleteRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.deleteRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmldeleteRatecollectionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code><button data-href="#quotaAndLimitsdmldeleteRatecollectionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.deleteRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Velocità massima di cancellazione dei dati al secondo.</li>      
        <li>L'impostazione di questa voce a 0,1 indica che Milvus consente solo l'eliminazione dei dati da qualsiasi raccolta alla velocità di 0,1 MB/s.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dml.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmldeleteRatepartitionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.deleteRate.partition.max</code><button data-href="#quotaAndLimitsdmldeleteRatepartitionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.deleteRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, predefinito nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlbulkLoadRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.bulkLoadRate.max</code><button data-href="#quotaAndLimitsdmlbulkLoadRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.bulkLoadRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite, non ancora supportato. TODO: limitare la velocità di bulkload      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlbulkLoadRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.bulkLoadRate.db.max</code><button data-href="#quotaAndLimitsdmlbulkLoadRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.bulkLoadRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite, non ancora supportato. TODO: limitare la velocità di caricamento del db bulkLoad      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlbulkLoadRatecollectionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.bulkLoadRate.collection.max</code><button data-href="#quotaAndLimitsdmlbulkLoadRatecollectionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.bulkLoadRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default nessun limite, non ancora supportato. TODO: limitare la velocità di caricamento della raccolta      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdmlbulkLoadRatepartitionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dml.bulkLoadRate.partition.max</code><button data-href="#quotaAndLimitsdmlbulkLoadRatepartitionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dml.bulkLoadRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, per impostazione predefinita nessun limite, non ancora supportato. TODO: limitare la velocità di caricamento della partizione      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.enabled</code><button data-href="#quotaAndLimitsdqlenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Abilita o meno la limitazione delle richieste DQL.      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlsearchRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.searchRate.max</code><button data-href="#quotaAndLimitsdqlsearchRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.searchRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di vettori da cercare al secondo.</li>      
        <li>L'impostazione di questa voce a 100 indica che Milvus consente di cercare solo 100 vettori al secondo, indipendentemente dal fatto che questi 100 vettori siano tutti in un'unica ricerca o sparsi in più ricerche.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dql.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlsearchRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.searchRate.db.max</code><button data-href="#quotaAndLimitsdqlsearchRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.searchRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        vps (vettori al secondo), predefinito nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlsearchRatecollectionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code><button data-href="#quotaAndLimitsdqlsearchRatecollectionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.searchRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di vettori da cercare per collezione al secondo.</li>      
        <li>L'impostazione di questa voce a 100 indica che Milvus consente di cercare solo 100 vettori al secondo per collezione, indipendentemente dal fatto che questi 100 vettori siano tutti in un'unica ricerca o sparsi in più ricerche.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dql.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlsearchRatepartitionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.searchRate.partition.max</code><button data-href="#quotaAndLimitsdqlsearchRatepartitionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.searchRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        vps (vettori al secondo), predefinito nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlqueryRatemax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.queryRate.max</code><button data-href="#quotaAndLimitsdqlqueryRatemax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.queryRate.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di query al secondo.</li>      
        <li>L'impostazione di questa voce a 100 indica che Milvus consente solo 100 query al secondo.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dql.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlqueryRatedbmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.queryRate.db.max</code><button data-href="#quotaAndLimitsdqlqueryRatedbmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.queryRate.db.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlqueryRatecollectionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code><button data-href="#quotaAndLimitsdqlqueryRatecollectionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.queryRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Numero massimo di interrogazioni per raccolta al secondo.</li>      
        <li>L'impostazione di questa voce a 100 indica che Milvus consente solo 100 query per raccolta al secondo.</li>      
        <li>Per utilizzare questa impostazione, impostare contemporaneamente quotaAndLimits.dql.enabled su true.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitsdqlqueryRatepartitionmax" class="common-anchor-header"><code translate="no">quotaAndLimits.dql.queryRate.partition.max</code><button data-href="#quotaAndLimitsdqlqueryRatepartitionmax" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.dql.queryRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps, default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingforceDeny" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code><button data-href="#quotaAndLimitslimitWritingforceDeny" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.forceDeny">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>forceDeny false significa che le richieste di dml sono consentite (tranne che per alcune</li>      
        <li>condizioni specifiche, come la memoria dei nodi da marcare con l'acqua), true significa che le richieste dml sono sempre rifiutate.</li>      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code><button data-href="#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>maxTimeTickDelay indica la pressione posteriore per le operazioni DML.</li>      
        <li>La velocità delle operazioni DML viene ridotta in base al rapporto tra il ritardo dei tick temporali e maxTimeTickDelay,</li>      
        <li>se il ritardo è superiore a maxTimeTickDelay, tutte le richieste DML vengono rifiutate.</li>      
        <li>secondi</li>      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingmemProtectionenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code><button data-href="#quotaAndLimitslimitWritingmemProtectionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.memProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Quando l'utilizzo della memoria &gt; memoryHighWaterLevel, tutte le richieste DML vengono rifiutate;</li>      
        <li>Quando memoryLowWaterLevel &lt; memory usage &lt; memoryHighWaterLevel, ridurre la velocità del dml;</li>      
        <li>Quando l'utilizzo della memoria &lt; memoryLowWaterLevel, nessuna azione.</li>      </td>
      <td>vero</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code><button data-href="#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        (0, 1], memoryLowWaterLevel in DataNodes      </td>
      <td>0.85</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code><button data-href="#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        (0, 1], memoryHighWaterLevel in DataNodes      </td>
      <td>0.95</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code><button data-href="#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        (0, 1], memoryLowWaterLevel in QueryNodes      </td>
      <td>0.85</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code><button data-href="#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        (0, 1], memoryHighWaterLevel in QueryNodes      </td>
      <td>0.95</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritinggrowingSegmentsSizeProtectionenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.growingSegmentsSizeProtection.enabled</code><button data-href="#quotaAndLimitslimitWritinggrowingSegmentsSizeProtectionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.growingSegmentsSizeProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Se la dimensione dei segmenti in crescita è inferiore alla filigrana bassa, non verrà intrapresa alcuna azione.</li>      
        <li>Quando la dimensione dei segmenti in crescita supera la filigrana bassa, la velocità dml verrà ridotta,</li>      
        <li>ma la velocità non sarà inferiore a minRateRatio * dmlRate.</li>      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdiskProtectionenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code><button data-href="#quotaAndLimitslimitWritingdiskProtectionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.diskProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Quando la dimensione totale del file di archiviazione degli oggetti è superiore a `diskQuota`, tutte le richieste dml vengono rifiutate;      </td>
      <td>vero</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdiskProtectiondiskQuota" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code><button data-href="#quotaAndLimitslimitWritingdiskProtectiondiskQuota" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.diskProtection.diskQuota">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB, (0, +inf), default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerDB" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerDB</code><button data-href="#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerDB" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.diskProtection.diskQuotaPerDB">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB, (0, +inf), default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code><button data-href="#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB, (0, +inf), default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerPartition" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerPartition</code><button data-href="#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerPartition" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.diskProtection.diskQuotaPerPartition">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB, (0, +inf), default nessun limite      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingl0SegmentsRowCountProtectionenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.enabled</code><button data-href="#quotaAndLimitslimitWritingl0SegmentsRowCountProtectionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        interruttore per abilitare la quota del conteggio delle righe del segmento l0  </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingl0SegmentsRowCountProtectionlowWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.lowWaterLevel</code><button data-href="#quotaAndLimitslimitWritingl0SegmentsRowCountProtectionlowWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.lowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        quota conteggio righe segmento l0, livello basso dell'acqua      </td>
      <td>30000000</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingl0SegmentsRowCountProtectionhighWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.highWaterLevel</code><button data-href="#quotaAndLimitslimitWritingl0SegmentsRowCountProtectionhighWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.highWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        l0 segmento conteggio righe quota, livello alto dell'acqua      </td>
      <td>50000000</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdeleteBufferRowCountProtectionenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.deleteBufferRowCountProtection.enabled</code><button data-href="#quotaAndLimitslimitWritingdeleteBufferRowCountProtectionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.deleteBufferRowCountProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        interruttore per abilitare l'eliminazione della quota del conteggio delle righe del buffer      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdeleteBufferRowCountProtectionlowWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.deleteBufferRowCountProtection.lowWaterLevel</code><button data-href="#quotaAndLimitslimitWritingdeleteBufferRowCountProtectionlowWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.deleteBufferRowCountProtection.lowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        cancella la quota del conteggio delle righe del buffer, livello basso dell'acqua      </td>
      <td>32768</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdeleteBufferRowCountProtectionhighWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.deleteBufferRowCountProtection.highWaterLevel</code><button data-href="#quotaAndLimitslimitWritingdeleteBufferRowCountProtectionhighWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.deleteBufferRowCountProtection.highWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        cancella quota di righe del buffer, livello alto dell'acqua      </td>
      <td>65536</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdeleteBufferSizeProtectionenabled" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.deleteBufferSizeProtection.enabled</code><button data-href="#quotaAndLimitslimitWritingdeleteBufferSizeProtectionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.deleteBufferSizeProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        interruttore per abilitare la quota della dimensione del buffer da cancellare      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdeleteBufferSizeProtectionlowWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.deleteBufferSizeProtection.lowWaterLevel</code><button data-href="#quotaAndLimitslimitWritingdeleteBufferSizeProtectionlowWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.deleteBufferSizeProtection.lowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        eliminare la quota di dimensione del buffer, livello dell'acqua basso     </td>
      <td>134217728</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitWritingdeleteBufferSizeProtectionhighWaterLevel" class="common-anchor-header"><code translate="no">quotaAndLimits.limitWriting.deleteBufferSizeProtection.highWaterLevel</code><button data-href="#quotaAndLimitslimitWritingdeleteBufferSizeProtectionhighWaterLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitWriting.deleteBufferSizeProtection.highWaterLevel">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        eliminare la quota di dimensione del buffer, livello alto dell'acqua      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="quotaAndLimitslimitReadingforceDeny" class="common-anchor-header"><code translate="no">quotaAndLimits.limitReading.forceDeny</code><button data-href="#quotaAndLimitslimitReadingforceDeny" class="anchor-icon" translate="no">
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
    </button></h2><table id="quotaAndLimits.limitReading.forceDeny">
  <thead>
    <tr>
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>forceDeny false significa che le richieste dql sono consentite (tranne che per alcune</li>      
        <li>condizioni specifiche, come l'abbandono della raccolta), true significa che tutte le richieste dql vengono sempre rifiutate.</li>      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
