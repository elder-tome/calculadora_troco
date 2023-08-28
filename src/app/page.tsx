'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const currencyArray = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05]
  const [fullCurrencyArray, setFullCurrencyArray] = useState<number[]>([])
  const [productValue, setProductValue] = useState('')
  const [moneyPaid, setMoneyPaid] = useState('')
  const [nonRepeatingCurrencyArray, setNonRepeatingCurrencyArray] = useState<
    number[]
  >([])

  function handleClick(productValue: number, moneyPaid: number) {
    const auxiliaryArray: number[] = []
    setNonRepeatingCurrencyArray([])
    setFullCurrencyArray([])
    let value = moneyPaid - productValue
    if (value >= 0) {
      alert('Compra realizada com sucesso.')
      currencyArray.forEach((currency) => {
        while (value >= currency) {
          auxiliaryArray.push(currency)
          setFullCurrencyArray((state) => [...state, currency])
          value = value - currency
        }
      })

      setNonRepeatingCurrencyArray(
        auxiliaryArray.filter((number, index, array) => {
          return array.indexOf(number) === index
        }),
      )
    } else if (value < 0) {
      alert('Valor insuficiente para compra.')
    }
  }

  function handleRepeatedCurrents(value: number) {
    const quantityFound = fullCurrencyArray.filter(
      (item) => item === value,
    ).length
    return quantityFound
  }

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6">
        <main className="flex flex-col gap-6 bg-zinc-800 p-6 rounded-xl">
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="inputText">Valor do produto</label>
              <input
                className="py-3 px-3 rounded bg-zinc-100 text-zinc-800"
                type="text"
                id="inputText"
                placeholder="R$"
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="inputText">Dinheiro pago</label>
              <input
                className="py-3 px-3 rounded bg-zinc-100 text-zinc-800"
                type="text"
                id="inputText"
                placeholder="R$"
                value={moneyPaid}
                onChange={(e) => setMoneyPaid(e.target.value)}
              />
            </div>
          </div>
          <button
            className="p-4 bg-green-700 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => handleClick(Number(productValue), Number(moneyPaid))}
          >
            Finalizar
          </button>
        </main>
        <div className="flex flex-col gap-6 justify-center items-center bg-zinc-800 p-6 rounded-xl">
          <Image
            width={402}
            height={387}
            src="/assets/illustration.svg"
            alt="Ilustração"
            priority
          />
        </div>
      </div>
      <div className="w-[28rem] flex flex-col gap-6">
        <div className="h-[30.7rem] bg-zinc-800 py-6 pl-6 pr-2 rounded-xl">
          <div className="h-full flex flex-col gap-6 overflow-y-scroll pr-3 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800 scrollbar-thumb-rounded-full">
            {nonRepeatingCurrencyArray.map(
              (currency, index) =>
                currency > 1 && (
                  <div className="relative" key={index}>
                    <Image
                      width={402}
                      height={387}
                      src={`/assets/${currency}.png`}
                      alt="Cedulas"
                    />
                    {handleRepeatedCurrents(currency) > 1 && (
                      <div
                        className="absolute bottom-2 right-2 h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-green-700 rounded-full border border-zinc-50"
                        key={index}
                      >
                        <span>{handleRepeatedCurrents(currency)}</span>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="h-[8.49rem] bg-zinc-800 px-6 pt-6 pb-3 rounded-xl">
          <div className="flex gap-6 overflow-x-scroll pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800 scrollbar-thumb-rounded-full">
            {nonRepeatingCurrencyArray.map(
              (currency, index) =>
                currency < 2 && (
                  <div className="relative" key={index}>
                    <Image
                      width={74}
                      height={74}
                      src={`/assets/${currency}.png`}
                      alt="Moedas"
                    />
                    {handleRepeatedCurrents(currency) > 1 && (
                      <div
                        className="absolute bottom-2 right-2 h-[1.875rem] w-[1.875rem] flex justify-center items-center bg-green-700 rounded-full border border-zinc-50"
                        key={index}
                      >
                        <span>{handleRepeatedCurrents(currency)}</span>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
