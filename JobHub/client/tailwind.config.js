/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
      },
      boxShadow: {
        'primary': 'rgb(136, 136, 136) 5px 5px 0px 0px',
      },
      backgroundImage: {
        'hero': "linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0)),url('https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }
    },
  },
  plugins: [],
}

