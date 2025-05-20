---
id: rbac.md
related_key: enable RBAC
summary: 'Learn how to manage users, roles, and privileges.'
title: Enable RBAC
---
<h1 id="Enable-RBAC" class="common-anchor-header">Enable RBAC<button data-href="#Enable-RBAC" class="anchor-icon" translate="no">
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
    </button></h1><p>By enabling RBAC, you can control access to specific Milvus resources (Eg. a collection or a partition) or permissions based on user role and privileges. Currently, this feature is only available in Python and Java.</p>
<p>This topic describes how to enable RBAC and manage <a href="/docs/v2.3.x/users_and_roles.md">users and roles</a>.</p>
<h2 id="1-Create-a-user" class="common-anchor-header">1. Create a user<button data-href="#1-Create-a-user" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility

utility.<span class="hljs-title function_">create_user</span>(user, password, using=<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>After creating a user, you can:</p>
<ul>
<li>Update a user password. You need to provide both the original and the new password.</li>
</ul>
<pre><code translate="no">utility.update_password(user, old_password, new_password, <span class="hljs-keyword">using</span>=<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>List all users.</li>
</ul>
<pre><code translate="no">utility.list_usernames(<span class="hljs-keyword">using</span>=<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Check the role of a particular user.</li>
</ul>
<pre><code translate="no">utility.list_user(username, include_role_info, <span class="hljs-keyword">using</span>=<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Check the roles of all users.</li>
</ul>
<pre><code translate="no">utility.list_users(include_role_info, <span class="hljs-keyword">using</span>=<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="2-Create-a-role" class="common-anchor-header">2. Create a role<button data-href="#2-Create-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example creates a role named <code translate="no">roleA</code>.</p>
<pre><code translate="no"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Role</span>, utility

role_name = <span class="hljs-string">&quot;roleA&quot;</span>
role = <span class="hljs-title class_">Role</span>(role_name, using=_CONNECTION)
role.<span class="hljs-title function_">create</span>()
<button class="copy-code-btn"></button></code></pre>
<p>After creating a role, you can:</p>
<ul>
<li>Check if a role exists.</li>
</ul>
<pre><code translate="no">role.is_exist()
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>List all roles.</li>
</ul>
<pre><code translate="no">utility.list_roles(include_user_info, <span class="hljs-keyword">using</span>=<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Grant-a-privilege-to-a-role" class="common-anchor-header">3. Grant a privilege to a role<button data-href="#3-Grant-a-privilege-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example demonstrates how to grant the permission of searching all collections to the role named <code translate="no">roleA</code>. See <a href="/docs/v2.3.x/users_and_roles.md">Users and Roles</a> for other types of privileges you can grant.</p>
<p>Before granting permission to the role to manipulate collections in other databases, use <code translate="no">db.using_database()</code> or directly connect to the desired database to change the default database to the desired one. For details, refer to <a href="/docs/v2.3.x/manage_databases.md">Manage Databases</a>.</p>
<pre><code translate="no">role.<span class="hljs-title function_">grant</span>(<span class="hljs-string">&quot;Collection&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>After granting a privilege to a role, you can:</p>
<ul>
<li>List certain privileges to an object granted to a role.</li>
</ul>
<pre><code translate="no">role.<span class="hljs-title function_">list_grant</span>(<span class="hljs-string">&quot;Collection&quot;</span>,<span class="hljs-string">&quot;CollectionA&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>List all privileges granted to a role.</li>
</ul>
<pre><code translate="no">role.list_grants()
<button class="copy-code-btn"></button></code></pre>
<h2 id="4-Bind-a-role-to-a-user" class="common-anchor-header">4. Bind a role to a user<button data-href="#4-Bind-a-role-to-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Bind the role to a user so that this user can inherit all the privileges of the role.</p>
<pre><code translate="no">role.add_user(username)
<button class="copy-code-btn"></button></code></pre>
<p>After binding a role to a user, you can:</p>
<ul>
<li>List all users bind to a role</li>
</ul>
<pre><code translate="no">role.get_users()
<button class="copy-code-btn"></button></code></pre>
<h2 id="5-Deny-access-or-privileges" class="common-anchor-header">5. Deny access or privileges<button data-href="#5-Deny-access-or-privileges" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert caution">
<p>Exercise caution when performing the following operations because these operations are irreversible.</p>
</div>
<ul>
<li>Remove a privilege from a role.</li>
</ul>
<pre><code translate="no">role.<span class="hljs-title function_">revoke</span>(<span class="hljs-string">&quot;Collection&quot;</span>,<span class="hljs-string">&quot;*&quot;</span>,<span class="hljs-string">&quot;Search&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Remove a user from a role</li>
</ul>
<pre><code translate="no">role.remove_user(username)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Delete a role</li>
</ul>
<pre><code translate="no">role.<span class="hljs-title function_">drop</span>(<span class="hljs-string">&quot;roleA&quot;</span>):
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Delete a user</li>
</ul>
<pre><code translate="no">utility.delete_user(user, <span class="hljs-keyword">using</span>=<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Learn how to manage <a href="/docs/v2.3.x/authenticate.md">user authentication</a>.</p></li>
<li><p>Learn how to enable <a href="/docs/v2.3.x/tls.md">TLS proxy</a> in Milvus.</p></li>
</ul>
