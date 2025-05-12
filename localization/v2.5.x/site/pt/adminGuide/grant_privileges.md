---
id: grant_privileges.md
title: Conceder privilégios ou grupos de privilégios a funções
summary: >-
  Uma vez criada uma função, pode conceder privilégios à mesma. Este guia
  apresenta a forma de conceder privilégios ou grupos de privilégios a uma
  função.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Conceder privilégios ou grupos de privilégios a funções<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Uma vez criada uma função, pode conceder privilégios à mesma. Este guia apresenta a forma de conceder privilégios ou grupos de privilégios a uma função.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Conceder um privilégio ou um grupo de privilégios a uma função<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus 2.5 introduz uma nova versão da API que simplifica a operação de concessão. Já não é necessário procurar o tipo de objeto quando se concede um privilégio a uma função. Seguem-se os parâmetros e as respectivas explicações.</p>
<ul>
<li><p><strong>Nome_da_função:</strong> O nome da função de destino à qual devem ser concedidos privilégios ou grupos de privilégios.</p></li>
<li><p><strong>Recurso</strong>: O recurso de destino de um privilégio, que pode ser uma instância específica, um banco de dados ou uma coleção.</p></li>
</ul>
<p>A tabela a seguir explica como especificar o recurso no método <code translate="no">client.grantV2()</code>.</p>
<table>
   <tr>
     <th><p><strong>Nível</strong></p></th>
     <th><p><strong>Recurso</strong></p></th>
     <th><p><strong>Método de concessão</strong></p></th>
     <th><p><strong>Notas</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Coleção</strong></p></td>
     <td><p>Uma coleção específica</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Introduza o nome da sua coleção de destino e o nome da base de dados a que pertence a coleção de destino.</p></td>
   </tr>
   <tr>
     <td><p>Todas as colecções de uma base de dados específica</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Introduza o nome da sua base de dados de destino e um wildcard <code translate="no">*</code> como nome da coleção.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Base de dados</strong></p></td>
     <td><p>Uma base de dados específica</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Introduza o nome da sua base de dados de destino e um wildcard <code translate="no">*</code> como nome da coleção.</p></td>
   </tr>
   <tr>
     <td><p>Todas as bases de dados na instância atual</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Introduza <code translate="no">*</code> como o nome da base de dados e <code translate="no">*</code> como o nome da coleção.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instância</strong></p></td>
     <td><p>A instância atual</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Introduza <code translate="no">*</code> como o nome da base de dados e <code translate="no">*</code> como o nome da coleção.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Privilégio</strong>: O privilégio específico ou o <a href="/docs/pt/privilege_group.md">grupo de privilégios</a> que é necessário conceder a uma função. Atualmente, o Milvus oferece 56 tipos de privilégios que podem ser concedidos. A tabela abaixo lista os privilégios no Milvus.</p>
