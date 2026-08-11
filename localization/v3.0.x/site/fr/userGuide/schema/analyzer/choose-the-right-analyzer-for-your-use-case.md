---
id: choose-the-right-analyzer-for-your-use-case.md
title: Choisissez l'analyseur adapté à votre cas d'utilisation
summary: Remarques
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Choisissez l'analyseur adapté à votre cas d'utilisation<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>Ce guide se concentre sur les aspects pratiques de la prise de décision pour le choix d'un analyseur. Pour plus de détails techniques sur les composants des analyseurs et sur la manière d'ajouter des paramètres d'analyse, reportez-vous à <a href="/docs/fr/analyzer-overview.md">la section Présentation des analyseurs</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Comprendre les analyseurs en 2 minutes<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Milvus, un analyseur traite le texte stocké dans ce champ afin de le rendre consultable pour des fonctionnalités telles que <a href="/docs/fr/full-text-search.md">la recherche en texte intégral</a> (BM25), <a href="/docs/fr/phrase-match.md">la correspondance de phrases</a> ou <a href="/docs/fr/keyword-match.md">la correspondance de texte</a>. Considérez-le comme un processeur de texte qui transforme votre contenu brut en tokens consultables.</p>
<p>Un analyseur fonctionne selon un pipeline simple en deux étapes :</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>Flux de travail de l’analyseur</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenisation (obligatoire) :</strong> cette étape initiale consiste à appliquer un <strong>tokeniseur</strong> pour diviser une chaîne de texte continue en unités distinctes et significatives appelées « tokens ». La méthode de tokenisation peut varier considérablement en fonction de la langue et du type de contenu.</p></li>
<li><p><strong>Filtrage des tokens (facultatif) :</strong> après la tokenisation, <strong>des filtres</strong> sont appliqués pour modifier, supprimer ou affiner les tokens. Ces opérations peuvent inclure la conversion de tous les tokens en minuscules, la suppression de mots courants sans signification (tels que les mots vides) ou la réduction des mots à leur forme racine (stemming).</p></li>
</ol>
<p><strong>Exemple</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Pourquoi le choix de l’analyseur est-il important ?<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Le choix d’un analyseur inadapté peut rendre des documents pertinents introuvables ou renvoyer des résultats non pertinents.</p>
<p>Le tableau suivant résume les problèmes courants causés par un mauvais choix d’analyseur et propose des solutions concrètes pour diagnostiquer les problèmes de recherche.</p>
<table>
   <tr>
     <th><p>Problème</p></th>
     <th><p>Symptôme</p></th>
     <th><p>Exemple (entrée et sortie)</p></th>
     <th><p>Cause (mauvais analyseur)</p></th>
     <th><p>Solution (bon analyseur)</p></th>
   </tr>
   <tr>
     <td><p>Tokenisation excessive</p></td>
     <td><p>Les requêtes textuelles portant sur des termes techniques, des identifiants ou des URL ne permettent pas de trouver de documents pertinents.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/fr/standard-analyzer.md"><code translate="no">standard</code></a> analyseur</p></td>
     <td><p>Utilisez un <a href="/docs/fr/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokeniseur ; associez-le à un <a href="/docs/fr/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtre.</p></td>
   </tr>
   <tr>
     <td><p>Sous-tokenisation</p></td>
     <td><p>La recherche d’un élément d’une expression composée de plusieurs mots ne renvoie pas les documents contenant l’expression complète.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analyseur avec un <a href="/docs/fr/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokeniseur</p></td>
     <td><p>Utilisez un <a href="/docs/fr/standard-tokenizer.md"><code translate="no">standard</code></a> tokenizer pour effectuer la segmentation en fonction de la ponctuation et des espaces ; utilisez un filtre <a href="/docs/fr/regex-filter.md">d'expressions régulières</a> personnalisé.</p></td>
   </tr>
   <tr>
     <td><p>Incohérences linguistiques</p></td>
     <td><p>Les résultats de recherche pour une langue spécifique n'ont aucun sens ou sont inexistants.</p></td>
     <td><p>Texte en chinois : <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (un seul token)</p></td>
     <td><p><a href="/docs/fr/english-analyzer.md"><code translate="no">english</code></a> analyseur</p></td>
     <td><p>Utilisez un analyseur spécifique à la langue, tel que <a href="/docs/fr/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>Incompatibilité entre les méthodes de saisie</p></td>
     <td><p>Les utilisateurs saisissent du pinyin, mais le texte indexé utilise des caractères chinois.</p></td>
     <td><p>Texte en chinois : <code translate="no">"足球"</code>; texte de la requête : <code translate="no">"zuqiu"</code></p></td>
     <td><p>Analyseur ne générant que des tokens de caractères chinois</p></td>
     <td><p>Utilisez un analyseur personnalisé avec le <a href="/docs/fr/jieba-tokenizer.md"><code translate="no">jieba</code></a> tokenizer et <a href="/docs/fr/pinyin-filter.md"><code translate="no">pinyin</code></a> filtre.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Première question : devez-vous choisir un analyseur ?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans de nombreux cas d'utilisation, vous n'avez rien de particulier à faire. Voyons si c'est votre cas.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Comportement par défaut : l'analyseur « <code translate="no">standard</code> »<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Si vous ne spécifiez pas d’analyseur lorsque vous utilisez des fonctionnalités de recherche de texte telles que la recherche en texte intégral, Milvus utilise automatiquement l’ <a href="/docs/fr/standard-analyzer.md"><code translate="no">standard</code></a> analyseur par défaut.</p>
