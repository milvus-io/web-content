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
<p>En lugar de pedir al usuario que convierta sus eventos estructurales atómicos en modelos de datos planos, Milvus introduce la matriz de estructuras, donde cada estructura de la matriz puede contener escalares y vectores, preservando la integridad semántica y permitiendo un sólido filtrado anidado y una búsqueda híbrida.</p>
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
<li><p><strong>Datos temporales o secuenciales</strong>: Los Structs en un campo Array representan de forma natural series temporales o eventos paso a paso.</p></li>
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
    </button></h3><p>La indexación es obligatoria para los campos vectoriales, incluyendo tanto los campos vectoriales de una colección como los definidos en una Struct. Para los campos vectoriales en un Struct, debe utilizar <code translate="no">EMB_LIST_HNSW</code> como tipo de índice y <code translate="no">MAX_SIM</code> como tipo métrico.</p>
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
<li><p><code translate="no">traffic_lights</code> es un cuerpo JSON que contiene todas las señales de semáforo identificadas en la trama actual.</p></li>
<li><p><code translate="no">front_cars</code> es también un cuerpo JSON que contiene todos los coches de cabeza identificados en la trama actual.</p></li>
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
    </button></h3><p>Para empezar, necesitamos inicializar el esquema para un caption Struct y la colección.</p>
<ul>
<li><p>Inicializar el esquema para el Caption Struct.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = MilvusClient.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
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
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

...
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicializar el esquema de la colección</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;states&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific state of the ego vehicle in the current video&quot;</span>
)

<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;captions&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.ARRAY,</span>
<span class="highlighted-comment-line">    element_type=DataType.STRUCT,</span>
<span class="highlighted-comment-line">    struct_schema=struct_for_caption,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">600</span>,</span>
<span class="highlighted-comment-line">    description=<span class="hljs-string">&quot;captions for the current video&quot;</span></span>
<span class="highlighted-comment-line">)</span>

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">Paso 3: Establecer los parámetros de indexación<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Todos los campos vectoriales deben estar indexados. Para indexar los campos vectoriales en un elemento Struct, debe utilizar <code translate="no">EMB_LIST_HNSW</code> como tipo de índice y el tipo de métrica <code translate="no">MAX_SIM</code> para medir las similitudes entre las incrustaciones vectoriales.</p>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
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
<pre><code translate="no" class="language-python">client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
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
<p>Es necesario fusionar los datos de cada clip de vídeo de estos archivos e insertar los datos. A continuación se muestra una entidad fusionada para su referencia.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;video_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;video_url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;videos/0a0fc7a5db365174.mp4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;states&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;trajectory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;extrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">-0.016034273081459105</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.9998714384933313</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-8.280132118064406e-05</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;intrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">2648.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">964.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;captions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;plain_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow.&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rich_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow. It is cloudy. The car is driving on a wide road. No pedestrians appear to be present. What the driver of ego vehicle should be careful is to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_correct&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_yes_rate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.6062515935356961</span><span class="hljs-punctuation">,</span>
            ...
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
            ...
        <span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">599</span>
            ...
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;traffic_lights&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">485.9914855957031</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.18536376953125</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.1666259765625</span><span class="hljs-punctuation">,</span> <span class="hljs-number">360.3130798339844</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;right&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;2&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;straight&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;front_cars&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;has_lead&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_prob&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.967777669429779</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_x&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5.26953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_y&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1.07421875</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_speed_kmh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">23.6953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.546875</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que haya procesado los datos como corresponde, podrá insertarlos de la siguiente manera:</p>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;video_id&quot;</span>: <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>, ...}
    ...
]

client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
