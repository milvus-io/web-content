---
id: tls.md
title: 전송 중 암호화
summary: Milvus에서 TLS 프록시를 활성화하는 방법을 알아보세요.
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">전송 중 암호화<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS(전송 계층 보안)는 통신 보안을 보장하기 위한 암호화 프로토콜입니다. Milvus 프록시는 TLS 단방향 및 양방향 인증을 사용합니다.</p>
<p>이 항목에서는 Milvus 프록시에서 gRPC 및 RESTful 트래픽 모두에 대해 TLS를 활성화하는 방법에 대해 설명합니다.</p>
<div class="alert note">
<p>TLS와 사용자 인증은 서로 다른 두 가지 보안 접근 방식입니다. Milvus 시스템에서 사용자 인증과 TLS를 모두 사용 설정한 경우 사용자 이름, 비밀번호 및 인증서 파일 경로를 제공해야 합니다. 사용자 인증을 활성화하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/authenticate.md">사용자 액세스 인증을</a> 참조하세요.</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">나만의 인증서 만들기<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><p>OpenSSL이 설치되어 있는지 확인합니다. 설치하지 않은 경우 먼저 OpenSSL을 <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">빌드하여 설치합니다</a>.</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>OpenSSL이 설치되어 있지 않은 경우. 우분투에서 다음 명령어로 설치할 수 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">파일 만들기</h3><ol>
<li><code translate="no">openssl.cnf</code> 및 <code translate="no">gen.sh</code> 파일을 만듭니다.</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">mkdir</span> cert &amp;&amp; <span class="hljs-built_in">cd</span> cert
<span class="hljs-built_in">touch</span> openssl.cnf gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>다음 구성을 각각 파일에 복사합니다.</li>
</ol>
<p><details><summary><code translate="no">openssl.cnf</code></summary></p>
<pre><code translate="no" class="language-ini"><span class="hljs-comment">#</span>
<span class="hljs-comment"># OpenSSL example configuration file.</span>
<span class="hljs-comment"># This is mostly being used for generation of certificate requests.</span>
<span class="hljs-comment">#</span>

<span class="hljs-comment"># This definition stops the following lines choking if HOME isn&#x27;t</span>
<span class="hljs-comment"># defined.</span>
HOME            = .
RANDFILE        = $ENV::HOME/.rnd

<span class="hljs-comment"># Extra OBJECT IDENTIFIER info:</span>
<span class="hljs-comment">#oid_file       = $ENV::HOME/.oid</span>
oid_section     = new_oids

<span class="hljs-comment"># To use this configuration file with the &quot;-extfile&quot; option of the</span>
<span class="hljs-comment"># &quot;openssl x509&quot; utility, name here the section containing the</span>
<span class="hljs-comment"># X.509v3 extensions to use:</span>
<span class="hljs-comment"># extensions        = </span>
<span class="hljs-comment"># (Alternatively, use a configuration file that has only</span>
<span class="hljs-comment"># X.509v3 extensions in its main [= default] section.)</span>

[ new_oids ]

<span class="hljs-comment"># We can add new OIDs in here for use by &#x27;ca&#x27;, &#x27;req&#x27; and &#x27;ts&#x27;.</span>
<span class="hljs-comment"># Add a simple OID like this:</span>
<span class="hljs-comment"># testoid1=1.2.3.4</span>
<span class="hljs-comment"># Or use config file substitution like this:</span>
<span class="hljs-comment"># testoid2=${testoid1}.5.6</span>

<span class="hljs-comment"># Policies used by the TSA examples.</span>
tsa_policy1 = <span class="hljs-number">1.2</span><span class="hljs-number">.3</span><span class="hljs-number">.4</span><span class="hljs-number">.1</span>
tsa_policy2 = <span class="hljs-number">1.2</span><span class="hljs-number">.3</span><span class="hljs-number">.4</span><span class="hljs-number">.5</span><span class="hljs-number">.6</span>
tsa_policy3 = <span class="hljs-number">1.2</span><span class="hljs-number">.3</span><span class="hljs-number">.4</span><span class="hljs-number">.5</span><span class="hljs-number">.7</span>

