---
id: limit_collection_counts.md
title: Impostare limiti al numero di raccolte
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Limitare il numero di raccolte<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Un'istanza Milvus consente fino a 65.536 raccolte. Tuttavia, un numero eccessivo di raccolte può causare problemi di prestazioni. Pertanto, si consiglia di limitare il numero di raccolte create in un'istanza Milvus.</p>
<p>Questa guida fornisce istruzioni su come impostare i limiti al numero di raccolte in un'istanza Milvus.</p>
<p>La configurazione varia a seconda del modo in cui si installa l'istanza Milvus.</p>
<ul>
<li><p>Per le istanze Milvus installate utilizzando Helm Charts</p>
<p>Aggiungere la configurazione al file <code translate="no">values.yaml</code> nella sezione <code translate="no">config</code>. Per i dettagli, consultare <a href="/docs/it/v2.4.x/configure-helm.md">Configurazione di Milvus con Helm Charts</a>.</p></li>
<li><p>Per le istanze Milvus installate usando Docker Compose</p>
<p>Aggiungere la configurazione al file <code translate="no">milvus.yaml</code> utilizzato per avviare l'istanza Milvus. Per i dettagli, fate riferimento a <a href="/docs/it/v2.4.x/configure-docker.md">Configurare Milvus con Docker Compose</a>.</p></li>
<li><p>Per le istanze Milvus installate con Operator</p>
<p>Aggiungere la configurazione alla sezione <code translate="no">spec.components</code> della risorsa personalizzata <code translate="no">Milvus</code>. Per i dettagli, vedere <a href="/docs/it/v2.4.x/configure_operator.md">Configurazione di Milvus con Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opzioni di configurazione<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p>Il parametro <code translate="no">maxGeneralCapacity</code> imposta il numero massimo di collezioni che l'istanza Milvus corrente può contenere. Il valore predefinito è <code translate="no">65536</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Calcolo del numero di collezioni<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>In una raccolta è possibile impostare più shard e partizioni. Gli shard sono unità logiche utilizzate per distribuire le operazioni di scrittura dei dati tra più nodi di dati. Le partizioni sono unità logiche utilizzate per migliorare l'efficienza del recupero dei dati caricando solo un sottoinsieme dei dati della raccolta. Quando si calcola il numero di raccolte nell'istanza Milvus corrente, è necessario contare anche gli shard e le partizioni.</p>
<p>Ad esempio, supponiamo di aver già creato <strong>100</strong> raccolte, con <strong>2</strong> shard e <strong>4</strong> partizioni in <strong>60</strong> di esse e con <strong>1</strong> shard e <strong>12</strong> partizioni nelle altre <strong>40</strong> raccolte. Il numero attuale di raccolte può essere calcolato come:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>Nell'esempio precedente, sono già stati utilizzati <strong>960</strong> dei limiti predefiniti. Ora, se si vuole creare una nuova raccolta con <strong>4</strong> shard e <strong>20</strong> partizioni, si riceverà il seguente messaggio di errore perché il numero totale di raccolte supera la capacità massima:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>Per evitare questo errore, è possibile ridurre il numero di frammenti o partizioni nelle raccolte esistenti o nuove, eliminare alcune raccolte o aumentare il valore <code translate="no">maxGeneralCapacity</code>.</p>
