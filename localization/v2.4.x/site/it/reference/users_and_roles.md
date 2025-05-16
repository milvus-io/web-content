---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Conoscere la definizione di utenti, ruoli, oggetti e privilegi nel controllo
  degli accessi basato sui ruoli (RBAC).
title: 'Utenti, privilegi e ruoli'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Utenti, privilegi e ruoli<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento fornisce una panoramica del controllo degli accessi basato sui ruoli (RBAC) in Milvus, illustrando le definizioni e le relazioni tra utenti, ruoli, oggetti e privilegi.</p>
<p>La figura seguente illustra la relazione tra oggetti, privilegi, ruoli e utenti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>utenti_e_ruoli</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">Concetti chiave<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Per gestire il controllo degli accessi alle risorse Milvus, è importante comprendere i componenti chiave del RBAC: tipi di oggetti, nomi di oggetti, utenti, ruoli e privilegi.</p>
<ul>
<li><p><strong>Tipo di oggetto</strong>: la categoria dell'oggetto per il quale viene assegnato un privilegio. Il tipo di oggetto può essere:</p>
<ul>
<li><code translate="no">Global</code>: Oggetti a livello di sistema, che consentono all'utente di eseguire azioni che influiscono su tutte le raccolte, gli utenti o le impostazioni a livello di sistema.</li>
<li><code translate="no">Collection</code>: Oggetti specifici della collezione, che consentono all'utente di eseguire azioni quali la creazione di indici, il caricamento di dati, l'inserimento o l'eliminazione di dati e l'interrogazione di dati all'interno di una collezione specifica.</li>
<li><code translate="no">User</code>: Oggetti relativi alla gestione degli utenti, che consentono all'utente di gestire le credenziali e i ruoli degli utenti del database, come l'aggiornamento delle credenziali o la visualizzazione dei dettagli dell'utente.</li>
</ul></li>
<li><p><strong>Nome dell'oggetto</strong>: il nome specifico dell'oggetto per cui controllare l'accesso. Ad esempio:</p>
<ul>
<li>Se il tipo di oggetto è <code translate="no">Global</code>, il nome dell'oggetto deve essere impostato sul carattere jolly (<code translate="no">*</code>), che indica tutti gli oggetti del tipo specificato.</li>
<li>Se il tipo di oggetto è <code translate="no">Collection</code>, il nome dell'oggetto è il nome di un insieme.</li>
<li>Se il tipo di oggetto è <code translate="no">User</code>, il nome dell'oggetto è il nome di un utente del database.</li>
</ul></li>
<li><p><strong>Utente</strong>: una persona o un'applicazione che interagisce con Milvus, che consiste in un nome utente e in una password corrispondente.</p></li>
<li><p><strong>Privilegio</strong>: definisce le azioni che possono essere eseguite e le risorse a cui si può accedere. I privilegi non sono concessi direttamente agli utenti, ma sono assegnati ai ruoli.</p></li>
<li><p><strong>Ruolo</strong>: definisce l'insieme dei privilegi che un utente ha per determinati oggetti. Una volta che un ruolo è legato a un utente, l'utente eredita tutti i privilegi concessi a quel ruolo.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Esempio: Concessione di privilegi<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>Il seguente frammento di codice mostra come concedere un privilegio <code translate="no">CreateIndex</code> a un ruolo su una collezione specifica:</p>
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
<p>Per ulteriori informazioni sulle API relative ai privilegi, consultare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>Per ottenere maggiori informazioni sulle API legate ai privilegi, fare riferimento a <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>Per ottenere maggiori informazioni sulle API relative ai privilegi, fare riferimento a <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> e <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Utenti e ruoli predefiniti<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus crea per default un utente <code translate="no">root</code> con una password predefinita <code translate="no">Milvus</code>. All'utente <code translate="no">root</code> vengono concessi i privilegi <code translate="no">admin</code>, il che significa che questo utente <code translate="no">root</code> può avere accesso a tutte le risorse ed eseguire tutte le azioni.</p>
<p>Se un utente è associato al ruolo <code translate="no">public</code>, ha diritto ai seguenti privilegi:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">Elenco dei tipi di oggetto e dei privilegi<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente elenca i valori che si possono scegliere quando si <a href="/docs/it/v2.4.x/rbac.md">abilita RBAC</a>.</p>
<table>
<thead>
<tr><th>Tipo di oggetto</th><th>Nome del privilegio</th><th>Descrizione dell'API pertinente sul lato client</th></tr>
</thead>
<tbody>
<tr><td>Raccolta</td><td>CreaIndex</td><td>CreaIndex</td></tr>
<tr><td>Raccolta</td><td>Indice di caduta</td><td>Indice di caduta</td></tr>
<tr><td>Raccolta</td><td>IndiceDettaglio</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Raccolta</td><td>Carico</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Raccolta</td><td>OttenereCaricamentoProgresso</td><td>Ottenere l'avanzamento del caricamento</td></tr>
<tr><td>Raccolta</td><td>Stato di caricamento</td><td>Ottieni stato di carico</td></tr>
<tr><td>Raccolta</td><td>Rilascio</td><td>RilascioCollezione</td></tr>
<tr><td>Raccolta</td><td>Inserire</td><td>Inserire</td></tr>
<tr><td>Raccolta</td><td>Cancellare</td><td>Cancellare</td></tr>
<tr><td>Raccolta</td><td>Upsert</td><td>Inserisci</td></tr>
<tr><td>Raccolta</td><td>Ricerca</td><td>Ricerca</td></tr>
<tr><td>Raccolta</td><td>Sciacquare</td><td>Flush/GetFlushState</td></tr>
<tr><td>Raccolta</td><td>GetFlushState</td><td>Ottenere lo stato di risciacquo</td></tr>
<tr><td>Raccolta</td><td>Domanda</td><td>Interrogazione</td></tr>
<tr><td>Raccolta</td><td>OttieniStatistiche</td><td>OttenereStatistiche della collezione</td></tr>
<tr><td>Raccolta</td><td>Compattazione</td><td>Compatto</td></tr>
<tr><td>Raccolta</td><td>Importazione</td><td>Inserimento/importazione massiva</td></tr>
<tr><td>Raccolta</td><td>Bilanciamento del carico</td><td>Bilanciamento del carico</td></tr>
<tr><td>Raccolta</td><td>CreaPartizione</td><td>CreaPartizione</td></tr>
<tr><td>Raccolta</td><td>Partizione di caduta</td><td>Partizione di caduta</td></tr>
<tr><td>Raccolta</td><td>MostraPartizioni</td><td>MostraPartizioni</td></tr>
<tr><td>Collezione</td><td>HaPartizione</td><td>HaPartizione</td></tr>
<tr><td>Globale</td><td>Tutti</td><td>Tutti i permessi delle operazioni API in questa tabella</td></tr>
<tr><td>Globale</td><td>CreaCollezione</td><td>CreaCollezione</td></tr>
<tr><td>Globale</td><td>Raccogliere</td><td>Raccolta di gocce</td></tr>
<tr><td>Globale</td><td>DescrivereCollezione</td><td>DescriviCollezione</td></tr>
<tr><td>Globale</td><td>Mostra Collezioni</td><td>Mostra Collezioni</td></tr>
<tr><td>Globale</td><td>RinominaCollezione</td><td>RinominaCollezione</td></tr>
<tr><td>Globale</td><td>ArrossisciTutti</td><td>SciacquareTutti</td></tr>
<tr><td>Globale</td><td>CreaProprietà</td><td>CreaUtente CreaRuolo</td></tr>
<tr><td>Globale</td><td>EliminaProprietà</td><td>EliminaCredenziale EliminaRuolo</td></tr>
<tr><td>Globale</td><td>SelezionaProprietà</td><td>SelezionaRuolo/SelezionaGrant</td></tr>
<tr><td>Globale</td><td>GestisciProprietà</td><td>Gestire il ruolo dell'utente Gestire il privilegio</td></tr>
<tr><td>Globale</td><td>CreaGruppoRisorse</td><td>CreaGruppoRisorse</td></tr>
<tr><td>Globale</td><td>Abbandona il gruppo di risorse</td><td>Gruppo di risorse da sganciare</td></tr>
<tr><td>Globale</td><td>Descrivere il gruppo di risorse</td><td>DescriviGruppoRisorse</td></tr>
<tr><td>Globale</td><td>Elenco dei gruppi di risorse</td><td>ElencoGruppi di risorse</td></tr>
<tr><td>Globale</td><td>Nodo di trasferimento</td><td>Nodo di trasferimento</td></tr>
<tr><td>Globale</td><td>TransferReplica</td><td>Replica di trasferimento</td></tr>
<tr><td>Globale</td><td>CreaDatabase</td><td>CreaDatabase</td></tr>
<tr><td>Globale</td><td>Rilasciare il database</td><td>DropDatabase</td></tr>
<tr><td>Globale</td><td>ElencoDatabase</td><td>ElencoDatabase</td></tr>
<tr><td>Globale</td><td>CreaAlias</td><td>CreaAlias</td></tr>
<tr><td>Globale</td><td>EliminaLias</td><td>LasciaLias</td></tr>
<tr><td>Globale</td><td>DescriviAlias</td><td>DescriviAlias</td></tr>
<tr><td>Globale</td><td>ElencoAlias</td><td>ElencoClienti</td></tr>
<tr><td>Utente</td><td>AggiornaUtente</td><td>AggiornaCredenziale</td></tr>
<tr><td>Utente</td><td>SelezionaUtente</td><td>SelezionaUtente</td></tr>
</tbody>
</table>
<div class="alert note">
<li>I nomi degli oggetti e dei privilegi sono sensibili alle maiuscole.</li>
<li>Per concedere tutti i privilegi a un tipo di oggetto, come Collezione, Globale, Utente, usare "*" per il nome del privilegio. </li>
<li>Il nome del privilegio "*" per l'oggetto Global non include il privilegio All, perché il privilegio All include tutti i permessi, compresi gli oggetti Collection e User.</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">Cosa fare dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Imparare ad <a href="/docs/it/v2.4.x/rbac.md">abilitare RBAC</a>.</li>
</ul>
