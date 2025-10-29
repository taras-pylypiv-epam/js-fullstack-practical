# Quiz App

A simple Quiz App built with **TypeScript**, **Express.js**, **Prisma ORM**, and **Zod** for request validation.

---

## Installation (backend)

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:

```bash
cd backend
npm install
```

3. Configure your database in `.env`:

```env
DATABASE_URL="file:./dev.db"
```

4. Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. (Optional) Seed initial data:

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
      "type": "CHECKBOX",
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
