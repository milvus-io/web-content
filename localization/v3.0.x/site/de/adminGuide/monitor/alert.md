---
id: alert.md
title: Benachrichtigung erstellen
related_key: monitor and alert.
summary: 'Erfahren Sie, wie Sie in Grafana einen Alarm für Milvus-Dienste einrichten.'
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Eine Warnmeldung für Milvus-Dienste erstellen<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Abschnitt wird der Benachrichtigungsmechanismus für Milvus-Dienste vorgestellt und erläutert, warum, wann und wie Sie Benachrichtigungen in Milvus erstellen können.</p>
<p>Durch das Erstellen von Warnmeldungen können Sie Benachrichtigungen erhalten, wenn der Wert einer bestimmten Metrik den von Ihnen vordefinierten Schwellenwert überschreitet.</p>
<p>Beispielsweise erstellen Sie eine Warnmeldung und legen 80 MB als Maximalwert für die Speicherauslastung durch Milvus-Komponenten fest. Wenn die tatsächliche Auslastung den vordefinierten Wert überschreitet, erhalten Sie Warnmeldungen, die Sie darauf hinweisen, dass die Speicherauslastung durch Milvus-Komponenten 80 MB übersteigt. Nach Erhalt des Alarms können Sie dann die Ressourcenzuweisung entsprechend und rechtzeitig anpassen, um die Verfügbarkeit des Dienstes sicherzustellen.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Szenarien für die Erstellung von Warnmeldungen<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Folgenden finden Sie einige gängige Szenarien, für die Sie eine Warnmeldung erstellen sollten.</p>
<ul>
<li>Die CPU- oder Speicherauslastung durch Milvus-Komponenten ist zu hoch.</li>
<li>Den Pods der Milvus-Komponenten geht der Speicherplatz aus.</li>
<li>Milvus-Komponenten-Pods werden zu häufig neu gestartet.</li>
</ul>
<p>Die folgenden Metriken stehen für die Konfiguration von Warnmeldungen zur Verfügung:</p>
<table>
<thead>
<tr><th>Metrik</th><th>Beschreibung</th><th>Maßeinheit</th></tr>
</thead>
<tbody>
<tr><td>CPU-Auslastung</td><td>CPU-Auslastung durch Milvus-Komponenten, die anhand der Laufzeit der CPU angegeben wird.</td><td>Sekunde</td></tr>
<tr><td>Speicher</td><td>Von Milvus-Komponenten beanspruchte Speicherressourcen.</td><td>MB</td></tr>
<tr><td>Goroutinen</td><td>Parallel ausgeführte Aktivitäten in der Programmiersprache GO.</td><td>/</td></tr>
<tr><td>OS-Threads</td><td>Threads oder „Lightweight-Prozesse“ in einem Betriebssystem.</td><td>/</td></tr>
<tr><td>Vom Prozess geöffnete Dateideskriptoren</td><td>Die aktuelle Anzahl der verwendeten Dateideskriptoren.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Warnmeldungen einrichten<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>In dieser Anleitung wird am Beispiel der Erstellung einer Warnmeldung zur Speicherauslastung von Milvus-Komponenten erläutert, wie Sie vorgehen müssen. Um andere Arten von Warnmeldungen zu erstellen, passen Sie Ihre Befehle bitte entsprechend an. Sollten während des Vorgangs Probleme auftreten, können Sie gerne im <a href="https://discuss.milvus.io/">Milvus-Forum</a> nachfragen oder eine Diskussion auf <a href="https://discord.com/invite/8uyFbECzPX">Discord</a> starten.</p>
<h3 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieses Tutorial setzt voraus, dass Sie Grafana installiert und konfiguriert haben. Falls nicht, empfehlen wir Ihnen, die <a href="/docs/de/monitor.md">Anleitung zur Überwachung</a> zu lesen.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Neue Abfrage hinzufügen<button data-href="#1-Add-a-new-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Um eine Warnmeldung für die Speicherauslastung von Milvus-Komponenten hinzuzufügen, bearbeiten Sie das Panel „Memory“. Fügen Sie anschließend eine neue Abfrage mit der folgenden Metrik hinzu: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" /> 
   <span>Alert_metric</span>
  
 </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Speichern Sie das Dashboard<button data-href="#2-Save-the-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>Speichern Sie das Dashboard und warten Sie einige Minuten, bis der Alarm angezeigt wird.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" /> 
   <span>Alert_dashboard</span>
  
 </span></p>
<p>Die Grafana-Alarmabfrage unterstützt keine Vorlagenvariablen. Daher sollten Sie eine zweite Abfrage ohne Vorlagenvariablen in den Bezeichnungen hinzufügen. Die zweite Abfrage trägt standardmäßig den Namen „A“. Sie können sie umbenennen, indem Sie auf das Dropdown-Menü klicken.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" /> 
   <span>Alert_query</span>
  
 </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Alarmbenachrichtigungen hinzufügen<button data-href="#3-Add-alert-notifications" class="anchor-icon" translate="no">
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
    </button></h3><p>Um Alarmbenachrichtigungen zu erhalten, erstellen Sie einen Kontaktpunkt. Gehen Sie in Grafana zu <strong>„Alerts &amp; IRM</strong> &gt; <strong>Alerting</strong> &gt; <strong>Notification configuration“</strong>, wählen Sie die Registerkarte <strong>„Contact points</strong> “ aus und klicken Sie auf <strong> „+ New contact point</strong>“. Wählen Sie anschließend im Abschnitt <strong>„Configure notifications</strong> “ der Alarmregel den Kontaktpunkt aus oder leiten Sie die Benachrichtigungen über Benachrichtigungsrichtlinien weiter.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" /> 
   <span>Alert_notification</span>
  
 </span></p>
<p>Wenn die Warnmeldung erfolgreich erstellt und ausgelöst wurde, erhalten Sie die Benachrichtigung wie im folgenden Screenshot gezeigt.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" /> 
   <span>Benachrichtigungsmeldung</span>
  
 </span></p>
<p>Um eine Warnmeldung zu löschen, gehen Sie zum Bereich „Warnmeldungen“ und klicken Sie auf die Schaltfläche „Löschen“.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" /> 
   <span>Alarm_löschen</span>
  
 </span></p>
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
<li>Wenn Sie mit der Überwachung von Diensten für Milvus beginnen möchten:
<ul>
<li>Lesen Sie den <a href="/docs/de/monitor.md">Überwachungsleitfaden</a></li>
<li>Erfahren Sie, wie Sie <a href="/docs/de/visualize.md">Überwachungskennzahlen visualisieren</a> können</li>
</ul></li>
<li>Wenn Sie Warnmeldungen zur Speicherauslastung durch Milvus-Komponenten erstellt haben:
<ul>
<li>Erfahren Sie, wie Sie <a href="/docs/de/allocate.md#standalone">Ressourcen zuweisen</a></li>
</ul></li>
<li>Wenn Sie Informationen zur Skalierung eines Milvus-Clusters suchen:
<ul>
<li>Erfahren Sie, wie Sie <a href="/docs/de/scaleout.md">einen Milvus-Cluster skalieren</a></li>
</ul></li>
</ul>
