---
id: main_components.md
summary: Conheça os principais componentes do Milvus autónomo e do cluster.
title: Componentes principais
---
<h1 id="Main-Components" class="common-anchor-header">Componentes principais<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Existem dois modos de funcionamento do Milvus: Standalone e Cluster. Estes dois modos partilham as mesmas funcionalidades. Pode escolher o modo que melhor se adapta ao tamanho do seu conjunto de dados, dados de tráfego, etc. Por enquanto, o Milvus standalone não pode ser atualizado "online" para o Milvus cluster.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvus autónomo<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus standalone inclui três componentes:</p>
<ul>
<li><p><strong>Milvus:</strong> O componente funcional principal.</p></li>
<li><p><strong>Meta Store:</strong> O motor de metadados, que acede e armazena metadados dos componentes internos do Milvus, incluindo proxies, nós de índice, entre outros.</p></li>
<li><p><strong>Armazenamento de objectos:</strong> O motor de armazenamento, que é responsável pela persistência de dados para Milvus.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Arquitetura autónoma</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Cluster Milvus<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>O cluster Milvus</strong> inclui sete componentes de microsserviços e três dependências de terceiros. Todos os microsserviços podem ser implantados no Kubernetes, independentemente uns dos outros.</p>
<h3 id="Microservice-components" class="common-anchor-header">Componentes de microsserviços</h3><ul>
<li>Coordenação de raiz</li>
<li>Proxy</li>
<li>Coordenação de consulta</li>
<li>Nó de consulta</li>
<li>Coordenada de dados</li>
<li>Nó de índice</li>
<li>Nó de dados</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">Dependências de terceiros</h3><ul>
<li><strong>Meta Store:</strong> Armazena metadados para vários componentes no cluster, por exemplo, etcd.</li>
<li><strong>Armazenamento de Objetos:</strong> Responsável pela persistência de dados de ficheiros grandes no cluster, como ficheiros de índice e de registo binário, por exemplo, S3</li>
<li><strong>Corretor de logs:</strong> Gerencia logs de operações de mutação recentes, gera logs de streaming e fornece serviços de publicação e assinatura de logs, por exemplo, Pulsar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Arquitetura distribuída</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Leia <a href="/docs/pt/v2.4.x/four_layers.md">Computing/Storage Disaggregation (Desagregação de computação/armazenamento)</a> para compreender o mecanismo e o princípio de conceção do Milvus.</li>
</ul>
