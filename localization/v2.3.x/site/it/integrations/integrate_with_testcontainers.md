---
id: integrate_with_testcontainers.md
summary: This page discusses vector database integration with Testcontainers.
title: Testcontainers
---
<h1 id="Testcontainers" class="common-anchor-header">Testcontainers<button data-href="#Testcontainers" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://testcontainers.com/">Testcontainers</a> is a library that helps you to run your tests against real dependencies.</p>
<h2 id="Setup" class="common-anchor-header">Setup<button data-href="#Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>Import the dependency:</p>
<h3 id="Java-Maven" class="common-anchor-header">Java (Maven)</h3><pre><code translate="no" class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;org.testcontainers&lt;/groupId&gt;
    &lt;artifactId&gt;milvus&lt;/artifactId&gt;
    &lt;version&gt;1.19.6&lt;/version&gt;
    &lt;scope&gt;<span class="hljs-built_in">test</span>&lt;/scope&gt;
&lt;/dependency&gt;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Java-Gradle" class="common-anchor-header">Java (Gradle)</h3><pre><code translate="no">testImplementation <span class="hljs-string">&#x27;org.testcontainers:milvus:1.19.6&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Go" class="common-anchor-header">Go</h3><pre><code translate="no"><span class="hljs-keyword">go</span> get github.com/testcontainers/testcontainers-<span class="hljs-keyword">go</span>/modules/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="NET" class="common-anchor-header">.NET</h3><pre><code translate="no">dotnet add <span class="hljs-keyword">package</span> Testcontainers.Milvus --version <span class="hljs-number">3.8</span><span class="hljs-number">.0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage" class="common-anchor-header">Usage<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>See <a href="https://testcontainers.com/modules/milvus/">Milvus Module</a></p>
<h2 id="Further-reading" class="common-anchor-header">Further reading<button data-href="#Further-reading" class="anchor-icon" translate="no">
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
<li>https://www.testcontainers.com (Java, .NET, Go, Python, Ruby, Node.js)</li>
<li>https://www.testcontainers.org (Java)</li>
<li>https://www.testcontainers.org/modules/milvus (Java)</li>
<li>https://golang.testcontainers.org (Go)</li>
<li>https://golang.testcontainers.org/modules/milvus (Go)</li>
<li>https://dotnet.testcontainers.org (.NET)</li>
</ul>
