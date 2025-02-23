# Todo App

## Setup Instructions

Follow these steps to set up and run the Todo App on your local machine:

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd todo app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```
4. Open `http://localhost:3000` in your browser.

## Features

### 1. Add, Update, and Delete Todos
- Users can add new todos, mark them as complete/incomplete, edit their content, and delete them.

### 2. Drag and Drop Functionality
- Todos can be rearranged via drag-and-drop using `react-beautiful-dnd`.

### 3. Filtering Todos
- Users can filter todos by:
  - All Todos
  - Completed Todos
  - Incomplete Todos

### 4. Context Menu
- Long press(mobile view) or right-click(desktop or laptop) on a todo to access options such as:
  - Edit
  - Delete
  - Mark as Complete/Incomplete

## Implementation Details

### State Management
- The app uses the Context API to manage global state (`TodoContext`).

### Styling and UI
- The app includes custom CSS for styling.


### Developed by Sunita Thapa

