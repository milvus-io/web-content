---
id: switch-mq-type.md
title: Cambiare il tipo di coda dei messaggi (MQ)
summary: >-
  Commutare la coda dei messaggi di un'istanza Milvus esistente da Woodpecker a
  un'altra coda dei messaggi senza tempi di inattività.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">Cambiare il tipo di coda dei messaggi (MQ)<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida descrive come passare dalla coda dei messaggi (MQ) di un'istanza Milvus esistente <strong>da Woodpecker a un'altra coda dei messaggi</strong>, online e senza tempi di inattività.</p>
<div class="alert warning">
<p>Questa funzionalità è in fase di rilascio ed è soggetta a modifiche. Contatta l'assistenza Milvus se desideri provarla o se hai domande.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>La funzionalità "Cambio MQ" è disponibile in Milvus 3.0 e versioni successive.</strong> Aggiornare l'istanza di Milvus alla versione 3.0 o successiva prima di utilizzarla: la funzionalità non è disponibile nelle versioni precedenti.</li>
<li>L’istanza è in esecuzione corretta.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Ambito<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa guida tratta esclusivamente il passaggio <strong>da Woodpecker a un’altra coda di messaggi</strong>. Il passaggio diretto da Pulsar a Kafka non rientra nell’ambito di questa guida.</p>
<ul>
<li><a href="/docs/it/switch-rocksmq-woodpecker.md">Passaggio da RocksMQ a Woodpecker</a> — Milvus Standalone (Docker Compose)</li>
<li><a href="/docs/it/switch-pulsar-woodpecker.md">Passaggio da Pulsar a Woodpecker</a> — Cluster Milvus (Helm / Milvus Operator)</li>
<li><a href="/docs/it/switch-kafka-woodpecker.md">Passaggio da Kafka a Woodpecker</a> — Cluster Milvus (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Flusso di lavoro generale<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Assicurarsi che l’istanza di Milvus sia in esecuzione corretta.</li>
<li>Verificare il tipo di MQ di origine e quello di destinazione.</li>
<li>Inserire le impostazioni di accesso dell’MQ di destinazione nella configurazione di Milvus <strong>senza</strong> modificare il valore di <code translate="no">mqType</code>.</li>
<li>Avviare il passaggio chiamando l’API WAL alter su MixCoord.</li>
<li>Monitorare i log per verificare che il passaggio sia stato completato.</li>
</ol>
<div class="alert note">
<p>Prima del passaggio, assicurarsi che l’MQ di destinazione non contenga argomenti con nomi identici a quelli utilizzati dall’istanza Milvus corrente. Ciò è particolarmente importante se l’MQ di destinazione è stato utilizzato da un’altra istanza Milvus, poiché nomi di argomenti in conflitto possono causare comportamenti imprevisti.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Matrice di supporto<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>MQ di origine</th><th>MQ di destinazione</th><th>Distribuzione</th><th>Stato</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (locale/MinIO)</td><td>Autonomo (Docker Compose)</td><td><strong>Supportato</strong></td></tr>
<tr><td>Woodpecker (locale/MinIO)</td><td>RocksMQ</td><td>Autonomo (Docker Compose)</td><td><strong>Supportato</strong></td></tr>
<tr><td>Pulsar (integrato/esterno)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Supportato</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (esterno)</td><td>Cluster (Helm / Operator)</td><td><strong>Supportato</strong></td></tr>
<tr><td>Kafka (integrato/esterno)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Supportato</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (esterno)</td><td>Cluster (Helm / Operator)</td><td><strong>Supportato</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker locale (o viceversa)</td><td>qualsiasi</td><td><strong>Non supportato</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Evitare di passare ripetutamente da un tipo di MQ all'altro. Se è necessario effettuare il cambio, assicurarsi di ripulire i dati correlati prima di ogni passaggio: i dati residui potrebbero causare comportamenti imprevisti.</p>
</div>
