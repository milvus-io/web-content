---
id: rbac.md
related_key: enable RBAC
summary: >-
  RBAC (Role-Based Access Control) is an access control method based on roles.
  With RBAC, you can finely control the operations users can perform at the
  collection, database, and instance levels, enhancing data security. ​
title: RBAC Explained
---
<h1 id="RBAC-Explained​" class="common-anchor-header">RBAC Explained​<button data-href="#RBAC-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control) is an access control method based on roles. With RBAC, you can finely control the operations users can perform at the collection, database, and instance levels, enhancing data security. ​</p>
<p>Unlike traditional user access control models, RBAC introduces the concept of <strong>roles</strong>. In the RBAC model, you  grant privileges to roles and then grant those roles to users. Then users can obtain privileges. ​</p>
<p>The RBAC model can improve the efficiency of access control management. For example, if multiple users require the same set of privileges, you do not need to manually set the privileges for each user. Instead, you can create a role and assign the role to users. If you want to adjust the privileges of these users, you can just adjust the role privileges and the modification will be applied to all users with this role.​</p>
<h2 id="RBAC-key-concepts​" class="common-anchor-header">RBAC key concepts​<button data-href="#RBAC-key-concepts​" class="anchor-icon" translate="no">
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
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/users_roles_privileges.png" alt="Users, roles, and privileges" class="doc-image" id="users,-roles,-and-privileges" />
    <span>Users, roles, and privileges</span>
  </span>
</p>
<p>There are four major components in the RBAC model.​</p>
<ul>
<li><p><strong>Resource</strong>: The resource entity that can be accessed. There are three levels of resources in Milvus - instance, database, and collection.​</p></li>
<li><p><strong>Privilege</strong>: The permission to perform certain operations on Milvus resources (eg. create collections, insert data, etc). ​</p></li>
<li><p><strong>Privilege group</strong>: A group of multiple privileges.​</p></li>
<li><p><strong>Role</strong>: A role consists of two parts-privileges and resources. Privileges define the type of operations that a role can perform while resources define the target resources that the operations can be performed on. For example, the database administrator role can perform read, write, and manage operations on certain databases.​</p></li>
<li><p><strong>User</strong>: A user is someone who uses Milvus. Each user has a unique ID and is granted a role or multiple roles. ​</p></li>
</ul>
<h2 id="Procedures​" class="common-anchor-header">Procedures​<button data-href="#Procedures​" class="anchor-icon" translate="no">
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
    </button></h2><p>The achieve access control via RBAC, you need to follow the steps below:​</p>
<ol>
<li><p><a href="/docs/users_and_roles.md#Create-a-user">Create a user</a>: In addition to the default user <code translate="no">root</code> in Milvus, you can create new users and set passwords to protect data security.​</p></li>
<li><p><a href="/docs/users_and_roles.md#Create-a-role">Create a role</a>: You can create customized roles based on your needs. The specific capabilities of a role are determined by its privileges.​</p></li>
<li><p><a href="/docs/privilege_group.md">Create a privilege group</a>: Combine multiple privileges into one privilege group to streamline the process of granting privileges to a role.​</p></li>
<li><p><a href="/docs/grant_privileges.md">Grant privileges or privilege groups to a role</a>: Define the capabilities of a role be granting privileges or privilege groups to this role. ​</p></li>
<li><p><a href="/docs/grant_roles.md">Grant roles to users</a>: Grant roles with certain privileges to users so that users can have the privileges of a role. A single role can be granted to multiple users.​</p></li>
</ol>
