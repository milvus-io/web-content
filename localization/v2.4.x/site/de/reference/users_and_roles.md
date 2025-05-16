---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Lernen Sie die Definition von Benutzern, Rollen, Objekten und Berechtigungen
  in der rollenbasierten Zugriffskontrolle (RBAC) kennen.
title: 'Benutzer, Privilegien und Rollen'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Benutzer, Privilegien und Rollen<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema bietet einen Überblick über die rollenbasierte Zugriffskontrolle (Role-Based Access Control, RBAC) in Milvus und beschreibt die Definitionen und Beziehungen zwischen Benutzern, Rollen, Objekten und Berechtigungen.</p>
<p>Die folgende Abbildung veranschaulicht die Beziehung zwischen Objekten, Privilegien, Rollen und Benutzern.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>Benutzer_und_Rollen</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">Schlüsselkonzepte<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Zugriffskontrolle auf Milvus-Ressourcen zu verwalten, ist es wichtig, die Schlüsselkomponenten von RBAC zu verstehen: Objekttypen, Objektnamen, Benutzer, Rollen und Privilegien.</p>
<ul>
<li><p><strong>Objekttyp</strong>: die Kategorie des Objekts, für das ein Privileg zugewiesen wird. Der Objekttyp kann sein:</p>
<ul>
<li><code translate="no">Global</code>: Systemweite Objekte, die es dem Benutzer erlauben, Aktionen durchzuführen, die alle Sammlungen, Benutzer oder systemweiten Einstellungen betreffen.</li>
<li><code translate="no">Collection</code>: Sammlungsspezifische Objekte, die es dem Benutzer ermöglichen, Aktionen wie das Erstellen von Indizes, das Laden von Daten, das Einfügen oder Löschen von Daten und das Abfragen von Daten innerhalb einer bestimmten Sammlung durchzuführen.</li>
<li><code translate="no">User</code>: Objekte, die sich auf die Benutzerverwaltung beziehen und es dem Benutzer ermöglichen, Anmeldeinformationen und Rollen für Datenbankbenutzer zu verwalten, wie z. B. die Aktualisierung von Benutzeranmeldeinformationen oder die Anzeige von Benutzerdetails.</li>
</ul></li>
<li><p><strong>Objektname</strong>: der spezifische Name des Objekts, für das der Zugriff kontrolliert werden soll. Zum Beispiel:</p>
<ul>
<li>Wenn der Objekttyp <code translate="no">Global</code> ist, muss der Objektname auf den Platzhalter (<code translate="no">*</code>) gesetzt werden, der alle Objekte des angegebenen Typs angibt.</li>
<li>Wenn der Objekttyp <code translate="no">Collection</code> ist, ist der Objektname der Name einer Sammlung.</li>
<li>Wenn der Objekttyp <code translate="no">User</code> ist, ist der Objektname der Name eines Datenbankbenutzers.</li>
</ul></li>
<li><p><strong>Benutzer</strong>: eine Person oder eine Anwendung, die mit Milvus interagiert, bestehend aus einem Benutzernamen und einem entsprechenden Passwort.</p></li>
<li><p><strong>Privileg</strong>: definiert die Aktionen, die durchgeführt werden können und die Ressourcen, auf die zugegriffen werden kann. Privilegien werden nicht direkt an Benutzer vergeben, sondern sind Rollen zugewiesen.</p></li>
<li><p><strong>Rolle</strong>: Definiert die Berechtigungen, die ein Benutzer für bestimmte Objekte hat. Sobald eine Rolle an einen Benutzer gebunden ist, erbt der Benutzer alle Rechte, die dieser Rolle gewährt werden.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Beispiel: Erteilen von Privilegien<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Codeschnipsel zeigt, wie man einer Rolle das Privileg <code translate="no">CreateIndex</code> für eine bestimmte Sammlung gewährt:</p>
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
<p>Weitere Informationen über privilegierungsbezogene APIs finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>Weitere Informationen zu privilegierungsbezogenen APIs finden Sie unter <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> und <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>Weitere Informationen zu privilegierungsbezogenen APIs finden Sie unter <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> und <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Standardbenutzer und -rollen<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus erstellt standardmäßig einen Benutzer <code translate="no">root</code> mit einem Standardpasswort <code translate="no">Milvus</code>. Dem Benutzer <code translate="no">root</code> werden die Privilegien <code translate="no">admin</code> gewährt, was bedeutet, dass dieser Benutzer <code translate="no">root</code> Zugriff auf alle Ressourcen hat und alle Aktionen ausführen kann.</p>
<p>Wenn ein Benutzer mit der Rolle <code translate="no">public</code> verknüpft ist, verfügt er über die folgenden Berechtigungen:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">Liste der Objekttypen und Privilegien<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>In der folgenden Tabelle sind die Werte aufgeführt, die Sie bei der <a href="/docs/de/v2.4.x/rbac.md">Aktivierung von RBAC</a> wählen können.</p>
<table>
<thead>
<tr><th>Objekttyp</th><th>Name des Privilegs</th><th>Relevante API-Beschreibung auf der Client-Seite</th></tr>
</thead>
<tbody>
<tr><td>Sammlung</td><td>CreateIndex</td><td>CreateIndex</td></tr>
<tr><td>Sammlung</td><td>AblegenIndex</td><td>AbwurfIndex</td></tr>
<tr><td>Sammlung</td><td>IndexDetail</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Sammlung</td><td>Laden</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Sammlung</td><td>GetLoadingProgress</td><td>GetLoadingProgress (Ladefortschritt)</td></tr>
<tr><td>Sammlung</td><td>GetLoadState</td><td>GetLoadState</td></tr>
<tr><td>Sammlung</td><td>Freigeben</td><td>ReleaseCollection</td></tr>
<tr><td>Sammlung</td><td>Einfügen</td><td>Einfügen</td></tr>
<tr><td>Sammlung</td><td>Löschen</td><td>Löschen</td></tr>
<tr><td>Sammlung</td><td>Upsertieren</td><td>Upsert</td></tr>
<tr><td>Sammlung</td><td>Suchen</td><td>Suche</td></tr>
<tr><td>Sammlung</td><td>Spülen</td><td>Flush/GetFlushState</td></tr>
<tr><td>Sammlung</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>Sammlung</td><td>Abfrage</td><td>Abfrage</td></tr>
<tr><td>Sammlung</td><td>HoleStatistik</td><td>GetCollectionStatistics</td></tr>
<tr><td>Sammlung</td><td>Verdichtung</td><td>Verdichten</td></tr>
<tr><td>Sammlung</td><td>Importieren</td><td>BulkInsert/Import</td></tr>
<tr><td>Sammlung</td><td>LoadBalance</td><td>LoadBalance</td></tr>
<tr><td>Sammlung</td><td>CreatePartition</td><td>CreatePartition</td></tr>
<tr><td>Sammlung</td><td>DropPartition</td><td>DropPartition</td></tr>
<tr><td>Sammlung</td><td>ShowPartitions</td><td>ShowPartitions</td></tr>
<tr><td>Sammlung</td><td>HasPartition</td><td>HasPartition</td></tr>
<tr><td>Global</td><td>Alle</td><td>Alle API-Operationsberechtigungen in dieser Tabelle</td></tr>
<tr><td>Global</td><td>CreateCollection</td><td>CreateCollection</td></tr>
<tr><td>Global</td><td>DropCollection</td><td>DropCollection</td></tr>
<tr><td>Global</td><td>DescribeCollection</td><td>DescribeCollection</td></tr>
<tr><td>Global</td><td>ShowCollections</td><td>ShowCollections</td></tr>
<tr><td>Global</td><td>RenameCollection</td><td>UmbenennenSammlung</td></tr>
<tr><td>Global</td><td>Alle spülen</td><td>FlushAll</td></tr>
<tr><td>Global</td><td>CreateOwnership</td><td>CreateUser CreateRole</td></tr>
<tr><td>Global</td><td>DropOwnership</td><td>DeleteCredential DropRole</td></tr>
<tr><td>Global</td><td>SelectOwnership</td><td>SelectRole/SelectGrant</td></tr>
<tr><td>Global</td><td>ManageOwnership</td><td>OperateUserRole OperatePrivilege</td></tr>
<tr><td>Global</td><td>CreateResourceGroup</td><td>CreateResourceGroup</td></tr>
<tr><td>Global</td><td>DropResourceGroup</td><td>DropResourceGroup</td></tr>
<tr><td>Global</td><td>DescribeResourceGroup</td><td>DescribeResourceGroup</td></tr>
<tr><td>Global</td><td>ListResourceGroups</td><td>ListResourceGroups</td></tr>
<tr><td>Global</td><td>TransferKnoten</td><td>Übertragungsknoten</td></tr>
<tr><td>Global</td><td>ÜbertragungsReplikat</td><td>ÜbertragungsReplikat</td></tr>
<tr><td>Global</td><td>CreateDatabase</td><td>CreateDatabase</td></tr>
<tr><td>Global</td><td>DropDatabase</td><td>DropDatabase</td></tr>
<tr><td>Global</td><td>ListDatabases</td><td>ListDatabases</td></tr>
<tr><td>Global</td><td>CreateAlias</td><td>CreateAlias</td></tr>
<tr><td>Global</td><td>DropAlias</td><td>DropAlias</td></tr>
<tr><td>Global</td><td>BeschreibungsAlias</td><td>BeschreibungsAlias</td></tr>
<tr><td>Global</td><td>ListAlias</td><td>ListAliases</td></tr>
<tr><td>Benutzer</td><td>UpdateUser</td><td>UpdateCredential</td></tr>
<tr><td>Benutzer</td><td>SelectUser</td><td>SelectUser</td></tr>
</tbody>
</table>
<div class="alert note">
<li>Bei Objekt- und Berechtigungsnamen wird zwischen Groß- und Kleinschreibung unterschieden.</li>
<li>Um alle Berechtigungen für eine Art von Objekt, wie Sammlung, Global, Benutzer, zu gewähren, verwenden Sie "*" als Berechtigungsnamen. </li>
<li>Der Berechtigungsname "*" für das Objekt "Global" enthält nicht das Recht "Alle", da das Recht "Alle" alle Berechtigungen umfasst, einschließlich aller Sammlungs- und Benutzerobjekte.</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/rbac.md">RBAC aktivieren</a> können.</li>
</ul>
