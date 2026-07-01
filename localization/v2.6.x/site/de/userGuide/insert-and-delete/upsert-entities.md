---
id: upsert-entities.md
title: Entitäten einfügen oder aktualisieren
summary: >-
  Die Upsert-Operation bietet eine bequeme Möglichkeit, Entitäten in eine
  Sammlung einzufügen oder zu aktualisieren.
---
<h1 id="Upsert-Entities" class="common-anchor-header">Entitäten einfügen oder aktualisieren<button data-href="#Upsert-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Operation „ <code translate="no">upsert</code> “ bietet eine bequeme Möglichkeit, Entitäten in eine Sammlung einzufügen oder zu aktualisieren.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit „ <code translate="no">upsert</code> “ können Sie entweder eine neue Entität einfügen oder eine bestehende aktualisieren, je nachdem, ob der in der „Upsert“-Anfrage angegebene Primärschlüssel in der Sammlung vorhanden ist. Wird der Primärschlüssel nicht gefunden, erfolgt ein Einfügevorgang. Andernfalls wird ein Aktualisierungsvorgang durchgeführt.</p>
<p>Ein „Upsert“ in Milvus funktioniert entweder im <strong>Überschreib-</strong> oder im <strong>Zusammenführungsmodus</strong>.</p>
<h3 id="Upsert-in-override-mode" class="common-anchor-header">„Upsert“ im „Override“-Modus<button data-href="#Upsert-in-override-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Eine „ <code translate="no">upsert</code> “-Anfrage im „Override“-Modus kombiniert einen Einfügevorgang mit einem Löschvorgang. Wenn eine „ “-Anfrage für eine vorhandene Entität eingeht, fügt Milvus die in der Anfrage-Nutzlast enthaltenen Daten ein und löscht gleichzeitig die vorhandene Entität mit dem in den Daten angegebenen ursprünglichen Primärschlüssel.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/upsert-in-override-mode.png" alt="Upsert In Override Mode" class="doc-image" id="upsert-in-override-mode" /> 
   <span>Upsert im „Override“-Modus</span>
  
 </span></p>
<p>Wenn für das Primärfeld der Zielsammlung „ <code translate="no">autoid</code> “ aktiviert ist, generiert Milvus vor dem Einfügen einen neuen Primärschlüssel für die in der Anforderungsnutzlast enthaltenen Daten.</p>
<p>Felder, für die „ <code translate="no">nullable</code> “ aktiviert ist, können Sie in der „ <code translate="no">upsert</code> “-Anfrage weglassen, sofern sie keine Aktualisierungen erfordern.</p>
<h3 id="Upsert-in-merge-mode--Milvus-v262+" class="common-anchor-header">Upsert im Merge-Modus<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h3><p>Sie können das Flag „ <code translate="no">partial_update</code> “ auch verwenden, um eine Upsert-Anfrage im Merge-Modus auszuführen. Auf diese Weise können Sie nur die Felder, die aktualisiert werden müssen, in die Anfrage-Nutzlast aufnehmen.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/upsert-in-merge-mode.png" alt="Upsert In Merge Mode" class="doc-image" id="upsert-in-merge-mode" /> 
   <span>Upsert im Merge-Modus</span>
  
 </span></p>
<p>Um einen Merge durchzuführen, setzen Sie „ <code translate="no">partial_update</code> “ in der Anfrage „ <code translate="no">upsert</code> “ auf „ <code translate="no">True</code> “ – zusammen mit dem Primärschlüssel und den zu aktualisierenden Feldern sowie deren neuen Werten.</p>
<p>Nach Erhalt einer solchen Anfrage führt Milvus eine Abfrage mit starker Konsistenz durch, um die Entität abzurufen, aktualisiert die Feldwerte basierend auf den Daten in der Anfrage, fügt die geänderten Daten ein und löscht anschließend die vorhandene Entität mit dem in der Anfrage enthaltenen ursprünglichen Primärschlüssel.</p>
<p>Für „ <code translate="no">ARRAY</code> “-Felder unterstützt der Merge-Modus zwei Operatoren: „ <code translate="no">ARRAY_APPEND</code> “ und „ <code translate="no">ARRAY_REMOVE</code> “. Mit diesen Operatoren können Sie Elemente an ein bestehendes „ <code translate="no">ARRAY</code> “-Feld anhängen oder übereinstimmende Elemente daraus entfernen, ohne zuvor die Entität abfragen zu müssen, um deren aktuellen Wert abzurufen. Weitere Informationen finden Sie unter <a href="/docs/de/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">„Upsert von ARRAY-Feldern mit Partial-Update-Operatoren</a>“.</p>
<h3 id="Upsert-behaviors-special-notes" class="common-anchor-header">Upsert-Verhalten: Besondere Hinweise<button data-href="#Upsert-behaviors-special-notes" class="anchor-icon" translate="no">
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
    </button></h3><p>Es gibt einige besondere Hinweise, die Sie vor der Verwendung der Merge-Funktion beachten sollten. Die folgenden Fälle gehen davon aus, dass Sie über eine Sammlung mit zwei Skalarfeldern namens „ <code translate="no">title</code> “ und „ <code translate="no">issue</code> “ sowie einem Primärschlüssel „ <code translate="no">id</code> “ und einem Vektorfeld namens „ <code translate="no">vector</code> “ verfügen.</p>
