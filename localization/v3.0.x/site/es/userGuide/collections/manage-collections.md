---
id: manage-collections.md
title: Explicación de las colecciones
summary: >-
  En Milvus, puedes crear varias colecciones para gestionar tus datos e
  insertarlos como entidades en dichas colecciones. Las colecciones y las
  entidades son similares a las tablas y los registros de las bases de datos
  relacionales. Esta página te ayudará a familiarizarte con las colecciones y
  los conceptos relacionados.
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
    </button></h1><p>En Milvus, puedes crear varias colecciones para gestionar tus datos e insertarlos como entidades en las colecciones. Las colecciones y las entidades son similares a las tablas y los registros de las bases de datos relacionales. Esta página te ayuda a conocer las colecciones y los conceptos relacionados.</p>
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
    </button></h2><p>Una colección es una tabla bidimensional con columnas fijas y filas variables. Cada columna representa un campo y cada fila representa una entidad.</p>
<p>El siguiente gráfico muestra una colección con ocho columnas y seis entidades.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>Explicación de las colecciones</span>
  
 </span></p>
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
    </button></h2><p>Al describir un objeto, solemos mencionar sus atributos, como el tamaño, el peso y la posición. Estos atributos se pueden utilizar como campos en una colección. Cada campo tiene diversas propiedades restrictivas, como el tipo de datos y la dimensionalidad de un campo vectorial. Se puede crear un esquema de colección creando los campos y definiendo su orden. Para conocer los tipos de datos que se pueden aplicar, consulta <a href="/docs/es/schema.md">Explicación</a> del <a href="/docs/es/schema.md">esquema</a>.</p>
<p>Debe incluir todos los campos definidos en el esquema en las entidades que vaya a insertar. Para que algunos de ellos sean opcionales, considere la posibilidad de habilitar el campo dinámico. Para obtener más detalles, consulte «Explicación de <a href="/docs/es/enable-dynamic-field.md">los campos dinámicos</a>».</p>
<ul>
<li><p><strong>Hacerlos nulos o establecer valores por defecto</strong></p>
<p>Para obtener más información sobre cómo hacer que un campo sea nulo o establecer el valor por defecto, consulta <a href="/docs/es/nullable-and-default.md">«Nulo y por defecto</a>».</p></li>
<li><p><strong>Habilitar el campo dinámico</strong></p>
<p>Para obtener más información sobre cómo habilitar y utilizar el campo dinámico, consulta <a href="/docs/es/enable-dynamic-field.md">«Campo dinámico</a>».</p></li>
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
    </button></h2><p>Al igual que el campo primario en una base de datos relacional, una colección tiene un campo primario para distinguir una entidad de las demás. Cada valor del campo primario es único a nivel global y se corresponde con una entidad específica.</p>
<p>Como se muestra en el gráfico anterior, el campo denominado <strong>«id»</strong> actúa como campo primario, y el primer ID, <strong>0</strong>, corresponde a una entidad titulada <em>«La tasa de mortalidad del coronavirus no es importante</em>». No habrá ninguna otra entidad que tenga el campo primario con valor 0.</p>
<p>Un campo primario solo admite números enteros o cadenas de caracteres. Al insertar entidades, debe incluir los valores del campo primario de forma predeterminada. Sin embargo, si ha habilitado <strong>AutoId</strong> al crear la colección, Milvus generará esos valores al insertar los datos. En tal caso, excluya los valores del campo primario de las entidades que se vayan a insertar.</p>
<p>Para obtener más información, consulta <a href="/docs/es/primary-field.md">«Campo primario y AutoId</a>».</p>
<h2 id="Index" class="common-anchor-header">Índices<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>La creación de índices en campos específicos mejora la eficiencia de la búsqueda. Se recomienda crear índices para todos los campos de los que depende su servicio; entre ellos, los índices en campos vectoriales son obligatorios.</p>
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
    </button></h2><p>Las entidades son registros de datos que comparten el mismo conjunto de campos en una colección. Los valores de todos los campos de una misma fila conforman una entidad.</p>
