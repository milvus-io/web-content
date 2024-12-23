---
id: rbac.md
related_key: enable RBAC
summary: >-
  Le RBAC (Role-Based Access Control) est une méthode de contrôle d'accès basée
  sur les rôles. Avec le RBAC, vous pouvez contrôler finement les opérations que
  les utilisateurs peuvent effectuer au niveau de la collection, de la base de
  données et de l'instance, ce qui renforce la sécurité des données. 
title: RBAC expliqué
---
<h1 id="RBAC-Explained​" class="common-anchor-header">RBAC expliqué<button data-href="#RBAC-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>Le RBAC (Role-Based Access Control) est une méthode de contrôle d'accès basée sur les rôles. Avec le RBAC, vous pouvez contrôler finement les opérations que les utilisateurs peuvent effectuer au niveau de la collection, de la base de données et de l'instance, ce qui renforce la sécurité des données. </p>
<p>Contrairement aux modèles traditionnels de contrôle d'accès des utilisateurs, le RBAC introduit le concept de <strong>rôles</strong>. Dans le modèle RBAC, vous accordez des privilèges à des rôles, puis vous accordez ces rôles à des utilisateurs. Les utilisateurs peuvent ensuite obtenir des privilèges. </p>
<p>Le modèle RBAC peut améliorer l'efficacité de la gestion du contrôle d'accès. Par exemple, si plusieurs utilisateurs ont besoin du même ensemble de privilèges, il n'est pas nécessaire de définir manuellement les privilèges de chaque utilisateur. Au lieu de cela, vous pouvez créer un rôle et l'attribuer aux utilisateurs. Si vous souhaitez modifier les privilèges de ces utilisateurs, il vous suffit de modifier les privilèges du rôle et la modification sera appliquée à tous les utilisateurs ayant ce rôle.</p>
<h2 id="RBAC-key-concepts​" class="common-anchor-header">Concepts clés de RBAC<button data-href="#RBAC-key-concepts​" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/users_roles_privileges.png" alt="Users, roles, and privileges" class="doc-image" id="users,-roles,-and-privileges" />
   </span> <span class="img-wrapper"> <span>Utilisateurs, rôles et privilèges</span> </span></p>
<p>Le modèle RBAC se compose de quatre éléments principaux.</p>
<ul>
<li><p>**La ressource : **L'entité ressource à laquelle on peut accéder. Il existe trois niveaux de ressources dans Milvus - instance, base de données et collection.</p></li>
<li><p>**Privilège : **L'autorisation d'effectuer certaines opérations sur les ressources Milvus (par exemple, créer des collections, insérer des données, etc.) </p></li>
<li><p>**Groupe de privilèges : **Un groupe de privilèges multiples.</p></li>
<li><p>**Rôle : **Un rôle se compose de deux parties : les privilèges et les ressources. Les privilèges définissent le type d'opérations qu'un rôle peut effectuer, tandis que les ressources définissent les ressources cibles sur lesquelles les opérations peuvent être effectuées. Par exemple, le rôle d'administrateur de base de données peut effectuer des opérations de lecture, d'écriture et de gestion sur certaines bases de données.</p></li>
<li><p>**Utilisateur : **Un utilisateur est une personne qui utilise Milvus. Chaque utilisateur a un identifiant unique et se voit attribuer un ou plusieurs rôles. </p></li>
</ul>
<h2 id="Procedures​" class="common-anchor-header">Procédures<button data-href="#Procedures​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour réaliser le contrôle d'accès via RBAC, vous devez suivre les étapes ci-dessous.</p>
<ol>
<li><p><a href="/docs/fr/users_and_roles.md#Create-a-user">Créer un utilisateur</a>: Outre l'utilisateur par défaut <code translate="no">root</code> dans Milvus, vous pouvez créer de nouveaux utilisateurs et définir des mots de passe pour protéger la sécurité des données.</p></li>
<li><p><a href="/docs/fr/users_and_roles.md#Create-a-role">Créer un rôle</a>: Vous pouvez créer des rôles personnalisés en fonction de vos besoins. Les capacités spécifiques d'un rôle sont déterminées par ses privilèges.</p></li>
<li><p><a href="/docs/fr/privilege_group.md">Créer un groupe de privilèges</a>: Combinez plusieurs privilèges en un seul groupe de privilèges afin de rationaliser le processus d'octroi de privilèges à un rôle.</p></li>
<li><p><a href="/docs/fr/grant_privileges.md">Accorder des privilèges ou des groupes de privilèges à un rôle</a>: Définir les capacités d'un rôle en lui accordant des privilèges ou des groupes de privilèges. </p></li>
<li><p><a href="/docs/fr/grant_roles.md">Attribuer des rôles aux utilisateurs</a>: Accorder des rôles avec certains privilèges aux utilisateurs afin que ces derniers puissent bénéficier des privilèges d'un rôle. Un même rôle peut être attribué à plusieurs utilisateurs.</p></li>
</ol>
