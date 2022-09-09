import React from 'react'
import '../css_styles/style.css'
import GetResponse from './GetResponse'
import GreenArrow from '../images/greenArrow.png'
import Axios from 'axios'



// const portVal ="3001"

function MakeRequest(){

    

    const validator= "http://localhost:3001/"

    const [useIT,setUseIT] = React.useState(false)
    const [target1,setTarget1] =React.useState("")
    const [url,setUrl] = React.useState("")
    const [data, setData] = React.useState()
    const [route,setRoute] = React.useState("")
    const [typeReq,setTypeReq] = React.useState(
      {
        selectValue : "GET",
        setIt : false
      }
    )
    const [bodyM , setBodyM] = React.useState(
      {
        text : "",
        present :false
      }
    )
    const [buttonMark,setButtonMark] = React.useState(false)
    const ref = React.useRef()
  
    const handleChange = event =>{
        const value =event.target.value
        setUrl(event.target.value)
    }
  
    const handleSelect = event =>{
      setTypeReq({
        selectValue : event.target.value,
        setIt : false
      })
    }

    function handleBody(event){
      setBodyM({
        text : event.target.value,
        present:false
      }
      )
    }
  
  
    const HandleSend=()=>{
      
      const urlAction = url
      setTarget1(target2)
      setRoute(urlAction)
      setTypeReq({
        ...typeReq,
        setIt : true
      })
      setBodyM({
        ...bodyM,
        present:true
      })
      
      console.log(typeReq.setIt)
    }

    function handleBodyButton(){
      if(buttonMark){
        setButtonMark(false)
      }
      else{
        setButtonMark(true)
      }
    }
    

    //to make the API call , set the data to be show on UI and call setTime to work as Background scheduler
    function callFetch(){
      console.log(typeReq.selectValue,typeReq.setIt,route)
      if(route!=="" && typeReq.setIt === true){
        console.log(route , bodyM)
        if(typeReq.selectValue=="POST" || typeReq.selectValue=="PUT")
        {
          if(bodyM.present)
          {
            Axios({
              method: typeReq.selectValue,
              url : route,
              headers :{
                "Content-Type":"application/json",
                "requesterId":"abrasion_medicare"
              },
              data:{
                body: bodyM.text
              }
            }
            ).then((res) => {setData(JSON.stringify(res.data))})
            .catch((err) => setData("Error 404 : Data Not Found!"));
  
            Axios({method : typeReq.selectValue,url:route,
              headers :{
                "Content-Type":"application/json"
              },
              data:{
                body: JSON.stringify(bodyM.text)
              } ,
              responseType: 'blob'
            }).then((response) => {

              const href = URL.createObjectURL(response.data);

              // create "a" HTLM element with href to file & click
              const link = document.createElement('a');
              link.href = href;
              link.setAttribute('download', 'data.txt'); //or any other extension
              document.body.appendChild(link);
              link.click();

              // clean up "a" element & remove ObjectURL
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            })

          }
        }
        else if(typeReq.selectValue=="GET" || typeReq.selectValue=="DELETE")
        {

          Axios({
            method: typeReq.selectValue,
            url : route,
            headers :{
              "Content-Type":"application/json"
            }
          }
          ).then((res) => { setData(JSON.stringify(res.data))})
          .catch((err) => setData("Error 404 : Data Not Found!"));

          fetch(route,{method : typeReq.selectValue })
            .then((response) => {response.blob().then(blob => {
              let urlm = window.URL.createObjectURL(blob);
              let a = document.createElement('a');
              a.href = urlm;
              a.download = 'data.txt';
              a.click()})})
            .catch((err) => setData("Error 404 : Data Not Found!"));
            
          

        }
        // setTimeout(() => {
        //   ref.current.click();
        // }, 5000);
      }
      else(
        console.log("route not entered")
      )
    }
    
    React.useEffect(() => {
      callFetch()
    }, [route,typeReq.selectValue,typeReq.setIt,bodyM]);


    return (
        <div>
        <div className ="request">
            <h3>Request</h3>
            
            <div className ="headings">
                <table>
                  <tbody>
                  <tr id = "head">
                      <th id ="thone">Method</th>
                      <th id="thsecond">URL</th>
                      <th id="ththird"> Action</th>
                  </tr>
                  <tr>
                      <td id="tdone">
                      <select name="type" id="requests" value={typeReq.selectValue} onChange ={handleSelect}>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                      </select>
                      </td>
                      <td id="tdtwo"><input id="url" type="text" name="url" onChange={handleChange} value={url}/></td>
                      <td id="tdthird"><button ref={ref} id="send" onClick={HandleSend}>Send</button></td>
                  </tr>
                  </tbody>
                </table>
                
                
            </div>
            <hr />

            <div className="radioButton">
            <input onClick={handleBodyButton} type="checkbox" id="html" name="fav_language" value="HTML"/>
            <label for="html">Body</label><br />
            </div>

            { buttonMark && <div className="bodyField">
                  
                  <textarea placeholder="Send data to server" onChange={handleBody} value={bodyM.text}></textarea>

            </div>}
           
      </div>
      <GetResponse show={data}/>
      </div>
    )
}

export default MakeRequest




