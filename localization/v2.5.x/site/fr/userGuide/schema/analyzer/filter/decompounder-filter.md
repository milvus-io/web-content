---
id: decompounder-filter.md
title: Décompacteur
summary: >-
  Le filtre de décompactage divise les mots composés en composants individuels
  sur la base d'un dictionnaire spécifié, ce qui facilite la recherche de
  parties de termes composés. Ce filtre est particulièrement utile pour les
  langues qui utilisent fréquemment des mots composés, comme l'allemand.
---

<h1 id="Decompounder" class="common-anchor-header">Décompacteur<button data-href="#Decompounder" class="anchor-icon" translate="no">
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
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>);
                    put(<span class="hljs-string">&quot;word_list&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment">// Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;decompounder&quot;,
      &quot;word_list&quot;: [
        &quot;dampf&quot;,
        &quot;schiff&quot;,
        &quot;fahrt&quot;,
        &quot;brot&quot;,
        &quot;backen&quot;,
        &quot;automat&quot;
      ]
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>

<p>Le filtre <code translate="no">decompounder</code> accepte les paramètres configurables suivants.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">word_list</code></p></td>
     <td><p>Une liste de composants de mots utilisés pour diviser les termes composés. Ce dictionnaire détermine comment les mots composés sont décomposés en termes individuels.</p></td>
   </tr>
</table>
<p>Le filtre <code translate="no">decompounder</code> fonctionne sur les termes générés par le tokenizer, il doit donc être utilisé en combinaison avec un tokenizer. Pour obtenir la liste des tokenizers disponibles dans Milvus, reportez-vous à la page <a href="/docs/fr/v2.5.x/standard-tokenizer.md">Tokenizer standard</a> et à ses pages apparentées.</p>
<p>Après avoir défini <code translate="no">analyzer_params</code>, vous pouvez les appliquer à un champ <code translate="no">VARCHAR</code> lors de la définition d'un schéma de collection. Cela permet à Milvus de traiter le texte de ce champ à l'aide de l'analyseur spécifié pour une tokenisation et un filtrage efficaces. Pour plus de détails, voir <a href="/docs/fr/v2.5.x/analyzer-overview.md#Example-use">Exemple d'utilisation</a>.</p>
<h2 id="Examples" class="common-anchor-header">Exemples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'appliquer la configuration de l'analyseur à votre schéma de collecte, vérifiez son comportement à l'aide de la méthode <code translate="no">run_analyzer</code>.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Configuration de l'analyseur</h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>);
                    put(<span class="hljs-string">&quot;word_list&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;decompounder&quot;,
      &quot;word_list&quot;: [
        &quot;dampf&quot;,
        &quot;schiff&quot;,
        &quot;fahrt&quot;,
        &quot;brot&quot;,
        &quot;backen&quot;,
        &quot;automat&quot;
      ]
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>

<h3 id="Verification-using-runanalyzer--Milvus-2511+" class="common-anchor-header">Vérification à l'aide de <code translate="no">run_analyzer</code><span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>

<span class="hljs-comment"># Run the standard analyzer with the defined configuration</span>
result = MilvusClient.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Résultat attendu</h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;dampf&#x27;</span>, <span class="hljs-string">&#x27;schiff&#x27;</span>, <span class="hljs-string">&#x27;fahrt&#x27;</span>, <span class="hljs-string">&#x27;brotbackautomat&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
