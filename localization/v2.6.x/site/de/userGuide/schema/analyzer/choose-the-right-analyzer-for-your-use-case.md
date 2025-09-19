---
id: choose-the-right-analyzer-for-your-use-case.md
title: Wählen Sie den richtigen Analyzer für Ihren Anwendungsfall
summary: Anmerkungen
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Wählen Sie den richtigen Analyzer für Ihren Anwendungsfall<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>Dieser Leitfaden konzentriert sich auf die praktische Entscheidungsfindung bei der Auswahl eines Analysators. Technische Details zu Analysator-Komponenten und zum Hinzufügen von Analysator-Parametern finden Sie im Abschnitt <a href="/docs/de/analyzer-overview.md">Analysator-Übersicht</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Analyzer in 2 Minuten verstehen<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus verarbeitet ein Analysator den in diesem Feld gespeicherten Text, um ihn für Funktionen wie <a href="/docs/de/full-text-search.md">Volltextsuche</a> (BM25), <a href="/docs/de/phrase-match.md">Phrasenübereinstimmung</a> oder <a href="/docs/de/keyword-match.md">Textübereinstimmung</a> durchsuchbar zu machen. Betrachten Sie ihn als einen Textprozessor, der Ihren Rohinhalt in durchsuchbare Token umwandelt.</p>
<p>Ein Analyzer arbeitet in einer einfachen, zweistufigen Pipeline:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>Analyzer Arbeitsablauf</span> </span></p>
<ol>
<li><p><strong>Tokenisierung (erforderlich):</strong> In dieser ersten Phase wird ein <strong>Tokenizer</strong> eingesetzt, um eine fortlaufende Textkette in diskrete, aussagekräftige Einheiten, so genannte Token, zu zerlegen. Die Tokenisierungsmethode kann je nach Sprache und Inhaltstyp erheblich variieren.</p></li>
<li><p><strong>Token-Filterung (optional):</strong> Nach der Tokenisierung werden <strong>Filter</strong> angewendet, um die Token zu ändern, zu entfernen oder zu verfeinern. Diese Operationen können die Umwandlung aller Token in Kleinbuchstaben, das Entfernen von bedeutungslosen Wörtern (z. B. Stoppwörter) oder die Reduzierung von Wörtern auf ihre Stammform (Stemming) umfassen.</p></li>
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
    </button></h2><p>Die Wahl des falschen Analysators kann dazu führen, dass relevante Dokumente nicht durchsuchbar sind oder irrelevante Ergebnisse geliefert werden.</p>
<p>Die folgende Tabelle fasst häufige Probleme zusammen, die durch die falsche Wahl des Analyzers verursacht werden, und bietet umsetzbare Lösungen für die Diagnose von Suchproblemen.</p>
<table>
   <tr>
     <th><p>Problem</p></th>
     <th><p>Symptom</p></th>
     <th><p>Beispiel (Input &amp; Output)</p></th>
     <th><p>Ursache (schlechter Analyzer)</p></th>
     <th><p>Lösung (guter Analyzer)</p></th>
   </tr>
   <tr>
     <td><p>Über-Tokenisierung</p></td>
     <td><p>Bei Textabfragen nach Fachbegriffen, Bezeichnern oder URLs werden relevante Dokumente nicht gefunden.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/de/standard-analyzer.md"><code translate="no">standard</code></a> Analysator</p></td>
     <td><p>Verwenden Sie einen <a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> Tokenizer; kombiniert mit einem <a href="/docs/de/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> Filter.</p></td>
   </tr>
   <tr>
     <td><p>Unter-Tokenisierung</p></td>
     <td><p>Die Suche nach einer Komponente einer Mehrwortphrase führt nicht zu Dokumenten, die die vollständige Phrase enthalten.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analyzer mit einem <a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> Tokenisierer</p></td>
     <td><p>Verwenden Sie einen <a href="/docs/de/standard-tokenizer.md"><code translate="no">standard</code></a> Tokenizer, um Interpunktion und Leerzeichen aufzuspalten; verwenden Sie einen benutzerdefinierten <a href="/docs/de/regex-filter.md">Regex-Filter</a>.</p></td>
   </tr>
   <tr>
     <td><p>Sprachliche Unstimmigkeiten</p></td>
     <td><p>Die Suchergebnisse für eine bestimmte Sprache sind unsinnig oder nicht vorhanden.</p></td>
     <td><p>Chinesischer Text: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (ein Token)</p></td>
     <td><p><a href="/docs/de/english-analyzer.md"><code translate="no">english</code></a> Analysator</p></td>
     <td><p>Verwenden Sie einen sprachspezifischen Analyzer, wie z. B. <a href="/docs/de/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Erste Frage: Müssen Sie einen Analyzer auswählen?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Für viele Anwendungsfälle brauchen Sie nichts Besonderes zu tun. Lassen Sie uns herausfinden, ob Sie einer von ihnen sind.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Standardverhalten: <code translate="no">standard</code> analyzer<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie bei der Verwendung von Textsuchfunktionen wie der Volltextsuche keinen Analyzer angeben, verwendet Milvus automatisch den <a href="/docs/de/standard-analyzer.md"><code translate="no">standard</code></a> Analysator.</p>