<ul>
<li><p><strong>Upsert von Feldern bei</strong> <strong>aktiviertem</strong> „ <code translate="no">nullable</code> <strong>“.</strong></p>
<p>Angenommen, das Feld „ <code translate="no">issue</code> “ darf null sein. Beachten Sie beim Upsert dieser Felder Folgendes:</p>
<ul>
<li><p>Wenn Sie das Feld „ <code translate="no">issue</code> “ in der Anfrage „ <code translate="no">upsert</code> “ weglassen und „ <code translate="no">partial_update</code> “ deaktivieren, wird das Feld „ <code translate="no">issue</code> “ auf „ <code translate="no">null</code> “ aktualisiert, anstatt seinen ursprünglichen Wert beizubehalten.</p></li>
<li><p>Um den ursprünglichen Wert des Felds „ <code translate="no">issue</code> “ beizubehalten, müssen Sie entweder „ <code translate="no">partial_update</code> “ aktivieren und das Feld „ <code translate="no">issue</code> “ weglassen oder das Feld „ <code translate="no">issue</code> “ mit seinem ursprünglichen Wert in die Anfrage „ <code translate="no">upsert</code> “ aufnehmen.</p></li>
</ul></li>
<li><p><strong>Upsert-Schlüssel im dynamischen Feld</strong>.</p>
<p>Angenommen, Sie haben den dynamischen Schlüssel in der Beispielsammlung aktiviert, und die Schlüssel-Wert-Paare im dynamischen Feld einer Entität sehen ähnlich aus wie <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code>.</p>
<p>Wenn Sie die Entität mit Schlüsseln wie <code translate="no">author</code>, <code translate="no">year</code> oder <code translate="no">tags</code> aktualisieren oder einfügen oder andere Schlüssel hinzufügen, beachten Sie Folgendes:</p>
<ul>
<li><p>Wenn Sie einen „Upsert“ durchführen, während „ <code translate="no">partial_update</code> “ deaktiviert ist, ist das Standardverhalten das <strong>Überschreiben</strong>. Das bedeutet, dass der Wert des dynamischen Feldes durch alle in der Anfrage enthaltenen, nicht im Schema definierten Felder und deren Werte überschrieben wird.</p>
<p>Wenn die in der Anfrage enthaltenen Daten beispielsweise „ <code translate="no">{&quot;author&quot;: &quot;Jane&quot;, &quot;genre&quot;: &quot;fantasy&quot;}</code> “ lauten, werden die Schlüssel-Wert-Paare im dynamischen Feld der Zielentität entsprechend aktualisiert.</p></li>
<li><p>Wenn Sie einen „Upsert“ mit aktivierter Option „ <code translate="no">partial_update</code> “ durchführen, ist das Standardverhalten das <strong>Zusammenführen</strong>. Das bedeutet, dass der Wert des dynamischen Feldes mit allen in der Anfrage enthaltenen, nicht im Schema definierten Feldern und deren Werten zusammengeführt wird.</p>
<p>Wenn die in der Anfrage enthaltenen Daten beispielsweise <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code> lauten, werden die Schlüssel-Wert-Paare im dynamischen Feld der Zielentität nach dem „Upsert“ zu <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;], &quot;genre&quot;: &quot;fantasy&quot;}</code>.</p></li>
</ul></li>
<li><p><strong>Upsert eines JSON-Feldes.</strong></p>
<p>Angenommen, die Beispielsammlung verfügt über ein schemadefiniertes JSON-Feld namens „ <code translate="no">extras</code> “, und die Schlüssel-Wert-Paare in diesem JSON-Feld einer Entität ähneln „ <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code> “.</p>
<p>Wenn Sie das Feld „ <code translate="no">extras</code> “ einer Entität mit geänderten JSON-Daten per „Upsert“ aktualisieren, beachten Sie, dass das JSON-Feld als Ganzes behandelt wird und Sie einzelne Schlüssel nicht selektiv aktualisieren können. Mit anderen Worten: Das JSON-Feld <strong>unterstützt KEIN</strong> „Upsert“ im <strong>Merge-Modus</strong>.</p></li>
<li><p>„ <code translate="no">ARRAY</code> <strong>“-Feld</strong><strong>aktualisieren</strong> <strong>.</strong></p>
<p>Im Merge-Modus unterstützen „ <code translate="no">ARRAY</code> “-Felder die Operatoren für partielle Aktualisierungen „ <code translate="no">ARRAY_APPEND</code> “ und „ <code translate="no">ARRAY_REMOVE</code> “. Verwenden Sie diese Operatoren, wenn Sie Elemente zu einem bestehenden „ <code translate="no">ARRAY</code> “-Feld hinzufügen oder übereinstimmende Elemente daraus entfernen möchten, ohne den gesamten Array-Wert zu ersetzen.</p></li>
</ul>
<h3 id="Limits--Restrictions" class="common-anchor-header">Grenzen und Einschränkungen<button data-href="#Limits--Restrictions" class="anchor-icon" translate="no">
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
    </button></h3><p>Aufgrund der oben genannten Informationen sind folgende Einschränkungen und Beschränkungen zu beachten:</p>
