---
id: privilege_group.md
title: Privilegiengruppe erstellen
summary: >-
  Um den Prozess der Rechtevergabe zu rationalisieren, empfiehlt es sich,
  mehrere Rechte in einer Rechtegruppe zusammenzufassen.
---
<h1 id="Create-Privilege-Group" class="common-anchor-header">Privilegiengruppe erstellen<button data-href="#Create-Privilege-Group" class="anchor-icon" translate="no">
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
    </button></h1><p>Um den Prozess der Vergabe von Privilegien zu rationalisieren, wird empfohlen, mehrere Privilegien in einer Privilegiengruppe zusammenzufassen.</p>
<h2 id="Privilege-group-vs-privileges" class="common-anchor-header">Privilegiengruppe vs. Privilegien<button data-href="#Privilege-group-vs-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine Berechtigungsgruppe besteht aus mehreren Privilegien.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/privilege-group-illustrated.png" alt="Privilege Group Illustrated" class="doc-image" id="privilege-group-illustrated" />
   </span> <span class="img-wrapper"> <span>Privilegiengruppe illustriert</span> </span></p>
<p>Wie in der obigen Abbildung dargestellt, nehmen Sie an, dass Sie einer Rolle drei verschiedene Berechtigungen gewähren müssen.</p>
<ul>
<li><p>Wenn Sie keine Berechtigungsgruppe verwenden, müssen Sie die Berechtigungen dreimal erteilen.</p></li>
<li><p>Wenn Sie eine Berechtigungsgruppe verwenden, brauchen Sie nur eine Berechtigungsgruppe zu erstellen, die drei Berechtigungen zu dieser Berechtigungsgruppe hinzuzufügen und die Berechtigungsgruppe der Rolle A zu gewähren.</p></li>
</ul>
<p>Durch die Verwendung einer Berechtigungsgruppe können Sie einer Rolle mehrere Privilegien im Ganzen gewähren.</p>
<h2 id="Built-in-privilege-groups" class="common-anchor-header">Eingebaute Berechtigungsgruppen<button data-href="#Built-in-privilege-groups" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Benutzung zu erleichtern, bietet Milvus insgesamt 9 eingebaute Berechtigungen auf der Ebene der Sammlung, der Datenbank und der Instanz: COLL_RO, COLL_RW, COLL_ADMIN, DB_RO, DB_RW, DB_Admin, Cluster_RO, Cluster_RW und Cluster_Admin.</p>
<div class="alert note">
<p>Die drei Ebenen der eingebauten Berechtigungsgruppen stehen nicht in einer kaskadierenden Beziehung. Wenn Sie eine Berechtigungsgruppe auf Instanzebene festlegen, werden nicht automatisch Berechtigungen für alle Datenbanken und Sammlungen unter dieser Instanz festgelegt. Berechtigungen auf Datenbank- und Sammlungsebene müssen manuell festgelegt werden.</p>
</div>
<p>In den folgenden Tabellen werden die in jeder der integrierten Berechtigungsgruppen enthaltenen Berechtigungen erläutert.</p>
<h3 id="Collection-level" class="common-anchor-header">Sammlungsebene</h3><ul>
<li><p><strong>CollectionReadOnly (COLL_RO)</strong>: umfasst die Berechtigung zum Lesen von Sammlungsdaten</p></li>
<li><p><strong>CollectionReadWrite (COLL_RW)</strong>: umfasst die Berechtigung zum Lesen und Schreiben von Sammlungsdaten</p></li>
<li><p><strong>CollectionAdmin (COLL_ADMIN)</strong>: umfasst die Berechtigung zum Lesen und Schreiben von Sammlungsdaten und zur Verwaltung von Sammlungen.</p></li>
</ul>
<p>In der folgenden Tabelle sind die spezifischen Berechtigungen aufgeführt, die in den drei integrierten Berechtigungsgruppen auf der Sammlungsebene enthalten sind:</p>
<table>
   <tr>
     <th><p><strong>Privileg</strong></p></th>
     <th><p><strong>SammlungNurLesen</strong></p></th>
     <th><p><strong>SammlungLesenSchreiben</strong></p></th>
     <th><p><strong>SammlungAdmin</strong></p></th>
   </tr>
   <tr>
     <td><p>Abfrage</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Suche</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>IndexDetail</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>GetFlushState</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>GetLoadState</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>GetLoadingProgress</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>HasPartition</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ShowPartitions</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ListAliases</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescribeCollection</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescribeAlias</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>GetStatistiken</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreateIndex</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropIndex</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreatePartition</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropPartition</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Laden</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Freigeben</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Einfügen</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Löschen</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Upsertieren</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Importieren</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Spülen</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Verdichtung</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>LoadBalance</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreateAlias</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropAlias</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
