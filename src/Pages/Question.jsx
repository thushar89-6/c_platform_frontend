import Navbar from '../Components/Navbar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Editor from "@monaco-editor/react";
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import MediaQuery from 'react-responsive';
import {ScrollShadow} from "@nextui-org/react";
function Question(props) {
  const [size, setSize] = useState(10);

  //get id of current question page
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  //fetch content of current question
  const [arr, setarr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/question?id=${id}`);
      const data = await response.json();
      console.log(data)
      setarr(data);
    };
    fetchData();
  }, [id]);

  //file upload
  const [result, setResult] = useState();

  const subsolution = (event) => {

    event.preventDefault();
    setSize(50)
    const formData = new FormData();
    const b = new Blob(["#include<stdlib.h>\n#include<unistd.h>\n#define system  <stdlib.h>\n#define exec   <unistd.h>\n"+code], { type: 'text/plain' });    
    formData.append('file', b);
    formData.append('fileName', `${id}.${lang}`);
    formData.append('id',id);
    fetch(`${process.env.REACT_APP_API_URL}/document`, {
    method: 'POST',
    body: formData
    }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    console.log('Upload successful:', data);
    setResult(data)
    props.rating.setRating(parseInt(props.rating.rating)+data.points);
    if (props.z.startsWith("l")) props.setz("")
    else props.setz("lksd")
  }).catch(error => {
    console.error('There was a problem with the file upload:', error);
  });


  
 
};

const skipsolution = (event) => {

  event.preventDefault();
  const formData = new FormData();
  formData.append('id',id);
  formData.append('skip',"true")
  fetch(`${process.env.REACT_APP_API_URL}/document`, {
  method: 'POST',
  body: formData
  }).then(response => response.text()).then(data => 
    {
      console.log('minus',data)
      props.rating.setRating(parseInt(props.rating.rating)-parseInt(data))
      window.location.href="/"
    }
  )
  };
useEffect(()=>{
  if (result && result.accepted===true) confetti()  
},[result]);

const [lang,setlang] = useState("cpp");
const [com,setcom]= useState("#include<bits/stdc++.h>\nusing namespace std;\n\nint main(){\n\t//Write Your code here\n\n\n\treturn 0;\n}")

const [code,setcode]=useState(null);
  return (
    <>
    <div className={`flex flex-col ${props.toggle.dark?"bg-gray-950":""} h-[100vh]`}>
      <Navbar {...props} question={true} setcom={setcom} setlang={setlang} toggledark/>
    
        <MediaQuery query="(max-device-width: 1024px)">
        <PanelGroup direction="vertical">
          <Panel className='mx-8' defaultSize={40}>
          <div className='p-3 overflow-y-auto max-h-[40vh]'>
              <h1 key="1"  className='pt-2 pb-2'>{arr && arr.name}</h1>
              <div>{arr && arr.desc.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="2" className='pt-5 pb-2'>Constraints:</h4>
              <div>{arr && arr.constraints.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 className='pt-5 pb-2'> {"\nSample Testcase:"} </h4>
              <h3 key="3" className='pt-3 pb-0'>{arr && arr.input1 && "Input:"}</h3>
              <div   className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.input1.split("\n").map((ele,idx)=>(<div  className="pl-2 whitespace-pre" key={idx}>{ele}</div>))}</div>
              <h3 key="4" className='pt-0 pb-0'>{arr && arr.output1 && "Output:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.output1.split("\n").map((ele,idx)=>(<div className="pl-2 whitespace-pre"  key={idx}>{ele}</div>))}</div>
              <h3 key="3" className='pt-3 pb-0'>{arr && arr.input2 && "Input:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.input2.split("\n").map((ele,idx)=>(<div  className="pl-2 whitespace-pre" key={idx}>{ele}</div>))}</div>
              <h3 key="5" className='pt-0 pb-0'>{arr && arr.input2 && "Output:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.output2.split("\n").map((ele,idx)=>(<div className="pl-2 whitespace-pre"  key={idx}>{ele}</div>))}</div>
              <h3 key="3" className='pt-3 pb-0'>{arr && arr.input3 && "Input:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.input3.split("\n").map((ele,idx)=>(<div  className="pl-2 whitespace-pre" key={idx}>{ele}</div>))}</div>
              <h3 key="6" className='pt-0 pb-0'>{arr && arr.input3 && "Output:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.output3.split("\n").map((ele,idx)=>(<div className="pl-2 whitespace-pre"  key={idx}>{ele}</div>))}</div>
            </div>
          </Panel>
          <PanelResizeHandle className={`h-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
        
              <Panel defaultSize={40}>
                  <Editor language="cpp" theme={props.toggle.dark?'vs-dark':'light'} 
                  value={com}
                   onChange={(v,e)=>setcode(v)}
                   options={{minimap: { enabled: false }}}
                   ></Editor>
                 
              </Panel>
              <PanelResizeHandle className={`h-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
              <Panel defaultSize={12}>
              {result && result.warnings !== "" && (
    <ScrollShadow className='pl-5'>
      <div className="text-red-600">Warnings:</div>
      {result.warnings.split("\n").map((ele) => (
        <div>{ele}</div>
      ))}
    </ScrollShadow>
  )}
  
  <div className='absolute right-28 ml-auto' >
      <Button className={`my-3 ${props.toggle.dark? "bg-red-950" : "bg-red-200"}`} size="sm" onClick={skipsolution}>
        Skip
      </Button>
    </div>
  <form className="absolute right-10" onSubmit={subsolution} encType='multipart/form-data' style={{ marginLeft: 'auto' }}>
    
    <div>
      <Button className="my-3" size="sm" onClick={subsolution}>
        Submit
      </Button>
    </div>
  </form>
  {result && result.warnings === "" && result.total === result.passed && (
    <ScrollShadow className='pl-5'>
      <div className="text-green-600">Accepted</div>
      {`Passed ${result.passed}/${result.total} testcases.`}
    </ScrollShadow>
  )}
  {result && result.warnings === "" && result.total !== result.passed && (
    <ScrollShadow className='pl-5'>
      <div className="text-grey-600">All testcases are not passed</div>
      {`Passed ${result.passed}/${result.total} testcases.`}
    </ScrollShadow>
  )}
              </Panel>
      
        </PanelGroup>
        
        </MediaQuery>


        <MediaQuery query="(min-device-width: 1025px)" className='h-screen'>
        {/* <div className="flex-grow"> */}

        <PanelGroup direction="horizontal">

          <Panel className='mx-8' minSize={40}>
            <div className='p-3 overflow-y-auto max-h-[92vh]'>
              <h1 key="1"  className='pt-2 pb-2'>{arr && arr.name}</h1>
              <div>{arr && arr.desc.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="2" className='pt-5 pb-2'>Constraints:</h4>
              <div>{arr && arr.constraints.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 className='pt-5 pb-2'> {"\nSample Testcase:"} </h4>
              <h3 key="3" className='pt-3 pb-0'>{arr && arr.input1 && "Input:"}</h3>
              <div   className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.input1.split("\n").map((ele,idx)=>(<div  className="pl-2 whitespace-pre" key={idx}>{ele}</div>))}</div>
              <h3 key="4" className='pt-0 pb-0'>{arr && arr.output1 && "Output:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.output1.split("\n").map((ele,idx)=>(<div className="pl-2 whitespace-pre"  key={idx}>{ele}</div>))}</div>
              <h3 key="3" className='pt-3 pb-0'>{arr && arr.input2 && "Input:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.input2.split("\n").map((ele,idx)=>(<div  className="pl-2 whitespace-pre" key={idx}>{ele}</div>))}</div>
              <h3 key="5" className='pt-0 pb-0'>{arr && arr.input2 && "Output:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.output2.split("\n").map((ele,idx)=>(<div className="pl-2 whitespace-pre"  key={idx}>{ele}</div>))}</div>
              <h3 key="3" className='pt-3 pb-0'>{arr && arr.input3 && "Input:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.input3.split("\n").map((ele,idx)=>(<div  className="pl-2 whitespace-pre" key={idx}>{ele}</div>))}</div>
              <h3 key="6" className='pt-0 pb-0'>{arr && arr.input3 && "Output:"}</h3>
              <div  className={`border-l-3 ${props.toggle.dark? "bg-gray-800" : "bg-gray-200 border-gray-400"}`}>{arr && arr.output3.split("\n").map((ele,idx)=>(<div className="pl-2 whitespace-pre"  key={idx}>{ele}</div>))}</div>
            </div>
          </Panel>

          <PanelResizeHandle className={`w-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>

          <Panel minSize={20}>
            <PanelGroup direction="vertical"  >
              <Panel minSize={20} className='flex-col'>
                  <Editor language="cpp" theme={props.toggle.dark?'vs-dark':'light'} 
                  value={com}
                   onChange={(v,e)=>{setcode(v); setSize(10); setResult(null)}}
                   options={{minimap: { enabled: false }}}
                   ></Editor>
                 
              </Panel>
              <PanelResizeHandle className={`h-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
              <Panel minSize={size} maxSize={size} className='flex'>
  {result && result.warnings !== "" && (
    <ScrollShadow className='pl-5'>
      <div className="text-red-600">Warnings:</div>
      {result.warnings.split("\n").map((ele) => (
        <div>{ele}</div>
      ))}
    </ScrollShadow>
  )}
  
  <div className='absolute right-28 ml-auto' >
      <Button className={`my-3 ${props.toggle.dark? "bg-red-950" : "bg-red-200"}`} size="sm" onClick={skipsolution}>
        Skip
      </Button>
    </div>
  <form className="absolute right-10" onSubmit={subsolution} encType='multipart/form-data' style={{ marginLeft: 'auto' }}>
    
    <div>
      <Button className="my-3" size="sm" onClick={subsolution}>
        Submit
      </Button>
    </div>
  </form>
  {result && result.warnings === "" && result.total === result.passed && (
    <ScrollShadow className='pl-5'>
      <div className="text-green-600">Accepted</div>
      {`Passed ${result.passed}/${result.total} testcases.`}
    </ScrollShadow>
  )}
  {result && result.warnings === "" && result.total !== result.passed && (
    <ScrollShadow className='pl-5'>
      <div className="text-grey-600">All testcases are not passed</div>
      {`Passed ${result.passed}/${result.total} testcases.`}
    </ScrollShadow>
  )}
</Panel>

            </PanelGroup>
          </Panel>
        </PanelGroup>
        {/* </div> */}

        </MediaQuery>

      
      </div>
    </>
  )
}

export default Question