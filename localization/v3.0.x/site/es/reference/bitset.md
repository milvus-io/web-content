---
id: bitset.md
summary: Infórmate sobre los conjuntos de bits en Milvus.
title: Conjunto de bits
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
    </button></h1><p>En este tema se presenta el mecanismo de conjunto de bits, que permite habilitar funcionalidades clave como el filtrado por atributos y <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">las operaciones de eliminación</a> en Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Un conjunto de bits es un conjunto de bits. Los bits son elementos con solo dos valores posibles, normalmente « <code translate="no">0</code> » y « <code translate="no">1</code> », o valores booleanos « <code translate="no">true</code> » y « <code translate="no">false</code> ». En Milvus, los conjuntos de bits son matrices de números de bits « <code translate="no">0</code> » y « <code translate="no">1</code> » que pueden utilizarse para representar determinados datos de forma compacta y eficiente, a diferencia de los tipos «int», «float» o «char». Un número de bits es, por defecto, de tipo « <code translate="no">0</code> » y solo se establece como « <code translate="no">1</code> » si cumple ciertos requisitos.</p>
<p>Las operaciones con conjuntos de bits se realizan mediante <a href="/docs/es/boolean.md">lógica booleana</a>, según la cual un valor de salida es válido o inválido, lo que se denota también como <code translate="no">1</code> y <code translate="no">0</code>, respectivamente. Por ejemplo, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">el operador lógico</a> <code translate="no">AND</code> puede utilizarse para comparar dos conjuntos de bits basándose en los elementos situados en las mismas posiciones de índice y genera un nuevo conjunto de bits con los resultados. Si dos elementos en una posición son iguales, en el nuevo conjunto de bits se escribirá <code translate="no">1</code> en esa posición; <code translate="no">0</code> si son diferentes.</p>
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
    </button></h2><p>El conjunto de bits es un mecanismo sencillo pero potente que ayuda a Milvus a realizar el filtrado por atributos, la eliminación de datos y las consultas con Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Filtrado por atributos<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>Dado que los conjuntos de bits solo contienen dos valores posibles, son perfectos para almacenar los resultados del <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">filtrado por atributos</a>. Los datos que cumplen los requisitos de un filtro de atributos determinado se marcan con <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Eliminación de datos<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>Los conjuntos de bits sirven como una forma compacta de almacenar información sobre si una fila de un segmento ha sido eliminada. Las entidades eliminadas se marcan con « <code translate="no">1</code> » en el conjunto de bits correspondiente, que <a href="https://milvus.io/blog/deleting-data-in-milvus.md">no se tendrá en cuenta</a> durante una búsqueda o consulta.</p>
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
    </button></h2><p>A continuación presentamos tres ejemplos que ilustran cómo se utilizan los conjuntos de bits en Milvus, con referencias a las tres principales implementaciones de conjuntos de bits mencionadas anteriormente. En los tres casos, hay un segmento con 8 entidades y, a continuación, tiene lugar una serie de eventos del lenguaje de manipulación de datos (DML) en el orden que se muestra a continuación.</p>
