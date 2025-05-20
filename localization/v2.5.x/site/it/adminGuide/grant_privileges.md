---
id: grant_privileges.md
title: Concessione di privilegi o gruppi di privilegi ai ruoli
summary: >-
  Una volta creato un ruolo, è possibile assegnare i privilegi al ruolo. Questa
  guida illustra come concedere privilegi o gruppi di privilegi a un ruolo.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Concessione di privilegi o gruppi di privilegi ai ruoli<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Una volta creato un ruolo, è possibile concedere privilegi al ruolo. Questa guida illustra come concedere privilegi o gruppi di privilegi a un ruolo.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Assegnare un privilegio o un gruppo di privilegi a un ruolo<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 introduce una nuova versione dell'API che semplifica l'operazione di assegnazione. Non è più necessario cercare il tipo di oggetto quando si concede un privilegio a un ruolo. Di seguito sono riportati i parametri e le relative spiegazioni.</p>
<ul>
<li><p><strong>nome_ruolo:</strong> il nome del ruolo di destinazione a cui devono essere concessi i privilegi o i gruppi di privilegi.</p></li>
<li><p><strong>Risorsa</strong>: La risorsa di destinazione di un privilegio, che può essere un'istanza specifica, un database o una raccolta.</p></li>
</ul>
<p>La tabella seguente spiega come specificare la risorsa nel metodo <code translate="no">client.grantV2()</code>.</p>
<table>
   <tr>
     <th><p><strong>Livello</strong></p></th>
     <th><p><strong>Risorsa</strong></p></th>
     <th><p><strong>Metodo di concessione</strong></p></th>
     <th><p><strong>Note</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Collezione</strong></p></td>
     <td><p>Una raccolta specifica</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Immettere il nome della raccolta di destinazione e il nome del database a cui appartiene la raccolta di destinazione.</p></td>
   </tr>
   <tr>
     <td><p>Tutte le raccolte sotto un database specifico</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Immettere il nome del database di destinazione e un carattere jolly <code translate="no">*</code> come nome della raccolta.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Database</strong></p></td>
     <td><p>Un database specifico</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Immettere il nome del database di destinazione e il carattere jolly <code translate="no">*</code> come nome della raccolta.</p></td>
   </tr>
   <tr>
     <td><p>Tutti i database dell'istanza corrente</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Immettere <code translate="no">*</code> come nome del database e <code translate="no">*</code> come nome dell'insieme.</p></td>
   </tr>
   <tr>
     <td><p><strong>Istanza</strong></p></td>
     <td><p>L'istanza corrente</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Immettere <code translate="no">*</code> come nome del database e <code translate="no">*</code> come nome dell'insieme.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Privilegio</strong>: Il privilegio specifico o il <a href="/docs/it/privilege_group.md">gruppo di privilegi</a> da concedere a un ruolo. Attualmente, Milvus offre 56 tipi di privilegi che possono essere concessi. La tabella seguente elenca i privilegi di Milvus.</p>
