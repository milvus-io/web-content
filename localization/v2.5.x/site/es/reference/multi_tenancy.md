---
id: multi_tenancy.md
title: Implemente la tenencia múltiple
summary: >-
  En Milvus, multiarrendamiento significa que varios clientes o equipos
  -denominados arrendatarios- comparten el mismo clúster manteniendo entornos de
  datos aislados.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Implemente la tenencia múltiple<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, multiarrendamiento significa que varios clientes o equipos (denominados <strong>arrendatarios)</strong>comparten el mismo clúster manteniendo entornos de datos aislados.</p>
<p>Milvus admite cuatro estrategias de multiarrendamiento, cada una de las cuales ofrece un equilibrio diferente entre escalabilidad, aislamiento de datos y flexibilidad. Esta guía le guiará a través de cada opción, ayudándole a elegir la estrategia más adecuada para su caso de uso.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Estrategias multi-tenencia<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite la multitenencia en cuatro niveles: <strong>Base de datos</strong>, <strong>Colección</strong>, <strong>Partición</strong> y <strong>Clave de partición</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple a nivel de base de datos</h3><p>Con la multitenencia a nivel de base de datos, cada arrendatario recibe una <a href="/docs/es/manage_databases.md">base de datos</a> correspondiente que contiene una o más colecciones.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multiarrendamiento a nivel de base de datos</span> </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: La estrategia de multiarrendamiento a nivel de base de datos admite un máximo de 64 inquilinos por defecto.</p></li>
<li><p><strong>Aislamiento de datos</strong>: Los datos de cada base de datos están totalmente separados, lo que ofrece un aislamiento de datos de nivel empresarial ideal para entornos regulados o clientes con necesidades de cumplimiento estricto.</p></li>
<li><p><strong>Flexibilidad</strong>: Cada base de datos puede tener colecciones con diferentes esquemas, ofreciendo una organización de datos altamente flexible y permitiendo que cada inquilino tenga su propio esquema de datos.</p></li>
<li><p><strong>Otros</strong>: Esta estrategia también admite RBAC, lo que permite un control detallado del acceso de los usuarios por tenant. Además, puede cargar o liberar datos de forma flexible para inquilinos específicos con el fin de gestionar eficazmente los datos calientes y fríos.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple a nivel de colección</h3><p>Con la tenencia múltiple a nivel de colecciones, a cada inquilino se le asigna una <a href="/docs/es/manage-collections.md">colección</a>, lo que ofrece un fuerte aislamiento de los datos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multiarrendamiento a nivel de colecciones</span> </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: Dado que un clúster puede albergar hasta 65.536 colecciones por defecto, esta estrategia puede acomodar el mismo número de inquilinos dentro del clúster.</p></li>
<li><p><strong>Aislamiento de datos</strong>: Las colecciones están físicamente aisladas unas de otras. Esta estrategia proporciona un fuerte aislamiento de datos.</p></li>
<li><p><strong>Flexibilidad</strong>: Esta estrategia permite que cada colección tenga su propio esquema, dando cabida a inquilinos con diferentes esquemas de datos.</p></li>
<li><p><strong>Otros</strong>: Esta estrategia también admite RBAC, lo que permite un control de acceso granular sobre los inquilinos. Además, puede cargar o liberar datos de forma flexible para inquilinos específicos con el fin de gestionar eficazmente los datos calientes y fríos.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple a nivel de partición</h3><p>En la multitenencia a nivel de partición, cada inquilino se asigna a una <a href="/docs/es/manage-partitions.md">partición</a> creada manualmente dentro de una colección compartida.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multitenencia a nivel</span> </span>de <span class="img-wrapper"> <span>partición</span> </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: Una colección puede albergar hasta 1.024 particiones por colección, permitiendo el mismo número de inquilinos dentro de ella.</p></li>
<li><p><strong>Aislamiento de datos</strong>: Los datos de cada inquilino están físicamente separados por particiones.</p></li>
<li><p><strong>Flexibilidad</strong>: Esta estrategia requiere que todos los inquilinos compartan el mismo esquema de datos. Y las particiones deben crearse manualmente.</p></li>
<li><p><strong>Otros problemas</strong>: No se admite RBAC a nivel de partición. Los inquilinos pueden ser consultados individualmente o a través de múltiples particiones, lo que hace que este enfoque sea adecuado para escenarios que implican consultas agregadas o análisis a través de segmentos de inquilinos. Además, puede cargar o liberar datos de forma flexible para inquilinos específicos con el fin de gestionar eficazmente los datos calientes y fríos.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple a nivel de clave de partición</h3><p>Con esta estrategia, todos los inquilinos comparten una única colección y esquema, pero los datos de cada inquilino se dirigen automáticamente a 16 particiones físicamente aisladas en función del valor de <a href="/docs/es/use-partition-key.md">la clave de partición</a>. Aunque cada partición física puede contener varios inquilinos, los datos de los distintos inquilinos permanecen lógicamente separados.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Nivel de clave de partición Multitenencia</span> </span></p>
<ul>
<li><p><strong>Escalabilidad</strong>: La estrategia a nivel de clave de partición ofrece el enfoque más escalable, soportando millones de inquilinos.</p></li>
<li><p><strong>Aislamiento de datos</strong>: Esta estrategia ofrece un aislamiento de datos relativamente débil porque varios inquilinos pueden compartir una partición física.</p></li>
<li><p><strong>Flexibilidad</strong>: Dado que todos los inquilinos deben compartir el mismo esquema de datos, esta estrategia ofrece una flexibilidad de datos limitada.</p></li>
<li><p><strong>Otros</strong>: No se admite RBAC en el nivel de clave de partición. Los inquilinos pueden ser consultados individualmente o a través de múltiples particiones, lo que hace que este enfoque sea adecuado para escenarios que implican consultas agregadas o análisis a través de segmentos de inquilinos.</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Elegir la estrategia multi-tenancy adecuada<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla ofrece una comparación exhaustiva entre los cuatro niveles de estrategias multitenencia.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Nivel de base de datos</strong></p></th>
     <th><p><strong>A nivel de colección</strong></p></th>
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
     <td><p>Por defecto, 64. Puede aumentarlo modificando el parámetro <code translate="no">maxDatabaseNum</code> en el archivo de configuración Milvus.yaml. </p></td>
     <td><p>Por defecto, 65.536. Puede aumentarlo modificando el parámetro <code translate="no">maxCollectionNum</code> en el archivo de configuración Milvus.yaml.</p></td>
     <td><p>Hasta 1.024 por colección. </p></td>
     <td><p>Millones</p></td>
   </tr>
   <tr>
     <td><p><strong>Flexibilidad del esquema de datos</strong></p></td>
     <td><p>Alta</p></td>
     <td><p>Media</p></td>
     <td><p>Baja</p></td>
     <td><p>Bajo</p></td>
   </tr>
   <tr>
     <td><p><strong>Compatibilidad con RBAC</strong></p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
   </tr>
   <tr>
     <td><p><strong>Rendimiento de la búsqueda</strong></p></td>
     <td><p>Fuerte</p></td>
     <td><p>Fuerte</p></td>
     <td><p>Media</p></td>
     <td><p>Media</p></td>
   </tr>
   <tr>
     <td><p><strong>Soporte de búsqueda entre usuarios</strong></p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
   </tr>
   <tr>
     <td><p><strong>Soporte para la gestión eficaz de datos calientes y fríos</strong></p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
     <td><p>Sí</p></td>
     <td><p>No Actualmente, no se admite para la estrategia a nivel de clave de partición.</p></td>
   </tr>
