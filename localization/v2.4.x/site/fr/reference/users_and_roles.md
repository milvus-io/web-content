---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Découvrez la définition des utilisateurs, des rôles, des objets et des
  privilèges dans le cadre du contrôle d'accès basé sur les rôles (RBAC).
title: 'Utilisateurs, privilèges et rôles'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Utilisateurs, privilèges et rôles<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente une vue d'ensemble du contrôle d'accès basé sur les rôles (RBAC) dans Milvus, en détaillant les définitions et les relations entre les utilisateurs, les rôles, les objets et les privilèges.</p>
<p>La figure suivante illustre la relation entre les objets, les privilèges, les rôles et les utilisateurs.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>utilisateurs_et_rôles</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">Concepts clés<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour gérer le contrôle d'accès aux ressources Milvus, il est important de comprendre les composants clés de la RBAC : types d'objets, noms d'objets, utilisateurs, rôles et privilèges.</p>
<ul>
<li><p><strong>Type d'objet</strong>: catégorie de l'objet pour lequel un privilège est attribué. Le type d'objet peut être :</p>
<ul>
<li><code translate="no">Global</code>: des objets à l'échelle du système, permettant à l'utilisateur d'effectuer des actions qui affectent toutes les collections, tous les utilisateurs ou tous les paramètres à l'échelle du système.</li>
<li><code translate="no">Collection</code>: des objets spécifiques à une collection, permettant à l'utilisateur d'effectuer des actions telles que la création d'index, le chargement de données, l'insertion ou la suppression de données et l'interrogation de données au sein d'une collection spécifique.</li>
<li><code translate="no">User</code>: Objets liés à la gestion des utilisateurs, permettant à l'utilisateur de gérer les informations d'identification et les rôles des utilisateurs de la base de données, comme la mise à jour des informations d'identification des utilisateurs ou l'affichage des détails de l'utilisateur.</li>
</ul></li>
<li><p><strong>Nom de l'objet</strong>: nom spécifique de l'objet dont l'accès doit être contrôlé. Par exemple :</p>
<ul>
<li>Si le type d'objet est <code translate="no">Global</code>, le nom de l'objet doit être défini sur le caractère générique (<code translate="no">*</code>), indiquant tous les objets du type spécifié.</li>
<li>Si le type d'objet est <code translate="no">Collection</code>, le nom de l'objet est le nom d'une collection.</li>
<li>Si le type d'objet est <code translate="no">User</code>, le nom de l'objet est le nom d'un utilisateur de la base de données.</li>
</ul></li>
<li><p><strong>Utilisateur</strong>: une personne ou une application qui interagit avec Milvus, qui consiste en un nom d'utilisateur et un mot de passe correspondant.</p></li>
<li><p><strong>Privilège</strong>: définit les actions qui peuvent être effectuées et les ressources auxquelles il est possible d'accéder. Les privilèges ne sont pas accordés directement aux utilisateurs mais sont attribués à des rôles.</p></li>
<li><p><strong>Rôle</strong>: définit l'ensemble des privilèges dont dispose un utilisateur pour certains objets. Une fois qu'un rôle est associé à un utilisateur, ce dernier hérite de tous les privilèges accordés à ce rôle.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Exemple : Octroi de privilèges<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>L'extrait de code suivant montre comment accorder un privilège <code translate="no">CreateIndex</code> à un rôle sur une collection spécifique :</p>
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
<p>Pour obtenir plus d'informations sur les API liées aux privilèges, reportez-vous à <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>Pour obtenir plus d'informations sur les API liées aux privilèges, reportez-vous à <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> et <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>Pour obtenir plus d'informations sur les API liées aux privilèges, reportez-vous à <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> et <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Utilisateurs et rôles par défaut<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus crée par défaut un utilisateur <code translate="no">root</code> avec un mot de passe par défaut <code translate="no">Milvus</code>. L'utilisateur <code translate="no">root</code> se voit accorder les privilèges <code translate="no">admin</code>, ce qui signifie que cet utilisateur <code translate="no">root</code> peut avoir accès à toutes les ressources et effectuer toutes les actions.</p>
<p>Si un utilisateur est associé au rôle <code translate="no">public</code>, il bénéficie des privilèges suivants :</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">Liste des types d'objets et des privilèges<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant répertorie les valeurs que vous pouvez choisir lors de l'<a href="/docs/fr/v2.4.x/rbac.md">activation de RBAC</a>.</p>
<table>
<thead>
<tr><th>Type d'objet</th><th>Nom du privilège</th><th>Description de l'API pertinente côté client</th></tr>
</thead>
<tbody>
<tr><td>Collection</td><td>CreateIndex</td><td>Créer un index</td></tr>
<tr><td>Collection</td><td>Index de dépôt</td><td>DropIndex</td></tr>
<tr><td>Collection</td><td>Détails de l'index</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Collection</td><td>Chargement</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Collection</td><td>GetLoadingProgress</td><td>GetLoadingProgress</td></tr>
<tr><td>Collection</td><td>GetLoadState</td><td>Obtenir l'état de chargement</td></tr>
<tr><td>Collection</td><td>Release</td><td>Collection Release</td></tr>
<tr><td>Collection</td><td>Insérer</td><td>Insérer</td></tr>
<tr><td>Collection</td><td>Supprimer</td><td>Supprimer</td></tr>
<tr><td>Collection</td><td>Insérer</td><td>Supprimer</td></tr>
<tr><td>Collection</td><td>Recherche</td><td>Recherche</td></tr>
<tr><td>Collecte</td><td>Chasse d'eau</td><td>Chasse d'eau/GetFlushState</td></tr>
<tr><td>Collection</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>Collection</td><td>Requête</td><td>Requête</td></tr>
<tr><td>Collection</td><td>Obtenir des statistiques</td><td>Obtenir des statistiques sur la collection</td></tr>
<tr><td>Collection</td><td>Compactage</td><td>Compacter</td></tr>
<tr><td>Collection</td><td>Importation</td><td>BulkInsert/Import</td></tr>
<tr><td>Collection</td><td>Bilan de charge</td><td>Bilan de charge</td></tr>
<tr><td>Collection</td><td>Créer une partition</td><td>Créer une partition</td></tr>
<tr><td>Collection</td><td>DropPartition</td><td>DropPartition</td></tr>
<tr><td>Collection</td><td>ShowPartitions</td><td>ShowPartitions</td></tr>
<tr><td>Collection</td><td>HasPartition</td><td>HasPartition</td></tr>
<tr><td>Global</td><td>Toutes</td><td>Toutes les autorisations d'opérations API dans cette table</td></tr>
<tr><td>Globale</td><td>Créer une collection</td><td>Créer une collection</td></tr>
<tr><td>Globale</td><td>DropCollection</td><td>DropCollection</td></tr>
<tr><td>Global</td><td>Décrire la collection</td><td>DescribeCollection</td></tr>
<tr><td>Global</td><td>Afficher les collections</td><td>Afficher les collections</td></tr>
<tr><td>Global</td><td>Renommer la collection</td><td>RenameCollection</td></tr>
<tr><td>Global</td><td>Tous les flux</td><td>FlushAll</td></tr>
<tr><td>Global</td><td>Créer un propriétaire</td><td>CreateUser CreateRole</td></tr>
<tr><td>Global</td><td>Abandonner le propriétaire</td><td>DeleteCredential DropRole</td></tr>
<tr><td>Global</td><td>Sélectionner un propriétaire</td><td>SelectRole/SelectGrant</td></tr>
<tr><td>Global</td><td>ManageOwnership</td><td>Exploiter le rôle de l'utilisateur Exploiter le privilège</td></tr>
<tr><td>Global</td><td>Créer un groupe de ressources</td><td>Créer un groupe de ressources</td></tr>
<tr><td>Global</td><td>DropResourceGroup</td><td>DropResourceGroup</td></tr>
<tr><td>Global</td><td>DescribeResourceGroup</td><td>DescribeResourceGroup (Décrire le groupe de ressources)</td></tr>
<tr><td>Global</td><td>ListResourceGroups</td><td>Liste des groupes de ressources</td></tr>
<tr><td>Global</td><td>TransferNode</td><td>TransferNode</td></tr>
<tr><td>Global</td><td>TransferReplica</td><td>Réplique de transfert</td></tr>
<tr><td>Global</td><td>Créer une base de données</td><td>Créer une base de données</td></tr>
<tr><td>Global</td><td>DropDatabase</td><td>DropDatabase</td></tr>
<tr><td>Globale</td><td>ListDatabases</td><td>Bases de données de listes</td></tr>
<tr><td>Globale</td><td>Créer un alias</td><td>Créer un alias</td></tr>
<tr><td>Global</td><td>Abandonner l'alias</td><td>Abandon de l'alias</td></tr>
<tr><td>Global</td><td>DescribeAlias</td><td>DescribeAlias</td></tr>
<tr><td>Global</td><td>ListAliases</td><td>Liste des noms de domaine</td></tr>
<tr><td>Utilisateur</td><td>UpdateUser</td><td>Mise à jour de l'accréditation</td></tr>
<tr><td>User</td><td>SelectUser</td><td>SelectUser</td></tr>
</tbody>
</table>
<div class="alert note">
<li>Les noms des objets et des privilèges sont sensibles à la casse.</li>
<li>Pour accorder tous les privilèges à un type d'objet, comme Collection, Global, User, utilisez "*" comme nom de privilège. </li>
<li>Le nom de privilège "*" pour l'objet Global n'inclut pas le privilège Tous, car le privilège Tous inclut toutes les autorisations, y compris celles des objets Collection et Utilisateur.</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Découvrez comment <a href="/docs/fr/v2.4.x/rbac.md">activer la fonction RBAC</a>.</li>
</ul>
