---
id: grant_privileges.md
title: Conceder privilegios o grupos de privilegios a roles
summary: >-
  Una vez creado un rol, puede concederle privilegios. En esta guía se explica
  cómo conceder privilegios o grupos de privilegios a un rol.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Conceder privilegios o grupos de privilegios a roles<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Una vez creado un rol, puede concederle privilegios. Esta guía explica cómo conceder privilegios o grupos de privilegios a un rol.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Conceder un privilegio o un grupo de privilegios a un rol<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 introduce una nueva versión de la API que agiliza la operación de concesión. Ya no es necesario buscar el tipo de objeto cuando se concede un privilegio a un rol. A continuación se indican los parámetros y las explicaciones correspondientes.</p>
<ul>
<li><p><strong>role_name:</strong> El nombre del rol de destino al que deben concederse privilegios o grupos de privilegios.</p></li>
<li><p><strong>Recurso</strong>: El recurso de destino de un privilegio, que puede ser una instancia, base de datos o colección específica.</p></li>
</ul>
<p>La siguiente tabla explica cómo especificar el recurso en el método <code translate="no">client.grantV2()</code>.</p>
<table>
   <tr>
     <th><p><strong>Nivel</strong></p></th>
     <th><p><strong>Recurso</strong></p></th>
     <th><p><strong>Método de concesión</strong></p></th>
     <th><p><strong>Notas</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Colección</strong></p></td>
     <td><p>Una colección específica</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Introduzca el nombre de la colección de destino y el nombre de la base de datos a la que pertenece la colección de destino.</p></td>
   </tr>
   <tr>
     <td><p>Todas las colecciones de una base de datos específica</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Introduzca el nombre de la base de datos de destino y un comodín <code translate="no">*</code> como nombre de la colección.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Base de datos</strong></p></td>
     <td><p>Una base de datos específica</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Introduzca el nombre de la base de datos de destino y el comodín <code translate="no">*</code> como nombre de la colección.</p></td>
   </tr>
   <tr>
     <td><p>Todas las bases de datos de la instancia actual</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Introduzca <code translate="no">*</code> como nombre de la base de datos y <code translate="no">*</code> como nombre de la colección.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instancia</strong></p></td>
     <td><p>La instancia actual</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Introduzca <code translate="no">*</code> como nombre de la base de datos y <code translate="no">*</code> como nombre de la colección.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Privilegio</strong>: El privilegio específico o <a href="/docs/es/privilege_group.md">grupo de privilegios</a> que necesita otorgar a un rol. Actualmente, Milvus proporciona 56 tipos de privilegios que puede conceder. La siguiente tabla enumera los privilegios en Milvus.</p>
