---
id: eviction.md
title: VerdrängungCompatible with Milvus 2.6.4+
summary: >-
  Eviction verwaltet die Cache-Ressourcen eines jeden QueryNode in Milvus. Wenn
  diese Funktion aktiviert ist, werden zwischengespeicherte Daten automatisch
  entfernt, sobald die Ressourcenschwellen erreicht sind, um eine stabile
  Leistung zu gewährleisten und eine Erschöpfung des Speichers oder der
  Festplatte zu verhindern.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Verdrängung<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>Eviction verwaltet die Cache-Ressourcen eines jeden QueryNode in Milvus. Wenn sie aktiviert ist, entfernt sie automatisch Daten aus dem Cache, sobald die Ressourcenschwellen erreicht sind, um eine stabile Leistung zu gewährleisten und eine Erschöpfung des Speichers oder der Festplatte zu verhindern.</p>
<p>Die Räumung verwendet eine <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">LRU-Richtlinie (Least Recently Used)</a>, um Cache-Speicherplatz zurückzugewinnen. Metadaten werden immer zwischengespeichert und nie entfernt, da sie für die Abfrageplanung unerlässlich und in der Regel klein sind.</p>
<div class="alert note">
<p>Die Verdrängung muss explizit aktiviert werden. Ohne Konfiguration sammeln sich die Daten im Cache an, bis die Ressourcen erschöpft sind.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Auslagerungsarten<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt zwei sich ergänzende Verdrängungsmodi<strong>(sync</strong> und <strong>async</strong>), die für eine optimale Ressourcenverwaltung zusammenarbeiten:</p>
<table>
   <tr>
     <th><p>Aspekt</p></th>
     <th><p>Synchrone Verdrängung</p></th>
     <th><p>Asynchrone Verdrängung</p></th>
   </tr>
   <tr>
     <td><p>Auslösen</p></td>
     <td><p>Während einer Abfrage oder Suche, wenn die Speicher-/Festplattennutzung interne Grenzen überschreitet.</p></td>
     <td><p>Der Hintergrund-Thread prüft regelmäßig die Nutzung und löst die Verdrängung aus, wenn eine hohe Wasserstandsmarke überschritten wird.</p></td>
   </tr>
   <tr>
     <td><p>Verhalten</p></td>
     <td><p>Die Ausführung der Abfrage wird unterbrochen, während der Cache zurückgewonnen wird. Die Räumung wird fortgesetzt, bis die Nutzung unter die niedrige Wasserstandsmarke fällt.</p></td>
     <td><p>Läuft kontinuierlich im Hintergrund; entfernt Daten, wenn die Nutzung die hohe Wasserstandsmarke überschreitet, bis sie unter die niedrige Wasserstandsmarke fällt. Abfragen werden nicht blockiert.</p></td>
   </tr>
   <tr>
     <td><p>Am besten geeignet für</p></td>
     <td><p>Workloads, die kurze Latenzspitzen tolerieren können oder wenn die asynchrone Verdrängung den Speicherplatz nicht schnell genug zurückgewinnen kann.</p></td>
     <td><p>Latenzempfindliche Workloads, die eine gleichmäßige Leistung erfordern. Ideal für proaktives Ressourcenmanagement.</p></td>
   </tr>
   <tr>
     <td><p>Vorsichtsmaßnahmen</p></td>
     <td><p>Erhöht die Latenzzeit bei laufenden Abfragen. Kann zu Zeitüberschreitungen führen, wenn nicht genügend rückforderbare Daten vorhanden sind.</p></td>
     <td><p>Erfordert richtig eingestellte Wasserzeichen. Leichter Ressourcen-Overhead im Hintergrund.</p></td>
   </tr>
   <tr>
     <td><p>Konfiguration</p></td>
     <td><p>Aktiviert über <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Aktiviert über <code translate="no">backgroundEvictionEnabled: true</code> (erfordert <code translate="no">evictionEnabled: true</code>)</p></td>
   </tr>
</table>
<p><strong>Empfohlene Einstellung</strong>:</p>
<p>Aktivieren Sie beide Modi für ein optimales Gleichgewicht. Die asynchrone Verdrängung verwaltet die Cache-Nutzung proaktiv, während die synchrone Verdrängung als Sicherheitsfallback fungiert, wenn die Ressourcen fast erschöpft sind.</p>
<div class="alert note">
<p>Bei verdrängbaren Feldern und Indizes entspricht die Verdrängungseinheit der Ladegranularität: Skalar-/Vektorfelder werden pro Chunk verdrängt, Skalar-/Vektorindizes werden pro Segment verdrängt.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Aktivieren der Verdrängung<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Konfigurieren Sie die Verdrängung unter <code translate="no">queryNode.segcore.tieredStorage</code> in <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Typ</p></th>
     <th><p>Werte</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Empfohlener Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Hauptschalter für die Räumungsstrategie. Der Standardwert ist <code translate="no">false</code>. Aktiviert den Modus "Sync Eviction".</p></td>
     <td><p>In Tiered Storage immer auf <code translate="no">true</code> eingestellt.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Führt die Verdrängung asynchron im Hintergrund aus. Erfordert <code translate="no">evictionEnabled: true</code>. Der Standardwert ist <code translate="no">false</code>.</p></td>
     <td><p>Verwenden Sie <code translate="no">true</code> für eine gleichmäßigere Abfrageleistung; dies verringert die Häufigkeit der Synchronisierung.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Konfigurieren Sie Wasserzeichen<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Wasserzeichen legen fest, wann die Cache-Evakuierung sowohl für den Arbeitsspeicher als auch für die Festplatte beginnt und endet. Jeder Ressourcentyp hat zwei Schwellenwerte:</p>
