---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Conozca la definición de usuarios, roles, objetos y privilegios en el control
  de acceso basado en roles (RBAC).
title: 'Usuarios, Privilegios y Roles'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Usuarios, Privilegios y Roles<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema proporciona una visión general del Control de Acceso Basado en Roles (RBAC) en Milvus, detallando las definiciones y relaciones entre usuarios, roles, objetos y privilegios.</p>
<p>La siguiente figura ilustra la relación entre objetos, privilegios, roles y usuarios.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>usuarios_y_roles</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">Conceptos clave<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Para gestionar el control de acceso a los recursos de Milvus, es importante comprender los componentes clave de RBAC: tipos de objeto, nombres de objeto, usuarios, roles y privilegios.</p>
<ul>
<li><p><strong>Tipo</strong> de objeto: la categoría del objeto al que se asigna un privilegio. El tipo de objeto puede ser:</p>
<ul>
<li><code translate="no">Global</code>: Objetos de todo el sistema, que permiten al usuario realizar acciones que afectan a todas las colecciones, usuarios o configuraciones de todo el sistema.</li>
<li><code translate="no">Collection</code>: Objetos específicos de la colección, que permiten al usuario realizar acciones como crear índices, cargar datos, insertar o eliminar datos y consultar datos dentro de una colección específica.</li>
<li><code translate="no">User</code>: Objetos relacionados con la gestión de usuarios, que permiten al usuario gestionar las credenciales y los roles de los usuarios de la base de datos, como actualizar las credenciales de usuario o ver los detalles de los usuarios.</li>
</ul></li>
<li><p><strong>Nombre del</strong> objeto: el nombre específico del objeto para el que se desea controlar el acceso. Por ejemplo:</p>
<ul>
<li>Si el tipo de objeto es <code translate="no">Global</code>, el nombre del objeto debe establecerse con el comodín (<code translate="no">*</code>), indicando todos los objetos del tipo especificado.</li>
<li>Si el tipo de objeto es <code translate="no">Collection</code>, el nombre del objeto es el nombre de una colección.</li>
<li>Si el tipo de objeto es <code translate="no">User</code>, el nombre del objeto es el nombre de un usuario de la base de datos.</li>
</ul></li>
<li><p><strong>Usuario</strong>: una persona o una aplicación que interactúa con Milvus, que consiste en un nombre de usuario y una contraseña correspondiente.</p></li>
<li><p><strong>Privilegio</strong>: define las acciones que se pueden realizar y los recursos a los que se puede acceder. Los privilegios no se conceden directamente a los usuarios, sino que se asignan a roles.</p></li>
<li><p><strong>Rol</strong>: define el conjunto de privilegios que tiene un usuario para determinados objetos. Una vez que se asigna un rol a un usuario, éste hereda todos los privilegios concedidos a dicho rol.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Ejemplo: Concesión de privilegios<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente fragmento de código muestra cómo conceder un privilegio <code translate="no">CreateIndex</code> a un rol sobre una colección específica:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">milvusClient.grant_privilege(
    role_name=<span class="hljs-string">&quot;CUSTOM_ROLE_NAME&quot;</span>,
    object_type=<span class="hljs-string">&quot;Collection&quot;</span>,  <span class="hljs-comment"># Valid value: Global, Collection or User.</span>
    privilege=<span class="hljs-string">&quot;CreateIndex&quot;</span>,   <span class="hljs-comment"># See the table below for valid privilege names and relevant API descriptions.</span>
    object_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>  <span class="hljs-comment"># The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GrantPrivilegeReq</span> <span class="hljs-variable">grantPrivilegeReq</span> <span class="hljs-operator">=</span> GrantPrivilegeReq.builder()
        .roleName(<span class="hljs-string">&quot;roleName&quot;</span>)
        .objectName(<span class="hljs-string">&quot;CollectionName&quot;</span>) <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
        .objectType(<span class="hljs-string">&quot;Collection&quot;</span>) <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
        .privilege(<span class="hljs-string">&quot;CreateIndex&quot;</span>) <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
        .build();
