# Stytch React .NET Example App

Welcome to the Stytch React .NET Example App! This project showcases a full-stack application built with React for the front-end and .NET for the back-end.

## Setup Instructions

To get started with the project, follow these steps:

1. **Create a Stytch Account**:
    - Sign up for an account at [Stytch](https://stytch.com/).
    - During the sign-up process, select **Consumer Authentication** as the authentication type you are interested in.
    - Once your account is set up, a project called "My First Project" will be automatically created for you.

2. **Add Magic Link URL**:
    - Go to [Stytch Redirect URLs](https://stytch.com/dashboard/redirect-urls) and add `http://localhost:3000/authenticate` as a valid sign-up and login URL.

3. **Clone this repository**
     ```bash
        git clone https://github.com/stytchauth/stytch-react-dotnet-example.git
     ```

5. **Open Two Terminals**:
    One terminal will be dediated to your server side environment, and one terminal should reflect your client environment.
   
   In the first terminal, navigate to the server folder:
   ```bash
   cd /path/to/your/Server
   ```
   In the second terminal, navigate to the client folder:
   ```bash
   cd /path/to/your/Client
   ```

7. **Copy the Example Environment File**:
    - In the **server terminal**, copy the `.env.template` file to `.env`. This file contains placeholder values for the environment variables needed by the project:
    ```bash
    cp .env.template .env
    ```

8. **Set Environment Variables**:
    - Open the `.env` file in a text editor and replace the placeholder values with your actual Stytch project ID and secret.

9. **Install Server Dependencies**:

    - In the **server terminal**, install the necessary dependencies:
    ```bash
    dotnet restore
    dotnet add package DotNetEnv
    ```

10. **Build and Run the Server**:
    - Compile and start the server application in the server terminal:
    ```bash
    dotnet build
    dotnet run
    ```

11. **Install Client Dependencies**:
    - In the **client terminal**, install the necessary dependencies:
    ```bash
    npm install
    ```

12. **Run the Client**:
    - Start the client application in the client terminal:
    ```bash
    npm start
    ```
## Next steps

This example app showcases a small portion of what you can accomplish with Stytch. Here are a few ideas to explore:

1. Add additional login methods like [OAuth](https://stytch.com/docs/api/oauth-google-start) or [Passwords](https://stytch.com/docs/api/password-create).
2. Secure your app further by building MFA authentication using methods like [OTP](https://stytch.com/docs/api/send-otp-by-sms).

## Get help and join the community

#### 💬  Stytch community Slack

Join the discussion, ask questions, and suggest new features in our ​[Slack community](https://stytch.com/docs/resources/support/overview)!

#### ❓ Need support?

Check out the [Stytch Forum](https://forum.stytch.com/) or email us at [support@stytch.com](mailto:support@stytch.com).
