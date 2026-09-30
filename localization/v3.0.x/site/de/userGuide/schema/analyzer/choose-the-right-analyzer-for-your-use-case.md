---
id: choose-the-right-analyzer-for-your-use-case.md
title: Wählen Sie den richtigen Analysator für Ihren Anwendungsfall
summary: Anmerkungen
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Wählen Sie den richtigen Analysator für Ihren Anwendungsfall<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>Dieser Leitfaden konzentriert sich auf die praktische Entscheidungsfindung bei der Auswahl eines Analysators. Technische Details zu den Komponenten eines Analysators und zum Hinzufügen von Analysatorparametern finden Sie unter <a href="/docs/de/analyzer-overview.md">„Analysator-Übersicht</a>“.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Analysatoren in 2 Minuten verstehen<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus verarbeitet ein Analysator den in diesem Feld gespeicherten Text, um ihn für Funktionen wie <a href="/docs/de/full-text-search.md">die Volltextsuche</a> (BM25), <a href="/docs/de/phrase-match.md">die Phrasenübereinstimmung</a> oder <a href="/docs/de/keyword-match.md">die Textübereinstimmung</a> durchsuchbar zu machen. Stellen Sie sich einen Textprozessor vor, der Ihre Rohdaten in durchsuchbare Tokens umwandelt.</p>
<p>Ein Analysator arbeitet in einer einfachen, zweistufigen Pipeline:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>Analyzer-Workflow</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenisierung (erforderlich):</strong> In dieser ersten Stufe wird ein <strong>Tokenizer</strong> angewendet, um eine fortlaufende Textzeichenfolge in diskrete, aussagekräftige Einheiten, sogenannte Token, aufzuteilen. Die Tokenisierungsmethode kann je nach Sprache und Inhaltstyp erheblich variieren.</p></li>
<li><p><strong>Token-Filterung (optional):</strong> Nach der Tokenisierung werden <strong>Filter</strong> angewendet, um die Token zu modifizieren, zu entfernen oder zu verfeinern. Zu diesen Vorgängen gehören beispielsweise die Umwandlung aller Token in Kleinbuchstaben, das Entfernen häufiger, bedeutungsloser Wörter (sogenannter Stoppwörter) oder die Reduzierung von Wörtern auf ihre Stammform (Stemming).</p></li>
</ol>
<p><strong>Beispiel</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Warum die Wahl des Analysators wichtig ist<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Wahl eines falschen Analysators kann dazu führen, dass relevante Dokumente nicht mehr auffindbar sind oder irrelevante Ergebnisse zurückgegeben werden.</p>
<p>Die folgende Tabelle fasst häufige Probleme zusammen, die durch eine unsachgemäße Auswahl des Analysators verursacht werden, und bietet umsetzbare Lösungen zur Diagnose von Suchproblemen.</p>
<table>
   <tr>
     <th><p>Problem</p></th>
     <th><p>Symptom</p></th>
     <th><p>Beispiel (Eingabe &amp; Ausgabe)</p></th>
     <th><p>Ursache (ungeeigneter Analysator)</p></th>
     <th><p>Lösung (geeigneter Analysator)</p></th>
   </tr>
   <tr>
     <td><p>Übermäßige Tokenisierung</p></td>
     <td><p>Textabfragen nach Fachbegriffen, Bezeichnern oder URLs finden keine relevanten Dokumente.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/de/standard-analyzer.md"><code translate="no">standard</code></a> Analysator</p></td>
     <td><p>Verwenden Sie einen <a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> Tokenizer; kombinieren Sie diesen mit einem <a href="/docs/de/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> Filter.</p></td>
   </tr>
   <tr>
     <td><p>Unter-Tokenisierung</p></td>
     <td><p>Die Suche nach einem Bestandteil einer aus mehreren Wörtern bestehenden Phrase liefert keine Dokumente, die die vollständige Phrase enthalten.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analysator mit einem <a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> Tokenizer</p></td>
     <td><p>Verwenden Sie einen <a href="/docs/de/standard-tokenizer.md"><code translate="no">standard</code></a> Tokenizer, um anhand von Satzzeichen und Leerzeichen zu trennen; verwenden Sie einen benutzerdefinierten <a href="/docs/de/regex-filter.md">Regex</a> -Filter.</p></td>
   </tr>
   <tr>
     <td><p>Sprachliche Unstimmigkeiten</p></td>
     <td><p>Die Suchergebnisse für eine bestimmte Sprache sind unsinnig oder fehlen gänzlich.</p></td>
     <td><p>Chinesischer Text: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (ein Token)</p></td>
     <td><p><a href="/docs/de/english-analyzer.md"><code translate="no">english</code></a> Analysator</p></td>
     <td><p>Verwenden Sie einen sprachspezifischen Analysator, wie z. B. <a href="/docs/de/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>Nicht übereinstimmende Eingabemethode</p></td>
     <td><p>Benutzer geben Pinyin ein, der indizierte Text enthält jedoch chinesische Schriftzeichen.</p></td>
     <td><p>Chinesischer Text: <code translate="no">"足球"</code>; Suchtext: <code translate="no">"zuqiu"</code></p></td>
     <td><p>Analysator, der ausschließlich Token mit chinesischen Schriftzeichen ausgibt</p></td>
     <td><p>Verwenden Sie einen benutzerdefinierten Analysator mit dem <a href="/docs/de/jieba-tokenizer.md"><code translate="no">jieba</code></a> Tokenizer und <a href="/docs/de/pinyin-filter.md"><code translate="no">pinyin</code></a> Filter.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Erste Frage: Müssen Sie einen Analysator auswählen?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>In vielen Anwendungsfällen müssen Sie nichts Besonderes tun. Lassen Sie uns klären, ob dies auch auf Sie zutrifft.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Standardverhalten: „ <code translate="no">standard</code> “-Analysator<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie bei der Verwendung von Textabruf-Funktionen wie der Volltextsuche keinen Analysator angeben, verwendet Milvus automatisch den <a href="/docs/de/standard-analyzer.md"><code translate="no">standard</code></a> Analysator.</p>
