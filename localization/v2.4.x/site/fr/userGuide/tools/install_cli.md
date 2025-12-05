---
id: install_cli.md
summary: Apprenez à installer Milvus_CLI.
title: Installation de Milvus_CLI
---
<h1 id="Install-MilvusCLI" class="common-anchor-header">Installation de Milvus_CLI<button data-href="#Install-MilvusCLI" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment installer Milvus_CLI.</p>
<h2 id="Install-from-PyPI" class="common-anchor-header">Installation à partir de PyPI<button data-href="#Install-from-PyPI" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez installer Milvus_CLI à partir de <a href="https://pypi.org/project/milvus-cli/">PyPI</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Conditions préalables</h3><ul>
<li>Installer <a href="https://www.python.org/downloads/release/python-385/">Python 3.8.5</a> ou une version ultérieure</li>
<li>Installer <a href="https://pip.pypa.io/en/stable/installation/">pip</a></li>
</ul>
<h3 id="Install-via-pip" class="common-anchor-header">Installation via pip</h3><p>Exécutez la commande suivante pour installer Milvus_CLI.</p>
<pre><code translate="no" class="language-shell">pip install milvus-cli
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-with-Docker" class="common-anchor-header">Installation avec Docker<button data-href="#Install-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez installer Milvus_CLI avec Docker.</p>
<h3 id="Prerequisites" class="common-anchor-header">Conditions préalables</h3><p>Docker 19.03 ou plus récent est requis.</p>
<h3 id="Install-based-on-Docker-image" class="common-anchor-header">Installation basée sur l'image Docker</h3><pre><code translate="no" class="language-shell">$ docker run -it zilliz/milvus_cli:latest
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-from-source-code" class="common-anchor-header">Installation à partir du code source<button data-href="#Install-from-source-code" class="anchor-icon" translate="no">
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
<li>Exécutez la commande suivante pour télécharger un dépôt <code translate="no">milvus_cli</code>.</li>
</ol>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus_cli.git
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Exécuter la commande suivante pour entrer dans le dossier <code translate="no">milvus_cli</code>.</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> milvus_cli
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Exécuter la commande suivante pour installer Milvus_CLI.</li>
</ol>
<pre><code translate="no" class="language-shell">python -m pip install --editable .
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez également installer Milvus_CLI à partir d'une archive compressée (fichier<code translate="no">.tar.gz</code> ). Télécharger une <a href="https://github.com/zilliztech/milvus_cli/releases">archive</a> et exécuter <code translate="no">python -m pip install milvus_cli-&lt;version&gt;.tar.gz</code>.</p>
<h3 id="Install-from-an-exe-file" class="common-anchor-header">Installation à partir d'un fichier .exe</h3><div class="alert note"> Cette méthode d'installation ne s'applique qu'à Windows. </div>
<p>Téléchargez un fichier .exe à partir de <a href="https://github.com/zilliztech/milvus_cli/releases">GitHub</a> et exécutez-le pour installer Milvus_CLI. En cas de succès, <code translate="no">milvus_cli-&lt;version&gt;.exe</code> s'affiche comme indiqué dans la figure suivante.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_cli_exe.png" alt="Milvus_CLI" class="doc-image" id="milvus_cli" />
   </span> <span class="img-wrapper"> <span>Milvus_CLI</span> </span></p>
