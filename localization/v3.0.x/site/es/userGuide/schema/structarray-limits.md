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
    </button></h2><p>Los principales límites de StructArray son:</p>
<table>
<thead>
<tr><th>Área</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Forma del esquema</td><td>Una Struct solo se puede utilizar como tipo de elemento de un campo Array. Struct no es compatible como campo de colección de nivel superior.</td></tr>
<tr><td>Esquema de subcampos</td><td>Todos los elementos Struct de un mismo campo StructArray comparten un esquema Struct predefinido.</td></tr>
<tr><td>Subcampos anidados</td><td>A partir de Milvus 3.0.6, una «Struct» puede contener subcampos escalares de tipo « <code translate="no">ARRAY</code> » con un nivel de anidamiento. Los subcampos anidados de tipo « <code translate="no">Struct</code> », « <code translate="no">ArrayOfStruct</code> » y «JSON» no son compatibles en ninguna versión.</td></tr>
<tr><td>La capacidad</td><td><code translate="no">max_capacity</code> es obligatorio y limita el número de elementos «Struct» que una entidad puede almacenar en el campo «StructArray».</td></tr>
<tr><td>Cambios en los subcampos</td><td>A partir de Milvus 3.0.6, se puede añadir un subcampo de tipo «elemento nulo» a un campo StructArray existente o eliminar un subcampo del mismo. Las versiones anteriores requieren eliminar y volver a añadir todo el campo StructArray.</td></tr>
<tr><td>Ruta del subcampo</td><td>Utiliza rutas del tipo <code translate="no">structArray[subfield]</code>, como <code translate="no">chunks[emb]</code>, para índices, objetivos de búsqueda, campos de salida y filtros. No utilices <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Insertar forma</td><td>Inserte un campo StructArray como una matriz de objetos. No utilice la sintaxis de ruta dentro de las cargas útiles de inserción.</td></tr>
<tr><td>Índices vectoriales</td><td>Un campo vectorial o un subcampo vectorial solo admite un índice. Utiliza subcampos vectoriales independientes para la búsqueda en EmbeddingList y la búsqueda a nivel de elemento.</td></tr>
<tr><td>Funciones</td><td>Las funciones de campo no son compatibles con los campos o subcampos dentro de un campo StructArray.</td></tr>
<tr><td>Campos nulos</td><td>Los campos StructArray nulos están sujetos a restricciones de versión. El valor nulo a nivel de fila se aplica a todo el campo StructArray. A partir de Milvus 3.0.6, un subcampo puede permitir además un valor nulo en un elemento Struct individual: <code translate="no">nullable=True</code> en un subcampo escalar o vectorial, <code translate="no">element_nullable=True</code> en un subcampo de matriz. Un elemento Struct en sí mismo no puede ser nulo.</td></tr>
<tr><td>Añadir un campo dinámico</td><td>La adición de un campo StructArray a una colección existente depende de la versión y requiere que el campo añadido sea nulo.</td></tr>
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
    </button></h2><p>Los esquemas de StructArray tienen los siguientes límites:</p>
