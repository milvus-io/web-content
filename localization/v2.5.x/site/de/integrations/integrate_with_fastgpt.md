---
id: integrate_with_fastgpt.md
summary: >-
  Dieses Tutorial zeigt Ihnen, wie Sie Ihre eigene exklusive FastGPT-Anwendung
  mit [Milvus](https://milvus.io/) schnell einsetzen können.
title: Einsatz von FastGPT mit Milvus
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">Einsatz von FastGPT mit Milvus<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a> ist ein wissensbasiertes Frage- und Antwortsystem, das auf dem großen LLM-Sprachmodell aufbaut und gebrauchsfertige Funktionen für die Datenverarbeitung und den Modellaufruf bietet. Darüber hinaus ermöglicht es die Orchestrierung von Arbeitsabläufen durch Flow-Visualisierung, wodurch komplexe Frage- und Antwortszenarien erleichtert werden. Dieses Tutorial zeigt Ihnen, wie Sie mit <a href="https://milvus.io/">Milvus</a> schnell Ihre eigene exklusive FastGPT-Anwendung bereitstellen können.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">docker-compose.yml herunterladen<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>Stellen Sie sicher, dass Sie <a href="https://docs.docker.com/compose/">Docker Compose</a> bereits installiert haben.<br>
Führen Sie den unten stehenden Befehl aus, um die Datei docker-compose.yml herunterzuladen.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">mkdir</span> fastgpt
$ <span class="hljs-built_in">cd</span> fastgpt
$ curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json

<span class="hljs-comment"># milvus version</span>
$ curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml
<span class="hljs-comment"># zilliz version</span>
<span class="hljs-comment"># curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Wenn Sie die Zilliz-Version verwenden, passen Sie die Parameter <code translate="no">MILVUS_ADDRESS</code> und <code translate="no">MILVUS_TOKEN</code> link in der Datei docker-compose.yml an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in der <a href="https://zilliz.com/cloud">Zilliz-Cloud</a> entsprechen.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">Starten Sie den Container<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie die Datei im gleichen Verzeichnis wie docker-compose.yml aus. Stellen Sie sicher, dass die Version von docker-compose idealerweise über 2.17 liegt, da einige Automatisierungsbefehle sonst nicht funktionieren.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Launch the container</span>
$ docker compose up -d
<span class="hljs-comment"># Wait for 10s, OneAPI typically needs to restart a few times to initially connect to Mysql</span>
$ sleep <span class="hljs-number">10</span>
<span class="hljs-comment"># Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display &#x27;channel not found&#x27; if not restarted, this can be temporarily resolved by manually restarting once, while waiting for the author&#x27;s fix)</span>
$ docker restart oneapi
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">Zugriff auf OneAPI zum Hinzufügen von Modellen<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>Auf OneAPI kann unter <code translate="no">ip:3001</code> zugegriffen werden. Der Standardbenutzername ist root und das Passwort lautet 123456. Sie können das Passwort nach dem Einloggen ändern.<br>
Klicken Sie am Beispiel des OpenAI-Modells auf die Registerkarte &quot;Channel&quot; und wählen Sie unter &quot;Models&quot; Ihr Chat-Modell und Ihr Einbettungsmodell aus.<br>
Geben Sie Ihren <a href="https://platform.openai.com/docs/quickstart">OpenAI-API-Schlüssel</a> in den Abschnitt "Secrets" ein.<br>
Für die Verwendung von Modellen, die über OpenAI hinausgehen, und für weitere Informationen, lesen Sie bitte <a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">Token einstellen<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>Klicken Sie auf den Reiter "Token". Standardmäßig ist ein Token <code translate="no">Initial Root Token</code> vorhanden. Sie können auch ein neues Token erstellen und eine eigene Quote festlegen.<br>
Klicken Sie auf "Kopieren" für Ihr Token und stellen Sie sicher, dass der Wert dieses Tokens mit dem in der Datei docker-compose.yml festgelegten Wert <code translate="no">CHAT_API_KEY</code> übereinstimmt.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">Zugriff auf FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Derzeit kann auf FastGPT direkt unter <code translate="no">ip:3000</code> zugegriffen werden (bitte beachten Sie die Firewall). Der Login-Benutzername ist root, das Passwort ist in der Umgebungsvariablen docker-compose.yml auf <code translate="no">DEFAULT_ROOT_PSW</code> gesetzt. Sollten Sie Zugriff auf Domänennamen benötigen, müssen Sie <a href="https://nginx.org/en/">Nginx</a> selbst installieren und konfigurieren.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">Beenden Sie den Container<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um den Container zu stoppen.</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