<span class="hljs-comment">####################################################################</span>
[ ca ]
default_ca  = CA_default        <span class="hljs-comment"># The default ca section</span>

<span class="hljs-comment">####################################################################</span>
[ CA_default ]

<span class="hljs-built_in">dir</span>     = ./demoCA      <span class="hljs-comment"># Where everything is kept</span>
certs       = $<span class="hljs-built_in">dir</span>/certs        <span class="hljs-comment"># Where the issued certs are kept</span>
crl_dir     = $<span class="hljs-built_in">dir</span>/crl      <span class="hljs-comment"># Where the issued crl are kept</span>
database    = $<span class="hljs-built_in">dir</span>/index.txt    <span class="hljs-comment"># database index file.</span>
<span class="hljs-comment">#unique_subject = no            # Set to &#x27;no&#x27; to allow creation of</span>
                    <span class="hljs-comment"># several ctificates with same subject.</span>
new_certs_dir   = $<span class="hljs-built_in">dir</span>/newcerts     <span class="hljs-comment"># default place for new certs.</span>

certificate = $<span class="hljs-built_in">dir</span>/cacert.pem   <span class="hljs-comment"># The CA certificate</span>
serial      = $<span class="hljs-built_in">dir</span>/serial       <span class="hljs-comment"># The current serial number</span>
crlnumber   = $<span class="hljs-built_in">dir</span>/crlnumber    <span class="hljs-comment"># the current crl number</span>
                    <span class="hljs-comment"># must be commented out to leave a V1 CRL</span>
crl     = $<span class="hljs-built_in">dir</span>/crl.pem      <span class="hljs-comment"># The current CRL</span>
private_key = $<span class="hljs-built_in">dir</span>/private/cakey.pem<span class="hljs-comment"># The private key</span>
RANDFILE    = $<span class="hljs-built_in">dir</span>/private/.rand    <span class="hljs-comment"># private random number file</span>

x509_extensions = usr_cert      <span class="hljs-comment"># The extentions to add to the cert</span>

<span class="hljs-comment"># Comment out the following two lines for the &quot;traditional&quot;</span>
<span class="hljs-comment"># (and highly broken) format.</span>
name_opt    = ca_default        <span class="hljs-comment"># Subject Name options</span>
cert_opt    = ca_default        <span class="hljs-comment"># Certificate field options</span>

<span class="hljs-comment"># Extension copying option: use with caution.</span>
copy_extensions = copy

<span class="hljs-comment"># Extensions to add to a CRL. Note: Netscape communicator chokes on V2 CRLs</span>
<span class="hljs-comment"># so this is commented out by default to leave a V1 CRL.</span>
<span class="hljs-comment"># crlnumber must also be commented out to leave a V1 CRL.</span>
<span class="hljs-comment"># crl_extensions    = crl_ext</span>

default_days    = <span class="hljs-number">365</span>           <span class="hljs-comment"># how long to certify for</span>
default_crl_days= <span class="hljs-number">30</span>            <span class="hljs-comment"># how long before next CRL</span>
default_md  = default       <span class="hljs-comment"># use public key default MD</span>
preserve    = no            <span class="hljs-comment"># keep passed DN ordering</span>

<span class="hljs-comment"># A few difference way of specifying how similar the request should look</span>
<span class="hljs-comment"># For type CA, the listed attributes must be the same, and the optional</span>
<span class="hljs-comment"># and supplied fields are just that :-)</span>
policy      = policy_match

<span class="hljs-comment"># For the CA policy</span>
[ policy_match ]
countryName     = <span class="hljs-keyword">match</span>
stateOrProvinceName = <span class="hljs-keyword">match</span>
organizationName    = <span class="hljs-keyword">match</span>
organizationalUnitName  = optional
commonName      = supplied
emailAddress        = optional

<span class="hljs-comment"># For the &#x27;anything&#x27; policy</span>
<span class="hljs-comment"># At this point in time, you must list all acceptable &#x27;object&#x27;</span>
<span class="hljs-comment"># types.</span>
[ policy_anything ]
countryName     = optional
stateOrProvinceName = optional
localityName        = optional
organizationName    = optional
organizationalUnitName  = optional
commonName      = supplied
emailAddress        = optional