<table>
<thead>
<tr><th>Límite</th><th>Detalles</th></tr>
</thead>
<tbody>
<tr><td>«Struct» no es un tipo de campo de nivel superior.</td><td>Crea un campo StructArray como « <code translate="no">datatype=DataType.ARRAY</code> » con « <code translate="no">element_type=DataType.STRUCT</code> » y « <code translate="no">struct_schema</code> ».</td></tr>
<tr><td>Todos los elementos comparten un mismo esquema.</td><td>Cada elemento «Struct» de un campo «StructArray» sigue la misma lista de subcampos y los mismos tipos de datos de los subcampos.</td></tr>
<tr><td><code translate="no">max_capacity</code> es obligatorio.</td><td>El número de elementos Struct en una entidad no debe superar el número de subcampos ( <code translate="no">max_capacity</code> ) configurado para el campo StructArray.</td></tr>
<tr><td>Los subcampos escalares de « <code translate="no">ARRAY</code> » tienen « <code translate="no">max_capacity</code> » por subcampo.</td><td>Un subcampo escalar de « <code translate="no">ARRAY</code> » declara una « <code translate="no">max_capacity</code> » para su matriz interna, y Milvus rechaza cualquier elemento Struct cuya matriz interna supere la capacidad declarada de ese subcampo. No es necesario que los valores coincidan entre los distintos subcampos. El valor debe ser mayor que 0 y no debe superar « <code translate="no">proxy.maxArrayCapacity</code> », cuyo valor por defecto es 4096.</td></tr>
<tr><td>Los subcampos pueden evolucionar en Milvus 3.0.6 y versiones posteriores.</td><td>Añade un subcampo con elementos nulos o elimina un subcampo por su ruta, como <code translate="no">chunks[lang]</code>. No se puede eliminar el último subcampo de un campo StructArray, el último campo vectorial de la colección ni un subcampo utilizado por una función. En versiones anteriores, elimina el campo StructArray y añádelo de nuevo con el esquema actualizado.</td></tr>
<tr><td>No se admiten estructuras anidadas.</td><td>Una Struct no puede contener subcampos anidados de tipo « <code translate="no">Struct</code> », « <code translate="no">ArrayOfStruct</code> » o JSON. A partir de Milvus 3.0.6, una Struct puede contener subcampos escalares de tipo « <code translate="no">ARRAY</code> » con un nivel de anidamiento. Un subcampo de tipo « <code translate="no">ARRAY</code> » no puede contener vectores.</td></tr>
<tr><td>No se admiten funciones dentro de StructArray.</td><td>No definas funciones de campo para los campos de StructArray ni para sus subcampos.</td></tr>
<tr><td>Las propiedades de campo están limitadas en los campos de StructArray.</td><td>A partir de Milvus 3.0.6, la propiedad « <code translate="no">alter_collection_field()</code> » en un campo de StructArray o en una ruta de subcampo solo admite « <code translate="no">mmap.enabled</code> », « <code translate="no">field.description</code> » y « <code translate="no">warmup</code> ». Se rechazan otras propiedades, como « <code translate="no">max_capacity</code> » y « <code translate="no">max_length</code> ».</td></tr>
<tr><td>El análisis de texto no es compatible con los subcampos.</td><td>Se rechaza la configuración de « <code translate="no">enable_match</code> » o « <code translate="no">enable_analyzer</code> » en un subcampo de tipo Struct. Los índices de texto solo se crean para los campos de nivel superior.</td></tr>
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
    </button></h2><p>Los subcampos de StructArray se asignan a un almacenamiento físico de tipo matriz. En la siguiente tabla se enumeran los tipos físicos compatibles y no compatibles:</p>
<table>
<thead>
<tr><th>Tipo físico del subcampo Struct</th><th>Compatibilidad</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BOOL</code> ».</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.INT8</code> », « <code translate="no">DataType.INT16</code> », « <code translate="no">DataType.INT32</code> » o « <code translate="no">DataType.INT64</code> ».</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Compatible</td><td>Defina el subcampo como <code translate="no">DataType.FLOAT</code> o <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.VARCHAR</code> » y establezca « <code translate="no">max_length</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.FLOAT_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.FLOAT16_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BFLOAT16_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.INT8_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BINARY_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>No compatible</td><td>Los subcampos de vectores dispersos no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>No compatible</td><td>Utilice « <code translate="no">VARCHAR</code> », no « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>No compatible</td><td>Los subcampos JSON no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>No compatible</td><td>Los subcampos de geometría y las funciones SIG no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>No compatible</td><td>Los subcampos de texto no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>No compatible</td><td>Los subcampos «timestamptz» y las expresiones específicas de tiempo no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Compatible con Milvus 3.0.6 y versiones posteriores</td><td>Define el subcampo como « <code translate="no">DataType.ARRAY</code> » con un escalar « <code translate="no">element_type</code> » y un « <code translate="no">max_capacity</code> » para la matriz interna. Cada elemento «Struct» contiene entonces una matriz interna. Establece « <code translate="no">nullable=True</code> » en el subcampo para permitir una matriz interna nula y « <code translate="no">element_nullable=True</code> » para permitir valores nulos en su interior.</td></tr>
<tr><td><code translate="no">Array</code> de <code translate="no">Array</code> de <code translate="no">Array</code>, <code translate="no">Array</code> de vectores, <code translate="no">Struct</code>, o <code translate="no">ArrayOfStruct</code></td><td>No compatible</td><td>El anidamiento de matrices dentro de una estructura está limitado a un nivel; la matriz interna no puede contener vectores, y no se admiten subcampos anidados de tipo «estructura» o «matriz de estructuras».</td></tr>
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
    </button></h2><p>La siguiente tabla describe el comportamiento de los StructArray nulos y la adición dinámica de campos a los StructArray, con sujeción a la declaración de disponibilidad que figura a continuación:</p>
