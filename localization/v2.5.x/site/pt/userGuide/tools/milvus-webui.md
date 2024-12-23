---
id: milvus-webui.md
summary: >-
  O Milvus Web UI é uma ferramenta de gestão gráfica para o Milvus. Melhora a
  observabilidade do sistema com uma interface simples e intuitiva. É possível
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI é uma ferramenta de gestão gráfica para Milvus. Esta ferramenta melhora a observabilidade do sistema com uma interface simples e intuitiva. Pode utilizar a Milvus Web UI para observar as estatísticas e métricas dos componentes e dependências do Milvus, verificar os detalhes da base de dados e da coleção e listar as configurações detalhadas do Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Web UI difere do Birdwatcher e do Attu por ser uma ferramenta integrada que permite a observação geral do sistema com uma interface simples e intuitiva.</p>
<p>A tabela seguinte compara as funcionalidades do Milvus Web UI e do Birdwatcher/Attu:</p>
<table>
<thead>
<tr><th>Funcionalidade</th><th>Milvus Web UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Forma operacional</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Utilizadores alvo</td><td>Mantenedores, desenvolvedores</td><td>Mantenedores</td><td>Programadores</td></tr>
<tr><td>Instalação</td><td>Integrado</td><td>Ferramenta autónoma</td><td>Ferramenta autónoma</td></tr>
<tr><td>Dependências</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Funcionalidades principais</td><td>Ambiente de tempo de execução, detalhes da base de dados/coleção, segmentos, canais, tarefas e pedidos de consulta lentos</td><td>Inspeção de metadados e execução da API Milvus</td><td>Gestão da base de dados e tarefas operacionais</td></tr>
</tbody>
</table>
<p>O Milvus Web UI oferece as seguintes funcionalidades:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Visão geral do Milvus Web UI</span> </span></p>
<ul>
<li><p><a href="#Home">Início</a></p>
<p>Pode encontrar informações sobre a instância atual do Milvus em execução, os seus componentes, clientes ligados e dependências.</p></li>
<li><p><a href="#Collections">Colecções</a></p>
<p>Pode ver a lista de bases de dados e colecções atualmente no Milvus e verificar os seus detalhes.</p></li>
<li><p><a href="#Query">Consulta</a></p>
<p>Pode visualizar as estatísticas recolhidas dos nós de consulta e dos coordenadores de consulta em termos de segmentos, canais, réplicas e grupos de recursos.</p></li>
<li><p><a href="#Data">Dados</a></p>
<p>Pode visualizar as estatísticas recolhidas dos nós de dados em termos de segmentos e canais.</p></li>
<li><p><a href="#Tasks">Tarefas</a></p>
<p>Pode visualizar a lista de tarefas em execução no Milvus, incluindo tarefas do agendador Querycoord, tarefas de compactação, tarefas de criação de índices, tarefas de importação e tarefas de sincronização de dados.</p></li>
<li><p><a href="#Slow-requests">Pedidos lentos</a></p>
<p>Pode visualizar a lista de pedidos lentos no Milvus, incluindo o tipo de pedido, a duração do pedido e os parâmetros do pedido.</p></li>
<li><p><a href="#Configurations">Configurações</a></p>
<p>Pode ver a lista de configurações do Milvus e os seus valores.</p></li>
<li><p><a href="#Tools">Ferramentas</a></p>
<p>Pode aceder às duas ferramentas integradas, pprof e Milvus data visualzation tool, a partir da interface Web.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Página inicial<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>Na página Home, pode encontrar as seguintes informações:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Página inicial da interface Web do Milvus</span> </span></p>
<ul>
<li><p><strong>Informações do sistema</strong>: Veja as informações do sistema, incluindo informações sobre o modo de implantação, a imagem usada na implantação e informações relacionadas.</p></li>
<li><p><strong>Informações do componente</strong>: Veja o status e as métricas dos componentes no Milvus, incluindo o status e as métricas dos nós de consulta, nós de dados, nós de índice, coordenadores e proxies.</p></li>
<li><p><strong>Clientes conectados</strong>: Visualizar os clientes ligados e as respectivas informações, incluindo o tipo e a versão do SDK, o nome de utilizador e o histórico de acesso.</p></li>
<li><p><strong>Dependências do sistema</strong>: Veja o estado e as métricas das dependências do Milvus, incluindo o estado e as métricas do meta store, da fila de mensagens e do armazenamento de objectos.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Colecções<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Na página Collections (Colecções), pode visualizar a lista de bases de dados e colecções atualmente existentes no Milvus e verificar os respectivos detalhes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Coleções do Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Base de dados</strong>: Ver a lista de bases de dados atualmente no Milvus e os seus detalhes.</p></li>
<li><p><strong>Coleção</strong>: Visualizar a lista de colecções em cada base de dados e os seus detalhes.</p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Consulta<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Página de consulta do Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Segmentos</strong>: Visualize a lista de segmentos e seus detalhes, incluindo o ID do segmento, a coleção correspondente, o estado, o tamanho etc.</p>
<p>Na coluna <strong>From</strong>, você pode encontrar a fonte do segmento. Os indicadores de fontes possíveis são os seguintes:</p>
<ul>
<li><p><strong>QN</strong>: Nó de consulta</p></li>
<li><p><strong>CT</strong>: Meta atual em QueryCoord</p></li>
<li><p><strong>NT</strong>: Próximo destino em QueryCoord</p></li>
<li><p><strong>DIST</strong>: Distribuição no QueryCoord</p></li>
</ul></li>
<li><p><strong>Canais</strong>: Visualize a lista de canais e seus detalhes, incluindo o nome do canal, coleções correspondentes, etc.</p>
<p>Na coluna <strong>De</strong>, pode encontrar a origem do segmento. Os indicadores de fontes possíveis são os seguintes:</p>
<ul>
<li><p><strong>QN</strong>: nó de consulta</p></li>
<li><p><strong>CT</strong>: destino atual em QueryCoord</p></li>
<li><p><strong>NT</strong>: Próximo destino em QueryCoord</p></li>
<li><p><strong>DIST</strong>: Distribuição no QueryCoord</p></li>
</ul></li>
<li><p><strong>Réplicas</strong>: Ver a lista de réplicas e os respectivos detalhes, incluindo o ID da réplica, a coleção correspondente, etc.</p></li>
<li><p><strong>Grupos de recursos</strong>: Veja a lista de grupos de recursos e os respectivos detalhes, incluindo o nome do grupo de recursos, o número de nós de consulta no grupo e as respectivas configurações, etc.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Dados<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Página de dados do Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Segmentos</strong>: Visualize a lista de segmentos dos nós de dados/coordenadores e seus detalhes, incluindo o ID do segmento, a coleção correspondente, o estado, o tamanho, etc.</p></li>
<li><p><strong>Channels (Canais</strong>): Visualize a lista de canais dos nós de dados/coordenadores e os respectivos detalhes, incluindo o nome do canal, as colecções correspondentes, etc.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Tarefas<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Página de tarefas do Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Tarefas</strong>: Visualizar a lista de tarefas em execução no Milvus, incluindo o tipo de tarefa, estado e acções.</p>
<ul>
<li><p><strong>Tarefas do QueryCoord</strong>: Veja todas as tarefas do agendador do QueryCoord, incluindo verificadores de balanceador, índice/segmento/canal/líder nos últimos 15 minutos.</p></li>
<li><p><strong>Tarefas de compactação</strong>: Veja todas as tarefas de compactação dos coordenadores de dados nos últimos 15 minutos.</p></li>
<li><p><strong>Tarefas de criação de índices</strong>: Veja todas as tarefas de criação de índices dos coordenadores de dados nos últimos 30 minutos.</p></li>
<li><p><strong>Tarefas de importação</strong>: Visualizar todas as tarefas de importação dos coordenadores de dados nos últimos 30 minutos.</p></li>
<li><p><strong>Tarefas de sincronização de dados</strong>: Veja todas as tarefas de sincronização de dados dos nós de dados nos últimos 15 minutos.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Pedidos lentos<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Página de pedidos lentos do Milvus Web UI</span> </span></p>
<ul>
<li><strong>Pedidos lentos</strong>: Um pedido lento é uma pesquisa ou uma consulta que tem uma latência superior ao valor de <code translate="no">proxy.slowQuerySpanInSeconds</code> especificado na configuração. A lista de solicitações lentas exibe todas as solicitações lentas nos últimos 15 minutos.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Configurações<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Página de configurações do Milvus Web UI</span> </span></p>
<ul>
<li><strong>Configurações</strong>: Visualiza a lista de configurações de tempo de execução do Milvus e seus valores.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Ferramentas<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: Acesse a ferramenta pprof para criação de perfil e depuração do Milvus.</p></li>
<li><p><strong>Ferramenta de visualização de dados do Milvus</strong>: Aceder à ferramenta de visualização de dados do Milvus para visualizar os dados no Milvus.</p></li>
</ul>
