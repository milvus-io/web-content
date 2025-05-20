---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Saiba mais sobre a definição de utilizadores, funções, objectos e privilégios
  no controlo de acesso baseado em funções (RBAC).
title: 'Utilizadores, privilégios e funções'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Utilizadores, privilégios e funções<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico fornece uma visão geral do Controle de Acesso Baseado em Função (RBAC) em Milvus, detalhando as definições e relações entre usuários, funções, objetos e privilégios.</p>
<p>A figura a seguir ilustra a relação entre objetos, privilégios, funções e usuários.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>utilizadores_e_papéis</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">Conceitos-chave<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Para gerir o controlo de acesso aos recursos Milvus, é importante compreender os principais componentes do RBAC: tipos de objectos, nomes de objectos, utilizadores, funções e privilégios.</p>
<ul>
<li><p><strong>Tipo de objeto</strong>: a categoria do objeto ao qual está a ser atribuído um privilégio. O tipo de objeto pode ser:</p>
<ul>
<li><code translate="no">Global</code>: Objectos de todo o sistema, permitindo ao utilizador executar acções que afectam todas as colecções, utilizadores ou definições de todo o sistema.</li>
<li><code translate="no">Collection</code>: Objectos específicos da coleção, que permitem ao utilizador executar acções como criar índices, carregar dados, inserir ou eliminar dados e consultar dados dentro de uma coleção específica.</li>
<li><code translate="no">User</code>: Objectos relacionados com a gestão de utilizadores, que permitem ao utilizador gerir credenciais e funções para utilizadores da base de dados, tais como atualizar credenciais de utilizador ou visualizar detalhes do utilizador.</li>
</ul></li>
<li><p><strong>Nome do objeto</strong>: o nome específico do objeto para o qual se pretende controlar o acesso. Por exemplo:</p>
<ul>
<li>Se o tipo de objeto for <code translate="no">Global</code>, o nome do objeto deve ser definido como curinga (<code translate="no">*</code>), indicando todos os objetos do tipo especificado.</li>
<li>Se o tipo de objeto for <code translate="no">Collection</code>, o nome do objeto é o nome de uma coleção.</li>
<li>Se o tipo de objeto for <code translate="no">User</code>, o nome do objeto é o nome de um utilizador da base de dados.</li>
</ul></li>
<li><p><strong>Utilizador</strong>: uma pessoa ou uma aplicação que interage com o Milvus, que consiste num nome de utilizador e numa palavra-passe correspondente.</p></li>
<li><p><strong>Privilégio</strong>: define as acções que podem ser executadas e os recursos a que se pode aceder. Os privilégios não são concedidos diretamente aos utilizadores, mas são atribuídos a funções.</p></li>
<li><p><strong>Função</strong>: define o conjunto de privilégios que um utilizador tem para determinados objectos. Quando uma função está associada a um utilizador, este herda todos os privilégios concedidos a essa função.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Exemplo: Concessão de privilégios<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>O seguinte trecho de código mostra como conceder um privilégio <code translate="no">CreateIndex</code> a uma função numa coleção específica:</p>
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
<p>Para obter mais informações sobre APIs relacionadas a privilégios, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>Para obter mais informações sobre APIs relacionadas a privilégios, consulte <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>Para obter mais informações sobre APIs relacionadas com privilégios, consulte <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> e <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Utilizadores e funções predefinidos<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Por predefinição, o Milvus cria um utilizador <code translate="no">root</code> com uma palavra-passe predefinida <code translate="no">Milvus</code>. Ao utilizador <code translate="no">root</code> são concedidos os privilégios <code translate="no">admin</code>, o que significa que este utilizador <code translate="no">root</code> pode ter acesso a todos os recursos e executar todas as acções.</p>
<p>Se um utilizador estiver associado à função <code translate="no">public</code>, tem direito aos seguintes privilégios:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">Lista de tipos de objectos e privilégios<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela seguinte lista os valores que pode escolher ao <a href="/docs/pt/v2.4.x/rbac.md">ativar o RBAC</a>.</p>
<table>
<thead>
<tr><th>Tipo de objeto</th><th>Nome do privilégio</th><th>Descrição da API relevante no lado do cliente</th></tr>
</thead>
<tbody>
<tr><td>Coleção</td><td>CriarIndex</td><td>Criar índice</td></tr>
<tr><td>Coleção</td><td>DropIndex</td><td>Índice de gotas</td></tr>
<tr><td>Coleção</td><td>Detalhes do índice</td><td>DescreverIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Coleção</td><td>Carregar</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Coleção</td><td>GetLoadingProgress</td><td>ObterProgresso de Carregamento</td></tr>
<tr><td>Coleção</td><td>GetLoadState</td><td>ObterEstado de Carga</td></tr>
<tr><td>Coleção</td><td>Libertação</td><td>ReleaseCollection</td></tr>
<tr><td>Coleção</td><td>Inserir</td><td>Inserir</td></tr>
<tr><td>Coleção</td><td>Eliminar</td><td>Eliminar</td></tr>
<tr><td>Coleção</td><td>Upsert</td><td>Inserir</td></tr>
<tr><td>Coleção</td><td>Pesquisar</td><td>Pesquisar</td></tr>
<tr><td>Coleção</td><td>Descarga</td><td>Descarga/GetFlushState</td></tr>
<tr><td>Coleção</td><td>GetFlushState</td><td>ObterFlushState</td></tr>
<tr><td>Coleção</td><td>Consulta</td><td>Consulta</td></tr>
<tr><td>Coleção</td><td>ObterEstatísticas</td><td>Obter estatísticas da coleção</td></tr>
<tr><td>Coleção</td><td>Compactação</td><td>Compactar</td></tr>
<tr><td>Coleção</td><td>Importar</td><td>Inserção/Importação em massa</td></tr>
<tr><td>Coleção</td><td>Balanceamento de carga</td><td>LoadBalance</td></tr>
<tr><td>Coleção</td><td>CriarPartição</td><td>CriarPartição</td></tr>
<tr><td>Coleção</td><td>DropPartition</td><td>DropPartition</td></tr>
<tr><td>Coleção</td><td>MostrarPartições</td><td>ShowPartitions</td></tr>
<tr><td>Coleção</td><td>TemPartição</td><td>TemPartição</td></tr>
<tr><td>Global</td><td>Todas</td><td>Todas as permissões de operação da API nesta tabela</td></tr>
<tr><td>Global</td><td>Criar coleção</td><td>Criar coleção</td></tr>
<tr><td>Global</td><td>DropCollection</td><td>Coleção de gotas</td></tr>
<tr><td>Global</td><td>Descrever coleção</td><td>DescreverColeção</td></tr>
<tr><td>Global</td><td>Mostrar colecções</td><td>Mostrar colecções</td></tr>
<tr><td>Global</td><td>Renomear coleção</td><td>Renomear coleção</td></tr>
<tr><td>Global</td><td>FlushAll</td><td>FlushAll</td></tr>
<tr><td>Global</td><td>CriarPropriedade</td><td>CriarUsuário CriarFunção</td></tr>
<tr><td>Global</td><td>DropOwnership</td><td>DeleteCredential DropRole</td></tr>
<tr><td>Global</td><td>SelectOwnership</td><td>SelectRole/SelectGrant</td></tr>
<tr><td>Global</td><td>ManageOwnership</td><td>OperateUserRole OperatePrivilege</td></tr>
<tr><td>Global</td><td>CreateResourceGroup (criar grupo de recursos)</td><td>CriarGrupo de Recursos</td></tr>
<tr><td>Global</td><td>DropResourceGroup</td><td>DropResourceGroup</td></tr>
<tr><td>Global</td><td>DescreverResourceGroup</td><td>DescreverGrupo de Recursos</td></tr>
<tr><td>Global</td><td>ListResourceGroups</td><td>Listar grupos de recursos</td></tr>
<tr><td>Global</td><td>TransferNode</td><td>Nó de transferência</td></tr>
<tr><td>Global</td><td>TransferReplica</td><td>TransferReplica</td></tr>
<tr><td>Global</td><td>CriarBaseDeDados</td><td>CriarBaseDeDados</td></tr>
<tr><td>Global</td><td>DropDatabase</td><td>DropDatabase</td></tr>
<tr><td>Global</td><td>Listar bases de dados</td><td>ListDatabases</td></tr>
<tr><td>Global</td><td>CriarAlias</td><td>CriarAlias</td></tr>
<tr><td>Global</td><td>DropAlias</td><td>DropAlias</td></tr>
<tr><td>Global</td><td>DescreverAlias</td><td>DescreverAlias</td></tr>
<tr><td>Global</td><td>ListAliases</td><td>ListAliases</td></tr>
<tr><td>Utilizador</td><td>UpdateUser</td><td>ActualizarCredencial</td></tr>
<tr><td>Utilizador</td><td>SelectUser</td><td>SelectUser</td></tr>
</tbody>
</table>
<div class="alert note">
<li>Os nomes dos objectos e dos privilégios são sensíveis a maiúsculas e minúsculas.</li>
<li>Para conceder todos os privilégios a um tipo de objeto, como Coleção, Global, Utilizador, utilize "*" para o nome do privilégio. </li>
<li>O nome de privilégio "*" para o objeto Global não inclui o privilégio Todos, porque o privilégio Todos inclui todas as permissões, incluindo qualquer coleção e objeto de utilizador.</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Saiba como <a href="/docs/pt/v2.4.x/rbac.md">habilitar o RBAC</a>.</li>
</ul>
