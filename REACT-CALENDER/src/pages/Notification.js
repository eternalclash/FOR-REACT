import React from "react" ;
import Card from "../components/Card";
import {Grid, Text} from "../elements";

const Notification = (props) => {
    let noti = [
        {user_name: "aaaaa", post_id: "post1", image_url : "http://via.placeholder.com/400x300"},
        {user_name: "aaaaa", post_id: "post2", image_url : ""},
        {user_name: "aaaaa", post_id: "post3", image_url : ""},
        {user_name: "aaaaa", post_id: "post4", image_url : ""},
        {user_name: "aaaaa", post_id: "post5", image_url : ""},
        {user_name: "aaaaa", post_id: "post6", image_url : ""},
        {user_name: "aaaaa", post_id: "post7", image_url : ""},
    ]
    return (
        <React.Fragment>
         
            {noti.map((n) => {
                return (
                     <Card {...n} key={n.post_id} />
                    
                )
            })}
        
        </React.Fragment>
    )
}

export default Notification;