<ul>
<li><p>Die Anfrage „ <code translate="no">upsert</code> “ muss immer die Primärschlüssel der Zielentitäten enthalten.</p></li>
<li><p>Die Zielsammlung muss geladen und für Abfragen verfügbar sein.</p></li>
<li><p>Alle in der Anfrage angegebenen Felder müssen im Schema der Zielsammlung vorhanden sein.</p></li>
<li><p>Die Werte aller in der Anfrage angegebenen Felder müssen mit den im Schema definierten Datentypen übereinstimmen.</p></li>
<li><p>Bei Feldern, die mithilfe von Funktionen aus anderen Feldern abgeleitet wurden, entfernt Milvus das abgeleitete Feld während des Upserts, um eine Neuberechnung zu ermöglichen.</p></li>
</ul>
<h2 id="Upsert-entities-in-a-collection" class="common-anchor-header">Entitäten in einer Sammlung per „Upsert“ einfügen<button data-href="#Upsert-entities-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt führen wir ein „Upsert“ von Entitäten in eine Sammlung namens „ <code translate="no">my_collection</code> “ durch. Diese Sammlung enthält nur zwei Felder mit den Namen „ <code translate="no">id</code> “, „ <code translate="no">vector</code> “, „ <code translate="no">title</code> “ und „ <code translate="no">issue</code> “. Das Feld „ <code translate="no">id</code> “ ist das Primärfeld, während die Felder „ <code translate="no">title</code> “ und „ <code translate="no">issue</code> “ Skalarfelder sind.</p>
<p>Sofern die drei Entitäten in der Sammlung vorhanden sind, werden sie durch die in der „Upsert“-Anfrage enthaltenen Entitäten überschrieben.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.19&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 0, \&quot;vector\&quot;: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], \&quot;title\&quot;: \&quot;Artificial Intelligence in Real Life\&quot;, \&quot;issue\&quot;: \&quot;\vol.12\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], \&quot;title\&quot;: \&quot;Hollow Man\&quot;, \&quot;issue\&quot;: \&quot;vol.19\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], \&quot;title\&quot;: \&quot;Treasure Hunt in Missouri\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.19&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

titleColumn := column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
})

