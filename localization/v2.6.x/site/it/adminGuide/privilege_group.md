---
id: privilege_group.md
title: Creare un gruppo di privilegi
summary: >-
  Per semplificare il processo di concessione dei privilegi, si consiglia di
  combinare più privilegi in un gruppo di privilegi.
---
<h1 id="Create-Privilege-Group" class="common-anchor-header">Creare un gruppo di privilegi<button data-href="#Create-Privilege-Group" class="anchor-icon" translate="no">
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
    </button></h1><p>Per semplificare il processo di concessione dei privilegi, si consiglia di combinare più privilegi in un gruppo di privilegi.</p>
<h2 id="Privilege-group-vs-privileges" class="common-anchor-header">Gruppo di privilegi vs. privilegi<button data-href="#Privilege-group-vs-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>Un gruppo di privilegi è costituito da più privilegi.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/privilege-group-illustrated.png" alt="Privilege Group Illustrated" class="doc-image" id="privilege-group-illustrated" />
   </span> <span class="img-wrapper"> <span>Gruppo di privilegi illustrato</span> </span></p>
<p>Come mostrato nella figura precedente, supponiamo di dover concedere tre diversi privilegi a un ruolo.</p>
<ul>
<li><p>Se non si utilizza un gruppo di privilegi, è necessario concedere i privilegi tre volte.</p></li>
<li><p>Se si utilizza un gruppo di privilegi, è sufficiente creare un gruppo di privilegi e aggiungere i tre privilegi a questo gruppo di privilegi e concedere il gruppo di privilegi al ruolo A.</p></li>
</ul>
<p>Utilizzando un gruppo di privilegi, è possibile concedere più privilegi in blocco a un ruolo.</p>
<h2 id="Built-in-privilege-groups" class="common-anchor-header">Gruppi di privilegi integrati<button data-href="#Built-in-privilege-groups" class="anchor-icon" translate="no">
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
    </button></h2><p>Per facilitare l'uso, Milvus fornisce un totale di 9 privilegi incorporati a livello di raccolta, database e istanza: COLL_RO, COLL_RW, COLL_ADMIN, DB_RO, DB_RW, DB_Admin, Cluster_RO, Cluster_RW e Cluster_Admin.</p>
<div class="alert note">
<p>I tre livelli di gruppi di privilegi integrati non hanno una relazione a cascata. L'impostazione di un gruppo di privilegi a livello di istanza non imposta automaticamente le autorizzazioni per tutti i database e le raccolte sotto quell'istanza. I privilegi a livello di database e di raccolta devono essere impostati manualmente.</p>
</div>
<p>Le tabelle seguenti illustrano i privilegi inclusi in ciascun gruppo di privilegi incorporato.</p>
<h3 id="Collection-level" class="common-anchor-header">Livello di raccolta</h3><ul>
<li><p><strong>CollectionReadOnly (COLL_RO)</strong>: include i privilegi di lettura dei dati della raccolta.</p></li>
<li><p><strong>CollectionReadWrite (COLL_RW)</strong>: include i privilegi di lettura e scrittura dei dati della raccolta.</p></li>
<li><p><strong>CollectionAdmin (COLL_ADMIN)</strong>: include i privilegi di lettura e scrittura dei dati della raccolta e di gestione delle raccolte.</p></li>
</ul>
<p>La tabella seguente elenca i privilegi specifici inclusi nei tre gruppi di privilegi integrati a livello di raccolta:</p>
<table>
   <tr>
     <th><p><strong>Privilegio</strong></p></th>
     <th><p><strong>RaccoltaSolo lettura</strong></p></th>
     <th><p><strong>RaccoltaLeggiScrivi</strong></p></th>
     <th><p><strong>Amministratore della raccolta</strong></p></th>
   </tr>
   <tr>
     <td><p>Interrogazione</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Ricerca</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>IndiceDettaglio</p></td>
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
     <td><p>Ottieni lo stato di caricamento</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Ottenere l'avanzamento del caricamento</p></td>
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
     <td><p>MostraPartizioni</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ElencoAlias</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescriviCollezione</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescrivereAlias</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>OttieniStatistiche</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaIndice</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Rilasciare l'indice</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaPartizione</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AbbandonaPartizione</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Carico</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Rilascio</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Inserire</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Cancellare</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Inserisci</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Importazione</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Sciacquare</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Compattazione</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Bilanciamento del carico</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaAlias</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>EliminaAlias</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
