---
id: tls.md
title: Encryption in Transit
summary: Learn how to enable TLS proxy in Milvus.
---

# Encryption in Transit

TLS (Transport Layer Security) is an encryption protocol to ensure communication security. Milvus proxy uses TLS one-way and two-way authentication.

This topic describes how to enable TLS proxy in Milvus.

<div class="alert note">

TLS and user authentication are two distinct security approaches. If you have enabled both user authentication and TLS in your Milvus system, you will need to provide a username, password, and certificate file paths. For information on how to enable user authentication, refer to [Authenticate User Access](authenticate.md).

</div>

## Create your own certificate

### Prerequisites

Make sure OpenSSL is installed. If you have not installed it, [build and install](https://github.com/openssl/openssl/blob/master/INSTALL.md) OpenSSL first.

```shell
openssl version
```

If OpenSSL is not installed. It can be installed with the following command in Ubuntu.

```shell
sudo apt install openssl
```

### Create files

1. Create the `openssl.cnf` and `gen.sh` files.

```
mkdir cert && cd cert
touch openssl.cnf gen.sh
```

2. Copy the following configurations into the files respectively. 

<details><summary><code>openssl.cnf</code></summary>

```ini
#
# OpenSSL example configuration file.
# This is mostly being used for generation of certificate requests.
#

# This definition stops the following lines choking if HOME isn't
# defined.
HOME			= .
RANDFILE		= $ENV::HOME/.rnd

# Extra OBJECT IDENTIFIER info:
#oid_file		= $ENV::HOME/.oid
oid_section		= new_oids

# To use this configuration file with the "-extfile" option of the
# "openssl x509" utility, name here the section containing the
# X.509v3 extensions to use:
# extensions		= 
# (Alternatively, use a configuration file that has only
# X.509v3 extensions in its main [= default] section.)

[ new_oids ]

# We can add new OIDs in here for use by 'ca', 'req' and 'ts'.
# Add a simple OID like this:
# testoid1=1.2.3.4
# Or use config file substitution like this:
# testoid2=${testoid1}.5.6

# Policies used by the TSA examples.
tsa_policy1 = 1.2.3.4.1
tsa_policy2 = 1.2.3.4.5.6
tsa_policy3 = 1.2.3.4.5.7

####################################################################
[ ca ]
default_ca	= CA_default		# The default ca section

####################################################################
[ CA_default ]

dir		= ./demoCA		# Where everything is kept
certs		= $dir/certs		# Where the issued certs are kept
crl_dir		= $dir/crl		# Where the issued crl are kept
database	= $dir/index.txt	# database index file.
#unique_subject	= no			# Set to 'no' to allow creation of
					# several ctificates with same subject.
new_certs_dir	= $dir/newcerts		# default place for new certs.

certificate	= $dir/cacert.pem 	# The CA certificate
serial		= $dir/serial 		# The current serial number
crlnumber	= $dir/crlnumber	# the current crl number
					# must be commented out to leave a V1 CRL
crl		= $dir/crl.pem 		# The current CRL
private_key	= $dir/private/cakey.pem# The private key
RANDFILE	= $dir/private/.rand	# private random number file

x509_extensions	= usr_cert		# The extentions to add to the cert

# Comment out the following two lines for the "traditional"
# (and highly broken) format.
name_opt 	= ca_default		# Subject Name options
cert_opt 	= ca_default		# Certificate field options

# Extension copying option: use with caution.
copy_extensions = copy

# Extensions to add to a CRL. Note: Netscape communicator chokes on V2 CRLs
# so this is commented out by default to leave a V1 CRL.
# crlnumber must also be commented out to leave a V1 CRL.
# crl_extensions	= crl_ext

default_days	= 365			# how long to certify for
default_crl_days= 30			# how long before next CRL
default_md	= default		# use public key default MD
preserve	= no			# keep passed DN ordering

# A few difference way of specifying how similar the request should look
# For type CA, the listed attributes must be the same, and the optional
# and supplied fields are just that :-)
policy		= policy_match

# For the CA policy
[ policy_match ]
countryName		= match
stateOrProvinceName	= match
organizationName	= match
organizationalUnitName	= optional
commonName		= supplied
emailAddress		= optional

# For the 'anything' policy
# At this point in time, you must list all acceptable 'object'
# types.
[ policy_anything ]
countryName		= optional
stateOrProvinceName	= optional
localityName		= optional
organizationName	= optional
organizationalUnitName	= optional
commonName		= supplied
emailAddress		= optional

####################################################################
[ req ]
default_bits		= 2048
default_keyfile 	= privkey.pem
distinguished_name	= req_distinguished_name
attributes		= req_attributes
x509_extensions	= v3_ca	# The extentions to add to the self signed cert

# Passwords for private keys if not present they will be prompted for
# input_password = secret
# output_password = secret

# This sets a mask for permitted string types. There are several options. 
# default: PrintableString, T61String, BMPString.
# pkix	 : PrintableString, BMPString (PKIX recommendation before 2004)
# utf8only: only UTF8Strings (PKIX recommendation after 2004).
# nombstr : PrintableString, T61String (no BMPStrings or UTF8Strings).
# MASK:XXXX a literal mask value.
# WARNING: ancient versions of Netscape crash on BMPStrings or UTF8Strings.
string_mask = utf8only

req_extensions = v3_req # The extensions to add to a certificate request

[ req_distinguished_name ]
countryName			= Country Name (2 letter code)
countryName_default		= AU
countryName_min			= 2
countryName_max			= 2

stateOrProvinceName		= State or Province Name (full name)
stateOrProvinceName_default	= Some-State

localityName			= Locality Name (eg, city)

0.organizationName		= Organization Name (eg, company)
0.organizationName_default	= Internet Widgits Pty Ltd

# we can do this but it is not needed normally :-)
#1.organizationName		= Second Organization Name (eg, company)
#1.organizationName_default	= World Wide Web Pty Ltd

organizationalUnitName		= Organizational Unit Name (eg, section)
#organizationalUnitName_default	=

commonName			= Common Name (e.g. server FQDN or YOUR name)
commonName_max			= 64

emailAddress			= Email Address
emailAddress_max		= 64

# SET-ex3			= SET extension number 3

[ req_attributes ]
challengePassword		= A challenge password
challengePassword_min		= 4
challengePassword_max		= 20

unstructuredName		= An optional company name

[ usr_cert ]

# These extensions are added when 'ca' signs a request.

# This goes against PKIX guidelines but some CAs do it and some software
# requires this to avoid interpreting an end user certificate as a CA.

basicConstraints=CA:FALSE

# Here are some examples of the usage of nsCertType. If it is omitted
# the certificate can be used for anything *except* object signing.

# This is OK for an SSL server.
# nsCertType			= server

# For an object signing certificate this would be used.
# nsCertType = objsign

# For normal client use this is typical
# nsCertType = client, email

# and for everything including object signing:
# nsCertType = client, email, objsign

# This is typical in keyUsage for a client certificate.
# keyUsage = nonRepudiation, digitalSignature, keyEncipherment

# This will be displayed in Netscape's comment listbox.
nsComment			= "OpenSSL Generated Certificate"

# PKIX recommendations harmless if included in all certificates.
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid,issuer

# This stuff is for subjectAltName and issuerAltname.
# Import the email address.
# subjectAltName=email:copy
# An alternative to produce certificates that aren't
# deprecated according to PKIX.
# subjectAltName=email:move

# Copy subject details
# issuerAltName=issuer:copy

#nsCaRevocationUrl		= http://www.domain.dom/ca-crl.pem
#nsBaseUrl
#nsRevocationUrl
#nsRenewalUrl
#nsCaPolicyUrl
#nsSslServerName

# This is required for TSA certificates.
# extendedKeyUsage = critical,timeStamping

[ v3_req ]

# Extensions to add to a certificate request

basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment


[ v3_ca ]


# Extensions for a typical CA


# PKIX recommendation.

subjectKeyIdentifier=hash

authorityKeyIdentifier=keyid:always,issuer

# This is what PKIX recommends but some broken software chokes on critical
# extensions.
#basicConstraints = critical,CA:true
# So we do this instead.
basicConstraints = CA:true

# Key usage: this is typical for a CA certificate. However since it will
# prevent it being used as an test self-signed certificate it is best
# left out by default.
# keyUsage = cRLSign, keyCertSign

# Some might want this also
# nsCertType = sslCA, emailCA

# Include email address in subject alt name: another PKIX recommendation
# subjectAltName=email:copy
# Copy issuer details
# issuerAltName=issuer:copy

# DER hex encoding of an extension: beware experts only!
# obj=DER:02:03
# Where 'obj' is a standard or added object
# You can even override a supported extension:
# basicConstraints= critical, DER:30:03:01:01:FF

[ crl_ext ]

# CRL extensions.
# Only issuerAltName and authorityKeyIdentifier make any sense in a CRL.

# issuerAltName=issuer:copy
authorityKeyIdentifier=keyid:always

[ proxy_cert_ext ]
# These extensions should be added when creating a proxy certificate

# This goes against PKIX guidelines but some CAs do it and some software
# requires this to avoid interpreting an end user certificate as a CA.

basicConstraints=CA:FALSE

# Here are some examples of the usage of nsCertType. If it is omitted
# the certificate can be used for anything *except* object signing.

# This is OK for an SSL server.
# nsCertType			= server

# For an object signing certificate this would be used.
# nsCertType = objsign

# For normal client use this is typical
# nsCertType = client, email

# and for everything including object signing:
# nsCertType = client, email, objsign

# This is typical in keyUsage for a client certificate.
# keyUsage = nonRepudiation, digitalSignature, keyEncipherment

# This will be displayed in Netscape's comment listbox.
nsComment			= "OpenSSL Generated Certificate"

# PKIX recommendations harmless if included in all certificates.
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid,issuer

# This stuff is for subjectAltName and issuerAltname.
# Import the email address.
# subjectAltName=email:copy
# An alternative to produce certificates that aren't
# deprecated according to PKIX.
# subjectAltName=email:move

# Copy subject details
# issuerAltName=issuer:copy

#nsCaRevocationUrl		= http://www.domain.dom/ca-crl.pem
#nsBaseUrl
#nsRevocationUrl
#nsRenewalUrl
#nsCaPolicyUrl
#nsSslServerName

# This really needs to be in place for it to be a proxy certificate.
proxyCertInfo=critical,language:id-ppl-anyLanguage,pathlen:3,policy:foo

####################################################################
[ tsa ]

default_tsa = tsa_config1	# the default TSA section

[ tsa_config1 ]

# These are used by the TSA reply generation only.
dir		= ./demoCA		# TSA root directory
serial		= $dir/tsaserial	# The current serial number (mandatory)
crypto_device	= builtin		# OpenSSL engine to use for signing
signer_cert	= $dir/tsacert.pem 	# The TSA signing certificate
					# (optional)
certs		= $dir/cacert.pem	# Certificate chain to include in reply
					# (optional)
signer_key	= $dir/private/tsakey.pem # The TSA private key (optional)

default_policy	= tsa_policy1		# Policy if request did not specify it
					# (optional)
other_policies	= tsa_policy2, tsa_policy3	# acceptable policies (optional)
digests		= md5, sha1		# Acceptable message digests (mandatory)
accuracy	= secs:1, millisecs:500, microsecs:100	# (optional)
clock_precision_digits  = 0	# number of digits after dot. (optional)
ordering		= yes	# Is ordering defined for timestamps?
				# (optional, default: no)
tsa_name		= yes	# Must the TSA name be included in the reply?
				# (optional, default: no)
ess_cert_id_chain	= no	# Must the ESS cert id chain be included?
				# (optional, default: no)
```

</details>

The `openssl.cnf` file is a default OpenSSL configuration file. See [manual page](https://www.openssl.org/docs/manmaster/man5/config.html) for more information. The `gen.sh` file generates relevant certificate files. You can modify the `gen.sh` file for different purposes such as changing the validity period of the certificate file, the length of the certificate key or the certificate file names.

It is necessary to configure the `CommonName` in the `gen.sh` file. The `CommonName` refers to the server name that the client should specify while connecting.

<details><summary><code>gen.sh</code></summary>

```shell
#!/usr/bin/env sh
# your variables
Country="CN"
State="Shanghai"
Location="Shanghai"
Organization="milvus"
Organizational="milvus"
CommonName="localhost"

echo "generate ca.key"
openssl genrsa -out ca.key 2048

echo "generate ca.pem"
openssl req -new -x509 -key ca.key -out ca.pem -days 3650 -subj "/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$Organizational/CN=$CommonName"

echo "generate server SAN certificate"
openssl genpkey -algorithm RSA -out server.key
openssl req -new -nodes -key server.key -out server.csr -days 3650 -subj "/C=$Country/O=$Organization/OU=$Organizational/CN=$CommonName" -config ./openssl.cnf -extensions v3_req
openssl x509 -req -days 3650 -in server.csr -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial -extfile ./openssl.cnf -extensions v3_req

echo "generate client SAN certificate"
openssl genpkey -algorithm RSA -out client.key
openssl req -new -nodes -key client.key -out client.csr -days 3650 -subj "/C=$Country/O=$Organization/OU=$Organizational/CN=$CommonName" -config ./openssl.cnf -extensions v3_req
openssl x509 -req -days 3650 -in client.csr -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial -extfile ./openssl.cnf -extensions v3_req

```
</details>

The variables in the `gen.sh` file are crucial to the process of creating a certificate signing request file. The first five variables are the basic signing information, including country, state, location, organization, organization unit. Caution is needed when configuring `CommonName` as it will be verified during client-server communication.

### Run `gen.sh` to generate certificate

Run the `gen.sh` file to create certificate.

```
chmod +x gen.sh
./gen.sh
```

The following nine files will be created: `ca.key`, `ca.pem`, `ca.srl`, `server.key`, `server.pem`, `server.csr`, `client.key`, `client.pem`, `client.csr`.

### Modify the detail of certificate files (optional)

After generating the certificate, you can modify the detail of the certificate files according to your own need.

The implementation of SSL or TSL mutual authentication involves a client, a server, and a certificate authority (CA). A CA is used to ensure that the certificate between a client and a server is legal.

Run `man openssl` or see [the openssl manual page](https://www.openssl.org/docs/) for more information about using the OpenSSL command.

1. Generate an RSA private key for the ca.

```
openssl genpkey -algorithm RSA -out ca.key
```

2. Request CA certificate generation. 

You need to provide the basic information about the CA in this step. Choose the `x509` option to skip the request and directly generate a self-signing certificate.

```
openssl req -new -x509 -key ca.key -out ca.pem -days 3650 -subj "/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$Organizational/CN=$CommonName"
```

You will get a `ca.pem` file , a CA certificate that can be used to generate client-server certificates after this step.

3. Generate a server private key. 

```
openssl genpkey -algorithm RSA -out server.key
```

You will get a `server.key` file after this step.

4. Generate a certificate signing request file.

You need to provide the required information about the server to generate a certificate signing request file.

```
openssl req -new -nodes -key server.key -out server.csr -days 3650 -subj "/C=$Country/O=$Organization/OU=$Organizational/CN=$CommonName" -config ./openssl.cnf -extensions v3_req
```

You will get a `server.csr` file after this step.

5. Sign the certificate.

Open the `server.csr`, the `ca.key` and the `ca.pem` files to sign the certificate. The `CAcreateserial` command option is used to create a CA serial number file if it does not exist. You will get an `aca.srl` file after choosing this command option.

```
openssl x509 -req -days 3650 -in server.csr -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial -extfile ./openssl.cnf -extensions v3_req
```

## Set up a Milvus server with TLS

This section outlines the steps to configure a Milvus server with TLS encryption.

<div class="alert note">

Due to current limitations with milvus-helm and milvus-operator regarding certificate file path configurations, this guide will focus on deployment using Docker Compose.

</div>

### 1. Modify the Milvus server configuration

To enable TLS, set `common.security.tlsMode` in `milvus.yaml` to `1` (for one-way TLS) or `2` (for two-way TLS).

```yaml
tls:
  serverPemPath: /milvus/tls/server.pem
  serverKeyPath: /milvus/tls/server.key
  caPemPath: /milvus/tls/ca.pem

common:
  security:
    tlsMode: 1
```

Parameters:

- `serverPemPath`: The path to the server certificate file.
- `serverKeyPath`: The path to the server key file.
- `caPemPath`: The path to the CA certificate file.
- `tlsMode`: The TLS mode for encryption. Valid values:
  - `1`: One-way authentication, where only the server requires a certificate and the client verifies it. This mode requires `server.pem` and `server.key` from the server side, and `server.pem` from the client side.
  - `2`: Two-way authentication, where both the server and the client require certificates to establish a secure connection. This mode requires `server.pem`, `server.key`, and `ca.pem` from the server side, and `client.pem`, `client.key`, and `ca.pem` from the client side.

### 2. Map certificate files to the container

#### Prepare certificate files

Create a new folder named `tls` in the same directory as your `docker-compose.yaml`. Copy the `server.pem`, `server.key`, and `ca.pem` into the `tls` folder. Place them in a directory structure as follows:

```
├── docker-compose.yml
├── milvus.yaml
└── tls
     ├── server.pem
     ├── server.key
     └── ca.pem
```

#### Update Docker Compose configuration

Edit the `docker-compose.yaml` file to map the certificate file paths inside the container as shown below:

```yaml
  standalone:
    container_name: milvus-standalone
    image: milvusdb/milvus:latest
    command: ["milvus", "run", "standalone"]
    security_opt:
    - seccomp:unconfined
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
      - ${DOCKER_VOLUME_DIRECTORY:-.}/tls:/milvus/tls
      - ${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml
```

#### Deploy Milvus using Docker Compose

Execute the following command to deploy Milvus:

```bash
sudo docker compose up -d
```

## Connect to the Milvus server with TLS

For SDK interactions, use the following setups depending on the TLS mode.

### One-way TLS connection

Provide the path to `server.pem` and ensure the `server_name` matches the `CommonName` configured in the certificate.
  
```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    secure=True,
    server_pem_path="path_to/server.pem",
    server_name="localhost"
)
```

### Two-way TLS connection

Provide paths to `client.pem`, `client.key`, and `ca.pem`, and ensure the `server_name` matches the `CommonName` configured in the certificate.

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    secure=True,
    client_pem_path="path_to/client.pem",
    client_key_path="path_to/client.key",
    ca_pem_path="path_to/ca.pem",
    server_name="localhost"
)
```

See [example_tls1.py](https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py) and [example_tls2.py](https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls2.py) for more information.