issueColumn := column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.12&quot;</span>, <span class="hljs-string">&quot;vol.19&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;vector&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], &quot;title&quot;: &quot;Artificial Intelligence in Real Life&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], &quot;title&quot;: &quot;Hollow Man&quot;, &quot;issue&quot;: &quot;vol.19&quot;},
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], &quot;title&quot;: &quot;Treasure Hunt in Missouri&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             0,</span>
<span class="hljs-comment">#             1,</span>
<span class="hljs-comment">#             2,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-a-partition" class="common-anchor-header">Entitäten in einer Partition „upsert“<button data-href="#Upsert-entities-in-a-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Entitäten auch in eine bestimmte Partition „upsert“-en. Die folgenden Codeausschnitte gehen davon aus, dass Sie in Ihrer Sammlung eine Partition namens <strong>„PartitionA“</strong> haben.</p>
<p>Die drei Entitäten werden, sofern sie in der Partition vorhanden sind, durch die in der Anfrage enthaltenen Entitäten überschrieben.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.34&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.2&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    },
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 10, \&quot;vector\&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], \&quot;title\&quot;: \&quot;Layour Design Reference\&quot;, \&quot;issue\&quot;: \&quot;vol.34\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 11, \&quot;vector\&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], \&quot;title\&quot;: \&quot;Doraemon and His Friends\&quot;, \&quot;issue\&quot;: \&quot;vol.2\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 12, \&quot;vector\&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], \&quot;title\&quot;: \&quot;Pikkachu and Pokemon\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-comment">// 6. Upsert data in partitions</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.34&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.2&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">titleColumn = column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.34&quot;</span>, <span class="hljs-string">&quot;vol.2&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>, 
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithPartition(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>, <span class="hljs-number">17</span>, <span class="hljs-number">18</span>, <span class="hljs-number">19</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 10, &quot;vector&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], &quot;title&quot;: &quot;Layour Design Reference&quot;, &quot;issue&quot;: &quot;vol.34&quot;},
        {&quot;id&quot;: 11, &quot;vector&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], &quot;title&quot;: &quot;Doraemon and His Friends&quot;, &quot;issue&quot;: &quot;vol.2&quot;},
        {&quot;id&quot;: 12, &quot;vector&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], &quot;title&quot;: &quot;Pikkachu and Pokemon&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionName&quot;: &quot;partitionA&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             10,</span>
<span class="hljs-comment">#             11,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-merge-mode--Milvus-v262+" class="common-anchor-header">Entitäten im Merge-Modus einfügen oder aktualisieren<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-entities-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Codebeispiel veranschaulicht, wie Entitäten mit partiellen Aktualisierungen „Upsert“ durchgeführt werden. Geben Sie nur die Felder an, die aktualisiert werden sollen, sowie deren neue Werte, zusammen mit dem expliziten Flag für partielle Aktualisierungen.</p>
<p>Im folgenden Beispiel wird das Feld „ <code translate="no">issue</code> “ der in der Upsert-Anfrage angegebenen Entitäten auf die in der Anfrage enthaltenen Werte aktualisiert.</p>
<div class="alert note">
<p>Achten Sie bei der Durchführung eines „Upsert“ im Merge-Modus darauf, dass die in der Anfrage beteiligten Entitäten denselben Satz an Feldern aufweisen. Angenommen, es sollen zwei oder mehr Entitäten per „Upsert“ aktualisiert werden, wie im folgenden Codeausschnitt gezeigt, ist es wichtig, dass diese identische Felder enthalten, um Fehler zu vermeiden und die Datenintegrität zu gewährleisten.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partial_update=<span class="hljs-literal">True</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 2}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.14&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Arrays.asList(row1, row2))
        .partialUpdate(<span class="hljs-literal">true</span>)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=2)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">pkColumn := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.17&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>,
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithColumns(pkColumn, issueColumn).
    WithPartialUpdate(<span class="hljs-literal">true</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    data,
    <span class="hljs-attr">partial_update</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> COLLECTION_NAME=<span class="hljs-string">&quot;my_collection&quot;</span>
<span class="hljs-built_in">export</span> UPSERT_DATA=<span class="hljs-string">&#x27;[
  {
    &quot;id&quot;: 1,
    &quot;issue&quot;: &quot;vol.14&quot;
  },
  {
    &quot;id&quot;: 2,
    &quot;issue&quot;: &quot;vol.7&quot;
  }
]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/upsert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">${UPSERT_DATA}</span>,
    \&quot;partialUpdate\&quot;: true
  }&quot;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 2,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#              3,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-ARRAY-fields-with-partial-update-operators--Milvus-v2617+" class="common-anchor-header">Upsert von ARRAY-Feldern mit Operatoren für Teilaktualisierungen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.17+</span><button data-href="#Upsert-ARRAY-fields-with-partial-update-operators--Milvus-v2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>Vor der Einführung von Operatoren für Teilaktualisierungen erforderte die Aktualisierung eines Teils eines „ <code translate="no">ARRAY</code> “-Feldes einen clientseitigen „Read-Modify-Write“-Ablauf: Abfrage des bestehenden Arrays, Änderung im Anwendungscode und „Upsert“ des vollständigen Ersatzwertes. Mit Operatoren für partielle Aktualisierungen können Sie nur die Elemente senden, die angehängt oder entfernt werden sollen. Dies reduziert die clientseitige Logik und vermeidet den zusätzlichen Lesevorgang vor dem „Upsert“.</p>
