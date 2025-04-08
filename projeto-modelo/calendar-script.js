const date = new Date(2025, 2, 27);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const reservedSlots = {
  Brazil: {},
  Singapore: {}
};


const baseTimeSlots = {
  Brazil: {
      '30 minutes': ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
      '60 minutes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
  },
  Singapore: {
      '30 minutes': ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
      '60 minutes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
  }
};

function createCalendar(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let header = document.querySelector('.calendar-month-year');
  header.innerText = `${months[month]} ${year}`;

  let firstWeekDayMonth = new Date(year, month, 1).getDay();
  let lastDayMonth = new Date(year, month + 1, 0).getDate();
  let emptyDays = (firstWeekDayMonth - 1 + 7) % 7;
  let divDias = document.querySelector('.calendar-days');
  divDias.innerHTML = '';


  for (let i = 0; i < emptyDays; i++) {
      divDias.innerHTML += `<div class="empty"></div>`;
  }


  for (let i = 1; i <= lastDayMonth; i++) {
      divDias.innerHTML += `<div class="days">${i}</div>`;
  }
}


function setupDaySelection() {
  const daysContainer = document.querySelector('.calendar-days');
  const timeSlotContainer = document.querySelector('.available-time-slots');

  daysContainer.addEventListener('click', (event) => {
      const clickedElement = event.target;

      if (clickedElement.classList.contains('days')) {
          document.querySelectorAll('.days.selected').forEach(el => el.classList.remove('selected'));

          clickedElement.classList.add('selected');

          const selectedDay = clickedElement.innerText.padStart(2, '0');
          const selectedMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses começam em 0
          const selectedYear = date.getFullYear();
          const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

          console.log("Dia selecionado:", selectedDate);

          timeSlotContainer.style.display = 'block';
          timeSlotContainer.innerHTML = ''; 
          const country = document.querySelector('.location + .dropdown input').value || 'Brazil';
          const duration = document.querySelector('.duration + .dropdown input').value === '60 minutes' ? '60min' : '30min';

          /*showAvailableSlots(duration);*/
      }
  });
}


function showAvailableSlots(duration = '30 minutes') {
    const slotsContainer = document.querySelector('.available-time-slots-container');
  const timeSlotContainer = document.querySelector('.available-time-slots');
  const dateObj = setupDaySelection();
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  const formattedDate = dateObj.toLocaleDateString('en', options);
    timeSlotContainer.innerHTML = ''; 
    slotsContainer.innerHTML = `<div class="date-header"><h3>${formattedDate}</h3></div><div class="available-time-slots"></div>`
    const durationValue = duration.split(' ')[0];   
    const dateHeader = document.createElement('div');
    dateHeader.className = 'date-header';
    
 
    
    dateHeader.innerHTML += `
      <h3>${formattedDate}</h3>
      <div class="time-slots-container"></div>
    `;
    
    timeSlotContainer.appendChild(dateHeader);
    
    const timeSlotsContainer = dateHeader.querySelector('.time-slots-container');
    let availableSlots = [...baseTimeSlots['Brazil'][durationValue]];
  
    if (!reservedSlots[country][selectedDate]) {
      reservedSlots[country][selectedDate] = [];
    }
    const reserved = reservedSlots[country][selectedDate];
  
    availableSlots = availableSlots.filter(slot => !reserved.includes(slot));
  
    if (availableSlots.length === 0) {
      timeSlotsContainer.innerHTML = '<p class="info-message">No time available</p>';
      return;
    }
  
    availableSlots.forEach(slot => {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'slot';
      slotDiv.innerText = slot;
  
      slotDiv.addEventListener('click', () => {
        if (!reserved.includes(slot)) {
          reservedSlots[country][selectedDate].push(slot);
          console.log(`Horário reservado: ${selectedDate} - ${slot}`);
          showAvailableSlots(duration); 
        }
      });
  
      timeSlotsContainer.appendChild(slotDiv);
    });
  }




function nextMonth() {
    let btnNext = document.querySelector('.btn-next');
    btnNext.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        createCalendar(date);
    });
}

function previousMonth() {
    let btnPrev = document.querySelector('.btn-previous');
    btnPrev.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        createCalendar(date);
    });
}



createCalendar(date);
nextMonth();
previousMonth();
setupDaySelection();
showAvailableSlots();