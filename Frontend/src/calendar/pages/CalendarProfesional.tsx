import React, { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar, PickersDay } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import 'moment/locale/es'
import mockConfigSlots from '../mocks/mockConfigSlot'
import clsx from 'clsx'
import '../styles/calendar.css' // Para nombres de clases condicionales

import mockAppointments from '../mocks/appoinmet' // Importar mock de turnos

moment.locale('es')

// Agrega la importación de ConfigSlot
import { ConfigSlot } from '../mocks/mockConfigSlot'

// Extrae los días únicos con slots
const getUniqueDaysWithSlots = () => {
	const uniqueDays = new Set<string>()
	mockConfigSlots.forEach(slot => {
		const day = moment(slot.initial).format('YYYY-MM-DD')
		uniqueDays.add(day)
	})
	return Array.from(uniqueDays)
}

const CustomDay = props => {
	const {
		day,
		selectedDay,
		hoveredDay,
		onPointerEnter,
		onPointerLeave,
		...other
	} = props
	const isDayWithSlot = getUniqueDaysWithSlots().includes(
		day.format('YYYY-MM-DD')
	)

	return (
		<PickersDay
			{...other}
			day={day}
			onMouseEnter={onPointerEnter}
			onMouseLeave={onPointerLeave}
			style={{
				...(isDayWithSlot && {
					border: '2px solid #7445C7', // Color azul-500 de Tailwind
					borderRadius: '50%',
					color: '#7445C7' // Color azul-500 de Tailwind
				}),
				...(day.isSame(selectedDay, 'day') && {
					backgroundColor: 'rgba(116, 69, 199, 0.12)', // Fondo azul-500 de Tailwind
					color: '#FD8847' // Color azul-500 de Tailwind
				}),
				...(day.isSame(hoveredDay, 'day') && {
					backgroundColor: 'rgba(116, 69, 199, 0.04)' // Fondo hover azul-500 de Tailwind
				})
			}}
		/>
	)
}

const CalendarProfesional: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
	const [hoveredDay, setHoveredDay] = useState<Moment | null>(null)
	const [selectedSlots, setSelectedSlots] = useState<ConfigSlot[]>([])
	const [selectedSlot, setSelectedSlot] = useState<ConfigSlot | null>(null)
	const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false)
	const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] = useState([])

	const handleDateChange = (date: Moment | null) => {
		setSelectedDate(date)
	}

	useEffect(() => {
		if (selectedDate) {
			const selectedDaySlots = mockConfigSlots.filter(slot =>
				moment(slot.initial).isSame(selectedDate, 'day')
			)
			setSelectedSlots(selectedDaySlots)
			setSelectedSlot(null)
			setShowConfirmButton(false)

			// Filtrar los turnos para la fecha seleccionada
			const appointments = mockAppointments.data.filter(appointment =>
				moment(appointment.startDate).isSame(selectedDate, 'day')
			)
			setAppointmentsForSelectedDate(appointments)
		}
	}, [selectedDate])

	const handleSlotClick = (
		slot: ConfigSlot,
		event: React.MouseEvent<HTMLDivElement>
	) => {
		if (selectedSlot === slot && showConfirmButton) {
			// Si se hace clic nuevamente en el mismo horario y el botón de confirmación está visible, ocultarlo y limpiar el horario seleccionado
			setSelectedSlot(null)
			setShowConfirmButton(false)
		} else {
			// De lo contrario, mostrar el botón de confirmación y seleccionar el horario
			setSelectedSlot(slot)
			setShowConfirmButton(true)
		}
	}

	const handleConfirmClick = () => {
		alert(
			`Horario confirmado: ${moment(selectedSlot?.initial).format('HH:mm')} - ${moment(selectedSlot?.end).format('HH:mm')}`
		)
	}

	return (
		<LocalizationProvider dateAdapter={AdapterMoment} >
			<div className='h-screen px-20'>
				<div className=''>
					<div className='flex gap-4 h-screen'>
						<div className='shadow-md w-2/3 h-[550px] rounded-lg p-2'>
							<DateCalendar
								value={selectedDate}
								onChange={handleDateChange}
								showDaysOutsideCurrentMonth
								displayWeekNumber
								slots={{ day: CustomDay }}
								sx={{
									'& .MuiPickersDay-root': {
										width: 60,
										height: 60,
										fontSize: 18,
										display: 'flex',
										gap: 5,
										margin: '5px'
									},
								}}	
								slotProps={{
									day: ownerState =>
										({
											selectedDay: selectedDate,
											hoveredDay,
											onPointerEnter: () => setHoveredDay(ownerState.day),
											onPointerLeave: () => setHoveredDay(null)
										}) as any
								}}
							/>
						</div>
						<div className='p-4 flex flex-col gap-2'>
							{selectedSlots.length > 0 ? (
								selectedSlots.map((slot, index) => (
									<div
										key={index}
										className={clsx(
											'p-2 border border-gray-300 rounded cursor-pointer relative',
											{
												'bg-gray-800 text-white': selectedSlot === slot,
												'bg-white text-black': selectedSlot !== slot
											}
										)}
										onClick={e => handleSlotClick(slot, e)}
									>
										{moment(slot.initial).format('HH:mm')} -{' '}
										{moment(slot.end).format('HH:mm')}
									</div>
								))
							) : (
								<p>No hay horarios disponibles para este día.</p>
							)}

							<div>
								{showConfirmButton && selectedSlot && (
									<button
										className='p-2 bg-blue-500 text-white rounded'
										onClick={handleConfirmClick}
									>
										Confirmar
									</button>
								)}
							</div>

							{/* Lista de turnos */}
							<div className='mt-4'>
								<h3 className='text-lg font-bold'>Turnos del día</h3>
								{appointmentsForSelectedDate.length > 0 ? (
									appointmentsForSelectedDate.map((appointment, index) => (
										<div key={index} className='p-2 border border-gray-300 rounded my-2'>
											<p className='font-bold'>{appointment.name}</p>
											<p>
												{moment(appointment.startDate).format('HH:mm')} -{' '}
												{moment(appointment.endDate).format('HH:mm')}
											</p>
										</div>
									))
								) : (
									<p>No hay turnos para este día.</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</LocalizationProvider>
	)
}

export default CalendarProfesional
