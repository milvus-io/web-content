---
id: grant_privileges.md
title: Attribuer un privilège ou un groupe de privilèges à des rôles
summary: >-
  Une fois un rôle créé, vous pouvez lui attribuer des privilèges. Ce guide
  explique comment attribuer des privilèges ou des groupes de privilèges à un
  rôle.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Attribuer un privilège ou un groupe de privilèges à des rôles<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Une fois un rôle créé, vous pouvez lui attribuer des privilèges. Ce guide explique comment attribuer des privilèges ou des groupes de privilèges à un rôle.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Attribuer un privilège ou un groupe de privilèges à un rôle<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 introduit une nouvelle version de l’API qui simplifie l’opération d’attribution. Vous n’avez plus besoin de rechercher le type d’objet lorsque vous attribuez un privilège à un rôle. Vous trouverez ci-dessous les paramètres et leurs explications correspondantes.</p>
<ul>
<li><p><strong>role_name :</strong> nom du rôle cible auquel un ou plusieurs privilèges ou groupes de privilèges doivent être attribués.</p></li>
<li><p><strong>resource</strong>: la ressource cible d’un privilège, qui peut être une instance, une base de données ou une collection spécifique.</p></li>
</ul>
<p>Le tableau ci-dessous explique comment spécifier la ressource dans la méthode ` <code translate="no">client.grantV2()</code> `.</p>
<table>
   <tr>
     <th><p><strong>Niveau</strong></p></th>
     <th><p><strong>Ressource</strong></p></th>
     <th><p><strong>Méthode d'octroi</strong></p></th>
     <th><p><strong>Remarques</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Collection</strong></p></td>
     <td><p>Une collection spécifique</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Saisissez le nom de la collection cible et le nom de la base de données à laquelle appartient cette collection.</p></td>
   </tr>
   <tr>
     <td><p>Toutes les collections d'une base de données spécifique</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Saisissez le nom de la base de données cible et une <code translate="no">*</code>, comprenant des caractères génériques, comme nom de collection.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Base de données</strong></p></td>
     <td><p>Une base de données spécifique</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Saisissez le nom de la base de données cible et une <code translate="no">*</code> avec des caractères génériques comme nom de collection.</p></td>
   </tr>
   <tr>
     <td><p>Toutes les bases de données de l'instance actuelle</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Saisissez <code translate="no">*</code> comme nom de base de données et <code translate="no">*</code> comme nom de collection.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instance</strong></p></td>
     <td><p>L'instance actuelle</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Saisissez <code translate="no">*</code> comme nom de base de données et <code translate="no">*</code> comme nom de collection.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Privilège</strong>: le privilège spécifique ou <a href="/docs/fr/v2.6.x/privilege_group.md">le groupe de privilèges</a> que vous devez attribuer à un rôle. Actuellement, Milvus propose 56 types de privilèges que vous pouvez attribuer. Le tableau ci-dessous répertorie les privilèges disponibles dans Milvus.</p>
