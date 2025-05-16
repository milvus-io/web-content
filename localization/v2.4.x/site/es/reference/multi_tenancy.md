---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multiarrendamiento en Milvus.
title: Estrategias multi-tenancy
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Estrategias multi-tenancy<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>A medida que ChatGPT gana popularidad, más desarrolladores crean sus propios servicios SaaS utilizando la pila CVP (ChatGPT, base de datos vectorial, Prompt). Esta guía explica cómo conseguir multitenencia en Milvus, una de las bases de datos vectoriales más utilizadas del mundo, para seguir esta tendencia.</p>
<p>El multiarrendamiento es una arquitectura en la que una única instancia de Milvus sirve a varios arrendatarios. La forma más sencilla de distinguir a los inquilinos es separar sus datos y recursos de los de los demás. Cada arrendatario tiene sus propios recursos dedicados o comparte recursos con otros para gestionar objetos Milvus como bases de datos, colecciones y particiones. En función de estos objetos, existen métodos correspondientes para conseguir la multitenencia de Milvus.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">Arrendamiento múltiple orientado a bases de datos<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Desde la versión 2.2.9 de Milvus, está disponible la base de datos de objetos. Puede crear múltiples bases de datos en un único clúster Milvus. Esta nueva característica permite conseguir multitenencia orientada a bases de datos asignando una base de datos a cada inquilino, de forma que puedan crear sus propias colecciones y particiones para sacar el máximo partido a sus datos. Sin embargo, esta estrategia garantiza el aislamiento de los datos y el rendimiento de las búsquedas para los inquilinos, pero pueden desperdiciarse recursos en inquilinos ociosos.</p>
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
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">Una colección para todos los inquilinos</h3><p>Utilizar una única colección para implementar la multitenencia añadiendo un campo de inquilino para distinguir entre inquilinos es una opción sencilla. Al realizar búsquedas de RNA para un inquilino específico, añada una expresión de filtro para filtrar todas las entidades que pertenezcan a otros inquilinos. Esta es la forma más sencilla de conseguir la multitenencia. Sin embargo, tenga en cuenta que el rendimiento del filtro puede convertirse en el cuello de botella de las búsquedas RNA.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">Una colección por inquilino</h3><p>Otro enfoque consiste en crear una colección para que cada inquilino almacene sus propios datos, en lugar de almacenar los datos de todos los inquilinos en una única colección. Esto proporciona un mejor aislamiento de los datos y un mejor rendimiento de las consultas. Sin embargo, tenga en cuenta que este enfoque requiere una mayor inversión en programación de recursos, capacidad operativa y costes, y puede no ser aplicable si el número de arrendatarios supera el número máximo de colecciones que admite un único clúster Milvus.</p>
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
    </button></h2><p>También hay dos formas posibles de lograr la multitenencia orientada a particiones:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">Una partición por inquilino</h3><p>Gestionar una única colección es mucho más fácil que gestionar varias. En lugar de crear varias colecciones, considere la posibilidad de asignar una partición a cada inquilino para lograr un aislamiento de datos y una gestión de memoria flexibles. El rendimiento de búsqueda de la multi-tenencia orientada a particiones es mucho mejor que la multi-tenencia orientada a colecciones. Sin embargo, hay que tener en cuenta que el número de inquilinos de la colección no debe superar el número máximo de particiones que puede contener una colección.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Multiarrendamiento basado en claves de partición</h3><p>Milvus 2.2.9 introduce una nueva característica llamada clave de partición. Al crear una colección, nombre un campo de inquilino y conviértalo en el campo de clave de partición. Milvus almacenará las entidades en una partición según los valores del campo de clave de partición. Al realizar búsquedas RNA, Milvus cambia a una partición basada en la clave de partición especificada, filtra las entidades según la clave de partición y busca entre las entidades filtradas.</p>
</div>
<p>Esta estrategia elimina el límite del número máximo de inquilinos que puede soportar una colección Milvus y simplifica enormemente la gestión de recursos porque Milvus gestiona automáticamente las particiones por usted.</p>
<p>Para recapitular, puede utilizar una o varias de las estrategias multiarrendamiento anteriores para crear su propia solución. La siguiente tabla compara estas estrategias en términos de aislamiento de datos, rendimiento de búsqueda y número máximo de inquilinos.</p>
<table>
<thead>
<tr><th></th><th>Aislamiento de datos</th><th>Rendimiento de búsqueda</th><th>Número máximo de inquilinos</th><th>Escenarios recomendados</th></tr>
</thead>
<tbody>
<tr><td>Orientado a la base de datos</td><td>Fuerte</td><td>Fuerte</td><td>64</td><td>Para aquellos que requieren que las colecciones varíen con los proyectos, especialmente adecuado para el aislamiento de datos entre los departamentos de su organización.</td></tr>
<tr><td>Una colección para todos</td><td>Débil</td><td>Media</td><td>N/A</td><td>Para aquellos que tienen recursos limitados y son insensibles al aislamiento de datos.</td></tr>
<tr><td>Una recopilación por inquilino</td><td>Fuerte</td><td>Fuerte</td><td>Menos de 10.000</td><td>Para aquellos que tienen menos de 10.000 inquilinos por clúster.</td></tr>
<tr><td>Una partición por inquilino</td><td>Media</td><td>Fuerte</td><td>4,096</td><td>Para aquellos que tienen menos de 4.096 inquilinos por colección.</td></tr>
<tr><td>Basado en clave de partición</td><td>Media</td><td>Fuerte</td><td>10,000,000+</td><td>Para aquellos que prevén un rápido aumento de inquilinos hasta millones.</td></tr>
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
    </button></h2><p><a href="/docs/es/v2.4.x/manage_databases.md">Gestionar</a><a href="/docs/es/v2.4.x/schema.md">el esquema de</a><a href="/docs/es/v2.4.x/manage_databases.md">las bases de datos</a></p>
