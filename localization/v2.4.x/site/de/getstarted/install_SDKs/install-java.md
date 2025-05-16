---
id: install-java.md
label: Install Java SDK
related_key: SDK
summary: 'Erfahren Sie, wie Sie das Java SDK von Milvus installieren.'
title: Milvus Java SDK installieren
---
<h1 id="Install-Milvus-Java-SDK" class="common-anchor-header">Milvus Java SDK installieren<button data-href="#Install-Milvus-Java-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema beschreibt, wie man das Milvus Java SDK für Milvus installiert.</p>
<p>Die aktuelle Version von Milvus unterstützt SDKs in Python, Node.js, GO und Java.</p>
<h2 id="Requirement" class="common-anchor-header">Anforderung<button data-href="#Requirement" class="anchor-icon" translate="no">
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
<li>Java (8 oder höher)</li>
<li>Apache Maven oder Gradle/Grails</li>
</ul>
<h2 id="Install-Milvus-Java-SDK" class="common-anchor-header">Milvus Java SDK installieren<button data-href="#Install-Milvus-Java-SDK" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um Milvus Java SDK zu installieren.</p>
<ul>
<li>Apache Maven</li>
</ul>
<pre><code translate="no" class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;io.milvus&lt;/groupId&gt;
    &lt;artifactId&gt;milvus-sdk-java&lt;/artifactId&gt;
    &lt;version&gt;2.4.10&lt;/version&gt;
&lt;/dependency&gt;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Gradle/Grails</li>
</ul>
<pre><code translate="no">implementation <span class="hljs-string">&#x27;io.milvus:milvus-sdk-java:2.4.10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Milvus Java SDK installiert haben, können Sie:</p>
<ul>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/v2.4.x/manage-collections.md">Sammlungen verwalten</a></li>
<li><a href="/docs/de/v2.4.x/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/v2.4.x/insert-update-delete.md">Einfügen, Upsert &amp; Löschen</a></li>
<li><a href="/docs/de/v2.4.x/single-vector-search.md">Ein-Vektor-Suche</a></li>
<li><a href="/docs/de/v2.4.x/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p>Erkunden Sie die <a href="/api-reference/java/v2.4.x/About.md">Milvus Java API-Referenz</a></p></li>
</ul>
