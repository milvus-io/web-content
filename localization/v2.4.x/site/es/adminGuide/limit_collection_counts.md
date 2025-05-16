---
id: limit_collection_counts.md
title: Limitar el número de cobros
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Limitar el número de colecciones<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Una instancia de Milvus permite hasta 65.536 colecciones. Sin embargo, demasiadas colecciones pueden provocar problemas de rendimiento. Por lo tanto, se recomienda limitar el número de colecciones creadas en una instancia de Milvus.</p>
<p>Esta guía proporciona instrucciones sobre cómo establecer límites en el número de colecciones en una instancia de Milvus.</p>
<p>La configuración varía según la forma de instalar la instancia de Milvus.</p>
<ul>
<li><p>Para instancias Milvus instaladas utilizando Helm Charts</p>
<p>Añada la configuración al archivo <code translate="no">values.yaml</code> en la sección <code translate="no">config</code>. Para más detalles, consulte <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con Helm Charts</a>.</p></li>
<li><p>Para instancias Milvus instaladas utilizando Docker Compose</p>
<p>Añada la configuración al archivo <code translate="no">milvus.yaml</code> que ha utilizado para iniciar la instancia de Milvus. Para más detalles, consulte <a href="/docs/es/v2.4.x/configure-docker.md">Configurar Milvus con Docker Compose</a>.</p></li>
<li><p>Para instancias Milvus instaladas utilizando Operator</p>
<p>Añada la configuración a la sección <code translate="no">spec.components</code> del recurso personalizado <code translate="no">Milvus</code>. Para más detalles, consulte <a href="/docs/es/v2.4.x/configure_operator.md">Configurar Milvus con Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opciones de configuración<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p>El parámetro <code translate="no">maxGeneralCapacity</code> establece el número máximo de colecciones que puede contener la instancia Milvus actual. El valor por defecto es <code translate="no">65536</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Cálculo del número de colecciones<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>En una colección, puede configurar múltiples shards y particiones. Los fragmentos son unidades lógicas utilizadas para distribuir las operaciones de escritura de datos entre múltiples nodos de datos. Las particiones son unidades lógicas utilizadas para mejorar la eficiencia de la recuperación de datos cargando sólo un subconjunto de los datos de la colección. Al calcular el número de colecciones en la instancia actual de Milvus, también debe contar los fragmentos y las particiones.</p>
<p>Por ejemplo, supongamos que ya ha creado <strong>100</strong> colecciones, con <strong>2</strong> fragmentos y <strong>4</strong> particiones en <strong>60</strong> de ellas y con <strong>1</strong> fragmento y <strong>12</strong> particiones en las <strong>40</strong> colecciones restantes. El número actual de colecciones se puede calcular como:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>En el ejemplo anterior, ya has utilizado <strong>960</strong> de los límites por defecto. Ahora si quiere crear una nueva colección con <strong>4</strong> fragmentos y <strong>20</strong> particiones, recibirá el siguiente mensaje de error porque el número total de colecciones excede la capacidad máxima:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>Para evitar este error, puede reducir el número de fragmentos o particiones en las colecciones existentes o nuevas, eliminar algunas colecciones o aumentar el valor de <code translate="no">maxGeneralCapacity</code>.</p>
