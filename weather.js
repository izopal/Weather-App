// зіставлення кодів погодних умов із назвами класів значків (залежно від відповіді Openweathear API)
const weatherIconMap = {
        '01d':'sun',
        '01n':'moon',
        '02d':'sun',
        '02n':'moon',
        '03d':'cloud',
        '03n':'cloud',
        '04d':'cloud',
        '04n':'cloud',
        '09d':'cloud-rain',
        '09n':'cloud-rain',
        '10d':'cloud-rain',
        '10n':'cloud-rain',
        '11d':'cloud-lightning',
        '11n':'cloud-lightning',
        '13d':'cloud-snow',
        '13n':'cloud-snow',
        '50d':'water',
        '50n':'water',
};


// =================== початкова інформація про погоду за місцезнаходження користувача (визначаємо по ip через сервіс https://ipinfo.io)  ======>
document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо інформацію про місцезнаходження за IP
    fetch('https://ipinfo.io?token=4a5981476ca622')
        .then(response => response.json())
        .then(data => {
            const location = `${data.city}, ${data.country}`;
            // Викликаємо функцію fetchwWeatherData з отриманим місцезнаходженням
            fetchwWeatherData(location);
        })
        // Відповідна обробка помилки
        .catch(error => {
            console.error('Помилка отримання даних про місцезнаходження:', error);
        });
});


//===========================================================================================================================>
const apiKey = '93b9d9f6e38820c58e3f7663c36b38c0';

