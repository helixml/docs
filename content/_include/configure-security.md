By default, new registrations are enabled to make it easy for you to create an account. Also by default, all accounts are admin accounts.

To lock down admin users to a specific set of users, set the `ADMIN_USER_IDS` environment variable to a comma-separated list of user IDs in your `.env` file. Run `docker compose up -d` to update the stack.

You may also wish to review all available configuration options in <a href="/helix/private-deployment/environment-variables/" target="_self">Environment Variables</a>.