<table>
<thead>
<tr><th>Capacidad</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray nulo</td><td>Sujeto a la declaración de disponibilidad que figura a continuación, establezca « <code translate="no">nullable=True</code> » en el StructArray padre; no configure los subcampos de Struct como nulos de forma independiente.</td></tr>
<tr><td>Valor NULL en Python</td><td>Utilice ` <code translate="no">None</code> ` para insertar un valor `StructArray` nulo en Python. No utilice ` <code translate="no">Null</code> ` ni ` <code translate="no">null</code>`.</td></tr>
<tr><td>Ámbito de «null»</td><td>El valor NULL se aplica a todo el campo StructArray. Por ejemplo, <code translate="no">chunks=None</code> solo es válido cuando <code translate="no">chunks</code> es nulo.</td></tr>
<tr><td>Valor de StructArray parcialmente nulo</td><td>Cuando un campo StructArray contiene un valor de matriz válido, no mezcles matrices de subcampos nulos con matrices de subcampos válidos en el mismo valor.</td></tr>
<tr><td>Nulo a nivel de elemento</td><td>Compatible con Milvus 3.0.6 y versiones posteriores. Un subcampo escalar, vectorial o de tipo « <code translate="no">ARRAY</code> » puede permitir un valor nulo en elementos individuales de la estructura: « <code translate="no">nullable=True</code> » en un subcampo escalar o vectorial, « <code translate="no">element_nullable=True</code> » en un subcampo de tipo « <code translate="no">ARRAY</code> ». La configuración de « <code translate="no">nullable</code> » a nivel de fila sigue procediendo del padre de StructArray; establecer « <code translate="no">nullable=True</code> » en un subcampo habilita el valor nulo a nivel de elemento, no a nivel de fila.</td></tr>
<tr><td>Elemento Struct nulo</td><td>Un elemento de Struct en sí mismo no puede ser nulo, como por ejemplo <code translate="no">[null, {...}]</code>. En su lugar, establece los valores de los subcampos del elemento en nulo.</td></tr>
<tr><td>Subcampos omitidos</td><td>A partir de Milvus 3.0.6, se puede omitir un subcampo que admita valores nulos a nivel de elemento en un elemento Struct, y Milvus almacena un valor nulo para él. Un subcampo que no admita valores nulos a nivel de elemento debe estar presente en todos los elementos Struct. En versiones anteriores, cada elemento Struct debía proporcionar todos los subcampos.</td></tr>
<tr><td>Añadir dinámicamente un campo StructArray</td><td>Sujeto a la declaración de disponibilidad que figura a continuación.</td></tr>
<tr><td>Requisito de valor nulo para la adición dinámica</td><td>Un campo StructArray añadido a una colección existente debe ser nulo, ya que las entidades existentes no tienen ningún valor para el nuevo campo.</td></tr>
<tr><td>Entidades existentes tras la adición dinámica</td><td>Las entidades existentes devuelven « <code translate="no">null</code> » para el campo StructArray añadido.</td></tr>
<tr><td>Subcampo de la adición dinámica</td><td>Compatible con Milvus 3.0.6 y versiones posteriores. Un subcampo añadido debe crearse con ` <code translate="no">nullable=True</code>`; además, un subcampo ` <code translate="no">ARRAY</code> ` añadido admite ` <code translate="no">element_nullable=True</code> ` para los valores nulos dentro de la matriz interna. Las entidades existentes devuelven `null` para el nuevo subcampo en cada uno de sus elementos `Struct`, y las entidades cuyo campo `StructArray` sea `null` permanecen en `null`.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 y versiones posteriores admiten campos StructArray nulos, matrices vectoriales nulas y la adición dinámica de campos StructArray tanto en implementaciones independientes como distribuidas. Las versiones anteriores de Milvus no admiten estas capacidades.</p>
<p>Milvus 3.0.6 y versiones posteriores admiten además valores nulos a nivel de elemento, subcampos « <code translate="no">ARRAY</code> » escalares y la adición o eliminación de subcampos de un campo «StructArray» existente. Estas capacidades requieren Storage V2 y no están disponibles en colecciones externas.</p>
<p>En Zilliz Cloud, estas capacidades están disponibles en los clústeres bajo demanda que ejecutan Milvus 3.0.0 o versiones posteriores. Los clústeres de servicio no las admiten.</p>
<p>Para ver ejemplos de inserción con campos StructArray que admiten valores nulos, consulta <a href="/docs/es/insert-data-into-structarray-fields.md">Insertar datos en campos StructArray</a>.</p>
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
    </button></h2><p>Las cargas útiles de inserción de StructArray tienen los siguientes límites:</p>
