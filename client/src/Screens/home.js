import React, { useState, Component, useRef, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImg from '../Images/default-image-user.png'
import "./style.css";
import axios from "./axios";

import Footer from "./footer";
import { Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaperPlane,
  faDownload,
  faReply,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Progress } from 'reactstrap';

// import Moment from "react-moment";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ReactEmoji from "react-emoji";

import VisibilitySensor from 'react-visibility-sensor'
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import firebase from "./firebase";
// import { messaging } from "../init-fcm";
//import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
//import HorizontalScroll from 'react-scroll-horizontal'

const customLinkDecorator = (
  decoratedHref,
  decoratedText,
  linkTarget,
  key
) => {
  return (
    <a
      href={decoratedHref}
      target="_self"
      rel='noopener'
      className='customLink'
    >
      {decoratedText}
    </a>
  )
}

const customPhoneDecorator = (
  decoratedText
) => {
  return (
    <a href={`tel:${decoratedText}`} className='customPhone'>
      {decoratedText}
    </a>
  )
}

const customEmailDecorator = (
  decoratedHref,
  decoratedText
) => {
  return (
    <a href={decoratedHref} className='customEmail'>
      {decoratedText}
    </a>
  )
}

const customCreditCardDecorator = (
  decoratedText
) => {
  return (
    <i className='customCreditCard'>
      <b>{decoratedText}</b>
    </i>
  )
}

const Cards = (prop) => {
  const [comment, setComment] = useState("");
  const [lword, setLword] = useState(prop.likes);
  const [modal, setModal] = useState(false);
  const [imgModal, setImgModal] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const videoRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reply, setReply] = useState({})

  useEffect(() => {
    if (isVisible) {
      videoRef.current.play()
    }
    else if (!isVisible && videoRef.current !== null) {
      if (videoRef.current.play) {
        videoRef.current.pause()
      }
    }
  }, [isVisible])

  const imgToggle = () => setImgModal(!imgModal)
  const toggleDrop = () => setDropdownOpen(prevState => !prevState);

  const toggle = () => {
    setModal(!modal);
  };

  const liketoggle = (ev) => {
    // setModal(!modal);

    if (lword.indexOf(localStorage.getItem("id")) == -1) {
      setLword([...lword, localStorage.getItem("id")]);
    } else {
      setLword(lword.filter((u) => u !== localStorage.getItem("id")));
    }
    prop.liker(prop.id);
  };

  const commenter = () => {
    if (comment.trim() === "") {
      return;
    } else {
      prop.comm(comment, prop.id, reply);
      prop.comments.unshift({
        comment: comment,
        src: localStorage.getItem("src"),
        username: localStorage.getItem("fullname"),
        reply: reply
      });
      setComment("");
      setReply({})
    }
  };

  const sharePost = () => {
    toast.success('Sharing post please Wait...')
    let data = {
      firstname: localStorage.getItem('firstname'),
      lastname: localStorage.getItem('lastname'),
      username: localStorage.getItem('username'),
      post: prop.post,
      owner: localStorage.getItem('id'),
      department: localStorage.getItem('department'),
      level: localStorage.getItem('level'),
      followers: prop.followers,
      verified: prop.verify,
      topic: prop.topic,
      image: localStorage.getItem('src')
    }

    if (prop.img) {
      data.src = prop.img
      data.srctype = prop.srctype
    }

    axios.post('/posts/share', data)
      .then(() => {
        toast.success('Post Shared...')
      })
      .catch((err) => {
        toast.error('Error sharing post, please try again....')
      })
  }

  return (
    <div>
      <div className="card-container" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f6f6f6", color: "black" } : null}>
        <div>
          <div className="card-header2">
            <div className="poster-details" onClick={() => {
              window.location = `/users/${prop.username}`
            }}>
              {prop.image === "" ||
                prop.image === "undefined" ||
                prop.image == null ? (
                <img src={defaultImg} onClick={() => {
                  window.location = `/users/${prop.username}`
                }}></img>
              ) : (
                <img src={prop.image} alt="Profile Image" onClick={() => {
                  window.location = `/users/${prop.username}`
                }} />
              )}
              <div className="posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}>
                {prop.fullname && (
                  <h6>
                    {prop.fullname} 
                  </h6>
                )}
                
              </div>
            </div>

            <div className="menu-post">
              <Dropdown isOpen={dropdownOpen} direction="left" toggle={toggleDrop}>
                <DropdownToggle color="white" className="dropdown dropdown-icon">
                  <div className="menu-post" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : { color: "white" }}>
                    <span
                      class="iconify" data-icon="carbon:overflow-menu-vertical" data-inline="false"></span>
                  </div>
                </DropdownToggle>

                <DropdownMenu>

                  <CopyToClipboard text={`https://www.uniconne.com/posts/${prop.id}`} onCopy={() => toast.success("Link Copied")}>
                    <DropdownItem className="dropdown-items"
                    // onClick={() => {
                    //   navigator.clipboard.writeText(`https://www.uniconne.com/posts/${prop.id}`);
                    //   toast.success('Link Copied');
                    // }}
                    >
                      Copy Link
                    </DropdownItem>
                  </CopyToClipboard>

                  <DropdownItem divider />

                  <DropdownItem className="dropdown-items" onClick={sharePost} >Share As Post</DropdownItem>

                  <DropdownItem divider />

                  {prop.img &&
                    <DropdownItem className="dropdown-items">
                      <a href={prop.img} className="btn btn-primary">
                        Download
                      </a>
                    </DropdownItem>
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* {(prop.news && <p className="text-mute">News/Trends</p>) ||
              (prop.sponsored && <p className="text-mute">Sponsored</p>) || (
                <Moment className="datetime" fromNow>
                  {prop.createdAt}
                </Moment>
              )} */}
          </div>
          <div className="main-post2">
            <div className="post-text" onClick={toggle}>
              {prop.post && (
                <div allowedFormats={['URL', 'Email', 'Phone', 'CreditCard']}
                  linkDecorator={customLinkDecorator}
                  emailDecorator={customEmailDecorator}
                  phoneDecorator={customPhoneDecorator}
                  creditCardDecorator={customCreditCardDecorator}>
                  <p className="desc">{prop.post}</p>
                </div>
              )}
              {prop.url && (
                <div className="url-div">
                  <a href={prop.url} target="_blank" className="btn btn-primary">
                    Click Here
                  </a>
                </div>
              )}
            </div>
            <div className="post-image">
              {(prop.img && prop.srctype.indexOf("image") !== -1 && (
                <img width="100%" src={prop.img} alt="prod" onDoubleClick={liketoggle} />
              )) ||
                (prop.img && (
                  <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
                    <video class="video" src={prop.img} width="100%" controls loop playsInline ref={videoRef}></video>
                  </VisibilitySensor>
                )
                )}
            </div>
          </div>

          <div className="engage-btn">
            <div className="like-btnn" style={{ fontSize: "20px" }}>
              {(lword.indexOf(localStorage.getItem("id")) == -1 && (
                <div style={{ fontSize: "20px" }}>
                  <FontAwesomeIcon
                    onClick={liketoggle}
                    icon={faHeart}
                  ></FontAwesomeIcon>{" "}
                  {lword.length}
                </div>
              )) || (
                  <div style={{ fontSize: "20px" }}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={liketoggle}
                      color="red"
                    ></FontAwesomeIcon>{" "}
                    {lword.length}
                  </div>
                )}
            </div>
            <div onClick={toggle} className="commenting4">
              {<p className="comment-btn2" style={{ fontSize: "20px" }}><span class="iconify" data-icon="octicon:comment-discussion-24" data-inline="false"></span>{prop.comments.length}</p>}
              {(prop.comments[0] && (
                <div>
                   <div className="comments">
                    {/* {prop.comments[0].src && (
                      <img src={prop.comments[0].src} className="comment-img" />
                    )} */}
                    {
                      <p
                        className="comment-posters-handle"
                        style={(localStorage.getItem("mode") === "light") ? { color: "black", marginRight: "4px" } : { marginRight: "4px" }}
                      >
                        @{prop.comments[0].username}
                      </p>
                    }
                    {prop.comments.length - 1 > 0 && (
                      <p className="comment-posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}>{`+${prop.comments.length - 1
                        } others`}</p>
                    )}
                  </div>

                  {/* <div>
                  <p className="text-muted">@{prop.comments[0].username}</p>
                  <p className="comment">{prop.comments[0].comment}</p>
                </div> */}
                </div>
              ))}
            </div>

          </div>

        </div>


        <div className="commenting3">
          <input
            type="text"
            name="comment"
            placeholder="write a comment..."
            onChange={(ev) => {
              let comment = ev.target.value;
              setComment(comment);
            }}
            value={comment}
          // className="form-control"
          ></input>
          <button className="send-comment-btn" onClick={commenter}>
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <Modal style={{ padding: "0px" }} isOpen={modal} toggle={toggle} fade={false}>
        <ModalHeader className="modal-header" color="#fff" style={{ Color: "#0f1429", boxShadow: "none", border: "none", borderBottom: "1px solid rgba(80, 80, 80, 0.3)", }} toggle={toggle}>Post</ModalHeader>
        <ModalBody className="card-container-modal" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "white", color: "black", boxShadow: "none", padding: "0px" } : null}>
          <div className="card-container card-container-modal2">
            <div className="card-header2">
              <div className="poster-details" onClick={() => {
                this.props.history.push(`/users/${prop.username}`)
              }}>
                {prop.image === "" ||
                  prop.image === "undefined" ||
                  prop.image == null ? (
                  <img src={require('../Images/default-image-user.png')} onClick={() => {
                    window.location = `/users/${prop.username}`
                  }}></img>
                ) : (
                  <img src={prop.image} alt="Profile Image" onClick={() => {
                    window.location = `/users/${prop.username}`
                  }} />
                )}
                <div className="posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}>
                  {prop.firstname && (
                    <h6>
                      {prop.firstname} {prop.lastname} {(prop.verified) ? <span class="iconify" data-icon="ic:baseline-verified" data-inline="false" style={{ color: "blue" }}></span> : null}
                    </h6>
                  )}
                  <p className="hmmm">@{prop.username}</p>
                </div>
              </div>
              {/* <div className="menu-post">
                <span class="iconify" data-icon="carbon:overflow-menu-vertical" data-inline="false"></span>
              </div> */}
              {(prop.news && <p className="text-mute">News/Trends</p>) ||
                (prop.sponsored && <p className="text-mute">Sponsored</p>) || (
                  <div className="datetime" fromNow>
                    {/* {prop.createdAt} */}
                  </div>
                )
              }
            </div>

            <div className="main-post2">
              <div className="post-text">
                {prop.post && (
                  <div allowedFormats={['URL', 'Email', 'Phone', 'CreditCard']}
                    linkDecorator={customLinkDecorator}
                    emailDecorator={customEmailDecorator}
                    phoneDecorator={customPhoneDecorator}
                    creditCardDecorator={customCreditCardDecorator}>
                    <p className="desc">{prop.post}</p>
                  </div>
                )}
                {prop.url && (
                  <div className="url-div">
                    <a href={prop.url} target="_blank" className="btn btn-primary">
                      Click Here
                    </a>
                  </div>
                )}
              </div>
              <div className="post-image">
                {(prop.img && prop.srctype.indexOf("image") !== -1 && (
                  <img width="100%"
                    max-height="350px"
                    src={prop.img} alt="prod"
                    onDoubleClick={liketoggle}
                    onClick={imgToggle}
                  />
                )) ||
                  (prop.img && (
                    <video class="video" src={prop.img} width="100%" controls playsInline></video>
                  )
                  )}
              </div>
            </div>
            <div>
              {/* <a className="btn btn-primary form-control" onClick={det}><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Visit</a> */}
            </div>
            <div className="engage-btn engage-btn-modal">
              <div className="like-btnn" style={{ fontSize: "20px" }}>
                {(lword.indexOf(localStorage.getItem("id")) == -1 && (
                  <div style={{ fontSize: "20px" }}>
                    <FontAwesomeIcon
                      onClick={liketoggle}
                      icon={faHeart}
                    ></FontAwesomeIcon>{" "}
                    {lword.length}
                  </div>
                )) || (
                    <div style={{ fontSize: "20px" }}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={liketoggle}
                        color="red"
                      ></FontAwesomeIcon>{" "}
                      {lword.length}
                    </div>
                  )}
              </div>
              <div className="commenting4">
                {<p className="comment-btn2" style={{ fontSize: "20px" }}><span class="iconify" data-icon="octicon:comment-discussion-24" data-inline="false"></span>{prop.comments.length}</p>}
                {(prop.comments[0] && (
                  <div>
                    <div className="comments">
                      {prop.comments[0].src && (
                        <img src={prop.comments[0].src} className="comment-img" />

                      )}
                      {<p className="comment-posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black", marginRight: "4px" } : { marginRight: "4px" }}>@{prop.comments[0].username}</p>}
                      {prop.comments.length - 1 > 0 && <p className="comment-posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}>{`+${prop.comments.length - 1} others`}</p>}
                    </div>

                    {/* <div>
                    <p className="text-muted">@{prop.comments[0].username}</p>
                    <p className="comment">{prop.comments[0].comment}</p>
                  </div> */}
                  </div>
                ))}
              </div>
            </div>
            {reply.comment &&
              <div style={{
                width: "100%",
                backgroundColor: "whitesmoke",
                color: "black",
                display: "flex",
                flexDirection: "column",
                padding: "5px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%"
                }}>
                  <p className="sentText pr-10">{(reply.username) ? reply.username : reply.username}</p>
                  <FontAwesomeIcon icon={faTimes} size="lg" onClick={() => {
                    setReply({})
                  }}></FontAwesomeIcon>
                </div>
                <div style={{
                  display: "flex",
                  padding: "5px"
                }}>
                  <div className="messageText colorWhite desc"><pre>{ReactEmoji.emojify(reply.comment)}</pre></div>
                </div>
              </div>
            }
            <div className="commenting3 commenting-modal">
              <input
                autoComplete="off"
                autoComplete="none"
                type="text"
                name="comment"
                placeholder="write a comment..."
                onChange={(ev) => {
                  let comment = ev.target.value;
                  setComment(comment);
                }}
                value={comment}
              // className="form-control"
              ></input>
              <button className="send-comment-btn" onClick={commenter}>
                <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
              </button>
            </div>

            <div class="comment-modal-container">
              {(prop.comments[0] &&
                prop.comments.map((comment) => (
                  <div className="commenter-header" style={{ justifyContent: "space-evenly" }} id={comment.id}>
                    {comment.src && (
                      <img src={comment.src} className="comment-img" onClick={() => {
                        window.location = `/users/${comment.username}`
                      }} />
                    )}
                    <p className="text-muted" onClick={() => {
                      window.location = `/users/${comment.username}`
                    }}>@{comment.username}</p>
                    <div className="comments-div">
                      {comment.reply && comment.reply.comment && <p><a href={`#${comment.reply.id}`} className="disabled">reply; @{comment.reply.username}: {comment.reply.comment.slice(0, 31)} </a></p>}
                      <div allowedFormats={['URL', 'Email', 'Phone', 'CreditCard']}
                        linkDecorator={customLinkDecorator}
                        emailDecorator={customEmailDecorator}
                        phoneDecorator={customPhoneDecorator}
                        creditCardDecorator={customCreditCardDecorator}>
                        <p className="comment" onClick={() => {
                          window.location = `/users/${comment.username}`
                        }}>{comment.comment}</p>
                      </div>
                    </div>
                    <br />
                    <div>
                      <FontAwesomeIcon onClick={() => setReply(comment)} icon={faReply} size="lg"></FontAwesomeIcon>
                    </div>
                  </div>
                ))) ||
                "No comments on this post yet"}
            </div>

          </div>
        </ModalBody>
        {/* <ModalFooter className="maodal-footer" style={{ Color: "#0f1429", border: "none", borderTop: "1px solid rgba(80, 80, 80, 0.3)", }}>
          
        </ModalFooter> */}
      </Modal>

      <Modal isOpen={imgModal} toggle={imgToggle} fade={false}>
        <ModalHeader toggle={imgToggle}>

        </ModalHeader>
        <ModalBody>
          <img src={prop.img} alt={prop.username} width="100%" />
        </ModalBody>
        <ModalFooter>
          <a href={prop.img} className="btn btn-primary">
            <FontAwesomeIcon icon={faDownload} size="lg"></FontAwesomeIcon>
          </a>
        </ModalFooter>
      </Modal>

    </div>
  );
};


