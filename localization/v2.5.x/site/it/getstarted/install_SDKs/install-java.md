---
id: install-java.md
label: Install Java SDK
related_key: SDK
summary: Scoprite come installare l'SDK Java di Milvus.
title: Installare l'SDK Milvus Java
---

<h1 id="Install-Milvus-Java-SDK" class="common-anchor-header">Installare l'SDK Milvus Java<button data-href="#Install-Milvus-Java-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come installare l'SDK Milvus Java per Milvus.</p>
<p>La versione attuale di Milvus supporta gli SDK in Python, Node.js, GO e Java.</p>
<h2 id="Requirement" class="common-anchor-header">Requisiti<button data-href="#Requirement" class="anchor-icon" translate="no">
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
<li>Java (8 o successivo)</li>
<li>Apache Maven o Gradle/Grails</li>
</ul>
<h2 id="Install-Milvus-Java-SDK" class="common-anchor-header">Installare l'SDK Milvus per Java<button data-href="#Install-Milvus-Java-SDK" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguire il seguente comando per installare Milvus Java SDK.</p>
<ul>
<li>Apache Maven</li>
</ul>
<pre><code translate="no" class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>io.milvus<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>milvus-sdk-java<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.5.10<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Gradle/Grails</li>
</ul>
<pre><code translate="no"><span class="hljs-attribute">implementation</span> <span class="hljs-string">&#x27;io.milvus:milvus-sdk-java:2.5.10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver installato Milvus Java SDK, è possibile:</p>
<ul>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/v2.5.x/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/v2.5.x/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/v2.5.x/insert-update-delete.md">Inserire, inserire ed eliminare</a></li>
<li><a href="/docs/it/v2.5.x/single-vector-search.md">Ricerca a vettore singolo</a></li>
<li><a href="/docs/it/v2.5.x/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p>Esplora le <a href="/api-reference/java/v2.4.x/About.md">API Java di Milvus</a></p></li>
</ul>