<p><div class="alert note"></p>
<p>A coluna do tipo na tabela abaixo é utilizada para facilitar a pesquisa rápida de privilégios e é utilizada apenas para fins de classificação. Ao conceder privilégios, não precisa de compreender os tipos. Basta introduzir os privilégios correspondentes.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>Tipo de privilégio</strong></p></th>
<th><p><strong>Privilégio</strong></p></th>
<th><p><strong>Descrição</strong></p></th>
<th><p><strong>Descrição da API relevante no lado do cliente</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>Privilégios da base de dados</p></td>
<td><p>ListDatabases</p></td>
<td><p>Ver todas as bases de dados na instância atual</p></td>
<td><p><a href="/docs/pt/manage_databases.md">Listar bases de dados</a></p></td>
</tr>
<tr>
<td><p>DescreverBaseDeDados</p></td>
<td><p>Ver os detalhes de uma base de dados</p></td>
<td><p><a href="/docs/pt/manage_databases.md">DescreverBaseDeDados</a></p></td>
</tr>
<tr>
<td><p>CriarBaseDeDados</p></td>
<td><p>Criar uma base de dados</p></td>
<td><p><a href="/docs/pt/manage_databases.md">CreateDatabase</a></p></td>
</tr>
<tr>
<td><p>DropDatabase</p></td>
<td><p>Eliminar uma base de dados</p></td>
<td><p><a href="/docs/pt/manage_databases.md">DropDatabase</a></p></td>
</tr>
<tr>
<td><p>Alterar base de dados</p></td>
<td><p>Modificar as propriedades de uma base de dados</p></td>
<td><p><a href="/docs/pt/manage_databases.md">Alterar base de dados</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Privilégios da coleção</p></td>
<td><p>GetFlushState</p></td>
<td><p>Verificar o estado da operação de descarga da coleção</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>Verificar o estado de carregamento de uma coleção</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>Verificar o progresso do carregamento de uma coleção</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>ShowCollections (Mostrar colecções)</p></td>
<td><p>Ver todas as colecções com privilégios de coleção</p></td>
<td><p><a href="/docs/pt/view-collections.md">ShowCollections</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>Ver todos os aliases de uma coleção</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ListAliases</a></p></td>
</tr>
<tr>
<td><p>Descrever coleção</p></td>
<td><p>Ver os detalhes de uma coleção</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">Descrever coleção</a></p></td>
</tr>
<tr>
<td><p>DescreverAlias</p></td>
<td><p>Ver os detalhes de um alias</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">DescreverAlias</a></p></td>
</tr>
<tr>
<td><p>Obter estatísticas</p></td>
<td><p>Obter as estatísticas de uma coleção (por exemplo, o número de entidades numa coleção)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">Obter estatísticas da coleção</a></p></td>
</tr>
<tr>
<td><p>Criar coleção</p></td>
<td><p>Criar uma coleção</p></td>
<td><p><a href="/docs/pt/create-collection.md">Criar coleção</a></p></td>
</tr>
<tr>
<td><p>DropCollection</p></td>
<td><p>Eliminar uma coleção</p></td>
<td><p><a href="/docs/pt/drop-collection.md">DropCollection</a></p></td>
</tr>
<tr>
<td><p>Carregar</p></td>
<td><p>Carregar uma coleção</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>Libertar</p></td>
<td><p>Libertar uma coleção</p></td>
<td><p><a href="/docs/pt/load-and-release.md">ReleaseCollection</a></p></td>
</tr>
<tr>
<td><p>Descarregar</p></td>
<td><p>Persiste todas as entidades numa coleção para um segmento selado. Qualquer entidade inserida após a operação de descarga será armazenada num novo segmento.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Flush/GetFlushState</a></p></td>
</tr>
<tr>
<td><p>Compactação</p></td>
<td><p>Acionar manualmente a compactação</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Compactar</a></p></td>
</tr>
<tr>
<td><p>Renomear coleção</p></td>
<td><p>Renomear uma coleção</p></td>
<td><p><a href="/docs/pt/modify-collection.md">Renomear coleção</a></p></td>
</tr>
<tr>
<td><p>CriarAlias</p></td>
<td><p>Criar um pseudónimo para uma coleção</p></td>
<td><p><a href="/docs/pt/manage-aliases.md">CriarAlias</a></p></td>
</tr>
<tr>
<td><p>DropAlias</p></td>
<td><p>Eliminar o nome alternativo de uma coleção</p></td>
<td><p><a href="/docs/pt/manage-aliases.md">DropAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>Elimina todas as colecções de uma base de dados</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>Privilégios de partição</p></td>
<td><p>HasPartition</p></td>
<td><p>Verifica se existe uma partição</p></td>
<td><p><a href="/docs/pt/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>MostrarPartições</p></td>
<td><p>Ver todas as partições de uma coleção</p></td>
<td><p><a href="/docs/pt/manage-partitions.md">MostrarPartições</a></p></td>
</tr>
<tr>
<td><p>CriarPartição</p></td>
<td><p>Criar uma partição</p></td>
<td><p><a href="/docs/pt/manage-partitions.md">CriarPartição</a></p></td>
</tr>
<tr>
<td><p>DropPartition</p></td>
<td><p>Eliminar uma partição</p></td>
<td><p><a href="/docs/pt/manage-partitions.md">DropPartition</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Privilégios do índice</p></td>
<td><p>Detalhes do índice</p></td>
<td><p>Ver os detalhes de um índice</p></td>
<td><p><a href="/docs/pt/index-vector-fields.md">DescreverIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>Criar índice</p></td>
<td><p>Criar um índice</p></td>
<td><p><a href="/docs/pt/index-vector-fields.md">CriarIndex</a></p></td>
</tr>
<tr>
<td><p>DropIndex</p></td>
<td><p>Eliminar um índice</p></td>
<td><p><a href="/docs/pt/index-vector-fields.md">DropIndex</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilégios de gestão de recursos</p></td>
<td><p>Balanceamento de carga</p></td>
<td><p>Alcançar o equilíbrio de carga</p></td>
<td><p><a href="/docs/pt/resource_group.md">Balanceamento de carga</a></p></td>
</tr>
<tr>
<td><p>Criar grupo de recursos</p></td>
<td><p>Criar um grupo de recursos</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CreateResourceGroup</a></p></td>
</tr>
<tr>
<td><p>DropResourceGroup</p></td>
<td><p>Eliminar um grupo de recursos</p></td>
<td><p><a href="/docs/pt/resource_group.md">DropResourceGroup</a></p></td>
</tr>
<tr>
<td><p>UpdateResourceGroups (Atualizar grupos de recursos)</p></td>
<td><p>Atualizar um grupo de recursos</p></td>
<td><p><a href="/docs/pt/resource_group.md">UpdateResourceGroups</a></p></td>
</tr>
<tr>
<td><p>Descrever o grupo de recursos</p></td>
<td><p>Visualizar os detalhes de um grupo de recursos</p></td>
<td><p><a href="/docs/pt/resource_group.md">Descrever grupo de recursos</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>Ver todos os grupos de recursos da instância atual</p></td>
<td><p><a href="/docs/pt/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>Transferir nós entre grupos de recursos</p></td>
<td><p><a href="/docs/pt/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>Transferir réplicas entre grupos de recursos</p></td>
<td><p><a href="/docs/pt/resource_group.md">TransferirReplica</a></p></td>
</tr>
<tr>
<td><p>BackupRBAC</p></td>
<td><p>Criar uma cópia de segurança para todas as operações relacionadas com RBAC na instância atual</p></td>
<td><p>Cópia de segurançaRBAC</p></td>
</tr>
<tr>
<td><p>RestaurarRBAC</p></td>
<td><p>Restaurar uma cópia de segurança de todas as operações relacionadas com o RBAC na instância atual</p></td>
<td><p>RestaurarRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>Privilégios da entidade</p></td>
<td><p>Consulta</p></td>
<td><p>Efetuar uma consulta</p></td>
<td><p><a href="/docs/pt/get-and-scalar-query.md">Consultar</a></p></td>
</tr>
<tr>
<td><p>Pesquisar</p></td>
<td><p>Efetuar uma pesquisa</p></td>
<td><p><a href="/docs/pt/single-vector-search.md">Pesquisar</a></p></td>
</tr>
<tr>
<td><p>Inserir</p></td>
<td><p>Inserir entidades</p></td>
<td><p><a href="/docs/pt/insert-update-delete.md">Inserir</a></p></td>
</tr>
<tr>
<td><p>Eliminar</p></td>
<td><p>Eliminar entidades</p></td>
<td><p><a href="/docs/pt/delete-entities.md">Eliminar</a></p></td>
</tr>
<tr>
<td><p>Upsert</p></td>
<td><p>Inserir entidades</p></td>
<td><p><a href="/docs/pt/upsert-entities.md">Upsert</a></p></td>
</tr>
<tr>
<td><p>Importar</p></td>
<td><p>Inserir ou importar entidades em massa</p></td>
<td><p><a href="/docs/pt/import-data.md">Inserir/Importar em massa</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilégios RBAC</p></td>
<td><p>Criar Propriedade</p></td>
<td><p>Criar um utilizador ou uma função</p></td>
<td><p><a href="/docs/pt/users_and_roles.md">CriarUsuário/CriarFunção</a></p></td>
</tr>
<tr>
<td><p>Atualizar utilizador</p></td>
<td><p>Atualizar a palavra-passe de um utilizador</p></td>
<td><p><a href="/docs/pt/users_and_roles.md">ActualizarCredencial</a></p></td>
</tr>
<tr>
<td><p>DropOwnership</p></td>
<td><p>Eliminar uma palavra-passe de um utilizador ou uma função</p></td>
<td><p><a href="/docs/pt/drop_users_roles.md">EliminarCredencial/ApagarFunção</a></p></td>
</tr>
<tr>
<td><p>Selecionar propriedade</p></td>
<td><p>Ver todos os utilizadores a quem foi atribuída uma função específica</p></td>
<td><p><a href="/docs/pt/grant_roles.md">SelectRole/SelectGrant</a></p></td>
</tr>
<tr>
<td><p>GerirPropriedade</p></td>
<td><p>Gerir um utilizador ou uma função ou atribuir uma função a um utilizador</p></td>
<td><p><a href="/docs/pt/privilege_group.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2</a></p></td>
</tr>
<tr>
<td><p>SeleccionarUtilizador</p></td>
<td><p>Ver todas as funções atribuídas a um utilizador</p></td>
<td><p><a href="/docs/pt/grant_roles.md">Selecionar utilizador</a></p></td>
</tr>
<tr>
<td><p>Criar grupo de privilégios</p></td>
<td><p>Criar um grupo de privilégios</p></td>
<td><p><a href="/docs/pt/privilege_group.md">CreatePrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>DropPrivilegeGroup</p></td>
<td><p>Eliminar um grupo de privilégios</p></td>
<td><p><a href="/docs/pt/privilege_group.md">DropPrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>Ver todos os grupos de privilégios na instância atual</p></td>
<td><p><a href="/docs/pt/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>OperatePrivilegeGroup (Operar Grupo de Privilégios)</p></td>
<td><p>Adicionar privilégios a um grupo de privilégios ou remover privilégios de um grupo de privilégios</p></td>
<td><p><a href="/docs/pt/privilege_group.md">OperatePrivilegeGroup (Operar Grupo de Privilégios)</a></p></td>
</tr>
</table></p></li>
</ul>
<p>O exemplo a seguir demonstra como conceder o privilégio <code translate="no">PrivilegeSearch</code> em <code translate="no">collection_01</code> no banco de dados <code translate="no">default</code>, bem como um grupo de privilégios chamado <code translate="no">privilege_group_1</code> para a função <code translate="no">role_a</code>.</p>
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
<h2 id="Describe-a-role" class="common-anchor-header">Descrever uma função<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo a seguir demonstra como visualizar os privilégios concedidos à função <code translate="no">role_a</code> usando o método <code translate="no">describe_role</code>.</p>
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
<p>Abaixo está um exemplo de saída.</p>
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
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Revogar um privilégio ou um grupo de privilégios de uma função<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo a seguir demonstra como revogar o privilégio <code translate="no">PrivilegeSearch</code> em <code translate="no">collection_01</code> no banco de dados <code translate="no">default</code>, bem como o grupo de privilégios <code translate="no">privilege_group_1</code> que foram concedidos à função <code translate="no">role_a</code>.</p>
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