<span class="hljs-comment">####################################################################</span>
[ req ]
default_bits        = <span class="hljs-number">2048</span>
default_keyfile     = privkey.pem
distinguished_name  = req_distinguished_name
attributes      = req_attributes
x509_extensions = v3_ca <span class="hljs-comment"># The extentions to add to the self signed cert</span>

<span class="hljs-comment"># Passwords for private keys if not present they will be prompted for</span>
<span class="hljs-comment"># input_password = secret</span>
<span class="hljs-comment"># output_password = secret</span>

<span class="hljs-comment"># This sets a mask for permitted string types. There are several options. </span>
<span class="hljs-comment"># default: PrintableString, T61String, BMPString.</span>
<span class="hljs-comment"># pkix   : PrintableString, BMPString (PKIX recommendation before 2004)</span>
<span class="hljs-comment"># utf8only: only UTF8Strings (PKIX recommendation after 2004).</span>
<span class="hljs-comment"># nombstr : PrintableString, T61String (no BMPStrings or UTF8Strings).</span>
<span class="hljs-comment"># MASK:XXXX a literal mask value.</span>
<span class="hljs-comment"># WARNING: ancient versions of Netscape crash on BMPStrings or UTF8Strings.</span>
string_mask = utf8only

req_extensions = v3_req <span class="hljs-comment"># The extensions to add to a certificate request</span>

[ req_distinguished_name ]
countryName         = Country Name (<span class="hljs-number">2</span> letter code)
countryName_default     = AU
countryName_min         = <span class="hljs-number">2</span>
countryName_max         = <span class="hljs-number">2</span>

stateOrProvinceName     = State <span class="hljs-keyword">or</span> Province Name (full name)
stateOrProvinceName_default = Some-State

localityName            = Locality Name (eg, city)

<span class="hljs-number">0.</span>organizationName      = Organization Name (eg, company)
<span class="hljs-number">0.</span>organizationName_default  = Internet Widgits Pty Ltd

<span class="hljs-comment"># we can do this but it is not needed normally :-)</span>
<span class="hljs-comment">#1.organizationName     = Second Organization Name (eg, company)</span>
<span class="hljs-comment">#1.organizationName_default = World Wide Web Pty Ltd</span>

organizationalUnitName      = Organizational Unit Name (eg, section)
<span class="hljs-comment">#organizationalUnitName_default =</span>

commonName          = Common Name (e.g. server FQDN <span class="hljs-keyword">or</span> YOUR name)
commonName_max          = <span class="hljs-number">64</span>

emailAddress            = Email Address
emailAddress_max        = <span class="hljs-number">64</span>

<span class="hljs-comment"># SET-ex3           = SET extension number 3</span>

[ req_attributes ]
challengePassword       = A challenge password
challengePassword_min       = <span class="hljs-number">4</span>
challengePassword_max       = <span class="hljs-number">20</span>

unstructuredName        = An optional company name

[ usr_cert ]

<span class="hljs-comment"># These extensions are added when &#x27;ca&#x27; signs a request.</span>

<span class="hljs-comment"># This goes against PKIX guidelines but some CAs do it and some software</span>
<span class="hljs-comment"># requires this to avoid interpreting an end user certificate as a CA.</span>

basicConstraints=CA:FALSE

<span class="hljs-comment"># Here are some examples of the usage of nsCertType. If it is omitted</span>
<span class="hljs-comment"># the certificate can be used for anything *except* object signing.</span>

<span class="hljs-comment"># This is OK for an SSL server.</span>
<span class="hljs-comment"># nsCertType            = server</span>

<span class="hljs-comment"># For an object signing certificate this would be used.</span>
<span class="hljs-comment"># nsCertType = objsign</span>

<span class="hljs-comment"># For normal client use this is typical</span>
<span class="hljs-comment"># nsCertType = client, email</span>

<span class="hljs-comment"># and for everything including object signing:</span>
<span class="hljs-comment"># nsCertType = client, email, objsign</span>

<span class="hljs-comment"># This is typical in keyUsage for a client certificate.</span>
<span class="hljs-comment"># keyUsage = nonRepudiation, digitalSignature, keyEncipherment</span>

