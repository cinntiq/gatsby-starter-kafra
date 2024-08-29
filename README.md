# Gatsby Starter Kafra

A fast, modern blog starter built with Gatsby and powered by Ghost CMS. It features a minimalist design, dark mode support, and a clean reading experience, perfect for bloggers who want their content to shine without distractions.

## ✨ Features

-   🎨 Minimalist and modern design
-   🌓 Dark and Light mode support
-   🔍 Powerful search functionality powered by Fuse.js
-   📱 Fully responsive layout
-   🚀 Blazing fast performance
-   👻 Powered by Ghost CMS
-   💬 Utterances commenting system integration
-   🧰 Built with TypeScript for robust development
-   ⚙️ Easy configuration with environment variables and JSON
-   📰 RSS feed generation
-   🔗 SEO optimization
-   📱 Progressive Web App (PWA) support
-   📊 Integrated Vercel Analytics for comprehensive site statistics
-   ⚡ Vercel Speed Insights for performance monitoring and optimization

## 🚀 Quick Start

1. **Install Yarn**

    If you haven't installed Yarn yet, you can do so by following the [official Yarn installation guide](https://classic.yarnpkg.com/en/docs/install).

2. **Install Gatsby CLI**

    Install the Gatsby CLI globally using Yarn:

    ```shell
    yarn global add gatsby-cli
    ```

3. **Configure Gatsby CLI to use Yarn**

    Set Yarn as the default package manager for Gatsby:

    ```shell
    gatsby options set package-manager yarn
    ```

4. **Create a Gatsby site**

    Use the Gatsby CLI to create a new site, specifying the Kafra starter:

    ```shell
    gatsby new my-blog https://github.com/cinntiq/gatsby-starter-kafra
    ```

5. **Navigate to your new site's directory**

    ```shell
    cd my-blog/
    ```

6. **Start developing**

    Start the development server:

    ```shell
    gatsby develop
    ```

7. **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

Note: If you encounter any issues during the installation, you can try using `yarn install --ignore-engines` before running `gatsby develop` to bypass potential compatibility checks.

## 🔧 Configuration

The configuration for your site is split between environment variables and a JSON configuration file:

1. Environment variables: Stored in `.env.development` and `.env.production` files in the project root.
2. Site configuration: Stored in `app-config.json` in the project root.

### Environment Variables

Create `.env.development` and `.env.production` files in the root of your project and add the following:

```
SITE_URL=your_site_url
APP_NAME=your_app_name
APP_SHORT_NAME=your_app_short_name
GHOST_API_URL=your_ghost_api_url
GHOST_CONTENT_API_KEY=your_ghost_content_api_key
UTTERANCES_REPO=your_github_username/your_repo_name
```

If these environment variables are not set, the project will use the following default values:

```
SITE_URL=http://localhost:8000
APP_NAME=Gatsby Starter Kafra
APP_SHORT_NAME=Kafra
GHOST_API_URL=https://studio.cinntiq.synology.me
GHOST_CONTENT_API_KEY=3ffdd7c0e5b421edf0479e3964
UTTERANCES_REPO=
```

While these default values allow the project to run without immediate configuration, it's strongly recommended to set these variables according to your specific development and production environments. This ensures that your site is properly configured and secure, especially for production deployments.

Remember to update these values in both your development and production environment files to match your specific setup. The production values, in particular, should reflect your live site's URL and Ghost CMS configuration.

Note: If the `.env` files are not set up, the project will use default values.

### Environment Variables and Git

⚠️ **WARNING: IMPORTANT SECURITY INFORMATION** ⚠️

By default, the `.gitignore` file is set up to prevent `.env` files from being committed to your Git repository. This is a critical security measure to avoid accidentally exposing sensitive information like API keys.

**NEVER commit your `.env` files to your Git repository.** Doing so could expose your sensitive data to anyone with access to your repository, potentially leading to security breaches and unauthorized access to your services.

If you absolutely need to store your environment configuration in your Git repository, you would need to remove the relevant lines from `.gitignore` and commit your `.env` files. However, this approach is strongly discouraged due to the significant security risks it poses.

Instead, we strongly recommend using your deployment platform's environment variable feature. Most modern hosting platforms (like Netlify, Vercel, or Heroku) provide secure ways to set environment variables for your project. This approach:

1. Keeps your sensitive data separate from your codebase
2. Allows you to easily manage different configurations for different environments
3. Follows security best practices
4. Prevents accidental exposure of sensitive information

Remember: protecting your API keys and other sensitive data is crucial for maintaining the security of your application and any services it interacts with.

### Ghost CMS Configuration

To connect your Gatsby site with Ghost CMS, you need to set up the Ghost API URL and Content API Key. Here's how to do it:

1. **Ghost API URL**: This is the URL of your Ghost blog. If you're using Ghost(Pro), it will look like `https://your-blog.ghost.io`. If you're self-hosting, it will be the URL where your Ghost blog is accessible.

2. **Ghost Content API Key**: This key allows your Gatsby site to fetch content from your Ghost blog. To create one:

    a. Log in to your Ghost Admin panel.
    b. Go to "Settings" > "Integrations".
    c. Scroll down to "Custom Integrations" and click on "Add custom integration".
    d. Give your integration a name (e.g., "Gatsby Blog").
    e. Click "Create". You'll see your Content API Key on the next screen.

