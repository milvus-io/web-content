---
id: membership-match.md
title: Emparejamiento de sociosCompatible with Milvus v3.0.2+
summary: >-
  Filtra entidades en grandes conjuntos de elementos utilizando filtros Bloom
  compactos o mapas de bits Roaring exactos, con sintaxis, patrones de solicitud
  del SDK, semántica de eliminación y límites operativos.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Emparejamiento de socios<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>La coincidencia de pertenencia filtra entidades comprobando si el valor de un campo escalar pertenece a un conjunto proporcionado por el llamante. El cliente crea un blob binario compacto de filtro de pertenencia y lo pasa como valor de una plantilla de expresión.</p>
<p>Sustituye a las grandes listas de « <code translate="no">IN [...]</code> ». Un filtro « <code translate="no">IN</code> » serializa cada miembro en la solicitud, por lo que los conjuntos de miembros suficientemente grandes pueden superar el límite de recepción de gRPC del proxy. Con « <code translate="no">membership_match</code> », el proxy valida el blob y lo integra en el plan de consulta sin reconstruir una lista de miembros.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>Flujo de trabajo de Membership Match: el cliente crea un blob reutilizable, el proxy lo valida y los QueryNodes lo evalúan.</span>
  
 </span></p>
<p>El diagrama muestra la división fija del trabajo. El cliente crea el blob una vez y lo reutiliza en todas las solicitudes; el proxy valida los límites de la envoltura y el tamaño e incorpora el blob tal cual en el plan de consulta; y los QueryNodes evalúan el plan con datos sin procesar o con un índice.</p>
<p>El operador dispone de dos codificaciones con diferentes garantías de exactitud:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): pertenencia aproximada. Son posibles los falsos positivos; no se esperan falsos negativos con un filtro válido. Uso típico: filtros de audiencia de gran volumen o de exclusión en los que se aceptan falsos positivos ocasionales.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): pertenencia exacta para valores enteros. Uso típico: listas de control de acceso (ACL), visibilidad de inquilinos, filtros de cumplimiento normativo y operaciones de eliminación por conjunto de ID.</li>
</ul>
<p>No utilices la pertenencia <strong>de Bloom</strong> para decisiones de autorización ni para eliminaciones destructivas. Un falso positivo puede exponer una entidad o eliminar una entidad que no se encuentre en el conjunto previsto.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Lista de comprobación operativa<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Confirma el tipo de campo de destino y crea el blob a partir de ese mismo dominio de valores.</li>
<li>Seleccione «Bloom» únicamente cuando los falsos positivos sean aceptables.</li>
<li>Seleccione «Roaring» para operaciones de ACL, cumplimiento normativo, aislamiento de inquilinos y eliminación.</li>
<li>Crea blobs grandes una sola vez y reutilízalos; no los vuelvas a crear en cada solicitud.</li>
<li>Calcule el tamaño del blob en bytes serializados, no en número de elementos.</li>
<li>En un clúster de versiones mixtas, finaliza la actualización progresiva (primero los proxies) antes de habilitar « <code translate="no">membership_match</code> ».</li>
<li>Pruebe la expresión en una colección que no sea de producción antes de habilitar un flujo de trabajo destructivo.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Sintaxis de la expresión<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>El segundo argumento es un marcador de posición de la plantilla. El SDK proporciona el valor del marcador de posición como un objeto ` <code translate="no">bytes</code> ` de Protobuf que contiene el blob de filtro creado por el cliente. Mantén el ` <code translate="no">type</code> ` explícito en las expresiones de producción para que el contrato de corrección previsto sea visible en el código y en los registros.</p>
<p>El argumento <code translate="no">type</code> es opcional. Cada blob lleva un encabezado mágico autodescriptivo, <code translate="no">MBF1</code> para Bloom y <code translate="no">MRB1</code> para Roaring, y el servidor detecta el encabezado cuando se omite <code translate="no">type</code>. Un <code translate="no">type</code> explícito que entre en conflicto con el encabezado del blob se rechaza como un error de solicitud, y los encabezados desconocidos o truncados dan lugar a un estado de «fail-closed».</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Elige la codificación<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza Bloom cuando sea aceptable un falso positivo. Bloom admite campos de enteros con signo (<strong>INT8/16/32/64</strong>), campos <strong>VARCHAR</strong> y rutas <strong>JSON</strong>. Un filtro Bloom no es una lista de permitidos exacta.</p>
<p><code translate="no">fpr</code> (tasa de falsos positivos) es la probabilidad de que un filtro Bloom señale un valor como miembro cuando dicho valor nunca se ha insertado: <code translate="no">fpr=0.005</code> significa que, aproximadamente, uno de cada 200 valores que no son miembros se señala erróneamente como presente. Una fpr más baja produce un blob más grande.</p>
<p>Utiliza <strong>«Roaring»</strong> cuando todas las coincidencias deban ser exactas. <strong>«Roaring»</strong> solo acepta campos de enteros con signo; los miembros se amplían en signo a <strong>INT64</strong> antes de la serialización, por lo que un INT8 -1 y un INT64 -1 son el mismo miembro. No lo utilices para UUID u otros campos de cadena.</p>
<table>
<thead>
<tr><th>Dimensión</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Precisión</td><td>Aproximada; posibles falsos positivos; sin falsos negativos</td><td>Exacto; sin falsos positivos ni falsos negativos</td></tr>
<tr><td>Campos</td><td>INT8/16/32/64, VARCHAR, rutas JSON</td><td>Solo INT8/16/32/64 con signo</td></tr>
<tr><td>Tamaño del blob</td><td>Número de miembros y FPR; unos 11 bits por miembro con un FPR de 0,005; cuerpo en forma de potencia de dos</td><td>Distribución de valores; los conjuntos densos se comprimen a tamaños mucho menores; los valores aleatorios de 64 bits alcanzan el límite máximo del contenedor de 262 144</td></tr>
<tr><td>Eliminación</td><td>Rechazado en el momento del análisis sintáctico</td><td>Permitido</td></tr>
<tr><td>Uso típico</td><td>Filtros de audiencia y exclusión</td><td>ACL, cumplimiento normativo, aislamiento de inquilinos, eliminación por conjunto de ID</td></tr>
</tbody>
</table>
<p>Las rutas<strong>JSON</strong> son de tipado estricto, fila por fila: una cadena <strong>JSON</strong> se evalúa como un valor <strong>VARCHAR</strong>, un entero <strong>JSON</strong> como un valor <strong>INT64</strong>, y un doble <strong>JSON</strong> nunca coincide con un miembro entero, a diferencia del « <code translate="no">IN</code> » exacto, donde 5,0 es igual a 5. Si tus escritores codifican los enteros como flotantes, normalízalos al escribirlos o utiliza un campo escalar tipado.</p>
<p>Para cualquiera de las dos codificaciones, crea el conjunto de miembros a partir del mismo dominio de valores que el campo de destino. No construyas un filtro Bloom a partir de la cadena « <code translate="no">&quot;10086&quot;</code> » y lo apliques a un campo « <code translate="no">INT64</code> ». La cabecera del blob registra los dominios de valores insertados, y el proxy rechaza un blob con un dominio incorrecto con un error de parámetro, en lugar de realizar una coincidencia silenciosa sin resultado. Reutiliza un blob ya creado en todas las solicitudes en lugar de volver a crearlo para cada consulta.</p>
<p>Para conjuntos de unos pocos miles de elementos o menos, la codificación simple « <code translate="no">IN</code> » sigue siendo la opción más sencilla. El servidor no elige entre <strong>IN</strong>, <strong>Bloom</strong> y <strong>Roaring</strong>. La selección de la codificación es responsabilidad del solicitante.</p>
<p>Para elegir una codificación:</p>
<ol>
<li>Determina si la carga de trabajo tolera falsos positivos. Si no es así, <strong>Bloom</strong> nunca es una opción.</li>
<li>Para una pertenencia exacta, utiliza <strong>Roaring</strong> con un campo de entero con signo. Los valores densos o agrupados se comprimen en los blobs más pequeños.</li>
<li>Comprueba los límites de tamaño. Los valores aleatorios uniformes de 64 bits pueden superar el límite máximo de 262 144 del contenedor o los límites de tamaño. Si es así, utiliza una lista <strong>IN</strong> tradicional que se ajuste a los límites de la solicitud.</li>
<li>Para la pertenencia exacta en campos no enteros, utilice <strong>«IN</strong>». No existe una codificación de pertenencia exacta para estos campos.</li>
</ol>
<p>La coincidencia de pertenencia no está disponible a través de la API HTTP RESTful. Los parámetros de las plantillas de expresión HTTP solo aceptan valores booleanos, numéricos, de cadena y de matriz; no existe un tipo binario <code translate="no">bytes</code> para el blob. Utiliza un SDK basado en gRPC para pasar blobs de pertenencia.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">Patrones de solicitud del SDK<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Los siguientes fragmentos de código se centran en la creación de blobs de pertenencia y en su transmisión como parámetros de plantillas de filtro. Se da por supuesto que las colecciones y los campos ya existen y están cargados, que los clientes del SDK están conectados y que los vectores de consulta, las listas de miembros y otras variables a las que se hace referencia están definidas. Se omite la configuración de la colección y el andamiaje completo de la aplicación.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Eliminación con Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza un blob <strong>Roaring</strong> exacto al eliminar entidades seleccionadas por un conjunto externo de ID enteros. Revisa el conjunto de miembros y el tipo de campo de la colección antes de ejecutar la eliminación. No utilices Bloom: la pertenencia aproximada no es un predicado de eliminación seguro, y las formas de Bloom se rechazan en las expresiones de eliminación en el momento del análisis sintáctico.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>La semántica de eliminación sigue una coincidencia exacta de tres valores:</p>
<table>
<thead>
<tr><th>Valor del campo</th><th>membership_match(…)</th><th>no membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>sin coincidencia (NULL)</td><td>sin coincidencia (NULL)</td></tr>
<tr><td>en el conjunto de miembros</td><td>coincidencia</td><td>sin coincidencia</td></tr>
<tr><td>fuera del conjunto</td><td>sin coincidencia</td><td>coincide</td></tr>
</tbody>
</table>
<p>La tabla se lee fila por fila: un «Delete» con « <code translate="no">membership_match</code> » elimina las entidades incluidas en el conjunto, un «Delete» con « <code translate="no">not membership_match</code> » elimina las entidades fuera del conjunto, y las entidades NULL se conservan en ambas polaridades.</p>
<ul>
<li>Las entidades con un valor de campo NULL nunca se eliminan, sea cual sea la polaridad.</li>
<li>Un mapa de bits vacío no elimina nada. « <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> » elimina todas las entidades con un valor de campo distinto de NULL, es decir, el complemento exacto, que puede ser un conjunto grande por diseño.</li>
<li><code translate="no">not membership_match</code> es el complemento exacto del conjunto de miembros sobre las entidades no NULL, no una aproximación.</li>
</ul>
<p>En segmentos sellados cargados solo por índice, sin datos escalares sin procesar, la evaluación utiliza una búsqueda inversa acotada cuando el índice lo admite. Cuando no se dispone ni de datos de campo sin procesar ni de un índice válido, la solicitud falla con « <code translate="no">FieldNotLoaded</code> » en lugar de devolver entidades sin filtrar.</p>
<h2 id="Operational-limits" class="common-anchor-header">Límites operativos<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
<tr><th>Configuración</th><th>Por defecto</th><th>Configurable</th><th>Lo que limita</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>un cuerpo de blob</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>agregado por solicitud</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>solicitud completa</td></tr>
<tr><td>Límite máximo de contenedores de Roaring</td><td>262 144</td><td>corregido en el código</td><td>por filtro</td></tr>
<tr><td>Estimación de memoria descodificada de Roaring</td><td>64 MiB</td><td>fijo en el código</td><td>por filtro</td></tr>
<tr><td>Límite del formato MBF1</td><td>128 MiB</td><td>fijado en el código</td><td>límite máximo del formato blob</td></tr>
<tr><td>Bloom <code translate="no">fpr</code></td><td>0,005</td><td>generador de cliente</td><td>objetivo de falsos positivos</td></tr>
</tbody>
</table>
<p>Los ajustes de « <code translate="no">proxy.*</code> » (Límite de formato de Roaring y MBF1) forman parte de la configuración del servidor Milvus: los establece el operador del clúster en <code translate="no">milvus.yaml</code>, en la sección « <code translate="no">proxy</code> », y no se pueden ajustar por solicitud o por expresión en el momento del filtrado. Las admisiones <strong>«Roaring»</strong> y el límite del formato MBF1 están fijados en la implementación y no se pueden configurar en ningún sitio. La fila « <code translate="no">fpr</code> » es el único control del lado del cliente: se elige al crear el blob, con un rango aceptado de 0,0001 a 0,05.</p>
<p>El cuerpo del blob admite como máximo unos 48,6 millones de miembros INT64 con el fpr predeterminado, a lo que hay que añadir la cabecera fija de 32 bytes permitida. El presupuesto para toda la solicitud cubre el tamaño serializado agregado de los planes que contienen miembros, más el tamaño estimado descodificado agregado de los filtros Roaring; las subsolicitudes de HybridSearch y los filtros de puntuación lo comparten. Los cuerpos de los blobs Bloom son potencias de dos: un recuento de miembros que supere ligeramente el límite de un nivel duplica el tamaño del blob, y un fpr ligeramente superior suele encajar en el nivel inmediatamente inferior. Cuando el proxy rechaza un blob Bloom de tamaño excesivo, el error sugiere un « <code translate="no">fpr</code> » que se ajusta a los requisitos.</p>
<ul>
<li>Los resultados de la expresión de pertenencia no se almacenan en caché entre solicitudes.</li>
<li>Los clústeres de versiones mixtas fallan en modo cerrado: los QueryNodes que ejecutan código más antiguo rechazan los planes que contienen nodos de plan de pertenencia. Actualiza primero los proxies y, a continuación, completa la actualización progresiva antes de habilitar el operador.</li>
<li>Los registros del servidor ocultan los bytes de los blobs. El texto de la expresión contiene únicamente el nombre de la plantilla; la carga útil binaria se transmite fuera de banda en los valores de la plantilla.</li>
</ul>