<p>Der <code translate="no">standard</code> Analyzer:</p>
<ul>
<li><p>Teilt Text an Leerzeichen und Interpunktion</p></li>
<li><p>Konvertiert alle Token in Kleinbuchstaben</p></li>
<li><p>Entfernt einen eingebauten Satz gängiger englischer Stoppwörter und die meisten Interpunktionszeichen</p></li>
</ul>
<p><strong>Beispiel einer Umwandlung</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Entscheidungskriterien: Eine schnelle Prüfung<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Anhand dieser Tabelle können Sie schnell feststellen, ob der Standard-Analysator <code translate="no">standard</code> Ihren Anforderungen entspricht. Wenn dies nicht der Fall ist, müssen Sie einen anderen Weg wählen.</p>
<table>
   <tr>
     <th><p>Ihr Inhalt</p></th>
     <th><p>Standard-Analysator OK?</p></th>
     <th><p>Warum</p></th>
     <th><p>Was Sie brauchen</p></th>
   </tr>
   <tr>
     <td><p>Englische Blogbeiträge</p></td>
     <td><p>✅ Ja</p></td>
     <td><p>Standardverhalten ist ausreichend.</p></td>
     <td><p>Verwenden Sie die Standardeinstellung (keine Konfiguration erforderlich).</p></td>
   </tr>
   <tr>
     <td><p>Chinesische Dokumente</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Chinesische Wörter haben keine Leerzeichen und werden als ein Token behandelt.</p></td>
     <td><p>Verwenden Sie einen eingebauten <a href="/docs/de/chinese-analyzer.md"><code translate="no">chinese</code></a> Analysator.</p></td>
   </tr>
   <tr>
     <td><p>Technische Dokumentation</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Interpunktion wird aus Begriffen wie <code translate="no">C++</code> entfernt.</p></td>
     <td><p>Erstellen Sie einen eigenen Analyzer mit einem <a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> Tokenizer und einem <a href="/docs/de/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> Filter.</p></td>
   </tr>
   <tr>
     <td><p>Durch Leerzeichen getrennte Sprachen wie z.B. französischer/spanischer Text</p></td>
     <td><p>⚠️ Vielleicht</p></td>
     <td><p>Akzentuierte Zeichen (<code translate="no">café</code> vs. <code translate="no">cafe</code>) stimmen möglicherweise nicht überein.</p></td>
     <td><p>Ein benutzerdefinierter Analyzer mit dem <a href="/docs/de/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> wird für bessere Ergebnisse empfohlen.</p></td>
   </tr>
   <tr>
     <td><p>Mehrsprachige oder unbekannte Sprachen</p></td>
     <td><p>❌ Nein</p></td>
     <td><p>Dem Analyseprogramm <code translate="no">standard</code> fehlt die sprachspezifische Logik, die für die Behandlung unterschiedlicher Zeichensätze und Tokenisierungsregeln erforderlich ist.</p></td>
     <td><p>Verwenden Sie einen eigenen Analyzer mit dem <a href="/docs/de/icu-tokenizer.md"><code translate="no">icu</code></a> Tokenizer für Unicode-fähige Tokenisierung. </p><p>Alternativ können Sie auch <a href="/docs/de/multi-language-analyzers.md">mehrsprachige Analysatoren</a> oder einen <a href="/docs/de/language-identifier.md">Sprachidentifikator</a> für eine präzisere Behandlung mehrsprachiger Inhalte konfigurieren.</p></td>
   </tr>
