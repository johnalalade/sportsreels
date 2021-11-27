import React, { Component, useState, useRef, useEffect } from "react";
import "./style.css";
import ReactEmoji from "react-emoji";
import axios from "./axios";
//import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner, Form, Progress } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faPaperPlane,
  
  faClipboard,
  faDownload,
  faReply
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import VisibilitySensor from "react-visibility-sensor";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import defaultImg from '../Images/default-image-user.png'
import Footer from "./footer";

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
  const [imgModal2, setImgModal2] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reply, setReply] = useState({});

  useEffect(() => {
    if (isVisible) {
      videoRef.current.play();
    } else if (!isVisible && videoRef.current !== null) {
      if (videoRef.current.play) {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  const det = (ev) => {
    prop.deta(prop.id);
  };

  const imgToggle2 = () => setImgModal2(!imgModal2)
  const toggleDrop = () => setDropdownOpen((prevState) => !prevState);

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
        // src: localStorage.getItem("src"),
        username: localStorage.getItem("fullname"),
        reply: reply
      });
      setComment("");
      setReply({})
    }
  };

  const sharePost = () => {
    toast.success("Sharing post please Wait...");
    let data = {
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname"),
      username: localStorage.getItem("username"),
      post: prop.post,
      owner: localStorage.getItem("id"),
      department: localStorage.getItem("department"),
      level: localStorage.getItem("level"),
      followers: prop.followers,
      image: localStorage.getItem("src"),
    };

    if (prop.img) {
      data.src = prop.img;
      data.srctype = prop.srctype;
    }

    axios
      .post("/posts/share", data)
      .then(() => {
        toast.success("Post Shared...");
      })
      .catch((err) => {
        toast.error("Error sharing post, please try again....");
      });
  };

  return (
    <div className="profile-page" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f6f6f6", color: "black", boxShadow: "0px 0px 2px #ccc, 0px 0px 2px #ccc" } : null}>
      <div className="card-container profile-page" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "white", color: "black", boxShadow: "0px 0px 2px rgba(255, 255, 255, 0.3)" } : null} >
        <div>
          <div className="card-header2">
            <div className="poster-details">
              {prop.image === "" ||
                prop.image === "undefined" ||
                prop.image == null ? (
                <img src={defaultImg}></img>
              ) : (
                <img src={prop.image} alt="Profile Image" />
              )}
              <div className="posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}>
                {prop.fullname && (
                  <h6>
                    {prop.fullname} {(prop.verified) ? <span class="iconify" data-icon="ic:baseline-verified" data-inline="false" style={{ color: "blue" }}></span> : null}
                  </h6>
                )}
                {/* <p className="hmmm">@{prop.username}</p> */}
              </div>
            </div>
            <div>
              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggleDrop}
                direction="left"
              >
                <DropdownToggle
                  color="white"
                  className="dropdown dropdown-icon"
                >
                  <div className="menu-post" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : { color: "white" }}>
                    <span
                      style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}
                      class="iconify"
                      data-icon="carbon:overflow-menu-vertical"
                      data-inline="false"
                    ></span>
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

                  <DropdownItem className="dropdown-items" onClick={sharePost}>
                    Share As Post
                  </DropdownItem>
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
          {prop.tutorial && <h5>Tutorial</h5>}
          {prop.ass && <h5>Assignment</h5>}
          {prop.course && <h6>Course: {prop.course}</h6>}

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
                  <a
                    href={prop.url}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    Click Here
                  </a>
                </div>
              )}
            </div>
            <div className="post-image">
              {(prop.img && prop.srctype.indexOf("image") !== -1 && (
                <img
                  width="100%"
                  max-height="350px"
                  src={prop.img}
                  alt="prod"
                  onDoubleClick={liketoggle}
                // onClick={toggle}
                />
              )) ||
                (prop.img && (
                  <VisibilitySensor
                    onChange={(isVisible) => setIsVisible(isVisible)}
                  >
                    <video
                      class="video"
                      src={prop.img}
                      width="100%"
                      controls
                      loop playsInline
                      ref={videoRef}
                    ></video>
                  </VisibilitySensor>
                ))}
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
              {
                <p className="comment-btn2" style={{ fontSize: "20px" }}>
                  <span
                    class="iconify"
                    data-icon="octicon:comment-discussion-24"
                    data-inline="false"
                  ></span>
                  {prop.comments.length}
                </p>
              }
              {prop.comments[0] && (
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
              )}
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
            className="form-control"
          ></input>
          <button className="send-comment-btn" onClick={commenter}>
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          </button>
        </div>
        <a className="btn btn-danger" onClick={det}>
          Delete
        </a>
      </div>

      <Modal
        style={{ padding: "0px" }}
        isOpen={modal}
        toggle={toggle}
        fade={false}
      >
        <ModalHeader
          className="modal-header"
          color="#fff"
          style={{
            Color: "#0f1429",
            boxShadow: "none",
            border: "none",
            borderBottom: "1px solid rgba(80, 80, 80, 0.3)",
          }}
          toggle={toggle}
        >
          {prop.ass && "Assignment" || prop.tutorial && "Tutorial" || prop.news && "News" || prop.sponsored && "Advert" || "Post"}
        </ModalHeader>
        <ModalBody
          className="card-container-modal"
          style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "white", color: "black", boxShadow: "none", padding: "0px" } : null}
        >
          <div className="card-container card-container-modal2">
            <div className="card-header2">
              <div
                className="poster-details"
                onClick={() => {
                  this.props.history.push(`/users/${prop.username}`);
                }}
              >
                {prop.image === "" ||
                  prop.image === "undefined" ||
                  prop.image == null ? (
                  <img src={require('../Images/default-image-user.png')}
                    onClick={() => {
                      window.location = `/users/${prop.username}`;
                    }}
                  ></img>
                ) : (
                  <img
                    src={prop.image}
                    alt="Profile Image"
                    onClick={() => {
                      window.location = `/users/${prop.username}`;
                    }}
                  />
                )}
                <div className="posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}>
                  {prop.fullname && (
                    <h6>
                      {prop.fullname} {(prop.verified) ? <span class="iconify" data-icon="ic:baseline-verified" data-inline="false" style={{ color: "blue" }}></span> : null}
                    </h6>
                  )}
                  {/* <p className="hmmm">@{prop.username}</p> */}
                </div>
              </div>
              {/* <div className="menu-post">
                <span class="iconify" data-icon="carbon:overflow-menu-vertical" data-inline="false"></span>
              </div> */}
              {(prop.news && <p className="text-mute">News/Trends</p>) ||
                (prop.sponsored && <p className="text-mute">Sponsored</p>) || (
                  <Moment className="datetime" fromNow>
                    {prop.createdAt}
                  </Moment>
                )}
            </div>
            {prop.course && <h6>Course: {prop.course}</h6>}
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
                    <a
                      href={prop.url}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Click Here
                    </a>
                  </div>
                )}
              </div>
              <div className="post-image">
                {(prop.img && prop.srctype.indexOf("image") !== -1 && (
                  <img
                    width="100%"
                    max-height="350px"
                    src={prop.img}
                    alt="prod"
                    onDoubleClick={liketoggle}
                  />
                )) ||
                  (prop.img && (
                    <video
                      class="video"
                      src={prop.img}
                      width="100%"
                      controls playsInline
                    ></video>
                  ))}
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
                {
                  <p className="comment-btn2" style={{ fontSize: "20px" }}>
                    <span
                      class="iconify"
                      data-icon="octicon:comment-discussion-24"
                      data-inline="false"
                    ></span>
                    {prop.comments.length}
                  </p>
                }
                {prop.comments[0] && (
                  <div>
                    <div className="comments">
                      {prop.comments[0].src && (
                        <img
                          src={prop.comments[0].src}
                          className="comment-img"
                        />
                      )}
                      {
                        <p
                          className="comment-posters-handle"
                          style={(localStorage.getItem("mode") === "light") ? { color: "black", marginRight: "4px" } : { marginRight: "4px" }}
                        >
                          @{prop.comments[0].username}
                        </p>
                      }
                      {prop.comments.length - 1 > 0 && (
                        <p className="comment-posters-handle" style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null} >{`+${prop.comments.length - 1
                          } others`}</p>
                      )}
                    </div>

                    {/* <div>
                    <p className="text-muted">@{prop.comments[0].username}</p>
                    <p className="comment">{prop.comments[0].comment}</p>
                  </div> */}
                  </div>
                )}
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
                    {/* {comment.src && (
                      <img src={comment.src} className="comment-img" onClick={() => {
                        window.location = `/users/${comment.username}`
                      }} />
                    )} */}
                    <p className="text-muted" onClick={() => {
                      window.location = `/users/${comment.username}`
                    }}>@{comment.username}</p>
                    <div className="comments-div">
                      {comment.reply && comment.reply.comment && <p><a href={`#${comment.reply.id}`} className="disabled">reply; @{comment.reply.username}: {comment.reply.comment.slice(0, 31)} </a></p>}
                      {comment.img && <img src={comment.img} onClick={imgToggle2} width="100%" />}
                      <Modal isOpen={imgModal2} toggle={imgToggle2} fade={false}>
                        <ModalHeader toggle={imgToggle2}>

                        </ModalHeader>
                        <ModalBody>
                          <img src={comment.img} alt={comment.username} width="100%" />
                        </ModalBody>
                        <ModalFooter>
                          <a href={comment.img} className="btn btn-primary">
                            <FontAwesomeIcon icon={faDownload} size="lg"></FontAwesomeIcon>
                          </a>
                        </ModalFooter>
                      </Modal>

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
      <br></br>
    </div>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)

  return (
    <div disabled={isFirstItemVisible}>
      <span class="iconify filter-iconify" data-icon="system-uicons:filtering" data-inline="false"></span>
    </div>
  );
}