<ul>
<li>Cuatro de las entidades, cuyos « <code translate="no">primary_key</code>» son [1, 2, 3, 4] respectivamente, se insertan cuando la marca de tiempo « <code translate="no">ts</code> » es igual a 100.</li>
<li>Las cuatro entidades restantes, cuyos valores de « <code translate="no">primary_key</code>» son [5, 6, 7, 8], se insertan cuando la marca de tiempo <code translate="no">ts</code> es igual a 200.</li>
<li>Las entidades cuyos valores de « <code translate="no">primary_key</code>» son [7, 8] se eliminan cuando la marca de tiempo <code translate="no">ts</code> es igual a 300.</li>
<li>Solo las entidades cuyos valores de « <code translate="no">primary_key</code>» sean [1, 3, 5, 7] cumplen las condiciones del filtrado de atributos.</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>Orden de los eventos DML</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">Caso uno<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>En este caso, un usuario establece <code translate="no">time_travel</code> en 150, lo que significa que el usuario realiza una consulta sobre los datos que cumplen <code translate="no">ts = 150</code>. El proceso de generación del conjunto de bits se ilustra en la figura 1.</p>
<p>Durante la fase inicial de filtrado, el valor de « <code translate="no">filter_bitset</code> » debe ser « <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> », donde las entidades [1, 3, 5, 7] se marcan como « <code translate="no">1</code> » porque son resultados de filtrado válidos.</p>
<p>Sin embargo, las entidades [5, 6, 7, 8] no se insertaron en la base de datos vectorial cuando <code translate="no">ts</code> era igual a 150. Por lo tanto, estas cuatro entidades deben marcarse como 0 independientemente de la condición de filtrado. Ahora, el resultado del conjunto de bits debe ser <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Tal y como se explica en <a href="#data-deletion">«Eliminación de datos»</a>, las entidades marcadas con <code translate="no">1</code> se ignoran durante una búsqueda o consulta. Ahora es necesario invertir el resultado del conjunto de bits para combinarlo con el mapa de bits de eliminación, lo que nos da <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>En cuanto al conjunto de bits de eliminación <code translate="no">del_bitset</code>, el valor inicial debería ser <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Sin embargo, las entidades 7 y 8 no se eliminan hasta que <code translate="no">ts</code> sea 300. Por lo tanto, cuando <code translate="no">ts</code> es 150, las entidades 7 y 8 siguen siendo válidas. Como resultado, el valor de <code translate="no">del_bitset</code> tras el «Time Travel» es <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ahora disponemos de dos conjuntos de bits tras el «Time Travel» y el filtrado por atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> y <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Combinamos estos dos conjuntos de bits con el operador lógico binario « <code translate="no">OR</code> ». El valor final de «result_bitset» es <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, lo que significa que solo se calcularán las entidades 1 y 3 en la siguiente etapa de búsqueda o consulta.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>Figura 1. Búsqueda con «Time Travel» = 150.</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">Segundo caso<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>En este caso, el usuario establece « <code translate="no">time_travel</code> » en 250. El proceso de generación del conjunto de bits se ilustra en la figura 2.</p>
<p>Al igual que en el primer caso, el valor inicial de « <code translate="no">filter_bitset</code> » es « <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> ».</p>
<p>Todas las entidades se encuentran en la base de datos vectorial cuando <code translate="no">ts</code> = 250. Por lo tanto, el <code translate="no">filter_bitset</code> permanece igual al tener en cuenta la marca de tiempo. De nuevo, debemos invertir el resultado y obtener <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>En cuanto al conjunto de bits de eliminación <code translate="no">del_bitset</code>, el valor inicial es <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Sin embargo, las entidades 7 y 8 no se eliminaron hasta que <code translate="no">ts</code> fue 300. Por lo tanto, cuando <code translate="no">ts</code> es 250, las entidades 7 y 8 siguen siendo válidas. Como resultado, el <code translate="no">del_bitset</code> tras el «Time Travel» es <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ahora tenemos dos conjuntos de bits tras el «Time Travel» y el filtrado por atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> y <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Combinamos estos dos conjuntos de bits con el operador lógico binario « <code translate="no">OR</code> ». El conjunto de bits resultante (result_bitset) es <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Es decir, solo se calcularán las entidades [1, 3, 5, 7] en la siguiente etapa de búsqueda o consulta.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>Figura 2. Búsqueda con «Time Travel» = 250.</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">Caso tres<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>En este caso, el usuario establece « <code translate="no">time_travel</code> » en 350. El proceso de generación del conjunto de bits se ilustra en la figura 3.</p>
<p>Al igual que en los casos anteriores, el « <code translate="no">filter_bitset</code> » inicial es <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Todas las entidades se encuentran en la base de datos vectorial cuando <code translate="no">ts</code>= 350. Por lo tanto, el conjunto de bits final, invertido, <code translate="no">filter_bitset</code> es <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, igual que en el caso dos.</p>
<p>En cuanto al conjunto de bits de eliminación <code translate="no">del_bitset</code>, dado que las entidades 7 y 8 ya se han eliminado cuando <code translate="no">ts = 350</code>, el resultado de <code translate="no">del_bitset</code> es <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Ahora tenemos dos conjuntos de bits tras el «Time Travel» y el filtrado por atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> y <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Combinamos estos dos conjuntos de bits con el operador lógico binario « <code translate="no">OR</code> ». El resultado final de « <code translate="no">result_bitset</code> » es <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Es decir, solo se calcularán las entidades [1, 3, 5] en la siguiente etapa de búsqueda o consulta.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>Figura 3. Búsqueda con «Time Travel» = 350.</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora que ya sabes cómo funcionan los conjuntos de bits en Milvus, quizá también te interese:</p>
<ul>
<li>Aprender a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utilizar cadenas de caracteres para filtrar</a> los resultados de búsqueda, o consultar la sección <a href="https://milvus.io/docs/hybridsearch.md">«Búsqueda híbrida»</a> en nuestra documentación.</li>
<li>Comprender <a href="https://milvus.io/docs/v2.1.x/data_processing.md">cómo se procesan los datos</a> en Milvus.</li>
</ul>
