---
id: boolean.md
summary: En savoir plus sur les règles d'expression booléenne dans Milvus.
title: Règles de filtrage scalaire
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Règles de filtrage scalaire<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Une expression de prédicat produit une valeur booléenne. Milvus effectue un filtrage scalaire en effectuant des recherches à l'aide de prédicats. Une expression de prédicat, lorsqu'elle est évaluée, renvoie soit VRAI, soit FAUX. Consultez la <a href="/api-reference/pymilvus/v2.4.x/About.md">référence API du SDK Python</a> pour obtenir des instructions sur l'utilisation des expressions de prédicat.</p>
<p>Les règles de grammaire<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> décrivent les règles des expressions booléennes :</p>
<pre><code translate="no"><span class="hljs-title class_">Expr</span> = <span class="hljs-title class_">LogicalExpr</span> | <span class="hljs-variable constant_">NIL</span>
<span class="hljs-title class_">LogicalExpr</span> = <span class="hljs-title class_">LogicalExpr</span> <span class="hljs-title class_">BinaryLogicalOp</span> <span class="hljs-title class_">LogicalExpr</span> 
              | <span class="hljs-title class_">UnaryLogicalOp</span> <span class="hljs-title class_">LogicalExpr</span>
              | <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-title class_">LogicalExpr</span> <span class="hljs-string">&quot;)&quot;</span>
              | <span class="hljs-title class_">SingleExpr</span>;
<span class="hljs-title class_">BinaryLogicalOp</span> = <span class="hljs-string">&quot;&amp;&amp;&quot;</span> | <span class="hljs-string">&quot;and&quot;</span> | <span class="hljs-string">&quot;||&quot;</span> | <span class="hljs-string">&quot;or&quot;</span>;
<span class="hljs-title class_">UnaryLogicalOp</span> = <span class="hljs-string">&quot;not&quot;</span>;
<span class="hljs-title class_">SingleExpr</span> = <span class="hljs-title class_">TermExpr</span> | <span class="hljs-title class_">CompareExpr</span>;
<span class="hljs-title class_">TermExpr</span> = <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;in&quot;</span> <span class="hljs-title class_">ConstantArray</span>;
<span class="hljs-title class_">Constant</span> = <span class="hljs-variable constant_">INTEGER</span> | <span class="hljs-variable constant_">FLOAT</span>
<span class="hljs-title class_">ConstantExpr</span> = <span class="hljs-title class_">Constant</span>
               | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">BinaryArithOp</span> <span class="hljs-title class_">ConstantExpr</span>
               | <span class="hljs-title class_">UnaryArithOp</span> <span class="hljs-title class_">ConstantExpr</span>;
                                                          
<span class="hljs-title class_">ConstantArray</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">ConstantExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ConstantExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<span class="hljs-title class_">UnaryArithOp</span> = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span>
<span class="hljs-title class_">BinaryArithOp</span> = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span> | <span class="hljs-string">&quot;**&quot;</span>;
<span class="hljs-title class_">CompareExpr</span> = <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-variable constant_">IDENTIFIER</span>
              | <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-title class_">ConstantExpr</span>
              | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-variable constant_">IDENTIFIER</span>
              | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">CmpOpRestricted</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOpRestricted</span> <span class="hljs-title class_">ConstantExpr</span>;
<span class="hljs-title class_">CmpOpRestricted</span> = <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span>;
<span class="hljs-title class_">CmpOp</span> = <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span> | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;==&quot;</span>| <span class="hljs-string">&quot;!=&quot;</span>;
<span class="hljs-title class_">MatchOp</span> = <span class="hljs-string">&quot;like&quot;</span> | <span class="hljs-string">&quot;LIKE&quot;</span>;
<span class="hljs-title class_">JsonArrayOps</span> = <span class="hljs-title class_">JsonDefs</span> <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">JsonExpr</span> | <span class="hljs-title class_">JsonArray</span> <span class="hljs-string">&quot;)&quot;</span>;
<span class="hljs-title class_">JsonArrayDefs</span> = <span class="hljs-string">&quot;json_contains&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_all&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_any&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ANY&quot;</span>;
<span class="hljs-title class_">JsonExpr</span> =  <span class="hljs-title class_">Constant</span> | <span class="hljs-title class_">ConstantArray</span> | <span class="hljs-variable constant_">STRING</span> | <span class="hljs-variable constant_">BOOLEAN</span>;
<span class="hljs-title class_">JsonArray</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">JsonExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">JsonExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<span class="hljs-title class_">ArrayOps</span> = <span class="hljs-title class_">ArrayDefs</span> <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ArrayExpr</span> | <span class="hljs-title class_">Array</span> <span class="hljs-string">&quot;)&quot;</span>;
<span class="hljs-title class_">ArrayDefs</span> = <span class="hljs-string">&quot;array_contains&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_all&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_any&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY&quot;</span>
           | <span class="hljs-string">&quot;array_length&quot;</span>       | <span class="hljs-string">&quot;ARRAY_LENGTH&quot;</span>;
