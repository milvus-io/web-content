---
id: authenticate.md
summary: Learn how to manage user authentication in Milvus.
title: ''
---
<h1 id="Authenticate-User-Access" class="common-anchor-header">Authenticate User Access<button data-href="#Authenticate-User-Access" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to manage user authentication in Milvus.</p>
<p>Milvus supports authenticated access by username and password.</p>
<h2 id="Enable-user-authentication" class="common-anchor-header">Enable user authentication<button data-href="#Enable-user-authentication" class="anchor-icon" translate="no">
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
    </button></h2><div class="filter">
<a href="#docker">Docker Compose</a> <a href="#helm">Helm</a>
</div>
<div class="table-wrapper filter-docker" markdown="block">
<p>Set <code translate="no">common.security.authorizationEnabled</code> in <code translate="no">milvus.yaml</code> as <code translate="no">true</code> when <a href="/docs/v2.2.x/configure-docker.md">configuring Milvus</a> to enable authentication.</p>
</div>
<div class="table-wrapper filter-helm" markdown="block">
<p>As of Milvus Helm Chart 4.0.0, you can enable user authentication by modifying <code translate="no">values.yaml</code> as follows:</p>
<pre>
  <code translate="no">
extraConfigFiles:
  user.yaml: |+
    common:
      security:
        authorizationEnabled: true
  </code>
</pre>
</div>
<h2 id="Create-an-authenticated-user" class="common-anchor-header">Create an authenticated user<button data-href="#Create-an-authenticated-user" class="anchor-icon" translate="no">
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
    </button></h2><p>A root user (password: <code translate="no">Milvus</code>) is created along with each Milvus instance by default. It is recommended to change the password of the root user when you start Milvus for the first time. The root user can be used to create new users for authenticated access.</p>
<p>Create a user with username and password with the following command.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
utility.<span class="hljs-title function_">create_user</span>(<span class="hljs-string">&#x27;user&#x27;</span>, <span class="hljs-string">&#x27;password&#x27;</span>, using=<span class="hljs-string">&#x27;default&#x27;</span>) 
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">user</code></td><td>Username to create.</td></tr>
<tr><td><code translate="no">password</code></td><td>Password for the user to create.</td></tr>
<tr><td><code translate="no">using</code></td><td>Alias of the Milvus server to create the user.</td></tr>
</tbody>
</table>
<h2 id="Connect-Milvus-with-an-authenticated-user" class="common-anchor-header">Connect Milvus with an authenticated user<button data-href="#Connect-Milvus-with-an-authenticated-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Connect Milvus with an existing user.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections
connections.<span class="hljs-title function_">connect</span>(
    alias=<span class="hljs-string">&#x27;default&#x27;</span>,
    host=<span class="hljs-string">&#x27;localhost&#x27;</span>,
    port=<span class="hljs-string">&#x27;19530&#x27;</span>,
    user=<span class="hljs-string">&#x27;user&#x27;</span>,
    password=<span class="hljs-string">&#x27;password&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">alias</code></td><td>Alias of the Milvus server to connect.</td></tr>
<tr><td><code translate="no">host</code></td><td>IP address of the Milvus server to connect.</td></tr>
<tr><td><code translate="no">port</code></td><td>Port of the Milvus server to connect.</td></tr>
<tr><td><code translate="no">user</code></td><td>Username used to connect.</td></tr>
<tr><td><code translate="no">password</code></td><td>Password used to connect.</td></tr>
</tbody>
</table>
<div class="alert note">
To stop using the authenticated access, or to log in to another authenticated user, you need to disconnect from the Milvus instance and re-connect to it.
</div>
<h2 id="Reset-password" class="common-anchor-header">Reset password<button data-href="#Reset-password" class="anchor-icon" translate="no">
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
    </button></h2><p>Change the password for an existing user and reset the Milvus connection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
utility.reset_password(<span class="hljs-string">&#x27;user&#x27;</span>, <span class="hljs-string">&#x27;old_password&#x27;</span>, <span class="hljs-string">&#x27;new_password&#x27;</span>, using=<span class="hljs-string">&#x27;default&#x27;</span>)

<span class="hljs-comment"># Or you can use an alias function update_password</span>
utility.update_password(<span class="hljs-string">&#x27;user&#x27;</span>, <span class="hljs-string">&#x27;old_password&#x27;</span>, <span class="hljs-string">&#x27;new_password&#x27;</span>, using=<span class="hljs-string">&#x27;default&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">user</code></td><td>Username to reset password.</td></tr>
<tr><td><code translate="no">password</code></td><td>New password for the user.</td></tr>
<tr><td><code translate="no">using</code></td><td>Alias of the Milvus server.</td></tr>
</tbody>
</table>
<p>If you forget your old password, Milvus provides a configuration item that allows you to designate certain users as super users. This eliminates the need for the old password when you reset the password.</p>
<p>By default, the <code translate="no">common.security.superUsers</code> field in the Milvus configuration file is empty, meaning that all users must provide the old password when resetting their password. However, you can designate specific users as super users who do not need to provide the old password. In the snippet below, <code translate="no">root</code> and <code translate="no">foo</code> are designated as super users.</p>
<p>You should add the below configuration item in the Milvus configuration file that governs the running of your Milvus instance.</p>
<pre><code translate="no" class="language-yaml">common:
    security:
        superUsers: root, foo
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-a-user" class="common-anchor-header">Delete a user<button data-href="#Delete-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Delete an authenticated user.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
utility.<span class="hljs-title function_">delete_user</span>(<span class="hljs-string">&#x27;user&#x27;</span>, using=<span class="hljs-string">&#x27;default&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">user</code></td><td>Username to delete.</td></tr>
<tr><td><code translate="no">using</code></td><td>Alias of the Milvus server.</td></tr>
</tbody>
</table>
<h2 id="List-all-users" class="common-anchor-header">List all users<button data-href="#List-all-users" class="anchor-icon" translate="no">
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
    </button></h2><p>List all the credential users.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
users = utility.<span class="hljs-title function_">list_usernames</span>(using=<span class="hljs-string">&#x27;default&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">Limitations<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Username must not be empty, and must not exceed 32 characters in length. It must start with a letter, and only contains underscores, letters, or numbers.</li>
<li>Password must have at least 6 characters and must not exceed 256 characters in length.</li>
</ol>
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
<li>You might also want to learn how to:
<ul>
<li><a href="/docs/v2.2.x/scaleout.md">Scale a Milvus cluster</a></li>
</ul></li>
<li>If you are ready to deploy your cluster on clouds:
<ul>
<li>Learn how to <a href="/docs/v2.2.x/aws.md">Deploy Milvus on AWS with Terraform and Ansible</a></li>
<li>Learn how to <a href="/docs/v2.2.x/eks.md">Deploy Milvus on Amazon EKS with Terraform</a></li>
<li>Learn how to <a href="/docs/v2.2.x/gcp.md">Deploy Milvus Cluster on GCP with Kubernetes</a></li>
<li>Learn how to <a href="/docs/v2.2.x/azure.md">Deploy Milvus on Microsoft Azure With Kubernetes</a></li>
</ul></li>
</ul>
