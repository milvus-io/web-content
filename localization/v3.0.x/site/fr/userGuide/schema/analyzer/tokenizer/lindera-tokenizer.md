---
id: lindera-tokenizer.md
title: Lindera
summary: >-
  Le tokeniseur Lindera effectue une analyse morphologique basée sur un
  dictionnaire. Il est conçu pour le japonais et le coréen, des langues dans
  lesquelles les mots ne sont pas séparés par des espaces et où les marqueurs
  grammaticaux (particules) s'attachent directement aux mots.
---
<h1 id="Lindera" class="common-anchor-header">Lindera<button data-href="#Lindera" class="anchor-icon" translate="no">
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
    </button></h1><p>Le tokeniseur <code translate="no">lindera</code> effectue une analyse morphologique basée sur un dictionnaire. Il est conçu pour le japonais et le coréen, des langues dans lesquelles les mots ne sont pas séparés par des espaces et où les marqueurs grammaticaux (particules) s'attachent directement aux mots.</p>
<div class="alert note">
<p><strong>Pour les textes en chinois</strong>: bien que <code translate="no">lindera</code> prenne en charge le chinois via le dictionnaire <code translate="no">cc-cedict</code>, nous recommandons d’utiliser plutôt le <a href="/docs/fr/jieba-tokenizer.md"><code translate="no">jieba</code></a> tokenizer à la place. Jieba est spécialement conçu pour la segmentation des mots chinois et fournit de meilleurs résultats.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Le japonais et le coréen sont des langues agglutinantes : des marqueurs grammaticaux appelés particules s’attachent directement aux noms, formant de nombreuses combinaisons. Par exemple :</p>
<table>
   <tr>
     <th><p>Langue</p></th>
     <th><p>Mot de base</p></th>
     <th><p>+ Particule</p></th>
     <th><p>= Forme combinée</p></th>
     <th><p>Signification</p></th>
   </tr>
   <tr>
     <td><p>Coréen</p></td>
     <td><p>서울 (Séoul)</p></td>
     <td><p>de</p></td>
     <td><p>à Séoul</p></td>
     <td><p>à Séoul</p></td>
   </tr>
   <tr>
     <td><p>Japonais</p></td>
     <td><p>Tokyo (Tokyo)</p></td>
     <td><p>à</p></td>
     <td><p>à Tokyo</p></td>
     <td><p>à Tokyo</p></td>
   </tr>
