import { SOCKET_IP } from '../config.json';

export default class MainSocket {
  constructor(messageReceiver) {
    this.messageReceiver = messageReceiver;

    let tunnelledHosts = ['papabit.com'];
    let protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    let postfix = tunnelledHosts.indexOf(window.location.hostname) > -1 ? ':28080' : '/cable';

    this.url = protocol + '//' + SOCKET_IP + postfix;
    this.socket = null
  }

  open = (userId) => {
    this.userId = userId;

    this.socket = new WebSocket(this.url);

    this.socket.onopen = this.onConnect;
    this.socket.onmessage = this.onMessage;
    this.socket.onclose = this.onDisconnect;
    this.socket.onerror = this.onError;
  };

  close() {
    this.socket && this.socket.close();
  }

  onConnect = () => {
      let intervalId = setInterval(() => {
      switch (this.socket.readyState) {
        case this.socket.CLOSING:
        case this.socket.CLOSED:
          clearInterval(intervalId);
          break;
        case this.socket.OPEN:
          this.send({command: 'subscribe'});
          clearInterval(intervalId);
          break;
        default:
          break;
      }
    }, 100);
  };

  onMessage = (event) => {
    let data = JSON.parse(event.data);

    switch (data.type) {
      case 'welcome':
      case 'ping':
        break;
      case 'confirm_subscription':
        console.log('Subscription confirmed');
        break;
      default:
        this.messageReceiver && this.messageReceiver(data.message);
        break;
    }
  };

  onDisconnect = (event) => {
    if (event.wasClean) {
      console.log('Disconnect was clean');
    } else {
      console.log('Disconnect:', event);
      setTimeout(() => this.open(this.userId), 10 * 1000);
    }
  };

  onError = (error) => {
    console.log('Error:', error);
  };

  sendMessage = (action, params = {}) => {
    this.send({
      command: 'message',
      data: JSON.stringify({...params, action: action}),
    });
  };

  send = (data) => {
    this.socket.send(
      JSON.stringify({
        ...data,
        identifier: JSON.stringify({
          channel: 'Api::V1::AppChannel',
          user_id: this.userId
        })
      })
    );
  };
}
