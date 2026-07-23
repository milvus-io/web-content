---
id: choose-an-embeddinglist-search-strategy.md
title: Elige una estrategia de búsqueda de EmbeddingList
summary: >-
  Las estrategias de búsqueda de EmbeddingList determinan cómo Milvus crea un
  índice aproximado de candidatos para la búsqueda en EmbeddingList. La
  estrategia predeterminada es «tokenann». Se puede cambiar a «muvera» o «lemur»
  cuando la lista de incrustaciones sea grande, «TokenANN» resulte demasiado
  costoso o una representación a nivel de fila aprendida o comprimida sea más
  adecuada. El resultado final sigue generándose mediante la reordenación de
  MaxSim cuando se habilita «emb_list_rerank».
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Elige una estrategia de búsqueda de EmbeddingList<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>Las estrategias de búsqueda de EmbeddingList determinan cómo Milvus crea un índice aproximado de candidatos para la búsqueda en EmbeddingList. La estrategia predeterminada es « <code translate="no">tokenann</code> ». Puedes cambiar a « <code translate="no">muvera</code> » o « <code translate="no">lemur</code> » cuando la lista de incrustaciones sea grande, TokenANN resulte demasiado costoso o una representación a nivel de fila aprendida o comprimida sea más adecuada. El resultado final sigue generándose mediante la reordenación de MaxSim cuando se habilita la opción « <code translate="no">emb_list_rerank</code> ».</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Por qué existen las estrategias de búsqueda<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>La lista de incrustaciones (EmbeddingList) está diseñada para filas que contienen múltiples vectores, como incrustaciones de tokens en un documento de texto, incrustaciones de fragmentos en un documento visual o incrustaciones de clips en un vídeo. En lugar de comparar un vector de consulta con un vector de fila, MaxSim compara una lista de incrustaciones de consulta con una lista de incrustaciones de documento y agrega las mejores coincidencias.</p>
<p>Esto proporciona una mayor capacidad de representación, pero el MaxSim exacto resulta costoso a gran escala. Una búsqueda MaxSim por fuerza bruta tendría que comparar los vectores de consulta con cada vector de cada fila candidata. Esto suele ser demasiado lento para la búsqueda en producción.</p>
<table>
<thead>
<tr><th>### Problema - Cada fila puede contener muchos vectores. - Aplicar MaxSim exacto a todas las filas resulta costoso. - El tamaño del índice y la latencia de la búsqueda pueden aumentar rápidamente.</th><th>### Estrategia - Utilizar un método de recuperación aproximado en una primera etapa. - Recuperar más candidatos que los topK solicitados. - Reordenar los candidatos con MaxSim exacto.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>En este sentido, « <code translate="no">emb_list_strategy</code> » es principalmente una estrategia de creación de índices y recuperación de candidatos. Se configura al crear el índice y determina cómo se genera el conjunto de candidatos de la primera etapa mediante una red neuronal artificial (ANN). Los parámetros en tiempo de búsqueda, como « <code translate="no">retrieval_ann_ratio</code> » y « <code translate="no">emb_list_rerank</code> », controlan entonces cuántos candidatos se recuperan y si se aplica la reordenación mediante MaxSim.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Estrategias disponibles<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<tr><th>Estrategia</th><th>Unidad de recuperación de candidatos</th><th>Qué resuelve</th><th>Mejor ajuste</th><th>Principal compromiso</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Vectores individuales dentro de cada fila</td><td>Conserva los vectores originales y evita la pérdida por compresión.</td><td>Búsqueda centrada en la calidad, listas de incrustaciones cortas o medias, incrustaciones de alta discriminación.</td><td>Índice más grande y mayor coste de recuperación de candidatos.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>Un vector codificado por fila</td><td>Comprime una lista de incrustaciones en una representación FDE de dimensión fija sin necesidad de entrenamiento.</td><td>Documentos más largos, incrustaciones de alta discriminación, casos en los que TokenANN resulta demasiado pesado.</td><td>La proyección aleatoria introduce una pérdida por aproximación; la dimensión de la FDE afecta a la latencia.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>Un vector aprendido por fila</td><td>Aprende una compresión específica para cada corpus a partir de listas de incrustaciones hacia vectores de fila de dimensión fija.</td><td>Incrustaciones de baja discriminación, recuperación multimodal o de documentos visuales, listas de incrustaciones extensas.</td><td>Requiere entrenamiento y puede ser sensible a la distribución del corpus y al sesgo de la longitud de los documentos.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> indexa cada vector de la lista de incrustaciones. Durante la búsqueda, cada vector de consulta realiza una recuperación mediante una red neuronal artificial (ANN); los vectores coincidentes se agregan de nuevo a sus filas, y las filas candidatas resultantes se vuelven a clasificar con MaxSim.</p>
<div class="alert note">
<p><strong>Utiliza TokenANN cuando la calidad sea la máxima prioridad.</strong> Es la aproximación más cercana al cálculo original de MaxSim, ya que mantiene todos los vectores disponibles en el índice de la primera etapa.</p>
</div>
<ul>
<li><p><strong>Ideal para:</strong> fragmentos de texto cortos, filas con un número pequeño o moderado de vectores, separación semántica marcada a nivel de token y líneas de base sensibles a la calidad.</p></li>
<li><p><strong>Menos adecuado:</strong> documentos muy largos, páginas visuales con miles de vectores de parches, restricciones estrictas de memoria o latencia.</p></li>
<li><p><strong>Comportamiento a nivel de elemento:</strong> TokenANN puede recuperar candidatos a partir de vectores individuales antes de volver a agregarlos en filas. El resultado final de la búsqueda en EmbeddingList sigue siendo a nivel de fila tras la puntuación de MaxSim.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> codifica cada lista de incrustaciones en un vector de dimensión fija mediante proyecciones aleatorias. Esto convierte la recuperación de la primera etapa en una búsqueda vectorial estándar a nivel de fila. A continuación, los candidatos se vuelven a clasificar con MaxSim.</p>
<div class="alert note">
<p><strong>Utiliza MUVERA cuando TokenANN resulte demasiado pesado, pero no desees realizar una etapa de entrenamiento.</strong> Es un término medio práctico entre calidad y coste.</p>
</div>
<ul>
<li><p><strong>Ideal para:</strong> documentos de texto largos, espacios de incrustación de alta discriminación, cargas de trabajo que requieren un tamaño de índice menor que el de TokenANN.</p></li>
<li><p><strong>Menos adecuado:</strong> espacios de incrustación de baja discriminación o casos en los que la representación FDE resulta demasiado multidimensional para el presupuesto de latencia.</p></li>
<li><p><strong>Parámetros importantes:</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code> y <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> entrena un modelo para comprimir cada lista de incrustaciones en una representación de dimensión fija. La búsqueda ANN de primera etapa se ejecuta sobre los vectores aprendidos a nivel de fila, y los candidatos se vuelven a clasificar con MaxSim.</p>
<div class="alert note">
<p><strong>Utiliza LEMUR cuando la compresión aprendida compense el coste de entrenamiento.</strong> Puede funcionar bien en espacios de incrustación de baja discriminación y en la recuperación multimodal, pero debe validarse con el corpus de destino, ya que puede ser sensible a la distribución de la longitud de los documentos.</p>
</div>
<ul>
<li><p><strong>Adecuado para:</strong> búsqueda de documentos visuales, incrustaciones de fragmentos multimodales, espacios de incrustación de baja discriminación, listas de incrustación grandes en las que TokenANN no resulta práctico.</p></li>
<li><p><strong>Menos adecuado:</strong> corpus que cambian con frecuencia, incrustaciones de alta discriminación con longitudes de documentos muy sesgadas, cargas de trabajo en las que el coste de entrenamiento es inaceptable.</p></li>
<li><p><strong>Parámetros importantes:</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code> y <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Comportamiento y configuración predeterminados<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>La estrategia predeterminada de EmbeddingList en Knowhere es <code translate="no">tokenann</code>. Si no se especifica <code translate="no">emb_list_strategy</code>, Knowhere utiliza TokenANN. Los valores predeterminados en tiempo de búsqueda incluyen <code translate="no">retrieval_ann_ratio=3.0</code> y <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Elementos de configuración por estrategia<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla enumera los elementos de configuración específicos de cada estrategia. En Milvus, los elementos de tiempo de compilación suelen pasarse en el mapa <code translate="no">params</code> al crear un índice. Si necesitas valores predeterminados del lado del servidor, deben definirse en el archivo de configuración de Milvus, en la sección <code translate="no">knowhere</code>.</p>
<table>
<thead>
<tr><th>Estrategia</th><th>Elemento de configuración</th><th>Etapa</th><th>Valor por defecto</th><th>Cuándo modificarlo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Creación del índice</td><td><code translate="no">tokenann</code></td><td>Úsalo explícitamente cuando desees el comportamiento predeterminado de indexación del vector de elementos o cuando se utilice DiskANN.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Creación de índices</td><td><code translate="no">tokenann</code></td><td>Úsalo cuando desees una recuperación codificada a nivel de fila sin necesidad de entrenamiento.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Creación del índice</td><td><code translate="no">4</code></td><td>Controla el recuento de proyecciones de SimHash. Los valores más altos crean más compartimentos y pueden mejorar la calidad de la codificación, pero aumentan la dimensionalidad codificada.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Creación de índice</td><td><code translate="no">7</code></td><td>Controla cuántas codificaciones FDE independientes se concatenan. Los valores más altos pueden mejorar la robustez, pero aumentan el coste del índice y de la búsqueda.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Creación del índice</td><td><code translate="no">42</code></td><td>Se establece para obtener proyecciones aleatorias reproducibles, especialmente en pruebas y comparativas de rendimiento.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Creación de índices</td><td><code translate="no">tokenann</code></td><td>Utilízalo cuando se espere que la compresión aprendida a nivel de fila funcione mejor que la proyección aleatoria fija.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Creación de índices</td><td><code translate="no">256</code></td><td>Controla el tamaño de la representación comprimida. Aumenta este valor para obtener más capacidad; disminúyelo para reducir el consumo de memoria y acelerar la recuperación.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Creación de índices</td><td><code translate="no">20000</code></td><td>Aumenta este valor cuando el corpus sea diverso y la compresión aprendida no se ajuste bien; redúcelo solo para pruebas pequeñas o para creaciones más rápidas.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Creación de índices</td><td><code translate="no">50</code></td><td>Aumenta si el entrenamiento no ha convergido; reduce cuando el tiempo de creación sea la principal limitación.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Creación del índice</td><td><code translate="no">512</code></td><td>Ajústalo en función del rendimiento del entrenamiento y del uso de memoria.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Creación del índice</td><td><code translate="no">0.001</code></td><td>Ajustar cuando el entrenamiento sea inestable o converja demasiado lentamente.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Creación de índices</td><td><code translate="no">42</code></td><td>Configurar para obtener ejecuciones de entrenamiento reproducibles.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Creación de índices</td><td><code translate="no">2</code></td><td>Aumenta este valor solo cuando el corpus necesite un extractor de características más expresivo y puedas asumir el coste adicional del entrenamiento.</td></tr>
<tr><td>Todas las estrategias</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Búsqueda</td><td><code translate="no">3.0</code></td><td>Aumenta para recuperar más candidatos de la primera etapa y mejorar la recuperación; disminuye para reducir la latencia.</td></tr>
<tr><td>Todas las estrategias</td><td><code translate="no">emb_list_rerank</code></td><td>Búsqueda</td><td><code translate="no">true</code></td><td>Mantén esta opción activada para la reclasificación de MaxSim. Desactívala únicamente en experimentos controlados en los que se mida directamente la calidad de la red neuronal artificial (ANN) de la primera etapa.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Configurar la estrategia en Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>En Milvus, la estrategia se pasa como parámetro de índice al crear un índice en un campo EmbeddingList, como un subcampo vectorial StructArray.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Para LEMUR, especifica los parámetros de entrenamiento de LEMUR en el mismo mapa « <code translate="no">params</code> ».</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Configurar los valores predeterminados del lado del servidor en Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus también puede rellenar los parámetros de índice a partir de <code translate="no">milvus.yaml</code>. La sección relevante es <code translate="no">knowhere</code>. Los parámetros se organizan por tipo de índice y etapa, siguiendo el patrón <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>. Los parámetros de índice proporcionados por el usuario tienen prioridad sobre estos valores predeterminados.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Es preferible utilizar parámetros por índice para la selección de estrategias.</strong> Un valor por defecto del archivo de configuración de Milvus se aplica de forma general a los índices de ese tipo y etapa. Utiliza los parámetros de <code translate="no">create_index</code> cuando diferentes colecciones o campos necesiten estrategias de EmbeddingList distintas.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Configurar la recuperación de candidatos en el momento de la búsqueda<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>La estrategia determina cómo se construye el índice. En el momento de la búsqueda, utilice <code translate="no">retrieval_ann_ratio</code> para controlar cuántos candidatos de la primera etapa se recuperan antes de la reclasificación de MaxSim. Los valores más altos suelen mejorar la recuperación, pero aumentan la latencia.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parámetro</th><th>Etapa</th><th>Por defecto</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Creación del índice</td><td><code translate="no">tokenann</code></td><td>Selecciona cómo se indexan y recuperan los candidatos de EmbeddingList.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Búsqueda</td><td><code translate="no">3.0</code></td><td>Factor de expansión de candidatos para la primera ronda de la red neuronal artificial (ANN).</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Búsqueda</td><td><code translate="no">true</code></td><td>Indica si se debe volver a clasificar a los candidatos recuperados con MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Notas de compatibilidad:</strong> MUVERA y LEMUR admiten actualmente datos fp32 en Knowhere. DiskANN solo admite EmbeddingList con la estrategia TokenANN. Si utilizas tipos de vectores que no sean fp32 o DiskANN, comprueba la compatibilidad de la estrategia antes de cambiar la configuración predeterminada.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">Cómo elegir una estrategia<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>No existe una estrategia universalmente óptima. Elige en función de la longitud de la lista de incrustaciones, la capacidad de discriminación del espacio de incrustación, el presupuesto de latencia, el tamaño del índice y si puedes permitirte una fase de entrenamiento.</p>
<table>
<thead>
<tr><th>Pregunta</th><th>Señal</th><th>Punto de partida recomendado</th></tr>
</thead>
<tbody>
<tr><td>¿Necesitas una línea de base de alta calidad?</td><td>Quieres medir la mejor aproximación práctica antes de optimizar el coste.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>¿El número de vectores por fila es reducido o moderado?</td><td>Cada fila tiene un número reducido de vectores de token, patch o clip.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>¿Es TokenANN demasiado grande o demasiado lento?</td><td>El tamaño del índice o la latencia de la recuperación en la primera etapa son el cuello de botella.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>¿Quieres compresión sin entrenamiento?</td><td>Necesitas un modelo operativo más sencillo y una codificación reproducible.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>¿El espacio de incrustación tiene baja capacidad de discriminación?</td><td>Las redes neuronales artificiales (ANN) a nivel de token presentan ruido, y la proyección aleatoria no conserva suficiente señal.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>¿La carga de trabajo es visual o multimodal?</td><td>Las filas contienen muchos vectores de parches, y TokenANN resulta demasiado costoso.</td><td><code translate="no">lemur</code> o <code translate="no">muvera</code></td></tr>
<tr><td>¿La longitud de los documentos presenta un sesgo elevado?</td><td>Algunas filas contienen muchos más vectores que otras.</td><td>Empieza con <code translate="no">muvera</code>; comprueba cuidadosamente <code translate="no">lemur</code>.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Flujo de trabajo de evaluación recomendado<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
<li><p>Empieza con <code translate="no">tokenann</code> como referencia de calidad cuando el tamaño del conjunto de datos lo permita.</p></li>
<li><p>Ejecuta las mismas consultas con <code translate="no">muvera</code> y compara la recuperación, el nDCG, la latencia y el tamaño del índice.</p></li>
<li><p>Prueba <code translate="no">lemur</code> cuando la lista de incrustaciones sea grande, el espacio de incrustación presente ruido o la carga de trabajo sea visual o multimodal.</p></li>
<li><p>Ajuste el valor de « <code translate="no">retrieval_ann_ratio</code> » antes de modificar demasiados parámetros de compilación. Auméntelo si la recuperación es baja; redúzcalo si la latencia es demasiado alta.</p></li>
<li><p>Valida siempre con consultas representativas y distribuciones de longitud de documentos. Una estrategia que funcione con textos cortos puede no funcionar con documentos visuales o corpus de cola larga.</p></li>
</ol>
<table>
<thead>
<tr><th>### La calidad ante todo: empieza con <code translate="no">tokenann</code>. Úsalo como referencia para la calidad de la aproximación de MaxSim.</th><th>### Equilibrado Prueba <code translate="no">muvera</code> cuando necesites reducir el coste sin añadir un proceso de entrenamiento.</th><th>### Comprimido: Prueba <code translate="no">lemur</code> cuando sea probable que la compresión aprendida a nivel de fila supere a la proyección aleatoria fija.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">Referencias utilizadas para este borrador<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Pruebas de Milvus para <code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code> y <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>Gestión de archivos de configuración de Milvus para los valores predeterminados de los índices del lado del servidor en la sección « <code translate="no">knowhere</code> ».</p></li>
<li><p>Definiciones de los parámetros de Knowhere para los valores predeterminados y los nombres de estrategias compatibles.</p></li>
<li><p>Comprobaciones de compatibilidad de Knowhere para MUVERA/LEMUR (solo fp32) y compatibilidad exclusiva con TokenANN de DiskANN.</p></li>
<li><p>Notas de evaluación internas que comparan TokenANN, MUVERA y LEMUR para la recuperación de candidatos en MaxSim.</p></li>
</ul>
<div class="alert note">
<p><strong>Nota de publicación:</strong> Antes de publicar externamente, comprueba qué parámetros son oficialmente compatibles con la versión de Milvus de destino y si el producto desea exponer todos los parámetros de bajo nivel de Knowhere o solo un subconjunto más reducido y documentado.</p>
</div>
