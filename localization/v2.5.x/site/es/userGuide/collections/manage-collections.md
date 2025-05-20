---
id: manage-collections.md
title: Explicación de las colecciones
summary: >-
  En Milvus, puede crear múltiples colecciones para gestionar sus datos, e
  insertar sus datos como entidades en las colecciones. Colección y entidad son
  similares a tablas y registros en bases de datos relacionales. Esta página le
  ayuda a conocer la colección y los conceptos relacionados.
---
<h1 id="Collection-Explained" class="common-anchor-header">Explicación de las colecciones<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, puede crear múltiples colecciones para gestionar sus datos, e insertar sus datos como entidades en las colecciones. Colección y entidad son similares a tablas y registros en bases de datos relacionales. Esta página le ayudará a conocer la colección y los conceptos relacionados.</p>
<h2 id="Collection" class="common-anchor-header">Colección<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Una colección es una tabla bidimensional con columnas fijas y filas variantes. Cada columna representa un campo y cada fila representa una entidad.</p>
<p>La siguiente tabla muestra una colección con ocho columnas y seis entidades.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>Explicación de la colección</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Esquema y campos<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Al describir un objeto, solemos mencionar sus atributos, como el tamaño, el peso y la posición. Puede utilizar estos atributos como campos en una colección. Cada campo tiene varias propiedades restrictivas, como el tipo de datos y la dimensionalidad de un campo vectorial. Puede formar un esquema de colección creando los campos y definiendo su orden. Para conocer los posibles tipos de datos aplicables, consulte <a href="/docs/es/schema.md">Explicación del esquema</a>.</p>
<p>Debe incluir todos los campos definidos por el esquema en las entidades a insertar. Para que algunos de ellos sean opcionales, considere habilitar el campo dinámico. Para más detalles, consulte <a href="/docs/es/enable-dynamic-field.md">Campo dinámico</a>.</p>
<ul>
<li><p><strong>Hacerlos anulables o establecer valores por defecto</strong></p>
<p>Para más detalles sobre cómo hacer que un campo sea anulable o establecer el valor por defecto, consulte <a href="/docs/es/nullable-and-default.md">Anulable y por defecto</a>.</p></li>
<li><p><strong>Activar un campo dinámico</strong></p>
<p>Para más detalles sobre cómo habilitar y utilizar el campo dinámico, consulte <a href="/docs/es/enable-dynamic-field.md">Campo dinámico</a>.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">Clave primaria y AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>De forma similar al campo primario en una base de datos relacional, una colección tiene un campo primario para distinguir una entidad de otras. Cada valor del campo primario es globalmente único y corresponde a una entidad específica.</p>
<p>Como se muestra en el gráfico anterior, el campo denominado <strong>id</strong> sirve como campo primario, y el primer ID <strong>0</strong> corresponde a una entidad titulada <em>La tasa de mortalidad del coronavirus no es importante</em>. No habrá ninguna otra entidad que tenga el campo primario 0.</p>
<p>Un campo primario sólo acepta números enteros o cadenas. Al insertar entidades, debe incluir los valores del campo primario por defecto. Sin embargo, si ha activado <strong>AutoId</strong> al crear la colección, Milvus generará esos valores al insertar los datos. En tal caso, excluya los valores del campo primario de las entidades a insertar.</p>
<p>Para más información, consulte <a href="/docs/es/primary-field.md">Campo primario y AutoId</a>.</p>
<h2 id="Index" class="common-anchor-header">Índice<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>La creación de índices en campos específicos mejora la eficacia de la búsqueda. Se aconseja crear índices para todos los campos en los que se basa su servicio, entre los cuales los índices sobre campos vectoriales son obligatorios.</p>
<h2 id="Entity" class="common-anchor-header">Entidad<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>Las entidades son registros de datos que comparten el mismo conjunto de campos en una colección. Los valores de todos los campos de una misma fila constituyen una entidad.</p>
<p>Puede insertar tantas entidades como necesite en una colección. Sin embargo, a medida que aumenta el número de entidades, también aumenta el tamaño de memoria que ocupa, lo que afecta al rendimiento de la búsqueda.</p>
<p>Para más información, consulte <a href="/docs/es/schema.md">Explicación del esquema</a>.</p>
<h2 id="Load-and-Release" class="common-anchor-header">Cargar y liberar<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Cargar una colección es el requisito previo para realizar búsquedas y consultas de similitud en colecciones. Cuando carga una colección, Milvus carga todos los archivos de índice y los datos sin procesar de cada campo en la memoria para responder rápidamente a las búsquedas y consultas.</p>
<p>Las búsquedas y consultas son operaciones que consumen mucha memoria. Para ahorrar costes, se recomienda liberar las colecciones que no se estén utilizando en ese momento.</p>
<p>Para más detalles, consulte <a href="/docs/es/load-and-release.md">Cargar y liberar</a>.</p>
<h2 id="Search-and-Query" class="common-anchor-header">Búsquedas y consultas<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez creados los índices y cargada la colección, puede iniciar una búsqueda de similitud introduciendo uno o varios vectores de consulta. Por ejemplo, al recibir la representación vectorial de su consulta transportada en una solicitud de búsqueda, Milvus utiliza el tipo de métrica especificado para medir la similitud entre el vector de consulta y los de la colección de destino antes de devolver los que son semánticamente similares a la consulta.</p>
<p>También puede incluir el filtrado de metadatos en las búsquedas y consultas para mejorar la relevancia de los resultados. Tenga en cuenta que las condiciones de filtrado de metadatos son obligatorias en las consultas, pero opcionales en las búsquedas.</p>
<p>Para obtener más información sobre los tipos de métricas aplicables, consulte <a href="/docs/es/metric.md">Tipos de métricas</a>.</p>
<p>Para obtener más información sobre búsquedas y consultas, consulte los artículos del capítulo Búsqueda y renumeración, entre los que se encuentran las funciones básicas:</p>
<ul>
<li><p><a href="/docs/es/single-vector-search.md">Búsqueda básica de RNA</a></p></li>
<li><p><a href="/docs/es/filtered-search.md">Búsqueda filtrada</a></p></li>
<li><p><a href="/docs/es/range-search.md">Búsqueda por rango</a></p></li>
<li><p><a href="/docs/es/grouping-search.md">Búsqueda por agrupación</a></p></li>
<li><p><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a></p></li>
<li><p><a href="/docs/es/with-iterators.md">Iterador de búsqueda</a></p></li>
<li><p><a href="/docs/es/get-and-scalar-query.md">Consulta</a></p></li>
<li><p><a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a></p></li>
<li><p><a href="/docs/es/keyword-match.md">Coincidencia de texto</a></p></li>
</ul>
<p>Además, Milvus también proporciona mejoras para aumentar el rendimiento y la eficacia de la búsqueda. Están desactivadas por defecto, y usted puede activarlas y utilizarlas según sus necesidades de servicio. Son las siguientes</p>
<ul>
<li><p><a href="/docs/es/use-partition-key.md">Utilizar clave de partición</a></p></li>
<li><p><a href="/docs/es/mmap.md">Utilizar mmap</a></p></li>
<li><p><a href="/docs/es/clustering-compaction.md">Agrupación Compactación</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">Partición<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Las particiones son subconjuntos de una colección, que comparten el mismo conjunto de campos con su colección padre, conteniendo cada una un subconjunto de entidades.</p>
<p>Al asignar entidades a diferentes particiones, puede crear grupos de entidades. Puede realizar búsquedas y consultas en particiones específicas para que Milvus ignore entidades en otras particiones, y mejorar la eficiencia de la búsqueda.</p>
<p>Para más detalles, consulte <a href="/docs/es/manage-partitions.md">Gestionar Particiones</a>.</p>
<h2 id="Shard" class="common-anchor-header">Tablero<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Los fragmentos son partes horizontales de una colección. Cada fragmento corresponde a un canal de entrada de datos. Por defecto, cada colección tiene un fragmento. Puede establecer el número apropiado de fragmentos al crear una colección basándose en el rendimiento esperado y el volumen de los datos que se insertarán en la colección.</p>
<p>Para obtener más información sobre cómo establecer el número de fragmentos, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
<h2 id="Alias" class="common-anchor-header">Alias<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede crear alias para sus colecciones. Una colección puede tener varios alias, pero las colecciones no pueden compartir un alias. Al recibir una solicitud para una colección, Milvus localiza la colección basándose en el nombre proporcionado. Si la colección con el nombre proporcionado no existe, Milvus continúa localizando el nombre proporcionado como alias. Puede utilizar alias de colecciones para adaptar su código a diferentes escenarios.</p>
<p>Para más detalles, consulte <a href="/docs/es/manage-aliases.md">Gestionar alias</a>.</p>
<h2 id="Function" class="common-anchor-header">Función<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede establecer funciones para que Milvus derive campos al crear una colección. Por ejemplo, la función de búsqueda de texto completo utiliza la función definida por el usuario para derivar un campo vectorial disperso de un campo varchar específico. Para obtener más información sobre la búsqueda de texto completo, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Nivel de consistencia<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Los sistemas de bases de datos distribuidas suelen utilizar el nivel de consistencia para definir la homogeneidad de los datos entre nodos de datos y réplicas. Puede establecer distintos niveles de coherencia al crear una colección o realizar búsquedas de similitud dentro de la colección. Los niveles de consistencia aplicables son <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong> y <strong>Eventually</strong>.</p>
<p>Para obtener más información sobre estos niveles de coherencia, consulte <a href="/docs/es/tune_consistency.md">Nivel de coherencia</a>.</p>
