import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../professional/pages/Home'
import Landing from '../landing/pages/Landing'
import LaoutLanding from '../layout/pages/LayoutLanding'
import Planes from '../landing/components/planos/Planes'
import ComoFunciona from '../landing/components/comoFunciona/ComoFunciona'
import Clientes from '../landing/components/clientes/Clientes'
import SignUpModal from '../auth/components/form/SingUpModal'
import LoginOptionsModal from '../auth/components/form/LoginOptionsModal'
import LoginModal from '../auth/components/form/LoginModal'
import LayoutApp from '../layout/pages/LayoutApp'
import Calendar from '../calendar/pages/Calendar'
import Clients from '../professional/pages/Clients'
import { AddClientForm } from '../professional/pages/AddClientForm'

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<LaoutLanding />}>
					<Route path='/' element={<Landing />} />
					<Route path='/comofunciona' element={<ComoFunciona />} />
					<Route path='/planes' element={<Planes />} />
					<Route path='/clientes' element={<Clientes />} />
					<Route path='/login' element={<LoginModal />} />
					<Route path='/loginOptions' element={<LoginOptionsModal />} />
					<Route path='/register' element={<SignUpModal />} />
				</Route>
				<Route element={<LayoutApp />}>
					<Route path='/home' element={<Home />} />
					<Route path='/calendar' element={<Calendar />} />
					<Route path='/clients' element={<Clients />} />
					<Route path='/professional/add-client' element={<AddClientForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