<p><div class="alert note"></p>
<p>La colonna del tipo nella tabella sottostante è utilizzata per facilitare la ricerca rapida dei privilegi ed è usata solo a scopo di classificazione. Quando si concedono privilegi, non è necessario comprendere i tipi. È sufficiente inserire i privilegi corrispondenti.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>Tipo</strong></p></th>
<th><p><strong>Privilegio</strong></p></th>
<th><p><strong>Descrizione</strong></p></th>
<th><p><strong>Descrizione dell'API pertinente sul lato client</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>Privilegi del database</p></td>
<td><p>ElencoDatabase</p></td>
<td><p>Visualizza tutti i database dell'istanza corrente</p></td>
<td><p><a href="/docs/it/manage_databases.md">Elenco dei database</a></p></td>
</tr>
<tr>
<td><p>DescriviDatabase</p></td>
<td><p>Visualizza i dettagli di un database</p></td>
<td><p><a href="/docs/it/manage_databases.md">DescriviDatabase</a></p></td>
</tr>
<tr>
<td><p>CreaDatabase</p></td>
<td><p>Crea un database</p></td>
<td><p><a href="/docs/it/manage_databases.md">CreaDatabase</a></p></td>
</tr>
<tr>
<td><p>Abbandona il database</p></td>
<td><p>Eliminare un database</p></td>
<td><p><a href="/docs/it/manage_databases.md">Rilasciare il database</a></p></td>
</tr>
<tr>
<td><p>Alterare il database</p></td>
<td><p>Modifica le proprietà di un database</p></td>
<td><p><a href="/docs/it/manage_databases.md">AlteraDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Privilegi di raccolta</p></td>
<td><p>GetFlushState</p></td>
<td><p>Controlla lo stato dell'operazione di lavaggio della raccolta</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Ottenere lo stato di lavaggio</a></p></td>
</tr>
<tr>
<td><p>Stato di caricamento</p></td>
<td><p>Controlla lo stato di caricamento di una raccolta</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">Stato di caricamento</a></p></td>
</tr>
<tr>
<td><p>OttieniProgressoCaricamento</p></td>
<td><p>Controlla l'avanzamento del caricamento di una collezione</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">Ottieni l'avanzamento del caricamento</a></p></td>
</tr>
<tr>
<td><p>Mostra collezioni</p></td>
<td><p>Visualizza tutte le raccolte con privilegi di raccolta</p></td>
<td><p><a href="/docs/it/view-collections.md">Mostra collezioni</a></p></td>
</tr>
<tr>
<td><p>ElencaAliases</p></td>
<td><p>Visualizza tutti gli alias di una collezione</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ElencoAlias</a></p></td>
</tr>
<tr>
<td><p>DescriviCollezione</p></td>
<td><p>Visualizza i dettagli di una collezione</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">DescriviCollezione</a></p></td>
</tr>
<tr>
<td><p>DescriviAlias</p></td>
<td><p>Visualizza i dettagli di un alias</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">DescriviAlias</a></p></td>
</tr>
<tr>
<td><p>Ottieni statistiche</p></td>
<td><p>Ottenere le statistiche di una raccolta (ad esempio, il numero di entità in una raccolta)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">OttieniStatisticheCollezione</a></p></td>
</tr>
<tr>
<td><p>CreaCollezione</p></td>
<td><p>Crea una raccolta</p></td>
<td><p><a href="/docs/it/create-collection.md">CreaCollezione</a></p></td>
</tr>
<tr>
<td><p>Abbandona la collezione</p></td>
<td><p>Eliminare una collezione</p></td>
<td><p><a href="/docs/it/drop-collection.md">Rilasciare la collezione</a></p></td>
</tr>
<tr>
<td><p>Caricare</p></td>
<td><p>Carica una raccolta</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>Rilasciare</p></td>
<td><p>Rilascia una raccolta</p></td>
<td><p><a href="/docs/it/load-and-release.md">Rilasciare la collezione</a></p></td>
</tr>
<tr>
<td><p>Sciacquare</p></td>
<td><p>Persiste tutte le entità di una collezione in un segmento sigillato. Qualsiasi entità inserita dopo l'operazione di flush sarà memorizzata in un nuovo segmento.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Flush/GetFlushState</a></p></td>
</tr>
<tr>
<td><p>Compattazione</p></td>
<td><p>Attiva manualmente la compattazione</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Compattare</a></p></td>
</tr>
<tr>
<td><p>RinominaCollezione</p></td>
<td><p>Rinomina una collezione</p></td>
<td><p><a href="/docs/it/modify-collection.md">RinominaCollezione</a></p></td>
</tr>
<tr>
<td><p>CreaAlias</p></td>
<td><p>Crea un alias per una collezione</p></td>
<td><p><a href="/docs/it/manage-aliases.md">CreaAlias</a></p></td>
</tr>
<tr>
<td><p>EliminaAlias</p></td>
<td><p>Elimina l'alias di una collezione</p></td>
<td><p><a href="/docs/it/manage-aliases.md">EliminaAlias</a></p></td>
</tr>
<tr>
<td><p>ArrossisciTutti</p></td>
<td><p>Cancella tutte le raccolte in un database</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">ArrossisciTutti</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>Privilegi della partizione</p></td>
<td><p>HasPartition</p></td>
<td><p>Controlla se esiste una partizione</p></td>
<td><p><a href="/docs/it/manage-partitions.md">Ha una partizione</a></p></td>
</tr>
<tr>
<td><p>Mostra partizioni</p></td>
<td><p>Visualizza tutte le partizioni di un insieme</p></td>
<td><p><a href="/docs/it/manage-partitions.md">Mostra partizioni</a></p></td>
</tr>
<tr>
<td><p>Crea partizione</p></td>
<td><p>Crea una partizione</p></td>
<td><p><a href="/docs/it/manage-partitions.md">CreaPartizione</a></p></td>
</tr>
<tr>
<td><p>Abbandona partizione</p></td>
<td><p>Eliminare una partizione</p></td>
<td><p><a href="/docs/it/manage-partitions.md">AbbandonaPartizione</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Privilegi degli indici</p></td>
<td><p>IndiceDettaglio</p></td>
<td><p>Visualizza i dettagli di un indice</p></td>
<td><p><a href="/docs/it/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>CreaIndice</p></td>
<td><p>Creare un indice</p></td>
<td><p><a href="/docs/it/index-vector-fields.md">CreaIndex</a></p></td>
</tr>
<tr>
<td><p>Rilasciare l'indice</p></td>
<td><p>Eliminare un indice</p></td>
<td><p><a href="/docs/it/index-vector-fields.md">Rilasciare l'indice</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilegi di gestione delle risorse</p></td>
<td><p>Bilanciamento del carico</p></td>
<td><p>Ottenere il bilanciamento del carico</p></td>
<td><p><a href="/docs/it/resource_group.md">Bilanciamento del carico</a></p></td>
</tr>
<tr>
<td><p>Crea gruppo di risorse</p></td>
<td><p>Crea un gruppo di risorse</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CreaGruppoRisorse</a></p></td>
</tr>
<tr>
<td><p>Abbandona il gruppo di risorse</p></td>
<td><p>Eliminare un gruppo di risorse</p></td>
<td><p><a href="/docs/it/resource_group.md">AbbandonaGruppoRisorse</a></p></td>
</tr>
<tr>
<td><p>AggiornaGruppi di risorse</p></td>
<td><p>Aggiornare un gruppo di risorse</p></td>
<td><p><a href="/docs/it/resource_group.md">Aggiornare i gruppi di risorse</a></p></td>
</tr>
<tr>
<td><p>DescriviGruppoRisorse</p></td>
<td><p>Visualizza i dettagli di un gruppo di risorse</p></td>
<td><p><a href="/docs/it/resource_group.md">DescriviGruppoRisorse</a></p></td>
</tr>
<tr>
<td><p>Elenco dei gruppi di risorse</p></td>
<td><p>Visualizza tutti i gruppi di risorse dell'istanza corrente</p></td>
<td><p><a href="/docs/it/resource_group.md">Elenco dei gruppi di risorse</a></p></td>
</tr>
<tr>
<td><p>TrasferisciNodo</p></td>
<td><p>Trasferisce i nodi tra i gruppi di risorse</p></td>
<td><p><a href="/docs/it/resource_group.md">TrasferisciNodo</a></p></td>
</tr>
<tr>
<td><p>TrasferisciReplica</p></td>
<td><p>Trasferisce le repliche tra i gruppi di risorse</p></td>
<td><p><a href="/docs/it/resource_group.md">TrasferimentoReplica</a></p></td>
</tr>
<tr>
<td><p>BackupRBAC</p></td>
<td><p>Crea un backup per tutte le operazioni relative a RBAC nell'istanza corrente</p></td>
<td><p>BackupRBAC</p></td>
</tr>
<tr>
<td><p>RipristinaRBAC</p></td>
<td><p>Ripristina un backup di tutte le operazioni relative a RBAC nell'istanza corrente</p></td>
<td><p>RipristinaRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>Privilegi dell'entità</p></td>
<td><p>Interrogazione</p></td>
<td><p>Eseguire una query</p></td>
<td><p><a href="/docs/it/get-and-scalar-query.md">Interrogazione</a></p></td>
</tr>
<tr>
<td><p>Ricerca</p></td>
<td><p>Eseguire una ricerca</p></td>
<td><p><a href="/docs/it/single-vector-search.md">Ricerca</a></p></td>
</tr>
<tr>
<td><p>Inserire</p></td>
<td><p>Inserire entità</p></td>
<td><p><a href="/docs/it/insert-update-delete.md">Inserire</a></p></td>
</tr>
<tr>
<td><p>Eliminare</p></td>
<td><p>Cancellare entità</p></td>
<td><p><a href="/docs/it/delete-entities.md">Cancellare</a></p></td>
</tr>
<tr>
<td><p>Inserire</p></td>
<td><p>Inserisci entità</p></td>
<td><p><a href="/docs/it/upsert-entities.md">Inserisci</a></p></td>
</tr>
<tr>
<td><p>Importazione</p></td>
<td><p>Inserire o importare entità in blocco</p></td>
<td><p><a href="/docs/it/import-data.md">Inserimento/Importazione massiva</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Privilegi RBAC</p></td>
<td><p>CreaProprietà</p></td>
<td><p>Crea un utente o un ruolo</p></td>
<td><p><a href="/docs/it/users_and_roles.md">CreaUtente/CreaRuolo</a></p></td>
</tr>
<tr>
<td><p>AggiornaUtente</p></td>
<td><p>Aggiorna la password di un utente</p></td>
<td><p><a href="/docs/it/users_and_roles.md">AggiornaCredenziale</a></p></td>
</tr>
<tr>
<td><p>Eliminare la proprietà</p></td>
<td><p>Elimina la password di un utente o di un ruolo</p></td>
<td><p><a href="/docs/it/drop_users_roles.md">EliminaCredenziale/AbbandonaRuolo</a></p></td>
</tr>
<tr>
<td><p>SelezionaProprietà</p></td>
<td><p>Visualizza tutti gli utenti a cui è stato concesso un ruolo specifico</p></td>
<td><p><a href="/docs/it/grant_roles.md">SelezionaRuolo/SelezionaRegolamento</a></p></td>
</tr>
<tr>
<td><p>GestisciProprietà</p></td>
<td><p>Gestione di un utente o di un ruolo o concessione di un ruolo a un utente</p></td>
<td><p><a href="/docs/it/privilege_group.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2</a></p></td>
</tr>
<tr>
<td><p>SelezionaUtente</p></td>
<td><p>Visualizza tutti i ruoli concessi a un utente</p></td>
<td><p><a href="/docs/it/grant_roles.md">Seleziona utente</a></p></td>
</tr>
<tr>
<td><p>Crea gruppo di privilegi</p></td>
<td><p>Crea un gruppo di privilegi</p></td>
<td><p><a href="/docs/it/privilege_group.md">Crea gruppo di privilegi</a></p></td>
</tr>
<tr>
<td><p>Elimina gruppo di privilegi</p></td>
<td><p>Eliminare un gruppo di privilegi</p></td>
<td><p><a href="/docs/it/privilege_group.md">AbbandonaGruppoPrivilegio</a></p></td>
</tr>
<tr>
<td><p>Elenco dei gruppi di privilegi</p></td>
<td><p>Visualizza tutti i gruppi di privilegi nell'istanza corrente</p></td>
<td><p><a href="/docs/it/privilege_group.md">Elenco dei gruppi di privilegi</a></p></td>
</tr>
<tr>
<td><p>OperareGruppoPrivilegio</p></td>
<td><p>Aggiungere privilegi a un gruppo di privilegi o rimuoverli da esso</p></td>
<td><p><a href="/docs/it/privilege_group.md">Operare il gruppo di privilegi</a></p></td>
</tr>
</table></p></li>
</ul>
<p>L'esempio seguente mostra come concedere il privilegio <code translate="no">PrivilegeSearch</code> su <code translate="no">collection_01</code> sotto il database <code translate="no">default</code> e un gruppo di privilegi chiamato <code translate="no">privilege_group_1</code> al ruolo <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">Descrivere un ruolo<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente mostra come visualizzare i privilegi concessi al ruolo <code translate="no">role_a</code> utilizzando il metodo <code translate="no">describe_role</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Di seguito è riportato un esempio di output.</p>
<pre><code translate="no" class="language-python">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Revocare un privilegio o un gruppo di privilegi a un ruolo<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente mostra come revocare il privilegio <code translate="no">PrivilegeSearch</code> su <code translate="no">collection_01</code> sotto il database <code translate="no">default</code> e il gruppo di privilegi <code translate="no">privilege_group_1</code> che sono stati concessi al ruolo <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