const getItems = () =>
  ["Random", "Academics", "Arts", "Animes", "Books", "Cats&Dogs", "Celebrities", "Comics", "Cruise", "Crypto", "Fashion", "Fun", "Food", "Games", "Motivation", "Movies", "Memes", "Nigeria", "OAU", "Politics", "Profession", "Programming", "Religion", "Science", "Sports", "Tech", "TVshows", "Uniconne", "Writers"];

const Topics = (props) => {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);
  const [topicA, setTopicA] = React.useState("Random");

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick = (id) => ({ getItemById, scrollToItem }) => {
    const itemSelected = isItemSelected(id)

    props.click(id)
    setTopicA(id)
    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== id)
        : currentSelected.concat(id)
    );
  }

  return (

    <ScrollMenu
    // RightArrow={RightArrow}
    >
      {items.map((topic) => (
        // <div
        //   style={{ color: "black" }}
        //   itemId={id} // NOTE: itemId is required for track items
        //   // value={id}
        //   key={id}
        //   onClick={handleClick(id)}
        //   selected={isItemSelected(id)}
        // >{id}</div>
        <div className="scroll-div"
          style={(topicA === topic) ? { backgroundColor: "red" } : null}
          value={topic}
          onClick={handleClick(topic)}
          selected={isItemSelected(topic)}
          key={topic}
        >
          <p className="scroll-item">{topic}</p>
        </div>
      )
      )}

    </ScrollMenu>

  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)

  return (
    <div disabled={isFirstItemVisible}>
      <span class="iconify filter-iconify" data-icon="system-uicons:filtering" data-inline="false"></span>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)

  return (
    <div disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </div>
  );
}
class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      loader: 0,
      posts: [],
      username: localStorage.getItem("username"),
      src: localStorage.getItem("src"),
      id: localStorage.getItem("id"),
      modal: false,
      img2: null,
      src2: null,
      srctype: null,
      modal2: false,
      post: "",
      loaded2: null,
      profile: null,
      note: 0,
      topic: "Random",
      topics: ["Random", "Academics", "Arts", "Animes", "Books", "Cats&Dogs", "Celebrities", "Comics", "Cruise", "Crypto", "Fashion", "Fun", "Food", "Games", "Motivation", "Movies", "Memes", "Nigeria", "OAU", "Politics", "Profession", "Programming", "Religion", "Science", "Sports", "Tech", "TVshows", "Uniconne", "Writers"],
    };
    this.input = React.createRef()
  }
 
  // dateChecker
  dateChecker = (c) => {
    var date1 = new Date(c.createdAt);
    var date2 = new Date();

    var difference_In_Time = date2.getTime() - date1.getTime();

    var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
    if (c.duration) {
      if (difference_In_Days >= c.duration) {
        let todele = { id: c._id };
        axios.post("/posts/delete", todele);
        return (c = { owner: "delete" });
      }
    }
    if (difference_In_Days >= 300) {
      let todele = { id: c._id };
      axios.post("/posts/delete", todele);
      return (c = { owner: "delete" });
    } else {
      return c;
    }
  };
  // filter
  datefilter = (k) => {
    return k.owner !== "delete";
  };
  assfilter = (a) => {
    // return a.ass == null || "undefined" || false;
    if (!a.ass && !a.tutorial) {
      return a
    }
  };
  // customfilter = (u) => {
  //     return u.owner !== this.state.id
  // }
  followfilter = (u) => {
    if (u.news) {
      return u;
    } else if (u.sponsored) {
      return u;
    } else if (u.followers) {
      return u.followers.indexOf(this.state.id) !== -1;
    }
    // else {return u}
  };

  // sort
  customSort = (a, b) => {
    let picker = Math.round(Math.random() * 10)
    var date1 = new Date(a.createdAt);
    var date2 = new Date(b.createdAt);

    var name1 = a.username
    var name2 = b.username
    if (picker % 2 === 0) {
      if (date1.getTime() > date2.getTime()) return -1;
      if (date1.getTime() < date2.getTime()) return 1;
    }
    if (picker === 3) {
      if (date1.getTime() > date2.getTime()) return -1;
      if (date1.getTime() < date2.getTime()) return 1;
    }
    if (picker === 7) {
      if (name1 > name2) return -1;
      if (name1 < name2) return 1;
    }
    if (picker === 5) {
      if (name1 < name2) return -1;
      if (name1 > name2) return 1;
    }
    return 0;
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  newMessages = (ress) => {
    let newMessage = ress.messages ? ress.messages.filter((m) => {
      let time = (m && m.message.time) ? new Date(m.message.time) : null
      let time2 = new Date(ress.offlineTime)
      return time.getTime() > time2.getTime()
    }).length : null
    let fication = (ress.messages) ? newMessage : 0
    localStorage.setItem('note', fication)
    // this.setState({note: fication})
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.replace(`/login`);
    }
    if (!localStorage.getItem("newDiscussion")) { localStorage.setItem("newDiscussion", "0") }
    if (!localStorage.getItem("note")) { localStorage.setItem("note", "0") }
    document.title = `Uniconne`;
    const ENDPOINT = "https://uniconne-chat-api.herokuapp.com/";

    let socket;

    // if (localStorage.getItem('phone').indexOf('+234') == -1) {
    //     this.setState({
    //         modal: true
    //     })
    // }

    
    let user = { userID: localStorage.getItem("id") };
    axios
      .post("/users/showone", user)
      .then((data) => data.data.response)
      .then((res) => {
        localStorage.setItem("isVerified", 'true');
        localStorage.setItem("email", res.email);
        localStorage.setItem("firstname", res.firstname);
        localStorage.setItem("lastname", res.lastname);
        localStorage.setItem("src", res.src);
        localStorage.setItem("tbalance", res.balance);
        this.setState({
          profile: res,
        });
        return res;
      })
      .then((ress) => {

        return ress
      })
      .then(() => {
        axios
          .post("/posts")

          .then((data) => {
            //console.log(data)
            // data.data.response.forEach(this.distancer)
            return data.data.response;
          })
          .then((ans) => ans.map(this.dateChecker))
          .then((infoma) => infoma.filter(this.assfilter))
          // .then((dat) => {
          //   return dat.sort((a,b) => {
          //     if(a.likes.length > b.likes.length) return -1
          //     if(a.likes.length < b.likes.length) return 1
          //     return 0
          //   })
          // })
          // .then((ref) => {
          //   this.setState({
          //     posts: [ref[0], ref[1]]
          //   })
          //   return ref
          // })
          // .then((daty) => {
          //   return daty.sort((a,b) => {
          //     if(a.followers.length > b.followers.length) return -1
          //     if(a.followers.length < b.followers.length) return 1
          //     return 0
          //   })
          // })
          // .then((refy) => {
          //   this.setState({
          //     posts: [...new Set([...this.state.posts, refy[0], refy[1]])]
          //   })
          //   return refy
          // })
          // .then((daty) => {
          //   return daty.sort((a,b) => {
          //     if(a.comments.length > b.comments.length) return -1
          //     if(a.comments.length < b.comments.length) return 1
          //     return 0
          //   })
          // })
          // .then((refy) => {
          //   this.setState({
          //     posts: [...new Set([...this.state.posts, refy[0], refy[1]])]
          //   })
          //   return refy
          // })
          // // inverse
          // .then((dat) => {
          //   return dat.sort((a,b) => {
          //     if(a.likes.length > b.likes.length) return 1
          //     if(a.likes.length < b.likes.length) return -1
          //     return 0
          //   })
          // })
          // .then((ref) => {
          //   this.setState({
          //     posts: [ref[0], ref[1]]
          //   })
          //   return ref
          // })
          // .then((daty) => {
          //   return daty.sort((a,b) => {
          //     if(a.followers.length > b.followers.length) return 1
          //     if(a.followers.length < b.followers.length) return -1
          //     return 0
          //   })
          // })
          // .then((refy) => {
          //   this.setState({
          //     posts: [...new Set([...this.state.posts, refy[0], refy[1]])]
          //   })
          //   return refy
          // })
          // .then((daty) => {
          //   return daty.sort((a,b) => {
          //     if(a.comments.length > b.comments.length) return 1
          //     if(a.comments.length < b.comments.length) return -1
          //     return 0
          //   })
          // })
          // .then((refy) => {
          //   this.setState({
          //     posts: [...new Set([...this.state.posts, refy[0], refy[1]])]
          //   })
          //   return refy
          // })
          // inverse end
          // .then((infoma) => infoma.filter(this.assfilter))
          .then((result) => {
            return result.sort(this.customSort);

          })

          .then((res) => {
            return res.slice(0, 1001);
          })

          // //.then(conclusion => conclusion.filter(this.customfilter))
          .then((dd) => dd.filter(this.datefilter))
          //.then((dd) => dd.filter(this.followfilter))
          .then((data) => {
            this.setState({ loader: 1 });
            this.setState({ posts: data });
            this.newMessages(this.state.profile)
          });
        // .then(data => this.setState({products: data.data.response}))
        // .then(res => console.log(this.state.products))
        // .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })

      })
    
  }

  // posts

  filer2 = (ev) => {
    let file = ev.target.files[0];
    this.setState({
      img2: ev.target.files[0],
      src2: window.URL.createObjectURL(ev.target.files[0]),
      srctype: file.type,
    });
  };

  post = (ev) => {
    let name = ev.target.value;
    this.setState({ post: name, err: "" });
  };

  topic = (ev) => {
    let topic = ev.target.innerHTML;
    this.setState({ topic });
  };

  submit2 = (ev) => {
    ev.preventDefault();
    let data = new FormData();
    if (this.state.img2) {
      data.append("file", this.state.img2);
      data.append("filename", this.state.img2.name);
    }
    data.append("firstname", this.state.profile.firstname);
    data.append("lastname", this.state.profile.lastname);
    data.append("username", this.state.profile.username);
    data.append("post", this.input.current.value);
    data.append("topic", this.state.topic);
    data.append("owner", this.state.profile._id);
    data.append("department", this.state.profile.department);
    data.append("level", this.state.profile.level);
    data.append("followers", this.state.profile.followers);
    data.append("verified", this.state.profile.verified);
    data.append("image", this.state.profile.src);

    if (this.state.img2 === null && this.input.current.value === "") {
      toast.error("Please add a post");
    } else {
      toast.success("Loading, please wait...");
      axios
        .post("/posts/addpost", data, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded2: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            });
          },
        })
        .then(() => {
          let prod = { id: this.state.id, token: this.state.token };
          axios
            .post("/posts/myposts", prod)
            .then((data) => {
              return data.data.response;
            })
            .then((ans) => ans.map(this.dateChecker))
            .then((dd) => dd.filter(this.datefilter))
            .then((data) => {
              this.setState({
                posts: [data.reverse()[0], ...this.state.posts]
              });
              toast.success("Posted")
            })
            .catch((err) => {
              toast.error("Couldn't Get Data, Please Try Again.");
            });
        })
        .then(() => {
          this.input.current.value = ""
          this.modal2();
        })
        .catch((err) => {
          this.setState({ loaded2: 0 });
          toast.error("Could'nt add post");
        });
    }
  };

  modal2 = () => {
    this.setState({
      modal2: !this.state.modal2,
      src2: null,
      img2: null,
      post: "",
      loaded2: null,
      srctype: null,
    });
  };

  //Filtering
  filter = (ev) => {
    let filter = ev.target.innerHTML
    this.setState({ topic: filter })
    // All
    if (filter == 'Random') {
      this.setState({ loader: 0 })

      axios.post('/posts')
        .then((data) => {
          return data.data.response
        })
        .then((result) => {
          result.sort(this.customSort);
          return result
        })
        .then(dd => dd.filter(this.assfilter))
        .then(data => {

          this.setState({ loader: 1 });
          this.setState({ posts: data })
        })
        .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
    }

    else {
      this.setState({ loader: 0 })

      axios.post('/posts')
        .then((data) => {
          return data.data.response
        })
        .then((result) => {
          result.sort(this.customSort);
          return result
        })
        .then(dd => dd.filter(this.assfilter))
        .then(dat => dat.filter((a) => a.topic === filter))
        .then(data => {

          this.setState({ loader: 1 });
          this.setState({ posts: data })
        })
        .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
    }

  }

  render() {
    const liker = (id) => {
      let like = {
        postID: id,
        like: this.state.id,
      };
      axios.post("/posts/like", like);
      //.then(() => console.log("liked"))
      //.catch((err) => console.log("Couldn't add like to post."))
    };

    const comm = (comment, id, reply) => {
      let comm = {
        postID: id,
        comment: { username: localStorage.getItem("fullname"), comment, reply },
      };
      if (this.state.profile.src) {
        comm.comment.src = this.state.profile.src;
      }
      axios
        .post("/posts/comment", comm)
        .then(() => toast.success("Comment added"))
        .catch((err) => toast.error("Couldn't add comment to post."));
    };

    return (
      <div style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "white", color: "black" } : null}>
        {(
          <div>
            
            {(this.state.loader === 0 && (
              <div className="spin" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f6f6f6" } : null}>
                <Spinner color="primary" className="spinner" size="lg" />
              </div>
            )) || (
                <div className="home-container" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f9f9f9", color: "black" } : null}>
                  <div className="card-div">

                    {/* <div className="filter">
                      <span class="iconify" data-icon="system-uicons:filtering" data-inline="false"></span>
                      <select value={this.state.topic}
                        name="department"
                        onChange={this.filter}
                        className="form-control">
                        {this.state.topics.map((topic) =>
                          <option value={topic}>{topic}</option>
                        )}
                      </select>
                    </div> */}
                    {/* <Topics click={this.filter} /> */}
                    {/* <ScrollMenu className="scroll-you">
                      {this.state.topics.map((topic) => (
                        <div className="scroll-div"
                          style={(this.state.topic === topic) ? { backgroundColor: "red" } : null}
                          value={topic}
                          onClick={this.filter}
                          //selected={isItemSelected(topic)}
                          key={topic}
                        >
                          <p className="scroll-item">{topic}</p>
                        </div>
                      )
                      )}

                    </ScrollMenu> */}
                    {/* <div className="scroll-container filter">
                    <span class="iconify" data-icon="system-uicons:filtering" data-inline="false"></span>
                    <HorizontalScroll>
                    {this.state.topics.map((topic) =>
                          <div className="scroll-div" style={(this.state.topic === topic) ? {backgroundColor: "red"} : null } value={topic} onClick={this.filter}>
                            <p className="scroll-item">{topic}</p>
                          </div>
                        )}
                    </HorizontalScroll>
                    </div> */}
                    {/* <p align="center" style={{"color":"white"}}>Posts and News appear here.</p> */}
                    {/* <div className="buttons">
                                        <a className="btn btn-primary" onClick={() => window.location = '/profile?oau=true'}>Add A Post</a>

                                        <a className="btn btn-warning" onClick={() => window.location = '/profile?oau=true'}>Post An Advert <FontAwesomeIcon icon={faAd}></FontAwesomeIcon> </a>
                                    </div> */}

                    {this.state.posts.map((post) => (
                      <Cards
                        key={post._id}
                        createdAt={post.createdAt}
                        fullname={post.fullname}
                        lastname={post.lastname}
                        username={post.username}
                        owner={post.owner}
                        post={post.post}
                        img={post.src}
                        department={post.department}
                        level={post.level}
                        srctype={post.srctype}
                        comm={comm}
                        liker={liker}
                        comments={post.comments}
                        likes={post.likes}
                        id={post._id}
                        news={post.news}
                        url={post.url}
                        sponsored={post.sponsored}
                        image={post.image}
                        followers={this.state.profile.followers}
                        verify={this.state.profile.verified}
                        verified={post.verified}
                        topic={this.state.topic}
                      />
                    ))}
                  </div>
                  {/* </Col> */}
                  <ToastContainer />
                  {/* </Row> */}
                  <br />
                  <br />
                  <br />
                  <br />
                  <a className="pen" onClick={this.modal2}>
                    {" "}
                    <span
                      class="iconify"
                      data-icon="jam:write-f"
                      data-inline="false"
                    ></span>
                  </a>
                </div>
              )}

            {/* Post Modal */}
            <Modal isOpen={this.state.modal2} toggle={this.modal2} fade={false}>
              <ModalHeader toggle={this.modal2}>Add A Post</ModalHeader>
              <ModalBody style={{ padding: "8px", width: "100%" }}>
                <label>
                  <h6>Image or Video</h6>
                </label>

                <input
                  type="file"
                  className="form-control"
                  onChange={this.filer2}
                  accept="image/*,video/*,audio/*"
                />

                <br />
                {(this.state.src2 &&
                  this.state.srctype &&
                  this.state.srctype.indexOf("image/") !== -1 && (
                    <img src={this.state.src2} width="100%" />
                  )) ||
                  (this.state.srctype && (
                    <video
                      width="100%"
                      controls
                      src={this.state.src2}
                      autoPlay={true}
                    ></video>
                  )) ||
                  null}

                <br />

                <label for="post">
                  Post.

                  <textarea
                    name="post"
                    // className="form-control"
                    cols="40"
                    rows="4"
                    ref={this.input}
                    // value={this.state.post}
                    // onChange={this.post}
                    className="form-control"
                  ></textarea>
                </label>

                <br />

                <label for="post">
                  Topic:
                  {/* <select
                    value={this.state.topic}
                    name="level"
                    onChange={this.topic}
                    className="form-control"
                  >
                    {this.state.topics.map((topic) => (
                      <option value={topic}>{topic}</option>
                    ))}
                  </select> */}
                  <div className="scroll-cont">
                    <ScrollMenu
                      LeftArrow={LeftArrow}
                    >
                      {this.state.topics.map((topic) => (
                        <div className="scroll-div"
                          style={(this.state.topic === topic) ? { backgroundColor: "red" } : null}
                          value={topic}
                          onClick={this.topic}
                          //selected={isItemSelected(topic)}
                          key={topic}
                        >
                          <p className="scroll-item">{topic}</p>
                        </div>
                      )
                      )}

                    </ScrollMenu>
                  </div>
                </label>

                <br></br>

                {/* <Progress
                  max="100"
                  color="success"
                  value={this.state.loaded2}
                >
                  {Math.round(this.state.loaded2, 2)}%
                </Progress> */}

                {/* {this.state.loaded2 &&
                  <progress></progress>
                } */}
                {this.state.loaded2 &&
                  <progress min="0" max="100" value={this.state.loaded2}></progress>
                }

              </ModalBody>
              <ModalFooter>
                <button
                  onClick={this.submit2}
                  className="btn btn-success"
                >
                  Post
                </button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modal} toggle={this.toggle} fade={false}>
              <ModalHeader toggle={this.toggle}>Important Notice</ModalHeader>
              <ModalBody>
                <div>
                  <b>
                    {ReactEmoji.emojify(":D")} We noticed that the WhatsApp
                    number you registered with is not in the correct format.
                    Please go to your profile page to update your number to be
                    in the correct format (+234...). Thanks alot{" "}
                    {ReactEmoji.emojify("<3")}
                  </b>
                  <br />

                  <p>
                    Please let the sharing continue, we hope to have all OAU
                    students on board so that we can easily meet up with our
                    friends. {ReactEmoji.emojify("*-)")}
                  </p>

                  <p>
                    But we'll need your help to do that. Please let's Keep on
                    sharing! {ReactEmoji.emojify(":)")}
                  </p>
                  <p>Hope you enjoy your time on campus.</p>
                  <span className="quote">~John Alalade</span>
                </div>
              </ModalBody>
              <ModalFooter>
                <a
                  className="btn btn-primary"
                  onClick={() =>
                    this.props.history.push("/profile?oauife=true")
                  }
                >
                  Update Phone Number
                </a>
              </ModalFooter>
            </Modal>

            <br /><br />
            <Footer note={this.state.note} id={this.state.id} />
          </div>
        )}
      </div>
    );
  }
}

export default Home;

// var standalone = window.navigator.standalone,
//   userAgent = window.navigator.userAgent.toLowerCase(),
//   safari = /safari/.test(userAgent),
//   ios = /iphone|ipod|ipad/.test(userAgent);

// if (ios) {
//   if (!standalone && safari) {
//     // Safari
//   } else if (!standalone && !safari) {
//     // iOS webview
//   };
// } else {
//   if (userAgent.includes('wv')) {
//     // Android webview
//   } else {
//     // Chrome
//   }
// };