<span class="hljs-comment"># This will be displayed in Netscape&#x27;s comment listbox.</span>
nsComment           = <span class="hljs-string">&quot;OpenSSL Generated Certificate&quot;</span>

<span class="hljs-comment"># PKIX recommendations harmless if included in all certificates.</span>
subjectKeyIdentifier=<span class="hljs-built_in">hash</span>
authorityKeyIdentifier=keyid,issuer

<span class="hljs-comment"># This stuff is for subjectAltName and issuerAltname.</span>
<span class="hljs-comment"># Import the email address.</span>
<span class="hljs-comment"># subjectAltName=email:copy</span>
<span class="hljs-comment"># An alternative to produce certificates that aren&#x27;t</span>
<span class="hljs-comment"># deprecated according to PKIX.</span>
<span class="hljs-comment"># subjectAltName=email:move</span>

<span class="hljs-comment"># Copy subject details</span>
<span class="hljs-comment"># issuerAltName=issuer:copy</span>

<span class="hljs-comment">#nsCaRevocationUrl      = http://www.domain.dom/ca-crl.pem</span>
<span class="hljs-comment">#nsBaseUrl</span>
<span class="hljs-comment">#nsRevocationUrl</span>
<span class="hljs-comment">#nsRenewalUrl</span>
<span class="hljs-comment">#nsCaPolicyUrl</span>
<span class="hljs-comment">#nsSslServerName</span>

<span class="hljs-comment"># This is required for TSA certificates.</span>
<span class="hljs-comment"># extendedKeyUsage = critical,timeStamping</span>

[ v3_req ]

<span class="hljs-comment"># Extensions to add to a certificate request</span>

basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment


[ v3_ca ]


<span class="hljs-comment"># Extensions for a typical CA</span>


<span class="hljs-comment"># PKIX recommendation.</span>

subjectKeyIdentifier=<span class="hljs-built_in">hash</span>

authorityKeyIdentifier=keyid:always,issuer

<span class="hljs-comment"># This is what PKIX recommends but some broken software chokes on critical</span>
<span class="hljs-comment"># extensions.</span>
<span class="hljs-comment">#basicConstraints = critical,CA:true</span>
<span class="hljs-comment"># So we do this instead.</span>
basicConstraints = CA:true

<span class="hljs-comment"># Key usage: this is typical for a CA certificate. However since it will</span>
<span class="hljs-comment"># prevent it being used as an test self-signed certificate it is best</span>
<span class="hljs-comment"># left out by default.</span>
<span class="hljs-comment"># keyUsage = cRLSign, keyCertSign</span>

<span class="hljs-comment"># Some might want this also</span>
<span class="hljs-comment"># nsCertType = sslCA, emailCA</span>

<span class="hljs-comment"># Include email address in subject alt name: another PKIX recommendation</span>
<span class="hljs-comment"># subjectAltName=email:copy</span>
<span class="hljs-comment"># Copy issuer details</span>
<span class="hljs-comment"># issuerAltName=issuer:copy</span>

<span class="hljs-comment"># DER hex encoding of an extension: beware experts only!</span>
<span class="hljs-comment"># obj=DER:02:03</span>
<span class="hljs-comment"># Where &#x27;obj&#x27; is a standard or added object</span>
<span class="hljs-comment"># You can even override a supported extension:</span>
<span class="hljs-comment"># basicConstraints= critical, DER:30:03:01:01:FF</span>

[ crl_ext ]

<span class="hljs-comment"># CRL extensions.</span>
<span class="hljs-comment"># Only issuerAltName and authorityKeyIdentifier make any sense in a CRL.</span>

<span class="hljs-comment"># issuerAltName=issuer:copy</span>
authorityKeyIdentifier=keyid:always

[ proxy_cert_ext ]
<span class="hljs-comment"># These extensions should be added when creating a proxy certificate</span>

<span class="hljs-comment"># This goes against PKIX guidelines but some CAs do it and some software</span>
<span class="hljs-comment"># requires this to avoid interpreting an end user certificate as a CA.</span>

basicConstraints=CA:FALSE

