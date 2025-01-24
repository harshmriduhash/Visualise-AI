# Visualise AI - Creative Dream Generator

Welcome to **Visualise AI**, a cutting-edge web application powered by OpenAI’s GPT-3 and Supabase that generates and refines creative dreams based on user input. The app allows users to describe their dreams, and the AI generates imaginative and artistic responses to help visualize and explore those dreams.

## 🚀 Features

- **Dream Description Input**: Users can describe their dreams, which will be processed by the AI.
- **Creative Dream Generation**: The AI generates a unique interpretation of the dream, transforming it into a creative response.
- **Dream Refinement**: The app helps users refine and visualize their dreams with iterative prompts.
- **AI Integration**: Powered by **OpenAI GPT-3** for creative writing and **Supabase** for backend storage and database management.
- **Fast & Responsive UI**: Built with **Tailwind CSS** for a modern, fluid design.

## 🛠 Technologies Used

### **Frontend**
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for creating responsive designs.
- **Vite**: A fast build tool for modern web apps.

### **Backend**
- **OpenAI GPT-3**: Natural language processing model for generating dream descriptions.
- **Supabase**: Open-source backend-as-a-service providing real-time databases and authentication.

### **Development Tools**
- **Figma**: UI design and prototyping.
- **GitHub**: Version control and project collaboration.

## 🔑 How It Works

1. **User Interaction**:
   - Users input their dream descriptions into the text box provided.

2. **AI Processing**:
   - The text is processed by GPT-3, which generates a creative and unique interpretation of the dream.

3. **Result Display**:
   - The generated dream is displayed on the screen, where users can interact and refine their request.

4. **Database Integration**:
   - The user's dream and the generated result are saved to Supabase for future access.

## 🌱 Installation

### Clone the Repository

```bash
git clone https://github.com/harshmriduhash/Visualise AI.git
cd Visualise AI
```

### Install Dependencies

Make sure you have Node.js installed. If not, download it [here](https://nodejs.org/).

Run the following command to install all required dependencies:

```bash
npm install
```

### Create a `.env` File

In the root of the project, create a `.env` file and add your OpenAI API Key and Supabase credentials:

```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Run the Application Locally

After installing the dependencies and setting up the `.env` file, you can run the app locally with the following command:

```bash
npm start
```

## 🌍 Deployment

To deploy the app online, you can use **Netlify**.

### Steps for Deployment:

1. Go to [Netlify](https://www.netlify.com/).
2. Click "New site from Git" and choose your repository (GitHub).
3. Set the build command to `npm run build` and the publish directory to `build`.
4. Click **Deploy Site**.

Your app will now be live on Netlify!

## 💡 Ideas for Future Features

- **User Accounts**: Allow users to log in and save their dream history.
- **Dream Gallery**: Display a gallery of user-submitted dreams and interpretations.
- **Voice Input**: Implement speech-to-text for a more interactive experience.
- **Social Sharing**: Enable users to share their dream results on social media.

## 🤝 Contributing

Contributions are always welcome! If you have suggestions, improvements, or features you'd like to add, feel free to fork the repository and submit a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a new pull request.

## 📬 Contact

- **Creator**: Harsh Mriduhash
- **GitHub**: [@Wrttnspknbrkn](https://github.com/harshmriduhash)
- **Email**: harshsahay2709@gmail.com
