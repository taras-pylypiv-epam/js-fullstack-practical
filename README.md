# Quiz Builder

Quiz Builder web application where users can create custom quizzes with various types of questions.

Stack:
- TypeScript
- Express.js
- Prisma ORM
- Zod
- Next.js

---

## Clone repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

## Installation (backend)

1. Install dependencies:

```bash
cd backend
npm install
```

2. Configure your database in `.env`:

```env
DATABASE_URL="file:./dev.db"
```

3. Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. (Optional) Seed initial data:

```bash
npx prisma db seed
```

---

## Scripts (backend)

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Run the server in watch mode (with tsx)       |
| `npm start`            | Run the compiled server                       |
| `npm run build`        | Compile TypeScript to JavaScript              |
| `npm run type-check`   | Type-check without emitting files             |
| `npm run lint`         | Run ESLint to check code style                |
| `npm run lint:fix`     | Fix linting issues automatically              |
| `npm run format`       | Format code using Prettier                    |
| `npm run format:check` | Check code formatting without writing changes |
| `npm run prepare`      | Run Husky hooks (git hooks setup)             |

---

## Installation (frontend)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Configure API URL `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Start dev server:

```bash
npm run dev
```

---

## Scripts (frontend)

| Command                | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Start the Next.js development server              |
| `npm run build`        | Build the production-ready frontend               |
| `npm start`            | Start the production build                        |
| `npm run lint`         | Check code with ESLint                            |

---

## API Endpoints

### Quizzes

* **GET /quizzes**
  Get all quizzes with title and number of questions.

* **GET /quizzes/:id**
  Get full details of a single quiz including questions and options.

* **POST /quizzes**
  Create a new quiz. Request body example:

```json
{
  "title": "My Quiz",
  "description": "A short test quiz",
  "questions": [
    { "text": "Is the sky blue?", "type": "BOOLEAN" },
    { "text": "Your favorite programming language?", "type": "INPUT" },
    {
      "text": "Pick all fruits",
      "type": "MULTIPLE",
      "options": [
        { "text": "Apple" },
        { "text": "Banana" },
        { "text": "Carrot" }
      ]
    }
  ]
}
```

* **DELETE /quizzes/:id**
  Delete a quiz by ID.
