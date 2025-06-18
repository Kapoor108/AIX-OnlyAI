
# AI Tools Directory
AIX-OnlyAI

A modern web application for discovering, browsing, and managing AI tools. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

* **🧠 AI Chatbot Integration**: A smart AI chatbot is integrated to assist users in exploring tools by name or category, provide quick summaries, and even share direct links to tools.
* **Browse AI Tools**: View a comprehensive collection of AI tools with detailed information
* **Smart Filtering**: Filter tools by category with case-insensitive search
* **Search Functionality**: Search tools by name, category, or description
* **Favorites System**: Save and manage your favorite AI tools
* **Analytics Dashboard**: Visualize tool distribution by category
* **Dark Mode**: Toggle between light and dark themes
* **Mobile Responsive**: Optimized for all device sizes
* **Confetti Animation**: Celebrate when adding favorites

## 🛠️ Tech Stack

* **Frontend**: React 18 + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS + Shadcn/ui
* **Charts**: Recharts
* **Icons**: Lucide React
* **State Management**: React Hooks
* **Chatbot**: OpenAI API / Langchain (or your chosen AI service)

## 🤖 AI Chatbot Capabilities

The integrated AI chatbot helps users by:

* Suggesting tools based on categories (e.g., “Show me all image editing tools”)
* Providing descriptions and summaries of tools
* Sharing direct links to tool websites
* Answering queries like: *“What’s the best free AI writing tool?”*

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd ai-tools-directory
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🧩 Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn/ui components
│   ├── ToolCard.tsx        # Individual tool card
│   ├── ToolsList.tsx       # Tools listing + filters
│   ├── FavoritesList.tsx   # Favorite tools manager
│   ├── CategoryChart.tsx   # Analytics chart
│   ├── Confetti.tsx        # Confetti animation
│   └── Chatbot.tsx         # AI chatbot component 🧠
├── services/
│   └── mockApi.ts          # Mock API
├── types/
│   └── types.ts            # TypeScript types
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── pages/                  # Page components
```

## 🎯 API Endpoints (Mock)

* `GET /api/tools` – Fetch all AI tools
* `GET /api/tools?category=Writing` – Filter tools by category
* `POST /api/favorites` – Add to favorites
* `GET /api/favorites` – Fetch favorites
* *(AI Chatbot consumes tool data internally for responses)*

## 🎨 Customization

### Adding New Tools

Edit `aiToolsData` in `src/services/mockApi.ts`:

```ts
{
  id: 13,
  name: "Your AI Tool",
  category: "Your Category",
  description: "Tool description",
  url: "https://your-tool.com",
  pricing: "Free/Premium",
  features: ["Feature 1", "Feature 2"]
}
```

### Theming

Use `tailwind.config.ts` to customize the UI theme, colors, font, or dark mode preferences.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Open a pull request

## 📄 License

This project is open-source under the [MIT License](LICENSE)

## 🙏 Acknowledgments

* Built with [React](https://reactjs.org/)
* Styled using [Tailwind CSS](https://tailwindcss.com/)
* Components from [Shadcn/ui](https://ui.shadcn.com/)
* Icons from [Lucide](https://lucide.dev/)
* AI chatbot powered by [OpenAI](https://openai.com/) or similar


