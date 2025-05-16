---
id: time_sync.md
title: Sincronización horaria
summary: Conozca el sistema de sincronización horaria de Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Sincronización horaria<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta el mecanismo de sincronización horaria en Milvus.</p>
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
    </button></h2><p>Los eventos en Milvus pueden clasificarse generalmente en dos tipos:</p>
<ul>
<li><p>Eventos de lenguaje de definición de datos (DDL): crear/soltar una colección, crear/soltar una partición, etc.</p></li>
<li><p>Eventos de lenguaje de manipulación de datos (DML): insertar, buscar, etc.</p></li>
</ul>
<p>Cualquier evento, ya sea DDL o DML, se marca con una marca de tiempo que puede indicar cuándo se produce.</p>
<p>Supongamos que hay dos usuarios que inician una serie de eventos DML y DDL en Milvus en el orden temporal que se muestra en la siguiente tabla.</p>
<table>
<thead>
<tr><th style="text-align:center">Marca de tiempo</th><th style="text-align:center">Usuario 1</th><th style="text-align:center">Usuario 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Creó una colección llamada <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Realizada una búsqueda en la colección <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Datos insertados <code translate="no">A1</code> en la colección <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Búsqueda en la colección <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Inserción de datos <code translate="no">A2</code> en la colección <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Búsqueda en la colección <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Borrados los datos <code translate="no">A1</code> de la colección <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Realizada una búsqueda en la colección <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>Idealmente, el usuario 2 debería poder ver</p>
<ul>
<li><p>Una colección vacía <code translate="no">C0</code> en <code translate="no">t2</code>.</p></li>
<li><p>Los datos <code translate="no">A1</code> en <code translate="no">t7</code>.</p></li>
<li><p>Los datos <code translate="no">A1</code> y <code translate="no">A2</code> en <code translate="no">t12</code>.</p></li>
<li><p>Sólo los datos <code translate="no">A2</code> en <code translate="no">t17</code> (ya que los datos <code translate="no">A1</code> se han eliminado de la colección antes de este punto).</p></li>
</ul>
<p>Este escenario ideal puede alcanzarse fácilmente cuando sólo hay un único nodo. Sin embargo, Milvus es una base de datos vectorial distribuida, y para garantizar que todas las operaciones DML y DDL en diferentes nodos se mantienen en orden, Milvus necesita abordar las dos cuestiones siguientes:</p>
<ol>
<li><p>El reloj de tiempo es diferente para los dos usuarios del ejemplo anterior si están en nodos diferentes. Por ejemplo, si el usuario 2 está 24 horas por detrás del usuario 1, todas las operaciones del usuario 1 no son visibles para el usuario 2 hasta el día siguiente.</p></li>
<li><p>Puede haber latencia de red. Si el usuario 2 realiza una búsqueda en la colección <code translate="no">C0</code> en <code translate="no">t17</code>, Milvus debería poder garantizar que todas las operaciones anteriores a <code translate="no">t17</code> se procesan y completan con éxito. Si la operación de borrado en <code translate="no">t15</code> se retrasa debido a la latencia de la red, es muy probable que el usuario 2 pueda seguir viendo los datos supuestamente borrados <code translate="no">A1</code> al realizar una búsqueda en <code translate="no">t17</code>.</p></li>
</ol>
<p>Por lo tanto, Milvus adopta un sistema de sincronización temporal (timetick) para resolver los problemas.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Oráculo de marcas de tiempo (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>Para resolver el primer problema mencionado en la sección anterior, Milvus, al igual que otros sistemas distribuidos, proporciona un servicio de oráculo de marca de tiempo (TSO). Esto significa que todos los eventos en Milvus deben ser asignados con una marca de tiempo del TSO en lugar del reloj local.</p>
<p>El servicio TSO lo proporciona el coordinador raíz de Milvus. Los clientes pueden asignar una o más marcas de tiempo en una única solicitud de asignación de marca de tiempo.</p>
<p>Una marca de tiempo TSO es un tipo de valor <code translate="no">uint64</code> que se compone de una parte física y una parte lógica. La siguiente figura muestra el formato de una marca de tiempo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>Como se muestra, los 46 bits del principio son la parte física, es decir, la hora UTC en milisegundos. Los últimos 18 bits son la parte lógica.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Sistema de sincronización horaria (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección utiliza el ejemplo de una operación de inserción de datos para explicar el mecanismo de sincronización de tiempo en Milvus.</p>
<p>Cuando el proxy recibe una solicitud de inserción de datos del SDK, divide los mensajes de inserción en diferentes flujos de mensajes (<code translate="no">MsgStream</code>) según el valor hash de las claves primarias.</p>
<p>A cada mensaje de inserción (<code translate="no">InsertMsg</code>) se le asigna una marca de tiempo antes de ser enviado a <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> es una envoltura de la cola de mensajes, que es Pulsar por defecto en Milvus 2.0.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>Un principio general es que en <code translate="no">MsgStream</code>, las marcas de tiempo de<code translate="no">InsertMsgs</code> del mismo proxy deben ser incrementales. Sin embargo, no existe tal regla para las de <code translate="no">InsertMsgs</code> procedentes de proxies diferentes.</p>
<p>La siguiente figura es un ejemplo de <code translate="no">InsertMsgs</code> en un <code translate="no">MsgStream</code>. El fragmento contiene cinco <code translate="no">InsertMsgs</code>, tres de los cuales proceden de <code translate="no">Proxy1</code> y el resto de <code translate="no">Proxy2</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>Las marcas de tiempo de los tres <code translate="no">InsertMsgs</code> de <code translate="no">Proxy1</code> son incrementales, al igual que las de los dos <code translate="no">InsertMsgs</code> de <code translate="no">Proxy2</code>. Sin embargo, no existe un orden concreto entre <code translate="no">Proxy1</code> y <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>Un escenario posible es que al leer un mensaje con timestamp <code translate="no">110</code> de <code translate="no">Proxy2</code>, Milvus encuentre que el mensaje con timestamp <code translate="no">80</code> de <code translate="no">Proxy1</code> está todavía en <code translate="no">MsgStream</code>. Por lo tanto, Milvus introduce un sistema de sincronización de tiempo, timetick, para asegurar que al leer un mensaje de <code translate="no">MsgStream</code>, todos los mensajes con valores timestamp más pequeños deben ser consumidos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>sincronización_temporal</span> </span></p>
<p>Como se muestra en la figura anterior,</p>
<ul>
<li><p>Cada proxy informa periódicamente (cada 200 ms por defecto) del mayor valor de timestamp del último <code translate="no">InsertMsg</code> en el <code translate="no">MsgStream</code>a root coord.</p></li>
<li><p>Root coord identifica el valor mínimo de timestamp en este <code translate="no">Msgstream</code>, sin importar a qué proxy pertenece el <code translate="no">InsertMsgs</code>. A continuación, root coord inserta este timestamp mínimo en <code translate="no">Msgstream</code>. Este timestamp también se denomina timetick.</p></li>
<li><p>Cuando los componentes consumidores leen la marca de tiempo insertada por root coord, entienden que se han consumido todos los mensajes de inserción con valores de marca de tiempo menores. Por lo tanto, las peticiones relevantes pueden ejecutarse de forma segura sin interrumpir el orden.</p></li>
</ul>
<p>La siguiente figura es un ejemplo de <code translate="no">Msgstream</code> con un timetick insertado.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>timetick</span> </span></p>
<p><code translate="no">MsgStream</code> procesa los mensajes por lotes en función de la marca de tiempo para garantizar que los mensajes de salida cumplen los requisitos de la marca de tiempo.</p>
<h2 id="Whats-next" class="common-anchor-header">A continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Conozca el concepto de <a href="/docs/es/v2.4.x/timestamp.md">marca de tiempo</a>.</li>
<li>Conozca el <a href="/docs/es/v2.4.x/data_processing.md">flujo de trabajo de procesamiento de datos</a> en Milvus.</li>
</ul>