<p>Der „ <code translate="no">standard</code> “-Analysator:</p>
<ul>
<li><p>Teilt den Text anhand von Leerzeichen und Satzzeichen auf</p></li>
<li><p>Wandelt alle Token in Kleinbuchstaben um</p></li>
<li><p>Entfernt eine integrierte Liste gängiger englischer Stoppwörter sowie den Großteil der Satzzeichen</p></li>
</ul>
<p><strong>Beispiel für eine Transformation</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Entscheidungskriterien: Eine schnelle Überprüfung<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Anhand dieser Tabelle können Sie schnell feststellen, ob der Standard-Analysator „ <code translate="no">standard</code> “ Ihren Anforderungen entspricht. Ist dies nicht der Fall, müssen Sie einen anderen Weg wählen.</p>
<table>
   <tr>
     <th><p>Ihr Inhalt</p></th>
     <th><p>Ist der Standard-Analyzer geeignet?</p></th>
     <th><p>Warum</p></th>
     <th><p>Was Sie benötigen</p></th>
   </tr>
   <tr>
     <td><p>Englische Blogbeiträge</p></td>
     <td><p>✅ Ja</p></td>
     <td><p>Das Standardverhalten ist ausreichend.</p></td>
     <td><p>Verwenden Sie die Standardeinstellung (keine Konfiguration erforderlich).</p></td>
   </tr>
   <tr>
     <td><p>Chinesische Dokumente</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Chinesische Wörter enthalten keine Leerzeichen und werden als ein Token behandelt.</p></td>
     <td><p>Verwenden Sie einen integrierten <a href="/docs/de/chinese-analyzer.md"><code translate="no">chinese</code></a> Analysator.</p></td>
   </tr>
   <tr>
     <td><p>Arabische Dokumente</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Arabischer Text kann Buchstabenvarianten, diakritische Zeichen, Tatweel, arabisch-indische Ziffern und gängige arabische Stoppwörter enthalten, die eine sprachspezifische Behandlung erfordern.</p></td>
     <td><p>Verwenden Sie einen integrierten <a href="/docs/de/arabic-analyzer.md"><code translate="no">arabic</code></a> Analysator.</p></td>
   </tr>
   <tr>
     <td><p>Thailändische Dokumente</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Thailändischer Text verwendet in der Regel keine Leerzeichen zwischen den Wörtern, daher ist eine sprachspezifische Worttrennung erforderlich.</p></td>
     <td><p>Verwenden Sie einen integrierten <a href="/docs/de/thai-analyzer.md"><code translate="no">thai</code></a> Analysator.</p></td>
   </tr>
   <tr>
     <td><p>Technische Dokumentation</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Zeichen wie „ <code translate="no">C++</code> “ werden von den Begriffen entfernt.</p></td>
     <td><p>Erstellen Sie einen benutzerdefinierten Analysator mit einem <a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> Tokenizer und einem <a href="/docs/de/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> Filter.</p></td>
   </tr>
   <tr>
     <td><p>Sprachen mit durch Leerzeichen getrennten Wörtern, wie z. B. Französisch oder Spanisch</p></td>
     <td><p>⚠️ Möglicherweise</p></td>
     <td><p>werden Zeichen mit Akzenten (<code translate="no">café</code> vs. <code translate="no">cafe</code>) möglicherweise nicht abgeglichen.</p></td>
     <td><p>Ein benutzerdefinierter Analysator mit dem <a href="/docs/de/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> wird für bessere Ergebnisse empfohlen.</p></td>
   </tr>
   <tr>
     <td><p>Mehrsprachige oder unbekannte Sprachen</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Dem Analyzer „ <code translate="no">standard</code> “ fehlt die sprachspezifische Logik, die für die Verarbeitung unterschiedlicher Zeichensätze und Tokenisierungsregeln erforderlich ist.</p></td>
     <td><p>Verwenden Sie einen benutzerdefinierten Analysator mit dem <a href="/docs/de/icu-tokenizer.md"><code translate="no">icu</code></a> Tokenizer für eine Unicode-fähige Tokenisierung. </p><p>Alternativ sollten Sie die Konfiguration <a href="/docs/de/multi-language-analyzers.md">mehrsprachiger Analysatoren</a> oder eines <a href="/docs/de/language-identifier.md">Sprachidentifikators</a> in Betracht ziehen, um mehrsprachige Inhalte präziser zu verarbeiten.</p></td>
   </tr>