</table>
<p>Le tokeniseur « <code translate="no">lindera</code> » :</p>
<ol>
<li><p><strong>Segmente le texte</strong> en morphèmes individuels (mots et particules)</p></li>
<li><p><strong>Attribue à chaque token</strong> des informations sur la catégorie grammaticale (POS) issues du dictionnaire</p></li>
<li><p><strong>Applique des filtres</strong> pour supprimer les tokens indésirables (par exemple, les particules, la ponctuation)</p></li>
</ol>
<p>Ce processus en deux étapes — segmentation suivie d’un filtrage basé sur la catégorie grammaticale — permet de contrôler avec précision les tokens qui sont indexés pour la recherche.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.6 et les versions ultérieures incluent tous les dictionnaires précompilés dans la version officielle.</p>
<p><details>
<summary>Milvus 2.5.x : compiler Milvus avec les dictionnaires</summary></p>
<p>Pour Milvus 2.5.x, vous devez compiler Milvus en activant des dictionnaires spécifiques. Tous les dictionnaires doivent être explicitement inclus lors de la compilation.</p>
<p>Pour activer des dictionnaires spécifiques, incluez-les dans la commande de compilation :</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
<button class="copy-code-btn"></button></code></pre>
<p>Liste complète des dictionnaires disponibles :</p>
<table>
   <tr>
     <th><p><strong>Dictionnaire</strong></p></th>
     <th><p><strong>Langue</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>lindera-ko-dic</p></td>
     <td><p>Coréen</p></td>
     <td><p>Dictionnaire morphologique coréen (<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic</p></td>
     <td><p>Japonais</p></td>
     <td><p>Dictionnaire morphologique standard (<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic-neologd</p></td>
     <td><p>Japonais</p></td>
     <td><p>Dictionnaire étendu comprenant de nouveaux mots et des noms propres (<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-unidic</p></td>
     <td><p>Japonais</p></td>
     <td><p>Dictionnaire académique standard (<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-cc-cedict</p></td>
     <td><p>Chinois</p></td>
     <td><p>Dictionnaire chinois-anglais géré par la communauté (<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>)</p></td>
   </tr>
</table>
<p>Par exemple, pour activer tous les dictionnaires :</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
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
    </button></h2><p>Pour configurer un analyseur à l'aide du tokenizer « <code translate="no">lindera</code> », définissez « <code translate="no">tokenizer.type</code> » sur « <code translate="no">lindera</code> », choisissez un dictionnaire avec « <code translate="no">dict_kind</code> » et, si vous le souhaitez, appliquez des filtres.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
  analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
      put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
      put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>);
      put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
              put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>);
              put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
                  <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                  <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                  <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>
              ));
          }}
      ));
  }});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
          <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
          <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
                  <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                  <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                      <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                      <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                      <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>,
                  },
              },
          },
      },
  }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>}}
        }}}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ko-dic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span> }
            }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ko-dic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;korean_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;SP\&quot;,\&quot;SSC\&quot;,\&quot;SSO\&quot;,\&quot;SC\&quot;,\&quot;SE\&quot;,\&quot;SF\&quot;,\&quot;JKS\&quot;,\&quot;JKC\&quot;,\&quot;JKG\&quot;,\&quot;JKO\&quot;,\&quot;JKB\&quot;,\&quot;JKV\&quot;,\&quot;JKQ\&quot;,\&quot;JX\&quot;,\&quot;JC\&quot;,\&quot;UNK\&quot;,\&quot;EP\&quot;,\&quot;ETM\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;서울에서 맛있는 음식을 먹었습니다&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>Type de tokenizer. Cette valeur est fixe : <code translate="no">"lindera"</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict_kind</code></p></td>
     <td><p>Dictionnaire utilisé pour définir le vocabulaire. Valeurs possibles :</p><ul><li><p><code translate="no">ko-dic</code>: Korean - Dictionnaire morphologique coréen (<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>)</p></li><li><p><code translate="no">ipadic</code>: Japonais - Dictionnaire morphologique standard (<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>)</p></li><li><p><code translate="no">ipadic-neologd</code>: Japonais avec dictionnaire de néologismes (étendu) – Comprend les nouveaux mots et les noms propres (<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>)</p></li><li><p><code translate="no">unidic</code>: japonais UniDic (étendu) – Dictionnaire académique de référence contenant des informations linguistiques détaillées (<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>)</p></li><li><p><code translate="no">cc-cedict</code>: Chinois mandarin (traditionnel/simplifié) - Dictionnaire chinois-anglais géré par la communauté (<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">filter</code></p></td>
     <td><p>Liste des filtres au niveau du tokeniseur à appliquer après la segmentation. Chaque filtre est un objet comportant :</p><ul><li><p><code translate="no">kind</code>: Le type de filtre. Valeurs prises en charge :</p><ul><li><p><code translate="no">korean_stop_tags</code>: Supprime les tokens correspondant aux balises POS coréennes spécifiées.</p></li><li><p><code translate="no">japanese_stop_tags</code>: Supprimer les tokens correspondant aux balises POS japonaises spécifiées.</p></li></ul></li><li><p><code translate="no">tags</code>: Une liste des balises de partie du discours à filtrer. Les balises disponibles dépendent de l'<code translate="no">kind</code>:</p><ul><li><p>Pour l’ <code translate="no">korean_stop_tags</code>: utilisez les codes de balises exacts (par exemple, <code translate="no">JKS</code>, <code translate="no">JKO</code>, <code translate="no">SF</code>). Les balises coréennes nécessitent une correspondance exacte. Pour la liste complète basée sur le jeu de balises Sejong, consultez <a href="https://docs.rs/lindera/latest/src/lindera/token_filter/korean_stop_tags.rs.html">la source des balises d’arrêt coréennes de Lindera</a>.</p></li><li><p>Pour les balises « <code translate="no">japanese_stop_tags</code> » : utilisez les codes de balises exacts (par exemple, <code translate="no">助詞,格助詞</code>, <code translate="no">助詞,係助詞</code>, <code translate="no">助動詞</code>). Les balises japonaises nécessitent une correspondance exacte. Pour consulter la liste complète (IPADIC), reportez-vous à <a href="https://github.com/taku910/mecab/blob/master/mecab-ipadic/pos-id.def">la référence des balises POS japonaises</a>.</p></li></ul></li></ul></td>
   </tr>
</table>
<p>Une fois l <code translate="no">analyzer_params</code> s définies, vous pouvez les appliquer à un champ « <code translate="no">VARCHAR</code> » lors de la définition d’un schéma de collection. Cela permet à Milvus de traiter le texte de ce champ à l’aide de l’analyseur spécifié, pour une tokenisation et un filtrage efficaces. Pour plus de détails, consultez la section « <a href="/docs/fr/analyzer-overview.md#Example-use">Exemple d’utilisation</a> ».</p>
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
    </button></h2><p>Avant d’appliquer la configuration de l’analyseur à votre schéma de collection, vérifiez son comportement à l’aide de la méthode ` <code translate="no">run_analyzer</code> `.</p>
<h3 id="Korean-example" class="common-anchor-header">Exemple en coréen<button data-href="#Korean-example" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
}