<span class="hljs-comment"># Here are some examples of the usage of nsCertType. If it is omitted</span>
<span class="hljs-comment"># the certificate can be used for anything *except* object signing.</span>

<span class="hljs-comment"># This is OK for an SSL server.</span>
<span class="hljs-comment"># nsCertType            = server</span>

<span class="hljs-comment"># For an object signing certificate this would be used.</span>
<span class="hljs-comment"># nsCertType = objsign</span>

<span class="hljs-comment"># For normal client use this is typical</span>
<span class="hljs-comment"># nsCertType = client, email</span>

<span class="hljs-comment"># and for everything including object signing:</span>
<span class="hljs-comment"># nsCertType = client, email, objsign</span>

<span class="hljs-comment"># This is typical in keyUsage for a client certificate.</span>
<span class="hljs-comment"># keyUsage = nonRepudiation, digitalSignature, keyEncipherment</span>

<span class="hljs-comment"># This will be displayed in Netscape&#x27;s comment listbox.</span>
nsComment           = <span class="hljs-string">&quot;OpenSSL Generated Certificate&quot;</span>

<span class="hljs-comment"># PKIX recommendations harmless if included in all certificates.</span>
subjectKeyIdentifier=<span class="hljs-built_in">hash</span>
authorityKeyIdentifier=keyid,issuer

<span class="hljs-comment"># This stuff is for subjectAltName and issuerAltname.</span>
<span class="hljs-comment"># Import the email address.</span>
<span class="hljs-comment"># subjectAltName=email:copy</span>
<span class="hljs-comment"># An alternative to produce certificates that aren&#x27;t</span>
<span class="hljs-comment"># deprecated according to PKIX.</span>
<span class="hljs-comment"># subjectAltName=email:move</span>

<span class="hljs-comment"># Copy subject details</span>
<span class="hljs-comment"># issuerAltName=issuer:copy</span>

<span class="hljs-comment">#nsCaRevocationUrl      = http://www.domain.dom/ca-crl.pem</span>
<span class="hljs-comment">#nsBaseUrl</span>
<span class="hljs-comment">#nsRevocationUrl</span>
<span class="hljs-comment">#nsRenewalUrl</span>
<span class="hljs-comment">#nsCaPolicyUrl</span>
<span class="hljs-comment">#nsSslServerName</span>

<span class="hljs-comment"># This really needs to be in place for it to be a proxy certificate.</span>
proxyCertInfo=critical,language:<span class="hljs-built_in">id</span>-ppl-anyLanguage,pathlen:<span class="hljs-number">3</span>,policy:foo

<span class="hljs-comment">####################################################################</span>
[ tsa ]

default_tsa = tsa_config1   <span class="hljs-comment"># the default TSA section</span>

[ tsa_config1 ]

<span class="hljs-comment"># These are used by the TSA reply generation only.</span>
<span class="hljs-built_in">dir</span>     = ./demoCA      <span class="hljs-comment"># TSA root directory</span>
serial      = $<span class="hljs-built_in">dir</span>/tsaserial    <span class="hljs-comment"># The current serial number (mandatory)</span>
crypto_device   = builtin       <span class="hljs-comment"># OpenSSL engine to use for signing</span>
signer_cert = $<span class="hljs-built_in">dir</span>/tsacert.pem  <span class="hljs-comment"># The TSA signing certificate</span>
                    <span class="hljs-comment"># (optional)</span>
certs       = $<span class="hljs-built_in">dir</span>/cacert.pem   <span class="hljs-comment"># Certificate chain to include in reply</span>
                    <span class="hljs-comment"># (optional)</span>
signer_key  = $<span class="hljs-built_in">dir</span>/private/tsakey.pem <span class="hljs-comment"># The TSA private key (optional)</span>

default_policy  = tsa_policy1       <span class="hljs-comment"># Policy if request did not specify it</span>
                    <span class="hljs-comment"># (optional)</span>
