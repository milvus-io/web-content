---
id: best-practices-for-array-of-structs.md
title: >-
  Diseño de modelos de datos con una serie de estructurasCompatible with Milvus
  2.6.4+
summary: >-
  Las aplicaciones modernas de IA, especialmente en el Internet de las Cosas
  (IoT) y la conducción autónoma, suelen razonar sobre eventos ricos y
  estructurados: una lectura de sensor con su marca de tiempo e incrustación
  vectorial, un registro de diagnóstico con un código de error y un fragmento de
  audio, o un segmento de viaje con ubicación, velocidad y contexto de escena.
  Para ello es necesario que la base de datos admita de forma nativa la ingesta
  y búsqueda de datos anidados.
beta: Milvus 2.6.4+
---
<h1 id="Data-Model-Design-with-an-Array-of-Structs" class="common-anchor-header">Diseño de modelos de datos con una serie de estructuras<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Data-Model-Design-with-an-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>Las aplicaciones modernas de IA, especialmente en el Internet de las Cosas (IoT) y la conducción autónoma, suelen razonar sobre eventos ricos y estructurados: una lectura de sensor con su marca de tiempo e incrustación vectorial, un registro de diagnóstico con un código de error y un fragmento de audio, o un segmento de viaje con ubicación, velocidad y contexto de escena. Para ello es necesario que la base de datos admita de forma nativa la ingesta y búsqueda de datos anidados.</p>
<p>En lugar de pedir al usuario que convierta sus eventos estructurales atómicos en modelos de datos planos, Milvus introduce la matriz de estructuras, donde cada estructura de la matriz puede contener escalares y vectores, preservando la integridad semántica.</p>
<h2 id="Why-Array-of-Structs" class="common-anchor-header">Por qué Array of Structs<button data-href="#Why-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>Las aplicaciones modernas de IA, desde la conducción autónoma hasta la recuperación multimodal, dependen cada vez más de datos anidados y heterogéneos. Los modelos de datos planos tradicionales tienen dificultades para representar relaciones complejas como<strong>"un documento con muchos fragmentos anotados</strong>" o<strong>"una escena de conducción con múltiples maniobras observadas</strong>". Aquí es donde brilla el tipo de datos Array of Structs de Milvus.</p>
<p>Una matriz de Structs le permite almacenar un conjunto ordenado de elementos estructurados, donde cada Struct contiene su propia combinación de campos escalares e incrustaciones vectoriales. Esto lo hace ideal para:</p>
<ul>
<li><p><strong>Datos jerárquicos</strong>: Entidades padre con múltiples registros hijo, como un libro con muchos trozos de texto, o un vídeo con muchos fotogramas anotados.</p></li>
<li><p><strong>Incrustaciones multimodales</strong>: Cada Estructura puede contener múltiples vectores, como incrustaciones de texto más incrustaciones de imagen, junto con metadatos.</p></li>
<li><p><strong>Datos temporales o secuenciales</strong>: Los Structs de un campo Array representan de forma natural series temporales o eventos paso a paso.</p></li>
</ul>
<p>A diferencia de las soluciones tradicionales que almacenan blobs JSON o dividen los datos en múltiples colecciones, la matriz de estructuras proporciona una aplicación nativa del esquema, indexación de vectores y almacenamiento eficiente dentro de Milvus.</p>
<h2 id="Schema-design-guidelines" class="common-anchor-header">Directrices de diseño de esquemas<button data-href="#Schema-design-guidelines" class="anchor-icon" translate="no">
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
    </button></h2><p>Además de todas las directrices discutidas en <a href="/docs/es/schema-hands-on.md">Diseño del Modelo de Datos para la Búsqueda</a>, también debe considerar las siguientes cosas antes de empezar a utilizar una Matriz de Structs en su diseño del modelo de datos.</p>
