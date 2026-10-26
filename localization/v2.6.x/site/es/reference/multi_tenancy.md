---
id: multi_tenancy.md
title: Implementar la multitenencia
summary: >-
  En Milvus, la multitenencia significa que varios clientes o equipos
  —denominados «inquilinos»— comparten el mismo clúster, al tiempo que mantienen
  entornos de datos aislados.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Implementar la multitenencia<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, la multitenencia significa que varios clientes o equipos —denominados <strong>«inquilinos»</strong>— comparten el mismo clúster, al tiempo que mantienen entornos de datos aislados.</p>
<p>Milvus admite cuatro estrategias de multitenencia, cada una de las cuales ofrece un equilibrio diferente entre escalabilidad, aislamiento de datos y flexibilidad. Esta guía te explica cada opción, ayudándote a elegir la estrategia más adecuada para tu caso de uso.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Estrategias de multitenencia<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite la multitenencia en cuatro niveles: <strong>base de datos</strong>, <strong>colección</strong>, <strong>partición</strong> y <strong>clave de partición</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Multitenencia a nivel de base de datos<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Con la multitenencia a nivel de base de datos, cada inquilino recibe una <a href="/docs/es/v2.6.x/manage_databases.md">base de datos</a> correspondiente que contiene una o más colecciones.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>Multitenencia a nivel de base de datos</span>
  
 </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: la estrategia de multitenencia a nivel de base de datos admite un máximo de 64 inquilinos de forma predeterminada.</p></li>
<li><p><strong>Aislamiento de datos</strong>: Los datos de cada base de datos están totalmente separados, lo que ofrece un aislamiento de datos de nivel empresarial ideal para entornos regulados o clientes con estrictas necesidades de cumplimiento normativo.</p></li>
<li><p><strong>Flexibilidad</strong>: cada base de datos puede contener colecciones con esquemas diferentes, lo que ofrece una organización de datos muy flexible y permite que cada inquilino tenga su propio esquema de datos.</p></li>
<li><p><strong>Otros</strong>: Esta estrategia también admite RBAC, lo que permite un control minucioso del acceso de los usuarios por inquilino. Además, se pueden cargar o liberar datos de forma flexible para inquilinos específicos, con el fin de gestionar eficazmente los datos activos y los datos inactivos.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multitenencia a nivel de colección<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Con la multitenencia a nivel de colección, a cada inquilino se le asigna una <a href="/docs/es/v2.6.x/manage-collections.md">colección</a>, lo que ofrece un sólido aislamiento de datos.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>Multitenencia a nivel de colección</span>
  
 </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: dado que un clúster puede albergar hasta 65 536 colecciones de forma predeterminada, esta estrategia puede dar cabida al mismo número de inquilinos dentro del clúster.</p></li>
<li><p><strong>Aislamiento de datos</strong>: Las colecciones están físicamente aisladas unas de otras. Esta estrategia proporciona un fuerte aislamiento de datos.</p></li>
<li><p><strong>Flexibilidad</strong>: esta estrategia permite que cada colección tenga su propio esquema, lo que da cabida a inquilinos con diferentes esquemas de datos.</p></li>
<li><p><strong>Otros</strong>: esta estrategia también es compatible con RBAC, lo que permite un control de acceso granular sobre los inquilinos. Además, permite cargar o liberar datos de forma flexible para inquilinos específicos, con el fin de gestionar eficazmente los datos activos y los inactivos.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multitenencia a nivel de partición<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>En la multitenencia a nivel de partición, cada inquilino se asigna a una <a href="/docs/es/v2.6.x/manage-partitions.md">partición</a> creada manualmente dentro de una colección compartida.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>Multitenencia a nivel de partición</span>
  
 </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: una colección puede contener hasta 1.024 particiones por colección, lo que permite albergar el mismo número de inquilinos en su interior.</p></li>
<li><p><strong>Aislamiento de datos</strong>: los datos de cada inquilino están separados físicamente por particiones.</p></li>
<li><p><strong>Flexibilidad</strong>: esta estrategia requiere que todos los inquilinos compartan el mismo esquema de datos. Además, las particiones deben crearse manualmente.</p></li>
<li><p><strong>Otros</strong>: El modelo RBAC no es compatible a nivel de partición. Las consultas a los inquilinos pueden realizarse de forma individual o a través de varias particiones, lo que hace que este enfoque sea muy adecuado para escenarios que impliquen consultas agregadas o análisis entre segmentos de inquilinos. Además, puedes cargar o liberar datos de forma flexible para inquilinos específicos, con el fin de gestionar eficazmente los datos activos y los datos inactivos.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multitenencia a nivel de clave de partición<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Con esta estrategia, todos los inquilinos comparten una única colección y un único esquema, pero los datos de cada inquilino se distribuyen automáticamente en 16 particiones físicamente aisladas en función del valor <a href="/docs/es/v2.6.x/use-partition-key.md">de la clave de partición</a>. Aunque cada partición física puede contener varios inquilinos, los datos de los distintos inquilinos permanecen separados lógicamente.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>Multitenencia a nivel de clave de partición</span>
  
 </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: La estrategia a nivel de clave de partición ofrece el enfoque más escalable, ya que admite millones de inquilinos.</p></li>
