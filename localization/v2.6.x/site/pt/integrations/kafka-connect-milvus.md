---
id: kafka-connect-milvus.md
summary: >-
  O Apache Kafka está integrado ao Milvus e ao Zilliz Cloud para transmitir
  dados vetoriais. Saiba como usar o conetor Kafka-Milvus para criar pipelines
  em tempo real para pesquisa semântica, sistemas de recomendação e análise
  orientada por IA.
title: >-
  Ligar o Apache Kafka® ao Milvus/Zilliz Cloud para ingestão de dados vectoriais
  em tempo real
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Ligar o Apache Kafka® ao Milvus/Zilliz Cloud para ingestão de dados vectoriais em tempo real<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>Neste guia de início rápido, mostramos como configurar o kafka de código aberto e o Zilliz Cloud para ingerir dados vectoriais.</p>
<p>Este tutorial explica como usar o Apache Kafka® para transmitir e ingerir dados vetoriais no banco de dados vetorial Milvus e no Zilliz Cloud (Milvus totalmente gerenciado), permitindo aplicativos avançados em tempo real, como pesquisa semântica, sistemas de recomendação e análise alimentada por IA.</p>
<p>O Apache Kafka é uma plataforma de streaming de eventos distribuídos concebida para pipelines de alto rendimento e baixa latência. É amplamente utilizado para recolher, armazenar e processar fluxos de dados em tempo real de fontes como bases de dados, dispositivos IoT, aplicações móveis e serviços na nuvem. A capacidade do Kafka de lidar com grandes volumes de dados faz dele uma importante fonte de dados de bancos de dados vetoriais como Milvus ou Zilliz Cloud.</p>
<p>Por exemplo, o Kafka pode capturar fluxos de dados em tempo real - como interações de utilizadores, leituras de sensores, juntamente com as suas incorporações de modelos de aprendizagem automática - e publicar estes fluxos diretamente no Milvus ou no Zilliz Cloud. Uma vez na base de dados vetorial, estes dados podem ser indexados, pesquisados e analisados de forma eficiente.</p>
<p>A integração do Kafka com o Milvus e o Zilliz Cloud proporciona uma forma perfeita de criar pipelines poderosos para fluxos de trabalho de dados não estruturados. O conetor funciona tanto para a implantação do Kafka de código aberto quanto para serviços hospedados, como <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> e <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>Neste tutorial, usamos o Zilliz Cloud como uma demonstração:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Etapa 1: baixar o plug-in kafka-connect-milvus<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Conclua as etapas a seguir para baixar o plug-in kafka-connect-milvus.</p>
<ol>
<li>Descarregue o ficheiro zip mais recente do plugin <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> a partir <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">daqui</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Etapa 2: Baixar o Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Baixe o kafka mais recente <a href="https://kafka.apache.org/downloads">daqui</a>.</li>
<li>Descompacte o arquivo baixado e vá para o diretório kafka.</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">tar -xzf kafka_2.13-3.6.1.tgz</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kafka_2.13-3.6.1</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">PASSO 3: Inicie o ambiente do Kafka<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>NOTA: Seu ambiente local deve ter o Java 8+ instalado.</p>
</div>
<p>Execute os seguintes comandos para iniciar todos os serviços na ordem correta:</p>
<ol>
<li><p>Iniciar o serviço ZooKeeper</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/zookeeper-server-start.sh config/zookeeper.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Iniciar o serviço do corretor Kafka</p>
<p>Abra outra sessão de terminal e execute:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-server-start.sh config/server.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Quando todos os serviços tiverem sido iniciados com êxito, terá um ambiente Kafka básico a funcionar e pronto a utilizar.</p>
<ul>
<li>verifique o guia oficial de início rápido do kafka para obter detalhes: https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Etapa 4: configurar o Kafka e o Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Certifique-se de que tem o Kafka e o Zilliz Cloud instalados e configurados corretamente.</p>
<ol>
<li><p>Se ainda não tiver um tópico no Kafka, crie um tópico (por exemplo, <code translate="no">topic_0</code>) no Kafka.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Se ainda não tiver uma coleção no Zilliz Cloud, crie uma coleção com um campo vetorial (neste exemplo, o vetor tem <code translate="no">dimension=8</code>). Pode utilizar o seguinte exemplo de esquema no Zilliz Cloud:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Nota: Certifique-se de que os esquemas de ambos os lados correspondem um ao outro. No esquema, existe exatamente um campo vetorial. Os nomes de cada campo em ambos os lados são exatamente os mesmos.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Etapa 5: carregar o plug-in kafka-connect-milvus na instância do Kafka<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>descompacte o ficheiro <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> que descarregou no Passo 1.</p></li>
<li><p>copie os diretórios <code translate="no">zilliz-kafka-connect-milvus</code> para o diretório <code translate="no">libs</code> da sua instalação do Kafka.</p></li>
<li><p>modifique o ficheiro <code translate="no">connect-standalone.properties</code> no diretório <code translate="no">config</code> da sua instalação do Kafka.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=false
value.converter.schemas.enable=false
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
</code></pre></li>
<li><p>crie e configure um ficheiro <code translate="no">milvus-sink-connector.properties</code> no diretório <code translate="no">config</code> da sua instalação do Kafka.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.class=com.milvus.io.kafka.MilvusSinkConnector
public.endpoint=https://&lt;public.endpoint&gt;:port
token=*****************************************
collection.name=topic_0
topics=topic_0
</code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Passo 6: Iniciar o conetor<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Inicie o conetor com o ficheiro de configuração anterior</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tente produzir uma mensagem para o tópico do Kafka que acabou de criar no Kafka</p>
<pre><code translate="no" class="language-shell">bin/kafka-console-producer.sh --topic topic_0 --bootstrap-server localhost:9092                        
<span class="hljs-meta prompt_">&gt;</span><span class="language-bash">{<span class="hljs-string">&quot;id&quot;</span>: 0, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648, 0.00082446384, -0.00071647146, 0.048612226], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique se a entidade foi inserida na coleção no Zilliz Cloud. Aqui está o aspeto no Zilliz Cloud se a inserção for bem sucedida:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Suporte</h3><p>Se precisar de assistência ou tiver dúvidas sobre o Kafka Connect Milvus Connector, não hesite em contactar o responsável pelo conetor: <strong>Correio eletrónico:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