<h3 id="Define-the-Struct-schema" class="common-anchor-header">Definir el esquema Struct<button data-href="#Define-the-Struct-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de añadir el campo Array a su colección, defina el esquema Struct interno. Cada campo de la estructura debe tener un tipo explícito, escalar<strong>(VARCHAR</strong>, <strong>INT</strong>, <strong>BOOLEAN</strong>, etc.) o vectorial<strong>(FLOAT_VECTOR</strong>).</p>
<p>Se aconseja mantener el esquema Struct simplificado incluyendo sólo los campos que se utilizarán para la recuperación o visualización. Evite sobrecargarlo con metadatos no utilizados.</p>
<h3 id="Set-the-max-capacity-thoughtfully" class="common-anchor-header">Establezca cuidadosamente la capacidad máxima<button data-href="#Set-the-max-capacity-thoughtfully" class="anchor-icon" translate="no">
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
    </button></h3><p>Cada campo Array tiene un atributo que especifica el número máximo de elementos que el campo Array puede contener para cada entidad. Establézcalo en función del límite superior de su caso de uso. Por ejemplo, hay 1.000 trozos de texto por documento, o 100 maniobras por escena de conducción.</p>
<p>Un valor excesivamente alto desperdicia memoria, y necesitarás hacer algunos cálculos para determinar el número máximo de Structs en el campo Array.</p>
<h3 id="Index-vector-fields-in-Structs" class="common-anchor-header">Indexar campos vectoriales en Structs<button data-href="#Index-vector-fields-in-Structs" class="anchor-icon" translate="no">
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
    </button></h3><p>La indexación es obligatoria para los campos vectoriales, incluyendo tanto los campos vectoriales de una colección como los definidos en una Struct. Para los campos vectoriales de una Struct, debe utilizar <code translate="no">AUTOINDEX</code> o <code translate="no">HNSW</code> como tipo de índice y la serie <code translate="no">MAX_SIM</code> como tipo de métrica.</p>
<p>Para más detalles sobre todos los límites aplicables, consulte <a href="/docs/es/array-of-structs.md#Limits">los límites</a>.</p>
<h2 id="A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="common-anchor-header">Un ejemplo real: Modelado del conjunto de datos CoVLA para la conducción autónoma<button data-href="#A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="anchor-icon" translate="no">
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
    </button></h2><p>El conjunto de datos Comprehensive Vision-Language-Action (CoVLA), presentado por <a href="https://tur.ing/posts/s1QUA1uh">Turing</a> Motors y aceptado en la Winter Conference on Applications of Computer Vision (WACV) 2025, proporciona una rica base para el entrenamiento y la evaluación de modelos de Visión-Lenguaje-Acción (VLA) en la conducción autónoma. Cada punto de datos, que suele ser un clip de vídeo, contiene no sólo información visual sin procesar, sino también subtítulos estructurados que describen:</p>