<span class="hljs-comment"># Sample Korean text: &quot;서울에서 맛있는 음식을 먹었습니다&quot; (I ate delicious food in Seoul)</span>
sample_text = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
  put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>);
  put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
          put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>);
          put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
              <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
              <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
              <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>
          ));
      }}
  ));
}});

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
      <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
              <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                  <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                  <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                  <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>,
              },
          },
      },
  },
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

_, err = client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">run_analyzer_req</span> = RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(run_analyzer_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>}}
        }}}
    }}
};

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                                 .<span class="hljs-built_in">WithTexts</span>({<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>})
                                 .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
    <span class="hljs-attr">dict_kind</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
    <span class="hljs-attr">filter</span>: [
      {
        <span class="hljs-attr">kind</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
        <span class="hljs-attr">tags</span>: [
          <span class="hljs-string">&quot;SP&quot;</span>,
          <span class="hljs-string">&quot;SSC&quot;</span>,
          <span class="hljs-string">&quot;SSO&quot;</span>,
          <span class="hljs-string">&quot;SC&quot;</span>,
          <span class="hljs-string">&quot;SE&quot;</span>,
          <span class="hljs-string">&quot;SF&quot;</span>,
          <span class="hljs-string">&quot;JKS&quot;</span>,
          <span class="hljs-string">&quot;JKC&quot;</span>,
          <span class="hljs-string">&quot;JKG&quot;</span>,
          <span class="hljs-string">&quot;JKO&quot;</span>,
          <span class="hljs-string">&quot;JKB&quot;</span>,
          <span class="hljs-string">&quot;JKV&quot;</span>,
          <span class="hljs-string">&quot;JKQ&quot;</span>,
          <span class="hljs-string">&quot;JX&quot;</span>,
          <span class="hljs-string">&quot;JC&quot;</span>,
          <span class="hljs-string">&quot;UNK&quot;</span>,
          <span class="hljs-string">&quot;EP&quot;</span>,
          <span class="hljs-string">&quot;ETM&quot;</span>,
        ],
      },
    ],
  },
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">analyzer_params</span>: analyzer_params,
  <span class="hljs-attr">text</span>: sample_text,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ko-dic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Sample Korean text: &quot;서울에서 맛있는 음식을 먹었습니다&quot; (I ate delicious food in Seoul)</span>
<span class="hljs-built_in">string</span> sampleText = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>;

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = [sampleText]
});

