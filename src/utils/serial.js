
export default class Serial {
    static BaudRateOpitons = [
        300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200, 230400, 460800, 921600
    ]
    serialPort = null
    reader = null
    baudRate = 9600
    onDisconnected = () => { }
    onDestroyed = () => { }
    onConnected = () => { }
    constructor(baudRate) {
        this.baudRate = baudRate
    }
    async init() {
        const serialPort = await navigator.serial.requestPort()
        serialPort.addEventListener("disconnect", (e) => {
            this.destroy()
        })
        navigator.serial.addEventListener("disconnect", (e) => {
            if (!serialPort) {
                this.onDestroyed()
            }
        })
        this.serialPort = serialPort
    }

    async connect() {
        if (!this.serialPort) {
            await this.init()
        }
        await this.serialPort.open({ baudRate: this.baudRate })
        this.onConnected()
    }


    async disconnect() {
        if (this.reader) {
            await this.reader.cancel()
            this.reader = null
        }
        if (this.serialPort) {
            await this.serialPort.close()
        }
        this.onDisconnected()
    }
    async destroy() {
        try { await this.disconnect() } catch (err) { }
        this.serialPort = null
        this.onDestroyed()

    }

    async changeBaudRate(val) {
        await this.disconnect()
        this.baudRate = val
        this.connect()
    }

    /**
     * @param: 
     *  callbacks = {cbReading: (data) => { },cbDone: () => { },cbError: (err) => {},}
     * @return {*}
     */
    async readSerialData(callbacks = {
        cbReading: null,
        cbDone: null,
        cbError: null
    }) {
        if (!this.serialPort) return
        const serialPort = this.serialPort
        const { cbReading, cbDone, cbError } = callbacks
        while (this.serialPort.readable && !this.serialPort.readable.locked) {
            this.reader = serialPort.readable.getReader()
            try {
                while (true) {
                    const { value, done } = await this.reader.read()
                    if (done) {
                        cbDone && cbDone()
                        break
                    }
                    // new TextDecoder().decode(value)
                    cbReading && cbReading(value)

                }
            } catch (err) {
                console.error("Error reading serial data:", err)
                cbError && cbError(err)
                break
            }
        }
    }



}