<span class="hljs-title class_">ArrayExpr</span> =  <span class="hljs-title class_">Constant</span> | <span class="hljs-title class_">ConstantArray</span> | <span class="hljs-variable constant_">STRING</span> | <span class="hljs-variable constant_">BOOLEAN</span>;
<span class="hljs-title class_">Array</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">ArrayExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ArrayExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Le tableau suivant présente la description de chaque symbole mentionné dans les règles d'expression booléenne ci-dessus.</p>
<table>
<thead>
<tr><th>Notation</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Définition.</td></tr>
<tr><td>,</td><td>Concaténation.</td></tr>
<tr><td>;</td><td>Terminaison.</td></tr>
<tr><td>|</td><td>Alternance.</td></tr>
<tr><td>{...}</td><td>Répétition.</td></tr>
<tr><td>(...)</td><td>Groupement.</td></tr>
<tr><td>NUL</td><td>Vide. L'expression peut être une chaîne vide.</td></tr>
<tr><td>INTEGER</td><td>Entiers tels que 1, 2, 3.</td></tr>
<tr><td>FLOAT</td><td>Nombres flottants tels que 1.0, 2.0.</td></tr>
<tr><td>CONST</td><td>Entiers ou nombres flottants.</td></tr>
<tr><td>IDENTIFIER</td><td>Identifiant. Dans Milvus, l'IDENTIFIER représente le nom du champ.</td></tr>
<tr><td>LogicalOp</td><td>Un LogicalOp est un opérateur logique qui permet de combiner plusieurs opérations relationnelles en une seule comparaison. La valeur renvoyée par un LogicalOp est soit VRAI (1), soit FAUX (0). Il existe deux types de LogicalOps : les BinaryLogicalOps et les UnaryLogicalOps.</td></tr>
<tr><td>Op logique unaire</td><td>UnaryLogicalOp fait référence à l'opérateur logique unaire &quot;not&quot;.</td></tr>
<tr><td>BinaryLogicalOp</td><td>Opérateurs logiques binaires qui effectuent des actions sur deux opérandes. Dans une expression complexe comportant deux opérandes ou plus, l'ordre d'évaluation dépend des règles de préséance.</td></tr>
<tr><td>ArithmeticOp</td><td>Un ArithmeticOp, c'est-à-dire un opérateur arithmétique, effectue des opérations mathématiques telles que l'addition et la soustraction sur les opérandes.</td></tr>
<tr><td>UnaryArithOp</td><td>Un UnaryArithOp est un opérateur arithmétique qui effectue une opération sur un seul opérande. L'UnaryArithOp négatif transforme une expression positive en une expression négative, ou l'inverse.</td></tr>
<tr><td>BinaryArithOp</td><td>Un BinaryArithOp, c'est-à-dire un opérateur binaire, effectue des opérations sur deux opérandes. Dans une expression complexe comportant deux opérandes ou plus, l'ordre d'évaluation dépend des règles de préséance.</td></tr>
<tr><td>CmpOp</td><td>CmpOp est un opérateur relationnel qui effectue des actions sur deux opérandes.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted est limité à &quot;Inférieur à&quot; et &quot;Egal à&quot;.</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExpr peut être une constante ou un BinaryArithOp sur deux ConstExpr ou un UnaryArithOp sur un seul ConstantExpr. Elle est définie de manière récursive.</td></tr>
<tr><td>Tableau constant</td><td>ConstantArray est entouré de crochets, et ConstantExpr peut être répété dans les crochets. ConstArray doit inclure au moins une ConstantExpr.</td></tr>
<tr><td>TermExpr</td><td>TermExpr est utilisé pour vérifier si la valeur d'un IDENTIFIER apparaît dans un tableau constant. TermExpr est représenté par &quot;in&quot;.</td></tr>
<tr><td>CompareExpr</td><td>Une CompareExpr, c'est-à-dire une expression de comparaison, peut être une opération relationnelle sur deux IDENTIFIER, ou une opération relationnelle sur un IDENTIFIER et un ConstantExpr, ou une opération ternaire sur deux ConstantExpr et un IDENTIFIER.</td></tr>
<tr><td>SingleExpr</td><td>SingleExpr, c'est-à-dire une seule expression, peut être soit un TermExpr, soit un CompareExpr.</td></tr>
<tr><td>LogicalExpr</td><td>Une LogicalExpr peut être une BinaryLogicalOp sur deux LogicalExprs, ou une UnaryLogicalOp sur une seule LogicalExpr, ou une LogicalExpr groupée entre parenthèses, ou une SingleExpr. Le LogicalExpr est défini de manière récursive.</td></tr>
<tr><td>Expr</td><td>Expr, une abréviation signifiant expression, peut être LogicalExpr ou NIL.</td></tr>
<tr><td>MatchOp</td><td>Un MatchOp, à savoir un opérateur de correspondance, compare une chaîne de caractères à une constante de chaîne de caractères ou à une constante de préfixe, d'infixe ou de suffixe de chaîne de caractères.</td></tr>
<tr><td>JsonArrayOp</td><td>Un JsonOp, c'est-à-dire un opérateur JSON, vérifie si l'identifiant spécifié contient les éléments spécifiés.</td></tr>
<tr><td>ArrayOp</td><td>Un ArrayOp, c'est-à-dire un opérateur de tableau, vérifie si l'identifiant spécifié contient les éléments spécifiés.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">Opérateurs<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Opérateurs logiques</h3><p>Les opérateurs logiques effectuent une comparaison entre deux expressions.</p>
<table>
<thead>
<tr><th>Symbole</th><th>Opération</th><th>Exemple</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>'et' &amp;&amp;</td><td>et</td><td>expr1 &amp;&amp; expr2</td><td>Vrai si expr1 et expr2 sont tous deux vrais.</td></tr>
<tr><td>'ou' ||</td><td>ou</td><td>expr1 || expr2</td><td>Vrai si expr1 ou expr2 est vrai.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Opérateurs arithmétiques binaires</h3><p>Les opérateurs arithmétiques binaires contiennent deux opérandes et peuvent effectuer des opérations arithmétiques de base et renvoyer le résultat correspondant.</p>
<table>
<thead>
<tr><th>Symbole</th><th>Opération</th><th>Exemple</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Addition</td><td>a + b</td><td>Additionne les deux opérandes.</td></tr>
<tr><td>-</td><td>Soustraction</td><td>a - b</td><td>Soustraire le deuxième opérande du premier opérande.</td></tr>
<tr><td>*</td><td>Multiplication</td><td>a * b</td><td>Multiplier les deux opérandes.</td></tr>
<tr><td>/</td><td>Division</td><td>a / b</td><td>Diviser le premier opérande par le second opérande.</td></tr>
<tr><td>**</td><td>Puissance</td><td>a ** b</td><td>Élever le premier opérande à la puissance du second opérande.</td></tr>
<tr><td>%</td><td>Modulo</td><td>a % b</td><td>Divise le premier opérande par le second opérande et donne la partie restante.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Opérateurs relationnels</h3><p>Les opérateurs relationnels utilisent des symboles pour vérifier l'égalité, l'inégalité ou l'ordre relatif entre deux expressions.</p>
<table>
<thead>
<tr><th>Symbole</th><th>Opération</th><th>Exemple</th><th>Description du symbole</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>Inférieur à</td><td>a &lt; b</td><td>Vrai si a est inférieur à b.</td></tr>
<tr><td>&gt;</td><td>Supérieur à</td><td>a &gt; b</td><td>Vrai si a est supérieur à b.</td></tr>
<tr><td>==</td><td>Égal</td><td>a == b</td><td>Vrai si a est égal à b.</td></tr>
<tr><td>!=</td><td>Non égal</td><td>a != b</td><td>Vrai si a n'est pas égal à b.</td></tr>
<tr><td>&lt;=</td><td>Inférieur ou égal</td><td>a &lt;= b</td><td>Vrai si a est inférieur ou égal à b.</td></tr>
<tr><td>&gt;=</td><td>Supérieur ou égal</td><td>a &gt;= b</td><td>Vrai si a est supérieur ou égal à b.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Précédence et associativité des opérateurs<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant indique la priorité et l'associativité des opérateurs. Les opérateurs sont énumérés de haut en bas, par ordre de préséance décroissante.</p>
<table>
<thead>
<tr><th>Précédence</th><th>Opérateur</th><th>Description de l'opérateur</th><th>Associativité</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnaireArithOp</td><td>De gauche à droite</td></tr>
<tr><td>2</td><td>non</td><td>UnaryLogicOp</td><td>De droite à gauche</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>De gauche à droite</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>Gauche à droite</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>Gauche à droite</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>De gauche à droite</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>Gauche-droite</td></tr>
<tr><td>8</td><td>comme LIKE</td><td>MatchOp</td><td>De gauche à droite</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>De gauche à droite</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>De gauche à droite</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>De gauche à droite</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>De gauche à droite</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>De gauche à droite</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>De gauche à droite</td></tr>
<tr><td>12</td><td>array_length ARRAY_LENGTH</td><td>ArrayOp</td><td>De gauche à droite</td></tr>
<tr><td>13</td><td>&amp;&amp; et</td><td>BinaryLogicOp</td><td>De gauche à droite</td></tr>
<tr><td>14</td><td>|| ou</td><td>BinaryLogicOp</td><td>De gauche à droite</td></tr>
</tbody>
</table>
<p>Les expressions sont normalement évaluées de gauche à droite. Les expressions complexes sont évaluées une par une. L'ordre dans lequel les expressions sont évaluées est déterminé par la priorité des opérateurs utilisés.</p>
<p>Si une expression contient deux opérateurs ou plus ayant la même priorité, l'opérateur de gauche est évalué en premier.</p>
<div class="alert note">
<p>Par exemple, 10 / 2 * 5 sera évalué comme (10 / 2) et le résultat multiplié par 5.</p>
</div>
<p>Lorsqu'une opération de moindre priorité doit être traitée en premier, elle doit être placée entre parenthèses.</p>
<div class="alert note">
<p>Par exemple, 30 / 2 + 8. Cette opération est normalement évaluée comme 30 divisé par 2, puis 8 ajouté au résultat. Si vous voulez diviser par 2 + 8, il faut écrire 30 / (2 + 8).</p>
</div>
<p>Les parenthèses peuvent être imbriquées dans des expressions. Les expressions parenthétiques les plus proches sont évaluées en premier.</p>
<h2 id="Usage" class="common-anchor-header">Utilisation<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Les exemples d'utilisation de toutes les expressions booléennes disponibles dans Milvus sont répertoriés comme suit (<code translate="no">int64</code> représente le champ scalaire qui contient des données de type INT64, <code translate="no">float</code> représente le champ scalaire qui contient des données de type virgule flottante, et <code translate="no">VARCHAR</code> représente le champ scalaire qui contient des données de type VARCHAR) :</p>
<ol>
<li>CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 &gt; 0&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;0 &lt; int64 &lt; 400&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;500 &lt;= int64 &lt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> &gt; <span class="hljs-string">&quot;str1&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>BinaryLogicalOp et parenthèses</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;(int64 &gt; 0 &amp;&amp; int64 &lt; 400) or (int64 &gt; 500 &amp;&amp; int64 &lt; 1000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr et UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> not <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp et CmpOp (sur des champs différents)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp et CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp et UnaryArithOp ou BinaryArithOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;200+300 &lt; int64 &lt;= 500+500&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="7">
<li>MatchOp</li>
</ol>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;prefix%&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;%suffix&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;%middle%&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;_suffix&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="8">
<li>JsonArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, JsonExpr)</code></p>
<p>Si l'expression JSON d'une instruction <code translate="no">JSON_CONTAINS</code> (deuxième argument) est une liste, l'identifiant (premier argument) doit être une liste de listes. Sinon, l'instruction est toujours évaluée à False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>L'expression JSON d'une instruction <code translate="no">JSON_CONTAINS_ALL</code> doit toujours être une liste.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>L'expression JSON dans une déclaration <code translate="no">JSON_CONTAINS_ANY</code> doit toujours être une liste. Sinon, elle agit de la même manière que <code translate="no">JSON_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<ol start="9">
<li>ArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code></p>
<p>Si l'expression de tableau d'une instruction <code translate="no">ARRAY_CONTAINS</code> (deuxième argument) est une liste, l'identificateur (premier argument) doit être une liste de listes. Sinon, l'instruction est toujours évaluée à False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>L'expression de tableau d'une instruction <code translate="no">ARRAY_CONTAINS_ALL</code> doit toujours être une liste.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>L'expression de tableau dans une instruction <code translate="no">ARRAY_CONTAINS_ANY</code> doit toujours être une liste. Sinon, elle agit de la même manière que <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Vérifiez le nombre d'éléments d'un tableau.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Maintenant que vous savez comment fonctionnent les ensembles de bits dans Milvus, vous voudrez peut-être.. :</p>
<ul>
<li>Apprendre à effectuer une <a href="/docs/fr/v2.4.x/multi-vector-search.md">recherche hybride</a>.</li>
<li>Apprendre à <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utiliser des chaînes pour filtrer</a> vos résultats de recherche.</li>
<li>Apprendre à <a href="/docs/fr/v2.4.x/enable-dynamic-field.md">utiliser des champs dynamiques dans la construction d'expressions booléennes</a>.</li>
</ul>
