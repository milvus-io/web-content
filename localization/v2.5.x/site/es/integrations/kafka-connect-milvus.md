---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka se integra con Milvus y Zilliz Cloud para transmitir datos
  vectoriales. Aprenda a utilizar el conector Kafka-Milvus para crear
  canalizaciones en tiempo real para búsquedas semánticas, sistemas de
  recomendación y análisis basados en IA.
title: >-
  Conectar Apache Kafka® con Milvus/Zilliz Cloud para la ingesta de datos
  vectoriales en tiempo real
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Conectar Apache Kafka® con Milvus/Zilliz Cloud para la ingesta de datos vectoriales en tiempo real<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta guía de inicio rápido mostramos cómo configurar kafka de código abierto y Zilliz Cloud para la ingesta de datos vectoriales.</p>
<p>Este tutorial explica cómo utilizar Apache Kafka® para transmitir e ingerir datos vectoriales en la base de datos vectorial Milvus y Zilliz Cloud (Milvus totalmente gestionado), permitiendo aplicaciones avanzadas en tiempo real como la búsqueda semántica, sistemas de recomendación y análisis impulsados por IA.</p>
<p>Apache Kafka es una plataforma distribuida de flujo de eventos diseñada para canalizaciones de alto rendimiento y baja latencia. Se utiliza ampliamente para recopilar, almacenar y procesar flujos de datos en tiempo real de fuentes como bases de datos, dispositivos IoT, aplicaciones móviles y servicios en la nube. La capacidad de Kafka para manejar grandes volúmenes de datos lo convierte en una importante fuente de datos de bases de datos vectoriales como Milvus o Zilliz Cloud.</p>
<p>Por ejemplo, Kafka puede capturar flujos de datos en tiempo real -como interacciones de usuarios, lecturas de sensores, junto con sus incrustaciones de modelos de aprendizaje automático- y publicar estos flujos directamente en Milvus o Zilliz Cloud. Una vez en la base de datos vectorial, estos datos pueden indexarse, buscarse y analizarse de forma eficiente.</p>
<p>La integración de Kafka con Milvus y Zilliz Cloud ofrece una forma sencilla de crear potentes canalizaciones para flujos de trabajo de datos no estructurados. El conector funciona tanto para la implementación de Kafka de código abierto como para servicios alojados como <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> y <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>En este tutorial utilizamos Zilliz Cloud como demostración:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Paso 1: Descargar el plugin kafka-connect-milvus<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Completa los siguientes pasos para descargar el plugin kafka-connect-milvus.</p>
<ol>
<li>descargue el último archivo zip del plugin <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> desde <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">aquí</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Paso 2: Descargar Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
<li>Descargue la última versión de kafka desde <a href="https://kafka.apache.org/downloads">aquí</a>.</li>
<li>Descomprima el archivo descargado y vaya al directorio kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">$ tar -xzf kafka_2.13-3.6.1.tgz
$ <span class="hljs-built_in">cd</span> kafka_2.13-3.6.1
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">PASO 3: Inicie el entorno Kafka<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>NOTA: Su entorno local debe tener Java 8+ instalado.</p>
</div>
<p>Ejecute los siguientes comandos para iniciar todos los servicios en el orden correcto:</p>
<ol>
<li><p>Inicie el servicio ZooKeeper</p>
<pre><code translate="no" class="language-shell">$ bin/zookeeper-server-start.sh config/zookeeper.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie el servicio Kafka broker</p>
<p>Abre otra sesión de terminal y ejecútala:</p>
<pre><code translate="no" class="language-shell">$ bin/kafka-server-start.sh config/server.properties
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Una vez que todos los servicios se hayan iniciado correctamente, tendrás un entorno Kafka básico funcionando y listo para usar.</p>
<ul>
<li>consulte la guía oficial de inicio rápido de kafka para más detalles: https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Paso 4: Configurar Kafka y Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Asegúrese de tener Kafka y Zilliz Cloud instalados y configurados correctamente.</p>
<ol>
<li><p>Si aún no tiene un tema en Kafka, cree un tema (por ejemplo, <code translate="no">topic_0</code>) en Kafka.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">bin</span>/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:<span class="hljs-number">9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Si aún no tienes una colección en Zilliz Cloud, crea una colección con un campo vectorial (en este ejemplo el vector tiene <code translate="no">dimension=8</code>). Puedes utilizar el siguiente esquema de ejemplo en Zilliz Cloud:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Nota: Asegúrate de que el esquema de ambas partes coincide. En el esquema, hay exactamente un campo vectorial. Los nombres de cada campo en ambos lados son exactamente los mismos.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Paso 5: Cargar el plugin kafka-connect-milvus en la Instancia Kafka<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
<li><p>descomprima el archivo <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> que descargó en el Paso 1.</p></li>
<li><p>copie los directorios <code translate="no">zilliz-kafka-connect-milvus</code> al directorio <code translate="no">libs</code> de su instalación de Kafka.</p></li>
<li><p>modifique el archivo <code translate="no">connect-standalone.properties</code> en el directorio <code translate="no">config</code> de su instalación de Kafka.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=<span class="hljs-literal">false</span>
value.converter.schemas.enable=<span class="hljs-literal">false</span>
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
<button class="copy-code-btn"></button></code></pre></li>
<li><p>cree y configure un archivo <code translate="no">milvus-sink-connector.properties</code> en el directorio <code translate="no">config</code> de su instalación de Kafka.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.<span class="hljs-keyword">class</span>=com.milvus.io.kafka.MilvusSinkConnector
<span class="hljs-keyword">public</span>.endpoint=https:<span class="hljs-comment">//&lt;public.endpoint&gt;:port</span>
token=*****************************************
collection.name=topic_0
topics=topic_0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Paso 6: Iniciar el conector<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
<li><p>Inicie el conector con el archivo de configuración anterior</p>
<pre><code translate="no" class="language-shell">$ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Intenta producir un mensaje al topic de Kafka que acabas de crear en Kafka</p>
<pre><code translate="no" class="language-shell">bin/kafka-<span class="hljs-variable language_">console</span>-producer.<span class="hljs-property">sh</span> --topic topic_0 --bootstrap-server <span class="hljs-attr">localhost</span>:<span class="hljs-number">9092</span>                        
&gt;{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>, <span class="hljs-number">0.00082446384</span>, -<span class="hljs-number">0.00071647146</span>, <span class="hljs-number">0.048612226</span>], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Comprueba si la entidad ha sido insertada en la colección en Zilliz Cloud. Este es el aspecto en Zilliz Cloud si la inserción tiene éxito:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Soporte</h3><p>Si necesita ayuda o tiene alguna pregunta sobre el conector Milvus Kafka Connect, no dude en ponerse en contacto con el mantenedor del conector: <strong>Correo electrónico:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