function fetchwWeatherData(location){
    // Виклик прогнозу погоди на 5 днів з даними кожні 3 години
    const apiUrl5 = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric&lang=ua`;
    // console.log('Відправлено запит до API:', apiUrl5);
       
    // Знаходимо погодні дані задопомогою api (обираємо тип вище)
    fetch(apiUrl5)
        .then (response => response.json())
        .then (data =>{
            // console.log('Отримані дані з API:', data);

    //=================== Обновлюємо поточну інформацію про погоду в блоці .left-info ===============================>   
         
        //=================== Обновлюємо поточну інформацію про  дата та день тиждня з бази new Date() ==============>
            const forecastDate = new Date(data.list[0].dt_txt);                                             // oтримуємо дату з об'єкту у форматі "yyyy-mm-dd hh:mm:ss"       

            // Обновлюємо інформацію про поточний день тиждня в блоці .left-info .today-info
            const weekday = document.querySelector('.left-info .today-info h2');                            // шлях розміщення в нашому HTML
            const weekdayInfo = forecastDate.toLocaleDateString('ua', { weekday: 'long'});                  // шлях розміщення інформації про сьогоднішній день в базі new Date()
            const capitalizedWeekdayInfo = weekdayInfo.charAt(0).toUpperCase() + weekdayInfo.slice(1);      // оновлюємо інформацію про сьогоднішній день щоб починався з великою букви 
            weekday.textContent =  capitalizedWeekdayInfo;                                                  // оновлюємо інформацію в нашому НTML з JSON 
        
            // Обновлюємо інформацію про поточний дату в форматі "день місяця, повний місяць, рік" в блоці .left-info .today-info
            const date = document.querySelector('.left-info .today-info span');                                                   // шлях розміщення в нашому HTML
            const dateInfo = forecastDate.toLocaleDateString('ua', { day: 'numeric', month: 'long', year: 'numeric'});            // Форматуємо дату для української локалі зі звичайним стилем       
            date.textContent = dateInfo;                                                                                          // обновлюємо рядок span

        //==================== Обновлюємо поточну інформацію про геолокацію з отриманого JSON файлу ================>
            
            // Обновлюємо інформацію ппро геолокацію в блоці .left-info .today-info .location
            const location = document.querySelector('.left-info .today-info .location span');                     // шлях розміщення в нашому HTML
            const locationInfo =`${data.city.name}, ${data.city.country}`                                         // шлях розміщення інформації про локацію в отриманому JSON файлі
            location.textContent = locationInfo;                                                                  // оновлюємо інформацію в нашому НTML з JSON 


        //==================== Обновлюємо інформацію про поточну погоду з отриманого JSON файлу ====================>

            // обновлюємо поточну інформацію  про тип іконки  в блоці .left-info .today-weather svg 
            const todayWeatherIcon = document.querySelector('.left-info .today-weather i');             // шлях розміщення в нашому HTML
            const todayWeatherIconInfo = data.list[0].weather[0].icon;                                  // шлях розміщення інформації про іконку в отриманому JSON файлі
            todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconInfo]}`;               // оновлюємо інформацію в нашому НTML з JSON 

            // обновлюємо поточну інформацію  температури  в блоці .left-info .today-weather h2
            const todayTemp = document.querySelector('.left-info .today-weather h2');                   // шлях розміщення в нашому HTML
            const todayTempInfo = `${Math.round(data.list[0].main.temp)}°C`;                            // шлях розміщення інформації про температуру в отриманому JSON файлі
            todayTemp.textContent = todayTempInfo;                                                      // оновлюємо інформацію в нашому НTML з JSON 

            // обновлюємо поточну інформацію опису погоди  в блоці .left-info .today-weather h3
            const todayDescription = document.querySelector('.left-info .today-weather h3');            // шлях розміщення в нашому HTML
            todayDescription.innerHTML = '';                                                            // очищаємо повністю інформацію з блоку .left-info .today-weather h3
            const todayDescriptionInfo = data.list[0].weather[0].description;                           // шлях розміщення інформації про опис погоди в отриманому JSON файлі
            todayDescription.textContent = todayDescriptionInfo;                                        // оновлюємо інформацію в нашому НTML з JSON 


        
    //=================== Обновлюємо поточну інформацію про погоду в блоці right-info ===============================>   
        
        //=================== Обновлюємо поточну інформацію про  погоду в блоці .right-info .days-list ==============>
        
        const dayList = document.querySelector('.days-list');                                   // шлях розміщення в нашому HTML
        const now = new Date();                                                                 // отримуємо поточну дату

        //створюємо новий обєкт з даних про погоду який містить тільки дані на 09:00 год  
        const nextDaysData = data.list.filter(dayData => {
            
            const forecastData = new Date(Date.parse(dayData.dt_txt.replace(/-/g, '/')));       // шлях розміщення інформації про дату погоди в отриманому JSON файлі
            // console.log(forecastData);
            const forecastHour = forecastData.getHours();
            const currentHour = now.getHours();                                                 // Отримуємо поточну годину                                       // відображення дати у вигляді тільки години
            const hourDifference = Math.abs(forecastHour - currentHour);                        // Порівнюємо годину прогнозу та поточну годину
             
            // return forecastHour  === 9;                                                      // Повертаємо тільки значення які вказанні на 09:00 год
            return hourDifference <= 1 || hourDifference >= 23;                                 // Повертаємо тільки значення обраний день + поточний час
        });
        console.log(nextDaysData);

        let count = 0;
        dayList.innerHTML = '';                                                                  // очищаємо повністю інформацію з блоку .days-list

        // ============== Функція обновлення погоди в блоці .right-info .days-list ================================>
        
        for(const dayData of nextDaysData){
                           
            const dayWeatherIconCode =  dayData.weather[0].icon;                                   // шлях розміщення інформації про іконку в отриманому JSON файлі
            const forecastDate = new Date(Date.parse(dayData.dt_txt.replace(/-/g, '/')));          // в dayData.dt_txt методом replace замінюємо '-' на '/'
            const dayAbbreviation = forecastDate.toLocaleDateString('ua', { weekday: 'short' });   // шлях розміщення інформації про день тиждня в отриманому JSON файлі
            const dayTempInfo = `${Math.round(dayData.main.temp)}°C`;                              // шлях розміщення інформації про температуру в отриманому JSON файлі
      
            // створюємо умову перевірки чи forecastData не дорівнює сьогоднішньому дню
            if( forecastDate.getDate() !== now.getDate()){
                // оновлюємо інформацію в нашому dayList про li
                dayList.innerHTML += `
                                        <li>
                                            <i class='bx bx-${weatherIconMap[dayWeatherIconCode]}'></i>
                                            <span>${dayAbbreviation}</span>
                                            <span class="day-temp">${dayTempInfo}</span>
                                        </li>
                                    `;
                ++count;             // запускаємо лічильник підрахунку кількості створених li в dayList
            };

            if(count === 4) break;   // зупиняємо функцію якщо кількість створених li в dayList дорівнює 4
        }


        //=================== Обновлюємо  інформацію про  погоду в блоці .right-info .day-info ==============>
        //=================== Обновлюємо інформацію про  погоду в блоці .right-info .day-info на сьогоднішній день ==============>
        function todayInfo() {
            const todayContainer = document.querySelector('.day-info');                                          // шлях розміщення в нашому HTML
            const todayPrecipitationInfo = `${data.list[0].pop}%`;                                               // шлях розміщення інформації про опади в отриманому JSON файлі
            const todayHumidityInfo = `${data.list[0].main.humidity}%`;                                          // шлях розміщення інформації про вологість в отриманому JSON файлі
            const mmHg = 0.75006375541921;                                                                       // константа для переводу тиску з hPa в міліметри ртутного стовпчика 
            const todayPressureInfo = `${Math.floor(data.list[0].main.pressure * mmHg)} мм`;                     // шлях розміщення інформації про вологість в отриманому JSON файлі
            const todayWindSpeedInfo = `${data.list[0].wind.speed} км/год`;                                      // шлях розміщення інформації про швидкість вітру в отриманому JSON файлі
    
            // оновлюємо інформацію в нашому НTML з JSON 
            todayContainer.innerHTML = `
                                            <div>
                                                <span class="title">опади</span>
                                                <span class="value">${todayPrecipitationInfo}</span>
                                            </div>
                                            <div>
                                                <span class="title">вологість</span>
                                                <span class="value">${todayHumidityInfo}</span>
                                            </div>
                                            <div>
                                                <span class="title">тиск</span>
                                                <span class="value">${todayPressureInfo}</span>
                                            </div>
                                            <div>
                                                <span class="title">швидкість вітру</span>
                                                <span class="value">${todayWindSpeedInfo}</span>
                                            </div>
                                        `;
        }
        todayInfo();

        //=================== Обновлюємо інформацію при наведенні курсором миші про  погоду в блоці .right-info .day-info на наступні 4 деня ==============>
        dayList.addEventListener('mouseover', function(event) {
            const targetElement = event.target;
            // targetElement.classList.add('actived');
            // console.log(targetElement);
            const tagName = targetElement.tagName;
            // console.log(tagName);
                if (tagName === 'LI' || tagName === 'SPAN' || tagName === 'I') {
                    
                const index = Array.from(document.querySelectorAll('.days-list')).indexOf(targetElement);                 // визначаємо індек елемента в .days-list (-1 означає що даний елемент є дочірним до елементів в блоці .days-list)
                //  умова перевірки index якщо дорівню -1 то знаходить найближчий батьківський елемента <li> і присвоює його значення index
                if(index !== -1) {
                    e = index + 1;                                                                                        // поправка на 1 оскільки в масиві дані під 0 це поточний день.
                } else {
                    const parentLI = targetElement.closest('li'); 
                    const parentIndex  = Array.from(document.querySelectorAll('.days-list li')).indexOf(parentLI);        // присвоєння значенням 'SPAN' і 'I'індексу найближчого батьківського елементу                                    // пошуку найближчого батьківського елемента
                    e = parentIndex + 1;                                                                                  // поправка на 1 оскільки в масиві дані під 0 це поточний день.
                } 

                const nextDaysContainer = document.querySelector('.day-info');                                             // шлях розміщення в нашому HTML
                const nextDaysPrecipitationInfo = `${nextDaysData[e].pop}%`;                                               // шлях розміщення інформації про опади в отриманому JSON файлі
                const nextDaysHumidityInfo = `${nextDaysData[e].main.humidity}%`;                                          // шлях розміщення інформації про вологість в отриманому JSON файлі
                const mmHg = 0.75006375541921;                                                                             // константа для переводу тиску з hPa в міліметри ртутного стовпчика 
                const nextDaysPressureInfo = `${Math.floor(nextDaysData[e].main.pressure * mmHg)} мм`;                     // шлях розміщення інформації про вологість в отриманому JSON файлі
                const nextDaysWindSpeedInfo = `${nextDaysData[e].wind.speed} км/год`;                                      // шлях розміщення інформації про швидкість вітру в отриманому JSON файлі

                // оновлюємо інформацію в нашому НTML з JSON 
                nextDaysContainer.innerHTML = `
                                                <div>
                                                    <span class="title">опади</span>
                                                    <span class="value">${nextDaysPrecipitationInfo}</span>
                                                </div>
                                                <div>
                                                    <span class="title">вологість</span>
                                                    <span class="value">${nextDaysHumidityInfo}</span>
                                                </div>
                                                <div>
                                                    <span class="title">тиск</span>
                                                    <span class="value">${nextDaysPressureInfo}</span>
                                                </div>
                                                <div>
                                                    <span class="title">швидкість вітру</span>
                                                    <span class="value">${nextDaysWindSpeedInfo}</span>
                                                </div>
                                            `;
                console.log(e);
            }
        });

        //=================== Обновлюємо інформацію при відведенні курсором миші про  погоду в блоці .right-info .day-info на сьогоднішній день ==============>
        dayList.addEventListener('mouseout', () => {
            // const targetElement = event.target;
            // targetElement.classList.remove('actived');
            todayInfo();
        });
    })
        .catch(error =>{
            console.error('Помилка отримання даних про погоду:', error);
            alert('Помилка отримання даних про погоду:'  + error + ' (Api Error)');
        });
}


//======================== Функція пошуку прогнозу погоди за локацією ==================================================================================================>
const locInput = document.querySelector('.search-container input');       // шлях розміщення пошуку в нашому HTML

locInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const location = locInput.value.trim();
        if (location) {
            fetchwWeatherData(location);
        }
        locInput.value = "";                                 // очищаємо інформацію після введення локації                      
    };
});