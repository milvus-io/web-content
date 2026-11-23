---
id: rbac.md
title: Le RBAC expliqué
summary: >-
  Le RBAC (contrôle d'accès basé sur les rôles) permet de gérer les opérations
  que les utilisateurs peuvent effectuer au niveau des collections, des bases de
  données et des instances, en fonction des rôles qui leur sont attribués.
---
<h1 id="RBAC-Explained" class="common-anchor-header">Le RBAC expliqué<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Le RBAC (Role-Based Access Control, ou contrôle d’accès basé sur les rôles) est une méthode de contrôle d’accès fondée sur les rôles. Grâce au RBAC, vous pouvez contrôler avec précision les opérations que les utilisateurs peuvent effectuer au niveau des collections, des bases de données et des instances, ce qui renforce la sécurité des données.</p>
<p>Contrairement aux modèles traditionnels de contrôle d'accès des utilisateurs, le RBAC introduit la notion de <strong>rôles</strong>. Dans le modèle RBAC, vous  attribuez des privilèges à des rôles, puis vous attribuez ces rôles aux utilisateurs. Les utilisateurs peuvent alors bénéficier de ces privilèges.</p>
<p>Le modèle RBAC permet d’améliorer l’efficacité de la gestion du contrôle d’accès. Par exemple, si plusieurs utilisateurs ont besoin du même ensemble de privilèges, vous n’avez pas besoin de définir manuellement les privilèges pour chaque utilisateur. Vous pouvez plutôt créer un rôle et l’attribuer aux utilisateurs. Si vous souhaitez modifier les privilèges de ces utilisateurs, il vous suffit d’ajuster les privilèges du rôle ; la modification s’appliquera alors à tous les utilisateurs disposant de ce rôle.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">Concepts clés du RBAC<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" /> 
   <span>Utilisateurs Rôles Privilèges</span>
  
 </span></p>
<p>Le modèle RBAC comporte cinq composantes principales.</p>
<ul>
<li><p><strong>Ressource :</strong> l’entité à laquelle il est possible d’accéder. Il existe trois niveaux de ressources dans Milvus : l’instance, la base de données et la collection.</p></li>
<li><p><strong>Privilège :</strong> autorisation permettant d'effectuer certaines opérations sur les ressources Milvus (par exemple, créer des collections, insérer des données, etc.).</p></li>
<li><p><strong>Groupe de privilèges :</strong> ensemble de plusieurs privilèges.</p></li>
<li><p><strong>Rôle :</strong> un rôle se compose de deux parties : les privilèges et les ressources. Les privilèges définissent le type d’opérations qu’un rôle peut effectuer, tandis que les ressources définissent les ressources cibles sur lesquelles ces opérations peuvent être effectuées. Par exemple, le rôle d’administrateur de base de données permet d’effectuer des opérations de lecture, d’écriture et de gestion sur certaines bases de données.</p></li>
<li><p><strong>Utilisateur :</strong> un utilisateur est une personne qui utilise Milvus. Chaque utilisateur dispose d’un identifiant unique et se voit attribuer un ou plusieurs rôles.</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">Procédures<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour mettre en place un contrôle d’accès via le modèle RBAC, vous devez suivre les étapes ci-dessous :</p>
<ol>
<li><p><strong><a href="/docs/fr/users_and_roles.md#Create-a-user">Créer un utilisateur</a></strong>: outre l’utilisateur par défaut <code translate="no">root</code> dans Milvus, vous pouvez créer de nouveaux utilisateurs et définir des mots de passe pour garantir la sécurité des données.</p></li>
<li><p><strong><a href="/docs/fr/users_and_roles.md#Create-a-role">Créer un rôle</a></strong>: vous pouvez créer des rôles personnalisés en fonction de vos besoins. Les capacités spécifiques d’un rôle sont déterminées par ses privilèges.</p></li>
<li><p><strong><a href="/docs/fr/privilege_group.md">Créer un groupe de privilèges</a></strong>: regroupez plusieurs privilèges au sein d’un même groupe afin de simplifier le processus d’attribution des privilèges à un rôle.</p></li>
<li><p><strong><a href="/docs/fr/grant_privileges.md">Attribuer des privilèges ou des groupes de privilèges à un rôle</a></strong>: définissez les capacités d’un rôle en lui attribuant des privilèges ou des groupes de privilèges.</p></li>
<li><p><strong><a href="/docs/fr/grant_roles.md">Attribuer des rôles aux utilisateurs</a></strong>: attribuez des rôles dotés de certains privilèges aux utilisateurs afin que ceux-ci puissent bénéficier des privilèges associés à ce rôle. Un même rôle peut être attribué à plusieurs utilisateurs.</p></li>
</ol>
