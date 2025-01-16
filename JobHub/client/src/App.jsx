import { BrowserRouter, Route, Routes } from "react-router-dom"
import { UserContextProvider } from "./context/UserContext.jsx"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"

import Layout from "./Layout"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import JobPage from "./pages/JobPage.jsx"
import CompetitionPage from "./pages/CompetitionPage.jsx"
import CreateJobPage from "./pages/CreateJobPage.jsx"
import CreateCompetitionPage from "./pages/CreateCompetitionPage.jsx"
import ResetPassPage from "./pages/ResetPassPage.jsx"

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
axios.defaults.withCredentials = true
 
const App = () => {
    return (
		<UserContextProvider>
			<BrowserRouter>
			<Toaster
					position="top-center"
					reverseOrder={false}
					gutter={8}
					containerClassName=""
					containerStyle={{marginTop: '4rem'}}
					toastOptions={{
						className: '',
						duration: 4000,
						style: {
							background: '#bbe1e8',
							color: 'black',
						},

						success: {
							duration: 4000,
							theme: {
								primary: 'green',
								secondary: 'black',
							},
						},
					}}
				/>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<IndexPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/jobs" element={<JobPage />} />
						<Route path="/jobs/create" element={<CreateJobPage />} />
						<Route path="/competitions" element={<CompetitionPage />} />
						<Route path="/competitions/create" element={<CreateCompetitionPage />} />
						<Route path="/:userID/reset-password" element={<ResetPassPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	)
}

export default App