<p>L'analyseur « <code translate="no">standard</code> » :</p>
<ul>
<li><p>Divise le texte en fonction des espaces et des signes de ponctuation</p></li>
<li><p>Convertit tous les tokens en minuscules</p></li>
<li><p>Supprime un ensemble intégré de mots vides courants de l’anglais et la plupart des signes de ponctuation</p></li>
</ul>
<p><strong>Exemple de transformation</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Critères de décision : une vérification rapide<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez ce tableau pour déterminer rapidement si l’analyseur par défaut « <code translate="no">standard</code> » répond à vos besoins. Si ce n’est pas le cas, vous devrez choisir une autre approche.</p>
<table>
   <tr>
     <th><p>Votre contenu</p></th>
     <th><p>L'analyseur standard convient-il ?</p></th>
     <th><p>Pourquoi</p></th>
     <th><p>Ce dont vous avez besoin</p></th>
   </tr>
   <tr>
     <td><p>Articles de blog en anglais</p></td>
     <td><p>✅ Oui</p></td>
     <td><p>Le comportement par défaut est suffisant.</p></td>
     <td><p>Utilisez les paramètres par défaut (aucune configuration nécessaire).</p></td>
   </tr>
   <tr>
     <td><p>Documents en chinois</p></td>
     <td><p>❌ Non</p></td>
     <td><p>Les mots chinois ne comportent pas d'espaces et seront traités comme un seul token.</p></td>
     <td><p>Utilisez un <a href="/docs/fr/chinese-analyzer.md"><code translate="no">chinese</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documents en arabe</p></td>
     <td><p>❌ Non</p></td>
     <td><p>textes arabes peuvent comporter des variantes de lettres, des signes diacritiques, des tatweel, des chiffres arabo-indiens et des mots vides courants en arabe qui nécessitent un traitement spécifique à la langue.</p></td>
     <td><p>Utilisez un <a href="/docs/fr/arabic-analyzer.md"><code translate="no">arabic</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documents en thaï</p></td>
     <td><p>❌ Non</p></td>
     <td><p>Le texte thaï ne comporte généralement pas d'espaces entre les mots ; il nécessite donc une segmentation des mots spécifique à la langue.</p></td>
     <td><p>Utilisez un <a href="/docs/fr/thai-analyzer.md"><code translate="no">thai</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documentation technique</p></td>
     <td><p>❌ Non</p></td>
     <td><p>La ponctuation est supprimée des termes tels que « <code translate="no">C++</code> ».</p></td>
     <td><p>Créez un analyseur personnalisé à l’aide d’un <a href="/docs/fr/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer et un <a href="/docs/fr/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtre.</p></td>
   </tr>
   <tr>
     <td><p>Langues utilisant des espaces comme séparateurs, telles que le français ou l'espagnol</p></td>
     <td><p>⚠️ Attention</p></td>
     <td><p>que les caractères accentués (<code translate="no">café</code> vs. <code translate="no">cafe</code>) ne soient pas reconnus.</p></td>
     <td><p>Un analyseur personnalisé utilisant le <a href="/docs/fr/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> est recommandé pour obtenir de meilleurs résultats.</p></td>
   </tr>
   <tr>
     <td><p>Langues multilingues ou inconnues</p></td>
     <td><p>❌ Non</p></td>
     <td><p>L'analyseur <code translate="no">standard</code> ne dispose pas de la logique spécifique à chaque langue nécessaire pour gérer les différents jeux de caractères et les règles de tokenisation.</p></td>
     <td><p>Utilisez un analyseur personnalisé avec le <a href="/docs/fr/icu-tokenizer.md"><code translate="no">icu</code></a> le tokenizer pour une tokenisation compatible Unicode. </p><p>Vous pouvez également envisager de configurer <a href="/docs/fr/multi-language-analyzers.md">des analyseurs multilingues</a> ou un <a href="/docs/fr/language-identifier.md">identifiant de langue</a> pour une gestion plus précise du contenu multilingue.</p></td>
   </tr>
