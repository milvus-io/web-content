---
id: cdc_failover.md
summary: >-
  Imparare a eseguire un failover quando il cluster Milvus primario diventa
  indisponibile.
title: Failover
---
<h1 id="Failover" class="common-anchor-header">Failover<button data-href="#Failover" class="anchor-icon" translate="no">
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
    </button></h1><p>Il failover promuove un cluster standby a un primario autonomo quando il primario originale è completamente indisponibile. È un'operazione che privilegia la disponibilità e può comportare la perdita di dati non replicati prima del guasto.</p>
<p>Questa guida presuppone la topologia originale:</p>
<pre><code translate="no" class="language-text">cluster-a (primary)  -&gt;  cluster-b (standby)
<button class="copy-code-btn"></button></code></pre>
<p>Dopo il failover, <code translate="no">cluster-b</code> diventa un primario autonomo:</p>
<pre><code translate="no" class="language-text">cluster-b (primary)
<button class="copy-code-btn"></button></code></pre>
<h2 id="When-to-Use-Failover" class="common-anchor-header">Quando usare il failover<button data-href="#When-to-Use-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare il failover solo quando:</p>
<ul>
<li>Il primario originale non può rispondere alle richieste.</li>
<li>Il primario non può essere ripristinato entro un tempo accettabile.</li>
<li>Il ripristino della disponibilità di scrittura è più importante dell'attesa del vecchio primario.</li>
</ul>
<p>Se il primario è ancora raggiungibile, utilizzare lo <a href="/docs/it/cdc_switchover.md">switchover</a>. Lo switchover evita la perdita di dati.</p>
<h2 id="Data-Loss-Risk" class="common-anchor-header">Rischio di perdita di dati<button data-href="#Data-Loss-Risk" class="anchor-icon" translate="no">
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
    </button></h2><p>Il Failover non attende il primario originale. Tutti i dati scritti sul vecchio primario ma non ancora replicati sullo standby possono andare persi.</p>
<p>La possibile perdita di dati è determinata dal ritardo del CDC nel momento in cui il primario è diventato non disponibile.</p>
<p>Prima di eseguire il failover, è necessario comprendere il compromesso:</p>
<table>
<thead>
<tr><th>Obiettivo</th><th>Commutazione</th><th>Failover</th></tr>
</thead>
<tbody>
<tr><td>Ripristinare le scritture mentre il primario non è raggiungibile</td><td>No</td><td>Sì</td></tr>
<tr><td>Evitare la perdita di dati</td><td>Sì</td><td>Non garantito</td></tr>
<tr><td>Richiede la risposta del vecchio primario</td><td>Sì</td><td>No</td></tr>
</tbody>
</table>
<h2 id="Before-You-Begin" class="common-anchor-header">Prima di iniziare<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Confermare quanto segue:</p>
<ul>
<li>Il primario originale non è disponibile.</li>
<li>Si è deciso di non attendere il ripristino del primario.</li>
<li>Il traffico delle applicazioni può essere reindirizzato allo standby.</li>
<li>L'automazione del traffico non invierà le scritture al vecchio primario se questo si ripristina.</li>
<li>Si dispone dell'ID, dell'indirizzo, del token e dei pchannels del cluster standby.</li>
</ul>
<p>Il requisito di sicurezza più importante è evitare lo split brain. Dopo il failover, solo lo standby promosso deve accettare le scritture delle applicazioni.</p>
<h2 id="Build-the-Failover-Configuration" class="common-anchor-header">Creare la configurazione di failover<button data-href="#Build-the-Failover-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare una configurazione che contenga solo il cluster standby e nessuna topologia di replica. Impostare <code translate="no">force_promote=True</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># If you followed Set Up CDC Replication, cluster B is the original target cluster.</span>
cluster_b_id = target_cluster_id
cluster_b_addr = target_cluster_addr
cluster_b_client_addr = target_client_addr
cluster_b_token = target_cluster_token
cluster_b_pchannels = target_cluster_pchannels

failover_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_b_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_b_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_b_pchannels,
        }
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [],
    <span class="hljs-string">&quot;force_promote&quot;</span>: <span class="hljs-literal">True</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Promote-the-Standby" class="common-anchor-header">Promuovere lo standby<button data-href="#Promote-the-Standby" class="anchor-icon" translate="no">
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
    </button></h2><p>Inviare la richiesta al cluster standby.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_b.update_replicate_configuration(**failover_config)
