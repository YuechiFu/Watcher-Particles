<template>
  <div>
    <div class="row">
      <div class="r justify-end">
        <div
          class="error text-red-500 text-14 p-5 bg-red-950 mb-10 rounded-md w-max"
          v-if="errorTip"
        >
          {{ errorTip }}
        </div>
      </div>
    </div>

    <div class="relative" v-show="visibleTerminal">
      <div
        ref="xtermEl"
        class="mb-20 py-10 pl-15 pr-10 bg-black h-auto w-full overflow-hidden rounded-lg"
      ></div>
      <div class="absolute top-3 right-8 text-center z-10">
        <!-- <div class="mt-10">
          <t-button theme="default" @click="handleExportData">Export</t-button>
        </div> -->
      </div>
    </div>
    <div class="row">
      <div class="r justify-end">
        <t-select
          v-if="isConnected"
          size="large"
          class="max-w-120"
          v-model="currentBaud"
          @change="() => handleBaudChange()"
          :placeholder="$t('baudRate')"
        >
          <t-option
            v-for="rate in Serial.BaudRateOpitons"
            :key="rate"
            :label="rate"
            :value="rate"
          >
          </t-option>
        </t-select>
        <div class="ml-10">
          <t-button
            v-if="isConnected"
            size="large"
            @click="handleDisconnect"
            theme="warning"
            >{{ $t("disconnect") }}</t-button
          >
          <t-button v-else size="large" @click="handleConnect">{{
            $t("connectSerial")
          }}</t-button>
        </div>
        <div class="ml-10" v-if="visibleTerminal">
          <t-button theme="danger" size="large" @click="handleClearXterm"
            >Clear</t-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import i18n from "@/i18n";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { CanvasAddon } from "@xterm/addon-canvas";
const { t } = i18n.global;
import Serial from "@/utils/serial";
import { exportDataFile } from "@/utils";

let serialPort = null;
let xterm = null;
let xtermData = [];
const currentBaud = ref(115200);
const xtermEl = ref(null);
const visibleTerminal = ref(false);
const isConnected = ref(false);
const errorTip = ref("");

const props = defineProps({
  baudRate: {
    type: Number,
    default: 115200
  }
});

currentBaud.value = props.baudRate;

onUnmounted(() => {
  serialPort && serialPort.disconnect();
});

const initXterm = (el) => {
  const terminal = new Terminal({
    fontSize: 14,
    rightClickSelectsWord: true,
    allowTransparency: true,
    cursorBlink: true,
    cursorStyle: "bar",
    scrollback: 10000,
    // fontFamily: "Montserrat",
    allowProposedApi: true,
    rows: 60,
    cols: 100
    /* rows: 24,
    scrollback: 100 */
  });
  const fitAddon = new FitAddon();
  const addon = new CanvasAddon();
  terminal.loadAddon(addon);
  terminal.loadAddon(fitAddon);
  terminal.open(el);
  fitAddon.fit();
  return terminal;
};

const handleExportData = () => {
  exportDataFile(xtermData.join(""), "xterm_logs.txt");
};

const handleClearXterm = () => {
  xterm && xterm.reset();
  xtermData = [];
};

const handleConnect = async () => {
  errorTip.value = "";
  if (!serialPort) {
    serialPort = new Serial(props.baudRate);
    serialPort.onDisconnected = () => {
      isConnected.value = false;
    };
    serialPort.onDestroyed = () => {
      xterm && xterm.reset();
      serialPort = null;
      isConnected.value = false;
    };
    serialPort.onConnected = () => {
      if (!xterm) {
        xterm = initXterm(xtermEl.value);
      }
      console.log(t("connectBaudSuccess", { rate: serialPort.baudRate }));
      xterm.write(t("connectBaudSuccess", { rate: serialPort.baudRate }));
      visibleTerminal.value = true;
      isConnected.value = true;
    };
  }
  let isReading = false;
  try {
    await serialPort.connect();
    await serialPort.readSerialData({
      cbReading: (data) => {
        if (!data) {
          return;
        }
        if (!isReading) {
          xterm.reset();
          isReading = true;
        }
        data = new TextDecoder().decode(data);
        xtermData.push(data.trim());
        xterm.write(data);
      },
      cbDone() {
        isReading = false;
      }
    });
  } catch (err) {
    console.log(err);
    serialPort = null;
    errorTip.value = err;
  }
};

const handleDisconnect = async () => {
  serialPort && (await serialPort.destroy());
  // await serialPort.destroy()
};

const handleBaudChange = () => {
  errorTip.value = "";
  handleClearXterm();
  serialPort && serialPort.changeBaudRate(currentBaud.value);
};
</script>
<style></style>
