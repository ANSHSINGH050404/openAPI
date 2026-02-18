# Publishing Your SDK

To make your SDK available to other users, you have two main options: publishing to the npm registry (public or private) or sharing via a Git repository.

## Option 1: Publish to npm (Recommended)

This allows users to install your package via `npm install @your-username/openrouter-sdk`.

1.  **Create an npm account:**
    Go to [npmjs.com](https://www.npmjs.com/) and sign up.

2.  **Update package.json:**
    Change the package name to be unique. Using a scope is best practice:

    ```json
    {
      "name": "@<your-username>/openrouter-sdk",
      "version": "1.0.0",
      "publishConfig": {
        "access": "public"
      },
      ...
    }
    ```

3.  **Login to npm in terminal:**

    ```bash
    npm login
    ```

4.  **Build your package:**
    Ensure you have the latest compiled files.

    ```bash
    npm run build
    ```

5.  **Publish:**
    ```bash
    npm publish --access public
    ```

## Option 2: Install from Git

If you don't want to publish to npm yet, users can install directly from your GitHub repository if it is public.

1.  **Push your code to GitHub.**

2.  **Users install via:**
    ```bash
    npm install git+https://github.com/<your-username>/<repo-name>.git#subdirectory=packages/openrouter-sdk
    ```
    _(Note: The `subdirectory` part is crucial since your SDK is inside a monorepo folder)_.

## Option 3: Pack as a Tarball (Manual Sharing)

1.  **Pack the SDK:**

    ```bash
    cd packages/openrouter-sdk
    npm pack
    ```

    This creates a `.tgz` file (e.g., `openrouter-sdk-1.0.0.tgz`).

2.  **Share the file:**
    Send this file to your users.

3.  **Users install via:**
    ```bash
    npm install ./path/to/openrouter-sdk-1.0.0.tgz
    ```
