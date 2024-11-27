---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC é uma ferramenta de fácil utilização que pode capturar e
  sincronizar dados incrementais em instâncias Milvus.
title: Visão geral do CDC
---
<h1 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC é uma ferramenta de fácil utilização que pode capturar e sincronizar dados incrementais em instâncias Milvus. Garante a fiabilidade dos dados empresariais ao transferi-los sem problemas entre as instâncias de origem e de destino, permitindo uma cópia de segurança incremental fácil e a recuperação de desastres.</p>
<h2 id="Key-capabilities" class="common-anchor-header">Principais recursos<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>Sincronização de dados seqüenciais</strong>: Garante a integridade e a consistência dos dados, sincronizando as alterações de dados sequencialmente entre as instâncias do Milvus.</p></li>
<li><p><strong>Replicação de dados incrementais</strong>: Replica dados incrementais, incluindo inserções e exclusões, do Milvus de origem para o Milvus de destino, oferecendo armazenamento persistente.</p></li>
<li><p><strong>Gerenciamento de tarefas do CDC</strong>: Permite a gestão de tarefas CDC através de pedidos OpenAPI, incluindo a criação, consulta de estado e eliminação de tarefas CDC.</p></li>
</ul>
<p>Além disso, estamos a planear expandir as nossas capacidades para incluir suporte para integração com sistemas de processamento de fluxo no futuro.</p>
<h2 id="Architecture" class="common-anchor-header">Arquitetura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus-CDC adopta uma arquitetura com dois componentes principais - um servidor HTTP que gere as tarefas e os metadados, e <strong>o corelib</strong> que sincroniza a execução das tarefas com um leitor que obtém os dados da instância Milvus de origem e um escritor que envia os dados processados para a instância Milvus de destino.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-arquitetura</span> </span></p>
<p>No diagrama anterior,</p>
<ul>
<li><p><strong>Servidor HTTP</strong>: Trata os pedidos dos utilizadores, executa as tarefas e mantém os metadados. Serve de plano de controlo para a orquestração de tarefas no sistema Milvus-CDC.</p></li>
<li><p><strong>Corelib</strong>: Responsável pela sincronização efectiva das tarefas. Inclui um componente de leitura que recupera informações do etcd e da fila de mensagens (MQ) do Milvus de origem, e um componente de escrita que traduz mensagens do MQ em parâmetros API para o sistema Milvus e envia esses pedidos para o Milvus de destino para completar o processo de sincronização.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">Fluxo de trabalho<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>O fluxo de processamento de dados do Milvus-CDC envolve as seguintes etapas:</p>
<ol>
<li><p><strong>Criação de tarefas</strong>: Os utilizadores iniciam uma tarefa CDC através de pedidos HTTP.</p></li>
<li><p><strong>Recuperação de metadados</strong>: O sistema obtém metadados específicos da coleção a partir do etcd do Milvus de origem, incluindo informações sobre o canal e o ponto de controlo da coleção.</p></li>
<li><p><strong>Ligação MQ</strong>: Com os metadados à mão, o sistema liga-se ao MQ para começar a subscrever o fluxo de dados.</p></li>
<li><p><strong>Processamento de dados</strong>: Os dados do MQ são lidos, analisados e passados adiante usando o Go SDK ou processados para replicar as operações realizadas no Milvus de origem.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>Milvus-cdc-workflow</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>Sincronização de dados incremental</strong>: Atualmente, o Milvus-CDC foi concebido para sincronizar apenas dados incrementais. Se a sua empresa necessitar de uma cópia de segurança completa dos dados, <a href="https://milvus.io/community">contacte-nos</a> para obter assistência.</p></li>
<li><p><strong>Âmbito da sincronização</strong>: Atualmente, o Milvus-CDC pode sincronizar dados ao nível do cluster. Estamos a trabalhar para adicionar suporte à sincronização de dados ao nível da coleção nas próximas versões.</p></li>
<li><p><strong>Pedidos de API suportados</strong>: O Milvus-CDC atualmente suporta as seguintes solicitações de API. Planejamos estender o suporte a solicitações adicionais em versões futuras:</p>
<ul>
<li><p>Criar/soltar coleção</p></li>
<li><p>Inserir/Excluir/Usertar</p></li>
<li><p>Criar/soltar partição</p></li>
<li><p>Criar/soltar índice</p></li>
<li><p>Carregar/Liberar/Lavar</p></li>
<li><p>Carregar/liberar partição</p></li>
<li><p>Criar/soltar base de dados</p></li>
</ul></li>
</ul>