</table>
<p>Wenn der standardmäßige <code translate="no">standard</code> Analyzer Ihre Anforderungen nicht erfüllen kann, müssen Sie einen anderen Analyzer implementieren. Sie haben zwei Möglichkeiten:</p>
<ul>
<li><p><a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Verwendung eines eingebauten Analyzers</a> oder</p></li>
<li><p><a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Erstellen eines eigenen Analysators</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Weg A: Integrierte Analysatoren verwenden<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Integrierte Analyzer sind vorkonfigurierte Lösungen für gängige Sprachen. Sie sind der einfachste Weg für den Einstieg, wenn der Standard-Analysator nicht perfekt passt.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Verfügbare integrierte Analyzer<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
     <th><p>Analyzer</p></th>
     <th><p>Sprachunterstützung</p></th>
     <th><p>Komponenten</p></th>
     <th><p>Hinweise</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Die meisten durch Leerzeichen getrennten Sprachen (Englisch, Französisch, Deutsch, Spanisch, usw.)</p></td>
     <td><ul><li><p>Tokenisierer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Allzweck-Analysator für die erste Textverarbeitung. Für einsprachige Szenarien bieten sprachspezifische Analysatoren (wie <code translate="no">english</code>) eine bessere Leistung.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Speziell für Englisch, das Stemming und die Entfernung von Stoppwörtern für eine bessere semantische Übereinstimmung mit Englisch anwendet</p></td>
     <td><ul><li><p>Tokenisierer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Empfohlen für rein englische Inhalte über <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Chinesisch</p></td>
     <td><ul><li><p>Tokenisierer: <code translate="no">jieba</code></p></li><li><p>Filter: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Derzeit wird standardmäßig das Wörterbuch für vereinfachtes Chinesisch verwendet.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Beispiel für die Implementierung<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Um einen eingebauten Analyzer zu verwenden, geben Sie einfach seinen Typ in <code translate="no">analyzer_params</code> an, wenn Sie Ihr Feldschema definieren.</p>
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
<p>Detaillierte Informationen zur Verwendung finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>, <a href="/docs/de/keyword-match.md">Textabgleich</a> oder <a href="/docs/de/phrase-match.md">Phrasenabgleich</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Weg B: Erstellen eines benutzerdefinierten Analyzers<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn die <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">integrierten Optionen</a> Ihren Anforderungen nicht genügen, können Sie einen benutzerdefinierten Analyzer erstellen, indem Sie einen Tokenizer mit einer Reihe von Filtern kombinieren. Damit haben Sie die volle Kontrolle über die Textverarbeitungspipeline.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Schritt 1: Wählen Sie den Tokenizer anhand der Sprache aus<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Wählen Sie den Tokenizer auf der Grundlage der Hauptsprache Ihres Inhalts:</p>
<h4 id="Western-languages" class="common-anchor-header">Westliche Sprachen</h4><p>Für durch Leerzeichen getrennte Sprachen haben Sie diese Optionen:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Wie es funktioniert</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Trennt Text anhand von Leerzeichen und Satzzeichen</p></td>
     <td><p>Allgemeiner Text, gemischte Zeichensetzung</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Ausgabe: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Teilt nur nach Leerzeichen auf</p></td>
     <td><p>Vorverarbeiteter Inhalt, benutzerformatierter Text</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Ausgabe: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Ostasiatische Sprachen</h4><p>Wörterbuchbasierte Sprachen erfordern spezielle Tokenizer für eine korrekte Wortsegmentierung:</p>