</table>
<p>Hay varios factores a tener en cuenta cuando se elige la estrategia multi-tenancy en Milvus.</p>
<ol>
<li><p><strong>Escalabilidad:</strong> Clave de partición &gt; Partición &gt; Colección &gt; Base de datos</p>
<p>Si espera soportar un gran número de inquilinos (millones o más), utilice la estrategia a nivel de clave de partición.</p></li>
<li><p><strong>Requisitos estrictos de aislamiento de datos</strong>: Base de datos = Colección &gt; Partición &gt; Clave de partición</p>
<p>Elija estrategias a nivel de base de datos, colección o partición si tiene requisitos estrictos de aislamiento físico de datos.</p></li>
<li><p><strong>Esquema de datos flexible para los datos de cada tenant:</strong> Base de datos &gt; Colección &gt; Partición = Clave de partición</p>
<p>Las estrategias a nivel de base de datos y a nivel de colección proporcionan una flexibilidad total en los esquemas de datos. Si las estructuras de datos de sus inquilinos son diferentes, elija multi-tenancy a nivel de base de datos o a nivel de colección.</p></li>
<li><p><strong>Otros</strong></p>
<ol>
<li><p><strong>Rendimiento:</strong> El rendimiento de la búsqueda viene determinado por varios factores, incluidos los índices, los parámetros de búsqueda y las configuraciones de las máquinas. Milvus también permite ajustar el rendimiento. Se recomienda probar el rendimiento real antes de seleccionar una estrategia de multi-tenencia.</p></li>
<li><p><strong>Gestión eficaz de datos calientes y fríos</strong>: Actualmente, las estrategias a nivel de base de datos, a nivel de colección y a nivel de partición admiten la gestión de datos calientes y fríos.</p></li>
<li><p><strong>Búsquedas entre inquilinos</strong>: Sólo las estrategias a nivel de partición y a nivel de clave de partición admiten consultas entre usuarios.</p></li>
</ol></li>
</ol>