<p>Puede insertar tantas entidades como necesite en una colección. Sin embargo, a medida que aumenta el número de entidades, también aumenta el espacio de memoria que ocupan, lo que afecta al rendimiento de la búsqueda.</p>
<p>Para obtener más información, consulta <a href="/docs/es/schema.md">«Explicación</a> del <a href="/docs/es/schema.md">esquema</a>».</p>
<h2 id="Load-and-Release" class="common-anchor-header">Carga y liberación<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>La carga de una colección es un requisito previo para realizar búsquedas de similitud y consultas en las colecciones. Al cargar una colección, Milvus carga en memoria todos los archivos de índice y los datos sin procesar de cada campo para ofrecer una respuesta rápida a las búsquedas y consultas.</p>
<p>Las búsquedas y consultas son operaciones que consumen mucha memoria. Para ahorrar recursos, se recomienda liberar las colecciones que no se estén utilizando en ese momento.</p>
<p>Para obtener más detalles, consulta <a href="/docs/es/load-and-release.md">«Carga y liberación</a>».</p>
<h2 id="Search-and-Query" class="common-anchor-header">Búsqueda y consulta<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez creados los índices y cargada la colección, puedes iniciar una búsqueda de similitud introduciendo uno o varios vectores de consulta. Por ejemplo, al recibir la representación vectorial de tu consulta incluida en una solicitud de búsqueda, Milvus utiliza el tipo de métrica especificado para medir la similitud entre el vector de consulta y los de la colección de destino antes de devolver aquellos que son semánticamente similares a la consulta.</p>
<p>También puede incluir filtros de metadatos en las búsquedas y consultas para mejorar la relevancia de los resultados. Tenga en cuenta que las condiciones de filtrado de metadatos son obligatorias en las consultas, pero opcionales en las búsquedas.</p>
<p>Para obtener más información sobre los tipos de métricas aplicables, consulta <a href="/docs/es/metric.md">Tipos</a> de <a href="/docs/es/metric.md">métricas</a>.</p>
<p>Para obtener más información sobre búsquedas y consultas, consulta los artículos del capítulo «Búsqueda y reordenación», entre los que destacan las siguientes funciones básicas:</p>
<ul>
<li><p><a href="/docs/es/single-vector-search.md">Búsqueda básica con redes neuronales artificiales (ANN)</a></p></li>
<li><p><a href="/docs/es/filtered-search.md">Búsqueda filtrada</a></p></li>
<li><p><a href="/docs/es/range-search.md">Búsqueda por rango</a></p></li>
<li><p><a href="/docs/es/grouping-search.md">Búsqueda por agrupación</a></p></li>
<li><p><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a></p></li>
<li><p><a href="/docs/es/with-iterators.md">Iterador de búsqueda</a></p></li>
<li><p><a href="/docs/es/get-and-scalar-query.md">Consulta</a></p></li>
<li><p><a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a></p></li>
<li><p><a href="/docs/es/keyword-match.md">Coincidencia de texto</a></p></li>
</ul>
<p>Además, Milvus también ofrece mejoras para aumentar el rendimiento y la eficiencia de la búsqueda. Están desactivadas por defecto, y puedes activarlas y utilizarlas según los requisitos de tu servicio. Son las siguientes:</p>
<ul>
<li><p><a href="/docs/es/use-partition-key.md">Usar clave de partición</a></p></li>
<li><p><a href="/docs/es/mmap.md">Usar mmap</a></p></li>
<li><p><a href="/docs/es/clustering-compaction.md">Compactación por clústeres</a></p></li>
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
    </button></h2><p>Las particiones son subconjuntos de una colección que comparten el mismo conjunto de campos que su colección principal, y cada una contiene un subconjunto de entidades.</p>
<p>Al asignar entidades a diferentes particiones, se pueden crear grupos de entidades. Se pueden realizar búsquedas y consultas en particiones específicas para que Milvus ignore las entidades de otras particiones y mejore así la eficiencia de la búsqueda.</p>
<p>Para más detalles, consulta <a href="/docs/es/manage-partitions.md">«Gestionar particiones</a>».</p>
<h2 id="Shard" class="common-anchor-header">Fragmento<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Los fragmentos son secciones horizontales de una colección. Cada fragmento se corresponde con un canal de entrada de datos. Por defecto, cada colección tiene un fragmento. Al crear una colección, puedes establecer el número adecuado de fragmentos en función del rendimiento esperado y del volumen de datos que se vayan a insertar en la colección.</p>
<p>Para obtener más información sobre cómo establecer el número de fragmentos, consulta <a href="/docs/es/create-collection.md">«Crear colección</a>».</p>
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
    </button></h2><p>Puede crear alias para sus colecciones. Una colección puede tener varios alias, pero las colecciones no pueden compartir un mismo alias. Al recibir una solicitud dirigida a una colección, Milvus localiza la colección en función del nombre facilitado. Si la colección con ese nombre no existe, Milvus continúa buscando el nombre facilitado como un alias. Puedes utilizar los alias de colección para adaptar tu código a diferentes escenarios.</p>
<p>Para obtener más detalles, consulta <a href="/docs/es/manage-aliases.md">«Gestionar alias</a>».</p>
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
    </button></h2><p>Puede configurar funciones para que Milvus derive campos al crear una colección. Por ejemplo, la función de búsqueda de texto completo utiliza una función definida por el usuario para derivar un campo de vector disperso a partir de un campo varchar específico. Para obtener más información sobre la búsqueda de texto completo, consulte <a href="/docs/es/full-text-search.md">«Búsqueda de texto completo</a>».</p>
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
    </button></h2><p>Los sistemas de bases de datos distribuidas suelen utilizar el nivel de consistencia para definir la uniformidad de los datos entre los nodos de datos y las réplicas. Puede establecer niveles de consistencia distintos al crear una colección o al realizar búsquedas de similitud dentro de la colección. Los niveles de consistencia aplicables son <strong>«Strong»</strong>, <strong>«Bounded Staleness»</strong>, <strong>«Session</strong>» y <strong>«Eventually</strong>».</p>
<p>Para obtener más detalles sobre estos niveles de consistencia, consulta <a href="/docs/es/tune_consistency.md">«Nivel</a> de <a href="/docs/es/tune_consistency.md">consistencia</a>».</p>