<h5 id="Chinese" class="common-anchor-header">Chinesisch</h5><table>
   <tr>
     <th><p>Tokenisierer</p></th>
     <th><p>Wie es funktioniert</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Chinesische wörterbuchbasierte Segmentierung mit intelligentem Algorithmus</p></td>
     <td><p><strong>Empfohlen für chinesische Inhalte</strong> - kombiniert Wörterbuch mit intelligenten Algorithmen, speziell für Chinesisch entwickelt</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Ausgabe: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Rein wörterbuchbasierte morphologische Analyse mit chinesischem Wörterbuch<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p>Verarbeitet im Vergleich zu <code translate="no">jieba</code> chinesische Texte auf eine allgemeinere Weise</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"机器学习算法"</code></p></li><li><p>Ausgabe: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Japanisch und Koreanisch</h5><table>
   <tr>
     <th><p>Sprache</p></th>
     <th><p>Tokenisierer</p></th>
     <th><p>Wörterbuch-Optionen</p></th>
     <th><p>Am besten für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p>Japanisch</p></td>
     <td><p><a href="/docs/de/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadisch</a> (allgemeiner Gebrauch), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadisch-neologd</a> (moderne Begriffe), <a href="https://clrd.ninjal.ac.jp/unidic/">unidisch</a> (akademisch)</p></td>
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
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Mehrsprachige oder unbekannte Sprachen</h4><p>Für Inhalte, bei denen die Sprachen nicht vorhersehbar sind oder in den Dokumenten gemischt werden:</p>
<table>
   <tr>
     <th><p>Tokenisierer</p></th>
     <th><p>Wie es funktioniert</p></th>
     <th><p>Am besten für</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Unicode-fähige Tokenisierung (Internationale Komponenten für Unicode)</p></td>
     <td><p>Gemischte Schriften, unbekannte Sprachen, oder wenn einfache Tokenisierung ausreicht</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Ausgabe: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Wann sollte icu verwendet werden</strong>?</p>
