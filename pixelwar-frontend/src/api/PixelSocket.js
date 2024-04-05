class PixelSocket {
  constructor(url, callback) {
    this.url = url;
    this.callback = callback;

    this.connect();
  }
  connect = () => {
    this.socket = new WebSocket(this.url);
    this.socket.binaryType = 'arraybuffer';
    this.socket.addEventListener('open', this.onOpen);
    this.socket.addEventListener('message', this.onMessage);
    this.socket.addEventListener('close', this.onClose);
    this.socket.addEventListener('error', this.onError);
  }

  onOpen = (event) => {
    console.log('Connected to socket');
  }
  onMessage = (event) => {
    const data = new Uint8Array(event.data);
    const msgId = data[0];
    console.log('Received message:', msgId, data);
    const msg = data.slice(1);
    switch (msgId) {
      case 1:
        this.callback.onResize({ x: msg[0], y: msg[1] });
        break;
      case 2:
        const bitIndex = msg[0] | (msg[1] << 8) | (msg[2] << 16);
        const x = bitIndex % this.width;
        const y = Math.floor(bitIndex / this.width);
        this.callback.onPixelUpdate({ x, y, color: msg[3] });
        break;
      case 5:
        const header = JSON.parse(Buffer.from(msg).toString());
        this.callback.onHeaderUpdate(header);
        break;
      case 3:
        this.callback.onDelete();
        break;
      case 4:
        const width = msg[0] | (msg[1] << 8);
        const height = msg[2] | (msg[3] << 8);
        const pixelsRaw = msg.slice(4);

        this.width = width;
        this.height = height;

        const pixelCount = width * height;
        const pixels = new Array(pixelCount);
        for (let y = 0; y < height; y++) {
            const row = pixelsRaw.slice(y * width, (y + 1) * width);

            for (let x = 0; x < width; x++) {
                pixels[y * width + x] = row[x];
            }
        }

        this.callback.onPixelsData(width, height, pixels);
        break;
      default:
        console.error('Unknown message id:', msgId);
    }
  }
  onClose = (event) => {
    console.log('Disconnected from socket');
  }
  onError = (event) => {
    console.error('Socket error:', event);

    this.socket.close();
    this.connect();
  }

  setPixel = (x, y, colorIndex) => {
    const pixelIndex = y * this.width + x;
    const msg = new Uint8Array([10, (pixelIndex >> 0) & 0xff, (pixelIndex >> 8) & 0xff, (pixelIndex >> 16) & 0xff, colorIndex]);
    this.socket.send(msg);
  }

  close = () => {
    this.socket.close();
  }
}

export default PixelSocket;