---
id: stemmer-filter.md
title: Filtre Stemmer
summary: >-
  Le filtre `stemmer` réduit les mots à leur forme de base ou racine (appelée
  stemming), ce qui facilite l'association de mots ayant des significations
  similaires à travers différentes inflexions.
---
<h1 id="Stemmer​" class="common-anchor-header">Stemmer (littéralement : "racine")<button data-href="#Stemmer​" class="anchor-icon" translate="no">
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
    </button></h1><p>Le filtre <code translate="no">stemmer</code> réduit les mots à leur forme de base ou racine (stemming), ce qui facilite l'appariement de mots ayant des significations similaires à travers différentes inflexions. Le filtre <code translate="no">stemmer</code> prend en charge plusieurs langues, ce qui permet une recherche et une indexation efficaces dans différents contextes linguistiques.</p>
<h2 id="Configuration​" class="common-anchor-header">Configuration<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>Le filtre <code translate="no">stemmer</code> est un filtre personnalisé dans Milvus. Pour l'utiliser, spécifiez <code translate="no">&quot;type&quot;: &quot;stemmer&quot;</code> dans la configuration du filtre, ainsi qu'un paramètre <code translate="no">language</code> pour sélectionner la langue souhaitée pour le stemming.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stemmer​</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Sets the language for stemming to English​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Le filtre <code translate="no">stemmer</code> accepte les paramètres configurables suivants.</p>
<table data-block-token="CnsXd9Ej7ozbQixt3lzcMqoanUf"><thead><tr><th data-block-token="ASZldv4hso4KpYxws1LcIE6fnSb" colspan="1" rowspan="1"><p data-block-token="FgIodsPFMoIlfDxk0GLcnf6Cn3c">Paramètre</p>
</th><th data-block-token="UwUpdXmE2oaLOjxYKpac4U4enUb" colspan="1" rowspan="1"><p data-block-token="S3g4d2pl3o1QfOxDrrCc0bHwn6l">Description</p>
</th></tr></thead><tbody><tr><td data-block-token="Qlg7d56pCo2leCxk3rkcZswhngb" colspan="1" rowspan="1"><p data-block-token="V7Ajd2RyToVjNTxbGEEcVHdYnxb"><code translate="no">language</code></p>
</td><td data-block-token="NTbNd7XeuoBsfsxzQ1Kc0jKonKb" colspan="1" rowspan="1"><p data-block-token="J4nPdCcSToFTGYx6Huhc7kpqnRd">Spécifie la langue pour le processus de filtrage. Les langues prises en charge sont les suivantes : <code translate="no">"arabic"</code> <code translate="no">"danish"</code> , <code translate="no">"dutch"</code>, <code translate="no">"english"</code>, <code translate="no">"finnish"</code>, <code translate="no">"french"</code>, <code translate="no">"german"</code>, <code translate="no">"greek"</code>, <code translate="no">"hungarian"</code>, <code translate="no">"italian"</code>, <code translate="no">"norwegian"</code>, <code translate="no">"portuguese"</code>, <code translate="no">"romanian"</code>, <code translate="no">"russian"</code>, <code translate="no">"spanish"</code>, <code translate="no">"swedish"</code>, <code translate="no">"tamil"</code>, <code translate="no">"turkish"</code></p>
</td></tr></tbody></table>
<p>Le filtre <code translate="no">stemmer</code> opère sur les termes générés par le tokenizer, il doit donc être utilisé en combinaison avec un tokenizer.</p>
<p>Après avoir défini <code translate="no">analyzer_params</code>, vous pouvez les appliquer à un champ <code translate="no">VARCHAR</code> lors de la définition d'un schéma de collecte. Cela permet à Milvus de traiter le texte de ce champ à l'aide de l'analyseur spécifié pour une tokenisation et un filtrage efficaces. Pour plus de détails, voir <a href="/docs/fr/analyzer-overview.md#Example-use">Exemple d'utilisation</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Exemple de sortie<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>Voici un exemple de traitement du texte par le filtre <code translate="no">stemmer</code>.</p>
<p><strong>Texte original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;running runs looked ran runner&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultat attendu</strong> (avec <code translate="no">language: &quot;english&quot;</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;look&quot;</span>, <span class="hljs-string">&quot;ran&quot;</span>, <span class="hljs-string">&quot;runner&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
