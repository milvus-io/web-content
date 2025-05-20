---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Imparare a conoscere la configurazione del sistema di Milvus.
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Lista di controllo delle configurazioni del sistema Milvus<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce le sezioni generali delle configurazioni del sistema in Milvus.</p>
<p>Milvus mantiene un numero considerevole di parametri che configurano il sistema. Ogni configurazione ha un valore predefinito, che può essere utilizzato direttamente. È possibile modificare questi parametri in modo flessibile, in modo che Milvus possa servire meglio la vostra applicazione. Per ulteriori informazioni, vedere <a href="/docs/it/v2.4.x/configure-docker.md">Configurazione di Milvus</a>.</p>
<div class="alert note">
Nella versione attuale, tutti i parametri hanno effetto solo dopo essere stati configurati all'avvio di Milvus.</div>
<h2 id="Sections" class="common-anchor-header">Sezioni<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>Per comodità di manutenzione, Milvus classifica le sue configurazioni in %s sezioni in base ai componenti, alle dipendenze e all'uso generale.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Configurazione relativa a etcd, usato per memorizzare i metadati di Milvus e per il rilevamento dei servizi.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_etcd.md">Configurazioni relative a etcd per</a> una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>Vedere <a href="/docs/it/v2.4.x/configure_metastore.md">Configurazioni relative al metastore per</a> una descrizione dettagliata di ogni parametro in questa sezione.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Configurazione correlata di tikv, usato per memorizzare i metadati di Milvus.</p>
<p>Si noti che quando TiKV è abilitato per il metastore, è ancora necessario avere etcd per il rilevamento dei servizi.</p>
<p>TiKV è una buona opzione quando le dimensioni dei metadati richiedono una migliore scalabilità orizzontale.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_tikv.md">Configurazioni relative a tikv per</a> una descrizione dettagliata di ogni parametro in questa sezione.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Vedere <a href="/docs/it/v2.4.x/configure_localstorage.md">Configurazioni relative a localStorage per</a> una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>La configurazione relativa a MinIO/S3/GCS o qualsiasi altro servizio supporta l'API S3, responsabile della persistenza dei dati per Milvus.</p>
<p>Nella seguente descrizione ci riferiamo al servizio di archiviazione come MinIO/S3 per semplicità.</p>
<p>Per una descrizione dettagliata di ogni parametro di questa sezione, vedere <a href="/docs/it/v2.4.x/configure_minio.md">Configurazioni relative a Minio</a>.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus supporta quattro MQ: rocksmq (basato su RockDB), natsmq (server nats incorporato), Pulsar e Kafka.</p>
<p>È possibile cambiare l'MQ impostando il campo mq.type.</p>
<p>Se non si imposta il campo mq.type come predefinito, c'è una nota sull'abilitazione della priorità se si configurano più mq in questo file.</p>
<ol>
<li><p>modalità standalone (locale): rocksmq (predefinito) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>modalità cluster:  Pulsar (default) &gt; Kafka (rocksmq e natsmq non sono supportati in modalità cluster).</p></li>
</ol>
<p>Vedere <a href="/docs/it/v2.4.x/configure_mq.md">Configurazioni relative a mq</a> per una descrizione dettagliata di ogni parametro in questa sezione.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Configurazione correlata di pulsar, usato per gestire i log di Milvus delle operazioni di mutazione recenti, per produrre log in streaming e per fornire servizi di publish-subscribe dei log.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_pulsar.md">Configurazioni relative a pulsar</a> per una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>Se si desidera abilitare kafka, è necessario commentare le configurazioni di pulsar</p>
<p>kafka:</p>
<p>brokerList:</p>
<p>saslUsername:</p>
<p>saslPassword:</p>
<p>saslMeccanismi:</p>
<p>securityProtocol:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_rocksmq.md">Configurazioni relative a rocksmq per</a> una descrizione dettagliata di ogni parametro in questa sezione.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>configurazione natsmq.</p>
<p>maggiori dettagli: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>Vedere le <a href="/docs/it/v2.4.x/configure_natsmq.md">configurazioni relative a natsmq</a> per una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Configurazione correlata di rootCoord, usata per gestire le richieste del linguaggio di definizione dei dati (DDL) e del linguaggio di controllo dei dati (DCL).</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_rootcoord.md">Configurazioni relative a rootCoord per</a> una descrizione dettagliata di ogni parametro in questa sezione.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Configurazione correlata del proxy, usato per convalidare le richieste del client e ridurre i risultati restituiti.</p>
<p>Vedere le <a href="/docs/it/v2.4.x/configure_proxy.md">configurazioni relative al proxy</a> per una descrizione dettagliata di ogni parametro in questa sezione.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Configurazione correlata di queryCoord, usata per gestire la topologia e il bilanciamento del carico per i nodi di interrogazione e il passaggio da segmenti in crescita a segmenti chiusi.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_querycoord.md">Configurazioni correlate a queryCoord</a> per una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Configurazione correlata di queryNode, usata per eseguire ricerche ibride tra dati vettoriali e scalari.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_querynode.md">Configurazioni relative a queryNode per</a> una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>Vedere <a href="/docs/it/v2.4.x/configure_indexcoord.md">Configurazioni relative a indexCoord per</a> una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>Vedere le <a href="/docs/it/v2.4.x/configure_indexnode.md">configurazioni relative a indexNode</a> per una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Per una descrizione dettagliata di ogni parametro di questa sezione, vedere <a href="/docs/it/v2.4.x/configure_datacoord.md">Configurazioni relative a dataCoord</a>.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>Per una descrizione dettagliata di ogni parametro di questa sezione, vedere <a href="/docs/it/v2.4.x/configure_datanode.md">Configurazioni relative al dataNode</a>.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>Questo argomento introduce le configurazioni relative ai canali di messaggio di Milvus.</p>
<p>Per una descrizione dettagliata di ogni parametro di questa sezione, vedere <a href="/docs/it/v2.4.x/configure_msgchannel.md">Configurazioni relative al canale dei messaggi</a>.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Configura l'output del registro di sistema.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_log.md">Configurazioni relative ai log per</a> una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>Vedere <a href="/docs/it/v2.4.x/configure_grpc.md">Configurazioni relative a grpc</a> per una descrizione dettagliata di ogni parametro in questa sezione.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Configura l'abilitazione del proxy tls.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_tls.md">Configurazioni relative a tls</a> per una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Per una descrizione dettagliata di ogni parametro di questa sezione, vedere <a href="/docs/it/v2.4.x/configure_common.md">Configurazioni comuni</a>.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, configurazione della quota e dei limiti di Milvus.</p>
<p>Per impostazione predefinita, sono abilitati:</p>
<ol>
<li><p>Protezione TT;</p></li>
<li><p>Protezione della memoria.</p></li>
<li><p>Protezione della quota disco.</p></li>
</ol>
<p>È possibile abilitare:</p>
<ol>
<li><p>Limitazione del throughput DML;</p></li>
<li><p>Limitazione DDL, DQL qps/rps;</p></li>
<li><p>Protezione della lunghezza/latenza della coda DQL;</p></li>
<li><p>Protezione della velocità dei risultati DQL;</p></li>
</ol>
<p>Se necessario, si può anche forzare manualmente il rifiuto delle richieste RW.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_quotaandlimits.md">Configurazioni relative a quote e limiti</a> per una descrizione dettagliata di ciascun parametro di questa sezione.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>Vedere le <a href="/docs/it/v2.4.x/configure_trace.md">configurazioni relative alla traccia</a> per una descrizione dettagliata di ogni parametro di questa sezione.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#Quando si utilizza l'indicizzazione su GPU, Milvus utilizza un pool di memoria per evitare l'allocazione e la deallocazione frequente della memoria.</p>
<p>#Qui è possibile impostare la dimensione della memoria occupata dal pool di memoria, con l'unità di misura MB.</p>
<p>#notare che c'è la possibilità che Milvus si blocchi quando la richiesta di memoria effettiva supera il valore impostato da maxMemSize.</p>
<p>#se initMemSize e MaxMemSize sono entrambi impostati a zero,</p>
<p>#milvus inizializzerà automaticamente metà della memoria disponibile della GPU,</p>
<p>#maxMemSize sarà l'intera memoria disponibile della GPU.</p>
<p>Vedere <a href="/docs/it/v2.4.x/configure_gpu.md">Configurazioni relative alla gpu per</a> una descrizione dettagliata di ogni parametro di questa sezione.</p>
