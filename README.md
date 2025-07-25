## Using the `push-build` Script

The `push-build` uploads the `index.html` file from your `./dist` folder to supabase storage.

1. **Create a `.env.dev` file (or whatever environment you're targeting)**  
   Populate it with:

```bash
PUBLIC_SUPABASE_URL=https://iheyhknkyvnxvedrtxqk.supabase.co
SUPABASE_SECRET_KEY=
```

Replace the url with the one from the correct environment.
Get the secret key from the Supabase dashboard

2. **Find the database id of template you want to upload for**  
   Ensure your template exists in the `templates` table in the database, and note it's id

3. **Make your changes and build**  
   Edit your tempate, point `app.svelte` at it and:

```bash
pnpm build
```

Ensure your build `index.html` shows up in the `./dist` folder

4. **Run the script**  
   Execute the script from your terminal targeting the environment you want:

```bash
pnpm push-build:dev
```

Enter the id from step 2 when prompted and ensure the name is what you expect before uploading.
