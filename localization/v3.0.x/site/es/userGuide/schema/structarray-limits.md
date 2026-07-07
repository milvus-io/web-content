---
id: structarray-limits.md
title: Límites de StructArray
summary: >-
  La compatibilidad con StructArray abarca la definición del esquema, las cargas
  de datos de inserción, la indexación, los modos de búsqueda y los filtros
  específicos de StructArray. Utiliza esta página como referencia de límites
  antes de basarte en el comportamiento de StructArray en un entorno de
  producción.
---
<h1 id="StructArray-Limits" class="common-anchor-header">Límites de StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>La compatibilidad con StructArray abarca la definición del esquema, las cargas útiles de inserción, la indexación, los modos de búsqueda y los filtros específicos de StructArray. Utiliza esta página como referencia de límites antes de confiar en el comportamiento de StructArray en producción.</p>
<p>La mayoría de los límites de StructArray provienen de una de estas tres fuentes: el modelo de esquema de StructArray, el modo de búsqueda que elijas para los subcampos vectoriales y la versión de Milvus en la que se ejecuta tu colección.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Resumen de los límites<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>Área</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Forma del esquema</td><td>Una Struct solo se puede utilizar como tipo de elemento de un campo Array. Struct no es compatible como campo de colección de nivel superior.</td></tr>
<tr><td>Esquema de subcampos</td><td>Todos los elementos Struct de un mismo campo StructArray comparten un esquema Struct predefinido.</td></tr>
<tr><td>La capacidad</td><td><code translate="no">max_capacity</code> es obligatorio y limita el número de elementos Struct que una entidad puede almacenar en el campo StructArray.</td></tr>
<tr><td>Cambios en los subcampos</td><td>Una vez creado un campo StructArray, no se pueden añadir subcampos a ese campo StructArray ya existente.</td></tr>
<tr><td>Ruta del subcampo</td><td>Utilice rutas del tipo <code translate="no">structArray[subfield]</code>, como <code translate="no">chunks[emb]</code>, para índices, objetivos de búsqueda, campos de salida y filtros. No utilice <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Insertar forma</td><td>Inserta un campo StructArray como una matriz de objetos. No utilices la sintaxis de ruta dentro de las cargas útiles de inserción.</td></tr>
<tr><td>Índices vectoriales</td><td>Un campo vectorial o un subcampo vectorial solo admite un índice. Utilice subcampos vectoriales independientes para la búsqueda en EmbeddingList y la búsqueda a nivel de elemento.</td></tr>
<tr><td>Funciones</td><td>Las funciones de campo no son compatibles con los campos o subcampos dentro de un campo StructArray.</td></tr>
<tr><td>Campos nulos</td><td>Los campos StructArray nulos están sujetos a restricciones de versión. Cuando se admiten, el valor nulo se aplica a todo el campo StructArray, no a un elemento Struct concreto de forma independiente.</td></tr>
<tr><td>Añadir campo dinámico</td><td>La adición de un campo StructArray a una colección existente depende de la versión y requiere que el campo añadido sea nulo.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Límites del esquema<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>Límite</th><th>Detalles</th></tr>
</thead>
<tbody>
<tr><td>«Struct» no es un tipo de campo de nivel superior.</td><td>Crea un campo StructArray como « <code translate="no">datatype=DataType.ARRAY</code> » con « <code translate="no">element_type=DataType.STRUCT</code> » y « <code translate="no">struct_schema</code> ».</td></tr>
<tr><td>Todos los elementos comparten un mismo esquema.</td><td>Cada elemento Struct de un campo StructArray sigue la misma lista de subcampos y los mismos tipos de datos de los subcampos.</td></tr>
<tr><td><code translate="no">max_capacity</code> es obligatorio.</td><td>El número de elementos Struct en una entidad no debe superar el valor de « <code translate="no">max_capacity</code> » configurado para el campo StructArray.</td></tr>
<tr><td>Los subcampos existentes son fijos.</td><td>No se pueden añadir nuevos subcampos a un campo StructArray ya existente. Para cambiar el esquema de los subcampos, elimine el campo StructArray y vuelva a añadirlo con el esquema actualizado.</td></tr>
<tr><td>No se admiten StructArray anidados.</td><td>Un campo StructArray no puede contener subcampos anidados de tipo « <code translate="no">Array</code> », « <code translate="no">ArrayOfVector</code> », « <code translate="no">Struct</code> » o « <code translate="no">ArrayOfStruct</code> ».</td></tr>
<tr><td>No se admiten funciones dentro de StructArray.</td><td>No defina funciones de campo para campos StructArray ni para sus subcampos.</td></tr>
</tbody>
</table>
<p>Para ver ejemplos de creación de esquemas, consulta <a href="/docs/es/create-structarray-field.md">«Crear un campo StructArray</a>».</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Tipos de datos admitidos para los subcampos<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Los subcampos de StructArray se asignan a un almacenamiento físico de tipo matriz. La siguiente tabla enumera los tipos físicos admitidos y no admitidos.</p>
<table>
<thead>
<tr><th>Tipo físico del subcampo de Struct</th><th>Compatibilidad</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BOOL</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.INT8</code> », « <code translate="no">DataType.INT16</code> », « <code translate="no">DataType.INT32</code> » o « <code translate="no">DataType.INT64</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como <code translate="no">DataType.FLOAT</code> o <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como <code translate="no">DataType.VARCHAR</code> y establezca <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.FLOAT_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.FLOAT16_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BFLOAT16_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.INT8_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BINARY_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>No compatible</td><td>Los subcampos de vectores dispersos no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Utilice « <code translate="no">VARCHAR</code> », no « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos JSON no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos de geometría y las funciones SIG no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos de texto no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos «timestamptz» y las expresiones específicas de tiempo no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> o <code translate="no">ArrayOfStruct</code></td><td>No compatible</td><td>Los campos StructArray no admiten subcampos anidados de tipo matriz, matriz vectorial, Struct o matriz de Struct.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Límites de esquemas nulos y dinámicos<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>El comportamiento de los StructArray nulos y la adición dinámica de campos StructArray dependen de la versión.</p>
<table>
<thead>
<tr><th>Capacidad</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray nulo</td><td>Solo se admite en versiones que incluyan soporte para StructArray nulo y matrices vectoriales nulas.</td></tr>
<tr><td>Valor nulo en Python</td><td>Utiliza ` <code translate="no">None</code> ` para insertar un valor `StructArray` nulo en Python. No utilices ` <code translate="no">Null</code> ` ni ` <code translate="no">null</code>`.</td></tr>
<tr><td>Ámbito del valor nulo</td><td>El valor nulo se aplica a todo el campo StructArray. Por ejemplo, <code translate="no">chunks=None</code> solo es válido cuando <code translate="no">chunks</code> es nulo.</td></tr>
<tr><td>Valor de StructArray parcialmente nulo</td><td>Cuando un campo StructArray contiene un valor de matriz válido, no mezcles matrices de subcampos nulos con matrices de subcampos válidos en el mismo valor.</td></tr>
<tr><td>Añadir dinámicamente un campo StructArray</td><td>La adición de un campo StructArray a una colección existente solo es compatible en versiones que incluyan soporte para campos StructArray dinámicos.</td></tr>
<tr><td>Requisito de ser nulo para la adición dinámica</td><td>Un campo StructArray añadido a una colección existente debe ser nulo, ya que las entidades existentes no tienen ningún valor para el nuevo campo.</td></tr>
<tr><td>Entidades existentes tras la adición dinámica</td><td>Las entidades existentes devuelven el valor « <code translate="no">null</code> » para el campo StructArray añadido en todos sus subcampos.</td></tr>
</tbody>
</table>
<p>En Milvus v3.0.x, están disponibles los campos StructArray nulos, las matrices vectoriales nulas y la adición dinámica de campos StructArray.</p>
<p>Para ver ejemplos de inserción con campos StructArray nulos, consulta <a href="/docs/es/insert-data-into-structarray-fields.md">Insertar datos en campos StructArray</a>.</p>
<h2 id="Insert-limits" class="common-anchor-header">Límites de inserción<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>Límite</th><th>Detalles</th></tr>
</thead>
<tbody>
<tr><td>Forma de la carga útil</td><td>Inserte el campo StructArray como una matriz de objetos Struct, como por ejemplo <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nombres de subcampos</td><td>Dentro de cada objeto Struct, utilice nombres de subcampos como <code translate="no">text</code> y <code translate="no">emb</code>, no rutas como <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Alineación con el esquema</td><td>Cada elemento Struct debe coincidir con el esquema de Struct.</td></tr>
<tr><td>Capacidad</td><td>El número de elementos Struct en una entidad no debe superar <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensiones del vector</td><td>Los valores vectoriales deben coincidir con el <code translate="no">dim</code> configurado para sus subcampos vectoriales.</td></tr>
<tr><td>Duplicación en el modo de búsqueda</td><td>Si necesitas tanto la búsqueda en EmbeddingList como la búsqueda a nivel de elemento, escribe los vectores en dos subcampos vectoriales separados.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Límites de índices y métricas<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Un subcampo vectorial StructArray puede indexarse tanto para la búsqueda en EmbeddingList como para la búsqueda a nivel de elemento. Un mismo subcampo vectorial no puede utilizar ambas familias de métricas, ya que cada campo vectorial o subcampo vectorial solo admite un índice.</p>
<table>
<thead>
<tr><th>Modo de búsqueda</th><th>Familia de métricas</th><th>Nivel de resultado</th></tr>
</thead>
<tbody>
<tr><td>Búsqueda en EmbeddingList</td><td><code translate="no">MAX_SIM</code>, métricas « <code translate="no">MAX_SIM_COSINE</code> », « <code translate="no">MAX_SIM_IP</code> », « <code translate="no">MAX_SIM_L2</code> » o métricas binarias « <code translate="no">MAX_SIM_*</code> »</td><td>Resultados a nivel de entidad.</td></tr>
<tr><td>Búsqueda a nivel de elemento</td><td>Métricas vectoriales habituales, como <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> o <code translate="no">JACCARD</code></td><td>Resultados a nivel de elemento que pueden incluir el desplazamiento del elemento coincidente.</td></tr>
</tbody>
</table>
<p>Utilice subcampos vectoriales independientes cuando se requieran ambos modos. Por ejemplo, utilice <code translate="no">chunks[emb_list_vector]</code> para la búsqueda en EmbeddingList y <code translate="no">chunks[emb]</code> para la búsqueda a nivel de elemento.</p>
<p>Los subcampos vectoriales de StructArray cuentan como subcampos vectoriales a la hora de planificar el esquema de la colección. Mantenga el número total de campos vectoriales y subcampos vectoriales dentro de los límites de su versión de destino y nivel de servicio.</p>
<p>Para conocer la matriz de tipos de índice y de métricas compatibles, consulta <a href="/docs/es/index-structarray-fields.md">Campos StructArray de índice</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">Límites de búsqueda<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Comportamiento de la búsqueda</th><th>Compatibilidad y límites</th></tr>
</thead>
<tbody>
<tr><td>Búsqueda básica en EmbeddingList</td><td>Compatible con subcampos vectoriales de StructArray indexados con métric <code translate="no">MAX_SIM*</code>. Devuelve resultados a nivel de entidad.</td></tr>
<tr><td>Búsqueda básica a nivel de elemento</td><td>Compatible con subcampos vectoriales de StructArray indexados con métricas vectoriales regulares. Puede devolver las coordenadas de los elementos coincidentes.</td></tr>
<tr><td>Búsqueda por rango</td><td>Compatible según el modo de búsqueda y la compatibilidad con índices y métricas de la versión de destino. Para conocer el comportamiento del rango de búsqueda híbrida en solicitudes de StructArray a nivel de elemento, consulta tu versión de destino.</td></tr>
<tr><td>Búsqueda por agrupación</td><td>La búsqueda agrupada a nivel de elemento puede devolver posiciones. El comportamiento de la búsqueda híbrida con agrupación para las solicitudes de StructArray a nivel de elemento depende de la versión.</td></tr>
<tr><td>Búsqueda híbrida</td><td>Una solicitud de búsqueda híbrida solo puede incluir solicitudes de subcampos vectoriales de StructArray cuando la versión de destino admita esa combinación de búsqueda. Cada solicitud sigue la familia de métricas del subcampo vectorial indexado.</td></tr>
<tr><td>Salida de desplazamiento</td><td>El desplazamiento está disponible para los resultados de búsqueda a nivel de elemento. La búsqueda en EmbeddingList devuelve resultados a nivel de entidad y no utiliza los desplazamientos de elementos como unidad principal de resultado.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Límites de filtros y operadores<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>El filtrado escalar de StructArray se gestiona mediante operadores de StructArray, como « <code translate="no">element_filter</code> » y la familia « <code translate="no">MATCH_*</code> ». La matriz detallada de compatibilidad con predicados se encuentra en <a href="/docs/es/struct-array-operators.md">«Operadores de StructArray</a>».</p>
<p>A grandes rasgos:</p>
<ul>
<li><p>Utilice « <code translate="no">$[subfield]</code> » únicamente dentro de operadores de StructArray.</p></li>
<li><p>Utilice subcampos escalares para los predicados escalares.</p></li>
<li><p>No utilices subcampos vectoriales como entradas de predicados escalares de « <code translate="no">$[...]</code> ».</p></li>
<li><p>La sintaxis de ruta JSON, las funciones JSON, las funciones de contenedores de matrices, las funciones de coincidencia de texto, las funciones de geometría/SIG y las expresiones Timestamptz no son compatibles con los predicados a nivel de elemento de StructArray.</p></li>
<li><p>Es preferible utilizar comparaciones booleanas explícitas, como « <code translate="no">$[has_code] == true</code> », en lugar de expresiones booleanas simples.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">Páginas relacionadas<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>Para crear un campo StructArray, consulta <a href="/docs/es/create-structarray-field.md">«Crear un campo StructArray</a>».</p></li>
<li><p>Para insertar datos, consulte <a href="/docs/es/insert-data-into-structarray-fields.md">«Insertar datos en campos StructArray</a>».</p></li>
<li><p>Para crear índices vectoriales y escalares, consulta <a href="/docs/es/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para repasar la sintaxis de los filtros de StructArray, consulta <a href="/docs/es/struct-array-operators.md">«Operadores de StructArray</a>».</p></li>
</ol>
