---
id: performance_faq.md
summary: >-
  Encuentre respuestas a las preguntas más frecuentes sobre el rendimiento de
  las búsquedas, las mejoras de rendimiento y otras cuestiones relacionadas con
  el rendimiento.
title: Preguntas más frecuentes
---
<h1 id="Performance-FAQ" class="common-anchor-header">Preguntas más frecuentes<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">¿Cómo configurar <code translate="no">nlist</code> y <code translate="no">nprobe</code> para los índices FIV?</h4><p>La configuración de <code translate="no">nlist</code> depende del escenario. Como regla general, el valor recomendado de <code translate="no">nlist</code> es <code translate="no">4 × sqrt(n)</code>, donde <code translate="no">n</code> es el número total de entidades en un segmento.</p>
<p>El tamaño de cada segmento viene determinado por el parámetro <code translate="no">datacoord.segment.maxSize</code>, cuyo valor predeterminado es 512 MB. El número total de entidades en un segmento n puede estimarse dividiendo <code translate="no">datacoord.segment.maxSize</code> por el tamaño de cada entidad.</p>
<p>El ajuste de <code translate="no">nprobe</code> es específico del conjunto de datos y del escenario, e implica un compromiso entre la precisión y el rendimiento de la consulta. Recomendamos encontrar el valor ideal mediante la experimentación repetida.</p>
<p>Los siguientes gráficos son los resultados de una prueba realizada con el conjunto de datos sift50m y el índice IVF_SQ8, que compara la recuperación y el rendimiento de consulta de diferentes pares <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>Prueba de</span> </span> <span class="img-wrapper"> <span>precisión</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>Prueba de rendimiento</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">¿Por qué a veces las consultas tardan más en conjuntos de datos más pequeños?</h4><p>Las operaciones de consulta se realizan en segmentos. Los índices reducen el tiempo necesario para consultar un segmento. Si un segmento no ha sido indexado, Milvus recurre a la búsqueda de fuerza bruta en los datos brutos, lo que aumenta drásticamente el tiempo de consulta.</p>
<p>Por lo tanto, normalmente se tarda más en consultar un conjunto de datos pequeño (colección) porque no se ha creado un índice. Esto se debe a que los tamaños de sus segmentos no han alcanzado el umbral de creación de índices establecido por <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Llame a <code translate="no">create_index()</code> para forzar a Milvus a indexar los segmentos que han alcanzado el umbral pero que aún no han sido indexados automáticamente, mejorando significativamente el rendimiento de la consulta.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">¿Qué factores afectan al uso de la CPU?</h4><p>El uso de la CPU aumenta cuando Milvus construye índices o ejecuta consultas. En general, la creación de índices requiere un uso intensivo de la CPU, excepto cuando se utiliza Annoy, que se ejecuta en un único subproceso.</p>
<p>Cuando se ejecutan consultas, el uso de la CPU se ve afectado por <code translate="no">nq</code> y <code translate="no">nprobe</code>. Cuando <code translate="no">nq</code> y <code translate="no">nprobe</code> son pequeños, la concurrencia es baja y el uso de la CPU se mantiene bajo.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">¿Insertar datos y realizar búsquedas simultáneamente afecta al rendimiento de las consultas?</h4><p>Las operaciones de inserción no requieren un uso intensivo de la CPU. Sin embargo, como los nuevos segmentos pueden no haber alcanzado el umbral para la creación de índices, Milvus recurre a la búsqueda de fuerza bruta, lo que afecta significativamente al rendimiento de la consulta.</p>
<p>El parámetro <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> determina el umbral de creación de índices para un segmento, y está fijado en 1024 filas por defecto. Consulte <a href="/docs/es/v2.4.x/system_configuration.md">Configuración del sistema</a> para obtener más información.</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">¿Se libera el espacio de almacenamiento inmediatamente después de la eliminación de datos en Milvus?</h4><p>No, el espacio de almacenamiento no se libera inmediatamente cuando se borran datos en Milvus. Aunque la eliminación de datos marca las entidades como "eliminadas lógicamente", el espacio real puede no liberarse instantáneamente. He aquí por qué:</p>
<ul>
<li><strong>Compactación</strong>: Milvus compacta automáticamente los datos en segundo plano. Este proceso fusiona segmentos de datos más pequeños en otros más grandes y elimina los datos eliminados lógicamente (entidades marcadas para su eliminación) o los datos que han superado su tiempo de vida (TTL). Sin embargo, la compactación crea nuevos segmentos mientras marca los antiguos como "Eliminados".</li>
<li><strong>Recogida de Basura</strong>: Un proceso independiente llamado Recogida de Basura (GC) elimina periódicamente estos segmentos "Arrojados", liberando el espacio de almacenamiento que ocupaban. Esto garantiza un uso eficiente del almacenamiento, pero puede introducir un ligero retraso entre la eliminación y la recuperación de espacio.</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">¿Puedo ver los datos insertados, borrados o subinsertados inmediatamente después de la operación sin esperar a que se produzca una descarga?</h4><p>Sí, en Milvus, la visibilidad de los datos no está directamente ligada a las operaciones de vaciado debido a su arquitectura de desagregación almacenamiento-ordenador. Puede gestionar la legibilidad de los datos utilizando niveles de consistencia.</p>
<p>Al seleccionar un nivel de consistencia, tenga en cuenta las compensaciones entre consistencia y rendimiento. Para operaciones que requieran visibilidad inmediata, utilice un nivel de consistencia "Fuerte". Para escrituras más rápidas, priorice una consistencia más débil (los datos pueden no ser visibles inmediatamente). Para obtener más información, consulte <a href="/docs/es/v2.4.x/consistency.md">Consistencia</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">¿Puede la indexación de un campo VARCHAR mejorar la velocidad de borrado?</h4><p>La indexación de un campo VARCHAR puede acelerar las operaciones de "Borrado por expresión", pero sólo en determinadas condiciones:</p>
<ul>
<li><strong>Índice INVERTIDO</strong>: Este índice ayuda para expresiones <code translate="no">IN</code> o <code translate="no">==</code> en campos VARCHAR de clave no primaria.</li>
<li><strong>Índice Trie</strong>: Este índice ayuda para consultas de prefijo (por ejemplo, <code translate="no">LIKE prefix%</code>) en campos VARCHAR no primarios.</li>
</ul>
<p>Sin embargo, indexar un campo VARCHAR no acelera:</p>
<ul>
<li><strong>Borrado por IDs</strong>: Cuando el campo VARCHAR es la clave primaria.</li>
<li><strong>Expresiones no relacionadas</strong>: Cuando el campo VARCHAR no forma parte de la expresión de borrado.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">¿Todavía tiene preguntas?</h4><p>Usted puede:</p>
<ul>
<li>Eche un vistazo a <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> en GitHub. Siéntase libre de hacer preguntas, compartir ideas y ayudar a otros.</li>
<li>Únase a nuestro <a href="https://discord.com/invite/8uyFbECzPX">servidor Discord</a> para encontrar apoyo y participar con nuestra comunidad de código abierto.</li>
</ul>