<p><div class="alert note"></p>
<p>La colonne « Type » du tableau ci-dessous est destinée à faciliter la recherche rapide des privilèges et sert uniquement à des fins de classification. Lorsque vous accordez des privilèges, vous n’avez pas besoin de comprendre ces types. Il vous suffit de saisir les privilèges correspondants.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>Type</strong></p></th>
<th><p><strong>Privilège</strong></p></th>
<th><p><strong>Description</strong></p></th>
<th><p><strong>Description de l’API correspondante côté client</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>Privilèges de base de données</p></td>
<td><p>ListDatabases</p></td>
<td><p>Afficher toutes les bases de données de l'instance actuelle</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>Afficher les détails d'une base de données</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage_databases.md">Décrire la base de données</a></p></td>
</tr>
<tr>
<td><p>CreateDatabase</p></td>
<td><p>Créer une base de données</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage_databases.md">Créer une base de données</a></p></td>
</tr>
<tr>
<td><p>Supprimer une base de données</p></td>
<td><p>Supprimer une base de données</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage_databases.md">Supprimer une base de données</a></p></td>
</tr>
<tr>
<td><p>Modifier la base de données</p></td>
<td><p>Modifier les propriétés d'une base de données</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Privilèges de collection</p></td>
<td><p>GetFlushState</p></td>
<td><p>Vérifier l'état de l'opération de vidage de la collection</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>Vérifier l'état de chargement d'une collection</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>Vérifier la progression du chargement d'une collection</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>ShowCollections</p></td>
<td><p>Afficher toutes les collections pour lesquelles vous disposez des droits d'accès</p></td>
<td><p><a href="/docs/fr/v2.6.x/view-collections.md">Afficher les collections</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>Afficher tous les alias d'une collection</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">Liste des alias</a></p></td>
</tr>
<tr>
<td><p>Décrire une collection</p></td>
<td><p>Afficher les détails d'une collection</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">DescribeCollection</a></p></td>
</tr>
<tr>
<td><p>DescribeAlias</p></td>
<td><p>Afficher les détails d'un alias</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">DescribeAlias</a></p></td>
</tr>
<tr>
<td><p>GetStatistics</p></td>
<td><p>Obtenir les statistiques d'une collection (par exemple, le nombre d'entités dans une collection)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
</tr>
<tr>
<td><p>Créer une collection</p></td>
<td><p>Créer une collection</p></td>
<td><p><a href="/docs/fr/v2.6.x/create-collection.md">Créer une collection</a></p></td>
</tr>
<tr>
<td><p>Supprimer une collection</p></td>
<td><p>Supprimer une collection</p></td>
<td><p><a href="/docs/fr/v2.6.x/drop-collection.md">Supprimer une collection</a></p></td>
</tr>
<tr>
<td><p>Charger</p></td>
<td><p>Charger une collection</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>Libérer</p></td>
<td><p>Libérer une collection</p></td>
<td><p><a href="/docs/fr/v2.6.x/load-and-release.md">ReleaseCollection</a></p></td>
</tr>
<tr>
<td><p>Vider</p></td>
<td><p>Enregistre toutes les entités d'une collection dans un segment scellé. Toute entité insérée après l'opération de vidage sera stockée dans un nouveau segment.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Vider/Obtenir l'état de vidage</a></p></td>
</tr>
<tr>
<td><p>Compactage</p></td>
<td><p>Déclencher manuellement la compaction</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Compacter</a></p></td>
</tr>
<tr>
<td><p>Renommer la collection</p></td>
<td><p>Renommer une collection</p></td>
<td><p><a href="/docs/fr/v2.6.x/modify-collection.md">Renommer une collection</a></p></td>
</tr>
<tr>
<td><p>Créer un alias</p></td>
<td><p>Créer un alias pour une collection</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage-aliases.md">Créer un alias</a></p></td>
</tr>
<tr>
<td><p>SupprimerAlias</p></td>
<td><p>Supprimer l'alias d'une collection</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage-aliases.md">SupprimerAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>Vider toutes les collections d'une base de données</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>Privilèges de partition</p></td>
<td><p>HasPartition</p></td>
<td><p>Vérifier si une partition existe</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>ShowPartitions</p></td>
<td><p>Afficher toutes les partitions d'une collection</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage-partitions.md">Afficher les partitions</a></p></td>
</tr>
<tr>
<td><p>CreatePartition</p></td>
<td><p>Créer une partition</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage-partitions.md">CréerPartition</a></p></td>
</tr>
<tr>
<td><p>Supprimer une partition</p></td>
<td><p>Supprimer une partition</p></td>
<td><p><a href="/docs/fr/v2.6.x/manage-partitions.md">Supprimer une partition</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Privilèges d'index</p></td>
<td><p>IndexDetail</p></td>
<td><p>Afficher les détails d'un index</p></td>
<td><p><a href="/docs/fr/v2.6.x/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>Créer un index</p></td>
<td><p>Créer un index</p></td>
<td><p><a href="/docs/fr/v2.6.x/index-vector-fields.md">Créer un index</a></p></td>
</tr>
<tr>
<td><p>DropIndex</p></td>
<td><p>Supprimer un index</p></td>
<td><p><a href="/docs/fr/v2.6.x/index-vector-fields.md">Supprimer un index</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilèges de gestion des ressources</p></td>
<td><p>Équilibrage de charge</p></td>
<td><p>Réaliser l'équilibrage de charge</p></td>
<td><p><a href="/docs/fr/v2.6.x/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>CreateResourceGroup</p></td>
<td><p>Créer un groupe de ressources</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CreateResourceGroup</a></p></td>
</tr>
<tr>
<td><p>Supprimer un groupe de ressources</p></td>
<td><p>Supprimer un groupe de ressources</p></td>
<td><p><a href="/docs/fr/v2.6.x/resource_group.md">Supprimer un groupe de ressources</a></p></td>
</tr>
<tr>
<td><p>UpdateResourceGroups</p></td>
<td><p>Mettre à jour un groupe de ressources</p></td>
<td><p><a href="/docs/fr/v2.6.x/resource_group.md">UpdateResourceGroups</a></p></td>
</tr>
<tr>
<td><p>DescribeResourceGroup</p></td>
<td><p>Afficher les détails d'un groupe de ressources</p></td>
<td><p><a href="/docs/fr/v2.6.x/resource_group.md">DescribeResourceGroup</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>Afficher tous les groupes de ressources de l'instance actuelle</p></td>
<td><p><a href="/docs/fr/v2.6.x/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>Transférer des nœuds entre des groupes de ressources</p></td>
<td><p><a href="/docs/fr/v2.6.x/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>Transférer des répliques entre des groupes de ressources</p></td>
<td><p><a href="/docs/fr/v2.6.x/resource_group.md">TransferReplica</a></p></td>
</tr>
<tr>
<td><p>Sauvegarde RBAC</p></td>
<td><p>Créer une sauvegarde de toutes les opérations liées au RBAC dans l'instance actuelle</p></td>
<td><p>Sauvegarde RBAC</p></td>
</tr>
<tr>
<td><p>RestoreRBAC</p></td>
<td><p>Restaurer une sauvegarde de toutes les opérations liées au RBAC dans l'instance actuelle</p></td>
<td><p>Restauration RBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>Privilèges d'entité</p></td>
<td><p>Requête</p></td>
<td><p>Effectuer une requête</p></td>
<td><p><a href="/docs/fr/v2.6.x/get-and-scalar-query.md">Requête</a></p></td>
</tr>
<tr>
<td><p>Recherche</p></td>
<td><p>Effectuer une recherche</p></td>
<td><p><a href="/docs/fr/v2.6.x/single-vector-search.md">Recherche</a></p></td>
</tr>
<tr>
<td><p>Insérer</p></td>
<td><p>Insérer des entités</p></td>
<td><p><a href="/docs/fr/v2.6.x/insert-update-delete.md">Insérer</a></p></td>
</tr>
<tr>
<td><p>Supprimer</p></td>
<td><p>Supprimer des entités</p></td>
<td><p><a href="/docs/fr/v2.6.x/delete-entities.md">Supprimer</a></p></td>
</tr>
<tr>
<td><p>Mettre à jour ou insérer</p></td>
<td><p>Mettre à jour ou insérer des entités</p></td>
<td><p><a href="/docs/fr/v2.6.x/upsert-entities.md">Mettre à jour ou insérer</a></p></td>
</tr>
<tr>
<td><p>Importer</p></td>
<td><p>Insertion ou importation en masse d'entités</p></td>
<td><p><a href="/docs/fr/v2.6.x/import-data.md">Insertion en masse/Importation</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilèges RBAC</p></td>
<td><p>Créer une propriété</p></td>
<td><p>Créer un utilisateur ou un rôle</p></td>
<td><p><a href="/docs/fr/v2.6.x/users_and_roles.md">CreateUser/CreateRole</a></p></td>
</tr>
<tr>
<td><p>UpdateUser</p></td>
<td><p>Mettre à jour le mot de passe d'un utilisateur</p></td>
<td><p><a href="/docs/fr/v2.6.x/users_and_roles.md">Mettre à jour les identifiants</a></p></td>
</tr>
<tr>
<td><p>Supprimer la propriété</p></td>
<td><p>Supprimer le mot de passe d'un utilisateur ou un rôle</p></td>
<td><p><a href="/docs/fr/v2.6.x/drop_users_roles.md">Supprimer les identifiants/Supprimer un rôle</a></p></td>
</tr>
<tr>
<td><p>SelectOwnership</p></td>
<td><p>Afficher tous les utilisateurs auxquels un rôle spécifique a été attribué</p></td>
<td><p><a href="/docs/fr/v2.6.x/grant_roles.md">Sélectionner un rôle/Sélectionner une autorisation</a></p></td>
</tr>
<tr>
<td><p>Gérer la propriété</p></td>
<td><p>Gérer un utilisateur ou un rôle, ou attribuer un rôle à un utilisateur</p></td>
<td><p><a href="/docs/fr/v2.6.x/privilege_group.md">Gérer le rôle d'un utilisateur/Gérer les privilèges/Gérer les privilèges V2</a></p></td>
</tr>
<tr>
<td><p>Sélectionner un utilisateur</p></td>
<td><p>Afficher tous les rôles attribués à un utilisateur</p></td>
<td><p><a href="/docs/fr/v2.6.x/grant_roles.md">Sélectionner un utilisateur</a></p></td>
</tr>
<tr>
<td><p>CreatePrivilegeGroup</p></td>
<td><p>Créer un groupe de privilèges</p></td>
<td><p><a href="/docs/fr/v2.6.x/privilege_group.md">CreatePrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>Supprimer un groupe de privilèges</p></td>
<td><p>Supprimer un groupe de privilèges</p></td>
<td><p><a href="/docs/fr/v2.6.x/privilege_group.md">Supprimer un groupe de privilèges</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>Afficher tous les groupes de privilèges de l'instance actuelle</p></td>
<td><p><a href="/docs/fr/v2.6.x/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>Gérer un groupe de privilèges</p></td>
<td><p>Ajouter ou supprimer des privilèges d'un groupe de privilèges</p></td>
<td><p><a href="/docs/fr/v2.6.x/privilege_group.md">GérerUnGroupeDePrivilèges</a></p></td>
</tr>
</table></p></li>
</ul>
<p>L'exemple suivant montre comment attribuer le privilège « <code translate="no">PrivilegeSearch</code> » sur <code translate="no">collection_01</code> dans la base de données <code translate="no">default</code>, ainsi qu'un groupe de privilèges nommé « <code translate="no">privilege_group_1</code> » au rôle « <code translate="no">role_a</code> ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">Décrire un rôle<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple suivant montre comment afficher les privilèges accordés au rôle <code translate="no">role_a</code> à l'aide de la méthode <code translate="no">describe_role</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Voici un exemple de résultat.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
     <span class="hljs-attr">&quot;role&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
     <span class="hljs-attr">&quot;privileges&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
         <span class="hljs-punctuation">{</span>
             <span class="hljs-attr">&quot;collection_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;collection_01&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;db_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;default&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;role_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;privilege&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Search&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;grantor_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;root&quot;</span>
         <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Révoquer un privilège ou un groupe de privilèges d'un rôle<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple suivant montre comment révoquer le privilège <code translate="no">PrivilegeSearch</code> sur <code translate="no">collection_01</code> dans la base de données <code translate="no">default</code>, ainsi que le groupe de privilèges <code translate="no">privilege_group_1</code> qui ont été accordés au rôle <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
