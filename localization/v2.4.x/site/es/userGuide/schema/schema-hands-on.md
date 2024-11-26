---
id: schema-hands-on.md
title: Diseño práctico de esquemas
summary: >-
  Milvus permite definir el modelo de datos a través de un esquema de colección.
  Una colección organiza datos no estructurados como texto e imágenes, junto con
  sus representaciones vectoriales, incluidos vectores densos y dispersos en
  varias precisiones utilizadas para la búsqueda semántica. Además, Milvus
  admite el almacenamiento y filtrado de tipos de datos no vectoriales
  denominados "Scalar". Los tipos escalares incluyen BOOL, INT8/16/32/64,
  FLOAT/DOUBLE, VARCHAR, JSON y Array.
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">Diseño práctico de esquemas<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>Los sistemas de recuperación de información (IR), también conocidos como búsqueda, son esenciales para diversas aplicaciones de IA, como la generación aumentada de recuperación (RAG), la búsqueda de imágenes y la recomendación de productos. El primer paso en el desarrollo de un sistema de RI es diseñar el modelo de datos, lo que implica analizar los requisitos empresariales, determinar cómo organizar la información e indexar los datos para hacerlos semánticamente buscables.</p>
<p>Milvus permite definir el modelo de datos mediante un esquema de colección. Una colección organiza datos no estructurados como texto e imágenes, junto con sus representaciones vectoriales, incluidos vectores densos y dispersos en varias precisiones utilizadas para la búsqueda semántica. Además, Milvus admite el almacenamiento y filtrado de tipos de datos no vectoriales denominados &quot;Scalar&quot;. Los tipos escalares incluyen BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON y Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>Ejemplo de esquema de datos diseñado para la búsqueda de artículos de noticias</span> </span></p>
<p>El diseño del modelo de datos de un sistema de búsqueda implica analizar las necesidades del negocio y abstraer la información en un modelo de datos expresado en un esquema. Por ejemplo, para buscar un fragmento de texto, debe &quot;indexarse&quot; convirtiendo la cadena literal en un vector mediante &quot;incrustación&quot;, lo que permite la búsqueda vectorial. Más allá de este requisito básico, puede ser necesario almacenar otras propiedades, como la fecha de publicación y el autor. Estos metadatos permiten refinar las búsquedas semánticas mediante filtrado, devolviendo sólo los textos publicados después de una fecha concreta o por un autor determinado. También puede ser necesario recuperarlos junto con el texto principal, para mostrar el resultado de la búsqueda en la aplicación. Para organizar estos fragmentos de texto, debe asignarse a cada uno un identificador único, expresado como un número entero o una cadena. Estos elementos son esenciales para lograr una lógica de búsqueda sofisticada.</p>
<p>Un esquema bien diseñado es importante, ya que abstrae el modelo de datos y decide si los objetivos empresariales pueden alcanzarse mediante la búsqueda. Además, dado que cada fila de datos insertada en la colección debe seguir el esquema, éste ayuda en gran medida a mantener la coherencia de los datos y la calidad a largo plazo. Desde un punto de vista técnico, un esquema bien definido conduce a un almacenamiento de datos de columnas bien organizado y a una estructura de índices más limpia, lo que puede aumentar el rendimiento de las búsquedas.</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">Un ejemplo: Búsqueda de noticias<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Supongamos que queremos crear una búsqueda para un sitio web de noticias y tenemos un corpus de noticias con texto, imágenes en miniatura y otros metadatos. En primer lugar, tenemos que analizar cómo queremos utilizar los datos para satisfacer las necesidades de búsqueda de la empresa. Imaginemos que el requisito es recuperar las noticias basándonos en la imagen en miniatura y el resumen del contenido, y tomando los metadatos, como la información sobre el autor y la hora de publicación, como criterios para filtrar el resultado de la búsqueda. Estos requisitos pueden desglosarse en.</p>
<ul>
<li><p>Para buscar imágenes a través del texto, podemos incrustar imágenes en vectores mediante un modelo de incrustación multimodal capaz de mapear datos de texto e imágenes en el mismo espacio latente.</p></li>
<li><p>El texto resumido de un artículo se incrusta en vectores mediante un modelo de incrustación de texto.</p></li>
<li><p>Para filtrar en función de la hora de publicación, las fechas se almacenan como un campo escalar y se necesita un índice para el campo escalar para un filtrado eficaz. Otras estructuras de datos más complejas, como JSON, se pueden almacenar en un escalar y realizar una búsqueda filtrada en su contenido (la indexación de JSON es una función de próxima aparición).</p></li>
<li><p>Para recuperar los bytes de la miniatura de la imagen y mostrarla en la página de resultados de la búsqueda, también se almacena la url de la imagen. Lo mismo ocurre con el texto y el título del resumen. (Alternativamente, podríamos almacenar el texto sin procesar y los datos del archivo de imagen como campos escalares si fuera necesario).</p></li>
<li><p>Para mejorar el resultado de la búsqueda en el texto resumido, diseñamos un método de búsqueda híbrido. Para una ruta de recuperación, utilizamos un modelo de incrustación regular para generar un vector denso a partir del texto, como el de OpenAI <code translate="no">text-embedding-3-large</code> o el de código abierto <code translate="no">bge-large-en-v1.5</code>. Estos modelos representan bien la semántica general del texto. La otra vía es utilizar modelos de incrustación dispersos, como BM25 o SPLADE, para generar un vector disperso, parecido a la búsqueda de texto completo, que es bueno para captar los detalles y los conceptos individuales del texto. Milvus permite utilizar ambos en la misma recopilación de datos gracias a su función multivectorial. La búsqueda en múltiples vectores puede realizarse en una única operación <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Por último, también necesitamos un campo ID para identificar cada página de noticias individual, formalmente denominada "entidad" en la terminología de Milvus. Este campo se utiliza como clave primaria (o "pk" para abreviar).</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">Nombre del campo</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (clave primaria)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">título</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">author_info</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">publicar_ts</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">URL_imagen</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">vector_imagen</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">resumen</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">resumen_vector_denso</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">resumen_vector_denso</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">Tipo</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">FLOAT_VECTOR</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">VECTOR_FLOAT_ESPARCIDO</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">Índice de necesidad</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (Soporte próximamente)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">Cómo implementar el esquema de ejemplo<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">Crear esquema<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>En primer lugar, creamos una instancia de cliente Milvus, que puede utilizarse para conectarse al servidor Milvus y gestionar colecciones y datos. </p>
<p>Para crear un esquema, utilizamos <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> para crear un objeto de esquema y <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> para añadir campos al esquema.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>Es posible que observe el argumento <code translate="no">uri</code> en <code translate="no">MilvusClient</code>, que se utiliza para conectarse al servidor Milvus. Puede configurar los argumentos de la siguiente manera.</p>
<ul>
<li><p>Si sólo necesita una base de datos vectorial local para datos a pequeña escala o prototipos, establecer la uri como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</p></li>
<li><p>Si tiene una gran escala de datos, digamos más de un millón de vectores, puede configurar un servidor Milvus más eficiente en <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. En esta configuración, por favor utilice la dirección del servidor y el puerto como su uri, por ejemplo<code translate="no">http://localhost:19530</code>. Si habilita la función de autenticación en Milvus, utilice "&lt;su_nombre_de_usuario&gt;:&lt;su_contraseña&gt;" como token, de lo contrario no configure el token.</p></li>
<li><p>Si utiliza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste los <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint y a la clave API</a> en Zilliz Cloud.</p></li>
</ul>
<p>En cuanto a <code translate="no">auto_id</code> en <code translate="no">MilvusClient.create_schema</code>, AutoID es un atributo del campo primario que determina si se habilita el autoincremento para el campo primario.  Dado que establecemos el campo<code translate="no">article_id</code> como clave primaria y queremos añadir el id del artículo manualmente, establecemos <code translate="no">auto_id</code> False para deshabilitar esta característica.</p>
<p>Después de añadir todos los campos al objeto de esquema, nuestro objeto de esquema coincide con las entradas de la tabla anterior.</p>
<h2 id="Define-Index​" class="common-anchor-header">Definir índice<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Tras definir el esquema con varios campos, incluidos los metadatos y los campos vectoriales para los datos de imagen y resumen, el siguiente paso consiste en preparar los parámetros del índice. La indexación es crucial para optimizar la búsqueda y recuperación de vectores, garantizando un rendimiento eficiente de las consultas. En la siguiente sección, definiremos los parámetros de índice para los campos vectoriales y escalares especificados en la colección.</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Una vez configurados y aplicados los parámetros de indexación, Milvus está optimizado para manejar consultas complejas sobre datos vectoriales y escalares. Esta indexación mejora el rendimiento y la precisión de las búsquedas de similitud dentro de la colección, permitiendo una recuperación eficiente de artículos basados en vectores de imágenes y vectores de resumen. Al aprovechar el <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a> para vectores densos, el <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a> para vectores dispersos y el <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a> para escalares, Milvus puede identificar y devolver rápidamente los resultados más relevantes, mejorando significativamente la experiencia general del usuario y la eficacia del proceso de recuperación de datos.</p>
<p>Existen muchos tipos de índices y métricas. Para más información sobre ellos, puede consultar <a href="https://milvus.io/docs/overview.md#Index-types">Milvus tipo de índice</a> y <a href="https://milvus.io/docs/glossary.md#Metric-type">Milvus tipo de métrica</a>.</p>
<h2 id="Create-Collection​" class="common-anchor-header">Crear colección<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Con el esquema y los índices definidos, creamos una "colección" con estos parámetros. La colección para Milvus es como una tabla para una base de datos relacional.</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Podemos verificar que la colección se ha creado correctamente describiendo la colección.</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">Otras consideraciones<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">Carga del índice<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Al crear una colección en Milvus, puede elegir cargar el índice inmediatamente o aplazarlo hasta después de la ingesta masiva de algunos datos. Normalmente, no necesita hacer una elección explícita al respecto, ya que los ejemplos anteriores muestran que el índice se construye automáticamente para cualquier dato ingestado justo después de la creación de la colección. Esto permite la búsqueda inmediata de los datos ingestados. Sin embargo, si tiene una gran inserción masiva después de la creación de la colección y no necesita buscar ningún dato hasta cierto punto, puede aplazar la creación del índice omitiendo index_params en la creación de la colección y crear el índice llamando explícitamente a load después de la ingesta de todos los datos. Este método es más eficiente para construir el índice en una colección grande, pero no se pueden realizar búsquedas hasta que se llame a load().</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">Cómo definir el modelo de datos para múltiples inquilinos<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>El concepto de múltiples inquilinos es comúnmente usado en escenarios donde una sola aplicación de software o servicio necesita servir a múltiples usuarios u organizaciones independientes, cada uno con su propio ambiente aislado. Esto se ve con frecuencia en la computación en nube, las aplicaciones SaaS (software como servicio) y los sistemas de bases de datos. Por ejemplo, un servicio de almacenamiento en la nube puede utilizar la multitenencia para permitir que distintas empresas almacenen y gestionen sus datos por separado mientras comparten la misma infraestructura subyacente. Este enfoque maximiza la utilización de los recursos y la eficiencia, al tiempo que garantiza la seguridad y la privacidad de los datos de cada inquilino.</p>
<p>La forma más sencilla de diferenciar a los inquilinos es aislar sus datos y recursos entre sí. Cada inquilino tiene acceso exclusivo a recursos específicos o comparte recursos con otros para gestionar entidades Milvus como bases de datos, colecciones y particiones. Existen métodos específicos alineados con estas entidades para implementar Milvus multi-tenancy. Puede consultar la <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">página multi-tenancy</a> de Milvus para más información.</p>