<ul>
<li><p><strong>Hohe Wassermarke</strong>: Die asynchrone Verdrängung beginnt, wenn die Nutzung diesen Wert überschreitet.</p></li>
<li><p><strong>Niedrige Wassermarke</strong>: Die Verdrängung wird fortgesetzt, bis die Nutzung unter diesen Wert fällt.</p></li>
</ul>
<div class="alert note">
<p>Diese Konfiguration wird nur wirksam, wenn <a href="/docs/de/eviction.md#Enable-eviction">die Verdrängung aktiviert ist</a>.</p>
</div>
<p><strong>Beispiel YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Typ</p></th>
     <th><p>Bereich</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Empfohlener Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>Schwimmer</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Speichernutzungsgrad, bei dem die Verdrängung endet.</p></td>
     <td><p>Beginnen Sie bei <code translate="no">0.75</code>. Etwas niedriger, wenn der QueryNode-Speicher begrenzt ist.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Speichernutzungsgrad, bei dem die asynchrone Verdrängung beginnt.</p></td>
     <td><p>Beginnt bei <code translate="no">0.8</code>. Halten Sie einen vernünftigen Abstand zum unteren Wasserzeichen (z. B. 0,05-0,10), um häufige Auslöser zu vermeiden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Festplattennutzungsgrad, bei dem die Auslagerung endet.</p></td>
     <td><p>Beginnen Sie bei <code translate="no">0.75</code>. Niedriger einstellen, wenn die Festplatten-E/A begrenzt ist.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Festplattennutzungsgrad, bei dem die asynchrone Auslagerung beginnt.</p></td>
     <td><p>Beginnt bei <code translate="no">0.8</code>. Halten Sie einen vernünftigen Abstand zum unteren Wasserzeichen (z. B. 0,05-0,10), um häufige Auslösungen zu vermeiden.</p></td>
   </tr>
</table>
<p><strong>Bewährte Praktiken</strong>:</p>
<ul>
<li><p>Setzen Sie keine hohen oder niedrigen Wasserzeichen über ~0,80, um Spielraum für die statische Nutzung von QueryNode und Abfragezeit-Bursts zu lassen.</p></li>
<li><p>Vermeiden Sie große Lücken zwischen hohen und niedrigen Wasserzeichen; große Lücken verlängern jeden Auslagerungszyklus und können die Latenzzeit erhöhen.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Konfigurieren Sie die Cache-TTL<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Die Cache-Time-to-Live (TTL)</strong> entfernt zwischengespeicherte Daten automatisch nach einer bestimmten Zeit, auch wenn die Ressourcenschwellenwerte nicht erreicht werden. Sie arbeitet mit der LRU-Evakuierung zusammen, um zu verhindern, dass veraltete Daten den Cache auf unbestimmte Zeit belegen.</p>
<div class="alert note">
<p>Cache TTL erfordert <code translate="no">backgroundEvictionEnabled: true</code>, da es auf demselben Hintergrund-Thread läuft.</p>
</div>
<p><strong>Beispiel YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Typ</p></th>
     <th><p>Einheit</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Empfohlener Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>Ganzzahl</p></td>
     <td><p>Sekunden</p></td>
     <td><p>Dauer, bevor zwischengespeicherte Daten ablaufen. Abgelaufene Elemente werden im Hintergrund entfernt.</p></td>
     <td><p>Verwenden Sie eine kurze TTL (Stunden) für sehr dynamische Daten; verwenden Sie eine lange TTL (Tage) für stabile Datensätze. Setzen Sie 0, um das zeitbasierte Ablaufen zu deaktivieren.</p></td>
   </tr>
</table>
<h2 id="Configure-overcommit-ratio" class="common-anchor-header">Overcommit-Verhältnis konfigurieren<button data-href="#Configure-overcommit-ratio" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Overcommit Ratio legt fest, wie viel vom Cache als evictable reserviert wird, so dass QueryNodes vorübergehend die normale Kapazität überschreiten können, bevor die Eviction intensiviert wird.</p>
<div class="alert note">
<p>Diese Konfiguration wird nur wirksam, wenn <a href="/docs/de/eviction.md#Enable-eviction">die Verdrängung aktiviert ist</a>.</p>
</div>
<p><strong>Beispiel YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Evictable Memory Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of physical memory is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-comment"># Evictable Disk Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of disk capacity is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Typ</p></th>
     <th><p>Bereich</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Empfohlener Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictableMemoryCacheRatio</code></p></td>
     <td><p>Schwimmer</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Teil des Cache-Speichers, der für auslagerungsfähige Daten reserviert ist.</p></td>
     <td><p>Start bei <code translate="no">0.3</code>. Erhöhen Sie den Wert (0,5-0,7) für eine geringere Auslagerungshäufigkeit; verringern Sie ihn (0,1-0,2) für eine höhere Segmentkapazität.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">evictableDiskCacheRatio</code></p></td>
     <td><p>Float</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Anteil des Festplatten-Cache, der für auslagerungsfähige Daten reserviert ist.</p></td>
     <td><p>Verwenden Sie ähnliche Verhältnisse wie beim Speicher, es sei denn, die Festplatten-E/A wird zu einem Engpass.</p></td>
   </tr>
</table>
<p><strong>Grenzwertiges Verhalten</strong>:</p>
<ul>
<li><p><code translate="no">1.0</code>: Der gesamte Cache ist auslagerbar - die Auslagerung wird selten ausgelöst, aber es passen weniger Segmente pro QueryNode.</p></li>
<li><p><code translate="no">0.0</code>: Kein auslagerungsfähiger Cache - die Auslagerung erfolgt häufig; es passen mehr Segmente hinein, aber die Latenzzeit kann sich erhöhen.</p></li>
</ul>
