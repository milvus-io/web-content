---
id: switch-mq-type.md
title: Cambiar el tipo de cola de mensajes
summary: >-
  Cambiar la cola de mensajes de una implementación existente de Milvus de
  Woodpecker a otra cola de mensajes sin tiempo de inactividad.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">Cambiar el tipo de cola de mensajes<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía describe cómo cambiar la cola de mensajes (MQ) de una implementación existente de Milvus <strong>de Woodpecker a otra cola de mensajes</strong>, en línea y sin tiempo de inactividad.</p>
<div class="alert warning">
<p>Esta función está pendiente de lanzamiento y está sujeta a cambios. Ponte en contacto con el servicio de asistencia de Milvus si quieres probarla o tienes alguna duda.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>La función «Cambiar MQ» está disponible en Milvus 3.0 y versiones posteriores.</strong> Actualiza tu instancia de Milvus a la versión 3.0 o posterior antes de utilizarla, ya que la función no está disponible en versiones anteriores.</li>
<li>La instancia funciona correctamente.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Ámbito<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta guía solo trata el cambio <strong>entre Woodpecker y otra cola de mensajes</strong>. El cambio directo entre Pulsar y Kafka queda fuera del alcance de esta guía.</p>
<ul>
<li><a href="/docs/es/switch-rocksmq-woodpecker.md">Cambio entre RocksMQ y Woodpecker</a> — Milvus independiente (Docker Compose)</li>
<li><a href="/docs/es/switch-pulsar-woodpecker.md">Cambio entre Pulsar y Woodpecker</a> — Clúster de Milvus (Helm / Milvus Operator)</li>
<li><a href="/docs/es/switch-kafka-woodpecker.md">Cambio entre Kafka y Woodpecker</a> — Clúster de Milvus (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Flujo de trabajo general<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
<li>Asegúrate de que la instancia de Milvus se esté ejecutando correctamente.</li>
<li>Confirma el tipo de MQ de origen y el tipo de MQ de destino.</li>
<li>Aplica los ajustes de acceso de la cola de mensajes de destino a la configuración de Milvus <strong>sin</strong> modificar el valor de « <code translate="no">mqType</code> ».</li>
<li>Activa el cambio llamando a la API «WAL alter» en MixCoord.</li>
<li>Supervisa los registros para confirmar que el cambio se ha completado.</li>
</ol>
<div class="alert note">
<p>Antes de realizar la conmutación, asegúrate de que la MQ de destino no contenga temas con los mismos nombres que los utilizados por la instancia actual de Milvus. Esto es especialmente importante si la MQ de destino ha sido utilizada por otra instancia de Milvus, ya que los nombres de temas conflictivos pueden provocar un comportamiento inesperado.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Matriz de compatibilidad<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>MQ de origen</th><th>MQ de destino</th><th>Implementación</th><th>Estado</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (local/MinIO)</td><td>Autónomo (Docker Compose)</td><td><strong>Compatible</strong></td></tr>
<tr><td>Woodpecker (local/MinIO)</td><td>RocksMQ</td><td>Autónomo (Docker Compose)</td><td><strong>Compatible</strong></td></tr>
<tr><td>Pulsar (integrado/externo)</td><td>Woodpecker (MinIO)</td><td>Clúster (Helm / Operador)</td><td><strong>Compatible</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (externo)</td><td>Clúster (Helm / Operator)</td><td><strong>Compatible</strong></td></tr>
<tr><td>Kafka (integrado/externo)</td><td>Woodpecker (MinIO)</td><td>Clúster (Helm / Operador)</td><td><strong>Compatible</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (externo)</td><td>Clúster (Helm / Operator)</td><td><strong>Compatible</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker local (o viceversa)</td><td>cualquiera</td><td><strong>No compatible</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Evita cambiar repetidamente de un tipo de MQ a otro. Si tienes que hacerlo, asegúrate de limpiar los datos relacionados antes de cada cambio; los datos residuales pueden provocar un comportamiento inesperado.</p>
</div>
