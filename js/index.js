// Funkcja do otwierania panelu bocznego
const openNav = () => {
	document.getElementById('inputPanel').style.width = '250px'
	document.querySelector('.closebtn').style.display = 'block' // Pokaż przycisk
}

const closeNav = () => {
	document.getElementById('inputPanel').style.width = '0'
	document.querySelector('.closebtn').style.display = 'none' // Ukryj przycisk
}

// Funkcja do edycji lekcji
const editLesson = () => {
	const lessonNumber = document.getElementById('lessonToEdit').value
	const newLessonName = document.getElementById('newLessonName').value
	const newLessonRoom = document.getElementById('newLessonRoom').value

	// Wybór odpowiedniego diva na podstawie numeru lekcji
	const lessonDiv = document.querySelector(`.lesson.${getLessonClass(lessonNumber)}`)
	if (lessonDiv) {
		// Zmiana nazwy przedmiotu
		const titleSpan = lessonDiv.querySelector('.title')
		const timeRoomSpan = titleSpan.querySelector('.timeroom')
		titleSpan.firstChild.textContent = newLessonName // Zmienia tylko nazwę przedmiotu
		if (newLessonRoom) {
			const time = timeRoomSpan.textContent.split(',')[0] // Zachowuje czas
			timeRoomSpan.textContent = `${time}, sala ${newLessonRoom}` // Zmienia tylko numer sali
		}
	} else {
		alert('Nie znaleziono lekcji o podanym numerze.')
	}

	closeNav()
}

const removeLesson = () => {
	const lessonNumber = document.getElementById('lessonToRemove').value
	const lessonDiv = document.querySelector(`.lesson.${getLessonClass(lessonNumber)}`)
	if (lessonDiv) {
		lessonDiv.remove()
	} else {
		alert('Nie znaleziono lekcji o podanym numerze.')
	}
}

// Funkcja pomocnicza do uzyskania klasy na podstawie numeru lekcji
const getLessonClass = number => {
	switch (number) {
		case '1':
			return 'firstlesson'
		case '2':
			return 'secondlesson'
		case '3':
			return 'thirdlesson'
		case '4':
			return 'fourthlesson'
		case '5':
			return 'fifthlesson'
		case '6':
			return 'sixthlesson'
		case '7':
			return 'seventhlesson'
		case '8':
			return 'eighthlesson'
		default:
			return ''
	}
}

const cancelLesson = () => {
	const lessonNumber = document.getElementById('lessonToCancel').value
	const lessonDiv = document.querySelector(`.lesson.${getLessonClass(lessonNumber)}`)
	if (lessonDiv) {
		const titleSpan = lessonDiv.querySelector('.title')
		const canceledTitle = document.createElement('span')
		canceledTitle.textContent = titleSpan.firstChild.textContent // Przenosimy nazwę przedmiotu
		canceledTitle.style.textDecoration = 'line-through'
		canceledTitle.style.fontWeight = 'bold'

		// Zastąpienie oryginalnego tekstu nowym elementem
		titleSpan.firstChild.replaceWith(canceledTitle)

		// Dodajemy etykietę "Odwołana" tylko jeśli jeszcze nie istnieje
		if (!lessonDiv.querySelector('.cancel-text')) {
			const br = document.createElement('br') // Tworzymy element <br>
			const cancelText = document.createElement('span')
			cancelText.textContent = 'Odwołana'
			cancelText.className = 'cancel-text' // Klasa dla nowego spana z tekstem "Odwołana"

			// Dodajemy najpierw <br>, a potem napis "Odwołana"
			titleSpan.appendChild(br)
			titleSpan.appendChild(cancelText)
		}

		// Dodanie fioletowego paska tylko jeśli jeszcze nie istnieje
		if (!lessonDiv.querySelector('.cancel-bar')) {
			const cancelBar = document.createElement('div')
			cancelBar.className = 'cancel-bar'
			lessonDiv.prepend(cancelBar)
		}

		// Usunięcie ikony SVG
		const svgIcon = lessonDiv.querySelector('svg')
		if (svgIcon) {
			svgIcon.remove()
		}
	} else {
		alert('Nie znaleziono lekcji o podanym numerze.')
	}
}