<ul>
<li><p><strong>Los comportamientos del vehículo ego</strong> (por ejemplo, "Incorporarse a la izquierda cediendo el paso al tráfico que se aproxima"),</p></li>
<li><p>Los <strong>objetos</strong> presentes <strong>detectados</strong> (por ejemplo, vehículos precedentes, peatones, semáforos), y</p></li>
<li><p>Una <strong>leyenda</strong> de la escena a nivel de fotograma.</p></li>
</ul>
<p>Esta naturaleza jerárquica y multimodal lo convierte en un candidato ideal para la función Array of Structs. Para obtener más información sobre el conjunto de datos CoVLA, consulte el <a href="https://turingmotors.github.io/covla-ad/">sitio web del conjunto de datos CoVLA</a>.</p>
<h3 id="Step-1-Map-the-dataset-into-a-collection-schema" class="common-anchor-header">Paso 1: Asignar el conjunto de datos a un esquema de colección<button data-href="#Step-1-Map-the-dataset-into-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>El conjunto de datos CoVLA es un conjunto de datos de conducción multimodal a gran escala que incluye 10.000 clips de vídeo, con un total de más de 80 horas de metraje. Muestrea fotogramas a una frecuencia de 20 Hz y anota cada fotograma con leyendas detalladas en lenguaje natural, junto con información sobre el estado del vehículo y las coordenadas de los objetos detectados.</p>
<p>La estructura del conjunto de datos es la siguiente:</p>
<pre><code translate="no" class="language-python">├── video_1                                       (VIDEO) <span class="hljs-comment"># video.mp4</span>
│   ├── video_id                                  (INT)
│   ├── video_url                                 (STRING)
│   ├── frames                                    (ARRAY)
│   │   ├── frame_1                               (STRUCT)
│   │   │   ├── caption                           (STRUCT) <span class="hljs-comment"># captions.jsonl</span>
│   │   │   │   ├── plain_caption                 (STRING)
│   │   │   │   ├── rich_caption                  (STRING)
│   │   │   │   ├── risk                          (STRING)
│   │   │   │   ├── risk_correct                  (BOOL)
│   │   │   │   ├── risk_yes_rate                 (FLOAT)
│   │   │   │   ├── weather                       (STRING)
│   │   │   │   ├── weather_rate                  (FLOAT)
│   │   │   │   ├── road                          (STRING)
│   │   │   │   ├── road_rate                     (FLOAT)
│   │   │   │   ├── is_tunnel                     (BOOL)
│   │   │   │   ├── is_tunnel_yes_rate            (FLOAT)
│   │   │   │   ├── is_highway                    (BOOL)
│   │   │   │   ├── is_highway_yes_rate           (FLOAT)
│   │   │   │   ├── has_pedestrain                (BOOL)
│   │   │   │   ├── has_pedestrain_yes_rate       (FLOAT)
│   │   │   │   ├── has_carrier_car               (BOOL)
│   │   │   ├── traffic_light                     (STRUCT) <span class="hljs-comment"># traffic_lights.jsonl</span>
│   │   │   │   ├── index                         (INT)
│   │   │   │   ├── <span class="hljs-keyword">class</span>                         (STRING)
│   │   │   │   ├── bbox                          (LIST&lt;FLOAT&gt;)
│   │   │   ├── front_car                         (STRUCT) <span class="hljs-comment"># front_cars.jsonl</span>
│   │   │   │   ├── has_lead                      (BOOL)
│   │   │   │   ├── lead_prob                     (FLOAT)
│   │   │   │   ├── lead_x                        (FLOAT)
│   │   │   │   ├── lead_y                        (FLOAT)
│   │   │   │   ├── lead_speed_kmh                (FLOAT)
│   │   │   │   ├── lead_a                        (FLOAT)
│   │   ├── frame_2                               (STRUCT)
│   │   ├── ...                                   (STRUCT)
│   │   ├── frame_n                               (STRUCT)
├── video_2
├── ...
├── video_n
<button class="copy-code-btn"></button></code></pre>
<p>La estructura del conjunto de datos CoVLA es altamente jerárquica, dividiendo los datos recogidos en múltiples archivos <code translate="no">.jsonl</code>, junto con los clips de vídeo en el formato <code translate="no">.mp4</code>.</p>
<p>En Milvus, puede utilizar un campo JSON o un campo Array-of-Structs para crear estructuras anidadas dentro de un esquema de colección. Cuando las incrustaciones vectoriales forman parte del formato anidado, sólo se admite un campo Array-of-Structs. Sin embargo, una estructura dentro de una matriz no puede contener otras estructuras anidadas. Para almacenar el conjunto de datos CoVLA conservando las relaciones esenciales, es necesario eliminar la jerarquía innecesaria y aplanar los datos para que se ajusten al esquema de la colección Milvus.</p>
<p>El diagrama siguiente ilustra cómo podemos modelar este conjunto de datos utilizando el esquema ilustrado en el esquema siguiente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dataset-model.png" alt="Dataset Model" class="doc-image" id="dataset-model" />
   </span> <span class="img-wrapper"> <span>Modelo de conjunto de datos</span> </span></p>
