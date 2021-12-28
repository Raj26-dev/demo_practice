import React, { useState, useEffect } from "react";
// import "./App.scss";
import "./Chat.css"
import ReactTooltip from "react-tooltip";

import axios from "axios";
import Questionhandler from "./Functions";
import avatar from "./images/avatar.png";
import avatarorange from "./images/avatar-white.png";
import avatarwhite from "./images/avatar-white.png";
import chat from "./images/chat.png";
import chatbotorange from "./images/chatbot-orange.png";
import chatbotwhite from "./images/chatbot-white.png";
import chatbot from "./images/chatbot-white.png";
import chaticon from "./images/chaticon.png";
import close from "./images/close.png";
import email from "./images/email.png";
import fav from "./images/favicon.png";
import paper_plane from "./images/paper-plane.png";
import send from "./images/send.png";
import tick from "./images/tick.png";
import voice from "./images/voice.png";
import chatIcon from './images/chaticon.png';


function Chat() {
  var selected = [];
  const initialformstate = {
    userresponse: [],
  };

  const [questions, setquestions] = useState([]);
  const [text, settext] = useState("");
  const [storedquestions, setstoredquestions] = useState({});

  const [currentquestion, setcurrentquestion] = useState({});
  const [counter, setcounter] = useState(0);
  const [form, setform] = useState(initialformstate);
  const [fetched, setfetched] = useState(false);
  const [islastitem, setislastitem] = useState(false);
  const [image, setimage] = useState("");
  const [error, setError] = useState(); //* for validation msg 
  const [Errorimage, setErrorimage] = useState(""); //* for file error msg handling
 const[showimg, setShowimg]=useState(null);
// new code for api call one time (start)
const handleFetch = async () => {
  const res = await axios.get(
    "https://tbsdemos.com/bot_uat/api/Login/question"
  );
  console.log(res.data);
  window.localStorage.setItem("campaign_id", res.data.campaign_id);
  window.localStorage.setItem("user_id", res.data.user_id);
  window.localStorage.setItem("questions", JSON.stringify(res.data.data));
  window.localStorage.setItem("lastleftquestion", 0);

  setquestions(res.data.data);
  setcurrentquestion(res.data.data[0]);
  setfetched(true);
};

const localfetch = async () => {
  let response = await JSON.parse(localStorage.getItem("questions"));

  setquestions(response);
  console.log(JSON.parse(localStorage.getItem("questions")));

  // let l = parseInt(localStorage.getItem("lastleftquestion"));
  setcounter(parseInt(localStorage.getItem("lastleftquestion")));
  setcurrentquestion(
    response[parseInt(localStorage.getItem("lastleftquestion"))]
  );
  setfetched(true);
};

useEffect(() => {
  if (window.localStorage.getItem("chatbotdata")) {
    console.log(JSON.parse(window.localStorage.getItem("chatbotdata")));
    setform(JSON.parse(window.localStorage.getItem("chatbotdata")));
    setstoredquestions(
      JSON.parse(window.localStorage.getItem("chatbotdata")).userresponse
    );
  }
  if (window.localStorage.getItem("questions") !== null) {
    localfetch();
  } else {
    handleFetch();
  }
}, []);
//? new code for api call one time (end)


  
  useEffect((event) => {
    if (window.localStorage.getItem("lastleftquestion") !== "full") {
      setcurrentquestion(questions[counter]);
    }
    console.log(showimg)
    console.log(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);



  //* handle submit for manage post Api start
  const handleSubmit = async (obj1, answers) => {
  console.log(obj1);
  let x = document.getElementById("chatMiddlee");
  // console.log(x.scrollHeight - x.clientHeight);
  // console.log(obj1, answers);
    const response = {
      question: obj1.question,
      type_of_control : obj1.type_of_control,
      answers: answers,
    };
    let uservalues = [...form.userresponse, { item: obj1, response: response }];

    setform({ ...form, userresponse: uservalues });
    // console.log({ ...form, userresponse: uservalues });
    window.localStorage.setItem(
      "chatbotdata",
      JSON.stringify({ ...form, userresponse: uservalues })
    );


    setstoredquestions({ ...form, userresponse: uservalues }.userresponse);
    if (counter >= questions.length - 1) {
      window.localStorage.setItem("lastleftquestion", "full");
      axios
        .post("https://tbsdemos.com/bot_uat/api/Login/test", {
          // flag:window.localStorage.setItem("flag","submit"),
          // flag:window.localStorage.getItem("flag"),
          user_id: window.localStorage.getItem("user_id"),
          campaign_id: window.localStorage.getItem("campaign_id"),

          json: JSON.parse(window.localStorage.getItem("chatbotdata"))
            .userresponse,
        })
        .then((res) => {
          setislastitem(true);
          // window.localStorage.removeItem("flag");
          window.localStorage.removeItem("questions");
          window.localStorage.removeItem("chatbotdata");
          window.localStorage.removeItem("campaign_id");
          window.localStorage.removeItem("user_id");
          window.localStorage.removeItem("lastleftquestion");
          // window.location.reload()
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
          
        });
      setcounter("full");
      alert("thanks");
    } else {
      x.scrollTop = x.scrollHeight - x.clientHeight;

      window.localStorage.setItem("lastleftquestion", counter + 1);
      setcounter((counter) => counter + 1);
    }
  };
  //* handle submit end

  // * Error handler for showing validation msg in tooltip (start)
  const Errorhandler = (message) => {
    setError(message);
  };
  // * Error handler for showing validation msg in tooltip (end)

  // * send button onClick handler start
  function handlebutton() {
    //! e.preventDefault();

    // TODO: this code for validation start
    switch (currentquestion.type_of_control) {
      case "Text":
          if(text.trim() === ""){
            Errorhandler("Value Required")
          }
        break;
      case "Textarea":
          if(text.trim() === ""){
            Errorhandler("Value Required Teaxtarea")
          }
          break;

      case "Datepicker":
        if (text.trim() === "") {
          Errorhandler("value Required");
        }
        break;
      case "Timepicker":
        if (text.trim() === "") {
          Errorhandler("value Required");
        }
        break;
        case "File":
        Errorimage === "" ? Errorhandler("file is required") : Errorhandler("");
        break;
        // case "File":
        // Errorimage === "" ? Errorhandler("file is required") : handleSubmit(currentquestion,[{answer : text}]);
        // settext("");;
        // break;  
      default:
        
        break;
    }
    // TODO: this code for validation end

    if (currentquestion.type_of_control === "Multiselect") {
      let answers = selected.filter((item) => item.ischecked === true);
      if (answers.length <= 0) {
        
        Errorhandler("please check checkbox");
      } else {
        Errorhandler("");
        handleSubmit(currentquestion, [
          { answer: answers.map((item) => item.value).join(",") },
        ]);
      }

      //! handleSubmit(currentquestion, [
      //!   { answer: answers.map((item) => item.value).join(",") },
      //! ]);
    } 
    else {
      if (
        currentquestion.type_of_control === "Text" ||
        currentquestion.type_of_control === "Textarea" ||
        currentquestion.type_of_control === "Datepicker" ||
        currentquestion.type_of_control === "Timepicker"
        ) {
        if (text.trim() === "") {
          //alert("Value Required");
        } else {
          handleSubmit(currentquestion, [{ answer: text }]);
          settext("");
        }
      }

    }
  }
  // * send button onClick handler end

  //* text onchange handler start
  const textchangehandler = (e) => {
    settext(e.target.value);
    Errorhandler("");
  };
  //* text onchange handler end

  // * checkbox onchange handler start
  const checkboxhandler = (e, array) => {
    array.forEach((fruite) => {
      if (fruite.value === e.target.value) fruite.ischecked = e.target.checked;
    });
    selected = [...array];
    console.log("selected", selected);
  };
  //* checkbox onchange handler end

  //* toggel open close start
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen((isOpen) => !isOpen)
  }
  //* toggel open close end

  // * file onchange handler start
  const imageHandler = (item, event) => {
    setShowimg(URL.createObjectURL(event.target.files[0]))
    console.log(URL.createObjectURL(event.target.files[0]))
    window.localStorage.setItem("img1",(URL.createObjectURL(event.target.files[0])))
    if (event.target.files[0]) {
      let answer;
      let b64;
      // answer = event.target.files[0];
      var file = event.target.files[0],
      
        reader = new FileReader();

      reader.onloadend = async function () {
        // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
        let b64 = await reader.result.replace(/^data:.+;base64,/, "");
        setimage(b64);
        let answers = [
          {
            answer: b64,
          },
        ];
        handleSubmit(item, answers);
        // document.getElementById("unique").src = reader.result.replace(
        //   /^data:.+;base64,/,
        //   ""
        // );
        setimage(b64);
        console.log(b64);
      };

      reader.readAsDataURL(file);

      let answers = [
        {
          answer: image,
        },
      ];
      setErrorimage(false);
      Errorhandler("");
    }else{
      setErrorimage(true);
      Errorhandler("pls upload a file with data");
    }
  };
  // * file onchange handler end

  return (
    <>
      <img className="chatIcon" src={chaticon} alt={"chatIcon"} onClick={togglePopup}/>
      <div className={`${!isOpen ? "active": ""} show chatBox`}>
        <div className="chatHeader">
          <h1>ICICI Foundation</h1>
          <button className="emailIcon">
            <img src={email} alt={"email"} />
          </button>
          <button className="closeIcon" onClick={togglePopup}>
            <img src={close} alt={"chatBot"} />
          </button>
        </div>
        <div className="chatMiddle" id="chatMiddlee">
          {/* {fetched === true ? <h1>...</h1> : ""} */}
          {Object.keys(storedquestions).length > 0 && (
            <div className="results">
              {storedquestions.map((question, index) => (
                <div key={index} className="response-1">
                  <div className="response-2">
                    <img src={chatbot} alt={"chatBot"} />
                   {fetched === false? <h1>...</h1>: ""}
                   <p> {question.item.message}</p>
                  </div>
                  
                  {question.item.type_of_control === "Checkbox" && (
                    <div className="response-3">
                      <ul className="ul-response-1">
                        {question.response.answers[0].answer
                          // .split(",")
                          .map((item, index) => (
                            <li key={index} className="li-response-1">
                              <img src={fav} alt={"listicon"} /> {item}
                            </li>
                          ))}
                      </ul>
                      <img  src={avatarorange} alt={"avatar"} />
                    </div>
                  )}

                  {question.item.type_of_control !== "Checkbox" && (
                    <div className="response-3">
                      <ul className="ul-response-1">
                        {question.item.type_of_control === "File" && (
                          <img
                            alt="uploaded"
                            src={showimg}
                            id="unique"
                            style={{ width: "60px", height: "60px" }}
                          />
                        )}

                        {question.item.type_of_control !== "File" &&
                          question.response.answers.map((item, index) => (
                            <li key={index} className="li-response-1">
                              <img src={fav} alt={"listicon"} /> {item.answer}
                            </li>
                        ))}
                      </ul>
                      <img className="imgavtart" src={avatarorange} alt={"avatar"} />
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
          {window.localStorage.getItem("lastleftquestion") === "full" ? (
            <p className="submitMsg">You have answered all questions.</p>
          ) : (
            <></>
          )}
          {window.localStorage.getItem("lastleftquestion") !== "full" &&
          currentquestion ? (
            <div className="response-2">
                  <img src={chatbot} alt={"chatBot"} />
              {Questionhandler(
                currentquestion,
                handleSubmit,
                fetched,
                checkboxhandler,
                textchangehandler,
                handlebutton,
                imageHandler,
                Errorhandler
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        
        <div className="inputFooter">
          <div className="inputHolder">
            {fetched === true && currentquestion ? (
              <>
                <input
                  id={currentquestion.id}
                  placeholder={currentquestion.placeholder}
                  value={text}
                  type="text"
                  onChange={(e) => {
                    textchangehandler(e);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      console.log(event);
                      handlebutton();
                    }
                  }}
                  style={{
                    display:
                      currentquestion.type_of_control === "Textarea"
                        ? "none"
                        : "block",
                  }}
                  disabled={currentquestion.type_of_control !== "Text"}
                />
                 {
                    error && 
                    <div
                    className="side"
                    style={{
                      // transform: "translate3d(5px, 5px, 5px)",
                      position: "absolute",
                      right: "72px",
                      top: "18px",
                    }}
                    >
                    <a data-tip="tooltip" data-for="happyFace">
                      !
                    </a>
                    <ReactTooltip
                      id="happyFace"
                      // style={{width:"100px", height:"10px"}}
                      type="error"
                      place="top"
                      // effect="solid"
                    >
                      <span>{error}</span>
                    </ReactTooltip>
                  </div>
                  }
                {/* {currentquestion.type_of_control === "Textarea" && (
                  <div>
                    <label>{currentquestion.message}</label>
                  <textarea
                    placeholder={currentquestion.message}
                    name={"Textarea"}
                    onChange={(e) => {
                      textchangehandler(e);
                    }}
                    ></textarea>
                    </div>
                )} */}
                <button
                  className="sendBtn"
                  onClick={(e) => handlebutton()}
                  disabled= {
                      counter === "full" ||
                      currentquestion.type_of_control === "Button" || 
                      currentquestion.type_of_control === "Dropdown"
                      // currentquestion.type_of_control ==="File"
                  }
                  // disabled= {currentquestion.type_of_control !== "Checkbox"}
                  // disabled = {window.localStorage.getItem("lastleftquestion", "full")}
                >
                  <img src={send} />
                </button>
              </>
            ) : (
              <></>
            )}

            <button className="mikeBtn">
              <img src={voice} alt="mic button" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


export default Chat;