class Profile2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phone: "",
      about: "",
      twitter: "",
      telegram: "",
      password: "",
      cpassword: "",
      passwordError: "",
      cpasswordError: "",
      err: "",
      modal: false,
      loaded: null,
      loaded2: null,
      posts: [],
      profile: {},
      img: null,
      src: null,
      checker: null,
      checkerImg: null,
      checkerImage: false,
      img2: null,
      src2: null,
      srctype: null,
      modal2: false,
      post: "",
      img3: null,
      src3: null,
      srctype3: null,
      modal3: false,
      news: "",
      loaded3: null,
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id"),
      
      img4: null,
      src4: null,
      srctype4: null,
      modal4: false,
      adwords: "",
      url: "",
      
      loaded4: null,
      wallet: "",
      note: 0,
      topic: "Random",
      c_name: false
    };
    this.input = React.createRef()
    this.input2 = React.createRef()
  }

  // dateChecker
  dateChecker = (c) => {
    var date1 = new Date(c.createdAt);
    var date2 = new Date();

    var difference_In_Time = date2.getTime() - date1.getTime();

    var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
    // console.log(difference_In_Days)
    if (c.duration) {
      if (difference_In_Days >= c.duration) {
        let todele = { id: c._id, token: this.state.token };
        axios.post("/posts/delete", todele);
        return (c = { owner: "delete" });
      }
    }
    if (difference_In_Days >= 300) {
      let todele = { id: c._id, token: this.state.token };
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
    if (!a.ass || !a.tutorial) {
      return a;
    }

  };

  delefilter = (a) => {
    return !a.deleted
  }

  newMessages = (ress) => {
    let newMessage = ress.messages ? ress.messages.filter((m) => {
      let time = (m && m.message.time) ? new Date(m.message.time) : null
      let time2 = new Date(ress.offlineTime)
      return time.getTime() > time2.getTime()
    }).length : null
    let fication = (ress.messages) ? newMessage : 0
    localStorage.setItem('note', fication)
    this.setState({ note: fication })
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.replace(`/login`);
      localStorage.setItem("redirect", `profile`);
    }
    document.title = `Uniconne`;
    let user = { userID: localStorage.getItem("id"), token: localStorage.getItem('token') };
    axios
      .post("/users/showone", user)

      .then((data) => {
        this.setState({
          profile: data.data.response,
          fullname: data.data.response.fullname,
          email: data.data.response.email,
          twitter: data.data.response.twitter,
          telegram: data.data.response.telegram,
          src: data.data.response.avatar,
          about: data.data.response.about
        });
        console.log(data)
        return data;
      })
      .then(() => {
        //     let fication = (this.state.profile.messages) ? this.state.profile.messages.filter((m) => {
        //         let time = new Date(m.message.time)
        //         let time2 = new Date(this.state.profile.offlineTime)
        //         return time.getTime() > time2.getTime()
        //     }).length : 0
        //      this.setState({
        //        note: fication
        //   })
      })
      .catch((err) => {
        // toast.error("Couldn't Get Data, Please Try Again. "+err);
      });

    let prod = { id: this.state.id, token: localStorage.getItem('token') };
    axios
      .post("/posts/myposts", prod)
      .then((data) => {
        return data.data.response;
      })
      // .then((infoma) => infoma.filter(this.assfilter))
      // .then((ans) => {
      //   ans.map(this.dateChecker);
      //   return ans;
      // })
      // .then((dd) => dd.filter(this.datefilter))
      // .then((infoma) => infoma.filter(this.delefilter))
      .then((data) => {
        this.setState({
          posts: data.reverse(),
        });
        // this.newMessages(this.state.profile)
      });
    //.catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })

    
  }

  filer = (ev) => {
    this.setState({
      checkerImg: "loading",
    });

    let file = ev.target.files[0];

    this.setState({
      img: ev.target.files[0],
      src: window.URL.createObjectURL(ev.target.files[0]),
      checkerImage: true,
    });

  };

  firstN = (ev) => {
    let name = ev.target.value;
    this.setState({ fullname: name, err: "" });
  };
  lastN = (ev) => {
    let name = ev.target.value;
    this.setState({ lastname: name, err: "" });
  };
  username = (ev) => {
    let name = ev.target.value;
    this.setState({ username: name, err: "" });
    axios.post("/username").then((data) => {
      if (
        data.data.response.includes(name) &&
        name !== this.state.profile.username
      ) {
        this.setState({
          usernameErr: true,
        });
      } else {
        this.setState({
          usernameErr: false,
        });
      }
    });
  };
  phone = (ev) => {
    let name = ev.target.value;
    this.setState({ phone: name, err: "" });
  };
  email = (ev) => {
    let name = ev.target.value.toLowerCase();
    this.setState({ email: name, err: "" });
  };
  about = (ev) => {
    let name = ev.target.value;
    this.setState({ about: name, err: "" });
  };
  twitter = (ev) => {
    let name = ev.target.value;
    this.setState({ twitter: name, err: "" });
  };
  telegram = (ev) => {
    let name = ev.target.value;
    this.setState({ telegram: name, err: "" });
  };
  wallet = (ev) => {
    let wallet = ev.target.value;
    this.setState({ wallet });
  };
  department = (ev) => {
    let dept = ev.target.value;
    this.setState({ department: dept, err: "" });
  };
  level = (ev) => {
    let level = ev.target.value;
    this.setState({ level: level, err: "" });
  };
  universities = (ev) => {
    let school = ev.target.value
    let yu = this.state.universities.filter(u => u.name === school)
    this.setState({ university: school, err: '', test: yu[0].domains[0] })
  }
  open = (ev) => {
    let open = ev.target.value;
    this.setState({ open: open, err: "" });
  };
  date = (ev) => {
    let date = ev.target.value;
    this.setState({ date: date, err: "" });
  };
  partner = (ev) => {
    let partner = ev.target.value;
    this.setState({ partner: partner, err: "" });
  };
  pword = (ev) => {
    let password = ev.target.value;
    if (this.state.password.length < 7) {
      this.setState({ passwordError: "Password too short (8)" });
    } else {
      this.setState({ passwordError: "Password Okay!!!" });
    }
    this.setState({ password, err: "" });
  };
  cpword = (ev) => {
    let cpassword = ev.target.value;
    if (this.state.password === cpassword) {
      this.setState({ cpasswordError: "Password Match!!!" });
    } else {
      this.setState({ cpasswordError: "Password does not match!!!" });
    }
    this.setState({ cpassword });
  };
  click = (ev) => {
    ev.preventDefault();
  };
  payoneer = (ev) => {
    let value = ev.target.value;
    this.setState({ payoneerID: value, err: "" });
  };

  submit = (ev) => {
    ev.preventDefault();
    let data = new FormData();
    if (this.state.img) {
      data.append("file", this.state.img);
      data.append("filename", this.state.img.name);
    }
    data.append("fullname", this.state.fullname);
    data.append("email", this.state.email);
    data.append("phone", this.state.phone);
    data.append("checkerImage", this.state.checkerImage);
    data.append("userID", this.state.id);
    data.append("about", this.state.about);
    data.append("src", this.state.src);
    data.append("country", this.state.profile.country)
    data.append("role", this.state.profile.role)
    data.append("signed", this.state.profile.signed)
    data.append("scouting", this.state.profile.scouting)
    data.append("token", localStorage.getItem("token"))

    let user = {
      fullname: this.state.fullname,
      email: this.state.email,
      checkerImage: this.state.checkerImage,
      userID: this.state.id,
      about: this.state.about,
      src: this.state.src,
      country: this.state.profile.country,
      scouting: this.state.profile.scouting,
      role: this.state.profile.role
    };

    if (
      user.fullname.trim() == "" ||
      user.email.trim() == "" 
    ) {
      toast.error("Please All Stared Fields Are Required");
      this.setState({ err: "Please All Fields Are Required" });
      return false;
    } else {
      toast.success("Loading, please wait...");
      axios
        .post("/users/updateone", user, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            });
          },
        })
        .then((res) => {
          // console.log(res)
          if (res.data.response) {
            // console.log(res)
            localStorage.setItem("username", res.data.response.username);
            localStorage.setItem("src", res.data.response.src);
            localStorage.setItem("department", res.data.response.department);
            localStorage.setItem("phone", res.data.response.phone);
            localStorage.setItem("level", res.data.response.level);
            // this.setState({ 
            //     profile: {
            //         firstname: data.firstname, phone: data.phone,
            //         lastname: data.lastname, twitter:  data.twitter,
            //         department:  data.department, level:  data.level,
            //         src:  data.src, _id:  data._id,
            //         username:  data.username, followers:  data.followers

            //     }
            // })
          } else {
            toast.error("Update failed, " + res.data.message)
            return;
          }
        })
        .then(() => {
          let user = {
            userID: localStorage.getItem("id"),
            token: this.state.token,
          };
          axios
            .post("/users/showone", user)

            .then((data) => {
              this.setState({
                profile: data.data.response,
                src: data.data.response.src,
              });
              localStorage.setItem("username", data.data.response.username);
              localStorage.setItem("src", data.data.response.src);
              localStorage.setItem("department", data.data.response.department);
              localStorage.setItem("phone", data.data.response.phone);
              localStorage.setItem("level", data.data.response.level);
            });
        })
        .then((res) => {
          this.modal();
          toast.success("Profile updated");
        })

        .catch((err) => {
          this.setState({ loaded: 0 });
          toast.error("Profile update Failed, Please Try Again.");
        });
      return true;
    }
  };
  modal = () => {
    this.setState({
      modal: !this.state.modal,
      loaded: 0,
    });
  };

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
    data.append("fullname", this.state.fullname);
    data.append("post", this.input.current.value);
    data.append("topic", this.state.topic);
    data.append("owner", this.state.profile._id);
    data.append("department", this.state.profile.department);
    data.append("level", this.state.profile.level);
    data.append("followers", this.state.profile.followers);
    data.append("verified", this.state.profile.verified);
    data.append("image", this.state.profile.avatar);

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
                posts: data.reverse(),
              });
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
      loaded2: 0,
      srctype: null,
    });
  };

  // News

  filer3 = (ev) => {
    let file = ev.target.files[0];

    this.setState({
      img3: ev.target.files[0],
      src3: window.URL.createObjectURL(ev.target.files[0]),
      srctype3: file.type,
    });

  };

  news = (ev) => {
    let name = ev.target.value;
    this.setState({ news: name, err: "" });
  };

  submit3 = (ev) => {
    ev.preventDefault();
    let data = new FormData();
    if (this.state.img3) {
      data.append("file", this.state.img3);
      data.append("filename", this.state.img3.name);
    }
    data.append("username", this.state.profile.username);
    data.append("post", this.input2.current.value);
    data.append("owner", this.state.profile._id);
    data.append("topic", this.state.topic);
    data.append("image", this.state.src);
    //data.append('token', this.state.token)

    if (this.state.img3 === null && this.input2.current.value === "") {
      toast.error("Please add a post");
    } else {
      toast.success("Loading, please wait...");
      axios
        .post("/posts/addnews", data, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded3: (ProgressEvent.loaded / ProgressEvent.total) * 100,
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
                posts: data.reverse(),
              });
            })
            .catch((err) => {
              toast.error("Couldn't Get Data, Please Try Again.");
            });
        })
        .then(() => {
          this.input2.current.value = ""
          this.modal3();
        })
        .catch((err) => {
          this.setState({ loaded3: 0 });
          toast.error("Could'nt add post.");
        });
    }
  };
  modal3 = () => {
    this.setState({
      modal3: !this.state.modal3,
      src3: null,
      img3: null,
      news: "",
      loaded3: 0,
      srctype3: null,
    });
  };

  //followers view
  followers = () => {
    let user = { userID: localStorage.getItem("id") };

    this.state.profile.followers.map((f) =>
      // { userID: f, token: this.state.token }
      axios
        .post("/users/showone", { userID: f })
        .then((data) => data.data.response)
        .then((data) => {
          if (this.state.myFollowers.indexOf(data) == -1) {
            this.setState({ myFollowers: [data, ...this.state.myFollowers] });
          } else {
            return;
          }
        })
    );

    // this.setState({myFollowers: folks})
  };

  followersToggle = () => {
    this.followers();
    this.setState({
      fmodal: !this.state.fmodal,
      myFollowers: [],
    });
  };

  followersOpen = () => {
    this.followers();
    this.setState({
      fmodal: !this.state.fmodal,
    });
  };
  // Following View
  following = () => {
    let user = { userID: localStorage.getItem("id") };

    this.state.profile.followings.map((f) =>
      axios
        .post("/users/showone", { userID: f })
        .then((data) => data.data.response)
        .then((data) => {
          if (this.state.myFollowings.indexOf(data) == -1) {
            this.setState({ myFollowings: [data, ...this.state.myFollowings] });
          } else {
            return;
          }
        })
    );
  };
  followingToggle = () => {
    this.following();
    this.setState({
      followingModal: !this.state.followingModal,
      myFollowings: [],
    });
  };

  followingOpen = () => {
    this.following();
    this.setState({
      followingModal: !this.state.followingModal,
    });
  };

  //Ads
  filer4 = (ev) => {
    let file = ev.target.files[0];

    this.setState({
      img4: ev.target.files[0],
      src4: window.URL.createObjectURL(ev.target.files[0]),
      srctype4: file.type,
    });

  };
  companyname = (ev) => {
    let texts = ev.target.value;
    this.setState({ companyname: texts, err: "" });
  };
  ads = (ev) => {
    let texts = ev.target.value;
    this.setState({ adwords: texts, err: "" });
  };

  url = (ev) => {
    let texts = ev.target.value;
    this.setState({ url: texts, err: "" });
  };

  duration = (ev) => {
    let duration = ev.target.value;
    this.setState({ duration: duration, err: "" });
    if (duration == 7) {
      this.setState({ amount: 2000, err: "" });
    } else if (duration == 14) {
      this.setState({ amount: 4000, err: "" });
    } else if (duration == 21) {
      this.setState({ amount: 6000, err: "" });
    } else if (duration == 30) {
      this.setState({ amount: 8000, err: "" });
    }
  };

  submit4 = (res) => {
    //ev.preventDefault()
    let data = new FormData();
    if (this.state.img4) {
      data.append("file", this.state.img4);
      data.append("filename", this.state.img4.name);
    }
    data.append("username", this.state.companyname);
    data.append("post", this.state.adwords);
    data.append("url", this.state.url);
    data.append("duration", this.state.duration);
    data.append("owner", this.state.id);
    data.append("image", this.state.src);

    if (this.state.img4 === null && this.state.adwords === "") {
      toast.error("Please add a post (image/video or posts)");
    } else if (res.status == "successful") {
      toast.success("Loading, please wait...");
      axios
        .post("/posts/addads", data, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded4: (ProgressEvent.loaded / ProgressEvent.total) * 100,
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
            .then((ans) => {
              return ans.map(this.dateChecker);
            })
            .then((dd) => {
              return dd.filter(this.datefilter);
            })
            .then((data) => {
              this.setState({
                posts: data.reverse(),
              });
            })
            .catch((err) => {
              toast.error("Couldn't Get Data, Please Try Again.");
            });
        })
        .then(() => {
          this.modal4();
        })
        .catch((err) => {
          this.setState({ loaded4: 0 });
          toast.error("Could'nt add Advert");
        });
    }
  };
  modal4 = () => {
    this.setState({
      modal4: !this.state.modal4,
      src4: null,
      img4: null,
      adwords: "",
      url: "",
      loaded4: 0,
      amount: 2000,
      duration: 7,
      srctype4: null,
    });
  };

  render() {
    const liker = (id) => {
      let comm = {
        postID: id,
        like: this.state.id,
      };
      axios.post("/posts/like", comm);
      // .then(() => console.log("liked"))
      //.catch((err) => console.log("Couldn't add like to post."))
    };

    const comm = (comment, id, reply) => {
      let comm = {
        postID: id,
        comment: { username: this.state.fullname, comment, reply },
      };
      if (this.state.profile.src) {
        comm.comment.src = this.state.profile.src;
      }
      axios
        .post("/posts/comment", comm)
        .then(() => toast.success("Comment added"))
        .catch((err) => toast.error("Couldn't add comment to post."));
    };

    const deta = (id) => {
      let todele = { id: id };
      toast.success("Deleting, please wait...");
      axios
        .post("/posts/delete", todele)
        .then(() => toast.success("Delete Successful."))
        .then(() =>
          this.setState((prevState) => {
            return {
              posts: prevState.posts.filter((u) => {
                return u._id !== id;
              }),
            };
          })
        );
    };

    const follow = (f) => {
      let comm = {
        id: f._id,
        follower: this.state.id,
      };
      axios
        .post("/users/follow", comm)
        // .then(() => console.log("follow"))
        .then(() => {
          if (f.followers.indexOf(localStorage.getItem("id")) == -1) {
            f.followers.push(localStorage.getItem("id"));
            this.setState({});
          } else {
            var nf = f.followers.filter(
              (u) => u !== localStorage.getItem("id")
            );
            this.state.myFollowers[
              this.state.myFollowers.indexOf(f)
            ].followers = nf;
          }
        })
        .then(() => this.setState({ fmodal: !this.state.fmodal }))
        .then(() => this.setState({ fmodal: !this.state.fmodal }));
      //.catch((err) => console.log("Couldn't add follow to student."))
    };

    return (
      <div style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "white", color: "black" } : null}>
        { (
          <div>
            {(this.state.profile.fullname && (
              <div className="setup-div" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f6f6f6", color: "black" } : null}>
                <br />
                <br />
                <br />
                <div className="users-details" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f6f6f6", color: "black", boxShadow: "0px 0px 2px #ccc, 0px 0px 2px #ccc", padding: "5px" } : { padding: "5px" }}>
                  <div className="user-details-header">
                    <div className="user-name-img">
                      <div className="user-img">
                        {(this.state.profile.src && (
                          <img src={this.state.profile.src} alt="prod" />
                        )) || (
                            <img src={defaultImg}></img>
                          )}
                      </div>
                      <div className="user-username">
                        {this.state.profile.fullname && (
                          <p
                            className="user-fullname"
                            style={(localStorage.getItem("mode") === "light") ? { color: "black" } : null}
                          >
                            {this.state.profile.fullname}
                          </p>
                        )}
                        {this.state.profile.username &&
                          this.state.profile.username !== "undefined" && (
                            <p className="user-at-name">
                              @{this.state.profile.username}
                            </p>
                          )}
                      </div>
                      {/* <Moment className="datetime" fromNow>{prop.createdAt}</Moment> */}
                    </div>
                    <div className={(localStorage.getItem("mode") === "light") ? "follow-btn-light" : "follow-btn"}>
                      <button
                        onClick={this.modal}
                        style={{ padding: "8px 15px" }}
                      >
                        Edit{" "}
                        <span
                          class="iconify"
                          data-icon="bx:bxs-user-check"
                          data-inline="false"
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div align="left">
                    {this.state.profile.about &&
                      this.state.profile.about !== "undefined" && (
                        <p>
                          About: {this.state.profile.about}
                        </p>
                      )}
                  </div>
                  <div className="level-dept">
                   
                    
                    {/* <div onClick={this.followersOpen}>
                      <span
                        class="iconify"
                        data-icon="clarity:users-line"
                        data-inline="false"
                      ></span>
                      <p className="text-muted">
                        {this.state.profile.followers.length} followers
                      </p>
                    </div> */}
                    {/* <div onClick={this.followingOpen}>
                      <span
                        class="iconify"
                        data-icon="clarity:users-line"
                        data-inline="false"
                      ></span>
                      <p className="text-muted">
                        {this.state.profile.followings.length} following
                      </p>
                    </div> */}
                    {/* {friends.indexOf(localStorage.getItem('id')) == -1 && 
                        <div className="chat-user">
                            <span class="iconify" data-icon="heroicons-outline:chat-alt-2" data-inline="false"></span>
                            <p><a className="text-muted" onClick={friendToggle}>Connect</a></p>
                        </div>} */}
                  </div>

                 
                </div>


                <a className="pen" onClick={this.modal2}>
                  <span
                    class="iconify"
                    data-icon="jam:write-f"
                    data-inline="false"
                  ></span>
                </a>
                
                <div className="home-container" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f9f9f9", color: "black" } : null}>
                  <div className="card-div">
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
                        deta={deta}
                        comments={post.comments} course={post.course}
                        likes={post.likes}
                        id={post._id}
                        news={post.news} tutorial = {post.tutorial}
                        sponsored={post.sponsored} ass = {post.ass}
                        url={post.url}
                        image={post.image}
                        followers={this.state.profile.followers}
                        verified={post.verified}
                      />
                    ))}
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                </div>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.modal}
                  fade={false}
                >
                  <ModalHeader toggle={this.modal}>Update Profile</ModalHeader>
                  <ModalBody style={{ padding: "8px" }}>
                    <label>
                      <h6>Profile Picture</h6>
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      onChange={this.filer}
                      accept="image/*"
                    />

                    <br />
                    {this.state.src && (
                      <img src={this.state.src} width="100%" />
                    )}

                    <Form>
                      <h3 className="err">{this.state.err}</h3>

                      {/* first name */}
                      <div className="sign-up-name">
                        <label for="firstname" className="text">
                          Fullname.*
                          <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            onChange={this.firstN}
                            value={this.state.fullname}
                            className="form-control"
                          />
                        </label>
                      </div>
                      <br/>

                      {/* email */}
                      <label for="email" className="text">
                        Email.*
                        <input
                          type="email"
                          name="email"
                          placeholder="xxxxxxxxx@student.oauife.edu,ng"
                          onChange={this.email}
                          value={this.state.email}
                          className="form-control"
                        />
                      </label>
                      <br/>

                      <br/>

                      {/* about */}
                      <label for="about" className="text">
                        About.
                        <textarea
                          name="about"
                          placeholder="e.gwhat youdo,favorite interest, best quote etc..."
                          onChange={this.about}
                          value={this.state.about && this.state.about}
                          className="form-control"
                        ></textarea>
                      </label>
                      <br/>

                      <br/>

                      {this.state.loaded &&
                        <progress min="0" max="100" value={this.state.loaded}></progress>
                      }
                      {/* )} */}

                      <ToastContainer />
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={this.submit}
                      className="btn btn-success form-control"
                    >
                      Update
                    </button>
                  </ModalFooter>
                </Modal>
                {/* Post Modal */}
                <Modal
                  isOpen={this.state.modal2}
                  toggle={this.modal2}
                  fade={false}
                >
                  <ModalHeader toggle={this.modal2}>Add A Post</ModalHeader>
                  <ModalBody style={{ padding: "8px" }}>
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

                    <label for="post" className="text">
                      Post.
                      <textarea
                        name="post"
                        className="form-control"
                        cols="40"
                        rows="4"
                        ref={this.input}
                        // value={this.state.post}
                        // onChange={this.post}
                        className="form-control"
                      ></textarea>
                    </label>

                    <br />

                    <br></br>

                    {this.state.loaded2 &&
                  <progress min="0" max="100" value={this.state.loaded2}></progress>
                }

                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={this.submit2}
                      className="btn btn-success form-control"
                    >
                      Post
                    </button>
                  </ModalFooter>
                </Modal>
                <ToastContainer />
                    

              </div>
            )) || (
                <div className="spin" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f6f6f6" } : null} >
                  <Spinner className="spinner" color="primary" size="lg" />
                </div>
              )}
            
          </div>
        )}
        <Footer/>
      </div>
    );
  }
}

export default Profile2;