<span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> result.Results.SelectMany(r =&gt; r.Tokens))
{
    Console.WriteLine(t.Token);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ko-dic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;korean_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;SP\&quot;,\&quot;SSC\&quot;,\&quot;SSO\&quot;,\&quot;SC\&quot;,\&quot;SE\&quot;,\&quot;SF\&quot;,\&quot;JKS\&quot;,\&quot;JKC\&quot;,\&quot;JKG\&quot;,\&quot;JKO\&quot;,\&quot;JKB\&quot;,\&quot;JKV\&quot;,\&quot;JKQ\&quot;,\&quot;JX\&quot;,\&quot;JC\&quot;,\&quot;UNK\&quot;,\&quot;EP\&quot;,\&quot;ETM\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;서울에서 맛있는 음식을 먹었습니다&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultat attendu</strong>:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;서울&#x27;, &#x27;맛있&#x27;, &#x27;음식&#x27;, &#x27;먹&#x27;, &#x27;습니다&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>Sans ` <code translate="no">korean_stop_tags</code>`, le résultat inclurait des particules telles que ` <code translate="no">에서</code> ` (in), ` <code translate="no">는</code> ` (marqueur de sujet) et ` <code translate="no">을</code> ` (marqueur d’objet), qui ne sont généralement pas utiles pour la recherche.</p>
<h3 id="Japanese-example" class="common-anchor-header">Exemple en japonais<button data-href="#Japanese-example" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>]
            }
        ]
    }
}

<span class="hljs-comment"># Sample Japanese text: &quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>
sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
  put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>);
  put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
          put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>);
          put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
              <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>
          ));
      }}
  ));
}});

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
      <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
              <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                  <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>,
              },
          },
      },
  },
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

_, err = client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>]
            }
        ]
    }
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">run_analyzer_req</span> = RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(run_analyzer_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>}}
        }}}
    }}
};

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                                 .<span class="hljs-built_in">WithTexts</span>({<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>})
                                 .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
    <span class="hljs-attr">dict_kind</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
    <span class="hljs-attr">filter</span>: [
      {
        <span class="hljs-attr">kind</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>],
      },
    ],
  },
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">analyzer_params</span>: analyzer_params,
  <span class="hljs-attr">text</span>: sample_text,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ipadic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Sample Japanese text: &quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>
<span class="hljs-built_in">string</span> sampleText = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>;

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = [sampleText]
});

<span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> result.Results.SelectMany(r =&gt; r.Tokens))
{
    Console.WriteLine(t.Token);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ipadic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;japanese_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;接続詞\&quot;,\&quot;助詞,格助詞\&quot;,\&quot;助詞,格助詞,一般\&quot;,\&quot;助詞,格助詞,引用\&quot;,\&quot;助詞,格助詞,連語\&quot;,\&quot;助詞,係助詞\&quot;,\&quot;助詞,終助詞\&quot;,\&quot;助詞,接続助詞\&quot;,\&quot;助詞,特殊\&quot;,\&quot;助詞,副助詞\&quot;,\&quot;助詞,副助詞／並立助詞／終助詞\&quot;,\&quot;助詞,連体化\&quot;,\&quot;助詞,副詞化\&quot;,\&quot;助詞,並立助詞\&quot;,\&quot;助動詞\&quot;,\&quot;記号,一般\&quot;,\&quot;記号,読点\&quot;,\&quot;記号,句点\&quot;,\&quot;記号,空白\&quot;,\&quot;記号,括弧閉\&quot;,\&quot;記号,括弧開\&quot;,\&quot;その他,間投\&quot;,\&quot;フィラー\&quot;,\&quot;非言語音\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultat attendu :</strong></p>
<pre><code translate="no" class="language-plaintext">[&#x27;東京&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;最寄り駅&#x27;, &#x27;とう&#x27;, &#x27;きょう&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;駅&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>Sans « <code translate="no">japanese_stop_tags</code> », le résultat inclurait des particules telles que « <code translate="no">の</code> » (possessif), « <code translate="no">は</code> » (marqueur de sujet) et « <code translate="no">です</code> » (copule).</p>
