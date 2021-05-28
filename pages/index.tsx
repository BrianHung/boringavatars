import Head from "next/head";
import { useState } from "react";

export default function Index() {

  const [state, setState] = useState({
    size: 40,
    name: "Maria Mitchell",
    variant: "marble",
    colors: ["#A3A948", "#EDB92E", "#F85931", "#CE1836", "#009989"]
  })

  const apiRoute = `/api?variant=${state.variant}&colors=${state.colors.map(hex => hex.slice(1)).join()}&size=${state.size}&name=${encodeURI(state.name)}`;

  return (
    <>
      <Head>
        <title>boringavatars</title>
      </Head>
      <div className="space-y-12 flex flex-col items-center p-4 max-w-xl mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold pt-8">boringavatars</h1>
          <p>dynamically create an svg from <a className="underline" href="https://boringavatars.com/">boring avatars</a></p>
        </div>
        <form className="space-y-2 w-full max-w-prose">
          <div className="flex flex-row items-center">
            <label>variant</label>
            <select className="ml-auto" value={state.variant} onChange={e => setState(prev => ({...prev, variant: e.target.value}))}>
              <option>marble</option>
              <option>beam</option>
              <option>pixel</option>
              <option>sunset</option>
              <option>bauhaus</option>
              <option>ring</option>
            </select>
          </div>
          <div className="flex flex-row items-center">
            <label>colors</label>
            <span className="ml-auto space-x-1">
              <input className="w-8 h-8 rounded-full" id="color0" type="color" value={state.colors[0]} onChange={e => setState(prev => ({...prev, colors: [...state.colors.slice(0, 0), e.target.value, ...state.colors.slice(0 + 1)]}))}/>
              <input className="w-8 h-8 rounded-full" id="color1" type="color" value={state.colors[1]} onChange={e => setState(prev => ({...prev, colors: [...state.colors.slice(0, 1), e.target.value, ...state.colors.slice(1 + 1)]}))}/>
              <input className="w-8 h-8 rounded-full" id="color2" type="color" value={state.colors[2]} onChange={e => setState(prev => ({...prev, colors: [...state.colors.slice(0, 2), e.target.value, ...state.colors.slice(2 + 1)]}))}/>
              <input className="w-8 h-8 rounded-full" id="color3" type="color" value={state.colors[3]} onChange={e => setState(prev => ({...prev, colors: [...state.colors.slice(0, 3), e.target.value, ...state.colors.slice(3 + 1)]}))}/>
              <input className="w-8 h-8 rounded-full" id="color4" type="color" value={state.colors[4]} onChange={e => setState(prev => ({...prev, colors: [...state.colors.slice(0, 4), e.target.value, ...state.colors.slice(4 + 1)]}))}/>
            </span>
          </div>
          <div className="flex flex-row items-center">
            <label>size</label>
            <input className="ml-auto" type="range" value={state.size} min="40" max="200" onChange={e => setState(prev => ({ ...prev, size: Number(e.target.value)}))}/>
          </div>
          <div className="flex flex-row items-center">
            <label>name</label>
            <input className="ml-auto text-right" type="text" value={state.name} onChange={e => setState(prev => ({ ...prev, name: e.target.value}))}/>
          </div>
        </form>
        <div className="flex flex-col items-center space-y-4 max-w-full">
          <a className="font-mono text-blue-500 text-sm break-all" href={apiRoute}>{apiRoute}</a>
          <img src={apiRoute}/>
        </div>
      </div>
    </>
  )
}