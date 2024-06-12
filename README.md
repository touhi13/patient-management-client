# Patient Management Client

Patient Management Client is a web application that allows users to create, manage, and search patients. Users can add new patients, edit existing ones, delete them.

## Features

- Login
- Register
- Add new patients
- Edit existing patients
- Delete patients
- Search patients by name
- Filter patients by gender

## Technologies Used

- React
- Redux Toolkit
- React Hook Form
- Yup (for form validation)
- Tailwind CSS (for styling)
- React Router

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a backend server running that provides the necessary API endpoints for managing patients.

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/touhi13/patient-management-client.git
   cd patient-management-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add environment variables:**
   Create a `.env` file in the root of the project and add the necessary environment variables. For example:

   ```env
   VITE_REACT_APP_API_URL=http://127.0.0.1:8000/
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.


## Contributing

Contributions are welcome! Please feel free to submit any issues or pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).

