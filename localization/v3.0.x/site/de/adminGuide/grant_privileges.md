---
id: grant_privileges.md
title: Berechtigungen oder Berechtigungsgruppen für Rollen zuweisen
summary: >-
  Sobald eine Rolle erstellt wurde, können Sie dieser Rolle Berechtigungen
  zuweisen. In dieser Anleitung wird erläutert, wie Sie einer Rolle
  Berechtigungen oder Berechtigungsgruppen zuweisen können.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Berechtigungen oder Berechtigungsgruppen für Rollen zuweisen<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Sobald eine Rolle erstellt wurde, können Sie dieser Rolle Berechtigungen zuweisen. In dieser Anleitung erfahren Sie, wie Sie einer Rolle Berechtigungen oder Berechtigungsgruppen zuweisen.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Einer Rolle ein Recht oder eine Rechtegruppe zuweisen<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit Milvus 2.5 wird eine neue API-Version eingeführt, die den Vorgang der Berechtigungsvergabe optimiert. Sie müssen den Objekttyp nicht mehr nachschlagen, wenn Sie einer Rolle eine Berechtigung zuweisen. Im Folgenden finden Sie die Parameter und die entsprechenden Erläuterungen.</p>
<ul>
<li><p><strong>role_name:</strong> Der Name der Zielrolle, der Berechtigungen oder Berechtigungsgruppen zugewiesen werden sollen.</p></li>
<li><p><strong>Resource</strong>: Die Zielressource einer Berechtigung, bei der es sich um eine bestimmte Instanz, Datenbank oder Sammlung handeln kann.</p></li>
</ul>
<p>Die folgende Tabelle erläutert, wie die Ressource in der Methode „ <code translate="no">client.grantV2()</code> “ anzugeben ist.</p>
<table>
   <tr>
     <th><p><strong>Ebene</strong></p></th>
     <th><p><strong>Ressource</strong></p></th>
     <th><p><strong>Vergabemethode</strong></p></th>
     <th><p><strong>Hinweise</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Sammlung</strong></p></td>
     <td><p>Eine bestimmte Sammlung</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Geben Sie den Namen Ihrer Zielsammlung und den Namen der Datenbank ein, zu der die Zielsammlung gehört.</p></td>
   </tr>
   <tr>
     <td><p>Alle Sammlungen unter einer bestimmten Datenbank</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Geben Sie den Namen Ihrer Zieldatenbank und einen Platzhalter <code translate="no">*</code> n als Sammlungsnamen ein.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Datenbank</strong></p></td>
     <td><p>Eine bestimmte Datenbank</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Geben Sie den Namen Ihrer Zieldatenbank und einen Platzhalter <code translate="no">*</code> als Sammlungsnamen ein.</p></td>
   </tr>
   <tr>
     <td><p>Alle Datenbanken unter der aktuellen Instanz</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Geben Sie „ <code translate="no">*</code> “ als Datenbanknamen und „ <code translate="no">*</code> “ als Sammlungsnamen ein.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instanz</strong></p></td>
     <td><p>Die aktuelle Instanz</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Geben Sie „ <code translate="no">*</code> “ als Datenbanknamen und „ <code translate="no">*</code> “ als Sammlungsnamen ein.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Berechtigung</strong>: Die spezifische Berechtigung oder <a href="/docs/de/privilege_group.md">Berechtigungsgruppe</a>, die Sie einer Rolle gewähren müssen. Derzeit bietet Milvus 56 Arten von Berechtigungen, die Sie gewähren können. Die folgende Tabelle listet die Berechtigungen in Milvus auf.</p>
