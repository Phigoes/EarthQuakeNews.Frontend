# **Earthquake News** 

**Earthquake News** is a web application that displays real-time earthquake data from various locations. Users can filter, search, and sort earthquake events by magnitude, location, depth, and time.

## **Features** 
- 📌 View earthquake data in an interactive table  
- 🔍 Search by magnitude and place
- 📍 Filter by location  
- 📊 Sort by magnitude, latitude, longitude, depth, and time  
- 📅 Filter by date
- 🌐 External links to more earthquake details  

## **Technologies Used** 🛠
- **Vue.js 3** + **Vite** (Frontend framework)  
- **TailwindCSS** (Styling)  
- **Axios** (API requests)  
- **ASP.NET Core API** (Backend)  
- [**Earthquake API**](https://github.com/Phigoes/EarthQuakeNews.Backend)

## **Screen** 
![image](https://github.com/user-attachments/assets/7b1234cc-f718-43b8-8009-15f5f630ad86)

## **Installation & Setup** 🏗

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/Phigoes/EarthQuakeNews.Frontend.git
cd EarthQuakeNews
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Run the development server**
```sh
npm run dev
```
The app will be available at: [http://localhost:5173](http://localhost:5173)  

## **Environment Variables** 
Open a `.env` file in the root directory and modify the following variables:
```
VITE_API_URL=your_api_endpoint_here
```
Replace `your_api_endpoint_here` with the actual API URL.