3. Once you have these values, add them to your `.env.development` and `.env.production` files as shown in the Environment Variables section above.

For more detailed information about the Ghost Content API and its integration with Gatsby, check out the [official Ghost documentation on Gatsby](https://ghost.org/docs/api/v3/gatsby/).

Remember to keep your Content API Key secret and never commit it to version control. If you're deploying your site, make sure to set these environment variables in your deployment platform's settings.

### Utterances Configuration

Utterances is a lightweight comments widget built on GitHub issues. To enable Utterances in your blog:

1. Make sure your GitHub repository is public.
2. Install the [Utterances app](https://github.com/apps/utterances) on your repository.
3. Add your GitHub repository name to the `UTTERANCES_REPO` environment variable in your `.env.development` and `.env.production` files:

```
UTTERANCES_REPO=your_github_username/your_repo_name
```

Replace `your_github_username` with your GitHub username and `your_repo_name` with the name of your repository.

Once configured, Utterances will automatically appear at the bottom of your blog posts, allowing visitors to leave comments using their GitHub accounts.

### Site Configuration

The `app-config.json` file in the project root allows you to customize various aspects of your site:

```json
{
    "postsPerPage": 3,
    "shareImage": {
        "width": 1280,
        "height": 720
    }
}
```

This configuration sets:

-   The number of posts to display per page (`postsPerPage`)
-   The dimensions of the default share image (`shareImage`)

## 🔍 Search Functionality

Gatsby Starter Kafra uses Fuse.js for powerful, client-side search functionality. The search index is built at compile time, ensuring fast and efficient searches without the need for a server.

## 💡 Learn More

-   [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
-   [Ghost + Gatsby](https://ghost.org/docs/api/v3/gatsby/)
-   [Fuse.js Documentation](https://fusejs.io/)

## 🎨 Customization

While `app-config.json` is used for general site configuration, the visual appearance of your site can be customized through the following:

-   `src/styles/`: This directory contains the main styling for your site.

    -   `src/styles/app/_variables.scss`: This file is crucial for customizing the site's appearance. It contains variables that control colors, fonts, sizes, and other design elements used throughout the site. By modifying these variables, you can easily update the look and feel of your entire site.

    Here are all the variables you can modify:

    ```scss
    /* Color Palette */
    $anti-flash-white: #f1f2f6;
    $baltic-see: #3d3d3d;
    $beekeeper: #f6e58d;
    $biscay: #303952;
    $black-pearl: #181818;
    $brewed-mustard: #e77f67;
    $bright-yarrow: #fdcb6e;
    $clouds: #ecf0f1;
    $concrete: #95a5a6;
    $keppel: #58b19f;
    $light-green: #dce6dc;
    $midnight-blue: #2c3e50;
    $modern-dark: #1e1e1e;
    $shadowed-steel: #4b4b4b;
    $silver: #bdc3c7;
    $swan-white: #f7f1e3;
    $wet-asphalt: #34495e;

    /* Primary, Secondary Color */
    $primary-color: $keppel;
    $secondary-color: $brewed-mustard;

    /* Break Points */
    $breakpoint-mobile: 480px;
    $breakpoint-tablet: 720px;
    $breakpoint-desktop: 960px;
    $breakpoint-large-desktop: 1280px;

    /* Content Max Width */
    $content-max-width: $breakpoint-desktop;

    /* Site Default Padding, Margin */
    $site-default-padding: 2.4rem;
    $site-default-margin: 2.4rem;

    /* Font Family */
    $app-font: "MaruBuri";

    /* Font Sizes */
    $tiny-font-size: 1.2rem;
    $small-font-size: 1.6rem;
    $middle-font-size: 2rem;
    $large-font-size: 2.4rem;

    /* Border Thickness */
    $site-border-thickness: 0.1rem;
    $highlight-border-thickness: 0.2rem;

    /* All Item Gap(Tags, Navs, Etc) */
    $item-gap: 0.8rem;

    /* Min Height Variables */
    $post-card-min-height: 16rem;

    /* Ghost Variables */
    $ghost-content-element-gap: 2.4rem;
    ```

    By changing these variables, you can alter the color scheme, font sizes, layout dimensions, and other visual aspects of your site.

-   `src/components/`: Contains reusable React components. You can modify these to change specific parts of your site's layout and functionality.

-   `src/templates/`: Page templates for different content types. Customize these to alter the structure of specific page types.

-   `src/images/`: Place your site's images here, including icons, etc.

### Site Icon

The site icon is located at `src/images/icon-512x512.png`. This image is used as the main icon for your site, including as the favicon and app icon for Progressive Web Apps. If you want to change your site's icon, replace this file with your own 512x512 pixel PNG image.

## Vercel Integration

This starter comes pre-configured with Vercel Analytics and Speed Insights:

-   **Vercel Analytics**: Provides comprehensive site statistics, helping you understand your audience and track your site's performance.
-   **Speed Insights**: Monitors your site's performance, offering insights and suggestions for optimization to ensure your site loads quickly for all users.

To take full advantage of these features, make sure to deploy your site to Vercel and enable these features in your Vercel project settings.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/cinntiq/gatsby-starter-kafra/issues).

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
