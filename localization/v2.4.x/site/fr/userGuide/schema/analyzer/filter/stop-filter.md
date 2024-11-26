---
id: stop-filter.md
title: Filtre d'arrêt
summary: >-
  Le filtre `stop` supprime les mots d'arrêt spécifiés du texte tokenisé, ce qui
  permet d'éliminer les mots communs et moins significatifs. Vous pouvez
  configurer la liste des mots d'arrêt en utilisant le paramètre `stop_words`.
---
<h1 id="Stop​" class="common-anchor-header">Arrêt<button data-href="#Stop​" class="anchor-icon" translate="no">
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
    </button></h1><p>Le filtre <code translate="no">stop</code> supprime les mots d'arrêt spécifiés du texte tokenisé, ce qui permet d'éliminer les mots courants et moins significatifs. Vous pouvez configurer la liste des mots d'arrêt à l'aide du paramètre <code translate="no">stop_words</code>.</p>
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
    </button></h2><p>Le filtre <code translate="no">length</code> est un filtre personnalisé dans Milvus. Pour l'utiliser, spécifiez <code translate="no">&quot;type&quot;: &quot;stop&quot;</code> dans la configuration du filtre, ainsi qu'un paramètre <code translate="no">stop_words</code> qui fournit une liste de mots vides.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stop​</span>
        <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>], <span class="hljs-comment"># Defines custom stop words and includes the English stop word list​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Le filtre <code translate="no">stop</code> accepte les paramètres configurables suivants.</p>
<table data-block-token="RvK3dMx74obnmXxlMe3cz6W1nUf"><thead><tr><th data-block-token="SRJcd5Os3oLiJyxkT6UcDba0nrb" colspan="1" rowspan="1"><p data-block-token="IBSbdC1ByokHmnxDXomccXXJnmh">Paramètre</p>
</th><th data-block-token="V9fZd2VX7oCaeDxy8fKcDnGpnId" colspan="1" rowspan="1"><p data-block-token="FCA5dw1JEoRB2ExZpYwc8O47nld">Description</p>
</th></tr></thead><tbody><tr><td data-block-token="AO5idkJ6pobnMmxcDBjcw4T1ngh" colspan="1" rowspan="1"><p data-block-token="ZnnGd5pOloVEBkxy0ZNcPmxen2g"><code translate="no">stop_words</code></p>
</td><td data-block-token="OaeWdJElZowPJrxzIFccUVoYn22" colspan="1" rowspan="1"><p data-block-token="LWBNdMr8fokmXnxpL5cc9z8Pntd">Une liste de mots à supprimer de la tokenisation. Par défaut, la liste prédéfinie <code translate="no">_english_</code>, qui contient des mots d'arrêt anglais courants, est utilisée. Les détails de <code translate="no">_english_</code> peuvent être trouvés <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">ici</a>.</p>
</td></tr></tbody></table>
<p>Le filtre <code translate="no">stop</code> opère sur les termes générés par le tokenizer, il doit donc être utilisé en combinaison avec un tokenizer.</p>
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
    </button></h2><p>Voici un exemple de traitement du texte par le filtre <code translate="no">stop</code>.</p>
<p><strong>Texte original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The stop filter allows control over common stop words for text processing.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultat attendu</strong> (avec <code translate="no">stop_words: [&quot;the&quot;, &quot;over&quot;, &quot;_english_&quot;]</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;The&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;allows&quot;</span>, <span class="hljs-string">&quot;control&quot;</span>, <span class="hljs-string">&quot;common&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;processing&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