</table>
<p>Wenn der standardmäßige „ <code translate="no">standard</code> “-Analysator Ihre Anforderungen nicht erfüllen kann, müssen Sie einen anderen implementieren. Dabei stehen Ihnen zwei Möglichkeiten zur Verfügung:</p>
<ul>
<li><p><a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Verwendung eines integrierten Analysators</a> oder</p></li>
<li><p><a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Erstellen eines benutzerdefinierten Analysators</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Möglichkeit A: Verwendung integrierter Analysatoren<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Integrierte Analysatoren sind vorkonfigurierte Lösungen für gängige Sprachen. Sie sind der einfachste Einstieg, wenn der Standard-Analysator nicht optimal passt.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Verfügbare integrierte Analysatoren<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
     <th><p>Analysator</p></th>
     <th><p>Unterstützte Sprache</p></th>
     <th><p>Komponenten</p></th>
     <th><p>Hinweise</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Die meisten Sprachen mit Leerzeichen als Trennzeichen (Englisch, Französisch, Deutsch, Spanisch usw.)</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Allgemeiner Analysator für die erste Textverarbeitung. Für einsprachige Szenarien bieten sprachspezifische Analysatoren (wie <code translate="no">english</code>) eine bessere Leistung.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Speziell für Englisch entwickelt, wendet Stemming und das Entfernen von Stoppwörtern an, um eine bessere semantische Übereinstimmung im Englischen zu erzielen</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Empfohlen für rein englischsprachige Inhalte anstelle von <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Chinesisch</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">jieba</code></p></li><li><p>Filter: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Verwendet derzeit standardmäßig das Wörterbuch für vereinfachtes Chinesisch.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>Arabisch</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">arabic_normalization</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Empfohlen für arabischen Text anstelle von <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Thai</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">thai</code></p></li><li><p>Filter: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Empfohlen für thailändischen Text anstelle von <code translate="no">standard</code> oder einer auf Leerzeichen basierenden Tokenisierung.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Implementierungsbeispiel<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Um einen integrierten Analysator zu verwenden, geben Sie bei der Definition Ihres Feldschemas einfach dessen Typ im Feld „ <code translate="no">analyzer_params</code> “ an.</p>
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
<p>Ausführliche Informationen zur Verwendung finden Sie unter <a href="/docs/de/full-text-search.md">„Volltextsuche“</a>, <a href="/docs/de/keyword-match.md">„Textübereinstimmung</a>“ oder <a href="/docs/de/phrase-match.md">„Phrasenübereinstimmung</a>“.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Möglichkeit B: Erstellen eines benutzerdefinierten Analysators<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">die integrierten Optionen</a> Ihren Anforderungen nicht entsprechen, können Sie einen benutzerdefinierten Analysator erstellen, indem Sie einen Tokenizer mit einer Reihe von Filtern kombinieren. Dadurch erhalten Sie die volle Kontrolle über die Textverarbeitungs-Pipeline.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Schritt 1: Wählen Sie den Tokenizer entsprechend der Sprache aus<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Wählen Sie Ihren Tokenizer entsprechend der Hauptsprache Ihrer Inhalte aus:</p>
<h4 id="Western-languages" class="common-anchor-header">Westliche Sprachen</h4><p>Für Sprachen, in denen mit Leerzeichen getrennt wird, stehen Ihnen folgende Optionen zur Verfügung:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>So funktioniert es</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Teilt Text anhand von Leerzeichen und Satzzeichen auf</p></td>
     <td><p>Allgemeiner Text, gemischte Zeichensetzung</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Ausgabe: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Teilt nur an Leerzeichen</p></td>
     <td><p>Vorverarbeiteter Inhalt, vom Benutzer formatierter Text</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Ausgabe: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Ostasiatische Sprachen</h4><p>Sprachen, in denen Leerzeichen zwischen Wörtern nicht einheitlich verwendet werden, erfordern spezielle Tokenizer für eine korrekte Worttrennung:</p>
