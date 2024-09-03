By default, new registrations are enabled to make it easy for you to create an account. Also by default, all accounts are admin accounts.

After creating your own accounts, you can choose to disable new registrations. Go to `http(s)://<YOUR_CONTROLPLANE_HOSTNAME>/auth` and click "Administration Console". Log in with `admin` and `KEYCLOAK_ADMIN_PASSWORD` from your `.env` file. Click the "master" dropdown and switch to the helix realm. Under "Realm settings" -> "Login", you can untick "User registration". You can also set up OAuth, email validation etc here.

To lock down admin users to a specific set of users, go to Users in Keycloak and find the users you want to be admins. Copy their IDs into `.env` as a comma-separated list under `ADMIN_USER_IDS` variable. Run `docker compose up -d` to update the stack.

You may also wish to review all available configuration options in <a href="https://docs.helix.ml/helix/private-deployment/environment-variables/" target="_self">Environment Variables</a>.