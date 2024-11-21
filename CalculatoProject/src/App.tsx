import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../src/components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function Calculator() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState(null);

  const handleNumberClick = (num: number) => {
    if (sequence.length < 3) {
      setSequence([...sequence, num.toString()]); // Konversi ke string untuk konsistensi
    }
  };
  
  const handleSymbolClick = (symbol: string) => {
    if (sequence.length < 3) {
      setSequence([...sequence, symbol]);
    }
  };

  const handleCalculate = () => {
    if (sequence.length === 3) {
      
        const [num1, symbol, num2] = sequence;
        let result;
        switch (symbol) {
          case '+': result = parseFloat(num1) + parseFloat(num2); break;
          case '-': result = parseFloat(num1) - parseFloat(num2); break;
          case '*': result = parseFloat(num1) * parseFloat(num2); break;
          case '/': 
            if (num2 === '0') throw new Error('Division by zero');
            result = parseFloat(num1) / parseFloat(num2); 
            break;
          default: throw new Error('Invalid operation');
        }
        setHistory([...history, `${num1} ${symbol} ${num2} = ${result}`]);
        setSequence([result.toString()]);
        setError(null);
    }
  };

  const handleClear = () => {
    setSequence([]);
    setError(null);
  };

  const handleDelete = () => {
    setSequence(sequence.slice(0, -1));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Simple Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input 
            value={sequence.join(' ')} 
            readOnly 
            className="w-full text-right text-xl"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[7,8,9,'/'].map(item => (
            <Button 
              key={item} 
              onClick={() => typeof item === 'number' ? handleNumberClick(item) : handleSymbolClick(item)}
              variant="outline"
            >
              {item}
            </Button>
          ))}
          {[4,5,6,'*'].map(item => (
            <Button 
              key={item} 
              onClick={() => typeof item === 'number' ? handleNumberClick(item) : handleSymbolClick(item)}
              variant="outline"
            >
              {item}
            </Button>
          ))}
          {[1,2,3,'-'].map(item => (
            <Button 
              key={item} 
              onClick={() => typeof item === 'number' ? handleNumberClick(item) : handleSymbolClick(item)}
              variant="outline"
            >
              {item}
            </Button>
          ))}
          {[0,'.','+'].map(item => (
            <Button 
              key={item} 
              onClick={() => typeof item === 'number' ? handleNumberClick(item) : handleSymbolClick(item)}
              variant="outline"
            >
              {item}
            </Button>
          ))}
          <Button onClick={handleCalculate} variant="default">=</Button>
          <Button onClick={handleDelete} variant="secondary">Del</Button>
          <Button onClick={handleClear} variant="destructive">C</Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">History</h3>
          <div className="overflow-y-auto max-h-40">
            {history.map((calc, index) => (
              <div key={index} className="text-sm py-1 border-b">{calc}</div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [randomTicket, setRandomTicket] = useState<number | null>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email) {
      setRandomTicket(Math.floor(Math.random() * 100000));
      setIsSubmitted(true);
    } else {
      alert('Please fill in required fields');
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Ticket Submitted</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your ticket number is: {randomTicket}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Support Page</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Name (Required)</label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={name ? 'border-green-500' : ''}
              />
            </div>
            <div>
              <label className="block mb-2">Email (Required)</label>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={email ? 'border-green-500' : ''}
              />
            </div>
            <div>
              <label className="block mb-2">Description (Optional)</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <Button 
              type="submit" 
              disabled={!name || !email}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function App() {
  const [view, setView] = useState('calculator');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex space-x-4 mb-4">
        <Button 
          variant={view === 'calculator' ? 'default' : 'outline'}
          onClick={() => setView('calculator')}
        >
          Calculator
        </Button>
        <Button 
          variant={view === 'support' ? 'default' : 'outline'}
          onClick={() => setView('support')}
        >
          Support
        </Button>
      </div>
      {view === 'calculator' ? <Calculator /> : <SupportPage />}
    </div>
  );
}

export default App;