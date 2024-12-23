---
id: rbac.md
related_key: enable RBAC
summary: >-
  RBAC (Role-Based Access Control) è un metodo di controllo degli accessi basato
  sui ruoli. Con RBAC è possibile controllare con precisione le operazioni che
  gli utenti possono eseguire a livello di raccolta, database e istanza,
  migliorando la sicurezza dei dati. 
title: RBAC spiegato
---
<h1 id="RBAC-Explained​" class="common-anchor-header">RBAC spiegato<button data-href="#RBAC-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control) è un metodo di controllo degli accessi basato sui ruoli. Con RBAC è possibile controllare con precisione le operazioni che gli utenti possono eseguire a livello di raccolta, database e istanza, migliorando la sicurezza dei dati. </p>
<p>A differenza dei modelli tradizionali di controllo dell'accesso degli utenti, RBAC introduce il concetto di <strong>ruoli</strong>. Nel modello RBAC, si assegnano privilegi ai ruoli e poi si assegnano tali ruoli agli utenti. Poi gli utenti possono ottenere i privilegi. </p>
<p>Il modello RBAC può migliorare l'efficienza della gestione del controllo degli accessi. Ad esempio, se più utenti richiedono lo stesso insieme di privilegi, non è necessario impostare manualmente i privilegi per ciascun utente. Si può invece creare un ruolo e assegnarlo agli utenti. Se si desidera modificare i privilegi di questi utenti, è sufficiente modificare i privilegi del ruolo e la modifica verrà applicata a tutti gli utenti con questo ruolo.</p>
<h2 id="RBAC-key-concepts​" class="common-anchor-header">Concetti chiave di RBAC<button data-href="#RBAC-key-concepts​" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/users_roles_privileges.png" alt="Users, roles, and privileges" class="doc-image" id="users,-roles,-and-privileges" />
   </span> <span class="img-wrapper"> <span>Utenti, ruoli e privilegi</span> </span></p>
<p>Il modello RBAC comprende quattro componenti principali.</p>
<ul>
<li><p>**Risorsa: **L'entità risorsa a cui si può accedere. In Milvus esistono tre livelli di risorse: istanza, database e collezione.</p></li>
<li><p>**Privilegio: **Il permesso di eseguire determinate operazioni sulle risorse Milvus (ad esempio, creare collezioni, inserire dati, ecc.). </p></li>
<li><p>**Gruppo di privilegi: **Un gruppo di privilegi multipli.</p></li>
<li><p>**Ruolo: **Un ruolo è composto da due parti: privilegi e risorse. I privilegi definiscono il tipo di operazioni che un ruolo può eseguire, mentre le risorse definiscono le risorse di destinazione su cui le operazioni possono essere eseguite. Ad esempio, il ruolo di amministratore di database può eseguire operazioni di lettura, scrittura e gestione su determinati database.</p></li>
<li><p>**Utente: **Un utente è una persona che utilizza Milvus. Ogni utente ha un ID unico e gli viene assegnato un ruolo o più ruoli. </p></li>
</ul>
<h2 id="Procedures​" class="common-anchor-header">Le procedure<button data-href="#Procedures​" class="anchor-icon" translate="no">
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
    </button></h2><p>Per ottenere il controllo degli accessi tramite RBAC, è necessario seguire i passaggi seguenti.</p>
<ol>
<li><p><a href="/docs/it/users_and_roles.md#Create-a-user">Creare un utente</a>: Oltre all'utente predefinito <code translate="no">root</code> in Milvus, è possibile creare nuovi utenti e impostare password per proteggere la sicurezza dei dati.</p></li>
<li><p><a href="/docs/it/users_and_roles.md#Create-a-role">Creare un ruolo</a>: È possibile creare ruoli personalizzati in base alle proprie esigenze. Le capacità specifiche di un ruolo sono determinate dai suoi privilegi.</p></li>
<li><p><a href="/docs/it/privilege_group.md">Creare un gruppo di privilegi</a>: Combinare più privilegi in un gruppo di privilegi per semplificare il processo di concessione dei privilegi a un ruolo.</p></li>
<li><p><a href="/docs/it/grant_privileges.md">Assegnare privilegi o gruppi di privilegi a un ruolo</a>: Definire le capacità di un ruolo concedendo privilegi o gruppi di privilegi a questo ruolo. </p></li>
<li><p><a href="/docs/it/grant_roles.md">Assegnare ruoli agli utenti</a>: Assegnare ruoli con determinati privilegi agli utenti, in modo che questi ultimi possano avere i privilegi di un ruolo. Un singolo ruolo può essere assegnato a più utenti.</p></li>
</ol>
