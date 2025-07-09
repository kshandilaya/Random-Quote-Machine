const { useState, useEffect } = React;

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const getQuote = () => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const randomQuote = data.quotes[randomIndex];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="container">
      <div id="quote-box">
        <div id="text">{quote}</div>
        <div id="author">- {author}</div>
        <div id="block">
          <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank">
            <img src="https://img.icons8.com/?size=100&id=13963&format=png&color=000000" alt="twitter" />
          </a>
          <button id="new-quote" onClick={getQuote}>New Quote</button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
