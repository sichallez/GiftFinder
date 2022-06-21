import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const appID = "212208382aa525ba";
const region = "us";
const AUTH_KEY = "953f1ece5000587b9a366729f7081f458573f1e4";
const wid = "9627b867-93b1-476f-aeea-dc9f6887ac9c";

let uid = null;

const Chat = () => {
  const [load, setLoad] = useState(true);

  const { auth } = useSelector((state) => state);

  if (auth.id) {
    uid = `USER${auth.id}`;
  }

  useEffect(() => {
    setLoad(true);
    window.CometChatWidget?.init({
      appID: appID,
      appRegion: region,
      authKey: AUTH_KEY,
    }).then((response) => {
      console.log("Initialization completed successfully");
      //You can now call login function.
      if (uid === null) {
        // create new user
        // const uid = "user" + new Date().getSeconds().toString();
        // const user = new window.CometChatWidget.CometChat.User(uid);
        // user.setName(uid);

        // window.CometChatWidget.createOrUpdateUser(user).then((user) => {
        //   // Proceed with user login
        //   window.CometChatWidget.login({
        //     uid: uid,
        //   }).then((loggedInUser) => {
        //     localStorage.setItem("cc-uid", loggedInUser.uid);
        //     // Proceed with launching your Chat Widget
        //     window.CometChatWidget.launch({
        //       widgetID: wid,
        //       roundedCorners: "true",
        //       docked: "true",
        //       height: "450px",
        //       width: "400px",
        //       defaultID: uid, //default UID (user) or GUID (group) to show,
        //       defaultType: "user", //user or group
        //     });
        //     setLoad(false);
        //   });
        // });
        console.log("If a user is not logged in, DO NOTHING");
      } else {
        window.CometChatWidget.login({
          uid: uid,
        }).then((user) => {
          window.CometChatWidget.launch({
            widgetID: wid,
            roundedCorners: "true",
            docked: "true",
            height: "450px",
            width: "400px",
            defaultID: uid, //default UID (user) or GUID (group) to show,
            defaultType: "user", //user or group
          });
          setLoad(false);
        });
      }
    });

    if (auth.id) {
      return () => {
        window.CometChatWidget?.logout().then((response) => {
          document
            .querySelectorAll("#cometchat__widget")
            .forEach((el) => el.remove());
        });
      };
    }
  }, [auth]);

  // if (load) {
  //   return (
  //     <div className="container">
  //       <h1>LOADED? OR WHAT HAPPEND</h1>
  //     </div>
  //   );
  // }

  return <div className="App"></div>;
};

export default Chat;
