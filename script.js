const dailyBtn = document.getElementById('dailyBtn');
const weeklyBtn = document.getElementById('weeklyBtn');
const monthlyBtn = document.getElementById('monthlyBtn');

fetch('data.json') 
  .then(response => response.json())
  .then(data => {
    // Store the fetched data in a variable
    const timeTrackingData = data;

    // Function to display data in the table
    function displayData(timeframe) {

      timeTrackingData.forEach(activity => {
        const myString = activity.title.replace(/\s+/g, '-').toLowerCase();
        const currentDiv = document.getElementById(myString);
        currentDiv.innerHTML = '';

        const headCell = document.createElement('h1');
        const paragraphCell = document.createElement('p');

        headCell.textContent = `${activity.timeframes[timeframe].current}hrs`;

        let myStr = ""
        switch(timeframe) {
            case "daily": 
                myStr = 'Yesterday';
                break;
            case 'weekly': 
                myStr = 'Last Week';
                break;
            default: 
                myStr = 'Last Month';
        }
        paragraphCell.textContent = `${myStr} - ${activity.timeframes[timeframe].previous}hrs`;

        currentDiv.appendChild(headCell);
        currentDiv.appendChild(paragraphCell);

      });
    }

    // Initial display (e.g., Daily)
    displayData('weekly');

    // Add event listeners to buttons
    dailyBtn.addEventListener('click', () => displayData('daily'));
    weeklyBtn.addEventListener('click', () => displayData('weekly'));
    monthlyBtn.addEventListener('click', () => displayData('monthly'));

    dailyBtn.addEventListener('click', () => { 
        dailyBtn.classList.add('selected'), 
        weeklyBtn.classList.remove('selected'),
        monthlyBtn.classList.remove('selected')
    });

    weeklyBtn.addEventListener('click', () => { 
        dailyBtn.classList.remove('selected'), 
        weeklyBtn.classList.add('selected'),
        monthlyBtn.classList.remove('selected')
    });

    monthlyBtn.addEventListener('click', () => { 
        dailyBtn.classList.remove('selected'), 
        weeklyBtn.classList.remove('selected'),
        monthlyBtn.classList.add('selected')
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Handle the error, e.g., display an error message to the user
  });