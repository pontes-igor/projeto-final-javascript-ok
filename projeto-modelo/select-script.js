
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

const dropdowns = document.querySelectorAll(".dropdown");
const listOfOptions = document.querySelectorAll(".option");
const body = document.body;

// Functions
const toggleDropdown = (event) => {
  event.stopPropagation();
  let dropdown = event.currentTarget.closest(".dropdown");
  dropdown.classList.toggle("opened");
};

const selectOption = (event) => {
  const input = event.currentTarget.closest(".dropdown").querySelector("input");
  listOfOptions.forEach((option) => {
    option.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");
  input.value = event.currentTarget.textContent;
  duracaoReunioes(event.currentTarget.textContent);
};

const closeDropdownFromOutside = () => {
  dropdowns.forEach((dropdown) => {
    if (dropdown.classList.contains("opened")) {
      dropdown.classList.remove("opened");
    }
  });
};

// Event Listeners
body.addEventListener("click", closeDropdownFromOutside);

listOfOptions.forEach((option) => {
  option.addEventListener("click", selectOption);
});

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", toggleDropdown);
});

export function funcao() {
  console.log("Funcionando");
}

function duracaoReunioes (duration = '30 minutes') {
  const timeSlotContainer = document.querySelector('.available-time-slots');
  timeSlotContainer.innerHTML = ''; 
  let availableSlots = [...baseTimeSlots['Brazil'][duration]];
 console.log(availableSlots);

 let reserved = availableSlots 
  availableSlots.forEach(slot => {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'slot';
      slotDiv.innerText = slot;

      slotDiv.addEventListener('click', () => {
          if (!reserved.includes(slot)) {
              reservedSlots[country][selectedDate].push(slot);
              console.log(`Horário reservado: ${selectedDate} - ${slot}`);

              showAvailableSlots(selectedDate, country, duration);
          }
      });

      timeSlotContainer.appendChild(slotDiv);
  });
}


duracaoReunioes
funcao();