---
id: release_notes.md
summary: Notas de la versión de Milvus
title: Notas de la versión
---
<h1 id="Release-Notes" class="common-anchor-header">Notas de la versión<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Descubra las novedades de Milvus. Esta página resume las nuevas características, mejoras, problemas conocidos y correcciones de errores de cada versión. Puede encontrar las notas de la versión para cada versión publicada después de la v2.6.0 en esta sección. Le sugerimos que visite regularmente esta página para conocer las actualizaciones.</p>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 18 de junio de 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Versión de Milvus</th><th style="text-align:center">Versión del SDK de Python</th><th style="text-align:center">Versión del SDK de Node.js</th><th style="text-align:center">Versión del SDK de Java</th><th style="text-align:center">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 introduce una arquitectura simplificada y nativa de la nube diseñada para mejorar la eficiencia operativa, la utilización de recursos y el coste total de propiedad reduciendo la complejidad de la implantación. Esta versión añade nuevas funcionalidades centradas en el rendimiento, la búsqueda y el desarrollo. Entre las funciones clave se incluyen la cuantificación de alta precisión de 1 bit (RaBitQ) y una capa de caché dinámica para mejorar el rendimiento, la detección de casi duplicados con MinHash y la concordancia precisa de frases para la búsqueda avanzada, así como funciones de incrustación automatizadas con modificación de esquemas en línea para mejorar la experiencia del desarrollador.</p>
<div class="alert note">
<p>Esta es una versión preliminar de Milvus 2.6.0. Para probar las últimas funciones, instale esta versión como una nueva implementación. No se admite la actualización de Milvus v2.5.x o anterior a 2.6.0-rc1.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Cambios en la arquitectura</h3><p>Desde la versión 2.6, Milvus introduce cambios arquitectónicos significativos destinados a mejorar el rendimiento, la escalabilidad y la facilidad de uso. Para obtener más información, consulte <a href="/docs/es/v2.6.x/architecture_overview.md">Visión general de la arquitectura de Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nodo de flujo (GA)</h4><p>En versiones anteriores, el proxy escribía los datos de flujo en la WAL y el QueryNode y el DataNode los leían. Esta arquitectura dificultaba la obtención de consenso en el lado de la escritura y requería una lógica compleja en el lado de la lectura. Además, el delegado de consulta se encontraba en el QueryNode, lo que dificultaba la escalabilidad. Milvus 2.5.0 introdujo el Streaming Node, que pasa a ser GA en la versión 2.6.0. Este componente es ahora responsable de todas las operaciones de lectura/escritura de WAL a nivel de disco y también sirve como delegador de consultas, resolviendo los problemas mencionados y permitiendo nuevas optimizaciones.</p>
<p><strong>Aviso importante de actualización</strong>: Streaming Node es un cambio arquitectónico significativo, por lo que no se admite una actualización directa a Milvus 2.6.0-rc1 desde versiones anteriores.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL nativo de Woodpecker</h4><p>Milvus dependía anteriormente de sistemas externos como Kafka o Pulsar para su WAL. Aunque funcionales, estos sistemas añadían una complejidad operativa y una sobrecarga de recursos significativas, especialmente para implementaciones pequeñas y medianas. En Milvus 2.6, estos sistemas se sustituyen por Woodpecker, un sistema de WAL nativo de la nube creado específicamente. Woodpecker está diseñado para el almacenamiento de objetos y admite modos de disco cero basados tanto en almacenamiento local como en almacenamiento de objetos, lo que simplifica las operaciones al tiempo que mejora el rendimiento y la escalabilidad.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusión de DataNode e IndexNode</h4><p>En Milvus 2.6, tareas como la compactación, la importación masiva, la recopilación de estadísticas y la creación de índices se gestionan ahora mediante un programador unificado. La función de persistencia de datos que antes gestionaba el DataNode se ha trasladado al Streaming Node. Para simplificar el despliegue y el mantenimiento, el IndexNode y el DataNode se han fusionado en un único componente DataNode. Este nodo consolidado ejecuta ahora todas estas tareas críticas, reduciendo la complejidad operativa y optimizando la utilización de los recursos.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusión de coordinadores en MixCoord</h4><p>El diseño anterior con módulos RootCoord, QueryCoord y DataCoord separados introducía complejidad en la comunicación entre módulos. Para simplificar el diseño del sistema, estos componentes se han fusionado en un único coordinador unificado denominado MixCoord. Esta consolidación reduce la complejidad de la programación distribuida al sustituir la comunicación basada en la red por llamadas a funciones internas, lo que se traduce en un funcionamiento más eficiente del sistema y una simplificación del desarrollo y el mantenimiento.</p>
<h3 id="Key-Features" class="common-anchor-header">Características principales</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Cuantificación de 1 bit RaBitQ</h4><p>Para manejar conjuntos de datos a gran escala, la cuantización de 1 bit es una técnica eficaz para mejorar la utilización de los recursos y el rendimiento de la búsqueda. Sin embargo, los métodos tradicionales pueden afectar negativamente a la recuperación. En colaboración con los autores de la investigación original, Milvus 2.6 presenta RaBitQ, una solución de cuantización de 1 bit que mantiene una alta precisión de recuperación al tiempo que ofrece las ventajas de recursos y rendimiento de la compresión de 1 bit.</p>
<p>Para más información, consulte <a href="/docs/es/v2.6.x/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Mejora de la capacidad JSON</h4><p>Milvus 2.6 mejora su compatibilidad con el tipo de datos JSON con las siguientes mejoras:</p>
<ul>
<li><strong>Rendimiento</strong>: Ahora se admite oficialmente la indexación de rutas JSON, lo que permite la creación de índices invertidos en rutas específicas dentro de objetos JSON (por ejemplo, <code translate="no">meta.user.location</code>). Esto evita el escaneo completo de objetos y mejora la latencia de las consultas con filtros complejos.</li>
<li><strong>Funcionalidad</strong>: Para soportar una lógica de filtrado más compleja, esta versión añade soporte para las funciones <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, y <code translate="no">CAST</code>. De cara al futuro, nuestro trabajo sobre el soporte de JSON continúa. Nos complace anunciar que las próximas versiones oficiales incluirán funciones aún más potentes, como <strong>la trituración de JSON</strong> y un <strong>índice JSON FLAT</strong>, diseñado para mejorar drásticamente el rendimiento en datos JSON muy anidados.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Mejora de las funciones de analizador y tokenizador</h4><p>Esta versión mejora significativamente las capacidades de procesamiento de texto con varias actualizaciones de Analyzer y Tokenizer:</p>
<ul>
<li>Está disponible una nueva sintaxis de <a href="/docs/es/v2.6.x/analyzer-overview.md#Example-use">Run Analyzer</a> para validar las configuraciones del tokenizador.</li>
<li>Se ha integrado el <a href="/docs/es/v2.6.x/lindera-tokenizer.md">tokenizador Lindera</a> para mejorar la compatibilidad con idiomas asiáticos como el japonés y el coreano.</li>
<li>Ahora es posible seleccionar el tokenizador a nivel de fila, con el <a href="/docs/es/v2.6.x/icu-tokenizer.md">tokenizador ICU</a> de uso general disponible como alternativa para situaciones multilingües.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Entrada y salida de datos con funciones de incrustación</h4><p>Milvus 2.6 introduce la capacidad "Data-in, Data-Out" que simplifica el desarrollo de aplicaciones de IA al integrarse directamente con modelos de incrustación de terceros (por ejemplo, de OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Ahora los usuarios pueden insertar y consultar datos de texto sin procesar, y Milvus llamará automáticamente al servicio de modelo especificado para convertir el texto en vectores en tiempo real. Esto elimina la necesidad de un proceso de conversión vectorial independiente.</p>
<p>Para más información, consulte <a href="/docs/es/v2.6.x/embedding-function-overview.md">Visión general de la función de incrustación</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Coincidencia de frases</h4><p>La concordancia de frases es una función de búsqueda de texto que sólo devuelve resultados cuando la secuencia exacta de palabras de una consulta aparece de forma consecutiva y en el orden correcto dentro de un documento.</p>
<p><strong>Características principales</strong>:</p>
<ul>
<li>Sensible al orden: Las palabras deben aparecer en el mismo orden que en la consulta.</li>
<li>Coincidencia consecutiva: Las palabras deben aparecer una junto a otra, a menos que se utilice un valor de inclinación.</li>
<li>Inclinación (opcional): Un parámetro ajustable que permite un pequeño número de palabras intermedias, lo que permite la concordancia difusa de frases.</li>
</ul>
<p>Para más información, consulte <a href="/docs/es/v2.6.x/phrase-match.md">Coincidencia de frases</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Índice MinHash LSH (Beta)</h4><p>Para abordar la necesidad de deduplicación de datos en el entrenamiento de modelos, Milvus 2.6 añade soporte para índices MINHASH_LSH. Esta característica proporciona un método computacionalmente eficiente y escalable para estimar la similitud de Jaccard entre documentos para identificar casi duplicados. Los usuarios pueden generar firmas MinHash para sus documentos de texto durante el preprocesamiento y utilizar el índice MINHASH_LSH en Milvus para encontrar eficientemente contenido similar en conjuntos de datos a gran escala, mejorando la limpieza de datos y la calidad del modelo.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Funciones de decaimiento en función del tiempo</h4><p>Milvus 2.6 introduce funciones de decaimiento en función del tiempo para abordar situaciones en las que el valor de la información cambia con el tiempo. Durante la reclasificación de resultados, los usuarios pueden aplicar funciones de decaimiento exponencial, gaussiano o lineal basadas en un campo de fecha y hora para ajustar la puntuación de relevancia de un documento. Esto asegura que el contenido más reciente pueda ser priorizado, lo cual es crítico para aplicaciones como fuentes de noticias, comercio electrónico y la memoria de un agente de IA.</p>
<p>Para obtener más información, consulte <a href="/docs/es/v2.6.x/decay-ranker-overview.md">Descripción general de Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Añadir campo para la evolución del esquema en línea</h4><p>Para proporcionar una mayor flexibilidad de esquema, Milvus 2.6 ahora permite añadir un nuevo campo escalar o vectorial al esquema de una colección existente en línea. Esto evita la necesidad de crear una nueva colección y realizar una migración de datos disruptiva cuando cambian los requisitos de la aplicación.</p>
<p>Para obtener más información, consulte <a href="/docs/es/v2.6.x/add-fields-to-an-existing-collection.md">Añadir campos a una colección existente</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Soporte de vectores INT8</h4><p>En respuesta al creciente uso de modelos cuantificados que producen incrustaciones de enteros de 8 bits, Milvus 2.6 añade soporte nativo de tipos de datos para vectores INT8. Esto permite a los usuarios ingerir estos vectores directamente sin descuantificación, ahorrando costes de cálculo, ancho de banda de red y almacenamiento. Esta función es compatible inicialmente con los índices de la familia HNSW.</p>
<p>Para más información, consulte <a href="/docs/es/v2.6.x/dense-vector.md">Vector denso</a>.</p>
