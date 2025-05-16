---
id: use_milvus_in_anythingllm.md
summary: >-
  Questa guida vi guiderà nella configurazione di Milvus come database
  vettoriale in AnythingLLM, consentendovi di incorporare, archiviare e cercare
  i vostri documenti per un recupero intelligente e una chat.
title: Utilizzare Milvus in AnythingLLM
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">Utilizzare Milvus in AnythingLLM<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a> è una potente applicazione desktop AI all-in-one, incentrata sulla privacy, che supporta diversi LLM, tipi di documenti e database vettoriali. Consente di creare un assistente privato, simile a ChatGPT, che può essere eseguito localmente o ospitato in remoto, permettendo di chattare in modo intelligente con i documenti forniti.</p>
<p>Questa guida vi guiderà nella configurazione di Milvus come database vettoriale in AnythingLLM, consentendovi di incorporare, archiviare e cercare i vostri documenti per un recupero intelligente e una chat.</p>
<blockquote>
<p>Questa guida si basa sulla documentazione ufficiale di AnythingLLM e sulle fasi di utilizzo reali. Se l'interfaccia utente o i passaggi cambiano, fate riferimento alla documentazione ufficiale più recente e sentitevi liberi di suggerire miglioramenti.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. Prerequisiti<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs/install-overview.md">Milvus</a> installato localmente o un account <a href="https://zilliz.com/cloud">Zilliz Cloud</a> </li>
<li><a href="https://anythingllm.com/desktop">TuttoLLM Desktop</a> installato</li>
<li>Documenti o fonti di dati pronti per il caricamento e l'incorporazione (PDF, Word, CSV, pagine web, ecc.)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. Configurare Milvus come database vettoriale<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
<li>Aprire AnythingLLM e fare clic sull'icona <strong>delle impostazioni</strong> nell'angolo in basso a sinistra.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>Aprire le impostazioni</span> </span></li>
</ol>
<ol start="2">
<li><p>Nel menu di sinistra, selezionare <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>Selezionare Database vettoriale</span> </span></p></li>
<li><p>Nel menu a tendina Provider del database vettoriale, selezionare <strong>Milvus</strong> (o Zilliz Cloud).<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Scegliere Milvus</span> </span></p></li>
<li><p>Inserire i dettagli della connessione a Milvus (per Milvus locale). Ecco un esempio:</p>
<ul>
<li><strong>Indirizzo DB Milvus</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus Nome utente</strong>: <code translate="no">root</code></li>
<li><strong>Milvus Password</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Connessione Milvus</span> </span></li>
</ul>
<blockquote>
<p>Se si utilizza Zilliz Cloud, inserire invece il Cluster Endpoint e il Token API:</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Connessione Zilliz Cloud</span> </span></p></li>
<li><p>Fare clic su <strong>Salva modifiche</strong> per applicare le impostazioni.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. Creare un'area di lavoro e caricare i documenti<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
<li><p>Inserite il vostro spazio di lavoro e fate clic sull'icona di <strong>caricamento</strong> per aprire la finestra di dialogo di caricamento dei documenti.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>Aprire la finestra di dialogo di caricamento</span> </span></p></li>
<li><p>È possibile caricare un'ampia gamma di fonti di dati:</p>
<ul>
<li><strong>File locali</strong>: PDF, Word, CSV, TXT, file audio, ecc.</li>
<li><strong>Pagine web</strong>: Incolla un URL e recupera direttamente il contenuto del sito web.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>Caricare i documenti</span> </span></p></li>
<li><p>Dopo il caricamento o l'acquisizione, fare clic su <strong>Sposta nell'area di lavoro per</strong> spostare il documento o i dati nell'area di lavoro corrente.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>Sposta nell'area di lavoro</span> </span></p></li>
<li><p>Selezionare il documento o i dati e fare clic su <strong>Salva e incorpora</strong>. AnythingLLM eseguirà automaticamente il chunk, l'embedding e l'archiviazione dei contenuti in Milvus.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>Salva e incorpora</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Chattare e recuperare le risposte da Milvus<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
<li>Tornare all'interfaccia di chat dell'area di lavoro e porre domande. AnythingLLM cercherà i contenuti pertinenti nel database dei vettori di Milvus e utilizzerà LLM per generare le risposte.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>Chat con i documenti</span> </span></li>
</ol>
<hr>
