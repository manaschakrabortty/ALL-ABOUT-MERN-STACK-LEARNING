TRY TO SOLVE ALL full-stack-assignment that are given by harkirat sing in his repo"https://github.com/hkirat/full-stack-assignment/blob/main/index.js"



# Full Stack Assignment - LeetCode Clone

This is a simple backend API for a **LeetCode Clone** built using **Express.js**. The API allows users to sign up, log in, view problems, submit solutions, and view submissions. It also includes an admin feature to add new problems.

## Features:
- **User Authentication**:
  - `POST /signup`: Register a new user.
  - `POST /login`: Log in a user with email and password.
- **Problem Management**:
  - `GET /questions`: Fetch all available problems.
  - `POST /submissions`: Submit a solution to a problem and randomly accept or reject the solution.
  - `GET /submissions`: Fetch all submissions made by the user.
- **Admin Features**:
  - `POST /admin/add-problem`: Admins can add new problems to the platform.



### Prerequisites:
- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/manaschakrabortty/full-stack-assignment.git
   cd full-stack-assignment
