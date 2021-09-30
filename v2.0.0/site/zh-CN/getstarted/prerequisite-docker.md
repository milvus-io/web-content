---
id: prerequisite-docker.md
label: Install with Docker Compose
order: 0
group: prerequisite
---
# 安装前提
安装前请先检查你的软件及硬件设备是否满足 Milvus 安装要求。

<div class="tab-wrapper"><a href="prerequisite-docker.md" class='active '>Install with Docker Compose</a><a href="prerequisite-helm.md" class=''>Install on Kubernetes</a></div>

## CPU 支持

Milvus 在构建索引和查询向量时依赖 CPU 对 SIMD (Single Instruction Multiple Data) 扩展指令集合的支持。请确保运行 Milvus 的 CPU 至少支持以下一种 SIMD 指令集合：

- SSE4.2
- AVX
- AVX2
- AVX512

使用 lscpu 命令以检查 CPU 是否支持特定 SIMD 指令集合：

```
lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

参考 Wikipedia [AVX 指令集](https://zh.wikipedia.org/wiki/AVX%E6%8C%87%E4%BB%A4%E9%9B%86) 了解更多细节。

## 检查 Docker 及 Docker Compose 版本： 

- 运行 `$ sudo docker info` 确认 Docker 版本。建议使用 19.03 或以上版本。

<div class="alert note">
安装 Docker 步骤见 <a href="https://docs.docker.com/get-docker/"> Docker CE/EE </a> 官方安装说明。
</div>

- 运行 `$ sudo docker-compose version` 确认 Docker Compose 版本。建议使用 1.25.1 或以上版本。

<div class="alert note">
安装 Docker Compose 步骤见 <a href="https://docs.docker.com/compose/install/">Docker Compose </a> 官方安装说明。
</div>

## 安装 Docker Desktop  

| 操作系统 | 安装要求 |
| ---------- | ----------------- | 
| **macOS**      | 安装 Mac 版本 Docker，详见[安装说明](https://docs.docker.com/docker-for-mac/). <br/> **注意：** 我们推荐在 Docker 虚拟机中至少设置 2 个虚拟 CPU 及 8 GB 初始内存，否则安装可能失败。<br/> **注意：** Milvus 暂不支持 Apple M1 CPU.            | 
| **Linux 系统本地安装 Docker**    |安装 Linux 版本 Docker，详见[安装说明](https://docs.docker.com/installation/#installation)。              |
| **Windows 系统安装 Docker Desktop WSL2 后台**    | 安装 Windows 版本 Docker，详见[安装说明](https://docs.docker.com/docker-for-windows/wsl-tech-preview/)。 <br/> <div class="alert note"> 源码必须保存在本地 Linux 文件系统中，而非 Windows 挂载远程文件系统 <code>/mnt/c</code> 中。 </div>              | 

