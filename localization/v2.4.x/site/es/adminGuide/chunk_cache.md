---
id: chunk_cache.md
title: Configurar Chunk Cache
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">Configurar la caché de trozos<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>El mecanismo de caché de trozos permite a Milvus precargar datos en la caché del disco duro local de los nodos de consulta antes de que se necesiten. Este mecanismo mejora significativamente el rendimiento de la recuperación de vectores al reducir el tiempo que se tarda en cargar los datos del disco a la memoria.</p>
<h2 id="Background" class="common-anchor-header">Antecedentes<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de realizar consultas para recuperar vectores, Milvus necesita cargar los datos desde el almacenamiento de objetos a la memoria caché en el disco duro local de los nodos de consulta. Se trata de un proceso que requiere mucho tiempo. Antes de que se carguen todos los datos, Milvus puede responder a algunas solicitudes de recuperación de vectores con retraso.</p>
<p>Para mejorar el rendimiento de la consulta, Milvus proporciona un mecanismo de caché de trozos para cargar previamente los datos del almacenamiento de objetos en la caché del disco duro local antes de que se necesiten. Cuando se recibe una solicitud de consulta, Segcore comprueba primero si los datos están en la caché, en lugar de en el almacenamiento de objetos. Si los datos están en la caché, Segcore puede recuperarlos rápidamente de la caché y devolver el resultado al cliente.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">Configurar la caché de trozos<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta guía proporciona instrucciones sobre cómo configurar el mecanismo de caché de trozos para una instancia de Milvus. La configuración varía según la forma de instalar la instancia Milvus.</p>
<ul>
<li><p>Para instancias Milvus instaladas utilizando Helm Charts</p>
<p>Añada la configuración al archivo <code translate="no">values.yaml</code> en la sección <code translate="no">config</code>. Para más detalles, consulte <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con Helm Charts</a>.</p></li>
<li><p>Para instancias Milvus instaladas utilizando Docker Compose</p>
<p>Añada la configuración al archivo <code translate="no">milvus.yaml</code> que ha utilizado para iniciar la instancia de Milvus. Para más detalles, consulte <a href="/docs/es/v2.4.x/configure-docker.md">Configurar Milvus con Docker Compose</a>.</p></li>
<li><p>Para instancias Milvus instaladas utilizando Operator</p>
<p>Añada la configuración a la sección <code translate="no">spec.components</code> del recurso personalizado <code translate="no">Milvus</code>. Para más detalles, consulte <a href="/docs/es/v2.4.x/configure_operator.md">Configurar Milvus con Operator</a>.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">Opciones de configuración</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p>El parámetro <code translate="no">warmup</code> determina si Milvus carga previamente los datos del almacenamiento de objetos en la caché del disco duro local de los nodos de consulta antes de que se necesiten. Este parámetro es por defecto <code translate="no">disable</code>. Las opciones posibles son las siguientes:</p>
<ul>
<li><code translate="no">async</code>: Milvus precarga los datos de forma asíncrona en segundo plano, lo que no afecta al tiempo que se tarda en cargar una colección. Sin embargo, los usuarios pueden experimentar un retraso al recuperar vectores durante un breve periodo de tiempo después de que el proceso de carga se haya completado.  Esta es la opción por defecto.</li>
<li><code translate="no">sync</code>: Milvus precarga los datos de forma sincrónica, lo que puede afectar al tiempo que se tarda en cargar una colección. Sin embargo, los usuarios pueden realizar consultas inmediatamente después de que se complete el proceso de carga sin ningún retraso.</li>
<li><code translate="no">disable</code>: Milvus no precarga datos en la memoria caché.</li>
</ul>
<p>Tenga en cuenta que la configuración de la caché de trozos también se aplica cuando se insertan nuevos datos en las colecciones o se reconstruyen los índices de las colecciones.</p>
<h3 id="FAQ" class="common-anchor-header">FAQ</h3><ul>
<li><p><strong>¿Cómo puedo determinar si el mecanismo de caché por partes funciona correctamente?</strong></p>
<p>Le recomendamos que compruebe la latencia de una solicitud de búsqueda o consulta después de cargar una colección. Si la latencia es significativamente superior a la esperada (por ejemplo, varios segundos), puede indicar que el mecanismo de caché de trozos sigue funcionando.</p>
<p>Si la latencia de la consulta se mantiene alta durante mucho tiempo. Puedes comprobar el rendimiento del almacenamiento de objetos para asegurarte de que la caché de trozos sigue funcionando. En casos normales, la caché de trozos en funcionamiento generará un alto rendimiento en el almacenamiento de objetos. Alternativamente, puedes simplemente probar la caché de trozos en el modo <code translate="no">sync</code>.</p></li>
</ul>
