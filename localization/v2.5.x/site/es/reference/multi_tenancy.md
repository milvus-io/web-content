---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multiarrendamiento en Milvus.
title: Estrategias multiarrendamiento
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Estrategias multiarrendamiento<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>En muchos casos de uso, los desarrolladores quieren ejecutar un clúster Milvus y servir a múltiples inquilinos, como un par de equipos de producto, o millones de usuarios finales. Esta guía explica algunas estrategias diferentes para conseguir multiarrendamiento en Milvus.</p>
<p>Milvus está diseñado para soportar multi-tenancy a nivel de base de datos, colección o partición. El objetivo de la multitenencia es separar los datos y los recursos entre sí. La implementación de la multi-tenencia a diferentes niveles puede lograr diferentes grados de aislamiento, pero también implica diferentes gastos generales. A continuación explicamos sus ventajas y desventajas.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple orientado a la base de datos<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Desde la versión 2.2.9 de Milvus, puede crear múltiples bases de datos en un único cluster Milvus. Esta característica hace posible lograr la multi-tenencia orientada a la base de datos asignando una base de datos para cada inquilino, de modo que puedan crear sus propias colecciones. Este enfoque proporciona el mejor aislamiento de datos y recursos para los inquilinos, pero está limitado a 64 bases de datos en un clúster como máximo.</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple orientado a colecciones<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Hay dos formas posibles de conseguir la multitenencia orientada a colecciones.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">Una colección para todos los inquilinos</h3><p>Utilizar una única colección para implementar la multitenencia añadiendo un campo de inquilino para distinguir entre inquilinos es una opción sencilla. Al realizar búsquedas de RNA para un inquilino específico, añada una expresión de filtro para filtrar todas las entidades que pertenezcan a otros inquilinos. Esta es la forma más sencilla de conseguir la multitenencia. Sin embargo, tenga en cuenta que el rendimiento del filtro puede convertirse en el cuello de botella de las búsquedas RNA. Para mejorar el rendimiento de la búsqueda, puede optimizar con la multitenencia orientada a particiones que se indica a continuación.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">Una colección por tenant</h3><p>Otro enfoque consiste en crear una colección para que cada inquilino almacene sus propios datos, en lugar de almacenar los datos de todos los inquilinos en una única colección. Esto proporciona un mejor aislamiento de los datos y un mejor rendimiento de las consultas. Sin embargo, hay que tener en cuenta que este enfoque requiere más recursos en la programación y está limitado a 10.000 colecciones en un clúster como máximo.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple orientado a particiones<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Hay dos formas de conseguir la multitenencia orientada a particiones:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">Una partición por inquilino</h3><p>Gestionar una única colección es mucho más fácil que gestionar varias. En lugar de crear varias colecciones, considere la posibilidad de asignar una partición a cada inquilino para lograr un aislamiento de datos y una gestión de memoria flexibles. El rendimiento de búsqueda de la multi-tenencia orientada a particiones es mucho mejor que la multi-tenencia orientada a colecciones. Sin embargo, hay que tener en cuenta que el número de inquilinos de la colección no debe superar el número máximo de particiones que puede contener una colección.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Multiarrendamiento basado en claves de partición</h3><p>Milvus 2.2.9 introduce una nueva característica llamada clave de partición. Al crear una colección, nombre un campo de inquilino y conviértalo en el campo de clave de partición. Milvus almacenará entidades en una partición según el valor hash del campo de clave de partición. Al realizar búsquedas RNA, Milvus sólo buscará en la partición que contenga la clave de partición. Esto reducirá en gran medida el alcance de la búsqueda, logrando así un mejor rendimiento que sin clave de partición.</p>
</div>
<p>Esta estrategia elimina el límite del número máximo de inquilinos que puede soportar una colección de Milvus y simplifica enormemente la gestión de recursos porque Milvus gestiona automáticamente las particiones por usted.</p>
<p>Para recapitular, puede utilizar una o varias de las estrategias multi-tenancy anteriores para formar su propia solución. La siguiente tabla compara estas estrategias en términos de aislamiento de datos, rendimiento de búsqueda y número máximo de inquilinos.</p>
<table>
<thead>
<tr><th></th><th>Aislamiento de datos</th><th>Rendimiento de búsqueda</th><th>Número máximo de inquilinos</th><th>Escenarios recomendados</th></tr>
</thead>
<tbody>
<tr><td>Orientado a la base de datos</td><td>Fuerte</td><td>Fuerte</td><td>64</td><td>Para aquellos que requieren que las colecciones varíen con los proyectos, especialmente adecuado para el aislamiento de datos entre los departamentos de su organización.</td></tr>
<tr><td>Una colección para todos</td><td>Débil</td><td>Media</td><td>N/A</td><td>Para aquellos que tienen recursos limitados y son insensibles al aislamiento de datos.</td></tr>
<tr><td>Una recopilación por inquilino</td><td>Fuerte</td><td>Fuerte</td><td>Menos de 10.000</td><td>Para aquellos que tienen menos de 10.000 inquilinos por clúster.</td></tr>
<tr><td>Una partición por inquilino</td><td>Media</td><td>Fuerte</td><td>1,024</td><td>Para aquellos que tienen menos de 1.024 inquilinos por colección.</td></tr>
<tr><td>Basado en clave de partición</td><td>Media</td><td>Fuerte</td><td>10,000,000+</td><td>Para aquellos que prevén un rápido aumento de inquilinos a millones.</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">Lo que viene después<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/es/manage_databases.md">Gestionar</a><a href="/docs/es/schema.md">el esquema de</a><a href="/docs/es/manage_databases.md">las bases de datos</a></p>
