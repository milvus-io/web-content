---
id: mqtype-overview.md
title: Descripción general de la cola de mensajes
summary: >-
  Resumen de las opciones de la cola de mensajes (mqType) compatibles con
  Milvus, y cuál se debe utilizar para implementaciones independientes frente a
  las distribuidas.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Descripción general de la cola de mensajes<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utiliza una cola de mensajes (registro de escritura anticipada, WAL) para gestionar los registros de los cambios recientes y los registros de flujos de salida, así como para proporcionar suscripciones a los registros. En Milvus 3.x, <strong>Woodpecker</strong> es la cola de mensajes predeterminada y no requiere una infraestructura de mensajería independiente. Pulsar, Kafka y RocksMQ siguen siendo compatibles para escenarios específicos.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Colas de mensajes compatibles<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>Cola de mensajes</th><th style="text-align:center">Milvus autónomo</th><th style="text-align:center">Milvus distribuido (clúster)</th><th>Predeterminada en</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/es/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (integrado)</td><td style="text-align:center">✔️ (integrado o como servicio)</td><td><strong>Milvus 3.x</strong> (ambos modos)</td><td>Predeterminado y recomendado. WAL nativo en la nube en almacenamiento de objetos; no requiere ningún servicio externo.</td></tr>
<tr><td><a href="/docs/es/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (predeterminado del clúster)</td><td>Compatible, externo o integrado.</td></tr>
<tr><td><a href="/docs/es/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Compatible. Solo Kafka 2.x o 3.x.</td></tr>
<tr><td><a href="/docs/es/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (predeterminado en modo autónomo)</td><td>Compatible <strong>solo</strong> con la versión <strong>independiente</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Cada instancia de Milvus utiliza exactamente una cola de mensajes.</p></li>
<li><p><strong>Limitaciones de la cola de mensajes</strong>: al actualizar a Milvus v3.0-beta, debes mantener tu elección actual de cola de mensajes. No se admite el cambio entre diferentes sistemas de colas de mensajes durante la actualización. La compatibilidad con el cambio de sistemas de colas de mensajes estará disponible en futuras versiones.</p></li>
<li><p>Para cambiar la cola de mensajes de una instancia en ejecución, consulta «Cambiar el tipo de cola de mensajes» (compatible a partir de la v2.6.14).</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Elección de una cola de mensajes<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>Nuevas implementaciones (Milvus 3.x):</strong> utilice <strong>Woodpecker</strong> (el valor predeterminado). En el modo autónomo se ejecuta de forma integrada; para el modo distribuido (clúster), el valor predeterminado recomendado es un <a href="/docs/es/woodpecker.md#Deployment-modes">servicio</a> dedicado implementado con Helm, aunque también se admite la ejecución integrada.</li>
<li><strong>Usuarios actuales de Pulsar o Kafka:</strong> Pulsar y Kafka siguen siendo totalmente compatibles. Manténgalos o cambie a Woodpecker.</li>
<li><strong>RocksMQ:</strong> solo en modo autónomo, y sustituido por Woodpecker integrado en Milvus 3.x.</li>
</ul>