<table>
<thead>
<tr><th>Límite</th><th>Detalles</th></tr>
</thead>
<tbody>
<tr><td>Forma de la carga útil</td><td>Inserta el campo StructArray como una matriz de objetos Struct, como por ejemplo <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nombres de subcampos</td><td>Dentro de cada objeto Struct, utilice nombres de subcampos como <code translate="no">text</code> y <code translate="no">emb</code>, no rutas como <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Alineación con el esquema</td><td>Cada elemento Struct debe coincidir con el esquema de Struct. A partir de Milvus 3.0.6, un subcampo de tipo «element-nullable» puede omitirse o establecerse como <code translate="no">null</code> en un elemento Struct.</td></tr>
<tr><td>Capacidad</td><td>El número de elementos «Struct» en una entidad no debe superar <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensiones del vector</td><td>Los valores de los vectores deben coincidir con el número de elementos ( <code translate="no">dim</code> ) configurado para sus subcampos vectoriales.</td></tr>
<tr><td>Duplicación en el modo de búsqueda</td><td>Si necesitas tanto la búsqueda en EmbeddingList como la búsqueda a nivel de elemento, escribe los vectores en dos subcampos vectoriales separados.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Límites de índice y métrica<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Un subcampo vectorial StructArray puede indexarse tanto para la búsqueda en EmbeddingList como para la búsqueda a nivel de elemento. Un mismo subcampo vectorial no puede utilizar ambas familias métricas, ya que cada campo vectorial o subcampo vectorial solo admite un índice. Los modos de búsqueda utilizan las siguientes familias métricas:</p>
<table>
<thead>
<tr><th>Modo de búsqueda</th><th>Familia de métricas</th><th>Nivel de resultado</th></tr>
</thead>
<tbody>
<tr><td>Búsqueda en EmbeddingList</td><td><code translate="no">MAX_SIM</code>, métricas « <code translate="no">MAX_SIM_COSINE</code> », « <code translate="no">MAX_SIM_IP</code> », « <code translate="no">MAX_SIM_L2</code> » o métricas binarias « <code translate="no">MAX_SIM_*</code> »</td><td>Resultados a nivel de entidad.</td></tr>
<tr><td>Búsqueda a nivel de elemento</td><td>Métricas vectoriales habituales, como <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> o <code translate="no">JACCARD</code></td><td>Resultados a nivel de elemento que pueden incluir el desplazamiento del elemento coincidente.</td></tr>
</tbody>
</table>
<p>Utiliza subcampos vectoriales independientes cuando se requieran ambos modos. Por ejemplo, utiliza <code translate="no">chunks[emb_list_vector]</code> para la búsqueda en EmbeddingList y <code translate="no">chunks[emb]</code> para la búsqueda a nivel de elemento.</p>
<p>Los subcampos vectoriales de StructArray cuentan como campos vectoriales a efectos del límite a nivel de colección <code translate="no">proxy.maxVectorFieldNum</code>, cuyo valor predeterminado es 10. Un campo StructArray cuyos subcampos vectoriales sean los únicos campos vectoriales de la colección es válido, y la eliminación de dicho campo se rechaza cuando ello dejaría a la colección sin ningún campo vectorial. Mantenga el número total de campos vectoriales y subcampos vectoriales dentro de los límites de su versión de destino y nivel de servicio.</p>
<p>A partir de Milvus 3.0.6, un subcampo vectorial con elementos nulos solo admite la búsqueda a nivel de elemento con métricas vectoriales normales. Las métricas <code translate="no">MAX_SIM*</code>, los índices EmbeddingList y la búsqueda EmbeddingList se rechazan en subcampos vectoriales con elementos nulos, y <code translate="no">AUTOINDEX</code> no selecciona una métrica <code translate="no">MAX_SIM*</code> para ellos. Los vectores nulos no participan en la búsqueda. Los índices escalares no son compatibles con subcampos con elementos nulos ni con subcampos escalares de tipo « <code translate="no">ARRAY</code> ».</p>
<p>Para conocer los tipos de índice y métrica compatibles, consulte <a href="/docs/es/index-structarray-fields.md">«Campos de StructArray de índice</a>».</p>
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
    </button></h2><p>El comportamiento de búsqueda de StructArray tiene las siguientes limitaciones:</p>
