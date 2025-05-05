import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GetFood from './pages/GetFood/GetFood'
import Donate from './pages/Donate/Donate'
import Member from './pages/Member'
import Footer from './components/Footer'

function App() {
	return (
		<Router>
			<div className='min-vh-100 d-flex flex-column justify-content-between home'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/member' element={<Member />} />
					<Route path='/get' element={<GetFood />} />
					<Route path='/give' element={<Donate />} />
					<Route path='/members' element={<Member />} />
					<Route path='*' element={<Home />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
