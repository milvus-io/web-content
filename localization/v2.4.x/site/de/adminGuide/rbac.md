---
id: rbac.md
related_key: enable RBAC
summary: 'Erfahren Sie, wie Sie Benutzer, Rollen und Berechtigungen verwalten können.'
title: RBAC aktivieren
---
<h1 id="Enable-RBAC" class="common-anchor-header">RBAC aktivieren<button data-href="#Enable-RBAC" class="anchor-icon" translate="no">
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
    </button></h1><p>Wenn Sie RBAC aktivieren, können Sie den Zugriff auf bestimmte Milvus-Ressourcen (z. B. eine Sammlung oder eine Partition) oder Berechtigungen auf der Grundlage von Benutzerrollen und Privilegien steuern. Derzeit ist diese Funktion nur in Python und Java verfügbar.</p>
<p>Dieses Thema beschreibt, wie man RBAC aktiviert und <a href="/docs/de/v2.4.x/users_and_roles.md">Benutzer und Rollen</a> verwaltet.</p>
<div class="alert note">
<p>Die Codeschnipsel auf dieser Seite verwenden den neuen <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) zur Interaktion mit Milvus. Neue MilvusClient SDKs für andere Sprachen werden in zukünftigen Updates veröffentlicht.</p>
</div>
<h2 id="1-Initiate-a-Milvus-client-to-establish-a-connection" class="common-anchor-header">1. Initiieren Sie einen Milvus-Client, um eine Verbindung herzustellen<button data-href="#1-Initiate-a-Milvus-client-to-establish-a-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie die <a href="/docs/de/v2.4.x/authenticate.md">Benutzerauthentifizierung</a> aktiviert haben, verbinden Sie sich mit Ihrer Milvus-Instanz über <code translate="no">token</code>, das aus einem Benutzernamen und einem Passwort besteht. Standardmäßig verwendet Milvus den Benutzer <code translate="no">root</code> mit dem Passwort <code translate="no">Milvus</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&#x27;root:Milvus&#x27;</span> <span class="hljs-comment"># replace with your own Milvus server token</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="2-Create-a-user" class="common-anchor-header">2. Erstellen Sie einen Benutzer<button data-href="#2-Create-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie einen Benutzer mit dem Namen <code translate="no">user_1</code> und dem Passwort <code translate="no">P@ssw0rd</code>:</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_user</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie einen Benutzer angelegt haben, können Sie:</p>
<ul>
<li>Ein Benutzerpasswort aktualisieren. Sie müssen sowohl das ursprüngliche als auch das neue Kennwort angeben.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">update_password</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    old_password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,
    new_password=<span class="hljs-string">&#x27;P@ssw0rd123&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Alle Benutzer auflisten.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_users()

<span class="hljs-comment"># output:</span>
<span class="hljs-comment"># [&#x27;root&#x27;, &#x27;user_1&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Die Rolle eines bestimmten Benutzers überprüfen.</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_user(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: ()}
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Create-a-role" class="common-anchor-header">3. Erstellen Sie eine Rolle<button data-href="#3-Create-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Im folgenden Beispiel wird eine Rolle mit dem Namen <code translate="no">roleA</code> erstellt.</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_role</span>(
    role_name=<span class="hljs-string">&quot;roleA&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie eine Rolle erstellt haben, können Sie:</p>
<ul>
<li>Alle Rollen auflisten.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_roles()

