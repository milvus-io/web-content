---
id: rbac.md
title: Spiegazione dell'RBAC
summary: >-
  Il modello RBAC (Role-Based Access Control, controllo degli accessi basato sui
  ruoli) regola le operazioni che gli utenti possono eseguire a livello di
  raccolta, database e istanza in base ai ruoli.
---
<h1 id="RBAC-Explained" class="common-anchor-header">Spiegazione dell'RBAC<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>L'RBAC (Role-Based Access Control, controllo degli accessi basato sui ruoli) è un metodo di controllo degli accessi basato sui ruoli. Con l'RBAC è possibile controllare con precisione le operazioni che gli utenti possono eseguire a livello di raccolta, database e istanza, migliorando la sicurezza dei dati.</p>
<p>A differenza dei modelli tradizionali di controllo degli accessi degli utenti, l’RBAC introduce il concetto di <strong>ruolo</strong>. Nel modello RBAC, si  concedono privilegi ai ruoli e poi si assegnano tali ruoli agli utenti. In questo modo gli utenti possono ottenere i privilegi.</p>
<p>Il modello RBAC può migliorare l’efficienza della gestione del controllo degli accessi. Ad esempio, se più utenti necessitano dello stesso insieme di privilegi, non è necessario impostare manualmente i privilegi per ciascun utente. È invece possibile creare un ruolo e assegnarlo agli utenti. Se si desidera modificare i privilegi di questi utenti, è sufficiente modificare i privilegi del ruolo e la modifica verrà applicata a tutti gli utenti con quel ruolo.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">Concetti chiave dell’RBAC<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" /> 
   <span>Utenti Ruoli Privilegi</span>
  
 </span></p>
<p>Il modello RBAC si compone di cinque elementi principali.</p>
<ul>
<li><p><strong>Risorsa:</strong> l’entità a cui è possibile accedere. In Milvus esistono tre livelli di risorse: istanza, database e raccolta.</p></li>
<li><p><strong>Privilegio:</strong> l’autorizzazione a eseguire determinate operazioni sulle risorse di Milvus (ad es. creare collezioni, inserire dati, ecc.).</p></li>
<li><p><strong>Gruppo di privilegi:</strong> un insieme di più privilegi.</p></li>
<li><p><strong>Ruolo:</strong> un ruolo è costituito da due parti: privilegi e risorse. I privilegi definiscono il tipo di operazioni che un ruolo può eseguire, mentre le risorse definiscono le risorse di destinazione su cui è possibile eseguire tali operazioni. Ad esempio, il ruolo di amministratore del database può eseguire operazioni di lettura, scrittura e gestione su determinati database.</p></li>
<li><p><strong>Utente:</strong> un utente è una persona che utilizza Milvus. Ogni utente possiede un ID univoco e gli viene assegnato uno o più ruoli.</p></li>
</ul>
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
    </button></h2><p>Per implementare il controllo degli accessi tramite RBAC, è necessario seguire i passaggi riportati di seguito:</p>
<ol>
<li><p><strong><a href="/docs/it/users_and_roles.md#Create-a-user">Creare un utente</a></strong>: oltre all’utente predefinito <code translate="no">root</code> in Milvus, è possibile creare nuovi utenti e impostare password per garantire la sicurezza dei dati.</p></li>
<li><p><strong><a href="/docs/it/users_and_roles.md#Create-a-role">Creare un ruolo</a></strong>: è possibile creare ruoli personalizzati in base alle proprie esigenze. Le funzionalità specifiche di un ruolo sono determinate dai suoi privilegi.</p></li>
<li><p><strong><a href="/docs/it/privilege_group.md">Creare un gruppo di privilegi</a></strong>: combinare più privilegi in un unico gruppo di privilegi per semplificare il processo di assegnazione dei privilegi a un ruolo.</p></li>
<li><p><strong><a href="/docs/it/grant_privileges.md">Assegnare privilegi o gruppi di privilegi a un ruolo</a></strong>: definire le funzionalità di un ruolo assegnandogli privilegi o gruppi di privilegi.</p></li>
<li><p><strong><a href="/docs/it/grant_roles.md">Assegnare ruoli agli utenti</a></strong>: assegnare ruoli con determinati privilegi agli utenti in modo che questi possano disporre dei privilegi di un ruolo. Un singolo ruolo può essere assegnato a più utenti.</p></li>
</ol>
