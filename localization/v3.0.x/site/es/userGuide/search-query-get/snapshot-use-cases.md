---
id: snapshot-use-cases.md
title: Casos de uso de instantáneasCompatible with Milvus 3.0.x
summary: En esta guía encontrarás ejemplos habituales de uso de instantáneas.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Casos de uso de instantáneas<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta guía encontrarás casos de uso habituales de las instantáneas.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Copia de seguridad y restauración de datos<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Las instantáneas son imágenes rápidas de los datos en un momento determinado, adecuadas para reversiones rápidas o pruebas (de días a semanas). Por su parte, las copias de seguridad son copias independientes y completas que se almacenan por separado para la recuperación ante desastres a largo plazo (de semanas a años) y para una mayor protección frente a un fallo total del almacenamiento.</p>
<p>La siguiente tabla compara las instantáneas y las copias de seguridad.</p>
<table>
   <tr>
     <th></th>
     <th><p>Copia de seguridad</p></th>
     <th><p>Instantánea</p></th>
   </tr>
   <tr>
     <td><p>Creación de la copia de seguridad</p></td>
     <td><p>Copia todos los archivos de datos (proceso que requiere mucho tiempo)</p></td>
     <td><p>Solo crea metadatos (en milisegundos)</p></td>
   </tr>
   <tr>
     <td><p>Restauración</p></td>
     <td><p>Importa los datos y reconstruye los índices</p></td>
     <td><p>Solo copia los archivos de datos e índices existentes</p></td>
   </tr>
   <tr>
     <td><p>Rendimiento</p></td>
     <td><p>Lento y con gran consumo de recursos</p></td>
     <td><p>Rápido y ligero (en segundos o minutos)</p></td>
   </tr>
   <tr>
     <td><p>Impacto en el sistema</p></td>
     <td><p>Alto uso de E/S y de la CPU</p></td>
     <td><p>Impacto mínimo</p></td>
   </tr>
</table>
<p>La creación de una instantánea suele tardar milisegundos, y su restauración, entre segundos y minutos, dependiendo del volumen de datos.</p>
<p>Para obtener más detalles sobre los límites y restricciones de las instantáneas, así como su impacto en el sistema, consulta <a href="/docs/es/snapshots.md">Instantáneas</a>.</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">Procesamiento de datos con colecciones externas<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Las instantáneas pueden proporcionar fuentes estables y puntuales para cargas de trabajo analíticas o de validación. Para las instantáneas de Milvus, utiliza el formato de colección externa « <code translate="no">milvus-table</code> » en lugar de leer los archivos de instantánea directamente como entrada genérica de Spark. Una instantánea de Milvus almacena metadatos de la colección, manifiestos de segmentos, registros de eliminación y estadísticas de claves primarias, por lo que Milvus necesita el JSON de metadatos de la instantánea y el lector <code translate="no">milvus-table</code> para conservar el esquema correcto y la semántica de eliminación.</p>
<p>Este flujo de trabajo crea una colección externa consultable a partir de los datos de la instantánea. Los datos de la columna principal siguen referenciándose desde la fuente de la instantánea, y la actualización asigna los manifiestos de StorageV3 de origen a los segmentos externos de destino.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">Paso 1: Obtener la ruta de los metadatos de la instantánea<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Crea o selecciona una instantánea de una colección normal de Milvus y, a continuación, descríbela para obtener su ubicación en el almacenamiento de objetos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">Paso 2: Crear y actualizar una colección externa de « <code translate="no">milvus-table</code> »<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Crea una colección externa cuyo esquema coincida con el de la colección de origen de la instantánea. Establece « <code translate="no">external_spec.format</code> » en « <code translate="no">&quot;milvus-table&quot;</code> » y configura el campo « <code translate="no">external_field</code> » de cada campo de datos de destino con el nombre del campo de origen correspondiente.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Una vez completada la actualización, puede crear índices, cargar la colección externa y ejecutar operaciones de búsqueda o consulta en la vista respaldada por la instantánea.</p>
