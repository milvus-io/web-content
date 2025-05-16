---
id: alert.md
title: Einen Alarm erstellen
related_key: monitor and alert.
summary: 'Erfahren Sie, wie Sie einen Alarm für Milvus-Dienste in Grafana erstellen.'
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Eine Warnung für Milvus-Dienste erstellen<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird der Alert-Mechanismus für Milvus-Dienste vorgestellt und erklärt, warum, wann und wie man Alerts in Milvus erstellt.</p>
<p>Durch das Erstellen von Alerts können Sie Benachrichtigungen erhalten, wenn der Wert einer bestimmten Metrik den von Ihnen vordefinierten Schwellenwert überschreitet.</p>
<p>Beispiel: Sie erstellen einen Alert und legen 80 MB als Höchstwert für die Speichernutzung durch Milvus-Komponenten fest. Wenn die tatsächliche Nutzung den vordefinierten Wert übersteigt, erhalten Sie Warnungen, die Sie daran erinnern, dass die Speichernutzung durch die Milvus-Komponente 80 MB übersteigt. Nach der Warnung können Sie die Ressourcenzuweisung entsprechend und rechtzeitig anpassen, um die Verfügbarkeit des Dienstes sicherzustellen.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Szenarien für die Erstellung von Alarmen<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachfolgend finden Sie einige häufige Szenarien, für die Sie eine Warnung erstellen müssen.</p>
<ul>
<li>Die CPU- oder Speichernutzung durch Milvus-Komponenten ist zu hoch.</li>
<li>Der Festplattenspeicher der Milvus-Komponenten-Pods wird knapp.</li>
<li>Milvus-Komponenten-Pods werden zu häufig neu gestartet.</li>
</ul>
<p>Die folgenden Metriken sind für die Alarmierungskonfiguration verfügbar:</p>
<table>
<thead>
<tr><th>Metrik</th><th>Beschreibung</th><th>Maßeinheit</th></tr>
</thead>
<tbody>
<tr><td>CPU-Auslastung</td><td>CPU-Nutzung durch Milvus-Komponenten, die durch die Laufzeit der CPU angezeigt wird.</td><td>Sekunde</td></tr>
<tr><td>Speicher</td><td>Von den Milvus-Komponenten verbrauchte Speicherressourcen.</td><td>MB</td></tr>
<tr><td>Goroutinen</td><td>Gleichzeitig ausgeführte Aktivitäten in der Sprache GO.</td><td>/</td></tr>
<tr><td>OS-Threads</td><td>Threads, oder leichtgewichtige Prozesse in einem Betriebssystem.</td><td>/</td></tr>
<tr><td>Prozess Geöffnete Fds</td><td>Die aktuelle Anzahl der verwendeten Dateideskriptoren.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Alarme einrichten<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>In dieser Anleitung wird als Beispiel die Erstellung eines Alerts für die Speichernutzung von Milvus-Komponenten verwendet. Um andere Arten von Alarmen zu erstellen, passen Sie bitte Ihre Befehle entsprechend an. Wenn Sie während des Prozesses auf Probleme stoßen, fragen Sie bitte in den <a href="https://github.com/milvus-io/milvus/discussions">Github-Diskussionen</a> oder starten Sie einen Thread auf <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Voraussetzungen</h3><p>Dieses Tutorial geht davon aus, dass Sie Grafana installiert und konfiguriert haben. Falls nicht, empfehlen wir die Lektüre des <a href="/docs/de/v2.4.x/monitor.md">Monitoring-Guides</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Fügen Sie eine neue Abfrage hinzu</h3><p>Um einen Alarm für die Speichernutzung von Milvus-Komponenten hinzuzufügen, bearbeiten Sie das Panel Speicher. Fügen Sie dann eine neue Abfrage mit der Metrik hinzu: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Speichern Sie das Dashboard</h3><p>Speichern Sie das Dashboard und warten Sie ein paar Minuten, um den Alarm zu sehen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Alert_dashboard</span> </span></p>
<p>Die Grafana Alert-Abfrage unterstützt keine Template-Variablen. Daher sollten Sie eine zweite Abfrage ohne Template-Variablen in den Labels hinzufügen. Die zweite Abfrage wird standardmäßig als "A" benannt. Sie können sie umbenennen, indem Sie auf das Dropdown klicken.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Warnung_Abfrage</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Hinzufügen von Warnmeldungen</h3><p>Um Warnmeldungen zu erhalten, fügen Sie einen &quot;Benachrichtigungskanal&quot; hinzu. Geben Sie dann den Kanal im Feld &quot;Senden an&quot; an.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>Warnung_Benachrichtigung</span> </span></p>
<p>Wenn die Warnmeldung erfolgreich erstellt und ausgelöst wurde, erhalten Sie eine Benachrichtigung wie in der folgenden Abbildung dargestellt.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>Benachrichtigung_Nachricht</span> </span></p>
<p>Um eine Benachrichtigung zu löschen, gehen Sie zum Bereich "Benachrichtigung" und klicken Sie auf die Schaltfläche "Löschen".</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>Warnung_löschen</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Wenn Sie die Überwachung von Diensten für Milvus starten müssen:<ul>
<li>Lesen Sie die <a href="/docs/de/v2.4.x/monitor.md">Anleitung zur Überwachung</a></li>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/visualize.md">Überwachungsmetriken visualisieren</a> können</li>
</ul></li>
<li>Wenn Sie Alarme für die Speichernutzung durch Milvus-Komponenten erstellt haben:<ul>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/allocate.md#standalone">Ressourcen zuweisen</a> können</li>
</ul></li>
<li>Wenn Sie Informationen darüber suchen, wie Sie einen Milvus-Cluster skalieren können:<ul>
<li>Lernen Sie, wie man <a href="/docs/de/v2.4.x/scaleout.md">einen Milvus-Cluster skaliert</a></li>
</ul></li>
</ul>