// Funkcja do aktualizacji dat tygodnia
function updateWeekDates() {
	const today = new Date()
	const dayOfWeek = today.getDay()
	const monday = new Date(today)
	monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

	const dayElements = document.querySelectorAll('.week-nav li')
	for (let i = 0; i < 7; i++) {
		const dayDate = new Date(monday)
		dayDate.setDate(monday.getDate() + i)
		const dateFormatted = `${dayDate.getDate()}`.padStart(2, '0')
		const dayName = dayElements[i].innerText.split('<br>')[0] // Pobiera nazwę dnia
		dayElements[i].innerHTML = `${dayName}<br>${dateFormatted}` // Dodaje <br> po nazwie dnia
	}
}

// Funkcja do wyróżniania bieżącego dnia tygodnia
function highlightCurrentDay() {
	const currentDay = new Date().getDay()
	const days = ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.']
	const dayElements = document.querySelectorAll('.week-nav li')

	dayElements.forEach((element, index) => {
		if (days[currentDay] === element.innerText.split('\n')[0]) {
			element.style.fontWeight = 'bold'
		}
	})
}

const generateRandomSchedule = () => {
	const includeVocational = document.getElementById('includeVocational').checked

	let lessons = [
		'Język polski',
		'Informatyka',
		'Matematyka',
		'Fizyka',
		'Język angielski zawodowy',
		'Język angielski',
		'Religia',
		'Geografia',
		'Biologia',
		'Chemia',
		'Historia',
		'Język niemiecki',
		'Historia i teraźniejszość',
		'Podstawy przedsiębiorczości',
	]

	const vocationalLessons = [
		'Programowanie aplikacji deskto...',
		'Projektowanie i administrowanie b...',
		'Tworzenie stron i aplikacji inter...',
		'Witryny i aplikacje internetowe',
		'Działalność gospodarcza w branż...',
		'Programowanie obiektowe',
	]

	const rooms = [
		'44',
		'65',
		'66',
		'68',
		'117',
		'133',
		'143',
		'144',
		'146',
		'148',
		'217',
		'222',
		'224',
		'225',
		'244',
		'246',
		'248',
		'43',
		'124',
		'125',
		'233',
		'41',
		'122',
		'243',
		'77',
		'63',
		'57',
		'63H',
		'30',
		'31/32',
		'50/1',
		'50/2',
		'232',
		'226',
		'242',
		'132',
		'61',
		'84',
		'106',
		'109',
		'110',
		'112',
		'c1',
		'c2',
		'c3',
		'c4',
		'c5',
		'c6',
		'c7',
		'c8',
		'c9',
		'c10',
		'c11',
		'c12',
		'c16',
		'c17',
		'c18',
		'c25',
		'c26',
		'c27',
		'B1',
		'B2',
		'B3',
	]

	if (includeVocational) {
		lessons = lessons.concat(vocationalLessons)
	}

	let previousLesson = ''

	for (let i = 1; i <= 8; i++) {
		let chosenLesson
		do {
			chosenLesson = lessons[Math.floor(Math.random() * lessons.length)]
		} while (vocationalLessons.includes(chosenLesson) && chosenLesson === previousLesson)

		const randomRoom = rooms[Math.floor(Math.random() * rooms.length)]
		const lessonDiv = document.querySelector(`.lesson.${getLessonClass(i.toString())}`)
		if (lessonDiv) {
			const titleSpan = lessonDiv.querySelector('.title')
			const timeRoomSpan = titleSpan.querySelector('.timeroom')
			titleSpan.firstChild.textContent = chosenLesson

			// Zachowanie istniejącego czasu lekcji i aktualizacja sali
			let [time, _] = timeRoomSpan.textContent.split(',') // Dzielimy tekst na czas i salę
			timeRoomSpan.textContent = `${time.trim()}, sala ${randomRoom}`
		}

		previousLesson = chosenLesson
	}
}

// Inicjalizacja funkcji po załadowaniu strony
document.addEventListener('DOMContentLoaded', function () {
	updateWeekDates()
	highlightCurrentDay()

	// Przypisanie funkcji do przycisków i ikon
	document.getElementById('editLessonButton').addEventListener('click', editLesson)
	document.querySelector('.openInput').addEventListener('dblclick', openNav)
	document.querySelector('#generateRandomScheduleButton').addEventListener('click', generateRandomSchedule)
})
