---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Learn how to install Milvus standalone with Docker Desktop for Windows.
title: Run Milvus in Docker (Windows)
---

# Run Milvus in Docker (Windows)

> By default, this deployment runs **Woodpecker** (local filesystem) as its message queue, so no external message-queue service is required. See [Woodpecker](woodpecker.md).

This page demonstrates how to run Milvus on Windows using Docker Desktop with the WSL 2 backend and Linux containers.

## Prerequisites

- [Install Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) and meet its Windows and hardware requirements.
- [Install Windows Subsystem for Linux 2 (WSL 2)](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command).
- Start Docker Desktop, enable **Use the WSL 2 based engine**, and select Linux containers. For commands run inside a WSL distribution, also enable that distribution under **Settings** > **Resources** > **WSL Integration**. See [Docker Desktop WSL 2 backend](https://docs.docker.com/desktop/features/wsl/).

Run the following checks in PowerShell or Windows Command Prompt before downloading the Milvus files:

```powershell
wsl --version
docker info --format "{{.OSType}}"
docker compose version
```

The Docker OS type must be `linux`. The Compose examples use the `docker compose` plugin (V2 or later), not the legacy `docker-compose` V1 command.

## Run Milvus in Docker

Choose one of the following terminals. Run the commands in a writable working directory; the script stores configuration files and the `volumes` directory there.

The script is downloaded from the Milvus `master` branch. Its Docker image tag is defined in the script and can differ from v3.0.3. To deploy that exact release, use the versioned Docker Compose configuration below.

### From PowerShell

Download the script, then start Milvus:

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat" -OutFile standalone.bat
.\standalone.bat start
```

PowerShell requires the `.\` prefix to run a script from the working directory.

### From Windows Command Prompt

Use `curl.exe` to download the script; `Invoke-WebRequest` is a PowerShell command and does not run in Command Prompt:

```bat
curl.exe -fL "https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat" -o standalone.bat
standalone.bat start
```

After running either Windows command sequence:

- A Docker container named **milvus-standalone** serves port **19530**.
- Embedded etcd runs in the same container on port **2379**. Its configuration file maps to **embedEtcd.yaml** in the working directory.
- Milvus stores data in **volumes/milvus** in the working directory.
- Configuration overrides belong in **user.yaml** in the working directory. Restart the container after changing them.

Check the image and container status in either terminal:

```powershell
docker inspect --format "{{.Config.Image}}" milvus-standalone
docker ps --filter name=milvus-standalone
```

To stop Milvus from PowerShell, run `.\standalone.bat stop`; from Command Prompt, run `standalone.bat stop`. The `delete` command removes both the container and its stored data. Back up the data before using it.

### From WSL 2

Open your installed WSL distribution from a Windows terminal:

```powershell
wsl
```

In the WSL terminal, download the Linux script and start Milvus once:

```bash
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
```

To stop Milvus, run `bash standalone_embed.sh stop`. The `bash standalone_embed.sh delete` command removes the container, configuration, and data; back up the data before using it.

## Run Milvus with Docker Compose

Use the configuration attached to release v3.0.3. Run only the command sequence for your terminal.

### From PowerShell

Download the configuration and start Milvus:

```powershell
Invoke-WebRequest -Uri "https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml" -OutFile docker-compose.yml
docker compose up -d
docker compose ps
```

### From Windows Command Prompt

Download the configuration and start Milvus:

```bat
curl.exe -fL "https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml" -o docker-compose.yml
docker compose up -d
docker compose ps
```

### From WSL 2

Open your WSL distribution, then run the Linux commands:

```bash
wget https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
```

The configuration starts three long-running containers: **milvus-standalone**, **milvus-minio**, and **milvus-etcd**. It also runs the one-shot `milvus-volume-init` service to prepare data-directory ownership. Their data maps to **volumes/milvus**, **volumes/minio**, and **volumes/etcd** in the working directory. MinIO exposes ports **9000** and **9001**; Milvus exposes ports **19530** and **9091**. For configuration and lifecycle commands, see [Run Milvus with Docker Compose](install_standalone-docker-compose.md).

## FAQs

### How can I deal with the `Docker Engine stopped` error?

Milvus uses Linux containers. Check Docker Desktop and its WSL 2 backend before retrying the installation:

1. Enable hardware virtualization in BIOS/UEFI if **Task Manager** > **Performance** shows it is disabled. See the [Docker Desktop Windows requirements](https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements).
2. Start Docker Desktop from the Windows Start menu and wait for its engine to run. Administrator privileges may be required to install or update WSL or for specific Docker Desktop installation modes; they are not a general requirement for running Linux containers with the WSL 2 backend.
3. Check WSL from a Windows terminal. If it needs an update, run the update command with the privileges requested by Windows:

    ```powershell
    wsl --version
    wsl --update
    ```

4. Enable **Use the WSL 2 based engine** in Docker Desktop. If the Docker menu offers **Switch to Linux containers**, select it. Do not switch to Windows containers to troubleshoot a Milvus Linux image.
5. Run the following check in the terminal you use for installation:

    ```powershell
    docker info --format "{{.OSType}}"
    ```

    It must return `linux`. If it cannot connect to the daemon, follow [Docker Desktop troubleshooting](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/) before rerunning the Milvus script. Starting `com.docker.service` alone does not establish that the WSL 2 Linux engine is running.

### How can I deal with WSL-related issues while deploying Milvus?

If you have encountered WSL-related issues while running Milvus from WSL 2, you may need to check whether you have configured Docker Desktop to use the WSL 2-based engine as follows:

1. Ensure that "Use the WSL 2 based engine" is checked in **Settings** > **General**.

    ![Use the WSL 2 based engine in Docker Desktop Settings](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png)

2. Select from your installed WSL 2 distributions which you want to enable Docker integration on by going to: **Settings** > **Resources** > **WSL Integration**.

    ![Select WSL 2 distributions in Docker Desktop Settings](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png)

### How can I deal with the volume-related errors prompted during Milvus startup that reads `Read config failed`?

![Read config failed error prompt in Milvus startup](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png)

To deal with the error prompted during Milvus startup that reads "Read config failed," you need to check whether the volume mounted into the Milvus container is correct. If the volume is correctly mounted into the container, you can use the `docker exec` command to go into the container and list the **/milvus/configs** folder as follows:

![List Milvus config files](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png)


<div class="alert note">

Storage V3 is disabled by default. Enable it before using features that depend on it. For requirements and compatibility considerations, see [Storage V3](storage-v3.md).

</div>


## What's next

Having installed Milvus in Docker, follow the **Use an existing Milvus server** path in [Quickstart](quickstart.md) and connect the SDK to `http://localhost:19530`. This server path does not need Milvus Lite; the local `.db` connection block would start a separate local database instead of using this container.

You can also:

- Check [Quickstart](quickstart.md) to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- For Compose deployments, follow [Upgrade Milvus Standalone with Docker Compose](upgrade_milvus_standalone-docker.md); validate the procedure in your environment before upgrading.
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvu cluster on clouds:
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus WebUI](milvus-webui.md), an intuitive web interface for Milvus observability and management.
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