<p>Angenommen, die Entität mit dem Primärschlüssel ` <code translate="no">1</code> ` enthält bereits ` <code translate="no">tags = [&quot;new&quot;, &quot;trial&quot;]</code>`. Ohne Operatoren für partielle Aktualisierungen erfordert das Hinzufügen von ` <code translate="no">&quot;premium&quot;</code> ` zum Array das Upsert des gesamten Ersatz-Arrays:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;trial&quot;</span>, <span class="hljs-string">&quot;premium&quot;</span>]}],</span>
<span class="highlighted-comment-line">    partial_update=<span class="hljs-literal">True</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;JsonObject&gt; replacementData = Collections.singletonList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;new\&quot;, \&quot;trial\&quot;, \&quot;premium\&quot;]}&quot;</span>, JsonObject.class)
);

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .partialUpdate(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .data(replacementData)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Bei „ <code translate="no">ARRAY_APPEND</code> “ wird nur das hinzuzufügende Element gesendet:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],</span>
<span class="highlighted-comment-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;JsonObject&gt; appendData = Collections.singletonList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;premium\&quot;]}&quot;</span>, JsonObject.class)
);

UpsertReq.<span class="hljs-type">FieldPartialUpdateOp</span> <span class="hljs-variable">appendTags</span> <span class="hljs-operator">=</span> UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .data(appendData)</span>
<span class="highlighted-comment-line">        .fieldOps(Collections.singletonList(appendTags))</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Das Anhängen eines der beiden Operatoren an ein Feld über ` <code translate="no">field_ops</code> ` aktiviert implizit die Semantik der Teilaktualisierung. Daher müssen Sie neben ` <code translate="no">field_ops</code>` <strong>nicht</strong> zusätzlich ` <code translate="no">partial_update=True</code> ` übergeben.</p>
</div>
<h3 id="Limits" class="common-anchor-header">Einschränkungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Die Werte der Nutzdaten müssen mit dem <code translate="no">element_type</code> des Zielfelds „ <code translate="no">ARRAY</code> “ übereinstimmen. Wenn das Zielfeld beispielsweise „ <code translate="no">ARRAY&lt;VARCHAR&gt;</code> “ lautet, müssen die Nutzdaten Zeichenfolgenwerte enthalten.</li>
<li><code translate="no">ARRAY_APPEND</code> und „ <code translate="no">ARRAY_REMOVE</code> “ unterstützen „ <code translate="no">ARRAY</code> “-Felder, deren „ <code translate="no">element_type</code> “ „ <code translate="no">BOOL</code> “, „ <code translate="no">INT8</code> “, „ <code translate="no">INT16</code> “, „ <code translate="no">INT32</code> “, „ <code translate="no">INT64</code> “, „ <code translate="no">FLOAT</code> “, „ <code translate="no">DOUBLE</code> “ oder „ <code translate="no">VARCHAR</code> “ lautet.</li>
<li>Nach einem „ <code translate="no">ARRAY_APPEND</code> “-Vorgang darf die Länge des resultierenden Arrays die „ <code translate="no">max_capacity</code> “ des Feldes nicht überschreiten.</li>
<li>Parallele Upserts an dieselbe Entität sind nicht über Anfragen hinweg atomar. Wenn zwei Anfragen gleichzeitig dasselbe Feld „ <code translate="no">ARRAY</code> “ aktualisieren, kann der spätere Schreibvorgang den früheren überschreiben. Verwenden Sie eine Koordination auf Anwendungsebene, wenn Sie alle parallelen Änderungen beibehalten müssen.</li>
</ul>
<h3 id="Example" class="common-anchor-header">Beispiel<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>Das folgende Beispiel verwendet eine kleine „ <code translate="no">users</code> “-Sammlung mit einem Primärschlüssel „ <code translate="no">pk</code> “, einem Feld „ <code translate="no">tags</code> “ vom Typ „ <code translate="no">ARRAY&lt;VARCHAR&gt;</code> “ und einem Vektorfeld „ <code translate="no">embedding</code> “. Zunächst werden zwei Entitäten mit den Anfangswerten „ <code translate="no">tags</code> “ eingefügt, anschließend wird mithilfe von „ <code translate="no">ARRAY_APPEND</code> “ und „ <code translate="no">ARRAY_REMOVE</code> “ gezeigt, wie jeder Operator das gespeicherte Array verändert.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 1. Create a collection with an ARRAY&lt;VARCHAR&gt; field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(
    <span class="hljs-string">&quot;tags&quot;</span>,
    DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=<span class="hljs-number">8</span>,
    max_length=<span class="hljs-number">32</span>,
)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    schema=schema,
    index_params=index_params
)

