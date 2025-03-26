# FrontendRepo

## Overview
This repository contains the frontend of a blog website built using **React (JSX)**. The frontend fetches data from the backend APIs created using **Django Rest Framework (DRF)**. The blog allows users to browse posts, view categories, and interact with content dynamically.

🔗 **Live frontend API URL:** (https://frontendrepo-pdg8-aoj3f83d7-vikas-projects-2e7e375b.vercel.app/))

## Features
- **Fetch and Display Blog Posts**
- **User Profiles and Comments**
- **Category-based Filtering**
- **Responsive UI with Modern Design**
- **Seamless API Integration**

## Tech Stack
- **React (JSX)** (Frontend Framework)
- **Tailwind CSS** (Styling & Responsive UI)
- **Django Rest Framework (DRF)** (Backend APIs)
- **AWS Free Tier** (Backend Hosting)

## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/Vikass19/frontendrepo.git
cd frontendrepo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```
Frontend will be available at: [http://localhost:3000](http://localhost:3000)

## API Endpoints Used
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/posts/` | GET | Get all posts |
| `/api/posts/<id>/` | GET | Get a single post |
| `/api/comments/` | GET, POST | Get all comments / Add a comment (Authenticated) |
| `/api/user-profile/` | GET | Get user profile |
| `/api/categories/` | GET | Get all categories |

## Deployment
To deploy the frontend, you can use platforms like **Vercel**, **Netlify**, or **AWS S3**.

### Deploying on Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy the project:
   ```bash
   vercel
   ```

## Contributions
Feel free to fork this repository and submit a pull request if you want to contribute or improve the project.

## License
This project is licensed under the **MIT License**.

---

📌 **Maintainer:** Vikas Bansode  
📧 **Email:** vikasbansode804@gmail.com

