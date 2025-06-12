---
id: deploy-cdc-server.md
order: 2
summary: >-
  Esta guía proporciona un proceso paso a paso para desplegar un servidor
  Milvus-CDC.
title: Desplegar un servidor CDC
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">Desplegar un servidor CDC<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía proporciona un proceso paso a paso para desplegar un servidor Milvus-CDC.</p>
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
    </button></h2><p>Asegúrese de que se cumplen las siguientes condiciones antes de desplegar un servidor Milvus-CDC:</p>
<ul>
<li><p><strong>Instancias de Milvus</strong>: Tanto el Milvus de origen como al menos un Milvus de destino deben estar desplegados y operativos.</p>
<ul>
<li><p>Tanto la versión de Milvus de origen como la de destino deben ser 2.3.2 o superior, preferiblemente 2.4.x. Recomendamos utilizar la misma versión para Milvus de origen y de destino para garantizar la compatibilidad.</p></li>
<li><p>Establezca la configuración <code translate="no">common.ttMsgEnabled</code> del Milvus de destino en <code translate="no">false</code>.</p></li>
<li><p>Configure el Milvus de origen y de destino con distintas opciones de meta y almacenamiento de mensajes para evitar conflictos. Por ejemplo, evite utilizar las mismas configuraciones de etcd y rootPath, así como servicios Pulsar y <code translate="no">chanNamePrefix</code> idénticos en varias instancias Milvus.</p></li>
</ul></li>
<li><p><strong>Metastore</strong>: Tenga preparada una base de datos etcd o MySQL para el metastore de Milvus-CDC.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Pasos<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Obtenga el archivo de configuración de Milvus-CDC</h3><p>Clone el <a href="https://github.com/zilliztech/milvus-cdc">repositorio de Milvus-CDC</a> y navegue hasta el directorio <code translate="no">milvus-cdc/server/configs</code> para acceder al archivo de configuración <code translate="no">cdc.yaml</code>.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Edite el archivo de configuración</h3><p>En el directorio <code translate="no">milvus-cdc/server/configs</code>, modifique el archivo <code translate="no">cdc.yaml</code> para personalizar las configuraciones relacionadas con el metastore de Milvus-CDC y los detalles de conexión del Milvus fuente.</p>
<ul>
<li><p><strong>Configuración del metastore</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Tipo de metastore para Milvus-CDC. Los valores posibles son <code translate="no">etcd</code> o <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Dirección para conectarse al etcd de Milvus-CDC. Obligatorio si <code translate="no">storeType</code> está configurado como <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Dirección de conexión de la base de datos MySQL para el servidor Milvus-CDC. Obligatorio si <code translate="no">storeType</code> está configurado como <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Ruta raíz del metastore de Milvus-CDC. Esta configuración permite el multi-tenancy, permitiendo que múltiples servicios CDC utilicen la misma instancia etcd o MySQL mientras se consigue el aislamiento a través de diferentes rutas raíz.</p></li>
</ul>
<p>Ejemplo de configuración:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
<span class="hljs-attr">metaStoreConfig:</span>
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  <span class="hljs-attr">storeType:</span> <span class="hljs-string">etcd</span>
  <span class="hljs-comment"># etcd address</span>
  <span class="hljs-attr">etcdEndpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">cdc</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configuración Milvus de origen:</strong></p>
<p>Especifique los detalles de conexión del Milvus de origen, incluyendo etcd y almacenamiento de mensajes, para establecer una conexión entre el servidor Milvus-CDC y el Milvus de origen.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Dirección para conectarse al etcd del Milvus de origen. Para más información, consulte <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">Configuraciones relacionadas con etcd</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Prefijo raíz de la clave donde el Milvus de origen almacena los datos en etcd. El valor puede variar en función del método de despliegue de la instancia Milvus:</p>
<ul>
<li><p><strong>Helm</strong> o <strong>Docker Compose</strong>: Por defecto <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Operator</strong>: Por defecto <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>Nombre del canal de replicación de milvus, que es <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> en el archivo milvus.yaml.</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Configuraciones Pulsar para el Milvus fuente. Si el Milvus de origen utiliza Kafka para el almacenamiento de mensajes, elimine todas las configuraciones relacionadas con Pulsar. Para más información, consulte <a href="https://milvus.io/docs/configure_pulsar.md">Configuraciones relacionadas con Pulsar</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Dirección Kafka para el Milvus de origen. Descomente esta configuración si el Milvus de origen utiliza Kafka para el almacenamiento de mensajes.</p></li>
</ul></li>
</ul>
<p>Ejemplo de configuración:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
<span class="hljs-attr">sourceConfig:</span>
  <span class="hljs-comment"># etcd config</span>
  <span class="hljs-attr">etcdAddress:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">etcdRootPath:</span> <span class="hljs-string">by-dev</span>
  <span class="hljs-attr">etcdMetaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-comment"># default partition name</span>
  <span class="hljs-attr">defaultPartitionName:</span> <span class="hljs-string">_default</span>
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  <span class="hljs-attr">readChanLen:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">replicateChan:</span> <span class="hljs-string">by-dev-replicate-msg</span>
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  <span class="hljs-attr">pulsar:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">pulsar://localhost:6650</span>
    <span class="hljs-attr">webAddress:</span> <span class="hljs-string">localhost:80</span>
    <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span>
    <span class="hljs-attr">tenant:</span> <span class="hljs-string">public</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Compilar el servidor Milvus-CDC</h3><p>Después de guardar el archivo <code translate="no">cdc.yaml</code>, navegue hasta el directorio <code translate="no">milvus-cdc</code> y ejecute uno de los siguientes comandos para compilar el servidor:</p>
<ul>
<li><p>Para un archivo binario:</p>
<pre><code translate="no" class="language-bash">make build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Para una imagen Docker:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Para una imagen Docker, monte el archivo compilado en <code translate="no">/app/server/configs/cdc.yaml</code> dentro del contenedor.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Iniciar el servidor</h3><ul>
<li><p>Con el archivo binario</p>
<p>Navegue hasta el directorio que contiene el binario <code translate="no">milvus-cdc</code> y el directorio <code translate="no">configs</code> con el archivo <code translate="no">cdc.yaml</code>, e inicie el servidor:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Usando Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
