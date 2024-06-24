document.getElementById('getJoke').addEventListener('click', function() {
    const jokeElement = document.getElementById('joke');
  
   
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  
   
    fetch('https://hindi-jokes-api.onrender.com/jokes?api_key=287cde10f0000e55ad6b3e6faa09', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const joke = data.jokeContent; 
      
      if (!joke) {
        throw new Error('Joke not found in the API response.');
      }
     
       jokeElement.innerText = joke
      
      
      const utterance = new SpeechSynthesisUtterance(joke);
      utterance.lang = 'hi-IN'; 
  
     
      utterance.onend = function() {
        
        const audio = new Audio('laugh.mp3');
        audio.play();
      };
  
      speechSynthesis.speak(utterance);
    })
    .catch(error => {
      jokeElement.innerText = 'failed to load joke';
      console.error('Error fetching joke:', error);
    });
  });
  
 
  