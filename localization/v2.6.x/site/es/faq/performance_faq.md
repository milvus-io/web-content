---
id: performance_faq.md
summary: >-
  Encuentra respuestas a las preguntas más frecuentes sobre el rendimiento de
  las búsquedas, las mejoras de rendimiento y otras cuestiones relacionadas con
  el rendimiento.
title: Preguntas frecuentes sobre el rendimiento
---
<h1 id="Performance-FAQ" class="common-anchor-header">Preguntas frecuentes sobre el rendimiento<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">¿Cómo se configuran los parámetros « <code translate="no">nlist</code> » y « <code translate="no">nprobe</code> » para los índices IVF?</h4><p>La configuración de <code translate="no">nlist</code> depende de cada caso concreto. Como regla general, el valor recomendado para <code translate="no">nlist</code> es <code translate="no">4 × sqrt(n)</code>, donde <code translate="no">n</code> es el número total de entidades de un segmento.</p>
<p>El tamaño de cada segmento viene determinado por el parámetro « <code translate="no">datacoord.segment.maxSize</code> », que por defecto está fijado en 1024 MB. El número total de entidades en un segmento n puede estimarse dividiendo « <code translate="no">datacoord.segment.maxSize</code> » por el tamaño de cada entidad.</p>
<p>La configuración de <code translate="no">nprobe</code> depende del conjunto de datos y del escenario, e implica un equilibrio entre la precisión y el rendimiento de las consultas. Recomendamos encontrar el valor ideal mediante pruebas repetidas.</p>
<p>Los siguientes gráficos muestran los resultados de una prueba realizada con el conjunto de datos sift50m y el índice IVF_SQ8, en la que se comparan la recuperación y el rendimiento de las consultas de diferentes pares de <code translate="no">nlist</code> y<code translate="no">nprobe</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>Prueba de precisión</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   Prueba de rendimiento</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">¿Por qué las consultas a veces tardan más en conjuntos de datos más pequeños?</h4><p>Las operaciones de consulta se realizan sobre segmentos. Los índices reducen el tiempo que se tarda en consultar un segmento. Si un segmento no ha sido indexado, Milvus recurre a una búsqueda por fuerza bruta en los datos sin procesar, lo que aumenta drásticamente el tiempo de consulta.</p>
<p>Por lo tanto, suele tardar más en consultar un conjunto de datos pequeño (colección) porque no se ha creado ningún índice. Esto se debe a que el tamaño de sus segmentos no ha alcanzado el umbral de creación de índices establecido por <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Llama a <code translate="no">create_index()</code> para obligar a Milvus a indexar los segmentos que han alcanzado el umbral pero que aún no han sido indexados automáticamente, lo que mejora significativamente el rendimiento de las consultas.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">¿Qué factores influyen en el uso de la CPU?</h4><p>El uso de la CPU aumenta cuando Milvus está creando índices o ejecutando consultas. En general, la creación de índices consume muchos recursos de la CPU, salvo cuando se utiliza Annoy, que se ejecuta en un único hilo.</p>
<p>Al ejecutar consultas, el uso de la CPU se ve afectado por <code translate="no">nq</code> y <code translate="no">nprobe</code>. Cuando <code translate="no">nq</code> y <code translate="no">nprobe</code> son pequeños, la concurrencia es baja y el uso de la CPU se mantiene bajo.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">¿Afecta al rendimiento de las consultas la inserción y la búsqueda simultáneas de datos?</h4><p>Las operaciones de inserción no consumen muchos recursos de la CPU. Sin embargo, dado que es posible que los nuevos segmentos no hayan alcanzado el umbral para la creación de índices, Milvus recurre a una búsqueda por fuerza bruta, lo que afecta significativamente al rendimiento de las consultas.</p>
<p>El parámetro <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> determina el umbral de creación de índices para un segmento y está establecido en 1024 filas de forma predeterminada. Consulte <a href="/docs/es/v2.6.x/system_configuration.md">«Configuración del sistema»</a> para obtener más información.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">¿Puede la indexación de un campo VARCHAR mejorar la velocidad de eliminación?</h4><p>La indexación de un campo VARCHAR puede acelerar las operaciones de «Eliminación por expresión», pero solo bajo ciertas condiciones:</p>
<ul>
<li><strong>Índice INVERTIDO</strong>: este índice resulta útil para expresiones del tipo « <code translate="no">IN</code> » o « <code translate="no">==</code> » en campos VARCHAR que no sean claves primarias.</li>
<li><strong>Índice Trie</strong>: este índice resulta útil para consultas con prefijo (por ejemplo, « <code translate="no">LIKE prefix%</code> ») en campos VARCHAR que no sean claves primarias.</li>
</ul>
<p>Sin embargo, la indexación de un campo VARCHAR no acelera:</p>
<ul>
<li><strong>La eliminación por ID</strong>: cuando el campo VARCHAR es la clave principal.</li>
<li><strong>Expresiones no relacionadas</strong>: cuando el campo VARCHAR no forma parte de la expresión de eliminación.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">¿Todavía tienes dudas?</h4><p>Puedes:</p>
<ul>
<li>Echar un vistazo a <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> en GitHub. No dudes en hacer preguntas, compartir ideas y ayudar a los demás.</li>
<li>Únete a nuestro <a href="https://discord.com/invite/8uyFbECzPX">canal de Discord</a> para obtener ayuda e interactuar con nuestra comunidad de código abierto.</li>
</ul>
