---
id: authenticate.md
summary: >-
  Erfahren Sie, wie Sie die Benutzerauthentifizierung in Milvus verwalten
  können.
title: Benutzerzugriff authentifizieren
---
<h1 id="Authenticate-User-Access" class="common-anchor-header">Benutzerzugriff authentifizieren<button data-href="#Authenticate-User-Access" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Handbuch wird erklärt, wie die Benutzerauthentifizierung in Milvus verwaltet wird, einschließlich der Aktivierung der Authentifizierung, der Verbindung als Benutzer und der Änderung der Benutzeranmeldedaten.</p>
<div class="alert note">
<ul>
<li><p>TLS und Benutzerauthentifizierung sind zwei unterschiedliche Sicherheitsansätze. Wenn Sie sowohl die Benutzerauthentifizierung als auch TLS in Ihrem Milvus-System aktiviert haben, müssen Sie einen Benutzernamen, ein Passwort und Pfade für Zertifikatsdateien angeben. Informationen zur Aktivierung von TLS finden Sie unter <a href="/docs/de/v2.4.x/tls.md">Verschlüsselung bei der Übermittlung</a>.</p></li>
<li><p>Die Codeschnipsel auf dieser Seite verwenden den neuen <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) zur Interaktion mit Milvus. Neue MilvusClient SDKs für andere Sprachen werden in zukünftigen Updates veröffentlicht.</p></li>
</ul>
</div>
<h2 id="Enable-user-authentication" class="common-anchor-header">Aktivieren der Benutzerauthentifizierung<button data-href="#Enable-user-authentication" class="anchor-icon" translate="no">
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
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a> <a href="#operator">Milvus-Bediener</a></div>
<div class="filter-docker">
<p>Um die Benutzerauthentifizierung für Ihren Milvus-Server zu aktivieren, setzen Sie common.security.authorizationEnabled in der Milvus-Konfigurationsdatei <code translate="no">milvus.yaml</code> auf true. Weitere Informationen zu Konfigurationen finden Sie unter <a href="https://milvus.io/docs/configure-docker.md?tab=component">Konfigurieren von Milvus mit Docker Compose</a>.</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">common</span>:
...
  <span class="hljs-attr">security</span>:
    <span class="hljs-attr">authorizationEnabled</span>: <span class="hljs-literal">false</span>
...
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-helm">
<p>Um die Benutzerauthentifizierung für Ihren Milvus-Server zu aktivieren, setzen Sie authorizationEnabled in der Milvus-Konfigurationsdatei <code translate="no">values.yaml</code> auf true. Weitere Informationen zu Konfigurationen finden Sie unter <a href="https://milvus.io/docs/configure-helm.md?tab=component">Konfigurieren von Milvus mit Helm Charts</a>.</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">extraConfigFiles</span>:
  user.<span class="hljs-property">yaml</span>: |+
    <span class="hljs-attr">common</span>:
      <span class="hljs-attr">security</span>:
        <span class="hljs-attr">authorizationEnabled</span>: <span class="hljs-literal">true</span>
...
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-operator">
<p>Um die Authentifizierung zu aktivieren, setzen Sie <code translate="no">spec.common.security.authorizationEnabled</code> in der CRD von <code translate="no">Milvus</code> auf <code translate="no">true</code>. Weitere Informationen zu Milvus CRD finden Sie unter <a href="https://milvus.io/docs/configure_operator.md?tab=component">Konfigurieren von Milvus mit Milvus Operator</a>.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    common:
      security:
        authorizationEnabled: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Connect-to-Milvus-with-authentication" class="common-anchor-header">Verbindung zu Milvus mit Authentifizierung<button data-href="#Connect-to-Milvus-with-authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie die Authentifizierung aktiviert haben, müssen Sie eine Verbindung zu Milvus mit einem Benutzernamen und einem Passwort herstellen. Standardmäßig wird der Benutzer <code translate="no">root</code> mit dem Kennwort <code translate="no">Milvus</code> erstellt, wenn Milvus gestartet wird. Hier ein Beispiel für die Verbindung zu Milvus mit aktivierter Authentifizierung unter Verwendung des Standardbenutzers <code translate="no">root</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use default `root` user to connect to Milvus</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
) 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Wenn Sie bei der Verbindung zu Milvus mit aktivierter Authentifizierung kein gültiges Token angeben, erhalten Sie einen gRPC-Fehler.</div>
<h2 id="Create-a-new-user" class="common-anchor-header">Erstellen Sie einen neuen Benutzer<button data-href="#Create-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie mit dem Standardbenutzer <code translate="no">root</code> verbunden sind, können Sie wie folgt einen neuen Benutzer erstellen und authentifizieren:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># create a user</span>
client.create_user(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
)