<li><p><strong>Aislamiento de datos</strong>: esta estrategia ofrece un aislamiento de datos relativamente débil, ya que varios inquilinos pueden compartir una partición física.</p></li>
<li><p><strong>Flexibilidad</strong>: dado que todos los inquilinos deben compartir el mismo esquema de datos, esta estrategia ofrece una flexibilidad de datos limitada.</p></li>
<li><p><strong>Otros</strong>: No se admite RBAC a nivel de clave de partición. Las consultas a los inquilinos pueden realizarse de forma individual o a través de varias particiones, lo que hace que este enfoque sea muy adecuado para escenarios que impliquen consultas agregadas o análisis entre segmentos de inquilinos.</p></li>
</ul>
<div class="alert note">
<p>Recomendamos crear un índice escalar en el campo de la clave de partición. Dado que cada partición física contiene varios inquilinos, Milvus evalúa el filtro de inquilinos con respecto a cada entidad de las particiones buscadas y, sin un índice, esto supone un escaneo completo. Para obtener más detalles, consulta <a href="/docs/es/v2.6.x/use-partition-key.md#Index-Partition-Key">«Indexar la clave de partición</a>».</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Elección de la estrategia de multitenencia adecuada<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabla siguiente ofrece una comparación exhaustiva entre los cuatro niveles de estrategias de multitenencia.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Nivel de base de datos</strong></p></th>
     <th><p><strong>Nivel de colección</strong></p></th>
     <th><p><strong>Nivel de partición</strong></p></th>
     <th><p><strong>Nivel de clave de partición</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Aislamiento de datos</strong></p></td>
     <td><p>Físico</p></td>
     <td><p>Físico</p></td>
     <td><p>Físico</p></td>
     <td><p>Físico + Lógico</p></td>
   </tr>
   <tr>
     <td><p><strong>Número máximo de inquilinos</strong></p></td>
     <td><p>Por defecto, 64. Puedes aumentarlo modificando el parámetro « <code translate="no">maxDatabaseNum</code> » en el archivo de configuración Milvus.yaml. </p></td>
     <td><p>Por defecto, 65 536. Se puede aumentar modificando el parámetro « <code translate="no">maxCollectionNum</code> » en el archivo de configuración Milvus.yaml.</p></td>
     <td><p>Hasta 1.024 por colección. </p></td>
     <td><p>Millones</p></td>
   </tr>
   <tr>
     <td><p><strong>Flexibilidad del esquema de datos</strong></p></td>
     <td><p>Alta</p></td>
     <td><p>Media</p></td>
     <td><p>Baja</p></td>
     <td><p>Baja</p></td>
   </tr>
   <tr>
     <td><p><strong>Compatibilidad con RBAC</strong></p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
   </tr>
   <tr>
     <td><p><strong>Rendimiento de búsqueda</strong></p></td>
     <td><p>Sólido</p></td>
     <td><p>Sólido</p></td>
     <td><p>Medio</p></td>
     <td><p>Medio</p></td>
   </tr>
   <tr>
     <td><p><strong>Compatibilidad con la búsqueda entre inquilinos</strong></p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
   </tr>
   <tr>
     <td><p><strong>Compatibilidad con la gestión eficaz de datos activos e inactivos</strong></p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
     <td><p>No Actualmente, no es compatible con la estrategia a nivel de clave de partición.</p></td>
   </tr>
</table>
<p>Hay varios factores que hay que tener en cuenta al elegir la estrategia de multitenencia en Milvus.</p>
<ol>
<li><p><strong>Escalabilidad:</strong> Clave de partición &gt; Partición &gt; Colección &gt; Base de datos</p>
<p>Si se prevé dar soporte a un número muy elevado de inquilinos (millones o más), utilice la estrategia a nivel de clave de partición.</p></li>
<li><p><strong>Requisitos estrictos de aislamiento de datos</strong>: Base de datos = Colección &gt; Partición &gt; Clave de partición</p>
<p>Elige estrategias a nivel de base de datos, colección o partición si tienes requisitos estrictos de aislamiento físico de datos.</p></li>
<li><p><strong>Esquema de datos flexible para los datos de cada inquilino:</strong> Base de datos &gt; Colección &gt; Partición = Clave de partición</p>
<p>Las estrategias a nivel de base de datos y de colección ofrecen total flexibilidad en los esquemas de datos. Si las estructuras de datos de tus clientes son diferentes, elige la multitenencia a nivel de base de datos o de colección.</p></li>
<li><p><strong>Otros</strong></p>
<ol>
<li><p><strong>Rendimiento:</strong> El rendimiento de las búsquedas viene determinado por diversos factores, entre los que se incluyen los índices, los parámetros de búsqueda y las configuraciones de los equipos. Milvus también admite el ajuste del rendimiento. Se recomienda comprobar el rendimiento real antes de seleccionar una estrategia de multitenencia.</p></li>
<li><p><strong>Gestión eficaz de datos activos y inactivos</strong>: Actualmente, las estrategias a nivel de base de datos, de colección y de partición admiten la gestión de datos activos e inactivos.</p></li>
<li><p><strong>Búsquedas entre inquilinos</strong>: Solo las estrategias a nivel de partición y a nivel de clave de partición admiten consultas entre inquilinos.</p></li>
</ol></li>
</ol>
