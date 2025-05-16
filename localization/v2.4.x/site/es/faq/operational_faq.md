---
id: operational_faq.md
summary: >-
  Encuentre respuestas a las preguntas más frecuentes sobre las operaciones en
  Milvus.
title: FAQ Operativas
---
<h1 id="Operational-FAQ" class="common-anchor-header">FAQ Operativas<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">¿Qué pasa si no puedo extraer la imagen Docker de Milvus de Docker Hub?</h4><p>Si no puede extraer la imagen Docker de Milvus del Docker Hub, intente añadir otras réplicas del registro.</p>
<p>Los usuarios de China continental pueden añadir la URL "https://registry.docker-cn.com" a la matriz registry-mirrors en <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">¿Es Docker la única forma de instalar y ejecutar Milvus?</h4><p>Docker es una forma eficiente de desplegar Milvus, pero no la única. También puede desplegar Milvus desde el código fuente. Esto requiere Ubuntu (18.04 o superior) o CentOS (7 o superior). Vea <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Construir Milvus desde el código</a> fuente para más información.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">¿Cuáles son los principales factores que afectan a la recuperación?</h4><p>La recuperación se ve afectada principalmente por el tipo de índice y los parámetros de búsqueda.</p>
<p>Para índices FLAT, Milvus realiza una búsqueda exhaustiva dentro de una colección, con un retorno del 100%.</p>
<p>En los índices IVF, el parámetro nprobe determina el alcance de la búsqueda dentro de la colección. Aumentar nprobe aumenta la proporción de vectores buscados y la recuperación, pero disminuye el rendimiento de la consulta.</p>
<p>En los índices HNSW, el parámetro ef determina la amplitud de la búsqueda en el grafo. Aumentar ef incrementa el número de puntos buscados en el gráfico y la recuperación, pero disminuye el rendimiento de la consulta.</p>
<p>Para más información, véase <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Indexación vectorial</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">¿Por qué no surten efecto mis cambios en los archivos de configuración?</h4><p>Milvus no soporta la modificación de los archivos de configuración durante el tiempo de ejecución. Debe reiniciar Milvus Docker para que los cambios en los archivos de configuración surtan efecto.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">¿Cómo sé si Milvus se ha iniciado correctamente?</h4><p>Si Milvus se inicia utilizando Docker Compose, ejecute <code translate="no">docker ps</code> para observar cuántos contenedores Docker se están ejecutando y comprobar si los servicios de Milvus se han iniciado correctamente.</p>
<p>Para Milvus standalone, debería poder observar al menos tres contenedores Docker en ejecución, siendo uno el servicio Milvus y los otros dos la gestión etcd y el servicio de almacenamiento. Para obtener más información, consulte <a href="/docs/es/v2.4.x/install_standalone-docker.md">Instalación de Milvus Standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">¿Por qué la hora en los archivos de registro es diferente de la hora del sistema?</h4><p>La diferencia horaria suele deberse a que la máquina anfitriona no utiliza el Tiempo Universal Coordinado (UTC).</p>
<p>Los archivos de registro dentro de la imagen Docker utilizan UTC por defecto. Si su máquina anfitriona no utiliza UTC, puede ocurrir este problema.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">¿Cómo sé si mi CPU soporta Milvus?</h4><p>Las operaciones de computación de Milvus dependen de la compatibilidad de la CPU con el conjunto de instrucciones de extensión SIMD (Single Instruction, Multiple Data). Que su CPU soporte el conjunto de instrucciones de extensión SIMD es crucial para la construcción de índices y la búsqueda de similitud vectorial en Milvus. Asegúrese de que su CPU soporta al menos uno de los siguientes conjuntos de instrucciones SIMD:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Ejecute el comando lscpu para comprobar si su CPU soporta los conjuntos de instrucciones SIMD mencionados anteriormente:</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">¿Por qué Milvus devuelve <code translate="no">illegal instruction</code> durante el arranque?</h4><p>Milvus requiere que su CPU soporte un conjunto de instrucciones SIMD: SSE4.2, AVX, AVX2, o AVX512. La CPU debe soportar al menos uno de estos conjuntos para asegurar que Milvus funciona con normalidad. Un error <code translate="no">illegal instruction</code> devuelto durante el arranque sugiere que su CPU no soporta ninguno de los cuatro conjuntos de instrucciones anteriores.</p>
<p>Consulte la <a href="/docs/es/v2.4.x/prerequisite-docker.md">compatibilidad de</a> la <a href="/docs/es/v2.4.x/prerequisite-docker.md">CPU con el conjunto de instrucciones SIMD</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">¿Puedo instalar Milvus en Windows?</h4><p>Sí. Puede instalar Milvus en Windows compilando desde el código fuente o desde un paquete binario.</p>
<p>Consulte <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Ejecutar Milvus en Windows</a> para saber cómo instalar Milvus en Windows.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Obtuve un error al instalar pymilvus en Windows. ¿Qué debo hacer?</h4><p>No se recomienda instalar PyMilvus en Windows. Pero si tiene que instalar PyMilvus en Windows pero obtiene un error, intente instalarlo en un entorno <a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a>. Vea <a href="/docs/es/v2.4.x/install-pymilvus.md">Instalar Milvus SDK</a> para más información sobre cómo instalar PyMilvus en el entorno Conda.</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">¿Puedo desplegar Milvus cuando estoy desconectado de Internet?</h4><p>Sí. Puede instalar Milvus en un entorno sin conexión. Vea <a href="/docs/es/v2.4.x/install_offline-helm.md">Instalar Milvus sin conexión</a> para más información.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">¿Dónde puedo encontrar los registros generados por Milvus?</h4><p>El registro de Milvus se imprime en stout (salida estándar) y stderr (error estándar) por defecto, sin embargo recomendamos encarecidamente redirigir su registro a un volumen persistente en producción. Para ello, actualice <code translate="no">log.file.rootPath</code> en <strong>milvus.yaml</strong>. Y si despliega Milvus con <code translate="no">milvus-helm</code> chart, también necesita habilitar primero la persistencia del registro a través de <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>Si no ha cambiado la configuración, el uso de kubectl logs &lt;pod-name&gt; o docker logs CONTAINER también puede ayudarle a encontrar el registro.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">¿Puedo crear un índice para un segmento antes de insertar datos en él?</h4><p>Sí, se puede. Pero recomendamos insertar los datos en lotes, cada uno de los cuales no debe superar los 256 MB, antes de indexar cada segmento.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">¿Puedo compartir una instancia etcd entre varias instancias Milvus?</h4><p>Sí, puede compartir una instancia etcd entre varias instancias Milvus. Para ello, debe cambiar <code translate="no">etcd.rootPath</code> a un valor distinto para cada instancia Milvus en los archivos de configuración de cada una antes de iniciarlas.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">¿Puedo compartir una instancia Pulsar entre varias instancias Milvus?</h4><p>Sí, puede compartir una instancia Pulsar entre varias instancias Milvus. Para ello, puede</p>
<ul>
<li>Si el multi-tenancy está habilitado en su instancia Pulsar, considere asignar un tenant o espacio de nombres separado para cada instancia Milvus. Para ello, debe cambiar <code translate="no">pulsar.tenant</code> o <code translate="no">pulsar.namespace</code> en los archivos de configuración de sus instancias Milvus a un valor único para cada una antes de iniciarlas.</li>
<li>Si no planea habilitar multi-tenancy en su instancia Pulsar, considere cambiar <code translate="no">msgChannel.chanNamePrefix.cluster</code> en los archivos de configuración de sus instancias Milvus a un valor único para cada una antes de iniciarlas.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">¿Puedo compartir una instancia MinIO entre varias instancias Milvus?</h4><p>Sí, puede compartir una instancia MinIO entre varias instancias Milvus. Para ello, debe cambiar <code translate="no">minio.rootPath</code> a un valor único para cada instancia de Milvus en los archivos de configuración de cada una antes de iniciarlas.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">¿Cómo manejo el mensaje de error <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>?</h4><p>El mensaje de error <code translate="no">Illegal uri [example.db]</code> indica que está intentando conectarse a Milvus Lite utilizando una versión anterior de PyMilvus que no soporta este tipo de conexión. Para resolver este problema, actualice su instalación de PyMilvus al menos a la versión 2.4.2, que incluye soporte para conectarse a Milvus Lite.</p>
<p>Puede actualizar PyMilvus utilizando el siguiente comando:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">¿Por qué obtengo menos resultados que los de <code translate="no">limit</code> que he establecido en mi búsqueda/consulta?</h4><p>Hay varias razones por las que puede recibir menos resultados que el <code translate="no">limit</code> que especificó:</p>
<ul>
<li><p><strong>Datos limitados</strong>: Es posible que la colección no tenga suficientes entidades para alcanzar el límite solicitado. Si el número total de entidades de la colección es inferior al límite, naturalmente recibirá menos resultados.</p></li>
<li><p><strong>Claves primarias duplicadas</strong>: Milvus da prioridad a entidades específicas cuando encuentra claves primarias duplicadas durante una búsqueda. Este comportamiento varía en función del tipo de búsqueda:</p></li>
<li><p><strong>Consulta (Coincidencia exacta)</strong>: Milvus selecciona la última entidad con la PK coincidente. Búsqueda RNA: Milvus selecciona la entidad con la puntuación de similitud más alta, incluso si las entidades comparten el mismo PK. Esta priorización puede dar lugar a menos resultados únicos que el límite si su colección tiene muchas claves primarias duplicadas.</p></li>
<li><p><strong>Coincidencias insuficientes</strong>: Es posible que las expresiones de filtrado de la búsqueda sean demasiado estrictas, por lo que habrá menos entidades que cumplan el umbral de similitud. Si las condiciones establecidas para la búsqueda son demasiado restrictivas, no coincidirán suficientes entidades, lo que dará lugar a menos resultados de los esperados.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. ¿Cuál es la causa y cómo puede solucionarse?</h4><p>Este error se produce cuando intenta utilizar Milvus Lite en una plataforma Windows. Milvus Lite está diseñado principalmente para entornos Linux y puede no tener soporte nativo para Windows.</p>
<p>La solución es utilizar un entorno Linux:</p>
<ul>
<li>Utilice un sistema operativo basado en Linux o una máquina virtual para ejecutar Milvus Lite.</li>
<li>Este enfoque garantizará la compatibilidad con las dependencias y la funcionalidad de la biblioteca.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">¿Qué son los errores "la longitud excede la longitud máxima" en Milvus, y cómo pueden entenderse y solucionarse?</h4><p>Los errores "La longitud excede la longitud máxima" en Milvus se producen cuando el tamaño de un elemento de datos supera el tamaño máximo permitido para una colección o campo. He aquí algunos ejemplos y explicaciones:</p>
<ul>
<li><p>Error de campo JSON: <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>Error de longitud de cadena: <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>Error de campo VarChar: <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>Para entender y solucionar estos errores</p>
<ul>
<li>Comprenda que <code translate="no">len(str)</code> en Python representa el número de caracteres, no el tamaño en bytes.</li>
<li>Para tipos de datos basados en cadenas como VARCHAR y JSON, utilice <code translate="no">len(bytes(str, encoding='utf-8'))</code> para determinar el tamaño real en bytes, que es lo que Milvus utiliza para &quot;max-length&quot;.</li>
</ul>
<p>Ejemplo en Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">¿Todavía tiene preguntas?</h4><p>Puede hacerlo:</p>
<ul>
<li>Echa un vistazo a <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> en GitHub. Siéntase libre de hacer preguntas, compartir ideas y ayudar a otros.</li>
<li>Únete a nuestro <a href="https://discord.com/invite/8uyFbECzPX">servidor Discord</a> para encontrar apoyo y participar con nuestra comunidad de código abierto.</li>
</ul>