<p>El diagrama anterior ilustra la estructura de un videoclip, que comprende los siguientes campos:</p>
<ul>
<li><p><code translate="no">video_id</code> sirve como clave primaria, que acepta enteros del tipo INT64.</p></li>
<li><p><code translate="no">states</code> es un cuerpo JSON sin procesar que contiene el estado del vehículo ego en cada fotograma del vídeo actual.</p></li>
<li><p><code translate="no">captions</code> es una matriz de estructuras, cada una de las cuales tiene los siguientes campos:</p>
<ul>
<li><p><code translate="no">frame_id</code> identifica un fotograma específico dentro del vídeo actual.</p></li>
<li><p><code translate="no">plain_caption</code> es una descripción del fotograma actual sin el entorno ambiental, como el tiempo, el estado de la carretera, etc., y <code translate="no">plain_cap_vector</code> es su correspondiente vector incrustado.</p></li>
<li><p><code translate="no">rich_caption</code> es una descripción del fotograma actual con el entorno ambiental, y <code translate="no">rich_cap_vector</code> es su correspondiente vector de incrustación.</p></li>
<li><p><code translate="no">risk</code> es una descripción del riesgo al que se enfrenta el vehículo ego en la trama actual, y <code translate="no">risk_vector</code> es su correspondiente vector embeddings, y</p></li>
<li><p>Todos los demás atributos de la trama, como <code translate="no">road</code>, <code translate="no">weather</code>, <code translate="no">is_tunnel</code>, <code translate="no">has_pedestrain</code>, etc.</p></li>
</ul></li>
<li><p><code translate="no">traffic_lights</code> es un cuerpo JSON que contiene todas las señales de semáforo identificadas en el marco actual.</p></li>
<li><p><code translate="no">front_cars</code> es también un Array of Structs que contiene todos los coches líderes identificados en el frame actual.</p></li>
</ul>
<h3 id="Step-2-Initialize-the-schemas" class="common-anchor-header">Paso 2: Inicializar los esquemas<button data-href="#Step-2-Initialize-the-schemas" class="anchor-icon" translate="no">
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
    </button></h3><p>Para empezar, necesitamos inicializar el esquema para un Struct caption, un Struct front_cars, y la colección.</p>
<ul>
<li><p>Inicializar el esquema de la estructura Caption.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = client.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_correct&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;weather&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">50</span>,
    description=<span class="hljs-string">&quot;weather condition&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;weather_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;road&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">50</span>,
    description=<span class="hljs-string">&quot;road type&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;road_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road type&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_tunnel&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the road is a tunnel&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_highway&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the road is a highway&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_pedestrian&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_carrier_car&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a carrier car present&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicializar el esquema de la estructura del coche delantero</p>
<p><div class="alert note"></p>
<p>Aunque un coche delantero no implica incrustaciones vectoriales, es necesario incluirlo como una matriz de Struct porque el tamaño de los datos supera el máximo para un campo JSON.</p>
<p></div></p>
<pre><code translate="no" class="language-python">schema_for_front_car = client.create_struct_field_schema()

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;has_lead&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_prob&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_x&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_y&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_a&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicializar el esquema para la colección</p>
<pre><code translate="no" class="language-python">schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>,
    max_length=<span class="hljs-number">16</span>,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;captions&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=schema_for_caption,
    max_capacity=<span class="hljs-number">600</span>,
    description=<span class="hljs-string">&quot;captions for the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=schema_for_front_car,
    max_capacity=<span class="hljs-number">600</span>,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">Paso 3: Establecer parámetros de índice<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Todos los campos vectoriales deben estar indexados. Para indexar los campos vectoriales en un elemento Struct, debe utilizar <code translate="no">AUTOINDEX</code> o <code translate="no">HNSW</code> como tipo de índice y el tipo de métrica de la serie <code translate="no">MAX_SIM</code> para medir las similitudes entre las listas de incrustación.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>, 
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, 
    index_name=<span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>, <span class="hljs-comment"># mandatory for now</span>
    index_params={<span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>}
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>, 
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, 
    index_name=<span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>, <span class="hljs-comment"># mandatory for now</span>
    index_params={<span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>}
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[risk_vector]&quot;</span>, 
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, 
    index_name=<span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>, <span class="hljs-comment"># mandatory for now</span>
    index_params={<span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>}
)
<button class="copy-code-btn"></button></code></pre>
<p>Se recomienda activar la trituración JSON para los campos JSON para acelerar el filtrado dentro de estos campos.</p>
<h3 id="Step-4-Create-a-collection" class="common-anchor-header">Paso 4: Crear una colección<button data-href="#Step-4-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez que los esquemas y los índices estén listos, puede crear la colección de destino como se indica a continuación:</p>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-data" class="common-anchor-header">Paso 5: Insertar los datos<button data-href="#Step-5-Insert-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Turing Motos organiza el conjunto de datos CoVLA en múltiples archivos, incluyendo clips de vídeo en bruto (<code translate="no">.mp4</code>), estados (<code translate="no">states.jsonl</code>), subtítulos (<code translate="no">captions.jsonl</code>), semáforos (<code translate="no">traffic_lights.jsonl</code>), y coches delanteros (<code translate="no">front_cars.jsonl</code>).</p>
<p>Es necesario combinar los datos de cada clip de vídeo de estos archivos e insertar los datos. A continuación se muestra el script para combinar los datos de un videoclip específico.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI(
    api_key=<span class="hljs-string">&#x27;YOUR_OPENAI_API_KEY&#x27;</span>,
)

