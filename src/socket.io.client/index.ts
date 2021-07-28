import SocketIoClient from 'socket.io-client';

const server = 'https://chess-server-olga2157.herokuapp.com';
const SocketIo = SocketIoClient(server);
export default SocketIo;