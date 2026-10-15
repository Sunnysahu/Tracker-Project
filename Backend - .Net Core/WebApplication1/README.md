
# Work Request Tracker

A simple Work Request Tracker module built with **ASP.NET Core Web API** (backend) and **React + Vite** (frontend).

Users can create, list, filter, search, update status, and add notes to work requests.

---

## Tech Stack

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Swagger

### Frontend
- React 18
- Vite
- Vanilla CSS (minimal styling)

---

## Features

- Create new work requests
- View paginated list of work requests
- Filter by status (New, InProgress, Blocked, Completed)
- Search by Title or Client Name
- Update status
- Add notes
- Proper validation & error handling

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download) (or .NET 9)
- [Node.js 18+](https://nodejs.org/)
- SQL Server (LocalDB / Express / Full)
- Git

## Backend Packages

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Scalar.AspNetCore
```
---

## Database Setup

1. Open SQL Server Management Studio (or Azure Data Studio)
2. Run the following script:

```sql
CREATE DATABASE ProjectSample;
GO

USE ProjectSample;
GO

CREATE TABLE WorkRequests (
    Id              UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    Title           NVARCHAR(200)    NOT NULL,
    ClientName      NVARCHAR(150)    NOT NULL,
    Description     NVARCHAR(2000)   NULL,
    Priority        NVARCHAR(20)     NOT NULL,
    Status          NVARCHAR(20)     NOT NULL,
    DueDate         DATE             NOT NULL,
    CreatedDate     DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedDate     DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    Notes           NVARCHAR(MAX)    NULL
);

CREATE INDEX IX_WorkRequests_Status ON WorkRequests (Status);
CREATE INDEX IX_WorkRequests_Title_ClientName ON WorkRequests (Title, ClientName);
```

---

## Backend Setup

```bash
cd backend
```

### 1. Update Connection String

Open `appsettings.json` and update the connection string if needed:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ProjectSample;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

### 2. Restore & Run

```bash
dotnet restore
dotnet run
```

Backend will start at:
- HTTPS: `https://localhost:7108`
- Swagger: `https://localhost:7108/swagger`

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at:
- `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint                              | Description                  |
|--------|---------------------------------------|------------------------------|
| GET    | `/api/work-requests`                  | List + filter + search + pagination |
| GET    | `/api/work-requests/{id}`             | Get single work request      |
| POST   | `/api/work-requests`                  | Create new work request      |
| PATCH  | `/api/work-requests/{id}/status`      | Update status                |
| POST   | `/api/work-requests/{id}/notes`       | Add a note                   |

---

## Project Structure

```
WorkRequestTracker/
├── backend/                  # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   └── appsettings.json
│
└── frontend/                 # React + Vite
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## How to Run Both Apps

1. Start **SQL Server**
2. Start **Backend**:
   ```bash
   cd backend
   dotnet run
   ```
3. Start **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
4. Open browser → `http://localhost:5173`

---

## Notes

- Authentication is not implemented
- Status transition rules are not enforced
- Styling is minimal
- Data is persisted in SQL Server