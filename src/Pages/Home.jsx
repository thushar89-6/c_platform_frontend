import Navbar from '../Components/Navbar';
import { useEffect, useState} from 'react';
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import {ListboxWrapper} from "../Components/ListboxWrapper";
import {Divider} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import React from 'react';
import Cookies from 'js-cookie';

function Home(props) {
    const [arr,setarr] = useState(null);
    const [rec,setrecc] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL);
        const data = await response.json();
        setarr(data);
        const formData = new FormData();
        formData.append("rating",props.rating.rating)
        fetch(`${process.env.REACT_APP_API_URL}/recommend`, {
        method: 'POST',
        body: formData
        }).then(response => response.json()).then(data => setrecc(data))
      };
      fetchData();
    }, []);
  
  
  
    return (
      <>
     <div className={`${props.toggle.dark?"bg-gray-950":""}`}>

        <Navbar {...props}></Navbar>

        <div className='flex justify-center'>
          <ListboxWrapper>
            <Listbox>
              <ListboxItem className="text-primary">Recommended Questions: 
              <Divider className='mt-1'/>
              <Divider className='mt-1'/></ListboxItem>
            </Listbox>
            <Listbox>
              {rec  && rec.list.map((ele,index)=>(
                  <ListboxItem className="">
                    <Link to={`/question?id=${ele.id}`}> 
                    {ele.name}
                    </Link>
                  <Divider className='mt-2'/>
                  </ListboxItem>
              ))}          
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className='flex justify-center'>
          <ListboxWrapper>
          <Listbox>
              <ListboxItem className="text-primary">All Questions: 
              <Divider className='mt-1'/>
              <Divider className='mt-1'/></ListboxItem>
            </Listbox>
            <Listbox>
              {arr && arr.map((ele,index)=>(
                  <ListboxItem className="">
                    <Link to={`/question?id=${ele.id}`}> 
                    {ele.name}
                    </Link>
                  <Divider className='mt-2'/>
                  </ListboxItem>
              ))}          
            </Listbox>
          </ListboxWrapper>
        </div>
      </div>
      </>
  )
  }

export default Home