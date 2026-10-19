# ChainShield

**Unified Supply Chain Finance Platform**

ChainShield is a supply chain finance platform designed to improve supplier visibility, support supply chain risk analysis, and bring supplier-related financial workflows into a unified ecosystem.

Modern supply chains involve interconnected suppliers, operational dependencies, and financial relationships. ChainShield aims to simplify supplier management and provide a foundation for understanding these relationships through a centralized application.

---

## Features

- **Supplier Management** — Create, retrieve, update, and manage supplier records through REST APIs.
- **Backend API** — FastAPI-based backend for handling application requests and business logic.
- **Database Integration** — PostgreSQL database with SQLAlchemy for structured data management.
- **Database Migrations** — Alembic for managing database schema changes.
- **Health Monitoring** — Health-check endpoint for verifying application and database connectivity.
- **Supply Chain Visualization** — Frontend graph interface for exploring supplier networks; currently uses mock data.
- **Risk Intelligence** — Planned capabilities for evaluating supplier risks and supply chain dependencies.
- **Financial Workflows** — Planned modules for financing, pricing, foreign exchange, and settlement.

---

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | React, TypeScript |
| Backend | Python, FastAPI |
| ORM | SQLAlchemy 2.0 |
| Database | PostgreSQL |
| Database Migrations | Alembic |
| API Documentation | OpenAPI, Swagger UI |
| Version Control | Git, GitHub |

---

## Database Schema

ChainShield currently includes a supplier data model backed by PostgreSQL. The database schema is managed through Alembic migrations.

| Component | Purpose |
|---|---|
| `suppliers` | Stores supplier information and supports supplier management operations |

Additional entities for supplier relationships, risk analysis, and financing workflows can be introduced as the platform evolves.

---

## Getting Started

### 1. Requirements

- Python
- PostgreSQL
- Git
- Node.js and npm for the frontend

### 2. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Unified-Supply-Chain-Finance
```

### 3. Set Up the Backend

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\activate
```

Install the backend dependencies using the dependency file available in the project. For example, if `requirements.txt` exists:

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a local `.env` file and configure the variables required by the application.

Example:

```env
DATABASE_URL=your_postgresql_connection_string
```

Use the exact environment variable names defined in the project's configuration. Never commit real database credentials, API keys, or passwords to GitHub.

### 5. Set Up the Database

1. Install and start PostgreSQL.
2. Create the project database.
3. Configure the database connection in the local environment.
4. Apply the configured Alembic migrations:

```bash
alembic upgrade head
```

### 6. Run the Backend

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

Once the server starts, access the application using the following URLs:

- **API Base URL:** `http://127.0.0.1:8000`
- **Interactive API Documentation:** `http://127.0.0.1:8000/docs`
- **Health Check:** `http://127.0.0.1:8000/api/v1/health`

The health endpoint can be used to verify the application's status and database connectivity.

### 7. Run the Frontend

Navigate to the frontend directory, if it is separate, and install its dependencies:

```bash
npm install
```

Start the frontend using the development command defined in its `package.json`, commonly:

```bash
npm run dev
```

Follow the terminal output to open the local frontend URL.

*Note: Verify dependency filenames, directory names, environment variables, and startup commands against the actual repository before following these instructions.*

---

## How It Works

1. The frontend provides an interface for interacting with supply chain information.
2. Requests are sent to the FastAPI backend through API endpoints.
3. The backend processes requests and interacts with PostgreSQL through SQLAlchemy.
4. Alembic manages database schema changes across development iterations.
5. Supplier information is returned to the frontend for display.

The current implementation establishes the backend and supplier-management foundation. Additional supply chain graph integrations and financial capabilities remain part of ongoing development.

---

## Security Considerations

- Keep database credentials and other secrets in local environment variables.
- Exclude `.env` files from version control.
- Validate incoming API requests.
- Configure appropriate authentication and authorization before exposing sensitive business information.
- Restrict database access according to the application's security requirements.

---

## Future Enhancements

- Supplier relationship management with upstream and downstream connections
- Live supply chain graph connected to backend APIs
- Supplier risk assessment engine
- Financing and pricing workflows
- Foreign exchange and settlement capabilities
- Alerts and notifications
- AI-assisted supply chain insights

---

## Project Status

ChainShield is under active development. The current focus is establishing a reliable backend, database integration, and supplier management foundation before expanding into advanced supply chain intelligence and financial workflows.

---

## Team

Developed by **Rufina and team**  
Chennai Institute of Technology, Chennai, India

---

## License

A license has not yet been specified. Add an appropriate license file when the project's distribution and reuse terms have been decided.