other_policies  = tsa_policy2, tsa_policy3  <span class="hljs-comment"># acceptable policies (optional)</span>
digests     = md5, sha1     <span class="hljs-comment"># Acceptable message digests (mandatory)</span>
accuracy    = secs:<span class="hljs-number">1</span>, millisecs:<span class="hljs-number">500</span>, microsecs:<span class="hljs-number">100</span>  <span class="hljs-comment"># (optional)</span>
clock_precision_digits  = <span class="hljs-number">0</span> <span class="hljs-comment"># number of digits after dot. (optional)</span>
ordering        = yes   <span class="hljs-comment"># Is ordering defined for timestamps?</span>
                <span class="hljs-comment"># (optional, default: no)</span>
tsa_name        = yes   <span class="hljs-comment"># Must the TSA name be included in the reply?</span>
                <span class="hljs-comment"># (optional, default: no)</span>
ess_cert_id_chain   = no    <span class="hljs-comment"># Must the ESS cert id chain be included?</span>
                <span class="hljs-comment"># (optional, default: no)</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><code translate="no">openssl.cnf</code> 파일은 기본 OpenSSL 구성 파일입니다. 자세한 내용은 <a href="https://www.openssl.org/docs/manmaster/man5/config.html">매뉴얼 페이지를</a> 참조하세요. <code translate="no">gen.sh</code> 파일은 관련 인증서 파일을 생성합니다. 인증서 파일의 유효 기간, 인증서 키의 길이 또는 인증서 파일 이름을 변경하는 등 다양한 목적으로 <code translate="no">gen.sh</code> 파일을 수정할 수 있습니다.</p>
<p><code translate="no">gen.sh</code> 파일에서 <code translate="no">CommonName</code> 을 구성해야 합니다. <code translate="no">CommonName</code> 는 클라이언트가 연결할 때 지정해야 하는 서버 이름을 나타냅니다.</p>
<p><details><summary><code translate="no">gen.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta">#!/usr/bin/env sh</span>
<span class="hljs-comment"># your variables</span>
Country=<span class="hljs-string">&quot;CN&quot;</span>
State=<span class="hljs-string">&quot;Shanghai&quot;</span>
Location=<span class="hljs-string">&quot;Shanghai&quot;</span>
Organization=<span class="hljs-string">&quot;milvus&quot;</span>
Organizational=<span class="hljs-string">&quot;milvus&quot;</span>
CommonName=<span class="hljs-string">&quot;localhost&quot;</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;generate ca.key&quot;</span>
openssl genrsa -out ca.key 2048

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;generate ca.pem&quot;</span>
openssl req -new -x509 -key ca.key -out ca.pem -days 3650 -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$Organizational</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;generate server SAN certificate&quot;</span>
openssl genpkey -algorithm RSA -out server.key
openssl req -new -nodes -key server.key -out server.csr -days 3650 -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$Organizational</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span> -config ./openssl.cnf -extensions v3_req
openssl x509 -req -days 3650 -<span class="hljs-keyword">in</span> server.csr -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial -extfile ./openssl.cnf -extensions v3_req

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;generate client SAN certificate&quot;</span>
openssl genpkey -algorithm RSA -out client.key
openssl req -new -nodes -key client.key -out client.csr -days 3650 -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$Organizational</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span> -config ./openssl.cnf -extensions v3_req
openssl x509 -req -days 3650 -<span class="hljs-keyword">in</span> client.csr -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial -extfile ./openssl.cnf -extensions v3_req

