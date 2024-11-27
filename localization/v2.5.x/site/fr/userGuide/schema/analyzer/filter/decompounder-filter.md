---
id: decompounder-filter.md
title: Filtre décompacteur
summary: >-
  Le filtre `decompounder` divise les mots composés en composants individuels
  sur la base d'un dictionnaire spécifié, ce qui facilite la recherche de
  parties de termes composés. Ce filtre est particulièrement utile pour les
  langues qui utilisent fréquemment des mots composés, comme l'allemand.
---
<h1 id="Decompounder​" class="common-anchor-header">Décompacteur<button data-href="#Decompounder​" class="anchor-icon" translate="no">
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
    </button></h1><p>Le filtre <code translate="no">decompounder</code> divise les mots composés en composants individuels sur la base d'un dictionnaire spécifié, ce qui facilite la recherche de parties de termes composés. Ce filtre est particulièrement utile pour les langues qui utilisent fréquemment des mots composés, comme l'allemand.</p>
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
    </button></h2><p>Le filtre <code translate="no">decompounder</code> est un filtre personnalisé dans Milvus. Pour l'utiliser, spécifiez <code translate="no">&quot;type&quot;: &quot;decompounder&quot;</code> dans la configuration du filtre, ainsi qu'un paramètre <code translate="no">word_list</code> qui fournit le dictionnaire des composants de mots à reconnaître.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder​</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],​
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Le filtre <code translate="no">decompounder</code> accepte les paramètres configurables suivants.</p>
<table data-block-token="O4ZcdyoEToqP22xm5ELcYyIhnEh"><thead><tr><th data-block-token="MW4TdhfD2oe0KTx9qwGcP5XEnIh" colspan="1" rowspan="1"><p data-block-token="Y5tddmngjoAyd1xtaDzc7It5nRf">Paramètre</p>
</th><th data-block-token="Vk8Id7BMRoJMIkxN0YPc4lJgn2f" colspan="1" rowspan="1"><p data-block-token="D4v9dtQ53oCx6ExVKhxcPj1EnWg">Description</p>
</th></tr></thead><tbody><tr><td data-block-token="CDQldJSkAonYPIxTkiWcWpqPnOd" colspan="1" rowspan="1"><p data-block-token="TX4ndGkwkogWybxIfZocILJOnbd"><code translate="no">word_list</code></p>
</td><td data-block-token="VrxtdsWnZon6oPxMmbQcCgclnUg" colspan="1" rowspan="1"><p data-block-token="BXP4dHimoocoozxbHAecJOA6nTe">Une liste de composants de mots utilisés pour diviser les termes composés. Ce dictionnaire détermine comment les mots composés sont décomposés en termes individuels.</p>
</td></tr></tbody></table>
<p>Le filtre <code translate="no">decompounder</code> opère sur les termes générés par le tokenizer, il doit donc être utilisé en combinaison avec un tokenizer.</p>
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
    </button></h2><p>Voici un exemple de traitement du texte par le filtre <code translate="no">decompounder</code>.</p>
<p><strong>Texte original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultat attendu</strong> (avec <code translate="no">word_list: [&quot;dampf&quot;, &quot;schiff&quot;, &quot;fahrt&quot;, &quot;brot&quot;, &quot;backen&quot;, &quot;automat&quot;]</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brotbackautomat&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
