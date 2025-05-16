---
id: consistency.md
summary: Conheça os quatro níveis de consistência do Milvus.
title: Consistência
---
<h1 id="Consistency" class="common-anchor-header">Consistência<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico introduz os quatro níveis de consistência no Milvus e os seus cenários mais adequados. O mecanismo por trás da garantia de consistência no Milvus também é abordado neste tópico.</p>
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
    </button></h2><p>A consistência em uma base de dados distribuída refere-se especificamente à propriedade que garante que cada nó ou réplica tenha a mesma visão dos dados ao escrever ou ler dados num determinado momento.</p>
<p>Milvus suporta quatro níveis de consistência: forte, staleness limitado, sessão e eventualmente. O nível de consistência padrão no Milvus é o bounded staleness.  É possível ajustar facilmente o nível de consistência ao realizar uma <a href="/docs/pt/v2.4.x/single-vector-search.md">pesquisa de vetor único</a>, <a href="/docs/pt/v2.4.x/multi-vector-search.md">uma pesquisa híbrida</a> ou <a href="/docs/pt/v2.4.x/get-and-scalar-query.md">uma consulta</a> para melhor se adequar à sua aplicação.</p>
<h2 id="Consistency-levels" class="common-anchor-header">Níveis de consistência<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>Tal como definido pelo teorema <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a>, uma base de dados distribuída tem de fazer um compromisso entre consistência, disponibilidade e latência. Uma consistência elevada implica uma precisão elevada, mas também uma latência de pesquisa elevada, enquanto uma consistência baixa conduz a uma velocidade de pesquisa rápida, mas a uma certa perda de visibilidade dos dados. Por conseguinte, diferentes níveis de consistência adequam-se a diferentes cenários.</p>
<p>De seguida, explicamos as diferenças entre os quatro níveis de consistência suportados pelo Milvus e os cenários a que cada um se adequa.</p>
<h3 id="Strong" class="common-anchor-header">Forte</h3><p>Strong é o nível de consistência mais elevado e mais rigoroso. Garante que os utilizadores podem ler a versão mais recente dos dados.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>Consistência forte</span> </span></p>
<p>De acordo com o teorema PACELC, se o nível de consistência for definido como forte, a latência aumentará. Por conseguinte, recomendamos que escolha uma consistência forte durante os testes funcionais para garantir a exatidão dos resultados dos testes. A consistência forte também é mais adequada para aplicações que exigem rigorosamente a consistência dos dados à custa da velocidade de pesquisa. Um exemplo pode ser um sistema financeiro em linha que lida com pagamentos de encomendas e faturação.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">Estabilidade limitada</h3><p>A obsolescência limitada, como o próprio nome sugere, permite a inconsistência dos dados durante um determinado período de tempo. No entanto, geralmente, os dados são sempre globalmente consistentes fora desse período de tempo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>Consistência da estanquidade limitada</span> </span></p>
<p>A consistência limitada é adequada para cenários que necessitam de controlar a latência da pesquisa e podem aceitar a invisibilidade esporádica dos dados. Por exemplo, nos sistemas de recomendação, como os motores de recomendação de vídeo, a invisibilidade dos dados tem, por vezes, um pequeno impacto na taxa de recuperação global, mas pode aumentar significativamente o desempenho do sistema de recomendação.</p>
<h3 id="Session" class="common-anchor-header">Sessão</h3><p>A sessão garante que todas as escritas de dados podem ser imediatamente percepcionadas em leituras durante a mesma sessão. Por outras palavras, quando se escrevem dados através de um cliente, os dados recém-inseridos tornam-se instantaneamente pesquisáveis.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>Consistência da sessão</span> </span></p>
<p>Recomendamos que escolha a sessão como nível de consistência para os cenários em que a exigência de consistência dos dados na mesma sessão é elevada. Um exemplo pode ser a eliminação dos dados de uma entrada de livro do sistema da biblioteca e, após confirmação da eliminação e atualização da página (uma sessão diferente), o livro já não deve estar visível nos resultados da pesquisa.</p>
<h3 id="Eventually" class="common-anchor-header">Eventualmente</h3><p>Não existe uma ordem garantida de leituras e escritas, e as réplicas acabam por convergir para o mesmo estado, uma vez que não são efectuadas mais operações de escrita. Sob a consistência de &quot;eventualmente&quot;, as réplicas começam a trabalhar nos pedidos de leitura com os valores actualizados mais recentes. Eventualmente consistente é o nível mais fraco entre os quatro.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>Consistência eventual</span> </span></p>
<p>No entanto, de acordo com o teorema PACELC, a latência da pesquisa pode ser tremendamente reduzida com o sacrifício da consistência. Por conseguinte, a consistência eventual é mais adequada para cenários que não exigem muita consistência dos dados, mas requerem um desempenho de pesquisa extremamente rápido. Um exemplo pode ser a recuperação de críticas e classificações de produtos da Amazon com o nível de eventualmente consistente.</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">Carimbo de data/hora de garantia<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus permite diferentes níveis de consistência através da introdução do <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">carimbo de data/hora de garantia</a> (GuaranteeTs).</p>
<p>Um GuaranteeTs serve para informar os nós de consulta que um pedido de pesquisa ou consulta não será efectuado até que todos os dados antes do GuaranteeTs possam ser vistos pelos nós de consulta. Ao especificar o nível de consistência, o nível de consistência será mapeado para um valor específico de GuaranteeTs. Diferentes valores de GuaranteeTs correspondem a diferentes níveis de consistência:</p>
<ul>
<li><p><strong>Forte</strong>: GuaranteeTs é definido como idêntico ao carimbo de data/hora mais recente do sistema, e os nós de consulta aguardam até que todos os dados antes do carimbo de data/hora mais recente do sistema possam ser vistos, antes de processar a solicitação de pesquisa ou consulta.</p></li>
<li><p><strong>Staleness limitado</strong>: O GuaranteeTs é definido como relativamente menor do que o carimbo de data/hora mais recente do sistema, e os nós de consulta pesquisam numa vista de dados tolerável e menos actualizada.</p></li>
<li><p><strong>Sessão</strong>: O cliente utiliza o carimbo de data/hora da última operação de escrita como GuaranteeTs, para que cada cliente possa, pelo menos, recuperar os dados inseridos pelo mesmo cliente.</p></li>
<li><p><strong>Eventualmente</strong>: GuaranteeTs é definido para um valor muito pequeno para saltar a verificação de consistência. Os nós de consulta pesquisam imediatamente na visualização de dados existente.</p></li>
</ul>
<p>Veja <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Como funciona o GuaranteeTs</a> para mais informações sobre o mecanismo por trás da garantia de diferentes níveis de consistência no Milvus.</p>
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
<li>Saiba como ajustar o nível de consistência quando:<ul>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md">realizar uma pesquisa de vetor único</a></li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">conduzindo uma pesquisa híbrida</a></li>
<li><a href="/docs/pt/v2.4.x/get-and-scalar-query.md">realizar uma consulta escalar</a></li>
</ul></li>
</ul>