<p><div class="alert note"></p>
<p>Die Spalte „Typ“ in der folgenden Tabelle dient lediglich der Klassifizierung und soll Ihnen das schnelle Auffinden von Berechtigungen erleichtern. Bei der Vergabe von Berechtigungen müssen Sie die Typen nicht verstehen. Sie müssen lediglich die entsprechenden Berechtigungen eingeben.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>Typ</strong></p></th>
<th><p><strong>Berechtigung</strong></p></th>
<th><p><strong>Beschreibung</strong></p></th>
<th><p><strong>Relevante API-Beschreibung auf der Client-Seite</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>Datenbankberechtigungen</p></td>
<td><p>ListDatabases</p></td>
<td><p>Alle Datenbanken in der aktuellen Instanz anzeigen</p></td>
<td><p><a href="/docs/de/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>Details einer Datenbank anzeigen</p></td>
<td><p><a href="/docs/de/manage_databases.md">Datenbank beschreiben</a></p></td>
</tr>
<tr>
<td><p>CreateDatabase</p></td>
<td><p>Datenbank erstellen</p></td>
<td><p><a href="/docs/de/manage_databases.md">CreateDatabase</a></p></td>
</tr>
<tr>
<td><p>Datenbank löschen</p></td>
<td><p>Datenbank löschen</p></td>
<td><p><a href="/docs/de/manage_databases.md">DropDatabase</a></p></td>
</tr>
<tr>
<td><p>AlterDatabase</p></td>
<td><p>Eigenschaften einer Datenbank ändern</p></td>
<td><p><a href="/docs/de/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Sammlungsrechte</p></td>
<td><p>GetFlushState</p></td>
<td><p>Den Status des Leervorgangs der Sammlung prüfen</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>Ladezustand einer Sammlung prüfen</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>Ladefortschritt einer Sammlung prüfen</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>ShowCollections</p></td>
<td><p>Alle Sammlungen mit Sammlungsrechten anzeigen</p></td>
<td><p><a href="/docs/de/view-collections.md">ShowCollections</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>Alle Aliase einer Sammlung anzeigen</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">Aliase auflisten</a></p></td>
</tr>
<tr>
<td><p>SammlungBeschreiben</p></td>
<td><p>Details einer Sammlung anzeigen</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">DescribeCollection</a></p></td>
</tr>
<tr>
<td><p>Alias beschreiben</p></td>
<td><p>Details eines Alias anzeigen</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">Alias beschreiben</a></p></td>
</tr>
<tr>
<td><p>GetStatistics</p></td>
<td><p>Statistiken einer Sammlung abrufen (z. B. die Anzahl der Entitäten in einer Sammlung)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
</tr>
<tr>
<td><p>Sammlung erstellen</p></td>
<td><p>Sammlung erstellen</p></td>
<td><p><a href="/docs/de/create-collection.md">CreateCollection</a></p></td>
</tr>
<tr>
<td><p>DropCollection</p></td>
<td><p>Sammlung löschen</p></td>
<td><p><a href="/docs/de/drop-collection.md">DropCollection</a></p></td>
</tr>
<tr>
<td><p>Laden</p></td>
<td><p>Sammlung laden</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>Freigeben</p></td>
<td><p>Eine Sammlung freigeben</p></td>
<td><p><a href="/docs/de/load-and-release.md">ReleaseCollection</a></p></td>
</tr>
<tr>
<td><p>Leeren</p></td>
<td><p>Alle Entitäten in einer Sammlung in einem versiegelten Segment dauerhaft speichern. Alle Entitäten, die nach dem Flush-Vorgang eingefügt werden, werden in einem neuen Segment gespeichert.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Flush/GetFlushState</a></p></td>
</tr>
<tr>
<td><p>Verdichtung</p></td>
<td><p>Kompaktierung manuell auslösen</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Kompaktieren</a></p></td>
</tr>
<tr>
<td><p>Sammlung umbenennen</p></td>
<td><p>Sammlung umbenennen</p></td>
<td><p><a href="/docs/de/modify-collection.md">Sammlung umbenennen</a></p></td>
</tr>
<tr>
<td><p>Alias erstellen</p></td>
<td><p>Alias für eine Sammlung erstellen</p></td>
<td><p><a href="/docs/de/manage-aliases.md">CreateAlias</a></p></td>
</tr>
<tr>
<td><p>Alias löschen</p></td>
<td><p>Alias einer Sammlung löschen</p></td>
<td><p><a href="/docs/de/manage-aliases.md">DropAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>Alle Sammlungen in einer Datenbank leeren</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>Partitionsrechte</p></td>
<td><p>HasPartition</p></td>
<td><p>Prüfen, ob eine Partition existiert</p></td>
<td><p><a href="/docs/de/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>ShowPartitions</p></td>
<td><p>Alle Partitionen in einer Sammlung anzeigen</p></td>
<td><p><a href="/docs/de/manage-partitions.md">ShowPartitions</a></p></td>
</tr>
<tr>
<td><p>CreatePartition</p></td>
<td><p>Partition erstellen</p></td>
<td><p><a href="/docs/de/manage-partitions.md">Partition erstellen</a></p></td>
</tr>
<tr>
<td><p>Partition löschen</p></td>
<td><p>Partition löschen</p></td>
<td><p><a href="/docs/de/manage-partitions.md">DropPartition</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Index-Berechtigungen</p></td>
<td><p>IndexDetail</p></td>
<td><p>Details eines Index anzeigen</p></td>
<td><p><a href="/docs/de/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>CreateIndex</p></td>
<td><p>Index erstellen</p></td>
<td><p><a href="/docs/de/index-vector-fields.md">CreateIndex</a></p></td>
</tr>
<tr>
<td><p>DropIndex</p></td>
<td><p>Index löschen</p></td>
<td><p><a href="/docs/de/index-vector-fields.md">DropIndex</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Berechtigungen für die Ressourcenverwaltung</p></td>
<td><p>Lastenausgleich</p></td>
<td><p>Lastenausgleich herstellen</p></td>
<td><p><a href="/docs/de/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>CreateResourceGroup</p></td>
<td><p>Ressourcengruppe erstellen</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CreateResourceGroup</a></p></td>
</tr>
<tr>
<td><p>DropResourceGroup</p></td>
<td><p>Ressourcengruppe löschen</p></td>
<td><p><a href="/docs/de/resource_group.md">DropResourceGroup</a></p></td>
</tr>
<tr>
<td><p>UpdateResourceGroups</p></td>
<td><p>Ressourcengruppe aktualisieren</p></td>
<td><p><a href="/docs/de/resource_group.md">UpdateResourceGroups</a></p></td>
</tr>
<tr>
<td><p>DescribeResourceGroup</p></td>
<td><p>Details einer Ressourcengruppe anzeigen</p></td>
<td><p><a href="/docs/de/resource_group.md">DescribeResourceGroup</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>Alle Ressourcengruppen der aktuellen Instanz anzeigen</p></td>
<td><p><a href="/docs/de/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>Knoten zwischen Ressourcengruppen verschieben</p></td>
<td><p><a href="/docs/de/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>Replikate zwischen Ressourcengruppen übertragen</p></td>
<td><p><a href="/docs/de/resource_group.md">TransferReplica</a></p></td>
</tr>
<tr>
<td><p>BackupRBAC</p></td>
<td><p>Erstellen Sie ein Backup für alle RBAC-bezogenen Vorgänge in der aktuellen Instanz</p></td>
<td><p>BackupRBAC</p></td>
</tr>
<tr>
<td><p>RestoreRBAC</p></td>
<td><p>Wiederherstellung einer Sicherung aller RBAC-bezogenen Vorgänge in der aktuellen Instanz</p></td>
<td><p>RestoreRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>Entitätsberechtigungen</p></td>
<td><p>Abfrage</p></td>
<td><p>Abfrage durchführen</p></td>
<td><p><a href="/docs/de/get-and-scalar-query.md">Abfrage</a></p></td>
</tr>
<tr>
<td><p>Suche</p></td>
<td><p>Eine Suche durchführen</p></td>
<td><p><a href="/docs/de/single-vector-search.md">Suche</a></p></td>
</tr>
<tr>
<td><p>Einfügen</p></td>
<td><p>Entitäten einfügen</p></td>
<td><p><a href="/docs/de/insert-update-delete.md">Einfügen</a></p></td>
</tr>
<tr>
<td><p>Löschen</p></td>
<td><p>Entitäten löschen</p></td>
<td><p><a href="/docs/de/delete-entities.md">Löschen</a></p></td>
</tr>
<tr>
<td><p>Upsert</p></td>
<td><p>Entitäten aktualisieren oder einfügen</p></td>
<td><p><a href="/docs/de/upsert-entities.md">Upsert</a></p></td>
</tr>
<tr>
<td><p>Importieren</p></td>
<td><p>Entitäten massenweise einfügen oder importieren</p></td>
<td><p><a href="/docs/de/import-data.md">Massen-Einfügen/Import</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>RBAC-Berechtigungen</p></td>
<td><p>CreateOwnership</p></td>
<td><p>Benutzer oder Rolle erstellen</p></td>
<td><p><a href="/docs/de/users_and_roles.md">CreateUser/CreateRole</a></p></td>
</tr>
<tr>
<td><p>UpdateUser</p></td>
<td><p>Das Passwort eines Benutzers aktualisieren</p></td>
<td><p><a href="/docs/de/users_and_roles.md">Anmeldedaten aktualisieren</a></p></td>
</tr>
<tr>
<td><p>DropOwnership</p></td>
<td><p>Ein Benutzerpasswort oder eine Rolle löschen</p></td>
<td><p><a href="/docs/de/drop_users_roles.md">Anmeldeinformationen löschen/Rolle aufheben</a></p></td>
</tr>
<tr>
<td><p>SelectOwnership</p></td>
<td><p>Alle Benutzer anzeigen, denen eine bestimmte Rolle zugewiesen wurde</p></td>
<td><p><a href="/docs/de/grant_roles.md">Rolle auswählen/Berechtigung auswählen</a></p></td>
</tr>
<tr>
<td><p>ManageOwnership</p></td>
<td><p>Einen Benutzer oder eine Rolle verwalten oder einem Benutzer eine Rolle zuweisen</p></td>
<td><p><a href="/docs/de/privilege_group.md">Benutzerrolle bearbeiten/Berechtigung bearbeiten/Berechtigung V2 bearbeiten</a></p></td>
</tr>
<tr>
<td><p>SelectUser</p></td>
<td><p>Alle einem Benutzer zugewiesenen Rollen anzeigen</p></td>
<td><p><a href="/docs/de/grant_roles.md">Benutzer auswählen</a></p></td>
</tr>
<tr>
<td><p>CreatePrivilegeGroup</p></td>
<td><p>Privilegiengruppe erstellen</p></td>
<td><p><a href="/docs/de/privilege_group.md">Berechtigungsgruppe erstellen</a></p></td>
</tr>
<tr>
<td><p>Privilegiengruppe löschen</p></td>
<td><p>Eine Berechtigungsgruppe löschen</p></td>
<td><p><a href="/docs/de/privilege_group.md">DropPrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>Alle Berechtigungsgruppen in der aktuellen Instanz anzeigen</p></td>
<td><p><a href="/docs/de/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>OperatePrivilegeGroup</p></td>
<td><p>Berechtigungen zu einer Berechtigungsgruppe hinzufügen oder daraus entfernen</p></td>
<td><p><a href="/docs/de/privilege_group.md">OperatePrivilegeGroup</a></p></td>
</tr>
</table></p></li>
</ul>
<p>Das folgende Beispiel zeigt, wie der Rolle „ <code translate="no">role_a</code> “ die Berechtigung „ <code translate="no">PrivilegeSearch</code> “ für „ <code translate="no">collection_01</code> “ in der Datenbank „ <code translate="no">default</code> “ sowie die Berechtigungsgruppe „ <code translate="no">privilege_group_1</code> “ gewährt wird.</p>
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
<h2 id="Describe-a-role" class="common-anchor-header">Eine Rolle beschreiben<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel zeigt, wie man die der Rolle „ <code translate="no">role_a</code> “ gewährten Berechtigungen mithilfe der Methode „ <code translate="no">describe_role</code> “ anzeigt.</p>
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
<p>Nachfolgend finden Sie ein Beispiel für die Ausgabe.</p>
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
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Eine Berechtigung oder eine Berechtigungsgruppe von einer Rolle widerrufen<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel zeigt, wie die Berechtigung „ <code translate="no">PrivilegeSearch</code> “ für „ <code translate="no">collection_01</code> “ in der Datenbank „ <code translate="no">default</code> “ sowie die Berechtigungsgruppe „ <code translate="no">privilege_group_1</code> “, die der Rolle „ <code translate="no">role_a</code> “ gewährt wurden, widerrufen werden.</p>
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
