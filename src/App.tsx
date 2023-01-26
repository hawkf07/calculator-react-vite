import { evaluate } from "mathjs";
import {
  ChangeEvent,
  EventHandler,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { Button } from "./components/Button";
type buttonVal = {
  value: string;
  prevValue: string;
  operand: string;
};
type history = {
  calculation: string,
  result: string
}
function App() {
  const [buttonVal, setButtonVal] = useState("");
  const isNumber = (n: number) => typeof n == 'number'
  const handleNumberClick = (e: MouseEvent<HTMLInputElement>) => {
    try {
      setButtonVal((prevState) => prevState + e.target.value);
    }
    catch (e) {
      console.log("error")
    }
  };
  const ALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."]
  const ALL_OPERAND = ["+", "-", "*", "/", "(", ")", "C", "AC", "X", "="] as const


  const [calculationHistory, setCalculationHistory] = useState<history[]>([]);
  const [result, setResult] = useState("")

  useEffect(() => {
    setButtonVal(result)
  }, [result, setButtonVal])
  const calculationHistoryHandler = () => {
    setTimeout(() => {
      setCalculationHistory((prevHistory) => {
        return [...prevHistory, { operation: buttonVal, result }]
      })
    }, 1000);

  }

  return (
    <div className="container max-w-lg mx-auto min-h-screen flex flex-col gap-7 bg-gray-700 rounded p-5 mt-2">
      <header className="text-2xl text-center uppercase">
        <h1>Calculator</h1>
      </header>
      <div className="grid ">
        <section onChange={() => console.log("some value changed !!1")} className="col-span-full flex bg-gray-600 p-3 rounded ">
          <header className="rounded-md">
            <button value={result} type="button" onChange={() => {
              console.log("hello from value")
            }} className="bg-transparent text-gray-400 focus:outline-none rounded text-1xl " />
            <h1 className="min-h-[3rem] text-2xl">{buttonVal}</h1>
          </header>
        </section>


        <form onSubmit={(e) => {
          e.preventDefault()
          calculationHistoryHandler()
        }} className="grid grid-cols-3 ">

          {ALL_NUMBERS.map((n) => {
            return (
              <input
                type={"button"}
                onClick={(e) => handleNumberClick(e)}
                className="p-3 border border-gray-700 bg-gray-600 cursor-pointer"
                value={n}
              />
            )
          })}
          {ALL_OPERAND.map((operand) => {

            switch (operand) {
              case "AC":
                return (
                  <button type="button" className="bg-gray-600 border-gray-700 border p-3" value="AC" onClick={(e) => {
                    setButtonVal("")
                    setResult("")
                  }} />
                )
              case "C":
                return (
                  <button type="button" className="bg-gray-600 border-gray-700 border p-3" value="C" onClick={(e) => {
                    setButtonVal("")
                  }} />
                )

              case "=":
                return (
                  <button type="submit" value={operand} className="p-3 row-span-2 bg-gray-600 border-gray-700 border border-gray-700" onClick={() => {
                    setResult(evaluate(buttonVal))
                  }} />
                )
              case "X":
                return (
                  <input type="button" value={operand} className="p-3 bg-gray-600 border-gray-700 border border-gray-700" onClick={() => setButtonVal(buttonVal.slice(0, -1))} />
                )

              default:
                return <input type="button" className="border border-gray-700 bg-gray-600 p-3 pointer" value={operand} onClick={(e) => handleNumberClick(e)} />
            }


          })}
        </form >
      </div>
    </div>
  );
}

export default App;
