import React from "react";
import io from "socket.io-client";
import "./Chat.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    this.socket = io.connect(process.env.PORT);

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      // console.log(data);
      // debugger;
      this.setState({
        messages: data.conversation
      });
      // console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        username: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }
  render() {
    return (
      <div className="Chat">
        <div className="card-title">Client Chat</div>
        <hr />
        <div className="messages">
          {this.state.messages.map(function(message, i) {
            return (
              <div key={i}>
                {message.username}: {message.message}
              </div>
            );
          })}
        </div>
        <div className="card-footer">
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={ev => this.setState({ username: ev.target.value })}
            className="form-control"
          />
          <br />
          <input
            type="text"
            placeholder="Message"
            className="form-control"
            value={this.state.message}
            onChange={ev => this.setState({ message: ev.target.value })}
          />
          <br />
          <button
            onClick={this.sendMessage}
            className="btn btn-primary form-control"
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
