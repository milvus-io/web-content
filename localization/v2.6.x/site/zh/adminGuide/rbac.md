---
id: rbac.md
title: RBAC 解释
summary: >-
  RBAC（基于角色的访问控制）是一种基于角色的访问控制方法。通过 RBAC，可以精细控制用户在
  Collections、数据库和实例级别上可以执行的操作，增强数据的安全性。
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBAC 解释<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC（基于角色的访问控制）是一种基于角色的访问控制方法。通过 RBAC，可以精细地控制用户在 Collections、数据库和实例级别上可以执行的操作，增强数据的安全性。</p>
<p>与传统的用户访问控制模型不同，RBAC 引入了<strong>角色</strong>的概念。在 RBAC 模型中，先授予角色权限，然后再将这些角色授予用户。然后，用户才能获得权限。</p>
<p>RBAC 模型可以提高访问控制管理的效率。例如，如果多个用户需要同一套权限，就不需要为每个用户手动设置权限。相反，你可以创建一个角色并将该角色分配给用户。如果要调整这些用户的权限，只需调整角色的权限，修改后的权限就会应用到所有拥有该角色的用户。</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBAC 主要概念<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" />
   </span> <span class="img-wrapper"> <span>用户 角色 权限</span> </span></p>
<p>RBAC 模型有四个主要组成部分。</p>
<ul>
<li><p><strong>资源：</strong>可访问的资源实体。在 Milvus 中，资源分为三个级别--实例、数据库和 Collections。</p></li>
<li><p><strong>权限：</strong>对 Milvus 资源执行特定操作的权限（如创建 Collection、插入数据等）。</p></li>
<li><p><strong>权限组：</strong>由多个权限组成的组。</p></li>
<li><p><strong>角色：</strong>角色由两部分组成--权限和资源。权限定义了角色可以执行的操作类型，而资源则定义了可以执行操作的目标资源。例如，数据库管理员角色可以对某些数据库执行读、写和管理操作。</p></li>
<li><p><strong>用户：</strong>用户是指使用 Milvus 的人。每个用户都有一个唯一的 ID，并被授予一个或多个角色。</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">程序<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>要通过 RBAC 实现访问控制，需要遵循以下步骤：</p>
<ol>
<li><p><strong><a href="/docs/zh/users_and_roles.md#Create-a-user">创建用户</a></strong>：除了 Milvus 中的默认用户<code translate="no">root</code> 外，您还可以创建新用户并设置密码，以保护数据安全。</p></li>
<li><p><strong><a href="/docs/zh/users_and_roles.md#Create-a-role">创建角色</a></strong>：您可以根据需要创建自定义角色。角色的具体功能由其权限决定。</p></li>
<li><p><strong><a href="/docs/zh/privilege_group.md">创建权限组</a></strong>：将多个权限合并为一个权限组，以简化向角色授予权限的流程。</p></li>
<li><p><strong><a href="/docs/zh/grant_privileges.md">向角色授予权限或权限组</a></strong>：通过向角色授予权限或权限组来定义角色的功能。</p></li>
<li><p><strong><a href="/docs/zh/grant_roles.md">向用户授予角色</a></strong>：向用户授予具有特定权限的角色，这样用户就可以拥有某个角色的权限。一个角色可以授予多个用户。</p></li>
</ol>
