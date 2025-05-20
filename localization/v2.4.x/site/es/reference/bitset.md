---
id: bitset.md
summary: Más información sobre los conjuntos de bits en Milvus.
title: Bitset
---
<h1 id="Bitset" class="common-anchor-header">Conjunto de bits<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta el mecanismo bitset que ayuda a habilitar funcionalidades clave como el filtrado de atributos y las <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">operaciones de borrado</a> en Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Un conjunto de bits es un conjunto de bits. Los bits son elementos con sólo dos valores posibles, más típicamente <code translate="no">0</code> y <code translate="no">1</code>, o valores booleanos <code translate="no">true</code> y <code translate="no">false</code>. En Milvus, los conjuntos de bits son matrices de números de bits <code translate="no">0</code> y <code translate="no">1</code> que pueden usarse para representar ciertos datos de forma compacta y eficiente en lugar de en ints, floats o chars. Un número de bits es <code translate="no">0</code> por defecto y sólo se establece en <code translate="no">1</code> si cumple ciertos requisitos.</p>
<p>Las operaciones sobre conjuntos de bits se realizan con <a href="/docs/es/v2.4.x/boolean.md">lógica booleana</a>, según la cual un valor de salida es válido o inválido, también denotados por <code translate="no">1</code> y <code translate="no">0</code> respectivamente. Por ejemplo, el <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">operador lógico</a> <code translate="no">AND</code> puede utilizarse para comparar dos conjuntos de bits basados en elementos en las mismas posiciones de índice y produce un nuevo conjunto de bits con los resultados. Si dos elementos en una posición son iguales, en el nuevo conjunto de bits se escribirá <code translate="no">1</code> en esa posición; <code translate="no">0</code> si son diferentes.</p>
<h2 id="Implementation" class="common-anchor-header">Implementación<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Bitset es un mecanismo sencillo pero potente que ayuda a Milvus a realizar el filtrado de atributos, la eliminación de datos y la consulta con Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Filtrado de atributos</h3><p>Como los bitsets contienen sólo dos valores posibles, son perfectos para almacenar los resultados del <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">filtrado de atributos</a>. Los datos que cumplen los requisitos de un determinado filtro de atributos se marcan con <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Eliminación de datos</h3><p>Los conjuntos de bits son una forma compacta de almacenar información sobre si se ha eliminado una fila de un segmento. Las entidades eliminadas se marcan con <code translate="no">1</code> en el bitset correspondiente, que <a href="https://milvus.io/blog/deleting-data-in-milvus.md">no se computará</a> durante una búsqueda o consulta.</p>
<h2 id="Examples" class="common-anchor-header">Ejemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Aquí presentamos tres ejemplos que ilustran cómo se utilizan los conjuntos de bits en Milvus, con referencias a las tres principales implementaciones de conjuntos de bits comentadas anteriormente. En los tres casos, hay un segmento con 8 entidades y a continuación tiene lugar una serie de eventos del lenguaje de manipulación de datos (DML) en el orden que se muestra a continuación.</p>
<ul>
<li>Cuatro de las entidades, cuyas <code translate="no">primary_key</code>s son [1, 2, 3, 4] respectivamente, se insertan cuando la marca de tiempo <code translate="no">ts</code> es igual a 100.</li>
<li>Las cuatro entidades restantes, cuyas <code translate="no">primary_key</code>s son [5, 6, 7, 8], se insertan cuando la marca de tiempo <code translate="no">ts</code> es igual a 200.</li>
<li>Las entidades cuyo <code translate="no">primary_key</code>s es [7, 8] se eliminan cuando la marca de tiempo <code translate="no">ts</code> es igual a 300.</li>
<li>Sólo las entidades cuyo <code translate="no">primary_key</code>s es [1, 3, 5, 7] cumplen las condiciones del filtrado de atributos.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>Orden de los eventos DML</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">Caso 1</h3><p>En este caso, un usuario establece <code translate="no">time_travel</code> como 150, lo que significa que el usuario realiza una consulta sobre datos que satisfacen <code translate="no">ts = 150</code>. El proceso de generación del conjunto de bits se ilustra en la Figura 1.</p>
<p>Durante la etapa de filtrado inicial, el <code translate="no">filter_bitset</code> debe ser <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, donde las entidades [1, 3, 5, 7] se marcan como <code translate="no">1</code> porque son resultados de filtrado válidos.</p>
<p>Sin embargo, las entidades [4, 5, 6, 7] no se insertaron en la base de datos vectorial cuando <code translate="no">ts</code> es igual a 150. Por lo tanto, estas cuatro entidades deberían marcarse como 0 independientemente de la condición de filtrado. Ahora el resultado del conjunto de bits debería ser <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Como se ha comentado en <a href="#data-deletion">Eliminación de datos</a>, las entidades marcadas con <code translate="no">1</code> se ignoran durante una búsqueda o consulta. Ahora hay que invertir el resultado del conjunto de bits para combinarlo con el mapa de bits de borrado, lo que nos da <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>En cuanto al conjunto de bits de borrado <code translate="no">del_bitset</code>, el valor inicial debería ser <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Sin embargo, las entidades 7 y 8 no se borran hasta que <code translate="no">ts</code> es 300. Por lo tanto, cuando <code translate="no">ts</code> es 150, las entidades 7 y 8 siguen siendo válidas. Como resultado, el valor de <code translate="no">del_bitset</code> después del Viaje en el Tiempo es <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ahora tenemos dos conjuntos de bits después del Viaje en el Tiempo y el filtrado de atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> y <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Combina estos dos conjuntos de bits con el operador lógico binario <code translate="no">OR</code>. El valor final de result_bitset es <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, lo que significa que sólo se computarán las entidades 1 y 3 en la siguiente etapa de búsqueda o consulta.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>Figura 1. Búsqueda con Time Travel = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">Caso 2</h3><p>En este caso, el usuario establece <code translate="no">time_travel</code> como 250. El proceso de generación del conjunto de bits se ilustra en la Figura 2.</p>
<p>Como en el caso uno, el <code translate="no">filter_bitset</code> inicial es <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Todas las entidades están en la base de datos vectorial cuando <code translate="no">ts</code> = 250. Por lo tanto, <code translate="no">filter_bitset</code> sigue siendo el mismo cuando introducimos la marca de tiempo. De nuevo, tenemos que voltear el resultado y obtener <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>En cuanto al conjunto de bits de borrado <code translate="no">del_bitset</code>, el valor inicial es <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Sin embargo, las entidades 7 y 8 no se borraron hasta que <code translate="no">ts</code> es 300. Por lo tanto, cuando <code translate="no">ts</code> es 250, las entidades 7 y 8 siguen siendo válidas. Como resultado, el <code translate="no">del_bitset</code> después del Viaje en el Tiempo es <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ahora tenemos dos conjuntos de bits después del Viaje en el Tiempo y el filtrado de atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> y <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Combina estos dos conjuntos de bits con el operador lógico binario <code translate="no">OR</code>. El conjunto_de_bits resultante es <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Es decir, sólo las entidades [1, 3, 5, 7] se computarán en la siguiente etapa de búsqueda o consulta.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>Figura 2. Búsqueda con Time Travel = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">Caso 3</h3><p>En este caso, el usuario establece <code translate="no">time_travel</code> como 350. El proceso de generación del conjunto de bits se ilustra en la Figura 3.</p>
<p>Como en los casos anteriores, el <code translate="no">filter_bitset</code> inicial es <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Todas las entidades se encuentran en la base de datos vectorial cuando <code translate="no">ts</code>= 350. Por lo tanto, el <code translate="no">filter_bitset</code> final volteado es <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, igual que en el caso dos.</p>
<p>En cuanto al conjunto de bits de borrado <code translate="no">del_bitset</code>, puesto que las entidades 7 y 8 ya han sido borradas cuando <code translate="no">ts = 350</code>, por lo tanto, el resultado de <code translate="no">del_bitset</code> es <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Ahora tenemos dos conjuntos de bits después del viaje en el tiempo y el filtrado de atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> y <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Combina estos dos conjuntos de bits con el operador lógico binario <code translate="no">OR</code>. El último <code translate="no">result_bitset</code> es <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Es decir, en la siguiente etapa de búsqueda o consulta sólo se computarán las entidades [1, 3, 5].</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>Figura 3. Búsqueda con Time Travel = 350</span>. </span></p>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora que ya sabe cómo funcionan los conjuntos de bits en Milvus, puede que también quiera</p>
<ul>
<li>Aprender a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utilizar cadenas para filtrar</a> los resultados de la búsqueda, o consultar <a href="https://milvus.io/docs/hybridsearch.md">Búsqueda híbrida</a> en nuestra documentación.</li>
<li>Comprender <a href="https://milvus.io/docs/v2.1.x/data_processing.md">cómo se procesan los datos</a> en Milvus.</li>
</ul>
