## Pdf-Talk

Pdf-Talk is a web application that allows users to upload PDF documents and ask questions related to the content of the PDF. The AI will analyze the uploaded PDF and provide answers based on the document's contents, making it easier for users to extract relevant information without manually reading through the entire document. This tool leverages modern AI models and natural language processing (NLP) to provide concise and accurate responses.  [Live link](https://pdf-talk-opal.vercel.app/)


### Features

- **PDF Upload:** Users can upload PDF documents to the platform.
- **AI-Powered Q&A:** Users can ask questions, and the AI provides answers based on the content of the uploaded PDF.
- **User Authentication:** Secure login with GitHub or Google using NextAuth.
- **Responsive Design:** The interface is fully responsive, ensuring accessibility on mobile, tablet, and desktop devices.
- **User Profile:** Displays user profile info, including avatar, name, and email. Option to log out.
- **Error Handling:** Detects invalid or empty PDF uploads and provides feedback to the user.
- **Protected Routes:** Prevents unauthorized access to certain pages such as the dashboard, ensuring that only authenticated users can view their documents.

### Installation

```bash
git clone https://github.com/tiwaryamay7125/AskMyPDF.git
cd pdf-talk
npm install
```

### Environment Variables

Set the following environment variables in your `.env.local` file:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_NEXT_PUBLIC_HUGGINGFACE_API_KEY
NEXT_PUBLIC_PINECONE_API_KEY=your_NEXT_PUBLIC_PINECONE_API_KEY
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_NEXT_PUBLIC_ANTHROPIC_API_KEY
```

### Usage

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`.
3. Sign in using your GitHub or Google account.
4. Upload a PDF document and ask questions to the AI.

### Contribution Guidelines

We welcome contributions to enhance PDF Talk. To contribute, please follow the guidelines below:

1. **Fork the Repository:** Fork the project repository to your own GitHub account.
2. **Create a Branch:** Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/new-feature
```

3. **Make Changes:** Implement your feature or fix the issue.
4. **Test Your Changes:** Ensure that all the changes you made are working as expected and do not break any functionality.
5. **Commit Your Changes:** Commit your changes with a descriptive commit message:

```bash
git commit -m "Added new feature: feature description"
```

6. **Push the Changes:** Push your branch to GitHub:

```bash
git push origin feature/new-feature
```

7. **Create a Pull Request:** Submit a pull request to the main repository, describing the changes you made. The project maintainers will review your pull request and merge it if everything is in order.