client.grantPrivilege(grantPrivilegeReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">milvusClient.grantPrivilege({
   roleName: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-built_in">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   objectName: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   privilegeName: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>Para obtener más información sobre las API relacionadas con privilegios, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> y <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>Para obtener más información sobre las API relacionadas con privilegios, consulte <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> y <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>Para obtener más información sobre las API relacionadas con privilegios, consulte <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> y <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Usuarios y roles por defecto<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus crea por defecto un usuario <code translate="no">root</code> con una contraseña por defecto <code translate="no">Milvus</code>. Al usuario <code translate="no">root</code> se le conceden los privilegios <code translate="no">admin</code>, lo que significa que este usuario <code translate="no">root</code> puede tener acceso a todos los recursos y realizar todas las acciones.</p>
<p>Si a un usuario se le asocia el rol <code translate="no">public</code>, tendrá derecho a los siguientes privilegios:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">Lista de tipos de objeto y privilegios<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>En la siguiente tabla se enumeran los valores que puede elegir al <a href="/docs/es/v2.4.x/rbac.md">habilitar RBAC</a>.</p>
<table>
<thead>
<tr><th>Tipo de objeto</th><th>Nombre del privilegio</th><th>Descripción de la API relevante en el lado del cliente</th></tr>
</thead>
<tbody>
<tr><td>Colección</td><td>CreateIndex</td><td>Crearíndice</td></tr>
<tr><td>Colección</td><td>DropIndex</td><td>DropIndex</td></tr>
<tr><td>Colección</td><td>IndexDetail</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Colección</td><td>Cargar</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Colección</td><td>GetLoadingProgress</td><td>GetLoadingProgress</td></tr>
<tr><td>Colección</td><td>GetLoadState</td><td>Obtener estado de carga</td></tr>
<tr><td>Colección</td><td>Liberación</td><td>LiberarColección</td></tr>
<tr><td>Colección</td><td>Insertar</td><td>Insertar</td></tr>
<tr><td>Colección</td><td>Borrar</td><td>Borrar</td></tr>
<tr><td>Colección</td><td>Insertar</td><td>Upsert</td></tr>
<tr><td>Colección</td><td>Buscar en</td><td>Buscar en</td></tr>
<tr><td>Colección</td><td>Descarga</td><td>Descarga/GetFlushState</td></tr>
<tr><td>Colección</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>Colección</td><td>Consulta</td><td>Consulta</td></tr>
<tr><td>Colección</td><td>GetStatistics</td><td>Obtener estadísticas de la colección</td></tr>
<tr><td>Colección</td><td>Compactación</td><td>Compactación</td></tr>
<tr><td>Colección</td><td>Importar</td><td>Importación/Inserción masiva</td></tr>
<tr><td>Colección</td><td>Balance de carga</td><td>Balance de carga</td></tr>
<tr><td>Colección</td><td>CrearPartición</td><td>CrearPartición</td></tr>
<tr><td>Colección</td><td>DropPartition</td><td>DropPartition</td></tr>
<tr><td>Colección</td><td>MostrarParticiones</td><td>MostrarParticiones</td></tr>
<tr><td>Colección</td><td>TienePartición</td><td>TienePartición</td></tr>
<tr><td>Global</td><td>Todos</td><td>Todos los permisos de operación de la API en esta tabla</td></tr>
<tr><td>Global</td><td>CrearColección</td><td>CrearColección</td></tr>
<tr><td>Global</td><td>DropCollection</td><td>DropCollection</td></tr>
<tr><td>Global</td><td>DescribirColección</td><td>DescribeCollection</td></tr>
<tr><td>Global</td><td>MostrarColecciones</td><td>MostrarColecciones</td></tr>
<tr><td>Global</td><td>RenombrarColección</td><td>RenombrarColección</td></tr>
<tr><td>Global</td><td>LimpiarTodo</td><td>LimpiarTodo</td></tr>
<tr><td>Global</td><td>CrearPropiedad</td><td>CrearUsuario CrearRol</td></tr>
<tr><td>Global</td><td>EliminarPropiedad</td><td>EliminarCredencial DropRole</td></tr>
<tr><td>Global</td><td>SeleccionarPropiedad</td><td>SelectRole/SelectGrant</td></tr>
<tr><td>Global</td><td>GestionarPropiedad</td><td>OperateUserRole OperatePrivilege</td></tr>
<tr><td>Global</td><td>CreateResourceGroup</td><td>Crear grupo de recursos</td></tr>
<tr><td>Global</td><td>DropResourceGroup</td><td>DropResourceGroup</td></tr>
<tr><td>Global</td><td>DescribeResourceGroup</td><td>DescribeResourceGroup</td></tr>
<tr><td>Global</td><td>ListResourceGroups</td><td>ListResourceGroups</td></tr>
<tr><td>Global</td><td>Nodo de transferencia</td><td>Nodo de transferencia</td></tr>
<tr><td>Global</td><td>Réplica de transferencia</td><td>Réplica de transferencia</td></tr>
<tr><td>Global</td><td>CrearBaseDeDatos</td><td>CrearBaseDeDatos</td></tr>
<tr><td>Global</td><td>DropDatabase</td><td>DropDatabase</td></tr>
<tr><td>Global</td><td>ListDatabases</td><td>BasesDeDatosDeLista</td></tr>
<tr><td>Global</td><td>Crear alias</td><td>Crear alias</td></tr>
<tr><td>Global</td><td>DropAlias</td><td>DropAlias</td></tr>
<tr><td>Global</td><td>DescribeAlias</td><td>DescribeAlias</td></tr>
<tr><td>Global</td><td>ListAliases</td><td>Lista de alias</td></tr>
<tr><td>Usuario</td><td>UpdateUser</td><td>UpdateCredential</td></tr>
<tr><td>Usuario</td><td>SeleccionarUsuario</td><td>SeleccionarUsuario</td></tr>
</tbody>
</table>
<div class="alert note">
<li>Los nombres de objetos y privilegios distinguen entre mayúsculas y minúsculas.</li>
<li>Para conceder todos los privilegios a un tipo de objeto, como Colección, Global, Usuario, utilice "*" para el nombre del privilegio. </li>
<li>El nombre de privilegio "*" para el objeto Global no incluye el privilegio Todos, porque el privilegio Todos incluye todos los permisos, incluido cualquier objeto de colección y usuario.</li>
</div>
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
<li>Aprenda a <a href="/docs/es/v2.4.x/rbac.md">activar RBAC</a>.</li>
</ul>