<h5 id="Chinese" class="common-anchor-header">Chinesisch</h5><table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>So funktioniert es</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Chinesische, auf einem Wörterbuch basierende Segmentierung mit intelligentem Algorithmus</p></td>
     <td><p><strong>Empfohlen für chinesische Inhalte</strong> – kombiniert ein Wörterbuch mit intelligenten Algorithmen, die speziell für Chinesisch entwickelt wurden</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Ausgabe: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Reine, auf einem Wörterbuch basierende morphologische Analyse mit chinesischem Wörterbuch (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>Im Vergleich zu <code translate="no">jieba</code> verarbeitet diese Methode chinesischen Text auf allgemeinere Weise</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"机器学习算法"</code></p></li><li><p>Ausgabe: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">Thai</h5><p>Für die meisten thailändischen Texte verwenden Sie den integrierten <a href="/docs/de/thai-analyzer.md"><code translate="no">thai</code></a> Analysator. Verwenden Sie den eigenständigen <a href="/docs/de/thai-tokenizer.md"><code translate="no">thai</code></a> Tokenizer nur, wenn Sie eine benutzerdefinierte Analysator-Pipeline erstellen müssen.</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>So funktioniert es</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Teilt thailändischen Text in Wort-Token auf und filtert Segmente heraus, die nur aus Leerzeichen und Satzzeichen bestehen</p></td>
     <td><p>Benutzerdefinierte Analysator-Pipelines für thailändischen oder gemischten thailändisch-englischen Text</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>Ausgabe: <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Japanisch und Koreanisch</h5><table>
   <tr>
     <th><p>Sprache</p></th>
     <th><p>Tokenizer</p></th>
     <th><p>Wörterbuchoptionen</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p>Japanisch</p></td>
     <td><p><a href="/docs/de/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (Allzweck), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (moderne Begriffe), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (akademisch)</p></td>
     <td><p>Morphologische Analyse mit Behandlung von Eigennamen</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"東京都渋谷区"</code></p></li><li><p>Ausgabe: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Koreanisch</p></td>
     <td><p><a href="/docs/de/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Koreanische morphologische Analyse</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"안녕하세요"</code></p></li><li><p>Ausgabe: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Mehrsprachige oder unbekannte Sprachen</h4><p>Für Inhalte, bei denen die Sprachen nicht vorhersehbar sind oder innerhalb von Dokumenten gemischt vorkommen:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>So funktioniert es</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Unicode-fähige Tokenisierung (International Components for Unicode)</p></td>
     <td><p>Gemischte Schriftsysteme, unbekannte Sprachen oder wenn eine einfache Tokenisierung ausreicht</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Ausgabe: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Wann sollte icu verwendet werden</strong>:</p>
<ul>
<li><p>Bei gemischten Sprachen, bei denen eine Sprachidentifizierung nicht praktikabel ist.</p></li>
<li><p>Sie möchten den Mehraufwand durch <a href="/docs/de/multi-language-analyzers.md">mehrsprachige Analysatoren</a> oder den <a href="/docs/de/language-identifier.md">Sprachidentifikator</a> vermeiden.</p></li>
<li><p>Der Inhalt hat eine Hauptsprache mit vereinzelten Fremdwörtern, die kaum zur Gesamtbedeutung beitragen (z. B. englischer Text mit vereinzelten Markennamen oder Fachbegriffen auf Japanisch oder Französisch).</p></li>
</ul>
<p><strong>Alternative Ansätze</strong>: Für eine präzisere Verarbeitung mehrsprachiger Inhalte sollten Sie den Einsatz von Mehrsprachenanalysatoren oder des Sprachidentifikators in Betracht ziehen. Weitere Informationen finden Sie unter <a href="/docs/de/multi-language-analyzers.md">„Mehrsprachenanalysatoren</a> “ oder <a href="/docs/de/language-identifier.md">„Sprachidentifikator</a>“.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Schritt 2: Fügen Sie Filter für eine höhere Präzision hinzu<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">Sie Ihren Tokenizer ausgewählt haben</a>, wenden Sie Filter an, die auf Ihren spezifischen Suchanforderungen und den Eigenschaften des Inhalts basieren.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Häufig verwendete Filter</h4><p>Diese Filter sind für die meisten durch Leerzeichen getrennten Sprachkonfigurationen (Englisch, Französisch, Deutsch, Spanisch usw.) unverzichtbar und verbessern die Suchqualität erheblich:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>So funktioniert es</p></th>
     <th><p>Wann zu verwenden</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Alle Token in Kleinbuchstaben umwandeln</p></td>
     <td><p>Universell – gilt für alle Sprachen mit Groß-/Kleinschreibung</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Ausgabe: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Wörter auf ihre Grundform reduzieren</p></td>
     <td><p>Sprachen mit Wortbeugung (Englisch, Französisch, Deutsch usw.)</p></td>
     <td><p>Für Englisch:</p><ul><li><p>Eingabe: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Ausgabe: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Entferne häufig vorkommende, bedeutungslose Wörter</p></td>
     <td><p>Die meisten Sprachen – besonders effektiv bei Sprachen mit Leerzeichen als Trennzeichen</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Ausgabe: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Bei ostasiatischen Sprachen (Chinesisch, Japanisch, Koreanisch usw.) sollten Sie sich stattdessen auf <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">sprachspezifische Filter</a> konzentrieren. Diese Sprachen verwenden in der Regel andere Ansätze zur Textverarbeitung und profitieren möglicherweise nicht wesentlich vom Stemming.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Filter zur Textnormalisierung</h4><p>Diese Filter standardisieren Textvariationen, um die Konsistenz beim Abgleich zu verbessern:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Funktionsweise</p></th>
     <th><p>Anwendungsfälle</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Umwandlung von Zeichen mit Akzenten in ASCII-Entsprechungen</p></td>
     <td><p>Internationale Inhalte, nutzergenerierte Inhalte</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Ausgabe: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Token-Filterung</h4><p>Steuern Sie anhand des Zeicheninhalts oder der Länge, welche Token beibehalten werden:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>So funktioniert es</p></th>
     <th><p>Anwendungsfälle</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Einzelne Interpunktionszeichen entfernen</p></td>
     <td><p>Bereinigt die Ausgabe der Tokenizer <code translate="no">jieba</code>, <code translate="no">lindera</code> und <code translate="no">icu</code>, die Satzzeichen als einzelne Token zurückgeben</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Ausgabe: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Nur Buchstaben und Zahlen beibehalten</p></td>
     <td><p>Technische Inhalte, bereinigte Textverarbeitung</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Ausgabe: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Entferne Token außerhalb des angegebenen Längenbereichs</p></td>
     <td><p>Rauschen filtern (übermäßig lange Token)</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Ausgabe: <code translate="no">[['a'], ['very'], []]</code> (wenn <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Benutzerdefinierte, musterbasierte Filterung</p></td>
     <td><p>Domänenspezifische Anforderungen an Token</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Ausgabe: <code translate="no">[[], ['prod456']]</code> (wenn <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Sprachspezifische Filter</h4><p>Diese Filter berücksichtigen spezifische Sprachmerkmale:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Sprache</p></th>
     <th><p>Funktionsweise</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Deutsch</p></td>
     <td><p>Teilt zusammengesetzte Wörter in durchsuchbare Bestandteile auf</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Ausgabe: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Chinesisch</p></td>
     <td><p>Behält chinesische Schriftzeichen + alphanumerische Zeichen bei</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Ausgabe: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Chinesisch</p></td>
     <td><p>Behält nur chinesische Schriftzeichen bei</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Ausgabe: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>Chinesisch</p></td>
     <td><p>Gibt Pinyin-Tokenformen für chinesische Token aus</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["中文"]</code></p></li><li><p>Ausgabe: <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Schritt 3: Kombinieren und implementieren<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Um Ihren benutzerdefinierten Analysator zu erstellen, definieren Sie den Tokenizer und eine Liste von Filtern im Wörterbuch „ <code translate="no">analyzer_params</code> “. Die Filter werden in der Reihenfolge angewendet, in der sie aufgeführt sind.</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Abschließend: Testen mit <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Überprüfen Sie Ihre Konfiguration immer, bevor Sie sie auf eine Sammlung anwenden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Häufige Probleme, die Sie überprüfen sollten:</p>
<ul>
<li><p><strong>Übermäßige Tokenisierung</strong>: Fachbegriffe werden falsch aufgeteilt</p></li>
<li><p><strong>Unter-Tokenisierung</strong>: Phrasen werden nicht ordnungsgemäß getrennt</p></li>
<li><p><strong>Fehlende Token</strong>: Wichtige Begriffe werden herausgefiltert</p></li>
</ul>
<p>Ausführliche Informationen zur Verwendung finden Sie unter ` <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer`</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Empfohlene Konfigurationen nach Anwendungsfall<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt enthält empfohlene Konfigurationen für Tokenizer und Filter für gängige Anwendungsfälle bei der Arbeit mit Analysatoren in Milvus. Wählen Sie die Kombination, die am besten zu Ihrem Inhaltstyp und Ihren Suchanforderungen passt.</p>
<div class="alert note">
<p>Bevor Sie einen Analysator auf Ihre Sammlung anwenden, empfehlen wir Ihnen, <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> , um die Leistung der Textanalyse zu testen und zu überprüfen.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Sprachen mit Akzenten (Französisch, Spanisch, Deutsch usw.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie einen „ <code translate="no">standard</code> “-Tokenizer mit Umwandlung in Kleinbuchstaben, sprachspezifischem Stemming und Stopwort-Entfernung. Diese Konfiguration funktioniert auch für andere europäische Sprachen, indem Sie die Parameter „ <code translate="no">language</code> “ und „ <code translate="no">stop_words</code> “ anpassen.</p>
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
<h3 id="English-content" class="common-anchor-header">Englische Inhalte<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Für die Verarbeitung englischer Texte mit umfassender Filterung. Sie können auch den integrierten <a href="/docs/de/english-analyzer.md"><code translate="no">english</code></a> Analysator verwenden:</p>
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
<h3 id="Chinese-content" class="common-anchor-header">Chinesische Inhalte<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie den Tokenizer „ <code translate="no">jieba</code> “ und wenden Sie einen Zeichenfilter an, um nur chinesische Schriftzeichen, lateinische Buchstaben und Ziffern beizubehalten.</p>
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
<p>Bei vereinfachtem Chinesisch entfernt „ <code translate="no">cnalphanumonly</code> “ alle Token mit Ausnahme von chinesischen Schriftzeichen, alphanumerischem Text und Ziffern. Dadurch wird verhindert, dass Satzzeichen die Suchqualität beeinträchtigen.</p>
</div>
<p>Falls Nutzer chinesischen Text durch Eingabe von Pinyin suchen können, verwenden Sie einen benutzerdefinierten Analysator mit dem Tokenizer „ <code translate="no">jieba</code> “ und dem <a href="/docs/de/pinyin-filter.md"><code translate="no">pinyin</code></a> Filter anstelle des integrierten „ <code translate="no">chinese</code> “-Analysators.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">Japanische Inhalte<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie den Tokenizer „ <code translate="no">lindera</code> “ mit japanischem Wörterbuch und Filtern, um Satzzeichen zu entfernen und die Tokenlänge zu steuern:</p>
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
<h3 id="Korean-content" class="common-anchor-header">Koreanische Inhalte<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Ähnlich wie bei Japanisch verwenden Sie den „ <code translate="no">lindera</code> “-Tokenizer mit dem koreanischen Wörterbuch:</p>
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
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Gemischte oder mehrsprachige Inhalte<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie mit Inhalten arbeiten, die mehrere Sprachen umfassen oder unvorhersehbare Schriftsysteme verwenden, beginnen Sie mit dem „ <code translate="no">icu</code> “-Analysator. Dieser Unicode-fähige Analysator verarbeitet gemischte Schriftsysteme und Symbole effektiv.</p>
<p><strong>Grundlegende mehrsprachige Konfiguration (ohne Stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Erweiterte mehrsprachige Verarbeitung</strong>:</p>
<p>Für eine bessere Kontrolle über das Token-Verhalten in verschiedenen Sprachen:</p>
<ul>
<li><p>Verwenden Sie eine Konfiguration <strong>für mehrsprachige Analysatoren</strong>. Weitere Informationen finden Sie unter <a href="/docs/de/multi-language-analyzers.md">„Mehrsprachige Analysatoren</a>“.</p></li>
<li><p>Implementieren Sie einen <strong>Sprachidentifikator</strong> in Ihren Inhalten. Weitere Informationen finden Sie unter <a href="/docs/de/language-identifier.md">„Sprachidentifikator</a>“.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integration mit Funktionen zur Textsuche<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Ihren Analysator ausgewählt haben, können Sie ihn in die von Milvus bereitgestellten Funktionen zur Textsuche integrieren.</p>
<ul>
<li><p><strong>Volltextsuche</strong></p>
<p>Analysatoren wirken sich durch die Erzeugung spärlicher Vektoren direkt auf die BM25-basierte Volltextsuche aus. Verwenden Sie denselben Analysator sowohl für die Indizierung als auch für die Abfrage, um eine konsistente Tokenisierung sicherzustellen. Sprachspezifische Analysatoren liefern im Allgemeinen bessere BM25-Bewertungen als generische. Details zur Implementierung finden Sie unter <a href="/docs/de/full-text-search.md">„Volltextsuche</a>“.</p></li>
<li><p><strong>Textabgleich</strong></p>
<p>Textabgleich-Operationen führen auf der Grundlage der Ausgabe Ihres Analysators einen exakten Token-Abgleich zwischen Abfragen und indiziertem Inhalt durch. Details zur Implementierung finden Sie unter <a href="/docs/de/keyword-match.md">„Textabgleich</a>“.</p></li>
<li><p><strong>Phrasenabgleich</strong></p>
<p>Der Phrasenabgleich erfordert eine konsistente Tokenisierung über mehrwortige Ausdrücke hinweg, um Phrasengrenzen und Bedeutung zu bewahren. Details zur Implementierung finden Sie unter <a href="/docs/de/phrase-match.md">„Phrasenabgleich</a>“.</p></li>
</ul>