# output:
# [<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;public&#x27;</span>, <span class="hljs-string">&#x27;roleA&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="4-Grant-a-privilege-to-a-role" class="common-anchor-header">4. Einer Rolle ein Privileg erteilen<button data-href="#4-Grant-a-privilege-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel zeigt, wie Sie der Rolle <code translate="no">roleA</code> das Recht erteilen, alle Sammlungen zu durchsuchen.</p>
<p>Die <code translate="no">object_type</code> gibt den Objekttyp an, der auch als Ressourcentyp verstanden werden kann. Derzeit sind die Werte Sammlung/Benutzer/Global usw. gültig, wobei Global bedeutet, dass es keinen spezifischen Ressourcentyp gibt. Die <code translate="no">object_name</code> ist der Name der Ressource. Wenn objecttype<em>Collection ist, kann sich der Objektname auf einen bestimmten Sammlungsnamen beziehen, oder Sie können * verwenden, um alle Sammlungen anzugeben. Wenn objecttype</em>Global ist, kann der Objektname nur mit * angegeben werden. Unter <a href="/docs/de/v2.4.x/users_and_roles.md">Benutzer und Rollen</a> finden Sie weitere Arten von Berechtigungen, die Sie vergeben können.</p>
<p>Vergewissern Sie sich vor der Verwaltung von Rollenberechtigungen, dass Sie die Benutzerauthentifizierung aktiviert haben. Andernfalls kann ein Fehler auftreten. Informationen zur Aktivierung der Benutzerauthentifizierung finden Sie unter <a href="/docs/de/v2.4.x/authenticate.md">Authentifizierung des Benutzerzugriffs</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant privilege to a role</span>

client.grant_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie einer Rolle eine Berechtigung gewährt haben, können Sie:</p>
<ul>
<li>Die einer Rolle gewährten Berechtigungen anzeigen.</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_role(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;role&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#  <span class="hljs-string">&#x27;privileges&#x27;</span>: [{<span class="hljs-string">&#x27;object_type&#x27;</span>: <span class="hljs-string">&#x27;User&#x27;</span>,
#    <span class="hljs-string">&#x27;object_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,
#    <span class="hljs-string">&#x27;db_name&#x27;</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
#    <span class="hljs-string">&#x27;role_name&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#    <span class="hljs-string">&#x27;privilege&#x27;</span>: <span class="hljs-string">&#x27;SelectUser&#x27;</span>,
#    <span class="hljs-string">&#x27;grantor_name&#x27;</span>: <span class="hljs-string">&#x27;root&#x27;</span>}]}
<button class="copy-code-btn"></button></code></pre>
<h2 id="5-Grant-a-role-to-a-user" class="common-anchor-header">5. Einem Benutzer eine Rolle gewähren<button data-href="#5-Grant-a-role-to-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Rolle einem Benutzer gewähren, so dass dieser Benutzer alle Privilegien der Rolle erben kann.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant a role to a user</span>

client.grant_role(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Überprüfen Sie nach der Vergabe der Rolle, ob sie vergeben wurde:</p>
<pre><code translate="no" class="language-python">client.describe_user(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: (<span class="hljs-string">&#x27;roleA&#x27;</span>)}
<button class="copy-code-btn"></button></code></pre>
<h2 id="6-Revoke-privileges" class="common-anchor-header">6. Entziehen von Privilegien<button data-href="#6-Revoke-privileges" class="anchor-icon" translate="no">
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
<p>Seien Sie vorsichtig, wenn Sie die folgenden Operationen durchführen, da diese Operationen nicht rückgängig gemacht werden können.</p>
</div>
<ul>
<li>Entziehen Sie ein Privileg aus einer Rolle. Wenn Sie ein Privileg entziehen, das der Rolle nicht gewährt wurde, tritt ein Fehler auf.</li>
</ul>
<pre><code translate="no" class="language-python">client.revoke_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Entfernen Sie einen Benutzer aus einer Rolle. Wenn Sie eine Rolle widerrufen, die dem Benutzer nicht gewährt wurde, tritt ein Fehler auf.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">revoke_role</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Eine Rolle löschen.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_role</span>(role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Löschen eines Benutzers.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_user</span>(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Lernen Sie, wie Sie die <a href="/docs/de/v2.4.x/authenticate.md">Benutzerauthentifizierung</a> verwalten.</p></li>
<li><p>Erfahren Sie, wie Sie den <a href="/docs/de/v2.4.x/tls.md">TLS-Proxy</a> in Milvus aktivieren können.</p></li>
</ul>