<table>
<thead>
<tr><th>Comportamiento de la búsqueda</th><th>Compatibilidad y límites</th></tr>
</thead>
<tbody>
<tr><td>Búsqueda básica en EmbeddingList</td><td>Compatible con subcampos vectoriales de StructArray indexados con métricas de « <code translate="no">MAX_SIM*</code> ». Devuelve resultados a nivel de entidad.</td></tr>
<tr><td>Búsqueda básica a nivel de elemento</td><td>Compatible con subcampos vectoriales de StructArray indexados con métricas vectoriales regulares. Puede devolver las coordenadas de los elementos coincidentes.</td></tr>
<tr><td>Búsqueda por rango</td><td>Compatible según el modo de búsqueda y la compatibilidad con índices y métricas de la versión de destino. Para conocer el comportamiento del rango de búsqueda híbrida en solicitudes de StructArray a nivel de elemento, consulta tu versión de destino.</td></tr>
<tr><td>Búsqueda por agrupación</td><td>La búsqueda agrupada a nivel de elemento puede devolver posiciones. El comportamiento de la búsqueda híbrida agrupada para solicitudes de StructArray a nivel de elemento depende de la versión.</td></tr>
<tr><td>Búsqueda híbrida</td><td>Una solicitud de búsqueda híbrida solo puede incluir solicitudes de subcampos vectoriales de StructArray cuando la versión de destino admita esa combinación de búsqueda. Cada solicitud sigue la familia de métricas del subcampo vectorial indexado.</td></tr>
<tr><td>Salida de desplazamiento</td><td>El desplazamiento está disponible para los resultados de búsqueda a nivel de elemento. La búsqueda de EmbeddingList devuelve resultados a nivel de entidad y no utiliza los desplazamientos de elementos como unidad principal de resultado.</td></tr>
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
<li><p>Las expresiones de filtro a nivel de fila también pueden hacer referencia directamente a rutas de StructArray: « <code translate="no">chunks[0][section]</code> » para la posición de un elemento, « <code translate="no">array_length(chunks)</code> » para el recuento de elementos, « <code translate="no">array_contains(chunks[section], ...)</code> » para valores de subcampos en distintos elementos y « <code translate="no">chunks is null</code> » en un campo StructArray que admita valores nulos.</p></li>
<li><p>Utiliza subcampos escalares para los predicados escalares.</p></li>
<li><p>No utilices subcampos vectoriales como entradas de predicados escalares de « <code translate="no">$[...]</code> ».</p></li>
</ul>
<ul>
<li>La sintaxis de ruta JSON, las funciones JSON, las funciones de coincidencia de texto, las funciones de geometría/SIG y las expresiones Timestamptz no son compatibles con los predicados a nivel de elemento de StructArray. A partir de Milvus 3.0.6, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code> y <code translate="no">array_length</code> son compatibles con <code translate="no">$[subfield]</code> para subcampos escalares de <code translate="no">ARRAY</code>, y <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> es compatible con todos los tipos de subcampos.</li>
</ul>
<ul>
<li>A partir de Milvus 3.0.6, un valor nulo en un subcampo de un elemento Struct hace que el predicado del elemento sea «desconocido» en lugar de «falso». <code translate="no">element_filter</code> conserva solo los elementos cuyo predicado sea «verdadero», mientras que <code translate="no">MATCH_*</code> cuenta un elemento «desconocido» como una «omisión». Para más detalles, véase <a href="/docs/es/struct-array-operators.md">Operadores de StructArray</a>.</li>
</ul>
<ul>
<li>Es preferible utilizar comparaciones booleanas explícitas, como « <code translate="no">$[has_code] == true</code> », en lugar de expresiones booleanas simples.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Límites de importación y almacenamiento<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>Formatos de archivos de origen</td><td>Los archivos JSON, JSONL, CSV y Parquet pueden contener campos StructArray. Los archivos NumPy contienen un archivo por cada campo de nivel superior y no pueden proporcionar datos StructArray; utiliza archivos JSON, CSV o Parquet para colecciones que tengan un campo StructArray. Para conocer las estructuras de los archivos, consulta <a href="/docs/es/prepare-source-data.md#StructArray-fields-in-source-files">«Preparar datos de origen</a>».</td></tr>
<tr><td>Formato de almacenamiento</td><td><code translate="no">ARRAY</code> Los subcampos con elementos nulos y los subcampos escalares de tipo « <code translate="no">ARRAY</code> » requieren Storage V2. No se puede acceder a Storage V1 para colecciones que utilicen estos subcampos: la creación de la colección y la inserción de datos pueden parecer que se realizan con éxito, pero los datos fallan al vaciarlos, lo cual no es un estado admitido. Storage V3, con la opción « <code translate="no">common.storage.enableGrowingSourceFlush</code> » configurada en « <code translate="no">true</code> », rechaza las solicitudes que utilicen subcampos de elementos nulos o subcampos escalares de tipo « ».</td></tr>
<tr><td>Colecciones externas</td><td>Los subcampos con elementos nulos y los subcampos escalares <code translate="no">ARRAY</code> no son compatibles con las colecciones externas.</td></tr>
<tr><td>Importación de copias de seguridad e instantáneas</td><td>La importación de binlog, como la restauración de una copia de seguridad, y la importación desde una instantánea se rechazan en el caso de colecciones que tengan subcampos con elementos nulos o subcampos escalares <code translate="no">ARRAY</code>.</td></tr>
<tr><td>Retroceso a una versión anterior</td><td>Las colecciones que contengan subcampos con elementos nulos o subcampos escalares de tipo « <code translate="no">ARRAY</code> » no pueden ejecutarse en una versión anterior a Milvus 3.0.6. La reproducción del registro de escritura anticipada (Binlog) en la versión anterior provoca un error grave. Volver a actualizar a Milvus 3.0.6 o posterior permite recuperar los datos.</td></tr>
</tbody>
</table>
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
<li><p>Para insertar datos, consulta <a href="/docs/es/insert-data-into-structarray-fields.md">«Insertar datos en campos StructArray</a>».</p></li>
<li><p>Para crear índices vectoriales y escalares, consulta <a href="/docs/es/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para revisar la sintaxis de los filtros de StructArray, consulta <a href="/docs/es/struct-array-operators.md">«Operadores de StructArray</a>».</p></li>
</ol>
