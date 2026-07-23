---
id: mqtype-overview.md
title: Panoramica sulla coda dei messaggi
summary: >-
  Panoramica delle opzioni relative alla coda dei messaggi (mqType) supportate
  da Milvus e indicazione su quale utilizzare per le implementazioni standalone
  rispetto a quelle distribuite.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Panoramica sulla coda dei messaggi<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus si avvale di una coda di messaggi (write-ahead log, WAL) per gestire i log delle modifiche recenti, i log dei flussi di output e fornire le sottoscrizioni ai log. In Milvus 3.x, <strong>Woodpecker</strong> è la coda di messaggi predefinita e non richiede un'infrastruttura di messaggistica separata. Pulsar, Kafka e RocksMQ continuano a essere supportati per scenari specifici.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Code di messaggi supportate<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>Coda di messaggi</th><th style="text-align:center">Milvus Standalone</th><th style="text-align:center">Milvus distribuito (cluster)</th><th>Predefinita in</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/it/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (integrato)</td><td style="text-align:center">✔️ (integrato o come servizio)</td><td><strong>Milvus 3.x</strong> (entrambe le modalità)</td><td>Predefinito e consigliato. WAL cloud-native su object storage; non richiede alcun servizio esterno.</td></tr>
<tr><td><a href="/docs/it/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (impostazione predefinita del cluster)</td><td>Supportato, esterno o integrato.</td></tr>
<tr><td><a href="/docs/it/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Supportato. Solo Kafka 2.x o 3.x.</td></tr>
<tr><td><a href="/docs/it/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (impostazione predefinita in modalità standalone)</td><td>Supportato <strong>solo</strong> per la versione <strong>standalone</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Ogni istanza di Milvus utilizza esattamente una coda di messaggi.</p></li>
<li><p><strong>Limiti della coda dei messaggi</strong>: quando si esegue l'aggiornamento a Milvus v3.0-beta, è necessario mantenere la coda dei messaggi attualmente in uso. Il passaggio da un sistema di code dei messaggi a un altro durante l'aggiornamento non è supportato. Il supporto per la modifica dei sistemi di code dei messaggi sarà disponibile nelle versioni future.</p></li>
<li><p>Per modificare la coda dei messaggi di un'istanza in esecuzione, consultare <a href="/docs/it/switch-mq-type.md">la sezione "Cambiare il tipo di coda dei messaggi"</a>. La funzionalità "Cambiare il tipo di coda dei messaggi" è disponibile in <strong>Milvus 3.0 e versioni successive</strong>: eseguire prima l'aggiornamento a Milvus 3.0 o versioni successive.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Scelta di una coda di messaggi<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>Nuove distribuzioni (Milvus 3.x):</strong> utilizzare <strong>Woodpecker</strong> (impostazione predefinita). La versione standalone lo esegue in modalità incorporata; per la versione distribuita (cluster), l’impostazione predefinita consigliata è un <a href="/docs/it/woodpecker.md#Deployment-modes">servizio</a> dedicato distribuito con Helm, ma è supportata anche la modalità incorporata.</li>
<li><strong>Utenti esistenti di Pulsar o Kafka:</strong> Pulsar e Kafka continuano a essere pienamente supportati. È possibile mantenerli o <a href="/docs/it/switch-mq-type.md">passare a Woodpecker</a>.</li>
<li><strong>RocksMQ:</strong> solo in modalità standalone, sostituito da Woodpecker integrato in Milvus 3.x.</li>
</ul>
