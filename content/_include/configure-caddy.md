If you're using a non-localhost domain, you'll need to point a DNS hostname (A record) at the IP address of your server and set up TLS termination.

Set up [caddy](https://caddyserver.com/docs/install#debian-ubuntu-raspbian) or another TLS-terminating proxy of your choice. Here is an example `Caddyfile`:
```
<YOUR_CONTROLPLANE_HOSTNAME>

reverse_proxy :8080
```
```
sudo caddy reload
```

Then load `https://<YOUR_CONTROLPLANE_HOSTNAME>` in your browser. Caddy will automatically provision TLS certificates.

Ensure you are using an `https` URL for `SERVER_URL` in your controlplane `.env` file.