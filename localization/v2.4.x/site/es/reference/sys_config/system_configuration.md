---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Conozca la configuración del sistema Milvus.
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Lista de comprobación de las configuraciones del sistema Milvus<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta las secciones generales de las configuraciones del sistema en Milvus.</p>
<p>Milvus mantiene un número considerable de parámetros que configuran el sistema. Cada configuración tiene un valor por defecto, que puede utilizarse directamente. Puede modificar estos parámetros de forma flexible para que Milvus pueda servir mejor a su aplicación. Consulte <a href="/docs/es/v2.4.x/configure-docker.md">Configurar Milvus</a> para obtener más información.</p>
<div class="alert note">
En la versión actual, todos los parámetros tienen efecto sólo después de ser configurados en el arranque de Milvus.</div>
<h2 id="Sections" class="common-anchor-header">Secciones<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>Para la conveniencia del mantenimiento, Milvus clasifica sus configuraciones en %s secciones basadas en sus componentes, dependencias y uso general.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Configuración relacionada de etcd, utilizada para almacenar los metadatos de Milvus y el descubrimiento de servicios.</p>
<p>Vea <a href="/docs/es/v2.4.x/configure_etcd.md">Configuraciones relacionadas con etcd</a> para una descripción detallada de cada parámetro bajo esta sección.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>Vea <a href="/docs/es/v2.4.x/configure_metastore.md">Configuraciones relacionadas con metastore</a> para una descripción detallada de cada parámetro en esta sección.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Configuración relacionada de tikv, utilizada para almacenar los metadatos de Milvus.</p>
<p>Tenga en cuenta que cuando TiKV está habilitado para el metastore, todavía necesita tener etcd para el descubrimiento de servicios.</p>
<p>TiKV es una buena opción cuando el tamaño de los metadatos requiere una mejor escalabilidad horizontal.</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_tikv.md">Configuraciones relacionadas con tikv</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Consulte <a href="/docs/es/v2.4.x/configure_localstorage.md">Configuraciones relacionadas con localStorage</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>La configuración relacionada de MinIO/S3/GCS o cualquier otro servicio soporta la API S3, que es responsable de la persistencia de datos para Milvus.</p>
<p>Nos referimos al servicio de almacenamiento como MinIO/S3 en la siguiente descripción por simplicidad.</p>
<p>Vea <a href="/docs/es/v2.4.x/configure_minio.md">Configuraciones relacionadas con minio</a> para una descripción detallada de cada parámetro en esta sección.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus soporta cuatro MQ: rocksmq(basado en RockDB), natsmq(servidor nats embebido), Pulsar y Kafka.</p>
<p>Puede cambiar su MQ configurando el campo mq.type.</p>
<p>Si no estableces el campo mq.type como predeterminado, hay una nota sobre cómo habilitar la prioridad si configuramos múltiples mq en este archivo.</p>
<ol>
<li><p>modo autónomo (local): rocksmq(por defecto) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>modo cluster:  Pulsar(por defecto) &gt; Kafka (rocksmq y natsmq no están soportados en modo cluster)</p></li>
</ol>
<p>Consulte <a href="/docs/es/v2.4.x/configure_mq.md">Configuraciones relacionadas con mq</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Configuración relacionada de pulsar, utilizada para gestionar los registros de Milvus de operaciones de mutación recientes, salida de registro de flujo y proporcionar servicios de publicación-suscripción de registros.</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_pulsar.md">Configuraciones relacionadas con pulsar</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>Si desea habilitar kafka, necesita comentar las configuraciones de pulsar</p>
<p>kafka:</p>
<p>brokerList:</p>
<p>saslUsername:</p>
<p>saslContraseña:</p>
<p>saslMecanismos:</p>
<p>securityProtocol:</p>
<p>ssl</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_rocksmq.md">Configuraciones relacionadas con rocksmq</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>configuración natsmq.</p>
<p>más detalles: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_natsmq.md">las configuraciones relacionadas con natsmq</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Configuración relacionada de rootCoord, usada para manejar peticiones de lenguaje de definición de datos (DDL) y lenguaje de control de datos (DCL).</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_rootcoord.md">Configuraciones relacionadas con rootCoord</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Configuración relacionada de proxy, utilizada para validar las peticiones de los clientes y reducir los resultados devueltos.</p>
<p>Véase la descripción detallada de cada parámetro de esta sección en <a href="/docs/es/v2.4.x/configure_proxy.md">Configuraciones relacionadas con proxy</a>.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Configuración relacionada de queryCoord, utilizada para gestionar la topología y el equilibrio de carga para los nodos de consulta, y el traspaso de segmentos en crecimiento a segmentos sellados.</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_querycoord.md">Configuraciones relacionadas con queryCoord</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Configuración relacionada de queryNode, utilizada para ejecutar búsquedas híbridas entre datos vectoriales y escalares.</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_querynode.md">Configuraciones relacionadas con queryNode</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>Consulte <a href="/docs/es/v2.4.x/configure_indexcoord.md">Configuraciones relacionadas con indexCoord</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>Para una descripción detallada de cada parámetro de esta sección, véase <a href="/docs/es/v2.4.x/configure_indexnode.md">Configuraciones relacionadas con indexNode</a>.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Para una descripción detallada de cada parámetro de esta sección, véase <a href="/docs/es/v2.4.x/configure_datacoord.md">Configuraciones relacionadas con dataCoord</a>.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>Para una descripción detallada de cada parámetro de esta sección, véase <a href="/docs/es/v2.4.x/configure_datanode.md">Configuraciones relacionadas con dataNode</a>.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>Este tema presenta las configuraciones de Milvus relacionadas con el canal de mensajes.</p>
<p>Vea <a href="/docs/es/v2.4.x/configure_msgchannel.md">Configuraciones relacionadas con msgChannel</a> para una descripción detallada de cada parámetro bajo esta sección.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Configura la salida de registro del sistema.</p>
<p>Vea <a href="/docs/es/v2.4.x/configure_log.md">Configuraciones relacionadas con log</a> para una descripción detallada de cada parámetro bajo esta sección.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>Ver <a href="/docs/es/v2.4.x/configure_grpc.md">Configuraciones relacionadas con grpc</a> para una descripción detallada de cada parámetro en esta sección.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Configura el proxy tls enable.</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_tls.md">Configuraciones relacionadas con tls</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Vea <a href="/docs/es/v2.4.x/configure_common.md">Configuraciones relacionadas con common</a> para una descripción detallada de cada parámetro en esta sección.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, configura las cuotas y límites de Milvus.</p>
<p>Por defecto, habilitamos:</p>
<ol>
<li><p>Protección TT;</p></li>
<li><p>Protección de memoria.</p></li>
<li><p>Protección de cuota de disco.</p></li>
</ol>
<p>Puede habilitar:</p>
<ol>
<li><p>Limitación del rendimiento de DML;</p></li>
<li><p>DDL, DQL qps/rps limitación;</p></li>
<li><p>Protección de longitud/latencia de colas DQL;</p></li>
<li><p>Protección de la tasa de resultados DQL;</p></li>
</ol>
<p>Si es necesario, también puede forzar manualmente la denegación de solicitudes RW.</p>
<p>Consulte <a href="/docs/es/v2.4.x/configure_quotaandlimits.md">Configuraciones relacionadas con quotaAndLimits</a> para obtener una descripción detallada de cada parámetro de esta sección.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>Ver <a href="/docs/es/v2.4.x/configure_trace.md">Configuraciones relacionadas con trace</a> para una descripción detallada de cada parámetro en esta sección.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#Cuando se utiliza la indexación GPU, Milvus utilizará un pool de memoria para evitar la frecuente asignación y desasignación de memoria.</p>
<p>#aquí, puede establecer el tamaño de la memoria ocupada por el pool de memoria, siendo la unidad MB.</p>
<p>#tenga en cuenta que existe la posibilidad de que Milvus se bloquee cuando la demanda real de memoria supere el valor establecido por maxMemSize.</p>
<p>#si initMemSize y MaxMemSize se ponen ambos a cero,</p>
<p>#milvus inicializará automáticamente la mitad de la memoria disponible en la GPU,</p>
<p>#maxMemSize lo hará con toda la memoria disponible de la GPU.</p>
<p>Ver <a href="/docs/es/v2.4.x/configure_gpu.md">Configuraciones relacionadas con la gpu</a> para una descripción detallada de cada parámetro en esta sección.</p>