<ul>
<li><p>Gemischte Sprachen, bei denen eine Sprachidentifizierung unpraktisch ist.</p></li>
<li><p>Sie wollen den Overhead von <a href="/docs/de/multi-language-analyzers.md">mehrsprachigen Analysatoren</a> oder den <a href="/docs/de/language-identifier.md">Sprachidentifikator</a> nicht haben.</p></li>
<li><p>Der Inhalt besteht aus einer Hauptsprache mit gelegentlichen Fremdwörtern, die wenig zur Gesamtbedeutung beitragen (z. B. englischer Text mit sporadischen Markennamen oder technischen Begriffen auf Japanisch oder Französisch).</p></li>
</ul>
<p><strong>Alternative Ansätze</strong>: Für einen präziseren Umgang mit mehrsprachigem Inhalt sollten Sie die Verwendung von mehrsprachigen Analysatoren oder des Sprachidentifikators in Betracht ziehen. Weitere Informationen finden Sie unter <a href="/docs/de/multi-language-analyzers.md">Mehrsprachige Analysatoren</a> oder <a href="/docs/de/language-identifier.md">Sprachidentifikator</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Schritt 2: Hinzufügen von Filtern für mehr Präzision<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">Sie Ihren Tokenizer ausgewählt haben</a>, wenden Sie Filter an, die auf Ihren spezifischen Suchanforderungen und Inhaltsmerkmalen basieren.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Häufig verwendete Filter</h4><p>Diese Filter sind für die meisten durch Leerzeichen getrennten Sprachkonfigurationen (Englisch, Französisch, Deutsch, Spanisch, usw.) unerlässlich und verbessern die Suchqualität erheblich:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Wie funktioniert es?</p></th>
     <th><p>Wann zu verwenden</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Alle Token in Kleinbuchstaben umwandeln</p></td>
     <td><p>Universal - gilt für alle Sprachen mit Groß- und Kleinschreibung</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Ausgabe: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Wörter auf ihre Stammform reduzieren</p></td>
     <td><p>Sprachen mit Wortbeugungen (Englisch, Französisch, Deutsch, etc.)</p></td>
     <td><p>Für Englisch:</p><ul><li><p>Eingabe: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Ausgabe: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Gemeinsame bedeutungslose Wörter entfernen</p></td>
     <td><p>Die meisten Sprachen - besonders effektiv für Sprachen mit Leerzeichen-Trennung</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Ausgabe: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Bei ostasiatischen Sprachen (Chinesisch, Japanisch, Koreanisch usw.) sollten Sie sich stattdessen auf <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">sprachspezifische Filter</a> konzentrieren. Diese Sprachen verwenden in der Regel andere Ansätze für die Textverarbeitung und profitieren möglicherweise nicht wesentlich vom Stemming.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Textnormalisierungsfilter</h4><p>Diese Filter standardisieren Textvariationen, um die Konsistenz des Abgleichs zu verbessern:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Wie funktioniert er?</p></th>
     <th><p>Wann zu verwenden</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Konvertierung von Zeichen mit Akzent in ASCII-Äquivalente</p></td>
     <td><p>Internationale Inhalte, nutzergenerierte Inhalte</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Ausgabe: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Token-Filterung</h4><p>Steuern Sie, welche Token auf der Grundlage von Zeicheninhalt oder -länge erhalten bleiben:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Wie es funktioniert</p></th>
     <th><p>Wann zu verwenden</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Eigenständige Satzzeichen entfernen</p></td>
     <td><p>Bereinigung der Ausgabe von <code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code> Tokenizern, die Interpunktionen als einzelne Token zurückgeben</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Ausgabe: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Nur Buchstaben und Zahlen behalten</p></td>
     <td><p>Technischer Inhalt, saubere Textverarbeitung</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Ausgabe: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Entfernen von Token außerhalb des angegebenen Längenbereichs</p></td>
     <td><p>Rauschen filtern (übermäßig lange Token)</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Ausgabe: <code translate="no">[['a'], ['very'], []]</code> (wenn <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Benutzerdefinierte musterbasierte Filterung</p></td>
     <td><p>Domänenspezifische Token-Anforderungen</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Ausgabe: <code translate="no">[[], ['prod456']]</code> (wenn <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Sprachspezifische Filter</h4><p>Diese Filter behandeln spezifische Sprachmerkmale:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Sprache</p></th>
     <th><p>Wie es funktioniert</p></th>
     <th><p>Beispiele</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Deutsch</p></td>
     <td><p>Zerlegt zusammengesetzte Wörter in durchsuchbare Komponenten</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Ausgabe: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/cnalphanumonly-filter.md">cnalphanumnur</a></p></td>
     <td><p>Chinesisch</p></td>
     <td><p>Behält chinesische Zeichen + alphanumerische Zeichen bei</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Ausgabe: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Chinesisch</p></td>
     <td><p>Behält nur chinesische Zeichen bei</p></td>
     <td><ul><li><p>Eingabe: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Ausgabe: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
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
    </button></h3><p>Um Ihren eigenen Analysator zu erstellen, definieren Sie den Tokenizer und eine Liste von Filtern im <code translate="no">analyzer_params</code> Wörterbuch. Die Filter werden in der Reihenfolge angewendet, in der sie aufgelistet sind.</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Abschluss: Testen Sie mit <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Überprüfen Sie immer Ihre Konfiguration, bevor Sie sie auf eine Sammlung anwenden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Häufig zu prüfende Probleme:</p>
<ul>
<li><p><strong>Über-Tokenisierung</strong>: Fachbegriffe werden falsch aufgeteilt</p></li>
<li><p><strong>Untertokenisierung</strong>: Phrasen werden nicht richtig getrennt</p></li>
<li><p><strong>Fehlende Token</strong>: Wichtige Begriffe werden herausgefiltert</p></li>
</ul>
<p>Ausführliche Informationen zur Verwendung finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
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
    </button></h2><p>Dieser Abschnitt enthält empfohlene Tokenizer- und Filterkonfigurationen für häufige Anwendungsfälle bei der Arbeit mit Analyzern in Milvus. Wählen Sie die Kombination, die am besten zu Ihrem Inhaltstyp und Ihren Suchanforderungen passt.</p>
<div class="alert note">
<p>Bevor Sie einen Analyzer auf Ihre Sammlung anwenden, empfehlen wir Ihnen die Verwendung von <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> zu verwenden, um die Leistung der Textanalyse zu testen und zu validieren.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Sprachen mit Akzentzeichen (Französisch, Spanisch, Deutsch, etc.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie einen <code translate="no">standard</code> Tokenizer mit Kleinbuchstaben-Konvertierung, sprachspezifischem Stemming und Stoppwort-Entfernung. Diese Konfiguration funktioniert auch für andere europäische Sprachen, indem die Parameter <code translate="no">language</code> und <code translate="no">stop_words</code> geändert werden.</p>
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
<h3 id="English-content" class="common-anchor-header">Englischer Inhalt<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Für englische Textverarbeitung mit umfassender Filterung. Sie können auch den eingebauten <a href="/docs/de/english-analyzer.md"><code translate="no">english</code></a> Analysator verwenden:</p>
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
<h3 id="Chinese-content" class="common-anchor-header">Chinesischer Inhalt<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie den <code translate="no">jieba</code> Tokenizer und wenden Sie einen Zeichenfilter an, um nur chinesische Zeichen, lateinische Buchstaben und Ziffern zu erhalten.</p>
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
<p>Bei vereinfachtem Chinesisch entfernt <code translate="no">cnalphanumonly</code> alle Token außer chinesischen Zeichen, alphanumerischem Text und Ziffern. Dadurch wird verhindert, dass die Interpunktion die Suchqualität beeinträchtigt.</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">Japanischer Inhalt<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie den <code translate="no">lindera</code> Tokenizer mit einem japanischen Wörterbuch und Filtern, um Interpunktion zu entfernen und die Tokenlänge zu kontrollieren:</p>
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
<h3 id="Korean-content" class="common-anchor-header">Koreanischer Inhalt<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Ähnlich wie bei japanischen Inhalten wird der <code translate="no">lindera</code> Tokenizer mit einem koreanischen Wörterbuch verwendet:</p>
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
    </button></h3><p>Wenn Sie mit Inhalten arbeiten, die sich über mehrere Sprachen erstrecken oder Skripte auf unvorhersehbare Weise verwenden, beginnen Sie mit dem <code translate="no">icu</code> Analysator. Dieser Unicode-fähige Analyzer verarbeitet gemischte Schriften und Symbole effektiv.</p>
<p><strong>Einfache mehrsprachige Konfiguration (kein Stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Erweiterte mehrsprachige Verarbeitung</strong>:</p>
<p>Für eine bessere Kontrolle über das Verhalten von Token in verschiedenen Sprachen:</p>
<ul>
<li><p>Verwenden Sie eine <strong>mehrsprachige Analyzer-Konfiguration</strong>. Einzelheiten finden Sie unter <a href="/docs/de/multi-language-analyzers.md">Mehrsprachige Analyzer</a>.</p></li>
<li><p>Implementieren Sie einen <strong>Sprachidentifikator</strong> für Ihren Inhalt. Weitere Informationen finden Sie unter <a href="/docs/de/language-identifier.md">Sprachidentifikator</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integration mit Textabfragefunktionen<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Ihren Analyzer ausgewählt haben, können Sie ihn in die von Milvus bereitgestellten Textsuchfunktionen integrieren.</p>
<ul>
<li><p><strong>Volltextsuche</strong></p>
<p>Analyzer wirken sich direkt auf die BM25-basierte Volltextsuche aus, indem sie einen Sparse-Vektor erzeugen. Verwenden Sie denselben Analyzer sowohl für die Indizierung als auch für die Abfrage, um eine konsistente Tokenisierung zu gewährleisten. Sprachspezifische Analyzer bieten im Allgemeinen eine bessere BM25-Bewertung als generische Analyzer. Einzelheiten zur Implementierung finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p></li>
<li><p><strong>Textabgleich</strong></p>
<p>Textabgleichsoperationen führen einen exakten Tokenabgleich zwischen Abfragen und indiziertem Inhalt auf der Grundlage Ihrer Analysatorausgabe durch. Einzelheiten zur Implementierung finden Sie unter <a href="/docs/de/keyword-match.md">Textabgleich</a>.</p></li>
<li><p><strong>Phrasenabgleich</strong></p>
<p>Der Phrasenabgleich erfordert eine konsistente Tokenisierung von Mehrwortausdrücken, um die Phrasengrenzen und die Bedeutung beizubehalten. Einzelheiten zur Implementierung finden Sie unter <a href="/docs/de/phrase-match.md">Phrasenabgleich</a>.</p></li>
</ul>