</table>
<p>Si l’analyseur par défaut « <code translate="no">standard</code> » ne répond pas à vos besoins, vous devez en implémenter un autre. Deux options s’offrent à vous :</p>
<ul>
<li><p><a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Utiliser un analyseur intégré</a> ou</p></li>
<li><p><a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">en créer un personnalisé</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Option A : Utiliser les analyseurs intégrés<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Les analyseurs intégrés sont des solutions préconfigurées pour les langues courantes. Ils constituent le moyen le plus simple de démarrer lorsque l’analyseur standard par défaut ne convient pas parfaitement.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Analyseurs intégrés disponibles<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Analyseur</p></th>
     <th><p>Langage pris en charge</p></th>
     <th><p>Composants</p></th>
     <th><p>Remarques</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>La plupart des langues utilisant des espaces pour séparer les mots (anglais, français, allemand, espagnol, etc.)</p></td>
     <td><ul><li><p>Tokeniseur : <code translate="no">standard</code></p></li><li><p>Filtres : <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Analyseur polyvalent pour le traitement initial du texte. Dans les scénarios monolingues, les analyseurs spécifiques à une langue (tels que <code translate="no">english</code>) offrent de meilleures performances.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Dédié à l'anglais, il applique le lemmatisation et la suppression des mots vides pour une meilleure correspondance sémantique en anglais</p></td>
     <td><ul><li><p>Tokeniseur : <code translate="no">standard</code></p></li><li><p>Filtres : <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recommandé pour les contenus exclusivement en anglais plutôt que <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Chinois</p></td>
     <td><ul><li><p>Tokeniseur : <code translate="no">jieba</code></p></li><li><p>Filtres : <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Utilise actuellement le dictionnaire de chinois simplifié par défaut.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>Arabe</p></td>
     <td><ul><li><p>Tokeniseur : <code translate="no">standard</code></p></li><li><p>Filtres : <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">arabic_normalization</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recommandé pour les textes en arabe plutôt que <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Thaï</p></td>
     <td><ul><li><p>Tokeniseur : <code translate="no">thai</code></p></li><li><p>Filtres : <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recommandé pour les textes en thaï plutôt que <code translate="no">standard</code> ou la tokenisation basée sur les espaces.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Exemple d'implémentation<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour utiliser un analyseur intégré, il suffit de spécifier son type dans l'<code translate="no">analyzer_params</code> lors de la définition du schéma de votre champ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pour plus de détails sur son utilisation, reportez-vous aux sections <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>, <a href="/docs/fr/keyword-match.md">Correspondance de texte</a> ou <a href="/docs/fr/phrase-match.md">Correspondance de phrase</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Méthode B : Créer un analyseur personnalisé<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque <a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">les options intégrées</a> ne répondent pas à vos besoins, vous pouvez créer un analyseur personnalisé en combinant un tokeniseur avec un ensemble de filtres. Cela vous offre un contrôle total sur le pipeline de traitement du texte.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Étape 1 : Sélectionnez le tokeniseur en fonction de la langue<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Choisissez votre tokenizer en fonction de la langue principale de votre contenu :</p>
<h4 id="Western-languages" class="common-anchor-header">Langues occidentales</h4><p>Pour les langues utilisant des espaces comme séparateurs, vous disposez des options suivantes :</p>
<table>
   <tr>
     <th><p>Tokeniseur</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Idéal pour</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Divise le texte en fonction des espaces et des signes de ponctuation</p></td>
     <td><p>Texte général, ponctuation variée</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Résultat : <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Segmente uniquement en fonction des espaces</p></td>
     <td><p>Contenu pré-traité, texte formaté par l'utilisateur</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Sortie : <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Langues d'Asie de l'Est</h4><p>Les langues qui n’utilisent pas systématiquement d’espaces entre les mots nécessitent des tokeniseurs spécialisés pour une segmentation correcte des mots :</p>