</table>
<h3 id="Database-level" class="common-anchor-header">Livello del database</h3><ul>
<li><p><strong>DatabaseReadOnly (DB_RO)</strong>: include i privilegi di lettura dei dati del database</p></li>
<li><p><strong>DatabaseReadWrite (DB_RW)</strong>: include i privilegi di lettura e scrittura dei dati del database.</p></li>
<li><p><strong>DatabaseAdmin (DB_Admin)</strong>: include i privilegi di lettura e scrittura dei dati del database e la gestione dei database.</p></li>
</ul>
<p>La tabella seguente elenca i privilegi specifici inclusi nei tre gruppi di privilegi integrati a livello di database:</p>
<table>
   <tr>
     <th><p><strong>Privilegio</strong></p></th>
     <th><p><strong>DatabaseSolo lettura</strong></p></th>
     <th><p><strong>DatabaseLeggiScrivi</strong></p></th>
     <th><p><strong>DatabaseAdmin</strong></p></th>
   </tr>
   <tr>
     <td><p>Mostra collezioni</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescriviDatabase</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaCollezione</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AbbandonaCollezione</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Alterare il database</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
</table>
<h3 id="Cluster-level" class="common-anchor-header">Livello cluster</h3><ul>
<li><p><strong>ClusterReadOnly (Cluster_RO)</strong>: include i privilegi di lettura dei dati dell'istanza</p></li>
<li><p><strong>ClusterReadWrite (Cluster_RW)</strong>: include i privilegi di lettura e scrittura dei dati dell'istanza</p></li>
<li><p><strong>ClusterAdmin (Cluster_Admin)</strong>: include i privilegi di lettura e scrittura dei dati di istanza e di gestione delle istanze.</p></li>
</ul>
<p>La tabella seguente elenca i privilegi specifici inclusi nei tre gruppi di privilegi integrati a livello di istanza:</p>
<table>
   <tr>
     <th><p><strong>Privilegio</strong></p></th>
     <th><p><strong>ClusterSoloLettura</strong></p></th>
     <th><p><strong>ClusterLeggiScrivi</strong></p></th>
     <th><p><strong>ClusterAdmin</strong></p></th>
   </tr>
   <tr>
     <td><p>ElencoDatabase</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>RinominaCollezione</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaProprietà</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AggiornaUtente</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AbbandonaProprietà</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>SelezionaProprietà</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>GestisciProprietà</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>SelezionaUtente</p></td>
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
     <td><p>RipristinoRBAC</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaGruppoRisorse</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AbbandonaGruppoRisorse</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AggiornaGruppiRisorse</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>DescriviGruppoRisorse</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ElencoGruppiRisorse</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>TrasferimentoNodo</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>TrasferimentoReplica</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaDatabase</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>AbbandonaDatabase</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>RisciacquareTutti</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>CreaGruppoPrivilegi</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>Abbandona GruppoPrivilegio</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>ElencoGruppiPrivilegio</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
   <tr>
     <td><p>OperareGruppoPrivilegio</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>✔️</p></td>
   </tr>
</table>
<h2 id="Procedures" class="common-anchor-header">Procedure<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare un gruppo di privilegi e quindi aggiungere privilegi al gruppo di privilegi.</p>
<h3 id="Create-a-privilege-group" class="common-anchor-header">Creare un gruppo di privilegi</h3><p>L'esempio seguente mostra come creare un gruppo di privilegi denominato <code translate="no">privilege_group_1</code>.</p>
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
<h3 id="Add-privileges-to-a-privilege-group" class="common-anchor-header">Aggiungere privilegi a un gruppo di privilegi</h3><p>L'esempio seguente mostra come aggiungere i privilegi <code translate="no">PrivilegeBackupRBAC</code> e <code translate="no">PrivilegeRestoreRBAC</code> al gruppo di privilegi <code translate="no">privilege_group_1</code> appena creato.</p>
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
<h3 id="Remove-privileges-from-a-privilege-group" class="common-anchor-header">Rimuovere i privilegi da un gruppo di privilegi</h3><p>L'esempio seguente mostra come rimuovere il privilegio <code translate="no">PrivilegeRestoreRBAC</code> dal gruppo di privilegi <code translate="no">privilege_group_1</code>.</p>
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
<h3 id="List-privilege-groups" class="common-anchor-header">Elencare i gruppi di privilegi</h3><p>L'esempio seguente mostra come elencare tutti i gruppi di privilegi esistenti.</p>
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
<p>Di seguito è riportato un esempio di output.</p>
<pre><code translate="no" class="language-bash">PrivilegeGroupItem: &lt;privilege_group:privilege_group_1&gt;, &lt;privileges:(<span class="hljs-string">&#x27;Search&#x27;</span>, <span class="hljs-string">&#x27;Query&#x27;</span>)&gt;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-a-privilege-group" class="common-anchor-header">Eliminare un gruppo di privilegi</h3><p>L'esempio seguente mostra come eliminare il gruppo di privilegi <code translate="no">privilege_group_1</code>.</p>
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
