---
id: roadmap.md
title: Milvus路线图
related_key: Milvus roadmap
summary: Milvus 是一个开源向量数据库，旨在为人工智能应用提供支持。以下是我们的发展路线图。
---

<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 路线图<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>欢迎访问 Milvus 路线图！加入我们不断增强和发展 Milvus 的旅程。我们很高兴与大家分享我们的成就、未来计划以及对未来的展望。我们的路线图不仅仅是一份即将推出的功能列表，它还反映了我们对创新的承诺以及与社区合作的决心。我们邀请您深入了解我们的路线图，提供您的反馈意见，帮助塑造 Milvus 的未来！</p>
<h2 id="Roadmap" class="common-anchor-header">路线图<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><table>
    <thead>
        <tr>
            <th>类别</th>
            <th>Milvus 2.4.0（近期实现）</th>
            <th>Milvus 2.5.0（即将于 24 年度中期推出）</th>
            <th>未来路线图（Milvus 3.0 预计在 CY24 内发布）</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>对人工智能开发人员友好的</strong><br/><i>对开发人员友好的技术堆栈，采用最新的人工智能创新技术进行增强</i></td>
            <td><strong>多向量与混合搜索</strong><br/><i>用于多重召回和融合的框架</i><br/><br/><strong>GPU 索引加速</strong><br/><i>支持更高的 QPS 和更快的索引创建</i><br/><br/><strong>PyMilvus 中的模型库</strong><br/><i>Milvus</i><strong>的</strong><i>集成嵌入模型</i></td>
            <td><strong>Sparse Vector (GA)</strong><br/><i>本地特征提取和关键词搜索</i><br/><br/><strong>Milvus Lite (GA)</strong><br/><i>Milvus 的轻量级内存版本</i><br/><br/><strong>嵌入模型</strong><i>库</i><br/><i>支持模型库中</i><i>的</i><i>图像和多模态嵌入以及 reranker 模型</i></td>
            <td><strong>原始数据输入和数据输出</strong><br/><i>支持 Blob 数据类型</i><br/><br/><strong>数据聚类</strong><br/><i>数据共定位</i><br/><br/><strong>面向场景的向量搜索</strong><br/> 例如<i>多目标搜索和 NN 过滤</i><br/><br/><strong>支持嵌入和 Reranker 端点</strong></td>
        </tr>
        <tr>
            <td><strong>丰富的功能</strong><br/><i>增强的检索和数据管理功能</i></td>
            <td><strong>支持 FP16、BF16 数据类型</strong><br/><i>这些 ML 数据类型有助于降低内存使用率</i><br/><br/><strong>分组搜索</strong><br/> 聚合<i>拆分嵌入</i><br/><br/> 模糊<strong>匹配和倒排索引</strong><br/><i>支持标量类型（如 varchar 和 int）的模糊匹配和倒排索引</i></td>
            <td><strong>针对</strong><i>数组</i><strong>和 JSON 的反转索引</strong><br/><i>针对数组和部分支持 JSON 的索引</i><br/><br/> Bitset<strong>索引</strong><br/><i>改进了执行速度和未来的数据聚合</i><br/><br/><strong>Truncate Collection</strong><br/><i>允许在保留元数据的同时清除数据</i><br/><br/><strong>支持 NULL 和默认值</strong></td>
            <td><strong>支持更多数据类型</strong><br/><i>，如日期时间、地理信息系统</i><br/><br/><strong>高级文本过滤</strong><br/> ，如<i>匹配短语</i><br/><br/><strong>主键重复数据删除</strong></td>
        </tr>
        <tr>
            <td><strong>成本效益和架构</strong><br/><i>强调稳定性、成本效益、可扩展性和性能的先进系统</i></td>
            <td><strong>支持更多的集合/分区</strong><br/><i>在较小的集群中处理超过 10,000 个集合</i><br/><br/><strong>Mmap 优化</strong><br/><i>在降低内存消耗和延迟之间取得平衡</i><br/><br/><strong>批量插入优化</strong><br/><i>简化大型数据集的导入</i><i>操作</i></td>
            <td><strong>懒加载</strong><br/><i>通过读取操作按需加载数据</i><br/><br/><strong>主要压缩</strong><br/><i>根据配置重新分配数据，以提高读取性能</i><br/><br/><strong>用于增长数据的 Mmap</strong><br/><i>用于扩展数据段的 Mmap 文件</i></td>
            <td><strong>内存控制</strong><br/><i>减少内存不足问题，提供全局内存管理</i><br/><br/><strong>LogNode 简介</strong><br/><i>确保全局一致性，解决根协调中的单点瓶颈</i><br/><br/><strong>存储格式 V2</strong><br/><i>通用格式设计为基于磁盘的数据访问奠定了基础</i></td>
        </tr>
        <tr>
            <td><strong>企业就绪</strong><br/><i>旨在满足企业生产环境的需求</i></td>
            <td><strong>Milvus CDC</strong><br/><i>数据复制功能</i><br/><br/><strong>Accesslog 增强</strong><br/><i>用于审计和跟踪的详细记录</i></td>
            <td><strong>新资源组</strong><br/><i>增强的资源管理</i><br/><br/><strong>存储钩</strong><br/><i>支持自带密钥 (BYOK) 加密</i></td>
            <td><strong>动态副本数量调整</strong><br/><i>便于动态更改副本数量</i><br/><br/><strong>动态模式修改</strong><br/> 例如<i>，添加/删除字段、修改 varchar 长度</i><br/><br/> Rust<strong>和 C# SDKs</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>我们的路线图通常分为三个部分：最新发布的版本、即将发布的下一个版本以及明年的中长期愿景。</li>
<li>随着我们的进步，我们会不断学习，偶尔调整我们的重点，根据需要添加或删除项目。</li>
<li>这些计划仅供参考，可能会根据订阅服务的不同而有所变化。</li>
<li>我们将坚定不移地遵循我们的路线图，并以我们的<a href="/docs/zh/v2.4.x/release_notes.md">发布说明</a>作为参考。</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">如何贡献<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>作为一个开源项目，Milvus 依赖于社区贡献。以下是您如何参与我们的旅程。</p>
<h3 id="Share-feedback" class="common-anchor-header">分享反馈</h3><ul>
<li><p>问题报告：遇到错误或有建议？在我们的<a href="https://github.com/milvus-io/milvus/issues">GitHub 页面</a>上打开一个问题。</p></li>
<li><p>功能建议：有关于新功能或改进的想法？<a href="https://github.com/milvus-io/milvus/discussions">我们很乐意听取您的意见！</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">代码贡献</h3><ul>
<li><p>拉取请求：直接向我们的<a href="https://github.com/milvus-io/milvus/pulls">代码库</a>投稿。无论是修复错误、添加功能还是改进文档，我们都欢迎您的贡献。</p></li>
<li><p>开发指南：查看我们的<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">贡献者指南</a>，了解代码贡献<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">指南</a>。</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">传播信息</h3><ul>
<li><p>社交分享：喜欢 Milvus 吗？在社交媒体和技术博客上分享您的使用案例和经验。</p></li>
<li><p>在 GitHub 上为我们加星：在我们的<a href="https://github.com/milvus-io/milvus">GitHub 存储库上</a>加星，表示您对我们的支持。</p></li>
</ul>