</table>
<h3 id="Database-level" class="common-anchor-header">Datenbank-Ebene</h3><ul>
<li><p><strong>DatabaseReadOnly (DB_RO)</strong>: umfasst die Berechtigung zum Lesen von Datenbankdaten</p></li>
<li><p><strong>DatabaseReadWrite (DB_RW)</strong>: umfasst die Berechtigung zum Lesen und Schreiben von Datenbankdaten</p></li>
<li><p><strong>DatabaseAdmin (DB_Admin)</strong>: umfasst die Berechtigung zum Lesen und Schreiben von Datenbankdaten und zur Verwaltung von Datenbanken.</p></li>
</ul>
<p>In der folgenden Tabelle sind die spezifischen Berechtigungen aufgeführt, die in den drei integrierten Berechtigungsgruppen auf Datenbankebene enthalten sind:</p>
<table>
   <tr>
     <th><p><strong>Privileg</strong></p></th>
     <th><p><strong>DatenbankNurLesen</strong></p></th>
     <th><p><strong>DatenbankLesenSchreiben</strong></p></th>
     <th><p><strong>DatenbankAdmin</strong></p></th>
   </tr>
   <tr>
     <td><p>Sammlungen anzeigen</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescribeDatabase</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreateCollection</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropCollection</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AlterDatabase</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
</table>
<h3 id="Cluster-level" class="common-anchor-header">Cluster-Ebene</h3><ul>
<li><p><strong>ClusterReadOnly (Cluster_RO)</strong>: umfasst die Berechtigung zum Lesen von Instanzdaten</p></li>
<li><p><strong>ClusterReadWrite (Cluster_RW)</strong>: umfasst die Berechtigung zum Lesen und Schreiben von Instanzdaten</p></li>
<li><p><strong>ClusterAdmin (Cluster_Admin)</strong>: umfasst die Berechtigung zum Lesen und Schreiben von Instanzdaten und zur Verwaltung von Instanzen.</p></li>
</ul>
<p>In der folgenden Tabelle sind die spezifischen Berechtigungen aufgeführt, die in den drei integrierten Berechtigungsgruppen auf Instanzebene enthalten sind:</p>
<table>
   <tr>
     <th><p><strong>Privileg</strong></p></th>
     <th><p><strong>ClusterReadOnly</strong></p></th>
     <th><p><strong>ClusterReadWrite</strong></p></th>
     <th><p><strong>ClusterAdmin</strong></p></th>
   </tr>
   <tr>
     <td><p>ListDatabases</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>RenameCollection</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreateOwnership</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>UpdateUser</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropOwnership</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>SelectOwnership</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ManageOwnership</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>SelectUser</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>BackupRBAC</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>WiederherstellenRBAC</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreateResourceGroup</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropResourceGroup</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>UpdateResourceGroups</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescribeResourceGroup</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ListResourceGroups</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>TransferNode</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>TransferReplica</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreateDatabase</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropDatabase</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>FlushAll</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreatePrivilegeGroup</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DropPrivilegeGroup</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ListPrivilegeGroups</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>OperatePrivilegeGroup</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
</table>
<h2 id="Procedures" class="common-anchor-header">Prozeduren<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können eine Berechtigungsgruppe erstellen und dann der Berechtigungsgruppe Berechtigungen hinzufügen.</p>
<h3 id="Create-a-privilege-group" class="common-anchor-header">Erstellen einer Berechtigungsgruppe</h3><p>Das folgende Beispiel zeigt, wie Sie eine Berechtigungsgruppe mit dem Namen <code translate="no">privilege_group_1</code> erstellen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#go">Go</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client.create_privilege_group(group_name=<span class="hljs-string">&#x27;privilege_group_1&#x27;</span>）
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