<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><code translate="no">gen.sh</code> 파일의 변수는 인증서 서명 요청 파일을 만드는 과정에서 중요합니다. 처음 5개의 변수는 국가, 주, 위치, 조직, 조직 단위를 포함한 기본 서명 정보입니다. <code translate="no">CommonName</code> 는 클라이언트-서버 통신 중에 확인되므로 구성할 때 주의가 필요합니다.</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header"><code translate="no">gen.sh</code> 을 실행하여 인증서 생성</h3><p><code translate="no">gen.sh</code> 파일을 실행하여 인증서를 생성합니다.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>다음 9개의 파일이 생성됩니다: <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>, <code translate="no">server.key</code>, <code translate="no">server.pem</code>, <code translate="no">server.csr</code>, <code translate="no">client.key</code>, <code translate="no">client.pem</code>, <code translate="no">client.csr</code>.</p>
<h3 id="Modify-the-detail-of-certificate-files-optional" class="common-anchor-header">인증서 파일의 상세 정보 수정하기(선택 사항)</h3><p>인증서를 생성한 후 필요에 따라 인증서 파일의 상세 정보를 수정할 수 있습니다.</p>
<p>SSL 또는 TSL 상호 인증의 구현에는 클라이언트, 서버 및 CA(인증 기관)가 포함됩니다. CA는 클라이언트와 서버 간의 인증서가 합법적인지 확인하는 데 사용됩니다.</p>
<p>OpenSSL 명령 사용에 대한 자세한 내용은 <code translate="no">man openssl</code> 를 실행하거나 <a href="https://www.openssl.org/docs/">openssl 매뉴얼 페이지를</a> 참조하세요.</p>
<ol>
<li>CA에 대한 RSA 개인 키를 생성합니다.</li>
</ol>
<pre><code translate="no">openssl genpkey -algorithm RSA -<span class="hljs-keyword">out</span> ca.key
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>CA 인증서 생성을 요청합니다.</li>
</ol>
<p>이 단계에서는 CA에 대한 기본 정보를 제공해야 합니다. 요청을 건너뛰고 직접 자체 서명 인증서를 생성하려면 <code translate="no">x509</code> 옵션을 선택합니다.</p>
<pre><code translate="no">openssl req -new -x509 -key ca.key -out ca.pem -days 3650 -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$Organizational</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 단계를 마치면 클라이언트-서버 인증서를 생성하는 데 사용할 수 있는 <code translate="no">ca.pem</code> 파일인 CA 인증서를 받게 됩니다.</p>
<ol start="3">
<li>서버 개인 키를 생성합니다.</li>
</ol>
<pre><code translate="no">openssl genpkey -algorithm RSA -<span class="hljs-keyword">out</span> server.key
<button class="copy-code-btn"></button></code></pre>
<p>이 단계 후에 <code translate="no">server.key</code> 파일을 받게 됩니다.</p>
<ol start="4">
<li>인증서 서명 요청 파일을 생성합니다.</li>
</ol>
<p>인증서 서명 요청 파일을 생성하려면 서버에 대한 필수 정보를 제공해야 합니다.</p>
<pre><code translate="no">openssl req -new -nodes -key server.key -out server.csr -days 3650 -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$Organizational</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span> -config ./openssl.cnf -extensions v3_req
<button class="copy-code-btn"></button></code></pre>
<p>이 단계 후에 <code translate="no">server.csr</code> 파일을 받게 됩니다.</p>
<ol start="5">
<li>인증서에 서명합니다.</li>
</ol>
<p><code translate="no">server.csr</code>, <code translate="no">ca.key</code> 및 <code translate="no">ca.pem</code> 파일을 열어 인증서에 서명합니다. <code translate="no">CAcreateserial</code> 명령 옵션은 CA 일련 번호 파일이 없는 경우 생성하는 데 사용됩니다. 이 명령 옵션을 선택하면 <code translate="no">aca.srl</code> 파일이 생성됩니다.</p>
<pre><code translate="no">openssl x509 -req -days 3650 -<span class="hljs-keyword">in</span> server.csr -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial -extfile ./openssl.cnf -extensions v3_req
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">TLS로 Milvus 서버 설정하기<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 TLS 암호화를 사용하여 Milvus 서버를 구성하는 단계를 간략하게 설명합니다.</p>
<div class="alert note">
<p>이 가이드는 Docker Compose를 사용한 배포에 중점을 두고 있습니다. Milvus 오퍼레이터 배포에 대한 자세한 내용은 <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/security/encryption-in-transit.md">Milvus 오퍼레이터 TLS 문서를</a> 참조하세요.</p>
</div>
<h3 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1. Milvus 서버 구성 수정하기</h3><p>TLS를 사용하려면 <code translate="no">milvus.yaml</code> 에서 <code translate="no">common.security.tlsMode</code> 를 <code translate="no">1</code> (단방향 TLS의 경우) 또는 <code translate="no">2</code> (양방향 TLS의 경우)로 설정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tls</span>:
  <span class="hljs-attr">serverPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">pem</span>
  <span class="hljs-attr">serverKeyPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">key</span>
  <span class="hljs-attr">caPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/ca.<span class="hljs-property">pem</span>

