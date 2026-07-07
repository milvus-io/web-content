---
id: switch-rocksmq-woodpecker.md
title: Cambiar entre RocksMQ y Woodpecker
summary: >-
  Cambia la cola de mensajes de una implementación de Milvus Standalone (Docker
  Compose) de RocksMQ a Woodpecker.
---
<h1 id="Switch-between-RocksMQ-and-Woodpecker" class="common-anchor-header">Cambiar entre RocksMQ y Woodpecker<button data-href="#Switch-between-RocksMQ-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta página se describe cómo cambiar la cola de mensajes (MQ) de una implementación <strong>de Milvus Standalone (Docker Compose)</strong> entre <strong>RocksMQ</strong> y <strong>Woodpecker</strong> (backend local o MinIO), en ambas direcciones. Para conocer el flujo de trabajo general y los requisitos previos, consulta <a href="/docs/es/switch-mq-type.md">Cambiar el tipo de MQ</a>.</p>
<div class="alert note">
<ul>
<li><strong>Requisito previo:</strong> la función «Cambiar MQ» está disponible en <strong>Milvus 3.0 y versiones posteriores</strong>. Actualiza tu instancia de Milvus a Milvus 3.0 o una versión posterior antes de empezar; la función no está disponible en versiones anteriores.</li>
<li>El cambio de MQ requiere la implementación de Docker <strong>Compose</strong> (que habilita una fuente de configuración etcd). La implementación de Docker de un solo contenedor no admite el cambio.</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker" class="common-anchor-header">Cambiar de RocksMQ a Woodpecker<button data-href="#Switch-from-RocksMQ-to-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Paso 1: Comprueba que la instancia de Milvus esté en funcionamiento<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Comprueba que tu instancia de Milvus Standalone con Docker Compose se está ejecutando correctamente; por ejemplo, creando una colección de prueba, insertando datos y ejecutando una consulta.</p>
<h3 id="Step-2-Configure-Woodpecker-storage" class="common-anchor-header">Paso 2: Configurar el almacenamiento de Woodpecker<button data-href="#Step-2-Configure-Woodpecker-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Añade los ajustes de Woodpecker a la configuración de Milvus <strong>sin</strong> modificar el valor de « <code translate="no">mqType</code> ». Ejecuta « <code translate="no">docker exec -it milvus-standalone bash</code> » para acceder al contenedor y, a continuación, edita « <code translate="no">/milvus/configs/user.yaml</code> »:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>   <span class="hljs-comment"># minio or local</span>
<button class="copy-code-btn"></button></code></pre>
<p>Reinicia la instancia de Milvus para aplicar la configuración:</p>
<pre><code translate="no" class="language-shell">docker compose restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Paso 3: Ejecutar el cambio a MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Si es la primera vez que cambia a Woodpecker, omita esta nota. De lo contrario, elimine los metadatos y datos residuales de Woodpecker antes de volver a cambiar; los datos residuales pueden provocar un comportamiento inesperado.</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>El puerto de MixCoord suele ser <code translate="no">9091</code>.</p>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Paso 4: Comprueba que el cambio se ha completado<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Si el cambio se ha realizado correctamente, se registra en <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<h3 id="Step-5-Optional-Clean-up-RocksMQ-data" class="common-anchor-header">Paso 5: (Opcional) Limpia los datos de RocksMQ<button data-href="#Step-5-Optional-Clean-up-RocksMQ-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Los datos de RocksMQ se encuentran en los directorios <code translate="no">volumes/milvus/rdb_data</code> y <code translate="no">volumes/milvus/rdb_data_meta_kv</code>, definidos en <code translate="no">docker-compose.yaml</code>. Si tiene previsto volver a RocksMQ más adelante, elimine primero estos archivos para evitar conflictos.</p>
<h2 id="Switch-from-Woodpecker-to-RocksMQ" class="common-anchor-header">Cambiar de Woodpecker a RocksMQ<button data-href="#Switch-from-Woodpecker-to-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Paso 1: Comprueba que la instancia de Milvus esté en ejecución<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Asegúrate de que tu instancia de Milvus Standalone Docker Compose se está ejecutando correctamente.</p>
<h3 id="Step-2-Execute-the-MQ-switch" class="common-anchor-header">Paso 2: Ejecuta el cambio a MQ<button data-href="#Step-2-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Asegúrate de que la instancia no contenga datos residuales de RocksMQ de una ejecución anterior. Si es la primera vez que cambias a RocksMQ, omite esta nota; de lo contrario, elimina primero los metadatos y datos relacionados con RocksMQ.</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;rocksmq&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Verify-the-switch-is-complete" class="common-anchor-header">Paso 3: Comprueba que el cambio se ha completado<button data-href="#Step-3-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Si la migración se ha realizado correctamente, se registrará en el archivo de registro « <code translate="no">[mqTypeValue=rocksmq]</code> ».</p>
<h3 id="Step-4-Optional-Clean-up-Woodpecker-data" class="common-anchor-header">Paso 4: (Opcional) Limpia los datos de Woodpecker<button data-href="#Step-4-Optional-Clean-up-Woodpecker-data" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Metadatos (etcd):</strong> el prefijo de la clave de Woodpecker suele ser <code translate="no">woodpecker/...</code>. Consúltalo con <code translate="no">etcdctl get woodpecker --prefix</code> y, a continuación, elimínalo.</li>
<li><strong>Datos de almacenamiento:</strong> en <strong>modo MinIO</strong>, elimina los datos de registro que se encuentran en <code translate="no">&lt;rootPath&gt;/wp/...</code> (normalmente <code translate="no">files/wp/...</code>) dentro del bucket; en <strong>modo local</strong>, los datos se encuentran en el disco local en <code translate="no">volumes/milvus/data/wp/...</code>.</li>
</ul>
<p>Si tiene previsto volver a Woodpecker más adelante, elimine primero estos archivos para evitar conflictos.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Escenarios compatibles<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>MQ de origen</th><th>MQ de destino</th><th>Estado</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (MinIO/local)</td><td><strong>Compatible</strong></td><td></td></tr>
<tr><td>Woodpecker (MinIO/local)</td><td>RocksMQ</td><td><strong>Compatible</strong></td><td></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker local</td><td><strong>No compatible</strong></td><td>Cambiar entre los modos de almacenamiento de Woodpecker requiere una gestión adicional de metadatos, que aún no está compatible.</td></tr>
<tr><td>Woodpecker local</td><td>Woodpecker MinIO</td><td><strong>No compatible</strong></td><td>Lo mismo que arriba.</td></tr>
<tr><td>RocksMQ / Woodpecker</td><td>Pulsar externo / Kafka</td><td><strong>Compatible, pero no recomendado</strong></td><td>Mantén las instancias independientes lo más sencillas posible.</td></tr>
</tbody>
</table>