err = client.CreatePrivilegeGroup(ctx, milvusclient.NewCreatePrivilegeGroupOption(<span class="hljs-string">&quot;privilege_group_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreatePrivilegeGroupReq;

client.createPrivilegeGroup(CreatePrivilegeGroupReq.builder()
        .groupName(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPrivilegeGroup</span>({
  <span class="hljs-attr">group_name</span>: <span class="hljs-string">&#x27;privilege_group_1&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/privilege_groups/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;privilegeGroupName&quot;:&quot;privilege_group_1&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-privileges-to-a-privilege-group" class="common-anchor-header">Hinzufügen von Berechtigungen zu einer Berechtigungsgruppe</h3><p>Das folgende Beispiel zeigt, wie man die Privilegien <code translate="no">PrivilegeBackupRBAC</code> und <code translate="no">PrivilegeRestoreRBAC</code> zu der gerade erstellten Privilegiengruppe <code translate="no">privilege_group_1</code> hinzufügt.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#go">Go</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client.add_privileges_to_group(group_name=<span class="hljs-string">&#x27;privilege_group_1&#x27;</span>, privileges=[<span class="hljs-string">&#x27;Query&#x27;</span>, <span class="hljs-string">&#x27;Search&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

privileges := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>}
err = client.AddPrivilegesToGroup(ctx, milvusclient.NewAddPrivilegesToGroupOption(<span class="hljs-string">&quot;privilege_group_1&quot;</span>, privileges...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.AddPrivilegesToGroupReq;

client.addPrivilegesToGroup(AddPrivilegesToGroupReq.builder()
        .groupName(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .privileges(Arrays.asList(<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addPrivilegesToGroup</span>({
  <span class="hljs-attr">group_name</span>: privilege_group_1,
  <span class="hljs-attr">privileges</span>: [<span class="hljs-string">&#x27;Query&#x27;</span>, <span class="hljs-string">&#x27;Search&#x27;</span>],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/privilege_groups/add_privileges_to_group&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;privilegeGroupName&quot;:&quot;privilege_group_1&quot;,
    &quot;privileges&quot;:[&quot;Query&quot;, &quot;Search&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Remove-privileges-from-a-privilege-group" class="common-anchor-header">Entfernen von Privilegien aus einer Privilegiengruppe</h3><p>Das folgende Beispiel zeigt, wie man das Privileg <code translate="no">PrivilegeRestoreRBAC</code> aus der Privilegiengruppe <code translate="no">privilege_group_1</code> entfernt.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#go">Go</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client.remove_privileges_from_group(group_name=<span class="hljs-string">&#x27;privilege_group_1&#x27;</span>, privileges=<span class="hljs-string">&#x27;Search&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

err = client.RemovePrivilegesFromGroup(ctx, milvusclient.NewRemovePrivilegesFromGroupOption(<span class="hljs-string">&quot;privilege_group_1&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Search&quot;</span>}...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RemovePrivilegesFromGroupReq;

client.removePrivilegesFromGroup(RemovePrivilegesFromGroupReq.builder()
        .groupName(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .privileges(Collections.singletonList(<span class="hljs-string">&quot;Search&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">removePrivilegesFromGroup</span>({
  <span class="hljs-attr">group_name</span>: <span class="hljs-string">&quot;privilege_group_1&quot;</span>,
  <span class="hljs-attr">privileges</span>: [<span class="hljs-string">&quot;Search&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/privilege_groups/remove_privileges_from_group&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;privilegeGroupName&quot;:&quot;privilege_group_1&quot;,
    &quot;privileges&quot;:[&quot;Search&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-privilege-groups" class="common-anchor-header">Auflisten von Berechtigungsgruppen</h3><p>Das folgende Beispiel zeigt, wie man alle vorhandenen Berechtigungsgruppen auflistet.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#go">Go</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client.list_privilege_groups()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

groups, err := client.ListPrivilegeGroups(ctx, milvusclient.NewListPrivilegeGroupsOption())
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.PrivilegeGroup;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.ListPrivilegeGroupsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.ListPrivilegeGroupsResp;

<span class="hljs-type">ListPrivilegeGroupsResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.listPrivilegeGroups(ListPrivilegeGroupsReq.builder()
        .build());
List&lt;PrivilegeGroup&gt; groups = resp.getPrivilegeGroups();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPrivilegeGroups</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/privilege_groups/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Unten sehen Sie eine Beispielausgabe.</p>
<pre><code translate="no" class="language-bash">PrivilegeGroupItem: &lt;privilege_group:privilege_group_1&gt;, &lt;privileges:(<span class="hljs-string">&#x27;Search&#x27;</span>, <span class="hljs-string">&#x27;Query&#x27;</span>)&gt;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-a-privilege-group" class="common-anchor-header">Aufheben einer Berechtigungsgruppe</h3><p>Das folgende Beispiel demonstriert, wie die Berechtigungsgruppe <code translate="no">privilege_group_1</code> gelöscht wird.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#go">Go</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client.drop_privilege_group(group_name=<span class="hljs-string">&#x27;privilege_group_1&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

err = client.DropPrivilegeGroup(ctx, milvusclient.NewDropPrivilegeGroupOption(<span class="hljs-string">&quot;privilege_group_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DropPrivilegeGroupReq;

client.dropPrivilegeGroup(DropPrivilegeGroupReq.builder()
        .groupName(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropPrivilegeGroup</span>({<span class="hljs-attr">group_name</span>: <span class="hljs-string">&#x27;privilege_group_1&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/privilege_groups/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;privilegeGroupName&quot;:&quot;privilege_group_1&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