<span class="hljs-attr">common</span>:
  <span class="hljs-attr">security</span>:
    <span class="hljs-attr">tlsMode</span>: <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<p>매개변수</p>
<ul>
<li><code translate="no">serverPemPath</code>: 서버 인증서 파일의 경로입니다.</li>
<li><code translate="no">serverKeyPath</code>: 서버 키 파일의 경로입니다.</li>
<li><code translate="no">caPemPath</code>: CA 인증서 파일의 경로입니다.</li>
<li><code translate="no">tlsMode</code>: 암호화를 위한 TLS 모드입니다. 유효한 값:<ul>
<li><code translate="no">1</code>: 서버에만 인증서가 필요하고 클라이언트는 인증서를 확인하는 단방향 인증입니다. 이 모드를 사용하려면 서버 측에서는 <code translate="no">server.pem</code> 및 <code translate="no">server.key</code>, 클라이언트 측에서는 <code translate="no">server.pem</code> 이 필요합니다.</li>
<li><code translate="no">2</code>: 양방향 인증: 서버와 클라이언트 모두 보안 연결을 설정하기 위해 인증서가 필요합니다. 이 모드에서는 서버 측에서 <code translate="no">server.pem</code>, <code translate="no">server.key</code>, <code translate="no">ca.pem</code>, 클라이언트 측에서 <code translate="no">client.pem</code>, <code translate="no">client.key</code>, <code translate="no">ca.pem</code> 가 필요합니다.</li>
</ul></li>
</ul>
<h3 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2. 인증서 파일을 컨테이너에 매핑하기</h3><h4 id="Prepare-certificate-files" class="common-anchor-header">인증서 파일 준비</h4><p><code translate="no">docker-compose.yaml</code> 과 같은 디렉터리에 <code translate="no">tls</code> 이라는 새 폴더를 만듭니다. <code translate="no">server.pem</code> , <code translate="no">server.key</code>, <code translate="no">ca.pem</code> 를 <code translate="no">tls</code> 폴더에 복사합니다. 다음과 같이 디렉토리 구조에 배치합니다:</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
     ├── server.pem
     ├── server.key
     └── ca.pem
<button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">Docker Compose 구성 업데이트</h4><p><code translate="no">docker-compose.yaml</code> 파일을 편집하여 아래와 같이 컨테이너 내부의 인증서 파일 경로를 매핑합니다:</p>
<pre><code translate="no" class="language-yaml">  standalone:
    container_name: milvus-standalone
    image: milvusdb/milvus:latest
    <span class="hljs-built_in">command</span>: [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;standalone&quot;</span>]
    security_opt:
    - seccomp:unconfined
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/volumes/milvus:/var/lib/milvus
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/tls:/milvus/tls
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/milvus.yaml:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h4 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">Docker Compose를 사용하여 Milvus 배포하기</h4><p>다음 명령을 실행하여 Milvus를 배포합니다:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">TLS로 Milvus 서버에 연결하기<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>SDK 상호 작용의 경우, TLS 모드에 따라 다음 설정을 사용합니다.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">단방향 TLS 연결</h3><p><code translate="no">server.pem</code> 경로를 제공하고 <code translate="no">server_name</code> 이 인증서에 구성된 <code translate="no">CommonName</code> 과 일치하는지 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">양방향 TLS 연결</h3><p><code translate="no">client.pem</code>, <code translate="no">client.key</code> 및 <code translate="no">ca.pem</code> 경로를 제공하고 <code translate="no">server_name</code> 이 인증서에 구성된 <code translate="no">CommonName</code> 과 일치하는지 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    client_pem_path=<span class="hljs-string">&quot;path_to/client.pem&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;path_to/client.key&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;path_to/ca.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용은 <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py">예제_tls1.py</a> 및 <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls2.py">예제_tls2.py를</a> 참조하세요.</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">TLS를 사용하여 Milvus RESTful 서버에 연결하기<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>RESTful API의 경우 <code translate="no">curl</code> 명령을 사용하여 tls를 확인할 수 있습니다.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">단방향 TLS 연결</h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem https://localhost:19530/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">양방향 TLS 연결</h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:19530/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
