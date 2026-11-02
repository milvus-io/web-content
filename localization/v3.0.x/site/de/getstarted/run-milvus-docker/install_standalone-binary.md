---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Überprüfen Sie die Verfügbarkeit des RPM/DEB-Pakets und wählen Sie eine
  unterstützte Installationsmethode für Milvus Standalone aus.
title: Milvus Standalone mit RPM-/DEB-Paket installieren
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Milvus Standalone mit RPM-/DEB-Paket installieren<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite werden die verfügbaren Pakete für Milvus Standalone erläutert und Links zu Installationsanleitungen mit veröffentlichten Release-Dateien bereitgestellt.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Verfügbarkeit der Pakete prüfen<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-Versionen der Reihe 3.0.x, einschließlich <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">v3.0.3</a>, veröffentlichen Docker-Compose-Konfigurationsdateien, jedoch keine RPM- oder DEB-Pakete. Erstellen Sie für diese Versionen keine Download-URLs für RPM- oder DEB-Pakete; ein Paketdateiname in einem Download-Befehl macht diese Ressource nicht verfügbar.</p>
<p>Für andere Versionen sollten Sie den Abschnitt <strong>„Assets“</strong> auf <a href="https://github.com/milvus-io/milvus/releases">der</a> entsprechenden <a href="https://github.com/milvus-io/milvus/releases">Milvus-Release-Seite</a> überprüfen, bevor Sie sich für eine Paketinstallationsmethode entscheiden. Verwenden Sie nur ein Paket, das tatsächlich für diese Version und Ihre Systemarchitektur aufgeführt ist.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Milvus Standalone mit Docker installieren<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie für v3.0.3 eine der folgenden Installationsmethoden:</p>
<ul>
<li><a href="/docs/de/install_standalone-docker-compose.md">Führen Sie Milvus mit Docker Compose (Linux) aus</a>, um die mit v3.0.3 veröffentlichte Compose-Konfiguration zu verwenden.</li>
<li><a href="/docs/de/install_standalone-docker.md">Führen Sie Milvus in Docker (Linux) aus</a>, um das Skript für die Standalone-Installation zu verwenden. Überprüfen Sie den Image-Tag im Skript, bevor Sie es ausführen.</li>
<li><a href="/docs/de/install_standalone-windows.md">Führen Sie Milvus in Docker (Windows) aus</a>, um Docker Desktop mit dem WSL 2-Backend und Linux-Containern zu verwenden.</li>
</ul>
<p>Überprüfen Sie vor der Installation die <a href="/docs/de/prerequisite-docker.md">Hardware- und Softwareanforderungen</a>. Nachdem die Instanz läuft, folgen Sie im <a href="/docs/de/quickstart.md">Schnellstart</a> dem Pfad <strong>„Einen vorhandenen Milvus-Server verwenden“</strong> und stellen Sie eine Verbindung zu <code translate="no">http://localhost:19530</code> statt zu einem lokalen Pfad <code translate="no">.db</code> her, um Daten einzufügen und eine Suche durchzuführen.</p>
