---
id: switch-pulsar-woodpecker.md
title: Cambiar entre Pulsar y Woodpecker
summary: >-
  Cambia la cola de mensajes de un clúster de Milvus entre Pulsar y Woodpecker,
  con Helm o Milvus Operator.
---
<h1 id="Switch-between-Pulsar-and-Woodpecker" class="common-anchor-header">Cambiar entre Pulsar y Woodpecker<button data-href="#Switch-between-Pulsar-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta página se describe cómo cambiar la cola de mensajes (MQ) de un <strong>clúster de Milvus</strong> entre <strong>Pulsar</strong> (integrado o externo) y <strong>Woodpecker</strong> (backend MinIO), en ambos sentidos. Para conocer el flujo de trabajo general y los requisitos previos, consulta <a href="/docs/es/switch-mq-type.md">Cambiar el tipo de MQ</a>.</p>
<div class="alert note">
<p><strong>Requisito previo:</strong> la función «Cambiar MQ» está disponible en <strong>Milvus 3.0 y versiones posteriores</strong>. Actualiza tu instancia de Milvus a Milvus 3.0 o posterior antes de empezar; la función no está disponible en versiones anteriores.</p>
</div>
<div class="alert warning">
<p>Cambiar la cola de mensajes es una <strong>operación de alto riesgo</strong>. Elige la sección que se ajuste <strong>a tu</strong> método de implementación <strong>—Con Helm</strong> o <strong>Con Milvus Operator</strong> — y síguela de principio a fin. No mezcles comandos de Helm y de Operator.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Con Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Helm" class="common-anchor-header">Cambiar de Pulsar a Woodpecker (Helm)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Paso 1: Comprueba que la instancia de Milvus esté en ejecución.</strong> Asegúrate de que tu clúster de Milvus funcione correctamente; por ejemplo, creando una colección de prueba, insertando datos y ejecutando una consulta.</p>
<p><strong>Paso 2: Ejecuta el cambio de MQ.</strong> Accede a la interfaz de gestión de MixCoord y, a continuación, llama a la API de cambio:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>En otra terminal:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Paso 3: Comprueba que el cambio se haya completado.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Si el cambio se ha realizado correctamente, se registrará el mensaje « <code translate="no">[mqTypeValue=woodpecker]</code> ».</p>
<p><strong>Paso 4: (Opcional) Detener Pulsar y limpiar.</strong> Para Pulsar <strong>integrado</strong>, desactiva Pulsar y activa Woodpecker; a continuación, elimina los PVC de Pulsar:</p>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>En el caso de Pulsar <strong>externo</strong>, limpia los temas de Milvus en la instancia externa de Pulsar. Los temas de Milvus siguen el formato <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> (por ejemplo, <code translate="no">by-dev-rootcoord-dml_10_464633776992639586v0</code>).</p>
<div class="alert note">
<p>Si tiene previsto volver a Pulsar más adelante, elimine primero los datos y los temas para evitar conflictos. Debido a las limitaciones de los gráficos de Helm, actualmente no es posible volver a una instancia <strong>integrada</strong> de Pulsar.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Helm" class="common-anchor-header">Cambiar de Woodpecker a Pulsar (Helm)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Paso 1: Comprueba que la instancia de Milvus esté en ejecución.</strong></p>
<p><strong>Paso 2: Configura la conexión a Pulsar de destino y reinicia Milvus.</strong> Para realizar el cambio, es necesario que Milvus ya conozca la conexión a Pulsar, así que introdúcela en <code translate="no">user.yaml</code> a través de <code translate="no">extraConfigFiles</code> y aplícala con <code translate="no">helm upgrade</code> (lo que reinicia los pods). Se requiere <code translate="no">streaming.enabled=true</code> para la función Switch MQ.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: &lt;pulsar addr&gt;
      port: &lt;pulsar port, e.g. 6650&gt;
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Espera a que todos los pods estén listos y, a continuación, confirma que la configuración de acceso a Pulsar se ha incorporado a la configuración de Milvus.</p>
<p><strong>Paso 3: Ejecuta el cambio a MQ.</strong></p>
<div class="alert note">
<p>Asegúrate de que el Pulsar de destino no contenga temas de Milvus de una configuración anterior. Si es tu primer cambio a Pulsar, omite esta nota; de lo contrario, elimina primero los temas residuales de Milvus con los mismos nombres.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>En otra terminal:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Paso 4: Comprueba que la migración se haya completado.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Si la migración se ha realizado correctamente, se registrará en el archivo de registro <code translate="no">[mqTypeValue=pulsar]</code>.</p>
<p><strong>Paso 5: (Opcional) Elimina los datos de Woodpecker.</strong> Elimina los datos de Woodpecker en MinIO/S3 (en la ruta <code translate="no">&lt;rootPath&gt;/wp/...</code>, normalmente <code translate="no">files/wp/...</code>) y los metadatos de Woodpecker en etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Si tienes previsto volver a Woodpecker más adelante, elimina primero estos archivos.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Con Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Cambiar de Pulsar a Woodpecker (Milvus Operator)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Paso 1: Comprueba que la instancia de Milvus esté en ejecución.</strong></p>
<p><strong>Paso 2: Ejecuta el cambio de MQ.</strong> El servicio MixCoord no está expuesto, así que ejecuta la API de cambio desde dentro del pod de MixCoord:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Paso 3: Comprueba que el cambio se haya completado.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Si el cambio se ha realizado correctamente, se registra en <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<p><strong>Paso 4: Actualiza el tipo de MQ en el Operator.</strong> Actualiza la configuración gestionada por el Operator para que este no revierta el cambio. Crea <code translate="no">change_configmap.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>Paso 5: (Opcional) Detener Pulsar y limpiar.</strong> Para Pulsar <strong>integrado</strong>, desinstala la versión de Pulsar y elimina sus PVC:</p>
<pre><code translate="no" class="language-shell">helm uninstall my-release-pulsar
kubectl get pvc | grep my-release-pulsar
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>Para Pulsar <strong>externo</strong>, limpia los temas de Milvus (formato <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<div class="alert note">
<p>Si tiene previsto volver a Pulsar más adelante, limpie primero los datos y los temas para evitar conflictos. Debido a las limitaciones de los gráficos de Helm, actualmente no es posible volver a una instancia <strong>integrada</strong> de Pulsar.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="common-anchor-header">Cambiar de Woodpecker a Pulsar (operador de Milvus)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Paso 1: Comprueba que la instancia de Milvus esté en ejecución.</strong></p>
<p><strong>Paso 2: Configura la conexión a Pulsar de destino y reinicia Milvus.</strong> Introduce la conexión a Pulsar en <code translate="no">spec.config</code> (el operador convierte <code translate="no">spec.config</code> en <code translate="no">user.yaml</code>) y establece el tipo de MQ; al aplicar el CR, los pods se actualizan con la nueva configuración.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">addr&gt;</span>
      <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">port,</span> <span class="hljs-string">e.g.</span> <span class="hljs-number">6650</span><span class="hljs-string">&gt;
  dependencies:
    msgStreamType: pulsar
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>Espera a que todos los pods estén listos y, a continuación, confirma que la configuración de acceso a Pulsar se ha incorporado a la configuración de Milvus.</p>
<p><strong>Paso 3: Ejecuta el cambio de MQ.</strong></p>
<div class="alert note">
<p>Asegúrate de que el Pulsar de destino no contenga temas de Milvus de una configuración anterior. Si es tu primer cambio a Pulsar, omite esta nota; de lo contrario, elimina primero los temas residuales de Milvus con los mismos nombres.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Paso 4: Verifica que el cambio se haya completado.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Si la migración se ha realizado correctamente, se registrará en el archivo de registro <code translate="no">[mqTypeValue=pulsar]</code>.</p>
<p><strong>Paso 5: (Opcional) Elimina los datos de Woodpecker.</strong> Elimina los datos de Woodpecker en MinIO/S3 (en la ruta <code translate="no">&lt;rootPath&gt;/wp/...</code>, normalmente <code translate="no">files/wp/...</code>) y los metadatos de Woodpecker en etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Si tienes previsto volver a Woodpecker más adelante, elimina primero estos archivos.</p>
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
<tr><th>MQ de origen</th><th>MQ de destino</th><th>Helm</th><th>Operador de Milvus</th></tr>
</thead>
<tbody>
<tr><td>Pulsar integrado</td><td>Woodpecker (MinIO)</td><td><strong>Compatible</strong></td><td><strong>Compatible</strong></td></tr>
<tr><td>Pulsar externo</td><td>Woodpecker (MinIO)</td><td><strong>Compatible</strong></td><td><strong>Compatible</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar externo</td><td><strong>Compatible</strong></td><td><strong>Compatible</strong></td></tr>
<tr><td>Pulsar</td><td>Woodpecker (local)</td><td><strong>Compatible, pero no recomendado</strong> (todos los pods necesitan un sistema de archivos compartido)</td><td><strong>No compatible</strong></td></tr>
</tbody>
</table>