<span class="hljs-comment"># 2. Seed two entities</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[
        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>]},
        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">1.0</span>], <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;trial&quot;</span>]},
    ],
)

<span class="hljs-comment"># 3. Append tags without reading the existing ARRAY values</span>
client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>, <span class="hljs-string">&quot;vip&quot;</span>]},</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)

res = client.query(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 1, &#x27;tags&#x27;: [&#x27;new&#x27;, &#x27;premium&#x27;, &#x27;vip&#x27;]}&quot;,</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 2, &#x27;tags&#x27;: [&#x27;new&#x27;, &#x27;trial&#x27;, &#x27;premium&#x27;]}&quot;</span>
<span class="hljs-comment"># ]</span>

<span class="hljs-comment"># 4. Remove matching tags without replacing the full ARRAY field</span>
client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>]},</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)

res = client.query(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 1, &#x27;tags&#x27;: [&#x27;premium&#x27;, &#x27;vip&#x27;]}&quot;,</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 2, &#x27;tags&#x27;: [&#x27;new&#x27;, &#x27;premium&#x27;]}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();

<span class="hljs-comment">// 1. Create a collection with an ARRAY&lt;VARCHAR&gt; field</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">8</span>)
        .maxLength(<span class="hljs-number">32</span>)
        .build());

List&lt;IndexParam&gt; indexParams = Collections.singletonList(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

<span class="hljs-comment">// 2. Seed two entities</span>
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], \&quot;tags\&quot;: [\&quot;new\&quot;]}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.6, 0.7, 0.8, 0.9, 1.0], \&quot;tags\&quot;: [\&quot;new\&quot;, \&quot;trial\&quot;]}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(data)
        .build());

<span class="hljs-comment">// 3. Append tags without reading the existing ARRAY values</span>
List&lt;JsonObject&gt; appendData = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;premium\&quot;, \&quot;vip\&quot;]}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 2, \&quot;tags\&quot;: [\&quot;premium\&quot;]}&quot;</span>, JsonObject.class)
);

UpsertReq.<span class="hljs-type">FieldPartialUpdateOp</span> <span class="hljs-variable">appendTags</span> <span class="hljs-operator">=</span> UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .data(appendData)</span>
<span class="highlighted-comment-line">        .fieldOps(Collections.singletonList(appendTags))</span>
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .filter(<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());
System.out.println(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;new&quot;, &quot;premium&quot;, &quot;vip&quot;]},</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 2, &quot;tags&quot;: [&quot;new&quot;, &quot;trial&quot;, &quot;premium&quot;]}</span>
<span class="hljs-comment">// ]</span>

<span class="hljs-comment">// 4. Remove matching tags without replacing the full ARRAY field</span>
List&lt;JsonObject&gt; removeData = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;new\&quot;]}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 2, \&quot;tags\&quot;: [\&quot;trial\&quot;]}&quot;</span>, JsonObject.class)
);

UpsertReq.<span class="hljs-type">FieldPartialUpdateOp</span> <span class="hljs-variable">removeTags</span> <span class="hljs-operator">=</span> UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .data(removeData)</span>
<span class="highlighted-comment-line">        .fieldOps(Collections.singletonList(removeTags))</span>
        .build());

res = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .filter(<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());
System.out.println(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;premium&quot;, &quot;vip&quot;]},</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 2, &quot;tags&quot;: [&quot;new&quot;, &quot;premium&quot;]}</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