<h5 id="Chinese" class="common-anchor-header">Chinois</h5><table>
   <tr>
     <th><p>Tokeniseur</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Idéal pour</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Segmentation basée sur un dictionnaire chinois et un algorithme intelligent</p></td>
     <td><p><strong>Recommandé pour les contenus en chinois</strong>: combine un dictionnaire et des algorithmes intelligents, spécialement conçus pour le chinois</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Résultat : <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Analyse morphologique pure basée sur un dictionnaire chinois (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>Par rapport à <code translate="no">jieba</code>, traite le texte chinois de manière plus générique</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"机器学习算法"</code></p></li><li><p>Résultat : <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">Thaï</h5><p>Pour la plupart des textes en thaï, utilisez l'analyseur intégré <a href="/docs/fr/thai-analyzer.md"><code translate="no">thai</code></a> . N'utilisez le <a href="/docs/fr/thai-tokenizer.md"><code translate="no">thai</code></a> seulement lorsque vous devez créer un pipeline d'analyseurs personnalisé.</p>
<table>
   <tr>
     <th><p>Tokeniseur</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Idéal pour</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Segmente le texte thaï en tokens de mots et filtre les segments composés uniquement d’espaces et de signes de ponctuation</p></td>
     <td><p>Pipelines d'analyse personnalisés pour les textes en thaï ou mixtes (thaï/anglais)</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>Sortie : <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Japonais et coréen</h5><table>
   <tr>
     <th><p>Langue</p></th>
     <th><p>Tokeniseur</p></th>
     <th><p>Options du dictionnaire</p></th>
     <th><p>Idéal pour</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p>Japonais</p></td>
     <td><p><a href="/docs/fr/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (usage général), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (termes modernes), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (académique)</p></td>
     <td><p>Analyse morphologique avec prise en charge des noms propres</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"東京都渋谷区"</code></p></li><li><p>Sortie : <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Coréen</p></td>
     <td><p><a href="/docs/fr/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Analyse morphologique du coréen</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"안녕하세요"</code></p></li><li><p>Sortie : <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Langues multilingues ou inconnues</h4><p>Pour les contenus dont les langues sont imprévisibles ou mélangées au sein d'un même document :</p>
<table>
   <tr>
     <th><p>Tokeniseur</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Idéal pour</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Tokenisation compatible Unicode (International Components for Unicode)</p></td>
     <td><p>Écritures mixtes, langues inconnues ou lorsque la tokenisation simple suffit</p></td>
     <td><ul><li><p>Entrée : <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Sortie : <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Quand utiliser icu</strong>:</p>
<ul>
<li><p>Langues mixtes pour lesquelles l’identification de la langue est impossible.</p></li>
<li><p>Vous souhaitez éviter la charge supplémentaire liée <a href="/docs/fr/multi-language-analyzers.md">aux analyseurs multilingues</a> ou à <a href="/docs/fr/language-identifier.md">l'identificateur de langue</a>.</p></li>
<li><p>Le contenu comporte une langue principale avec, occasionnellement, des mots étrangers qui n’influent que peu sur le sens global (par exemple, un texte en anglais comportant sporadiquement des noms de marque ou des termes techniques en japonais ou en français).</p></li>
</ul>
<p><strong>Autres approches</strong>: pour un traitement plus précis du contenu multilingue, envisagez d’utiliser des analyseurs multilingues ou l’identificateur de langue. Pour plus de détails, reportez-vous aux sections <a href="/docs/fr/multi-language-analyzers.md">Analyseurs multilingues</a> ou <a href="/docs/fr/language-identifier.md">Identificateur de langue</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Étape 2 : Ajouter des filtres pour plus de précision<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Après <a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">avoir sélectionné votre tokeniseur</a>, appliquez des filtres en fonction de vos besoins de recherche spécifiques et des caractéristiques de votre contenu.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Filtres couramment utilisés</h4><p>Ces filtres sont essentiels pour la plupart des configurations linguistiques séparées par des espaces (anglais, français, allemand, espagnol, etc.) et améliorent considérablement la qualité de la recherche :</p>
<table>
   <tr>
     <th><p>Filtre</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Quand l'utiliser</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Convertir tous les tokens en minuscules</p></td>
     <td><p>Universel : s'applique à toutes les langues distinguant les majuscules et les minuscules</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Résultat : <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Ramener les mots à leur forme de base</p></td>
     <td><p>Langues avec des déclinaisons (anglais, français, allemand, etc.)</p></td>
     <td><p>Pour l'anglais :</p><ul><li><p>Entrée : <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Résultat : <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Supprimer les mots courants sans signification</p></td>
     <td><p>La plupart des langues – particulièrement efficace pour les langues où les mots sont séparés par des espaces</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Résultat : <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Pour les langues d'Asie de l'Est (chinois, japonais, coréen, etc.), privilégiez plutôt <a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">des filtres spécifiques à ces langues</a>. Ces langues utilisent généralement des approches différentes pour le traitement du texte et ne tirent pas forcément un grand bénéfice de la réduction lexicale.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Filtres de normalisation du texte</h4><p>Ces filtres uniformisent les variations du texte afin d'améliorer la cohérence des correspondances :</p>
<table>
   <tr>
     <th><p>Filtre</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Quand l'utiliser</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Convertir les caractères accentués en leurs équivalents ASCII</p></td>
     <td><p>Contenu international, contenu généré par les utilisateurs</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Résultat : <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Filtrage des tokens</h4><p>Contrôler quels tokens sont conservés en fonction du contenu ou de la longueur des caractères :</p>
<table>
   <tr>
     <th><p>Filtrer</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Quand l'utiliser</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Supprimer les tokens de ponctuation isolés</p></td>
     <td><p>Nettoyer le résultat des tokeniseurs <code translate="no">jieba</code>, <code translate="no">lindera</code> et <code translate="no">icu</code>, qui renvoient les signes de ponctuation sous forme de tokens individuels</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Sortie : <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Ne conserver que les lettres et les chiffres</p></td>
     <td><p>Contenu technique, traitement du texte épuré</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Résultat : <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Supprimer les tokens ne respectant pas la plage de longueur spécifiée</p></td>
     <td><p>Filtrer le bruit (tokens trop longs)</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Sortie : <code translate="no">[['a'], ['very'], []]</code> (si <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Filtrage personnalisé basé sur des modèles</p></td>
     <td><p>Exigences spécifiques au domaine concernant les tokens</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["test123", "prod456"]</code></p></li><li><p>Sortie : <code translate="no">[[], ['prod456']]</code> (si <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Filtres spécifiques à une langue</h4><p>Ces filtres prennent en charge les caractéristiques spécifiques à chaque langage :</p>
<table>
   <tr>
     <th><p>Filtre</p></th>
     <th><p>Langue</p></th>
     <th><p>Fonctionnement</p></th>
     <th><p>Exemples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Allemand</p></td>
     <td><p>Divise les mots composés en éléments pouvant faire l'objet d'une recherche</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Résultat : <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Chinois</p></td>
     <td><p>Conserve les caractères chinois et les caractères alphanumériques</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Résultat : <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Chinois</p></td>
     <td><p>Conserve uniquement les caractères chinois</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Résultat : <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>Chinois</p></td>
     <td><p>Génère des formes de tokens en pinyin pour les tokens chinois</p></td>
     <td><ul><li><p>Entrée : <code translate="no">["中文"]</code></p></li><li><p>Sortie : <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Étape 3 : Combiner et implémenter<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour créer votre analyseur personnalisé, vous devez définir le tokenizer et une liste de filtres dans le dictionnaire « <code translate="no">analyzer_params</code> ». Les filtres sont appliqués dans l'ordre dans lequel ils sont répertoriés.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Étape finale : test avec <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Vérifiez toujours votre configuration avant de l'appliquer à une collection :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Problèmes courants à vérifier :</p>
<ul>
<li><p><strong>Sur-tokenisation</strong>: les termes techniques sont incorrectement segmentés</p></li>
<li><p><strong>Sous-tokenisation</strong>: les expressions ne sont pas séparées correctement</p></li>
<li><p><strong>Token manquants</strong>: des termes importants sont filtrés</p></li>
</ul>
<p>Pour une utilisation détaillée, consultez <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Configurations recommandées par cas d'utilisation<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section présente les configurations recommandées pour les tokeniseurs et les filtres dans le cadre des cas d’utilisation courants avec les analyseurs de Milvus. Choisissez la combinaison la mieux adaptée à votre type de contenu et à vos besoins en matière de recherche.</p>
<div class="alert note">
<p>Avant d’appliquer un analyseur à votre collection, nous vous recommandons d’utiliser <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> pour tester et valider les performances de l’analyse de texte.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Langues comportant des accents (français, espagnol, allemand, etc.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez un tokenizer « <code translate="no">standard</code> » avec conversion en minuscules, lemmatisation spécifique à la langue et suppression des mots vides. Cette configuration fonctionne également pour d’autres langues européennes en modifiant les paramètres « <code translate="no">language</code> » et « <code translate="no">stop_words</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">Contenu en anglais<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour le traitement de textes en anglais avec un filtrage complet. Vous pouvez également utiliser l’analyseur intégré <a href="/docs/fr/english-analyzer.md"><code translate="no">english</code></a> :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">Contenu en chinois<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez le tokenizer <code translate="no">jieba</code> et appliquez un filtre de caractères pour ne conserver que les caractères chinois, les lettres latines et les chiffres.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pour le chinois simplifié, « <code translate="no">cnalphanumonly</code> » supprime tous les tokens à l’exception des caractères chinois, du texte alphanumérique et des chiffres. Cela empêche la ponctuation d’affecter la qualité de la recherche.</p>
</div>
<p>Si les utilisateurs sont susceptibles d’effectuer des recherches sur du texte chinois en saisissant du pinyin, utilisez un analyseur personnalisé avec le tokeniseur « <code translate="no">jieba</code> » et le <a href="/docs/fr/pinyin-filter.md"><code translate="no">pinyin</code></a> filtre au lieu de l’analyseur « <code translate="no">chinese</code> » intégré.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">Contenu japonais<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez le tokeniseur « <code translate="no">lindera</code> » avec le dictionnaire japonais et des filtres pour nettoyer la ponctuation et contrôler la longueur des tokens :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">Contenu coréen<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Comme pour le japonais, utilisez le tokenizer « <code translate="no">lindera</code> » avec le dictionnaire coréen :</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Contenu mixte ou multilingue<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsque vous travaillez avec du contenu couvrant plusieurs langues ou utilisant des scripts de manière imprévisible, commencez par utiliser l’analyseur <code translate="no">icu</code>. Cet analyseur compatible Unicode gère efficacement les scripts et symboles mixtes.</p>
<p><strong>Configuration multilingue de base (sans lemmatisation)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Traitement multilingue avancé</strong>:</p>
<p>Pour un meilleur contrôle du comportement des tokens entre différentes langues :</p>
<ul>
<li><p>Utilisez une configuration <strong>d’analyseur multilingue</strong>. Pour plus de détails, consultez la section <a href="/docs/fr/multi-language-analyzers.md">Analyseurs multilingues</a>.</p></li>
<li><p>Implémentez un <strong>identifiant de langue</strong> dans votre contenu. Pour plus de détails, consultez la section « <a href="/docs/fr/language-identifier.md">Identifiant de langue</a> ».</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Intégration aux fonctionnalités de recherche de texte<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir sélectionné votre analyseur, vous pouvez l'intégrer aux fonctionnalités de recherche de texte fournies par Milvus.</p>
<ul>
<li><p><strong>Recherche en texte intégral</strong></p>
<p>Les analyseurs ont un impact direct sur la recherche en texte intégral basée sur l’algorithme BM25 grâce à la génération de vecteurs clairsemés. Utilisez le même analyseur pour l’indexation et les requêtes afin de garantir une tokenisation cohérente. Les analyseurs spécifiques à une langue offrent généralement un meilleur score BM25 que les analyseurs génériques. Pour plus de détails sur la mise en œuvre, consultez la section « <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a> ».</p></li>
<li><p><strong>Correspondance de texte</strong></p>
<p>Les opérations de correspondance de texte effectuent une correspondance exacte des tokens entre les requêtes et le contenu indexé, en fonction de la sortie de votre analyseur. Pour plus de détails sur la mise en œuvre, consultez la section « <a href="/docs/fr/keyword-match.md">Correspondance de texte</a> ».</p></li>
<li><p><strong>Correspondance de phrases</strong></p>
<p>La correspondance de phrases nécessite une tokenisation cohérente des expressions composées de plusieurs mots afin de préserver les limites et le sens des phrases. Pour plus de détails sur la mise en œuvre, consultez la section « <a href="/docs/fr/phrase-match.md">Correspondance de phrases</a> ».</p></li>
</ul>
