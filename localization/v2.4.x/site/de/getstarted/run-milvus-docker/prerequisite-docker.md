---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: >-
  Lernen Sie die notwendigen Vorbereitungen für die Installation von Milvus mit
  Docker Compose.
title: Anforderungen für die Installation von Milvus mit Docker Compose
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">Anforderungen für die Installation von Milvus mit Docker Compose<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Prüfen Sie vor der Installation einer Milvus-Instanz, ob Ihre Hardware und Software den Anforderungen entspricht.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Hardware-Anforderungen<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Komponente</th><th>Anforderung</th><th>Empfehlung</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>Intel 2nd Gen Core CPU oder höher</li><li>Apple Silizium</li></ul></td><td><ul><li>Eigenständig: 4 Kerne oder mehr</li><li>Cluster: 8 Kerne oder mehr</li></ul></td><td></td></tr>
<tr><td>CPU-Befehlssatz</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Die Vektorähnlichkeitssuche und die Indexerstellung in Milvus erfordern die Unterstützung von SIMD-Erweiterungen (Single Instruction, Multiple Data) durch die CPU. Stellen Sie sicher, dass die CPU mindestens eine der aufgeführten SIMD-Erweiterungen unterstützt. Siehe <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPUs mit AVX</a> für weitere Informationen.</td></tr>
<tr><td>RAM</td><td><ul><li>Eigenständig: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Eigenständig: 16G</li><li>Cluster: 128G</li></ul></td><td>Die Größe des Arbeitsspeichers hängt von der Datenmenge ab.</td></tr>
<tr><td>Festplattenlaufwerk</td><td>SATA 3.0 SSD oder höher</td><td>NVMe SSD oder höher</td><td>Die Größe des Festplattenlaufwerks hängt vom Datenvolumen ab.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Software-Anforderungen<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Betriebssytem</th><th>Software</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 oder höher</td><td>Docker-Schreibtisch</td><td>Stellen Sie die virtuelle Maschine (VM) von Docker so ein, dass sie mindestens 2 virtuelle CPUs (vCPUs) und 8 GB Anfangsspeicher verwendet. Andernfalls kann die Installation fehlschlagen. <br/>Weitere Informationen finden Sie unter <a href="https://docs.docker.com/desktop/mac/install/">Installieren von Docker Desktop auf Mac</a>.</td></tr>
<tr><td>Linux-Plattformen</td><td><ul><li>Docker 19.03 oder höher</li><li>Docker Compose 1.25.1 oder höher</li></ul></td><td>Weitere Informationen finden Sie unter <a href="https://docs.docker.com/engine/install/">Docker-Engine installieren</a> und <a href="https://docs.docker.com/compose/install/">Docker Compose installieren</a>.</td></tr>
<tr><td>Windows mit aktivierter WSL 2</td><td>Docker-Arbeitsplatz</td><td>Wir empfehlen, Quellcode und andere Daten, die in Linux-Containern gebunden sind, im Linux-Dateisystem statt im Windows-Dateisystem zu speichern.<br/>Weitere Informationen finden Sie unter <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Installieren von Docker Desktop unter Windows mit WSL 2-Backend</a>.</td></tr>
</tbody>
</table>
<p>Die folgenden Abhängigkeiten werden automatisch beschafft und konfiguriert, wenn Milvus Standalone mit dem Docker-Skript oder der Docker Compose-Konfiguration installiert wird:</p>
<table>
<thead>
<tr><th>Software</th><th>Version</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Siehe <a href="#Additional-disk-requirements">zusätzliche Festplattenanforderungen</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Zusätzliche Anforderungen an die Festplatte</h3><p>Die Festplattenleistung ist entscheidend für etcd. Es wird dringend empfohlen, dass Sie lokale NVMe-SSDs verwenden. Langsame Festplattenreaktionen können zu häufigen Clusterwahlen führen, die schließlich den etcd-Dienst beeinträchtigen.</p>
<p>Um zu testen, ob Ihre Festplatte geeignet ist, verwenden Sie <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealerweise sollte Ihre Festplatte mehr als 500 IOPS und eine fsync-Latenz von weniger als 10 ms (99. Perzentil) erreichen. Detaillierte Anforderungen finden Sie in den etcd <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Docs</a>.</p>
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
    </button></h2><p>Wenn Ihre Hardware und Software die oben genannten Anforderungen erfüllen, können Sie</p>
<ul>
<li><a href="/docs/de/v2.4.x/install_standalone-docker.md">Milvus in Docker ausführen</a></li>
<li><a href="/docs/de/v2.4.x/install_standalone-docker-compose.md">Milvus mit Docker Compose ausführen</a></li>
</ul>