<span class="hljs-keyword">finally</span>:
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>Se la richiesta ha successo, <code translate="no">cluster-b</code> diventa un primario autonomo e può accettare scritture.</p>
<h2 id="Redirect-Application-Traffic" class="common-anchor-header">Reindirizzare il traffico delle applicazioni<button data-href="#Redirect-Application-Traffic" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo la promozione:</p>
<ol>
<li>Reindirizzare il traffico di scrittura su <code translate="no">cluster-b</code>.</li>
<li>Rimuovere <code translate="no">cluster-a</code> dagli endpoint di scrittura, dai bilanciatori di carico, dai record DNS e dall'automazione.</li>
<li>Verificare che <code translate="no">cluster-b</code> accetti le scritture.</li>
<li>Mantenere <code translate="no">cluster-a</code> isolato finché non viene dismesso o ricostruito esplicitamente.</li>
</ol>
<p>Esempio di verifica della scrittura:</p>
<pre><code translate="no" class="language-python">client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_b.insert(
        collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
        data=[{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>] * <span class="hljs-number">128</span>}],
    )
<span class="hljs-keyword">finally</span>:
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>Regolare i campi del nome della raccolta e dello schema per adattarli alla propria distribuzione.</p>
<h2 id="Verify-the-Result" class="common-anchor-header">Verifica del risultato<button data-href="#Verify-the-Result" class="anchor-icon" translate="no">
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
    </button></h2><p>Verificare direttamente il cluster promosso:</p>
<ul>
<li>Le scritture hanno successo su <code translate="no">cluster-b</code>.</li>
<li>Le letture restituiscono i dati attesi.</li>
<li>Nessun componente dell'applicazione scrive su <code translate="no">cluster-a</code>.</li>
</ul>
<h2 id="Handling-the-Old-Primary" class="common-anchor-header">Gestione del vecchio primario<button data-href="#Handling-the-Old-Primary" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo il failover, trattare <code translate="no">cluster-a</code> come stantio. Non inviare le scritture delle applicazioni a  se diventa nuovamente raggiungibile. Potrebbe contenere dati che non sono mai stati replicati su <code translate="no">cluster-b</code> e <code translate="no">cluster-b</code> potrebbe già contenere nuove scritture dopo il failover.</p>
<p>Non ricollegare automaticamente <code translate="no">cluster-a</code> alla vecchia topologia. La reintroduzione del vecchio primario è un'attività di ripristino separata che deve essere pianificata con attenzione.</p>
<h2 id="Minimizing-Data-Loss" class="common-anchor-header">Ridurre al minimo la perdita di dati<button data-href="#Minimizing-Data-Loss" class="anchor-icon" translate="no">
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
    </button></h2><p>Non è possibile eliminare tutti i rischi di perdita di dati dal failover, ma è possibile ridurli:</p>
<ul>
<li>Monitorare costantemente il ritardo del CDC.</li>
<li>Mantenere i cluster di standby in grado di gestire la velocità di scrittura del primario.</li>
<li>Mantenere bassa la latenza della rete tra cluster e la perdita di pacchetti.</li>
<li>Rendere le scritture delle applicazioni idempotenti.</li>
<li>Riprovare le scritture il cui successo è incerto dopo il failover.</li>
<li>Preferire la commutazione quando il primario può ancora rispondere.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Does-failover-always-lose-data" class="common-anchor-header">Il failover perde sempre i dati?<button data-href="#Does-failover-always-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>No, ma è possibile. Se tutte le scritture erano già state replicate prima del guasto del primario, non si perdono dati. Se esisteva un ritardo CDC, i dati in ritardo possono andare persi.</p>
<h3 id="How-long-does-failover-take" class="common-anchor-header">Quanto tempo impiega il failover?<button data-href="#How-long-does-failover-take" class="anchor-icon" translate="no">
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
    </button></h3><p>In genere si completa in pochi secondi, a seconda dello stato del cluster e della disponibilità del control-plane sullo standby.</p>
<h3 id="Can-I-run-failover-on-the-primary" class="common-anchor-header">È possibile eseguire il failover sul primario?<button data-href="#Can-I-run-failover-on-the-primary" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Il failover è destinato a un cluster in standby. Se il primario attuale è disponibile, utilizzare lo switchover.</p>
<h3 id="Can-the-old-primary-rejoin-automatically" class="common-anchor-header">Il vecchio primario può ricongiungersi automaticamente?<button data-href="#Can-the-old-primary-rejoin-automatically" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Dopo il failover, il vecchio primario deve essere trattato come stale e disattivato o ricostruito prima di poter partecipare nuovamente alla replica.</p>
<h3 id="How-do-I-avoid-split-brain" class="common-anchor-header">Come si evita lo split brain?<button data-href="#How-do-I-avoid-split-brain" class="anchor-icon" translate="no">
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
    </button></h3><p>Assicurarsi che solo il cluster promosso riceva scritture. Rimuovere il vecchio primario da tutti i percorsi di scrittura prima che possa recuperare e accettare il traffico.</p>
