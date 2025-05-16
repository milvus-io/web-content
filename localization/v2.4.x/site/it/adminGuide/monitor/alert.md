---
id: alert.md
title: Creare un avviso
related_key: monitor and alert.
summary: Scoprite come creare un avviso per i servizi Milvus in Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Creare un avviso per i servizi Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce il meccanismo degli avvisi per i servizi Milvus e spiega perché, quando e come creare avvisi in Milvus.</p>
<p>La creazione di avvisi consente di ricevere notifiche quando il valore di una metrica specifica supera la soglia predefinita.</p>
<p>Ad esempio, si crea un avviso e si imposta 80 MB come valore massimo per l'utilizzo della memoria da parte dei componenti Milvus. Se l'utilizzo effettivo supera il valore predefinito, riceverete un avviso che vi ricorderà che l'utilizzo della memoria del componente Milvus ha superato gli 80 MB. In seguito all'avviso, è possibile regolare l'allocazione delle risorse di conseguenza e tempestivamente per garantire la disponibilità del servizio.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Scenari per la creazione di avvisi<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Di seguito sono riportati alcuni scenari comuni per i quali è necessario creare un avviso.</p>
<ul>
<li>L'utilizzo della CPU o della memoria da parte dei componenti Milvus è troppo elevato.</li>
<li>I pod dei componenti Milvus hanno poco spazio su disco.</li>
<li>I pod dei componenti Milvus si riavviano troppo frequentemente.</li>
</ul>
<p>Per la configurazione degli avvisi sono disponibili le seguenti metriche:</p>
<table>
<thead>
<tr><th>Metrica</th><th>Descrizione</th><th>Unità di misura</th></tr>
</thead>
<tbody>
<tr><td>Utilizzo della CPU</td><td>Utilizzo della CPU da parte dei componenti Milvus, indicato dal tempo di esecuzione della CPU.</td><td>Secondi</td></tr>
<tr><td>Memoria</td><td>Risorse di memoria consumate dai componenti Milvus.</td><td>MB</td></tr>
<tr><td>Gorotoine</td><td>Attività di esecuzione concorrente in linguaggio GO.</td><td>/</td></tr>
<tr><td>Thread del sistema operativo</td><td>Thread o processi leggeri in un sistema operativo.</td><td>/</td></tr>
<tr><td>Processo aperto Fds</td><td>Il numero attuale di descrittori di file utilizzati.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Impostare gli avvisi<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa guida prende come esempio la creazione di un avviso per l'utilizzo della memoria dei componenti Milvus. Per creare altri tipi di avvisi, si prega di adattare i comandi di conseguenza. Se si riscontrano problemi durante il processo, non esitate a chiedere nelle <a href="https://github.com/milvus-io/milvus/discussions">discussioni di Github</a> o ad avviare un thread su <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prerequisiti</h3><p>Questo tutorial presuppone che Grafana sia installato e configurato. In caso contrario, si consiglia di leggere la <a href="/docs/it/v2.4.x/monitor.md">guida</a> al <a href="/docs/it/v2.4.x/monitor.md">monitoraggio</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Aggiungere una nuova query</h3><p>Per aggiungere un avviso sull'utilizzo della memoria dei componenti Milvus, modificare il pannello Memoria. Quindi, aggiungere una nuova query con la metrica: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Metrica_avviso</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Salvare il dashboard</h3><p>Salvare la dashboard e attendere qualche minuto per visualizzare l'avviso.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Cruscotto_avviso</span> </span></p>
<p>La query di avviso di Grafana non supporta le variabili template. Pertanto, è necessario aggiungere una seconda query senza variabili template nelle etichette. La seconda query è denominata "A" per impostazione predefinita. È possibile rinominarla facendo clic sul menu a tendina.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Query_di_avviso</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Aggiungere le notifiche di avviso</h3><p>Per ricevere le notifiche di avviso, aggiungere un &quot;canale di notifica&quot;. Quindi, specificare il canale nel campo &quot;Invia a&quot;.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>Notifica_avviso</span> </span></p>
<p>Se l'avviso viene creato e attivato con successo, si riceverà una notifica come mostrato nella schermata seguente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>Messaggio_di_notifica</span> </span></p>
<p>Per eliminare un avviso, accedere al pannello "Avviso" e fare clic sul pulsante Elimina.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>Elimina_avviso</span> </span></p>
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
<li>Se avete bisogno di avviare i servizi di monitoraggio per Milvus:<ul>
<li>Leggete la <a href="/docs/it/v2.4.x/monitor.md">guida</a> al <a href="/docs/it/v2.4.x/monitor.md">monitoraggio</a></li>
<li>Imparare a <a href="/docs/it/v2.4.x/visualize.md">visualizzare le metriche di monitoraggio</a></li>
</ul></li>
<li>Se avete creato degli avvisi per l'utilizzo della memoria da parte dei componenti Milvus:<ul>
<li>Imparate ad <a href="/docs/it/v2.4.x/allocate.md#standalone">allocare le risorse</a></li>
</ul></li>
<li>Se cercate informazioni su come scalare un cluster Milvus:<ul>
<li>Imparare a <a href="/docs/it/v2.4.x/scaleout.md">scalare un cluster Milvus</a></li>
</ul></li>
</ul>