video_id = <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span> <span class="hljs-comment"># represent a single video with 600 frames</span>

<span class="hljs-comment"># get all front car records in the specified video clip</span>
entries = []
front_cars = []
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/front_car/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = <span class="hljs-built_in">int</span>(key)
        front_cars.append(value)

<span class="hljs-comment"># get all traffic lights identified in the specified video clip</span>
entries = []
traffic_lights = []
frame_id = <span class="hljs-number">0</span>
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/traffic_lights/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> value <span class="hljs-keyword">or</span> (value[<span class="hljs-string">&#x27;index&#x27;</span>] == <span class="hljs-number">1</span> <span class="hljs-keyword">and</span> key != <span class="hljs-string">&#x27;0&#x27;</span>):
            frame_id+=<span class="hljs-number">1</span>

        <span class="hljs-keyword">if</span> value:
            value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = frame_id
            traffic_lights.append(value)
        <span class="hljs-keyword">else</span>:
            value_dict = {}
            value_dict[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = frame_id
            traffic_lights.append(value_dict)

<span class="hljs-comment"># get all captions generated in the video clip and convert them into vector embeddings</span>
entries = []
captions = []
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/captions/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embedding</span>(<span class="hljs-params">text, model=<span class="hljs-string">&quot;embeddinggemma:latest&quot;</span></span>):
    response = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=model)
    <span class="hljs-keyword">return</span> response.data[<span class="hljs-number">0</span>].embedding

<span class="hljs-comment"># Add embeddings to each entry</span>
<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-comment"># Each entry is a dict with a single key (e.g., &#x27;0&#x27;, &#x27;1&#x27;, ...)</span>
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = <span class="hljs-built_in">int</span>(key)  <span class="hljs-comment"># Convert key to integer and assign to frame_id</span>

        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;plain_caption&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;plain_caption&quot;</span>]:
            value[<span class="hljs-string">&quot;plain_cap_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;plain_caption&quot;</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;rich_caption&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;rich_caption&quot;</span>]:
            value[<span class="hljs-string">&quot;rich_cap_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;rich_caption&quot;</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;risk&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;risk&quot;</span>]:
            value[<span class="hljs-string">&quot;risk_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;risk&quot;</span>])

        captions.append(value)

data = {
    <span class="hljs-string">&quot;video_id&quot;</span>: video_id,
    <span class="hljs-string">&quot;video_url&quot;</span>: <span class="hljs-string">&quot;https://your-storage.com/{}&quot;</span>.<span class="hljs-built_in">format</span>(video_id),
    <span class="hljs-string">&quot;captions&quot;</span>: captions,
    <span class="hljs-string">&quot;traffic_lights&quot;</span>: traffic_lights,
    <span class="hljs-string">&quot;front_cars&quot;</span>: front_cars
}
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que haya procesado los datos como corresponde, puede insertarlos de la siguiente manera:</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=[data]
)

<span class="hljs-comment"># {&#x27;insert_count&#x27;: 1, &#x27;ids&#x27;: [&#x27;0a0fc7a5db365174&#x27;], &#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
