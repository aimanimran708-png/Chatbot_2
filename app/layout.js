import "./globals.css";

export const metadata = {
  title: "Groq Chatbot",
  description: "A simple LLM chatbot powered by the Groq API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
