---
id: install_standalone-binary.md
label: "RPM/DEB Package"
related_key: "RPM/DEB Package"
summary: Check RPM/DEB package availability and choose a supported Milvus Standalone installation method.
title: Install Milvus Standalone with RPM/DEB Package
---

# Install Milvus Standalone with RPM/DEB Package

This page explains package availability for Milvus Standalone and links to installation methods with published release assets.

## Check package availability

Milvus 3.0.x releases, including [v3.0.3](https://github.com/milvus-io/milvus/releases/tag/v3.0.3), publish Docker Compose configuration files but no RPM or DEB packages. Do not construct RPM or DEB download URLs for these releases; a package filename in a download command does not make that asset available.

For another release, check the **Assets** section of its [Milvus release page](https://github.com/milvus-io/milvus/releases) before choosing a package installation method. Use only a package actually listed for that release and your system architecture.

## Install Milvus Standalone with Docker

For v3.0.3, choose one of these installation methods:

- [Run Milvus with Docker Compose (Linux)](install_standalone-docker-compose.md) to use the Compose configuration published with v3.0.3.
- [Run Milvus in Docker (Linux)](install_standalone-docker.md) to use the standalone installation script. Check the image tag in the script before running it.
- [Run Milvus in Docker (Windows)](install_standalone-windows.md) to use Docker Desktop with the WSL 2 backend and Linux containers.

Check the [hardware and software requirements](prerequisite-docker.md) before installation. After the instance is running, follow the **Use an existing Milvus server** path in [Quickstart](quickstart.md), connecting to `http://localhost:19530` instead of a local `.db` path, to insert data and run a search.