<span class="hljs-comment"># verify the user has been created</span>

client.describe_user(<span class="hljs-string">&quot;user_1&quot;</span>)

<span class="hljs-comment"># output</span>
<span class="hljs-comment"># {&#x27;user_name&#x27;: &#x27;user_1&#x27;, &#x27;roles&#x27;: ()}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zum Erstellen von Benutzern finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/create_user.md">create_user()</a>.</p>
<h2 id="Connect-to-Milvus-with-a-new-user" class="common-anchor-header">Verbindung zu Milvus mit einem neuen Benutzer<button data-href="#Connect-to-Milvus-with-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Verbinden Sie sich mit den Anmeldeinformationen des neu angelegten Benutzers:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># connect to milvus with the newly created user</span>

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;user_1:P@ssw0rd&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Update-user-password" class="common-anchor-header">Benutzerpasswort aktualisieren<button data-href="#Update-user-password" class="anchor-icon" translate="no">
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
    </button></h2><p>Ändern Sie das Passwort für einen bestehenden Benutzer mit dem folgenden Code:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># update password</span>

client.update_password(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
    new_password=<span class="hljs-string">&quot;P@ssw0rd123&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zum Aktualisieren von Benutzerpasswörtern finden Sie in <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/update_password.md">update_password()</a>.</p>
<p>Wenn Sie Ihr altes Passwort vergessen haben, bietet Milvus einen Konfigurationspunkt an, der es Ihnen ermöglicht, bestimmte Benutzer als Superuser zu bestimmen. Dadurch wird das alte Passwort nicht mehr benötigt, wenn Sie das Passwort zurücksetzen.</p>
<p>Standardmäßig ist das Feld <code translate="no">common.security.superUsers</code> in der Milvus-Konfigurationsdatei leer, was bedeutet, dass alle Benutzer beim Zurücksetzen ihres Passworts das alte Passwort angeben müssen. Sie können jedoch bestimmte Benutzer als Superuser bezeichnen, die das alte Passwort nicht angeben müssen. Im folgenden Ausschnitt werden <code translate="no">root</code> und <code translate="no">foo</code> als Superuser bezeichnet.</p>
<p>Sie sollten den folgenden Konfigurationspunkt in der Milvus-Konfigurationsdatei hinzufügen, die den Betrieb Ihrer Milvus-Instanz regelt.</p>
<pre><code translate="no" class="language-yaml">common:
    security:
        superUsers: root, foo
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-user" class="common-anchor-header">Einen Benutzer löschen<button data-href="#Drop-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Um einen Benutzer zu löschen, verwenden Sie die Methode <code translate="no">drop_user()</code>.</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_user</span>(user_name=<span class="hljs-string">&quot;user_1&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Um einen Benutzer zu löschen, dürfen Sie nicht der zu löschende Benutzer sein. Andernfalls wird ein Fehler ausgelöst.</div>
<h2 id="List-all-users" class="common-anchor-header">Alle Benutzer auflisten<button data-href="#List-all-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Alle Benutzer auflisten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># list all users</span>

client.list_users()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">Beschränkungen<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>Der Benutzername darf nicht leer sein und darf nicht länger als 32 Zeichen sein. Er muss mit einem Buchstaben beginnen und darf nur Unterstriche, Buchstaben oder Zahlen enthalten.</li>
<li>Das Passwort muss aus mindestens 6 Zeichen bestehen und darf nicht länger als 256 Zeichen sein.</li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Sie möchten vielleicht auch lernen, wie man:<ul>
<li><a href="/docs/de/v2.4.x/scaleout.md">Skalieren eines Milvus-Clusters</a></li>
</ul></li>
<li>Wenn Sie bereit sind, Ihren Cluster in der Cloud einzusetzen:<ul>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/eks.md">Milvus auf Amazon EKS mit Terraform bereitstellen</a> können</li>
<li>Lernen Sie, wie Sie <a href="/docs/de/v2.4.x/gcp.md">Milvus Cluster auf GCP mit Kubernetes bereitstellen</a> können</li>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/azure.md">Milvus auf Microsoft Azure mit Kubernetes bereitstellen</a> können</li>
</ul></li>
</ul>
