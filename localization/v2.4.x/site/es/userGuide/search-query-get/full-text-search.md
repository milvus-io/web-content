---
id: full-text-search.md
title: Búsqueda de texto completo
related_key: 'full, text, search'
summary: >-
  La búsqueda de texto completo es una función que recupera documentos que
  contienen términos o frases específicos en conjuntos de datos de texto y, a
  continuación, clasifica los resultados en función de su relevancia.
---
<h1 id="Full-Text-Search​" class="common-anchor-header">Búsqueda de texto completo<button data-href="#Full-Text-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda de texto completo es una función que recupera documentos que contienen términos o frases específicos en conjuntos de datos de texto y, a continuación, clasifica los resultados en función de su relevancia. Esta función supera las limitaciones de la búsqueda semántica, que puede pasar por alto términos precisos, garantizando que usted reciba los resultados más exactos y contextualmente relevantes. Además, simplifica las búsquedas vectoriales al aceptar la entrada de texto sin formato, convirtiendo automáticamente los datos de texto en incrustaciones dispersas sin necesidad de generar manualmente incrustaciones vectoriales.</p>
<p>Esta función, que utiliza el algoritmo BM25 para la puntuación de la relevancia, es especialmente valiosa en escenarios de generación de recuperación aumentada (RAG), donde da prioridad a los documentos que coinciden estrechamente con términos de búsqueda específicos.</p>
<div class="alert note">
<p>Al integrar la búsqueda de texto completo con la búsqueda de vectores densos basada en la semántica, puede mejorar la precisión y la relevancia de los resultados de búsqueda. Para obtener más información, consulte <a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a>.</p>
</div>
<h2 id="Overview​" class="common-anchor-header">Descripción general<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>La búsqueda de texto completo simplifica el proceso de búsqueda basada en texto eliminando la necesidad de incrustación manual. Esta función funciona mediante el siguiente flujo de trabajo.</p>
<ol>
<li><p><strong>Entrada de texto</strong>: Se insertan documentos de texto sin procesar o se proporciona un texto de consulta sin necesidad de incrustación manual.</p></li>
<li><p><strong>Análisis del texto</strong>: Milvus utiliza un analizador para convertir el texto de entrada en términos individuales susceptibles de búsqueda.</p></li>
<li><p><strong>Procesamiento de funciones</strong>: La función incorporada recibe los términos tokenizados y los convierte en representaciones vectoriales dispersas.</p></li>
<li><p><strong>Almacenamiento de colecciones</strong>: Milvus almacena estas representaciones dispersas en una colección para una recuperación eficiente.</p></li>
<li><p><strong>Puntuación BM25</strong>: Durante una búsqueda, Milvus aplica el algoritmo BM25 para calcular las puntuaciones de los documentos almacenados y clasifica los resultados coincidentes en función de su relevancia para el texto consultado.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>Búsqueda de texto completo</span> </span></p>
<p>Para utilizar la búsqueda de texto completo, siga estos pasos principales.</p>
<ol>
<li><p>Cree<a href="#Create-a-collection-for-full-text-search">una colección</a>: Configure una colección con los campos necesarios y defina una función para convertir el texto en bruto en incrustaciones dispersas.</p></li>
<li><p><a href="#Insert-text-data">Introduzca los datos</a>: Introduzca los documentos de texto sin formato en la colección.</p></li>
<li><p><a href="#Perform-full-text-search">Realizar búsquedas</a>: Utilice textos de consulta para buscar en su colección y obtener resultados relevantes.</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">Crear una colección para la búsqueda de texto completo<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Para habilitar la búsqueda de texto completo, cree una colección con un esquema específico. Este esquema debe incluir tres campos necesarios.</p>
<ul>
<li><p>El campo primario que identifica de forma exclusiva cada entidad de una colección.</p></li>
<li><p>Un campo <code translate="no">VARCHAR</code> que almacene documentos de texto sin procesar, con el atributo <code translate="no">enable_analyzer</code> establecido en <code translate="no">True</code>. Esto permite a Milvus tokenizar el texto en términos específicos para el procesamiento de funciones.</p></li>
<li><p>Un campo <code translate="no">SPARSE_FLOAT_VECTOR</code> reservado para almacenar incrustaciones dispersas que Milvus generará automáticamente para el campo <code translate="no">VARCHAR</code>.</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">Definir el esquema de la colección</h3><p>En primer lugar, cree el esquema y añada los campos necesarios.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración</p>
<ul>
<li><p><code translate="no">id</code>: sirve como clave primaria y se genera automáticamente con <code translate="no">auto_id=True</code>.</p></li>
<li><p><code translate="no">text</code>: almacena los datos de texto sin procesar para las operaciones de búsqueda de texto completo. El tipo de datos debe ser <code translate="no">VARCHAR</code>, ya que <code translate="no">VARCHAR</code> es el tipo de datos de cadena de Milvus para el almacenamiento de texto. Establezca <code translate="no">enable_analyzer=True</code> para permitir que Milvus tokenice el texto. Por defecto, Milvus utiliza el <a href="/docs/es/standard-analyzer.md">analizador estándar</a> para el análisis de texto. Para configurar un analizador diferente, consulte <a href="/docs/es/analyzer-overview.md">Visión general</a>.</p></li>
<li><p><code translate="no">sparse</code>Campo vectorial : un campo vectorial reservado para almacenar incrustaciones dispersas generadas internamente para operaciones de búsqueda de texto completo. El tipo de datos debe ser <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
</ul>
<p>Ahora, defina una función que convierta su texto en representaciones vectoriales dispersas y añádala al esquema.</p>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​
)​
​
schema.add_function(bm25_function)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">Parámetro</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">Descripción</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">El nombre de la función. Esta función convierte el texto sin formato del campo <code translate="no">text</code> en vectores de búsqueda que se almacenarán en el campo <code translate="no">sparse</code>.</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">El nombre del campo <code translate="no">VARCHAR</code> que requiere la conversión de texto a vectores dispersos. Para <code translate="no">FunctionType.BM25</code>, este parámetro sólo acepta un nombre de campo.</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">El nombre del campo donde se almacenarán los vectores dispersos generados internamente. Para <code translate="no">FunctionType.BM25</code>, este parámetro sólo acepta un nombre de campo.</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">El tipo de función que se utilizará. Establezca el valor en <code translate="no">FunctionType.BM25</code>.</p>
</td></tr></tbody></table>
<div class="alert note">
<p>Para colecciones con múltiples campos <code translate="no">VARCHAR</code> que requieran conversión de texto a vectores dispersos, añada funciones separadas al esquema de la colección, asegurándose de que cada función tiene un nombre y un valor <code translate="no">output_field_names</code> únicos.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">Configurar el índice</h3><p>Tras definir el esquema con los campos necesarios y la función incorporada, configure el índice para su colección. Para simplificar este proceso, utilice <code translate="no">AUTOINDEX</code> como <code translate="no">index_type</code>, una opción que permite a Milvus elegir y configurar el tipo de índice más adecuado en función de la estructura de sus datos.</p>
<pre><code translate="no" class="language-python">index_params = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, ​
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="XEoodLxOFoukWJx9aLXcH46snXc"><thead><tr><th data-block-token="PfGNdbuq9o9PEWxzAWecWWoInUf" colspan="1" rowspan="1"><p data-block-token="KX1VdsOJCoO0Exxhg8acsduwncd">Parámetro</p>
</th><th data-block-token="VNwBdAyWKoPktSxYaBtcn5rKnNb" colspan="1" rowspan="1"><p data-block-token="Oo1PduIsxo4HcMx2NRmcxvAMnld">Descripción</p>
</th></tr></thead><tbody><tr><td data-block-token="UxxWdkIBPoSbjOx7MO8csiFEn5d" colspan="1" rowspan="1"><p data-block-token="NYODddTbmoYoBrxPQ8ectvGxnPe"><code translate="no">field_name</code></p>
</td><td data-block-token="L2ZGdkB2voKhmsx8ezecoPxmnVf" colspan="1" rowspan="1"><p data-block-token="Y16fdZ6hPoXVlgxSTQjctsTonac">El nombre del campo vectorial a indexar. Para la búsqueda de texto completo, debe ser el campo que almacena los vectores dispersos generados. En este ejemplo, el valor es <code translate="no">sparse</code>.</p>
</td></tr><tr><td data-block-token="Wn1rdzso5o8AmqxqxiqccBpCnD4" colspan="1" rowspan="1"><p data-block-token="WLDrdOzSXoiKEOxoDREctDounRf"><code translate="no">index_type</code></p>
</td><td data-block-token="I9TpdLWlXozM3Hx2Z9mcWvDHnNc" colspan="1" rowspan="1"><p data-block-token="Q3cgdK7OTo3kzXxQ1Y2cSarZned">El tipo de índice a crear. <code translate="no">AUTOINDEX</code> permite a Milvus optimizar automáticamente la configuración del índice. Si necesita más control sobre la configuración del índice, puede elegir entre varios tipos de índice disponibles para vectores dispersos en Milvus. Para más información, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices soportados en Milvus</a>.</p>
</td></tr><tr><td data-block-token="KJfgdQmD1odMgdxkG6uczBYknQh" colspan="1" rowspan="1"><p data-block-token="XVCsdz9Ulo93A2xavPtcF9Bvnec"><code translate="no">metric_type</code></p>
</td><td data-block-token="S3NHds6MTodtrsxRILIc8E1wngh" colspan="1" rowspan="1"><p data-block-token="G9i7dPczzoyJRHxyXbecrWBBn0d">El valor de este parámetro debe establecerse en <code translate="no">BM25</code> específicamente para la funcionalidad de búsqueda de texto completo.</p>
</td></tr></tbody></table>
<h3 id="Create-the-collection​" class="common-anchor-header">Cree la colección</h3><p>Cree ahora la colección utilizando los parámetros de esquema e índice definidos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    schema=schema, ​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">Inserte los datos de texto<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de configurar la colección y el índice, está listo para insertar datos de texto. En este proceso, sólo tiene que proporcionar el texto sin procesar. La función incorporada que definimos anteriormente genera automáticamente el vector disperso correspondiente para cada entrada de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">insert</span>(<span class="hljs-string">&#x27;demo&#x27;</span>, [​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Artificial intelligence was founded as an academic discipline in 1956.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;</span>},​
])​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">Búsqueda de texto completo<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que haya insertado datos en su colección, puede realizar búsquedas de texto completo utilizando consultas de texto sin procesar. Milvus convierte automáticamente su consulta en un vector disperso y clasifica los resultados de búsqueda coincidentes utilizando el algoritmo BM25, y luego devuelve los resultados topK (<code translate="no">limit</code>).</p>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: 0.6},​
}​
​
MilvusClient.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;Who started AI research?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    <span class="hljs-built_in">limit</span>=3,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">Parámetro</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">Descripción</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">Un diccionario que contiene los parámetros de búsqueda.</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">Proporción de términos de baja frecuencia que se ignoran durante la búsqueda. Para más detalles, consulte <a href="/docs/es/sparse_vector.md">Vector disperso</a>.</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">El texto en bruto de la consulta.</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">El nombre del campo que contiene los vectores dispersos generados internamente.</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">Número máximo de coincidencias que se devolverán.</p>
</td></tr></tbody></table>
<p></p>