<p><div class="alert note"></p>
<p>La columna de tipo en la tabla de abajo es de usuario para facilitar su búsqueda rápida de privilegios y se utiliza sólo con fines de clasificación. Cuando conceda privilegios, no necesita entender los tipos. Sólo tiene que introducir los privilegios correspondientes.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>Tipo</strong></p></th>
<th><p><strong>Privilegio</strong></p></th>
<th><p><strong>Descripción</strong></p></th>
<th><p><strong>Descripción de la API correspondiente en el lado del cliente</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>Privilegios de base de datos</p></td>
<td><p>ListDatabases</p></td>
<td><p>Ver todas las bases de datos de la instancia actual</p></td>
<td><p><a href="/docs/es/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>Ver los detalles de una base de datos</p></td>
<td><p><a href="/docs/es/manage_databases.md">DescribeDatabase</a></p></td>
</tr>
<tr>
<td><p>CrearBaseDeDatos</p></td>
<td><p>Crear una base de datos</p></td>
<td><p><a href="/docs/es/manage_databases.md">CrearBaseDeDatos</a></p></td>
</tr>
<tr>
<td><p>SoltarBaseDeDatos</p></td>
<td><p>Eliminar una base de datos</p></td>
<td><p><a href="/docs/es/manage_databases.md">DropDatabase</a></p></td>
</tr>
<tr>
<td><p>AlterDatabase</p></td>
<td><p>Modificar las propiedades de una base de datos</p></td>
<td><p><a href="/docs/es/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Privilegios de recogida</p></td>
<td><p>GetFlushState</p></td>
<td><p>Comprobar el estado de la operación de vaciado de la colección</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>Comprueba el estado de carga de una colección</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>Comprueba el progreso de carga de una colección</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">ObtenerProgresoDeCarga</a></p></td>
</tr>
<tr>
<td><p>Mostrar colecciones</p></td>
<td><p>Ver todas las colecciones con privilegios de colección</p></td>
<td><p><a href="/docs/es/view-collections.md">Mostrar colecciones</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>Ver todos los alias de una colección</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ListAliases</a></p></td>
</tr>
<tr>
<td><p>DescribirColección</p></td>
<td><p>Ver los detalles de una colección</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">DescribirColección</a></p></td>
</tr>
<tr>
<td><p>DescribirAlias</p></td>
<td><p>Ver los detalles de un alias</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">DescribeAlias</a></p></td>
</tr>
<tr>
<td><p>ObtenerEstadísticas</p></td>
<td><p>Obtener las estadísticas de una colección (por ejemplo, el número de entidades de una colección)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">Obtener estadísticas de la colección</a></p></td>
</tr>
<tr>
<td><p>CrearColección</p></td>
<td><p>Crear una colección</p></td>
<td><p><a href="/docs/es/create-collection.md">CrearColección</a></p></td>
</tr>
<tr>
<td><p>SoltarColección</p></td>
<td><p>Soltar una colección</p></td>
<td><p><a href="/docs/es/drop-collection.md">SoltarColección</a></p></td>
</tr>
<tr>
<td><p>Cargar</p></td>
<td><p>Cargar una colección</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">CargarColección/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>Liberar</p></td>
<td><p>Liberar una colección</p></td>
<td><p><a href="/docs/es/load-and-release.md">LiberarColección</a></p></td>
</tr>
<tr>
<td><p>Descargar</p></td>
<td><p>Persiste todas las entidades de una colección en un segmento sellado. Cualquier entidad insertada después de la operación flush se almacenará en un nuevo segmento.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Flush/GetFlushState</a></p></td>
</tr>
<tr>
<td><p>Compactación</p></td>
<td><p>Compactación manual</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Compactar</a></p></td>
</tr>
<tr>
<td><p>RenombrarColección</p></td>
<td><p>Renombrar una colección</p></td>
<td><p><a href="/docs/es/modify-collection.md">RenombrarColección</a></p></td>
</tr>
<tr>
<td><p>CrearAlias</p></td>
<td><p>Crear un alias para una colección</p></td>
<td><p><a href="/docs/es/manage-aliases.md">CrearAlias</a></p></td>
</tr>
<tr>
<td><p>SoltarAlias</p></td>
<td><p>Eliminar el alias de una colección</p></td>
<td><p><a href="/docs/es/manage-aliases.md">EliminarAlias</a></p></td>
</tr>
<tr>
<td><p>VaciarTodas</p></td>
<td><p>Vaciar todas las colecciones de una base de datos</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>Privilegios de partición</p></td>
<td><p>TienePartición</p></td>
<td><p>Comprobar si existe una partición</p></td>
<td><p><a href="/docs/es/manage-partitions.md">TienePartición</a></p></td>
</tr>
<tr>
<td><p>MostrarParticiones</p></td>
<td><p>Ver todas las particiones de una colección</p></td>
<td><p><a href="/docs/es/manage-partitions.md">MostrarParticiones</a></p></td>
</tr>
<tr>
<td><p>CrearPartición</p></td>
<td><p>Crear una partición</p></td>
<td><p><a href="/docs/es/manage-partitions.md">CrearPartición</a></p></td>
</tr>
<tr>
<td><p>SoltarPartición</p></td>
<td><p>Soltar una partición</p></td>
<td><p><a href="/docs/es/manage-partitions.md">DropPartition</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Privilegios de índice</p></td>
<td><p>Detalles del índice</p></td>
<td><p>Ver los detalles de un índice</p></td>
<td><p><a href="/docs/es/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>CrearÍndice</p></td>
<td><p>Crear un índice</p></td>
<td><p><a href="/docs/es/index-vector-fields.md">Crear índice</a></p></td>
</tr>
<tr>
<td><p>Soltar índice</p></td>
<td><p>Eliminar un índice</p></td>
<td><p><a href="/docs/es/index-vector-fields.md">Eliminar índice</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilegios de gestión de recursos</p></td>
<td><p>Equilibrio de carga</p></td>
<td><p>Lograr el equilibrio de carga</p></td>
<td><p><a href="/docs/es/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>CrearGrupoDeRecursos</p></td>
<td><p>Crear un grupo de recursos</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CrearGrupoDeRecursos</a></p></td>
</tr>
<tr>
<td><p>SoltarGrupoDeRecursos</p></td>
<td><p>Eliminar un grupo de recursos</p></td>
<td><p><a href="/docs/es/resource_group.md">DropResourceGroup</a></p></td>
</tr>
<tr>
<td><p>ActualizarGrupoDeRecursos</p></td>
<td><p>Actualizar un grupo de recursos</p></td>
<td><p><a href="/docs/es/resource_group.md">UpdateResourceGroups</a></p></td>
</tr>
<tr>
<td><p>DescribeResourceGroup</p></td>
<td><p>Ver los detalles de un grupo de recursos</p></td>
<td><p><a href="/docs/es/resource_group.md">DescribeResourceGroup</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>Ver todos los grupos de recursos de la instancia actual</p></td>
<td><p><a href="/docs/es/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>Transferir nodos entre grupos de recursos</p></td>
<td><p><a href="/docs/es/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>Transferir réplicas entre grupos de recursos</p></td>
<td><p><a href="/docs/es/resource_group.md">TransferReplica</a></p></td>
</tr>
<tr>
<td><p>Copia de seguridadRBAC</p></td>
<td><p>Crear una copia de seguridad de todas las operaciones relacionadas con RBAC en la instancia actual</p></td>
<td><p>BackupRBAC</p></td>
</tr>
<tr>
<td><p>RestaurarRBAC</p></td>
<td><p>Restaurar una copia de seguridad de todas las operaciones relacionadas con RBAC en la instancia actual</p></td>
<td><p>RestaurarRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>Privilegios de Entidad</p></td>
<td><p>Consulta</p></td>
<td><p>Realizar una consulta</p></td>
<td><p><a href="/docs/es/get-and-scalar-query.md">Consulta</a></p></td>
</tr>
<tr>
<td><p>Buscar en</p></td>
<td><p>Realizar una búsqueda</p></td>
<td><p><a href="/docs/es/single-vector-search.md">Buscar en</a></p></td>
</tr>
<tr>
<td><p>Insertar</p></td>
<td><p>Insertar entidades</p></td>
<td><p><a href="/docs/es/insert-update-delete.md">Insertar</a></p></td>
</tr>
<tr>
<td><p>Borrar</p></td>
<td><p>Borrar entidades</p></td>
<td><p><a href="/docs/es/delete-entities.md">Borrar</a></p></td>
</tr>
<tr>
<td><p>Subir</p></td>
<td><p>Insertar entidades</p></td>
<td><p><a href="/docs/es/upsert-entities.md">Añadir</a></p></td>
</tr>
<tr>
<td><p>Importar</p></td>
<td><p>Insertar o importar entidades en bloque</p></td>
<td><p><a href="/docs/es/import-data.md">Insertar/Importar en bloque</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilegios RBAC</p></td>
<td><p>CrearPropiedad</p></td>
<td><p>Crear un usuario o un rol</p></td>
<td><p><a href="/docs/es/users_and_roles.md">CrearUsuario/CrearRol</a></p></td>
</tr>
<tr>
<td><p>ActualizarUsuario</p></td>
<td><p>Actualizar la contraseña de un usuario</p></td>
<td><p><a href="/docs/es/users_and_roles.md">UpdateCredential</a></p></td>
</tr>
<tr>
<td><p>SoltarPropiedad</p></td>
<td><p>Dar de baja la contraseña de un usuario o un rol</p></td>
<td><p><a href="/docs/es/drop_users_roles.md">DeleteCredential/DropRole</a></p></td>
</tr>
<tr>
<td><p>Seleccionar titularidad</p></td>
<td><p>Ver todos los usuarios a los que se ha concedido una función específica</p></td>
<td><p><a href="/docs/es/grant_roles.md">SelectRole/SelectGrant</a></p></td>
</tr>
<tr>
<td><p>GestionarPropiedad</p></td>
<td><p>Gestionar un usuario o una función o conceder una función a un usuario</p></td>
<td><p><a href="/docs/es/privilege_group.md">OperarRolUsuario/OperarPrivilegio/OperarPrivilegioV2</a></p></td>
</tr>
<tr>
<td><p>SeleccionarUsuario</p></td>
<td><p>Ver todos los roles concedidos a un usuario</p></td>
<td><p><a href="/docs/es/grant_roles.md">SeleccionarUsuario</a></p></td>
</tr>
<tr>
<td><p>CrearGrupoDePrivilegios</p></td>
<td><p>Crear un grupo de privilegios</p></td>
<td><p><a href="/docs/es/privilege_group.md">CrearGrupoDePrivilegios</a></p></td>
</tr>
<tr>
<td><p>SoltarGrupoDePrivilegios</p></td>
<td><p>Eliminar un grupo de privilegios</p></td>
<td><p><a href="/docs/es/privilege_group.md">DropPrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>Ver todos los grupos de privilegios de la instancia actual</p></td>
<td><p><a href="/docs/es/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>OperatePrivilegeGroup</p></td>
<td><p>Añadir o eliminar privilegios de un grupo de privilegios</p></td>
<td><p><a href="/docs/es/privilege_group.md">OperatePrivilegeGroup</a></p></td>
</tr>
</table></p></li>
</ul>
<p>El siguiente ejemplo demuestra cómo conceder el privilegio <code translate="no">PrivilegeSearch</code> en <code translate="no">collection_01</code> bajo la base de datos <code translate="no">default</code> así como un grupo de privilegios denominado <code translate="no">privilege_group_1</code> al rol <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;Search&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});
    
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;privilege_group_1&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;privilege_group_1&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">Describir un rol<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo demuestra cómo ver los privilegios otorgados al rol <code translate="no">role_a</code> utilizando el método <code translate="no">describe_role</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.describe_role(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

role, err := client.DescribeRole(ctx, milvusclient.NewDescribeRoleOption(<span class="hljs-string">&quot;role_a&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación se muestra un ejemplo de salida.</p>
<pre><code translate="no" class="language-python">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Revocar un privilegio o un grupo de privilegios de un rol<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo demuestra cómo revocar el privilegio <code translate="no">PrivilegeSearch</code> en <code translate="no">collection_01</code> bajo la base de datos <code translate="no">default</code> así como el grupo de privilegios <code translate="no">privilege_group_1</code> que han sido otorgados al rol <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
        WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;ClusterReadOnly&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
